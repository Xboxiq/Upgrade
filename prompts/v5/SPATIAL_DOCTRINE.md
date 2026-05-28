# ✦ SPATIAL DOCTRINE — مذهب المساحة
> Pack v5 / TADAFFUQ. Read-only after this commit.

---

## ١. المُعجم

| المُصطلح | التعريف |
|---|---|
| **Canvas** | منطقة المُحتوى الرئيسية. نهر يَجري — لا max-width ضيِّقة |
| **Dock** | الـ chrome الدائم: sidebar (desktop) + topbar (دائم) + bottom-nav (mobile) |
| **Surface** | طبقة paper tonal: base / raised / elevated (3 tiers) |
| **Inline / Block** | logical axes — يَدور تلقائياً مع `dir` |
| **Stop / Step** | rhythm-1..16 (8pt baseline grid، موروث من W15) |

---

## ٢. الـ Canvas

### ٢.١ مبدأ
المحتوى في v5 لا يَجلس داخل صندوق ضيِّق `max-width: 1200px;`. الـ canvas يَملأ المساحة المُتاحة بعد الـ dock، ثم **داخل الـ canvas** فقط، الـ "reading column" يَستخدم `--measure-*` (W15 P5).

### ٢.٢ Layout
```
┌─[ Topbar Dock — sticky/dynamic-island ]──────────────┐
│ ┌─[ Sidebar Dock ]─┐ ┌─[ Canvas ]──────────────────┐ │
│ │   nav-list       │ │ section-block-tldr          │ │
│ │   collapsible    │ │ block (with prereq-chip)    │ │
│ │   identity-tint  │ │ takeaways                   │ │
│ │                  │ │ pitfalls                    │ │
│ │                  │ │ practice                    │ │
│ │                  │ │ bridge                      │ │
│ └──────────────────┘ └─────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
                    [ Mobile Bottom-Nav (≤768px) ]
```

### ٢.٣ Tokens المُلزَمة
```css
--canvas-padding-inline: clamp(var(--rhythm-2), 4vw, var(--rhythm-6));
--canvas-padding-block:  var(--rhythm-4);
--canvas-gutter:         var(--rhythm-3);
--canvas-rail:           clamp(240px, 18vw, 280px);  /* sidebar width */
--canvas-island:         clamp(56px, 7vh, 72px);     /* topbar height */
--canvas-bottomnav:      clamp(56px, 8vh, 64px);     /* mobile bottom-nav */
```

### ٢.٤ Reading Column داخل Canvas
لقراءة طويلة: `.u-prose` يَفرض `max-width: var(--measure-normal)` ≈ 65ch. الـ canvas نفسه لا يَفرض هذا — فقط blocks المُختارة.

---

## ٣. الـ Dock

### ٣.١ Sidebar (desktop, ≥1024px)
- موضع: `position: sticky; inset-inline-start: 0;`
- عرض: `--canvas-rail`
- collapse عبر `Cmd+\` أو `Ctrl+\` (موروث من Upg.nav)
- في collapsed mode: 17 tooltip معروف (W14 P4)
- identity-tint underline على الـ active item

### ٣.٢ Topbar (دائم، scroll-aware)
- موضع: `position: sticky; top: 0;` — يَنكَمش 4px عند scroll > 24px (Dynamic Island، W14 P4)
- ارتفاع: `--canvas-island`
- محتوى: wordmark + cmdk button + theme-toggle + sound-toggle + aura-indicator

### ٣.٣ Mobile Bottom-Nav (≤768px)
- موضع: `position: fixed; bottom: 0;` (الاستثناء الوحيد المسموح بـ `position: fixed`)
- safe-area: `padding-block-end: env(safe-area-inset-bottom);`
- 4 شعارات أساسية (لا أكثر — لو محتاج أكثر، استخدم cmdk)
- Upg.haptic.tap() عند press (موروث)

### ٣.٤ Dock Discipline
- الـ sidebar **لا** يَتحرَّك مع scroll (sticky، ليس fixed)
- الـ topbar **يُمكن** أن يَنكَمش عند scroll، لكن لا يَختفي
- الـ bottom-nav **لا** يَختفي مع scroll (lesson v4.0.2: المستخدم يحتاجه دائماً)

---

## ٤. الـ 3 Surfaces

### ٤.١ Hierarchy
| Surface | Token | استخدام |
|---|---|---|
| **base** | `--paper-base` | canvas background |
| **raised** | `--paper-raised` | cards, blocks, qcalc shells |
| **elevated** | `--paper-elevated` | active drawer, focused dialog (slide-over only) |

### ٤.٢ كيف يُمَيَّز كل tier
- **base**: لا shadow، grain خفيف (W14 P1 grain)
- **raised**: shadow tinted خفيفة (`color-mix --color-tint 8%`)
- **elevated**: shadow أقوى + edge specular (W14 P1) + 1px border `color-mix(--color-tint 22%)`

### ٤.٣ Glass Override (W14 P1 ladder موروث)
الـ glass-thin/regular/thick/chrome ينطبق فوق هذه الـ 3 surfaces — الـ glass تأثير، الـ surface هو الـ tonal layer.

---

## ٥. RTL Discipline

### ٥.١ Logical Properties (مُلزَمة في v5)
| ❌ ممنوع | ✅ مطلوب |
|---|---|
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `border-left` | `border-inline-start` |
| `text-align: left` | `text-align: start` |
| `left: 0` | `inset-inline-start: 0` |
| `right: 0` | `inset-inline-end: 0` |

### ٥.٢ Bidi Isolation
- أي رقم latin داخل نص arabic → `unicode-bidi: isolate; direction: ltr;`
- موروث من W15 P4 (25 instances)
- v5 يَزيد عليها — كل `[lang="en"]` و `.latin` و `.num` يَحصل على isolation تلقائياً

### ٥.٣ Direction-Aware Animation
- `slide-rtl` keyframe ينطبق دائماً (لأنه الـ default)
- `slide-ltr` يُستخدم فقط لـ `<div lang="en" dir="ltr">` blocks
- W16 P3 Upg.transition.navigate(pageId, {direction}) يَحُلّ هذا تلقائياً

---

## ٦. Breakpoints (موروث من α2 v4، مُلزَمة)
```
--bp-xs: 360px   /* صغير جداً */
--bp-sm: 480px   /* mobile portrait */
--bp-md: 768px   /* mobile landscape / tablet portrait */
--bp-lg: 1024px  /* tablet landscape / small laptop */
--bp-xl: 1280px  /* desktop standard */
--bp-2xl: 1536px /* wide desktop */
```

### Dock visibility per breakpoint
| Breakpoint | Sidebar | Topbar | Bottom-Nav |
|---|---|---|---|
| ≤768px | hidden (use drawer + cmdk) | shown | shown |
| 769–1023px | drawer (toggle) | shown | hidden |
| ≥1024px | sticky pinned | shown | hidden |

---

## ٧. القاعدة الأم

> **«المحتوى ينحو حيث يُسمح. الـ chrome يَجلس حيث يَنبغي. كل margin/padding/border يَدور مع `dir`، لا ضدَّه.»**

— نهاية SPATIAL DOCTRINE —
