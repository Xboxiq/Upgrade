# 🖋️ WORKER 22 — Phase 4/6 — Inkpot Feedback
> **اقرأ أولاً:** `prompts/v3/22_WORKER_RITUAL_UI.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phases 1-3.
> **الفلسفة:** *الـ ripple العام مادة. الـ Inkpot عربي. حين تَلمس عنصراً، يَنتشر منه حِبر، تَتمدّد كَشيدة، تَنطلق ضربة قَلَم. اللمسة تَحكي.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Inkpot Feedback` (~340 سطر) | تعديل قواعد قائمة |
| `style.css` `:root` | **APPEND** 6 inkpot tokens | تعديل tokens |
| `index.html` | **AUGMENT** `data-rit-ink` على ≤30 عنصر تفاعلي | تغيير DOM |
| `app.js` | **EXTEND** `Upg.ritual` بـ `inkpot` namespace | لمس IIFEs |

**Sacred preserved:**
- جميع W12+W16 hover/click effects (لا نَستبدل، نُضيف فوقها).
- 27 Upg.* APIs.

---

## 🎯 الهدف

Phase 4 يَستبدل الـ ripples العامة بـ٣ تأثيرات عربية الجذر:

| ID | الاسم | الوصف | الـ Pattern |
|---|---|---|---|
| `ink-spread` | انتشار حِبر | نقطة سوداء/مَلوّنة تَنتشر كأنّها على ورق | radial fade |
| `kashida-pull` | شَدّة كَشيدة | خطٌّ أفقي يَمتدّ من الـ click نحو حافة العنصر | horizontal stretch |
| `kalam-stroke` | ضَربة قَلَم | ضَربة قُطرية كأنّها كَلام (قَلَم القَصب) | diagonal sweep |

