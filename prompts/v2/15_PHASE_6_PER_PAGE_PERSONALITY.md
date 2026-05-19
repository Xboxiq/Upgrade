# 🎭 WORKER 15 — Phase 6/6 — Per-Page Type Personality
> **اقرأ أولاً:** `prompts/v2/15_WORKER_TYPOGRAPHY_SOUL.md` — Preservation Guard.
> **يبني فوق:** Phases 1-5.
> **الفلسفة:** *كل صفحة لها روح. الكول سنتر صارم. النفس أدبي. المحاسبة رياضية. السوشيال نابض. typography يعكس هذي الأرواح.*

---

## 🛡️ Preservation Contract (Phase 6)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** 14 قاعدة `.page--<id> [data-type-personality]` (cascade scoped) + `--type-page-*` tokens | تعديل قواعد typography من Phases 1-5 |
| `index.html` | **AUGMENT** كل page section بـ `data-page-personality="<id>"` على `<section class="page" id="page-<id>">` | تغيير IDs، حذف classes |
| `app.js` | **APPEND** IIFE جديد `Upg.type2` لتفعيل/تبديل personalities + observer للـ navigation | تعديل أي IIFE قائم |

**Sacred preserved:**
- 19 Upg.* APIs الموجودة لا تُلمَس. نضيف `Upg.type2` (20th).
- 15 identity tints لا تتغيّر.
- جميع voice tokens من Phases 1-5 لا تتغيّر.

---

## 🎯 الهدف

كل صفحة من الـ 14 تأخذ **type signature** فريدة بدون تكسير tokens موحَّدة. الفكرة: **subtle override** على نسب وأوزان معيّنة لتعكس روح الصفحة.

### Type Personalities للصفحات الـ 14

| الصفحة | الشخصية | المعاملة typographic |
|---|---|---|
| `dashboard` | **Elegant** — لوحة تحكم raja | Aref Ruqaa للـ greeting + Reem Kufi 700 للـ stats labels + tight tracking |
| `callcenter` | **Sharp** — صرامة الكول سنتر | Tajawal heavy للـ buttons + Reem Kufi 600 للـ headings + zero tracking |
| `fieldsales` | **Energetic** — حركة المبيعات الميدانية | Tajawal Black للـ CTAs + Cairo 700 للـ stats + slight wider tracking |
| `accountmgr` | **Executive** — ثقة الـ KAM | Reem Kufi 700 للـ headings + Inter 600 للـ Latin (KPIs) + tight rhythm |
| `social` | **Vibrant** — السوشيال ميديا | Tajawal 900 للـ engagement metrics + Aref Ruqaa للـ taglines + wider tracking |
| `lab` | **Experimental** — مختبر السيناريوهات | JetBrains Mono للـ scenario IDs + mono-display ribbon + technical tone |
| `psych` | **Literary** — صفحة علم النفس | Aref Ruqaa للـ wisdom blocks + Fraunces italic للـ Latin quotes + relaxed leading |
| `eq` | **Emotional** — الذكاء العاطفي | Aref Ruqaa hero + Readex Pro لـ body lead + soft tracking |
| `negotiation` | **Persuasive** — تفاوض | Reem Kufi 700 للـ headings + Tajawal 600 للـ tactics + tight rhythm |
| `customercare` | **Warm** — خدمة العملاء | Aref Ruqaa للـ empathy quotes + Readex 400 للـ scripts + relaxed tracking |
| `programming` | **Technical** — البرمجة | JetBrains Mono mono-emphatic + Inter للـ Latin terms + tabular nums |
| `accounting` | **Precise** — المحاسبة | IBM Plex Arabic للـ stats + Reem Kufi 600 للـ ledger headings + tabular lock |
| `phonerepair` | **Industrial** — صيانة الهاتف | Tajawal 700 للـ technical terms + JetBrains Mono للـ part numbers + zero tracking |
| `hrmastery` | **Formal** — مقابلات HR | Aref Ruqaa للـ ceremonial sections + Reem Kufi 700 للـ position titles + Inter للـ companies |
| `myprogress` | **Reflective** — تقدّمي الشخصي | Aref Ruqaa للـ milestone headers + Tajawal 500 للـ stats + relaxed leading |

---

## 📋 PRE-FLIGHT

