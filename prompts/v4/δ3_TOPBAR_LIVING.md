# δ3 — Living Topbar
> **Pillar δ / Stage 3 of 6**
> الهدف: topbar يَتنفس + breadcrumb + cmdk trigger + theme/world toggle.

---

## السياق

الـ topbar الحالي ثابت. ÊLAN يجعله **يتنفس** بصرياً (subtle background pulse في sync مع heartbeat ~75bpm) ويحوي:
- breadcrumb world-aware
- cmdk trigger (⌘K) بـ Lucide icon
- world switcher (لو desktop)

---

## 🎨 Creativity Beacon

**Type:** 🪞 META_BEACON
**The Surprise:** الـ topbar يحتوي عنصراً يُسمى "Pulse Indicator" — نقطة 4px تَنبض ببطء (lub-dub rhythm، 75bpm). لكن **النبض يَتسارع** عندما يقترب المستخدم من إنجاز هدف يومي (≥80% progress)، ويهدأ بعد الإنجاز. كأن المنصة تَشعر معك. flag-gated، لا يَعمل لو reduced-motion.
**Reference Avoided:** #10 generic pulsing dot
**Inspired-by:** #4 Maqamat (pulse как rhythm, not noise)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. CSS — أضف في `chrome.css`

```css
/* ÊLAN v4 — δ3 — Living Topbar */

.elan-topbar {
  block-size: var(--chrome-topbar-mobile);
  display: flex;
  align-items: center;
  gap: var(--s-4);
  padding-inline: var(--container-px-mobile);
  border-block-end: 1px solid var(--line);
  background: var(--anchor-bg);
  position: sticky;
  inset-block-start: 0;
  z-index: 50;
  backdrop-filter: blur(20px) saturate(180%);
}

@container (min-width: 720px) {
  .elan-topbar {
    block-size: var(--chrome-topbar-desktop);
    padding-inline: var(--container-px-desktop);
  }
}

.elan-topbar__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  flex: 1;
  min-inline-size: 0;
  font-family: var(--voice-ui);
  color: var(--ink-muted);
  font-size: var(--fs-sm);
}

.elan-topbar__breadcrumb [data-current="true"] {
  color: var(--ink);
  font-weight: 600;
}

.elan-topbar__sep {
  color: var(--ink-faint);
  user-select: none;
}

.elan-topbar__actions {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

.elan-topbar__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-2) var(--s-3);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  color: var(--ink-muted);
  cursor: pointer;
  font-family: var(--voice-ui);
  font-size: var(--fs-sm);
  transition: color var(--t-2), background var(--t-2), border-color var(--t-2);
}

.elan-topbar__btn:hover {
  color: var(--ink);
  background: var(--anchor-1);
  border-color: var(--line-strong);
}

.elan-topbar__btn kbd {
  font-family: var(--voice-code);
  font-size: var(--fs-xs);
  padding: 1px 6px;
  background: var(--anchor-2);
  border-radius: 4px;
  color: var(--ink-faint);
}

/* Beacon: pulse indicator */
.elan-pulse {
  inline-size: 8px;
  block-size: 8px;
  border-radius: 50%;
  background: var(--ember);
  position: relative;
}

.elan-pulse::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: var(--ember);
  opacity: 0;
  animation: elan-pulse 1600ms infinite;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

body[data-pulse-state="urgent"] .elan-pulse::after {
  animation-duration: 700ms;
}

body[data-pulse-state="rest"] .elan-pulse::after {
  animation-duration: 2400ms;
}

@keyframes elan-pulse {
  0%   { transform: scale(1);   opacity: 0.55; }
  60%  { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .elan-pulse::after { animation: none; opacity: 0.4; }
}
```

### ٢. JS — `platform/assets/js/chrome/topbar.js`

