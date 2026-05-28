# ✦ TADAFFUQ — مذهب منصة Upgrade v5
> **«تَدَفُّق — الواجهة نهر. لا مفاجآت قاسية، لا انقطاع، كل لمسة تنقاد إلى ما بعدها.»**
> الدستور الخامس. يتلو ÊLAN v4 ولا يُلغيه — يبني عليه.

---

## ١. لماذا تَدَفُّق (الانتقال من ÊLAN v4)

ÊLAN v4 أنجز الكثير: ثمانية عوالم، 32 Upg.* APIs، 30 beacon. لكنه ترك المنصة **متعدِّدة الجزر**: كل عالم يقف وحده، الانتقال بينها قفزة لا انسياب. الأرقام تُبيِّن الحقيقة:

| القياس | v4 finish | المشكلة |
|---|---:|---|
| inline-styles in index.html | 23 | جيد، لكن يجب صفر |
| !important total | 338 | كثير، حتى لو معظمه a11y-gated |
| woff2 font files actually procured | 0 | الكارثة — كل الـ font tokens تشير لخطوط لم تُحمَّل |
| emoji in markup | 1111 | ICONOGRAPHY محظورة وُجدت بالألف |
| backdrop-blur ≥ 12px | 6 | مقبول، لكن ينبغي ≤ 4 |
| hardcoded hex outside tokens | 1209 | أعلى من المتوقَّع — معظمها في worlds و legacy |
| inline `<svg viewBox>` | 224 | كل واحد forbidden إلا في sprite |

تَدَفُّق يعترف: المنصة **رائعة المظهر، خشنة المسلك**. v5 يحلّ هذا.

---

## ٢. الأقسام الأربعة (الـ 4 Oaths)

### العَهد الأول — التَّدَفُّق
> **«الانتقال أهم من المحطة.»**
كل تفاعل، كل تنقُّل بين صفحات، كل تغيُّر حالة → يجب أن يكون **مستمراً** (continuous), لا مُقطَّعاً. View Transitions API ليست ميزة، هي **معمار**. لا modal popups (forbidden), لا toasts (forbidden), لا animated counters from 0 (forbidden). كل قيمة تُعرَض جاهزة، ثم تتدفَّق.

### العَهد الثاني — الصِّدق العددي
> **«الرقم لا يُذكَر بلا grep.»**
v4 انتهى بـ ζ1.5 (corrective truth pass) لأن commit ادعى hardcoded=0 ثم تبيَّن 12. v5 لا يكرّر الخطأ. كل stage:
- يبدأ بـ FORENSIC SCAN على الكود الفعلي
- ينتهي بـ verified key=value في commit message
- TRUTH_LEDGER.md append-only، sha-anchored

### العَهد الثالث — الرَّتابة المُقدَّسة (Sacred Monotony of Tokens)
> **«4 token families. لا أكثر، لا أقل. هكذا يُبنى نظام تصميم.»**
v5 يحصر كل تصميم في **4 عائلات**:
1. **Color** — `--color-*` (chroma doctrine)
2. **Space** — `--space-*` (spatial doctrine, 4pt grid)
3. **Type** — `--type-*` (8 voice tokens)
4. **Motion** — `--duration-*` + `--ease-*` (motion doctrine)
أي token خارج هذه العائلات → forbidden.

### العَهد الرابع — تَنَفُّس واحد
> **«صفحة واحدة، نَفَس واحد، accent واحد.»**
single-accent rule: في أي شاشة، عنصر واحد بـ `--accent-action` و عنصر واحد بـ `--accent-progress`. لا تنافس بصري. الـ pillar غير المتنافس يدفع المستخدم بسلاسة عبر الصفحة (CHROMA doctrine §٤).

---

## ٣. الأعمدة الثلاثة (الـ 3 Structural Pillars)

التَّدَفُّق يقوم على ثلاث ركائز معمارية، تختلف عن v4 (الذي كان "8 عوالم"):

### الركيزة الأولى — **Spatial Continuity** (المكان)
- canvas واحد (القماش الأساسي)
- dock واحد (شريط الإجراءات)
- 3 surfaces (paper / glass / metal) — ليس أكثر
- RTL أصلي (ليس flip لاتيني)
تفاصيل في `SPATIAL_DOCTRINE.md`.

### الركيزة الثانية — **Temporal Continuity** (الزمن)
- 7 durations فقط (instant / hair / quick / fluid / linger / slow / dramatic)
- 5 easings فقط (linear / out / in-out / spring-soft / spring-snappy)
- 3 feedback patterns فقط (Press / Bloom / Settle)
تفاصيل في `MOTION_DOCTRINE.md`.

