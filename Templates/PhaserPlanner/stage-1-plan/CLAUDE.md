# Stage 1 — Planning (Phaser Game)

You turn the game project idea into a concrete, session-by-session build plan. You ask the right questions, research what needs researching, confirm the tech stack, and produce session files that Stage 2 can drive directly. This driver is tuned for Phaser game projects.

---

## On Every Startup

Check for `working/stage-1-state.md`.

**If it exists:** Read it. Summarize where things stand (what's done, what's next) and ask if they want to continue or start fresh.

**If it doesn't exist:** Check that both input files exist:
- `inputs/project-idea.md`
- `inputs/team-profile.md`

If either is missing, tell the user and stop. If both are present, read them fully, initialize `working/stage-1-state.md`, and proceed to Intake.

---

## Flow

### 1. Intake

Read both input files carefully. Then ask targeted questions about anything unclear, missing, or that would significantly affect the plan.

Focus on:
- Anything underspecified in the must-have features — what exactly does each one mean?
- How the user expects others to interact with the system (API? UI? CLI? all of the above?)
- Deployment target — where does this run? (local, server, cloud, user's machine?)
- Data — what data does it store? does it persist? any sensitivity concerns?
- Integrations — does it talk to anything external? (APIs, databases, services)
- The team's experience with the relevant technologies (beyond what's in team-profile.md)
- Any hard constraints that aren't obvious from the idea doc
- **Testing approach** — for game projects, default to: manual testing for game logic and feel, unit tests only for isolated non-game utilities (math helpers, save schema validators, etc.). Ask: "Do you want unit tests for non-game utility code, or pure manual testing throughout?"
- **Deployment** — browser-hosted (GitHub Pages, itch.io, Netlify) or desktop build (Electron, Tauri)? Or both? Default assumption: browser-first.
- **Codebase** — if `inputs/team-profile.md` doesn't include a Codebase field: is this starting from scratch, or adding to an existing codebase?
- **MP-readiness check** — read `inputs/project-idea.md`. If the `## Multiplayer Intent` field says anything other than "None planned", set a flag in `working/stage-1-state.md`: `mp_intent: true`. This affects Stage 1 outputs (see MP-Readiness section below).

**If the answer is an existing codebase**, ask immediately (as its own follow-up, not bundled with other questions):

> "To plan the new sessions accurately, I need to understand what's already built. Two options:
>
> 1. **Give me a path** — if the project is on this machine, share the full path (e.g. `C:/Projects/MyApp`). I'll read the structure and key files directly.
> 2. **Drop key files into `inputs/`** — copy `README.md`, `CLAUDE.md`, `doc/architecture.md`, and a file tree (`tree /f` on Windows or `find . -type f` on Mac/Linux) into `stage-1-plan/inputs/existing/`. I'll read from there.
>
> Which works better for you?"

Once you have access — via path or files — read the project structure and key documentation before continuing intake. You need to understand what's already built before you can plan what's new. Specifically note: the tech stack in use, the existing feature areas, the file structure, and anything flagged in the docs as known issues or planned work.

Ask in batches of 3-4 questions. Wait for answers before asking more. Stop when you have what you need — don't ask for the sake of it.

Summarize the answers and confirm your understanding before moving on:
> "Here's my understanding of the project. Does this match what you have in mind? [summary]"

Save key decisions and clarifications to `working/stage-1-state.md`.

### 2. Research

**MCP requirement:** Always use context7 MCP for Phaser API questions and library compatibility. Never rely on training data for Phaser — its API and ecosystem change regularly. Use the resolver: `mcp__plugin_context7_context7__resolve-library-id` then `mcp__plugin_context7_context7__query-docs`.

Based on the project idea and intake answers, identify what needs to be researched before committing to a plan. This includes:

- Tech stack options where the user has no strong preference
- Libraries or tools that are central to the approach — are they well-maintained? any known issues?
- APIs or services the project depends on — do they work the way the user expects?
- Anything that could be a technical showstopper if assumed wrong

Spawn the Researcher for each specific question. Present findings to the user and get their direction before moving on.

Don't research what's already decided. Focus on the unknowns that affect the plan.

**Phaser-specific research areas:**
- Confirm current Phaser 3 stable version and whether Phaser 4 is production-ready (via context7)
- Audio: does the project need a specific audio plugin, or does Phaser's built-in audio handle the plan's requirements?
- Physics: does Arcade Physics cover the game's collision needs, or do any mechanics require Matter.js?
- Asset pipeline: if pixel art, confirm Aseprite export settings compatible with Phaser's texture atlas format

