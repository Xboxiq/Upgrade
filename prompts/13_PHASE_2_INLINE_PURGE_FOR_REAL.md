# 🧹 WORKER 13 — Phase 2/3 — Inline Purge For Real (إنجاز Worker 12 / Phase 7 الفعلي)
> **اقرأ أولاً:** `prompts/13_WORKER_AURORA_COMPLETION.md` — قسم **Preservation Guard** (إجباري).
> **الفلسفة:** Phase 7 من Worker 12 ادّعى تخفيض inline من 1671→587 و !important من 144→13. الواقع: inline=**592**، !important غير مبرّر=**100**، utilities `u-grad-*` = **0**. هذا الـ phase يصلح الفجوة بصرامة.

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` | **APPEND** كتلة جديدة `/* AURORA v15.1 — Real Utilities Pack */` فيها utilities (gradients, colors, spacing, sizes). **حذف** `!important` غير مبرّر بشرط التحقق البصري | تعديل أي قاعدة قائمة. حذف tokens. حذف `!important` داخل `@media print`, `@media (prefers-reduced-motion: reduce)`, `@media (forced-colors: active)` (هذي مشروعة) |
| `index.html` | **استبدال** inline `style="..."` بـ class. كل استبدال يجب أن يحافظ على نفس السلوك البصري (اختبار بصري بعد كل دفعة 50) | حذف أي عنصر HTML. تغيير ترتيب أو IDs |
| `scripts/cleanup-inline-styles.mjs` | **توسيع** mappings (إضافة patterns جديدة لـ gradients, colors, spacing) | تغيير منطق السكربت الأساسي |

**Sacred preserved:**
- 16 page sections.
- 391 qcalc references.
- 14 Upg.* APIs.
- كل `data-*` و `id` و `aria-*`.
- كل styles داخل `<style>` و `<svg>` و `<filter>` (لا تُلمس — هذي ليست inline على عناصر markup).

**خط أحمر:** بعد كل دفعة 50 استبدال، افتح المنصة وتأكد إن الـ visual نفسه. لو عنصر واحد طلع شكله غلط → rollback تلك الدفعة.

---

## 🎯 الهدف

| المقياس | الواقع الحالي | الهدف |
|---|---:|---:|
| inline `style="..."` في index.html | **592** | ≤ 200 |
| `!important` غير مبرّر | **100** | ≤ 20 |
| utilities `u-grad-*` (gradient) | **0** | ≥ 7 |
| utilities `u-c-*` (color) | عُد قبل البداية | ≥ 9 |
| utilities `u-mb-*`, `u-mt-*` (spacing) | عُد قبل البداية | تكميل ما ينقص |

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT
├─ Phase: 2/3 — Inline Purge For Real
├─ Estimated lines: ~640 (CSS utilities + script extensions + many small HTML edits)
├─ Files to touch:
│   ├─ platform/assets/style.css        (APPEND utilities pack)
│   ├─ platform/index.html              (replace inline → class)
│   └─ scripts/cleanup-inline-styles.mjs (extend mappings)
├─ Files NOT touched: app.js, sw.js, manifest, favicon
├─ Sacred preserved: 16 pages, 391 qcalc, 14 Upg APIs
└─ Branch: continue worker-13-aurora-completion.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — التحليل: من أين يأتي الـ 592 inline style؟

```bash
# اطّلع على أنماط الـ inline style شيوعاً:
grep -oE 'style="[^"]+"' platform/index.html | sort | uniq -c | sort -rn | head -30 > /tmp/inline-patterns.txt

