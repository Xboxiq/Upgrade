# ✦ ICONOGRAPHY DOCTRINE — مذهب الأيقونات
> Pack v5 / TADAFFUQ. Read-only after this commit.

---

## ١. Zero Emoji في markup المُسلَّم

| ✅ مَسموح في | ❌ ممنوع في |
|---|---|
| `archive/**` (تاريخ مُقدَّس) | `platform/index.html` |
| `prompts/**/*.md` (توثيق) | `platform/assets/css/*.css` |
| `state/**/*.md` (ledger) | `platform/assets/js/*.js` |
| commit messages | `platform/assets/app.js` |
| PR descriptions | shipped markup عام |

**Baseline v5 verified:** `emoji_in_index = 1111` ⚠️ (مَوروث من v3 W17 content blocks: ✗×119، ⚠×74، ★×54، ✅×47، ☆×46، ⚡×40، 📚×40، 🎯×32، 💰×32، ❌×31، إلخ).

أي emoji **جديد** يَدخل في markup الـ v5 يُعتبر violation #4 من Forbidden Library. الـ baseline 1111 يُعالَج في η pillar (هدف: ≤200 ـ استبدال بالـ sprite + Phosphor variants).

---

## ٢. Locked Stack — Lucide + Phosphor فقط

### ٢.١ Family Discipline
| Family | الاستخدام |
|---|---|
| **Lucide** | UI chrome — sidebar nav, topbar buttons, mobile bottom-nav |
| **Phosphor** (Regular weight) | content blocks — block headers, lab cards, cheat-sheet items |

### ٢.٢ القاعدة الذهبية
**لا خلط داخل chrome region واحدة.** الـ sidebar كلها Lucide. الـ topbar كلها Lucide. الـ block headers كلها Phosphor. الـ cheat-sheet كلها Phosphor.

العقاب: violation #6 من Forbidden Library.

---

## ٣. Sprite Discipline — لا Toy SVG

### ٣.١ Sprite Architecture
- ملف واحد: `platform-v5/assets/svg/sprite.svg`
- كل icon = `<symbol id="{family}-{slug}" viewBox="0 0 24 24">…</symbol>`
- مُضمَّن inline في `<body>` كـ first child (hidden via `display: none`) — يَحمِّل مرة واحدة، يُستخدم بـ `<use href="#…">`

### ٣.٢ Forbidden — Toy SVG
أي `<svg viewBox="…">` يَكتبه AI يدوياً في markup خارج الـ sprite ⇐ violation #5 + Forbidden Library #20.

### ٣.٣ كيف تُضاف icon جديدة
1. ابحث في Lucide أو Phosphor عن الـ semantic match
2. انسخ الـ `<path>` data من المصدر الرسمي (lucide.dev / phosphoricons.com)
3. أضِف `<symbol>` block إلى `sprite.svg`
4. حَدِّث `SEMANTIC_MAP.json` بالـ key
5. ادفع كل ذلك في commit واحد مع stage الـ markup الذي يَستخدمها

---

## ٤. Semantic Map

### ٤.١ Path
`platform-v5/assets/svg/SEMANTIC_MAP.json`

### ٤.٢ Schema
```json
{
  "navigation": {
    "home":       { "family": "lucide",   "slug": "house",         "size": "md" },
    "search":     { "family": "lucide",   "slug": "search",        "size": "md" },
    "settings":   { "family": "lucide",   "slug": "settings",      "size": "md" }
  },
  "content": {
    "lesson":     { "family": "phosphor", "slug": "book-open",     "size": "lg" },
    "drill":      { "family": "phosphor", "slug": "barbell",       "size": "lg" },
    "case":       { "family": "phosphor", "slug": "scales",        "size": "lg" }
  },
  "feedback": {
    "success":    { "family": "phosphor", "slug": "check-circle",  "size": "md" },
    "warning":    { "family": "phosphor", "slug": "warning",       "size": "md" },
    "error":      { "family": "phosphor", "slug": "x-circle",      "size": "md" }
  }
}
```

### ٤.٣ Pre-flight Lookup
قبل كتابة أي markup فيه icon:
1. ابحث عن semantic key (مثل `navigation.home`)
2. لو مَوجود → استخدم `Upg.icons.use('navigation.home')`
3. لو غير مَوجود → أضف symbol + map entry → ثم استخدم

**Forbidden:** `Upg.icons.use('navigation.foobar')` بدون map entry — JS سيُلقي warning، الـ stage لا يُسلَّم.

---

## ٥. Icon Size Scale

```css
--icon-xs:  12px;  /* inline في النص، badge */
--icon-sm:  16px;  /* button صغير، tooltip */
--icon-md:  20px;  /* sidebar nav، topbar (default) */
--icon-lg:  24px;  /* block header، card title */
--icon-xl:  32px;  /* hero panel، gateway */
--icon-2xl: 48px;  /* feature illustration (نادر) */
```

**Forbidden:** أي `width:` أو `height:` على icon خارج هذا السلم. لا `width: 18px;`, لا `width: 28px;`. استخدم closest token أو أنشِئ token جديد بـ doctrine update.

---

## ٦. Mixed Family Audit

كل chrome region يجب أن تَكون **single-family**:

| Region | Family إجباري |
|---|---|
| `.sidebar-nav` | Lucide |
| `.topbar-island` | Lucide |
| `.mobile-bottom-nav` | Lucide |
| `.cmdk-results` | Lucide |
| `.block-header` | Phosphor |
| `.cheat-card` | Phosphor |
| `.lab-card-icon` | Phosphor |

Audit:
```bash
# في chrome region، تأكد لا Phosphor
grep -A 2 'class="sidebar' platform/index.html | grep 'phosphor-'  # should be 0
```

---

## ٧. Upg.icons API (سيُبنى في α4)

### ٧.١ Surface
```js
Upg.icons.use('navigation.home');           // returns string HTML <svg><use href="#…"></svg>
Upg.icons.use('navigation.home', { size: 'lg', class: 'tint-aware' });
Upg.icons.list();                            // returns flat array of all keys
Upg.icons.audit();                           // returns { total, used, missing[], orphaned[] }
Upg.icons.spriteUrl();                       // returns '#sprite-symbol' format
Upg.icons.has('navigation.home');            // boolean
```

### ٧.٢ Discipline
- `Upg.icons` is the **27th** Upg.* API (after current 40 — but 13 of those will collapse in v5 cleanup)
- Frozen surface (Object.freeze)
- IIFE (mobile-safe)
- localStorage NOT used (icons are static)

---

## ٨. Currents Forensics

```bash
# v5 baseline (verified at α1):
inline_svg_viewbox = 128   # 95 are <symbol> sprite (✅), 33 free-floating (η3 target)
emoji_in_index     = 1111  # ⚠ legacy W17 content (η3 → ≤200 via Phosphor swap)
hex_in_pages_css   = 859   # ⚠ legacy v3 content (η2 → ≤100 via oklch token migration)
```

**α4 deliverable:** SEMANTIC_MAP.json + Upg.icons API + verify `inline_svg_viewbox = N (sprite-only)`.

---

## ٩. القاعدة الأم

> **«لا emoji. لا toy SVG. لا خلط families. لا size خارج السلم. لا hex داخل markup. الـ sprite واحد، الـ map واحد، الـ helper واحد.»**

— نهاية ICONOGRAPHY DOCTRINE —
