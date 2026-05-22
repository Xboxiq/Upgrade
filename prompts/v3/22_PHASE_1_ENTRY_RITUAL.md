# 🚪 WORKER 22 — Phase 1/6 — Entry Ritual
> **اقرأ أولاً:** `prompts/v3/22_WORKER_RITUAL_UI.md` — قسم **Preservation Guard**.
> **يبني فوق:** Pack v3 Workers 20-21 (TASMEEM + CHROMATIC SOUL).
> **الفلسفة:** *الباب طقس. لا نَدخل المنصة، نُسْتَدْعى إليها. ٤ ثوانٍ من تَهَيُّؤ بصري تَخلق التزاماً يومياً.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Entry Ritual` (~340 سطر) في النهاية | تعديل قواعد قائمة |
| `style.css` `:root` | **APPEND** 6 ritual tokens (`--rit-entry-duration`, `--rit-entry-poetry-delay`, ...) | تعديل tokens |
| `index.html` | **AUGMENT** فقط — إضافة `<div id="rit-entry-portal" hidden>...</div>` قبل `</body>` | تغيير DOM موجود |
| `app.js` | **APPEND** IIFE `Upg.ritual` (~140 سطر) — يبدأ بـ entry ritual logic | لمس IIFEs قائمة |

**Sacred preserved:**
- 14 page sections + 391 qcalc + 26 Upg.* APIs.
- `localStorage` keys (نضيف `upg_ritual_last_entry` فقط).
- جميع W16 ambient gradients.
- Pack v1/v2 entry behavior — Worker 22 يضيف ritual فوقها، لا يستبدل.

---

## 🎯 الهدف

Phase 1 يُنشئ طقس فتح المنصة:

**التسلسل (~٤ ثوانٍ — opt-out via key):**

1. **0.0s** — صفحة سوداء/Mihrab veil على full screen (overlay z-index: 9999).
2. **0.4s** — wordmark "Upgrade" يظهر بـ Aref Ruqaa Bold، Lapis glow خلفه.
3. **0.9s** — تحت الـ wordmark، عبارة عربية قصيرة من ٧ عبارات (random) بـ Fraunces italic light:
   - "بسم اللحظة، نَبدأ"
   - "الحرف يَستقبل اليد"
   - "اليوم — مرة أخرى"
   - "الانضباط طقس، لا قرار"
   - "اقرأ كأنّك لم تَقرأ من قبل"
   - "الجرّة المملوءة هي التي تُسكب"
   - "خُذ نَفَساً، ثم أَمسك القلم"
4. **2.0s** — البقعة المضيئة تتمدّد لتغطي الـ overlay، fade out.
5. **3.5s** — overlay يَختفي، المنصة الفعلية تبدأ بـ life-breath أبطأ بنسبة 50% للأول دقيقة.
6. **4.0s** — life-breath يعود لطبيعته، الجلسة بدأت.

**Gating:**
- لا يَعمل إلا مرة واحدة في اليوم (localStorage `upg_ritual_last_entry`).
- لا يَعمل لو `prefers-reduced-motion` مفعَّل — بدلها fade ١٢٠ms.
- يُمكن تخطّيه بـ `Esc` أو click في أي مكان.
- يُمكن تعطيله نهائياً عبر `Upg.ritual.disable('entry')`.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT (Worker 22 / RITUAL UI)
├─ Phase: 1/6 — Entry Ritual
├─ Estimated lines: ~520 (CSS ~340 + JS ~140 + HTML ~30)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~340 lines)
│   ├─ platform/assets/app.js      (APPEND IIFE Upg.ritual ~140 lines)
│   └─ platform/index.html         (AUGMENT — add #rit-entry-portal div before </body>)
├─ Sacred verify:
│   ├─ grep -c '\-\-chr-lapis-' platform/assets/style.css         → 10
│   ├─ grep -c '\-\-chr-mihrab-' platform/assets/style.css        → 10
│   ├─ grep -c '\-\-type-voice-quote' platform/assets/style.css   → ≥1
│   └─ grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → 26
├─ Branch: NEW worker-22-devotio (from latest main, post W21 PR)
└─ No new fonts, no audio assets.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Ritual Tokens

في `:root`، **APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Entry Tokens (Worker 22 / Phase 1)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Timeline (4 seconds total — feel sacred not slow) */
  --rit-entry-duration:           4000ms;
  --rit-entry-veil-fade-in:        400ms;
  --rit-entry-wordmark-delay:      400ms;
  --rit-entry-wordmark-duration:   500ms;
  --rit-entry-poetry-delay:        900ms;
  --rit-entry-poetry-duration:    1000ms;
  --rit-entry-glow-expand-delay: 2000ms;
  --rit-entry-glow-duration:     1500ms;
  --rit-entry-fade-out-delay:    3500ms;
  --rit-entry-fade-out-duration:  500ms;

  /* Visual */
  --rit-entry-veil-color:    var(--chr-mihrab-900);
  --rit-entry-glow-color:    var(--chr-lapis-500);
  --rit-entry-wordmark-color: var(--chr-marble-50);
  --rit-entry-poetry-color:  var(--chr-pearl-300);

  /* Easing */
  --rit-entry-easing:        cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
```

