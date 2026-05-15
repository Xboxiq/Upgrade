# 📞 WORKER 03 — Call Center Mastery (Voice Psychology Edition)
> **متطلب مسبق:** MASTER PROMPT محمّل.
> **الصفحة المستهدفة:** `page-callcenter` (تطوير المحتوى الموجود + إضافة طبقات جديدة).

---

## 🎯 الهدف

تحويل صفحة الكول سنتر من "دليل عام" إلى **مختبر صوتي علمي** يُدرّب الموظف على:
- علم نفس الصوت (Vocal Psychology)
- ذكاء عاطفي صوتي (لا ترى الوجه — تقرأ الصوت)
- إدارة المكالمات الحرجة (Crisis Calls)
- التعامل مع 14 نمط عميل صعب (مع أمثلة عراقية)

**ميزة فريدة:** أداة **Voice Self-Assessment** — يسجّل المستخدم 30 ثانية من صوته، ويحسب JS:
- **WPM** (Words Per Minute) عبر Web Speech API (offline-friendly)
- **Pitch variability** عبر Web Audio API + AnalyserNode
- **Pause ratio**
- **Energy consistency**
ويعطي تقرير + توصيات. كل المعالجة محلية (لا server).

---

## 📚 العمود الفقري المعرفي

### A. The Voice Profile — 5 أبعاد قابلة للقياس
1. **Pace** (الإيقاع) — 140-160 WPM optimal للعربية
2. **Pitch** (طبقة الصوت) — variability ≥ 15% تمنع الرتابة
3. **Volume** (مستوى الصوت) — consistent بدون قمم مفاجئة
4. **Tone** (النبرة) — warm vs. flat — تُقاس بنسبة harmonics في الـ formant
5. **Pause** (الوقفات) — 0.4-0.8s بعد النقاط المهمة

كل بُعد له بطاقة فيها:
- التعريف العلمي
- Norm Range للعربية
- خطأ شائع (مع تسجيل صوتي مكتوب: "هكذا يبدو الخطأ")
- تمرين تصحيحي يومي (5 دقائق)

### B. The 14 Difficult Caller Archetypes
| # | النمط | السلوك | الجذر النفسي | الاستراتيجية |
|---|---|---|---|---|
| 1 | الصارخ (Screamer) | يرفع صوته فوراً | شعور بفقدان السيطرة | LEAR: Listen→Empathize→Acknowledge→Reframe |
| 2 | المتشكي المزمن | كل شي مشكلة | حاجة للاعتراف | أعطه space + lead him to one issue |
| 3 | الخبير المزيّف | "أنا أعرف أكثر منك" | حاجة للتقدير | أكّد خبرته + أضف معلومة جديدة برفق |
| 4 | المُهدِّد القانوني | "راح أشتكي عليكم" | خوف + غضب | اطمأن للإجراء، لا تتراجع، escalate رسمياً |
| 5 | البكّاء العاطفي | يبكي/يستجدي | محنة حقيقية أحياناً | empathy 100% + خيارات واقعية |
| 6 | المتسرّع | "بسرعة بس!" | ضيق وقت/تعب | summarize + 3 خيارات مختصرة |
| 7 | الصامت | جواب من كلمة | خجل/إحراج | open-ended Qs + تشجيع |
| 8 | المُساوم | يفاوض على كل شي | ثقافة سوق محلية | حدود واضحة + bundle بدل خصم |
| 9 | المحتال (Scammer) | يحاول الحصول على معلومات | احتيال | بروتوكول التحقق + تصعيد لـ fraud team |
| 10 | الـ VIP المتكبر | "أنا مش أي حدا" | ego need | special handling lane (إذا فعلاً VIP) |
| 11 | المُكرّر | يتصل 5 مرات بنفس المشكلة | فقدان ثقة | escalate لتيكيت واحد + ownership |
| 12 | الغاضب الهادئ | بارد لكنه قاسي | غضب مكبوت | احذر — هذا الأخطر — كن دقيق جداً |
| 13 | الفضولي | يسأل أسئلة خارج الموضوع | ملل | redirect برفق |
| 14 | الـ Boundary Violator | يطلب رقمك الشخصي | تجاوز | redirect رسمي + توثيق |

### C. The Empathy Loop — 4 خطوات
1. **Acknowledge** — "أفهم تماماً إن هذا الموقف مزعج"
2. **Validate** — "حقك تكون منزعج، أي حدا بمكانك راح يحس نفس الشي"
3. **Refocus** — "خلّيني أساعدك نطلع من هذا الموقف"
4. **Action** — خطوة محددة بزمن محدد

كل خطوة لها 3-5 صياغات بديلة بالعربي الفصيح + 3 صياغات بالعراقية.

