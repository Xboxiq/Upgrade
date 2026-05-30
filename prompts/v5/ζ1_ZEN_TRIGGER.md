# ζ1 — ZEN_TRIGGER (Pillar ζ · FLOW · stage 1/3)

> *«التَركيز لا يُبنى بالإضافة؛ يُكشَف بالطَرح. ما يَنحَسِر هو ما يُضيء ما بَقِيَ.»*

**Pulse intent:** VEIL_PULSE — *chronic* (sustained focus mode), distinct from ε3's *acute* veil (per-overlay open/close).

---

## Goal

Open **Focus Mode** on a training-scenario start. A single API call —
`Upg.zen.enter(scope)` — recedes the entire interface *except* the one scoped
task. The chrome (dock) dissolves; a veil descends over the canvas; the scoped
element is lifted into a quiet clearing. A single neutral affordance returns the
world. This stage ships the **mechanism + API + entry choreography**; ζ2 styles
the sustained environment, ζ3 the deliberate exit.

This is the manifesto's Flow Oath made literal: focus by **subtraction**, never
by a competing modal box (Forbidden #5) or an unsolicited overlay (Forbidden #15).

---

## The Pulse — VEIL_PULSE (entry by subtraction)

- **The Surprise:** entering focus is not a box that appears — it is a world that
  recedes. The dock *dissolves* (opacity → 0, chronic), and a veil the colour of
  the deep canvas descends over everything; only the scoped task is lifted above
  it (z `--z-overlay`) into a clearing. Entry is paced over `--duration-zen`
  (640ms — the slowest token), like a held breath. The veil keeps `0.82` opacity,
  not total: the world is *present, just hushed* — a ghost behind the clearing.
- **Reference Avoided:** Forbidden #5 (modal popup `position:fixed; inset:0`) and
  Forbidden #15 (unsolicited tutorial overlay). Zen adds nothing to the DOM stage;
  it removes the competition.
- **Inspired-by:** Wild Card #2 — the negative space of a Hokusai wave: the work is
  what the brush *didn't* paint.

---

## Spec

### API — `Upg.zen` (new top-level namespace, classic IIFE)

| Method | Behaviour |
|---|---|
| `enter(scope, opts?)` | scope = element or selector string. Sets `data-zen="active"` on `<html>`, marks scope `[data-zen-scope]`, shows the veil, dissolves the dock, moves focus into the scope, fires `upg:zen:enter`. Idempotent: a second call while active re-scopes without re-entering. |
| `exit()` | removes `data-zen`, fades + hides the veil, returns focus to the trigger, fires `upg:zen:exit`. |
| `toggle(scope, opts?)` | enter if idle, exit if active. |
| `active()` | boolean. |
| `scope()` | current scope element or null. |

`Object.freeze`d surface. Idempotent registration (`if (!window.Upg.zen)`).

### Markup hooks (data-* only, no class explosions)

- `#zen-veil .zen-veil` — the sanctioned dim layer (like the ε1 scrim — a dim
  layer, **not** a content popup). `position:fixed; inset:0; z-index:--z-scrim`.
- `[data-zen-open="<selector>"]` — a trigger; scope resolves to the selector, else
  the nearest `[data-card]`/`.bento-card`.
- `[data-zen-close]` / `.zen-exit` — the quiet return affordance (fixed, inline-end
  top, 44×44 tap floor, neutral — never an accent, CHROMA §7).
- clicking the veil also exits.

### Layering (verified safe)

`main`/`.bento` create no stacking context; `.bento-card` does (container-type),
but its `z-index` participates in the **root** stacking context. So:
`#zen-veil` at `--z-scrim` (80) + `:root[data-zen="active"] [data-zen-scope]`
(specificity 0,3,0 — beats `.bento-card[data-expanded]` 0,2,0) at `--z-overlay`
(100) lifts exactly the scope above the veil.

### Motion / a11y

- Durations read from `--duration-zen` token (no invented ms). Easing `--ease-emerge`.
- Reduced-motion: the global motion-sanctuary (`canvas.css`) collapses transitions
  to a snap — state still changes, veil still descends instantly (MOTION §4).
- `.zen-exit` hidden via `visibility:hidden` at rest (removed from tab order), so
  it is unreachable until zen holds.
- Escape exits zen — registered in **capture** phase, *after* the ε1 overlay
  capture handler, so an open overlay closes first; `stopPropagation` then prevents
  the δ2 bento-collapse from also firing.
- Focus moves into the scope on enter; returns to the trigger on exit.

---

## Verify (grep targets)

```
zen.css + zen.js exist            : 2
Upg.zen frozen methods            : ≥ 5  (enter/exit/toggle/active/scope)
data-zen / data-zen-scope rules   : ≥ 3
veil inset:0 + --z-scrim          : 1
scope lift --z-overlay            : 1
fires upg:zen:enter / :exit       : 2
emoji / inline-svg-viewBox        : 0 / 0
hex in zen files                  : 0
physical left/right (lint)        : 0  (audit exit 0)
```

Sacred preserved: 14 pages of content untouched; all prior Upg.* APIs intact
(EXTEND only — Upg.zen is additive); no archive/ touched.
