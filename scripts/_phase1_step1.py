#!/usr/bin/env python3
"""
W20 P1 Step 1 — Identify and DELETE Google Fonts links.

DELETE 3 lines from platform/index.html:
  - <link rel="preconnect" href="https://fonts.googleapis.com" />
  - <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  - <link href="https://fonts.googleapis.com/css2?..." rel="stylesheet" />

REPLACE the stylesheet line with the TASMEEM v3 inventory comment block.
Preconnect lines are deleted outright (no replacement, since Phase 2 loads
fonts locally via @font-face).

Idempotent: re-runs detect TASMEEM marker and exit 0 with "noop".
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "platform" / "index.html"

TASMEEM_MARKER = "TASMEEM v3 — Worker 20 / Phase 1"

TASMEEM_BLOCK = """\
  <!-- ════════════════════════════════════════════════════════════════════
       TASMEEM v3 — Worker 20 / Phase 1 — DEVOTIO Offline-First Mandate
       ────────────────────────────────────────────────────────────────────
       The previous Google Fonts <link> chain (3 lines: 2 preconnect +
       1 stylesheet) was DELETED on 2026-05-22 as part of Pack v3
       (DEVOTIO). The platform now lives 100% offline. Local @font-face
       declarations live in style.css (added in Phase 2) referencing
       files in platform/assets/fonts/.

       Between Phase 1 and Phase 3, system fallback applies. This is
       intentional — see prompts/v3/20_PHASE_1_FONT_FORENSICS.md.
       ════════════════════════════════════════════════════════════════════ -->"""

RE_GFONTS_STYLESHEET = re.compile(
    r'^[ \t]*<link\s+href="https://fonts\.googleapis\.com/css2\?[^"]*"\s+rel="stylesheet"\s*/>\s*$',
    re.MULTILINE,
)
RE_PRECONNECT_GOOGLE = re.compile(
    r'^[ \t]*<link\s+rel="preconnect"\s+href="https://fonts\.googleapis\.com"\s*/>\s*\n',
    re.MULTILINE,
)
RE_PRECONNECT_GSTATIC = re.compile(
    r'^[ \t]*<link\s+rel="preconnect"\s+href="https://fonts\.gstatic\.com"\s+crossorigin\s*/>\s*\n',
    re.MULTILINE,
)


def main() -> int:
    src = TARGET.read_text(encoding="utf-8")

    if TASMEEM_MARKER in src:
        print("[noop] TASMEEM marker already present — Step 1 already applied.")
        return 0

    next_ = src
    changes = 0

    if RE_GFONTS_STYLESHEET.search(next_):
        next_ = RE_GFONTS_STYLESHEET.sub(TASMEEM_BLOCK, next_, count=1)
        changes += 1
    else:
        print("[fail] Google Fonts <link rel=stylesheet> not found.", file=sys.stderr)
        return 1

    if RE_PRECONNECT_GOOGLE.search(next_):
        next_ = RE_PRECONNECT_GOOGLE.sub("", next_, count=1)
        changes += 1
    else:
        print("[warn] preconnect google not found (already gone?).", file=sys.stderr)

    if RE_PRECONNECT_GSTATIC.search(next_):
        next_ = RE_PRECONNECT_GSTATIC.sub("", next_, count=1)
        changes += 1
    else:
        print("[warn] preconnect gstatic not found (already gone?).", file=sys.stderr)

    TARGET.write_text(next_, encoding="utf-8")
    print(f"[ok] applied {changes} edits to {TARGET}")
    print(f"[size] before={len(src)} after={len(next_)} delta={len(next_) - len(src)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
