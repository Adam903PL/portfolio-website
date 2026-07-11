'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { staggerContainer, fadeSlideUp, useMotionSafe } from '@/lib/motion';

interface HeroRevealProps {
  children: ReactNode;
  className?: string;
}

export function HeroRevealContainer({ children, className }: HeroRevealProps) {
  const motionSafe = useMotionSafe();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionSafe.staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroRevealLine({ children, className }: HeroRevealProps) {
  const motionSafe = useMotionSafe();

  return (
    <motion.div variants={motionSafe.fadeSlideUp} className={className}>
      {children}
    </motion.div>
  );
}
