# 📱 WORKER 24 — DUAL-FORM (Pack v3 DEVOTIO)
> **Type:** سلوكي + لمسي + طباعي (Worker الجسد المزدوج — موبايل + ديسكتوب + ورق).
> **يبني فوق:** Pack v3 Workers 20-23 (TASMEEM + CHROMATIC + RITUAL + DECONSTRUCTION).
> **الهدف الواحد:** نقل المنصة من **ديسكتوب-أولاً مع موبايل ثانوي** إلى **ثلاثة أجسام مُتساوية الكرامة: ديسكتوب + موبايل (native gestures + haptic) + ورق (print signature لكل صفحة)**.
> **الفلسفة:** *الجسد له ٣ أشكال. كل شكل يَستحق صياغة كاملة، لا fallback. الموبايل ليس desktop مُصغَّر — هو وَسط حِسّي مختلف. الورق ليس screenshot — هو نَفَس آخر للمحتوى.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا آخر Worker في Pack v3. Stakes عالية لأن أي error يَكسر الـ desktop UX المُكتمل.

### ⛔ القاعدة الذهبية الواحدة

> **DUAL-FORM يُضيف أجساماً، لا يَستبدل واحداً.**
>
> Pack v1+v2+v3 W20-W23 سلَّمت ديسكتوب مُكتمل. Worker 24 يُضيف:
> 1. **Mobile-native** (bottom nav + swipe + haptic + dvh + safe-area).
> 2. **Print-native** (15 print signature per page).
>
> الديسكتوب يبقى كما هو، يَكتسب فقط `vh` → `dvh` upgrade (آمن).

### 🚫 الأخطاء القاتلة (لو حصل أحدها → توقّف فوراً)

1. ❌ **استبدال** sidebar الديسكتوب بـ bottom nav (موبايل-only — desktop يَبقى sidebar).
2. ❌ **تفعيل swipe على ديسكتوب** — يَكسر النَقر.
3. ❌ **Haptic بدون permission/opt-in** — يجب أن يكون `Upg.touch.haptic.enable()` صراحةً.
4. ❌ **`vh` يبقى** بعد W24 P1 — كله `dvh` (مع fallback `vh`).
5. ❌ **Print بدون tint identity** — كل صفحة تَطبَع بهويتها (W21 P5 baseline + W24 P5 deepens).
6. ❌ **تجاوز touch target 44×44px** على أي عنصر تفاعلي في موبايل.
7. ❌ **خَلط media queries مع container queries بشكل عشوائي** — استخدم `@media` للـ viewport، `@container` للـ component.
8. ❌ **تجاوز 600 سطر لكل phase**.

### 📦 الأصول المُقدّسة (Sacred Assets)

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 24 |
|---|---|
| 14 page sections + curriculum | كلها موجودة، نفس IDs، نفس content |
| 391 qcalc references | موجودة، تشتغل (mobile + desktop) |
| 29 Upg.* APIs (post-W23) | كلها معرَّفة (نضيف `Upg.touch` فقط) |
| Desktop sidebar | موجود، unchanged |
| Desktop chrome (top bar, breadcrumbs) | موجود، unchanged |
| @layer cascade (W23 P1) | موجود، W24 يَكتب في `components` و `overrides` |
| Service Worker | محفوظ — W24 يُحدّث pre-cache list فقط |

### ✅ ماذا يفعل Worker 24 فعلاً

في كل phase، **3 عمليات فقط مسموح بها**:

1. **ADD** — utility classes, tokens, IIFE/ESM modules (in @layer مناسب).
2. **AUGMENT** — إضافة data-attributes أو classes على عناصر موجودة (e.g., `data-dual-touch`).
3. **EXTEND** — تمديد API موجود بدون كَسر signature.

### 🔍 Pre-Flight Inspection

```
🔍 PRESERVATION INSPECTION (Worker 24 / Phase N)
├─ Files I will TOUCH: <list>
├─ Sacred check (run BEFORE):
│   - grep -c '<section class="page"' platform/pages/*.html | awk -F: '{sum+=$2}'  → 14+
│   - grep -c "qcalc" platform/pages/*.html | awk -F: '{sum+=$2}'                 → 391
│   - grep -oE 'window\.Upg\.[a-z]+' platform/assets/js/*.js | sort -u | wc -l    → ≥29
│   - grep -c '100vh' platform/assets/css/*.css                                    → tracking
│   - grep -c '@media print' platform/assets/css/motion.css                        → ≥1
└─ Awaiting confirmation
```

