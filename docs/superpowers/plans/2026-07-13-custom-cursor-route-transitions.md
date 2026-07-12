# Custom Cursor + Route Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an inverting custom cursor dot (grows over interactive elements, shows "READ POST" / "VIEW PROJECT" labels over cards) and a fade-up route transition on every navigation.

**Architecture:** `CustomCursor` is a client leaf mounted in the root layout that moves two fixed DOM elements (dot + label) via CSS variables written directly through refs on pointer events - zero React re-renders. Hover growth uses event delegation (`closest('a, button, [role="button"]')`); labels are opt-in via `data-cursor-label` attributes on card links. Route transitions use `app/template.tsx` (App Router remounts templates per navigation) wrapping children in a framer-motion fade+slide.

**Tech Stack:** Next.js 16 App Router, React 19, framer-motion ^12 (existing, `m.` via global MotionProvider), plain DOM APIs for the cursor.

**Spec:** `docs/superpowers/specs/2026-07-13-custom-cursor-route-transitions-design.md`

## Global Constraints

- No new npm dependencies. No em dashes (U+2014) in source. NO eslint-disable comments - restructure instead (the cursor uses ref-based DOM writes precisely to avoid set-state-in-effect issues).
- Touch devices completely unaffected: cursor hiding scoped to `@media (pointer: fine)`; custom elements `display: none` on `pointer: coarse`; component skips listeners when `matchMedia('(pointer: coarse)')` matches.
- Reduced motion: cursor size transition disabled via CSS (position follow is instant, never animated - fine); route transition duration 0 via `useReducedMotion`.
- Server components stay server (`app/layout.tsx` mounts the client leaf; `app/template.tsx` is client but passes server-rendered children through).
- react-doctor stays 100/100: no unused exports, no component over ~300 lines. Dot circle shape (border-radius) is an owner-approved exception to the no-rounded-corners rule.
- No unit test suite. Verification: `npx tsc --noEmit` + `npx eslint <changed files>`; `npm run build` + `npx react-doctor@latest` at the end of Task 2.
- Pre-commit hooks run eslint+prettier (~30s); commit-msg enforces conventional commits.

---

### Task 1: CustomCursor component + CSS + mount

**Files:**
- Create: `components/cursor/CustomCursor.tsx`
- Modify: `app/globals.css` (cursor styles, before the prefers-reduced-motion block)
- Modify: `app/layout.tsx` (mount)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: global behavior - dot grows over `a`/`button`/`[role="button"]`; any element with a `data-cursor-label="..."` attribute (Task 2 adds them) shows that text below the cursor. CSS classes `.custom-cursor`, `.custom-cursor-label`, html class `has-custom-cursor`.

- [ ] **Step 1: Create `components/cursor/CustomCursor.tsx`**

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      dot.style.setProperty('--cx', x);
      dot.style.setProperty('--cy', y);
      label.style.setProperty('--cx', x);
      label.style.setProperty('--cy', y);
      dot.style.opacity = '1';
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const interactive = target?.closest('a, button, [role="button"]');
      if (interactive) {
        dot.setAttribute('data-variant', 'hover');
      } else {
        dot.removeAttribute('data-variant');
      }

      const labelled = target?.closest('[data-cursor-label]');
      const text = labelled?.getAttribute('data-cursor-label') ?? '';
      label.textContent = text;
      label.setAttribute('data-show', text ? 'true' : 'false');
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      label.setAttribute('data-show', 'false');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="custom-cursor"
        style={{ opacity: 0 }}
      />
      <div ref={labelRef} aria-hidden className="custom-cursor-label" />
    </>
  );
}
```

(The dot starts at `opacity: 0` and only appears on the first pointer move, so it never sits at -100px or flashes on load. All hover state is written directly to DOM attributes through refs - no React state, no re-renders, no lint conflicts.)

- [ ] **Step 2: Add cursor CSS to `app/globals.css`**

Read the file first. Insert this block BEFORE the `@media (prefers-reduced-motion: reduce)` block at the end:

```css
/* Custom cursor: white dot + label inverted against the page via
   mix-blend-difference. Fine pointers only; touch keeps the native cursor. */
