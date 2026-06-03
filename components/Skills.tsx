'use client';

import { useMemo, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  domMax,
  m,
  useReducedMotion,
} from 'framer-motion';
import { RotateCcw, Search, X } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';

import JavaScriptIcon from '@/public/img/icons/javascript-programming-language-icon.svg';
import TypeScriptIcon from '@/public/img/icons/typescript-programming-language-icon.svg';
import PythonIcon from '@/public/img/icons/python-programming-language-icon.svg';
import CppIcon from '@/public/img/icons/c-plus-plus-programming-language-icon.svg';
import PhpIcon from '@/public/img/icons/php.svg';
import HTMLIcon from '@/public/img/icons/html-icon.svg';
import ReactIcon from '@/public/img/icons/react-js-icon.svg';
import NextJsIcon from '@/public/img/icons/nextjs-icon.svg';
import ReactNativeIcon from '@/public/img/icons/react-native-app-icon.svg';
import NodeIcon from '@/public/img/icons/node-js-icon.svg';
import ExpressIcon from '@/public/img/icons/express-js-icon.svg';
import FastAPIIcon from '@/public/img/icons/FastAPI.svg';
import FlaskIcon from '@/public/img/icons/icons8-flask.svg';
import PostgresIcon from '@/public/img/icons/PostgreSQL.svg';
import MsSqlIcon from '@/public/img/icons/mssql.svg';
import TailwindIcon from '@/public/img/icons/tailwind-css-icon.svg';
import ReduxIcon from '@/public/img/icons/redux.svg';
import ZustandIcon from '@/public/img/icons/zustand.svg';
import LottieIcon from '@/public/img/icons/lottiefiles.svg';
import GitIcon from '@/public/img/icons/git-icon.svg';
import VSCodeIcon from '@/public/img/icons/icons8-visual-studio-code-2019.svg';
import DockerIcon from '@/public/img/icons/icons8-docker.svg';
import PostmanIcon from '@/public/img/icons/postman-icon.svg';
import JetBrainsIcon from '@/public/img/icons/icons8-jetbrains.svg';
import N8NIcon from '@/public/img/icons/n8n.svg';
import BetterAuthIcon from '@/public/img/icons/Better Auth_light.svg';
import KotlinIcon from '@/public/img/icons/Kotlin_icon.svg';
import ReactHookFormIcon from '@/public/img/icons/react-hooj-form-icon.svg';
import StripeIcon from '@/public/img/icons/stripe-icon.svg';
import PrismaIcon from '@/public/img/icons/prisma-svgrepo-com.svg';

// ─── Inline SVG icons for Supabase, Railway, Cloudflare ───────────────────────

function SupabaseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

function RailwayIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.113 10.27A13.026 13.026 0 000 11.48h18.23c-.064-.125-.15-.237-.235-.347-3.117-4.027-4.793-3.677-7.19-3.78-.8-.034-1.34-.048-4.524-.048-1.704 0-3.555.005-5.358.01-.234.63-.459 1.24-.567 1.737h9.342v1.216H.113v.002zm18.26 2.426H.009c.02.326.05.645.094.961h16.955c.754 0 1.179-.429 1.315-.96zm-17.318 4.28s2.81 6.902 10.93 7.024c4.855 0 9.027-2.883 10.92-7.024H1.056zM11.988 0C7.5 0 3.593 2.466 1.531 6.108l4.75-.005v-.002c3.71 0 3.849.016 4.573.047l.448.016c1.563.052 3.485.22 4.996 1.364.82.621 2.007 1.99 2.712 2.965.654.902.842 1.94.396 2.934-.408.914-1.289 1.458-2.353 1.458H.391s.099.42.249.886h22.748A12.026 12.026 0 0024 12.005C24 5.377 18.621 0 11.988 0z"
        fill="#0B0D0E"
        className="[.dark_&]:fill-white"
        style={{ fill: 'white' }}
      />
    </svg>
  );
}

function CloudflareIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"
        fill="#F6821F"
      />
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────

const ExperienceLevel = {
  BEGINNER: 'Beginner',
  BASIC: 'Basic',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
} as const;

const SkillCategory = {
  LANGUAGE: 'Languages',
  FRAMEWORK: 'Frameworks',
  LIBRARY: 'Libraries',
  BACKEND: 'Backend',
  DATABASE: 'Databases',
  TOOLS: 'Tools',
} as const;

type ExperienceLevelValue =
  (typeof ExperienceLevel)[keyof typeof ExperienceLevel];
