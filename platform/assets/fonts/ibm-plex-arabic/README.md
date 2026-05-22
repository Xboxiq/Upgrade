# IBM Plex Sans Arabic — Numeric & Body

> **Voice role:** `--font-numeric` (primary) · qcalc values, tabular numerals.
> Also: secondary `--font-text` voice.
> **Designer:** IBM Type · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `ibm-plex-arabic-300.woff2` | 300 | normal | `github.com/IBM/plex/raw/master/IBM-Plex-Sans-Arabic/fonts/complete/woff2/IBMPlexSansArabic-Light.woff2` |
| `ibm-plex-arabic-400.woff2` | 400 | normal | `github.com/IBM/plex/raw/master/IBM-Plex-Sans-Arabic/fonts/complete/woff2/IBMPlexSansArabic-Regular.woff2` |
| `ibm-plex-arabic-500.woff2` | 500 | normal | `github.com/IBM/plex/raw/master/IBM-Plex-Sans-Arabic/fonts/complete/woff2/IBMPlexSansArabic-Medium.woff2` |
| `ibm-plex-arabic-600.woff2` | 600 | normal | `github.com/IBM/plex/raw/master/IBM-Plex-Sans-Arabic/fonts/complete/woff2/IBMPlexSansArabic-SemiBold.woff2` |
| `ibm-plex-arabic-700.woff2` | 700 | normal | `github.com/IBM/plex/raw/master/IBM-Plex-Sans-Arabic/fonts/complete/woff2/IBMPlexSansArabic-Bold.woff2` |
| `LICENSE.txt`                | —   | —      | `github.com/IBM/plex/raw/master/LICENSE.txt` |

> **Note:** IBM Plex publishes pre-built woff2 — no TTF→WOFF2 step needed. Subset still applied to drop unused glyphs.

## Subset rule

Arabic block + Arabic Presentation Forms + Arabic-Indic digits + Latin Basic + Latin digits.

```
U+0600-06FF, U+0750-077F, U+0660-0669,
U+FB50-FDFF, U+FE70-FEFF,
U+0020-007F, U+0030-0039
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