```
📋 PHASE 6 PRE-FLIGHT
├─ Phase: 6/6 — Per-Page Personality (FINAL)
├─ Estimated lines: ~520
├─ Files to touch:
│   ├─ platform/index.html         (AUGMENT 14 section tags)
│   ├─ platform/assets/style.css   (APPEND ~380 lines)
│   └─ platform/assets/app.js      (APPEND ~120 lines — Upg.type2 IIFE)
├─ Sacred verify:
│   ├─ grep -c '<section class="page"'  → 14
│   ├─ grep -c 'qcalc'                   → 391
│   └─ Upg APIs count → ≥19
├─ Branch: continue worker-15-resonance
└─ Final phase of Worker 15 — opens PR after this.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Per-Page Type Tokens

في `style.css`، **APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Per-Page Type Personality Tokens
   (Worker 15 / Phase 6)
   كل صفحة تحدد override خفيف على tokens موجودة.
   ════════════════════════════════════════════════════════════════ */

/* Default fallback — لو page-personality غير محدَّد */
.page {
  --type-page-h1-family:   var(--type-voice-display);
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-tight);
  --type-page-h1-leading:  var(--leading-tight);

  --type-page-body-family: var(--type-voice-body);
  --type-page-body-weight: 400;

  --type-page-num-family:  var(--type-voice-numeric);
  --type-page-accent-vis:  0.05;  /* % of accent (Aref Ruqaa) usage */
}
```

### Step 2 — 14 Page Personalities

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   14 Page Personalities — type signatures.
   Each page section gets data-page-personality="<id>".
   ════════════════════════════════════════════════════════════════ */

/* 1. Dashboard — Elegant (Aref Ruqaa hero + Reem Kufi stats) */
.page[data-page-personality="dashboard"] {
  --type-page-h1-family:   var(--font-hero);          /* Aref Ruqaa */
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-snug);
  --type-page-h1-leading:  var(--leading-tight);
  --type-page-accent-vis:  0.10;
}

/* 2. Callcenter — Sharp (Tajawal heavy + Reem Kufi 600) */
.page[data-page-personality="callcenter"] {
  --type-page-h1-family:   var(--font-display);       /* Reem Kufi */
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-tight);
  --type-page-h1-leading:  var(--leading-tight);
  --type-page-body-weight: 500;
  --type-page-accent-vis:  0.02;
}
.page[data-page-personality="callcenter"] .type-button,
.page[data-page-personality="callcenter"] .ql-btn {
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
}

/* 3. Fieldsales — Energetic (Tajawal Black CTAs) */
.page[data-page-personality="fieldsales"] {
  --type-page-h1-family:   var(--font-display);
  --type-page-h1-weight:   800;
  --type-page-h1-tracking: var(--tracking-tighter);
  --type-page-accent-vis:  0.05;
}
.page[data-page-personality="fieldsales"] .type-button--lg,
.page[data-page-personality="fieldsales"] .ql-btn-primary {
  font-family: var(--font-ui);
  font-weight: 900;  /* Tajawal Heavy */
  letter-spacing: var(--tracking-wide);
}

/* 4. Accountmgr — Executive (Reem Kufi + Inter for KPIs) */
.page[data-page-personality="accountmgr"] {
  --type-page-h1-family:   var(--font-display);
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-tight);
  --type-page-accent-vis:  0.03;
}
.page[data-page-personality="accountmgr"] .type-num,
.page[data-page-personality="accountmgr"] [data-cath-stat] {
  font-family: var(--font-latin);  /* Inter for KPIs */
  font-weight: 600;
  font-feature-settings: "tnum" 1, "lnum" 1;
}

/* 5. Social — Vibrant (Tajawal 900 + Aref Ruqaa taglines) */
.page[data-page-personality="social"] {
  --type-page-h1-family:   var(--font-display);
  --type-page-h1-weight:   800;
  --type-page-h1-tracking: var(--tracking-tighter);
  --type-page-accent-vis:  0.12;
}
.page[data-page-personality="social"] .type-num-display,
.page[data-page-personality="social"] [data-countup] {
  font-family: var(--font-ui);
  font-weight: 900;
  letter-spacing: var(--tracking-tighter);
}

/* 6. Lab — Experimental (JetBrains Mono ribbons) */
.page[data-page-personality="lab"] {
  --type-page-h1-family:   var(--font-display);
  --type-page-h1-weight:   600;
  --type-page-h1-tracking: var(--tracking-snug);
  --type-page-accent-vis:  0.04;
}
.page[data-page-personality="lab"] .scenario-id,
.page[data-page-personality="lab"] .lab-badge {
  font-family: var(--font-mono);
  font-weight: 500;
  font-feature-settings: "tnum" 1, "calt" 1;
  letter-spacing: var(--tracking-wide);
}

