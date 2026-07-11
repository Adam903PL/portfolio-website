'use client';

import { m } from 'framer-motion';
import { ReactNode } from 'react';
import { VIEWPORT, useMotionSafe } from '@/lib/motion';

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={motionSafe.staggerContainer}
      className={className}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div variants={motionSafe.staggerItem} className={className}>
      {children}
    </m.div>
  );
}
