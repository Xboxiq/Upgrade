# 🪞 WORKER 11 — Phase 2/7 — Lucide-style Icon System
> **اقرأ أولاً:** `prompts/11_WORKER_PLATFORM_FOUNDATION.md` (الفهرس).
> **متطلب مسبق:** Phase 1 منجز (tokens + bridge موجودة).
> **الفلسفة:** أيقونة واحدة، نمط واحد، مرجع واحد. بدل 200+ إيموجي + SVG عشوائي.

---

## 🎯 الهدف

بناء **نظام أيقونات احترافي** على نمط Lucide:
- SVG sprite واحد مخفي يحوي 80 symbol
- component `<i class="qi" data-icon="...">` مع تحقّن تلقائي
- استبدال الإيموجي في 4 مناطق UI حرجة: nav, page-headers, stat cards, buttons
- يتلوّن تلقائياً مع الثيم عبر `currentColor`

---

## 📋 PRE-FLIGHT لهذا الـ Phase

```
📋 PHASE 2 PRE-FLIGHT
├─ Phase: 2/7 — Lucide-style Icon System
├─ Estimated lines: ~900 (HTML sprite ~600 + CSS ~80 + JS ~70 + replacements ~150)
├─ Files to touch:
│   ├─ platform/index.html        (إضافة <svg id="icon-sprite"> + استبدالات)
│   ├─ platform/assets/style.css  (.qi utility + size variants + spin)
│   └─ platform/assets/app.js     (Upg.icons module + auto-mount + MutationObserver)
├─ Symbols to register: 80
├─ Replacement target: ≥ 350 emoji → .qi instances
└─ Deliverable: commit "phase 2: Lucide-style Icon System" + push.
```

---

## 🧱 خطوات التنفيذ بالتفصيل

### Step 1 — **SVG Sprite Skeleton** في `<body>`

موقع الإدراج: في `platform/index.html` مباشرة بعد `<body>` (قبل أي محتوى مرئي).

```html
<svg id="icon-sprite" aria-hidden="true" focusable="false"
     style="position:absolute;width:0;height:0;overflow:hidden" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Default attrs لكل symbol — تُورَث عبر <use> -->
  </defs>
  <!-- Symbols تُضاف هنا — ~80 symbol -->
</svg>
```

### Step 2 — **80 Symbol** (نسخها من Lucide بترخيص ISC، وهو يسمح بالتعديل والاستخدام)

