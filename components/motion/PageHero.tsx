'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeSlideUp, useMotionSafe } from '@/lib/motion';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  className = 'side-pad relative z-[2] pb-11 pt-16',
}: PageHeroProps) {
  const motionSafe = useMotionSafe();

  return (
    <section className={className}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={motionSafe.staggerContainer}
      >
        {eyebrow && (
          <motion.div
            variants={motionSafe.fadeSlideUp}
            className="mb-[26px] font-mono text-[13px] uppercase tracking-[0.08em] text-accent"
          >
            {eyebrow}
          </motion.div>
        )}
        <motion.h1
          variants={motionSafe.fadeSlideUp}
          className="display-xl m-0 font-sans font-medium leading-[0.92] tracking-[-0.03em]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={motionSafe.fadeSlideUp}
            className="mt-7 max-w-[560px] text-[18px] leading-[1.55] text-ink-70"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