**التطبيق:**
- **افتراضياً:** كل button + link يَستعمل `ink-spread`.
- **chr-tint-aware:** الـ ink يأخذ لون tint الصفحة الحالية.
- **Per-personality:** بعض الـ personalities تَستعمل variants خاصة (callcenter = `kalam-stroke`، psych = `kashida-pull`).
- **Reduced-motion:** instant pulse 0.1s.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT (Worker 22 / RITUAL UI)
├─ Phase: 4/6 — Inkpot Feedback
├─ Estimated lines: ~460 (CSS ~340 + JS ~100 + HTML ~30 augments)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~340 lines)
│   ├─ platform/assets/app.js      (EXTEND Upg.ritual.inkpot ~100 lines)
│   └─ platform/index.html         (AUGMENT data-rit-ink on ≤30 elements)
├─ Sacred verify:
│   ├─ grep -c '\-\-color-tint' platform/assets/style.css         → ≥15 (W21)
│   └─ grep -c 'Upg.ritual' platform/assets/app.js                → ≥1 (P1)
├─ Branch: continue worker-22-devotio
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Inkpot Tokens

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Inkpot Tokens (Worker 22 / Phase 4)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  --rit-ink-duration:        420ms;
  --rit-ink-easing:          cubic-bezier(0.4, 0, 0.2, 1);
  --rit-ink-color:           color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 60%, transparent);
  --rit-ink-color-soft:      color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 25%, transparent);
  --rit-ink-spread-size:     50%;
  --rit-ink-kalam-thickness: 2px;
}
```

### Step 2 — Inkpot CSS — 3 variants

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Inkpot Feedback (Worker 22 / Phase 4)
   ────────────────────────────────────────────────────────────────────────
   Apply via [data-rit-ink="ink-spread|kashida-pull|kalam-stroke"]
   or class .rit-ink-<variant>.
   The element MUST have position: relative (we add it via the rule).
   ════════════════════════════════════════════════════════════════════════ */

/* ─── Container setup ─── */
[data-rit-ink],
.rit-ink-spread,
.rit-ink-kashida,
.rit-ink-kalam {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

/* ─── 1. INK-SPREAD (radial fade from click point) ─── */
[data-rit-ink="ink-spread"]::before,
.rit-ink-spread::before {
  content: "";
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle,
    var(--rit-ink-color)      0%,
    var(--rit-ink-color-soft) 50%,
    transparent               80%);
  opacity: 0;
  z-index: 0;
  /* Position + size set by JS via CSS custom props */
  top: var(--rit-ink-y, 50%);
  left: var(--rit-ink-x, 50%);
  width: var(--rit-ink-size, 0);
  height: var(--rit-ink-size, 0);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
[data-rit-ink="ink-spread"][data-rit-ink-active="true"]::before,
.rit-ink-spread.rit-ink-active::before {
  animation: rit-ink-spread var(--rit-ink-duration) var(--rit-ink-easing) forwards;
}

@keyframes rit-ink-spread {
  0% {
    width:  0;
    height: 0;
    opacity: 0.7;
  }
  60% {
    opacity: 0.45;
  }
  100% {
    width:  var(--rit-ink-spread-size);
    height: var(--rit-ink-spread-size);
    opacity: 0;
  }
}

/* ─── 2. KASHIDA-PULL (horizontal stretch line) ─── */
[data-rit-ink="kashida-pull"]::after,
.rit-ink-kashida::after {
  content: "";
  position: absolute;
  pointer-events: none;
  height: 2px;
  background: linear-gradient(90deg,
    transparent              0%,
    var(--rit-ink-color)    50%,
    transparent             100%);
  opacity: 0;
  bottom: 0;
  left: var(--rit-ink-x, 50%);
  width: 0;
  transform: translateX(-50%);
  z-index: 0;
}
[data-rit-ink="kashida-pull"][data-rit-ink-active="true"]::after,
.rit-ink-kashida.rit-ink-active::after {
  animation: rit-ink-kashida-pull var(--rit-ink-duration) var(--rit-ink-easing) forwards;
}

@keyframes rit-ink-kashida-pull {
  0% {
    width: 0;
    opacity: 0.9;
  }
  60% {
    width: 80%;
    opacity: 0.7;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
}

/* ─── 3. KALAM-STROKE (diagonal sweep — calligraphic pen) ─── */
[data-rit-ink="kalam-stroke"]::before,
.rit-ink-kalam::before {
  content: "";
  position: absolute;
  pointer-events: none;
  inset: 0;
  background: linear-gradient(135deg,
    transparent 0%,
    transparent 45%,
    var(--rit-ink-color) 50%,
    transparent 55%,
    transparent 100%);
  background-size: 300% 300%;
  background-position: 100% 100%;
  opacity: 0;
  z-index: 0;
}
[data-rit-ink="kalam-stroke"][data-rit-ink-active="true"]::before,
.rit-ink-kalam.rit-ink-active::before {
  animation: rit-ink-kalam-stroke var(--rit-ink-duration) var(--rit-ink-easing) forwards;
}

@keyframes rit-ink-kalam-stroke {
  0% {
    opacity: 0;
    background-position: 100% 100%;
  }
  40% {
    opacity: 0.8;
    background-position: 50% 50%;
  }
  100% {
    opacity: 0;
    background-position: 0% 0%;
  }
}

/* ─── Per-personality auto-routing ─── */
[data-page-personality="callcenter"]    [data-rit-ink="auto"],
[data-page-personality="negotiation"]   [data-rit-ink="auto"],
[data-page-personality="lab"]           [data-rit-ink="auto"] {
  /* These pages use kalam-stroke automatically when data-rit-ink="auto" */
}
[data-page-personality="callcenter"]    [data-rit-ink="auto"]::before,
[data-page-personality="negotiation"]   [data-rit-ink="auto"]::before,
[data-page-personality="lab"]           [data-rit-ink="auto"]::before {
  background: linear-gradient(135deg,
    transparent 0%, transparent 45%,
    var(--rit-ink-color) 50%,
    transparent 55%, transparent 100%);
}

[data-page-personality="psych"]         [data-rit-ink="auto"]::after,
[data-page-personality="eq"]            [data-rit-ink="auto"]::after,
[data-page-personality="hrmastery"]     [data-rit-ink="auto"]::after {
  /* These use kashida-pull */
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--rit-ink-color) 50%, transparent 100%);
  bottom: 0;
}

/* ─── Ensure interactive elements are inkpot-ready ─── */
button:not(.rit-ink-bare),
a[role="button"]:not(.rit-ink-bare),
.bento-card:not(.rit-ink-bare),
.qcalc-button:not(.rit-ink-bare) {
  position: relative;
  /* JS will add data-rit-ink="ink-spread" on hover/focus */
}

/* ════════════════════════════════════════════════════════════════════════
   Reduced-Motion — instant single-frame flash
   ════════════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  [data-rit-ink][data-rit-ink-active="true"]::before,
  [data-rit-ink][data-rit-ink-active="true"]::after {
    animation-duration: 80ms !important;
  }
}

/* End RITUAL UI v3 / Phase 4 — Inkpot Feedback ──────────────────────── */
```

### Step 3 — `Upg.ritual.inkpot` JS

