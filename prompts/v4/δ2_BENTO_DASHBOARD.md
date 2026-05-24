# δ2 — Bento Dashboard
> **Pillar δ / Stage 2 of 6**
> الهدف: bento حقيقي ليس "مستطيلات بنفس padding". أحجام، ميول، ومحاور بصرية مختلفة.

---

## السياق

Worker 13 السابق ادّعى bento لكن أنتج 8 cards بـ 12px radius متشابهة. ÊLAN يبني bento فعلي:
- 5 sizes مختلفة (XS, S, M, L, XL)
- 3 محاور للترتيب (focal, supporting, marginalia)
- per-world overrides (نار يُعطي angles؛ ندى يُعطي soft curves)
- icons من Phosphor فقط (content-level)

---

## 🎨 Creativity Beacon

**Type:** 🏛 STRUCTURAL_BEACON
**The Surprise:** نظام bento يَستخدم **CSS `subgrid` مع container queries** لإعادة الترتيب التلقائي. لكن **الترتيب ليس حسب column count** — هو حسب **"أهمية الـ widget في وقت اليوم"** (data attribute `data-priority-morning`, `-evening`). في الصباح، widget التقدم اليومي يكبر؛ في المساء، widget الراحة يكبر. الـ AI يحسبه عبر `getHours()` ويعدّل `grid-area` ديناميكياً.
**Reference Avoided:** #7 bento grid مجرّد مستطيلات
**Inspired-by:** #4 Maqamat music notation (different beats at different hours)
**Originality Self-Score:** 5/5

---

## التنفيذ

### ١. CSS — `platform/assets/css/_bento.css`

```css
/* ÊLAN v4 — δ2 — Bento system */

.elan-bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: var(--s-4);
  container-type: inline-size;
  container-name: bento;
}

.bento-cell {
  background: var(--anchor-1);
  border: 1px solid var(--line);
  border-radius: var(--r-3);
  padding: var(--s-5);
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  position: relative;
  transition: transform var(--t-3) var(--ease-elan),
              border-color var(--t-2) var(--ease-elan);
}

.bento-cell:hover { border-color: var(--line-strong); }

/* Sizes */
.bento-xs { grid-column: span 3; grid-row: span 1; }
.bento-s  { grid-column: span 4; grid-row: span 1; }
.bento-m  { grid-column: span 6; grid-row: span 2; }
.bento-l  { grid-column: span 8; grid-row: span 2; }
.bento-xl { grid-column: span 12; grid-row: span 3; }

/* Focal (most important, larger type) */
.bento-cell[data-axis="focal"] {
  background: linear-gradient(135deg, var(--anchor-1), var(--anchor-2));
  border-color: var(--line-strong);
}

.bento-cell[data-axis="focal"] .bento-value {
  font-family: var(--voice-display);
  font-size: var(--fs-3xl);
  font-weight: 800;
  letter-spacing: var(--track-tight);
  color: var(--ink);
}

.bento-cell[data-axis="supporting"] .bento-value {
  font-family: var(--voice-display);
  font-size: var(--fs-2xl);
  font-weight: 700;
}

.bento-cell[data-axis="marginalia"] {
  background: transparent;
  border: 1px dashed var(--line);
}

.bento-cell[data-axis="marginalia"] .bento-value {
  font-family: var(--voice-numeric);
  font-size: var(--fs-lg);
  color: var(--ink-muted);
}

/* Per-world treatment */
[data-world="naar"] .bento-cell {
  border-radius: 0;
  border-width: 2px;
  background: var(--anchor-1);
  box-shadow: 4px 4px 0 var(--anchor-bg);
}

[data-world="nada"] .bento-cell {
  backdrop-filter: blur(8px) saturate(160%);
  border-radius: var(--r-4);
  background: linear-gradient(180deg, var(--anchor-1), var(--anchor-2));
}

[data-world="dhahab"] .bento-cell[data-axis="focal"] {
  border: 1px solid transparent;
  border-image: linear-gradient(135deg, var(--ember), color-mix(in oklch, var(--ember) 30%, transparent), var(--ember)) 1;
}

[data-world="tayyar"] .bento-cell {
  border: 1px solid color-mix(in oklch, var(--focus) 25%, transparent);
  background: linear-gradient(135deg, var(--anchor-1), var(--anchor-2));
}

/* Mobile: collapse to single column */
@container bento (max-width: 720px) {
  .bento-xs, .bento-s, .bento-m, .bento-l, .bento-xl {
    grid-column: span 12;
    grid-row: auto;
  }
}

@container bento (min-width: 720px) and (max-width: 1024px) {
  .bento-xs { grid-column: span 6; }
  .bento-s  { grid-column: span 6; }
  .bento-m  { grid-column: span 12; }
  .bento-l  { grid-column: span 12; }
  .bento-xl { grid-column: span 12; }
}

/* Hover lift (desktop only) */
@media (hover: hover) and (pointer: fine) {
  .bento-cell:hover { transform: translateY(-2px); }
}
```

