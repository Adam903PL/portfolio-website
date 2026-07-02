'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from 'lucide-react';

import TaxMaster1 from '@/public/img/projectsImg/TaxMaxster/TaxMaster1.png';
import TaxMaster2 from '@/public/img/projectsImg/TaxMaxster/TaxMaster2.png';
import TaxMaster3 from '@/public/img/projectsImg/TaxMaxster/TaxMaster3.png';
import TaxMaster4 from '@/public/img/projectsImg/TaxMaxster/TaxMaster4.png';
import TaxMaster5 from '@/public/img/projectsImg/TaxMaxster/TaxMaster5.png';
import TaxMaster6 from '@/public/img/projectsImg/TaxMaxster/TaxMaster6.png';
import TaxMaster7 from '@/public/img/projectsImg/TaxMaxster/TaxMaster7.png';
import FlashTalkAi1 from '@/public/img/projectsImg/flashtalkai/flashtalkai1.png';
import FlashTalkAi2 from '@/public/img/projectsImg/flashtalkai/flashtalkai2.png';
import FlashTalkAi3 from '@/public/img/projectsImg/flashtalkai/flashtalkai3.png';
import FlashTalkAi4 from '@/public/img/projectsImg/flashtalkai/flashtalkai4.png';
import PackSmart1 from '@/public/img/projectsImg/PackSmart/PackSmart1.png';
import PackSmart2 from '@/public/img/projectsImg/PackSmart/PackSmart2.png';
import PackSmart3 from '@/public/img/projectsImg/PackSmart/PackSmart3.png';
import PackSmart4 from '@/public/img/projectsImg/PackSmart/PackSmart4.png';
import PackSmart5 from '@/public/img/projectsImg/PackSmart/PackSmart5.png';
import PackSmart6 from '@/public/img/projectsImg/PackSmart/PackSmart6.png';
import TechniFees1 from '@/public/img/projectsImg/technifees/TechniFees1.png';
import TechniFees2 from '@/public/img/projectsImg/technifees/TechniFees2.png';
import TechniFees3 from '@/public/img/projectsImg/technifees/TechniFees3.png';
import TechniBank1 from '@/public/img/projectsImg/techniBank/technibank1.png';
import TechniBank2 from '@/public/img/projectsImg/techniBank/techniBank2.png';
import TechniBank3 from '@/public/img/projectsImg/techniBank/techniBank3.png';
import TechniBank4 from '@/public/img/projectsImg/techniBank/techniBank4.png';
import Whereiparkedmycar1 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar1.jpg';
import Whereiparkedmycar2 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar2.jpg';
import Whereiparkedmycar3 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar3.jpg';
import Whereiparkedmycar4 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar4.jpg';
import Whereiparkedmycar5 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar5.jpg';
import Quietpomodoro1 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro1.jpg';
import Quietpomodoro2 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro2.jpg';
import Quietpomodoro3 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro3.jpg';
import Quietpomodoro4 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro4.jpg';
import TechniCloud1 from '@/public/img/projectsImg/TechniCloud/TechniCloud1.png';
import TechniCloud2 from '@/public/img/projectsImg/TechniCloud/TechniCloud2.png';
import TechniCloud3 from '@/public/img/projectsImg/TechniCloud/TechniCloud3.png';
import TechniCloud4 from '@/public/img/projectsImg/TechniCloud/TechniCloud4.png';

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

type CivilVideo = {
  src: string;
  poster: string;
  title: string;
  label: string;
  mode: 'desktop' | 'phone';
  duration: string;
};

const civilVideos: CivilVideo[] = [
  {
    src: '/img/projectsImg/civil42/agent-council-demo.mp4',
    poster: '/img/projectsImg/civil42/agent-council-poster.jpg',
    title: 'Agent Council Demo',
    label: 'Desktop command screen',
    mode: 'desktop',
    duration: '0:32',
  },
  {
    src: '/img/projectsImg/civil42/call-with-agent.mp4',
    poster: '/img/projectsImg/civil42/call-with-agent-poster.jpg',
    title: 'Phone AI Workflow',
    label: 'Voice-AI intake call',
    mode: 'phone',
    duration: '1:22',
  },
];

