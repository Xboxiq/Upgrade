# 📖 WORKER 15 — Phase 3/6 — Arabic Body & UI Layer
> **اقرأ أولاً:** `prompts/v2/15_WORKER_TYPOGRAPHY_SOUL.md` — Preservation Guard.
> **يبني فوق:** Phase 2 (Display Crown).
> **الفلسفة:** *النص هو الجسد الحقيقي للمنصة. حروف ضعيفة = منصة ضعيفة. Tajawal للـ UI، Readex Pro للـ paragraphs، Cairo للضمان.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` Google Fonts `<link>` | **AUGMENT URL** — إضافة Tajawal (300/400/500/700) + IBM Plex Sans Arabic إضافي إن لزم | حذف أي خط موجود |
| `style.css` `:root` | **REPLACE-IN-PLACE** قيمة `--font-text` (إضافة Tajawal كثاني بعد Readex Pro) + **APPEND** `--font-ui` token جديد | حذف Readex Pro، Cairo |
| `style.css` rules | **APPEND** قواعد جديدة لـ `.type-body`, `.type-body-lead`, `.type-ui-label`, `.type-button`, `.type-tab`, `.type-breadcrumb`, `.type-hint`, `.type-caption` (تحديث specs من Phase 1) | تعديل `.h-card`, `.h-section` من W12 P1B |
| `index.html` | **AUGMENT** ≤30 button/tab/breadcrumb بـ class جديدة | تغيير محتوى النصوص |

**Sacred preserved:**
- Readex Pro variable يبقى أساسياً للـ paragraphs (طويل المدى).
- Tajawal **يضاف** للـ UI labels (قصيرة المدى).
- Cairo يبقى آخر fallback.

---

## 🎯 الهدف

**Cathedral v16 الحالي:** كل النصوص تستعمل Readex Pro (variable) — جيد للقراءة الطويلة، **لكن:**
- في UI labels قصيرة (buttons, tabs)، Readex Pro يبدو "lazy" (متراخي).
- في breadcrumbs و captions، يفتقر إلى الـ "alert" اللي يحتاجه UI.
- في buttons الكبيرة، يحتاج tracking أوسع — Readex Pro variable يصعب ضبطه per-context.

**Phase 3 يحلّ:**

1. **Tajawal** — geometric Arabic sans، مثالي للـ UI labels/buttons (مماثل لـ SF Pro Text العربية).
2. **Readex Pro** يبقى للـ body paragraphs + lead text.
3. **IBM Plex Sans Arabic** يبقى للـ numerics (تأكيد Phase 4).
4. **Cairo** آخر fallback في كل stack.

النتيجة:
- `<p>...</p>` → Readex Pro 400 (sustained reading)
- `<button>...</button>` → Tajawal 600 (alert, confident)
- `<nav class="breadcrumbs">...</nav>` → Tajawal 400 (compact UI)
- `<label>...</label>` → Tajawal 500 (form clarity)

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT
├─ Phase: 3/6 — Arabic Body & UI Layer
├─ Estimated lines: ~440
├─ Files to touch:
│   ├─ platform/index.html         (UPDATE Google Fonts <link> + AUGMENT ~30 buttons/tabs/breadcrumbs)
│   └─ platform/assets/style.css   (UPDATE --font-text value + APPEND ~360 lines)
├─ Sacred verify:
│   ├─ grep -c 'Cairo'           → ≥3 (preserved)
│   ├─ grep -c 'Readex+Pro'      → ≥1 (preserved)
│   └─ grep -c 'IBM+Plex'        → ≥1 (preserved)
├─ Branch: continue worker-15-resonance
```

---

## 🧱 خطوات التنفيذ

### Step 1 — تحديث Google Fonts `<link>`

ابحث في `index.html` عن السطر الحالي وأضف Tajawal:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&family=Readex+Pro:wght@200..700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Aref+Ruqaa:wght@400;700&family=Tajawal:wght@300;400;500;700;900&family=Cairo:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

