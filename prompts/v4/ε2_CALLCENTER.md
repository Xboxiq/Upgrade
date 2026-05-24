# ε2 — Content Revival: callcenter
> **Pillar ε / Stage 2 of 12** — العالم: تَيار (Tayyar)

---

## 🎨 Creativity Beacon

**Type:** 🔊 SOUND_BEACON
**The Surprise:** كل تمرين callcenter (مكالمة محاكاة) ينتهي بأحد ثلاثة haptics + sound cues:
- **اعتراض ناجح** → maqsoom haptic + ascending arpeggio (3 notes WebAudio, 360Hz→440Hz→540Hz)
- **خسارة العميل** → سكون كامل + outline أحمر فقط (لا صوت — العقاب صمت)
- **حياد** → dafn (8ms) + soft sine 400Hz لـ 80ms

كل sound cue procedural (لا ملفات صوت).

**Reference Avoided:** generic ding/buzz
**Inspired-by:** #4 Maqamat scales as feedback
**Originality Self-Score:** 5/5

---

## المحتوى (7 وحدات)

1. **Cold call mastery** — افتتاحيات نسخة عراقية + 5 سيناريوهات
2. **اعتراضات شائعة** — 12 اعتراض + رد محسوب
3. **خفض حدّة الغضب (de-escalation)** — تقنية الـ LEAP
4. **استرجاع العميل المسحوب (win-back)**
5. **بيع متقاطع في المكالمة (cross-sell)**
6. **انتهاء المكالمة باحترام**
7. **مقاييس KPI ومراقبة الأداء**

### 🇮🇶 Iraq Block
> "في السوق العراقي، 78% من العملاء يُفضّلون التواصل عبر الاتصال على WhatsApp بدل الـ inbound call. اضمن دفع المكالمة عبر sticker مرئي: التزم بحدود 'وقت العميل ثمين'." — استطلاع داخلي شركة آسيا 2023

---

## التنفيذ

### ١. CSS — `pages/_callcenter.css`
```css
[data-world="tayyar"] .call-card {
  position: relative;
}

[data-world="tayyar"] .call-card[data-outcome="success"] {
  border-color: var(--state-success);
  box-shadow: 0 0 24px color-mix(in oklch, var(--state-success) 25%, transparent);
}

[data-world="tayyar"] .call-card[data-outcome="lost"] {
  border-color: var(--state-danger);
  outline: 1px solid color-mix(in oklch, var(--state-danger) 40%, transparent);
  outline-offset: 2px;
}

[data-world="tayyar"] .call-meter {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  block-size: 4px;
  margin-block-start: var(--s-2);
}

[data-world="tayyar"] .call-meter span {
  background: color-mix(in oklch, var(--ink) 14%, transparent);
}

[data-world="tayyar"] .call-meter span[data-active="true"] {
  background: var(--ember);
}
```

### ٢. JS — `pages/callcenter.js`
```javascript
import { haptic } from '../chrome/bottom-nav.js';

const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playArpeggio() {
  if (!audioCtx || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const notes = [360, 440, 540];
  const start = audioCtx.currentTime;
  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    g.gain.setValueAtTime(0, start + i * 0.08);
    g.gain.linearRampToValueAtTime(0.06, start + i * 0.08 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, start + i * 0.08 + 0.12);
    osc.connect(g); g.connect(audioCtx.destination);
    osc.start(start + i * 0.08); osc.stop(start + i * 0.08 + 0.13);
  });
}

function playNeutral() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'sine'; osc.frequency.value = 400;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.04, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  osc.connect(g); g.connect(audioCtx.destination);
  osc.start(t); osc.stop(t + 0.09);
}

export function emitOutcome(outcome) {
  switch (outcome) {
    case 'success': haptic('maqsoom'); playArpeggio(); break;
    case 'lost':    /* silence */ break;
    case 'neutral': haptic('dafn'); playNeutral(); break;
  }
}

document.addEventListener('upg:call:outcome', (e) => emitOutcome(e.detail?.outcome));

window.Upg = window.Upg || {};
window.Upg.callcenter = Object.freeze({ emitOutcome });
```

---

## Acceptance Criteria

- [ ] 7 units in section page-callcenter, all with PROVE-IT citations
- [ ] Iraq Block visible
- [ ] arpeggio plays on success outcome
- [ ] silence + red outline on lost outcome
- [ ] icons from Phosphor: `phone-call`, `chat`, `target` (لا emoji)
- [ ] commit: `ε2: Callcenter revived — verified: arpeggio=on, silence_lost=on, units=7, iraq=on`
- [ ] Beacon recorded

— نهاية ε2 —
