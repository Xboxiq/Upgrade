# منصة Upgrade — التدريب الذاتي العميق

> **«ثمانية عوالم بصرية تتنفس داخل واجهة واحدة. كل صفحة لها روحها، النظام يحفظ الترابط.»**

---

## ✦ النسخة الحالية: ÊLAN v4

النسخة v4 (مذهب ÊLAN) تَستبدل DEVOTIO v3 (الـ Cathedral) بنظام ثمانية عوالم بصرية + مذهب الإبداع + مذهب الأيقونات.

📜 **القراءة الأولى:**
- `CHANGELOG.md` — التفاصيل الكاملة + 30 Beacon موثَّق
- `prompts/v4/00_ELAN_MANIFESTO.md` — الدستور الجذري (9 مبادئ)
- `prompts/v4/CREATIVITY_DOCTRINE.md` — مذهب الإبداع + Forbidden Library
- `prompts/v4/ICONOGRAPHY_DOCTRINE.md` — لا emoji، لا Toy SVG
- `prompts/v4/WORLDS_ATLAS.md` — أطلس الـ 8 عوالم اللوني والصوتي

---

## 🌍 العوالم الثمانية

| # | العالم | الإلهام | الصفحات |
|---|---|---|---|
| 1 | **حِبر** (Hibr) — Ink | المخطوطات النَجَفية + خط النَّسخ | dashboard, myprogress |
| 2 | **نار** (Naar) — Fire | Brutalism العراقي (Chadirji, Makiya) | lab, programming |
| 3 | **ندى** (Nada) — Dew | المحراب اليمني + ضوء الفجر | psych, eq |
| 4 | **حَديد** (Hadeed) — Iron | أفيشات سينما بيروت 1950–70 | negotiation, fieldsales |
| 5 | **ذَهَب** (Dhahab) — Gold | المنمنمات الفارسية + كتب المحاسبة المغولية | accounting |
| 6 | **تَيار** (Tayyar) — Current | Synthwave + Memphis Group | social, callcenter |
| 7 | **وَرشة** (Warsha) — Workshop | سوق البتاوين + ورش العتيقة | phonerepair, customercare |
| 8 | **صَالون** (Saloon) — Salon | صالونات بيروت 1960 + خشب الجوز | hrmastery |

---

## 📂 بنية المشروع

