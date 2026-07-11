'use client';

import { m } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';
import { VIEWPORT, useMotionSafe } from '@/lib/motion';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Stagger({ children, className, style }: StaggerProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={motionSafe.staggerContainer}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function StaggerItem({ children, className, style }: StaggerItemProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div
      variants={motionSafe.staggerItem}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  );
}
