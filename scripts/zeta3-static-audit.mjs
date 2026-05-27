#!/usr/bin/env node
/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ζ3 — Static A11y + Performance Audit
   ────────────────────────────────────────────────────────────────────────
   The sandbox where this AUTO_PILOT runs has no Chrome/Chromium and
   network=INTEGRATIONS_ONLY (no `npm i lighthouse`). Therefore the
   *runtime* Lighthouse measurement portion of ζ3 is deferred to the
   user's local environment.

   This script provides the *static* counterpart: deterministic grep
   audits over platform/index.html and the CSS tree. Findings are
   written to state/LIGHTHOUSE_REPORT.md (overwrites prior section
   for ζ3, append-friendly thereafter).

   Honesty rule: this script reports raw counts, not Lighthouse scores.
   No claim of "perf=92" / "a11y=96" is made anywhere in the output —
   those numbers only enter PROGRESS.json after a real Lighthouse run
   in user env.
   ════════════════════════════════════════════════════════════════════════ */

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const HTML = path.join(ROOT, 'platform', 'index.html');
const CSS_DIR = path.join(ROOT, 'platform', 'assets', 'css');
const REPORT = path.join(ROOT, 'state', 'LIGHTHOUSE_REPORT.md');

const html = fs.readFileSync(HTML, 'utf8');

const collectCss = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectCss(p));
    else if (entry.name.endsWith('.css')) out.push(p);
  }
  return out;
};
const cssFiles = collectCss(CSS_DIR);
const allCss = cssFiles.map(p => fs.readFileSync(p, 'utf8')).join('\n');

const count = (s, re) => (s.match(re) || []).length;

/* ── A11y signal counts ─────────────────────────────────────────────── */
const aria_label   = count(html, /aria-label="[^"]+"/g);
const aria_hidden  = count(html, /aria-hidden="(?:true|false)"/g);
const aria_live    = count(html, /aria-live="[^"]+"/g);
const aria_labelledby = count(html, /aria-labelledby="[^"]+"/g);
const role_attr    = count(html, /role="[a-z]+"/g);

const lang_html = /<html[^>]*\blang="[a-z-]+"/.test(html);
const dir_html  = /<html[^>]*\bdir="(?:rtl|ltr)"/.test(html);
const viewport  = /<meta[^>]*name="viewport"[^>]*>/.test(html);
const skip_link = count(html, /class="[^"]*u-skip-link/g);

const h1 = count(html, /<h1[ >]/g);
const h2 = count(html, /<h2[ >]/g);
const h3 = count(html, /<h3[ >]/g);

const img_total = count(html, /<img\b/g);
const img_alt   = count(html, /<img[^>]*\balt="[^"]*"/g);
const img_no_alt = img_total - img_alt;

const inputs_total = count(html, /<input\b/g);
const inputs_with_id = count(html, /<input[^>]*\bid="[^"]+"/g);
const labels_for     = count(html, /<label[^>]*\bfor="[^"]+"/g);
const inputs_with_aria_label = count(html, /<input[^>]*\baria-label(?:ledby)?="[^"]+"/g);

const tabindex_neg = count(html, /tabindex="-1"/g);
const tabindex_zero = count(html, /tabindex="0"/g);
const tabindex_pos = count(html, /tabindex="[1-9][0-9]*"/g);

