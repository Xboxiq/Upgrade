# β1 — TYPO HIERARCHY

**Pillar:** β (voice) · **Stage:** 1 of 3 · **Pulse:** none (β has 0 pulses by spec)

## Intent
The strict typography scale, Arabic-first stack, optimal line-heights. After β1, every text element on the platform reaches via tokens — no inline `font-size: 17px`, ever.

## Type scale (modular, fluid via `clamp(min, preferred, max)`)
| Token | Min · Preferred · Max | Use |
|---|---|---|
| `--type-display` | 36 · 5vw · 64 | hero / page hook (used sparingly) |
| `--type-h1` | 28 · 3.5vw · 44 | section title |
| `--type-h2` | 22 · 2.5vw · 32 | subsection |
| `--type-h3` | 18 · 1.8vw · 24 | card title |
| `--type-body` | 15 · 1vw · 17 | body copy |
| `--type-meta` | 13 · 0.85vw · 14 | metadata, captions |
| `--type-micro` | 11 · 0.75vw · 12 | dock labels, badges |

## Line-heights
- `--lh-tight` 1.15 (display, h1)
- `--lh-snug` 1.3 (h2, h3)
- `--lh-body` 1.6 (body — manifesto §6 mandate)
- `--lh-cosy` 1.75 (long-form prose)

## Forensic targets
- `--type-*` tokens defined : ≥ 7
- `--lh-*` tokens defined   : ≥ 4
- inline `style="font-size"` in markup : 0
- emoji in type.css : 0
- body uses `var(--font-arabic)` : ≥ 1

## Files
1. `platform-v5/assets/css/type.css` — type tokens + base typography rules (~140 lines)
2. `platform-v5/index.html` — wire `type.css` (1 line)

## Acceptance
- All 7 type tokens defined via `clamp()`
- Body line-height = 1.6 (legibility floor)
- Headers tight (1.15 / 1.3)
- `<p>` carries `max-inline-size: 68ch` for prose readability
- `text-wrap: balance` on headers, `text-wrap: pretty` on prose
