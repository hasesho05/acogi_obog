# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an acoustic guitar circle concert website built with Next.js 16 and follows Domain-Driven Design (DDD) architecture. The project is specifically for creating concert information pages without user authentication features.

**Key Technologies:**
- Next.js 16.1.2 with App Router (Turbopack)
- React 19.2.3
- TypeScript
- Tailwind CSS v4 (custom theme configuration)
- Shadcn UI components
- Aceternity UI for animations
- Motion (旧 framer-motion) - `motion/react` からインポート
- Biome for linting/formatting (configured with 2-space indentation)
- pnpm as package manager
- Lucide React icons

**Note**: This project does NOT use ESLint - it uses Biome instead for all linting and formatting.

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Build for production (NODE_ENV=production 必須)
NODE_ENV=production pnpm build

# Start production server
pnpm start

# Lint with Next.js (basic linting only)
pnpm lint

# Format and lint code with Biome
npx biome check --write

# Add Shadcn UI components
npx shadcn@latest add [component-name]

# Add Aceternity UI components
npx shadcn@latest add https://ui.aceternity.com/registry/[component-name].json
```

## Architecture & Code Conventions

### Directory Structure (DDD Pattern)
The project follows Domain-Driven Design with this current structure:
```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles with custom Tailwind theme
│   ├── concerts/          # Concert pages
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/             # UI components
│   ├── ui/                # Shadcn/Aceternity UI components
│   ├── features/          # Feature-specific components
│   │   └── home/          # Home page specific components
│   └── layout/            # Layout components
├── domain/                # Domain layer (entities, types)
│   └── entities/          # Type definitions (currently only home.ts)
├── infrastructure/        # Infrastructure layer (repos, external APIs)
├── application/           # Application layer (use cases, services)
└── lib/                   # Utilities and configurations
```

### Component Development Rules

**Function Declaration:**
- ALWAYS use arrow functions, never `function` declarations
- Import types from `domain/entities/` files
- Pass props as a single object parameter (no destructuring in parameters)
- Do NOT declare return types (let TypeScript infer)

```typescript
// ✅ Correct
import type { ComponentProps } from '@/domain/entities/component';

const MyComponent = (props: ComponentProps) => {
  return <div>{props.title}</div>;
};

// ❌ Avoid
function MyComponent({ title }: { title: string }) {
  return <div>{title}</div>;
};
```

**Type Definitions:**
- All component props types must be defined in `domain/entities/component.ts`
- Business entity types go in respective `domain/entities/` files
- Use descriptive type names with proper domain context

### Next.js 16 Specific Patterns

**ビルド時の注意（重要）:**
Next.js 16 では `NODE_ENV` が正しく設定されていないとビルドエラーが発生する。
詳細: [Next.js 16 global-error issue #85668](https://github.com/vercel/next.js/issues/85668)

```bash
# 正しいビルドコマンド
NODE_ENV=production pnpm build

# CI環境（Cloudflare Pages等）では環境変数に設定
NODE_ENV=production
```

**Async Params Handling:**
```typescript
// Dynamic routes require awaiting params and searchParams
const Page = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  // Use params.id and searchParams.tab
};
```

**Data Fetching:**
- Use Server Components by default for data fetching
- Implement Data Access Layer patterns in `lib/dal.ts`
- Use Suspense boundaries for streaming content
- Client Components only when interactivity is needed

### Color Scheme
The project uses a warm, acoustic-themed color palette defined in `app/globals.css` using Tailwind CSS v4's @theme directive:
```css
--color-primary: #fff5f0        /* ウォームホワイト（背景） */
--color-secondary: #d4502c      /* バーントオレンジ（メイン） */
--color-tertiary: #fae8e0       /* ライトピーチ（セクション背景） */
--color-accent: #e07548         /* サーモンオレンジ（アクセント） */
--color-dark: #8b3a1e           /* ダークオレンジ（テキスト用） */
--color-light: #ff9671          /* ライトオレンジ（ハイライト） */
```

**Important**: Colors are accessed as Tailwind utilities (e.g., `bg-primary`, `text-secondary`) through the custom theme configuration.

### UI Libraries Integration
- **Shadcn UI**: Base components (buttons, cards, forms)
- **Aceternity UI**: Animation-focused components (hero parallax, bento grids)
- **Tailwind CSS v4**: Utility-first styling
- **Motion**: Custom animations（`motion/react` からインポート）

**Motion インポート方法:**
```typescript
// ✅ 正しい（motion パッケージ）
import { motion } from "motion/react";

// ❌ 古い（framer-motion は使用しない）
import { motion } from "framer-motion";
```

### Code Quality Tools

**Biome Configuration (biome.json):**
- 2-space indentation
- Single quotes for JavaScript
- 100 character line width
- ES5 trailing commas
- Semicolons always required
- Strict linting with unused import detection
- Auto-formatting enabled
- noNonNullAssertion rule disabled

**Important Biome Commands:**
```bash
# Check and fix all issues (primary command to use)
npx biome check --write

# Format only
npx biome format --write

