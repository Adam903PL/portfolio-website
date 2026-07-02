'use client';

import React, { useState } from 'react';

type Skill = { name: string; cat: string; freq: string; mono: string };

const categories = [
  'All',
  'Languages',
  'Frameworks',
  'Libraries',
  'Backend',
  'Databases',
  'Cloud & AI',
  'Tools',
];

const skills: Skill[] = [
  { name: 'JavaScript', cat: 'Languages', freq: 'Many', mono: 'JS' },
  { name: 'TypeScript', cat: 'Languages', freq: 'Many', mono: 'TS' },
  { name: 'Python', cat: 'Languages', freq: 'Many', mono: 'PY' },
  { name: 'HTML', cat: 'Languages', freq: 'Many', mono: '<>' },
  { name: 'PHP', cat: 'Languages', freq: 'Several', mono: 'PH' },
  { name: 'Kotlin', cat: 'Languages', freq: 'Several', mono: 'KT' },
  { name: 'C++', cat: 'Languages', freq: 'Few', mono: 'C+' },
  { name: 'React', cat: 'Frameworks', freq: '7 proj', mono: 'Re' },
  { name: 'Next.js', cat: 'Frameworks', freq: '3 proj', mono: 'Nx' },
  { name: 'Tailwind CSS', cat: 'Frameworks', freq: 'Several', mono: 'Tw' },
  { name: 'React Native', cat: 'Frameworks', freq: '2 proj', mono: 'RN' },
  { name: 'Zustand', cat: 'Libraries', freq: 'Many', mono: 'Zu' },
  { name: 'Redux Toolkit', cat: 'Libraries', freq: 'Several', mono: 'Rx' },
  { name: 'React Hook Form', cat: 'Libraries', freq: 'Several', mono: 'HF' },
  { name: 'Lottie', cat: 'Libraries', freq: 'Many', mono: 'Lo' },
  { name: 'Node.js', cat: 'Backend', freq: 'Many', mono: 'No' },
  { name: 'Express.js', cat: 'Backend', freq: 'Many', mono: 'Ex' },
  { name: 'FastAPI', cat: 'Backend', freq: '4 proj', mono: 'Fa' },
  { name: 'Flask', cat: 'Backend', freq: '4 proj', mono: 'Fl' },
  { name: 'BetterAuth', cat: 'Backend', freq: '3 proj', mono: 'BA' },
  { name: 'Stripe', cat: 'Backend', freq: 'Several', mono: 'St' },
  { name: 'Prisma', cat: 'Databases', freq: 'Several', mono: 'Pr' },
  { name: 'PostgreSQL', cat: 'Databases', freq: 'Many', mono: 'Pg' },
  { name: 'MS SQL', cat: 'Databases', freq: 'Many', mono: 'MS' },
  { name: 'Supabase', cat: 'Databases', freq: 'Several', mono: 'Sb' },
  { name: 'AWS', cat: 'Cloud & AI', freq: 'Several', mono: 'aws' },
  { name: 'Amazon S3', cat: 'Cloud & AI', freq: 'Several', mono: 'S3' },
  { name: 'Amazon EC2', cat: 'Cloud & AI', freq: 'Few', mono: 'EC' },
  { name: 'Google Cloud', cat: 'Cloud & AI', freq: 'Few', mono: 'GC' },
  { name: 'Claude Code', cat: 'Cloud & AI', freq: 'Often', mono: 'Cl' },
  { name: 'Antigravity', cat: 'Cloud & AI', freq: 'Often', mono: 'Ag' },
  { name: 'OpenAI Codex', cat: 'Cloud & AI', freq: 'Often', mono: 'Cx' },
  { name: 'Git', cat: 'Tools', freq: 'Daily', mono: 'Gi' },
  { name: 'VS Code', cat: 'Tools', freq: 'Daily', mono: 'VS' },
  { name: 'Docker', cat: 'Tools', freq: 'Several', mono: 'Dk' },
  { name: 'Railway', cat: 'Tools', freq: 'Many', mono: 'Ra' },
  { name: 'Cloudflare', cat: 'Tools', freq: 'Many', mono: 'Cf' },
  { name: 'n8n', cat: 'Tools', freq: 'Many', mono: 'n8' },
  { name: 'JetBrains', cat: 'Tools', freq: 'Often', mono: 'JB' },
  { name: 'Postman', cat: 'Tools', freq: 'Many', mono: 'Pm' },
  { name: 'Conv. Commits', cat: 'Tools', freq: 'Many', mono: 'CC' },
];

export default function Skills() {
  const [filter, setFilter] = useState('All');

  const visible = skills.filter((s) => filter === 'All' || s.cat === filter);

  return (
    <section
      id="skills"
      className="side-pad relative z-[2] scroll-mt-20 pb-10 pt-20"
    >
      {/* Header */}
      <div className="mb-[34px] flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
            / 02 — Stack
          </div>
          <h2 className="m-0 font-sans text-[44px] font-medium leading-none tracking-[-0.02em]">
            Skills &amp; technologies
          </h2>
        </div>
        <div className="max-w-[300px] text-right font-mono text-[13px] text-ink-40">
          41 technologies across 7 domains — filtered by what I actually ship.
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-[28px] flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = cat === filter;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className="cursor-pointer rounded-[2px] border font-mono text-[12px] uppercase tracking-[0.03em] transition-colors"
              style={{
                padding: '9px 15px',
                background: active ? 'var(--color-ink)' : 'transparent',
                color: active ? 'var(--color-cream)' : 'var(--color-ink)',
                borderColor: active
                  ? 'var(--color-ink)'
                  : 'rgba(26,23,18,0.22)',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills grid */}
      <div
        className="grid border-l border-t"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          borderColor: 'rgba(26,23,18,0.16)',
        }}
      >
        {visible.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-3.5 border-b border-r bg-cream px-5 py-[18px]"
            style={{ borderColor: 'rgba(26,23,18,0.16)' }}
          >
            <div
              className="flex size-10 flex-none items-center justify-center border bg-sand font-mono text-[14px] font-bold text-ink"
              style={{ borderColor: 'rgba(26,23,18,0.2)' }}
            >
              {s.mono}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold">{s.name}</div>
              <div className="mt-0.5 font-mono text-[11px] text-ink-30">
                {s.cat} · {s.freq}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
