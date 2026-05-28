# ✦ CHROMA DOCTRINE — مذهب اللون
> Pack v5 / TADAFFUQ. Read-only after this commit.

---

## ١. المبدأ

اللون يَنطق بثقافة. كل tone في v5 له اسم عربي وله جذر بصري. لا hex خارج token files. لا palette مُستوحاة من Tailwind/Radix/Material — كل لوحة لها اسم عربي ومرجع تاريخي.

---

## ٢. الأربع عائلات (4 Token Families)

### ٢.١ `--paper-*` — Surface tonal
الـ 3 surfaces من SPATIAL DOCTRINE § ٤. هذه tokens تَختلف بين dark/light theme.

```css
/* dark (Mihrab) */
--paper-base:     oklch(13% 0.04 280);
--paper-raised:   oklch(16% 0.05 280);
--paper-elevated: oklch(20% 0.06 280);

/* light (Linen-Bone) — موروث من W12 P2 */
--paper-base:     oklch(98% 0.005 80);
--paper-raised:   oklch(96% 0.006 80);
--paper-elevated: oklch(94% 0.008 80);
```

### ٢.٢ `--ink-*` — Text ladder
4 levels — primary / secondary / tertiary / disabled.

```css
/* dark */
--ink-primary:   oklch(96% 0.012 80);
--ink-secondary: oklch(74% 0.012 80);
--ink-tertiary:  oklch(54% 0.012 80);
--ink-disabled:  oklch(40% 0.012 80);

/* light */
--ink-primary:   oklch(20% 0.020 80);
--ink-secondary: oklch(35% 0.020 80);
--ink-tertiary:  oklch(50% 0.020 80);
--ink-disabled:  oklch(70% 0.020 80);
```

### ٢.٣ `--tint-*` — Per-page identity (15 + curriculum)
موروث من W21 P3. كل صفحة تَحصل على `--color-tint` و`--color-tint-edge` و`--color-tint-soft`. v5 لا يُغيِّر القيم — يُكمل الـ doctrine.

| Page | Tint base | Cultural reference |
|---|---|---|
| dashboard | Saffron | زعفران |
| callcenter | Damascus | دمشق الجيرية |
| fieldsales | Silt | طمي النيل |
| accountmgr | Cedar | أرز لبنان |
| social | Coral | مرجان |
| lab | Marble | رخام |
| psych | Lapis | لازورد |
| eq | Mihrab | محراب |
| negotiation | Damascus-deep | دمشق غامق |
| customercare | Pearl | لؤلؤ |
| programming | Indigo | نِيلي |
| accounting | Palm | نَخيل |
| phonerepair | Henna-deep | حنّاء غامق |
| hrmastery | Henna | حنّاء |
| myprogress | Lapis-light | لازورد فاتح |

### ٢.٤ `--accent-*` — Action / Progress / Signal
ثلاثة tokens — لكن **single-accent rule**: واحد فقط ظاهر/شاشة.

```css
--accent-action:   var(--color-tint);                 /* primary CTA */
--accent-progress: color-mix(in oklch, var(--color-tint) 88%, white); /* in-progress fill */
--accent-signal:   var(--chr-cedar-500);              /* success */
```

**الـ Single-Accent Rule:**
- على أي شاشة لحظة معينة، عنصر واحد فقط يَستخدم `--accent-action` كـ primary CTA
- عنصر واحد فقط يَستخدم `--accent-progress` كـ active filling
- إذا الصفحة تحتاج 2 CTA، الـ secondary CTA يَستخدم `--ink-primary` border-only، لا fill

---

## ٣. الـ 12 لوحة (12 Cultural Palettes)

موروثة من W21 P1. كل لوحة 10 stops (50/100/200/300/400/500/600/700/800/900). كل القيم oklch.

| الإسم | Hue dominant | الجذر |
|---|---|---|
| **Lapis** لازورد | 252° (blue) | حجر اللازورد، أفغانستان، ٧ آلاف سنة |
| **Mihrab** محراب | 280° (deep violet) | جوف المسجد، الزخرفة الأموية |
| **Saffron** زعفران | 65° (amber) | بَهار، إيران، Golden Age |
| **Henna** حنّاء | 25° (terracotta) | نبات، تَزيين العروس |
| **Indigo** نِيلي | 245° (deep blue) | نَيلَة، صبغة قمصان البدو |
| **Cedar** أرز | 135° (forest green) | أرز لبنان، رمز قِدَم |
| **Pearl** لؤلؤ | 80° (warm white) | الخليج، غوص البحر |
| **Damascus** دمشقي | 220° (steel blue) | فولاذ دمشق، السيف |
| **Silt** طمي | 35° (warm brown) | طمي النيل، الزراعة |
| **Coral** مرجان | 15° (orange-red) | البحر الأحمر |
| **Marble** رخام | 240° (cool grey) | محاجر اليمن والمغرب |
| **Palm** نَخيل | 95° (olive) | نَخل عراقي، تين |

---

## ٦. Hex Discipline

> **Zero hex outside token files. Zero exceptions.**

- ✅ مَسموح في: `tokens/_color.css`, `worlds/_*.css`, `_legacy-fontface.css`
- ✅ مَسموح في: `archive/**` (تاريخ مُقدَّس)
- ❌ ممنوع في: `pages.css`, `chrome.css`, `motion.css`, `utilities.css`, `app.js`, `index.html`
- v5 baseline: `hex_in_pages_css = 859` ⚠️ (مَوروث من v3 content؛ يُعالَج في η2 + ε targets)

كل لون في كل ملف غير-token يأتي عبر:
- `var(--token-name)` — مَفضَّل
- `color-mix(in oklch, var(--token) X%, white|black|transparent)` — مَقبول
- `oklch()` literal — فقط لو محسوب من W21 palette stops

---

## ٧. Dark/Light Symmetry

كل token في `--paper-*` و`--ink-*` يجب أن:
1. يَكون له value في `:root[data-theme="dark"]`
2. يَكون له value في `:root[data-theme="light"]`
3. يَحقِّق contrast WCAG AA (4.5:1) على الأقل بين paper-base + ink-primary

W21 P5 أضاف `Upg.chroma.checkContrast(fg, bg)` للـ runtime audit.

---

## ٨. Per-Page Identity Cascade

```
:root                          (default --color-tint = chr-lapis-500)
  └─> [data-page-personality="X"] (override --color-tint, --color-tint-edge, --color-tint-soft)
       └─> [data-active-tint]    (W12 P5 forced override scope)
            └─> [data-aura-override] (W16 P6 ephemeral override)
```

كل override أعلى يَفوز بدون `!important`. الـ specificity cascade وحده.

---

## ٩. Single-Accent Audit

في كل stage يُعدَّل markup، grep:
```bash
# violations: same screen with 2+ --accent-action OR 2+ --accent-progress
grep -c '--accent-action' platform/index.html
grep -c '--accent-progress' platform/index.html
```

لو الـ violations > 0، الـ stage لا يُسلَّم.

---

## ١٠. القاعدة الأم

> **«اللون يَنطِق بثقافة. كل palette لها اسم عربي. كل hex خارج tokens محظور. كل شاشة لها accent واحد.»**

— نهاية CHROMA DOCTRINE —
