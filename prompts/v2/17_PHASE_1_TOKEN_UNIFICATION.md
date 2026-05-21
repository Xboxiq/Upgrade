# 🔱 WORKER 17 — Phase 1/6 — Token Unification & CSS Foundation
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CREATIVE_REVOLUTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Cathedral v16 + W15 + W16.
> **الفلسفة:** *قبل أن نُلوِّن، نُنظِّف الجداريات. قبل أن نَبني، نَهدم القاعدة المتآكلة.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` | **REPLACE-IN-PLACE** لـ `:root` blocks (دمج 3→1) + **REPLACE** كل hex literal بـ `var(--*)` reference | تعديل أي قاعدة styling خاصة بـ component (.bento-tile, .qcalc, .nav-item ... كلها تبقى) |
| `index.html` | لا يُلمَس | أي تعديل |
| `app.js` | لا يُلمَس | أي تعديل |

**Sacred preserved في Phase 1:**
- جميع component classes تبقى تشتغل بنفس asset names (`--color-bg`, `--color-text`, `--shadow-1`, `--space-3` …).
- Backward-compat aliases تُحفظ لـ tokens كانت مستعملة في app.js.

---

## 🎯 الهدف

Phase 1 يحلّ **الفوضى الجذرية في الـ CSS variables** التي تراكمت عبر Workers 11-16. النتيجة:

1. **`:root` واحدة** (بدل 3) — single source of truth.
2. **5 ألوان Quiet Luxury** معرَّفة (لا تُفعَّل بصرياً حتى Phase 3 — هنا فقط declared).
3. **كل hex literal** في style.css → `var(--*)`.
4. **Token taxonomy موثَّق** بتعليق رأسي.
5. **Backward-compat aliases** لـ tokens قديمة كانت مستعملة في JS.

> Phase 1 لا يُغيّر شكل المنصة بصرياً. هذا phase architecture pure. القيم اللونية الجديدة تُعرَّف لكن لا تُربط بعد.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT
├─ Phase: 1/6 — Token Unification & CSS Foundation
├─ Estimated lines changed: ~280 (replacements + consolidations)
├─ Files to touch:
│   └─ platform/assets/style.css  (REPLACE-IN-PLACE :root + APPEND token taxonomy header)
├─ Sacred verify (BEFORE):
│   ├─ grep -c '<section class="page"' platform/index.html  → 14
│   ├─ grep -c "qcalc" platform/index.html                   → 391
│   ├─ grep -oE 'window\.Upg\.[a-zA-Z]+' platform/assets/app.js | sort -u | wc -l → 22
│   ├─ grep -cE '^:root\b' platform/assets/style.css         → 3 (we expect to find 3 :root blocks)
│   └─ grep -oE '#[0-9a-fA-F]{3,8}\b' platform/assets/style.css | wc -l  → ~80 hex literals
├─ Branch: NEW worker-17-creative-revolution from main
└─ No new APIs. No new assets. Pure architecture.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Audit الـ `:root` blocks الموجودة

افتح style.css، ابحث عن كل `^:root` و `[data-theme=...]` block:

```bash
grep -nE '^(:root|\[data-theme)' platform/assets/style.css
```

**النتيجة المتوقعة:** 3 blocks تقريباً:
- `:root` (W11 P1 — الأصل، tokens v13)
- `:root` (W12 P1 — typography + spatial overlay)
- `:root` (W14/W16 — Atelier glass + life + aura tokens)

أحياناً تكون مفصولة بأقسام أخرى — اقرأ السياق قبل الدمج.

### Step 2 — Token Taxonomy المنظَّمة الجديدة

استبدلهم جميعاً بـ `:root` واحدة منظَّمة بترتيب taxonomy صارم:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 1 — Unified Token Foundation
   Single source of truth. All previous v13/v14/v16 :root blocks merged.
   Hex literals retired in favor of named tokens.
   ════════════════════════════════════════════════════════════════ */

:root {

  /* ─── ① CORE PALETTE (Quiet Luxury — defined here, activated in Phase 3) ─── */
  --quiet-void:        #06070B;  /* Background fill */
  --quiet-slate:       #0D0F16;  /* Surfaces, cards, panels */
  --quiet-slate-2:     #11141D;  /* Slightly elevated surface */
  --quiet-gold:        #D4AF37;  /* Nebula Gold — accent ONLY */
  --quiet-gold-soft:   #B8962F;  /* Gold for hover/dim */
  --quiet-ivory:       #F3F4F6;  /* Premium text */
  --quiet-lochmara:    #6B7280;  /* Secondary text */
  --quiet-line:        #1A1D27;  /* Subtle dividers */

  /* Light theme variants — activated via [data-theme="light"] block below */
  --quiet-linen:       #F7F5F1;  /* Light bg */
  --quiet-linen-2:     #EDEAE4;  /* Light surface */
  --quiet-gold-dim:    #A88A2A;  /* Gold for light bg */
  --quiet-ink:         #0F1115;  /* Light primary text */
  --quiet-graphite:    #5A6270;  /* Light secondary text */

  /* ─── ② SEMANTIC COLOR TOKENS (Phase 3 will repoint these) ─── */
  /* For now: keep mapping to existing v16 values for visual stability */
  --color-bg:          var(--bg-deep,   #0E1220);   /* Phase 3 will set to var(--quiet-void) */
  --color-surface-1:   var(--bg-1,      #131826);
  --color-surface-2:   var(--bg-2,      #1A2032);
  --color-text:        var(--text-1,    #E2E8F4);
  --color-text-muted:  var(--text-2,    #A8B0C5);
  --color-text-faint:  var(--text-3,    #707A92);
  --color-border:      var(--border-1,  #232A3E);
  --color-tint:        var(--brand,     #66FCF1);   /* Per-page personality override */
  --color-brand:       var(--brand,     #66FCF1);

  /* ─── ③ TYPOGRAPHY TOKENS (Phase 4 will retire 6 of these) ─── */
  --font-wordmark:    'Aref Ruqaa', 'Reem Kufi', system-ui, serif;
  --font-hero:        'Reem Kufi', 'IBM Plex Arabic', system-ui, serif;
  --font-display:     'Reem Kufi', 'IBM Plex Arabic', system-ui, sans-serif;
  --font-text:        'Readex Pro', 'Tajawal', 'IBM Plex Arabic', 'Cairo', system-ui, sans-serif;
  --font-ui:          'Tajawal', 'Readex Pro', 'IBM Plex Arabic', 'Cairo', system-ui, sans-serif;
  --font-numeric:     'IBM Plex Arabic', 'JetBrains Mono', system-ui, monospace;
  --font-num-display: 'JetBrains Mono', 'IBM Plex Arabic', monospace;
  --font-latin:       'Inter', system-ui, sans-serif;
  --font-quote-literary: 'Fraunces', 'Aref Ruqaa', serif;
  --font-mono:        'JetBrains Mono', ui-monospace, monospace;

  /* ─── ④ TYPE SCALE (W15 P5 — preserved verbatim) ─── */
  --text-2xs:    0.6875rem;
  --text-xs:     0.75rem;
  --text-sm:     0.8438rem;
  --text-base:   1rem;
  --text-md:     1.125rem;
  --text-lg:     1.333rem;
  --text-xl:     1.777rem;
  --text-2xl:    2.369rem;
  --text-3xl:    3.157rem;
  --text-4xl:    4.209rem;
  --text-5xl:    5.61rem;
  --text-display: var(--text-3xl);
  --text-display-1: clamp(2.8rem, 5vw + 1rem, 4.5rem);
  --text-display-2: clamp(2.2rem, 4vw + 0.8rem, 3.6rem);

  /* ─── ⑤ LEADING / TRACKING (W15 P5) ─── */
  --leading-none:    1;
  --leading-tight:   1.2;
  --leading-snug:    1.4;
  --leading-normal:  1.6;
  --leading-relaxed: 1.75;
  --leading-loose:   1.85;
  --tracking-tightest: -0.04em;
  --tracking-tighter:  -0.025em;
  --tracking-tight:    -0.015em;
  --tracking-snug:     -0.005em;
  --tracking-normal:   0;
  --tracking-wide:     0.015em;
  --tracking-wider:    0.04em;
  --tracking-widest:   0.08em;

  /* ─── ⑥ SPACING — 4px baseline (W12 P1) ─── */
  --space-0:  0;
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.5rem;
  --space-6:  2rem;
  --space-7:  3rem;
  --space-8:  4rem;
  --space-9:  6rem;
  --space-10: 8rem;

  /* ─── ⑦ RADIUS / SHADOW / ELEVATION ─── */
  --radius-1: 0.25rem;
  --radius-2: 0.5rem;
  --radius-3: 0.75rem;
  --radius-4: 1rem;
  --radius-5: 1.5rem;
  --radius-pill: 999px;

  --shadow-1: 0 1px 2px color-mix(in oklch, var(--color-bg) 60%, transparent);
  --shadow-2: 0 4px 12px color-mix(in oklch, var(--color-bg) 65%, transparent);
  --shadow-3: 0 12px 32px color-mix(in oklch, var(--color-bg) 70%, transparent);
  --shadow-gold: 0 0 24px color-mix(in oklch, var(--quiet-gold) 25%, transparent);

  /* ─── ⑧ MOTION TOKENS (W12 P6 + W14 P5 — preserved) ─── */
  --ease-out:    cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in:     cubic-bezier(0.42, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  --ease-linear: linear;

  --duration-instant: 80ms;
  --duration-fast:    140ms;
  --duration-base:    240ms;
  --duration-slow:    380ms;
  --duration-slower:  560ms;
  --duration-slowest: 840ms;

  /* ─── ⑨ Z-INDEX SCALE ─── */
  --z-base:    0;
  --z-raised:  10;
  --z-sticky:  100;
  --z-overlay: 1000;
  --z-modal:   2000;
  --z-toast:   3000;
  --z-cmdk:    5000;

  /* ─── ⑩ MATERIAL TOKENS (W14 P1 — pruned from 4-tier to 3-tier in Phase 2) ─── */
  --glass-thin:    blur(8px) saturate(110%);
  --glass-regular: blur(16px) saturate(125%);
  --glass-chrome:  blur(20px) saturate(140%);   /* topbar/sidebar only */
  /* Note: --glass-thick from W14 P1 retired — too heavy, was 24/32px */

  /* ─── ⑪ BACKWARD-COMPAT ALIASES (preserve JS lookups) ─── */
  --bg-deep:    var(--color-bg);
  --bg-1:       var(--color-surface-1);
  --bg-2:       var(--color-surface-2);
  --text-1:     var(--color-text);
  --text-2:     var(--color-text-muted);
  --text-3:     var(--color-text-faint);
  --border-1:   var(--color-border);
  --brand:      var(--color-brand);
}
```

