/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — η2 — Match-target engine  (Upg.match · HAPTIC_PULSE — 9/9)
   ────────────────────────────────────────────────────────────────────────
   Drag a maqam chip onto its call phase. Three input modalities, no library:
     • HTML5 DnD   — mouse (dragstart / dragover / drop)
     • Pointer     — touch / pen (ghost follows finger, elementFromPoint zone)
     • Keyboard    — pick-and-drop, RTL parity (ArrowLeft = NEXT, ArrowRight = PREV)

   The Pulse is tactile: a CORRECT drop fires a single تَك (Upg.haptic.play
   when η3 is present, else navigator.vibrate); a WRONG drop is met with
   deliberate SILENCE — the absence of the buzz is the signal. The visual
   layer stays accent-free (the screen's one --accent-progress is the ring).

   Classic IIFE — mobile-safe. Idempotent. Fires upg:match:resolve.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  var bench = null, pool = null;
  var grabbed = null;      // keyboard/native-drag current chip
  var ptrChip = null;      // touch-drag current chip
  var ghost = null;
  var placed = 0, total = 0;
  var reduceMQ = null;

  function reduced() { return !!(reduceMQ && reduceMQ.matches); }
  function zones() { return bench ? Array.prototype.slice.call(bench.querySelectorAll('.match-zone')) : []; }
  function openZones() { return zones().filter(function (z) { return z.getAttribute('data-correct') !== 'true'; }); }

  // The single تَك — fires ONLY on a correct placement.
  function confirm() {
    if (window.Upg.haptic && typeof window.Upg.haptic.play === 'function') { window.Upg.haptic.play('takk'); return; }
    if (!reduced() && typeof navigator.vibrate === 'function') { try { navigator.vibrate(20); } catch (_) {} }
  }

  function flash(el, attr) {
    el.setAttribute(attr, 'true');
    var done = false;
    var clear = function () { if (done) return; done = true; el.removeEventListener('animationend', clear); el.removeAttribute(attr); };
    el.addEventListener('animationend', clear);
    window.setTimeout(clear, 360);
  }

  function fireResolve(chip, zone, valid) {
    try {
      document.dispatchEvent(new CustomEvent('upg:match:resolve', {
        bubbles: true,
        detail: { key: chip.getAttribute('data-match-key'), zone: zone.getAttribute('data-match-zone'), valid: valid }
      }));
    } catch (_) {}
  }

  function place(chip, zone) {
    chip.setAttribute('data-placed', 'true');
    chip.setAttribute('draggable', 'false');
    chip.setAttribute('aria-grabbed', 'false');
    chip.removeAttribute('data-grabbed');
    chip.tabIndex = -1;
    (zone.querySelector('[data-match-slot]') || zone).appendChild(chip);
    zone.setAttribute('data-correct', 'true');
    zone.setAttribute('aria-disabled', 'true');
    placed += 1;
  }

  function resolve(chip, zone) {
    if (!chip || !zone) return;
    if (zone.getAttribute('data-correct') === 'true') return;     // already locked
    var valid = chip.getAttribute('data-match-key') === zone.getAttribute('data-match-zone');
    fireResolve(chip, zone, valid);
    if (valid) {
      place(chip, zone);
      confirm();                       // a tap only on truth
    } else {
      flash(zone, 'data-reject');      // shake, no colour scold
      flash(chip, 'data-return');      // springs back in place
      // and silence — no haptic on error (the absence IS the feedback)
    }
    clearGrab();
  }

  function clearOver() { zones().forEach(function (z) { z.removeAttribute('data-over'); }); }

  function clearGrab() {
    if (grabbed) { grabbed.setAttribute('aria-grabbed', 'false'); grabbed.removeAttribute('data-grabbed'); grabbed = null; }
    clearOver();
  }


  /* ── 1. HTML5 DnD (mouse) ──────────────────────────────────────────── */
  function onDragStart(ev) {
    var chip = ev.target.closest && ev.target.closest('.match-chip');
    if (!chip || chip.getAttribute('data-placed') === 'true') return;
    grabbed = chip; chip.setAttribute('data-grabbed', 'true'); chip.setAttribute('aria-grabbed', 'true');
    try { ev.dataTransfer.setData('text/plain', chip.getAttribute('data-match-key') || ''); ev.dataTransfer.effectAllowed = 'move'; } catch (_) {}
  }
  function onDragEnd() { clearGrab(); }
  function onDragOver(ev) {
    var zone = ev.target.closest && ev.target.closest('.match-zone');
    if (!zone || zone.getAttribute('data-correct') === 'true') return;
    ev.preventDefault(); clearOver(); zone.setAttribute('data-over', 'true');
  }
  function onDrop(ev) {
    var zone = ev.target.closest && ev.target.closest('.match-zone');
    if (!zone || !grabbed) return;
    ev.preventDefault(); resolve(grabbed, zone);
  }


  /* ── 2. Pointer drag (touch / pen) ─────────────────────────────────── */
  function onPointerDown(ev) {
    if (ev.pointerType === 'mouse') return;                        // mouse uses native DnD
    var chip = ev.target.closest && ev.target.closest('.match-chip');
    if (!chip || chip.getAttribute('data-placed') === 'true') return;
    ev.preventDefault();
    ptrChip = chip; chip.setAttribute('data-grabbed', 'true'); chip.setAttribute('aria-grabbed', 'true');
    ghost = chip.cloneNode(true); ghost.className = 'match-chip match-ghost'; document.body.appendChild(ghost);
    moveGhost(ev.clientX, ev.clientY);
    try { chip.setPointerCapture(ev.pointerId); } catch (_) {}
  }
  function moveGhost(x, y) { if (ghost) ghost.style.transform = 'translate(' + (x - 24) + 'px,' + (y - 24) + 'px)'; }
  function onPointerMove(ev) {
    if (!ptrChip) return;
    moveGhost(ev.clientX, ev.clientY);
    if (ghost) ghost.style.visibility = 'hidden';
    var under = document.elementFromPoint(ev.clientX, ev.clientY);
    if (ghost) ghost.style.visibility = '';
    var zone = under && under.closest ? under.closest('.match-zone') : null;
    clearOver();
    if (zone && zone.getAttribute('data-correct') !== 'true') zone.setAttribute('data-over', 'true');
  }
  function onPointerUp(ev) {
    if (!ptrChip) return;
    if (ghost) { ghost.style.visibility = 'hidden'; }
    var under = document.elementFromPoint(ev.clientX, ev.clientY);
    var zone = under && under.closest ? under.closest('.match-zone') : null;
    if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
    ghost = null;
    var chip = ptrChip; ptrChip = null;
    chip.removeAttribute('data-grabbed'); chip.setAttribute('aria-grabbed', 'false');
    if (zone) resolve(chip, zone); else clearOver();
  }


  /* ── 3. Keyboard pick-and-drop (RTL parity) ────────────────────────── */
  function onKeyDown(ev) {
    var t = document.activeElement;
    if (!t || !t.closest || !bench || !bench.contains(t)) return;
    var chip = t.closest('.match-chip');
    var zone = t.closest('.match-zone');

    if ((ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar')) {
      if (chip && chip.getAttribute('data-placed') !== 'true') {
        ev.preventDefault();
        grabbed = chip; chip.setAttribute('data-grabbed', 'true'); chip.setAttribute('aria-grabbed', 'true');
        var first = openZones()[0]; if (first) first.focus();
        return;
      }
      if (zone && grabbed) { ev.preventDefault(); resolve(grabbed, zone); return; }
    }

    if (ev.key === 'Escape' && grabbed) { ev.preventDefault(); var g = grabbed; clearGrab(); g.focus(); return; }

    if (zone && grabbed && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight' || ev.key === 'ArrowUp' || ev.key === 'ArrowDown')) {
      ev.preventDefault();
      var list = openZones(); if (!list.length) return;
      var i = list.indexOf(zone); if (i < 0) i = 0;
      var fwd = (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown');   // RTL: Left = next
      var n = (i + (fwd ? 1 : -1) + list.length) % list.length;
      list[n].focus();
    }
  }


  /* ── Public API ───────────────────────────────────────────────────── */
  function reset() {
    if (!bench || !pool) return;
    zones().forEach(function (z) {
      var c = z.querySelector('.match-chip');
      if (c) { c.setAttribute('draggable', 'true'); c.removeAttribute('data-placed'); c.tabIndex = 0; pool.appendChild(c); }
      z.removeAttribute('data-correct'); z.removeAttribute('aria-disabled'); z.removeAttribute('data-over');
    });
    placed = 0; clearGrab();
  }


  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    bench = document.querySelector('[data-match]');
    if (!bench) return;
    pool = bench.querySelector('.match-pool');
    total = zones().length;
    try { reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (_) { reduceMQ = null; }

    bench.addEventListener('dragstart', onDragStart, false);
    bench.addEventListener('dragend',   onDragEnd,   false);
    bench.addEventListener('dragover',  onDragOver,  false);
    bench.addEventListener('drop',      onDrop,      false);
    bench.addEventListener('pointerdown', onPointerDown, false);
    document.addEventListener('pointermove', onPointerMove, false);
    document.addEventListener('pointerup',   onPointerUp,   false);
    bench.addEventListener('keydown', onKeyDown, false);
  }

  if (!window.Upg.match) {
    window.Upg.match = Object.freeze({
      reset:  reset,
      solved: function () { return total > 0 && placed >= total; },
      state:  function () { return { placed: placed, total: total }; },
      _meta: Object.freeze({
        version: 'tadaffuq-v5/η2',
        pulse: 'HAPTIC_PULSE',
        modalities: 3,
        emits: 'upg:match:resolve'
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
