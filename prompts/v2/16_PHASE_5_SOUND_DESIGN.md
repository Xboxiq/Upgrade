# 🔊 WORKER 16 — Phase 5/6 — Sound Design (Synth-only, Opt-in)
> **اقرأ أولاً:** `prompts/v2/16_WORKER_VITAL_UI.md`.
> **يبني فوق:** Phase 1-4.
> **الفلسفة:** *الصوت في منصة احترافية حقّ، لكن بعدٍ احترامي. WebAudio synthesis فقط (لا ملفات). Opt-in 100% (off by default). يُسكت على prefers-reduced-motion + يحترم system mute.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| Audio assets | **NONE** — كل الأصوات synthesis | إضافة أي ملف .mp3/.wav/.ogg |
| `style.css` | لا تُلمَس | أي تعديل |
| `app.js` | **APPEND** IIFE `Upg.sound` (≤220 سطر) | تعديل IIFEs قائمة |
| `index.html` | لا تُلمَس | أي تعديل (UI toggle عبر command palette = Phase 6 hook) |

---

## 🎯 الهدف

1. **5 أصوات synthed:**
   - `tap` — sine 880Hz × 60ms
   - `confirm` — sine 1320Hz × 80ms then 1760Hz × 80ms (rise)
   - `error` — triangle 220Hz × 120ms (low warn)
   - `nav` — sine 660Hz × 50ms (subtle nav swipe)
   - `complete` — sine 1320Hz → 1760Hz → 2640Hz (3-step ascending)

2. **Master controls:** `enable()`, `disable()`, `play(name)`, `setVolume(0..1)`, `enabled()`, `available()`.

3. **localStorage persistence** للحالة (key: `upg.sound.enabled` — boolean) — احتراماً لتفضيل المستخدم بين الجلسات.

4. **Off by default** — يجب التفعيل صراحة عبر `Upg.sound.enable()`.

5. **System safe-guards:**
   - يبني `AudioContext` lazily على أول `enable()`.
   - يحترم `prefers-reduced-motion: reduce` (treats as silent preference).
   - يبتلع AudioContext errors بأمان.
   - يحدّ بـ `Upg.sound.play()` لا يطلق صوتين متطابقين خلال 50ms (debounce).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT
├─ Phase: 5/6 — Sound Design
├─ Estimated lines: ~380 (JS ~340 + CSS minimal ~10)
├─ Files to touch:
│   └─ platform/assets/app.js   (APPEND ~340 IIFE)
├─ No HTML, no audio assets, no fonts.
└─ Off by default — must call Upg.sound.enable() to hear anything.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Tiny CSS hook (optional toggle visual state)

```css
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Sound state hook (Worker 16 / Phase 5)
   Used by command palette toggle in Phase 6 / future polish.
   ════════════════════════════════════════════════════════════════ */
[data-sound-state="on"]  { /* target the body or an indicator */ }
[data-sound-state="off"] { /* default */ }

/* End VITAL UI v1 / Worker 16 / Phase 5 ─────────────────────────────────── */
```

### Step 2 — `Upg.sound` IIFE

