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
npm run test:unit  # Run Node unit tests
npm run test:smoke # Run production smoke tests (requires build)
npm run test       # Full test suite (unit + build + smoke)
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
- unit tests
- production smoke tests

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

### Automatic Production Deployment (`main`)

This repository now includes GitHub Actions workflow:

- `.github/workflows/deploy-main.yml`

It deploys to Vercel production when:

- CI completes successfully for a `push` to `main`
- or you trigger it manually from `workflow_dispatch`

Add these repository secrets in GitHub (`Settings -> Secrets and variables -> Actions`):

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

To get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`, run locally once:

```bash
vercel link
cat .vercel/project.json
```

### Contact Form Storage

The contact form now submits to `POST /api/contact`.

- By default, submissions are appended as NDJSON records to:
  - `/tmp/dot-website-contact-submissions.ndjson`
- To change the location, set:
  - `CONTACT_SUBMISSIONS_FILE=/absolute/path/to/contact-submissions.ndjson`

Each record stores:

- `id`
- `createdAt`
- `name`
- `email`
- `message`
