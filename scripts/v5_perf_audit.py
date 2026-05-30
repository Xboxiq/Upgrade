#!/usr/bin/env python3
"""
v5_perf_audit.py — static performance gate for TADAFFUQ v5 (stage θ1).

Lighthouse needs a browser + network; CI/humans record the runtime score in
state/LIGHTHOUSE_REPORT.md. This script verifies the *static signals* that
feed a good mobile-performance score, so regressions are caught without a
browser — and never asserts a number it did not measure (manifesto §6).

FAIL (exit 1) on any of:
  - a CSS `url(...)` external request   (no external fonts/images budget)
  - a CSS `@import`                     (render-blocking request chain)
  - a heavy `backdrop-filter: blur(N)` with N >= 12px  (manifesto §5.1)
  - a `<script src=...>` without `defer`/`async`  (parser-blocking)
  - an inline `style="..."` attribute in index.html  (cascade discipline)
  - a missing `<script data-theme-bootstrap>` FOUC guard  (CHROMA §4)

REPORT (non-failing):
  - render-blocking stylesheet <link> count
  - always-on `will-change` count vs budget (12)
  - content-visibility usage

Exit 0 = within budget. Exit 1 = regression.
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
V5_ROOT = REPO_ROOT / "platform-v5"
CSS_ROOT = V5_ROOT / "assets" / "css"
INDEX = V5_ROOT / "index.html"

WILL_CHANGE_BUDGET = 12


def strip_css_comments(text: str) -> str:
    return re.sub(r"/\*[\s\S]*?\*/", "", text)


def strip_html_comments(text: str) -> str:
    return re.sub(r"<!--[\s\S]*?-->", "", text)


def main() -> int:
    if not V5_ROOT.exists():
        print(f"[skip] {V5_ROOT} does not exist")
        return 0

    failures: list[str] = []
    notes: list[str] = []

    # ── CSS-tree checks ────────────────────────────────────────────────
    css_files = sorted(CSS_ROOT.rglob("*.css"))
    url_hits = import_hits = heavy_blur = will_change = content_vis = 0
    for f in css_files:
        code = strip_css_comments(f.read_text(encoding="utf-8"))
        for m in re.finditer(r"url\(", code):
            url_hits += 1
            failures.append(f"{f.relative_to(REPO_ROOT)}: external url() request")
        for m in re.finditer(r"@import", code):
            import_hits += 1
            failures.append(f"{f.relative_to(REPO_ROOT)}: @import render-blocking chain")
        for m in re.finditer(r"blur\(\s*(\d+(?:\.\d+)?)px", code):
            if float(m.group(1)) >= 12:
                heavy_blur += 1
                failures.append(f"{f.relative_to(REPO_ROOT)}: heavy blur {m.group(1)}px (>=12, manifesto §5.1)")
        will_change += len(re.findall(r"will-change\s*:", code))
        content_vis += len(re.findall(r"content-visibility\s*:", code))

    # ── index.html checks ──────────────────────────────────────────────
    blocking_css = non_deferred = inline_style = bootstrap = 0
    if INDEX.exists():
        raw = INDEX.read_text(encoding="utf-8")
        html = strip_html_comments(raw)
        blocking_css = len(re.findall(r'<link[^>]+rel="stylesheet"', html))
        # external scripts must carry defer or async
        for m in re.finditer(r"<script\b([^>]*)>", html):
            attrs = m.group(1)
            if "src=" in attrs and "defer" not in attrs and "async" not in attrs:
                non_deferred += 1
                failures.append("index.html: <script src> without defer/async (parser-blocking)")
        inline_style = len(re.findall(r"\sstyle=", html))
        if inline_style:
            failures.append(f"index.html: {inline_style} inline style= attribute(s)")
        bootstrap = len(re.findall(r"data-theme-bootstrap", html))
        if bootstrap == 0:
            failures.append("index.html: missing <script data-theme-bootstrap> FOUC guard (CHROMA §4)")
    else:
        failures.append("index.html not found")

    if will_change > WILL_CHANGE_BUDGET:
        notes.append(f"will-change count {will_change} exceeds budget {WILL_CHANGE_BUDGET} (review for always-on layers)")

    # ── Report ─────────────────────────────────────────────────────────
    print(f"v5 perf audit · {len(css_files)} css file(s) under {CSS_ROOT.relative_to(REPO_ROOT)}")
    print()
    print("  signal                         value   status")
    print(f"  css url() external requests    {url_hits:<6}  {'FAIL' if url_hits else 'ok'}")
    print(f"  @import chains                 {import_hits:<6}  {'FAIL' if import_hits else 'ok'}")
    print(f"  heavy blur (>=12px)            {heavy_blur:<6}  {'FAIL' if heavy_blur else 'ok'}")
    print(f"  non-deferred <script src>      {non_deferred:<6}  {'FAIL' if non_deferred else 'ok'}")
    print(f"  inline style= attributes       {inline_style:<6}  {'FAIL' if inline_style else 'ok'}")
    print(f"  FOUC theme bootstrap present   {bootstrap:<6}  {'ok' if bootstrap else 'FAIL'}")
    print(f"  render-blocking css <link>     {blocking_css:<6}  info")
    print(f"  always-on will-change          {will_change:<6}  {'warn' if will_change > WILL_CHANGE_BUDGET else 'ok'} (budget {WILL_CHANGE_BUDGET})")
    print(f"  content-visibility uses        {content_vis:<6}  info")
    print()

    if failures:
        print(f"\u2717 {len(failures)} perf regression(s):")
        for msg in failures:
            print(f"    - {msg}")
        return 1
    if notes:
        for n in notes:
            print(f"\u26a0 {n}")
    print("\u2713 static perf signals within budget")
    print("  (runtime Lighthouse Mobile Performance is recorded by human/CI in state/LIGHTHOUSE_REPORT.md)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
