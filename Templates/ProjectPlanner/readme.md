# Claude Code Project Planner

A three-stage pipeline that takes a raw idea through to a fully executed build using Claude Code.

```
Stage 0 — Idea     →     Stage 1 — Plan     →     Stage 2 — Build
Develop and scope        Research, tech stack,      Prompt loop: generate,
the project idea         and session breakdown       run, evaluate, repeat
```

Each stage runs as its own Claude Code session in its own directory. Files move between stages manually or via the `bin/` scripts.

---

## Stages

### Stage 0 — Idea (`stage-0-idea/`)
Collaborative idea development. Describe your rough concept and work through it conversationally — what you're building, who it's for, what's in scope, what's not, and whether it's achievable. Ends with two files: `project-idea.md` and `team-profile.md`.

**Start:** `cd stage-0-idea && claude`  
**Prompt:** Describe your project idea.

---

### Stage 1 — Plan (`stage-1-plan/`)
Deep intake, research, tech stack decisions, and a concrete session-by-session build plan. Sessions are sized to your team's experience so each one fits comfortably in a Claude Code session without drift. Ends with `project-brief.md`, `tech-stack.md`, and one session file per build session.

**Start:** `cd stage-1-plan && claude`  
**Prompt:** `Begin planning.`

---

### Stage 2 — Build (`stage-2-build/`)
Your project companion for the actual build. Loads the plan, walks through sessions one at a time, generates Claude Code prompts task by task, evaluates your results, troubleshoots failures (with web search when needed), and tracks what's been built and what changed. You run prompts in a separate Claude Code session pointed at your project repo and paste results back here.

**Start:** `cd stage-2-build && claude`  
**Prompt:** `next` (or just start talking)

---

## Running the Pipeline

### For each new project
1. Copy this entire `Planner-TEMPLATE/` folder to a new location — one copy per project
2. Run `bin/status.sh` (or `bin/status.ps1`) to confirm it's clean
3. Run Stage 0, then Stage 1, then Stage 2 in sequence

### Stage transitions
```bash
bin/handoff.sh 0 1     # copy Stage 0 outputs → Stage 1 inputs
bin/handoff.sh 1 2     # copy Stage 1 outputs → Stage 2 inputs
```

### Resetting a stage (for a fresh project on a used copy)
```bash
bin/reset.sh 0         # clear Stage 0 working/ and output/
bin/reset.sh 1         # clear Stage 1 working/, output/, and inputs/
bin/reset.sh 2         # clear Stage 2 working/ and output/ (keeps your session plan in inputs/)
```

### Skipping Stage 0
If you already have a clear idea, skip Stage 0 and write `project-idea.md` and `team-profile.md` directly into `stage-1-plan/inputs/`. Stage 1's intake will cover any gaps.

---

## Building a New Version of an Existing Project (v2.0, feature releases, etc.)

Use this pipeline for a new major version or significant feature release the same way you would for a new project — one fresh copy of Planner-TEMPLATE per version. Don't reuse the v1.0 planner folder; its state files and completed sessions belong to v1.0.

### Stage 0 — Skip it
You already know what you're building. Write `project-idea.md` and `team-profile.md` directly into `stage-1-plan/inputs/` based on the feedback and requirements you've collected. Treat your accumulated feedback as your requirements input. Scope v2.0 the same way you'd scope a new project: must-haves, nice-to-haves, explicitly out of scope.

### Stage 1 — Existing codebase path
During intake, confirm this is an existing codebase. Stage 1 will then ask for access to the project — either a local path or a snapshot of key files dropped into `stage-1-plan/inputs/existing/`. It reads what's already built before planning anything new.

What changes from a greenfield plan:
- **Session 001** becomes an audit session — update `CLAUDE.md`, `README.md`, and `doc/architecture.md` to reflect the actual current state of the project before any new work begins
- **Tech stack** conversation is mostly confirmations and additions, not decisions from scratch
- **Session files** cover only what's new or changing — existing features that aren't being touched don't get sessions

### Stage 2 — Same loop, different Session 001
Session 001 runs an audit prompt against the existing project repo rather than scaffolding a new one. After that it's the standard task-by-task build loop.

### What to put in `project-idea.md` for a new version
Focus on the delta — what v2.0 adds, changes, or removes relative to v1.0. Include:
- A brief description of what the existing project does (Stage 1 needs this context)
- The new features or changes being built
- Anything being removed or reworked
- Known issues from v1.0 that v2.0 should address
- Success criteria for the new version

---

## What Stage 2 Needs to Run
- A separate Claude Code session open in your actual project repo (where prompts get executed)
- You paste prompts from Stage 2 into that session, run them, and paste results back
- Stage 2 never touches your project repo directly — it drives through you

---

## Reusing the Template
Each project gets its own copy of this folder. The template itself stays clean.  
Run `bin/reset.sh <stage>` on any stage that has leftover content before starting a new project.
