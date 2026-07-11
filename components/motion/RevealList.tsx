'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { staggerContainer, fadeSlideUp, useMotionSafe } from '@/lib/motion';

interface RevealListProps {
  children: ReactNode;
  className?: string;
}

export function RevealList({ children, className }: RevealListProps) {
  const motionSafe = useMotionSafe();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={motionSafe.staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealListItemProps {
  children: ReactNode;
  className?: string;
}

export function RevealListItem({ children, className }: RevealListItemProps) {
  const motionSafe = useMotionSafe();

  return (
    <motion.div variants={motionSafe.fadeSlideUp} className={className}>
      {children}
    </motion.div>
  );
}
