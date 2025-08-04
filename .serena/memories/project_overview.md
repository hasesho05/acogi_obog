# Acoustic Guitar Circle Concert Website

## Project Purpose
This is a website for an acoustic guitar circle to showcase concert information. The project is built specifically for creating concert information pages without user authentication features.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Libraries**: 
  - Shadcn UI (base components)
  - Aceternity UI (animation-focused components)
- **Animation**: Framer Motion
- **Code Quality**: Biome (linting and formatting)
- **Package Manager**: pnpm

## Architecture
The project follows Domain-Driven Design (DDD) pattern with clear separation of concerns:
- `app/`: Next.js App Router pages
- `components/`: UI components
- `domain/`: Domain layer (entities, types)
- `infrastructure/`: Infrastructure layer (repositories, external APIs)
- `application/`: Application layer (use cases, services)
- `lib/`: Utilities and configurations

## Key Features
- Concert information display
- Member profiles
- Performance details
- No authentication system
- Japanese content support (演奏会, メンバー, 演奏)
- Responsive design with mobile-first approach
- Performance optimized with static generation

## Color Scheme
- Primary: #f2ece7 (Main background)
- Secondary: #9f8f7c (Text and borders)
- Tertiary: #ede5d8 (Section backgrounds)
- Accent: #6a8359 (Accent color)