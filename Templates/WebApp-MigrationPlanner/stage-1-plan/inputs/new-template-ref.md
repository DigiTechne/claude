# New Template Reference

This is a quick reference for the migration planner. The target stack is `template-next-stack` — a Next.js 16 App Router template. The full source of truth is:
- `template-next-stack/CLAUDE.md` — commands, conventions, architecture
- `template-next-stack/docs/architecture.md` — request flow, data layer, auth flow

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router, TypeScript strict |
| Database | Postgres via Drizzle ORM (`postgres` npm driver) |
| Auth | better-auth v1 (email + password, email verification required) |
| Email | Resend + React Email (`react-email` package) |
| UI | shadcn/ui base-nova style (uses @base-ui/react, not Radix) + Tailwind 4 |
| Testing | Vitest 3 + Playwright |
| Deploy | Docker (multi-stage, standalone output) + Caddy reverse proxy |

---

## Route Groups

```
src/app/
  (marketing)/     Public, SSR'd for SEO. No auth check. Landing, pricing, about.
  (auth)/          Login, signup, reset, verify. No auth check.
  app/             Auth-walled. layout.tsx calls requireUser(). Dashboard, settings.
  api/auth/        better-auth catch-all route handler — do not modify.
```

---

## Key Conventions

**All DB access goes through query modules.** Never import `db` directly in a page or component.
```
src/db/schema.ts              — Drizzle table definitions
src/db/migrations/            — generated migration files (never hand-edit)
src/lib/db.ts                 — Drizzle client (singleton)
src/lib/queries/<resource>.ts — per-resource query functions
```

**Protect routes with `requireUser()`.**
```typescript
import { requireUser } from "@/lib/auth-helpers";
const user = await requireUser(); // redirects to /login if not authenticated
```
`getOptionalUser()` returns null instead of redirecting — use on public pages that personalize for logged-in users.

**App mutations use server actions + Zod.**
```typescript
// src/app/app/_actions/<feature>.ts
"use server";
import { z } from "zod";
import { requireUser } from "@/lib/auth-helpers";
const schema = z.object({ ... });
export async function myAction(prevState: unknown, formData: FormData) {
  const user = await requireUser();
  const data = schema.parse(Object.fromEntries(formData));
  // ... call query function, return result
}
```
No react-hook-form. Client components use `useActionState` to call server actions.

**Env access only through `src/lib/env.ts`.** Never `process.env.X` in app code. Add new vars to the Zod schema there and to `.env.example`.

**Email via `sendEmail()` in `src/lib/email.ts`.** Without `RESEND_API_KEY` in `.env.local`, emails log to the console (dev mode). Email templates are React components in `src/emails/`.

**UI: check shadcn before adding a new dependency.** Add primitives with `npx shadcn@latest add <component>`. The style is base-nova — no Radix primitives, uses @base-ui/react. Toast is via sonner (`src/components/ui/sonner.tsx`).

**Schema changes:** edit `src/db/schema.ts`, run `npm run db:generate`, commit both the schema change and the generated migration. Never hand-write migration files.

---

## Adding a New Feature (the standard pattern)

1. Add table(s) to `src/db/schema.ts`
2. `npm run db:generate` — commit migration
3. Add query functions to `src/lib/queries/<resource>.ts`
4. Add server actions if needed: `src/app/app/_actions/<feature>.ts`
5. Build the page: `src/app/app/<feature>/page.tsx`

---

## Auth Flow (already implemented in the template)

The template ships with the full auth flow: signup, email verification, login, forgot password, reset password, logout, account delete. Sessions are handled by better-auth. When migrating an app, auth sessions from the old app cannot be transferred — users will need to create new accounts or be re-invited.

---

## Commands (run in the new app repo, Console 2)

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server (Turbopack) at http://localhost:3000 |
| `npm run lint` | ESLint + Prettier check |
| `npm run typecheck` | TypeScript strict check |
| `npm run test -- --run` | Vitest unit tests |
| `npm run db:generate` | Generate Drizzle migration from schema changes |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:studio` | Drizzle Studio DB browser |
| `npm run rename <name>` | Rename template (run once at bootstrap) |
