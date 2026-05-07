# template-next-stack

A production-ready Next.js starter for public web apps. Clone, rename, ship.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript strict
- **Database**: Postgres + Drizzle ORM
- **Auth**: better-auth (email/password, email verification)
- **Email**: Resend + React Email
- **UI**: shadcn/ui (base-nova) + Tailwind 4
- **Testing**: Vitest + Playwright
- **Deploy**: Docker + Caddy (self-hosted) or Coolify

## Quick start

```bash
git clone <repo-url> my-app
cd my-app
npm run rename my-app           # updates package.json, compose files, CLAUDE.md
cp .env.example .env.local      # fill in DATABASE_URL, BETTER_AUTH_SECRET, etc.
docker compose up -d            # Postgres on localhost:5432
npm install
npm run db:migrate
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    (marketing)/    Public pages (SSR, indexable)
    (auth)/         Login / signup / reset / verify
    app/            Auth-walled dashboard and features
    api/auth/       better-auth route handler
  components/ui/    shadcn/ui primitives
  db/               Drizzle schema + migrations
  emails/           React Email templates
  lib/
    auth.ts         better-auth server config
    auth-client.ts  better-auth browser client
    auth-helpers.ts requireUser() / getOptionalUser()
    db.ts           Drizzle client
    email.ts        sendEmail() wrapper
    env.ts          Zod-validated env vars
    queries/        One file per DB resource
```

## Deploy

See [docs/deploy/coolify.md](docs/deploy/coolify.md) or [docs/deploy/docker-caddy.md](docs/deploy/docker-caddy.md).

## License

MIT
