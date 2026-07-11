'use client';

import { motion } from 'framer-motion';
import { hoverLift, DURATION, EASE_SHARP } from '@/lib/motion';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function HoverCard({ children, className, style }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{
        y: -4,
        transition: { duration: DURATION.fast, ease: EASE_SHARP },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
