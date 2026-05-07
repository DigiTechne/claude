# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## What this is

A Next.js 16 App Router template for public web apps. Stack: TypeScript strict, Drizzle ORM + Postgres, better-auth (email/password), Resend + React Email, shadcn/ui (base-nova style) + Tailwind 4, Vitest + Playwright.

## Bootstrap (first time)

```bash
cp .env.example .env.local   # fill in your values
docker compose up -d         # starts Postgres on localhost:5432
npm install
npm run db:migrate            # applies schema migrations
npm run dev                   # starts dev server at http://localhost:3000
```

## Common commands

| Command                 | What it does                            |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start dev server (Turbopack)            |
| `npm run build`         | Production build                        |
| `npm run lint`          | ESLint + Prettier check                 |
| `npm run format`        | Auto-format all files                   |
| `npm run typecheck`     | TypeScript strict check                 |
| `npm run test -- --run` | Vitest unit tests (one-shot)            |
| `npm run test:e2e`      | Playwright e2e (needs running server)   |
| `npm run db:up`         | Start Postgres via docker-compose       |
| `npm run db:generate`   | Generate Drizzle migrations from schema |
| `npm run db:migrate`    | Apply pending migrations                |
| `npm run db:studio`     | Open Drizzle Studio (DB browser)        |
| `npm run rename`        | Rename template to your project name    |

## Architecture

### Route groups

```
src/app/
  (marketing)/     # Public routes, SSR'd for SEO. No auth check.
  (auth)/          # Login, signup, reset, verify. No auth check.
  app/             # Auth-walled. layout.tsx calls requireUser().
  api/auth/        # better-auth catch-all route handler.
```

### Protecting routes

Every server component or server action in the `/app` route group starts with:

```typescript
const user = await requireUser(); // from @/lib/auth-helpers
```

`requireUser()` redirects to `/login` if not authenticated. `getOptionalUser()` returns null instead of redirecting.

### Database

All DB access goes through `src/lib/queries/<resource>.ts`. Never import `db` directly in a page or component.

```typescript
// src/lib/queries/posts.ts
export async function getPostById(id: string) { ... }

// src/app/app/some-page/page.tsx
const user = await requireUser();
const post = await getPostById(id);
```

Edit `src/db/schema.ts` then run `npm run db:generate` to create a migration. Commit both the schema change and the generated migration file.

### Auth

better-auth handles sessions. The session cookie is set by the `/api/auth/[...all]` route handler. Client-side auth calls use `authClient` from `src/lib/auth-client.ts`.

Server-side: `auth.api.getSession()` via `requireUser()` / `getOptionalUser()`
Client-side: `authClient.signIn.email()`, `authClient.signUp.email()`, `authClient.signOut()` etc.

### Email

`sendEmail()` from `src/lib/email.ts` wraps Resend. In development (no `RESEND_API_KEY`), emails log to the console. Email templates are React components in `src/emails/`.

### Environment variables

Only access env through `src/lib/env.ts`. Never use `process.env.X` directly in app code. Add new vars to `src/lib/env.ts` (Zod schema), `.env.example`, and the CI workflow `env:` blocks.

### Forms

Auth forms use better-auth client methods. App forms (settings, etc.) use server actions with `useActionState`. Use `zod` for validation in server actions.

### UI components

shadcn/ui (base-nova style). Add new primitives with `npx shadcn@latest add <component>`. Check shadcn before adding a new UI dependency.

## Deploying

See `docs/deploy/coolify.md` (recommended) or `docs/deploy/docker-caddy.md` for step-by-step instructions.

## Renaming this template

Run `npm run rename <your-project-name>` to update all references. Then update:

- `src/app/(marketing)/page.tsx` — app name and tagline
- `src/app/app/layout.tsx` — header title
- `src/lib/email.ts` — sender `from` address domain
