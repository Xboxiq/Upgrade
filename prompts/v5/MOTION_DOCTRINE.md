# ✦ MOTION DOCTRINE — مذهب الحركة
> Pack v5 / TADAFFUQ. Read-only after this commit.

---

## ١. المبدأ

الحركة في v5 خادمة. لا تُلفت لنفسها. تَخدم القراءة، تَخدم الإدراك، تَخدم القرار. كل حركة لها سبب — كل سبب له أقصى مدة لا يَتجاوزها.

---

## ٢. السبع مدد (7 Durations)

| Token | Value | استخدام |
|---|---|---|
| `--dur-instant` | **80ms** | hover state تغيُّر، tooltip ظاهر |
| `--dur-brisk` | **120ms** | press feedback، tactile-press scale |
| `--dur-normal` | **200ms** | standard transition، nav-pill، theme-toggle |
| `--dur-settle` | **320ms** | reveal/stagger، block enter |
| `--dur-dwell` | **480ms** | page transition، depth-mid |
| `--dur-slow` | **720ms** | ceremonial enter، hero reveal |
| `--dur-ceremonial` | **1.2s** | startup splash، page-transition--depth-deep, breath cycle |

**القاعدة الذهبية:** أي transition > 480ms يجب أن يَكون مَطلوب من المستخدم (click/scroll trigger)، لا تلقائي مُتكرِّر.

---

## ٣. الخمس Eases (5 Easings)

| Token | Curve | استخدام |
|---|---|---|
| `--ease-linear` | `linear` | progress bar، loader (لو مَوجود) |
| `--ease-soft` | `cubic-bezier(0.32, 0.08, 0.24, 1)` | hover، fade، standard transition |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | reveal، Bloom feedback، nav-pill slide |
| `--ease-depth` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | page transition، depth-shallow/mid/deep (W16 P3) |
| `--ease-sanctuary` | `cubic-bezier(0.65, 0, 0.35, 1)` | reduced-motion-safe smooth |

`--ease-spring` مُلزَم لـ Bloom feedback (overshoot 1.56). أي bouncy آخر — استخدم spring أو لا تَستخدم.

---

## ٤. الثلاث Feedback Patterns

### ٤.١ Press
**ما هي:** عندما يضغط المستخدم زراً.
**الحركة:** scale 0.985 لمدة 120ms (`--dur-brisk` + `--ease-soft`)
**Token:** `--tactile-press-scale: 0.985; --tactile-press-duration: 120ms;`
**Implementation:** `.tactile-press:active { transform: scale(var(--tactile-press-scale)); }`
**موروث من W16 P2.**

### ٤.٢ Bloom
**ما هي:** عندما يَكتمل عمل (form submit نجح، mastery toggle).
**الحركة:** scale 1 → 1.04 → 1 + opacity ring expand، 320ms (`--dur-settle` + `--ease-spring`)
**استبدال:** Bloom يَستبدل **toast notification** (Forbidden #10 في PULSE_LIBRARY).
**Token:** `--bloom-overshoot: 1.04; --bloom-ring-color: var(--color-tint);`
**Implementation:** keyframe `@keyframes bloom { 0%{} 50%{transform: scale(var(--bloom-overshoot))} 100%{} }`

### ٤.٣ Sanctuary
**ما هي:** عندما `prefers-reduced-motion: reduce`.
**الحركة:** كل animation/transition → duration 0.01ms (effectively off)، لكن opacity transitions مَسموحة بـ 200ms ease-sanctuary.
**Implementation:** `_motion-sanctuary.css` — الاستثناء الوحيد المسموح بـ `!important`.

---

## ٥. الحركات المُحرَّمة

| ❌ ممنوع | البَديل |
|---|---|
| Toast slide-in من corner | **Bloom** (§ ٤.٢) |
| Animated counter from 0 | اعرض القيمة فوراً |
| Modal fade overlay | **Slide-over** (drawer من side) |
| Spinner عام (loader.gif vibe) | Skeleton placeholder خفيف |
| Parallax أكثر من 24px | parallax مع `±24px cap` (W16 P3) |
| Shimmer مُتواصل > 3s | shimmer pulse مرة واحدة عند load فقط |
| Hover lift > 4px | `--tactile-lift-y: -2px` (W16 P2) |
| Scroll-jacked hijack | scroll السلس الـ default فقط |
| Heavy backdrop-filter (≥12px blur) | الـ ladder الموروث (4/8/12 max) |

---

## ٦. Reduced-Motion Sanctuary

`@media (prefers-reduced-motion: reduce)` يجب أن:

1. يُسكِت كل keyframe animation (`animation: none !important;`)
2. يُسكِت كل transition (`transition: none !important;`)
3. يُسكِت كل will-change (`will-change: auto !important;`)
4. يُسكِت كل filter متحرِّك (`filter: none !important;`)
5. يَترك opacity-only transitions تَعمل بـ 200ms

**موروث من v4 ζ، مُحقَّق بـ grep:** `count(@media (prefers-reduced-motion: reduce)) ≥ 47` في v5 baseline.

---

## ٧. Motion Choreography (محصور في 4 حالات)

### ٧.١ Page Enter
- depth-shallow (4px translate-y) للصفحات العادية
- depth-mid (10px) للـ dashboard
- depth-deep (18px) لانتقالات بين العوالم (γ → γ)
- Token: `--depth-{shallow|mid|deep}` (W16 P3 موروث)

### ٧.٢ Block Reveal
- stagger: 60ms gap بين blocks
- duration: `--dur-settle` (320ms)
- ease: `--ease-spring`
- IntersectionObserver gate (لا reveal إذا الـ block خارج viewport)

### ٧.٣ Hover/Press
- hover: `--tactile-lift-y: -2px` + `--tactile-lift-shadow` (tinted)
- press: `--tactile-press-scale: 0.985`
- moroz من W16 P2

### ٧.٤ Pointer Companion (W16 P4 موروث)
- 3 trail layers، gated by `pointer: fine` AND `prefers-reduced-motion: no-preference`
- color: `var(--color-tint)` لـ identity awareness
- mix-blend-mode: screen

---

## ٨. القاعدة الأم

> **«الحركة خادمة. كل millisecond له سبب. الـ sanctuary مُقدَّس — لا exception خارج motion-sanctuary block.»**

— نهاية MOTION DOCTRINE —
