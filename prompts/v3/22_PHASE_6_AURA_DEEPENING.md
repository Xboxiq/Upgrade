# 🌟 WORKER 22 — Phase 6/6 — Aura Deepening
> **اقرأ أولاً:** `prompts/v3/22_WORKER_RITUAL_UI.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phases 1-5 + W16 P6 (Identity Auras existing).
> **الفلسفة:** *الـ Aura من Pack v2 W16 P6 وَضع الجذر. Pack v3 يَسقيه ويَعمّقه — يَربطه بـ chr-* tints و atmospheres و personality transitions، فيَصير الـ Aura روحاً متكاملة لكل صفحة.*

---

## 🛡️ Preservation Contract (Phase 6)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Aura Deepening` (~380 سطر) — يَستهلك W16 + W21 + W22 P5 | تعديل قواعد W16 P6 |
| `style.css` `:root` | **APPEND** 4 deepened aura tokens | تعديل tokens W16 |
| `index.html` | **AUGMENT** `data-rit-aura="deep"` على ≤14 صفحة | تغيير DOM |
| `app.js` | **EXTEND** `Upg.aura` (W16) بـ `deepen` method + `Upg.ritual` بـ `auraTie()` | لمس Upg.aura signature الأساسي |

**Sacred preserved:**
- W16 P6 `Upg.aura` API (نُمدّده).
- جميع 14 page auras الموجودة من W16.
- 27 Upg.* APIs.

---

## 🎯 الهدف

Phase 6 يَختم Worker 22 بـ:

1. **Deepening:** كل aura من W16 يَتعمّق بـ:
   - chr-* tint من W21 (بدل aurora generic).
   - atmosphere veil من W22 P5 (تأثير الوقت).
   - threshold transition من W22 P3 (entry/exit aura).
   - inkpot from W22 P4 (interactive aura pulse).
