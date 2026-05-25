/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — δ1 — Magnetic Sidebar (Pillar δ KINETIC SHELL / Stage 1 of 6)
   ────────────────────────────────────────────────────────────────────────
   🌊 MOTION_BEACON

   The Surprise: ONE sidebar element, EIGHT magnetic personalities.
   On desktop / fine pointer:  pointer position drives tilt.
   On touch + DeviceOrientation: phone tilt drives the same vars.
   The CSS layer (chrome.css δ1 block) maps each world's tokens into
   --magnet-tilt-max / --magnet-duration-rest / --magnet-ease-rest, so the
   same JS engine produces eight different physical responses depending on
   which world is active. iOS 13+ permission flow is asked unobtrusively
   via a small chip — only when actually needed.

   Reference Avoided:
     • Forbidden #13 — spring-bounce hover (we use gravity-settle, single
       half-cycle, declared as cubic-bezier(0.32, -0.04, 0.4, 1))
     • Forbidden #3  — floating-pill sidebar clone (we augment the existing
       material-chrome slab, do not introduce a pill nav)

   Inspired-by: Wild Card #2 — Iraqi Brutalism (Chadirji)

   Public surface (Upg.elan.sidebar — namespaced under Upg.elan, NOT
   crowding the original 14 sacred Upg.* APIs):
     • enable()       — manually attach (idempotent)
     • disable()      — manually detach + reset transforms
     • isActive()     — boolean
     • requestGyro()  — iOS 13+ DeviceOrientationEvent.requestPermission flow
     • config         — frozen { TILT_MAX_HARD_CAP, GYRO_DIVISOR_BETA, ... }

   Sacred preserved:
     • 17 .nav-item entries untouched (no re-render).
     • #sidebar markup intact except for the data-elan-magnetic="sidebar"
       data-attribute hook added in the same δ1 commit.
     • Reduced-motion users get a no-op (CSS guard + JS guard, belt+braces).
     • No new <svg viewBox> emitted; no emoji in DOM; iconography unchanged.
   ─────────────────────────────────────────────────────────────────────── */

const SELECTOR = '[data-elan-magnetic="sidebar"]';

/* Hard cap that NO world is allowed to exceed, regardless of token.
   Per WCAG SC 2.3.3 spirit + motion-sickness prevention. */
const TILT_MAX_HARD_CAP = 1.5;
const SHADOW_MAX_PX = 14;

/* Gyroscope sensitivity divisors (DeviceOrientationEvent in degrees):
   gamma is left-right tilt (~ -90..90); beta is front-back (~ -180..180). */
const GYRO_DIVISOR_GAMMA = 28;
const GYRO_DIVISOR_BETA  = 60;

/* Internal state — module-scoped, never leaks to globals. */
const state = {
  el: null,
  rafId: 0,
  attached: false,
  mode: null,            // 'pointer' | 'gyro' | null
  permitChip: null,
  gyroPermissionGranted: false,
  reducedMq: null,
  worldChangeBound: false,
  pointerActive: false,
  restTimer: 0,
};

const isReducedMotion = () =>
  typeof matchMedia === 'function' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;

const isFinePointer = () =>
  typeof matchMedia === 'function' &&
  matchMedia('(pointer: fine)').matches;

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0);

const hasDeviceOrientation = () =>
  typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;

const needsIosPermission = () =>
  hasDeviceOrientation() &&
  typeof window.DeviceOrientationEvent.requestPermission === 'function';

function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

function readMaxTiltFromCss(el) {
  /* Reads --magnet-tilt-max from the element's computed style. Falls back
     to 1.2deg if the var is missing. The hard cap then applies. */
  const v = getComputedStyle(el).getPropertyValue('--magnet-tilt-max').trim();
  if (!v) return 1.2;
  const n = parseFloat(v);
  return Number.isFinite(n) ? clamp(n, 0, TILT_MAX_HARD_CAP) : 1.2;
}

function writeTilt(x, y) {
  if (!state.el) return;
  if (state.rafId) return;
  state.rafId = requestAnimationFrame(() => {
    state.rafId = 0;
    if (!state.el) return;
    const max = readMaxTiltFromCss(state.el);
    const cx = clamp(x, -max, max);
    const cy = clamp(y, -max, max);
    state.el.style.setProperty('--tilt-x', cx.toFixed(2) + 'deg');
    state.el.style.setProperty('--tilt-y', cy.toFixed(2) + 'deg');
    /* Shadow follows tilt-x with a small phase shift, like a metal slab
       casting a sliding shadow as it leans. */
    const shadow = (cx / max) * SHADOW_MAX_PX;
    state.el.style.setProperty('--tilt-shadow', shadow.toFixed(1) + 'px');
  });
}

