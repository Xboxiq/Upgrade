/* ============================================================
   ATELIER v16 — Service Worker (Worker 14 / Phase 6)
   Strategy: precache shell + stale-while-revalidate for assets
              navigation: network-first → offline.html fallback
   ============================================================ */
'use strict';

const VERSION = 'devotio-v3-w23-p4-2026-05';
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
