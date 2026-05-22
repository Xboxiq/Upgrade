# 🌅 WORKER 22 — Phase 5/6 — Time-of-Day Atmospheres
> **اقرأ أولاً:** `prompts/v3/22_WORKER_RITUAL_UI.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phases 1-4.
> **الفلسفة:** *الفجر ضوء أزرق نَدِيّ. الظهر ضوء ذهبي حادّ. العصر ضوء عَنْبَري نَاعِم. المغرب ضوء قرمزي مَائِل. العشاء سُكون نِيلي. الواجهة لا تَحس بالوقت = الواجهة بلا روح.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Time-of-Day` (~360 سطر) | تعديل قواعد قائمة |
| `style.css` `:root` | **APPEND** 5 atmosphere blocks (`[data-rit-time="X"]`) | تعديل tokens |
| `index.html` | لا يُلمَس (data-rit-time يُضاف على body عبر JS) | تغيير DOM |
| `app.js` | **EXTEND** `Upg.ritual` بـ time/atmosphere namespace | لمس IIFEs |

**Sacred preserved:**
- جميع W21 chr-* palettes + Mihrab dark.
- جميع W16 life ambient.
- 27 Upg.* APIs.

---

## 🎯 الهدف

Phase 5 يَكشف الوقت في الواجهة. ٥ atmospheres تُضاف على body عبر `data-rit-time`:

| Atmosphere | الاسم العربي | التوقيت | الـ Tint Hint |
|---|---|---|---|
| `dawn` | فَجْر | 04:30-07:00 | Pearl + soft Lapis (fresh blue) |
| `forenoon` | ضُحى | 07:00-13:00 | Saffron + Marble (golden bright) |
| `asr` | عَصْر | 13:00-17:00 | Henna + Saffron (amber warm) |
| `maghrib` | مَغْرِب | 17:00-19:30 | Coral + Henna (crimson sunset) |
| `isha` | عِشاء | 19:30-04:30 | Mihrab + Indigo (deep night) |

**التأثير:**
- body::after يَكتسب veil خفيف بلون الـ atmosphere.
- `--life-ambient-from/to` يَتعدّل (تكاملي مع W21 P4).
- typography: في dawn + forenoon → leading-tight قليلاً (نشاط)، في maghrib + isha → leading-relaxed (تأمل).
- يُتحدّث كل ٢٠ دقيقة (timer).

**Discipline:**
- لا يَستبدل الـ theme (dark/light) — يَلْبَسُه فقط بـ veil + tint shift.
- opt-out: `Upg.ritual.atmosphere.disable()`.
- Manual override: `Upg.ritual.atmosphere.set('dawn')`.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT (Worker 22 / RITUAL UI)
├─ Phase: 5/6 — Time-of-Day Atmospheres
├─ Estimated lines: ~500 (CSS ~360 + JS ~140)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~360 lines)
│   └─ platform/assets/app.js      (EXTEND Upg.ritual.atmosphere ~140 lines)
├─ Sacred verify:
│   ├─ grep -c '\-\-life-ambient-from' platform/assets/style.css  → ≥1 (W16+W21 P4)
│   └─ grep -c '\-\-chr-' platform/assets/style.css               → ≥120
├─ Branch: continue worker-22-devotio
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Atmosphere Tokens

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Time-of-Day Atmospheres (Worker 22 / Phase 5)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Default (no atmosphere active) */
  --rit-atmo-veil:           transparent;
  --rit-atmo-tint-shift:     transparent;
  --rit-atmo-leading-shift:  0;
  --rit-atmo-name:           "default";
}

