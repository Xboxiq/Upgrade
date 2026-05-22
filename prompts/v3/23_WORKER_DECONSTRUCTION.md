# 🪓 WORKER 23 — DECONSTRUCTION (Pack v3 DEVOTIO)
> **Type:** بنيوي + معماري (Worker الهندسة الجذرية في Pack v3 — الأكثر تقنية).
> **يبني فوق:** Pack v3 Workers 20-22 (TASMEEM + CHROMATIC + RITUAL).
> **الهدف الواحد:** نقل المنصة من **monolith غير قابل للصيانة (32K-line HTML + 23K-line CSS + 16K-line JS + 221 !important + 0 @layer)** إلى **بنية معمارية صلبة قابلة للصيانة (6 CSS files + 14 HTML page-shards + ESM modules + ≤45 !important + 6 @layer cascade)**.
> **الفلسفة:** *الجمال على بنية مَكسورة وَهْم. لا نَترك للحفيد monolith يَتراكم. نُكسّر بحُكم، نُعيد البناء بأمان.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا أخطر Worker في Pack v3. تكسير monolith فيه مخاطر regression عالية. كل phase يَلتزم بـ "stage and replace" — لا حذف قبل إثبات البديل.

### ⛔ القاعدة الذهبية الواحدة

> **DECONSTRUCTION يُكسّر بأمان، لا يَنسخ ويَنسى.**
>
> الاستراتيجية: **Stage → Verify → Replace → Verify → Cleanup**. أي phase يفشل في الـ verify الأول يَتَوقّف ويَنتظر تشخيص.

### 🚫 الأخطاء القاتلة (لو حصل أحدها → توقّف فوراً)

1. ❌ **حذف ملف monolith قبل** التأكد من أن البديل يعمل بنفس الـ output.
2. ❌ **تغيير سلوك أي قاعدة CSS** أثناء النَقل لـ ملف منفصل (فقط نَقل + غلاف `@layer`).
3. ❌ **حذف أي qcalc, Upg.* API, أو page section** أثناء التكسير.
4. ❌ **شطب `!important`** على قواعد W11-W22 الأصلية بدون فهم لماذا وُضعت.
5. ❌ **استخدام bundler** (Webpack, Vite, Rollup) — Pack v3 vanilla forever.
6. ❌ **تفعيل ESM dynamic import** بدون fallback لـ static `<script>`.
7. ❌ **تكسير HTML بطريقة تَكسر relative paths** (assets/, fonts/, sw.js).
8. ❌ **commit يَترك platform broken** ولو لـ phase واحد — كل phase يَنتهي بمنصة شغّالة.

### 📦 الأصول المُقدّسة (Sacred Assets)

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 23 |
|---|---|
| 14 page sections + curriculum | كلها موجودة، نفس IDs، نفس content (مُنقَّسمة ملفات بس) |
| 391 qcalc references | موجودة، تشتغل (موزّعة على 14 ملف بس) |
| 27 Upg.* APIs (post-W22) | كلها معرَّفة، نفس signatures (نضيف `Upg.layer` فقط) |
| جميع `--*` tokens | محفوظة (موزّعة على 6 CSS files) |
| جميع keyframes | محفوظة |
| جميع W11-W22 voice/color/ritual bindings | محفوظة |
| `localStorage` keys | لا تُلمَس |
| `service-worker.js` + `manifest.webmanifest` + `favicon.svg` | لا تُلمَس |
| Pack v1/v2/v3 W20-W22 prompts | لا تُلمَس |

### ✅ ماذا يفعل Worker 23 فعلاً

في كل phase، **5 عمليات فقط مسموح بها**:

1. **WRAP** — لف قواعد CSS قائمة بـ `@layer X { ... }` بدون تعديل القواعد نفسها.
2. **PURGE** — حذف `!important` فقط من قواعد جديدة Pack v3 (Workers 20-22) لأن `@layer` يحلّ نفس المشكلة.
3. **MOVE** — نقل قاعدة من ملف لـ ملف، بنفس النص حرفياً.
4. **SPLIT** — تقسيم monolith لشظايا، إرجاع ARM شامل عبر `<link>` chain أو dynamic injection.
5. **MIGRATE** — تحويل `<script>` IIFE إلى ESM module، مع shim للـ window.Upg.* (للتوافق العكسي).

