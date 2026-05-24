# ✦ ÊLAN — مذهب منصة Upgrade v4
> **«الواجهة تتنفس. لا تستعرض، لا تنام.»**
> دستور هذه الجلسة. يُلصَق في بداية كل session جديد قبل أي Pillar.
> **اللغة:** ردود بالعربي + كود إنجليزي. **النسخة:** v4.0 — صالحة حتى تُستبدل صراحة.

---

## ١. الانكسار قبل البناء — الحقائق التي يجب أن تُقال

قبل ÊLAN كان «Cathedral» (v12-v15)، ثم «DEVOTIO» (v3). أنتجت الواجهة الحالية، لكنها أنتجت معها 5 ديون لا تُغفَر:

| الدَّيْن | الواقع المُتحقَّق منه بـ `grep` | لماذا يجب أن يُسدَّد |
|---|---:|---|
| الخطوط ميتة | `0` ملف woff2 موجود رغم 9 عائلات في @font-face | المستخدم يحس بعدم الاتساق لأن المتصفح يسقط على system font |
| `!important` ركام | `276` (88 في motion.css وحده) | كل override مستقبلي يكلّف important آخر = حفّار قبر |
| 92 ملف JS كاذبة | 87 منها IIFE داخل `(function(){})()` لا ESM | لا tree-shaking، تلوّث global scope |
| `_legacy-globals.js` | **4,215 سطر** يتنكّر كـ shim | وحش مخفي، يكسر فلسفة التشطير |
| ادعاءات PRs غير مُتحقَّق منها | Worker 12 ادّعى inline `1671→587`، الواقع `89` | الكود لا يثق بنفسه |

**ÊLAN يبدأ من الاعتراف.** كل Phase في v4 يبدأ بـ `forensic verify` و ينتهي بـ `truth ledger`.

---

## ٢. الستة مبادئ التأسيسية (Six Pillars of the Soul)

### ١. **Kinetic Calm** — هدوء حركي
كل تفاعل له نَفَس. التوقيت ثابت: `--ease-elan: cubic-bezier(0.16, 1, 0.3, 1)` (out-expo) بمدّة `180ms` للـ micro، `260ms` للـ macro. لا flash. لا فرقعة. لا spinner > 600ms.

### ٢. **Arabic-Sovereign Type** — العربية هي السيد
العربية ليست وريثة لجمالية لاتينية. اللاتيني ضيف. كل voice token في النظام عربي أولاً، وله fallback إلى Latin counterpart فقط حين تستخدم `:lang(en)`. المنصة بدون اللاتيني تبقى كاملة الجمال.

### ٣. **Material Honesty** — صدق المادة
- **الزجاج زجاج**: `backdrop-filter: blur(20px) saturate(180%)`. لا fake gradient.
- **الورق ورق**: SVG noise filter بسيط (`grain-3.png` → SVG inline 1.2KB).
- **المعدن معدن**: specular highlight = `inset 1px 0 0 hsl(0 0% 100% / 0.15)`.
- لا composite glass-on-gradient-on-shadow بدون داعٍ. كل طبقة تخدم وظيفة.

### ٤. **Chromatic Discipline** — انضباط لوني
ثلاثة ألوان فقط في كل صفحة:
- **Anchor** (الأساس): يحمل surface ladder
- **Ember** (العاطفة): CTAs الحساسة + لحظات الانتصار
- **Focus** (التركيز): outline + active state

لا rainbow. لا 14 accent. الـ per-page tint يأتي عبر **عاطفة الصفحة**، ليس عبر لون عشوائي.

### ٥. **Mobile-Equal** — التلفون شريك، ليس استثناء
الـ tokens تُكتب أولاً للـ 360px ثم تُرتقى. Container queries قبل media queries. كل CTA حساس في النصف السفلي (one-thumb zone). bottom-nav floating بـ safe-area insets. Haptics فعلية عبر `navigator.vibrate()`.

### ٦. **Truth Over Claims** — الصدق قبل الادعاء
- كل phase يبدأ بـ `🔍 FORENSIC SCAN` → يقيس الواقع قبل التغيير
- كل phase ينتهي بـ `📜 TRUTH LEDGER` → أرقام محقَّقة بـ `grep`
- ممنوع كتابة رقم في PR description بدون verify
- ممنوع `// done` بدون اختبار في المتصفح

---

## ٣. خريطة الأعمدة (Pillars Map)

