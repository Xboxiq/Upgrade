# ✦ ÊLAN — مذهب منصة Upgrade v4
> **«ثمانية عوالم تتنفس داخل واجهة واحدة. كل صفحة لها روحها، النظام يحفظ الترابط.»**
> الدستور الجذري — يستبدل DEVOTIO v3 بالكامل.

---

## ١. لماذا ÊLAN موجود (الانكسار قبل البناء)

DEVOTIO v3 (والـ Cathedral قبله) أنتجت واجهة جميلة لكنها **مكرَّرة**. كل منصة AI-generated في 2025 تتقاطع معها:
- linen-bone palette
- glassmorphism بطبقات
- lapis blue accent
- floating sidebar بـ pill icons

ÊLAN يعترف: ما يتفوّق على ذلك ليس "تحسين" — بل **هدم وبناء**.
هذا الإصدار **يحذف**:
- Mawj / Layl / Sahar (كانوا أيضاً نمطاً متوقَّعاً)
- linen-bone everywhere
- single-theme-fits-all

ويبني بدلاً منها **نظام ثمانية عوالم** + **Creativity Mandate** يفرض ابتكاراً جديداً في كل session.

---

## ٢. الأسس الجذرية (8 مبادئ، ليس 6)

### ١. **Eight Worlds, One Constitution** — ثمانية عوالم بدستور واحد
كل صفحة (أو زوج صفحات) لها **عالمها** البصري الخاص: لوحة ألوان مختلفة، voice خط مختلف، إيقاع حركة مختلف، إلهام تاريخي مختلف. **النظام** يحفظ الترابط عبر tokens موحَّدة (4pt scale, ease tokens, focus discipline)، **العوالم** تحفظ الإثارة.

### ٢. **Arabic Calligraphy as Architecture** — الخط العربي كمعمار
لا الخط العربي زخرفة على layout لاتيني. هو يحدد bones الواجهة:
- الـ baseline grid مأخوذ من ارتفاع نَسخ
- الـ vertical rhythm من طول الكشيدة
- الـ corner radius من حركة قَلَم النَّسخ
- الفواصل الأفقية من حركة "لا" المتشابكة

### ٣. **Brutalist Honesty** — صدق بنّاء
- الزجاج زجاج (backdrop-filter حقيقي، ليس متدرج كاذب)
- المعدن معدن (specular highlight + grain)
- الورق ورق (SVG noise filter)
- **الكود يقول الحقيقة**: لا inline `style=` تخفي tokens، لا `!important` يخفي cascade مكسور

### ٤. **Chromatic Sovereignty** — لكل عالم لون يحكم
لكل عالم من الثمانية: **anchor + ember + focus** فقط (ثلاثة ألوان). لا rainbow. لا 14 accent. لكن العوالم الثمانية معاً = ١٢ لون مميز عبر المنصة، يخلق غنىً بصرياً بدون فوضى.

### ٥. **Mobile-Sovereign** — التلفون ليس استثناء
الـ tokens تُكتب أولاً للـ 360px. Container queries قبل media queries. كل CTA حساس في النصف السفلي (one-thumb zone). bottom-nav floating. Haptics فعلية.

### ٦. **Truth Over Claims** — صدق قبل ادعاء
- كل phase يبدأ بـ `🔍 FORENSIC` (grep حقيقي)
- ينتهي بـ `📜 TRUTH LEDGER` (verified key=value)
- ممنوع رقم في PR description بدون verify
- `state/TRUTH_LEDGER.md` append-only، شفاف للأبد

### ٧. **Creativity Mandate** — كل session يلد ابتكاراً ✨ (قلب ÊLAN الجديد)
كل session يُنتج **Beacon إبداعي** على الأقل: عنصر بصري/تفاعلي/حركي **يستحيل** أن AI آخر سبقه إليه. تُسجَّل كل beacon في `state/CREATIVITY_LOG.md`. قبل بدء أي stage، يقرأ AI آخر 3 beacons ويلتزم **بعدم تكرار نمط منها**.

التفاصيل في `CREATIVITY_DOCTRINE.md`.

