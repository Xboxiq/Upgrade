# ICONOGRAPHY DOCTRINE — Zero Emoji, One Family Per Region

> *«الأيقونة لِسان صامِت. لا يَجوز أن يَكون مُخَلَّطاً.»*

---

## §1 — The absolute zero-emoji rule

No Unicode emoji shall appear in any v5 markup. This includes — without exception:

- The classic suspects: 🚀 📚 💡 🔥 ✓ ☎ 📊 ⚙️ 💧 🛠 🌊 🍷 🎉 🟢 🟡 🔴 ⭐
- ASCII-art-emoji-substitutes: `:)`, `<3`, `=>`, `->` (when functioning as decoration; arrows in prose are fine)
- Decorative box-drawing or symbol characters used as bullets: `•`, `■`, `◆`, `►`, `★`
- Variation selectors: any character followed by `\uFE0F` (the emoji-presentation selector)

Every visual symbol in v5 is a `<svg>` instance from the **icon sprite** (see §3).

Detection at audit time:

```bash
# Absolute fail if non-zero
grep -rcP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{FE0F}]' platform-v5/
```

Any match is a failed PR.

---

## §2 — The two sanctioned icon families

v5 ships **two** icon families and no others:

1. **Lucide** — *primary*, used in chrome (dock, bento card icons, toolbar). Geometric, 24×24 base, 2px stroke, `stroke-linecap: round`, `stroke-linejoin: round`.
2. **Phosphor (regular weight)** — *contextual*, used inside training content (illustrations of concepts, scenario glyphs, accordion markers). 24×24 base, supports outline + fill duo where needed.

**Banned:**
- Material Symbols, Heroicons, Feather, Tabler, Bootstrap Icons — there are good libraries; we just commit to two and stay disciplined.
- Icon fonts (`<i class="fa-…">`). All icons are inline SVG with `currentColor`.
- 3D illustrations (Material 3D, isometric tech illustrations, Storyset, unDraw). The pack is monochromatic.

---

## §3 — The sprite system

Icons live in `platform-v5/assets/svg/icons.svg` as one symbol-sprite document:

```html
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <symbol id="icon-home" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <path d="M9 22V12h6v10"/>
  </symbol>
  <!-- … one <symbol> per icon … -->
</svg>
```

The sprite is included **once**, inline at the start of `<body>`. Icons are then used:

```html
<svg class="icon" aria-hidden="true">
  <use href="#icon-home"/>
</svg>
```

**Required CSS skeleton:**

```css
.icon {
  inline-size: var(--icon-size, 1em);
  block-size:  var(--icon-size, 1em);
  flex-shrink: 0;
  color: currentColor;
  fill: none;
  stroke: currentColor;
}
```

Icons inherit `currentColor` so they automatically theme with their surrounding text. **Banned**: hardcoded `fill="#…"` or `stroke="#…"` on individual icon instances. Colour comes from the host element's `color`.

---

## §4 — The size scale (no escape hatches)

| Token | Value | Used for |
|---|---|---|
| `--icon-xs` | **12px** | inline metadata badges |
| `--icon-sm` | **16px** | dense lists, table cells |
| `--icon-md` | **20px** | dock items collapsed, menu rows |
| `--icon-lg` | **24px** | dock items expanded, bento card titles |
| `--icon-xl` | **32px** | empty-state surface icons |
| `--icon-2xl` | **40px** | hero illustration in slide-over headers |

Icons larger than `--icon-2xl` are forbidden in chrome. They're permitted only as `<svg class="hero-art">` inside a slide-over or sheet header — at most one per surface.

---

## §5 — The semantic map (truth-of-naming)

A single source of truth lives at `platform-v5/assets/svg/SEMANTIC_MAP.json`:

```json
{
  "navigation": {
    "home":      "icon-home",
    "lab":       "icon-flask-conical",
    "centre":    "icon-command",
    "progress":  "icon-trending-up",
    "more":      "icon-more-horizontal"
  },
  "actions": {
    "add":       "icon-plus",
    "edit":      "icon-pencil",
    "delete":    "icon-trash-2",
    "share":     "icon-share-2",
    "close":     "icon-x"
  },
  "training": {
    "scenario":  "icon-clipboard-list",
    "objective": "icon-target",
    "completed": "icon-check-circle-2",
    "locked":    "icon-lock",
    "in-progress": "icon-circle-dot"
  },
  "states": {
    "info":      "icon-info",
    "warning":   "icon-alert-triangle",
    "error":     "icon-alert-circle",
    "success":   "icon-check"
  }
}
```

**The rule**: code addresses icons through the semantic key (`navigation.home`), never the icon ID directly. This way, swapping the underlying icon (Lucide `home` → Lucide `house`) is one map edit, not a grep-replace across 200 files.

The runtime helper:

```js
import { Upg } from './core.js';
Upg.icons.use('navigation.home');
// → '<svg class="icon"><use href="#icon-home"/></svg>'
```

---

## §6 — The one-family-per-region rule

A chrome region (the dock, the topbar — wait, there is no topbar in v5 — the slide-over header, a bento card cluster) uses **one** family throughout. Mixing Lucide + Phosphor in the same dock is forbidden.

Rationale: stroke widths, end-cap shapes, and corner radii subtly differ between families. Mixing produces cognitive friction even when users can't articulate why.

Allocation:

| Region | Family |
|---|---|
| The dock | Lucide |
| Bento card titles + actions | Lucide |
| Empty-state illustrations | Phosphor |
| Training scenario glyphs (workbench surfaces) | Phosphor |
| Slide-over header hero | Phosphor (duo-tone allowed) |

When in doubt: **Lucide for chrome, Phosphor for content**.

---

## §7 — Accessibility contract

Every `<svg class="icon">` must satisfy one of:

1. **Decorative** (icon supplements adjacent text): `aria-hidden="true"`, no other attributes needed.
2. **Standalone meaning** (icon-only button): wrapped in a host element that has an accessible name (`aria-label="إغلاق"`, `<button aria-label="إغلاق"><svg class="icon" aria-hidden="true">…</svg></button>`).
3. **Inline content** (rare — icon *is* the meaning, like a "completed" checkmark in a list of statuses): the icon itself carries `role="img"` + `aria-label`.

Failing this contract = a11y audit failure.

---

## §8 — Forbidden icon patterns

1. **Inline `<svg viewBox=...>` with hand-drawn `<path d="…">` defined per-component.** All icons go through the sprite. The sprite is the only `<svg>` definition site.
2. **Icon family mixing** within a single chrome region.
3. **Hardcoded `fill="#…"` / `stroke="#…"`** on icon instances.
4. **Icon size outside the scale** (`width: 17px;` etc.).
5. **Animated icons by default** (icons that pulse/spin without state-change reason). Allowed: a single icon as a Pulse beacon (e.g., a flame flickers iff a draft is unsaved). Forbidden: dock icons that idle-animate.
6. **Multiple icons stacked on one button** (e.g., chevron + arrow + star). One icon per affordance; meaning is in the label.
7. **Branded logo SVGs in the icon sprite.** Logos live in `platform-v5/assets/svg/brand/`, separately, and are *not* `currentColor`-tinted.
8. **Emoji as a fallback** when an icon fails to load. The fallback is the `aria-label` text rendered as a tiny capsule.
