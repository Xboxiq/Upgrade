# 🎯 Iconography Doctrine — مذهب الأيقونات في TADAFFUQ v5
> **«صفر emoji. Lucide + Phosphor. sprite + helper. سُلَّم 6 أحجام.»**
> يَخلف `prompts/v4/ICONOGRAPHY_DOCTRINE.md` ويَسدّ ثغراتها.

---

## ١. الواقع المُؤلِم (baseline)

```bash
grep -oP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' platform/index.html | wc -l
# → 1111 emoji في markup الفعلي
```

v4 ICONOGRAPHY حظَّرت emoji نظرياً لكن لم تُطَبَّق على الـ legacy. v5 يُطَبِّق صراحة:
- α4 يَبني الـ sprite الكامل
- η1 (Inline Purge) يَستبدل كل emoji بـ sprite icon
- θ2 (Final PR) يَتحقَّق emoji=0

---

## ٢. الـ Stack المُعتمَد (locked)

### مكتبتان فقط — لا ثالثة

| المكتبة | الدور | License | Stroke |
|---|---|---|---|
| **Lucide** | chrome (topbar, dock, cmdk, breadcrumb) | ISC | 1.75px uniform |
| **Phosphor** | content (inline في prose, lab tools, page-h eyebrows) | MIT | regular default |

### chrome region لها مكتبة واحدة فقط
- topbar كل أيقوناته **Lucide** — بدون استثناء
- dock كل أيقوناته **Lucide**
- cmdk results **Lucide**
- prose content **Phosphor**
- page-h eyebrow **Phosphor**

**خلط داخل region واحد → forbidden.**

---

## ٣. الـ Sprite System

### بنية الملفات:
```
platform/assets/svg/
├── lucide-sprite.svg       (chrome icons, ≤ 30 KB)
├── phosphor-sprite.svg     (content icons, ≤ 32 KB)
├── SEMANTIC_MAP.json       (اسم دلالي → sprite ID)
└── README.md               (procurement notes)
```

### `<symbol>` بنية:
```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="i-home" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12L12 3l9 9..."/>
  </symbol>
  <!-- المزيد -->
</svg>
```

### الاستخدام في markup:
```html
<svg class="icon icon-md" aria-hidden="true">
  <use href="/platform/assets/svg/lucide-sprite.svg#i-home"></use>
</svg>
```

### الاستخدام عبر JS helper (يُنشأ في α4):
```js
Upg.icons.use('navigation.home', { size: 'md' });
// → returns SVGElement مع sprite ref
```

---

## ٤. الـ Semantic Map

```json
{
  "navigation.home":      { "library": "lucide", "id": "i-home" },
  "navigation.back":      { "library": "lucide", "id": "i-arrow-left" },
  "navigation.search":    { "library": "lucide", "id": "i-search" },
  "navigation.menu":      { "library": "lucide", "id": "i-menu" },
  "navigation.close":     { "library": "lucide", "id": "i-x" },
  "action.confirm":       { "library": "lucide", "id": "i-check-circle-2" },
  "action.cancel":        { "library": "lucide", "id": "i-x" },
  "action.add":           { "library": "lucide", "id": "i-plus" },
  "action.edit":          { "library": "lucide", "id": "i-pencil" },
  "action.delete":        { "library": "lucide", "id": "i-trash-2" },
  "state.loading":        { "library": "lucide", "id": "i-loader" },
  "state.success":        { "library": "lucide", "id": "i-check-circle-2" },
  "state.error":          { "library": "lucide", "id": "i-alert-octagon" },
  "state.warning":        { "library": "lucide", "id": "i-triangle-alert" },
  "state.info":           { "library": "lucide", "id": "i-info" },
  "state.locked":         { "library": "lucide", "id": "i-lock" },
  "domain.brain":         { "library": "phosphor", "id": "p-brain" },
  "domain.heart":         { "library": "phosphor", "id": "p-heart-straight" },
  "domain.flame":         { "library": "phosphor", "id": "p-flame" },
  "domain.lightning":     { "library": "phosphor", "id": "p-lightning" },
  "domain.scales":        { "library": "phosphor", "id": "p-scales" },
  "domain.trophy":        { "library": "phosphor", "id": "p-trophy" },
  "domain.wrench":        { "library": "phosphor", "id": "p-wrench" },
  "domain.gear":          { "library": "phosphor", "id": "p-gear-six" },
  "domain.lab":           { "library": "phosphor", "id": "p-flask" },
  "domain.code":          { "library": "phosphor", "id": "p-code" },
  "domain.book":          { "library": "phosphor", "id": "p-book-open" },
  "domain.chart":         { "library": "phosphor", "id": "p-chart-line" },
  "domain.calculator":    { "library": "phosphor", "id": "p-calculator" },
  "domain.phone":         { "library": "phosphor", "id": "p-phone" },
  "domain.users":         { "library": "phosphor", "id": "p-users-three" }
}
```

**31 keys في α4 baseline.** كل stage يحتاج icon جديد → يُضاف هنا أولاً، ثم يُستخدَم.

---

## ٥. سُلَّم الأحجام (6 خطوات locked)

