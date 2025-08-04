# Development Commands

## Core Development Commands
```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code with Next.js ESLint
pnpm lint
```

## Code Quality Commands
```bash
# Format and lint code with Biome (Check and fix all issues)
npx biome check --write

# Format only
npx biome format --write

# Lint only
npx biome lint
```

## UI Component Installation
```bash
# Add Shadcn UI components
npx shadcn@latest add [component-name]

# Add Aceternity UI components
npx shadcn@latest add https://ui.aceternity.com/registry/[component-name].json

# Examples:
npx shadcn@latest add button card
npx shadcn@latest add https://ui.aceternity.com/registry/hero-parallax.json
npx shadcn@latest add https://ui.aceternity.com/registry/bento-grid.json
```

## Package Management
```bash
# Install dependencies
pnpm install

# Add new dependency
pnpm add [package-name]

# Add dev dependency
pnpm add -D [package-name]

# Update dependencies
pnpm update
```

## Git Commands (Darwin/macOS)
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "commit message"

# View log
git log --oneline

# Create and switch to new branch
git checkout -b feature/branch-name

# Push to remote
git push origin branch-name
```

## System Utilities (Darwin/macOS)
```bash
# List files
ls -la

# Change directory
cd path/to/directory

# Find files
find . -name "*.tsx"

# Search in files (use ripgrep if available)
rg "search term"
# or grep
grep -r "search term" .

# View file content
cat filename

# Create directory
mkdir -p path/to/directory

# Remove file/directory
rm -rf path/to/remove
```

## Testing Commands
Note: No testing framework is currently configured in the project. When tests are added, update this section with appropriate test commands.