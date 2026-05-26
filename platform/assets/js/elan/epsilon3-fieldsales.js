/* ÊLAN v4 — ε3: Fieldsales Revival (Hadeed world)
 * ─────────────────────────────────────────────────────────────────────
 * Pillar ε / Stage 3 of 12 — Content Revival
 *
 * Beacon — 🤚 INTERACTION_BEACON (Brutalist Paper-Grid Route Canvas):
 *   The route planner is NOT a Google Maps embed. It is a 2D canvas
 *   drawn by hand: a paper-feel grid (24px, low opacity), six Baghdad
 *   district pins, and a polyline drawn IN THE ORDER the user taps the
 *   pins. The canvas computes distance, stop count, and a Baghdad-scale
 *   time estimate locally. Zero external API. Touch-action:none for
 *   clean drawing. Reset uses the Hadeed iron-stamp engine.
 *
 * Why this matters as a Beacon:
 *   - Most platforms drop a Google Maps iframe and call it a feature.
 *     ε3 refuses. The map is a learning surface drawn from raw 2D
 *     primitives so a sales trainee can REASON about route order
 *     without leaking a single byte to a tile server.
 *   - Brutalist paper-grid (cinema-red Hadeed --ember on charcoal
 *     anchor) signals: this is an exercise sheet, not a navigation
 *     tool. The user is meant to plan, not to drive.
 *   - The 40 px/km scale is honest: a metric line is drawn at the
 *     bottom-right corner. The time formula is derived (1 stop ≈ 18
 *     min on-site + 6 min/km drive), citation in the Iraq Block.
 *
 * Surface:
 *   Upg.fieldsales.init(canvas, customers, opts)  — bootstrap a canvas
 *   Upg.fieldsales.reset()                         — clear the active path
 *   Upg.fieldsales.path()                          — read [{id,name}] order
 *   Upg.fieldsales.meta()                          — { km, stops, minutes }
 *
 * Avoided:
 *   • Google Maps iframe embed                          (the cliché)
 *   • Forbidden #25 (Material/FA/Bootstrap icons)
 *   • Forbidden #15 (modal-with-dark-overlay reset)
 *   • Forbidden #11 (counter-from-zero — meta starts at 0/0/0
 *     and is INSTANT, no animation, no easing)
 *
 * Inspired-by: Wild Card #2 — Iraqi Brutalism (Chadirji) + raw paper
 *              field-planning sheets used by FMCG sales reps.
 *
 * Sacred preserved: Upg.worlds.hadeed (γ5 iron-stamp), Upg.icons (α4),
 * 16 page sections, 0 external network calls, 0 audio, 0 illustration
 * library. archive/, prompts/v1-v3 untouched.
 *
 * Authored: 2026-05-26
 * ───────────────────────────────────────────────────────────────────── */

