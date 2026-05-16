import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..', 'platform');

// Read source files
let html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'assets', 'style.css'), 'utf8');
const js  = readFileSync(resolve(root, 'assets', 'app.js'), 'utf8');

// Defensive: neutralize any literal "</script>" inside JS so the browser
// won't prematurely close our inline <script> block.
const safeJs = js.replace(/<\/script>/gi, '<\\/script>');

// Replace the <link rel="stylesheet" href="assets/style.css"> with inline <style>.
// Use a function for the 2nd arg so $&, $1, etc. inside CSS aren't interpreted.
html = html.replace(
  /<link\s+rel="stylesheet"\s+href="assets\/style\.css"\s*\/?>/i,
  () => `<style>\n${css}\n</style>`
);

// Replace the <script src="assets/app.js" defer></script> with inline <script>.
// Same function-as-replacement trick so $-tokens in JS are literal.
html = html.replace(
  /<script\s+src="assets\/app\.js"\s+defer\s*><\/script>/i,
  () => `<script>\n${safeJs}\n</script>`
);

// Safety net: inject a CSS + JS fallback in <head> that force-removes the
// loading overlay after a short timeout, even if some IIFE later throws.
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

// Write output
const outPath = resolve(root, '..', 'test.html');
writeFileSync(outPath, html, 'utf8');

const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
console.log(`✅ test.html created (${sizeKB} KB) at: ${outPath}`);
