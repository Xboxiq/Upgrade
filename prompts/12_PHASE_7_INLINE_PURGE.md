# 🧹 WORKER 12 — Phase 7/7 — Inline Purge & Production Polish
> **يختم:** Worker 12 (AURORA / Cathedral v15).
> **الفلسفة:** الـ phase الأخير لا يضيف بريقاً، بل يحذف الضوضاء. الواجهة الاحترافية = ملف نظيف يقرأ مرة واحدة.

---

## 🎯 الهدف

1. **Inline `style=` Purge** — من 1602 إلى ≤ 200 (نقلها كلها إلى utilities/classes).
2. **`!important` Purge** — من 144 → ≤ 20 (الباقي مبرّر فقط في reset/print/forced-colors).
3. **Utilities pack** — تكميل ما ينقص من utilities (gradients, sizes, gaps).
4. **Per-page tint integration** — تطبيق tints في headers/eyebrows لكل صفحة من 11.
5. **Lighthouse Pass** — Performance ≥ 90, Accessibility ≥ 95.
6. **Final Sanity** — `console.assert` يفحص أن كل `Upg.*` API موجود، lazy-mount يعمل، عدم وجود warnings.
7. **CHANGELOG entry** — ملف `state/CHANGELOG.md` يحفظ ملخص v15.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 7 PRE-FLIGHT
├─ Phase: 7/7 — Inline Purge & Production Polish
├─ Estimated lines: ~580
├─ Files to touch:
│   ├─ platform/index.html              (purge inline styles)
│   ├─ platform/assets/style.css        (utilities pack + final !important cleanup)
│   ├─ platform/assets/app.js           (sanity assert + final wiring)
│   ├─ scripts/cleanup-inline-styles.mjs (تشغيل + تحديثات حسب الحاجة)
│   └─ state/CHANGELOG.md               (إنشاء ملف خفيف)
├─ Tools: scripts/cleanup-inline-styles.mjs (موجود من Worker 11 / Phase 7)
└─ Branch: continue worker-12-aurora.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Utilities Pack الكامل

أضف في `style.css` (في القسم الأخير قبل media queries):

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Final Utilities Pack (Worker 12 / Phase 7)
   كل inline style شائع له utility هنا.
   ═══════════════════════════════════════════════════════════════ */

/* Gradients tokens — تستعمل بدلاً من inline linear-gradient */
.u-grad-brand    { background: linear-gradient(135deg, var(--color-brand), var(--color-brand-strong)); color: hsl(40 60% 99%); }
.u-grad-success  { background: linear-gradient(135deg, var(--color-success), var(--color-info)); color: hsl(40 60% 99%); }
.u-grad-warm     { background: linear-gradient(135deg, var(--color-warning), var(--color-danger)); color: hsl(40 60% 99%); }
.u-grad-violet   { background: linear-gradient(135deg, hsl(265 70% 56%), hsl(210 90% 56%)); color: hsl(40 60% 99%); }
.u-grad-pink     { background: linear-gradient(135deg, hsl(330 80% 56%), hsl(265 70% 56%)); color: hsl(40 60% 99%); }
.u-grad-amber    { background: linear-gradient(135deg, var(--color-warning), var(--color-success)); color: hsl(40 60% 99%); }
.u-grad-tint     { background: linear-gradient(135deg,
                       color-mix(in oklch, var(--color-tint, var(--color-brand)) 80%, white 10%),
                       var(--color-tint, var(--color-brand))); color: hsl(40 60% 99%); }

/* Color utilities — semantic only */
.u-c-text       { color: var(--color-text); }
.u-c-muted      { color: var(--color-text-muted); }
.u-c-faint      { color: var(--color-text-faint); }
.u-c-brand      { color: var(--color-brand); }
.u-c-tint       { color: var(--color-tint, var(--color-brand)); }
.u-c-success    { color: var(--color-success); }
.u-c-warning    { color: var(--color-warning); }
.u-c-danger     { color: var(--color-danger); }
.u-c-info       { color: var(--color-info); }

/* Margin / padding granular */
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
.u-gap-1 { gap: var(--space-1); }
.u-gap-2 { gap: var(--space-2); }
.u-gap-3 { gap: var(--space-3); }
.u-gap-4 { gap: var(--space-4); }
.u-gap-6 { gap: var(--space-6); }

/* Width / max-width */
.u-w-full   { width: 100%; }
.u-w-fit    { width: fit-content; }
.u-mw-text  { max-width: var(--container-text); }
.u-mw-base  { max-width: var(--container-base); }

/* Flex/Grid quick */
.u-flex     { display: flex; }
.u-iflex    { display: inline-flex; }
.u-grid     { display: grid; }
.u-items-center { align-items: center; }
.u-justify-between { justify-content: space-between; }
.u-justify-center  { justify-content: center; }

/* Text alignment / weights */
.u-text-center { text-align: center; }
.u-text-end    { text-align: end; }
.u-fw-medium   { font-weight: var(--weight-medium); }
.u-fw-semi     { font-weight: var(--weight-semibold); }
.u-fw-bold     { font-weight: var(--weight-bold); }
```

### Step 2 — تشغيل سكربت التنظيف

ملف `scripts/cleanup-inline-styles.mjs` موجود من Worker 11. حدّثه لو لزم لإضافة mappings جديدة (gradients، colors، spacings) ثم نفّذ:

```bash
node scripts/cleanup-inline-styles.mjs
```

ثم افحص النتيجة:
```bash
grep -c 'style="' platform/index.html   # هدف ≤ 200
```

> **القاعدة الذهبية:** لو فيه inline `style="background: linear-gradient(135deg, #X, #Y)"` متشابه يتكرر، أنشئ utility class `.u-grad-XYZ` بدل ما تكرر.

### Step 3 — `!important` Purge النهائي

```bash
grep -n '!important' platform/assets/style.css
```

لكل سطر باقي:
- لو في `print { ... !important }` أو `forced-colors { ... !important }` أو `@media (prefers-reduced-motion) *::before {... !important}` → **اتركه** (مشروع).
- أي `!important` آخر → احذفه + استخدم selector أعمق أو token.

**الهدف النهائي:** `grep -c '!important' platform/assets/style.css` ≤ 20.

### Step 4 — Per-page Tint في الـ Page Headers

في كل `<section class="page" id="page-XXX"> > <div class="page-header">`، تأكد أن `<h1>` يستعمل tint:

```css
.page-header h1 { color: var(--color-text); }
.page-header .page-eyebrow,
.page-header .h-eyebrow { color: var(--color-tint, var(--color-brand)); }

