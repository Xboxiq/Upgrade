/* ============================================================
   Upgrade Platform — Standalone Single-File Builder
   Inlines: index.html + style.css + app.js + manifest + favicon
   Output : test-v14.html (fully self-contained, no external local refs)
   ============================================================ */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname }                        from 'node:path';
import { fileURLToPath }                           from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..', 'platform');
const outDir    = resolve(__dirname, '..');

/* ─── 1. Read sources ─────────────────────────────────────── */
let   html     = readFileSync(resolve(root, 'index.html'), 'utf8');
const css      = readFileSync(resolve(root, 'assets', 'style.css'), 'utf8');
const js       = readFileSync(resolve(root, 'assets', 'app.js'),    'utf8');
const manifest = readFileSync(resolve(root, 'manifest.webmanifest'),'utf8');
const favicon  = readFileSync(resolve(root, 'favicon.svg'),         'utf8');

const sizes = {
  html:     Buffer.byteLength(html,     'utf8'),
  css:      Buffer.byteLength(css,      'utf8'),
  js:       Buffer.byteLength(js,       'utf8'),
  manifest: Buffer.byteLength(manifest, 'utf8'),
  favicon:  Buffer.byteLength(favicon,  'utf8'),
};

/* ─── 2. Build data URLs for static assets ────────────────── */
const manifestDataUrl = 'data:application/manifest+json;base64,' +
                         Buffer.from(manifest, 'utf8').toString('base64');
