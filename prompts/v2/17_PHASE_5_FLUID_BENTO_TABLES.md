# 📐 WORKER 17 — Phase 5/6 — Fluid Bento Grid + Responsive Tables
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CREATIVE_REVOLUTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phases 1+2+3+4.
> **الفلسفة:** *الواجهة الفاخرة لا تكسر على شاشة. تتنفّس مع كل عرض.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` | **REPLACE** كل `min-width: NNNpx` صلب → `min-width: min(100%, X)` + **APPEND** Fluid Bento utilities + Table-to-Cards transformer | تعديل أي token من Phases 1-4 |
| `index.html` | **AUGMENT** — إضافة `data-label` على كل `<td>` في الجداول المعقَّدة (~50 جدول × 5-8 خلية = ~300 augmentation) | تعديل نص الـ td أو حذف rows/cells |
| `app.js` | لا يُلمَس (CSS-only solution) | أي تعديل |

**Sacred preserved:**
- جميع 391 qcalc تستمر تعمل.
- جميع 14 page sections + IDs.
- جميع text content في الجداول.
- حسابات الجداول (لو تفاعلية) لا تُمَس.

---

## 🎯 الهدف

Phase 5 يحلّ **شيطان الموبايل**: الـ horizontal scroll والـ overflow.

1. **Audit + إزالة `min-width: 900px`** (و أي fixed width صلب).
2. **Fluid Bento Grid utilities** — `grid auto-fit minmax(min(100%, 280px), 1fr)`.
3. **Responsive Tables → Cards** — على `< 768px`، الجداول المعقَّدة تتحوّل لـ stack of cards باستخدام `data-label`.
4. **Audit overflow-x** — حذف غير الضروري + إضافة `overflow-wrap: anywhere` على نصوص قد تكسر.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT
├─ Phase: 5/6 — Fluid Bento + Responsive Tables
├─ Estimated lines changed: ~420 (CSS rewrites + ~300 HTML data-label augments)
├─ Files to touch:
│   ├─ platform/assets/style.css
│   └─ platform/index.html (data-label augments)
├─ Sacred verify (BEFORE):
│   ├─ grep -cE 'min-width:[ ]*[0-9]{3,}px' platform/assets/style.css  → ~12 (all to fix)
│   ├─ grep -c '<table' platform/index.html              → expect 30-60
│   ├─ grep -c 'qcalc' platform/index.html               → 391
│   └─ grep -c '<section class="page"' platform/index.html → 14
└─ Branch: continue worker-17-creative-revolution
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Audit الـ Rigid Widths

```bash
grep -nE '(min-width|width|max-width):[ ]*[0-9]+px' platform/assets/style.css | grep -vE ':[ ]*100%|min-width:[ ]*0|max-width:[ ]*100%'
```

**النتيجة المتوقعة:** ~12-20 instance من `min-width: 900px / 720px / 600px` على bento cells، tables، modal contents، إلخ.

**Strategy:**

| Pattern | Replacement |
|---|---|
| `min-width: 900px` | `min-width: min(100%, 900px)` (لا يفيض) |
| `width: 480px` على modal | `width: min(100%, 480px)` |
| `max-width: 1200px` على page-content | `max-width: 1200px; width: 100%` |
| `min-width: 600px` على grid item | حذف، استعمل `auto-fit minmax` بدلاً |

### Step 2 — Fluid Bento Grid Utilities

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 5 — Fluid Bento Grid System
   No media queries needed — auto-fit + minmax handle everything.
   ════════════════════════════════════════════════════════════════ */

/* Generic fluid grid — sensible default */
.bento-fluid,
.grid-fluid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-3);
  align-items: stretch;
}

/* Bento variants by min cell width */
.bento-fluid--sm { grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); }
.bento-fluid--md { grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); }
.bento-fluid--lg { grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); }
.bento-fluid--xl { grid-template-columns: repeat(auto-fit, minmax(min(100%, 480px), 1fr)); }

/* Cell modifiers — keep existing W14 P3 bento-cell behavior */
.bento-fluid > .bento-cell--span-2 { grid-column: span 2; }
.bento-fluid > .bento-cell--span-3 { grid-column: span 3; }
.bento-fluid > .bento-cell--row-2  { grid-row: span 2; }

/* On narrow screens — span resets to span 1 (auto-fit will lay out single column) */
@media (max-width: 600px) {
  .bento-fluid > [class*="bento-cell--span"] { grid-column: span 1; }
  .bento-fluid > [class*="bento-cell--row"]  { grid-row: span 1; }
}
```

