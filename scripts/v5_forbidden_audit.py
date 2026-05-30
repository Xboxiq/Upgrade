#!/usr/bin/env python3
"""
v5_forbidden_audit.py — the v5 seal gate (manifesto §5 + exit criterion §6).

Walks platform-v5/ and fails (exit 1) on any v5 forbidden pattern:

  1. Emoji anywhere under platform-v5/            (manifesto §5.2 / ICONOGRAPHY §1)
  2. Hardcoded hex outside tokens.css + the
     <meta name="theme-color"> tags               (manifesto §5.14 / CHROMA §8.1)
  3. !important outside the sanctioned set
     (reduced-motion blocks + the [hidden] reset)  (manifesto §5.10)
  4. A fixed sidebar — position:fixed pinned to a
     physical side edge with a fixed width         (manifesto §5.3 / §8.2)
  5. A linear <progress> bar                       (manifesto §5.7)
  6. A toast notification surface                  (manifesto §5.6)
  7. An inline <svg viewBox> outside the sprite    (ICONOGRAPHY §3 / §8.1)
  8. A heavy backdrop blur >= 12px                 (manifesto §5.1)

Exit 0 = sealed. Exit 1 = at least one forbidden pattern present.
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
V5 = REPO_ROOT / "platform-v5"
CSS = V5 / "assets" / "css"
SPRITE = V5 / "assets" / "svg" / "icons.svg"

EMOJI_RX = re.compile(r"[\U0001F300-\U0001FAFF\u2600-\u27BF\uFE0F]")
HEX_RX = re.compile(r"#[0-9a-fA-F]{3,8}\b")


def strip_css_comments(t: str) -> str:
    return re.sub(r"/\*[\s\S]*?\*/", "", t)


def reduced_motion_spans(text: str) -> list[tuple[int, int]]:
    """Char spans of every @media (prefers-reduced-motion: reduce) { ... } block."""
    spans: list[tuple[int, int]] = []
    for m in re.finditer(r"@media[^{]*prefers-reduced-motion\s*:\s*reduce[^{]*\{", text):
        depth, i, brace0 = 0, m.end() - 1, m.start()
        while i < len(text):
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
                if depth == 0:
                    spans.append((brace0, i))
                    break
            i += 1
    return spans


def line_of(text: str, pos: int) -> int:
    return text[:pos].count("\n") + 1


def line_text(text: str, pos: int) -> str:
    start = text.rfind("\n", 0, pos) + 1
    end = text.find("\n", pos)
    return text[start: end if end != -1 else len(text)]


def main() -> int:
    if not V5.exists():
        print(f"[skip] {V5} does not exist")
        return 0

    fails: list[str] = []

    # ── 1. Emoji anywhere under platform-v5/ ───────────────────────────
    emoji_files = 0
    for f in sorted(V5.rglob("*")):
        if not f.is_file():
            continue
        try:
            txt = f.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        hits = EMOJI_RX.findall(txt)
        if hits:
            emoji_files += 1
            fails.append(f"emoji in {f.relative_to(REPO_ROOT)} ({len(hits)} hit(s))")

    # ── CSS-tree forbidden patterns ────────────────────────────────────
    css_files = sorted(CSS.rglob("*.css"))
    bang = sidebar = heavy_blur = toast_css = 0
    for f in css_files:
        code = strip_css_comments(f.read_text(encoding="utf-8"))

        # 3. !important outside the sanctioned set
        rm_spans = reduced_motion_spans(code)
        for m in re.finditer(r"!important", code):
            p = m.start()
            in_rm = any(a <= p <= b for a, b in rm_spans)
            ltxt = line_text(code, p)
            is_hidden_reset = bool(re.search(r"\[hidden\][^{}]*\{[^{}]*display\s*:\s*none", ltxt))
            if not in_rm and not is_hidden_reset:
                bang += 1
                fails.append(f"{f.relative_to(REPO_ROOT)}:{line_of(code, p)} !important (not motion-sanctuary / not [hidden] reset)")

        # 4. fixed sidebar — manifesto §8.2 signature (physical side + fixed)
        for m in re.finditer(r"position\s*:\s*fixed[\s\S]{0,400}?(?:left|right)\s*:\s*0", code):
            window = code[m.start(): m.start() + 600]
            if re.search(r"(?:width|inline-size)\s*:\s*\d", window):
                sidebar += 1
                fails.append(f"{f.relative_to(REPO_ROOT)}:{line_of(code, m.start())} fixed sidebar signature")

        # 8. heavy blur >= 12px
        for m in re.finditer(r"blur\(\s*(\d+(?:\.\d+)?)px", code):
            if float(m.group(1)) >= 12:
                heavy_blur += 1
                fails.append(f"{f.relative_to(REPO_ROOT)}:{line_of(code, m.start())} heavy blur {m.group(1)}px")

        # 6. toast selector
        if re.search(r"\.toast\b\s*[{,]", code):
            toast_css += 1
            fails.append(f"{f.relative_to(REPO_ROOT)} .toast selector (forbidden #6)")

        # 2. hardcoded hex outside tokens.css
        if f.name != "tokens.css":
            for m in HEX_RX.finditer(code):
                fails.append(f"{f.relative_to(REPO_ROOT)}:{line_of(code, m.start())} hardcoded hex {m.group(0)}")

    # ── HTML forbidden patterns (index.html and any html) ──────────────
    progress = inline_svg = html_hex = toast_html = 0
    for f in sorted(V5.rglob("*.html")):
        raw = f.read_text(encoding="utf-8")
        html = re.sub(r"<!--[\s\S]*?-->", "", raw)
        # 5. <progress>
        n = len(re.findall(r"<progress\b", html))
        if n:
            progress += n
            fails.append(f"{f.relative_to(REPO_ROOT)} <progress> bar x{n} (forbidden #7)")
        # 7. inline <svg viewBox> (sprite file is exempt; mounts use <use>)
        n = len(re.findall(r"<svg\b[^>]*viewBox", html))
        if n:
            inline_svg += n
            fails.append(f"{f.relative_to(REPO_ROOT)} inline <svg viewBox> x{n} (ICONOGRAPHY §8.1)")
        # 6. toast element
        if re.search(r'class="[^"]*\btoast\b', html):
            toast_html += 1
            fails.append(f"{f.relative_to(REPO_ROOT)} class=toast (forbidden #6)")
        # 2. hex outside the theme-color meta tags
        for m in HEX_RX.finditer(html):
            if "theme-color" not in line_text(html, m.start()):
                html_hex += 1
                fails.append(f"{f.relative_to(REPO_ROOT)}:{line_of(html, m.start())} hardcoded hex {m.group(0)}")

    # ── Report ─────────────────────────────────────────────────────────
    print(f"v5 forbidden audit · platform-v5/ ({len(css_files)} css, "
          f"{len(list(V5.rglob('*.html')))} html, sprite={'ok' if SPRITE.exists() else 'MISSING'})")
    print()
    print("  forbidden pattern                          count")
    print(f"  1. emoji (files)                           {emoji_files}")
    print(f"  2. hardcoded hex (css+html, off-token)     {sum(1 for x in fails if 'hardcoded hex' in x)}")
    print(f"  3. !important (non-sanctioned)             {bang}")
    print(f"  4. fixed sidebar signature                 {sidebar}")
    print(f"  5. <progress> bar                          {progress}")
    print(f"  6. toast surface                           {toast_css + toast_html}")
    print(f"  7. inline <svg viewBox> outside sprite     {inline_svg}")
    print(f"  8. heavy blur (>=12px)                     {heavy_blur}")
    print()

    if fails:
        print(f"\u2717 {len(fails)} forbidden-pattern violation(s):")
        for msg in fails:
            print(f"    - {msg}")
        return 1
    print("\u2713 v5 forbidden audit clean — 0 violations (sealed)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
