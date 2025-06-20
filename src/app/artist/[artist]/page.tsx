"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ThreeBackground from '../../../components/ThreeBackground';

interface Setlist {
  song: { name: string }[];
}

export default function ArtistPage({ params }: { params: Promise<{ artist: string }> }) {
  const resolvedParams = use(params);
  const artistName = decodeURIComponent(resolvedParams.artist).replace(/\b\w/g, l => l.toUpperCase());
  const [songTitle, setSongTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [lyricsError, setLyricsError] = useState('');
  const [setlist, setSetlist] = useState<Setlist[]>([]);
  const [loadingSetlist, setLoadingSetlist] = useState(false);
  const [setlistError, setSetlistError] = useState('');
  const [isFallbackSetlist, setIsFallbackSetlist] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSetlist = async () => {
      setLoadingSetlist(true);
      setSetlistError('');
      setIsFallbackSetlist(false);
      try {
        const response = await axios.get(`/api/setlist?artistName=${artistName}`);
        if (response.data && Array.isArray(response.data)) {
          setSetlist(response.data);
          if (response.data.length === 1 && response.data[0].song && response.data[0].song.length > 5) {
            setIsFallbackSetlist(true);
          }
        } else {
          setSetlistError('Invalid data format received from server');
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setSetlistError(`No setlists found for ${artistName}. This artist may not have recorded setlists in the database.`);
        } else {
          setSetlistError('Failed to load setlist. Please try again later.');
        }
      } finally {
        setLoadingSetlist(false);
      }
    };

    if (mounted) {
      fetchSetlist();
    }
  }, [artistName, mounted]);

  const fetchLyrics = async (e?: React.FormEvent, songName?: string) => {
    if (e) e.preventDefault();
    const searchSong = songName || songTitle;
    if (!searchSong.trim()) return;
    
    setLoadingLyrics(true);
    setLyricsError('');
    setLyrics('');

    try {
      const response = await axios.get(`https://api.lyrics.ovh/v1/${artistName}/${searchSong}`);
      setLyrics(response.data.lyrics);
    } catch (err) {
      setLyricsError('Lyrics not found for this song.');
      setLyrics('');
    } finally {
      setLoadingLyrics(false);
    }
  };

  const handleSongClick = (song: string) => {
    setSongTitle(song);
    fetchLyrics(undefined, song);
  };

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
      <div className="content-overlay artist-layout">
        {/* Header - Contained for centered content */}
        <header className="artist-header">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4 group">
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
            
            <div className="text-center fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-2">
                {artistName}
              </h1>
              <div className="flex justify-center mt-4">
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
        <main className="artist-content px-4 sm:px-6 lg:px-8">
          {/* Setlist Section */}
          <section className="full-height-card slide-in-left">
            <header className="card-header flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Setlist</h2>
            </header>
            
            <div className="card-content pr-4 -mr-4">
              {loadingSetlist && (
                <div className="space-y-4 pt-2">
                  {[...Array(10)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl"></div>)}
                </div>
              )}
              {setlistError && (
                <div className="glass p-6 rounded-xl border-l-4 border-red-500"><p className="text-red-300">{setlistError}</p></div>
              )}
              {setlist.length > 0 && (
                <div className="space-y-3">
                  {isFallbackSetlist && (
                    <div className="glass p-4 rounded-xl border-l-4 border-blue-400 mb-6">
                      <p className="text-blue-300 font-semibold text-base">Popular Songs</p>
                      <p className="text-blue-200/80 text-sm mt-1">Since no official setlist was found, here are some popular songs.</p>
                    </div>
                  )}
                  {setlist.map((set, index) => (
                    <div key={index}>
                      {!isFallbackSetlist && setlist.length > 1 && <h3 className="text-xl font-bold text-white/80 my-4">Set {index + 1}</h3>}
                      <div className="space-y-3">
                        {set.song.map((s, songIndex) => (
                          <button key={`${s.name}-${songIndex}`} onClick={() => handleSongClick(s.name)} className="w-full text-left p-5 glass hover:bg-white/10 rounded-xl transition-all duration-300 group">
                            <div className="flex items-center justify-between">
                              <span className="text-xl lg:text-2xl text-white group-hover:gradient-text font-semibold">{s.name}</span>
                              <svg className="w-6 h-6 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Lyrics Section */}
          <section className="full-height-card slide-in-right">
            <header className="card-header flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Lyrics</h2>
            </header>
            
            <form onSubmit={fetchLyrics} className="mb-4 flex-shrink-0">
              <div className="flex gap-3">
                <input type="text" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} placeholder="Enter song title or pick from setlist" className="flex-1 px-5 py-3 text-lg glass border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all"/>
                <button type="submit" disabled={loadingLyrics || !songTitle.trim()} className="btn btn-primary px-6 py-3 text-lg disabled:opacity-50">
                  {loadingLyrics ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
            
            <div className="card-content pr-4 -mr-4">
              {lyricsError && (
                <div className="glass p-6 rounded-xl border-l-4 border-yellow-500"><p className="text-yellow-200">{lyricsError}</p></div>
              )}
              {lyrics ? (
                <div className="fade-in">
                  <h3 className="text-2xl font-bold text-white mb-4 gradient-text">Lyrics for "{songTitle}"</h3>
                  <pre className="whitespace-pre-wrap text-white/90 leading-relaxed font-mono text-base">{lyrics}</pre>
                </div>
              ) : (
                !loadingLyrics && (
                  <div className="text-center flex flex-col justify-center items-center h-full">
                    <svg className="w-20 h-20 text-white/30 mb-4" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/></svg>
                    <p className="text-white/60 text-lg">Click a song to see lyrics here</p>
                  </div>
                )
              )}
              {loadingLyrics && (
                <div className="text-center flex flex-col justify-center items-center h-full">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <p className="text-white/80 mt-4 text-lg">Fetching lyrics...</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
} 