2. **Per-personality aura choreography:** كل صفحة لها rhythm aura خاص (3 modes: gentle / pulse / sweep).
3. **`Upg.aura.deepen()` method:** تَفعيل الـ deepening تلقائياً عند فتح صفحة.
4. **`Upg.ritual.auraTie()`:** ربط aura بالـ atmosphere الحالي (طبقة إضافية).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 6 PRE-FLIGHT (Worker 22 / RITUAL UI)
├─ Phase: 6/6 — Aura Deepening (final)
├─ Estimated lines: ~520 (CSS ~380 + JS ~140)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~380 lines)
│   └─ platform/assets/app.js      (EXTEND Upg.aura + Upg.ritual ~140 lines)
├─ Sacred verify:
│   ├─ grep -c 'Upg.aura' platform/assets/app.js                  → ≥1 (W16)
│   ├─ grep -c '\-\-aura-' platform/assets/style.css              → ≥14 (W16 P6)
│   └─ grep -c 'data-rit-time' platform/assets/style.css          → ≥10 (P5)
├─ Branch: continue worker-22-devotio
└─ Final phase of Worker 22 — PR opens after this.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Deepened Aura Tokens

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Aura Deepening Tokens (Worker 22 / Phase 6)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Tints chained with atmosphere + personality */
  --rit-aura-deep-tint:
    color-mix(in oklch,
      var(--color-tint, var(--chr-lapis-500)) 65%,
      var(--rit-atmo-tint-shift, transparent));

  --rit-aura-deep-edge:
    color-mix(in oklch,
      var(--color-tint-edge, var(--chr-mihrab-700)) 70%,
      var(--rit-atmo-tint-shift, transparent));

  --rit-aura-deep-glow:
    color-mix(in oklch,
      var(--color-tint, var(--chr-lapis-500)) 50%,
      transparent);

  --rit-aura-rhythm: "gentle";  /* default — set per personality */
}
```

### Step 2 — Aura Choreography (3 modes)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Per-Personality Aura Choreography (Worker 22 / Phase 6)
   ────────────────────────────────────────────────────────────────────────
   3 rhythm modes: gentle / pulse / sweep
   Applied via [data-rit-aura-rhythm] on the section.page element.
   ════════════════════════════════════════════════════════════════════════ */

/* ─── GENTLE — slow, ambient, breathing (default) ─── */
[data-rit-aura="deep"][data-rit-aura-rhythm="gentle"]::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background:
    radial-gradient(ellipse 60% 40% at 30% 30%,
      var(--rit-aura-deep-tint) 0%,
      transparent 70%),
    radial-gradient(ellipse 80% 60% at 75% 70%,
      var(--rit-aura-deep-edge) 0%,
      transparent 75%);
  opacity: 0.45;
  animation: rit-aura-gentle-drift 28s ease-in-out infinite;
  filter: blur(28px);
  will-change: transform;
}

@keyframes rit-aura-gentle-drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(2%, -1%, 0) scale(1.02); }
}

/* ─── PULSE — rhythmic breathing (callcenter, negotiation) ─── */
[data-rit-aura="deep"][data-rit-aura-rhythm="pulse"]::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background:
    radial-gradient(ellipse 70% 50% at 50% 50%,
      var(--rit-aura-deep-tint) 0%,
      transparent 70%);
  opacity: 0.4;
  animation: rit-aura-pulse 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  filter: blur(32px);
  will-change: opacity, transform;
}

@keyframes rit-aura-pulse {
  0%, 100% { opacity: 0.30; transform: scale(0.98); }
  50%      { opacity: 0.50; transform: scale(1.03); }
}

/* ─── SWEEP — directional sweep (lab, programming, social) ─── */
[data-rit-aura="deep"][data-rit-aura-rhythm="sweep"]::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background: linear-gradient(115deg,
    transparent 0%,
    transparent 30%,
    var(--rit-aura-deep-tint) 50%,
    transparent 70%,
    transparent 100%);
  background-size: 200% 200%;
  background-position: -100% -100%;
  opacity: 0.35;
  animation: rit-aura-sweep 22s linear infinite;
  filter: blur(36px);
  will-change: background-position;
}

@keyframes rit-aura-sweep {
  0%   { background-position: -100% -100%; }
  100% { background-position: 200% 200%; }
}

/* ════════════════════════════════════════════════════════════════════════
   Per-personality rhythm assignment
   ════════════════════════════════════════════════════════════════════════ */

/* Gentle — most pages (calm, focus) */
[data-page-personality="dashboard"][data-rit-aura="deep"],
[data-page-personality="psych"][data-rit-aura="deep"],
[data-page-personality="eq"][data-rit-aura="deep"],
[data-page-personality="customercare"][data-rit-aura="deep"],
[data-page-personality="hrmastery"][data-rit-aura="deep"],
[data-page-personality="myprogress"][data-rit-aura="deep"],
[data-page-personality="phonerepair"][data-rit-aura="deep"],
[data-page-personality="accounting"][data-rit-aura="deep"],
[data-page-personality="accountmgr"][data-rit-aura="deep"],
[data-page-personality="curriculum"][data-rit-aura="deep"] {
  --rit-aura-rhythm: "gentle";
}
[data-page-personality="dashboard"][data-rit-aura="deep"]::before,
[data-page-personality="psych"][data-rit-aura="deep"]::before,
[data-page-personality="eq"][data-rit-aura="deep"]::before,
[data-page-personality="customercare"][data-rit-aura="deep"]::before,
[data-page-personality="hrmastery"][data-rit-aura="deep"]::before,
[data-page-personality="myprogress"][data-rit-aura="deep"]::before,
[data-page-personality="phonerepair"][data-rit-aura="deep"]::before,
[data-page-personality="accounting"][data-rit-aura="deep"]::before,
[data-page-personality="accountmgr"][data-rit-aura="deep"]::before,
[data-page-personality="curriculum"][data-rit-aura="deep"]::before {
  animation-name: rit-aura-gentle-drift;
}

/* Pulse — high-energy (callcenter, negotiation, fieldsales) */
[data-page-personality="callcenter"][data-rit-aura="deep"],
[data-page-personality="negotiation"][data-rit-aura="deep"],
[data-page-personality="fieldsales"][data-rit-aura="deep"] {
  --rit-aura-rhythm: "pulse";
}
[data-page-personality="callcenter"][data-rit-aura="deep"]::before,
[data-page-personality="negotiation"][data-rit-aura="deep"]::before,
[data-page-personality="fieldsales"][data-rit-aura="deep"]::before {
  animation-name: rit-aura-pulse;
}

/* Sweep — kinetic (lab, programming, social) */
[data-page-personality="lab"][data-rit-aura="deep"],
[data-page-personality="programming"][data-rit-aura="deep"],
[data-page-personality="social"][data-rit-aura="deep"] {
  --rit-aura-rhythm: "sweep";
}
[data-page-personality="lab"][data-rit-aura="deep"]::before,
[data-page-personality="programming"][data-rit-aura="deep"]::before,
[data-page-personality="social"][data-rit-aura="deep"]::before {
  animation-name: rit-aura-sweep;
}

/* ════════════════════════════════════════════════════════════════════════
   Reduced-Motion — silence all aura animations
   ════════════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  [data-rit-aura="deep"]::before {
    animation: none !important;
    opacity: 0.20 !important;
  }
}

/* End RITUAL UI v3 / Phase 6 — Aura Deepening — Worker 22 COMPLETE ──── */
```

