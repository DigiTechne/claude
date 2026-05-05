# Phaser Game Planner

A three-stage pipeline for planning and building 2D Phaser games using Claude Code. Opinionated defaults for TypeScript, Vite, and Arcade Physics. Bakes in game-dev conventions (GDD, scene docs, tuning values, asset specs) that you'd otherwise have to figure out yourself.

```
Stage 0 — Idea     →     Stage 1 — Plan     →     Stage 2 — Build
Develop and scope        Research, tech stack,      Prompt loop: generate,
the game idea            and session breakdown       run, evaluate, repeat
```

Each stage runs as its own Claude Code session in its own directory. Files move between stages via built-in skills.

---

## Stages

### Stage 0 — Idea (`stage-0-idea/`)
Collaborative idea development. Describe your rough concept and work through it conversationally — what you're building, who it's for, what's in scope, what's not, and whether it's achievable. Asks game-specific questions: genre, core loop, art style, audio direction, platform target, and multiplayer intent. Ends with two files: `project-idea.md` and `team-profile.md`.

**Start:** `cd stage-0-idea && claude`  
**Prompt:** Describe your game idea.

---

### Stage 1 — Plan (`stage-1-plan/`)
Deep intake, research, tech stack decisions, and a concrete session-by-session build plan. Ships with Phaser tech defaults (TypeScript + Vite + Phaser 3 + Arcade Physics), a session-type catalog (8 types), Phaser scaffolding in Session 001 (scene skeleton, asset pipeline, tuning constants, save stub), and context7 MCP for live Phaser doc lookups. Sessions are sized to your team's experience so each one fits comfortably in a Claude Code session without drift. Ends with `project-brief.md`, `tech-stack.md`, and one session file per build session.

**Start:** `cd stage-1-plan && claude`  
**Prompt:** `Begin planning.`

---

### Stage 2 — Build (`stage-2-build/`)
Your game companion for the actual build. Loads the plan, walks through sessions one at a time, generates Claude Code prompts task by task, evaluates your results, troubleshoots failures (with web search when needed), and tracks what's been built and what changed. Step 2.5 documentation prompts cover game-specific files (mechanics docs, tuning docs, asset docs, scenes doc, GDD) in addition to CHANGELOG and architecture. You run prompts in a separate Claude Code session pointed at your game repo and paste results back here.

**Start:** `cd stage-2-build && claude`  
**Prompt:** `next` (or just start talking)

---

## Running the Pipeline

### For each new game
1. Copy this entire `Planner-TEMPLATE/` folder to a new location — one copy per game
2. Run `/status` to confirm it's clean
3. Run Stage 0, then Stage 1, then Stage 2 in sequence

### Stage transitions
Run these skills inside a Claude Code session from any stage directory:
- `/handoff 0 1` — copy Stage 0 outputs → Stage 1 inputs
- `/handoff 1 2` — copy Stage 1 outputs → Stage 2 inputs

### Resetting a stage (for a fresh game on a used copy)
- `/reset 0` — clear Stage 0 working/ and output/
- `/reset 1` — clear Stage 1 working/, output/, and inputs/
- `/reset 2` — clear Stage 2 working/ and output/ (keeps your session plan in inputs/)

### Skipping Stage 0
If you already have a clear idea, skip Stage 0 and write `project-idea.md` and `team-profile.md` directly into `stage-1-plan/inputs/`. Stage 1's intake will cover any gaps.

---

## Session Types

Stage 1 plans using these session types. Understanding them helps you know what to expect when reviewing the session breakdown:

| Type | What it builds | Time estimate |
|---|---|---|
| **Scaffolding** | Project setup, tooling, all doc files, Phaser baseline | 2-3 hours |
| **Core architecture** | Scenes, save/load, input layer, audio manager, asset pipeline | 1-3 hours each |
| **Mechanic** | One full mechanic: implemented, tested, documented | 1-3 hours |
| **Tuning pass** | Number adjustments only — no new code | 30-60 min |
| **Polish pass** | Screenshake, particles, transitions, sounds | 1-2 hours |
| **Asset integration** | Replace placeholders with final art/audio | 1-2 hours |
| **Content** | Levels, enemy variants, loot, dialogue | varies |
| **Hardening** | Bug bash, perf profiling, memory check | 1-3 hours |

---

## Building a New Version of an Existing Game (v2.0, feature releases, etc.)

Use this pipeline for a new major version or significant feature release the same way you would for a new game — one fresh copy of Planner-TEMPLATE per version. Don't reuse the v1.0 planner folder; its state files and completed sessions belong to v1.0.

### Stage 0 — Skip it
You already know what you're building. Write `project-idea.md` and `team-profile.md` directly into `stage-1-plan/inputs/` based on the feedback and requirements you've collected. Treat your accumulated feedback as your requirements input. Scope v2.0 the same way you'd scope a new game: must-haves, nice-to-haves, explicitly out of scope.

### Stage 1 — Existing codebase path
During intake, confirm this is an existing codebase. Stage 1 will then ask for access to the game — either a local path or a snapshot of key files dropped into `stage-1-plan/inputs/existing/`. It reads what's already built before planning anything new.

What changes from a greenfield plan:
- **Session 001** becomes an audit session — update `CLAUDE.md`, `README.md`, and `doc/architecture.md` to reflect the actual current state of the game before any new work begins
- **Tech stack** conversation is mostly confirmations and additions, not decisions from scratch
- **Session files** cover only what's new or changing — existing features that aren't being touched don't get sessions

### Stage 2 — Same loop, different Session 001
Session 001 runs an audit prompt against the existing game repo rather than scaffolding a new one. After that it's the standard task-by-task build loop.

### What to put in `project-idea.md` for a new version
Focus on the delta — what v2.0 adds, changes, or removes relative to v1.0. Include:
- A brief description of what the existing game does (Stage 1 needs this context)
- The new features or changes being built
- Anything being removed or reworked
- Known issues from v1.0 that v2.0 should address
- Success criteria for the new version

---

## What Stage 2 Needs to Run
- A separate Claude Code session open in your actual game repo (where prompts get executed)
- You paste prompts from Stage 2 into that session, run them, and paste results back
- Stage 2 never touches your game repo directly — it drives through you

---

## Reusing the Template
Each game gets its own copy of this folder. The template itself stays clean.  
For Godot or Unity projects, use the engine-specific fork of this template.