### Step 2 — Entry Portal HTML (in index.html)

قبل `</body>`، **AUGMENT**:

```html
<!-- ════════════════════════════════════════════════════════════════════
     RITUAL UI v3 — Entry Portal (Worker 22 / Phase 1)
     Activated by Upg.ritual.start('entry'). Shows once per day.
     Skip via Esc or click. Disabled fully via Upg.ritual.disable('entry').
     ════════════════════════════════════════════════════════════════════ -->
<div id="rit-entry-portal" class="rit-entry-portal" hidden role="presentation" aria-hidden="true">
  <div class="rit-entry-veil"></div>
  <div class="rit-entry-stage">
    <div class="rit-entry-glow"></div>
    <h1 class="rit-entry-wordmark tas-voice-wordmark">Upgrade</h1>
    <p class="rit-entry-poetry tas-voice-quote" data-rit-poetry-text></p>
  </div>
  <button type="button" class="rit-entry-skip"
          aria-label="تَخَطَّ طقس الفتح"
          data-rit-skip>
    تخطَّ
  </button>
</div>
```

### Step 3 — Entry Ritual CSS

**APPEND** في `style.css`:

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Entry Ritual Visual (Worker 22 / Phase 1)
   ════════════════════════════════════════════════════════════════════════ */

.rit-entry-portal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: auto;
  isolation: isolate;
  /* When hidden attribute removed, element becomes visible */
}

.rit-entry-portal[hidden] {
  display: none !important;
}

.rit-entry-veil {
  position: absolute;
  inset: 0;
  background: var(--rit-entry-veil-color);
  opacity: 0;
  animation: rit-entry-veil-in
             var(--rit-entry-veil-fade-in)
             var(--rit-entry-easing)
             forwards,
             rit-entry-veil-out
             var(--rit-entry-fade-out-duration)
             var(--rit-entry-easing)
             var(--rit-entry-fade-out-delay)
             forwards;
}

.rit-entry-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
}

.rit-entry-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12rem;
  height: 12rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle,
    color-mix(in oklch, var(--rit-entry-glow-color) 80%, transparent) 0%,
    color-mix(in oklch, var(--rit-entry-glow-color) 40%, transparent) 30%,
    transparent 70%);
  filter: blur(16px);
  opacity: 0;
  animation: rit-entry-glow-pulse
             var(--rit-entry-glow-duration)
             var(--rit-entry-easing)
             var(--rit-entry-wordmark-delay)
             forwards,
             rit-entry-glow-expand
             var(--rit-entry-glow-duration)
             var(--rit-entry-easing)
             var(--rit-entry-glow-expand-delay)
             forwards;
}

