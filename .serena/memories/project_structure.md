# Project Structure

## Current Directory Structure
```
acoustic_obog/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   │   └── page.tsx
│   ├── concerts/          # Concerts pages
│   │   └── page.tsx
│   └── contact/           # Contact page
│       └── page.tsx
├── components/            # UI Components
│   ├── ui/               # Base UI components (Shadcn/Aceternity)
│   │   ├── typewriter-effect.tsx
│   │   ├── video-slider.tsx
│   │   ├── images-slider.tsx
│   │   └── parallax-scroll.tsx
│   ├── features/         # Feature-specific components
│   │   ├── home/         # Homepage components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── EventInformation.tsx
│   │   │   ├── VenueInformation.tsx
│   │   │   ├── PastEventPhotos.tsx
│   │   │   └── CallToAction.tsx
│   │   ├── concert/      # Concert-related components
│   │   ├── member/       # Member-related components
│   │   └── performance/  # Performance-related components
│   └── layout/           # Layout components
├── domain/               # Domain layer (DDD)
│   ├── entities/         # Type definitions
│   │   └── home.ts       # Homepage types
│   ├── repositories/     # Repository interfaces
│   └── services/         # Domain services
├── infrastructure/       # Infrastructure layer
│   ├── repositories/     # Repository implementations
│   └── external/         # External APIs
├── application/          # Application layer
│   ├── usecases/         # Use cases
│   └── services/         # Application services
├── lib/                  # Utilities and configuration
├── public/               # Static assets
├── .serena/              # Serena configuration
├── .claude/              # Claude configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── biome.json           # Biome configuration
├── components.json       # Shadcn UI configuration
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
├── CLAUDE.md            # Claude AI instructions
└── README.md            # Project documentation

## Key Architectural Points
- Following Domain-Driven Design (DDD) pattern
- Clear separation between domain, application, and infrastructure layers
- Components organized by feature
- Types centralized in domain/entities
- Server Components by default, Client Components when needed