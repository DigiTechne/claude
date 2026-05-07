#!/usr/bin/env bash
# Usage: bin/handoff.sh <from> <to>
# Copies outputs from one stage into the next stage's inputs.
# Example: bin/handoff.sh 0 1

set -e

FROM=$1
TO=$2

if [[ -z "$FROM" || -z "$TO" ]]; then
  echo "Usage: bin/handoff.sh <from-stage> <to-stage>"
  echo "Example: bin/handoff.sh 0 1"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"

stage_dir() {
  case "$1" in
    0) echo "$ROOT/stage-0-idea" ;;
    1) echo "$ROOT/stage-1-plan" ;;
    2) echo "$ROOT/stage-2-build" ;;
    *) echo ""; ;;
  esac
}

FROM_DIR=$(stage_dir "$FROM")
TO_DIR=$(stage_dir "$TO")

if [[ -z "$FROM_DIR" ]]; then
  echo "Error: unknown stage '$FROM'. Valid stages: 0, 1, 2"
  exit 1
fi
if [[ -z "$TO_DIR" ]]; then
  echo "Error: unknown stage '$TO'. Valid stages: 0, 1, 2"
  exit 1
fi

FROM_OUTPUT="$FROM_DIR/output"
TO_INPUT="$TO_DIR/inputs"

if [[ ! -d "$FROM_OUTPUT" ]]; then
  echo "Error: $FROM_OUTPUT does not exist."
  exit 1
fi
if [[ ! -d "$TO_INPUT" ]]; then
  echo "Error: $TO_INPUT does not exist."
  exit 1
fi

# Show what will be copied
FILES=$(find "$FROM_OUTPUT" -type f ! -name ".gitkeep")
if [[ -z "$FILES" ]]; then
  echo "No output files found in $FROM_OUTPUT. Has Stage $FROM been completed?"
  exit 1
fi

echo "Copying Stage $FROM → Stage $TO:"
echo "$FILES" | while read -r f; do
  echo "  ${f#$FROM_OUTPUT/}"
done
echo ""
read -p "Proceed? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

# Copy all output files (preserving directory structure, e.g. sessions/)
rsync -a --exclude=".gitkeep" "$FROM_OUTPUT/" "$TO_INPUT/"

echo "Done. Stage $TO inputs are ready."
echo "Run: cd stage-$(printf '%s' "$TO" | sed 's/0/0-idea/;s/1/1-plan/;s/2/2-build/') && claude"
