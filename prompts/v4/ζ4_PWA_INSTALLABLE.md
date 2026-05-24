# ζ4 — PWA Installable + Offline Ritual
> **Pillar ζ / Stage 4 of 5**
> الهدف: المنصة تُثبَّت كـ PWA كاملة + offline يَعمل بكامله (sw.js precache + offline fallback).

---

## السياق

`manifest.webmanifest` و `sw.js` موجودان لكن `offline.html` بسيط و لا precache كامل. ζ4 يُكمل القصة.

---

## التنفيذ

### ١. تحديث `platform/manifest.webmanifest`
```json
{
  "name": "Upgrade — منصة التدريب الذاتي",
  "short_name": "Upgrade",
  "description": "ثمانية عوالم للتدرّب الذاتي العميق",
  "start_url": "/platform/index.html",
  "scope": "/platform/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "lang": "ar",
  "dir": "rtl",
  "background_color": "#1a1a1a",
  "theme_color": "#1a1a1a",
  "icons": [
    { "src": "favicon.svg", "sizes": "any", "type": "image/svg+xml" },
    { "src": "icons/maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "categories": ["education", "productivity"],
  "screenshots": [
    { "src": "screenshots/dashboard-mobile.png", "sizes": "1080x1920", "type": "image/png", "form_factor": "narrow" }
  ]
}
```

### ٢. تحديث `sw.js` — precache كل الـ assets الحرجة
```javascript
const VERSION = 'elan-v4-1';
const CACHE_NAME = `upgrade-${VERSION}`;

const PRECACHE_URLS = [
  '/platform/index.html',
  '/platform/offline.html',
  '/platform/assets/style.css',
  '/platform/assets/app.js',

  // Worlds
  ...Array.from({ length: 8 }, (_, i) => `/platform/assets/css/worlds/_${['hibr','naar','nada','hadeed','dhahab','tayyar','warsha','saloon'][i]}.css`),

  // Tokens
  '/platform/assets/css/tokens.css',
  '/platform/assets/css/tokens/_color.css',
  '/platform/assets/css/tokens/_space.css',
  '/platform/assets/css/tokens/_type.css',
  '/platform/assets/css/tokens/_motion.css',
  '/platform/assets/css/tokens/_breakpoint.css',
  '/platform/assets/css/tokens/_voice-utilities.css',
  '/platform/assets/css/tokens/_signature.css',

  // Icons
  '/platform/assets/icons/lucide-sprite.svg',
  '/platform/assets/icons/phosphor-sprite.svg',

  // Fonts (β1)
  '/platform/assets/fonts/markazi-text/markazi-text-VF.woff2',
  '/platform/assets/fonts/vazirmatn/vazirmatn-VF.woff2',
  '/platform/assets/fonts/almarai/almarai-400.woff2',
  '/platform/assets/fonts/almarai/almarai-700.woff2',
  // ... etc
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Network-first for HTML (so updates show)
  if (req.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(req).catch(() => caches.match(req).then(r => r || caches.match('/platform/offline.html')))
    );
    return;
  }

  // Cache-first for everything else
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      if (resp.ok && req.url.startsWith(self.location.origin)) {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
      }
      return resp;
    }).catch(() => caches.match('/platform/offline.html')))
  );
});
```

### ٣. تحديث `offline.html`
```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>Upgrade — أنت بلا اتصال</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body data-world="hibr" style="min-height:100vh;display:grid;place-items:center;padding:var(--s-6);text-align:center">
  <div>
    <span data-icon="bell-off" data-icon-size="2xl" data-icon-color="muted"></span>
    <h1 class="v-display">المنصة بلا اتصال</h1>
    <p class="v-body-lead">المحتوى المحفوظ مسبقاً جاهز للقراءة حتى يعود الاتصال.</p>
    <button class="btn" onclick="location.reload()">
      <span data-icon="check" data-icon-size="sm"></span>
      حاوِل مجدَّداً
    </button>
  </div>
  <script type="module" src="assets/js/core/icons.js"></script>
</body>
</html>
```

### ٤. أضف "Install Upgrade" button في cmdk أو settings
```javascript
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  document.dispatchEvent(new CustomEvent('upg:pwa:installable'));
});

export async function install() {
  if (!deferredPrompt) return false;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  return outcome === 'accepted';
}
```

### ٥. Verify
```bash
# Lighthouse PWA category
npx lighthouse http://127.0.0.1:8000 --only-categories=pwa
# Should report: ✅ Manifest, ✅ Service Worker, ✅ Installable
```

---

## Acceptance Criteria

- [ ] Manifest valid + icons present
- [ ] sw.js precaches ≥ 30 critical assets
- [ ] Offline mode works (test in DevTools: Network → Offline)
- [ ] offline.html uses ÊLAN style (icons + voice + world)
- [ ] PWA installable on mobile + desktop
- [ ] Lighthouse PWA score ≥ 95
- [ ] Service Worker version bumps on each release (CACHE_NAME)
- [ ] commit: `ζ4: PWA Installable — verified: precache=<N>, lh_pwa=<X>, offline_works=true`
- [ ] No beacon

— نهاية ζ4 —