# Lint only
npx biome lint
```

**Important**: Always use Biome commands for code formatting and linting, not ESLint.

### Japanese Content Context
The project is for a Japanese acoustic guitar circle, so be prepared to work with:
- Japanese text content and metadata
- Concert (演奏会), member (メンバー), and performance (演奏) related features
- Japanese date formatting and cultural conventions

## Key Implementation Notes

- Package manager is **pnpm** (not npm or yarn)
- Uses Next.js 16 with Turbopack for development (`--turbopack` flag in dev script)
- **ビルド時は `NODE_ENV=production` 必須**
- **Static Export Configuration**: Project is configured for static export (`output: 'export'` in next.config.ts)
  - Images are unoptimized (`images: { unoptimized: true }`)
  - Trailing slashes enabled (`trailingSlash: true`)
  - Output directory is 'out' (`distDir: 'out'`)
- No authentication system planned
- Focus on concert information presentation
- Responsive design with mobile-first approach
- Performance optimized with static generation where possible

### Static Export の制限

| 機能 | 利用可否 |
|------|----------|
| API Routes (`/api/*`) | ❌ |
| Server Actions | ❌ |
| サーバーサイドでのfetch | ❌ |
| Middleware | ❌ |
| 動的ルート（事前生成不可） | ❌ |

動的機能が必要になった場合は `@cloudflare/next-on-pages` の導入を検討。

## Current Implementation Architecture

### Actual Component Structure
The home page (`app/page.tsx`) uses this structure:
```typescript
const HomePage = () => {
  return (
    <main className="min-h-screen bg-primary">
      <HeroSection />
      <ScrollTransition><EventInformation /></ScrollTransition>
      <ScrollTransition><VenueInformation /></ScrollTransition>
      <ScrollTransition><PastEventPhotos /></ScrollTransition>
      <ScrollTransition><CallToAction /></ScrollTransition>
    </main>
  );
};
```

### Scroll Animations
The project uses a `ScrollTransition` wrapper component to animate sections as they come into view.

### TypeScript Configuration
- Path mapping uses `@/*` pointing to project root (not src/)
- Target: ES2017
- Strict mode enabled
- Next.js plugin included

### Shadcn UI Configuration
- Style: "new-york"
- Base color: "zinc"  
- CSS variables: enabled
- RSC (React Server Components): enabled
- Icon library: Lucide React

### Package Dependencies
**Production dependencies:**
- @tabler/icons-react: Additional icons
- class-variance-authority: Component variants
- clsx + tailwind-merge: Conditional styling
- motion: Animations（`motion/react` からインポート）
- lucide-react: Primary icon library

**Development dependencies:**
- @tailwindcss/postcss: PostCSS plugin for Tailwind v4
- tailwindcss: v4
- tw-animate-css: Animation utilities
- TypeScript v5

## Component Architecture Patterns

### Scroll Animation Integration
The project uses a custom `ScrollTransition` wrapper component that provides fade-in animations as sections come into view. This is implemented consistently across all major sections:
- Import from `@/components/ui/scroll-transition`
- Wrap content sections to enable scroll-triggered animations
- Supports `delay` prop for staggered animations

### UI Component Libraries Hierarchy
1. **Aceternity UI Components** (in `/components/ui/`): Animation-heavy components like `hero-parallax`, `bento-grid`, `timeline`, `shooting-stars`
2. **Shadcn UI Components** (in `/components/ui/`): Standard UI components integrated via `npx shadcn@latest add`
3. **Custom Components** (in `/components/features/`): Feature-specific components for home, concerts, etc.

## Working with the Domain Layer

### Entity Files Structure
Current domain entities are located in `/domain/entities/`:
- Type definitions should follow the business domain (concerts, members, performances)
- Component prop types go in `component.ts`
- Business entities get their own files (e.g., `concert.ts`, `member.ts`)

### DDD Repository Pattern
- Repository interfaces are defined in `/domain/repositories/`
- Implementations go in `/infrastructure/repositories/`
- Access through Data Access Layer patterns in `lib/dal.ts`

### Important Notes from README.md
The project README contains detailed Japanese coding conventions that complement these guidelines:
- Uses 2-space indentation (configured in Biome)
- Emphasizes DDD (Domain-Driven Design) architecture 
- Specifies exact component prop handling patterns (no destructuring in parameters)
- Includes Japanese business domain context (演奏会/concerts, メンバー/members, 演奏/performances)
- Contains comprehensive examples of Server Component vs Client Component usage patterns

## Playwright MCP使用ルール

### 絶対的な禁止事項

1. **いかなる形式のコード実行も禁止**

   - Python、JavaScript、Bash等でのブラウザ操作
   - MCPツールを調査するためのコード実行
   - subprocessやコマンド実行によるアプローチ

2. **利用可能なのはMCPツールの直接呼び出しのみ**

   - playwright:browser_navigate
   - playwright:browser_screenshot
   - 他のPlaywright MCPツール

3. **エラー時は即座に報告**
   - 回避策を探さない
   - 代替手段を実行しない
   - エラーメッセージをそのまま伝える