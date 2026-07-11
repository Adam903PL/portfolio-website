'use client';

import { useEffect, useRef, useState } from 'react';

const BIRTH = new Date('2009-01-01T00:00:00Z').getTime();
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export function AgeCounter() {
  const [live, setLive] = useState(false);
  const [age, setAge] = useState('');
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
    update();
    intervalRef.current = window.setInterval(update, 50);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [live]);

  return (
    <button
      type="button"
      onClick={() => setLive((v) => !v)}
      className="cursor-pointer border-none bg-transparent p-0 font-mono text-[13px] uppercase tracking-[0.08em] text-ink-40"
      aria-label="Toggle live age counter"
    >
      {live ? `${age} years` : 'Est. 2009'}
    </button>
  );
}
