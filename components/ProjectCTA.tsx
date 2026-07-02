import React from 'react';
import Link from 'next/link';

const ProjectCTA = () => {
  return (
    <section id="contact" className="side-pad relative z-[2] py-[70px]">
      <div className="relative overflow-hidden bg-ink px-8 py-16 text-cream min-[901px]:px-14 min-[901px]:py-[72px]">
        {/* vertical rule overlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(237,231,218,0.05) 1px, transparent 1px)',
            backgroundSize: '14% 100%',
          }}
        />
        <div className="relative flex flex-wrap items-end justify-between gap-9">
          <div>
            <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
              / Let&apos;s talk
            </div>
            <h2 className="m-0 max-w-[640px] font-sans text-[40px] font-medium leading-[0.98] tracking-[-0.02em] min-[901px]:text-[52px]">
              Ready to explore
              <br />
              my work — or{' '}
              <span className="font-serif font-normal italic text-accent">
                build
              </span>{' '}
              something?
            </h2>
            <div className="mt-[34px] flex flex-wrap gap-[26px] font-mono text-[13px] text-cream-50">
              <a
                href="mailto:pukaluk.adam505@gmail.com"
                className="border-b pb-0.5 text-cream no-underline"
                style={{ borderColor: 'rgba(237,231,218,0.3)' }}
              >
                pukaluk.adam505@gmail.com
              </a>
              <a
                href="tel:+48695031104"
                className="border-b pb-0.5 text-cream no-underline"
                style={{ borderColor: 'rgba(237,231,218,0.3)' }}
              >
                +48 695 031 104
              </a>
            </div>
          </div>

          <div className="flex min-w-[220px] flex-col gap-3">
            <Link
              href="/projects"
              className="bg-accent px-6 py-4 text-center font-mono text-[13px] uppercase tracking-[0.04em] text-[color:var(--color-accent-ink)] no-underline"
            >
              View projects →
            </Link>
            <div className="flex gap-3">
              <a
                href="https://github.com/Adam903PL/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border px-2.5 py-3.5 text-center font-mono text-[12px] text-cream no-underline"
                style={{ borderColor: 'rgba(237,231,218,0.25)' }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/adam-pukaluk-339058298/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border px-2.5 py-3.5 text-center font-mono text-[12px] text-cream no-underline"
                style={{ borderColor: 'rgba(237,231,218,0.25)' }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCTA;
