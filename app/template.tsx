'use client';

import { m, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { DURATION, EASE_EDITORIAL } from '@/lib/motion';

export default function Template({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0 : DURATION.medium,
        ease: EASE_EDITORIAL,
      }}
    >
      {children}
    </m.div>
  );
}
