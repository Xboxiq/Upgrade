# 🚀 WORKER 11 — Phase 7/7 — Production Pass (Polish & Launch)
> **اقرأ أولاً:** `prompts/11_WORKER_PLATFORM_FOUNDATION.md` (الفهرس).
> **متطلب مسبق:** Phases 1..6 منجزة.
> **الفلسفة:** "Last mile is where premium products differ from amateur."

---

## 🎯 الهدف

تطبيق آخر طبقة صقل تحوّل المنصة من "تشتغل" إلى "بمستوى منتج تجاري":
1. تخفيض inline styles من ~1,645 → < 400 (utility classes).
2. PWA كامل (manifest + service worker).
3. Favicon + icons set.
4. Cairo font fallback chain.
5. Meta SEO + Open Graph.
6. Performance audit (lazy load + dedupe).
7. a11y final pass (skip-link + focus trap + ARIA).
8. Console banner + Lighthouse target ≥ 90/95/95.

---

## 📋 PRE-FLIGHT لهذا الـ Phase

```
📋 PHASE 7 PRE-FLIGHT
├─ Phase: 7/7 — Production Pass
├─ Estimated lines: ~600 (CSS utilities ~150 + JS lazy/SW ~120 + scripts ~200 + meta ~30 + manifest/sw new ~100)
├─ Files to touch:
│   ├─ platform/index.html         (utility classes + meta + skip link + favicon link)
│   ├─ platform/assets/style.css   (utility layer + a11y)
│   ├─ platform/assets/app.js      (SW reg + lazy mount + console banner)
│   ├─ platform/manifest.webmanifest    (NEW)
│   ├─ platform/sw.js                   (NEW)
│   └─ platform/favicon.svg             (NEW)
├─ Optional: scripts/cleanup-inline-styles.mjs  (dev tool, not shipped)
└─ Deliverable: commit "phase 7: Production Pass + PWA" + push + final PR.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — **Utility Layer** (تنظيف inline styles)

أضف في `style.css` بعد كل القواعد الموجودة:

```css
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Utilities (Worker 11 / Phase 7)
   هدف: تقليل inline styles بـ ≥ 75%
   ═══════════════════════════════════════════════════════════════ */

/* Spacing — 8pt scale */
.u-m-0{margin:0}.u-mt-1{margin-top:.25rem}.u-mt-2{margin-top:.5rem}.u-mt-3{margin-top:.75rem}
.u-mt-4{margin-top:1rem}.u-mt-6{margin-top:1.5rem}.u-mt-8{margin-top:2rem}.u-mt-12{margin-top:3rem}
.u-mb-1{margin-bottom:.25rem}.u-mb-2{margin-bottom:.5rem}.u-mb-3{margin-bottom:.75rem}
.u-mb-4{margin-bottom:1rem}.u-mb-6{margin-bottom:1.5rem}.u-mb-8{margin-bottom:2rem}
.u-p-0{padding:0}.u-p-2{padding:.5rem}.u-p-3{padding:.75rem}.u-p-4{padding:1rem}.u-p-6{padding:1.5rem}.u-p-8{padding:2rem}
.u-px-2{padding-inline:.5rem}.u-px-4{padding-inline:1rem}.u-py-2{padding-block:.5rem}.u-py-4{padding-block:1rem}
.u-gap-1{gap:.25rem}.u-gap-2{gap:.5rem}.u-gap-3{gap:.75rem}.u-gap-4{gap:1rem}.u-gap-6{gap:1.5rem}.u-gap-8{gap:2rem}

/* Display & layout */
.u-block{display:block}.u-inline{display:inline}.u-inline-block{display:inline-block}.u-hidden{display:none}
.u-flex{display:flex}.u-inline-flex{display:inline-flex}.u-grid{display:grid}
.u-flex-col{flex-direction:column}.u-flex-wrap{flex-wrap:wrap}
.u-items-center{align-items:center}.u-items-start{align-items:flex-start}.u-items-end{align-items:flex-end}
.u-justify-between{justify-content:space-between}.u-justify-center{justify-content:center}.u-justify-end{justify-content:flex-end}
.u-grid-2{grid-template-columns:repeat(2,1fr)}
.u-grid-3{grid-template-columns:repeat(3,1fr)}
.u-grid-4{grid-template-columns:repeat(4,1fr)}
.u-grid-auto{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}

