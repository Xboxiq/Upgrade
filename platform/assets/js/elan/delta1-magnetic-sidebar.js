/**
 * ÊLAN v4 — δ1 — Magnetic Sidebar
 * Pillar δ (KINETIC SHELL), Stage 1/6
 *
 * Desktop: pointer-tracked 3D tilt (perspective + rotateX/Y)
 * Mobile:  DeviceOrientationEvent gyroscope tilt (physical lean)
 * Both capped at ±1.5deg. rAF-throttled. Reduced-motion aware.
 *
 * Beacon: 🌊 MOTION_BEACON — gyroscope-driven sidebar on mobile
 */
;(function ElanDelta1MagneticSidebar() {
  'use strict';

  const TILT_MAX = 1.5;        // degrees
  const SHADOW_MAX = 10;       // px offset at max tilt
  const GYRO_DIVISOR_GAMMA = 20; // device gamma → tilt-x sensitivity
  const GYRO_DIVISOR_BETA = 40;  // device beta → tilt-y sensitivity

  let sidebar = null;
  let rafPending = false;
  let isTouch = false;
  let reducedMotion = false;

  /* ── Detect environment ─────────────────────────────────────────────── */
  const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion = mqReduced.matches;
  mqReduced.addEventListener('change', e => {
    reducedMotion = e.matches;
    if (reducedMotion) resetTilt();
  });

  /* ── Core tilt application (rAF-throttled) ──────────────────────────── */
  function applyTilt(x, y) {
    if (reducedMotion || !sidebar) return;
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      if (!sidebar) return;
      const clampX = Math.max(-TILT_MAX, Math.min(TILT_MAX, x));
      const clampY = Math.max(-TILT_MAX, Math.min(TILT_MAX, y));
      sidebar.style.setProperty('--tilt-x', clampX.toFixed(3) + 'deg');
      sidebar.style.setProperty('--tilt-y', clampY.toFixed(3) + 'deg');
      sidebar.style.setProperty('--tilt-shadow-offset', (clampX * SHADOW_MAX / TILT_MAX).toFixed(1) + 'px');
      if (!sidebar.hasAttribute('data-tilt-active')) {
        sidebar.setAttribute('data-tilt-active', '');
      }
    });
  }

  function resetTilt() {
    if (!sidebar) return;
    sidebar.style.setProperty('--tilt-x', '0deg');
    sidebar.style.setProperty('--tilt-y', '0deg');
    sidebar.style.setProperty('--tilt-shadow-offset', '0px');
    sidebar.removeAttribute('data-tilt-active');
  }

  /* ── Desktop: pointer tracking ──────────────────────────────────────── */
  function onPointerMove(e) {
    if (!sidebar) return;
    const r = sidebar.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;  // -0.5 … +0.5
    const cy = (e.clientY - r.top) / r.height - 0.5;
    applyTilt(cx * TILT_MAX * 2, -cy * TILT_MAX * 2);
  }

  function onPointerLeave() {
    resetTilt();
  }

  /* ── Mobile: DeviceOrientationEvent (gyroscope) ─────────────────────── */
  function onDeviceOrientation(e) {
    if (!sidebar) return;
    // gamma: left-right tilt (-90..90) → maps to X axis
    // beta: front-back tilt (-180..180) → maps to Y axis
    const tiltX = (e.gamma || 0) / GYRO_DIVISOR_GAMMA;
    const tiltY = (e.beta || 0) / GYRO_DIVISOR_BETA;
    applyTilt(tiltX, -tiltY);
  }

  async function requestGyroPermission() {
    // iOS 13+ requires explicit permission
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceOrientationEvent.requestPermission();
        return perm === 'granted';
      } catch (_) {
        return false;
      }
    }
    return true; // Android/non-iOS: no permission needed
  }

  /* ── Initialization ─────────────────────────────────────────────────── */
  function init() {
    sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (reducedMotion) return;

    isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouch && typeof DeviceOrientationEvent !== 'undefined') {
      // Mobile: use gyroscope
      requestGyroPermission().then(granted => {
        if (granted) {
          window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
        }
      });
      // Also allow pointer for tablets with stylus
      sidebar.addEventListener('pointermove', onPointerMove, { passive: true });
      sidebar.addEventListener('pointerleave', onPointerLeave);
    } else {
      // Desktop: pointer only
      sidebar.addEventListener('pointermove', onPointerMove, { passive: true });
      sidebar.addEventListener('pointerleave', onPointerLeave);
    }
  }

  /* ── Lifecycle ──────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-acquire sidebar if DOM rebuilt
  document.addEventListener('upg:nav:change', () => {
    if (!sidebar || !document.contains(sidebar)) {
      sidebar = document.getElementById('sidebar');
    }
  });

  // Expose minimal API on Upg namespace
  if (!window.Upg) window.Upg = {};
  if (!window.Upg.chrome) window.Upg.chrome = {};
  window.Upg.chrome.sidebar = Object.freeze({
    resetTilt: resetTilt,
    isTiltActive: () => sidebar?.hasAttribute('data-tilt-active') ?? false,
    isGyroEnabled: () => isTouch && typeof DeviceOrientationEvent !== 'undefined'
  });

})();
