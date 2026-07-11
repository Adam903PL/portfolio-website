'use client';

import { useState } from 'react';
import { LazyMotion, m } from 'framer-motion';
import { domAnimation } from 'framer-motion';
import { DURATION, EASE_SHARP } from '@/lib/motion';

const EMAIL = 'pukaluk.adam505@gmail.com';
const LINE = 'rgba(26,23,18,0.16)';
const socials = [
  { label: 'GitHub ↗', href: 'https://github.com/Adam903PL/' },
  {
    label: 'LinkedIn ↗',
    href: 'https://www.linkedin.com/in/adam-pukaluk-339058298/',
  },
  { label: 'Twitter ↗', href: 'https://x.com/adam_p903' },
  { label: '☕ Coffee ↗', href: 'https://buymeacoffee.com/adam903' },
];

export function ContactInfo() {
  const [copyLabel, setCopyLabel] = useState('Copy');

  const copyEmail = () => {
    const done = () => {
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy'), 1600);
    };
    try {
      navigator.clipboard.writeText(EMAIL).then(done, done);
    } catch {
      done();
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="flex flex-col border-b px-9 py-10 min-[901px]:border-b-0 min-[901px]:border-r"
        style={{ borderColor: LINE }}
      >
        <p className="m-0 max-w-[400px] text-[17px] leading-[1.6] text-ink-70">
          Open to full-stack roles, freelance builds and interesting
          collaborations. Fastest way to reach me is email - I usually reply
          within a day.
        </p>

        <div className="mt-[34px] flex flex-col">
          {/* email */}
          <div
            className="flex items-center justify-between gap-3.5 border-t py-[18px]"
            style={{ borderColor: LINE }}
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
                Email
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-[5px] block text-[16px] font-semibold text-ink no-underline"
              >
                {EMAIL}
              </a>
            </div>
            <m.button
              type="button"
              onClick={copyEmail}
              className="cursor-pointer border bg-transparent px-[13px] py-[9px] font-mono text-[11px] uppercase tracking-[0.04em] text-ink"
              style={{ borderColor: 'rgba(26,23,18,0.28)' }}
              whileHover={{
                scale: 1.05,
                transition: { duration: DURATION.fast, ease: EASE_SHARP },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {copyLabel}
            </m.button>
          </div>

          {/* phone */}
          <div
            className="flex items-center justify-between gap-3.5 border-t py-[18px]"
            style={{ borderColor: LINE }}
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
                Phone
              </div>
              <a
                href="tel:+48695031104"
                className="mt-[5px] block text-[16px] font-semibold text-ink no-underline"
              >
                +48 695 031 104
              </a>
            </div>
            <span className="font-mono text-[11px] text-ink-30">PL</span>
          </div>

          {/* location */}
          <div
            className="flex items-center justify-between gap-3.5 border-y py-[18px]"
            style={{ borderColor: LINE }}
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
                Based in
              </div>
              <div className="mt-[5px] text-[16px] font-semibold">
                Lublin, Poland
              </div>
            </div>
            <span className="font-mono text-[11px] text-live-ink">
              ● Available
            </span>
          </div>
        </div>

        <div className="mt-auto pt-[34px]">
          <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
            Elsewhere
          </div>
          <div className="flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <m.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border px-[15px] py-2.5 font-mono text-[12px] text-ink no-underline transition-colors hover:border-accent"
                style={{ borderColor: 'rgba(26,23,18,0.28)' }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: DURATION.fast, ease: EASE_SHARP },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {s.label}
              </m.a>
            ))}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
