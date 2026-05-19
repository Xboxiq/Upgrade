# 🅰️ WORKER 15 — TYPOGRAPHY SOUL (Pack v2 RESONANCE)
> **Type:** بصري + معماري (نواة Pack v2 — أهم Worker على الإطلاق).
> **يبني فوق:** Cathedral v16 ATELIER (Worker 14 / PR #53 مدموج).
> **الهدف الواحد:** نقل المنصة من **5 خطوط مُحدَّدة بشكل عام** إلى **9 أصوات typography مرتبطة pedagogically بنوع المحتوى**.
> **الفلسفة:** *الخط ليس زينة — هو صوت المعنى. كل نوع محتوى يستحق خطه الذي يعكس روحه.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا أهم قسم في Worker 15. لو تجاهلته، الـ Worker سيفشل ولو كل phase نُفِّذ بشكل صحيح.

### ⛔ القاعدة الذهبية الواحدة

> **TYPOGRAPHY SOUL يُضيف أصواتاً، لا يُسكت أحداً.**
>
> Cathedral v16 سلَّم لنا 5 خطوط شغّالة (Cairo, Reem Kufi, Readex Pro, IBM Plex Arabic, Aref Ruqaa). Worker 15 **يُغني** هذي القائمة بـ 4 خطوط جديدة (Tajawal, Inter, JetBrains Mono, Fraunces) ويُعيد تربيطها pedagogically. **لا يحذف Cairo، لا يكسر font-family stack، لا يلمس identity tints.**

### 🚫 الأخطاء القاتلة (لو حصل أحدها → توقّف فوراً)

1. ❌ **حذف Cairo** من `--font-text` stack (يبقى آخر fallback ضامن).
2. ❌ **تغيير قيم Type Scale من Worker 12 Phase 1** (--text-xs/sm/base/lg/xl/2xl/3xl/4xl/5xl).
3. ❌ **استبدال نظام أوزان Aref Ruqaa** (Worker 12 Phase 1B). نضيف، لا نستبدل.
4. ❌ **font-family مباشر** في القواعد الجديدة — كله عبر `var(--font-*)`.
5. ❌ **حذف `font-feature-settings`** الموجودة على `.u-num` و `.qcalc-value` (مهمة للأرقام).
6. ❌ **إعادة كتابة** `.h-display` / `.h-title` / `.h-section` / `.h-eyebrow` من Worker 12.

### 📦 الأصول المُقدّسة (Sacred Assets)

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 15 |
|---|---|
| 14 page sections | كلها موجودة، نفس IDs |
| 391 qcalc references | موجودة، تشتغل |
| 19 Upg.* APIs | كلها معرَّفة، نفس signatures (نضيف `Upg.type2` فقط) |
| Type Scale tokens (--text-*) من W12 P1 | موجودة، قيمها لا تتغيّر |
| `--font-display`, `--font-text`, `--font-numeric`, `--font-accent`, `--font-mono` | موجودة، **تُحدَّث قيم الـ stacks فقط** بإضافة الخطوط الجديدة في البداية |
| Cairo font | يبقى في كل stack كآخر fallback |
| Reem Kufi / Readex Pro / IBM Plex Arabic / Aref Ruqaa | تبقى — Worker 15 يضيف فوقها |
| 15 identity tints | تبقى نفسها (Worker 16 يستخدمها لاحقاً) |
| Voice bindings من W12 P1B (`.h-display`, `.h-title`, `.h-section`, `.h-eyebrow`, `.h-quote`, `.h-card`, `.h-mono`, `.u-num`) | تبقى تشتغل — Worker 15 يضيف classes جديدة بجانبها |
| Cairo `<link>` في index.html | يُحدَّث ليتضمّن خطوط جديدة (لا يُحذف) |
| Service Worker + manifest + favicon | لا تُلمس |

### ✅ ماذا يفعل Worker 15 فعلاً

في كل phase، **3 عمليات فقط مسموح بها**:

1. **ADD** — إضافة fonts جديدة في الـ `<link>` Google Fonts، tokens جديدة، utilities جديدة، voice bindings جديدة.
2. **AUGMENT** — إضافة class إضافي على عناصر HTML موجودة (مثال: `<span class="page-h-eyebrow">` يصبح `<span class="page-h-eyebrow type-eyebrow-page">`).
3. **REPLACE-IN-PLACE** — استبدال **قيم** الـ `--font-*` tokens في `:root` (محتوى الـ stacks) — **بدون** إعادة تسمية tokens.

> أي عملية رابعة (delete font, rename token, rewrite voice binding)؟ → **ممنوعة بدون phase-spec يأمر بها**.

### 🔍 Pre-Flight Inspection

```
🔍 PRESERVATION INSPECTION (Phase N)
├─ Files I will TOUCH:
│   - platform/index.html       (operations: AUGMENT <link> Google Fonts + add classes on N elements)
│   - platform/assets/style.css (operations: APPEND ~M lines + REPLACE values of --font-* stacks)
│   - platform/assets/app.js    (operations: APPEND IIFE Upg.type2 — only Phase 6)
├─ Files I will NEVER TOUCH:
│   - archive/* (read-only)
│   - prompts/* (Pack v1 — read-only)
│   - state/PROGRESS.json (write only after phase done)
├─ Sacred check (run BEFORE):
│   - grep -c '<section class="page"' platform/index.html  → 14
│   - grep -c "qcalc" platform/index.html                   → 391
│   - grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → ≥19
│   - grep -c 'Cairo' platform/assets/style.css            → ≥3 (preserved)
│   - grep -c 'Reem+Kufi' platform/index.html              → ≥1 (preserved)
└─ Awaiting confirmation
```

### 🧪 Post-Phase Sanity Probe

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        14 (was 14)        ✓
├─ qcalc instances:    391 (was 391)      ✓
├─ Upg.* APIs:         ≥19                ✓  (W15 adds Upg.type2 in Phase 6)
├─ Cairo still present:                   ✓  (in --font-text fallback)
├─ All W12 voice bindings work:           ✓  (.h-display, .h-quote, .u-num, ...)
├─ Console errors:     0                  ✓
├─ Visual regression:  none reported      ✓
├─ FOUT (Flash of Unstyled Text): ≤200ms  ✓
└─ Resonance check: typography الآن ترن مع المحتوى؟ ✓
```

---

## 🧭 لمَ TYPOGRAPHY SOUL الآن؟

Cathedral v16 وضع 5 خطوط:
- Cairo (workhorse)
- Reem Kufi (display)
- Readex Pro (variable text)
- IBM Plex Arabic (numeric)
- Aref Ruqaa (accent)

**لكن الـ casting سطحي:**
- كل العناوين Reem Kufi (لا فرق بين h1 hero و h3 card title).
- كل النصوص Readex Pro (لا فرق بين paragraph عربي طويل و UI label قصير).
- لا Latin text family محدّد — الكلمات الإنجليزية المختلطة تستعمل fallback عام (Inter غير موجود).
- لا monospace خاص للأرقام في الكود وقطع الكود تستعمل JetBrains Mono mac fallback لكن غير محمَّل.
- لا serif voice للاقتباسات الفلسفية في صفحة psych — كلها تستعمل Aref Ruqaa حتى لو السياق يطلب fraunces literary.
- صفحات مختلفة (callcenter صارمة، psych أدبية، accounting رياضية) كلها بنفس type signature.

**TYPOGRAPHY SOUL يحلّ هذي الـ 6 مشاكل في 6 phases.**

النتيجة المتوقعة بعد Worker 15:

| الدور | الخط الجديد | يضاف فوق |
|---|---|---|
| 🎩 **Hero / Wordmark** | Aref Ruqaa Bold + Reem Kufi Black | عناوين الصفحات الكبرى |
| 🅓 **Display Heavy** | Reem Kufi 700 | h1 / h2 |
| 🅗 **Display Light** | Reem Kufi 400 | hero subtitles |
| 🅣 **Body** | Readex Pro variable | paragraphs |
| 🅤 **UI Labels** | Tajawal 500 | buttons, tabs, breadcrumbs |
| 🅝 **Numeric Tabular** | IBM Plex Arabic + JetBrains Mono | حاسبات، stats |
| 🅓+ **Code** | JetBrains Mono | code blocks في صفحة programming |
| 🅛 **Latin UI** | Inter | كلمات إنجليزية مختلطة |
| 🅠 **Quote Literary** | Fraunces serif | اقتباسات فلسفية في psych |
| 🅐 **Accent Arabic** | Aref Ruqaa | eyebrows, signatures |

**+ 14 type signature لكل صفحة** (callcenter sharp, psych literary, accounting precise, social vibrant...).

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `15_PHASE_1_TYPE_AUDIT_CASTING.md`     | جرد كل أنواع المحتوى الموجود + casting لكل دور + 9 voice tokens (`--type-voice-*`) + utility classes المرجعية | ~480 سطر |
| 2 | `15_PHASE_2_ARABIC_DISPLAY.md`         | Aref Ruqaa expansion (700 + 400) + Reem Kufi expansion (400-700) + display utilities (`.type-hero`, `.type-display-h`) + اختبار wordmark | ~420 سطر |
| 3 | `15_PHASE_3_ARABIC_BODY.md`            | Tajawal addition (300/400/500/700) + Cairo fallback hardening + UI label binding (`.type-ui-label`, `.type-breadcrumb`, `.type-button`) + form text refinement | ~440 سطر |
| 4 | `15_PHASE_4_LATIN_NUMERIC.md`          | Inter (Latin UI) + JetBrains Mono (code + numeric mono) + Fraunces (literary serif) + tabular bindings + Latin-mixed-Arabic harmony rules | ~460 سطر |
| 5 | `15_PHASE_5_SCALE_RHYTHM.md`           | Modular scale perfect-fourth (1.333) + 8pt baseline grid + vertical rhythm tokens + leading bindings + optical-size refinement (variable fonts) | ~400 سطر |
| 6 | `15_PHASE_6_PER_PAGE_PERSONALITY.md`   | 14 type signatures (callcenter sharp / psych literary / accounting precise / social vibrant / programming mono-emphatic / phonerepair technical / hrmastery formal / negotiation persuasive / customercare warm / eq emotional / lab experimental / fieldsales energetic / accountmgr executive / dashboard elegant / myprogress reflective) + `Upg.type2` API | ~520 سطر |

> **مجموع تقريبي:** ~2,720 سطر، موزّعة على 6 phases (≤520/phase) لتجنّب context limit.
>
> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5 → 6`. لا قلب، لا تقديم.

---

## 🌐 معايير عالمية مرجعية

- **Apple SF Arabic & SF Pro** — معايير weight/optical-size/tabular-numeric.
- **Robert Bringhurst** — *The Elements of Typographic Style* (modular scale, vertical rhythm, ligatures).
- **Jost Hochuli** — *Detail in Typography* (microtype refinements).
- **Ellen Lupton** — *Thinking with Type* (voice and personality).
- **Yara Khoury** (TypeArabic.com) — معايير الخط العربي الحديث للويب.
- **Khaled Hosny** — مصمم Cairo و Reem Kufi (مرجع مباشر للقواعد).
- **Mamoun Sakkal** (Sakkal Type Foundry) — معايير الكوفي والديواني.
- **IBM Plex documentation** — tabular numerals + lining nums best practices.
- **Stripe Press** — نموذج جودة typography على الويب.
- **Linear App** — type system minimalism.

> **القاعدة:** نستلهم النظام، لا نستنسخ. كل قيمة تُكتب من أول كأنها لمنصتنا.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT v2)