/* 7. Psych — Literary (Aref Ruqaa wisdom + Fraunces) */
.page[data-page-personality="psych"] {
  --type-page-h1-family:   var(--font-hero);          /* Aref Ruqaa */
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-snug);
  --type-page-h1-leading:  var(--leading-relaxed);
  --type-page-body-family: var(--font-text);
  --type-page-accent-vis:  0.20;                       /* heavy literary */
}
.page[data-page-personality="psych"] blockquote,
.page[data-page-personality="psych"] .type-quote-block {
  font-family: var(--font-accent);                     /* Aref Ruqaa */
  line-height: var(--leading-loose);
}
.page[data-page-personality="psych"] [lang="en"] {
  font-family: var(--font-quote-literary);             /* Fraunces */
  font-style: italic;
}

/* 8. EQ — Emotional (Aref Ruqaa hero + soft body) */
.page[data-page-personality="eq"] {
  --type-page-h1-family:   var(--font-hero);
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-snug);
  --type-page-accent-vis:  0.15;
  --type-page-body-weight: 400;
}
.page[data-page-personality="eq"] .type-body-lead {
  font-style: normal;
  line-height: var(--leading-loose);
  letter-spacing: var(--tracking-snug);
}

/* 9. Negotiation — Persuasive (tight rhythm) */
.page[data-page-personality="negotiation"] {
  --type-page-h1-family:   var(--font-display);
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-tight);
  --type-page-accent-vis:  0.04;
}
.page[data-page-personality="negotiation"] .type-button {
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
}

/* 10. Customercare — Warm (Aref empathy quotes + relaxed) */
.page[data-page-personality="customercare"] {
  --type-page-h1-family:   var(--font-hero);
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-snug);
  --type-page-accent-vis:  0.12;
  --type-page-body-weight: 400;
}
.page[data-page-personality="customercare"] .type-body {
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-snug);
}

/* 11. Programming — Technical (mono-emphatic) */
.page[data-page-personality="programming"] {
  --type-page-h1-family:   var(--font-display);
  --type-page-h1-weight:   600;
  --type-page-h1-tracking: var(--tracking-snug);
  --type-page-accent-vis:  0.02;
}
.page[data-page-personality="programming"] [lang="en"],
.page[data-page-personality="programming"] .term-en {
  font-family: var(--font-latin);                      /* Inter */
  font-weight: 500;
}
.page[data-page-personality="programming"] code,
.page[data-page-personality="programming"] pre {
  font-family: var(--font-mono);                       /* JetBrains */
  font-feature-settings: "calt" 1, "liga" 1;
}

/* 12. Accounting — Precise (IBM Plex tabular lock) */
.page[data-page-personality="accounting"] {
  --type-page-h1-family:   var(--font-display);
  --type-page-h1-weight:   600;
  --type-page-h1-tracking: var(--tracking-tight);
  --type-page-accent-vis:  0.02;
  --type-page-num-family:  "IBM Plex Sans Arabic", monospace;
}
.page[data-page-personality="accounting"] .type-num,
.page[data-page-personality="accounting"] td.numeric,
.page[data-page-personality="accounting"] [data-cath-stat] {
  font-family: var(--type-page-num-family);
  font-feature-settings: "tnum" 1, "lnum" 1, "ss01" 1;
}

/* 13. Phonerepair — Industrial (Tajawal + JetBrains parts) */
.page[data-page-personality="phonerepair"] {
  --type-page-h1-family:   var(--font-display);
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-tight);
  --type-page-accent-vis:  0.02;
}
.page[data-page-personality="phonerepair"] .part-number,
.page[data-page-personality="phonerepair"] .ic-id,
.page[data-page-personality="phonerepair"] .model-code {
  font-family: var(--font-mono);
  font-weight: 500;
  font-feature-settings: "tnum" 1;
  letter-spacing: var(--tracking-normal);
}

/* 14. HRmastery — Formal (Aref ceremonial + Inter companies) */
.page[data-page-personality="hrmastery"] {
  --type-page-h1-family:   var(--font-hero);
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-snug);
  --type-page-accent-vis:  0.10;
}
.page[data-page-personality="hrmastery"] .company-name,
.page[data-page-personality="hrmastery"] [data-company] {
  font-family: var(--font-latin);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
}
.page[data-page-personality="hrmastery"] .position-title {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
}

