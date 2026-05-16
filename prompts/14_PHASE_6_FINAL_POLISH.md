# 🪶 WORKER 14 — Phase 6/6 — Final Polish (Inline Purge + a11y + PWA + Favicon + Lighthouse)
> **اقرأ أولاً:** `prompts/14_WORKER_ATELIER_LIQUID_GLASS.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 1+2+3+4+5.
> **الفلسفة:** المنصة التي ترقى إلى Apple-grade لا تحتوي residue. كل سطر له سبب.

---

## 🛡️ Preservation Contract (Phase 6)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **REPLACE-IN-PLACE** للـ ≤145 inline `style="…"` بـ utility classes (`.u-chip-{color}`, `.u-w-N`, `.u-grad-*`، إلخ) | حذف عناصر، تغيير IDs، حذف emoji من content، حذف نصوص |
| `style.css` | **APPEND** كتلة "Final Utilities Pack" (≤120 utility class جديدة) — مع التأكد من عدم تكرار utilities موجودة من W12/P7 و W13/P2 | تعديل قواعد قائمة |
| `app.js` | **APPEND** IIFE: `Upg.focusTrap` (modal focus trap) + Lighthouse boot helper + sanity v16 banner | تعديل APIs قائمة |
| `sw.js` | **REPLACE الكامل** بنسخة جديدة (precache + offline + update prompt). الملف الحالي 74 سطر فقط، بدائي. | حذف الـ caching strategy السابقة قبل بدء الجديدة (نحوّل cache version فقط) |
| `manifest.webmanifest` | **AUGMENT** — إضافة icons array (192/512), shortcuts, theme_color refresh | تغيير `start_url` أو `scope` |
| `favicon.svg` | **REPLACE** بنسخة v2 (squircle border-radius + tint variant aware) | — |
| **NEW** `platform/offline.html` | **CREATE** — صفحة offline minimal (RTL, Cairo, "أنت غير متصل" + reload button) | — |
| `state/CHANGELOG.md` | **APPEND** قسم v16 | — |

**Sacred preserved:** كل شي. هذا phase تنظيف، ليس بناء.

---

## 🎯 الهدف

7 لمسات نهائية ترفع المنصة من "احترافية" إلى "production-grade لمنصة ابل تجارية":

1. **Inline Purge عميق** — من 223 → ≤80 (تحويل 143+ inline لـ utility classes).
2. **a11y unify** — `Upg.focusTrap` + ESC-to-close موحّد لكل modal/dialog، focus rings token-driven.
3. **PWA متقدّم** — sw.js بـ precache كامل + cache versioning + offline.html + update prompt.
4. **Manifest محدّث** — icons array (192, 512), shortcuts (4 اختصارات لأكثر الصفحات استعمالاً), theme_color dual.
5. **Favicon v2** — squircle SVG (rx=22%) مع dark/light tint awareness عبر `prefers-color-scheme`.
6. **Lighthouse fix-pack** — passive listeners، lazy loading hints، unused CSS check (manual)، meta description refresh.
7. **CHANGELOG v16** — توثيق كل ما عمله Worker 14.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 6 PRE-FLIGHT
├─ Phase: 6/6 — Final Polish
├─ Estimated lines: ~600
├─ Files to touch:
│   ├─ platform/index.html             (REPLACE-IN-PLACE ≤145 inline styles)
│   ├─ platform/assets/style.css       (APPEND ~150 utility classes)
│   ├─ platform/assets/app.js          (APPEND ~120 lines: focusTrap + sanity v16)
│   ├─ platform/sw.js                  (REPLACE: 74 → ~180 lines)
│   ├─ platform/manifest.webmanifest   (REPLACE)
│   ├─ platform/favicon.svg            (REPLACE)
│   ├─ platform/offline.html           (CREATE)
│   └─ state/CHANGELOG.md              (APPEND v16 section)
├─ Sacred verify (FINAL):
│   ├─ 14 page sections, 391 qcalc, all Upg.* APIs
│   └─ Lighthouse Mobile: Performance ≥90, Accessibility ≥95, Best Practices ≥95
├─ Branch: continue worker-14-atelier
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Inline Purge Audit

```bash
# قبل التعديل
grep -c 'style="' platform/index.html  # → 223

