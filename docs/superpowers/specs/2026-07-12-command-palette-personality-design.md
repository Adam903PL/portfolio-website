# Command Palette + Personality Touches - Design Spec

Date: 2026-07-12
Status: Approved by owner

## Goal

Make the portfolio memorable, personal and playful (owner goals: wow factor, personality, engagement) by adding one interactive centerpiece - a site-wide command palette - plus five small personality touches. Explicitly excluded: any Spotify UI on the website (the `app/api/now-playing` backend stays in code, unused by the UI).

## Constraints

- Design system "mono-glass editorial": sharp 1px ink borders, cream/paper/ink/accent-orange palette, Space Mono for UI chrome. No rounded corners, no shadows, no glassmorphism, no glow.
- No new dependencies. Framer Motion (LazyMotion, `m.`) via the existing `MotionProvider`; motion tokens from `lib/motion.ts`.
- Server components stay server; interactivity via small client leaf components.
- Animate only transform/opacity. All motion respects `prefers-reduced-motion` (use `useMotionSafe()` / `useReducedMotion`).
- react-doctor must stay 100/100: no unused exports, components under ~300 lines.
- Em dashes banned in source. Desktop breakpoint `min-[901px]:`.

## 1. Command palette (centerpiece)

**Trigger:** `Ctrl+K` / `Cmd+K` global listener, plus a visible mono-styled `Ctrl K` button in the navbar (tap target on mobile). `Escape` or backdrop click closes.

**UI:** Centered overlay panel: paper background, 1px ink border, flat dim backdrop `rgba(26,23,18,0.4)` (no blur). Input row with a `>` prompt character. Results list with keyboard navigation (ArrowUp/ArrowDown + Enter) and mouse hover. Open/close animated with AnimatePresence fade + slight y-slide using DURATION/EASE tokens.

**Commands** - static typed list in `lib/commands.ts`, filtered client-side with a simple subsequence fuzzy match (no cmdk dependency):

- Navigation: Home, Projects, Blog, Education, Contact; direct jumps to each project (from `components/Projects.tsx` data) and each blog post (from `lib/blog-posts.ts`).
- Actions: Copy email, Call phone, Open GitHub, Open LinkedIn.
- Hidden (match only when typed exactly, not listed by default): `chaos` (triggers easter egg, section 4), `age` (activates hero age counter, section 6).

**Architecture:** `components/palette/CommandPalette.tsx` (client), mounted once in `app/layout.tsx`. Split into `PaletteInput` / `PaletteResults` sub-components if the file approaches 300 lines. Focus is trapped in the input while open; body scroll locked.

## 2. Footer status line

Live line in the footer: `14:32 in Lublin - currently building ORBactive` with a blinking cursor block (reuses existing `blink` keyframe). Client leaf `components/StatusLine.tsx` rendered inside the server `Footer.tsx`. Time from `Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit' })`, updated every 60s. SSR renders a stable placeholder (no time) to avoid hydration mismatch; time fills in on mount.

## 3. Text scramble on hover

`components/motion/ScrambleText.tsx` (client): on mouse enter, characters cycle through a mono charset (`!<>-_\\/[]{}=+*^?#`) for ~0.4s before settling to the real text. Interval-driven on a span; Space Mono's fixed advance prevents layout shift. Applied to: the 4 navbar links and section eyebrow labels (About, Stack, Writing, etc.). Under reduced motion: renders plain text, no scramble. One scramble at a time per element; re-hover restarts.

## 4. Chaos easter egg

Trigger: Konami code (ArrowUp x2, ArrowDown x2, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a) or palette command `chaos`.

Effect (~4s, then auto-revert): a `data-chaos` attribute set on `<html>` by a small `ChaosProvider` client context mounted in the layout. CSS in `globals.css` keyed off `[data-chaos]`: section eyebrows and hairlines flip to accent orange, the tech marquee animation speeds up ~10x (shorter `animation-duration`), the hero portrait container gets a one-shot 360deg rotate (transform only). Disabled entirely under reduced motion (provider checks `matchMedia`).

## 5. Interactive tech marquee

- Pause on hover: CSS `animation-play-state: paused` on the marquee track.
- Each marquee item becomes a link to `/?tech=<name>#skills` (e.g. `/?tech=react#skills`). The hash scrolls to the Skills section natively; `Skills.tsx` reads the `tech` search param on mount, pre-selects the category containing that technology and highlights the matching tile.
- `TechMarquee.tsx` stays a server component; items become plain anchors.

## 6. Age counter easter egg

Clicking `Est. 2009` in the hero eyebrow swaps it for a live-ticking age value (`16.xxxxxxx years`, updating every 50ms via a client interval); clicking again reverts. Small client leaf `components/AgeCounter.tsx` used inside the server `Hero.tsx` eyebrow. Birth year constant lives in the component. Also activatable via palette command `age`, implemented with a custom DOM event (`window.dispatchEvent(new Event('toggle-age'))`) the component listens for - no shared context needed.

## Build order (suggested stages)

1. Command palette (lib/commands.ts + palette components + navbar button).
2. Footer status line.
3. ScrambleText (navbar + eyebrows).
4. Chaos easter egg (provider + CSS).
5. Interactive marquee + Skills filter wiring.
6. Age counter.

Each stage is one conventional commit and independently shippable.

## Verification

- `npx tsc --noEmit`, `npm run build`, `npx react-doctor@latest` (must stay 100/100) after each stage.
- Playwright MCP at 1920x1080: open palette via keyboard and navbar button, keyboard navigation, run `chaos` and `age`, hover marquee and click an item, hover nav links (scramble), footer status line renders.
- Reduced-motion pass: scramble and chaos disabled, palette still functional with instant transitions.
- GEO layer note: no new pages are added, so `lib/geo.ts` / sitemap need no changes.