### الركيزة الثالثة — **Chromatic Sovereignty** (اللون)
- 4 token families فقط
- dark + light dual mode (مش "world theme")
- single-accent per screen
- per-page tint من token محصور (ليس free-form)
تفاصيل في `CHROMA_DOCTRINE.md`.

---

## ٤. القائمة المُحرَّمة (20 Forbiddens — مختصر، الكامل في PULSE_LIBRARY)

في v5، هذه ممنوعة قطعياً (لا استثناء):

| # | المحظور | البديل |
|---|---|---|
| 1 | `position: fixed; inset: 0` modal popup | slide-over surface (canvas-anchored) |
| 2 | toast notification | Spring Bloom (motion §3.2) |
| 3 | animated counter من 0 | render value, then linger pulse |
| 4 | `!important` خارج motion-sanctuary | @layer cascade discipline |
| 5 | أي emoji في markup | sprite icon via `Upg.icons.use()` |
| 6 | inline `<svg viewBox>` خارج sprite | sprite + `<use href>` |
| 7 | خلط Lucide + Phosphor في chrome واحد | one family per chrome region |
| 8 | hardcoded hex خارج tokens | `var(--color-*)` |
| 9 | backdrop-filter blur ≥ 12px | ≤ 8px ladder |
| 10 | أكثر من accent-action واحد per screen | hierarchy-first design |
| 11 | أكثر من accent-progress واحد per screen | one focus, others muted |
| 12 | mesh gradient generic (purple-orange-pink) | tonal gradient في token-space |
| 13 | floating sidebar بـ pill icons | dock pattern (spatial §2) |
| 14 | linen-bone monoculture | dark-default + light-careful |
| 15 | glassmorphism مكرَّر | 3 surfaces only |
| 16 | bento = مستطيلات بنفس padding | layered density rhythm |
| 17 | "Lorem ipsum" أو نصوص فضفاضة | محتوى عربي أصيل |
| 18 | Upg.* API منسوخ من v4 بلا extend | extend, never duplicate |
| 19 | تعديل أي ملف داخل `archive/` | history is sacred |
| 20 | `prompts/v1..v4` تعديل | history is sacred |

— الـ 25 الكاملة في `PULSE_LIBRARY.md` § Forbidden Library.

---

## ٥. الأصول المُقدَّسة (Sacred Assets — لا تُلمَس)

| الأصل | السبب |
|---|---|
| `archive/arabic-training-platform-v12-original.html` | تاريخ v0 |
| `prompts/v1`, `v2`, `v3`, `v4` | تاريخ القرار |
| 32+ Upg.* APIs الموجودة | backward-compat (v5 يَمدّ، لا يَستبدل) |
| 16 page sections | لا حذف |
| `state/PROGRESS.json` (entries v3, v4) | ذاكرة سابقة |
| `state/CREATIVITY_LOG.md` | ذاكرة beacons v4 |
| `state/TRUTH_LEDGER.md` (entries v4) | ذاكرة الأرقام |

v5 **يُضيف**: `state/PULSE_LOG.md` (مذهب جديد) و `tadaffuq_v5` block في PROGRESS.json.

---

## ٦. خريطة الأعمدة الثمانية (8 Pillars Map)

| Pillar | اسم | stages | الدور |
|---|---|---:|---|
| α | FOUNDATION (re-audit + lock) | 4 | α1 forensic / α2 tokens / α3 modules / α4 icons sprite |
| β | TYPE SOUL (procurement-truth) | 3 | β1 fonts woff2 / β2 voice cast / β3 numerics |
| γ | SPATIAL (canvas + dock + surfaces) | 5 | γ1 canvas / γ2 dock / γ3 surfaces / γ4 RTL / γ5 mobile |
| δ | MOTION (7+5+3 discipline) | 5 | δ1 durations / δ2 easings / δ3 feedback / δ4 view-tx / δ5 reduced |
| ε | CHROMA (4 families + dark/light) | 4 | ε1 dark / ε2 light / ε3 accent rule / ε4 page tints |
| ζ | CONTENT POLISH (specific gaps) | 6 | ζ1 dashboard / ζ2 calc / ζ3 myprogress / ζ4 cmdk / ζ5 search / ζ6 onboarding |
| η | QUALITY GATE (a11y + pwa) | 4 | η1 inline / η2 important cap / η3 a11y / η4 pwa |
| θ | SEAL (changelog + integration) | 2 | θ1 changelog / θ2 final PR |

**الإجمالي: 33 stage. 8 PRs (واحد per pillar) + 1 final إلى main.**

---

## ٧. التَّدَفُّق كفلسفة (Closing)

> «النَّهر لا يفكِّر "كيف أنتقل من نقطة إلى أخرى". يَنقاد. الواجهة الجيدة كذلك. v4 بنى الجزر. v5 يحفر القنوات بينها.»

— نهاية المذهب —
