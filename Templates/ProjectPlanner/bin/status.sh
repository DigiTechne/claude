#!/usr/bin/env bash
# Shows the current state of all stages in the pipeline.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"

stage_status() {
  local LABEL="$1"
  local DIR="$2"
  local STATE_FILE="$3"

  echo "── $LABEL ──────────────────────────"

  if [[ -f "$DIR/$STATE_FILE" ]]; then
    local STATUS
    STATUS=$(grep -m1 "Status:" "$DIR/$STATE_FILE" 2>/dev/null | sed 's/.*Status: *//' | tr -d '\r')
    echo "  State:   ${STATUS:-unknown}"
  else
    echo "  State:   not started"
  fi

  local OUT_DIR="$DIR/output"
  if [[ -d "$OUT_DIR" ]]; then
    local COUNT
    COUNT=$(find "$OUT_DIR" -type f ! -name ".gitkeep" | wc -l | tr -d ' ')
    if [[ "$COUNT" -gt 0 ]]; then
      echo "  Outputs: $COUNT file(s)"
      find "$OUT_DIR" -type f ! -name ".gitkeep" | sort | while read -r f; do
        echo "    ${f#$OUT_DIR/}"
      done
    else
      echo "  Outputs: none"
    fi
  fi
  echo ""
}

echo ""
echo "Pipeline Status"
echo "==============="
echo ""

stage_status "Stage 0 — Idea"  "$ROOT/stage-0-idea"  "working/stage-0-state.md"
stage_status "Stage 1 — Plan"  "$ROOT/stage-1-plan"  "working/stage-1-state.md"
stage_status "Stage 2 — Build" "$ROOT/stage-2-build" "working/build-state.md"
