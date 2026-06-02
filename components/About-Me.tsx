'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Briefcase,
  Check,
  Code,
  Code2,
  Dumbbell,
  Mail,
  MapPin,
  Palette,
  Phone,
  Rocket,
} from 'lucide-react';
import SpotifyListeningCard from '@/components/SpotifyListeningCard';

const focusRing =
  'focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

const expertise = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    meta: 'React / Next.js / Node.js',
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    meta: 'Figma / Tailwind / Motion',
  },
  {
    icon: Rocket,
    title: 'Performance & Automation',
    meta: 'n8n / PowerShell / Edge',
  },
];

const stats = [
  { icon: Briefcase, value: '3+', label: 'Yrs Exp' },
  { icon: Code2, value: '15+', label: 'Projects' },
  { icon: Dumbbell, value: '105kg', label: 'Bench' },
];

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('pukaluk.adam505@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  return (
    <section
      id="about"
      className="relative flex items-center justify-center px-4 py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/10 via-transparent to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[minmax(360px,0.85fr)_1fr] xl:gap-10">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] border border-white/10 bg-black/70 shadow-2xl shadow-black/50">
            <Image
              src="/img/gy19rvVD.jpg"
              alt="Adam Pukaluk"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover object-[center_35%]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-[12px] border border-white/10 bg-black/55 px-3 py-2 text-xs font-medium text-gray-200 backdrop-blur-md">
              <span className="size-2.5 rounded-full bg-[#1DB954]" />
              Available
            </div>

            <div className="absolute bottom-4 left-4 flex overflow-hidden rounded-[14px] border border-white/10 bg-black/60 backdrop-blur-xl">
              <div className="flex items-center gap-3 px-3.5 py-2.5">
                <Briefcase className="size-4 text-gray-400" />
                <div>
                  <p className="text-xl font-bold leading-none text-white">
                    16
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase text-gray-500">
                    Years
                  </p>
                </div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex items-center gap-3 px-3.5 py-2.5">
                <MapPin className="size-4 text-gray-400" />
                <div>
                  <p className="text-sm font-semibold leading-none text-gray-200">
                    Poland
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase text-gray-500">
                    Based
                  </p>
                </div>
              </div>
            </div>
          </div>

          <SpotifyListeningCard />
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
              About Me
            </p>
            <h2 className="max-w-xl text-4xl font-bold leading-[1.04] lg:text-5xl text-white">
              Crafting Digital Experiences
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
              Student at{' '}
              <a
                href="https://technischools.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold text-gray-200 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white ${focusRing}`}
              >
                TechniSchools
              </a>
              . 3+ years building across full-stack, automation with n8n /
              PowerShell, and cybersecurity with Kali Linux.
            </p>
          </div>

          <div className="space-y-3">
            {expertise.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex min-h-14 items-center gap-4 rounded-[14px] border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl transition-colors duration-200 hover:border-white/20 hover:bg-black/60"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.04] text-gray-300">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-gray-500">
                      {item.meta}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase text-gray-500">
              <Code className="size-3.5" />
              Currently Working On
            </p>
            <a
              href="https://github.com/promptversioncontrol-org/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex min-h-14 items-center justify-between rounded-[14px] border border-white/10 bg-black/70 px-4 text-sm font-semibold text-white backdrop-blur-xl transition-colors duration-200 hover:border-white/20 hover:bg-black/60 ${focusRing}`}
            >
              <span>promptversioncontrol-org</span>
              <ArrowRight className="size-4 text-gray-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="min-h-24 rounded-[14px] border border-white/10 bg-black/70 p-4 text-center backdrop-blur-xl"
                >
                  <Icon className="mx-auto mb-3 size-4 text-gray-500" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase text-gray-500">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <a
              href="tel:+48695031104"
              className={`flex min-h-14 items-center gap-3 rounded-[14px] border border-white/10 bg-black/70 px-4 text-sm font-semibold text-gray-200 backdrop-blur-xl transition-colors duration-200 hover:border-white/20 hover:bg-black/60 hover:text-white ${focusRing}`}
            >
              <Phone className="size-4 text-gray-500" />
              +48 695 031 104
            </a>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-white px-4 text-sm font-semibold text-black transition-colors duration-200 hover:bg-gray-200 ${focusRing}`}
              >
                {copied ? (
                  <>
                    <Check className="size-4" />
                    Email Copied
                  </>
                ) : (
                  <>
                    <Mail className="size-4" />
                    Copy Email
                  </>
                )}
              </button>

              <a
                href="mailto:pukaluk.adam505@gmail.com"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] border border-white/10 bg-black/70 px-4 text-sm font-semibold text-gray-300 backdrop-blur-xl transition-colors duration-200 hover:border-white/25 hover:bg-black/60 hover:text-white ${focusRing}`}
              >
                <Mail className="size-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
