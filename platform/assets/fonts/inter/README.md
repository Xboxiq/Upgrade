# Inter — Latin UI

> **Voice role:** `--font-latin` (primary) · `:lang(en)` Latin text inside body, brand spans, KPIs.
> **Designer:** Rasmus Andersson · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `inter-VF.woff2` | 100–900 (variable `wght`) | normal | `github.com/rsms/inter/raw/master/docs/font-files/Inter-Variable.woff2` |
| `OFL.txt`        | — | — | `github.com/rsms/inter/raw/master/LICENSE.txt` |

> **Note:** Inter publishes pre-built woff2 — no TTF→WOFF2 step needed. Subset applied to drop unused glyphs.

## Subset rule

Latin extended-A + Latin extended additional + general punctuation + currency.

```
U+0020-024F, U+1E00-1EFF, U+2000-206F, U+20AC
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
