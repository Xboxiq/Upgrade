# 🌟 WORKER 16 — Phase 6/6 — Identity Auras (14 Page Halos)
> **اقرأ أولاً:** `prompts/v2/16_WORKER_VITAL_UI.md`.
> **يبني فوق:** Phase 1 (Living Surfaces) + Phase 4 (Pointer Companion) + W15 (per-page personalities).
> **الفلسفة:** *كل صفحة لها هالة. لا فقط لون tint، بل ambient signature كاملة. callcenter sharp + cool، psych warm + literary، programming digital + green pulse، accounting precise + amber depth.*

---

## 🛡️ Preservation Contract (Phase 6)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` tokens | **APPEND** 14 aura signatures (`--aura-<page>-from/to/glow`) | تعديل tints HSL |
| `style.css` rules | **APPEND** 14 selectors `[data-page-personality="X"] .life-ambient` overrides | تكسير W15 personality bindings |
| `app.js` | **APPEND** IIFE `Upg.aura` (≤140 سطر) | تعديل Upg.life/type2 |
| `index.html` | لا تُلمَس (يستهلك `data-page-personality` الموجود من W15) | أي تعديل |



---

## 🎯 الهدف

1. **14 aura signatures** — لكل صفحة من الـ 14 صفحة (+gateway), aura tokens خاصة:
   - `dashboard` — neutral elegance
   - `callcenter` — sharp blue-cyan (alert, professional)
   - `fieldsales` — energetic warm orange
   - `accountmgr` — executive deep blue
   - `social` — vibrant pink-purple
   - `lab` — experimental electric magenta
   - `psych` — literary warm amber
   - `eq` — emotional rose-gold
   - `negotiation` — persuasive gold
   - `customercare` — warm green
   - `programming` — digital lime-green
   - `accounting` — precise amber-mustard
   - `phonerepair` — technical steel-blue
   - `hrmastery` — formal navy
   - `myprogress` — reflective slate

2. **Auto-apply** — كل aura يُطبَّق تلقائياً عبر selector `[data-page-personality="X"]` على عناصر `.life-ambient` و `.life-mesh` و `.life-surface`.

3. **`Upg.aura` API:**
   - `apply(personality)` — يضع aura على الـ body data-attribute كـ override يدوي.
   - `clear()` — يعيد الـ aura للـ inheritance من personality.
   - `current()` — يعيد الاسم الحالي.
   - `list()` — أسماء كل الـ 15 auras.
   - `preview(personality, durationMs)` — يطبّق aura مؤقتاً (للـ command palette preview).

4. **Pointer companion integration** — `--pointer-trail-color` يلتقط `--aura-*-glow` تلقائياً.



---

## 📋 PRE-FLIGHT

```
📋 PHASE 6 PRE-FLIGHT
├─ Phase: 6/6 — Identity Auras
├─ Estimated lines: ~520 (CSS ~380 + JS ~140)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~380)
│   └─ platform/assets/app.js      (APPEND ~140 IIFE)
├─ Sacred verify (run BEFORE):
│   ├─ Phases 1-5 sanity passed
│   ├─ grep -c 'data-page-personality' platform/index.html        → 15
│   └─ grep -oE 'window\.Upg\.[a-z0-9]+' | sort -u | wc -l         → 23 (life, transition, sound)
└─ Final phase — closes Worker 16.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Aura Tokens × 15 (one block)

```css
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Identity Auras (Worker 16 / Phase 6)
   15 page auras. Each consumes existing identity tints.
   ════════════════════════════════════════════════════════════════ */
:root {
  /* Default fallback aura (gateway / no-page) */
  --aura-default-from:  hsl(220 30% 50% / 0.10);
  --aura-default-to:    hsl(260 30% 50% / 0.06);
  --aura-default-glow:  hsl(220 50% 60%);
}

