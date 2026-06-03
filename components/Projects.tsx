'use client';
import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  LayoutDashboard,
  Maximize2,
  MonitorCog,
  Network,
  Play,
  ShieldCheck,
  Smartphone,
  Terminal,
  Users,
  Clock,
  X,
} from 'lucide-react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

// Import all project images
import FlashTalkAi1 from '@/public/img/projectsImg/flashtalkai/flashtalkai1.png';
import FlashTalkAi2 from '@/public/img/projectsImg/flashtalkai/flashtalkai2.png';
import FlashTalkAI4 from '@/public/img/projectsImg/flashtalkai/flashtalkai4.png';
import TechniFees1 from '@/public/img/projectsImg/technifees/TechniFees1.png';
import TechniFees2 from '@/public/img/projectsImg/technifees/TechniFees2.png';
import TechniFees3 from '@/public/img/projectsImg/technifees/TechniFees3.png';
import TechniCloud1 from '@/public/img/projectsImg/TechniCloud/TechniCloud1.png';
import TechniCloud2 from '@/public/img/projectsImg/TechniCloud/TechniCloud2.png';
import TechniCloud3 from '@/public/img/projectsImg/TechniCloud/TechniCloud3.png';
import TechniCloud4 from '@/public/img/projectsImg/TechniCloud/TechniCloud4.png';
import TechniBank1 from '@/public/img/projectsImg/techniBank/techniBank4.png';
import TechniBank2 from '@/public/img/projectsImg/techniBank/techniBank2.png';
import TechniBank3 from '@/public/img/projectsImg/techniBank/techniBank3.png';
import TechniBank4 from '@/public/img/projectsImg/techniBank/techniBank4.png';
import TaxMaster1 from '@/public/img/projectsImg/TaxMaxster/TaxMaster1.png';
import TaxMaster2 from '@/public/img/projectsImg/TaxMaxster/TaxMaster2.png';
import TaxMaster3 from '@/public/img/projectsImg/TaxMaxster/TaxMaster3.png';
import TaxMaster4 from '@/public/img/projectsImg/TaxMaxster/TaxMaster4.png';
import TaxMaster5 from '@/public/img/projectsImg/TaxMaxster/TaxMaster5.png';
import TaxMaster6 from '@/public/img/projectsImg/TaxMaxster/TaxMaster6.png';
import TaxMaster7 from '@/public/img/projectsImg/TaxMaxster/TaxMaster7.png';
import PackSmart1 from '@/public/img/projectsImg/PackSmart/PackSmart1.png';
import PackSmart2 from '@/public/img/projectsImg/PackSmart/PackSmart2.png';
import PackSmart3 from '@/public/img/projectsImg/PackSmart/PackSmart3.png';
import PackSmart4 from '@/public/img/projectsImg/PackSmart/PackSmart4.png';
import PackSmart5 from '@/public/img/projectsImg/PackSmart/PackSmart5.png';
import PackSmart6 from '@/public/img/projectsImg/PackSmart/PackSmart6.png';
import Whereiparkedmycar1 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar1.jpg';
import Whereiparkedmycar2 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar2.jpg';
import Whereiparkedmycar3 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar3.jpg';
import Whereiparkedmycar4 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar4.jpg';
import Whereiparkedmycar5 from '@/public/img/projectsImg/whereiparkedmycar/whereiparkedmycar5.jpg';
import Quietpomodoro1 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro1.jpg';
import Quietpomodoro2 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro2.jpg';
import Quietpomodoro3 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro3.jpg';
import Quietpomodoro4 from '@/public/img/projectsImg/quietpomodoro/quietpomodoro4.jpg';

type ProjectType = 'mobile' | 'web' | 'desktop';

interface Repository {
  name: string;
  link: string;
}