@media (pointer: fine) {
  html.has-custom-cursor,
  html.has-custom-cursor * {
    cursor: none !important;
  }
}
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: #fff;
  mix-blend-mode: difference;
  pointer-events: none;
  transform: translate3d(var(--cx, -100px), var(--cy, -100px), 0)
    translate(-50%, -50%);
  transition:
    width 0.28s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.28s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.2s;
  will-change: transform;
}
.custom-cursor[data-variant='hover'] {
  width: 44px;
  height: 44px;
}
.custom-cursor-label {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  pointer-events: none;
  white-space: nowrap;
  transform: translate3d(var(--cx, -100px), var(--cy, -100px), 0)
    translate(-50%, 92px);
  font-family: var(--font-space-mono), monospace;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #fff;
  mix-blend-mode: difference;
  opacity: 0;
  transition: opacity 0.2s;
}
.custom-cursor-label[data-show='true'] {
  opacity: 1;
}
@media (pointer: coarse) {
  .custom-cursor,
  .custom-cursor-label {
    display: none;
  }
}
```

(No extra reduced-motion rule needed: the existing global `prefers-reduced-motion` block already collapses all transition durations, which kills the size transition while the var-driven position keeps working.)

- [ ] **Step 3: Mount in `app/layout.tsx`**

Read the file first. Add the import:

```tsx
import { CustomCursor } from '@/components/cursor/CustomCursor';
```

Render `<CustomCursor />` inside `MotionProvider`, as a sibling next to `<CommandPalette />` and `<ChaosListener />`.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` - pass.
Run: `npx eslint components/cursor/CustomCursor.tsx` - no errors/warnings.
If a dev server is running on http://localhost:5137 (do not start or kill servers), optionally via Playwright MCP: move the mouse - a small dark dot follows (white dot inverted on cream); hover a nav link - it grows; move over the dark CTA section - the dot appears light. Note: Playwright's synthetic pointer may not fire `pointermove` visibly in headless screenshots; verifying attributes via `browser_evaluate` (dispatching PointerEvent and reading `data-variant`) is acceptable.

- [ ] **Step 5: Commit**

```bash
git add components/cursor/CustomCursor.tsx app/globals.css app/layout.tsx
git commit -m "feat: add inverting custom cursor with hover growth and labels"
```

(Append trailer line: `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`)

---

### Task 2: Cursor labels on cards + route transition template

**Files:**
- Modify: `app/blog/page.tsx` (2 links: featured + grid cards)
- Modify: `components/BlogPreview.tsx` (card links)
- Modify: `components/Projects.tsx` (ProjectCard root)
- Create: `app/template.tsx`

**Interfaces:**
- Consumes: Task 1's convention - `data-cursor-label="..."` on any element shows that text at the cursor; `DURATION`, `EASE_EDITORIAL` from `@/lib/motion`.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add labels in `app/blog/page.tsx`**

Read the file first. Two changes:

(a) The featured post `<Link href={featured.canonicalPath} ...>` (the one with `className="group block border bg-paper ..."`) gains the attribute:

```tsx
data-cursor-label="Read post"
```

(b) The grid card `<Link href={post.canonicalPath} ...>` inside the `rest.map(...)` gains the same attribute:

```tsx
data-cursor-label="Read post"
```

- [ ] **Step 2: Add labels in `components/BlogPreview.tsx`**

Read the file first. The card `<Link href={post.canonicalPath} className="group flex w-full flex-col border bg-paper ...">` inside `posts.map(...)` gains:

```tsx
data-cursor-label="Read post"
```

- [ ] **Step 3: Add label in `components/Projects.tsx`**

Read the file first. In `function ProjectCard(...)` (around line 312), the root element is:

```tsx
<m.div
  className="flex flex-col border bg-paper transition-colors hover:border-accent"
  style={{ borderColor: LINE }}
  whileHover={hoverLift}
>
```

Add the attribute to that root `m.div`:

```tsx
<m.div
  className="flex flex-col border bg-paper transition-colors hover:border-accent"
  style={{ borderColor: LINE }}
  whileHover={hoverLift}
  data-cursor-label="View project"
>
```

(The label shows while hovering anywhere on the card; the dot's growth still comes only from real links/buttons inside it - intended.)

- [ ] **Step 4: Create `app/template.tsx`**

```tsx
'use client';

import { m, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { DURATION, EASE_EDITORIAL } from '@/lib/motion';

export default function Template({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0 : DURATION.medium,
        ease: EASE_EDITORIAL,
      }}
    >
      {children}
    </m.div>
  );
}
```

(App Router remounts `template.tsx` on every navigation, replaying the entrance. The navbar and footer live in `layout.tsx` outside the template, so they do not re-animate. Children pass through, so page content stays server-rendered.)

- [ ] **Step 5: Verify build and quality gates**

Run: `npx tsc --noEmit` - pass.
Run: `npx eslint app/template.tsx app/blog/page.tsx components/BlogPreview.tsx components/Projects.tsx` - no errors/warnings.
Run: `npm run build` - succeeds.
Run: `npx react-doctor@latest` - "No issues found" (100/100).
If a dev server runs on http://localhost:5137, optionally via Playwright MCP at 1920x1080: hover a blog card on `/blog` - "READ POST" appears under the dot; hover a project card on `/projects` - "VIEW PROJECT"; click Blog in the navbar from home - the blog page content fades and slides up while the navbar stays put.

- [ ] **Step 6: Commit**

```bash
git add app/blog/page.tsx components/BlogPreview.tsx components/Projects.tsx app/template.tsx
git commit -m "feat: add cursor labels to cards and fade-up route transitions"
```

(Append trailer line: `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`)
