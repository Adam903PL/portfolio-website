'use client';

import { m } from 'framer-motion';
import React from 'react';
import { useMotionSafe } from '@/lib/motion';

export interface TextSegment {
  text: string;
  className?: string;
  breakAfter?: boolean;
}

interface TextRevealProps {
  segments: TextSegment[];
  delay?: number;
  stagger?: number;
  className?: string;
}

export function TextReveal({
  segments,
  delay = 0,
  stagger = 0.07,
  className,
}: TextRevealProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {segments.map((segment, si) => (
        <React.Fragment key={`${segment.text}-${si}`}>
          {segment.text.split(' ').map((word, wi) => (
            <React.Fragment key={`${word}-${wi}`}>
              {wi > 0 && ' '}
              {/* pb/-mb extend the clip box below the tight line-height so
                  descenders (g, y, p) are not cut off */}
              <span className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
                <m.span
                  className={`inline-block ${segment.className ?? ''}`}
                  variants={motionSafe.wordReveal}
                >
                  {word}
                </m.span>
              </span>
            </React.Fragment>
          ))}
          {segment.breakAfter ? <br /> : ' '}
        </React.Fragment>
      ))}
    </m.span>
  );
}
