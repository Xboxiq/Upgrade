/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-touch-1.js
   Worker 24 / Phase 3-4 — Swipe Gestures + Haptic Layer.
   Side-effect module — importing this file runs the IIFE once.

   Worker 24 / Phase 3 — Swipe Discipline:
     1. PointerEvents only (modern). TouchEvents intentionally excluded.
     2. Threshold = 60 px + velocity ≥ 0.3 px/ms + duration ≤ 600 ms.
     3. Mobile-only — gated by `(max-width: 720px)`.
     4. RTL-aware: in Arabic (document.dir === 'rtl'), swipe LEFT navigates
        to the PREVIOUS page (matches reading-direction expectation), swipe
        RIGHT navigates to the NEXT page.
     5. Mouse drag excluded — desktop relies on sidebar / cmdk / keyboard.
     6. No external library. Vanilla pointerdown/pointerup math only.
     7. Reduced-motion respected on dismiss-swipe (it is a behaviour, not
        motion — but page-swipe relies on whatever transition the navigation
        layer provides; nothing is added here).
     8. 3 variants:
          a) page-swipe   — horizontal on `#main` → next/previous page.
          b) calc-swipe   — horizontal on `.qcalc` → upg:calc:next/prev event.
          c) dismiss-swipe — vertical down on body → exits Reading Halo (W22 P2).

   Worker 24 / Phase 4 — Haptic Discipline:
     1. opt-in only — localStorage.upg_touch_haptic_enabled = '1'.
     2. ٥ patterns ثابتة — لا تَخلق pattern جديد (tap/success/warn/error/longpress).
     3. Vibration API check قبل كل call (silent no-op on iOS Safari etc.).
     4. Debounce 200 ms — لا spam.
     5. Mouse / pen events لا تُفعّل haptic — pointerType === 'touch' فقط.
     6. لو navigator.vibrate غير موجود, API يَعمل no-op silently — never throws.
     7. Toggle UI mobile-only — `[data-haptic-toggle]` يَنقلب الحالة في localStorage.
     8. Body[data-haptic-enabled="true|false"] يَعكس الحالة للـ CSS.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  if (window.Upg && window.Upg.touch) return; // idempotent guard

  // ── Tunables ─────────────────────────────────────────────────────────
  var SWIPE_THRESHOLD_PX = 60;
  var SWIPE_VELOCITY_MIN = 0.3;  // px / ms
  var SWIPE_TIME_MAX     = 600;  // ms
  var MOBILE_MAX_WIDTH   = 720;

  // 15 ids matching Upg.shards.list() order — page-swipe walks this array.
  var PAGE_ORDER = Object.freeze([
    'dashboard',
    'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery',
    'myprogress'
  ]);

  // ── Environment probes ───────────────────────────────────────────────
  function isMobile() {
    return window.matchMedia('(max-width: ' + MOBILE_MAX_WIDTH + 'px)').matches;
  }

  function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ── Shared swipe detector ────────────────────────────────────────────
  function attachSwipe(element, options) {
    if (!element) return function () {};
    options = options || {};
    var onLeft  = typeof options.onSwipeLeft  === 'function' ? options.onSwipeLeft  : null;
    var onRight = typeof options.onSwipeRight === 'function' ? options.onSwipeRight : null;
    var onUp    = typeof options.onSwipeUp    === 'function' ? options.onSwipeUp    : null;
    var onDown  = typeof options.onSwipeDown  === 'function' ? options.onSwipeDown  : null;
    var direction = options.direction || 'all';   // 'horizontal' | 'vertical' | 'all'
    var enabledFn = typeof options.enabledFn === 'function' ? options.enabledFn : function () { return true; };
    var allowMouse = options.allowMouse === true;

    var startX = 0, startY = 0, startT = 0;
    var pointerId = -1;
    var pointerActive = false;

    function onPointerDown(e) {
      if (!enabledFn()) return;
      if (!allowMouse && e.pointerType === 'mouse') return;
      pointerActive = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startT = Date.now();
    }

    function onPointerUp(e) {
      if (!pointerActive) return;
      if (e.pointerId !== pointerId) return;
      pointerActive = false;

      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      var dt = Math.max(1, Date.now() - startT);
      if (dt > SWIPE_TIME_MAX) return;

      var absX = Math.abs(dx);
      var absY = Math.abs(dy);
      var v = Math.max(absX, absY) / dt;
      if (v < SWIPE_VELOCITY_MIN) return;

      if (direction !== 'vertical' && absX > SWIPE_THRESHOLD_PX && absX > absY) {
        if (dx > 0 && onRight) onRight(e);
        else if (dx < 0 && onLeft) onLeft(e);
      } else if (direction !== 'horizontal' && absY > SWIPE_THRESHOLD_PX && absY > absX) {
        if (dy > 0 && onDown) onDown(e);
        else if (dy < 0 && onUp) onUp(e);
      }
    }

    function onPointerCancel() { pointerActive = false; }

    element.addEventListener('pointerdown',   onPointerDown,   { passive: true });
    element.addEventListener('pointerup',     onPointerUp,     { passive: true });
    element.addEventListener('pointercancel', onPointerCancel, { passive: true });

    return function detach() {
      element.removeEventListener('pointerdown',   onPointerDown);
      element.removeEventListener('pointerup',     onPointerUp);
      element.removeEventListener('pointercancel', onPointerCancel);
    };
  }

  // ── Helpers ──────────────────────────────────────────────────────────
  function getActivePageId() {
    var active = document.querySelector('section.page.active') ||
                 document.querySelector('section.page:not([hidden])');
    if (!active || !active.id) return null;
    return active.id.replace(/^page-/, '');
  }

  function navigateToPage(pageId) {
    if (!pageId) return false;
    // Preferred — legacy navigateTo handles the inline page show/hide.
    if (typeof window.navigateTo === 'function') {
      try { window.navigateTo(pageId); return true; }
      catch (e) { /* fall through */ }
    }
    // Fallback — Upg.shards.mountShard (will refuse while inline copies present).
    if (window.Upg && window.Upg.shards && typeof window.Upg.shards.mountShard === 'function') {
      try { window.Upg.shards.mountShard(pageId); return true; }
      catch (e) { /* swallowed */ }
    }
    return false;
  }

  // ── Variant 1 — Page-Swipe ───────────────────────────────────────────
  var pageSwipeDetach = null;

  function setupPageSwipe() {
    var host = document.getElementById('main');
    if (!host) return;
    if (pageSwipeDetach) { try { pageSwipeDetach(); } catch (e) {} pageSwipeDetach = null; }

    function nextPage() {
      var id = getActivePageId();
      if (!id) return;
      var idx = PAGE_ORDER.indexOf(id);
      if (idx < 0 || idx === PAGE_ORDER.length - 1) return;
      navigateToPage(PAGE_ORDER[idx + 1]);
    }
    function prevPage() {
      var id = getActivePageId();
      if (!id) return;
      var idx = PAGE_ORDER.indexOf(id);
      if (idx <= 0) return;
      navigateToPage(PAGE_ORDER[idx - 1]);
    }

    pageSwipeDetach = attachSwipe(host, {
      direction: 'horizontal',
      enabledFn: function () { return isMobile(); },
      // RTL: swipe LEFT = previous (the previous page is "to the left" in
      // reading-direction); swipe RIGHT = next. LTR: opposite.
      onSwipeLeft:  function () { (document.dir === 'rtl' ? prevPage : nextPage)(); },
      onSwipeRight: function () { (document.dir === 'rtl' ? nextPage : prevPage)(); }
    });
  }

  // ── Variant 2 — Calc-Swipe ───────────────────────────────────────────
  var calcDetachers = [];

  function setupCalcSwipe() {
    while (calcDetachers.length) {
      var d = calcDetachers.pop();
      try { d(); } catch (e) {}
    }
    // Bind on the qcalc root (the wrapping element) — not nested children, to
    // avoid double-firing. `[data-qcalc-group]` is forward-compat for any
    // explicit group host.
    var calcs = document.querySelectorAll('.qcalc, [data-qcalc-group]');
    calcs.forEach(function (calc) {
      // Skip nested .qcalc inside another .qcalc (only the outermost binds).
      if (!calc.matches('[data-qcalc-group]')) {
        var outer = calc.parentElement && calc.parentElement.closest('.qcalc');
        if (outer) return;
      }
      var detach = attachSwipe(calc, {
        direction: 'horizontal',
        enabledFn: function () { return isMobile(); },
        onSwipeLeft:  function () {
          calc.dispatchEvent(new CustomEvent('upg:calc:next', { bubbles: true }));
        },
        onSwipeRight: function () {
          calc.dispatchEvent(new CustomEvent('upg:calc:prev', { bubbles: true }));
        }
      });
      calcDetachers.push(detach);
    });
  }

  // ── Variant 3 — Dismiss-Swipe (Reading Halo from W22 P2) ─────────────
  var dismissDetach = null;

  function setupDismissSwipe() {
    if (dismissDetach) { try { dismissDetach(); } catch (e) {} dismissDetach = null; }
    if (!document.body) return;
    dismissDetach = attachSwipe(document.body, {
      direction: 'vertical',
      enabledFn: function () {
        if (!isMobile()) return false;
        if (!window.Upg || !window.Upg.ritual) return false;
        return typeof window.Upg.ritual.isHaloActive === 'function' &&
               window.Upg.ritual.isHaloActive();
      },
      onSwipeDown: function () {
        if (window.Upg && window.Upg.ritual && typeof window.Upg.ritual.exitHalo === 'function') {
          window.Upg.ritual.exitHalo();
        }
      }
    });
  }

  // ════════════════════════════════════════════════════════════════════
  // Worker 24 / Phase 4 — Haptic Layer (Vibration API, 5 patterns)
  // ════════════════════════════════════════════════════════════════════

  var STORAGE_HAPTIC_KEY  = 'upg_touch_haptic_enabled';
  var HAPTIC_DEBOUNCE_MS  = 200;
  var LONG_PRESS_DELAY_MS = 500;

  // 5 fixed patterns. لا تَخلق pattern جديد — هذي اللُغة كاملة.
  var HAPTIC_PATTERNS = Object.freeze({
    tap:       Object.freeze([10]),
    success:   Object.freeze([15, 50, 15]),
    warn:      Object.freeze([40, 30, 40]),
    error:     Object.freeze([80, 50, 80, 50, 80]),
    longpress: Object.freeze([25, 40, 25, 40, 25])
  });

  var lastHapticAt = 0;
  var hapticAttached = false;
  var longPressTimer = null;

  function isHapticSupported() {
    return typeof navigator !== 'undefined' &&
           typeof navigator.vibrate === 'function';
  }

  function isHapticEnabled() {
    try { return window.localStorage && localStorage.getItem(STORAGE_HAPTIC_KEY) === '1'; }
    catch (e) { return false; }
  }

  function syncHapticBodyAttr() {
    if (!document.body) return;
    document.body.setAttribute('data-haptic-enabled', isHapticEnabled() ? 'true' : 'false');
  }

  function setHapticEnabled(on) {
    try {
      if (window.localStorage) {
        if (on) localStorage.setItem(STORAGE_HAPTIC_KEY, '1');
        else    localStorage.removeItem(STORAGE_HAPTIC_KEY);
      }
    } catch (e) { /* swallow — private mode etc. */ }
    syncHapticBodyAttr();
    // Fire signal for any listeners (e.g., toggle UI re-render).
    try {
      document.dispatchEvent(new CustomEvent('upg:haptic:change', {
        bubbles: true,
        detail: { enabled: !!on }
      }));
    } catch (e) { /* old browsers: ignore */ }
  }

  function triggerHaptic(patternId) {
    if (!isHapticSupported() || !isHapticEnabled()) return false;

    var pattern = HAPTIC_PATTERNS[patternId];
    if (!pattern) {
      try { console.warn('[Upg.touch.haptic] Unknown pattern:', patternId); } catch (e) {}
      return false;
    }

    var now = Date.now();
    if (now - lastHapticAt < HAPTIC_DEBOUNCE_MS) return false;
    lastHapticAt = now;

    try { navigator.vibrate(pattern.slice()); } catch (e) { return false; }
    return true;
  }

  function listHapticPatterns() { return Object.keys(HAPTIC_PATTERNS); }

  function getHapticPattern(id) {
    return HAPTIC_PATTERNS[id] ? HAPTIC_PATTERNS[id].slice() : null;
  }

  // ─── Auto-trigger on existing platform events ────────────────────────

  function attachAutoHaptic() {
    if (hapticAttached) return;
    hapticAttached = true;

    // Tap on bottom nav items (mobile primary navigation, P2 W24).
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest && e.target.closest('.dual-bottom-nav-item');
      if (t) triggerHaptic('tap');
    }, { passive: true });

    // Success — Reading Halo enter (Cmd+. or Ctrl+. — W22 P2).
    document.addEventListener('keydown', function (e) {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key !== '.') return;
      // Trigger after halo activation has settled.
      setTimeout(function () {
        if (window.Upg && window.Upg.ritual &&
            typeof window.Upg.ritual.isHaloActive === 'function' &&
            window.Upg.ritual.isHaloActive()) {
          triggerHaptic('success');
        }
      }, 100);
    });

    // Domain events — qcalc + warnings.
    document.addEventListener('upg:calc:complete', function () { triggerHaptic('success'); });
    document.addEventListener('upg:calc:error',    function () { triggerHaptic('error');   });
    document.addEventListener('upg:warning',       function () { triggerHaptic('warn');    });

    // Long-press — only true touch (excludes mouse + pen).
    document.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch') return;
      if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
      longPressTimer = setTimeout(function () {
        triggerHaptic('longpress');
        longPressTimer = null;
      }, LONG_PRESS_DELAY_MS);
    }, { passive: true });

    function cancelLongPress() {
      if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    }
    document.addEventListener('pointerup',     cancelLongPress, { passive: true });
    document.addEventListener('pointercancel', cancelLongPress, { passive: true });
    document.addEventListener('pointermove',   function (e) {
      // Cancel long-press on noticeable drag (so swipe gestures don't double-fire).
      if (longPressTimer && e.pointerType === 'touch') {
        cancelLongPress();
      }
    }, { passive: true });
  }

  // ─── Toggle button delegation ────────────────────────────────────────

  function setupHapticToggle() {
    syncHapticBodyAttr();

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest && e.target.closest('[data-haptic-toggle]');
      if (!btn) return;

      var wasEnabled = isHapticEnabled();
      setHapticEnabled(!wasEnabled);

      // Reflect on the button itself for screen-reader / styling.
      btn.setAttribute('aria-pressed', !wasEnabled ? 'true' : 'false');

      // Confirmation pulse — only on transition off→on, after debounce window.
      if (!wasEnabled && isHapticSupported()) {
        setTimeout(function () { triggerHaptic('success'); }, HAPTIC_DEBOUNCE_MS + 20);
      }
    });
  }

  // ── Audit ────────────────────────────────────────────────────────────
  function audit() {
    return {
      mobile:        isMobile(),
      reducedMotion: isReducedMotion(),
      direction:     document.dir || 'ltr',
      pageOrder:     PAGE_ORDER.slice(),
      listenersAttached: {
        pageSwipe:    !!pageSwipeDetach,
        calcSwipe:    calcDetachers.length,
        dismissSwipe: !!dismissDetach,
        haptic:       hapticAttached
      },
      haptic: {
        supported:    isHapticSupported(),
        enabled:      isHapticEnabled(),
        patterns:     listHapticPatterns(),
        debounceMs:   HAPTIC_DEBOUNCE_MS,
        longPressMs:  LONG_PRESS_DELAY_MS
      },
      config: {
        threshold:   SWIPE_THRESHOLD_PX,
        velocityMin: SWIPE_VELOCITY_MIN,
        timeMax:     SWIPE_TIME_MAX,
        mobileBreak: MOBILE_MAX_WIDTH
      },
      phase: 'worker-24-phase-4'
    };
  }

  // ── Boot ─────────────────────────────────────────────────────────────
  function boot() {
    setupPageSwipe();
    setupCalcSwipe();
    setupDismissSwipe();
    // W24 P4 — haptic layer (graceful no-op if Vibration API absent).
    attachAutoHaptic();
    setupHapticToggle();
  }

  if (document.readyState !== 'loading') {
    boot();
  } else {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  }

  // Re-attach calc/dismiss-swipe on page navigation (the qcalc DOM differs
  // per page; halo target may also change).
  document.addEventListener('upg:nav:change', function () {
    setTimeout(function () {
      setupCalcSwipe();
      setupDismissSwipe();
    }, 50);
  });

  // ── Public surface (frozen) ──────────────────────────────────────────
  window.Upg = window.Upg || {};
  window.Upg.touch = Object.freeze({
    attachSwipe: attachSwipe,
    audit:       audit,
    PAGE_ORDER:  PAGE_ORDER.slice(),
    config: Object.freeze({
      threshold:   SWIPE_THRESHOLD_PX,
      velocityMin: SWIPE_VELOCITY_MIN,
      timeMax:     SWIPE_TIME_MAX,
      mobileBreak: MOBILE_MAX_WIDTH
    }),
    refresh: function () { boot(); },
    // W24 P4 — Haptic Layer (sub-namespace, opt-in, 5 patterns).
    haptic: Object.freeze({
      enable:      function () { setHapticEnabled(true);  },
      disable:     function () { setHapticEnabled(false); },
      toggle:      function () { setHapticEnabled(!isHapticEnabled()); },
      isEnabled:   isHapticEnabled,
      isSupported: isHapticSupported,
      trigger:     triggerHaptic,
      list:        listHapticPatterns,
      pattern:     getHapticPattern,
      PATTERNS:    HAPTIC_PATTERNS,
      DEBOUNCE_MS: HAPTIC_DEBOUNCE_MS
    })
  });
})(window, document);
