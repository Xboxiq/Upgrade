# INDEX — v5 TADAFFUQ master plan

> *«القائِمة الواحِدة لكل نَبضة v5 — مَن يَصِل إليها يَعرف ما تَبَقَّى.»*

---

## Doctrines

| File | Reads | Authoritative on |
|---|---|---|
| `00_TADAFFUQ_MANIFESTO.md` | constitution | the four oaths, sacred Upg.* APIs, the 20 absolute forbiddens, exit criteria |
| `SPATIAL_DOCTRINE.md` | layout / nav | canvas, dock, 3 surface types (bento card / slide-over / sheet), z-index choreography, RTL |
| `MOTION_DOCTRINE.md` | animation | 7 durations, 5 easings, 3 feedback patterns (Press / Bloom / Settle), view-transitions, perf budget |
| `CHROMA_DOCTRINE.md` | colour | 4 token families, dark + light palettes, neon accents, single-accent-per-screen rule, forced-colors |
| `ICONOGRAPHY_DOCTRINE.md` | iconography | zero emoji, Lucide + Phosphor only, sprite system, 6-step size scale, semantic map |
| `PULSE_LIBRARY.md` | creativity | 9 pulse categories, 25-entry Forbidden Library, 25-card Wild Card deck, pivot rule, creativity-health metric |
| `ATELIER_REFERENCE.md` | concrete reference (not a doctrine) | worked token values, Atelier→pillar stage map for δ→θ, emoji→icon inventory, runnable prototype anchor; **yields to doctrines on conflict** |
| `AUTO_PILOT_v5.md` | execution | the boot protocol + the per-stage chain (12 steps) + per-pillar PR + permissions |

---

## The 24 stages

### α — FOUNDATION (4 stages, 0 pulses)

| ID | Name | Output |
|---|---|---|
| α1 | TABULA_RASA | inventory of v4 chrome to demolish + create `platform-v5/` skeleton |
| α2 | EDGE_CANVAS | edge-to-edge `index.html` + `canvas.css` (no sidebar, no header, viewport-fit cover) |
| α3 | TOKEN_RESET | `tokens.css` — 4 token families, dark + light, all `--duration-*` / `--ease-*` / `--icon-*` |
| α4 | ICON_SPRITE | `assets/svg/icons.svg` (40+ Lucide + Phosphor icons) + `SEMANTIC_MAP.json` + `Upg.icons.use()` helper |

### β — VOICE (3 stages, 0 pulses)

| ID | Name | Output |
|---|---|---|
| β1 | TYPO_HIERARCHY | type scale via `clamp()`, optimal line-heights, Arabic-first stack, base.css |
| β2 | THEME_PROVIDER | `Upg.theme.set()` rebuilt for v5 (data-theme on root, instant swap, opt-in fade) |
| β3 | LANG_SHIM | RTL contract enforcement (logical-property audit script, lint on `left:` / `right:` outside archive) |

### γ — SPATIAL (3 stages, 3 pulses)

| ID | Name | Pulse intent |
|---|---|---|
| γ1 | DOCK_DESKTOP | floating dock, hover-reveal, active-dot — **DOCK_PULSE** |
| γ2 | DOCK_MOBILE | bottom-nav frosted glass with safe-area + draggable secondary tray — **MORPH_PULSE** |
| γ3 | CANVAS_HARMONIC | the canvas hue subtly shifts toward the active dock item's accent (1 % luminosity, never colour) — **GLOW_PULSE** |

### δ — BENTO LIVE (3 stages, 3 pulses)

| ID | Name | Pulse intent |
|---|---|---|
| δ1 | BENTO_GRID | 4-3-2-1 responsive bento grid, container-queries-first — **MORPH_PULSE** |
| δ2 | BENTO_EXPAND | in-place expand via grid-template + view-transition — **REVEAL_PULSE** |
| δ3 | BENTO_RING | SVG progress ring on focal cards, single-accent-progress per screen — **RING_PULSE** |

### ε — DISCLOSURE (3 stages, 3 pulses)