# تصنيف
grep -oE 'style="[^"]+"' platform/index.html | sort | uniq -c | sort -rn > /tmp/inline-audit.txt
head -50 /tmp/inline-audit.txt
```

ابحث عن أنماط متكرّرة قابلة للتجميع (groups of similar inline):

| Pattern | Utility class | Count est. |
|---|---|---|
| `style="width:N%"` (0-100) | `.u-w-{0,5,10,15,...,100}` (21 utility) | ~30 |
| `style="background:#HEX..."` (chip avatars 36×36) | `.u-chip-{name}` per page color | ~25 |
| `style="background:linear-gradient(135deg, ColorA, ColorB)"` (4-color combos) | Already covered by W13/P2 `u-grad-*` — extend | ~30 |
| `style="display:none"` | `.u-hidden` (موجودة من W12/P7) | ~12 |
| `style="margin:0 auto..."` | `.u-mx-auto` | ~10 |

### Step 2 — Utility classes جديدة

**APPEND** في `style.css`:

```css
/* ═══════════════════════════════════════════════════════════════
   ATELIER v16 — Final Utilities Pack (Worker 14 / Phase 6)
   ═══════════════════════════════════════════════════════════════ */

/* Width % (5% increments) */
.u-w-0   { width: 0%   !important; }
.u-w-5   { width: 5%   !important; }
.u-w-10  { width: 10%  !important; }
.u-w-15  { width: 15%  !important; }
.u-w-20  { width: 20%  !important; }
.u-w-25  { width: 25%  !important; }
.u-w-30  { width: 30%  !important; }
.u-w-35  { width: 35%  !important; }
.u-w-40  { width: 40%  !important; }
.u-w-45  { width: 45%  !important; }
.u-w-50  { width: 50%  !important; }
.u-w-55  { width: 55%  !important; }
.u-w-60  { width: 60%  !important; }
.u-w-65  { width: 65%  !important; }
.u-w-70  { width: 70%  !important; }
.u-w-75  { width: 75%  !important; }
.u-w-80  { width: 80%  !important; }
.u-w-85  { width: 85%  !important; }
.u-w-90  { width: 90%  !important; }
.u-w-95  { width: 95%  !important; }
.u-w-100 { width: 100% !important; }

/* Chip avatars 36×36 / 46×46 / 48×48 — squircle */
.u-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--radius-md, 12px);
  font-size: 18px;
  font-weight: 600;
}
.u-chip-36 { width: 36px; height: 36px; }
.u-chip-46 { width: 46px; height: 46px; font-size: 22px; }
.u-chip-48 { width: 48px; height: 48px; font-size: 22px; }

/* Chip color presets (per identity tint) — extend on demand */
.u-chip-red       { background: linear-gradient(135deg, hsl(0 80% 50%), hsl(355 75% 35%)); color: white; }
.u-chip-amber     { background: linear-gradient(135deg, hsl(35 92% 55%), hsl(15 85% 50%)); color: white; }
.u-chip-pink      { background: linear-gradient(135deg, hsl(330 80% 60%), hsl(345 70% 50%)); color: white; }
.u-chip-violet    { background: linear-gradient(135deg, hsl(265 70% 60%), hsl(285 60% 50%)); color: white; }
.u-chip-emerald   { background: linear-gradient(135deg, hsl(152 60% 45%), hsl(160 55% 38%)); color: white; }
.u-chip-cyan      { background: linear-gradient(135deg, hsl(186 80% 50%), hsl(195 70% 42%)); color: white; }
.u-chip-blue      { background: linear-gradient(135deg, hsl(210 90% 55%), hsl(220 75% 42%)); color: white; }
.u-chip-orange    { background: linear-gradient(135deg, hsl(15 80% 55%), hsl(25 75% 45%)); color: white; }

/* Margin auto */
.u-mx-auto { margin-inline: auto !important; }
.u-my-auto { margin-block: auto !important; }
.u-m-auto  { margin: auto !important; }

