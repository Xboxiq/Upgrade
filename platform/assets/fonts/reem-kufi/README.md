# Reem Kufi — Geometric Arabic Display

> **Voice role:** `--font-display` (primary) · large headings, hero copy.
> **Designer:** Khaled Hosny · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `reem-kufi-VF.woff2` | 400 700 (variable `wght`) | normal | `github.com/google/fonts/raw/main/ofl/reemkufi/ReemKufi[wght].ttf` → woff2 |
| `OFL.txt`            | — | — | `github.com/google/fonts/raw/main/ofl/reemkufi/OFL.txt` |

## Subset rule

Arabic block + Arabic Presentation Forms + Latin Basic.

```
U+0600-06FF, U+0750-077F, U+0660-0669,
U+FB50-FDFF, U+FE70-FEFF,
U+0020-007F
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
