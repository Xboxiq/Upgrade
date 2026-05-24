# ζ2 — !important Cap
> **Pillar ζ / Stage 2 of 5**
> الهدف: تخفيض `!important` من 276 إلى ≤ 20 — بإصلاح cascade، ليس بحذف عشوائي.

---

## السياق

α1 قاس 276 (88 في motion.css، 160 في pages.css، 22 في utilities.css). كل واحد علامة على cascade مكسور. ζ2 يُصلح الجذور.

---

## التنفيذ

### ١. Forensic scan
```bash
echo "=== !important per file ==="
grep -c '!important' platform/assets/css/*.css | sort -t: -k2 -n -r

echo "=== Categories ==="
echo "Motion-related:"
grep -nE 'animation.*!important|transition.*!important|transform.*!important' platform/assets/css/*.css | wc -l
echo "Reduced-motion overrides (legitimate):"
grep -nE 'prefers-reduced-motion' platform/assets/css/*.css -A 5 | grep '!important' | wc -l
echo "Color-related:"
grep -nE 'color:.*!important|background.*!important' platform/assets/css/*.css | wc -l
```

### ٢. Categorize each !important into 4 buckets:
- **Legitimate** (keep): inside `@media (prefers-reduced-motion)`, accessibility forced styles
- **Specificity hack** (fix): `.btn-primary { background: var(--ember) !important }` because `body.theme-x .btn { background: ... }` overrides — fix by adding @layer or by raising selector specificity
- **Order hack** (fix): `!important` because rule was added after another; fix by reordering or @layer
- **Mystery legacy** (investigate): no clear reason — git blame to find origin

### ٣. Use @layer for the win
```css
/* In tokens.css already declared */
@layer reset, tokens, base, utilities, components, themes, overrides;

/* Move worlds inside a layer with higher precedence than components */
@import url("./worlds/_hibr.css") layer(themes);
/* This eliminates need for !important when world wants to override component */
```

### ٤. Step-by-step removal
For each file, run:
```bash
file=platform/assets/css/motion.css
grep -n '!important' "$file" | while IFS=: read line content; do
  echo "Line $line: $content"
  # Manual: decide keep / remove / restructure
done
```

### ٥. After each batch removed:
```bash
# Verify visual: open each page, click around
# Run quick a11y check
# Confirm count went down
echo "=== !important after batch ==="
grep -c '!important' platform/assets/css/*.css | awk -F: '{s+=$2} END {print s}'
```

---

## Acceptance Criteria

- [ ] grep total `!important` ≤ 20
- [ ] motion.css ≤ 5 (only reduced-motion gates)
- [ ] pages.css ≤ 8
- [ ] tokens.css == 0 (no !important in tokens)
- [ ] worlds/* == 0
- [ ] @layer used to enforce world > component precedence
- [ ] لا تكسير visual في أي صفحة
- [ ] commit: `ζ2: !important Cap — verified: before=<N>, after=<M>, layer_strategy=on`
- [ ] No beacon

— نهاية ζ2 —
