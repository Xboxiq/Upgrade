#!/usr/bin/env node
/* eslint-disable no-console */
// ─────────────────────────────────────────────────────────────────────────────
// Worker 17 — CONTENT REVIVAL — Phase 1: Block Schema & Metadata Audit
// ─────────────────────────────────────────────────────────────────────────────
// Purpose: AUGMENT every educational block in platform/index.html with
//          • data-block-id        (page-prefix + 3-digit ordinal)
//          • data-block-type      (lesson/drill/case/reference/quiz/calc/scenario/cheat)
//          • data-difficulty      (1..5, Bloom-aligned)
//          • data-est-minutes     (rough reading/practice minutes)
//          • data-prereq          (subset only — high-difficulty seeds; Phase 5 finishes)
//
// Discipline:
//   - Idempotent: rerun never doubles attributes.
//   - Pure metadata: NO text edits, NO DOM reorder, NO deletions.
//   - Skips elements already carrying data-block-id.
//   - Honors W15 (data-page-personality), W16 (data-life, data-aura) — they are
//     untouched. Block schema attributes are *additive only*.
//
// Run:
//   node scripts/worker-17-block-schema.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'platform/index.html';

// ── Page prefix lookup (14 educational pages; dashboard excluded — it has zero
//    pedagogical blocks, only stat-tiles).
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

// ── Block-class → type map (curated from real markup probe, May 2026).
//    Classes not in this map are NOT considered top-level blocks.
const TYPE_BY_CLASS = {
  // ── lesson (conceptual exposition) ─────────────────────────────────────
  'psych-info-block':       'lesson',
  'v12-disc-info-block':    'lesson',
  'v12-disc-card':          'lesson',
  'v12-disc-section':       'lesson',
  'skill-detail-section':   'lesson',
  'skill-card':             'lesson',
  'vp-block':               'lesson',
  'anat-step':              'lesson',
  'spin-detail-block':      'lesson',
  'sf-modal-block':         'lesson',
  'pitch-block':            'lesson',
  'cycle-stage':            'lesson',
  'kam-stage':              'lesson',
  'acc-cs-stage':           'lesson',
  'w6-sub-item':            'lesson',
  'w6-pillar-card':         'lesson',
  'w6-attn-card':           'lesson',
  'w09-section':            'lesson',
  'w09f-section':           'lesson',
  'w09t-section':           'lesson',
  'w09e-section':           'lesson',
  'pr-section':             'lesson',
  'pr-card':                'lesson',
  'pr-elec-card':           'lesson',
  'pr-sw-card':             'lesson',
  'pr-ethics-card':         'lesson',
  'prog-fund-card':         'lesson',
  'prog-clean-card':        'lesson',
  'prog-soft-card':         'lesson',
  'hrm-q-block':            'lesson',
  'hrm-pre-card':           'lesson',
  'hrm-dim-card':           'lesson',
  'kpi-card':               'lesson',
  'arch-card':              'lesson',
  'hook-card':              'lesson',
  'w6-funnel-card':         'lesson',

  // ── drill (apply / practice) ───────────────────────────────────────────
  'dq-item':                'drill',
  'objection-item':         'drill',
  'obj-card':               'drill',
  'obj-section':            'drill',
  'hrm-q-item':             'drill',
  'hrm-cmp-row':            'drill',
  'hrm-star-row':           'drill',
  'pr-repair-card':         'drill',
  'pr-tool-card':           'drill',
  'pr-ms-card':             'drill',
  'pr-career-step':         'drill',
  'step-item':              'drill',
  'ist-row':                'drill',
  'w09e-ruler-step':        'drill',
  'v12-power-row':          'drill',
  'w09-bias-row':           'drill',
  'psych-acc-item':         'drill',

  // ── case (analyze / real-world example) ────────────────────────────────
  'call-card':              'case',
  'sm-cell-tip':            'case',
  'pr-cs-card':             'case',
  'cs-item':                'case',
  'prog-iraq-card':         'case',
  'acc-pos-card':           'case',
  'psych-principle-card':   'case',
  'hs-row':                 'case',
  'hrm-neg-card':           'case',
  'hrm-redflag-card':       'case',
  'hrm-trap-card':          'case',

  // ── reference (lookup / warning / tip) ─────────────────────────────────
  'psych-warning-block':    'reference',
  'hrm-law-card':           'reference',
  'kpi-note':               'reference',
  'pr-tip':                 'reference',
  'w09e-tip':               'reference',
  'sm-note':                'reference',
  'acc-tax-bracket-note':   'reference',
  'rp-card':                'reference',
  'hf-card':                'reference',
  'qbr-card':               'reference',
  'lab-card':               'reference',
  'cl-card':                'reference',

  // ── cheat (compressed summary) ─────────────────────────────────────────
  'prog-cheat-card':        'cheat',
  'pr-cheat-card':          'cheat',
  'hrm-cheat-card':         'cheat',
  'acc-cheat-card':         'cheat',

  // ── myprogress dashboard cards ─────────────────────────────────────────
  'cath-dash-card':         'reference',
};