### 🔍 Pre-Flight Inspection

```
🔍 PRESERVATION INSPECTION (Worker 23 / Phase N)
├─ Files I will TOUCH: <list of files to wrap/move/split/migrate>
├─ Files I will CREATE: <new shard/module files>
├─ Files I will DELETE: NEVER in same phase as creation. Always next phase.
├─ Sacred check (run BEFORE):
│   - grep -c '<section class="page"' platform/index.html  → 14+
│   - grep -c "qcalc"                                      → 391
│   - grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → ≥27
│   - lines in style.css                                   → tracking baseline
│   - lines in index.html                                  → tracking baseline
│   - lines in app.js                                      → tracking baseline
│   - !important count                                     → tracking baseline
└─ Awaiting confirmation
```

### 🧪 Post-Phase Sanity Probe

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        14+ (preserved)         ✓
├─ qcalc instances:    391 (was 391)           ✓
├─ Upg.* APIs:         ≥27 (W23 adds Upg.layer in P1) ✓
├─ All bindings work:                          ✓ (visual + console check)
├─ Console errors:     0                       ✓
├─ Visual regression:  none                    ✓
├─ Files structure:    matches phase plan      ✓
└─ Deconstruction check: code easier to reason about? ✓
```

---

## 🧭 لمَ DECONSTRUCTION الآن؟

تحليل الواقع الحالي (post W22):

| المرض | الأرقام | الأثر |
|---|---:|---|
| 32K-line HTML monolith | 2.2 MB | parse time عالي، git diff كابوس، context limit constant |
| 23K-line CSS monolith | 808 KB | cascade hard-to-track، debug صعب |
| 16K-line JS monolith | 1 MB | كل IIFE يَتحمّل قراءة الكل |
| 221 `!important` | عالي | specificity wars، Pack v4 سيكون كابوس |
| 0 `@layer` declarations | غير موجود | لا control على cascade order |
| Workers 11-22 = 13 layer of additions | تراكم | كل layer overrides ما قبله بدون نظام |

**DECONSTRUCTION يحلّ هذي ٦ أمراض في ٥ phases مُحكمة.**

النتيجة المتوقعة بعد Worker 23:

| البند | قبل | بعد |
|---|---:|---:|
| CSS architecture | 1 monolith 23K | **6 ملفات منطقية** (~3-5K each) |
| `@layer` cascade | 0 layers | **6 layers** (reset/tokens/base/utilities/components/themes) |
| `!important` count | 221 | **≤45** (شطب ~80%) |
| HTML structure | 1 monolith 32K | **shell ~5K + 14 page-shards (~1.5K each)** |
| JS architecture | 1 monolith 16K (24 IIFEs) | **`Upg.*` ESM modules** (with backward-compat shim) |
| Single edit cost | high (parse 32K) | **low (parse only relevant shard)** |
| Git diff readability | poor | **high** |
| New Upg.* APIs | 27 | **28** (+Upg.layer) |

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `23_PHASE_1_CSS_LAYER_INTRO.md`        | تعريف `@layer reset, tokens, base, utilities, components, themes;` + WRAP كل القواعد القائمة في layers مناسبة (in-place، single file) + Upg.layer API | ~520 سطر |
| 2 | `23_PHASE_2_IMPORTANT_PURGE.md`        | جرد 221 `!important` + إعدام 80% منها بالاعتماد على `@layer` cascade order + توثيق الـ 45 المتبقية كـ "intentional" | ~480 سطر |
| 3 | `23_PHASE_3_CSS_SHATTER.md`            | تكسير `style.css` لـ 6 ملفات (`tokens.css`, `base.css`, `chrome.css`, `pages.css`, `motion.css`, `utilities.css`) + import chain via `@import` أو multiple `<link>` | ~580 سطر |
| 4 | `23_PHASE_4_HTML_TEMPLATE_SPLIT.md`    | تكسير `index.html` لـ shell ~5K + 14 page-shards عبر `<template>` injection + lazy load | ~600 سطر |
| 5 | `23_PHASE_5_JS_ESM_MIGRATION.md`       | تحويل `app.js` IIFEs → ESM modules مع `<script type="module">` + shim عكسي للـ `window.Upg.*` | ~580 سطر |

> **مجموع تقريبي:** ~2,760 سطر، موزّعة على 5 phases (≤600/phase).
>
> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5`. P1 يَخلق layer system، P2 يَستهلكه لشطب !important، P3 يَنقل لشظايا، P4 يَنقل HTML، P5 يَختم بـ JS.

