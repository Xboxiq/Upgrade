# 💎 WORKER 23 — Phase 3/5 — CSS Shatter
> **اقرأ أولاً:** `prompts/v3/23_WORKER_DECONSTRUCTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (@layer) + Phase 2 (!important purged).
> **الفلسفة:** *Monolith 23K-line ميت. ٦ ملفات مُتخصّصة حية. كل واحد يَفعَل شيئاً واحداً، يَفعله بِأمانة.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/assets/css/` | **CREATE** 6 ملفات جديدة (`tokens.css`, `base.css`, `chrome.css`, `pages.css`, `motion.css`, `utilities.css`) | إنشاء أكثر من 6 |
| `platform/assets/style.css` | **REPLACE** بـ thin entry point يَستعمل `@import` للـ 6 ملفات | حذف الملف (هويته entry preserved) |
| `index.html` `<link rel="stylesheet">` | لا يُلمَس (يبقى يُشير لـ `style.css`) | تغيير |
| `app.js` | لا يُلمَس | أي تعديل |

**Sacred preserved:**
- جميع 7 layers من Phase 1.
- جميع الـ 45 intentional !important.
- جميع 27+ Upg.* APIs.
- 14 page sections + 391 qcalc.

> **Stage-and-Replace:** هذا أصعب phase. الاستراتيجية: نُنشئ الـ 6 ملفات الجديدة، نَنقل القواعد إليها واحدة في الوقت، ثم نَستبدل style.css بـ entry فيه `@import`s — كله في commits صغيرة قابلة للـ rollback.

---

## 🎯 الهدف

Phase 3 يُكسّر `style.css` (~23K-line) إلى 6 ملفات منطقية:

| الملف | الحجم المتوقَّع | المحتوى |
|---|---:|---|
| `tokens.css` | ~500 سطر | جميع `:root` tokens (color, font, life, chr-*, rit-*, type-voice-*, etc.) — `@layer tokens` content |
| `base.css` | ~800 سطر | reset + html/body baseline + typography rhythm + focus + selection — `@layer reset + base` |
| `utilities.css` | ~500 سطر | atomic classes (`.tas-*`, `.chr-*`, `.h-*`, `.life-*`, `.rit-*`, `.type-*`) — `@layer utilities` |
| `chrome.css` | ~1500 سطر | sidebar, top-chrome, breadcrumbs, command palette, nav-rail, footer — `@layer components` (subset) |
| `pages.css` | ~3000 سطر | per-page sections + `[data-page-personality]` overrides + page-h + bento grids — `@layer components` (subset) |
| `motion.css` | ~800 سطر | جميع keyframes + transitions + reduced-motion guards + print — `@layer overrides` |

**المجموع التقريبي:** 7100 سطر صافي (vs 23K monolith) = نقصان ~70% من duplicate/empty/comment overhead.

`style.css` يَصير entry point ~30 سطر فقط:

```css
@layer reset, tokens, base, utilities, components, themes, overrides;

@import url("./css/tokens.css")    layer(tokens);
@import url("./css/base.css")      layer(base);
@import url("./css/utilities.css") layer(utilities);
@import url("./css/chrome.css")    layer(components);
@import url("./css/pages.css")     layer(components);
@import url("./css/motion.css")    layer(overrides);
```

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT (Worker 23 / DECONSTRUCTION)
├─ Phase: 3/5 — CSS Shatter
├─ Estimated lines: ~580 (planning + create 6 files + replace style.css)
├─ Files to touch:
│   ├─ platform/assets/style.css           (REPLACE with entry point)
│   ├─ platform/assets/css/tokens.css      (CREATE)
│   ├─ platform/assets/css/base.css        (CREATE)
│   ├─ platform/assets/css/utilities.css   (CREATE)
│   ├─ platform/assets/css/chrome.css      (CREATE)
│   ├─ platform/assets/css/pages.css       (CREATE)
│   └─ platform/assets/css/motion.css      (CREATE)
├─ Sacred verify:
│   ├─ grep -c '@layer' platform/assets/style.css                 → ≥7 (P1)
│   ├─ grep -c '!important' platform/assets/style.css             → ≤45 (P2)
│   └─ wc -l platform/assets/style.css                            → tracked baseline
├─ Branch: continue worker-23-devotio
└─ Strategy: split-script + manual review.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Use existing `scripts/split-platform.mjs` (or create)

ابحث في `scripts/`:

```bash
ls scripts/
# → split-platform.mjs (موجود من Pack v2 على ما يبدو) أو غير موجود
```

لو موجود، استخدمه. لو لا، أنشئ:

#### `scripts/shatter-css.mjs` (one-shot — يُحذف بعد Phase 3)

