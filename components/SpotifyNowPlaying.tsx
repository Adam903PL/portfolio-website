'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { NowPlayingData } from '@/lib/spotify';

const POLL_INTERVAL = 15_000;

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlayingData>({ isPlaying: false });
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch('/api/now-playing');
      const json: NowPlayingData = await res.json();
      setData(json);
      if (json.progress && json.duration) {
        setProgress((json.progress / json.duration) * 100);
      } else {
        setProgress(0);
      }
    } catch {
      setData({ isPlaying: false });
    }
  }, []);

  // Polling
  useEffect(() => {
    fetchNowPlaying();
    const id = setInterval(fetchNowPlaying, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchNowPlaying]);

  // Client-side progress interpolation (smooth bar)
  useEffect(() => {
    if (!data?.isPlaying || !data.progress || !data.duration) return;

    const startTime = Date.now();
    const startProgress = data.progress;

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const currentMs = startProgress + elapsed;
      const pct = Math.min((currentMs / data.duration!) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(frame);
    };

    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  const hasTrack = !!data.title;

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Expanded card */}
      <div
        className={`
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-left
          ${isExpanded ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-75 translate-y-2 pointer-events-none'}
        `}
      >
        <a
          href={data.songUrl || 'https://open.spotify.com'}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 p-3 pr-5 mb-3
                     w-[280px] rounded-2xl
                     border border-white/10 bg-black/70 backdrop-blur-xl
                     hover:bg-black/80 hover:border-white/20 transition-all duration-300
                     shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle green accent line at top */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#1DB954]/40 to-transparent" />

          {/* Album Art */}
          <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-black/50">
            {hasTrack && data.albumImage ? (
              <Image
                src={data.albumImage}
                alt={data.album || 'Album cover'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <SpotifyIcon className="w-5 h-5 text-[#1DB954]" />
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            {/* Status row */}
            <div className="flex items-center gap-1.5 mb-0.5">
              {data.isPlaying ? (
                <>
                  <SoundWave />
                  <span className="text-[9px] font-semibold text-[#1DB954] uppercase tracking-[0.15em]">
                    Now Playing
                  </span>
                </>
              ) : (
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-[0.15em]">
                  {hasTrack ? 'Recently Played' : 'Spotify'}
                </span>
              )}
            </div>

            {/* Song title */}
            <p className="text-[13px] font-semibold text-white truncate leading-tight">
              {hasTrack ? data.title : 'Not Playing'}
            </p>

            {/* Artist */}
            {hasTrack && (
              <p className="text-[11px] text-gray-400 truncate mt-px">
                {data.artists}
              </p>
            )}

            {/* Progress bar */}
            {data.isPlaying && data.duration && (
              <div className="mt-1.5 h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1DB954] transition-[width] duration-1000 linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </a>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          group relative w-12 h-12 rounded-full
          border border-white/10 bg-black/70 backdrop-blur-xl
          flex items-center justify-center
          hover:border-[#1DB954]/40 hover:bg-black/80
          transition-all duration-300
          shadow-[0_4px_20px_rgba(0,0,0,0.4)]
          ${isExpanded ? 'border-[#1DB954]/30' : ''}
        `}
        aria-label="Toggle Spotify widget"
      >
        {/* Animated ring when playing */}
        {data.isPlaying && (
          <div className="absolute inset-0 rounded-full border-2 border-[#1DB954]/20 animate-ping pointer-events-none" 
               style={{ animationDuration: '2s' }} />
        )}

        {/* Album art thumbnail or Spotify icon */}
        {hasTrack && data.albumImage ? (
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={data.albumImage}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
            {/* Overlay with Spotify icon on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <SpotifyIcon className="w-5 h-5 text-[#1DB954]" />
            </div>
          </div>
        ) : (
          <SpotifyIcon className="w-5 h-5 text-[#1DB954] group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}

/* ── Inline SVG icons ── */

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function SoundWave() {
  return (
    <div className="flex items-end gap-[2px] h-2.5">
      <span className="w-[2px] bg-[#1DB954] rounded-full animate-[soundwave_0.8s_ease-in-out_infinite]" style={{ height: '40%', animationDelay: '0s' }} />
      <span className="w-[2px] bg-[#1DB954] rounded-full animate-[soundwave_0.8s_ease-in-out_infinite]" style={{ height: '70%', animationDelay: '0.15s' }} />
      <span className="w-[2px] bg-[#1DB954] rounded-full animate-[soundwave_0.8s_ease-in-out_infinite]" style={{ height: '100%', animationDelay: '0.3s' }} />
      <span className="w-[2px] bg-[#1DB954] rounded-full animate-[soundwave_0.8s_ease-in-out_infinite]" style={{ height: '55%', animationDelay: '0.45s' }} />
    </div>
  );
}