type SkillCategoryValue = (typeof SkillCategory)[keyof typeof SkillCategory];
type FilterCategory = 'All' | SkillCategoryValue;
type FilterLevel = 'All' | ExperienceLevelValue;
type ProjectCount =
  | number
  | 'Daily'
  | 'Many'
  | 'Several'
  | 'Few'
  | 'Frequently';

type Skill = {
  name: string;
  icon: StaticImageData | null;
  customIcon?: 'conventional-commits' | 'supabase' | 'railway' | 'cloudflare';
  level: ExperienceLevelValue;
  projects: ProjectCount;
  categories: SkillCategoryValue[];
  details: string;
  lightSurface?: boolean; // use white bg for dark icons
};

// ─── Skills data ───────────────────────────────────────────────────────────────

const allSkills: Skill[] = [
  {
    name: 'JavaScript',
    icon: JavaScriptIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Many',
    categories: [SkillCategory.LANGUAGE],
    details:
      'Core language mastery (2+ years). ES6+ features, async/await patterns, closure utilization, and Promise chaining. Daily driver for production projects.',
  },
  {
    name: 'TypeScript',
    icon: TypeScriptIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Many',
    categories: [SkillCategory.LANGUAGE],
    details:
      'Primary language for 1+ year. Advanced type system, interface design, and generic programming. Full-stack integration with modern frameworks.',
  },
  {
    name: 'Python',
    icon: PythonIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Many',
    categories: [SkillCategory.LANGUAGE],
    details:
      '2022–2023 main focus. Web scraping automation, data analysis pipelines, and scripting. Maintaining legacy projects while transitioning to JS/TS stack.',
  },
  {
    name: 'HTML',
    icon: HTMLIcon,
    level: ExperienceLevel.EXPERT,
    projects: 'Many',
    categories: [SkillCategory.LANGUAGE],
    details:
      'Semantic markup, accessibility best practices, and modern HTML5 APIs. Foundation of all web development work.',
  },
  {
    name: 'PHP',
    icon: PhpIcon,
    level: ExperienceLevel.BASIC,
    projects: 'Several',
    categories: [SkillCategory.LANGUAGE],
    details:
      'Vocational exam prep (2024). Basic CMS systems and REST APIs with Laravel. Learning modern OOP patterns.',
  },
  {
    name: 'Kotlin',
    icon: KotlinIcon,
    level: ExperienceLevel.BASIC,
    projects: 'Several',
    categories: [SkillCategory.LANGUAGE],
    details:
      'Basics learned during vocational exam prep (2024). OOP fundamentals, null-safety, simple Android apps and CLI tools.',
  },
  {
    name: 'C++',
    icon: CppIcon,
    level: ExperienceLevel.BASIC,
    projects: 'Few',
    categories: [SkillCategory.LANGUAGE],
    details:
      'Hobbyist-level. Memory management, STL containers, pointer arithmetic. Exploring low-level system concepts.',
  },
  {
    name: 'React',
    icon: ReactIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 7,
    categories: [SkillCategory.FRAMEWORK],
    details:
      'Hooks architecture, Context API, performance optimization, Concurrent Mode. Custom hooks and component composition patterns.',
  },
  {
    name: 'Next.js',
    icon: NextJsIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 3,
    categories: [SkillCategory.FRAMEWORK],
    lightSurface: true,
    details:
      'App Router, SSR/ISR, API routes, middleware, and server actions. Modern Next.js patterns and best practices.',
  },
  {
    name: 'Tailwind CSS',
    icon: TailwindIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Several',
    categories: [SkillCategory.FRAMEWORK],
    details:
      'JIT compiler, custom plugins, responsive design patterns. Daily driver for styling modern web applications.',
  },
  {
    name: 'React Native',
    icon: ReactNativeIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 2,
    categories: [SkillCategory.FRAMEWORK],
    details:
      'Cross-platform mobile development, native modules, gesture handling, and React Navigation.',
  },
  {
    name: 'Node.js',
    icon: NodeIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Many',
    categories: [SkillCategory.BACKEND],
    details:
      'Daily driver for production-grade REST APIs, WebSocket servers, and microservices. Event loop optimization and NPM ecosystem.',
  },
  {
    name: 'Express.js',
    icon: ExpressIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Many',
    categories: [SkillCategory.BACKEND],
    lightSurface: true,
    details:
      'Advanced middleware patterns, RESTful routing, authentication middleware, and error handling layers.',
  },
  {
    name: 'FastAPI',
    icon: FastAPIIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 4,
    categories: [SkillCategory.BACKEND],
    details:
      '2023 primary tool for high-performance async endpoints with auto-generated Swagger docs. Strong Pydantic experience.',
  },
  {
    name: 'Flask',
    icon: FlaskIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 4,
    categories: [SkillCategory.BACKEND],
    details:
      '2022–2023 lightweight RESTful services and prototypes. Custom middleware and Jinja2 templating.',
  },
  {
    name: 'BetterAuth',
    icon: BetterAuthIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 3,
    categories: [SkillCategory.BACKEND],
    details:
      'Modern auth implementation with Next.js App Router. Session handling, middleware, and custom authentication providers.',
  },
  {
    name: 'Stripe',
    icon: StripeIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Several',
    categories: [SkillCategory.BACKEND],
    details:
      'Checkout sessions, webhooks handling, subscription logic, and full-stack payment flow integration.',
  },
  {
    name: 'Zustand',
    icon: ZustandIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Many',
    categories: [SkillCategory.LIBRARY],
    details:
      'Simplified state management, reactive stores, TypeScript integration. Lightweight Redux alternative.',
  },
  {
    name: 'Redux Toolkit',
    icon: ReduxIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Several',
    categories: [SkillCategory.LIBRARY],
    details:
      'Slice patterns, RTK Query for API management, middleware configuration for complex state.',
  },
  {
    name: 'React Hook Form',
    icon: ReactHookFormIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Several',
    categories: [SkillCategory.LIBRARY],
    details:
      'Performant form handling with schema validation (Zod/Yup), dynamic forms, and complex controlled/uncontrolled inputs.',
  },
  {
    name: 'Lottie',
    icon: LottieIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Many',
    categories: [SkillCategory.LIBRARY],
    details:
      'Complex animations, After Effects integration, dynamic SVG manipulation for engaging UX.',
  },
  {
    name: 'Prisma',
    icon: PrismaIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Several',
    categories: [SkillCategory.DATABASE],
    lightSurface: true,
    details:
      'ORM for Node.js and TypeScript. Schema modeling, relations, migrations, and Prisma Client in production apps.',
  },
  {
    name: 'PostgreSQL',
    icon: PostgresIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Many',
    categories: [SkillCategory.DATABASE],
    details:
      'Query optimization, index management, ORM integrations. Complex joins and window functions.',
  },
  {
    name: 'MS SQL',
    icon: MsSqlIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Many',
    categories: [SkillCategory.DATABASE],
    details:
      'T-SQL development, stored procedures, query optimization. 2023 focus on SSIS packages and data warehousing.',
  },
  {
    name: 'Supabase',
    icon: null,
    customIcon: 'supabase',
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Several',
    categories: [SkillCategory.DATABASE, SkillCategory.BACKEND],
    details:
      'Postgres-backed BaaS with real-time subscriptions, Row Level Security, auth, and storage. Used in several production projects as a full backend replacement.',
  },
  {
    name: 'Git',
    icon: GitIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Daily',
    categories: [SkillCategory.TOOLS],
    details:
      'Interactive rebasing, cherry-picking, stash management. Comfortable resolving complex merge conflicts.',
  },
  {
    name: 'VS Code',
    icon: VSCodeIcon,
    level: ExperienceLevel.EXPERT,
    projects: 'Daily',
    categories: [SkillCategory.TOOLS],
    details:
      'Customized to pixel-perfect precision. Extension collection curated over years for peak developer experience.',
  },
  {
    name: 'Docker',
    icon: DockerIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Several',
    categories: [SkillCategory.TOOLS],
    details:
      'Containerization for development and deployment. Docker Compose for multi-container apps and microservices.',
  },
  {
    name: 'Railway',
    icon: null,
    customIcon: 'railway',
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Many',
    categories: [SkillCategory.TOOLS],
    details:
      'Go-to platform for deploying full-stack apps and backend services. Used in many projects for fast, zero-config deploys with PostgreSQL provisioning.',
  },
  {
    name: 'Cloudflare',
    icon: null,
    customIcon: 'cloudflare',
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Many',
    categories: [SkillCategory.TOOLS],
    details:
      'DNS management, CDN, Workers for edge logic, and Pages for frontend hosting. Used across many projects for performance and security.',
  },
  {
    name: 'n8n',
    icon: N8NIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Many',
    categories: [SkillCategory.TOOLS],
    details:
      'Workflow automation, API integrations, and backend scenarios without extensive coding. Complex business process automation.',
  },
  {
    name: 'JetBrains',
    icon: JetBrainsIcon,
    level: ExperienceLevel.ADVANCED,
    projects: 'Frequently',
    categories: [SkillCategory.TOOLS],
    details:
      'Intelligent code completion, refactoring tools, and integrated database tooling across all JetBrains IDEs.',
  },
  {
    name: 'Postman',
    icon: PostmanIcon,
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Many',
    categories: [SkillCategory.TOOLS],
    details:
      'Request collections, environment variables, and automated test suites for API development and QA.',
  },
  {
    name: 'Conventional Commits',
    icon: null,
    customIcon: 'conventional-commits',
    level: ExperienceLevel.INTERMEDIATE,
    projects: 'Many',
    categories: [SkillCategory.TOOLS],
    details:
      'Consistent commit message conventions across projects. Enables changelog generation, semantic versioning, and clean git history.',
  },
];

