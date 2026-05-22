# 🅰️ WORKER 20 — TASMEEM RECONSTRUCTION (Pack v3 DEVOTIO)
> **Type:** بصري + معماري (نواة Pack v3 — أهم Worker على الإطلاق).
> **يبني فوق:** Cathedral v16 ATELIER + Resonance v2 (Workers 15-19 مدموجة).
> **الهدف الواحد:** نقل المنصة من **9 خطوط Google Fonts على CDN مع 252 font-family مبعثرة** إلى **9 خطوط `.woff2` محلية مرتبطة بـ 9 voices مركزية، صفر مكالمة شبكة**.
> **الفلسفة:** *الخط هو الهوية. لو الهوية مستعارة من شبكة، الواجهة بلا روح. التَسْميم العربي يبدأ بالسيادة الكاملة على الخط.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا أهم قسم في Worker 20. لو تجاهلته، الـ Worker سيفشل ولو كل phase نُفِّذ بشكل صحيح.

### ⛔ القاعدة الذهبية الواحدة

> **TASMEEM يُعيد الجذور للأرض، لا يُعيد كتابة السماء.**
>
> Cathedral v16 + Resonance v2 سلَّمتا منصة تشتغل بـ 9 خطوط من Google Fonts و 9 voice tokens (`--type-voice-*`). Worker 20 **يُسيِّد** المنصة على خطها بنقل الـ 9 خطوط محلياً (`.woff2` في `platform/assets/fonts/`) وتنظيف الـ 252 `font-family` المبعثرة. **لا يحذف voice tokens، لا يكسر type scale، لا يلمس identity tints.**

### 🚫 الأخطاء القاتلة (لو حصل أحدها → توقّف فوراً)

1. ❌ **حذف أي من الـ 9 voice tokens** من Resonance v2 (`--type-voice-hero/display/body/ui/numeric/code/accent/quote/label`).
2. ❌ **تغيير قيم Type Scale من Worker 12 Phase 1** (`--text-xs/sm/base/lg/xl/2xl/3xl/4xl/5xl`).
3. ❌ **استبدال نظام أوزان الخطوط الحالية** (W12 P1B + W15). نضيف، لا نستبدل.
4. ❌ **font-family مباشر** في القواعد الجديدة — كله عبر `var(--font-*)` أو `var(--type-voice-*)`.
5. ❌ **حذف `font-feature-settings`** الموجودة على `.u-num` و `.qcalc-value` (مهمة للأرقام).
6. ❌ **إعادة كتابة** `.h-display` / `.h-title` / `.h-section` / `.h-eyebrow` من Worker 12 / 15.
7. ❌ **ترك أي reference لـ `fonts.googleapis.com`** بعد Phase 1 — صفر تسامح.
8. ❌ **تحميل خطوط من مصادر مغلقة الترخيص** — كل الخطوط OFL/SIL/UFL فقط.

### 📦 الأصول المُقدّسة (Sacred Assets)

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 20 |
|---|---|
| 14 page sections (15 مع curriculum) | كلها موجودة، نفس IDs |
| 391 qcalc references | موجودة، تشتغل بأرقام tabular محسّنة |
| 24 Upg.* APIs | كلها معرَّفة، نفس signatures (نضيف `Upg.font` فقط) |
| Type Scale tokens (`--text-*`) من W12 P1 | موجودة، قيمها لا تتغيّر |
| 9 voice tokens (`--type-voice-*`) من W15 | موجودة، **تُحدَّث قيم الـ stacks فقط** بإضافة الخطوط المحلية في البداية |
| `--font-display`, `--font-text`, `--font-numeric`, `--font-accent`, `--font-mono` | موجودة، **تُحدَّث قيم الـ stacks** (لا نسماء tokens) |
| 14 type signatures من W15 P6 | موجودة، تشتغل |
| 15 identity tints | تبقى نفسها (Worker 21 يستخدمها لاحقاً) |
| Aref Ruqaa / Reem Kufi / Cairo / Tajawal / IBM Plex Arabic / Readex Pro / Inter / JetBrains Mono / Fraunces | تبقى متاحة — Worker 20 ينقلها من Google Fonts إلى محلي |
| Voice bindings من W12 P1B + W15 (`.h-display`, `.h-title`, `.h-section`, `.h-eyebrow`, `.h-quote`, `.h-card`, `.h-mono`, `.u-num`, `.type-hero`, `.type-display`, ...) | تبقى تشتغل — Worker 20 يضيف classes جديدة بجانبها |
| Service Worker + manifest + favicon | لا تُلمس |
| `localStorage` keys `upg_*` | لا تُلمس |

