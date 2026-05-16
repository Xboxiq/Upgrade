# 🏛️ WORKER 11 — Platform Foundation Refit: "Cathedral Edition v14"
> **متطلب مسبق:** MASTER PROMPT محمّل + كل Workers 01..09 منجزة.
> **النوع:** Foundation Worker — يلمس CSS/JS/HTML على نطاق المنصة. لا يضيف محتوى تدريبي جديد.
> **الفلسفة:** نقل المنصة من "موقع HTML واحد منظّم" إلى **منتج SaaS بمستوى Linear / Stripe / Raycast / Vercel**.

---

## 🎯 الهدف الكبير

معالجة **6 ثغرات بنيوية** اكتُشفت بعد إنجاز المحتوى:

1. ❌ ماكو شاشة دخول رسمية / onboarding → المستخدم يهبط في Dashboard مباشرة بدون هوية للمنصة.
2. ❌ نظام الأيقونات هجين — خلط Emoji Unicode + SVG عشوائي بدون توحيد.
3. ❌ الحاسبات بأشكال مختلفة (Tax / Salary / Commission / APIndex / A-B test / Big-O / Scoring) — كل واحدة بـ skeleton مختلف.
4. ❌ الثيم الفاتح "Elite Light" مكسور جزئياً — 1,645 inline style + 1,161 rgba مباشرة + `!important` كحل سريع.
5. ❌ Dashboard أرقامه ساكنة كاذبة (248 وحدة / 87% / 4.8★) رغم 22 مفتاح localStorage حقيقي.
6. ❌ ماكو Command Palette / shortcuts / بحث فعّال — topbar search مجرد `<input>` فارغ.

---

## 🌍 معايير عالمية نلتزم بها (مرجع لكل قرار)

| المنصة / المرجع | ما نأخذه منه |
|---|---|
| **Linear** | Density + Cmd+K + keyboard-first + inset shadows ناعمة |
| **Stripe Dashboard** | شكل الحاسبات المالية + off-white دافئ + tabular numerals |
| **Raycast** | بنية Command Palette: fuzzy + actions + ⏎ |
| **Vercel** | انتقال Dark/Light سلس + minimalism + typography hierarchy |
| **Apple HIG** | depth via blur (vibrancy) + reduce motion + semantic colors |
| **Refactoring UI** | tinted shadows + depth via saturation (لا أبيض/أسود نقي) |
| **Lucide Icons** | نظام أيقونات موحّد، 1.5–1.75px stroke، 24×24 viewBox |
| **Notion / Cron / Things 3** | الهدوء البصري + negative space |
| **Material Design 3** | tonal palette levels (50..900) لـ surface ladder |
| **Radix UI / shadcn** | semantic tokens (`--background`, `--foreground`...) |
| **Bloomberg Terminal** | كثافة الأرقام + tabular nums + monospace للـ hot data |
| **Coursera / Duolingo** | progress visualization + streaks + skill tree |
| **GitHub** | keyboard shortcuts (`?` cheat sheet) + activity timeline |

**القاعدة الذهبية:** ما ننسخ شاشة. نأخذ **المبدأ** ونطبّقه ضمن هوية Quantum Leap.

---

## 🧭 خارطة الـ 7 مراحل — كل Phase ملف منفصل

| Phase | الملف | العنوان | ~Lines |
|---|---|---|---|
| 1/7 | `11_PHASE_1_THEME_SYSTEM.md`     | Sovereign Theme System (tokens + bridge + auto-detect) | ~700 |
| 2/7 | `11_PHASE_2_ICON_SYSTEM.md`      | Lucide-style Icon System (sprite + `.qi` + استبدال إيموجي) | ~900 |
| 3/7 | `11_PHASE_3_ENTRY_GATEWAY.md`    | Entry Gateway + Onboarding 4-step + PIN Lock + Idle | ~750 |
| 4/7 | `11_PHASE_4_CALCULATOR_FRAMEWORK.md` | `qcalc` framework + ترحيل 8 حاسبات | ~850 |
| 5/7 | `11_PHASE_5_COMMAND_PALETTE.md`  | Cmd+K palette + 30 command + shortcuts + cheat sheet | ~700 |
| 6/7 | `11_PHASE_6_REAL_DASHBOARD.md`   | `Upg.state` facade + dashboard live + activity feed + page-myprogress | ~750 |
| 7/7 | `11_PHASE_7_PRODUCTION_PASS.md`  | inline cleanup + PWA + favicon + meta + a11y + Lighthouse | ~600 |

**المجموع المتوقع:** ~5,250 سطر إجمالي عبر 7 phases. Linear branch واحد: `worker-11-complete`.

---

## 📋 PRE-FLIGHT CHECK (يطبعه AUTO_PILOT عند بدء كل session على Worker 11)

