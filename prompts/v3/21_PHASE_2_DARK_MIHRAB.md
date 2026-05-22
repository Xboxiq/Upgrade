# 🕯️ WORKER 21 — Phase 2/5 — Dark Mihrab
> **اقرأ أولاً:** `prompts/v3/21_WORKER_CHROMATIC_SOUL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (palette forged).
> **الفلسفة:** *Dark mode في معظم المنصات = Slate generic. Pack v3 يُحوّله إلى مِحراب — مكان للسجود، لا مكان للعمل المُجهَد. اللون الداكن يَحتضن، لا يُهَدّد.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root[data-theme="dark"]` block | **REPLACE-IN-PLACE** قيم `--color-bg`, `--color-surface-0/1/2/3`, `--color-text`, `--color-text-muted/faint`, `--color-border*`, `--color-brand*`, `--color-success/warning/danger/info`, `--shadow-c-*` | تغيير أسماء tokens، حذف أي token |
| `style.css` `:root` العام | **APPEND** dark-aware semantic tokens جديدة (`--chr-mihrab-text-on-bg`, ...) | تعديل defaults |
| `style.css` `:root[data-theme="light"]` (W12 P2 Linen-Bone) | **لا يُلمَس** — نسلّم بـ Worker 12 P2 العمل | أي تعديل |
| `index.html` | لا يُلمَس | أي تعديل |
| `app.js` | لا يُلمَس | أي تعديل |

**Sacred preserved:**
- جميع 12 palettes من Phase 1.
- جميع 15 `--tint-*` (Phase 3 يستبدل قيمها).
- W12 P2 Light theme (Linen-Bone) كاملاً.
- W12 tinted shadows (`--shadow-c-*`) — قيمها تتحدّث لكن أسماءها محفوظة.
- 14 page sections + 391 qcalc + 25 Upg.* APIs.

---

## 🎯 الهدف

Phase 2 يستبدل **dark theme فقط**:

1. **استبدال** قيم `--color-bg` و `--color-surface-0/1/2/3` بـ Mihrab Indigo gradient (من 900 إلى 700).
2. **ضبط** `--color-text` و `--color-text-muted/faint` لـ contrast 4.5:1 على Mihrab.
3. **استبدال** `--color-brand` بـ Lapis 400 (أكثر إشراقاً على dark).
4. **ضبط** `--color-success/warning/danger/info` لتعمل على Mihrab dark.
5. **تحديث** `--shadow-c-*` لتنفذ tinted shadows على الخلفية الجديدة (Mihrab-tinted، ليس slate-tinted).
6. **APPEND** semantic tokens dark-aware (`--chr-text-on-mihrab`, `--chr-overlay-mihrab`, ...).

> Phase 2 = استبدال جذر dark، Light محفوظ بالكامل.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT (Worker 21 / CHROMATIC SOUL)
├─ Phase: 2/5 — Dark Mihrab
├─ Estimated lines: ~440 (CSS REPLACE ~280 + APPEND semantic ~160)
├─ Files to touch:
│   └─ platform/assets/style.css   (REPLACE dark theme values + APPEND semantic)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'data-theme="dark"' platform/assets/style.css       → ≥1 (W11 baseline)
│   ├─ grep -c 'data-theme="light"' platform/assets/style.css      → ≥1 (W12 P2 — preserved)
│   ├─ grep -c '\-\-chr-mihrab-' platform/assets/style.css         → 10 (from P1)
│   └─ grep -c '\-\-color-bg' platform/assets/style.css            → ≥1
├─ Branch: continue worker-21-devotio
└─ NO touch on light theme (Linen-Bone preserved).
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Locate dark theme block

```bash
grep -n ':root\[data-theme="dark"\]' platform/assets/style.css
# Or
grep -n 'data-theme="dark"' platform/assets/style.css | head -5
```

في الكود الحالي (W11 P1 baseline) الـ dark block مماثل لهذا (تقريباً سطر 100-160):

```css
:root[data-theme="dark"],
html[data-theme="dark"],
body[data-theme="dark"] {
  --color-bg:           hsl(225 30% 6%);
  --color-surface-0:    hsl(225 26% 9%);
  --color-surface-1:    hsl(225 22% 12%);
  --color-surface-2:    hsl(225 20% 16%);
  --color-surface-3:    hsl(225 18% 20%);
  --color-text:         hsl(220 20% 98%);
  --color-text-muted:   hsl(220 15% 70%);
  --color-text-faint:   hsl(220 12% 50%);
  --color-border:       hsl(225 18% 22%);
  --color-border-strong:hsl(225 22% 32%);
  --color-brand:        hsl(176 100% 70%);
  --color-brand-hover:  hsl(176 100% 76%);
  --color-brand-soft:   color-mix(in oklch, hsl(176 100% 70%) 14%, transparent);
  --color-brand-strong: hsl(176 100% 60%);
  --color-success:      hsl(152 70% 55%);
  --color-warning:      hsl(38 92% 60%);
  --color-danger:       hsl(0 80% 65%);
  --color-info:         hsl(210 90% 65%);
  --shadow-c-sm:        0 1px 2px hsl(225 40% 2% / 0.4);
  --shadow-c-md:        0 4px 12px hsl(225 40% 2% / 0.5), 0 1px 2px hsl(225 40% 2% / 0.3);
  --shadow-c-lg:        0 12px 32px hsl(225 40% 2% / 0.55), 0 2px 6px hsl(225 40% 2% / 0.35);
  --shadow-c-xl:        0 24px 60px hsl(225 40% 2% / 0.6), 0 4px 12px hsl(225 40% 2% / 0.4);
  --ring:               0 0 0 3px color-mix(in oklch, hsl(176 100% 70%) 35%, transparent);
  color-scheme: dark;
}
```

