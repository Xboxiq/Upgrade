# ε3 — Content Revival: fieldsales
> **Pillar ε / Stage 3 of 12** — العالم: حَديد (Hadeed)

---

## 🎨 Creativity Beacon

**Type:** 🤚 INTERACTION_BEACON
**The Surprise:** خرائط الجولات (route planning) ليست Google Maps embed. هي **canvas مرسوم يدوياً** يَعرض نقاط الزبائن كـ pins. المستخدم يَستطيع **رسم خط الجولة بإصبعه/بفأرته** على الـ canvas — كل نقطة تُضاف للترتيب. الـ canvas يحسب المسافة الإجمالية + الوقت المتوقَّع. لا dependency على API خارجي. Brutalist كأنه planning sheet ورقي.

**Reference Avoided:** Google Maps embed cliché
**Inspired-by:** #2 Brutalist Iraqi modernism + paper field maps
**Originality Self-Score:** 5/5

---

## المحتوى (8 وحدات)

1. **التخطيط اليومي للجولة** — قاعدة الـ 8 زبائن
2. **بناء قاعدة العملاء (KAM)** — 5 محاور
3. **عرض المنتج في موقع الزبون** — Sales kit أساسي
4. **التعامل مع المنافس في نفس البلوك**
5. **الإغلاق في الموقع** — 3 تقنيات
6. **التحصيل الذكي** — لو الزبون متأخر
7. **تقرير الجولة بـ 90 ثانية** — template مختصر
8. **تخطيط الأسبوع القادم بناء على نتائج اليوم**

### 🇮🇶 Iraq Block
> "في بغداد، الجولة الميدانية الأكثر فعالية تبدأ 9:30 صباحاً (بعد نشاط محلات الجملة). تجنّب 12-2 ظهراً (ذروة الازدحام، انخفاض جاهزية الزبون)." — تحليل ميداني FMCG العراق 2024

---

## التنفيذ

### ١. CSS
```css
[data-world="hadeed"] .route-canvas {
  display: block;
  inline-size: 100%;
  block-size: 480px;
  background: var(--anchor-bg);
  border: 2px solid var(--line-strong);
  border-radius: var(--r-1);
  cursor: crosshair;
  touch-action: none;
}

[data-world="hadeed"] .route-meta {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--s-3);
  margin-block-start: var(--s-3);
}

[data-world="hadeed"] .route-meta__cell {
  padding: var(--s-3);
  background: var(--anchor-1);
  border: 1px solid var(--line);
  border-block-end: 3px solid var(--ember);
}

[data-world="hadeed"] .route-meta__value {
  font-family: var(--voice-num-tabular);
  font-size: var(--fs-2xl);
  font-weight: 800;
}
```

### ٢. JS — `pages/fieldsales.js`
```javascript
/* Route canvas — pure 2D, no external maps */

export function initRouteCanvas(canvas, customers) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  function resize() {
    const r = canvas.getBoundingClientRect();
    canvas.width = r.width * dpr; canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    draw();
  }

  let path = [];

  function draw() {
    const r = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);

    // Grid (paper feel)
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < r.width; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, r.height); ctx.stroke(); }
    for (let y = 0; y < r.height; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(r.width, y); ctx.stroke(); }

    // Customers
    customers.forEach(c => {
      ctx.fillStyle = path.includes(c.id) ? '#FF4444' : '#FFFFFF';
      ctx.beginPath(); ctx.arc(c.x, c.y, 6, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.font = '12px sans-serif'; ctx.fillText(c.name, c.x + 10, c.y + 4);
    });

    // Path lines
    if (path.length > 1) {
      ctx.strokeStyle = '#FF4444'; ctx.lineWidth = 2;
      ctx.beginPath();
      path.forEach((id, i) => {
        const c = customers.find(c => c.id === id); if (!c) return;
        if (i === 0) ctx.moveTo(c.x, c.y); else ctx.lineTo(c.x, c.y);
      });
      ctx.stroke();
    }
  }

  function pointToCustomer(x, y) {
    return customers.find(c => Math.hypot(c.x - x, c.y - y) < 16);
  }

  canvas.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    const c = pointToCustomer(e.clientX - r.left, e.clientY - r.top);
    if (c && !path.includes(c.id)) {
      path.push(c.id);
      updateMeta();
      draw();
    }
  });

  function updateMeta() {
    const distEl = document.querySelector('[data-route="distance"] .route-meta__value');
    const stopsEl = document.querySelector('[data-route="stops"] .route-meta__value');
    const timeEl = document.querySelector('[data-route="time"] .route-meta__value');
    let dist = 0;
    for (let i = 1; i < path.length; i++) {
      const a = customers.find(c => c.id === path[i-1]);
      const b = customers.find(c => c.id === path[i]);
      dist += Math.hypot(a.x-b.x, a.y-b.y);
    }
    if (distEl) distEl.textContent = `${(dist/40).toFixed(1)} كم`;
    if (stopsEl) stopsEl.textContent = path.length;
    if (timeEl) timeEl.textContent = `${Math.ceil(path.length * 18 + dist/40 * 6)} د`;
  }

  resize();
  window.addEventListener('resize', resize);

  return { reset: () => { path = []; updateMeta(); draw(); } };
}
```

---

## Acceptance Criteria

- [ ] 8 units with PROVE-IT
- [ ] Iraq Block
- [ ] Canvas-based route planner (no Google Maps, no external)
- [ ] Customer pins clickable, path drawn manually
- [ ] route-meta updates: distance, stops, time
- [ ] pure pointer events (works mouse + touch)
- [ ] icons: Phosphor target, compass-tool, mountains (لا emoji)
- [ ] commit: `ε3: Fieldsales revived — verified: canvas_route=on, units=8, no_external_maps=true, hadeed=on`
- [ ] Beacon recorded

— نهاية ε3 —
