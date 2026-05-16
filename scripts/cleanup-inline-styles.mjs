#!/usr/bin/env node
/* AURORA v15 — Inline style → utility class cleanup (Worker 12 / Phase 7)
 * Conservative: only touches exact patterns mapped below. Multi-decl patterns
 * are matched verbatim (with optional spaces). Visual behavior preserved
 * because each utility class re-implements the same declarations.
 *
 * Run:  node scripts/cleanup-inline-styles.mjs
 *
 * Backup recommended:  cp platform/index.html platform/index.html.before-purge.bak
 */
import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('platform/index.html');
const before = fs.readFileSync(file, 'utf8');

/* Patterns: [regex, replacement-class-snippet]
 * Replacement is the FULL attribute it should become (e.g. class="..." ).
 * Order matters: match the LONGEST/MOST-SPECIFIC patterns first.
 */
const REPLACERS = [
  /* ═══════════════════════════════════════════════════════════════
     AURORA v15.1 — Worker 13 / Phase 2 mappings (must be first)
     Patterns identified from `grep -oE 'style="[^"]+"' | sort | uniq -c`.
     Each maps a verbatim inline declaration to a class defined in
     style.css under the v15.1 utilities pack.
     ═══════════════════════════════════════════════════════════════ */

  // Gradients — exact hex pairs used historically (3+ inline copies each)
  [/style="background:\s*linear-gradient\(135deg,\s*#22C55E,\s*#0EA5E9\);\s*color:\s*#fff;?"/g,
   'class="u-grad-success"'],
  [/style="background:\s*linear-gradient\(135deg,\s*#F97316,\s*#EF4444\);\s*color:\s*#fff;?"/g,
   'class="u-grad-warm"'],
  [/style="background:\s*linear-gradient\(135deg,\s*#8B5CF6,\s*#0EA5E9\);\s*color:\s*#fff;?"/g,
   'class="u-grad-violet"'],
  [/style="background:\s*linear-gradient\(135deg,\s*#EC4899,\s*#8B5CF6\);\s*color:\s*#fff;?"/g,
   'class="u-grad-pink"'],
  [/style="background:\s*linear-gradient\(135deg,\s*#F59E0B,\s*#10B981\);\s*color:\s*#fff;?"/g,
   'class="u-grad-amber"'],

  // Compound type presets (top-of-list duplicates from grep)
  [/style="font-size:\s*9px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.2px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*6px;?"/g,
   'class="u-t-eyebrow"'],
  [/style="font-size:\s*17px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*letter-spacing:\s*-0\.2px;\s*margin-bottom:\s*3px;?"/g,
   'class="u-t-card-title"'],
  [/style="font-size:\s*17px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);?"/g,
   'class="u-t-card-title-tight"'],
  [/style="font-size:\s*14px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*3px;?"/g,
   'class="u-t-list-title"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*4px;?"/g,
   'class="u-t-section-mini"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);?"/g,
   'class="u-t-card-title-tight"'],
  [/style="font-size:\s*24px;?"/g,
   'class="u-t-h-lg"'],
  [/style="font-size:\s*18px;\s*margin-bottom:\s*8px;?"/g,
   'class="u-t-h-md"'],

  // Common decorations
  [/style="height:\s*1px;\s*background:\s*var\(--border\);\s*margin:\s*14px\s*0;?"/g,
   'class="u-divider-h"'],
  [/style="padding:\s*22px\s+26px;\s*margin-bottom:\s*28px;?"/g,
   'class="u-pad-card-lg"'],
  [/style="padding:\s*11px\s+28px;?"/g,
   'class="u-pad-card-md"'],

  // Width singletons (top duplicates from grep)
  [/style="width:\s*20%;?"/g, 'class="u-w-20"'],
  [/style="width:\s*24%;?"/g, 'class="u-w-24"'],
  [/style="width:\s*38%;?"/g, 'class="u-w-38"'],
  [/style="width:\s*39%;?"/g, 'class="u-w-39"'],

  /* ─── v15.1 round-2 batch (after the first run still ~560 inline) ─── */

  // 13px-bold colored mini headers (8 occurrences, 4 colors)
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*#F59E0B;\s*margin-bottom:\s*4px;?"/g,
   'class="u-fz-13 u-fw-800 u-c-amber u-mb-1"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*#EC4899;\s*margin-bottom:\s*4px;?"/g,
   'class="u-fz-13 u-fw-800 u-c-pink u-mb-1"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*4px;?"/g,
   'class="u-fz-13 u-fw-800 u-c-purple u-mb-1"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*#22C55E;\s*margin-bottom:\s*4px;?"/g,
   'class="u-fz-13 u-fw-800 u-c-green u-mb-1"'],

  // 13px muted line-height 1.7 (no margin)
  [/style="font-size:\s*13px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;?"/g,
   'class="u-fz-13 u-c-muted u-lh-17"'],

  // 12px bold accent margin-bottom 8 / 12
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*8px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-cyan u-mb-2"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*12px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-cyan u-mb-3"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#F59E0B;\s*margin-bottom:\s*8px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-amber u-mb-2"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#E4405F;\s*margin-bottom:\s*8px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-pink u-mb-2"'],

  // 12px muted line-height 1.95
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.95;?"/g,
   'class="u-fz-12 u-c-muted u-lh-195"'],

  // 12.5 muted lh 1.85 max-width 720
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;\s*max-width:\s*720px;?"/g,
   'class="u-fz-125 u-c-muted u-lh-185 u-mw-720"'],
  // 12.5 muted lh 1.85 mb 14
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;\s*margin-bottom:\s*14px;?"/g,
   'class="u-fz-125 u-c-muted u-lh-185 u-mb-3"'],
  // 12.5 muted lh 1.7 mb 16
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;\s*margin-bottom:\s*16px;?"/g,
   'class="u-fz-125 u-c-muted u-lh-17 u-mb-4"'],
  // 12.5 muted lh 1.75
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.75;?"/g,
   'class="u-fz-125 u-c-muted u-lh-175"'],

  // 11px padding 5/12 chip
  [/style="font-size:\s*11px;\s*padding:\s*5px\s+12px;?"/g, 'class="u-chip-sm"'],

  // 11px-bold-uppercase letter-spacing:1px violet/cyan margin-bottom 8
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*8px;?"/g,
   'class="u-eyebrow-purple u-eyebrow-1"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#06B6D4;\s*margin-bottom:\s*8px;?"/g,
   'class="u-eyebrow-cyan u-eyebrow-1"'],

  // 11px-bold-uppercase letter-spacing 1.1 cyan/amber mb-10
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*10px;?"/g,
   'class="u-eyebrow-cyan u-eyebrow-11"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*#F59E0B;\s*margin-bottom:\s*10px;?"/g,
   'class="u-eyebrow-amber u-eyebrow-11"'],

  // 11.5 muted lh 1.85 / 1.75 (already have lh patterns; these are stand-alone)
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;?"/g,
   'class="u-fz-115 u-c-muted u-lh-185"'],
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.75;?"/g,
   'class="u-fz-115 u-c-muted u-lh-175"'],

  // 10px badge yellow / sky
  [/style="font-size:\s*10px;\s*background:\s*rgba\(234,179,8,0\.15\);\s*color:\s*#EAB308;\s*border:\s*1px\s+solid\s+rgba\(234,179,8,0\.25\);?"/g,
   'class="u-pill-yellow"'],
  [/style="font-size:\s*10px;\s*background:\s*rgba\(14,165,233,0\.12\);\s*color:\s*#0EA5E9;\s*border:\s*1px\s+solid\s+rgba\(14,165,233,0\.2\);?"/g,
   'class="u-pill-sky"'],

  // grids
  [/style="display:\s*grid;\s*grid-template-columns:\s*repeat\(auto-fit,minmax\(280px,1fr\)\);\s*gap:\s*10px;?"/g,
   'class="u-grid-auto u-gap-2"'],
  [/style="display:\s*grid;\s*grid-template-columns:\s*repeat\(3,1fr\);\s*gap:\s*14px;?"/g,
   'class="u-grid-3 u-gap-3"'],
  [/style="display:\s*grid;\s*grid-template-columns:\s*1fr\s+1fr;\s*gap:\s*10px;?"/g,
   'class="u-grid-2-10"'],

  // flex rows mid
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*8px;?"/g,
   'class="u-row-8"'],
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*14px;\s*margin-bottom:\s*20px;\s*padding-bottom:\s*16px;\s*border-bottom:\s*1px\s+solid\s+var\(--border\);?"/g,
   'class="u-row-head"'],
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*12px;?"/g,
   'class="u-row-12"'],

  // single colors / weights
  [/style="color:\s*#F87171;?"/g, 'class="u-c-red-soft"'],
  [/style="color:\s*#EAB308;\s*font-weight:\s*700;?"/g, 'class="u-c-yellow u-fw-700"'],
  [/style="color:\s*#0EA5E9;\s*font-weight:\s*700;?"/g, 'class="u-c-sky u-fw-700"'],
  [/style="color:\s*#0EA5E9;?"/g, 'class="u-c-sky"'],

  // 22px tile
  [/style="color:\s*#22C55E;\s*background:\s*rgba\(34,197,94,0\.06\);\s*border:\s*1px\s+solid\s+rgba\(34,197,94,0\.15\);\s*border-radius:\s*var\(--radius-sm\);\s*padding:\s*7px\s+10px;\s*font-size:\s*11\.5px;?"/g,
   'class="u-pill-ok-sm"'],

  // surface-2 + green border
  [/style="background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+rgba\(34,197,94,0\.2\);\s*border-radius:\s*var\(--radius-md\);\s*padding:\s*16px;?"/g,
   'class="u-frame-card-ok"'],

  // background tints
  [/style="background:\s*rgba\(234,179,8,0\.1\);?"/g, 'class="u-bg-tint-yellow"'],
  [/style="background:\s*rgba\(139,92,246,0\.1\);?"/g, 'class="u-bg-tint-purple"'],
  [/style="background:\s*rgba\(102,252,241,0\.1\);?"/g, 'class="u-bg-tint-cyan"'],

  /* ─── v15.1 round-3 batch: stat-tile compounds + bg-rgba atoms ─── */

  // Stat tile (text-align:center;padding:14px 8px;background:var(--surface-2);
  // border:1px solid rgba(C,0.15);border-radius:var(--radius-md);
  // border-top:3px solid #C;) → 5 colors
  [/style="text-align:center;padding:14px\s+8px;background:var\(--surface-2\);border:1px\s+solid\s+rgba\(102,252,241,0\.15\);border-radius:var\(--radius-md\);border-top:3px\s+solid\s+var\(--accent\);?"/g,
   'class="u-stat-tile u-stat-tile-cyan"'],
  [/style="text-align:center;padding:14px\s+8px;background:var\(--surface-2\);border:1px\s+solid\s+rgba\(14,165,233,0\.15\);border-radius:var\(--radius-md\);border-top:3px\s+solid\s+#0EA5E9;?"/g,
   'class="u-stat-tile u-stat-tile-sky"'],
  [/style="text-align:center;padding:14px\s+8px;background:var\(--surface-2\);border:1px\s+solid\s+rgba\(234,179,8,0\.15\);border-radius:var\(--radius-md\);border-top:3px\s+solid\s+#EAB308;?"/g,
   'class="u-stat-tile u-stat-tile-yellow"'],
  [/style="text-align:center;padding:14px\s+8px;background:var\(--surface-2\);border:1px\s+solid\s+rgba\(139,92,246,0\.15\);border-radius:var\(--radius-md\);border-top:3px\s+solid\s+#8B5CF6;?"/g,
   'class="u-stat-tile u-stat-tile-purple"'],
  [/style="text-align:center;padding:14px\s+8px;background:var\(--surface-2\);border:1px\s+solid\s+rgba\(239,68,68,0\.15\);border-radius:var\(--radius-md\);border-top:3px\s+solid\s+#EF4444;?"/g,
   'class="u-stat-tile u-stat-tile-red"'],

  // surface-2 frame variants (border-color matches tint)
  [/style="background:var\(--surface-2\);border:1px\s+solid\s+rgba\(102,252,241,0\.2\);border-radius:var\(--radius-md\);padding:16px;?"/g,
   'class="u-frame-card-cyan"'],
  [/style="background:var\(--surface-2\);border:1px\s+solid\s+rgba\(234,179,8,0\.2\);border-radius:var\(--radius-md\);padding:16px;?"/g,
   'class="u-frame-card-yellow"'],

  // shadowed deep frame
  [/style="padding:16px\s+18px;background:rgba\(10,13,24,0\.5\);border:1px\s+solid\s+rgba\(102,252,241,0\.15\);border-radius:var\(--radius-md\);?"/g,
   'class="u-deep-frame u-deep-frame-cyan"'],
  [/style="padding:16px\s+18px;background:rgba\(10,13,24,0\.5\);border:1px\s+solid\s+rgba\(139,92,246,0\.15\);border-radius:var\(--radius-md\);?"/g,
   'class="u-deep-frame u-deep-frame-purple"'],
  [/style="padding:16px\s+18px;background:rgba\(10,13,24,0\.5\);border:1px\s+solid\s+rgba\(34,197,94,0\.18\);border-radius:var\(--radius-md\);?"/g,
   'class="u-deep-frame u-deep-frame-green"'],

  // border-side accents
  [/style="padding:10px\s+12px;background:rgba\(239,68,68,0\.06\);border-right:3px\s+solid\s+#EF4444;border-radius:var\(--radius-sm\);?"/g,
   'class="u-side-accent-red"'],
  [/style="padding:10px\s+12px;background:rgba\(34,197,94,0\.06\);border-right:3px\s+solid\s+#22C55E;border-radius:var\(--radius-sm\);?"/g,
   'class="u-side-accent-green"'],

  // social brand pairs (border-color + bg)
  [/style="border-color:rgba\(0,119,181,0\.3\);\s*background:rgba\(0,119,181,0\.04\);?"/g,
   'class="u-brand-linkedin"'],
  [/style="border-color:rgba\(29,161,242,0\.3\);\s*background:rgba\(29,161,242,0\.04\);?"/g,
   'class="u-brand-twitter"'],
  [/style="border-color:rgba\(228,64,95,0\.3\);\s*background:rgba\(228,64,95,0\.04\);?"/g,
   'class="u-brand-instagram"'],
  [/style="border-color:rgba\(254,44,85,0\.3\);\s*background:rgba\(254,44,85,0\.04\);?"/g,
   'class="u-brand-tiktok"'],

  // bg+color pills (10/15% bg + matching color)
  [/style="background:rgba\(249,115,22,0\.14\);color:#FBBF77;?"/g, 'class="u-pill-orange-soft"'],
  [/style="background:rgba\(34,197,94,0\.14\);color:#86EFAC;?"/g,  'class="u-pill-green-soft"'],

  // outline pills bg+border+color
  [/style="background:rgba\(239,68,68,0\.15\);\s*border-color:rgba\(239,68,68,0\.35\);\s*color:#EF4444;?"/g,
   'class="u-pill-out-red"'],
  [/style="background:rgba\(234,179,8,0\.15\);\s*border-color:rgba\(234,179,8,0\.35\);\s*color:#EAB308;?"/g,
   'class="u-pill-out-yellow"'],
  [/style="background:rgba\(249,115,22,0\.15\);\s*border-color:rgba\(249,115,22,0\.35\);\s*color:#F97316;?"/g,
   'class="u-pill-out-orange"'],
  [/style="background:rgba\(102,252,241,0\.1\);\s*border-color:rgba\(102,252,241,0\.25\);\s*color:var\(--accent\);?"/g,
   'class="u-pill-out-cyan"'],
  [/style="background:rgba\(34,197,94,0\.1\);\s*border-color:rgba\(34,197,94,0\.25\);\s*color:#22C55E;?"/g,
   'class="u-pill-out-green"'],

  // 12px-bold colored mb-8 (already partially covered) — additional colors
  [/style="font-size:12px;\s*font-weight:800;\s*color:#0A91CC;\s*margin-bottom:8px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-linkedin-dark u-mb-2"'],
  [/style="font-size:12px;\s*font-weight:800;\s*color:#1DA1F2;\s*margin-bottom:8px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-twitter u-mb-2"'],
  [/style="font-size:12px;\s*font-weight:800;\s*color:#FE2C55;\s*margin-bottom:8px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-tiktok u-mb-2"'],
  [/style="font-size:12px;\s*font-weight:800;\s*color:#E4405F;\s*margin-bottom:8px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-pink u-mb-2"'],
  [/style="font-size:12px;\s*font-weight:800;\s*color:#3B82F6;\s*margin-bottom:8px;?"/g,
   'class="u-fz-12 u-fw-800 u-c-blue u-mb-2"'],

  // grids
  [/style="display:grid;grid-template-columns:repeat\(5,1fr\);gap:10px;?"/g, 'class="u-grid-5 u-gap-2-5"'],
  [/style="display:grid;grid-template-columns:repeat\(3,1fr\);gap:12px;?"/g, 'class="u-grid-3 u-gap-3"'],

  // hero card head (compound)
  [/style="padding:16px\s+22px\s+14px;border-bottom:1px\s+solid\s+var\(--border\);background:var\(--surface-2\);display:flex;align-items:center;justify-content:space-between;?"/g,
   'class="u-card-head-bar"'],

  /* ─── v15.1 round-4 batch ─── */

  // SR-only / visually-hidden (1 copy)
  [/style="position:absolute;width:0;height:0;overflow:hidden"/g, 'class="u-sr-only"'],

  // huge display number
  [/style="font-size:48px;\s*font-weight:900;\s*color:var\(--text-faint\);\s*line-height:1;?"/g,
   'class="u-display-48"'],

  // empty-state pad
  [/style="text-align:center;\s*padding:20px\s*0;?"/g, 'class="u-empty-pad"'],

  // form-label compact
  [/style="font-size:11px;\s*font-weight:700;\s*color:var\(--text-muted\);\s*letter-spacing:0\.5px;\s*display:block;\s*margin-bottom:6px;?"/g,
   'class="u-form-label"'],

  // chip 5/14 padding
  [/style="font-size:11px;\s*padding:5px\s+14px;?"/g, 'class="u-chip-md"'],

  // border-color tints (single)
  [/style="border-color:rgba\(102,252,241,0\.2\);?"/g, 'class="u-bc-cyan-soft"'],
  [/style="border-color:rgba\(234,179,8,0\.2\);?"/g,   'class="u-bc-yellow-soft"'],
  [/style="border-color:rgba\(228,64,95,0\.2\);?"/g,   'class="u-bc-instagram-soft"'],

  // info card (12.5 muted lh + frame)
  [/style="font-size:12\.5px;\s*color:var\(--text-muted\);\s*line-height:1\.7;\s*background:var\(--surface-2\);\s*border:1px\s+solid\s+var\(--border\);\s*border-radius:var\(--radius-md\);\s*padding:14px;?"/g,
   'class="u-info-card"'],

  // legend bars (segments)
  [/style="flex:7;\s*background:var\(--accent\);\s*opacity:0\.7;\s*border-radius:6px\s+0\s+0\s+6px;?"/g,
   'class="u-bar-7-cyan-l"'],
  [/style="flex:2;\s*background:#EAB308;\s*opacity:0\.7;?"/g, 'class="u-bar-2-yellow"'],
  [/style="flex:1;\s*background:#E4405F;\s*opacity:0\.7;\s*border-radius:0\s+6px\s+6px\s+0;?"/g,
   'class="u-bar-1-pink-r"'],

  // bar-track / bar-trio
  [/style="height:10px;\s*border-radius:99px;\s*background:var\(--surface-3\);\s*overflow:hidden;\s*position:relative;?"/g,
   'class="u-bar-track"'],
  [/style="height:16px;\s*border-radius:99px;\s*overflow:hidden;\s*display:flex;\s*gap:3px;\s*margin-bottom:16px;?"/g,
   'class="u-bar-trio"'],

  // animation stub
  [/style="animation:\s*pageFadeIn\s+0\.3s\s+ease;?"/g, 'class="u-anim-fadein"'],

  // dot-glow brand variants
  [/style="background:#0ea5e9;box-shadow:0\s+0\s+5px\s+#0ea5e9;?"/g, 'class="u-dot-glow-sky"'],
  [/style="background:#e1306c;box-shadow:0\s+0\s+5px\s+#e1306c;?"/g, 'class="u-dot-glow-instagram"'],
  [/style="background:#1877f2;box-shadow:0\s+0\s+5px\s+#1877f2;?"/g, 'class="u-dot-glow-facebook"'],
  [/style="background:#ff0050;box-shadow:0\s+0\s+5px\s+#ff0050;?"/g, 'class="u-dot-glow-tiktok"'],
  [/style="background:#25d366;box-shadow:0\s+0\s+5px\s+#25d366;?"/g, 'class="u-dot-glow-whatsapp"'],

  // brand instagram alt
  [/style="background:rgba\(225,48,108,0\.1\);color:#e1306c;border-color:rgba\(225,48,108,0\.2\);?"/g,
   'class="u-brand-instagram-alt"'],

  // flex-basis
  [/style="flex-basis:\s*100%;?"/g, 'class="u-fb-full"'],

  // .75rem faint token-fallback
  [/style="font-size:\.75rem;color:var\(--color-text-faint,rgba\(255,255,255,\.5\)\);?"/g,
   'class="u-text-xs u-c-faint"'],

  /* ─── 1. Compound multi-decl text presets (high frequency) ─── */

  // "font-size:17px; font-weight:800; color:var(--text); margin-bottom:4px;"
  [/style="font-size:\s*17px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*4px;?"/g,
   'class="u-card-title"'],

  /* ─── 1b. Round-2 patterns (added Phase 7 second pass) ─── */

  // checkbox/radio accent (8 copies)
  [/style="accent-color:\s*var\(--accent\);\s*width:\s*16px;\s*height:\s*16px;?"/g,
   'class="u-form-accent"'],

  // dashed-row variants
  [/style="padding:\s*9px\s+12px;\s*border-bottom:\s*1px\s+dashed\s+var\(--border\);\s*color:\s*#22C55E;\s*font-variant-numeric:\s*tabular-nums;?"/g,
   'class="u-row-dashed-ok"'],
  [/style="padding:\s*9px\s+12px;\s*border-bottom:\s*1px\s+dashed\s+var\(--border\);\s*font-variant-numeric:\s*tabular-nums;?"/g,
   'class="u-row-dashed-num"'],
  [/style="padding:\s*9px\s+12px;\s*border-bottom:\s*1px\s+dashed\s+var\(--border\);\s*color:\s*var\(--text-muted\);?"/g,
   'class="u-row-dashed-mut"'],
  [/style="padding:\s*9px\s+12px;\s*border-bottom:\s*1px\s+dashed\s+var\(--border\);?"/g,
   'class="u-row-dashed"'],

  // padding 18px + radius 14
  [/style="padding:\s*18px;\s*border-radius:\s*14px;?"/g, 'class="u-p-18-r14"'],

  // frame clip
  [/style="margin-bottom:\s*26px;\s*padding:\s*0;\s*overflow:\s*hidden;?"/g,
   'class="u-frame-clip"'],

  // 14px-bold-text — bare and -mb-7 versions
  [/style="font-size:\s*14px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*7px;?"/g,
   'class="u-h4-mb-1"'],
  [/style="font-size:\s*14px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);?"/g,
   'class="u-h4"'],

  // 12px muted lh-1.75 mb-10
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.75;\s*margin-bottom:\s*10px;?"/g,
   'class="u-meta-md-mb"'],

  // faint mini variants
  [/style="font-size:\s*10\.5px;\s*color:\s*var\(--text-faint\);\s*margin-top:\s*8px;?"/g,
   'class="u-meta-faint"'],
  [/style="font-size:\s*10\.5px;\s*color:\s*var\(--text-faint\);\s*margin-top:\s*1px;?"/g,
   'class="u-meta-faint-1"'],

  // tight row (display:flex; gap:10px; mb:10px)
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*10px;\s*margin-bottom:\s*10px;?"/g,
   'class="u-row-tight"'],

  // green pill
  [/style="background:\s*rgba\(34,\s*197,\s*94,\s*\.12\);\s*color:\s*#22C55E;?"/g,
   'class="u-pill-ok"'],

  // zero-width progress bar template
  [/style="width:\s*0%"/g, 'class="u-pb-0"'],

  // tile card
  [/style="text-align:\s*center;\s*padding:\s*18px\s+12px;\s*background:\s*var\(--surface\);\s*border:\s*1px\s+solid\s+var\(--border\);\s*border-radius:\s*var\(--radius-md\);?"/g,
   'class="u-tile-card"'],

  // bold-text-700
  [/style="font-weight:\s*700;\s*color:\s*var\(--text\);?"/g, 'class="u-fw7-text"'],

  // big stat
  [/style="font-size:\s*30px;\s*flex-shrink:\s*0;\s*margin-top:\s*2px;?"/g,
   'class="u-stat-30"'],

  // Display heads
  [/style="font-size:\s*24px;\s*font-weight:\s*900;\s*color:\s*var\(--text\);\s*margin-bottom:\s*6px;?"/g,
   'class="u-h1-card"'],
  [/style="font-size:\s*22px;\s*margin-bottom:\s*6px;?"/g, 'class="u-h2-card"'],
  [/style="font-size:\s*18px;\s*margin-bottom:\s*6px;?"/g, 'class="u-h3-card"'],

  // 15px-h5
  [/style="font-size:\s*15px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-top:\s*2px;?"/g,
   'class="u-h5"'],

  // 12px-h6 / 11px-h6
  [/style="font-size:\s*12px;\s*font-weight:\s*700;\s*color:\s*var\(--text\);\s*margin-bottom:\s*4px;?"/g,
   'class="u-h6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*700;\s*color:\s*var\(--text\);\s*margin-bottom:\s*4px;?"/g,
   'class="u-h6-sm"'],

  // muted col 28
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*width:\s*28px;?"/g,
   'class="u-meta-col-28"'],

  // muted lh-1.5 mini
  [/style="font-size:\s*11px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.5;?"/g,
   'class="u-meta-mini"'],
  [/style="font-size:\s*10\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.5;?"/g,
   'class="u-meta-mini-faint"'],

  // 12.5px muted lh-1.8
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.8;?"/g,
   'class="u-meta-lh"'],

  // flex:1
  [/style="flex:\s*1;?"/g, 'class="u-flex-1"'],

  /* ─── 1c. Round-3 patterns ─── */

  // pure colors
  [/style="color:\s*#EAB308;?"/g,  'class="u-c-yellow"'],
  [/style="color:\s*#F97316;?"/g,  'class="u-c-orange"'],

  // purple pill
  [/style="background:\s*rgba\(168,\s*85,\s*247,\s*\.12\);\s*color:\s*#A855F7;?"/g,
   'class="u-pill-purple"'],

  // row-between
  [/style="display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*space-between;\s*margin-bottom:\s*10px;?"/g,
   'class="u-row-between"'],

  // row-mt
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*10px;\s*margin-top:\s*8px;?"/g,
   'class="u-row-mt"'],

  // width tokens
  [/style="width:\s*30%;?"/g,   'class="u-w-30"'],
  [/style="width:\s*120px;?"/g, 'class="u-w-120"'],

  // table eyebrow
  [/style="text-align:\s*right;\s*padding:\s*10px\s+12px;\s*font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*border-bottom:\s*1px\s+solid\s+var\(--border\);?"/g,
   'class="u-th-eyebrow"'],

  // card head bar
  [/style="padding:\s*16px\s+22px\s+14px;\s*border-bottom:\s*1px\s+solid\s+var\(--border\);\s*background:\s*var\(--surface-2\);\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*12px;?"/g,
   'class="u-card-head"'],

  // padding 22px
  [/style="padding:\s*22px;?"/g, 'class="u-p-22"'],

  // padding 16-18 + radius 14
  [/style="padding:\s*16px\s+18px;\s*border-radius:\s*14px;?"/g, 'class="u-p-card-md"'],

  // frame clip top
  [/style="margin-top:\s*22px;\s*padding:\s*0;\s*overflow:\s*hidden;?"/g, 'class="u-frame-clip-top"'],

  // grid full row
  [/style="grid-column:\s*1\s*\/\s*-1;?"/g, 'class="u-col-full"'],

  // tag eyebrow orange/green
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#F97316;\s*margin-bottom:\s*8px;?"/g,
   'class="u-tag-orange"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#22C55E;\s*margin-bottom:\s*8px;?"/g,
   'class="u-tag-green"'],

  // h-20
  [/style="font-size:\s*20px;\s*margin-bottom:\s*8px;?"/g, 'class="u-h-20"'],

  // red 12px text
  [/style="font-size:\s*12px;\s*color:\s*#EF4444;?"/g, 'class="u-c-red-12"'],

  // list meta with padding-inline-start
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;\s*padding-inline-start:\s*18px;\s*margin:\s*0;?"/g,
   'class="u-list-meta"'],

  // 11.5 muted lh-1.6
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.6;?"/g,
   'class="u-list-meta-tight"'],

  // 11.5 cyan
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--accent\);?"/g, 'class="u-c-cyan-115"'],

  // danger pill
  [/style="font-size:\s*10\.5px;\s*color:\s*#EF4444;\s*background:\s*rgba\(239,\s*68,\s*68,\s*0\.07\);\s*border:\s*1px\s+solid\s+rgba\(239,\s*68,\s*68,\s*0\.15\);\s*border-radius:\s*6px;\s*padding:\s*7px\s+9px;?"/g,
   'class="u-pill-danger"'],

  /* ─── 1d. Round-4 patterns ─── */

  // bare flex rows
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*10px;?"/g, 'class="u-row"'],
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*5px;?"/g,  'class="u-row-sm"'],
  [/style="display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*8px;?"/g, 'class="u-col"'],
  [/style="display:\s*grid;\s*grid-template-columns:\s*1fr\s+1fr;\s*gap:\s*14px;?"/g, 'class="u-grid-2-1fr"'],
  [/style="margin-top:\s*18px;\s*display:\s*grid;\s*grid-template-columns:\s*1fr\s+1fr;\s*gap:\s*12px;?"/g, 'class="u-grid-2-sm"'],

  // muted small reverse
  [/style="color:\s*var\(--text-muted\);\s*font-size:\s*12\.5px;?"/g, 'class="u-meta-rev"'],

  // danger pill fill
  [/style="background:\s*rgba\(239,\s*68,\s*68,\s*\.12\);\s*color:\s*#EF4444;?"/g, 'class="u-pill-danger-fill"'],

  // p-20-r14
  [/style="padding:\s*20px;\s*border-radius:\s*14px;?"/g, 'class="u-p-20-r14"'],

  // p-card-lg
  [/style="padding:\s*18px\s+20px;\s*border-radius:\s*14px;\s*margin-bottom:\s*18px;?"/g, 'class="u-p-card-lg"'],

  // cyan info box
  [/style="padding:\s*12px\s+14px;\s*background:\s*rgba\(6,\s*182,\s*212,\s*0\.06\);\s*border:\s*1px\s+solid\s+rgba\(6,\s*182,\s*212,\s*0\.2\);\s*border-radius:\s*var\(--radius-sm\);?"/g,
   'class="u-cyan-info-box"'],

  // margin shims
  [/style="margin-top:\s*36px;\s*margin-bottom:\s*20px;?"/g, 'class="u-mt-rh"'],
  [/style="margin-top:\s*36px;?"/g, 'class="u-mt-9b"'],
  [/style="margin-top:\s*28px;?"/g, 'class="u-mt-7b"'],
  [/style="margin-bottom:\s*22px;?"/g, 'class="u-mb-7b"'],

  // frame clip mt
  [/style="margin-top:\s*28px;\s*padding:\s*0;\s*overflow:\s*hidden;?"/g, 'class="u-frame-clip-mt"'],

  // lh-2
  [/style="line-height:\s*2;?"/g, 'class="u-lh-2"'],

  // eyebrow tags 1.6 letter-spacing
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.6px;\s*text-transform:\s*uppercase;\s*color:\s*#F59E0B;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-amber"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.6px;\s*text-transform:\s*uppercase;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-purple"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.6px;\s*text-transform:\s*uppercase;\s*color:\s*#22C55E;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-green"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.6px;\s*text-transform:\s*uppercase;\s*color:\s*#06B6D4;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-cyan"'],

  // h7 cyan
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*color:\s*#06B6D4;\s*margin-bottom:\s*4px;?"/g, 'class="u-h7-cyan"'],

  // meta-tiny
  [/style="font-size:\s*11px;\s*color:\s*var\(--text-muted\);\s*margin-top:\s*4px;?"/g, 'class="u-meta-tiny"'],

  // faint 10.5
  [/style="font-size:\s*10\.5px;\s*color:\s*var\(--text-faint\);?"/g, 'class="u-faint-105"'],

  // row spread
  [/style="display:\s*flex;\s*justify-content:\s*space-between;\s*font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*margin-bottom:\s*4px;?"/g, 'class="u-row-spread"'],

  // bold colors
  [/style="color:\s*#EF4444;\s*font-weight:\s*700;?"/g, 'class="u-c-red-bold"'],
  [/style="color:\s*#22C55E;\s*font-weight:\s*700;?"/g, 'class="u-c-green-bold"'],
  [/style="color:\s*#06B6D4;?"/g, 'class="u-c-cyan6"'],

  // muted line-height meta
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;\s*margin-bottom:\s*8px;?"/g, 'class="u-meta-md-narr"'],
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.75;?"/g, 'class="u-meta-md-loose"'],
  [/style="font-size:\s*17px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*4px;?"/g,
   'class="u-card-title"'],

  // "font-size:18px;font-weight:800;color:var(--text);margin-bottom:4px;"
  [/style="font-size:\s*18px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*4px;?"/g,
   'class="u-card-title-lg"'],

  // "font-size:13px;font-weight:800;color:var(--text);margin-bottom:6px;"
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*6px;?"/g,
   'class="u-card-title-sm"'],

  // "font-size:14px;font-weight:800;color:var(--text);margin-bottom:8px;"
  [/style="font-size:\s*14px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*8px;?"/g,
   'class="u-card-title-md"'],

  // "font-size:20px;font-weight:900;color:var(--text);letter-spacing:-0.3px;"
  [/style="font-size:\s*20px;\s*font-weight:\s*900;\s*color:\s*var\(--text\);\s*letter-spacing:\s*-0\.3px;?"/g,
   'class="u-section-title"'],

  // section-divider header
  [/style="font-size:\s*16px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*16px;\s*padding-bottom:\s*12px;\s*border-bottom:\s*1px\s+solid\s+var\(--border\);?"/g,
   'class="u-section-divider"'],

  // muted meta with line-height & max-width
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;\s*max-width:\s*780px;?"/g,
   'class="u-meta-lh-xl"'],

  // muted meta — line-height 1.85 (no max-width)
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;?"/g,
   'class="u-meta-lh-lg"'],

  // muted meta — line-height 1.7 with margin-bottom 10
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;\s*margin-bottom:\s*10px;?"/g,
   'class="u-meta-loose-mb"'],

  // muted meta — 11.5px line-height 1.65
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.65;?"/g,
   'class="u-meta-loose"'],

  // muted meta — 11.5px line-height 1.7
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;?"/g,
   'class="u-meta-tight"'],

  // muted meta — 12px line-height 1.7
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;?"/g,
   'class="u-meta-lh-md"'],

  // muted meta — 12px line-height 1.8
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.8;?"/g,
   'class="u-meta-lh"'],

  // citation/scientific quote box
  [/style="background:\s*rgba\(102,\s*252,\s*241,\s*0\.05\);\s*border:\s*1px\s+solid\s+var\(--border-hover\);\s*border-radius:\s*var\(--radius-sm\);\s*padding:\s*11px\s+13px;\s*font-size:\s*12px;\s*color:\s*var\(--text\);\s*line-height:\s*1\.7;\s*font-style:\s*italic;?"/g,
   'class="u-quote-box"'],

  // surface-2 frame card (16px padding)
  [/style="background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+var\(--border\);\s*border-radius:\s*var\(--radius-md\);\s*padding:\s*16px;?"/g,
   'class="u-frame-card"'],

  // row-card (display:flex;align-items:center;gap:10px;padding:12px;...)
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*10px;\s*padding:\s*12px;\s*background:\s*var\(--surface-2\);\s*border-radius:\s*var\(--radius-sm\);\s*border:\s*1px\s+solid\s+var\(--border\);\s*cursor:\s*pointer;\s*font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);?"/g,
   'class="u-row-card"'],

  /* ─── 2. Two-decl patterns (very common pairs) ─── */

  // font-style:italic + color:var(--text) — but those vary; just isolate italic
  [/style="font-style:\s*italic;?"/g, 'class="u-italic"'],

  // 12.5px muted (with optional space, both styles seen)
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);?"/g, 'class="u-meta-lg"'],

  // 12px muted
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);?"/g,    'class="u-meta-md"'],

  // 11.5px muted
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);?"/g, 'class="u-meta"'],

  // 11px muted
  [/style="font-size:\s*11px;\s*color:\s*var\(--text-muted\);?"/g,    'class="u-meta-sm"'],

  // 12px muted (variant order)
  [/style="color:\s*var\(--text-muted\);\s*font-size:\s*12px;?"/g,    'class="u-meta-md"'],

  // text strong: color:text; font-weight:600
  [/style="color:\s*var\(--text\);\s*font-weight:\s*600;?"/g,         'class="u-text-strong"'],

  // green badge
  [/style="color:\s*#22C55E;\s*font-size:\s*12px;?"/g,                'class="u-badge-ok"'],
  [/style="color:\s*#EF4444;\s*font-size:\s*12px;?"/g,                'class="u-badge-fail"'],

  // padding card + margin-bottom
  [/style="padding:\s*22px\s+24px;\s*margin-bottom:\s*20px;?"/g,
   'class="u-p-card u-mb-5"'],

  // section-gap-lg (margin-top:48px; margin-bottom:20px)
  [/style="margin-top:\s*48px;\s*margin-bottom:\s*20px;?"/g, 'class="u-section-gap-lg"'],

  // section-gap (margin:28px 0 14px)
  [/style="margin:\s*28px\s+0\s+14px;?"/g, 'class="u-section-gap"'],

  // pr-4 list item shim
  [/style="padding-right:\s*16px;\s*margin:\s*0;?"/g, 'class="u-pr-4"'],

  /* ─── 3. Single-decl patterns ─── */

  // text alignment
  [/style="text-align:\s*center;?"/g,        'class="u-text-center"'],
  [/style="text-align:\s*end;?"/g,           'class="u-text-end"'],
  [/style="text-align:\s*right;?"/g,         'class="u-text-end"'],
  [/style="text-align:\s*start;?"/g,         'class="u-text-start"'],
  [/style="text-align:\s*left;?"/g,          'class="u-text-start"'],

  // single colors
  [/style="color:\s*var\(--text\);?"/g,         'class="u-c-text"'],
  [/style="color:\s*var\(--text-muted\);?"/g,   'class="u-c-muted"'],
  [/style="color:\s*var\(--text-faint\);?"/g,   'class="u-c-faint"'],
  [/style="color:\s*var\(--accent\);?"/g,       'class="u-c-cyan"'],
  [/style="color:\s*#22C55E;?"/g,               'class="u-c-green"'],
  [/style="color:\s*#EF4444;?"/g,               'class="u-c-red"'],
  [/style="color:\s*#8B5CF6;?"/g,               'class="u-c-purple"'],
  [/style="color:\s*#F59E0B;?"/g,               'class="u-c-amber"'],
  [/style="color:\s*#3B82F6;?"/g,               'class="u-c-blue"'],
  [/style="color:\s*#EC4899;?"/g,               'class="u-c-pink"'],

  // font-weights
  [/style="font-weight:\s*900;?"/g,          'class="u-fw-900"'],
  [/style="font-weight:\s*800;?"/g,          'class="u-fw-800"'],
  [/style="font-weight:\s*700;?"/g,          'class="u-fw-700"'],
  [/style="font-weight:\s*600;?"/g,          'class="u-fw-600"'],
  [/style="font-weight:\s*500;?"/g,          'class="u-fw-500"'],

  // font-size px (singletons)
  [/style="font-size:\s*22px;?"/g,           'class="u-fz-22"'],
  [/style="font-size:\s*20px;?"/g,           'class="u-fz-20"'],
  [/style="font-size:\s*18px;?"/g,           'class="u-fz-18"'],
  [/style="font-size:\s*17px;?"/g,           'class="u-fz-17"'],
  [/style="font-size:\s*16px;?"/g,           'class="u-fz-16"'],
  [/style="font-size:\s*15px;?"/g,           'class="u-fz-15"'],
  [/style="font-size:\s*14px;?"/g,           'class="u-fz-14"'],
  [/style="font-size:\s*13\.5px;?"/g,        'class="u-fz-135"'],
  [/style="font-size:\s*13px;?"/g,           'class="u-fz-13"'],
  [/style="font-size:\s*12\.5px;?"/g,        'class="u-fz-125"'],
  [/style="font-size:\s*12px;?"/g,           'class="u-fz-12"'],
  [/style="font-size:\s*11\.5px;?"/g,        'class="u-fz-115"'],
  [/style="font-size:\s*11px;?"/g,           'class="u-fz-11"'],
  [/style="font-size:\s*10px;?"/g,           'class="u-fz-10"'],

  // display
  [/style="display:\s*flex;?"/g,             'class="u-flex"'],
  [/style="display:\s*grid;?"/g,             'class="u-grid"'],
  [/style="display:\s*inline-flex;?"/g,      'class="u-iflex"'],
  [/style="display:\s*inline-block;?"/g,     'class="u-iblock"'],
  [/style="display:\s*none;?"/g,             'class="u-hidden"'],
  [/style="display:\s*block;?"/g,            'class="u-block"'],

  // margins (single)
  [/style="margin:\s*0;?"/g,                 'class="u-m-0"'],
  [/style="margin-top:\s*0;?"/g,             'class="u-mt-0"'],
  [/style="margin-top:\s*4px;?"/g,           'class="u-mt-1"'],
  [/style="margin-top:\s*8px;?"/g,           'class="u-mt-2"'],
  [/style="margin-top:\s*12px;?"/g,          'class="u-mt-3"'],
  [/style="margin-top:\s*16px;?"/g,          'class="u-mt-4"'],
  [/style="margin-top:\s*20px;?"/g,          'class="u-mt-5"'],
  [/style="margin-top:\s*24px;?"/g,          'class="u-mt-6"'],
  [/style="margin-top:\s*32px;?"/g,          'class="u-mt-7"'],
  [/style="margin-top:\s*40px;?"/g,          'class="u-mt-8"'],
  [/style="margin-top:\s*48px;?"/g,          'class="u-mt-9"'],
  [/style="margin-top:\s*64px;?"/g,          'class="u-mt-10"'],
  [/style="margin-top:\s*1rem;?"/g,          'class="u-mt-4"'],
  [/style="margin-top:\s*0\.5rem;?"/g,       'class="u-mt-2"'],
  [/style="margin-top:\s*0\.25rem;?"/g,      'class="u-mt-1"'],
  [/style="margin-top:\s*1\.5rem;?"/g,       'class="u-mt-6"'],
  [/style="margin-top:\s*2rem;?"/g,          'class="u-mt-7"'],

  [/style="margin-bottom:\s*4px;?"/g,        'class="u-mb-1"'],
  [/style="margin-bottom:\s*8px;?"/g,        'class="u-mb-2"'],
  [/style="margin-bottom:\s*12px;?"/g,       'class="u-mb-3"'],
  [/style="margin-bottom:\s*14px;?"/g,       'class="u-mb-3"'],
  [/style="margin-bottom:\s*16px;?"/g,       'class="u-mb-4"'],
  [/style="margin-bottom:\s*20px;?"/g,       'class="u-mb-5"'],
  [/style="margin-bottom:\s*24px;?"/g,       'class="u-mb-6"'],
  [/style="margin-bottom:\s*26px;?"/g,       'class="u-mb-65"'],
  [/style="margin-bottom:\s*28px;?"/g,       'class="u-mb-7"'],
  [/style="margin-bottom:\s*32px;?"/g,       'class="u-mb-8"'],
  [/style="margin-bottom:\s*1rem;?"/g,       'class="u-mb-4"'],
  [/style="margin-bottom:\s*0\.5rem;?"/g,    'class="u-mb-2"'],
  [/style="margin-bottom:\s*1\.5rem;?"/g,    'class="u-mb-6"'],

  // padding (single)
  [/style="padding:\s*22px\s+24px;?"/g,      'class="u-p-card"'],
  [/style="padding:\s*16px\s+18px;?"/g,      'class="u-p-card-sm"'],
  [/style="padding:\s*16px;?"/g,             'class="u-p-16"'],
  [/style="padding:\s*14px;?"/g,             'class="u-p-14"'],
  [/style="padding:\s*12px;?"/g,             'class="u-p-12"'],
  [/style="padding:\s*1rem;?"/g,             'class="u-p-16"'],
  [/style="padding:\s*0\.5rem;?"/g,          'class="u-p-12"'],

  // overflow
  [/style="overflow:\s*hidden;?"/g,          'class="u-overflow-hidden"'],
  [/style="overflow-x:\s*auto;?"/g,          'class="u-overflow-auto"'],
  [/style="overflow-y:\s*auto;?"/g,          'class="u-overflow-auto"'],

  // cursor
  [/style="cursor:\s*pointer;?"/g,           'class="u-cursor-pointer"'],

  // width
  [/style="width:\s*100%;?"/g,               'class="u-w-full"'],
];

