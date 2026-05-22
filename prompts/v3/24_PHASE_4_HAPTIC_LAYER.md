# 〰️ WORKER 24 — Phase 4/5 — Haptic Layer
> **اقرأ أولاً:** `prompts/v3/24_WORKER_DUAL_FORM.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phases 1-3.
> **الفلسفة:** *الـ haptic ليس feature — هو لمسة لُغة. حين يُجيب التطبيق بنبضة، يَفهم الإصبع قبل العَين. ٥ patterns كافية لكل اللغة.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/assets/js/upg-touch.js` | **EXTEND** بـ `haptic` namespace | تعديل swipe من P3 |
| `platform/assets/css/utilities.css` | **APPEND** haptic toggle UI styles | تعديل |
| `platform/index.html` (shell) | **AUGMENT** haptic toggle button في chrome | تغيير |
| `localStorage` | **CREATE** `upg_touch_haptic_enabled` key | لمس keys قائمة |

**Sacred preserved:**
- 30+ Upg.* APIs.
- Swipe behavior من Phase 3.
- 14 pages + 391 qcalc.

---

## 🎯 الهدف

Phase 4 يُضيف **5 haptic patterns**:

| ID | الاسم | Vibration pattern (ms) | الـ Trigger |
|---|---|---:|---|
| `tap` | لمسة | `[10]` | كل tap على button (subtle) |
| `success` | نجاح | `[15, 50, 15]` | qcalc complete, reading halo enter |
| `warn` | تحذير | `[40, 30, 40]` | warnings, validation issue |
| `error` | خطأ | `[80, 50, 80, 50, 80]` | hard error |
| `longpress` | ضَغطة طويلة | `[25, 40, 25, 40, 25]` | context menu, settings open |

**Discipline:**
- **opt-in only** — `localStorage.upg_touch_haptic_enabled === '1'`.
- Toggle UI في chrome (mobile only).
- Vibration API check before each call.
- لا spam — debounce 200ms minimum بين calls.
- لا حركة على tap في desktop (mouse).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT (Worker 24 / DUAL-FORM)
├─ Phase: 4/5 — Haptic Layer
├─ Estimated lines: ~380 (JS extend + CSS toggle UI + HTML toggle)
├─ Files to touch:
│   ├─ platform/assets/js/upg-touch.js   (EXTEND ~140 lines for haptic)
│   ├─ platform/assets/css/chrome.css    (APPEND haptic toggle ~80 lines)
│   └─ platform/index.html               (AUGMENT toggle button ~20 lines)
├─ Sacred verify (run BEFORE):
│   ├─ ls platform/assets/js/upg-touch.js                         → exists (W24 P3)
│   └─ grep -c 'attachSwipe' platform/assets/js/upg-touch.js      → ≥1
├─ Branch: continue worker-24-devotio
```

---

## 🧱 خطوات التنفيذ

### Step 1 — EXTEND `upg-touch.js` بـ haptic

في الملف الموجود، APPEND قبل `export function init()`:

```javascript
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Haptic Patterns (Worker 24 / Phase 4)
   Vibration API. Opt-in via localStorage.upg_touch_haptic_enabled.
   ════════════════════════════════════════════════════════════════════════ */

const STORAGE_HAPTIC_KEY = 'upg_touch_haptic_enabled';
const HAPTIC_DEBOUNCE_MS = 200;

const HAPTIC_PATTERNS = {
  tap:        [10],
  success:    [15, 50, 15],
  warn:       [40, 30, 40],
  error:      [80, 50, 80, 50, 80],
  longpress:  [25, 40, 25, 40, 25]
};

let lastHapticAt = 0;

const isHapticSupported = () =>
  typeof navigator !== 'undefined' &&
  typeof navigator.vibrate === 'function';

const isHapticEnabled = () => {
  try {
    return localStorage.getItem(STORAGE_HAPTIC_KEY) === '1';
  } catch { return false; }
};

const setHapticEnabled = (on) => {
  try {
    if (on) localStorage.setItem(STORAGE_HAPTIC_KEY, '1');
    else    localStorage.removeItem(STORAGE_HAPTIC_KEY);
    document.body.setAttribute('data-haptic-enabled', on ? 'true' : 'false');
  } catch { /* ignore */ }
};

