'use client';

import { motion } from 'framer-motion';
import { fadeSlideUp, staggerContainer, useMotionSafe } from '@/lib/motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  const motionSafe = useMotionSafe();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={motionSafe.staggerContainer}
    >
      {eyebrow && (
        <motion.div
          variants={motionSafe.fadeSlideUp}
          className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.1em] text-accent"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        variants={motionSafe.fadeSlideUp}
        className="m-0 font-sans text-[44px] font-medium leading-none tracking-[-0.02em]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={motionSafe.fadeSlideUp}
          className="mt-7 max-w-[560px] text-[18px] leading-[1.55] text-ink-70"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
