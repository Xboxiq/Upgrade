# ζ2 — ZEN_CANVAS (Pillar ζ · FLOW · stage 2/3)

> *«حين يُجَرَّد الحَقل من لَونِه، يَصير اللَون الوَحيد الباقي نِداءً. الحَلقة تَتَنَفَّس لأن الجَلسة حَيَّة.»*

**Pulse intent:** GLOW_PULSE — a chromatic surprise. *Pivot-mandated:* ε3 + ζ1 were
both VEIL; ζ2 **must not** be VEIL (PULSE_LIBRARY §5.1). Distinct from γ3's GLOW
(which nudged canvas *hue* toward the active accent); ζ2 *drains* chroma from the
whole field so a single accent is left glowing.

---

## Goal

ζ1 made the world recede (dock dissolves, veil descends, scope lifts). ζ2 defines
the **quality of the sustained field**: the hushed world is *drained of colour*,
leaving the scoped task's single progress ring as the **only living chroma** —
and that ring *breathes* slowly, but only while the session is alive. Chroma
becomes the sole signal of "this is alive and waiting for you."

This is the manifesto's single-accent rule (CHROMA §7) taken to its logical end:
in Focus Mode there is literally one colour on screen.

---

## The Pulse — GLOW_PULSE (the drained field, the one living colour)

- **The Surprise:** while Zen holds, a `backdrop-filter: saturate(0.32)` on the
  veil drains the colour from everything painted *beneath* it (the whole hushed
  canvas) — **but not** the scoped task, which paints *above* the veil
  (`--z-overlay` > `--z-scrim`) and so is excluded from the veil's backdrop by
  paint order. The result: a monochrome world with one exception — the scope's
  progress ring keeps its `--accent-progress` cyan and **breathes** (a slow
  `drop-shadow` glow pulse, `--duration-skeleton`, `infinite alternate`) for as
  long as the session lives. No blur is used (Forbidden #9): `saturate()` is
  GPU-cheap.
- **Reference Avoided:** Forbidden #9 (heavy `backdrop-filter: blur(N≥12)`
  everywhere) — saturate-without-blur instead; and the AI-default "focus mode =
  just dim it darker," where here the *desaturation* is the protagonist.
- **Inspired-by:** Wild Card #14 — the shadow-line of a Hagia Sophia archway at
  noon: light (here, the one surviving colour) as a structural element that
  defines the space.

---

## Spec (CSS-only — pure addition to zen.css)

A new `@layer components` block appended to `zen.css` (ζ1's rules untouched):

1. **Desaturate the field** — extend `.zen-veil[data-open="true"]` with
   `backdrop-filter: saturate(0.32)` (+ `-webkit-` prefix). The scope is above the
   veil → keeps full chroma. (Verified layering from ζ1.)
2. **The one living colour breathes** — `@keyframes zen-ring-breathe` (a soft
   `drop-shadow` glow + opacity lift, two stops) on
   `:root[data-zen="active"] [data-zen-scope] .ring-bar`, duration anchored to
   `--duration-skeleton`, easing `--ease-morph`, `infinite alternate`. Opt-in via
   the zen state — never on first paint (MOTION §6.7).
3. **The workbench floats** — `:root[data-zen="active"] [data-zen-scope]` gains
   `box-shadow: var(--shadow-3)` so the clearing reads as elevated above the drained
   field.

### Discipline

- **No `!important`** (stays 0 in zen.css). **No blur** (stays 0 ≥12px).
- **No new duration token** — the breathe reuses `--duration-skeleton` with
  `alternate` (full breath = 2×1200ms = 2.4s), so the seven canonical durations
  stand (MOTION §1).
- **Reduced motion:** the global motion-sanctuary collapses the breathe to static
  (`animation-iteration-count: 1`, `duration: 0.01ms`). The *meaning* survives
  statically — the ring is still the only colour in a drained field (MOTION §4.3).
- **Forced colors:** `backdrop-filter`/`filter` are ignored by the OS palette;
  the ring already maps to `Highlight`/`accent` — no regression.
- **Single-accent (CHROMA §7):** reinforced literally — exactly one chroma element
  remains visible. `data-progress` host count stays 1.
- **Sacred:** dock's centring transform untouched (no slide — dissolve only, per
  the ε3 discipline); Upg.* APIs intact (no JS change this stage).

---

## Verify (grep targets)

```
desaturation on veil (saturate)      : ≥ 1   (backdrop-filter: saturate)
backdrop-filter blur ≥ 12px          : 0
@keyframes zen-ring-breathe          : 1
ring-bar breathe selector            : 1
!important in zen.css                : 0
emoji / hex in zen.css               : 0 / 0
data-progress hosts in index         : 1     (single accent preserved)
physical left/right (lint)           : 0     (audit exit 0)
```