function markActive() {
  if (!state.el) return;
  state.el.setAttribute('data-magnet-state', 'active');
  state.pointerActive = true;
  if (state.restTimer) {
    clearTimeout(state.restTimer);
    state.restTimer = 0;
  }
}

function markResting() {
  if (!state.el) return;
  state.pointerActive = false;
  state.el.setAttribute('data-magnet-state', 'resting');
  /* Schedule cleanup of the resting attribute after the settle finishes,
     so subsequent tilts don't fight the resting transition timing. */
  if (state.restTimer) clearTimeout(state.restTimer);
  state.restTimer = setTimeout(() => {
    state.restTimer = 0;
    if (state.el && state.el.getAttribute('data-magnet-state') === 'resting') {
      state.el.removeAttribute('data-magnet-state');
    }
  }, 700);
}

/* ── Pointer handlers ────────────────────────────────────────────────── */

function onPointerMove(ev) {
  if (!state.el) return;
  if (ev.pointerType === 'touch') return; // touch handled by gyro
  const r = state.el.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const cx = (ev.clientX - r.left) / r.width  - 0.5; // -0.5..0.5
  const cy = (ev.clientY - r.top)  / r.height - 0.5;
  const max = readMaxTiltFromCss(state.el);
  if (!state.pointerActive) markActive();
  /* X tilt rotates around Y axis (rotateY) -> drives --tilt-x.
     Y tilt rotates around X axis (rotateX) -> drives --tilt-y inverted. */
  writeTilt(cx * max * 2, -cy * max * 2);
}

function onPointerLeave() {
  if (!state.el) return;
  markResting();
  writeTilt(0, 0);
}

/* ── Gyroscope handler ───────────────────────────────────────────────── */

function onDeviceOrientation(ev) {
  if (!state.el) return;
  if (ev == null) return;
  const gamma = typeof ev.gamma === 'number' ? ev.gamma : 0;
  const beta  = typeof ev.beta  === 'number' ? ev.beta  : 0;
  const tiltX = gamma / GYRO_DIVISOR_GAMMA;
  const tiltY = beta  / GYRO_DIVISOR_BETA;
  if (!state.pointerActive) markActive();
  writeTilt(tiltX, -tiltY);
  /* Restful idle if device hasn't moved — re-mark resting after 250ms. */
  if (state.restTimer) clearTimeout(state.restTimer);
  state.restTimer = setTimeout(markResting, 250);
}

/* ── Mode wiring ─────────────────────────────────────────────────────── */

function attachPointerMode() {
  if (!state.el) return;
  state.el.addEventListener('pointermove', onPointerMove, { passive: true });
  state.el.addEventListener('pointerleave', onPointerLeave);
  state.el.addEventListener('blur', onPointerLeave, true);
  state.mode = 'pointer';
}

function detachPointerMode() {
  if (!state.el) return;
  state.el.removeEventListener('pointermove', onPointerMove);
  state.el.removeEventListener('pointerleave', onPointerLeave);
  state.el.removeEventListener('blur', onPointerLeave, true);
}

function attachGyroMode() {
  window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
  state.mode = 'gyro';
}

function detachGyroMode() {
  window.removeEventListener('deviceorientation', onDeviceOrientation);
}

/* ── iOS permission chip (rendered only when needed) ─────────────────── */

function renderPermitChip() {
  if (!state.el) return;
  if (state.permitChip) return;
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'elan-magnet-permit';
  chip.setAttribute('aria-label', 'تفعيل استشعار حركة الجهاز للجانب المغناطيسي');
  /* Plain text only — NO emoji, NO inline SVG. Iconography Doctrine §٣.أ. */
  chip.textContent = 'اسمح بالحركة';
  chip.addEventListener('click', requestGyro);
  /* Position relative to the sidebar element; sidebar is positioned. */
  if (getComputedStyle(state.el).position === 'static') {
    state.el.style.position = 'relative';
  }
  state.el.appendChild(chip);
  state.permitChip = chip;
}

function removePermitChip() {
  if (!state.permitChip) return;
  state.permitChip.removeEventListener('click', requestGyro);
  if (state.permitChip.parentNode) state.permitChip.parentNode.removeChild(state.permitChip);
  state.permitChip = null;
}

