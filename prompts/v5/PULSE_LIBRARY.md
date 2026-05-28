# 🌊 Pulse Library — مكتبة النَّبَضات في TADAFFUQ v5
> **«كل stage في γ/δ/ε/ζ/η يَلد نَبَضة. الواجهة بعد 27 stage = 27 لحظة لم يَفعلها AI آخر.»**

---

## ١. ما الـ Pulse؟

في v4 كانت تُسمَّى "Beacons" — لحظات بصريَّة/تفاعليَّة استثنائيَّة. v5 يُغيِّرها إلى **Pulse** (نَبَضة) لأن الفلسفة تَطوَّرت:

- v4 Beacon = "لحظة تُلفت النظر"
- v5 Pulse = "نَبَضة تُحرِّك التَّدَفُّق"

كل Pulse يَجب أن **يُحرِّك** المستخدم إلى الفعل التالي. ليست استعراضاً، بل دفعة نَهر.

### قواعد النَّبَضة:
- مدّتها **≤ 880ms** (لا تَكسر تَدَفُّق المستخدم)
- تَستخدم 1 من الـ 3 feedback patterns (Press / Bloom / Settle) أو امتداد منطقي منهم
- لا تَتطلَّب action ثانٍ من المستخدم لإكمالها
- لا تَتنافس مع pulse أخرى ظاهرة معاً
- تَحترم reduced-motion (تَنحدر إلى opacity-only أو تَسكت)

---

## ٢. الفئات التِّسع (9 Categories)

| رمز | الفئة | يعني |
|---|---|---|
| 🌬 | **BREATH_PULSE** | تَنفُّس بطيء (هادئ, أمد طويل) — للأسطح الكبرى |
| ⚡ | **STRIKE_PULSE** | ضربة سريعة (hair/quick) — للـ feedback |
| 🪶 | **DRIFT_PULSE** | انجراف خفيف (parallax, magnetic) — للتنقُّل |
| 💧 | **DROP_PULSE** | سُقوط محسوب (settle بِنُكتة) — للـ panels |
| 🪞 | **MIRROR_PULSE** | ردّ صدى (الواجهة تَتحدَّث عن نفسها) |
| 🔮 | **REVEAL_PULSE** | كشف لطبقة محجوبة (data on demand) |
| 🌀 | **SWIRL_PULSE** | حركة دائريَّة (loading, transition) |
| 📐 | **SHAPE_PULSE** | تَغَيُّر هندسة (corner, radius, layout shift محسوب) |
| ✍️ | **INK_PULSE** | tracking/leading/weight typographic moment |

### القاعدة الذهبية للتنويع:
كل stage يَختار فئة **مختلفة** عن آخر 2 stage. إن تَكرَّرت 3 stages متتاليات بنفس الفئة → **Pivot Rule** يَفرض اختيار فئة من الـ 6 المتبقّية.

---

## ٣. مكتبة المحظورة (25 Forbidden — الكامل)

### المحظور البصري (8):
1. ❌ glassmorphism panel "ثاني" — surface واحد per region فقط
2. ❌ linen-bone palette (off-white-warm) — استبدلها بـ light-mode careful
3. ❌ floating sidebar بـ pill icons — استخدم dock pattern
4. ❌ generic mesh gradient (purple-orange-pink) — استخدم tonal token gradient
5. ❌ card بـ shadow ناعم + 12px radius (default AI) — اختر معماري
6. ❌ bento = مستطيلات بنفس padding — density rhythm
7. ❌ Apple/Stripe/Linear/Vercel surface clone — تَدَفُّق له معمار خاص
8. ❌ skeuomorphic neumorphism (2021 موضة) — surfaces الثلاثة

### المحظور الحركي (5):
9. ❌ pulsing dot loading spinner — استخدم Settle مع skeleton
10. ❌ animated counter من 0 — render value, ثم Strike pulse
11. ❌ fade-in على scroll بدون داعٍ — Reveal فقط بإذن
12. ❌ stagger animation على card grids ("waterfall") — overused
13. ❌ Framer-default spring bounce على hover — استخدم spring-soft معايَر

### المحظور التفاعلي (5):
14. ❌ modal بـ overlay داكن + center card — استخدم slide-over
15. ❌ toast notification — استخدم Bloom pattern
16. ❌ dropdown بـ chevron + slow expand — popover settle
17. ❌ search bar بـ magnifier icon + "Search..." placeholder — cmdk
18. ❌ "Welcome back, [Name]!" بدون شخصيَّة عربيَّة — استخدم تَدَفُّق نصِّي محسوب

### المحظور الأيقوني (4 — مع ICONOGRAPHY_DOCTRINE):
19. ❌ أي emoji نصي في markup
20. ❌ inline `<svg viewBox>` يدوي خارج sprite
21. ❌ مكتبة icons خارج Lucide + Phosphor
22. ❌ خلط مكتبتين في chrome region واحد

### المحظور المعماري (3):
23. ❌ `position: fixed; inset: 0` modal — استبدله بـ slide-over
24. ❌ أكثر من accent-action واحد per screen
25. ❌ surface رابع خارج Paper/Glass/Metal

### الاستثناء الوحيد:
spec الـ stage يَكتب صراحة:
```
EXEMPT_PATTERN: #<N>
JUSTIFICATION: <جملة>
```
الاستثناء **ممنوع** على #19-22 (Iconography). Iconography صارمة 100%.

---

## ٤. Wild Cards (25 — مصادر إلهام إلزاميَّة)

عند تَفعيل Pivot Rule، AUTO_PILOT يَختار wild card (hash من stage id):

