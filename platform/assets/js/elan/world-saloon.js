/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — γ9 — World 8: صَالون (Saloon) JS module — closes Pillar γ
   ────────────────────────────────────────────────────────────────────────
   🪞 META_BEACON — "The Salon Mirror"

   Behaviour:
     • On entering the Saloon world (page-hrmastery / page-accountmgr),
       inject a single `.saloon-mirror` div as the first child of the
       active page section.
     • The mirror displays the most recent creativity beacon:
         «آخر لقاء في الصالون: <id> · <world> — <surprise>»
       Reads from localStorage['upg_last_beacon']; falls back to the
       γ8-seeded baseline (the one being committed alongside this file).
     • Updates live when any module calls
       `Upg.worlds.saloon.setLastBeacon({ id, world, surprise })`.
     • Idempotent: re-entering Saloon does not duplicate the ribbon.
     • Auto-dismantles itself when the user navigates to a non-Saloon
       world.

   Disclaimer guards (no Forbidden Library violations):
     – never says "Powered by AI" or "Welcome back, Name"
     – never uses emoji in markup (Iconography Doctrine § ٣.أ)
     – the dot indicator is a CSS pseudo-element, not an SVG or emoji.

   Public API: window.Upg.worlds.saloon
     - setLastBeacon({ id, world, surprise })  → updates mirror, persists
     - getLastBeacon()                         → returns the cached object
     - mountMirror() / unmountMirror()         → manual control
     - DEFAULT_BEACON                          → frozen seed object
   Sacred preserved: 15 page sections / 31 top-level Upg.* APIs.
   ─────────────────────────────────────────────────────────────────────── */

const STORAGE_KEY = 'upg_last_beacon';
const MIRROR_CLASS = 'saloon-mirror';
const SALOON_PAGES = ['page-hrmastery', 'page-accountmgr'];

const DEFAULT_BEACON = Object.freeze({
  id: 'γ8',
  world: 'وَرشة',
  surprise: 'مَقعَد البِناء اليدوي',
});

let _lastSeen = null;

/* ── storage helpers ─────────────────────────────────────────────────── */

function _read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (obj && typeof obj === 'object' && obj.id) return obj;
    return null;
  } catch (_) {
    return null;
  }
}

function _write(obj) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }
  catch (_) { /* private mode / disabled — silent */ }
}

function getLastBeacon() {
  return _read() || DEFAULT_BEACON;
}

function setLastBeacon(input) {
  if (!input || typeof input !== 'object' || !input.id) return false;
  const sanitized = {
    id:       String(input.id).slice(0, 8),
    world:    String(input.world    || '').slice(0, 24),
    surprise: String(input.surprise || '').slice(0, 120),
  };
  _write(sanitized);
  _lastSeen = sanitized;
  document.dispatchEvent(new CustomEvent('upg:beacon:logged', { detail: sanitized }));
  _renderMirror();
  return true;
}

/* ── DOM injection ───────────────────────────────────────────────────── */

function _activeSaloonPage() {
  for (const id of SALOON_PAGES) {
    const node = document.getElementById(id);
    if (node && (node.classList.contains('active') || node.classList.contains('is-active'))) {
      return node;
    }
  }
  /* Fallback: any visible page that carries data-world="saloon" */
  const candidate = document.querySelector(
    'section.page.active[data-world="saloon"], section.page.is-active[data-world="saloon"]'
  );
  return candidate || null;
}

function _renderMirror() {
  const page = _activeSaloonPage();
  if (!page) return;
  let mirror = page.querySelector(':scope > .' + MIRROR_CLASS);
  if (!mirror) {
    mirror = document.createElement('div');
    mirror.className = MIRROR_CLASS;
    mirror.setAttribute('role', 'note');
    mirror.setAttribute('aria-live', 'polite');
    mirror.setAttribute('aria-label', 'آخر إبداع في الصالون');
    page.prepend(mirror);
  }

  const stored = _read();
  const beacon = stored || DEFAULT_BEACON;
  mirror.toggleAttribute('data-empty', !stored);

  /* Compose textually — never emoji, never inline SVG. */
  mirror.replaceChildren(
    _span('saloon-mirror-prefix', stored ? 'آخر لقاء في الصالون:' : 'في الصالون:'),
    _span('saloon-mirror-id', beacon.id),
    _span('saloon-mirror-sep', '·'),
    _span('saloon-mirror-world', beacon.world || ''),
    _span('saloon-mirror-em', beacon.surprise ? ' — ' + beacon.surprise : ' — أول لقاء'),
  );
}

function _span(cls, text) {
  const s = document.createElement('span');
  s.className = cls;
  s.textContent = text;
  return s;
}

function mountMirror() {
  if (document.body && document.body.dataset.world === 'saloon') {
    _renderMirror();
  }
}

function unmountMirror() {
  for (const id of SALOON_PAGES) {
    const page = document.getElementById(id);
    if (!page) continue;
    const mirror = page.querySelector(':scope > .' + MIRROR_CLASS);
    if (mirror) mirror.remove();
  }
}

/* ── boot + world-change wiring ──────────────────────────────────────── */

function _onWorldChange(e) {
  const world = e && e.detail && (e.detail.world || e.detail.to);
  if (world === 'saloon') {
    /* Defer one frame so any `.page.active` toggle is committed first. */
    requestAnimationFrame(mountMirror);
  } else {
    unmountMirror();
  }
}

function _onPageShown() {
  if (document.body && document.body.dataset.world === 'saloon') {
    requestAnimationFrame(mountMirror);
  }
}

function boot() {
  document.addEventListener('upg:world:change', _onWorldChange);
  /* Belt-and-braces — legacy nav bus */
  window.addEventListener('upg:page-shown', _onPageShown);
  document.addEventListener('upg:nav:change', _onPageShown);
  /* Initial mount if already in Saloon */
  if (document.body && document.body.dataset.world === 'saloon') {
    requestAnimationFrame(mountMirror);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

/* ── public surface ──────────────────────────────────────────────────── */

const UpgWorldSaloon = Object.freeze({
  setLastBeacon,
  getLastBeacon,
  mountMirror,
  unmountMirror,
  DEFAULT_BEACON,
});

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  window.Upg.worlds = window.Upg.worlds || {};
  if (!window.Upg.worlds.saloon) window.Upg.worlds.saloon = UpgWorldSaloon;
}

export default UpgWorldSaloon;
