/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ε11 — HRMastery (Saloon world)
   Pillar: ε / Stage 11 of 12 — page-hrmastery / data-world="saloon"
   Beacon: 🪞 META_BEACON — the salon mirror that listens.

   Records an interview answer (MediaRecorder), draws live waveform on a
   <canvas> in saloon-brass (no library), then on stop computes WPM /
   silence% / duration *instantly* (no count-from-zero — Forbidden #11)
   AND speaks back a five-tone *prose verdict* in voice-accent (Lateef
   italic):
     masterful   (130–160 WPM, silence 12–28%) → نَبر المُحاوَر القَدير
     confident   (100–170 WPM, silence < 35%)  → وَقْعُك ثابت
     rushed      (WPM > 180)                   → أَسرَعتَ — تَنَفَّس
     silent      (silence ≥ 50%)               → صَمتُك أكثر من كلامك
     hesitant    (else)                        → المَقابِلة تَسمَع تَردُّداً

   Avoided: AI-default "✓ Recording saved!" toast / Forbidden #11 / #20 /
            window.alert() permission denial.
   Inspired-by: Wild Card #11 — Mid-century Beirut salon recording rituals.
   Sacred: reads window.Upg.haptic.play (δ4) + window.Upg.icons.renderAll
           read-only; never redefines either. 76 hr-* blocks untouched.
   Surface: window.Upg.elan.hrmastery = { start, stop, reset, verdict }
   ════════════════════════════════════════════════════════════════════════ */

(function initEpsilon11Hrmastery() {
  'use strict';

  /* Capability detection. */
  const HAS_RECORDER = typeof window.MediaRecorder !== 'undefined'
    && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const HAS_AUDIO_CTX = !!(window.AudioContext || window.webkitAudioContext);

  /* State — one stage per page; module-local. */
  let mediaRecorder = null, stream = null, audioCtx = null, analyser = null;
  let waveformBuffer = [];          // 0..128 sample stream
  let recordStartedAt = 0, lastDurationMs = 0, rafId = 0;

  /* Haptic — read-only access to δ4 surface. */
  function fireHaptic(name) {
    const h = window.Upg && window.Upg.haptic;
    if (!h || typeof h.play !== 'function') return;
    try { h.play(name); } catch (_) {}
  }

  /* Verdict — five tones, ordered by precedence. */
  function computeVerdict(wpm, silencePct) {
    if (wpm > 180) {
      return { tone: 'rushed',    text: 'أَسرَعتَ — تَنَفَّس بين الجُمَل' };
    }
    if (silencePct >= 50) {
      return { tone: 'silent',    text: 'صَمتُك أكثر من كلامك — راجع البَدْء' };
    }
    if (wpm >= 130 && wpm <= 160 && silencePct >= 12 && silencePct <= 28) {
      return { tone: 'masterful', text: 'نَبر المُحاوَر القَدير' };
    }
    if (wpm >= 100 && wpm <= 170 && silencePct < 35) {
      return { tone: 'confident', text: 'وَقْعُك ثابت — تَبدو واثقاً' };
    }
    return { tone: 'hesitant', text: 'المَقابِلة تَسمَع تَردُّداً — جَرِّب مَرَّة أُخرى' };
  }

  /* Stats from waveform buffer.
     Sample = mean abs-deviation from 128 baseline (0..128).
     A threshold < 3 ≈ near-silence. WPM heuristic = speech-fraction × 145
     wpm baseline (Goldman-Eisler 1968). */
  function deriveStats() {
    const total = waveformBuffer.length || 1;
    const silentSamples = waveformBuffer.filter((v) => v < 3).length;
    const silencePct = Math.round((silentSamples / total) * 100);
    const durSec = lastDurationMs > 0
      ? Math.max(1, Math.round(lastDurationMs / 1000))
      : Math.max(1, Math.round(total * 0.06));
    const speechFraction = Math.max(0, (total - silentSamples) / total);
    const wpm = Math.round(speechFraction * 145);
    return { wpm, silencePct, durSec };
  }

  /* Canvas painter — single horizontal stroke in saloon-brass (currentColor). */
  function paint(canvas) {
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    /* HiDPI: re-sync canvas pixel dims when css size changes. */
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = cssW; const h = cssH;
    ctx2d.clearRect(0, 0, w, h);
    if (waveformBuffer.length === 0) return;

    /* Stroke = currentColor (CSS binds the canvas element to --saloon-brass-1). */
    ctx2d.strokeStyle = getComputedStyle(canvas).color;
    ctx2d.lineWidth = 1.5;
    ctx2d.lineCap = 'round';
    ctx2d.lineJoin = 'round';
    ctx2d.beginPath();
    waveformBuffer.forEach((v, i) => {
      const x = (i / Math.max(1, waveformBuffer.length - 1)) * w;
      const dir = (i % 2 === 0) ? -1 : 1;     /* alternating excursion */
      const y = (h / 2) + dir * (v * (h * 0.42 / 64));
      if (i === 0) ctx2d.moveTo(x, y); else ctx2d.lineTo(x, y);
    });
    ctx2d.stroke();
  }

  /* Lifecycle helpers. */
  function showNotice(stage, text) {
    const n = stage.querySelector('[data-elan-interview-notice]');
    if (!n) return;
    n.textContent = text; n.hidden = false;
  }
  function clearNotice(stage) {
    const n = stage.querySelector('[data-elan-interview-notice]');
    if (!n) return;
    n.textContent = ''; n.hidden = true;
  }

  async function start(stage) {
    if (!HAS_RECORDER) {
      showNotice(stage, 'تَسجيل الصوت غير مَدعوم في هذا المُتصفِّح. جرّب Chrome/Firefox/Safari الحديث.');
      return;
    }
    clearNotice(stage);
    waveformBuffer = [];
    recordStartedAt = performance.now();
    lastDurationMs = 0;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const msg = (err && err.name === 'NotAllowedError')
        ? 'الميكروفون لم يُمنَح صَلاحية. اسمح من شريط العنوان وأعِد المُحاوَلة.'
        : 'تَعذَّر الوصول للميكروفون: ' + ((err && err.message) || 'سبب غير مَعلوم');
      showNotice(stage, msg);
      return;
    }

    /* AudioContext — built once inside the user gesture. */
    if (HAS_AUDIO_CTX && !audioCtx) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      try { audioCtx = new Ctor(); } catch (_) { audioCtx = null; }
    }
    if (audioCtx) {
      if (audioCtx.state === 'suspended') {
        try { await audioCtx.resume(); } catch (_) {}
      }
      try {
        const src = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        src.connect(analyser);
      } catch (_) { analyser = null; }
    }

    try { mediaRecorder = new MediaRecorder(stream); }
    catch (_) {
      showNotice(stage, 'تَعذَّر بدء التَسجيل في هذا الجهاز.');
      cleanupStream();
      return;
    }
    /* Chunks discarded — playback is not the point; the verdict is. */
    mediaRecorder.ondataavailable = () => {};
    mediaRecorder.start();

    const btn = stage.querySelector('[data-elan-record-btn]');
    const canvas = stage.querySelector('[data-elan-interview-canvas]');
    if (btn) {
      btn.dataset.recording = 'true';
      btn.setAttribute('aria-pressed', 'true');
      const lbl = btn.querySelector('[data-elan-record-label]');
      if (lbl) lbl.textContent = 'إيقاف التسجيل';
    }
    if (canvas) canvas.dataset.recording = 'true';
    fireHaptic('takk');

    /* Sampling loop. */
    if (analyser) {
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!mediaRecorder || mediaRecorder.state !== 'recording') return;
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) sum += Math.abs(buf[i] - 128);
        waveformBuffer.push(sum / buf.length);
        if (waveformBuffer.length > 240) waveformBuffer.shift();
        paint(canvas);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }
  }

  function cleanupStream() {
    if (stream) {
      try { stream.getTracks().forEach((t) => t.stop()); } catch (_) {}
      stream = null;
    }
    analyser = null;
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }

  function stop(stage) {
    if (!mediaRecorder || mediaRecorder.state !== 'recording') return;
    lastDurationMs = performance.now() - recordStartedAt;
    try { mediaRecorder.stop(); } catch (_) {}
    cleanupStream();

    const btn = stage.querySelector('[data-elan-record-btn]');
    const canvas = stage.querySelector('[data-elan-interview-canvas]');
    if (btn) {
      btn.dataset.recording = 'false';
      btn.setAttribute('aria-pressed', 'false');
      const lbl = btn.querySelector('[data-elan-record-label]');
      if (lbl) lbl.textContent = 'سَجِّل الإجابة';
    }
    if (canvas) canvas.dataset.recording = 'false';

    fireHaptic('dafn');

    /* Compute & paint stats — *instantly*, no count-from-zero. */
    const { wpm, silencePct, durSec } = deriveStats();
    const setStat = (key, value) => {
      const el = stage.querySelector('[data-elan-stat="' + key + '"]');
      if (!el) return;
      el.textContent = value;
      el.removeAttribute('data-empty');
    };
    setStat('wpm', String(wpm));
    setStat('silence', silencePct + '%');
    setStat('duration', durSec + 's');

    /* The META verdict — prose, not toast. */
    const verdictEl = stage.querySelector('[data-elan-interview-verdict]');
    if (verdictEl) {
      const v = computeVerdict(wpm, silencePct);
      verdictEl.dataset.tone = v.tone;
      verdictEl.removeAttribute('data-empty');
      verdictEl.textContent = v.text;
    }
  }

  function reset(stage) {
    waveformBuffer = [];
    lastDurationMs = 0;
    const canvas = stage.querySelector('[data-elan-interview-canvas]');
    if (canvas) {
      const c2 = canvas.getContext('2d');
      if (c2) c2.clearRect(0, 0, canvas.width, canvas.height);
      canvas.dataset.recording = 'false';
    }
    ['wpm', 'silence', 'duration'].forEach((k) => {
      const el = stage.querySelector('[data-elan-stat="' + k + '"]');
      if (el) { el.textContent = ''; el.setAttribute('data-empty', 'true'); }
    });
    const verdictEl = stage.querySelector('[data-elan-interview-verdict]');
    if (verdictEl) {
      verdictEl.removeAttribute('data-tone');
      verdictEl.setAttribute('data-empty', 'true');
      verdictEl.textContent = '';
    }
    clearNotice(stage);
  }

  /* ── Mount the interview-stage widget ────────────────────────────────── */
  function mountStage() {
    const page = document.getElementById('page-hrmastery');
    if (!page) return;
    if (page.querySelector('[data-elan-interview-stage]')) return;

    const banner = page.querySelector('.hrm-banner') || page.querySelector('.page-h');
    if (!banner) return;

    const stage = document.createElement('section');
    stage.className = 'interview-stage';
    stage.setAttribute('data-elan-interview-stage', 'hrmastery');
    stage.setAttribute('aria-label', 'منصّة المقابلة — Beacon المرآة');
    stage.innerHTML =
      '<header class="interview-stage-h">'
      +   '<span class="lbl-ar">منصّة المقابلة</span>'
      +   '<span class="lbl-meta">META_BEACON · ε11 · الصالون يستمع</span>'
      + '</header>'
      + '<blockquote class="interview-prompt" lang="ar">'
      +   '«حَدِّثني عن نَفسِك — ثلاثون ثانية، بدون قَصاصة CV.»'
      + '</blockquote>'
      + '<button type="button" class="record-btn" data-elan-record-btn data-recording="false" aria-pressed="false" aria-label="ابدأ تسجيل الإجابة">'
      +   '<span class="record-btn-dot" aria-hidden="true"></span>'
      +   '<i class="qi qi-sm" data-icon="mic" aria-hidden="true"></i>'
      +   '<span data-elan-record-label>سَجِّل الإجابة</span>'
      + '</button>'
      + '<canvas class="interview-canvas" data-elan-interview-canvas data-recording="false" aria-hidden="true"></canvas>'
      + '<dl class="interview-stats" aria-live="polite">'
      +   '<div class="interview-stat">'
      +     '<dt class="interview-stat-label">كلمة/دقيقة</dt>'
      +     '<dd class="interview-stat-value" data-elan-stat="wpm" data-empty="true"></dd>'
      +   '</div>'
      +   '<div class="interview-stat">'
      +     '<dt class="interview-stat-label">نسبة الصمت</dt>'
      +     '<dd class="interview-stat-value" data-elan-stat="silence" data-empty="true"></dd>'
      +   '</div>'
      +   '<div class="interview-stat">'
      +     '<dt class="interview-stat-label">المدّة</dt>'
      +     '<dd class="interview-stat-value" data-elan-stat="duration" data-empty="true"></dd>'
      +   '</div>'
      + '</dl>'
      + '<p class="interview-verdict" data-elan-interview-verdict data-empty="true" aria-live="polite"></p>'
      + '<aside class="interview-iraq" lang="ar">'
      +   '<strong>السوق العراقي:</strong> الـ salary negotiation يَختلف حسب القطاع. '
      +   'الخاص (بنوك، اتصالات) يَقبل تَفاوضاً ضمن ٨ - ١٥٪. العام يَحدّد رواتب ثابتة — '
      +   'اطلب مَنافع بدلاً من راتب حين الراتب جامد: مُواصلات، تأمين، ساعات مَرنة.'
      +   '<cite>Bel Inc. HR Iraq Brief 2024</cite>'
      + '</aside>'
      + '<p class="interview-notice" data-elan-interview-notice hidden role="status"></p>';

    banner.insertAdjacentElement('afterend', stage);

    /* Wire up the record button. */
    const btn = stage.querySelector('[data-elan-record-btn]');
    if (btn) {
      if (!HAS_RECORDER) {
        btn.disabled = true;
        btn.title = 'تسجيل الصوت غير مَدعوم في هذا المُتصفِّح';
        showNotice(stage, 'تَسجيل الصوت غير مَدعوم في هذا المُتصفِّح.');
      }
      btn.addEventListener('click', () => {
        if (btn.dataset.recording === 'true') stop(stage);
        else start(stage);
      });
    }

    /* Re-mount qi sprite icons inside the new widget. */
    const icons = window.Upg && window.Upg.icons;
    if (icons && typeof icons.renderAll === 'function') {
      try { icons.renderAll(stage); } catch (_) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountStage, { once: true });
  } else {
    mountStage();
  }

  /* ── Public surface ──────────────────────────────────────────────────── */
  window.Upg = window.Upg || {};
  window.Upg.elan = window.Upg.elan || {};
  if (!window.Upg.elan.hrmastery) {
    window.Upg.elan.hrmastery = Object.freeze({
      start: () => { const s = document.querySelector('[data-elan-interview-stage]'); if (s) start(s); },
      stop:  () => { const s = document.querySelector('[data-elan-interview-stage]'); if (s) stop(s); },
      reset: () => { const s = document.querySelector('[data-elan-interview-stage]'); if (s) reset(s); },
      verdict: (wpm, silencePct) => computeVerdict(wpm, silencePct),
      _module: 'epsilon11-hrmastery',
    });
  }
})();