```javascript
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Inkpot Feedback Logic (Worker 22 / Phase 4)
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.ritual) return;

  const VARIANTS = ['ink-spread', 'kashida-pull', 'kalam-stroke', 'auto'];

  const PERSONALITY_INK_VARIANTS = {
    'dashboard':   'ink-spread',
    'callcenter':  'kalam-stroke',
    'fieldsales':  'ink-spread',
    'accountmgr':  'kashida-pull',
    'social':      'ink-spread',
    'lab':         'kalam-stroke',
    'psych':       'kashida-pull',
    'eq':          'kashida-pull',
    'negotiation': 'kalam-stroke',
    'customercare':'ink-spread',
    'programming': 'kalam-stroke',
    'accounting':  'kashida-pull',
    'phonerepair': 'ink-spread',
    'hrmastery':   'kashida-pull',
    'myprogress':  'ink-spread',
    'curriculum':  'ink-spread'
  };

  const getCurrentPersonality = () => {
    const activePage = document.querySelector('section.page:not([hidden])');
    return activePage ? activePage.getAttribute('data-page-personality') : null;
  };

  const resolveVariant = (variant, el) => {
    if (variant && VARIANTS.includes(variant) && variant !== 'auto') return variant;
    // Auto: derive from active page personality
    const personality = getCurrentPersonality();
    return PERSONALITY_INK_VARIANTS[personality] || 'ink-spread';
  };

  const trigger = (el, e) => {
    if (!el) return;
    let variant = el.getAttribute('data-rit-ink');
    variant = resolveVariant(variant, el);

    // Set --rit-ink-x and --rit-ink-y to click coordinates
    if (e && e.clientX !== undefined) {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--rit-ink-x', `${x}%`);
      el.style.setProperty('--rit-ink-y', `${y}%`);
    }

    // Adjust size based on element dimensions
    const rect = el.getBoundingClientRect();
    const maxDim = Math.max(rect.width, rect.height) * 2;
    el.style.setProperty('--rit-ink-size', `${maxDim}px`);

    // Activate variant if not already
    if (el.getAttribute('data-rit-ink') !== variant) {
      el.setAttribute('data-rit-ink', variant);
    }

    // Trigger animation
    el.removeAttribute('data-rit-ink-active');
    void el.offsetWidth;  // force reflow
    el.setAttribute('data-rit-ink-active', 'true');

    // Cleanup after duration
    setTimeout(() => {
      el.removeAttribute('data-rit-ink-active');
    }, 500);
  };

  // Auto-attach to all interactive elements
  const attachToInteractive = () => {
    const sels = ['button', 'a[role="button"]', '.bento-card', '.qcalc-button', '.tas-voice-ui'];
    document.querySelectorAll(sels.join(',')).forEach((el) => {
      if (el.classList.contains('rit-ink-bare')) return;
      if (!el.hasAttribute('data-rit-ink')) {
        el.setAttribute('data-rit-ink', 'auto');
      }
    });
  };

  // Single global listener — delegate
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-rit-ink]');
    if (!target) return;
    trigger(target, e);
  }, { passive: true });

  // Init on load + page navigation
  if (document.readyState !== 'loading') attachToInteractive();
  else document.addEventListener('DOMContentLoaded', attachToInteractive);
  document.addEventListener('upg:nav:change', () => {
    setTimeout(attachToInteractive, 30);
  });

  // Extend Upg.ritual
  window.Upg.ritual.inkpot = {
    trigger,
    attach: attachToInteractive,
    listVariants: () => VARIANTS.slice(),
    personalityMap: () => ({ ...PERSONALITY_INK_VARIANTS }),
    setPersonalityVariant: (personality, variant) => {
      if (VARIANTS.includes(variant)) {
        PERSONALITY_INK_VARIANTS[personality] = variant;
      }
    }
  };
})(window, document);
```

### Step 4 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 22 / Phase 4 — Inkpot Discipline:
   1. ٣ variants فقط (+auto للروتنج).
   2. Total duration ≤ 420ms.
   3. reduced-motion → 80ms flash.
   4. لا تستعمل Inkpot على عناصر غير تفاعلية (لا hover على labels/headers).
   5. .rit-ink-bare class يَستثني عنصر من auto-attach.
   6. الـ ink color = --color-tint الصفحة الحالية تلقائياً.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
grep -c '@keyframes rit-ink-' platform/assets/style.css           # → ≥3
grep -c 'data-rit-ink' platform/assets/style.css                  # → ≥6
grep -c '\-\-rit-ink-' platform/assets/style.css                  # → ≥6
grep -c 'PERSONALITY_INK_VARIANTS' platform/assets/app.js         # → ≥1
grep -c 'Upg.ritual.inkpot' platform/assets/app.js                # → ≥1

# Browser test:
# Click button on dashboard → ink-spread (radial)
# Click button on callcenter → kalam-stroke (diagonal)
# Click button on psych → kashida-pull (horizontal line bottom)
# Reduced-motion → fast 80ms flash
```

---

## ✅ معايير القبول (Phase 4)

- [ ] 6 inkpot tokens.
- [ ] 3 variants × keyframes.
- [ ] Auto-attach to interactive elements.
- [ ] Per-personality routing 16 mappings.
- [ ] Click coordinates → CSS custom props (--rit-ink-x/y/size).
- [ ] reduced-motion → 80ms.
- [ ] `Upg.ritual.inkpot` API: trigger, attach, listVariants, personalityMap, setPersonalityVariant.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js platform/index.html
git commit -m "phase 4 (devotio): inkpot feedback — 3 arabic-rooted variants (ink-spread/kashida-pull/kalam-stroke), per-personality routing, Upg.ritual.inkpot API"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-22-phase-4.json
git commit -m "state: devotio phase 4 (worker 22) committed and pushed"
# push immediately
```

— نهاية Phase 4.

🖋️ **Devotion check:** هل النَقْر صار حِبراً عربياً؟ → Phase 5 (Time-of-Day).
