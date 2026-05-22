# 🔍 WORKER 20 — Phase 1/6 — Font Forensics
> **اقرأ أولاً:** `prompts/v3/20_WORKER_TASMEEM_RECONSTRUCTION.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Cathedral v16 ATELIER + Resonance v2 (W15-W19 مدموجة).
> **الفلسفة:** *قبل أن نبني محراباً جديداً، نُجرّ ما بقي من الكاتدرائية القديمة. الجرد قبل الإعدام، الإعدام قبل الإحياء.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` `<link>` Google Fonts | **DELETE** السطر الواحد الذي يحمل Google Fonts URL + DELETE الـ 2 `<link rel="preconnect">` المرافقة | حذف أي `<link>` آخر (favicon, manifest, sw, stylesheet) |
| `index.html` rest | لا تُلمس | أي تعديل غير الحذف أعلاه |
| `style.css` `:root` tokens | **APPEND** كتلة `TASMEEM Forensics` تحتوي على tokens محايدة (`--font-status: "google-removed"`) — لا REPLACE في هذا الـ phase | تعديل أي `--font-*` token — Phase 3 يفعل ذلك |
| `style.css` rules | **APPEND** كتلة comment block فيها inventory كامل + `data-tasmeem-stage` markers | إضافة قواعد فعلية — Phase 2-3 يفعل ذلك |
| `app.js` | لا يُلمس في Phase 1 (Phase 3 يضيف Upg.font) | أي تعديل |

**Sacred preserved:**
- 14 page sections + 391 qcalc + 24 Upg.* APIs
- جميع `--type-voice-*` من W15
- جميع voice bindings من W12 P1B + W15
- جميع `--font-*` tokens (نقرأها فقط، لا نعدّلها)
- 15 identity tints

> **ملاحظة حرجة:** بعد Phase 1، الـ index.html **لا يحتوي على Google Fonts link**. الـ browser سيستخدم system fallback (Cairo system if installed, else generic). هذا **متوقّع** — Phase 2 يُحضر الخطوط محلياً، Phase 3 يربطها. **بين Phase 1 و Phase 3 المنصة قد تبدو مختلفة بصرياً** (fallback to system Arabic). هذا مقصود ومطلوب.

---

## 🎯 الهدف

Phase 1 لا يكتب CSS كثيراً ولا يحمّل خطوطاً جديدة. هدفه **معرفي + جرد + إعدام**:

1. **DELETE** Google Fonts `<link>` + `<link rel="preconnect">` من `index.html` (يكون نهاية القطيعة مع CDN).
2. **جرد كل `font-family` declaration** في style.css (نتوقع 252).
3. **تصنيف** كل declaration: tokens-respecting / direct / @font-face / inheritance.
4. **خريطة الفوضى**: 6 إعادات تعريف لـ `--font-display` — تحديد سطورها وأي واحدة الفعالة.
5. **APPEND** تعليق inventory شامل في `style.css` (للمرجع فقط، لا قواعد).
6. **تجهيز** الجدول للـ Phase 2 (أي خط نحتاجه، أي وزن، أي subset).
7. **(لا تعديل tokens، لا تحميل خطوط)** — تلك مهام Phase 2 و 3.

> Phase 1 = خارطة + قطيعة. Phase 2-6 = بناء.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT (Worker 20 / TASMEEM)
├─ Phase: 1/6 — Font Forensics
├─ Estimated lines: ~520 (index.html DELETE 3 lines + style.css APPEND ~480 lines comment + JS untouched)
├─ Files to touch:
│   ├─ platform/index.html         (DELETE 3 <link> lines for Google Fonts)
│   └─ platform/assets/style.css   (APPEND ~480 lines as inventory comment + 1 tokens block)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '<section class="page"'                            → 14 (or 15)
│   ├─ grep -c 'qcalc'                                             → 391
│   ├─ grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  → ≥24
│   ├─ grep -c 'fonts.googleapis.com' platform/index.html          → 1 (will become 0)
│   ├─ grep -c 'preconnect.*fonts' platform/index.html             → 1-2 (will become 0)
│   └─ grep -c '\-\-type-voice-' platform/assets/style.css         → ≥18
├─ Branch: NEW worker-20-devotio (from latest main, post Pack v2 merge)
└─ No new fonts loaded yet (Phase 2 onwards). Manual fallback period starts.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — Identify and DELETE Google Fonts links

