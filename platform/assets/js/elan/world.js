/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — γ1 — World Controller
   ────────────────────────────────────────────────────────────────────────
   Listens to nav events and the DOM, then mirrors the active page's
   data-world onto <body data-world="...">. CSS owns the visual swap.

   Beacon:🏛 STRUCTURAL_BEACON
     The Surprise: this controller is a pure ENHANCEMENT layer. If JS is
     disabled or fails to boot, worlds still activate via the
     `:has(.page.active[data-world])` cascade (see worlds/_index.css).
     The platform never goes "themeless" because of a runtime failure.

   Public surface (registered as window.Upg.world — 31st Upg.* API):
     • set(pageId)        — opt-in mirror; returns boolean changed
     • setWorld(world)    — direct override (also dispatches event)
     • current()          — returns the world string currently on body
     • currentPageId()    — returns the active page id (best-effort)
     • map()              — frozen copy of the page→world map
     • has(world)         — boolean is the world a known one
     • worlds()           — frozen list of 8 world names
     • DEFAULT            — the default world (hibr)

   Events:
     • upg:world:change   — { detail: { world, prevWorld, pageId } }
     • Listens for upg:nav:change (from chrome) + DOM mutations as backup.

   Sacred preserved:
     • Does not mutate Upg.nav, Upg.theme, or any prior surface.
     • Does not strip the legacy [data-theme="light"|"dark"] cascade.
     • Reduced-motion safe (no transitions are introduced here).
   ─────────────────────────────────────────────────────────────────────── */

const PAGE_TO_WORLD = Object.freeze({
  'page-dashboard':    'hibr',
  'page-myprogress':   'hibr',
  'page-lab':          'naar',
  'page-programming':  'naar',
  'page-psych':        'nada',
  'page-eq':           'nada',
  'page-negotiation':  'hadeed',
  'page-fieldsales':   'hadeed',
  'page-accounting':   'dhahab',
  'page-social':       'tayyar',
  'page-callcenter':   'tayyar',
  'page-customercare': 'warsha',
  'page-phonerepair':  'warsha',
  'page-hrmastery':    'saloon',
  'page-accountmgr':   'saloon',
});

const WORLDS = Object.freeze([
  'hibr', 'naar', 'nada', 'hadeed', 'dhahab', 'tayyar', 'warsha', 'saloon',
]);

const DEFAULT_WORLD = 'hibr';

/* ── helpers ─────────────────────────────────────────────────────────── */

function readWorldFromDom(pageId) {
  if (!pageId) return null;
  const node = document.getElementById(pageId);
  const attr = node && node.getAttribute('data-world');
  return attr || null;
}

function resolveWorld(pageId) {
  // 1. data-world attribute on the section is the source of truth
  const fromDom = readWorldFromDom(pageId);
  if (fromDom && WORLDS.includes(fromDom)) return fromDom;
  // 2. fallback to the JS map
  const mapped = PAGE_TO_WORLD[pageId];
  if (mapped) return mapped;
  // 3. otherwise default
  return DEFAULT_WORLD;
}

function currentPageId() {
  // 1. .page.active is the canonical legacy marker
  let active = document.querySelector('section.page.active, section.page.is-active');
  // 2. fallback: visible page section that isn't gateway
  if (!active) {
    active = document.querySelector(
      'section.page:not([hidden]):not(#page-gateway):not([style*="display: none"])'
    );
  }
  // 3. last-resort: hash route
  if (!active && location.hash && location.hash.length > 1) {
    const id = 'page-' + location.hash.slice(1).replace(/^\//, '');
    if (document.getElementById(id)) return id;
  }
  return (active && active.id) || 'page-dashboard';
}

/* ── core ────────────────────────────────────────────────────────────── */

function applyWorld(world, pageId) {
  if (!WORLDS.includes(world)) world = DEFAULT_WORLD;
  const prev = document.body.dataset.world;
  if (prev === world) return false;

  const commit = () => { document.body.dataset.world = world; };

  // View Transitions are reserved for δ5 — only used here if the browser
  // already supports it AND the user hasn't asked for reduced motion.
  const wantsReduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !wantsReduce) {
    try { document.startViewTransition(commit); }
    catch (_) { commit(); }
  } else {
    commit();
  }

  document.dispatchEvent(new CustomEvent('upg:world:change', {
    detail: { world, to: world, prevWorld: prev || null, pageId: pageId || null },
  }));
  return true;
}

function set(pageId) {
  const id = pageId || currentPageId();
  return applyWorld(resolveWorld(id), id);
}

function setWorld(world) {
  return applyWorld(world, currentPageId());
}

/* ── boot ────────────────────────────────────────────────────────────── */

function boot() {
  set(currentPageId());

  // Primary signal: most chrome modules dispatch this on navigation.
  document.addEventListener('upg:nav:change', (e) => {
    const id = (e && e.detail && e.detail.pageId) || currentPageId();
    set(id);
  });

  // Legacy signal: some pages dispatch this instead.
  document.addEventListener('upg:page:change', () => set(currentPageId()));

  // Hash route fallback.
  window.addEventListener('hashchange', () => set(currentPageId()));

  // Belt-and-braces: observe `.page.active` toggles in case neither
  // event fires (e.g. third-party code calls classList directly).
  if (typeof MutationObserver === 'function') {
    const root = document.querySelector('main, #main, body') || document.body;
    const observer = new MutationObserver(() => set(currentPageId()));
    observer.observe(root, {
      subtree: true, attributes: true, attributeFilter: ['class'],
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

/* ── public surface ──────────────────────────────────────────────────── */

const surface = Object.freeze({
  set,
  setWorld,
  current: () => document.body.dataset.world || null,
  currentPageId,
  map: () => PAGE_TO_WORLD,
  has: (w) => WORLDS.includes(w),
  worlds: () => WORLDS,
  DEFAULT: DEFAULT_WORLD,
});

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  if (!window.Upg.world) window.Upg.world = surface;
}

export { set, setWorld, PAGE_TO_WORLD, WORLDS, DEFAULT_WORLD };
export default surface;
