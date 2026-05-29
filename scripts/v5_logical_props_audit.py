#!/usr/bin/env python3
"""
v5_logical_props_audit.py — enforces SPATIAL_DOCTRINE §7 RTL contract.

Walks platform-v5/assets/css/ and fails if any shipped CSS file uses
physical-direction declarations (left:/right:/margin-left etc.) that
break in RTL. Logical properties (inline-start/inline-end/block-start/
block-end) are required throughout.

Exit 0 = clean. Exit 1 = violations found.
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SCAN_ROOT = REPO_ROOT / "platform-v5" / "assets" / "css"

# Each pattern: (regex, replacement-hint)
BANNED = [
    (r"^\s*left\s*:",            "inset-inline-start: …"),
    (r"^\s*right\s*:",           "inset-inline-end: …"),
    (r"^\s*margin-left\s*:",     "margin-inline-start: …"),
    (r"^\s*margin-right\s*:",    "margin-inline-end: …"),
    (r"^\s*padding-left\s*:",    "padding-inline-start: …"),
    (r"^\s*padding-right\s*:",   "padding-inline-end: …"),
    (r"^\s*border-left\s*:",     "border-inline-start: …"),
    (r"^\s*border-right\s*:",    "border-inline-end: …"),
    (r"^\s*text-align\s*:\s*left",  "text-align: start"),
    (r"^\s*text-align\s*:\s*right", "text-align: end"),
]
COMPILED = [(re.compile(p, re.MULTILINE), hint) for p, hint in BANNED]


def strip_comments(text: str) -> str:
    """Remove /* ... */ comments so banned strings inside docs don't fire."""
    return re.sub(r"/\*[\s\S]*?\*/", "", text)


def scan_file(path: Path) -> list[str]:
    """Return list of violation messages for a single file."""
    text = path.read_text(encoding="utf-8")
    code = strip_comments(text)
    msgs: list[str] = []
    for rx, hint in COMPILED:
        for m in rx.finditer(code):
            # find line number
            line = code[:m.start()].count("\n") + 1
            snippet = code.splitlines()[line - 1].strip()
            msgs.append(f"  {path.relative_to(REPO_ROOT)}:{line}  {snippet[:120]}\n     hint → {hint}")
    return msgs


def count_logical(path: Path) -> int:
    """Count logical-property uses in the file (for the positive metric)."""
    text = strip_comments(path.read_text(encoding="utf-8"))
    return len(re.findall(
        r"\b(?:inline-start|inline-end|block-start|block-end|inset-block|inset-inline|margin-inline|padding-inline|border-inline)\b",
        text,
    ))


def main() -> int:
    if not SCAN_ROOT.exists():
        print(f"[skip] {SCAN_ROOT} does not exist yet")
        return 0

    files = sorted(SCAN_ROOT.rglob("*.css"))
    print(f"v5 logical-props audit · scanning {len(files)} file(s) under {SCAN_ROOT.relative_to(REPO_ROOT)}")
    print()

    all_violations: list[str] = []
    total_logical = 0
    for f in files:
        v = scan_file(f)
        all_violations.extend(v)
        total_logical += count_logical(f)

    if all_violations:
        print(f"✗ {len(all_violations)} physical-direction violation(s):")
        for m in all_violations:
            print(m)
        print()
        print(f"Logical-property uses (positive metric): {total_logical}")
        return 1

    print(f"✓ no physical-direction declarations")
    print(f"  files scanned          : {len(files)}")
    print(f"  logical-property uses  : {total_logical}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
