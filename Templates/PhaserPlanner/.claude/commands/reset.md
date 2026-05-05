# Reset

Clear a stage's working and output directories for a fresh run.

## Usage

`/reset <stage>` — e.g., `/reset 0`, `/reset 1`, `/reset 2`

## What Gets Cleared

| Stage | Cleared |
|---|---|
| 0 | `stage-0-idea/working/` and `stage-0-idea/output/` |
| 1 | `stage-1-plan/working/`, `stage-1-plan/output/`, AND `stage-1-plan/inputs/` |
| 2 | `stage-2-build/working/` and `stage-2-build/output/` only — `inputs/` is preserved (it holds the session plan) |

## Steps

1. Find the PhaserPlanner-TEMPLATE root (directory containing all three `stage-*` folders).
2. Show the user exactly what will be deleted and ask for confirmation before proceeding.
3. Delete all non-`.gitkeep` files from the relevant directories.
4. Remove any empty subdirectories that result (preserve the stage directories themselves and any `.gitkeep` files).
5. Confirm the reset is complete and the stage is ready for a new project.

Use Bash for the file operations.
