# Readex Pro — Arabic Body

> **Voice role:** `--font-text` (primary) · long-form body copy, prose.
> **Designer:** Nasir Udeen · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `readex-pro-VF.woff2` | 200–700 (variable `wght`) | normal | `github.com/google/fonts/raw/main/ofl/readexpro/ReadexPro[HEXP,wght].ttf` → woff2 |
| `OFL.txt`             | — | — | `github.com/google/fonts/raw/main/ofl/readexpro/OFL.txt` |

## Subset rule

Arabic block + Arabic Presentation Forms + Latin Basic.

```
U+0600-06FF, U+0750-077F, U+0660-0669,
U+FB50-FDFF, U+FE70-FEFF,
U+0020-007F
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