### ✅ ماذا يفعل Worker 20 فعلاً

في كل phase، **4 عمليات فقط مسموح بها**:

1. **ADD** — إضافة `@font-face` declarations جديدة، tokens جديدة، utilities جديدة، voice bindings جديدة.
2. **AUGMENT** — إضافة class إضافي على عناصر HTML موجودة (مثال: `<span class="page-h-eyebrow">` يصبح `<span class="page-h-eyebrow tas-voice-eyebrow">`).
3. **REPLACE-IN-PLACE** — استبدال **قيم** الـ `--font-*` و `--type-voice-*` tokens (محتوى الـ stacks) — **بدون** إعادة تسمية tokens.
4. **DELETE** — حذف Google Fonts `<link>` + `<link rel="preconnect">` (Phase 1 فقط — هذي العملية الوحيدة المسموحة بالحذف، وهي من جوهر Pack v3).

> أي عملية خامسة (delete voice token, rename token, rewrite voice binding from W15)؟ → **ممنوعة بدون phase-spec يأمر بها**.

### 🔍 Pre-Flight Inspection

```
🔍 PRESERVATION INSPECTION (Worker 20 / Phase N)
├─ Files I will TOUCH:
│   - platform/index.html       (operations: DELETE Google Fonts <link> in P1, AUGMENT classes after)
│   - platform/assets/style.css (operations: APPEND ~M lines + REPLACE values of --font-* / --type-voice-* stacks)
│   - platform/assets/app.js    (operations: APPEND IIFE Upg.font in P3)
│   - platform/assets/fonts/<family>/*.woff2  (operations: ADD font files in P2)
├─ Files I will NEVER TOUCH:
│   - archive/* (read-only)
│   - prompts/* (Pack v1 — read-only)
│   - prompts/v2/* (Pack v2 — read-only)
│   - state/PROGRESS.json (write only after phase done)
├─ Sacred check (run BEFORE):
│   - grep -c '<section class="page"' platform/index.html  → 14 (or 15 with curriculum)
│   - grep -c "qcalc" platform/index.html                   → 391
│   - grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → ≥24
│   - grep -c '\-\-type-voice-' platform/assets/style.css   → ≥18 (W15 voices)
│   - grep -c 'fonts.googleapis.com' platform/index.html    → 0 (post P1) | >0 (pre P1)
└─ Awaiting confirmation
```

