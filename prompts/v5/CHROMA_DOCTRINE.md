# CHROMA DOCTRINE — Colour, Theme, Accent

> *«اللَون يَنوب عن الكَلِمة. لذلك يَجب أن يَكون قَليلاً.»*

---

## §1 — The four token families

v5 has only **four** semantic colour families. Everything is composed from these.

| Family | Purpose | Example tokens |
|---|---|---|
| `--canvas-*` | The base surface (the deepest layer) | `--canvas` |
| `--surface-*` | Raised glass surfaces (dock, cards, panels) | `--surface-0`, `--surface-1`, `--surface-2` |
| `--ink-*` | Text and iconography on those surfaces | `--ink`, `--ink-muted`, `--ink-faint` |
| `--accent-*` | Motivational accents (progress, action) | `--accent-progress`, `--accent-action` |

**No other colour tokens are permitted in shipping CSS.** Old DEVOTIO `--brand-*`, ÊLAN `--world-*`, `--ember-*`, etc. — all retired in v5. (They survive in `archive/` only.)

---

## §2 — Dark Mode (the default)

The platform is **dark-first**. Light mode is a respectful peer, not the canonical look.

```css
:root, [data-theme="dark"] {
  /* Canvas — the deep space */
  --canvas:           hsl(225 30%  8%);   /* #0B0F19  near-black with blue undertone */

  /* Surfaces — glass on space */
  --surface-0:        hsl(225 28% 12%);   /* #1A2035  the dock, the bento base */
  --surface-1:        hsl(225 24% 16%);   /* #232A3F  raised card */
  --surface-2:        hsl(225 22% 21%);   /* #2C334A  hovered card / focused panel */

  /* Inks — readable on Deep Space */
  --ink:              hsl(38  38% 96%);   /* #F7F4ED  warm-paper white */
  --ink-muted:        hsl(225 14% 70%);   /* secondary text */
  --ink-faint:        hsl(225 12% 50%);   /* placeholder, disabled */

  /* Borders — ultra-thin */
  --line:             hsla(0 0% 100% / 0.08);
  --line-strong:      hsla(0 0% 100% / 0.16);

  /* Accents — surgical */
  --accent-progress:  hsl(187 100% 50%);  /* #00E5FF  Neon Cyan */
  --accent-action:    hsl( 15 100% 60%);  /* #FF6B35  Electric Orange */

  /* Glass tint (used in surface backgrounds) */
  --glass-tint:       hsla(225 30% 12% / 0.72);

  /* Shadow plies — Glass 2.0 */
  --shadow-1: 0 1px  2px      hsla(225 30% 0% / 0.20);
  --shadow-2: 0 4px  6px -1px hsla(225 30% 0% / 0.32),
              0 2px  4px -2px hsla(225 30% 0% / 0.20);
  --shadow-3: 0 10px 15px -3px hsla(225 30% 0% / 0.40),
              0 4px  6px -4px hsla(225 30% 0% / 0.32);
}
```

---

## §3 — Light Mode (the respectful peer)

```css
[data-theme="light"] {
  --canvas:           hsl(38 28% 96%);    /* #F7F5F1  Premium Oatmeal */
  --surface-0:        hsl(38 32% 98%);    /* #FBF9F4  paper-fresh */
  --surface-1:        hsl(0  0% 100%);    /* #FFFFFF  pure white card */
  --surface-2:        hsl(38 22% 93%);    /* #EFEBE3  hovered surface */

  --ink:              hsl(225 38% 11%);   /* #0F1428  deep-ink */
  --ink-muted:        hsl(225 18% 36%);
  --ink-faint:        hsl(225 14% 55%);

  --line:             hsla(225 30% 8% / 0.06);
  --line-strong:      hsla(225 30% 8% / 0.12);

  /* Accents shift toward higher chroma in light mode for sufficient contrast */
  --accent-progress:  hsl(187 92% 38%);   /* darkened cyan; AA against light surfaces */
  --accent-action:    hsl( 15  92% 48%);  /* darkened orange; AA against light surfaces */

  --glass-tint:       hsla(0 0% 100% / 0.72);

  --shadow-1: 0 1px  2px      hsla(225 30% 12% / 0.05);
  --shadow-2: 0 4px  6px -1px hsla(225 30% 12% / 0.10),
              0 2px  4px -2px hsla(225 30% 12% / 0.06);
  --shadow-3: 0 10px 15px -3px hsla(225 30% 12% / 0.10),
              0 4px  6px -4px hsla(225 30% 12% / 0.10);
}
```