type AppCard = {
  name: string;
  meta: string;
  desc: string;
  tech: string[];
  images: StaticImageData[];
  href: string;
  hrefLabel: string;
  type: 'web' | 'mobile';
  badge?: string;
};

const webApps: AppCard[] = [
  {
    name: 'TaxMaster',
    meta: '24h · 3 devs',
    desc: 'AI-powered app to navigate tax law and finances with personalized insights and recommendations.',
    tech: ['Next.js', 'FastAPI', 'Three.js', 'Ollama'],
    images: [
      TaxMaster1,
      TaxMaster2,
      TaxMaster3,
      TaxMaster4,
      TaxMaster5,
      TaxMaster6,
      TaxMaster7,
    ],
    href: 'https://github.com/Adam903PL/TaxMaster-Frontend',
    hrefLabel: 'GitHub',
    type: 'web',
  },
  {
    name: 'FlashTalkAI',
    meta: '1 month · 2 devs',
    desc: 'AI-powered language-learning platform with conversational practice.',
    tech: ['React', 'Tailwind', 'Express', 'PostgreSQL', '+1'],
    images: [FlashTalkAi1, FlashTalkAi2, FlashTalkAi3, FlashTalkAi4],
    href: 'https://github.com/Adam903PL/FlashTalkAI',
    hrefLabel: 'GitHub',
    type: 'web',
  },
  {
    name: 'PackSmart',
    meta: '1 week · 2 devs',
    desc: 'Web app for sending and receiving parcels via smart lockers.',
    tech: ['Next.js', 'Django'],
    images: [
      PackSmart1,
      PackSmart2,
      PackSmart3,
      PackSmart4,
      PackSmart5,
      PackSmart6,
    ],
    href: 'https://github.com/technischools-lublin/projekt-i-grupa-a-2024-2025-adampukaluk_marcelikarman',
    hrefLabel: 'GitHub',
    type: 'web',
  },
  {
    name: 'TechniFees',
    meta: '1 dev',
    desc: 'My first app — a school-fee manager built with Python and Tkinter.',
    tech: ['Python', 'Tkinter', 'smtplib', 'PostgreSQL'],
    images: [TechniFees1, TechniFees2, TechniFees3],
    href: 'https://github.com/Adam903PL/TechniFees',
    hrefLabel: 'GitHub',
    type: 'web',
  },
  {
    name: 'TechniBank',
    meta: '1 month · 2 devs',
    desc: 'Banking system for personal finance management.',
    tech: ['HTML5', 'CSS', 'JS'],
    images: [TechniBank1, TechniBank2, TechniBank3, TechniBank4],
    href: 'https://github.com/Karman1818/TechniBank',
    hrefLabel: 'GitHub',
    type: 'web',
  },
];

const mobileApps: AppCard[] = [
  {
    name: 'Where I Parked My Car',
    meta: '1 month',
    badge: 'On Play Store',
    desc: 'Save your parking spot with one tap and never lose your car again.',
    tech: ['React Native', 'Expo', 'Maps API', 'AsyncStorage'],
    images: [
      Whereiparkedmycar1,
      Whereiparkedmycar2,
      Whereiparkedmycar3,
      Whereiparkedmycar4,
      Whereiparkedmycar5,
    ],
    href: 'https://play.google.com/store/apps/details?id=com.adampukaluk.whereiparkedmycar',
    hrefLabel: 'Play Store',
    type: 'mobile',
  },
  {
    name: 'Quiet Pomodoro',
    meta: '2 weeks',
    desc: 'A minimalist, distraction-free Pomodoro timer for focus and productivity.',
    tech: ['React Native', 'Expo', 'AsyncStorage', 'Notifications'],
    images: [Quietpomodoro1, Quietpomodoro2, Quietpomodoro3, Quietpomodoro4],
    href: 'https://github.com/Adam903PL/QuietPomodoro',
    hrefLabel: 'GitHub',
    type: 'mobile',
  },
  {
    name: 'TechniCloud',
    meta: '2 days',
    badge: 'Coming soon',
    desc: 'A basic mobile cloud app built in React Native.',
    tech: ['React Native'],
    images: [TechniCloud1, TechniCloud2, TechniCloud3, TechniCloud4],
    href: 'https://github.com/Adam903PL/Native-Cloud',
    hrefLabel: 'GitHub',
    type: 'mobile',
  },
];

