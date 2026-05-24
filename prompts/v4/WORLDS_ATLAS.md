# 🗺 Worlds Atlas — أطلس العوالم الثمانية
> ثمانية عوالم بلوحات وأصوات وحركات مختلفة. النظام موحَّد، الروح متعدِّدة.
> هذا الملف هو المرجع اللوني والصوتي. تستهلكه stages في Pillar γ.

---

## كيف تُقرَأ العوالم

كل عالم له:
- **Anchor** (3 درجات surface) — الخلفية
- **Ink** (3 درجات text) — النص
- **Ember** — لون عاطفي للـ CTA الحاسم
- **Focus** — لون active state (ring + outline)
- **Voice Pair** — خط أساس + خط accent
- **Motion Fingerprint** — توقيع حركي (ease + duration ratio)
- **Inspiration Anchor** — مرجع تاريخي/ثقافي
- **Pages** — الصفحات المسندة

كل عالم يَستخدم **default motion easings** من tokens (`--ease-elan`)، لكن يضيف modifier خاص (e.g. `--ease-naar` ينحني أحدّ).

---

## 🌑 العالم 1 — حِبر (Hibr) — Ink

**الإلهام:** المخطوطات النَّجَفية + خط النَّسخ العراقي + ورق Tahbeer
**المزاج:** هدوء عميق، تأمل، انضباط معرفي
**الصفحات:** dashboard, myprogress

```css
[data-world="hibr"] {
  --anchor-bg: hsl(36 18% 92%);          /* ورق التَّحبير */
  --anchor-1:  hsl(36 14% 88%);
  --anchor-2:  hsl(36 12% 82%);
  --anchor-3:  hsl(36 14% 76%);

  --ink:        hsl(225 35% 8%);          /* مداد طبيعي */
  --ink-muted:  hsl(225 22% 28%);
  --ink-faint:  hsl(225 14% 50%);

  --ember:      hsl(0 65% 32%);            /* أحمر شنقريا */
  --focus:      hsl(45 80% 35%);           /* ذهب مخطوط */

  --voice-display: "Boutros Modern Kufi", serif;
  --voice-body:    "Markazi Text", serif;
  --voice-accent:  "Amiri Quran Colored", serif;

  --ease-hibr:     cubic-bezier(0.5, 0, 0.5, 1);  /* قَلَم النَّسخ */
  --duration-hibr: 320ms;
}
```

**Beacon Identity:** كل CTA إنجاز يُكتَب بحبر يجف تدريجياً (gradient mask من شفاف → حِبر، 0.4s).

---

## 🔥 العالم 2 — نار (Naar) — Fire

**الإلهام:** Brutalism العراقي الحديث (Chadirji, Makiya) + ورش الحدادة + Khourshi metalwork
**المزاج:** انتباه عالٍ، dare، اشتعال معرفي
**الصفحات:** lab, programming

```css
[data-world="naar"] {
  --anchor-bg: hsl(15 8% 6%);              /* فحم */
  --anchor-1:  hsl(15 8% 9%);
  --anchor-2:  hsl(15 10% 13%);
  --anchor-3:  hsl(15 12% 18%);

  --ink:        hsl(40 18% 96%);            /* رماد ساخن */
  --ink-muted:  hsl(40 12% 78%);
  --ink-faint:  hsl(40 8% 56%);

  --ember:      hsl(18 95% 56%);            /* نار حدادة */
  --focus:      hsl(48 100% 60%);           /* شرارة */

  --voice-display: "29LT Bukra", sans-serif;
  --voice-body:    "Vazirmatn", sans-serif;
  --voice-accent:  "JetBrains Mono", monospace;

  --ease-naar:     cubic-bezier(0.7, 0, 0.2, 1.2); /* اشتعال حاد */
  --duration-naar: 180ms;
}
```

**Beacon Identity:** الأحرف العنوان تتوهج عند الـ hover بـ box-shadow `0 0 30px var(--ember)` لمدة 60ms ثم تطفأ — كأن شرارة لمست المعدن.

---

## 💧 العالم 3 — ندى (Nada) — Dew

**الإلهام:** المحراب اليمني + ضوء الفجر على الحجر + الشِفّ الزجاجي
**المزاج:** سكون، تأمل نفسي، اتزان عاطفي
**الصفحات:** psych, eq

```css
[data-world="nada"] {
  --anchor-bg: hsl(195 28% 96%);            /* ضباب فجر */
  --anchor-1:  hsl(195 24% 93%);
  --anchor-2:  hsl(195 20% 88%);
  --anchor-3:  hsl(195 18% 82%);

  --ink:        hsl(220 32% 14%);            /* حجر مظلَّل */
  --ink-muted:  hsl(220 16% 38%);
  --ink-faint:  hsl(220 12% 56%);

  --ember:      hsl(165 55% 32%);             /* زيتوني عميق */
  --focus:      hsl(280 50% 52%);             /* بنفسج صباحي */

  --voice-display: "Lateef", serif;
  --voice-body:    "Markazi Text", serif;
  --voice-accent:  "Amiri Quran Colored", serif;

  --ease-nada:     cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* انسياب ندى */
  --duration-nada: 480ms;
}
```

