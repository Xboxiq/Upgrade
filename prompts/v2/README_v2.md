# 🔔 Pack v2 — RESONANCE
> **استكمال طبيعي لـ Pack v1.** بعد بناء الكاتدرائية، نُحييها.

---

## 🌅 ما هذا الـ Pack؟

`Pack v2 — RESONANCE` هو الجيل الثاني من برومتات منصة Upgrade، يبني فوق Cathedral v16 (نتاج Pack v1: Workers 01–14 ATELIER COMPLETE).

**الفرق الجوهري:**

| البُعد | Pack v1 (تم) | Pack v2 (الحالي) |
|---|---|---|
| الهدف | بناء الكاتدرائية | **إحياؤها** |
| المحاور | بنية + محتوى + Apple-grade | **روح + ذوق + ترتيب pedagogical** |
| المنتج | منصة احترافية | **رفيق تدريب يومي شخصي** |
| الأسلوب | Outside-in | **Inside-out** |
| القارئ | فريق تطوير | **مالك المنصة فقط** |

> Pack v1 = "تشتغل وتبدو فاخرة" → ✅ تم.
> Pack v2 = "أمتع جلسة تدرّب يومية" → 🎯 الآن.

---

## 🧭 الواقع المحوري (لا تنساه)

> **هذي منصة شخصية للمالك فقط. ملف يشتغل offline. لا production، لا مستخدمين آخرين.**

ما يعنيه ذلك للـ Pack v2:
- ❌ **لا** Performance budget CI / Lighthouse gates / monitoring
- ❌ **لا** Data layer ثقيل / IndexedDB / encryption / sync
- ❌ **لا** Telemetry / Analytics / Heatmaps / A/B tests
- ❌ **لا** Multi-user / Auth / Authorization
- ❌ **لا** GitHub Actions / governance / contributing guides
- ✅ **نعم** Typography craft عميق
- ✅ **نعم** UI تتنفّس وتنبض
- ✅ **نعم** محتوى مُعاد ترتيبه pedagogically
- ✅ **نعم** print + cheat sheets شخصية
- ✅ **نعم** صقل صغير محسوس

---

## 📁 محتويات Pack v2

### 🔹 Meta files (7) — ألصقها في كل session

| الملف | متى تستخدمه |
|---|---|
| `00_MASTER_PROMPT_v2.md` | **مرة في بداية كل session جديد** قبل أي Worker |
| `AUTO_PILOT_v2.md` | للتنفيذ الذاتي الكامل (موصى به) |
| `COMPACT_MASTER_v2.md` | نسخة مضغوطة لـ Master لو الـ context ضيّق |
| `10_RESUME_PROTOCOL_v2.md` | لاستئناف session منقطع |
| `CONTEXT_LIMIT_FIX_v2.md` | حل مشكلة context limit جذرياً |
| `MOBILE_KIRO_v2.md` | دليل تشغيل Kiro Mobile مع Pack v2 |
| `README_v2.md` | هذا الملف — اقرأه مرة واحدة |

### 🔹 Workers (5) + Phases (26)

| Worker | الملفات | الـ Phases | الفلسفة |
|:---:|---|:---:|---|
| **15** | `15_WORKER_TYPOGRAPHY_SOUL.md` + 6 phase files | 6 | الخط صوت المعنى |
| **16** | `16_WORKER_VITAL_UI.md` + 6 phase files | 6 | الواجهة تتنفّس |
| **17** | `17_WORKER_CONTENT_REVIVAL.md` + 6 phase files | 6 | إعادة ترتيب pedagogical |
| **18** | `18_WORKER_LEARNING_SHELL.md` + 4 phase files | 4 | غلاف تدرّب شخصي |
| **19** | `19_WORKER_MICRO_POLISH.md` + 4 phase files | 4 | صقل نهائي |

### 🔹 الطقس الخاص (1)

| الملف | الوظيفة |
|---|---|
| `CONTENT_REORDER_RITUAL.md` | برومت مستقل ينفّذ بأمر واحد لإعادة ترتيب كل الـ blocks في الـ 14 صفحة حسب الصعوبة + المنطق pedagogical |

**المجموع: ٣٩ ملفاً.**

---

## ▶️ كيف تستخدم Pack v2 (3 خطوات)

### الخطوة 1 — تحقق من Pack v1 مكتمل

افتح `state/PROGRESS.json` وتأكد:
```json
{
  "current": {
    "worker": "14",
    "phase": 6,
    "status": "done"
  }
}
```

