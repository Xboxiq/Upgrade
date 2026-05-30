/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — κ1 — Call Center domain wiring
   ────────────────────────────────────────────────────────────────────────
   The first domain ported into the v5 canvas (Option C). This module is a
   CONSUMER ONLY: it reads the existing Upg.* primitives (ring, zen, overlay,
   haptic, icons) and wires two domain interactions. It registers NOTHING on
   window.Upg — the sacred API surface is left byte-identical.

     1. APIndex calculator — when the slide-over opens overlay-tpl-cc-apindex,
        bind the 5 KPI inputs, compute the composite vs COPC CX 6.2, render the
        band + drive the result ring (and mirror it onto the card ring).

     2. Mastery progress — when a Zen session completes (upg:zen:complete) on a
        skill card, count it once and advance the hero mastery ring + tiers.

   Classic IIFE — mobile-safe, no ESM. Idempotent (guards re-run).
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (document.documentElement.getAttribute('data-cc-wired') === 'true') return;

  var TOTAL_BLOCKS = 69;

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function clamp(n, lo, hi) { n = Number(n); if (!isFinite(n)) return lo; return n < lo ? lo : (n > hi ? hi : n); }
  function ringSet(host, v) { if (host && window.Upg && window.Upg.ring) { try { return window.Upg.ring.set(host, v); } catch (_) {} } return v; }


  /* ════════════════ 1. APIndex calculator ════════════════
     Composite 0..100 of five sub-scores, each measured against its COPC band.
     Weights favour the customer-felt metrics (CSAT, FCR) over the internal
     ones (AHT, ADH) — a deliberate, defensible blend, not an official COPC
     formula. */
  function subScores(v) {
    // AHT: ideal 4–6 min. Penalise 20 pts per minute outside the band.
    var aht = clamp(100 - Math.max(0, v.aht - 6) * 20 - Math.max(0, 4 - v.aht) * 20, 0, 100);
    // The percentage KPIs scored as proportion-of-target, capped at 100.
    var fcr  = clamp(v.fcr  / 75 * 100, 0, 100);   // target ~75% (mid of 70–79)
    var csat = clamp(v.csat / 85 * 100, 0, 100);   // target ≥85%
    var adh  = clamp(v.adh  / 93 * 100, 0, 100);   // target ~93% (mid of 92–95)
    var qa   = clamp(v.qa   / 90 * 100, 0, 100);   // target ≥90%
    return { aht: aht, fcr: fcr, csat: csat, adh: adh, qa: qa };
  }

  function composite(v) {
    var s = subScores(v);
    var score = s.csat * 0.25 + s.fcr * 0.25 + s.qa * 0.20 + s.aht * 0.15 + s.adh * 0.15;
    return Math.round(clamp(score, 0, 100));
  }

  function band(score) {
    if (score >= 90) return 'متفوّق · فوق المعيار';
    if (score >= 80) return 'ضمن المعيار';
    if (score >= 70) return 'قرب المعيار';
    return 'تحت المعيار — يحتاج تحسين';
  }

  function readForm(form) {
    function num(name) { var el = form.elements[name]; return el ? parseFloat(el.value) : NaN; }
    return { aht: num('aht'), fcr: num('fcr'), csat: num('csat'), adh: num('adh'), qa: num('qa') };
  }

  function recompute(form, ringHost, bandEl, cardRing) {
    var score = composite(readForm(form));
    ringSet(ringHost, score);
    if (cardRing) ringSet(cardRing, score);
    if (bandEl) bandEl.textContent = band(score);
  }

  function bindCalc() {
    var panel = document.getElementById('overlay-panel');
    if (!panel) return;
    var form    = panel.querySelector('[data-cc-calc]');
    var ringHost = panel.querySelector('[data-cc-calc-ring]');
    var bandEl  = panel.querySelector('[data-cc-calc-band]');
    if (!form || form.getAttribute('data-cc-bound') === 'true') return;
    form.setAttribute('data-cc-bound', 'true');

    var cardRing = document.getElementById('cc-apindex-ring');
    var run = function () { recompute(form, ringHost, bandEl, cardRing); };
    form.addEventListener('input', run, false);
    form.addEventListener('change', run, false);
    run();   // initial render with the seeded defaults
  }

  // The form is cloned into the panel only when the overlay opens — bind then.
  document.addEventListener('upg:overlay:open', function (e) {
    if (e && e.detail && e.detail.id === 'overlay-tpl-cc-apindex') {
      // let slide-over.js finish its clone + icon autopopulate first
      window.setTimeout(bindCalc, 0);
    }
  }, false);


  /* ════════════════ 2. Mastery progression ════════════════ */
  var SKILL_CARDS = ['cc-006', 'cc-007', 'cc-008', 'cc-009', 'cc-010', 'cc-011', 'cc-scenario'];
  var counted = Object.create(null);
  var mastered = 26;                 // initial seeded state (matches the header)

  function arNum(n) { try { return Number(n).toLocaleString('ar-EG-u-nu-arab'); } catch (_) { return String(n); } }

  function renderMastery() {
    var pct = Math.round(mastered / TOTAL_BLOCKS * 100);
    var hero = document.getElementById('cc-mastery-ring');
    ringSet(hero, pct);

    var num = document.querySelector('[data-cc-mastered]');
    if (num) num.textContent = arNum(mastered);
    var pctEl = document.querySelector('[data-cc-mastered-pct]');
    if (pctEl) pctEl.textContent = arNum(pct) + '٪';

    // Tier split (foundation first, then practitioner, then expert).
    var f = Math.min(mastered, 42);
    var p = Math.min(Math.max(mastered - 42, 0), 27);
    var x = Math.min(Math.max(mastered - 69, 0), 6);
    setTier('foundation', f);
    setTier('practitioner', p);
    setTier('expert', x);
  }
  function setTier(name, val) {
    var el = document.querySelector('[data-cc-tier="' + name + '"]');
    if (el) el.textContent = arNum(val);
  }

  // A completed Zen session on a skill card counts once toward mastery.
  document.addEventListener('upg:zen:complete', function (e) {
    var scope = e && e.detail && e.detail.scope;
    if (!scope || !scope.getAttribute) return;
    var card = scope.getAttribute('data-card');
    if (!card || SKILL_CARDS.indexOf(card) === -1) return;
    if (counted[card]) return;
    counted[card] = true;
    if (mastered < TOTAL_BLOCKS) mastered += 1;
    renderMastery();
  }, false);


  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    renderMastery();   // sync the header tiers to the seeded `mastered` value
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  document.documentElement.setAttribute('data-cc-wired', 'true');

})();
