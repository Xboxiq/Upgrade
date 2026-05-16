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

let after = before;
let totalReplaced = 0;
for (const [re, sub] of REPLACERS) {
  after = after.replace(re, () => { totalReplaced++; return sub; });
}
after = mergeAdjacentClasses(after);

const inlineBefore = (before.match(/style="/g) || []).length;
const inlineAfter  = (after.match(/style="/g) || []).length;

if (after !== before) fs.writeFileSync(file, after);

console.log(`inline-style attrs:   ${inlineBefore} → ${inlineAfter}  (Δ ${inlineBefore - inlineAfter})`);
console.log(`replacements applied:  ${totalReplaced}`);
