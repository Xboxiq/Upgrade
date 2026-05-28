# 🌊 Motion Doctrine — مذهب الحركة في TADAFFUQ v5
> **«7 durations، 5 easings، 3 feedback patterns. هكذا يَتَدَفَّق الزمن.»**

---

## ١. الفرضية

الحركة في v4 كانت per-world (motion fingerprints متعدِّدة). نتيجة: 14+ duration token، 9+ easing curves. **فوضى زمنية**. v5 يُلزم الجميع بميزانية حركية موحَّدة.

---

## ٢. السبع Durations (الحدّ الأقصى)

```css
:root {
  --duration-instant: 0ms;       /* state flips, focus rings */
  --duration-hair: 80ms;         /* hover tints, micro-feedback */
  --duration-quick: 160ms;       /* button press, toggle, tab switch */
  --duration-fluid: 240ms;       /* drawer slide, popover, tooltip */
  --duration-linger: 380ms;      /* page transition, hero reveal */
  --duration-slow: 560ms;        /* dramatic reveal, full-page intro */
  --duration-dramatic: 880ms;    /* gateway / onboarding moment */
}
```

**7 قيم. لا 8، لا 6.**

### قواعد الاستخدام:
- `instant` = لا transition. focus ring يَجب أن يكون فوري.
- `hair` = أصغر شيء يُلاحَظ بصرياً. للـ tint shifts فقط.
- `quick` = الأكثر استخداماً. button click, toggle, tab.
- `fluid` = للـ panels (drawer, popover) — يَجب أن يَلين، ليس يَنفلت.
- `linger` = transitions بين صفحات. حافة الإدراك العليا.
- `slow` = حركات "lookout" (hero reveal, scroll snap).
- `dramatic` = عتبة المسرحية. للـ onboarding moments فقط.

### حدود:
- **ممنوع** `transition-duration: 100ms` خام. استخدم token.
- **ممنوع** `> 880ms` لأي حركة. حتى dramatic له سقف.
- **ممنوع** `< 80ms` (أقصر من إدراك بصري حقيقي).

---

## ٣. الخمس Easings

```css
:root {
  --ease-linear: linear;
  --ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);    /* default for entrances */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* state transitions */
  --ease-spring-soft: cubic-bezier(0.34, 1.56, 0.64, 1);   /* gentle overshoot */
  --ease-spring-snappy: cubic-bezier(0.18, 1.7, 0.5, 1);   /* assertive overshoot */
}
```

**5 منحنيات. لا 6.**

### قواعد:
- `linear` = للـ progress bars و gradient sweeps فقط. ممنوع للـ UI movements.
- `ease-out` = الافتراضي. كل entrance, every reveal.
- `ease-in-out` = state-to-state (toggle on→off, drawer open→close).
- `spring-soft` = "Bloom" feedback (PULSE_LIBRARY §3.2). overshoot ≤ 10%.
- `spring-snappy` = للـ "Click confirm" moments. overshoot ≤ 20%.

### حظر:
- ❌ `ease`, `ease-in`, `ease-out` كَكلمات مفتاحيَّة (يُنتجن منحنيات غير محسوبة).
- ❌ أي `cubic-bezier` خام في CSS shipped (يُكتَب كَ token فقط).

---

## ٤. الـ 3 Feedback Patterns

### Pattern 3.1 — **Press** (الضغط)
عند نقر button:
```css
.btn:active {
  transform: scale(0.985);
  transition: transform var(--duration-hair) var(--ease-out);
}
```
- مدّة: `hair` (80ms)
- transform: scale(0.985) — micro-compression
- bounce-back: `quick` (160ms) `ease-spring-soft`
- haptic (mobile): `vibrate(4)`
- لا `box-shadow` تغيير في press (overpolish)

### Pattern 3.2 — **Bloom** (التَّفتُّح)
عند **success confirm** (أُنجز, أُرسل, أُحفظ):
```css
@keyframes bloom {
  0% { transform: scale(1); }
  40% { transform: scale(1.06); }
  100% { transform: scale(1); }
}
.btn[data-state="success"] {
  animation: bloom var(--duration-quick) var(--ease-spring-soft);
}
```
- يحلّ محلّ الـ toast notification (forbidden in v5)
- اللون يتدفَّق من `--accent-action` إلى `--accent-success` خلال 240ms
- لا checkmark ✓ icon swap (cliché)
- المعلومة تَحدث **في** الزر، ليس فوقه

### Pattern 3.3 — **Settle** (الاستقرار)
عند فتح drawer / popover / slide-over:
```css
@keyframes settle {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
.drawer[data-open] {
  animation: settle var(--duration-fluid) var(--ease-out);
}
```
- never `translateY(40px)` initial (overshooting feels like an arrival from off-screen — dramatic & cheap)
- 8px فقط — هذا يكفي ليُحَسّ بـ presence
- لا blur transition during settle (يَكلِف GPU بدون فائدة بصرية)

---

## ٥. View Transitions API (طبقة معمارية، ليست feature)

```js
Upg.transition.navigate(pageId, { depth: 'mid' });
```

### قواعد:
- لكل تنقُّل بين pages → view transition إلزامي (إن المتصفح يدعم)
- 3 depths: `shallow` (4px parallax), `mid` (10px), `deep` (18px)
- direction-aware: تلقائياً RTL/LTR من `document.dir`
- duration = `linger` (380ms)
- easing = `ease-out`
- لا fade-only transitions (cheap)

### Fallback (no support):
- silent fallback إلى opacity transition (180ms)
- لا warning console

---

## ٦. Reduced Motion (الـ Sanctuary)

**هذه هي القاعدة المُقدَّسة الوحيدة لـ `!important` في v5.**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- هذه `!important` الوحيدة المسموحة (sanctioned exception)
- حتى motion.css الرئيسي **لا يحتاج `!important` آخر**
- كل @keyframes يَنبغي أن يحترم هذه القاعدة
- view transitions يَجب أن يَتدنّى إلى لا حركة (`view-transition-name: none`)

---

## ٧. Scroll Behavior

- `scroll-behavior: smooth` على `:root` افتراضي
- `scroll-snap-type: y mandatory` على containers محدَّدة فقط (gallery, slideshow)
- ممنوع smooth scroll force داخل modal-like (forbidden anyway)

---

## ٨. الـ Pre-flight قبل أي حركة

1. هل duration من `--duration-*` فقط؟
2. هل easing من `--ease-*` فقط؟
3. هل feedback يقع في 1 من الـ 3 patterns (Press / Bloom / Settle)؟
4. هل reduced-motion guard موجود (لو animation > hair)?
5. هل أنت تَكتب animated counter من 0؟ → STOP, render value
6. هل أنت تَكتب toast notification؟ → STOP, use Bloom
7. هل أنت تَكتب modal popup overlay? → STOP, use slide-over

أي "لا" → fix.

---

## ٩. حساب Motion Health

```
motion_health = 100
  - 5 لكل duration رقم خام (غير token)
  - 5 لكل easing string خام
  - 10 لكل toast/modal pattern
  - 15 لكل counter-from-zero
  - 20 لكل !important خارج reduced-motion sanctuary
  - 3 لكل مدّة < 80ms أو > 880ms
```
**Target: ≥ 90 عند PR Pillar.**

---

— نهاية Motion Doctrine —
