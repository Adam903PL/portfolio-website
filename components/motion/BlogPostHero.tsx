'use client';

import Link from 'next/link';
import { LazyMotion, m } from 'framer-motion';
import { domAnimation } from 'framer-motion';
import { staggerContainer, fadeSlideUp, useMotionSafe } from '@/lib/motion';

interface BlogPostHeroProps {
  backHref?: string;
  kicker?: string;
  title: string;
  excerpt: string;
  tags?: string[];
}

export function BlogPostHero({
  backHref = '/blog',
  kicker,
  title,
  excerpt,
  tags = [],
}: BlogPostHeroProps) {
  const motionSafe = useMotionSafe();

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={motionSafe.staggerContainer}
    >
      <m.div variants={motionSafe.fadeSlideUp}>
        <Link
          href={backHref}
          className="mb-10 inline-flex items-center gap-2 border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.04em] text-ink no-underline transition-colors hover:border-accent"
          style={{ borderColor: 'rgba(26,23,18,0.28)' }}
        >
          ← Back to Blog
        </Link>
      </m.div>

      {kicker && (
        <m.div
          variants={motionSafe.fadeSlideUp}
          className="mb-5 font-mono text-[12px] uppercase tracking-[0.08em] text-accent"
        >
          {kicker}
        </m.div>
      )}

      <m.h1
        variants={motionSafe.fadeSlideUp}
        className="m-0 font-sans text-[38px] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-[52px]"
      >
        {title}
      </m.h1>

      <m.p
        variants={motionSafe.fadeSlideUp}
        className="mt-5 max-w-2xl text-[17px] leading-[1.6] text-ink-70"
      >
        {excerpt}
      </m.p>

      {tags.length > 0 && (
        <m.div
          variants={motionSafe.fadeSlideUp}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          {tags.map((tag) => (
            <span key={tag} className="font-mono text-[11px] text-accent">
              #{tag}
            </span>
          ))}
        </m.div>
      )}
    </m.div>
  );
}
