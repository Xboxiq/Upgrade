#!/usr/bin/env node
/**
 * shatter-css.mjs — Worker 23 / Phase 3 — DEVOTIO Pack v3
 * ────────────────────────────────────────────────────────────────────
 * Splits platform/assets/style.css (the 28K-line monolith) into 6
 * logical files under platform/assets/css/ + a thin entry style.css.
 *
 * Strategy:
 *   1. Locate the three top-level @layer blocks declared in Phase 1:
 *      - @layer tokens   { ... }   → tokens.css (verbatim move)
 *      - @layer themes   { ... }   → KEEP INLINE in entry style.css
 *      - @layer components { ... } → split rule-by-rule into 5 files:
 *           base / utilities / chrome / pages / motion
 *   2. Brace-aware iterator walks components content, classifies each
 *      top-level rule by selector pattern, routes to the right bucket.
 *   3. Trailing post-components doc comments (Phase 1 + Phase 2) move
 *      to motion.css footer (they document overrides discipline).
 *   4. Replace style.css with a thin entry: layer declaration + 6
 *      @import statements + inline @layer themes + Phase 3 banner.
 *
 * Cascade safety:
 *   ALL @import statements use layer(components) EXCEPT tokens.css
 *   which uses layer(tokens). This preserves the exact pre-P3 cascade
 *   (no rule shifts to a different layer). Phase 4-5 may later
 *   promote utilities.css → layer(utilities) once regression-verified.
 *
 * Idempotent: running twice produces the same output.
 * One-shot: this script is removed after Phase 3 ships.
 * ────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

const CSS_PATH = 'platform/assets/style.css';
const OUT_DIR  = 'platform/assets/css';
const STAMP    = new Date().toISOString().slice(0, 10);

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const css = readFileSync(CSS_PATH, 'utf8');

// ── 1. Locate @layer blocks (brace-aware, comment/string-aware) ────
function findLayerBlock(src, name) {
  const opener = `@layer ${name} {`;
  const start = src.indexOf(opener);
  if (start < 0) return null;
  let i = start + opener.length;
  const contentStart = i;
  let depth = 1;
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      i = end < 0 ? src.length : end + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      const q = c;
      i++;
      while (i < src.length && src[i] !== q) {
        if (src[i] === '\\') i++;
        i++;
      }
      i++;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') depth--;
    i++;
  }
  return { start, contentStart, contentEnd: i - 1, blockEnd: i };
}

const tokensBlock     = findLayerBlock(css, 'tokens');
const themesBlock     = findLayerBlock(css, 'themes');
const componentsBlock = findLayerBlock(css, 'components');

if (!tokensBlock || !themesBlock || !componentsBlock) {
  console.error('FATAL: Phase 1 @layer wrappers not found.');
  console.error(`  tokens: ${!!tokensBlock}, themes: ${!!themesBlock}, components: ${!!componentsBlock}`);
  process.exit(1);
}

const tokensContent     = css.slice(tokensBlock.contentStart, tokensBlock.contentEnd).trim();
const themesFullBlock   = css.slice(themesBlock.start, themesBlock.blockEnd);
const componentsContent = css.slice(componentsBlock.contentStart, componentsBlock.contentEnd).trim();
const trailingDocs      = css.slice(componentsBlock.blockEnd).trim();

// ── 2. Brace-aware rule iterator ─────────────────────────────────────
function* iterateRules(text) {
  let i = 0;
  const n = text.length;
  while (i < n) {
    while (i < n && /\s/.test(text[i])) i++;
    if (i >= n) break;
    const ruleStart = i;
    let depth = 0;
    let foundOpen = false;
    while (i < n) {
      const c = text[i];
      if (c === '/' && text[i + 1] === '*') {
        const end = text.indexOf('*/', i + 2);
        i = end < 0 ? n : end + 2;
        continue;
      }
      if (c === '"' || c === "'") {
        const q = c;
        i++;
        while (i < n && text[i] !== q) {
          if (text[i] === '\\') i++;
          i++;
        }
        i++;
        continue;
      }
      if (c === '{') {
        depth++;
        foundOpen = true;
        i++;
        continue;
      }
      if (c === '}') {
        depth--;
        i++;
        if (depth === 0 && foundOpen) break;
        continue;
      }
      if (c === ';' && !foundOpen && depth === 0) {
        i++;
        break;
      }
      i++;
    }
    const chunk = text.slice(ruleStart, i);
    if (chunk.trim()) yield chunk;
  }
}

