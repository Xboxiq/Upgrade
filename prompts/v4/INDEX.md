# ✦ ÊLAN v4 — Index & Pillars Map
> الخريطة المرجعية لكل ملفات v4. اقرأ هذا الملف لمعرفة "أين أقف؟"

---

## 📁 محتويات `prompts/v4/`

### مفاتيح أساسية (تُلصَق في كل session)
| الملف | الدور |
|---|---|
| `00_ELAN_MANIFESTO.md` | الدستور — يُلصَق أولاً |
| `AUTO_PILOT_v4.md` | برومت التنفيذ الذاتي |
| `COMPACT_v4.md` | نسخة مضغوطة للجوّال (قادم) |
| `RESUME_v4.md` | استئناف من STAGE_SNAPSHOT (قادم) |
| `INDEX.md` | هذا الملف |

### Pillar α — FOUNDATION (الأساس)
| Stage | الملف | الدور |
|---|---|---|
| α1 | `α1_FORENSIC_AUDIT.md` | مسح حقائق فعلية بـ grep قبل أي تعديل |
| α2 | `α2_TOKEN_ARCHITECTURE.md` | 5 ملفات tokens منفصلة (color/space/type/motion/breakpoint) |
| α3 | `α3_MODULE_MANIFEST.md` | dependency graph + إعادة تنظيم 92→~25 ملف JS |

### Pillar β — TYPE SOUL (روح الخط)
| Stage | الملف | الدور |
|---|---|---|
| β1 | `β1_LOCAL_FONT_PROCUREMENT.md` | 7 خطوط غير-Google + verify على القرص |
| β2 | `β2_VOICE_CASTING.md` | 18 voice token + per-page voice signature |
| β3 | `β3_NUMERIC_KASHIDA_SIGNATURE.md` | tabular nums + kashida rhythm + page sigs |

### Pillar γ — CHROMA (اللون والروح)
| Stage | الملف | الدور |
|---|---|---|
| γ1 | `γ1_MAWJ_LIGHT.md` | Light theme: رمل + فيروز + قهوة |
| γ2 | `γ2_LAYL_DARK.md` | Dark theme: ليل صحراء + Aurora teal |
| γ3 | `γ3_SAHAR_TRANSITION.md` | تجريبي: تحوّل dark→light عند فتح المنصة |
| γ4 | `γ4_PER_PAGE_EMOTION.md` | tint عاطفي لكل صفحة (11 صفحة) |

### Pillar δ — KINETIC SHELL (القشرة الحركية، متوازي مع γ بعد γ1)
| Stage | الملف | الدور |
|---|---|---|
| δ1 | `δ1_SIDEBAR_MAGNETIC.md` | sidebar يميل خفيفاً مع pointer |
| δ2 | `δ2_BENTO_DASHBOARD.md` | Bento حقيقي (تنفيذ Worker 13 لكن صادقاً) |
| δ3 | `δ3_TOPBAR_LIVING.md` | topbar يتنفس + Dynamic-Island feel |
| δ4 | `δ4_MOBILE_BOTTOM_NAV.md` | bottom-nav floating + safe-area + haptics |
| δ5 | `δ5_VIEW_TRANSITIONS.md` | View Transitions API بين الصفحات |
| δ6 | `δ6_REDUCED_MOTION.md` | احترام prefers-reduced-motion |

### Pillar ε — CONTENT REVIVAL (إحياء المحتوى)
| Stage | الملف | الدور |
|---|---|---|
| ε1 | `ε1_DASHBOARD.md` | إحياء dashboard بحسب ÊLAN |
| ε2 | `ε2_CALLCENTER.md` | callcenter |
| ε3 | `ε3_FIELDSALES.md` | fieldsales + KAM |
| ε4 | `ε4_SOCIAL.md` | social + marketing |
| ε5 | `ε5_LAB.md` | lab السيناريوهات |
| ε6 | `ε6_PSYCH_EQ_NEGOTIATION.md` | الثلاثة كطبقة موحَّدة |
| ε7 | `ε7_CUSTOMERCARE.md` | customer care |
| ε8 | `ε8_PROGRAMMING.md` | programming |
| ε9 | `ε9_ACCOUNTING.md` | accounting + tax IQ |
| ε10 | `ε10_PHONEREPAIR.md` | phone repair |
| ε11 | `ε11_HRMASTERY.md` | HR + salary negotiation |
| ε12 | `ε12_PSYCHOLOGY_LAYER.md` | طبقة عرضية متغلغلة |

