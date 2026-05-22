# 📐 WORKER 24 — Phase 1/5 — dvh & Safe Area
> **اقرأ أولاً:** `prompts/v3/24_WORKER_DUAL_FORM.md` — قسم **Preservation Guard**.
> **يبني فوق:** Pack v3 W20-W23.
> **الفلسفة:** *الأرض لا تَتحرّك تحت قَدَم المتدرّب. `dvh` يُثبّت الـ viewport. `safe-area` يَحترم الـ notch. الجسد لا يَنزلق.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/assets/css/*.css` | **REPLACE-IN-PLACE** كل `vh` بـ `dvh` (مع `vh` fallback) | تعديل سلوك آخر |
| `platform/assets/css/tokens.css` | **APPEND** 6 dvh + safe-area tokens | تعديل tokens قائمة |
| `platform/index.html` | **AUGMENT** `<meta name="viewport" content="..., viewport-fit=cover">` | تغيير DOM |
| `app.js` / `js/_compat.js` | لا يُلمَس في P1 | أي تعديل |

**Sacred preserved:**
- جميع 29 Upg.* APIs.
- جميع keyframes + ambient + life + ritual.
- 14 page sections + 391 qcalc.

---

## 🎯 الهدف

Phase 1 يُثبّت الـ viewport على الموبايل:

1. **Find & Replace** كل `100vh` → `100dvh` (مع `100vh` fallback عبر `@supports`).
2. **APPEND** safe-area tokens في `tokens.css`:
   - `--safe-top`, `--safe-bottom`, `--safe-left`, `--safe-right`.
3. **AUGMENT** chrome/nav/footer لاستهلاك safe-area:
   - `padding-top: max(var(--space-4), var(--safe-top))`.
4. **AUGMENT** `<meta name="viewport">` بـ `viewport-fit=cover`.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT (Worker 24 / DUAL-FORM)
├─ Phase: 1/5 — dvh & Safe Area
├─ Estimated lines: ~440 (CSS Find&Replace + APPEND + HTML meta tweak)
├─ Files to touch:
│   ├─ platform/assets/css/tokens.css      (APPEND safe-area tokens)
│   ├─ platform/assets/css/base.css        (REPLACE 100vh → 100dvh)
│   ├─ platform/assets/css/chrome.css      (REPLACE 100vh + safe-area)
│   ├─ platform/assets/css/pages.css       (REPLACE 100vh + safe-area)
│   ├─ platform/assets/css/motion.css      (REPLACE if any vh in keyframes)
│   └─ platform/index.html                 (AUGMENT viewport meta)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '100vh\|vh' platform/assets/css/*.css | awk -F: '{sum+=$2}'  → ~20+
│   ├─ grep -c 'viewport-fit' platform/index.html                            → 0 (will become 1)
│   └─ grep -c '<section class="page"' platform/pages/*.html                 → 14+
├─ Branch: NEW worker-24-devotio (from latest main, post W23 PR)
```

---

## 🧱 خطوات التنفيذ

### Step 1 — APPEND safe-area + dvh tokens

في `platform/assets/css/tokens.css`، **APPEND** بعد آخر :root:

```css
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Viewport + Safe Area Tokens (Worker 24 / Phase 1)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Safe area inserts (notch + home indicator) */
  --safe-top:    env(safe-area-inset-top, 0);
  --safe-bottom: env(safe-area-inset-bottom, 0);
  --safe-left:   env(safe-area-inset-left, 0);
  --safe-right:  env(safe-area-inset-right, 0);

  /* Dynamic viewport height (handles mobile address bar shift) */
  --vh-fallback:  100vh;   /* fallback for older browsers */
  --dvh-100:      100dvh;  /* dynamic — adapts to address bar */
  --svh-100:      100svh;  /* small — minimum viewport */
  --lvh-100:      100lvh;  /* large — maximum viewport */

  /* Chrome heights (per-form) */
  --dual-chrome-h-desktop: 64px;
  --dual-chrome-h-mobile:  56px;  /* slightly smaller on mobile */
  --dual-bottom-nav-h:     64px;  /* mobile only */
}

/* Fallback for browsers that don't support dvh */
@supports not (height: 100dvh) {
  :root {
    --dvh-100: 100vh;
    --svh-100: 100vh;
    --lvh-100: 100vh;
  }
}

