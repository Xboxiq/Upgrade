# SPATIAL DOCTRINE — Layout, Navigation, Disclosure

> *«المَكان لا يُحاصِر؛ يَستَقبِل ثم يَنسَحِب.»*

The rules below govern how things sit on screen, how they enter, and how they leave. Three primitives only: **Canvas · Dock · Surface**.

---

## §1 — The Canvas

The Canvas is the entire viewport. It runs **edge-to-edge** with `viewport-fit=cover`. Safe-area insets (`env(safe-area-inset-*)`) are handled at the dock and sheet level, never by the canvas itself.

**Required CSS skeleton:**

```css
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100dvh;          /* dynamic viewport — survives mobile chrome */
  background: var(--canvas);
  color: var(--ink);
  overscroll-behavior-y: none; /* prevents pull-to-refresh inside the app */
}

main.canvas {
  display: block;
  inline-size: 100%;
  min-block-size: 100dvh;
  padding-block-start: var(--canvas-pad-top);    /* room for floating dock if top */
  padding-block-end:   var(--canvas-pad-bottom); /* room for bottom dock + safe area */
  padding-inline:      var(--canvas-pad-x);      /* breathing room on flanks; small */
}
```

**Banned**: any `max-width` on the canvas. Any `position: fixed` chrome that occupies a fixed strip of the viewport (sidebar, full-width header). Any margin-auto that centers the canvas inside a smaller width.

---

## §2 — The Dock

The Dock is the **only** persistent navigation chrome. It is a floating capsule that:

- **Desktop**: bottom-center, ~480–640px wide, anchored at `bottom: calc(20px + env(safe-area-inset-bottom))`. Hides on `prefers-reduced-motion: no-preference` after 3s of scroll-down inertia, returns on scroll-up or hover within 96px of the bottom edge.
- **Mobile**: bottom-edge, full-width minus safe-area, height ~64px, frosted glass surface (Glass 2.0 — see manifesto §3.2), 5 dock items with the active one bearing the Electric Orange dot.

