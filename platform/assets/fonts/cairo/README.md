# Cairo — Arabic Workhorse

> **Voice role:** guaranteed fallback in every `--font-*` stack.
> **Designer:** Mohamed Gaber · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `cairo-400.woff2` | 400 | normal | `github.com/google/fonts/raw/main/ofl/cairo/static/Cairo-Regular.ttf` → woff2 |
| `cairo-600.woff2` | 600 | normal | `github.com/google/fonts/raw/main/ofl/cairo/static/Cairo-SemiBold.ttf` → woff2 |
| `cairo-700.woff2` | 700 | normal | `github.com/google/fonts/raw/main/ofl/cairo/static/Cairo-Bold.ttf` → woff2 |
| `OFL.txt`         | —   | —      | `github.com/google/fonts/raw/main/ofl/cairo/OFL.txt` |

## Subset rule

Arabic block + Arabic Presentation Forms + Latin Basic.

```
U+0600-06FF, U+0750-077F, U+0660-0669,
U+FB50-FDFF, U+FE70-FEFF,
U+0020-007F
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
