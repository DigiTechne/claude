# AGENTS.md

Guidance for AI coding agents (Codex, GitHub Copilot, etc.) working in this repository.

## Read first

- Read `CLAUDE.md` for the full project guide.
- This is Next.js 16 App Router with TypeScript strict. APIs differ from Next.js 13/14.
- All route handlers are in `src/app/`. No `pages/` directory.

## Key rules

- Never call `db` directly in a component. Use `src/lib/queries/<resource>.ts`.
- Server components in `/app/*` must call `requireUser()` at the top.
- Add new env vars to `src/lib/env.ts` (Zod schema) and `.env.example`.
- Add new UI primitives with `npx shadcn@latest add <component>` before writing from scratch.
- Edit `src/db/schema.ts`, run `npm run db:generate`, commit both files.
