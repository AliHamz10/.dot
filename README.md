# Dot Landing Page

Premium `.dot` landing page built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lenis
- Lucide React

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install and Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run repository lint checks (debug-statement guard)
npm run typecheck  # Run TypeScript checks
```

## Branching Workflow

- `main`: production-only
- `staging`: pre-production validation
- `feature/*`: feature branches created from `staging`

Merge flow:

```text
feature/* -> staging -> main
```

See `docs/git-workflow.md` for full policy and local workflow.

## CI

GitHub Actions validate pull requests and pushes to `staging` and `main` with:

- branch-flow checks
- type checking
- linting
- production build validation

## Project Structure

```text
src/
  app/
    sections/
  components/
    animation/
    layout/
    shared/
    ui/
  lib/
  types/
```

## Deployment

Compatible with Vercel and any Node.js hosting environment that supports Next.js.
