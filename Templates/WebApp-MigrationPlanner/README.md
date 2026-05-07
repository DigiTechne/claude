# MigrationPlanner-TEMPLATE

A two-stage, dual-console workflow for migrating PHP+Vite apps (built on the Agile MVC template) to the `template-next-stack` Next.js stack.

```
Stage 1 — Plan                    Stage 2 — Build
Audit old app, map features,  →   Prompt loop: Console 1 generates
confirm inventory, generate        one prompt at a time → user runs it
session-by-session plan            in Console 2 → paste results back
```

---

## How It Works

```
Console 1 (Planner)                Console 2 (Worker)
─────────────────────              ─────────────────────────────
MigrationPlanner-birddog/          birddog-next/
  stage-2-build/    ←──prompts──→  (cloned + renamed template-next-stack)
```

Console 1 knows the plan, reads the old app code, and generates prompts.
Console 2 is a Claude Code session in the new app repo that executes them.
You are the relay — paste prompts from Console 1 into Console 2, paste results back.

---

## One Copy Per Migration

Clone this template once per app you're migrating. Don't reuse a copy across migrations — each clone tracks state for one migration.

```
C:\Users\you\Claude\Projects\
  MigrationPlanner-TEMPLATE\    ← this repo (stays clean)
  MigrationPlanner-birddog\     ← clone for BirdDog migration
  MigrationPlanner-judgeautos\  ← clone for JudgeAutos migration
  birddog-next\                 ← the actual new app (Worker console)
  judgeautos-next\              ← the actual new app (Worker console)
```

---

## Setup for a New Migration

### 1. Clone this template

```
git clone <this-repo-url> MigrationPlanner-birddog
cd MigrationPlanner-birddog
```

The per-migration clone does **not** need its own git remote. It's a working folder, not a repo you push.

### 2. Fill in `stage-1-plan/inputs/project-meta.md`

Open the file and fill in every field: app name, target repo name, what the app does, snapshot date, what's new in v2, what's being dropped, any hard constraints, deploy target.

### 3. Copy the old app snapshot into `stage-1-plan/inputs/old-app/`

Copy the relevant source files from the old app into this folder. You don't need to copy everything.

**PHP + Vite (Agile MVC):** focus on:
- PHP controllers and models (`inc/php/`, `myProject/php/`)
- SQL schema file (`Agile/project-files/*.sql`)
- Vite frontend source (`myProject/vite/src/`)
- Any config or credential structure (not actual credentials)

**Create React App (CRA):** focus on:
- `package.json`
- `src/` in full (pages, components, API/service files)
- `.env.example` if present

The `old-app/` folder is gitignored — old app code is never committed inside a MigrationPlanner clone.

### 4. Run Stage 1 (Console 1)

```
cd stage-1-plan
claude
```

The planner will audit the old app, build a feature inventory, ask a few targeted questions, then generate session files. Confirm the feature inventory and session plan when prompted.

### 5. Run `/handoff` to advance to Stage 2

In the same Claude Code session, type `/handoff`. This copies Stage 1 outputs into `stage-2-build/inputs/`.

### 6. Bootstrap the new app repo (Console 2)

```
git clone template-next-stack birddog-next
cd birddog-next
npm run rename birddog
cp .env.example .env.local   # fill in your values
docker compose up -d
npm install
npm run db:migrate
npm run dev                   # verify it boots at http://localhost:3000
```

This becomes Console 2 — keep this session open for the entire migration build.

### 7. Run Stage 2 (Console 1)

Open a new Claude Code session:

```
cd stage-2-build
claude
```

Type `next` to begin Session 001. Console 1 will generate one prompt at a time. Paste each prompt into Console 2, run it, paste the result back into Console 1. Repeat until all sessions complete.

---

## Skills

Available in any Claude Code session opened inside this MigrationPlanner clone:

| Skill | What it does |
|---|---|
| `/status` | Show current migration state — which stage, what's done, what's next |
| `/handoff` | Copy Stage 1 outputs into Stage 2 inputs (run after Stage 1 is complete) |
| `/reset 1` | Clear Stage 1 working and output files for a fresh run |
| `/reset 2` | Clear Stage 2 working and output files for a fresh run |

---

## What's Gitignored

Per-migration clones exclude:
- `stage-1-plan/inputs/old-app/` — old app source code
- `stage-2-build/inputs/old-app/` — same snapshot, copied by `/handoff`
- Runtime files: `working/stage-1-state.md`, `working/build-state.md`, `output/build-log.md`, all generated session files

The template repo itself only tracks the scaffold: CLAUDE.md files, skills, static input templates, and `.gitkeep` placeholders.

---

## First Migration: BirdDog

BirdDog source snapshot is available at `base-vite-agile/claude/birddog/`. Copy it into `MigrationPlanner-birddog/stage-1-plan/inputs/old-app/` to begin.
