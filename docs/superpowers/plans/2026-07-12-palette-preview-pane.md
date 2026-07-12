# Palette Preview Pane Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Raycast-style preview pane to the command palette showing a data-driven preview of the highlighted result.

**Architecture:** Extend the `Command` type in `lib/commands.ts` with a required discriminated `preview` field (post/page/action) built from existing data. A new client leaf `components/palette/PalettePreview.tsx` renders the preview per type; `CommandPalette.tsx` widens on desktop and gains a two-column grid (list left, pane right). No behavior changes to filtering, keyboard handling, or execution.

**Tech Stack:** Next.js 16 App Router, React 19, framer-motion ^12 (existing, `m.` via global MotionProvider - never add LazyMotion wrappers), next/image with static imports.

**Spec:** `docs/superpowers/specs/2026-07-12-palette-preview-pane-design.md`
(One deviation, controller-approved: `preview` is REQUIRED on `Command`, not optional - every command defines one, so the pane only handles `null` for the empty-results case.)

## Global Constraints

- Design system: sharp 1px hairlines `rgba(26,23,18,0.16)`, cream/paper/ink/accent palette, Space Mono labels, Instrument Serif italic accents. NO rounded corners, NO shadows, NO glow, NO blur.
- No new npm dependencies. Animate only transform/opacity; reduced motion respected via `useReducedMotion` from framer-motion.
- No em dashes (U+2014) in source; plain hyphens. NO eslint-disable comments - restructure instead.
- react-doctor stays 100/100: no unused exports, components under ~300 lines.
- Content photos: `object-contain` on a `bg-sand` box (no cropping).
- Desktop breakpoint `min-[901px]:`. Below it the palette is unchanged (single column, no pane).
- No unit test suite. Verification: `npx tsc --noEmit` (mandatory) + `npx eslint <changed files>` (no errors/warnings). Run `npm run build` + `npx react-doctor@latest` at the end of Task 2.
- Pre-commit hooks run eslint+prettier (~30s per commit); commit-msg enforces conventional commits.

---

### Task 1: Preview data model in lib/commands.ts

**Files:**
- Modify: `lib/commands.ts`

**Interfaces:**
- Consumes: `blogPosts` from `@/lib/blog-posts` (entries have `id`, `title`, `kicker`, `excerpt`, `canonicalPath`, `image: StaticImageData`, `imageAlt`).
- Produces: exported type `CommandPreview` (discriminated union on `type: 'post' | 'page' | 'action'`) and `Command.preview: CommandPreview` (required). Task 2 renders these.

- [ ] **Step 1: Add the CommandPreview type and extend Command**

Read `lib/commands.ts` first. At the top, add the type import and the new exported type; make `preview` a required field on `Command`:

```ts
import type { StaticImageData } from 'next/image';
import { blogPosts } from '@/lib/blog-posts';

export type CommandPreview =
  | {
      type: 'post';
      image: StaticImageData;
      imageAlt: string;
      kicker: string;
      excerpt: string;
    }
  | { type: 'page'; path: string; description: string }
  | { type: 'action'; detail: string };

export type Command = {
  id: string;
  label: string;
  hint: string;
  hidden?: boolean;
  preview: CommandPreview;
  action:
    | { type: 'navigate'; href: string }
    | { type: 'copy'; text: string }
    | { type: 'open'; href: string }
    | { type: 'event'; name: string };
};
```

- [ ] **Step 2: Add a preview to every command in getCommands()**

Add these exact `preview` values to the existing entries (keep ids, labels, hints, actions unchanged):

```ts
// home
preview: {
  type: 'page',
  path: '/',
  description:
    'Hero, stack, about and latest writing - the whole story on one page.',
},
// projects
preview: {
  type: 'page',
  path: '/projects',
  description:
    'Things I have shipped & broken - 15+ projects across web, mobile and AI.',
},
// blog
preview: {
  type: 'page',
  path: '/blog',
  description:
    'Writing & happenings - events, hackathons and talks from LinkedIn.',
},
// education
preview: {
  type: 'page',
  path: '/education',
  description:
    'From LEGO logic to full-stack product work - the learning path.',
},
// contact
preview: {
  type: 'page',
  path: '/contact',
  description:
    'Email, phone, socials and a form that lands straight in my inbox.',
},
```

Blog post map gains:

