# 🎯 Iconography Doctrine — مذهب الأيقونات في ÊLAN v4
> **«لا emoji. لا SVG هاوٍ. لا Toy Lines. الأيقونات صناعة احترافية أو لا تُستخدَم.»**
> يُقرأ من AUTO_PILOT في كل session. يُلزِم كل stage باختيار من المكتبات المعتمدة فقط.

---

## ١. الفرضية الأساسية

الفرق البصري الأكبر بين منصة احترافية و منصة AI-generated عادي ليس الألوان ولا الخطوط — هو **الأيقونات**. AI الافتراضي يفعل واحداً من ثلاثة أخطاء قاتلة:

1. **Emoji as icon** (☎ ✓ بـ keyboard) — كسلٌ بصري لا يُغتفَر
2. **Toy SVG inline** — أيقونات يرسمها بنفسه، خطوط متذبذبة، أحجام غير متناسقة
3. **Mixed icon families** — Material في زر، FontAwesome في آخر، Heroicons في ثالث = chaos

ÊLAN يُحرِّم الثلاثة. الأيقونات في v4 تأتي من **مكتبتين فقط محلياً مُحمَّلتين** + قواعد صارمة لاستخدامها.

---

## ٢. الـ Stack المعتمد (final, locked)

### ٢.أ. مكتبتان أساسيتان (محمَّلتان محلياً، MIT)

| المكتبة | الدور | الترخيص | المصدر | الحجم |
|---|---|---|---|---|
| **Phosphor Icons** | Primary — UI + content | MIT | github.com/phosphor-icons/core | ~28KB sprite |
| **Lucide Icons** | Secondary — chrome + nav | ISC | github.com/lucide-icons/lucide | ~22KB sprite |

**لماذا هاتان فقط؟**
- Phosphor: 6 أوزان (thin → fill)، خطوط محسوبة، لا تَحَيُّز لاتيني
- Lucide: feather-fork modern، 1.75px stroke، ينسجم مع chrome
- معاً يَكفيان كل أحوال المنصة. **ممنوع** إضافة مكتبة ثالثة بدون تصريح.

### ٢.ب. ثلاث طبقات استخدام

```
Phosphor — content & per-world (lab tools, accounting symbols, learning)
Lucide   — chrome (sidebar, topbar, bottom-nav, cmdk results)
Custom   — per-world ornamental SVG patterns (background ONLY, NEVER as icon)
```

### ٢.ج. الأشكال المرسومة (Illustrations)

ممنوع: **unDraw** (نمط معروف cliché، يُستخدم في 60% من landing pages الـ AI).

المسموح:
| المصدر | الترخيص | متى يُستخدَم |
|---|---|---|
| **Open Peeps** | CC0 | empty states بشخصيات هادئة |
| **Iconoir Illustrations** | MIT | empty + onboarding |
| **Pixel True** | CC0 | spot illustrations |
| **Custom AI-generated SVG** | محلية | فقط لـ ornamental world patterns |

### ٢.د. الأنماط الزخرفية (background-only patterns)

| المصدر | الترخيص | متى |
|---|---|---|
| **Hero Patterns** | CC0 | subtle textures (≤ 5% opacity) |
| **Custom Wild-Card** | محلية | per-world signature patterns |

---

## ٣. الأيقونات المُحرَّمة (Forbidden Icons Library)

### ٣.أ. ممنوع كأيقونات (في زر، nav، label):
1. ❌ **أي emoji نصي** — حتى لو "جميل لمستخدم arabic"
2. ❌ **Toy SVG inline** — `<svg viewBox="0 0 24 24"><path d="M5 5l..."/></svg>` يدوي ارتجالي
3. ❌ **FontAwesome** — مَلَّ شعبية، نمط 2010
4. ❌ **Material Icons (filled)** — هوية Google واضحة، تُكسِر هوية ÊLAN العربية
5. ❌ **Bootstrap Icons** — ضعيفة الـ stroke، غير حادة
6. ❌ **خلط مكتبتين** في نفس الـ chrome (Lucide في sidebar + Phosphor في topbar)
7. ❌ **emoji modifiers** كـ tooltip أو decoration
8. ❌ **icons تحت 14px** أو **فوق 48px** (خارج النطاق المُعتمَد)
9. ❌ **icons بـ stroke غير-uniform** (1px في جانب، 2px في آخر)
10. ❌ **decorative icons** بدون `aria-hidden="true"` أو role

