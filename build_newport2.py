#!/usr/bin/env python3
"""
build_newport2.py
─────────────────────────────────────────────────────────────────────────────
Merges the entire Upgrade platform (CSS @import chain + 90 ESM-imported JS
side-effect modules + index.html) into ONE self-contained HTML file at:

    /projects/sandbox/Upgrade/Newport2/Newport2.html

Designed for offline mobile testing — no external requests required.

Strategy:
  1. Read platform/index.html as the base shell.
  2. Replace `<link rel="stylesheet" href="assets/style.css">` with a single
     `<style>` block that inlines tokens.css → base.css → utilities.css →
     chrome.css → pages.css → motion.css inside their respective @layer
     declarations, plus the inline `@layer themes { ... }` block extracted
     from style.css.
  3. Replace `<script type="module" src="assets/app.js"></script>` with a
     sequence of `<script>` blocks containing every JS file referenced by
     app.js, in the exact source order. All modules are IIFE-style so they
     run safely as classic scripts (no top-level import/export anywhere).
  4. Drop `<link rel="manifest" ...>` (manifest.webmanifest not bundled).
  5. Embed favicon.svg as a data: URI so the browser tab icon still works
     when the file is opened from any directory or via file://.
  6. Inject a tiny banner so devs can see they are on the test bundle.

Output: a single HTML file (~4–5 MB) that runs identically to the live
platform on a phone over either http://, https:// or file:// schemes.
"""

from __future__ import annotations

import base64
import os
import re
import sys
from pathlib import Path

# ─────────────────────────── Paths ───────────────────────────
ROOT      = Path("/projects/sandbox/Upgrade")
PLATFORM  = ROOT / "platform"
ASSETS    = PLATFORM / "assets"
CSS_DIR   = ASSETS / "css"
JS_DIR    = ASSETS / "js"
INDEX     = PLATFORM / "index.html"
STYLE_CSS = ASSETS / "style.css"
APP_JS    = ASSETS / "app.js"
FAVICON   = PLATFORM / "favicon.svg"

OUT_DIR   = ROOT / "Newport2"
OUT_FILE  = OUT_DIR / "Newport2.html"

# Order MUST match style.css @import chain (and their layer assignments).
CSS_FILES_IN_ORDER = [
    ("tokens.css",    "tokens"),
    ("base.css",      "base"),
    ("utilities.css", "components"),
    ("chrome.css",    "components"),
    ("pages.css",     "components"),
    ("motion.css",    "components"),
]


def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8")


# ───────────────────── 1. CSS pipeline ─────────────────────
def build_inline_css() -> str:
    """Reproduces the cascade described in platform/assets/style.css."""
    style_src = read_text(STYLE_CSS)

    # Extract the inline `@layer themes { ... }` block from style.css.
    # We need the OUTER braces of that @layer, balanced.
    themes_match = re.search(r"@layer\s+themes\s*\{", style_src)
    themes_block = ""
    if themes_match:
        i = themes_match.end()  # right after the opening `{`
        depth = 1
        while i < len(style_src) and depth > 0:
            ch = style_src[i]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
            i += 1
        # i now points just past the closing `}` of @layer themes.
        themes_block = style_src[themes_match.start():i]
    else:
        print("WARN: @layer themes block not found in style.css", file=sys.stderr)

    parts: list[str] = []
    parts.append("/* ═══════════════════════════════════════════════════════════════")
    parts.append("   Newport2 — inlined CSS (replaces assets/style.css + 6 imports)")
    parts.append("   ═══════════════════════════════════════════════════════════════ */")
    # Layer order declaration (identical to style.css).
    parts.append("@layer reset, tokens, base, utilities, components, themes, overrides;")
    parts.append("")

    for fname, layer in CSS_FILES_IN_ORDER:
        path = CSS_DIR / fname
        css = read_text(path)
        parts.append(f"/* ─── inlined: assets/css/{fname}  →  @layer {layer} ─── */")
        parts.append(f"@layer {layer} {{")
        parts.append(css)
        parts.append("}")
        parts.append("")

    parts.append("/* ─── inlined: assets/style.css → @layer themes (inline block) ─── */")
    parts.append(themes_block)
    parts.append("")

    return "\n".join(parts)


# ───────────────────── 2. JS pipeline ─────────────────────
JS_IMPORT_RE = re.compile(
    r"^\s*import\s+['\"]\./js/([A-Za-z0-9_\-]+\.js)['\"]\s*;?\s*$",
    re.MULTILINE,
)


def parse_app_js_order() -> list[str]:
    """Return the exact ordered list of JS files imported by app.js."""
    src = read_text(APP_JS)
    files = JS_IMPORT_RE.findall(src)
    if not files:
        raise RuntimeError("Failed to parse imports from app.js")
    return files


def safe_close_script(js: str) -> str:
    """
    A naive `</script>` inside JS source would terminate the host script tag.
    Break those sequences without changing semantics. The IIFEs we are
    inlining occasionally include `</script>` only inside string literals,
    so the canonical safe substitution is `</scr` + `ipt>`.
    """
    return js.replace("</script", "</scr\\ipt").replace("<\\/script", "<\\/scr\\ipt")


