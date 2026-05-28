# ✦ TADAFFUQ v5 — INDEX
> الخريطة المرجعيَّة. اقرأ هنا لمعرفة "أين نحن وأين نَذهب".

---

## ١. الملفات الجذريَّة (٧ ملفات)

| الملف | الدور | length |
|---|---|---:|
| `00_TADAFFUQ_MANIFESTO.md` | الدستور — 4 oaths, 3 pillars, 20 forbiddens | ~ 200 سطر |
| `SPATIAL_DOCTRINE.md` | canvas / dock / 3 surfaces / RTL | ~ 250 سطر |
| `MOTION_DOCTRINE.md` | 7 durations / 5 easings / 3 feedback patterns | ~ 230 سطر |
| `CHROMA_DOCTRINE.md` | 4 token families / dark + light / single-accent | ~ 260 سطر |
| `ICONOGRAPHY_DOCTRINE.md` | zero emoji / Lucide+Phosphor / sprite / size scale | ~ 240 سطر |
| `PULSE_LIBRARY.md` | 9 categories / 25 forbidden / 25 wild cards | ~ 220 سطر |
| `INDEX.md` | هذا الملف | ~ 150 سطر |

**إجمالي ≤ 1,550 سطر — context-safe.**

### Stage Specs (تُكتَب stage-by-stage):
| Pillar | Stages المتوقَّعة |
|---|---|
| α FOUNDATION | α1, α2, α3, α4 |
| β TYPE SOUL | β1, β2, β3 |
| γ SPATIAL | γ1, γ2, γ3, γ4, γ5 |
| δ MOTION | δ1, δ2, δ3, δ4, δ5 |
| ε CHROMA | ε1, ε2, ε3, ε4 |
| ζ CONTENT POLISH | ζ1, ζ2, ζ3, ζ4, ζ5, ζ6 |
| η QUALITY GATE | η1, η2, η3, η4 |
| θ SEAL | θ1, θ2 |

---

## ٢. الـ 8 Pillars — تفصيل

### Pillar α — FOUNDATION (re-audit + lock)
الهدف: قراءة المنصة كما تركها v4، تثبيت الأرضيَّة، إعداد البنية للاستحضار.

| # | اسم | الدور |
|---|---|---|
| α1 | Forensic Audit | snapshot صادق لكل الأرقام (10+ keys) → `state/AUDIT_BASELINE_V5.md` |
| α2 | Token Architecture | 4 families locked: surface/ink/accent/state + 11 space + 7 radius + 5 z + 6 icon + 7 duration + 5 ease |
| α3 | Module Manifest | 131 JS files audit → consolidation map (لكن لا re-write كبير، فقط manifest + lazy-load registry) |
| α4 | Icon Foundation | sprite procurement (Lucide + Phosphor) + SEMANTIC_MAP (31 keys) + Upg.icons frozen API |

### Pillar β — TYPE SOUL (procurement-truth)
الهدف: حلّ كارثة woff2=0. خطوط تَحلّ في الجهاز فعلاً.

| # | اسم | الدور |
|---|---|---|
| β1 | Local Font Procurement | تحميل 7+ خطوط محلّيَّة (woff2 فعلاً)، MANIFEST verified |
| β2 | Voice Casting | 8 voice tokens (display, hero, body, label, num, code, quote, kbd) |
| β3 | Numeric Kashida Signature | tabular-nums + kashida tokens + per-page signatures |

### Pillar γ — SPATIAL (canvas + dock + surfaces)
الهدف: تَفعيل SPATIAL_DOCTRINE في الكود.

| # | اسم | الدور |
|---|---|---|
| γ1 | Canvas Foundation | `.canvas` grid + bleed + container queries |
| γ2 | Dock System | topbar dynamic-island + bottom-dock mobile + Upg.dock |
| γ3 | Surfaces (Paper/Glass/Metal) | 3 surfaces + 0 hybrid + utilities |
| γ4 | RTL Native | logical properties enforcement audit + flipping legacy |
| γ5 | Mobile-Sovereign | safe-area + haptics + bottom-dock interactions |

### Pillar δ — MOTION (7+5+3 discipline)
الهدف: تَفعيل MOTION_DOCTRINE.

| # | اسم | الدور |
|---|---|---|
| δ1 | Duration Tokens | 7 locked + audit prior usage + replace numeric |
| δ2 | Easing Curves | 5 locked + replace cubic-bezier + ban bare keywords |
| δ3 | Feedback Patterns | Press / Bloom / Settle utilities + `Upg.feedback` |
| δ4 | View Transitions | enforce on every nav + 3 depths + direction-aware |
| δ5 | Reduced-Motion Sanctuary | single `!important` block, audit & rewrite all rest |

### Pillar ε — CHROMA (4 families + dark/light)
الهدف: تَفعيل CHROMA_DOCTRINE. ربع عدد tokens v4.

