# Fraunces — Literary Serif

> **Voice role:** `--font-quote-literary` · pull-quotes, blockquotes, English literary inserts.
> **Designer:** Undercase Type · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `fraunces-VF.woff2`        | 400–700 (variable `opsz,wght`) | normal | `github.com/undercasetype/Fraunces/raw/main/fonts/variable/Fraunces[SOFT,WONK,opsz,wght].ttf` → woff2 |
| `fraunces-italic-VF.woff2` | 400–700 (variable `opsz,wght`) | italic | `github.com/undercasetype/Fraunces/raw/main/fonts/variable/Fraunces-Italic[SOFT,WONK,opsz,wght].ttf` → woff2 |
| `OFL.txt`                  | — | — | `github.com/undercasetype/Fraunces/raw/main/OFL.txt` |

## Subset rule

Latin extended-A + Latin extended additional + general punctuation.

```
U+0020-024F, U+1E00-1EFF, U+2000-206F
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