// ─── Constants ─────────────────────────────────────────────────────────────────

const LEVEL_ORDER: ExperienceLevelValue[] = [
  ExperienceLevel.EXPERT,
  ExperienceLevel.ADVANCED,
  ExperienceLevel.INTERMEDIATE,
  ExperienceLevel.BASIC,
  ExperienceLevel.BEGINNER,
];

const LEVEL_BAR: Record<ExperienceLevelValue, number> = {
  Expert: 100,
  Advanced: 80,
  Intermediate: 60,
  Basic: 40,
  Beginner: 20,
};

const LEVEL_DOT_COLOR: Record<ExperienceLevelValue, string> = {
  Expert: 'bg-white',
  Advanced: 'bg-white/80',
  Intermediate: 'bg-white/55',
  Basic: 'bg-white/30',
  Beginner: 'bg-white/15',
};

const CATEGORY_TABS: Array<'All' | SkillCategoryValue> = [
  'All',
  ...Object.values(SkillCategory),
];

function projectLabel(val: ProjectCount): string {
  if (typeof val === 'number') return `${val} projects`;
  if (val === 'Daily' || val === 'Frequently') return val;
  return `${val} projects`;
}

// ─── Icon component ─────────────────────────────────────────────────────────────

function SkillIcon({ skill, size = 22 }: { skill: Skill; size?: number }) {
  if (skill.customIcon === 'supabase') return <SupabaseIcon size={size} />;
  if (skill.customIcon === 'railway') return <RailwayIcon size={size} />;
  if (skill.customIcon === 'cloudflare') return <CloudflareIcon size={size} />;
  if (skill.customIcon === 'conventional-commits') {
    return (
      <span className="text-[9px] font-black tracking-tight text-white/70">
        CC
      </span>
    );
  }
  if (!skill.icon) {
    return (
      <span className="text-[10px] font-bold text-white/70">
        {skill.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <Image
      src={skill.icon}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className="object-contain"
    />
  );
}

// ─── Skill Card ─────────────────────────────────────────────────────────────────

function SkillCard({
  skill,
  expanded,
  onToggle,
  reduceMotion,
}: {
  skill: Skill;
  expanded: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const iconBg = skill.lightSurface
    ? 'bg-white/90 border-white/20'
    : 'bg-white/[0.06] border-white/10';

  return (
    <m.article
      layout={!reduceMotion}
      className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
        expanded
          ? 'border-white/25 bg-white/[0.06]'
          : 'border-white/10 bg-black/60 hover:border-white/20 hover:bg-white/[0.04]'
      } backdrop-blur-xl`}
    >
      {/* Header — always visible, clickable */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {/* Icon */}
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${iconBg}`}
        >
          <SkillIcon skill={skill} />
        </span>

        {/* Name + meta */}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-white">
            {skill.name}
          </span>
          <span className="mt-0.5 flex items-center gap-2 text-[11px] text-white/35">
            <span
              className={`inline-block size-1.5 rounded-full ${LEVEL_DOT_COLOR[skill.level]}`}
            />
            {skill.level}
            <span aria-hidden className="text-white/15">
              ·
            </span>
            {projectLabel(skill.projects)}
          </span>
        </span>

        {/* Expand indicator */}
        <m.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40"
          aria-hidden
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1v8M1 5h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </m.span>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
            <div className="px-4 pb-4 pt-0">
              {/* Progress bar */}
              <div className="mb-3 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-white/25">
                  <span>Proficiency</span>
                  <span className="font-mono text-white/45">
                    {LEVEL_BAR[skill.level]}%
                  </span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <m.div
                    initial={reduceMotion ? false : { width: 0 }}
                    animate={{ width: `${LEVEL_BAR[skill.level]}%` }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.5,
                      ease: 'easeOut',
                      delay: 0.05,
                    }}
                    className="h-full rounded-full bg-white/70"
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] leading-6 text-white/55">
                {skill.details}
              </p>

              {/* Category tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skill.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/30"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.article>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────

export default function Skills() {
  const reduceMotion = useReducedMotion() ?? false;

  const [activeCategory, setActiveCategory] = useState<
    'All' | SkillCategoryValue
  >('All');
  const [activeLevels, setActiveLevels] = useState<Set<ExperienceLevelValue>>(
    new Set(),
  );
  const [search, setSearch] = useState('');
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());

  function toggleExpand(name: string) {
    setExpandedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  function toggleLevel(level: ExperienceLevelValue) {
    setActiveLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  }

  function clearAll() {
    setActiveCategory('All');
    setActiveLevels(new Set());
    setSearch('');
    setExpandedSkills(new Set());
  }

  const hasFilters =
    activeCategory !== 'All' ||
    activeLevels.size > 0 ||
    search.trim().length > 0;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allSkills.filter((s) => {
      if (activeCategory !== 'All' && !s.categories.includes(activeCategory))
        return false;
      if (activeLevels.size > 0 && !activeLevels.has(s.level)) return false;
      if (
        q &&
        !s.name.toLowerCase().includes(q) &&
        !s.details.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [activeCategory, activeLevels, search]);

  // Group by level when no category/search filter, or flat list when filtered
  const isGrouped =
    activeCategory === 'All' && activeLevels.size === 0 && !search.trim();

  const groups = useMemo(() => {
    if (!isGrouped) return null;
    return LEVEL_ORDER.map((level) => ({
      level,
      skills: filtered.filter((s) => s.level === level),
    })).filter((g) => g.skills.length > 0);
  }, [isGrouped, filtered]);

  const advancedPlus = allSkills.filter(
    (s) =>
      s.level === ExperienceLevel.ADVANCED ||
      s.level === ExperienceLevel.EXPERT,
  ).length;

  return (
    <LazyMotion features={domMax}>
      <section
        id="skills"
        className="relative w-full scroll-mt-28 px-4 py-20 sm:px-6 lg:py-28"
      >
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.015] blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl">
          {/* ── Header ── */}
          <div className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 backdrop-blur">
              My Expertise
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Skills & Technologies
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/50">
              {allSkills.length} technologies across{' '}
              {Object.keys(SkillCategory).length} domains — {advancedPlus} at
              Advanced level or above.
            </p>
          </div>

          {/* ── Filters ── */}
          <div className="mb-8 space-y-4">
            {/* Search + reset */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/30"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search skills..."
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-white/25 focus:border-white/25 focus:outline-none focus:ring-0"
                />
              </div>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-white/50 transition-colors hover:border-white/20 hover:text-white"
                >
                  <RotateCcw className="size-3.5" />
                  Clear
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORY_TABS.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      active
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 bg-white/[0.04] text-white/55 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Level toggles */}
            <div className="flex flex-wrap gap-2">
              {LEVEL_ORDER.map((level) => {
                const active = activeLevels.has(level);
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => toggleLevel(level)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      active
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-transparent text-white/35 hover:border-white/15 hover:text-white/60'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${LEVEL_DOT_COLOR[level]}`}
                    />
                    {level}
                    {active && (
                      <X className="size-3 text-white/50" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Skill list ── */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
              <p className="text-lg font-semibold text-white">
                No skills match
              </p>
              <p className="mt-2 text-sm text-white/40">
                Try clearing the filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 rounded-xl border border-white/20 bg-white px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-white/90"
              >
                Reset
              </button>
            </div>
          ) : isGrouped && groups ? (
            <div className="space-y-8">
              {groups.map((group) => (
                <div key={group.level}>
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={`inline-block size-2 rounded-full ${LEVEL_DOT_COLOR[group.level]}`}
                    />
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      {group.level}
                      <span className="ml-2 text-white/20">
                        {group.skills.length}
                      </span>
                    </h3>
                    <span className="h-px flex-1 bg-white/[0.06]" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {group.skills.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                        expanded={expandedSkills.has(skill.name)}
                        onToggle={() => toggleExpand(skill.name)}
                        reduceMotion={reduceMotion}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {filtered.map((skill) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  expanded={expandedSkills.has(skill.name)}
                  onToggle={() => toggleExpand(skill.name)}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </LazyMotion>
  );
}
