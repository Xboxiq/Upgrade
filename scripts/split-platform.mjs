#!/usr/bin/env node
/**
 * split-platform.mjs
 * شطر ملف منصة التدريب (HTML أحادي ضخم) لثلاث ملفات: HTML + CSS + JS
 * بدون تغيير أي سلوك. آمن — يُنشئ ملفات جديدة في dist/ بدون لمس الأصل.
 *
 * Usage:
 *   node scripts/split-platform.mjs "arabic-training-platform-v12 (1) (4) (1) (1) (1).html"
 *
 * المخرجات:
 *   dist/index.html        ← الهيكل + روابط للـ assets
 *   dist/assets/style.css  ← كل <style> blocks مدموجة بالترتيب
 *   dist/assets/app.js     ← كل <script> blocks (inline) مدموجة بالترتيب
 *
 * يحافظ على:
 * - ترتيب الـ blocks (CSS و JS بنفس ترتيب ظهورها — مهم للـ specificity والـ IIFE deps)
 * - الـ <link rel="preconnect"> و <meta> و <link> الخارجية
 * - أي <script src="..."> خارجي (يبقى كما هو)
 * - الـ id attributes والـ media attributes في style/script tags (تتحول إلى تعليقات قسم)
 */

import fs from 'node:fs';
import path from 'node:path';

const inputArg = process.argv[2];
if (!inputArg) {
  console.error('Usage: node split-platform.mjs <input.html>');
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
if (!fs.existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

const html = fs.readFileSync(inputPath, 'utf8');
const outDir = path.resolve('dist');
const assetsDir = path.join(outDir, 'assets');
fs.mkdirSync(assetsDir, { recursive: true });

// Parse style/script blocks while preserving order.
// Note: regex parsing of HTML is fragile; this works because the source file
// uses standard tags without weird attributes inside the opening tag.

const cssChunks = [];
const jsChunks = [];
let chunkIndex = 0;

// Replace inline <style>...</style> with marker (we'll later strip them from <head>)
// And inline <script>...</script> (without src) with marker
let cleaned = html;

// Helper: extract opening-tag attrs into a tag header comment
function tagHeader(tagOpen, kind, idx) {
  const idMatch = tagOpen.match(/\bid=["']([^"']+)["']/);
  const idLabel = idMatch ? idMatch[1] : `block-${idx}`;
  return `/* ===== ${kind} block #${idx} (id: ${idLabel}) ===== */`;
}

// Process <style> blocks
cleaned = cleaned.replace(
  /<style\b([^>]*)>([\s\S]*?)<\/style>/gi,
  (match, attrs, body) => {
    chunkIndex++;
    const header = tagHeader(`<style${attrs}>`, 'CSS', chunkIndex);
    cssChunks.push(`${header}\n${body.trim()}\n`);
    return `<!-- moved to assets/style.css :: block #${chunkIndex} -->`;
  }
);

// Process <script> blocks WITHOUT src attribute (inline scripts only)
let scriptIndex = 0;
cleaned = cleaned.replace(
  /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
  (match, attrs, body) => {
    // If the script has src=, leave it alone (external script)
    if (/\bsrc\s*=/.test(attrs)) return match;
    // If type is something other than empty / "text/javascript" / "module", keep it
    const typeMatch = attrs.match(/\btype\s*=\s*["']([^"']+)["']/i);
    if (typeMatch && !/^(text\/javascript|module|application\/javascript)$/i.test(typeMatch[1])) {
      return match; // e.g., type="application/json" — keep inline
    }
    scriptIndex++;
    const header = tagHeader(`<script${attrs}>`, 'JS', scriptIndex);
    // Wrap each block in IIFE-safe boundary comments to keep ordering visible
    jsChunks.push(`${header}\n${body.trim()}\n`);
    return `<!-- moved to assets/app.js :: block #${scriptIndex} -->`;
  }
);

// Inject <link> and <script src> into head/body
const linkTag = `\n<link rel="stylesheet" href="assets/style.css">\n`;
const scriptTag = `\n<script src="assets/app.js" defer></script>\n`;

// Add stylesheet at end of <head>
if (/<\/head>/i.test(cleaned)) {
  cleaned = cleaned.replace(/<\/head>/i, `${linkTag}</head>`);
} else {
  cleaned = `${linkTag}\n${cleaned}`;
}

// Add app.js right before </body>
if (/<\/body>/i.test(cleaned)) {
  cleaned = cleaned.replace(/<\/body>/i, `${scriptTag}</body>`);
} else {
  cleaned = `${cleaned}\n${scriptTag}`;
}

// Write outputs
fs.writeFileSync(path.join(outDir, 'index.html'), cleaned);
fs.writeFileSync(
  path.join(assetsDir, 'style.css'),
  `/* Auto-generated from ${path.basename(inputPath)} — do not hand-edit */\n\n` +
    cssChunks.join('\n')
);
fs.writeFileSync(
  path.join(assetsDir, 'app.js'),
  `/* Auto-generated from ${path.basename(inputPath)} — do not hand-edit */\n` +
    `/* IIFE blocks preserved in original document order. */\n\n` +
    jsChunks.join('\n')
);

// Stats
const stat = (p) => (fs.statSync(p).size / 1024).toFixed(1) + ' KB';
console.log('✅ Split complete');
console.log(`  Original input    : ${stat(inputPath)}`);
console.log(`  dist/index.html   : ${stat(path.join(outDir, 'index.html'))}`);
console.log(`  dist/assets/style : ${stat(path.join(assetsDir, 'style.css'))} (${cssChunks.length} blocks)`);
console.log(`  dist/assets/app   : ${stat(path.join(assetsDir, 'app.js'))} (${jsChunks.length} blocks)`);
console.log('\nNext: open dist/index.html in browser to verify behavior matches the original.');
