# ε6 — Content Revival: psych + eq + negotiation
> **Pillar ε / Stage 6 of 12** — العوالم: ندى + حَديد (دمج 3 صفحات)

---

## 🎨 Creativity Beacon

**Type:** 🌊 MOTION_BEACON
**The Surprise:** **Mood-meter ripple** — في صفحة eq، عند الإجابة على سؤال (e.g. "كيف تَشعر اليوم؟"), إجابة المستخدم تُصدِر **ripple دائرية** من نقطة الـ click. لون الـ ripple يَختلف حسب الإجابة:
- إيجابي → ripple أخضر زيتوني (var(--ember))
- محايد → ripple فضي (var(--ink-faint))
- سلبي → ripple بنفسجي عميق (var(--focus))
الـ ripple يَنتشر لـ 1200ms ثم يختفي. يُسجَّل المزاج في Upg.state للـ topbar pulse في δ3.

**Reference Avoided:** generic radio button selection
**Inspired-by:** #5 Yemeni mihrab (ripple from prayer-niche center)
**Originality Self-Score:** 4/5

---

## المحتوى

### psych (8 وحدات):
1. تحيز التأكيد + كيف تكسره
2. خداع الـ sunk cost
3. النفور من الخسارة (loss aversion)
4. ظاهرة Dunning-Kruger
5. اللاوعي في القرارات
6. Stanford Prison + Milgram — حدودك الأخلاقية
7. Cognitive load + قرارات السوق
8. Flow state — كيف تَدخله

### eq (6 وحدات):
1. تَسمية المشاعر (vocabulary)
2. التوقّف قبل الردّ (pause-respond)
3. Empathy ≠ sympathy
4. النَّفَس 4-7-8 + التحكُّم النيوري
5. Conflict de-escalation
6. علاقات صعبة طويلة المدى

### negotiation (7 وحدات):
1. BATNA + ZOPA
2. Anchoring اللذكي
3. Mirror & label (Chris Voss)
4. Tactical empathy
5. الصمت كأداة
6. التعامل مع الـ "نعم لكن"
7. الإغلاق بدون ضغط

### 🇮🇶 Iraq Block (لكل صفحة)
- psych: "في العراق، الـ 'فرحة بقضاء الواجب' ظاهرة Dunning-Kruger مَعكوسة..." (مع مصدر)
- eq: "لهجة الـ 'اشلونك' وقت اللقاء الأول تَزيد opening warmth بـ 40%..." (مع مصدر)
- negotiation: "في السوق العراقي، الصمت 8-12 ثانية بعد عرضك يُعطي الطرف الآخر إحساساً بالضغط..." (مع مصدر)

---

## التنفيذ

### ١. CSS — `pages/_eq.css`
```css
[data-world="nada"] .mood-meter {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--s-2);
  padding: var(--s-4);
  background: var(--anchor-1);
  border: 1px solid var(--line);
  border-radius: var(--r-3);
  overflow: hidden;
}

[data-world="nada"] .mood-meter__btn {
  position: relative;
  aspect-ratio: 1;
  border: 1px solid var(--line);
  background: var(--anchor-bg);
  border-radius: var(--r-2);
  cursor: pointer;
  font-family: var(--voice-display);
  font-size: var(--fs-2xl);
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
}

[data-world="nada"] .mood-ripple {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

[data-world="nada"] .mood-ripple span {
  position: absolute;
  border-radius: 50%;
  inline-size: 16px;
  block-size: 16px;
  transform: translate(-50%, -50%);
  animation: nada-ripple 1200ms ease-out forwards;
}

@keyframes nada-ripple {
  0%   { opacity: 0.5; transform: translate(-50%, -50%) scale(0.6); }
  100% { opacity: 0;   transform: translate(-50%, -50%) scale(40); }
}

@media (prefers-reduced-motion: reduce) {
  [data-world="nada"] .mood-ripple span { animation: none; }
}
```

### ٢. JS — `pages/eq.js`
```javascript
const MOOD_COLORS = {
  positive: 'var(--ember)',
  neutral:  'var(--ink-faint)',
  negative: 'var(--focus)',
};

function emitRipple(container, x, y, mood) {
  const layer = container.querySelector('.mood-ripple') || (() => {
    const l = document.createElement('div'); l.className = 'mood-ripple';
    container.appendChild(l); return l;
  })();
  const dot = document.createElement('span');
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.background = MOOD_COLORS[mood] || MOOD_COLORS.neutral;
  layer.appendChild(dot);
  setTimeout(() => dot.remove(), 1300);
}

export function bindMoodMeter() {
  document.querySelectorAll('[data-world="nada"] .mood-meter').forEach(meter => {
    if (meter.dataset.bound) return;
    meter.dataset.bound = 'true';
    meter.addEventListener('click', (e) => {
      const btn = e.target.closest('.mood-meter__btn');
      if (!btn) return;
      const mood = btn.dataset.mood; // 'positive' | 'neutral' | 'negative'
      const r = meter.getBoundingClientRect();
      emitRipple(meter, e.clientX - r.left, e.clientY - r.top, mood);
      window.Upg?.state?.set?.('current_mood', mood);
      document.dispatchEvent(new CustomEvent('upg:mood:change', { detail: { mood } }));
    });
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'nada') bindMoodMeter();
});
```

---

## Acceptance Criteria

- [ ] 8 psych + 6 eq + 7 negotiation = 21 unit total
- [ ] Iraq Block per sub-page
- [ ] mood-meter ripple works (3 colors)
- [ ] Upg.state.set('current_mood') updates → topbar pulse uses it
- [ ] icons: Phosphor brain, heart-straight, handshake, scales (لا emoji)
- [ ] respects reduced-motion (no ripple)
- [ ] commit: `ε6: Psych+EQ+Negotiation revived — verified: units=21, ripple=on, mood_state=on`
- [ ] Beacon recorded

— نهاية ε6 —
