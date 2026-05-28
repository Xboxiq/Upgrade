# α2 — EDGE CANVAS

**Pillar:** α (foundation) · **Stage:** 2 of 4 · **Pulse:** none

## Intent
The edge-to-edge canvas foundation. `platform-v5/index.html` ships with the new HTML shell, and `platform-v5/assets/css/canvas.css` enforces the SPATIAL_DOCTRINE §1 contract.

## Forensic targets
```
sidebar-selectors-in-css     = grep -cE 'class="sidebar"|#sidebar|\.sidebar' platform-v5/assets/css/*.css     # expect 0
fixed-chrome-in-css          = grep -cE 'position:\s*fixed' platform-v5/assets/css/*.css                       # expect ≤ 1 (the dock placeholder)
max-width-on-canvas          = grep -cE 'max-width' platform-v5/assets/css/canvas.css                          # expect 0
edge-to-edge-confirmed       = grep -c 'inline-size:\s*100%' platform-v5/assets/css/canvas.css                 # expect ≥ 1
viewport-fit-cover           = grep -c 'viewport-fit=cover' platform-v5/index.html                             # expect 1
```

## Files
1. `platform-v5/index.html` — shell only (≤ 80 lines): `<!doctype html>`, `<html dir="rtl" lang="ar">`, head with viewport+charset+theme-color+manifest, body with `<a class="skip-link">` + sprite-mount placeholder + `<main class="canvas">` + dock placeholder + sheet placeholder. **No content yet**, just the slots.
2. `platform-v5/assets/css/canvas.css` — implements SPATIAL §1 (edge-to-edge `<html>`, `<body>`, `main.canvas` rules) + safe-area envelope.
3. `platform-v5/assets/css/_layers.css` — single declaration `@layer reset, tokens, base, components, utilities, themes, overrides;` (no rules; reserved for cascade order).

## Reset CSS strategy
Keep it minimal — modern reset only:
```css
@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; }
  html, body { block-size: 100%; }
  img, picture, video, canvas, svg { display: block; max-inline-size: 100%; }
  input, button, textarea, select { font: inherit; color: inherit; }
  button { background: none; border: 0; cursor: pointer; }
  a { color: inherit; text-decoration: none; }
  ul, ol { list-style: none; }
}
```

## Banned in this stage
- Any colour values (those land in α3 TOKEN_RESET).
- Any typography (lands in β1).
- Any dock styling (lands in γ1).
- Any class names that imply content (`.sidebar`, `.topbar`, `.drawer`, `.modal`).

## Commit
```
α2: edge canvas — verified: sidebar_selectors=0 fixed_chrome=0 max_width_canvas=0 viewport_fit=cover
```

## Acceptance
- `index.html` opens in any browser; renders an empty page (correct — no tokens yet).
- All five forensic numbers verified.
- canvas.css is purely structural (no colours, no fonts, no chrome).
