import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const SETLIST_FM_API_KEY = process.env.SETLIST_FM_API_KEY;

// Fallback song lists for major artists when setlists aren't available
const FALLBACK_SETLISTS: { [key: string]: string[] } = {
  // Friday Artists
  'justin timberlake': [
    'Can\'t Stop the Feeling!',
    'SexyBack',
    'Mirrors',
    'Rock Your Body',
    'My Love',
    'What Goes Around... Comes Around',
    'Cry Me a River',
    'Suit & Tie',
    'TKO',
    'Filthy',
    'Say Something',
    'Man of the Woods'
  ],
  'sting': [
    'Every Breath You Take',
    'Roxanne',
    'Message in a Bottle',
    'Every Little Thing She Does Is Magic',
    'Fields of Gold',
    'Shape of My Heart',
    'Englishman in New York',
    'Fragile',
    'If You Love Somebody Set Them Free',
    'Desert Rose'
  ],
  'faithless': [
    'Insomnia',
    'God Is a DJ',
    'We Come 1',
    'Salva Mea',
    'Take the Long Way Home',
    'Mass Destruction',
    'Reverence',
    'Bring My Family Back',
    'Not Going Home',
    'I Want More'
  ],
  'the corrs': [
    'Breathless',
    'Runaway',
    'What Can I Do',
    'So Young',
    'Radio',
    'Dreams',
    'Forgiven Not Forgotten',
    'Only When I Sleep',
    'Angel',
    'Love to Love You'
  ],
  'amy macdonald': [
    'This Is the Life',
    'Mr Rock & Roll',
    'Poison Prince',
    'Run',
    'Spark',
    'Youth of Today',
    'The Hudson',
    'Let\'s Start a Band',
    'Barrowland Ballroom',
    'Dream On'
  ],
  'clean bandit': [
    'Rather Be',
    'Rockabye',
    'Symphony',
    'Solo',
    'What Is Love',
    'Tears',
    'Real Love',
    'Baby',
    'Dust Clears',
    'Stronger'
  ],
  'dean lewis': [
    'Be Alright',
    'Waves',
    '7 Minutes',
    'Stay Awake',
    'Half a Man',
    'Looks Like Me',
    'Used to Love',
    'Don\'t Hold Me',
    'Falling Up',
    'How Do I Say Goodbye'
  ],
  'the lathums': [
    'How Beautiful Life Can Be',
    'All My Life',
    'The Great Escape',
    'Oh My Love',
    'I Know That Much',
    'Fight On',
    'Turmoil',
    'Sad Face Baby',
    'From Nothing to a Little Bit More',
    'House on the Hill'
  ],
  'twin atlantic': [
    'Heart and Soul',
    'Free',
    'Brothers and Sisters',
    'Make a Beast of Myself',
    'Crash Land',
    'Yes I Was Drunk',
    'No Sleep',
    'Edit Me',
    'Hold On',
    'Barcelona'
  ],

  // Saturday Artists
  'stereophonics': [
    'Dakota',
    'Have a Nice Day',
    'Just Looking',
    'The Bartender and the Thief',
    'Maybe Tomorrow',
    'Local Boy in the Photograph',
    'More Life in a Tramps Vest',
    'Mr. Writer',
    'Handbags and Gladrags',
    'Pick a Part That\'s New'
  ],
  'supergrass': [
    'Alright',
    'Richard III',
    'Pumping on Your Stereo',
    'Caught by the Fuzz',
    'Moving',
    'Sun Hits the Sky',
    'Grace',
    'Going Out',
    'Strange Ones',
    'Time'
  ],
  'yard act': [
    'The Overload',
    'Dead Horse',
    'Fixer Upper',
    'Rich',
    'Dark Days',
    'Payday',
    'Land of the Blind',
    'Tall Poppies',
    'Pour Another',
    '100% Endurance'
  ],
  'pale waves': [
    'There\'s a Honey',
    'Television Romance',
    'My Obsession',
    'Kiss',
    'Heavenly',
    'Easy',
    'She\'s My Religion',
    'The Tide',
    'Tomorrow',
    'Change'
  ],
  'english teacher': [
    'Nearly Daffodils',
    'The World\'s Biggest Paving Slab',
    'Mastermind Specialism',
    'Albert Road',
    'Not Everybody Gets to Go to Space',
    'Broken Biscuits',
    'Good Grief',
    'Song About a Song',
    'Blister',
    'This Could Be Texas'
  ],

  // Sunday Artists
  'olly murs': [
    'Dance with Me Tonight',
    'Heart Skips a Beat',
    'Troublemaker',
    'Dear Darlin\'',
    'Wrapped Up',
    'That Girl',
    'Up',
    'Years & Years',
    'Please Don\'t Let Me Go',
    'Moves'
  ],
  'jess glynne': [
    'Hold My Hand',
    'Rather Be',
    'Don\'t Be So Hard on Yourself',
    'Real Love',
    'Right Here',
    'I\'ll Be There',
    'These Days',
    'Thursday',
    'All I Am',
    'Take Me Home'
  ],
  'texas': [
    'I Don\'t Want a Lover',
    'Say What You Want',
    'Halo',
    'Black Eyed Boy',
    'Summer Son',
    'In Our Lifetime',
    'Prayer for You',
    'When We Are Together',
    'Sleep',
    'Inner Smile'
  ],
  'ella eyre': [
    'If I Go',
    'Comeback',
    'Good Times',
    'Waiting All Night',
    'Together',
    'Home',
    'We Don\'t Have to Take Our Clothes Off',
    'Answerphone',
    'Even If',
    'Deeper'
  ],
  'alison moyet': [
    'Love Resurrection',
    'All Cried Out',
    'Invisible',
    'Weak in the Presence of Beauty',
    'Is This Love?',
    'Whispering Your Name',
    'Essex',
    'Only You',
    'Don\'t Go',
    'Nobody\'s Diary'
  ],
  'lightning seeds': [
    'Pure',
    'The Life of Riley',
    'Lucky You',
    'Three Lions',
    'Perfect',
    'Ready or Not',
    'Sugar Coated Iceberg',
    'Sense',
    'What If...',
    'Marvellous'
  ],
  'james': [
    'Come Home',
    'She\'s a Star',
    'Sit Down',
    'Moving On',
    'Born of Frustration',
    'Sometimes',
    'Laid',
    'Getting Away with It',
    'Tomorrow',
    'Just Like Fred Astaire'
  ],
  'bjorn again': [
    'Dancing Queen',
    'Mamma Mia',
    'Fernando',
    'Waterloo',
    'Take a Chance on Me',
    'SOS',
    'Knowing Me, Knowing You',
    'Money, Money, Money',
    'The Winner Takes It All',
    'Super Trouper'
  ]
};