**التغيير:** إضافة `&family=Tajawal:wght@300;400;500;700;900`.

### Step 2 — تحديث Token Stacks

في `style.css`، ابحث عن `--font-text` و **REPLACE-IN-PLACE**:

```css
/* ─── RESONANCE v2 — Body & UI stacks (Worker 15 / Phase 3) ─── */
--font-text:    "Readex Pro", "Tajawal", "IBM Plex Sans Arabic", "Cairo",
                "SF Arabic", -apple-system, BlinkMacSystemFont, "Segoe UI",
                Roboto, sans-serif;

/* UI-specific stack — Tajawal أولاً للـ buttons/tabs/labels */
--font-ui:      "Tajawal", "Readex Pro", "IBM Plex Sans Arabic", "Cairo",
                "SF Arabic", -apple-system, BlinkMacSystemFont, "Segoe UI",
                Roboto, sans-serif;
```

### Step 3 — تحديث Voice Token Aliases

**APPEND**:

```css
/* RESONANCE v2 — Voice token reroute (Worker 15 / Phase 3) */
:root {
  --type-voice-body:  var(--font-text);    /* unchanged: Readex Pro primary */
  --type-voice-ui:    var(--font-ui);      /* updated: Tajawal primary */
}
```

### Step 4 — Body Utilities (تحديث + إضافة)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Arabic Body & Lead (Worker 15 / Phase 3)
   Body = Readex Pro variable for sustained reading.
   ════════════════════════════════════════════════════════════════ */

.type-body,
[data-type-voice="body"] {
  font-family: var(--type-voice-body);
  font-weight: 400;
  font-variation-settings: "wght" 400;
  letter-spacing: 0;
  line-height: 1.7;
  color: var(--color-text);
}

.type-body-lead {
  font-family: var(--type-voice-body);
  font-weight: 500;
  font-variation-settings: "wght" 500;
  letter-spacing: -0.005em;
  line-height: 1.55;
  color: var(--color-text);
}

.type-body-lg {
  font-family: var(--type-voice-body);
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: 1.7;
}

.type-body-sm {
  font-family: var(--type-voice-body);
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: 1.6;
}

/* Body strong — when emphasis needed inside paragraphs */
.type-body strong,
.u-prose strong {
  font-weight: 600;
  font-variation-settings: "wght" 600;
}
```

### Step 5 — UI Layer Utilities (Tajawal primary)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — UI Layer (Worker 15 / Phase 3)
   UI = Tajawal for short-form labels/buttons/tabs.
   Geometric, alert, confident.
   ════════════════════════════════════════════════════════════════ */

/* TYPE UI LABEL — generic UI text (sidebar items, list labels) */
.type-ui-label,
[data-type-voice="ui"] {
  font-family: var(--type-voice-ui);
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.4;
}

.type-ui-label--sm {
  font-family: var(--type-voice-ui);
  font-weight: 500;
  font-size: var(--text-sm);
  letter-spacing: 0.015em;
  line-height: 1.35;
}

/* TYPE BUTTON — for <button>, .btn, .ql-btn */
.type-button {
  font-family: var(--type-voice-ui);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.type-button--lg {
  font-family: var(--type-voice-ui);
  font-weight: 700;
  font-size: var(--text-lg);
  letter-spacing: 0.025em;
  line-height: 1.2;
}

.type-button--sm {
  font-family: var(--type-voice-ui);
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: 0.02em;
  line-height: 1.2;
}

/* TYPE TAB — for tab navigation */
.type-tab {
  font-family: var(--type-voice-ui);
  font-weight: 500;
  letter-spacing: 0.015em;
  line-height: 1.3;
  font-size: var(--text-sm);
}

.type-tab--active {
  font-weight: 600;
}

/* TYPE BREADCRUMB — compact navigation trails */
.type-breadcrumb {
  font-family: var(--type-voice-ui);
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.4;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.type-breadcrumb--current {
  color: var(--color-text);
  font-weight: 500;
}

/* TYPE HINT — captions, helper text under inputs */
.type-hint,
.type-caption {
  font-family: var(--type-voice-body);
  font-weight: 400;
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--color-text-faint);
  letter-spacing: 0.005em;
}

/* TYPE FORM LABEL — for <label> inside forms */
.type-form-label {
  font-family: var(--type-voice-ui);
  font-weight: 500;
  font-size: var(--text-sm);
  line-height: 1.4;
  letter-spacing: 0.01em;
  color: var(--color-text);
  display: block;
  margin-block-end: 0.4rem;
}

/* TYPE INPUT — for input/textarea content */
.type-input {
  font-family: var(--type-voice-body);
  font-weight: 400;
  font-size: var(--text-base);
  line-height: 1.5;
  letter-spacing: 0;
}
```