### D. KPIs للكول سنتر — تفصيل علمي
بطاقة تفاعلية لـ KPIs:
- **AHT** (Average Handle Time) — معادلة + benchmark + متى يكون قصير جداً (سيء!) 
- **FCR** (First Call Resolution) — لماذا أهم من AHT
- **CSAT** vs **NPS** — الفرق + متى تستخدم كل واحد
- **Adherence** — التزام الجدول
- **AHT/FCR Tradeoff** — المعادلة المثلى
- **Quality Score Rubric** — 8 معايير وزنية

أداة Calculator: تدخل أرقامك وتقارن بـ industry benchmark (مع citation: ICMI, CCW Research).

### E. Call Anatomy — 7 مراحل علمية
1. **Greeting (5s)** — 3 عناصر: شركة + اسم + كيف أساعدك
2. **Active Listening (15-30s)** — لا تقاطع
3. **Mirroring** — تردد 1-3 كلمات رئيسية (Voss technique)
4. **Diagnose** — أسئلة محددة
5. **Position Solution** — features → benefits → proof
6. **Close** — تأكيد الاتفاق + ما القادم
7. **Soft Goodbye** — تأكيد رضى + فتح باب للعودة

كل مرحلة فيها: time budget + script template + common mistakes.

---

## 🇮🇶 Iraq-Specific Block

### نطاقات الراتب
| المستوى | راتب IQD | شركات معروفة |
|---|---|---|
| Junior Agent (0-1y) | 500k - 750k | Asiacell, Zain, Earthlink, IQ Telecom |
| Senior Agent (2-4y) | 750k - 1.1M | البنوك، شركات التأمين |
| Team Lead | 1.2M - 1.8M | Operations centers |
| QA Specialist | 1.3M - 2M | Quality assurance |
| Trainer | 1.5M - 2.2M | T&D departments |

### اعتراضات/تحديات عراقية شائعة (10):
1. "الـ network ضعيف عندكم" (شكوى موصلات)
2. "ليش ما تكلموني عربي فصيح؟" (لهجة)
3. "أنا حسابي قطع وأنا ما عملت شي" (billing dispute)
4. "صار 3 أيام والمشكلة ما اتحلت" (escalated frustration)
5. "خل مديركم يكلمني" (escalation demand)
6. "هاي الشركة لا أحد يرد بيها" (CSAT bad)
7. "أحجي عربي ما أحجي إنكليزي" (language)
8. "ما أعرف أكتب باللاب توب" (low digital literacy)
9. "يبني عمي إنته منين متصل، من العراق لو من برة؟" (offshore concern)
10. "كم تأخذ راتب أنت؟" (boundary test)

كل اعتراض → بطاقة بسيناريو كامل (3 turns).

---

## 🧪 Interactive Labs

### Lab 1: Voice Self-Assessment Studio
كما وُصف أعلاه — Web Audio + Web Speech.
متطلبات:
- زر record (يطلب permission)
- progress bar 30 ثانية
- بعد الانتهاء: تقرير 5 أبعاد + رسم spectrogram بسيط (Canvas)
- حفظ آخر 5 محاولات في localStorage مع تواريخ
- Privacy notice: كل شي محلي، ما يُرسل لأي مكان

### Lab 2: Difficult Caller Simulator
- قائمة 14 archetype
- تختار واحد → يطلع لك سيناريو text-based (4-6 turns)
- بعد كل turn، تختار ردك من 4 خيارات (واحد ممتاز، اثنان متوسط، واحد كارثي)
- نهاية المحاكاة: report بالخيارات + شرح ليش كل خيار صحيح/خاطئ

### Lab 3: KPI Dashboard Calculator
- inputs: عدد المكالمات، AHT، FCR%، CSAT, ابسنس
- يحسب الـ "Agent Performance Index" (composite)
- يقارن بـ benchmark + يعطي 3 توصيات تخصصية

---

## 📋 PRE-FLIGHT

```
📋 PRE-FLIGHT CHECK
├─ Worker requested: 03 — Call Center Mastery
├─ Phases planned: 4
├─ Estimated total lines: ~2,400
├─ Existing sections to preserve: All current page-callcenter content (cycle, quiz)
├─ New sections to create: voice-profile, archetypes-library, empathy-loop, kpi-calculator, voice-studio-lab, simulator-lab
├─ localStorage keys: upg_progress_cc, upg_voice_recordings_meta, upg_simulator_scores
└─ Citations to include: 12+ (Voss, ICMI, Goleman, Cialdini, Web Audio API specs)
```

---

## 🧱 المراحل

| Phase | المحتوى | ~Lines |
|---|---|---|
| 1/4 | Voice Profile (5 أبعاد) + Empathy Loop + 14 Archetypes Cards | 700 |
| 2/4 | KPI Deep-Dive + Calculator + Call Anatomy 7 Stages | 600 |
| 3/4 | Voice Self-Assessment Studio (Web Audio + Web Speech + Privacy banner) | 600 |
| 4/4 | Difficult Caller Simulator + Iraq Block + Citations + Cheat Sheet | 500 |

اختم كل Phase بـ CHECKPOINT + STATE_SNAPSHOT.
