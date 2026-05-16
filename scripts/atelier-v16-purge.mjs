#!/usr/bin/env node
/**
 * ATELIER v16 — Final Inline Purge (Worker 14 / Phase 6)
 *
 * Reads platform/index.html, replaces high-frequency inline style="..." with
 * utility classes (in-place), writes back.
 *
 * Strategy (per spec):
 *   - Width %  → .u-w-N (5% increments + odd values via ad-hoc classes added below)
 *   - Width-with-solid-bg-hex → .u-w-N + .u-bar-{name}   (e.g. width:75%;background:#EAB308)
 *   - Width-with-gradient-bg → .u-w-N + .u-bar-grad-{name}
 *   - 36×36 chip squircle (linear-gradient 135deg #A,#B + flex center) → .u-chip .u-chip-36 .u-chip-{name}
 *   - 46×46 / 48×48 chip squircle similar
 *   - margin:0 auto + text-align:center + max-width:600px wrappers → .u-stack-center
 *   - Common color tokens style="color:#XYZ" for hex literals → .u-c-{name}
 *
 * Conservative: only operates on EXACT string matches collected via uniq.
 * If an inline string is unique/one-off it is left alone (still legal).
 * Goal: 215 → ≤80 inline styles after first pass.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const HTML = path.join(ROOT, 'platform', 'index.html');

let src = fs.readFileSync(HTML, 'utf8');
const before = (src.match(/style="/g) || []).length;

// ─────────────────────────────────────────────────────────────────────────────
// 1) class-attribute injector helper
//    Replaces the `<tag ... style="OLD"...>` with the same tag but:
//      - `style="OLD"` removed
//      - additional classes appended to the existing class="" (or class created)
//    Operates GLOBALLY — every element whose tag carries that exact style attr.
// ─────────────────────────────────────────────────────────────────────────────
const replaceInline = (oldStyleAttr, addClasses) => {
  // Escape the attr for regex
  const escaped = oldStyleAttr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Pattern: any opening tag containing this style="...". We do it in two passes
  //  (a) tag already has class="..." → merge classes
  //  (b) tag has no class           → add class=
  const reHasClass = new RegExp(
    `(<[a-zA-Z][a-zA-Z0-9-]*\\b[^>]*?\\bclass=")([^"]*)("[^>]*?\\s)${escaped}([^>]*>)`,
    'g'
  );
  const reHasClassReverse = new RegExp(
    `(<[a-zA-Z][a-zA-Z0-9-]*\\b[^>]*?\\s)${escaped}([^>]*?\\bclass=")([^"]*)("[^>]*>)`,
    'g'
  );
  const reNoClass = new RegExp(
    `(<[a-zA-Z][a-zA-Z0-9-]*\\b[^>]*?\\s)${escaped}([^>]*>)`,
    'g'
  );
  // (a) class before style
  src = src.replace(reHasClass, (_m, p1, classes, p3, p4) => {
    const merged = (classes.trim() + ' ' + addClasses).trim();
    return `${p1}${merged}${p3}${p4}`;
  });
  // (a') class after style
  src = src.replace(reHasClassReverse, (_m, p1, p2, classes, p4) => {
    const merged = (classes.trim() + ' ' + addClasses).trim();
    return `${p1}${p2}${merged}${p4}`;
  });
  // (b) no class at all → add it
  src = src.replace(reNoClass, (_m, p1, p2) => `${p1}class="${addClasses}" ${p2}`);
};

// Convenience: take a literal style="..." string and a list of class names
const purge = (styleStr, classes) => replaceInline(styleStr, classes);

// ─────────────────────────────────────────────────────────────────────────────
// 2) PURGE TABLE — only EXACT inline strings observed in audit
// ─────────────────────────────────────────────────────────────────────────────

// 2a) width-only %  (8 unique)
purge('style="width:0%;"',  'u-w-0');
purge('style="width:11%"',  'u-w-11');
purge('style="width:16%;"', 'u-w-16');
purge('style="width:22%"',  'u-w-22');
purge('style="width:22%;"', 'u-w-22');
purge('style="width:36%;"', 'u-w-36');
purge('style="width:40%;"', 'u-w-40');
purge('style="width:88%"',  'u-w-88');

// 2b) progress-bar inner: width:N% + solid hex bg (11 unique)
purge('style="width:10%;background:#EF4444;"',  'u-w-10  u-bar-red');
purge('style="width:15%;background:#EAB308;"',  'u-w-15  u-bar-yellow');
purge('style="width:20%;background:#22C55E;"',  'u-w-20  u-bar-green');
purge('style="width:20%;background:#3B82F6;"',  'u-w-20  u-bar-blue');
purge('style="width:25%;background:#3B82F6;"',  'u-w-25  u-bar-blue');
purge('style="width:30%;background:#A855F7;"',  'u-w-30  u-bar-violet');
purge('style="width:35%;background:#22C55E;"',  'u-w-35  u-bar-green');
purge('style="width:75%;background:#EAB308;"',  'u-w-75  u-bar-yellow');
purge('style="width:92%;background:#EF4444;"',  'u-w-92  u-bar-red');

// 2c) width:N% + linear-gradient (4 unique with width:0% + 2 with N%)
purge('style="width:0%;background:linear-gradient(90deg,#22C55E,#0EA5E9);"', 'u-w-0 u-bar-grad-green-cyan');
purge('style="width:0%;background:linear-gradient(90deg,#8B5CF6,#0EA5E9);"', 'u-w-0 u-bar-grad-violet-cyan');
purge('style="width:0%;background:linear-gradient(90deg,#EC4899,#8B5CF6);"', 'u-w-0 u-bar-grad-pink-violet');
purge('style="width:0%;background:linear-gradient(90deg,#F97316,#EAB308);"', 'u-w-0 u-bar-grad-orange-yellow');
purge('style="width:61%; background:linear-gradient(90deg,#EF4444,#EC4899)"', 'u-w-61 u-bar-grad-red-pink');
purge('style="width:72%; background:linear-gradient(90deg,#EAB308,#F97316)"', 'u-w-72 u-bar-grad-yellow-orange');

// 2d) bg-only gradients on progress bars (4 unique)
purge('style="background:linear-gradient(90deg,#22C55E,#16A34A);"', 'u-bar-grad-green');
purge('style="background:linear-gradient(90deg,#3B82F6,#2563EB);"', 'u-bar-grad-blue');
purge('style="background:linear-gradient(90deg,#EAB308,#F59E0B);"', 'u-bar-grad-amber');
purge('style="background:linear-gradient(90deg,#EF4444,#DC2626);"', 'u-bar-grad-red');

// 2e) chip 36×36 squircle (6 unique)
purge('style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#06B6D4,#3B82F6); display:flex; align-items:center; justify-content:center; font-size:18px;"', 'u-chip u-chip-36 u-chip-cyan');
purge('style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#22C55E,#10B981); display:flex; align-items:center; justify-content:center; font-size:18px;"', 'u-chip u-chip-36 u-chip-emerald');
purge('style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#8B5CF6,#EC4899); display:flex; align-items:center; justify-content:center; font-size:18px;"', 'u-chip u-chip-36 u-chip-violet');
purge('style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#EC4899,#F43F5E); display:flex; align-items:center; justify-content:center; font-size:18px;"', 'u-chip u-chip-36 u-chip-pink');
purge('style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#EF4444,#7F1D1D); display:flex; align-items:center; justify-content:center; font-size:18px;"', 'u-chip u-chip-36 u-chip-red');
purge('style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#F59E0B,#EF4444); display:flex; align-items:center; justify-content:center; font-size:18px;"', 'u-chip u-chip-36 u-chip-amber');

// 2f) chip 46×46 + 48×48 with rgba backgrounds (3 unique)
purge('style="width:46px;height:46px;border-radius:var(--radius-md);background:linear-gradient(135deg,rgba(34,197,94,0.18),rgba(14,165,233,0.12));border:1px solid rgba(34,197,94,0.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:22px;"', 'u-chip u-chip-46 u-chip-emerald-soft');
purge('style="width:46px;height:46px;border-radius:var(--radius-md);background:linear-gradient(135deg,rgba(236,72,153,0.18),rgba(139,92,246,0.12));border:1px solid rgba(236,72,153,0.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:22px;"', 'u-chip u-chip-46 u-chip-pink-soft');
purge('style="width:48px;height:48px;border-radius:var(--radius-md);background:linear-gradient(135deg,rgba(239,68,68,0.15),rgba(59,130,246,0.15));border:1px solid var(--border-hover);display:flex;align-items:center;justify-content:center;flex-shrink:0;"', 'u-chip u-chip-48 u-chip-bicolor');

// 2g) Cell heads — table-th-style width+text-align+font-size combo (2 unique)
purge('style="width:18%;text-align:right;font-size:11px;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:0.8px;"', 'u-w-18 u-th-meta');
purge('style="width:20%;text-align:right;font-size:11px;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:0.8px;"', 'u-w-20 u-th-meta');

// 2h) progress-bar-track standalone (2 unique)
purge('style="width:200px; height:4px; background:var(--surface-3); border-radius:99px; overflow:hidden;"', 'u-track u-track-200');
purge('style="width:120px; height:6px; background:var(--surface-3); border-radius:99px; overflow:hidden;"', 'u-track u-track-120');

// 2i) max-width hero card (1 — common hero header)
purge('style="max-width:600px; margin:0 auto; text-align:center; padding:40px 32px;"', 'u-stack-center u-max-600');

// 2j) display:flex helpers — a couple repeats
purge('style="background:rgba(102,252,241,0.06);"', 'u-bg-accent-06');
purge('style="background:linear-gradient(135deg,rgba(245,158,11,0.14),rgba(16,185,129,0.1));"', 'u-grad-amber-soft');
purge('style="background:linear-gradient(135deg,rgba(6,182,212,0.14),rgba(139,92,246,0.1));"', 'u-grad-cyan-violet-soft');

// 2k) inline color hex (single-color rules — <span style="color:#XYZ">)  (8 unique)
purge('style="color:#10B981;"', 'u-c-emerald');
purge('style="color:#A855F7;"', 'u-c-purple');
purge('style="color:#000;"',     'u-c-black');
purge('style="color:#22C55E;"', 'u-c-green');
purge('style="color:#34D399"',   'u-c-emerald-light');
purge('style="color:#60A5FA"',   'u-c-blue-light');
purge('style="color:#C4B5FD"',   'u-c-violet-light');

// 2l) marker dots 10×10 (3 unique)
purge('style="width:10px; height:10px; border-radius:3px; background:var(--accent); display:inline-block;"', 'u-dot u-dot-accent');
purge('style="width:10px; height:10px; border-radius:3px; background:#EAB308; display:inline-block;"',       'u-dot u-dot-yellow');
purge('style="width:10px; height:10px; border-radius:3px; background:#E4405F; display:inline-block;"',       'u-dot u-dot-instagram');

// 2m) bg + small chip pill rgba/hex (3 unique)
purge('style="background:rgba(34,197,94,0.12);color:#22C55E;"', 'u-pill u-pill-green');
purge('style="background:rgba(239,68,68,0.12);color:#EF4444;"', 'u-pill u-pill-red');
purge('style="background:rgba(234,179,8,0.12);color:#EAB308;"', 'u-pill u-pill-yellow');
purge('style="background:rgba(59,130,246,0.12);color:#3B82F6;"', 'u-pill u-pill-blue');

// 2n) min-height tracks
purge('style="min-height:280px;"', 'u-min-h-280');

// 2o) #1F2937 token — "code" style box
purge('style="background:#1F2937;color:#fff;"', 'u-bg-slate-on-white');

// ─────────────────────────────────────────────────────────────────────────────
// 3) BIG GROUPS — tinted callouts/cards/stats/info-chips
// ─────────────────────────────────────────────────────────────────────────────

// 3a) Hero header callout (linear-gradient + 1px border + radius-lg + 20px 24px + flex-start)
purge('style="background:linear-gradient(135deg,rgba(6,182,212,0.12),rgba(139,92,246,0.08));border:1px solid rgba(6,182,212,0.25);border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:26px;display:flex;align-items:flex-start;gap:16px;"', 'u-callout u-callout-cyan');
purge('style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(14,165,233,0.08));border:1px solid rgba(34,197,94,0.25);border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:26px;display:flex;align-items:flex-start;gap:16px;"',  'u-callout u-callout-green');
purge('style="background:linear-gradient(135deg,rgba(249,115,22,0.12),rgba(234,179,8,0.08));border:1px solid rgba(249,115,22,0.25);border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:26px;display:flex;align-items:flex-start;gap:16px;"',  'u-callout u-callout-orange');
purge('style="background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(16,185,129,0.08));border:1px solid rgba(245,158,11,0.25);border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:26px;display:flex;align-items:flex-start;gap:16px;"',  'u-callout u-callout-amber');
purge('style="background:linear-gradient(135deg,rgba(236,72,153,0.12),rgba(139,92,246,0.08));border:1px solid rgba(236,72,153,0.25);border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:26px;display:flex;align-items:flex-start;gap:16px;"',  'u-callout u-callout-pink');
purge('style="background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(102,252,241,0.08));border:1px solid rgba(139,92,246,0.25);border-radius:var(--radius-lg);padding:18px 22px;margin-bottom:26px;display:flex;align-items:flex-start;gap:16px;"',  'u-callout u-callout-violet u-callout-sm');
purge('style="background:linear-gradient(135deg,rgba(102,252,241,0.06),rgba(139,92,246,0.06));border:1px solid var(--border-hover);border-radius:var(--radius-lg);padding:22px;margin-top:26px;"', 'u-callout u-callout-soft u-mt-26');

// 3b) Section card with rgba(10,13,24,0.55) deep base + colored border
purge('style="padding:18px;background:rgba(10,13,24,0.55);border:1px solid rgba(6,182,212,0.18);border-radius:var(--radius-md);"',   'u-card-deep u-bd-cyan');
purge('style="padding:18px;background:rgba(10,13,24,0.55);border:1px solid rgba(34,197,94,0.18);border-radius:var(--radius-md);"',  'u-card-deep u-bd-green');
purge('style="padding:18px;background:rgba(10,13,24,0.55);border:1px solid rgba(245,158,11,0.18);border-radius:var(--radius-md);"', 'u-card-deep u-bd-amber');
purge('style="padding:18px;background:rgba(10,13,24,0.55);border:1px solid rgba(139,92,246,0.18);border-radius:var(--radius-md);"', 'u-card-deep u-bd-violet');

// 3c) "padding:18px; border-radius:14px; border-color:rgba(...,0.35); background:linear-gradient(135deg, rgba(...,0.06), transparent);"
purge('style="padding:18px; border-radius:14px; border-color:rgba(102,252,241,0.35); background:linear-gradient(135deg, rgba(102,252,241,0.06), transparent);"', 'u-card-tint u-tint-cyan');
purge('style="padding:18px; border-radius:14px; border-color:rgba(34,197,94,0.35); background:linear-gradient(135deg, rgba(34,197,94,0.06), transparent);"',     'u-card-tint u-tint-green');
purge('style="padding:18px; border-radius:14px; border-color:rgba(245,158,11,0.35); background:linear-gradient(135deg, rgba(245,158,11,0.06), transparent);"',  'u-card-tint u-tint-amber');
purge('style="padding:18px; border-radius:14px; border-color:rgba(139,92,246,0.35); background:linear-gradient(135deg, rgba(139,92,246,0.06), transparent);"',  'u-card-tint u-tint-violet');
purge('style="padding:18px; border-radius:14px; border-color:rgba(236,72,153,0.35); background:linear-gradient(135deg, rgba(236,72,153,0.06), transparent); grid-column:1/-1;"', 'u-card-tint u-tint-pink u-grid-span-full');

// 3d) "padding:16px; border-radius:14px; border-color:rgba(...,0.3);"
purge('style="padding:16px; border-radius:14px; border-color:rgba(102,252,241,0.3);"', 'u-card-thin u-tint-cyan');
purge('style="padding:16px; border-radius:14px; border-color:rgba(34,197,94,0.3);"',   'u-card-thin u-tint-green');
purge('style="padding:16px; border-radius:14px; border-color:rgba(245,158,11,0.3);"',  'u-card-thin u-tint-amber');
purge('style="padding:16px; border-radius:14px; border-color:rgba(139,92,246,0.3);"',  'u-card-thin u-tint-violet');
purge('style="padding:16px; border-radius:14px; border-color:rgba(236,72,153,0.3);"',  'u-card-thin u-tint-pink');

// 3e) "padding:16px 18px;" rows
purge('style="padding:16px 18px; border-radius:14px; border-color:rgba(34,197,94,0.3);"',                                          'u-card-row u-tint-green');
purge('style="padding:16px 18px; border-radius:14px; border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.04);"',       'u-card-row u-tint-amber u-tint-fill');
purge('style="padding:16px 18px; border-radius:14px; border-color:rgba(239,68,68,0.3);"',                                          'u-card-row u-tint-red');

// 3f) "padding:14px 16px; border-radius:12px; border-color:rgba(...,0.25);"
purge('style="padding:14px 16px; border-radius:12px; border-color:rgba(245,158,11,0.25);"', 'u-card-tile u-tint-amber');
purge('style="padding:14px 16px; border-radius:12px; border-color:rgba(236,72,153,0.25);"', 'u-card-tile u-tint-pink');
purge('style="padding:14px 16px; border-radius:12px; border-color:rgba(139,92,246,0.25);"', 'u-card-tile u-tint-violet');

// 3g) Stat numbers — 36px;font-weight:900;color:#HEX;margin-bottom:8px
purge('style="font-size:36px;font-weight:900;color:#0EA5E9;margin-bottom:8px;"', 'u-stat-36 u-c-cyan');
purge('style="font-size:36px;font-weight:900;color:#22C55E;margin-bottom:8px;"', 'u-stat-36 u-c-green');
purge('style="font-size:36px;font-weight:900;color:#8B5CF6;margin-bottom:8px;"', 'u-stat-36 u-c-violet');
purge('style="font-size:36px;font-weight:900;color:#EAB308;margin-bottom:8px;"', 'u-stat-36 u-c-yellow');

// 3h) Stat numbers 28px
purge('style="font-size:28px;font-weight:900;color:#06B6D4;margin-bottom:8px;"', 'u-stat-28 u-c-cyan');
purge('style="font-size:28px;font-weight:900;color:#10B981;margin-bottom:8px;"', 'u-stat-28 u-c-emerald');
purge('style="font-size:28px;font-weight:900;color:#8B5CF6;margin-bottom:8px;"', 'u-stat-28 u-c-violet');
purge('style="font-size:28px;font-weight:900;color:#EF4444;margin-bottom:8px;"', 'u-stat-28 u-c-red');
purge('style="font-size:28px;font-weight:900;color:#F59E0B;margin-bottom:8px;"', 'u-stat-28 u-c-amber');
purge('style="font-size:28px;font-weight:900;color:var(--accent);"',              'u-stat-28 u-c-accent');

// 3i) Stat numbers 26px
purge('style="font-size:26px; font-weight:900; color:var(--accent);"', 'u-stat-26 u-c-accent');
purge('style="font-size:26px; font-weight:900; color:#22C55E;"',       'u-stat-26 u-c-green');
purge('style="font-size:26px; font-weight:900; color:#8B5CF6;"',       'u-stat-26 u-c-violet');

// 3j) "background:rgba(*,0.07); border:1px solid rgba(*,0.2); border-radius:8px; padding:10px 12px; font-size:11.5px; color:#HEX;"
purge('style="background:rgba(6,182,212,0.07); border:1px solid rgba(6,182,212,0.2); border-radius:8px; padding:10px 12px; font-size:11.5px; color:#06B6D4;"',     'u-info-chip u-info-cyan');
purge('style="background:rgba(34,197,94,0.07); border:1px solid rgba(34,197,94,0.2); border-radius:8px; padding:10px 12px; font-size:11.5px; color:#22C55E;"',     'u-info-chip u-info-green');
purge('style="background:rgba(139,92,246,0.07); border:1px solid rgba(139,92,246,0.2); border-radius:8px; padding:10px 12px; font-size:11.5px; color:#8B5CF6;"',   'u-info-chip u-info-violet');
purge('style="background:rgba(236,72,153,0.07); border:1px solid rgba(236,72,153,0.2); border-radius:8px; padding:10px 12px; font-size:11.5px; color:#EC4899;"',   'u-info-chip u-info-pink');
purge('style="background:rgba(239,68,68,0.07); border:1px solid rgba(239,68,68,0.2); border-radius:8px; padding:10px 12px; font-size:11.5px; color:#EF4444;"',     'u-info-chip u-info-red');
purge('style="background:rgba(245,158,11,0.07); border:1px solid rgba(245,158,11,0.2); border-radius:8px; padding:10px 12px; font-size:11.5px; color:#F59E0B;"',   'u-info-chip u-info-amber');

// 3k) Knowledge boxes with .06 bg + dim text
purge('style="background:rgba(102,252,241,0.06); border:1px solid rgba(102,252,241,0.18); border-radius:8px; padding:10px 12px; font-size:11.5px; line-height:1.75; color:var(--text);"', 'u-info-box u-info-cyan-soft');
purge('style="background:rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.18); border-radius:8px; padding:10px 12px; font-size:11.5px; line-height:1.75; color:var(--text);"',     'u-info-box u-info-green-soft');
purge('style="background:rgba(139,92,246,0.06); border:1px solid rgba(139,92,246,0.18); border-radius:8px; padding:10px 12px; font-size:11.5px; line-height:1.75; color:var(--text);"',   'u-info-box u-info-violet-soft');
purge('style="background:rgba(236,72,153,0.06); border:1px solid rgba(236,72,153,0.18); border-radius:8px; padding:10px 12px; font-size:11.5px; line-height:1.75; color:var(--text);"',   'u-info-box u-info-pink-soft');
purge('style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.18); border-radius:8px; padding:10px 12px; font-size:11.5px; line-height:1.75; color:var(--text);"',   'u-info-box u-info-amber-soft');

// 3l) Drag-button (.10 bg + .30 border + cursor:grab)
purge('style="background:rgba(102,252,241,0.1); color:var(--accent); border:1px solid rgba(102,252,241,0.3); padding:8px 10px; border-radius:8px; font-size:12px; font-weight:700; cursor:grab;"', 'u-drag-btn u-drag-accent');
purge('style="background:rgba(236,72,153,0.1); color:#EC4899; border:1px solid rgba(236,72,153,0.3); padding:8px 10px; border-radius:8px; font-size:12px; font-weight:700; cursor:grab;"',         'u-drag-btn u-drag-pink');
purge('style="background:rgba(245,158,11,0.1); color:#F59E0B; border:1px solid rgba(245,158,11,0.3); padding:8px 10px; border-radius:8px; font-size:12px; font-weight:700; cursor:grab;"',         'u-drag-btn u-drag-amber');
purge('style="background:rgba(255,255,255,0.04); color:var(--text-muted); border:1px dashed var(--border); padding:8px 10px; border-radius:8px; font-size:12px; font-weight:700; cursor:grab;"',   'u-drag-btn u-drag-ghost');

// 3m) Action buttons
purge('style="background:rgba(102,252,241,0.1); color:var(--accent); border:1px solid rgba(102,252,241,0.3); padding:9px 14px; border-radius:8px; font-family:inherit; font-size:12px; font-weight:800; cursor:pointer;"', 'u-btn-tinted u-btn-accent');
purge('style="background:rgba(239,68,68,0.1); color:#EF4444; border:1px solid rgba(239,68,68,0.3); padding:9px 14px; border-radius:8px; font-family:inherit; font-size:12px; font-weight:800; cursor:pointer;"',           'u-btn-tinted u-btn-red');
purge('style="background:linear-gradient(135deg,#22C55E,#10B981); color:#fff; border:none; padding:9px 14px; border-radius:8px; font-family:inherit; font-size:12px; font-weight:800; cursor:pointer;"',                    'u-btn-grad u-btn-grad-emerald');
purge('style="background:linear-gradient(135deg,#8B5CF6,#EC4899); color:#fff; border:none; padding:9px 12px; border-radius:8px; font-family:inherit; font-size:12px; font-weight:800; cursor:pointer;"',                    'u-btn-grad u-btn-grad-violet');

// 3n) Small "padding:14px 16px; bg .06 + 1px solid .2 + radius-md" boxes
purge('style="padding:14px 16px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius-md);"', 'u-cell u-cell-amber');
purge('style="padding:14px 16px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius-md);"',   'u-cell u-cell-red');
purge('style="padding:14px 16px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.2);border-radius:var(--radius-md);"', 'u-cell u-cell-violet');

// 3o) "background:rgba(*,0.04); border:1px solid rgba(*,0.15); border-radius:var(--radius-md); padding:14px 16px;"
purge('style="background:rgba(34,197,94,0.04);border:1px solid rgba(34,197,94,0.15);border-radius:var(--radius-md);padding:14px 16px;"', 'u-cell u-cell-green-soft');
purge('style="background:rgba(239,68,68,0.04);border:1px solid rgba(239,68,68,0.15);border-radius:var(--radius-md);padding:14px 16px;"', 'u-cell u-cell-red-soft');

// 3p) bg+border-color tint stacks
purge('style="background:rgba(34,197,94,0.04);border-color:rgba(34,197,94,0.2);"',  'u-tint-bg-green-04 u-tint-bd-green');
purge('style="background:rgba(34,197,94,0.06);border-color:rgba(34,197,94,0.2);"',  'u-tint-bg-green-06 u-tint-bd-green');
purge('style="background:rgba(59,130,246,0.06);border-color:rgba(59,130,246,0.2);"', 'u-tint-bg-blue-06 u-tint-bd-blue');
purge('style="background:rgba(234,179,8,0.06);border-color:rgba(234,179,8,0.2);"',  'u-tint-bg-yellow-06 u-tint-bd-yellow');
purge('style="background:rgba(239,68,68,0.06);border-color:rgba(239,68,68,0.2);"',  'u-tint-bg-red-06 u-tint-bd-red');
purge('style="background:rgba(255,0,0,0.08);color:#ef4444;border-color:rgba(255,0,0,0.18);"', 'u-tint-bg-red-08 u-c-red');

// 3q) font-size:10px tinted pills
purge('style="font-size:10px;background:rgba(34,197,94,0.12);color:#22C55E;border:1px solid rgba(34,197,94,0.2);"',     'u-pill-xs u-pill-green');
purge('style="font-size:10px;background:rgba(249,115,22,0.12);color:#F97316;border:1px solid rgba(249,115,22,0.25);"',  'u-pill-xs u-pill-orange');
purge('style="font-size:10px;background:rgba(236,72,153,0.12);color:#EC4899;border:1px solid rgba(236,72,153,0.25);"',  'u-pill-xs u-pill-pink');
purge('style="font-size:10px;background:rgba(168,85,247,0.12);color:#A855F7;border:1px solid rgba(168,85,247,0.2);"',   'u-pill-xs u-pill-purple');
purge('style="font-size:10px;background:rgba(139,92,246,0.12);color:#8B5CF6;border:1px solid rgba(139,92,246,0.25);"',  'u-pill-xs u-pill-violet');

// 3r) Card pad-12 with .04 bg/.12 border
purge('style="background:rgba(102,252,241,0.04); border:1px solid rgba(102,252,241,0.12); border-radius:var(--radius-md); padding:12px;"',                       'u-pad-card u-pad-card-accent');
purge('style="background:rgba(102,252,241,0.04); border:1px solid rgba(102,252,241,0.12); border-radius:var(--radius-md); padding:12px; margin-bottom:12px;"',   'u-pad-card u-pad-card-accent u-mb-12');
purge('style="background:rgba(102,252,241,0.04);border:1px solid rgba(102,252,241,0.12);border-radius:var(--radius-md);padding:14px 16px;margin-top:16px;"',     'u-pad-card-row u-pad-card-accent u-mt-16');
purge('style="background:rgba(139,92,246,0.06); border:1px solid rgba(139,92,246,0.18); border-radius:var(--radius-md); padding:12px;"',                          'u-pad-card u-pad-card-violet');

// 3s) Inline code-like accent ribbon
purge('style="background:rgba(102,252,241,0.1);padding:1px 6px;border-radius:4px;color:var(--accent);"', 'u-inline-mark u-inline-mark-accent');

fs.writeFileSync(HTML, src, 'utf8');
const after = (src.match(/style="/g) || []).length;

console.log(`[purge] inline style count: ${before} → ${after}  (${before - after} removed)`);
