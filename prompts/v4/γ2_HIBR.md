# γ2 — العالم 1: حِبر (Hibr) — Ink
> **Pillar γ (EIGHT WORLDS) / Stage 2 of 9**
> الإلهام: المخطوطات النَّجَفية + خط النَّسخ العراقي + ورق التَّحبير
> الصفحات: dashboard, myprogress

---

## 🎨 Creativity Beacon

**Type:** ✍️ TYPOGRAPHIC_BEACON
**The Surprise:** كل CTA إنجاز ("أنجزتُ"، "احفظ التقدم") لا يَستخدم checkmark ✓ كليشيه. بدلاً منه، الـ button الناجح يَكتب نص النجاح بـ "حبر يجف": gradient mask من شفاف 0% إلى حِبر 100% خلال 600ms، يبدأ من الحرف الأول حتى آخر حرف. كأن قَلَم نَسخ يُسجِّل الإنجاز.
**Reference Avoided:** #16 standard ✓ checkmark toast, #11 animated counter from 0
**Inspired-by:** #1 Najaf calligraphy manuscript style
**Originality Self-Score:** 5/5

---

## التنفيذ

### ١. املأ `platform/assets/css/worlds/_hibr.css`

```css
/* ÊLAN v4 — γ2 — World: حِبر (Hibr)
   Ink-on-Tahbeer paper. Najaf manuscript inspiration.
   Pages: dashboard, myprogress */

[data-world="hibr"] {
  --anchor-bg: hsl(36 18% 92%);
  --anchor-1:  hsl(36 14% 88%);
  --anchor-2:  hsl(36 12% 82%);
  --anchor-3:  hsl(36 14% 76%);

  --ink:       hsl(225 35% 8%);
  --ink-muted: hsl(225 22% 28%);
  --ink-faint: hsl(225 14% 50%);

  --line:        hsl(36 14% 76%);
  --line-strong: hsl(36 16% 64%);

  --ember: hsl(0 65% 32%);     /* أحمر شنقريا */
  --focus: hsl(45 80% 35%);    /* ذهب مخطوط */
  --accent: var(--ember);

  --ease-hibr:     cubic-bezier(0.5, 0, 0.5, 1);
  --duration-hibr: 320ms;

  --shadow-sm: 0 1px 2px hsl(225 35% 8% / 0.06);
  --shadow-md: 0 4px 12px hsl(225 35% 8% / 0.09);
  --shadow-lg: 0 14px 32px hsl(225 35% 8% / 0.12);
  --shadow-xl: 0 28px 60px hsl(225 35% 8% / 0.15);

  --ring: 0 0 0 3px color-mix(in oklch, var(--focus) 36%, transparent);

  --color-bg: var(--anchor-bg);
  --color-surface-0: var(--anchor-bg);
  --color-surface-1: var(--anchor-1);
  --color-surface-2: var(--anchor-2);
  --color-surface-3: var(--anchor-3);
  --color-text: var(--ink);
  --color-text-muted: var(--ink-muted);
  --color-text-faint: var(--ink-faint);
  --color-border: var(--line);
  --color-border-strong: var(--line-strong);
  --color-brand: var(--ember);
}

/* Beacon: ink-drying CTA */
[data-world="hibr"] .btn-success-action {
  position: relative;
  font-family: var(--voice-display);
  color: transparent;
  background-image: linear-gradient(90deg, var(--ink) 0%, var(--ink) 0%, transparent 0%);
  background-clip: text;
  -webkit-background-clip: text;
  transition: background-image var(--duration-hibr) var(--ease-hibr);
}

[data-world="hibr"] .btn-success-action.is-drying {
  background-image: linear-gradient(90deg, var(--ink) 100%, var(--ink) 100%, transparent 100%);
}

/* Manuscript ruling — visible only on cards in hibr world */
[data-world="hibr"] .card,
[data-world="hibr"] .panel {
  background-color: var(--anchor-1);
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  position: relative;
}

[data-world="hibr"] .card::before {
  content: "";
  position: absolute;
  inset: 0 var(--s-4);
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent calc(var(--lead-normal) * 1em - 1px),
    color-mix(in oklch, var(--line) 60%, transparent) calc(var(--lead-normal) * 1em - 1px),
    color-mix(in oklch, var(--line) 60%, transparent) calc(var(--lead-normal) * 1em)
  );
  opacity: 0.4;
  pointer-events: none;
}

/* Body uses Markazi Text for long-form reading */
[data-world="hibr"] body,
[data-world="hibr"] .page-content {
  font-family: var(--voice-body);
  line-height: var(--lead-relaxed);
}

/* Hero in hibr — bigger, calligraphic */
[data-world="hibr"] .hero-title,
[data-world="hibr"] h1.is-hero {
  font-family: var(--voice-signature);
  font-weight: 800;
  letter-spacing: var(--track-snug);
  font-size: var(--fs-4xl);
  line-height: var(--lead-tight);
}
```

### ٢. أضف JS للـ Beacon — `platform/assets/js/elan/world-hibr.js`

```javascript
/* ÊLAN v4 — γ2 — Hibr world: ink-drying CTA beacon */

function activateInkDry(el) {
  if (el.classList.contains('is-drying')) return;
  requestAnimationFrame(() => el.classList.add('is-drying'));
}

function bindHibrButtons() {
  document.querySelectorAll('[data-world="hibr"] .btn-success-action').forEach(btn => {
    if (btn.dataset.hibrBound) return;
    btn.dataset.hibrBound = 'true';
    btn.addEventListener('click', () => activateInkDry(btn));
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'hibr') bindHibrButtons();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindHibrButtons);
} else {
  bindHibrButtons();
}

window.Upg = window.Upg || {};
window.Upg.worlds = window.Upg.worlds || {};
window.Upg.worlds.hibr = Object.freeze({ activateInkDry });
```

### ٣. سجِّل في `app.js`:
```javascript
import './js/elan/world-hibr.js';
```

### ٤. تطبيق على dashboard.html

```html
<button class="btn-success-action" data-track="completed">
  أنجزتُ — احفظ التقدم
</button>
```

---

## Acceptance Criteria

- [ ] `worlds/_hibr.css` ممتلئ (≥ 80 سطر)
- [ ] `world-hibr.js` موجود ويُسجِّل API
- [ ] dashboard لما يفتح بـ `data-world="hibr"`، الخلفية رملية والحبر داكن
- [ ] CTA `.btn-success-action` يَملأ النص بحبر تدريجي عند الضغط (visible 600ms)
- [ ] cards فيها manuscript ruling خفيف (visible only on hibr)
- [ ] لا تكسير لباقي العوالم
- [ ] grep: `grep -c 'data-world="hibr"' platform/assets/css/worlds/_hibr.css` ≥ 5
- [ ] commit: `γ2: World Hibr — verified: lines=<N>, beacon=ink-drying-cta, manuscript-ruling=on`
- [ ] Beacon recorded in CREATIVITY_LOG.md

---

## بعد γ2

ابدأ γ3 (نار — Naar).

— نهاية γ2 —