.rit-entry-wordmark {
  position: relative;
  z-index: 2;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--rit-entry-wordmark-color);
  opacity: 0;
  letter-spacing: -0.005em;
  line-height: 1.0;
  animation: rit-entry-wordmark-in
             var(--rit-entry-wordmark-duration)
             var(--rit-entry-easing)
             var(--rit-entry-wordmark-delay)
             forwards,
             rit-entry-fade-out
             var(--rit-entry-fade-out-duration)
             var(--rit-entry-easing)
             var(--rit-entry-fade-out-delay)
             forwards;
}

.rit-entry-poetry {
  position: relative;
  z-index: 2;
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 400;
  font-style: italic;
  color: var(--rit-entry-poetry-color);
  opacity: 0;
  max-width: 28rem;
  line-height: 1.7;
  letter-spacing: -0.005em;
  animation: rit-entry-poetry-in
             var(--rit-entry-poetry-duration)
             var(--rit-entry-easing)
             var(--rit-entry-poetry-delay)
             forwards,
             rit-entry-fade-out
             var(--rit-entry-fade-out-duration)
             var(--rit-entry-easing)
             var(--rit-entry-fade-out-delay)
             forwards;
}

.rit-entry-skip {
  position: absolute;
  bottom: 2rem;
  inset-inline-end: 2rem;
  background: transparent;
  border: 1px solid color-mix(in oklch, var(--rit-entry-poetry-color) 30%, transparent);
  color: var(--rit-entry-poetry-color);
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  font-family: var(--type-voice-ui);
  font-size: 0.875rem;
  cursor: pointer;
  opacity: 0;
  animation: rit-entry-skip-in 200ms ease-out 1500ms forwards;
  transition: background 160ms ease, border-color 160ms ease;
}
.rit-entry-skip:hover {
  background: color-mix(in oklch, var(--rit-entry-glow-color) 20%, transparent);
  border-color: color-mix(in oklch, var(--rit-entry-glow-color) 60%, transparent);
}

/* ════════════════════════════════════════════════════════════════════════
   Keyframes — entry ritual choreography
   ════════════════════════════════════════════════════════════════════════ */
@keyframes rit-entry-veil-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes rit-entry-veil-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes rit-entry-wordmark-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.95);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes rit-entry-poetry-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 0.85;
    transform: translateY(0);
  }
}

@keyframes rit-entry-glow-pulse {
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
  60%  { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
}

@keyframes rit-entry-glow-expand {
  from {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.45;
  }
  to {
    transform: translate(-50%, -50%) scale(20);
    opacity: 0;
  }
}

@keyframes rit-entry-fade-out {
  from { opacity: 1; filter: blur(0); }
  to   { opacity: 0; filter: blur(8px); }
}

@keyframes rit-entry-skip-in {
  from { opacity: 0; }
  to   { opacity: 0.6; }
}

/* ════════════════════════════════════════════════════════════════════════
   Reduced-Motion Guard — instant entry, no animations
   ════════════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .rit-entry-veil,
  .rit-entry-wordmark,
  .rit-entry-poetry,
  .rit-entry-glow,
  .rit-entry-skip {
    animation: none !important;
    opacity: 1 !important;
  }

  /* Ritual still shows (it's information), but instant */
  .rit-entry-portal[data-rit-rm="reduce"] {
    /* JS will auto-dismiss after 800ms in reduced-motion mode */
  }
}