// ── Difficulty defaults per type (Bloom-aligned).
const DIFFICULTY_BY_TYPE = {
  lesson:    2,
  drill:     3,
  case:      4,
  reference: 1,
  cheat:     1,
  calc:      3,
  quiz:      4,
  scenario:  3,
};

// ── Minute estimates (generous; over-estimating is kinder than under-).
const MINUTES_BY_TYPE = {
  lesson:    6,
  drill:     8,
  case:      12,
  reference: 4,
  cheat:     5,
  calc:      8,
  quiz:      10,
  scenario:  8,
};

// ── Per-class overrides for difficulty/minutes when the default doesn't fit.
const DIFFICULTY_OVERRIDES = {
  'skill-detail-section':   3,
  'spin-detail-block':      3,
  'sf-modal-block':         3,
  'kam-stage':              3,
  'acc-cs-stage':           3,
  'cycle-stage':            3,
  'arch-card':              3,
  'pr-repair-card':         4,
  'pr-ms-card':             5,
  'hrm-trap-card':          4,
  'hrm-redflag-card':       4,
  'hrm-neg-card':           5,
  'hrm-law-card':           2,
  'prog-cheat-card':        1,
  'pr-cheat-card':          1,
  'hrm-cheat-card':         1,
  'cath-dash-card':         1,
};

const MINUTES_OVERRIDES = {
  'skill-detail-section':   12,
  'spin-detail-block':      10,
  'sf-modal-block':         8,
  'kam-stage':              10,
  'acc-cs-stage':           10,
  'cycle-stage':            10,
  'arch-card':              8,
  'pr-repair-card':         15,
  'pr-ms-card':             18,
  'pr-cs-card':             10,
  'hrm-trap-card':          7,
  'hrm-redflag-card':       6,
  'hrm-neg-card':           14,
  'prog-cheat-card':        6,
  'cath-dash-card':         3,
};

const ALLOWED_TAGS = ['div', 'article', 'section', 'aside', 'figure', 'form', 'details'];

// ─────────────────────────────────────────────────────────────────────────────
// Augment logic
// ─────────────────────────────────────────────────────────────────────────────

function augmentPage(html, pageId, prefix, perPageStats) {
  const sectionStart = new RegExp(
    `(<section[^>]*\\sid="${pageId}"[^>]*>)`
  );
  const startMatch = html.match(sectionStart);
  if (!startMatch) {
    perPageStats[pageId] = { prefix, count: 0, missing: true };
    return html;
  }
  const startIdx = startMatch.index + startMatch[0].length;

  // Find end: next page-X section or </main> or <footer>
  const tail = html.slice(startIdx);
  const endRe = /(<section[^>]*\sid="page-[a-z]+"[^>]*>|<footer\b|<\/main>)/;
  const endMatch = tail.match(endRe);
  const endIdx = startIdx + (endMatch ? endMatch.index : tail.length);

  let pageContent = html.slice(startIdx, endIdx);

  let counter = 0;

  // Match every opening tag that has a class attribute, in source order.
  const tagRe = new RegExp(
    `<(${ALLOWED_TAGS.join('|')})\\b([^>]*?)\\sclass="([^"]+)"([^>]*)>`,
    'g'
  );

  pageContent = pageContent.replace(tagRe, (full, tag, pre, classAttr, post) => {
    // Idempotent: skip if already augmented.
    if (full.includes('data-block-id=')) return full;

    const tokens = classAttr.split(/\s+/).filter(Boolean);
    let matchedClass = null;
    for (const tok of tokens) {
      if (TYPE_BY_CLASS[tok]) { matchedClass = tok; break; }
    }
    if (!matchedClass) return full;

    counter++;
    const id = `${prefix}-${String(counter).padStart(3, '0')}`;
    const type = TYPE_BY_CLASS[matchedClass];
    const diff = DIFFICULTY_OVERRIDES[matchedClass] ?? DIFFICULTY_BY_TYPE[type];
    const mins = MINUTES_OVERRIDES[matchedClass] ?? MINUTES_BY_TYPE[type];

    const augmented =
      `<${tag}${pre} class="${classAttr}"${post}` +
      ` data-block-id="${id}"` +
      ` data-block-type="${type}"` +
      ` data-difficulty="${diff}"` +
      ` data-est-minutes="${mins}"` +
      `>`;
    return augmented;
  });

  perPageStats[pageId] = { prefix, count: counter, missing: false };

  return html.slice(0, startIdx) + pageContent + html.slice(endIdx);
}

