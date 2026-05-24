/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-34.js
   Extracted from app.js lines 10603-10746
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var STORAGE_KEY = 'upg_mood_log';
  var MAX_LOG = 50;

  var WORDS = {
    'red':    ['غاضب','مُحبَط','قلِق','مُتوتّر','ثائر','مُمتعض','مهان','منزعج','محتقن'],
    'yellow': ['متحمس','مُلهَم','مبتهج','مُنجِز','واثق','فخور','نشِط','طموح','متفائل'],
    'blue':   ['حزين','مُنهَك','كئيب','مُمل','يائس','وحيد','خامل','فارغ','مُكتئب'],
    'green':  ['هادئ','راضٍ','مرتاح','آمِن','مُطمئن','صافي الذهن','مستقر','مُتقَبِّل','شاكر']
  };

  var SUGGEST = {
    'red':    'تنفّس Box (4·4·4·4) ٤ دورات. لا تتخذ قراراً قبل ١٠ دقائق. اكتب ما يستفزّك.',
    'yellow': 'استثمر هذه الطاقة في أصعب مهمة اليوم. شارك زميلاً حماسك (مرآة).',
    'blue':   'تحرّك جسدياً ٥ دقائق. اشرب ماءً. اكتب ٣ أشياء ممتنّ لها (Gratitude).',
    'green':  'وقت ممتاز للتفكير الاستراتيجي والتخطيط. لا تُهدره في reactivity.'
  };

  function getZone(x, y){
    // x: -1..+1 (pleasantness), y: -1..+1 (energy)
    if (y >= 0 && x < 0) return 'red';
    if (y >= 0 && x >= 0) return 'yellow';
    if (y < 0 && x < 0) return 'blue';
    return 'green';
  }

  function loadLog(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e){ return []; }
  }
  function saveLog(arr){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(0, MAX_LOG))); } catch(e){}
  }

  function init(){
    var canvas = document.getElementById('w09eMoodCanvas');
    if (!canvas) return;
    if (canvas.dataset.w09Inited === '1') return;
    canvas.dataset.w09Inited = '1';

    var marker  = document.getElementById('w09eMoodMarker');
    var coordEl = document.getElementById('w09eMoodCoord');
    var zoneEl  = document.getElementById('w09eMoodZone');
    var wordSel = document.getElementById('w09eMoodWord');
    var causeEl = document.getElementById('w09eMoodCause');
    var sugEl   = document.getElementById('w09eMoodSuggest').querySelector('span');
    var saveBtn = document.getElementById('w09eMoodSave');
    var clrBtn  = document.getElementById('w09eMoodClear');
    var histUl  = document.getElementById('w09eMoodHistory');

    var current = { x: null, y: null, zone: null };

    function paintWords(zone){
      wordSel.innerHTML = '<option value="">— اختر —</option>';
      (WORDS[zone] || []).forEach(function(w){
        var o = document.createElement('option');
        o.value = w; o.textContent = w;
        wordSel.appendChild(o);
      });
    }

    function place(clientX, clientY){
      var rect = canvas.getBoundingClientRect();
      var px = clientX - rect.left;
      var py = clientY - rect.top;
      px = Math.max(0, Math.min(rect.width,  px));
      py = Math.max(0, Math.min(rect.height, py));
      var nx = (px / rect.width) * 2 - 1;          // -1..+1 (left=-1)
      var ny = 1 - (py / rect.height) * 2;          // -1..+1 (top=+1)
      // RTL: flip x so right side = ممتع (+x)
      nx = -nx;
      current.x = +nx.toFixed(2);
      current.y = +ny.toFixed(2);
      current.zone = getZone(current.x, current.y);

      marker.hidden = false;
      // Position marker in canvas coordinates (visual)
      marker.style.right = (px / rect.width * 100) + '%';
      marker.style.top   = (py / rect.height * 100) + '%';

      coordEl.textContent = 'x=' + current.x + ' · y=' + current.y;
      var zoneName = ({red:'حمراء',yellow:'صفراء',blue:'زرقاء',green:'خضراء'})[current.zone];
      zoneEl.textContent = zoneName;
      paintWords(current.zone);
      sugEl.textContent = SUGGEST[current.zone];
    }

    canvas.addEventListener('click', function(e){ place(e.clientX, e.clientY); });
    canvas.addEventListener('keydown', function(e){
      // basic keyboard nudge if focused
      if (current.x === null) { place(canvas.getBoundingClientRect().left + 50, canvas.getBoundingClientRect().top + 50); return; }
    });

    function renderHistory(){
      var arr = loadLog();
      if (!arr.length){
        histUl.innerHTML = '<li class="empty">لا تسجيلات بعد</li>';
        return;
      }
      histUl.innerHTML = arr.slice(0, 5).map(function(e){
        var d = new Date(e.t);
        var time = d.toLocaleString('ar', { hour: '2-digit', minute: '2-digit', day:'2-digit', month:'2-digit' });
        return '<li><b>' + (e.word || '—') + '</b> · ' + time + (e.cause ? ' — ' + e.cause.slice(0,40) : '') + '</li>';
      }).join('');
    }

    saveBtn.addEventListener('click', function(){
      if (current.x === null){ alert('اختر نقطة على الشبكة أولاً'); return; }
      var entry = {
        t: Date.now(),
        x: current.x, y: current.y, zone: current.zone,
        word: wordSel.value || null,
        cause: (causeEl.value || '').slice(0, 280)
      };
      var arr = loadLog();
      arr.unshift(entry);
      saveLog(arr);
      causeEl.value = '';
      renderHistory();
      saveBtn.textContent = '✅ محفوظ';
      setTimeout(function(){ saveBtn.textContent = '💾 حفظ'; }, 1400);
    });

    clrBtn.addEventListener('click', function(){
      if (!confirm('مسح كل تسجيلات Mood Meter محلياً؟')) return;
      try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
      renderHistory();
    });

    renderHistory();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="eq"]');
    if (t) setTimeout(init, 80);
  });
})();