```javascript
#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const CSS_PATH = 'platform/assets/style.css';
const OUT_DIR  = 'platform/assets/css';

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const css = readFileSync(CSS_PATH, 'utf8');

// Strategy: extract content of each @layer block into its own file
// Plus split @layer components into chrome.css + pages.css by section markers.

const LAYER_BLOCKS = [
  { name: 'tokens',     out: 'tokens.css' },
  { name: 'base',       out: 'base.css' },
  { name: 'utilities',  out: 'utilities.css' },
  { name: 'overrides',  out: 'motion.css' }  // motion + print + reduced-motion
];

for (const layer of LAYER_BLOCKS) {
  const re = new RegExp(`@layer\\s+${layer.name}\\s*\\{([\\s\\S]*?)\\n\\}`, 'g');
  let extracted = '';
  let m;
  while ((m = re.exec(css)) !== null) {
    extracted += m[1].trim() + '\n\n';
  }
  writeFileSync(`${OUT_DIR}/${layer.out}`, extracted);
  console.log(`✓ ${layer.out} written (${extracted.split('\n').length} lines)`);
}

// Components layer split into chrome.css + pages.css using section markers
const compRe = /@layer\s+components\s*\{([\s\S]*?)\n\}/g;
let compContent = '';
let cm;
while ((cm = compRe.exec(css)) !== null) {
  compContent += cm[1].trim() + '\n\n';
}

// Heuristic split: lines containing `.sidebar`, `.top-chrome`, `.cmdk-`, `.breadcrumb`,
// `.nav-rail`, `.footer`, `.app-header`, `.app-footer` → chrome.css
// Lines containing `.page-`, `[data-page-personality`, `.bento-`, `.qcalc-`, `.cath-` → pages.css

const lines = compContent.split('\n');
const chromeLines = [], pagesLines = [];
let currentBlock = '';
let blockTarget = 'pages';  // default

for (const line of lines) {
  if (line.match(/[.#][a-z\-]+\s*\{/i) || line.match(/\[data-/)) {
    // New rule — decide target
    const sel = line.toLowerCase();
    if (sel.match(/sidebar|top-chrome|cmdk-|breadcrumb|nav-rail|app-header|app-footer|chrome|topbar/)) {
      blockTarget = 'chrome';
    } else if (sel.match(/page-|data-page-personality|bento-|qcalc-|cath-|stat-tile|kpi-/)) {
      blockTarget = 'pages';
    }
  }
  if (blockTarget === 'chrome') chromeLines.push(line);
  else pagesLines.push(line);
}

writeFileSync(`${OUT_DIR}/chrome.css`, chromeLines.join('\n'));
writeFileSync(`${OUT_DIR}/pages.css`, pagesLines.join('\n'));
console.log(`✓ chrome.css written (${chromeLines.length} lines)`);
console.log(`✓ pages.css written (${pagesLines.length} lines)`);
console.log('\n→ Manual review needed. Expect to move ~10-30 rules between chrome.css and pages.css.');
```

استخدمه:
```bash
node scripts/shatter-css.mjs
```

### Step 2 — Manual Review (critical)

افتح كل ملف، تحقق:

#### `tokens.css` checks

```bash
wc -l platform/assets/css/tokens.css       # ≥ 400
grep -c '\-\-' platform/assets/css/tokens.css  # ≥ 250 tokens
grep -c '\-\-chr-' platform/assets/css/tokens.css  # ≥ 120 (W21)
grep -c '\-\-tint-' platform/assets/css/tokens.css  # ≥ 45 (W21)
grep -c '\-\-type-voice-' platform/assets/css/tokens.css  # ≥ 18 (W20)
```

#### `base.css` checks

```bash
grep -c 'html\[' platform/assets/css/base.css   # ≥ 1
grep -c 'body' platform/assets/css/base.css     # ≥ 1
```

#### `utilities.css` checks

```bash
grep -c '\.tas-' platform/assets/css/utilities.css   # ≥ 16
grep -c '\.chr-' platform/assets/css/utilities.css   # ≥ 30
grep -c '\.h-' platform/assets/css/utilities.css     # ≥ 8
grep -c '\.life-' platform/assets/css/utilities.css  # ≥ 4
grep -c '\.rit-' platform/assets/css/utilities.css   # ≥ 8
```

#### `chrome.css` checks

```bash
grep -c '\.sidebar' platform/assets/css/chrome.css         # ≥ 1
grep -c '\.top-chrome\|\.app-header' platform/assets/css/chrome.css  # ≥ 1
grep -c '\.cmdk-' platform/assets/css/chrome.css           # ≥ 1
grep -c 'rit-halo-toggle' platform/assets/css/chrome.css   # ≥ 1
```

#### `pages.css` checks

```bash
grep -c 'data-page-personality' platform/assets/css/pages.css   # ≥ 30
grep -c '\.page-h' platform/assets/css/pages.css                # ≥ 1
grep -c '\.bento-' platform/assets/css/pages.css                # ≥ 1
grep -c '\.qcalc-' platform/assets/css/pages.css                # ≥ 1
```

#### `motion.css` checks

```bash
grep -c '@keyframes' platform/assets/css/motion.css            # ≥ 30
grep -c 'prefers-reduced-motion' platform/assets/css/motion.css # ≥ 20
grep -c '@media print' platform/assets/css/motion.css           # ≥ 1
```

### Step 3 — REPLACE `style.css` with entry

```css
/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — CSS Entry Point (Worker 23 / Phase 3)
   ────────────────────────────────────────────────────────────────────────
   Pack v3 architecture: 6 logical files imported into single cascade.
   Order: declarations → tokens → base → utilities → chrome → pages → motion
   Each @import lands in its declared @layer (HTTP cascade preserved).
   ════════════════════════════════════════════════════════════════════════ */

/* Declare layer order — MUST come first */
@layer reset, tokens, base, utilities, components, themes, overrides;

/* Themes layer (single inline — short, theme-critical) */
@layer themes {
  /* Will be populated from CSS shatter output if not already in pages.css */
  /* (W21 P2 dark Mihrab + W12 P2 light Linen-Bone live here) */
}

/* Imported layers */
@import url("./css/tokens.css")     layer(tokens);
@import url("./css/base.css")       layer(base);
@import url("./css/utilities.css")  layer(utilities);
@import url("./css/chrome.css")     layer(components);
@import url("./css/pages.css")      layer(components);
@import url("./css/motion.css")     layer(overrides);

/* End DEVOTIO v3 — CSS Entry Point ──────────────────────────────────── */
```

> **مهم:** `@import` داخل `@layer X` يَجعل كل قواعد الـ imported file تَدخل في `X`. هذا يَحفظ الـ cascade order من Phase 1.

### Step 4 — Verify in browser

```bash
# Network tab should show 6 file loads + style.css = 7 total
# All from same-origin (no CDN — Pack v3 offline guarantee)
# Visual: identical to pre-P3
```

### Step 5 — Move themes block (الجزء الذي بقي inline)

في style.css، نُبقي `@layer themes { ... }` inline (لأنه قصير ومُهم):

```css
@layer themes {
  /* Copy ONLY the dark + light theme blocks here from original style.css */
  :root[data-theme="dark"], html[data-theme="dark"], body[data-theme="dark"] {
    /* W21 P2 Mihrab dark — about 40 lines */
  }
  :root[data-theme="light"], html[data-theme="light"], body[data-theme="light"] {
    /* W12 P2 Linen-Bone — about 40 lines */
  }
}
```

> **بدلاً من** فصلها لـ `themes.css` منفصل، نُبقيها inline لأنها flag-related (theme switch is performance-critical).

### Step 6 — Cleanup script

```bash
# Remove temporary scripts after successful Phase 3
rm scripts/add-css-layers.mjs   # from P1 (no longer needed)
rm scripts/shatter-css.mjs      # one-shot, no longer needed
```

### Step 7 — Discipline Comment

في `style.css` (entry):

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 23 / Phase 3 — Shatter Discipline:
   1. ٦ ملفات + entry — لا تَخلق ملف سابع بدون phase-spec.
   2. كل ملف له purpose واحد — لا تَخلط chrome مع pages.
   3. @import order = cascade order. لا تَقلب الترتيب.
   4. themes inline في style.css — الـ flag-switch performance critical.
   5. لو احتجت قاعدة جديدة، اختر الملف المناسب — لا تَكتب في style.css.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# 6 files exist
ls platform/assets/css/                                            # → 6 files
wc -l platform/assets/css/*.css                                    # → ~7000 total

# style.css is now thin entry
wc -l platform/assets/style.css                                    # → ~30-50 lines

# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 28 (preserved)

# All tokens present
grep -h '\-\-' platform/assets/css/tokens.css | wc -l              # → ≥250

# Browser test:
# Network tab: 6 CSS file requests + 1 entry = 7 total, all same-origin
# Visual: identical to pre-P3
# Console: 0 errors
# Console: Upg.layer.audit() still shows 7 populated layers
```

---

## ✅ معايير القبول (Phase 3)

- [ ] 6 ملفات في `platform/assets/css/` (tokens, base, utilities, chrome, pages, motion).
- [ ] `style.css` = thin entry ~30-50 سطر.
- [ ] `@import url("./css/X.css") layer(Y);` لكل ملف.
- [ ] `@layer themes` inline في style.css (dark + light).
- [ ] جميع 7 layers populated.
- [ ] صفر visual regression.
- [ ] `Upg.layer.audit()` يَستمر يعمل.
- [ ] Cleanup scripts deleted.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/css/ platform/assets/style.css
git commit -m "phase 3 (devotio): css shatter — 23K monolith → 6 logical files (tokens/base/utilities/chrome/pages/motion) + thin entry style.css"
# push immediately

git rm scripts/add-css-layers.mjs scripts/shatter-css.mjs 2>/dev/null || true
git add -u
git commit -m "phase 3 (devotio): cleanup one-shot scripts" || true

git add state/PROGRESS.json state/snapshots/worker-23-phase-3.json
git commit -m "state: devotio phase 3 (worker 23) committed and pushed"
# push immediately
```

— نهاية Phase 3.

💎 **Devotion check:** هل CSS الآن قابل للصيانة؟ ٦ ملفات منطقية؟ صفر regression؟ → Phase 4 (HTML Template Split).
