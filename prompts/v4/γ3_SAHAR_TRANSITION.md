# γ3 — Sahar (السحر) — Pre-Dawn Theme Transition
> **Pillar γ (CHROMA) / Stage 3 of 4**
> **Sahar** = الوقت قبل الفجر. ÊLAN's signature experimental feature: عند فتح المنصة لأول مرة في الجلسة، الواجهة تتحوّل من Layl (ليل) إلى Mawj (موج) خلال 25 ثانية.
>
> ⭐ **هذا هو الجزء الذي يميّز ÊLAN عن أي منصة AI-generated.**

---

## السياق النفسي (لماذا هذا فعلاً مفيد، ليس gimmick)

التدريب الذاتي يحتاج "لحظة عبور" نفسية بين "أنا في حياتي العادية" و "أنا الآن في وضع التعلم". المنصات الأخرى تفتح فجأة → القفز معرفي يكسر التركيز.

**Sahar** يقدّم 25 ثانية من العبور البصري:
- البداية: ليل صحراء (calming, contemplative)
- النهاية: فجر ساحلي (energetic, ready)
- المستخدم يشعر "بدأ يومي معك" — حتى لو كانت الجلسة في منتصف الليل

مرجع: Anders Ericsson "Peak" — حول دور "warm-up rituals" في deliberate practice.

---

## القيود الصارمة

1. **يحدث مرة واحدة لكل جلسة** (مرة في كل reload). تتبَّع عبر `sessionStorage`.
2. **يُعطَّل تلقائياً** لو `prefers-reduced-motion: reduce` (احترام a11y).
3. **يُعطَّل** لو المستخدم اختار صراحة theme معين في session سابق (يُحترَم اختياره).
4. **flag-gated**: `--theme-sahar-enabled: 0` افتراضياً، يُفعَّل عبر `data-sahar-experiment="on"` على body.
5. **مدة قابلة للتعديل** عبر `--sahar-duration: 25s`.
6. **لا يكسر** الـ theme switching اليدوي بعد الانتهاء.

---

## التنفيذ

### ١. CSS — أضف keyframes في `tokens/_motion.css`

```css
/* ÊLAN v4 — γ3 — Sahar Transition (experimental, flag-gated) */

:root {
  --sahar-duration: 25s;
  --sahar-easing: cubic-bezier(0.65, 0, 0.35, 1);
}

@keyframes sahar-bg {
  0%   { background-color: oklch(15% 0.02 240); }       /* layl */
  100% { background-color: hsl(36 35% 95%); }           /* mawj */
}

@keyframes sahar-ink {
  0%   { color: oklch(96% 0.012 80); }                  /* layl text */
  100% { color: hsl(220 38% 12%); }                     /* mawj text */
}

@keyframes sahar-accent {
  0%   { --runtime-accent: oklch(78% 0.16 165); }       /* layl teal */
  100% { --runtime-accent: hsl(177 64% 34%); }          /* mawj teal */
}

/* Activation — only when sahar is on AND no reduce-motion */
body[data-sahar-experiment="on"][data-sahar-running="true"] {
  animation:
    sahar-bg     var(--sahar-duration) var(--sahar-easing) forwards,
    sahar-ink    var(--sahar-duration) var(--sahar-easing) forwards,
    sahar-accent var(--sahar-duration) var(--sahar-easing) forwards;
}

@media (prefers-reduced-motion: reduce) {
  body[data-sahar-experiment="on"] {
    animation: none !important;
  }
}
```

### ٢. JS — `platform/assets/js/ux/ritual.js`

