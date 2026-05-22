#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════════════════
# TASMEEM v3 — Worker 20 / Phase 2 — Font Downloader (Tier 1)
# Reads platform/assets/fonts/MANIFEST.json. Downloads every entry into its
# family folder. Idempotent: skips files that already exist with non-zero size.
# Pure curl + jq. Run once, on a machine with network. Never run inside the
# sandbox (network is INTEGRATIONS_ONLY there).
# ════════════════════════════════════════════════════════════════════════════
set -euo pipefail

ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="${ROOT}/platform/assets/fonts/MANIFEST.json"
FONTS_DIR="${ROOT}/platform/assets/fonts"

# ── Pre-flight ────────────────────────────────────────────────────────────
[[ -f "${MANIFEST}" ]] || { echo "✗ MANIFEST.json not found at ${MANIFEST}" >&2; exit 2; }
command -v curl >/dev/null || { echo "✗ curl is required" >&2; exit 2; }
command -v jq   >/dev/null || { echo "✗ jq is required (brew install jq / apt install jq)" >&2; exit 2; }

echo "🅰️  TASMEEM downloader — reading $(basename "${MANIFEST}")"
echo

FAMILIES_TOTAL=$(jq '.families | length' "${MANIFEST}")
FILES_TOTAL=$(jq '[.families[].files[]] | length' "${MANIFEST}")
LICENSE_TOTAL=$(jq '[.families[] | select(.license_url != null)] | length' "${MANIFEST}")
echo "   families: ${FAMILIES_TOTAL}"
echo "   font files expected: ${FILES_TOTAL}"
echo "   license files expected: ${LICENSE_TOTAL}"
echo

DOWNLOADED=0
SKIPPED=0
FAILED=0

# ── Per-family loop ──────────────────────────────────────────────────────
jq -c '.families[]' "${MANIFEST}" | while read -r family; do
  ID=$(jq -r '.id' <<<"${family}")
  CSS_NAME=$(jq -r '.css_name' <<<"${family}")
  LICENSE_URL=$(jq -r '.license_url // empty' <<<"${family}")
  LICENSE_FILENAME=$(jq -r '.license_filename // "OFL.txt"' <<<"${family}")

  FAMILY_DIR="${FONTS_DIR}/${ID}"
  mkdir -p "${FAMILY_DIR}"
  echo "── ${CSS_NAME} (${ID}) ──────────────"

  # ── Files ──
  jq -c '.files[]' <<<"${family}" | while read -r entry; do
    SOURCE_URL=$(jq -r '.source_url' <<<"${entry}")
    OUT_NAME=$(jq -r '.out' <<<"${entry}")
    SOURCE_FORMAT=$(jq -r '.source_format' <<<"${entry}")

    # If source is woff2, write directly to final filename.
    # If source is ttf*, write to .src.ttf for the subset step to convert.
    case "${SOURCE_FORMAT}" in
      woff2)        OUT_PATH="${FAMILY_DIR}/${OUT_NAME}" ;;
      ttf|ttf-variable)
                    OUT_PATH="${FAMILY_DIR}/${OUT_NAME%.woff2}.src.ttf" ;;
      *)            echo "  ✗ unknown source_format: ${SOURCE_FORMAT}" >&2; exit 3 ;;
    esac

    if [[ -s "${OUT_PATH}" ]]; then
      echo "  ⤷ skip (exists): $(basename "${OUT_PATH}")"
      SKIPPED=$((SKIPPED+1))
      continue
    fi

    echo "  ⇣ ${SOURCE_URL}"
    echo "    → $(basename "${OUT_PATH}")"
    if curl --fail --silent --show-error --location \
            --connect-timeout 30 --max-time 300 \
            --output "${OUT_PATH}" \
            "${SOURCE_URL}"; then
      DOWNLOADED=$((DOWNLOADED+1))
    else
      echo "  ✗ download failed for ${SOURCE_URL}" >&2
      rm -f "${OUT_PATH}"
      FAILED=$((FAILED+1))
    fi
  done

  # ── License ──
  if [[ -n "${LICENSE_URL}" ]]; then
    LICENSE_PATH="${FAMILY_DIR}/${LICENSE_FILENAME}"
    if [[ -s "${LICENSE_PATH}" ]]; then
      echo "  ⤷ skip (exists): ${LICENSE_FILENAME}"
    else
      echo "  ⇣ ${LICENSE_URL}"
      echo "    → ${LICENSE_FILENAME}"
      if ! curl --fail --silent --show-error --location \
                --connect-timeout 30 --max-time 60 \
                --output "${LICENSE_PATH}" \
                "${LICENSE_URL}"; then
        echo "  ✗ license download failed (non-fatal)" >&2
        rm -f "${LICENSE_PATH}"
      fi
    fi
  fi
  echo
done

echo "── summary ──────────────────────"
echo "   downloaded: ${DOWNLOADED}"
echo "   skipped:    ${SKIPPED}"
echo "   failed:     ${FAILED}"
echo
if [[ ${FAILED} -gt 0 ]]; then
  echo "✗ Some downloads failed. Re-run after restoring network, or fix MANIFEST.json URLs." >&2
  exit 1
fi

echo "✓ Download complete. Next: scripts/worker-20-subset-fonts.py"