### 🧪 Post-Phase Sanity Probe

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        14+ ✓
├─ qcalc instances:    391 ✓
├─ Upg.* APIs:         ≥29 (W24 adds Upg.touch) ✓
├─ Console errors:     0 ✓
├─ Visual regression:  none on desktop ✓
├─ Mobile UX:          all touch targets ≥44px ✓
├─ Print preview:      readable, no aurora bg leakage ✓
└─ Dual-form check: does the platform feel native on mobile + print? ✓
```

---

## 🧭 لمَ DUAL-FORM الآن؟

تحليل الواقع الحالي:

- ✋ **`vh` everywhere** — على موبايل safari/chrome، الـ vh يَتغيّر مع الـ address bar = jumpy UX.
- ✋ **لا bottom nav** — موبايل users يَضطرون لـ open sidebar (slow + unnatural).
- ✋ **لا swipe gestures** — navigate بين الصفحات يَتطلَّب tap نَجم في sidebar.
- ✋ **لا haptic** — feedback خَفي، لا signature لمسي.
- ✋ **Print stylesheet عام** — كل صفحة تَطبَع بنفس الشكل (لا hero gradient بهوية، لا header signature).
- ✋ **command palette (Cmd+K) لا يعمل بـ touch** — desktop-only currently.

**DUAL-FORM يحلّ هذي ٦ مشاكل في ٥ phases.**

النتيجة المتوقعة بعد Worker 24:

| البند | قبل | بعد |
|---|---|---|
| `vh` usage | ~20+ | **0** (كله `dvh` مع fallback) |
| Safe-area handling | غير موجود | **`env(safe-area-inset-*)` على chrome + bottom nav** |
| Bottom nav (mobile) | غير موجود | **متوفّر (5 primary destinations)** |
| Swipe gestures | 0 | **3** (page-swipe between pages, calc-swipe between qcalc, dismiss-swipe for halo) |
| Haptic patterns | 0 | **5** (tap, success, warn, error, longpress) |
| Print signatures per page | 1 generic | **15** (per-personality hero + tint + footer) |
| Touch targets ≥44px | غير مضمون | **100% on interactive** |
| New Upg.* APIs | 29 | **30** (+Upg.touch) |

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `24_PHASE_1_DVH_SAFE_AREA.md`         | استبدال جميع `vh` بـ `dvh` (with fallback) + إضافة `env(safe-area-inset-*)` على chrome + tokens | ~440 سطر |
| 2 | `24_PHASE_2_BOTTOM_NAV.md`             | bottom nav للموبايل (5 destinations) + RTL-aware + visible only on `@media (max-width: 720px)` | ~480 سطر |
| 3 | `24_PHASE_3_SWIPE_GESTURES.md`         | PointerEvents-based swipe (page-swipe, calc-swipe, dismiss) + `Upg.touch.swipe` API | ~480 سطر |
| 4 | `24_PHASE_4_HAPTIC_LAYER.md`           | Vibration API patterns (5 patterns) + `Upg.touch.haptic` API + opt-in via toggle | ~380 سطر |
| 5 | `24_PHASE_5_PRINT_ATELIER.md`          | 15 per-personality print signature (hero gradient + identity tint + footer) + page-break refinement | ~460 سطر |

> **مجموع تقريبي:** ~2,240 سطر، موزّعة على 5 phases (≤480/phase).
>
> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5`. P1 يَفتح dvh foundation، P2 يَبني bottom nav فوقها، P3 يَضيف swipe، P4 يَضيف haptic، P5 يَختم بطباعة.

---

## 🌐 معايير عالمية مرجعية

**Mobile-First:**
- Apple iOS HIG — Touch targets, gestures, haptics.
- Material Design Mobile — bottom navigation specs.
- Safari Mobile Web Apps — `viewport-fit=cover` + safe areas.
- Linear Mobile App — gesture choreography.
- Stripe Mobile Checkout — touch precision.

**Modern Viewport:**
- CSS `dvh` / `dvw` / `dvmax` (dynamic viewport units) — caniuse 2024.
- `@viewport` meta + `viewport-fit=cover`.

**Touch Gestures (vanilla):**
- Pointer Events spec (W3C).
- TouchEvents API (legacy, fallback only).
- Swipe threshold conventions (40-60px).

**Haptic:**
- Vibration API (W3C) — limited to short patterns.
- iOS-style haptic patterns (subtle, never long).

**Print:**
- CSS Paged Media (`@page`).
- print-color-adjust property.
- page-break-* (legacy) and break-* (modern).

> **القاعدة:** نُحافظ على Vanilla — صفر library (Hammer.js, etc). PointerEvents كافي.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT v3)

1. **Branch واحد طولي**: `worker-24-devotio`.
2. **2-push rule** بعد كل phase.
3. **PR واحد** في نهاية Worker.
4. **Session واحد = phase واحد**.
5. **اختبار حقيقي** على موبايل بعد كل phase (ليس devtools emulator فقط).

---

## 🚫 ممنوعات قاطعة (Worker 24)

- ❌ استبدال desktop sidebar بـ bottom nav.
- ❌ swipe على desktop.
- ❌ haptic بدون opt-in.
- ❌ touch target < 44px.
- ❌ vh يَبقى بعد P1.
- ❌ إضافة gesture library خارجية.
- ❌ تكسير backward compat لـ Pack v1/v2/v3 W20-W23.
- ❌ تجاوز 600 سطر لكل phase.

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 24:

| المقياس | قبل (post W23) | الهدف بعد |
|---|---:|---:|
| `vh` references | ~20 | **0** ✓ |
| `dvh` references | 0 | **~20+** |
| `env(safe-area-inset-*)` | 0 | **≥6** (chrome + nav + footer) |
| Bottom nav | غير موجود | **متوفّر, RTL-aware** |
| Swipe variants | 0 | **3** |
| Haptic patterns | 0 | **5** |
| Print per-page signature | 1 generic | **15** (per-personality) |
| Touch targets ≥44px | unverified | **100%** ✓ |
| New Upg.* APIs | 29 | **30** (+Upg.touch) |

---

## 🎬 كيف يستخدمه AUTO_PILOT v3

```
1. AUTO_PILOT v3 يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 24" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (24_PHASE_<N>_*.md).
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد.
6. ينشئ PR واحد في النهاية: feat: Worker 24 — DUAL-FORM DEVOTIO (Pack v3) — Pack v3 COMPLETE.
```

— نهاية الفهرس. الملفات التفصيلية في `24_PHASE_*.md`.

📱 الجسد له ٣ أشكال. ابدأ من الأرض الصلبة (dvh).