/* Text */
.u-text-center{text-align:center}.u-text-end{text-align:end}.u-text-start{text-align:start}
.u-text-xs{font-size:.75rem}.u-text-sm{font-size:.875rem}.u-text-base{font-size:1rem}.u-text-lg{font-size:1.125rem}.u-text-xl{font-size:1.25rem}.u-text-2xl{font-size:1.5rem}
.u-font-medium{font-weight:500}.u-font-semibold{font-weight:600}.u-font-bold{font-weight:700}.u-font-black{font-weight:800}
.u-text{color:var(--color-text)}.u-text-muted{color:var(--color-text-muted)}.u-text-faint{color:var(--color-text-faint)}
.u-text-brand{color:var(--color-brand)}.u-text-success{color:var(--color-success)}.u-text-warning{color:var(--color-warning)}.u-text-danger{color:var(--color-danger)}
.u-tabular{font-variant-numeric:tabular-nums}

/* Background & border */
.u-bg-surface-0{background:var(--color-surface-0)}.u-bg-surface-1{background:var(--color-surface-1)}.u-bg-surface-2{background:var(--color-surface-2)}.u-bg-brand-soft{background:var(--color-brand-soft)}
.u-border{border:1px solid var(--color-border)}.u-border-strong{border:1px solid var(--color-border-strong)}
.u-rounded-sm{border-radius:var(--radius-sm)}.u-rounded-md{border-radius:var(--radius-md)}.u-rounded-lg{border-radius:var(--radius-lg)}.u-rounded-full{border-radius:var(--radius-full)}
.u-shadow-sm{box-shadow:var(--shadow-sm)}.u-shadow-md{box-shadow:var(--shadow-md)}.u-shadow-lg{box-shadow:var(--shadow-lg)}

/* Misc */
.u-w-full{width:100%}.u-h-full{height:100%}.u-min-w-0{min-width:0}
.u-overflow-hidden{overflow:hidden}.u-overflow-auto{overflow:auto}
.u-cursor-pointer{cursor:pointer}
.u-select-none{user-select:none}
.u-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* Visibility helpers */
.u-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.u-skip-link{position:absolute;top:-40px;inset-inline-start:0;background:var(--color-brand);color:var(--color-bg);padding:.5rem 1rem;z-index:9999;transition:top 180ms}
.u-skip-link:focus{top:0}
```

**Cleanup script** (دعمي اختياري — `scripts/cleanup-inline-styles.mjs`):

```js
// run with: node scripts/cleanup-inline-styles.mjs
import fs from 'node:fs';
const path = 'platform/index.html';
let html = fs.readFileSync(path, 'utf8');

const map = [
  [/style="text-align:\s*center"/g, 'class="u-text-center"'],
  [/style="text-align:\s*end"/g, 'class="u-text-end"'],
  [/style="margin-top:\s*0\.5rem"/g, 'class="u-mt-2"'],
  [/style="margin-top:\s*1rem"/g, 'class="u-mt-4"'],
  [/style="display:\s*flex"/g, 'class="u-flex"'],
  [/style="display:\s*grid"/g, 'class="u-grid"'],
  [/style="font-weight:\s*700"/g, 'class="u-font-bold"'],
  // ... وسّع حسب الحاجة
];
for (const [r, w] of map) html = html.replace(r, w);
fs.writeFileSync(path, html);
console.log('done');
```

> ملاحظة: السكربت **اختياري** ولا يُشحن في PR. لكنه مفيد لتقليل العمل اليدوي.

### Step 2 — **PWA: Manifest + Service Worker + Favicon**

#### `platform/manifest.webmanifest`
```json
{
  "name": "Upgrade — منصة التطوير المهني الذاتي",
  "short_name": "Upgrade",
  "description": "9 مسارات تخصصية، تعلم تفاعلي، محتوى علمي عميق — بمعيار عالمي.",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait-primary",
  "lang": "ar",
  "dir": "rtl",
  "background_color": "#0E1220",
  "theme_color": "#0E1220",
  "icons": [
    { "src": "favicon.svg", "type": "image/svg+xml", "sizes": "any", "purpose": "any" },
    { "src": "favicon.svg", "type": "image/svg+xml", "sizes": "any", "purpose": "maskable" }
  ]
}
```

#### `platform/sw.js`
```js
const CACHE = 'upgrade-v14-1';
const ASSETS = [
  './',
  './index.html',
  './assets/style.css',
  './assets/app.js',
  './manifest.webmanifest',
  './favicon.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Cache-first for own assets
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(request).then(cached =>
        cached || fetch(request).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(request, copy));
          return res;
        }).catch(() => caches.match('./index.html'))
      )
    );
    return;
  }

  // Network-first for fonts (Cairo)
  if (url.hostname.includes('googleapis') || url.hostname.includes('gstatic')) {
    e.respondWith(
      fetch(request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(request, copy));
        return res;
      }).catch(() => caches.match(request))
    );
  }
});
```

#### `platform/favicon.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0E1220"/>
  <text x="32" y="44" text-anchor="middle"
        font-family="ui-sans-serif, system-ui, sans-serif"
        font-weight="800" font-size="40" fill="#66FCF1">U</text>