/* Coalesce adjacent class= attributes into one. */
function mergeAdjacentClasses(html) {
  let prev;
  do {
    prev = html;
    html = html.replace(/class="([^"]*)"\s+class="([^"]*)"/g, (_m, a, b) => {
      const seen = new Set();
      const merged = (a + ' ' + b).split(/\s+/).filter(Boolean).filter(c => {
        if (seen.has(c)) return false;
        seen.add(c);
        return true;
      });
      return `class="${merged.join(' ')}"`;
    });
  } while (html !== prev);
  return html;
}

/* ─────────────────────────────────────────────────────────────────
   AURORA v15.1 — Single-declaration → class atom map.
   Used by the decomposer pass below: any inline style="X; Y; Z;"
   is decomposed; if EVERY decl resolves to a class, the whole
   attribute becomes class="...". Otherwise the inline is left
   untouched (no visual regression risk).
   ───────────────────────────────────────────────────────────────── */
const ATOM = {
  // text alignment
  'text-align:center': 'u-text-center',
  'text-align:end':    'u-text-end',
  'text-align:right':  'u-text-end',
  'text-align:start':  'u-text-start',
  'text-align:left':   'u-text-start',

  // colors
  'color:var(--text)':                'u-c-text',
  'color:var(--text-muted)':          'u-c-muted',
  'color:var(--text-faint)':          'u-c-faint',
  'color:var(--accent)':              'u-c-cyan',
  'color:#22C55E':                    'u-c-green',
  'color:#EF4444':                    'u-c-red',
  'color:#8B5CF6':                    'u-c-purple',
  'color:#F59E0B':                    'u-c-amber',
  'color:#3B82F6':                    'u-c-blue',
  'color:#EC4899':                    'u-c-pink',
  'color:#0EA5E9':                    'u-c-sky',
  'color:#EAB308':                    'u-c-yellow',
  'color:#F97316':                    'u-c-orange',
  'color:#06B6D4':                    'u-c-cyan6',
  'color:#F87171':                    'u-c-red-soft',
  'color:#fff':                       'u-c-white',
  'color:#FFFFFF':                    'u-c-white',

  // font-weight
  'font-weight:900': 'u-fw-900',
  'font-weight:800': 'u-fw-800',
  'font-weight:700': 'u-fw-700',
  'font-weight:600': 'u-fw-600',
  'font-weight:500': 'u-fw-500',

  // font-size
  'font-size:24px':   'u-fz-24',
  'font-size:22px':   'u-fz-22',
  'font-size:20px':   'u-fz-20',
  'font-size:18px':   'u-fz-18',
  'font-size:17px':   'u-fz-17',
  'font-size:16px':   'u-fz-16',
  'font-size:15px':   'u-fz-15',
  'font-size:14px':   'u-fz-14',
  'font-size:13.5px': 'u-fz-135',
  'font-size:13px':   'u-fz-13',
  'font-size:12.5px': 'u-fz-125',
  'font-size:12px':   'u-fz-12',
  'font-size:11.5px': 'u-fz-115',
  'font-size:11px':   'u-fz-11',
  'font-size:10.5px': 'u-fz-105',
  'font-size:10px':   'u-fz-10',
  'font-size:9px':    'u-fz-9',

  // text-transform
  'text-transform:uppercase': 'u-tt-up',
  'text-transform:lowercase': 'u-tt-low',
  'text-transform:none':      'u-tt-none',

  // letter-spacing
  'letter-spacing:1px':   'u-ls-1',
  'letter-spacing:1.1px': 'u-ls-11',
  'letter-spacing:1.2px': 'u-ls-12',
  'letter-spacing:1.5px': 'u-ls-15',
  'letter-spacing:1.6px': 'u-ls-16',
  'letter-spacing:0.8px': 'u-ls-08',
  'letter-spacing:-0.2px':'u-ls-n02',
  'letter-spacing:-0.3px':'u-ls-n03',

  // line-height
  'line-height:1.5':  'u-lh-15',
  'line-height:1.6':  'u-lh-16',
  'line-height:1.65': 'u-lh-165',
  'line-height:1.7':  'u-lh-17',
  'line-height:1.75': 'u-lh-175',
  'line-height:1.8':  'u-lh-18',
  'line-height:1.85': 'u-lh-185',
  'line-height:1.95': 'u-lh-195',
  'line-height:2':    'u-lh-2',

  // display
  'display:flex':         'u-flex',
  'display:grid':         'u-grid',
  'display:inline-flex':  'u-iflex',
  'display:inline-block': 'u-iblock',
  'display:none':         'u-hidden',
  'display:block':        'u-block',

  // align-items / justify-content
  'align-items:center':       'u-items-center',
  'align-items:flex-start':   'u-items-start',
  'align-items:flex-end':     'u-items-end',
  'justify-content:space-between': 'u-justify-between',
  'justify-content:center':        'u-justify-center',
  'justify-content:flex-end':      'u-justify-end',

  // flex-direction
  'flex-direction:column': 'u-flex-col',
  'flex-wrap:wrap':        'u-flex-wrap',

  // gaps
  'gap:4px':  'u-gap-1',
  'gap:5px':  'u-gap-1',
  'gap:6px':  'u-gap-2-sm',
  'gap:8px':  'u-gap-2',
  'gap:10px': 'u-gap-2-5',
  'gap:12px': 'u-gap-3',
  'gap:14px': 'u-gap-35',
  'gap:16px': 'u-gap-4',
  'gap:18px': 'u-gap-45',
  'gap:20px': 'u-gap-5',

  // margins (top)
  'margin-top:0':    'u-mt-0',
  'margin-top:2px':  'u-mt-tiny',
  'margin-top:4px':  'u-mt-1',
  'margin-top:6px':  'u-mt-15',
  'margin-top:8px':  'u-mt-2',
  'margin-top:10px': 'u-mt-25',
  'margin-top:12px': 'u-mt-3',
  'margin-top:14px': 'u-mt-35',
  'margin-top:16px': 'u-mt-4',
  'margin-top:18px': 'u-mt-45',
  'margin-top:20px': 'u-mt-5',
  'margin-top:24px': 'u-mt-6',
  'margin-top:28px': 'u-mt-7b',
  'margin-top:32px': 'u-mt-7',
  'margin-top:36px': 'u-mt-9b',
  'margin-top:40px': 'u-mt-8',
  'margin-top:48px': 'u-mt-9',

  // margins (bottom)
  'margin-bottom:0':    'u-mb-0',
  'margin-bottom:2px':  'u-mb-tiny',
  'margin-bottom:3px':  'u-mb-15',
  'margin-bottom:4px':  'u-mb-1',
  'margin-bottom:6px':  'u-mb-15b',
  'margin-bottom:7px':  'u-mb-2-tight',
  'margin-bottom:8px':  'u-mb-2',
  'margin-bottom:10px': 'u-mb-25',
  'margin-bottom:12px': 'u-mb-3',
  'margin-bottom:14px': 'u-mb-3',
  'margin-bottom:16px': 'u-mb-4',
  'margin-bottom:18px': 'u-mb-45',
  'margin-bottom:20px': 'u-mb-5',
  'margin-bottom:22px': 'u-mb-7b',
  'margin-bottom:24px': 'u-mb-6',
  'margin-bottom:26px': 'u-mb-65',
  'margin-bottom:28px': 'u-mb-7',
  'margin-bottom:32px': 'u-mb-8',

  // margin reset
  'margin:0': 'u-m-0',

  // padding singletons
  'padding:0':          'u-p-0',
  'padding:8px':        'u-p-8',
  'padding:10px':       'u-p-10',
  'padding:12px':       'u-p-12',
  'padding:14px':       'u-p-14',
  'padding:16px':       'u-p-16',
  'padding:18px':       'u-p-18',
  'padding:20px':       'u-p-20',
  'padding:22px':       'u-p-22',
  'padding:8px 10px':   'u-p-8-10',
  'padding:9px 12px':   'u-p-9-12',
  'padding:10px 12px':  'u-p-10-12',
  'padding:11px 28px':  'u-pad-card-md',
  'padding:14px 16px':  'u-p-14-16',
  'padding:16px 18px':  'u-p-card-sm',
  'padding:22px 24px':  'u-p-card',

  // border-radius
  'border-radius:6px':              'u-r-6',
  'border-radius:8px':              'u-r-8',
  'border-radius:10px':             'u-r-10',
  'border-radius:12px':             'u-r-12',
  'border-radius:14px':             'u-r-14',
  'border-radius:99px':             'u-r-pill',
  'border-radius:var(--radius-sm)': 'u-r-sm',
  'border-radius:var(--radius-md)': 'u-r-md',
  'border-radius:var(--radius-lg)': 'u-r-lg',

  // background neutrals
  'background:var(--surface-2)':    'u-bg-surface-2',
  'background:var(--surface-3)':    'u-bg-surface-3',
  'background:var(--accent-dim)':   'u-bg-accent-dim',
  'background:transparent':         'u-bg-transparent',
  'background:var(--accent)':       'u-bg-accent',
  // background semantic hex (small palette covering meters and segments)
  'background:#22C55E':             'u-bg-green',
  'background:#16A34A':             'u-bg-green-dark',
  'background:#EAB308':             'u-bg-yellow',
  'background:#EF4444':             'u-bg-red',
  'background:#8B5CF6':             'u-bg-purple',
  'background:#3B82F6':             'u-bg-blue',
  'background:#0EA5E9':             'u-bg-sky',
  'background:#A855F7':             'u-bg-violet',
  'background:#F59E0B':             'u-bg-amber',
  'background:#F97316':             'u-bg-orange',
  'background:#EC4899':             'u-bg-pink',
  'background:#06B6D4':             'u-bg-cyan6',
  'background:#FE2C55':             'u-bg-tiktok',
  'background:#1DA1F2':             'u-bg-twitter',
  'background:#0A91CC':             'u-bg-linkedin-dark',
  'background:#E4405F':             'u-bg-instagram',
  'background:#DC2626':             'u-bg-red-bold',
  'background:#166534':             'u-bg-green-deep',
  'background:#7F1D1D':             'u-bg-red-deep',
  'background:#10B981':             'u-bg-emerald',
  'background:#FBBF77':             'u-bg-peach',
  // background tints (rgba @ 10%) — common in pills/segments
  'background:rgba(34,197,94,0.1)':   'u-bg-tint-green',
  'background:rgba(239,68,68,0.1)':   'u-bg-tint-red',
  'background:rgba(236,72,153,0.1)':  'u-bg-tint-pink',
  'background:rgba(14,165,233,0.1)':  'u-bg-tint-sky',
  'background:rgba(139,92,246,0.1)':  'u-bg-tint-purple',

  // border-color singletons (with rgba decoded back to specific tints)
  'border-color:rgba(0,119,181,0.3)':   'u-bc-linkedin',
  'border-color:rgba(29,161,242,0.3)':  'u-bc-twitter',
  'border-color:rgba(228,64,95,0.3)':   'u-bc-instagram',
  'border-color:rgba(254,44,85,0.3)':   'u-bc-tiktok',

  // border:1px solid rgba(...) — most-frequent palette (compound atoms)
  'border:1px solid rgba(102,252,241,0.12)': 'u-b1-cyan-12',
  'border:1px solid rgba(102,252,241,0.15)': 'u-b1-cyan-15',
  'border:1px solid rgba(102,252,241,0.18)': 'u-b1-cyan-18',
  'border:1px solid rgba(102,252,241,0.2)':  'u-b1-cyan-20',
  'border:1px solid rgba(102,252,241,0.25)': 'u-b1-cyan-25',
  'border:1px solid rgba(102,252,241,0.3)':  'u-b1-cyan-30',
  'border:1px solid rgba(34,197,94,0.15)':   'u-b1-green-15',
  'border:1px solid rgba(34,197,94,0.18)':   'u-b1-green-18',
  'border:1px solid rgba(34,197,94,0.2)':    'u-b1-green-20',
  'border:1px solid rgba(34,197,94,0.25)':   'u-b1-green-25',
  'border:1px solid rgba(34,197,94,0.3)':    'u-b1-green-30',
  'border:1px solid rgba(239,68,68,0.15)':   'u-b1-red-15',
  'border:1px solid rgba(239,68,68,0.18)':   'u-b1-red-18',
  'border:1px solid rgba(239,68,68,0.2)':    'u-b1-red-20',
  'border:1px solid rgba(239,68,68,0.25)':   'u-b1-red-25',
  'border:1px solid rgba(239,68,68,0.3)':    'u-b1-red-30',
  'border:1px solid rgba(139,92,246,0.15)':  'u-b1-purple-15',
  'border:1px solid rgba(139,92,246,0.18)':  'u-b1-purple-18',
  'border:1px solid rgba(139,92,246,0.2)':   'u-b1-purple-20',
  'border:1px solid rgba(139,92,246,0.25)':  'u-b1-purple-25',
  'border:1px solid rgba(139,92,246,0.3)':   'u-b1-purple-30',
  'border:1px solid rgba(245,158,11,0.18)':  'u-b1-amber-18',
  'border:1px solid rgba(245,158,11,0.2)':   'u-b1-amber-20',
  'border:1px solid rgba(245,158,11,0.25)':  'u-b1-amber-25',
  'border:1px solid rgba(249,115,22,0.25)':  'u-b1-orange-25',
  'border:1px solid rgba(236,72,153,0.25)':  'u-b1-pink-25',
  'border:1px solid rgba(14,165,233,0.15)':  'u-b1-sky-15',
  'border:1px solid rgba(14,165,233,0.18)':  'u-b1-sky-18',
  'border:1px solid rgba(14,165,233,0.2)':   'u-b1-sky-20',
  'border:1px solid rgba(14,165,233,0.25)':  'u-b1-sky-25',
  'border:1px solid rgba(234,179,8,0.15)':   'u-b1-yellow-15',
  'border:1px solid rgba(234,179,8,0.2)':    'u-b1-yellow-20',
  'border:1px solid rgba(234,179,8,0.25)':   'u-b1-yellow-25',
  'border:1px solid rgba(6,182,212,0.18)':   'u-b1-cyan6-18',
  'border:1px solid rgba(6,182,212,0.2)':    'u-b1-cyan6-20',
  'border:1px solid rgba(6,182,212,0.25)':   'u-b1-cyan6-25',
  'border:1px solid var(--border)':          'u-b1-bd',
  'border:1px solid var(--border-hover)':    'u-b1-bdh',
  'border:1px solid var(--accent)':          'u-b1-acc',
  'border:1px dashed var(--border)':         'u-b1d-bd',

  // border-color additional rgba (35% intensity series)
  'border-color:rgba(102,252,241,0.25)':'u-bc-cyan-25',
  'border-color:rgba(34,197,94,0.25)':  'u-bc-green-25',
  'border-color:rgba(239,68,68,0.35)':  'u-bc-red-35',
  'border-color:rgba(234,179,8,0.35)':  'u-bc-yellow-35',
  'border-color:rgba(249,115,22,0.35)': 'u-bc-orange-35',
  'border-color:rgba(245,158,11,0.35)': 'u-bc-amber-35',
  'border-color:rgba(236,72,153,0.35)': 'u-bc-pink-35',
  'border-color:rgba(139,92,246,0.35)': 'u-bc-purple-35',
  'border-color:rgba(102,252,241,0.35)':'u-bc-cyan-35',
  'border-color:rgba(34,197,94,0.35)':  'u-bc-green-35',

  // background var(--surface*) used outside-of-frames
  'background:var(--surface)':          'u-bg-surface',

  // border-side hairlines
  'border-bottom:1px solid var(--border)':       'u-bb-bd',
  'border-top:1px solid var(--border)':          'u-bt-bd',
  'border-right:1px solid var(--border)':        'u-br-bd',
  'border-left:1px solid var(--border)':         'u-bl-bd',
  'border-bottom:1px dashed var(--border)':      'u-bbd-bd',

  // accent-color (form-controls)
  'accent-color:var(--accent)':         'u-acc-accent',
  'accent-color:#22C55E':               'u-acc-green',
  'accent-color:#8B5CF6':               'u-acc-purple',
  'accent-color:#EC4899':               'u-acc-pink',
  'accent-color:#F97316':               'u-acc-orange',
  'accent-color:#66FCF1':               'u-acc-cyan',

  // padding combinations missing earlier
  'padding:7px 10px':       'u-p-7-10',
  'padding:5px 12px':       'u-p-5-12',
  'padding:5px 14px':       'u-p-5-14',
  'padding:8px 12px':       'u-p-8-12',
  'padding:14px 18px':      'u-p-14-18',
  'padding:16px 20px':      'u-p-16-20',
  'padding:18px 20px':      'u-p-18-20',
  'padding:20px 14px':      'u-p-20-14',
  'padding:11px 13px':      'u-p-11-13',
  'padding:16px 20px 12px': 'u-p-16-20-12',
  'padding:16px 22px 14px': 'u-p-16-22-14',
  'padding:24px 28px':      'u-p-24-28',

  // additional gap
  'gap:3px':  'u-gap-3px',

  // margin-right/left small singletons
  'margin-right:4px':  'u-mr-1',
  'margin-right:8px':  'u-mr-2',
  'margin-left:4px':   'u-ml-1',
  'margin-left:8px':   'u-ml-2',

  // misc colors used in handful of places
  'color:#CBD5E1':                    'u-c-slate-soft',
  'color:#B45309':                    'u-c-amber-deep',
  'color:#FBBF77':                    'u-c-peach',
  'color:#86EFAC':                    'u-c-mint',
  'color:#0A91CC':                    'u-c-linkedin-dark',
  'color:#1DA1F2':                    'u-c-twitter',
  'color:#FE2C55':                    'u-c-tiktok',

  // overflow / cursor / width
  'overflow:hidden':  'u-overflow-hidden',
  'overflow-x:auto':  'u-overflow-auto',
  'overflow-y:auto':  'u-overflow-auto',
  'cursor:pointer':   'u-cursor-pointer',
  'cursor:grab':      'u-cursor-grab',
  'width:100%':       'u-w-full',
  'width:auto':       'u-w-auto',

  // font-style
  'font-style:italic': 'u-italic',
  'font-style:normal': 'u-fs-normal',

  // flex-shrink / grow
  'flex-shrink:0': 'u-shrink-0',
  'flex-grow:1':   'u-grow-1',
  'flex:1':        'u-flex-1',

  // misc helpers seen in inline
  'font-variant-numeric:tabular-nums': 'u-num',
  'font-family:inherit':               'u-ff-inherit',

  // width/height px singletons (icon boxes / dots)
  'width:10px':   'u-w-10px',
  'width:12px':   'u-w-12px',
  'width:16px':   'u-w-16px',
  'width:36px':   'u-w-36px',
  'width:42px':   'u-w-42px',
  'width:46px':   'u-w-46px',
  'width:48px':   'u-w-48px',
  'width:120px':  'u-w-120',
  'width:200px':  'u-w-200',
  'height:10px':  'u-h-10px',
  'height:12px':  'u-h-12px',
  'height:16px':  'u-h-16px',
  'height:36px':  'u-h-36px',
  'height:42px':  'u-h-42px',
  'height:46px':  'u-h-46px',
  'height:48px':  'u-h-48px',
  'min-width:540px':'u-mw-540',
  'min-width:600px':'u-mw-600',
  'min-width:700px':'u-mw-700',
  'max-width:600px':'u-mxw-600',
  'max-width:720px':'u-mxw-720',
  'max-width:780px':'u-mxw-780',
};

