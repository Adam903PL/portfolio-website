'use client';

import { m } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';
import { VIEWPORT, useMotionSafe } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={motionSafe.fadeSlideUp}
      custom={delay}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  );
}
