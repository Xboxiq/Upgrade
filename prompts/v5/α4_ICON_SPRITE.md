# α4 — ICON SPRITE

**Pillar:** α · **Stage:** 4 of 4 · **Pulse:** none

## Intent
The icon sprite + semantic map + `Upg.icons.use()` helper. After this stage, no markup in v5 ever inlines `<svg viewBox>` again — every icon is referenced by semantic key.

## Files
1. `platform-v5/assets/svg/icons.svg` — sprite document with `<symbol>` definitions for at least the **30 essential icons** (Lucide, sourced verbatim, ISC license preserved as a top-of-file comment).
2. `platform-v5/assets/svg/SEMANTIC_MAP.json` — map of `<group>.<key>` → `<icon-id>`.
3. `platform-v5/assets/js/icons.js` — IIFE that exposes `Upg.icons.use(semanticKey, options?) → SVGElement` and `Upg.icons.audit() → array of unmapped semantic keys`.

## The 30 essential icons (semantic groups)
- **navigation** (5): home, lab (flask-conical), centre (command), progress (trending-up), more (more-horizontal)
- **actions** (8): plus, pencil, trash-2, share-2, x, arrow-left, arrow-right, search
- **training** (8): clipboard-list, target, check-circle-2, lock, circle-dot, layers-2, sparkles, zap
- **states** (4): info, alert-triangle, alert-circle, check
- **theme** (3): sun, moon, monitor
- **chrome** (2): menu, panel-right-open

## Forensic targets
```
symbols-in-sprite            = grep -cE '<symbol id="icon-' platform-v5/assets/svg/icons.svg     # expect ≥ 30
hardcoded-fill-in-symbols    = grep -cE 'fill="#' platform-v5/assets/svg/icons.svg               # expect 0
hardcoded-stroke-in-symbols  = grep -cE 'stroke="#' platform-v5/assets/svg/icons.svg             # expect 0
currentcolor-stroke          = grep -c 'stroke="currentColor"' platform-v5/assets/svg/icons.svg  # expect ≥ 30
isc-license-comment          = grep -c 'Lucide ISC' platform-v5/assets/svg/icons.svg             # expect 1
semantic-keys-mapped         = jq 'paths(scalars) | length' platform-v5/assets/svg/SEMANTIC_MAP.json  # expect ≥ 30
```

## API contract
```js
Upg.icons.use('navigation.home')
// returns: an SVGElement ready to insert via .appendChild()
// markup form: <svg class="icon" aria-hidden="true"><use href="#icon-home"/></svg>

Upg.icons.use('navigation.home', { size: 'lg', label: 'الرئيسية' })
// adds: style="--icon-size: var(--icon-lg)" + role="img" + aria-label
// removes aria-hidden (since the icon now carries meaning)

Upg.icons.audit()
// returns: array of semantic keys present in the JSON map but NOT in the sprite
// expected at clean state: [] (empty)
```

## Banned in this stage
- More than 50 icons (overkill — start lean; γ–η stages add icons as needed).
- Any icon family besides Lucide (Phosphor lands later, only when an empty-state illustration first ships).
- Any inline `fill="#…"` / `stroke="#…"`.

## Commit
```
α4: icon sprite — verified: symbols=30 currentcolor_stroke=30 hardcoded_fills=0 mapped_keys=30
```

## Acceptance
- Sprite renders 30 icons under any browser.
- `Upg.icons.use('navigation.home')` returns valid SVGElement.
- `Upg.icons.audit()` returns `[]`.
- Every symbol stroke uses `currentColor`.
