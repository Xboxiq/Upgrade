# ✦ TADAFFUQ — تَدَفُّق
> Pack v5. The constitution. Read-only after this commit.
> «الواجهة لا تُجَمَّع. الواجهة تتدفَّق.»

---

## ١. الاسم

**تَدَفُّق** (TADAFFUQ) — مصدر "تدفَّق". في العربية: جريان متَّصل بلا انقطاع، ماء يجد طريقه دون أن يُسأل.

في v5، المنصة لا تُعرَض كصفحات منفصلة. الـ chrome والمحتوى والصوت والإيقاع كلها تجري في تيار واحد. الانتقال بين العوالم لا يُحس كقفز بل كتحوُّل ماء بين أوانٍ.

---

## ٢. الأقطاب الأربعة (4 Oaths)

### القَسَم الأول — الصدق المُحقَّق
> «لا أُؤكِّد رقماً لم أَره بـ grep.»

كل ادعاء في PR description، في commit message، في ledger — مدعوم بـ grep قابل للتكرار. الرقم المنشور = الرقم المُحقَّق.

### القَسَم الثاني — التراكُم بلا هَدم
> «أُضيف ولا أَهدم. أحترم 25 الأبواب المُغلَقة.»

CSS عبر `@layer` (additive). JS عبر IIFE (mobile-safe). HTML عبر `data-*` hooks. الأرشيف مُقدَّس. v1/v2/v3/v4 مُقدَّسة. الـ Upg.* APIs الـ 40 الموجودة ⇐ يجب أن تظل تعمل.

### القَسَم الثالث — مُفاجأة في كل مرحلة
> «لا أُسلِّم مرحلة دون نَبضَة (Pulse) واحدة على الأقل.»

كل stage في γ/δ/ε/ζ/η يجب أن يحمل Pulse — تفصيل واحد لا يُمكن أن يَكون قد أتى من أي AI آخر. التفصيل الذي يَفصلنا عن الـ template generic.

### القَسَم الرابع — الإيقاع قبل البريق
> «الحركة خادمة، لا سيِّدة. الصوت مَدعو، لا مُسلَّط.»

كل animation، كل ease، كل transition، كل صوت — يَحترم `prefers-reduced-motion`. لا shimmer مُتواصل، لا parallax يَخدم نفسه، لا blur ثقيل (≥12px). المُستخدم له القرار النهائي.

---

## ٣. الأركان الثلاثة (3 Pillars of Substance)

### السِكين الأولى — Spatial (Doctrine: SPATIAL_DOCTRINE.md)
المساحة في v5 ليست شبكة 12 عمود. المساحة هي **canvas + dock + 3 surfaces**:
- **Canvas** (المُحتوى) — نهر يَجري بلا حواجز ضيِّقة
- **Dock** (chrome دائم) — sidebar + topbar + mobile-bottom
- **3 Surfaces** — base / raised / elevated (3-tier paper tonal)

اتجاه RTL هو الأساس. `dir="rtl"` ليس override، هو الـ default. كل margin/padding/border يُكتَب logical (`-inline-start` / `-inline-end`).

### السِكين الثانية — Motion (Doctrine: MOTION_DOCTRINE.md)
سبع مدد، خمس eases، ثلاث feedback patterns:
- **7 durations**: instant 80ms / brisk 120ms / normal 200ms / settle 320ms / dwell 480ms / slow 720ms / ceremonial 1.2s
- **5 eases**: linear / soft (ease-out) / spring / depth / sanctuary
- **3 feedback patterns**: Press / Bloom / Sanctuary

Feedback المرفوض: toast، modal popup، animated counter from 0، spinner عام. كلها في PULSE_LIBRARY § Forbidden.

### السِكين الثالثة — Chroma (Doctrine: CHROMA_DOCTRINE.md)
أربع عائلات tokens، dark + light symmetric، single-accent rule:
- **--paper-***: 3-tier surface tonal
- **--ink-***: text ladder
- **--tint-***: per-page identity (15 — موروث من Worker 21)
- **--accent-***: action / progress / signal — **واحد فقط ظاهر/شاشة**

