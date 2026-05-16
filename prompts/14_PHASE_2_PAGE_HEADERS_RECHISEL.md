# 📜 WORKER 14 — Phase 2/6 — Page Headers Re-Chisel + Emoji Purge
> **اقرأ أولاً:** `prompts/14_WORKER_ATELIER_LIQUID_GLASS.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 1 (Liquid Glass v2 جاهز).
> **الفلسفة:** عنوان الصفحة هو أول ما تراه عينك. لو كان `<h1>📱🔧 صيانة الهواتف</h1>`، فقدت بصمة Apple في 0.3 ثانية.

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **REPLACE-IN-PLACE** للـ 14 `<div class="page-header"><h1>…</h1><p>…</p></div>` blocks (واحد لكل صفحة) → بـ `<header class="page-h" data-tint="<page>">` block ثلاثي | حذف أي element خارج الـ 14 page-header. تغيير IDs. حذف emojis من **داخل** skill-cards / scenario-cards / stat-tiles |
| `style.css` | **APPEND** قواعد `.page-h`, `.page-h .h-eyebrow`, `.page-h h1`, `.page-h .h-lede`, `.page-h::after` (tint underline) | تعديل قواعد قائمة. تغيير `--text-display` token |
| `app.js` | لا تغيير في هذا الـ phase (الـ HTML augmentation فقط) | — |

**Sacred preserved:**
- 14 `<section class="page" id="page-*">` كلها سليمة.
- جميع classes الموجودة على `.page-header` لا تُحذَف — تُضاف عليها class جديد `page-h`.
- النصوص العربية الأصلية في الـ H1 و الـ p الموجودة تُنقَل للهيكل الجديد بدون أي تعديل لغوي.

---

## 🎯 الهدف

تحويل كل `<h1>` من emoji-laden one-liner إلى block ثلاثي بصيغة Apple/Stripe/Linear:

**قبل:**
```html
<div class="page-header">
  <h1>📱🔧 صيانة الهواتف الذكية — Mastery</h1>
  <p>إتقان الصيانة من الـ A إلى الـ Z — مقاطعة، تشخيص، إصلاح.</p>
</div>
```

**بعد:**
```html
<header class="page-h" data-tint="phonerepair">
  <span class="h-eyebrow">وحدة تخصصية</span>
  <h1><i class="qi qi-lg" data-icon="wrench" aria-hidden="true"></i> صيانة الهواتف الذكية — Mastery</h1>
  <p class="h-lede">إتقان الصيانة من الـ A إلى الـ Z — مقاطعة، تشخيص، إصلاح.</p>
</header>
```

**النتيجة البصرية:** eyebrow صغير في tint اللون اللخاص بالصفحة → headline كبير `--text-display` بأيقونة monoline → lede متوسط `--text-lg` بـ muted color → خط tint underline 56px تحت الـ block.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT
├─ Phase: 2/6 — Page Headers Re-Chisel + Emoji Purge
├─ Estimated lines: ~520
├─ Files to touch:
│   ├─ platform/index.html         (REPLACE-IN-PLACE 14 page-header blocks)
│   └─ platform/assets/style.css   (APPEND .page-h system ~120 lines)
├─ Sacred verify:
│   ├─ 14 page-headers BEFORE → 14 page-h blocks AFTER (1-to-1)
│   ├─ Original H1 text content fully preserved (only emoji removed + .qi added)
│   └─ Original p text content fully preserved (becomes h-lede)
├─ Branch: continue worker-14-atelier
```

---

## 🧱 خطوات التنفيذ

### Step 1 — إنشاء `.page-h` system في CSS

**APPEND** في `style.css` (بعد قواعد Phase 1):

