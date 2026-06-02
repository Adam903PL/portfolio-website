'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { NowPlayingData } from '@/lib/spotify';

const POLL_INTERVAL = 15_000;

export default function SpotifyListeningCard() {
  const [data, setData] = useState<NowPlayingData>({ isPlaying: false });
  const [progress, setProgress] = useState(0);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const response = await fetch('/api/now-playing');
      const json: NowPlayingData = await response.json();

      setData(json);
      setProgress(
        json.progress && json.duration
          ? (json.progress / json.duration) * 100
          : 0,
      );
    } catch {
      setData({ isPlaying: false });
      setProgress(0);
    }
  }, []);

  useEffect(() => {
    const firstFetchId = window.setTimeout(() => {
      void fetchNowPlaying();
    }, 0);
    const intervalId = window.setInterval(() => {
      void fetchNowPlaying();
    }, POLL_INTERVAL);

    return () => {
      window.clearTimeout(firstFetchId);
      window.clearInterval(intervalId);
    };
  }, [fetchNowPlaying]);

  useEffect(() => {
    if (!data.isPlaying || !data.progress || !data.duration) return;

    const startTime = Date.now();
    const startProgress = data.progress;

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const currentMs = startProgress + elapsed;
      const percentage = Math.min((currentMs / data.duration!) * 100, 100);

      setProgress(percentage);
      if (percentage < 100) requestAnimationFrame(frame);
    };

    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  const hasTrack = Boolean(data.title);
  const isLive = data.isPlaying;
  const statusLabel = data.isPlaying
    ? 'Now Playing'
    : hasTrack
      ? 'Last Played'
      : 'Spotify';
  const progressWidth = isLive && data.duration ? `${progress}%` : '0%';
  const currentTime = formatTime(
    isLive && data.progress && data.duration
      ? Math.min((progress / 100) * data.duration, data.duration)
      : data.progress,
  );
  const durationTime = formatTime(data.duration);
  const liveCardClass =
    'border-[#1DB954]/35 bg-black/85 shadow-[0_0_0_1px_rgba(29,185,84,0.12),0_0_34px_rgba(29,185,84,0.24)] hover:border-[#1DB954]/60 hover:bg-black/75 hover:shadow-[0_0_0_1px_rgba(29,185,84,0.24),0_0_46px_rgba(29,185,84,0.34)] motion-safe:animate-[spotifyGlow_2.8s_ease-in-out_infinite]';
  const idleCardClass =
    'border-white/10 bg-black/75 shadow-none hover:border-white/20 hover:bg-black/65';
  const statusClass = isLive ? 'text-[#1DB954]' : 'text-white/42';
  const progressFillClass = isLive
    ? 'bg-[#1DB954] shadow-[0_0_18px_rgba(29,185,84,0.85)]'
    : 'bg-white/18';

  return (
    <a
      href={data.songUrl || 'https://open.spotify.com'}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative grid min-h-32 w-full grid-cols-[104px_minmax(0,1fr)] items-center gap-4 overflow-hidden rounded-[18px] border p-4 backdrop-blur-xl transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#1DB954]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:grid-cols-[120px_minmax(0,1fr)] sm:p-5 ${
        isLive ? liveCardClass : idleCardClass
      }`}
      aria-label={
        hasTrack
          ? `Open ${data.title} by ${data.artists ?? 'unknown artist'} on Spotify`
          : 'Open Spotify'
      }
    >
      {isLive && (
        <>
          <div
            aria-hidden
            className="absolute inset-y-4 left-0 w-[3px] rounded-full bg-[#1DB954] shadow-[0_0_22px_rgba(29,185,84,0.95)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#1DB954]/80 to-transparent"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 left-8 size-36 rounded-full bg-[#1DB954]/10 blur-3xl"
          />
        </>
      )}

      <div className="relative flex h-[104px] w-[104px] items-center justify-center sm:h-[116px] sm:w-[116px]">
        <VinylRecord
          active={isLive}
          hasTrack={hasTrack}
          albumImage={data.albumImage}
          album={data.album}
        />
      </div>

      <div className="relative min-w-0">
        <div className="mb-2 flex items-center gap-2">
          {data.isPlaying ? (
            <SoundWave />
          ) : (
            <span className="size-2 rounded-full bg-white/35" />
          )}
          <p
            className={`text-[10px] font-black uppercase tracking-[0.26em] ${statusClass}`}
          >
            {statusLabel}
          </p>
        </div>

        <p className="truncate text-xl font-black leading-tight text-white sm:text-2xl">
          {hasTrack ? data.title : 'Not Playing'}
        </p>

        <p className="mt-1 truncate font-mono text-xs font-semibold text-white/42 sm:text-sm">
          {hasTrack ? data.artists : 'Open Spotify'}
        </p>

        {hasTrack && isLive && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-white/32">
              <span>{currentTime}</span>
              <span>{durationTime}</span>
            </div>
            <div className="relative h-[5px] overflow-hidden rounded-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0_3px,rgba(255,255,255,0.04)_3px_8px)]">
              <div
                className={`h-full rounded-full transition-[width] duration-1000 ${progressFillClass}`}
                style={{ width: progressWidth }}
              />
              {isLive && (
                <span
                  aria-hidden
                  className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border border-white bg-[#1DB954] shadow-[0_0_18px_rgba(29,185,84,1)] transition-[left] duration-1000"
                  style={{ left: `calc(${progressWidth} - 6px)` }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-[#1DB954] drop-shadow-[0_0_10px_rgba(29,185,84,0.8)]">
        <SpotifyIcon className="size-4" />
      </div>

      <ArrowUpRight
        aria-hidden
        className="absolute bottom-4 right-4 size-4 text-gray-500 transition-colors duration-200 group-hover:text-white"
      />
    </a>
  );
}

function formatTime(value?: number) {
  if (!value || value < 0) return '0:00';

  const totalSeconds = Math.floor(value / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function BumPulseRings({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    >
      <span className="absolute size-7 rounded-full border border-[#1DB954]/55 shadow-[0_0_18px_rgba(29,185,84,0.38)] motion-safe:animate-[spotifyPulse_1.45s_ease-out_infinite]" />
      <span className="absolute size-7 rounded-full border border-[#1DB954]/35 motion-safe:animate-[spotifyPulse_1.45s_ease-out_infinite_0.38s]" />
    </div>
  );
}

function VinylRecord({
  active,
  hasTrack,
  albumImage,
  album,
}: {
  active: boolean;
  hasTrack: boolean;
  albumImage?: string;
  album?: string;
}) {
  return (
    <div
      className={`relative h-[82px] w-[82px] overflow-hidden rounded-full border bg-[repeating-radial-gradient(circle_at_center,#111_0_5px,#181818_5px_9px,#080808_9px_14px)] shadow-[inset_0_0_22px_rgba(0,0,0,0.85)] sm:h-[90px] sm:w-[90px] ${
        active ? 'motion-safe:animate-[recordSpin_4.8s_linear_infinite]' : ''
      } ${active ? 'border-[#1DB954]/22 shadow-[inset_0_0_22px_rgba(0,0,0,0.85),0_0_28px_rgba(29,185,84,0.18)]' : 'border-white/10'}`}
    >
      <div
        className={`absolute inset-[9px] rounded-full border ${
          active ? 'border-[#1DB954]/18' : 'border-white/8'
        }`}
      />
      <div className="absolute inset-[18px] overflow-hidden rounded-full border border-white/10 bg-black">
        {hasTrack && albumImage ? (
          <Image
            src={albumImage}
            alt={album || 'Album cover'}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_34%,rgba(0,0,0,0.4)_68%)]" />
        )}
      </div>
      <BumPulseRings active={active} />
      <div
        className={`absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-black ${
          active
            ? 'border-[#1DB954]/80 shadow-[0_0_14px_rgba(29,185,84,0.85)]'
            : 'border-white/25'
        }`}
      />
      <div
        className={`absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          active ? 'bg-[#1DB954]' : 'bg-white/45'
        }`}
      />
    </div>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function SoundWave() {
  return (
    <div className="flex h-3 items-end gap-[2px]" aria-hidden>
      <span
        className="w-[2px] rounded-full bg-[#1DB954] motion-safe:animate-[soundwave_0.8s_ease-in-out_infinite]"
        style={{ height: '45%', animationDelay: '0s' }}
      />
      <span
        className="w-[2px] rounded-full bg-[#1DB954] motion-safe:animate-[soundwave_0.8s_ease-in-out_infinite]"
        style={{ height: '75%', animationDelay: '0.15s' }}
      />
      <span
        className="w-[2px] rounded-full bg-[#1DB954] motion-safe:animate-[soundwave_0.8s_ease-in-out_infinite]"
        style={{ height: '100%', animationDelay: '0.3s' }}
      />
      <span
        className="w-[2px] rounded-full bg-[#1DB954] motion-safe:animate-[soundwave_0.8s_ease-in-out_infinite]"
        style={{ height: '60%', animationDelay: '0.45s' }}
      />
    </div>
  );
}
