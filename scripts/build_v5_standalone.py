#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_v5_standalone.py — TADAFFUQ v5 single-file bundler
=========================================================
Produces ONE self-contained HTML file from platform-v5/ so the sealed
result runs on a phone straight from the filesystem (file://) with no
server, no network, and byte-exact CSS/JS/SVG.

What it does (and nothing else):
  1. Reads platform-v5/index.html as the scaffold.
  2. Concatenates the 16 CSS files (in <head> order) into one <style>,
     with _layers.css first so the @layer order is declared once.
  3. Inlines the SVG sprite into #sprite-mount (so <use href="#id"> resolves
     with no fetch).
  4. Exposes SEMANTIC_MAP.json as window.__UPG_SEMANTIC_MAP__ and patches
     ONLY icons.js boot() to read the inlined assets (the original network
     path is preserved as a fallback for http[s] serving).
  5. Inlines the 13 JS files (in defer order) as classic <script> blocks.

Faithfulness guarantees (asserted at build time):
  * No file content is edited except the icons.js boot() swap.
  * Order is preserved exactly as in index.html.
  * Aborts if any asset is missing, if a JS file contains a literal
    </script>, or if the icons.js boot() block is not matched exactly once.

Reproducible: `python3 scripts/build_v5_standalone.py`
"""

import os
import re
import sys
import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "platform-v5")
OUT = os.path.join(ROOT, "tadaffuq-v5-standalone.html")

# Order is authoritative — mirrors platform-v5/index.html exactly.
CSS_ORDER = [
    "_layers.css", "tokens.css", "type.css", "canvas.css", "dock.css",
    "dock-mobile.css", "canvas-harmonic.css", "bento.css", "bento-expand.css",
    "ring.css", "slide-over.css", "sheet.css", "overlay-choreo.css",
    "zen.css", "press.css", "match.css",
]

JS_ORDER = [
    "theme.js", "icons.js", "dock.js", "canvas-harmonic.js", "bento-expand.js",
    "ring.js", "slide-over.js", "sheet.js", "overlay-choreo.js", "zen.js",
    "press.js", "match.js", "haptic.js",
]


def read(path):
    with open(path, "r", encoding="utf-8") as fh:
        return fh.read()


def fail(msg):
    print("BUILD FAILED: " + msg, file=sys.stderr)
    sys.exit(1)


# ── icons.js boot() swap ────────────────────────────────────────────────
# The ONLY content modification in the whole bundle. The original network
# path is kept verbatim as the else-branch fallback.
OLD_BOOT = """  function boot() {
    Promise.all([
      fetchText('assets/svg/icons.svg').catch(function (e) {
        console.error('[Upg.icons] sprite fetch failed:', e);
        return null;
      }),
      fetchJson('assets/svg/SEMANTIC_MAP.json').catch(function (e) {
        console.error('[Upg.icons] semantic map fetch failed:', e);
        return null;
      })
    ]).then(function (results) {
      const spriteText = results[0];
      const mapJson    = results[1];
      if (spriteText) mountSprite(spriteText);
      if (mapJson)    MAP = mapJson;
      flushQueue();
      // δ1: auto-populate any [data-icon] elements present at boot.
      autoPopulate(document);
    });
  }"""

NEW_BOOT = """  function boot() {
    // ── Single-file bundle path (added by build_v5_standalone.py) ──────
    // Inlined into one HTML file: assets cannot be fetched over file://, so
    // the sprite is already injected into #sprite-mount and the semantic
    // map is exposed on window.__UPG_SEMANTIC_MAP__. Consume them directly.
    if (window.__UPG_SEMANTIC_MAP__) {
      MAP = window.__UPG_SEMANTIC_MAP__;
      var mnt = document.getElementById('sprite-mount');
      SPRITE_LOADED = !!(mnt && mnt.querySelector('symbol[id^="icon-"]'));
      flushQueue();
      autoPopulate(document);
      return;
    }
    // ── Network path (unchanged; used when served over http[s]) ───────
    Promise.all([
      fetchText('assets/svg/icons.svg').catch(function (e) {
        console.error('[Upg.icons] sprite fetch failed:', e);
        return null;
      }),
      fetchJson('assets/svg/SEMANTIC_MAP.json').catch(function (e) {
        console.error('[Upg.icons] semantic map fetch failed:', e);
        return null;
      })
    ]).then(function (results) {
      const spriteText = results[0];
      const mapJson    = results[1];
      if (spriteText) mountSprite(spriteText);
      if (mapJson)    MAP = mapJson;
      flushQueue();
      // δ1: auto-populate any [data-icon] elements present at boot.
      autoPopulate(document);
    });
  }"""


def build():
    if not os.path.isdir(SRC):
        fail("platform-v5/ not found at " + SRC)

    html = read(os.path.join(SRC, "index.html"))

    # ── 1. CSS blob ──────────────────────────────────────────────────────
    css_parts = []
    for name in CSS_ORDER:
        p = os.path.join(SRC, "assets", "css", name)
        if not os.path.isfile(p):
            fail("missing CSS: " + name)
        body = read(p)
        if "</style" in body.lower():
            fail("CSS file contains </style: " + name)
        css_parts.append("/* ==== platform-v5/assets/css/%s ==== */\n%s" % (name, body))
    css_blob = "\n".join(css_parts)

    # ── 2. JS blob (with icons.js boot swap) ─────────────────────────────
    js_parts = []
    for name in JS_ORDER:
        p = os.path.join(SRC, "assets", "js", name)
        if not os.path.isfile(p):
            fail("missing JS: " + name)
        body = read(p)
        if "</script" in body.lower():
            fail("JS file contains </script: " + name)
        if name == "icons.js":
            if body.count(OLD_BOOT) != 1:
                fail("icons.js boot() block not matched exactly once "
                     "(found %d) — source changed; update OLD_BOOT."
                     % body.count(OLD_BOOT))
            body = body.replace(OLD_BOOT, NEW_BOOT)
        js_parts.append(
            "<script>\n/* ==== platform-v5/assets/js/%s ==== */\n%s\n</script>"
            % (name, body)
        )
    js_blob = "\n".join(js_parts)

    # ── 3. Sprite (strip the XML prolog; keep the licence comment + svg) ──
    sprite = read(os.path.join(SRC, "assets", "svg", "icons.svg"))
    sprite = re.sub(r"^\s*<\?xml[^>]*\?>\s*", "", sprite, count=1)
    sprite = sprite.strip()

    # ── 4. Semantic map → JS global (raw JSON, parsed by the browser) ────
    semantic_json = read(os.path.join(SRC, "assets", "svg", "SEMANTIC_MAP.json")).strip()
    map_global = (
        "<script>\n"
        "/* ==== platform-v5/assets/svg/SEMANTIC_MAP.json (inlined) ==== */\n"
        "window.__UPG_SEMANTIC_MAP__ = " + semantic_json + ";\n"
        "</script>"
    )

    # ── 5. Splice into the scaffold ──────────────────────────────────────
    # 5a. Remove every external stylesheet <link>, inject one <style> at </head>.
    n_links = len(re.findall(r'[ \t]*<link rel="stylesheet" href="assets/css/[^"]+" />\n', html))
    if n_links != len(CSS_ORDER):
        fail("expected %d css <link> tags, found %d" % (len(CSS_ORDER), n_links))
    html = re.sub(r'[ \t]*<link rel="stylesheet" href="assets/css/[^"]+" />\n', "", html)
    style_block = "  <style>\n" + css_blob + "\n  </style>\n"
    html = html.replace("</head>", style_block + "</head>", 1)

    # 5b. Remove every external <script src>, inject inlined scripts at </body>.
    n_scripts = len(re.findall(r'[ \t]*<script src="assets/js/[^"]+"[^>]*></script>\n', html))
    if n_scripts != len(JS_ORDER):
        fail("expected %d js <script src> tags, found %d" % (len(JS_ORDER), n_scripts))
    html = re.sub(r'[ \t]*<script src="assets/js/[^"]+"[^>]*></script>\n', "", html)
    scripts_block = map_global + "\n" + js_blob + "\n"
    html = html.replace("</body>", scripts_block + "</body>", 1)

    # 5c. Inline the sprite into #sprite-mount.
    mount_tag = '<div id="sprite-mount" hidden aria-hidden="true"></div>'
    if mount_tag not in html:
        fail("#sprite-mount placeholder not found in index.html")
    html = html.replace(
        mount_tag,
        '<div id="sprite-mount" hidden aria-hidden="true">\n' + sprite + "\n  </div>",
        1,
    )

    # 5d. Provenance banner (HTML comment — non-rendering).
    stamp = datetime.date.today().isoformat()
    banner = (
        "<!--\n"
        "  TADAFFUQ v5 — single-file standalone bundle\n"
        "  Auto-generated from platform-v5/ by scripts/build_v5_standalone.py on %s.\n"
        "  Self-contained: all CSS/JS/SVG inlined, zero network, runs from file://.\n"
        "  Source of truth is platform-v5/. Do not hand-edit this file — rebuild it.\n"
        "-->\n" % stamp
    )
    html = html.replace("<!doctype html>", "<!doctype html>\n" + banner, 1)

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)

    # ── Build report ─────────────────────────────────────────────────────
    size_kb = os.path.getsize(OUT) / 1024.0
    print("OK  ->  %s  (%.1f KB)" % (os.path.relpath(OUT, ROOT), size_kb))
    print("    CSS files inlined : %d" % len(CSS_ORDER))
    print("    JS  files inlined : %d" % len(JS_ORDER))
    print("    sprite symbols    : %d" % sprite.count("<symbol "))
    print("    leftover externals: %d"
          % len(re.findall(r'(?:src|href)="assets/', html)))


if __name__ == "__main__":
    build()