```css
/* ═══════════════════════════════════════════════════════════════
   ATELIER v16 — Page Header System (Worker 14 / Phase 2)
   bloc ثلاثي: eyebrow + title-with-icon + lede + tint underline
   ═══════════════════════════════════════════════════════════════ */
.page-h {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
  padding-block: var(--space-6, 32px) var(--space-5, 24px);
  margin-block-end: var(--space-6, 32px);
  border-block-end: 1px solid var(--color-border);
}

.page-h .h-eyebrow {
  font-family: var(--font-text);
  font-size: var(--text-xs, 0.78rem);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-tint, var(--color-brand));
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}
.page-h .h-eyebrow::before {
  content: "";
  width: 12px; height: 1.5px;
  background: currentColor;
  border-radius: 1px;
  display: inline-block;
}

.page-h h1 {
  font-family: var(--font-display);
  font-size: var(--text-display, clamp(2rem, 5vw, 3.25rem));
  font-weight: var(--weight-heavy, 800);
  line-height: var(--leading-tight, 1.15);
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--color-text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4em;
}
.page-h h1 .qi {
  color: var(--color-tint, var(--color-brand));
  font-size: 0.85em;
  flex-shrink: 0;
}

.page-h .h-lede {
  font-family: var(--font-text);
  font-size: var(--text-lg, 1.125rem);
  line-height: var(--leading-relaxed, 1.65);
  color: var(--color-text-muted);
  max-width: 68ch;
  margin: 0;
}

/* Tint underline — 56px segment تحت الحدّ السفلي */
.page-h::after {
  content: "";
  position: absolute;
  inset-inline-start: 0;
  inset-block-end: -1px;
  width: 56px;
  height: 2px;
  background: linear-gradient(90deg,
    var(--color-tint, var(--color-brand)) 0%,
    color-mix(in oklch, var(--color-tint, var(--color-brand)) 30%, transparent) 100%);
  border-radius: 2px;
}

/* tint resolution per data-tint */
.page-h[data-tint="dashboard"]    { --color-tint: var(--tint-dashboard); }
.page-h[data-tint="callcenter"]   { --color-tint: var(--tint-callcenter); }
.page-h[data-tint="fieldsales"]   { --color-tint: var(--tint-fieldsales); }
.page-h[data-tint="accountmgr"]   { --color-tint: var(--tint-accountmgr); }
.page-h[data-tint="social"]       { --color-tint: var(--tint-social); }
.page-h[data-tint="lab"]          { --color-tint: var(--tint-lab); }
.page-h[data-tint="psych"]        { --color-tint: var(--tint-psych); }
.page-h[data-tint="eq"]           { --color-tint: var(--tint-eq); }
.page-h[data-tint="negotiation"]  { --color-tint: var(--tint-negotiation); }
.page-h[data-tint="customercare"] { --color-tint: var(--tint-customercare); }
.page-h[data-tint="programming"]  { --color-tint: var(--tint-programming); }
.page-h[data-tint="accounting"]   { --color-tint: var(--tint-accounting); }
.page-h[data-tint="phonerepair"]  { --color-tint: var(--tint-phonerepair); }
.page-h[data-tint="hrmastery"]    { --color-tint: var(--tint-hrmastery); }
.page-h[data-tint="myprogress"]   { --color-tint: var(--tint-myprogress); }

/* Mobile: stack vertical, smaller display */
@media (max-width: 720px) {
  .page-h h1 { font-size: var(--text-3xl, 1.875rem); }
  .page-h .h-lede { font-size: var(--text-base, 1rem); }
  .page-h::after { width: 40px; }
}
```

### Step 2 — Replace 14 page headers (واحد-بواحد)

اقرأ `index.html` بـ `grep -n 'class="page-header"' platform/index.html` للحصول على الـ 14 موضع. نفّذ REPLACE-IN-PLACE لكل واحد بالخريطة التالية:

| Page ID | data-tint | Eyebrow | Icon (`.qi data-icon`) | Title (احتفظ بالنص بدون emoji) | Lede |
|---|---|---|---|---|---|
| `page-dashboard` | `dashboard` | `لوحة التحكم` | `layout-dashboard` | (احتفظ بالـ greeting hero بدل page-header — راجع Phase 3) | — |
| `page-callcenter` | `callcenter` | `وحدة تخصصية` | `phone` | `وحدة الكول سنتر` | استعمل النص الأصلي من الـ p |
| `page-fieldsales` | `fieldsales` | `وحدة تخصصية` | `briefcase` | `وحدة المبيعات` | الـ p الأصلي |
| `page-accountmgr` | `accountmgr` | `KAM` | `user-tie` | `إدارة الحسابات الكبيرة` | الـ p الأصلي |
| `page-social` | `social` | `وحدة تخصصية` | `megaphone` | `وحدة السوشيال ميديا` | الـ p الأصلي |
| `page-lab` | `lab` | `Sandbox` | `flask-conical` | `مختبر السيناريوهات` | الـ p الأصلي |
| `page-psych` | `psych` | `Behavioral Science` | `brain` | `الدوافع النفسية الخفية` | الـ p الأصلي |
| `page-eq` | `eq` | `Emotional Intelligence` | `heart-handshake` | `الذكاء العاطفي — EQ` | الـ p الأصلي |
| `page-negotiation` | `negotiation` | `Influence & Negotiation` | `gauge` | `المفاوضات والإقناع` | الـ p الأصلي |
| `page-customercare` | `customercare` | `Service Excellence` | `headphones` | `خدمة العملاء المتميزة` | الـ p الأصلي |
| `page-programming` | `programming` | `Software Engineering` | `code` | `البرمجة والهندسة البرمجية` | الـ p الأصلي |
| `page-accounting` | `accounting` | `Accounting & Cashier` | `calculator` | `المحاسبة والكاشير` | الـ p الأصلي |
| `page-phonerepair` | `phonerepair` | `Repair Mastery` | `wrench` | `صيانة الهواتف الذكية — Mastery` | الـ p الأصلي |
| `page-hrmastery` | `hrmastery` | `HR & Salary Negotiation` | `briefcase` | `إتقان HR والتفاوض على الراتب` | الـ p الأصلي |
| `page-myprogress` | `myprogress` | `Personal Progress` | `trending-up` | `تقدمي` | الـ p الأصلي |

