# Aref Ruqaa — Calligraphic Display (Arabic)

> **Voice role:** `--font-accent` · ceremonial Arabic display, wordmarks, page-h1 ornaments.
> **Designer:** Khaled Hosny + Abdullah Aref · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `aref-ruqaa-400.woff2` | 400 | normal | `github.com/google/fonts/raw/main/ofl/arefruqaa/ArefRuqaa-Regular.ttf` → woff2 |
| `aref-ruqaa-700.woff2` | 700 | normal | `github.com/google/fonts/raw/main/ofl/arefruqaa/ArefRuqaa-Bold.ttf` → woff2 |
| `OFL.txt`              | —    | —     | `github.com/google/fonts/raw/main/ofl/arefruqaa/OFL.txt` |

## Subset rule

Arabic block + Arabic Presentation Forms A/B + Arabic-Indic digits + Latin Basic.

```
U+0600-06FF, U+0750-077F, U+0660-0669,
U+FB50-FDFF, U+FE70-FEFF,
U+0020-007F
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
