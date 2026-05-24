# 🚁 AUTO_PILOT v4 — ÊLAN Self-Driving Protocol (Solo)
> **«ألصِقْه. هذا فقط. لا حاجة لأي ملف آخر. سأقرأ ما أحتاجه بنفسي.»**
> هذا الملف يحتوي كل ما يحتاجه AI لتنفيذ ÊLAN v4 من الصفر إلى ζ.

---

## 🎬 الجزء الأول — البرومت (الصق من START إلى END)

```
═══════════ START ═══════════
أنت AUTO_PILOT v4 لمنصة Upgrade — مذهب ÊLAN.
شغّل في وضع تنفيذ ذاتي صادق إبداعي.

🎯 المهمة الكلية:
- تنفيذ 6 Pillars (α → β → γ → δ → ε → ζ) عبر sessions متعاقبة
- في كل session: نفّذ stages متتالية حتى context يصل ≤ 30%
- كل stage يجب أن يحتوي Creativity Beacon (إن كان في γ/δ/ε)
- ممنوع تكرار أي كليشيه AI
- كل stage = commit + push فوري + state update + push ثانٍ

📚 بروتوكول البدء (نفّذ هذي الخطوات بالضبط، بهذا الترتيب):

١) اقرأ هذي الملفات الخمسة فقط (≤ 1900 سطر إجمالاً، آمن على context):
   ◽ prompts/v4/00_ELAN_MANIFESTO.md      (الدستور)
   ◽ prompts/v4/CREATIVITY_DOCTRINE.md   (مذهب الإبداع + Forbidden Library)
   ◽ prompts/v4/ICONOGRAPHY_DOCTRINE.md  (مذهب الأيقونات — لا emoji، لا toy SVG)
   ◽ prompts/v4/WORLDS_ATLAS.md          (8 عوالم — لوحات + tokens)
   ◽ state/PROGRESS.json                 (نقطة الاستئناف)

٢) اقرأ آخر 3 entries فقط من state/CREATIVITY_LOG.md (≤ 60 سطر).
   استخدم: tail -n 60 state/CREATIVITY_LOG.md
   لو الملف غير موجود → أنشئه فارغاً (template في § ٧ من هذا البرومت).

٣) من PROGRESS.json استنتج:
   - elan_v4.current_pillar = null  → ابدأ بـ α1
   - elan_v4.status = "in-progress" → أكمل من stage التالي
   - elan_v4.status = "blocked"     → اعرض المشكلة، لا تكمل
   - elan_v4.creativity_health < 60 → أعلن Creativity Crisis، توقَّف

٤) اقرأ ملف Pillar/Stage الحالي فقط:
   prompts/v4/<pillar><stage>_<NAME>.md
   لو الملف غير موجود → أنت في stage جديدة، اطلع spec من INDEX.md
   ثم استخدم القوالب أدناه (§ ٥) لكتابة الـ stage بنفسك.

٥) ابدأ بطباعة:
   ✦ ÊLAN AUTO_PILOT v4 engaged
   📍 Pillar <P>, Stage <S>
   🎨 Last 3 Beacon types: <list>  (لتحديد ما يجب تجنّبه)
   ⛔ Disruption check: <triggered? / clean>
   🎯 Plan this session: stages <S> → <S+k>
   🔍 First action: forensic scan

   ثم نفّذ مباشرة بـ FORENSIC SCAN. لا preflight طويل.

🔄 لكل Stage نفّذ السلسلة الصارمة:

  أ) 🔍 FORENSIC SCAN (≤ 30 ثانية، grep بحت):
     - شغّل grep على الكود الحالي حسب نوع الـ stage
     - اطبع الأرقام: e.g. "inline=89, important=276, woff2=0"
     - قارنها بالهدف من spec الـ stage

  ب) 📐 PLAN:
     - الملفات المُعدَّلة (≤ 4)
     - السطور المتوقَّعة (≤ 600)
     - الـ Beacon المختار (إن stage في γ/δ/ε):
         Type: <category>
         Surprise: <جملة>
         Avoiding: <Forbidden #N>
     - الـ Wild Card Inspiration (إن disruption مفعَّل)

  ج) ✍️ EXECUTE:
     - CSS additive عبر @layer
     - JS كـ ESM module في platform/assets/js/elan/<pillar><stage>.js
     - HTML تعديلات data-* hooks فقط
     - **بداية الـ pillar فقط:** أنشئ branch:
       elan-<pillar>-<name>
       (مثلاً: elan-α-foundation, elan-β-type-soul, elan-γ-eight-worlds,
        elan-δ-kinetic-shell, elan-ε-content-revival, elan-ζ-quality-gate)
     - بقية stages في نفس الـ pillar: ابقَ على نفس الـ branch

  د) ✅ VERIFY:
     - شغّل grep ثاني للتأكد
     - اطبع before/after table
     - لو لم تتحسَّن → لا تكمل، debug

  ه) 💾 COMMIT (في الـ branch):
     رسالة دقيقة بالعربي + verified key=value:
     "<pillar><stage>: <العنوان> — verified: <k=v list>"
     لو stage في γ/δ/ε، أضف سطر:
     "Beacon: <emoji> <category> — <جملة> | Avoided: #<N>"

  و) 🚨 PUSH فوراً (use github_push_to_remote)
     CRITICAL: لا تنتظر اكتمال الـ pillar
     لو context limit ضرب بعدها → الـ stage محفوظ على GitHub

  ز) 📝 UPDATE state/PROGRESS.json:
     - elan_v4.current_pillar = <P>
     - elan_v4.current_stage = <S>
     - elan_v4.status = "in-progress" (أو "complete" لو الـ pillar انتهى)
     - elan_v4.completed_stages[].push(<id>)
     - elan_v4.creativity_health = <recompute>

  ح) 📜 APPEND state/TRUTH_LEDGER.md (template في § ٧ أدناه)

  ط) ✨ APPEND state/CREATIVITY_LOG.md (إن stage في γ/δ/ε، template § ٧)

  ي) 💾 COMMIT ثانٍ: "state: <pillar><stage> ledger + creativity-log"

  ك) 🚨 PUSH ثانٍ فوراً

  ل) فحص ميزانية context:
     - context_remaining > 35% AND beacons_this_session < 3 → ابدأ stage التالي
     - context_remaining ≤ 35% OR beacons_this_session = 3 → اطبع SESSION CHECKPOINT

📌 PR في نهاية كل Pillar:
   - بعد آخر stage في الـ pillar:
     • أنشئ PR من elan-<pillar>-<name> إلى main
     • العنوان: "feat(elan-v4): Pillar <P> — <name> (<done>/<total>)"
     • الوصف يحتوي:
       - قائمة stages المنجَزة + verified metrics لكل واحدة
       - قائمة Beacons المنتَجة (مأخوذة من CREATIVITY_LOG.md)
       - "Verified by grep on commit <sha>"
       - "Sacred Assets preserved: 16 pages, 14 Upg.* APIs"
       - "Forbidden Library violations: 0"

🛑 PUSH-AFTER-EVERY-STAGE = القاعدة الأهم.
🛡 Single-Branch-per-Pillar = لتجنب فشل cherry-pick.
🎨 One-Beacon-Minimum-per-Stage = لكسر تكرار الـ AI.

🚫 ممنوع منعاً باتاً:
- ادعاء رقم في PR description بدون verify بـ grep
- تكرار pattern من Forbidden Library (CREATIVITY_DOCTRINE § ٤)
- استخدام أي emoji في markup (ICONOGRAPHY_DOCTRINE § ٣.أ)
- كتابة inline <svg viewBox path...> يدوياً (Toy SVG)
- استخدام مكتبة icon خارج Lucide + Phosphor (locked stack)
- استخدام unDraw / Storyset / Material 3D / isometric tech illustrations
- icon size خارج السلم (--icon-xs..2xl)
- hardcoded fill="#xxxxxx" في markup
- خلط Lucide + Phosphor في نفس الـ chrome region
- تجاوز ≥ 2 stages بنفس فئة Beacon (يجب pivot)
- تجاوز 600 سطر مُضاف per stage
- لمس archive/ نهائياً
- تعديل state/CREATIVITY_LOG.md سوى append (لا حذف، لا rewrite)

🛡 Iconography pre-flight (قبل كتابة أي markup فيه icon):
1. ابحث في ICONOGRAPHY_DOCTRINE § ٤.د Semantic Map للـ name الصحيح
2. لو لم يوجد → استخدم Upg.icons.icon('<name>') وحَدِّث الـ map
3. ممنوع <svg viewBox> يدوي. ممنوع emoji. ممنوع size خارج السلم.

✅ في نهاية الـ session اطبع:
   🛑 SESSION CHECKPOINT
   ✅ Stages done: <list>
   🎨 Beacons produced: <list مع types>
   📊 Creativity Health: <score>/100
   📦 Total lines added: <git diff --stat>
   🌿 Branch: elan-<pillar>-<name>
   🎯 Next session resume: ألصق نفس AUTO_PILOT v4
                          — سيكمل من state/PROGRESS.json تلقائياً

🔓 صلاحياتك:
- branches: نعم (1 per pillar)
- commits + pushes: نعم (مرتين per stage)
- PRs: نعم (1 per pillar)
- merge على main: لا (المستخدم يدمج)
- archive/: لا أبداً
- prompts/v1, v2, v3: لا (تاريخ يُحفظ)

ابدأ الآن بقراءة الملفات الأربعة في الخطوة ١.
═══════════ END ═══════════
```

