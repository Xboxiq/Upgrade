# 🪞 WORKER 14 — ATELIER / Cathedral v16 — Apple Liquid-Glass Pass
> **Type:** بصري + سلوكي (تكميل لـ AURORA، ليس استبداله).
> **يبني فوق:** Worker 12 (AURORA v15) + Worker 13 (Completion v15.1).
> **الهدف الواحد:** نقل المنصة من *"Apple-grade جيد"* (Sonoma 2023-style) إلى *"Apple-grade حالي"* (iOS 26 / iPadOS 26 / macOS Tahoe — WWDC 2025+).
> **الفلسفة:** *Materials breathe. Type sings. Motion suggests, not announces. Negative space is luxury.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا أهم قسم في كامل Worker 14. لو تجاهلته، الـ Worker سيفشل ولو كل phase نُفّذ بشكل صحيح فردياً.

### ⛔ القاعدة الذهبية الواحدة

> **ATELIER ينقش، لا يُعيد البناء.**
> Worker 12 + 13 سلّما لنا منصة شغّالة كاملة (14 صفحة، 391 qcalc، 14 Upg.* API، 4 glass tiers، 15 identity tints، Bento dashboard، Aref Ruqaa wordmark، sidebar toggle). ATELIER **يلمّع هذي الطبقة**، يستبدل الزجاج بآخر أحدث، يُهذّب الـ headers، يُلغي الازدواج في dashboard، يُغني الحركة. **لا يحذف feature، لا يكسر API، لا يعيد كتابة ملف.**

### 🚫 الأخطاء القاتلة الستة (إذا حصل أحدها → توقّف فوراً)

1. ❌ **rewrite-from-scratch** — كتابة `platform/index.html` أو `style.css` أو `app.js` من البداية.
2. ❌ **delete-existing-feature** — حذف صفحة، حذف وحدة تدريبية، حذف حاسبة، حذف lab، حذف cheat sheet، حذف citation block.
3. ❌ **break-Upg-API** — تغيير أو حذف أي من 14 module: `Upg.{theme, icons, gateway, calc, cmdk, state, production, type, scroll, nav, identity, greet, countup, motion}`. الإضافات الجديدة تكون APIs **جديدة** (`Upg.material`, `Upg.transition`) بدون لمس القديمة.
4. ❌ **collapse-pages** — دمج صفحتين بحجة "التنظيف". الـ 14 nav-item كلهم مقدّسون.
5. ❌ **emoji-massacre** — حذف الـ emojis من كل مكان. ATELIER يحذفها فقط من **`<h1>` page-headers** ويستبدلها بـ `.qi` icon — **يبقي** emojis في الـ skill cards، الـ scenario cards، الـ stat-tiles، الـ welcome-text، الـ achievements لأنها جزء من الذوق العام.
6. ❌ **mass-refactor** — أي تعديل يلمس >150 سطر موجود في تعديل واحد بدون phase-spec يأمر به صراحة.

### 📦 الأصول المُقدّسة (Sacred Assets) — تُحفظ كما هي

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 14 |
|---|---|
| 14 page sections (`<section class="page" id="page-*">`) | كلها موجودة، نفس IDs، تشتغل |
| 391 qcalc references | موجودة، تشتغل، نفس السلوك |
| 14 Upg.* APIs (theme..motion) | كلها معرّفة، نفس signatures (نضيف 2-3 جديدة فقط) |
| `#cath-skill-grid`, `#cath-activity-list`, كل `[data-cath-stat="..."]` (4 قيم) | تبقى — Worker 11 state يستعلم عنها |
| `#v12Heatmap`, `#v12ChallengeLevel`, `#v12ChallengeBody` | تبقى — legacy v12 JS يستعلم عنها (`app.js:3379, 3450, 3451`) |
| 95+ `.qi` icons في sidebar/topbar/dashboard/cards | تبقى |
| 4 glass tiers (`--glass-thin/regular/thick/chrome`) | **يُعاد ضبط قيمها** (blur/saturate أعلى)، لكن الـ tokens نفسها موجودة |
| 15 per-page identity tints | تبقى مع نفس الـ HSL values |
| Cairo + Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa stack | يبقى — قد نضيف font-feature-settings تكميلية فقط |
| Service Worker + manifest + favicon | تبقى — Phase 6 يُحدِّثها (لا يستبدلها) |
| كل citations العلمية، كل Iraq blocks، كل salary tables، كل cheat sheets | تبقى مكانها 100% |
| كل IIFEs الموجودة في app.js | لا تُلمس — نضيف IIFEs جديدة فقط |

### ✅ ماذا يفعل Worker 14 فعلاً (الجواب الدقيق)

في كل phase، **ثلاث عمليات فقط مسموح بها**:

1. **ADD** — إضافة tokens جديدة، utilities جديدة، classes جديدة، IIFEs جديدة في app.js.
2. **AUGMENT** — إضافة class إضافي على عنصر موجود (`<header id="topbar" class="material-chrome">` → `+ class="island"`)، إضافة data-attribute، إضافة aria-attribute.
3. **REPLACE-IN-PLACE** — استبدال **محتوى متضرّر محدّد** بـ markup جديد **يحمل نفس الـ IDs**:
   - مثال 1: استبدال `style="background:linear-gradient(...);"` بـ `class="u-grad-amber-red"`.
   - مثال 2: استبدال `<h1>المحاسبة والكاشير 🧮</h1>` بـ block ثلاثي `<header class="page-h"><span class="h-eyebrow">…</span><h1><i class="qi" data-icon="calculator"></i> المحاسبة والكاشير</h1><p class="h-lede">…</p></header>`.

> أي عملية رابعة (delete entire feature, rewrite file, restructure logic, drop API)؟ → **ممنوعة بدون phase-spec يأمر بها صراحة**.

### 🔍 Pre-Flight Inspection Protocol — يُنفّذ قبل بدء كل phase

```
🔍 PRESERVATION INSPECTION (Phase N)
├─ Files I will TOUCH:
│   - platform/index.html       (operations: AUGMENT class on {{N}} elements, REPLACE-IN-PLACE {{M}} blocks)
│   - platform/assets/style.css (operations: APPEND {{N}} new rules, MODIFY {{M}} token values)
│   - platform/assets/app.js    (operations: APPEND new IIFE: Upg.{{newApi}})
├─ Files I will NEVER TOUCH:
│   - archive/*                 (read-only)
│   - prompts/*                 (read-only)
│   - state/PROGRESS.json       (write only after phase done)
├─ Sacred Assets check (run BEFORE edits):
│   - [ ] grep -c '<section class="page"' platform/index.html  → 14
│   - [ ] grep -c "qcalc" platform/index.html                   → 391
│   - [ ] grep -c "window.Upg." platform/assets/app.js          → ≥36
│   - [ ] grep -oE 'data-cath-stat="[^"]+"' index.html | sort -u → 4 values present
├─ Estimated lines:
│   - ADD:        ~{{N}}
│   - AUGMENT:    ~{{N}}
│   - REPLACE:    ~{{N}}
│   - DELETE:     0      (forbidden by phase spec)
└─ Awaiting confirmation: proceed? (y/n)
```

