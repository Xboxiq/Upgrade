# 🎨 WORKER 01 — UI/UX Refinement: Quantum Leap v13 "Signature Edition"
> **متطلب مسبق:** MASTER PROMPT محمّل في السيشن.
> **هدف الـ Worker:** رفع الواجهة من "احترافية" إلى "بصمة فريدة لا تُنسى" — بحيث أي AI يراها يقول "It's perfect — مو شي تقليدي".

---

## 🎯 مهمتك في هذا الـ Worker

ترقية الـ Design System من `Quantum Leap v12.2` → `Quantum Leap v13 "Signature Edition"` بإضافة **5 طبقات بصرية مميزة** ما تجدها في القوالب التقليدية:

### الطبقة 1 — Aurora Mesh Background (خلفية ميش حية)
خلفية `radial-gradient` متعددة الطبقات تتحرك ببطء (24s loop) مع noise grain خفيف عبر `SVG <feTurbulence>` لإعطاء عمق "تناظري" — لا تبدو رقمية مسطحة.

### الطبقة 2 — Conic Halo on Hover (هالة مخروطية)
كل بطاقة عند hover تظهر حولها `conic-gradient` يدور حول حافتها (border-rotation effect) باستخدام `@property --angle` و `mask-composite: exclude`.

### الطبقة 3 — Magnetic Cursor Aura
عنصر `<div id="cursor-aura">` يتبع الفأرة بـ `requestAnimationFrame`, blur 60px, mix-blend-mode: screen، يلوّن المنطقة تحت المؤشر بلون يتغير حسب الـ context (sales=violet, programming=cyan, accounting=amber). يُعطّل تلقائياً على touch devices.

### الطبقة 4 — Living Numerals
كل رقم في `.call-card .num` يستخدم **CSS Counter Animation** عند ظهوره في viewport (`IntersectionObserver`) بـ ease-out cubic، مع `font-variant-numeric: tabular-nums` لاستقرار العرض.

### الطبقة 5 — Sectional Identity Tint
كل صفحة (sales, programming, ...) تأخذ "بصمة لون" خاصة تظهر فقط في:
- gradient الـ `page-header` السفلي
- لون الـ scrollbar
- توهج الـ topbar icon
- accent بطاقات الإحصاء
بحيث الانتقال بين الصفحات يحس "كأنك دخلت غرفة بإضاءة مختلفة".

---

## 📋 PRE-FLIGHT (نفّذها أولاً)

اطبع الـ Pre-flight check المعتمد في MASTER، ثم انتظر التأكيد.

---

## 🧱 المراحل

### Phase 1/4 — Foundation Tokens & Aurora Mesh
**Lines budget:** ~250

أضف بعد كتلة `:root { ... }` الموجودة كتلة جديدة `:root.v13 { ... }` تحوي:
- `--aurora-1`, `--aurora-2`, `--aurora-3`, `--aurora-4` (4 ألوان لمزج الميش)
- `--grain-opacity: 0.035`
- `--cursor-aura-blur: 60px`
- `--section-tint-sales: #8B5CF6`
- `--section-tint-callcenter: #06B6D4`
- `--section-tint-programming: #22D3EE`
- `--section-tint-accounting: #F59E0B`
- `--section-tint-social: #EC4899`
- `--section-tint-phonerepair: #10B981`
- `--section-tint-negotiation: #F97316`
- `--section-tint-hr: #EF4444`

ثم:
1. أضف `<svg id="grain-filter">` مخفي يحوي `<filter id="grainFilter">` بـ `<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/>` + `<feColorMatrix>` لتفتيحه.
2. عدّل `body::before` ليصبح طبقتين: gradient + noise overlay.
3. أنشئ `body::after` للـ Aurora Mesh (4 radial-gradients متحركة بـ keyframes مختلفة).

### Phase 2/4 — Conic Halo + Magnetic Cursor
**Lines budget:** ~300

1. سجّل `@property --halo-angle` (لو المتصفح يدعم — مع fallback graceful).
2. أضف utility class `.ql-halo` مع `::before` يستخدم conic-gradient + animation `haloRotate 6s linear infinite`.
3. أضف عنصر `<div id="cursor-aura"></div>` قبل إغلاق `</body>`.
4. أضف JS module في IIFE:
```js
(() => {
  if (matchMedia('(pointer: coarse)').matches) return; // disable on touch
  const aura = document.getElementById('cursor-aura');
  let tx=0, ty=0, x=0, y=0;
  document.addEventListener('mousemove', e => { tx=e.clientX; ty=e.clientY; });
  function loop(){
    x += (tx-x)*0.12; y += (ty-y)*0.12;
    aura.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(loop);
  }
  loop();
})();
```
5. اربط لون الـ aura بالـ `data-active-section` على `<body>` (يُحدَّث في `navigateTo`).

### Phase 3/4 — Living Numerals + Sectional Identity
**Lines budget:** ~280

1. أنشئ utility `[data-count-to]` على أي عنصر رقم.
2. JS observer ينشّط counter عند الدخول للـ viewport (مرة واحدة فقط — `unobserve` بعد التشغيل).
3. عدّل `navigateTo()` ليضيف `body.dataset.activeSection = pageId` + يحدّث متغير `--current-tint`.
4. أضف rules:
```css
body[data-active-section="callcenter"] { --current-tint: var(--section-tint-callcenter); }
/* ... لكل قسم ... */
.page.active .page-header::after {
  background: linear-gradient(90deg, transparent, var(--current-tint), transparent);
}
::-webkit-scrollbar-thumb { background: var(--current-tint); }
```

### Phase 4/4 — Polish & Print Mode
**Lines budget:** ~200

1. أضف `@media (prefers-reduced-motion: reduce)` لتعطيل كل الانيميشن (إجباري للـ a11y).
2. أضف `@media print` يحوّل الواجهة إلى وضع طباعة نظيف (إخفاء sidebar/topbar، تكبير الـ font، إلغاء الـ glass).
3. أضف `theme-switch transition` ناعم بـ View Transitions API لو متوفرة (مع fallback).
4. تحقق من contrast ratio لكل tint جديد (≥ 4.5:1 على الـ surface).

---

## ✅ Acceptance Criteria

- [ ] الواجهة تشتغل بدون أخطاء console.
- [ ] لا يوجد layout shift (CLS = 0).
- [ ] FPS ثابت 60 على المتصفح المحلي.
- [ ] العمل بدون إنترنت (لا يعتمد على CDN جديد).
- [ ] كل الـ animations تتعطل تلقائياً مع `prefers-reduced-motion`.
- [ ] كل صفحة لها بصمة لون مرئية واضحة.
- [ ] حجم الملف الإضافي ≤ 35 KB CSS + 8 KB JS.

---

## 🛡️ في نهاية كل Phase

اطبع `CHECKPOINT` + `STATE_SNAPSHOT` كما في MASTER (البند 5).
