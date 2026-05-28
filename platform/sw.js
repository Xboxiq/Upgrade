/* ============================================================
   ÊLAN v4 / ζ4 — Service Worker (PWA Installable + Offline Ritual)
   Strategy: precache shell + stale-while-revalidate for assets
              navigation: network-first → offline.html fallback
   Cache version is bumped per ÊLAN v4 stage to invalidate stale shells.
   ============================================================ */
'use strict';

const VERSION = 'elan-v4-zeta4-2026-05';
const SHELL_CACHE = `shell-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const FONT_CACHE  = `fonts-${VERSION}`;
const SHARD_CACHE = `shards-${VERSION}`;

const PRECACHE = [
  './',
  './index.html',
  './assets/style.css',
  './assets/app.js',
  './manifest.webmanifest',
  './favicon.svg',
  './offline.html',
  // Worker 23 / Phase 3 — CSS shatter (6 logical files)
  './assets/css/tokens.css',
  './assets/css/base.css',
  './assets/css/utilities.css',
  './assets/css/chrome.css',
  './assets/css/pages.css',
  './assets/css/motion.css',
  // Worker 23 / Phase 4 — HTML page shards (15 files, 1:1 with inline sections)
  './pages/dashboard.html',
  './pages/callcenter.html',
  './pages/fieldsales.html',
  './pages/accountmgr.html',
  './pages/social.html',
  './pages/lab.html',
  './pages/psych.html',
  './pages/eq.html',
  './pages/negotiation.html',
  './pages/customercare.html',
  './pages/programming.html',
  './pages/accounting.html',
  './pages/phonerepair.html',
  './pages/hrmastery.html',
  './pages/myprogress.html',
  // Worker 23 / Phase 5 — JS ESM modules (88 IIFEs + globals + compat shim)
  './assets/js/_legacy-globals.js',
  './assets/js/_compat.js',
  './assets/js/upg-helper-01.js',
  './assets/js/upg-helper-02.js',
  './assets/js/upg-helper-03.js',
  './assets/js/upg-helper-04.js',
  './assets/js/upg-helper-05.js',
  './assets/js/upg-helper-06.js',
  './assets/js/upg-helper-07.js',
  './assets/js/upg-helper-08.js',
  './assets/js/upg-helper-09.js',
  './assets/js/upg-helper-10.js',
  './assets/js/upg-helper-11.js',
  './assets/js/upg-helper-12.js',
  './assets/js/upg-helper-13.js',
  './assets/js/upg-helper-14.js',
  './assets/js/upg-helper-15.js',
  './assets/js/upg-helper-16.js',
  './assets/js/upg-helper-17.js',
  './assets/js/upg-helper-18.js',
  './assets/js/upg-helper-19.js',
  './assets/js/upg-helper-20.js',
  './assets/js/upg-helper-21.js',
  './assets/js/upg-helper-22.js',
  './assets/js/upg-helper-23.js',
  './assets/js/upg-helper-24.js',
  './assets/js/upg-helper-25.js',
  './assets/js/upg-helper-26.js',
  './assets/js/upg-helper-27.js',
  './assets/js/upg-helper-28.js',
  './assets/js/upg-helper-29.js',
  './assets/js/upg-helper-30.js',
  './assets/js/upg-helper-31.js',
  './assets/js/upg-helper-32.js',
  './assets/js/upg-helper-33.js',
  './assets/js/upg-helper-34.js',
  './assets/js/upg-helper-35.js',
  './assets/js/upg-helper-36.js',
  './assets/js/upg-helper-37.js',
  './assets/js/upg-helper-38.js',
  './assets/js/upg-helper-39.js',
  './assets/js/upg-helper-40.js',
  './assets/js/upg-helper-41.js',
  './assets/js/upg-helper-42.js',
  './assets/js/upg-helper-43.js',
  './assets/js/upg-helper-44.js',
  './assets/js/upg-helper-45.js',
  './assets/js/upg-helper-46.js',
  './assets/js/upg-helper-47.js',
  './assets/js/upg-helper-48.js',
  './assets/js/upg-helper-49.js',
  './assets/js/upg-theme-1.js',
  './assets/js/upg-icons-1.js',
  './assets/js/upg-gateway-1.js',
  './assets/js/upg-calc-1.js',
  './assets/js/upg-cmdk-1.js',
  './assets/js/upg-state-1.js',
  './assets/js/upg-production-1.js',
  './assets/js/upg-type-1.js',
  './assets/js/upg-scroll-1.js',
  './assets/js/upg-nav-1.js',
  './assets/js/upg-identity-1.js',
  './assets/js/upg-greet-1.js',
  './assets/js/upg-countup-1.js',
  './assets/js/upg-motion-1.js',
  './assets/js/upg-material-1.js',
  './assets/js/upg-chrome-1.js',
  './assets/js/upg-choreo-1.js',
  './assets/js/upg-transition-1.js',
  './assets/js/upg-transition-2.js',
  './assets/js/upg-focustrap-1.js',
  './assets/js/upg-focustrap-2.js',
  './assets/js/upg-type2-1.js',
  './assets/js/upg-life-1.js',
  './assets/js/upg-life-2.js',
  './assets/js/upg-life-3.js',
  './assets/js/upg-sound-1.js',
  './assets/js/upg-aura-1.js',
  './assets/js/upg-aura-2.js',
  './assets/js/upg-practice-1.js',
  './assets/js/upg-pace-1.js',
  './assets/js/upg-font-1.js',
  './assets/js/upg-font-2.js',
  './assets/js/upg-font-3.js',
  './assets/js/upg-chroma-1.js',
  './assets/js/upg-chroma-2.js',
  './assets/js/upg-ritual-1.js',
  './assets/js/upg-layer-1.js',
  './assets/js/upg-layer-2.js',
  './assets/js/upg-shards-1.js',
  // Worker 24 / Phase 2 — Bottom Nav (mobile-only)
  './assets/js/upg-nav-2.js',
  // Worker 24 / Phase 3 — Swipe Gestures (PointerEvents, mobile-only, RTL-aware)
  './assets/js/upg-touch-1.js',

  // ÊLAN v4 — α2/β1/β2/β3 — Token files (5 foundational + voice + signature + layout)
  './assets/css/tokens/_color.css',
  './assets/css/tokens/_space.css',
  './assets/css/tokens/_type.css',
  './assets/css/tokens/_motion.css',
  './assets/css/tokens/_breakpoint.css',
  './assets/css/tokens/_voice-utilities.css',
  './assets/css/tokens/_signature.css',
  './assets/css/tokens/_layout.css',

  // ÊLAN v4 — γ1..γ9 — Eight Worlds + activation foundation
  './assets/css/worlds/_index.css',
  './assets/css/worlds/_hibr.css',
  './assets/css/worlds/_naar.css',
  './assets/css/worlds/_nada.css',
  './assets/css/worlds/_hadeed.css',
  './assets/css/worlds/_dhahab.css',
  './assets/css/worlds/_tayyar.css',
  './assets/css/worlds/_warsha.css',
  './assets/css/worlds/_saloon.css',

  // ÊLAN v4 — δ5/δ6 — Kinetic shell (view transitions + motion sanctuary)
  './assets/css/_view-transition.css',
  './assets/css/_motion-sanctuary.css',

  // ÊLAN v4 — ε3..ε6 — Content revival shards (CSS)
  './assets/css/_epsilon3-fieldsales.css',
  './assets/css/_epsilon4-social.css',
  './assets/css/_epsilon5-lab.css',
  './assets/css/_epsilon6-psych-eq-neg.css',

  // ÊLAN v4 — ESM modules (worlds + δ + ε + format helpers)
  './assets/js/elan/format.js',
  './assets/js/elan/world.js',
  './assets/js/elan/world-hibr.js',
  './assets/js/elan/world-naar.js',
  './assets/js/elan/world-nada.js',
  './assets/js/elan/world-hadeed.js',
  './assets/js/elan/world-dhahab.js',
  './assets/js/elan/world-tayyar.js',
  './assets/js/elan/world-warsha.js',
  './assets/js/elan/world-saloon.js',
  './assets/js/elan/sidebar-magnetic.js',
  './assets/js/elan/bento-temporal.js',
  './assets/js/elan/topbar-living.js',
  './assets/js/elan/bottom-nav.js',
  './assets/js/elan/delta6-motion.js',
  './assets/js/elan/epsilon1-dashboard.js',
  './assets/js/elan/epsilon3-fieldsales.js',
  './assets/js/elan/epsilon4-social.js',
  './assets/js/elan/epsilon5-lab.js',
  './assets/js/elan/epsilon6-psych.js',
  './assets/js/elan/epsilon7-customercare.js',
  './assets/js/elan/epsilon8-programming.js',
  './assets/js/elan/epsilon9-accounting.js',
  './assets/js/elan/epsilon10-phonerepair.js',
  './assets/js/elan/epsilon11-hrmastery.js',
  './assets/js/elan/epsilon12-mood.js',

  // ÊLAN v4 — ζ4 — Install prompt capture
  './assets/js/elan/zeta4-install.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((c) => c.addAll(PRECACHE))
      .catch((err) => console.warn('[SW v16] precache failed:', err))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== ASSET_CACHE && k !== FONT_CACHE && k !== SHARD_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // Navigation: network-first, fallback to offline.html (or cached index.html)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // opportunistically refresh shell cache for index
          if (res && res.ok && url.origin === self.location.origin) {
            const copy = res.clone();
            caches.open(SHELL_CACHE).then((c) => c.put('./index.html', copy)).catch(() => {});
          }
          return res;
        })
        .catch(() =>
          caches.match('./offline.html').then((m) => m || caches.match('./index.html'))
        )
    );
    return;
  }

  // Same-origin assets: stale-while-revalidate
  if (url.origin === self.location.origin) {
    // Page shards: cache-first against SHARD_CACHE (offline-critical, rarely changes)
    if (/\/pages\/[a-z]+\.html$/.test(url.pathname)) {
      event.respondWith(
        caches.match(req).then((cached) => {
          const fetchPromise = fetch(req)
            .then((res) => {
              if (res && res.ok && res.type === 'basic') {
                const copy = res.clone();
                caches.open(SHARD_CACHE).then((c) => c.put(req, copy)).catch(() => {});
              }
              return res;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        })
      );
      return;
    }

    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.ok && res.type === 'basic') {
              const copy = res.clone();
              caches.open(ASSET_CACHE).then((c) => c.put(req, copy)).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Google Fonts (CSS + woff2): stale-while-revalidate in dedicated fonts cache
  if (url.hostname.includes('googleapis') || url.hostname.includes('gstatic')) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(FONT_CACHE).then((c) => c.put(req, copy)).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
