/* ÊLAN v4 — ε2: Callcenter Revival (Tayyar world)
 * ─────────────────────────────────────────────────────────────────────
 * Pillar ε / Stage 2 of 12 — Content Revival
 *
 * Beacon — 🔊 SOUND_BEACON (Three-state outcome echo):
 *   • success → Upg.haptic.play('maqsoom')   + ascending sine arpeggio
 *               (360 → 440 → 540 Hz, 80 ms each, 12 ms gap, sine wave,
 *               linear attack 10 ms / exponential release 120 ms)
 *   • lost    → SILENCE — no audio, no haptic. The empty bell IS the
 *               feedback. CSS adds a red outline; the body remembers.
 *   • neutral → Upg.haptic.play('dafn') + single sine 400 Hz × 80 ms
 *
 * The sound is procedural (zero asset loading). Lazy AudioContext
 * built on first user-gesture outcome (browser autoplay-policy safe).
 *
 * Respects:
 *   • prefers-reduced-motion: reduce  → silence ALL outcomes
 *   • Upg.sound.enabled() === false   → silence audio (haptic still
 *                                       fires for accessibility)
 *
 * Surface:
 *   Upg.callcenter.emit(outcome, opts)        — fire by outcome name
 *   Upg.callcenter.outcomes()                  — list of valid keys
 *   Upg.callcenter.silence()                   — kill any in-flight tail
 *   Upg.callcenter.attach(root)                — wire data-call-emit
 *                                                buttons inside `root`
 *
 * Custom event channel:
 *   document.dispatchEvent(new CustomEvent('upg:call:outcome',
 *                                         {detail: {outcome: 'success'}}))
 *   → triggers emit() exactly the same way.
 *
 * Avoided:
 *   • Forbidden #11 (animated counter from 0)            — n/a
 *   • Generic ding/buzz on every event                   — silence on lost
 *   • Forbidden #20 (emoji as feedback)                  — icons only
 *
 * Inspired-by: Maqamat #4 — three rising notes are the maqsoom rhythm
 *              transposed to pitch (low→mid→high = ground→reach→close).
 *
 * Sacred preserved: Upg.haptic (δ4), Upg.sound (W16 P5), 16 pages.
 * Authored: 2026-05-26
 * ───────────────────────────────────────────────────────────────────── */

(function initEpsilon2Callcenter () {
  'use strict';

  const VALID_OUTCOMES = Object.freeze(['success', 'lost', 'neutral']);

  /* ── Audio backbone ────────────────────────────────────────────── */
  let ctx = null;
  let activeNodes = new Set();
  const reducedMq = (typeof matchMedia === 'function')
    ? matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  function audioAllowed () {
    if (reducedMq && reducedMq.matches) return false;
    if (window.Upg && window.Upg.sound && typeof window.Upg.sound.enabled === 'function') {
      // honour the global sound preference if it has been toggled off
      if (window.Upg.sound.enabled() === false) return false;
    }
    return true;
  }

  function ensureContext () {
    if (ctx) return ctx;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    try { ctx = new Ctor(); } catch (_) { ctx = null; }
    return ctx;
  }

  function tone (freq, startOffset, duration, peak) {
    if (!ctx) return;
    const t0 = ctx.currentTime + startOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(peak, t0 + 0.010);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
    activeNodes.add(osc);
    osc.addEventListener('ended', () => activeNodes.delete(osc));
  }

  function playArpeggio () {
    if (!audioAllowed() || !ensureContext()) return;
    // 360 → 440 → 540 Hz; 80 ms tone, 12 ms gap → 92 ms cadence
    const cadence = 0.092;
    tone(360, 0 * cadence, 0.130, 0.075);
    tone(440, 1 * cadence, 0.130, 0.080);
    tone(540, 2 * cadence, 0.150, 0.090);
  }

  function playNeutral () {
    if (!audioAllowed() || !ensureContext()) return;
    tone(400, 0, 0.090, 0.050);
  }

  /* ── Haptic delegation (uses δ4 Upg.haptic.play) ────────────────── */
  function haptic (pattern) {
    const api = window.Upg && window.Upg.haptic;
    if (api && typeof api.play === 'function') {
      try { api.play(pattern); } catch (_) {}
    }
  }

  /* ── Visual outcome on the demo card ────────────────────────────── */
  function paintCard (outcome) {
    const card = document.querySelector('[data-call-card]');
    if (!card) return;
    card.setAttribute('data-outcome', outcome || '');
    const line = card.querySelector('[data-call-line]');
    if (line) {
      line.textContent = ({
        success: 'الاعتراض انفك. العميل تجاوب — اسمع الصعود الثلاثي.',
        lost:    'العميل أُغلقت معه القناة. لا صوت — الصمت هو الجواب.',
        neutral: 'حِياد. أَخذتَ المكالمة لمحطّتها التالية بدون ربح أو خسارة.',
      })[outcome] || 'اختر مخرَجاً لِسماع كيف يَردّ النظام.';
    }
    const meter = card.querySelectorAll('.call-meter span');
    const fill = ({ success: 5, neutral: 3, lost: 1 })[outcome] || 0;
    meter.forEach((cell, i) => cell.setAttribute('data-active', i < fill ? 'true' : 'false'));
  }

  /* ── Public emit ───────────────────────────────────────────────── */
  function emit (outcome) {
    const key = VALID_OUTCOMES.includes(outcome) ? outcome : 'neutral';
    paintCard(key);
    if (key === 'success') { haptic('maqsoom'); playArpeggio(); }
    else if (key === 'neutral') { haptic('dafn'); playNeutral(); }
    // 'lost' is intentionally silent — the punishment is silence.
    return key;
  }

  function outcomes () { return VALID_OUTCOMES.slice(); }

  function silence () {
    activeNodes.forEach((osc) => { try { osc.stop(); } catch (_) {} });
    activeNodes.clear();
  }

  /* ── DOM wiring ────────────────────────────────────────────────── */
  function attach (root) {
    const scope = root || document;
    const buttons = scope.querySelectorAll('[data-call-emit]');
    buttons.forEach((btn) => {
      if (btn.__elanCcAttached) return;
      btn.__elanCcAttached = true;
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        emit(btn.getAttribute('data-call-emit'));
      });
    });
    return buttons.length;
  }

  function bootDocListener () {
    document.addEventListener('upg:call:outcome', (ev) => {
      emit(ev && ev.detail && ev.detail.outcome);
    });
  }

  function ready (fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    attach(document);
    bootDocListener();
    if (window.Upg && window.Upg.icons && typeof window.Upg.icons.autoMount === 'function') {
      try { window.Upg.icons.autoMount(); } catch (_) {}
    }
  });

  /* ── Public surface ────────────────────────────────────────────── */
  window.Upg = window.Upg || {};
  window.Upg.callcenter = Object.freeze({
    emit,
    outcomes,
    silence,
    attach,
  });
})();