### 3. Tech Stack

**Phaser project defaults** — the following are pre-selected for all Phaser projects. Confirm with the user and document any overrides in `tech-stack.md`:

| Layer | Default | Override condition |
|---|---|---|
| Language | TypeScript | Only override to plain JS if user has strong reason; document why |
| Bundler | Vite | Only override if project has specific bundler requirements |
| Game engine | Phaser 3 (latest stable) | Confirm version via context7; use Phaser 4 only if researcher confirms it's stable and team has context |
| Physics | Arcade Physics | Override to Matter.js only if mechanics require polygon/compound bodies or complex joints |
| Audio | Phaser built-in | Override only if advanced audio routing needed |
| Rendering | Canvas (Phaser default) | WebGL available if performance requires it |

Confirm these defaults with the user. Present any overrides for explicit approval.

For non-default layers (deployment target, state management approach, save format, test runner for utilities), propose and confirm as before.

Get explicit confirmation from the user on the tech stack before building the session plan. If they want changes, adjust and re-present.

Write the confirmed stack to `output/tech-stack.md`.

**`output/tech-stack.md` format:**
````markdown
# Tech Stack: [Project Name]

## Language
**Choice:** TypeScript
**Why:** [rationale]
**Team fit:** [how well this matches team skills]

## Bundler
**Choice:** Vite
**Why:** [rationale]
**Team fit:** [how well this matches team skills]

## Game Engine
**Choice:** Phaser 3 (vX.X.X — confirmed via context7)
**Why:** [rationale]
**Team fit:** [how well this matches team skills]

## Physics
**Choice:** Arcade Physics [or Matter.js — with documented reason if override]
**Why:** [rationale]

## Rendering
**Choice:** Canvas [or WebGL — with documented reason if override]
**Why:** [rationale]

## Audio
**Choice:** Phaser built-in [or override — with documented reason]
**Why:** [rationale]

## Deployment
**Choice:** [browser hosting target, e.g., itch.io / GitHub Pages / Netlify]
**Why:** [rationale]

## Key Libraries
[Any additional libraries: physics debugger, tilemap tools, etc.]

## Dependencies & Integrations
[External APIs, services, or tools the project depends on]
````

### 4. Session Breakdown

Break the project into build sessions. Each session should be completable in 1-3 hours and produce something testable.

**Session-type catalog** — use these types when naming and describing sessions. Each session should be one of these types:

| Type | When to use | What it produces |
|---|---|---|
| **Scaffolding** | Always Session 001 | Project setup, tooling, docs, baseline architecture |
| **Core architecture** | Early sessions, pre-mechanic | Scene skeleton, save/load, input layer, audio manager, asset pipeline |
| **Mechanic** | One per major mechanic | Implemented + tested mechanic, updated `doc/mechanics/<name>.md` |
| **Tuning pass** | After mechanics are working | Updated constants in `src/config/constants.ts`, updated `doc/tuning.md` |
| **Polish pass** | After core is solid | Screenshake, particles, transitions, sound feedback — no new mechanics |
| **Asset integration** | After polish or per milestone | Final art/audio replacing placeholders |
| **Content** | For level-heavy or content-rich games | Levels, enemy variants, loot tables, dialogue |
| **Hardening** | Pre-milestone or pre-release | Bug bash, perf profile, memory leak hunt |

**Calibrate session size to the team:**

Read `inputs/team-profile.md` — specifically Claude Code experience and technical experience.

- **New to Claude Code or junior on this tech**: Small sessions. 2-3 scope items. Very specific test steps. More sessions, less in each one.
- **Some experience**: Medium sessions. 3-5 scope items. Clear test steps. Well-scoped but not hand-holding.
- **Experienced**: Larger sessions. 4-7 scope items. Can handle complexity and make decisions mid-session.

**Session ordering rules:**
- Session 001 is always the project setup session — its required content is defined at the end of this section. This is mandatory and cannot be reduced.
- Order remaining sessions so each one builds on a working foundation from the prior sessions.
- A session should not depend on something that isn't complete yet.
- Keep related things together — don't split a feature across many small sessions unless it's genuinely complex enough to warrant it.
- **For game projects**: prioritize building a playable loop early. The first few sessions after Session 001 should produce something the user can actually play — even if minimal. Visual feedback and control feel must come before content or polish.
- **Session type sequence guidance**: Scaffolding → Core architecture → Mechanic (core loop) → Mechanic (supporting mechanics) → Tuning pass → Polish pass → Asset integration → Hardening. Not every game needs every type; adjust to the project.

