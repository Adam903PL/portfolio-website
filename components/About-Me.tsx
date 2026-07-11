import React from 'react';

const stats = [
  { value: '15+', label: 'Projects shipped' },
  { value: '47', label: 'Technologies' },
  { value: '8', label: 'Domains' },
];

const capabilities = [
  {
    key: 'A',
    title: 'Full-Stack Development',
    meta: 'React · Next.js · Node.js',
  },
  { key: 'B', title: 'UI / UX Design', meta: 'Figma · Tailwind · Motion' },
  {
    key: 'C',
    title: 'Automation & Security',
    meta: 'n8n · PowerShell · Kali Linux',
  },
];

export default function About() {
  return (
    <section id="about" className="side-pad relative z-[2] pb-10 pt-24">
      <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
        / 01 - About
      </div>

      <div className="about-grid grid items-start gap-14 min-[901px]:grid-cols-2">
        {/* Left column */}
        <div>
          <h2 className="m-0 font-sans text-[44px] font-medium leading-[1.02] tracking-[-0.02em]">
            Crafting digital
            <br />
            experiences that{' '}
            <span className="font-serif font-normal italic text-accent">
              work
            </span>
            .
          </h2>
          <p className="mt-[26px] max-w-[460px] text-[17px] leading-[1.6] text-ink-70">
            Student at{' '}
            <a
              href="https://technischools.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-accent text-ink no-underline transition-colors hover:text-accent"
            >
              TechniSchools Lublin
            </a>
            . I move fluidly between full-stack product work, automation with
            n8n &amp; PowerShell, and cybersecurity on Kali Linux - always
            shipping real projects, not tutorials.
          </p>
          <div className="mt-[38px] flex gap-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-[46px] leading-none">
                  {stat.value}
                </div>
                <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - capability list */}
        <div
          className="flex flex-col border"
          style={{ borderColor: 'rgba(26,23,18,0.16)' }}
        >
          {capabilities.map((cap) => (
            <div
              key={cap.key}
              className="flex items-baseline gap-3.5 border-b px-6 py-[22px]"
              style={{ borderColor: 'rgba(26,23,18,0.16)' }}
            >
              <span className="font-mono text-[12px] text-ink-20">
                {cap.key}
              </span>
              <div>
                <div className="text-[17px] font-semibold">{cap.title}</div>
                <div className="mt-[3px] font-mono text-[12px] text-ink-40">
                  {cap.meta}
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between bg-ink px-6 py-5 text-cream">
            <div className="font-mono text-[12px] tracking-[0.04em]">
              <span className="text-accent">●</span>&nbsp; Currently building
            </div>
            <div className="text-[15px] font-semibold">ORBactive</div>
          </div>
        </div>
      </div>
    </section>
  );
}
