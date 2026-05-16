# 🎭 WORKER 14 — Phase 5/6 — Motion Choreography v2 (Magnetic Hover + Page Transitions + Stagger)
> **اقرأ أولاً:** `prompts/14_WORKER_ATELIER_LIQUID_GLASS.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 1+2+3+4.
> **الفلسفة:** الحركة الجيدة لا تُلاحَظ — تُحَسّ. الحركة الزائدة تُلاحَظ — تُزعِج.

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` | **APPEND** كتلة "Motion Choreography v2" — keyframes جديدة + utility classes (`.u-magnet`, `.u-reveal`, `.u-stagger-children`, `.page-fade-in`) | تعديل `--ease-*` tokens القائمة (W12/P6) — نضيف tokens جديدة فقط لو needed |
| `app.js` | **APPEND** IIFE: `Upg.choreo` (magnetic hover + IntersectionObserver reveal + stagger) + `Upg.transition` (wraps navigateTo بـ View Transitions) | تعديل `Upg.motion`, `Upg.countup`, `navigateTo` الموجودة |
| `index.html` | **AUGMENT**: إضافة `data-magnet`, `data-reveal`, `data-stagger` على عناصر مختارة | حذف عناصر، تغيير IDs |

**Sacred preserved:**
- `Upg.motion` — يبقى يعمل، نتكامل معه.
- `Upg.countup` — يبقى. Phase 5 يضيف فقط viewport-trigger إذا لم يكن موجوداً.
- `prefers-reduced-motion: reduce` — كل حركة جديدة تحترمه.

---

## 🎯 الهدف

5 طبقات حركة، كلها optional (تشتغل تلقائياً، لا تتطلب markup مخصص):

1. **Magnetic Hover** — العناصر بـ `data-magnet` تنجذب نحو الفأرة بـ 6px max (transform-based)، وتعود مع spring عند الخروج.

2. **List Stagger Reveal** — أي container بـ `data-stagger` ينتظر حتى يدخل viewport ثم يكشف أبناءه واحداً تلو الآخر بـ 60ms delay لكل عنصر.

3. **Card Reveal On Intersect** — عناصر بـ `data-reveal` تبدأ بـ `opacity: 0; translateY(12px)` وتنتقل لـ `opacity: 1; translateY(0)` عند دخول viewport.

4. **Page Transition Spring** — عند `navigateTo(pageId)`، الصفحة الحالية تنزلق opacity-fade + slight scale 0.98، الصفحة الجديدة تنزلق من scale 1.02 → 1 مع fade-in. مدة 360ms، spring easing.

5. **Count-up On Intersect** — `data-countup` (موجود من W12/P5) يصير trigger عند IntersectionObserver fires (قد يكون بالفعل، نتأكّد ونحسّن إن needed).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT
├─ Phase: 5/6 — Motion Choreography v2
├─ Estimated lines: ~520
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~180 lines)
│   ├─ platform/assets/app.js      (APPEND IIFE Upg.choreo ~220, Upg.transition ~80)
│   └─ platform/index.html         (AUGMENT ≤40 elements with data-magnet/data-reveal/data-stagger)
├─ Sacred verify:
│   ├─ All Upg.* APIs preserved (W11+W12+W13 + W14 P1-P4)
│   ├─ navigateTo not modified, only wrapped
│   └─ 14 page sections + 391 qcalc preserved
├─ Branch: continue worker-14-atelier
```

---

## 🧱 خطوات التنفيذ

### Step 1 — CSS الجديد

**APPEND**:

```css
/* ═══════════════════════════════════════════════════════════════
   ATELIER v16 — Motion Choreography v2 (Worker 14 / Phase 5)
   ═══════════════════════════════════════════════════════════════ */

/* Magnetic hover — base style; transform set inline via JS */
[data-magnet] {
  transition: transform 220ms var(--ease-decelerate, cubic-bezier(0, 0, 0.2, 1));
  will-change: transform;
}

/* Reveal on intersect */
[data-reveal] {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 480ms var(--ease-decelerate),
    transform 480ms var(--ease-decelerate);
}
[data-reveal].is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
[data-stagger] > * {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 380ms var(--ease-decelerate),
    transform 380ms var(--ease-decelerate);
  transition-delay: var(--stagger-delay, 0ms);
}
[data-stagger].is-staggered > * {
  opacity: 1;
  transform: translateY(0);
}

