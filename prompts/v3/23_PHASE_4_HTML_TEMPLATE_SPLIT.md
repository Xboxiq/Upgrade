# 📄 WORKER 23 — Phase 4/5 — HTML Template Split
> **اقرأ أولاً:** `prompts/v3/23_WORKER_DECONSTRUCTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phases 1-3 (CSS shattered).
> **الفلسفة:** *32K-line HTML واحد ميت. Shell ٥K + ١٤ shard ١٫٥K حي. كل صفحة تَستحق ملفها.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/index.html` | **REPLACE** بـ shell + dynamic page injection | حذف بدون بديل |
| `platform/pages/` | **CREATE** 14-15 ملف shard (`dashboard.html`, `callcenter.html`, ...) | إنشاء غير 14-15 |
| `platform/assets/app.js` | **APPEND** IIFE `Upg.shards` (~140 سطر) — يَلوّد الـ pages عند الحاجة | لمس IIFEs قائمة |
| Pack v1/v2/v3 prompts | لا تُلمَس | تعديل |

**Sacred preserved:**
- جميع 14 (15) page IDs.
- جميع 391 qcalc.
- جميع 28 Upg.* APIs.
- Service Worker + manifest + favicon.

> **Stage-and-Replace:** نُنشئ shards أولاً، نُختبر الـ inject، ثم نَستبدل index.html.

---

## 🎯 الهدف

Phase 4 يُكسّر `index.html` (~32K-line) إلى:

- **`platform/index.html`** = shell ~5K-line (head + body chrome + footer + scripts).
- **`platform/pages/<id>.html`** × 15 = page shards ~1.5K-line each.

**Loading strategy:**
1. **Initial load:** index.html shell + `dashboard.html` (default page) loaded immediately.
2. **On navigation:** other pages fetched lazily via `fetch()` (same-origin) + injected into a `<main id="page-host">` slot.
3. **Cache:** loaded shards stored in memory (Map) for instant re-navigation.
4. **Service Worker:** updated to cache all shards (offline-first preserved).

**Discipline:**
- لا framework. Vanilla `fetch` + `DocumentFragment`.
- صفر network في الـ initial load بَخلاف الـ shards (which are local).
- الـ Service Worker pre-caches all shards on install.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT (Worker 23 / DECONSTRUCTION)
├─ Phase: 4/5 — HTML Template Split
├─ Estimated lines: ~600 (planning + 15 shard creation + shell + JS Upg.shards)
├─ Files to touch:
│   ├─ platform/index.html         (REPLACE with shell)
│   ├─ platform/pages/<id>.html    (CREATE 14-15 shards)
│   ├─ platform/assets/app.js      (APPEND IIFE Upg.shards ~140 lines)
│   └─ platform/sw.js              (UPDATE pre-cache list)
├─ Sacred verify (run BEFORE):
│   ├─ wc -l platform/index.html                                  → ~32,000 (baseline)
│   ├─ grep -c '<section class="page"' platform/index.html        → 14+
│   └─ grep -c 'qcalc' platform/index.html                        → 391
├─ Branch: continue worker-23-devotio
└─ Strategy: split-script + manual verification per shard.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Create `scripts/split-html.mjs` (one-shot)