1. **Branch واحد طولي**: `worker-15-resonance` ينشأ في **بداية Phase 1** من `main` المحدَّث.
2. **بقية الـ phases** تستمر على نفس الـ branch — لا branch جديد.
3. **بعد كل phase**:
   - commit رسالة: `phase N (resonance): <العنوان>`
   - **push فوراً** للـ remote (أهم قاعدة)
   - حدِّث `state/PROGRESS.json` (current.pack="v2", worker="15", phase=N, status="in-progress")
   - snapshot في `state/snapshots/worker-15-phase-N.json`
   - commit ثانٍ: `state: resonance phase N committed and pushed`
   - **push ثانٍ فوراً**
4. **PR واحد** في نهاية Worker: من `worker-15-resonance` → `main`.
5. **Session واحد = phase واحد** (قاعدة AUTO_PILOT v2).

---

## 🚫 ممنوعات قاطعة (Worker 15)

- ❌ حذف Cairo أو أي خط من Cathedral v16
- ❌ إضافة CDN غير Google Fonts (لا Adobe Fonts، لا Cloudflare Fonts، لا self-hosted webfont خارج Google Fonts إلا Thmanyah الموجود مسبقاً)
- ❌ تكسير type scale من Worker 12 Phase 1
- ❌ تعديل قيم HSL لـ identity tints
- ❌ إضافة `!important` (Worker 13 خفّضها لـ ≤20، حافظ عليها)
- ❌ font-family مباشر في القواعد (`font-family: "Cairo"` ممنوع — استخدم `var(--font-text)`)
- ❌ تجاوز 600 سطر لكل phase

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 15:

| المقياس | قبل (الواقع الحالي) | الهدف بعد |
|---|---:|---:|
| Font families في Google Fonts link | 5 | 9 |
| Type voices المُربوطة بدور | 5 (display/text/numeric/accent/mono) | 9 (+ui/code/quote/latin) |
| Utility type classes | ~12 | ~28 |
| Per-page type signatures | 0 | 14 |
| `Upg.type2` API | غير موجود | معرَّف |
| Tabular numerals features | partial | كامل (tnum + lnum + ss01) |
| Modular scale step | inconsistent | perfect-fourth (1.333) |
| Baseline rhythm | غير موحّد | 8pt grid |
| FOUT duration | غير معروف | ≤ 200ms (font-display: swap) |
| Console errors | 0 | 0 (preserved) |
| 14 page sections | 14 | 14 (preserved) |
| 391 qcalc references | 391 | 391 (preserved) |
| Cairo present in fallback | yes | yes (preserved) |

---

## 🎬 كيف يستخدمه AUTO_PILOT v2

```
1. AUTO_PILOT v2 يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 15" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (15_PHASE_<N>_*.md) — ليس كل الـ phases.
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد. توقّف بعد phase وحدة.
6. ينشئ PR واحد في النهاية: feat: Worker 15 — TYPOGRAPHY SOUL RESONANCE (Pack v2).
```

— نهاية الفهرس. الملفات التفصيلية في `15_PHASE_*.md`.

🔔 الخط هو الصوت الأول. ابدأ هنا.
