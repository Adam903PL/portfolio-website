'use client';

import { m } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';
import { VIEWPORT, useMotionSafe } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Override the viewport margin, e.g. '0px' for elements at the very bottom
      of the page that the default -80px inset would never reveal. */
  viewportMargin?: string;
}

export function Reveal({
  children,
  delay = 0,
  className,
  style,
  viewportMargin,
}: RevealProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={
        viewportMargin ? { once: true, margin: viewportMargin } : VIEWPORT
      }
      variants={motionSafe.fadeSlideUp}
      custom={delay}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  );
}
