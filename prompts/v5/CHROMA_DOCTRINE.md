# 🎨 Chroma Doctrine — مذهب اللون في TADAFFUQ v5
> **«4 token families. dark + light. accent واحد per شاشة. هكذا يُحفَظ الانتباه.»**

---

## ١. الفرضية

v4 بنى 8 worlds × ~12 ألوان كلٌ = **96 token لوني**. النتيجة: 1209 hex خارج tokens (كل world استلف من الآخر بالخطأ). v5 يلغي world-themes ويبني نظاماً ذا **4 عائلات**.

---

## ٢. العائلات الأربعة (locked)

### Family 1: **Surface** (الأسطح)
الألوان التي تَكون خلفية لكل شيء.

```css
:root {
  --color-canvas:        oklch(0.18 0.01 256);  /* dark default */
  --color-paper:         oklch(0.22 0.012 256);
  --color-paper-edge:    oklch(0.30 0.015 256);
  --color-glass:         oklch(0.22 0.012 256 / 78%);
  --color-glass-edge:    oklch(0.40 0.02 256 / 30%);
  --color-metal-top:     oklch(0.32 0.018 256);
  --color-metal-bottom:  oklch(0.26 0.014 256);
  --color-metal-edge:    oklch(0.45 0.022 256);
  --color-metal-specular: oklch(0.65 0.03 256 / 18%);
}
```

**9 tokens, locked.** أي surface color خارج هؤلاء → forbidden.

### Family 2: **Ink** (الحبر — النصوص + الـ borders)
```css
--color-ink-strong:    oklch(0.95 0.005 256);  /* H1, primary text */
--color-ink:           oklch(0.85 0.008 256);  /* body */
--color-ink-soft:      oklch(0.65 0.01 256);   /* meta, captions */
--color-ink-faint:     oklch(0.45 0.008 256);  /* disabled, hints */
--color-ink-inverse:   oklch(0.18 0.01 256);   /* on accent backgrounds */
--color-divider:       oklch(0.40 0.012 256 / 24%);
--color-shadow:        oklch(0.05 0 0);        /* base for shadows */
```

**7 tokens, locked.**

### Family 3: **Accent** (الإجراء + التَّقدُّم)

هذا الجزء الحَسَّاس. v5 يَحصر الـ accents في **3 فقط**:

```css
--accent-action:    oklch(0.72 0.18 35);   /* الإجراء — single per screen */
--accent-progress:  oklch(0.78 0.14 200);  /* التقدُّم — single per screen */
--accent-success:   oklch(0.78 0.18 145);  /* نجاح — موضعي */
```

**Single-Accent Rule** (PILLAR قاعدة):
- في أي شاشة، يَجب رؤية:
  - `--accent-action` على ≤ 1 عنصر (CTA الرئيسي)
  - `--accent-progress` على ≤ 1 عنصر (active step / current section)
  - `--accent-success` يَظهر **مؤقَّتاً فقط** (Bloom moment، ثم يَختفي)
- إن وُجد عنصران بـ `--accent-action` → forbidden
- secondary buttons يَستخدمون `--color-paper-edge` border + `--color-ink` text

### Family 4: **State** (حالات النُّظم)
ألوان دلاليَّة. **لا تُستخدَم كـ accent.**

```css
--state-info:     oklch(0.74 0.12 230);
--state-warn:     oklch(0.80 0.15 80);
--state-error:    oklch(0.66 0.20 25);
--state-locked:   oklch(0.55 0.04 256);
--state-progress-track: oklch(0.32 0.012 256);  /* progress bar background */
```

**5 tokens.**

### الإجمالي: **9 + 7 + 3 + 5 = 24 token لوني فقط في dark mode.**
v4 كان عنده > 96. v5 يَحصر إلى ربع.

---

## ٣. Light Mode (Careful, not Linen-Bone)

```css
[data-theme="light"] {
  --color-canvas:        oklch(0.97 0.005 256);
  --color-paper:         oklch(0.99 0.003 256);
  --color-paper-edge:    oklch(0.90 0.006 256);
  --color-glass:         oklch(0.99 0.003 256 / 82%);
  --color-glass-edge:    oklch(0.85 0.008 256 / 50%);
  --color-metal-top:     oklch(0.95 0.005 256);
  --color-metal-bottom:  oklch(0.92 0.006 256);
  --color-metal-edge:    oklch(0.82 0.008 256);
  --color-metal-specular: oklch(1 0 0 / 40%);

  --color-ink-strong:    oklch(0.18 0.01 256);
  --color-ink:           oklch(0.30 0.012 256);
  --color-ink-soft:      oklch(0.50 0.01 256);
  --color-ink-faint:     oklch(0.70 0.008 256);
  --color-ink-inverse:   oklch(0.97 0.005 256);
  --color-divider:       oklch(0.70 0.012 256 / 30%);
  --color-shadow:        oklch(0.30 0.01 256);

  /* accents adjusted for light contrast */
  --accent-action:       oklch(0.62 0.20 35);
  --accent-progress:     oklch(0.55 0.16 220);
  --accent-success:      oklch(0.58 0.20 145);
}
```

