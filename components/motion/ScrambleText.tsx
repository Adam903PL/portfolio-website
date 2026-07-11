'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}=+*^?#';
const FRAMES = 10;
const FRAME_MS = 36;

export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  if (prevText !== text) {
    setPrevText(text);
    setDisplay(text);
  }

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = () => {
    if (prefersReduced) return;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    let frame = 0;
    intervalRef.current = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / FRAMES) * text.length);
      if (frame >= FRAMES) {
        window.clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setDisplay(text);
        return;
      }
      setDisplay(
        text
          .split('')
          .map((ch, i) =>
            ch === ' ' || i < settled
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(''),
      );
    }, FRAME_MS);
  };

  return (
    <span className={className} onMouseEnter={scramble}>
      {display}
    </span>
  );
}