```
Upgrade/
├── platform/                            ← الكود الشغّال (افتح index.html)
│   ├── index.html                       (الهيكل + 15 page section)
│   ├── manifest.webmanifest             (PWA — ζ4)
│   ├── sw.js                            (Service Worker — ζ4)
│   ├── offline.html                     (واجهة بلا اتصال — ζ4)
│   └── assets/
│       ├── style.css                    (legacy bridge)
│       ├── app.js                       (ESM entry — يَستورد جميع modules)
│       ├── css/
│       │   ├── tokens.css               (entry point)
│       │   ├── tokens/_color.css        (α2)
│       │   ├── tokens/_space.css        (α2)
│       │   ├── tokens/_type.css         (β1 + β2)
│       │   ├── tokens/_motion.css       (α2)
│       │   ├── tokens/_breakpoint.css   (α2)
│       │   ├── tokens/_voice-utilities.css   (β2)
│       │   ├── tokens/_signature.css    (β3)
│       │   ├── tokens/_layout.css       (ζ1)
│       │   ├── worlds/_<8 worlds>.css   (γ2..γ9)
│       │   └── pages.css                (محتوى المنصة)
│       └── js/elan/
│           ├── world-<8 worlds>.js      (γ2..γ9 modules)
│           ├── sidebar-magnetic.js      (δ1)
│           ├── bento-temporal.js        (δ2)
│           ├── topbar-living.js         (δ3)
│           ├── bottom-nav.js            (δ4)
│           ├── delta6-motion.js         (δ6)
│           ├── epsilon<1..12>.js        (ε pillar — 12 stages)
│           └── zeta4-install.js         (ζ4 — Upg.elan.install)
│
├── archive/                             ← الأصل العملاق (لا يُلمَس)
│   └── arabic-training-platform-v12-original.html
│
├── prompts/                             ← تاريخ القرار
│   ├── v1/   (ATELIER)                  — كامل، مَحفوظ
│   ├── v2/   (RESONANCE)                — كامل، مَحفوظ
│   ├── v3/   (DEVOTIO)                  — كامل، مَحفوظ
│   └── v4/   (ÊLAN)                     — النشط
│       ├── AUTO_PILOT_v4.md             (البرومت الذي يَلصقه المستخدم)
│       ├── 00_ELAN_MANIFESTO.md
│       ├── CREATIVITY_DOCTRINE.md
│       ├── ICONOGRAPHY_DOCTRINE.md
│       ├── WORLDS_ATLAS.md
│       ├── INDEX.md
│       └── <pillar><stage>_<NAME>.md    (39 stage spec)
│
├── state/
│   ├── PROGRESS.json                    (نقطة الاستئناف + creativity_health)
│   ├── TRUTH_LEDGER.md                  (append-only، أرقام مُحقَّقة)
│   ├── CREATIVITY_LOG.md                (append-only، 30 beacons + STATS)
│   ├── IMPORTANT_AUDIT.md               (ζ2 — تَصنيف 376 !important)
│   ├── LIGHTHOUSE_REPORT.md             (ζ3 — static + deferred runtime)
│   ├── AUDIT_BASELINE.md                (α1)
│   └── CHANGELOG.md                     (legacy v1..v3 ledger)
│
├── scripts/
│   ├── elan-zeta1-migrate.mjs           (ζ1 — inline-style migrator)
│   ├── zeta1-truthful-corrective.py     (ζ1.5 — corrective audit)
│   ├── zeta2-important-audit.py         (ζ2 — !important categoriser)
│   ├── zeta3-static-audit.mjs           (ζ3 — Lighthouse signal proxy)
│   └── split-platform.mjs               (legacy splitter)
│
├── CHANGELOG.md                         (ÊLAN v4 + previous packs)
└── README.md                            (this file)
```

---

## ▶️ كيف تُشغَّل المنصة

افتح `platform/index.html` مباشرة في متصفح حديث (Safari 17+ / Firefox 121+ / Chromium 122+).

في حالة Safari iOS، انتظر تَفعيل DeviceOrientation عبر زر "اسمح بالحركة" (δ1 يَطلبه عند الحاجة).

أو شغّل سيرفر بسيط للحصول على Service Worker:

```bash
# Python 3
python3 -m http.server 8000
# ثم افتح http://127.0.0.1:8000/platform/index.html
```

PWA: زُر `index.html` ثم اضغط "Install Upgrade" من cmdk أو settings — `Upg.elan.install.prompt()` يُفعَّل عبر BeforeInstallPromptEvent المحفوظ.

---

## 🛠 كيف تُطوَّر المنصة

### الطريقة الموصى بها — AUTO_PILOT v4 (تنفيذ ذاتي صادق إبداعي)

1. افتح session جديد في Kiro.
2. ألصق `prompts/v4/AUTO_PILOT_v4.md` بالكامل.
3. AUTO_PILOT يَقرأ:
   - `00_ELAN_MANIFESTO.md` (الدستور)
   - `CREATIVITY_DOCTRINE.md` (مذهب الإبداع + Forbidden Library)
   - `ICONOGRAPHY_DOCTRINE.md` (مذهب الأيقونات)
   - `WORLDS_ATLAS.md` (8 عوالم — tokens)
   - `state/PROGRESS.json` (نقطة الاستئناف)
   - آخر 3 entries من `state/CREATIVITY_LOG.md`
4. AUTO_PILOT يُنفِّذ stages متتالية — كل stage فيه: forensic + plan + execute + verify + commit + push + state update + 2nd commit + 2nd push.
5. عند نهاية كل pillar، AUTO_PILOT يَفتح PR.
6. أنت تُراجع وتَدمج.