/* End RITUAL UI v3 / Phase 1 — Entry Ritual ─────────────────────────── */
```

### Step 4 — `Upg.ritual` IIFE (initial — entry only)

في `app.js`، **APPEND** في النهاية:

```javascript
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Upg.ritual API (Worker 22 / Phase 1)
   Phase 1 introduces entry ritual. Phases 2-6 extend this IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const STORAGE_KEY_LAST_ENTRY = 'upg_ritual_last_entry';
  const STORAGE_KEY_DISABLED   = 'upg_ritual_disabled';

  const POETRY_LINES = [
    'بسم اللحظة، نَبدأ.',
    'الحرف يَستقبل اليد.',
    'اليوم — مرة أخرى.',
    'الانضباط طقس، لا قرار.',
    'اقرأ كأنّك لم تَقرأ من قبل.',
    'الجرّة المملوءة هي التي تُسكب.',
    'خُذ نَفَساً، ثم أَمسك القلم.'
  ];

  // ─── Helpers ─────────────────────────────────────────────────────────

  const isReducedMotion = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isToday = (timestamp) => {
    if (!timestamp) return false;
    const last = new Date(parseInt(timestamp, 10));
    const now  = new Date();
    return last.getFullYear() === now.getFullYear() &&
           last.getMonth() === now.getMonth() &&
           last.getDate() === now.getDate();
  };

  const isDisabled = (rituId = 'entry') => {
    try {
      const disabled = JSON.parse(localStorage.getItem(STORAGE_KEY_DISABLED) || '[]');
      return Array.isArray(disabled) && disabled.includes(rituId);
    } catch { return false; }
  };

  const setDisabled = (rituId, on = true) => {
    try {
      const disabled = JSON.parse(localStorage.getItem(STORAGE_KEY_DISABLED) || '[]');
      const set = new Set(Array.isArray(disabled) ? disabled : []);
      if (on) set.add(rituId); else set.delete(rituId);
      localStorage.setItem(STORAGE_KEY_DISABLED, JSON.stringify([...set]));
    } catch { /* ignore */ }
  };

  // ─── Entry Ritual ────────────────────────────────────────────────────

  const dismissEntry = () => {
    const portal = document.getElementById('rit-entry-portal');
    if (!portal) return;
    portal.style.opacity = '0';
    setTimeout(() => {
      portal.setAttribute('hidden', '');
      portal.style.opacity = '';
    }, 200);
  };

  const startEntry = (force = false) => {
    if (!force) {
      // Check disabled
      if (isDisabled('entry')) return false;
      // Check once-per-day
      const lastEntry = localStorage.getItem(STORAGE_KEY_LAST_ENTRY);
      if (isToday(lastEntry)) return false;
    }

    const portal = document.getElementById('rit-entry-portal');
    if (!portal) return false;

    // Set today's marker
    try { localStorage.setItem(STORAGE_KEY_LAST_ENTRY, String(Date.now())); } catch {}

    // Pick random poetry line
    const poetryEl = portal.querySelector('[data-rit-poetry-text]');
    if (poetryEl) {
      const line = POETRY_LINES[Math.floor(Math.random() * POETRY_LINES.length)];
      poetryEl.textContent = line;
    }

    // Mark reduced-motion (CSS handles it)
    if (isReducedMotion()) {
      portal.setAttribute('data-rit-rm', 'reduce');
    }

    // Show
    portal.removeAttribute('hidden');

    // Auto-dismiss based on motion preference
    const dismissDelay = isReducedMotion() ? 800 : 4000;
    const timer = setTimeout(dismissEntry, dismissDelay);

    // Skip handlers
    const skipBtn = portal.querySelector('[data-rit-skip]');
    const onSkip = () => {
      clearTimeout(timer);
      dismissEntry();
      cleanup();
    };
    const onKeydown = (e) => {
      if (e.key === 'Escape') onSkip();
    };
    const onClick = (e) => {
      // click on portal itself dismisses
      if (e.target === portal || e.target.classList.contains('rit-entry-veil')) {
        onSkip();
      }
    };
    const cleanup = () => {
      if (skipBtn) skipBtn.removeEventListener('click', onSkip);
      document.removeEventListener('keydown', onKeydown);
      portal.removeEventListener('click', onClick);
    };

    if (skipBtn) skipBtn.addEventListener('click', onSkip);
    document.addEventListener('keydown', onKeydown);
    portal.addEventListener('click', onClick);

    return true;
  };

  // ─── Public API ──────────────────────────────────────────────────────

  const start = (rituId, opts = {}) => {
    if (rituId === 'entry') return startEntry(opts.force);
    console.warn('[Upg.ritual] Unknown ritual:', rituId);
    return false;
  };

  const stop = (rituId) => {
    if (rituId === 'entry') return dismissEntry();
  };

  const disable = (rituId) => setDisabled(rituId, true);
  const enable  = (rituId) => setDisabled(rituId, false);

  const status = () => {
    const lastEntry = localStorage.getItem(STORAGE_KEY_LAST_ENTRY);
    return {
      entry: {
        last_run: lastEntry ? new Date(parseInt(lastEntry, 10)).toISOString() : null,
        ran_today: isToday(lastEntry),
        disabled: isDisabled('entry')
      }
    };
  };

  // ─── Auto-trigger entry on first DOMContentLoaded of the day ─────────

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => startEntry(), 100);  // small delay to let layout settle
  });

  // ─── Expose ──────────────────────────────────────────────────────────

  window.Upg = window.Upg || {};
  window.Upg.ritual = { start, stop, disable, enable, status, POETRY_LINES };
})(window, document);
```

### Step 5 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 22 / Phase 1 — Entry Discipline:
   1. Entry ritual يعمل مرة في اليوم — gated عبر localStorage.
   2. Total duration ≤ 4s — مقدّس، لا تطوّله.
   3. كل keyframe له reduced-motion guard.
   4. الـ poetry lines ٧ فقط — لا تخترع.
   5. Skip button يظهر بعد ١٫٥s (لا يفسد الـ ritual ولا يَحبس المستخدم).
   6. Esc + click on portal = dismiss.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 27 (was 26, +ritual)

# New
grep -c 'rit-entry-portal' platform/index.html                    # → 1
grep -c '@keyframes rit-entry-' platform/assets/style.css         # → ≥6
grep -c '\-\-rit-entry-' platform/assets/style.css                # → ≥10
grep -c 'POETRY_LINES' platform/assets/app.js                     # → ≥1
grep -c 'startEntry' platform/assets/app.js                       # → ≥1

# Reduced-motion
grep -A 5 'prefers-reduced-motion' platform/assets/style.css | grep -c 'rit-entry'  # → ≥1

# Browser test (reset state):
# localStorage.removeItem('upg_ritual_last_entry')
# Reload → entry ritual plays for ~4s → dismisses
# Reload → no ritual (already today)
# Reload with prefers-reduced-motion → instant 0.8s flash
# Esc during ritual → dismisses
```

