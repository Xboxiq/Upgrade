# Tajawal — Arabic UI

> **Voice role:** `--font-ui` (primary) · buttons, labels, inputs, tabs.
> **Designer:** Boutros International · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `tajawal-300.woff2` | 300 | normal | `github.com/google/fonts/raw/main/ofl/tajawal/Tajawal-Light.ttf` → woff2 |
| `tajawal-400.woff2` | 400 | normal | `github.com/google/fonts/raw/main/ofl/tajawal/Tajawal-Regular.ttf` → woff2 |
| `tajawal-500.woff2` | 500 | normal | `github.com/google/fonts/raw/main/ofl/tajawal/Tajawal-Medium.ttf` → woff2 |
| `tajawal-700.woff2` | 700 | normal | `github.com/google/fonts/raw/main/ofl/tajawal/Tajawal-Bold.ttf` → woff2 |
| `OFL.txt`           | —   | —      | `github.com/google/fonts/raw/main/ofl/tajawal/OFL.txt` |

## Subset rule

Arabic block + Arabic Presentation Forms + Latin Basic.

```
U+0600-06FF, U+0750-077F, U+0660-0669,
U+FB50-FDFF, U+FE70-FEFF,
U+0020-007F
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
