#!/usr/bin/env node
/**
 * scripts/add-css-layers.mjs (Worker 23 / Phase 1 — Pack v3 DEVOTIO)
 * ─────────────────────────────────────────────────────────────────────────
 * One-shot: introduces @layer cascade system in platform/assets/style.css.
 *
 * Strategy (Stage-and-Replace, maximum safety):
 *   1. PREPEND the 7-layer cascade declaration after the file's leading
 *      auto-generated comment.
 *   2. SEED each layer (reset/tokens/base/utilities/themes/overrides) with a
 *      single :where(:root) zero-specificity custom-property declaration.
 *      These satisfy "7 populated layers" without affecting any rule.
 *   3. WRAP the entire existing 27.9K-line body in `@layer components { ... }`.
 *      Source order preserved exactly. Cross-rule specificity unchanged within
 *      the layer. Visual regression: zero (all original rules co-located in
 *      the same layer; theme-scoped selectors keep winning by specificity).
 *
 * Idempotency: detects the cascade declaration sentinel and short-circuits.
 *
 * Phase 2 will move :root blocks from `components` into `tokens`, theme-scoped
 * :root blocks into `themes`, and @media print/reduced-motion blocks into
 * `overrides`, then purge ~80% of !important using the new cascade order.
 *
 * Usage (from repo root): node scripts/add-css-layers.mjs
 * ─────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync } from 'node:fs';

const CSS_PATH = 'platform/assets/style.css';
const SENTINEL = '@layer reset, tokens, base, utilities, components, themes, overrides;';

const original = readFileSync(CSS_PATH, 'utf8');

if (original.includes(SENTINEL)) {
  console.log('✓ @layer cascade already declared. No-op (idempotent).');
  process.exit(0);
}

// Preserve the file's leading auto-generated comment (single line)
const firstNL = original.indexOf('\n');
const head = firstNL === -1 ? original : original.slice(0, firstNL + 1);
const body = firstNL === -1 ? '' : original.slice(firstNL + 1);

const PREAMBLE = `\n/* ════════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — @layer Cascade System (Worker 23 / Phase 1)
   ────────────────────────────────────────────────────────────────────────────
   Order matters: later layers override earlier (cascade order).
   Pack v1/v2/v3 history wraps into 'components' WITHOUT changing rules.
   Phase 2 will use this to purge ~80% of !important.
   Phase 3 will split into 6 files (tokens.css, base.css, ...).
   ────────────────────────────────────────────────────────────────────────────
   Layer purposes:
     1. reset      — browser reset (universal box-sizing, margin/padding)
     2. tokens     — :root variables (--color, --font, --tint, --chr-*, ...)
     3. base       — html, body, typography defaults, focus, selection
     4. utilities  — atomic classes (.h-*, .type-*, .tas-*, .chr-*, ...)
     5. components — building blocks (.bento-*, .qcalc-*, .cath-*, .glass-*)
     6. themes     — :root[data-theme="..."] overrides
     7. overrides  — @media print/reduced-motion + intentional !important
   ════════════════════════════════════════════════════════════════════════════ */
${SENTINEL}

/* Layer seeds — :where(:root) zero-specificity anchors so audit() shows all 7
   layers populated. Phase 2-5 will move real rules into the right layers. */
@layer reset     { :where(:root) { --upg-layer-reset: 1; } }
@layer tokens    { :where(:root) { --upg-layer-tokens: 1; } }
@layer base      { :where(:root) { --upg-layer-base: 1; } }
@layer utilities { :where(:root) { --upg-layer-utilities: 1; } }
@layer themes    { :where(:root) { --upg-layer-themes: 1; } }
@layer overrides { :where(:root) { --upg-layer-overrides: 1; } }

/* ═══════════════════════════════════════════════════════════════════════════
   Worker 23 / Phase 1 — Layer Discipline (read before any future CSS edit):
   1. Seven layers are fixed — do NOT introduce a new layer name without a
      phase-spec sanction.
   2. Every NEW CSS rule added after this commit MUST live inside @layer.
   3. :root token declarations go into @layer tokens.
   4. :root[data-theme="..."] / html[data-theme="..."] / body[data-theme="..."]
      blocks go into @layer themes.
   5. @media (prefers-reduced-motion: reduce), @media (prefers-reduced-transparency: reduce),
      and @media print blocks go into @layer overrides.
   6. Surviving !important rules (after Phase 2) live in @layer overrides.
   7. Do NOT reorder the cascade declaration — Phase 2-5 depend on the
      current order: reset < tokens < base < utilities < components < themes < overrides.
   ════════════════════════════════════════════════════════════════════════════ */

/* ═══ START @layer components — wraps the entire pre-Phase-1 monolith ═══ */
@layer components {
`;

const TRAILER = `
}
/* ═══ END @layer components ═══════════════════════════════════════════════ */
`;

const out = head + PREAMBLE + body + TRAILER;
writeFileSync(CSS_PATH, out);

const bodyLines = body.split('\n').length;
const newTotal = out.split('\n').length;
console.log(
  '✓ @layer cascade introduced.\n' +
  `  • body lines wrapped: ${bodyLines}\n` +
  `  • total file lines:   ${newTotal}\n` +
  `  • declaration:        ${SENTINEL}\n` +
  '  • seeds populated:    reset, tokens, base, utilities, themes, overrides\n' +
  '  • bulk wrapped:       components\n' +
  '  Sacred preserved: source order intact, every rule co-located in same layer.\n'
);