const triggerHaptic = (patternId) => {
  if (!isHapticSupported() || !isHapticEnabled()) return false;

  const pattern = HAPTIC_PATTERNS[patternId];
  if (!pattern) {
    console.warn('[Upg.touch.haptic] Unknown pattern:', patternId);
    return false;
  }

  // Debounce
  const now = Date.now();
  if (now - lastHapticAt < HAPTIC_DEBOUNCE_MS) return false;
  lastHapticAt = now;

  navigator.vibrate(pattern);
  return true;
};

const listHaptic = () => Object.keys(HAPTIC_PATTERNS);
const getHapticPattern = (id) => HAPTIC_PATTERNS[id] ? [...HAPTIC_PATTERNS[id]] : null;

// ─── Auto-trigger haptic on existing events ─────────────────────────

const attachAutoHaptic = () => {
  // Tap on bottom nav items
  document.addEventListener('click', (e) => {
    if (e.target.closest('.dual-bottom-nav-item')) {
      triggerHaptic('tap');
    }
  });

  // Success — reading halo enter
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === '.') {
      // Will trigger after halo activates
      setTimeout(() => {
        if (window.Upg?.ritual?.isHaloActive?.()) {
          triggerHaptic('success');
        }
      }, 100);
    }
  });

  // Success — qcalc complete (listen for upg:calc:complete event)
  document.addEventListener('upg:calc:complete', () => triggerHaptic('success'));

  // Error — qcalc validation error
  document.addEventListener('upg:calc:error', () => triggerHaptic('error'));
  document.addEventListener('upg:warning', () => triggerHaptic('warn'));

  // Long-press — context menu trigger
  let pressTimer = null;
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    if (pressTimer) clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      triggerHaptic('longpress');
    }, 500);
  });
  document.addEventListener('pointerup',     () => { if (pressTimer) clearTimeout(pressTimer); });
  document.addEventListener('pointercancel', () => { if (pressTimer) clearTimeout(pressTimer); });
};

// ─── Toggle UI handler ────────────────────────────────────────────────

const setupHapticToggle = () => {
  // Set initial body attribute reflecting localStorage state
  document.body.setAttribute('data-haptic-enabled', isHapticEnabled() ? 'true' : 'false');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-haptic-toggle]');
    if (!btn) return;
    const wasEnabled = isHapticEnabled();
    setHapticEnabled(!wasEnabled);
    if (!wasEnabled) {
      // Confirmation pulse
      setTimeout(() => triggerHaptic('success'), 50);
    }
  });
};
```

ثم في `export function init()` الموجود، أضف:

```javascript
export function init() {
  // ... existing setup (page swipe, calc swipe, dismiss swipe) ...

  // W24 P4 ADD:
  if (isHapticSupported()) {
    attachAutoHaptic();
    setupHapticToggle();
  }

  // Expose haptic API
  window.Upg.touch.haptic = {
    enable:  () => setHapticEnabled(true),
    disable: () => setHapticEnabled(false),
    toggle:  () => setHapticEnabled(!isHapticEnabled()),
    isEnabled: isHapticEnabled,
    isSupported: isHapticSupported,
    trigger: triggerHaptic,
    list: listHaptic,
    pattern: getHapticPattern,
    PATTERNS: { ...HAPTIC_PATTERNS }
  };
}
```

### Step 2 — AUGMENT toggle button في `index.html`

في chrome bar (mobile-only area), AUGMENT:

```html
<!-- ════════════════════════════════════════════════════════════════════
     DUAL-FORM v3 — Haptic Toggle (Worker 24 / Phase 4)
     Mobile-only. Hidden on desktop.
     ════════════════════════════════════════════════════════════════════ -->
<button type="button"
        id="dual-haptic-toggle"
        class="dual-haptic-toggle"
        data-haptic-toggle
        data-mobile-only
        aria-label="تَفعيل الـ haptic"
        title="تَفعيل الإحساس اللمسي">
  <svg class="dual-haptic-icon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
  </svg>
</button>
```

### Step 3 — APPEND CSS

في `platform/assets/css/chrome.css`:

```css
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Haptic Toggle (Worker 24 / Phase 4)
   ════════════════════════════════════════════════════════════════════════ */

