# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on port 5137 (NOT 3000 — README is stale boilerplate)
npm run build    # next build — NOTE: typescript.ignoreBuildErrors is true in next.config.ts,
                 # so a passing build does NOT prove type-correctness; run npx tsc --noEmit to type-check
npm run lint     # eslint
npm run knip     # unused files/exports/deps
npm run doctor   # react-doctor scan (also runs in CI: .github/workflows/react-doctor.yml)
```

No test suite exists. Verification is: build + `tsc --noEmit` + visual check via Playwright MCP (resize to 1920×1080 before screenshots — the owner reviews at full HD).

Git hooks (husky): pre-commit runs lint-staged (eslint --fix + prettier on staged files); commit-msg enforces conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`, …).

Deployment: Vercel project `cv-page` (org `adam903s-projects`), production alias `https://www.adampukaluk.pl`. Deploys are done via `vercel --prod --yes` from the local tree, so local uncommitted files CAN be live in production while absent from GitHub — don't assume prod == origin/main.

## Architecture

Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4. Personal portfolio, no CMS, no database — all content is typed data in `lib/` rendered by components.

### Design system — "mono-glass editorial"
Defined entirely in `app/globals.css` via Tailwind v4 `@theme inline` tokens: cream `#EDE7DA` (page), paper `#F3EEE2` (cards), sand `#E3DCCB` (image insets), ink `#1A1712` (text/dark blocks), accent orange `#F5340C`. Fonts loaded in `app/layout.tsx` via next/font: Instrument Serif (`font-serif`, italic accent words), Space Grotesk (`font-sans`), Space Mono (`font-mono`, eyebrows/labels).

Conventions every page follows (see `components/Hero.tsx`, `components/Contact.tsx`, `app/privacy-policy/page.tsx` as references):
- `.side-pad` section wrapper, `.display-xl` fluid hero headline, mono uppercase accent eyebrow, serif-italic accent word inside headings
- Sharp hairline borders (`rgba(26,23,18,0.16)` etc. as inline `style` or `--color-line` tokens) — **no rounded corners, no shadows, no glassmorphism**
- Desktop breakpoint is `min-[901px]:`; grids collapse to one column under 900px via the `@media (max-width: 900px)` block in globals.css (grid classes like `.hero-grid`, `.contact-grid` are registered there)
- Content photos use `object-contain` on a `bg-sand` box inside fixed-height/aspect containers (no cropping faces, no layout shift), with hover zoom `group-hover:scale-[1.04]`; only decorative thumbnails use `object-cover`
- Em dashes (U+2014) are banned in source — use plain hyphens

### Content & SEO/GEO layer
- `lib/blog-posts.ts` — blog content as data; `app/blog/[slug]/page.tsx` renders it via `generateStaticParams`
- `lib/seo.ts` — site constants, `createPageMetadata`, JSON-LD builders (used with `components/JsonLd.tsx`)
- `lib/geo.ts` — generates **markdown mirrors** of every page for LLM/AI-search consumption. Each HTML route has a sibling `*.md` route (`app/contact.md/route.ts`, etc.), plus `llms.txt`, `llms-full.txt`, `profile.md`, and the `app/md-mirror/[...path]` catch-all. Mirrors get noindex via `lib/with-noindex-header.ts`. **Adding a page means updating this layer too** (geo.ts page list, sitemap.ts).

### API routes (the only server logic)
- `app/api/send/route.ts` — contact form → Resend email (`RESEND_API_KEY`), template in `components/ui/email-template.tsx`. The form in `components/Contact.tsx` splits a single name field into firstName/lastName; lastName is optional.
- `app/api/now-playing/route.ts` — Spotify currently-playing via `lib/spotify.ts` (refresh-token flow with in-memory token cache; `SPOTIFY_CLIENT_ID/SECRET/REFRESH_TOKEN`).

### Images
Static imports from `public/img/` (gives intrinsic dimensions → no CLS): project screenshots in `public/img/projectsImg/<Project>/` (paths are case-sensitive and inconsistent — check exact casing), skill/tech logos in `public/img/icons/` imported in `components/Skills.tsx`. `components/Projects.tsx` is a large client component owning carousels + image/video lightboxes.
