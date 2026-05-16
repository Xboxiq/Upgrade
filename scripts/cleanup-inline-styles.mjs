#!/usr/bin/env node
/* Cathedral v14 — inline style → utility class cleanup (Worker 11 / Phase 7)
 * Conservative: only touches style="..." with a single safe declaration.
 * Run: node scripts/cleanup-inline-styles.mjs
 */
import fs from 'node:fs';

const file = 'platform/index.html';
const before = fs.readFileSync(file, 'utf8');

// Map: regex-of-single-decl-style → replacement class snippet
const SINGLE_REPLACERS = [
  // text alignment
  [/style="text-align:\s*center;?"/g,        'class="u-text-center"'],
  [/style="text-align:\s*end;?"/g,           'class="u-text-end"'],
  [/style="text-align:\s*right;?"/g,         'class="u-text-end"'],
  [/style="text-align:\s*start;?"/g,         'class="u-text-start"'],

  // font-weight
  [/style="font-weight:\s*700;?"/g,          'class="u-font-bold"'],
  [/style="font-weight:\s*800;?"/g,          'class="u-font-black"'],
  [/style="font-weight:\s*600;?"/g,          'class="u-font-semibold"'],
  [/style="font-weight:\s*500;?"/g,          'class="u-font-medium"'],

  // display
  [/style="display:\s*flex;?"/g,             'class="u-flex"'],
  [/style="display:\s*grid;?"/g,             'class="u-grid"'],
  [/style="display:\s*inline-flex;?"/g,      'class="u-inline-flex"'],
  [/style="display:\s*inline-block;?"/g,     'class="u-inline-block"'],
  [/style="display:\s*none;?"/g,             'class="u-hidden"'],
  [/style="display:\s*block;?"/g,            'class="u-block"'],

  // common margins (single decl only)
  [/style="margin:\s*0;?"/g,                 'class="u-m-0"'],
  [/style="margin-top:\s*1rem;?"/g,          'class="u-mt-4"'],
  [/style="margin-top:\s*0\.5rem;?"/g,       'class="u-mt-2"'],
  [/style="margin-top:\s*0\.25rem;?"/g,      'class="u-mt-1"'],
  [/style="margin-top:\s*1\.5rem;?"/g,       'class="u-mt-6"'],
  [/style="margin-top:\s*2rem;?"/g,          'class="u-mt-8"'],
  [/style="margin-bottom:\s*1rem;?"/g,       'class="u-mb-4"'],
  [/style="margin-bottom:\s*0\.5rem;?"/g,    'class="u-mb-2"'],
  [/style="margin-bottom:\s*1\.5rem;?"/g,    'class="u-mb-6"'],

  // padding
  [/style="padding:\s*1rem;?"/g,             'class="u-p-4"'],
  [/style="padding:\s*0\.5rem;?"/g,          'class="u-p-2"'],

  // overflow
  [/style="overflow:\s*hidden;?"/g,          'class="u-overflow-hidden"'],
  [/style="overflow-x:\s*auto;?"/g,          'class="u-overflow-auto"'],
  [/style="overflow-y:\s*auto;?"/g,          'class="u-overflow-auto"'],

  // cursor
  [/style="cursor:\s*pointer;?"/g,           'class="u-cursor-pointer"'],

  // width
  [/style="width:\s*100%;?"/g,               'class="u-w-full"'],

  // text colors
  [/style="color:\s*var\(--text-muted\);?"/g, 'class="u-text-muted"'],
  [/style="color:\s*var\(--text-faint\);?"/g, 'class="u-text-faint"'],
  [/style="color:\s*var\(--accent\);?"/g,     'class="u-text-brand"'],
];

// Coalesce: if an element already has class="..." and we replace style with class="...",
// merge them. Detect pattern:  class="A" classNew="..."  → won't auto-merge; we handle most
// common case where REPLACE results in adjacent class attributes.
function mergeAdjacentClasses(html) {
  // Pattern: class="X"  class="Y"  →  class="X Y"  (and reverse order)
  // run a few iterations
  let prev;
  do {
    prev = html;
    html = html.replace(/class="([^"]*)"\s+class="([^"]*)"/g, 'class="$1 $2"');
  } while (html !== prev);
  return html;
}

let after = before;
let totalReplaced = 0;
for (const [re, sub] of SINGLE_REPLACERS) {
  after = after.replace(re, () => { totalReplaced++; return sub; });
}
const beforeMerge = (after.match(/class=/g) || []).length;
after = mergeAdjacentClasses(after);
const afterMerge = (after.match(/class=/g) || []).length;

const inlineBefore = (before.match(/style="/g) || []).length;
const inlineAfter  = (after.match(/style="/g) || []).length;

if (after !== before) fs.writeFileSync(file, after);

console.log(`inline-style attrs:  ${inlineBefore} → ${inlineAfter}  (Δ ${inlineBefore - inlineAfter})`);
console.log(`replacements applied: ${totalReplaced}`);
console.log(`class= attrs: ${beforeMerge} → ${afterMerge} (after merge)`);