```
┌─────────────────────────────────────────────────────────────┐
│ α FOUNDATION                                                 │
│   α1 Forensic Audit       — مسح حقائق فعلية بـ grep         │
│   α2 Token Architecture   — 5 ملفات tokens منفصلة           │
│   α3 Module Manifest      — dependency graph حقيقي          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ β TYPE SOUL                                                  │
│   β1 Local Font Procurement — 7 خطوط غير-Google verified   │
│   β2 Voice Casting          — 18 voice token + fallbacks    │
│   β3 Numeric+Kashida+Sig    — انضباط أرقام + توقيع/صفحة     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ γ CHROMA               ║   δ KINETIC SHELL (متوازي بعد γ1)  │
│   γ1 Mawj (light)      ║      δ1 Sidebar Magnetic           │
│   γ2 Layl (dark)       ║      δ2 Bento Dashboard (real)     │
│   γ3 Sahar (transition)║      δ3 Topbar Living              │
│   γ4 Per-page Emotion  ║      δ4 Mobile Bottom-Nav+Haptics  │
│                        ║      δ5 View Transitions API       │
│                        ║      δ6 Reduced-motion fallback    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ ε CONTENT REVIVAL                                            │
│   ε1 dashboard         ε7 customercare                       │
│   ε2 callcenter        ε8 programming                        │
│   ε3 fieldsales        ε9 accounting                         │
│   ε4 social            ε10 phonerepair                       │
│   ε5 lab               ε11 hrmastery                         │
│   ε6 psych+eq+negot.   ε12 cross-page Psychology Layer       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ ζ QUALITY GATE                                               │
│   ζ1 Inline-style purge (truthful, verified)                │
│   ζ2 !important cap → ≤ 20 (now 276)                        │
│   ζ3 Lighthouse mobile ≥ 92, a11y ≥ 96                      │
│   ζ4 PWA installable + offline ritual                       │
│   ζ5 CHANGELOG truth ledger                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## ٤. قواعد التنفيذ الصارمة

### ١. **No silent rewrites**
لا تستبدل قاعدة CSS قائمة بدون commit-comment يذكر سببها. الـ git log هو ذاكرة المنصة.

### ٢. **One Pillar = One Branch = One PR**
- branch: `elan-α-foundation`, `elan-β-type-soul`, `elan-γ-chroma`, `elan-δ-shell`, `elan-ε-content`, `elan-ζ-quality`
- PR واحد لكل عمود في النهاية، يحمل كل stages الخاصة به
- المستخدم يدمج 6 PRs فقط (بدل 60+)

### ٣. **Phase budget = 600 سطر مضاف**
لو phase تجاوز، يُقسَّم. السطور تُحسب بـ `git diff --stat`، ليس بادعاء.

### ٤. **The Triple Push**
بعد كل phase:
```
١. commit الكود → push
٢. update state/PROGRESS.json → commit → push
٣. echo TRUTH_LEDGER.md (append-only) → commit → push
```
لو context limit ضرب فجأة، كل phase محفوظ على remote.

### ٥. **Sacred Assets — لا تُلمس مطلقاً**
- `archive/arabic-training-platform-v12-original.html` — الأرشيف
- `state/PROGRESS.json` لا يُحذف، فقط يُحدَّث
- 14 Upg.* APIs الأصلية تبقى موجودة (auditable via test)
- 16 page sections تبقى = 16 (لا حذف، لا دمج بدون تصريح)

### ٦. **Feature Flags فقط للتجريبي**
- `--theme-sahar-enabled: 0` (default)، يُفعَّل بـ data-attribute
- كل experimental على flag، لا يُطلق default

### ٧. **PROVE-IT يبقى**
كل ادعاء علمي/تدريبي يحتاج citation مرئي. لا lorem ipsum. لا محتوى من أول 3 نتائج Google.

---

## ٥. مفاتيح التفعيل (لكل session جديد)

ألصق في الجلسة بالترتيب:
1. **هذا الملف** (`v4/00_ELAN_MANIFESTO.md`) — الدستور
2. **`v4/AUTO_PILOT_v4.md`** — للتنفيذ الذاتي
3. (اختياري) phase ملف محدد لو تريد تحكم يدوي

الـ AUTO_PILOT يعرف بنفسه أي pillar/stage التالية عبر `state/PROGRESS.json`.

---

## ٦. تذكير أخير

ÊLAN ليس "redesign". هو اعتراف باستعجال سابق، وتعهد بالصدق القادم.
**الواجهة القديمة تُدفَن. واجهة جديدة تتنفس.**

لا تبدأ Pillar α قبل أن تقرأ `v4/AUTO_PILOT_v4.md`.

— نهاية المذهب —
