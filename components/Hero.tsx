import React from 'react';
import Link from 'next/link';
import { ArrowRight, Coffee, Github, Linkedin } from 'lucide-react';

const techStack = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Tailwind',
  'PostgreSQL',
];

const focusRing =
  'focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[86vh] items-center justify-center overflow-hidden px-4 pb-10 pt-24 sm:pt-24"
    >
      <div aria-hidden className="absolute inset-0 -z-10 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="mb-7 inline-flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-gray-300 backdrop-blur-xl transition-colors duration-200 hover:bg-white/[0.09]">
          <span className="size-2.5 rounded-full bg-[#10d091]" />
          Open to work
        </div>

        <h1 className="max-w-4xl text-center font-bold leading-[0.95] text-white">
          <span className="block text-5xl sm:text-6xl lg:text-7xl">
            Hi, I&apos;m
          </span>
          <span className="mt-3 block text-6xl sm:text-7xl lg:text-[92px] text-white">
            Adam Pukaluk
          </span>
        </h1>

        <p className="mt-7 text-2xl font-bold text-gray-300 md:text-3xl">
          Full-Stack Developer
        </p>

        <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-gray-500 md:text-lg">
          Building exceptional digital experiences that combine beautiful design
          with powerful functionality.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-1.5 font-mono text-xs font-semibold text-gray-400 backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/projects"
            className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-[14px] bg-white px-8 text-base font-bold text-black shadow-lg shadow-white/10 transition-colors duration-200 hover:bg-gray-200 ${focusRing}`}
          >
            <span>View My Work</span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className={`inline-flex min-h-14 items-center justify-center rounded-[14px] border border-white/15 bg-black/55 px-8 text-base font-bold text-gray-300 backdrop-blur-xl transition-colors duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white ${focusRing}`}
          >
            Get in Touch
          </Link>

          <a
            href="https://buymeacoffee.com/adam903"
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-[14px] bg-[#FFDD00] px-8 text-base font-bold text-black shadow-lg shadow-[#FFDD00]/15 transition-colors duration-200 hover:bg-[#e8c900] ${focusRing}`}
          >
            <Coffee className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span>Buy me a coffee</span>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="font-mono text-xs font-semibold uppercase text-gray-600">
            Follow me
          </span>
          <a
            href="https://github.com/Adam903PL/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`flex size-11 items-center justify-center rounded-[13px] border border-white/10 bg-white/[0.045] text-gray-400 backdrop-blur-md transition-colors duration-200 hover:border-white/25 hover:text-white ${focusRing}`}
          >
            <Github className="size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/adam-pukaluk-339058298/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`flex size-11 items-center justify-center rounded-[13px] border border-white/10 bg-white/[0.045] text-gray-400 backdrop-blur-md transition-colors duration-200 hover:border-white/25 hover:text-white ${focusRing}`}
          >
            <Linkedin className="size-5" />
          </a>
        </div>

        <div
          aria-hidden
          className="mt-9 h-10 w-px bg-gradient-to-b from-white/25 to-transparent"
        />
      </div>
    </section>
  );
}