.dual-haptic-toggle {
  display: none;  /* default hidden */
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 160ms, border-color 160ms, background 160ms;
}

@media (max-width: 720px) {
  .dual-haptic-toggle {
    display: inline-flex;
  }
}

.dual-haptic-toggle:hover,
.dual-haptic-toggle:focus-visible {
  color: var(--color-text);
  border-color: var(--color-tint, var(--chr-lapis-500));
  background: color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 12%, transparent);
}

/* When enabled — accent color */
body[data-haptic-enabled="true"] .dual-haptic-toggle {
  color: var(--color-tint, var(--chr-lapis-500));
  border-color: var(--color-tint, var(--chr-lapis-500));
}
body[data-haptic-enabled="true"] .dual-haptic-toggle::after {
  content: "";
  position: absolute;
  top: 4px;
  inset-inline-end: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-tint, var(--chr-lapis-500));
  box-shadow: 0 0 6px currentColor;
}

.dual-haptic-icon {
  width: 20px;
  height: 20px;
}

/* Pulse animation on toggle (visual only — actual haptic via JS) */
@keyframes dual-haptic-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
}
.dual-haptic-toggle:active .dual-haptic-icon {
  animation: dual-haptic-pulse 200ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .dual-haptic-toggle:active .dual-haptic-icon {
    animation: none;
  }
}
```

### Step 4 — Discipline Comment

```javascript
/* ════════════════════════════════════════════════════════════════════════
   Worker 24 / Phase 4 — Haptic Discipline:
   1. opt-in only — localStorage.upg_touch_haptic_enabled = '1'.
   2. ٥ patterns ثابتة — لا تَخلق pattern جديد.
   3. Vibration API check قبل كل call.
   4. Debounce 200ms — لا spam.
   5. Mouse events لا تُفعّل haptic (tablet stylus excluded too).
   6. لو navigator.vibrate غير موجود (iOS Safari), API يَعمل no-op silently.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Patterns defined
grep -c 'HAPTIC_PATTERNS' platform/assets/js/upg-touch.js         # → ≥3
grep -c "tap:\s*\[10\]" platform/assets/js/upg-touch.js           # → ≥1

# Toggle button
grep -c 'dual-haptic-toggle' platform/index.html                  # → 1
grep -c 'dual-haptic-toggle' platform/assets/css/chrome.css       # → ≥3

# Mobile-only CSS
grep -A 3 'dual-haptic-toggle' platform/assets/css/chrome.css | grep -c 'max-width: 720px'  # → ≥1

# API
grep -c 'Upg.touch.haptic' platform/assets/js/upg-touch.js        # → ≥1

# Browser test (Android mobile or supports vibration):
# Console: Upg.touch.haptic.isSupported() → true (mobile) or false (desktop)
# Tap toggle → enabled
# Tap bottom nav item → tap haptic
# Cmd+. → success haptic on halo enter
# qcalc complete → success haptic
# Long-press → longpress haptic after 500ms
# Reduced-motion: haptic still works (haptic ≠ animation)
```

---

## ✅ معايير القبول (Phase 4)

- [ ] 5 patterns defined.
- [ ] Vibration API support check.
- [ ] opt-in via localStorage.
- [ ] Debounce 200ms.
- [ ] Auto-haptic on tap, halo, qcalc complete/error, longpress.
- [ ] Toggle UI mobile-only.
- [ ] `Upg.touch.haptic` API: enable/disable/toggle/isEnabled/isSupported/trigger/list/pattern.
- [ ] Body[data-haptic-enabled] reflects state.
- [ ] Console: 0 errors.
- [ ] Desktop: zero impact.

---

## 📤 Commit + Push

```bash
git add platform/assets/js/upg-touch.js platform/index.html platform/assets/css/chrome.css
git commit -m "phase 4 (devotio): haptic layer — 5 patterns (tap/success/warn/error/longpress), opt-in toggle, auto-trigger on bottom nav + halo + qcalc, Upg.touch.haptic API"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-24-phase-4.json
git commit -m "state: devotio phase 4 (worker 24) committed and pushed"
# push immediately
```

— نهاية Phase 4.

〰️ **Devotion check:** هل الـ haptic يَتكلَّم؟ → Phase 5 (Print Atelier).
