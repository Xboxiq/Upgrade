/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-22.js
   Extracted from app.js lines 6970-7279
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var LS_PROG = 'upg_progress_prog';
  var LS_PATH = 'upg_path_choice';

  function loadProg(){
    try { return JSON.parse(localStorage.getItem(LS_PROG)) || {}; }
    catch(e){ return {}; }
  }
  function saveProg(o){
    try { localStorage.setItem(LS_PROG, JSON.stringify(o)); } catch(e){}
  }

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ─── Fundamentals "I got it" tracking ─── */
  function setupFund(root){
    var cards = root.querySelectorAll('[data-fund-card]');
    var pctEl = root.querySelector('[data-fund-pct]');
    if (!cards.length) return;

    var state = loadProg();
    state.fundamentals = state.fundamentals || {};

    function refresh(){
      var done = 0, total = cards.length;
      cards.forEach(function(c){
        var id = c.getAttribute('data-fund-card');
        if (state.fundamentals[id]) {
          c.classList.add('is-marked');
          done++;
        } else {
          c.classList.remove('is-marked');
        }
      });
      if (pctEl) pctEl.textContent = Math.round((done/total)*100) + '%';
    }

    cards.forEach(function(c){
      var btn = c.querySelector('.prog-fund-mark');
      if (!btn) return;
      btn.addEventListener('click', function(){
        var id = c.getAttribute('data-fund-card');
        state.fundamentals[id] = !state.fundamentals[id];
        saveProg(state);
        refresh();
      });
    });

    refresh();
  }

  /* ─── Quiz ─── */
  var QUIZ = [
    { q:'ما الفرق الجوهري بين قيم primitive و reference؟',
      a:['تُمرَّر primitive كنسخة وreference بالعنوان','تُمرَّر primitive بالعنوان','reference أسرع دائماً','لا فرق'],
      c:0 },
    { q:'دالة pure هي…',
      a:['دالة طويلة','دالة بدون معاملات','دالة لا تعتمد على شيء خارجي ولا تُغيّره','دالة async'],
      c:2 },
    { q:'الـ closure تتذكّر…',
      a:['متغيّرات global فقط','متغيّرات بيئتها التي أنشأتها','اسم الملف','نوع المتصفح'],
      c:1 },
    { q:'await داخل async function يعني…',
      a:['ينتظر دون تجميد thread الرئيسي','يجمّد الصفحة','يلغي الطلب','يطبع في console'],
      c:0 },
    { q:'البنية الأنسب لتنفيذ undo/redo:',
      a:['Queue','Hashmap','Stack','Tree'],
      c:2 },
    { q:'ما Big-O لإيجاد عنصر في مصفوفة غير مرتّبة؟',
      a:['O(1)','O(log n)','O(n)','O(n²)'],
      c:2 },
    { q:'الـ Binary Search تتطلّب أن تكون البيانات…',
      a:['كبيرة','صغيرة','مرتّبة','مكرّرة'],
      c:2 },
    { q:'أين تعيش الـ objects في JavaScript؟',
      a:['Stack','Heap','Cache','GPU'],
      c:1 },
    { q:'متى يُفضّل استخدام Map على Object العادي؟',
      a:['أبداً','عند مفاتيح ديناميكية كثيرة أو غير نصية','مع JSON فقط','عند وجود dates'],
      c:1 },
    { q:'recursion ضرورية حين…',
      a:['يكون الإدخال صغيراً','تتفرّع البنية بشكل شجري أو تكراري ذاتي','تكون الخوارزمية بسيطة','نريد سرعة قصوى'],
      c:1 }
  ];

  function setupQuiz(root){
    var box = root.querySelector('[data-prog-quiz]');
    if (!box) return;
    var listEl  = box.querySelector('[data-quiz-list]');
    var scoreEl = box.querySelector('[data-quiz-score]');
    var hintEl  = box.querySelector('[data-quiz-hint]');
    var subBtn  = box.querySelector('[data-quiz-submit]');
    var rstBtn  = box.querySelector('[data-quiz-reset]');

    function render(){
      listEl.innerHTML = '';
      QUIZ.forEach(function(item, i){
        var li = document.createElement('li');
        li.className = 'prog-quiz-q';
        li.setAttribute('data-qi', i);
        var stem = document.createElement('div');
        stem.className = 'stem'; stem.textContent = item.q;
        li.appendChild(stem);
        var opts = document.createElement('div');
        opts.className = 'opts';
        item.a.forEach(function(opt, j){
          var lbl = document.createElement('label');
          var rb  = document.createElement('input');
          rb.type = 'radio'; rb.name = 'q-' + i; rb.value = j;
          var sp = document.createElement('span'); sp.textContent = opt;
          lbl.appendChild(rb); lbl.appendChild(sp);
          opts.appendChild(lbl);
        });
        li.appendChild(opts);
        listEl.appendChild(li);
      });
    }

    function clearMarks(){
      box.querySelectorAll('label').forEach(function(l){
        l.classList.remove('is-correct','is-wrong');
      });
      scoreEl.classList.remove('is-pass','is-fail');
      scoreEl.textContent = '—';
    }

    function grade(){
      var score = 0;
      QUIZ.forEach(function(item, i){
        var sel = box.querySelector('input[name="q-' + i + '"]:checked');
        var labels = box.querySelectorAll('[data-qi="' + i + '"] label');
        labels.forEach(function(l, j){
          l.classList.remove('is-correct','is-wrong');
          if (j === item.c) l.classList.add('is-correct');
        });
        if (sel) {
          var picked = parseInt(sel.value, 10);
          if (picked === item.c) score++;
          else labels[picked].classList.add('is-wrong');
        }
      });
      var pct = Math.round((score / QUIZ.length) * 100);
      scoreEl.textContent = score + '/' + QUIZ.length;
      scoreEl.classList.toggle('is-pass', pct >= 70);
      scoreEl.classList.toggle('is-fail', pct <  70);
      hintEl.textContent = pct >= 70
        ? '✓ ممتاز — البوابة مفتوحة. انتقل إلى خرائط الطرق.'
        : 'لا بأس — راجع البطاقات وأعد المحاولة.';
      var state = loadProg();
      state.quiz = { score: score, total: QUIZ.length, pct: pct, ts: Date.now() };
      saveProg(state);
    }

    subBtn.addEventListener('click', grade);
    rstBtn.addEventListener('click', function(){
      box.querySelectorAll('input[type="radio"]').forEach(function(r){ r.checked = false; });
      clearMarks();
      hintEl.textContent = 'لم تبدأ بعد';
    });

    render();
    var saved = loadProg().quiz;
    if (saved) {
      scoreEl.textContent = saved.score + '/' + saved.total;
      scoreEl.classList.toggle('is-pass', saved.pct >= 70);
      scoreEl.classList.toggle('is-fail', saved.pct <  70);
      hintEl.textContent = 'آخر نتيجة محفوظة: ' + saved.pct + '%';
    }
  }

  /* ─── Path Decision Tree ─── */
  var PATH_MATRIX = {
    visual:  { id:'FRONTEND',  title:'Frontend Web',
               why:'الميل البصري + رغبتك بالتفاعل = مجال يُكافئ الذوق والتنفيذ السريع.',
               first:'ثبّت VS Code + git، أنشئ مشروع HTML/CSS بسيط (Personal Card)، وادفعه على GitHub.',
               stack:'HTML5 · CSS3 · JS · React · Vite',
               time:'~12 أسبوع للوصول لمستوى Junior' },
    systems: { id:'BACKEND',   title:'Backend Web',
               why:'تستمتع بحلّ الألغاز المنطقية وقواعد البيانات = طبيعة backend تماماً.',
               first:'ثبّت Node.js + PostgreSQL، اكتب REST API صغير (todo) واختبره بـ Postman.',
               stack:'Node.js · Express · PostgreSQL · Prisma · Docker',
               time:'~12 أسبوع للوصول لمستوى Junior' },
    mobile:  { id:'MOBILE',    title:'Mobile (Flutter)',
               why:'الموبايل في العراق نمو حقيقي، وFlutter سيد السوق محلياً.',
               first:'ثبّت Flutter SDK، شغّل counter app على هاتفك، عدّل الألوان والـ widget tree.',
               stack:'Dart · Flutter · Firebase',
               time:'~14 أسبوع — منحنى التعلم أعلى' },
    data:    { id:'DATA',      title:'Data / Analytics',
               why:'هذا مسار خارج نطاق الـ module — لكنّه واعد جداً (Python + SQL + Pandas + ML).',
               first:'ابدأ بكورس Python للمبتدئين، ثم SQL أساسي، ثم Pandas. سنُغطّيه في وحدة مستقلة.',
               stack:'Python · SQL · Pandas · scikit-learn',
               time:'~16 أسبوع — أطول لكن مردود مرتفع' }
  };

  function setupPaths(root){
    var box = root.querySelector('[data-paths-tree]');
    if (!box) return;
    var steps = {
      1: box.querySelector('[data-step="1"]'),
      2: box.querySelector('[data-step="2"]'),
      3: box.querySelector('[data-step="3"]'),
      4: box.querySelector('[data-step="4"]')
    };
    var pillEl  = box.querySelector('[data-result-pill]');
    var titleEl = box.querySelector('[data-result-title]');
    var whyEl   = box.querySelector('[data-result-why]');
    var firstEl = box.querySelector('[data-result-first]');
    var stackEl = box.querySelector('[data-result-stack]');
    var timeEl  = box.querySelector('[data-result-time]');
    var restart = box.querySelector('[data-paths-restart]');

    var pick = { interest: null, hours: null, goal: null };

    function show(step){
      [1,2,3,4].forEach(function(k){
        if (steps[k]) steps[k].hidden = (k !== step) && !(step === 4 && k === 4);
      });
      // keep previous answered steps visible too
      if (step === 4) {
        steps[1].hidden = false; steps[2].hidden = false; steps[3].hidden = false;
      } else {
        for (var k=1;k<=3;k++) steps[k].hidden = (k > step);
      }
    }

    function compute(){
      var base = PATH_MATRIX[pick.interest] || PATH_MATRIX.visual;
      var why  = base.why;
      // hours nudge
      if (pick.hours === 'lt10') why += ' — مع <10 ساعات/أسبوع، توقّع 4-6 أشهر للوصول لـ Junior.';
      if (pick.hours === 'gt20') why += ' — مع 20+ ساعة/أسبوع، يمكن خلال 10-12 أسبوع لو التزمت.';
      // goal nudge
      if (pick.goal === 'remote') why += ' • هدف Remote = ركّز على English + GitHub + portfolio بالإنجليزية.';
      if (pick.goal === 'local')  why += ' • للسوق المحلي، React/Flutter/Node يفتحون أكثر الأبواب.';
      if (pick.goal === 'found')  why += ' • لمشروعك الخاص، اختر stack تستطيع شحنه أسبوعياً (Vite + Supabase مثلاً).';

      pillEl.textContent  = base.id;
      titleEl.textContent = base.title;
      whyEl.textContent   = why;
      firstEl.textContent = base.first;
      stackEl.textContent = base.stack;
      timeEl.textContent  = base.time;

      try {
        localStorage.setItem(LS_PATH, JSON.stringify({ pick: pick, result: base.id, ts: Date.now() }));
      } catch(_){}
    }

    function bindStep(stepEl, attr, key, nextStep){
      var btns = stepEl.querySelectorAll('button[data-' + attr + ']');
      btns.forEach(function(b){
        b.addEventListener('click', function(){
          btns.forEach(function(x){ x.classList.remove('is-picked'); });
          b.classList.add('is-picked');
          pick[key] = b.getAttribute('data-' + attr);
          if (nextStep) {
            steps[nextStep].hidden = false;
            steps[nextStep].scrollIntoView({ behavior:'smooth', block:'center' });
          } else {
            steps[4].hidden = false;
            compute();
            steps[4].scrollIntoView({ behavior:'smooth', block:'center' });
          }
        });
      });
    }

    bindStep(steps[1], 'pick',  'interest', 2);
    bindStep(steps[2], 'hours', 'hours',    3);
    bindStep(steps[3], 'goal',  'goal',     null);

    restart.addEventListener('click', function(){
      pick = { interest:null, hours:null, goal:null };
      box.querySelectorAll('button.is-picked').forEach(function(b){ b.classList.remove('is-picked'); });
      steps[2].hidden = true; steps[3].hidden = true; steps[4].hidden = true;
      steps[1].scrollIntoView({ behavior:'smooth', block:'center' });
      try { localStorage.removeItem(LS_PATH); } catch(_){}
    });

    // Restore previous pick
    try {
      var saved = JSON.parse(localStorage.getItem(LS_PATH));
      if (saved && saved.pick && saved.pick.interest) {
        pick = saved.pick;
        ['interest','hours','goal'].forEach(function(k, idx){
          if (!pick[k]) return;
          var attr = (k === 'interest') ? 'pick' : (k === 'hours' ? 'hours' : 'goal');
          var step = steps[idx + 1];
          var btn  = step.querySelector('button[data-' + attr + '="' + pick[k] + '"]');
          if (btn) btn.classList.add('is-picked');
          if (idx + 2 <= 4) steps[idx + 2].hidden = false;
        });
        if (pick.goal) compute();
      }
    } catch(_){}
  }

  ready(function(){
    var root = document.getElementById('page-programming');
    if (!root) return;
    try { setupFund(root);  } catch(e){ console.warn('W05 fund', e); }
    try { setupQuiz(root);  } catch(e){ console.warn('W05 quiz', e); }
    try { setupPaths(root); } catch(e){ console.warn('W05 paths', e); }
  });
})();
