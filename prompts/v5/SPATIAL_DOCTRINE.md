# 🏛 Spatial Doctrine — مذهب المكان في TADAFFUQ v5
> **«canvas واحد، dock واحد، 3 surfaces. هكذا تُبنى المساحة.»**

---

## ١. الفرضية

في v4، كل عالم بنى مساحته (page-h, bento, sidebar, topbar, drawer). النتيجة: **18 layout pattern** متفرّق. v5 يُلزم الجميع بـ **3 primitives مكانيّة فقط**.

---

## ٢. الـ Canvas (القماش)

كل صفحة **canvas واحد** — حاوية رئيسية بـ:

```css
.canvas {
  --canvas-padding-block: var(--space-6);
  --canvas-padding-inline: var(--space-5);
  --canvas-max-content: 72rem;
  display: grid;
  grid-template-columns: 1fr min(var(--canvas-max-content), 100%) 1fr;
  padding-block: var(--canvas-padding-block);
  padding-inline: var(--canvas-padding-inline);
}
.canvas > * { grid-column: 2; }
.canvas > .canvas--bleed { grid-column: 1 / -1; }
```

### قواعد:
- لا `max-width` آخر داخل canvas (يُشتَّت rhythm)
- لا nested canvases — canvas واحد per page section
- mobile: `--canvas-padding-inline` ينخفض إلى `var(--space-3)` تلقائياً عبر container query

---

## ٣. الـ Dock (شريط الإجراءات)

استبدال للـ "floating sidebar with pill icons" cliché.

### بنية:
```
┌────────────────────────────────────────────┐
│  [logo]   [breadcrumb]      [actions]  [me]│  ← topbar (fixed; scroll-shrink)
├────────────────────────────────────────────┤
│                                             │
│         CANVAS (the page)                   │
│                                             │
├────────────────────────────────────────────┤
│  [home][cmdk][stats][me]                   │  ← bottom-dock (mobile <768px)
└────────────────────────────────────────────┘
```

### Desktop (≥ 1024px):
- topbar = **dynamic island** (scroll-shrink من 64px → 48px)
- لا sidebar افتراضي. توسعة الـ nav عبر cmdk + breadcrumbs
- `<aside class="rail">` اختياري للـ secondary nav (sticky right edge in RTL)

### Tablet (768-1023px):
- topbar full
- rail يُطوى إلى drawer (`Upg.nav.drawerOpen()`)

### Mobile (<768px):
- topbar مختصر (logo + me)
- bottom-dock مع 4 إجراءات قصوى
- safe-area-inset-bottom محترَم
- haptic feedback عند tap (vibrate 4ms)

### قواعد:
- dock عناصره **≤ 4** (الانتباه ضيِّق)
- لا dock في صفحات onboarding/gateway (الانتباه يجب أن يَتركَّز)
- dock يَسكن (`opacity: 0.6`, transform `translateY(2px)`) عند scroll-down، ينهض عند scroll-up

---

## ٤. الـ 3 Surfaces (الأسطح الثلاثة)

في v5، **3 أسطح فقط**. أي surface رابع → forbidden.

### Surface 1: **Paper** (الورق)
```css
.surface-paper {
  background: var(--color-paper);
  border: 1px solid var(--color-paper-edge);
  box-shadow: var(--shadow-paper);
  border-radius: var(--radius-md);
}
```
- **متى**: المحتوى الأساسي، البطاقات، النماذج
- **خاصيّة**: شفافية صفر، ظل خفيف، grain svg خلفي ≤ 4% opacity
- **توكن**: `--shadow-paper: 0 1px 2px color-mix(in oklch, var(--color-shadow) 8%, transparent)`

### Surface 2: **Glass** (الزجاج)
```css
.surface-glass {
  background: color-mix(in oklch, var(--color-paper) 78%, transparent);
  backdrop-filter: blur(var(--blur-glass)) saturate(1.4);
  border: 1px solid var(--color-glass-edge);
}
```
- **متى**: chrome (topbar, dock), drawers, slide-overs, popovers
- **خاصيّة**: blur ≤ 8px (forbidden ≥ 12)
- **حدّ**: لا أكثر من **2 طبقات glass** متراكبة في أي شاشة (depth pollution)

