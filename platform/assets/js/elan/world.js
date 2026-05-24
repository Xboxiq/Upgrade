/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — γ1 — World Controller (ESM)
   ────────────────────────────────────────────────────────────────────────
   Mirrors the active page → body[data-world]. The CSS :has() rules in
   worlds/_index.css activate the correct world without this script — JS
   is the *enhancement* that fires `upg:world:change` and survives nav
   events on browsers without :has() support.

   🏛 STRUCTURAL_BEACON: a world system whose substrate is CSS, not JS.
   The system reveals itself before the controller wakes.
   ────────────────────────────────────────────────────────────────────────
   Public API: window.Upg.world.{set, current, map, worlds, pageOf}
   Events    : document → 'upg:world:change' { detail: { world, pageId } }
   Listens to: 'upg:nav:change', 'upg:theme-change' (legacy bridge)
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

const VALID_WORLDS = Object.freeze([
  'hibr', 'naar', 'nada', 'hadeed', 'dhahab', 'tayyar', 'warsha', 'saloon',
]);

const LEGACY_THEME_MAP = Object.freeze({ light: 'hibr', dark: 'naar' });

const DEFAULT_WORLD = 'hibr';

/* ── helpers ─────────────────────────────────────────────────────────── */

function pageIdToWorld(pageId) {
  if (!pageId) return DEFAULT_WORLD;
  // Tolerant: accept 'dashboard' OR 'page-dashboard'
  const normalized = String(pageId).startsWith('page-') ? pageId : 'page-' + pageId;
  return WORLD_MAP[normalized] || DEFAULT_WORLD;
}

function applyWorld(world) {
  if (!VALID_WORLDS.includes(world)) return false;
  if (!document.body) return false;
  if (document.body.dataset.world === world) return false;
  document.body.dataset.world = world;
  try {
    document.dispatchEvent(new CustomEvent('upg:world:change', {
      detail: { world },
    }));
  } catch { /* event dispatch failure is non-fatal */ }
  return true;
}

function applyWorldWithTransition(world, pageId) {
  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !reduce) {
    try {
      document.startViewTransition(() => applyWorld(world));
      return true;
    } catch { /* fall through */ }
  }
  return applyWorld(world);
}

function getActivePageId() {
  // 1. Prefer Upg.nav state (W11 nav contract)
  try {
    const fromNav = window.Upg?.nav?.current?.();
    if (typeof fromNav === 'string' && fromNav.length > 0) {
      return fromNav.startsWith('page-') ? fromNav : 'page-' + fromNav;
    }
  } catch { /* continue to DOM fallback */ }

  // 2. DOM fallback — first .page that is .active / .is-active / [data-active]
  const active = document.querySelector(
    '.page.active, .page.is-active, .page[data-active="true"]'
  );
  return active?.id || 'page-dashboard';
}

function setFromPageId(pageId) {
  return applyWorldWithTransition(pageIdToWorld(pageId), pageId);
}

/* ── init ────────────────────────────────────────────────────────────── */

function init() {
  // Initial sync from whichever page is currently active
  setFromPageId(getActivePageId());

  // Nav event — main pathway (Upg.nav fires upg:nav:change on every page swap)
  document.addEventListener('upg:nav:change', (e) => {
    const pageId =
      e?.detail?.pageId ||
      e?.detail?.id ||
      e?.detail ||
      getActivePageId();
    setFromPageId(typeof pageId === 'string' ? pageId : getActivePageId());
  });

  // Legacy bridge — when v3 theme cycles, soft-set the world only when the
  // user hasn't already chosen a per-page world. Doesn't trample γ2-γ9.
  window.addEventListener('upg:theme-change', (e) => {
    const actual = e?.detail?.actual; // 'light' | 'dark'
    const legacyWorld = LEGACY_THEME_MAP[actual];
    if (!legacyWorld) return;
    const current = document.body?.dataset.world;
    // Only act on default/uninitialized state — a real page-driven world wins.
    if (!current) applyWorld(legacyWorld);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

/* ── public API ──────────────────────────────────────────────────────── */

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  if (!window.Upg.world) {
    window.Upg.world = Object.freeze({
      /** set('hibr') OR set('page-lab') OR set('lab') — all valid */
      set: (input) => {
        if (typeof input !== 'string') return false;
        if (VALID_WORLDS.includes(input)) return applyWorld(input);
        return setFromPageId(input);
      },
      current: () => document.body?.dataset.world || DEFAULT_WORLD,
      map: () => ({ ...WORLD_MAP }),
      worlds: () => [...VALID_WORLDS],
      pageOf: (pageId) => pageIdToWorld(pageId),
    });
  }
}

export { setFromPageId as setWorld, WORLD_MAP, VALID_WORLDS, DEFAULT_WORLD };
