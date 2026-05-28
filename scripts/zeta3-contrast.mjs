/**
 * ζ3 — Per-world contrast computation (WCAG 2.x).
 *
 * Reads each world's CSS, extracts --ink and --anchor-bg HSL values,
 * converts to sRGB, computes relative luminance and contrast ratio.
 *
 * Outputs a markdown table to stdout — consumed by state/LIGHTHOUSE_REPORT.md.
 *
 * Run: node scripts/zeta3-contrast.mjs
 */

import { readFile } from "node:fs/promises";

const WORLDS = ["hibr", "naar", "nada", "hadeed", "dhahab", "tayyar", "warsha", "saloon"];

function hslToRgb (h, s, l) {
  // h in [0,360], s and l in [0,100]
  const _h = h / 360, _s = s / 100, _l = l / 100;
  if (_s === 0) {
    const v = Math.round(_l * 255);
    return [v, v, v];
  }
  const q = _l < 0.5 ? _l * (1 + _s) : _l + _s - _l * _s;
  const p = 2 * _l - q;
  function hue2rgb (t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  return [
    Math.round(hue2rgb(_h + 1 / 3) * 255),
    Math.round(hue2rgb(_h) * 255),
    Math.round(hue2rgb(_h - 1 / 3) * 255),
  ];
}

function relLum (rgb) {
  const ch = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function contrastRatio (a, b) {
  const la = relLum(a), lb = relLum(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

function extractToken (css, name) {
  // Match e.g. `--ink: hsl(225 35% 8%);` (allow optional spaces, optional alpha)
  const re = new RegExp(`--${name}\\s*:\\s*hsl\\(\\s*([0-9.]+)\\s+([0-9.]+)%\\s+([0-9.]+)%\\s*\\)`, "i");
  const m = css.match(re);
  if (!m) return null;
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
}

const rows = [];
for (const w of WORLDS) {
  const path = `platform/assets/css/worlds/_${w}.css`;
  let css;
  try { css = await readFile(path, "utf8"); }
  catch { rows.push({ world: w, status: "MISSING_FILE" }); continue; }

  const ink = extractToken(css, "ink");
  const bg  = extractToken(css, "anchor-bg");
  const ember = extractToken(css, "ember");
  const focus = extractToken(css, "focus");

  if (!ink || !bg) {
    rows.push({ world: w, status: `MISSING_TOKEN ink=${!!ink} bg=${!!bg}` });
    continue;
  }
  const rgbInk = hslToRgb(...ink);
  const rgbBg  = hslToRgb(...bg);
  const ratio  = contrastRatio(rgbInk, rgbBg);

  let emberBgRatio = null, focusBgRatio = null;
  if (ember) emberBgRatio = contrastRatio(hslToRgb(...ember), rgbBg);
  if (focus) focusBgRatio = contrastRatio(hslToRgb(...focus), rgbBg);

  rows.push({
    world: w,
    inkOnBg: ratio,
    emberOnBg: emberBgRatio,
    focusOnBg: focusBgRatio,
    inkHsl: `hsl(${ink.join(" ")})`,
    bgHsl:  `hsl(${bg.join(" ")})`,
  });
}

console.log("| World | ink-on-bg | ember-on-bg | focus-on-bg | WCAG AA (4.5+) | WCAG AAA (7+) |");
console.log("|---|---|---|---|---|---|");
for (const r of rows) {
  if (r.status) {
    console.log(`| ${r.world} | — | — | — | ${r.status} | — |`);
    continue;
  }
  const aa = r.inkOnBg >= 4.5 ? "✓" : "✗";
  const aaa = r.inkOnBg >= 7 ? "✓" : "✗";
  console.log(`| ${r.world} | ${r.inkOnBg.toFixed(2)}:1 | ${r.emberOnBg ? r.emberOnBg.toFixed(2) + ":1" : "—"} | ${r.focusOnBg ? r.focusOnBg.toFixed(2) + ":1" : "—"} | ${aa} | ${aaa} |`);
}
