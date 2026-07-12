# Command Palette Preview Pane - Design Spec

Date: 2026-07-12
Status: Approved by owner

## Goal

Add a Raycast-style preview pane to the existing command palette: highlighting a result (keyboard or mouse) shows a data-driven preview beside the list. First of three planned features (preview pane -> multi-step contact form -> dark ink mode).

## Constraints

- Design system "mono-glass editorial": sharp 1px hairlines, cream/paper/ink/accent palette, Space Mono labels, Instrument Serif accents. No rounded corners, no shadows, no glow, no blur.
- No new dependencies. Framer Motion via the global MotionProvider (`m.` components); animate only transform/opacity; reduced motion respected (`useReducedMotion`).
- No em dashes (U+2014) in source. No eslint-disable comments (restructure instead).
- react-doctor stays 100/100: no unused exports, components under ~300 lines.
- Content photos use `object-contain` on a `bg-sand` box (no cropping).
- Desktop breakpoint `min-[901px]:`.

## Layout

- Desktop (`min-[901px]:`): palette panel widens from `max-w-[560px]` to `max-w-[840px]`; below the input row, a two-column grid: results list left (~55%), preview pane right (~45%), separated by a vertical hairline (`rgba(26,23,18,0.16)`).
- Below 901px: unchanged single column, no preview pane rendered (hidden with `hidden min-[901px]:block` on the pane column).
- The pane always previews the currently highlighted result (`results[selected]`); it updates on ArrowUp/ArrowDown and mouse hover.
- Transition: fast opacity crossfade keyed by command id (`DURATION.fast`); instant under reduced motion.
- Pane height matches the list column (list keeps `max-h-[320px]`); pane content vertically laid out from the top.

## Data model

Extend `Command` in `lib/commands.ts` with an optional discriminated `preview` field:

```ts
type CommandPreview =
  | { type: 'post'; image: StaticImageData; imageAlt: string; kicker: string; excerpt: string }
  | { type: 'page'; path: string; description: string }
  | { type: 'action'; detail: string };
```

- Blog posts: built from `blogPosts` entries (image, imageAlt, kicker, excerpt already exist in `lib/blog-posts.ts`).
- Pages: static descriptions defined inline in `getCommands()`:
  - Home: "Hero, stack, about and latest writing - the whole story on one page." path `/`
  - Projects: "Things I've shipped & broken - 15+ projects across web, mobile and AI." path `/projects`
  - Blog: "Writing & happenings - events, hackathons and talks from LinkedIn." path `/blog`
  - Education: "From LEGO logic to full-stack product work - the learning path." path `/education`
  - Contact: "Email, phone, socials and a form that lands straight in my inbox." path `/contact`
- Actions:
  - Copy email: "Copies pukaluk.adam505@gmail.com to your clipboard."
  - Call me: "Opens your phone app with +48 695 031 104."
  - Open GitHub: "Opens github.com/Adam903PL in a new tab."
  - Open LinkedIn: "Opens my LinkedIn profile in a new tab."
- Hidden commands (`chaos`, `age`): `{ type: 'action', detail: '???' }` - mystery card, no spoilers.

## Rendering (per preview type)

New client leaf `components/palette/PalettePreview.tsx`, props `{ command: Command | null }`:

- `post`: photo in a `bg-sand` box with `object-contain` (fixed-height container, e.g. `h-[170px]`, `next/image` with static import so no CLS), then kicker in mono accent, then excerpt in small ink-70 text.
- `page`: "index card" - serif italic title (command label), one-line description, `path` in mono `text-ink-30`, framed by a hairline border box.
- `action`: mono `detail` text centered in a hairline box.
- `command === null` (no results): dim mono placeholder "No selection".
- Crossfade: wrap content in `m.div` keyed by `command.id`, `initial {opacity 0} animate {opacity 1}` with `DURATION.fast`, duration 0 under reduced motion. No AnimatePresence exit needed (instant swap acceptable).

## CommandPalette changes

- Panel `max-w-[560px]` -> `max-w-[560px] min-[901px]:max-w-[840px]`.
- Below the input row: `div` with `min-[901px]:grid min-[901px]:grid-cols-[1.2fr_1fr]`; left column is the existing `ul` (unchanged behavior), right column `hidden min-[901px]:block border-l` with `<PalettePreview command={results[selected] ?? null} />`.
- Keep `CommandPalette.tsx` under 300 lines (preview rendering lives entirely in `PalettePreview.tsx`).

## Out of scope

- No page screenshots (data-driven previews only - decision A from brainstorming).
- No preview on mobile.
- No changes to command execution, filtering, or keyboard behavior.

## Verification

- `npx tsc --noEmit`, `npx eslint` on changed files (no suppressions), `npm run build`, `npx react-doctor@latest` (100/100).
- Playwright MCP at 1920x1080: open palette, arrow through results - post entries show photo + excerpt, pages show index card, actions show detail text, typing `chaos` shows the ??? card; resize to 800px wide - single column, no pane.
- Reduced motion: crossfade instant, everything functional.
