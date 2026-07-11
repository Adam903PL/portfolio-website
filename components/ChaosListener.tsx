'use client';

import { useEffect, useRef } from 'react';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
const CHAOS_MS = 4000;

export function ChaosListener() {
  const progress = useRef(0);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    const trigger = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      document.documentElement.setAttribute('data-chaos', 'true');
      if (timeout.current) window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => {
        document.documentElement.removeAttribute('data-chaos');
      }, CHAOS_MS);
    };

    const onKey = (e: KeyboardEvent) => {
      progress.current =
        e.key === KONAMI[progress.current] ? progress.current + 1 : 0;
      if (progress.current === KONAMI.length) {
        progress.current = 0;
        trigger();
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('chaos', trigger);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('chaos', trigger);
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  return null;
}
