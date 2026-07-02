import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

import TaxMaster1 from '@/public/img/projectsImg/TaxMaxster/TaxMaster1.png';
import FlashTalkAi1 from '@/public/img/projectsImg/flashtalkai/flashtalkai1.png';
import PackSmart1 from '@/public/img/projectsImg/PackSmart/PackSmart1.png';
import TechniFees1 from '@/public/img/projectsImg/technifees/TechniFees1.png';
import TechniBank1 from '@/public/img/projectsImg/techniBank/techniBank4.png';
import Whereiparkedmycar1 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar1.jpg';
import Quietpomodoro1 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro1.jpg';
import TechniCloud1 from '@/public/img/projectsImg/TechniCloud/TechniCloud1.png';

const LINE = 'rgba(26,23,18,0.16)';
const LINE_STRONG = 'rgba(26,23,18,0.18)';
const TAG_BORDER = 'rgba(26,23,18,0.2)';

const pvcTech = [
  'Next.js',
  'TypeScript',
  'Python',
  'Prisma',
  'Better Auth',
  'Socket.io',
  'S3',
  'FastAPI',
  'mitmproxy',
  'Telegram API',
  'WireGuard/SSH',
];

const pvcRepos = [
  {
    kind: 'Frontend',
    name: 'Web dashboard',
    desc: 'Next.js panel for AI session review, token usage, workspace rules and team visibility.',
    href: 'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Frontend',
  },
  {
    kind: 'CLI',
    name: '@adam903/pvc',
    desc: 'Global CLI for SSH login, project init, session watch, reports and sync.',
    href: 'https://github.com/promptversioncontrol-org/Prompt-Version-Control-CLI',
  },
  {
    kind: 'Proxy',
    name: 'Local AI firewall',
    desc: 'Python/FastAPI proxy that inspects AI traffic and blocks or sanitizes secrets.',
    href: 'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Proxy',
  },
  {
    kind: 'Bot',
    name: 'Live alerts',
    desc: 'Notification bridge sending leak and policy alerts to Telegram users and managers.',
    href: 'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Telegram-Bot',
  },
  {
    kind: 'PVC-RMM',
    name: 'Remote management',
    desc: 'Agent, server and frontend for machine telemetry, files, commands, WireGuard and SSH.',
    href: 'https://github.com/promptversioncontrol-org/PVC-RMM',
  },
];

const civilTech = [
  'Next.js',
  'React',
  'TypeScript',
  'Payload CMS',
  'MongoDB',
  'Zustand',
  'Leaflet',
  'Python',
  'FastAPI',
  'LangGraph',
  'Twilio',
  'ElevenLabs',
];

const civilRepos = [
  { name: 'Frontend', href: 'https://github.com/TS-Unit-8200/frontend' },
  { name: 'Agenty', href: 'https://github.com/TS-Unit-8200/agenty' },
  { name: 'AI Backend', href: 'https://github.com/TS-Unit-8200/ai-backend' },
];

type AppCard = {
  name: string;
  meta: string;
  desc: string;
  tech: string[];
  img: StaticImageData;
  href: string;
  badge?: string;
};

const webApps: AppCard[] = [
  {
    name: 'TaxMaster',
    meta: '24h · 3 devs',
    desc: 'AI-powered app to navigate tax law and finances with personalized insights and recommendations.',
    tech: ['Next.js', 'FastAPI', 'Three.js', 'Ollama'],
    img: TaxMaster1,
    href: 'https://github.com/Adam903PL/TaxMaster-Frontend',
  },
  {
    name: 'FlashTalkAI',
    meta: '1 month · 2 devs',
    desc: 'AI-powered language-learning platform with conversational practice.',
    tech: ['React', 'Tailwind', 'Express', 'PostgreSQL', '+1'],
    img: FlashTalkAi1,
    href: 'https://github.com/Adam903PL/FlashTalkAI',
  },
  {
    name: 'PackSmart',
    meta: '1 week · 2 devs',
    desc: 'Web app for sending and receiving parcels via smart lockers.',
    tech: ['Next.js', 'Django'],
    img: PackSmart1,
    href: 'https://github.com/technischools-lublin/projekt-i-grupa-a-2024-2025-adampukaluk_marcelikarman',
  },
  {
    name: 'TechniFees',
    meta: '1 dev',
    desc: 'My first app — a school-fee manager built with Python and Tkinter.',
    tech: ['Python', 'Tkinter', 'smtplib', 'PostgreSQL'],
    img: TechniFees1,
    href: 'https://github.com/Adam903PL/TechniFees',
  },
  {
    name: 'TechniBank',
    meta: '1 month · 2 devs',
    desc: 'Banking system for personal finance management.',
    tech: ['HTML5', 'CSS', 'JS'],
    img: TechniBank1,
    href: 'https://github.com/Karman1818/TechniBank',
  },
];

