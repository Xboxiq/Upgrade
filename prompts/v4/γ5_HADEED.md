# γ5 — العالم 4: حَديد (Hadeed) — Iron
> **Pillar γ / Stage 5 of 9**
> الإلهام: أفيشات سينما بيروت 1950-70 + Lebanese modernism + الـ split-flap signage
> الصفحات: negotiation, fieldsales

---

## 🎨 Creativity Beacon

**Type:** 🌈 CHROMATIC_BEACON
**The Surprise:** عند تبديل التابات في hadeed، **خط أحمر دموي** (2px ارتفاع، عرض الـ tab الجديد) يَنزلق أفقياً من موقع الـ tab السابق إلى الجديد خلال 220ms بـ ease حادة. الـ hover على tab يُظهِر هذا الخط بـ 30% opacity فقط في عرض ضيّق (60% من الـ tab) — كأنه شفرة فنّية تختار الخيار قبل التأكيد.
**Reference Avoided:** #6 standard tab underline transition, #4 mesh gradient bg
**Inspired-by:** #11 Mid-century Beirut cinema posters (red diagonal swipes)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. املأ `worlds/_hadeed.css`

```css
/* ÊLAN v4 — γ5 — World: حَديد (Hadeed)
   Beirut cinema modernism + iron decisiveness.
   Pages: negotiation, fieldsales */

[data-world="hadeed"] {
  --anchor-bg: hsl(220 6% 14%);
  --anchor-1:  hsl(220 8% 18%);
  --anchor-2:  hsl(220 8% 22%);
  --anchor-3:  hsl(220 10% 28%);

  --ink:       hsl(35 22% 92%);
  --ink-muted: hsl(35 14% 68%);
  --ink-faint: hsl(35 10% 48%);

  --line:        hsl(220 10% 28%);
  --line-strong: hsl(220 12% 38%);

  --ember: hsl(355 75% 52%);    /* قاني سينما */
  --focus: hsl(195 90% 55%);    /* أزرق نيون */
  --accent: var(--ember);

  --ease-hadeed:     cubic-bezier(0.85, 0, 0.15, 1);
  --duration-hadeed: 220ms;

  --shadow-sm: 0 1px 2px hsl(220 30% 0% / 0.5);
  --shadow-md: 0 4px 12px hsl(220 30% 0% / 0.6);
  --shadow-lg: 0 12px 32px hsl(220 30% 0% / 0.7);
  --shadow-xl: 0 24px 60px hsl(220 30% 0% / 0.75);

  --ring: 0 0 0 2px var(--focus);

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

/* Cards — sharp, modernist, with red accent strip */
[data-world="hadeed"] .card,
[data-world="hadeed"] .panel {
  background: var(--anchor-1);
  border: 1px solid var(--line);
  border-radius: var(--r-1);
  position: relative;
  box-shadow: var(--shadow-md);
}

[data-world="hadeed"] .card::before {
  content: "";
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  width: 4px;
  height: 100%;
  background: var(--ember);
  opacity: 0.85;
}

/* Tabs — modernist horizontal */
[data-world="hadeed"] .tabs {
  display: flex;
  gap: 0;
  border-block-end: 1px solid var(--line);
  position: relative;
}

[data-world="hadeed"] .tab {
  padding: var(--s-3) var(--s-5);
  border: none;
  background: transparent;
  color: var(--ink-muted);
  font-family: var(--voice-display-h);
  font-weight: 700;
  letter-spacing: var(--track-tight);
  cursor: pointer;
  position: relative;
  transition: color var(--duration-hadeed) var(--ease-hadeed);
}

[data-world="hadeed"] .tab:hover {
  color: var(--ink);
}

[data-world="hadeed"] .tab[aria-selected="true"],
[data-world="hadeed"] .tab.is-active {
  color: var(--ink);
}

/* Beacon: red sweep underline */
[data-world="hadeed"] .tabs::after {
  content: "";
  position: absolute;
  bottom: -1px;
  height: 2px;
  background: var(--ember);
  left: var(--tab-x, 0);
  width: var(--tab-w, 0);
  transition:
    left var(--duration-hadeed) var(--ease-hadeed),
    width var(--duration-hadeed) var(--ease-hadeed);
  pointer-events: none;
}

/* Hero — heavy Bukra */
[data-world="hadeed"] h1.is-hero {
  font-family: var(--voice-display-h);
  font-weight: 900;
  letter-spacing: var(--track-tight);
  font-stretch: 100%;
  font-size: var(--fs-3xl);
  line-height: var(--lead-tight);
}

[data-world="hadeed"] body,
[data-world="hadeed"] .page-content {
  font-family: var(--voice-body);
}

/* Buttons — cinema poster CTAs */
[data-world="hadeed"] .btn {
  background: var(--ember);
  color: var(--ink);
  border: none;
  border-radius: var(--r-1);
  padding: var(--s-3) var(--s-6);
  font-family: var(--voice-display-h);
  font-weight: 800;
  letter-spacing: var(--track-tight);
  cursor: pointer;
  transition: filter var(--duration-hadeed) var(--ease-hadeed),
              transform var(--duration-hadeed) var(--ease-hadeed);
}

[data-world="hadeed"] .btn:hover {
  filter: brightness(1.15);
  transform: translateY(-1px);
}

[data-world="hadeed"] .btn:active {
  transform: translateY(0);
  filter: brightness(0.95);
}
```

### ٢. JS للـ Beacon — `world-hadeed.js`

```javascript
/* ÊLAN v4 — γ5 — Hadeed world: red-sweep tab underline */

function syncTabUnderline(tabs) {
  const active = tabs.querySelector('.tab[aria-selected="true"], .tab.is-active');
  if (!active) {
    tabs.style.setProperty('--tab-w', '0px');
    return;
  }
  const tabsRect = tabs.getBoundingClientRect();
  const r = active.getBoundingClientRect();
  const x = r.left - tabsRect.left;
  tabs.style.setProperty('--tab-x', `${x}px`);
  tabs.style.setProperty('--tab-w', `${r.width}px`);
}

function bind() {
  document.querySelectorAll('[data-world="hadeed"] .tabs').forEach(tabs => {
    if (tabs.dataset.hadeedBound) return;
    tabs.dataset.hadeedBound = 'true';

    syncTabUnderline(tabs);

    tabs.addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (!t) return;
      tabs.querySelectorAll('.tab').forEach(x => x.removeAttribute('aria-selected'));
      t.setAttribute('aria-selected', 'true');
      syncTabUnderline(tabs);
    });

    new ResizeObserver(() => syncTabUnderline(tabs)).observe(tabs);
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'hadeed') bind();
});

if (document.body.dataset.world === 'hadeed') bind();
```

### ٣. سجِّل في app.js + تطبيق `.tabs` على negotiation tabs

---

## Acceptance Criteria

- [ ] `worlds/_hadeed.css` ممتلئ
- [ ] tabs بـ red sweep underline يَنحرف بـ 220ms عند تبديل tab
- [ ] cards فيها red accent strip 4px على البداية
- [ ] cinema-style buttons تشتغل
- [ ] commit: `γ5: World Hadeed — verified: red_sweep=on-active, accent_strip=4px, cinema_btn=on`
- [ ] Beacon recorded

— نهاية γ5 —