### ٢. JS — `platform/assets/js/chrome/bento.js`

```javascript
/* ÊLAN v4 — δ2 — Time-aware bento */
import { icon } from '../core/icons.js';

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}

function applyTimeAwareSizes() {
  const tod = getTimeOfDay();
  document.body.dataset.timeOfDay = tod;

  document.querySelectorAll('.elan-bento').forEach(grid => {
    grid.querySelectorAll('.bento-cell[data-priority]').forEach(cell => {
      const priority = cell.dataset.priority;
      const list = priority.split(',').map(s => s.trim());
      const isImportantNow = list.includes(tod);

      if (isImportantNow) {
        cell.dataset.axis = 'focal';
        // Promote size: xs->s, s->m, m->l
        const sizeMap = { xs: 's', s: 'm', m: 'l', l: 'xl' };
        const currentSize = ['xs','s','m','l','xl'].find(s => cell.classList.contains(`bento-${s}`));
        if (currentSize && sizeMap[currentSize]) {
          cell.classList.remove(`bento-${currentSize}`);
          cell.classList.add(`bento-${sizeMap[currentSize]}`);
        }
      }
    });
  });
}

function buildHeader(cell) {
  if (cell.dataset.headerBuilt) return;
  const iconName = cell.dataset.icon;
  const title = cell.dataset.title || '';
  if (!iconName) return;

  const header = document.createElement('div');
  header.className = 'bento-header';
  header.style.cssText = 'display:flex;align-items:center;gap:var(--s-2);';

  const i = icon(iconName, { size: 'md', color: 'muted' });
  const span = document.createElement('span');
  span.className = 'v-eyebrow';
  span.textContent = title;

  header.append(i, span);
  cell.prepend(header);
  cell.dataset.headerBuilt = 'true';
}

function init() {
  document.querySelectorAll('.bento-cell[data-icon]').forEach(buildHeader);
  applyTimeAwareSizes();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.addEventListener('upg:world:change', () => {
  setTimeout(init, 50); // re-build for newly visible page
});

// Re-evaluate every 30 minutes
setInterval(applyTimeAwareSizes, 30 * 60 * 1000);
```

### ٣. تطبيق على dashboard.html

```html
<section class="page" id="page-dashboard" data-world="hibr">
  <div class="elan-bento">

    <div class="bento-cell bento-m"
         data-axis="focal"
         data-icon="trending-up"
         data-title="تقدُّم اليوم"
         data-priority="morning,afternoon">
      <div class="bento-value">73%</div>
      <p class="v-body-lead">3 وحدات أُنجزت من 4</p>
    </div>

    <div class="bento-cell bento-s"
         data-axis="supporting"
         data-icon="flame"
         data-title="السلسلة"
         data-priority="morning">
      <div class="bento-value">12</div>
      <p class="v-body">يوم متتالي</p>
    </div>

    <div class="bento-cell bento-s"
         data-axis="supporting"
         data-icon="trophy"
         data-title="إنجازات"
         data-priority="evening">
      <div class="bento-value">8</div>
      <p class="v-body">شارة هذا الأسبوع</p>
    </div>

    <div class="bento-cell bento-xs"
         data-axis="marginalia"
         data-icon="clock"
         data-title="المتبقي"
         data-priority="afternoon,evening">
      <div class="bento-value">2:47</div>
    </div>

    <!-- ... more cells ... -->
  </div>
</section>
```

---

## Acceptance Criteria

- [ ] `_bento.css` موجود مع 5 sizes + 3 axes
- [ ] `chrome/bento.js` يُغيّر الـ axes حسب وقت اليوم
- [ ] header يُحقن من JS بـ Phosphor icons (لا emoji)
- [ ] Container queries تعمل (test في mobile width)
- [ ] per-world overrides لـ naar (sharp), nada (blur), dhahab (gold border), tayyar (neon)
- [ ] grep: `grep -c '<svg viewBox' platform/assets/js/chrome/bento.js` == 0
- [ ] grep emoji في dashboard markup == 0
- [ ] commit: `δ2: Bento Dashboard — verified: sizes=5, axes=3, time_aware=true, phosphor_only=true`
- [ ] Beacon recorded

— نهاية δ2 —
