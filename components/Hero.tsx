import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroPortrait from '@/public/img/gy19rvVD.jpg';
import { Reveal } from '@/components/motion/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { CountUp } from '@/components/motion/CountUp';

const eyebrow = ['Full-Stack Developer', 'Lublin, Poland', 'Est. 2009'];

const stats = [
  { value: 17, suffix: '', label: 'Years old', border: true },
  { value: 3, suffix: '+', label: 'Yrs building', border: false },
];

const headline = [
  { text: 'I build', breakAfter: true },
  {
    text: 'exceptional',
    className: 'font-serif text-[1.06em] italic text-accent',
  },
  { text: 'digital', breakAfter: true },
  { text: 'experiences.' },
];

export default function Hero() {
  return (
    <section id="hero" className="side-pad relative z-[2] pb-10 pt-16">
      {/* Eyebrow */}
      <Reveal className="mb-[30px] flex flex-wrap gap-[18px] font-mono text-[13px] uppercase tracking-[0.08em] text-ink-40">
        {eyebrow.map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && <span className="text-ink-10">/</span>}
            <span>{item}</span>
          </React.Fragment>
        ))}
      </Reveal>

      <div className="hero-grid grid items-end gap-12 min-[901px]:grid-cols-[1.2fr_1fr]">
        {/* Headline + copy */}
        <div>
          <h1 className="display-xl m-0 font-sans font-medium leading-[0.92] tracking-[-0.03em] text-ink">
            <TextReveal segments={headline} delay={0.1} />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-[30px] max-w-[520px] text-[18px] leading-[1.55] text-ink-70">
              17-year-old developer from Poland. Three years shipping across the
              full stack - React &amp; Next.js on the front, Node &amp; Postgres
              behind it, automation and security woven through.
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-[34px] flex flex-wrap gap-[14px]">
            <Link
              href="/projects"
              className="rounded-[2px] bg-accent px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.04em] text-[color:var(--color-accent-ink)] no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              View my work →
            </Link>
            <Link
              href="/contact"
              className="rounded-[2px] border px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.04em] text-ink no-underline transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent"
              style={{ borderColor: 'rgba(26,23,18,0.3)' }}
            >
              Get in touch
            </Link>
            <a
              href="https://buymeacoffee.com/adam903"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[6px] py-[15px] font-mono text-[13px] tracking-[0.04em] text-ink-40 no-underline transition-colors hover:text-ink"
            >
              ☕ Buy me a coffee
            </a>
          </Reveal>
        </div>

        {/* Portrait card */}
        <div className="relative mx-auto w-full max-w-[420px]">
          <div
            className="relative overflow-hidden border bg-sand"
            style={{ borderColor: 'rgba(26,23,18,0.16)' }}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={HeroPortrait}
                alt="Adam Pukaluk"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 420px"
                className="object-cover object-[center_35%]"
              />
            </div>
            <div
              className="absolute left-3 top-3 font-mono text-[11px] tracking-[0.06em] text-cream"
              style={{
                background: 'rgba(26,23,18,0.55)',
                backdropFilter: 'blur(4px)',
                padding: '5px 9px',
              }}
            >
              AVAILABLE
            </div>
          </div>
          <div
            className="grid grid-cols-2 border border-t-0"
            style={{ borderColor: 'rgba(26,23,18,0.16)' }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`px-4 py-3.5 ${stat.border ? 'border-r' : ''}`}
                style={
                  stat.border
                    ? { borderColor: 'rgba(26,23,18,0.16)' }
                    : undefined
                }
              >
                <div className="font-serif text-[32px] leading-none text-ink">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