### Step 2 — REPLACE-IN-PLACE الكتلة كاملة

استبدلها بـ:

```css
:root[data-theme="dark"],
html[data-theme="dark"],
body[data-theme="dark"] {
  /* ════════════════════════════════════════════════════════════════════
     CHROMATIC SOUL v3 — Mihrab Dark (Worker 21 / Phase 2)
     Replaces Aurora Slate baseline. References mihrab/indigo Arabic depth.
     Reference: Yemeni night sky, prayer niche, deep contemplation.
     ════════════════════════════════════════════════════════════════════ */

  /* ─── Surface ladder — Mihrab depth (5 levels) ─── */
  --color-bg:           oklch(13% 0.04  280);  /* mihrab-900 deepest */
  --color-surface-0:    oklch(16% 0.05  280);  /* page card */
  --color-surface-1:    oklch(20% 0.055 280);  /* raised card */
  --color-surface-2:    oklch(24% 0.06  280);  /* deeper raised */
  --color-surface-3:    oklch(28% 0.058 280);  /* sunk well / tooltip */

  /* ─── Text ladder — Pearl-toned for soft warmth ─── */
  --color-text:         oklch(96% 0.012 80);   /* marble-100 (warm white) */
  --color-text-muted:   oklch(74% 0.010 80);   /* marble-700 muted */
  --color-text-faint:   oklch(54% 0.012 80);   /* marble-800 faint */

  /* ─── Borders ─── */
  --color-border:        oklch(28% 0.05  280);
  --color-border-strong: oklch(38% 0.06  280);

  /* ─── Brand — Lapis 400 (lighter for dark visibility) ─── */
  --color-brand:        oklch(66% 0.15 252);   /* lapis-400 */
  --color-brand-hover:  oklch(72% 0.16 252);   /* lapis-300 */
  --color-brand-soft:   color-mix(in oklch, oklch(66% 0.15 252) 16%, transparent);
  --color-brand-strong: oklch(56% 0.18 252);   /* lapis-500 base */

  /* ─── Semantic state colors — Arabic-rooted ─── */
  --color-success:      oklch(62% 0.10 160);   /* cedar 400 */
  --color-warning:      oklch(80% 0.14 78);    /* saffron 400 */
  --color-danger:       oklch(67% 0.15 28);    /* henna 400 */
  --color-info:         oklch(66% 0.15 252);   /* lapis 400 — same as brand */

  /* ─── Tinted shadows — Mihrab-toned (no flat black, no slate) ─── */
  --shadow-c-sm:
    0 1px 2px oklch(8% 0.05 280 / 0.45),
    0 1px 1px oklch(13% 0.03 280 / 0.30);
  --shadow-c-md:
    0 4px 12px oklch(8% 0.05 280 / 0.55),
    0 2px 4px oklch(13% 0.03 280 / 0.35);
  --shadow-c-lg:
    0 12px 32px oklch(8% 0.05 280 / 0.60),
    0 4px 10px oklch(13% 0.03 280 / 0.40);
  --shadow-c-xl:
    0 24px 60px oklch(8% 0.05 280 / 0.65),
    0 8px 20px oklch(13% 0.03 280 / 0.45);

  /* ─── Focus ring — Lapis ─── */
  --ring: 0 0 0 3px color-mix(in oklch, oklch(66% 0.15 252) 38%, transparent);
  --ring-offset: 2px;

  color-scheme: dark;
}
/* End CHROMATIC SOUL v3 / Phase 2 — Dark Mihrab REPLACE-IN-PLACE ────── */
```

### Step 3 — APPEND Dark-Aware Semantic Tokens

في `:root` العام (default + universal)، **APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Dark-Aware Semantic Tokens (Worker 21 / Phase 2)
   These tokens activate ONLY in dark theme. Light theme keeps W12 P2.
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Default values — overridden in dark block below */
  --chr-text-on-tint:        var(--color-text);
  --chr-overlay-tint-faint:  color-mix(in oklch, var(--color-bg) 92%, transparent);
  --chr-overlay-tint-light:  color-mix(in oklch, var(--color-bg) 84%, transparent);

  --chr-mihrab-veil:         transparent;
  --chr-mihrab-glow:         transparent;
}

