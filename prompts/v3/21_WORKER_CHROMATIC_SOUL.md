# 🎨 WORKER 21 — CHROMATIC SOUL (Pack v3 DEVOTIO)
> **Type:** بصري + ثقافي + معماري (Worker اللون الجذري في Pack v3).
> **يبني فوق:** Cathedral v16 ATELIER + Resonance v2 + TASMEEM Worker 20 (مدموج).
> **الهدف الواحد:** نقل المنصة من **باليت aurora-cliché (teal/cyan/violet عام)** إلى **١٢ صبغة عربية أصيلة + Mihrab dark + إعادة توزيع ١٤ tint** بهوية ثقافية مُتجذّرة.
> **الفلسفة:** *اللون ليس زينة. هو ذاكرة. لازوردي قبة الصخرة، زعفران المطبخ، حنّاء الأعراس، نِيلي الجزيرة. الواجهة الحقيقية تحكي بلوْنها قبل بحرفها.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا أهم قسم في Worker 21. اللون يخدع — صبغة واحدة خاطئة على dashboard hero تخرّب التجربة كلها. كل قيمة `oklch` تُحسَب، لا تُخمَّن.

### ⛔ القاعدة الذهبية الواحدة

> **CHROMATIC SOUL يُغذّي الجذر، لا يُلوّن السطح.**
>
> Cathedral v16 + Resonance v2 + TASMEEM Worker 20 سلَّمت لنا 15 identity tints عاملة، وbaseline aurora-style. Worker 21 **يُجدّد قيم الـ tints** (لا أسماء) ويستبدل dark base بـ Mihrab Indigo، **بدون** كسر أي color binding من Pack v1/v2.

### 🚫 الأخطاء القاتلة (لو حصل أحدها → توقّف فوراً)

1. ❌ **حذف أو إعادة تسمية** أي من 15 `--tint-*` tokens (الأسماء مقدّسة، القيم تتغيّر).
2. ❌ **حذف أو إعادة تسمية** أي من `--color-*` tokens الأساسية (`--color-bg`, `--color-surface-0/1/2/3`, `--color-text`, `--color-brand`, `--color-success/warning/danger/info`).
3. ❌ **تكسير** الـ off-white light theme من Worker 12 P2 (Aurora Linen-Bone) — Phase 2 يستبدل **dark فقط**.
4. ❌ **استخدام hex** (`#RRGGBB`) مباشرة في القيم الجديدة — كله `oklch()` أو `hsl()` المعتمدة.
5. ❌ **خلط `oklch` مع `oklab`** في `color-mix` — اختر `oklch` كقاعدة موحَّدة.
6. ❌ **تعديل `--tint-*` HSL syntax إلى `oklch`** بدون wrapper — التوافق العكسي مطلوب.
7. ❌ **تجاوز contrast ratio 4.5:1** على text/bg pairs — WCAG AA إجباري.

### 📦 الأصول المُقدّسة (Sacred Assets)

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 21 |
|---|---|
| 14 page sections (15 مع curriculum) | كلها موجودة، نفس IDs |
| 391 qcalc references | موجودة، تشتغل |
| 25 Upg.* APIs (post-W20) | كلها معرَّفة، نفس signatures (نضيف `Upg.chroma` فقط) |
| 15 `--tint-<page>` token names | موجودة، **تُحدَّث قيمها فقط** (HSL → oklch مع wrapper) |
| 15 `data-page-personality` | موجودة، تستهلك tints الجديدة |
| `--color-bg`, `--color-surface-0/1/2/3` | موجودة، **dark values تُستبدل** بـ Mihrab |
| `--color-text`, `--color-text-muted/faint` | موجودة، تتكيّف لـ Mihrab dark |
| `--color-brand`, `--color-brand-hover/soft/strong` | موجودة، **تُستبدل** بـ Lapis (Pack v3 brand) |
| `--color-success/warning/danger/info` | موجودة، tweaked قيم لـ oklch (نفس مظهر تقريباً) |
| `--shadow-c-sm/md/lg/xl` (W12 tinted shadows) | موجودة، tints تتكيّف |
| Off-White Linen-Bone (W12 P2 light theme) | موجود، **محفوظ بالكامل** — Phase 2 يلمس dark فقط |
| 9 voice tokens + 9 fonts (W20) | موجودة، اللون يأخذ tint منها |