### ٣.ب. ممنوع كـ illustrations:
11. ❌ **unDraw** بأي حال (cliché)
12. ❌ **Storyset** بشخصيات tech-bro الأخضر-البنفسجي
13. ❌ **Material 3D blobs** الـ Google
14. ❌ **isometric tech illustrations** بـ purple-orange-pink

### ٣.ج. ممنوع كـ patterns:
15. ❌ **mesh gradient** (`radial-gradient` بدون قصد geometric)
16. ❌ **noise texture** بـ opacity > 8% (يُتعب العين)
17. ❌ **dot grids generic** (cliché Notion-style)

---

## ٤. القواعد الصارمة للاستخدام

### ٤.أ. حجم وقياس
```css
:root {
  --icon-xs: 14px;
  --icon-sm: 16px;
  --icon-md: 20px;
  --icon-lg: 24px;
  --icon-xl: 32px;
  --icon-2xl: 48px;
}
```
**أي icon خارج هذا السلم = forbidden.**

### ٤.ب. وزن الـ stroke
- **Lucide**: 1.75px stroke uniform
- **Phosphor**: regular default، fill للحالة الفعّالة، duotone ممنوع في chrome
- **حظر**: stroke-width: 2px+ في icon < 24px

### ٤.ج. اللون
- icons في chrome → `currentColor` فقط
- icons تتلوّن → tokens فقط (`var(--ember)`, `var(--focus)`)
- **ممنوع**: `fill="#xxxxxx"` hardcoded في markup

### ٤.د. الأرشيف الدلالي (Semantic Map)
كل icon له معنى ثابت. لا يُستخدَم نفس icon لمعنيين، ولا يُستخدَم icon آخر لمعنى محجوز:

| المعنى | Lucide ID | Phosphor (alt) |
|---|---|---|
| إنجاز/نجاح | `i-check-circle-2` | `p-check-circle` |
| خطأ | `i-x` | — |
| تنبيه | `i-triangle-alert` | `p-warning` |
| بحث | `i-search` | `p-magnifying-glass` |
| توسيع لأسفل | `i-chevron-down` | — |
| إغلاق | `i-x` | — |
| إعدادات | `i-settings` | `p-gear-six` |
| ملف | `i-file` | — |
| مستخدم | `i-user` | `p-user-circle` |
| تقدُّم | `i-trending-up` | `p-arrow-fat-up` |
| دماغ/تفكير | — | `p-brain` |
| قلب/عاطفة | — | `p-heart-straight` |
| نار/حماس | — | `p-flame` |
| شرارة | — | `p-lightning` |
| مفك/ورشة | — | `p-wrench` |
| ميزان/توازن | — | `p-scales` |
| كأس/إنجاز | — | `p-trophy` |

(القائمة الكاملة في `α4_ICON_FOUNDATION.md`)

### ٤.هـ. Accessibility
```html
<!-- decorative -->
<svg class="i i-md" aria-hidden="true"><use href="#i-check"/></svg>

<!-- meaningful, no text label -->
<button aria-label="إغلاق">
  <svg class="i i-md" aria-hidden="true"><use href="#i-x"/></svg>
</button>

<!-- with text label -->
<button>
  <svg class="i i-sm" aria-hidden="true"><use href="#i-check"/></svg>
  <span>أنجز</span>
</button>
```

---

## ٥. الـ Sprite System (الأداء أولاً)

### ٥.أ. لماذا sprite، ليس inline ولا فردي
- **Inline SVG**: يُكرَّر في كل مكان → bytes ضائعة + لا cache
- **Single-file imports**: 100 طلب HTTP لـ 100 icon
- **Sprite SVG واحد** (≤ 30KB) محمَّل مرة واحدة، cache forever