### Step 3 — Light Theme Block (Consolidated)

```css
/* ════════════════════════════════════════════════════════════════
   Light Theme — single block, no fragmentation
   ════════════════════════════════════════════════════════════════ */

[data-theme="light"] {
  --color-bg:          var(--quiet-linen);
  --color-surface-1:   var(--quiet-linen-2);
  --color-surface-2:   color-mix(in oklch, var(--quiet-linen-2) 70%, var(--quiet-ink) 30%);
  --color-text:        var(--quiet-ink);
  --color-text-muted:  var(--quiet-graphite);
  --color-text-faint:  color-mix(in oklch, var(--quiet-graphite) 70%, var(--quiet-linen));
  --color-border:      color-mix(in oklch, var(--quiet-graphite) 30%, transparent);
  --color-tint:        var(--quiet-gold-dim);
  --color-brand:       var(--quiet-gold-dim);
  --shadow-1: 0 1px 2px color-mix(in oklch, var(--quiet-graphite) 18%, transparent);
  --shadow-2: 0 4px 12px color-mix(in oklch, var(--quiet-graphite) 22%, transparent);
  --shadow-3: 0 12px 32px color-mix(in oklch, var(--quiet-graphite) 28%, transparent);
  --shadow-gold: 0 0 18px color-mix(in oklch, var(--quiet-gold-dim) 30%, transparent);
}
```

