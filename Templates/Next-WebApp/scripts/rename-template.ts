#!/usr/bin/env tsx
/**
 * Usage: npm run rename <new-project-name>
 * Example: npm run rename my-saas-app
 *
 * Renames all occurrences of "template-next-stack" to your project name in:
 *   - package.json
 *   - docker-compose.yml
 *   - compose.prod.yml
 *   - CLAUDE.md
 *   - AGENTS.md
 *   - README.md
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const newName = process.argv[2];

if (!newName) {
  console.error("Usage: npm run rename <new-project-name>");
  console.error("Example: npm run rename my-saas-app");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(newName)) {
  console.error("Project name must be lowercase letters, numbers, and hyphens only.");
  process.exit(1);
}

const OLD = "template-next-stack";
const root = join(__dirname, "..");

const files = [
  "package.json",
  "docker-compose.yml",
  "compose.prod.yml",
  "CLAUDE.md",
  "AGENTS.md",
  "README.md",
  "src/app/(marketing)/page.tsx",
  "src/app/app/layout.tsx",
];

let changed = 0;

for (const file of files) {
  const path = join(root, file);
  let content: string;
  try {
    content = readFileSync(path, "utf-8");
  } catch {
    console.warn(`  skip  ${file} (not found)`);
    continue;
  }

  if (!content.includes(OLD)) {
    console.log(`  skip  ${file} (no occurrences)`);
    continue;
  }

  const updated = content.replaceAll(OLD, newName);
  writeFileSync(path, updated, "utf-8");
  const count = (content.match(new RegExp(OLD, "g")) ?? []).length;
  console.log(`  ✓     ${file} (${count} replacement${count !== 1 ? "s" : ""})`);
  changed++;
}

console.log(`\nDone. Renamed ${changed} file(s) from "${OLD}" to "${newName}".`);
console.log(`\nNext steps:`);
console.log(`  1. Update the app name and tagline in src/app/(marketing)/page.tsx`);
console.log(`  2. Update the header title in src/app/app/layout.tsx`);
console.log(`  3. Update the sender domain in src/lib/email.ts`);
console.log(`  4. git add -A && git commit -m "chore: rename to ${newName}"`);