/* End DUAL-FORM v3 / Phase 1 — Tokens ──────────────────────────────── */
```

### Step 2 — Find & Replace `100vh` → `100dvh`

```bash
# Inventory
grep -nE '\b100vh\b' platform/assets/css/*.css | head -50
```

استخدم sed (آمن — يَستبدل `100vh` فقط، ليس `vh` كلها):

```bash
for f in platform/assets/css/*.css; do
  sed -i '' 's/\b100vh\b/100dvh/g' "$f"   # macOS
  # OR (Linux): sed -i 's/\b100vh\b/100dvh/g' "$f"
done
```

> **مهم:** نَستهدف `100vh` فقط. لو فيه `50vh`، `25vh`، إلخ، نعالجها يدوياً (نادرة في الـ codebase).

تَحقّق:

```bash
grep -c '100dvh' platform/assets/css/*.css | awk -F: '{sum+=$2} END {print sum}'  # → ≥20
grep -c '100vh' platform/assets/css/*.css | awk -F: '{sum+=$2} END {print sum}'   # → 0
```

### Step 3 — APPEND safe-area handling لـ chrome

في `platform/assets/css/chrome.css`، **APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Safe-Area Chrome Padding (Worker 24 / Phase 1)
   ────────────────────────────────────────────────────────────────────────
   Top chrome respects notch. Bottom regions respect home-indicator.
   On desktop (no safe area), values resolve to 0 — no visual change.
   ════════════════════════════════════════════════════════════════════════ */

/* Top chrome / app header — respect notch */
.app-header,
.top-chrome,
header[role="banner"] {
  padding-top: max(var(--space-3, 0.75rem), var(--safe-top));
  padding-inline-start: max(var(--space-4, 1rem), var(--safe-left));
  padding-inline-end:   max(var(--space-4, 1rem), var(--safe-right));
}

/* Sidebar — respect left/right safe area in landscape */
.sidebar,
.nav-rail {
  padding-inline-start: max(var(--space-3, 0.75rem), var(--safe-left));
  padding-block-end:    max(var(--space-3, 0.75rem), var(--safe-bottom));
}

/* Footer / bottom region — respect home indicator */
.app-footer,
footer[role="contentinfo"] {
  padding-bottom: max(var(--space-3, 0.75rem), var(--safe-bottom));
  padding-inline-start: max(var(--space-4, 1rem), var(--safe-left));
  padding-inline-end:   max(var(--space-4, 1rem), var(--safe-right));
}

/* Page-host main slot — content respects safe area */
#page-host,
main[data-shard-host] {
  padding-bottom: max(var(--space-6, 1.5rem), var(--safe-bottom));
}

/* Body min-height = dvh (already handled by find/replace, but reaffirm) */
html, body {
  min-height: var(--dvh-100);
}
```

### Step 4 — AUGMENT viewport meta

في `platform/index.html`, ابحث عن:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

REPLACE-IN-PLACE بـ:

```html
<!-- DUAL-FORM v3 / W24 P1 — viewport-fit=cover for safe-area support -->
<meta name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

### Step 5 — Discipline Comment

في `tokens.css`:

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 24 / Phase 1 — Viewport Discipline:
   1. كل قاعدة جديدة بعد P1 يجب أن تَستعمل --dvh-100 (لا 100vh).
   2. الـ chrome يَستهلك --safe-top/bottom/left/right.
   3. viewport-fit=cover meta يَفتح env() values.
   4. على الديسكتوب صفر تأثير (env() = 0 في desktop).
   5. على iOS Safari: bottom indicator + notch محترم.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# vh purged
grep -c '\b100vh\b' platform/assets/css/*.css | awk -F: '{sum+=$2} END {print sum}'   # → 0
grep -c '\b100dvh\b' platform/assets/css/*.css | awk -F: '{sum+=$2} END {print sum}'  # → ≥20

# Safe-area applied
grep -c 'safe-area-inset' platform/assets/css/*.css | awk -F: '{sum+=$2} END {print sum}'  # → ≥6
grep -c '\-\-safe-' platform/assets/css/tokens.css                    # → ≥4

# Viewport meta updated
grep -c 'viewport-fit=cover' platform/index.html                      # → 1

# Sacred preserved
grep -c '<section class="page"' platform/pages/*.html | awk -F: '{sum+=$2}'   # → 14+
grep -c 'qcalc' platform/pages/*.html | awk -F: '{sum+=$2}'                   # → 391

# Browser test:
# Safari iOS → address bar appears/disappears: layout doesn't jump
# Notched device: chrome respects notch
# Desktop: zero visual change
```

---

## ✅ معايير القبول (Phase 1)

- [ ] صفر `100vh` في `platform/assets/css/`.
- [ ] ≥20 `100dvh` references.
- [ ] 4+ `--safe-*` tokens في tokens.css.
- [ ] 6+ uses of `env(safe-area-inset-*)` في chrome.css.
- [ ] `viewport-fit=cover` في meta.
- [ ] صفر visual regression on desktop.
- [ ] Mobile Safari: no layout jump on address-bar toggle.
- [ ] Notched mobile: chrome respects notch.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/css/ platform/index.html
git commit -m "phase 1 (devotio): dvh & safe-area — replace all 100vh with 100dvh, add env(safe-area-inset-*) on chrome, viewport-fit=cover"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-24-phase-1.json
git commit -m "state: devotio phase 1 (worker 24) committed and pushed"
# push immediately
```

— نهاية Phase 1.

📐 **Devotion check:** هل الموبايل لا يَنزلق الآن؟ الـ notch محترم؟ → Phase 2 (Bottom Nav).
