/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — γ7 — Tayyar world JS: Synthwave Cue Beacon
   ────────────────────────────────────────────────────────────────────────
   🔊 SOUND_BEACON

   When the Tayyar world is active (social, callcenter), every completion
   event ("I tried this", "I called", any [data-cue="success"]) plays a
   3-note WebAudio swell:

     220Hz → 330Hz → 440Hz arpeggio (sine)
     Biquad lowpass sweeping 600Hz → 3200Hz over 180ms
     Gain ADSR: 0.0 → 0.07 → 0.001 (soft attack, exponential release)

   No audio file. No external sample. Procedural synthesis only.
   The cue respects:
     - prefers-reduced-motion: reduce  → silent
     - localStorage 'upg_tayyar_muted' → silent
     - browser autoplay policy        → first user gesture warms up ctx
     - 200ms global debounce          → no spam from rapid clicks

   The visual companion (.is-cued radial pulse) is auto-cleared after
   the animation; pure CSS, no extra timer.

   Public API: window.Upg.worlds.tayyar = { play, mute, unmute, isMuted, available }
   Sacred: nested under Upg.worlds — does NOT inflate top-level Upg.* count.
   ════════════════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'upg_tayyar_muted';
const TARGET_SELECTORS = '.practice-tried-btn, [data-cue="success"]';
const DEBOUNCE_MS = 200;
const PULSE_MS = 360;
const ARPEGGIO = [220, 330, 440];   /* Hz — A3, E4, A4 */
const NOTE_STAGGER_MS = 50;
const ATTACK_MS = 8;
const RELEASE_MS = 130;
const PEAK_GAIN = 0.07;
const FILTER_OPEN_HZ = [600, 3200];

let _ctx = null;
let _active = false;
let _lastFireAt = 0;
let _initialized = false;

/* ─── helpers ─────────────────────────────────────────────────────────── */

function _isReduced() {
  return window.matchMedia &&
         window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function _isMuted() {
  try { return localStorage.getItem(STORAGE_KEY) === '1'; }
  catch { return false; }
}

function _hasAudio() {
  return typeof window !== 'undefined' &&
         (typeof window.AudioContext === 'function' ||
          typeof window.webkitAudioContext === 'function');
}

function _getCtx() {
  if (_ctx) return _ctx;
  if (!_hasAudio()) return null;
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    _ctx = new Ctor({ latencyHint: 'interactive' });
    return _ctx;
  } catch { return null; }
}

/* ─── synthesis ───────────────────────────────────────────────────────── */

/**
 * Build one note from (oscillator → filter → gain) → destination.
 * Returns the gain node so the caller can chain to a master if needed.
 */
function _scheduleNote(ctx, freq, startAt, durationMs) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startAt);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(FILTER_OPEN_HZ[0], startAt);
  filter.frequency.exponentialRampToValueAtTime(
    FILTER_OPEN_HZ[1],
    startAt + (durationMs / 1000) * 0.6
  );
  filter.Q.value = 1.1;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(PEAK_GAIN, startAt + ATTACK_MS / 1000);
  gain.gain.exponentialRampToValueAtTime(
    0.001, startAt + (ATTACK_MS + RELEASE_MS) / 1000
  );

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startAt);
  osc.stop(startAt + (ATTACK_MS + RELEASE_MS + 20) / 1000);
}

function play() {
  if (_isReduced() || _isMuted()) return false;
  if (Date.now() - _lastFireAt < DEBOUNCE_MS) return false;
  _lastFireAt = Date.now();

  const ctx = _getCtx();
  if (!ctx) return false;

  /* Some browsers suspend the context until a user gesture; resume() is a
     no-op if already running. The first call may be silent (warmup) — this
     is honest respect for autoplay policy, not a bug. */
  if (typeof ctx.resume === 'function' && ctx.state === 'suspended') {
    try { ctx.resume(); } catch {}
  }

  const t0 = ctx.currentTime + 0.005;
  ARPEGGIO.forEach((freq, i) => {
    _scheduleNote(ctx, freq, t0 + (i * NOTE_STAGGER_MS) / 1000, 100);
  });
  return true;
}

/* ─── visual companion ────────────────────────────────────────────────── */

function _flashPulse(el) {
  if (!el || _isReduced()) return;
  el.classList.add('is-cued');
  /* Auto-clean using one-shot animationend, with safety timeout */
  const clear = () => {
    el.classList.remove('is-cued');
    el.removeEventListener('animationend', clear);
  };
  el.addEventListener('animationend', clear, { once: true });
  setTimeout(clear, PULSE_MS + 60);
}

