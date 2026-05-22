# JetBrains Mono — Code & Numeric Mono

> **Voice role:** `--font-mono` (primary) + `--font-num-display` (secondary).
> **Designer:** JetBrains · **License:** OFL 1.1 (SIL).

## Expected files (after bootstrap)

| File | Weight | Style | Source |
|------|-------:|-------|--------|
| `jetbrains-mono-400.woff2` | 400 | normal | `github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Regular.woff2` |
| `jetbrains-mono-500.woff2` | 500 | normal | `github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Medium.woff2` |
| `jetbrains-mono-700.woff2` | 700 | normal | `github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Bold.woff2` |
| `OFL.txt`                  | —   | —      | `github.com/JetBrains/JetBrainsMono/raw/master/OFL.txt` |

> **Note:** JetBrains publishes pre-built woff2 — no TTF→WOFF2 step needed. Subset applied to drop unused glyphs.

## Subset rule

Latin extended-A + digits + general punctuation.

```
U+0020-024F, U+0030-0039, U+2000-206F
```

Run `scripts/worker-20-bootstrap.sh` from repo root to populate this folder.