| # | اسم | الدور |
|---|---|---|
| ε1 | Dark Mode (default) | 24 token oklch + audit hardcoded hex baseline |
| ε2 | Light Mode (careful) | mirror + neutral cool oklch (NOT linen-bone) |
| ε3 | Accent Discipline | 3 accents + single-accent rule enforcement + Upg.accent |
| ε4 | Per-page Tints | 5 tints + 14 page mappings + page-h underline binding |

### Pillar ζ — CONTENT POLISH (specific gaps, not full revival)
الهدف: 6 صفحات/مَواقع تحتاج لمسة v5 خاصَّة.

| # | اسم | الدور |
|---|---|---|
| ζ1 | Dashboard Tadaffuq | scroll-aware identity tint + greeting flow |
| ζ2 | Calculator Continuity | qcalc input → output flow (no jump) |
| ζ3 | MyProgress Ribbon | continuous timeline (replaces phased counter) |
| ζ4 | Cmdk (Command Palette) | replaces every "search bar" pattern globally |
| ζ5 | Search → Cmdk migration | audit all search inputs, redirect to cmdk |
| ζ6 | Onboarding Slide-over | replaces gateway modal w/ slide-over |

### Pillar η — QUALITY GATE (a11y + pwa + truthful purges)
الهدف: η1-η4 يَجلب الأرقام إلى target.

| # | اسم | الدور |
|---|---|---|
| η1 | Inline Purge V2 | 23 → 0 (target stricter than v4) |
| η2 | !important Cap | 338 → ≤ 30 (motion-sanctuary + a11y gates only) |
| η3 | Lighthouse + a11y + contrast audit | mobile ≥ 95, a11y ≥ 98 |
| η4 | PWA + Offline + Forced-Colors | manifest + sw + offline.html + forced-colors guards |

### Pillar θ — SEAL
| # | اسم | الدور |
|---|---|---|
| θ1 | Changelog v5 | append v5.0.0 entry to CHANGELOG.md, full pulse inventory |
| θ2 | Final Integration PR | from `v5-tadaffuq` → `main`, sealed |

---

## ٣. Branching

```
main
 ├── tadaffuq-α-foundation    (4 stages, 1 PR)
 ├── tadaffuq-β-type-soul     (3 stages, 1 PR)
 ├── tadaffuq-γ-spatial       (5 stages, 1 PR)
 ├── tadaffuq-δ-motion        (5 stages, 1 PR)
 ├── tadaffuq-ε-chroma        (4 stages, 1 PR)
 ├── tadaffuq-ζ-content       (6 stages, 1 PR)
 ├── tadaffuq-η-quality       (4 stages, 1 PR)
 └── tadaffuq-θ-seal          (2 stages, 1 PR final)
```

كل pillar PR يَستقبله `v5-tadaffuq` (integration). الـ θ2 PR هو الوحيد الذي يَذهب إلى `main`.

---

## ٤. الإحصاء المتوقَّع

| البُعد | القيمة |
|---|---:|
| Pillars | 8 |
| Stages إجمالاً | 33 (4+3+5+5+4+6+4+2) |
| Branches | 8 (واحد per pillar) |
| PRs | 8 pillar + 1 final = 9 |
| Pulses الدنيا (γ-η فقط) | 24 (5+5+4+6+4) |
| Sessions تقديريَّة | 12-16 |

---

## ٥. ملفات state/ المُسخَّرة

| الملف | الدور |
|---|---|
| `state/PROGRESS.json` (`tadaffuq_v5` block) | نقطة استئناف + creativity_health |
| `state/AUDIT_BASELINE_V5.md` | baseline من α1 (يُكتَب مرَّة) |
| `state/TRUTH_LEDGER.md` (موجود) | يُلحَق به entries v5 |
| `state/PULSE_LOG.md` (جديد) | append-only، γ-η pulses |

`state/CREATIVITY_LOG.md` v4 يَبقى للقراءة، لا يُكتَب فيه v5.

---

## ٦. الأصول المُقدَّسة (v5 يَلتزم)

| الأصل | السبب |
|---|---|
| `archive/arabic-training-platform-v12-original.html` | history |
| 32+ Upg.* APIs | backward-compat (extend, never replace) |
| 16 page sections | لا حذف |
| `prompts/v1, v2, v3, v4` | تاريخ القرار |
| v4 entries في PROGRESS.json | لا lossy edit |
| v4 CREATIVITY_LOG.md | append-only history |

---

## ٧. كيف تَستخدمها

ألصق فقط الـ AUTO_PILOT v5 prompt (الذي تَملكه). الـ AUTO_PILOT يَقرأ:
- 5 doctrines + INDEX (كلّها هنا)
- آخر 3 entries من PULSE_LOG
- `tadaffuq_v5` block من PROGRESS.json
- ملف stage الحالي

ولا يَقرأ أي ملف آخر تلقائياً.

---

— نهاية INDEX —
