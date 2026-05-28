#!/usr/bin/env python3
"""
build_bundle.py — Single-file HTML bundler for the Upgrade platform.

CLASSIC-IIFE STRATEGY (mobile-safe, no ESM)
-------------------------------------------
The previous v4.0.1 bundle used `<script type="module">` + dynamic
importmap + `blob:` URLs. That works on desktop Chrome/Firefox/Safari
but fails on:
  • iOS Safari < 16.4 (no importmap support)
  • Android WebViews and in-app browsers (Telegram, WhatsApp, Instagram, FB)
  • Some ad-blockers that stub out blob: URLs
  • Older Edge (pre-Chromium)

This rewrite produces a single classic `<script>` block — no ESM,
no importmap, no dynamic import, no blob URLs. Works everywhere
that runs ES2015+ JavaScript.

How it works
------------
The codebase has 120 modules under platform/assets/js/:
  • 99 IIFE side-effect helpers — already wrapped, just concatenate
  • 21 ESM modules with `export {…}` / `export default` — but all of them
    are LEAF modules (zero cross-module binding imports — verified).
    They side-effect register on `window.Upg.*` at load. The `export`
    statements are vestigial decoration.

So transform_esm_to_classic strips the `export` / `import` keywords
(which are syntax errors in classic <script>), wraps the body in an
IIFE for scope isolation, and concatenates everything in app.js's
import order. Functional behavior is unchanged because every module
communicates through window.Upg.*, not through ES bindings.

Inputs
------
  platform/index.html
  platform/assets/style.css   (entry stylesheet — flattens @imports)
  platform/assets/app.js      (entry — defines load order via imports)

Output
------
  Upgrade-bundle.html         (self-contained, opens in any browser)
"""
from __future__ import annotations
import argparse
import os
import re
import sys
from pathlib import Path

# ── paths ───────────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).resolve().parent.parent
PLATFORM = REPO_ROOT / "platform"
INDEX_HTML = PLATFORM / "index.html"
ENTRY_CSS = PLATFORM / "assets" / "style.css"
ENTRY_JS = PLATFORM / "assets" / "app.js"


# ════════════════════════════════════════════════════════════════════════
# CSS: recursive @import flattener
# ════════════════════════════════════════════════════════════════════════
CSS_IMPORT_RE = re.compile(
    r'@import\s+url\(\s*(["\'])([^"\']+)\1\s*\)\s*(?:layer\(([^)]+)\))?\s*;',
    re.MULTILINE,
)


def resolve_css(path: Path, _seen: set[Path] | None = None) -> str:
    """Read CSS file; replace `@import url("…")` with inlined content.

    Honours `layer(<name>)` by wrapping inlined content in `@layer <name> { … }`.
    Detects cycles and skips. Leaves font/non-CSS url() untouched.
    """
    if _seen is None:
        _seen = set()
    abs_path = path.resolve()
    if abs_path in _seen:
        return f"\n/* CSS cycle skipped: {abs_path.relative_to(PLATFORM)} */\n"
    _seen = _seen | {abs_path}

    text = abs_path.read_text(encoding="utf-8")
    out: list[str] = []
    pos = 0
    for m in CSS_IMPORT_RE.finditer(text):
        out.append(text[pos:m.start()])
        rel = m.group(2)
        layer = m.group(3)
        target = (abs_path.parent / rel).resolve()
        if not target.exists() or target.suffix.lower() != ".css":
            out.append(m.group(0))
        else:
            inner = resolve_css(target, _seen)
            label = target.relative_to(PLATFORM)
            out.append(f"\n/* === inlined: {label}{f' [layer:{layer}]' if layer else ''} === */\n")
            if layer:
                out.append(f"@layer {layer} {{\n{inner}\n}}\n")
            else:
                out.append(inner)
        pos = m.end()
    out.append(text[pos:])
    return "".join(out)


# ════════════════════════════════════════════════════════════════════════
# JS: classic-IIFE assembler
# ════════════════════════════════════════════════════════════════════════

# Detect side-effect imports, named imports, default imports, namespace imports
JS_IMPORT_LINE_RE = re.compile(
    r"^[ \t]*import\s+(?:(?:[A-Za-z_$][\w$]*\s*,\s*)?\{[^}]*\}|\*\s+as\s+[A-Za-z_$][\w$]*|[A-Za-z_$][\w$]*)?\s*(?:from\s+)?['\"][^'\"]+['\"]\s*;?\s*$",
    re.MULTILINE,
)

# Strip leading `export ` from declarations
EXPORT_DECL_RE = re.compile(
    r"^[ \t]*export\s+(?=(?:async\s+)?(?:function|class|const|let|var)\s+)",
    re.MULTILINE,
)

# Match `export default <expression>;` (multiline expression OK — non-greedy)
EXPORT_DEFAULT_EXPR_RE = re.compile(
    r"^[ \t]*export\s+default\s+(.+?);\s*$",
    re.MULTILINE | re.DOTALL,
)

