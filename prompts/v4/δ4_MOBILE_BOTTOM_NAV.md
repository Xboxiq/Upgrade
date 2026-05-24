# δ4 — Mobile Bottom Nav + Haptics
> **Pillar δ / Stage 4 of 6**
> الهدف: bottom-nav floating بـ 5 سلوتات + safe-area + haptic feedback مدروس.

---

## السياق

على mobile، الـ sidebar مخفي (تحت 720px). البديل: **bottom-nav floating** — bar أسفل الشاشة بـ 5 سلوتات أساسية + زر "more" يفتح sheet كامل. كل tap له haptic مختلف حسب نوع الإجراء.

---

## 🎨 Creativity Beacon

**Type:** 🤚 INTERACTION_BEACON
**The Surprise:** الـ haptic patterns ليست واحدة بل **ثلاثة محسوبة موسيقياً** (مرجع موسيقى عربية):
- **dafn** (نبر) — 8ms vibration: للتنقل العادي
- **takk** (تَك) — [12, 20, 12] ms: للإنجاز
- **maqsoom** (مقسوم) — [8, 30, 8, 30, 14] ms: للحفظ النهائي

تُنفَّذ عبر `navigator.vibrate()`. كل bottom-nav tap يُنتج dafn، إلا لو الـ destination هي إنجاز فيُنتج takk.

**Reference Avoided:** #15 generic single-buzz haptic
**Inspired-by:** #4 Maqamat music notation (rhythmic patterns as feedback)
**Originality Self-Score:** 5/5

---

## التنفيذ

### ١. CSS — `platform/assets/css/_bottom-nav.css`

```css
/* ÊLAN v4 — δ4 — Mobile bottom nav (floating) */

.elan-bottom-nav {
  display: none;
  position: fixed;
  inset-block-end: calc(var(--safe-bottom) + var(--s-3));
  inset-inline: var(--s-3);
  block-size: var(--chrome-bottom-nav);
  background: color-mix(in oklch, var(--anchor-bg) 88%, transparent);
  border: 1px solid var(--line);
  border-radius: 999px;
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: var(--shadow-lg);
  padding: var(--s-1);
  z-index: 60;
  align-items: center;
  justify-content: space-around;
  gap: var(--s-1);
}

@container (max-width: 720px) {
  .elan-bottom-nav { display: flex; }
}

@media (max-width: 720px) {
  .elan-bottom-nav { display: flex; }
}

.elan-bnav__item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  inline-size: 56px;
  block-size: 56px;
  border-radius: 999px;
  background: transparent;
  border: none;
  color: var(--ink-faint);
  cursor: pointer;
  position: relative;
  font-family: var(--voice-label);
  font-size: 10px;
  letter-spacing: var(--track-eyebrow);
  -webkit-tap-highlight-color: transparent;
  transition: color var(--t-2) var(--ease-elan);
}

.elan-bnav__item span {
  font-weight: 600;
}

.elan-bnav__item:hover,
.elan-bnav__item:active {
  color: var(--ink);
}

.elan-bnav__item[aria-current="page"] {
  color: var(--ember);
}

.elan-bnav__item[aria-current="page"]::before {
  content: "";
  position: absolute;
  inset-block-start: 4px;
  inline-size: 4px;
  block-size: 4px;
  border-radius: 50%;
  background: var(--ember);
}

/* Hide default sidebar on mobile */
@media (max-width: 720px) {
  .elan-sidebar {
    transform: translateX(-100%);
    pointer-events: none;
  }
}
```

### ٢. JS — `platform/assets/js/chrome/bottom-nav.js`

```javascript
/* ÊLAN v4 — δ4 — Mobile bottom nav + maqamat haptics */
import { icon } from '../core/icons.js';

const HAPTICS = {
  dafn:     8,
  takk:     [12, 20, 12],
  maqsoom:  [8, 30, 8, 30, 14],
};

export function haptic(pattern = 'dafn') {
  if (!('vibrate' in navigator)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const p = HAPTICS[pattern] ?? HAPTICS.dafn;
  navigator.vibrate(p);
}

const SLOTS = [
  { id: 'page-dashboard',  icon: 'home',       label: 'الرئيسية' },
  { id: 'page-lab',        icon: 'lightning',  label: 'المختبر' },
  { id: 'page-myprogress', icon: 'trending-up',label: 'تقدُّمي' },
  { id: 'page-psych',      icon: 'brain',      label: 'نفسي' },
  { id: '__more__',        icon: 'menu',       label: 'المزيد', special: 'more' },
];

function build() {
  if (document.querySelector('.elan-bottom-nav')) return;
  const nav = document.createElement('nav');
  nav.className = 'elan-bottom-nav';
  nav.setAttribute('aria-label', 'التنقل السريع');
  nav.setAttribute('role', 'navigation');

  SLOTS.forEach(slot => {
    const btn = document.createElement('button');
    btn.className = 'elan-bnav__item';
    btn.dataset.page = slot.id;
    if (slot.special) btn.dataset.special = slot.special;
    btn.append(icon(slot.icon, { size: 'md' }));
    const lbl = document.createElement('span');
    lbl.textContent = slot.label;
    btn.append(lbl);

    btn.addEventListener('click', () => {
      if (slot.special === 'more') {
        haptic('dafn');
        window.Upg?.sheet?.open?.('all-pages');
        return;
      }
      const isProgressDestination = slot.id === 'page-myprogress';
      haptic(isProgressDestination ? 'takk' : 'dafn');
      window.Upg?.nav?.to?.(slot.id);
    });

    nav.appendChild(btn);
  });

  document.body.appendChild(nav);
}

function updateActive() {
  const cur = window.Upg?.nav?.current?.() ?? document.body.dataset.activePage;
  document.querySelectorAll('.elan-bnav__item').forEach(b => {
    if (b.dataset.page === cur) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
}

function init() {
  build();
  updateActive();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.addEventListener('upg:nav:change', updateActive);

window.Upg = window.Upg || {};
window.Upg.haptic = Object.freeze({ play: haptic, patterns: () => Object.freeze({ ...HAPTICS }) });
```

### ٣. تطبيق + سجِّل في app.js

---

## Acceptance Criteria

- [ ] `.elan-bottom-nav` يظهر على mobile only (≤ 720px)
- [ ] 5 سلوتات بـ Lucide/Phosphor icons (لا emoji)
- [ ] safe-area-inset-bottom محترم
- [ ] haptic dafn (8ms) عند tap عادي
- [ ] haptic takk على myprogress
- [ ] `Upg.haptic.play('maqsoom')` يَعمل من console
- [ ] respects prefers-reduced-motion
- [ ] aria-current يتحدث
- [ ] sidebar مخفي تحت 720px
- [ ] grep emoji في bottom-nav.js == 0
- [ ] commit: `δ4: Mobile Bottom Nav — verified: slots=5, haptics=3-patterns, safe_area=on, mobile_only=true`
- [ ] Beacon recorded

— نهاية δ4 —