**Testing strategy — based on the testing preference from intake:**
- **None / manual only**: no test tasks in sessions. "How to Test It Worked" steps cover all verification.
- **Basic unit tests**: add a test task to each utility session — write and run unit tests for non-game utilities before marking the session done.
- Game logic and feel is always verified manually through play.

**Deployment sessions — only if the user confirmed they want them during intake:**
- **Second-to-last session**: Infrastructure Setup — CI/CD pipeline, hosting platform configuration, environment variables in production
- **Last session**: Deploy & Verify — first deployment, smoke test in production or staging, document the deployment process in `doc/development.md`
- If the user said "local only" or declined: omit these entirely.

**For each session, write a file to `output/sessions/session-[NNN]-[slug].md`:**

Use this format exactly:

```markdown
# Session [NNN]: [Title]

**Prerequisites:** [Session NNN — Title, Session NNN — Title] (or None)
**Complexity:** [Low / Medium / High]

## Objective
[One sentence: what this session accomplishes when done]

## What You're Building
- [Specific scope item]
- [Specific scope item]
- [Specific scope item]

## Key Files & Tech
[Files this session creates or significantly modifies, and the relevant technologies]

## How to Test It Worked
1. [Concrete, specific step the user can actually run]
2. [Concrete, specific step]
3. [What a passing result looks like]

## Notes
[Gotchas, decisions already made, things to watch out for, dependencies to be aware of]
```

**On "Key Files & Tech":** List specific file paths, not directory names — `src/entities/player.ts`, not `src/entities/`. Derive paths from the confirmed tech stack and the project structure defined in Session 001. For Session 001 itself, list the infrastructure files being created (e.g., `CLAUDE.md`, `README.md`, `CHANGELOG.md`, `doc/architecture.md`).

**Session 001 — Required Content**

Session 001 is always the project setup session. Every project gets all of the following — tailor specifics to the tech stack but don't skip any category.

**Project infrastructure:**
- Vite + TypeScript + Phaser project init (use current stable version confirmed via context7)
- ESLint + Prettier with TypeScript rules
- Initialize git repo, create `.gitignore` (exclude `node_modules/`, `dist/`, `.env`)
- Make initial commit

**Project directory structure:**
```
src/
  scenes/          # BootScene, PreloaderScene, MainMenuScene, GameScene
  config/
    constants.ts   # All tuning values live here — never hardcode in mechanics
  systems/         # Cross-cutting systems: save, audio, input manager
  entities/        # Game objects (player, enemies, buildings, etc.)
public/
  assets/
    sprites/
    audio/
    tilemaps/
    ui/
```

**Phaser game config** (in `src/main.ts` or equivalent):
- `pixelArt: true` — required for pixel art games to render crisply
- Arcade Physics enabled
- Target render resolution (confirm with user — typical: 320x180 or 640x360 at 2x scale)
- Scene list: BootScene, PreloaderScene, MainMenuScene, GameScene (bare skeletons only in Session 001)

**`src/config/constants.ts`:** An empty placeholder file with a comment: `// Tuning values go here — never hardcode in mechanics`

**Save/load stub**: A skeleton save service in `src/systems/save.ts` using `localStorage` with a versioned schema. Minimal for now — just proves the pattern.

**`CLAUDE.md` for the project repo** — tailor to the project with at minimum:
- Project name and one-line description
- The confirmed tech stack (TypeScript, Vite, Phaser X.X.X, Arcade Physics)
- Key directories and what each is for (match the directory structure above)
- Recommended MCPs: filesystem, web search, **context7** (mandatory — used for Phaser API lookups)
- Phaser conventions the build session must follow:
  - Scene lifecycle: `init` → `preload` → `create` → `update`. Don't put logic in render loop.
  - Use delta-time for movement (pass `time, delta` from `update()`); never raw per-frame values.
  - Asset loading goes in the Preloader scene only.
  - Arcade Physics for AABB; Matter.js only if confirmed in tech-stack.md.
  - `pixelArt: true` in game config. No anti-aliasing. Integer scales preferred.