### Surface 3: **Metal** (المعدن)
```css
.surface-metal {
  background:
    linear-gradient(180deg, var(--color-metal-top) 0%, var(--color-metal-bottom) 100%);
  border: 1px solid var(--color-metal-edge);
  box-shadow: inset 0 1px 0 var(--color-metal-specular);
}
```
- **متى**: زر CTA الواحد per screen (accent-action), badges، tokens-of-status
- **خاصيّة**: specular highlight أعلى (linear-gradient رقيق ≤ 8% delta), ليس glassmorphism
- **حدّ**: ≤ 3 metal elements per screen (else "tinsel" effect)

### قاعدة إلزامية:
- لا surface مختلط (paper-glass-metal hybrid). كل عنصر **واحد فقط** من الثلاثة.
- لا transparent gradient overlays فوق surface — كاسر الصدق.

---

## ٥. RTL Native (ليس flip)

### المبدأ:
RTL في v5 ليس `direction: rtl` يُقلب layout. هو **تصميم أوّلي للعربية**:
- قراءة من اليمين بدءاً من **الزاوية العلوية اليمنى**
- gravity البصري من **اليمين-إلى-اليسار** (counter-intuitive للـ LTR designers)
- icons في button text **بعد** (يسار) النص في RTL، **قبل** في LTR

### الـ Logical Properties (إلزامية):
ممنوع `padding-left`, `margin-right`, `border-left`, `left:`, `right:`. الإلزام:

| ممنوع | استخدم |
|---|---|
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `margin-top` | `margin-block-start` |
| `text-align: left` | `text-align: start` |
| `border-left` | `border-inline-start` |
| `left:` | `inset-inline-start:` |
| `right:` | `inset-inline-end:` |

### ترتيب children:
```css
/* RTL: عناصر تتدفَّق من inline-end إلى inline-start */
.dock-buttons { display: flex; gap: var(--space-3); }
/* لا flex-direction: row-reverse — اعتمد على document dir */
```

### Mixed Latin/Arabic:
- `unicode-bidi: isolate` على أي span يحتوي لاتيني داخل عربي
- numerals `font-variant-numeric: tabular-nums` على tokens
- لا `dir="ltr"` يدوي إلا داخل code blocks

---

## ٦. الـ Spatial Tokens (4pt grid)

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.5rem;   /* 24px */
--space-6: 2rem;     /* 32px */
--space-7: 2.5rem;   /* 40px */
--space-8: 3rem;     /* 48px */
--space-9: 4rem;     /* 64px */
--space-10: 6rem;    /* 96px */
```

**11 خطوة فقط.** أي قيمة خارج هذا (`padding: 13px`) → forbidden.

---

## ٧. Radii

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 14px;
--radius-xl: 20px;
--radius-pill: 9999px;
--radius-circle: 50%;
```
**7 قيم.** ممنوع غيرها.

---

## ٨. Z-index Scale (5 طبقات فقط)

```css
--z-base: 0;
--z-dock: 10;       /* topbar, bottom-dock */
--z-overlay: 20;    /* slide-over scrim */
--z-popover: 30;    /* popovers, tooltips */
--z-toast: 40;      /* (forbidden but reserved) */
--z-modal: 50;      /* (forbidden but reserved) */
```

ممنوع z-index رقم خام. استخدم token.

---

## ٩. الـ Pre-flight قبل أي markup

1. هل canvas واحد فقط في الصفحة؟ (إن كان pages/* shard، canvas واحد)
2. هل surface مختار من الثلاثة فقط؟
3. هل padding/margin من `--space-*` فقط؟
4. هل radius من `--radius-*` فقط؟
5. هل z-index من `--z-*` فقط؟
6. هل خصائص logical (لا left/right خام)؟
7. هل dock في desktop غير ظاهر إلا تحت 768px؟

أي "لا" → stop & fix.

---

— نهاية Spatial Doctrine —