```javascript
/* ÊLAN v4 — δ3 — Living topbar with adaptive pulse */
import { icon } from '../core/icons.js';

function buildTopbar() {
  const tb = document.querySelector('.elan-topbar');
  if (!tb || tb.dataset.built === 'true') return;

  // Breadcrumb container
  const crumb = document.createElement('nav');
  crumb.className = 'elan-topbar__breadcrumb';
  crumb.setAttribute('aria-label', 'مسار الصفحة');

  // Pulse indicator
  const pulse = document.createElement('span');
  pulse.className = 'elan-pulse';
  pulse.setAttribute('aria-hidden', 'true');
  crumb.appendChild(pulse);

  const home = document.createElement('a');
  home.href = '#page-dashboard';
  home.append(icon('home', { size: 'sm' }));
  home.style.color = 'inherit';
  crumb.appendChild(home);

  const sep1 = document.createElement('span');
  sep1.className = 'elan-topbar__sep';
  sep1.append(icon('forward', { size: 'xs' }));
  crumb.appendChild(sep1);

  const current = document.createElement('span');
  current.dataset.current = 'true';
  current.dataset.role = 'current-page';
  crumb.appendChild(current);

  // Actions
  const actions = document.createElement('div');
  actions.className = 'elan-topbar__actions';

  // CmdK trigger
  const cmdkBtn = document.createElement('button');
  cmdkBtn.className = 'elan-topbar__btn';
  cmdkBtn.setAttribute('aria-label', 'فتح لوحة الأوامر');
  cmdkBtn.dataset.action = 'open-cmdk';
  cmdkBtn.append(icon('search', { size: 'sm' }));
  const lbl = document.createElement('span');
  lbl.textContent = 'بحث';
  cmdkBtn.append(lbl);
  const kbd = document.createElement('kbd');
  kbd.textContent = '⌘K';
  cmdkBtn.append(kbd);
  cmdkBtn.addEventListener('click', () => window.Upg?.cmdk?.open?.());
  actions.appendChild(cmdkBtn);

  // Theme/world toggle (mobile-friendly)
  const themeBtn = document.createElement('button');
  themeBtn.className = 'elan-topbar__btn';
  themeBtn.setAttribute('aria-label', 'تبديل النمط');
  themeBtn.dataset.action = 'toggle-theme';
  themeBtn.append(icon('moon', { size: 'sm' }));
  themeBtn.addEventListener('click', () => {
    // Cycles through neighbouring world (preview)
    const order = ['hibr','naar','nada','hadeed','dhahab','tayyar','warsha','saloon'];
    const cur = document.body.dataset.world || 'hibr';
    const next = order[(order.indexOf(cur) + 1) % order.length];
    document.body.dataset.world = next;
    document.dispatchEvent(new CustomEvent('upg:world:change', { detail: { world: next, source: 'topbar-toggle' } }));
  });
  actions.appendChild(themeBtn);

  tb.append(crumb, actions);
  tb.dataset.built = 'true';
}

function updateBreadcrumb() {
  const slot = document.querySelector('.elan-topbar [data-role="current-page"]');
  if (!slot) return;
  const titleEl = document.querySelector('.page.is-active h1, .page.is-active [data-page-title]');
  slot.textContent = titleEl?.textContent?.trim() || 'لوحة التقدُّم';
}

function updatePulseFromProgress() {
  const progress = window.Upg?.state?.get?.('daily_progress', 0) || 0;
  if (progress >= 0.8 && progress < 1.0) {
    document.body.dataset.pulseState = 'urgent';
  } else if (progress >= 1.0) {
    document.body.dataset.pulseState = 'rest';
  } else {
    document.body.removeAttribute('data-pulse-state');
  }
}

function init() {
  buildTopbar();
  updateBreadcrumb();
  updatePulseFromProgress();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.addEventListener('upg:nav:change', updateBreadcrumb);
document.addEventListener('upg:state:daily_progress', updatePulseFromProgress);
```

### ٣. تطبيق

```html
<header class="elan-topbar" data-elan="topbar">
  <!-- contents injected by topbar.js -->
</header>
```

---

## Acceptance Criteria

- [ ] `.elan-topbar` يَنبني تلقائياً عند DOMContentLoaded
- [ ] breadcrumb يَستخدم Lucide home + forward icons (لا emoji)
- [ ] cmdk button فيها `kbd` للـ ⌘K
- [ ] elan-pulse تَنبض default 1600ms
- [ ] `data-pulse-state="urgent"` يُسرّع لـ 700ms
- [ ] `data-pulse-state="rest"` يُبطئ لـ 2400ms
- [ ] respects prefers-reduced-motion
- [ ] backdrop-filter يَعمل (لا fallback dark gradient — material honesty)
- [ ] grep: `grep -c '<svg viewBox' platform/assets/js/chrome/topbar.js` == 0
- [ ] commit: `δ3: Living Topbar — verified: pulse_states=3, breadcrumb_dynamic=on, lucide_only=true`
- [ ] Beacon recorded

— نهاية δ3 —