### Step 3 — `Upg.aura.deepen` + `Upg.ritual.auraTie`

```javascript
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Aura Deepening Logic (Worker 22 / Phase 6)
   Extends W16 Upg.aura with deepening + ties to W21 chr + W22 P5 atmosphere.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.ritual) return;

  const PERSONALITY_RHYTHM = {
    'dashboard':    'gentle',
    'callcenter':   'pulse',
    'fieldsales':   'pulse',
    'accountmgr':   'gentle',
    'social':       'sweep',
    'lab':          'sweep',
    'psych':        'gentle',
    'eq':           'gentle',
    'negotiation':  'pulse',
    'customercare': 'gentle',
    'programming':  'sweep',
    'accounting':   'gentle',
    'phonerepair':  'gentle',
    'hrmastery':    'gentle',
    'myprogress':   'gentle',
    'curriculum':   'gentle'
  };

  const deepen = (pageEl) => {
    const target = pageEl ||
                   document.querySelector('section.page:not([hidden])');
    if (!target) return false;

    target.setAttribute('data-rit-aura', 'deep');
    const personality = target.getAttribute('data-page-personality');
    const rhythm = PERSONALITY_RHYTHM[personality] || 'gentle';
    target.setAttribute('data-rit-aura-rhythm', rhythm);

    return { personality, rhythm };
  };

  const undeepen = (pageEl) => {
    const target = pageEl ||
                   document.querySelector('section.page:not([hidden])');
    if (!target) return false;
    target.removeAttribute('data-rit-aura');
    target.removeAttribute('data-rit-aura-rhythm');
    return true;
  };

  const auraTie = () => {
    // Ties active page aura to current atmosphere + tint
    const activePage = document.querySelector('section.page:not([hidden])');
    if (!activePage) return null;

    const personality = activePage.getAttribute('data-page-personality');
    const atmosphere = document.body.getAttribute('data-rit-time');
    const cs = getComputedStyle(activePage);
    const tint = cs.getPropertyValue('--color-tint').trim();

    return {
      personality,
      atmosphere,
      tint,
      rhythm: PERSONALITY_RHYTHM[personality] || 'gentle',
      auraDeep: activePage.getAttribute('data-rit-aura') === 'deep'
    };
  };

  // Auto-deepen when navigating between pages
  const autoDeepenOnNav = () => {
    setTimeout(() => deepen(), 50);
  };

  document.addEventListener('upg:nav:change', autoDeepenOnNav);

  // Initial deepen on load
  if (document.readyState !== 'loading') deepen();
  else document.addEventListener('DOMContentLoaded', deepen);

  // Extend Upg.aura (W16) — additive
  if (window.Upg.aura) {
    window.Upg.aura.deepen = deepen;
    window.Upg.aura.undeepen = undeepen;
    window.Upg.aura.deepRhythmFor = (personality) =>
      PERSONALITY_RHYTHM[personality] || 'gentle';
  }

  // Extend Upg.ritual
  window.Upg.ritual.auraTie = auraTie;
  window.Upg.ritual.deepenAura = deepen;
  window.Upg.ritual.undeepenAura = undeepen;
  window.Upg.ritual.rhythmMap = () => ({ ...PERSONALITY_RHYTHM });

  // Final ritual setup log
  document.addEventListener('DOMContentLoaded', () => {
    console.info(
      '%c🌟 RITUAL UI v3 — entry + halo + 5 thresholds + 3 inkpots + 5 atmospheres + 3 aura rhythms — all phases bound',
      'color:#9D7BFF; font-weight:bold;'
    );
  });
})(window, document);
```