// ─────────────────────────────────────────────────────────────────────────────
// Prereq seeds (Phase 1 partial — Phase 5 finishes systematically).
// Each entry: blockId → comma-separated prereq ids in same page.
// Anchored on case/cheat blocks that logically depend on an earlier lesson.
// ─────────────────────────────────────────────────────────────────────────────
const PREREQ_SEEDS = {
  // page-callcenter — Voice Profile / archetypes depend on early skill blocks
  'cc-005': 'cc-001',
  'cc-010': 'cc-001,cc-002',
  'cc-015': 'cc-001,cc-003',
  'cc-020': 'cc-002,cc-005',

  // page-eq — RULER + bias rows depend on Goleman foundations
  'eq-005': 'eq-001',
  'eq-010': 'eq-001,eq-003',
  'eq-015': 'eq-001,eq-005',

  // page-psych — biases / DISC depend on first drives lessons
  'ps-010': 'ps-001,ps-002',
  'ps-020': 'ps-001,ps-005',
  'ps-040': 'ps-005,ps-010',

  // page-negotiation — Calculator + power rows depend on principles
  'ng-005': 'ng-001',
  'ng-010': 'ng-001,ng-003',

  // page-accounting — IFRS / tax bracket depend on equation + T-Account
  'ac-005': 'ac-001',
  'ac-010': 'ac-001,ac-003',
  'ac-015': 'ac-001,ac-005',
  'ac-020': 'ac-005,ac-010',

  // page-fieldsales — closing / objections depend on discovery
  'fs-010': 'fs-001,fs-003',
  'fs-020': 'fs-001,fs-005',
  'fs-030': 'fs-005,fs-010',

  // page-programming — clean code / soft skills depend on fundamentals
  'pg-010': 'pg-001,pg-003',
  'pg-020': 'pg-001,pg-005',
  'pg-030': 'pg-010,pg-020',

  // page-phonerepair — repair cards depend on mainboard anatomy
  'pr-010': 'pr-001,pr-003',
  'pr-020': 'pr-005,pr-010',
  'pr-030': 'pr-010,pr-020',

  // page-hrmastery — traps / negotiation depend on STAR + 15 questions
  'hr-010': 'hr-001,hr-003',
  'hr-020': 'hr-005,hr-010',
  'hr-030': 'hr-010,hr-020',

  // page-customercare — case bridges depend on info blocks
  'cu-005': 'cu-001',
  'cu-010': 'cu-001,cu-003',
};

function injectPrereqs(html) {
  let injected = 0;
  for (const [id, prereq] of Object.entries(PREREQ_SEEDS)) {
    const re = new RegExp(
      `(data-block-id="${id}"(?:[^>]*?))(>)`
    );
    html = html.replace(re, (full, body, close) => {
      if (full.includes('data-prereq=')) return full;
      injected++;
      return `${body} data-prereq="${prereq}"${close}`;
    });
  }
  return { html, injected };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

function main() {
  let html = readFileSync(FILE, 'utf-8');
  const before = html.length;
  const perPageStats = {};

  for (const [pageId, prefix] of Object.entries(PAGE_PREFIX)) {
    html = augmentPage(html, pageId, prefix, perPageStats);
  }

  const { html: htmlWithPrereqs, injected: prereqInjected } = injectPrereqs(html);
  html = htmlWithPrereqs;

  writeFileSync(FILE, html);

  // Report
  let total = 0;
  console.log('━'.repeat(70));
  console.log('Worker 17 / Phase 1 — Block Schema Augment');
  console.log('━'.repeat(70));
  console.log('Page                    Prefix   Blocks  Status');
  console.log('─'.repeat(70));
  for (const [pageId, s] of Object.entries(perPageStats)) {
    total += s.count;
    const status = s.missing ? '✗ MISSING' : '✓';
    console.log(
      `${pageId.padEnd(24)} ${s.prefix.padEnd(8)} ${String(s.count).padStart(6)}  ${status}`
    );
  }
  console.log('─'.repeat(70));
  console.log(`Total blocks tagged:    ${total}`);
  console.log(`Prereqs seeded:         ${prereqInjected} (Phase 5 will complete)`);
  console.log(`File size delta:        +${html.length - before} bytes`);
  console.log('━'.repeat(70));
}

main();