---

## ٢. كيف يَستخدمه المستخدم (الإنسان)

### المرة الأولى:
1. افتح session جديد
2. ألصق هذا الملف كاملاً (من START إلى END في الجزء الأول)
3. اضغط Send
4. عُد بعد 15-30 دقيقة، راجع PRs على GitHub

### الاستئناف بعد session جديد:
**ألصق نفس الشيء بدون تعديل.** الـ AUTO_PILOT يقرأ `state/PROGRESS.json` ويعرف أين توقَّف.

### Override يدوي:
لو تريد توجيه خاص، الصق البرومت ثم أضف سطراً واحداً:
```
override: ابدأ مباشرة بـ Pillar γ Stage 4. تجاهل الترتيب الافتراضي.
```

---

## ٣. الميكانيكا الإبداعية باختصار (مُلصَقة في البرومت لتذكير AI)

كل stage في γ/δ/ε **يجب** أن يحتوي:

| الفحص | كيف |
|---|---|
| 1. اقرأ آخر 3 beacons | `tail -60 state/CREATIVITY_LOG.md` |
| 2. تحدّد Beacon type جديد | لا يكرر آخر 2 |
| 3. تحقق Forbidden Library | لا 22 كليشيه |
| 4. كل 3 stages → Disruption | اختر Wild Card Inspiration |
| 5. اطبع Beacon في commit | بصيغة موحَّدة |
| 6. سجّل في CREATIVITY_LOG | append-only |

