# α4 — Icon Foundation
> **Pillar α (FOUNDATION) / Stage 4 of 4 (extended)**
> الهدف: تحميل Phosphor + Lucide محلياً + بناء sprite system + `Upg.icons` API.
> **التبعية:** α3 يجب أن ينتهي.
> **يجب:** قراءة `prompts/v4/ICONOGRAPHY_DOCTRINE.md` قبل البدء.

---

## السياق

`Upg.icons` الحالي (في `upg-icons-1.js`) يَستخدم system fallback ضعيف. ÊLAN يستبدله بنظام sprite حقيقي يحمل **مكتبتين MIT محمَّلتين على القرص** — لا CDN، لا CSS Icons hack، لا inline SVG ارتجالي.

---

## 🎨 Creativity Beacon

**Type:** 🏛 STRUCTURAL_BEACON
**The Surprise:** نظام `<use href>` يَستخدم خاصية CSS `mask-image` كـ fallback. لو الـ sprite لم يُحمَّل لأي سبب، الأيقونة تظهر كـ **علامة حِبر دائرية** (per-world ember color) عوض الـ broken-icon icon. هذا يحفظ الجمال حتى في فشل التحميل.
**Reference Avoided:** broken-icon placeholder, fontawesome fallback
**Inspired-by:** #6 Müller-Brockmann grid (graceful degradation as design)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. سكربت التحميل — `scripts/elan-icons.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail
# ÊLAN v4 — α4 — Icon library bootstrap (Lucide + Phosphor)

ROOT="$(git rev-parse --show-toplevel)"
ICONS_DIR="$ROOT/platform/assets/icons"
TMP="/tmp/elan-icons-$$"
mkdir -p "$ICONS_DIR" "$TMP"

# ─── Lucide ───
LUCIDE_VER="0.460.0"
LUCIDE_URL="https://github.com/lucide-icons/lucide/releases/download/v${LUCIDE_VER}/lucide-icons-v${LUCIDE_VER}.zip"
echo "Downloading Lucide v${LUCIDE_VER}..."
curl -fsSL "$LUCIDE_URL" -o "$TMP/lucide.zip"
unzip -q "$TMP/lucide.zip" -d "$TMP/lucide"

# ─── Phosphor ───
PHOSPHOR_VER="2.1.1"
PHOSPHOR_URL="https://github.com/phosphor-icons/core/archive/refs/tags/v${PHOSPHOR_VER}.tar.gz"
echo "Downloading Phosphor v${PHOSPHOR_VER}..."
curl -fsSL "$PHOSPHOR_URL" -o "$TMP/phosphor.tar.gz"
tar -xzf "$TMP/phosphor.tar.gz" -C "$TMP"
PHOSPHOR_DIR="$TMP/core-${PHOSPHOR_VER}/raw/regular"

# ─── Allowlist (semantic map) ───
LUCIDE_ICONS=(
  arrow-left arrow-right arrow-up arrow-down
  check x triangle-alert info-circle help-circle check-circle-2
  chevron-down chevron-up chevron-left chevron-right
  search settings menu home user user-circle
  bell bell-off mail message-circle phone
  file file-text folder download upload
  edit-3 trash-2 copy share-2 link-2
  eye eye-off lock unlock
  trending-up trending-down activity bar-chart-3 line-chart
  calendar clock timer
  play pause volume-2 volume-x
  plus minus more-vertical more-horizontal
  filter sort-asc x-circle moon sun
)
PHOSPHOR_ICONS=(
  brain heart-straight target lightning
  flame drop-half-bottom mountains tree
  pen-nib paint-brush ruler scissors
  scales coins receipt currency-dollar
  wrench hammer gear-six magnifying-glass
  microphone-stage smiley-melting handshake
  graduation-cap book-open notebook
  chat-circle-text users-three megaphone-simple
  arrow-fat-up sparkle compass-tool
  globe-hemisphere-east phone-call
  device-mobile-camera laptop monitor
  rocket-launch trophy medal star
  warning check-circle gear user-circle
)

# ─── Build Lucide sprite ───
echo "Building Lucide sprite..."
{
  echo '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">'
  for name in "${LUCIDE_ICONS[@]}"; do
    src="$TMP/lucide/icons/${name}.svg"
    [[ -f "$src" ]] || { echo "  missing lucide: $name" >&2; continue; }
    extracted=$(sed -E '1s|^<svg[^>]*>||; $s|</svg>$||' "$src" | tr -d '\r\n')
    echo "  <symbol id=\"i-${name}\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">${extracted}</symbol>"
  done
  echo '</svg>'
} > "$ICONS_DIR/lucide-sprite.svg"

