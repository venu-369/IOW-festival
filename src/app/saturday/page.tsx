"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThreeBackground from '../../components/ThreeBackground';

interface Artist {
  name: string;
  time: string;
  genre: string;
  isHeadliner?: boolean;
}

const saturdayArtists: Record<string, Artist[]> = {
  'Main Stage': [
    { name: 'The Clause', time: '2:35pm - 3:15pm', genre: 'Indie Rock' },
    { name: 'Matilda Mann', time: '3:45pm - 4:25pm', genre: 'Indie Folk' },
    { name: 'Arthur Hill', time: '5:00pm - 5:45pm', genre: 'Pop' },
    { name: 'Pale Waves', time: '6:20pm - 7:10pm', genre: 'Indie Pop' },
    { name: 'English Teacher', time: '7:50pm - 8:40pm', genre: 'Art Rock' },
    { name: 'Yard Act', time: '9:25pm - 10:25pm', genre: 'Post-Punk' },
    { name: 'Stereophonics', time: '8:30pm - 10:00pm', genre: 'Rock', isHeadliner: true },
    { name: 'Supergrass', time: '11:40pm - 1:00am', genre: 'Britpop' },
  ],
  'River Stage': [
    { name: 'The Rizz', time: '1:20pm - 1:50pm', genre: 'Indie' },
    { name: 'Raquelle Gracie', time: '2:20pm - 2:50pm', genre: 'Pop' },
    { name: 'The Deckchairs', time: '3:20pm - 3:50pm', genre: 'Indie Rock' },
    { name: 'Pronghorn', time: '4:20pm - 4:50pm', genre: 'Alternative' },
    { name: 'Queenbees', time: '5:20pm - 5:50pm', genre: 'Rock' },
    { name: 'Neckbreakers', time: '6:20pm - 6:50pm', genre: 'Punk' },
    { name: 'The Blue Water Giants', time: '7:20pm - 8:00pm', genre: 'Rock' },
    { name: 'The Molotovs', time: '8:30pm - 9:10pm', genre: 'Punk Rock' },
    { name: 'Tom Meighan', time: '9:40pm - 10:40pm', genre: 'Rock' },
  ],
};

export default function Saturday() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-orange-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <ThreeBackground theme="rock" />
      <div className="content-overlay">
        <div className="container mx-auto px-4 py-8 min-h-screen">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 group">
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
            
            <div className="text-center mb-8 fade-in">
              <h1 className="text-6xl md:text-7xl font-bold gradient-text-rock mb-4">
                Saturday
              </h1>
              <p className="text-2xl text-white/80 mb-2">Rock & Alternative</p>
              <p className="text-lg text-white/60">June 20, 2025</p>
              
              {/* Music Visualizer */}
              <div className="flex justify-center mt-6">
                <div className="music-bars">
                  <div className="music-bar" style={{ background: 'var(--rock-primary)' }}></div>
                  <div className="music-bar" style={{ background: 'var(--rock-secondary)' }}></div>
                  <div className="music-bar" style={{ background: 'var(--rock-accent)' }}></div>
                  <div className="music-bar" style={{ background: 'var(--rock-primary)' }}></div>
                  <div className="music-bar" style={{ background: 'var(--rock-secondary)' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stage Lineup */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
            {Object.entries(saturdayArtists).map(([stage, artists], stageIndex) => (
              <div key={stage} className={`slide-in-${stageIndex === 0 ? 'left' : 'right'}`}>
                <div className="glass-strong p-8 lg:p-10 rounded-2xl h-full">
                  <div className="flex items-center mb-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center mr-6 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">{stage}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {artists.map((artist, index) => (
                      <div key={artist.name} className={`group ${artist.isHeadliner ? 'headliner-card' : ''}`}>
                        <Link href={`/artist/${encodeURIComponent(artist.name.toLowerCase())}`}>
                          <div className={`p-6 lg:p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
                            artist.isHeadliner 
                              ? 'bg-gradient-to-r from-red-600/20 to-orange-500/20 border-2 border-red-400/30 shadow-lg shadow-red-500/20' 
                              : 'glass hover:bg-white/10'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-3">
                                  <h3 className={`font-bold ${
                                    artist.isHeadliner ? 'gradient-text-rock text-2xl lg:text-3xl' : 'text-white group-hover:gradient-text-rock text-xl lg:text-2xl'
                                  }`}>
                                    {artist.name}
                                  </h3>
                                  {artist.isHeadliner && (
                                    <span className="ml-4 px-3 py-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-semibold rounded-full">
                                      HEADLINER
                                    </span>
                                  )}
                                </div>
                                <p className="text-white/70 text-base mb-2">{artist.genre}</p>
                                <p className="text-white/60 text-sm lg:text-base">{artist.time}</p>
                              </div>
                              
                              <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-7 h-7 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 lg:mt-20 text-center fade-in">
            <div className="glass p-8 rounded-xl max-w-2xl mx-auto">
              <p className="text-white/60 text-base lg:text-lg">
                Click on any artist to explore their setlist and find lyrics for their songs
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 