```javascript
/* ÊLAN v4 — γ3 — Sahar ritual: pre-dawn theme transition.
   Runs once per session. Flag-gated. Respects user's prior theme choice. */

const SAHAR_FLAG = 'upg_sahar_played';
const USER_THEME = 'upg_theme_choice';

export function maybePlaySahar() {
  // 1. Check feature flag
  if (document.body.dataset.saharExperiment !== 'on') return false;

  // 2. Already played this session? respect that
  if (sessionStorage.getItem(SAHAR_FLAG) === 'done') return false;

  // 3. User picked a theme explicitly before? respect that
  if (localStorage.getItem(USER_THEME)) return false;

  // 4. Reduce-motion? respect that
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  // 5. Play the ritual
  document.documentElement.setAttribute('data-theme', 'dark');  // start
  // 1 frame delay so the dark state paints
  requestAnimationFrame(() => {
    document.body.dataset.saharRunning = 'true';
  });

  // After completion: settle on light, mark done
  const duration = parseSeconds(getComputedStyle(document.documentElement)
    .getPropertyValue('--sahar-duration')) || 25;
  setTimeout(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.removeAttribute('data-sahar-running');
    sessionStorage.setItem(SAHAR_FLAG, 'done');
    document.dispatchEvent(new CustomEvent('upg:sahar:complete'));
  }, duration * 1000 + 100);

  return true;
}

function parseSeconds(s) {
  const m = String(s).match(/([\d.]+)s/);
  return m ? parseFloat(m[1]) : null;
}

// Auto-trigger on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', maybePlaySahar);
} else {
  maybePlaySahar();
}

// Public API
window.Upg = window.Upg || {};
window.Upg.ritual = Object.freeze({
  sahar: { play: maybePlaySahar, isRunning: () => document.body.dataset.saharRunning === 'true' }
});
```

### ٣. تفعيل افتراضي في `index.html` (lazy):

```html
<!-- في <body>، أضف data-attribute واحد فقط -->
<body data-sahar-experiment="on">
```

(الـ default = off لو data-attribute غير موجود — flag صحيح)

### ٤. زر تعطيل سريع في settings (اختياري لـ stage مستقبلية):

```javascript
// في chrome/topbar.js مستقبلاً
function disableSahar() {
  document.body.dataset.saharExperiment = 'off';
  localStorage.setItem('upg_sahar_disabled', '1');
}
```

---

## الـ UX Choreography (ماذا يرى المستخدم)

```
T=0s   ─────  Layl deepest dark (oklch 15% 0.02 240)
T=2s         الخلفية تبدأ تتلوّن نحو الأزرق-الفجري
T=8s         النص يبدأ يفتح تدريجياً
T=14s        Aurora teal يتحول إلى فيروز خليج (saturation shift)
T=20s        الخلفية تصبح مرئية كرمل صباحي
T=25s   ────  Mawj fully settled — جلسة جاهزة
T=25.1s     event "upg:sahar:complete" يُطلَق
            → topbar يُظهر greeting "صباح النور — جاهز للجلسة؟"
            → dashboard counter starts counting up
```

---

## Acceptance Criteria

- [ ] `tokens/_motion.css` يحتوي 3 keyframes (sahar-bg, sahar-ink, sahar-accent)
- [ ] `platform/assets/js/ux/ritual.js` موجود ويُصدِّر `maybePlaySahar`
- [ ] `index.html` body يحتوي `data-sahar-experiment="on"`
- [ ] flag يحترم `prefers-reduced-motion: reduce`
- [ ] flag يحترم اختيار theme سابق في localStorage
- [ ] flag يحترم `sessionStorage` (يُشغَّل مرة واحدة per session)
- [ ] event `upg:sahar:complete` يُطلَق بعد الانتهاء
- [ ] لا تكسير لـ Mawj/Layl يدوياً بعد انتهاء الـ ritual
- [ ] grep: `grep -c 'sahar' platform/assets/css/tokens/_motion.css` ≥ 4
- [ ] commit: `γ3: Sahar pre-dawn ritual — verified: keyframes=3, ritual_module=true, sessionFlag=true`

---

## ملاحظة فلسفية أخيرة

Sahar ليس "wow effect". هو **ritual** — احتفاء بلحظة البداية.
لو المستخدم لا يحبه، flag يطفئه فوراً. هذا احترام.
لو يحبه، يصبح علامة فارقة لمنصة Upgrade لا تتكرر في أي مكان آخر.

— نهاية γ3 —
