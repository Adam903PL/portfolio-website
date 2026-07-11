'use client';

import { ReactNode } from 'react';
import { m } from 'framer-motion';
import { VIEWPORT, useMotionSafe } from '@/lib/motion';

interface BlogGridProps {
  children: ReactNode;
  className?: string;
}

export function BlogGrid({ children, className }: BlogGridProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={motionSafe.staggerContainer}
    >
      {children}
    </m.div>
  );
}

interface BlogItemProps {
  children: ReactNode;
}

export function BlogGridItem({ children }: BlogItemProps) {
  const motionSafe = useMotionSafe();

  return <m.div variants={motionSafe.fadeSlideUp}>{children}</m.div>;
}