```ts
...blogPosts.map((post) => ({
  id: `post-${post.id}`,
  label: post.title,
  hint: 'Blog post',
  preview: {
    type: 'post' as const,
    image: post.image,
    imageAlt: post.imageAlt,
    kicker: post.kicker,
    excerpt: post.excerpt,
  },
  action: { type: 'navigate' as const, href: post.canonicalPath },
})),
```

Actions and hidden commands:

```ts
// copy-email
preview: {
  type: 'action',
  detail: 'Copies pukaluk.adam505@gmail.com to your clipboard.',
},
// call
preview: {
  type: 'action',
  detail: 'Opens your phone app with +48 695 031 104.',
},
// github
preview: {
  type: 'action',
  detail: 'Opens github.com/Adam903PL in a new tab.',
},
// linkedin
preview: {
  type: 'action',
  detail: 'Opens my LinkedIn profile in a new tab.',
},
// chaos AND age (both hidden commands get the mystery card)
preview: { type: 'action', detail: '???' },
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` - expected: no output (pass; the required field forces every entry to have a preview).
Run: `npx eslint lib/commands.ts` - expected: no errors/warnings.

- [ ] **Step 4: Commit**

```bash
git add lib/commands.ts
git commit -m "feat: add preview data to palette commands"
```

(Append trailer line: `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`)

---

### Task 2: PalettePreview component + two-column palette layout

**Files:**
- Create: `components/palette/PalettePreview.tsx`
- Modify: `components/palette/CommandPalette.tsx`

**Interfaces:**
- Consumes: `Command` and `CommandPreview` from `@/lib/commands` (Task 1: `preview` is required, union of `post`/`page`/`action`); `DURATION` from `@/lib/motion`; existing palette state `results: Command[]` and `selected: number`.
- Produces: `PalettePreview({ command: Command | null })` component.

- [ ] **Step 1: Create `components/palette/PalettePreview.tsx`**

```tsx
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
```

(Note: the `key={command.id}` on the `m.div` remounts it per highlighted command, replaying the opacity fade - the crossfade the spec asks for, with duration 0 under reduced motion.)

- [ ] **Step 2: Widen the palette and add the grid in `components/palette/CommandPalette.tsx`**

Read the file first. Three changes:

(a) Add the import:

```tsx
import { PalettePreview } from '@/components/palette/PalettePreview';
```

(b) On the panel `m.div` (`role="dialog"`), change the width class:

```tsx
className="w-full max-w-[560px] border bg-paper min-[901px]:max-w-[840px]"
```

(c) Wrap the existing `<ul>` (keep the `ul` and ALL its children exactly as they are, including `ref={listRef}` and the `no-scrollbar` class) in a grid with the pane column:

```tsx
<div className="min-[901px]:grid min-[901px]:grid-cols-[1.2fr_1fr]">
  <ul
    ref={listRef}
    className="no-scrollbar m-0 max-h-[320px] list-none overflow-y-auto p-0"
  >
    {/* ...existing children unchanged... */}
  </ul>
  <div
    className="hidden border-l min-[901px]:block"
    style={{ borderColor: LINE_SOFT }}
  >
    <PalettePreview command={results[selected] ?? null} />
  </div>
</div>
```

Where `LINE_SOFT` is a new module constant next to the existing `LINE`:

```tsx
const LINE_SOFT = 'rgba(26,23,18,0.16)';
```

- [ ] **Step 3: Verify build and quality gates**

Run: `npx tsc --noEmit` - pass.
Run: `npx eslint components/palette/PalettePreview.tsx components/palette/CommandPalette.tsx` - no errors/warnings, no eslint-disable comments.
Run: `npm run build` - succeeds.
Run: `npx react-doctor@latest` - "No issues found" (100/100). CommandPalette.tsx must remain under ~300 lines.
If a dev server runs on http://localhost:5137 (do not start or kill servers), optionally via Playwright MCP at 1920x1080: Ctrl+K, arrow through results - blog entries show photo + kicker + excerpt, pages show the serif index card with path, actions show the detail sentence, typing `chaos` shows "???"; empty query then a garbage query shows "No selection" in the pane; resize to 800px wide - single column, no pane.

- [ ] **Step 4: Commit**

```bash
git add components/palette/PalettePreview.tsx components/palette/CommandPalette.tsx
git commit -m "feat: add preview pane to command palette"
```

(Append trailer line: `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`)
