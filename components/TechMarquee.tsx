import React from 'react';

const items = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
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
          <a
            href={`/?tech=${encodeURIComponent(item.toLowerCase())}#skills`}
            className="text-cream underline decoration-[rgba(237,231,218,0.3)] underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            title={`Show ${item} in the skills grid`}
          >
            {item}
          </a>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </span>
  );
}

export default function TechMarquee() {
  return (
    <div
      className="marquee-wrap relative z-[2] mt-6 overflow-hidden border-y bg-ink py-[15px]"
      style={{ borderColor: 'rgba(26,23,18,0.16)' }}
    >
      <div className="marquee-track flex w-max animate-[marq_32s_linear_infinite] font-mono text-[14px] tracking-[0.02em] text-cream">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