/* Hidden (alias if not exists) */
.u-d-none  { display: none !important; }
.u-d-block { display: block !important; }
.u-d-flex  { display: flex !important; }

/* Scroll-margin for anchor targets */
.u-anchor-offset { scroll-margin-block-start: var(--space-8, 64px); }

/* Print-only utilities */
@media print {
  .u-no-print { display: none !important; }
  .u-print-block { display: block !important; }
  .u-print-page-break { page-break-after: always; }
}

/* High-contrast mode (a11y) */
@media (forced-colors: active) {
  .u-chip,
  .stat-tile-icon,
  .bento-pill { border: 1px solid CanvasText; }
}
```

### Step 3 — JS: `Upg.focusTrap` + sanity v16

**APPEND**:

```javascript
/* ============================================================
   ATELIER v16 — Focus Trap (Worker 14 / Phase 6)
   Public API: window.Upg.focusTrap.{ enable, disable }
   Use: Upg.focusTrap.enable(modalEl, returnFocusEl);
   ============================================================ */
(() => {
  'use strict';
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const traps = new WeakMap();

  const enable = (container, returnFocusEl) => {
    if (!container) return;
    const items = container.querySelectorAll(FOCUSABLE);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const handler = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        const closeBtn = container.querySelector('[data-close]');
        if (closeBtn) closeBtn.click();
      }
    };
    container.addEventListener('keydown', handler);
    container.addEventListener('keydown', escHandler);
    traps.set(container, { handler, escHandler, returnFocusEl });
    setTimeout(() => first.focus(), 0);
  };

  const disable = (container) => {
    const t = traps.get(container);
    if (!t) return;
    container.removeEventListener('keydown', t.handler);
    container.removeEventListener('keydown', t.escHandler);
    if (t.returnFocusEl && typeof t.returnFocusEl.focus === 'function') {
      t.returnFocusEl.focus();
    }
    traps.delete(container);
  };

  window.Upg = window.Upg || {};
  window.Upg.focusTrap = { enable, disable };
})();

/* ============================================================
   ATELIER v16 — Sanity Banner (Worker 14 / Phase 6)
   Final boot assert — verifies all 19+ Upg.* modules.
   ============================================================ */
(() => {
  'use strict';
  const REQUIRED = [
    // Worker 11 (7)
    'theme', 'icons', 'gateway', 'calc', 'cmdk', 'state', 'production',
    // Worker 12 (7)
    'type', 'scroll', 'nav', 'identity', 'greet', 'countup', 'motion',
    // Worker 14 (5)
    'material', 'chrome', 'choreo', 'transition', 'focusTrap',
  ];
  const missing = REQUIRED.filter((k) => !window.Upg || typeof window.Upg[k] === 'undefined');
  if (missing.length) {
    console.warn('[ATELIER v16] Missing Upg modules:', missing.join(', '));
  } else {
    console.log('%c🪞 ATELIER v16 — Cathedral v16 ready · 19/19 modules loaded',
      'color:#66FCF1;font-weight:700;font-family:monospace;');
  }
})();
```

### Step 4 — Service Worker rewrite

**REPLACE الكامل** لـ `platform/sw.js`:

```javascript
/* ============================================================
   ATELIER v16 — Service Worker (Worker 14 / Phase 6)
   Strategy: precache shell + stale-while-revalidate for assets
   ============================================================ */
'use strict';

const VERSION = 'atelier-v16-2026-05';
const SHELL_CACHE = `shell-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const PRECACHE = [
  './',
  './index.html',
  './assets/style.css',
  './assets/app.js',
  './manifest.webmanifest',
  './favicon.svg',
  './offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== SHELL_CACHE && k !== ASSET_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Same-origin only
  if (url.origin !== self.location.origin) return;

  // Navigation requests — network-first, fallback to offline.html
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match('./offline.html').then((m) => m || caches.match('./index.html'))
      )
    );
    return;
  }

  // Assets — stale-while-revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(ASSET_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
```

### Step 5 — Offline page

