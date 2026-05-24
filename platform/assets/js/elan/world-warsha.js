/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — γ8 — World 7: وَرشة (Warsha) JS module
   ────────────────────────────────────────────────────────────────────────
   The Warsha Beacon (🏛 STRUCTURAL — bench grid + hand-built skew) is
   pure CSS. This module owns ONLY the long-press *utility* for sensitive
   workshop actions (delete-ticket, return-stock, mark-irreparable).

   Long-press semantics:
     • pointerdown → start a 650ms hold; conic-gradient progress fills.
     • pointerup / leave / cancel BEFORE 650ms → cancel, snap to 0.
     • progress reaches 1.0 → fire `upg:longpress:fire` CustomEvent
       on the button, with bubbling so app-level handlers can route by
       data-action attribute.

   Optional feedback:
     • If navigator.vibrate is available → 8ms tap on press start,
       [12, 30, 12] triple-tap on fire. Silent on devices that lack it.
     • Respects prefers-reduced-motion: the conic ring still updates,
       but we skip the haptic vibration.

   Auto-engage on `upg:world:change → warsha`; auto-detach on world exit.
   Idempotent: rebinding the same button is a no-op (data-warsha-bound).

   Public API: window.Upg.worlds.warsha (sub-namespace under
   Upg.worlds — does NOT inflate the top-level Upg.* count).
   Sacred preserved: 15 page sections / 31 top-level Upg.* APIs / no
   inline styles / no !important.
   ─────────────────────────────────────────────────────────────────────── */

const SELECTOR  = '.btn-longpress';
const HOLD_MS   = 650;
const HAPTIC_TAP   = 8;
const HAPTIC_FIRE  = [12, 30, 12];

const tracking = new WeakMap(); /* btn → { raf, startedAt } */
let _wired = false;

function _reduceMotion() {
  return window.matchMedia &&
         window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function _vibrate(pattern) {
  if (_reduceMotion()) return;
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try { navigator.vibrate(pattern); } catch (_) { /* swallow */ }
  }
}

function _start(btn) {
  if (tracking.has(btn)) return;
  const startedAt = (typeof performance !== 'undefined' ? performance.now() : Date.now());
  btn.setAttribute('data-pressing', 'true');
  btn.style.setProperty('--press-progress', '0');

  const tick = () => {
    const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    const elapsed  = now - startedAt;
    const progress = Math.min(1, elapsed / HOLD_MS);
    btn.style.setProperty('--press-progress', progress.toFixed(3));
    if (progress >= 1) {
      _fire(btn);
      _stop(btn, false);
      return;
    }
    const id = requestAnimationFrame(tick);
    tracking.set(btn, { raf: id, startedAt });
  };

  const id = requestAnimationFrame(tick);
  tracking.set(btn, { raf: id, startedAt });
  _vibrate(HAPTIC_TAP);
}

function _stop(btn, cancelled = true) {
  const rec = tracking.get(btn);
  if (rec && rec.raf) cancelAnimationFrame(rec.raf);
  tracking.delete(btn);
  btn.removeAttribute('data-pressing');
  if (cancelled) btn.style.setProperty('--press-progress', '0');
}

function _fire(btn) {
  btn.classList.add('is-fired');
  _vibrate(HAPTIC_FIRE);
  btn.dispatchEvent(new CustomEvent('upg:longpress:fire', {
    bubbles: true,
    detail: {
      action: btn.getAttribute('data-action') || null,
      world: 'warsha',
    },
  }));
  setTimeout(() => {
    btn.classList.remove('is-fired');
    btn.style.setProperty('--press-progress', '0');
  }, 800);
}

function _onPointerDown(e) {
  const btn = e.target.closest(SELECTOR);
  if (!btn) return;
  /* Only inside Warsha — body attribute or ancestor section */
  if (document.body.dataset.world !== 'warsha' &&
      !btn.closest('[data-world="warsha"]')) return;
  e.preventDefault();
  if (btn.setPointerCapture) {
    try { btn.setPointerCapture(e.pointerId); } catch (_) {}
  }
  _start(btn);
}

function _onPointerEnd(e) {
  const btn = e.target.closest(SELECTOR);
  if (btn) _stop(btn, true);
}

function engage() {
  if (_wired) return;
  _wired = true;
  document.addEventListener('pointerdown',   _onPointerDown);
  document.addEventListener('pointerup',     _onPointerEnd);
  document.addEventListener('pointercancel', _onPointerEnd);
  document.addEventListener('pointerleave',  _onPointerEnd, true);
}

function disengage() {
  if (!_wired) return;
  _wired = false;
  document.removeEventListener('pointerdown',   _onPointerDown);
  document.removeEventListener('pointerup',     _onPointerEnd);
  document.removeEventListener('pointercancel', _onPointerEnd);
  document.removeEventListener('pointerleave',  _onPointerEnd, true);
}

/* Bench tidy toggle — pure attribute switch on body. Useful for screen-
   shots, prints, and accessibility audits (returns the layout to grid). */
function setBench(mode) {
  const value = mode === 'tidy' ? 'tidy' : 'workshop';
  if (value === 'workshop') document.body.removeAttribute('data-bench');
  else document.body.setAttribute('data-bench', 'tidy');
  document.dispatchEvent(new CustomEvent('upg:warsha:bench', { detail: { mode: value } }));
  return value;
}

function getBench() {
  return document.body.getAttribute('data-bench') === 'tidy' ? 'tidy' : 'workshop';
}

/* ── boot — engage if already in warsha, otherwise wait for world change */

function boot() {
  if (document.body && document.body.dataset.world === 'warsha') engage();
  document.addEventListener('upg:world:change', (e) => {
    const world = (e && e.detail && (e.detail.world || e.detail.to));
    if (world === 'warsha') engage();
    else                    disengage();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

/* Public surface */
const UpgWorldWarsha = Object.freeze({
  engage, disengage,
  setBench, getBench,
  HOLD_MS,
});

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  window.Upg.worlds = window.Upg.worlds || {};
  if (!window.Upg.worlds.warsha) window.Upg.worlds.warsha = UpgWorldWarsha;
}

export default UpgWorldWarsha;