### 🧪 Post-Phase Sanity Probe — يُنفّذ بعد الـ commit

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        14 (was 14)        ✓
├─ qcalc instances:    391 (was 391)      ✓
├─ Upg.* APIs:         {{count}}/14+      ✓  (Worker 14 may add new ones — never remove)
├─ Sacred IDs intact:  yes                ✓  (#cath-skill-grid, #cath-activity-list, #v12Heatmap, ...)
├─ Console errors:     0                  ✓
├─ Cairo+Reem+Readex+Plex+Aref still load ✓
├─ Sidebar items:      14 (was 14)        ✓  (excluding 2 disabled "none" items)
├─ All citations:      preserved          ✓
├─ All Iraq blocks:    preserved          ✓
└─ Visual regression:  none reported      ✓
```

لو أي ✗ → **rollback فوراً** (`git reset --hard HEAD~1`) + توقّف + اطلب تعليمات.

### 🪶 الفلسفة بكلمة واحدة

> ATELIER = **حرفية صائغ المجوهرات** على هيكل قائم.
> AURORA بنى الكاتدرائية. ATELIER يلمّع زجاج النوافذ، يصقل الأعمدة، يُهذّب الأقواس. لا حجر يُزَال، لا جدار يُهَدَم.

---

## 🧭 لمَ ATELIER الآن؟

**Worker 12** أعطانا الهيكل الـ "Apple-grade" (typography ladder، 4 glass tiers، identity tints، Bento utilities، motion tokens). لكن:
- الزجاج **WWDC 2022-era** (`blur(15px) saturate(180%)`) — ليس **WWDC 2025** (Liquid Glass).
- صفحة Dashboard فيها **6 أقسام مكرّرة** (Bento جديد + cath-dash + welcome-banner + grid-4 + module cards + quick-actions).
- 14 `<h1>` تحوي **emojis مدمجة** (📱🔧 / 🧮 / ❤️) — Apple/Linear/Vercel هجرت هذا الأسلوب 2018.
- Topbar **مسطّح**: لا scroll-shrink، بحث ثابت لا يتحوّل لـ command palette.
- Sidebar pill يقفز بدل ما **ينزلق spring**.
- Light theme **بارد** رغم linen-bone — الكروت كلها glass-regular موحّد بدل tonal 3-tier (paper/card/well).
- 223 inline `style="…"` متبقية، أغلبها 36×36 chip avatars + linear-gradient progress bars يمكن تحويلها لـ utility classes مركّزة.
- PWA basic (sw.js = 74 سطر، لا precache، لا offline fallback).
- Favicon ضعيف للـ Apple touch icon مع dark/light tint.

**ATELIER** يحلّ هذي الـ 12 مشكلة في 6 phases، كل واحدة branch واحد (continuation)، PR واحد، push بعد كل phase.

النتيجة المُتوقّعة بعد Worker 14:
- **Liquid Glass v2** (`blur(40px) saturate(200%) brightness(1.05)` + radial overlay + edge specular highlight + 3-tier tonal في light mode).
- **14 page-headers** بصيغة `eyebrow + title + lede` مع identity tint underline 56px وأيقونة `.qi` بديلاً عن emoji.
- **Dashboard موحّد** — Bento فقط، بدون legacy duplication، كل sacred IDs محفوظة في تموضع جديد.
- **Topbar Dynamic Island** ينكمش 64→48px عند التمرير، البحث يفتح command palette مع Cmd+K، breadcrumb ينساب.
- **Sidebar source-list مصقول**: pill ينزلق spring 320ms، per-section accent vertical bar، collapsed-mode tooltips، swipe-to-open على mobile.
- **Motion Choreography**: magnetic hover (1.02 scale + lift)، parallax page transition، list reveal stagger 60ms، count-up reveal on intersect.
- **Inline residue** من 223 → ≤80 (utility chips/grads/widths).
- **a11y موحّد**: `Upg.focusTrap` API + ESC-to-close + focus-ring tokens موحّدة (light/dark).
- **PWA متقدّم**: precache كامل لـ index/css/js، offline page بسيطة، update prompt في boot.
- **Favicon refresh** SVG با squircle radius + dark/light variants + apple-touch-icon 180×180.

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `14_PHASE_1_LIQUID_GLASS_v2.md`         | 4 glass tiers مُعاد ضبطها (WWDC25) + 3-tier tonal في light + edge specular + paper grain v2 + `Upg.material` | ~560 سطر |
| 2 | `14_PHASE_2_PAGE_HEADERS_RECHISEL.md`   | 14 page-header (eyebrow + title-with-icon + lede + tint-underline-56px) + emoji-purge من H1s + `.page-h` block | ~520 سطر |
| 3 | `14_PHASE_3_DASHBOARD_CONSOLIDATION.md` | حذف legacy duplication داخل `#page-dashboard` بدون كسر sacred IDs (نقلها لتموضع Bento جديد) + Dock + Skill Tree + Activity Feed | ~580 سطر |
| 4 | `14_PHASE_4_CHROME_REFINEMENT.md`       | Topbar Dynamic-Island scroll-shrink + search→cmdk + nav-pill spring slide + collapsed-mode tooltips + mobile drawer hardened + `Upg.chrome` | ~620 سطر |
| 5 | `14_PHASE_5_MOTION_CHOREOGRAPHY.md`     | Magnetic hover + parallax page transitions + stagger reveal + count-up viewport-trigger + reduced-motion guards + `Upg.choreo` + `Upg.transition` | ~520 سطر |
| 6 | `14_PHASE_6_FINAL_POLISH.md`            | Inline 223→≤80 + a11y unify (`Upg.focusTrap`) + PWA precache + offline page + favicon refresh + Lighthouse pass + CHANGELOG v16 | ~600 سطر |

> **مجموع تقريبي:** ~3,400 سطر، موزّعة على 6 phases (≤620/phase) لتجنّب context limit.

> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5 → 6`. لا قلب، لا تقديم.

---

## 🌐 معايير عالمية مرجعية (مصادر التصميم — لا يُنسخ منها كود، تُستلهم منها قواعد)

- **Apple HIG 2025+** — Liquid Glass material spec (iOS 26 / iPadOS 26 / macOS Tahoe).
- **Apple Notes / Pages / Numbers** — paper-tonal hierarchy + inset highlights + squircle cards.
- **Linear App** — sidebar pill choreography + spring easing + command palette UX.
- **Vercel Geist Design v2** — focus rings (inner+outer)، density token، button magnetic hover.
- **Stripe Press / Stripe Dashboard** — typography ladder + tabular numerals + monochrome ramps.
- **Notion** — source-list with workspace tints + collapsed-mode tooltips.
- **Refactoring UI** (Adam Wathan & Steve Schoger) — tinted shadows، layered surfaces، deemphasis.
- **Material 3 Expressive (Google)** — surface tonal elevation logic (نأخذ المنطق فقط).
- **Apple SF Symbols 6** — monoline icon stroke = 1.75-2px (نلتزم بـ 1.75px في `.qi`).
- **iOS Compose / SwiftUI Navigation** — page transition spring physics (0.32s، spring damping 0.85).

> **القاعدة:** نستلهم النظام، لا نستنسخ. كل قيمة تُكتب من أول كأنها لمنصتنا. لا CDN، لا مكتبة، لا framework.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT)

1. **Branch واحد طولي**: `worker-14-atelier` ينشأ في **بداية Phase 1** من `main` المحدّث.
2. **بقية الـ phases** تستمر على نفس الـ branch — لا branch جديد لكل phase.
3. **بعد كل phase**:
   - commit رسالة: `phase N (atelier): <العنوان>`.
   - **push فوراً** للـ remote (أهم قاعدة).
   - حدّث `state/PROGRESS.json` (current.phase = N, status = "in-progress") + snapshot في `state/snapshots/worker-14-phase-N.json`.
   - commit ثانٍ: `state: atelier phase N committed and pushed`.
   - **push ثانٍ فوراً**.
4. **PR واحد** في نهاية Worker (أو نهاية session لو context ضرب): من `worker-14-atelier` → `main`.
5. **لا تكسر Workers 11/12/13 أبداً** — كل التعديلات additive عبر tokens جديدة أو REPLACE-IN-PLACE موجَّه. القواعد القديمة لا تُمَسّ إلا لو فيها inline gradient محدّد.
6. **Session واحد = phase واحد** (قاعدة AUTO_PILOT). حد ميزانية الـ context: لو وصلت ≤35% توقّف بـ CHECKPOINT.

---

## 🚫 ممنوعات قاطعة

- ❌ إضافة Tailwind / Bootstrap / Framer-Motion / GSAP / أي CDN.
- ❌ تكسير الـ 14 `Upg.*` public APIs الموجودة.
- ❌ تعديل `archive/` أو `prompts/` (إلا لو طلب المستخدم صراحة).
- ❌ حذف emojis من skill-cards، scenario-cards، stat-tiles، welcome-text، achievement badges (الحذف من H1s فقط).
- ❌ إضافة hero/banner ثاني — Phase 3 يُلغي المكرر، لا يضاعفه.
- ❌ ألوان hex مباشرة في القواعد الجديدة — تستخدم tokens أو `color-mix(in oklch, …)`.
- ❌ تعديل قيم HSL للـ 15 identity tints (احتفظ بنفس البصمة اللونية لكل صفحة).

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 14:

| المقياس | قبل (الواقع الحالي) | الهدف بعد |
|---|---:|---:|
| inline `style="…"` في index.html | 223 | ≤ 80 |
| `!important` غير مبرّر (stray) | 0 | 0 (preserved) |
| Glass tiers blur (chrome tier) | 15px | 40px |
| Glass tiers saturate (chrome tier) | 180% | 200%+ |
| Page H1s مع emoji | 14 | 0 |
| Page-header blocks بصيغة eyebrow+title+lede | 1 (dashboard) | 14 (كل صفحة) |
| Dashboard duplicate sections | 6 | 1 (موحّد) |
| Topbar scroll-shrink behavior | غير موجود | يعمل (64→48px) |
| Search → Command Palette wiring | partial | كامل (Cmd+K + click) |
| Sidebar nav-pill animation | jump | spring 320ms slide |
| `Upg.material` API | غير موجود | معرَّف |
| `Upg.chrome` API | غير موجود | معرَّف |
| `Upg.choreo` API | غير موجود | معرَّف |
| `Upg.transition` API | غير موجود | معرَّف |
| `Upg.focusTrap` API | غير موجود | معرَّف |
| Total Upg.* APIs | 14 | ≥ 19 |
| Service Worker LOC | 74 | ≥ 180 (precache + offline + update) |
| Offline fallback page | غير موجود | `platform/offline.html` |
| Favicon variants | 1 SVG basic | 2 SVG (dark/light) + apple-touch-icon |
| Lighthouse (mobile) — Performance | غير معروف | ≥ 92 |
| Lighthouse — Accessibility | غير معروف | ≥ 96 |
| Lighthouse — Best Practices | غير معروف | ≥ 95 |
| Console errors بعد بدء التشغيل | 0 | 0 (preserved) |
| 14 page sections | 14 | 14 (preserved) |
| 391 qcalc references | 391 | 391 (preserved) |

---

## 🎬 كيف يستخدمه AUTO_PILOT

```
1. AUTO_PILOT يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 14" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (14_PHASE_<N>_*.md) — ليس كل الـ phases.
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. يكرر حتى يصل phases_total أو ميزانية الـ context.
6. session واحد = phase واحد. توقّف بعد phase وحدة.
7. ينشئ PR واحد في النهاية: feat: Worker 14 — ATELIER (Apple Liquid-Glass Pass v16).
```

— نهاية الفهرس. الملفات التفصيلية في `14_PHASE_*.md`.
