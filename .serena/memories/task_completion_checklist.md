# Task Completion Checklist

When completing any coding task, follow these steps:

## 1. Code Quality Checks
```bash
# Run Biome to check and fix formatting/linting issues
npx biome check --write
```

## 2. Type Checking
Since there's no explicit type-check script, TypeScript checking happens during build:
```bash
# Build the project to check for TypeScript errors
pnpm build
```

## 3. Lint Check
```bash
# Run Next.js linter
pnpm lint
```

## 4. Manual Verification
- Verify that all new types are properly defined in `domain/entities/`
- Check that component conventions are followed (arrow functions, props handling)
- Ensure no hardcoded secrets or sensitive information
- Verify file naming conventions are followed

## 5. Development Server Test
```bash
# Run development server to test changes
pnpm dev
```

## 6. Git Status Check
```bash
# Check what files have been modified
git status

# Review changes
git diff
```

## Important Reminders
- NEVER commit changes unless explicitly asked by the user
- Always use `pnpm` for package management, not npm or yarn
- Follow the established code conventions (arrow functions, no destructuring in params)
- Types should be in domain/entities files
- Use Server Components by default, Client Components only when needed

## If Tests Are Added Later
Update this checklist to include test running commands when a testing framework is configured.