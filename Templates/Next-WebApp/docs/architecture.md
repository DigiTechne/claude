# Architecture

## Overview

Single Next.js 16 App Router application. One server process, one Postgres database, one Docker image. No microservices, no edge runtime, no serverless functions.

## Request flow

```
Browser → Caddy (SSL + reverse proxy) → Next.js server (port 3000)
                                              ↓
                                     Route group dispatch
                                      ├─ (marketing)/*  → SSR, no auth
                                      ├─ (auth)/*       → SSR/client, no auth
                                      ├─ /app/*         → SSR, requireUser()
                                      └─ /api/auth/*    → better-auth handler
                                              ↓
                                     src/lib/queries/*
                                              ↓
                                       Drizzle ORM → Postgres
```

## Auth flow

1. Signup: browser → `authClient.signUp.email()` → `/api/auth/signup` → creates user, sends verification email
2. Verify: user clicks email link → `/verify?token=...` → server verifies token, sets session
3. Login: browser → `authClient.signIn.email()` → `/api/auth/signin` → sets session cookie
4. Protected page: server component calls `requireUser()` → reads session from DB → returns user or redirects

## Data layer

No raw SQL in page files. All queries are in `src/lib/queries/<resource>.ts`. Server components and server actions call these functions. The DB client is a Drizzle instance (`src/lib/db.ts`).

## Adding a new feature

1. Add a table to `src/db/schema.ts`
2. Run `npm run db:generate` → commit the migration
3. Add query functions to `src/lib/queries/<resource>.ts`
4. Add server actions if needed in `src/app/app/_actions/<feature>.ts`
5. Build the page in `src/app/app/<feature>/page.tsx`
