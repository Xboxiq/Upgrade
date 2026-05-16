# 🪶 WORKER 12 — Phase 2/7 — Off-White Re-chisel (Linen-Bone Material)
> **يبني فوق:** Phase 1 (الـ tokens والـ spacing).
> **الفلسفة:** الـ off-white الحالي بارد و"مكتبي". نريده **دافئاً، طبقياً، بمزاج كتاب من Apple Park** — ليس أبيض ساطعاً، وليس بيج تجاري.

---

## 🎯 الهدف

1. **استبدال الـ palette** للوضع الفاتح بـ **Linen-Bone**: قاعدة كتّان دافئ + 5 طبقات ascending tonal بدل سطح واحد.
2. **إعادة تخصيص shadows الفاتحة**: tinted (azure-warm) بدل الرمادي الميت.
3. **حل مشكلة `!important`**: من 144 → ≤ 60 في هذا الـ phase (الباقي يُحلّ في Phase 7).
4. **توحيد الـ accent في الفاتح**: تحويل من cyan خفيف إلى **brand teal مُعمّق** (Apple-grade contrast).
5. **إضافة Tonal Elevation**: عند رفع surface، اللون لا يصبح "أفتح فقط" بل يميل قليلاً نحو الـ warm-azure (مثل Sonoma desktop).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT
├─ Phase: 2/7 — Off-White Re-chisel
├─ Estimated lines: ~480
├─ Files to touch:
│   ├─ platform/assets/style.css   (override Sovereign tokens for [data-theme="light"] + cleanup !important)
│   └─ (لا تغيير على JS أو HTML)
├─ Sections preserved: Worker 11 dark theme tokens — لا تُلمس.
├─ Cleanup target: !important من 144 → ≤ 60.
└─ Branch: continue worker-12-aurora.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — استبدال palette الفاتح بـ Linen-Bone

ابحث في `style.css` عن الكتلة `:root[data-theme="light"]` (السطر ~57)، واستبدلها بالكامل بـ:

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Linen-Bone Off-White (Worker 12 / Phase 2)
   Mood: Warm linen + bone. Not Stripe-cool, not bank-beige.
   Reference: macOS Sonoma desktop + Apple Park reading rooms.
   ═══════════════════════════════════════════════════════════════ */
:root[data-theme="light"],
html[data-theme="light"],
body[data-theme="light"] {
  /* Linen base — يميل نحو الكريمي الدافئ */
  --color-bg:           hsl(38 28% 96.5%);   /* linen */
  --color-surface-0:    hsl(40 38% 99.2%);   /* paper-fresh — أعلى طبقة */
  --color-surface-1:    hsl(38 28% 97.5%);   /* card */
  --color-surface-2:    hsl(36 22% 94.5%);   /* raised card */
  --color-surface-3:    hsl(34 18% 91%);     /* sunk well */

  /* Text ladder — كاكاو غامق دافئ بدل أسود */
  --color-text:         hsl(220 38% 11%);
  --color-text-muted:   hsl(220 18% 36%);
  --color-text-faint:   hsl(220 14% 54%);

  /* Borders — هايرلاين خفيف لا "خط شخصي" */
  --color-border:        hsl(36 16% 86%);
  --color-border-strong: hsl(36 18% 76%);

  /* Brand — teal أعمق للـ contrast على linen */
  --color-brand:        hsl(176 64% 34%);
  --color-brand-hover:  hsl(176 70% 28%);
  --color-brand-soft:   color-mix(in oklch, hsl(176 64% 34%) 9%, hsl(40 38% 99.2%));
  --color-brand-strong: hsl(176 70% 26%);

  /* Semantic — ضبط لـ light contrast */
  --color-success:      hsl(152 56% 32%);
  --color-warning:      hsl(34 92% 42%);
  --color-danger:       hsl(0 70% 46%);
  --color-info:         hsl(210 78% 42%);

  /* Tinted shadows — azure-warm، ليس رمادي ميت */
  --shadow-c-sm: 0 1px 2px hsl(220 30% 18% / 0.05),
                 0 1px 1px hsl(36 28% 35% / 0.04);
  --shadow-c-md: 0 4px 12px hsl(220 30% 18% / 0.08),
                 0 2px 4px hsl(36 28% 35% / 0.05);
  --shadow-c-lg: 0 14px 32px hsl(220 30% 18% / 0.10),
                 0 4px 10px hsl(36 28% 35% / 0.06);
  --shadow-c-xl: 0 28px 60px hsl(220 30% 18% / 0.13),
                 0 8px 20px hsl(36 28% 35% / 0.07);

  --ring: 0 0 0 3px color-mix(in oklch, var(--color-brand) 28%, transparent);

  color-scheme: light;
}
```

### Step 2 — Tonal Surface Function

أضف helper لاستعمال tonal elevation بدل تغيير اللون يدوياً:

```css
/* Tonal elevation — surface(N) = base mixed with brand tint warmth */
:root {
  --tonal-tint: hsl(36 28% 35%); /* warm azure-cocoa */
}
.elev-0 { background: var(--color-surface-0); }
.elev-1 { background: color-mix(in oklch, var(--color-surface-1) 96%, var(--tonal-tint) 4%); }
.elev-2 { background: color-mix(in oklch, var(--color-surface-2) 92%, var(--tonal-tint) 8%); }
.elev-3 { background: color-mix(in oklch, var(--color-surface-3) 88%, var(--tonal-tint) 12%); }

