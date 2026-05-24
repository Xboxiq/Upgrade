# ✨ Creativity Doctrine — مذهب الإبداع في ÊLAN v4
> **«كل session يَلد beacon. بعد عشر sessions، الواجهة لا تشبه شيئاً رأيتَه.»**
> هذا الملف يفرض الإبداع. يُقرأ في كل session قبل البدء.

---

## ١. الفرضية الأساسية

**AI الافتراضي يكرر نفسه.** لو طلبتَ من AI تصميم dashboard ثلاث مرات في ثلاث sessions منفصلة، ستحصل على نفس الـ glassmorphism + bento + لون أزرق + counter متحرك. هذه ضريبة "التدريب على Stack Overflow + Dribbble".

ÊLAN يكسر هذه الدورة عبر **ثلاث آليات صارمة**:
1. **Forbidden Patterns Library** — قائمة بالكليشيهات الممنوعة
2. **Creativity Beacons System** — كل stage يلتزم بـ beacon واحد على الأقل
3. **Differentiation Audit** — كل 3 stages مراجعة إلزامية للأنماط

---

## ٢. الـ Beacons الإبداعية — الفئات التسع

كل stage في γ/δ/ε **مُلزَم** بإنتاج Beacon من واحدة من الفئات التالية:

| رمز | الفئة | يعني |
|---|---|---|
| 🎨 | **VISUAL_BEACON** | عنصر بصري ثابت غير متوقَّع (e.g. gradient على شكل خط النَّسخ) |
| 🌊 | **MOTION_BEACON** | حركة/transition بنمط لم يَستخدمه AI من قبل |
| 🤚 | **INTERACTION_BEACON** | نمط تفاعلي غير قياسي (e.g. كشط الإصبع للحذف، long-press للـ undo) |
| 🔊 | **SOUND_BEACON** | إشارة صوتية محسوبة (≤ 200ms، subtle) |
| ✍️ | **TYPOGRAPHIC_BEACON** | معالجة نوع غير عادية (e.g. آيات على ميل النَّسخ، أرقام بـ kashida) |
| 🌈 | **CHROMATIC_BEACON** | استخدام لوني مفاجئ (e.g. لون يتغير حسب درجة حرارة الجهاز) |
| 🏛 | **STRUCTURAL_BEACON** | layout pattern غير مألوف (Brutalist, Memphis, Bauhaus, Postmodern) |
| 📊 | **DATA_BEACON** | طريقة تصور بيانات أصيلة (ليست chart.js افتراضي) |
| 🪞 | **META_BEACON** | الواجهة تتحدث عن نفسها (e.g. ribbon يعرض "stage آخر phase أُنجز") |

كل stage في pillars `γ`, `δ`, `ε` **يجب** أن يحتوي بياناً صريحاً في PR description:
```
🎯 Creativity Beacon for this stage:
Type: 🌊 MOTION_BEACON
The Surprise: لما يضغط المستخدم زر "أنجزتُها" في تمرين، تتفجَّر الـ button إلى 7 شظايا تشبه ضرب الفأس على معدن، بدل checkmark كليشيه.
Reference Avoided: standard ✓ check animation, confetti explosion
User-Visible: yes (visible on every exercise completion)
Originality Self-Score: 4/5
```

---

## ٣. مكتبة الكليشيهات المحظورة (Forbidden Library)

**هذه ممنوعة قطعياً** إلا لو تم subvert صراحة في spec الـ stage:

### المحظور البصري:
1. ❌ **glassmorphism panel** "ثاني" — لو موجود في γ، ممنوع في δ
2. ❌ **linen-bone / off-white-warm** كـ background رئيسي
3. ❌ **floating sidebar بـ pill icons** — هذا Notion/Linear/Stripe clone
4. ❌ **generic mesh gradient** (الـ purple-orange-pink الافتراضي)
5. ❌ **card بـ shadow ناعم + 12px radius** بدون contextual reason
6. ❌ **bento grid = مستطيلات بنفس padding**
7. ❌ **Apple/Stripe/Linear/Vercel surface clone**
8. ❌ **هـ skeuomorphic neumorphism** (انتهت موضتها 2021)
9. ❌ **isometric illustration** الـ tech-bro الأخضر-البنفسجي