> ملاحظة: في Phase 3، الـ palette الفعلية للـ dark theme ستُحوَّل لـ `var(--quiet-void)` etc. هنا في Phase 1 نُعرِّف فقط ونُعدّ.

### Step 4 — Hex Literal Migration

ابحث عن كل hex في style.css **خارج** كتلة الـ tokens المعرَّفة:

```bash
grep -nE '#[0-9a-fA-F]{3,8}\b' platform/assets/style.css | grep -v '^\s*--'
```

**النتيجة المتوقعة:** ~60-80 instance خارج tokens.

**استراتيجية الـ replacement:**

| Hex pattern | استبدله بـ |
|---|---|
| `#0E1220`, `#06070B`, `#000` for bg | `var(--color-bg)` |
| `#131826`, `#1A2032` for surface | `var(--color-surface-1)` / `var(--color-surface-2)` |
| `#E2E8F4`, `#FFF`, `#FAFAFA` for text | `var(--color-text)` |
| `#A8B0C5`, `#9CA3AF` for muted text | `var(--color-text-muted)` |
| `#66FCF1`, `#4F46E5` (cyan/violet brand) | `var(--color-tint)` |
| `#D4AF37` (إن وُجد) | `var(--quiet-gold)` |
| `rgba(...)` غير nominal | `color-mix(in oklch, var(--*) X%, transparent)` |