# الأنماط الشائعة بناءً على الفحص الفعلي على main حالياً:
#   142 patterns بـ 5 declarations
#   102 patterns بـ 4 declarations
#    91 patterns بـ 3 declarations
#    71 patterns بـ 7 declarations
#    64 patterns بـ 2 declarations
#
# أكثر القيم تكراراً:
#   3× style="font-size:18px; margin-bottom:8px;"
#   2× style="width:39%"
#   2× style="font-size:24px;"
#   2× style="height:1px; background:var(--border); margin:14px 0;"
#   2× style="font-size:9px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; ..."
```

### Step 2 — Utilities Pack Real (الإضافة الكاملة)

أضف في `style.css` (في القسم الأخير قبل `@media`):

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15.1 — Real Utilities Pack (Worker 13 / Phase 2)
   كل inline style شائع له utility هنا.
   ═══════════════════════════════════════════════════════════════ */

/* ── Gradients (مفقودة من Worker 12 رغم الادعاء) ──────────────── */
.u-grad-brand    { background: linear-gradient(135deg, var(--color-brand), var(--color-brand-strong)); color: hsl(40 60% 99%); }
.u-grad-success  { background: linear-gradient(135deg, var(--color-success), var(--color-info)); color: hsl(40 60% 99%); }
.u-grad-warm     { background: linear-gradient(135deg, var(--color-warning), var(--color-danger)); color: hsl(40 60% 99%); }
.u-grad-violet   { background: linear-gradient(135deg, hsl(265 70% 56%), hsl(210 90% 56%)); color: hsl(40 60% 99%); }
.u-grad-pink     { background: linear-gradient(135deg, hsl(330 80% 56%), hsl(265 70% 56%)); color: hsl(40 60% 99%); }
.u-grad-amber    { background: linear-gradient(135deg, var(--color-warning), var(--color-success)); color: hsl(40 60% 99%); }
.u-grad-tint     { background: linear-gradient(135deg, color-mix(in oklch, var(--color-tint, var(--color-brand)) 80%, white 10%), var(--color-tint, var(--color-brand))); color: hsl(40 60% 99%); }

/* ── Colors (semantic) ────────────────────────────────────────── */
.u-c-text       { color: var(--color-text); }
.u-c-muted      { color: var(--color-text-muted); }
.u-c-faint      { color: var(--color-text-faint); }
.u-c-brand      { color: var(--color-brand); }
.u-c-tint       { color: var(--color-tint, var(--color-brand)); }
.u-c-accent     { color: var(--accent); }
.u-c-success    { color: var(--color-success); }
.u-c-warning    { color: var(--color-warning); }
.u-c-danger     { color: var(--color-danger); }
.u-c-info       { color: var(--color-info); }

/* ── Spacing — granular margin / padding ──────────────────────── */
.u-m-0  { margin: 0; }
.u-mb-0 { margin-bottom: 0; }
.u-mb-1 { margin-bottom: var(--space-1); }
.u-mb-2 { margin-bottom: var(--space-2); }
.u-mb-3 { margin-bottom: var(--space-3); }
.u-mb-4 { margin-bottom: var(--space-4); }
.u-mb-5 { margin-bottom: var(--space-5); }
.u-mb-6 { margin-bottom: var(--space-6); }
.u-mb-7 { margin-bottom: var(--space-7); }
.u-mt-1 { margin-top: var(--space-1); }
.u-mt-2 { margin-top: var(--space-2); }
.u-mt-3 { margin-top: var(--space-3); }
.u-mt-4 { margin-top: var(--space-4); }
.u-mt-6 { margin-top: var(--space-6); }
.u-mt-7 { margin-top: var(--space-7); }
.u-pad-2 { padding: var(--space-2); }
.u-pad-3 { padding: var(--space-3); }
.u-pad-4 { padding: var(--space-4); }
.u-pad-6 { padding: var(--space-6); }
.u-pad-7 { padding: var(--space-7); }
.u-gap-1 { gap: var(--space-1); }
.u-gap-2 { gap: var(--space-2); }
.u-gap-3 { gap: var(--space-3); }
.u-gap-4 { gap: var(--space-4); }
.u-gap-6 { gap: var(--space-6); }

/* ── Width / max-width ────────────────────────────────────────── */
.u-w-full   { width: 100%; }
.u-w-fit    { width: fit-content; }
.u-w-20     { width: 20%; }
.u-w-24     { width: 24%; }
.u-w-38     { width: 38%; }
.u-w-39     { width: 39%; }
.u-mw-text  { max-width: var(--container-text); }
.u-mw-base  { max-width: var(--container-base); }

/* ── Layout shortcuts ─────────────────────────────────────────── */
.u-flex     { display: flex; }
.u-iflex    { display: inline-flex; }
.u-grid     { display: grid; }
.u-items-center { align-items: center; }
.u-items-start  { align-items: flex-start; }
.u-justify-between { justify-content: space-between; }
.u-justify-center  { justify-content: center; }
.u-flex-col { flex-direction: column; }

/* ── Type sizes (compound presets — most-repeated inline patterns) ── */
.u-t-eyebrow {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.u-t-card-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.2px;
  margin-bottom: 3px;
}
.u-t-card-title-tight {
  font-size: 17px;
  font-weight: 800;
  color: var(--text);
}
.u-t-list-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 3px;
}
.u-t-section-mini {
  font-size: 13px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 4px;
}
.u-t-h-md { font-size: 18px; margin-bottom: 8px; }
.u-t-h-lg { font-size: 24px; }

/* ── Common decorations (replace 2× inline patterns) ───────────── */
.u-divider-h {
  height: 1px;
  background: var(--border);
  margin: 14px 0;
}
.u-pad-card-md   { padding: 11px 28px; }
.u-pad-card-lg   { padding: 22px 26px; margin-bottom: 28px; }

/* ── Text alignment / weights ─────────────────────────────────── */
.u-text-center { text-align: center; }
.u-text-end    { text-align: end; }
.u-fw-medium   { font-weight: 500; }
.u-fw-semi     { font-weight: 600; }
.u-fw-bold     { font-weight: 700; }
.u-fw-heavy    { font-weight: 800; }
```

