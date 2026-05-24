/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — γ1 — World Controller (ESM)
   ────────────────────────────────────────────────────────────────────────
   Listens to nav events, updates body[data-world] to match active page.
   Falls back to CSS :has() selector if JS is disabled.
   Registered as window.Upg.world (31st top-level Upg.* namespace).
   ════════════════════════════════════════════════════════════════════════ */

const WORLD_MAP = Object.freeze({
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

const WORLDS = Object.freeze(['hibr', 'naar', 'nada', 'hadeed', 'dhahab', 'tayyar', 'warsha', 'saloon']);
const DEFAULT_WORLD = 'hibr';

function setWorld(pageId) {
  const world = WORLD_MAP[pageId] || DEFAULT_WORLD;
  if (document.body.dataset.world === world) return false;

  if (
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    try {
      document.startViewTransition(() => { document.body.dataset.world = world; });
    } catch (_) {
      document.body.dataset.world = world;
    }
  } else {
    document.body.dataset.world = world;
  }

  document.dispatchEvent(
    new CustomEvent('upg:world:change', { detail: { world, pageId } })
  );
  return true;
}

function getActivePageId() {
  const fromNav = window.Upg?.nav?.current?.();
  if (fromNav) return fromNav;
  const active = document.querySelector('.page.active, .page.is-active, .page[data-active="true"]');
  return active?.id || 'page-dashboard';
}

function init() {
  setWorld(getActivePageId());

  document.addEventListener('upg:nav:change', (e) => {
    setWorld(e.detail?.pageId || getActivePageId());
  });

  window.addEventListener('hashchange', () => {
    const hash = location.hash.replace('#', '');
    const pageId = hash ? `page-${hash}` : getActivePageId();
    if (WORLD_MAP[pageId]) setWorld(pageId);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* Public API */
window.Upg = window.Upg || {};
window.Upg.world = Object.freeze({
  set: setWorld,
  current: () => document.body.dataset.world || DEFAULT_WORLD,
  map: () => ({ ...WORLD_MAP }),
  worlds: () => [...WORLDS],
  pageWorld: (pageId) => WORLD_MAP[pageId] || null,
});

export { setWorld, WORLD_MAP, WORLDS, DEFAULT_WORLD };
