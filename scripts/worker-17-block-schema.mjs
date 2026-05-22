#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════
// Worker 17 / Phase 1 — Block Schema & Metadata Audit (Pack v2 RESONANCE)
// ═══════════════════════════════════════════════════════════════════════
// Adds 4-5 data-* attributes to every educational block in
// platform/index.html:
//   - data-block-id         (page-prefix + 3-digit sequential, e.g. cc-001)
//   - data-block-type       (lesson | drill | case | reference | quiz | calc | scenario | cheat)
//   - data-difficulty       (1..5, Bloom-aligned)
//   - data-est-minutes      (gentle integer estimate)
//   - data-prereq           (high-difficulty blocks only — first ~30)
//
// Safety contract:
//   - Idempotent: re-running does NOT duplicate attributes.
//   - Only ADDS attributes. Never modifies text content. Never reorders.
//   - Skips dashboard / gateway pages (no pedagogical blocks there).
//   - qcalc roots get "calc" type. Existing data-calc preserved.
//   - data-page-personality, data-life, data-aura, data-tactile etc. preserved.
// ═══════════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(__dirname, '..', 'platform/index.html');

// ────────────────────────────────────────────────────────────────────────
// Page → 2-letter prefix (block-id namespace)
// dashboard + gateway = no pedagogical blocks; not augmented.
// ────────────────────────────────────────────────────────────────────────
const PAGE_PREFIX = {
  'page-callcenter':   'cc',
  'page-fieldsales':   'fs',
  'page-accountmgr':   'am',
  'page-social':       'so',
  'page-lab':          'lb',
  'page-psych':        'ps',
  'page-eq':           'eq',
  'page-negotiation':  'ng',
  'page-customercare': 'cu',
  'page-programming':  'pg',
  'page-accounting':   'ac',
  'page-phonerepair':  'pr',
  'page-hrmastery':    'hr',
  'page-myprogress':   'mp',
};

// ────────────────────────────────────────────────────────────────────────
// Block-class allowlist — curated for Phase 1.
//   Entry shape: cssClass: [type, difficulty, estMinutes]
// Tuned to land in 400-550 block band (sanity probe target).
// ────────────────────────────────────────────────────────────────────────
const RULES = {
  // Interactive calculators (8 root instances across 7 pages)
  'qcalc':              ['calc',      3, 8],

  // Cheat / reference
  'cc-cheat':           ['cheat',     1, 4],

  // Callcenter
  'vp-block':           ['lesson',    2, 7],
  'arch-card':          ['case',      3, 8],
  'skill-card':         ['lesson',    2, 6],
  'kpi-card':           ['lesson',    2, 6],
  'anat-tmpl':          ['drill',     3, 8],

  // Fieldsales
  'objection-item':     ['drill',     3, 8],
  'obj-card':           ['drill',     3, 8],
  'sf-modal-block':     ['drill',     3, 8],

  // Accountmgr
  'rp-card':            ['lesson',    2, 6],
  'hf-card':            ['lesson',    2, 6],
  'lab-card':           ['drill',     3, 10],

  // Social
  'hook-card':          ['lesson',    2, 5],
  'crisis-phase':       ['case',      3, 10],
  'psych-pt-platform':  ['lesson',    2, 5],

  // Shared (lab / eq / customercare / negotiation)
  'call-card':          ['lesson',    2, 6],

  // Psych / EQ / Programming / Accounting / Negotiation / Customercare
  'psych-info-block':   ['lesson',    2, 5],
  'psych-acc-item':     ['case',      3, 8],

  // Programming
  'prog-fund-card':     ['lesson',    2, 8],
  'prog-clean-card':    ['lesson',    2, 8],
  'prog-git-card':      ['reference', 1, 5],
  'prog-w05':           ['drill',     3, 10],

  // Phonerepair
  'pr-repair-card':     ['case',      3, 12],
  'pr-tool-card':       ['reference', 1, 4],
  'pr-card':            ['lesson',    2, 6],
  'pr-sw-card':         ['lesson',    2, 7],
  'pr-ms-card':         ['case',      4, 15],
  'pr-cs-card':         ['case',      3, 10],
  'pr-ethics-card':     ['case',      4, 10],
  'pr-elec-card':       ['lesson',    2, 7],

  // HR Mastery
  'hrm-q-block':        ['drill',     3, 8],
  'hrm-trap-card':      ['drill',     4, 10],
  'hrm-redflag-card':   ['reference', 2, 4],
};