**CREATE** `platform/offline.html`:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>غير متصل — Upgrade</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: "Cairo", system-ui, sans-serif;
      background: hsl(225 30% 6%);
      color: hsl(220 20% 98%);
      margin: 0; min-height: 100vh;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 20px; text-align: center;
    }
    h1 { font-size: 2rem; margin-block-end: 0.5em; }
    p { color: hsl(220 15% 70%); max-width: 36ch; line-height: 1.6; }
    button {
      margin-block-start: 24px;
      padding: 12px 28px;
      background: hsl(176 100% 70%);
      color: hsl(225 30% 6%);
      border: none; border-radius: 12px;
      font-family: inherit; font-size: 1rem; font-weight: 700;
      cursor: pointer;
    }
    button:hover { transform: translateY(-1px); box-shadow: 0 6px 18px hsl(176 100% 70% / 0.35); }
    .icon { font-size: 4rem; margin-block-end: 16px; }
  </style>
</head>
<body>
  <div class="icon">📶</div>
  <h1>أنت غير متصل بالإنترنت</h1>
  <p>المنصة محفوظة محلياً. حالما يعود الاتصال، سيعمل كل شيء كالمعتاد.</p>
  <button onclick="location.reload()">إعادة المحاولة</button>
</body>
</html>
```

### Step 6 — Manifest refresh

**REPLACE** `platform/manifest.webmanifest`:

```json
{
  "name": "Upgrade — منصة التطوير المهني الذاتي",
  "short_name": "Upgrade",
  "description": "9 مسارات تخصصية، تعلم تفاعلي، محتوى علمي عميق.",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "orientation": "any",
  "lang": "ar",
  "dir": "rtl",
  "background_color": "#0E1220",
  "theme_color": "#0E1220",
  "icons": [
    { "src": "favicon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any maskable" }
  ],
  "shortcuts": [
    { "name": "لوحة التحكم", "short_name": "لوحة", "url": "./index.html#dashboard" },
    { "name": "كول سنتر", "short_name": "كول", "url": "./index.html#callcenter" },
    { "name": "تقدمي", "short_name": "تقدم", "url": "./index.html#myprogress" },
    { "name": "حاسبات", "short_name": "حاسبات", "url": "./index.html#accounting" }
  ],
  "categories": ["education", "productivity", "business"]
}
```

### Step 7 — Favicon v2

**REPLACE** `platform/favicon.svg` بنسخة squircle:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#66FCF1"/>
      <stop offset="100%" stop-color="#4F46E5"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#g)"/>
  <path d="M30 65 V35 L50 50 L70 35 V65" fill="none" stroke="#0E1220" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Step 8 — CHANGELOG v16

**APPEND** في `state/CHANGELOG.md` (في الأعلى، قبل v15.1):

```markdown
## v16 — ATELIER (Apple Liquid-Glass Pass) — Worker 14 — 2026-05/06

### Added — 5 new Upg.* APIs (total now 19)
- `Upg.material` (Phase 1) — material density tier (low/standard/high), persists to localStorage
- `Upg.chrome` (Phase 4) — topbar scroll-shrink + sidebar pill spring + mobile drawer
- `Upg.choreo` (Phase 5) — magnetic hover + reveal/stagger IntersectionObserver
- `Upg.transition` (Phase 5) — page transitions via View Transitions API + spring fallback
- `Upg.focusTrap` (Phase 6) — modal focus trap with ESC-to-close

### Changed — Apple Liquid-Glass spec (WWDC 2025+)
- 4 glass tiers blur ladder: 16/24/32/40px (was 12/15/18/22)
- Saturate 200% (was 180%), brightness 1.05 dark / 1.02 light
- Edge specular highlight (`inset 0 1px 0 ...`) on every glass surface
- Light theme 3-tier paper tonal (paper-tone-1/2/3)
- Paper grain v2 (SVG noise data-URI, opacity 0.025) on light theme

### Changed — Page Headers (Phase 2)
- 13 page-headers refactored to `.page-h` block (eyebrow + title-with-icon + lede)
- Emoji purged from all `<h1>` inside `<section class="page">` (kept everywhere else: skill cards, scenario cards, stat-tiles)
- 56px tint underline per page identity