ابحث في `platform/index.html` عن الـ 3 سطور التالية (موجودة من Pack v1 / W12):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&family=Readex+Pro:wght@200..700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@400;600;700&family=Tajawal:wght@300;400;500;700&family=Inter:wght@400..700&family=JetBrains+Mono:wght@400;500;700&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&display=swap" rel="stylesheet" />
```

> **ملاحظة:** الـ URL قد يختلف قليلاً حسب آخر تحديث من W15. ابحث عبر `grep -n 'fonts.googleapis.com' platform/index.html` لتحديد السطور بالضبط.

**DELETE** الثلاث سطور بالكامل. **REPLACE-IN-PLACE** بـ:

```html
<!-- ════════════════════════════════════════════════════════════════════
     TASMEEM v3 — Worker 20 / Phase 1 — DEVOTIO Offline-First Mandate
     ────────────────────────────────────────────────────────────────────
     The previous Google Fonts <link> chain (3 lines) was DELETED on
     <date> as part of Pack v3 (DEVOTIO). The platform now lives 100%
     offline. Local @font-face declarations live in style.css (added
     in Phase 2) referencing files in platform/assets/fonts/.

     Between Phase 1 and Phase 3, system fallback applies. This is
     intentional — see prompts/v3/20_PHASE_1_FONT_FORENSICS.md.
     ════════════════════════════════════════════════════════════════════ -->
```

### Step 2 — Inventory: count font-family declarations

نفّذ:

```bash
echo "=== Total font-family declarations ==="
grep -c "font-family" platform/assets/style.css

echo ""
echo "=== font-family using var() (tokens-respecting) ==="
grep -c "font-family:.*var(" platform/assets/style.css

echo ""
echo "=== font-family using direct strings (legacy) ==="
grep -nE 'font-family:\s*"[A-Za-z]' platform/assets/style.css | head -30

echo ""
echo "=== @font-face declarations ==="
grep -c "@font-face" platform/assets/style.css

echo ""
echo "=== Distinct font names mentioned ==="
grep -oE '"[A-Z][A-Za-z ]+"' platform/assets/style.css | sort -u

echo ""
echo "=== --font-display redefinitions ==="
grep -nE "^\s*\-\-font-display:" platform/assets/style.css

