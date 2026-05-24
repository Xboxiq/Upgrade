# δ1 — Sidebar Magnetic
> **Pillar δ (KINETIC SHELL) / Stage 1 of 6**
> الهدف: sidebar يميل بلطف نحو موقع المؤشر + هوية بصرية مختلفة لكل عالم.

---

## السياق

الـ sidebar الحالي ثابت. ÊLAN يجعله **يتنفّس مع pointer** بشكل لا يكسر التركيز:
- إمالة 3D خفيفة جداً (≤ 1.5deg) عند تحريك المؤشر داخل الـ sidebar
- shadow متحرك يتبع الإمالة
- rate-limited (60fps max، throttled بـ rAF)

**أيقونات:** كل nav item يَستخدم Lucide من sprite (chrome). لا emoji، لا inline SVG.

---

## 🎨 Creativity Beacon

**Type:** 🌊 MOTION_BEACON
**The Surprise:** الـ sidebar يَستخدم **gyroscope على الـ mobile** (DeviceOrientationEvent) ليتمايل خفيفاً حسب ميلان الجهاز فعلياً (ضمن ±2deg max). على desktop: pointer-tracked. على mobile: physical-tilt-tracked. كأن الـ sidebar معدن حقيقي يتأثر بالحركة.
**Reference Avoided:** #3 floating sidebar with pill icons (Notion clone)
**Inspired-by:** #2 Iraqi Brutalism — solid mass with subtle weight shift
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. CSS — أضف في `chrome.css` block جديد

```css
/* ÊLAN v4 — δ1 — Magnetic Sidebar */

.elan-sidebar {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --tilt-shadow: 0px;
  transform: perspective(800px)
             rotateX(var(--tilt-y))
             rotateY(var(--tilt-x));
  transform-style: preserve-3d;
  transition: transform var(--t-3) var(--ease-elan);
  will-change: transform;
  box-shadow:
    calc(var(--tilt-shadow) * -1) 0 32px hsl(0 0% 0% / 0.12),
    var(--shadow-md);
}

@media (prefers-reduced-motion: reduce) {
  .elan-sidebar {
    --tilt-x: 0deg;
    --tilt-y: 0deg;
    transform: none !important;
  }
}

/* Per-world sidebar accent */
[data-world="hibr"]   .elan-sidebar { background: var(--anchor-1); border-inline-end: 1px solid var(--line); }
[data-world="naar"]   .elan-sidebar { background: var(--anchor-bg); border-inline-end: 2px solid var(--ember); }
[data-world="nada"]   .elan-sidebar { background: linear-gradient(180deg, var(--anchor-1), var(--anchor-2)); }
[data-world="hadeed"] .elan-sidebar { background: var(--anchor-1); border-inline-end: 1px solid var(--ember); }
[data-world="dhahab"] .elan-sidebar { background: var(--anchor-1); border-inline-end: 1px solid color-mix(in oklch, var(--ember) 50%, transparent); }
[data-world="tayyar"] .elan-sidebar { background: linear-gradient(180deg, var(--anchor-bg), var(--anchor-2)); }
[data-world="warsha"] .elan-sidebar { background: var(--anchor-1); border-inline-end: 1px dashed var(--line-strong); }
[data-world="saloon"] .elan-sidebar { background: var(--anchor-1); border-inline-end: 1px solid var(--ember); }

/* Nav items */
.elan-sidebar .nav-item {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-3) var(--s-4);
  color: var(--ink-muted);
  border-radius: var(--r-2);
  transition: color var(--t-2) var(--ease-elan), background var(--t-2) var(--ease-elan);
  font-family: var(--voice-ui);
}

.elan-sidebar .nav-item:hover {
  color: var(--ink);
  background: var(--anchor-2);
}

.elan-sidebar .nav-item[aria-current="page"] {
  color: var(--ember);
  background: color-mix(in oklch, var(--ember) 10%, transparent);
}
```

### ٢. JS — `platform/assets/js/chrome/sidebar.js`

