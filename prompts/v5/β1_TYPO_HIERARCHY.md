# β1 — TYPO HIERARCHY

**Pillar:** β (voice) · **Stage:** 1 of 3 · **Pulse:** none (β has no pulses)

## Intent
Install the v5 type system on top of α3's font-stack tokens. A modular **clamp()-based scale** (7 sizes), **leading / tracking / weight** token families, **Arabic-first prose defaults** with Latin-mixing rules, and an opt-in tabular-numeric voice for stats. No chrome, no components — just the words on the canvas.

## Forensic targets (β1 baseline, run before & after)
```bash
font_family_decls    = grep -cE 'font-family' platform-v5/assets/css/
clamp_count          = grep -cE 'clamp\(' platform-v5/assets/css/
prose_selectors      = grep -cE '^\s*(h[1-6]|p|blockquote|code|pre|ul|ol|li|kbd)\b' platform-v5/assets/css/type.css
new_important        = grep -cE '!important' platform-v5/assets/css/type.css       # MUST = 0
hex_in_v5_css        = grep -rcE '#[0-9a-fA-F]{3,6}' platform-v5/assets/css/        # MUST = 0
emoji_in_v5          = grep -rPc '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{FE0F}]' platform-v5/   # MUST = 0
text_size_tokens     = grep -cE '^\s*--text-' platform-v5/assets/css/tokens.css
leading_tokens       = grep -cE '^\s*--leading-' platform-v5/assets/css/tokens.css
tracking_tokens      = grep -cE '^\s*--tracking-' platform-v5/assets/css/tokens.css
weight_tokens        = grep -cE '^\s*--weight-' platform-v5/assets/css/tokens.css
type_css_lines       = wc -l platform-v5/assets/css/type.css
http_serve           = curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/platform-v5/index.html
```
Targets after β1: `font-family ≥ 4 · clamp ≥ 9 · prose-selectors ≥ 12 · new_important = 0 · hex = 0 · emoji = 0 · text-size tokens = 7 · leading = 5 · tracking = 5 · weight = 6 · type.css ≤ 280 lines · http = 200`.

## Files touched (4 max)
1. **`prompts/v5/β1_TYPO_HIERARCHY.md`** — this spec (new)
2. **`platform-v5/assets/css/tokens.css`** — extend `:root` with type-scale tokens (text/leading/tracking/weight), keeping α3 structure & layers intact
3. **`platform-v5/assets/css/type.css`** — new file in `@layer base`. Prose defaults + tabular variant + lang-aware Latin/Arabic mixing
4. **`platform-v5/index.html`** — single `<link rel="stylesheet" href="assets/css/type.css" />` after `canvas.css`

## Files NOT touched
- α3's tokens (only **extended**, never replaced)
- `_layers.css` (cascade order already complete)
- `canvas.css` (base layer's reset/dvh/safe-area survive)
- `icons.js` / sprite (α4 untouched)
- Any `platform/` (v4 legacy, sacred reference)
- `archive/`, `prompts/v[1-4]/`

## Design

### Scale (`--text-*`, 7 steps, clamp-fluid)
A modular scale based on the **perfect-fourth ratio (1.333)** with `clamp()` that ranges from 360px → 1440px viewport:

| token | min | preferred | max | use |
|---|---|---|---|---|
| `--text-xs`      | 11px | `clamp(11px, 0.7rem + 0.1vw, 12px)`  | 12px | meta, captions |
| `--text-sm`      | 13px | `clamp(13px, 0.8rem + 0.15vw, 14px)` | 14px | secondary copy |
| `--text-base`    | 15px | `clamp(15px, 0.9rem + 0.25vw, 17px)` | 17px | body |
| `--text-lg`      | 17px | `clamp(17px, 1rem + 0.35vw, 19px)`   | 19px | lead, list-headers |
| `--text-xl`      | 21px | `clamp(21px, 1.2rem + 0.55vw, 24px)` | 24px | h4, card-title |
| `--text-2xl`     | 26px | `clamp(26px, 1.4rem + 0.85vw, 32px)` | 32px | h3 |
| `--text-3xl`     | 32px | `clamp(32px, 1.6rem + 1.4vw, 44px)`  | 44px | h2 |
| `--text-4xl`     | 40px | `clamp(40px, 2rem + 2.0vw, 60px)`    | 60px | h1 |
| `--text-display` | 56px | `clamp(56px, 2.6rem + 3.4vw, 96px)`  | 96px | hero only |

(Nine slots — `xs` through `display` — but the *scale* is 7 +2 ceremonial.)

### Leading (`--leading-*`, 5 tokens)
| token | value | use |
|---|---|---|
| `--leading-tight`   | 1.10 | display, hero |
| `--leading-snug`    | 1.25 | h1–h3 |
| `--leading-normal`  | 1.45 | h4–h6, lead, ui |
| `--leading-relaxed` | 1.65 | body Arabic (default) |
| `--leading-loose`   | 1.85 | blockquote, generous prose |

### Tracking (`--tracking-*`, 5 tokens)
| token | value | use |
|---|---|---|
| `--tracking-tighter` | -0.025em | hero display |
| `--tracking-tight`   | -0.012em | h1, h2 |
| `--tracking-normal`  | 0        | body |
| `--tracking-wide`    | 0.025em  | small caps, labels |
| `--tracking-widest`  | 0.08em   | eyebrows, kbd, meta |

### Weight (`--weight-*`, 6 tokens, variable-axis ready)
`300 / 400 / 500 / 600 / 700 / 900`

### Arabic-first stack & rendering
- `body { font-family: var(--font-arabic); font-feature-settings: "kern", "liga", "calt", "rlig", "init", "medi", "fina"; font-optical-sizing: auto; }`
- Latin spans inside Arabic prose: `.latin, :lang(en) { font-family: var(--font-latin); unicode-bidi: isolate; }`
- Numeric tabular variant: `.num, [data-tabular] { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }`
- Code: `font-family: var(--font-mono); font-variant-ligatures: contextual;`
- Hyphens: `body { hyphens: auto; -webkit-hyphens: auto; }` for Arabic + Latin paragraphs

### Prose defaults
`h1, h2, h3, h4, h5, h6, p, ul, ol, li, blockquote, code, pre, kbd, hr, .u-prose` all bound to scale + leading + tracking tokens. **Logical-property only** — `margin-block-*`, `padding-inline-*`. Zero `left:`/`right:`/`top:`/`bottom:` outside the existing `_layers/canvas/tokens.css`.

### Forced-colors / reduced-motion
Type system is colour-agnostic (uses `currentColor` only). No motion. Survives both modes by construction.

## Verify
- All 12 forensic numbers re-run; before/after table printed.
- `python3 -m http.server` → `200 OK` on `index.html`, `type.css`, `tokens.css`.
- Visual smoke: hero h1 ≈ 60px on desktop, ≈ 40px on mobile (clamp lerp working).
- `grep '!important'` in `type.css` = 0.
- `grep '#[0-9a-fA-F]'` in `type.css` = 0.

## Commit
```
β1: typo hierarchy — verified: text=7 leading=5 tracking=5 weight=6 clamp=9 prose=12 important=0 hex=0 emoji=0 lines=<N> http=200
```

## Acceptance
- 7-step type scale via clamp() rendered.
- Arabic-first prose alive, Latin/numeric mixing rules in place.
- Tokens additive only (α3's tokens.css structure untouched).
- 0 new `!important`. 0 hex. 0 emoji.
- index.html loads `type.css` after `canvas.css`.
- 0 lines outside the 4 specified files.
