# Scroll Navigation UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reading progress bar + read-time label to blog posts, and a numbered click-to-jump section rail to the home page.

**Architecture:** Two independent client leaf components. `ReadingProgress` uses framer-motion `useScroll` mapped to a `scaleX` transform on a fixed 2px accent bar, mounted only in the blog post page (which stays a server component and also computes the read time). `SectionRail` uses one IntersectionObserver over the five existing home-page section ids and renders fixed numbered ticks on the right edge, mounted only in `app/page.tsx`.

**Tech Stack:** Next.js 16 App Router, React 19, framer-motion ^12 (existing, via the global `MotionProvider` LazyMotion - use `m.` components, never add LazyMotion wrappers).

**Spec:** `docs/superpowers/specs/2026-07-12-scroll-navigation-ux-design.md`

## Global Constraints

- Design system: sharp hairlines, cream/ink/accent palette, Space Mono labels. NO rounded corners, NO shadows, NO glow, NO blur on new UI.
- No new npm dependencies.
- Animate only transform/opacity. Reduced motion respected via `useReducedMotion` from framer-motion.
- No em dashes (U+2014) in source; plain hyphens. NO eslint-disable comments - restructure code instead.
- Server components stay server (`app/blog/[slug]/page.tsx`, `app/page.tsx` get no 'use client').
- react-doctor must stay 100/100: no unused exports, components under ~300 lines, no layout-property animation.
- No unit test suite. Per-task verification: `npx tsc --noEmit` (mandatory - build ignores TS errors) and `npx eslint <changed tsx files>` (no errors/warnings). Run `npm run build` + `npx react-doctor@latest` at the end of Task 2.
- Pre-commit hooks run eslint+prettier via lint-staged; commit-msg enforces conventional commits. Commits can take ~30s due to hooks.

---

### Task 1: Reading progress bar + read time on blog posts

**Files:**
- Create: `components/motion/ReadingProgress.tsx`
- Modify: `components/motion/BlogPostHero.tsx` (new optional `readTime` prop rendered in the tags row)
- Modify: `app/blog/[slug]/page.tsx` (compute read time, mount both)

**Interfaces:**
- Consumes: framer-motion `useScroll`; existing `BlogPostHero` props `{ backHref?, kicker?, title, excerpt, tags? }`; `post.content: string[]` from `lib/blog-posts.ts`.
- Produces: `ReadingProgress` component (no props). `BlogPostHero` gains `readTime?: string`.

- [ ] **Step 1: Create `components/motion/ReadingProgress.tsx`**

