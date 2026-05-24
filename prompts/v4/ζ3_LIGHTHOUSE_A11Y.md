# ζ3 — Lighthouse + Accessibility Pass
> **Pillar ζ / Stage 3 of 5**
> الهدف: Lighthouse mobile ≥ 92 (perf + best practices) و a11y ≥ 96.

---

## السياق

ÊLAN مبني على عوالم بصرية غنية لكن لا يجب أن تَكلّف الأداء أو إمكانية الوصول. ζ3 يُجري سلسلة فحوصات عملية.

---

## التنفيذ

### ١. تجهيز الـ smoke environment
```bash
# Local server بدون cache (test against final build)
cd platform && python3 -m http.server 8000 --bind 127.0.0.1

# في terminal آخر، شغّل lighthouse عبر CLI
npx lighthouse http://127.0.0.1:8000 \
  --preset=mobile \
  --output=html \
  --output-path=/tmp/elan-lh.html \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,pwa,seo
```

### ٢. Performance fixes (مرتَّبة بأهمية)
- [ ] **Preload critical fonts** (β1 fonts) في `<head>`:
  ```html
  <link rel="preload" href="/platform/assets/fonts/markazi-text/markazi-text-VF.woff2"
        as="font" type="font/woff2" crossorigin>
  ```
- [ ] **Defer non-critical JS** (already ESM module = defer by default ✓)
- [ ] **Inline critical CSS** للـ above-the-fold فقط (≤ 14KB)
- [ ] **Image lazy-load** (لو وُجدت)
- [ ] **Optimize sprite sizes**: `lucide-sprite.svg` و `phosphor-sprite.svg` ≤ 60KB total
- [ ] **Remove unused CSS** عبر `npx purgecss --css ... --content ...`

### ٣. Accessibility checklist
- [ ] كل button له `aria-label` لو ما يحتوي text
- [ ] focus visible: `:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }`
- [ ] heading hierarchy صحيحة (h1 → h2 → h3, لا skip)
- [ ] color contrast ratio ≥ 4.5:1 لكل عالم (test كل 8 worlds)
- [ ] `<svg>` icons لها `aria-hidden="true"` أو `role="img" aria-label="..."` (تم في α4)
- [ ] keyboard navigation works: tab order logical في sidebar + bottom-nav + cmdk
- [ ] skip-to-main-content link مع `:focus` يَكشفه
- [ ] `prefers-reduced-motion` تَعمل (δ6)
- [ ] `prefers-color-scheme` يَتأكد من اختيار العالم المناسب
- [ ] form inputs لها `<label>` صحيح
- [ ] modal/sheet trap focus (focustrap.js)

### ٤. Best practices
- [ ] HTTPS (PWA requirement) — يُتحقَّق في ζ4
- [ ] Console errors == 0 (test كل صفحة)
- [ ] No deprecated APIs

### ٥. Generate the report
```bash
# Output goes to state/LIGHTHOUSE_REPORT.md (summary)
{
  echo "# Lighthouse Report — $(date +%Y-%m-%d)"
  echo
  echo "## Mobile"
  echo "- Performance: <PCT>"
  echo "- Accessibility: <PCT>"
  echo "- Best Practices: <PCT>"
  echo "- PWA: <PCT>"
  echo
  echo "## Issues remaining"
  echo "..."
} > state/LIGHTHOUSE_REPORT.md
```

---

## Acceptance Criteria

- [ ] Lighthouse Mobile Performance ≥ 92
- [ ] Lighthouse Mobile Accessibility ≥ 96
- [ ] Lighthouse Best Practices ≥ 95
- [ ] Console errors == 0 across 16 pages
- [ ] Color contrast ≥ 4.5:1 on each world (8 verified)
- [ ] Keyboard nav works on sidebar + bottom-nav + cmdk + modals
- [ ] `state/LIGHTHOUSE_REPORT.md` exists with verified scores
- [ ] commit: `ζ3: Lighthouse Pass — verified: perf=<X>, a11y=<Y>, bp=<Z>, console_errors=0`
- [ ] No beacon

— نهاية ζ3 —
