# ✦ TADAFFUQ v5 — Index
> الخريطة المرجعية. اقرأ هنا لمعرفة "أين نحن وأين نذهب".

---

## ١. ملفات `prompts/v5/` (مُلزِمة على AUTO_PILOT)

### الستة الدساتير (تُقرأ في كل session)
| الملف | الدور | تقريباً سطور |
|---|---|---:|
| `00_TADAFFUQ_MANIFESTO.md` | الدستور — 4 أقسام، 3 أركان، 20 forbiddens | 200 |
| `SPATIAL_DOCTRINE.md` | canvas / dock / 3 surfaces / RTL | 220 |
| `MOTION_DOCTRINE.md` | 7 durations / 5 easings / 3 feedback patterns | 180 |
| `CHROMA_DOCTRINE.md` | 4 token families / dark+light / single-accent rule | 200 |
| `ICONOGRAPHY_DOCTRINE.md` | zero emoji / Lucide+Phosphor / sprite / size scale | 200 |
| `PULSE_LIBRARY.md` | 9 categories / 25 forbidden / 25 wild cards | 240 |

### الإضافيات
| الملف | الدور |
|---|---|
| `INDEX.md` | هذا الملف |
| `AUTO_PILOT_v5.md` | البرومت الذي يلصقه المستخدم فقط |

### Stage Specs (تُكتَب stage-by-stage)
| Pillar | Stages المتوقَّعة |
|---|---|
| α FOUNDATION | α1, α2, α3, α4 |
| β TYPE-VOICE-v5 | β1, β2, β3 |
| γ SPATIAL | γ1, γ2, γ3, γ4, γ5 |
| δ MOTION | δ1, δ2, δ3, δ4 |
| ε WORLDS-REVIVAL | ε1, ε2, ε3, ε4, ε5, ε6 |
| ζ PULSE-INTEGRATION | ζ1, ζ2, ζ3 |
| η QUALITY-GATE | η1, η2, η3, η4 |
| θ SEAL | θ1, θ2 |

---

## ٢. الثمانية Pillars (٨)

### Pillar α — FOUNDATION (Stages α1-α4)
| Stage | اسم | الدور |
|---|---|---|
| α1 | Forensic Audit v5 | baseline قياس قبل أي تعديل |
| α2 | Token Reconciliation | --paper-* + --ink-* + --accent-* (4 families consolidation) |
| α3 | Module Manifest | 126 ملف JS → audit + IIFE-vs-ESM map |
| α4 | Sprite + Semantic Map | platform-v5/assets/svg/sprite.svg + Upg.icons API |

### Pillar β — TYPE-VOICE-v5 (Stages β1-β3)
| Stage | اسم | الدور |
|---|---|---|
| β1 | Voice Re-cast | تأكيد voice tokens موروثة + 3 إضافات pulse-aware |
| β2 | Numeric Discipline v2 | tas-num-* extension للـ negative-space |
| β3 | Per-Page Signature Bind | الـ signature.css بـ tokens v5 |

### Pillar γ — SPATIAL (Stages γ1-γ5) — الجوهر الجديد
| Stage | اسم | الدور |
|---|---|---|
| γ1 | Canvas + Dock Architecture | layout grid v5 |
| γ2 | Sidebar Sticky-Magnetic | sidebar غير-fixed، tilt mild |
| γ3 | Topbar Dynamic-Island v2 | scroll-shrink، sound + aura indicators |
| γ4 | Mobile Bottom-Nav Refined | 4 شعار + safe-area + haptic |
| γ5 | 3 Surfaces Tonal | base/raised/elevated paper layers |

### Pillar δ — MOTION (Stages δ1-δ4) — متوازي مع γ
| Stage | اسم | الدور |
|---|---|---|
| δ1 | Press + Bloom + Sanctuary | الثلاث feedback patterns |
| δ2 | Page Enter Choreography | depth-shallow/mid/deep بناء على page-id |
| δ3 | Block Reveal Stagger | IntersectionObserver + 60ms gap |
| δ4 | Reduced-Motion Sanctuary v2 | عَدّ + ضمان 100% coverage |

### Pillar ε — WORLDS-REVIVAL (Stages ε1-ε6)
| Stage | World | Pages |
|---|---|---|
| ε1 | hibr (حِبر) refresh | dashboard, myprogress |
| ε2 | naar (نار) + warsha (وَرشة) | lab, programming, phonerepair, customercare |
| ε3 | nada (ندى) | psych, eq |
| ε4 | hadeed (حَديد) + saloon (صَالون) | negotiation, fieldsales, hrmastery |
| ε5 | dhahab (ذَهَب) + tayyar (تَيار) | accounting, social, callcenter, accountmgr |
| ε6 | Cross-page Pulse Layer | shared rituals across worlds |

### Pillar ζ — PULSE-INTEGRATION (Stages ζ1-ζ3)
| Stage | اسم | الدور |
|---|---|---|
| ζ1 | Pulse Surfaces Audit | كل pulse مُحقَّق وصِحَّة الـ STATS |
| ζ2 | Aura Time-Of-Day Engine | Upg.aura يَستجيب لـ wall-clock |
| ζ3 | Sound + Pulse Cross-Bind | 5 synth recipes تَتوافق مع Bloom moments |

### Pillar η — QUALITY-GATE (Stages η1-η4)
| Stage | اسم | الدور |
|---|---|---|
| η1 | Inline Purge Truthful | reduce 23 → ≤10 inline-style |
| η2 | !important Cap | reduce 354 (excl. sanctuary) → ≤100 |
| η3 | Lighthouse + A11y | mobile ≥ 92, a11y ≥ 96 |
| η4 | Truth Ledger Audit | كل entry verified بـ commit-sha |

### Pillar θ — SEAL (Stages θ1-θ2)
| Stage | اسم | الدور |
|---|---|---|
| θ1 | CHANGELOG v5 + PR Body | seal documentation |
| θ2 | Final Integration PR | v5-tadaffuq → main (human merges) |

---

## ٣. الإحصاء

| البُعد | القيمة |
|---|---:|
| Pillars | 8 |
| Stages إجمالاً | 31 (4+3+5+4+6+3+4+2) |
| Branches متوقَّعة | 8 (واحد per pillar) |
| Pulses مَطلوبة دنيا | 22 (γ+δ+ε+ζ+η = 5+4+6+3+4) |
| PRs نهائية | 8 + 1 final to main = 9 |
| Sessions تقديرية | 12-18 |

---

## ٤. ملفات state/ المُسخَّرة

| الملف | الدور |
|---|---|
| `state/PROGRESS.json` | نقطة استئناف + creativity_health + tadaffuq_v5 namespace |
| `state/AUDIT_BASELINE_v5.md` | baseline من α1 (يُكتَب مرة) |
| `state/TRUTH_LEDGER.md` | append-only أرقام محقَّقة (مَوروث من v4) |
| `state/PULSE_LOG.md` | append-only pulses (يُنشأ في α1) |

---

## ٥. Sacred Assets (مَوروث + مُحقَّق)

| الأصل | لماذا |
|---|---|
| `archive/` | تاريخ يُحفَظ |
| `prompts/v1, v2, v3, v4` | تاريخ القرار |
| 16 page sections | لا حذف |
| 14 page-h headers | لا حذف |
| 384 qcalc instances | لا حذف |
| 503 data-block-id | لا حذف |
| 15 data-page-personality | لا حذف |
| 40 Upg.* APIs | لن تُكسَر — قد تُمدَّد |
| 22 woff2 hybrid (W20) | لا CDN، local فقط |

— نهاية INDEX —