### Pillar ζ — QUALITY GATE (الفحص النهائي)
| Stage | الملف | الدور |
|---|---|---|
| ζ1 | `ζ1_INLINE_PURGE_TRUTHFUL.md` | inline → utilities (verified by grep) |
| ζ2 | `ζ2_IMPORTANT_CAP.md` | !important: 276 → ≤ 20 |
| ζ3 | `ζ3_LIGHTHOUSE_A11Y.md` | mobile ≥ 92, a11y ≥ 96 |
| ζ4 | `ζ4_PWA_INSTALLABLE.md` | offline ritual + installable |
| ζ5 | `ζ5_CHANGELOG_LEDGER.md` | TRUTH_LEDGER → CHANGELOG رسمي |

---

## 🔢 الحسابات

| البُعد | القيمة |
|---|---:|
| Pillars | 6 (α, β, γ, δ, ε, ζ) |
| Stages إجمالاً | 33 |
| Branches متوقَّعة | 6 |
| PRs متوقَّعة | 6 (واحد per pillar) |
| Stages في الـ session الواحد المتوسط | 2-4 |
| Sessions تقديرية للإنجاز الكامل | 12-15 |

---

## 🚦 ترتيب التنفيذ المُلزِم

### Critical Path (لا يُكسَر):
```
α1 → α2 → α3   (FOUNDATION أولاً، لا يُتجاوز)
   ↓
β1 → β2 → β3   (TYPE قبل CHROMA لأن alignment يعتمد على voice metrics)
   ↓
γ1            (Mawj أولاً، إجباري قبل بقية γ و δ)
```

### بعد γ1 يصير التوازي ممكناً:
- γ2, γ3, γ4 (chroma) **بالتوازي مع** δ1-δ6 (shell)
- ε1-ε12 (content) بعد إنجاز γ كاملة و δ1+δ2+δ4 على الأقل

### ζ آخر دائماً:
- ζ1-ζ5 لا تُنفَّذ قبل اكتمال α + β + γ + δ + ε

---

## 📊 مقاييس النجاح المُتعهَّد بها

| المقياس | الحالي (verified) | الهدف بعد ζ |
|---|---:|---:|
| ملفات woff2 على القرص | 0 | ≥ 12 (3 stages × 4 أوزان) |
| `!important` total | 276 | ≤ 20 |
| `inline style=` index | 89 | ≤ 30 |
| `font-family` declarations | 336 | ≤ 80 (مركَّزة في 18 voice token) |
| ملفات JS في /js/ | 92 | ≤ 28 |
| pages.css سطور | 26,404 | ≤ 9,000 (مُقسَّم بحسب section) |
| Pages preserved | 16 | 16 (sacred) |
| Upg.* APIs preserved | 14 | 14 (sacred) |
| Lighthouse Mobile Perf | ? | ≥ 92 |
| Lighthouse Mobile A11y | ? | ≥ 96 |
| One-thumb CTAs in lower 50% (mobile) | ? | ≥ 80% |

---

## 🛡️ Sacred Assets (محرَّمة على كل phases)

| الأصل | الموقع | السبب |
|---|---|---|
| الأرشيف الأصلي | `archive/arabic-translation-platform-v12-original.html` | تاريخ يُحفظ |
| 14 Upg.* API | `window.Upg.*` (Upg.font, Upg.theme, Upg.nav, Upg.state, Upg.cmdk, …) | backward-compat |
| 16 page sections | `<section class="page" id="page-*">` | لا حذف |
| `state/PROGRESS.json` | جذر الريبو | ذاكرة النظام |
| `prompts/v1, v2, v3` | كاملة | تاريخ القرار |

---

— نهاية INDEX —