```javascript
#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const HTML_PATH = 'platform/index.html';
const PAGES_DIR = 'platform/pages';

if (!existsSync(PAGES_DIR)) mkdirSync(PAGES_DIR, { recursive: true });

const html = readFileSync(HTML_PATH, 'utf8');

// Extract each <section class="page" id="page-X" ...>...</section> block
const PAGE_RE = /<section\s+class="page"\s+id="(page-[a-z]+)"[\s\S]*?<\/section>\s*(?=<section\s+class="page"|<\/main>)/g;

let m;
const shards = [];
const shellHtmlParts = { head: '', bodyStart: '', bodyEnd: '' };

// Find pages
while ((m = PAGE_RE.exec(html)) !== null) {
  const fullSection = m[0];
  const pageId = m[1];                     // e.g. 'page-dashboard'
  const shardName = pageId.replace(/^page-/, '') + '.html';
  shards.push({ id: pageId, file: shardName, content: fullSection });
}

// Write each shard
for (const shard of shards) {
  writeFileSync(`${PAGES_DIR}/${shard.file}`, shard.content);
  console.log(`✓ ${shard.file} (${shard.content.split('\n').length} lines)`);
}

// Generate shell — html with all <section class="page">...</section> replaced by placeholder
let shell = html;
for (const shard of shards) {
  shell = shell.replace(shard.content, `<!-- page slot: ${shard.id} -->`);
}

// Add page-host main slot if missing
shell = shell.replace(
  /<main([^>]*)>/,
  '<main$1 id="page-host" data-shard-host>'
);

writeFileSync(`${PAGES_DIR}/_shell.html`, shell);  // for diff inspection
writeFileSync(HTML_PATH, shell);

console.log(`\n✓ Shell written (${shell.split('\n').length} lines, was ${html.split('\n').length})`);
console.log(`✓ ${shards.length} shards created in ${PAGES_DIR}/`);
```

استخدمه:
```bash
node scripts/split-html.mjs
```

### Step 2 — Create `Upg.shards` IIFE في app.js