**المرجع:** [lucide.dev](https://lucide.dev) — License: ISC. **انسخ paths فقط** (لا الـ wrapper) ضمن `<symbol>`.

> **مهم:** كل symbol بنفس البنية:
> ```html
> <symbol id="icon-NAME" viewBox="0 0 24 24" fill="none" stroke="currentColor"
>         stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
>   <!-- paths من lucide -->
> </symbol>
> ```

**القائمة الكاملة (80 أيقونة):**

#### مجموعة Navigation (21):
```
home, layout-dashboard, phone, briefcase, megaphone, flask-conical,
brain, heart-handshake, headphones, code, calculator, wrench,
user-tie, gauge, search, command, settings, log-out, sun, moon, monitor
```

#### مجموعة Actions (23):
```
plus, minus, x, check, copy, download, upload, share, refresh,
filter, sort, expand, collapse, edit, trash, save, eye, eye-off,
external-link, chevron-down, chevron-right, chevron-left, chevron-up
```

#### مجموعة Feedback (10):
```
info, alert-triangle, alert-circle, check-circle, x-circle,
help-circle, shield, lock, unlock, key
```

#### مجموعة Data (10):
```
trending-up, trending-down, bar-chart, line-chart, pie-chart,
percent, dollar-sign, hash, calendar, clock
```

#### مجموعة Media (7):
```
play, pause, mic, mic-off, volume-2, volume-x, image
```

#### مجموعة Social (7):
```
instagram, facebook, twitter, tiktok, linkedin, youtube, whatsapp
```

#### مجموعة Misc (10):
```
sparkles, target, flag, bookmark, star, zap, layers, grid, book-open, award
```

**ملاحظة:** اسم الـ symbol = اسم Lucide الـ kebab-case (مثل `chevron-down`).

### Step 3 — **CSS** للـ component `.qi`

موقع الإدراج: في `style.css` بعد bridge layer من Phase 1.

```css
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Icon Component (Worker 11 / Phase 2)
   ═══════════════════════════════════════════════════════════════ */
.qi {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  flex-shrink: 0;
  color: currentColor;
  line-height: 1;
}

.qi svg {
  width: 100%;
  height: 100%;
  display: block;
  fill: none;
  stroke: currentColor;
}

/* Size variants */
.qi-xs { font-size: 0.75rem;  }
.qi-sm { font-size: 0.875rem; }
.qi-md { font-size: 1.125rem; }
.qi-lg { font-size: 1.5rem;   }
.qi-xl { font-size: 2rem;     }
.qi-2xl{ font-size: 2.5rem;   }

/* States */
.qi-spin svg { animation: qi-spin 1s linear infinite; transform-origin: center; }
.qi-pulse    { animation: qi-pulse 2s ease-in-out infinite; }
.qi-bounce   { animation: qi-bounce 1s ease-in-out infinite; }

@keyframes qi-spin   { to { transform: rotate(360deg); } }
@keyframes qi-pulse  { 0%,100% { opacity:1; } 50% { opacity:.55; } }
@keyframes qi-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .qi-spin svg, .qi-pulse, .qi-bounce { animation: none; }
}

/* Inline icon-text gap (utility) */
.qi-row { display: inline-flex; align-items: center; gap: 0.5em; }
```

### Step 4 — **JS Auto-Mount** (`Upg.icons`)

```js
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Icon Auto-Mount (Worker 11 / Phase 2)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const render = (el) => {
    if (!el || el.__qiRendered) return;
    const name = el.dataset.icon;
    if (!name) return;
    if (!document.getElementById(`icon-${name}`)) {
      console.warn(`[Upg.icons] Missing symbol: icon-${name}`);
      return;
    }
    el.innerHTML = `<svg aria-hidden="true" focusable="false"><use href="#icon-${name}"/></svg>`;
    el.__qiRendered = true;
  };

  const renderAll = (root = document) => {
    root.querySelectorAll('.qi[data-icon]').forEach(render);
  };

  // Initial render
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderAll());
  } else {
    renderAll();
  }

  // Future additions
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue;
        if (n.classList?.contains('qi')) render(n);
        n.querySelectorAll && renderAll(n);
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  window.Upg = window.Upg || {};
  window.Upg.icons = { render, renderAll };
})();
```

### Step 5 — **استبدالات الإيموجي** (≥ 350 موضع)

أولوية استبدال (بهذا الترتيب):

#### 5.1 — Sidebar Nav (14 nav-item)
```html
<!-- قبل -->
<button class="nav-item" data-page="callcenter">📞 الكول سنتر</button>
<!-- بعد -->
<button class="nav-item" data-page="callcenter">
  <i class="qi qi-md" data-icon="phone"></i>
  <span>الكول سنتر</span>
</button>
```

**جدول mapping كامل لـ nav:**
| nav-item | icon |
|---|---|
| dashboard | layout-dashboard |
| callcenter | phone |
| fieldsales | briefcase |
| accountmgr | user-tie |
| social | megaphone |
| lab | flask-conical |
| psych | brain |
| eq | heart-handshake |
| customercare | headphones |
| programming | code |
| accounting | calculator |
| phonerepair | wrench |
| negotiation | gauge |
| hrmastery | briefcase |

#### 5.2 — Topbar (5 actions)
- 🔍 search → `<i class="qi" data-icon="search">`
- 🔔 bell (notifications) → `bell` (أضفه للـ sprite لو مش موجود)
- ⌘ command hint → `command`
- 🌙/☀️ theme toggle → موجود في Phase 1
- ⚙️ settings → `settings`

#### 5.3 — Page Headers (14 صفحة)
كل page-header الحالي يحوي إيموجي قبل العنوان. استبدلها بـ `.qi qi-2xl` بنفس الـ mapping أعلاه.

#### 5.4 — Stat Cards (~60 موضع)
كل بطاقة إحصاء `.stat-card` فيها إيموجي. استخدم mapping سياقي:
- 💰 → `dollar-sign`
- 📊 → `bar-chart`
- 📈 → `trending-up`
- ⏱️ → `clock`
- 🎯 → `target`
- ⭐ → `star`

#### 5.5 — Buttons (~100 موضع)
أي button يحوي إيموجي → استبدله. أمثلة:
- "🔄 إعادة تعيين" → `<i class="qi" data-icon="refresh"></i> إعادة تعيين`
- "💾 حفظ" → `save`
- "📋 نسخ" → `copy`
- "🗑️ حذف" → `trash`
- "✏️ تعديل" → `edit`
- "👁️ عرض" → `eye`
- "▶️ تشغيل" → `play`
- "⏸️ إيقاف" → `pause`

#### 5.6 — Section Eyebrows / Citations (~80 موضع)
- 🔬 → `flask-conical`
- 📚 → `book-open`
- 🇮🇶 → احتفظ به (له معنى ثقافي مباشر) أو استخدم `flag` كـ generic.
- ⚠️ → `alert-triangle`
- ✅ → `check-circle`
- ❌ → `x-circle`

### Step 6 — **استثناءات (احتفظ بهذه الإيموجي)**

- نصوص محتوى prose (شرح، quotes، examples) — لا تلمسها.
- Iraqi flag 🇮🇶 — احتفظ بها كبادج سياقي (لها وزن ثقافي).
- Sample messages في chat simulators (بعض الإيموجي جزء من السيناريو الواقعي).
- Test result emojis (مزاج meter, mood, scoring) — هي بحدّ ذاتها أداة UX.

### Step 7 — **استراتيجية تنفيذ آمنة**

نظراً لكمية الاستبدالات (~350)، **اشتغل بدفعات**:
1. Sidebar nav (14) — اختبر يدوياً.
2. Topbar (5) — اختبر.
3. Page headers (14) — اختبر.
4. Stat cards (~60) — اختبر.
5. Buttons (~100) — اختبر.
6. Citations / eyebrows (~80) — اختبر.
7. Misc (~80) — اختبر.

بعد كل دفعة: refresh الصفحة، تأكد لا breakage.

---

## ✅ Acceptance Criteria للـ Phase 2

- [ ] `<svg id="icon-sprite">` يحوي ≥ 80 symbol صحيحة.
- [ ] `grep -c '<i class="qi"' platform/index.html` ≥ 350.
- [ ] الـ 14 nav-item تستخدم `.qi`.
- [ ] الـ 14 page-header تستخدم `.qi qi-2xl`.
- [ ] الأيقونات تتلوّن مع الثيم (تحقّق من Light + Dark).
- [ ] لا warnings "Missing symbol" في console.
- [ ] الأيقونات تظهر بـ stroke 1.75px موحّد.
- [ ] الـ `.qi-spin` يعمل + يحترم `prefers-reduced-motion`.

---

## 🛡️ في نهاية الـ Phase

اطبع `CHECKPOINT` + `STATE_SNAPSHOT`، ثم:

```
1. commit  : "phase 2: Lucide-style Icon System (sprite + .qi + 350+ replacements)"
2. push    : worker-11-complete
3. state   : current.phase=2, completed_phases[+], snapshot file
4. push    : ثاني
```

**التالي:** `prompts/11_PHASE_3_ENTRY_GATEWAY.md`.

— نهاية Phase 2.
