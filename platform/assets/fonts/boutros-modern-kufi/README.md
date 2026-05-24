# Boutros Modern Kufi — voice: display

Foundry: Boutros Press, Beirut
License: OFL-1.1 (file `OFL.txt` placed by bootstrap)
Source: github.com/aliftype/boutros-modern (variable build at `fonts/variable/BoutrosModernKufi[wght].ttf`)

## Role in ÊLAN v4

Display Kufi for hero / h1 / wordmark moments across:
- Hibr (dashboard, myprogress)
- Dhahab (accounting)
- Saloon (hrmastery)
- Warsha (phonerepair, customercare)

## Procurement

Sandbox cannot fetch (`INTEGRATIONS_ONLY` → 403). Operator runs:
```
bash scripts/elan-β1-fonts.sh
```
The script subsets the variable TTF down to woff2 with arabic_with_digits unicode range.

## After bootstrap

Expected file: `boutros-modern-kufi-VF.woff2` (target ≤ 90 KB).
@font-face declaration lives in `platform/assets/css/tokens/_type.css`.