```javascript
/* ════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — Upg.shards API (Worker 23 / Phase 4)
   Lazy-load page shards from platform/pages/<id>.html.
   Offline-first: requires service worker pre-cache (see sw.js update).
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const PAGES_DIR = './pages/';
  const PAGE_HOST_SELECTOR = '#page-host';
  const SHARD_IDS = [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery',
    'myprogress', 'curriculum'
  ];

  const cache = new Map();  // shardId → DocumentFragment

  // Load a shard (returns Promise<DocumentFragment>)
  const loadShard = async (shardId) => {
    if (cache.has(shardId)) return cache.get(shardId);

    try {
      const resp = await fetch(`${PAGES_DIR}${shardId}.html`);
      if (!resp.ok) throw new Error(`shard ${shardId} not found (${resp.status})`);
      const text = await resp.text();
      const tpl = document.createElement('template');
      tpl.innerHTML = text;
      const frag = tpl.content.cloneNode(true);
      cache.set(shardId, frag);
      return frag;
    } catch (e) {
      console.error('[Upg.shards] Load failed:', shardId, e);
      return null;
    }
  };

  // Mount a shard into page host (replaces existing content)
  const mountShard = async (shardId) => {
    const host = document.querySelector(PAGE_HOST_SELECTOR);
    if (!host) {
      console.error('[Upg.shards] Page host not found:', PAGE_HOST_SELECTOR);
      return false;
    }

    const frag = await loadShard(shardId);
    if (!frag) return false;

    // Hide all existing pages, then inject if not present
    host.querySelectorAll('section.page').forEach(s => s.setAttribute('hidden', ''));
    const targetId = `page-${shardId}`;
    let target = host.querySelector(`#${targetId}`);

    if (!target) {
      // First mount: inject the section
      host.appendChild(frag.cloneNode(true));
      target = host.querySelector(`#${targetId}`);
    }

    if (target) {
      target.removeAttribute('hidden');
      // Dispatch event for downstream listeners (Upg.font, Upg.chroma, Upg.aura, Upg.life, etc.)
      document.dispatchEvent(new CustomEvent('upg:nav:change', {
        detail: { shardId, pageId: targetId }
      }));
    }
    return target !== null;
  };

  // Pre-load all shards (called after DOMContentLoaded by service worker pre-cache)
  const preloadAll = () =>
    Promise.all(SHARD_IDS.map(loadShard))
      .then(results => results.filter(r => r !== null).length);

  // List
  const list = () => SHARD_IDS.slice();

  // Audit cache state
  const audit = () => ({
    declared: SHARD_IDS.length,
    cached: cache.size,
    cached_ids: Array.from(cache.keys())
  });

  // Expose
  window.Upg = window.Upg || {};
  window.Upg.shards = { loadShard, mountShard, preloadAll, list, audit };

  // Auto-mount default page on load (dashboard) if no page is currently mounted
  document.addEventListener('DOMContentLoaded', async () => {
    const host = document.querySelector(PAGE_HOST_SELECTOR);
    if (host && host.children.length === 0) {
      // Detect from URL hash or default to dashboard
      const hash = window.location.hash.replace('#page-', '');
      const initialId = SHARD_IDS.includes(hash) ? hash : 'dashboard';
      await mountShard(initialId);
    }

    // Pre-load others in idle (non-blocking)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => preloadAll(), { timeout: 3000 });
    } else {
      setTimeout(preloadAll, 1500);
    }
  });

  // Hook into existing Upg.nav (W11 P3) if present
  document.addEventListener('upg:nav:request', async (e) => {
    if (e.detail && e.detail.pageId) {
      const shardId = e.detail.pageId.replace(/^page-/, '');
      if (SHARD_IDS.includes(shardId)) await mountShard(shardId);
    }
  });

})(window, document);
```

### Step 3 — Update Service Worker (pre-cache shards)

```bash
grep -n 'urlsToCache\|CACHE_LIST\|caches.open' platform/sw.js
```

في `platform/sw.js`، **AUGMENT** الـ pre-cache list:

```javascript
// Existing pre-cache (Pack v1)
const CACHE_LIST = [
  '/index.html',
  '/assets/style.css',
  '/assets/app.js',
  '/manifest.webmanifest',
  '/favicon.svg'
  // Pack v3 W23 P4 ADD:
  ,'/pages/dashboard.html'
  ,'/pages/callcenter.html'
  ,'/pages/fieldsales.html'
  ,'/pages/accountmgr.html'
  ,'/pages/social.html'
  ,'/pages/lab.html'
  ,'/pages/psych.html'
  ,'/pages/eq.html'
  ,'/pages/negotiation.html'
  ,'/pages/customercare.html'
  ,'/pages/programming.html'
  ,'/pages/accounting.html'
  ,'/pages/phonerepair.html'
  ,'/pages/hrmastery.html'
  ,'/pages/myprogress.html'
  ,'/pages/curriculum.html'
  // Pack v3 W23 P3 ADD (CSS shards):
  ,'/assets/css/tokens.css'
  ,'/assets/css/base.css'
  ,'/assets/css/utilities.css'
  ,'/assets/css/chrome.css'
  ,'/assets/css/pages.css'
  ,'/assets/css/motion.css'
  // Pack v3 W20 P2 ADD (fonts):
  ,'/assets/fonts/aref-ruqaa/aref-ruqaa-400.woff2'
  ,'/assets/fonts/aref-ruqaa/aref-ruqaa-700.woff2'
  ,'/assets/fonts/reem-kufi/reem-kufi-VF.woff2'
  ,'/assets/fonts/cairo/cairo-400.woff2'
  ,'/assets/fonts/cairo/cairo-600.woff2'
  ,'/assets/fonts/cairo/cairo-700.woff2'
  ,'/assets/fonts/tajawal/tajawal-400.woff2'
  ,'/assets/fonts/tajawal/tajawal-500.woff2'
  ,'/assets/fonts/tajawal/tajawal-700.woff2'
  ,'/assets/fonts/ibm-plex-arabic/ibm-plex-arabic-400.woff2'
  ,'/assets/fonts/ibm-plex-arabic/ibm-plex-arabic-700.woff2'
  ,'/assets/fonts/readex-pro/readex-pro-VF.woff2'
  ,'/assets/fonts/inter/inter-VF.woff2'
  ,'/assets/fonts/jetbrains-mono/jetbrains-mono-400.woff2'
  ,'/assets/fonts/fraunces/fraunces-VF.woff2'
];

