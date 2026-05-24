# Amiri Quran Colored — voice: accent

Foundry: Khaled Hosny
License: OFL-1.1
Source: github.com/aliftype/amiri (TTF; subset to woff2)

## Role in ÊLAN v4

Quranic accent only — never used for body. Reserved for signature moments / Quranic ayat citations.

## Procurement

`bash scripts/elan-β1-fonts.sh`. Subset target: arabic_quranic (U+0600–06FF + U+08A0–08FF + U+FB50–FDFF + U+FE70–FEFF).

## After bootstrap

Expected file: `amiri-quran-colored.woff2`.
@font-face in `platform/assets/css/tokens/_type.css`.
