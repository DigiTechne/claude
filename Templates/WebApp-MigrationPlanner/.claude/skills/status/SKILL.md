---
name: status
description: Show the current state of this migration planner — what's done, what stage you're in, what's next
---

Report the current state of this migration planner clone.

## Steps

1. Read `stage-1-plan/inputs/project-meta.md` to get the app name and target repo name. If it doesn't exist or is still the template placeholder, note that it hasn't been filled in yet.

2. Check Stage 1 state:
   - Does `stage-1-plan/inputs/old-app/` contain any files beyond `.gitkeep`? (snapshot present)
   - Does `stage-1-plan/working/stage-1-state.md` exist? If so, read its Status field.
   - Does `stage-1-plan/output/project-brief.md` exist?
   - How many session files are in `stage-1-plan/output/sessions/`?

3. Check Stage 2 state:
   - Does `stage-2-build/inputs/project-brief.md` exist? (handoff done)
   - Does `stage-2-build/working/build-state.md` exist? If so, read it and summarize: sessions complete, current session, sessions remaining.

4. Present a clean status summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Migration Status: [App Name or "not configured"]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stage 1 — Plan
  project-meta.md filled in : [yes / no]
  old-app snapshot present  : [yes / no]
  Stage 1 state             : [Not Started / In Progress / Complete]
  Sessions generated        : [N files / none]

Stage 2 — Build
  Handoff complete          : [yes / no]
  Stage 2 state             : [Not Started / In Progress / Complete]
  Sessions complete         : [N of M / not started]
  Current session           : [NNN — Title / none]

Next step: [one-line guidance on what to do next]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
