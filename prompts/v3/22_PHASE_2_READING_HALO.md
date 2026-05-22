# 📖 WORKER 22 — Phase 2/6 — Reading Halo
> **اقرأ أولاً:** `prompts/v3/22_WORKER_RITUAL_UI.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (Upg.ritual API initiated).
> **الفلسفة:** *القراءة طقس عميق. الواجهة لازم تَتنحّى عند طلبها — تَخفت، تَهدأ، تُسلّم الانتباه للمحتوى. Cmd+. = حضور الصمت.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Reading Halo` (~320 سطر) | تعديل قواعد قائمة |
| `style.css` `:root` | **APPEND** 6 halo tokens | تعديل tokens |
| `index.html` | **AUGMENT** فقط — إضافة `<button id="rit-halo-toggle">` للـ chrome (موجود من Pack v1) | تغيير DOM |
| `app.js` | **EXTEND** `Upg.ritual` بـ `enterHalo`, `exitHalo`, `toggleHalo`, `isHaloActive` | لمس IIFEs قائمة |

**Sacred preserved:**
- جميع 27 Upg.* APIs من Phase 1.
- Reading mode ما إن وُجد من Pack v2 W18 (نتعامل معه كـ partner).
- 14 page sections + 391 qcalc.

---

## 🎯 الهدف

Phase 2 يُنشئ **Reading Halo** — zen mode حقيقي:

**التشغيل:**
- `Cmd+.` (Mac) / `Ctrl+.` (Win) toggle.
- أو button في الـ chrome يحمل أيقونة دائرة-بنقطة.
- أو `Upg.ritual.enterHalo(targetSelector)` programmatic.

**التأثير:**
1. Chrome (sidebar, header, footer) ↓ opacity 0.15 + blur 4px.
2. الـ scoped article (page-content أو selected element) → border halo Lapis glow + raised shadow.
3. Background dims إلى Mihrab 900 (dark) أو Marble 50 (light).
4. الـ navigation pointer events يَعطل (لا scroll بعيد).
5. ESC أو click خارج الـ article = exit.
6. الـ `localStorage` يحفظ آخر selector نَشَط (لو تَدخُل halo نفس المكان مرة أخرى).

**Discipline:**
- لا transition أعلى من 480ms.
- reduced-motion: instant toggle (0ms).
- لا يُعطّل keyboard navigation (لازم accessible).
- لا يُعطّل skip-link (a11y).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT (Worker 22 / RITUAL UI)
├─ Phase: 2/6 — Reading Halo
├─ Estimated lines: ~480 (CSS ~320 + JS ~140 + HTML ~20 augments)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~320 lines)
│   ├─ platform/assets/app.js      (EXTEND Upg.ritual ~140 lines)
│   └─ platform/index.html         (AUGMENT chrome with toggle button)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'Upg.ritual' platform/assets/app.js                → ≥1 (P1)
│   ├─ grep -c '\-\-chr-lapis-' platform/assets/style.css         → 10
│   └─ grep -c 'data-page-personality' platform/index.html        → 15
├─ Branch: continue worker-22-devotio
└─ No new fonts, no audio, no new keyframes (uses transitions only).
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Halo Tokens

في `:root`، **APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Reading Halo Tokens (Worker 22 / Phase 2)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  --rit-halo-duration:      480ms;
  --rit-halo-easing:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --rit-halo-chrome-opacity: 0.15;
  --rit-halo-chrome-blur:   4px;
  --rit-halo-glow-color:    var(--chr-lapis-500);
  --rit-halo-bg-veil:       color-mix(in oklch, var(--chr-mihrab-900) 78%, transparent);
}