### Step 3 — توسيع cleanup script

افتح `scripts/cleanup-inline-styles.mjs`. ابحث عن `MAPPINGS` array (أو ما يماثله). أضف بعد آخر mapping موجود:

```js
// ═══════════════════════════════════════════════════════════════
// AURORA v15.1 — Worker 13 / Phase 2 mappings (gradients + compound)
// كل mapping: pattern (regex أو string) → class to apply.
// إن وُجدت declarations إضافية في الـ inline تتجاوز الـ pattern،
// تركها inline لتطبيقها يدوياً (السكربت لا يفقد بيانات).
// ═══════════════════════════════════════════════════════════════

const AURORA_v15_1_MAPPINGS = [
  // Gradients
  {
    pattern: /^background:\s*linear-gradient\(135deg,\s*#22C55E,\s*#0EA5E9\);?\s*color:\s*#fff;?$/i,
    classes: ['u-grad-success']
  },
  {
    pattern: /^background:\s*linear-gradient\(135deg,\s*#F97316,\s*#EF4444\);?\s*color:\s*#fff;?$/i,
    classes: ['u-grad-warm']
  },
  {
    pattern: /^background:\s*linear-gradient\(135deg,\s*#8B5CF6,\s*#0EA5E9\);?\s*color:\s*#fff;?$/i,
    classes: ['u-grad-violet']
  },
  {
    pattern: /^background:\s*linear-gradient\(135deg,\s*#EC4899,\s*#8B5CF6\);?\s*color:\s*#fff;?$/i,
    classes: ['u-grad-pink']
  },
  {
    pattern: /^background:\s*linear-gradient\(135deg,\s*#F59E0B,\s*#10B981\);?\s*color:\s*#fff;?$/i,
    classes: ['u-grad-amber']
  },
  // Compound type presets (3 occurrences)
  {
    pattern: /^font-size:\s*18px;\s*margin-bottom:\s*8px;?$/i,
    classes: ['u-t-h-md']
  },
  // Compound type presets (2 occurrences)
  {
    pattern: /^font-size:\s*9px;\s*font-weight:\s*800;\s*letter-spacing:\s*1\.2px;\s*text-transform:\s*uppercase;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*6px;?$/i,
    classes: ['u-t-eyebrow']
  },
  {
    pattern: /^font-size:\s*17px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*letter-spacing:\s*-0\.2px;\s*margin-bottom:\s*3px;?$/i,
    classes: ['u-t-card-title']
  },
  {
    pattern: /^font-size:\s*17px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);?$/i,
    classes: ['u-t-card-title-tight']
  },
  {
    pattern: /^font-size:\s*14px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*margin-bottom:\s*3px;?$/i,
    classes: ['u-t-list-title']
  },
  {
    pattern: /^font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*var\(--accent\);\s*margin-bottom:\s*4px;?$/i,
    classes: ['u-t-section-mini']
  },
  {
    pattern: /^font-size:\s*13px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);?$/i,
    classes: ['u-t-card-title-tight']
  },
  {
    pattern: /^font-size:\s*24px;?$/i,
    classes: ['u-t-h-lg']
  },
  // Decorations
  {
    pattern: /^height:\s*1px;\s*background:\s*var\(--border\);\s*margin:\s*14px\s*0;?$/i,
    classes: ['u-divider-h']
  },
  {
    pattern: /^padding:\s*22px\s*26px;\s*margin-bottom:\s*28px;?$/i,
    classes: ['u-pad-card-lg']
  },
  {
    pattern: /^padding:\s*11px\s*28px;?$/i,
    classes: ['u-pad-card-md']
  },
  // Widths (single-decl)
  { pattern: /^width:\s*20%;?$/i, classes: ['u-w-20'] },
  { pattern: /^width:\s*24%;?$/i, classes: ['u-w-24'] },
  { pattern: /^width:\s*38%;?$/i, classes: ['u-w-38'] },
  { pattern: /^width:\s*39%;?$/i, classes: ['u-w-39'] },
];

// Append to existing mappings:
MAPPINGS.push(...AURORA_v15_1_MAPPINGS);
```

