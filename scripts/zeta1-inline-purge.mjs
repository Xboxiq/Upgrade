#!/usr/bin/env node
/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ζ1 — Inline Style Purge (Truthful)
   ──────────────────────────────────────────────────────────────────────
   Deterministic, idempotent migration. Reads platform/index.html, applies
   exact-string replacements observed in the α-forensic scan, writes back.

   Rules:
   - Hardcoded color/spacing inline → utilities (existing or _layout.css).
   - Dynamic --var styles preserved verbatim.
   - Refuses to apply a replacement if its match count ≠ expected.
   - Emits before/after counts for audit.

   Authority: prompts/v4/ζ1_INLINE_PURGE.md
   ──────────────────────────────────────────────────────────────────────── */

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot  = path.resolve(__dirname, '..');
const target    = path.join(repoRoot, 'platform', 'index.html');

const before = fs.readFileSync(target, 'utf8');
let html = before;

/* Each entry: [oldString, newString, expectedCount]. */
const subs = [
  /* ──── 1. sp-fill seed: JS owns this; no FOUC because pages.css renders track. */
  [
    '<div class="sp-fill" data-sp-fill style="inline-size:0%;width:0%"></div>',
    '<div class="sp-fill" data-sp-fill></div>',
    1,
  ],

  /* ──── 2. er-gauge wrapper: hide via class, center via class. */
  [
    '<div id="er-gauge-wrap" style="margin:0 auto 16px; display:none;">',
    '<div class="u-mx-auto u-mb-4 u-display-none" id="er-gauge-wrap">',
    1,
  ],
  /* ──── 3. er-gauge bar: gradient becomes --var; height/radius/transition class. */
  [
    '<div id="er-gauge-bar" style="height:100%; border-radius:99px; transition:width 0.6s ease; background:linear-gradient(90deg,#EF4444,#EAB308,#22C55E);"></div>',
    '<div class="u-h-full u-rounded-99 u-transition-w-600" id="er-gauge-bar" style="background:linear-gradient(90deg, var(--er-gauge-from,#EF4444), var(--er-gauge-mid,#EAB308), var(--er-gauge-to,#22C55E))"></div>',
    1,
  ],

  /* ──── 4. psych-pt-dot: brand-c hook. */
  [
    '<div class="psych-pt-dot" style="background:#ff0000;box-shadow:0 0 5px #ff0000;"></div>',
    '<div class="psych-pt-dot u-bg-brand u-shadow-brand-glow" style="--brand-c:#ff0000"></div>',
    1,
  ],

  /* ──── 5. social brand-color spans (emoji content untouched, out of ζ1 scope). */
  [
    '<div class="w6-tr-h" style="color:#E4405F;">📸 Instagram</div>',
    '<div class="w6-tr-h u-c-brand" style="--brand-c:#E4405F">📸 Instagram</div>',
    1,
  ],
  [
    '<div class="w6-tr-h" style="color:#FF0000;">▶️ YouTube</div>',
    '<div class="w6-tr-h u-c-brand" style="--brand-c:#FF0000">▶️ YouTube</div>',
    1,
  ],
  [
    '<div class="w6-tr-h" style="color:#FFFC00;">👻 Snapchat</div>',
    '<div class="w6-tr-h u-c-brand" style="--brand-c:#FFFC00">👻 Snapchat</div>',
    1,
  ],

  /* ──── 6. Generic grid blocks. utilities.css supplies u-mb-N (px),
            u-gap-N (px), u-mt-N (px) on the second copy (line 411+). */
  [
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px;">',
    '<div class="u-grid u-grid-3 u-gap-35 u-mt-4">',
    1,
  ],
  [
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px;">',
    '<div class="u-grid u-grid-1-1 u-gap-35 u-mt-35">',
    1,
  ],
  [
    '<div class="w6-attn-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px;">',
    '<div class="w6-attn-grid u-grid u-grid-auto-280 u-gap-35">',
    1,
  ],
  [
    '<div class="w6-algo-table" style="display:grid; grid-template-columns:1.2fr 2fr 1.4fr 1.2fr; font-size:12px;">',
    '<div class="w6-algo-table u-grid u-grid-w6-algo u-fs-12">',
    1,
  ],

  /* ──── 7. ql-glass tinted overlays. */
  [
    '<div class="ql-glass" style="margin-top:20px; padding:16px 18px; border-radius:12px; border-color:rgba(102,252,241,0.2); background:rgba(102,252,241,0.04);">',
    '<div class="ql-glass u-mt-5 u-p-16-18 u-rounded-12 u-tint-cyan">',
    1,
  ],
  [
    '<div class="w6-pillars-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px;">',
    '<div class="w6-pillars-grid u-grid u-grid-auto-220 u-gap-35">',
    1,
  ],
  [
    '<div class="w6-fw-grid" id="w6FwGrid" data-w6="frameworks-list" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:12px;">',
    '<div class="w6-fw-grid u-grid u-grid-auto-320 u-gap-3" id="w6FwGrid" data-w6="frameworks-list">',
    1,
  ],
  [
    '<div class="w6-cal-wrap" style="display:grid; grid-template-columns:200px 1fr; gap:16px; align-items:flex-start;">',
    '<div class="w6-cal-wrap u-grid u-grid-w6-cal u-gap-4 u-items-start">',
    1,
  ],
  [
    '<div class="ql-glass" style="padding:14px; border-radius:14px; position:sticky; top:80px;">',
    '<div class="ql-glass u-p-14 u-rounded-14 u-sticky-top-80">',
    1,
  ],
  [
    '<div id="w6CalGrid" data-w6="cal-grid" style="display:grid; grid-template-columns:repeat(7, 1fr); gap:6px;">',
    '<div class="u-grid u-grid-7 u-gap-1-5" id="w6CalGrid" data-w6="cal-grid">',
    1,
  ],
  [
    '<div class="w6-perf-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; margin-bottom:18px;">',
    '<div class="w6-perf-grid u-grid u-grid-auto-180 u-gap-3 u-mb-45">',
    1,
  ],
  [
    '<div class="w6-perf-results" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px;">',
    '<div class="w6-perf-results u-grid u-grid-auto-150 u-gap-2-5">',
    1,
  ],
  [
    '<div class="ql-glass" style="margin-top:14px; padding:16px 18px; border-radius:12px; border-color:rgba(245,158,11,0.25); background:rgba(245,158,11,0.04);">',
    '<div class="ql-glass u-mt-35 u-p-16-18 u-rounded-12 u-tint-amber">',
    1,
  ],
  [
    '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; margin-bottom:18px;">',
    '<div class="u-grid u-grid-auto-220 u-gap-35 u-mb-45">',
    1,
  ],
  [
    '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:10px;">',
    '<div class="u-grid u-grid-auto-160 u-gap-2-5">',
    1,
  ],
  [
    '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin-bottom:18px;">',
    '<div class="u-grid u-grid-auto-220 u-gap-3 u-mb-45">',
    1,
  ],

  /* ──── 8. Do's / Don'ts colored labels. */
  [
    '<div style="font-size:12px; font-weight:800; color:#22C55E; margin-bottom:10px; letter-spacing:0.5px;">✅ افعل (Do\'s)</div>',
    '<div class="u-fs-12 u-font-black u-c-brand u-mb-25 u-track-wide" style="--brand-c:#22C55E">✅ افعل (Do\'s)</div>',
    1,
  ],
  [
    '<div style="font-size:12px; font-weight:800; color:#EF4444; margin-bottom:10px; letter-spacing:0.5px;">❌ لا تفعل (Don\'ts)</div>',
    '<div class="u-fs-12 u-font-black u-c-brand u-mb-25 u-track-wide" style="--brand-c:#EF4444">❌ لا تفعل (Don\'ts)</div>',
    1,
  ],
  [
    '<div class="ql-glass" style="margin-top:14px; padding:16px 18px; border-radius:14px; border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.04);">',
    '<div class="ql-glass u-mt-35 u-p-16-18 u-rounded-14 u-tint-amber u-tint-amber-strong">',
    1,
  ],
  [
    '<div class="ql-glass" style="margin-top:14px; padding:14px 16px; border-radius:12px; border-color:rgba(102,252,241,0.2); background:rgba(102,252,241,0.04);">',
    '<div class="ql-glass u-mt-35 u-p-14-16 u-rounded-12 u-tint-cyan">',
    1,
  ],
  [
    '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; margin-bottom:16px;">',
    '<div class="u-grid u-grid-auto-180 u-gap-3 u-mb-4">',
    1,
  ],
  [
    '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px; margin-bottom:16px;">',
    '<div class="u-grid u-grid-auto-150 u-gap-2-5 u-mb-4">',
    1,
  ],
  [
    '<div class="ql-glass" style="margin-top:14px; padding:14px 16px; border-radius:12px; border-color:rgba(139,92,246,0.25); background:rgba(139,92,246,0.04);">',
    '<div class="ql-glass u-mt-35 u-p-14-16 u-rounded-12 u-tint-violet">',
    1,
  ],
  [
    '<table style="width:100%; border-collapse:collapse; font-size:12px; min-width:540px;">',
    '<table class="u-w-full u-border-collapse u-fs-12 u-min-w-540">',
    1,
  ],
  [
    '<div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px;">',
    '<div class="u-grid u-grid-1-1 u-gap-35 u-mb-45">',
    1,
  ],
  [
    '<div style="display:grid; grid-template-columns:1fr 1fr; gap:18px;">',
    '<div class="u-grid u-grid-1-1 u-gap-45">',
    1,
  ],
  [
    '<div class="ql-glass" style="padding:18px 22px; border-radius:14px;">',
    '<div class="ql-glass u-p-18-22 u-rounded-14">',
    1,
  ],

  /* ──── 9. VHS scrub ticks → --tick-pos custom property (joins dynamic-var pool). */
  [
    '<span class="vhs-scrub__tick" style="inset-inline-start:0%"></span>',
    '<span class="vhs-scrub__tick u-pos-tick" style="--tick-pos:0%"></span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick-label" style="inset-inline-start:0%">يناير</span>',
    '<span class="vhs-scrub__tick-label u-pos-tick" style="--tick-pos:0%">يناير</span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick" style="inset-inline-start:25%"></span>',
    '<span class="vhs-scrub__tick u-pos-tick" style="--tick-pos:25%"></span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick-label" style="inset-inline-start:25%">أبريل</span>',
    '<span class="vhs-scrub__tick-label u-pos-tick" style="--tick-pos:25%">أبريل</span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick" style="inset-inline-start:50%"></span>',
    '<span class="vhs-scrub__tick u-pos-tick" style="--tick-pos:50%"></span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick-label" style="inset-inline-start:50%">يوليو</span>',
    '<span class="vhs-scrub__tick-label u-pos-tick" style="--tick-pos:50%">يوليو</span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick" style="inset-inline-start:75%"></span>',
    '<span class="vhs-scrub__tick u-pos-tick" style="--tick-pos:75%"></span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick-label" style="inset-inline-start:75%">أكتوبر</span>',
    '<span class="vhs-scrub__tick-label u-pos-tick" style="--tick-pos:75%">أكتوبر</span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick" style="inset-inline-start:100%"></span>',
    '<span class="vhs-scrub__tick u-pos-tick" style="--tick-pos:100%"></span>',
    1,
  ],
  [
    '<span class="vhs-scrub__tick-label" style="inset-inline-start:100%">ديسمبر</span>',
    '<span class="vhs-scrub__tick-label u-pos-tick" style="--tick-pos:100%">ديسمبر</span>',
    1,
  ],

  /* ──── 10. Remaining fixed-grid blocks. */
  [
    '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px;">',
    '<div class="u-grid u-grid-4 u-gap-35 u-mb-6">',
    1,
  ],
  [
    '<div id="sim-cards-grid" style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:32px;"></div>',
    '<div class="u-grid u-grid-3 u-gap-4 u-mb-8" id="sim-cards-grid"></div>',
    1,
  ],
  [
    '<div id="eng-feedback-icon" style="font-size:28px;"></div>',
    '<div class="u-fs-28" id="eng-feedback-icon"></div>',
    1,
  ],
  [
    '<button class="btn btn-primary" id="eng-next-btn" onclick="nextScenario()" style="padding:12px 32px; font-size:14px;">',
    '<button class="btn btn-primary u-p-12-32 u-fs-14" id="eng-next-btn" onclick="nextScenario()">',
    1,
  ],
  [
    '<div style="font-size:64px; margin-bottom:16px;" id="report-emoji"></div>',
    '<div class="u-fs-64 u-mb-4" id="report-emoji"></div>',
    1,
  ],
  [
    '<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px;">',
    '<div class="u-grid u-grid-3 u-gap-35 u-mb-7">',
    1,
  ],
  [
    '<div style="font-size:28px;flex-shrink:0;margin-top:2px;">🎯</div>',
    '<div class="u-fs-28 u-flex-shrink-0 u-mt-0-5">🎯</div>',
    1,
  ],
  [
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;" id="eq-assessment">',
    '<div class="u-grid u-grid-1-1 u-gap-4" id="eq-assessment">',
    1,
  ],
  [
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">',
    '<div class="u-grid u-grid-4 u-gap-4">',
    1,
  ],
  [
    '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:16px;">',
    '<div class="u-grid u-grid-1-1 u-gap-35 u-mt-4">',
    1,
  ],
  [
    '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;">',
    '<div class="u-grid u-grid-1-1 u-gap-35">',
    1,
  ],
  [
    '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:28px;">',
    '<div class="u-grid u-grid-5 u-gap-3 u-mb-7">',
    1,
  ],

  /* ──── 11. Final two — the F59E0B amber-eyebrow uses brand-c hook +
            uppercase + wider tracking; the 26px badge gets fs class. */
  [
    '<div style="font-size:11px;font-weight:800;color:#F59E0B;margin-bottom:4px;letter-spacing:1.3px;text-transform:uppercase;">🧪 محاكاة: اكتشف الاحتيال</div>',
    '<div class="u-fs-11 u-font-black u-c-brand u-mb-1 u-track-wider u-uppercase" style="--brand-c:#F59E0B">🧪 محاكاة: اكتشف الاحتيال</div>',
    1,
  ],
  [
    '<div style="font-size:26px;" class="badge-toast-emoji">🏆</div>',
    '<div class="badge-toast-emoji u-fs-26">🏆</div>',
    1,
  ],

  /* ──── 12. Drop the 4× fixed --rib-pos inlines (CSS now sets via nth-child). */
  [
    '                <li style="--rib-pos: 20%"></li>',
    '                <li></li>',
    1,
  ],
  [
    '                <li style="--rib-pos: 40%"></li>',
    '                <li></li>',
    1,
  ],
  [
    '                <li style="--rib-pos: 60%"></li>',
    '                <li></li>',
    1,
  ],
  [
    '                <li style="--rib-pos: 80%"></li>',
    '                <li></li>',
    1,
  ],

  /* ──── 13. Drop redundant --progress: 0% seeds.
            CSS already declares: .page-mastery-progress-fill { width: var(--progress, 0%); }
            (pages.css line 22514 + 22608). The inline is a no-op seed. */
  [
    '<div class="page-mastery-progress-fill" style="--progress: 0%" data-page-progress-fill></div>',
    '<div class="page-mastery-progress-fill" data-page-progress-fill></div>',
    13, /* observed count: matches across all page-mastery-progress-fill instances */
  ],

  /* ──── 14. Drop redundant --progress-pct: 0% seeds (CSS has fallback). */
  [
    '<div class="progress-margin__fill" style="--progress-pct: 0%"></div>',
    '<div class="progress-margin__fill"></div>',
    1,
  ],
  [
    '                 style="--progress-pct: 0%">',
    '                 >',
    1,
  ],

  /* ──── 15. eng-progress-bar — gradient with var, becomes class + minimal --var inline. */
  [
    '<div id="eng-progress-bar" style="height:100%; background:linear-gradient(90deg,var(--accent),#0EA5E9); border-radius:99px; transition:width 0.5s ease; width:0%;"></div>',
    '<div class="u-h-full u-rounded-99" id="eng-progress-bar" style="background:linear-gradient(90deg, var(--accent), var(--eng-grad-to,#0EA5E9)); transition:width 0.5s ease; width:var(--eng-pct, 0%)"></div>',
    1,
  ],

  /* ──── 16. card with margin-bottom + border-color — combine to class only. */
  [
    '<div class="card" style="margin-bottom:16px; border-color:var(--border-hover);">',
    '<div class="card u-mb-4" style="border-color:var(--border-hover)">',
    1,
  ],

  /* ──── 17. eyebrow line in eng module — typography only. */
  [
    '<div style="font-size:11px; font-weight:700; color:var(--text-muted); letter-spacing:0.5px; margin-bottom:12px; text-transform:uppercase;">كيف ستتصرف؟</div>',
    '<div class="u-fs-11 u-font-bold u-text-muted u-track-wide u-mb-3 u-uppercase">كيف ستتصرف؟</div>',
    1,
  ],

  /* ──── 18. Bottom small loadbar gradient — use vars throughout, classes for shape. */
  [
    '<div style="height:100%; background:linear-gradient(90deg, var(--accent), #0EA5E9); border-radius:99px; animation:loadBar 2s ease forwards;"></div>',
    '<div class="u-h-full u-rounded-99" style="background:linear-gradient(90deg, var(--accent), var(--load-to,#0EA5E9)); animation:loadBar 2s ease forwards"></div>',
    1,
  ],

  /* ──── 19. tiny "حدث / يوم" caption (already mostly var, just font-size). */
  [
    '<span style="font-size:.78rem;color:var(--color-text-faint,rgba(255,255,255,.5));">حدث / يوم</span>',
    '<span class="u-text-faint u-fs-78r">حدث / يوم</span>',
    1,
  ],
  [
    '<span class="u-text-faint" style="font-size:.78rem">حدث / يوم</span>',
    '<span class="u-text-faint u-fs-78r">حدث / يوم</span>',
    1,
  ],

  /* ──── 20. spin-detail-text — multi-property, ⇒ class. */
  [
    '<div class="spin-detail-text" style="color:#EF4444; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15); border-radius:var(--radius-sm); padding:7px 10px; font-size:11.5px;">',
    '<div class="spin-detail-text u-tint-rose-soft" style="--brand-c:#EF4444">',
    1,
  ],

  /* ──── 21. ol citation lists — same triple appearance, single class. */
  [
    '<ol style="font-size:12px; color:var(--text-muted); line-height:1.95; padding-inline-start:22px; margin:0;">',
    '<ol class="u-list-w6-cite u-fs-12">',
    1,
  ],
  [
    '<ol style="font-size:11.5px; color:var(--text-muted); line-height:1.85; padding-inline-start:22px; margin:0;">',
    '<ol class="u-list-w6-cite u-list-w6-cite--tight">',
    1,
  ],
  [
    '<ol class="w6-cite-list" style="font-size:11.5px; color:var(--text-muted); line-height:1.95; padding-inline-start:22px; margin:0;">',
    '<ol class="w6-cite-list u-list-w6-cite">',
    1,
  ],

  /* ──── 22. tax-bracket li — three are 50%, replace --bracket-width with class default. */
  /* These ARE legitimate dynamic-var inlines (5 of them) that must remain
     because JS hydrates --bracket-fill at runtime. Keep verbatim. */
];