### Step 3 — Replace Existing Bento Definitions

في style.css ابحث عن `.bento`, `.bento-grid`, `.bento-section` ... وأضف classes جديدة بدون كسر القديمة:

```css
/* W14 P3 .bento-grid — extended to be fluid by default */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-3);
}

/* Override the fixed-width 4-column of W14 P3 */
@media (min-width: 1080px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);  /* fixed 4-col on desktop */
  }
}

/* Mobile: forced single column for clarity */
@media (max-width: 480px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}
```

### Step 4 — Generic Table → Cards Transformer (CSS-only)

**Strategy:** كل جدول له class `comparison-table` أو `data-table-cards` يتحوّل تلقائياً على mobile. الـ `data-label` على كل `<td>` يكشف العنوان عند العرض كبطاقة.

```css
/* ════════════════════════════════════════════════════════════════
   Worker 17 / Phase 5 — Responsive Tables (Cards on mobile)
   Add class .table-fluid OR data-table="cards" to opt-in.
   Each <td> needs data-label="<column header>".
   ════════════════════════════════════════════════════════════════ */

.table-fluid,
[data-table="cards"] {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-surface-1);
  border-radius: var(--radius-3);
  overflow: hidden;
}

.table-fluid thead th,
[data-table="cards"] thead th {
  text-align: start;
  padding: var(--space-3);
  background: var(--color-surface-2);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.table-fluid tbody td,
[data-table="cards"] tbody td {
  padding: var(--space-3);
  border-bottom: 1px solid color-mix(in oklch, var(--color-border) 50%, transparent);
  vertical-align: top;
  color: var(--color-text);
}

/* Hover row */
.table-fluid tbody tr:hover,
[data-table="cards"] tbody tr:hover {
  background: color-mix(in oklch, var(--color-surface-2) 50%, transparent);
}

/* ────────── MOBILE: TRANSFORM TO CARDS ────────── */
@media (max-width: 768px) {

  .table-fluid,
  [data-table="cards"] {
    background: transparent;
    border: 0;
  }

  .table-fluid thead,
  [data-table="cards"] thead {
    /* visually hide but keep accessible */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .table-fluid tbody tr,
  [data-table="cards"] tbody tr {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-2);
    padding: var(--space-3);
    margin-block-end: var(--space-3);
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-3);
  }

  .table-fluid tbody td,
  [data-table="cards"] tbody td {
    display: grid;
    grid-template-columns: 8em 1fr;
    gap: var(--space-2);
    padding: var(--space-1) 0;
    border-bottom: 1px dashed color-mix(in oklch, var(--color-border) 60%, transparent);
    align-items: baseline;
  }

  .table-fluid tbody td:last-child,
  [data-table="cards"] tbody td:last-child {
    border-bottom: 0;
  }

  /* Show data-label as a column header on mobile */
  .table-fluid tbody td::before,
  [data-table="cards"] tbody td::before {
    content: attr(data-label);
    font-family: var(--font-display);
    font-size: var(--text-xs);
    font-weight: 600;
    letter-spacing: var(--tracking-wider);
    color: var(--color-text-muted);
    align-self: center;
  }

  /* If a td has no data-label, remove the empty space */
  .table-fluid tbody td:not([data-label])::before,
  [data-table="cards"] tbody td:not([data-label])::before {
    content: none;
  }

  .table-fluid tbody td:not([data-label]),
  [data-table="cards"] tbody td:not([data-label]) {
    grid-template-columns: 1fr;
  }
}

/* Reduced motion: snappier transition */
@media (prefers-reduced-motion: reduce) {
  .table-fluid, [data-table="cards"] { transition: none; }
}
```

### Step 5 — HTML data-label Augmentation

في `platform/index.html`، أضف class `table-fluid` (أو `data-table="cards"`) على كل جدول معقَّد، ثم augment كل `<td>` بـ `data-label`:

**أمثلة (manual pass — ~30-50 جدول):**

```html
<!-- BEFORE -->
<table class="comparison-table">
  <thead>
    <tr><th>المدرسة</th><th>السنة</th><th>المؤسس</th><th>الفلسفة</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>SPIN Selling</td>
      <td>1988</td>
      <td>Neil Rackham</td>
      <td>Situation/Problem/Implication/Need-payoff</td>
    </tr>
    <!-- ... -->
  </tbody>
</table>

<!-- AFTER -->
<table class="comparison-table table-fluid">
  <thead>
    <tr><th>المدرسة</th><th>السنة</th><th>المؤسس</th><th>الفلسفة</th></tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="المدرسة">SPIN Selling</td>
      <td data-label="السنة">1988</td>
      <td data-label="المؤسس">Neil Rackham</td>
      <td data-label="الفلسفة">Situation/Problem/Implication/Need-payoff</td>
    </tr>
    <!-- ... -->
  </tbody>
</table>
```

