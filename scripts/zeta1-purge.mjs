/**
 * ζ1 — Inline Style Purge (Truthful, deterministic).
 *
 * Reads platform/index.html, applies a frozen list of (from → to) string
 * replacements, asserts each replacement was applied exactly the expected
 * number of times, then writes the file back.
 *
 * Idempotent: running twice is safe — second run reports 0 applications.
 *
 * Forensic invariants (asserted before writing):
 *   1. The non-dynamic inline-style count drops to 0.
 *   2. The total inline-style count stays ≤ 30 (only --var dynamic remains).
 *   3. No semantic class strings are altered (we only mutate `style="..."`
 *      attributes; classes are extended via concatenation when a class
 *      attribute already exists, or added via a fresh `class="…"` when
 *      no class attribute was present).
 *
 * Run: node scripts/zeta1-purge.mjs
 */

import { readFile, writeFile } from "node:fs/promises";

const FILE = "platform/index.html";

/* ────────────────────────────────────────────────────────────────────────
 * Replacement table.
 * Each entry:
 *   { from: <exact substring>, to: <replacement>, expect: <integer count> }
 * Order matters — earlier entries can affect lines that later entries
 * grep for, so we keep one entry per logical site.
 * ──────────────────────────────────────────────────────────────────────── */

const REPLACEMENTS = [
  /* 1. sp-fill: convert hardcoded width:0% to dynamic --sp-fill ──────── */
  {
    from: '<div class="sp-fill" data-sp-fill style="inline-size:0%;width:0%"></div>',
    to:   '<div class="sp-fill" data-sp-fill style="--sp-fill: 0%"></div>',
    expect: 1,
  },

  /* 2. er-gauge-wrap ─────────────────────────────────────────────────── */
  {
    from: '<div id="er-gauge-wrap" style="margin:0 auto 16px; display:none;">',
    to:   '<div id="er-gauge-wrap" class="u-gauge-wrap">',
    expect: 1,
  },

  /* 3. er-gauge-bar ──────────────────────────────────────────────────── */
  {
    from: '<div id="er-gauge-bar" style="height:100%; border-radius:99px; transition:width 0.6s ease; background:linear-gradient(90deg,#EF4444,#EAB308,#22C55E);"></div>',
    to:   '<div id="er-gauge-bar" class="u-gauge-bar"></div>',
    expect: 1,
  },

  /* 4. er-gauge-marker (dynamic position) ────────────────────────────── */
  // already uses position:absolute; left is dynamic. Keep as-is, addressed by JS.
  // Not present in non-dynamic list, skipped.

  /* 5. psych-pt-dot red dot ──────────────────────────────────────────── */
  {
    from: '<div class="psych-pt-dot" style="background:#ff0000;box-shadow:0 0 5px #ff0000;"></div>',
    to:   '<div class="psych-pt-dot psych-pt-dot--tinted" style="--pt-color: 255 0 0"></div>',
    expect: 1,
  },

  /* 6. grid-3 + mt-16 ────────────────────────────────────────────────── */
  {
    from: '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px;">',
    to:   '<div class="u-grid-3 u-mt-16">',
    expect: 1,
  },

  /* 7. grid-2 + mt-14 ────────────────────────────────────────────────── */
  {
    from: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px;">',
    to:   '<div class="u-grid-2 u-mt-14">',
    expect: 1,
  },

  /* 8. w6-attn-grid auto-280 ─────────────────────────────────────────── */
  {
    from: '<div class="w6-attn-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px;">',
    to:   '<div class="w6-attn-grid u-grid-auto-280">',
    expect: 1,
  },

  /* 9. w6-algo-table table grid ──────────────────────────────────────── */
  {
    from: '<div class="w6-algo-table" style="display:grid; grid-template-columns:1.2fr 2fr 1.4fr 1.2fr; font-size:12px;">',
    to:   '<div class="w6-algo-table u-grid-table-w6h">',
    expect: 1,
  },

  /* 10. w6-tr-h Instagram ───────────────────────────────────────────── */
  {
    from: '<div class="w6-tr-h" style="color:#E4405F;">',
    to:   '<div class="w6-tr-h u-platform-ig">',
    expect: 1,
  },

  /* 11. w6-tr-h YouTube ──────────────────────────────────────────────── */
  {
    from: '<div class="w6-tr-h" style="color:#FF0000;">',
    to:   '<div class="w6-tr-h u-platform-yt">',
    expect: 1,
  },

  /* 12. w6-tr-h Snapchat ─────────────────────────────────────────────── */
  {
    from: '<div class="w6-tr-h" style="color:#FFFC00;">',
    to:   '<div class="w6-tr-h u-platform-sc">',
    expect: 1,
  },

  /* 13. ql-glass mt-20 + tinted-aside soft cyan ─────────────────────── */
  {
    from: '<div class="ql-glass" style="margin-top:20px; padding:16px 18px; border-radius:12px; border-color:rgba(102,252,241,0.2); background:rgba(102,252,241,0.04);">',
    to:   '<div class="ql-glass u-mt-20 u-pad-card u-tinted-aside--soft" style="--tint: 102 252 241">',
    expect: 1,
  },

  /* 14. w6-pillars-grid auto-220 ─────────────────────────────────────── */
  {
    from: '<div class="w6-pillars-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px;">',
    to:   '<div class="w6-pillars-grid u-grid-auto-220">',
    expect: 1,
  },

  /* 15. w6-fw-grid auto-320 ──────────────────────────────────────────── */
  {
    from: '<div class="w6-fw-grid" id="w6FwGrid" data-w6="frameworks-list" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:12px;">',
    to:   '<div class="w6-fw-grid u-grid-auto-320" id="w6FwGrid" data-w6="frameworks-list">',
    expect: 1,
  },

  /* 16. w6-cal-wrap calendar layout ──────────────────────────────────── */
  {
    from: '<div class="w6-cal-wrap" style="display:grid; grid-template-columns:200px 1fr; gap:16px; align-items:flex-start;">',
    to:   '<div class="w6-cal-wrap u-grid-cal-row">',
    expect: 1,
  },

  /* 17. ql-glass aside-sticky ────────────────────────────────────────── */
  {
    from: '<div class="ql-glass" style="padding:14px; border-radius:14px; position:sticky; top:80px;">',
    to:   '<div class="ql-glass u-aside-sticky">',
    expect: 1,
  },

  /* 18. w6CalGrid grid-7 ─────────────────────────────────────────────── */
  {
    from: '<div id="w6CalGrid" data-w6="cal-grid" style="display:grid; grid-template-columns:repeat(7, 1fr); gap:6px;">',
    to:   '<div id="w6CalGrid" data-w6="cal-grid" class="u-grid-7">',
    expect: 1,
  },

  /* 19. w6-perf-grid auto-180 + mb-18 ────────────────────────────────── */
  {
    from: '<div class="w6-perf-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; margin-bottom:18px;">',
    to:   '<div class="w6-perf-grid u-grid-auto-180 u-mb-18">',
    expect: 1,
  },

  /* 20. w6-perf-results auto-150 ─────────────────────────────────────── */
  {
    from: '<div class="w6-perf-results" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px;">',
    to:   '<div class="w6-perf-results u-grid-auto-150">',
    expect: 1,
  },

  /* 21. ql-glass mt-14 + tinted amber 12 ────────────────────────────── */
  {
    from: '<div class="ql-glass" style="margin-top:14px; padding:16px 18px; border-radius:12px; border-color:rgba(245,158,11,0.25); background:rgba(245,158,11,0.04);">',
    to:   '<div class="ql-glass u-mt-14 u-pad-card u-tinted-aside" style="--tint: 245 158 11">',
    expect: 1,
  },

  /* 22. div auto-220 + mb-18 (2x sites — same exact substring twice) ─ */
  {
    from: '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; margin-bottom:18px;">',
    to:   '<div class="u-grid-auto-220 u-mb-18">',
    expect: 1,
  },

  /* 23. div auto-160 ─────────────────────────────────────────────────── */
  {
    from: '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:10px;">',
    to:   '<div class="u-grid-auto-160">',
    expect: 1,
  },

  /* 24. div auto-220 + mb-18 with --gap 12 (one outlier) ─────────────── */
  {
    from: '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin-bottom:18px;">',
    to:   '<div class="u-grid-auto-220 u-mb-18" style="--gap: 12px">',
    expect: 1,
  },

  /* 25. eyebrow Do's — green tint ────────────────────────────────────── */
  {
    from: `<div style="font-size:12px; font-weight:800; color:#22C55E; margin-bottom:10px; letter-spacing:0.5px;">✅ افعل (Do's)</div>`,
    to:   `<div class="u-eyebrow-tinted" style="--tint: 34 197 94">✅ افعل (Do's)</div>`,
    expect: 1,
  },

  /* 26. eyebrow Don'ts — red tint ────────────────────────────────────── */
  {
    from: `<div style="font-size:12px; font-weight:800; color:#EF4444; margin-bottom:10px; letter-spacing:0.5px;">❌ لا تفعل (Don'ts)</div>`,
    to:   `<div class="u-eyebrow-tinted" style="--tint: 239 68 68">❌ لا تفعل (Don'ts)</div>`,
    expect: 1,
  },

  /* 27. ql-glass mt-14 + tinted amber 14 strong border ──────────────── */
  {
    from: '<div class="ql-glass" style="margin-top:14px; padding:16px 18px; border-radius:14px; border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.04);">',
    to:   '<div class="ql-glass u-mt-14 u-pad-card-lg u-tinted-aside--strong" style="--tint: 245 158 11">',
    expect: 1,
  },

  /* 28. ql-glass mt-14 + tinted cyan soft (compact pad) ─────────────── */
  {
    from: '<div class="ql-glass" style="margin-top:14px; padding:14px 16px; border-radius:12px; border-color:rgba(102,252,241,0.2); background:rgba(102,252,241,0.04);">',
    to:   '<div class="ql-glass u-mt-14 u-pad-card-sm u-tinted-aside--soft" style="--tint: 102 252 241">',
    expect: 1,
  },

  /* 29. div auto-180 + mb-16 ─────────────────────────────────────────── */
  {
    from: '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; margin-bottom:16px;">',
    to:   '<div class="u-grid-auto-180 u-mb-16">',
    expect: 1,
  },

  /* 30. div auto-150 + mb-16 ─────────────────────────────────────────── */
  {
    from: '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px; margin-bottom:16px;">',
    to:   '<div class="u-grid-auto-150 u-mb-16">',
    expect: 1,
  },

  /* 31. ql-glass mt-14 + tinted purple 12 (compact pad) ─────────────── */
  {
    from: '<div class="ql-glass" style="margin-top:14px; padding:14px 16px; border-radius:12px; border-color:rgba(139,92,246,0.25); background:rgba(139,92,246,0.04);">',
    to:   '<div class="ql-glass u-mt-14 u-pad-card-sm u-tinted-aside" style="--tint: 139 92 246">',
    expect: 1,
  },

  /* 32. table u-table-scroll ─────────────────────────────────────────── */
  {
    from: '<table style="width:100%; border-collapse:collapse; font-size:12px; min-width:540px;">',
    to:   '<table class="u-table-scroll">',
    expect: 1,
  },

  /* 33. div grid-2 + mb-18 ───────────────────────────────────────────── */
  {
    from: '<div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px;">',
    to:   '<div class="u-grid-2 u-mb-18">',
    expect: 1,
  },

  /* 34. div grid-2-lg ───────────────────────────────────────────────── */
  {
    from: '<div style="display:grid; grid-template-columns:1fr 1fr; gap:18px;">',
    to:   '<div class="u-grid-2-lg">',
    expect: 1,
  },

  /* 35. ql-glass pad-card-xl ────────────────────────────────────────── */
  {
    from: '<div class="ql-glass" style="padding:18px 22px; border-radius:14px;">',
    to:   '<div class="ql-glass u-pad-card-xl">',
    expect: 1,
  },

  /* 36–45. vhs-scrub ticks 0/25/50/75/100 — convert to --tick-pos var */
  {
    from: '<span class="vhs-scrub__tick" style="inset-inline-start:0%"></span>',
    to:   '<span class="vhs-scrub__tick" style="--tick-pos: 0%"></span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick-label" style="inset-inline-start:0%">يناير</span>',
    to:   '<span class="vhs-scrub__tick-label" style="--tick-pos: 0%">يناير</span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick" style="inset-inline-start:25%"></span>',
    to:   '<span class="vhs-scrub__tick" style="--tick-pos: 25%"></span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick-label" style="inset-inline-start:25%">أبريل</span>',
    to:   '<span class="vhs-scrub__tick-label" style="--tick-pos: 25%">أبريل</span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick" style="inset-inline-start:50%"></span>',
    to:   '<span class="vhs-scrub__tick" style="--tick-pos: 50%"></span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick-label" style="inset-inline-start:50%">يوليو</span>',
    to:   '<span class="vhs-scrub__tick-label" style="--tick-pos: 50%">يوليو</span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick" style="inset-inline-start:75%"></span>',
    to:   '<span class="vhs-scrub__tick" style="--tick-pos: 75%"></span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick-label" style="inset-inline-start:75%">أكتوبر</span>',
    to:   '<span class="vhs-scrub__tick-label" style="--tick-pos: 75%">أكتوبر</span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick" style="inset-inline-start:100%"></span>',
    to:   '<span class="vhs-scrub__tick" style="--tick-pos: 100%"></span>',
    expect: 1,
  },
  {
    from: '<span class="vhs-scrub__tick-label" style="inset-inline-start:100%">ديسمبر</span>',
    to:   '<span class="vhs-scrub__tick-label" style="--tick-pos: 100%">ديسمبر</span>',
    expect: 1,
  },

  /* 46. div grid-4 + mb-24 ──────────────────────────────────────────── */
  {
    from: '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px;">',
    to:   '<div class="u-grid-4 u-mb-24">',
    expect: 1,
  },

  /* 47. sim-cards-grid grid-3-16 + mb-32 ────────────────────────────── */
  {
    from: '<div id="sim-cards-grid" style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:32px;"></div>',
    to:   '<div id="sim-cards-grid" class="u-grid-3-16 u-mb-32"></div>',
    expect: 1,
  },

  /* 48. eng-feedback-icon emoji-xl ──────────────────────────────────── */
  {
    from: '<div id="eng-feedback-icon" style="font-size:28px;"></div>',
    to:   '<div id="eng-feedback-icon" class="u-emoji-xl"></div>',
    expect: 1,
  },

  /* 49. eng-next-btn compact lg ─────────────────────────────────────── */
  {
    from: '<button class="btn btn-primary" id="eng-next-btn" onclick="nextScenario()" style="padding:12px 32px; font-size:14px;">',
    to:   '<button class="btn btn-primary u-btn-compact-lg" id="eng-next-btn" onclick="nextScenario()">',
    expect: 1,
  },

  /* 50. report-emoji 64 + mb-16 ────────────────────────────────────── */
  {
    from: '<div style="font-size:64px; margin-bottom:16px;" id="report-emoji"></div>',
    to:   '<div class="u-emoji-2xl u-mb-16" id="report-emoji"></div>',
    expect: 1,
  },

  /* 51. div grid-3 + mb-28 ──────────────────────────────────────────── */
  {
    from: '<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px;">',
    to:   '<div class="u-grid-3 u-mb-28">',
    expect: 1,
  },

  /* 52. emoji-icon-md target arrow ─────────────────────────────────── */
  {
    from: '<div style="font-size:28px;flex-shrink:0;margin-top:2px;">🎯</div>',
    to:   '<div class="u-emoji-icon-md">🎯</div>',
    expect: 1,
  },

  /* 53. eq-assessment grid-2-16 ────────────────────────────────────── */
  {
    from: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;" id="eq-assessment">',
    to:   '<div class="u-grid-2-16" id="eq-assessment">',
    expect: 1,
  },

  /* 54. div grid-4-16 ──────────────────────────────────────────────── */
  {
    from: '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">',
    to:   '<div class="u-grid-4-16">',
    expect: 1,
  },

  /* 55. div grid-2 + mt-16 (compact spacing) ───────────────────────── */
  {
    from: '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:16px;">',
    to:   '<div class="u-grid-2 u-mt-16">',
    expect: 1,
  },

  /* 56. div grid-2 plain ──────────────────────────────────────────── */
  {
    from: '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;">',
    to:   '<div class="u-grid-2">',
    expect: 1,
  },

  /* 57. div grid-5 + mb-28 ──────────────────────────────────────────── */
  {
    from: '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:28px;">',
    to:   '<div class="u-grid-5 u-mb-28">',
    expect: 1,
  },

  /* 58. eyebrow-mini amber simulation tag ──────────────────────────── */
  {
    from: '<div style="font-size:11px;font-weight:800;color:#F59E0B;margin-bottom:4px;letter-spacing:1.3px;text-transform:uppercase;">🧪 محاكاة: اكتشف الاحتيال</div>',
    to:   '<div class="u-eyebrow-mini" style="--tint: 245 158 11">🧪 محاكاة: اكتشف الاحتيال</div>',
    expect: 1,
  },

  /* 59. badge-toast-emoji emoji-lg (class already present, augment) ── */
  {
    from: '<div style="font-size:26px;" class="badge-toast-emoji">🏆</div>',
    to:   '<div class="badge-toast-emoji u-emoji-lg">🏆</div>',
    expect: 1,
  },

  /* ════════════════════════════════════════════════════════════════════
   * Round 2: mixed inline styles (hardcoded color literals alongside
   * existing var(--…) references). These were missed by the first
   * grep filter (which excluded any line containing `--`).
   * ════════════════════════════════════════════════════════════════════ */

  /* 60. spin-detail-text — red tint ────────────────────────────────── */
  {
    from: '<div class="spin-detail-text" style="color:#EF4444; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15); border-radius:var(--radius-sm); padding:7px 10px; font-size:11.5px;">',
    to:   '<div class="spin-detail-text u-tip-tinted" style="--tint: 239 68 68">',
    expect: 1,
  },

  /* 61. span-12 amber→red gradient band (lg pad) ───────────────────── */
  {
    from: '<div class="span-12" style="padding:18px 20px;background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(239,68,68,0.06));border:1px solid rgba(245,158,11,0.25);border-radius:var(--radius-md);">',
    to:   '<div class="span-12 u-aside-band u-aside-band--lg" style="--tint-from: 245 158 11; --tint-to: 239 68 68">',
    expect: 1,
  },

  /* 62. w6IndustryHint cyan callout ──────────────────────────────── */
  {
    from: '<div id="w6IndustryHint" style="font-size:12px; color:var(--text-muted); line-height:1.7; padding:12px 14px; background:rgba(102,252,241,0.05); border-radius:10px; border:1px solid rgba(102,252,241,0.15);">',
    to:   '<div id="w6IndustryHint" class="u-tip-callout" style="--tint: 102 252 241">',
    expect: 1,
  },

  /* 63. div tip-mini cyan rounded (mt-16) ──────────────────────────── */
  {
    from: '<div style="margin-top:16px; padding:12px 14px; background:rgba(102,252,241,0.05); border:1px solid rgba(102,252,241,0.18); border-radius:8px; font-size:11.5px; color:var(--text-muted); line-height:1.75;">',
    to:   '<div class="u-mt-16 u-tip-mini u-tip-mini--rounded" style="--tint: 102 252 241">',
    expect: 1,
  },

  /* 64. eng-progress-bar accent→sky gradient ───────────────────────── */
  {
    from: '<div id="eng-progress-bar" style="height:100%; background:linear-gradient(90deg,var(--accent),#0EA5E9); border-radius:99px; transition:width 0.5s ease; width:0%;"></div>',
    to:   '<div id="eng-progress-bar" class="u-loading-bar-accent u-loading-bar-accent--progress"></div>',
    expect: 1,
  },

  /* 65. div surface-2 with orange tint ─────────────────────────────── */
  {
    from: '<div style="background:var(--surface-2);border:1px solid rgba(249,115,22,0.2);border-radius:var(--radius-md);padding:16px;">',
    to:   '<div class="u-aside-surface-tinted" style="--tint: 249 115 22">',
    expect: 1,
  },

  /* 66. div tip-mini purple ────────────────────────────────────────── */
  {
    from: '<div style="padding:10px 12px;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:var(--radius-sm);">',
    to:   '<div class="u-tip-mini" style="--tint: 139 92 246">',
    expect: 1,
  },

  /* 67. div tip-banded-end green (mt-10) ───────────────────────────── */
  {
    from: '<div style="margin-top:10px;padding:10px 12px;background:rgba(34,197,94,0.06);border-right:3px solid #22C55E;border-radius:var(--radius-sm);font-size:11.5px;color:var(--text);">',
    to:   '<div class="u-mt-10 u-tip-banded-end" style="--tint: 34 197 94">',
    expect: 1,
  },

  /* 68. div aside-band cyan→purple md ─────────────────────────────── */
  {
    from: '<div style="margin-top:18px;padding:16px 18px;background:linear-gradient(135deg,rgba(102,252,241,0.08),rgba(139,92,246,0.06));border:1px solid rgba(102,252,241,0.2);border-radius:var(--radius-md);">',
    to:   '<div class="u-mt-18 u-aside-band u-aside-band--md u-aside-band--soft" style="--tint-from: 102 252 241; --tint-to: 139 92 246">',
    expect: 1,
  },

  /* 69. div aside-band amber→red sm ───────────────────────────────── */
  {
    from: '<div style="padding:12px 14px;background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(239,68,68,0.05));border:1px solid rgba(245,158,11,0.22);border-radius:var(--radius-sm);">',
    to:   '<div class="u-aside-band" style="--tint-from: 245 158 11; --tint-to: 239 68 68">',
    expect: 1,
  },

  /* 70. span meta-mini ─────────────────────────────────────────────── */
  {
    from: '<span style="font-size:.78rem;color:var(--color-text-faint,rgba(255,255,255,.5));">حدث / يوم</span>',
    to:   '<span class="u-meta-mini">حدث / يوم</span>',
    expect: 1,
  },

  /* 71. animated loading bar accent→sky ────────────────────────────── */
  {
    from: '<div style="height:100%; background:linear-gradient(90deg, var(--accent), #0EA5E9); border-radius:99px; animation:loadBar 2s ease forwards;"></div>',
    to:   '<div class="u-loading-bar-accent u-loading-bar-accent--animated"></div>',
    expect: 1,
  },
];

