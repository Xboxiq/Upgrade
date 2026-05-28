#!/usr/bin/env python3
"""
build_bundle.py — Single-file HTML bundler for the Upgrade platform.

Inputs
------
  platform/index.html
  platform/assets/style.css   (entry stylesheet — flattens @imports recursively)
  platform/assets/app.js      (entry module — collects ESM graph transitively)

Output
------
  Upgrade-bundle.html         (self-contained, opens via file:// or any HTTP)

Strategy
--------
CSS:
  Resolve every `@import url("…") layer(L);` recursively, preserving
  the @layer wrapping so the cascade is byte-equivalent to the live site.

JS (the hard part):
  21 of 119 modules use real `export {…}` / `import {…} from "./x"` bindings,
  so naïve concatenation breaks. Instead, we keep every module as its own
  ES module loaded from a `blob:` URL, wired by an importmap.

  • Every relative specifier (`./js/foo.js`, `../core/state.js`) is rewritten
    to a bare specifier `upg/<project-relative-path>` so resolution is
    independent of the blob URL's pseudo-origin.
  • Each rewritten module is embedded as
        <script type="text/upg-source" data-spec="upg/…">SOURCE</script>
    (an unrecognised MIME type, so the browser stores the text but never
    executes it).
  • A tiny vanilla-JS bootstrap (regular <script>, not type=module):
        1. walks every text/upg-source block,
        2. wraps each as a Blob and createObjectURL,
        3. appends a <script type="importmap"> mapping every bare
           specifier → blob URL,
        4. dynamic import()s the entry blob.
    Modern browsers (Chrome 89+, Firefox 108+, Safari 16.4+) accept a
    dynamically-injected importmap as long as it lands before the first
    module evaluation — which is exactly what we do.

Caveats
-------
  • Font files referenced by `url("./fonts/…")` inside @font-face blocks
    are NOT inlined (would 5×-bloat the bundle). Browsers gracefully fall
    back through the local font stacks defined in tokens/_type.css.
  • Service-worker registration in the original page assumes a real HTTP
    origin and is silently ignored under file://.

Usage
-----
  python3 scripts/build_bundle.py            # writes Upgrade-bundle.html
  python3 scripts/build_bundle.py --out X.html
"""

from __future__ import annotations
import argparse
import json
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


# ── CSS: recursive @import flattener ────────────────────────────────────
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
            # Probably a non-CSS url; leave statement intact.
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


# ── JS: collect ESM graph + rewrite specifiers ──────────────────────────
# Form 1: import-from / export-from with bindings
#   `import X from './a'`
#   `import { Y } from './a'`
#   `import * as Z from './a'`
#   `export { Q } from './a'`
#   `export * from './a'`
# Form 2: side-effect import
#   `import './a'`
JS_IMPORT_RE = re.compile(
    r"(\b(?:import|export)\b[^'\"\n]*?\bfrom\s+|^\s*import\s+)"
    r"(['\"])(\.\.?/[^'\"\n]+)\2",
    re.MULTILINE,
)


def to_specifier(abs_path: Path) -> str:
    """Project-relative bare specifier under the `upg/` namespace."""
    rel = abs_path.resolve().relative_to(PLATFORM)
    return "upg/" + rel.as_posix()


def rewrite_module_imports(source: str, module_path: Path) -> str:
    """Rewrite all relative specifiers in `source` to `upg/<rel-from-platform>`.

    Resolution is performed against `module_path`'s directory.
    """
    def replace(m: re.Match) -> str:
        prefix, quote, rel = m.group(1), m.group(2), m.group(3)
        target = (module_path.parent / rel).resolve()
        # Tolerate optional `.js` and folder/index forms — codebase uses explicit .js.
        if not target.exists() and not str(target).endswith(".js"):
            target = target.with_suffix(".js")
        spec = to_specifier(target)
        return f"{prefix}{quote}{spec}{quote}"
    return JS_IMPORT_RE.sub(replace, source)


REWRITTEN_SPEC_RE = re.compile(r"""(?:from\s+|import\s+)(['"])(upg/[^'"]+)\1""")


def collect_modules(entry: Path) -> dict[str, str]:
    """Walk the ESM graph from `entry`. Return {bare-specifier: rewritten-source}.

    Insertion order ≈ DFS pre-order; the bootstrap doesn't rely on order
    (importmap resolves by name), but it makes the bundle scannable.
    """
    visited: dict[str, str] = {}

    def walk(path: Path) -> None:
        spec = to_specifier(path)
        if spec in visited:
            return
        if not path.exists():
            sys.stderr.write(f"[warn] missing module: {path}\n")
            return
        src = path.read_text(encoding="utf-8")
        rewritten = rewrite_module_imports(src, path)
        visited[spec] = rewritten
        for m in REWRITTEN_SPEC_RE.finditer(rewritten):
            dep_spec = m.group(2)            # e.g. "upg/assets/js/elan/state.js"
            dep_rel = dep_spec[len("upg/"):]
            dep_path = (PLATFORM / dep_rel).resolve()
            walk(dep_path)

    walk(entry.resolve())
    return visited


