'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeSlideUp, useMotionSafe } from '@/lib/motion';

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealSection({
  children,
  delay = 0,
  className,
}: RevealSectionProps) {
  const motionSafe = useMotionSafe();
  const variant = motionSafe.fadeSlideUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variant}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
