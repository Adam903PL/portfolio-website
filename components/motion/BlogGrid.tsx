'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeSlideUp, useMotionSafe } from '@/lib/motion';

interface BlogGridProps {
  children: ReactNode;
  className?: string;
}

export function BlogGrid({ children, className }: BlogGridProps) {
  const motionSafe = useMotionSafe();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={motionSafe.staggerContainer}
    >
      {children}
    </motion.div>
  );
}

interface BlogItemProps {
  children: ReactNode;
}

export function BlogGridItem({ children }: BlogItemProps) {
  const motionSafe = useMotionSafe();

  return <motion.div variants={motionSafe.fadeSlideUp}>{children}</motion.div>;
}