[data-page-personality="dashboard"] {
  --aura-from:  hsl(220 25% 55% / 0.12);
  --aura-to:    hsl(240 30% 50% / 0.07);
  --aura-glow:  hsl(220 60% 65%);
}
[data-page-personality="callcenter"] {
  --aura-from:  hsl(195 80% 55% / 0.14);
  --aura-to:    hsl(210 90% 50% / 0.08);
  --aura-glow:  hsl(195 90% 60%);
}
[data-page-personality="fieldsales"] {
  --aura-from:  hsl(28 90% 55% / 0.14);
  --aura-to:    hsl(15 85% 50% / 0.08);
  --aura-glow:  hsl(28 95% 60%);
}
[data-page-personality="accountmgr"] {
  --aura-from:  hsl(220 70% 45% / 0.14);
  --aura-to:    hsl(235 60% 35% / 0.08);
  --aura-glow:  hsl(220 80% 55%);
}
[data-page-personality="social"] {
  --aura-from:  hsl(320 75% 60% / 0.14);
  --aura-to:    hsl(285 65% 55% / 0.08);
  --aura-glow:  hsl(320 85% 65%);
}
[data-page-personality="lab"] {
  --aura-from:  hsl(295 80% 60% / 0.15);
  --aura-to:    hsl(265 75% 50% / 0.08);
  --aura-glow:  hsl(295 90% 65%);
}
[data-page-personality="psych"] {
  --aura-from:  hsl(35 70% 55% / 0.13);
  --aura-to:    hsl(20 60% 45% / 0.07);
  --aura-glow:  hsl(35 80% 60%);
}
[data-page-personality="eq"] {
  --aura-from:  hsl(345 65% 65% / 0.13);
  --aura-to:    hsl(15 55% 60% / 0.07);
  --aura-glow:  hsl(345 75% 70%);
}
[data-page-personality="negotiation"] {
  --aura-from:  hsl(45 80% 55% / 0.13);
  --aura-to:    hsl(35 70% 50% / 0.08);
  --aura-glow:  hsl(45 90% 60%);
}
[data-page-personality="customercare"] {
  --aura-from:  hsl(150 60% 50% / 0.13);
  --aura-to:    hsl(135 50% 45% / 0.07);
  --aura-glow:  hsl(150 70% 55%);
}
[data-page-personality="programming"] {
  --aura-from:  hsl(120 65% 50% / 0.14);
  --aura-to:    hsl(95 60% 45% / 0.08);
  --aura-glow:  hsl(120 75% 55%);
}
[data-page-personality="accounting"] {
  --aura-from:  hsl(48 75% 55% / 0.13);
  --aura-to:    hsl(38 65% 45% / 0.07);
  --aura-glow:  hsl(48 85% 60%);
}
[data-page-personality="phonerepair"] {
  --aura-from:  hsl(210 35% 55% / 0.13);
  --aura-to:    hsl(225 30% 45% / 0.07);
  --aura-glow:  hsl(210 50% 60%);
}
[data-page-personality="hrmastery"] {
  --aura-from:  hsl(225 45% 35% / 0.14);
  --aura-to:    hsl(245 40% 30% / 0.08);
  --aura-glow:  hsl(225 60% 50%);
}
[data-page-personality="myprogress"] {
  --aura-from:  hsl(215 20% 55% / 0.12);
  --aura-to:    hsl(225 18% 45% / 0.07);
  --aura-glow:  hsl(215 35% 60%);
}
```



### Step 2 — Auto-Apply Auras to Phase 1 Surfaces

```css
/* When a personality is set, override Phase 1 ambient tokens. */
[data-page-personality] .life-ambient::before,
[data-page-personality] [data-life="ambient"]::before,
[data-page-personality] .life-surface::before,
[data-page-personality] [data-life="surface"]::before {
  background:
    radial-gradient(var(--life-ambient-radius) 80% at 30% 30%,
      var(--aura-from, var(--life-ambient-from)) 0%, transparent 70%),
    radial-gradient(var(--life-ambient-radius) 70% at 75% 70%,
      var(--aura-to, var(--life-ambient-to)) 0%, transparent 75%);
}

[data-page-personality] .life-mesh::after,
[data-page-personality] [data-life="mesh"]::after {
  background:
    conic-gradient(from 0deg at 30% 30%,
      var(--aura-glow, var(--color-tint, var(--color-brand))),
      transparent 30%,
      var(--aura-from, transparent) 60%,
      transparent 90%);
}

/* Pointer trail picks up aura glow */
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  [data-page-personality] .pointer-trail {
    background: radial-gradient(circle, var(--aura-glow, var(--pointer-trail-color)) 0%, transparent 70%);
  }
}

/* Reduced-motion override (just in case) */
@media (prefers-reduced-motion: reduce) {
  [data-page-personality] .life-ambient::before,
  [data-page-personality] [data-life="ambient"]::before,
  [data-page-personality] .life-surface::before,
  [data-page-personality] [data-life="surface"]::before,
  [data-page-personality] .life-mesh::after,
  [data-page-personality] [data-life="mesh"]::after {
    animation: none !important;
  }
}