echo ""
echo "=== --type-voice-* token count ==="
grep -oE '\-\-type-voice-[a-z-]+' platform/assets/style.css | sort -u | wc -l
```

**سجِّل النتائج** (ستضعها في الـ APPEND comment).

### Step 3 — APPEND Inventory Comment Block في style.css

في **النهاية** بعد آخر كتلة Resonance v2:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Font Forensics Inventory (Worker 20 / Phase 1)
   ────────────────────────────────────────────────────────────────────
   This block is documentation only. No CSS rules. Phase 2-3 will use
   this inventory to plan local font loading + token reroute.
   ════════════════════════════════════════════════════════════════════════

   ─── Pre-Phase-1 baseline (recorded <date>) ─────────────────────────────

   Total font-family declarations:        252
   font-family using var() (good):        ~64  (will grow in P3)
   font-family using direct strings:      ~188 (will shrink in P3 to <30)
   @font-face declarations existing:      0    (will become 18+ in P2)
   Distinct font names mentioned:         9    (target stays at 9)

   ─── --font-display redefinition map ─────────────────────────────────────

   Line 16010 — :root  (Cathedral v16 W12 P1)         — base stack with Cairo
   Line 16265 — :root  (Cathedral v16 W12 P1B)        — Thmanyah ambition
   Line 19706 — :root  (Resonance v2 W15 P2)          — Aref Ruqaa display
   Line 19896 — :root  (Resonance v2 W15 P3)          — UI body refinement
   Line 20060 — :root  (Resonance v2 W15 P5)          — Cairo fallback hardening
   Line 20131 — :root  (Resonance v2 W15 P6)          — Per-page personality

   FACT: only line 20131 (last redefinition) is currently active. The
   five earlier are dead code (browser uses last cascade winner).
   Phase 3 will COLLAPSE these into ONE clean :root block.

   ─── Distinct font families currently in stacks ──────────────────────────

   Arabic Display:   Aref Ruqaa, Reem Kufi, Cairo, Tajawal
   Arabic Body:      IBM Plex Sans Arabic, Readex Pro, Cairo, Tajawal
   Latin:            Inter, system-ui, -apple-system
   Mono:             JetBrains Mono, SF Mono, ui-monospace
   Quote/Serif:      Fraunces (literary in psych/eq pages)
   Ghost reference:  "Thmanyah" (mentioned but never loaded — phantom)

   ─── Voice tokens from Resonance v2 (preserved by W20) ───────────────────

   --type-voice-hero      → Aref Ruqaa wordmark, gateway, hero
   --type-voice-display   → Reem Kufi h1/h2 page sections
   --type-voice-display-h → Reem Kufi h3/h4 card titles
   --type-voice-body      → Readex Pro / IBM Plex Arabic paragraphs
   --type-voice-ui        → Tajawal labels, buttons, breadcrumbs
   --type-voice-numeric   → IBM Plex Arabic + JetBrains Mono tabular
   --type-voice-code      → JetBrains Mono code blocks
   --type-voice-accent    → Aref Ruqaa eyebrows, signatures, ornament
   --type-voice-quote     → Fraunces literary quotes (psych/eq)
   --type-voice-latin     → Inter mixed-Latin paragraphs
   --type-voice-eyebrow   → Aref Ruqaa Italic eyebrow overline
   --type-voice-signature → Aref Ruqaa Bold signatures
   (...18+ tokens — all preserved by W20, only their stack VALUES change in P3)

   ─── Phase 2 plan (foreshadow) ────────────────────────────────────────────

   Will download these from OFL/SIL sources to platform/assets/fonts/:

   1. Aref Ruqaa            (400 + 700)            — github.com/khaledhosny/arefruqaa
   2. Reem Kufi             (400 + 500 + 600 + 700) — google fonts repo
   3. Cairo                 (400 + 600 + 700)       — google fonts repo
   4. Tajawal               (300 + 400 + 500 + 700) — google fonts repo
   5. IBM Plex Sans Arabic  (300 + 400 + 500 + 600 + 700) — github.com/IBM/plex
   6. Readex Pro            (200 + 400 + 700)       — google fonts repo (variable)
   7. Inter                 (variable 100..900)      — rsms.me/inter
   8. JetBrains Mono        (400 + 500 + 700)       — jetbrains.com/mono
   9. Fraunces              (variable opsz, ital)    — undercasetype/Fraunces

   Subsetting strategy:
   - Arabic-script fonts: subset to Arabic Unicode block (U+0600-06FF)
                          + Arabic Presentation Forms (U+FB50-FDFF, U+FE70-FEFF)
                          + Arabic-Indic digits (U+0660-0669)
                          + space + common punctuation (U+0020-007F selected)
   - Latin fonts: subset to Latin Basic + Extended-A + numbers (U+0020-024F)
   - Total budget: ≤ 280KB after subset (vs ~600KB unsubsetted from Google CDN)

   ─── Phase 3 plan (foreshadow) ────────────────────────────────────────────

   - Collapse 6 --font-display redefinitions into ONE clean :root.
   - REPLACE-IN-PLACE values of all 18 --type-voice-* tokens to reference
     local font names (--font-aref-ruqaa, --font-reem-kufi, etc.).
   - Remove "Thmanyah" phantom from all stacks (replaced by real Aref Ruqaa).
   - Add Upg.font IIFE with: list, swap, audit, getLoadedFamilies APIs.
   - Add tas-* utility classes that wrap voice tokens (e.g. .tas-voice-hero).

   ─── Discipline going forward ────────────────────────────────────────────

   1. NO direct font-family in CSS rules (after P3). Always var(--type-voice-*).
   2. NO new --font-* token redefinitions in :root after P3.
   3. NO Google Fonts link or any CDN font reference, ever.
   4. NO new font family added without OFL/SIL license verification.
   5. ALL @font-face declarations live in ONE block (Phase 2 / style.css).

   END TASMEEM v3 — Phase 1 Inventory. Phase 2 begins font loading.
   ════════════════════════════════════════════════════════════════════════ */
```

### Step 4 — APPEND status tokens (محايدة)

في `:root` العام، **APPEND** (لا REPLACE):

```css
/* ════════════════════════════════════════════════════════════════
   TASMEEM v3 — Status Tokens (Worker 20 / Phase 1)
   These are documentation tokens. Phase 2-3 will use real font tokens.
   ════════════════════════════════════════════════════════════════ */
:root {
  /* DEVOTIO offline manifest (read-only after P1) */
  --tasmeem-stage: "phase-1-forensics";
  --tasmeem-fonts-status: "google-cdn-removed";
  --tasmeem-fonts-local-loaded: "0/9";
  --tasmeem-google-fonts-link-count: "0";  /* MUST stay 0 forever */
}
```

### Step 5 — Add a visible warning banner (optional, dev-only)

في `index.html`، قبل `</body>`، **APPEND** (يُحذف في Phase 3 بعد ربط الخطوط):