</svg>
```

#### تسجيل SW + meta في `<head>`
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0E1220">
<meta name="description" content="منصة التطوير المهني الذاتي بمعيار عالمي — 9 مسارات، تعلم تفاعلي، محتوى علمي عميق.">

<meta property="og:type" content="website">
<meta property="og:title" content="Upgrade — منصة التطوير الذاتي">
<meta property="og:description" content="9 مسارات تخصصية، تعلم تفاعلي، محتوى علمي عميق.">
<meta property="og:image" content="favicon.svg">
<meta property="og:locale" content="ar_IQ">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="favicon.svg">
```

```js
// في app.js — أسفل الملف
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.warn('SW register failed', err));
  });
}
```

### Step 3 — **Cairo Fallback Chain**

في `style.css` `:root`:
```css
:root {
  --font-base: 'Cairo', 'Tajawal', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}
body { font-family: var(--font-base); }
```

في `<head>` تأكد من `font-display: swap` على link Cairo:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap" rel="stylesheet">
```

### Step 4 — **Skip Link + Focus Trap للـ Modals**

في أعلى `<body>`:
```html
<a href="#main" class="u-skip-link">تخطّي إلى المحتوى</a>
<main id="main" tabindex="-1">
  <!-- ... existing main ... -->
</main>
```

JS Focus Trap للـ overlays:
```js
(() => {
  const trap = (container) => {
    const focusable = container.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    });
  };
  ['#cmdk-palette', '#shortcut-cheatsheet', '#page-gateway'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) trap(el);
  });
})();
```

### Step 5 — **Lazy Mount لصفحات الثقيلة**

تعديل `navigateTo` لتمر بـ:
```js
const HEAVY_PAGES = new Set(['lab', 'callcenter']); // Voice Lab + 75 scenarios
const _heavyMounted = new Set();
const oldNavigate = window.navigateTo;
window.navigateTo = function(pageId) {
  if (HEAVY_PAGES.has(pageId) && !_heavyMounted.has(pageId)) {
    _heavyMounted.add(pageId);
    window.dispatchEvent(new CustomEvent('upg:lazy-mount', { detail: { page: pageId } }));
  }
  return oldNavigate.apply(this, arguments);
};
```

ثم في كل IIFE ثقيل، استبدل تشغيله الفوري بـ:
```js
window.addEventListener('upg:lazy-mount', (e) => {
  if (e.detail.page === 'lab') initLabScenarios();
});
```

### Step 6 — **Console Banner + Reduced Motion Cleanup**

```js
console.log(
  '%cUpgrade Platform %cv14 Cathedral\n%cAll data lives on your device.',
  'font-size:18px;font-weight:bold;color:#66FCF1',
  'font-size:14px;color:#999',
  'color:#666;font-size:11px'
);
```

تأكد قواعد:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
  .gateway-aurora, .qi-spin, .qi-pulse, .qi-bounce, .cmdk-fade, .cmdk-slide { animation: none !important; }
}
```

(هذا الموضع الوحيد المسموح فيه `!important` — لـ a11y override.)

---

## ✅ Acceptance Criteria للـ Worker كاملاً (Phase 7 = آخر لمسة)

- [ ] `grep -c 'style="' platform/index.html` ≤ 400.
- [ ] `manifest.webmanifest`, `sw.js`, `favicon.svg` موجودة.
- [ ] Service Worker مسجَّل بنجاح (Application tab في DevTools).
- [ ] PWA installable (لو فُتحت من https أو localhost).
- [ ] favicon ظاهر في tab.
- [ ] Cairo font يحمّل مع `swap` ولا layout shift.
- [ ] Skip link يظهر عند Tab الأول.
- [ ] Focus trap يعمل في cmdk + gateway + cheatsheet.
- [ ] Lighthouse offline (DevTools → Lighthouse → mobile + desktop):
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 95
- [ ] Console banner يظهر.
- [ ] لا errors في console.
- [ ] التشغيل offline 100% بعد أول زيارة.

---

## 🛡️ في نهاية الـ Phase + إنهاء Worker 11

```
1. commit  : "phase 7: Production Pass + PWA + utilities"
2. push    : worker-11-complete
3. state   : current.phase=7, status="completed", completed_phases[+], snapshot file
4. push    : ثاني
5. PR      : افتح PR من worker-11-complete → main
   - title : "feat: Worker 11 — Platform Foundation Refit (Cathedral v14) — phases 1..7"
   - body  : ملخص الـ 7 phases + acceptance criteria checked + Lighthouse scores
6. اطبع SESSION CHECKPOINT النهائي
```

**🎉 Worker 11 مكتمل = منصة بمستوى Linear / Stripe.**

— نهاية Phase 7. نهاية Worker 11.