### ✅ ماذا يفعل Worker 21 فعلاً

في كل phase، **3 عمليات فقط مسموح بها**:

1. **ADD** — إضافة 12 palette tokens جديدة (`--chr-lapis-50..900`, `--chr-saffron-*`, ...)، Mihrab dark variants، gradient tokens، utility classes.
2. **REPLACE-IN-PLACE** — استبدال **قيم** (لا أسماء) لـ:
   - `--tint-*` (15) — من HSL aurora إلى oklch عربي.
   - `--color-bg`, `--color-surface-*` في dark theme — إلى Mihrab Indigo.
   - `--color-brand` — إلى Lapis.
3. **AUGMENT** — إضافة class `chr-tint-<color>` على ≤14 عنصر اختياري + `data-chr-mood` على personalities.

> أي عملية رابعة (delete tint, rename color, rewrite light theme)؟ → **ممنوعة بدون phase-spec يأمر بها**.

### 🔍 Pre-Flight Inspection

```
🔍 PRESERVATION INSPECTION (Worker 21 / Phase N)
├─ Files I will TOUCH:
│   - platform/assets/style.css (operations: APPEND palette + REPLACE-IN-PLACE values of dark theme + tints)
│   - platform/assets/app.js    (operations: APPEND IIFE Upg.chroma in P3)
│   - platform/index.html       (operations: AUGMENT data-chr-mood on ≤15 elements optional)
├─ Files I will NEVER TOUCH:
│   - archive/* (read-only)
│   - prompts/* + prompts/v2/* (read-only)
│   - state/PROGRESS.json (write only after phase done)
├─ Sacred check (run BEFORE):
│   - grep -c '<section class="page"' platform/index.html  → 14+
│   - grep -c "qcalc" platform/index.html                   → 391
│   - grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → ≥25
│   - grep -c '\-\-tint-' platform/assets/style.css         → ≥15
│   - grep -c '\-\-color-bg' platform/assets/style.css      → ≥1
│   - grep -c 'paper-tone' platform/assets/style.css        → ≥1 (light theme W12 P2 — preserved)
└─ Awaiting confirmation
```