لو أي شي ناقص في Pack v1، أكمله أولاً قبل البدء بـ v2.

### الخطوة 2 — اختر mode

#### 🚁 AUTO_PILOT mode (الموصى به)

1. افتح session جديد في Kiro
2. الصق `prompts/v2/AUTO_PILOT_v2.md` كاملاً
3. اضغط Send واترك Kiro يشتغل
4. عُد بعد 15-30 دقيقة، كل phase = commit + push على branch واحد طولي

#### 🎛️ Manual mode

1. افتح session جديد
2. الصق `prompts/v2/00_MASTER_PROMPT_v2.md`
3. الصق `prompts/v2/15_PHASE_1_TYPE_AUDIT_CASTING.md` (مثلاً)
4. اكتب: `موافق ابدأ`
5. بعد كل phase: انسخ STATE_SNAPSHOT لجهازك
6. كرر للـ phase التالي

### الخطوة 3 — راقب التقدم

افتح GitHub:
- ✅ `state/PROGRESS.json` — تحديث بعد كل phase
- ✅ `state/snapshots/worker-15-phase-N.json` — snapshot لكل phase
- ✅ `feat/prompts-pack-v2-resonance` branch — كل العمل
- ✅ آخر PR مفتوح/مدموج

---

## 🗺️ خريطة Pack v2 الكاملة (التسلسل المُلزِم)

```
🔔 Pack v2 — RESONANCE
│
├── Worker 15 — TYPOGRAPHY SOUL (الأساس)
│   ├── Phase 1: Type Audit & Casting (تحديد كل صوت)
│   ├── Phase 2: Arabic Display Crown (Reem Kufi + Aref Ruqaa)
│   ├── Phase 3: Arabic Body (Cairo + IBM Plex Arabic + Tajawal)
│   ├── Phase 4: Latin & Numeric (Inter + JetBrains Mono + Fraunces)
│   ├── Phase 5: Modular Scale & Rhythm (perfect-fourth + 8pt baseline)
│   └── Phase 6: Per-Page Personality (14 type signatures)
│
├── Worker 16 — VITAL UI (الروح)
│   ├── Phase 1: Living Surfaces (ambient gradients + breathing)
│   ├── Phase 2: Tactile Microinteractions (signatures + ripple)
│   ├── Phase 3: Cinematic Page Transitions (depth + parallax)
│   ├── Phase 4: Pointer Companion (cursor trail + magnetic)
│   ├── Phase 5: Sound Design (UI sounds optional)
│   └── Phase 6: Identity Auras (14 page auras)
│
├── Worker 17 — CONTENT REVIVAL (المعنى)
│   ├── Phase 1: Forensic Inventory (جرد JSON كامل)
│   ├── Phase 2: Difficulty Scoring (1-5 ⭐ لكل block)
│   ├── Phase 3: Pedagogical Reorder (ascending difficulty)
│   ├── Phase 4: Content Enrichment (scenarios عراقية إضافية)
│   ├── Phase 5: Citation Hardening (تحديث المصادر 2025-2026)
│   └── Phase 6: Cross-Linking Web (knowledge mesh)
│
├── Worker 18 — LEARNING SHELL (الرفقة)
│   ├── Phase 1: Progress Markers (checkboxes + streak)
│   ├── Phase 2: Reading Mode (focus zen عربي)
│   ├── Phase 3: Cheat Sheet Generator (A4 طباعة)
│   └── Phase 4: Personal Notes Layer (margin notes)
│
├── Worker 19 — MICRO POLISH (الصقل)
│   ├── Phase 1: Mobile Mastery (touch ≥ 44px + haptic)
│   ├── Phase 2: Print Atelier (print stylesheet لكل صفحة)
│   ├── Phase 3: Detail Shop (focus rings + scrollbar + caret)
│   └── Phase 4: Final Audit Sweep (مرور كامل)
│
└── 🎯 CONTENT_REORDER_RITUAL.md (الطقس النهائي — يُنفَّذ بعد Worker 17)
```

> **ترتيب التنفيذ المُلزِم:** `15 → 16 → 17 → 18 → 19 → CONTENT_REORDER_RITUAL`
>
> السبب: Worker 16 يستخدم type tokens من Worker 15. Worker 17 يحتاج هيكل مرئي ناضج من 16. Worker 18 يبني فوق محتوى مُعاد الترتيب. Worker 19 يصقل الكل. الـ Ritual طقس نهائي يُنفَّذ بضغطة واحدة بعد كل ما سبق.

