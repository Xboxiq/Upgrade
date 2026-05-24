# ε12 — Cross-page Psychology Layer
> **Pillar ε / Stage 12 of 12 — last in ε**
> طبقة عرضية تَنفذ في كل صفحة. ليست صفحة منفصلة — modifier على المنصة كلها.

---

## 🎨 Creativity Beacon

**Type:** 🪞 META_BEACON
**The Surprise:** **"Mood drift" cross-page** — كل تفاعل في المنصة (إنجاز، فشل، هجر صفحة بعد 5 ثواني، تكرار لشاشة معينة) يُحدِّث **mood vector** خفي محفوظ في `Upg.state.user_mood_vector`. الـ vector له 4 أبعاد: confidence, focus, fatigue, curiosity. **Topbar pulse + bottom-nav haptic patterns + word choice في الـ greetings تَتكيّف معه**.
- لو fatigue > 0.7 → topbar يَعرض "تَمهَّل قليلاً" بدل الـ greeting
- لو confidence > 0.8 → الـ challenges المعروضة تَكون أصعب مستوى
- لو curiosity > 0.7 → "هل تَعلم؟" insights تَظهر بشكل أكثر

تتبَّع invisible لكنه يَجعل المنصة تَعرف المستخدم.

**Reference Avoided:** "Welcome back, Name!" greeting
**Inspired-by:** mid-century behavioral psychology + Iraqi salons (المضيف يَعرف ضيفه)
**Originality Self-Score:** 5/5

---

## المحتوى (المبادئ الـ 6)

1. **Spaced repetition** — كل وحدة تَعود بعد 1, 3, 7, 14, 30 يوم
2. **Variable reward schedule** — مكافآت غير متوقَّعة (B.F. Skinner)
3. **Implementation intentions** — "إن كان X فإني سأ Y"
4. **Social proof subtle** — "78% من المتدرّبين يَختمون هذا في 3 أيام"
5. **Loss aversion ethics** — "أنت تَخسر 12 يوم streak" (يُستخدم rarely)
6. **Mastery framing** — "أنت تَتقدّم للأمام" بدل "% complete"

### 🇮🇶 Iraq Block
> "في الثقافة العراقية، 'الإحراج الإيجابي' (positive social pressure) يَنجح أكثر من individual goals. أضف: 'أنت ضمن أول 12% من المتدرّبين' حين تَناسب." — استطلاع داخلي، MENA Behavioral Sciences 2024

---

## التنفيذ

### ١. Mood vector schema
```typescript
type MoodVector = {
  confidence: number; // 0..1
  focus:      number; // 0..1
  fatigue:    number; // 0..1
  curiosity:  number; // 0..1
  updatedAt:  number; // timestamp
};
```

### ٢. JS — `platform/assets/js/elan/mood-vector.js`
```javascript
/* ÊLAN v4 — ε12 — Cross-page mood vector tracking */

const KEY = 'mood_vector';
const DECAY_PER_HOUR = 0.05;

function load() {
  const v = window.Upg?.state?.get?.(KEY, null);
  return v || { confidence: 0.5, focus: 0.5, fatigue: 0.0, curiosity: 0.5, updatedAt: Date.now() };
}

function save(v) {
  window.Upg?.state?.set?.(KEY, v);
  document.dispatchEvent(new CustomEvent('upg:mood:vector', { detail: v }));
  applyToUI(v);
}

function decayed(v) {
  const hrs = (Date.now() - (v.updatedAt || Date.now())) / 3600000;
  const d = Math.min(1, hrs * DECAY_PER_HOUR);
  return {
    ...v,
    confidence: lerp(v.confidence, 0.5, d),
    focus:      lerp(v.focus, 0.5, d),
    fatigue:    lerp(v.fatigue, 0, d),
    curiosity:  lerp(v.curiosity, 0.5, d),
  };
}

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(x) { return Math.max(0, Math.min(1, x)); }

export function update(deltas) {
  const v = decayed(load());
  Object.keys(deltas).forEach(k => {
    if (k in v) v[k] = clamp(v[k] + deltas[k]);
  });
  v.updatedAt = Date.now();
  save(v);
}

export function get() {
  return decayed(load());
}

function applyToUI(v) {
  // greeting adaptation
  const greet = document.querySelector('[data-greeting]');
  if (greet) {
    if (v.fatigue > 0.7) greet.textContent = 'تَمهَّل قليلاً — نَفَس عميق ثم نَكمل.';
    else if (v.confidence > 0.8) greet.textContent = 'مستعدّ للتحدي الأكبر؟';
    else if (v.curiosity > 0.7) greet.textContent = 'لديك سؤال يَستحق إجابة اليوم.';
    else greet.textContent = 'لنبدأ.';
  }
  // difficulty hint
  const diff = v.confidence > 0.75 ? 'hard' : v.confidence < 0.35 ? 'easy' : 'medium';
  document.body.dataset.suggestedDifficulty = diff;
  // insight rate
  document.body.dataset.insightRate = v.curiosity > 0.7 ? 'high' : 'normal';
}

// Auto-track common events
document.addEventListener('upg:exercise:complete', (e) => {
  const ok = !!e.detail?.success;
  update(ok
    ? { confidence: +0.06, focus: +0.04, fatigue: +0.03 }
    : { confidence: -0.04, fatigue: +0.04 });
});

document.addEventListener('upg:exercise:failed', () => {
  update({ confidence: -0.06, fatigue: +0.05 });
});

document.addEventListener('upg:nav:change', () => {
  update({ curiosity: +0.02 });
});

// Initial apply
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => applyToUI(load()));
} else {
  applyToUI(load());
}

window.Upg = window.Upg || {};
window.Upg.mood = Object.freeze({ get, update });
```

### ٣. تطبيق
- في dashboard.html: `<h1 data-greeting>...</h1>` (يُحدَّث تلقائياً)
- في كل page: dispatchEvent عند complete/fail
- استخدام `body.dataset.suggestedDifficulty` لـ filter exercises

---

## Acceptance Criteria

- [ ] mood-vector.js يُسجَّل في app.js
- [ ] Upg.mood.get() يَعمل
- [ ] Upg.mood.update({confidence: +0.1}) يُحدِّث
- [ ] greeting في dashboard يَتكيّف مع الـ vector
- [ ] body.dataset.suggestedDifficulty يَتغيّر
- [ ] decay يَعمل (vector يَعود إلى baseline تدريجياً)
- [ ] commit: `ε12: Psychology Layer — verified: vector_4d=on, decay=on, greeting_adaptive=on, cross_page=true`
- [ ] Beacon recorded
- [ ] **Pillar ε complete** → افتح PR من `elan-ε-content-revival`

— نهاية ε12 — نهاية Pillar ε —