---

## §4 — Theme switching

`Upg.theme.set('dark' | 'light' | 'auto')` is the only sanctioned API. `'auto'` listens to `prefers-color-scheme`. Theme application is by setting `data-theme` on `<html>`. There is no theme transition animation by default — instant swap. Users who want a transition can opt in via `Upg.theme.set('dark', { transition: true })` which adds a 240ms fade on the canvas only (not on surfaces — they'd flicker).

`Upg.theme.cycle()` orders: `dark → light → auto → dark`. The order is preserved from v4 to keep keybinding muscle memory.

---

## §5 — The contrast contract

| Pair | Required ratio | Verifier |
|---|---|---|
| `--ink` on `--canvas` | ≥ 7:1 (AAA body) | Lighthouse `color-contrast` |
| `--ink` on `--surface-{0,1,2}` | ≥ 7:1 (AAA body) | same |
| `--ink-muted` on any surface | ≥ 4.5:1 (AA body) | same |
| `--ink-faint` on any surface | ≥ 3:1 (AA UI components) | same |
| `--accent-progress` on `--canvas` | ≥ 3:1 | same |
| `--accent-action` on `--canvas` | ≥ 4.5:1 (it's CTA text — AA body) | same |

Any colour combination that fails its required ratio is forbidden in shipping CSS. The CSS variables above are tuned to clear all rows.

---

## §6 — Forced-colors mode (Windows High Contrast etc.)

Every surface must declare an `@media (forced-colors: active)` fallback that maps to system colour keywords:

```css
@media (forced-colors: active) {
  :root {
    --canvas:           Canvas;
    --surface-0:        Canvas;
    --surface-1:        Canvas;
    --surface-2:        Canvas;
    --ink:              CanvasText;
    --ink-muted:        GrayText;
    --ink-faint:        GrayText;
    --line:             ButtonText;
    --line-strong:      ButtonText;
    --accent-progress:  Highlight;
    --accent-action:    Mark;
  }
}
```

The system tokens preserve the *role* of each element even when the user has overridden the palette.

---

## §7 — The single-accent rule per screen

Each visible screen (a route, a slide-over, a sheet — counted independently) is allowed:

- **One** `--accent-progress` element (the active progress ring on the focal training cell).
- **One** `--accent-action` element (the primary CTA).

A screen with three orange CTAs is **forbidden**. The accent is a directional signal; multiplying it negates it.

Counting is enforced at code-review by `scripts/v5_accent_audit.py`, which flags any DOM region with >1 `[data-accent="action"]` or `[data-accent="progress"]` simultaneously visible.

---

## §8 — Forbidden colour patterns

1. **Hardcoded hex** in markup or non-token CSS.
2. **`color: red` / `color: green`** — semantic accents only.
3. **Linear gradients across multiple hues** (rainbows). The single sanctioned multi-stop gradient is the skeleton shimmer (within one surface family).
4. **Hover producing a hue change** — hover is a brightness shift on the same hue (e.g. `--surface-1` → `--surface-2`).
5. **Brand chrome that overrides theme** — there is no "always-dark" or "always-light" surface in v5. Every surface respects `data-theme`.
6. **Shadows in saturated colours** — shadows are always near-black with low-chroma blue tint matching the canvas (`hsla(225 30% 0% / α)` in dark; same recipe in light with adjusted lightness). No coloured glows.
7. **Text on translucent surfaces with `--glass-tint` < 0.6** — readability requires the underlying surface to be near-opaque.