```javascript
/* ÊLAN v4 — δ1 — Magnetic sidebar (pointer + gyroscope) */
import { icon } from '../core/icons.js';

const TILT_MAX = 1.5;
const SHADOW_MAX = 12;
let raf = 0;
let sidebar = null;

function findSidebar() {
  return document.querySelector('.elan-sidebar') ||
         document.querySelector('[data-elan="sidebar"]');
}

function applyTilt(x, y) {
  if (!sidebar) return;
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    sidebar.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`);
    sidebar.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`);
    sidebar.style.setProperty('--tilt-shadow', `${(x * SHADOW_MAX / TILT_MAX).toFixed(1)}px`);
  });
}

function onPointerMove(e) {
  if (!sidebar) return;
  const r = sidebar.getBoundingClientRect();
  const cx = (e.clientX - r.left) / r.width - 0.5;
  const cy = (e.clientY - r.top) / r.height - 0.5;
  applyTilt(cx * TILT_MAX, -cy * TILT_MAX);
}

function onPointerLeave() {
  applyTilt(0, 0);
}

function onDeviceTilt(e) {
  if (!sidebar) return;
  const tiltY = Math.max(-TILT_MAX, Math.min(TILT_MAX, (e.gamma || 0) / 30));
  const tiltX = Math.max(-TILT_MAX, Math.min(TILT_MAX, (e.beta || 0) / 60));
  applyTilt(tiltY, -tiltX);
}

/** Build sidebar nav items with proper icons */
function renderNav() {
  if (!sidebar) return;
  const navList = sidebar.querySelector('[data-elan="nav-list"]');
  if (!navList || navList.dataset.rendered === 'true') return;

  const items = [
    { id: 'page-dashboard',    icon: 'home',       label: 'لوحة التقدُّم' },
    { id: 'page-myprogress',   icon: 'trending-up',label: 'تقدُّمي' },
    { id: 'page-lab',          icon: 'lightning',  label: 'المختبر' },
    { id: 'page-psych',        icon: 'brain',      label: 'علم النفس' },
    { id: 'page-eq',           icon: 'heart',      label: 'الذكاء العاطفي' },
    { id: 'page-negotiation',  icon: 'handshake',  label: 'التفاوض' },
    { id: 'page-fieldsales',   icon: 'target',     label: 'البيع الميداني' },
    { id: 'page-callcenter',   icon: 'phone',      label: 'مركز الاتصال' },
    { id: 'page-customercare', icon: 'chat',       label: 'خدمة العملاء' },
    { id: 'page-social',       icon: 'megaphone',  label: 'السوشال' },
    { id: 'page-programming',  icon: 'gear',       label: 'البرمجة' },
    { id: 'page-accounting',   icon: 'coins',      label: 'المحاسبة' },
    { id: 'page-phonerepair',  icon: 'wrench',     label: 'إصلاح الهواتف' },
    { id: 'page-hrmastery',    icon: 'users',      label: 'إتقان الموارد' },
  ];

  items.forEach(item => {
    const a = document.createElement('a');
    a.className = 'nav-item';
    a.href = `#${item.id}`;
    a.dataset.page = item.id;
    a.setAttribute('role', 'menuitem');

    const ic = icon(item.icon, { size: 'sm' });
    const span = document.createElement('span');
    span.textContent = item.label;
    span.className = 'v-ui';

    a.append(ic, span);
    navList.appendChild(a);
  });
  navList.dataset.rendered = 'true';
}

function init() {
  sidebar = findSidebar();
  if (!sidebar) return;

  renderNav();

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if ('ontouchstart' in window && window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', onDeviceTilt, { passive: true });
  } else {
    sidebar.addEventListener('pointermove', onPointerMove, { passive: true });
    sidebar.addEventListener('pointerleave', onPointerLeave);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.addEventListener('upg:nav:change', () => {
  document.querySelectorAll('.elan-sidebar .nav-item').forEach(a => {
    a.toggleAttribute('aria-current', false);
  });
  const currentId = window.Upg?.nav?.current?.();
  if (currentId) {
    const active = document.querySelector(`.elan-sidebar .nav-item[data-page="${currentId}"]`);
    active?.setAttribute('aria-current', 'page');
  }
});
```

### ٣. تحديث index.html sidebar markup

```html
<aside class="elan-sidebar" data-elan="sidebar" role="navigation" aria-label="التنقل الرئيسي">
  <div class="sidebar-header">
    <a href="#page-dashboard" class="v-wordmark">Upgrade</a>
  </div>
  <nav data-elan="nav-list" role="menu">
    <!-- items injected by sidebar.js -->
  </nav>
</aside>
```

---

## Acceptance Criteria

- [ ] `.elan-sidebar` يَميل خفيفاً مع pointer على desktop
- [ ] على mobile (touch) يَميل مع gyroscope
- [ ] ميل ≤ ±1.5deg (لا motion sickness)
- [ ] respects prefers-reduced-motion
- [ ] 14 nav item يحقن من JS بـ Lucide icons (لا emoji)
- [ ] grep: `grep -c "\\<emoji\\|☎\\|✓\\|🎯" platform/index.html` == 0
- [ ] grep: `grep -c '<svg viewBox' platform/assets/js/chrome/sidebar.js` == 0 (no toy SVG)
- [ ] aria-current يتحدّث عند التنقل
- [ ] commit: `δ1: Magnetic Sidebar — verified: tilt_max=1.5, gyro_mobile=on, lucide_only=true, emoji=0`
- [ ] Beacon recorded

— نهاية δ1 —
