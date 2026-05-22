# 📦 WORKER 23 — Phase 5/5 — JS ESM Migration
> **اقرأ أولاً:** `prompts/v3/23_WORKER_DECONSTRUCTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phases 1-4 (CSS shattered, HTML split).
> **الفلسفة:** *24 IIFE في ملف واحد = طاحونة تَستهلك الذاكرة. ESM modules = نَفْس مُستقل لكل وحدة، dynamic import للحاجة، backward-compat ضامن.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/assets/app.js` | **REPLACE** بـ thin entry يَستورد modules | حذف بدون بديل |
| `platform/assets/js/` | **CREATE** 24+ ESM modules (`upg-font.js`, `upg-chroma.js`, ...) | إنشاء غير ESM |
| `platform/index.html` | **AUGMENT** `<script>` للـ `type="module"` | تغيير غير المطلوب |
| `platform/sw.js` | **UPDATE** pre-cache لـ ESM modules | لمس logic |

**Sacred preserved:**
- جميع 29 Upg.* APIs (window.Upg.* shim ضامن).
- جميع IIFE behavior (logic identical).
- 14 page sections + 391 qcalc.
- الـ ESM modules تَعمل كـ ES modules فقط في المتصفح — لا bundling.

> **Stage-and-Replace:** نُنشئ ESM modules أولاً، نُختبر، ثم نَستبدل app.js.

---

## 🎯 الهدف

Phase 5 يُحوّل `app.js` (~16K-line, 24 IIFEs) إلى:

- **`platform/assets/app.js`** = thin entry ~80 سطر.
- **`platform/assets/js/upg-<name>.js`** × 24 = ESM module per IIFE.
- **`platform/assets/js/_compat.js`** = backward-compat shim لـ `window.Upg.*` (legacy code يَعتمد عليها).

**ESM Architecture:**

```javascript
// app.js (entry — thin)
import { initFont }   from './js/upg-font.js';
import { initChroma } from './js/upg-chroma.js';
import { initRitual } from './js/upg-ritual.js';
// ... 24 imports

// Each module exports init() + named exports
initFont();
initChroma();
initRitual();
// ...

// Compat shim ensures window.Upg.* still works (Pack v1/v2 code dependency)
import './js/_compat.js';
```

```javascript
// platform/assets/js/upg-font.js (ESM module)
export function initFont() { /* IIFE body */ }
export const FAMILIES = [...];
export const VOICES = [...];
// ... etc.
```

```javascript
// platform/assets/js/_compat.js
import * as font from './upg-font.js';
import * as chroma from './upg-chroma.js';
// ...
window.Upg = window.Upg || {};
window.Upg.font   = { ...font, list: font.list, audit: font.audit, /* etc */ };
window.Upg.chroma = { ...chroma, /* etc */ };
// ...
```

**Discipline:**
- Vanilla ESM. صفر bundler.
- `<script type="module">` (modern browsers, fallback handled by SW).
- `window.Upg.*` shim للتوافق العكسي.
- Service Worker pre-caches all module files.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT (Worker 23 / DECONSTRUCTION)
├─ Phase: 5/5 — JS ESM Migration (final)
├─ Estimated lines: ~580 (entry + 24 module headers + compat shim)
├─ Files to touch:
│   ├─ platform/assets/app.js          (REPLACE with thin ESM entry)
│   ├─ platform/assets/js/<24>.js      (CREATE 24 ESM modules)
│   ├─ platform/assets/js/_compat.js   (CREATE backward-compat shim)
│   ├─ platform/index.html             (AUGMENT script type="module")
│   └─ platform/sw.js                  (UPDATE pre-cache)
├─ Sacred verify (run BEFORE):
│   ├─ wc -l platform/assets/app.js                               → ~16,000 (baseline)
│   ├─ grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  → 29
│   └─ grep -c 'IIFE\|(function (' platform/assets/app.js         → 24
├─ Branch: continue worker-23-devotio
└─ Final phase of Worker 23 — PR opens after.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Identify all 24 IIFEs

```bash
grep -nE '\(function \(window, document\)' platform/assets/app.js
# Expected output: ~24 IIFE start positions
```