/* ─── 1. DAWN (فَجْر) — fresh, blue, pearl ─── */
body[data-rit-time="dawn"] {
  --rit-atmo-name: "dawn";
  --rit-atmo-veil:
    radial-gradient(ellipse 100% 60% at 50% 0%,
      color-mix(in oklch, var(--chr-lapis-200) 18%, transparent) 0%,
      transparent 70%);
  --rit-atmo-tint-shift:
    color-mix(in oklch, var(--chr-pearl-200) 8%, transparent);
  --life-ambient-from:
    color-mix(in oklch, var(--chr-lapis-300) 14%, transparent);
  --life-ambient-to:
    color-mix(in oklch, var(--chr-pearl-400) 10%, transparent);
  --rit-atmo-leading-shift: -0.02em;  /* tighter for morning alertness */
}

/* ─── 2. FORENOON (ضُحى) — golden, marble, bright ─── */
body[data-rit-time="forenoon"] {
  --rit-atmo-name: "forenoon";
  --rit-atmo-veil:
    radial-gradient(ellipse 100% 80% at 50% 10%,
      color-mix(in oklch, var(--chr-saffron-200) 14%, transparent) 0%,
      transparent 70%);
  --rit-atmo-tint-shift:
    color-mix(in oklch, var(--chr-marble-300) 10%, transparent);
  --life-ambient-from:
    color-mix(in oklch, var(--chr-saffron-400) 12%, transparent);
  --life-ambient-to:
    color-mix(in oklch, var(--chr-marble-500) 8%, transparent);
  --rit-atmo-leading-shift: -0.01em;
}

/* ─── 3. ASR (عَصْر) — amber, warm henna ─── */
body[data-rit-time="asr"] {
  --rit-atmo-name: "asr";
  --rit-atmo-veil:
    radial-gradient(ellipse 90% 80% at 80% 30%,
      color-mix(in oklch, var(--chr-henna-300) 16%, transparent) 0%,
      transparent 70%);
  --rit-atmo-tint-shift:
    color-mix(in oklch, var(--chr-saffron-400) 12%, transparent);
  --life-ambient-from:
    color-mix(in oklch, var(--chr-henna-400) 14%, transparent);
  --life-ambient-to:
    color-mix(in oklch, var(--chr-saffron-500) 12%, transparent);
  --rit-atmo-leading-shift: 0;
}

/* ─── 4. MAGHRIB (مَغْرِب) — crimson sunset ─── */
body[data-rit-time="maghrib"] {
  --rit-atmo-name: "maghrib";
  --rit-atmo-veil:
    radial-gradient(ellipse 120% 100% at 70% 70%,
      color-mix(in oklch, var(--chr-coral-400) 20%, transparent) 0%,
      transparent 75%);
  --rit-atmo-tint-shift:
    color-mix(in oklch, var(--chr-henna-500) 14%, transparent);
  --life-ambient-from:
    color-mix(in oklch, var(--chr-coral-500) 16%, transparent);
  --life-ambient-to:
    color-mix(in oklch, var(--chr-henna-600) 14%, transparent);
  --rit-atmo-leading-shift: 0.005em;  /* slightly more breath for evening reflection */
}

/* ─── 5. ISHA (عِشاء) — deep mihrab night ─── */
body[data-rit-time="isha"] {
  --rit-atmo-name: "isha";
  --rit-atmo-veil:
    radial-gradient(ellipse 120% 100% at 50% 30%,
      color-mix(in oklch, var(--chr-mihrab-700) 22%, transparent) 0%,
      transparent 75%);
  --rit-atmo-tint-shift:
    color-mix(in oklch, var(--chr-indigo-700) 16%, transparent);
  --life-ambient-from:
    color-mix(in oklch, var(--chr-mihrab-600) 18%, transparent);
  --life-ambient-to:
    color-mix(in oklch, var(--chr-indigo-800) 14%, transparent);
  --rit-atmo-leading-shift: 0.01em;  /* more breath for night calm */
}

/* ════════════════════════════════════════════════════════════════════════
   Apply atmosphere veil — fixed pseudo on body
   ════════════════════════════════════════════════════════════════════════ */
body[data-rit-time]:not([data-rit-time="default"])::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: var(--rit-atmo-veil);
  transition: background 1200ms ease-in-out;
}

