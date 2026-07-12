'use client';

import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', num: '00', label: 'Intro' },
  { id: 'about', num: '01', label: 'About' },
  { id: 'skills', num: '02', label: 'Stack' },
  { id: 'writing', num: '03', label: 'Writing' },
  { id: 'contact', num: '04', label: 'Contact' },
];

export function SectionRail() {
  const [active, setActive] = useState('hero');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section becomes active when it crosses the middle 10% band of
      // the viewport, so exactly one section wins at a time.
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <m.nav
      aria-label="Section navigation"
      className="fixed right-[18px] top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 min-[901px]:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: prefersReduced ? 0 : 0.8,
        duration: prefersReduced ? 0 : 0.5,
      }}
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === active;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => jump(section.id)}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? 'true' : undefined}
            className="relative flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 font-mono text-[10px] uppercase tracking-[0.06em]"
            style={{
              color: isActive ? 'var(--color-accent)' : 'var(--color-ink-30)',
            }}
          >
            <span
              className="pointer-events-none absolute right-full mr-2 whitespace-nowrap transition-opacity duration-200"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              {section.label}
            </span>
            <span>{section.num}</span>
            <span
              className="inline-block h-px w-[14px]"
              style={{ background: 'currentColor' }}
            />
          </button>
        );
      })}
    </m.nav>
  );
}
