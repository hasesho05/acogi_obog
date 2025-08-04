# Code Style and Conventions

## Component Development Rules

### Function Declaration
- **ALWAYS use arrow functions**, never `function` declarations
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

### Type Definitions
- All component props types must be defined in `domain/entities/component.ts`
- Business entity types go in respective `domain/entities/` files
- Use descriptive type names with proper domain context

### Next.js 15 Specific Patterns
- Async params handling for dynamic routes
- Use Server Components by default for data fetching
- Implement Data Access Layer patterns in `lib/dal.ts`
- Use Suspense boundaries for streaming content
- Client Components only when interactivity is needed

### File Naming Conventions
- **Page files**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **Components**: PascalCase (`ConcertCard.tsx`, `MemberList.tsx`)
- **Type definition files**: camelCase (`concert.ts`, `member.ts`, `component.ts`)
- **Utilities**: camelCase (`dateUtils.ts`, `formatUtils.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)

## Biome Configuration
- 2-space indentation
- Single quotes for JavaScript
- 100 character line width
- Strict linting with unused import detection
- Auto-formatting enabled

## Important Guidelines
- Package manager is **pnpm** (not npm or yarn)
- Uses Next.js 15 with Turbopack for development
- Follow existing code patterns and conventions
- Never assume library availability - check package.json first
- Follow security best practices - never expose secrets