---

## ✅ معايير القبول (Phase 1)

- [ ] `#rit-entry-portal` موجود في index.html.
- [ ] 6 keyframes (`rit-entry-veil-in/out`, `wordmark-in`, `poetry-in`, `glow-pulse/expand`, `fade-out`, `skip-in`).
- [ ] reduced-motion guard يلغي كل keyframe.
- [ ] Entry ritual يعمل مرة واحدة في اليوم (verify by reset + reload).
- [ ] `Esc` + click on portal + skip button = dismiss.
- [ ] `Upg.ritual.start('entry', {force: true})` يعمل.
- [ ] `Upg.ritual.status()` يُرجع `{entry: {...}}`.
- [ ] `Upg.ritual.disable('entry')` يمنع الـ trigger التلقائي.
- [ ] 7 poetry lines random.
- [ ] Total duration: ~4s on full motion, ~0.8s on reduced-motion.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/assets/app.js platform/index.html
git commit -m "phase 1 (devotio): entry ritual — 4s portal with mihrab veil + lapis glow + arabic poetry, once-per-day, Upg.ritual API"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-22-phase-1.json
git commit -m "state: devotio phase 1 (worker 22) committed and pushed"
# push immediately
```

— نهاية Phase 1.

🚪 **Devotion check:** هل فتح المنصة الآن طقس مُتعمَّد بدلاً من click عابر؟ → Phase 2 (Reading Halo).
