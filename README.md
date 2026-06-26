# AI Email Generator

AI Email Generator is a Next.js MVP for creating polished business email drafts from a short topic brief. It includes a marketing landing page, Supabase Auth, a protected dashboard, mock AI generation, a premium pricing flow, tests, Docker, and CI.

## Features

- Public landing and pricing pages
- Supabase email/password authentication
- Protected dashboard, drafts, and profile pages
- Mock AI email generation with tone and length controls
- Saved generated email history in Supabase Postgres
- UI-only upgrade flow for future billing work
- Unit, component, API route, and Playwright smoke tests
- Docker standalone production image

## Tech Stack

- Next.js 16 App Router with React 19 and TypeScript strict mode
- Tailwind CSS 4 with shadcn/ui-style owned components
- Supabase Auth and Supabase Postgres via `@supabase/ssr` and `@supabase/supabase-js`
- TanStack Query for the dashboard generation mutation
- Vitest, Testing Library, and Playwright
- Docker standalone Next.js output

## Prerequisites

- Node.js 22
- npm
- A Supabase project for authenticated dashboard and persistence flows

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` from the example:

```bash
cp .env.example .env.local
```

Fill in the required Supabase values described in [Environment Variables](#environment-variables). Next.js and the Playwright config both read local env files, so `.env.local` is recommended and `.env` also works. Do not commit local environment files with real project credentials.

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

## Environment Variables

The application reads variables from local env files, the deployment environment, Docker Compose, or CI. For local development, prefer `.env.local`; `.env` is also loaded. The minimum local setup for authenticated app flows is:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
AI_PROVIDER=mock
```

| Variable | Required | Used by | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes for auth, protected pages, and persistence | App, API route, Supabase clients, Docker, CI | Supabase project URL, for example `https://your-project.supabase.co`. Public by design, but environment-specific. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes for auth, protected pages, and persistence | App, API route, Supabase clients, Docker, CI | Supabase publishable anon key. Do not use a service-role key in this client-facing variable. |
| `AI_PROVIDER` | Optional | Email generator service, Docker, CI | Defaults to `mock`. The MVP currently supports only `mock`; any other value fails intentionally. |
| `E2E_EMAIL` | Optional | Playwright config, `e2e/authenticated.spec.ts` | Email for the authenticated Playwright smoke test. If it is missing, that test is skipped. |
| `E2E_PASSWORD` | Optional | Playwright config, `e2e/authenticated.spec.ts` | Password for the authenticated Playwright smoke test. If it is missing, that test is skipped. |
| `NEXT_TELEMETRY_DISABLED` | Optional | Local scripts, Docker build/runtime | Set to `1` to disable Next.js telemetry. The Dockerfile and E2E runner already disable it where they run. |
| `CI` | Set by CI providers | Playwright config | Enables CI retries and the GitHub reporter in Playwright. Usually set automatically by GitHub Actions. |
| `NODE_ENV` | Set by framework/runtime | Next.js, Docker runtime | The Docker image sets `production`. Do not set it manually for normal local development. |
| `PORT` | Optional for standalone runtime | Docker runtime, Next.js standalone server | The Docker image sets `3000`. Override only when running the standalone server on another port. |
| `HOSTNAME` | Optional for standalone runtime | Docker runtime, Next.js standalone server | The Docker image sets `0.0.0.0` so the container accepts external traffic. |

If the Supabase variables are missing, public pages still render as a signed-out visitor. Authenticated pages redirect to `/login`, and `/api/generate` returns an auth configuration error.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Next.js development server. |
| `npm run dev:e2e` | Start the development server for Playwright on `127.0.0.1`. |
| `npm run build` | Build the production app with standalone output. |
| `npm run start` | Start the built Next.js app. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run test` | Start Vitest in watch mode. |
| `npm run test:run` | Run Vitest once for unit, component, and API route tests. |
| `npm run test:e2e` | Start the E2E dev server, run Playwright with one worker, and stop the server. |
| `npm run test:e2e:run` | Run Playwright directly against an already running app at `http://127.0.0.1:3000`. |

The authenticated Playwright smoke test requires `E2E_EMAIL` and `E2E_PASSWORD`. Put them in `.env.local`, `.env`, or the shell environment before running E2E tests. Without both values, the authenticated test is skipped and the public smoke tests still run.

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

Docker Compose reads variable substitutions from the shell environment or a root `.env` file. If your local values are stored only in `.env.local`, export the Supabase variables before running Compose or provide an equivalent `.env` file that is not committed.

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
    drafts/
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

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page. |
| `/pricing` | Pricing page and UI-only upgrade flow. |
| `/login` | Supabase sign-in page. |
| `/signup` | Supabase account creation page. |
| `/dashboard` | Protected email generator dashboard. |
| `/drafts` | Protected saved draft history. |
| `/profile` | Protected account profile summary. |
| `/api/generate` | Authenticated email generation API route. |

## Architecture Decisions

- The AI provider is mock-only in the MVP. `EmailGeneratorProvider` makes it straightforward to add OpenAI, Anthropic, Gemini, or another provider later without changing the dashboard UI.
- Protected pages validate Supabase session claims server-side before rendering dashboard content.
- Generated emails are persisted in Supabase Postgres after mock generation succeeds. The dashboard reads the latest saved drafts for the authenticated user.
- TanStack Query is used for the generation mutation because `/api/generate` is server-backed remote state.
- shadcn/ui components are committed as local source files, keeping styling and accessibility under project control.
- Pricing is intentionally UI-only. The Upgrade flow exists, but Stripe and billing persistence are out of scope.
- Supabase schema changes are stored in a user-created migration file; Codex does not run Supabase CLI commands in this repository.

## CI/CD

GitHub Actions runs linting, TypeScript checks, Vitest tests, production build, Playwright smoke tests, and Docker build on pushes to `main` and pull requests. CI uses mock Supabase values for checks that only need environment variables to exist.