**Beacon Identity:** عند فتح الصفحة، تظهر الـ cards كقطرات ندى تتشكَّل (radial gradient يبدأ من نقطة → ينتشر).

---

## ⚙️ العالم 4 — حَديد (Hadeed) — Iron

**الإلهام:** أفيشات سينما بيروت 1950-70 + الـ Lebanese modernism + Khoury studio
**المزاج:** صرامة، حسم، قوة احترافية
**الصفحات:** negotiation, fieldsales

```css
[data-world="hadeed"] {
  --anchor-bg: hsl(220 6% 14%);              /* حديد ممسوح */
  --anchor-1:  hsl(220 8% 18%);
  --anchor-2:  hsl(220 8% 22%);
  --anchor-3:  hsl(220 10% 28%);

  --ink:        hsl(35 22% 92%);              /* نحاس فاتح */
  --ink-muted:  hsl(35 14% 68%);
  --ink-faint:  hsl(35 10% 48%);

  --ember:      hsl(355 75% 52%);              /* قاني سينما */
  --focus:      hsl(195 90% 55%);              /* أزرق نيون رخامي */

  --voice-display: "29LT Bukra", sans-serif;
  --voice-body:    "Vazirmatn", sans-serif;
  --voice-accent:  "Almarai", sans-serif;

  --ease-hadeed:     cubic-bezier(0.85, 0, 0.15, 1);  /* صفق معدني */
  --duration-hadeed: 220ms;
}
```

**Beacon Identity:** الـ tabs تتبدَّل بحركة "snap" عمودية + خط أحمر يَمسح من اليمين لليسار في 80ms (مرجع: split-flap signage).

---

## 🟡 العالم 5 — ذَهَب (Dhahab) — Gold

**الإلهام:** المنمنمات الفارسية + كتب المحاسبة المغولية + Mercator atlases
**المزاج:** ثروة، دقة، حساب
**الصفحات:** accounting

```css
[data-world="dhahab"] {
  --anchor-bg: hsl(40 35% 94%);               /* رق رخصي */
  --anchor-1:  hsl(40 30% 90%);
  --anchor-2:  hsl(40 26% 85%);
  --anchor-3:  hsl(40 22% 78%);

  --ink:        hsl(28 60% 14%);               /* بُن غامق */
  --ink-muted:  hsl(28 30% 32%);
  --ink-faint:  hsl(28 18% 52%);

  --ember:      hsl(42 95% 45%);                /* ذهب ثقيل */
  --focus:      hsl(218 75% 35%);               /* أزرق فلكي */

  --voice-display: "Boutros Modern Kufi", serif;
  --voice-body:    "Markazi Text", serif;
  --voice-accent:  "Almarai", sans-serif;     /* للأرقام */

  --ease-dhahab:     cubic-bezier(0.32, 0.72, 0.28, 1);  /* ميزان */
  --duration-dhahab: 360ms;
}
```

**Beacon Identity:** كل رقم مالي يُعرَض داخل إطار ذهبي رفيع (1px) + الـ digits يستخدم Almarai variable (wght 600) + tabular-nums + kashida خفيفة بين الفئات.

---

## 🌊 العالم 6 — تَيار (Tayyar) — Current

**الإلهام:** Synthwave + Memphis Group + Iraqi 1980s graphic design + Cairo Jazz cover art
**المزاج:** نبض، تيار اجتماعي، طاقة معاصرة
**الصفحات:** social, callcenter

```css
[data-world="tayyar"] {
  --anchor-bg: hsl(285 25% 8%);                /* بنفسج ليلي */
  --anchor-1:  hsl(285 22% 12%);
  --anchor-2:  hsl(285 20% 18%);
  --anchor-3:  hsl(285 18% 24%);

  --ink:        hsl(180 25% 95%);               /* فيروز فاتح */
  --ink-muted:  hsl(180 18% 72%);
  --ink-faint:  hsl(180 12% 50%);

  --ember:      hsl(335 90% 60%);                /* magenta */
  --focus:      hsl(180 85% 55%);                /* cyan */

  --voice-display: "29LT Bukra", sans-serif;
  --voice-body:    "Vazirmatn", sans-serif;
  --voice-accent:  "Geist", sans-serif;

  --ease-tayyar:     cubic-bezier(0.45, -0.4, 0.55, 1.4);  /* موجة elastic */
  --duration-tayyar: 520ms;
}
```

**Beacon Identity:** الـ background يحتوي scan-lines رفيعة (1px every 3px) متحركة عمودياً ببطء (8s loop) + موجة فيروزية تَعبر الشاشة عند تغيير الصفحة.

---

