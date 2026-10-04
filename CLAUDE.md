# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.
Last checked against the repository: 2026-10-04.

## Project Overview

Japanese concert information website for the Ryukoku University acoustic guitar
circle's OB/OG community. It uses Next.js App Router and static export, with no
authentication or runtime backend. The configured site URL is
`https://acogi-obog.pages.dev`; source code alone does not confirm deployment status.

Versions declared in `package.json`:

- Next.js 16.1.2, React / React DOM 19.2.3, TypeScript 5
- Tailwind CSS 4 and `tw-animate-css`
- Motion (`motion/react`), Lucide React, and Tabler icons
- Vitest 4, Testing Library, Playwright, and Storybook 8
- pnpm package manager

## Commands and Tooling

```bash
# Development server (Turbopack)
pnpm dev

# Production build / static export
NODE_ENV=production pnpm build

# Unit and component tests
pnpm test
pnpm test:watch

# Selected tests
pnpm exec vitest run tests/unit/infrastructure/live2026Repository.test.ts

# Type checking
pnpm exec tsc --noEmit

# Storybook
pnpm storybook
pnpm build-storybook

# Existing Playwright E2E suite (CLI, not MCP)
pnpm exec playwright test
```

`pnpm lint` currently maps to `next lint`, which is absent from the installed
Next.js CLI. Do not report it as a working lint check. The repository has
`biome.json` (schema 2.1.1), but Biome is not declared in `package.json` or
available in the local `node_modules/.bin` at this update. When Biome is available,
use `biome check` on the relevant files; do not introduce ESLint as a substitute.
Its configuration specifies two spaces, single JavaScript quotes, a 100-character
line width, ES5 trailing commas, and required semicolons.

`pnpm start` maps to `next start`. This site is configured for static export;
preview the exported files with a static file server rather than treating
`pnpm start` as the static deployment workflow.

## Current Routes and Structure

```text
app/
  page.tsx                 # Top page: HeroSection, ConcertSection, SocialSection
  layout.tsx               # Fonts, metadata, analytics, MotionProvider, Footer
  globals.css              # Tailwind theme and global styles
  about/page.tsx
  concerts/page.tsx        # Concert archive
  concerts/2025/           # 2025 concert page and metadata layout
  concerts/2026/           # Implemented 2026 special page and metadata layout
  privacy/page.tsx
  thanks/                  # Thank-you page and lead tracking
components/
  features/top/            # Current top-page components
  features/home/           # 2025 concert components (not the current top page)
  features/live2026/       # 2026 special-page components
  features/concerts/       # Archive components
  features/about/
  features/shared/         # Shared PageHero
  layout/                  # Footer
  providers/               # Analytics, motion, UTM tracking
  ui/                      # Custom and registry-derived UI components
domain/entities/           # home.ts, concert.ts, component.ts, live2026.ts
infrastructure/repositories/
  concertRepository.ts     # Concert list and lookup helpers
  live2026Repository.ts    # Event facts, venue, 2025 photos/videos, social URLs
lib/
  utils.ts                 # cn() helper
  analytics/               # Events and attribution
public/images/             # Concert photos and OGP assets
tests/
  unit/                    # Repository, analytics, utility tests
  components/              # Component tests
  e2e/                     # Playwright 2025 hero tests
.storybook/                # Storybook configuration
```

There is currently no `/contact` route, `application/` layer,
`domain/repositories/` directory, `lib/dal.ts`, or `scroll-transition` component.
Do not assume these exist from older documentation or architectural examples.
The implementation separates types, static data, and UI; add further layers only
when the task calls for them.

## 2026 Concert Page

`/concerts/2026/` is already implemented. Its page renders, in order:

1. `Live2026Hero`
2. `Live2026Overview`
3. `Live2026Memories`
4. `Live2026Access`
5. `Live2026Follow`

The current design uses a compact concert-ticket motif, warm colors, bordered
information blocks, and a photo filmstrip. The top-page hero and concert/archive
cards link to the page. Metadata lives in `app/concerts/2026/layout.tsx`, with
`public/images/ogp_live2026.jpg` as the OGP image.

Current data in `infrastructure/repositories/live2026Repository.ts`:

- Date: 2026年11月14日（土）
- Time: 11:30 開演 / 14:45 ごろ終演; opening time is still to be announced
- Venue: SECOND ROOMS, 京都府向日市寺戸町西田中瀬3-4 FORUM東向日Ⅰ 3F
- Access: 阪急京都線「東向日」駅から徒歩約1分
- Memories: 2025 concert photos and a configurable video list

