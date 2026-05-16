# ✨ WORKER 13 — Phase 3/3 — Final Polish (Wordmark + Sidebar Toggle + Sanity)
> **اقرأ أولاً:** `prompts/13_WORKER_AURORA_COMPLETION.md` — قسم **Preservation Guard** (إجباري).
> **يختم:** Worker 13 (AURORA Completion / Cathedral v15.1).
> **الفلسفة:** اللمسات الصغيرة هي اللي تخلي المنصة تحس Apple-grade فعلاً.

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | إضافة `class="u-font-accent"` على `gateway-wordmark`. إضافة `<button>` toggle-sidebar **في بداية** `.topbar-actions`. إضافة `class="h-quote"` على citations | حذف أي عنصر، تغيير ترتيب أزرار topbar، تغيير نص wordmark |
| `style.css` | **APPEND** قواعد `.u-font-accent`, `.u-font-display`, `.u-font-text`, `.u-font-numeric`, `.h-quote` (لو غير موجودة) | تعديل قواعد قائمة |
| `app.js` | **APPEND** sanity assert IIFE في النهاية (يطبع warning لو 14 module ناقصين) | تعديل أي IIFE قائم |
| `state/CHANGELOG.md` | **APPEND** قسم v15.1 | حذف v15 entry |

**Sacred preserved:** كل شي من Worker 12.

---

## 🎯 الهدف

ثلاث لمسات صغيرة لكن مؤثرة:

1. **Brand Wordmark accent** — "Upgrade" يستعمل Aref Ruqaa font (بصمة عربية على الـ wordmark).
2. **Sidebar toggle button** — زر `Cmd+\` shortcut موجود في `Upg.nav` لكن ما فيه زر مرئي في topbar. نضيفه.
3. **Boot sanity assert** — IIFE يفحص أن 14 Upg API موجودين، يطبع warning واضح لو واحد ناقص.
4. **CHANGELOG v15.1 entry** — توثيق ما حصل في Worker 13.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT
├─ Phase: 3/3 — Final Polish (آخر phase في Worker 13)
├─ Estimated lines: ~340
├─ Files to touch:
│   ├─ platform/index.html              (3 augmentations)
│   ├─ platform/assets/style.css        (4 utility classes إن لم تكن موجودة)
│   ├─ platform/assets/app.js           (sanity IIFE)
│   └─ state/CHANGELOG.md               (v15.1 section)
└─ Branch: continue worker-13-aurora-completion.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Wordmark accent

اقرأ `index.html`، السطر ~228 (يحوي `<span class="gateway-wordmark">Upgrade</span>`).

استبدل بـ:

```html
<span class="gateway-wordmark u-font-accent">Upgrade</span>
```

ثم في `style.css` (في القسم الأخير)، تأكد من وجود هذي القواعد (لو غير موجودة، أضفها):

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15.1 — Font family utilities (Worker 13 / Phase 3)
   ═══════════════════════════════════════════════════════════════ */
.u-font-display { font-family: var(--font-display); font-weight: var(--weight-heavy, 800); }
.u-font-text    { font-family: var(--font-text); }
.u-font-numeric { font-family: var(--font-numeric); font-variant-numeric: tabular-nums lining-nums; }
.u-font-accent  { font-family: var(--font-accent); }

/* Quote utility — للاستشهادات في صفحات psych و EQ و الـ training */
.h-quote {
  font-family: var(--font-accent);
  font-size: var(--text-xl, 1.25rem);
  line-height: var(--leading-relaxed, 1.7);
  color: var(--color-text-muted);
  border-inline-start: 3px solid var(--color-tint, var(--color-brand));
  padding-inline-start: var(--space-4);
  margin-block: var(--space-5);
}
.h-quote::before {
  content: "\201C";
  color: var(--color-tint, var(--color-brand));
  font-size: 1.4em;
  vertical-align: -0.15em;
  margin-inline-end: 0.1em;
}
.h-quote::after {
  content: "\201D";
  color: var(--color-tint, var(--color-brand));
  font-size: 1.4em;
  vertical-align: -0.15em;
  margin-inline-start: 0.1em;
}
```

### Step 2 — Sidebar toggle button في topbar

اقرأ `index.html` وابحث عن `<div class="topbar-actions">` (أو ما يماثله — قد يكون `class="topbar-actions"` على `<div>` أو `<nav>`).