**Idempotent rule:** لو hex داخل `--token-name: #...` keep it as-is — هذا token definition، ليس استخدام.

### Step 5 — Token Taxonomy Header Comment

في رأس style.css، أضف وثيقة:

```css
/* ════════════════════════════════════════════════════════════════
   STYLE.CSS — Pack v2 RESONANCE (post-Worker 17 Phase 1)
   ────────────────────────────────────────────────────────────────
   Token taxonomy:
     ① CORE PALETTE       — raw Quiet Luxury values (Phase 1)
     ② SEMANTIC COLOR     — usage-named (Phase 3 will repoint)
     ③ TYPOGRAPHY         — font stacks (Phase 4 will reduce)
     ④ TYPE SCALE         — Perfect-Fourth modular (W15 P5)
     ⑤ LEADING/TRACKING   — Reading rhythm (W15 P5)
     ⑥ SPACING            — 4px baseline (W12 P1)
     ⑦ RADIUS/SHADOW      — Surface chrome
     ⑧ MOTION             — Easings + durations (W12 P6 / W14 P5)
     ⑨ Z-INDEX            — Stacking scale
     ⑩ MATERIAL           — Glass tiers (W14 P1 / Phase 2 will prune)
     ⑪ BACKWARD-COMPAT    — Aliases for JS API consumers

   Single source of truth: :root + [data-theme="light"]. Component
   styles MUST consume tokens — never hex.
   ════════════════════════════════════════════════════════════════ */
```

### Step 6 — Validation

```bash
# 1. Single :root block
grep -cE '^:root\b' platform/assets/style.css
# expected: 1

# 2. Hex outside tokens
grep -E '#[0-9a-fA-F]{3,8}\b' platform/assets/style.css | grep -vE '^\s*--' | wc -l
# expected: 0 (or very small — only in @keyframes color stops if any)

# 3. Visual: zero regression — site should look IDENTICAL to pre-phase
# (Quiet Luxury palette declared but not yet activated. Phase 3 activates.)
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-zA-Z]+' platform/assets/app.js | sort -u | wc -l  # → 22
grep -c 'data-page-personality' platform/index.html   # → ≥15
grep -c 'prefers-reduced-motion' platform/assets/style.css  # → ≥47

grep -cE '^:root\b' platform/assets/style.css         # → 1
grep -c -- '--quiet-void' platform/assets/style.css   # → ≥1
grep -c -- '--quiet-gold' platform/assets/style.css   # → ≥1
grep -c -- 'var(--color-bg)' platform/assets/style.css  # → ≥30 (heavily used)

# Manual: open in browser → looks identical to pre-phase
# DevTools → no console errors
# Theme toggle (dark/light) — both work
```

---

## ✅ معايير القبول (Phase 1)

- [ ] `:root` واحدة فقط في style.css.
- [ ] 5 ألوان Quiet Luxury معرَّفة كـ `--quiet-*` tokens.
- [ ] Light theme block واحد متكامل.
- [ ] جميع hex literals خارج tokens → 0 (أو ≤ 5 in keyframes only).
- [ ] Token taxonomy header comment مُضاف.
- [ ] Backward-compat aliases (`--bg-deep`, `--text-1`, `--brand` …) محفوظة لـ JS.
- [ ] الموقع يبدو **متطابقاً 100%** بصرياً مع قبل phase 1.
- [ ] Theme toggle (dark/light) يشتغل.
- [ ] Console: 0 errors.
- [ ] Sacred grep counts (14/391/22/47) محفوظة.

---

## 📤 Commit + Push (2-push rule)

```bash
git checkout -b worker-17-creative-revolution main
# ... apply changes to style.css ...
git add platform/assets/style.css
git commit -m "phase 1 (creative): token unification — 3 :root blocks merged into 1, 5 Quiet Luxury palette tokens declared, all hex literals migrated to var() refs, taxonomy header comment, backward-compat aliases preserved"
# push immediately

# update state/PROGRESS.json + snapshot
git add state/PROGRESS.json state/snapshots/worker-17-phase-1.json
git commit -m "state: creative phase 1 committed and pushed"
# push immediately
```

— نهاية Phase 1.

🎵 **Resonance check:** هل أساس الـ CSS الآن نظيف وجاهز للثورة؟ نعم → انتقل لـ Phase 2.