القواعد الذهبية (مَفروضة على AUTO_PILOT):
- 🛑 PUSH-AFTER-EVERY-STAGE.
- 🛡 Single-Branch-per-Pillar.
- 🎨 One-Beacon-Minimum-per-γ/δ/ε-Stage (ζ stages quality-only).
- 🚫 ممنوع ادعاء رقم بدون verify بـ grep.
- 🚫 ممنوع تكرار pattern من Forbidden Library.
- 🚫 ممنوع emoji في markup.
- 🚫 ممنوع `<svg viewBox path>` يدوي.

---

## 📊 الإحصاءات (verified — 2026-05-28)

| المعيار | القيمة | المصدر |
|---|---|---|
| Pillars | 6 | α / β / γ / δ / ε / ζ |
| Stages مُنجَزة | 38 من 39 | `state/PROGRESS.json` (ζ5 ungoing) |
| Branches | 6 | واحد per pillar |
| Beacons موثَّقة | 30 | `state/CREATIVITY_LOG.md` |
| فئات Beacon مُستخدَمة | 9 من 9 | الـ Doctrine يَطلب تَنوُّعاً |
| Forbidden Library violations | 0 | عبر كل النسخة |
| متوسط Originality Self-Score | 4.13 / 5 | last 5 stages avg = 4.0 |
| Creativity Health | 100 / 100 | `state/PROGRESS.json::elan_v4.creativity_health` |
| inline `style=` (non-dynamic) | 23 → 0 | ζ1 + ζ1.5 |
| `!important` كـ cascade hacks | 0 | ζ2 |
| Sacred preserved | 15 pages / 391 qcalc | unchanged منذ v1 |
| Service Worker precache | 170 entries | ζ4 |

> **Lighthouse runtime measurement deferred to user environment** — راجع `state/LIGHTHOUSE_REPORT.md` للأمر الذي يجب تَشغيله محلياً.

---

## 🛡 الأصول المُقدَّسة (Sacred Assets)

| الأصل | لماذا |
|---|---|
| `archive/arabic-training-platform-v12-original.html` | تاريخ يُحفَظ — لا يُلمَس |
| 14+ legacy `Upg.*` APIs | backward-compat |
| 15 page sections | لا حذف، لا دَمج |
| 391 `qcalc` references | المحتوى التعليمي |
| `prompts/v1, v2, v3` | تاريخ القرار |
| `state/CREATIVITY_LOG.md` | append-only ذاكرة الإبداع |
| `state/TRUTH_LEDGER.md` | append-only ذاكرة الحقائق |

---

## 📝 الفلسفة في 9 مبادئ

ÊLAN v4 يَتبنى تسعة أُسس جذرية:

1. **Eight Worlds, One Constitution** — ثمانية عوالم بدستور واحد.
2. **Arabic Calligraphy as Architecture** — الخط العربي يُحدِّد bones الواجهة.
3. **Brutalist Honesty** — الزجاج زجاج، المعدن معدن، الكود يَقول الحقيقة.
4. **Chromatic Sovereignty** — لكل عالم anchor + ember + focus، لا أكثر.
5. **Mobile-Sovereign** — الـ tokens تُكتَب أولاً للـ 360px.
6. **Truth Over Claims** — كل phase يبدأ بـ FORENSIC وينتهي بـ TRUTH LEDGER.
7. **Creativity Mandate** — كل session يُنتج Beacon إبداعي على الأقل.
8. **Forbidden Patterns** — قائمة بـ 28+ من كليشيهات AI ممنوعة قطعياً.
9. **Iconography Sovereignty** — لا emoji، لا Toy SVG، Lucide + Phosphor فقط.

التفاصيل الكاملة في `prompts/v4/00_ELAN_MANIFESTO.md`.

---

## 📜 الترخيص والملكية

كود المنصة: ملكية المؤلف.
Lucide Icons: ISC License.
Phosphor Icons: MIT License.
الخطوط العربية المُحمَّلة محلياً: SIL OFL (Open Font License) أو ما يُكافِئها — راجع `platform/assets/fonts/MANIFEST.json`.

— *آخر تَحديث: 2026-05-28 / ÊLAN v4 — ζ5*