// Bump cache version (forces re-cache on update)
const CACHE_NAME = 'upgrade-v3-w23-p4';   // was 'upgrade-v2'
```

### Step 4 — Verify shell + shards

```bash
# Shell is thin
wc -l platform/index.html                                          # → ~5,000 (was ~32,000)

# Shards exist
ls platform/pages/                                                 # → 15 .html files
wc -l platform/pages/*.html                                        # → ~22,000 total moved
```

### Step 5 — Browser test

```bash
# Open platform/index.html
# DevTools Network → reload
# Should see:
#   - index.html (5K)
#   - style.css + 6 imports
#   - app.js
#   - dashboard.html (initial mount)
#   - sw.js
# After idle: 14 more pages preloaded in background

# Console:
#   - Upg.shards.audit() → { declared: 16, cached: 16, ... }
#   - 0 errors

# Navigate to callcenter → mounts from cache (instant)
# Test offline: disconnect network → all pages still work
```

### Step 6 — Discipline Comment

في `index.html` (shell) قبل `</body>`:

```html
<!-- ════════════════════════════════════════════════════════════════════
     DEVOTIO v3 / Worker 23 / Phase 4 — Shell Discipline:
     1. الـ pages موجودة في platform/pages/<id>.html.
     2. Initial mount: dashboard (or URL hash override).
     3. Other pages: lazy load via Upg.shards.mountShard(id).
     4. Service worker pre-caches all 15 shards on install.
     5. صفر external requests — كل الـ shards same-origin.
     6. لا تَدمج Page section في shell — نَكتب shard جديد.
     ════════════════════════════════════════════════════════════════════ -->
```

### Step 7 — Cleanup script

```bash
rm scripts/split-html.mjs
```

---

## 🧪 Sanity Probe

```bash
# Shards exist
ls platform/pages/ | wc -l                                         # → 15-16

# Shell thin
wc -l platform/index.html                                          # → ≤6,000

# Sacred preserved
grep -c '<section class="page"' platform/pages/*.html | awk -F: '{sum+=$2} END {print sum}'  # → 14+
grep -c 'qcalc' platform/pages/*.html | awk -F: '{sum+=$2} END {print sum}'                  # → 391

# Upg.* APIs (added Upg.shards)
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 29 (was 28, +shards)

# Service worker updated
grep -c '/pages/' platform/sw.js                                   # → ≥15

# Browser test:
# Initial load: <100ms HTML parse (was >500ms for 32K monolith)
# Navigate dashboard → callcenter: instant from cache
# Offline: all works ✓
```

---

## ✅ معايير القبول (Phase 4)

- [ ] 15 ملف shard في `platform/pages/`.
- [ ] `index.html` ≤ 6K-line shell.
- [ ] `Upg.shards` IIFE: loadShard, mountShard, preloadAll, list, audit.
- [ ] Service Worker يَحوي الـ 15 shards + 6 CSS files + 18 fonts في pre-cache.
- [ ] Cache version bumped.
- [ ] Visual: identical to pre-P4.
- [ ] Network: initial load <100ms parse.
- [ ] Offline: all 15 pages work.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/index.html platform/pages/ platform/assets/app.js platform/sw.js
git commit -m "phase 4 (devotio): html template split — 32K monolith → shell 5K + 15 page shards, Upg.shards API, sw.js pre-cache updated"
# push immediately

git rm scripts/split-html.mjs 2>/dev/null || true
git add -u
git commit -m "phase 4 (devotio): cleanup split-html script" || true

git add state/PROGRESS.json state/snapshots/worker-23-phase-4.json
git commit -m "state: devotio phase 4 (worker 23) committed and pushed"
# push immediately
```

— نهاية Phase 4.

📄 **Devotion check:** هل كل صفحة لها ملفها الخاص؟ Initial parse سريع؟ Offline يعمل؟ → Phase 5 (JS ESM Migration).