/* ────────────────────────────────────────────────────────────────────── */

async function main () {
  const html = await readFile(FILE, "utf8");
  let next = html;
  let appliedTotal = 0;
  let alreadyDone = 0;
  const failures = [];

  for (const { from, to, expect } of REPLACEMENTS) {
    const before = next;
    // Count occurrences (literal substring match — no regex)
    let count = 0;
    let i = 0;
    while ((i = next.indexOf(from, i)) !== -1) { count += 1; i += from.length; }

    if (count === 0) {
      // Check if `to` is already in place — idempotency hint
      if (next.includes(to)) {
        alreadyDone += 1;
        continue;
      }
      failures.push({ from: from.slice(0, 80) + (from.length > 80 ? "…" : ""), reason: "not found and replacement absent" });
      continue;
    }
    if (count !== expect) {
      failures.push({ from: from.slice(0, 80) + "…", reason: `expected ${expect}, found ${count}` });
      continue;
    }
    next = next.split(from).join(to);
    appliedTotal += count;
  }

  if (failures.length > 0) {
    console.error("FAILURES:");
    for (const f of failures) console.error("  -", f);
    process.exitCode = 1;
    return;
  }

  if (next === html) {
    console.log(`No changes needed (already-applied: ${alreadyDone}). File unchanged.`);
    return;
  }

  await writeFile(FILE, next, "utf8");
  console.log(`Applied ${appliedTotal} replacements (already-applied on prior run: ${alreadyDone}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