### Step 6 — Cairo Fallback Hardening

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Cairo Fallback Hardening (Worker 15 / Phase 3)
   Cairo يبقى ضماناً نهائياً لكل voice. لا يُحمَّل ما لم يفشل غيره.
   ════════════════════════════════════════════════════════════════ */

/* Lazy weight loading — Cairo فقط في 400/600/700 (تخفيف الـ payload) */
/* الـ link في index.html يحمّل هذي الأوزان فقط. لا تطلب Cairo:wght@500 — استخدم Tajawal بدلاً */

/* Cairo emergency — لو شبكة العميل سيئة جداً وفشل تحميل Tajawal/Readex */
@supports not (font-variation-settings: "wght" 500) {
  /* في متصفّحات قديمة لا تدعم variable fonts */
  .type-body, .type-body-lead, .u-prose {
    font-family: "Cairo", "SF Arabic", sans-serif;
    font-weight: 400;
  }
}

/* تأكيد ظهور Cairo في stacks */
:root {
  --font-cairo-fallback: "Cairo", "SF Arabic", sans-serif;
}
```

### Step 7 — Tajawal Refinement

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Tajawal Micro-tuning (Worker 15 / Phase 3)
   Tajawal geometric — ممتاز للـ UI لكن يحتاج tracking أوسع.
   ════════════════════════════════════════════════════════════════ */

/* Tajawal في حجم صغير (≤14px) يضيق — نفتح tracking */
.type-tab,
.type-breadcrumb,
.type-hint {
  font-feature-settings: "kern" 1, "liga" 1;
}

/* Tajawal Heavy (900) متاح — للـ CTAs الكبيرة */
.type-cta-heavy {
  font-family: var(--type-voice-ui);
  font-weight: 900;
  letter-spacing: -0.005em;
  line-height: 1.1;
}

/* Tajawal yellow zone: 18-24px فيه يلمع. <14px أو >32px استخدم بدائل */
@media (max-width: 480px) {
  /* على الموبايل، buttons الصغيرة تفضّل Cairo (أوضح في 12-14px) */
  .type-button--sm {
    font-family: var(--type-voice-body);  /* Readex Pro fallback */
  }
}
```

### Step 8 — AUGMENT في index.html

استهدف ~30 عنصراً (لا تنشر على كل button — خذ عينة تمثيلية من 5 صفحات):

#### 8.1 — Buttons (10 عناصر)

ابحث بـ grep عن `<button` والـ `.btn` و `.ql-btn`. AUGMENT:

```html
<!-- قبل: -->
<button class="ql-btn">حفظ</button>

<!-- بعد: -->
<button class="ql-btn type-button">حفظ</button>
```

أو على CTAs الكبيرة:
```html
<button class="ql-btn-primary type-button--lg">ابدأ التدريب</button>
```

#### 8.2 — Tabs (5 عناصر)

في صفحات تحوي tabs (lab, accounting):
```html
<button class="tab-btn type-tab">السيناريو 1</button>
```

#### 8.3 — Breadcrumbs (5 عناصر)