### ٨. **Forbidden Patterns** — قائمة المحظور (محرَّكات ضد التقليد)
قائمة بالأنماط الـ AI الكليشيه ممنوعة قطعياً (إلا لو تم subvert صراحة):
- glassmorphism panel ثاني
- linen-bone palette ثاني
- floating sidebar بـ pill icons
- generic gradient mesh
- card بـ shadow ناعم + 12px radius (الافتراضي الـ AI)
- pulsing dot loading spinner
- animated counter من 0 (clichéd)
- bento grid مجرّد مستطيلات
- Apple/Stripe/Linear/Vercel surface clone

القائمة الكاملة في `CREATIVITY_DOCTRINE.md` § Forbidden Library.

---

## ٣. خريطة العوالم الثمانية (Eight Worlds)

كل عالم له:
- **اسم** (عربي + ترجمة)
- **إلهام تاريخي** (مرجع ثقافي/معماري)
- **لوحة 3 ألوان** (anchor + ember + focus)
- **voice signature** (خط أساس + accent)
- **motion fingerprint** (توقيع حركي)
- **صفحة(صفحات) المنصة** المسندة

| # | العالم | الإلهام | الصفحات |
|---|---|---|---|
| 1 | **حِبر** (Hibr) — Ink | Iraqi calligraphy + Najaf manuscripts | dashboard, myprogress |
| 2 | **نار** (Naar) — Fire | Iraqi industrial Brutalism (Chadirji) | lab, programming |
| 3 | **ندى** (Nada) — Dew | Yemeni mihrab + dawn light | psych, eq |
| 4 | **حَديد** (Hadeed) — Iron | Modernist Lebanese cinema posters | negotiation, fieldsales |
| 5 | **ذَهَب** (Dhahab) — Gold | Persian miniature + Mughal accounting books | accounting |
| 6 | **تَيار** (Tayyar) — Current | Synthwave + Memphis Group postmodern | social, callcenter |
| 7 | **وَرشة** (Warsha) — Workshop | Souk repair stalls + raw industrial | phonerepair, customercare |
| 8 | **صَالون** (Saloon) — Salon | Mid-century Beirut salons + wood + brass | hrmastery |

**التفاصيل اللونية + الـ tokens** في `WORLDS_ATLAS.md`.

---

## ٤. الأعمدة الست (Pillars) — الترتيب التنفيذي

```
α FOUNDATION        (3 stages) — الأساس البنيوي
   ↓
β TYPE SOUL         (3 stages) — الخطوط الجديدة + voice casting
   ↓
γ EIGHT WORLDS      (9 stages) — استبدال palette واحد بـ 8 عوالم
   ↓
δ KINETIC SHELL     (6 stages) — chrome + motion + mobile (متوازي مع γ)
   ↓
ε CONTENT REVIVAL   (12 stages) — كل عالم يأخذ محتواه
   ↓
ζ QUALITY GATE      (5 stages) — verify + lighthouse + pwa
```

المجموع: **38 stage**، **6 PRs**.

---

## ٥. الأصول المُقدَّسة (Sacred Assets — لا تُلمَس)

| الأصل | الموقع | السبب |
|---|---|---|
| الأرشيف الأصلي | `archive/arabic-training-platform-v12-original.html` | تاريخ يُحفظ |
| 14 Upg.* APIs | `window.Upg.*` | backward-compat |
| 16 page sections | `<section class="page" id="page-*">` | لا حذف |
| `state/PROGRESS.json` | جذر | ذاكرة النظام |
| `prompts/v1, v2, v3` | كاملة | تاريخ القرار |
| `state/CREATIVITY_LOG.md` | جذر | append-only ذاكرة الإبداع |
| `state/TRUTH_LEDGER.md` | جذر | append-only ذاكرة الحقائق |

---

## ٦. لتفعيل الجلسة

ألصق فقط: `prompts/v4/AUTO_PILOT_v4.md`
الـ AUTO_PILOT يقرأ:
- هذا الملف (المذهب)
- `CREATIVITY_DOCTRINE.md`
- `WORLDS_ATLAS.md`
- `state/PROGRESS.json`
- آخر 3 entries من `state/CREATIVITY_LOG.md`

ولا يقرأ أي شيء آخر تلقائياً. **هذا قرار مدروس** لتوفير context للإبداع، ليس للقراءة.

---

## ٧. تذكير أخير

ÊLAN ليس "redesign". هو **اعتراف بكثرة الأنماط المكرَّرة** و**تعهُّد بإنتاج ما لم يُرَ من قبل**.
الواجهة القديمة تُدفَن. ثمانية عوالم تتنفس بدلاً منها.

— نهاية المذهب —
