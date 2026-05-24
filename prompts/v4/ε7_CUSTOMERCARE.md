# ε7 — Content Revival: customercare
> **Pillar ε / Stage 7 of 12** — العالم: وَرشة (Warsha)

---

## 🎨 Creativity Beacon

**Type:** 🌈 CHROMATIC_BEACON
**The Surprise:** كل sectionsعن "حالة العميل" تَتلوّن حسب **sentiment analysis مبسَّط للنص الذي يَكتبه المتدرب**. عند كتابة رد للعميل، الـ background للـ textarea يَتدرّج:
- نص ودود → tint أخضر زيتوني خفيف (var(--ember-soft) + 6% opacity)
- نص محايد → tint طوب فاتح
- نص حاد → tint أحمر طوبي (warning)
Sentiment scoring: keyword-based بسيط (لا ML library). يَعمل offline 100%.

**Reference Avoided:** generic textarea + char counter
**Inspired-by:** real-time emotional feedback in tactile workshop
**Originality Self-Score:** 4/5

---

## المحتوى (8 وحدات)

1. **استقبال شكوى صعبة** — تقنية HEARD
2. **تصعيد لبدائل (alternatives ladder)**
3. **التعامل مع الـ angry customer**
4. **العميل الحزين** — empathy script
5. **تحويل الشكوى إلى بيع**
6. **اعتذار حقيقي ≠ "نعتذر للإزعاج"**
7. **متابعة بعد الحلّ — ٤٨ساعة rule**
8. **بناء loyalty من خلال خدمة سيئة سابقة**

### 🇮🇶 Iraq Block
> "في الخدمة العراقية، 'بسيط لا تشيل هم' أكثر فعالية من 'سنحلّ المشكلة'. اللهجة المحلية + التطمين الفوري يَختصر وقت التهدئة بـ 40%." — IBC Service Standards 2024

---

## التنفيذ

### ١. CSS
```css
[data-world="warsha"] .response-area {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

[data-world="warsha"] .response-textarea {
  min-block-size: 160px;
  padding: var(--s-3);
  border: 2px solid var(--line);
  border-radius: var(--r-2);
  background: var(--anchor-1);
  color: var(--ink);
  font-family: var(--voice-body);
  resize: vertical;
  transition: background 320ms ease, border-color 320ms ease;
}

[data-world="warsha"] .response-textarea[data-sentiment="warm"]    { background: color-mix(in oklch, var(--ember) 6%, var(--anchor-1)); border-color: color-mix(in oklch, var(--ember) 40%, var(--line)); }
[data-world="warsha"] .response-textarea[data-sentiment="neutral"] { background: var(--anchor-1); }
[data-world="warsha"] .response-textarea[data-sentiment="harsh"]   { background: color-mix(in oklch, var(--state-warning) 8%, var(--anchor-1)); border-color: color-mix(in oklch, var(--state-warning) 40%, var(--line)); }

[data-world="warsha"] .sentiment-meter {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  font-family: var(--voice-label);
  font-size: var(--fs-sm);
  color: var(--ink-muted);
}
```

### ٢. JS — `pages/customercare.js`
```javascript
const WARM_WORDS = ['شكراً','يسعدني','بسيط','هم','اعتذر','نعتذر','نقدر','حضرتك','يا أستاذ','يا حبيب','تطمين'];
const HARSH_WORDS = ['غير ممكن','لن','صعب','لا أستطيع','هذي مشكلتك','غلط','خطأ منك','فهمت','اقرأ'];

function score(text) {
  const lc = text.toLowerCase();
  let warm = 0, harsh = 0;
  WARM_WORDS.forEach(w => { if (lc.includes(w.toLowerCase())) warm++; });
  HARSH_WORDS.forEach(w => { if (lc.includes(w.toLowerCase())) harsh++; });
  if (warm > harsh + 1) return 'warm';
  if (harsh > warm) return 'harsh';
  return 'neutral';
}

export function bindResponseAreas() {
  document.querySelectorAll('[data-world="warsha"] .response-textarea').forEach(ta => {
    if (ta.dataset.bound) return;
    ta.dataset.bound = 'true';
    ta.addEventListener('input', () => {
      const s = score(ta.value);
      ta.dataset.sentiment = s;
      const meter = ta.closest('.response-area')?.querySelector('.sentiment-label');
      if (meter) {
        const labels = { warm: 'نَفَس دافئ', neutral: 'محايد', harsh: 'حاد — راجع' };
        meter.textContent = labels[s];
      }
    });
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'warsha') bindResponseAreas();
});
```

---

## Acceptance Criteria

- [ ] 8 units, PROVE-IT
- [ ] Iraq Block
- [ ] response-textarea sentiment shows tint shift in real-time
- [ ] 3 sentiment levels (warm/neutral/harsh)
- [ ] keyword-based scoring offline
- [ ] icons: Phosphor handshake, heart-straight, smiley-melting (لا emoji)
- [ ] commit: `ε7: CustomerCare revived — verified: sentiment=3-levels, units=8, warsha=on`
- [ ] Beacon recorded

— نهاية ε7 —
