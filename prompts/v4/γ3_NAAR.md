# γ3 — العالم 2: نار (Naar) — Fire
> **Pillar γ / Stage 3 of 9**
> الإلهام: Brutalism العراقي الحديث (Mohammed Makiya, Rifat Chadirji) + ورش الحدادة
> الصفحات: lab, programming

---

## 🎨 Creativity Beacon

**Type:** 🎨 VISUAL_BEACON
**The Surprise:** عند الـ hover على عنصر تفاعلي في naar، شرارة (CSS-only، 60ms flash) تظهر على حافة العنصر. الشرارة في موقع المؤشر بدقة (CSS `--mx, --my` متغيرات تُحدَّث من JS بـ pointermove، throttled). كأن مطرقة لمست المعدن.
**Reference Avoided:** #13 spring-bounce hover, #5 shadow + radius card
**Inspired-by:** #2 Iraqi Brutalism (concrete + steel)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. املأ `worlds/_naar.css`

```css
/* ÊLAN v4 — γ3 — World: نار (Naar)
   Iraqi Brutalism + forge workshop. Fire on charcoal.
   Pages: lab, programming */

[data-world="naar"] {
  --anchor-bg: hsl(15 8% 6%);
  --anchor-1:  hsl(15 8% 9%);
  --anchor-2:  hsl(15 10% 13%);
  --anchor-3:  hsl(15 12% 18%);

  --ink:       hsl(40 18% 96%);
  --ink-muted: hsl(40 12% 78%);
  --ink-faint: hsl(40 8% 56%);

  --line:        hsl(15 12% 18%);
  --line-strong: hsl(15 14% 28%);

  --ember: hsl(18 95% 56%);     /* نار حدادة */
  --focus: hsl(48 100% 60%);    /* شرارة */
  --accent: var(--ember);

  --ease-naar:     cubic-bezier(0.7, 0, 0.2, 1.2);
  --duration-naar: 180ms;

  --shadow-sm: 0 1px 0 hsl(15 30% 0% / 0.6);
  --shadow-md: 0 4px 0 hsl(15 30% 0% / 0.7), inset 0 1px 0 hsl(40 18% 96% / 0.05);
  --shadow-lg: 0 8px 0 hsl(15 30% 0% / 0.8), inset 0 1px 0 hsl(40 18% 96% / 0.06);
  --shadow-xl: 0 12px 0 hsl(15 30% 0% / 0.85), inset 0 1px 0 hsl(40 18% 96% / 0.08);

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

/* Brutalist surfaces — sharp, no radius softening */
[data-world="naar"] .card,
[data-world="naar"] .panel {
  background: var(--anchor-1);
  border: 2px solid var(--line);
  border-radius: 0;
  box-shadow: var(--shadow-md);
}

[data-world="naar"] .btn,
[data-world="naar"] button:not(.unstyled) {
  border-radius: 0;
  border: 2px solid var(--ember);
  background: transparent;
  color: var(--ember);
  font-family: var(--voice-display-h);
  font-weight: 800;
  letter-spacing: var(--track-tight);
  padding: var(--s-3) var(--s-5);
  position: relative;
  transition: background-color var(--duration-naar) var(--ease-naar),
              color var(--duration-naar) var(--ease-naar),
              transform var(--duration-naar) var(--ease-naar);
}

[data-world="naar"] .btn:hover,
[data-world="naar"] button:not(.unstyled):hover {
  background: var(--ember);
  color: var(--anchor-bg);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--anchor-3);
}

/* Beacon: spark on hover (CSS-only, JS only updates --mx --my) */
[data-world="naar"] .spark-host {
  position: relative;
  --mx: 50%;
  --my: 50%;
}

[data-world="naar"] .spark-host::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle 24px at var(--mx) var(--my),
    color-mix(in oklch, var(--focus) 70%, transparent) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 60ms var(--ease-naar);
}

[data-world="naar"] .spark-host:hover::after {
  opacity: 1;
}

/* Code blocks in programming page */
[data-world="naar"] code,
[data-world="naar"] pre {
  font-family: var(--voice-code);
  background: var(--anchor-bg);
  color: var(--ember);
  padding: var(--s-1) var(--s-2);
  border: 1px solid var(--line-strong);
  border-radius: 0;
}

[data-world="naar"] pre {
  padding: var(--s-4);
  border-left: 3px solid var(--ember);
}

/* Hero — heavy bukra */
[data-world="naar"] h1.is-hero {
  font-family: var(--voice-display-h);
  font-weight: 900;
  font-stretch: 95%;
  letter-spacing: var(--track-tight);
  font-size: var(--fs-4xl);
  color: var(--ink);
  text-shadow: 0 0 30px color-mix(in oklch, var(--ember) 25%, transparent);
}
```

### ٢. JS للـ Beacon — `platform/assets/js/elan/world-naar.js`

```javascript
/* ÊLAN v4 — γ3 — Naar world: spark hover beacon */

let raf = 0;
function onMove(e) {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const target = e.target.closest('.spark-host');
    if (!target) return;
    const r = target.getBoundingClientRect();
    target.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    target.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  });
}

function bind() {
  if (document.body.dataset.world !== 'naar') return;
  document.body.addEventListener('pointermove', onMove, { passive: true });
}

function unbind() {
  document.body.removeEventListener('pointermove', onMove);
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'naar') bind();
  else unbind();
});

if (document.body.dataset.world === 'naar') bind();
```

### ٣. تطبيق `.spark-host` على cards و buttons في pages lab + programming

```html
<button class="btn spark-host">شغّل التحدي</button>
<div class="card spark-host">…</div>
```

---

## Acceptance Criteria

- [ ] `worlds/_naar.css` ممتلئ
- [ ] `world-naar.js` موجود
- [ ] صفحة lab تفتح بـ data-world="naar" → خلفية فحم + ember برتقالي
- [ ] hover على `.spark-host` يظهر spark في موقع المؤشر بدقة
- [ ] btn hover يَنحرف -2px -2px مع shadow صلب (brutalist depth)
- [ ] code blocks بـ ember orange + monospace
- [ ] commit: `γ3: World Naar — verified: spark_pointer=tracked, brutal_buttons=on, code_styled=on`
- [ ] Beacon recorded

---

## بعد γ3 — Pattern Disruption check (3rd stage in pillar γ)
الـ AUTO_PILOT يفحص آخر 3 beacons:
- γ1: STRUCTURAL ✓
- γ2: TYPOGRAPHIC ✓
- γ3: VISUAL ✓
→ كل واحد فئة مختلفة. لا disruption مطلوب. كمل لـ γ4.

— نهاية γ3 —