[data-theme="dark"] {
  --tonal-tint: hsl(176 100% 70%); /* في الداكن، الـ tint يكون من الـ brand */
}
[data-theme="dark"] .elev-1 { background: color-mix(in oklch, var(--color-surface-1) 95%, var(--tonal-tint) 5%); }
[data-theme="dark"] .elev-2 { background: color-mix(in oklch, var(--color-surface-2) 92%, var(--tonal-tint) 8%); }
[data-theme="dark"] .elev-3 { background: color-mix(in oklch, var(--color-surface-3) 90%, var(--tonal-tint) 10%); }
```

### Step 3 — حذف `!important` من قسم الفاتح القديم

ابحث في `style.css` عن السطور التي تحتوي `body[data-theme="light"]` أو `[data-theme="light"]` تتبع بـ `!important`. للقواعد:

- `color: ... !important;` → احذف وغيّر القيمة لـ `var(--color-text)` أو المناسب.
- `background: ... !important;` → احذف، استعمل `var(--color-surface-X)`.
- `border: ... !important;` → احذف، استعمل `var(--color-border)`.

**استراتيجية الحذف الآمنة:**

```bash
# قبل البدء
grep -n '!important' platform/assets/style.css | wc -l   # سجّل العدد

# بعد كل دفعة استبدال (~20 مرة)، شغّل:
grep -n '!important' platform/assets/style.css | wc -l   # تأكد إنه ينخفض
```

> **الحرج:** لو قاعدة قديمة تستهدف `body[data-theme="light"] .X { color: #fff !important; }`، استبدلها بـ:
> ```css
> body[data-theme="light"] .X { color: var(--color-text); }
> ```
> ولا تحذف الـ selector — فقط القيمة والـ `!important`.

### Step 4 — Hard-coded Gradients في Sidebar Badges

ابحث في `index.html` عن الـ badges مثل:
```html
<span class="nav-badge" style="background:linear-gradient(135deg,#22C55E,#0EA5E9);color:#fff;">KAM</span>
```

استبدلها بـ class semantic:
```html
<span class="nav-badge nav-badge--success">KAM</span>
```

ثم أضف في CSS:

```css
.nav-badge {
  display: inline-flex;
  padding: 2px var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-2xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  line-height: 1.5;
  color: var(--color-bg);
  background: var(--color-brand);
}
.nav-badge--new      { background: linear-gradient(135deg, var(--color-info), var(--color-brand)); }
.nav-badge--success  { background: linear-gradient(135deg, var(--color-success), var(--color-info)); }
.nav-badge--warn     { background: linear-gradient(135deg, var(--color-warning), var(--color-danger)); }
.nav-badge--violet   { background: linear-gradient(135deg, hsl(265 70% 56%), hsl(210 90% 56%)); }
.nav-badge--pink     { background: linear-gradient(135deg, hsl(330 80% 56%), hsl(265 70% 56%)); }
.nav-badge--amber    { background: linear-gradient(135deg, var(--color-warning), var(--color-success)); }
.nav-badge--ember    { background: linear-gradient(135deg, var(--color-danger), var(--color-warning)); }
.nav-badge--teal     { background: linear-gradient(135deg, hsl(186 80% 45%), hsl(265 70% 56%)); }
.nav-badge--royal    { background: linear-gradient(135deg, hsl(265 80% 60%), hsl(330 80% 60%)); }

/* في الفاتح، اللون النصي على badge يميل للأبيض النقي */
[data-theme="light"] .nav-badge { color: hsl(40 60% 99%); }
```

### Step 5 — إصلاح `topbar` و `welcome-banner` الـ inline gradients

ابحث في `index.html` عن أي `style="background: linear-gradient(...)"` في الـ topbar / welcome banner / page-header، ونقلها لـ class مع tokens. مثال:

قبل:
```html
<div class="welcome-badge" style="background:linear-gradient(135deg,#FFD700,#FFA500);">
```
بعد:
```html
<div class="welcome-badge welcome-badge--gold">
```

CSS:
```css
.welcome-badge--gold {
  background: linear-gradient(135deg,
    color-mix(in oklch, var(--color-warning) 80%, white 10%),
    var(--color-warning));
}
```

> **معيار:** كل `style="background: linear-gradient(...)"` يجب أن يختفي. كل `style="color: #XXX"` يجب أن يستعمل token.

---

## 🎨 ملاحظة فلسفية للمنفّذ

ابتعد عن إغراء "إضافة tint كثير". الـ Linen-Bone يعمل لأنه **هادئ**. كل ما يضاف من تباين يجب أن يكون مبرّراً — لا تضف ظل أكثر من المطلوب، ولا حد أكثر من المطلوب. القاعدة: إذا حذفت العنصر هل تختل القراءة؟ لو لا → احذفه.

---

## ✅ Acceptance Criteria

- [ ] `:root[data-theme="light"]` يستخدم Linen-Bone (HSL 38° لا 40°).
- [ ] `--shadow-c-*` في الفاتح فيها tinted azure-warm، لا black.
- [ ] `grep -c '!important' platform/assets/style.css` انخفض إلى ≤ 60 (هدف مرحلي — Phase 7 يكمّل).
- [ ] كل nav-badge في sidebar يستخدم class، **صفر** inline gradient في الـ sidebar.
- [ ] `.elev-1`, `.elev-2`, `.elev-3` تعمل في الثيمين بلون warm tonal.
- [ ] الفاتح: لا يحس "بنكي بارد"، يحس "كتّاني دافئ" (تحقّق بصري).
- [ ] الـ contrast ratio بين `var(--color-text)` و `var(--color-bg)` ≥ 12:1 في الفاتح.
- [ ] الداكن لم يُلمس مطلقاً (نفس قيم Worker 11).

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 2 (aurora): linen-bone off-white re-chisel"
2. push    : worker-12-aurora → origin
3. update  : state/PROGRESS.json (phase=2)
4. snapshot: state/snapshots/worker-12-phase-2.json
5. commit  : "state: aurora phase 2 committed and pushed"
6. push    : ثاني push
```

**التالي:** `prompts/12_PHASE_3_MATERIALS_DEPTH.md`.

— نهاية Phase 2.
