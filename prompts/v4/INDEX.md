# ✦ ÊLAN v4 — Index
> الخريطة المرجعية. اقرأ هنا لمعرفة "أين نحن وأين نذهب".

---

## 📁 ملفات `prompts/v4/` (مُلزِمة على AUTO_PILOT)

### المفاتيح الأربعة (تُقرأ في كل session — من AUTO_PILOT بنفسه)
| الملف | الدور |
|---|---|
| `00_ELAN_MANIFESTO.md` | الدستور — 8 مبادئ + سياق العوالم |
| `CREATIVITY_DOCTRINE.md` | مذهب الإبداع — Beacons + Forbidden + Disruption |
| `WORLDS_ATLAS.md` | 8 عوالم — لوحات tokens كاملة |
| `AUTO_PILOT_v4.md` | البرومت الذي يلصقه المستخدم فقط |

### الإضافيات
| الملف | الدور |
|---|---|
| `INDEX.md` | هذا الملف |
| `README.md` | quick reference للمستخدم |

### Stage Specs (تُكتَب stage-by-stage)
| Pillar | Stages المتوقَّعة |
|---|---|
| α FOUNDATION | α1, α2, α3 |
| β TYPE SOUL | β1, β2, β3 |
| γ EIGHT WORLDS | γ1, γ2, γ3, γ4, γ5, γ6, γ7, γ8, γ9 |
| δ KINETIC SHELL | δ1, δ2, δ3, δ4, δ5, δ6 |
| ε CONTENT REVIVAL | ε1 — ε12 |
| ζ QUALITY GATE | ζ1, ζ2, ζ3, ζ4, ζ5 |

---

## 🏛 6 Pillars المفصَّلة

### Pillar α — FOUNDATION
| Stage | اسم | الدور |
|---|---|---|
| α1 | Forensic Audit | قياس قبل تعديل بـ grep |
| α2 | Token Architecture | 5 ملفات tokens (color/space/type/motion/breakpoint) |
| α3 | Module Manifest | 92→28 ملف JS بـ ESM حقيقي |

### Pillar β — TYPE SOUL
| Stage | اسم | الدور |
|---|---|---|
| β1 | Local Font Procurement | 7 خطوط غير-Google + verified |
| β2 | Voice Casting | 18 voice token + per-page voice |
| β3 | Numeric Kashida Signature | tabular nums + kashida + per-page sigs |

### Pillar γ — EIGHT WORLDS (الجوهر الجديد)
| Stage | عالم | الصفحات |
|---|---|---|
| γ1 | World Foundation (CSS structure) | بنية ملفات worlds/ |
| γ2 | حِبر (Hibr) | dashboard, myprogress |
| γ3 | نار (Naar) | lab, programming |
| γ4 | ندى (Nada) | psych, eq |
| γ5 | حَديد (Hadeed) | negotiation, fieldsales |
| γ6 | ذَهَب (Dhahab) | accounting |
| γ7 | تَيار (Tayyar) | social, callcenter |
| γ8 | وَرشة (Warsha) | phonerepair, customercare |
| γ9 | صَالون (Saloon) | hrmastery |

### Pillar δ — KINETIC SHELL (متوازي مع γ بعد γ1)
| Stage | اسم | الدور |
|---|---|---|
| δ1 | Sidebar Magnetic | sidebar يميل مع pointer |
| δ2 | Bento Dashboard (real) | تنفيذ Bento صادق + per-world |
| δ3 | Topbar Living | topbar يتنفس + Dynamic Island |
| δ4 | Mobile Bottom-Nav + Haptics | floating + safe-area + vibrate |
| δ5 | View Transitions API | transition بين العوالم |
| δ6 | Reduced Motion | احترام a11y |

### Pillar ε — CONTENT REVIVAL
| Stage | الصفحة | العالم |
|---|---|---|
| ε1 | dashboard | حِبر |
| ε2 | callcenter | تَيار |
| ε3 | fieldsales | حَديد |
| ε4 | social | تَيار |
| ε5 | lab | نار |
| ε6 | psych+eq+negotiation | ندى+حَديد |
| ε7 | customercare | وَرشة |
| ε8 | programming | نار |
| ε9 | accounting | ذَهَب |
| ε10 | phonerepair | وَرشة |
| ε11 | hrmastery | صَالون |
| ε12 | Cross-page Psychology Layer | متعدد |

### Pillar ζ — QUALITY GATE
| Stage | اسم | الدور |
|---|---|---|
| ζ1 | Inline Purge Truthful | inline → utilities (verified) |
| ζ2 | !important Cap | 276 → ≤ 20 |
| ζ3 | Lighthouse + A11y | mobile ≥ 92, a11y ≥ 96 |
| ζ4 | PWA Installable | offline ritual + installable |
| ζ5 | Changelog Truth Ledger | TRUTH_LEDGER → CHANGELOG رسمي |

---

## 🔢 الإحصاء

| البُعد | القيمة |
|---|---:|
| Pillars | 6 |
| Stages إجمالاً | 38 (3+3+9+6+12+5) |
| Branches متوقَّعة | 6 (واحد per pillar) |
| PRs نهائية | 6 |
| Beacons مطلوبة دنيا | ~27 (في γ + δ + ε، 27 stage × 1 minimum) |
| Sessions تقديرية | 15-20 |

---

## 📊 ملفات state/ المُسخَّرة

| الملف | الدور |
|---|---|
| `state/PROGRESS.json` | نقطة استئناف + creativity_health |
| `state/AUDIT_BASELINE.md` | baseline من α1 (يُكتَب مرة) |
| `state/TRUTH_LEDGER.md` | append-only أرقام محقَّقة |
| `state/CREATIVITY_LOG.md` | append-only beacons + STATS |

---

## 🛡 Sacred Assets

| الأصل | لماذا |
|---|---|
| `archive/` | تاريخ يُحفظ |
| `Upg.*` 14 APIs | backward-compat |
| 16 page sections | لا حذف |
| `prompts/v1, v2, v3` | تاريخ القرار |

---

— نهاية INDEX —