```javascript
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Sound Design (Worker 16 / Phase 5)
   WebAudio synthesis only — zero asset loading.
   Off by default. Persists user preference via localStorage.
   ════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const LS_KEY = 'upg.sound.enabled';
  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ctx = null;
  let masterGain = null;
  let enabled = false;
  let volume = 0.18;        // soft default
  let lastPlay = {};        // debounce store

  // Lazy build AudioContext (must be after user gesture for autoplay policy).
  const ensureCtx = () => {
    if (ctx) return ctx;
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(ctx.destination);
      return ctx;
    } catch (e) {
      console.warn('[Upg.sound] AudioContext unavailable:', e.message);
      return null;
    }
  };

  // Sound recipes (frequency, type, duration, attack, release).
  const RECIPES = {
    'tap':      [{ freq: 880,  type: 'sine',     dur: 0.06, atk: 0.005, rel: 0.04 }],
    'confirm':  [
      { freq: 1320, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.06 },
      { freq: 1760, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.07, delay: 0.07 }
    ],
    'error':    [{ freq: 220,  type: 'triangle', dur: 0.14, atk: 0.005, rel: 0.10 }],
    'nav':      [{ freq: 660,  type: 'sine',     dur: 0.05, atk: 0.005, rel: 0.04 }],
    'complete': [
      { freq: 1320, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.06 },
      { freq: 1760, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.07, delay: 0.07 },
      { freq: 2640, type: 'sine', dur: 0.10, atk: 0.005, rel: 0.09, delay: 0.14 }
    ]
  };

  // Play one note.
  const playNote = (note, when) => {
    if (!ctx || !masterGain) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = note.type;
    osc.frequency.value = note.freq;
    osc.connect(gain);
    gain.connect(masterGain);
    const start = when + (note.delay || 0);
    const peak = start + note.atk;
    const stop = peak + note.dur;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(1, peak);
    gain.gain.exponentialRampToValueAtTime(0.001, stop + note.rel);
    osc.start(start);
    osc.stop(stop + note.rel + 0.02);
  };

  const play = (name) => {
    if (!enabled || REDUCE_MOTION) return false;
    if (!RECIPES[name]) {
      console.warn('[Upg.sound] Unknown sound:', name, '— available:', Object.keys(RECIPES));
      return false;
    }
    // Debounce — same sound within 50ms = ignore.
    const now = Date.now();
    if (lastPlay[name] && (now - lastPlay[name]) < 50) return false;
    lastPlay[name] = now;

    const c = ensureCtx();
    if (!c) return false;
    if (c.state === 'suspended') c.resume();
    const t0 = c.currentTime;
    RECIPES[name].forEach((note) => playNote(note, t0));
    return true;
  };

  const setVolume = (v) => {
    volume = Math.max(0, Math.min(1, Number(v) || 0));
    if (masterGain) masterGain.gain.value = volume;
    return volume;
  };

  const enable = () => {
    if (REDUCE_MOTION) {
      console.info('[Upg.sound] reduced-motion preference — refusing to enable.');
      return false;
    }
    enabled = true;
    try { localStorage.setItem(LS_KEY, '1'); } catch (e) {}
    document.body && document.body.setAttribute('data-sound-state', 'on');
    ensureCtx();
    return true;
  };

  const disable = () => {
    enabled = false;
    try { localStorage.setItem(LS_KEY, '0'); } catch (e) {}
    document.body && document.body.setAttribute('data-sound-state', 'off');
    return true;
  };

  // Restore persisted preference (but NEVER auto-build AudioContext until user gesture).
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === '1' && !REDUCE_MOTION) {
      enabled = true;
      document.body && document.body.setAttribute('data-sound-state', 'on');
    } else {
      document.body && document.body.setAttribute('data-sound-state', 'off');
    }
  } catch (e) {}

  // Public API.
  window.Upg = window.Upg || {};
  window.Upg.sound = {
    enable, disable, play, setVolume,
    enabled: () => enabled,
    available: () => Boolean(window.AudioContext || window.webkitAudioContext),
    list: () => Object.keys(RECIPES)
  };
})(window, document);
```

---

## 🧪 Sanity Probe

```bash
grep -c 'Upg.sound' platform/assets/app.js                       # → ≥1
# Manual: open DevTools console:
#   Upg.sound.available() // true
#   Upg.sound.enabled()   // false (default)
#   Upg.sound.enable()    // true
#   Upg.sound.play('tap') // true (sound plays)
#   Upg.sound.play('confirm')
#   Upg.sound.disable()   // true
```

---

## ✅ معايير القبول (Phase 5)

- [ ] `Upg.sound` API كاملاً (enable/disable/play/setVolume/enabled/available/list).
- [ ] Off by default — لا صوت بدون `enable()` صريح.
- [ ] reduced-motion → `enable()` يعيد false.
- [ ] localStorage يحفظ التفضيل بين الجلسات.
- [ ] AudioContext يُبنى lazily.
- [ ] لا ملفات صوت، لا library — synthesis فقط.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 5 (vital): sound design — Upg.sound (5 synthed sounds, opt-in, reduced-motion-respecting)"
```

— نهاية Phase 5. 🔊 **Sound check:** الصوت احترامي ولا يغزو؟ نعم → Phase 6 (Identity Auras).