/* End VITAL UI v1 / Worker 16 / Phase 6 ─────────────────────────────────── */
```



### Step 3 — `Upg.aura` IIFE

```javascript
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Identity Auras (Worker 16 / Phase 6)
   ════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const AURAS = [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery', 'myprogress'
  ];

  const ATTR = 'data-page-personality';
  const OVERRIDE_ATTR = 'data-aura-override';

  // Apply aura override on body (forces all pages to use this aura).
  const apply = (name) => {
    if (!AURAS.includes(name)) {
      console.warn('[Upg.aura] Unknown aura:', name, '— available:', AURAS);
      return false;
    }
    document.body.setAttribute(OVERRIDE_ATTR, name);
    document.body.setAttribute(ATTR, name);
    document.dispatchEvent(new CustomEvent('upg:aura:change', { detail: { aura: name } }));
    return true;
  };

  // Clear override — pages return to their own personality.
  const clear = () => {
    document.body.removeAttribute(OVERRIDE_ATTR);
    document.body.removeAttribute(ATTR);
    document.dispatchEvent(new CustomEvent('upg:aura:change', { detail: { aura: null } }));
    return true;
  };

  // Get current aura (override or current page personality).
  const current = () => {
    return document.body.getAttribute(OVERRIDE_ATTR)
        || document.body.getAttribute(ATTR)
        || (() => {
             const p = document.querySelector('.page.active');
             return p ? p.getAttribute(ATTR) : null;
           })();
  };

  const list = () => AURAS.slice();

  // Preview an aura temporarily (useful for command palette).
  const preview = (name, durationMs) => {
    if (!AURAS.includes(name)) return false;
    const previousOverride = document.body.getAttribute(OVERRIDE_ATTR);
    apply(name);
    setTimeout(() => {
      if (previousOverride) document.body.setAttribute(OVERRIDE_ATTR, previousOverride);
      else clear();
    }, Math.max(200, durationMs || 1200));
    return true;
  };

  // Auto-init: nothing to wire (CSS does the work).
  window.Upg = window.Upg || {};
  window.Upg.aura = { apply, clear, current, list, preview };
})(window, document);
```



---

## 🧪 Sanity Probe

```bash
grep -c '\-\-aura-' platform/assets/style.css                     # → ≥45 (15 auras × 3 tokens)
grep -c 'data-page-personality' platform/assets/style.css         # → ≥6 (selectors)
grep -c 'Upg.aura' platform/assets/app.js                         # → ≥1
grep -oE 'window\.Upg\.[a-z0-9]+' platform/assets/app.js | sort -u | wc -l   # → 24 (was 23, +aura)
```

---

## ✅ معايير القبول (Phase 6 = Worker 16 Final)

- [ ] 15 aura signatures معرَّفة (1 default + 14 personality + gateway-as-default).
- [ ] auto-apply selectors تربط aura tokens مع life utilities من Phase 1.
- [ ] pointer trail يلتقط aura glow تلقائياً.
- [ ] `Upg.aura` API كاملاً (apply/clear/current/list/preview).
- [ ] reduced-motion guards كل ما سبق.
- [ ] Worker 16 totals: ≥3 new APIs (life, sound, aura) + ≥6 reduced-motion guards جديدة.
- [ ] جميع `Upg.*` السابقة (20) شغّالة بدون كسر.
- [ ] 14 page sections + 391 qcalc + 117 tints محفوظة.

---

## 📤 Commit + Push (Final phase = open PR)

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 6 (vital): identity auras — 14 page halos + Upg.aura + pointer integration"
# push immediately

# State final
git add state/PROGRESS.json state/snapshots/worker-16-phase-6.json
git commit -m "state: vital phase 6 committed and pushed — Worker 16 complete"
# push

# Open PR
gh pr create \
  --base main \
  --head worker-16-vital-ui \
  --title "feat: Worker 16 — VITAL UI RESONANCE (Pack v2)" \
  --body "Adds living surfaces, tactile microinteractions, cinematic transitions, pointer companion, opt-in sound design, and 14 identity auras. Adds Upg.life, Upg.sound, Upg.aura. Preserves all 20 prior APIs."
```

— نهاية Worker 16. 🌟 **Final check:** كل صفحة لها روح؟ نعم → جاهز للـ PR. ابدأ Worker 17 (CONTENT REVIVAL) في session جديد.
