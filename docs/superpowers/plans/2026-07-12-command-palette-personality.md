# Command Palette + Personality Touches Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a site-wide Ctrl+K command palette plus five personality touches (footer status line, hover text scramble, chaos easter egg, interactive tech marquee, hero age counter) to the portfolio.

**Architecture:** All features are small client leaf components mounted inside existing server components or the root layout. Global features (palette, chaos) mount once in `app/layout.tsx` and communicate with page-level components via custom DOM events (`toggle-palette`, `chaos`, `toggle-age`). No new dependencies; Framer Motion is used through the existing global `MotionProvider` (LazyMotion) with `m.` components.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, framer-motion ^12 (existing).

**Spec:** `docs/superpowers/specs/2026-07-12-command-palette-personality-design.md`

## Global Constraints

- Design system: sharp 1px borders `rgba(26,23,18,0.16)`, paper `#F3EEE2`, ink `#1A1712`, accent `#F5340C`. NO rounded corners, NO shadows, NO glassmorphism, NO blur on new UI.
- No new npm dependencies.
- Animate only transform/opacity. All motion respects reduced motion (`useReducedMotion` from framer-motion or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Em dashes (U+2014) banned in source; use plain hyphens.
- Server components stay server; add `'use client'` only to new leaf components.
- react-doctor must stay 100/100: no unused exports, no component over ~300 lines, no animating layout properties (height/width).
- Every `m.` component works because `MotionProvider` (LazyMotion) is already global in `app/layout.tsx` - do NOT add per-component `LazyMotion` wrappers.
- There is no unit test suite. Per-task verification = `npx tsc --noEmit` (mandatory, build ignores TS errors) + visual check via Playwright MCP at 1920x1080 against the dev server on port 5137. Run `npm run build` and `npx react-doctor@latest` at the end of Tasks 1, 5 and 6.
- Conventional commits enforced by commit-msg hook; pre-commit runs eslint+prettier via lint-staged.

---

### Task 1: Command palette

**Files:**
- Create: `lib/commands.ts`
- Create: `components/palette/CommandPalette.tsx`
- Modify: `components/ui/mini-navbar.tsx` (add Ctrl K button, dispatches `toggle-palette`)
- Modify: `app/layout.tsx` (mount palette)

**Interfaces:**
- Consumes: `blogPosts` from `@/lib/blog-posts` (array of `{ id, title, canonicalPath, ... }`), motion tokens `DURATION`, `EASE_EDITORIAL` from `@/lib/motion`.
- Produces: window events other tasks rely on: dispatching `new Event('chaos')` (Task 4 listens) and `new Event('toggle-age')` (Task 6 listens). Window event `toggle-palette` opens/closes the palette (navbar dispatches it).

Note: the spec mentions jumps to individual projects. Project data lives unexported inside `components/Projects.tsx` and project cards have no anchor ids, so per-project commands are out of scope; the single "Projects" page command covers it. Blog posts DO get individual commands (data is exported from `lib/blog-posts.ts`).

- [ ] **Step 1: Create `lib/commands.ts`**

```ts
import { blogPosts } from '@/lib/blog-posts';

export type Command = {
  id: string;
  label: string;
  hint: string;
  hidden?: boolean;
  action:
    | { type: 'navigate'; href: string }
    | { type: 'copy'; text: string }
    | { type: 'open'; href: string }
    | { type: 'event'; name: string };
};

export function getCommands(): Command[] {
  return [
    { id: 'home', label: 'Home', hint: 'Page', action: { type: 'navigate', href: '/' } },
    { id: 'projects', label: 'Projects', hint: 'Page', action: { type: 'navigate', href: '/projects' } },
    { id: 'blog', label: 'Blog', hint: 'Page', action: { type: 'navigate', href: '/blog' } },
    { id: 'education', label: 'Education', hint: 'Page', action: { type: 'navigate', href: '/education' } },
    { id: 'contact', label: 'Contact', hint: 'Page', action: { type: 'navigate', href: '/contact' } },
    ...blogPosts.map((post) => ({
      id: `post-${post.id}`,
      label: post.title,
      hint: 'Blog post',
      action: { type: 'navigate' as const, href: post.canonicalPath },
    })),
    { id: 'copy-email', label: 'Copy email', hint: 'Action', action: { type: 'copy', text: 'pukaluk.adam505@gmail.com' } },
    { id: 'call', label: 'Call me', hint: 'Action', action: { type: 'open', href: 'tel:+48695031104' } },
    { id: 'github', label: 'Open GitHub', hint: 'Action', action: { type: 'open', href: 'https://github.com/Adam903PL/' } },
    { id: 'linkedin', label: 'Open LinkedIn', hint: 'Action', action: { type: 'open', href: 'https://www.linkedin.com/in/adam-pukaluk-339058298/' } },
    { id: 'chaos', label: 'chaos', hint: '???', hidden: true, action: { type: 'event', name: 'chaos' } },
    { id: 'age', label: 'age', hint: '???', hidden: true, action: { type: 'event', name: 'toggle-age' } },
  ];
}

/** Case-insensitive subsequence match: every query char appears in order in the target. */
export function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let ti = 0;
  for (const ch of q) {
    ti = t.indexOf(ch, ti);
    if (ti === -1) return false;
    ti += 1;
  }
  return true;
}

/** Hidden commands only match when the query equals their label exactly. */
export function filterCommands(commands: Command[], query: string): Command[] {
  const q = query.trim();
  if (!q) return commands.filter((c) => !c.hidden);
  return commands.filter((c) =>
    c.hidden ? c.label === q.toLowerCase() : fuzzyMatch(q, c.label),
  );
}
```

- [ ] **Step 2: Create `components/palette/CommandPalette.tsx`**

```tsx
'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DURATION, EASE_EDITORIAL } from '@/lib/motion';
import { Command, filterCommands, getCommands } from '@/lib/commands';

const LINE = 'rgba(26,23,18,0.28)';

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = useMemo(() => getCommands(), []);
  const results = useMemo(
    () => filterCommands(commands, query),
    [commands, query],
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setSelected(0);
  }, []);

  const run = useCallback(
    (command: Command) => {
      close();
      const { action } = command;
      if (action.type === 'navigate') router.push(action.href);
      if (action.type === 'open') window.open(action.href, '_blank', 'noopener');
      if (action.type === 'copy') void navigator.clipboard.writeText(action.text);
      if (action.type === 'event') window.dispatchEvent(new Event(action.name));
    },
    [close, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') close();
    };
    const onToggle = () => setOpen((v) => !v);
    window.addEventListener('keydown', onKey);
    window.addEventListener('toggle-palette', onToggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('toggle-palette', onToggle);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === 'Enter' && results[selected]) {
      run(results[selected]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
          style={{ background: 'rgba(26,23,18,0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.fast }}
          onClick={close}
        >
          <m.div
            role="dialog"
            aria-label="Command palette"
            className="w-full max-w-[560px] border bg-paper"
            style={{ borderColor: LINE }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.medium, ease: EASE_EDITORIAL }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-3 border-b px-4 py-3.5"
              style={{ borderColor: 'rgba(26,23,18,0.16)' }}
            >
              <span className="font-mono text-[14px] text-accent">&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search..."
                className="w-full bg-transparent font-mono text-[14px] text-ink outline-none placeholder:text-ink-30"
              />
              <span className="font-mono text-[10px] uppercase text-ink-30">esc</span>
            </div>
            <ul className="m-0 max-h-[320px] list-none overflow-y-auto p-0">
              {results.length === 0 && (
                <li className="px-4 py-3.5 font-mono text-[13px] text-ink-40">
                  No results.
                </li>
              )}
              {results.map((cmd, i) => (
                <li key={cmd.id}>
                  <button
                    type="button"
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-mono text-[13px]"
                    style={{
                      background:
                        i === selected ? 'var(--color-ink)' : 'transparent',
                      color:
                        i === selected ? 'var(--color-cream)' : 'var(--color-ink)',
                    }}
                  >
                    <span>{cmd.label}</span>
                    <span
                      className="text-[10px] uppercase tracking-[0.06em]"
                      style={{ opacity: 0.5 }}
                    >
                      {cmd.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Mount in `app/layout.tsx`**

Add import and render next to `MotionProvider` children (inside it):

```tsx
import { CommandPalette } from '@/components/palette/CommandPalette';
```

Inside the existing `<MotionProvider>` block, directly before `<MiniNavbar />`'s parent div closes is NOT needed; render as sibling of MiniNavbar:

```tsx
<MotionProvider>
  <div className="relative z-[2] min-h-screen overflow-x-hidden">
    <MiniNavbar />
    {children}
    <Footer />
  </div>
  <CommandPalette />
</MotionProvider>
```

- [ ] **Step 4: Add navbar trigger button in `components/ui/mini-navbar.tsx`**

In the right-side `div` (`flex items-center gap-4`), before the mobile toggle button, add:

```tsx
<button
  type="button"
  onClick={() => window.dispatchEvent(new Event('toggle-palette'))}
  aria-label="Open command palette"
  className="hidden border px-2.5 py-[7px] font-mono text-[11px] uppercase tracking-[0.04em] text-ink-40 transition-colors hover:border-accent hover:text-ink min-[901px]:inline-block"
  style={{ borderColor: 'rgba(26,23,18,0.28)' }}
>
  Ctrl K
</button>
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` - expected: no output (pass).
Run: `npm run build` - expected: build succeeds.
Playwright (dev server on http://localhost:5137, viewport 1920x1080): press Control+k, palette opens; type "blo", "Blog" highlighted; ArrowDown+Enter navigates; Escape closes; click navbar "Ctrl K" button opens it; type "chaos", the hidden command appears.

- [ ] **Step 6: Commit**

```bash
git add lib/commands.ts components/palette/CommandPalette.tsx components/ui/mini-navbar.tsx app/layout.tsx
git commit -m "feat: add site-wide command palette with keyboard navigation"
```

---

### Task 2: Footer status line

**Files:**
- Create: `components/StatusLine.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `StatusLine` component (no props), rendered inside Footer.

- [ ] **Step 1: Create `components/StatusLine.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Warsaw',
  hour: '2-digit',
  minute: '2-digit',
});

export function StatusLine() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[12px] text-ink-40">
      {time ?? '--:--'} in Lublin - currently building ORBactive
      <span className="ml-1 inline-block h-[12px] w-[7px] animate-[blink_1.2s_steps(1)_infinite] bg-accent align-middle" />
    </span>
  );
}
```

- [ ] **Step 2: Render in `components/Footer.tsx`**

Add `import { StatusLine } from '@/components/StatusLine';` and inside the left `div` (`flex items-center gap-3.5`), after the copyright span, replace that block with a column layout:

```tsx
<div className="flex items-center gap-3.5">
  <span className="flex size-[30px] items-center justify-center bg-ink font-mono text-[13px] font-bold text-cream">
    AP
  </span>
  <span className="flex flex-col gap-0.5">
    <span className="font-mono text-[12px] text-ink-40">
      © 2026 Adam Pukaluk - Lublin, Poland
    </span>
    <StatusLine />
  </span>
</div>
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` - pass.
Playwright: scroll to footer, status line shows `HH:MM in Lublin - currently building ORBactive` with blinking block. No hydration error in console.

- [ ] **Step 4: Commit**

```bash
git add components/StatusLine.tsx components/Footer.tsx
git commit -m "feat: add live Lublin time status line to footer"
```

---

### Task 3: Text scramble on hover

**Files:**
- Create: `components/motion/ScrambleText.tsx`
- Modify: `components/ui/mini-navbar.tsx` (wrap desktop nav link labels)
- Modify: `components/About-Me.tsx`, `components/Skills.tsx`, `components/BlogPreview.tsx` (wrap section eyebrow text)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `ScrambleText({ text: string; className?: string })` client component.

- [ ] **Step 1: Create `components/motion/ScrambleText.tsx`**

```tsx
'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}=+*^?#';
const FRAMES = 10;
const FRAME_MS = 36;

export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = () => {
    if (prefersReduced) return;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    let frame = 0;
    intervalRef.current = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / FRAMES) * text.length);
      if (frame >= FRAMES) {
        window.clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setDisplay(text);
        return;
      }
      setDisplay(
        text
          .split('')
          .map((ch, i) =>
            ch === ' ' || i < settled
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(''),
      );
    }, FRAME_MS);
  };

  return (
    <span className={className} onMouseEnter={scramble}>
      {display}
    </span>
  );
}
```

- [ ] **Step 2: Apply to desktop nav links in `components/ui/mini-navbar.tsx`**

Add `import { ScrambleText } from '@/components/motion/ScrambleText';` and in the desktop nav map, replace `{link.label}` with:

```tsx
<ScrambleText text={link.label} />
```

(Do NOT change the mobile menu links.)

- [ ] **Step 3: Apply to section eyebrows**

In `components/About-Me.tsx` replace the eyebrow text content:

```tsx
<div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
  <ScrambleText text="/ 01 - About" />
</div>
```

In `components/Skills.tsx` find the eyebrow (`/ 02 - Stack`) and wrap identically with `<ScrambleText text="/ 02 - Stack" />`. In `components/BlogPreview.tsx` wrap `/ 03 - Writing` with `<ScrambleText text="/ 03 - Writing" />`. Add the import to each file.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` - pass.
Playwright: hover "PROJECTS" nav link - characters briefly scramble then settle; hover "/ 01 - About" eyebrow - same. Layout does not shift (mono font).

- [ ] **Step 5: Commit**

```bash
git add components/motion/ScrambleText.tsx components/ui/mini-navbar.tsx components/About-Me.tsx components/Skills.tsx components/BlogPreview.tsx
git commit -m "feat: add terminal-style text scramble on nav links and eyebrows"
```

---

### Task 4: Chaos easter egg

**Files:**
- Create: `components/ChaosListener.tsx`
- Modify: `app/layout.tsx` (mount listener)
- Modify: `app/globals.css` (chaos styles + keyframe)
- Modify: `components/Hero.tsx` (add `hero-portrait` class hook)
- Modify: `components/TechMarquee.tsx` (add `marquee-track` class hook)

**Interfaces:**
- Consumes: window event `chaos` (dispatched by the palette from Task 1).
- Produces: `data-chaos` attribute on `<html>` for ~4s; CSS reacts to it.

- [ ] **Step 1: Create `components/ChaosListener.tsx`**

```tsx
'use client';

import { useEffect, useRef } from 'react';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
const CHAOS_MS = 4000;

export function ChaosListener() {
  const progress = useRef(0);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    const trigger = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      document.documentElement.setAttribute('data-chaos', 'true');
      if (timeout.current) window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => {
        document.documentElement.removeAttribute('data-chaos');
      }, CHAOS_MS);
    };

    const onKey = (e: KeyboardEvent) => {
      progress.current =
        e.key === KONAMI[progress.current] ? progress.current + 1 : 0;
      if (progress.current === KONAMI.length) {
        progress.current = 0;
        trigger();
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('chaos', trigger);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('chaos', trigger);
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  return null;
}
```

- [ ] **Step 2: Mount in `app/layout.tsx`**

```tsx
import { ChaosListener } from '@/components/ChaosListener';
```

Render `<ChaosListener />` as a sibling of `<CommandPalette />` inside `MotionProvider`.

- [ ] **Step 3: Add class hooks**

In `components/Hero.tsx`, on the portrait wrapper div (`className="relative overflow-hidden border bg-sand"`), add class `hero-portrait`:

```tsx
<div
  className="hero-portrait relative overflow-hidden border bg-sand"
  style={{ borderColor: 'rgba(26,23,18,0.16)' }}
>
```

In `components/TechMarquee.tsx`, add class `marquee-track` to the animated div:

```tsx
<div className="marquee-track flex w-max animate-[marq_32s_linear_infinite] font-mono text-[14px] tracking-[0.02em] text-cream">
```

- [ ] **Step 4: Add CSS to `app/globals.css`** (before the reduced-motion block)

```css
/* Chaos easter egg: active while <html data-chaos> is set (~4s) */
@keyframes chaosSpin {
  to {
    transform: rotate(360deg);
  }
}
html[data-chaos] .marquee-track {
  animation-duration: 3s !important;
}
html[data-chaos] .hero-portrait {
  animation: chaosSpin 1s cubic-bezier(0.22, 1, 0.36, 1) 1;
}
html[data-chaos] h1,
html[data-chaos] h2 {
  color: var(--color-accent) !important;
}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` - pass.
Playwright: on home page press ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a - headings turn orange, marquee speeds up, portrait spins once; after ~4s everything reverts. Also: open palette, type "chaos", Enter - same effect.

- [ ] **Step 6: Commit**

```bash
git add components/ChaosListener.tsx app/layout.tsx app/globals.css components/Hero.tsx components/TechMarquee.tsx
git commit -m "feat: add konami-code chaos easter egg"
```

---

### Task 5: Interactive tech marquee

**Files:**
- Modify: `components/TechMarquee.tsx` (items become links, hover pauses)
- Modify: `components/Skills.tsx` (read `tech` search param, pre-select category)
- Modify: `app/globals.css` (hover pause rule)

**Interfaces:**
- Consumes: `marquee-track` class added in Task 4 (if Task 4 not yet done, add the class in this task instead).
- Produces: URL contract `/?tech=<lowercased skill name>#skills` read by Skills.

- [ ] **Step 1: Make marquee items links in `components/TechMarquee.tsx`**

Replace the `Strip` component:

```tsx
function Strip() {
  return (
    <span className="flex">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-[26px] px-[26px]"
        >
          <a
            href={`/?tech=${encodeURIComponent(item.toLowerCase())}#skills`}
            className="text-cream no-underline transition-colors hover:text-accent"
          >
            {item}
          </a>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </span>
  );
}
```

Add a `marquee-wrap` class to the outer div (`relative z-[2] mt-6 overflow-hidden ...`).

- [ ] **Step 2: Add hover pause to `app/globals.css`**

```css
.marquee-wrap:hover .marquee-track {
  animation-play-state: paused;
}
```

- [ ] **Step 3: Pre-select category in `components/Skills.tsx`**

The component has `const [filter, setFilter] = useState('All')` (line ~373) and `skills: Skill[]` with `{ name, cat }`. Add after the useState:

```tsx
useEffect(() => {
  const tech = new URLSearchParams(window.location.search).get('tech');
  if (!tech) return;
  const match = skills.find((s) => s.name.toLowerCase() === tech);
  if (match) setFilter(match.cat);
}, []);
```

Add `useEffect` to the existing React import. Also confirm the Skills section root has `id="skills"` so the `#skills` hash scrolls to it; if the id lives on a parent in `app/page.tsx`, keep it as-is; if no `id="skills"` exists anywhere, add it to the Skills section wrapper.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` - pass.
Playwright: hover the marquee - scrolling pauses, item turns accent on hover; click "React" - lands on `/?tech=react#skills`, Skills section scrolled into view with "Frameworks" category active (React's `cat` is Frameworks - verify actual category in data and assert that one).

- [ ] **Step 5: Commit**

```bash
git add components/TechMarquee.tsx components/Skills.tsx app/globals.css
git commit -m "feat: make tech marquee interactive with skills filter deep links"
```

---

### Task 6: Age counter easter egg

**Files:**
- Create: `components/AgeCounter.tsx`
- Modify: `components/Hero.tsx` (replace static "Est. 2009" eyebrow item)

**Interfaces:**
- Consumes: window event `toggle-age` (dispatched by palette command `age` from Task 1).
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Create `components/AgeCounter.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

const BIRTH = new Date('2009-01-01T00:00:00Z').getTime();
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export function AgeCounter() {
  const [live, setLive] = useState(false);
  const [age, setAge] = useState('');
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const toggle = () => setLive((v) => !v);
    window.addEventListener('toggle-age', toggle);
    return () => window.removeEventListener('toggle-age', toggle);
  }, []);

  useEffect(() => {
    if (!live) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }
    const update = () =>
      setAge(((Date.now() - BIRTH) / YEAR_MS).toFixed(8));
    update();
    intervalRef.current = window.setInterval(update, 50);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [live]);

  return (
    <button
      type="button"
      onClick={() => setLive((v) => !v)}
      className="cursor-pointer border-none bg-transparent p-0 font-mono text-[13px] uppercase tracking-[0.08em] text-ink-40"
      aria-label="Toggle live age counter"
    >
      {live ? `${age} years` : 'Est. 2009'}
    </button>
  );
}
```

- [ ] **Step 2: Use in `components/Hero.tsx`**

The eyebrow array is `const eyebrow = ['Full-Stack Developer', 'Lublin, Poland', 'Est. 2009']`. Change it to drop the last item and render `AgeCounter` explicitly:

```tsx
import { AgeCounter } from '@/components/AgeCounter';

const eyebrow = ['Full-Stack Developer', 'Lublin, Poland'];
```

And in the eyebrow JSX (inside the existing `<Reveal>` wrapper), after the map, append:

```tsx
<span className="text-ink-10">/</span>
<AgeCounter />
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` - pass.
Run: `npm run build` - pass.
Run: `npx react-doctor@latest` - expected 100/100, "No issues found".
Playwright: click "Est. 2009" - live ticking `16.xxxxxxxx years` appears and updates; click again - reverts. Open palette, type "age", Enter - same toggle. Full-page screenshots of `/`, `/projects`, `/blog`, `/education`, `/contact` look correct at 1920x1080.

- [ ] **Step 4: Commit**

```bash
git add components/AgeCounter.tsx components/Hero.tsx
git commit -m "feat: add live age counter easter egg to hero eyebrow"
```
