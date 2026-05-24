# AUDIT BASELINE — ÊLAN v4 — α1 Forensic
**Date:** 2026-05-24
**Branch:** elan-α-foundation
**Commit before changes:** `b59d9c9` (main HEAD)
**Auditor:** AUTO_PILOT v4 (grep-only, zero code edits in `platform/`)

> ÊLAN يبدأ بالاعتراف. لا ادّعاء بدون verify. هذا الملف هو خط الأساس
> الذي ستُقاس عليه كل phases v4. كل قيمة هنا مستخرَجة بـ grep حقيقي،
> قابلة لإعادة الإنتاج بنفس الأوامر في spec α1.

---

## A. Style Discipline

| Metric | Value | Target (after ζ) | Status |
|---|---:|---:|:--:|
| inline `style=` in index.html | **89** | ≤ 30 | 🔴 |
| `!important` total across `css/` | **276** | ≤ 20 | 🔴 |
| `!important` in `motion.css` | **88** | ≤ 5 | 🔴 |
| `!important` in `pages.css` | **160** | ≤ 10 | 🔴 |
| `!important` in `utilities.css` | 22 | ≤ 5 | 🔴 |
| `!important` in `chrome.css` | 6 | ≤ 5 | 🟡 |
| `!important` in `base.css` | 0 | 0 | 🟢 |
| `!important` in `tokens.css` | 0 | 0 | 🟢 |

**Reading:** القيود مكسورة في 3 ملفات حِمل ثقيل (`pages.css` + `motion.css` + `utilities.css`).
هذه ضريبة v3 الـ DEVOTIO المتراكمة. ζ1 + ζ2 سيواجهانها.

---

## B. Type Truth

| Metric | Value | Target | Status |
|---|---:|---:|:--:|
| `.woff2` files on disk | **0** | ≥ 12 | 🔴 broken |
| `@font-face` declarations | 34 | match files +0/-0 | 🔴 phantom |
| `font-family` declarations total | 336 | ≤ 80 | 🔴 |
| referenced font files | 17 unique | == on-disk | 🔴 17→0 mismatch |
| **Stack health** | **broken** | healthy | 🔴 |

**Reading:** الـ stack الخطّي مَيت. 34 إعلان `@font-face` يشير إلى 17 ملف
`.woff2` — لا واحد منها موجود على القرص. الواجهة تَرتكز على system fallbacks فقط.
β1 سيُصلح هذا (procurement محلي).

---

## C. JS Truth

| Metric | Value | Target | Status |
|---|---:|---:|:--:|
| `js/*.js` files | **92** | ≤ 28 | 🔴 |
| files starting with `(function` (IIFE) | **44** | ≤ 5 | 🔴 |
| files with `^export ` (ESM) | **0** | ≥ 20 | 🔴 zero ESM |
| `_legacy-globals.js` lines | **4,215** | ≤ 200 | 🔴 |
| `app.js` lines | 111 | preserved | 🟢 |

**Reading:** الـ JS كله IIFE قديم. لا module واحد. ملف `_legacy-globals.js`
وحده 4215 سطر — يحتاج تفكيك في α3.

---

## D. Structural Truth (Sacred Assets)

| Metric | Value | Target (sacred) | Status |
|---|---:|---:|:--:|
| `<section class="page">` count | **14** | 14 (real) | 🟢 |
| Unique page IDs | 14 | 14 | 🟢 |
| `window.Upg.*` namespaces | **30** | ≥ 14 (sacred preserved) | 🟢 |
| `class="...bento..."` elements | 18 | ≥ 3 | 🟢 |
| `data-countup` elements | 4 | ≥ 6 (after δ2) | 🟡 |

**Note on page count:** المانفستو يقول "16 page sections". الواقع 14. صفحة dashboard
ليست `<section class="page">` (هي bento في root)، و myprogress موجودة. الرقم الصحيح
**14** — يجب تحديث المانفستو أو فهمه بأن الـ 16 يشمل dashboard root + myprogress.

**Note on Upg.* APIs:** v3 (DEVOTIO) أنتجت 30 namespace. الـ 14 الأصلية محفوظة ضمنها.
هذه قائمة الـ 30 المرصودة:

```
aura, calc, choreo, chroma, chrome, cmdk, countup, focusTrap, font, gateway,
greet, icons, identity, layer, life, material, motion, nav, pace, practice,
production, ritual, scroll, shards, sound, state, theme, touch, transition, type
```

---

## E. Size Truth

| File | Lines | Target | Status |
|---|---:|---:|:--:|
| `index.html` | **32,107** | preserved | 🟡 (مشغول جداً) |
| `pages.css` | **26,404** | ≤ 9,000 | 🔴 |
| total CSS (`css/*.css`) | 32,394 | ≤ 30,000 | 🟡 |
| total JS (`js/*.js`) | 20,240 | ≤ 12,000 | 🔴 |

**Reading:** `pages.css` انتفخ ~3× الهدف. `index.html` يحمل 32K سطر —
احتمال كبير لـ inline content يجب أن يُهجَّر إلى pages/ مستقلة في ε.

---

## Verdict

- **Health:** 🔴 critical — يحتاج Foundation re-architecting
- **Greatest debt:** فقدان كل ملفات الخطوط `.woff2` (17 reference → 0 on disk) — type system رمزي فقط
- **Second debt:** 92 ملف JS بدون ESM، إعتماد ضخم على IIFE + globals
- **Third debt:** 276 `!important` (ξ4 ملفات تحملها)
- **Sacred status:** 14 pages + 30 Upg.* APIs محفوظة 100% — v4 يبني فوقها لا تحتها
- **Next priority:** α2 Token Architecture (بناء الأساس الذي تستهلكه β + γ)

---

## Reproduction (نفس الأوامر تنتج نفس الأرقام)

```bash
grep -oE 'style="' platform/index.html | wc -l                       # 89
grep -h '!important' platform/assets/css/*.css | wc -l               # 276
find platform/assets/fonts -name "*.woff2" | wc -l                   # 0
grep -h '@font-face' platform/assets/css/*.css | wc -l               # 34
grep -h 'font-family' platform/assets/css/*.css | wc -l              # 336
grep -hoE 'fonts/[a-z-]+/[a-z0-9-]+\.woff2' platform/assets/css/*.css | sort -u | wc -l   # 17
ls platform/assets/js/*.js | wc -l                                   # 92
grep -lE '^\(function ?\(' platform/assets/js/*.js | wc -l           # 44
grep -lE '^export ' platform/assets/js/*.js | wc -l                  # 0
wc -l platform/assets/js/_legacy-globals.js                          # 4215
grep -hoE 'window\.Upg\.[a-zA-Z]+' platform/assets/js/*.js platform/assets/app.js | sort -u | wc -l  # 30
wc -l platform/index.html                                            # 32107
wc -l platform/assets/css/pages.css                                  # 26404
wc -l platform/assets/css/*.css | tail -1                            # 32394
wc -l platform/assets/js/*.js | tail -1                              # 20240
```

— نهاية AUDIT BASELINE α1 —