const mobileApps: AppCard[] = [
  {
    name: 'Where I Parked My Car',
    meta: '1 month',
    badge: 'On Play Store',
    desc: 'Save your parking spot with one tap and never lose your car again.',
    tech: ['React Native', 'Expo', 'Maps API', 'AsyncStorage'],
    img: Whereiparkedmycar1,
    href: 'https://play.google.com/store/apps/details?id=com.adampukaluk.whereiparkedmycar',
  },
  {
    name: 'Quiet Pomodoro',
    meta: '2 weeks',
    desc: 'A minimalist, distraction-free Pomodoro timer for focus and productivity.',
    tech: ['React Native', 'Expo', 'AsyncStorage', 'Notifications'],
    img: Quietpomodoro1,
    href: 'https://github.com/Adam903PL/QuietPomodoro',
  },
  {
    name: 'TechniCloud',
    meta: '2 days',
    badge: 'Coming soon',
    desc: 'A basic mobile cloud app built in React Native.',
    tech: ['React Native'],
    img: TechniCloud1,
    href: 'https://github.com/Adam903PL/Native-Cloud',
  },
];

function TechTag({ label }: { label: string }) {
  return (
    <span
      className="border px-[9px] py-1 font-mono text-[11px] text-ink-60"
      style={{ borderColor: TAG_BORDER }}
    >
      {label}
    </span>
  );
}