### المحظور الحركي:
10. ❌ **pulsing dot** كـ loading
11. ❌ **animated counter من 0** (لو counter ضروري، يبدأ من رقم visible فوري ثم يتحرك)
12. ❌ **fade-in على scroll** بدون داعٍ
13. ❌ **spring bounce** على hover (Framer Motion default cliché)
14. ❌ **stagger animation** على card grids ("waterfall" overused)

### المحظور التفاعلي:
15. ❌ **modal بـ overlay داكن + center card** بدون reason
16. ❌ **toast بـ ✓ checkmark سطر واحد** افتراضي
17. ❌ **dropdown بـ chevron + slow expand**
18. ❌ **search bar بـ magnifier icon + placeholder "Search..."**

### المحظور النصي/الـ AI:
19. ❌ **placeholder "Lorem ipsum"** أو ترجمة عربية فضفاضة
20. ❌ **emoji بدل icon** — مهما كانت الحالة، حتى ☎ في button text
21. ❌ **"Powered by AI"** أو أي self-congratulation
22. ❌ **"Welcome back, [Name]!"** بدون شخصية مكتوبة

### المحظور الأيقوني (Iconography — تفصيل في ICONOGRAPHY_DOCTRINE):
23. ❌ **Toy SVG inline** — `<svg viewBox><path d="M..."/></svg>` يدوي ارتجالي
24. ❌ **خلط مكتبات icons** (Lucide + Phosphor + غيرهم في chrome واحد)
25. ❌ **Material Icons / FontAwesome / Bootstrap Icons** — أي مكتبة خارج Lucide + Phosphor
26. ❌ **unDraw / Storyset / Material 3D / isometric tech blobs** كـ illustrations
27. ❌ **icon size خارج السلم** (--icon-xs=14px إلى --icon-2xl=48px)
28. ❌ **hardcoded fill="#xxxxxx"** في icon markup (currentColor + tokens فقط)

