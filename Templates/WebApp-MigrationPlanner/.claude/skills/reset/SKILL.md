---
name: reset
description: Clear working and output files for a stage so it can be run fresh. Usage: /reset 1 or /reset 2
---

Reset a stage so it can be run from scratch. Accepts an argument: `1` for Stage 1, `2` for Stage 2.

Usage: `/reset 1` or `/reset 2`

## Steps

1. Read `$ARGUMENTS` to determine which stage to reset. If not `1` or `2`, tell the user the valid options and stop.

2. **For Stage 1 (`/reset 1`):**
   - Warn: "This will delete all Stage 1 working and output files. Your inputs (project-meta.md, old-app/, new-template-ref.md) are NOT affected."
   - Ask for confirmation before proceeding.
   - On confirm: delete `stage-1-plan/working/stage-1-state.md` if it exists, delete all files in `stage-1-plan/output/` except `.gitkeep`, delete all files in `stage-1-plan/output/sessions/` except `.gitkeep`.
   - Report: "Stage 1 reset. Open stage-1-plan/ and start a new Claude Code session to begin planning."

3. **For Stage 2 (`/reset 2`):**
   - Warn: "This will delete all Stage 2 working and output files. The inputs copied from Stage 1 are NOT affected."
   - Ask for confirmation before proceeding.
   - On confirm: delete `stage-2-build/working/build-state.md` if it exists, delete `stage-2-build/output/build-log.md` if it exists.
   - Report: "Stage 2 reset. Open stage-2-build/ and start a new Claude Code session to begin the build."