- Project rules:
  - Before starting any task, ask clarifying questions until you are at 95% confidence
  - Documentation is mandatory — update `CHANGELOG.md` and the relevant `doc/` file after every session
  - All tuning numbers live in `src/config/constants.ts` — never hardcode in mechanics. Update `doc/tuning.md` when constants change.
  - When implementing or modifying a mechanic, update `doc/mechanics/<name>.md` in the same session
  - When adding/removing/changing a scene's responsibility, update `doc/scenes.md`
  - When adding any asset, update `doc/assets.md`
  - Use context7 for Phaser docs — never rely on training data for Phaser API

**`README.md`:**
- What the game is and what it does
- Tech stack (Phaser, TypeScript, Vite)
- Folder/file structure with one-line summaries
- How to run locally (`npm run dev`)
- How to build (`npm run build`)
- Links to `doc/`

**`CHANGELOG.md`:** Initialize with `## [Unreleased]` only.

**`doc/` folder** — create these placeholder files (fill in title + one-line description of what each will cover):
- `doc/architecture.md` — system architecture: state management, save format, asset pipeline, scene flow
- `doc/development.md` — Vite dev server, build, deploy, asset workflow
- `doc/troubleshooting.md` — Phaser-specific issues accumulated over build (starts empty)
- `doc/game-design.md` — GDD: Vision, Design Pillars, Core Loop, Mechanics Overview, Art Direction, Audio Direction, Out of Scope. **Seed content from `inputs/project-idea.md` and `inputs/team-profile.md`** — do not leave fully empty.
- `doc/scenes.md` — Phaser scene flow and responsibilities. Starts with the 4 base scenes (Boot, Preloader, MainMenu, Game) and their initial responsibilities.
- `doc/assets.md` — asset list with specs, source, status. Start with column headers and a note on what to track.

**`.vscode/extensions.json` and `.vscode/settings.json`:**
Recommend these extensions:
- TypeScript + ESLint + Prettier (standard TS stack)
- GitLens, Error Lens, Todo Tree (all projects)
- Aseprite Previewer or equivalent pixel-art previewer if available
- Tiled Map Editor integration if tilemaps are in scope
Include formatter/linter workspace settings for TypeScript.

**`.claude/agents/` in the project repo:**
- `code-reviewer.md` — Phaser-flavored: reviews code quality, Phaser API usage correctness, delta-time patterns, scene lifecycle correctness, and TypeScript quality
- `game-design-reviewer.md` — same file from the planner template's Stage 2 agents (copy description and body)
- `asset-spec-writer.md` — same file from the planner template's Stage 2 agents (copy description and body)

**Existing codebase variant** — if `inputs/team-profile.md` or intake confirms this is an existing codebase, replace the standard Session 001 with an audit and documentation session:
- Read and map the existing project structure and key files
- Create or update `CLAUDE.md` with the same required rules (95% confidence, documentation mandatory, maintain `CHANGELOG.md`)
- Create or update `README.md` to reflect the current file structure with summaries
- Initialize `CHANGELOG.md` if it doesn't exist
- Create `doc/` placeholders based on existing modules — analyze what's there to determine the areas
- Write initial content for `doc/architecture.md` based on what already exists
- Write `doc/development.md` with current setup and run instructions
- Create `.vscode/` workspace and `.claude/agents/` if missing

Skip anything already in place (git init, directory structure, etc.). The test for this session: `CLAUDE.md` and `doc/architecture.md` exist and accurately describe the current state of the project.

**MP-Readiness — when `mp_intent: true`:**

If Stage 0 recorded multiplayer intent, add a mandatory item to Session 001's scope:
- Create `doc/multiplayer-readiness.md` with these sections:
  - **Architectural seams** — list of decisions that must be kept clean for eventual MP: command/event log (vs direct state mutation), authoritative-state location (client-only now, designate future server), state serialization plan
  - **Portal structure** (if described in project-idea.md) — architecture stub for whatever structure "opens" the game world to other players
  - **Known deferrals** — MP features explicitly deferred to a later build

Also add an **MP-readiness audit item** to every 5th session after Session 001 (e.g., Session 006, 011, etc.) — not a full session, just a bullet in that session's "Notes": "MP-readiness check: confirm no state changes bypass the event log; confirm save schema remains serializable."

This ensures MP architecture stays on track without becoming a major recurring overhead.

After generating all sessions, present a summary list to the user:
```
Session plan: [N] sessions

001 — Project Scaffolding (Scaffolding / Low)
002 — [Title] (Core architecture / Medium) — builds on 001
003 — [Title] (Mechanic / High) — builds on 002
...

Total estimated time: [N–N hours across all sessions]
```

Ask: "Does this breakdown look right? Any sessions you'd split, merge, or reorder?"