Note on placement: the bar sits at the very top of the viewport (`top-0`), above the sticky navbar (`z-[60]` vs the navbar's z-40). This is the robust variant of the spec's "under the navbar" intent - the navbar height is not a constant we can safely hardcode, and a top-of-viewport progress bar is the established pattern.

```tsx
'use client';

import { m, useScroll } from 'framer-motion';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

(`scaleX` bound to the `useScroll` motion value is transform-only and tracks scroll position in both normal and reduced-motion modes - it is an indicator, not decoration, so no reduced-motion gate is added.)

- [ ] **Step 2: Add `readTime` prop to `components/motion/BlogPostHero.tsx`**

Read the file first. Add `readTime` to the props interface and destructuring:

```tsx
interface BlogPostHeroProps {
  backHref?: string;
  kicker?: string;
  title: string;
  excerpt: string;
  tags?: string[];
  readTime?: string;
}
```

Then change the tags block so the row renders when there are tags OR a read time, with the read time first:

```tsx
{(tags.length > 0 || readTime) && (
  <m.div
    variants={motionSafe.fadeSlideUp}
    className="mt-6 flex flex-wrap items-center gap-3"
  >
    {readTime && (
      <span className="font-mono text-[11px] text-ink-30">{readTime}</span>
    )}
    {tags.map((tag) => (
      <span key={tag} className="font-mono text-[11px] text-accent">
        #{tag}
      </span>
    ))}
  </m.div>
)}
```

- [ ] **Step 3: Mount in `app/blog/[slug]/page.tsx`**

Read the file first. Add the import:

```tsx
import { ReadingProgress } from '@/components/motion/ReadingProgress';
```

Inside `BlogPostPage`, after the `if (!post) notFound();` guard, compute the read time (200 wpm, minimum 1 minute):

```tsx
const words = post.content.join(' ').split(/\s+/).filter(Boolean).length;
const readTime = `~${Math.max(1, Math.ceil(words / 200))} min read`;
```

Render `<ReadingProgress />` as the first child inside `<main>` (before `<article>`), and pass the prop to the hero:

```tsx
<BlogPostHero
  kicker={post.kicker}
  title={post.title}
  excerpt={post.excerpt}
  tags={post.tags}
  readTime={readTime}
/>
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` - expected: no output (pass).
Run: `npx eslint components/motion/ReadingProgress.tsx components/motion/BlogPostHero.tsx` - expected: no errors/warnings.
If a dev server is running on http://localhost:5137 (do not start or kill servers), optionally confirm via Playwright MCP: open `/blog/it-unplugged-2026`, the accent bar at the viewport top grows as you scroll and reaches full width at the bottom; `~N min read` appears before the #tags.

- [ ] **Step 5: Commit**

```bash
git add components/motion/ReadingProgress.tsx components/motion/BlogPostHero.tsx "app/blog/[slug]/page.tsx"
git commit -m "feat: add reading progress bar and read time to blog posts"
```

(Append trailer line: `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`)

---

### Task 2: Home page section rail

**Files:**
- Create: `components/SectionRail.tsx`
- Modify: `app/page.tsx` (mount)

**Interfaces:**
- Consumes: existing section ids on the home page: `#hero` (components/Hero.tsx), `#about` (components/About-Me.tsx), `#skills` (components/Skills.tsx), `#writing` (components/BlogPreview.tsx), `#contact` (components/ProjectCTA.tsx). Verify each id exists before finishing; if one is missing, add it to that component's section root element.
- Produces: `SectionRail` component (no props), mounted once on the home page.

- [ ] **Step 1: Create `components/SectionRail.tsx`**

```tsx
'use client';

import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', num: '00', label: 'Intro' },
  { id: 'about', num: '01', label: 'About' },
  { id: 'skills', num: '02', label: 'Stack' },
  { id: 'writing', num: '03', label: 'Writing' },
  { id: 'contact', num: '04', label: 'Contact' },
];

export function SectionRail() {
  const [active, setActive] = useState('hero');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section becomes active when it crosses the middle 10% band of
      // the viewport, so exactly one section wins at a time.
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <m.nav
      aria-label="Section navigation"
      className="fixed right-[18px] top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 min-[901px]:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: prefersReduced ? 0 : 0.8,
        duration: prefersReduced ? 0 : 0.5,
      }}
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === active;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => jump(section.id)}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? 'true' : undefined}
            className="relative flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 font-mono text-[10px] uppercase tracking-[0.06em]"
            style={{
              color: isActive ? 'var(--color-accent)' : 'var(--color-ink-30)',
            }}
          >
            <span
              className="pointer-events-none absolute right-full mr-2 whitespace-nowrap transition-opacity duration-200"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              {section.label}
            </span>
            <span>{section.num}</span>
            <span
              className="inline-block h-px w-[14px]"
              style={{ background: 'currentColor' }}
            />
          </button>
        );
      })}
    </m.nav>
  );
}
```

(The label is absolutely positioned (`right-full`) so its fade never reflows the rail. `setActive` is called inside the IntersectionObserver callback - an event callback, not an effect body - so the `react-hooks/set-state-in-effect` lint rule is not triggered.)

- [ ] **Step 2: Mount in `app/page.tsx`**

Read the file first. Add the import:

```tsx
import { SectionRail } from '@/components/SectionRail';
```

Render `<SectionRail />` as the first element inside the page's returned fragment/wrapper (position in JSX does not matter for a fixed element; first keeps it discoverable).

- [ ] **Step 3: Verify section ids**

Run: `grep -rn "id=\"hero\"\|id=\"about\"\|id=\"skills\"\|id=\"writing\"\|id=\"contact\"" components/`
Expected: one match for each of the five ids (Hero.tsx, About-Me.tsx, Skills.tsx, BlogPreview.tsx, ProjectCTA.tsx). If any is missing, add the id to that component's `<section>` root.

- [ ] **Step 4: Verify build and quality gates**

Run: `npx tsc --noEmit` - pass.
Run: `npx eslint components/SectionRail.tsx app/page.tsx` - no errors/warnings.
Run: `npm run build` - succeeds.
Run: `npx react-doctor@latest` - "No issues found" (100/100).
If a dev server runs on http://localhost:5137, optionally via Playwright MCP at 1920x1080: rail visible at right edge, `00` accent-highlighted at top with "Intro" label, scrolling to Skills highlights `02 Stack`, clicking `04` scrolls to the contact CTA. Resize to 800px wide: rail hidden.

- [ ] **Step 5: Commit**

```bash
git add components/SectionRail.tsx app/page.tsx
git commit -m "feat: add numbered section rail navigation to home page"
```

(Append trailer line: `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`)