type LightboxState = {
  images: StaticImageData[];
  index: number;
  alt: string;
} | null;

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

function CarouselArrow({
  dir,
  onClick,
}: {
  dir: 'left' | 'right';
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? 'Previous image' : 'Next image'}
      className={`absolute top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center bg-ink/70 text-cream transition-colors hover:bg-ink ${
        dir === 'left' ? 'left-2' : 'right-2'
      }`}
    >
      {dir === 'left' ? (
        <ChevronLeft className="size-4" />
      ) : (
        <ChevronRight className="size-4" />
      )}
    </button>
  );
}

function ProjectCard({
  card,
  onOpen,
}: {
  card: AppCard;
  onOpen: (state: NonNullable<LightboxState>) => void;
}) {
  const [index, setIndex] = useState(0);
  const count = card.images.length;
  const imgH = card.type === 'mobile' ? 'h-[380px]' : 'h-[210px]';

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + delta + count) % count);
  };

  return (
    <div
      className="flex flex-col border bg-paper transition-colors hover:border-accent"
      style={{ borderColor: LINE }}
    >
      <div
        className="relative overflow-hidden border-b"
        style={{ borderColor: LINE }}
      >
        <button
          type="button"
          onClick={() => onOpen({ images: card.images, index, alt: card.name })}
          aria-label={`Open ${card.name} screenshots fullscreen`}
          className={`group relative block w-full ${imgH} cursor-zoom-in bg-sand`}
        >
          <Image
            src={card.images[index]}
            alt={`${card.name} — screenshot ${index + 1}`}
            fill
            sizes="(max-width: 900px) 100vw, 380px"
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute right-2 top-2 flex size-7 items-center justify-center bg-ink/70 text-cream opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize2 className="size-3.5" />
          </span>
        </button>

        {count > 1 && (
          <>
            <CarouselArrow dir="left" onClick={go(-1)} />
            <CarouselArrow dir="right" onClick={go(1)} />
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {card.images.map((_, i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full transition-colors"
                  style={{
                    background:
                      i === index
                        ? 'var(--color-accent)'
                        : 'rgba(26,23,18,0.3)',
                  }}
                />
              ))}
            </div>
          </>
        )}

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
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 font-mono text-[12px] text-accent no-underline"
        >
          {card.hrefLabel} ↗
        </a>
      </div>
    </div>
  );
}

