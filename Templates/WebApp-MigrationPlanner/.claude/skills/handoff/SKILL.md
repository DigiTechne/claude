---
name: handoff
description: Copy stage-1-plan outputs into stage-2-build inputs to advance the migration pipeline
---

Copy the Stage 1 outputs into Stage 2 inputs so the build stage can begin.

## What to copy

From `stage-1-plan/output/`:
- `project-brief.md` → `stage-2-build/inputs/project-brief.md`
- `tech-stack.md` → `stage-2-build/inputs/tech-stack.md`
- All files in `stage-1-plan/output/sessions/` → `stage-2-build/inputs/sessions/`

Also copy the old-app snapshot (Stage 2 session prompts reference it):
- All contents of `stage-1-plan/inputs/old-app/` → `stage-2-build/inputs/old-app/`

## Steps

1. Check that `stage-1-plan/output/project-brief.md` and `stage-1-plan/output/tech-stack.md` exist. If either is missing, stop and tell the user Stage 1 is not complete yet.
2. Check that `stage-1-plan/output/sessions/` contains at least one session file. If not, stop — sessions haven't been generated yet.
3. Copy the files listed above. Report each file copied.
4. Confirm: "Handoff complete. Stage 2 inputs are ready. Open stage-2-build/ in Console 1 and type 'next' to begin the build."
