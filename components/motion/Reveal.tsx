'use client';

import { m } from 'framer-motion';
import { ReactNode } from 'react';
import { VIEWPORT, useMotionSafe } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={motionSafe.fadeSlideUp}
      custom={delay}
      className={className}
    >
      {children}
    </m.div>
  );
}
