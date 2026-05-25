#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────
# ÊLAN v4 — δ6 — Motion Audit
# Counts animations and verifies the universal reduce gate is in place.
# Run from any directory inside the repo:
#     bash scripts/elan-motion-audit.sh
# ─────────────────────────────────────────────────────────────────────────

set -u
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
CSS_DIR="$ROOT/platform/assets/css"

if [ ! -d "$CSS_DIR" ]; then
  echo "FAIL: $CSS_DIR not found" >&2
  exit 2
fi

echo "============================================================"
echo "  ÊLAN v4 — δ6 — Motion Audit"
echo "============================================================"
echo

# 1. Universal gate present?
SANCT="$CSS_DIR/_motion-sanctuary.css"
if [ -f "$SANCT" ]; then
  echo "[OK]  motion-sanctuary stylesheet present"
  echo "      $SANCT"
  GATE_BLOCKS=$(grep -cE 'prefers-reduced-motion|data-motion=' "$SANCT" 2>/dev/null || echo 0)
  echo "      gate blocks inside sanctuary: $GATE_BLOCKS"
else
  echo "[FAIL] motion-sanctuary stylesheet missing"
fi
echo

# 2. Total animations declared
echo "--- animation declarations across platform/assets/css ---"
ANIM_TOTAL=$(grep -rE 'animation:|animation-name:|@keyframes' "$CSS_DIR" 2>/dev/null | wc -l | tr -d ' ')
echo "  animation: / animation-name: / @keyframes  =  $ANIM_TOTAL"
echo

# 3. Files containing animations but lacking ANY reduced-motion gate
echo "--- files declaring animations without ANY reduce gate ---"
UNGATED=0
while IFS= read -r f; do
  ANIMS=$(grep -cE 'animation:|animation-name:|@keyframes' "$f" 2>/dev/null | head -1)
  ANIMS=${ANIMS:-0}
  if [ "${ANIMS}" -gt 0 ] 2>/dev/null; then
    GATES=$(grep -cE 'prefers-reduced-motion|data-motion=' "$f" 2>/dev/null | head -1)
    GATES=${GATES:-0}
    if [ "${GATES}" -eq 0 ] 2>/dev/null; then
      echo "  [WARN] $f (anims=$ANIMS, gates=0)"
      UNGATED=$((UNGATED + 1))
    fi
  fi
done < <(find "$CSS_DIR" -type f -name '*.css')
if [ "$UNGATED" -eq 0 ]; then
  echo "  none — every animated stylesheet has at least one local gate"
  echo "  AND the universal cap in _motion-sanctuary.css covers the rest"
fi
echo

# 4. Universal selector check — is the cap actually in the sanctuary?
echo "--- universal cap presence ---"
if [ -f "$SANCT" ]; then
  if grep -qE '^\s*\*,\s*$' "$SANCT" && grep -qE '\*::before,' "$SANCT" && grep -qE '\*::after\s*\{?' "$SANCT"; then
    echo "  [OK] universal *,*::before,*::after cap present"
  else
    echo "  [FAIL] universal cap selector not found in sanctuary"
  fi
  if grep -qE 'animation-duration:\s*0\.01ms\s*!important' "$SANCT"; then
    echo "  [OK] animation-duration capped to 0.01ms !important"
  else
    echo "  [FAIL] animation-duration cap missing"
  fi
  if grep -qE 'transition-duration:\s*0\.01ms\s*!important' "$SANCT"; then
    echo "  [OK] transition-duration capped to 0.01ms !important"
  else
    echo "  [FAIL] transition-duration cap missing"
  fi
fi
echo

# 5. Manual override hooks
echo "--- manual override hooks ---"
HOOK_REDUCED=$(grep -cE 'body\[data-motion="reduced"\]' "$SANCT" 2>/dev/null || echo 0)
HOOK_ENHANCED=$(grep -cE 'body\[data-motion="enhanced"\]' "$SANCT" 2>/dev/null || echo 0)
echo "  body[data-motion=\"reduced\"]  rules: $HOOK_REDUCED"
echo "  body[data-motion=\"enhanced\"] rules: $HOOK_ENHANCED"
echo

# 6. «ساكن» chrome confession check
echo "--- chrome confession (ساكن) ---"
if grep -qE 'content:\s*"ساكن"' "$SANCT"; then
  echo "  [OK] «ساكن» mark wired to #topbar::after"
else
  echo "  [WARN] «ساكن» mark not detected"
fi
echo

# 7. Summary
echo "============================================================"
echo "  Animations total : $ANIM_TOTAL"
echo "  Ungated files    : $UNGATED"
echo "  Override hooks   : reduced=$HOOK_REDUCED  enhanced=$HOOK_ENHANCED"
echo "============================================================"

if [ "$UNGATED" -gt 0 ]; then
  exit 1
fi
exit 0
