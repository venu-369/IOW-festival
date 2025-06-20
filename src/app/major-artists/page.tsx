"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThreeBackground from '../../components/ThreeBackground';

interface MajorArtist {
  name: string;
  genre: string;
  day: string;
  stage: string;
  time: string;
  description: string;
  isHeadliner?: boolean;
}

const majorArtists: MajorArtist[] = [
  // Headliners
  {
    name: 'Justin Timberlake',
    genre: 'Pop/R&B',
    day: 'Sunday',
    stage: 'Main Stage',
    time: '9:15pm - 10:50pm',
    description: 'Multi-Grammy winner and global superstar bringing his biggest hits to the festival.',
    isHeadliner: true
  },
  {
    name: 'Sting',
    genre: 'Pop/Rock',
    day: 'Friday',
    stage: 'Main Stage',
    time: '8:30pm - 10:00pm',
    description: 'Legendary artist with The Police and solo career spanning decades of iconic music.',
    isHeadliner: true
  },
  {
    name: 'Stereophonics',
    genre: 'Rock/Alternative',
    day: 'Saturday',
    stage: 'Main Stage',
    time: 'TBA',
    description: 'Welsh rock legends known for anthemic hits and powerful live performances.',
    isHeadliner: true
  },
  
  // Major Artists
  {
    name: 'Jess Glynne',
    genre: 'Pop/Soul',
    day: 'Sunday',
    stage: 'Main Stage',
    time: '7:30pm - 8:30pm',
    description: 'Chart-topping vocalist with multiple UK #1 singles and powerful voice.'
  },
  {
    name: 'Olly Murs',
    genre: 'Pop',
    day: 'Sunday',
    stage: 'Main Stage',
    time: '4:20pm - 5:10pm',
    description: 'X Factor alumnus turned pop sensation with numerous chart hits.'
  },
  {
    name: 'Texas',
    genre: 'Alternative Rock',
    day: 'Sunday',
    stage: 'Main Stage',
    time: '5:50pm - 6:50pm',
    description: 'Scottish rock band with decades of hits and Sharleen Spiteri\'s distinctive vocals.'
  },
  {
    name: 'Clean Bandit',
    genre: 'Electronic Pop',
    day: 'Friday',
    stage: 'Big Top',
    time: '11:45pm - 12:55am',
    description: 'Electronic group known for classical-electronic fusion and massive dance hits.'
  },
  {
    name: 'Faithless',
    genre: 'Electronic/Dance',
    day: 'Friday',
    stage: 'Main Stage',
    time: '10:40pm - 11:55pm',
    description: 'Electronic music pioneers behind iconic tracks like "Insomnia" and "God Is a DJ".'
  },
  {
    name: 'The Corrs',
    genre: 'Celtic Pop',
    day: 'Friday',
    stage: 'Main Stage',
    time: '6:40pm - 7:50pm',
    description: 'Irish family band blending traditional Celtic music with contemporary pop.'
  },
  {
    name: 'Supergrass',
    genre: 'Britpop/Rock',
    day: 'Saturday',
    stage: 'Main Stage',
    time: '11:40pm - 1:00am',
    description: 'Britpop legends known for energetic performances and hits like "Alright".'
  },
  {
    name: 'James',
    genre: 'Alternative Rock',
    day: 'Sunday',
    stage: 'Big Top',
    time: '10:10pm - 11:55pm',
    description: 'Manchester indie legends with Tim Booth\'s distinctive vocals and "Sit Down".'
  },
  {
    name: 'Lightning Seeds',
    genre: 'Alternative Pop',
    day: 'Sunday',
    stage: 'Big Top',
    time: '8:15pm - 9:15pm',
    description: 'Ian Broudie\'s project behind "Three Lions" and numerous indie pop classics.'
  }
];

export default function MajorArtists() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const headliners = majorArtists.filter(artist => artist.isHeadliner);
  const otherMajorArtists = majorArtists.filter(artist => !artist.isHeadliner);

  return (
    <>
      <ThreeBackground theme="main" />
      <div className="content-overlay">
        <div className="min-h-screen">
          {/* Header */}
          <header className="py-8 lg:py-12">
            <div className="container mx-auto px-4">
              <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 group">
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Home
              </Link>
              
              <div className="text-center mb-8 fade-in">
                <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                  Major Artists
                </h1>
                <p className="text-2xl text-white/80 mb-2">Festival Headliners & Popular Acts</p>
                <p className="text-lg text-white/60">Isle of Wight Festival 2025</p>
                
                {/* Music Visualizer */}
                <div className="flex justify-center mt-6">
                  <div className="music-bars">
                    <div className="music-bar"></div>
                    <div className="music-bar"></div>
                    <div className="music-bar"></div>
                    <div className="music-bar"></div>
                    <div className="music-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content - Full bleed with padding */}
          <main className="px-4 sm:px-6 lg:px-8">
            {/* Headliners Section */}
            <section className="mb-20 lg:mb-24 fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
                <span className="gradient-text">Festival Headliners</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                {headliners.map((artist, index) => (
                  <div key={artist.name} className={`slide-in-${index % 2 === 0 ? 'left' : 'right'}`}>
                    <Link href={`/artist/${encodeURIComponent(artist.name.toLowerCase())}`}>
                      <div className="card hover:scale-105 transition-all duration-500 h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-400/30 shadow-lg shadow-purple-500/20 min-h-[450px] flex flex-col justify-center">
                        <div className="text-center p-4">
                          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          </div>
                          
                          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-full mb-6">
                            HEADLINER
                          </span>
                          
                          <h3 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">{artist.name}</h3>
                          <p className="text-white/80 text-xl mb-3">{artist.genre}</p>
                          <p className="text-white/60 text-base mb-4">{artist.day} • {artist.stage}</p>
                          <p className="text-white/60 text-base mb-6">{artist.time}</p>
                          <p className="text-white/70 text-base leading-relaxed">{artist.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Other Major Artists Section */}
            <section className="fade-in pb-16 lg:pb-24">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
                <span className="gradient-text">More Major Artists</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                {otherMajorArtists.map((artist, index) => (
                  <div key={artist.name} className={`slide-in-${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <Link href={`/artist/${encodeURIComponent(artist.name.toLowerCase())}`}>
                      <div className="card hover:scale-105 transition-all duration-300 h-full group min-h-[320px]">
                        <div className="flex items-start space-x-6 p-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg mt-1">
                            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                            </svg>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:gradient-text transition-all mb-3">
                              {artist.name}
                            </h3>
                            <p className="text-white/70 text-base mb-2">{artist.genre}</p>
                            <p className="text-white/60 text-sm mb-3">{artist.day} • {artist.stage}</p>
                            <p className="text-white/60 text-sm mb-4">{artist.time}</p>
                            <p className="text-white/70 text-sm lg:text-base leading-relaxed">{artist.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
} 