### 🧪 Post-Phase Sanity Probe

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        14+ (preserved)         ✓
├─ qcalc instances:    391 (was 391)           ✓
├─ Upg.* APIs:         24+ (W20 adds Upg.font in P3) ✓
├─ Voice tokens:       ≥18 (W15 voices preserved) ✓
├─ All W12+W15 voice bindings work:            ✓
├─ Console errors:     0                       ✓
├─ Network requests:   0 to fonts.googleapis.com (post P1) ✓
├─ Visual regression:  none reported           ✓
├─ FOUT (Flash of Unstyled Text): ≤200ms       ✓
├─ Font weight 400 + 700 visible on all 9 families: ✓
└─ Devotion check: typography الآن سيدة على نفسها (offline)؟ ✓
```

---

## 🧭 لمَ TASMEEM الآن؟

تحليل الكود الحالي كشف 6 أمراض طباعية:

1. **6 إعادات تعريف لـ `--font-display` في `:root`** (lines 16010, 16265, 19706, 19896, 20060, 20131) = صراع cascade. آخر تعريف فقط هو الفعال، الباقي كود ميت.
2. **252 `font-family` declaration مباشرة** = ما اتبعوا tokens-first، Workers تتراكم.
3. **9 خطوط من Google Fonts CDN** = منصة offline تتنفّس عبر شبكة (تناقض جوهري).
4. **Thmanyah مذكور في الـ stacks لكن غير محمَّل** = silent fallback لـ Reem Kufi (الفخامة وهم).
5. **لا `font-display: swap`** على بعض الـ stacks = FOUT طويل عند بعض الصفحات.
6. **لا local-first** = الخطوط تُحمَّل دائماً من الشبكة حتى لو موجودة في cache المتصفح (لأن الـ URL يرسل request).

**TASMEEM يحلّ هذي المشاكل في 6 phases مرتّبة من الإعدام إلى الإحياء.**

النتيجة المتوقعة بعد Worker 20:

| البند | قبل | بعد |
|---|---|---|
| Network requests at first load | 1+ (Google Fonts) | **0** ✓ |
| Total font payload | ~600KB من Google | **~280KB** محلي (subset عربي/لاتيني) |
| `--font-display` redefinitions | 6 (متناقضة) | **1** (نظيفة) |
| Direct `font-family` declarations | 252 | **≤30** (في @font-face فقط + 5-10 escapes موثَّقة) |
| Font hosting | Google CDN | **`platform/assets/fonts/`** محلي |
| Offline first-load | فاشل (لا خطوط لو لا شبكة) | **يعمل تماماً** ✓ |
| Per-page type signatures | 14 (W15) | **14** (محفوظة، اتزاناً جديداً) |
| Tabular numeric on qcalc | جزئي | **391/391 perfect** ✓ |

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `20_PHASE_1_FONT_FORENSICS.md`            | جرد 252 font-family + إعدام Google Fonts CDN + خريطة الفوضى الحالية + tokens map | ~520 سطر |
| 2 | `20_PHASE_2_LOCAL_FONT_LOAD.md`           | تنزيل 9 خطوط `.woff2` من مصادر OFL إلى `platform/assets/fonts/` + 18 `@font-face` declarations + subset عربي/لاتيني | ~560 سطر |
| 3 | `20_PHASE_3_VOICE_BINDINGS.md`            | REPLACE-IN-PLACE قيم الـ 9 voice tokens لتشير للخطوط المحلية + `Upg.font` API + tas-* utilities | ~500 سطر |
| 4 | `20_PHASE_4_NUMERIC_DISCIPLINE.md`        | tabular-nums + lining-nums لكل qcalc (391) + JetBrains Mono numeric variant + count-up tickers polish | ~480 سطر |
| 5 | `20_PHASE_5_KASHIDA_RHYTHM.md`            | كشيدة على عناوين معينة + leading عربي صحيح (1.6 بدل 1.4) + word-spacing + RTL micro-rhythm | ~460 سطر |
| 6 | `20_PHASE_6_PER_PAGE_TYPE_SIGNATURE.md`   | 14 type signature بالخطوط المحلية + REPLACE-IN-PLACE لـ W15 P6 signatures (نفس النية، مصادر محلية) | ~580 سطر |

> **مجموع تقريبي:** ~3,100 سطر، موزّعة على 6 phases (≤580/phase) لتجنّب context limit.
>
> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5 → 6`. لا قلب، لا تقديم. Phase 2 يحتاج جرد Phase 1، Phase 3 يحتاج خطوط Phase 2.

---

## 🌐 معايير عالمية مرجعية

**خطوط Open-Source المعتمدة (OFL/SIL):**

| الخط | الترخيص | المصمم | المصدر |
|---|---|---|---|
| **Aref Ruqaa** | OFL 1.1 | Khaled Hosny + Abdullah Aref | Google Fonts repo / GitHub khaledhosny/arefruqaa |
| **Reem Kufi** | OFL 1.1 | Khaled Hosny | Google Fonts repo |
| **Cairo** | OFL 1.1 | Mohamed Gaber | Google Fonts repo |
| **Tajawal** | OFL 1.1 | Boutros International | Google Fonts repo |
| **IBM Plex Sans Arabic** | OFL 1.1 | IBM Type | github.com/IBM/plex |
| **Readex Pro** | OFL 1.1 | Nasir Udeen | Google Fonts repo |
| **Inter** | OFL 1.1 | Rasmus Andersson | rsms.me/inter |
| **JetBrains Mono** | OFL 1.1 | JetBrains | jetbrains.com/mono |
| **Fraunces** | OFL 1.1 | Undercase Type | github.com/undercasetype/Fraunces |

**أدوات الـ Subset الموصى بها:**
- `pyftsubset` (fonttools) — لتقليل حجم الخط بـ 70-85% بإبقاء الحروف العربية + اللاتينية + الأرقام فقط
- `glyphhanger` — لاستخراج الحروف المستخدمة فعلياً من index.html