/* ─── delegation ──────────────────────────────────────────────────────── */

function _onClick(e) {
  const el = e.target.closest(TARGET_SELECTORS);
  if (!el) return;
  /* Scope: only fire if the clicked element is inside a Tayyar page */
  const owningPage = el.closest('section.page[data-world="tayyar"]');
  if (!owningPage) return;
  if (play()) _flashPulse(el);
}

/* ─── engage / disengage ──────────────────────────────────────────────── */

function engage() {
  if (_active) return;
  _active = true;
  document.addEventListener('click', _onClick, { passive: true });
}

function disengage() {
  if (!_active) return;
  _active = false;
  document.removeEventListener('click', _onClick);
}

/* ─── lifecycle ───────────────────────────────────────────────────────── */

function _onWorldChange(e) {
  /* world.js dispatches { world, prevWorld, pageId }; older listeners read
     `to`, so we accept both keys for forward-compat. */
  const d = e && e.detail;
  const next = d && (d.world || d.to);
  if (next === 'tayyar') engage(); else disengage();
}

function init() {
  if (_initialized) return;
  _initialized = true;
  if (document.body && document.body.dataset.world === 'tayyar') engage();
  document.addEventListener('upg:world:change', _onWorldChange);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    requestAnimationFrame(init);
  }
}

/* ─── public surface ──────────────────────────────────────────────────── */

function mute()    { try { localStorage.setItem(STORAGE_KEY, '1'); } catch {} return true; }
function unmute()  { try { localStorage.removeItem(STORAGE_KEY); } catch {} return true; }
function toggle()  { return _isMuted() ? unmute() : mute(); }

const surface = Object.freeze({
  play,
  mute,
  unmute,
  toggle,
  isMuted: _isMuted,
  available: _hasAudio,
  arpeggio: () => Object.freeze([...ARPEGGIO]),
});

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  window.Upg.worlds = window.Upg.worlds || {};
  if (!window.Upg.worlds.tayyar) window.Upg.worlds.tayyar = surface;
}

export { play, mute, unmute, toggle };
export default surface;



/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ε2 — Tayyar / callcenter outcome cues
   ────────────────────────────────────────────────────────────────────────
   🔊 SOUND_BEACON — three semantically distinct call outcomes:

     • success → ascending tetrachord (440 → 554 → 622Hz, 3 sine notes,
                 same biquad pipeline as γ7 but shifted up + 4-note arc)
     • neutral → single soft sine 400Hz × 80ms (a "dafn" acknowledgement)
     • lost    → SILENCE. Zero audio output. The visual mirror (red outline
                 + inset darkness via [data-outcome="lost"]) is the only
                 feedback. Most AI dashboards default to a negative ding —
                 ε2 refuses that pattern. Silence IS the stronger feedback.

   The cues are wired through the existing γ7 pipeline (AudioContext warmup,
   reduced-motion guard, mute store, debounce). They do NOT clobber the γ7
   .practice-tried-btn arpeggio. They add a NEW public method `emitOutcome`
   to Upg.worlds.tayyar (replaces the frozen surface with a strict superset).

   Visual driver: also flips [data-outcome] on the closest .call-card so CSS
   in worlds/_tayyar.css applies the matching outline / meter color in lock-
   step with the audio (or its absence).

   Auto-binding:
     - Click on [data-elan-outcome] inside a Tayyar page
     - Listening to upg:call:outcome { detail.outcome: 'success'|'neutral'|'lost' }

   Reduced-motion: no audio. Visual outline still applies (a11y is honest).
   Muted: no audio. Visual outline still applies.
   ════════════════════════════════════════════════════════════════════════ */

const E2_SUCCESS_NOTES   = [440, 554, 622];   /* A4, C#5, D#5 — ascending Saba */
const E2_NEUTRAL_FREQ    = 400;
const E2_NEUTRAL_DUR_MS  = 80;
const E2_NOTE_STAGGER_MS = 60;

function _emitSuccess() {
  if (_isReduced() || _isMuted()) return false;
  const ctx = _getCtx();
  if (!ctx) return false;
  if (typeof ctx.resume === 'function' && ctx.state === 'suspended') {
    try { ctx.resume(); } catch {}
  }
  const t0 = ctx.currentTime + 0.005;
  E2_SUCCESS_NOTES.forEach((freq, i) => {
    _scheduleNote(ctx, freq, t0 + (i * E2_NOTE_STAGGER_MS) / 1000, 110);
  });
  return true;
}

