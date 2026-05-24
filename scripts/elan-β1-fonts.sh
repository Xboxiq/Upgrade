#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════════════
# ÊLAN v4 — β1 — Local Font Procurement (verified)
# ────────────────────────────────────────────────────────────────────────
# Reads platform/assets/fonts/MANIFEST.json and downloads each declared
# font file into its family folder. Subsets ttf -> woff2 with pyftsubset
# when source_format is ttf or ttf-variable.
#
# Run from repo root or any subdirectory; uses `git rev-parse` to locate.
# Idempotent: skips files that already exist and are > 10KB on disk.
#
# Sandbox AI cannot run this (network 403). Operator runs locally where
# ordinary HTTPS reaches github / 29lt / sil.
# ════════════════════════════════════════════════════════════════════════

set -euo pipefail

# ─── Locate repo and manifest ─────────────────────────────────────────
ROOT="$(git rev-parse --show-toplevel)"
FONTS_DIR="$ROOT/platform/assets/fonts"
MANIFEST="$FONTS_DIR/MANIFEST.json"

if [[ ! -f "$MANIFEST" ]]; then
  echo "❌ MANIFEST.json not found at $MANIFEST"; exit 1
fi

# ─── Tooling probes ───────────────────────────────────────────────────
if ! command -v jq >/dev/null 2>&1; then
  echo "❌ jq is required (apt-get install jq / brew install jq)"; exit 1
fi
if ! command -v curl >/dev/null 2>&1; then
  echo "❌ curl is required"; exit 1
fi
if ! command -v pyftsubset >/dev/null 2>&1; then
  echo "ℹ️  pyftsubset missing — installing fonttools/brotli/zopfli via pip --user"
  if command -v pip3 >/dev/null 2>&1; then
    pip3 install --user fonttools brotli zopfli >/dev/null
  elif command -v pip >/dev/null 2>&1; then
    pip install --user fonttools brotli zopfli >/dev/null
  else
    echo "❌ python pip not found; install fonttools manually."; exit 1
  fi
  if ! command -v pyftsubset >/dev/null 2>&1; then
    PATH="$HOME/.local/bin:$PATH"
    if ! command -v pyftsubset >/dev/null 2>&1; then
      echo "❌ pyftsubset still not on PATH after install."; exit 1
    fi
  fi
fi

# ─── Stats counters ───────────────────────────────────────────────────
TOTAL_EXPECTED=$(jq '[.families[].files[]] | length' "$MANIFEST")
DOWNLOADED=0
SKIPPED=0
FAILED=0

echo "📥 ÊLAN β1 — Font Procurement"
echo "   manifest:  $MANIFEST"
echo "   target:    $FONTS_DIR"
echo "   expected:  $TOTAL_EXPECTED files"
echo ""

# ─── Iterate families ─────────────────────────────────────────────────
jq -c '.families[]' "$MANIFEST" | while IFS= read -r family; do
  fid=$(echo "$family" | jq -r .id)
  fdir="$FONTS_DIR/$fid"
  mkdir -p "$fdir"

  echo "▸ $fid"

  echo "$family" | jq -c '.files[]' | while IFS= read -r file; do
    url=$(echo "$file" | jq -r '.source_url')
    out=$(echo "$file" | jq -r '.out')
    fmt=$(echo "$file" | jq -r '.source_format')
    target="$fdir/$out"

    # idempotent skip
    if [[ -f "$target" ]] && [[ $(wc -c < "$target") -gt 10000 ]]; then
      echo "   ✓ $out   (skip — exists)"
      continue
    fi

    case "$fmt" in
      woff2)
        echo "   ⬇ $out   (woff2 direct)"
        if curl -fsSL --retry 2 "$url" -o "$target" 2>/dev/null; then
          : # ok
        else
          echo "     ↻ trying fallback static urls"
          ok=0
          fb_count=$(echo "$file" | jq -r '.fallback_static_urls // [] | length')
          if [[ "$fb_count" -gt 0 ]]; then
            for i in $(seq 0 $((fb_count - 1))); do
              fb=$(echo "$file" | jq -r ".fallback_static_urls[$i]")
              tmp="$(mktemp -t elan-${fid}-XXXXXX.ttf)"
              if curl -fsSL --retry 1 "$fb" -o "$tmp" 2>/dev/null; then
                _subset_target=$(jq -r --arg s "$(echo "$family" | jq -r .subset)" \
                  '.subset_targets[$s]' "$MANIFEST")
                pyftsubset "$tmp" \
                  --output-file="$target" \
                  --flavor=woff2 \
                  --unicodes="$_subset_target" \
                  --layout-features='*' \
                  --notdef-outline --recommended-glyphs >/dev/null
                rm -f "$tmp"
                echo "     ✓ subset from fallback #$((i+1))"
                ok=1; break
              fi
            done
          fi
          if [[ "$ok" -eq 0 ]]; then
            echo "     ✗ failed: $out"; continue
          fi
        fi
        ;;
      ttf|otf|ttf-variable)
        echo "   ⬇ $out   (subset $fmt → woff2)"
        tmp="$(mktemp -t elan-${fid}-XXXXXX.${fmt%-variable})"
        if ! curl -fsSL --retry 2 "$url" -o "$tmp" 2>/dev/null; then
          echo "     ✗ download failed: $url"; rm -f "$tmp"; continue
        fi
        _subset_target=$(jq -r --arg s "$(echo "$family" | jq -r .subset)" \
          '.subset_targets[$s]' "$MANIFEST")
        pyftsubset "$tmp" \
          --output-file="$target" \
          --flavor=woff2 \
          --unicodes="$_subset_target" \
          --layout-features='*' \
          --notdef-outline --recommended-glyphs >/dev/null || {
            echo "     ✗ subset failed"; rm -f "$tmp"; continue;
          }
        rm -f "$tmp"
        ;;
      *)
        echo "     ✗ unknown format: $fmt"; continue
        ;;
    esac
  done

  # ─── License placement ─────────────────────────────────────────────
  lic_url=$(echo "$family" | jq -r '.license_url')
  lic_name=$(echo "$family" | jq -r '.license_filename // "OFL.txt"')
  if [[ -n "$lic_url" && "$lic_url" != "null" && ! -f "$fdir/$lic_name" ]]; then
    curl -fsSL --retry 1 "$lic_url" -o "$fdir/$lic_name" 2>/dev/null \
      || echo "     ⚠ license fetch skipped: $lic_url"
  fi
done

# ─── Verify ───────────────────────────────────────────────────────────
ACTUAL=$(find "$FONTS_DIR" -name "*.woff2" 2>/dev/null | wc -l | tr -d ' ')
TOTAL_KB=$(du -sk "$FONTS_DIR" 2>/dev/null | awk '{print $1}')

echo ""
echo "════════════════════════════════════════════════"
echo "📊 ÊLAN β1 — Procurement Verification"
echo "   expected   ≥ $TOTAL_EXPECTED  files"
echo "   on disk    = $ACTUAL          files"
echo "   total size ≈ $TOTAL_KB        KB"
echo "════════════════════════════════════════════════"

if [[ "$ACTUAL" -ge "$TOTAL_EXPECTED" ]]; then
  echo "✅ β1 procurement complete"
  exit 0
else
  echo "⚠️  Some families failed — re-run, or vendor binaries manually."
  exit 1
fi