### 🧪 Post-Phase Sanity Probe

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        14+ (preserved)         ✓
├─ qcalc instances:    391 (was 391)           ✓
├─ Upg.* APIs:         ≥25 (W21 adds Upg.chroma in P3) ✓
├─ All --tint-* names preserved:               ✓  (only values change)
├─ Light theme Linen-Bone preserved:           ✓  (W12 P2 untouched)
├─ Dark theme Mihrab applied:                  ✓  (post-P2)
├─ WCAG AA contrast:   ≥4.5:1 on text/bg       ✓
├─ Console errors:     0                       ✓
├─ Visual: dark theme feels Arabic-rooted, not aurora-generic ✓
└─ Devotion check: does color now whisper "محراب" instead of "Linear Dashboard"? ✓
```

---

## 🧭 لمَ CHROMATIC SOUL الآن؟

تحليل الكود الحالي (post Pack v2):

- 🎨 الـ baseline brand `--color-brand: hsl(176 100% 70%)` (cyan/teal) = **Apple Liquid Glass cliché**.
- 🎨 الـ purple accent `hsl(258 90% 66%)` = **Linear/Vercel SaaS cliché**.
- 🎨 الـ 15 `--tint-*` كلها aurora-style مُشتقة من baseline cyan/violet — **لا روح ثقافية**.
- 🎨 الـ dark base `--color-bg: hsl(225 30% 6%)` = **Slate dark generic**.
- 🎨 لا فرق بصري بين callcenter (يجب أن يكون حادّاً) و psych (يجب أن يكون عميقاً) — **كلاهما يستعمل aurora-tint مشتق من نفس brand**.

**هذا منصة عربية. الألوان لازم تحكي بالعربي.**

النتيجة المتوقعة بعد Worker 21:

| البند | قبل | بعد |
|---|---|---|
| Baseline brand | `hsl(176 100% 70%)` cyan/teal | **Lapis** `oklch(56% 0.18 252)` (لازوردي قبة الصخرة) |
| Dark bg | `hsl(225 30% 6%)` slate | **Mihrab** `oklch(13% 0.04 280)` (نِيلي عميق) |
| Light bg | Linen-Bone (W12 P2) | **محفوظ** ✓ |
| 15 tints | aurora-derived | **12 صبغة عربية** (لازوردي/زعفران/حناء/مرجان/...) |
| Tint identity | generic SaaS | **رمز ثقافي** (psych = Mihrab, callcenter = Damascus, accounting = Pearl, ...) |
| Color tokens architecture | scattered | **منظَّم في `chr-*` namespace + tokens-first** |

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `21_PHASE_1_PALETTE_FORGE.md`        | إنشاء ١٢ palette جديد بـ oklch (50/100/200/.../900 لكل لون) + utility classes `chr-tint-*` + tokens map | ~520 سطر |
| 2 | `21_PHASE_2_DARK_MIHRAB.md`           | استبدال قيم Aurora dark بـ Mihrab Indigo (bg + surfaces + text-on-dark) + light theme محفوظ | ~440 سطر |
| 3 | `21_PHASE_3_PAGE_REASSIGNMENT.md`     | إعادة توزيع 14 صفحة على 12 صبغة (مع تكرار سيدين) + REPLACE-IN-PLACE قيم 15 `--tint-*` + `Upg.chroma` API | ~460 سطر |
| 4 | `21_PHASE_4_GRADIENT_RECAST.md`       | إعادة كتابة gradient tokens (W12+W14+W16 ambient gradients) باستخدام الـ 12 palette + per-personality gradients | ~480 سطر |
| 5 | `21_PHASE_5_THEME_BRIDGE.md`          | جسر التوافق مع W12 P2 light theme + Pack v1/v2 tinted shadows + WCAG AA contrast verification + Mihrab refinements | ~420 سطر |

> **مجموع تقريبي:** ~2,320 سطر، موزّعة على 5 phases (≤520/phase) لتجنّب context limit.
>
> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5`. لا قلب، لا تقديم. Phase 3 يحتاج palette من Phase 1 + dark base من Phase 2.

---

## 🎨 الـ ١٢ صبغة عربية (Reference Card)

| # | اللون العربي | اللاتيني | oklch (Pack v3 base) | الإلهام | Pages المقترحة |
|---|---|---|---|---|---|
| 1 | لازوردي | Lapis | `oklch(56% 0.18 252)` | قبة الصخرة | brand baseline + psych |
| 2 | دمشقي | Damascus | `oklch(48% 0.04 220)` | السيوف المُذهَّبة | negotiation |
| 3 | حِنّاء | Henna | `oklch(58% 0.18 28)` | الأعراس + التراث | hrmastery |
| 4 | زعفران | Saffron | `oklch(78% 0.16 78)` | المطبخ + الذهب | dashboard |
| 5 | نَخيل | Date Palm | `oklch(58% 0.10 130)` | العراق + الخصب | accounting |
| 6 | لُؤلؤ | Pearl | `oklch(88% 0.02 220)` | الخليج | customercare |
| 7 | نِيلي | Indigo | `oklch(38% 0.10 270)` | اليمن في الليل | programming |
| 8 | مرجان | Coral | `oklch(70% 0.16 28)` | البحر الأحمر | social |
| 9 | طمي النيل | Silt | `oklch(52% 0.06 60)` | مصر الزراعية | fieldsales |
| 10 | أرز | Cedar | `oklch(50% 0.08 160)` | لبنان | accountmgr |
| 11 | محراب | Mihrab | `oklch(36% 0.08 280)` | السكون العميق | eq + dark base |
| 12 | سنّان رَخام | Marble | `oklch(85% 0.02 80)` | البتراء | callcenter, lab, phonerepair, myprogress |

> **ملاحظة:** هذي القيم baseline. كل palette سيتولّد منه 9 درجات (50/100/200/300/400/500/600/700/800/900) عبر `oklch` lightness adjustment في Phase 1.

---

## 🌐 معايير عالمية مرجعية

