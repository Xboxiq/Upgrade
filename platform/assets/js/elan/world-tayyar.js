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
