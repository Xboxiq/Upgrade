#!/usr/bin/env python3
"""Quick sanity check on Upgrade-bundle.html."""
import re
from pathlib import Path

BUNDLE = Path(__file__).resolve().parent.parent / "Upgrade-bundle.html"
content = BUNDLE.read_text(encoding="utf-8")

print(f"file size: {BUNDLE.stat().st_size:,} bytes")
print(f"lines:     {content.count(chr(10)):,}")
print()

# basic markers
checks = {
    "<style id=\"upg-bundled-styles\":   ": content.count('<style id="upg-bundled-styles"'),
    "<script type=\"text/upg-source\":   ": content.count('type="text/upg-source"'),
    "upgBundleBootstrap fn:             ": content.count("upgBundleBootstrap"),
    "remaining link href=assets/style:  ": content.count('href="assets/style.css"'),
    "remaining script src=assets/app:   ": content.count('src="assets/app.js"'),
    "remaining @import url(:            ": len(re.findall(r"@import\s+url\(", content)),
    "bare specifiers in importmap-able pos:  ": len(re.findall(r"""['"]upg/assets/""", content)),
    "<style> total open tags:           ": len(re.findall(r"<style[\s>]", content)),
}
for k, v in checks.items():
    print(f"  {k}{v}")
print()

# pull app.js block
m = re.search(
    r'<script type="text/upg-source" data-spec="upg/assets/app\.js">\s*\n(.*?)\n</script>',
    content,
    re.DOTALL,
)
if m:
    src = m.group(1)
    side_effect = re.findall(r"^import\s+['\"]upg/[^'\"]+['\"]", src, re.MULTILINE)
    print(f"app.js side-effect imports rewritten: {len(side_effect)}")
    for s in side_effect[:3]:
        print("   ", s)
    print("    ...")
    for s in side_effect[-3:]:
        print("   ", s)
else:
    print("FAIL: app.js block not found")

print()

# pull world.js (a real ESM module with named exports)
m = re.search(
    r'<script type="text/upg-source" data-spec="upg/assets/js/elan/world\.js">\s*\n(.*?)\n</script>',
    content,
    re.DOTALL,
)
if m:
    src = m.group(1)
    rel_imports = re.findall(r"^(?:import|export)[^\n]*['\"][^'\"]+['\"]", src, re.MULTILINE)
    print(f"world.js import/export lines:")
    for s in rel_imports[:8]:
        print("   ", s.strip())
else:
    print("FAIL: world.js block not found")

print()

# pull core/compat.js
m = re.search(
    r'<script type="text/upg-source" data-spec="upg/assets/js/core/compat\.js">\s*\n(.*?)\n</script>',
    content,
    re.DOTALL,
)
if m:
    src = m.group(1)
    rel_imports = re.findall(r"^(?:import|export)[^\n]*['\"][^'\"]+['\"]", src, re.MULTILINE)
    print(f"core/compat.js import/export lines:")
    for s in rel_imports[:5]:
        print("   ", s.strip())

print()

# residual relative imports? (should be 0)
residual = re.findall(r"^(?:import|export)[^\n]*['\"](\.\.?/[^'\"]+)['\"]", content, re.MULTILINE)
print(f"residual unresolved relative ESM specifiers: {len(residual)}")
if residual[:10]:
    for s in residual[:10]:
        print("    ", s)

# importmap presence (should be in bootstrap, not in raw HTML — bootstrap creates dynamically)
print()
print(f'static <script type="importmap"> tags: {content.count(chr(34)+"importmap"+chr(34))}'
      ' (expected 0; importmap is built dynamically at runtime)')

# verify no raw </script in source-blocks would terminate early
suspicious = re.findall(r'<script type="text/upg-source"[^>]*>(.*?)</script>', content, re.DOTALL)
bad = sum(1 for s in suspicious if '</script' in s.lower())
print(f'source blocks with stray </script inside body: {bad} (expected 0)')
