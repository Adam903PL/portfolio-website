'use client';

import { m, useScroll } from 'framer-motion';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      aria-hidden
      className="fixed left-0 top-0 z-[45] h-[2px] w-full origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