> **ملاحظة:** الكود أعلاه افتراضي (يفترض المتغير `MAPPINGS` موجود). افتح السكربت أولاً وحدّد الـ pattern الصحيح للـ append.

### Step 4 — تشغيل السكربت + قياس النتيجة

```bash
# قبل التشغيل: لقطة من الواقع
echo "BEFORE:"
echo "  inline: $(grep -c 'style=\"' platform/index.html)"
echo "  !important total: $(grep -c '!important' platform/assets/style.css)"

# تشغيل
node scripts/cleanup-inline-styles.mjs

# بعد التشغيل
echo "AFTER:"
echo "  inline: $(grep -c 'style=\"' platform/index.html)"
echo "  !important total: $(grep -c '!important' platform/assets/style.css)"
```

**الهدف الفعلي بعد التشغيل:**
- inline ≤ 200
- لو السكربت ما وصل ≤ 200 → استكمل **يدوياً** عبر replacements بصرية محددة (دفعات صغيرة، اختبار بصري بين كل دفعة).

### Step 5 — !important Purge اليدوي

```bash
# اعرض كل !important خارج الـ blessed media:
awk '
  /@media[[:space:]]*\(prefers-reduced-motion[[:space:]]*:[[:space:]]*reduce\)|@media[[:space:]]*print|@media[[:space:]]*\(forced-colors/ { in_blessed=1 }
  in_blessed && /\}/ { brace_depth--; if (brace_depth <= 0) { in_blessed=0; brace_depth=0 } }
  in_blessed && /\{/ { brace_depth++ }
  !in_blessed && /!important/ { print FILENAME":"NR": "$0 }
' platform/assets/style.css
```

لكل سطر يطلع:
1. اقرأ السلسلة كاملة من السياق.
2. احذف `!important`.
3. لو السلوك تكسّر → أعد `!important` **و** سجّل السطر في تعليق `/* AURORA: requires !important due to <reason> */`.
4. لو السلوك سليم → أبقِ التغيير.

**الهدف:** ≤ 20 `!important` بعد الـ cleanup (الباقي مبرّر فقط بـ blessed media أو موثَّق بتعليق).

### Step 6 — تحقق نهائي

```bash
echo "=== FINAL ==="
echo "inline:                          $(grep -c 'style=\"' platform/index.html)  (target ≤ 200)"
echo "!important total:                $(grep -c '!important' platform/assets/style.css)"
echo "u-grad utilities defined:        $(grep -c '\.u-grad-' platform/assets/style.css)  (target ≥ 7)"
echo "u-c color utilities defined:     $(grep -c '\.u-c-' platform/assets/style.css)  (target ≥ 9)"
echo "Sacred unchanged:"
echo "  pages:                         $(grep -c '<section class=\"page' platform/index.html)  (target = 16)"
echo "  qcalc refs:                    $(grep -c qcalc platform/index.html)  (target = 391)"
echo "  Upg.* APIs:                    $(grep -cE 'window\.Upg\.(theme|icons|gateway|calc|cmdk|state|production|type|scroll|nav|identity|greet|countup|motion)' platform/assets/app.js)  (target ≥ 36)"
```

---

## ✅ Acceptance Criteria

- [ ] `grep -c 'style="' platform/index.html` ≤ **200**
- [ ] `grep -c '!important' platform/assets/style.css` ≤ **40 total** (≤ 20 stray + ≤ 20 blessed reduced-motion/print/forced-colors)
- [ ] `grep -c '\.u-grad-' platform/assets/style.css` ≥ **7**
- [ ] `grep -c '\.u-c-' platform/assets/style.css` ≥ **9**
- [ ] Pages count: **16** (لم يتغير)
- [ ] qcalc refs: **391** (لم يتغير)
- [ ] Upg.* APIs: **14** كلهم موجودين
- [ ] Console: **0 errors**
- [ ] Visual regression: **none** (فحص بصري لكل صفحة من الـ16)

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 2 (worker 13): real inline purge — utilities pack + cleanup script v2"
2. push    : worker-13-aurora-completion → origin
3. update  : state/PROGRESS.json (phase=2)
4. snapshot: state/snapshots/worker-13-phase-2.json (مع أرقام BEFORE/AFTER فعلية)
5. commit  : "state: worker 13 phase 2 committed and pushed"
6. push
```

> ⚠️ **PR description:** اكتب الأرقام الفعلية من `grep` فقط. لا تكرر خطأ Worker 12 / PR #44.

**التالي:** `prompts/13_PHASE_3_FINAL_POLISH.md`.

— نهاية Phase 2.