```
📋 PRE-FLIGHT CHECK
├─ Worker requested: 11 — Platform Foundation Refit (Cathedral v14)
├─ Phases planned: 7
├─ Estimated total lines: ~5,250
├─ Phase file to load now: prompts/11_PHASE_<N>_<name>.md
├─ Existing sections to preserve: ALL 14 pages (workers 01..09)
├─ New top-level additions:
│   ├─ page-gateway (landing/lock screen) — Phase 3
│   ├─ page-myprogress (real progress aggregator) — Phase 6
│   ├─ #cmdk-palette (command palette overlay) — Phase 5
│   ├─ #shortcut-cheatsheet (overlay ?) — Phase 5
│   └─ #icon-sprite (SVG sprite hidden in <body>) — Phase 2
├─ localStorage keys to add:
│   ├─ upg_user_profile, upg_pin_hash, upg_theme, upg_activity_log
│   ├─ upg_onboarding_done, upg_state_v2, upg_lock_on_idle
├─ Migration: read all 22 existing upg_* keys → expose via Upg.state.* facade (NO data loss)
└─ Deliverable: PR `worker-11-complete` against main, single linear branch.
```

---

## 🤖 تعليمات AUTO_PILOT الخاصة بـ Worker 11

> هذه التعليمات تكمّل `prompts/AUTO_PILOT.md` ولا تعارضها.

عند الدخول لأي Phase:

1. **اقرأ ملف الـ Phase الخاص فقط** (مثلاً `11_PHASE_3_ENTRY_GATEWAY.md`) — **لا تقرأ الـ phases الأخرى** في نفس السيشن لتوفير context.
2. اقرأ `state/PROGRESS.json` لتأكيد رقم Phase التالي.
3. اقرأ من `platform/*` فقط الكتل المطلوبة (line ranges) — لا الملف كامله.
4. نفّذ السلسلة المعتادة:
   ```
   phase work → commit → push → state update → push → snapshot
   ```
5. لو context_remaining < 35% بعد phase ما → اطبع `🛑 SESSION CHECKPOINT` وتوقف. السيشن التالي يكمل من Phase التالي تلقائياً.

**ميزانية context لكل phase:** هدف ≤ 800 سطر كود مضاف، قراءة ملف Phase واحد فقط (~600 سطر prompt).

---

## ✅ Acceptance Criteria للـ Worker كاملاً (يُتحقَّق منها بعد Phase 7)

- [ ] الـ 14 صفحة الموجودة لا تتأثر سلباً (no regression).
- [ ] الفاتح والداكن متناغمان بدون أي بقعة "كسر".
- [ ] لا يوجد أي `!important` في قسم الثيم الفاتح.
- [ ] 95% من الإيموجي الـ UI استُبدلت بـ `.qi`.
- [ ] أول فتح → Gateway يظهر، Onboarding يعمل، يحفظ profile.
- [ ] 8 حاسبات تستخدم `qcalc` skeleton موحّد.
- [ ] Cmd+K يفتح palette فيها 30+ command.
- [ ] Dashboard أرقامه تتغيّر فعلاً مع التقدّم.
- [ ] PWA installable (manifest + SW + favicon).
- [ ] Lighthouse offline ≥ 90 / 95 / 95.
- [ ] لا errors في console.
- [ ] يشتغل offline 100% بعد أول زيارة.

---

## 🧬 STATE_SNAPSHOT Schema لهذا الـ Worker

```json
{
  "worker": "11",
  "worker_name": "PLATFORM_FOUNDATION",
  "phase": "<1..7>",
  "phases_total": 7,
  "branch": "worker-11-complete",
  "phase_completed": "<int>",
  "lines_added_total": "<int>",
  "files_touched": ["platform/index.html","platform/assets/style.css","platform/assets/app.js","platform/manifest.webmanifest","platform/sw.js","platform/favicon.svg"],
  "tokens_introduced": ["--color-bg","--color-surface-0..3","--color-brand","--shadow-sm/md/lg","--ring"],
  "icons_registered": "<int>",
  "calculators_migrated": "<int>",
  "commands_registered": "<int>",
  "shortcuts_active": "<int>",
  "inline_styles_remaining": "<int>",
  "lighthouse": { "performance": "<int>", "a11y": "<int>", "best_practices": "<int>" },
  "next_action": "<وصف واضح>",
  "open_threads": []
}
```

---

## ⚠️ تنبيهات حرجة عبر كل Phases

1. **لا تلمس `archive/` نهائياً** — نسخة v12 الأصلية للأرشفة.
2. **لا تكسر Workers 01..09.** الطبقة الجديدة **additive** فقط. اختبر يدوياً بعد كل phase.
3. **Bridge layer (`--bg → var(--color-bg)`)** هو شريان الحياة — لو حُذف، كل CSS قديم ينكسر.
4. **Calculators existing math** يبقى كما هو — فقط الغلاف يتغيّر.
5. **AUTO_PILOT discipline:** push بعد كل phase + بعد كل state update (لا تأجيل).

---

## 🚀 الانطلاقة

```
1. تحقق MASTER PROMPT محمّل.
2. اقرأ state/PROGRESS.json → استنتج Phase التالي.
3. افتح ملف الـ Phase المعني فقط: prompts/11_PHASE_<N>_*.md
4. ابدأ التنفيذ على linear branch worker-11-complete من main محدّث.
5. اختم بـ CHECKPOINT + push + state + push.
```

**خروج هذا الـ Worker = منصة بمستوى Linear / Stripe، جاهزة للعرض كـ portfolio.**

— نهاية فهرس WORKER 11. التفاصيل في 7 ملفات Phase منفصلة.