Update event facts, venue/access, memories, and social URLs in
`live2026Repository.ts`. Also keep `concertRepository.ts` synchronized because it
supplies the top-page concert cards and archive. Date/venue text also appears in
the top hero, 2026 hero, and metadata; inspect those when event details change.

The top hero says 「第10回」 while repository descriptions say 「第1回」/「第2回」.
These labels are inconsistent; confirm the intended numbering before changing
them. The 2026 special page uses 「OBOG演奏会 2026」.

## Coding Conventions

Follow the repository's conventions for new feature code:

- Prefer arrow functions, including components.
- Pass component props as one object and access `props.name`; avoid parameter
  destructuring in new components.
- Put shared component props in `domain/entities/component.ts`; feature-specific
  types belong in the corresponding entity file, such as `live2026.ts`.
- Use `import type` for type-only imports and infer component return types.
- Use `@/` imports; the alias points to the repository root, not `src/`.
- TypeScript is strict and targets ES2017.
- Use Server Components unless browser APIs, state, or animations require
  `'use client'`. The current top page is a Client Component.
- Keep Japanese copy, dates, accessible labels, and metadata consistent.

Existing code has some exceptions (for example, the root layout is a function
declaration). Avoid unrelated rewrites merely to enforce a convention.

## Styling and Motion

Theme tokens are defined with Tailwind CSS 4's `@theme` in `app/globals.css`:

```css
--color-primary: #fff5f0;      /* Warm background */
--color-secondary: #d4502c;    /* Main orange */
--color-tertiary: #fae8e0;     /* Section background */
--color-accent: #e07548;
--color-dark: #8b3a1e;         /* Text */
--color-light: #ff9671;
--color-green: #2d6a4f;        /* Secondary palette */
--color-green-light: #40916c;
--color-green-pale: #b7e4c7;
--color-green-dark: #1b4332;
```

Use theme utilities such as `bg-primary`, `text-dark`, and `text-secondary`.
Display text uses Zen Old Mincho (`font-display`); body text uses Noto Sans JP
(`font-body`), configured via `next/font/google` in the root layout.

Import animation APIs from `motion/react`, not `framer-motion`.
`MotionProvider` wraps the site with `LazyMotion` using `domAnimation` and
`MotionConfig reducedMotion="user"`. Sections use Motion directly, including
in-view and staggered animations. There is no shared `ScrollTransition` wrapper.
Preserve reduced-motion support and mobile usability when changing animations.

`components.json` configures Shadcn's `new-york` style, zinc base, RSC, and Lucide
icons. Existing UI components include registry-derived Aceternity components;
reuse actual components rather than assuming every library example is installed.

## Static Export and Metadata

`next.config.ts` sets `output: 'export'`, `trailingSlash: true`,
`distDir: 'out'`, and `images.unoptimized: true`. YouTube thumbnail images from
`i.ytimg.com` are allowed by `remotePatterns`.

Keep features compatible with static hosting: there is no runtime server for API
handlers, Server Actions, request-time rendering, or middleware. Server
Components can resolve data at build time; dynamic routes need statically
generated paths. Do not describe all server-side data fetching as unsupported.
If a task requires a backend, assess the hosting change explicitly.

The root layout defines default Open Graph/Twitter metadata; concert layouts
override it. Keep page URLs, Japanese descriptions, and public image paths
aligned with the route and supplied event information.

## Analytics and Verification

Analytics providers and helpers live in `components/providers/` and
`lib/analytics/`. Configuration uses `NEXT_PUBLIC_GA_ID`,
`NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`, and
`NEXT_PUBLIC_META_PIXEL_ID`. Analytics scripts are enabled in production when
configured. Preserve existing CTA event and attribution behavior when editing
links; the `/thanks/` page also tracks leads.

Vitest uses jsdom, `tests/setup.ts`, and the `@/` alias. `tests/utils.tsx` supplies
component test helpers. Run tests relevant to behavioral changes, and use the
production build when route/export compatibility needs verification. Do not
claim a check passed unless it ran successfully.

Playwright CLI tests exist in `tests/e2e/`; the config starts/reuses the development
server on port 3000 and covers desktop and mobile browser profiles.
**Do not use Playwright MCP in this project.** If browser confirmation is needed
and cannot be obtained through authorized tooling, ask the user to verify it.

`README.md` contains additional Japanese coding guidance, but some examples are
architectural templates rather than implemented files. Check current source and
configuration before relying on them. More specific guidance also exists in
`app/CLAUDE.md` and `components/features/top/CLAUDE.md`.
