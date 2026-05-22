#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════════════════
# TASMEEM v3 — Worker 20 / Phase 2 — Bootstrap Orchestrator
# Runs, in order:
#   1. dependency check (curl + jq + python3 + pyftsubset)
#   2. scripts/worker-20-download-fonts.sh
#   3. scripts/worker-20-subset-fonts.py
#   4. verification (file count, payload size, license presence)
#
# This is the ONLY script the user needs to run from a machine with network.
# The Pack v3 sandbox cannot reach github.com; the agent prepared everything
# else and stopped here. After this completes, commit the populated
# platform/assets/fonts/ tree and Phase 3 unblocks.
# ════════════════════════════════════════════════════════════════════════════
set -euo pipefail

ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPTS="${ROOT}/scripts"
FONTS_DIR="${ROOT}/platform/assets/fonts"
MANIFEST="${FONTS_DIR}/MANIFEST.json"

step() { printf "\n\033[1m\u2503 %s\033[0m\n" "$*"; }
ok()   { printf "  \033[32m\u2713\033[0m %s\n" "$*"; }
warn() { printf "  \033[33m\u26a0\033[0m %s\n" "$*"; }
err()  { printf "  \033[31m\u2717\033[0m %s\n" "$*" >&2; }

# ── 1. Dependency check ─────────────────────────────────────────────────
step "1/4  dependency check"
deps_missing=0
for dep in curl jq python3; do
  if command -v "${dep}" >/dev/null 2>&1; then
    ok "${dep}"
  else
    err "${dep} missing"
    deps_missing=1
  fi
done

if command -v pyftsubset >/dev/null 2>&1; then
  ok "pyftsubset (fonttools)"
else
  warn "pyftsubset missing \u2014 install with: pip install 'fonttools[woff]' brotli"
  deps_missing=1
fi

[[ ${deps_missing} -eq 0 ]] || { err "fix missing deps and re-run"; exit 2; }
[[ -f "${MANIFEST}" ]] || { err "MANIFEST.json missing"; exit 2; }

# ── 2. Download ─────────────────────────────────────────────────────────
step "2/4  download fonts (manifest \u2192 platform/assets/fonts/)"
bash "${SCRIPTS}/worker-20-download-fonts.sh"

# ── 3. Subset ──────────────────────────────────────────────────────────
step "3/4  subset fonts (pyftsubset)"
python3 "${SCRIPTS}/worker-20-subset-fonts.py"

# ── 4. Verify ──────────────────────────────────────────────────────────
step "4/4  verify"
EXPECTED_FILES=$(jq -r '.totals.files_expected' "${MANIFEST}")
EXPECTED_LIC=$(jq -r '.totals.license_files_expected' "${MANIFEST}")
TARGET_KB=$(jq -r '.totals.target_total_size_kb_max' "${MANIFEST}")

ACTUAL_FILES=$(find "${FONTS_DIR}" -name "*.woff2" | wc -l | tr -d ' ')
ACTUAL_LIC=$(find "${FONTS_DIR}" -type f \( -name "OFL.txt" -o -name "LICENSE.txt" \) | wc -l | tr -d ' ')
TOTAL_KB=$(find "${FONTS_DIR}" -name "*.woff2" -printf "%s\n" 2>/dev/null \
  | awk '{s+=$1} END {printf "%d", s/1024}')

if [[ ${ACTUAL_FILES} -ge ${EXPECTED_FILES} ]]; then
  ok "woff2 count: ${ACTUAL_FILES}/${EXPECTED_FILES}"
else
  err "woff2 count: ${ACTUAL_FILES}/${EXPECTED_FILES} (missing files)"
  exit 1
fi

if [[ ${ACTUAL_LIC} -ge ${EXPECTED_LIC} ]]; then
  ok "license files: ${ACTUAL_LIC}/${EXPECTED_LIC}"
else
  warn "license files: ${ACTUAL_LIC}/${EXPECTED_LIC} (commit them by hand if blocked)"
fi

if [[ ${TOTAL_KB} -le ${TARGET_KB} ]]; then
  ok "payload: ${TOTAL_KB} KB (target \u2264 ${TARGET_KB} KB)"
else
  warn "payload: ${TOTAL_KB} KB > target ${TARGET_KB} KB \u2014 deepen subset"
fi

# Look for stray .src.ttf leftovers (the subsetter should remove them)
STRAY=$(find "${FONTS_DIR}" -name "*.src.ttf" 2>/dev/null | wc -l | tr -d ' ')
if [[ ${STRAY} -eq 0 ]]; then
  ok "no .src.ttf leftovers"
else
  warn "${STRAY} .src.ttf files still present \u2014 subset partial"
fi

step "done"
echo "  Next:"
echo "    git add platform/assets/fonts/"
echo "    git commit -m 'phase 2 (devotio): font binaries populated locally (${ACTUAL_FILES} files, ${TOTAL_KB} KB)'"
echo "    git push"
echo
echo "  Then resume AUTO_PILOT v3 \u2014 it will pick up Worker 20 Phase 3 (Voice Bindings)."
