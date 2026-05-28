# DEMOLITION LIST — what v5 does NOT inherit from v4

> *«ما كان زِينة لا يَستَحِقّ النَقل. ما كان رُكناً يُبنى من جَديد.»*

This file is the explicit, grep-verified inventory of v4 chrome that **v5 leaves behind**. It is a contract: when later pillars touch the codebase, they shall not regrow any of the items below in `platform-v5/`.

Baseline measured against `platform/` at commit before α1 of this branch:

```
classic-sidebar/topbar/drawer hits in index.html : 1
position:fixed in chrome.css                     : 1
max-width container hits in pages.css            : 84
emoji in original markup                         : 1062
hardcoded-hex-in-markup style="..#…"             : 8
v4 world palette files                           : 9
v4 page section shards                           : 15
v4 JS modules                                    : 126
v4 CSS files                                     : 30
```

These are the v4 numbers. The v5 endgame numbers are:

```
classic-sidebar/topbar/drawer hits in platform-v5/  : 0
position:fixed (other than dock/scrim/overlay)      : 0
max-width container hits                            : 0   ← edge-to-edge canvas
emoji in markup                                     : 0   ← absolute zero
hardcoded-hex-in-markup                             : 0   ← tokens only
world palette files                                 : 0   ← single premium voice
```

---

## Demolished outright (no v5 equivalent)

1. **`<aside class="sidebar">`** — replaced by the floating dock (γ1).
2. **`<header class="topbar">`** — replaced by edge-to-edge canvas + slide-over context headers.
3. **`<div class="drawer-scrim">` permanently mounted** — only summoned per overlay (ε pillar).
4. **`<nav class="dual-bottom-nav">`** — replaced by γ2 mobile dock with frosted-glass + safe-area envelope.
5. **`#rit-entry-portal`** (the v3 entry-portal ritual) — v5 has no splash; the canvas opens directly.
6. **`#cmdk-modal`** as a centred overlay — replaced by a slide-over panel summoned by ⌘K (ε1).
7. **All 9 world palettes** (`worlds/_*.css`) — single premium voice replaces eight cultural worlds.
8. **`@layer themes` with brand-aliased tokens** (`--brand-*`, `--ember-*`) — replaced by 4 token families (canvas / surface / ink / accent).
9. **84 `max-width` container declarations** in `pages.css` — replaced by edge-to-edge bento grids.
10. **All `<svg viewBox=...>` inline definitions** — replaced by the single `assets/svg/icons.svg` sprite.
11. **All emoji in markup** (1 062 hits — including legacy `🔥`, `✓`, `📊`, `⚙️`, `💧`, `🌊`, `🛠`, `🍷`) — replaced by Lucide/Phosphor SVG references through `Upg.icons.use()`.
12. **All `<svg ...>...</svg>` hardcoded inside `<a class="dual-bottom-nav-item">`** — replaced by sprite use.
13. **`<dialog>` / `[role="dialog"]` modal popups** — replaced by slide-over panels (ε1) and bottom sheets (ε2).
14. **`window.alert`, `window.confirm`, `window.prompt`** — already absent in v4; v5 affirms the ban.
15. **Linear `<progress>` bars** (any `.progress-fill`, `.progress-bar`) — replaced by SVG progress rings (δ3).
16. **Animated counters** that count from zero — values are rendered final.
17. **Toast / notification floaters** — feedback is The Bloom on the originating element (MOTION §3.2).
18. **"Welcome back, [name]!" greeting cliché** — already replaced in v4 ε12 by the silent mood vector; v5 inherits.

---

## Inherited as content (re-cased into new chrome)

The following **content** survives, re-rendered in the new layout:

- The 12 ε page revivals from v4 (callcenter, fieldsales, social, lab, psych+eq+neg, customercare, programming, accounting, phonerepair, hrmastery, dashboard, mood) — their *prose* and *data* are re-used; their *markup* is regenerated.
- The 3 maqamat haptic patterns (`دفّن`, `تَك`, `مَقسوم`) — bound to v5's drag-drop in η3.
- The PROVE-IT citation system — re-presented in the bento card detail view.

---

## Sacred — never demolished

The 14+ public `Upg.*` APIs (manifesto §4): `Upg.state`, `Upg.theme`, `Upg.nav`, `Upg.cmdk`, `Upg.haptic`, `Upg.format`, `Upg.icons`, `Upg.shards`, `Upg.elan.install`, `Upg.elan.{callcenter, fieldsales, lab, psych, customercare, programming, accounting, phonerepair, hrmastery}`, `Upg.mood`, `Upg.worlds.*`. New chrome consumes them; signatures stay byte-identical.

The `archive/` directory: never opened by v5.

The `prompts/v[1-4]/` directories: never opened by v5.

---

## How this list is enforced

`scripts/v5_forbidden_audit.py` (lands in θ2) runs:

```python
# expected at v5 seal:
assert grep_count('platform-v5/', UNICODE_EMOJI_REGEX)             == 0
assert grep_count('platform-v5/assets/css/', r'position:\s*fixed') <= 3   # dock + scrim + overlay
assert grep_count('platform-v5/assets/css/', r'max-width:\s*\d+')  == 0
assert grep_count('platform-v5/assets/css/', r'#[0-9a-fA-F]{3,6}') == 0   # HSL tokens only
assert glob('platform-v5/assets/css/worlds/_*.css')                == []
assert grep_count('platform-v5/', r'<svg\s+viewBox', exclude=['icons.svg', 'SEMANTIC_MAP.json']) == 0
```

Any non-zero number is a regression and the PR is rejected.

---

*This list is reviewed once per pillar PR and updated with verified counts.*