**Color Theory + Cultural:**
- Yves Klein — استخدام اللون كمادة روحية (International Klein Blue).
- Carmine Auletta — *Color Sense*.
- Keith Critchlow — *Islamic Patterns* — لازوردي/زعفران/حنّاء historical.
- Refactoring UI (Wathan + Schoger) — tinted shadows philosophy.
- Yara Khoury — TypeArabic + Arabic web aesthetics.
- *Atlas of Material Worlds* — pigment archaeology of MENA region.

**Color System Architecture:**
- IBM Carbon Design System — color tokens hierarchy (50/.../900).
- Apple HIG — system color guidelines + dark mode.
- Material Design 3 — tonal color palettes generation.
- Adobe Spectrum — semantic color tokens.
- Tailwind CSS Color Palette (reference for scale).
- `oklch()` color space — Lea Verou's writings.

**Accessibility:**
- WCAG 2.1 AA — contrast ratio 4.5:1 (text) / 3:1 (UI).
- APCA (Advanced Perceptual Contrast Algorithm) — modern alternative.

> **القاعدة:** نستخدم `oklch` لأنه perceptually uniform — تعديل lightness بـ 10% يبدو فعلاً 10% أفتح. HSL ضعيف perceptually. هذا يمنح الصبغات العربية ثبات بصري عبر السلسلة 50→900.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT v3)

1. **Branch واحد طولي**: `worker-21-devotio` ينشأ في **بداية Phase 1** من `main` المحدَّث (post Worker 20 PR).
2. **بقية الـ phases** تستمر على نفس الـ branch — لا branch جديد.
3. **بعد كل phase**: 2-push rule (code-commit + push + state-commit + push).
4. **PR واحد** في نهاية Worker: من `worker-21-devotio` → `main`.
5. **Session واحد = phase واحد** (قاعدة AUTO_PILOT v3).

---

## 🚫 ممنوعات قاطعة (Worker 21)

- ❌ حذف أي من 15 `--tint-*` token (الأسماء)
- ❌ تعديل قيم Linen-Bone Light theme من W12 P2
- ❌ استخدام hex (`#RRGGBB`) في القيم الجديدة
- ❌ خلط oklch مع oklab/hsl في `color-mix` بدون wrapper
- ❌ تجاوز contrast ratio 4.5:1
- ❌ إضافة CDN أو library خارجي
- ❌ تكسير `--shadow-c-*` tinted shadows من W12
- ❌ إعادة تسمية أي token من Pack v1/v2/Worker 20
- ❌ تجاوز 600 سطر لكل phase
- ❌ خلق صبغة جديدة خارج الـ 12 الأصيلة (لا "tropical green"، لا "lavender"، لا "rose gold")

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 21:

| المقياس | قبل (Pack v1+v2+W20) | الهدف بعد |
|---|---:|---:|
| Brand color | cyan/teal aurora | **Lapis (لازوردي)** |
| Dark base | slate generic | **Mihrab Indigo** |
| Palette tokens | ~30 (scattered) | **120** (12 colors × ~9 stops + 6 semantic) |
| Identity tints (names) | 15 | 15 (preserved) |
| Identity tints (values) | aurora-derived | **12 Arabic-rooted** (mapped) |
| Per-page mood | undifferentiated | **15 distinct cultural moods** |
| Color space | hsl + hex mix | **oklch unified** |
| Tinted shadows | aurora-tinted | **culturally-tinted** (Mihrab dark, Saffron warm, etc.) |
| Light theme | Linen-Bone (W12 P2) | Linen-Bone (preserved) ✓ |
| WCAG AA contrast | partial | **4.5:1 on all text/bg pairs** ✓ |
| New Upg.* APIs | 25 | **26** (+Upg.chroma) |

---

## 🎬 كيف يستخدمه AUTO_PILOT v3

```
1. AUTO_PILOT v3 يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 21" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (21_PHASE_<N>_*.md) — ليس كل الـ phases.
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد. توقّف بعد phase وحدة.
6. ينشئ PR واحد في النهاية: feat: Worker 21 — CHROMATIC SOUL DEVOTIO (Pack v3).
```

— نهاية الفهرس. الملفات التفصيلية في `21_PHASE_*.md`.

🎨 اللون ذاكرة. ابدأ بصياغة الـ palette، الباقي يبني عليها.