function tryFallbackSetlist(artistName: string) {
  console.log(`tryFallbackSetlist called with: "${artistName}"`);
  const normalizedName = artistName.toLowerCase();
  console.log(`Normalized name: "${normalizedName}"`);
  console.log(`Available fallback artists:`, Object.keys(FALLBACK_SETLISTS));
  
  const fallbackSongs = FALLBACK_SETLISTS[normalizedName];
  
  if (fallbackSongs) {
    console.log(`Using fallback setlist for ${artistName} with ${fallbackSongs.length} songs`);
    console.log(`Fallback songs:`, fallbackSongs);
    // Return in the same format as a real setlist
    const fallbackData = [{
      song: fallbackSongs.map(songName => ({ name: songName }))
    }];
    console.log(`Returning fallback data:`, JSON.stringify(fallbackData, null, 2));
    return NextResponse.json(fallbackData);
  }
  
  console.log(`No fallback setlist available for "${artistName}" (normalized: "${normalizedName}")`);
  return NextResponse.json({ error: 'No setlists found for this artist' }, { status: 404 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artistName = searchParams.get('artistName');

  if (!SETLIST_FM_API_KEY) {
    console.error('Server configuration error: SETLIST_FM_API_KEY is not set in environment variables.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  if (!artistName) {
    return NextResponse.json({ error: 'Artist name is required' }, { status: 400 });
  }

  try {
    console.log(`Searching for artist: ${artistName}`);
    
    // Search with more results to get better matches
    const searchResponse = await axios.get(`https://api.setlist.fm/rest/1.0/search/artists`, {
      params: { 
        artistName,
        p: 1, // page 1
        sort: 'relevance' // sort by relevance instead of sortName
      },
      headers: {
        'x-api-key': SETLIST_FM_API_KEY,
        'Accept': 'application/json',
      },
    });

    console.log(`Found ${searchResponse.data.total} total artists for "${artistName}"`);
    console.log('First 5 results:', searchResponse.data.artist.slice(0, 5).map((a: any) => a.name));

    if (!searchResponse.data.artist || searchResponse.data.artist.length === 0) {
      console.log(`No artist found for: ${artistName}`);
      return tryFallbackSetlist(artistName);
    }

    // Find the best matching artist with improved logic
    const artists = searchResponse.data.artist;
    let bestMatch = null;

    // First, look for an exact match
    const exactMatch = artists.find((artist: any) => 
      artist.name.toLowerCase() === artistName.toLowerCase()
    );

    if (exactMatch) {
      bestMatch = exactMatch;
      console.log(`Found exact match: ${exactMatch.name}`);
    } else {
      // Improved filtering: be more strict about what constitutes a collaboration
      const soloArtists = artists.filter((artist: any) => {
        const name = artist.name.toLowerCase();
        return !name.includes('feat.') &&
               !name.includes('feat ') &&
               !name.includes('ft.') &&
               !name.includes('ft ') &&
               !name.includes('featuring') &&
               !name.includes(' & ') &&
               !name.includes(' and ') &&
               !name.includes(' with ') &&
               !name.includes(' vs ') &&
               !name.includes(' x ');
      });

      console.log(`Found ${soloArtists.length} solo artists:`, soloArtists.slice(0, 3).map((a: any) => a.name));

      if (soloArtists.length > 0) {
        // Among solo artists, find the one that best matches the search term
        bestMatch = soloArtists.find((artist: any) => 
          artist.name.toLowerCase() === artistName.toLowerCase()
        ) || soloArtists.find((artist: any) => 
          artist.name.toLowerCase().startsWith(artistName.toLowerCase())
        ) || soloArtists.find((artist: any) => 
          artist.name.toLowerCase().includes(artistName.toLowerCase())
        ) || soloArtists[0];
        
        console.log(`Selected solo artist: ${bestMatch.name}`);
      } else {
        // Fall back to the first result if no solo artists found
        bestMatch = artists[0];
        console.log(`No solo artists found, using first result: ${bestMatch.name}`);
      }
    }

    const mbid = bestMatch.mbid;
    console.log(`Using artist: ${bestMatch.name} with MBID: ${mbid}`);

    try {
      const setlistResponse = await axios.get(`https://api.setlist.fm/rest/1.0/artist/${mbid}/setlists`, {
        headers: {
          'x-api-key': SETLIST_FM_API_KEY,
          'Accept': 'application/json',
        },
      });

      console.log(`Found ${setlistResponse.data.setlist?.length || 0} setlists for ${bestMatch.name}`);

      if (!setlistResponse.data.setlist || setlistResponse.data.setlist.length === 0) {
          console.log(`No setlists found for artist: ${bestMatch.name}, checking fallback`);
          return tryFallbackSetlist(artistName);
      }

      const firstSetlist = setlistResponse.data.setlist[0];
      console.log(`First setlist structure:`, JSON.stringify(firstSetlist, null, 2));
      
      if (!firstSetlist.sets || !firstSetlist.sets.set) {
          console.log(`No sets found in the setlist for artist: ${bestMatch.name}, checking fallback`);
          return tryFallbackSetlist(artistName);
      }

      // Check if sets are empty or have no songs
      const sets = firstSetlist.sets.set;
      const totalSongs = sets.reduce((count: number, set: any) => {
        return count + (set.song ? set.song.length : 0);
      }, 0);

      console.log(`Found ${sets.length} sets with ${totalSongs} total songs for artist: ${bestMatch.name}`);
      
      if (totalSongs === 0) {
        console.log(`Sets exist but contain no songs for artist: ${bestMatch.name}, checking fallback`);
        return tryFallbackSetlist(artistName);
      }

      console.log(`Returning ${sets.length} sets for artist: ${bestMatch.name}`);
      return NextResponse.json(sets);
    } catch (setlistError) {
      console.log(`Error fetching setlists for ${bestMatch.name}, trying fallback`);
      console.log('Setlist error:', setlistError);
      return tryFallbackSetlist(artistName);
    }

  } catch (error) {
    console.log(`Main catch block triggered, trying fallback for ${artistName}`);
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching artist:', error.response?.status, error.response?.data);
    } else {
      console.error('Generic error fetching artist:', error);
    }
    return tryFallbackSetlist(artistName);
  }
} 