/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-16.js
   Extracted from app.js lines 5216-5691
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlVoiceStudio(){
  'use strict';
  if (window.__qlVoiceStudio) return;
  window.__qlVoiceStudio = true;

  var STORAGE_KEY = 'upg_voice_recordings_meta';
  var REC_DURATION_MS = 30000;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  function setStatus(node, state, message){
    if (!node) return;
    node.setAttribute('data-state', state);
    var msg = node.querySelector('[data-vs-msg]');
    if (msg) msg.textContent = message;
  }

  function loadHistory(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch(_){ return []; }
  }
  function saveHistory(arr){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(-5))); } catch(_){}
  }

  function gradeOf(metric, value){
    // Returns one of: excellent, good, fair, poor
    if (metric === 'wpm'){
      if (value >= 140 && value <= 160) return 'excellent';
      if (value >= 120 && value <= 175) return 'good';
      if (value >= 100 && value <= 195) return 'fair';
      return 'poor';
    }
    if (metric === 'pitch'){
      if (value >= 18) return 'excellent';
      if (value >= 13) return 'good';
      if (value >= 8) return 'fair';
      return 'poor';
    }
    if (metric === 'volume'){
      if (value >= 75) return 'excellent';
      if (value >= 60) return 'good';
      if (value >= 45) return 'fair';
      return 'poor';
    }
    if (metric === 'pause'){
      if (value >= 12 && value <= 22) return 'excellent';
      if (value >= 8 && value <= 28) return 'good';
      if (value >= 4 && value <= 38) return 'fair';
      return 'poor';
    }
    if (metric === 'energy'){
      if (value >= 60 && value <= 80) return 'excellent';
      if (value >= 45 && value <= 90) return 'good';
      if (value >= 30 && value <= 95) return 'fair';
      return 'poor';
    }
    return 'fair';
  }

  function tierLabel(grade){
    return ({
      excellent: '🏆 ممتاز',
      good:      '✅ جيد',
      fair:      '⚠️ متوسط',
      poor:      '🚨 يحتاج تطوير'
    })[grade] || '—';
  }

  function recommendations(metrics){
    var out = [];
    var grades = {
      wpm:    gradeOf('wpm',    metrics.wpm),
      pitch:  gradeOf('pitch',  metrics.pitch),
      volume: gradeOf('volume', metrics.volume),
      pause:  gradeOf('pause',  metrics.pause),
      energy: gradeOf('energy', metrics.energy)
    };
    if (grades.wpm === 'poor' || grades.wpm === 'fair'){
      if (metrics.wpm > 175) out.push('إيقاعك سريع (' + metrics.wpm + ' WPM) — تمرين: اقرأ نصاً 150 كلمة في 60 ثانية بالضبط، 3 مرات يومياً.');
      else if (metrics.wpm < 120) out.push('إيقاعك بطيء (' + metrics.wpm + ' WPM) — قد يُفسَّر كتردد. ارفع السرعة المستهدفة إلى 140-160 تدريجياً.');
      else out.push('الإيقاع (' + metrics.wpm + ' WPM) قريب من المثالي — صيد دقيق.');
    }
    if (grades.pitch === 'poor' || grades.pitch === 'fair'){
      out.push('تباين النبرة منخفض (' + metrics.pitch + '%). تمرين: اقرأ جملة بـ 5 سياقات (مفاجأة/حزن/فرح/غضب/فضول) لكسر الـ Monotone Trap.');
    }
    if (grades.volume === 'poor'){
      out.push('ثبات الصوت ضعيف (' + metrics.volume + '%) — راقب End-of-Sentence Drop. تمرين: أكّد آخر كلمتين كل جملة بنفس الطاقة.');
    }
    if (grades.pause === 'poor' && metrics.pause < 4){
      out.push('نسبة الصمت متدنية (' + metrics.pause + '%) — تتحدث بدون استراحات تنفسية. أدخل وقفة 0.5 ثانية بعد كل نقطة (Voss Tactical Silence).');
    }
    if (grades.pause === 'poor' && metrics.pause > 38){
      out.push('نسبة الصمت مرتفعة (' + metrics.pause + '%) — قد تكون "filler pauses". قلل الـ "أه/يعني" وحاول تنفيذ نص 30 ثانية متواصل.');
    }
    if (grades.energy === 'poor'){
      out.push('مؤشر الطاقة (' + metrics.energy + ') خارج النطاق الصحي 60-80 — جرّب 3 أنفاس عميقة + ابتسامة فيزيائية قبل التسجيل.');
    }
    if (out.length === 0){
      out.push('أداؤك في النطاق المثالي عبر الأبعاد الخمسة. حافظ على الروتين وكرّر التقييم أسبوعياً.');
    }
    return out.slice(0, 4);
  }

  // ===== Spectrogram drawer =====
  function drawSpectro(canvas, dataArray, isActive){
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, w, h);
    if (!isActive) return;
    var bars = 64;
    var step = Math.floor(dataArray.length / bars);
    var barW = w / bars;
    for (var i = 0; i < bars; i++){
      var v = dataArray[i * step] || 0;
      var hh = (v / 255) * h;
      var hue = 180 - (v / 255) * 30;
      ctx.fillStyle = 'hsla(' + hue + ', 95%, 65%, 0.92)';
      ctx.fillRect(i * barW + 1, h - hh, barW - 2, hh);
    }
  }

  ready(function(){
    var page = document.getElementById('page-callcenter');
    if (!page) return;
    var studio = page.querySelector('[data-cc-vstudio]');
    if (!studio) return;

    var statusBox = studio.querySelector('[data-vs-status]');
    var recBtn    = studio.querySelector('[data-vs-rec]');
    var stopBtn   = studio.querySelector('[data-vs-stop]');
    var progBar   = studio.querySelector('[data-vs-progbar]');
    var timeEl    = studio.querySelector('[data-vs-time]');
    var canvas    = studio.querySelector('[data-vs-canvas]');
    var transcript= studio.querySelector('[data-vs-transcript]');
    var report    = studio.querySelector('[data-vs-report]');
    var clearBtn  = studio.querySelector('[data-vs-clear]');
    var histList  = studio.querySelector('[data-vs-history]');

    if (!recBtn || !canvas) return;

    // Resize canvas to device pixel ratio
    function fitCanvas(){
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.getBoundingClientRect();
      canvas.width  = Math.max(400, Math.floor(rect.width * dpr));
      canvas.height = Math.floor(120 * dpr);
    }
    fitCanvas();
    window.addEventListener('resize', fitCanvas, { passive: true });

    // Render history
    function renderHistory(){
      var hist = loadHistory();
      if (!histList) return;
      histList.innerHTML = '';
      if (!hist.length){
        var empty = document.createElement('li');
        empty.className = 'vs-hist-empty';
        empty.textContent = 'لا توجد محاولات سابقة بعد.';
        histList.appendChild(empty);
        return;
      }
      hist.slice().reverse().forEach(function(entry){
        var li = document.createElement('li');
        var d  = new Date(entry.t || Date.now());
        var hh = String(d.getHours()).padStart(2,'0');
        var mm = String(d.getMinutes()).padStart(2,'0');
        var dd = String(d.getDate()).padStart(2,'0');
        var mo = String(d.getMonth()+1).padStart(2,'0');
        li.innerHTML =
          '<time>' + dd + '/' + mo + ' ' + hh + ':' + mm + '</time>' +
          '<span><small>WPM</small><b>' + entry.wpm + '</b></span>' +
          '<span><small>Pitch</small><b>' + entry.pitch + '%</b></span>' +
          '<span><small>Vol</small><b>' + entry.volume + '%</b></span>' +
          '<span><small>Pause</small><b>' + entry.pause + '%</b></span>' +
          '<span><small>Energy</small><b>' + entry.energy + '</b></span>';
        histList.appendChild(li);
      });
    }
    renderHistory();

    if (clearBtn){
      clearBtn.addEventListener('click', function(){
        try { localStorage.removeItem(STORAGE_KEY); } catch(_){}
        renderHistory();
      });
    }

    // ===== Recording state =====
    var state = {
      stream: null,
      audioCtx: null,
      analyser: null,
      pitchAnalyser: null,
      source: null,
      rafId: 0,
      startTs: 0,
      timerId: 0,
      pitchSamples: [],
      volSamples: [],
      energySamples: [],
      silenceFrames: 0,
      totalFrames: 0,
      transcriptText: '',
      recognition: null,
      active: false
    };

    function cleanup(){
      if (state.rafId) cancelAnimationFrame(state.rafId);
      if (state.timerId) clearInterval(state.timerId);
      if (state.recognition){
        try { state.recognition.stop(); } catch(_){}
        state.recognition = null;
      }
      if (state.stream){
        state.stream.getTracks().forEach(function(t){ try { t.stop(); } catch(_){} });
        state.stream = null;
      }
      if (state.audioCtx){
        try { state.audioCtx.close(); } catch(_){}
        state.audioCtx = null;
      }
      state.analyser = null;
      state.pitchAnalyser = null;
      state.source = null;
      state.active = false;
      recBtn.removeAttribute('data-active');
      if (stopBtn) stopBtn.disabled = true;
    }

    // Autocorrelation pitch detect (fundamental F0 via time-domain)
    function detectPitchHz(buf, sampleRate){
      var SIZE = buf.length;
      var rms = 0;
      for (var i = 0; i < SIZE; i++){ var v = buf[i]; rms += v*v; }
      rms = Math.sqrt(rms/SIZE);
      if (rms < 0.01) return -1;
      var r1 = 0, r2 = SIZE - 1, thres = 0.2;
      for (var j = 0; j < SIZE/2; j++){ if (Math.abs(buf[j]) < thres){ r1 = j; break; } }
      for (var k = 1; k < SIZE/2; k++){ if (Math.abs(buf[SIZE-k]) < thres){ r2 = SIZE-k; break; } }
      var b = buf.slice(r1, r2);
      var newSize = b.length;
      var c = new Array(newSize).fill(0);
      for (var l = 0; l < newSize; l++){
        for (var m = 0; m < newSize - l; m++){
          c[l] = c[l] + b[m] * b[m+l];
        }
      }
      var d = 0; while (c[d] > c[d+1]) d++;
      var maxval = -1, maxpos = -1;
      for (var n = d; n < newSize; n++){
        if (c[n] > maxval){ maxval = c[n]; maxpos = n; }
      }
      if (maxpos < 1) return -1;
      var T0 = maxpos;
      return sampleRate / T0;
    }

    function startRecording(){
      if (state.active) return;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        setStatus(statusBox, 'error', 'متصفحك لا يدعم الميكروفون.');
        return;
      }
      setStatus(statusBox, 'processing', 'طلب إذن الميكروفون...');
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream){
          state.stream = stream;
          var AC = window.AudioContext || window.webkitAudioContext;
          state.audioCtx = new AC();
          state.source = state.audioCtx.createMediaStreamSource(stream);
          state.analyser = state.audioCtx.createAnalyser();
          state.analyser.fftSize = 1024;
          state.pitchAnalyser = state.audioCtx.createAnalyser();
          state.pitchAnalyser.fftSize = 2048;
          state.source.connect(state.analyser);
          state.source.connect(state.pitchAnalyser);

          var bufLen = state.analyser.frequencyBinCount;
          var freqData = new Uint8Array(bufLen);
          var timeData = new Float32Array(state.pitchAnalyser.fftSize);

          state.pitchSamples = [];
          state.volSamples   = [];
          state.energySamples= [];
          state.silenceFrames= 0;
          state.totalFrames  = 0;
          state.transcriptText = '';
          if (transcript) transcript.textContent = '—';
          if (report) report.hidden = true;

          // Web Speech (best-effort)
          var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (SR){
            try {
              state.recognition = new SR();
              state.recognition.lang = 'ar-SA';
              state.recognition.continuous = true;
              state.recognition.interimResults = true;
              state.recognition.onresult = function(ev){
                var finalT = '', interim = '';
                for (var i = ev.resultIndex; i < ev.results.length; i++){
                  var r = ev.results[i];
                  if (r.isFinal) finalT += r[0].transcript + ' ';
                  else interim   += r[0].transcript + ' ';
                }
                state.transcriptText = (state.transcriptText + finalT).trim();
                if (transcript) transcript.textContent = (state.transcriptText + ' ' + interim).trim() || '—';
              };
              state.recognition.onerror = function(){ /* graceful */ };
              state.recognition.start();
            } catch(_){
              if (transcript) transcript.textContent = '(تعرّف الكلام غير متاح في هذا المتصفح — التحليل الصوتي يكفي)';
            }
          } else {
            if (transcript) transcript.textContent = '(تعرّف الكلام غير متاح في هذا المتصفح — التحليل الصوتي يكفي)';
          }

          state.active = true;
          state.startTs = performance.now();
          recBtn.setAttribute('data-active', '1');
          if (stopBtn) stopBtn.disabled = false;
          setStatus(statusBox, 'recording', 'تسجيل... تكلم بطبيعتك لـ 30 ثانية.');

          function tick(){
            if (!state.active) return;
            state.analyser.getByteFrequencyData(freqData);
            state.pitchAnalyser.getFloatTimeDomainData(timeData);

            // Volume RMS (0-100)
            var sum = 0;
            for (var i = 0; i < freqData.length; i++) sum += freqData[i];
            var avg = sum / freqData.length;
            state.volSamples.push(avg);
            state.energySamples.push(avg);

            // Silence detection
            state.totalFrames++;
            if (avg < 8) state.silenceFrames++;

            // Pitch (sample every ~6 frames to save CPU)
            if (state.totalFrames % 6 === 0){
              var hz = detectPitchHz(timeData, state.audioCtx.sampleRate);
              if (hz > 60 && hz < 500) state.pitchSamples.push(hz);
            }

            drawSpectro(canvas, freqData, true);
            state.rafId = requestAnimationFrame(tick);
          }
          tick();

          // Progress timer
          state.timerId = setInterval(function(){
            var elapsed = performance.now() - state.startTs;
            var pct = Math.min(100, (elapsed / REC_DURATION_MS) * 100);
            if (progBar) { progBar.style.inlineSize = pct + '%'; progBar.style.width = pct + '%'; }
            if (timeEl) timeEl.textContent = (elapsed/1000).toFixed(1) + 's / 30.0s';
            if (elapsed >= REC_DURATION_MS) stopRecording();
          }, 80);
        })
        .catch(function(err){
          setStatus(statusBox, 'error', 'تعذّر الوصول للميكروفون: ' + (err.message || 'إذن مرفوض'));
          cleanup();
        });
    }

    function computeReport(){
      // WPM from transcript word count
      var words = (state.transcriptText || '').trim().split(/\s+/).filter(Boolean).length;
      var elapsedSec = Math.max(1, (performance.now() - state.startTs)/1000);
      var wpm = Math.round((words / elapsedSec) * 60);
      // If transcript empty/too short, estimate from voiced frames
      if (words < 5){
        var voicedRatio = state.totalFrames > 0 ? (1 - state.silenceFrames / state.totalFrames) : 0;
        wpm = Math.round(voicedRatio * 165); // proxy estimate
      }

      // Pitch variability (CV of F0 samples)
      var pitchPct = 0;
      if (state.pitchSamples.length > 4){
        var s = state.pitchSamples;
        var m = s.reduce(function(a,b){return a+b;},0)/s.length;
        var v = s.reduce(function(a,b){return a + (b-m)*(b-m);},0)/s.length;
        var sd = Math.sqrt(v);
        pitchPct = Math.round((sd / m) * 100);
      }

      // Volume stability (1 - CV of avg volume)
      var volPct = 0;
      if (state.volSamples.length > 10){
        var v2 = state.volSamples;
        var m2 = v2.reduce(function(a,b){return a+b;},0)/v2.length;
        var var2 = v2.reduce(function(a,b){return a + (b-m2)*(b-m2);},0)/v2.length;
        var sd2 = Math.sqrt(var2);
        var cv  = m2 > 0 ? sd2 / m2 : 1;
        volPct = Math.round(Math.max(0, Math.min(100, (1 - cv) * 100)));
      }

      // Pause ratio
      var pausePct = state.totalFrames > 0
        ? Math.round((state.silenceFrames / state.totalFrames) * 100)
        : 0;

      // Energy index (mean volume normalized 0-100)
      var energy = 0;
      if (state.energySamples.length){
        var em = state.energySamples.reduce(function(a,b){return a+b;},0) / state.energySamples.length;
        energy = Math.round(Math.min(100, em * 1.2));
      }

      return { wpm: wpm, pitch: pitchPct, volume: volPct, pause: pausePct, energy: energy };
    }

    function paintReport(m){
      if (!report) return;
      report.hidden = false;
      ['wpm','pitch','volume','pause','energy'].forEach(function(k){
        var valEl = report.querySelector('[data-vs-m="' + k + '"]');
        var tEl   = report.querySelector('[data-vs-tier="' + k + '"]');
        if (!valEl) return;
        if (k === 'wpm')         valEl.textContent = m.wpm;
        else if (k === 'energy') valEl.textContent = m.energy;
        else                     valEl.textContent = m[k] + '%';
        var grade = gradeOf(k, m[k]);
        if (tEl){
          tEl.setAttribute('data-grade', grade);
          tEl.textContent = tierLabel(grade);
        }
      });
      var ul = report.querySelector('[data-vs-recos]');
      if (ul){
        ul.innerHTML = '';
        recommendations(m).forEach(function(r){
          var li = document.createElement('li');
          li.textContent = r;
          ul.appendChild(li);
        });
      }
    }

    function stopRecording(){
      if (!state.active) return;
      var m = computeReport();
      cleanup();
      drawSpectro(canvas, new Uint8Array(0), false);
      if (progBar) { progBar.style.inlineSize = '100%'; progBar.style.width = '100%'; }
      if (timeEl) timeEl.textContent = '30.0s / 30.0s';
      setStatus(statusBox, 'ready', 'انتهى التسجيل — تقريرك جاهز.');
      paintReport(m);
      // Persist meta
      var hist = loadHistory();
      hist.push({ t: Date.now(), wpm: m.wpm, pitch: m.pitch, volume: m.volume, pause: m.pause, energy: m.energy });
      saveHistory(hist);
      renderHistory();
    }

    recBtn.addEventListener('click', function(){
      if (state.active) stopRecording();
      else startRecording();
    });
    if (stopBtn) stopBtn.addEventListener('click', stopRecording);
  });
})();