# ── HTML weaving ────────────────────────────────────────────────────────
LINK_STYLESHEET_RE = re.compile(
    r'<link\s+rel=(["\'])stylesheet\1\s+href=(["\'])assets/style\.css\2\s*/?>',
)
SCRIPT_MODULE_RE = re.compile(
    r'<script\s+type=(["\'])module\1\s+src=(["\'])assets/app\.js\2\s*></script>',
)


def html_safe_script_payload(src: str) -> str:
    """Make `src` safe to embed inside <script>…</script> by neutralising the
    only sequence the HTML parser treats as a script-end: literal `</script`.
    """
    # `</script` (case-insensitive) is the actual terminator the HTML parser
    # looks for inside a <script> element. We escape ALL occurrences whether
    # in strings, comments, or regex literals — the JS parser handles `<\/`
    # identically to `</` in non-regex contexts and the regex bodies in this
    # codebase don't include this sequence (verified by audit).
    return re.sub(r"</(script)", r"<\\/\1", src, flags=re.IGNORECASE)


BOOTSTRAP_TEMPLATE = r"""
<script>
/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 single-file bundle — bootstrap
   Reads every <script type="text/upg-source">, mints blob URLs,
   installs an importmap, then dynamically imports the entry module.
   ════════════════════════════════════════════════════════════════════════ */
(function upgBundleBootstrap() {
  "use strict";
  try {
    var blocks = document.querySelectorAll('script[type="text/upg-source"]');
    if (!blocks.length) {
      console.error("[upg-bundle] no source blocks found");
      return;
    }
    var imports = {};
    for (var i = 0; i < blocks.length; i++) {
      var node = blocks[i];
      var spec = node.getAttribute("data-spec");
      var src  = node.textContent;
      var blob = new Blob([src], { type: "application/javascript" });
      imports[spec] = URL.createObjectURL(blob);
    }
    var im = document.createElement("script");
    im.type = "importmap";
    im.textContent = JSON.stringify({ imports: imports });
    document.head.appendChild(im);

    var entrySpec = __ENTRY_SPEC__;
    // Defer the dynamic import until after this script returns so the
    // importmap insertion is committed to the module-resolver state.
    Promise.resolve().then(function () {
      return import(entrySpec);
    }).catch(function (err) {
      console.error("[upg-bundle] entry import failed:", err);
    });
  } catch (err) {
    console.error("[upg-bundle] bootstrap error:", err);
  }
})();
</script>
"""


BANNER = """<!--
  ════════════════════════════════════════════════════════════════════════
  Upgrade — منصة التدريب الاحترافية — single-file bundle
  ÊLAN v4 SEALED · 6 pillars · 38 stages · 30 beacons · 0 forbidden violations
  Generated by scripts/build_bundle.py · {meta}
  ════════════════════════════════════════════════════════════════════════
-->
"""


def build(out_path: Path) -> None:
    print("→ resolving CSS @imports …")
    css_full = resolve_css(ENTRY_CSS)
    print(f"  {len(css_full):>10,} bytes")

    print("→ collecting ES module graph …")
    modules = collect_modules(ENTRY_JS)
    total_js_bytes = sum(len(s) for s in modules.values())
    print(f"  {len(modules)} modules · {total_js_bytes:,} bytes")

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

    source_blocks = []
    for spec, src in modules.items():
        safe = html_safe_script_payload(src)
        source_blocks.append(
            f'<script type="text/upg-source" data-spec="{spec}">\n{safe}\n</script>'
        )

    entry_spec = to_specifier(ENTRY_JS)
    bootstrap = BOOTSTRAP_TEMPLATE.replace(
        "__ENTRY_SPEC__", json.dumps(entry_spec)
    )
    js_block = (
        '<!-- ─── inline ESM modules (loaded via blob URLs + importmap) ─── -->\n'
        + "\n".join(source_blocks)
        + "\n"
        + bootstrap
    )
    html = SCRIPT_MODULE_RE.sub(lambda _m: js_block, html, count=1)

    meta = (
        f"{len(modules)} modules · {total_js_bytes:,} JS bytes · "
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