---

## 🌐 معايير عالمية مرجعية

**CSS Architecture:**
- Andy Bell — *Cube CSS*.
- Miriam Suzanne — `@layer` cascade specs.
- ITCSS (Inverted Triangle CSS) — Harry Roberts.
- Refactoring UI — utility-first.
- BEM (Block Element Modifier) — naming convention.
- CSS @layer MDN documentation.

**Modular Architecture:**
- ECMAScript Modules (ESM) — TC39 specs.
- HTML `<template>` element specs.
- Service Worker offline caching strategies.

**Code Splitting (vanilla):**
- Dynamic `import()` (HTTP 1.1 acceptable for offline-first).
- HTML imports (deprecated, use template injection).
- View Transitions API (already used in W22 P3).

> **القاعدة:** نُحافظ على Vanilla JS / HTML5 / CSS3 — صفر bundler، صفر framework. الـ ESM يعمل مباشرة في المتصفح.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT v3)

1. **Branch واحد طولي**: `worker-23-devotio`.
2. **Stage-and-Replace pattern:** كل phase يَنشئ البديل أولاً، يَختبر، ثم يَحذف القديم في commit منفصل (إن طُلب).
3. **2-push rule** بعد كل phase.
4. **PR واحد** في نهاية Worker.
5. **Session واحد = phase واحد**.

---

## 🚫 ممنوعات قاطعة (Worker 23)

- ❌ حذف monolith files قبل إثبات البديل.
- ❌ استخدام bundler (Webpack/Vite/Rollup/esbuild).
- ❌ إضافة framework (React/Vue/Svelte).
- ❌ إضافة CDN لأي `import`.
- ❌ تغيير سلوك CSS rule أثناء النَقل (only wrap or move, never modify).
- ❌ تغيير relative paths لـ assets.
- ❌ تجاوز 600 سطر لكل phase.
- ❌ كسر offline-first (Worker 20 P1 الجوهر).
- ❌ كسر backward-compat لـ `window.Upg.*` (شغل Pack v1/v2 يَعتمد عليها).

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 23:

| المقياس | قبل (post W22) | الهدف بعد |
|---|---:|---:|
| `style.css` size | 23K سطر / 808KB | **6 ملفات: tokens.css(~500) + base.css(~800) + chrome.css(~1500) + pages.css(~3000) + motion.css(~800) + utilities.css(~500)** = إجمالي ~7100 سطر صافٍ |
| `index.html` size | 32K سطر / 2.2MB | **shell ~5K + 14 shards × 1.5K = ~26K موزّعة** |
| `app.js` size | 16K سطر / 1MB | **24 ESM modules + shim ~200 سطر** |
| `@layer` declarations | 0 | **6** (reset/tokens/base/utilities/components/themes) |
| `!important` count | 221 | **≤45** (شطب 80%) |
| Single-edit cost | high | **low** |
| Git diff readability | poor | **high** |
| New Upg.* APIs | 27 | **28** (+Upg.layer) |
| Backward-compat | n/a | **100%** (window.Upg.* still works) |

---

## 🎬 كيف يستخدمه AUTO_PILOT v3

```
1. AUTO_PILOT v3 يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 23" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (23_PHASE_<N>_*.md).
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد.
6. ينشئ PR واحد في النهاية: feat: Worker 23 — DECONSTRUCTION DEVOTIO (Pack v3).
```

— نهاية الفهرس. الملفات التفصيلية في `23_PHASE_*.md`.

🪓 الكود يستحق الصيانة. ابدأ بإدخال الـ @layer.