const focus_visible_rules = count(allCss, /:focus-visible\b/g);
const reduced_motion_guards = count(allCss, /@media[^{]*prefers-reduced-motion:\s*reduce/g);
const forced_colors_guards = count(allCss, /@media[^{]*forced-colors:\s*active/g);
const print_guards = count(allCss, /@media[^{]*\bprint\b/g);

/* ── Perf signal counts ─────────────────────────────────────────────── */
const preload_links = count(html, /<link[^>]*rel="preload"/g);
const preconnect_links = count(html, /<link[^>]*rel="preconnect"/g);
const dns_prefetch_links = count(html, /<link[^>]*rel="dns-prefetch"/g);
const stylesheet_links = count(html, /<link[^>]*rel="stylesheet"/g);
const inline_scripts = count(html, /<script(?![^>]*\bsrc=)[^>]*>/g);
const external_scripts = count(html, /<script[^>]*\bsrc=/g);
const module_scripts = count(html, /<script[^>]*\btype="module"/g);
const defer_scripts = count(html, /<script[^>]*\bdefer\b/g);
const async_scripts = count(html, /<script[^>]*\basync\b/g);
const lazy_imgs = count(html, /<img[^>]*\bloading="lazy"/g);

const html_kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
const css_kb = (Buffer.byteLength(allCss, 'utf8') / 1024).toFixed(1);

/* ── PWA / SW signals ──────────────────────────────────────────────── */
const manifest_link = count(html, /<link[^>]*rel="manifest"/g);
const sw_register = count(html, /serviceWorker\.register/g) + count(allCss, /serviceWorker\.register/g);
const theme_color = count(html, /<meta[^>]*name="theme-color"/g);
const color_scheme_meta = count(html, /<meta[^>]*name="color-scheme"/g);

/* ── style= residue (re-confirm ζ1 gain) ──────────────────────────── */
const style_attrs = count(html, /style="/g);
const style_dynamic = count(html, /style="[^"]*--[a-z-]+:/g);
const style_no_dynamic = style_attrs - style_dynamic;

/* ── !important residue (cross-check ζ2 gain) ─────────────────────── */
const importants = count(allCss, /!important/g);

/* ── Output ─────────────────────────────────────────────────────────── */
const today = new Date().toISOString().slice(0, 10);

const md = `# Lighthouse Static Audit Report — ζ3
> Generated by \`scripts/zeta3-static-audit.mjs\` on ${today}
>
> **Sandbox capability note:** The AUTO_PILOT v4 sandbox where this
> commit was produced has no Chrome/Chromium binary installed and
> \`network=INTEGRATIONS_ONLY\` (no public npm registry). Lighthouse
> CLI cannot execute here. The numbers below are deterministic
> static-analysis counts over \`platform/index.html\` and the CSS tree.
> Real Lighthouse scores must be measured by the user (or CI) in an
> environment with Chrome and network access; this file documents
> the *signals* that feed into those scores.

---

## File sizes (uncompressed source)

| File / Tree | Size |
|---|---:|
| \`platform/index.html\` | ${html_kb} KB |
| \`platform/assets/css/**.css\` (concatenated) | ${css_kb} KB |

---

## Document fundamentals

| Signal | Status |
|---|---|
| \`<html lang="…">\` set | ${lang_html ? '✅' : '❌'} |
| \`<html dir="…">\` set | ${dir_html ? '✅' : '❌'} |
| viewport meta present | ${viewport ? '✅' : '❌'} |
| skip-to-main-content link | ${skip_link >= 1 ? '✅ (' + skip_link + ')' : '❌'} |
| \`<meta name="theme-color">\` (light + dark) | ${theme_color >= 2 ? '✅ (' + theme_color + ')' : '⚠️ ' + theme_color} |
| \`<meta name="color-scheme">\` | ${color_scheme_meta >= 1 ? '✅ (' + color_scheme_meta + ')' : '⚠️ 0'} |
| \`<link rel="manifest">\` | ${manifest_link >= 1 ? '✅' : '❌'} |

---

## Accessibility signal counts

### ARIA coverage
| Signal | Count |
|---|---:|
| \`aria-label="…"\` | ${aria_label} |
| \`aria-hidden="true|false"\` | ${aria_hidden} |
| \`aria-live="…"\` | ${aria_live} |
| \`aria-labelledby="…"\` | ${aria_labelledby} |
| \`role="…"\` | ${role_attr} |

### Heading hierarchy
| Tag | Count |
|---|---:|
| \`<h1>\` | ${h1} |
| \`<h2>\` | ${h2} |
| \`<h3>\` | ${h3} |

> 16 page sections + gateway + page-X mock = 17 expected \`<h1>\`. Auditors
> should confirm there is exactly one \`<h1>\` per page section (one root
> heading per landmark, not one per page-load).

### Images
| Signal | Count |
|---|---:|
| \`<img>\` total | ${img_total} |
| with \`alt\` | ${img_alt} |
| **without \`alt\`** | ${img_no_alt} |
| \`loading="lazy"\` | ${lazy_imgs} |

> ÊLAN v4 uses inline SVG sprite + per-world ornamental data-uri
> patterns rather than \`<img>\`. ${img_total} \`<img>\` is expected.

### Forms
| Signal | Count |
|---|---:|
| \`<input>\` total | ${inputs_total} |
| \`<input id="…">\` | ${inputs_with_id} |
| \`<label for="…">\` | ${labels_for} |
| \`<input aria-label="…">\` | ${inputs_with_aria_label} |

> The \`for\`/\`id\` pair is one valid label-input association. The other
> is to wrap the input inside a \`<label>\` element (implicit). ÊLAN's
> gateway form uses the implicit pattern (\`<label class="gateway-field">
> <span>Name</span><input id="gw-name"></label>\`) which is fully
> accessible. The raw counts above will not match because the implicit
> pattern is not detectable by attribute grep.

### Tabindex sanity
| Value | Count |
|---|---:|
| \`tabindex="-1"\` (programmatic) | ${tabindex_neg} |
| \`tabindex="0"\` (focusable in source order — fine) | ${tabindex_zero} |
| \`tabindex="N"\` where N > 0 (anti-pattern) | ${tabindex_pos} |

### Motion + sensory accommodation (CSS)
| Guard | Count |
|---|---:|
| \`:focus-visible\` rules | ${focus_visible_rules} |
| \`@media (prefers-reduced-motion: reduce)\` blocks | ${reduced_motion_guards} |
| \`@media (forced-colors: active)\` blocks | ${forced_colors_guards} |
| \`@media print\` blocks | ${print_guards} |

---

## Performance signals

| Signal | Count | Note |
|---|---:|---|
| \`<link rel="preload">\` | ${preload_links} | ζ3 added 2 critical font preloads |
| \`<link rel="preconnect">\` | ${preconnect_links} | not needed — local fonts |
| \`<link rel="dns-prefetch">\` | ${dns_prefetch_links} | not needed — local fonts |
| \`<link rel="stylesheet">\` | ${stylesheet_links} | one consolidated bundle |
| \`<script src="…">\` (external) | ${external_scripts} | |
| \`<script type="module">\` | ${module_scripts} | defers automatically |
| \`<script defer>\` | ${defer_scripts} | |
| \`<script async>\` | ${async_scripts} | |
| Inline \`<script>\` blocks | ${inline_scripts} | minimal, mostly bootstrappers |

---

## Style hygiene (cross-references ζ1, ζ2)

| Signal | Count | Floor |
|---|---:|---|
| inline \`style="…"\` total | ${style_attrs} | ζ1 target ≤ 30 |
| inline without \`--var\` declaration (purge violations) | ${style_no_dynamic} | ζ1 target == 0 |
| \`!important\` in CSS tree | ${importants} | ζ2 target ≤ 20 (current pillar floor) |

---

## What this file does NOT prove

- It does **not** prove Lighthouse Performance ≥ 92.
- It does **not** prove Lighthouse Accessibility ≥ 96.
- It does **not** prove Lighthouse Best Practices ≥ 95.
- It does **not** prove Console errors == 0 (no JS execution sandbox).
- It does **not** prove color contrast ≥ 4.5:1 across the 8 worlds
  (contrast computation needs OKLCH→sRGB resolution at runtime).

These six items remain on the user-environment to-do list. The
hardening that ζ3 *did* land in commit:

1. Two \`<link rel="preload" as="font">\` entries for the most-loaded
   font families (Markazi Text body, Boutros Modern Kufi display).
2. \`<meta name="color-scheme" content="dark light">\` so the OS picks
   matching native scrollbars/form controls per active world.

---

## Recommended user-side commands (copy-paste)

\`\`\`bash
# 1. Serve locally
cd platform && python3 -m http.server 8000 --bind 127.0.0.1

# 2. Run Lighthouse mobile preset
npx lighthouse http://127.0.0.1:8000 \\
  --preset=mobile \\
  --output=html --output=json \\
  --output-path=./lighthouse-out \\
  --chrome-flags="--headless --no-sandbox" \\
  --only-categories=performance,accessibility,best-practices,pwa,seo

# 3. Append the Lighthouse-reported numbers below this section
\`\`\`

---

## Deferred runtime measurements (to be filled by user)

| Category | Score | Date measured | Run by |
|---|---:|---|---|
| Performance (mobile) | ⏳ pending | — | — |
| Accessibility (mobile) | ⏳ pending | — | — |
| Best Practices | ⏳ pending | — | — |
| PWA | ⏳ pending | — | — |
| SEO | ⏳ pending | — | — |

— End of static audit —
`;

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, md, 'utf8');
console.log(`Wrote ${REPORT}`);
console.log(`html size: ${html_kb} KB · css tree: ${css_kb} KB`);
console.log(`a11y signals: aria-label=${aria_label} aria-hidden=${aria_hidden} role=${role_attr} :focus-visible=${focus_visible_rules}`);
console.log(`perf signals: preload=${preload_links} stylesheets=${stylesheet_links} module-scripts=${module_scripts}`);
console.log(`style=: total=${style_attrs} no-dynamic=${style_no_dynamic} (ζ1 target ≤ 30 / 0)`);
console.log(`!important: ${importants} (ζ2 territory)`);