```css
:root {
  --icon-xs: 14px;   /* inline في text صغير، meta */
  --icon-sm: 16px;   /* inline في body text */
  --icon-md: 20px;   /* default — buttons, dock */
  --icon-lg: 24px;   /* topbar, page-h eyebrow */
  --icon-xl: 32px;   /* feature card heading */
  --icon-2xl: 48px;  /* hero / empty state */
}

.icon { width: var(--icon-md); height: var(--icon-md); }
.icon-xs { width: var(--icon-xs); height: var(--icon-xs); }
.icon-sm { width: var(--icon-sm); height: var(--icon-sm); }
.icon-md { width: var(--icon-md); height: var(--icon-md); }
.icon-lg { width: var(--icon-lg); height: var(--icon-lg); }
.icon-xl { width: var(--icon-xl); height: var(--icon-xl); }
.icon-2xl { width: var(--icon-2xl); height: var(--icon-2xl); }
```

**ممنوع** أي icon size خارج هذا السلم. حتى 18px ممنوع. اختر 16 أو 20.

---

## ٦. اللون

```css
.icon {
  fill: none;
  stroke: currentColor;     /* lucide */
  /* أو */
  fill: currentColor;       /* phosphor regular */
}
```

**ممنوع `fill="#xxxxxx"` في markup.** اللون يَأتي من cascade دائماً.

### tinted icons:
```html
<svg class="icon icon-md" style="color: var(--color-tint)" aria-hidden="true">
  <use href="..."></use>
</svg>
```
(هذا inline-style مسموح لأن `color:` يَستخدم token. spatial doctrine §٣ inline-style audit يَعفي tokenized inline-styles.)

---

## ٧. Accessibility

```html
<!-- decorative -->
<svg class="icon icon-md" aria-hidden="true"><use href="..."/></svg>

<!-- meaningful, no label -->
<button aria-label="إغلاق">
  <svg class="icon icon-md" aria-hidden="true"><use href="...#i-x"/></svg>
</button>

<!-- with label -->
<button>
  <svg class="icon icon-sm" aria-hidden="true"><use href="...#i-check"/></svg>
  <span>تَأكيد</span>
</button>
```

**قاعدة**: كل `<svg>` يَجب أن يَملك `aria-hidden="true"` أو يَكون داخل عنصر بـ `aria-label`.

---

## ٨. الإجراءات المحظورة (10 صارمة)

1. ❌ أي emoji نصي في markup (☎ ✓ 📊 → forbidden دائماً)
2. ❌ inline `<svg viewBox>` يَكتبه AI يدوياً (ليس عبر sprite)
3. ❌ خلط Lucide + Phosphor في nav region واحدة
4. ❌ أي مكتبة خارج الـ stack (Material, FontAwesome, Bootstrap, Heroicons)
5. ❌ size خارج السُّلَّم الست (14/16/20/24/32/48)
6. ❌ stroke-width غير 1.75 لـ Lucide
7. ❌ `fill="#xxxxxx"` hardcoded
8. ❌ اسم دلالي غير موجود في SEMANTIC_MAP (يَجب إضافته أولاً)
9. ❌ icon decorative بلا `aria-hidden="true"`
10. ❌ icon meaningful بلا `aria-label` على parent

---

## ٩. الـ JS API Surface (`Upg.icons`)

سَيُبنى في α4. واجهة مُجمَّدة:

```js
Upg.icons = Object.freeze({
  use(semanticKey, opts = {}),     // يُرجِع SVGElement
  list(),                          // كل المفاتيح المتاحة
  has(semanticKey),                // bool
  size(name),                      // string (e.g., "20px")
  audit(rootEl),                   // {emoji_count, inline_svg_count, sprite_uses}
});
```

---

## ١٠. الـ Pre-flight قبل أي markup فيه icon

1. هل الـ semantic key موجود في `SEMANTIC_MAP.json`؟
   - لا → أضِفه أولاً، ثم استخدم
2. هل تَستخدم `Upg.icons.use()` أو `<use href>` (sprite)؟
   - لا (تَكتب `<svg viewBox>` يدوياً) → STOP
3. هل الحجم في السُّلَّم؟
   - لا → STOP, اختر 14/16/20/24/32/48
4. هل library واحدة لهذا chrome region؟
   - لا (خلط Lucide+Phosphor) → STOP
5. هل aria-* موجود؟
   - لا → أضِف
6. هل لون hardcoded `fill="#"`؟
   - نعم → STOP, استخدم currentColor

أي "لا" → fix.

---

## ١١. Iconography Health

```
icon_health = 100
  - 0.02 لكل emoji (1111 baseline = -22.22)
  - 0.5 لكل inline <svg viewBox> (224 baseline = -112) → سيتدنّى منعاً لتدمير score
  - 5 لكل size خارج السلم
  - 8 لكل hardcoded fill
  - 10 لكل library خلط في nav
  - 15 لكل library خارج الـ 2
```

في v5 baseline: **icon_health = 0** (موضوع للنهوض).
**Target بعد α4**: ≥ 60 (sprite عاش، أعمدة المعنى موجودة).
**Target بعد η1**: ≥ 90.
**Target بعد θ2**: ≥ 95.

---

## ١٢. خلاصة

> «الأيقونة لقاء صغير بين القارئ و النيَّة. حين تَكون emoji، اللقاء كَسول. حين تَكون sprite محسوب، اللقاء يَدلّ على دار صناعة.»

— نهاية Iconography Doctrine —