الـ palette الأساسية = 12 لوحة ثقافية عربية (Lapis لازوردي / Mihrab محراب / Saffron زعفران / Henna حنّاء / Lapis نِيلي / Cedar أرز / Pearl لؤلؤ / Damascus دمشقي / Silt طمي / Coral مرجان / Marble رخام / Palm نَخيل) — كلها oklch، لا hex خارج token files.

---

## ٤. العشرون مَنعاً (20 Forbidden Disciplines)

> Forbidden Library الكامل في PULSE_LIBRARY.md § ٣ — هنا الإطار:

1. **بدون verify** — كل رقم في PR/commit/ledger مُحقَّق بـ grep
2. **بدون pulse** — γ/δ/ε/ζ/η stage بدون pulse = stage لم يُسلَّم
3. **بدون pivot** — تكرار pulse category 3 مرات → pivot إجباري
4. **بدون emoji** — في markup المُسلَّم. الأرشيف فقط
5. **بدون toy SVG** — لا `<svg viewBox>` يدوي خارج الـ sprite
6. **بدون mixed icons** — لا خلط Lucide+Phosphor في chrome region واحدة
7. **بدون hex خارج tokens** — كل لون يأتي من oklch token
8. **بدون heavy blur** — `backdrop-filter: blur(N)` حيث N ≥ 12px
9. **بدون modal popup** — `position: fixed; inset: 0` → استبدل بـ slide-over
10. **بدون toast** — استبدل بـ Spring (Bloom feedback pattern)
11. **بدون animated counter from 0** — اعرض القيمة، لا تَعدّ من صفر
12. **بدون !important** — خارج motion-sanctuary block (الاستثناء الوحيد)
13. **بدون double accent** — لا أكثر من `--accent-action` أو `--accent-progress` ظاهر/شاشة
14. **بدون لمس archive/** — التاريخ مُقدَّس
15. **بدون لمس prompts/v1..v4** — التاريخ مُقدَّس
16. **بدون rewrite للـ PULSE_LOG** — append-only بحت
17. **بدون class explosion في HTML** — استخدم data-* hooks
18. **بدون ESM في browser** — IIFE افتراضي (mobile-safe، v4.0.2 lesson)
19. **بدون font CDN** — local fonts فقط (woff2 in `assets/fonts/`)
20. **بدون unverified claim في PR body** — كل سطر مدعوم بـ grep على commit-sha

---

## ٥. السياق — كيف وَصَلنا

| الـ pack | الإسم | المساهمة |
|---|---|---|
| v1 | Workers 01-09 | 9 محتوى workers + tracks |
| v2 | Workers 11-14 | foundation + theme + icons + aurora |
| v3 | DEVOTIO 15-21 | resonance + vital UI + pacing + chromatic soul |
| v4 | ÊLAN α-ζ | tokens + worlds + worlds atlas + quality gate |
| **v5** | **TADAFFUQ α-θ** | **التيار** — حركة واحدة من الفاونديشن إلى السقف |

---

## ٦. ما يَتغيَّر في v5

ما **يَبقى**:
- 14 page-h header، 15 data-page-personality، 384 qcalc، 503+ data-block-id
- 40 Upg.* APIs (لن تَنكسر، فقط تُمدَّد)
- 12 لوحة ثقافية، 22 woff2 hybrid، 9 خط family
- @layer architecture، tokens/ + worlds/ split

ما **يُعاد بناؤه**:
- **Spatial**: canvas + dock + 3 surfaces (يَستبدل الـ 12-col grid أينما كان)
- **Motion**: 7 durations + 5 eases (يَستبدل الـ 6 durations / 5 eases الموروثة)
- **Pulse system**: 9 categories بَديل CREATIVITY_LOG.md beacons
- **Iconography**: SEMANTIC_MAP.json + Upg.icons.use() (لا `<svg viewBox>` يدوي بعد α4)
- **Forbidden Library**: 25 دخلاً صريحاً (PULSE_LIBRARY § ٣)

---

## ٧. القاعدة الأم

> **«التيار لا يَنقطع. الأقطاب الأربعة لا تُنتَهَك. الحركة خادمة. كل مرحلة تحمل بصمة.»**

— نهاية المانيفستو —