/* Page transition spring */
.page {
  transition:
    opacity 320ms var(--ease-emphasized, cubic-bezier(0.2, 0, 0, 1)),
    transform 320ms var(--ease-emphasized);
}
.page:not(.active) {
  opacity: 0;
  transform: scale(0.98);
  pointer-events: none;
  position: absolute;
  inset: 0;
  visibility: hidden;
}
.page.active {
  opacity: 1;
  transform: scale(1);
  visibility: visible;
}
.page.is-entering {
  animation: pageEnter 360ms var(--ease-spring, cubic-bezier(0.5, 1.5, 0.5, 1));
}
@keyframes pageEnter {
  from { opacity: 0; transform: scale(1.02) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* Cursor glow (refined from W12/P2) — optional layer */
.u-cursor-glow {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.u-cursor-glow::before {
  content: "";
  position: absolute;
  width: 240px; height: 240px;
  border-radius: 50%;
  background: radial-gradient(closest-side,
    color-mix(in oklch, var(--color-tint, var(--color-brand)) 14%, transparent),
    transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 180ms ease;
  left: var(--cx, 50%);
  top: var(--cy, 50%);
  z-index: -1;
}
.u-cursor-glow:hover::before { opacity: 1; }

/* Reduced motion respects everything */
@media (prefers-reduced-motion: reduce) {
  [data-magnet], [data-reveal], [data-stagger] > *,
  .page, .page.is-entering {
    transition: none !important;
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
  .u-cursor-glow::before { display: none; }
}
```

### Step 2 — JS: `Upg.choreo`

**APPEND**:

```javascript
/* ============================================================
   ATELIER v16 — Choreography Engine (Worker 14 / Phase 5)
   Public API: window.Upg.choreo.{ refresh, magnetize, reveal, stagger, cursorGlow }
   ============================================================ */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── 1) Magnetic hover ───────────────────────────────────
  const MAGNET_RANGE = 80;       // px — start influence
  const MAGNET_STRENGTH = 0.18;  // 0..1 — pull factor
  const magnetize = (el) => {
    if (reduced) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > MAGNET_RANGE) return;
      const factor = (1 - dist / MAGNET_RANGE) * MAGNET_STRENGTH;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  };

  // ─── 2) Reveal on intersect ──────────────────────────────
  const reveal = () => {
    if (!('IntersectionObserver' in window) || reduced) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  };

  // ─── 3) Stagger children ─────────────────────────────────
  const stagger = () => {
    if (!('IntersectionObserver' in window) || reduced) {
      document.querySelectorAll('[data-stagger]').forEach((el) => {
        el.classList.add('is-staggered');
        Array.from(el.children).forEach((c) => c.style.removeProperty('--stagger-delay'));
      });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const step = parseInt(e.target.dataset.staggerStep || '60', 10);
        Array.from(e.target.children).forEach((child, i) => {
          child.style.setProperty('--stagger-delay', `${i * step}ms`);
        });
        e.target.classList.add('is-staggered');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    document.querySelectorAll('[data-stagger]').forEach((el) => io.observe(el));
  };

  // ─── 4) Cursor glow ──────────────────────────────────────
  const cursorGlow = () => {
    if (reduced) return;
    document.addEventListener('mousemove', (e) => {
      const el = e.target.closest('.u-cursor-glow');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--cy', (e.clientY - r.top) + 'px');
    });
  };

  // ─── 5) Refresh — re-runs all observers (call after dynamic content) ──
  const refresh = () => {
    document.querySelectorAll('[data-magnet]:not([data-magnetized])').forEach((el) => {
      magnetize(el);
      el.dataset.magnetized = 'true';
    });
    reveal();
    stagger();
  };

  // Init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { refresh(); cursorGlow(); });
  } else {
    refresh(); cursorGlow();
  }

  window.Upg = window.Upg || {};
  window.Upg.choreo = { refresh, magnetize, reveal, stagger, cursorGlow };
})();
```

### Step 3 — JS: `Upg.transition` (page transition wrap)

**APPEND**:

```javascript
/* ============================================================
   ATELIER v16 — Page Transition Wrap (Worker 14 / Phase 5)
   Wraps navigateTo() with View Transitions API + spring fallback.
   Public API: window.Upg.transition.{ navigate, supports }
   ============================================================ */
(() => {
  'use strict';

  const supports = 'startViewTransition' in document;

  const animateClassic = (target) => {
    if (!target) return;
    target.classList.add('is-entering');
    target.addEventListener('animationend', () => {
      target.classList.remove('is-entering');
    }, { once: true });
  };

  const navigate = (pageId) => {
    if (typeof window.navigateTo !== 'function') return;
    const target = document.getElementById('page-' + pageId);

    if (supports && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => {
        window.navigateTo(pageId);
      }).finished.finally(() => {
        // refresh choreo on new page
        window.Upg?.choreo?.refresh && window.Upg.choreo.refresh();
      });
    } else {
      window.navigateTo(pageId);
      requestAnimationFrame(() => {
        const t = document.querySelector('.page.active');
        animateClassic(t);
        window.Upg?.choreo?.refresh && window.Upg.choreo.refresh();
      });
    }
  };

  // Hook all [data-page] clicks to use Upg.transition.navigate
  // (skip if onclick handler explicitly calls navigateTo — backward compat)
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-page]');
    if (!el) return;
    const page = el.dataset.page;
    if (!page || page === 'none') return;
    // If element has explicit onclick, let it run (legacy)
    if (el.hasAttribute('onclick')) return;
    e.preventDefault();
    navigate(page);
  });

  window.Upg = window.Upg || {};
  window.Upg.transition = { navigate, supports };
})();
```

### Step 4 — AUGMENT markup

أضف data-attributes على عناصر مختارة (عبر sed/script أو manual):

| Selector | Attribute | السبب |
|---|---|---|
| `.dock-btn` (×6) | `data-magnet` | تنجذب للماوس |
| `.bento-greet` | `data-reveal` | تكشف عند load |
| `.stat-tile` (×4) | `data-reveal` | كل واحد ينكشف |
| `.bento-skill, .bento-activity, .bento-challenge, .bento-heatmap` | `data-reveal` | تكشف عند scroll |
| `.cath-skill-grid` (existing) | `data-stagger="cards"` | أبناءه ينكشفون متتابعين |
| `.cath-activity-list` | `data-stagger="rows" data-stagger-step="40"` | rows أسرع |
| `.dock-row` | `data-stagger` data-stagger-step="80"` | dock buttons stagger |
| `.bento-greet, .stat-tile, .bento-skill, .bento-activity, .dock` | إضافة class `u-cursor-glow` لو مرغوب | hover glow optional |