في topbar:
```html
<nav class="breadcrumbs">
  <span class="type-breadcrumb">لوحة التحكم</span>
  <span class="type-breadcrumb">/</span>
  <span class="type-breadcrumb type-breadcrumb--current">الكول سنتر</span>
</nav>
```

#### 8.4 — Form Labels & Hints (10 عناصر)

في qcalc forms:
```html
<label class="type-form-label">المبلغ</label>
<input class="type-input" type="number" />
<small class="type-hint">أدخل المبلغ بالدينار العراقي</small>
```

### Step 9 — Inline Style Cleanup (إضافي اختياري)

ابحث عن `style="font-family:..."` في index.html:
```bash
grep -c 'style="font-family' platform/index.html
```

لو وُجد > 0، استبدلها بـ utility class من اللي أُضيفت.

> **ملاحظة:** هذا cleanup خفيف. التنظيف الكامل يحدث في Worker 19 (Micro Polish).

### Step 10 — Discipline Comment

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Worker 15 / Phase 3 — Body & UI Discipline:
   1. Body paragraphs (>40 words) → var(--type-voice-body) [Readex Pro].
   2. UI labels (<8 words) → var(--type-voice-ui) [Tajawal].
   3. Buttons + CTAs → var(--type-voice-ui) [Tajawal] always.
   4. Form inputs content → var(--type-voice-body) [readability].
   5. Form labels → var(--type-voice-ui) [scanability].
   6. Cairo يبقى آخر fallback في كل stack — لا تحذفه.
   7. لا تخلط Tajawal و Readex Pro في نفس الكتلة (eye fatigue).
   8. على mobile <480px، buttons صغيرة تفضّل Readex Pro fallback.
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 19
grep -c 'Cairo' platform/assets/style.css            # → ≥3 (preserved)
grep -c 'Readex+Pro' platform/index.html              # → ≥1 (preserved)

# New additions
grep -c '\-\-font-ui' platform/assets/style.css       # → ≥2
grep -c 'Tajawal' platform/index.html                  # → ≥1 (in Google Fonts link)
grep -c 'Tajawal' platform/assets/style.css           # → ≥2 (in stacks)
grep -c '\.type-button' platform/assets/style.css     # → ≥4
grep -c 'type-button' platform/index.html             # → ~10
grep -c 'type-tab' platform/index.html                # → ~5
grep -c 'type-breadcrumb' platform/index.html         # → ~5

# Visual:
# ✓ Buttons في الـ qcalcs تستعمل Tajawal (alert, confident)
# ✓ Body paragraphs في صفحات الـ lessons تستعمل Readex Pro (calm)
# ✓ Breadcrumbs في topbar تستعمل Tajawal 400 (compact)
```

---

## ✅ معايير القبول (Phase 3)

- [ ] Tajawal محمَّل ومُحدَّد في Google Fonts link.
- [ ] `--font-ui` token معرَّف.
- [ ] `--type-voice-ui` يشير إلى `--font-ui`.
- [ ] `.type-body`, `.type-body-lead`, `.type-body-lg`, `.type-body-sm` تشتغل.
- [ ] `.type-ui-label`, `.type-button`, `.type-button--lg/sm`, `.type-tab`, `.type-breadcrumb`, `.type-hint`, `.type-form-label`, `.type-input` كلها تشتغل.
- [ ] ~30 عنصر AUGMENTED في index.html.
- [ ] Cairo + Readex Pro + Tajawal + IBM Plex Arabic + Aref Ruqaa + Reem Kufi: كلها تشتغل.
- [ ] لا regression بصري في الـ 14 صفحة.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/index.html
git commit -m "phase 3 (resonance): arabic body & UI — Tajawal for buttons/tabs/breadcrumbs + Readex Pro for paragraphs + Cairo fallback"

# state commit
git add state/PROGRESS.json state/snapshots/worker-15-phase-3.json
git commit -m "state: resonance phase 3 committed and pushed"
```

— نهاية Phase 3.

🎵 **Resonance check:** الـ buttons صار يحس فيها "حضور" أكثر؟ نعم → Phase 4.