(function initEpsilon3Fieldsales () {
  'use strict';

  /* ── Six Baghdad districts on a 12 × 8 normalized grid ──────────── */
  /* Approximate relative geographic positions, NOT GPS. Paper-map. */
  const DEFAULT_CUSTOMERS = Object.freeze([
    Object.freeze({ id: 'krd', name: 'الكرّادة',   nx: 0.62, ny: 0.58, code: 'KRD' }),
    Object.freeze({ id: 'mns', name: 'المنصور',     nx: 0.34, ny: 0.42, code: 'MNS' }),
    Object.freeze({ id: 'adh', name: 'الأعظمية',     nx: 0.56, ny: 0.18, code: 'ADH' }),
    Object.freeze({ id: 'sdr', name: 'مدينة الصدر',  nx: 0.84, ny: 0.30, code: 'SDR' }),
    Object.freeze({ id: 'jdr', name: 'الجادرية',     nx: 0.70, ny: 0.74, code: 'JDR' }),
    Object.freeze({ id: 'kdh', name: 'الكاظمية',    nx: 0.26, ny: 0.22, code: 'KDH' }),
  ]);

  /* Scale: 40 px ≈ 1 km on the rendered canvas (paper-map convention). */
  const PX_PER_KM = 40;
  const MIN_PER_STOP = 18;
  const MIN_PER_KM   = 6;
  const PIN_RADIUS   = 7;
  const HIT_RADIUS   = 18;
  const GRID_PX      = 24;

  const state = {
    canvas: null,
    ctx: null,
    customers: DEFAULT_CUSTOMERS.slice(),
    pinPos: [],          /* [{id, x, y, name, code}] in canvas coords */
    path: [],            /* [id, id, ...] tap order */
    dpr: 1,
    width: 0,
    height: 0,
    metaCells: { km: null, stops: null, minutes: null },
    resizeObs: null,
    rafId: 0,
  };

  /* ── Drawing primitives ─────────────────────────────────────────── */
  function readWorldColor (varName, fallback) {
    if (typeof getComputedStyle !== 'function' || !state.canvas) return fallback;
    const v = getComputedStyle(state.canvas).getPropertyValue(varName).trim();
    return v || fallback;
  }

  function paintGrid () {
    const { ctx, width, height } = state;
    ctx.save();
    ctx.strokeStyle = readWorldColor('--ink-faint', 'rgba(255,255,255,0.10)');
    ctx.globalAlpha = 0.18;
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += GRID_PX) {
      ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, height); ctx.stroke();
    }
    for (let y = 0; y <= height; y += GRID_PX) {
      ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(width, y + 0.5); ctx.stroke();
    }
    ctx.restore();
  }

  function paintScale () {
    const { ctx, width, height } = state;
    const lineLen = PX_PER_KM * 2; // 2 km bar
    const x0 = width - lineLen - 16;
    const y0 = height - 22;
    ctx.save();
    ctx.strokeStyle = readWorldColor('--ink', '#FFFFFF');
    ctx.fillStyle   = readWorldColor('--ink', '#FFFFFF');
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x0, y0);   ctx.lineTo(x0 + lineLen, y0);
    ctx.moveTo(x0, y0 - 4); ctx.lineTo(x0, y0 + 4);
    ctx.moveTo(x0 + lineLen, y0 - 4); ctx.lineTo(x0 + lineLen, y0 + 4);
    ctx.stroke();
    ctx.font = '11px var(--voice-ui, sans-serif)';
    ctx.textAlign = 'left';
    ctx.fillText('٢ كم', x0 + lineLen + 6, y0 + 4);
    ctx.restore();
  }

  function paintPath () {
    if (state.path.length < 2) return;
    const { ctx } = state;
    const ember = readWorldColor('--ember', '#E0413F');
    ctx.save();
    ctx.strokeStyle = ember;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = ember;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    state.path.forEach((id, i) => {
      const p = state.pinPos.find((q) => q.id === id);
      if (!p) return;
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    ctx.restore();
  }

  function paintPins () {
    const { ctx } = state;
    const ink   = readWorldColor('--ink',   '#F0EBE0');
    const ember = readWorldColor('--ember', '#E0413F');
    const bg    = readWorldColor('--anchor-bg', '#1B1B1F');
    state.pinPos.forEach((p, i) => {
      const visited = state.path.includes(p.id);
      ctx.save();
      ctx.fillStyle = visited ? ember : bg;
      ctx.strokeStyle = visited ? ember : ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, PIN_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Order numeral inside visited pins
      if (visited) {
        const order = state.path.indexOf(p.id) + 1;
        ctx.fillStyle = bg;
        ctx.font = '700 10px var(--voice-num-tabular, sans-serif)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(order), p.x, p.y + 0.5);
      }
      // Name label
      ctx.fillStyle = ink;
      ctx.font = '12px var(--voice-ui, sans-serif)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.name, p.x - PIN_RADIUS - 6, p.y);
      ctx.restore();
    });
  }

  function paint () {
    if (!state.ctx) return;
    state.ctx.clearRect(0, 0, state.width, state.height);
    paintGrid();
    paintScale();
    paintPath();
    paintPins();
  }

  function schedulePaint () {
    if (state.rafId) cancelAnimationFrame(state.rafId);
    state.rafId = requestAnimationFrame(() => { state.rafId = 0; paint(); });
  }

  /* ── Layout ─────────────────────────────────────────────────────── */
  function recomputePinPositions () {
    state.pinPos = state.customers.map((c) => ({
      id: c.id,
      name: c.name,
      code: c.code,
      x: Math.round(c.nx * state.width),
      y: Math.round(c.ny * state.height),
    }));
  }

  function resize () {
    const c = state.canvas;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    state.dpr = window.devicePixelRatio || 1;
    state.width = Math.max(120, Math.floor(rect.width));
    state.height = Math.max(120, Math.floor(rect.height));
    c.width = state.width * state.dpr;
    c.height = state.height * state.dpr;
    state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    recomputePinPositions();
    schedulePaint();
  }

  /* ── Meta ───────────────────────────────────────────────────────── */
  function totalDistancePx () {
    let dist = 0;
    for (let i = 1; i < state.path.length; i++) {
      const a = state.pinPos.find((p) => p.id === state.path[i - 1]);
      const b = state.pinPos.find((p) => p.id === state.path[i]);
      if (a && b) dist += Math.hypot(a.x - b.x, a.y - b.y);
    }
    return dist;
  }

  function metaSnapshot () {
    const distPx = totalDistancePx();
    const km = distPx / PX_PER_KM;
    const stops = state.path.length;
    const minutes = stops === 0 ? 0 : Math.round(stops * MIN_PER_STOP + km * MIN_PER_KM);
    return { km, stops, minutes };
  }

  function updateMetaCells () {
    const m = metaSnapshot();
    if (state.metaCells.km)      state.metaCells.km.textContent      = m.km.toFixed(1);
    if (state.metaCells.stops)   state.metaCells.stops.textContent   = String(m.stops);
    if (state.metaCells.minutes) state.metaCells.minutes.textContent = String(m.minutes);
  }

  /* ── Hit testing + interaction ─────────────────────────────────── */
  function hitTest (x, y) {
    return state.pinPos.find((p) => Math.hypot(p.x - x, p.y - y) < HIT_RADIUS);
  }

  function onPointerDown (ev) {
    if (!state.canvas) return;
    ev.preventDefault();
    const rect = state.canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const hit = hitTest(x, y);
    if (!hit) return;
    if (state.path[state.path.length - 1] === hit.id) return; // ignore double-tap on tip
    if (state.path.includes(hit.id)) return;                  // unique stops only
    state.path.push(hit.id);
    updateMetaCells();
    schedulePaint();
    document.dispatchEvent(new CustomEvent('upg:fieldsales:tap', {
      detail: { id: hit.id, code: hit.code, order: state.path.length },
    }));
  }

  /* ── Public API ────────────────────────────────────────────────── */
  function reset () {
    state.path = [];
    updateMetaCells();
    schedulePaint();
    // Borrow the Hadeed iron-stamp pulse if available (γ5)
    const stamp = window.Upg && window.Upg.worlds && window.Upg.worlds.hadeed;
    if (stamp && typeof stamp.flip === 'function' && state.canvas) {
      try { stamp.flip(state.canvas); } catch (_) {}
    }
  }

  function pathSnapshot () {
    return state.path.map((id) => {
      const p = state.pinPos.find((q) => q.id === id) || {};
      return { id, name: p.name, code: p.code };
    });
  }

  function init (canvas, customers, opts) {
    if (!canvas || !canvas.getContext) return false;
    state.canvas = canvas;
    state.ctx = canvas.getContext('2d');
    if (Array.isArray(customers) && customers.length) state.customers = customers.slice();

    const o = opts || {};
    state.metaCells.km      = (o.metaKm)      || document.querySelector('[data-route="km"] [data-route-meta-value]');
    state.metaCells.stops   = (o.metaStops)   || document.querySelector('[data-route="stops"] [data-route-meta-value]');
    state.metaCells.minutes = (o.metaMinutes) || document.querySelector('[data-route="minutes"] [data-route-meta-value]');

    canvas.addEventListener('pointerdown', onPointerDown);
    if (typeof ResizeObserver === 'function') {
      state.resizeObs = new ResizeObserver(resize);
      state.resizeObs.observe(canvas);
    } else {
      window.addEventListener('resize', resize);
    }
    resize();
    updateMetaCells();
    return true;
  }

  /* ── DOM bootstrap ─────────────────────────────────────────────── */
  function bootCanvas () {
    const c = document.querySelector('[data-elan-route-canvas]');
    if (!c) return;
    init(c);
    const resetBtn = document.querySelector('[data-elan-route-reset]');
    if (resetBtn) resetBtn.addEventListener('click', (e) => { e.preventDefault(); reset(); });
  }

  function ready (fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    bootCanvas();
    if (window.Upg && window.Upg.icons && typeof window.Upg.icons.autoMount === 'function') {
      try { window.Upg.icons.autoMount(); } catch (_) {}
    }
  });

  /* ── Public surface ────────────────────────────────────────────── */
  window.Upg = window.Upg || {};
  window.Upg.fieldsales = Object.freeze({
    init,
    reset,
    path: pathSnapshot,
    meta: metaSnapshot,
    customers: () => state.customers.slice(),
  });
})();
