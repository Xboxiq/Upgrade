/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε2 — Pillar ε CONTENT_REVIVAL — Stage 2 of 12
   Page:   page-callcenter
   World:  تَيار (Tayyar) — synthwave + neon haze
   Surface: Upg.callcenter (24th top-level Upg.* namespace)
   ────────────────────────────────────────────────────────────────────────
   Beacon: 🔊 SOUND_BEACON
   ----------------------------------------------------------------------
   The Surprise — three procedural call-outcome responses, no audio files:
     • success  → maqsoom haptic [8,30,8,30,14] + ascending sine arpeggio
                  360 → 440 → 540 Hz, each 120 ms with linear-attack +
                  exponential-release ADSR. Reads as a maqam ascent:
                  the closer you get to closure, the higher the call sits.
     • lost     → SILENCE. No tone. No haptic. Only a red outline that
                  the operator must see, not hear. Punishment-as-quiet.
     • neutral  → dafn haptic (8 ms) + 400 Hz sine for 80 ms. A soft
                  acknowledgement that the call ended without verdict.

   Forbidden Library avoided:
     #15 — generic single-buzz haptic  (we ship rhythmic patterns)
     #16 — toast-with-checkmark default (we ship audible verdict instead)

   AudioContext is built lazily on first emit, respects autoplay policy,
   suspended ctx is resumed once. prefers-reduced-motion guards the entire
   synthesiser (silence in all three branches). Touch / no-WebAudio fallback
   is a graceful no-op that still updates the visual outcome class.

   Sacred preservation: zero modification to legacy Upg.* APIs. This module
   ADDS Upg.callcenter alongside the existing 23+ surfaces.
   ──────────────────────────────────────────────────────────────────────── */

(function initEpsilon2Callcenter () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const w = window;
  w.Upg = w.Upg || {};

  const REDUCE = (w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const AC = w.AudioContext || w.webkitAudioContext || null;

  /* ── Lazy AudioContext ─────────────────────────────────────────────── */
  let ctx = null;
  let lastPlayAt = 0;
  const DEBOUNCE_MS = 80;

  function getCtx () {
    if (!AC) return null;
    if (!ctx) {
      try { ctx = new AC(); } catch (_) { ctx = null; }
    }
    if (ctx && ctx.state === 'suspended') {
      try { ctx.resume(); } catch (_) { /* ignore */ }
    }
    return ctx;
  }

  function debounced () {
    const now = Date.now();
    if (now - lastPlayAt < DEBOUNCE_MS) return true;
    lastPlayAt = now;
    return false;
  }

  /* ── Voice synthesis primitives (procedural, asset-free) ───────────── */
  function note (freq, startOffset, durMs, peak) {
    const c = getCtx();
    if (!c) return;
    const t0 = c.currentTime + startOffset;
    const t1 = t0 + (durMs / 1000);
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t1);
    osc.connect(g).connect(c.destination);
    osc.start(t0);
    osc.stop(t1 + 0.02);
  }

  function playArpeggio () {
    if (REDUCE || !getCtx()) return;
    /* Ascending arc: maqam-ajam triadic seed (G–B–D-ish frequencies) */
    note(360, 0.000, 120, 0.07);
    note(440, 0.085, 120, 0.07);
    note(540, 0.170, 140, 0.075);
  }

  function playNeutral () {
    if (REDUCE || !getCtx()) return;
    note(400, 0, 80, 0.045);
  }

  /* ── Haptic delegation (Upg.haptic from bottom-nav.js δ4) ──────────── */
  function vibrate (pattern) {
    if (REDUCE) return;
    try {
      if (w.Upg && w.Upg.haptic && typeof w.Upg.haptic.play === 'function') {
        w.Upg.haptic.play(pattern);
      }
    } catch (_) { /* ignore — haptic is optional */ }
  }

  /* ── Public emit — visual + audible verdict ───────────────────────── */
  function emitOutcome (outcome, opts) {
    const o = (outcome || '').toString();
    const target = opts && opts.target ? opts.target : null;

    /* Update card state if a target element was provided */
    if (target && target.dataset) {
      target.dataset.outcome = o;
      target.setAttribute('aria-live', 'polite');
    }

    if (debounced()) {
      // De-bounce overlapping fires; visual class still applied above.
      return;
    }

    switch (o) {
      case 'success': vibrate('maqsoom'); playArpeggio(); break;
      case 'lost':    /* deliberate silence — punishment-as-quiet */ break;
      case 'neutral': vibrate('dafn');    playNeutral();   break;
      default: break;
    }

    try {
      document.dispatchEvent(new CustomEvent('upg:call:outcome:emitted', {
        detail: { outcome: o, target }
      }));
    } catch (_) { /* ignore */ }
  }

  /* ── Listen for upstream events (other modules can dispatch) ──────── */
  document.addEventListener('upg:call:outcome', (e) => {
    const detail = e && e.detail ? e.detail : {};
    emitOutcome(detail.outcome, { target: detail.target || null });
  });

  /* ── Wire the demo "Outcome Lab" buttons inside #page-callcenter ──── */
  function wireDemoLab () {
    const lab = document.querySelector('[data-callcenter-outcome-lab]');
    if (!lab) return;

    const card = lab.querySelector('[data-callcenter-outcome-card]');
    const status = lab.querySelector('[data-callcenter-outcome-status]');
    const buttons = lab.querySelectorAll('[data-call-outcome]');

    const VERDICT = {
      success: 'اعتراض ناجح — العميل التزم.',
      lost:    'خسرتَ العميل — أنصت للسكون.',
      neutral: 'مكالمة محايدة — لا ربح ولا خسارة.'
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const outcome = btn.dataset.callOutcome;
        emitOutcome(outcome, { target: card });
        if (status && VERDICT[outcome]) status.textContent = VERDICT[outcome];

        /* Animate meter pip count by outcome (5 = full success) */
        const meter = card && card.querySelector('[data-call-meter]');
        if (meter) {
          const pips = meter.querySelectorAll('span');
          const filled = outcome === 'success' ? 5 : outcome === 'neutral' ? 3 : 1;
          pips.forEach((p, i) => {
            if (i < filled) p.dataset.active = 'true';
            else delete p.dataset.active;
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireDemoLab, { once: true });
  } else {
    wireDemoLab();
  }

  /* ── Public surface ───────────────────────────────────────────────── */
  if (!w.Upg.callcenter) {
    w.Upg.callcenter = Object.freeze({
      emitOutcome,
      outcomes: () => Object.freeze(['success', 'lost', 'neutral'])
    });
  }
})();