### Changed — Dashboard Consolidation (Phase 3)
- `#page-dashboard` reduced from 6 duplicated sections to 1 unified Bento layout (8 cells)
- Removed: `dashboard-legacy` wrapper, `welcome-banner`, `grid-4` legacy stats
- All 9 sacred IDs preserved (cath-stats, cath-skill-grid, cath-activity-list, v12Heatmap, v12Challenge*)

### Changed — Chrome (Phase 4)
- Topbar Dynamic-Island scroll-shrink (64→48px @ scrollY > 80)
- Search input → search button → opens Command Palette
- Sidebar nav-pill spring slide (320ms cubic-bezier(0.5,1.5,0.5,1))
- Collapsed-mode tooltips
- Mobile drawer scrim + ESC + swipe-to-close

### Changed — Motion (Phase 5)
- Magnetic hover on `.dock-btn` (max 6px pull, range 80px)
- Stagger reveal on `[data-stagger]` (60ms step)
- Card reveal on intersect (`[data-reveal]`)
- Page transitions: View Transitions API + spring fallback (360ms)

### Changed — Production (Phase 6)
- Inline `style="..."` reduced from 223 → ≤80 (chip avatars, width %, gradients → utilities)
- Service Worker rewritten: 74 → ~180 lines, precache shell + SWR for assets
- New `platform/offline.html` (RTL Cairo)
- Manifest: shortcuts (4), categories, theme_color dual
- Favicon v2: squircle 22% radius, gradient brand icon
- a11y: `Upg.focusTrap` for all modals, ESC-to-close standardized
- Boot sanity: verifies 19 Upg.* modules

### Preserved
- 14 page sections, 391 qcalc references, all citations, Iraq blocks, salary tables
- All Cairo + Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa fonts
- 15 identity tints (HSL values unchanged)
- All Worker 11/12/13 IIFEs untouched
```

### Step 9 — Sanity grep finale

```bash
echo "=== Inline reduction ===" 
grep -c 'style="' platform/index.html  # → ≤80

echo "=== APIs count ==="
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → ≥19

echo "=== Sacred preserved ==="
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391

echo "=== PWA assets present ==="
ls -la platform/sw.js platform/manifest.webmanifest platform/favicon.svg platform/offline.html
```

---

## ✅ معايير القبول النهائية (Phase 6 + Worker 14 ككل)

- [ ] Inline `style=""` ≤ 80 (من 223).
- [ ] Total Upg.* APIs ≥ 19.
- [ ] 14 pages, 391 qcalc, 0 console errors (preserved).
- [ ] sw.js يعمل offline (test: قطع network، اعمل reload → offline.html تظهر).
- [ ] PWA installable (Chrome devtools → Application → Manifest → installable yes).
- [ ] Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95.
- [ ] Boot console banner يطبع `🪞 ATELIER v16 — Cathedral v16 ready · 19/19 modules loaded`.
- [ ] CHANGELOG v16 مُضاف.

---

## 📤 Commit + Push (final)

```bash
git add platform/
git add state/CHANGELOG.md state/PROGRESS.json state/snapshots/worker-14-phase-6.json
git commit -m "phase 6 (atelier): final polish — inline 223→≤80 + sw v2 precache + offline page + manifest shortcuts + favicon v2 + Upg.focusTrap + sanity v16"
# push

git commit --allow-empty -m "state: atelier phase 6 committed and pushed — Worker 14 complete"
# push
```

### PR (نهاية Worker 14)

```
العنوان: feat: Worker 14 — ATELIER (Apple Liquid-Glass Pass v16) — 6 phases
الوصف:
  Phase 1: Liquid Glass v2 (WWDC 2025 spec)
  Phase 2: Page Headers re-chisel + emoji purge
  Phase 3: Dashboard Bento consolidation (6→1)
  Phase 4: Topbar Island + Source-list refinement
  Phase 5: Motion choreography v2
  Phase 6: Final polish + PWA v2 + a11y unify
  
  19 Upg.* APIs total, 0 console errors, all sacred preserved.
  Inline 223→≤80, sw.js 74→~180, Lighthouse passing.
```

— نهاية Phase 6. نهاية Worker 14. الكاتدرائية مكتملة على إصدار v16.
