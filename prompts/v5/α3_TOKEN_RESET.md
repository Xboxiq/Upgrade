# α3 — TOKEN RESET

**Pillar:** α · **Stage:** 3 of 4 · **Pulse:** none

## Intent
The complete token system. `platform-v5/assets/css/tokens.css` ships every CSS variable v5 will use, in both `[data-theme="dark"]` (default) and `[data-theme="light"]` flavours.

## Token families (mandated by CHROMA + MOTION + ICONOGRAPHY doctrines)
1. **Colour** (per CHROMA §2 / §3): `--canvas`, `--surface-{0,1,2}`, `--ink`, `--ink-muted`, `--ink-faint`, `--line`, `--line-strong`, `--accent-progress`, `--accent-action`, `--glass-tint`, `--shadow-{1,2,3}`.
2. **Spacing** (modular scale, base 4px): `--space-{0,1,2,3,4,5,6,8,10,12,16}`.
3. **Radius**: `--radius-{xs,sm,md,lg,xl,full}` (xs=4 sm=8 md=12 lg=16 xl=24 full=9999).
4. **Z-index** (per SPATIAL §5): `--z-{canvas,bento-expanded,dock,scrim,overlay}`.
5. **Motion durations** (MOTION §1): `--duration-{snap,quick,emerge,morph,panel,zen,skeleton}` = 80/160/240/360/480/640/1200ms.
6. **Motion easings** (MOTION §2): `--ease-{snap,emerge,panel,spring,morph}`.
7. **Icon sizes** (ICONOGRAPHY §4): `--icon-{xs,sm,md,lg,xl,2xl}`.
8. **Canvas padding**: `--canvas-pad-{x,top,bottom}` — bottom must include `env(safe-area-inset-bottom) + dock height`.

## Forensic targets
```
hex-in-tokens                = grep -cE '#[0-9a-fA-F]{3,6}' platform-v5/assets/css/tokens.css   # expect 0 (HSL only)
duration-tokens-defined      = grep -cE '^\s*--duration-' platform-v5/assets/css/tokens.css     # expect 7
ease-tokens-defined          = grep -cE '^\s*--ease-' platform-v5/assets/css/tokens.css         # expect 5
forced-colors-block          = grep -c 'forced-colors:\s*active' platform-v5/assets/css/tokens.css # expect 1
light-theme-block            = grep -c '\[data-theme="light"\]' platform-v5/assets/css/tokens.css  # expect ≥ 1
single-accent-action-fail    = (validated at runtime, not here)
```

## Banned in this stage
- Hex colours (HSL only; the chosen format for v5 to allow OKLCH-aware tooling later).
- Hardcoded pixel durations (`200ms`, `300ms` outside the 7 tokens).
- Any `--brand-*`, `--world-*`, `--ember-*` (legacy v4 names).
- `!important` (forbidden manifesto-wide).

## Commit
```
α3: token reset — verified: hex_in_tokens=0 durations=7 easings=5 forced_colors=1
```

## Acceptance
- All 8 token families present.
- Light theme block defines the same names.
- `forced-colors: active` block maps to system keywords.
- HSL-only colour values throughout.