def build_inline_js() -> str:
    files = parse_app_js_order()
    out: list[str] = []
    out.append("<!-- ════════════════════════════════════════════════════════════")
    out.append(f"     Newport2 — inlined JS (replaces assets/app.js + {len(files)} modules)")
    out.append("     Modules execute in EXACT source order; all are IIFEs and")
    out.append("     install side-effects on window.Upg.* (no ES module syntax).")
    out.append("     ════════════════════════════════════════════════════════════ -->")

    for fname in files:
        path = JS_DIR / fname
        if not path.is_file():
            print(f"WARN: missing JS file {fname}", file=sys.stderr)
            continue
        js = read_text(path)
        js = safe_close_script(js)
        out.append(f"<!-- inlined: assets/js/{fname} -->")
        out.append("<script>")
        out.append(js)
        out.append("</script>")

    # _compat.js imported at the bottom of app.js
    compat_path = JS_DIR / "_compat.js"
    if compat_path.is_file():
        # _compat is already counted via JS_IMPORT_RE above? Yes — app.js has
        # `import './js/_compat.js';` so it's included by parse_app_js_order.
        pass
    return "\n".join(out)


# ─────────────────── 3. Favicon → data URI ───────────────────
def favicon_data_uri() -> str:
    raw = FAVICON.read_bytes()
    b64 = base64.b64encode(raw).decode("ascii")
    return f"data:image/svg+xml;base64,{b64}"


# ─────────────────── 4. Compose Newport2.html ───────────────────
def build_newport2() -> None:
    base_html = read_text(INDEX)

    # ─── Hard sanity checks on the markers we are about to replace ───
    css_link    = '<link rel="stylesheet" href="assets/style.css">'
    js_module   = '<script type="module" src="assets/app.js"></script>'
    icon_link   = '<link rel="icon" href="favicon.svg" type="image/svg+xml" />'
    apple_icon  = '<link rel="apple-touch-icon" href="favicon.svg" />'
    manifest_l  = '<link rel="manifest" href="manifest.webmanifest" />'

    for marker in (css_link, js_module, icon_link, apple_icon, manifest_l):
        if marker not in base_html:
            print(f"WARN: marker not found verbatim → {marker!r}", file=sys.stderr)

    # ─── Banner injected just before </body> ───
    banner_html = (
        "\n<!-- Newport2 test bundle — single-file build of the Upgrade platform -->\n"
        "<noscript>"
        "<div style=\"position:fixed;inset:auto 0 0 0;padding:14px 18px;"
        "background:#0E1220;color:#66FCF1;font:600 14px/1.5 system-ui,sans-serif;"
        "text-align:center;z-index:99999\">"
        "هذه النسخة التجريبية تحتاج تشغيل JavaScript لتعمل بشكل كامل."
        "</div></noscript>\n"
    )

    inline_css = build_inline_css()
    inline_js  = build_inline_js()
    fav_uri    = favicon_data_uri()

    # ─── Substitutions ───
    new_html = base_html

    # 1. Replace the CSS <link> with an inline <style> block.
    style_tag = (
        "<!-- Newport2: inlined CSS bundle (style.css + 6 layer files) -->\n"
        "<style id=\"newport2-css-bundle\">\n"
        + inline_css.replace("</style", "<\\/style")  # paranoia, normally absent
        + "\n</style>"
    )
    new_html = new_html.replace(css_link, style_tag, 1)

    # 2. Replace the module script with the inlined JS sequence.
    new_html = new_html.replace(js_module, inline_js, 1)

    # 3. Embed favicon as data URI (both icon + apple-touch-icon).
    new_html = new_html.replace(
        icon_link,
        f'<link rel="icon" href="{fav_uri}" type="image/svg+xml" />',
        1,
    )
    new_html = new_html.replace(
        apple_icon,
        f'<link rel="apple-touch-icon" href="{fav_uri}" />',
        1,
    )

    # 4. Drop the manifest link (no manifest in the bundle).
    new_html = new_html.replace(
        manifest_l,
        "<!-- Newport2: manifest.webmanifest not bundled -->",
        1,
    )

    # 5. Inject the banner right before </body>.
    new_html = new_html.replace("</body>", banner_html + "</body>", 1)

    # 6. Touch <html> tag for clarity (optional flag, helps debugging).
    new_html = new_html.replace(
        '<html lang="ar" dir="rtl" class="v13">',
        '<html lang="ar" dir="rtl" class="v13" data-newport2="bundle">',
        1,
    )

    # ─── Emit ───
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(new_html, encoding="utf-8")

    size = OUT_FILE.stat().st_size
    print(f"✓ wrote {OUT_FILE}  ({size:,} bytes  ≈ {size/1024/1024:.2f} MB)")


if __name__ == "__main__":
    build_newport2()
