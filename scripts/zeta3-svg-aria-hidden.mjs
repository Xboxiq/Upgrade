/**
 * ζ3 — SVG aria-hidden hardening (Truthful, deterministic).
 *
 * For every `<svg …>` opening tag in platform/index.html that has neither
 *   - `aria-hidden`        (decorative)
 *   - `role`               (e.g. role="img" + aria-label)
 *   - `aria-label`         (accessible name attribute)
 *   - `aria-labelledby`    (accessible name reference)
 * append `aria-hidden="true"` so it is excluded from the accessibility tree.
 *
 * RATIONALE
 * Inline-rendered icon SVGs (Lucide/Phosphor pattern, viewBox + currentColor)
 * are decorative when their parent `<button>` / `<a>` already has text. The
 * Iconography Doctrine § 4.E codifies this: the default for an inline icon
 * is `aria-hidden="true"` — the parent carries the accessible name. Adding
 * the attribute is purely additive: no semantic change for already-labelled
 * icons (which we leave alone).
 *
 * IDEMPOTENT
 * Already-tagged `<svg aria-hidden=…>` and `<svg role=…>` are skipped.
 * Running twice is a no-op.
 *
 * Run: node scripts/zeta3-svg-aria-hidden.mjs
 */

import { readFile, writeFile } from "node:fs/promises";

const FILE = "platform/index.html";

async function main () {
  const src = await readFile(FILE, "utf8");
  const re = /<svg\b[^>]*>/g;

  let patched = 0, skipped_decorative = 0, skipped_labelled = 0, total = 0;
  const out = src.replace(re, (tag) => {
    total += 1;
    if (/\baria-hidden\b/.test(tag)) { skipped_decorative += 1; return tag; }
    if (/\brole\s*=/.test(tag) || /\baria-label(?:ledby)?\s*=/.test(tag)) {
      skipped_labelled += 1; return tag;
    }
    // Insert aria-hidden="true" before the closing >
    // Handle both self-closing (rare in HTML5) and standard.
    const isSelfClose = /\/>\s*$/.test(tag);
    const insertion = ' aria-hidden="true"';
    const replaced = isSelfClose
      ? tag.replace(/\/>\s*$/, insertion + "/>")
      : tag.replace(/>\s*$/, insertion + ">");
    patched += 1;
    return replaced;
  });

  if (out === src) {
    console.log(`No changes (total=${total}, decorative=${skipped_decorative}, labelled=${skipped_labelled}).`);
    return;
  }
  await writeFile(FILE, out, "utf8");
  console.log(`Patched ${patched} naked <svg> tags with aria-hidden="true".`);
  console.log(`Skipped: ${skipped_decorative} already-decorative, ${skipped_labelled} already-labelled.`);
  console.log(`Total <svg> tags scanned: ${total}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
