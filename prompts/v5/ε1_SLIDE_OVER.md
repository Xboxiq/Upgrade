# ε1 — SLIDE_OVER (Pillar ε — DISCLOSURE, stage 1 of 3)

> *«التفصيل لا يَنقُلك إلى مَكان آخر؛ يَنفَتِح بِجانِبك، والكانفس يَبقى مَرئياً خَلف حِجاب.»*
> Pulse intent: **GLASS_PULSE** (2nd of its category; distinct in kind from δ1).

---

## 0. Where this sits

Pillar δ (BENTO LIVE) shipped a home you can glance at and expand-in-place. Pillar ε
(DISCLOSURE) adds the **third surface type** of SPATIAL_DOCTRINE §3 — the **slide-over
panel** — for detail that needs a focused workspace *without losing canvas context*.
This is the v5 replacement for v4's modal / drawer / secondary-page patterns
(manifesto §5.5, §5.12; Forbidden Library #5).

ε1 builds the slide-over. ε2 turns it into a drag-to-dismiss bottom sheet on touch.
ε3 choreographs dock+panel handoff.

---

## 1. The doctrine guardrails (must all hold)

- **No modal popup.** The panel is anchored to `inset-inline-end` with a finite
  `inline-size: clamp(360px, 38vw, 560px)` (SPATIAL §3.2). It is **never**
  `position: fixed; inset: 0` (that is the forbidden modal — Forbidden #5).
- **The scrim is sanctioned.** A `<div class="scrim">` at `--z-scrim` dims the canvas
  at `rgba(0,0,0,0.32)`-equivalent (token-driven). The scrim *may* be `inset: 0` — it
  is the dim layer, not a content popup. Only ONE scrim, behind ONE overlay.
- **RTL-correct.** `inset-inline-end` + a direction-aware `--slide-dir` custom property
  drive the off-screen translate so the panel emerges from the inline-end edge in both
  LTR and RTL. Zero physical `left:`/`right:` (β3 audit must pass).
- **History coupling.** Opening pushes `history.pushState({ upgOverlay:id })`; `popstate`
  with no overlay closes it; the browser Back button closes the panel (SPATIAL §4).
- **Motion via tokens only.** Entrance/exit use `--duration-panel` (480ms) + `--ease-panel`.
  The glint uses the same. No one-off `ms` strings (MOTION §1).
- **Reduced-motion.** The global sanctuary collapses the transform + glint to a snap; the
  panel still opens/closes (MOTION §4).
- **Single accent per screen.** The panel counts as its own screen (CHROMA §7): at most
  one `--accent-action` CTA, at most one `--accent-progress` element. The GLASS glint is
  **white light**, not an accent (so it never competes).
- **Icons via sprite.** Close button uses `Upg.icons.use('actions.close')`. No inline
  `<svg viewBox>` (ICONOGRAPHY §3/§8).
- **Focus posture.** `role="dialog"`, `aria-modal="true"`, focus moves into the panel on
  open, Tab is trapped, focus returns to the trigger on close. Background `#main` + dock
  get `inert` (with `aria-hidden` fallback) while open.

---

## 2. The Pulse — 🪟 GLASS_PULSE (leading-edge specular + scroll lid)

**Category:** GLASS_PULSE. Second of its category in v5 — δ1 was "bento as one cut glass
plane (single-edge hairline that brightens to cyan on hover)". ε1 is a **different kind**
of glass surprise from PULSE_LIBRARY §1: *"the panel whose border catches a 1px highlight
only on the leading edge; the sheet that gains a hairline when content scrolls behind it."*

**The surprise:** the panel's **leading edge** — the inline-start seam where it meets the
canvas — is not a hard border. It is a 1px vertical **specular light-line** (white, via
`hsla(0 0% 100% / α)`, never an accent hue) that **glints brighter the instant the panel
arrives** (`@keyframes glass-glint`: opacity 0 → 1 at 55% → settles to 0.5), then rests as
a faint thread. Separately, the header is a glass **lid**: it gains a hairline
`border-block-end` + faint shadow **only while the body is scrolled beneath it**
(`[data-scrolled="true"]`), then loses it when scrolled back to top. Light reveals the
glass; nothing else.

**Reference avoided:** Forbidden #5 (modal popup). Also the AI-default "every drawer has a
uniform hard 1px border all the way around" — here the surface is read by *light catching
an edge*, not by a drawn rectangle.

**Inspired-by:** Wild Card #22 — A Sana'a window's wooden lattice (qamariya): privacy
without darkness. The panel filters focus onto the detail while the canvas stays faintly
visible behind the scrim — and its leading edge catches light like alabaster glass at a
certain hour.

**Why GLASS not REVEAL/MORPH:** the surprise is purely about *surface translucency and
light on an edge*, not about disclosure order (that was δ2 REVEAL) or layout transform
(δ1/γ2 MORPH). Pivot rule: last three were GLASS(δ1) · REVEAL(δ2) · RING(δ3) — GLASS at ε1
is non-consecutive, no violation.

---

## 3. Files (≤ 6)

1. `prompts/v5/ε1_SLIDE_OVER.md` — this spec.
2. `platform-v5/assets/css/slide-over.css` — NEW, `@layer components`: `.scrim`,
   `.slide-over`, header/eyebrow/title/close, body, the specular `::before`, the scroll
   lid, reduced-motion + forced-colors guards.
3. `platform-v5/assets/js/slide-over.js` — NEW, classic IIFE: `Upg.overlay`
   {open, close, toggle, isOpen, current} + history coupling + focus trap + scrim/Escape
   close + `[data-overlay-open]`/`[data-overlay-close]` delegation + ⌘K + dock-centre
   wiring + scroll-lid toggle.
4. `platform-v5/index.html` — wire CSS + JS; fill the pre-existing `#overlay-panel` /
   `#overlay-scrim` slots with a stable header+body skeleton; add `<template>` content
   for the command palette + one scenario; add the scenario trigger inside the focal card.

`Upg.overlay` realizes SPATIAL §4's `Upg.nav.overlay(...)` as a dedicated v5 namespace
(v5 has no `Upg.nav` module — the dock owns routing). It is additive; no sacred API is
touched.

---

## 4. Verify (re-run after build)

```
slide-over CSS blocks ≥ 1        scrim blocks ≥ 1
panel anchored (inset-inline-end + clamp width) = 1, NOT inset:0
pushState/popstate present       Upg.overlay surface = 1 (frozen, 5 methods + _meta)
glass-glint keyframes = 1        data-scrolled lid rule ≥ 1
emoji in index.html+assets = 0   hex in slide-over.css/js = 0
inline <svg viewBox> in js = 0   physical left/right = 0 (audit exit 0)
node --check slide-over.js = OK  role=dialog + aria-modal + focus trap present
```

---

## 5. Acceptance

- Clicking the dock **centre** item OR pressing **⌘/Ctrl+K** opens the command palette
  as an inline-end slide-over with a dimmed canvas behind.
- The leading edge glints once on arrival, then settles to a faint thread.
- Scrolling the panel body materialises a hairline under the header; scrolling back removes it.
- Escape, the scrim, the close button, and the browser Back button all close it; focus
  returns to the trigger.
- The expanded focal card's "open scenario" button opens a scenario slide-over from a template.
- `node --check` clean, logical-props audit exits 0, zero new emoji/hex/inline-svg.
- One Pulse logged (GLASS_PULSE), one TRUTH_LEDGER entry, PROGRESS.json advanced to ε1.