في **بداية** قائمة الأزرار (قبل `theme-toggle`)، أضف:

```html
<button class="tb-btn" type="button" data-action="toggle-sidebar" aria-label="طي السايدبار" title="طي السايدبار (Cmd+\)">
  <i class="qi" data-icon="sidebar"></i>
</button>
```

> **ملاحظة:** `Upg.nav` (من Worker 12 / Phase 4) يستمع لـ `[data-action="toggle-sidebar"]` تلقائياً. لا حاجة لـ JS إضافي.

> **لو الأيقونة "sidebar" غير موجودة في icon registry:** استبدل `data-icon="sidebar"` بـ `data-icon="layout-dashboard"` أو `data-icon="menu"`.

### Step 3 — Boot Sanity Assert

في `app.js` — أضف في **النهاية المطلقة** (بعد آخر IIFE):

```js
/* ═══════════════════════════════════════════════════════════════
   AURORA v15.1 — Boot Sanity Assert (Worker 13 / Phase 3)
   يفحص أن كل 14 Upg API محمّلين.
   لا يكسر شي — فقط يطبع warning واضح في console لو واحد ناقص.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const REQUIRED = [
    'theme', 'icons', 'gateway', 'calc', 'cmdk', 'state', 'production',
    'type', 'scroll', 'nav', 'identity', 'greet', 'countup', 'motion'
  ];

  // Wait until DOMContentLoaded so all earlier IIFEs have executed.
  const check = () => {
    const upg = window.Upg || {};
    const missing = REQUIRED.filter(k => !upg[k]);
    if (missing.length === 0) {
      // Success: log a one-shot banner (avoid spam on every visit).
      if (!sessionStorage.getItem('upg_v151_banner')) {
        sessionStorage.setItem('upg_v151_banner', '1');
        console.log(
          '%c AURORA v15.1 ',
          'background:#0E1220;color:#66FCF1;padding:4px 8px;border-radius:4px;font-weight:bold;',
          'كل الـ 14 modules محمّلين بنجاح'
        );
      }
    } else {
      console.warn(
        '%c AURORA v15.1 ',
        'background:#7c2d12;color:#fef3c7;padding:4px 8px;border-radius:4px;font-weight:bold;',
        'modules ناقصين:', missing
      );
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check, { once: true });
  } else {
    // DOM ready already; run on next tick to let any pending IIFE finish.
    setTimeout(check, 0);
  }
})();
```

### Step 4 — Optional: تطبيق `.h-quote` على citations القديمة

لو في `index.html` فيه `<blockquote>` أو citations بصرية بدون utility، أضف لها `class="h-quote"`. هذا اختياري ولا يكسر شي.

```bash
# عدّ الـ blockquotes الموجودة:
grep -c '<blockquote' platform/index.html
```

لو ≤ 30، طبّق عليها class. لو > 30، اترك للـ phase مستقبلية.

### Step 5 — CHANGELOG.md update

افتح `state/CHANGELOG.md` وأضف **بعد القسم الأول** (قبل v15) قسم جديد:

```md
## v15.1 — AURORA Completion (Worker 13) — 2026

### Fixed (محتوى Worker 12 الناقص)
- Bento dashboard markup الآن مطبّق فعلاً في `#page-dashboard`
  (كان `class="bento"` مفقود رغم أن CSS و JS جاهزون من Worker 12)
- `[data-greet-title]`, `[data-countup]`, `class="dock"` الآن موجودين في DOM
- inline `style="..."` خُفّض من 592 → ≤ 200 (الهدف الأصلي تحقّق بعد فشل Worker 12)
- `!important` غير المبرّر خُفّض من 100 → ≤ 20

### Added
- 7+ utility classes جديدة: `u-grad-brand`, `u-grad-success`, `u-grad-warm`,
  `u-grad-violet`, `u-grad-pink`, `u-grad-amber`, `u-grad-tint`
- 9+ color utilities: `u-c-text/muted/faint/brand/tint/success/warning/danger/info`
- Compound type presets: `u-t-eyebrow`, `u-t-card-title`, `u-t-list-title`,
  `u-t-section-mini`, `u-t-h-md`, `u-t-h-lg`