async function requestGyro() {
  if (!hasDeviceOrientation()) return false;
  if (!needsIosPermission()) {
    state.gyroPermissionGranted = true;
    attachGyroMode();
    removePermitChip();
    return true;
  }
  try {
    const result = await window.DeviceOrientationEvent.requestPermission();
    if (result === 'granted') {
      state.gyroPermissionGranted = true;
      attachGyroMode();
      removePermitChip();
      return true;
    }
  } catch (_e) {
    /* Silenced — we never throw at the user. */
  }
  return false;
}

/* ── World-change observer ───────────────────────────────────────────── */

function onWorldChange() {
  /* When world changes, the CSS vars update automatically because they
     read from --duration-<world> / --ease-<world> declared per-world.
     We just nudge a settle so the slab re-anchors without an abrupt jump. */
  if (!state.el) return;
  markResting();
  writeTilt(0, 0);
}

function bindWorldChange() {
  if (state.worldChangeBound) return;
  document.addEventListener('upg:world:change', onWorldChange);
  state.worldChangeBound = true;
}

function unbindWorldChange() {
  if (!state.worldChangeBound) return;
  document.removeEventListener('upg:world:change', onWorldChange);
  state.worldChangeBound = false;
}

/* ── Reduced-motion live-toggle ──────────────────────────────────────── */

function onReducedMotionChange() {
  if (isReducedMotion()) {
    disable();
  } else if (!state.attached) {
    enable();
  }
}

function bindReducedMotionWatcher() {
  if (state.reducedMq) return;
  if (typeof matchMedia !== 'function') return;
  state.reducedMq = matchMedia('(prefers-reduced-motion: reduce)');
  if (state.reducedMq.addEventListener) {
    state.reducedMq.addEventListener('change', onReducedMotionChange);
  } else if (state.reducedMq.addListener) {
    /* Safari < 14 fallback. */
    state.reducedMq.addListener(onReducedMotionChange);
  }
}

/* ── Public API ──────────────────────────────────────────────────────── */

function enable() {
  if (state.attached) return true;
  if (isReducedMotion()) return false;
  const el = document.querySelector(SELECTOR);
  if (!el) return false;
  state.el = el;
  state.attached = true;
  bindWorldChange();

  /* Pointer mode is the safe default — attaches even on touch devices, in
     which case touch pointer events simply early-return inside handler. */
  attachPointerMode();

  /* Gyro mode — opt-in on iOS, auto on Android/desktop with sensors. */
  if (isTouchDevice() && hasDeviceOrientation()) {
    if (needsIosPermission()) {
      renderPermitChip();
    } else {
      attachGyroMode();
      state.gyroPermissionGranted = true;
    }
  }
  return true;
}

function disable() {
  if (!state.attached) return false;
  detachPointerMode();
  detachGyroMode();
  unbindWorldChange();
  removePermitChip();
  if (state.rafId) {
    cancelAnimationFrame(state.rafId);
    state.rafId = 0;
  }
  if (state.restTimer) {
    clearTimeout(state.restTimer);
    state.restTimer = 0;
  }
  if (state.el) {
    state.el.style.removeProperty('--tilt-x');
    state.el.style.removeProperty('--tilt-y');
    state.el.style.removeProperty('--tilt-shadow');
    state.el.removeAttribute('data-magnet-state');
  }
  state.el = null;
  state.attached = false;
  state.pointerActive = false;
  state.mode = null;
  state.gyroPermissionGranted = false;
  return true;
}

function isActive() {
  return state.attached;
}

const config = Object.freeze({
  TILT_MAX_HARD_CAP,
  SHADOW_MAX_PX,
  GYRO_DIVISOR_GAMMA,
  GYRO_DIVISOR_BETA,
  SELECTOR,
});

const api = Object.freeze({
  enable,
  disable,
  isActive,
  requestGyro,
  config,
});

/* ── Boot ────────────────────────────────────────────────────────────── */

function boot() {
  bindReducedMotionWatcher();
  enable();
}

if (typeof window !== 'undefined') {
  /* Namespace under Upg.elan.sidebar — does NOT add a 15th top-level
     Upg.* surface. Backward-compat is preserved. */
  window.Upg = window.Upg || {};
  window.Upg.elan = window.Upg.elan || {};
  window.Upg.elan.sidebar = api;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}

export default api;
export { enable, disable, isActive, requestGyro, config };