### ٥.ب. توليد الـ sprite
```bash
bash scripts/elan-icons.sh
# يُنتِج:
# platform/assets/icons/lucide-sprite.svg
# platform/assets/icons/phosphor-sprite.svg
# platform/assets/icons/MANIFEST.json
```

### ٥.ج. الاستخدام في HTML
```html
<svg class="i i-md" aria-hidden="true">
  <use href="/platform/assets/icons/lucide-sprite.svg#i-check"/>
</svg>
```

### ٥.د. JS helper — `Upg.icons.icon(name, opts)`
يُنشأ في α4. يَستهلك semantic map، يُرجِع SVGElement جاهز.

---

## ٦. القاعدة الذهبية للـ AUTO_PILOT

في كل stage، قبل كتابة أي markup يحتوي icon:

```
1. ابحث في Semantic Map (§٤.د) — هل المعنى مُحدَّد؟
   نعم → استخدم الـ ID المحجوز
   لا → اختر من Phosphor (default) أو Lucide (chrome) — وحَدِّث الـ map

2. هل أنا أكتب <svg viewBox="..." path...> يدوياً؟
   نعم → 🛑 STOP. هذا Toy SVG. استخدم sprite ID فقط.

3. هل يوجد emoji في markup؟
   نعم → 🛑 STOP. حتى ☎ في button text ممنوع.

4. هل الحجم خارج السلم (--icon-xs..2xl)؟
   نعم → 🛑 STOP. اختر حجماً قياسياً.

5. هل اللون hardcoded؟
   نعم → 🛑 STOP. استخدم currentColor أو token.
```

---

## ٧. الإلهام الزخرفي (Per-world Custom Patterns)

كل عالم من الثمانية يحصل على **نمط زخرفي واحد** (background SVG، opacity ≤ 8%):

| العالم | النمط | الإلهام |
|---|---|---|
| حِبر | Najaf manuscript margin glyphs | hand-drawn flourishes |
| نار | concrete waffle slab grid | Brutalist Iraqi |
| ندى | Yemeni mihrab hexagonal | geometric prayer-niche |
| حَديد | Beirut cinema diagonal beams | film noir |
| ذَهَب | Persian arabesque corner | Mughal manuscripts |
| تَيار | retrowave horizon grid | synthwave cityscape |
| وَرشة | engineering blueprint dotted | technical drawing |
| صَالون | walnut woodgrain etching | wood texture |

كل واحد يُكتَب كـ inline SVG في `worlds/_<name>.css` بـ `background-image: url("data:image/svg+xml;...")`. الحجم ≤ 1.2KB. **ليس icon — هو texture مساند.**

---

## ٨. مصادر التحميل (offline-ready)

| المصدر | URL |
|---|---|
| Lucide release | github.com/lucide-icons/lucide/releases |
| Phosphor release | github.com/phosphor-icons/core/archive |
| Open Peeps | openpeeps.com (CC0) |
| Iconoir | iconoir.com (MIT) |
| Pixel True | pixeltrue.com (CC0) |
| Hero Patterns | heropatterns.com (CC0) |

السكربت الكامل في `α4_ICON_FOUNDATION.md`.

---

## ٩. المقياس النهائي (Iconography Health)

```
icon_health = base 100
  - 25 لكل emoji في markup
  - 15 لكل inline <svg> ليس <use href>
  - 10 لكل size خارج السلم
  - 8 لكل hardcoded color
  - 5 لكل خلط مكتبتين في نفس الـ chrome
  - 3 لكل semantic violation
```
**Target: ≥ 92** عند PR Pillar.

---

## ١٠. خلاصة فلسفية

> «الأيقونة جزء من الكلمة. لو الكلمة عربية مكتوبة بخط عربي محترف، فالأيقونة بجانبها يجب أن تكون رسماً محسوباً، ليست رمزاً عشوائياً من keyboard إيموجي ولا shape رسمها AI متعجِّل.»

— نهاية Iconography Doctrine —
