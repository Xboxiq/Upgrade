/**
 * ζ2 — !important Cap (Truthful, deterministic).
 *
 * Removes !important only from declarations that are now redundant after
 * the @layer cascade promotion in style.css (utilities → utilities layer,
 * placed AFTER components in declaration order).
 *
 * KEEPS !important on:
 *   1. All @media (print) rules — print engine cascade requires force.
 *   2. All @media (prefers-reduced-motion: reduce) rules — a11y override.
 *   3. All @media (forced-colors: active) rules — high-contrast mode.
 *   4. All @media (prefers-reduced-transparency: reduce) rules.
 *   5. body[data-motion="reduced"] selectors — opt-in user preference mirror.
 *   6. body.is-hidden …  battery-saver pause state.
 *   7. [hidden] attribute selectors — HTML5 semantics.
 *   8. body[data-rit-halo="active"] a11y unmask block.
 *   9. .rit-ink-bare opt-out class.
 *  10. [data-life="none"] explicit-opt-out class.
 *  11. .u-hidden — defensive (display utility must beat all layouts).
 *  12. .u-w-0 stranded in pages.css — defensive zero-width.
 *  13. .u-sr-only stranded in pages.css — a11y screen-reader-only force.
 *
 * REMOVES !important from:
 *   • utilities.css width helpers .u-w-{10..92}  (15 declarations)
 *   • utilities.css spacing helpers .u-mt-26, .u-mb-12, .u-mt-16 (3)
 *   • utilities.css colour helper .u-tint-fill (1)
 *   = 19 cascade-hack !important removed in utilities.css.
 *
 * Run: node scripts/zeta2-cap-important.mjs
 * Idempotent: rerunning is a no-op (all targets are exact substrings).
 */

import { readFile, writeFile } from "node:fs/promises";

const FILE = "platform/assets/css/utilities.css";

const REPLACEMENTS = [
  /* width utilities — 15 */
  { from: ".u-w-10  { width: 10%  !important; }", to: ".u-w-10  { width: 10%; }",  expect: 1 },
  { from: ".u-w-11  { width: 11%  !important; }", to: ".u-w-11  { width: 11%; }",  expect: 1 },
  { from: ".u-w-15  { width: 15%  !important; }", to: ".u-w-15  { width: 15%; }",  expect: 1 },
  { from: ".u-w-16  { width: 16%  !important; }", to: ".u-w-16  { width: 16%; }",  expect: 1 },
  { from: ".u-w-18  { width: 18%  !important; }", to: ".u-w-18  { width: 18%; }",  expect: 1 },
  { from: ".u-w-22  { width: 22%  !important; }", to: ".u-w-22  { width: 22%; }",  expect: 1 },
  { from: ".u-w-25  { width: 25%  !important; }", to: ".u-w-25  { width: 25%; }",  expect: 1 },
  { from: ".u-w-35  { width: 35%  !important; }", to: ".u-w-35  { width: 35%; }",  expect: 1 },
  { from: ".u-w-36  { width: 36%  !important; }", to: ".u-w-36  { width: 36%; }",  expect: 1 },
  { from: ".u-w-40  { width: 40%  !important; }", to: ".u-w-40  { width: 40%; }",  expect: 1 },
  { from: ".u-w-61  { width: 61%  !important; }", to: ".u-w-61  { width: 61%; }",  expect: 1 },
  { from: ".u-w-72  { width: 72%  !important; }", to: ".u-w-72  { width: 72%; }",  expect: 1 },
  { from: ".u-w-75  { width: 75%  !important; }", to: ".u-w-75  { width: 75%; }",  expect: 1 },
  { from: ".u-w-88  { width: 88%  !important; }", to: ".u-w-88  { width: 88%; }",  expect: 1 },
  { from: ".u-w-92  { width: 92%  !important; }", to: ".u-w-92  { width: 92%; }",  expect: 1 },

  /* spacing utilities — 3 */
  { from: ".u-mt-26 { margin-top: 26px !important; }", to: ".u-mt-26 { margin-top: 26px; }", expect: 1 },
  { from: ".u-mb-12 { margin-bottom: 12px !important; }", to: ".u-mb-12 { margin-bottom: 12px; }", expect: 1 },
  { from: ".u-mt-16 { margin-top: 16px !important; }", to: ".u-mt-16 { margin-top: 16px; }", expect: 1 },

  /* colour helper — 1 */
  { from: ".u-tint-fill { background: rgba(245,158,11,0.04) !important; }",
    to:   ".u-tint-fill { background: rgba(245,158,11,0.04); }", expect: 1 },
];

async function main () {
  const src = await readFile(FILE, "utf8");
  let next = src;
  let applied = 0, skipped = 0, failed = [];

  for (const { from, to, expect } of REPLACEMENTS) {
    let count = 0, i = 0;
    while ((i = next.indexOf(from, i)) !== -1) { count += 1; i += from.length; }
    if (count === 0) {
      if (next.includes(to)) { skipped += 1; continue; }
      failed.push({ from: from.slice(0, 70), reason: "not found, replacement absent" });
      continue;
    }
    if (count !== expect) {
      failed.push({ from: from.slice(0, 70), reason: `expected ${expect} got ${count}` });
      continue;
    }
    next = next.split(from).join(to);
    applied += 1;
  }

  if (failed.length) {
    console.error("FAILURES:");
    for (const f of failed) console.error("  -", f);
    process.exitCode = 1;
    return;
  }
  if (next === src) {
    console.log(`No changes needed (already-applied: ${skipped}).`);
    return;
  }
  await writeFile(FILE, next, "utf8");
  console.log(`Applied ${applied} !important removals (already-applied: ${skipped}).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