### Step 4 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 22 / Phase 6 — Aura Deepening Discipline:
   1. ٣ rhythms فقط (gentle/pulse/sweep) — لا تخترع rhythm جديد.
   2. كل personality له rhythm محدد — 16 mapping ثابت.
   3. opacity ≤ 0.50 — لا overwhelm.
   4. blur ≥ 28px — يَجعل الـ aura "behind glass".
   5. reduced-motion → static aura with opacity 0.20.
   6. Auto-deepen on page nav — opt-out via Upg.aura.undeepen().
   ════════════════════════════════════════════════════════════════════════ */

/* End RITUAL UI v3 — Worker 22 COMPLETE — 6/6 phases ─────────────────── */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
grep -c '@keyframes rit-aura-' platform/assets/style.css          # → 3
grep -c 'data-rit-aura' platform/assets/style.css                 # → ≥10
grep -c '\-\-rit-aura-' platform/assets/style.css                 # → ≥4
grep -c 'PERSONALITY_RHYTHM' platform/assets/app.js               # → ≥1
grep -c 'auraTie\|deepen' platform/assets/app.js                  # → ≥4

# Final
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 27 (Upg.ritual)
grep -c 'Upg.aura.deepen' platform/assets/app.js                  # → ≥1

# Browser test:
# Console: Upg.ritual.auraTie() → {personality, atmosphere, tint, rhythm, auraDeep: true}
# Visual: callcenter → pulse rhythm ; lab → sweep rhythm ; psych → gentle drift
# Reduced motion → static aura, no animation
```

---

## ✅ معايير القبول (Phase 6 — Worker 22 final)

- [ ] 4 deepened aura tokens.
- [ ] 3 keyframes (gentle-drift / pulse / sweep).
- [ ] 16 personality → rhythm mappings.
- [ ] auto-deepen on page nav.
- [ ] reduced-motion guard.
- [ ] `Upg.aura.deepen/undeepen/deepRhythmFor` extends W16.
- [ ] `Upg.ritual.auraTie/deepenAura/undeepenAura/rhythmMap`.
- [ ] Console: 0 errors. Final ritual log shows.
- [ ] **RITUAL UI Worker 22 مكتمل — 6/6 phases.**

---

## 📤 Commit + Push (final)

```bash
git add platform/assets/style.css platform/assets/app.js platform/index.html
git commit -m "phase 6 (devotio): aura deepening — 3 rhythms (gentle/pulse/sweep), 16 personality bindings, ties to chr + atmosphere, Upg.aura.deepen + Upg.ritual.auraTie — worker 22 complete"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-22-phase-6.json
git commit -m "state: devotio phase 6 (worker 22) complete — 6/6 phases"
# push immediately
```

### Open PR

```
gh pr create \
  --base main \
  --head worker-22-devotio \
  --title "feat: Worker 22 — RITUAL UI DEVOTIO (6/6 phases)" \
  --body "Pack v3 Worker 22 complete.

## Phases done
1. Entry Ritual — 4s mihrab veil + lapis glow + arabic poetry, once-per-day
2. Reading Halo — Cmd+. zen mode, chrome dims, target glows
3. Threshold Transitions — 5 variants (fade/mashrabiya/scroll/iris/mihrab-arch) + 16 personality routing
4. Inkpot Feedback — 3 variants (ink-spread/kashida-pull/kalam-stroke)
5. Time-of-Day — 5 atmospheres (dawn/forenoon/asr/maghrib/isha) auto-detect
6. Aura Deepening — 3 rhythms (gentle/pulse/sweep) tied to chr + atmosphere

## Sacred preservation
- 14+ page sections ✓
- 391 qcalc ✓
- 27 Upg.* APIs (26 + Upg.ritual) ✓
- W16 Upg.aura extended (not replaced) ✓
- All chr-* + tint tokens preserved ✓

## Devotion check
- All rituals have reduced-motion guards ✓
- Entry once-per-day (localStorage gate) ✓
- 0 audio assets / 0 lottie / 0 external ✓
- All Arabic-rooted (mashrabiya/mihrab/kashida/kalam/atmospheres) ✓"
```

— نهاية Worker 22.

🌟 **Devotion check final:** هل المنصة الآن طقسية كاملة؟ entry + reading + threshold + inkpot + atmosphere + aura كلها مُتجذّرة عربياً ومرتبطة ببعضها؟ → فتح PR، ثم Worker 23 (Deconstruction).
