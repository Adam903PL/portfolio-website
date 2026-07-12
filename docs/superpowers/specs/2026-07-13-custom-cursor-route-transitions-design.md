# Custom Cursor + Route Transitions - Design Spec

Date: 2026-07-13
Status: Approved by owner

## Goal

Recreate the interaction feel of nerosiegfried.com on the portfolio: a custom inverting cursor dot that grows over interactive elements and shows contextual labels ("READ POST") over content cards, plus a fade-up entrance animation on every route navigation.

## Reference findings (nerosiegfried.com, reverse-engineered)

- Real cursor hidden via `cursor: none` scoped to `@media (pointer: fine)`; custom elements `display: none` on `pointer: coarse` (touch unaffected).
- Fixed 12px round white dot, `mix-blend-mode: difference` (auto-inverts against any background), `z-index` above everything, `pointer-events: none`.
- Position via CSS vars `--cx/--cy` updated on `pointermove`, applied with `translate3d(var(--cx), var(--cy), 0) translate(-50%, -50%)` + `will-change: transform` - no per-frame React renders.
- Growth to ~44px via `data-variant="hover"` attribute; `width/height transition 0.28s cubic-bezier(0.16, 1, 0.3, 1)`.
- Separate fixed label element (mono, uppercase, tracked) positioned ~92px below the dot (`translate(-50%, 92px)`), also `mix-blend-mode: difference`, shown via `data-show="true"` when hovering elements with `data-cursor-label`.
- The "Blog transition" is the destination page's framer-motion entrance, not a curtain.

## Owner decisions

- Dot shape: circle, like the original (deliberate exception to the "no rounded corners" rule - it is a pointer, not UI chrome).
- Route transitions: yes, via `app/template.tsx`.

## Constraints

- No new dependencies (framer-motion via existing global MotionProvider, `m.` components).
- Reduced motion respected: cursor size transition disabled (dot still follows - position is instant, never animated); route transition instant.
- Touch devices completely unaffected (`pointer: coarse` hides cursor elements and keeps native cursor).
- No em dashes (U+2014) in source; no eslint-disable comments (restructure instead).
- react-doctor stays 100/100 (no unused exports, components under ~300 lines, no layout-property animation - the dot's width/height transition is on a 12-44px fixed overlay with `pointer-events: none`, which does not reflow document layout; acceptable).
- Server components stay server; new components are client leaves.

## 1. CustomCursor component

**File:** `components/cursor/CustomCursor.tsx` (client leaf).
**Mount:** `app/layout.tsx`, sibling of `CommandPalette` inside `MotionProvider` (though it does not use framer-motion - plain DOM refs).

Behavior:
- Renders two fixed elements: dot (`.custom-cursor`) and label (`.custom-cursor-label`), both `aria-hidden`, `pointer-events: none`.
- `pointermove` listener writes `--cx/--cy` style vars directly on both elements via refs (no state, no re-render).
- `pointerover` listener (event delegation on window):
  - `event.target.closest('a, button, [role="button"]')` -> dot gets `data-variant="hover"` (grows 12px -> 44px); otherwise variant removed.
  - `event.target.closest('[data-cursor-label]')` -> label textContent set from the attribute and `data-show="true"`; otherwise hidden.
- `pointerleave` on `document.documentElement` hides both (opacity 0) until the next move.
- Component skips all listeners when `matchMedia('(pointer: coarse)')` matches (CSS also hides the elements as a second layer of defense).
- State handled with direct DOM attribute writes through refs (mirrors the reference site; avoids per-hover React renders and any set-state-in-effect lint issues).

## 2. Cursor CSS (app/globals.css)

```css
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
@media (prefers-reduced-motion: reduce) {
  .custom-cursor {
    transition: opacity 0.2s;
  }
}
```

The component adds the `has-custom-cursor` class to `<html>` on mount (fine pointers only) and removes it on unmount, so no-JS visitors keep the native cursor.

## 3. Cursor labels (3 files)

Add `data-cursor-label` to existing card links (no other changes):
- `app/blog/page.tsx` blog index cards: `data-cursor-label="Read post"`.
- `components/BlogPreview.tsx` home cards: `data-cursor-label="Read post"`.
- `components/Projects.tsx` project card links (the card component's outer link/element): `data-cursor-label="View project"`. If a project card is not an anchor, put the attribute on its clickable wrapper.

## 4. Route transition

**File:** `app/template.tsx` (client):

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

App Router remounts templates on every navigation, replaying the entrance. The template nests inside the layout (navbar/footer do NOT re-animate; only page content does). Existing per-section entrance animations (Hero TextReveal, BlogGrid stagger) still play on top of it - the combined effect is the destination-page entrance the owner liked on the reference site.

Note: `app/template.tsx` must be a client component; it wraps `{children}` only, so all page content stays server-rendered (children pass through).

## Out of scope

- No cursor on touch; no crosshair/square variants; no "ring" variant (the reference site's 150px ring) - only dot + hover + label.
- No curtain/overlay page transitions.

## Verification

- `npx tsc --noEmit`, `npx eslint` on changed files (no suppressions), `npm run build`, `npx react-doctor@latest` (100/100).
- Playwright MCP at 1920x1080: dot follows mouse; grows over nav links and buttons; "READ POST" appears over blog cards (home + /blog); "VIEW PROJECT" over project cards; label/dot invert over the dark CTA section; navigate Home -> Blog and observe the page fade-up.
- Reduced motion: dot follows without size animation; route transition instant.
- Mobile emulation (touch): native cursor untouched, custom elements not rendered/visible.
- SSR check: `curl` the homepage - content unchanged (template passes children through).