function ImageLightbox({
  state,
  onClose,
  onNav,
}: {
  state: NonNullable<LightboxState>;
  onClose: () => void;
  onNav: (delta: number) => void;
}) {
  const multi = state.images.length > 1;
  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col bg-ink/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${state.alt} screenshots`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-cream-50">
          {state.alt} — {state.index + 1} / {state.images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-10 items-center justify-center border border-[rgba(237,231,218,0.25)] text-cream transition-colors hover:bg-[rgba(237,231,218,0.1)]"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {multi && (
          <button
            type="button"
            onClick={() => onNav(-1)}
            aria-label="Previous"
            className="absolute left-2 z-10 flex size-11 items-center justify-center bg-[rgba(237,231,218,0.1)] text-cream transition-colors hover:bg-[rgba(237,231,218,0.2)]"
          >
            <ChevronLeft className="size-6" />
          </button>
        )}
        <Image
          key={state.index}
          src={state.images[state.index]}
          alt={`${state.alt} — screenshot ${state.index + 1}`}
          className="mx-auto h-auto max-h-[82dvh] w-auto max-w-[min(1040px,90vw)] border object-contain"
          style={{ borderColor: 'rgba(237,231,218,0.15)' }}
        />
        {multi && (
          <button
            type="button"
            onClick={() => onNav(1)}
            aria-label="Next"
            className="absolute right-2 z-10 flex size-11 items-center justify-center bg-[rgba(237,231,218,0.1)] text-cream transition-colors hover:bg-[rgba(237,231,218,0.2)]"
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>
    </div>
  );
}

function VideoLightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (delta: number) => void;
}) {
  const video = civilVideos[index];
  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col bg-ink/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Civil42 video demos"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            Civil42 demo — {index + 1} / {civilVideos.length}
          </div>
          <div className="mt-1 font-sans text-[18px] font-semibold text-cream">
            {video.title}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-10 items-center justify-center border border-[rgba(237,231,218,0.25)] text-cream transition-colors hover:bg-[rgba(237,231,218,0.1)]"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <button
          type="button"
          onClick={() => onNav(-1)}
          aria-label="Previous video"
          className="absolute left-2 z-10 flex size-11 items-center justify-center bg-[rgba(237,231,218,0.1)] text-cream transition-colors hover:bg-[rgba(237,231,218,0.2)]"
        >
          <ChevronLeft className="size-6" />
        </button>
        <video
          key={video.src}
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          className={
            video.mode === 'phone'
              ? 'max-h-[calc(100dvh-120px)] w-auto max-w-full bg-black object-contain'
              : 'max-h-[calc(100dvh-120px)] w-full max-w-5xl bg-black object-contain'
          }
        />
        <button
          type="button"
          onClick={() => onNav(1)}
          aria-label="Next video"
          className="absolute right-2 z-10 flex size-11 items-center justify-center bg-[rgba(237,231,218,0.1)] text-cream transition-colors hover:bg-[rgba(237,231,218,0.2)]"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [videoIndex, setVideoIndex] = useState<number | null>(null);

  const open = lightbox !== null || videoIndex !== null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
        setVideoIndex(null);
      }
      if (lightbox) {
        if (e.key === 'ArrowRight')
          setLightbox((s) =>
            s ? { ...s, index: (s.index + 1) % s.images.length } : s,
          );
        if (e.key === 'ArrowLeft')
          setLightbox((s) =>
            s
              ? {
                  ...s,
                  index: (s.index - 1 + s.images.length) % s.images.length,
                }
              : s,
          );
      }
      if (videoIndex !== null) {
        if (e.key === 'ArrowRight')
          setVideoIndex((i) => ((i ?? 0) + 1) % civilVideos.length);
        if (e.key === 'ArrowLeft')
          setVideoIndex(
            (i) => ((i ?? 0) - 1 + civilVideos.length) % civilVideos.length,
          );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lightbox, videoIndex]);

  const navImage = (delta: number) =>
    setLightbox((s) =>
      s
        ? { ...s, index: (s.index + delta + s.images.length) % s.images.length }
        : s,
    );
  const navVideo = (delta: number) =>
    setVideoIndex(
      (i) => ((i ?? 0) + delta + civilVideos.length) % civilVideos.length,
    );

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
            {/* Video demos */}
            <div
              className="flex flex-col gap-3 border-b bg-sand p-4 min-[901px]:border-b-0 min-[901px]:border-r"
              style={{ borderColor: LINE }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-40">
                Video demos — watch &amp; listen
              </div>
              {civilVideos.map((v, i) => (
                <button
                  key={v.src}
                  type="button"
                  onClick={() => setVideoIndex(i)}
                  className="group relative block w-full overflow-hidden border bg-ink text-left"
                  style={{ borderColor: LINE }}
                  aria-label={`Play ${v.title} fullscreen`}
                >
                  <div className="relative h-[150px] w-full">
                    <Image
                      src={v.poster}
                      alt={v.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 400px"
                      className="object-cover opacity-85 transition-opacity group-hover:opacity-100"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex size-12 items-center justify-center rounded-full bg-accent text-[color:var(--color-accent-ink)] transition-transform group-hover:scale-105">
                        <Play className="size-5 fill-current" />
                      </span>
                    </span>
                    <span
                      className="absolute right-2 top-2 font-mono text-[10px] text-cream"
                      style={{
                        background: 'rgba(26,23,18,0.65)',
                        padding: '3px 7px',
                      }}
                    >
                      {v.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="font-mono text-[11px] text-cream">
                      {v.title}
                    </span>
                    <span className="font-mono text-[10px] text-cream-50">
                      {v.label}
                    </span>
                  </div>
                </button>
              ))}
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
            <ProjectCard key={card.name} card={card} onOpen={setLightbox} />
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
            <ProjectCard key={card.name} card={card} onOpen={setLightbox} />
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

      {lightbox && (
        <ImageLightbox
          state={lightbox}
          onClose={() => setLightbox(null)}
          onNav={navImage}
        />
      )}
      {videoIndex !== null && (
        <VideoLightbox
          index={videoIndex}
          onClose={() => setVideoIndex(null)}
          onNav={navVideo}
        />
      )}
    </>
  );
}