/* Decomposer: split compound inline → class atoms (all-or-nothing). */
function decomposeInline(html) {
  let touched = 0;
  const out = html.replace(/style="([^"]+)"/g, (whole, body) => {
    const decls = body.split(';').map(s => s.trim()).filter(Boolean);
    // normalize each decl: lowercase whitespace inside `prop: value` to `prop:value` for lookup
    const classes = [];
    for (const decl of decls) {
      // collapse spaces around colon and inside value
      const compact = decl
        .replace(/\s*:\s*/, ':')
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',');
      const cls = ATOM[compact];
      if (!cls) return whole; // any unmapped → leave attribute untouched
      classes.push(cls);
    }
    if (classes.length === 0) return whole;
    touched++;
    // de-dupe preserving order
    const seen = new Set();
    const uniq = classes.filter(c => (seen.has(c) ? false : (seen.add(c), true)));
    return `class="${uniq.join(' ')}"`;
  });
  return { html: out, touched };
}

let after = before;
let totalReplaced = 0;
for (const [re, sub] of REPLACERS) {
  after = after.replace(re, () => { totalReplaced++; return sub; });
}

// AURORA v15.1 — second pass: decompose remaining compound inline styles
// into atoms when EVERY declaration maps to a known utility class.
const decomp = decomposeInline(after);
after = decomp.html;
const decomposed = decomp.touched;

after = mergeAdjacentClasses(after);

const inlineBefore = (before.match(/style="/g) || []).length;
const inlineAfter  = (after.match(/style="/g) || []).length;

if (after !== before) fs.writeFileSync(file, after);

console.log(`inline-style attrs:   ${inlineBefore} → ${inlineAfter}  (Δ ${inlineBefore - inlineAfter})`);
console.log(`replacements applied:  ${totalReplaced}`);
console.log(`decomposed compounds:  ${decomposed}`);
