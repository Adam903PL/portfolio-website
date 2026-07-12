# Scroll Navigation UX: Reading Progress + Home Section Rail - Design Spec

Date: 2026-07-12
Status: Approved by owner

## Goal

Two scroll-oriented UX features: (1) a reading progress bar plus read-time label on blog posts, and (2) an editorial numbered section rail on the home page showing the current section and allowing click-to-jump navigation.

Decisions from brainstorming: blog posts have no section headings (flat paragraphs; '#' lines are hashtag footers), so there is NO table of contents - progress bar plus read time only (option A1). Rail style is numbered ticks matching the site's eyebrow numbering (option C1). Rail is home page only, desktop only.

## Constraints

- Design system "mono-glass editorial": sharp hairlines, cream/ink/accent palette, Space Mono for labels. No rounded corners, no shadows, no glow, no blur.
- No new dependencies. Framer Motion via existing global MotionProvider (`m.` components, `useScroll`).
- Animate only transform/opacity. Reduced motion respected (`useReducedMotion`).
- No em dashes (U+2014) in source. No eslint-disable comments (restructure instead).
- Server components stay server; new features are small client leaves.
- react-doctor must stay 100/100 (no unused exports, components under ~300 lines, no layout-property animation).
- Desktop breakpoint `min-[901px]:`.

## 1. Reading progress bar (blog posts)

**File:** `components/motion/ReadingProgress.tsx` (client leaf).
**Mount:** `app/blog/[slug]/page.tsx` only (stays a server component; renders the leaf).

- Fixed 2px-tall accent-orange bar directly under the sticky navbar, full viewport width, `z-index` above content but below the navbar.
- Fill driven by framer-motion `useScroll().scrollYProgress` mapped to `scaleX` with `transform-origin: left` (`m.div style={{ scaleX: scrollYProgress }}`). Transform-only; no layout work.
- Sharp edges, flat accent color, no glow.
- Reduced motion: the bar still tracks scroll position (it is an indicator, not decoration); no springs or smoothing are added in either mode.

## 2. Read time label

- Computed server-side in `app/blog/[slug]/page.tsx` from the post's paragraphs: total word count / 200 wpm, rounded up, minimum 1 (`~N min read`).
- Rendered by `BlogPostHero` via a new optional prop `readTime?: string`, displayed in mono type in the same row as the tags (accent-adjacent, `text-ink-30` styling consistent with existing meta text).
- No percentage figure anywhere; the bar communicates progress.

## 3. Home section rail

**File:** `components/SectionRail.tsx` (client leaf).
**Mount:** `app/page.tsx` only.

- Fixed to the right viewport edge, vertically centered (`fixed right-[18px] top-1/2 -translate-y-1/2`), `hidden min-[901px]:flex flex-col` (desktop only), z-index below navbar.
- Five entries, numbering consistent with section eyebrows:
  - `00` Intro -> `#hero`
  - `01` About -> `#about`
  - `02` Stack -> `#skills`
  - `03` Writing -> `#writing`
  - `04` Contact -> `#contact`
- Entry visual: short horizontal hairline tick + mono number (`text-[10px]`). Inactive: `ink-30`. Active: accent orange, and the section label (e.g. "Stack") fades in beside the number (opacity transition only; the label is absolutely positioned to the left of the tick so it never reflows the rail).
- Active tracking: one `IntersectionObserver` over the five section elements (threshold tuned so the section occupying the viewport center wins; e.g. `rootMargin: '-45% 0px -45% 0px'`).
- Click: `element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })`.
- The rail fades in (opacity only) after a short delay (~0.8s) so it does not compete with the Hero text reveal.
- All five ids already exist in the codebase; verify at implementation time and add any missing id to the section wrapper.

## Out of scope

- No table of contents (posts have no headings).
- No rail on subpages (/projects, /education, /blog).
- No mobile rail.
- No content/heading restructuring in lib/blog-posts.ts.

## Build order

1. ReadingProgress component + mount + read-time computation + BlogPostHero prop (one commit).
2. SectionRail component + mount (one commit).

## Verification

- `npx tsc --noEmit`, `npm run build`, `npx react-doctor@latest` (100/100) after each stage.
- Playwright MCP at 1920x1080: open a blog post, scroll, bar fills left-to-right and reaches full width at page end; read time visible in hero. Home: rail visible on right, numbers highlight as sections pass, label appears next to active number, click on `02` scrolls to Skills.
- Reduced motion pass: rail click uses instant scroll; no animation regressions.
- Mobile (resize under 901px): rail hidden; progress bar still fine on blog posts.