1. **Brutalist Iraqi Modernism** (Mohammed Makiya, Rifat Chadirji)
2. **Persian Miniature** (Bihzad, Reza Abbasi)
3. **Bauhaus Poster** (Herbert Bayer, Joost Schmidt)
4. **Maqamat Music Notation** (Iraqi/Egyptian theory diagrams)
5. **Yemeni Mihrab Geometry** (geometric prayer niche)
6. **Müller-Brockmann Grid** (Swiss modernist typography)
7. **Memphis Group** (Ettore Sottsass postmodern)
8. **Japanese Ema** (wooden prayer plaques + brush strokes)
9. **Kufi Chocolate Block** (square Kufic calligraphy)
10. **Nasta'liq** (Persian poetic calligraphy)
11. **Mid-century Beirut Cinema** (1950-70 Lebanese posters)
12. **Moroccan Zellige** (geometric mosaic tiling)
13. **Iraqi Marsh Architecture** (mudhif reed structures)
14. **Arabic Comics 1970s** (Egyptian/Lebanese pulp)
15. **Synthwave + Khat** (vaporwave × Arabic ink)
16. **Risograph Print Texture** (granular two-color print)
17. **Industrial Schematic** (engineering blueprint dotted)
18. **Astrolabe Mechanics** (Arab medieval instruments)
19. **Fes Tannery Color** (mineral ochre + indigo + henna)
20. **Cairo Mashrabiya** (carved wood lattice geometry)
21. **Sumerian Cuneiform** (wedge-form impressions)
22. **Andalusian Ribbed Vault** (complex muqarnas)
23. **Hejazi Inscription Architecture** (Mecca old building lettering)
24. **Beirut Postal Stamp 1960s** (modernist stamp design)
25. **Najaf Minbar Carving** (raised wood mimbar geometry)

كل stage يُحرِّك Pivot يَكتب في commit:
```
Inspired-by: #<N> <Name>
```

---

## ٥. سجل النَّبَضات — `state/PULSE_LOG.md` (شكل قياسي)

```markdown
## <stage-id> — <YYYY-MM-DD>
**Pulse Category:** <emoji> <CATEGORY>
**The Surprise:** <جملة عربيَّة واحدة، مكتوبة كَنَثر، ليست bullet list>
**Reference Avoided:** <Forbidden #N name + رقمه>
**Inspired-by:** <Wild Card #N name إن استُخدِم>
**User-Visible:** yes / no
**Triggered Pivot Rule:** yes / no
**Originality Self-Score:** N/5
**Files touched:** <list ≤ 6>
**Verified at commit:** <sha>

---STATS---
total_pulses: <N>
unique_categories_used: <N>/9
avg_score: <X.X>
last_5_avg: <X.X>
pivot_triggers: <N>
forbidden_violations: <N>
creativity_health: <0-100>
```

**الـ STATS section يُحدَّث في مكانه** (استثناء واحد من القاعدة append-only، لكنه section محسوب آلياً وَيَبقى أحادي الموضع).

---

## ٦. الـ Originality Self-Score — مقياس صدق

| Score | المعنى |
|---|---|
| 1 | كليشيه مباشر — يُرفَض، لا يُحفَظ commit |
| 2 | متوقَّع لكن نظيف — مقبول لـ stages a/η (غير creative) |
| 3 | جيد — تعديل بسيط على pattern معروف |
| 4 | مميَّز — pattern غير شائع في AI output |
| 5 | استثنائي — لم يَرَه AI آخر (يُتحدَّى تلقائياً في stage التالي) |

**قواعد**:
- متوسط ≥ 3.4 over the project
- 5 stages متتالية avg ≤ 3 → **Creativity Crisis** يُعلَن
- ادِّعاء 5 يُتحدَّى ("ما الذي يَجعله 5؟" يُكتَب في commit)

---

## ٧. Creativity Health Score (للـ PROGRESS.json)

```
creativity_health = (avg_score × 20) + (unique_categories × 5) − (forbidden_violations × 25) − (cliché_warnings × 10)
Range: 0–100
Target: ≥ 78
Crisis: < 60 → halt session
```

يُحدَّث في كل stage داخل `tadaffuq_v5.creativity_health`.

---

## ٨. الميكانيكا — كيف يَستهلكها AUTO_PILOT

في كل stage γ/δ/ε/ζ/η:

```
1. tail -n 80 state/PULSE_LOG.md     (آخر 3 entries مع STATS)
2. اقرأ القائمة المُحرَّمة (§ 3)
3. plan: اختر فئة Pulse مختلفة عن آخر 2
4. plan: تحقَّق spec لا يَطلب EXEMPT_PATTERN
5. plan: لو 3rd-in-streak → Pivot + اختر Wild Card
6. execute: اكتب الكود مع Pulse مدمج
7. verify: اطبع Pulse بصيغة § 5 في commit
8. append: state/PULSE_LOG.md (entry جديد + STATS update)
```

---

## ٩. خلاصة

> «النَّهر يَعرف نَبَضاته. الواجهة العَظيمة تَعرف لحظاتها. تَدَفُّق ليس ضوضاء بصريَّة — هو نَبَضات محسوبة في صمت متَّصل.»

---

## ١٠. Template للـ PULSE_LOG.md (يُكتَب أوّلاً عند الإنشاء)

```markdown
# 🌊 PULSE LOG — TADAFFUQ v5
> Append-only ledger of every pulse shipped in pillars γ/δ/ε/ζ/η.
> **القاعدة:** never delete, never rewrite. STATS section هو الاستثناء الوحيد لتحديث.

---

<!-- entries will be appended below this line -->


---STATS---
total_pulses: 0
unique_categories_used: 0/9
avg_score: 0
last_5_avg: 0
pivot_triggers: 0
forbidden_violations: 0
creativity_health: 100
```

— نهاية Pulse Library —