The dock contains exactly **5 items** (mirroring v4's δ4 structure but un-named): Home · Lab (training) · Centre (cmdk trigger, the only `<button>` not a `<a>`) · Progress · More.

**The reveal-on-hover rule (desktop only)**: hover within 96px of the bottom edge causes the dock to gain a `data-state="hover"` attribute. CSS expands the dock from collapsed (icons only, ~56px tall) to expanded (icons + labels, ~72px tall) with the canonical `--ease-emerge` curve over `--duration-emerge` (see MOTION). Touch devices skip this — the dock is always expanded.

**The active-state rule**: the dock item whose route is current carries `aria-current="page"` and a 4×4px Electric Orange dot above its icon. Only one dot at a time, ever.

**Banned**:
- A second persistent navigation surface (no top tabs, no breadcrumb bar).
- A dock item count outside `[5, 7]`.
- An icon-only dock without `aria-label` per item.
- `<a>` items with `target="_blank"` (the dock never leaves the app).

---

## §3 — Surfaces (Cards, Panels, Sheets)

Every non-canvas surface is one of three types:

### 3.1 — Bento Card *(in-place expand)*
A card in the bento grid. **Static state**: shows a glanceable summary (title + 1 metric + 1 micro-icon + optional progress ring). **Expanded state**: triggered by click/Enter/Space, the card expands *in place* by spanning more grid cells (CSS Grid `grid-column / grid-row` change with view-transition or `transition` on `grid-area`). Other cards reflow around it. **Never** opens a new page.

```css
.bento-card {
  grid-column: span var(--card-span-w, 2);
  grid-row:    span var(--card-span-h, 2);
  transition: grid-column var(--duration-morph) var(--ease-morph),
              grid-row    var(--duration-morph) var(--ease-morph);
}
.bento-card[data-expanded="true"] {
  --card-span-w: 4;
  --card-span-h: 3;
}
```

### 3.2 — Slide-Over Panel *(right edge → left edge in RTL)*
For details that need a focused workspace but should not lose canvas context. Anchored to the inline-end edge (right in LTR, left in RTL). Width: `clamp(360px, 38vw, 560px)`. Slides in with `--ease-panel` over `--duration-panel`. The canvas behind is dimmed via a `<div class="scrim">` at `rgba(0,0,0,0.32)`. Closing dismisses scrim and panel together.

The slide-over is the v5 replacement for v4's modal/drawer/secondary-page patterns.

### 3.3 — Bottom Sheet *(mobile-first)*
On viewports `< 720px` (or any pointer:coarse), the slide-over becomes a bottom sheet: anchored to the inline-block-end edge, height `clamp(40vh, 70vh, 92vh)`, draggable down to dismiss with momentum (`will-change: transform`). The handle is a 36×4px capsule at top-center, neutral 40% opacity.

```css
.sheet {
  position: fixed;
  inset-inline: 0;
  inset-block-end: 0;
  block-size: var(--sheet-h, 70vh);
  border-start-start-radius: 24px;
  border-start-end-radius: 24px;
  background: var(--surface-1);
  box-shadow:
    0 -4px  6px -2px rgba(0,0,0,0.08),
    0 -10px 20px -5px rgba(0,0,0,0.10);
  transform: translateY(100%);
  transition: transform var(--duration-panel) var(--ease-panel);
  will-change: transform;
}
.sheet[data-open="true"] { transform: translateY(0); }
```

---

## §4 — Routing & history

The dock items use real anchor hrefs (`#page-dashboard`, `#page-lab`, …) — same shape as v4. Slide-overs and sheets use `data-overlay="<id>"` and **do not** push history (they're transient context, not pages).

Back button behaviour:
- On a page → previous page
- On a slide-over → close slide-over (one history step)
- On a sheet → close sheet

Implementation: when an overlay opens, push a state with `{ overlay: '<id>' }`; on `popstate` with no overlay, close. v4's `Upg.nav` has the surface for this; v5 adds `Upg.nav.overlay(id, { open: bool })` as a small extension.

---

## §5 — Z-index choreography

Five canonical z-index tokens. Nothing else.

| Token | Value | Used by |
|---|---|---|
| `--z-canvas` | 0 | the main canvas |
| `--z-bento-expanded` | 5 | a bento card lifted on expand |
| `--z-dock` | 50 | the floating dock |
| `--z-scrim` | 80 | the overlay dim layer |
| `--z-overlay` | 100 | slide-over panel / bottom sheet |
| `--z-toast-banned` | — | (see manifesto §5.6 — toasts are forbidden) |

Anything that needs more z-index needs a doctrine amendment, not a bigger number.

---

## §6 — Container queries (the bento responsive contract)

Bento cards respond to **their own container width**, not the viewport. Each card declares `container-type: inline-size; container-name: card;` and consumes width via `@container card (min-width: …)`. This means the same card adapts whether placed in a `b-1x1`, `b-2x2`, or `b-4x3` slot.

The bento *grid* responds to viewport: 4-column at ≥1080px, 3-column at ≥720px, 2-column at ≥480px, 1-column below.

---

## §7 — Empty / Loading / Error states (no exceptions)

Every surface declares all three. Banned: a surface that shows nothing while waiting (a "white blank").

- **Empty**: an inline `<div class="surface-empty">` with the surface's relevant **icon (outline variant)** + a one-sentence Arabic description in `--ink-muted` + an optional primary CTA in Electric Orange.
- **Loading**: a skeleton — block-level shapes filled with `linear-gradient(90deg, var(--surface-1), var(--surface-2), var(--surface-1))` shimmering at `--duration-skeleton` (~1200ms). No spinners. No "Loading…" text.
- **Error**: inline `<div class="surface-error" role="alert">` with the Electric Orange variant of the surface's icon, the error text, and a "Retry" affordance. Never a toast, never a modal.

---

## §8 — RTL contract

The platform is Arabic-first. `dir="rtl"` is set on `<html>`. Every layout rule that uses `left`/`right` is banned in v5 CSS — only `inline-start` / `inline-end` / `block-start` / `block-end`. The dock anchors at `bottom-center` (symmetric — works in both directions). The slide-over emerges from `inline-end` (right in LTR, left in RTL — automatic).

Logical-property compliance is enforced at lint time: `scripts/v5_logical_props_audit.py`.
