/**
 * build-newv14.mjs — Single-file integrated build
 *
 * Merges platform/index.html + assets/style.css + assets/app.js
 * + favicon.svg + manifest.webmanifest into ONE self-contained
 * file: ./newv14.html (at repo root).
 *
 * - CSS inlined via <style>
 * - JS inlined via <script> (with </script> escape)
 * - favicon inlined as data URI (SVG)
 * - manifest inlined as data URI (JSON)
 * - SW registration self-disables on file:// (already guarded in app.js)
 * - loading-overlay safety fallback (4s hard-kill)
 * - banner comment at the top with build stamp + sacred counts
 *
 * Run: node scripts/build-newv14.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot  = resolve(__dirname, '..');
const platform  = resolve(repoRoot, 'platform');

// ─── 1. Read sources ──────────────────────────────────────────────────────
let html         = readFileSync(resolve(platform, 'index.html'),               'utf8');
const css        = readFileSync(resolve(platform, 'assets', 'style.css'),      'utf8');
const js         = readFileSync(resolve(platform, 'assets', 'app.js'),         'utf8');
const faviconSvg = readFileSync(resolve(platform, 'favicon.svg'),              'utf8');
const manifest   = readFileSync(resolve(platform, 'manifest.webmanifest'),     'utf8');

// ─── 2. Sacred counts (sanity probe — HTML-only, before inlining) ────────
// These mirror the AUTO_PILOT phase-end probes:
//   grep -c '<section class="page"' platform/index.html   → 14   (line count)
//   grep -c 'qcalc'                  platform/index.html  → 391  (line count)
//   grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → ≥19
// We use grep-c semantics (count of LINES containing match), not raw occurrences.
const linesContaining = (text, needle) =>
  text.split('\n').filter(line => line.includes(needle)).length;

const pageCount  = (html.match(/<section class="page"/g) || []).length;
const qcalcCount = linesContaining(html, 'qcalc'); // grep -c semantics
const apiSet     = new Set();
for (const m of js.matchAll(/window\.Upg\.([a-z][a-zA-Z]*)/g)) apiSet.add(m[1]);
const apiCount   = apiSet.size;
const apiList    = [...apiSet].sort().join(', ');

// ─── 3. Defensive escaping ────────────────────────────────────────────────
const safeJs  = js.replace(/<\/script>/gi, '<\\/script>');
const safeCss = css.replace(/<\/style>/gi, '<\\/style>');

// ─── 4. Data-URI assets (no external file dependencies) ──────────────────
const faviconDataUri  = 'data:image/svg+xml;base64,'
  + Buffer.from(faviconSvg).toString('base64');
const manifestDataUri = 'data:application/manifest+json;base64,'
  + Buffer.from(manifest).toString('base64');

// ─── 5. Inline stylesheet ────────────────────────────────────────────────
html = html.replace(
  /<link\s+rel="stylesheet"\s+href="assets\/style\.css"\s*\/?>/i,
  () => `<style data-origin="assets/style.css">\n${safeCss}\n</style>`
);

// ─── 6. Inline script ────────────────────────────────────────────────────
html = html.replace(
  /<script\s+src="assets\/app\.js"\s+defer\s*><\/script>/i,
  () => `<script data-origin="assets/app.js" defer>\n${safeJs}\n</script>`
);

// ─── 7. Inline favicon + apple-touch-icon (data URI) ─────────────────────
html = html.replace(/href="favicon\.svg"/g,    () => `href="${faviconDataUri}"`);
html = html.replace(/content="favicon\.svg"/g, () => `content="${faviconDataUri}"`);

// ─── 8. Inline manifest (data URI) ───────────────────────────────────────
html = html.replace(
  /<link\s+rel="manifest"\s+href="manifest\.webmanifest"\s*\/?>/i,
  () => `<link rel="manifest" href="${manifestDataUri}" data-origin="manifest.webmanifest" />`
);

// ─── 9. Loading-overlay safety fallback (4s hard-kill) ───────────────────
const fallback = `
<style data-origin="newv14-build-fallback">
  /* newv14: loading-overlay belt-and-braces — auto-fade after 3.5s */
  #loading-overlay { animation: __upgFallbackFade 3.5s ease forwards; }
  @keyframes __upgFallbackFade {
    0%, 80%   { opacity: 1; pointer-events: auto; }
    100%      { opacity: 0; pointer-events: none; visibility: hidden; }
  }