كل IIFE له APIs محدّدة:

| IIFE | Module file | APIs |
|---|---|---|
| Upg.theme | `upg-theme.js` | toggle, set, get, list |
| Upg.icons | `upg-icons.js` | load, render, list |
| Upg.gateway | `upg-gateway.js` | open, close, ... |
| ... (24 total) | ... | ... |

### Step 2 — Create `scripts/extract-iife-to-esm.mjs` (one-shot)

```javascript
#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const APP_JS = 'platform/assets/app.js';
const OUT_DIR = 'platform/assets/js';

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const app = readFileSync(APP_JS, 'utf8');

// Extract IIFE blocks
const IIFE_RE = /(\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/\s*)?\(function\s*\(window,\s*document\)\s*\{([\s\S]*?)\}\)\s*\(window,\s*document\);?/g;

const modules = [];
let m;
let counter = 0;
while ((m = IIFE_RE.exec(app)) !== null) {
  const comment = m[1] || '';
  const body = m[2];

  // Try to detect API name from `window.Upg.X = ...` inside body
  const apiMatch = body.match(/window\.Upg\.([a-z]+)\s*=/);
  const name = apiMatch ? apiMatch[1] : `module${++counter}`;

  modules.push({ name, comment, body });
}

console.log(`Found ${modules.length} IIFEs.`);

// Write each as ESM module
for (const mod of modules) {
  const moduleContent = `${mod.comment}
/* ESM-migrated from app.js IIFE — Worker 23 / Phase 5 */
export function init() {
${mod.body}
}
`;
  writeFileSync(`${OUT_DIR}/upg-${mod.name}.js`, moduleContent);
  console.log(`✓ upg-${mod.name}.js`);
}

// Generate entry app.js
let entryContent = `/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — JS Entry Point (Worker 23 / Phase 5)
   ════════════════════════════════════════════════════════════════════════ */
'use strict';
`;

for (const mod of modules) {
  entryContent += `import { init as init_${mod.name} } from './js/upg-${mod.name}.js';\n`;
}

entryContent += `\n// Run init for each module\n`;
for (const mod of modules) {
  entryContent += `init_${mod.name}();\n`;
}

entryContent += `\n// Backward-compat: window.Upg.* exposed via legacy IIFE bodies above\nimport './js/_compat.js';\n`;

writeFileSync(APP_JS, entryContent);
console.log(`\n✓ app.js entry written (${entryContent.split('\n').length} lines)`);

// Generate compat shim (mostly empty since IIFEs already write to window.Upg)
const compat = `/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — Backward Compatibility Shim (Worker 23 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   Each upg-*.js module contains its original IIFE which writes to
   window.Upg.<name> directly. This file just verifies all are present.
   ════════════════════════════════════════════════════════════════════════ */
'use strict';

// Verify expected APIs are exposed
const EXPECTED = [
  'theme','icons','gateway','calc','cmdk','state','production','type','scroll',
  'nav','identity','greet','countup','motion','material','chrome','choreo',
  'transition','focus','aura','life','sound','pace','practice',
  'font','chroma','ritual','layer','shards'
];

document.addEventListener('DOMContentLoaded', () => {
  const missing = EXPECTED.filter(k => !window.Upg || !window.Upg[k]);
  if (missing.length === 0) {
    console.info(
      '%c📦 DECONSTRUCTION v3 — ESM migration complete: %d modules, all window.Upg.* APIs preserved',
      'color:#7BFFA0; font-weight:bold;',
      EXPECTED.length
    );
  } else {
    console.warn('[Upg compat] Missing APIs:', missing);
  }
});
`;
writeFileSync(`${OUT_DIR}/_compat.js`, compat);
console.log('✓ _compat.js written');
```

استخدمه:
```bash
node scripts/extract-iife-to-esm.mjs
```

### Step 3 — Update `index.html` to use `type="module"`

ابحث عن:
```html
<script src="assets/app.js" defer></script>
```

استبدل بـ:
```html
<script type="module" src="assets/app.js"></script>
```

> **ملاحظة:** `type="module"` defaults to deferred + strict mode. لا حاجة لـ `defer` attribute.

### Step 4 — Update Service Worker

في `platform/sw.js`، **AUGMENT** الـ pre-cache list:

```javascript
const CACHE_LIST = [
  // ... (existing from W23 P4) ...
  // Pack v3 W23 P5 ADD (ESM modules):
  '/assets/js/_compat.js',
  '/assets/js/upg-theme.js',
  '/assets/js/upg-icons.js',
  '/assets/js/upg-gateway.js',
  '/assets/js/upg-calc.js',
  '/assets/js/upg-cmdk.js',
  '/assets/js/upg-state.js',
  '/assets/js/upg-production.js',
  '/assets/js/upg-type.js',
  '/assets/js/upg-scroll.js',
  '/assets/js/upg-nav.js',
  '/assets/js/upg-identity.js',
  '/assets/js/upg-greet.js',
  '/assets/js/upg-countup.js',
  '/assets/js/upg-motion.js',
  '/assets/js/upg-material.js',
  '/assets/js/upg-chrome.js',
  '/assets/js/upg-choreo.js',
  '/assets/js/upg-transition.js',
  '/assets/js/upg-focus.js',
  '/assets/js/upg-aura.js',
  '/assets/js/upg-life.js',
  '/assets/js/upg-sound.js',
  '/assets/js/upg-pace.js',
  '/assets/js/upg-practice.js',
  '/assets/js/upg-font.js',
  '/assets/js/upg-chroma.js',
  '/assets/js/upg-ritual.js',
  '/assets/js/upg-layer.js',
  '/assets/js/upg-shards.js'
];