```html
<!-- TASMEEM v3 / Phase 1-2 transitional banner.
     Removed automatically in Phase 3 once fonts bind to voices. -->
<div id="tasmeem-transitional-banner" hidden
     style="position:fixed; bottom:1rem; inset-inline-end:1rem;
            background: rgba(0,0,0,0.85); color:#fff;
            padding:.6rem 1rem; border-radius:.5rem;
            font-family: system-ui, sans-serif; font-size:12px;
            z-index:9999; pointer-events:none;">
  TASMEEM Phase 1-2 transitional — system fallback active until Phase 3 binds local fonts.
</div>
<script>
  // Show banner only if fonts have not been declared via --tasmeem-fonts-status
  (function () {
    var b = document.getElementById('tasmeem-transitional-banner');
    var rs = getComputedStyle(document.documentElement);
    var status = rs.getPropertyValue('--tasmeem-fonts-status').trim().replace(/['"]/g,'');
    if (b && status !== 'phase-3-bound') b.hidden = false;
  })();
</script>
```

> **ملاحظة:** `--tasmeem-fonts-status` يُحدَّث في Phase 3 إلى `"phase-3-bound"` فيختفي البانر تلقائياً. هذي tooltip بصرية للمالك لمعرفة وضع المرحلة دون كسر شيء.

### Step 6 — Discipline Comment (نهاية Phase 1)

```css
/* ════════════════════════════════════════════════════════════════
   Worker 20 / Phase 1 — Forensics Discipline:
   1. النص أعلاه inventory فقط — لا قواعد فعلية.
   2. لا تعدّل أي --font-* أو --type-voice-* في هذا الـ phase.
   3. لا تحمّل أي خط — Phase 2 لذلك.
   4. لا تكتب @font-face هنا — Phase 2 لذلك.
   5. الـ banner سيختفي تلقائياً عند انتهاء Phase 3.
   6. لو رأيت Google Fonts URL في git diff → fail fast.
   ════════════════════════════════════════════════════════════════ */

/* End TASMEEM v3 / Worker 20 / Phase 1 ─────────────────────────────── */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14 (or 15)
grep -c 'qcalc' platform/index.html                                # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 24

# CRITICAL: Google Fonts removed
grep -c 'fonts.googleapis.com' platform/index.html                # → 0 ✓ (was 1)
grep -c 'fonts.gstatic.com' platform/index.html                   # → 0 ✓ (was 1)
grep -c 'preconnect.*fonts' platform/index.html                   # → 0 ✓ (was 1-2)

# Voice tokens preserved
grep -c '\-\-type-voice-' platform/assets/style.css               # → ≥18

# New additions
grep -c 'TASMEEM v3' platform/assets/style.css                    # → ≥3
grep -c 'tasmeem-stage' platform/assets/style.css                 # → 1
grep -c 'tasmeem-transitional-banner' platform/index.html         # → 1

# Network behavior:
# Open platform/index.html in browser with DevTools → Network tab
# Reload — should see: 0 requests to fonts.googleapis.com or fonts.gstatic.com ✓
# Visual: text renders with system fallback (often Cairo or Noto if installed) — expected
```

---

## ✅ معايير القبول (Phase 1)

- [ ] ٣ سطور Google Fonts (link + 2 preconnect) محذوفة من index.html.
- [ ] التعليق الجديد بدلها يُوثّق سبب الحذف.
- [ ] Inventory comment block (~480 سطر) موجود في style.css.
- [ ] Status tokens (`--tasmeem-stage`, `--tasmeem-fonts-status`, إلخ) معرَّفة.
- [ ] Transitional banner يظهر في المنصة (عند Phase 1، يختفي عند Phase 3).
- [ ] صفر network requests إلى Google عند تحميل الصفحة.
- [ ] جميع `--font-*` و `--type-voice-*` tokens محفوظة (لم تُعدَّل قيمها).
- [ ] جميع 18 W15 voice tokens موجودة.
- [ ] جميع W12 + W15 voice bindings (`.h-display`, `.type-hero`, إلخ) موجودة.
- [ ] Console: 0 errors. لا regression بصري كارثي (system fallback مقبول).
- [ ] grep counts الـ 14/391 محفوظة. عدد Upg.* ≥ 24.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css
git commit -m "phase 1 (devotio): font forensics — remove google fonts cdn + inventory 252 font-family + transitional banner"
# push immediately
```

ثم state commit:

```bash
# update state/PROGRESS.json:
#   current.pack = "v3"
#   current.worker = "20"
#   current.phase = 1
#   current.status = "in-progress"
#   completed_phases.push({"worker":"20","phase":1,...})
#   next_action = "Continue Worker 20 Phase 2 — Local Font Load"
# add snapshot state/snapshots/worker-20-phase-1.json with offline_check.google_fonts_links=0

git add state/PROGRESS.json state/snapshots/worker-20-phase-1.json
git commit -m "state: devotio phase 1 committed and pushed"
# push immediately
```

— نهاية Phase 1.

🕯️ **Devotion check:** هل المنصة الآن سيدة على نفسها (لا اتصال للشبكة عند التحميل)؟ نعم → انتقل لـ Phase 2 (Local Font Load).
