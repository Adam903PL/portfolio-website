'use client';

import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useInView,
} from 'framer-motion';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';

export interface EducationMilestone {
  id: string;
  phase: string;
  periodLabel: string;
  status: string;
  title: string;
  institution: string;
  description: string;
  highlights: string[];
  skills: string[];
  level: string;
  icon: string;
}

export interface EducationStat {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
}

interface EducationJourneyProps {
  data: EducationMilestone[];
  iconMap: Record<string, LucideIcon>;
  header: {
    subtitle: string;
    title: string;
    description: string;
  };
  stats: EducationStat[];
}

const LEVEL_COLORS: Record<
  string,
  { dot: string; badge: string; text: string }
> = {
  Foundation: {
    dot: 'bg-zinc-500',
    badge: 'bg-zinc-900 border-zinc-700',
    text: 'text-zinc-400',
  },
  Exploration: {
    dot: 'bg-violet-500',
    badge: 'bg-violet-950 border-violet-800',
    text: 'text-violet-400',
  },
  'Creative Practice': {
    dot: 'bg-sky-500',
    badge: 'bg-sky-950 border-sky-800',
    text: 'text-sky-400',
  },
  'Technical Foundation': {
    dot: 'bg-amber-500',
    badge: 'bg-amber-950 border-amber-800',
    text: 'text-amber-400',
  },
  'Current Focus': {
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-950 border-emerald-700',
    text: 'text-emerald-400',
  },
};

function useLevelColor(level: string) {
  return (
    LEVEL_COLORS[level] ?? {
      dot: 'bg-white/40',
      badge: 'bg-white/5 border-white/10',
      text: 'text-white/60',
    }
  );
}

function TimelineDot({
  level,
  isActive,
}: {
  level: string;
  isActive: boolean;
}) {
  const c = useLevelColor(level);
  return (
    <div className="relative flex size-10 items-center justify-center flex-shrink-0">
      <m.div
        className={`absolute inset-0 rounded-full ${c.dot} opacity-20`}
        animate={isActive ? { scale: [1, 1.5, 1] } : { scale: 1 }}
        transition={{
          duration: 1.6,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />
      <div
        className={`size-3.5 rounded-full ${c.dot} ring-2 ring-black relative z-10`}
      />
    </div>
  );
}

function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="text-[11px] font-mono tracking-wide px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 whitespace-nowrap">
      {skill}
    </span>
  );
}

function MilestoneCard({
  milestone,
  index,
  iconMap,
  isLast,
}: {
  milestone: EducationMilestone;
  index: number;
  iconMap: Record<string, LucideIcon>;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const c = useLevelColor(milestone.level);
  const Icon = iconMap[milestone.icon];

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex gap-0 relative"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center w-10 flex-shrink-0">
        <TimelineDot
          level={milestone.level}
          isActive={milestone.level === 'Current Focus'}
        />
        {!isLast && (
          <m.div
            className="w-px flex-1 mt-1 bg-gradient-to-b from-white/10 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 + 0.3 }}
          />
        )}
      </div>

      {/* Card */}
      <div className="ml-5 mb-10 flex-1 min-w-0">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left group"
          aria-expanded={open}
        >
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.055] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
            {/* Card header */}
            <div className="px-5 py-4 flex items-start gap-4">
              {/* Icon */}
              <div
                className={`mt-0.5 flex-shrink-0 size-9 rounded-lg flex items-center justify-center ${c.badge} border`}
              >
                {Icon && <Icon size={16} className={c.text} />}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-widest ${c.text}`}
                  >
                    {milestone.periodLabel}
                  </span>
                  <span className="text-white/20 text-[10px]">·</span>
                  <span className="text-[11px] text-white/30 font-mono">
                    {milestone.status}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-white/90 leading-snug">
                  {milestone.title}
                </h3>
                <p className="text-[12px] text-white/40 mt-0.5">
                  {milestone.institution}
                </p>
              </div>

              {/* Chevron */}
              <m.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 mt-1"
              >
                <ChevronDown
                  size={15}
                  className="text-white/30 group-hover:text-white/50 transition-colors"
                />
              </m.div>
            </div>

            {/* Peek description — visible before expand */}
            {!open && (
              <div className="px-5 pb-4 -mt-1">
                <p className="text-[13px] text-white/40 leading-relaxed line-clamp-2">
                  {milestone.description}
                </p>
              </div>
            )}

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  key="expanded"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-white/[0.06] pt-4">
                    <p className="text-[13px] text-white/55 leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {milestone.highlights.map((h, i) => (
                        <m.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-2.5 text-[13px] text-white/50"
                        >
                          <span
                            className={`mt-[5px] size-1.5 rounded-full flex-shrink-0 ${c.dot}`}
                          />
                          {h}
                        </m.li>
                      ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {milestone.skills.map((s) => (
                        <SkillPill key={s} skill={s} />
                      ))}
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </m.div>
  );
}

function StatCard({ stat, index }: { stat: EducationStat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = stat.icon;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-3 p-5 rounded-xl border border-white/[0.07] bg-white/[0.03]"
    >
      <div className="size-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
        <Icon size={15} className="text-white/50" />
      </div>
      <div>
        <p className="text-2xl font-bold text-white tracking-tight">
          {stat.value}
        </p>
        <p className="text-[11px] font-mono uppercase tracking-widest text-white/40 mt-0.5">
          {stat.label}
        </p>
      </div>
      <p className="text-[12px] text-white/35 leading-relaxed">
        {stat.description}
      </p>
    </m.div>
  );
}

export default function EducationJourney({
  data,
  iconMap,
  header,
  stats,
}: EducationJourneyProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      <section className="min-h-screen px-4 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <m.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4">
              {header.subtitle}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              {header.title}
            </h1>
            <p className="text-[14px] text-white/45 leading-relaxed max-w-lg">
              {header.description}
            </p>
          </m.div>

          {/* Stats row */}
          <m.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-3 mb-14"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </m.div>

          {/* Timeline */}
          <div className="relative">
            {data.map((milestone, i) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                index={i}
                iconMap={iconMap}
                isLast={i === data.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