function _emitNeutral() {
  if (_isReduced() || _isMuted()) return false;
  const ctx = _getCtx();
  if (!ctx) return false;
  if (typeof ctx.resume === 'function' && ctx.state === 'suspended') {
    try { ctx.resume(); } catch {}
  }
  const t0 = ctx.currentTime + 0.005;
  _scheduleNote(ctx, E2_NEUTRAL_FREQ, t0, E2_NEUTRAL_DUR_MS);
  return true;
}

function _emitLost() {
  /* Intentional silence — the BEACON's core thesis. */
  return true;
}

/**
 * Public outcome emitter. Dispatches a CustomEvent for any listener that
 * wants to track outcomes (analytics, simulator scoring) and runs the
 * audio + visual response.
 *
 * @param {'success'|'neutral'|'lost'} outcome
 * @param {Element} [target] - Optional element to flag with [data-outcome].
 *                             If absent, falls back to the most recent
 *                             [data-elan-outcome] click target.
 */
function emitOutcome(outcome, target) {
  const v = String(outcome || '').toLowerCase();
  if (v !== 'success' && v !== 'neutral' && v !== 'lost') return false;

  /* visual mirror: flip the closest .call-card data-outcome */
  let card = null;
  if (target && target instanceof Element) {
    card = target.closest('.call-card') || target;
  } else {
    /* fallback — find the visible call-card on this page */
    card = document.querySelector('section.page.active .call-card, section.page.active .call-card[data-elan-stage="ε2"]');
  }
  if (card) {
    card.setAttribute('data-outcome', v);
    /* update the live result text honestly */
    const resultEl = card.querySelector('[data-elan-outcome-result] .call-card__result-text');
    if (resultEl) {
      const labels = { success: 'اعتراض ناجح — صدى صاعد', neutral: 'حَيد — dafn واحد', lost: 'خسارة العميل — صَمت' };
      resultEl.textContent = labels[v] || '—';
    }
  }

  /* audio response */
  if      (v === 'success') _emitSuccess();
  else if (v === 'neutral') _emitNeutral();
  else if (v === 'lost')    _emitLost();

  return true;
}

/* Click delegation for [data-elan-outcome] buttons inside Tayyar pages */
function _onOutcomeClick(e) {
  const btn = e.target.closest('[data-elan-outcome]');
  if (!btn) return;
  const owningPage = btn.closest('section.page[data-world="tayyar"]');
  if (!owningPage) return;
  emitOutcome(btn.getAttribute('data-elan-outcome'), btn);
}

/* External event hook: pages can dispatch upg:call:outcome with detail.outcome */
function _onOutcomeEvent(ev) {
  const d = ev && ev.detail;
  if (!d || !d.outcome) return;
  emitOutcome(d.outcome, d.target instanceof Element ? d.target : null);
}

/* Bind once — survives DOM mutation, no re-bind on world change */
if (typeof document !== 'undefined' && !document.body?.dataset?.tayyarOutcomeBound) {
  const _bind = () => {
    if (document.body.dataset.tayyarOutcomeBound === 'true') return;
    document.body.dataset.tayyarOutcomeBound = 'true';
    document.addEventListener('click', _onOutcomeClick, { passive: true });
    document.addEventListener('upg:call:outcome', _onOutcomeEvent);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _bind, { once: true });
  } else {
    _bind();
  }
}

/* Replace the γ7-frozen surface with a strict superset (preserves all γ7
   methods + adds emitOutcome). The freeze is intentional — re-freezing here
   means nothing else can mutate it after we've extended it. */
try {
  const prev = (typeof window !== 'undefined' && window.Upg && window.Upg.worlds && window.Upg.worlds.tayyar) || surface;
  window.Upg.worlds.tayyar = Object.freeze({
    play:        prev.play,
    mute:        prev.mute,
    unmute:      prev.unmute,
    toggle:      prev.toggle,
    isMuted:     prev.isMuted,
    available:   prev.available,
    arpeggio:    prev.arpeggio,
    /* ε2 additions */
    emitOutcome,
    outcomes:    () => Object.freeze(['success', 'neutral', 'lost']),
    successNotes:() => Object.freeze([...E2_SUCCESS_NOTES]),
    neutralFreq: () => E2_NEUTRAL_FREQ,
  });
} catch (_e) {/* freeze refused (very old browser) — non-fatal */}

export { emitOutcome };
