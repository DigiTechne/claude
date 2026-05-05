# Status

Show the current state of all pipeline stages.

## Usage

`/status`

## Steps

1. Find the PhaserPlanner-TEMPLATE root (directory containing all three `stage-*` folders).
2. For each stage, check its state file:
   - Stage 0: `stage-0-idea/working/stage-0-state.md`
   - Stage 1: `stage-1-plan/working/stage-1-state.md`
   - Stage 2: `stage-2-build/working/build-state.md`
3. If the state file exists, extract the `Status:` line value. If not, show "not started".
4. List any non-`.gitkeep` output files for each stage.
5. Print a clean summary:

```
Pipeline Status
===============

Stage 0 — Idea
  State:   [status or "not started"]
  Outputs: [file list or "none"]

Stage 1 — Plan
  State:   [status or "not started"]
  Outputs: [file list or "none"]

Stage 2 — Build
  State:   [status or "not started"]
  Outputs: [file list or "none"]
```

Use Bash for the file reads.