---

## 📊 المقاييس النهائية لـ Pack v2

| المقياس | قبل (Cathedral v16) | بعد Pack v2 (الهدف) |
|---|---:|---:|
| Font families في الـ stack | 5 (Cairo, Reem, Readex, Plex Arabic, Aref) | **9** (+Tajawal, +Inter, +JetBrains Mono, +Fraunces) |
| Type voices المُربوطة بدور | 5 | **9** (display, hero, text, ui, numeric, code, accent, quote, label) |
| Per-page type signatures | 0 | **14** (واحدة لكل صفحة) |
| Living motion layers | 1 (motion + choreo) | **5** (life + aura + cursor + sound optional + pulses) |
| Page transitions | basic fade | **cinematic depth + parallax** |
| Content blocks مع `data-difficulty` | 0 | **100% (~500+ block)** |
| Curriculum map page | غير موجودة | **`page-curriculum`** |
| Reading focus mode | غير موجود | **متوفّر بـ Cmd+. shortcut** |
| Print stylesheets منفصلة | 1 generic | **14 (واحد لكل صفحة)** |
| Touch targets ≥ 44px | غير مضمون | **100% on interactive** |
| New Upg.* APIs | 19 | **≥ 25** (+type2, +life, +aura, +curriculum, +reading, +notes, +reorder) |

---

## 🛡️ ضمانات Pack v2 (ما لن يحدث)

- ✅ **لن** يُحذف أي feature موجود في Cathedral v16
- ✅ **لن** يُكسر أي من 19 Upg.* APIs الموجودة
- ✅ **لن** تُحذف أي من 14 صفحة
- ✅ **لن** تُغيّر قيم 15 identity tints (HSL محفوظة)
- ✅ **لن** يُلمس `archive/`
- ✅ **لن** يُضاف CDN/library/framework
- ✅ **لن** يُلمس Pack v1 prompts/* (مكتبة مرجعية للأبد)
- ✅ **لن** تُضاف ميزات governance/CI/analytics

---

## 🆘 إذا انقطع المساعد

1. افتح session جديد
2. الصق `00_MASTER_PROMPT_v2.md`
3. الصق `10_RESUME_PROTOCOL_v2.md`
4. الصق آخر `STATE_SNAPSHOT` JSON
5. اكتب: `استأنف من حيث توقفت`

أو ببساطة استخدم `AUTO_PILOT_v2.md` — يقرأ `state/PROGRESS.json` ويعرف وين توقّف تلقائياً.

---

## 🎯 خارطة الطريق المقترحة (5 جلسات)

| الجلسة | Worker | الناتج |
|:---:|---|---|
| 1 | Worker 15 (Typography Soul) — 6 phases | 14 صفحة بـ 9 voices مُختلفة |
| 2 | Worker 16 (Vital UI) — 6 phases | الواجهة تتنفّس + auras |
| 3 | Worker 17 (Content Revival) — 6 phases | محتوى مُرتّب pedagogically |
| 4 | Worker 18 + 19 (Shell + Polish) — 8 phases | reading mode + cheat sheets + صقل |
| 5 | CONTENT_REORDER_RITUAL | تطبيق reorder + curriculum map |

**التقدير الزمني:** 5–8 ساعات عمل AI موزّعة على 5 sessions = منصة "ترنّ".

---

## 💡 نصائح ذهبية

1. **لا تتسرّع.** Worker 15 (Typography) أهم من كل البقية — لا تتجاوزه.
2. **اختبر بصرياً بعد كل phase.** افتح `platform/index.html` في المتصفح، تجوّل في الصفحات.
3. **خذ screenshots قبل كل Worker.** للمقارنة لاحقاً.
4. **CONTENT_REORDER_RITUAL** نفّذه أخيراً — يحتاج كل ما سبق ناضج.
5. **لو شي ما عجبك** بصرياً، rollback الـ commit بـ `git reset --hard HEAD~1` وابدأ من جديد.

---

## 📞 إذا واجهت مشكلة

- استخدم `CONTEXT_LIMIT_FIX_v2.md`
- استخدم `10_RESUME_PROTOCOL_v2.md`
- استخدم `MOBILE_KIRO_v2.md` لو على الجوّال

---

**جاهز؟ ابدأ من `AUTO_PILOT_v2.md` — وارجع بعد ساعة لتجد Worker 15 منفّذاً.**

🔔 **Resonance over noise. Soul over shine.**