function AppGridCard({ card, imgH }: { card: AppCard; imgH: string }) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col border bg-paper no-underline transition-colors hover:border-accent"
      style={{ borderColor: LINE }}
    >
      <div
        className="relative overflow-hidden border-b"
        style={{ borderColor: LINE }}
      >
        <div className={`relative w-full ${imgH} bg-sand`}>
          <Image
            src={card.img}
            alt={card.name}
            fill
            sizes="(max-width: 900px) 100vw, 380px"
            className="object-cover"
          />
        </div>
        {card.badge && (
          <span
            className="absolute left-3 top-3 font-mono text-[10px] text-cream"
            style={{ background: 'rgba(26,23,18,0.65)', padding: '4px 8px' }}
          >
            {card.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-[22px] pt-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="m-0 font-sans text-[19px] font-semibold">
            {card.name}
          </h3>
          <span className="font-mono text-[11px] text-ink-30">{card.meta}</span>
        </div>
        <p className="mt-2.5 flex-1 text-[13px] leading-[1.5] text-ink-60">
          {card.desc}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {card.tech.map((t) => (
            <span
              key={t}
              className="border px-[7px] py-[3px] font-mono text-[10px] text-ink-50"
              style={{ borderColor: 'rgba(26,23,18,0.18)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <>
      {/* Page hero */}
      <section className="side-pad relative z-[2] pb-11 pt-16">
        <div className="mb-[26px] font-mono text-[13px] uppercase tracking-[0.08em] text-accent">
          Selected work — 2023 → 2026
        </div>
        <h1 className="display-xl m-0 font-sans font-medium leading-[0.92] tracking-[-0.03em]">
          Things I&apos;ve
          <br />
          <span className="font-serif text-[1.05em] italic text-accent">
            shipped
          </span>{' '}
          &amp; broken.
        </h1>
        <p className="mt-7 max-w-[560px] text-[18px] leading-[1.55] text-ink-70">
          Full-stack products, AI tooling and cross-platform mobile apps — built
          with React, Next.js and a stack that keeps growing. Two flagship
          ecosystems, plus everything else.
        </p>
      </section>

      {/* Featured — PVC */}
      <section className="side-pad relative z-[2] py-6">
        <div className="border bg-paper" style={{ borderColor: LINE_STRONG }}>
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b bg-ink px-[26px] py-[18px] text-cream"
            style={{ borderColor: LINE }}
          >
            <div className="font-mono text-[12px] uppercase tracking-[0.06em]">
              <span className="text-accent">★</span>&nbsp; Featured ecosystem —
              5 public repos
            </div>
            <div className="font-mono text-[12px] text-cream-50">PVC</div>
          </div>
          <div className="feat-grid grid min-[901px]:grid-cols-[1.1fr_0.9fr]">
            <div
              className="border-b px-[30px] py-[34px] min-[901px]:border-b-0 min-[901px]:border-r"
              style={{ borderColor: LINE }}
            >
              <h2 className="m-0 font-sans text-[32px] font-semibold tracking-[-0.01em]">
                Prompt Version Control
              </h2>
              <p className="mt-3 text-[16px] font-medium text-ink">
                AI security &amp; audit layer for vibe-coding workflows.
              </p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-70">
                A multi-repo system connecting a web dashboard, CLI, local AI
                firewall, Telegram alerts and remote machine management. It
                helps teams review AI sessions, understand token usage, and stop
                sensitive data before it leaves the developer&apos;s machine.
              </p>
              <div className="mt-[22px] flex flex-wrap gap-2">
                {pvcTech.map((t) => (
                  <TechTag key={t} label={t} />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              {pvcRepos.map((r) => (
                <a
                  key={r.name}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3.5 border-b px-6 py-4 no-underline transition-colors hover:bg-sand"
                  style={{ borderColor: 'rgba(26,23,18,0.14)' }}
                >
                  <span className="w-[78px] flex-none pt-0.5 font-mono text-[11px] uppercase text-accent">
                    {r.kind}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-ink">
                      {r.name}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-[1.4] text-ink-50">
                      {r.desc}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured — Civil42 */}
      <section className="side-pad relative z-[2] py-6">
        <div className="border bg-paper" style={{ borderColor: LINE_STRONG }}>
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b bg-ink px-[26px] py-[18px] text-cream"
            style={{ borderColor: LINE }}
          >
            <div className="font-mono text-[12px] uppercase tracking-[0.06em]">
              <span className="text-accent">★</span>&nbsp; Crisis command system
            </div>
            <div className="font-mono text-[12px] text-cream-50">CIVIL42</div>
          </div>
          <div className="feat-grid grid min-[901px]:grid-cols-[0.9fr_1.1fr]">
            <div
              className="relative min-h-[280px] overflow-hidden border-b bg-sand min-[901px]:border-b-0 min-[901px]:border-r"
              style={{ borderColor: LINE }}
            >
              <Image
                src="/img/projectsImg/civil42/agent-council-poster.jpg"
                alt="Civil42 agent council"
                fill
                sizes="(max-width: 900px) 100vw, 440px"
                className="object-cover"
              />
            </div>
            <div className="px-[30px] py-[34px]">
              <h2 className="m-0 font-sans text-[32px] font-semibold tracking-[-0.01em]">
                Civil42 / Crisis OS
              </h2>
              <p className="mt-3 text-[16px] font-medium">
                Operational AI cockpit for crisis decisions, agents &amp; phone
                intelligence.
              </p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-70">
                Connects an incident-command dashboard, a LangGraph agent
                council and a voice-AI backend. It compares scenarios, collects
                real-world data through phone calls, and turns it into
                operational recommendations.
              </p>
              <div className="mt-[22px] flex flex-wrap gap-2">
                {civilTech.map((t) => (
                  <TechTag key={t} label={t} />
                ))}
              </div>
              <div className="mt-[22px] flex flex-wrap gap-2.5">
                {civilRepos.map((r) => (
                  <a
                    key={r.name}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border px-3.5 py-[9px] font-mono text-[12px] text-ink no-underline transition-colors hover:border-accent"
                    style={{ borderColor: 'rgba(26,23,18,0.28)' }}
                  >
                    {r.name} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web apps */}
      <section className="side-pad relative z-[2] pb-5 pt-14">
        <div className="mb-7 flex items-baseline gap-4">
          <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
            / Web
          </div>
          <h2 className="m-0 font-sans text-[34px] font-medium tracking-[-0.02em]">
            Full-stack applications
          </h2>
        </div>
        <div className="grid-3 grid gap-[22px] min-[901px]:grid-cols-3">
          {webApps.map((card) => (
            <AppGridCard key={card.name} card={card} imgH="h-[170px]" />
          ))}
        </div>
      </section>

      {/* Mobile apps */}
      <section className="side-pad relative z-[2] pb-5 pt-11">
        <div className="mb-7 flex items-baseline gap-4">
          <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
            / Mobile
          </div>
          <h2 className="m-0 font-sans text-[34px] font-medium tracking-[-0.02em]">
            React Native apps
          </h2>
        </div>
        <div className="grid-3 grid gap-[22px] min-[901px]:grid-cols-3">
          {mobileApps.map((card) => (
            <AppGridCard key={card.name} card={card} imgH="h-[200px]" />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="side-pad relative z-[2] py-[60px]">
        <div
          className="flex flex-wrap items-center justify-between gap-6 border-t pt-10"
          style={{ borderColor: 'rgba(26,23,18,0.2)' }}
        >
          <h2 className="m-0 max-w-[520px] font-sans text-[34px] font-medium tracking-[-0.02em]">
            Have something you want built?{' '}
            <span className="font-serif font-normal italic text-accent">
              Let&apos;s talk.
            </span>
          </h2>
          <Link
            href="/contact"
            className="bg-accent px-[26px] py-4 font-mono text-[13px] uppercase tracking-[0.04em] text-[color:var(--color-accent-ink)] no-underline"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  );
}
