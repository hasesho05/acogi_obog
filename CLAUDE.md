# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an acoustic guitar circle concert website built with Next.js 15 and follows Domain-Driven Design (DDD) architecture. The project is specifically for creating concert information pages without user authentication features.

**Key Technologies:**
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- Shadcn UI components
- Aceternity UI for animations
- Framer Motion
- Biome for linting/formatting
- pnpm as package manager

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code with Next.js ESLint
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
The project follows Domain-Driven Design with this planned structure:
```
src/
├── app/                    # Next.js App Router pages
├── components/             # UI components
│   ├── ui/                # Shadcn/Aceternity UI components
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components
├── domain/                # Domain layer (entities, types)
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

### Next.js 15 Specific Patterns

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
The project uses a warm, acoustic-themed color palette:
```css
--color-primary: #fff5f0        /* ウォームホワイト（背景） */
--color-secondary: #d4502c      /* バーントオレンジ（メイン） */
--color-tertiary: #fae8e0       /* ライトピーチ（セクション背景） */
--color-accent: #e07548         /* サーモンオレンジ（アクセント） */
--color-dark: #8b3a1e           /* ダークオレンジ（テキスト用） */
--color-light: #ff9671          /* ライトオレンジ（ハイライト） */
```

### UI Libraries Integration
- **Shadcn UI**: Base components (buttons, cards, forms)
- **Aceternity UI**: Animation-focused components (hero parallax, bento grids)
- **Tailwind CSS v4**: Utility-first styling
- **Framer Motion**: Custom animations

### Code Quality Tools

**Biome Configuration:**
- 2-space indentation
- Single quotes for JavaScript
- 100 character line width
- Strict linting with unused import detection
- Auto-formatting enabled

**Important Biome Commands:**
```bash
# Check and fix all issues
npx biome check --write

# Format only
npx biome format --write

# Lint only
npx biome lint
```

### Japanese Content Context
The project is for a Japanese acoustic guitar circle, so be prepared to work with:
- Japanese text content and metadata
- Concert (演奏会), member (メンバー), and performance (演奏) related features
- Japanese date formatting and cultural conventions

## Key Implementation Notes

- Package manager is **pnpm** (not npm or yarn)
- Uses Next.js 15 with Turbopack for development
- No authentication system planned
- Focus on concert information presentation
- Responsive design with mobile-first approach
- Performance optimized with static generation where possible