# ─── Build Phosphor sprite ───
echo "Building Phosphor sprite..."
{
  echo '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">'
  for name in "${PHOSPHOR_ICONS[@]}"; do
    src="$PHOSPHOR_DIR/${name}.svg"
    [[ -f "$src" ]] || { echo "  missing phosphor: $name" >&2; continue; }
    extracted=$(sed -E '1s|^<svg[^>]*>||; $s|</svg>$||' "$src" | tr -d '\r\n')
    echo "  <symbol id=\"p-${name}\" viewBox=\"0 0 256 256\" fill=\"currentColor\">${extracted}</symbol>"
  done
  echo '</svg>'
} > "$ICONS_DIR/phosphor-sprite.svg"

# ─── Manifest ───
cat > "$ICONS_DIR/MANIFEST.json" <<EOF
{
  "version": "1.0.0",
  "lucide":   { "version": "${LUCIDE_VER}",   "license": "ISC", "count": ${#LUCIDE_ICONS[@]} },
  "phosphor": { "version": "${PHOSPHOR_VER}", "license": "MIT", "count": ${#PHOSPHOR_ICONS[@]} }
}
EOF

# ─── Licenses ───
[[ -f "$TMP/lucide/LICENSE" ]] && cp "$TMP/lucide/LICENSE" "$ICONS_DIR/LICENSE-lucide.txt"
[[ -f "$TMP/core-${PHOSPHOR_VER}/LICENSE" ]] && cp "$TMP/core-${PHOSPHOR_VER}/LICENSE" "$ICONS_DIR/LICENSE-phosphor.txt"

rm -rf "$TMP"

actual_lucide=$(grep -c '<symbol' "$ICONS_DIR/lucide-sprite.svg" 2>/dev/null || echo 0)
actual_phosphor=$(grep -c '<symbol' "$ICONS_DIR/phosphor-sprite.svg" 2>/dev/null || echo 0)
echo ""
echo "Done."
echo "  Lucide:   ${actual_lucide} symbols"
echo "  Phosphor: ${actual_phosphor} symbols"
echo "  Total: $(du -ckh "$ICONS_DIR"/*.svg 2>/dev/null | tail -1 | cut -f1)"
```

### ٢. CSS — `platform/assets/css/_icon-system.css`

```css
/* ÊLAN v4 — α4 — Icon System */

:root {
  --icon-xs:  14px;
  --icon-sm:  16px;
  --icon-md:  20px;
  --icon-lg:  24px;
  --icon-xl:  32px;
  --icon-2xl: 48px;
}

.i {
  display: inline-block;
  inline-size: var(--icon-md);
  block-size:  var(--icon-md);
  vertical-align: middle;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.i-xs  { inline-size: var(--icon-xs);  block-size: var(--icon-xs);  stroke-width: 1.5; }
.i-sm  { inline-size: var(--icon-sm);  block-size: var(--icon-sm);  stroke-width: 1.75; }
.i-md  { inline-size: var(--icon-md);  block-size: var(--icon-md);  stroke-width: 1.75; }
.i-lg  { inline-size: var(--icon-lg);  block-size: var(--icon-lg);  stroke-width: 2; }
.i-xl  { inline-size: var(--icon-xl);  block-size: var(--icon-xl);  stroke-width: 2; }
.i-2xl { inline-size: var(--icon-2xl); block-size: var(--icon-2xl); stroke-width: 2.25; }

.i-p { fill: currentColor; stroke: none; }

.i-ember   { color: var(--ember); }
.i-focus   { color: var(--focus); }
.i-muted   { color: var(--ink-muted); }
.i-faint   { color: var(--ink-faint); }
.i-success { color: var(--state-success); }
.i-danger  { color: var(--state-danger); }
.i-warning { color: var(--state-warning); }

/* Beacon: graceful ink-mark fallback */
.i[data-fallback="ink"]:not([data-loaded]) {
  background: currentColor;
  -webkit-mask: radial-gradient(circle at center, black 35%, transparent 36%);
          mask: radial-gradient(circle at center, black 35%, transparent 36%);
}
```

### ٣. JS module — `platform/assets/js/core/icons.js`

```javascript
/* ÊLAN v4 — α4 — Icon API */

const SEMANTIC_MAP = {
  // Action / state
  'check':      { lib: 'lucide', id: 'i-check' },
  'success':    { lib: 'lucide', id: 'i-check-circle-2' },
  'close':      { lib: 'lucide', id: 'i-x' },
  'error':      { lib: 'lucide', id: 'i-x-circle' },
  'warning':    { lib: 'lucide', id: 'i-triangle-alert' },
  'info':       { lib: 'lucide', id: 'i-info-circle' },
  'help':       { lib: 'lucide', id: 'i-help-circle' },

  // Navigation
  'menu':       { lib: 'lucide', id: 'i-menu' },
  'home':       { lib: 'lucide', id: 'i-home' },
  'back':       { lib: 'lucide', id: 'i-arrow-right' },
  'forward':    { lib: 'lucide', id: 'i-arrow-left' },
  'expand-down':{ lib: 'lucide', id: 'i-chevron-down' },
  'expand-up':  { lib: 'lucide', id: 'i-chevron-up' },
  'search':     { lib: 'lucide', id: 'i-search' },

  // Object
  'user':       { lib: 'lucide', id: 'i-user' },
  'user-circle':{ lib: 'lucide', id: 'i-user-circle' },
  'file':       { lib: 'lucide', id: 'i-file' },
  'document':   { lib: 'lucide', id: 'i-file-text' },
  'folder':     { lib: 'lucide', id: 'i-folder' },
  'settings':   { lib: 'lucide', id: 'i-settings' },
  'edit':       { lib: 'lucide', id: 'i-edit-3' },
  'delete':     { lib: 'lucide', id: 'i-trash-2' },
  'copy':       { lib: 'lucide', id: 'i-copy' },
  'share':      { lib: 'lucide', id: 'i-share-2' },

  // Communication
  'bell':       { lib: 'lucide', id: 'i-bell' },
  'bell-off':   { lib: 'lucide', id: 'i-bell-off' },
  'mail':       { lib: 'lucide', id: 'i-mail' },
  'phone':      { lib: 'lucide', id: 'i-phone' },
  'message':    { lib: 'lucide', id: 'i-message-circle' },

  // Data
  'trending-up':  { lib: 'lucide', id: 'i-trending-up' },
  'trending-down':{ lib: 'lucide', id: 'i-trending-down' },
  'activity':     { lib: 'lucide', id: 'i-activity' },
  'chart':        { lib: 'lucide', id: 'i-bar-chart-3' },
  'line-chart':   { lib: 'lucide', id: 'i-line-chart' },

  // Time
  'calendar':   { lib: 'lucide', id: 'i-calendar' },
  'clock':      { lib: 'lucide', id: 'i-clock' },
  'timer':      { lib: 'lucide', id: 'i-timer' },

  // Theme
  'moon':       { lib: 'lucide', id: 'i-moon' },
  'sun':        { lib: 'lucide', id: 'i-sun' },

  // Phosphor — content & per-world
  'brain':      { lib: 'phosphor', id: 'p-brain' },
  'heart':      { lib: 'phosphor', id: 'p-heart-straight' },
  'target':     { lib: 'phosphor', id: 'p-target' },
  'lightning':  { lib: 'phosphor', id: 'p-lightning' },
  'flame':      { lib: 'phosphor', id: 'p-flame' },
  'drop':       { lib: 'phosphor', id: 'p-drop-half-bottom' },
  'mountains':  { lib: 'phosphor', id: 'p-mountains' },
  'wrench':     { lib: 'phosphor', id: 'p-wrench' },
  'hammer':     { lib: 'phosphor', id: 'p-hammer' },
  'gear':       { lib: 'phosphor', id: 'p-gear-six' },
  'pen':        { lib: 'phosphor', id: 'p-pen-nib' },
  'brush':      { lib: 'phosphor', id: 'p-paint-brush' },
  'ruler':      { lib: 'phosphor', id: 'p-ruler' },
  'scales':     { lib: 'phosphor', id: 'p-scales' },
  'coins':      { lib: 'phosphor', id: 'p-coins' },
  'receipt':    { lib: 'phosphor', id: 'p-receipt' },
  'handshake':  { lib: 'phosphor', id: 'p-handshake' },
  'graduation': { lib: 'phosphor', id: 'p-graduation-cap' },
  'book':       { lib: 'phosphor', id: 'p-book-open' },
  'megaphone':  { lib: 'phosphor', id: 'p-megaphone-simple' },
  'rocket':     { lib: 'phosphor', id: 'p-rocket-launch' },
  'trophy':     { lib: 'phosphor', id: 'p-trophy' },
  'medal':      { lib: 'phosphor', id: 'p-medal' },
  'star':       { lib: 'phosphor', id: 'p-star' },
  'sparkle':    { lib: 'phosphor', id: 'p-sparkle' },
  'mobile':     { lib: 'phosphor', id: 'p-device-mobile-camera' },
  'laptop':     { lib: 'phosphor', id: 'p-laptop' },
  'monitor':    { lib: 'phosphor', id: 'p-monitor' },
  'users':      { lib: 'phosphor', id: 'p-users-three' },
  'chat':       { lib: 'phosphor', id: 'p-chat-circle-text' },
  'mic':        { lib: 'phosphor', id: 'p-microphone-stage' },
};

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const SPRITE = {
  lucide:   '/platform/assets/icons/lucide-sprite.svg',
  phosphor: '/platform/assets/icons/phosphor-sprite.svg',
};

export function icon(name, opts = {}) {
  const { size = 'md', color, label } = opts;
  const entry = SEMANTIC_MAP[name];
  if (!entry) {
    console.warn(`[icons] unknown name: ${name}`);
    return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  }
  if (!SIZES.includes(size)) {
    console.warn(`[icons] invalid size "${size}", falling back to md`);
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('i', `i-${size}`);
  if (entry.lib === 'phosphor') svg.classList.add('i-p');
  if (color) svg.classList.add(`i-${color}`);
  svg.dataset.fallback = 'ink';
  if (label) {
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
  } else {
    svg.setAttribute('aria-hidden', 'true');
  }

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `${SPRITE[entry.lib]}#${entry.id}`);
  svg.appendChild(use);
  use.addEventListener('load', () => { svg.dataset.loaded = 'true'; }, { once: true });

  return svg;
}

export function autoMount(root = document) {
  root.querySelectorAll('[data-icon]:not([data-icon-mounted])').forEach(el => {
    const name = el.dataset.icon;
    const size = el.dataset.iconSize || 'md';
    const color = el.dataset.iconColor;
    const label = el.dataset.iconLabel;
    const i = icon(name, { size, color, label });
    i.dataset.iconMounted = 'true';
    el.replaceWith(i);
  });
}

export function preload() {
  Object.values(SPRITE).forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.type = 'image/svg+xml';
    link.href = path;
    document.head.appendChild(link);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { preload(); autoMount(); });
} else {
  preload(); autoMount();
}

document.addEventListener('upg:world:change', () => autoMount());

window.Upg = window.Upg || {};
window.Upg.icons = Object.freeze({ icon, autoMount, preload, semantic: () => Object.freeze({ ...SEMANTIC_MAP }) });

export default { icon, autoMount, preload };
```

### ٤. تطبيق

```html
<!-- declarative -->
<button>
  <span data-icon="check" data-icon-size="sm" data-icon-label="تم"></span>
  أنجزتُ
</button>

<!-- programmatic -->
<script>
  document.body.appendChild(Upg.icons.icon('rocket', { size: 'lg', color: 'ember' }));
</script>
```

### ٥. تسجيل
- `tokens.css` يستورد `_icon-system.css`
- `app.js` يستورد `core/icons.js`

---

## Acceptance Criteria

- [ ] `scripts/elan-icons.sh` موجود وقابل للتشغيل (chmod +x)
- [ ] **بعد تشغيل السكربت:** `lucide-sprite.svg` و `phosphor-sprite.svg` موجودان
- [ ] `MANIFEST.json` يَذكر version + license + count لكل واحدة
- [ ] `LICENSE-lucide.txt` و `LICENSE-phosphor.txt` موجودان
- [ ] الحجم الإجمالي للـ sprites ≤ 60KB
- [ ] grep: `grep -c '<symbol' platform/assets/icons/lucide-sprite.svg` ≥ 50
- [ ] grep: `grep -c '<symbol' platform/assets/icons/phosphor-sprite.svg` ≥ 35
- [ ] `core/icons.js` ESM module، semantic map ≥ 60 entry
- [ ] `_icon-system.css` فيه 6 sizes + color helpers
- [ ] `Upg.icons.icon('check', { size: 'lg' })` يَعمل من console
- [ ] `[data-icon="bell"]` يَتحوَّل تلقائياً
- [ ] grep بـ Unicode emoji range في markup → 0 (ممنوع)
- [ ] commit: `α4: Icon Foundation — verified: lucide=<N>, phosphor=<N>, sprite_kb=<S>, semantic=<C>`

---

## بعد α4 — Pillar α أصبح 4/4

أنشئ PR من `elan-α-foundation`: `feat(elan-v4): Pillar α — FOUNDATION (4/4 stages)`

— نهاية α4 — نهاية Pillar α الموسَّع —
