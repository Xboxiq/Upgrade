#!/usr/bin/env python3
"""
Worker 17 / Phase 6 — Session Pacing & Mastery
================================================
DOM injector for platform/index.html.

Idempotent. Re-running produces 0 duplicates.

Inserts:
  1. <div class="block-pacing" data-pacing-for="<id>"> sibling BEFORE every
     block element with data-est-minutes >= 6 (~323 chips).
  2. <div class="page-mastery-progress" data-page-progress="<page>"> inside
     each of 13 content pages' <header class="page-h">, just before </header>.
  3. <section class="mp-heatmap-section"> inside #page-myprogress, just before
     its closing </section>.

Idempotency strategy:
  - Pacing chip: re-checked via 'data-pacing-for="<id>"' substring scan.
  - Page progress: re-checked via 'data-page-progress="<page>"' substring scan.
  - Heatmap: re-checked via 'data-mastery-heatmap-root' substring scan.

NEVER edits block text. NEVER edits prior wrappers (P2/P3/P4/P5).
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "platform" / "index.html"

CONTENT_PAGES = [
    "callcenter", "fieldsales", "accountmgr", "social", "lab",
    "psych", "eq", "negotiation", "customercare", "programming",
    "accounting", "phonerepair", "hrmastery",
]

# Match a single line that opens an element carrying data-block-id.
# We match the whole line and capture: (indent, block-id, est-minutes).
BLOCK_LINE_RE = re.compile(
    r'^(?P<indent>[ \t]*)<(?:div|section|article|aside)\b[^>]*?'
    r'data-block-id="(?P<id>[^"]+)"[^>]*?'
    r'data-est-minutes="(?P<min>\d+)"[^>]*?>'
)
# Also match the alternate attribute order (est-minutes BEFORE block-id), just in case.
BLOCK_LINE_RE_ALT = re.compile(
    r'^(?P<indent>[ \t]*)<(?:div|section|article|aside)\b[^>]*?'
    r'data-est-minutes="(?P<min>\d+)"[^>]*?'
    r'data-block-id="(?P<id>[^"]+)"[^>]*?>'
)


# ─── Pacing chip template ───────────────────────────────────────────────
def pacing_chip(block_id: str, est_min: int, indent: str) -> str:
    pad = indent
    return (
        f'{pad}<div class="block-pacing" data-pacing-for="{block_id}" data-block-est="{est_min}">\n'
        f'{pad}  <div class="block-pacing-mastery">\n'
        f'{pad}    <button class="mastery-toggle" type="button" data-mastery-for="{block_id}" data-mastery-state="not-started" aria-label="حالة الإتقان">\n'
        f'{pad}      <span class="mastery-icon" aria-hidden="true">○</span>\n'
        f'{pad}      <span class="mastery-label">لم أبدأ</span>\n'
        f'{pad}    </button>\n'
        f'{pad}  </div>\n'
        f'{pad}  <div class="block-pacing-timer">\n'
        f'{pad}    <span class="block-pacing-timer-label type-eyebrow">جلسة تركيز</span>\n'
        f'{pad}    <div class="focus-presets" role="group" aria-label="اختر مدة التركيز">\n'
        f'{pad}      <button class="focus-preset" type="button" data-focus-minutes="15" data-focus-for="{block_id}">15م</button>\n'
        f'{pad}      <button class="focus-preset" type="button" data-focus-minutes="25" data-focus-for="{block_id}">25م</button>\n'
        f'{pad}      <button class="focus-preset" type="button" data-focus-minutes="45" data-focus-for="{block_id}">45م</button>\n'
        f'{pad}    </div>\n'
        f'{pad}    <span class="focus-active" data-focus-active-for="{block_id}" hidden>\n'
        f'{pad}      <span class="focus-active-time" data-focus-time>00:00</span>\n'
        f'{pad}      <button class="focus-stop" type="button" data-focus-stop>إيقاف</button>\n'
        f'{pad}    </span>\n'
        f'{pad}  </div>\n'
        f'{pad}</div>\n'
    )


# ─── Page progress bar template ─────────────────────────────────────────
def page_progress_bar(page_id: str, totals: dict[str, int], indent: str) -> str:
    pad = indent
    total = totals["total"]
    f = totals["foundation"]
    p = totals["practitioner"]
    e = totals["expert"]
    return (
        f'{pad}<div class="page-mastery-progress" data-page-progress="{page_id}">\n'
        f'{pad}  <div class="page-mastery-progress-meta">\n'
        f'{pad}    <span class="type-eyebrow">تقدّم الإتقان</span>\n'
        f'{pad}    <span class="type-num">\n'
        f'{pad}      <span data-page-mastered-count="0">0</span> /\n'
        f'{pad}      <span data-page-total-count="{total}">{total}</span> blocks\n'
        f'{pad}    </span>\n'
        f'{pad}    <span class="type-num" aria-hidden="true">·</span>\n'
        f'{pad}    <span class="type-num">\n'
        f'{pad}      <span data-page-mastered-pct="0">0</span>%\n'
        f'{pad}    </span>\n'
        f'{pad}  </div>\n'
        f'{pad}  <div class="page-mastery-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">\n'
        f'{pad}    <div class="page-mastery-progress-fill" style="--progress: 0%" data-page-progress-fill></div>\n'
        f'{pad}  </div>\n'
        f'{pad}  <div class="page-mastery-progress-tiers">\n'
        f'{pad}    <span class="tier-marker tier-marker--foundation">\n'
        f'{pad}      <span data-tier-foundation-mastered>0</span> / <span data-tier-foundation-total>{f}</span>\n'
        f'{pad}    </span>\n'
        f'{pad}    <span class="tier-marker tier-marker--practitioner">\n'
        f'{pad}      <span data-tier-practitioner-mastered>0</span> / <span data-tier-practitioner-total>{p}</span>\n'
        f'{pad}    </span>\n'
        f'{pad}    <span class="tier-marker tier-marker--expert">\n'
        f'{pad}      <span data-tier-expert-mastered>0</span> / <span data-tier-expert-total>{e}</span>\n'
        f'{pad}    </span>\n'
        f'{pad}  </div>\n'
        f'{pad}</div>\n'
    )


# ─── Heatmap section template ───────────────────────────────────────────
def heatmap_section(indent: str) -> str:
    pad = indent
    return (
        f'{pad}<section class="mp-heatmap-section">\n'
        f'{pad}  <header class="mp-heatmap-header">\n'
        f'{pad}    <span class="type-eyebrow">إتقان شامل</span>\n'
        f'{pad}    <h2 class="type-display">خريطة الإتقان</h2>\n'
        f'{pad}    <p class="type-body-lead">تابع تقدمك عبر صفحات المحتوى.</p>\n'
        f'{pad}  </header>\n'
        f'{pad}  <div class="mastery-heatmap" data-mastery-heatmap-root>\n'
        f'{pad}    <!-- Rendered by Upg.pace.renderHeatmap() -->\n'
        f'{pad}  </div>\n'
        f'{pad}  <div class="mastery-summary">\n'
        f'{pad}    <div class="mastery-stat">\n'
        f'{pad}      <span class="mastery-stat-label type-eyebrow">إجمالي البلوكات</span>\n'
        f'{pad}      <span class="mastery-stat-value type-num-display" data-mastery-total>0</span>\n'
        f'{pad}    </div>\n'
        f'{pad}    <div class="mastery-stat">\n'
        f'{pad}      <span class="mastery-stat-label type-eyebrow">أتقنته</span>\n'
        f'{pad}      <span class="mastery-stat-value type-num-display mastery-stat-value--mastered" data-mastery-mastered>0</span>\n'
        f'{pad}    </div>\n'
        f'{pad}    <div class="mastery-stat">\n'
        f'{pad}      <span class="mastery-stat-label type-eyebrow">قيد العمل</span>\n'
        f'{pad}      <span class="mastery-stat-value type-num-display mastery-stat-value--inprogress" data-mastery-inprogress>0</span>\n'
        f'{pad}    </div>\n'
        f'{pad}    <div class="mastery-stat">\n'
        f'{pad}      <span class="mastery-stat-label type-eyebrow">ساعات تركيز</span>\n'
        f'{pad}      <span class="mastery-stat-value type-num-display" data-mastery-focus-hours>0</span>\n'
        f'{pad}    </div>\n'
        f'{pad}  </div>\n'
        f'{pad}</section>\n'
    )


# ─── Step 1: pacing chips ───────────────────────────────────────────────
def inject_pacing_chips(lines: list[str]) -> tuple[list[str], int, int]:
    """Insert pacing chips before qualifying blocks. Returns (new_lines, inserted, skipped)."""
    full = "".join(lines)
    inserted = 0
    skipped = 0
    out: list[str] = []
    for ln in lines:
        m = BLOCK_LINE_RE.match(ln) or BLOCK_LINE_RE_ALT.match(ln)
        if m:
            block_id = m.group("id")
            est = int(m.group("min"))
            if est >= 6:
                # Idempotent: skip if a pacing chip for this id already exists in the doc.
                marker = f'data-pacing-for="{block_id}"'
                if marker in full:
                    skipped += 1
                else:
                    out.append(pacing_chip(block_id, est, m.group("indent")))
                    inserted += 1
        out.append(ln)
    return out, inserted, skipped


# ─── Step 2: per-page progress bars ─────────────────────────────────────
def compute_page_totals(html: str) -> dict[str, dict[str, int]]:
    """Scan all blocks per content page and bucket by tier."""
    page_totals: dict[str, dict[str, int]] = {
        p: {"total": 0, "foundation": 0, "practitioner": 0, "expert": 0}
        for p in CONTENT_PAGES
    }
    # Match block opening tags: capture id, difficulty.
    pat = re.compile(
        r'data-block-id="([a-z]{2})-\d+"[^>]*?data-difficulty="(\d+)"|'
        r'data-difficulty="(\d+)"[^>]*?data-block-id="([a-z]{2})-\d+"'
    )
    PREFIX = {
        "cc": "callcenter", "fs": "fieldsales", "am": "accountmgr",
        "so": "social", "lb": "lab", "ps": "psych", "eq": "eq",
        "ng": "negotiation", "cu": "customercare", "pg": "programming",
        "ac": "accounting", "pr": "phonerepair", "hr": "hrmastery",
    }
    for m in pat.finditer(html):
        prefix = m.group(1) or m.group(4)
        diff = int(m.group(2) or m.group(3))
        page = PREFIX.get(prefix)
        if not page:
            continue
        tier = "foundation" if diff <= 2 else ("practitioner" if diff == 3 else "expert")
        page_totals[page]["total"] += 1
        page_totals[page][tier] += 1
    return page_totals


def inject_page_progress_bars(html: str) -> tuple[str, int, int]:
    page_totals = compute_page_totals(html)
    inserted = 0
    skipped = 0
    for page_id in CONTENT_PAGES:
        if f'data-page-progress="{page_id}"' in html:
            skipped += 1
            continue
        totals = page_totals[page_id]
        # Find <header class="page-h" data-tint="<page>"...>\n...</header>
        # Insert progress bar just before </header>.
        # Header is short (always 4-6 lines). Use a non-greedy search.
        header_re = re.compile(
            r'(<header class="page-h" data-tint="' + re.escape(page_id) + r'"[^>]*>.*?)'
            r'(\n([ \t]*)</header>)',
            re.DOTALL,
        )
        m = header_re.search(html)
        if not m:
            print(f"  [warn] header for page '{page_id}' not found", file=sys.stderr)
            continue
        indent = m.group(3) + "  "  # one level deeper than </header>
        chunk = page_progress_bar(page_id, totals, indent)
        # Insert: header_open_to_lede + "\n" + chunk + "</header>"
        new_block = m.group(1) + "\n" + chunk.rstrip() + m.group(2)
        html = html[: m.start()] + new_block + html[m.end():]
        inserted += 1
    return html, inserted, skipped


# ─── Step 3: heatmap section in page-myprogress ─────────────────────────
def inject_heatmap(html: str) -> tuple[str, bool]:
    if "data-mastery-heatmap-root" in html:
        return html, False
    # Find page-myprogress and its closing </section> (the one paired with the
    # opening section). Strategy: find the opening, then find the matching close
    # by finding the LAST </section> before the next <section ... id="page-..." OR
    # the <!-- LOADING --> banner block. Simpler: find " </section>$" line just
    # before the loading overlay div block (#loading-overlay) which comes AFTER
    # myprogress.
    open_re = re.compile(
        r'<section class="page" id="page-myprogress"[^>]*>',
    )
    om = open_re.search(html)
    if not om:
        return html, False
    after = html[om.end():]
    # Locate the matching </section> by depth tracking.
    pos = 0
    depth = 1
    next_open = re.compile(r'<section\b[^>]*>', re.IGNORECASE)
    next_close = re.compile(r'</section>', re.IGNORECASE)
    while depth > 0:
        no = next_open.search(after, pos)
        nc = next_close.search(after, pos)
        if not nc:
            return html, False
        if no and no.start() < nc.start():
            depth += 1
            pos = no.end()
        else:
            depth -= 1
            pos = nc.end()
            if depth == 0:
                close_start = om.end() + nc.start()
                close_end = om.end() + nc.end()
                # Detect indent by looking at the line containing close_start.
                line_start = html.rfind("\n", 0, close_start) + 1
                indent_str = html[line_start:close_start]
                # If the line is just whitespace before </section>, use that indent + 2 spaces.
                if indent_str.strip() == "":
                    inner_indent = indent_str + "  "
                else:
                    inner_indent = "    "
                chunk = heatmap_section(inner_indent)
                # Insert before </section>
                # Replace from line_start..close_start with chunk + indent_str
                insertion = chunk + indent_str
                new_html = html[:line_start] + insertion + html[close_start:]
                return new_html, True
    return html, False


# ─── Main ───────────────────────────────────────────────────────────────
def main() -> int:
    src = HTML.read_text(encoding="utf-8")
    orig_lines = src.count("\n")

    # Step 1
    lines = src.splitlines(keepends=True)
    lines, p_ins, p_skip = inject_pacing_chips(lines)
    src = "".join(lines)

    # Step 2
    src, b_ins, b_skip = inject_page_progress_bars(src)

    # Step 3
    src, h_done = inject_heatmap(src)

    HTML.write_text(src, encoding="utf-8")
    new_lines = src.count("\n")
    print(f"=== Worker 17 / Phase 6 — pacing & mastery injector ===")
    print(f"  pacing chips:    inserted={p_ins}  skipped={p_skip}")
    print(f"  progress bars:   inserted={b_ins}  skipped={b_skip}")
    print(f"  heatmap section: {'inserted' if h_done else 'skipped (already present)'}")
    print(f"  HTML lines: {orig_lines} -> {new_lines}  (+{new_lines - orig_lines})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
