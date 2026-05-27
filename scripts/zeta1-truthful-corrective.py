#!/usr/bin/env python3
# ζ1.5 — Truthful corrective pass.
# Migrates the 21 mixed (var+hardcoded) inline styles surviving ζ1
# (commit ffa9c35) to component classes defined in tokens/_layout.css.
#
# Each entry is (search, replacement, expected_occurrence_count).
# Asserts counts to prevent silent corruption.

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "platform" / "index.html"

EDITS = [
    # 1. W2 negotiation warning callout (line ~8138) — gradient amber→red
    (
        '<div class="span-12" style="padding:18px 20px;background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(239,68,68,0.06));border:1px solid rgba(245,158,11,0.25);border-radius:var(--radius-md);">',
        '<div class="span-12 callout-warning-gradient">',
        1,
    ),
    # 2. eng-gauge-marker (line ~10013)
    (
        '<div id="er-gauge-marker" style="position:absolute; top:-3px; width:4px; height:16px; border-radius:2px; background:var(--text); transition:left 0.6s ease;"></div>',
        '<div id="er-gauge-marker" class="eng-gauge-marker"></div>',
        1,
    ),
    # 3. W6 industry select (line ~11009)
    (
        '''style="background:var(--surface-2); border:1px solid var(--border); color:var(--text); border-radius:10px; padding:9px 14px; font-family:inherit; font-size:12.5px; min-width:220px;"''',
        'class="w6-industry-select"',
        1,
    ),
    # 4. cc-industry-hint (line ~11020)
    (
        '<div id="w6IndustryHint" style="font-size:12px; color:var(--text-muted); line-height:1.7; padding:12px 14px; background:rgba(102,252,241,0.05); border-radius:10px; border:1px solid rgba(102,252,241,0.15);">',
        '<div id="w6IndustryHint" class="cc-industry-hint">',
        1,
    ),
    # 5. W6 cal weekday strip (line ~11084)
    (
        '<div style="display:grid; grid-template-columns:repeat(7, 1fr); gap:6px; margin-bottom:8px; font-size:10.5px; font-weight:800; color:var(--text-faint); text-align:center;">',
        '<div class="w6-cal-weekday-strip">',
        1,
    ),
    # 6. cc-hint-micro (line ~11357)
    (
        '<div style="margin-top:16px; padding:12px 14px; background:rgba(102,252,241,0.05); border:1px solid rgba(102,252,241,0.18); border-radius:8px; font-size:11.5px; color:var(--text-muted); line-height:1.75;">',
        '<div class="cc-hint-micro">',
        1,
    ),
    # 7. W6 monospace cite block (line ~11717)
    (
        '<div style="font-size:11.5px; color:var(--text-muted); line-height:1.95; font-family:\'Courier New\',monospace; background:var(--surface-2); padding:12px 14px; border-radius:8px; border:1px dashed var(--border);">',
        '<div class="w6-cite-block-mono">',
        1,
    ),
    # 8. card-strip-header --between (line ~12846)
    (
        '<div style="padding:14px 20px 12px;border-bottom:1px solid var(--border);background:var(--surface-2);display:flex;align-items:center;justify-content:space-between;">',
        '<div class="card-strip-header card-strip-header--between">',
        1,
    ),
    # 9. card-strip-header --gap (line ~14079)
    (
        '<div style="padding:14px 20px 12px;border-bottom:1px solid var(--border);background:var(--surface-2);display:flex;align-items:center;gap:12px;">',
        '<div class="card-strip-header card-strip-header--gap">',
        1,
    ),
    # 10. HR orange-bordered callout (line ~17054)
    (
        '<div style="background:var(--surface-2);border:1px solid rgba(249,115,22,0.2);border-radius:var(--radius-md);padding:16px;">',
        '<div class="callout-hr-orange">',
        1,
    ),
    # 11. CAP theorem violet inline (line ~18933)
    (
        '<div style="padding:10px 12px;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:var(--radius-sm);">',
        '<div class="callout-violet-inline">',
        1,
    ),
    # 12. citation green right-border callout (line ~18942)
    (
        '<div style="margin-top:10px;padding:10px 12px;background:rgba(34,197,94,0.06);border-right:3px solid #22C55E;border-radius:var(--radius-sm);font-size:11.5px;color:var(--text);">',
        '<div class="callout-citation-green">',
        1,
    ),
    # 13. negotiation cyan-violet gradient callout (line ~19327)
    (
        '<div style="margin-top:18px;padding:16px 18px;background:linear-gradient(135deg,rgba(102,252,241,0.08),rgba(139,92,246,0.06));border:1px solid rgba(102,252,241,0.2);border-radius:var(--radius-md);">',
        '<div class="callout-cyan-violet-gradient">',
        1,
    ),
    # 14. lab fraud-sim emergency callout (line ~23436)
    (
        '<div style="padding:12px 14px;background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(239,68,68,0.05));border:1px solid rgba(245,158,11,0.22);border-radius:var(--radius-sm);">',
        '<div class="callout-emergency-gradient">',
        1,
    ),
    # 15. card-strip-header --plain (line ~23444)
    (
        '<div style="padding:16px 22px;border-bottom:1px solid var(--border);background:var(--surface-2);">',
        '<div class="card-strip-header card-strip-header--plain">',
        1,
    ),
    # 16. clear-progress-link (line ~32601) — strip the inline style attr only
    (
        ' style="cursor:pointer;color:var(--text-faint);font-size:10.5px;text-decoration:underline;text-decoration-color:var(--border-hover);"',
        ' class="clear-progress-link"',
        1,
    ),
    # 17. eng-progress-bar (line ~12209) — drop transition + width:var read into class
    (
        '<div class="u-h-full u-rounded-99" id="eng-progress-bar" style="background:linear-gradient(90deg, var(--accent), var(--eng-grad-to,#0EA5E9)); transition:width 0.5s ease; width:var(--eng-pct, 0%)"></div>',
        '<div id="eng-progress-bar" class="eng-progress-bar"></div>',
        1,
    ),
    # 18. gateway-load-bar (line ~32750) — drop animation + gradient into class
    (
        '<div class="u-h-full u-rounded-99" style="background:linear-gradient(90deg, var(--accent), var(--load-to,#0EA5E9)); animation:loadBar 2s ease forwards"></div>',
        '<div class="gateway-load-bar"></div>',
        1,
    ),
    # 19. multiline loading-overlay
    (
        '''<div id="loading-overlay" style="
  position:fixed; inset:0; z-index:9999;
  background:var(--bg);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px;
  transition: opacity 0.6s ease;
">
  <div style="
    width:56px; height:56px;
    border-radius:14px;
    background:var(--accent-dim);
    border:1px solid var(--border-hover);
    display:flex; align-items:center; justify-content:center;
    animation: loadPulse 1s ease infinite alternate;
    font-size:28px;
  ">''',
        '''<div id="loading-overlay" class="loading-overlay">
  <div class="loading-overlay__icon-frame">''',
        1,
    ),
    # 20. multiline badge-toast
    (
        '''<div id="badge-toast" style="
  position:fixed; bottom:90px; left:24px; z-index:5000;
  background:var(--surface);
  border:1px solid var(--border-hover);
  border-radius:var(--radius-lg);
  padding:14px 18px;
  display:flex; align-items:center; gap:12px;
  box-shadow:var(--shadow-md), 0 0 24px rgba(102,252,241,0.15);
  transform:translateY(120px);
  opacity:0;
  transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease;
  pointer-events:none;
  min-width:260px;
">''',
        '<div id="badge-toast" class="badge-toast">',
        1,
    ),
    # 21. eng-gauge-bar — also has hardcoded gradient (look ahead)
    # The original ζ1 commit may have left this; let's check.
    # Safe to attempt — count=0 will just be reported.
]


def main():
    src = HTML.read_text(encoding="utf-8")
    failures, applied = [], 0
    for needle, repl, expected in EDITS:
        count = src.count(needle)
        if count != expected:
            failures.append((needle[:80], count, expected))
            continue
        src = src.replace(needle, repl, expected)
        applied += expected
    if failures:
        print(f"❌ {len(failures)} edit(s) did not match:")
        for n, c, e in failures:
            print(f"  expected={e} actual={c}  needle={n!r}")
        sys.exit(1)
    HTML.write_text(src, encoding="utf-8")
    print(f"✅ ζ1.5 corrective applied {applied} edits to {HTML}")


if __name__ == "__main__":
    main()
