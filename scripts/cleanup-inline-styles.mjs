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

  /* ═══════════════════════════════════════════════════════════════════════
     AURORA v15.1 — Worker 13 / Phase 2 mappings (Real Inline Purge)
     Patterns added based on grep frequency analysis on actual main HTML.
     ═══════════════════════════════════════════════════════════════════════ */

  /* ── Compound type presets (high frequency, targeted) ──────────────── */

  // "font-size:9px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:var(--accent); margin-bottom:6px;"
  [/style="font-size:\s*9px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.2px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*6px;?"/g,
   'class="u-t-eyebrow"'],

  // "font-size:17px;font-weight:800;color:var(--text);letter-spacing:-0.2px;margin-bottom:3px;"
  [/style="font-size:\s*17px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*letter-spacing:\s*-0\.2px;\s*margin-bottom:\s*3px;?"/g,
   'class="u-t-card-title"'],

  // "font-size:17px;font-weight:800;color:var(--text);" — short variant
  [/style="font-size:\s*17px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);?"/g,
   'class="u-t-card-title-tight"'],

  // "font-size:14px; font-weight:800; color:var(--text); margin-bottom:3px;"
  [/style="font-size:\s*14px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*3px;?"/g,
   'class="u-t-list-title"'],

  // "font-size:13px;font-weight:800;color:var(--text);" — bare
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);?"/g,
   'class="u-t-row-title"'],

  // "font-size:13px; font-weight:800; color:var(--accent); margin-bottom:4px;"
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*4px;?"/g,
   'class="u-t-section-mini"'],

  // 13px coloured section headers — 4 colour variants × ~2 each
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*#F59E0B;\s*margin-bottom:\s*4px;?"/g,
   'class="u-t-section-amber"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*#EC4899;\s*margin-bottom:\s*4px;?"/g,
   'class="u-t-section-pink"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*4px;?"/g,
   'class="u-t-section-violet"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*#22C55E;\s*margin-bottom:\s*4px;?"/g,
   'class="u-t-section-green"'],

  // "font-size:13px; color:var(--text-muted); line-height:1.7;"
  [/style="font-size:\s*13px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;?"/g,
   'class="u-t-meta-13"'],

  // "font-size:12px; font-weight:800; color:var(--accent); margin-bottom:8px;"
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*8px;?"/g,
   'class="u-t-section-cyan"'],

  // "font-size:18px; margin-bottom:8px;"
  [/style="font-size:\s*18px;\s*margin-bottom:\s*8px;?"/g, 'class="u-t-h-md"'],

  // "font-size:24px;"
  [/style="font-size:\s*24px;?"/g, 'class="u-t-h-lg"'],

  /* ── Decorations ──────────────────────────────────────────────────── */

  // "height:1px; background:var(--border); margin:14px 0;"
  [/style="height:\s*1px;\s*background:\s*var\(--border\);\s*margin:\s*14px\s+0;?"/g,
   'class="u-divider-h"'],

  // "padding:22px 26px;margin-bottom:28px;"
  [/style="padding:\s*22px\s+26px;\s*margin-bottom:\s*28px;?"/g,
   'class="u-pad-card-lg"'],

  // "padding:11px 28px;"
  [/style="padding:\s*11px\s+28px;?"/g, 'class="u-pad-card-md"'],

  /* ── Width tokens (single-decl, repeated 2× each) ─────────────────── */

  [/style="width:\s*20%;?"/g, 'class="u-w-20"'],
  [/style="width:\s*24%;?"/g, 'class="u-w-24"'],
  [/style="width:\s*38%;?"/g, 'class="u-w-38"'],
  [/style="width:\s*39%;?"/g, 'class="u-w-39"'],

  /* ── Round-2: more compound type presets (≥2 occurrences each) ────── */

  // "font-size:12px; font-weight:800; color:var(--accent); margin-bottom:12px;"
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*12px;?"/g,
   'class="u-t-section-cyan-mb12"'],

  // "font-size:12px; font-weight:800; color:#F59E0B; margin-bottom:8px;"
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#F59E0B;\s*margin-bottom:\s*8px;?"/g,
   'class="u-t-section-amber-12"'],

  // "font-size:12px; font-weight:800; color:#E4405F; margin-bottom:8px;"
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#E4405F;\s*margin-bottom:\s*8px;?"/g,
   'class="u-t-section-pinkish"'],

  // "font-size:12px; color:var(--text-muted); line-height:1.95;"
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.95;?"/g,
   'class="u-meta-md-loosest"'],

  // "font-size:12.5px;color:var(--text-muted);line-height:1.85;max-width:720px;"
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;\s*max-width:\s*720px;?"/g,
   'class="u-meta-lh-mw720"'],

  // "font-size:12.5px;color:var(--text-muted);line-height:1.85;margin-bottom:14px;"
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;\s*margin-bottom:\s*14px;?"/g,
   'class="u-meta-lh-mb14"'],

  // "font-size:12.5px;color:var(--text-muted);line-height:1.7;margin-bottom:16px;"
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;\s*margin-bottom:\s*16px;?"/g,
   'class="u-meta-lh-mb16"'],

  // "font-size:12.5px;color:var(--text-muted);line-height:1.75;"
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.75;?"/g,
   'class="u-meta-lh-loose"'],

  // "font-size:11px; padding:5px 12px;"
  [/style="font-size:\s*11px;\s*padding:\s*5px\s+12px;?"/g, 'class="u-tag-pill-11"'],

  // "font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#8B5CF6;margin-bottom:8px;"
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*8px;?"/g,
   'class="u-eyebrow-violet"'],

  // "font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#06B6D4;margin-bottom:8px;"
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#06B6D4;\s*margin-bottom:\s*8px;?"/g,
   'class="u-eyebrow-cyan6"'],

  // "font-size:11px; font-weight:800; letter-spacing:1.1px; text-transform:uppercase; color:var(--accent); margin-bottom:10px;"
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*10px;?"/g,
   'class="u-eyebrow-cyan-11"'],

  // "font-size:11px; font-weight:800; letter-spacing:1.1px; text-transform:uppercase; color:#F59E0B; margin-bottom:10px;"
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*#F59E0B;\s*margin-bottom:\s*10px;?"/g,
   'class="u-eyebrow-amber-11"'],

  // "font-size:11.5px; color:var(--text-muted); line-height:1.85;"
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;?"/g,
   'class="u-meta-115-lh185"'],

  // "font-size:11.5px; color:var(--text-muted); line-height:1.75;"
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.75;?"/g,
   'class="u-meta-115-lh175"'],

  // 10px pills
  [/style="font-size:\s*10px;\s*background:\s*rgba\(234,\s*179,\s*8,\s*0\.15\);\s*color:\s*#EAB308;\s*border:\s*1px\s+solid\s+rgba\(234,\s*179,\s*8,\s*0\.25\);?"/g,
   'class="u-pill-yellow"'],
  [/style="font-size:\s*10px;\s*background:\s*rgba\(14,\s*165,\s*233,\s*0\.12\);\s*color:\s*#0EA5E9;\s*border:\s*1px\s+solid\s+rgba\(14,\s*165,\s*233,\s*0\.2\);?"/g,
   'class="u-pill-sky"'],

  /* ── Round-2 grids/rows ──────────────────────────────────────────── */

  // "display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:10px;"
  [/style="display:\s*grid;\s*grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(280px,\s*1fr\)\);\s*gap:\s*10px;?"/g,
   'class="u-grid-auto-280"'],

  // "display:grid;grid-template-columns:repeat(3,1fr);gap:14px;"
  [/style="display:\s*grid;\s*grid-template-columns:\s*repeat\(3,\s*1fr\);\s*gap:\s*14px;?"/g,
   'class="u-grid-3-14"'],

  // "display:grid;grid-template-columns:1fr 1fr;gap:10px;"
  [/style="display:\s*grid;\s*grid-template-columns:\s*1fr\s+1fr;\s*gap:\s*10px;?"/g,
   'class="u-grid-2-10"'],

  // "display:flex; align-items:center; gap:8px;"
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*8px;?"/g,
   'class="u-row-8"'],

  // "display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);"
  [/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*14px;\s*margin-bottom:\s*20px;\s*padding-bottom:\s*16px;\s*border-bottom:\s*1px\s+solid\s+var\(--border\);?"/g,
   'class="u-row-divider"'],

  /* ── Round-2 single-decl colours ─────────────────────────────────── */

  [/style="color:\s*#F87171"/g,                  'class="u-c-red-soft"'],
  [/style="color:\s*#EAB308;\s*font-weight:\s*700;?"/g, 'class="u-c-yellow-bold"'],
  [/style="color:\s*#0EA5E9;\s*font-weight:\s*700;?"/g, 'class="u-c-sky-bold"'],
  [/style="color:\s*#0EA5E9;?"/g,                'class="u-c-sky"'],

  // green badge box
  [/style="color:\s*#22C55E;\s*background:\s*rgba\(34,\s*197,\s*94,\s*0\.06\);\s*border:\s*1px\s+solid\s+rgba\(34,\s*197,\s*94,\s*0\.15\);\s*border-radius:\s*var\(--radius-sm\);\s*padding:\s*7px\s+10px;\s*font-size:\s*11\.5px;?"/g,
   'class="u-box-success-soft"'],

  // surface-2 success-bordered card
  [/style="background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+rgba\(34,\s*197,\s*94,\s*0\.2\);\s*border-radius:\s*var\(--radius-md\);\s*padding:\s*16px;?"/g,
   'class="u-card-success-soft"'],

  /* ── Single-decl shortcuts (small, cheap purges) ─────────────────── */

  [/style="gap:\s*12px;?"/g, 'class="u-gap-3b"'],
  [/style="margin-bottom:\s*10px;?"/g, 'class="u-mb-25"'],
  [/style="margin-top:\s*14px;?"/g, 'class="u-mt-35"'],
  [/style="margin-top:\s*18px;?"/g, 'class="u-mt-45"'],

  /* ── Round-3: italic + colored variants ──────────────────────────── */

  [/style="font-style:\s*italic;\s*color:\s*var\(--text\);?"/g, 'class="u-italic-text"'],
  [/style="font-style:\s*italic;\s*color:\s*var\(--accent\);?"/g, 'class="u-italic-cyan"'],
  [/style="font-style:\s*italic;\s*color:\s*#EAB308;?"/g, 'class="u-italic-yellow"'],
  [/style="font-style:\s*italic;\s*color:\s*#3B82F6;?"/g, 'class="u-italic-blue"'],
  [/style="font-style:\s*italic;\s*color:\s*#22C55E;?"/g, 'class="u-italic-green"'],

  /* ── Round-3: 9px micro-eyebrow patterns ─────────────────────────── */

  [/style="font-size:\s*9px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*12px;?"/g,
   'class="u-micro-eyebrow-faint-12"'],
  [/style="font-size:\s*9px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.2px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*8px;?"/g,
   'class="u-micro-eyebrow-faint-8"'],
  [/style="font-size:\s*9px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.2px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*6px;?"/g,
   'class="u-micro-eyebrow-faint-6"'],
  [/style="font-size:\s*9px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.2px;\s*text-transform:\s*uppercase;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*6px;?"/g,
   'class="u-micro-eyebrow-violet"'],

  /* ── Round-3: 36px stat numbers (4 colour variants) ──────────────── */

  [/style="font-size:\s*36px;\s*font-weight:\s*900;\s*color:\s*#EAB308;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-36-yellow"'],
  [/style="font-size:\s*36px;\s*font-weight:\s*900;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-36-violet"'],
  [/style="font-size:\s*36px;\s*font-weight:\s*900;\s*color:\s*#22C55E;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-36-green"'],
  [/style="font-size:\s*36px;\s*font-weight:\s*900;\s*color:\s*#0EA5E9;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-36-sky"'],

  /* ── Round-3: 28px stat numbers (5+ colour variants) ─────────────── */

  [/style="font-size:\s*28px;\s*font-weight:\s*900;\s*color:\s*var\(--accent\);?"/g, 'class="u-stat-28-cyan"'],
  [/style="font-size:\s*28px;\s*font-weight:\s*900;\s*color:\s*#F59E0B;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-28-amber"'],
  [/style="font-size:\s*28px;\s*font-weight:\s*900;\s*color:\s*#EF4444;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-28-red"'],
  [/style="font-size:\s*28px;\s*font-weight:\s*900;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-28-violet"'],
  [/style="font-size:\s*28px;\s*font-weight:\s*900;\s*color:\s*#10B981;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-28-emerald"'],
  [/style="font-size:\s*28px;\s*font-weight:\s*900;\s*color:\s*#06B6D4;\s*margin-bottom:\s*8px;?"/g, 'class="u-stat-28-cyan-d"'],
  [/style="font-size:\s*28px;\s*flex-shrink:\s*0;\s*margin-top:\s*2px;?"/g, 'class="u-icon-28"'],
  [/style="font-size:\s*28px;?"/g, 'class="u-fz-28"'],

  /* ── Round-3: 26px stat numbers ──────────────────────────────────── */

  [/style="font-size:\s*26px;\s*font-weight:\s*900;\s*color:\s*var\(--accent\);?"/g, 'class="u-stat-26-cyan"'],
  [/style="font-size:\s*26px;\s*font-weight:\s*900;\s*color:\s*#8B5CF6;?"/g, 'class="u-stat-26-violet"'],
  [/style="font-size:\s*26px;\s*font-weight:\s*900;\s*color:\s*#22C55E;?"/g, 'class="u-stat-26-green"'],
  [/style="font-size:\s*26px;?"/g, 'class="u-fz-26"'],

  /* ── Round-3: 20px stat numbers (5 colour variants) ──────────────── */

  [/style="font-size:\s*20px;\s*font-weight:\s*900;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*4px;?"/g, 'class="u-stat-20-cyan"'],
  [/style="font-size:\s*20px;\s*font-weight:\s*900;\s*color:\s*#EF4444;\s*margin-bottom:\s*4px;?"/g, 'class="u-stat-20-red"'],
  [/style="font-size:\s*20px;\s*font-weight:\s*900;\s*color:\s*#EAB308;\s*margin-bottom:\s*4px;?"/g, 'class="u-stat-20-yellow"'],
  [/style="font-size:\s*20px;\s*font-weight:\s*900;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*4px;?"/g, 'class="u-stat-20-violet"'],
  [/style="font-size:\s*20px;\s*font-weight:\s*900;\s*color:\s*#0EA5E9;\s*margin-bottom:\s*4px;?"/g, 'class="u-stat-20-sky"'],

  /* ── Round-3: 11px text-uppercase eyebrow variants (15+ patterns) ── */

  // Letter-spacing: 1px variants
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-cyan-1px"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#EF4444;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-red-1px"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#EC4899;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-pink-1px"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#EAB308;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-yellow-1px"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*text-transform:\s*uppercase;\s*letter-spacing:\s*1px;\s*color:\s*#0EA5E9;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-sky-1px"'],

  // letter-spacing 1px mb 6
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*6px;?"/g, 'class="u-eyebrow-cyan-1px-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*#EF4444;\s*margin-bottom:\s*6px;?"/g, 'class="u-eyebrow-red-1px-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*#22C55E;\s*margin-bottom:\s*6px;?"/g, 'class="u-eyebrow-green-1px-6"'],

  // letter-spacing 1.5px text-transform uppercase mb 8
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*6px;?"/g, 'class="u-eyebrow-cyan-15px-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*text-transform:\s*uppercase;\s*color:\s*#F59E0B;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-amber-15px-8"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*text-transform:\s*uppercase;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-violet-15px-8"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*text-transform:\s*uppercase;\s*color:\s*#22C55E;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-green-15px-8"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*text-transform:\s*uppercase;\s*color:\s*#06B6D4;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-cyan6-15px-8"'],

  // letter-spacing 1.6px (already had cyan/amber/etc — these were green/red)
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.6px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-cyan-16px-8"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.6px;\s*text-transform:\s*uppercase;\s*color:\s*#EF4444;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-red-16px-8"'],

  // 11px text-faint eyebrows (already had 1.2px-12 → kept)
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.2px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*14px;?"/g, 'class="u-eyebrow-faint-12-14"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.2px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*12px;?"/g, 'class="u-eyebrow-faint-12-12"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*12px;?"/g, 'class="u-eyebrow-faint-11-12"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*10px;?"/g, 'class="u-eyebrow-faint-11-10"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*6px;?"/g, 'class="u-eyebrow-cyan-11-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*#F59E0B;\s*margin-bottom:\s*8px;?"/g, 'class="u-eyebrow-amber-11-8"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*text-transform:\s*uppercase;\s*color:\s*#F59E0B;\s*margin-bottom:\s*6px;?"/g, 'class="u-eyebrow-amber-11-6"'],

  /* ── Round-3: 12px font-weight 800 colored heads (5+ variants) ───── */

  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#FE2C55;\s*margin-bottom:\s*8px;?"/g, 'class="u-h-12-tiktok"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#F59E0B;\s*margin-bottom:\s*6px;?"/g, 'class="u-h-12-amber-6"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#EF4444;\s*margin-bottom:\s*8px;?"/g, 'class="u-h-12-red-8"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#EF4444;\s*margin-bottom:\s*6px;?"/g, 'class="u-h-12-red-6"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#EAB308;\s*margin-bottom:\s*8px;?"/g, 'class="u-h-12-yellow-8"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*6px;?"/g, 'class="u-h-12-violet-6"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#22C55E;\s*margin-bottom:\s*8px;?"/g, 'class="u-h-12-green-8"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#1DA1F2;\s*margin-bottom:\s*8px;?"/g, 'class="u-h-12-twitter"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#0A91CC;\s*margin-bottom:\s*8px;?"/g, 'class="u-h-12-cyan-deep"'],

  /* ── Round-3: progress bar widths (cleanup keys) ─────────────────── */

  [/style="width:\s*0%;?"/g, 'class="u-pb-0pct"'],
  [/style="width:\s*40%;?"/g, 'class="u-w-40"'],
  [/style="width:\s*36%;?"/g, 'class="u-w-36"'],
  [/style="width:\s*22%;?"/g, 'class="u-w-22"'],
  [/style="width:\s*22%"/g,    'class="u-w-22"'],
  [/style="width:\s*16%;?"/g, 'class="u-w-16"'],
  [/style="width:\s*11%"/g,    'class="u-w-11"'],
  [/style="width:\s*88%"/g,    'class="u-w-88"'],

  /* ── Round-3: padding 9px-12px variants ──────────────────────────── */

  [/style="padding:\s*9px\s+12px;\s*font-variant-numeric:\s*tabular-nums;?"/g, 'class="u-row-num"'],
  [/style="padding:\s*9px\s+12px;\s*color:\s*var\(--text-muted\);?"/g, 'class="u-row-muted"'],
  [/style="padding:\s*9px\s+12px;\s*color:\s*#22C55E;\s*font-variant-numeric:\s*tabular-nums;?"/g, 'class="u-row-ok-num"'],
  [/style="padding:\s*9px\s+12px;?"/g, 'class="u-row-cell"'],

  /* ── Round-3: padding card variants (24/22 px) ───────────────────── */

  [/style="padding:\s*24px\s+28px;\s*margin-bottom:\s*26px;?"/g, 'class="u-pad-card-xl"'],
  [/style="padding:\s*24px\s+28px;\s*margin-bottom:\s*22px;?"/g, 'class="u-pad-card-xl-22"'],
  [/style="padding:\s*22px\s+24px;\s*border-radius:\s*14px;?"/g, 'class="u-pad-card-r14"'],

  /* ── Round-3: 13px text family ───────────────────────────────────── */

  [/style="font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*2px;?"/g, 'class="u-h-13-mb2"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*700;\s*color:\s*var\(--text\);\s*margin-top:\s*2px;?"/g, 'class="u-h-13-mt2"'],
  [/style="font-size:\s*13px;\s*font-weight:\s*700;\s*color:\s*var\(--text\);?"/g, 'class="u-h-13-bold"'],
  [/style="font-size:\s*13px;\s*font-style:\s*italic;\s*color:\s*var\(--text\);?"/g, 'class="u-italic-13"'],
  [/style="font-size:\s*13px;\s*color:\s*var\(--text-muted\);\s*margin-bottom:\s*28px;?"/g, 'class="u-meta-13-mb28"'],
  [/style="font-size:\s*13px;\s*color:\s*var\(--text-muted\);?"/g, 'class="u-meta-13"'],
  [/style="font-size:\s*13px;\s*color:\s*var\(--text\);\s*line-height:\s*1\.7;\s*font-style:\s*italic;?"/g, 'class="u-italic-13-lh"'],
  [/style="font-size:\s*13px;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*8px;?"/g, 'class="u-meta-13-faint"'],
  [/style="font-size:\s*13\.5px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*6px;?"/g, 'class="u-h-135-mb6"'],
  [/style="font-size:\s*13\.5px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);?"/g, 'class="u-h-135"'],
  [/style="font-size:\s*13\.5px;\s*font-weight:\s*700;\s*color:\s*var\(--text\);?"/g, 'class="u-h-135-bold"'],

  /* ── Round-3: 14px small variants ────────────────────────────────── */

  [/style="font-size:\s*14px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*2px;?"/g, 'class="u-h-14-mb2"'],
  [/style="font-size:\s*14px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*10px;?"/g, 'class="u-h-14-mb10"'],
  [/style="font-size:\s*14px;\s*font-weight:\s*700;\s*color:\s*var\(--accent\);\s*font-style:\s*italic;?"/g, 'class="u-h-14-italic-cyan"'],
  [/style="font-size:\s*14px;\s*font-weight:\s*600;\s*color:\s*var\(--text\);\s*line-height:\s*1\.7;\s*font-style:\s*italic;?"/g, 'class="u-italic-14-lh"'],
  [/style="font-size:\s*14px;\s*color:\s*var\(--text\);\s*line-height:\s*1\.8;\s*margin-bottom:\s*16px;?"/g, 'class="u-text-14-lh"'],

  /* ── Round-3: 15/16/18px display variants ────────────────────────── */

  [/style="font-size:\s*16px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*4px;?"/g, 'class="u-h-16-mb4"'],
  [/style="font-size:\s*15px;\s*font-weight:\s*900;\s*color:\s*var\(--accent\);?"/g, 'class="u-h-15-cyan"'],
  [/style="font-size:\s*18px;\s*font-weight:\s*900;\s*color:\s*var\(--text\);?"/g, 'class="u-h-18-text"'],
  [/style="font-size:\s*18px;\s*font-weight:\s*900;?"/g, 'class="u-h-18-bold"'],
  [/style="font-size:\s*18px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*6px;?"/g, 'class="u-h-18-mb6"'],
  [/style="font-size:\s*18px;?"/g, 'class="u-fz-18b"'],
  [/style="font-size:\s*20px;?"/g, 'class="u-fz-20b"'],
  [/style="font-size:\s*22px;\s*flex-shrink:\s*0;?"/g, 'class="u-icon-22"'],
  [/style="font-size:\s*20px;\s*flex-shrink:\s*0;?"/g, 'class="u-icon-20"'],
  [/style="font-size:\s*24px;\s*font-weight:\s*900;\s*color:\s*var\(--text\);\s*margin-bottom:\s*8px;?"/g, 'class="u-h-24"'],
  [/style="font-size:\s*48px;\s*font-weight:\s*900;\s*color:\s*var\(--text-faint\);\s*line-height:\s*1;?"/g, 'class="u-display-48"'],
  [/style="font-size:\s*64px;\s*margin-bottom:\s*16px;?"/g, 'class="u-display-64"'],

  /* ── Round-3: small misc patterns ────────────────────────────────── */

  [/style="text-align:\s*right;\s*margin-bottom:\s*24px;?"/g, 'class="u-text-end-mb6"'],
  [/style="text-align:\s*center;\s*padding:\s*20px\s+0;?"/g, 'class="u-tc-py5"'],
  [/style="margin-top:\s*28px;\s*margin-bottom:\s*14px;?"/g, 'class="u-mt7-mb35"'],
  [/style="margin-top:\s*24px;\s*margin-bottom:\s*8px;?"/g, 'class="u-mt6-mb2"'],
  [/style="margin-top:\s*20px;\s*gap:\s*16px;?"/g, 'class="u-mt5-gap4"'],
  [/style="margin-top:\s*12px;\s*display:\s*none;?"/g, 'class="u-mt3-hidden"'],
  [/style="margin-top:\s*24px;\s*padding:\s*0;\s*overflow:\s*hidden;?"/g, 'class="u-mt6-clip"'],
  [/style="margin-bottom:\s*16px;\s*border-color:\s*var\(--border-hover\);?"/g, 'class="u-mb4-bh"'],
  [/style="margin-bottom:\s*14px;\s*margin-top:\s*8px;?"/g, 'class="u-mb35-mt2"'],
  [/style="margin:\s*0\s+auto\s+16px;\s*display:\s*none;?"/g, 'class="u-mx-auto-mb4-hidden"'],
  [/style="padding:\s*0;\s*overflow:\s*hidden;\s*margin-bottom:\s*28px;?"/g, 'class="u-clip-mb7"'],
  [/style="padding:\s*0;\s*border-radius:\s*14px;\s*overflow:\s*hidden;?"/g, 'class="u-clip-r14"'],
  [/style="min-height:\s*280px;?"/g, 'class="u-min-h-280"'],
  [/style="max-width:\s*600px;?"/g, 'class="u-mw-600"'],
  [/style="position:\s*absolute;\s*width:\s*0;\s*height:\s*0;\s*overflow:\s*hidden"/g, 'class="u-sr-only-abs"'],
  [/style="font-size:\s*\.78rem;\s*color:\s*var\(--color-text-faint,rgba\(255,255,255,\.5\)\);?"/g, 'class="u-faint-78"'],

  /* ── Round-4: gradient icon tiles (36px square) — 6 colour pairs ─── */

  [/style="width:\s*36px;\s*height:\s*36px;\s*border-radius:\s*10px;\s*background:\s*linear-gradient\(135deg,\s*#F59E0B,\s*#EF4444\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;\s*font-size:\s*18px;?"/g, 'class="u-icon-tile-amber-red"'],
  [/style="width:\s*36px;\s*height:\s*36px;\s*border-radius:\s*10px;\s*background:\s*linear-gradient\(135deg,\s*#EF4444,\s*#7F1D1D\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;\s*font-size:\s*18px;?"/g, 'class="u-icon-tile-red-deep"'],
  [/style="width:\s*36px;\s*height:\s*36px;\s*border-radius:\s*10px;\s*background:\s*linear-gradient\(135deg,\s*#EC4899,\s*#F43F5E\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;\s*font-size:\s*18px;?"/g, 'class="u-icon-tile-pink"'],
  [/style="width:\s*36px;\s*height:\s*36px;\s*border-radius:\s*10px;\s*background:\s*linear-gradient\(135deg,\s*#8B5CF6,\s*#EC4899\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;\s*font-size:\s*18px;?"/g, 'class="u-icon-tile-violet-pink"'],
  [/style="width:\s*36px;\s*height:\s*36px;\s*border-radius:\s*10px;\s*background:\s*linear-gradient\(135deg,\s*#22C55E,\s*#10B981\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;\s*font-size:\s*18px;?"/g, 'class="u-icon-tile-green"'],
  [/style="width:\s*36px;\s*height:\s*36px;\s*border-radius:\s*10px;\s*background:\s*linear-gradient\(135deg,\s*#06B6D4,\s*#3B82F6\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;\s*font-size:\s*18px;?"/g, 'class="u-icon-tile-cyan-blue"'],

  /* ── Round-4: progress fills with solid colour (5 patterns) ──────── */

  [/style="width:\s*92%;\s*background:\s*#EF4444;?"/g, 'class="u-pf-92-red"'],
  [/style="width:\s*75%;\s*background:\s*#EAB308;?"/g, 'class="u-pf-75-yellow"'],
  [/style="width:\s*72%;\s*background:\s*linear-gradient\(90deg,#EAB308,#F97316\)"/g, 'class="u-pf-72-grad-yo"'],
  [/style="width:\s*61%;\s*background:\s*linear-gradient\(90deg,#EF4444,#EC4899\)"/g, 'class="u-pf-61-grad-rp"'],
  [/style="width:\s*35%;\s*background:\s*#22C55E;?"/g, 'class="u-pf-35-green"'],
  [/style="width:\s*30%;\s*background:\s*#A855F7;?"/g, 'class="u-pf-30-purple"'],
  [/style="width:\s*25%;\s*background:\s*#3B82F6;?"/g, 'class="u-pf-25-blue"'],
  [/style="width:\s*20%;\s*background:\s*#3B82F6;?"/g, 'class="u-pf-20-blue"'],
  [/style="width:\s*20%;\s*background:\s*#22C55E;?"/g, 'class="u-pf-20-green"'],
  [/style="width:\s*15%;\s*background:\s*#EAB308;?"/g, 'class="u-pf-15-yellow"'],
  [/style="width:\s*10%;\s*background:\s*#EF4444;?"/g, 'class="u-pf-10-red"'],

  /* ── Round-4: 0% gradient progress bars (4 templates) ────────────── */

  [/style="width:\s*0%;\s*background:\s*linear-gradient\(90deg,#F97316,#EAB308\);?"/g, 'class="u-pf-0-grad-oy"'],
  [/style="width:\s*0%;\s*background:\s*linear-gradient\(90deg,#EC4899,#8B5CF6\);?"/g, 'class="u-pf-0-grad-pv"'],
  [/style="width:\s*0%;\s*background:\s*linear-gradient\(90deg,#8B5CF6,#0EA5E9\);?"/g, 'class="u-pf-0-grad-vs"'],
  [/style="width:\s*0%;\s*background:\s*linear-gradient\(90deg,#22C55E,#0EA5E9\);?"/g, 'class="u-pf-0-grad-gs"'],

  /* ── Round-4: 10×10 colour swatches (3 colours) ──────────────────── */

  [/style="width:\s*10px;\s*height:\s*10px;\s*border-radius:\s*3px;\s*background:\s*var\(--accent\);\s*display:\s*inline-block;?"/g, 'class="u-swatch-cyan"'],
  [/style="width:\s*10px;\s*height:\s*10px;\s*border-radius:\s*3px;\s*background:\s*#EAB308;\s*display:\s*inline-block;?"/g, 'class="u-swatch-yellow"'],
  [/style="width:\s*10px;\s*height:\s*10px;\s*border-radius:\s*3px;\s*background:\s*#E4405F;\s*display:\s*inline-block;?"/g, 'class="u-swatch-pinkish"'],

  /* ── Round-4: 100% accent-color sliders (5 colours) ──────────────── */

  [/style="width:\s*100%;\s*margin-top:\s*8px;\s*accent-color:\s*#F97316;?"/g, 'class="u-slider-orange"'],
  [/style="width:\s*100%;\s*margin-top:\s*8px;\s*accent-color:\s*#EC4899;?"/g, 'class="u-slider-pink"'],
  [/style="width:\s*100%;\s*margin-top:\s*8px;\s*accent-color:\s*#8B5CF6;?"/g, 'class="u-slider-violet"'],
  [/style="width:\s*100%;\s*margin-top:\s*8px;\s*accent-color:\s*#66FCF1;?"/g, 'class="u-slider-cyan"'],
  [/style="width:\s*100%;\s*margin-top:\s*8px;\s*accent-color:\s*#22C55E;?"/g, 'class="u-slider-green"'],

  /* ── Round-4: tinted card patterns ────────────────────────────────── */

  // text-align:center; padding:20px 14px; surface-2 + tint border (4 colours)
  [/style="text-align:\s*center;\s*padding:\s*20px\s+14px;\s*background:\s*var\(--surface-2\);\s*border-radius:\s*var\(--radius-md\);\s*border:\s*1px\s+solid\s+rgba\(34,\s*197,\s*94,\s*0\.2\);?"/g, 'class="u-tile-tint-green"'],
  [/style="text-align:\s*center;\s*padding:\s*20px\s+14px;\s*background:\s*var\(--surface-2\);\s*border-radius:\s*var\(--radius-md\);\s*border:\s*1px\s+solid\s+rgba\(234,\s*179,\s*8,\s*0\.2\);?"/g, 'class="u-tile-tint-yellow"'],
  [/style="text-align:\s*center;\s*padding:\s*20px\s+14px;\s*background:\s*var\(--surface-2\);\s*border-radius:\s*var\(--radius-md\);\s*border:\s*1px\s+solid\s+rgba\(14,\s*165,\s*233,\s*0\.2\);?"/g, 'class="u-tile-tint-sky"'],
  [/style="text-align:\s*center;\s*padding:\s*20px\s+14px;\s*background:\s*var\(--surface-2\);\s*border-radius:\s*var\(--radius-md\);\s*border:\s*1px\s+solid\s+rgba\(139,\s*92,\s*246,\s*0\.2\);?"/g, 'class="u-tile-tint-violet"'],

  // padding:14px 8px tile + tint (5 colours)
  [/style="text-align:\s*center;\s*padding:\s*14px\s+8px;\s*background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+rgba\(239,\s*68,\s*68,\s*0\.15\);\s*border-radius:\s*var\(--radius-md\);\s*border-top:\s*3px\s+solid\s+#EF4444;?"/g, 'class="u-tile-top-red"'],
  [/style="text-align:\s*center;\s*padding:\s*14px\s+8px;\s*background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+rgba\(234,\s*179,\s*8,\s*0\.15\);\s*border-radius:\s*var\(--radius-md\);\s*border-top:\s*3px\s+solid\s+#EAB308;?"/g, 'class="u-tile-top-yellow"'],
  [/style="text-align:\s*center;\s*padding:\s*14px\s+8px;\s*background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+rgba\(14,\s*165,\s*233,\s*0\.15\);\s*border-radius:\s*var\(--radius-md\);\s*border-top:\s*3px\s+solid\s+#0EA5E9;?"/g, 'class="u-tile-top-sky"'],
  [/style="text-align:\s*center;\s*padding:\s*14px\s+8px;\s*background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+rgba\(139,\s*92,\s*246,\s*0\.15\);\s*border-radius:\s*var\(--radius-md\);\s*border-top:\s*3px\s+solid\s+#8B5CF6;?"/g, 'class="u-tile-top-violet"'],
  [/style="text-align:\s*center;\s*padding:\s*14px\s+8px;\s*background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+rgba\(102,\s*252,\s*241,\s*0\.15\);\s*border-radius:\s*var\(--radius-md\);\s*border-top:\s*3px\s+solid\s+var\(--accent\);?"/g, 'class="u-tile-top-cyan"'],

  // 18px padding + radius:14 + tint border + faint linear-grad bg (5 colours)
  [/style="padding:\s*18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(34,\s*197,\s*94,\s*0\.35\);\s*background:\s*linear-gradient\(135deg,\s*rgba\(34,\s*197,\s*94,\s*0\.06\),\s*transparent\);?"/g, 'class="u-card-tint-green"'],
  [/style="padding:\s*18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(245,\s*158,\s*11,\s*0\.35\);\s*background:\s*linear-gradient\(135deg,\s*rgba\(245,\s*158,\s*11,\s*0\.06\),\s*transparent\);?"/g, 'class="u-card-tint-amber"'],
  [/style="padding:\s*18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(236,\s*72,\s*153,\s*0\.35\);\s*background:\s*linear-gradient\(135deg,\s*rgba\(236,\s*72,\s*153,\s*0\.06\),\s*transparent\);\s*grid-column:\s*1\s*\/\s*-1;?"/g, 'class="u-card-tint-pink u-col-full"'],
  [/style="padding:\s*18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(139,\s*92,\s*246,\s*0\.35\);\s*background:\s*linear-gradient\(135deg,\s*rgba\(139,\s*92,\s*246,\s*0\.06\),\s*transparent\);?"/g, 'class="u-card-tint-violet"'],
  [/style="padding:\s*18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(102,\s*252,\s*241,\s*0\.35\);\s*background:\s*linear-gradient\(135deg,\s*rgba\(102,\s*252,\s*241,\s*0\.06\),\s*transparent\);?"/g, 'class="u-card-tint-cyan"'],

  // 18px dark card + tint border (4 colours)
  [/style="padding:\s*18px;\s*background:\s*rgba\(10,\s*13,\s*24,\s*0\.55\);\s*border:\s*1px\s+solid\s+rgba\(6,\s*182,\s*212,\s*0\.18\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-dark-card-cyan6"'],
  [/style="padding:\s*18px;\s*background:\s*rgba\(10,\s*13,\s*24,\s*0\.55\);\s*border:\s*1px\s+solid\s+rgba\(34,\s*197,\s*94,\s*0\.18\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-dark-card-green"'],
  [/style="padding:\s*18px;\s*background:\s*rgba\(10,\s*13,\s*24,\s*0\.55\);\s*border:\s*1px\s+solid\s+rgba\(245,\s*158,\s*11,\s*0\.18\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-dark-card-amber"'],
  [/style="padding:\s*18px;\s*background:\s*rgba\(10,\s*13,\s*24,\s*0\.55\);\s*border:\s*1px\s+solid\s+rgba\(139,\s*92,\s*246,\s*0\.18\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-dark-card-violet"'],

  // 16px padding + radius:14 + tint border (5 colours)
  [/style="padding:\s*16px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(34,\s*197,\s*94,\s*0\.3\);?"/g, 'class="u-frame-tint-green"'],
  [/style="padding:\s*16px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(245,\s*158,\s*11,\s*0\.3\);?"/g, 'class="u-frame-tint-amber"'],
  [/style="padding:\s*16px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(236,\s*72,\s*153,\s*0\.3\);?"/g, 'class="u-frame-tint-pink"'],
  [/style="padding:\s*16px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(139,\s*92,\s*246,\s*0\.3\);?"/g, 'class="u-frame-tint-violet"'],
  [/style="padding:\s*16px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(102,\s*252,\s*241,\s*0\.3\);?"/g, 'class="u-frame-tint-cyan"'],

  // 16px 18px padding + radius:14 + tint border (3 colours)
  [/style="padding:\s*16px\s+18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(34,\s*197,\s*94,\s*0\.3\);?"/g, 'class="u-frame-md-green"'],
  [/style="padding:\s*16px\s+18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(245,\s*158,\s*11,\s*0\.3\);\s*background:\s*rgba\(245,\s*158,\s*11,\s*0\.04\);?"/g, 'class="u-frame-md-amber-bg"'],
  [/style="padding:\s*16px\s+18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(239,\s*68,\s*68,\s*0\.3\);?"/g, 'class="u-frame-md-red"'],

  // 16px 18px dark card + tint border (3 colours)
  [/style="padding:\s*16px\s+18px;\s*background:\s*rgba\(10,\s*13,\s*24,\s*0\.5\);\s*border:\s*1px\s+solid\s+rgba\(34,\s*197,\s*94,\s*0\.18\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-dark-md-green"'],
  [/style="padding:\s*16px\s+18px;\s*background:\s*rgba\(10,\s*13,\s*24,\s*0\.5\);\s*border:\s*1px\s+solid\s+rgba\(139,\s*92,\s*246,\s*0\.15\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-dark-md-violet"'],
  [/style="padding:\s*16px\s+18px;\s*background:\s*rgba\(10,\s*13,\s*24,\s*0\.5\);\s*border:\s*1px\s+solid\s+rgba\(102,\s*252,\s*241,\s*0\.15\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-dark-md-cyan"'],

  // 14px 16px padding + radius:12 + tint border (5 colours)
  [/style="padding:\s*14px\s+16px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(34,\s*197,\s*94,\s*0\.25\);?"/g, 'class="u-frame-sm-green"'],
  [/style="padding:\s*14px\s+16px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(245,\s*158,\s*11,\s*0\.25\);?"/g, 'class="u-frame-sm-amber"'],
  [/style="padding:\s*14px\s+16px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(236,\s*72,\s*153,\s*0\.25\);?"/g, 'class="u-frame-sm-pink"'],
  [/style="padding:\s*14px\s+16px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(139,\s*92,\s*246,\s*0\.25\);?"/g, 'class="u-frame-sm-violet"'],
  [/style="padding:\s*14px\s+16px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(102,\s*252,\s*241,\s*0\.25\);?"/g, 'class="u-frame-sm-cyan"'],

  // 14px 16px alert tint card (3 colours)
  [/style="padding:\s*14px\s+16px;\s*background:\s*rgba\(245,\s*158,\s*11,\s*0\.06\);\s*border:\s*1px\s+solid\s+rgba\(245,\s*158,\s*11,\s*0\.2\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-alert-amber"'],
  [/style="padding:\s*14px\s+16px;\s*background:\s*rgba\(239,\s*68,\s*68,\s*0\.06\);\s*border:\s*1px\s+solid\s+rgba\(239,\s*68,\s*68,\s*0\.2\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-alert-red"'],
  [/style="padding:\s*14px\s+16px;\s*background:\s*rgba\(139,\s*92,\s*246,\s*0\.06\);\s*border:\s*1px\s+solid\s+rgba\(139,\s*92,\s*246,\s*0\.2\);\s*border-radius:\s*var\(--radius-md\);?"/g, 'class="u-alert-violet"'],

  // 10px 12px alert tint card (3 colours)
  [/style="padding:\s*10px\s+12px;\s*background:\s*rgba\(34,\s*197,\s*94,\s*0\.06\);\s*border-right:\s*3px\s+solid\s+#22C55E;\s*border-radius:\s*var\(--radius-sm\);?"/g, 'class="u-alert-sm-green"'],
  [/style="padding:\s*10px\s+12px;\s*background:\s*rgba\(239,\s*68,\s*68,\s*0\.06\);\s*border-right:\s*3px\s+solid\s+#EF4444;\s*border-radius:\s*var\(--radius-sm\);?"/g, 'class="u-alert-sm-red"'],
  [/style="padding:\s*10px\s+12px;\s*background:\s*rgba\(139,\s*92,\s*246,\s*0\.08\);\s*border:\s*1px\s+solid\s+rgba\(139,\s*92,\s*246,\s*0\.2\);\s*border-radius:\s*var\(--radius-sm\);?"/g, 'class="u-alert-sm-violet"'],

  /* ── Round-4: width 100% min-width variants ──────────────────────── */

  [/style="width:\s*100%;min-width:\s*700px;?"/g, 'class="u-w-full-min700"'],
  [/style="width:\s*100%;min-width:\s*600px;?"/g, 'class="u-w-full-min600"'],
  [/style="width:\s*100%;\s*border-collapse:\s*collapse;\s*font-size:\s*12px;\s*min-width:\s*540px;?"/g, 'class="u-table-12-min540"'],

  /* ── Round-4: small misc ──────────────────────────────────────────── */

  [/style="padding:\s*18px\s+22px;\s*border-radius:\s*14px;?"/g, 'class="u-pad-card-r14b"'],
  [/style="padding:\s*16px\s+22px;\s*border-bottom:\s*1px\s+solid\s+var\(--border\);\s*background:\s*var\(--surface-2\);?"/g, 'class="u-card-head-bare"'],
  [/style="padding:\s*14px;\s*border-radius:\s*14px;\s*position:\s*sticky;\s*top:\s*80px;?"/g, 'class="u-pad-sticky"'],
  [/style="padding:\s*12px\s+32px;\s*font-size:\s*14px;?"/g, 'class="u-pad-btn-lg"'],
  [/style="max-width:\s*600px;\s*margin:\s*0\s+auto;\s*text-align:\s*center;\s*padding:\s*40px\s+32px;?"/g, 'class="u-empty-state"'],
  [/style="margin-top:\s*18px;\s*padding:\s*18px\s+20px;\s*border-radius:\s*14px;?"/g, 'class="u-mt45-pad"'],
  [/style="position:\s*absolute;\s*top:\s*-3px;\s*width:\s*4px;\s*height:\s*16px;\s*border-radius:\s*2px;\s*background:\s*var\(--text\);\s*transition:\s*left\s+0\.6s\s+ease;?"/g, 'class="u-bar-marker"'],
  [/style="width:\s*42px;\s*height:\s*42px;\s*border-radius:\s*var\(--radius-md\);\s*background:\s*var\(--accent-dim\);\s*border:\s*1px\s+solid\s+var\(--border-hover\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;\s*flex-shrink:\s*0;?"/g, 'class="u-tile-42-cyan"'],

  // 200px progress track / 120px progress track
  [/style="width:\s*200px;\s*height:\s*4px;\s*background:\s*var\(--surface-3\);\s*border-radius:\s*99px;\s*overflow:\s*hidden;?"/g, 'class="u-track-200"'],
  [/style="width:\s*120px;\s*height:\s*6px;\s*background:\s*var\(--surface-3\);\s*border-radius:\s*99px;\s*overflow:\s*hidden;?"/g, 'class="u-track-120"'],

  // 100% gradient progress fills
  [/style="height:\s*100%;\s*border-radius:\s*99px;\s*transition:\s*width\s+0\.6s\s+ease;\s*background:\s*linear-gradient\(90deg,#EF4444,#EAB308,#22C55E\);?"/g, 'class="u-pf-grad-tri"'],
  [/style="height:\s*100%;\s*background:\s*linear-gradient\(90deg,var\(--accent\),#0EA5E9\);\s*border-radius:\s*99px;\s*transition:\s*width\s+0\.5s\s+ease;\s*width:\s*0%;?"/g, 'class="u-pf-grad-cs"'],
  [/style="height:\s*100%;\s*background:\s*linear-gradient\(90deg,\s*var\(--accent\),\s*#0EA5E9\);\s*border-radius:\s*99px;\s*animation:loadBar\s+2s\s+ease\s+forwards;?"/g, 'class="u-pf-grad-cs-anim"'],

  // height-pill / row track shells
  [/style="height:\s*16px;\s*border-radius:\s*99px;\s*overflow:\s*hidden;\s*display:\s*flex;\s*gap:\s*3px;\s*margin-bottom:\s*16px;?"/g, 'class="u-track-pill-16"'],
  [/style="height:\s*10px;\s*border-radius:\s*99px;\s*background:\s*var\(--surface-3\);\s*overflow:\s*hidden;\s*position:\s*relative;?"/g, 'class="u-track-pill-10"'],

  // gap+mb single
  [/style="gap:\s*20px;\s*margin-bottom:\s*24px;?"/g, 'class="u-gap5-mb6"'],

  // margin-bottom row + flex
  [/style="margin-bottom:\s*10px;\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*space-between;?"/g, 'class="u-mb25-row-spread"'],

  // inline-size:0%;width:0%
  [/style="inline-size:0%;width:0%"/g, 'class="u-pb-0pct"'],

  // padding 0 wrappers
  [/style="padding:\s*0;?"/g, 'class="u-p-0"'],

  /* ── Round-5: 10.5px super-tiny eyebrows (uppercase + colour matrix) ─ */

  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*8px;?"/g, 'class="u-tiny-eyebrow-faint"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*#F59E0B;?"/g, 'class="u-tiny-eyebrow-amber"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*#EF4444;?"/g, 'class="u-tiny-eyebrow-red"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*#EC4899;?"/g, 'class="u-tiny-eyebrow-pink"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*#8B5CF6;?"/g, 'class="u-tiny-eyebrow-violet"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*#22C55E;?"/g, 'class="u-tiny-eyebrow-green"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*#06B6D4;?"/g, 'class="u-tiny-eyebrow-cyan6"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*color:\s*var\(--accent\);\s*text-transform:\s*uppercase;?"/g, 'class="u-tiny-eyebrow-cyan-11"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*color:\s*#F59E0B;\s*text-transform:\s*uppercase;?"/g, 'class="u-tiny-eyebrow-amber-11"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*color:\s*#EC4899;\s*text-transform:\s*uppercase;?"/g, 'class="u-tiny-eyebrow-pink-11"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*color:\s*#8B5CF6;\s*text-transform:\s*uppercase;?"/g, 'class="u-tiny-eyebrow-violet-11"'],
  [/style="font-size:\s*10\.5px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.1px;\s*color:\s*#22C55E;\s*text-transform:\s*uppercase;?"/g, 'class="u-tiny-eyebrow-green-11"'],
  [/style="font-size:\s*10\.5px;\s*color:\s*var\(--text-faint\);\s*margin-top:\s*10px;\s*line-height:\s*1\.6;?"/g, 'class="u-tiny-faint-mt-10"'],

  /* ── Round-5: 10px coloured pills (5+ patterns) ──────────────────── */

  [/style="font-size:\s*10px;\s*background:\s*rgba\(34,\s*197,\s*94,\s*0\.12\);\s*color:\s*#22C55E;\s*border:\s*1px\s+solid\s+rgba\(34,\s*197,\s*94,\s*0\.2\);?"/g, 'class="u-pill-green"'],
  [/style="font-size:\s*10px;\s*background:\s*rgba\(249,\s*115,\s*22,\s*0\.12\);\s*color:\s*#F97316;\s*border:\s*1px\s+solid\s+rgba\(249,\s*115,\s*22,\s*0\.25\);?"/g, 'class="u-pill-orange"'],
  [/style="font-size:\s*10px;\s*background:\s*rgba\(239,\s*68,\s*68,\s*0\.1\);\s*color:\s*#EF4444;\s*border:\s*1px\s+solid\s+rgba\(239,\s*68,\s*68,\s*0\.2\);?"/g, 'class="u-pill-red"'],
  [/style="font-size:\s*10px;\s*background:\s*rgba\(236,\s*72,\s*153,\s*0\.12\);\s*color:\s*#EC4899;\s*border:\s*1px\s+solid\s+rgba\(236,\s*72,\s*153,\s*0\.25\);?"/g, 'class="u-pill-pink"'],
  [/style="font-size:\s*10px;\s*background:\s*rgba\(168,\s*85,\s*247,\s*0\.12\);\s*color:\s*#A855F7;\s*border:\s*1px\s+solid\s+rgba\(168,\s*85,\s*247,\s*0\.2\);?"/g, 'class="u-pill-purple-d"'],
  [/style="font-size:\s*10px;\s*background:\s*rgba\(139,\s*92,\s*246,\s*0\.12\);\s*color:\s*#8B5CF6;\s*border:\s*1px\s+solid\s+rgba\(139,\s*92,\s*246,\s*0\.25\);?"/g, 'class="u-pill-violet"'],

  // 10px micro-eyebrows
  [/style="font-size:\s*10px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--text-faint\);\s*margin-bottom:\s*8px;?"/g, 'class="u-micro-faint-8"'],
  [/style="font-size:\s*10px;\s*font-weight:\s*800;\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*2px;?"/g, 'class="u-micro-cyan-2"'],

  /* ── Round-5: 11px / 11.5px additional patterns ──────────────────── */

  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*6px;?"/g, 'class="u-h11-cyan-15-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*color:\s*#F59E0B;\s*margin-bottom:\s*6px;?"/g, 'class="u-h11-amber-15-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*6px;?"/g, 'class="u-h11-violet-15-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.5px;\s*color:\s*#22C55E;\s*margin-bottom:\s*6px;?"/g, 'class="u-h11-green-15-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*6px;?"/g, 'class="u-h11-cyan-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*margin-bottom:\s*4px;?"/g, 'class="u-h11-cyan-up-4"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*color:\s*#F59E0B;\s*margin-bottom:\s*4px;\s*letter-spacing:\s*1\.3px;\s*text-transform:\s*uppercase;?"/g, 'class="u-h11-amber-up-4"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*800;\s*color:\s*#8B5CF6;\s*margin-bottom:\s*6px;?"/g, 'class="u-h11-violet-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*700;\s*margin-right:\s*4px;?"/g, 'class="u-h11-mr1"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*700;\s*color:\s*var\(--text-muted\);\s*letter-spacing:\s*0\.5px;\s*margin-bottom:\s*12px;\s*text-transform:\s*uppercase;?"/g, 'class="u-h11-muted-12"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*700;\s*color:\s*var\(--text-muted\);\s*letter-spacing:\s*0\.5px;\s*display:\s*block;\s*margin-bottom:\s*6px;?"/g, 'class="u-h11-muted-block-6"'],
  [/style="font-size:\s*11px;\s*font-weight:\s*700;\s*color:\s*var\(--text-faint\);\s*letter-spacing:\s*1px;\s*text-transform:\s*uppercase;\s*margin-left:\s*4px;?"/g, 'class="u-h11-faint-up-ml1"'],
  [/style="font-size:\s*11px;\s*color:\s*var\(--text-faint\);\s*margin-top:\s*10px;\s*line-height:\s*1\.7;?"/g, 'class="u-h11-faint-meta"'],
  [/style="font-size:\s*11px;color:var\(--text-faint\);"/g, 'class="u-h11-faint"'],
  [/style="font-size:\s*11px;\s*color:var\(--text-faint\);?"/g, 'class="u-h11-faint"'],
  [/style="font-size:\s*11px;color:#EF4444;font-weight:800;margin-bottom:2px;"/g, 'class="u-h11-red-bold-2"'],
  [/style="font-size:\s*11px;color:#22C55E;font-weight:800;margin-bottom:2px;"/g, 'class="u-h11-green-bold-2"'],
  [/style="font-size:\s*11px;\s*padding:\s*5px\s+14px;?"/g, 'class="u-tag-pill-14"'],

  /* ── Round-5: 11.5px patterns ────────────────────────────────────── */

  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.95;\s*padding-inline-start:\s*22px;\s*margin:\s*0;?"/g, 'class="u-list-115"'],
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.95;\s*font-family:'Courier\s+New',monospace;\s*background:\s*var\(--surface-2\);\s*padding:\s*12px\s+14px;\s*border-radius:\s*8px;\s*border:\s*1px\s+dashed\s+var\(--border\);?"/g, 'class="u-code-115"'],
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.95;?"/g, 'class="u-meta-115-lh195"'],
  [/style="font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.85;\s*padding-inline-start:\s*22px;\s*margin:\s*0;?"/g, 'class="u-list-115-lh185"'],

  /* ── Round-5: 12px / 12.5px additional patterns ──────────────────── */

  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#EF4444;\s*margin-bottom:\s*10px;\s*letter-spacing:\s*0\.5px;?"/g, 'class="u-h12-red-mb10"'],
  [/style="font-size:\s*12px;\s*font-weight:\s*800;\s*color:\s*#22C55E;\s*margin-bottom:\s*10px;\s*letter-spacing:\s*0\.5px;?"/g, 'class="u-h12-green-mb10"'],
  [/style="font-size:\s*12px;color:var\(--text-muted\);margin-top:4px;"/g, 'class="u-meta-12-mt4"'],
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.95;\s*padding-inline-start:\s*22px;\s*margin:\s*0;?"/g, 'class="u-list-12"'],
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;\s*padding:\s*12px\s+14px;\s*background:\s*rgba\(102,\s*252,\s*241,\s*0\.05\);\s*border-radius:\s*10px;\s*border:\s*1px\s+solid\s+rgba\(102,\s*252,\s*241,\s*0\.15\);?"/g, 'class="u-meta-cyan-box"'],
  [/style="font-size:\s*12px;color:var\(--text\);line-height:\s*1\.8;?"/g, 'class="u-meta-12-lh18"'],
  [/style="font-size:\s*12px;\s*color:\s*var\(--text-faint\);\s*margin-top:\s*4px;?"/g, 'class="u-meta-12-faint-mt4"'],
  [/style="font-size:\s*12px;\s*color:\s*var\(--text\);?"/g, 'class="u-meta-12-text"'],

  [/style="font-size:\s*12\.5px;color:var\(--text-muted\);line-height:1\.8;padding:14px 16px;background:var\(--surface\);border:1px solid var\(--border\);border-radius:var\(--radius-md\);?"/g, 'class="u-meta-125-card"'],
  [/style="font-size:\s*12\.5px;color:var\(--text-muted\);line-height:1\.85;margin-bottom:12px;?"/g, 'class="u-meta-125-mb12"'],
  [/style="font-size:\s*12\.5px;color:var\(--text-muted\);line-height:1\.85;margin-bottom:10px;?"/g, 'class="u-meta-125-mb10"'],
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;\s*background:\s*var\(--surface-2\);\s*border:\s*1px\s+solid\s+var\(--border\);\s*border-radius:\s*var\(--radius-md\);\s*padding:\s*14px;?"/g, 'class="u-meta-125-card-2"'],
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.7;?"/g, 'class="u-meta-125-lh17"'],
  [/style="font-size:\s*12\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.65;?"/g, 'class="u-meta-125-lh165"'],

  /* ── Round-5: misc card-headers / margin-top patterns (single occurrences) ── */

  [/style="margin-top:\s*20px;\s*padding:\s*16px\s+18px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(102,\s*252,\s*241,\s*0\.2\);\s*background:\s*rgba\(102,\s*252,\s*241,\s*0\.04\);?"/g, 'class="u-mt5-frame-cyan"'],
  [/style="margin-top:\s*18px;padding:\s*16px\s+18px;background:\s*linear-gradient\(135deg,rgba\(102,252,241,0\.08\),rgba\(139,92,246,0\.06\)\);border:1px solid rgba\(102,252,241,0\.2\);border-radius:var\(--radius-md\);?"/g, 'class="u-mt45-grad-cyan-violet"'],
  [/style="margin-top:\s*16px;padding:\s*14px;border-radius:var\(--radius-md\);background:var\(--surface-2\);border:1px solid var\(--border\);text-align:center;font-size:13px;color:var\(--text-muted\);?"/g, 'class="u-mt4-empty-card"'],
  [/style="margin-top:\s*16px;\s*padding:\s*12px\s+14px;\s*background:\s*rgba\(102,\s*252,\s*241,\s*0\.05\);\s*border:\s*1px\s+solid\s+rgba\(102,\s*252,\s*241,\s*0\.18\);\s*border-radius:\s*8px;\s*font-size:\s*11\.5px;\s*color:\s*var\(--text-muted\);\s*line-height:\s*1\.75;?"/g, 'class="u-mt4-cyan-box"'],
  [/style="margin-top:\s*14px;\s*padding:\s*16px\s+18px;\s*border-radius:\s*14px;\s*border-color:\s*rgba\(245,\s*158,\s*11,\s*0\.3\);\s*background:\s*rgba\(245,\s*158,\s*11,\s*0\.04\);?"/g, 'class="u-mt35-frame-amber"'],
  [/style="margin-top:\s*14px;\s*padding:\s*16px\s+18px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(245,\s*158,\s*11,\s*0\.25\);\s*background:\s*rgba\(245,\s*158,\s*11,\s*0\.04\);?"/g, 'class="u-mt35-frame-amber-12"'],
  [/style="margin-top:\s*14px;\s*padding:\s*14px\s+16px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(139,\s*92,\s*246,\s*0\.25\);\s*background:\s*rgba\(139,\s*92,\s*246,\s*0\.04\);?"/g, 'class="u-mt35-frame-violet"'],
  [/style="margin-top:\s*14px;\s*padding:\s*14px\s+16px;\s*border-radius:\s*12px;\s*border-color:\s*rgba\(102,\s*252,\s*241,\s*0\.2\);\s*background:\s*rgba\(102,\s*252,\s*241,\s*0\.04\);?"/g, 'class="u-mt35-frame-cyan"'],
  [/style="margin-top:\s*10px;padding:\s*10px\s+12px;background:\s*rgba\(34,\s*197,\s*94,\s*0\.06\);border-right:\s*3px\s+solid\s+#22C55E;border-radius:\s*var\(--radius-sm\);font-size:\s*11\.5px;color:\s*var\(--text\);?"/g, 'class="u-mt25-alert-green"'],

  /* ── Round-5: card-head inline rows ──────────────────────────────── */

  [/style="padding:\s*16px\s+20px\s+12px;\s*border-bottom:\s*1px\s+solid\s+var\(--border\);\s*background:\s*var\(--surface-2\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*space-between;?"/g, 'class="u-card-head-spread"'],
  [/style="padding:\s*14px\s+20px\s+12px;border-bottom:\s*1px\s+solid\s+var\(--border\);background:\s*var\(--surface-2\);display:\s*flex;align-items:\s*center;justify-content:\s*space-between;?"/g, 'class="u-card-head-spread-sm"'],
  [/style="padding:\s*14px\s+20px\s+12px;border-bottom:\s*1px\s+solid\s+var\(--border\);background:\s*var\(--surface-2\);display:\s*flex;align-items:\s*center;gap:\s*12px;?"/g, 'class="u-card-head-row-12"'],
  [/style="padding:\s*18px\s+20px;background:\s*linear-gradient\(135deg,rgba\(245,158,11,0\.08\),rgba\(239,68,68,0\.06\)\);border:1px solid rgba\(245,158,11,0\.25\);border-radius:var\(--radius-md\);?"/g, 'class="u-card-grad-warm"'],
  [/style="padding:\s*12px\s+14px;background:\s*linear-gradient\(135deg,rgba\(245,158,11,0\.08\),rgba\(239,68,68,0\.05\)\);border:1px solid rgba\(245,158,11,0\.22\);border-radius:var\(--radius-sm\);?"/g, 'class="u-card-grad-warm-sm"'],

  /* ── Round-5: gradient icon tiles 46-48 px (2 colour pairs) ──────── */

  [/style="width:\s*46px;height:\s*46px;border-radius:\s*var\(--radius-md\);background:\s*linear-gradient\(135deg,rgba\(34,197,94,0\.18\),rgba\(14,165,233,0\.12\)\);border:\s*1px\s+solid\s+rgba\(34,197,94,0\.25\);display:\s*flex;align-items:\s*center;justify-content:\s*center;flex-shrink:\s*0;font-size:\s*22px;?"/g, 'class="u-icon-tile-46-green"'],
  [/style="width:\s*46px;height:\s*46px;border-radius:\s*var\(--radius-md\);background:\s*linear-gradient\(135deg,rgba\(236,72,153,0\.18\),rgba\(139,92,246,0\.12\)\);border:\s*1px\s+solid\s+rgba\(236,72,153,0\.25\);display:\s*flex;align-items:\s*center;justify-content:\s*center;flex-shrink:\s*0;font-size:\s*22px;?"/g, 'class="u-icon-tile-46-pink"'],
  [/style="width:\s*48px;height:\s*48px;border-radius:\s*var\(--radius-md\);background:\s*linear-gradient\(135deg,rgba\(239,68,68,0\.15\),rgba\(59,130,246,0\.15\)\);border:\s*1px\s+solid\s+var\(--border-hover\);display:\s*flex;align-items:\s*center;justify-content:\s*center;flex-shrink:\s*0;?"/g, 'class="u-icon-tile-48-red-blue"'],

  /* ── Round-5: th-eyebrow with width ──────────────────────────────── */

  [/style="width:\s*20%;text-align:\s*right;font-size:\s*11px;font-weight:\s*700;color:\s*var\(--text-faint\);text-transform:\s*uppercase;letter-spacing:\s*0\.8px;?"/g, 'class="u-th-eyebrow-w20"'],
  [/style="width:\s*18%;text-align:\s*right;font-size:\s*11px;font-weight:\s*700;color:\s*var\(--text-faint\);text-transform:\s*uppercase;letter-spacing:\s*0\.8px;?"/g, 'class="u-th-eyebrow-w18"'],

  /* ── Round-5: flex bars ──────────────────────────────────────────── */

  [/style="flex-basis:\s*100%;?"/g, 'class="u-fb-100"'],
  [/style="flex:\s*7;\s*background:\s*var\(--accent\);\s*opacity:\s*0\.7;\s*border-radius:\s*6px\s+0\s+0\s+6px;?"/g, 'class="u-flex-7-cyan"'],
  [/style="flex:\s*2;\s*background:\s*#EAB308;\s*opacity:\s*0\.7;?"/g, 'class="u-flex-2-yellow"'],
  [/style="flex:\s*1;\s*background:\s*#E4405F;\s*opacity:\s*0\.7;\s*border-radius:\s*0\s+6px\s+6px\s+0;?"/g, 'class="u-flex-1-pinkish"'],

  /* ── Round-5: hidden + display:none variants ─────────────────────── */

  [/style="display:none;margin-top:20px;padding:16px;border-radius:var\(--radius-md\);border:1px solid var\(--border-hover\);background:var\(--accent-dim\);text-align:center;?"/g, 'class="u-result-card-hidden"'],
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