const faviconDataUrl  = 'data:image/svg+xml;utf8,' +
                         encodeURIComponent(favicon).replace(/'/g, '%27').replace(/"/g, '%22');

/* ─── 3. Sanitize JS ──────────────────────────────────────── */
// 3a) Neutralize literal "</script>" so the inline block can't be closed early
let safeJs = js.replace(/<\/script>/gi, '<\\/script>');

// 3b) Disable Service Worker registration (sw.js is not bundled into the
//     single file; standalone builds run offline by virtue of being one file).
const swGate = `if ('serviceWorker' in navigator && location.protocol !== 'file:')`;
const swGateReplacement = `if (false /* SW disabled in standalone single-file build */)`;
if (!safeJs.includes(swGate)) {
  console.warn('⚠️  Could not find SW registration gate — verify app.js still uses the expected pattern.');
}
safeJs = safeJs.replace(swGate, swGateReplacement);

/* ─── 4. Inline replacements in HTML ──────────────────────── */
const replacements = [
  {
    name: 'stylesheet',
    re: /<link\s+rel="stylesheet"\s+href="assets\/style\.css"\s*\/?>/i,
    to: () => `<style data-inline="style.css">\n${css}\n</style>`,
  },
  {
    name: 'app.js',
    re: /<script\s+src="assets\/app\.js"\s+defer\s*><\/script>/i,
    to: () => `<script data-inline="app.js" defer>\n${safeJs}\n</script>`,
  },
  {
    name: 'manifest',
    re: /<link\s+rel="manifest"\s+href="manifest\.webmanifest"\s*\/?>/i,
    to: () => `<link rel="manifest" href="${manifestDataUrl}" />`,
  },
  {
    name: 'favicon (icon)',
    re: /<link\s+rel="icon"\s+href="favicon\.svg"\s+type="image\/svg\+xml"\s*\/?>/i,
    to: () => `<link rel="icon" href="${faviconDataUrl}" type="image/svg+xml" />`,
  },
  {
    name: 'favicon (apple-touch-icon)',
    re: /<link\s+rel="apple-touch-icon"\s+href="favicon\.svg"\s*\/?>/i,
    to: () => `<link rel="apple-touch-icon" href="${faviconDataUrl}" />`,
  },
  {
    name: 'og:image',
    re: /<meta\s+property="og:image"\s+content="favicon\.svg"\s*\/?>/i,
    to: () => `<meta property="og:image" content="${faviconDataUrl}" />`,
  },
];

for (const r of replacements) {
  if (!r.re.test(html)) {
    console.warn(`⚠️  Pattern not found: ${r.name}. Skipped.`);
    continue;
  }
  html = html.replace(r.re, r.to);
}

/* ─── 5. Build banner + loading-overlay safety net ────────── */
const stamp = new Date().toISOString();
const banner = `
<!--
  ════════════════════════════════════════════════════════════════════
  Upgrade Platform — Cathedral v16 (ATELIER)
  STANDALONE SINGLE-FILE BUILD
  Generated : ${stamp}
  Bundled   : index.html + assets/style.css + assets/app.js
              + manifest.webmanifest + favicon.svg
  Notes     : Service Worker registration disabled (no sw.js companion).
              Premium Thmanyah font face references fall back to Reem Kufi
              when woff2 files are absent — silent, no errors.
  Sizes     : html=${(sizes.html/1024).toFixed(0)}KB
              css=${(sizes.css/1024).toFixed(0)}KB
              js=${(sizes.js/1024).toFixed(0)}KB
              manifest=${(sizes.manifest/1024).toFixed(2)}KB
              favicon=${(sizes.favicon/1024).toFixed(2)}KB
  ════════════════════════════════════════════════════════════════════
-->
`;
html = html.replace(/<!DOCTYPE html>/i, (m) => m + banner);

const fallback = `
<style>
  /* Loading-overlay safety fallback — auto-fade after 3.5s no matter what */
  #loading-overlay { animation: __upgFallbackFade 3.5s ease forwards; }
  @keyframes __upgFallbackFade {
    0%, 80%   { opacity: 1; pointer-events: auto; }
    100%      { opacity: 0; pointer-events: none; visibility: hidden; }
  }
</style>
<script>
  /* Hard-kill loading overlay after 4s and on first interaction */
  (function () {
    function killOverlay () {
      var ov = document.getElementById('loading-overlay');
      if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    }
    setTimeout(killOverlay, 4000);
    ['click','touchstart','keydown'].forEach(function (e) {
      window.addEventListener(e, killOverlay, { once: true, passive: true });
    });
  })();
</script>
`;
html = html.replace(/<\/head>/i, () => fallback + '</head>');

/* ─── 6. Write output ─────────────────────────────────────── */
const outPath = resolve(outDir, 'test-v14.html');
writeFileSync(outPath, html, 'utf8');

const finalSize = Buffer.byteLength(html, 'utf8');
console.log(`✅ test-v14.html created (${(finalSize/1024).toFixed(0)} KB) at: ${outPath}`);

/* ─── 7. Verify no leftover local refs ────────────────────── */
const leftoverHref = [...html.matchAll(/\b(?:href|src)="((?:assets\/|manifest\.webmanifest|favicon\.svg|offline\.html|sw\.js)[^"]*)"/gi)];
if (leftoverHref.length) {
  console.warn(`⚠️  ${leftoverHref.length} leftover local reference(s):`);
  for (const m of leftoverHref.slice(0, 10)) console.warn('   ·', m[1]);
} else {
  console.log('✓  No leftover local file references — fully self-contained.');
}

/* ─── 8. Sanity checks ────────────────────────────────────── */
const checks = [
  ['inline <style data-inline="style.css">', /<style data-inline="style\.css">/],
  ['inline <script data-inline="app.js">',   /<script data-inline="app\.js"/],
  ['SW disabled gate',                       /SW disabled in standalone single-file build/],
  ['manifest data URL',                      /href="data:application\/manifest\+json;base64,/],
  ['favicon data URL',                       /href="data:image\/svg\+xml;utf8,/],
  ['loading overlay safety net',             /__upgFallbackFade/],
];
for (const [label, re] of checks) {
  console.log(re.test(html) ? `✓  ${label}` : `✗  ${label}  (MISSING)`);
}