**معايير معماري الخط:**
- Robert Bringhurst — *The Elements of Typographic Style* (modular scale, vertical rhythm, ligatures)
- Jost Hochuli — *Detail in Typography* (microtype refinements)
- Pascal Zoghbi — 29LT Foundry (Arabic display references)
- Yara Khoury — TypeArabic.com (معايير الخط العربي الحديث للويب)
- Khaled Hosny — مصمم Cairo و Reem Kufi (مرجع مباشر للقواعد)

> **القاعدة:** نستخدم خطوط Khaled Hosny و IBM Plex لأن مصمميها كتبوا مواصفاتها لـ "الويب الحديث المعرَّب". لا نستنسخ، نُكرّم.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT v3)

1. **Branch واحد طولي**: `worker-20-devotio` ينشأ في **بداية Phase 1** من `main` المحدَّث.
2. **بقية الـ phases** تستمر على نفس الـ branch — لا branch جديد.
3. **بعد كل phase**:
   - commit رسالة: `phase N (devotio): <العنوان>`
   - **push فوراً** للـ remote (أهم قاعدة)
   - حدِّث `state/PROGRESS.json` (current.pack="v3", worker="20", phase=N, status="in-progress")
   - snapshot في `state/snapshots/worker-20-phase-N.json`
   - commit ثانٍ: `state: devotio phase N committed and pushed`
   - **push ثانٍ فوراً**
4. **PR واحد** في نهاية Worker: من `worker-20-devotio` → `main`.
5. **Session واحد = phase واحد** (قاعدة AUTO_PILOT v3).

---

## 🚫 ممنوعات قاطعة (Worker 20)

- ❌ حذف Cairo أو أي خط من Cathedral v16 + Resonance v2
- ❌ إضافة خط جديد غير الـ 9 المعتمدة (لا Thmanyah وهمي، لا 29LT تجاري، لا Adobe Fonts)
- ❌ إضافة CDN (Google Fonts المحذوفة، Adobe Fonts، Cloudflare Fonts، أي CDN)
- ❌ تكسير type scale من Worker 12 Phase 1
- ❌ تعديل قيم HSL لـ identity tints (Worker 21 فقط)
- ❌ زيادة الـ `!important` (≤221 globally — حافظ عليها أو خفّض)
- ❌ font-family مباشر في القواعد (`font-family: "Cairo"` ممنوع — استخدم `var(--font-text)` أو `var(--type-voice-body)`)
- ❌ تجاوز 600 سطر لكل phase
- ❌ تحميل خطوط بترخيص غير OFL/SIL/UFL
- ❌ تجاوز 100KB لكل ملف `.woff2` (subset مطلوب)

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 20:

| المقياس | قبل (Cathedral + Resonance) | الهدف بعد |
|---|---:|---:|
| Google Fonts CDN links | 1 (يحمل 9 خطوط) | **0** ✓ |
| External font requests | 1+ | **0** ✓ |
| Local `.woff2` files | 0 | **18+** (9 families × 2 weights minimum) |
| Font-family declarations مباشرة | 252 | **≤30** (في @font-face فقط + escapes) |
| `--font-*` redefinitions | 6 (collisions) | **1** (نظيفة) |
| Voice tokens (W15) | 18 | **18** (preserved) + 4 جديدة |
| `Upg.font` API | غير موجود | معرَّف |
| Tabular numerals features | partial | **كامل** (tnum + lnum + ss01) |
| Modular scale | inconsistent (W12) | **perfect-fourth (1.333) لازم** |
| Baseline rhythm | غير موحّد | **8pt grid** |
| FOUT duration | غير معروف | ≤ 200ms (font-display: swap + local fonts) |
| Console errors | 0 | 0 (preserved) |
| 14 page sections | 14 | 14 (preserved) |
| 391 qcalc references | 391 | 391 (preserved) |
| Cairo present in fallback | yes | yes (preserved محلياً) |
| Total font payload | ~600KB من Google | **~280KB محلي** (subset) |

---

## 🎬 كيف يستخدمه AUTO_PILOT v3

```
1. AUTO_PILOT v3 يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 20" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (20_PHASE_<N>_*.md) — ليس كل الـ phases.
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد. توقّف بعد phase وحدة.
6. ينشئ PR واحد في النهاية: feat: Worker 20 — TASMEEM RECONSTRUCTION DEVOTIO (Pack v3).
```

— نهاية الفهرس. الملفات التفصيلية في `20_PHASE_*.md`.

🅰️ الخط هو الجذر. ابدأ هنا — وستجد بقية Pack v3 يبني على أرض صلبة.