:root[data-theme="dark"] {
  /* Mihrab veil — subtle violet wash over dark surfaces */
  --chr-mihrab-veil:
    radial-gradient(ellipse 120% 80% at 50% -20%,
      oklch(36% 0.08 280 / 0.18) 0%,
      transparent 60%);

  /* Mihrab glow — for hero/CTA accents */
  --chr-mihrab-glow:
    radial-gradient(circle at 50% 50%,
      oklch(56% 0.18 252 / 0.20) 0%,
      transparent 70%);

  /* Text-on-tint — derived for dark */
  --chr-text-on-tint:
    color-mix(in oklch, var(--chr-active-tint, var(--color-brand)) 14%, var(--color-text));

  /* Overlays for modals/sheets */
  --chr-overlay-tint-faint:  color-mix(in oklch, var(--chr-mihrab-900, oklch(13% 0.04 280)) 88%, transparent);
  --chr-overlay-tint-light:  color-mix(in oklch, var(--chr-mihrab-800, oklch(20% 0.06 280)) 78%, transparent);
}
```

### Step 4 — Apply Mihrab Veil to body (subtle ambient)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Body Ambient Veil (Worker 21 / Phase 2)
   Subtle violet wash from top of viewport (mihrab arch effect).
   Only in dark mode. Reduced-motion safe (it's static).
   ════════════════════════════════════════════════════════════════════════ */
:root[data-theme="dark"] body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: var(--chr-mihrab-veil);
}

/* Override existing ambient gradient from W12+W14+W16 if it conflicts */
:root[data-theme="dark"] body::before {
  /* Layer order: existing aurora gradient (W12 P2 :root[data-theme="dark"] --deep-gradient)
     stays, mihrab veil layers on top with multiply blending */
  mix-blend-mode: normal;  /* keep simple — Phase 4 refines */
}
```

### Step 5 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 21 / Phase 2 — Mihrab Discipline:
   1. لا تعدّل أي قيمة في :root[data-theme="light"] (W12 P2 محفوظ).
   2. dark theme كل الألوان oklch — لا hsl، لا hex.
   3. Mihrab veil يعمل عبر body::before — لا تستبدله، Phase 4 يضيف layers.
   4. text contrast على dark bg ≥ 4.5:1 (verified: marble-100 on mihrab-900 = ~12:1 ✓).
   5. brand = Lapis 400 في dark (أفتح من 500) للظهور الواضح.
   6. semantic colors تستعمل palette stops لا تخمين.
   ════════════════════════════════════════════════════════════════════════ */

/* End CHROMATIC SOUL v3 / Phase 2 — Dark Mihrab ─────────────────────── */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391

# Light theme untouched (W12 P2 preserved)
grep -c 'paper-tone' platform/assets/style.css                    # → ≥1 (W12 P2)
grep -c 'Linen-Bone' platform/assets/style.css                    # → ≥1

# Dark Mihrab applied
grep -A 30 ':root\[data-theme="dark"\]' platform/assets/style.css | grep -c "oklch"  # → many
grep -c 'chr-mihrab-veil' platform/assets/style.css               # → ≥2

# Tokens preserved (names)
grep -c '\-\-color-bg' platform/assets/style.css                  # → ≥1
grep -c '\-\-color-text' platform/assets/style.css                # → ≥1
grep -c '\-\-color-brand' platform/assets/style.css               # → ≥1

# Browser test:
# Toggle dark mode → bg should feel "deep purple-indigo", not "slate"
# Brand color (CTA buttons) should be Lapis blue, not cyan/teal
# Light mode → unchanged (Linen-Bone) ✓
# Contrast check (DevTools): text on bg ≥ 4.5:1
```

---

## ✅ معايير القبول (Phase 2)

- [ ] `:root[data-theme="dark"]` block REPLACED بقيم Mihrab.
- [ ] جميع dark surfaces (bg, surface-0/1/2/3) تستعمل oklch + Mihrab hue (280).
- [ ] `--color-text` على dark = `oklch(96% 0.012 80)` (warm marble).
- [ ] `--color-brand` على dark = Lapis 400.
- [ ] `--shadow-c-*` tinted بـ Mihrab (لا slate).
- [ ] Mihrab veil يظهر على body في dark mode.
- [ ] Light theme (Linen-Bone) **لم يتغيّر** — verify بـ grep.
- [ ] Contrast text/bg في dark mode ≥ 4.5:1.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css
git commit -m "phase 2 (devotio): dark mihrab — replace aurora slate with mihrab indigo, lapis brand, marble text, mihrab veil ambient"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-21-phase-2.json
git commit -m "state: devotio phase 2 (worker 21) committed and pushed"
# push immediately
```

— نهاية Phase 2.

🕯️ **Devotion check:** هل dark mode الآن يحس "محراب" لا "Linear dashboard"؟ Light mode محفوظ؟ → Phase 3 (Page Reassignment).