interface Contributor {
  name: string;
  link: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  usedTechnology: string[];
  pictures: StaticImageData[];
  repositories: Repository[];
  liveLink: string;
  type: ProjectType;
  contributors: Contributor[];
  developmentTime?: string;
  playStoreLink?: string;
  comingSoonPlayStore?: boolean;
}

interface PvcModule {
  name: string;
  label: string;
  description: string;
  repo: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FeaturedModule {
  name: string;
  label: string;
  description: string;
  repo: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Civil42Video {
  title: string;
  label: string;
  description: string;
  src: string;
  poster: string;
  mode: 'desktop' | 'phone';
  duration: string;
}

const pvcModules: PvcModule[] = [
  {
    name: 'Frontend',
    label: 'Web dashboard',
    description:
      'Next.js panel for AI session review, token usage, workspace rules, and team visibility.',
    repo: 'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Frontend',
    icon: LayoutDashboard,
  },
  {
    name: 'CLI',
    label: '@adam903/pvc',
    description:
      'Global command line tool for SSH login, project init, session watch, reports, and sync.',
    repo: 'https://github.com/promptversioncontrol-org/Prompt-Version-Control-CLI',
    icon: Terminal,
  },
  {
    name: 'Proxy',
    label: 'Local AI firewall',
    description:
      'Python/FastAPI proxy that inspects AI traffic and blocks or sanitizes secrets before requests leave the machine.',
    repo: 'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Proxy',
    icon: ShieldCheck,
  },
  {
    name: 'Telegram Bot',
    label: 'Live alerts',
    description:
      'Notification bridge that sends leak and policy alerts to Telegram users and managers.',
    repo: 'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Telegram-Bot',
    icon: Bell,
  },
  {
    name: 'PVC-RMM',
    label: 'Remote management',
    description:
      'Agent, server, and frontend layer for machine telemetry, files, commands, WireGuard, and SSH workflows.',
    repo: 'https://github.com/promptversioncontrol-org/PVC-RMM',
    icon: MonitorCog,
  },
];

const pvcStack = [
  'Next.js',
  'TypeScript',
  'Python',
  'Prisma',
  'Better Auth',
  'Socket.io',
  'S3',
  'FastAPI',
  'mitmproxy',
  'Telegram Bot API',
  'WireGuard/SSH',
];

const civil42Modules: FeaturedModule[] = [
  {
    name: 'Frontend',
    label: 'Command cockpit',
    description:
      'Next.js and Payload CMS interface for incidents, organizations, resources, maps, and scenario control.',
    repo: 'https://github.com/TS-Unit-8200/frontend',
    icon: LayoutDashboard,
  },
  {
    name: 'Agenty',
    label: 'Agent council',
    description:
      'FastAPI and LangGraph runtime that coordinates role agents, recommendations, reports, and incident workflows.',
    repo: 'https://github.com/TS-Unit-8200/agenty',
    icon: Network,
  },
  {
    name: 'AI Backend',
    label: 'Phone intelligence',
    description:
      'Twilio and voice AI backend that calls real-world contacts, records answers, and returns status to orchestration.',
    repo: 'https://github.com/TS-Unit-8200/ai-backend',
    icon: Bell,
  },
];

const civil42Stack = [
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

const civil42Videos: Civil42Video[] = [
  {
    title: 'Agent Council Demo',
    label: 'Rada Agentow',
    description:
      'Desktop command screen with incident context, agent council output, and operational variants.',
    src: '/img/projectsImg/civil42/agent-council-demo.mp4',
    poster: '/img/projectsImg/civil42/agent-council-poster.jpg',
    mode: 'desktop',
    duration: '0:32',
  },
  {
    title: 'Phone AI Workflow',
    label: 'Telefoniczny intake',
    description:
      'Vertical phone recording showing the AI-assisted call flow used for real-world data collection.',
    src: '/img/projectsImg/civil42/call-with-agent.mp4',
    poster: '/img/projectsImg/civil42/call-with-agent-poster.jpg',
    mode: 'phone',
    duration: '1:22',
  },
];

const projects: Project[] = [
  {
    id: 1,
    name: 'Where I Parked My Car',
    description:
      'A smart mobile app that helps you remember where you parked your car. Save your parking location with just one tap and never lose your car again!',
    usedTechnology: ['React Native', 'Expo', 'Google Maps API', 'AsyncStorage'],
    pictures: [
      Whereiparkedmycar1,
      Whereiparkedmycar2,
      Whereiparkedmycar3,
      Whereiparkedmycar4,
      Whereiparkedmycar5,
    ],
    repositories: [
      {
        name: 'Main Repo',
        link: 'https://github.com/Adam903PL/WhereIParkedMyCar',
      },
    ],
    liveLink: '',
    playStoreLink:
      'https://play.google.com/store/apps/details?id=com.adampukaluk.whereiparkedmycar&pcampaignid=web_share',
    type: 'mobile',
    contributors: [{ name: 'Adam903PL', link: 'https://github.com/Adam903PL' }],
    developmentTime: '1 month',
  },
  {
    id: 2,
    name: 'Quiet Pomodoro',
    description:
      'A minimalist Pomodoro timer app designed to help you focus and boost productivity. Simple, elegant, and distraction-free time management.',
    usedTechnology: [
      'React Native',
      'Expo',
      'AsyncStorage',
      'React Native Notifications',
    ],
    pictures: [Quietpomodoro1, Quietpomodoro2, Quietpomodoro3, Quietpomodoro4],
    repositories: [
      { name: 'Main Repo', link: 'https://github.com/Adam903PL/QuietPomodoro' },
    ],
    liveLink: '',
    comingSoonPlayStore: true,
    type: 'mobile',
    contributors: [{ name: 'Adam903PL', link: 'https://github.com/Adam903PL' }],
    developmentTime: '2 weeks',
  },
  {
    id: 3,
    name: 'TaxMaster',
    description:
      'An AI-powered app to assist users in navigating tax laws and financial aspects, providing personalized insights and recommendations.',
    usedTechnology: ['NextJS', 'FastAPI', 'TreeJS', 'Ollama'],
    pictures: [
      TaxMaster1,
      TaxMaster2,
      TaxMaster3,
      TaxMaster4,
      TaxMaster5,
      TaxMaster6,
      TaxMaster7,
    ],
    repositories: [
      {
        name: 'Frontend',
        link: 'https://github.com/Adam903PL/TaxMaster-Frontend',
      },
      {
        name: 'AI Backend',
        link: 'https://github.com/Adam903PL/TaxMaster-Backend',
      },
    ],
    liveLink: '',
    type: 'web',
    contributors: [
      { name: 'Adam903PL', link: 'https://github.com/Adam903PL' },
      { name: 'Karman1818', link: 'https://github.com/Karman1818' },
      { name: 'Nejzk', link: 'https://github.com/nejzk' },
    ],
    developmentTime: '24h',
  },
  {
    id: 5,
    name: 'FlashTalkAI',
    description: 'AI-powered language learning platform',
    usedTechnology: [
      'React',
      'TailwindCSS',
      'Express.JS',
      'PostgreSQL',
      'ChatGPT API',
    ],
    pictures: [FlashTalkAi1, FlashTalkAi2, FlashTalkAI4],
    repositories: [
      { name: 'Main Repo', link: 'https://github.com/Adam903PL/FlashTalkAI' },
    ],
    liveLink: '',
    type: 'web',
    contributors: [
      { name: 'Adam903PL', link: 'https://github.com/Adam903PL' },
      { name: 'Karman1818', link: 'https://github.com/Karman1818' },
    ],
    developmentTime: '1 month',
  },
  {
    id: 6,
    name: 'PackSmart',
    description:
      'A web app for sending and receiving parcels via smart lockers.',
    usedTechnology: ['NextJS', 'Django'],
    pictures: [
      PackSmart1,
      PackSmart2,
      PackSmart3,
      PackSmart4,
      PackSmart5,
      PackSmart6,
    ],
    repositories: [
      {
        name: 'Main Repo',
        link: 'https://github.com/technischools-lublin/projekt-i-grupa-a-2024-2025-adampukaluk_marcelikarman',
      },
    ],
    liveLink: '',
    type: 'web',
    contributors: [
      { name: 'Adam903PL', link: 'https://github.com/Adam903PL' },
      { name: 'Karman1818', link: 'https://github.com/Karman1818' },
    ],
    developmentTime: '1 week',
  },
  {
    id: 7,
    name: 'TechniFees',
    description:
      'TechniFees is my first simple app for managing school fees, built with Python, Tkinter',
    usedTechnology: ['Python', 'Tkinter', 'smtplib', 'PostgreSQL'],
    pictures: [TechniFees1, TechniFees2, TechniFees3],
    repositories: [
      { name: 'Source Code', link: 'https://github.com/Adam903PL/TechniFees' },
    ],
    liveLink: '',
    type: 'web',
    contributors: [{ name: 'Adam903PL', link: 'https://github.com/Adam903PL' }],
  },
  {
    id: 8,
    name: 'TechniCloud',
    description: 'Basic Mobile APP in React Native',
    usedTechnology: ['React Native'],
    pictures: [TechniCloud1, TechniCloud2, TechniCloud3, TechniCloud4],
    repositories: [
      { name: 'Main Repo', link: 'https://github.com/Adam903PL/Native-Cloud' },
    ],
    liveLink: '',
    type: 'mobile',
    contributors: [{ name: 'Adam903PL', link: 'https://github.com/Adam903PL' }],
    developmentTime: '2 days',
  },
  {
    id: 9,
    name: 'TechniBank',
    description: 'Banking system for personal finance management',
    usedTechnology: ['HTML5', 'CSS', 'JS'],
    pictures: [TechniBank1, TechniBank2, TechniBank3, TechniBank4],
    repositories: [
      { name: 'Frontend', link: 'https://github.com/Karman1818/TechniBank' },
    ],
    liveLink: '',
    type: 'web',
    contributors: [
      { name: 'Adam903PL', link: 'https://github.com/Adam903PL' },
      { name: 'Karman1818', link: 'https://github.com/Karman1818' },
    ],
    developmentTime: '1 month',
  },
];

const PvcEcosystemVisual = () => {
  const flowNodes = [
    { label: 'AI Agent', detail: 'Codex / ChatGPT' },
    { label: 'PVC Proxy', detail: 'policy + censor' },
    { label: 'Dashboard', detail: 'audit + usage' },
  ];

  return (
    <div
      className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_80%_72%,rgba(255,255,255,0.1),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative flex h-full min-h-[320px] flex-col justify-between">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            <Network className="size-4" />
            PVC Flow
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/70">
            5 public repos
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          {flowNodes.map((node, index) => (
            <React.Fragment key={node.label}>
              <div
                className={`rounded-xl border p-4 shadow-2xl backdrop-blur ${
                  index === 1
                    ? 'border-white/30 bg-white text-black'
                    : 'border-white/10 bg-white/[0.06] text-white'
                }`}
              >
                <div className="text-sm font-bold">{node.label}</div>
                <div
                  className={`mt-1 text-xs ${
                    index === 1 ? 'text-black/60' : 'text-white/50'
                  }`}
                >
                  {node.detail}
                </div>
              </div>
              {index < flowNodes.length - 1 && (
                <div className="hidden justify-center text-white/30 sm:flex">
                  <ArrowRight className="size-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            ['Rules', 'files / folders / secrets'],
            ['Alerts', 'Telegram + managers'],
            ['Reports', 'sessions + tokens'],
            ['RMM', 'machines + commands'],
          ].map(([label, detail]) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                {label}
              </div>
              <div className="mt-1 text-sm font-medium text-white/80">
                {detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeaturedPVCProject = () => {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_75%_100%,rgba(255,255,255,0.09),transparent_34%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Featured ecosystem
            </span>
            <span className="rounded-full border border-white/10 bg-white text-black px-3 py-1.5 text-xs font-bold">
              Prompt Version Control
            </span>
          </div>

          <div className="mt-6 max-w-3xl">
            <h4 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              PVC: AI security and audit layer for vibe coding workflows.
            </h4>
            <p className="mt-4 text-base leading-7 text-white/60 md:text-lg">
              A multi-repo system that connects a web dashboard, CLI, local AI
              firewall, Telegram alerts, and remote machine management. It helps
              teams review AI sessions, understand token usage, and stop
              sensitive data before it leaves the developer machine.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {pvcStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-xs font-medium text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {pvcModules.map((module) => {
              const Icon = module.icon;

              return (
                <a
                  key={module.name}
                  href={module.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/module rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-bold text-white">
                          {module.name}
                        </h5>
                        <Github className="size-3.5 text-white/40 transition-colors duration-200 group-hover/module:text-white/70" />
                      </div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                        {module.label}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <PvcEcosystemVisual />
      </div>
    </article>
  );
};

const FeaturedCivil42Project = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const activeVideo = civil42Videos[activeDemo];

  useEffect(() => {
    if (!isDemoOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDemoOpen(false);
      }

      if (event.key === 'ArrowRight') {
        setActiveDemo((current) => (current + 1) % civil42Videos.length);
      }

      if (event.key === 'ArrowLeft') {
        setActiveDemo(
          (current) =>
            (current - 1 + civil42Videos.length) % civil42Videos.length,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDemoOpen]);

  const openDemo = (index: number) => {
    setActiveDemo(index);
    setIsDemoOpen(true);
  };

  const goToDemo = (direction: 1 | -1) => {
    setActiveDemo(
      (current) =>
        (current + direction + civil42Videos.length) % civil42Videos.length,
    );
  };

  return (
    <>
      <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/75 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(255,255,255,0.1),transparent_34%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:38px_38px]" />

        <div className="relative grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-stretch">
          <div className="flex flex-col justify-between gap-7">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Crisis command system
                </span>
                <span className="rounded-full border border-white/10 bg-white text-black px-3 py-1.5 text-xs font-bold">
                  Civil42 / Crisis OS
                </span>
              </div>

              <div className="mt-6 max-w-3xl">
                <h4 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                  Operational AI cockpit for crisis decisions, agents, and phone
                  intelligence.
                </h4>
                <p className="mt-4 text-base leading-7 text-white/60 md:text-lg">
                  Civil42 connects an incident command dashboard, a LangGraph
                  agent council, and a voice AI backend. The system compares
                  scenarios, collects real-world data through phone calls, and
                  turns it into operational recommendations.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {civil42Stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-xs font-medium text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {civil42Modules.map((module) => {
                const Icon = module.icon;

                return (
                  <a
                    key={module.name}
                    href={module.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/module rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white">
                        <Icon className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">
                            {module.name}
                          </h5>
                          <Github className="size-3.5 text-white/40 transition-colors duration-200 group-hover/module:text-white/70" />
                        </div>
                        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                          {module.label}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/60">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 xl:min-h-[620px] xl:grid-rows-[1fr_auto]">
            <button
              type="button"
              onClick={() => openDemo(0)}
              className="group/demo relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:min-h-[460px]"
              aria-label="Open Civil42 demo videos"
            >
              <Image
                src={civil42Videos[0].poster}
                alt=""
                fill
                className="object-cover opacity-80 transition-transform duration-500 group-hover/demo:scale-[1.02]"
                sizes="(min-width: 1280px) 640px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
              <div className="relative flex h-full min-h-[336px] flex-col justify-between md:min-h-[436px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/65 backdrop-blur">
                    Video demos
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white px-3 py-2 text-xs font-bold text-black">
                    <Maximize2 className="size-3.5" />
                    Watch fullscreen
                  </span>
                </div>

                <div>
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white text-black shadow-2xl shadow-white/20 transition-transform duration-200 group-hover/demo:scale-105">
                    <Play className="size-6 fill-current" />
                  </div>
                  <h5 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                    Watch how Crisis OS works.
                  </h5>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 md:text-base">
                    Open the demo viewer, play the desktop command recording,
                    then switch to the phone-call workflow without squeezing
                    both formats into one panel.
                  </p>
                </div>
              </div>
            </button>

            <div className="grid gap-3 sm:grid-cols-2">
              {civil42Videos.map((video, index) => (
                <button
                  key={video.src}
                  type="button"
                  onClick={() => openDemo(index)}
                  className="group/thumb rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <div
                    className={`relative overflow-hidden rounded-xl border border-white/10 bg-black ${
                      video.mode === 'phone'
                        ? 'mx-auto aspect-[590/1280] max-h-40 w-full max-w-[74px]'
                        : 'aspect-[1280/666] w-full'
                    }`}
                  >
                    <Image
                      src={video.poster}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover/thumb:scale-[1.03]"
                      sizes="240px"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex size-9 items-center justify-center rounded-full bg-white text-black">
                        <Play className="size-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                        {video.label}
                      </div>
                      <div className="mt-1 text-sm font-bold text-white">
                        {video.title}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-white/45">
                      {video.duration}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>

      {isDemoOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/[0.92] p-3 backdrop-blur-2xl md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Civil42 video demos"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Civil42 demo viewer
                </div>
                <h5 className="mt-1 text-xl font-bold text-white md:text-3xl">
                  {activeVideo.title}
                </h5>
              </div>
              <button
                type="button"
                onClick={() => setIsDemoOpen(false)}
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-colors duration-200 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Close video viewer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_260px]">
              <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-3 md:p-5">
                <button
                  type="button"
                  onClick={() => goToDemo(-1)}
                  className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label="Previous demo"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <video
                  key={activeVideo.src}
                  className={
                    activeVideo.mode === 'phone'
                      ? 'h-full max-h-[calc(100dvh-180px)] w-auto max-w-full rounded-2xl border border-white/10 bg-black object-contain'
                      : 'max-h-[calc(100dvh-180px)] w-full rounded-2xl border border-white/10 bg-black object-contain'
                  }
                  src={activeVideo.src}
                  poster={activeVideo.poster}
                  playsInline
                  controls
                  preload="metadata"
                />
                <button
                  type="button"
                  onClick={() => goToDemo(1)}
                  className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label="Next demo"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              <aside className="grid gap-3 overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.04] p-3 lg:block">
                <p className="mb-3 hidden text-sm leading-6 text-white/55 lg:block">
                  {activeVideo.description}
                </p>
                {civil42Videos.map((video, index) => (
                  <button
                    key={video.src}
                    type="button"
                    onClick={() => setActiveDemo(index)}
                    className={`mb-3 w-full rounded-2xl border p-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                      index === activeDemo
                        ? 'border-white/35 bg-white text-black'
                        : 'border-white/10 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] opacity-60">
                        {video.mode}
                      </span>
                      <span className="text-xs font-bold opacity-60">
                        {video.duration}
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-bold">{video.title}</div>
                    <div className="mt-1 text-xs leading-5 opacity-60">
                      {video.label}
                    </div>
                  </button>
                ))}
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProjectCard = ({
  project,
  index,
  hovered,
  setHovered,
}: ProjectCardProps) => {
  const isHovered = hovered === index;
  const isMobile = project.type === 'mobile';
  const [activeImage, setActiveImage] = useState(0);

  // Auto-cycle images every 3 seconds when hovered
  useEffect(() => {
    if (!isHovered || project.pictures.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % project.pictures.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, project.pictures.length]);

  const resetHoverState = () => {
    setActiveImage(0);
    setHovered(null);
  };

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={resetHoverState}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 h-[500px]
 ${isMobile ? 'md:col-span-1' : 'md:col-span-1'}
 ${isHovered ? 'scale-[1.02] z-10' : hovered !== null ? 'scale-95 blur-sm brightness-50' : ''}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={project.pictures[activeImage]}
          alt={project.name}
          fill
          className={`transition-opacity duration-500 ${isMobile ? 'object-contain bg-gray-900' : 'object-cover'}`}
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 space-y-4">
        {/* Play Store Badge - HIGHLIGHTED */}
        {project.playStoreLink && (
          <div className="absolute top-4 left-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white blur-xl opacity-50 animate-pulse"></div>
              <span className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-black rounded-full text-xs font-bold shadow-lg shadow-white/50 border-2 border-gray-300">
                <Smartphone className="size-4 animate-bounce" />
                Available on Play Store
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base line-clamp-2">
          {project.description}
        </p>

        {/* Image Slider Dots */}
        {project.pictures.length > 1 && (
          <div className="flex gap-2 pt-1">
            {project.pictures.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveImage(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeImage ? 'bg-white w-8' : 'bg-white/30 w-6'
                }`}
                aria-label={`Show image ${i + 1} of ${project.name}`}
              />
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.usedTechnology.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20"
            >
              {tech}
            </span>
          ))}
          {project.usedTechnology.length > 4 && (
            <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs text-white border border-white/20">
              +{project.usedTechnology.length - 4} more
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          {project.developmentTime && (
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{project.developmentTime}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Users className="size-4" />
            <span>
              {project.contributors.length} contributor
              {project.contributors.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-2">
          {project.repositories.map((repo, i) => (
            <a
              key={i}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20 hover:border-white/40 group"
            >
              <Github className="size-4 text-white" />
              <span className="text-white text-sm font-medium">
                {repo.name}
              </span>
            </a>
          ))}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all border border-white/30 hover:border-white/50"
            >
              <ExternalLink className="size-4 text-white" />
              <span className="text-white text-sm font-medium">Live Demo</span>
            </a>
          )}

          {project.playStoreLink && (
            <a
              href={project.playStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 backdrop-blur-sm rounded-lg transition-all border-2 border-gray-300/50 hover:border-gray-200 shadow-lg shadow-white/30">
                <Smartphone className="size-4 text-black" />
                <span className="text-black text-sm font-bold">
                  Download on Play Store
                </span>
              </div>
            </a>
          )}

          {project.comingSoonPlayStore && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 backdrop-blur-sm rounded-lg border border-gray-500/30">
              <span className="text-gray-300 text-sm font-medium">
                Coming Soon to Play Store
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProjectsFocusCards() {
  const [hoveredWeb, setHoveredWeb] = useState<number | null>(null);
  const [hoveredMobile, setHoveredMobile] = useState<number | null>(null);

  const webProjects = projects.filter((p) => p.type === 'web');
  const mobileProjects = projects.filter((p) => p.type === 'mobile');

  return (
    <section className="w-full px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Web Projects Section */}
        <div>
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Web Applications
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Full-Stack Web Projects
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Modern web applications built with React, Next.js, and
              cutting-edge technologies.
            </p>
          </div>

          <div className="mb-10">
            <FeaturedPVCProject />
          </div>

          <div className="mb-10">
            <FeaturedCivil42Project />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                hovered={hoveredWeb}
                setHovered={setHoveredWeb}
              />
            ))}
          </div>
        </div>

        {/* Mobile Projects Section */}
        <div>
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Mobile Applications
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              React Native Apps
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl">
              Cross-platform mobile applications with native performance and
              beautiful UX.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mobileProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                hovered={hoveredMobile}
                setHovered={setHoveredMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