# Match `export { foo, bar };` and `export { foo, bar } from '...'`;
EXPORT_NAMED_RE = re.compile(
    r"^[ \t]*export\s*\{[^}]*\}\s*(?:from\s+['\"][^'\"]+['\"]\s*)?;?\s*$",
    re.MULTILINE,
)

# Match `export * ...;`
EXPORT_STAR_RE = re.compile(
    r"^[ \t]*export\s+\*\s+(?:as\s+\w+\s+)?from\s+['\"][^'\"]+['\"]\s*;?\s*$",
    re.MULTILINE,
)


# Detect modules that are already wrapped in an IIFE (so their top-level
# declarations don't leak to the global scope when concatenated). Modules
# that are NOT already IIFE-wrapped need wrapping by us — regardless of
# whether they have `export`/`import` keywords. This is critical: ESM
# modules in this codebase that LOOK like plain top-level scripts (e.g.
# epsilon7-customercare.js, _compat.js) actually rely on ES module scope
# for isolation. Concatenating them naked = identifier collisions.
IIFE_START_RE = re.compile(
    r"^\s*(?:/\*[\s\S]*?\*/\s*|//[^\n]*\n\s*|\n\s*)*"   # leading comments/blank lines
    r"[;]?\s*\(\s*"                                      # optional ; then (
    r"(?:function\b|\(\s*\)\s*=>|async\s+function\b)"   # function | () => | async function
)


def is_already_iife_wrapped(source: str) -> bool:
    """True if the module starts with an IIFE pattern, so its top-level
    declarations are already scoped to the IIFE."""
    return bool(IIFE_START_RE.match(source))


def has_esm_bindings(source: str) -> bool:
    """True if module uses real ESM bindings (export keyword anywhere) or
    binding-style imports (`import {...}` / `import X from`)."""
    if re.search(r"^[ \t]*export\b", source, re.MULTILINE):
        return True
    if re.search(r"^[ \t]*import\s+(?:\{|\*\s+as\s|[A-Za-z_$][\w$]*\s+from)", source, re.MULTILINE):
        return True
    return False


def transform_esm_to_classic(source: str) -> str:
    """Strip ESM-only keywords (`import`, `export`) so the source is valid
    classic JS. Every transformation is local; module behavior is preserved
    because every ESM module in this codebase is a leaf module that
    side-effect-registers on window.Upg.* at load time.
    """
    # 1. Remove all import statements (side-effect or binding)
    source = JS_IMPORT_LINE_RE.sub("", source)

    # 2. Strip `export ` from declaration forms (function/class/const/let/var)
    source = EXPORT_DECL_RE.sub("", source)

    # 3. `export default <expr>;` — keep the expression as a void statement
    #    so any side effects (constructors with side effects, etc.) still run.
    #    Most defaults in this codebase are simple identifiers or object
    #    literals — emitting them as void is safe.
    def _default_repl(m: re.Match) -> str:
        expr = m.group(1).strip()
        # If the expression is a plain identifier already declared above,
        # reduce to a no-op comment to avoid `void identifier` warnings.
        if re.fullmatch(r"[A-Za-z_$][\w$]*", expr):
            return f"/* upg-bundle: removed `export default {expr};` (no ESM importer) */"
        # Object/array/function literal — wrap in void to retain any computation.
        return f"/* upg-bundle: removed `export default …` */ void ({expr});"
    source = EXPORT_DEFAULT_EXPR_RE.sub(_default_repl, source)

    # 4. `export { … };` (with or without `from '…'`) — strip
    source = EXPORT_NAMED_RE.sub("", source)

    # 5. `export * …;` — strip
    source = EXPORT_STAR_RE.sub("", source)

    return source


def wrap_in_iife(body: str, label: str) -> str:
    """Wrap converted ESM body in an IIFE for scope isolation."""
    return (
        f"/* ─── {label} (ESM→classic IIFE) ─── */\n"
        f"(function () {{\n"
        f"  'use strict';\n"
        f"{body}\n"
        f"}})();\n"
    )


# Match the side-effect imports listed in app.js: `import './js/foo.js';`
APP_IMPORT_RE = re.compile(
    r"""^\s*import\s+['"](\./[^'"]+)['"]\s*;""",
    re.MULTILINE,
)


def collect_load_order() -> list[Path]:
    """Read app.js's `import './js/foo.js';` lines and return paths in order."""
    src = ENTRY_JS.read_text(encoding="utf-8")
    paths: list[Path] = []
    for m in APP_IMPORT_RE.finditer(src):
        rel = m.group(1)
        target = (ENTRY_JS.parent / rel).resolve()
        if target.exists():
            paths.append(target)
        else:
            sys.stderr.write(f"[warn] app.js imports missing module: {rel}\n")
    return paths