/* 15. Myprogress — Reflective (Aref milestones + Tajawal stats) */
.page[data-page-personality="myprogress"] {
  --type-page-h1-family:   var(--font-hero);
  --type-page-h1-weight:   700;
  --type-page-h1-tracking: var(--tracking-snug);
  --type-page-h1-leading:  var(--leading-relaxed);
  --type-page-accent-vis:  0.18;
}
.page[data-page-personality="myprogress"] .milestone-title {
  font-family: var(--font-accent);                     /* Aref Ruqaa */
  font-weight: 700;
  line-height: var(--leading-loose);
}
.page[data-page-personality="myprogress"] [data-cath-stat] {
  font-family: var(--font-ui);                         /* Tajawal */
  font-weight: 500;
}
```

### Step 3 — Generic Page-Personality Bindings

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Generic bindings — apply page-personality tokens to elements.
   ════════════════════════════════════════════════════════════════ */

/* Page H1 inherits page-personality h1 family/weight/tracking/leading */
.page[data-page-personality] .page-h h1,
.page[data-page-personality] .type-display,
.page[data-page-personality] h1 {
  font-family: var(--type-page-h1-family);
  font-weight: var(--type-page-h1-weight);
  letter-spacing: var(--type-page-h1-tracking);
  line-height: var(--type-page-h1-leading);
}

/* Page body inherits */
.page[data-page-personality] .type-body,
.page[data-page-personality] .u-prose,
.page[data-page-personality] p {
  font-family: var(--type-page-body-family, var(--type-voice-body));
  font-weight: var(--type-page-body-weight, 400);
}

/* Page numerics inherit */
.page[data-page-personality] .type-num,
.page[data-page-personality] .type-num-tabular {
  font-family: var(--type-page-num-family, var(--type-voice-numeric));
}

/* Aref Ruqaa visibility per page (controls accent usage rate) */
.page[data-page-personality] .type-eyebrow,
.page[data-page-personality] .type-signature,
.page[data-page-personality] .type-ribbon {
  /* opacity scales subtly based on page-accent-vis token */
  /* (visual cue — not enforced) */
}
```

### Step 4 — AUGMENT في index.html (14 pages)

ابحث عن كل `<section class="page" id="page-XXX">` (14 instance). AUGMENT بإضافة `data-page-personality`:

```html
<!-- قبل: -->
<section class="page" id="page-dashboard">...</section>

<!-- بعد: -->
<section class="page" id="page-dashboard" data-page-personality="dashboard">...</section>
```

كرر للـ 14 صفحة بالقيم المطابقة لـ ID:
- `page-dashboard` → `data-page-personality="dashboard"`
- `page-callcenter` → `data-page-personality="callcenter"`
- `page-fieldsales` → `data-page-personality="fieldsales"`
- `page-accountmgr` → `data-page-personality="accountmgr"`
- `page-social` → `data-page-personality="social"`
- `page-lab` → `data-page-personality="lab"`
- `page-psych` → `data-page-personality="psych"`
- `page-eq` → `data-page-personality="eq"`
- `page-negotiation` → `data-page-personality="negotiation"`
- `page-customercare` → `data-page-personality="customercare"`
- `page-programming` → `data-page-personality="programming"`
- `page-accounting` → `data-page-personality="accounting"`
- `page-phonerepair` → `data-page-personality="phonerepair"`
- `page-hrmastery` → `data-page-personality="hrmastery"`
- `page-myprogress` → `data-page-personality="myprogress"`

> **ملاحظة:** هذي 15 صفحة (مع myprogress). تحقّق من العدد بـ `grep -c 'data-page-personality'` يجب يكون 15.

### Step 5 — `Upg.type2` IIFE (إضافة API)

في `app.js`، **APPEND** بعد آخر IIFE موجود:

```javascript
/* ============================================================
   RESONANCE v2 — Type Personality API (Worker 15 / Phase 6)
   Public API: window.Upg.type2.{ get, set, list, observe }
   - get(): returns current page's personality string
   - set(name): manually override personality on current section
   - list(): returns all 15 personality names
   - observe(): auto-detects on navigation, fires upg:type:change event
   ============================================================ */
(() => {
  'use strict';

  const PERSONALITIES = [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery', 'myprogress'
  ];

  const list = () => PERSONALITIES.slice();

  const getCurrentPage = () => {
    // Find the active page section
    const active = document.querySelector('.page.active, .page[aria-current="page"], .page:not([hidden])');
    return active || document.querySelector('.page');
  };

  const get = () => {
    const page = getCurrentPage();
    return page ? page.getAttribute('data-page-personality') : null;
  };

  const set = (name) => {
    if (!PERSONALITIES.includes(name)) {
      console.warn('[Upg.type2] Unknown personality:', name);
      return false;
    }
    const page = getCurrentPage();
    if (!page) return false;
    page.setAttribute('data-page-personality', name);
    document.dispatchEvent(new CustomEvent('upg:type:change', {
      detail: { personality: name, page: page.id }
    }));
    return true;
  };

  const observe = () => {
    // Detect navigation events and re-fire upg:type:change
    document.addEventListener('upg:nav:change', () => {
      const current = get();
      if (current) {
        document.dispatchEvent(new CustomEvent('upg:type:change', {
          detail: { personality: current, page: getCurrentPage()?.id }
        }));
      }
    });
  };

  // Auto-init
  observe();

  // Expose API
  window.Upg = window.Upg || {};
  window.Upg.type2 = { get, set, list, observe };
})();
```