### قواعد Light:
- canvas **ليس linen-bone** (forbidden #14). هو neutral cool oklch (0.97 chroma 0.005).
- light-mode shadows **darker** (oklch 0.30 ink) — neumorphic-style ممنوع
- accents **أعمق** (chroma 0.20 vs 0.18 in dark) لتعويض contrast loss

---

## ٤. Per-Page Tint Token (محصور)

كل صفحة تَختار **tint واحد** من قائمة محصورة (5 خيارات):

```css
[data-tint="azure"]   { --color-tint: oklch(0.70 0.14 240); }
[data-tint="ember"]   { --color-tint: oklch(0.72 0.18 30); }
[data-tint="moss"]    { --color-tint: oklch(0.70 0.13 145); }
[data-tint="ink"]     { --color-tint: oklch(0.68 0.06 280); }
[data-tint="ochre"]   { --color-tint: oklch(0.74 0.14 70); }
```

**5 tints. لا 14 (كما كان في v4).**

### الاستخدام:
- `--color-tint` يُستخدَم على page-h underline (56px wide)
- على pointer-trail (Phase 4 من v4)
- على focus-ring outline
- **ليس** على بطاقات أو CTAs — هذه `--accent-action`

### Per-page mapping:
| صفحة | tint |
|---|---|
| dashboard | azure |
| myprogress | azure |
| lab | ember |
| programming | ember |
| psych, eq | moss |
| negotiation, fieldsales | ink |
| accounting | ochre |
| social, callcenter | ember |
| phonerepair, customercare | ochre |
| hrmastery | ink |

(14 صفحة → 5 tints، تكرار مقصود لخلق "عائلات تَدَفُّق")

---

## ٥. Hardcoded Hex — Forbidden

```bash
# v5 رفع الالتزام: zero hex outside tokens/* and archive/
grep -rE '#[0-9a-fA-F]{3,8}\b' platform/ | grep -v tokens/ | grep -v archive/
```
- baseline v4 finish: 1209
- v5 target by η1: ≤ 50 (legacy worlds untouched ε pillar)
- v5 target by η4 (final): 0

---

## ٦. Color Mixing Rules

### `color-mix(in oklch, ...)` فقط
ممنوع `rgba()` أو `hsl()` خام في shipped CSS. الإذن الوحيد للتدرُّج:

```css
/* ✓ correct */
background: color-mix(in oklch, var(--color-paper) 78%, transparent);

/* ✗ wrong */
background: rgba(34, 36, 41, 0.78);
```

السبب: oklch perceptually uniform، rgba/hsl يُنتج تشتُّت لوني عند interpolation.

---

## ٧. Contrast Floors (a11y)

| طبقة | floor |
|---|---:|
| ink-strong على canvas/paper | ≥ 11:1 |
| ink على paper | ≥ 7.5:1 |
| ink-soft على paper | ≥ 4.5:1 |
| accent-action text | ≥ 4.5:1 |
| ink-faint | ≥ 3:1 (UI metadata only, never body text) |

η3 سَيَتحقَّق برمجياً عبر `Upg.contrast.audit()` API الذي يُضاف.

---

## ٨. Forced-Colors Mode (Windows High Contrast)

```css
@media (forced-colors: active) {
  .surface-paper, .surface-glass, .surface-metal {
    border: 1px solid CanvasText;
    background: Canvas;
  }
  .btn--action {
    background: ButtonFace;
    color: ButtonText;
    border: 1px solid ButtonText;
  }
}
```
كل surface و كل CTA يَجب أن يَدعم forced-colors. **هذه عَهد a11y.**

---

## ٩. الـ Pre-flight قبل أي color reference

1. هل اللون من `var(--color-*)` أو `var(--accent-*)` أو `var(--state-*)` أو `var(--color-tint)`؟
2. هل في الشاشة أكثر من عنصر بـ `--accent-action` ظاهر معاً؟ → STOP
3. هل في الشاشة أكثر من عنصر بـ `--accent-progress` ظاهر معاً؟ → STOP
4. هل أنت تَكتب hex أو rgba خام؟ → STOP
5. هل tint من القائمة الـ 5؟ (azure/ember/moss/ink/ochre)
6. هل light mode mirror موجود لكل override؟
7. هل forced-colors guard موجود؟

أي "لا" → fix.

---

## ١٠. Chroma Health

```
chroma_health = 100
  - 0.05 لكل hardcoded hex (1209 baseline = -60.45)
  - 1 لكل rgba/hsl خام
  - 5 لكل multi-accent violation per screen
  - 3 لكل tint خارج الـ 5 المحصورة
  - 8 لكل linen-bone canvas
```

**Target: ≥ 92 عند ε4 PR.**

---

— نهاية Chroma Doctrine —
