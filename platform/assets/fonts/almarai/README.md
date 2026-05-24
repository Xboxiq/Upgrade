# Almarai — voice: numeric

Foundry: Boutros Press / Khaled Hosny
License: OFL-1.1
Source: github.com/google/fonts/ofl/almarai (TTF; subset to woff2)

## Role in ÊLAN v4

Tabular numerals (Arabic-Indic + Latin) with strict baseline. Used for stats / counters / accounting kashida-thousands separator (β3 Beacon).

## Procurement

`bash scripts/elan-β1-fonts.sh` — TTF → pyftsubset → woff2.

## After bootstrap

Expected files: `almarai-400.woff2`, `almarai-700.woff2`.
@font-face in `platform/assets/css/tokens/_type.css`.
