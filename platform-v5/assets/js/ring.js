/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — δ3 — Ring engine (RING_PULSE)
   ────────────────────────────────────────────────────────────────────────
   Scans [data-progress] hosts, mounts an SVG progress ring inside each.
   Builds DOM via document.createElementNS — no markup-string assignment.
   Renders Arabic-Indic digits via toLocaleString('ar-EG-u-nu-arab').

   Public surface (idempotent registration on window.Upg):
     Upg.ring.mount(host, value)   inject + set
     Upg.ring.set(host, value)     update value (idempotent)
     Upg.ring.value(host)          read current value (0..100)
     Upg.ring.scan(scope?)         (re)scan for [data-progress]

   Emits CustomEvent('upg:ring:set', { value, prev }) on actual change.

   IIFE — mobile-safe per the v4.0.2 lesson. No ESM.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  window.Upg = window.Upg || {};

  /* ── Constants ────────────────────────────────────────────────────── */
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var R = 28;                                  // viewBox-unit radius
  var CIRC = +(2 * Math.PI * R).toFixed(3);    // 175.929 — must mirror ring.css


  /* ── Helpers ──────────────────────────────────────────────────────── */

  function clampPct(v) {
    var n = Number(v);
    if (!isFinite(n)) return 0;
    if (n < 0)   return 0;
    if (n > 100) return 100;
    return n;
  }

  function arabicNumeral(n) {
    var v = clampPct(n);
    try {
      return v.toLocaleString('ar-EG-u-nu-arab');
    } catch (_e) {
      return String(v);
    }
  }


  /* ── Builders — never inline SVG markup; createElementNS only ─────── */

  function buildRingSvg() {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class',   'ring-svg');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable',   'false');

    var track = document.createElementNS(SVG_NS, 'circle');
    track.setAttribute('class', 'ring-track');
    track.setAttribute('cx', '32');
    track.setAttribute('cy', '32');
    track.setAttribute('r',  String(R));
    svg.appendChild(track);

    var bar = document.createElementNS(SVG_NS, 'circle');
    bar.setAttribute('class', 'ring-bar');
    bar.setAttribute('cx', '32');
    bar.setAttribute('cy', '32');
    bar.setAttribute('r',  String(R));
    svg.appendChild(bar);

    return svg;
  }

  function ensureRing(host) {
    var existing = host.querySelector(':scope > .ring');
    if (existing) return existing;

    var ring = document.createElement('div');
    ring.className = 'ring';
    ring.setAttribute('role',         'img');
    ring.setAttribute('aria-live',    'polite');
    ring.appendChild(buildRingSvg());

    var num = document.createElement('span');
    num.className = 'ring-num';
    ring.appendChild(num);

    host.appendChild(ring);
    return ring;
  }


  /* ── Public API ───────────────────────────────────────────────────── */

  function set(host, value) {
    if (!host || typeof host.appendChild !== 'function') return 0;
    var v = clampPct(value);
    var ring = ensureRing(host);

    var prev = Number(ring.style.getPropertyValue('--ring-p')) || 0;
    ring.style.setProperty('--ring-p', String(v));
    ring.setAttribute('aria-label', 'التَقَدُّم: ' + arabicNumeral(v) + ' بالمئة');
    ring.setAttribute('data-p', String(v));

    var num = ring.querySelector('.ring-num');
    if (num) num.textContent = arabicNumeral(v) + '٪';

    if (v !== prev) {
      try {
        host.dispatchEvent(new CustomEvent('upg:ring:set', {
          detail:  { value: v, prev: prev },
          bubbles: true
        }));
      } catch (_e) { /* old browsers without CustomEvent ctor: silent */ }
    }
    return v;
  }

  function mount(host, value) {
    if (!host) return 0;
    return set(host, value);
  }

  function value(host) {
    if (!host) return 0;
    var ring = host.querySelector(':scope > .ring');
    if (!ring) return 0;
    return Number(ring.style.getPropertyValue('--ring-p')) || 0;
  }

  function scan(scope) {
    var root  = scope || document;
    var hosts = root.querySelectorAll('[data-progress]');
    hosts.forEach(function (h) {
      var raw = h.getAttribute('data-progress');
      if (raw == null) return;
      set(h, raw);
    });
    return hosts.length;
  }


  /* ── Boot ─────────────────────────────────────────────────────────── */

  function boot() { scan(document); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }


  /* ── Surface registration (idempotent — never override existing) ──── */

  if (!window.Upg.ring) {
    window.Upg.ring = Object.freeze({
      mount: mount,
      set:   set,
      value: value,
      scan:  scan,
      _meta: Object.freeze({
        version:       'tadaffuq-v5/δ3',
        radius:        R,
        circumference: CIRC
      })
    });
  }

})();
