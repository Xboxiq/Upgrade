# γ1 — Mawj (موج) Light Theme
> **Pillar γ (CHROMA) / Stage 1 of 4**
> **Mawj** = ساحل الخليج فجراً. رمل ساحلي خفيف + فيروز + قهوة المضيف.
> هذه stage تستبدل palette "Linen-Bone" الحالي (المُقلَّد من Apple) بهوية بصرية عربية أصيلة.

---

## السياق

النصف الـ light الحالي:
```
--color-bg: hsl(38 28% 96.5%);  /* linen */
--color-brand: hsl(176 64% 34%); /* generic teal */
```
ينتمي إلى **عائلة Apple/Stripe**. كل ثاني منصة AI-generated في 2025 تشبهه.

ÊLAN يبني هوية لا تُلتبس مع أي منصة أخرى:
- الخلفية رمل ساحلي صباحي (warm pearl)
- الـ accent فيروز خليج (turquoise depth)
- الـ ember قهوة عربية مضيافة (مكان الأزرق المعتاد للـ CTA)
- الـ focus سدر عميق (purple-violet لا أحد يتوقعه على رمل)

---

## التنفيذ

### استبدل block `[data-theme="light"]` في `style.css` بالكامل

```css
@layer themes {
  :root[data-theme="light"],
  html[data-theme="light"],
  body[data-theme="light"] {
    /* ─── ÊLAN v4 — Mawj — Coastal Arabian Light ─── */

    /* Anchor (surface ladder) — رمل ساحلي طبقي */
    --anchor-bg:       hsl(36 35% 95%);   /* رمل صباحي */
    --anchor-0:        hsl(38 42% 98%);   /* مدّ خفيف على رمل */
    --anchor-1:        hsl(36 32% 96%);   /* بطاقة عادية */
    --anchor-2:        hsl(34 26% 92.5%); /* بطاقة مرفوعة */
    --anchor-3:        hsl(32 22% 88%);   /* بئر (sunk well) */

    /* Ink — مداد نخيل + أعماق */
    --ink:             hsl(220 38% 12%);
    --ink-muted:       hsl(220 18% 36%);
    --ink-faint:       hsl(220 14% 54%);

    /* Lines — حدود رملية */
    --line:            hsl(36 16% 84%);
    --line-strong:     hsl(36 18% 72%);

    /* Accent — فيروز خليج (الـ brand identity الأساسي) */
    --accent:          hsl(177 64% 34%);
    --accent-hover:    hsl(177 70% 28%);
    --accent-soft:     color-mix(in oklch, hsl(177 64% 34%) 9%, hsl(38 42% 98%));
    --accent-strong:   hsl(177 70% 26%);

    /* Ember — قهوة عربية (CTAs العاطفية + لحظات الانتصار) */
    --ember:           hsl(28 78% 50%);
    --ember-hover:     hsl(28 82% 45%);
    --ember-soft:      color-mix(in oklch, hsl(28 78% 50%) 12%, transparent);

    /* Focus — سدر عميق (active state، outlines) */
    --focus:           hsl(252 65% 50%);
    --focus-soft:      color-mix(in oklch, hsl(252 65% 50%) 14%, transparent);

    /* Semantic state */
    --state-success:   hsl(152 56% 32%);
    --state-warning:   hsl(34 92% 42%);
    --state-danger:    hsl(0 70% 46%);
    --state-info:      hsl(210 78% 42%);

    /* Tinted shadows — لا black مسطح. ظلال بدفء ساحلي */
    --shadow-sm: 0 1px 2px hsl(220 30% 18% / 0.05),
                 0 1px 1px hsl(28 28% 35% / 0.04);
    --shadow-md: 0 4px 12px hsl(220 30% 18% / 0.08),
                 0 2px 4px hsl(28 28% 35% / 0.05);
    --shadow-lg: 0 14px 32px hsl(220 30% 18% / 0.10),
                 0 4px 10px hsl(28 28% 35% / 0.06);
    --shadow-xl: 0 28px 60px hsl(220 30% 18% / 0.13),
                 0 8px 20px hsl(28 28% 35% / 0.07);

    /* Focus ring — moves to ember on hover for warmth */
    --ring: 0 0 0 3px color-mix(in oklch, var(--focus) 28%, transparent);
    --ring-warm: 0 0 0 3px color-mix(in oklch, var(--ember) 32%, transparent);

    /* ─── Backward-compat bridges (keep --color-* aliases alive) ─── */
    --color-bg:           var(--anchor-bg);
    --color-surface-0:    var(--anchor-0);
    --color-surface-1:    var(--anchor-1);
    --color-surface-2:    var(--anchor-2);
    --color-surface-3:    var(--anchor-3);
    --color-text:         var(--ink);
    --color-text-muted:   var(--ink-muted);
    --color-text-faint:   var(--ink-faint);
    --color-border:       var(--line);
    --color-border-strong: var(--line-strong);
    --color-brand:        var(--accent);
    --color-brand-hover:  var(--accent-hover);
    --color-brand-soft:   var(--accent-soft);
    --color-brand-strong: var(--accent-strong);
    --color-success:      var(--state-success);
    --color-warning:      var(--state-warning);
    --color-danger:       var(--state-danger);
    --color-info:         var(--state-info);
    --shadow-c-sm:        var(--shadow-sm);
    --shadow-c-md:        var(--shadow-md);
    --shadow-c-lg:        var(--shadow-lg);
    --shadow-c-xl:        var(--shadow-xl);

    color-scheme: light;
  }
}
```

---

## القيم البصرية المستهدفة

| العنصر | كيف يبدو |
|---|---|
| **الخلفية** | رمل صباحي دافئ، ليس white غامض |
| **بطاقات** | تتدرّج بنعومة من 0 → 3، كأن أمواجاً خفيفة تظللها |
| **CTAs العادية** | فيروز خليج (للأزرار المعتادة) |
| **CTAs الحاسمة** | قهوة دافئة (للحظات "ابدأ التحدي" / "احفظ التقدم") |
| **focus على input** | حلقة بنفسجية سدرية (تتباين بقوة على الرمل) |
| **الظلال** | دافئة قليلاً (warm-cocoa shadow)، لا cold-black flat |

---

## Acceptance Criteria

- [ ] `[data-theme="light"]` block محدَّث في style.css بـ Mawj palette
- [ ] الـ aliases الـ legacy موجودة (`--color-*` تعمل)
- [ ] صفحة dashboard في light mode تعرض الجو الجديد بدون errors
- [ ] لا تكسير لـ dark mode (γ2 تالٍ)
- [ ] grep يثبت: `grep -c 'hsl(36 35% 95%)' platform/assets/style.css` ≥ 1
- [ ] commit: `γ1: Mawj light theme — verified: light_block_updated, ember_token_added, legacy_aliases_intact`

---

## بعد γ1

ابدأ γ2 (Layl Dark) أو δ1 (Sidebar Magnetic) — كلاهما متاح بالتوازي.

— نهاية γ1 —
