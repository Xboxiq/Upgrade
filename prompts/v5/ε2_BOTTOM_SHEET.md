# ε2 — BOTTOM_SHEET (Pillar ε — DISCLOSURE, stage 2 of 3)

> *«على اللَمس، اللوحة لا تَأتي من الجَنب — تَصعَد من الأسفل، وتُدفَع للأسفل لتَرحَل. لكنها لا تَرحَل بسُهولة.»*
> Pulse intent: **SPRING_PULSE** (debut of the category in v5).

---

## 0. Where this sits

ε1 shipped the slide-over (inline-end panel + scrim + history). ε2 fulfils
SPATIAL_DOCTRINE §3.3: on `(max-width: 720px)` or any `(pointer: coarse)` device, the
**same** slide-over **becomes a bottom sheet** — anchored to the block-end edge, with a
drag handle, draggable down to dismiss with momentum. This is a CSS morph of the *same*
`#overlay-panel` DOM node (parallel to the γ2 dock morph), plus a JS drag engine. No new
overlay element; `Upg.overlay` is reused verbatim. The `#overlay-sheet` placeholder slot
from α2 is left reserved (the morph approach is the doctrine's "*the slide-over becomes a
bottom sheet*").

---

## 1. The doctrine guardrails

- **Same element, morph via media query** (SPATIAL §3.3). `.slide-over` re-anchors to
  `inset-block-end:0` + `inset-inline:0`, full width, `block-size: clamp(40vh,70vh,92vh)`,
  top corners rounded, hidden by `translateY(100%)`. Zero new DOM, zero JS layout branch.
- **Handle** — a 36×4px capsule at top-center, neutral ~40% opacity (SPATIAL §3.3),
  rendered as `.slide-over::after` (no extra markup, no icon).
- **User-summoned only.** Forbidden #23 forbids a sheet that opens on page load — the sheet
  only appears when `Upg.overlay` is opened by a user action (⌘K, dock-centre, trigger).
- **Motion via tokens.** Spring-back uses `--ease-spring` over `--duration-emerge`; exit
  uses the panel transition. Live drag has **no** transition (direct manipulation). No
  one-off `ms` strings.
- **Reduced motion.** The global sanctuary collapses spring-back to a snap; drag-to-dismiss
  still works (it is direct manipulation, not animation). MOTION §4 holds.
- **44×44 + safe-area.** Handle/header tap region ≥ 44px; the sheet honours
  `env(safe-area-inset-bottom)`.
- **RTL-safe.** The sheet is symmetric (`inset-inline:0`); the GLASS specular from ε1 is
  repositioned to the block-start edge (horizontal) for continuity. Zero physical left/right.
- **Logical properties only** (β3 audit must pass).

---

## 2. The Pulse — ⚡ SPRING_PULSE (the drawer that resists casual dismissal)

**Category:** SPRING_PULSE — first of its category in v5. PULSE_LIBRARY §1: *"a kinetic-
feedback surprise … the card that 'settles' on drop with a sub-bounce."*

**The surprise:** the sheet does not dismiss on any downward touch. It behaves like a
weighted drawer with elasticity:
1. **Velocity-aware momentum** — a quick *flick* down dismisses even from a shallow drag;
   a slow drag must cross 35% of the sheet's height before it will leave. Casual contact
   springs back; intent leaves.
2. **Spring-back overshoot** — released below threshold, the sheet returns to seated with a
   sub-bounce via `--ease-spring` (cubic-bezier(0.34,1.56,0.64,1)) — a felt *settle*, not a
   linear snap.
3. **Rubber-band over-pull** — dragging *up* past the seated position resists (×0.2, capped
   ~24px): you feel the ceiling.
4. **Scrim coupled to drag** — the canvas brightens continuously as the sheet is pulled
   down, so the dismissal is previewed the whole way, not toggled at the end.

**Reference avoided:** Forbidden #23 (a bottom sheet that opens automatically on load) — ours
is always user-summoned. Also the AI-default "drag-to-dismiss that linearly snaps the moment
your finger leaves, regardless of speed or distance."

**Inspired-by:** Wild Card #17 — A Nizari fortress's trick stairs (the path that subtly
slows intruders). The sheet subtly resists *accidental* dismissal: a careless brush springs
it back; only a committed flick or a deliberate long pull lets it leave. Resistance as a
courtesy, tuned so intent passes and accident does not.

**Why SPRING not MORPH:** the slide-over→sheet re-anchor is a morph, but it rides on the
γ2/δ MORPH lineage and is *not* the surprise. The surprise is the **drag physics** — the
velocity gate, the overshoot settle, the rubber-band — which is kinetic feedback (SPRING).
Pivot: last three were RING(δ3) · GLASS(ε1) · — SPRING at ε2 is a fresh debut.

---

## 3. Files (≤ 6)

1. `prompts/v5/ε2_BOTTOM_SHEET.md` — this spec.
2. `platform-v5/assets/css/sheet.css` — NEW, `@layer components`: the `@media` morph of
   `.slide-over` into a sheet, the `::after` handle, the repositioned block-start specular,
   `[data-dragging]` (no transition) + `[data-settling]` (spring transition) states,
   `--sheet-drag` custom property driving the live transform, forced-colors guard.
3. `platform-v5/assets/js/sheet.js` — NEW, classic IIFE: `Upg.sheet` (frozen: enabled /
   isDragging / _meta). Pointer-events drag engine bound to the header; velocity tracking;
   threshold + flick dismissal (→ `Upg.overlay.close()`); spring-back; rubber-band; live
   scrim opacity; matchMedia gating; reset on `upg:overlay:close`.
4. `platform-v5/index.html` — link `sheet.css`, defer `sheet.js` (2 lines).

`Upg.sheet` is additive; it consumes `Upg.overlay` (ε1) and touches no sacred API.

---

## 4. Verify (re-run after build)

```
sheet morph @media ((max-width:720px) or (pointer:coarse)) ≥ 1
::after handle rule = 1            --sheet-drag uses ≥ 2
ease-spring use in sheet.css ≥ 1   data-dragging + data-settling rules ≥ 2
pointerdown/move/up + setPointerCapture present
velocity + threshold logic present   Upg.sheet frozen surface = 1
emoji=0 hex=0 inline-svg=0 important=0 (shipped)
physical left/right=0 (audit exit 0)   node --check sheet.js = OK
```

---

## 5. Acceptance

- On a narrow viewport / touch device, opening any overlay presents it as a bottom sheet
  rising from the block-end edge, with a centred handle.
- Dragging the handle/header down: the sheet follows the finger, the canvas brightens.
- A slow short drag released → springs back with a sub-bounce. A flick or a long pull →
  dismisses (slides out, closes, focus returns, history Back consumed).
- Dragging up past seated rubber-bands and resists.
- Desktop (fine pointer, ≥ 720px) is unchanged — still the ε1 inline-end slide-over.
- `node --check` clean, logical-props audit exits 0, zero new emoji/hex/inline-svg/!important.
- One Pulse logged (SPRING_PULSE), one TRUTH_LEDGER entry, PROGRESS.json advanced to ε2.
