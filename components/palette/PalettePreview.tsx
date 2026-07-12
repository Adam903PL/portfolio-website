'use client';

import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';
import { DURATION } from '@/lib/motion';
import { Command } from '@/lib/commands';

const LINE = 'rgba(26,23,18,0.16)';

export function PalettePreview({ command }: { command: Command | null }) {
  const prefersReduced = useReducedMotion();

  if (!command) {
    return (
      <div className="flex h-full items-center justify-center p-4 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
        No selection
      </div>
    );
  }

  const { preview } = command;

  return (
    <m.div
      key={command.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReduced ? 0 : DURATION.fast }}
      className="flex h-full flex-col gap-3 p-4"
    >
      {preview.type === 'post' && (
        <>
          <div
            className="relative h-[170px] w-full border bg-sand"
            style={{ borderColor: LINE }}
          >
            <Image
              src={preview.image}
              alt={preview.imageAlt}
              fill
              sizes="300px"
              className="object-contain"
            />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-accent">
            {preview.kicker}
          </div>
          <p className="m-0 text-[13px] leading-[1.55] text-ink-70">
            {preview.excerpt}
          </p>
        </>
      )}
      {preview.type === 'page' && (
        <div
          className="flex h-full flex-col justify-between border p-4"
          style={{ borderColor: LINE }}
        >
          <div>
            <div className="font-serif text-[26px] italic leading-tight text-ink">
              {command.label}
            </div>
            <p className="mt-3 text-[13px] leading-[1.55] text-ink-70">
              {preview.description}
            </p>
          </div>
          <div className="font-mono text-[11px] text-ink-30">
            {preview.path}
          </div>
        </div>
      )}
      {preview.type === 'action' && (
        <div
          className="flex h-full items-center justify-center border p-4 text-center font-mono text-[12px] leading-[1.6] text-ink-70"
          style={{ borderColor: LINE }}
        >
          {preview.detail}
        </div>
      )}
    </m.div>
  );
}