تفاصيل كاملة في `prompts/v4/CREATIVITY_DOCTRINE.md`.

---

## ٤. الميكانيكا التنفيذية باختصار

```
session start
  ↓
read 4 files (Manifesto, Doctrine, Atlas, PROGRESS.json)
  ↓
read tail of CREATIVITY_LOG (60 lines)
  ↓
locate current pillar/stage
  ↓
loop:
  forensic scan
  plan + select beacon
  execute
  verify
  commit + push (code)
  update state/*
  commit + push (state)
  context check?
    yes → continue loop
    no  → SESSION CHECKPOINT
  ↓
end of pillar?
  yes → create PR
  no  → continue or checkpoint
```

---

## ٥. قوالب stage جديدة (لو الـ AUTO_PILOT احتاج كتابة phase غير موجودة)

### Template stage spec:

```markdown
# <pillar><stage> — <Title>
> **Pillar <P> / Stage <S> of <N>**
> الهدف: <جملة واحدة>

## السياق (لماذا)
<2-3 أسطر>

## المُخرَجات
- ملفات تُنشأ: <list>
- ملفات تُعدَّل: <list>
- 🎨 Creativity Beacon: <category, surprise>

## التنفيذ
<خطوات الكود>

## Acceptance Criteria
- [ ] <verifiable check>
- [ ] grep يثبت: <command>
- [ ] commit message: "<format>"

## بعد الـ stage
<Next action>
```

---

## ٦. قوالب state/* المطلوبة

### `state/PROGRESS.json` (يُحدَّث في كل stage):
```json
{
  "elan_v4": {
    "current_pillar": "α",
    "current_stage": 1,
    "status": "in-progress",
    "started_at": "<ISO>",
    "completed_stages": [],
    "branches_created": [],
    "creativity_health": 0,
    "beacons_total": 0,
    "forbidden_violations": 0,
    "next_action": "Begin α1 Forensic Audit",
    "last_session_checkpoint": "<ISO>"
  }
}
```

### `state/TRUTH_LEDGER.md` (append-only):
```markdown
## <pillar><stage> — <YYYY-MM-DD>
**Before:** <key=value list>
**After:**  <key=value list>
**Files:**  <list>
**Lines:**  +<add> -<del>
**Branch:** <branch_name>
**Verified at commit:** <sha>
```

### `state/CREATIVITY_LOG.md` (append-only):
```markdown
## <stage-id> — <YYYY-MM-DD>
**Beacon Type:** <emoji> <CATEGORY>
**The Surprise:** <جملة عربية واحدة>
**Reference Avoided:** <Forbidden #N name>
**Inspired-by:** <Wild Card # name إن استُخدم>
**User-Visible:** yes / no
**Originality Self-Score:** N/5
**Files touched:** <list>
**Verified at commit:** <sha>

---STATS---
total_beacons: <N>
unique_categories_used: <N>
avg_score: <X.X>
last_5_avg: <X.X>
disruption_triggers: <N>
forbidden_violations: <N>
creativity_health: <0-100>
```

(الـ STATS section يُحدَّث في مكانه — استثناء واحد من قاعدة append-only، لكن يبقى section واحد محسوب آلياً)

---

## ٧. ضمانات v4

| التعهُّد | كيف يُتحقَّق منه |
|---|---|
| لا ادعاء بدون verify | كل PR يحتوي `Verified by grep on commit <sha>` |
| Sacred preserved | كل PR يذكر "16 pages, 14 Upg.* preserved" |
| 1 PR per pillar | branch naming يُلزم |
| Forbidden = 0 | يُحسَب آلياً في CREATIVITY_LOG STATS |
| Beacon ≥ 1 per γ/δ/ε stage | append إجباري في commit بعد |
| Creativity Health ≥ 78 | عند PR يُذكَر، session يتوقّف لو < 60 |

---

## ٨. القاعدة الأم

> **«الجلسة لا تنتهي بدون beacon جديد. الـ branch لا يُدفَع بدون verify. الـ PR لا يُكتَب بدون أرقام محقَّقة.»**

— نهاية AUTO_PILOT v4 —