- Sidebar toggle button في topbar (يفعّل `Upg.nav.toggle()`)
- Brand wordmark "Upgrade" يستعمل Aref Ruqaa accent font
- `.h-quote` utility للاستشهادات
- Boot sanity assert يطبع banner لو 14 modules محمّلين (warning لو ناقصين)

### Changed
- `state/PROGRESS.json` worker = "13", phase = "3", status = "completed"

### Preserved (تأكيد)
- 16 page sections — كلهم سليمين
- 391 qcalc references — لا تغيير
- 14 Upg.* public APIs — كلهم موجودين
- Service Worker, manifest, favicon — لا تغيير
- 4 glass tiers, 15 identity tints, kل من Worker 12 — لا تغيير
```

### Step 6 — Final Sanity Check

```bash
echo "=== Worker 13 Final Sanity ==="
echo ""
echo "Phase 1 markup:"
echo "  bento class:                $(grep -c 'class=\"bento' platform/index.html)  (target ≥ 1)"
echo "  data-greet-title:           $(grep -c 'data-greet-title' platform/index.html)  (target = 1)"
echo "  data-countup:               $(grep -c 'data-countup' platform/index.html)  (target ≥ 4)"
echo "  dock class:                 $(grep -c 'class=\"dock' platform/index.html)  (target = 1)"
echo ""
echo "Phase 2 purge:"
echo "  inline styles:              $(grep -c 'style=\"' platform/index.html)  (target ≤ 200)"
echo "  !important total:           $(grep -c '!important' platform/assets/style.css)"
echo "  u-grad utilities:           $(grep -c '\.u-grad-' platform/assets/style.css)  (target ≥ 7)"
echo ""
echo "Phase 3 polish:"
echo "  wordmark u-font-accent:     $(grep -c 'gateway-wordmark u-font-accent' platform/index.html)  (target = 1)"
echo "  toggle-sidebar button:      $(grep -c 'data-action=\"toggle-sidebar\"' platform/index.html)  (target = 1)"
echo "  AURORA v15.1 in app.js:     $(grep -c 'AURORA v15.1' platform/assets/app.js)  (target ≥ 1)"
echo ""
echo "Sacred preserved:"
echo "  pages:                      $(grep -c '<section class=\"page' platform/index.html)  (target = 16)"
echo "  qcalc:                      $(grep -c 'qcalc' platform/index.html)  (target = 391)"
echo "  Upg APIs:                   $(grep -cE 'window\.Upg\.(theme|icons|gateway|calc|cmdk|state|production|type|scroll|nav|identity|greet|countup|motion)' platform/assets/app.js)  (target ≥ 36)"
```

---

## ✅ Acceptance Criteria

- [ ] `gateway-wordmark` يحوي `class="u-font-accent"`
- [ ] `Upgrade` wordmark يظهر بـ Aref Ruqaa font (تحقق بصرياً)
- [ ] زر toggle-sidebar في topbar — clickable، يطوي/يفتح السايدبار
- [ ] `Cmd+\` لا زال يعمل (لم يُكسر)
- [ ] Console boot banner يظهر "AURORA v15.1 — كل الـ 14 modules محمّلين بنجاح"
- [ ] لو حذفت أي IIFE (للاختبار) — boot warning يظهر بشكل واضح
- [ ] `state/CHANGELOG.md` فيه قسم v15.1
- [ ] صفر console errors
- [ ] لا visual regression عبر 16 صفحة

---

## 🛡️ في نهاية الـ Phase (والـ Worker)

```
1. commit  : "phase 3 (worker 13): wordmark accent + sidebar toggle + sanity assert + CHANGELOG"
2. push    : worker-13-aurora-completion → origin
3. update  : state/PROGRESS.json (worker=13, phase=3, status="completed")
4. snapshot: state/snapshots/worker-13-phase-3.json (مع أرقام final فعلية من grep)
5. commit  : "state: worker 13 complete — AURORA Completion delivered"
6. push    : final push
7. PR      : "feat: Worker 13 — AURORA Completion (Bento + Real Purge + Polish)" → main
   description includes:
   • قائمة الـ 3 phases المُنجَزة
   • قبل/بعد للأرقام (verified by grep — لا أرقام بدون تحقّق)
   • Sacred preserved: 16 pages, 391 qcalc, 14 APIs
```

— نهاية Worker 13. المنصة الآن Cathedral v15.1 / AURORA Completed.
