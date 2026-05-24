# ζ1 — Inline Style Purge (Truthful)
> **Pillar ζ (QUALITY GATE) / Stage 1 of 5**
> الهدف: نقل كل `style="..."` المتبقية إلى utilities أو tokens — بصدق، verified بـ grep.

---

## السياق

α1 forensic قاس 89 inline `style=` في index.html. الـ stages السابقة قد أضافت بعضها أو أزالت. ζ1 يُنهي القصة:
- يقيس الواقع الحالي
- يَنقل كل قابل للنقل إلى class utility
- يُبقي فقط style="" التي تحمل dynamic CSS variable (e.g. `--scrub-pct`, `--press-progress`)
- لا يدّعي رقماً لم يتحقَّق

---

## التنفيذ

### ١. Forensic scan (قبل أي تعديل)
```bash
echo "=== inline_count_before ==="
grep -c 'style=' platform/index.html

echo "=== sample of remaining inline styles ==="
grep -nE 'style="[^"]+"' platform/index.html | head -30

echo "=== inline with CSS variables (--var) — KEEP these ==="
grep -nE 'style="[^"]*--[a-z-]+:' platform/index.html | wc -l
```

### ٢. Categorization
لكل inline style موجود، صنّف في 1 من 4:
- **Movable** → utility class (e.g. `style="margin-top: 16px"` → `class="mt-4"`)
- **Tokenizable** → tokens (e.g. `style="color: #1a1a1a"` → `style="color: var(--ink)"`)
- **Dynamic** → keep (e.g. `style="--press-progress: 0.45"`)
- **Pre-existing legacy** → fix or document why kept

### ٣. Add utility classes if missing
في `tokens/_voice-utilities.css` أو ملف utilities جديد `tokens/_layout.css`:
```css
/* spacing */
.m-0  { margin: 0; }
.mt-1 { margin-top: var(--s-1); }
.mt-2 { margin-top: var(--s-2); }
.mt-3 { margin-top: var(--s-3); }
.mt-4 { margin-top: var(--s-4); }
.mt-6 { margin-top: var(--s-6); }
.mt-8 { margin-top: var(--s-8); }
/* ... mb, ml, mr, p* etc */

/* flex */
.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: var(--s-1); }
.gap-2 { gap: var(--s-2); }
.gap-3 { gap: var(--s-3); }
.gap-4 { gap: var(--s-4); }

/* visibility */
.hidden  { display: none; }
.invisible { visibility: hidden; }
.sr-only { position: absolute; inline-size: 1px; block-size: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

/* sizing */
.w-full { inline-size: 100%; }
.h-full { block-size: 100%; }
```

### ٤. Migration
عبر sed/script أو يدوياً (احرص على dynamic styles):
```bash
# DRY-RUN (احفظ pattern قبل التعديل)
grep -nE 'style="margin: ?[0-9]+px"' platform/index.html
# Replace one-by-one with grep verification each time
```

### ٥. Verify after
```bash
echo "=== inline_count_after ==="
grep -c 'style=' platform/index.html
# Target: ≤ 30 (only dynamic --var styles allowed)

echo "=== inline without --var (should be ZERO) ==="
grep -nE 'style="[^"]+"' platform/index.html | grep -v '\-\-' | wc -l
```

---

## Acceptance Criteria

- [ ] grep `style=` ≤ 30 (verified)
- [ ] grep `style=` بدون `--` == 0 (كل المتبقي dynamic CSS variable)
- [ ] لا hardcoded color/spacing in inline
- [ ] utilities جديدة في tokens/_layout.css
- [ ] لا تكسير لأي صفحة (visual sanity check on all 16)
- [ ] commit: `ζ1: Inline Purge — verified: before=<N>, after=<M>, kept_dynamic=<K>, hardcoded=0`
- [ ] No beacon (quality stage)

— نهاية ζ1 —