| ID | Name | Pulse intent |
|---|---|---|
| ε1 | SLIDE_OVER | inline-end panel + scrim + history-state coupling — **GLASS_PULSE** |
| ε2 | BOTTOM_SHEET | drag-to-dismiss with momentum on touch — **SPRING_PULSE** |
| ε3 | OVERLAY_CHOREO | choreography: panel summons hide dock automatically; closing returns dock with delay — **VEIL_PULSE** |

### ζ — ZEN MODE (3 stages, 3 pulses)

| ID | Name | Pulse intent |
|---|---|---|
| ζ1 | ZEN_TRIGGER | enter Focus Mode on training-scenario start (`Upg.zen.enter(scope)`) — **VEIL_PULSE** |
| ζ2 | ZEN_CANVAS | canvas dims, dock slides out, only workbench + ring + prompt remain — **VEIL_PULSE** (different sub-mode: chronic, not acute) |
| ζ3 | ZEN_EXIT | quiet, deliberate exit on completion — Bloom on the ring, not on the page — **SPRING_PULSE** |

### η — KINESIS (3 stages, 3 pulses)

| ID | Name | Pulse intent |
|---|---|---|
| η1 | PRESS_FEEDBACK | global Press pattern via `[data-press]` + 0.98 spring — **SPRING_PULSE** |
| η2 | DRAG_DROP | sortable + match-target zones for training scenarios — **HAPTIC_PULSE** |
| η3 | HAPTIC_PATTERNS | 3 haptic patterns reused from v4 δ4 (دفّن / تَك / مَقسوم), bound to drag/drop/complete — **HAPTIC_PULSE** (different binding axis) |

### θ — POLISH (2 stages, 0 pulses)

| ID | Name | Output |
|---|---|---|
| θ1 | PERF_AUDIT | Lighthouse Mobile Performance ≥ 90 on `platform-v5/index.html` — verified |
| θ2 | A11Y_SEAL | Accessibility ≥ 95 + zero forced-colors regressions + every icon has correct a11y posture |

**Total: 24 stages · 15 Pulses across (target) all 9 categories.**

---

## Pulse-category target distribution

By the end of θ, every category from `PULSE_LIBRARY.md §1` should have at least one Pulse. Planned mapping above hits **9 / 9** with planned pivots:

```
DOCK    — γ1
MORPH   — γ2, δ1
GLOW    — γ3
REVEAL  — δ2
RING    — δ3
GLASS   — ε1
SPRING  — ε2, ζ3, η1
VEIL    — ε3, ζ1, ζ2
HAPTIC  — η2, η3
```

A real session will likely deviate from this plan. The plan is a **scaffold**, not a contract — the pivot rule (PULSE_LIBRARY §5) and the Wild Card draw (`AUTO_PILOT_v5` §c) take precedence.

---

## What v5 explicitly will NOT have

(So the AI doesn't accidentally build it.)

- A landing-page marketing surface for v5 itself.
- A v5-vs-v4 toggle in the chrome.
- A "what's new" changelog overlay.
- An onboarding tutorial.
- Eight world palettes (one premium voice replaces eight cultural voices).
- Any new prompt files outside `prompts/v5/`.
- Any modification to `archive/` or to `prompts/v[1-4]/`.

---

## When v5 is done

When all of the following are true at one commit on `main`:

```
✓  24/24 stages shipped, all `verified by:` lines present in CHANGELOG
✓  15 pulses logged in state/PULSE_LOG.md, 9/9 unique categories used
✓  state/PROGRESS.json → tadaffuq_v5.status = "complete"
✓  state/PROGRESS.json → tadaffuq_v5.creativity_health ≥ 90
✓  scripts/v5_forbidden_audit.py exits 0
✓  Lighthouse Mobile Performance ≥ 90, A11y ≥ 95 (run by human, recorded in state/LIGHTHOUSE_REPORT.md)
✓  All 14+ Upg.* APIs are present in window.Upg after DOMContentLoaded
```

This is the seal.
