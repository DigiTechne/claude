#!/usr/bin/env bash
# Usage: bin/reset.sh <stage>
# Clears a stage's working/ and output/ directories for a fresh run.
# Stage 2: only clears working/ and output/ — keeps inputs/ (your session plan).

set -e

STAGE=$1

if [[ -z "$STAGE" ]]; then
  echo "Usage: bin/reset.sh <stage>"
  echo "Valid stages: 0, 1, 2"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"

case "$STAGE" in
  0) STAGE_DIR="$ROOT/stage-0-idea" ;;
  1) STAGE_DIR="$ROOT/stage-1-plan" ;;
  2) STAGE_DIR="$ROOT/stage-2-build" ;;
  *)
    echo "Error: unknown stage '$STAGE'. Valid stages: 0, 1, 2"
    exit 1
    ;;
esac

echo "This will clear Stage $STAGE working/ and output/ directories."
if [[ "$STAGE" == "1" ]]; then
  echo "Also clears Stage 1 inputs/."
fi
echo ""
read -p "Proceed? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

clear_dir() {
  local DIR="$1"
  if [[ -d "$DIR" ]]; then
    find "$DIR" -type f ! -name ".gitkeep" -delete
    find "$DIR" -mindepth 1 -type d -empty -delete
  fi
}

clear_dir "$STAGE_DIR/working"
clear_dir "$STAGE_DIR/output"

if [[ "$STAGE" == "1" ]]; then
  clear_dir "$STAGE_DIR/inputs"
fi

echo "Stage $STAGE reset. Ready for a new project."
