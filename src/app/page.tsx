"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThreeBackground from '../components/ThreeBackground';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <ThreeBackground theme="main" />
      <div className="content-overlay">
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 lg:py-24">
          {/* Header Section */}
          <div className="text-center mb-20 lg:mb-24 fade-in">
            <div className="mb-8">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 gradient-text leading-none">
                Isle of Wight
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mb-6">
                Festival 2025
              </h2>
            </div>
            
            <div className="glass-strong p-8 rounded-2xl max-w-2xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-white/80 mb-4">
                Your ultimate guide to the artists, setlists, and lyrics
              </p>
              <p className="text-lg text-white/60">
                June 19-22, 2025 • Seaclose Park, Newport
              </p>
              
              {/* Music Visualizer Animation */}
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

          {/* Day Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-7xl w-full px-4 lg:px-8">
            {/* Friday - Pop/Mainstream */}
            <Link href="/friday" className="group">
              <div className="card hover:scale-105 transition-all duration-500 h-full min-h-[400px] flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold gradient-text-pop mb-6">Friday</h3>
                  <p className="text-white/70 mb-8 text-lg">Pop & Mainstream Hits</p>
                  <div className="btn btn-pop w-full group-hover:scale-105 transition-transform text-lg py-4">
                    Explore Friday
                  </div>
                </div>
              </div>
            </Link>

            {/* Saturday - Rock/Alternative */}
            <Link href="/saturday" className="group">
              <div className="card hover:scale-105 transition-all duration-500 h-full min-h-[400px] flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/>
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold gradient-text-rock mb-6">Saturday</h3>
                  <p className="text-white/70 mb-8 text-lg">Rock & Alternative</p>
                  <div className="btn btn-rock w-full group-hover:scale-105 transition-transform text-lg py-4">
                    Explore Saturday
                  </div>
                </div>
              </div>
            </Link>

            {/* Sunday - Electronic/Diverse */}
            <Link href="/sunday" className="group">
              <div className="card hover:scale-105 transition-all duration-500 h-full min-h-[400px] flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold gradient-text-electronic mb-6">Sunday</h3>
                  <p className="text-white/70 mb-8 text-lg">Electronic & Diverse</p>
                  <div className="btn btn-electronic w-full group-hover:scale-105 transition-transform text-lg py-4">
                    Explore Sunday
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Major Artists Section */}
          <div className="mt-24 lg:mt-32 text-center fade-in max-w-4xl mx-auto">
            <Link href="/major-artists" className="group">
              <div className="glass-strong p-10 lg:p-12 rounded-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-6 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold gradient-text">Major Artists</h3>
                </div>
                <p className="text-white/80 mb-6 text-xl">
                  Explore the festival's headliners and popular artists
                </p>
                <p className="text-white/60 text-base lg:text-lg">
                  Justin Timberlake • Sting • Stereophonics • Jess Glynne • Clean Bandit & more
                </p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-purple-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer Info */}
          <div className="mt-24 lg:mt-32 text-center fade-in">
            <div className="glass p-8 rounded-xl max-w-2xl mx-auto">
              <p className="text-white/60 text-base lg:text-lg">
                Click on any day to explore the lineup, discover setlists, and find lyrics for your favorite songs
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