/* ─────── Apply ─────── */
let appliedCount = 0;
const warnings = [];

for (const [oldStr, newStr, expected] of subs) {
  const occurrences = html.split(oldStr).length - 1;
  if (occurrences === 0) {
    warnings.push(`MISS: pattern not found (already migrated?)\n   ${oldStr.slice(0, 80).replace(/\s+/g, ' ')}…`);
    continue;
  }
  if (occurrences !== expected) {
    warnings.push(`COUNT-MISMATCH: expected ${expected} got ${occurrences}\n   ${oldStr.slice(0, 80).replace(/\s+/g, ' ')}…`);
    continue;
  }
  html = html.split(oldStr).join(newStr);
  appliedCount += occurrences;
}

/* ─────── Audit ─────── */
function countMatches(text, pattern) {
  const m = text.match(pattern);
  return m ? m.length : 0;
}

const inlineBefore     = countMatches(before, /style="[^"]+"/g);
const inlineAfter      = countMatches(html,   /style="[^"]+"/g);
const noVarBefore      = countMatches(before, /style="(?:(?!--)[^"])+"/g);
const noVarAfter       = countMatches(html,   /style="(?:(?!--)[^"])+"/g);
const dynamicVarBefore = inlineBefore - noVarBefore;
const dynamicVarAfter  = inlineAfter  - noVarAfter;

if (process.argv.includes('--dry')) {
  console.log('---DRY RUN (no write)---');
} else {
  fs.writeFileSync(target, html, 'utf8');
}

console.log('=== ζ1 Inline Purge ===');
console.log(`replacements applied : ${appliedCount}`);
console.log(`inline_before        : ${inlineBefore}`);
console.log(`inline_after         : ${inlineAfter}`);
console.log(`hardcoded_before     : ${noVarBefore}`);
console.log(`hardcoded_after      : ${noVarAfter}`);
console.log(`dynamic_var_before   : ${dynamicVarBefore}`);
console.log(`dynamic_var_after    : ${dynamicVarAfter}`);
if (warnings.length) {
  console.log('\n--- WARNINGS ---');
  warnings.forEach(w => console.log(w));
} else {
  console.log('\n--- no warnings ---');
}