/* Apply leading shift to body voice text */
body[data-rit-time] .tas-voice-body,
body[data-rit-time] .tas-voice-quote {
  letter-spacing: calc(var(--tracking-body, 0em) + var(--rit-atmo-leading-shift, 0em));
  transition: letter-spacing 1500ms ease;
}

/* ════════════════════════════════════════════════════════════════════════
   Atmospheric tint to glass surfaces (W14+W21 backward)
   ════════════════════════════════════════════════════════════════════════ */
body[data-rit-time]:not([data-rit-time="default"]) .glass,
body[data-rit-time]:not([data-rit-time="default"]) .glass-card,
body[data-rit-time]:not([data-rit-time="default"]) .bento-card {
  background-image: var(--rit-atmo-tint-shift), var(--glass-bg, none);
  background-blend-mode: overlay;
  transition: background-image 1200ms ease;
}

/* ════════════════════════════════════════════════════════════════════════
   Reduced-Motion — instant atmosphere change, no transition
   ════════════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  body[data-rit-time]::after,
  body[data-rit-time] .tas-voice-body,
  body[data-rit-time] .tas-voice-quote,
  body[data-rit-time] .glass,
  body[data-rit-time] .glass-card,
  body[data-rit-time] .bento-card {
    transition: none !important;
  }
}

/* End RITUAL UI v3 / Phase 5 — Time of Day ──────────────────────────── */
```

### Step 2 — `Upg.ritual.atmosphere` JS

```javascript
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Atmosphere Logic (Worker 22 / Phase 5)
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.ritual) return;

  const STORAGE_DISABLED = 'upg_ritual_atmo_disabled';
  const STORAGE_OVERRIDE = 'upg_ritual_atmo_override';

  const ATMOSPHERES = {
    dawn:     { name: 'فَجْر',   range: [4.5, 7.0],   ar: 'فَجْر' },
    forenoon: { name: 'ضُحى',   range: [7.0, 13.0],  ar: 'ضُحى' },
    asr:      { name: 'عَصْر',   range: [13.0, 17.0], ar: 'عَصْر' },
    maghrib:  { name: 'مَغْرِب', range: [17.0, 19.5], ar: 'مَغْرِب' },
    isha:     { name: 'عِشاء',  range: [19.5, 28.5], ar: 'عِشاء' }  // 19:30 → 04:30 next day
  };

  const detectAtmosphere = () => {
    const now = new Date();
    let h = now.getHours() + now.getMinutes() / 60;

    for (const [id, atmo] of Object.entries(ATMOSPHERES)) {
      let [start, end] = atmo.range;
      if (end > 24) {
        // Wraps midnight
        if (h >= start || h < (end - 24)) return id;
      } else {
        if (h >= start && h < end) return id;
      }
    }
    return 'isha';  // fallback
  };

  const isDisabled = () => {
    try { return localStorage.getItem(STORAGE_DISABLED) === '1'; } catch { return false; }
  };

  const getOverride = () => {
    try { return localStorage.getItem(STORAGE_OVERRIDE); } catch { return null; }
  };

  const apply = (atmoId) => {
    if (!ATMOSPHERES[atmoId]) atmoId = 'forenoon';
    document.body.setAttribute('data-rit-time', atmoId);
    return atmoId;
  };

  const set = (atmoId) => {
    if (!ATMOSPHERES[atmoId]) {
      console.warn('[Upg.ritual.atmosphere] Unknown:', atmoId);
      return false;
    }
    try { localStorage.setItem(STORAGE_OVERRIDE, atmoId); } catch {}
    apply(atmoId);
    return true;
  };

  const clearOverride = () => {
    try { localStorage.removeItem(STORAGE_OVERRIDE); } catch {}
    refresh();
  };

  const refresh = () => {
    if (isDisabled()) {
      document.body.removeAttribute('data-rit-time');
      return null;
    }
    const override = getOverride();
    const atmoId = override || detectAtmosphere();
    apply(atmoId);
    return atmoId;
  };

  const disable = () => {
    try { localStorage.setItem(STORAGE_DISABLED, '1'); } catch {}
    document.body.removeAttribute('data-rit-time');
  };

  const enable = () => {
    try { localStorage.removeItem(STORAGE_DISABLED); } catch {}
    refresh();
  };

  const status = () => ({
    current: document.body.getAttribute('data-rit-time'),
    detected: detectAtmosphere(),
    override: getOverride(),
    disabled: isDisabled(),
    atmospheres: Object.fromEntries(
      Object.entries(ATMOSPHERES).map(([k, v]) => [k, v.ar])
    )
  });

  // Initial apply
  if (document.readyState !== 'loading') refresh();
  else document.addEventListener('DOMContentLoaded', refresh);

  // Re-check every 20 minutes
  setInterval(refresh, 20 * 60 * 1000);

  // Re-check on visibility change (user came back from another tab/sleep)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh();
  });

  // Extend Upg.ritual
  window.Upg.ritual.atmosphere = {
    detect: detectAtmosphere,
    apply,
    set,
    clearOverride,
    refresh,
    disable,
    enable,
    status,
    list: () => Object.keys(ATMOSPHERES),
    listArabic: () => Object.fromEntries(
      Object.entries(ATMOSPHERES).map(([k, v]) => [k, v.ar])
    )
  };
})(window, document);
```

### Step 3 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 22 / Phase 5 — Atmosphere Discipline:
   1. ٥ atmospheres ثابتة (دَواحٍ منعها — جزء من فلسفة الإسلامية).
   2. veil opacity ≤ 22% — لا overwhelm.
   3. transition بين atmospheres = 1200ms (smooth shift).
   4. لا يَستبدل theme (dark/light) — يَلبَسُه.
   5. opt-out via localStorage upg_ritual_atmo_disabled.
   6. override via localStorage upg_ritual_atmo_override (manual fixed atmo).
   7. refresh كل ٢٠ دقيقة (timer + visibilitychange).
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
grep -c 'data-rit-time=' platform/assets/style.css                # → ≥10 (5 atmospheres × 2 selectors)
grep -c '\-\-rit-atmo-' platform/assets/style.css                 # → ≥10
grep -c 'ATMOSPHERES' platform/assets/app.js                      # → ≥1
grep -c 'Upg.ritual.atmosphere' platform/assets/app.js            # → ≥1

# Browser test:
# Console: Upg.ritual.atmosphere.status() → current atmosphere
# Set time to 5am → Upg.ritual.atmosphere.set('dawn')  → dawn veil active
# Set time to noon → Upg.ritual.atmosphere.set('forenoon')
# Set time to 6pm → Upg.ritual.atmosphere.set('maghrib')
# Disable → Upg.ritual.atmosphere.disable() → veil disappears
```

---

## ✅ معايير القبول (Phase 5)

- [ ] 5 atmospheres CSS blocks.
- [ ] body::after veil per atmosphere.
- [ ] life-ambient-from/to تَتغيّر حسب atmosphere.
- [ ] Glass/bento surfaces tint shift per atmo.
- [ ] Auto-detect from current time.
- [ ] Override + disable mechanisms.
- [ ] Timer 20min refresh + visibilitychange.
- [ ] reduced-motion → no transition.
- [ ] `Upg.ritual.atmosphere`: detect/set/clearOverride/refresh/disable/enable/status/list/listArabic.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 5 (devotio): time-of-day atmospheres — 5 islamic-rooted (dawn/forenoon/asr/maghrib/isha), auto-detect + 20min refresh, Upg.ritual.atmosphere API"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-22-phase-5.json
git commit -m "state: devotio phase 5 (worker 22) committed and pushed"
# push immediately
```

— نهاية Phase 5.

🌅 **Devotion check:** هل المنصة تَحس الوقت الآن؟ → Phase 6 (Aura Deepening).
