import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

const LINE = 'rgba(26,23,18,0.16)';
const LINE_STRONG = 'rgba(26,23,18,0.18)';

const stats = [
  {
    value: '5',
    label: 'Learning phases',
    desc: 'A cleaned timeline focused on real progression.',
  },
  {
    value: '2023',
    accentPlus: true,
    label: 'Current track',
    desc: 'TechniSchools full-stack - the active stage.',
  },
  {
    value: 'Full-stack',
    label: 'Main direction',
    desc: 'Frontend, backend, automation & product.',
  },
];

type Entry = {
  year: string;
  phase: string;
  title: string;
  org: string;
  body: string;
  active?: boolean;
};

const timeline: Entry[] = [
  {
    year: 'Early',
    phase: 'Safe timeline',
    title: 'Primary Education Foundations',
    org: 'Lublin, Poland',
    body: 'The foundation stage - early school years without forcing exact dates. Focus on mathematics, problem-solving, curiosity and first contact with computers.',
  },
  {
    year: 'Early',
    phase: 'First code',
    title: 'LEGO Mindstorms & Logic',
    org: 'Self-learning · LEGO Mindstorms EV3',
    body: 'Programming started through robotics. Building small autonomous systems made logic, sequencing and debugging feel practical instead of abstract.',
  },
  {
    year: '2021',
    phase: 'Game logic',
    title: 'Scratch & Interactive Projects',
    org: 'Self-learning',
    body: 'Scratch bridged visual logic to real programming thinking - interactive scenes, small games, animation and event-driven behavior.',
  },
  {
    year: '2022',
    phase: 'Fundamentals',
    title: 'Python Basics & Unreal Engine',
    org: 'Self-learning',
    body: 'The path moved to text-based programming. Python built the fundamentals; Unreal Engine made scripting, mechanics and 3D interaction tangible.',
  },
  {
    year: '2023+',
    phase: 'Active',
    active: true,
    title: 'TechniSchools Full-Stack Development',
    org: 'TechniSchools Lublin',
    body: 'Current education focused on practical full-stack development, IT systems and real application work - where the path connects with shipped projects, automation and modern web tooling.',
  },
];

export default function Education() {
  return (
    <>
      {/* Page hero */}
      <section className="side-pad relative z-[2] pb-10 pt-16">
        <Reveal>
          <div className="mb-[26px] font-mono text-[13px] uppercase tracking-[0.08em] text-accent">
            Education - learning path
          </div>
          <h1 className="display-xl m-0 font-sans font-medium leading-[0.92] tracking-[-0.03em]">
            From LEGO logic to
            <br />
            <span className="font-serif text-[1.05em] italic text-accent">
              full-stack
            </span>{' '}
            product work.
          </h1>
          <p className="mt-7 max-w-[600px] text-[18px] leading-[1.55] text-ink-70">
            A readable timeline: early stages shown as honest self-learning
            phases, confirmed years kept explicit. This is how the path connects
            to the projects I ship today.
          </p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="side-pad relative z-[2] pb-11 pt-3">
        <Stagger
          className="stat-grid grid border-l border-t min-[901px]:grid-cols-3"
          style={{ borderColor: LINE_STRONG }}
        >
          {stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="border-b border-r px-7 py-[26px]"
              style={{ borderColor: LINE_STRONG }}
            >
              <div className="font-serif text-[52px] leading-none">
                {s.value}
                {s.accentPlus && <span className="text-accent">+</span>}
              </div>
              <div className="mt-2 text-[15px] font-semibold">{s.label}</div>
              <div className="mt-1 font-mono text-[12px] text-ink-40">
                {s.desc}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Timeline */}
      <section className="side-pad relative z-[2] pb-10 pt-6">
        <Reveal className="mb-[30px] font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
          / The timeline
        </Reveal>
        <div>
          {timeline.map((e) => (
            <Reveal
              key={e.title}
              className="grid grid-cols-[80px_1fr] items-start gap-7 pb-1.5 min-[901px]:grid-cols-[120px_1fr]"
            >
              <div className="pt-1 text-right">
                <div
                  className="font-mono text-[14px] font-bold"
                  style={{
                    color: e.active
                      ? 'var(--color-accent)'
                      : 'var(--color-ink)',
                  }}
                >
                  {e.year}
                </div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-30">
                  {e.phase}
                </div>
              </div>
              <div
                className="relative border-l pb-10 pl-[34px]"
                style={{ borderColor: 'rgba(26,23,18,0.22)' }}
              >
                <div
                  className="absolute left-[-7px] top-1 size-[13px] rounded-full"
                  style={{
                    background: e.active
                      ? 'var(--color-accent)'
                      : 'var(--color-ink)',
                    border: '2px solid var(--color-cream)',
                    boxShadow: '0 0 0 1px rgba(26,23,18,0.25)',
                  }}
                />
                <div
                  className="border px-[26px] py-[22px]"
                  style={{
                    borderColor: LINE,
                    background: e.active
                      ? 'var(--color-ink)'
                      : 'var(--color-paper)',
                  }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3
                      className="m-0 font-sans text-[21px] font-semibold tracking-[-0.01em]"
                      style={{
                        color: e.active
                          ? 'var(--color-cream)'
                          : 'var(--color-ink)',
                      }}
                    >
                      {e.title}
                    </h3>
                    {e.active && (
                      <span className="border border-accent px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-accent">
                        ● Active
                      </span>
                    )}
                  </div>
                  <div
                    className="mt-2 font-mono text-[12px]"
                    style={{
                      color: e.active
                        ? 'var(--color-cream-50)'
                        : 'var(--color-ink-30)',
                    }}
                  >
                    {e.org}
                  </div>
                  <p
                    className="mt-3.5 text-[14px] leading-[1.6]"
                    style={{
                      color: e.active
                        ? 'var(--color-cream-70)'
                        : 'var(--color-ink-70)',
                    }}
                  >
                    {e.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="side-pad relative z-[2] pb-[60px] pt-5">
        <Reveal
          className="flex flex-wrap items-center justify-between gap-6 border-t pt-10"
          style={{ borderColor: 'rgba(26,23,18,0.2)' }}
        >
          <h2 className="m-0 max-w-[520px] font-sans text-[32px] font-medium tracking-[-0.02em]">
            See where this path leads -{' '}
            <span className="font-serif font-normal italic text-accent">
              the work.
            </span>
          </h2>
          <Link
            href="/projects"
            className="bg-accent px-[26px] py-4 font-mono text-[13px] uppercase tracking-[0.04em] text-[color:var(--color-accent-ink)] no-underline"
          >
            View projects →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