## 🛠 العالم 7 — وَرشة (Warsha) — Workshop

**الإلهام:** سوق البتاوين بغداد + ورش العتيقة + raw industrial signage
**المزاج:** صدق صنعة، fix-it mentality، عملي حسي
**الصفحات:** phonerepair, customercare

```css
[data-world="warsha"] {
  --anchor-bg: hsl(28 12% 18%);                 /* أسود مطفي */
  --anchor-1:  hsl(28 14% 22%);
  --anchor-2:  hsl(28 16% 27%);
  --anchor-3:  hsl(28 18% 33%);

  --ink:        hsl(45 30% 92%);                 /* أصفر شمع */
  --ink-muted:  hsl(45 18% 70%);
  --ink-faint:  hsl(45 12% 50%);

  --ember:      hsl(25 85% 52%);                  /* برتقالي طوب */
  --focus:      hsl(48 95% 55%);                  /* أصفر علامة */

  --voice-display: "Boutros Modern Kufi", serif;
  --voice-body:    "Vazirmatn", sans-serif;
  --voice-accent:  "JetBrains Mono", monospace;

  --ease-warsha:     cubic-bezier(0.55, 0.1, 0.25, 1);  /* مفك يلتف */
  --duration-warsha: 280ms;
}
```

**Beacon Identity:** الـ cards لها حواف "تيب لاصق" بصرية (texture overlay عند الزوايا) + الـ icons داخل دوائر صفراء كأنها لافتات ورشة.

---

## 🍷 العالم 8 — صَالون (Saloon) — Salon

**الإلهام:** صالونات بيروت 1960 + الخشب الجوزي + النحاس الباهت + الجلد القديم
**المزاج:** احتراف هادئ، حوار راشد، خبرة
**الصفحات:** hrmastery

```css
[data-world="saloon"] {
  --anchor-bg: hsl(8 28% 14%);                  /* burgundy عميق */
  --anchor-1:  hsl(8 26% 18%);
  --anchor-2:  hsl(8 24% 23%);
  --anchor-3:  hsl(8 22% 28%);

  --ink:        hsl(38 28% 94%);                 /* عاج صالون */
  --ink-muted:  hsl(38 18% 72%);
  --ink-faint:  hsl(38 12% 50%);

  --ember:      hsl(35 75% 58%);                  /* نحاس مصقول */
  --focus:      hsl(150 35% 50%);                 /* أخضر رخامي */

  --voice-display: "Boutros Modern Kufi", serif;
  --voice-body:    "Markazi Text", serif;
  --voice-accent:  "Lateef", serif;

  --ease-saloon:     cubic-bezier(0.4, 0.05, 0.2, 0.95);  /* خشب وجوز */
  --duration-saloon: 380ms;
}
```

**Beacon Identity:** dividers بين secciones هي خطوط نحاسية (gradient horizontal من فاتح → غامق → فاتح) + corners بـ chamfer 4px (ليس radius — قطع) كأنها أُطر صور قديمة.

---

## النظام الموحَّد عبر العوالم

رغم اختلاف العوالم الثمانية، **هذه الـ tokens موحَّدة عبر المنصة كلها** (لا تتغير بين عوالم):

```css
:root {
  /* spacing scale — موحَّد */
  --s-1, --s-2, --s-3, --s-4, --s-5, --s-6, --s-8, --s-10, --s-12, --s-16, --s-24

  /* radius scale — موحَّد */
  --r-1: 4px, --r-2: 8px, --r-3: 12px, --r-4: 16px, --r-pill: 999px

  /* base motion — موحَّد */
  --ease-elan: cubic-bezier(0.16, 1, 0.3, 1)
  --t-1...t-5

  /* container query thresholds — موحَّد */
  --bp-xs, --bp-sm, --bp-md, --bp-lg, --bp-xl
}
```

العوالم تتغير في **الألوان + الخطوط + الـ ease modifier فقط**. الـ scale والإيقاع موحَّد = الترابط محفوظ.

---

## كيف تُفعَّل العوالم

في `index.html`:
```html
<section class="page" id="page-dashboard" data-world="hibr"> ... </section>
<section class="page" id="page-lab"       data-world="naar"> ... </section>
<section class="page" id="page-psych"     data-world="nada"> ... </section>
... etc
```

عند `Upg.nav.to('lab')`، الـ JS يضيف `data-world="naar"` على body، وكل tokens تتحدّث تلقائياً عبر CSS selector `body[data-world="naar"]`.

---

## Acceptance لـ Pillar γ كاملاً

- 8 عوالم مُعرَّفة في 8 ملفات: `platform/assets/css/worlds/_<world>.css`
- كل عالم له Beacon موثَّق في `state/CREATIVITY_LOG.md`
- transition بين العوالم سلسة (View Transitions API — δ5)
- لا تكسير لـ accessibility: contrast ratio ≥ 4.5 لكل عالم على anchor-bg

— نهاية أطلس العوالم —