/* tint underline على H1 */
.page-header h1::after {
  content: ''; display: block;
  width: 56px; height: 3px;
  margin-top: var(--space-2);
  border-radius: 2px;
  background: linear-gradient(90deg, var(--color-tint, var(--color-brand)), transparent);
}
```

### Step 5 — Sanity Assert + Boot Banner

في `app.js` — في النهاية:

```js
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Boot Banner & Sanity (Worker 12 / Phase 7)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const required = ['theme','icons','gateway','calc','cmdk','state','production','type','scroll','nav','identity','greet','countup','motion'];
  const missing = required.filter(k => !window.Upg?.[k]);
  if (missing.length) {
    console.warn('[AURORA] missing modules:', missing);
  }
  // One-shot banner (sessionStorage to avoid spam)
  if (!sessionStorage.getItem('upg_aurora_banner')) {
    sessionStorage.setItem('upg_aurora_banner', '1');
    console.log('%c AURORA v15 ', 'background:#0E1220;color:#66FCF1;padding:4px 8px;border-radius:4px;font-weight:bold;',
                'منصة Upgrade — Apple-grade UI/UX');
  }
})();
```

### Step 6 — Lighthouse-pass tweaks

- تأكد أن كل صور SVG inline لها `aria-hidden="true"` لو decorative.
- كل `<button>` بدون `aria-label` ولا نص → أضف `aria-label`.
- `<html lang="ar" dir="rtl">` (موجود).
- `meta[name="description"]` (موجود).
- Service worker (موجود من Worker 11).
- ضغط CSS / JS غير مطلوب (الملف يخدم محلياً، لكن استخدم `display=swap` لـ Cairo — موجود).
- اختبر:
  ```bash
  npx lighthouse http://localhost:8080 --only-categories=performance,accessibility,best-practices --form-factor=mobile --quiet
  ```

### Step 7 — CHANGELOG.md

أنشئ `state/CHANGELOG.md`:

```md
# Upgrade Platform — CHANGELOG

## v15.0 — AURORA (Apple-grade UI/UX) — 2026

### Added
- 4-tier glass material system (thin / regular / thick / chrome)
- Linen-Bone off-white palette
- Source-list sidebar + dynamic-island topbar
- Bento dashboard with per-page identity tints
- Apple-style motion tokens (springs + view transitions)
- Cursor glow + lift on cards
- Type scale via clamp() + 4pt spacing grid
- Public APIs: Upg.type, Upg.scroll, Upg.nav, Upg.identity, Upg.greet, Upg.countup, Upg.motion

### Changed
- Inline style= reduced from 1602 → ≤ 200
- !important reduced from 144 → ≤ 20
- Topbar is now sticky island with scroll-aware compaction
- Sidebar groups follow uppercase tracked label pattern

### Removed
- Legacy welcome-banner duplicate hero
- Legacy `grid-4` stats inside dashboard
- Inline gradients on nav-badges (moved to .nav-badge--* tokens)

## v14 — Cathedral (Worker 11)
- (سابق)
```

### Step 8 — Final State Update

في `state/PROGRESS.json`:
- `current.worker = "12"`, `phase = 7`, `phases_total = 7`, `status = "completed"`.
- `next_action = "Worker 12 AURORA complete — open PR worker-12-aurora → main."`
- أضف 7 entries في `completed_phases`.

---

## ✅ Acceptance Criteria

- [ ] `grep -c 'style="' platform/index.html` ≤ 200.
- [ ] `grep -c '!important' platform/assets/style.css` ≤ 20.
- [ ] كل `Upg.*` API الـ 13 معرّفة (نفّذ في console: `Object.keys(Upg)` ← 13 مفتاح).
- [ ] كل page-header فيها underline tint بطول 56px.
- [ ] Lighthouse mobile: Performance ≥ 90 / Accessibility ≥ 95 / Best Practices ≥ 95.
- [ ] لا errors ولا warnings في console (ما عدا banner واحد).
- [ ] `state/CHANGELOG.md` موجود.
- [ ] الثيمين Auto/Dark/Light كلهم سليمين بصرياً عبر 14 صفحة.

---

## 🛡️ في نهاية الـ Phase (الـ Worker بأكمله)

```
1. commit  : "phase 7 (aurora): inline purge + production polish — Worker 12 complete"
2. push    : worker-12-aurora → origin
3. update  : state/PROGRESS.json (worker=12, phase=7, status="completed")
4. snapshot: state/snapshots/worker-12-phase-7.json
5. commit  : "state: aurora phase 7 + worker 12 complete"
6. push    : final push
7. PR      : open "feat: Worker 12 — AURORA (Apple-grade UI/UX)" → main
   description includes:
   • قائمة الـ 7 phases المُنجَزة
   • قبل/بعد للأرقام (inline / !important / Lighthouse)
   • الـ Public APIs المضافة
```

— نهاية Worker 12. المنصة الآن Cathedral v15 / AURORA.
