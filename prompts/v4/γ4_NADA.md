# γ4 — العالم 3: ندى (Nada) — Dew
> **Pillar γ / Stage 4 of 9**
> الإلهام: المحراب اليمني فجراً + ضوء الفجر على الحجر + الشِفّ الزجاجي
> الصفحات: psych, eq

---

## 🎨 Creativity Beacon

**Type:** 🌊 MOTION_BEACON
**The Surprise:** عند فتح صفحة psych، الـ cards لا تظهر بـ fade-in تقليدي ولا stagger waterfall. بدلاً منها، كل card يَتشكّل من **نقطة واحدة** (نقطة ندى) في مركزها، تتمدّد عبر `clip-path: circle()` من 0% حتى 150% خلال 720ms مع easing مائي. الترتيب: المحور البصري للصفحة (وسطها) يبدأ أولاً، ثم cards الأبعد عنه تتشكّل لاحقاً (radial stagger، ليس top-to-bottom).
**Reference Avoided:** #12 fade-in on scroll, #14 stagger waterfall
**Inspired-by:** #5 Yemeni mihrab geometry — radial growth from prayer-niche center
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. املأ `worlds/_nada.css`

```css
/* ÊLAN v4 — γ4 — World: ندى (Nada)
   Yemeni mihrab + dawn light on stone.
   Pages: psych, eq */

[data-world="nada"] {
  --anchor-bg: hsl(195 28% 96%);
  --anchor-1:  hsl(195 24% 93%);
  --anchor-2:  hsl(195 20% 88%);
  --anchor-3:  hsl(195 18% 82%);

  --ink:       hsl(220 32% 14%);
  --ink-muted: hsl(220 16% 38%);
  --ink-faint: hsl(220 12% 56%);

  --line:        hsl(195 18% 82%);
  --line-strong: hsl(195 20% 70%);

  --ember: hsl(165 55% 32%);
  --focus: hsl(280 50% 52%);
  --accent: var(--ember);

  --ease-nada:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --duration-nada: 480ms;

  --shadow-sm: 0 1px 2px hsl(220 32% 14% / 0.06), 0 1px 1px hsl(195 30% 50% / 0.04);
  --shadow-md: 0 4px 14px hsl(220 32% 14% / 0.08), 0 2px 4px hsl(195 30% 50% / 0.05);
  --shadow-lg: 0 16px 40px hsl(220 32% 14% / 0.10);
  --shadow-xl: 0 32px 72px hsl(220 32% 14% / 0.13);

  --ring: 0 0 0 3px color-mix(in oklch, var(--focus) 28%, transparent);

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

/* Cards in nada — soft, glassy hint */
[data-world="nada"] .card,
[data-world="nada"] .panel {
  background: linear-gradient(180deg,
    var(--anchor-1),
    var(--anchor-2)
  );
  border: 1px solid var(--line);
  border-radius: var(--r-4);
  backdrop-filter: blur(8px) saturate(160%);
  box-shadow: var(--shadow-md);
}

/* Beacon: dewdrop card emergence */
@keyframes nada-dewdrop {
  0% {
    clip-path: circle(0% at var(--cx, 50%) var(--cy, 50%));
    opacity: 0;
    transform: scale(0.96);
  }
  60% {
    clip-path: circle(85% at var(--cx, 50%) var(--cy, 50%));
    opacity: 1;
  }
  100% {
    clip-path: circle(150% at var(--cx, 50%) var(--cy, 50%));
    opacity: 1;
    transform: scale(1);
  }
}

[data-world="nada"] .nada-emerge {
  animation: nada-dewdrop var(--duration-nada) var(--ease-nada) backwards;
  animation-delay: var(--nada-delay, 0ms);
}

@media (prefers-reduced-motion: reduce) {
  [data-world="nada"] .nada-emerge {
    animation: none;
  }
}

/* Body in nada — relaxed reading */
[data-world="nada"] body,
[data-world="nada"] .page-content {
  font-family: var(--voice-body);
  line-height: var(--lead-relaxed);
}

/* Quote in nada — Lateef serif italic */
[data-world="nada"] blockquote,
[data-world="nada"] .quote {
  font-family: var(--voice-quote);
  font-style: italic;
  border-inline-start: 3px solid var(--ember);
  padding-inline-start: var(--s-4);
  color: var(--ink-muted);
}

/* Hero in nada */
[data-world="nada"] h1.is-hero {
  font-family: var(--voice-display-l);
  font-weight: 500;
  font-style: italic;
  letter-spacing: var(--track-loose);
  color: var(--ink);
}
```

### ٢. JS للـ Beacon — `platform/assets/js/elan/world-nada.js`

```javascript
/* ÊLAN v4 — γ4 — Nada world: radial dewdrop emergence */

const STAGGER_MS = 60;
const MAX_DELAY = 480;

function emerge() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const page = document.querySelector('.page.is-active[data-world="nada"]') ||
               document.querySelector('[data-world="nada"]');
  if (!page) return;

  const pageRect = page.getBoundingClientRect();
  const centerX = pageRect.left + pageRect.width / 2;
  const centerY = pageRect.top + pageRect.height / 2;

  const cards = Array.from(page.querySelectorAll('.card, .panel, .nada-emerge'));
  if (cards.length === 0) return;

  const items = cards.map(el => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dist = Math.hypot(cx - centerX, cy - centerY);
    return { el, dist };
  });

  const maxDist = Math.max(...items.map(i => i.dist), 1);

  items.forEach(({ el, dist }) => {
    el.classList.add('nada-emerge');
    el.style.setProperty('--cx', '50%');
    el.style.setProperty('--cy', '50%');
    const delay = Math.min(MAX_DELAY, (dist / maxDist) * MAX_DELAY);
    el.style.setProperty('--nada-delay', `${delay}ms`);
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'nada') {
    requestAnimationFrame(() => requestAnimationFrame(emerge));
  }
});

if (document.body.dataset.world === 'nada') {
  requestAnimationFrame(() => requestAnimationFrame(emerge));
}

window.Upg = window.Upg || {};
window.Upg.worlds = window.Upg.worlds || {};
window.Upg.worlds.nada = Object.freeze({ emerge });
```

### ٣. سجِّل في `app.js`

---

## Acceptance Criteria

- [ ] `worlds/_nada.css` ممتلئ
- [ ] keyframe `nada-dewdrop` موجود ويستخدم `clip-path: circle()`
- [ ] صفحة psych تفتح → cards تتشكَّل radially من المركز للخارج (visible 720ms)
- [ ] respects `prefers-reduced-motion`
- [ ] Lateef italic ينطبق على blockquotes
- [ ] grep: `grep -c 'clip-path' platform/assets/css/worlds/_nada.css` ≥ 2
- [ ] commit: `γ4: World Nada — verified: dewdrop_animation=on, radial_stagger=true, reduced_motion=respected`
- [ ] Beacon recorded

---

## بعد γ4

ابدأ γ5 (حَديد).

— نهاية γ4 —