[data-theme="light"] {
  --rit-halo-bg-veil:       color-mix(in oklch, var(--chr-marble-50) 88%, transparent);
}
```

### Step 2 — Halo CSS

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Reading Halo (Worker 22 / Phase 2)
   ────────────────────────────────────────────────────────────────────────
   Activated by [data-rit-halo="active"] on body.
   Selected element gets [data-rit-halo-target] attribute.
   ════════════════════════════════════════════════════════════════════════ */

/* Body in halo state */
body[data-rit-halo="active"] {
  position: relative;
}

/* Chrome elements dim (sidebar, header, command palette toggle, breadcrumbs) */
body[data-rit-halo="active"] .sidebar,
body[data-rit-halo="active"] .top-chrome,
body[data-rit-halo="active"] .breadcrumb,
body[data-rit-halo="active"] header.app-header,
body[data-rit-halo="active"] footer.app-footer,
body[data-rit-halo="active"] .nav-rail,
body[data-rit-halo="active"] .cmdk-trigger,
body[data-rit-halo="active"] .qcalc-toolbar,
body[data-rit-halo="active"] .stat-tile-row {
  opacity: var(--rit-halo-chrome-opacity);
  filter: blur(var(--rit-halo-chrome-blur));
  pointer-events: none;
  user-select: none;
  transition: opacity var(--rit-halo-duration) var(--rit-halo-easing),
              filter var(--rit-halo-duration) var(--rit-halo-easing);
}

/* Veil over background */
body[data-rit-halo="active"]::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 800;
  background: var(--rit-halo-bg-veil);
  backdrop-filter: blur(2px);
  pointer-events: none;
  opacity: 0;
  animation: rit-halo-veil-in var(--rit-halo-duration) var(--rit-halo-easing) forwards;
}

@keyframes rit-halo-veil-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Selected target — raised, glowing, focused */
[data-rit-halo-target] {
  position: relative;
  z-index: 900;
  border-radius: 1rem;
  background: var(--color-surface-1);
  box-shadow:
    0 0 0 1px color-mix(in oklch, var(--rit-halo-glow-color) 30%, transparent),
    0 0 60px color-mix(in oklch, var(--rit-halo-glow-color) 25%, transparent),
    var(--shadow-c-xl);
  transition:
    box-shadow var(--rit-halo-duration) var(--rit-halo-easing),
    transform  var(--rit-halo-duration) var(--rit-halo-easing);
  transform: scale(1.005);
  /* Ensure body padding so target doesn't touch viewport edges */
  margin: clamp(1rem, 4vw, 3rem) auto;
  max-width: min(72ch, 90vw);
  padding: clamp(1.5rem, 4vw, 3rem);
}

/* Pulse outline on target — subtle, lapis */
[data-rit-halo-target]::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(135deg,
    color-mix(in oklch, var(--rit-halo-glow-color) 40%, transparent),
    transparent 50%,
    color-mix(in oklch, var(--rit-halo-glow-color) 25%, transparent));
  opacity: 0;
  z-index: -1;
  animation: rit-halo-edge-pulse 4s ease-in-out infinite;
}

@keyframes rit-halo-edge-pulse {
  0%, 100% { opacity: 0.20; }
  50%      { opacity: 0.45; }
}

/* Halo exit button (top-right of target) */
.rit-halo-exit {
  position: absolute;
  top: 0.75rem;
  inset-inline-end: 0.75rem;
  background: color-mix(in oklch, var(--color-surface-2) 80%, transparent);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  transition: background 160ms, color 160ms, border-color 160ms;
  z-index: 10;
}
.rit-halo-exit:hover {
  background: color-mix(in oklch, var(--rit-halo-glow-color) 18%, var(--color-surface-2));
  color: var(--color-text);
  border-color: var(--rit-halo-glow-color);
}

/* Toggle button in chrome */
.rit-halo-toggle {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-family: var(--type-voice-ui);
  font-size: 0.875rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 160ms, color 160ms, border-color 160ms;
}
.rit-halo-toggle::before {
  content: "";
  width: 0.6rem;
  height: 0.6rem;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: relative;
}
.rit-halo-toggle:hover {
  background: color-mix(in oklch, var(--rit-halo-glow-color) 12%, transparent);
  border-color: var(--rit-halo-glow-color);
  color: var(--color-text);
}
body[data-rit-halo="active"] .rit-halo-toggle::after {
  content: "نَشَط";
  font-size: 0.75rem;
  color: var(--rit-halo-glow-color);
}

/* ════════════════════════════════════════════════════════════════════════
   Reduced-Motion — instant toggle, no transitions
   ════════════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  body[data-rit-halo="active"] .sidebar,
  body[data-rit-halo="active"] .top-chrome,
  body[data-rit-halo="active"] header.app-header,
  body[data-rit-halo="active"]::after,
  [data-rit-halo-target],
  [data-rit-halo-target]::before {
    transition: none !important;
    animation: none !important;
  }
}

/* End RITUAL UI v3 / Phase 2 — Reading Halo ─────────────────────────── */
```

### Step 3 — Toggle Button في chrome (HTML)

ابحث في `index.html` عن chrome bar (top right area):

```html
<!-- Existing chrome (don't change) -->
<button class="cmdk-trigger" ...>...</button>

<!-- AUGMENT — add halo toggle next to it -->
<button type="button"
        id="rit-halo-toggle"
        class="rit-halo-toggle"
        aria-label="وضع القراءة (Cmd+.)"
        title="وضع القراءة (Cmd+.)"
        data-rit-halo-toggle>
  <span class="rit-halo-toggle-label tas-voice-ui">قراءة</span>
</button>
```

### Step 4 — EXTEND `Upg.ritual` (in app.js)

في **نفس IIFE** الذي كتبته في Phase 1، **EXTEND**:

> ملاحظة: في الواقع، نضيف IIFE جديد يلحقه ويُمدّد `window.Upg.ritual`:

```javascript
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Reading Halo Logic (Worker 22 / Phase 2)
   Extends Upg.ritual with halo methods.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.ritual) return;  // requires P1

  const STORAGE_KEY_LAST_HALO = 'upg_ritual_last_halo_target';
  const ATTR_BODY  = 'data-rit-halo';
  const ATTR_TARGET = 'data-rit-halo-target';

  let activeTarget = null;
  let exitButton = null;

  // Determine reasonable default target if no selector given
  const defaultTarget = () => {
    return document.querySelector('section.page:not([hidden]) .page-body') ||
           document.querySelector('section.page:not([hidden]) main') ||
           document.querySelector('section.page:not([hidden]) article') ||
           document.querySelector('section.page:not([hidden])');
  };

  const enterHalo = (targetOrSelector) => {
    const target = (typeof targetOrSelector === 'string')
      ? document.querySelector(targetOrSelector)
      : (targetOrSelector || defaultTarget());

    if (!target) return false;

    // Exit any existing halo first
    if (activeTarget && activeTarget !== target) exitHalo();

    target.setAttribute(ATTR_TARGET, '');
    document.body.setAttribute(ATTR_BODY, 'active');
    activeTarget = target;

    // Insert exit button
    exitButton = document.createElement('button');
    exitButton.type = 'button';
    exitButton.className = 'rit-halo-exit';
    exitButton.setAttribute('aria-label', 'خروج من وضع القراءة');
    exitButton.textContent = '×';
    exitButton.addEventListener('click', exitHalo);
    target.appendChild(exitButton);

    // Save selector for next session
    if (target.id) {
      try { localStorage.setItem(STORAGE_KEY_LAST_HALO, '#' + target.id); } catch {}
    }

    // Attach Esc listener
    document.addEventListener('keydown', onEscape);

    // Attach outside-click
    document.addEventListener('click', onOutsideClick, true);

    return true;
  };

  const exitHalo = () => {
    if (!activeTarget) return false;
    activeTarget.removeAttribute(ATTR_TARGET);
    document.body.removeAttribute(ATTR_BODY);

    if (exitButton && exitButton.parentNode) {
      exitButton.parentNode.removeChild(exitButton);
    }
    exitButton = null;
    activeTarget = null;

    document.removeEventListener('keydown', onEscape);
    document.removeEventListener('click', onOutsideClick, true);
    return true;
  };

  const toggleHalo = (targetOrSelector) => {
    if (activeTarget) return exitHalo();
    return enterHalo(targetOrSelector);
  };

  const isHaloActive = () => activeTarget !== null;

  const onEscape = (e) => {
    if (e.key === 'Escape') exitHalo();
  };

  const onOutsideClick = (e) => {
    if (!activeTarget) return;
    if (!activeTarget.contains(e.target) &&
        !e.target.classList.contains('rit-halo-toggle') &&
        !e.target.classList.contains('rit-halo-exit')) {
      exitHalo();
    }
  };

  // Cmd+. / Ctrl+. shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === '.') {
      e.preventDefault();
      toggleHalo();
    }
  });

  // Toggle button
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-rit-halo-toggle]')) {
      toggleHalo();
    }
  });

  // Extend Upg.ritual
  window.Upg.ritual.enterHalo    = enterHalo;
  window.Upg.ritual.exitHalo     = exitHalo;
  window.Upg.ritual.toggleHalo   = toggleHalo;
  window.Upg.ritual.isHaloActive = isHaloActive;

})(window, document);
```

### Step 5 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 22 / Phase 2 — Halo Discipline:
   1. Halo opt-in فقط — Cmd+. أو button.
   2. Chrome dims to 0.15 opacity + 4px blur — لا يَختفي تماماً (يبقى للوصول).
   3. Esc + outside-click + exit-button = exit.
   4. لا transition أعلى من 480ms.
   5. localStorage يحفظ آخر target — Phase 6 يستعمله.
   6. accessible: keyboard nav يبقى يعمل، tab يدور داخل الـ target.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 27 (preserved)

# New
grep -c 'rit-halo-toggle' platform/index.html                     # → ≥1
grep -c '\-\-rit-halo-' platform/assets/style.css                 # → ≥6
grep -c 'data-rit-halo' platform/assets/style.css                 # → ≥3
grep -c 'enterHalo\|exitHalo\|toggleHalo' platform/assets/app.js  # → ≥6

# Browser test:
# Open dashboard → Cmd+. → page-body raises with lapis glow, chrome dims
# Esc → exits
# Click chrome → also exits
# Toggle button in chrome → toggles
# Reduced motion → instant toggle (no transition)
```

---

## ✅ معايير القبول (Phase 2)

- [ ] 6 halo tokens.
- [ ] CSS: body[data-rit-halo="active"] dims chrome (sidebar, header, footer, etc.).
- [ ] CSS: [data-rit-halo-target] raises with Lapis halo glow.
- [ ] Cmd+. / Ctrl+. toggle works.
- [ ] Toggle button in chrome works.
- [ ] Esc + outside-click = exit.
- [ ] `Upg.ritual.enterHalo()`, `exitHalo()`, `toggleHalo()`, `isHaloActive()` معرَّفة.
- [ ] reduced-motion guard: instant toggle.
- [ ] localStorage saves last target ID.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js platform/index.html
git commit -m "phase 2 (devotio): reading halo — chrome dims, target glows lapis, Cmd+. toggle, Upg.ritual.enterHalo/exitHalo/toggleHalo"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-22-phase-2.json
git commit -m "state: devotio phase 2 (worker 22) committed and pushed"
# push immediately
```

— نهاية Phase 2.

📖 **Devotion check:** هل القراءة الآن طقس صامت؟ الـ chrome يَتنحّى؟ → Phase 3 (Threshold Transitions).