// Bump cache version
const CACHE_NAME = 'upgrade-v3-w23-p5';   // was 'upgrade-v3-w23-p4'
```

### Step 5 — Verify

```bash
# Files
ls platform/assets/js/                                             # → ≥25 .js files
wc -l platform/assets/app.js                                       # → ≤200 (was 16K)

# All modules small + focused
wc -l platform/assets/js/upg-*.js                                  # each ≤ 1500

# Sacred preserved
grep -oE 'window\.Upg\.[a-z]+' platform/assets/js/_compat.js | sort -u | wc -l  # → 29

# Browser test:
# DevTools Network → reload
#   - app.js (small entry)
#   - 24+ ESM modules (parallel load, HTTP/2 friendly)
#   - All cached after first load (Service Worker)
# Console: "📦 DECONSTRUCTION v3 — ESM migration complete..."
# Console: window.Upg.font, .chroma, .ritual, etc. all functional
# Visual: 0 regression
```

### Step 6 — Test offline

```bash
# DevTools → Network → "Offline" mode
# Reload → all modules served from SW cache ✓
# Navigate between pages → all work ✓
# Console: 0 errors
```

### Step 7 — Cleanup

```bash
rm scripts/extract-iife-to-esm.mjs
```

### Step 8 — Discipline Comment

في `app.js` (entry):

```javascript
/* ════════════════════════════════════════════════════════════════════════
   Worker 23 / Phase 5 — ESM Discipline:
   1. كل وحدة جديدة بعد Phase 5 يجب أن تكون ESM module في platform/assets/js/.
   2. لا تَكتب IIFE في app.js مرة أخرى.
   3. Backward-compat: window.Upg.* مَضمونة عبر _compat.js.
   4. type="module" defaults to defer + strict.
   5. Service Worker يَحوي كل modules في pre-cache.
   6. لا تَستعمل bundler.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe (final — Worker 23 complete)

```bash
# JS architecture
ls platform/assets/js/ | wc -l                                     # → ≥25
wc -l platform/assets/app.js                                       # → ≤200

# CSS architecture
ls platform/assets/css/ | wc -l                                    # → 6 (W23 P3)
wc -l platform/assets/style.css                                    # → ≤50 (W23 P3 entry)

# HTML architecture
ls platform/pages/ | wc -l                                         # → 15 (W23 P4)
wc -l platform/index.html                                          # → ≤6,000 (W23 P4 shell)

# !important purged
grep -c '!important' platform/assets/css/*.css                    # → ≤45 (W23 P2)

# @layer system
grep -c '@layer' platform/assets/style.css                        # → ≥7 (W23 P1)

# All Upg.* APIs preserved
grep -h 'window\.Upg\.' platform/assets/js/*.js | grep -oE 'window\.Upg\.[a-z]+' | sort -u | wc -l  # → 29

# Sacred preserved (across shards)
grep -c '<section class="page"' platform/pages/*.html | awk -F: '{sum+=$2} END {print sum}'  # → 14+
grep -c 'qcalc' platform/pages/*.html | awk -F: '{sum+=$2} END {print sum}'                  # → 391

# Service Worker pre-cache
grep -c '/assets/js/' platform/sw.js                              # → ≥25
grep -c '/pages/' platform/sw.js                                   # → ≥15
grep -c '/assets/css/' platform/sw.js                              # → ≥6
grep -c '/assets/fonts/' platform/sw.js                            # → ≥15

# Browser test:
# Online: initial load fast (<2s), parallel modules
# Offline: all 15 pages work
# Console: 0 errors
# Console: window.Upg.* fully functional
```

---

## ✅ معايير القبول (Phase 5 — Worker 23 final)

- [ ] `platform/assets/js/` يَحوي ≥25 ESM modules.
- [ ] `app.js` ≤ 200 سطر entry point.
- [ ] `_compat.js` يَتحقق من 29 Upg.* APIs.
- [ ] `<script type="module">` في index.html.
- [ ] Service Worker يَحوي كل modules في pre-cache + bumped cache version.
- [ ] صفر visual regression.
- [ ] صفر console errors.
- [ ] Backward-compat: `window.Upg.*` يَعمل تماماً.
- [ ] Offline: كل المنصة تَعمل.
- [ ] Cleanup scripts deleted.
- [ ] **DECONSTRUCTION Worker 23 مكتمل — 5/5 phases.**

---

## 📤 Commit + Push (final)

```bash
git add platform/assets/app.js platform/assets/js/ platform/index.html platform/sw.js
git commit -m "phase 5 (devotio): js esm migration — 16K monolith → 24+ esm modules + thin entry + compat shim, sw.js updated, worker 23 complete"
# push immediately

git rm scripts/extract-iife-to-esm.mjs 2>/dev/null || true
git add -u
git commit -m "phase 5 (devotio): cleanup esm extract script" || true

git add state/PROGRESS.json state/snapshots/worker-23-phase-5.json
git commit -m "state: devotio phase 5 (worker 23) complete — 5/5 phases"
# push immediately
```

### Open PR

```
gh pr create \
  --base main \
  --head worker-23-devotio \
  --title "feat: Worker 23 — DECONSTRUCTION DEVOTIO (5/5 phases)" \
  --body "Pack v3 Worker 23 complete.

## Phases done
1. CSS Layer Intro — 7 @layer cascade (reset/tokens/base/utilities/components/themes/overrides), Upg.layer API
2. Important Purge — 221 → ≤45 (80% reduction), intentional documented
3. CSS Shatter — 23K monolith → 6 logical files (tokens/base/utilities/chrome/pages/motion)
4. HTML Template Split — 32K → shell 5K + 15 page shards, Upg.shards API, sw.js pre-cache
5. JS ESM Migration — 16K → 24+ ESM modules + thin entry + window.Upg.* shim

## Sacred preservation
- 14+ page sections + curriculum ✓
- 391 qcalc references ✓
- 29 Upg.* APIs (all preserved via window.Upg.* shim) ✓
- 0 visual regression ✓
- Offline-first preserved (sw.js pre-caches everything) ✓

## Architecture metrics
| Metric | Before | After |
|---|---:|---:|
| index.html | 32K lines | 5K shell + 15 shards |
| style.css | 23K lines | 30 entry + 6 files |
| app.js | 16K lines | 200 entry + 25 modules |
| !important | 221 | ≤45 |
| @layer | 0 | 7 |"
```

— نهاية Worker 23.

📦 **Devotion check final:** هل البنية الآن قابلة للصيانة؟ الـ Pack v4 سيكون سهلاً الآن؟ → فتح PR، ثم Worker 24 (Dual-Form).
