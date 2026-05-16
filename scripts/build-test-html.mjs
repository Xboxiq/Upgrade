import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..', 'platform');

// Read source files
let html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'assets', 'style.css'), 'utf8');
const js  = readFileSync(resolve(root, 'assets', 'app.js'), 'utf8');

// Replace the <link rel="stylesheet" href="assets/style.css"> with inline <style>
html = html.replace(
  /<link\s+rel="stylesheet"\s+href="assets\/style\.css"\s*\/?>/i,
  `<style>\n${css}\n</style>`
);

// Replace the <script src="assets/app.js" defer></script> with inline <script>
html = html.replace(
  /<script\s+src="assets\/app\.js"\s+defer\s*><\/script>/i,
  `<script>\n${js}\n</script>`
);

// Write output
const outPath = resolve(root, '..', 'test.html');
writeFileSync(outPath, html, 'utf8');

const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
console.log(`✅ test.html created (${sizeKB} KB) at: ${outPath}`);
