import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..', 'platform');

// ─────────────────────────────────────────────────────────────────────────
// 1. Read all source files we plan to inline
// ─────────────────────────────────────────────────────────────────────────
let html       = readFileSync(resolve(root, 'index.html'),                'utf8');
const css      = readFileSync(resolve(root, 'assets', 'style.css'),       'utf8');
const js       = readFileSync(resolve(root, 'assets', 'app.js'),          'utf8');
const favicon  = readFileSync(resolve(root, 'favicon.svg'),               'utf8');
const manifest = readFileSync(resolve(root, 'manifest.webmanifest'),      'utf8');
const swSrc    = readFileSync(resolve(root, 'sw.js'),                     'utf8'); // kept for reference, not used

// ─────────────────────────────────────────────────────────────────────────
// 2. Build data-URIs for sub-resources so the HTML is fully self-contained
// ─────────────────────────────────────────────────────────────────────────
const faviconDataUri  = `data:image/svg+xml;utf8,${encodeURIComponent(favicon)}`;
const manifestDataUri = `data:application/manifest+json;charset=utf-8,${encodeURIComponent(manifest)}`;

// ─────────────────────────────────────────────────────────────────────────
// 3. Patch CSS:
//    - Remove @font-face blocks that reference the optional Thmanyah woff2
//      files (those binaries are not in the repo; CSS would 404 silently
//      and we want the single file to be 100% clean).
// ─────────────────────────────────────────────────────────────────────────
let patchedCss = css.replace(
  /@font-face\s*\{[^}]*Thmanyah-[^}]*\}/gi,
  '/* Thmanyah @font-face removed in single-file build (woff2 not bundled — falls back to Reem Kufi) */'
);

// ─────────────────────────────────────────────────────────────────────────
// 4. Patch JS:
//    - Disable service-worker registration. SWs cannot be registered from
//      file:// URLs anyway, and our sw.js is not bundled here.
//    - Neutralize any literal "</script>" so the inline <script> never
//      closes prematurely.
// ─────────────────────────────────────────────────────────────────────────
let patchedJs = js
  .replace(
    /navigator\.serviceWorker\.register\(['"`]\.\/sw\.js['"`]\)/g,
    "Promise.reject(new Error('SW disabled in single-file build'))"
  )
  .replace(/<\/script>/gi, '<\\/script>');

// ─────────────────────────────────────────────────────────────────────────
// 5. Inline external <link> / <script> references in the HTML
// ─────────────────────────────────────────────────────────────────────────

// 5a. favicon (used twice: <link rel="icon"> and <link rel="apple-touch-icon">)
html = html.replace(/href="favicon\.svg"/gi, () => `href="${faviconDataUri}"`);

// 5b. manifest
html = html.replace(/href="manifest\.webmanifest"/gi, () => `href="${manifestDataUri}"`);

// 5c. CSS file → inline <style>
html = html.replace(
  /<link\s+rel="stylesheet"\s+href="assets\/style\.css"\s*\/?>/i,
  () => `<style>\n${patchedCss}\n</style>`
);

// 5d. JS file → inline <script> (kept defer behavior by placing it where it was)
html = html.replace(
  /<script\s+src="assets\/app\.js"\s+defer\s*><\/script>/i,
  () => `<script>\n${patchedJs}\n</script>`
);

// ─────────────────────────────────────────────────────────────────────────
// 6. Loading-overlay safety net (auto-fade after 4s, also on first input)
// ─────────────────────────────────────────────────────────────────────────
const fallback = `
<style>
  /* Loading overlay safety fallback — auto-fade after 3.5s no matter what */
  #loading-overlay { animation: __upgFallbackFade 3.5s ease forwards; }
  @keyframes __upgFallbackFade {
    0%, 80%   { opacity: 1; pointer-events: auto; }
    100%      { opacity: 0; pointer-events: none; visibility: hidden; }
  }
</style>
<script>
  // Hard-kill the overlay after 4s (covers any JS init failure on mobile)
  setTimeout(function () {
    var ov = document.getElementById('loading-overlay');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
  }, 4000);
  // Also remove on first user interaction
  ['click','touchstart','keydown'].forEach(function (e) {
    window.addEventListener(e, function () {
      var ov = document.getElementById('loading-overlay');
      if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    }, { once: true, passive: true });
  });
</script>
`;
html = html.replace(/<\/head>/i, () => fallback + '</head>');

// ─────────────────────────────────────────────────────────────────────────
// 7. Self-check: warn loudly if any local relative reference slipped through
// ─────────────────────────────────────────────────────────────────────────
const remainingLocalRefs = [
  ...html.matchAll(/(?:href|src)\s*=\s*"(?!https?:|data:|#|mailto:|tel:|\/\/)([^"]+)"/gi),
].map(m => m[1]).filter(p => /\.(css|js|svg|png|jpe?g|webp|gif|woff2?|webmanifest|ico)$/i.test(p));

if (remainingLocalRefs.length) {
  console.warn('⚠️  Unresolved local references still in HTML:');
  remainingLocalRefs.forEach(p => console.warn('   •', p));
} else {
  console.log('✓ No unresolved local href/src remain in HTML');
}

// ─────────────────────────────────────────────────────────────────────────
// 8. Write output
// ─────────────────────────────────────────────────────────────────────────
const outPath = resolve(root, '..', 'test.html');
writeFileSync(outPath, html, 'utf8');

const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
console.log(`✅ test.html created (${sizeKB} KB) at: ${outPath}`);
console.log('   Inlined: index.html + style.css + app.js + favicon.svg + manifest.webmanifest');
console.log('   Disabled: service-worker registration (cannot run from file://)');
console.log('   Stripped: optional Thmanyah @font-face (woff2 not bundled — Reem Kufi fallback)');
