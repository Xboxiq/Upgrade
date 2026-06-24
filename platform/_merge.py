#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Merge platform/index.html + assets/style.css + assets/app.js + favicon.svg
+ manifest.webmanifest into a single self-contained HTML file.

Output: platform/upgrade.standalone.html
"""
import base64
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC_HTML = ROOT / "index.html"
SRC_CSS  = ROOT / "assets" / "style.css"
SRC_JS   = ROOT / "assets" / "app.js"
SRC_SVG  = ROOT / "favicon.svg"
SRC_MAN  = ROOT / "manifest.webmanifest"
OUT      = ROOT / "upgrade.standalone.html"

def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")

def b64_data_uri(content: str, mime: str) -> str:
    b = base64.b64encode(content.encode("utf-8")).decode("ascii")
    return f"data:{mime};base64,{b}"

def main() -> int:
    html = read(SRC_HTML)
    css  = read(SRC_CSS)
    js   = read(SRC_JS)
    svg  = read(SRC_SVG)
    man  = read(SRC_MAN)

    # --- 1) favicon: build a data URI for inline embedding -------------------
    favicon_uri  = b64_data_uri(svg, "image/svg+xml")
    manifest_uri = b64_data_uri(man, "application/manifest+json")

    # --- 2) Replace <link rel="stylesheet" href="assets/style.css"> ---------
    # Wrap CSS to neutralize any stray "</style>" inside (none expected).
    safe_css = css.replace("</style>", "<\\/style>")
    style_block = (
        "<style id=\"app-styles\" data-source=\"assets/style.css\">\n"
        + safe_css
        + "\n</style>"
    )
    pat_css = re.compile(
        r'<link\s+rel=["\']stylesheet["\']\s+href=["\']assets/style\.css["\']\s*/?>',
        re.IGNORECASE,
    )
    new_html, n = pat_css.subn(lambda _m: style_block, html, count=1)
    if n != 1:
        print("ERROR: could not find <link rel=stylesheet href=assets/style.css>", file=sys.stderr)
        return 2

    # --- 3) Replace <script src="assets/app.js" defer></script> -------------
    # Neutralize any "</script>" inside the JS (defensive).
    safe_js = js.replace("</script>", "<\\/script>")
    # Disable service-worker registration since sw.js is no longer external.
    # We rewrite the literal "navigator.serviceWorker.register('./sw.js')"
    # call into a no-op so the rest of the IIFE keeps working.
    sw_re = re.compile(r"navigator\.serviceWorker\.register\(\s*['\"]\.\/sw\.js['\"]\s*\)")
    safe_js, sw_hits = sw_re.subn(
        "Promise.reject(new Error('SW disabled in standalone bundle'))",
        safe_js,
    )
    script_block = (
        "<script id=\"app-script\" data-source=\"assets/app.js\" defer>\n"
        + safe_js
        + "\n</script>"
    )
    pat_js = re.compile(
        r'<script\s+src=["\']assets/app\.js["\']\s+defer\s*>\s*</script>',
        re.IGNORECASE,
    )
    new_html, n = pat_js.subn(lambda _m: script_block, new_html, count=1)
    if n != 1:
        print("ERROR: could not find <script src=assets/app.js defer></script>", file=sys.stderr)
        return 3

    # --- 4) Inline favicon references (3 places: icon, apple-touch, og:image) -
    new_html = re.sub(
        r'(<link\s+rel=["\']icon["\']\s+href=)["\']favicon\.svg["\']',
        lambda m: m.group(1) + f'"{favicon_uri}"',
        new_html, count=1, flags=re.IGNORECASE,
    )
    new_html = re.sub(
        r'(<link\s+rel=["\']apple-touch-icon["\']\s+href=)["\']favicon\.svg["\']',
        lambda m: m.group(1) + f'"{favicon_uri}"',
        new_html, count=1, flags=re.IGNORECASE,
    )
    # og:image keeps the relative reference (data URIs in og:image are not
    # widely supported by social crawlers); leave as-is on purpose.

    # --- 5) Inline manifest as data URI -------------------------------------
    new_html = re.sub(
        r'(<link\s+rel=["\']manifest["\']\s+href=)["\']manifest\.webmanifest["\']',
        lambda m: m.group(1) + f'"{manifest_uri}"',
        new_html, count=1, flags=re.IGNORECASE,
    )

    # --- 6) Stamp the bundle ------------------------------------------------
    stamp = (
        "<!--\n"
        "  ════════════════════════════════════════════════════════════════════\n"
        "  UPGRADE · STANDALONE BUNDLE\n"
        "  Single-file build of platform/index.html + assets/style.css\n"
        "  + assets/app.js + favicon.svg + manifest.webmanifest.\n"
        "  Service worker / offline.html are NOT bundled (require external files).\n"
        f"  CSS bytes : {len(css):,}    JS bytes : {len(js):,}\n"
        f"  SW reg disabled : {sw_hits} replacement(s)\n"
        "  ════════════════════════════════════════════════════════════════════\n"
        "-->\n"
    )
    # Place the stamp right after <!DOCTYPE html>
    new_html = re.sub(
        r"(<!DOCTYPE html>\s*)",
        lambda m: m.group(1) + stamp,
        new_html, count=1, flags=re.IGNORECASE,
    )

    OUT.write_text(new_html, encoding="utf-8")
    size_mb = OUT.stat().st_size / (1024 * 1024)
    print(f"OK -> {OUT}  ({size_mb:.2f} MB,  {len(new_html.splitlines()):,} lines)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