// Selector priority order (first match wins).
// qcalc must be first so calc-type wins over generic card classes
// when both happen to coexist (defensive).
const RULE_ORDER = Object.keys(RULES);

// Maximum total data-prereq attributes added in Phase 1
// (Phase 5 will systematically complete them).
const MAX_PREREQS = 30;

// ────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────
function pad3(n) {
  return String(n).padStart(3, '0');
}

// Match an opening tag of: div/article/section/aside/details with a class attribute.
// Captures the full tag, attrs-before-class, class value, attrs-after-class.
const TAG_RE = /<(div|article|section|aside|details)\b([^>]*?)\bclass="([^"]+)"([^>]*?)>/g;

// Match a top-level page section opener; sections do NOT nest at this level.
const PAGE_RE = /<section class="page" id="(page-[a-z]+)"[^>]*>/g;

// ────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────
function main() {
  const original = readFileSync(FILE, 'utf-8');
  let html = original;

  // 1) Find page section start offsets (sorted by offset).
  const pageStarts = [];
  for (const m of html.matchAll(PAGE_RE)) {
    pageStarts.push({ name: m[1], start: m.index, headLen: m[0].length });
  }
  pageStarts.sort((a, b) => a.start - b.start);

  // Compute per-page slice end = next-page-start (or length of html).
  const slices = pageStarts.map((p, i) => {
    const end = i + 1 < pageStarts.length ? pageStarts[i + 1].start : html.length;
    return { ...p, end };
  });

  // 2) Walk slices in order, augmenting tag opens.
  // We mutate the html string by rebuilding it from slice rewrites.
  const stats = {};
  const tagged = []; // for prereq pass: { id, page, diff, idx-in-page, type }
  let cursor = 0;
  const out = [];

  for (const s of slices) {
    // 2a. Append untouched chunk before this slice (skipped on first iteration if cursor === s.start).
    if (cursor < s.start) {
      out.push(html.slice(cursor, s.start));
    }
    const sliceText = html.slice(s.start, s.end);
    const prefix = PAGE_PREFIX[s.name];
    if (!prefix) {
      // dashboard / gateway / unknown — pass through untouched.
      out.push(sliceText);
      cursor = s.end;
      continue;
    }
    let counter = 0;
    let typeBreakdown = { lesson: 0, drill: 0, case: 0, reference: 0, quiz: 0, calc: 0, scenario: 0, cheat: 0 };
    let totalMinutes = 0;
    let diffSum = 0;

    // Rewrite tag opens within this slice.
    const rewritten = sliceText.replace(TAG_RE, (full, tag, attrsBefore, classes, attrsAfter) => {
      // Idempotency guard.
      if (full.includes('data-block-id=')) return full;

      // Find first matching block class.
      const classList = classes.split(/\s+/);
      const hit = RULE_ORDER.find(c => classList.includes(c));
      if (!hit) return full;

      const [type, diff, mins] = RULES[hit];
      counter++;
      const id = `${prefix}-${pad3(counter)}`;
      typeBreakdown[type]++;
      totalMinutes += mins;
      diffSum += diff;

      tagged.push({ id, page: s.name, diff, type, indexInPage: counter });

      const newAttrs =
        ` data-block-id="${id}"` +
        ` data-block-type="${type}"` +
        ` data-difficulty="${diff}"` +
        ` data-est-minutes="${mins}"`;

      // Place the new attrs immediately after the class="..." attribute,
      // preserving everything before (attrsBefore) and after (attrsAfter).
      // attrsBefore already ends with the boundary char (usually a space) so
      // we don't add another one before class= (avoids a double-space artefact).
      return `<${tag}${attrsBefore}class="${classes}"${newAttrs}${attrsAfter}>`;
    });

    stats[s.name] = {
      blocks: counter,
      types: typeBreakdown,
      avgDifficulty: counter ? +(diffSum / counter).toFixed(2) : 0,
      totalMinutes,
    };
    out.push(rewritten);
    cursor = s.end;
  }
  // Append any remaining tail (closing </main></body></html>)
  if (cursor < html.length) out.push(html.slice(cursor));

  let nextHtml = out.join('');

  // 3) Prereq pass — only for diff >= 4 blocks, capped at MAX_PREREQS.
  // Each high-diff block gets prereq = first diff<=3 block on the SAME page that
  // appears earlier than it. If none exists, leave block alone.
  let prereqsAdded = 0;
  // group tagged by page
  const byPage = {};
  for (const t of tagged) {
    (byPage[t.page] ||= []).push(t);
  }
  for (const page of Object.keys(byPage)) {
    const pageBlocks = byPage[page];
    let firstLowOnPage = pageBlocks.find(b => b.diff <= 3);
    if (!firstLowOnPage) continue;
    for (const b of pageBlocks) {
      if (prereqsAdded >= MAX_PREREQS) break;
      if (b.diff < 4) continue;
      if (b.id === firstLowOnPage.id) continue;
      // Only add prereq if firstLowOnPage appears BEFORE b in DOM order.
      // (We can rely on indexInPage which equals DOM order within page.)
      if (firstLowOnPage.indexInPage >= b.indexInPage) continue;

      // Find the data-block-id="<id>" attribute and add data-prereq just after it.
      const needle = ` data-block-id="${b.id}"`;
      const idx = nextHtml.indexOf(needle);
      if (idx < 0) continue;
      // Idempotency: skip if data-prereq already on same tag (within next ~200 chars).
      const lookAhead = nextHtml.slice(idx, idx + 240);
      if (lookAhead.includes('data-prereq=')) continue;
      const insertAt = idx + needle.length;
      const prereqAttr = ` data-prereq="${firstLowOnPage.id}"`;
      nextHtml = nextHtml.slice(0, insertAt) + prereqAttr + nextHtml.slice(insertAt);
      prereqsAdded++;
    }
    if (prereqsAdded >= MAX_PREREQS) break;
  }

  // 4) Write file (only if changed).
  if (nextHtml !== original) {
    writeFileSync(FILE, nextHtml, 'utf-8');
  }

  // 5) Report.
  const total = Object.values(stats).reduce((s, p) => s + p.blocks, 0);
  const allMinutes = Object.values(stats).reduce((s, p) => s + p.totalMinutes, 0);
  const allDiffSum = Object.values(stats).reduce((s, p) => s + p.avgDifficulty * p.blocks, 0);
  const overallAvg = total ? +(allDiffSum / total).toFixed(2) : 0;

  console.log('Worker 17 / Phase 1 — Block Schema augment report');
  console.log('═'.repeat(60));
  console.log('page'.padEnd(22) + 'blocks'.padStart(7) + 'avg⭐'.padStart(8) + '~min'.padStart(8));
  console.log('─'.repeat(60));
  for (const name of Object.keys(PAGE_PREFIX)) {
    const s = stats[name] || { blocks: 0, avgDifficulty: 0, totalMinutes: 0, types: {} };
    console.log(
      name.padEnd(22) +
      String(s.blocks).padStart(7) +
      String(s.avgDifficulty || '-').padStart(8) +
      String(s.totalMinutes).padStart(8)
    );
  }
  console.log('─'.repeat(60));
  console.log(`TOTAL`.padEnd(22) + String(total).padStart(7) + String(overallAvg).padStart(8) + String(allMinutes).padStart(8));
  console.log();

  // Type aggregate
  const typeAgg = { lesson: 0, drill: 0, case: 0, reference: 0, quiz: 0, calc: 0, scenario: 0, cheat: 0 };
  for (const s of Object.values(stats)) {
    for (const [t, n] of Object.entries(s.types || {})) typeAgg[t] += n;
  }
  console.log('Type distribution:');
  for (const [t, n] of Object.entries(typeAgg)) console.log(`  ${t.padEnd(10)} ${String(n).padStart(4)}`);
  console.log();
  console.log(`Prereq attributes added: ${prereqsAdded} (cap ${MAX_PREREQS}; Phase 5 will complete)`);
  console.log(`File ${nextHtml === original ? 'UNCHANGED' : 'WRITTEN'}: ${FILE}`);
}

main();
