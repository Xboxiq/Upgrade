# γ8 — العالم 7: وَرشة (Warsha) — Workshop
> **Pillar γ / Stage 8 of 9**
> الإلهام: سوق البتاوين بغداد + ورش العتيقة + raw industrial signage
> الصفحات: phonerepair, customercare

---

## 🎨 Creativity Beacon

**Type:** 🤚 INTERACTION_BEACON
**The Surprise:** الإجراءات الحساسة في warsha (حذف، إصلاح، أرجع) تتطلب **long-press** (650ms) بدل click عادي. خلال الضغط الطويل، حلقة دائرية تتشكل حول الزر تتدرج في الامتلاء (CSS conic-gradient). لو رفع المستخدم قبل 650ms → cancellation. لو أكمل → الإجراء يُنفَّذ. **مرجع نفسي:** يحاكي "إغلاق المسمار بمفك" — لا تنتهي بنقرة، تنتهي بـ commitment محسوس.
**Reference Avoided:** #15 modal-with-overlay confirmation, simple click confirm
**Inspired-by:** #13 Iraqi marsh architecture (deliberate construction tempo)
**Originality Self-Score:** 5/5

---

## التنفيذ

### ١. املأ `worlds/_warsha.css`

```css
/* ÊLAN v4 — γ8 — World: وَرشة (Warsha)
   Souk repair stalls + raw industrial signage.
   Pages: phonerepair, customercare */

[data-world="warsha"] {
  --anchor-bg: hsl(28 12% 18%);
  --anchor-1:  hsl(28 14% 22%);
  --anchor-2:  hsl(28 16% 27%);
  --anchor-3:  hsl(28 18% 33%);

  --ink:       hsl(45 30% 92%);
  --ink-muted: hsl(45 18% 70%);
  --ink-faint: hsl(45 12% 50%);

  --line:        hsl(28 18% 33%);
  --line-strong: hsl(28 22% 45%);

  --ember: hsl(25 85% 52%);     /* برتقالي طوب */
  --focus: hsl(48 95% 55%);     /* أصفر علامة */
  --accent: var(--ember);

  --ease-warsha:     cubic-bezier(0.55, 0.1, 0.25, 1);
  --duration-warsha: 280ms;

  --shadow-sm: 0 1px 0 hsl(28 30% 0% / 0.4);
  --shadow-md: 0 3px 0 hsl(28 30% 0% / 0.5), 0 6px 12px hsl(28 30% 0% / 0.4);
  --shadow-lg: 0 6px 0 hsl(28 30% 0% / 0.5), 0 12px 24px hsl(28 30% 0% / 0.5);
  --shadow-xl: 0 12px 32px hsl(28 30% 0% / 0.6);

  --ring: 0 0 0 3px var(--focus);

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

/* Cards — workshop tags with tape edge */
[data-world="warsha"] .card,
[data-world="warsha"] .panel {
  background: var(--anchor-1);
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  position: relative;
}

[data-world="warsha"] .card::before {
  content: "";
  position: absolute;
  top: -8px;
  inset-inline-end: var(--s-4);
  width: 48px;
  height: 16px;
  background: color-mix(in oklch, var(--focus) 50%, transparent);
  border: 1px dashed color-mix(in oklch, var(--ink) 20%, transparent);
  transform: rotate(-3deg);
  pointer-events: none;
}

/* Workshop signage icons (yellow circles, like souk numbering) */
[data-world="warsha"] .workshop-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 32px;
  block-size: 32px;
  background: var(--focus);
  color: hsl(28 30% 14%);
  border-radius: 50%;
  font-family: var(--voice-display-h);
  font-weight: 800;
  border: 2px solid hsl(28 30% 14%);
}

/* Beacon: long-press button */
[data-world="warsha"] .btn-longpress {
  position: relative;
  padding: var(--s-3) var(--s-6);
  background: var(--anchor-2);
  color: var(--ink);
  border: 2px solid var(--ember);
  border-radius: var(--r-2);
  font-family: var(--voice-display);
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  --press-progress: 0;
  user-select: none;
  -webkit-user-select: none;
}

[data-world="warsha"] .btn-longpress::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: conic-gradient(
    from 0deg,
    var(--ember) 0deg,
    var(--ember) calc(var(--press-progress) * 360deg),
    transparent calc(var(--press-progress) * 360deg)
  );
  opacity: 0.35;
  pointer-events: none;
  transition: opacity 100ms;
}

[data-world="warsha"] .btn-longpress[data-pressing="true"]::before {
  opacity: 0.65;
}

[data-world="warsha"] .btn-longpress.is-fired {
  background: var(--ember);
  color: hsl(28 30% 14%);
  border-color: var(--focus);
}

/* Body */
[data-world="warsha"] body,
[data-world="warsha"] .page-content {
  font-family: var(--voice-body);
}
```

