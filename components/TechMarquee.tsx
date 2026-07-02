import React from 'react';

const items = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind',
  'Python',
  'n8n',
  'Docker',
  'FastAPI',
  'Prisma',
  'AWS',
  'Kali Linux',
  'Stripe',
  'Supabase',
];

function Strip() {
  return (
    <span className="flex">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-[26px] px-[26px]"
        >
          {item}
          <span className="text-accent">✦</span>
        </span>
      ))}
    </span>
  );
}

export default function TechMarquee() {
  return (
    <div
      className="relative z-[2] mt-6 overflow-hidden border-y bg-ink py-[15px]"
      style={{ borderColor: 'rgba(26,23,18,0.16)' }}
    >
      <div className="flex w-max animate-[marq_32s_linear_infinite] font-mono text-[14px] tracking-[0.02em] text-cream">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
