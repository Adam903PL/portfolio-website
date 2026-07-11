'use client';

import React, { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { LazyMotion, m } from 'framer-motion';
import { domAnimation } from 'framer-motion';
import { staggerContainer, fadeSlideUp, useMotionSafe } from '@/lib/motion';

import JavaScriptIcon from '@/public/img/icons/javascript-programming-language-icon.svg';
import TypeScriptIcon from '@/public/img/icons/typescript-programming-language-icon.svg';
import PythonIcon from '@/public/img/icons/python-programming-language-icon.svg';
import HTMLIcon from '@/public/img/icons/html-icon.svg';
import PhpIcon from '@/public/img/icons/php.svg';
import KotlinIcon from '@/public/img/icons/Kotlin_icon.svg';
import CppIcon from '@/public/img/icons/c-plus-plus-programming-language-icon.svg';
import ReactIcon from '@/public/img/icons/react-js-icon.svg';
import NextJsIcon from '@/public/img/icons/nextjs-icon.svg';
import TailwindIcon from '@/public/img/icons/tailwind-css-icon.svg';
import ReactNativeIcon from '@/public/img/icons/react-native-app-icon.svg';
import ZustandIcon from '@/public/img/icons/zustand.svg';
import ReduxIcon from '@/public/img/icons/redux.svg';
import ReactHookFormIcon from '@/public/img/icons/react-hooj-form-icon.svg';
import LottieIcon from '@/public/img/icons/lottiefiles.svg';
import NodeIcon from '@/public/img/icons/node-js-icon.svg';
import ExpressIcon from '@/public/img/icons/express-js-icon.svg';
import FastAPIIcon from '@/public/img/icons/FastAPI.svg';
import FlaskIcon from '@/public/img/icons/icons8-flask.svg';
import StripeIcon from '@/public/img/icons/stripe-icon.svg';
import PrismaIcon from '@/public/img/icons/prisma-svgrepo-com.svg';
import PostgresIcon from '@/public/img/icons/PostgreSQL.svg';
import MsSqlIcon from '@/public/img/icons/mssql.svg';
import AwsLogoIcon from '@/public/img/icons/aws-logo.svg';
import AwsS3Icon from '@/public/img/icons/aws-s3.svg';
import AwsEc2Icon from '@/public/img/icons/aws-ec2.svg';
import GoogleCloudIcon from '@/public/img/icons/google-cloud-logo.svg';
import ClaudeIcon from '@/public/img/icons/claude.svg';
import AntigravityIcon from '@/public/img/icons/google-antigravity.png';
import OpenAIIcon from '@/public/img/icons/openai.svg';
import GitIcon from '@/public/img/icons/git-icon.svg';
import VSCodeIcon from '@/public/img/icons/icons8-visual-studio-code-2019.svg';
import DockerIcon from '@/public/img/icons/icons8-docker.svg';
import N8NIcon from '@/public/img/icons/n8n.svg';
import JetBrainsIcon from '@/public/img/icons/icons8-jetbrains.svg';
import PostmanIcon from '@/public/img/icons/postman-icon.svg';
import NestIcon from '@/public/img/icons/nestjs-icon.svg';
import VercelIcon from '@/public/img/icons/vercel-icon.svg';
import SentryIcon from '@/public/img/icons/sentry-icon.svg';
import PlaywrightIcon from '@/public/img/icons/playwright-icon.svg';
import GitHubActionsIcon from '@/public/img/icons/github-actions-icon.svg';
import YamlIcon from '@/public/img/icons/yaml-icon.svg';
import SupabaseIcon from '@/public/img/icons/supabase-icon.svg';
import RailwayIcon from '@/public/img/icons/railway-icon.svg';
import CloudflareIcon from '@/public/img/icons/cloudflare-icon.svg';
import ConvCommitsIcon from '@/public/img/icons/conventional-commits-icon.svg';
import BetterAuthIcon from '@/public/img/icons/betterauth-icon.svg';

type Skill = {
  name: string;
  cat: string;
  freq: string;
  mono: string;
  icon?: StaticImageData;
};

const categories = [
  'All',
  'Languages',
  'Frameworks',
  'Libraries',
  'Backend',
  'Databases',
  'Cloud & AI',
  'DevOps',
  'Tools',
];

const skills: Skill[] = [
  {
    name: 'JavaScript',
    cat: 'Languages',
    freq: 'Many',
    mono: 'JS',
    icon: JavaScriptIcon,
  },
  {
    name: 'TypeScript',
    cat: 'Languages',
    freq: 'Many',
    mono: 'TS',
    icon: TypeScriptIcon,
  },
  {
    name: 'Python',
    cat: 'Languages',
    freq: 'Many',
    mono: 'PY',
    icon: PythonIcon,
  },
  { name: 'HTML', cat: 'Languages', freq: 'Many', mono: '<>', icon: HTMLIcon },
  { name: 'PHP', cat: 'Languages', freq: 'Several', mono: 'PH', icon: PhpIcon },
  {
    name: 'Kotlin',
    cat: 'Languages',
    freq: 'Several',
    mono: 'KT',
    icon: KotlinIcon,
  },
  { name: 'C++', cat: 'Languages', freq: 'Few', mono: 'C+', icon: CppIcon },
  {
    name: 'React',
    cat: 'Frameworks',
    freq: '7 proj',
    mono: 'Re',
    icon: ReactIcon,
  },
  {
    name: 'Next.js',
    cat: 'Frameworks',
    freq: '3 proj',
    mono: 'Nx',
    icon: NextJsIcon,
  },
  {
    name: 'Tailwind CSS',
    cat: 'Frameworks',
    freq: 'Several',
    mono: 'Tw',
    icon: TailwindIcon,
  },
  {
    name: 'React Native',
    cat: 'Frameworks',
    freq: '2 proj',
    mono: 'RN',
    icon: ReactNativeIcon,
  },
  {
    name: 'Zustand',
    cat: 'Libraries',
    freq: 'Many',
    mono: 'Zu',
    icon: ZustandIcon,
  },
  {
    name: 'Redux Toolkit',
    cat: 'Libraries',
    freq: 'Several',
    mono: 'Rx',
    icon: ReduxIcon,
  },
  {
    name: 'React Hook Form',
    cat: 'Libraries',
    freq: 'Several',
    mono: 'HF',
    icon: ReactHookFormIcon,
  },
  {
    name: 'Lottie',
    cat: 'Libraries',
    freq: 'Many',
    mono: 'Lo',
    icon: LottieIcon,
  },
  { name: 'Node.js', cat: 'Backend', freq: 'Many', mono: 'No', icon: NodeIcon },
  {
    name: 'Express.js',
    cat: 'Backend',
    freq: 'Many',
    mono: 'Ex',
    icon: ExpressIcon,
  },
  {
    name: 'FastAPI',
    cat: 'Backend',
    freq: '4 proj',
    mono: 'Fa',
    icon: FastAPIIcon,
  },
  {
    name: 'Flask',
    cat: 'Backend',
    freq: '4 proj',
    mono: 'Fl',
    icon: FlaskIcon,
  },
  {
    name: 'BetterAuth',
    cat: 'Backend',
    freq: '3 proj',
    mono: 'BA',
    icon: BetterAuthIcon,
  },
  {
    name: 'NestJS',
    cat: 'Backend',
    freq: '2 proj',
    mono: 'Ne',
    icon: NestIcon,
  },
  {
    name: 'Stripe',
    cat: 'Backend',
    freq: 'Several',
    mono: 'St',
    icon: StripeIcon,
  },
  {
    name: 'Prisma',
    cat: 'Databases',
    freq: 'Several',
    mono: 'Pr',
    icon: PrismaIcon,
  },
  {
    name: 'PostgreSQL',
    cat: 'Databases',
    freq: 'Many',
    mono: 'Pg',
    icon: PostgresIcon,
  },
  {
    name: 'MS SQL',
    cat: 'Databases',
    freq: 'Many',
    mono: 'MS',
    icon: MsSqlIcon,
  },
  {
    name: 'Supabase',
    cat: 'Databases',
    freq: 'Several',
    mono: 'Sb',
    icon: SupabaseIcon,
  },
  {
    name: 'AWS',
    cat: 'Cloud & AI',
    freq: 'Several',
    mono: 'aws',
    icon: AwsLogoIcon,
  },
  {
    name: 'Amazon S3',
    cat: 'Cloud & AI',
    freq: 'Several',
    mono: 'S3',
    icon: AwsS3Icon,
  },
  {
    name: 'Amazon EC2',
    cat: 'Cloud & AI',
    freq: 'Few',
    mono: 'EC',
    icon: AwsEc2Icon,
  },
  {
    name: 'Google Cloud',
    cat: 'Cloud & AI',
    freq: 'Few',
    mono: 'GC',
    icon: GoogleCloudIcon,
  },
  {
    name: 'Claude Code',
    cat: 'Cloud & AI',
    freq: 'Often',
    mono: 'Cl',
    icon: ClaudeIcon,
  },
  {
    name: 'Antigravity',
    cat: 'Cloud & AI',
    freq: 'Often',
    mono: 'Ag',
    icon: AntigravityIcon,
  },
  {
    name: 'OpenAI Codex',
    cat: 'Cloud & AI',
    freq: 'Often',
    mono: 'Cx',
    icon: OpenAIIcon,
  },
  { name: 'Git', cat: 'Tools', freq: 'Daily', mono: 'Gi', icon: GitIcon },
  {
    name: 'VS Code',
    cat: 'Tools',
    freq: 'Daily',
    mono: 'VS',
    icon: VSCodeIcon,
  },
  {
    name: 'Docker',
    cat: 'Tools',
    freq: 'Several',
    mono: 'Dk',
    icon: DockerIcon,
  },
  {
    name: 'Railway',
    cat: 'Tools',
    freq: 'Many',
    mono: 'Ra',
    icon: RailwayIcon,
  },
  {
    name: 'Cloudflare',
    cat: 'Tools',
    freq: 'Many',
    mono: 'Cf',
    icon: CloudflareIcon,
  },
  { name: 'n8n', cat: 'Tools', freq: 'Many', mono: 'n8', icon: N8NIcon },
  {
    name: 'JetBrains',
    cat: 'Tools',
    freq: 'Often',
    mono: 'JB',
    icon: JetBrainsIcon,
  },
  {
    name: 'Postman',
    cat: 'Tools',
    freq: 'Many',
    mono: 'Pm',
    icon: PostmanIcon,
  },
  {
    name: 'Conv. Commits',
    cat: 'Tools',
    freq: 'Many',
    mono: 'CC',
    icon: ConvCommitsIcon,
  },
  {
    name: 'Vercel',
    cat: 'DevOps',
    freq: 'Many',
    mono: 'Ve',
    icon: VercelIcon,
  },
  {
    name: 'GitHub Actions',
    cat: 'DevOps',
    freq: 'Several',
    mono: 'GA',
    icon: GitHubActionsIcon,
  },
  {
    name: 'Playwright',
    cat: 'DevOps',
    freq: 'Several',
    mono: 'Pw',
    icon: PlaywrightIcon,
  },
  {
    name: 'Sentry',
    cat: 'DevOps',
    freq: 'Few',
    mono: 'Se',
    icon: SentryIcon,
  },
  {
    name: 'YAML',
    cat: 'DevOps',
    freq: 'Many',
    mono: 'Ya',
    icon: YamlIcon,
  },
];

export default function Skills() {
  const [filter, setFilter] = useState('All');
  const motionSafe = useMotionSafe();

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
            / 02 - Stack
          </div>
          <h2 className="m-0 font-sans text-[44px] font-medium leading-none tracking-[-0.02em]">
            Skills &amp; technologies
          </h2>
        </div>
        <div className="max-w-[300px] text-right font-mono text-[13px] text-ink-40">
          47 technologies across 8 domains - filtered by what I actually ship.
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
      <m.div
        className="grid border-l border-t"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          borderColor: 'rgba(26,23,18,0.16)',
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={motionSafe.staggerContainer}
        key={filter}
      >
        {visible.map((s) => (
          <m.div
            key={s.name}
            className="flex items-center gap-3.5 border-b border-r bg-cream px-5 py-[18px]"
            style={{ borderColor: 'rgba(26,23,18,0.16)' }}
            variants={motionSafe.fadeSlideUp}
          >
            <div
              className="flex size-10 flex-none items-center justify-center border bg-sand font-mono text-[14px] font-bold text-ink"
              style={{ borderColor: 'rgba(26,23,18,0.2)' }}
            >
              {s.icon ? (
                <Image
                  src={s.icon}
                  alt=""
                  aria-hidden
                  className="max-h-[22px] max-w-[24px] object-contain"
                />
              ) : (
                s.mono
              )}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold">{s.name}</div>
              <div className="mt-0.5 font-mono text-[11px] text-ink-30">
                {s.cat} · {s.freq}
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