**كيف تُكسَر هذه القاعدة؟** فقط لو spec الـ stage يقول صراحة `EXEMPT_PATTERN: <رقم>` ويبرر السبب. Iconography violations (#23-#28) **لا يمكن استثناؤها** — صارمة 100%.

---

## ٤. Pattern Disruption Protocol — بروتوكول كسر النمط

كل **3 stages** متتالية، الـ AUTO_PILOT يُلزَم بإجراء **Differentiation Audit**:

```
1. اقرأ آخر 3 entries من state/CREATIVITY_LOG.md
2. فحص: هل ≥ 2 منها من نفس فئة Beacon؟
3. لو نعم → MANDATORY PIVOT: stage الحالي يجب أن يستخدم فئة مختلفة
4. فحص: هل style بصري بدأ يتشابه؟ (e.g. كله warm tones)
5. لو نعم → invoke Wild Card Inspiration (أدناه)
```

### Wild Card Inspirations — مصادر الإلهام الإلزامية

عند تفعيل Pattern Disruption، AUTO_PILOT يختار عشوائياً (hash من stage name) واحداً من:

1. **Brutalist Iraqi Modernism** — Mohammed Makiya, Rifat Chadirji
2. **Persian Miniature** — Bihzad, Reza Abbasi
3. **Bauhaus Poster** — Herbert Bayer, Joost Schmidt
4. **Maqamat Music Notation** — Iraqi/Egyptian theory diagrams
5. **Yemeni Mihrab Geometry** — geometric prayer niche patterns
6. **Müller-Brockmann Grid** — Swiss modernist typography
7. **Memphis Group** — Ettore Sottsass postmodern
8. **Japanese Ema** — wooden prayer plaques + brush strokes
9. **Kufi Chocolate Block** — square Kufic calligraphy
10. **Nasta'liq** — Persian poetic calligraphy
11. **Mid-century Beirut Cinema** — Lebanese movie posters 1950-70
12. **Moroccan Zellige** — geometric mosaic tiling
13. **Iraqi Marsh Architecture** — reed mudhif structures
14. **Arabic Comics 1970s** — Egyptian/Lebanese pulp graphics
15. **Synthwave + Khat** — collision of vaporwave and Arabic ink

stage يكتب في commit: `Inspired-by: <#> <Name>` كـ trace للإلهام.

---

## ٥. سجل الإبداع — `state/CREATIVITY_LOG.md`

**شكل قياسي لكل entry:**

```markdown
## <stage-id> — <YYYY-MM-DD>
**Beacon Type:** <emoji> <CATEGORY>
**The Surprise:** <جملة واحدة عربية>
**Reference Avoided:** <كليشيه ممنوع تجنّبتَه + رقمه من Forbidden Library>
**Inspired-by:** <Wild Card # name، إن استُخدِم>
**User-Visible:** yes / no
**Originality Self-Score:** N/5
**Files touched:** <list>
**Verified at commit:** <sha>
```

---

## ٦. الـ Originality Self-Score — مقياس صدق

عند انتهاء stage، AUTO_PILOT يُقيّم نفسه 1-5:

| Score | المعنى |
|---|---|
| 1 | كليشيه مباشر — يجب reject ولا يُحفَظ commit |
| 2 | متوقَّع لكن نظيف — مقبول لـ Pillar α/ζ (غير creative) |
| 3 | **جيد** — تعديل بسيط على pattern معروف |
| 4 | **مميز** — pattern غير شائع في AI output |
| 5 | **استثنائي** — لم يَرَه AI آخر |

قواعد الصدق:
- ادعاء **5/5** يُتحدَّى تلقائياً في stage التالي ("ما الذي يجعله 5؟")
- متوسط الـ scores عبر المشروع يجب أن يكون ≥ 3.4
- لو متوسط أي 5 stages متتالية ≤ 3 → **Creativity Crisis** يُعلَن، session يتوقف ويطلب مراجعة بشرية

---

## ٧. Creativity Budget per session

كل session تنفيذية محدودة بـ:
- **1 Major Beacon** (visible UI moment يثير الإعجاب)
- **2 Minor Beacons** (detail polish)
- **0 cliché bypass** (لا exempt من Forbidden Library إلا بإذن صريح)

السبب: أكثر من ذلك يُرهق context؛ أقل من ذلك = session ضائعة.

---

## ٨. كيف يستخدمها AUTO_PILOT (الميكانيكا)

في كل stage، AUTO_PILOT ينفّذ **بالترتيب**:

```
1. اقرأ آخر 3 entries من state/CREATIVITY_LOG.md (≤ 60 سطر، خفيف على context)
2. اقرأ Forbidden Library (مختصرة ≤ 22 بنداً، خفيف)
3. Plan: اختر فئة Beacon لهذا stage (تختلف عن آخر 2)
4. Plan: تحقق spec الـ stage لا يحتوي EXEMPT_PATTERN
5. Plan: لو هذا stage 3rd-in-streak، شغّل Pattern Disruption + اختر Wild Card
6. Execute: اكتب الكود مع Beacon مدمج
7. Verify: اطبع الـ Beacon بصيغة قياسية في commit message
8. Append: state/CREATIVITY_LOG.md (entry جديد)
9. Audit: حدّث state/CREATIVITY_LOG.md → STATS section بالأرقام التراكمية
```

---

## ٩. القياس النهائي — Creativity Health Score

يُحسَب آلياً من `state/CREATIVITY_LOG.md`:

```
Creativity Health = (avg_score × 20) + (unique_beacon_categories × 5) - (forbidden_violations × 25)
                    Range: 0-100. Target: ≥ 78.
```

يُعرَض في `state/PROGRESS.json` كـ `elan_v4.creativity_health` ويُحدَّث كل stage.

---

## ١٠. خلاصة فلسفية

> "الـ AI ليس حدّاداً يطرق المعدن. هو نَسَّاج يستعير خيوطاً من ذاكرته. ÊLAN يفرض على الـ AI أن **يَنْسج خيطاً جديداً قبل كل لمسة**."

— نهاية Creativity Doctrine —