### Step 6 — Discipline Comment

في `style.css`، **APPEND** آخر شي:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 / Worker 15 — COMPLETE
   ─────────────────────────────────────────────────────────────
   9 voices × 14 page personalities × 5 weights = 630 type combinations.
   كل واحدة موزونة pedagogically لتعكس روح المحتوى.

   Discipline final reminder:
   1. لا تخلط personalities داخل صفحة واحدة.
   2. .page[data-page-personality="..."] هو الـ scope الوحيد للـ overrides.
   3. لا تضف personality جديدة إلا بعد تعديل Upg.type2.list().
   4. Aref Ruqaa percentages (--type-page-accent-vis) تذكير وليس enforcement.
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe (Final Worker 15)

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 15 (with myprogress)
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 20 (added type2)

# New augmentation
grep -c 'data-page-personality' platform/index.html   # → 15

# New tokens
grep -c '\-\-type-page-h1-family' platform/assets/style.css    # → ≥16 (1 default + 15 pages)
grep -c '\-\-type-page-accent-vis' platform/assets/style.css  # → ≥16

# 14 personality blocks
grep -c 'page-personality="dashboard"' platform/assets/style.css     # → ≥1
grep -c 'page-personality="psych"' platform/assets/style.css         # → ≥1
grep -c 'page-personality="programming"' platform/assets/style.css   # → ≥1

# Upg.type2 API
grep -c 'window.Upg.type2' platform/assets/app.js  # → ≥1
grep -c 'PERSONALITIES' platform/assets/app.js      # → ≥1

# Console: zero errors
# Visual: open each of 14 pages, observe subtle type shift
# - dashboard greeting in Aref Ruqaa (literary)
# - psych quotes in Aref Ruqaa with relaxed leading
# - accounting numbers in IBM Plex tabular
# - programming code in JetBrains Mono with ligatures
```

---

## ✅ معايير القبول (Phase 6 + Worker 15 FINAL)

- [ ] 15 page sections تحمل `data-page-personality="..."` (يشمل page-myprogress).
- [ ] 14 personality CSS blocks مكتوبة وتشتغل (myprogress الـ 15).
- [ ] `--type-page-*` tokens (4 tokens × 15 pages) معرَّفة.
- [ ] `Upg.type2` API معرَّف ويعمل: `Upg.type2.get()`, `set()`, `list()`, `observe()`.
- [ ] `upg:type:change` event firing عند navigation.
- [ ] 20 Upg.* APIs (كانت 19، أضيفت type2).
- [ ] جميع personalities فيها subtle visual shift عند التنقّل.
- [ ] لا regression بصري في الـ 14 صفحة.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push (Final)

```bash
git add platform/assets/style.css platform/index.html platform/assets/app.js
git commit -m "phase 6 (resonance): per-page type personality — 14 signatures + Upg.type2 API + per-page-accent-vis tokens"

# state commit + mark Worker 15 done
# update PROGRESS.json:
#   current.pack = "v2"
#   current.worker = "15"
#   current.phase = 6
#   current.status = "done"
#   completed_workers.push("15")
#   next_action = "Start Worker 16 — VITAL UI Phase 1"
git add state/PROGRESS.json state/snapshots/worker-15-phase-6.json
git commit -m "state: resonance phase 6 done — Worker 15 TYPOGRAPHY SOUL complete"
```

### Open PR

```bash
# AUTO_PILOT أو user يفتح:
# title: "feat: Worker 15 — TYPOGRAPHY SOUL RESONANCE (Pack v2)"
# branch: worker-15-resonance → main
# description: ملخص كل phase + tokens added + sacred preservation table + acceptance checklist
```

— نهاية Phase 6 + Worker 15.

🎵 **Resonance check:** كل صفحة من الـ 14 صار لها صوت typography مختلف، لكنها كلها تنتمي لنفس العائلة؟ نعم → **Worker 15 ينتهي مع PR**. التالي: Worker 16 — VITAL UI.

🔔 **Worker 15 — TYPOGRAPHY SOUL — COMPLETE**
   *كل صوت في موضعه. كل شخصية حاضرة. الكاتدرائية تحمل أصواتها الآن.*
