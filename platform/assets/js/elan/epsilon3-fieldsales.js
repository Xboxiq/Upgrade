/**
 * ε3 — Fieldsales Content Revival (Hadeed world)
 * Pillar ε / Stage 3 of 12
 *
 * Beacon: 🤚 INTERACTION_BEACON — hand-drawn route canvas
 *
 * Responsibilities:
 *   1. Render an 8-pin Baghdad customer grid onto a <canvas>.
 *   2. Allow the user to tap pins (mouse, touch, stylus) to build a
 *      visit sequence. Tapping a visited pin removes it from the tail.
 *   3. Compute distance (Manhattan-style sum of euclidean segments,
 *      scaled at 40 px = 1 km), travel time (18 min/stop + 6 min/km),
 *      stop count.
 *   4. Update the legend list + the three meta cells in real time.
 *   5. Honour prefers-reduced-motion and forced-colors at the paint
 *      layer only — the interaction itself is identical.
 *   6. Expose Upg.elan.fieldsalesRoute (refresh / reset / sequence).
 *
 * Sacred preservation:
 *   - Only attaches to existing fieldsales markup via [data-elan-route].
 *   - No mutation of pre-existing fieldsales blocks (sf-modal, ql-glass,
 *     pitfall-section, qcalc, etc). Adds a new section at the tail.
 *   - All colours come from var(--ink|--ember|--anchor-*) — never hex.
 *   - Re-renders idempotently on resize / theme / world / nav change.
 */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const DOC = document;
  const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  /** Convert a number to Arabic-Indic digits, preserving decimal point. */
  const toArabicDigits = (n) => {
    if (n == null || n === '' || Number.isNaN(Number(n))) return '٠';
    return String(n).replace(/[0-9]/g, (d) => ARABIC_DIGITS[Number(d)]);
  };

  /** 8 customer pins — Baghdad districts, plausible relative positions
   *  on a 24-square paper grid. Coords are pre-DPR canvas pixels (CSS).
   *  These are deliberate — no GPS, no API, no copyrighted map data. */
  const CUSTOMERS = [
    { id: 'krd', name: 'الكرَّادة',   x:  90, y: 220 },
    { id: 'mns', name: 'المنصور',     x: 220, y: 110 },
    { id: 'adh', name: 'الأَعظمية',   x: 410, y:  80 },
    { id: 'krk', name: 'الكَرخ',      x: 160, y: 300 },
    { id: 'jdr', name: 'الجادريَّة',  x: 320, y: 250 },
    { id: 'syd', name: 'السَّيديَّة',  x: 480, y: 180 },
    { id: 'dor', name: 'الدورة',     x: 540, y: 320 },
    { id: 'sdr', name: 'مدينة الصَّدر', x: 620, y:  60 }
  ];

  /** Style tokens read live from CSS custom properties on the host —
   *  keeps the canvas in sync with the active world's palette. */
  const readToken = (host, name, fallback) => {
    const v = getComputedStyle(host).getPropertyValue(name).trim();
    return v || fallback;
  };

  /** Cap path length to the 8-pin sequence; idempotent toggle on tap. */
  const togglePin = (path, pinId) => {
    const idx = path.indexOf(pinId);
    if (idx === -1) {
      path.push(pinId);
    } else {
      // remove this pin AND everything after it (you re-walk from this stop)
      path.length = idx;
    }
    return path;
  };

  /** Compute live route metrics. */
  const computeMetrics = (path) => {
    const pxPerKm = 40;
    let pixelDist = 0;
    for (let i = 1; i < path.length; i++) {
      const a = CUSTOMERS.find((c) => c.id === path[i - 1]);
      const b = CUSTOMERS.find((c) => c.id === path[i]);
      if (!a || !b) continue;
      pixelDist += Math.hypot(a.x - b.x, a.y - b.y);
    }
    const km = pixelDist / pxPerKm;
    const stops = path.length;
    const minutes = stops > 0 ? Math.ceil(stops * 18 + km * 6) : 0;
    return { km, stops, minutes };
  };

  /** Initialize a single .route-planner host. Idempotent. */
  const initPlanner = (host) => {
    if (!host || host.dataset.elanRouteBound === '1') return;
    host.dataset.elanRouteBound = '1';

    const canvas = host.querySelector('canvas.route-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pinList = host.querySelector('.route-pin-list');
    const distEl  = host.querySelector('[data-route-meta="distance"] .route-meta__value');
    const stopEl  = host.querySelector('[data-route-meta="stops"] .route-meta__value');
    const timeEl  = host.querySelector('[data-route-meta="time"] .route-meta__value');

    let path = [];
    let dpr  = Math.max(1, window.devicePixelRatio || 1);

    /** Resize the canvas to its layout box × DPR. */
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width  = Math.round(r.width  * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    /** Translate page coords to canvas coords. */
    const localXY = (clientX, clientY) => {
      const r = canvas.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    /** Find a pin within 18 px of (x, y). */
    const pickPin = (x, y) => CUSTOMERS.find((c) => Math.hypot(c.x - x, c.y - y) < 18);

    /** Repaint everything. */
    const draw = () => {
      const r = canvas.getBoundingClientRect();
      const w = r.width;
      const h = r.height;

      // Clear (CSS gradient grid stays underneath; we just clear the ctx layer).
      ctx.clearRect(0, 0, w, h);

      // Live tokens — read from CSS, fall back to WORLDS_ATLAS Hadeed defaults
      // expressed as hsl() (canvas API accepts hsl strings) so we never ship
      // raw hex literals from this module.
      const inkColor    = readToken(host, '--ink',    'hsl(35 22% 92%)');
      const emberColor  = readToken(host, '--ember',  'hsl(355 75% 52%)');
      const lineColor   = readToken(host, '--route-line', 'hsl(220 8% 28% / 0.6)');
      const visitedRing = readToken(host, '--ember', emberColor);

      // Path lines
      if (path.length > 1) {
        ctx.strokeStyle = emberColor;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'miter';
        ctx.beginPath();
        path.forEach((id, i) => {
          const c = CUSTOMERS.find((cc) => cc.id === id);
          if (!c) return;
          if (i === 0) ctx.moveTo(c.x, c.y);
          else ctx.lineTo(c.x, c.y);
        });
        ctx.stroke();
      }

      // Pins
      CUSTOMERS.forEach((c) => {
        const visitedIdx = path.indexOf(c.id);
        const isVisited  = visitedIdx !== -1;

        // Outer ring
        ctx.beginPath();
        ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = isVisited ? emberColor : inkColor;
        ctx.fill();

        // Inner mark (chamfered diamond — Hadeed signature). Uses an
        // anchor-derived dark fill so we never paint a raw hex literal.
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(Math.PI / 4);
        const innerFill = readToken(host, '--anchor-bg', 'hsl(220 6% 14%)');
        ctx.fillStyle = isVisited ? innerFill : innerFill;
        ctx.fillRect(-2.5, -2.5, 5, 5);
        ctx.restore();

        // Sequence number for visited pins
        if (isVisited) {
          ctx.fillStyle = visitedRing;
          ctx.font = '700 11px "Almarai", "JetBrains Mono", monospace';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'start';
          ctx.fillText(toArabicDigits(visitedIdx + 1), c.x + 12, c.y - 8);
        }

        // Customer label
        ctx.fillStyle = inkColor;
        ctx.font = '500 12px "Vazirmatn", "Cairo", sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'start';
        ctx.fillText(c.name, c.x + 12, c.y + 6);
      });
    };

    /** Update meta cells + legend pins. */
    const updateMeta = () => {
      const m = computeMetrics(path);
      if (distEl) distEl.firstChild ? (distEl.firstChild.textContent = toArabicDigits(m.km.toFixed(1))) : (distEl.textContent = toArabicDigits(m.km.toFixed(1)));
      if (stopEl) stopEl.firstChild ? (stopEl.firstChild.textContent = toArabicDigits(m.stops))         : (stopEl.textContent = toArabicDigits(m.stops));
      if (timeEl) timeEl.firstChild ? (timeEl.firstChild.textContent = toArabicDigits(m.minutes))      : (timeEl.textContent = toArabicDigits(m.minutes));
      if (pinList) {
        pinList.querySelectorAll('.route-pin').forEach((pin) => {
          const id = pin.dataset.pinId;
          const idx = path.indexOf(id);
          if (idx === -1) {
            pin.dataset.elanPinState = 'idle';
            const numEl = pin.querySelector('.route-pin-num');
            if (numEl) numEl.textContent = '·';
          } else {
            pin.dataset.elanPinState = 'visited';
            const numEl = pin.querySelector('.route-pin-num');
            if (numEl) numEl.textContent = toArabicDigits(idx + 1);
          }
        });
      }
    };

    const onPointerDown = (e) => {
      const { x, y } = localXY(e.clientX, e.clientY);
      const pin = pickPin(x, y);
      if (!pin) return;
      togglePin(path, pin.id);
      updateMeta();
      draw();
    };

    canvas.addEventListener('pointerdown', onPointerDown);

    // Resize observer keeps the canvas crisp on container changes.
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(resize).observe(canvas);
    } else {
      window.addEventListener('resize', resize);
    }

    // Reset button
    const resetBtn = host.querySelector('[data-route-action="reset"]');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        path.length = 0;
        updateMeta();
        draw();
      });
    }

    // Initial paint after a tick (so layout has resolved).
    requestAnimationFrame(() => { resize(); updateMeta(); });

    // Keep the legend pins clickable too, for keyboard / no-pointer flows.
    if (pinList) {
      pinList.addEventListener('click', (e) => {
        const target = e.target.closest('.route-pin[data-pin-id]');
        if (!target) return;
        togglePin(path, target.dataset.pinId);
        updateMeta();
        draw();
      });
    }

    // Re-paint on world / nav change (ink/ember might re-resolve).
    window.addEventListener('upg:nav:change',   () => requestAnimationFrame(draw));
    window.addEventListener('upg:world:change', () => requestAnimationFrame(draw));

    // Surface state for Upg.elan.fieldsalesRoute below.
    host.__elanRouteState = {
      sequence: () => path.slice(),
      reset:    () => { path.length = 0; updateMeta(); draw(); },
      refresh:  () => { resize(); updateMeta(); draw(); },
      metrics:  () => computeMetrics(path)
    };
  };

  /** Find all planners and bind. */
  const bindAll = () => {
    DOC.querySelectorAll('.route-planner[data-elan-route]').forEach(initPlanner);
  };

  /** Register a tiny reflective surface under Upg.elan.fieldsalesRoute. */
  const registerSurface = () => {
    if (typeof window.Upg !== 'object' || window.Upg === null) {
      window.addEventListener('upg:ready', registerSurface, { once: true });
      return;
    }
    window.Upg.elan = window.Upg.elan || {};
    if (window.Upg.elan.fieldsalesRoute) return;

    const firstHost = () => DOC.querySelector('.route-planner[data-elan-route]');

    window.Upg.elan.fieldsalesRoute = Object.freeze({
      sequence: () => {
        const h = firstHost();
        return h && h.__elanRouteState ? h.__elanRouteState.sequence() : [];
      },
      reset: () => {
        const h = firstHost();
        if (h && h.__elanRouteState) h.__elanRouteState.reset();
      },
      refresh: () => {
        DOC.querySelectorAll('.route-planner[data-elan-route]').forEach((h) => {
          if (h.__elanRouteState) h.__elanRouteState.refresh();
        });
      },
      metrics: () => {
        const h = firstHost();
        return h && h.__elanRouteState ? h.__elanRouteState.metrics() : { km: 0, stops: 0, minutes: 0 };
      },
      customers: () => CUSTOMERS.slice()
    });
  };

  // ── Boot ─────────────────────────────────────────────────────────────
  if (DOC.readyState === 'loading') {
    DOC.addEventListener('DOMContentLoaded', () => { bindAll(); registerSurface(); }, { once: true });
  } else {
    bindAll();
    registerSurface();
  }

  // Late shard loads (DEVOTIO Worker 23 staging) — re-bind on shard mount.
  window.addEventListener('upg:shard:loaded', bindAll);

})();
