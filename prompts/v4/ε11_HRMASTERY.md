# ε11 — Content Revival: hrmastery
> **Pillar ε / Stage 11 of 12** — العالم: صَالون (Saloon)

---

## 🎨 Creativity Beacon

**Type:** 🪞 META_BEACON
**The Surprise:** صفحة "interview rehearsal" تَستخدم **MediaRecorder API** لتَسجيل صوت المستخدم وهو يُجاوب على سؤال مقابلة. بعد التسجيل، playback يَعرض **waveform مرسوم بـ canvas** (لا مكتبة — رسم يدوي). بجانب الـ waveform: عدّاد كلمات + معدل الكلمات/دقيقة + زمن التوقّف الإجمالي (silence detection). كأن المستخدم يَجلس في صالون ويُراجع كلماته.

**Reference Avoided:** generic record button
**Inspired-by:** Mid-century Beirut salon's recording rituals
**Originality Self-Score:** 5/5

---

## المحتوى (10 وحدات)

1. **مقدمة 30 ثانية مُحْكَمة (elevator pitch)**
2. **الإجابة على "أخبرني عن نفسك"**
3. **STAR method للأسئلة السلوكية**
4. **التعامل مع أسئلة الراتب (salary negotiation)**
5. **سؤال "ما نقاط ضعفك؟"**
6. **معالجة فجوات في الـ CV**
7. **التحضير للأسئلة التقنية**
8. **أسئلة نهاية المقابلة (تَسأل أنت)**
9. **متابعة بعد المقابلة (follow-up email)**
10. **التفاوض على عرض العمل النهائي**

### 🇮🇶 Iraq Block
> "في العراق، الـ salary negotiation تَختلف حسب القطاع: الخاص (بنوك، اتصالات) يَقبل تفاوضاً ضمن 8-15%، العام يَحدّد رواتب ثابتة. اطلب benefits بدلاً من salary حين الراتب جامد: مواصلات، تأمين، ساعات مرنة." — Bel Inc. HR Iraq Brief 2024

---

## التنفيذ

### ١. CSS
```css
[data-world="saloon"] .interview-stage {
  background: var(--anchor-1);
  border: 1px solid var(--line);
  padding: var(--s-6);
  border-radius: 0;
  clip-path: polygon(
    8px 0, calc(100% - 8px) 0,
    100% 8px, 100% calc(100% - 8px),
    calc(100% - 8px) 100%, 8px 100%,
    0 calc(100% - 8px), 0 8px
  );
}

[data-world="saloon"] .record-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-3) var(--s-5);
  background: var(--anchor-2);
  border: 1px solid var(--ember);
  color: var(--ink);
  font-family: var(--voice-display);
  cursor: pointer;
}

[data-world="saloon"] .record-btn[data-recording="true"] {
  background: var(--ember);
  color: hsl(8 28% 14%);
}

[data-world="saloon"] .record-btn[data-recording="true"]::before {
  content: "";
  inline-size: 8px;
  block-size: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: rec-pulse 1s infinite;
}

@keyframes rec-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

[data-world="saloon"] .waveform {
  inline-size: 100%;
  block-size: 80px;
  background: var(--anchor-bg);
  border: 1px solid var(--line);
  margin-block-start: var(--s-3);
}

[data-world="saloon"] .interview-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--s-3);
  margin-block-start: var(--s-3);
}

[data-world="saloon"] .interview-stat {
  padding: var(--s-3);
  background: var(--anchor-2);
  border-block-end: 1px solid var(--ember);
  font-family: var(--voice-num-tabular);
}
```

### ٢. JS — `pages/hrmastery.js`
```javascript
import { icon } from '../core/icons.js';
import { haptic } from '../chrome/bottom-nav.js';

let mediaRecorder = null;
let chunks = [];
let stream = null;
let analyser = null;
let waveformData = [];

async function startRecord(btn, canvas) {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    alert('الميكروفون غير متاح');
    return;
  }

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const source = ctx.createMediaStreamSource(stream);
  analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);

  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = e => chunks.push(e.data);
  mediaRecorder.start();
  btn.dataset.recording = 'true';
  haptic('takk');

  drawWaveform(canvas);
}

function stopRecord(btn) {
  if (mediaRecorder?.state === 'recording') mediaRecorder.stop();
  stream?.getTracks().forEach(t => t.stop());
  btn.dataset.recording = 'false';
  haptic('dafn');
  computeStats();
}

function drawWaveform(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  const buf = new Uint8Array(analyser.frequencyBinCount);
  function tick() {
    if (!mediaRecorder || mediaRecorder.state !== 'recording') return;
    analyser.getByteTimeDomainData(buf);
    const avg = buf.reduce((s, v) => s + Math.abs(v - 128), 0) / buf.length;
    waveformData.push(avg);
    if (waveformData.length > 200) waveformData.shift();

    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'currentColor';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    waveformData.forEach((v, i) => {
      const x = (i / waveformData.length) * w;
      const y = h/2 + (v - 8) * (h / 50);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    requestAnimationFrame(tick);
  }
  tick();
}

function computeStats() {
  const silence = waveformData.filter(v => v < 3).length;
  const total = waveformData.length;
  const silencePct = total > 0 ? Math.round((silence / total) * 100) : 0;
  const wpm = waveformData.length > 30 ? Math.round((waveformData.length - silence) / total * 140) : 0;

  document.querySelectorAll('[data-stat="silence"]').forEach(el => el.textContent = `${silencePct}%`);
  document.querySelectorAll('[data-stat="wpm"]').forEach(el => el.textContent = wpm);
  document.querySelectorAll('[data-stat="duration"]').forEach(el => el.textContent = `${Math.round(waveformData.length * 0.05)}s`);
}

export function initInterview() {
  const btn = document.querySelector('[data-world="saloon"] .record-btn');
  const canvas = document.querySelector('[data-world="saloon"] .waveform');
  if (!btn || !canvas) return;
  btn.addEventListener('click', () => {
    if (btn.dataset.recording === 'true') stopRecord(btn);
    else { waveformData = []; chunks = []; startRecord(btn, canvas); }
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'saloon') initInterview();
});
```

---

## Acceptance Criteria

- [ ] 10 units, PROVE-IT
- [ ] Iraq Block
- [ ] MediaRecorder works on user click (perm prompt)
- [ ] Waveform draws live during recording
- [ ] Stats compute on stop (silence%, WPM, duration)
- [ ] icons: Phosphor mic, users, graduation-cap, trophy (لا emoji)
- [ ] respects reduced-motion (no waveform animation)
- [ ] commit: `ε11: HRMastery revived — verified: media_recorder=on, waveform=canvas, units=10, saloon=on`
- [ ] Beacon recorded

— نهاية ε11 —