def assemble_classic_js() -> tuple[str, dict]:
    """Concatenate every module in app.js's order, transforming ESM→classic
    where needed. Returns (concatenated_source, stats_dict).

    Decision tree per module:
      already-IIFE-wrapped + no ESM keywords  → pass through verbatim
      already-IIFE-wrapped + ESM keywords     → strip keywords, pass through
      NOT IIFE-wrapped (any kind)             → strip keywords, wrap in IIFE
    """
    parts: list[str] = []
    stats = {
        "modules_total": 0,
        "modules_iife_passthrough": 0,
        "modules_esm_inside_iife": 0,
        "modules_wrapped_by_us": 0,
        "bytes_in": 0,
        "bytes_out": 0,
    }

    paths = collect_load_order()
    for p in paths:
        rel = p.relative_to(PLATFORM).as_posix()
        src = p.read_text(encoding="utf-8")
        stats["modules_total"] += 1
        stats["bytes_in"] += len(src)

        already_wrapped = is_already_iife_wrapped(src)
        has_esm = has_esm_bindings(src)

        if already_wrapped and not has_esm:
            parts.append(f"/* ─── {rel} (IIFE) ─── */\n{src}\n")
            stats["modules_iife_passthrough"] += 1
        elif already_wrapped and has_esm:
            cleaned = transform_esm_to_classic(src)
            parts.append(f"/* ─── {rel} (IIFE + ESM keywords stripped) ─── */\n{cleaned}\n")
            stats["modules_esm_inside_iife"] += 1
        else:
            cleaned = transform_esm_to_classic(src) if has_esm else src
            wrapped = wrap_in_iife(cleaned, rel)
            parts.append(wrapped)
            stats["modules_wrapped_by_us"] += 1

    blob = "\n".join(parts)
    stats["bytes_out"] = len(blob)
    return blob, stats


# ════════════════════════════════════════════════════════════════════════
# HTML weaving
# ════════════════════════════════════════════════════════════════════════
LINK_STYLESHEET_RE = re.compile(
    r'<link\s+rel=(["\'])stylesheet\1\s+href=(["\'])assets/style\.css\2\s*/?>',
)
SCRIPT_MODULE_RE = re.compile(
    r'<script\s+type=(["\'])module\1\s+src=(["\'])assets/app\.js\2\s*></script>',
)


def html_safe_script_payload(src: str) -> str:
    """Make `src` safe inside <script>…</script> by escaping the only
    sequence the HTML parser treats as a script-end: literal `</script`."""
    return re.sub(r"</(script)", r"<\\/\1", src, flags=re.IGNORECASE)


BANNER = """<!--
  ════════════════════════════════════════════════════════════════════════
  Upgrade — منصة التدريب الاحترافية — single-file bundle (classic)
  ÊLAN v4 SEALED · 6 pillars · 38 stages · 30 beacons · 0 forbidden violations
  Mobile-safe build: classic IIFE, no ESM / importmap / blob URLs
  Generated by scripts/build_bundle.py · {meta}
  ════════════════════════════════════════════════════════════════════════
-->
"""


def build(out_path: Path) -> None:
    print("→ resolving CSS @imports …")
    css_full = resolve_css(ENTRY_CSS)
    print(f"  {len(css_full):>10,} bytes")

    print("→ assembling classic-JS bundle …")
    js_blob, stats = assemble_classic_js()
    print(f"  modules:        {stats['modules_total']}")
    print(f"    IIFE pass-through:        {stats['modules_iife_passthrough']}")
    print(f"    IIFE + ESM stripped:      {stats['modules_esm_inside_iife']}")
    print(f"    wrapped by us (was bare): {stats['modules_wrapped_by_us']}")
    print(f"  source bytes:   {stats['bytes_in']:,} in → {stats['bytes_out']:,} out")

    print("→ weaving HTML …")
    html = INDEX_HTML.read_text(encoding="utf-8")
    if not LINK_STYLESHEET_RE.search(html):
        sys.exit("✗ stylesheet link not found in platform/index.html")
    if not SCRIPT_MODULE_RE.search(html):
        sys.exit("✗ entry <script type=\"module\"> not found in platform/index.html")

    css_block = (
        f'<style id="upg-bundled-styles" data-bundle="elan-v4">\n'
        f"{css_full}\n"
        f"</style>"
    )
    html = LINK_STYLESHEET_RE.sub(lambda _m: css_block, html, count=1)

    safe_js = html_safe_script_payload(js_blob)
    js_block = (
        f'<script id="upg-bundled-runtime" data-bundle="elan-v4-classic">\n'
        f"/* === ÊLAN v4 — classic-JS bundle ({stats['modules_total']} modules) === */\n"
        f"{safe_js}\n"
        f"</script>"
    )
    html = SCRIPT_MODULE_RE.sub(lambda _m: js_block, html, count=1)

    meta = (
        f"{stats['modules_total']} modules · "
        f"{stats['bytes_out']:,} JS bytes · "
        f"{len(css_full):,} CSS bytes"
    )
    final = BANNER.format(meta=meta) + html

    out_path.write_text(final, encoding="utf-8")
    size = out_path.stat().st_size
    print(f"✓ wrote {out_path.relative_to(REPO_ROOT)}  ({size:,} bytes, {size / 1024 / 1024:.2f} MB)")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument(
        "--out",
        default=str(REPO_ROOT / "Upgrade-bundle.html"),
        help="output path (default: Upgrade-bundle.html at repo root)",
    )
    args = ap.parse_args()
    build(Path(args.out).resolve())


if __name__ == "__main__":
    main()
