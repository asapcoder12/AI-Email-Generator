---
name: nextjs-docs
description: Generates comprehensive documentation for Next.js applications and writes it to a docs/ folder. Use this skill whenever a user asks to document a Next.js project, generate docs, write a README, document components, document API routes, create an architecture overview, or write a setup/deployment guide. Trigger on phrases like "write docs", "document my app", "generate documentation", "document this component", "document my API routes", or "create a README" in any Next.js context.
---

# Next.js Documentation Generator

You are generating documentation for a Next.js application. Your job is to explore the codebase, understand how it works, and write clear, accurate documentation into a `docs/` folder.

## Step 1: Explore the codebase

Before writing anything, build a mental model of the project. Read these in order:

1. `package.json` — dependencies, scripts, project name
2. `next.config.js` / `next.config.ts` — Next.js configuration, plugins, redirects
3. Top-level directory structure — is this App Router (`app/`) or Pages Router (`pages/`)?
4. `.env.example` or `.env.local` if present — environment variables
5. `README.md` if it exists — what's already documented

Then explore:
- **Components**: `components/`, `src/components/`, or wherever they live
- **Pages/Routes**: `app/` (App Router) or `pages/` (Pages Router)
- **API routes**: `app/api/` or `pages/api/`
- **Config/utilities**: `lib/`, `utils/`, `hooks/`, `context/`

You don't need to read every file — be strategic. Prioritize files that reveal structure and intent. Read TypeScript interfaces and prop types carefully; they're the most reliable source of truth for component APIs.

## Step 2: Create the docs/ folder and generate these files

Generate all of the following unless the user specifies otherwise. Create `docs/` at the project root.

---

### `docs/README.md` — Project Overview

```markdown
# [Project Name]

[One paragraph: what this app does and who it's for]

## Tech Stack

- Next.js [version] (App Router / Pages Router)
- [Key dependencies — e.g., Tailwind CSS, Prisma, NextAuth, etc.]

## Quick Start

[Minimal steps to get running locally]

## Documentation

- [Setup Guide](./setup.md)
- [Architecture](./architecture.md)
- [Components](./components.md)
- [API Routes](./api-routes.md)
```

---

### `docs/setup.md` — Setup & Deployment Guide

Cover:
- Prerequisites (Node version, package manager)
- Installation steps (`npm install` / `pnpm install` etc.)
- Environment variables — list every variable from `.env.example` with a description of what it does
- Running locally (`npm run dev`)
- Building for production (`npm run build`)
- Deployment — if you can infer the target (Vercel, Docker, etc.) from config files or scripts, document it. Otherwise write a generic section.

---

### `docs/architecture.md` — Architecture Overview

Cover:
- Routing approach (App Router vs Pages Router) and why it matters
- Folder structure — explain what lives where and why
- Data fetching patterns used (Server Components, `getServerSideProps`, `getStaticProps`, SWR, React Query, etc.)
- Authentication approach if present
- State management if present
- Key third-party integrations (database, CMS, auth provider, etc.)
- Any non-obvious architectural decisions you notice

Keep this honest — only document what you actually observe in the code.

---

### `docs/components.md` — Component Reference

For each significant component you find, document:

```markdown
## ComponentName

[One sentence: what this component does]

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| ... | ... | ... | ... | ... |

### Usage

\```tsx
<ComponentName prop="value" />
\```

[Any important notes about behavior, variants, or constraints]
```

Group related components together (e.g., form components, layout components, UI primitives). Skip internal/private components that aren't meant to be reused.

---

### `docs/api-routes.md` — API Route Reference

For each API route, document:

```markdown
## [METHOD] /api/path

[One sentence: what this endpoint does]

### Request

**Headers** (if auth required):
```
Authorization: Bearer <token>
```

**Body** (for POST/PUT/PATCH):
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ... | ... | ... | ... |

**Query params** (if any):
| Param | Type | Description |
|-------|------|-------------|
| ... | ... | ... |

### Response

**200 OK**
```json
{ ... }
```

**Error responses**:
- `400` — [when]
- `401` — [when]
- `404` — [when]
```

---

## Writing guidelines

**Be specific, not generic.** Every piece of documentation should reflect what you actually found in the code. Avoid boilerplate phrases like "this is a modern web application" — they add noise.

**When you're uncertain, say so.** If you're inferring something (e.g., "this appears to be deployed on Vercel based on the `vercel.json` file"), say so rather than stating it as fact.

**Prop tables over prose.** For components and API routes, structured tables are easier to scan than paragraphs.

**Match the project's style.** If the codebase uses TypeScript strictly, reflect that in type examples. If it's mostly JavaScript, don't introduce TypeScript syntax.

**Don't invent examples.** Usage examples should be based on how the component is actually used in the codebase, not hypothetical usage.

## Step 3: Report what you did

After writing the docs, give the user a short summary:
- Which files you created
- Any components or routes you skipped and why
- Anything you noticed that might be worth improving in the code itself (e.g., missing prop types, undocumented env vars)
