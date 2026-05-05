# Handoff

Copy a stage's outputs to the next stage's inputs.

## Usage

`/handoff <from> <to>` — e.g., `/handoff 0 1` or `/handoff 1 2`

## What It Does

Copies all non-.gitkeep files from `stage-<from>/output/` into `stage-<to>/inputs/`, preserving any subdirectory structure (e.g., `sessions/` subfolder).

Stage map:
- 0 → `stage-0-idea`
- 1 → `stage-1-plan`
- 2 → `stage-2-build`

## Steps

1. Find the PhaserPlanner-TEMPLATE root (the directory containing all three `stage-*` folders). From a stage directory, this is `..`.
2. List the files that will be copied from `stage-<from>/output/` (skip `.gitkeep`).
3. If no output files exist, tell the user Stage `<from>` hasn't produced output yet and stop.
4. Copy all files to `stage-<to>/inputs/`, creating any needed subdirectories.
5. Confirm what was copied and state the next step (e.g., `cd ../stage-1-plan && claude`, then `Begin planning.`).

Use Bash for the file operations.
