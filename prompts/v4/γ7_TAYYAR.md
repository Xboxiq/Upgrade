# γ7 — العالم 6: تَيار (Tayyar) — Current
> **Pillar γ / Stage 7 of 9**
> الإلهام: Synthwave + Memphis Group + 1980s Iraqi graphic design + Cairo Jazz cover art
> الصفحات: social, callcenter

---

## 🎨 Creativity Beacon

**Type:** 🔊 SOUND_BEACON
**The Surprise:** عند الإنجاز في callcenter (مثل: ضغطت "تم الرد")، يُطلَق صوت `WebAudio` مكوَّن من 3 nodes: oscillator صعودي 220→440Hz في 80ms + low-pass filter + 0.06 gain. النتيجة: نقرة سعيدة لطيفة (ليست إشعار iOS كليشيه، ليست chime جرس). تُسمَع مرة واحدة لكل مهمة. flag-gated. **لا** ملف صوت — كل شيء WebAudio API procedural.
**Reference Avoided:** #16 toast-with-checkmark, generic notification ding
**Inspired-by:** #15 Synthwave + Khat (procedural electronic warmth)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. املأ `worlds/_tayyar.css`

```css
/* ÊLAN v4 — γ7 — World: تَيار (Tayyar)
   Synthwave + Memphis + 80s Iraqi graphic posters.
   Pages: social, callcenter */

[data-world="tayyar"] {
  --anchor-bg: hsl(285 25% 8%);
  --anchor-1:  hsl(285 22% 12%);
  --anchor-2:  hsl(285 20% 18%);
  --anchor-3:  hsl(285 18% 24%);

  --ink:       hsl(180 25% 95%);
  --ink-muted: hsl(180 18% 72%);
  --ink-faint: hsl(180 12% 50%);

  --line:        hsl(285 18% 24%);
  --line-strong: hsl(285 22% 36%);

  --ember: hsl(335 90% 60%);    /* magenta */
  --focus: hsl(180 85% 55%);    /* cyan */
  --accent: var(--ember);

  --ease-tayyar:     cubic-bezier(0.45, -0.4, 0.55, 1.4);
  --duration-tayyar: 520ms;

  --shadow-sm: 0 0 0 1px color-mix(in oklch, var(--ember) 18%, transparent);
  --shadow-md: 0 4px 24px color-mix(in oklch, var(--focus) 15%, transparent);
  --shadow-lg: 0 14px 40px color-mix(in oklch, var(--ember) 18%, transparent);
  --shadow-xl: 0 28px 64px color-mix(in oklch, var(--focus) 20%, transparent);

  --ring: 0 0 0 3px color-mix(in oklch, var(--focus) 40%, transparent);

  --color-bg: var(--anchor-bg);
  --color-surface-0: var(--anchor-bg);
  --color-surface-1: var(--anchor-1);
  --color-surface-2: var(--anchor-2);
  --color-surface-3: var(--anchor-3);
  --color-text: var(--ink);
  --color-text-muted: var(--ink-muted);
  --color-text-faint: var(--ink-faint);
  --color-border: var(--line);
  --color-border-strong: var(--line-strong);
  --color-brand: var(--ember);
}

/* Cards in tayyar — neon-glow edges, dark surface */
[data-world="tayyar"] .card,
[data-world="tayyar"] .panel {
  background: linear-gradient(135deg, var(--anchor-1), var(--anchor-2));
  border: 1px solid color-mix(in oklch, var(--focus) 25%, transparent);
  border-radius: var(--r-3);
  position: relative;
}

[data-world="tayyar"] .card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--r-3);
  background: linear-gradient(135deg,
    color-mix(in oklch, var(--ember) 8%, transparent),
    transparent 40%,
    color-mix(in oklch, var(--focus) 8%, transparent));
  pointer-events: none;
}

/* Background scan-lines (subtle, signature mood) */
[data-world="tayyar"] {
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 2px,
    color-mix(in oklch, var(--focus) 3%, transparent) 2px,
    color-mix(in oklch, var(--focus) 3%, transparent) 3px
  );
}

/* Buttons */
[data-world="tayyar"] .btn {
  background: linear-gradient(90deg, var(--ember), var(--focus));
  color: hsl(285 30% 10%);
  border: none;
  border-radius: var(--r-pill);
  padding: var(--s-3) var(--s-6);
  font-family: var(--voice-display-h);
  font-weight: 700;
  letter-spacing: var(--track-loose);
  cursor: pointer;
  transition: filter var(--duration-tayyar) var(--ease-tayyar),
              transform var(--duration-tayyar) var(--ease-tayyar);
}

[data-world="tayyar"] .btn:hover {
  filter: brightness(1.1) saturate(1.2);
  transform: scale(1.02);
}

/* Hero — wide stretched neon */
[data-world="tayyar"] h1.is-hero {
  font-family: var(--voice-display-h);
  font-stretch: 105%;
  font-weight: 700;
  letter-spacing: var(--track-loose);
  background: linear-gradient(90deg, var(--ember), var(--focus));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: var(--fs-4xl);
}

[data-world="tayyar"] body,
[data-world="tayyar"] .page-content {
  font-family: var(--voice-body);
}
```

### ٢. JS للـ Beacon — `world-tayyar.js` (WebAudio)

```javascript
/* ÊLAN v4 — γ7 — Tayyar world: procedural success cue (WebAudio)
   No audio files. Pure WebAudio synthesis. Flag-gated. */

const STORAGE_KEY = 'upg_tayyar_sound_disabled';
let audioCtx = null;

function isEnabled() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return localStorage.getItem(STORAGE_KEY) !== '1';
}

function getCtx() {
  if (audioCtx) return audioCtx;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  } catch { return null; }
}

export function playSuccessCue() {
  if (!isEnabled()) return;
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2000, now);
  filter.Q.value = 1.2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.13);
}

export function disable() { localStorage.setItem(STORAGE_KEY, '1'); }
export function enable() { localStorage.removeItem(STORAGE_KEY); }

function bind() {
  document.querySelectorAll('[data-world="tayyar"] [data-cue="success"]')
    .forEach(el => {
      if (el.dataset.tayyarBound) return;
      el.dataset.tayyarBound = 'true';
      el.addEventListener('click', () => playSuccessCue());
    });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'tayyar') bind();
});

if (document.body.dataset.world === 'tayyar') bind();

window.Upg = window.Upg || {};
window.Upg.worlds = window.Upg.worlds || {};
window.Upg.worlds.tayyar = Object.freeze({ playSuccessCue, disable, enable });
```

### ٣. تطبيق على callcenter buttons:
```html
<button class="btn" data-cue="success">تم الرد</button>
```

---

## Acceptance Criteria

- [ ] `worlds/_tayyar.css` ممتلئ
- [ ] scan-lines خفيفة في خلفية tayyar
- [ ] WebAudio cue يَعمل عند click على [data-cue="success"]
- [ ] `Upg.worlds.tayyar.playSuccessCue()` يَعمل من console
- [ ] `Upg.worlds.tayyar.disable()` يُسكِت
- [ ] respects `prefers-reduced-motion` (يُعطّل الصوت)
- [ ] لا ملف صوت في الـ commit (procedural فقط)
- [ ] commit: `γ7: World Tayyar — verified: webaudio_cue=on, scan_lines=true, neon_btn=on`
- [ ] Beacon recorded

— نهاية γ7 —
