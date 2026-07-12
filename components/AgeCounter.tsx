'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const BIRTH = new Date('2009-10-13T00:00:00Z').getTime();
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

const emptySubscribe = () => () => {};

export function AgeCounter() {
  // Live ticking is the default; SSR and the first client paint render the
  // static label so server and client markup always match.
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [live, setLive] = useState(true);
  const [age, setAge] = useState(() =>
    ((Date.now() - BIRTH) / YEAR_MS).toFixed(8),
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const toggle = () => setLive((v) => !v);
    window.addEventListener('toggle-age', toggle);
    return () => window.removeEventListener('toggle-age', toggle);
  }, []);

  useEffect(() => {
    if (!live) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }
    const update = () => setAge(((Date.now() - BIRTH) / YEAR_MS).toFixed(8));
    intervalRef.current = window.setInterval(update, 50);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [live]);

  const showLive = hydrated && live;

  return (
    <button
      type="button"
      onClick={() => setLive((v) => !v)}
      className={`cursor-pointer border-none bg-transparent p-0 font-mono text-[13px] uppercase tracking-[0.08em] text-ink-40${showLive ? ' inline-block min-w-[17ch] text-left' : ''}`}
      aria-label="Toggle live age counter"
    >
      {showLive ? `${age} years` : 'Est. 2009'}
    </button>
  );
}
