# MOTION DOCTRINE — Easing, Duration, Spring

> *«الحَرَكة بَيان لا زِينة. كل millisecond تَدفَع المعنى أو تُحذَف.»*

---

## §1 — The seven canonical durations

Every animation in v5 must use one of these tokens. One-off `transition: 200ms` strings are banned at lint time.

| Token | Value | Used for |
|---|---|---|
| `--duration-snap` | **80 ms** | tactile feedback (button press, ripple) |
| `--duration-quick` | **160 ms** | hover state changes, focus ring, dock expand |
| `--duration-emerge` | **240 ms** | bento card expand-in-place, tooltip reveal |
| `--duration-morph` | **360 ms** | grid-template transitions, layout reflows |
| `--duration-panel` | **480 ms** | slide-over / bottom sheet entrance & exit |
| `--duration-zen` | **640 ms** | entering/leaving Focus Mode |
| `--duration-skeleton` | **1200 ms** | loading shimmer cycle |

---

## §2 — The five canonical easings

| Token | `cubic-bezier()` | Used for |
|---|---|---|
| `--ease-snap` | `cubic-bezier(0.4, 0, 0.2, 1)` | quick snaps, button feedback (Material Standard) |
| `--ease-emerge` | `cubic-bezier(0.32, 0.72, 0, 1)` | dock reveals, bento expansion (Apple iOS Spring) |
| `--ease-panel` | `cubic-bezier(0.32, 0.72, 0, 1)` | slide-over and sheet motion |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | scale-up on success (overshoots slightly) |
| `--ease-morph` | `cubic-bezier(0.65, 0, 0.35, 1)` | layout transitions (in-out) |

**Banned**: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`. The browser defaults are dead. Every motion uses a token.

---

## §3 — The three feedback patterns

Three patterns cover 95% of in-app motion. Anything else needs a Pulse declaration.

### 3.1 — The Press
Any tappable element under `[data-press]` or `<button>`:

```css
button, [role="button"], [data-press] {
  transition: transform var(--duration-snap) var(--ease-snap),
              background var(--duration-snap) var(--ease-snap);
  will-change: transform;
}
button:active, [data-press]:active { transform: scale(0.98); }
```

**Reasoning**: 0.98 is felt as physical without becoming a click-jerk. 0.96 is too aggressive on touch devices; 0.99 is invisible. The chosen value is the Apple HIG recommendation for primary buttons.

### 3.2 — The Bloom (success)
On task completion / training-step success:

```css
.bloom { animation: bloom var(--duration-emerge) var(--ease-spring) both; }
@keyframes bloom {
  0%   { transform: scale(0.96); }
  60%  { transform: scale(1.04); }
  100% { transform: scale(1.00); }
}
```

The two-overshoot curve reads as "celebration without confetti."

### 3.3 — The Settle (state change)
For numbers that change (stats, progress %, ring fill):

```css
.settle { transition: stroke-dashoffset var(--duration-morph) var(--ease-emerge); }
```

For SVG progress rings: animate `stroke-dashoffset`. For percentages in text: render the final value directly (no count-up animation — that's the cliché the manifesto banned).

---

## §4 — The reduced-motion contract

`@media (prefers-reduced-motion: reduce)` must produce a working interface, not a broken one. Three rules:

1. **No animations** → all `--duration-*` collapse to `0.01ms`.
2. **State changes still occur** → the bento card *does* expand on click; it just snaps instead of morphs.
3. **Signature signal preserved** → if a Pulse uses motion to convey meaning (e.g. a flame flicker indicates an unsaved draft), under reduced-motion the same meaning is conveyed by a static signal (a 4×4 dot in `--accent-action`).

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

(The `!important` here is the **only** sanctioned use of the keyword in v5 — and it lives in a single `motion-sanctuary.css` block.)

---

## §5 — View Transitions API (where it lands)

Where supported (`document.startViewTransition`), use it for:

1. **Bento card expand** — wrap the click handler in `startViewTransition` to morph from compact to expanded with a single FLIP-style animation.
2. **Page navigation** — wrap `Upg.nav.to(id)` in `startViewTransition` when the destination is on the same dock-tier.

The fallback for unsupported browsers (Firefox at time of writing): graceful no-op. The interaction still works; it just doesn't blend.

---

## §6 — Forbidden motion patterns

1. **Spinners** — banned everywhere; loading is a skeleton shimmer.
2. **Confetti / particle bursts** — banned on success; use The Bloom.
3. **Bounce on entrance** — banned for pages and panels (only sanctioned bounce: The Bloom, on success only).
4. **Animated counters from 0** — banned (manifesto §5.8). Render the final value.
5. **Hover transforms beyond 4px** — banned. Hover is a brightness shift, not a translation.
6. **`@keyframes` with > 4 stops** unless documented as a Pulse — keyframe spam is a code-smell.
7. **`infinite` animations on first paint** — banned. Skeleton shimmer (which is `infinite`) is opt-in via `data-loading="true"`, not on by default.
8. **Scroll-jacking** — `scroll-behavior: smooth` is OK on `html`; intercepting wheel events is banned.
9. **Auto-play video / motion graphics on the dashboard** — banned.

---

## §7 — Performance budget

A v5 surface must not cause:

- **CLS > 0.05** during entrance.
- **INP > 200 ms** on press (measured by Real User Monitoring or Lighthouse Mobile).
- **A frame drop** (jank ≥ 16ms) during a slide-over panel entrance on a mid-tier mobile (e.g. Pixel 4a equivalent throttling).

If any animation budget is broken, the surface ships static (with the reduced-motion fallback applied to all users) until the regression is fixed. **Never** ship a janky animation.
