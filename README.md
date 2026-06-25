# AI Email Generator

AI Email Generator is a Next.js MVP for creating polished business email drafts from a short topic brief. It includes a marketing landing page, Supabase Auth, a protected dashboard, mock AI generation, a premium pricing flow, tests, Docker, and CI.

## Tech Stack

- Next.js 16 App Router with React 19 and TypeScript strict mode
- Tailwind CSS 4 with shadcn/ui-style owned components
- Supabase Auth and Supabase Postgres via `@supabase/ssr` and `@supabase/supabase-js`
- TanStack Query for the dashboard generation mutation
- Vitest, Testing Library, and Playwright
- Docker standalone Next.js output

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` from the example:

```bash
cp .env.example .env.local
```

Set these values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
AI_PROVIDER=mock
```

Apply the app database schema before testing authenticated generation. The migration file is:

```text
supabase/migrations/20260625184050_add_app_tables.sql
```

It creates `profiles` and `generated_emails`, enables RLS, adds owner-only policies, and syncs a profile row when a Supabase Auth user is created.

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run test:e2e
```

## Docker

Build and run the production image:

```bash
docker build -t ai-email-generator .
docker run --env-file .env.local -p 3000:3000 ai-email-generator
```

Or use Compose:

```bash
docker compose up --build
```

## Project Structure

```text
src/app/
  (pages)/
    (landing)/
    pricing/
    login/
    signup/
    auth/
  (dashboard)/
    dashboard/
    profile/
  api/generate/
src/components/
src/lib/
src/services/
src/test/
src/types/
e2e/
```

Route groups organize public and protected surfaces without changing URLs. Shared UI lives in `src/components`; Supabase clients, app data access, API helpers, and utilities live in `src/lib`; mock generation lives in `src/services/email-generator`.

## Architecture Decisions

- The AI provider is mock-only in the MVP. `EmailGeneratorProvider` makes it straightforward to add OpenAI, Anthropic, Gemini, or another provider later without changing the dashboard UI.
- Protected pages validate Supabase session claims server-side before rendering dashboard content.
- Generated emails are persisted in Supabase Postgres after mock generation succeeds. The dashboard reads the latest saved drafts for the authenticated user.
- TanStack Query is used for the generation mutation because `/api/generate` is server-backed remote state.
- shadcn/ui components are committed as local source files, keeping styling and accessibility under project control.
- Pricing is intentionally UI-only. The Upgrade flow exists, but Stripe and billing persistence are out of scope.
- Supabase schema changes are stored in a user-created migration file; Codex does not run Supabase CLI commands in this repository.

## CI/CD

GitHub Actions runs linting, TypeScript checks, Vitest tests, production build, Playwright smoke tests, and Docker build on pushes to `main` and pull requests.
