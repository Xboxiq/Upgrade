# ζ3 — ZEN_EXIT (Pillar ζ · FLOW · stage 3/3 — CLOSES ζ)

> *«الاكتِمال لا يُعلَن بضَجيج؛ يُزهِر في مَوضِعه. الحَلقة تَنغَلِق، فيَعود العالَم على مَهَل.»*

**Pulse intent:** SPRING_PULSE. *Pivot-safe:* the last two were VEIL(ζ1) · GLOW(ζ2),
so SPRING is legal; distinct in kind from ε2's bottom-sheet momentum spring (this
is a one-shot completion bloom, not a drag-physics return).

---

## Goal

ζ1 entered Focus Mode by subtraction; ζ2 drained the field to a single living
colour. ζ3 defines the **deliberate exit** — and the special case of **completion**.
A session that finishes does not fire a toast (Forbidden #2) or count a number up
from zero (Forbidden #10) or rain confetti. Instead the **ring blooms in place**:
one spring scale + a glow surge that settles, then — after a held beat — the field
re-saturates and the dock re-emerges slowly on tarteel time. The celebration lives
on the achievement itself, never on the page.

This completes the manifesto's Flow Oath: enter quietly, hold quietly, **leave
quietly** — the only flourish is on the work that was done.

---

## The Pulse — SPRING_PULSE (the bloom in place, the patient return)

- **The Surprise:** `Upg.zen.complete()` marks the scope `[data-zen-complete]`. That
  one attribute (a) **stops** the ζ2 breathe and replaces it with a one-shot
  **bloom** — `@keyframes zen-ring-bloom` scales the `.ring` container 1 → 1.08 → 1
  on `--ease-spring` (a real overshoot-and-settle, not a linear pop), while the
  `.ring-bar` glow **surges** then settles to a lit rest; then (b) after the bloom
  duration JS calls `exit()`, which now also drives the **dock re-emergence**: the
  dock holds dissolved for a tarteel beat (`transition-delay: --duration-panel`)
  then fades back over `--duration-zen`. Quick to protect focus on enter; *patient*
  to return — the same asymmetric cadence ε3 gave the overlay, now closing the loop.
- **Reference Avoided:** Forbidden #2 (toast notification) — replaced by the in-place
  bloom; Forbidden #10 (counter animated from 0) — the ring value is rendered, the
  bloom is a *shape* flourish not a number animation.
- **Inspired-by:** Wild Card #1 — Iznik tile radial geometry resolving only at the
  seventh repetition: the pattern is *complete* exactly when the ring closes.

---

## Spec

### API — extend `Upg.zen` (same IIFE, frozen surface gains `complete`)

| Method | Behaviour |
|---|---|
| `complete(opts?)` | only while active. Optionally `Upg.ring.set(opts.host, opts.value)` first (renders, never counts up). Sets `[data-zen-complete]` on the scope → CSS bloom. Fires `upg:zen:complete`. After the bloom (`--duration-panel`) calls `exit({via:'complete'})`. |
| `exit()` *(enriched)* | now also sets `data-zen-exiting` on `<html>` for the dock re-emergence window, clears `[data-zen-complete]`, and removes `data-zen-exiting` after `--duration-zen + --duration-panel`. ζ1 behaviour (veil fade, focus return, `upg:zen:exit`) preserved. |

### CSS (append to zen.css — ζ1/ζ2 rules untouched)

1. `@keyframes zen-ring-bloom` — `0%{scale 1} 35%{scale 1.08} 100%{scale 1}`.
2. `@keyframes zen-ring-bloom-glow` — drop-shadow surge `2px → 12px → 5px`,
   relative-color `hsl(from var(--accent-progress) …)`.
3. `:root[data-zen="active"] [data-zen-scope][data-zen-complete] .ring`
   → bloom, `var(--duration-panel)` `var(--ease-spring)` `both`.
4. `:root[data-zen="active"] [data-zen-scope][data-zen-complete] .ring-bar`
   → bloom-glow (specificity 0,5,0 — beats the ζ2 breathe at 0,4,0, so the
   one-shot wins over the infinite loop), `var(--ease-emerge)` `both`.
5. `:root[data-zen-exiting="true"] .dock` → `pointer-events:none` +
   `transition: opacity var(--duration-zen) var(--ease-emerge) var(--duration-panel)`
   (the patient, delayed re-emergence; only `opacity`, so the dock's base
   transform/gap transitions are untouched outside this window).

### Discipline

- **No new duration token** — bloom uses `--duration-panel`, return uses
  `--duration-zen` + `--duration-panel` delay (the seven canonical durations stand).
- **No `!important`** (stays 0). **No blur**. **No toast/counter/confetti** (0/0/0).
- **Reduced motion:** the global motion-sanctuary collapses the bloom to a snap —
  completion still registers (the ring is lit, then exit), meaning preserved.
- **a11y:** completion fires `upg:zen:complete` (host apps can announce); focus
  still returns to the trigger on the subsequent exit.
- **Sacred:** ring.css untouched (ζ3 only animates existing `.ring`/`.ring-bar`);
  dock centring transform untouched; all prior Upg.* APIs intact; `archive/` untouched.

---

## Verify (grep targets)

```
@keyframes zen-ring-bloom + bloom-glow : 2
complete() in zen.js + on frozen surface: ≥ 2
fires upg:zen:complete                 : 1
data-zen-exiting re-emergence rule     : 1
bloom uses --ease-spring               : 1
toast / counter-from-0 / confetti      : 0 / 0 / 0
!important / emoji / hex in zen files  : 0 / 0 / 0
node --check zen.js                    : OK
physical left/right (lint)             : 0  (audit exit 0)
```