**Selection rule:** أي `<table>` فيه ≥ 3 columns → augment بـ `table-fluid` + `data-label`. الجداول البسيطة (2 columns key/value) قد تبقى كما هي.

> **اختصار للسرعة:** يمكنك كتابة node script (script-only — لا يكسر شيئاً، يقرأ thead → يضيف data-label لـ td-s). لا داعي لـ idempotency check — augment-only.

### Step 6 — Overflow Audit

```bash
grep -nE 'overflow-x:\s*scroll|overflow-x:\s*auto' platform/assets/style.css
```

**Strategy:**
- بقي `overflow-x: auto` فقط على containers تحوي صور كبيرة جداً أو ASCII art.
- جميع الباقي → حذف (الجداول الآن تتحول إلى cards).
- إضف `min-width: 0` على grid children الذين يحوون نص طويل (يمنع expand).

```css
/* Universal min-width: 0 fix for grid children */
.bento-fluid > *,
.bento-grid > *,
.grid-fluid > * {
  min-width: 0;
}

/* Long word break on prose */
.u-prose, .type-body, .type-body-lead {
  overflow-wrap: anywhere;
  word-break: normal;
}

/* Scenarios with long URLs */
[data-block-type="scenario"] a,
.u-prose a {
  word-break: break-word;
}
```

### Step 7 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 5
   1. Bento grids: auto-fit minmax(min(100%, 280px), 1fr) — no media queries needed.
   2. Tables: opt-in via .table-fluid or [data-table="cards"]. 
      Each <td> needs data-label="<header>" to render properly on mobile.
   3. Min-widths use min(100%, Npx) to never overflow.
   4. min-width: 0 on grid children prevents content blowout.
   5. overflow-x scroll allowed ONLY on intentional containers.
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391

# Phase 5 changes
grep -cE 'min-width:[ ]*[0-9]{3,}px' platform/assets/style.css  # → ≤ 2 (only inside min() expressions)
grep -c 'auto-fit, minmax' platform/assets/style.css   # → ≥ 5
grep -c 'data-label=' platform/index.html              # → 200-400
grep -c 'table-fluid\|data-table="cards"' platform/index.html  # → 30-60
grep -c 'min-width: 0' platform/assets/style.css       # → ≥ 1

# Manual checks (mandatory):
# - Open at 375px wide (iPhone SE) — NO horizontal scroll
# - Open at 360px wide (Galaxy A) — NO horizontal scroll  
# - Comparison tables → display as cards on mobile
# - Bento dashboard → reflows naturally without breaks
# - Lighthouse Mobile Best Practices → 100
```

---

## ✅ معايير القبول (Phase 5)

- [ ] Zero `min-width: NNNpx` صلب (كله `min(100%, X)` أو محذوف).
- [ ] Fluid Bento utilities (`bento-fluid` و variants) موجودة.
- [ ] `.bento-grid` الموجودة (W14 P3) أصبحت fluid by default.
- [ ] Table-to-cards CSS مكتوبة وتعمل.
- [ ] ~30-60 جدول معقَّد حصل على `table-fluid` + `data-label` على كل td.
- [ ] `min-width: 0` على grid children.
- [ ] Zero horizontal scroll على شاشات 360-480px.
- [ ] الموقع يعرض ك app على الموبايل، لا desktop مضغوط.
- [ ] Console: 0 errors.
- [ ] Lighthouse Mobile Best Practices = 100.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css
git commit -m "phase 5 (creative): fluid bento + responsive tables — auto-fit minmax(min(100%, 280px), 1fr) replaces all min-width: 900px patterns; tables with .table-fluid or [data-table='cards'] transform to stacked cards on mobile via data-label pseudo-headers; ~300 td augmented across 30-60 comparison tables; min-width: 0 on grid children prevents overflow. Zero horizontal scroll at 360px."

# state
git add state/PROGRESS.json state/snapshots/worker-17-phase-5.json
git commit -m "state: creative phase 5 committed and pushed"
```

— نهاية Phase 5.

🎵 **Resonance check:** هل الموبايل يقدر يقرأ كل جدول دون أن يلوي رقبته؟ نعم → انتقل لـ Phase 6 (الختام).