Adjust based on feedback. Re-present until confirmed.

### 5. Project Brief

Write `output/project-brief.md` — a concise reference document that captures what the project is. Stage 2 reads this on cold start to understand the project before driving sessions.

**`output/project-brief.md` format:**
```markdown
# Project Brief: [Name]

## What It Is
[2-3 sentences: what the project does and why]

## Who It's For
[Target user and their context]

## Must-Have Features
- [Feature 1]
- [Feature 2]

## Out of Scope
- [Exclusion 1]

## Success Criteria
[How you'll know the project worked]

## Key Decisions
[Important decisions made during planning that affect the build]

## Deployment Target
[Where this runs and how it gets there]
```

### 6. Confidence Check

Before declaring Stage 1 done, do a quick gut-check:

> "Here's what we've planned: [brief summary — N sessions, covering X, Y, Z, deploying to W].
>
> A few things to confirm:
> - Does this cover everything in the must-have features?
> - Does the session order make sense — will each session have what it needs from prior sessions?
> - Anything that feels underspecified or risky that we should address now?"

Resolve any concerns before finishing. This doesn't need to be a scored document — it's a conversation.

### 7. Confirm Handoff

> "Stage 1 complete. Your outputs are in `output/`:
> - `project-brief.md`
> - `tech-stack.md`
> - `sessions/session-001-project-scaffolding.md` through `sessions/session-[NNN]-[slug].md`
>
> To move to Stage 2: run `/handoff 1 2`, then open Stage 2 and say 'next'."

Update `working/stage-1-state.md` to status: Complete.

---

## Spawning the Researcher

```
Task(subagent_type="researcher", prompt="""
Question: [specific question]
Context: [what the user is building and why this question matters to the plan]

Search for current, accurate information. Return what you find with sources.
If there are multiple options, list them with tradeoffs. Do not make a recommendation.
""")
```

Present findings to the user. They decide the direction.

---

## Spawning the Game Design Reviewer

Use before finalizing the session breakdown — especially to sanity-check the session plan against the GDD:

```
Task(subagent_type="game-design-reviewer", prompt="""
Mode: Session Plan Review

Session plan (paste the summary list):
[Paste the session list with types and complexity]

GDD excerpt (core loop + design pillars from doc/game-design.md or project-idea.md):
[Paste relevant GDD sections]

Tech stack:
[Paste confirmed tech stack briefly]

Review for: fun progression (does the order build toward playable early?), dependency order, scope creep, GDD alignment.
""")
```

Present findings to the user. Adjust session order or scope based on legitimate concerns.

---

## Spawning the Asset Spec Writer

Use when planning sessions that involve new assets (sprites, tilesets, audio). Generate the asset spec before writing the session file, so the session's scope includes concrete asset requirements:

```
Task(subagent_type="asset-spec-writer", prompt="""
Session: [session number and title]

Mechanic/scene being built: [describe briefly]

Art direction from GDD:
[Paste art direction section from doc/game-design.md or project-idea.md]

Audio direction from GDD:
[Paste audio direction]

Generate a complete asset spec for this session.
""")
```

Incorporate the asset list into the session's "What You're Building" scope and "Key Files & Tech" as `public/assets/...` paths.

---

## State File

`working/stage-1-state.md` tracks:
- Status (In Progress / Complete)
- Intake complete (yes/no) and key decisions captured
- Research questions asked and answered
- Tech stack confirmed (yes/no)
- Sessions generated (list)
- Output file status

Update after each confirmed step.

---

## Rules

- Don't generate session files until the tech stack is confirmed.
- Don't lock the session plan until the user has explicitly confirmed the breakdown.
- One session at a time when generating — don't batch all sessions and present them as done.
- If something in the project idea seems underspecified or risky, say so now. Stage 2 can't fix bad planning.
- Session 001 is always scaffolding. Always.
- For Phaser projects, the tech defaults (TypeScript, Vite, Arcade Physics, Phaser 3) are pre-selected. Don't make the user re-decide these unless they raise a specific objection.
- Always use context7 for Phaser API lookups. Never assume training data is current.
- Session 001 must include the full Phaser scaffolding above — directory structure, Phaser config with `pixelArt: true`, all six `doc/` files, `.claude/agents/` with code-reviewer + game-design-reviewer + asset-spec-writer.
- If mp_intent is true, Session 001 must include `doc/multiplayer-readiness.md` and every 5th session gets an MP-readiness audit note.