> **ملاحظة:** يكفي إضافة الـ attributes على dashboard لأنه الأكثر زيارة. الصفحات الأخرى يمكن استكشاف حقن نفس الـ attributes في Phase 6 (final pass).

### Step 5 — Sanity grep

```bash
grep -c 'data-magnet' platform/index.html         # → ≥6
grep -c 'data-reveal' platform/index.html          # → ≥6
grep -c 'data-stagger' platform/index.html         # → ≥3
grep -c 'window.Upg.choreo' platform/assets/app.js # → 1
grep -c 'window.Upg.transition' platform/assets/app.js # → 1

# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
```

---

## ✅ معايير القبول (Phase 5)

- [ ] Hover على `.dock-btn` → الزر ينجذب نحو الماوس بـ ≤6px.
- [ ] أول دخول لـ dashboard → stat-tiles تنكشف stagger من اليمين-أعلى للشمال-أسفل.
- [ ] Scroll للأسفل → bento cells تنكشف عند الدخول للـ viewport.
- [ ] Click على nav-item → الصفحة الحالية تختفي بـ scale 0.98 + fade out، الجديدة تظهر بـ scale 1.02 → 1 + fade in (spring 360ms).
- [ ] Reduced motion → كل الحركات تتعطّل (instant transitions).
- [ ] View Transitions API يستعمل لو supported (Chrome 111+).
- [ ] Console: 0 errors.
- [ ] جميع APIs السابقة preserved.

---

## 📤 Commit + Push

```bash
git add platform/index.html platform/assets/style.css platform/assets/app.js
git commit -m "phase 5 (atelier): motion choreography v2 — magnetic hover + reveal + stagger + page transition spring + Upg.choreo + Upg.transition"
# push

git add state/PROGRESS.json state/snapshots/worker-14-phase-5.json
git commit -m "state: atelier phase 5 committed and pushed"
# push
```

— نهاية Phase 5.