**قاعدة Replace-in-place المحدّدة:**

```html
<!-- BEFORE (مثال callcenter) -->
<div class="page-header">
  <h1>وحدة الكول سنتر</h1>
  <p>إتقان مهارات الاتصال — من فتح المكالمة إلى الإغلاق الناجح.</p>
</div>

<!-- AFTER -->
<header class="page-h" data-tint="callcenter">
  <span class="h-eyebrow">وحدة تخصصية</span>
  <h1><i class="qi qi-lg" data-icon="phone" aria-hidden="true"></i> وحدة الكول سنتر</h1>
  <p class="h-lede">إتقان مهارات الاتصال — من فتح المكالمة إلى الإغلاق الناجح.</p>
</header>
```

**ملاحظات حرجة:**
- إذا كان `<p>` يحتوي على نص متعدّد الأسطر، احفظ كل النص بدون اقتطاع.
- إذا كان `<h1>` أو `<p>` يحتوي على HTML inline (`<span>`, `<strong>`)، احفظ الـ HTML.
- **page-dashboard** خاص: لا تعيد كتابة page-header الخاص به — يحوي currently `<div class="page-header"><h1>مرحباً بك في لوحة التحكم 👋</h1></div>` داخل `dashboard-legacy` wrapper. **اتركه** كما هو، Phase 3 سيتولّى dashboard كاملاً.
- emoji في الـ `<p>` (lede) → **يبقى** (هذا content، ليس chrome).
- **فقط** الـ emoji في الـ `<h1>` → يُستبدَل بـ `.qi`.

### Step 3 — Sanity grep بعد التعديل

```bash
# عدد .page-h يجب يكون 13 (دشبورد ما يدخل)
grep -c 'class="page-h"' platform/index.html  # → 13

# H1 emoji-free (في كل page-h)
grep -E 'class="page-h"' -A 2 platform/index.html | grep -E '<h1>[^<]*[📱🔧🧮❤️🤝✅💻🧪🧠📊👋]'  # → empty

# Original count of h1 (تحقّق من عدم فقدان أي عنصر)
grep -c '<h1' platform/index.html  # ≥ 17 (gateway + dashboard + 14 pages + sub-headings)
```

---

## 🧪 Sanity Probe بعد الـ commit

```
🧪 SANITY AFTER PHASE 2
├─ Pages count:        14 (was 14)        ✓
├─ qcalc instances:    391 (was 391)      ✓
├─ Upg APIs:           ≥15                ✓
├─ .page-h count:      13                 ✓
├─ H1 emoji count:     0 in pages         ✓ (kept in skill-cards/cards)
├─ Original lede text: preserved          ✓
└─ Console errors:     0                  ✓
```

---

## ✅ معايير القبول (Phase 2)

- [ ] 13 صفحة (كل ما عدا dashboard) فيها `.page-h` block بصيغة eyebrow + title-with-icon + lede.
- [ ] لا emoji واحد في `<h1>` بداخل `<section class="page">` (ما عدا dashboard اللي Phase 3 يعالجه).
- [ ] Tint underline 56px ظاهر تحت كل page-header.
- [ ] Tint color يتبع `data-tint` بشكل صحيح (cyan لـ callcenter، amber لـ accounting، إلخ).
- [ ] mobile breakpoint @720px يعمل (display أصغر، underline 40px).
- [ ] جميع النصوص العربية الأصلية محفوظة بدون تعديل لغوي.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/index.html platform/assets/style.css
git commit -m "phase 2 (atelier): page-h system + 13 page headers re-chisel + emoji purge from H1s"
# push

# state commit
git add state/PROGRESS.json state/snapshots/worker-14-phase-2.json
git commit -m "state: atelier phase 2 committed and pushed"
# push
```

— نهاية Phase 2.