### ٢. JS للـ Beacon — `world-warsha.js`

```javascript
/* ÊLAN v4 — γ8 — Warsha world: long-press commitment beacon */

const PRESS_MS = 650;
const tracking = new WeakMap();

function start(btn) {
  if (tracking.has(btn)) return;

  const startedAt = performance.now();
  btn.dataset.pressing = 'true';

  const tick = () => {
    const elapsed = performance.now() - startedAt;
    const progress = Math.min(1, elapsed / PRESS_MS);
    btn.style.setProperty('--press-progress', progress.toFixed(3));

    if (progress >= 1) {
      fire(btn);
      stop(btn, false);
      return;
    }
    const raf = requestAnimationFrame(tick);
    tracking.set(btn, raf);
  };

  const raf = requestAnimationFrame(tick);
  tracking.set(btn, raf);

  // Haptic: tap (gentle)
  if ('vibrate' in navigator) navigator.vibrate(8);
}

function stop(btn, cancelled = true) {
  const raf = tracking.get(btn);
  if (raf) cancelAnimationFrame(raf);
  tracking.delete(btn);
  btn.removeAttribute('data-pressing');
  if (cancelled) {
    btn.style.setProperty('--press-progress', '0');
  }
}

function fire(btn) {
  btn.classList.add('is-fired');
  if ('vibrate' in navigator) navigator.vibrate([12, 30, 12]);
  btn.dispatchEvent(new CustomEvent('upg:longpress:fire', { bubbles: true }));
  setTimeout(() => {
    btn.classList.remove('is-fired');
    btn.style.setProperty('--press-progress', '0');
  }, 800);
}

function bind() {
  document.querySelectorAll('[data-world="warsha"] .btn-longpress').forEach(btn => {
    if (btn.dataset.warshaBound) return;
    btn.dataset.warshaBound = 'true';

    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      btn.setPointerCapture?.(e.pointerId);
      start(btn);
    });
    btn.addEventListener('pointerup', () => stop(btn, true));
    btn.addEventListener('pointercancel', () => stop(btn, true));
    btn.addEventListener('pointerleave', () => stop(btn, true));
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'warsha') bind();
});

if (document.body.dataset.world === 'warsha') bind();
```

### ٣. تطبيق على phonerepair page:
```html
<button class="btn-longpress" data-action="delete-ticket">
  حذف التذكرة (اضغط مطوّلاً)
</button>

<script>
document.addEventListener('upg:longpress:fire', (e) => {
  const action = e.target.dataset.action;
  if (action === 'delete-ticket') { /* ... */ }
});
</script>
```

---

## Acceptance Criteria

- [ ] `worlds/_warsha.css` ممتلئ
- [ ] long-press على `.btn-longpress` يُظهِر conic progress ring (visible 650ms)
- [ ] رفع قبل 650ms يُلغي العملية ويُعيد progress=0
- [ ] إكمال 650ms يُطلق event `upg:longpress:fire`
- [ ] vibrate API يُستدعى (لو متاح)
- [ ] cards فيها workshop tape edge (yellow tag على الزاوية)
- [ ] commit: `γ8: World Warsha — verified: longpress=650ms, progress_conic=on, vibrate=on`
- [ ] Beacon recorded

— نهاية γ8 —