</style>
<script data-origin="newv14-build-fallback">
  // newv14: hard-kill any stuck overlay after 4s; also remove on first interaction.
  setTimeout(function () {
    var ov = document.getElementById('loading-overlay');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
  }, 4000);
  ['click','touchstart','keydown'].forEach(function (e) {
    window.addEventListener(e, function () {
      var ov = document.getElementById('loading-overlay');
      if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    }, { once: true, passive: true });
  });
</script>
`;
html = html.replace(/<\/head>/i, () => fallback + '</head>');

// ─── 10. Banner comment (above DOCTYPE) ───────────────────────────────────
const buildDate = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const cssLines  = (safeCss.match(/\n/g) || []).length + 1;
const jsLines   = (safeJs.match(/\n/g)  || []).length + 1;
const banner =
`<!--
  ════════════════════════════════════════════════════════════════════════════
  Upgrade Platform — newv14.html (single-file integrated build)
  ════════════════════════════════════════════════════════════════════════════

  Lineage:  Cathedral v16 ATELIER (Pack v1) + Pack v2 RESONANCE (W15+W16+W17)
  Built:    ${buildDate}
  Sources:
    • platform/index.html
    • platform/assets/style.css     (${cssLines.toLocaleString()} lines)
    • platform/assets/app.js        (${jsLines.toLocaleString()} lines)
    • platform/favicon.svg          (inlined as data URI)
    • platform/manifest.webmanifest (inlined as data URI)

  Sacred preservation (verified at build time):
    • Page sections : ${pageCount}    (target 14)
    • qcalc refs    : ${qcalcCount}   (target 391)
    • Upg.* APIs    : ${apiCount}     (target ≥19)

  APIs included: ${apiList}

  Notes:
    • Google Fonts still loaded from CDN (display=swap). For full offline use,
      first page load must succeed once to populate browser font cache.
    • Service Worker registration self-disables on file:// (in-app guard).
    • Loading-overlay has a 4s hard-kill fallback for resilience.
  ════════════════════════════════════════════════════════════════════════════
-->\n`;

if (/^<!DOCTYPE/i.test(html)) {
  html = banner + html;
} else {
  html = banner + html;
}

// ─── 11. Tighten <html class="..."> to flag the build ────────────────────
html = html.replace(
  /<html\s+lang="ar"\s+dir="rtl"\s+class="v13">/i,
  () => '<html lang="ar" dir="rtl" class="v13 newv14-build" data-build="newv14">'
);

// ─── 12. Tighten <title> to reflect deliverable ──────────────────────────
html = html.replace(
  /<title>منصة التدريب الاحترافية<\/title>/,
  () => '<title>منصة التدريب الاحترافية — Upgrade (newv14)</title>'
);

// ─── 13. Write output ────────────────────────────────────────────────────
const outPath = resolve(repoRoot, 'newv14.html');
writeFileSync(outPath, html, 'utf8');

const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
const sizeMB = (Buffer.byteLength(html, 'utf8') / 1024 / 1024).toFixed(2);
const lines  = (html.match(/\n/g) || []).length + 1;

console.log(`✅ newv14.html created`);
console.log(`   path  : ${outPath}`);
console.log(`   size  : ${sizeKB} KB (${sizeMB} MB)`);
console.log(`   lines : ${lines.toLocaleString()}`);
console.log(`   pages : ${pageCount}   qcalc: ${qcalcCount}   APIs: ${apiCount}`);

// ─── 14. Sanity assertions ───────────────────────────────────────────────
const errs = [];
if (pageCount !== 14)   errs.push(`page sections = ${pageCount}, expected 14`);
if (qcalcCount !== 391) errs.push(`qcalc refs = ${qcalcCount}, expected 391`);
if (apiCount < 19)      errs.push(`Upg.* APIs = ${apiCount}, expected ≥19`);
if (/href="assets\//.test(html))                errs.push('found leftover href="assets/..."');
if (/src="assets\//.test(html))                 errs.push('found leftover src="assets/..."');
if (/href="favicon\.svg"/.test(html))           errs.push('found leftover favicon.svg ref');
if (/href="manifest\.webmanifest"/.test(html))  errs.push('found leftover manifest ref');

if (errs.length) {
  console.error('\n❌ Sanity checks failed:');
  for (const e of errs) console.error(`   - ${e}`);
  process.exit(1);
}

console.log('   ✓ all sanity checks passed (no external file refs, sacred preserved)');