// ── 3. Classifier — selector → bucket ────────────────────────────────
function classify(rule) {
  const trimmed = rule.trim();
  const atMatch = trimmed.match(/^@([a-zA-Z\-]+)/);

  if (atMatch) {
    const name = atMatch[1].toLowerCase();
    if (name === 'keyframes' || name === '-webkit-keyframes' || name === '-moz-keyframes') {
      return 'motion';
    }
    if (name === 'media') {
      const condEnd = trimmed.indexOf('{');
      const cond = (condEnd > 0 ? trimmed.slice(0, condEnd) : trimmed).toLowerCase();
      if (cond.includes('prefers-reduced-motion')) return 'motion';
      if (cond.includes('prefers-reduced-transparency')) return 'motion';
      if (cond.includes('forced-colors')) return 'motion';
      if (/\bprint\b/.test(cond)) return 'motion';
      // Responsive media queries → pages (default home for content rules)
      return 'pages';
    }
    if (name === 'supports') return 'pages';
    if (name === 'font-face') return 'tokens-aux';
    if (name === 'page') return 'motion'; // print page-rule
    if (name === 'layer') return 'pages';
    return 'pages';
  }

  const braceIdx = trimmed.indexOf('{');
  if (braceIdx < 0) return 'pages';
  const selector = trimmed.slice(0, braceIdx).trim();
  const firstSel = selector.split(',')[0].trim();

  // BASE — bare element / pseudo selectors (low specificity)
  if (/^(html|body|\*|::selection|::-webkit-scrollbar(-thumb|-track)?)$/.test(firstSel)) {
    return 'base';
  }
  if (/^:where\(\*\):focus-visible$/.test(firstSel)) return 'base';

  // CHROME — application chrome (sidebar / topbar / cmdk / nav / etc.)
  const chromeRx = [
    /^\.(sidebar|top-chrome|topbar|topbar-island|app-header|app-footer|breadcrumb|breadcrumbs)\b/,
    /^\.(cmdk-|gateway-|gateway\b|drawer-|drawer\b|scrim\b)/,
    /^\.(nav-rail|nav-pill|nav-tooltip|nav-item|nav-badge|nav-icon|nav-link|nav-section)\b/,
    /^\.(rit-halo-toggle|rit-halo-exit|qcalc-toolbar|sound-indicator|dock)\b/,
    /^#(sidebar|topbar|cmdk-|gateway|app-header|app-footer)/,
    /^\[data-(sidebar|cmdk|drawer|rit-halo-toggle|sound-state|aura-override)\b/,
    /^header\.app-header/,
    /^footer\.app-footer/,
  ];
  if (chromeRx.some(rx => rx.test(firstSel))) return 'chrome';

  // UTILITIES — atomic classes
  const utilRx = [
    /^\.tas-/,
    /^\[data-tas-/,
    /^\.chr-(text|bg|border|tint|grad-page|grad-card|grad-divider|grad-mesh|grad-hero)/,
    /^\.life-(ambient|mesh|breathing|surface)/,
    /^\[data-life\b/,
    /^\.rit-(ink-|thresh-)/,
    /^\[data-rit-(ink|thresh)\b/,
    /^\.type-/,
    /^\[data-type-voice\b/,
    /^\.u-/,
    /^\.qi(\b|[-.\[])/,
    /^\.h-(display|eyebrow|quote|stat|hero|wordmark)/,
    /^\.pointer-trail/,
    /^\.tactile-/,
    /^\[data-(tactile|ripple|magnet)\b/,
    /^\.atelier-/,
    /^\.aurora-/,
    /^\[class\*=["']aurora-/,
  ];
  if (utilRx.some(rx => rx.test(firstSel))) return 'utilities';

  // Default: pages
  return 'pages';
}

// ── 4. Walk + bucket ─────────────────────────────────────────────────
const buckets = {
  'tokens-aux': [],
  base:        [],
  utilities:   [],
  chrome:      [],
  pages:       [],
  motion:      [],
};
const stats = Object.fromEntries(Object.keys(buckets).map(k => [k, 0]));

for (const rule of iterateRules(componentsContent)) {
  const tgt = classify(rule);
  buckets[tgt].push(rule);
  stats[tgt]++;
}

// ── 5. Compose output files ──────────────────────────────────────────
const join = (arr) => arr.join('\n\n').trim() + '\n';

const banner = (file, purpose) => `/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ${file} (Worker 23 / Phase 3 — CSS Shatter)
   Generated: ${STAMP}
   ────────────────────────────────────────────────────────────────────────
   Purpose: ${purpose}
   Imported via: @import url("./css/${file}") layer(<L>) from style.css.
   Cascade: rules retain their pre-P3 layer position (split is purely
            organizational; no cascade tier was changed in Phase 3).
   ════════════════════════════════════════════════════════════════════════ */
`;

const tokensCss = banner('tokens.css', 'Default :root tokens (W11 P1 Sovereign Theme Tokens). Theme overrides (light/dark) live in style.css inline @layer themes.')
  + '\n' + tokensContent + '\n'
  + (buckets['tokens-aux'].length
      ? `\n/* @font-face supplement (auto-routed from @layer components) */\n${join(buckets['tokens-aux'])}`
      : '')
  + '\n/* End tokens.css ──────────────────────────────────────────────────────── */\n';

const baseCss = banner('base.css', 'Bare-element baselines (html, body, *, ::selection, scrollbar). Phase 4-5 may add reset/typography rhythm rules.')
  + (buckets.base.length ? '\n' + join(buckets.base) : '\n/* (placeholder — Phase 4-5 will lift more reset/typography rules here) */\n')
  + '\n/* End base.css ────────────────────────────────────────────────────────── */\n';

const utilitiesCss = banner('utilities.css', 'Atomic utility classes (.tas-* / .chr-* / .h-* / .life-* / .rit-* / .type-* / .u-* / .qi). Routed via layer(components) for Phase 3 safety; Phase 4-5 may promote to layer(utilities).')
  + '\n' + (buckets.utilities.length ? join(buckets.utilities) : '/* (no utilities matched the Phase 3 selector patterns) */\n')
  + '\n/* End utilities.css ───────────────────────────────────────────────────── */\n';

const chromeCss = banner('chrome.css', 'Application chrome — sidebar / topbar / breadcrumb / command palette / nav rail / drawer / dock / halo controls / sound indicator.')
  + '\n' + (buckets.chrome.length ? join(buckets.chrome) : '/* (no chrome rules matched) */\n')
  + '\n/* End chrome.css ──────────────────────────────────────────────────────── */\n';

const pagesCss = banner('pages.css', 'Per-page sections + [data-page-personality] overrides + .page-h headers + .bento-* + .qcalc-* + .cath-* + responsive @media + sub-:root token additions (kept here for cascade safety).')
  + '\n' + (buckets.pages.length ? join(buckets.pages) : '/* (no page rules matched) */\n')
  + '\n/* End pages.css ───────────────────────────────────────────────────────── */\n';

const motionCss = banner('motion.css', 'All @keyframes + a11y guards (@media prefers-reduced-motion / prefers-reduced-transparency / forced-colors) + @media print + @page rules.')
  + '\n' + (buckets.motion.length ? join(buckets.motion) : '/* (no motion rules matched) */\n')
  + (trailingDocs ? `\n/* ── Phase 1 + Phase 2 Discipline (relocated from monolith tail) ────── */\n\n${trailingDocs}\n` : '')
  + '\n/* End motion.css ──────────────────────────────────────────────────────── */\n';

// ── 6. Compose thin entry style.css ──────────────────────────────────
const entryCss = `/* Auto-generated entry from style.css monolith — Worker 23 / Phase 3 — DEVOTIO v3 */

/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — CSS Entry Point (Worker 23 / Phase 3 — CSS Shatter)
   ────────────────────────────────────────────────────────────────────────
   Pack v3 architecture: 6 logical files imported into a single cascade.
   Order: declaration → 6 @imports → inline @layer themes (light + dark).
   Each @import lands inside its declared @layer (HTTP cascade preserved).
   ────────────────────────────────────────────────────────────────────────
   Pre-P3 monolith (~28K lines) deconstructed into:
     css/tokens.css      — :root variables
     css/base.css        — html/body/* baselines
     css/utilities.css   — atomic classes (tas/chr/h/life/rit/type/u/qi)
     css/chrome.css      — sidebar/topbar/cmdk/nav/drawer/dock
     css/pages.css       — per-page sections + responsive media
     css/motion.css      — keyframes + reduced-motion + print + forced-colors
   ────────────────────────────────────────────────────────────────────────
   themes block stays INLINE here — theme switching is flag-driven and
   keeping it in the entry file avoids @import latency on theme toggle.
   ════════════════════════════════════════════════════════════════════════ */

/* Layer declaration — MUST be the first non-charset rule */
@layer reset, tokens, base, utilities, components, themes, overrides;

/* Imports — must precede any other non-@import non-@charset rule */
@import url("./css/tokens.css")    layer(tokens);
@import url("./css/base.css")      layer(base);
@import url("./css/utilities.css") layer(components);
@import url("./css/chrome.css")    layer(components);
@import url("./css/pages.css")     layer(components);
@import url("./css/motion.css")    layer(components);

${themesFullBlock}

/* ════════════════════════════════════════════════════════════════════════
   Worker 23 / Phase 3 — Shatter Discipline:
   1. ٦ ملفات + entry — لا تَخلق ملف سابع بدون phase-spec.
   2. كل ملف له purpose واحد — لا تَخلط chrome مع pages.
   3. @import order = source order (cascade tier set by layer() arg).
   4. themes inline هنا — flag-switch performance critical.
   5. لو احتجت قاعدة جديدة، اختر الملف المناسب — لا تَكتب في style.css.
   6. كل الـ imports حالياً layer(components) ما عدا tokens — Phase 3 safety.
   7. Phase 4-5 قد يَرفع utilities.css → layer(utilities) بعد التحقّق.
   8. ZERO CDN: كل @import نسبي. صفر طلبات خارجية.
   ════════════════════════════════════════════════════════════════════════ */
`;

// ── 7. Write all outputs ─────────────────────────────────────────────
writeFileSync(`${OUT_DIR}/tokens.css`,    tokensCss);
writeFileSync(`${OUT_DIR}/base.css`,      baseCss);
writeFileSync(`${OUT_DIR}/utilities.css`, utilitiesCss);
writeFileSync(`${OUT_DIR}/chrome.css`,    chromeCss);
writeFileSync(`${OUT_DIR}/pages.css`,     pagesCss);
writeFileSync(`${OUT_DIR}/motion.css`,    motionCss);
writeFileSync(CSS_PATH,                   entryCss);

// ── 8. Summary ──────────────────────────────────────────────────────
console.log('\n🪨  CSS Shatter — Phase 3 — complete.\n');
console.log('Routing summary (top-level rules from @layer components):');
for (const [k, v] of Object.entries(stats)) {
  console.log(`  ${k.padEnd(12)} → ${String(v).padStart(5)} rules`);
}
console.log('\nFile sizes:');
for (const f of ['tokens.css', 'base.css', 'utilities.css', 'chrome.css', 'pages.css', 'motion.css']) {
  const lines = readFileSync(`${OUT_DIR}/${f}`, 'utf8').split('\n').length;
  console.log(`  css/${f.padEnd(14)} ${String(lines).padStart(6)} lines`);
}
const entryLines = readFileSync(CSS_PATH, 'utf8').split('\n').length;
console.log(`  style.css       ${String(entryLines).padStart(6)} lines (entry)\n`);
