# δ1 — BENTO GRID

**Pillar:** δ (bento live) · **Stage:** 1 of 3 · **Pulse:** **GLASS_PULSE**

## Intent
The first visible **content** layer of v5. A responsive bento grid lands on the canvas, hosting 8 placeholder cards (sized in three masses: `b-4x3 focal`, `b-2x2 standard`, `b-1x1 metric`). Each card is a Glass 2.0 surface using `--surface-1` / `--line` / `--shadow-2` from the α3 token system.

## The Pulse — GLASS_PULSE
الـ bento cards شَرائح من سَطح زُجاجي واحد، لا تَيلز عائمة مَنفصِلة. كل بطاقة تَحمل `border-block-start: 1px solid var(--line)` فقط — الحَواف الأخرى غائبة. الـ grid-gap هو الفَراغ بين الشُّقوق. عند `:focus-within` أو `:hover`، الـ hairline يُضيء بـ Neon Cyan ليَكشِف "أين انتَهى الزُجاج".

**Reference avoided:** AI-default "every bento card is an island with 4 borders + drop-shadow."
**Inspired-by:** Wild Card #15 — Andalusian zellige door (لقاء البلاطات).

## Files
1. `platform-v5/assets/css/bento.css` — responsive grid + card surface + GLASS_PULSE rules
2. `platform-v5/index.html` — 8 sample cards in `<main class="canvas">`

## Forensic targets
- bento card selectors: ≥ 8
- container queries: ≥ 1
- 0 emoji, 0 hardcoded hex
- 0 inline `<svg viewBox>` in markup
- audit `v5_logical_props_audit.py` exit 0
