/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-24.js
   Extracted from app.js lines 7375-8124
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ─── Lab tabs ─── */
  function setupLabTabs(root){
    var tabs   = root.querySelectorAll('[data-lab-tab]');
    var labs   = root.querySelectorAll('[data-lab]');
    if (!tabs.length) return;
    tabs.forEach(function(t){
      t.addEventListener('click', function(){
        var key = t.getAttribute('data-lab-tab');
        tabs.forEach(function(x){ x.classList.toggle('is-active', x === t); });
        labs.forEach(function(l){ l.classList.toggle('is-active', l.getAttribute('data-lab') === key); });
      });
    });
  }

  /* ─── 1) Code Trace ─── */
  var TRACES = [
    { name:'sum', code:[
        'let total = 0;',
        'for (let i = 1; i <= 4; i++) {',
        '  total = total + i;',
        '}',
        'return total;'
      ],
      steps:[
        {line:0, vars:{total:0}, out:''},
        {line:1, vars:{total:0,i:1}, out:''},
        {line:2, vars:{total:1,i:1}, out:''},
        {line:1, vars:{total:1,i:2}, out:''},
        {line:2, vars:{total:3,i:2}, out:''},
        {line:1, vars:{total:3,i:3}, out:''},
        {line:2, vars:{total:6,i:3}, out:''},
        {line:1, vars:{total:6,i:4}, out:''},
        {line:2, vars:{total:10,i:4}, out:''},
        {line:4, vars:{total:10}, out:'10'}
      ],
      note:'حلقة بسيطة O(n) — ١ + ٢ + ٣ + ٤ = ١٠'
    },
    { name:'closure', code:[
        'function counter(){',
        '  let n = 0;',
        '  return () => ++n;',
        '}',
        'const c = counter();',
        'c(); c(); c();',
        'return c();'
      ],
      steps:[
        {line:0, vars:{}, out:''},
        {line:4, vars:{c:'fn (closure n=0)'}, out:''},
        {line:5, vars:{c:'fn (closure n=1)'}, out:''},
        {line:5, vars:{c:'fn (closure n=2)'}, out:''},
        {line:5, vars:{c:'fn (closure n=3)'}, out:''},
        {line:6, vars:{c:'fn (closure n=4)'}, out:'4'}
      ],
      note:'الدالة تتذكّر n خاصتها — هذا closure'
    },
    { name:'mapfilter', code:[
        'const xs = [1,2,3,4,5];',
        'const evens = xs.filter(x => x % 2 === 0);',
        'const doubled = evens.map(x => x * 2);',
        'return doubled;'
      ],
      steps:[
        {line:0, vars:{xs:'[1,2,3,4,5]'}, out:''},
        {line:1, vars:{xs:'[1,2,3,4,5]', evens:'[2,4]'}, out:''},
        {line:2, vars:{xs:'[1,2,3,4,5]', evens:'[2,4]', doubled:'[4,8]'}, out:''},
        {line:3, vars:{doubled:'[4,8]'}, out:'[4,8]'}
      ],
      note:'سلسلة filter ثم map — كل خطوة تُنتج array جديد'
    },
    { name:'fact', code:[
        'function fact(n){',
        '  if (n <= 1) return 1;',
        '  return n * fact(n - 1);',
        '}',
        'return fact(4);'
      ],
      steps:[
        {line:4, vars:{n:4}, out:''},
        {line:2, vars:{n:4}, out:''},
        {line:2, vars:{n:3}, out:''},
        {line:2, vars:{n:2}, out:''},
        {line:1, vars:{n:1}, out:'returns 1'},
        {line:2, vars:{ret:'2 * 1 = 2'}, out:''},
        {line:2, vars:{ret:'3 * 2 = 6'}, out:''},
        {line:2, vars:{ret:'4 * 6 = 24'}, out:'24'}
      ],
      note:'recursion: stack ينمو ثم يتحلّل بقيم العودة'
    },
    { name:'async', code:[
        'fetch("/x")',
        '  .then(r => r.json())',
        '  .then(d => console.log(d))',
        '  .catch(e => console.error(e));',
        'console.log("after fetch");'
      ],
      steps:[
        {line:0, vars:{}, out:''},
        {line:4, vars:{}, out:'after fetch'},
        {line:1, vars:{r:'Response'}, out:'after fetch'},
        {line:2, vars:{d:'{...}'}, out:'after fetch\\n{...}'}
      ],
      note:'console.log يُطبع قبل النتيجة لأن fetch async'
    },
    { name:'destruct', code:[
        'const u = {name:"Sara", age:24, city:"Baghdad"};',
        'const {name, ...rest} = u;',
        'const all = [...Object.keys(rest), name];',
        'return all;'
      ],
      steps:[
        {line:0, vars:{u:'{name,age,city}'}, out:''},
        {line:1, vars:{name:'"Sara"', rest:'{age,city}'}, out:''},
        {line:2, vars:{name:'"Sara"', rest:'{age,city}', all:'["age","city","Sara"]'}, out:''},
        {line:3, vars:{all:'["age","city","Sara"]'}, out:'["age","city","Sara"]'}
      ],
      note:'destructuring + spread — أنماط ES6 متكرّرة في كل مشروع'
    },
    { name:'reduce', code:[
        'const votes = ["a","b","a","c","a","b"];',
        'const tally = votes.reduce((acc, v) => {',
        '  acc[v] = (acc[v] || 0) + 1;',
        '  return acc;',
        '}, {});',
        'return tally;'
      ],
      steps:[
        {line:0, vars:{votes:'["a","b","a","c","a","b"]'}, out:''},
        {line:1, vars:{acc:'{}', v:'"a"'}, out:''},
        {line:1, vars:{acc:'{a:1}', v:'"b"'}, out:''},
        {line:1, vars:{acc:'{a:1,b:1}', v:'"a"'}, out:''},
        {line:1, vars:{acc:'{a:2,b:1}', v:'"c"'}, out:''},
        {line:1, vars:{acc:'{a:2,b:1,c:1}', v:'"a"'}, out:''},
        {line:1, vars:{acc:'{a:3,b:1,c:1}', v:'"b"'}, out:''},
        {line:5, vars:{tally:'{a:3,b:2,c:1}'}, out:'{a:3,b:2,c:1}'}
      ],
      note:'reduce لتحويل array إلى shape مختلف — قوي جداً'
    },
    { name:'tryf', code:[
        'function risky(n){',
        '  try {',
        '    if (n < 0) throw new Error("neg");',
        '    return n * 2;',
        '  } catch(e) {',
        '    return -1;',
        '  } finally {',
        '    console.log("done");',
        '  }',
        '}',
        'return risky(-3);'
      ],
      steps:[
        {line:10, vars:{n:-3}, out:''},
        {line:2, vars:{n:-3}, out:''},
        {line:4, vars:{n:-3, e:'Error("neg")'}, out:''},
        {line:5, vars:{ret:-1}, out:''},
        {line:7, vars:{}, out:'done'},
        {line:9, vars:{ret:-1}, out:'done\\n-1'}
      ],
      note:'finally يُنفَّذ دائماً — حتى عند الخطأ أو return'
    }
  ];

  function setupTrace(root){
    var stage = root.querySelector('[data-trace-stage]');
    if (!stage) return;
    var pick = root.querySelector('[data-trace-pick]');
    var codeEl = root.querySelector('[data-trace-code]');
    var varsEl = root.querySelector('[data-trace-vars]');
    var outEl  = root.querySelector('[data-trace-out]');
    var stepEl = root.querySelector('[data-trace-step]');
    var noteEl = root.querySelector('[data-trace-note]');
    var prev   = root.querySelector('[data-trace-prev]');
    var next   = root.querySelector('[data-trace-next]');
    var rstBtn = root.querySelector('[data-trace-reset]');

    var idx = 0, step = 0, current = TRACES[0];

    function renderCode(){
      codeEl.innerHTML = current.code.map(function(line, i){
        return '<span class="line" data-li="' + i + '">' + line.replace(/</g,'&lt;') + '</span>';
      }).join('');
    }
    function renderStep(){
      var s = current.steps[step] || current.steps[current.steps.length - 1];
      codeEl.querySelectorAll('.line').forEach(function(l){
        l.classList.toggle('is-active', parseInt(l.getAttribute('data-li'),10) === s.line);
      });
      varsEl.innerHTML = '';
      Object.keys(s.vars).forEach(function(k){
        var li = document.createElement('li');
        li.innerHTML = '<b>' + k + '</b> = ' + String(s.vars[k]);
        varsEl.appendChild(li);
      });
      outEl.textContent = (s.out || '').replace(/\\n/g,'\n');
      stepEl.textContent = (step + 1) + ' / ' + current.steps.length;
      noteEl.textContent = current.note;
    }
    function load(i){
      idx = i; step = 0; current = TRACES[idx];
      renderCode(); renderStep();
    }
    pick.addEventListener('change', function(){ load(parseInt(pick.value,10)); });
    next.addEventListener('click', function(){
      if (step < current.steps.length - 1) { step++; renderStep(); }
    });
    prev.addEventListener('click', function(){
      if (step > 0) { step--; renderStep(); }
    });
    rstBtn.addEventListener('click', function(){ step = 0; renderStep(); });

    load(0);
  }

  /* ─── 2) Big-O Race ─── */
  function setupBigO(root){
    var canvas = root.querySelector('[data-bigo-canvas]');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var range = root.querySelector('[data-bigo-n]');
    var nval  = root.querySelector('[data-bigo-nval]');

    function draw(n){
      var W = canvas.width, H = canvas.height;
      ctx.fillStyle = 'rgba(2,6,23,0.85)';
      ctx.fillRect(0,0,W,H);
      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (var i = 1; i < 8; i++) {
        var y = (H - 30) * (i/8) + 10;
        ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(W-10, y); ctx.stroke();
      }

      // axes
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath(); ctx.moveTo(50, H-20); ctx.lineTo(W-10, H-20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 10); ctx.lineTo(50, H-20); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = '11px ui-monospace, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('cost', 46, 14);
      ctx.textAlign = 'left';
      ctx.fillText('n=' + n, 56, H - 6);

      // funcs
      var fns = [
        { name:'O(1)',     col:'#22C55E', f:function(x){ return 1; } },
        { name:'O(log n)', col:'#06B6D4', f:function(x){ return Math.log2(Math.max(2,x)); } },
        { name:'O(n)',     col:'#F59E0B', f:function(x){ return x; } },
        { name:'O(n²)',    col:'#EF4444', f:function(x){ return x*x; } }
      ];
      // normalize using max value at n
      var maxV = fns[3].f(n);
      var stepX = (W - 70) / n;
      fns.forEach(function(fn){
        ctx.strokeStyle = fn.col;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (var x = 1; x <= n; x++) {
          var v = fn.f(x);
          var px = 50 + x * stepX;
          var py = (H - 20) - (v / maxV) * (H - 30);
          if (py < 8) py = 8;
          if (x === 1) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });
    }

    function go(){
      var n = parseInt(range.value, 10) || 500;
      nval.textContent = n;
      draw(n);
    }
    range.addEventListener('input', go);
    go();
  }

  /* ─── 3) Git Sandbox (visual) ─── */
  function setupGits(root){
    var svg = root.querySelector('[data-gits-svg]');
    if (!svg) return;
    var headEl   = root.querySelector('[data-gits-head]');
    var brEl     = root.querySelector('[data-gits-branches]');
    var logEl    = root.querySelector('[data-gits-log]');
    var resetBtn = root.querySelector('[data-gits-reset]');
    var btns     = root.querySelectorAll('[data-gits-cmd]');

    var state, history;

    function reset(){
      state = {
        commits: [{ id:'c1', parents:[], lane:0 }],
        branches: { main:'c1' },
        head: 'main'
      };
      history = ['init: c1 on main'];
      render();
    }

    function newId(){
      return 'c' + (state.commits.length + 1);
    }

    function logPush(s){ history.unshift(s); if (history.length > 8) history.pop(); }

    function render(){
      // SVG layout
      var laneCount = Math.max.apply(null, state.commits.map(function(c){ return c.lane; })) + 1;
      var laneGap = 60;
      var startX = 40;
      var rowGap = 80;
      var W = 640, H = 220;
      var nodes = state.commits.map(function(c, i){
        return { c:c, x: startX + i * rowGap, y: 60 + c.lane * laneGap };
      });

      svg.innerHTML = '';
      // edges
      nodes.forEach(function(n){
        n.c.parents.forEach(function(pid){
          var p = nodes.find(function(x){ return x.c.id === pid; });
          if (!p) return;
          var ln = '<line x1="'+p.x+'" y1="'+p.y+'" x2="'+n.x+'" y2="'+n.y+'" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>';
          svg.insertAdjacentHTML('beforeend', ln);
        });
      });
      // nodes
      nodes.forEach(function(n){
        var col = n.c.lane === 0 ? '#06B6D4' : '#F472B6';
        svg.insertAdjacentHTML('beforeend',
          '<circle cx="'+n.x+'" cy="'+n.y+'" r="14" fill="'+col+'" stroke="#fff" stroke-width="2"/>'+
          '<text x="'+n.x+'" y="'+(n.y+4)+'" fill="#fff" font-size="10" font-weight="800" text-anchor="middle" font-family="ui-monospace,monospace">'+n.c.id+'</text>'
        );
      });
      // branch labels
      Object.keys(state.branches).forEach(function(bn){
        var c = state.branches[bn];
        var n = nodes.find(function(x){ return x.c.id === c; });
        if (!n) return;
        var color = bn === 'main' ? '#06B6D4' : '#F472B6';
        svg.insertAdjacentHTML('beforeend',
          '<rect x="'+(n.x-20)+'" y="'+(n.y-38)+'" width="40" height="18" rx="4" fill="'+color+'" />'+
          '<text x="'+n.x+'" y="'+(n.y-24)+'" fill="#fff" font-size="10" font-weight="800" text-anchor="middle">'+bn+'</text>'
        );
      });
      // HEAD pointer
      var headCommit = state.branches[state.head];
      var hn = nodes.find(function(x){ return x.c.id === headCommit; });
      if (hn) {
        svg.insertAdjacentHTML('beforeend',
          '<text x="'+hn.x+'" y="'+(hn.y+34)+'" fill="#FCD34D" font-size="10" font-weight="800" text-anchor="middle">HEAD →</text>'
        );
      }

      headEl.textContent = state.head + ' (' + state.branches[state.head] + ')';
      brEl.textContent = Object.keys(state.branches).join(', ');

      logEl.innerHTML = history.map(function(s){ return '<li>'+s.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</li>'; }).join('');
    }

    var cmds = {
      commit: function(){
        var id = newId();
        var lane = state.head === 'main' ? 0 : 1;
        var parent = state.branches[state.head];
        state.commits.push({ id:id, parents:[parent], lane:lane });
        state.branches[state.head] = id;
        logPush('git commit  →  ' + id + ' on ' + state.head);
      },
      branch: function(){
        if (state.branches.feat) { logPush('feat موجود — تجاهل'); return; }
        state.branches.feat = state.branches[state.head];
        state.head = 'feat';
        logPush('git switch -c feat');
      },
      commitFeat: function(){
        if (state.head !== 'feat') {
          state.head = 'feat';
          if (!state.branches.feat) state.branches.feat = state.branches.main;
        }
        cmds.commit();
      },
      switchMain: function(){
        state.head = 'main';
        logPush('git switch main');
      },
      merge: function(){
        if (!state.branches.feat) { logPush('لا يوجد feat للدمج'); return; }
        if (state.head !== 'main') { logPush('انتقل إلى main أولاً'); return; }
        var id = newId();
        var p1 = state.branches.main, p2 = state.branches.feat;
        state.commits.push({ id:id, parents:[p1, p2], lane:0 });
        state.branches.main = id;
        logPush('git merge feat  →  ' + id + ' (merge commit)');
      },
      undo: function(){
        if (state.commits.length <= 1) { logPush('لا يوجد ما يُتراجَع'); return; }
        var last = state.commits.pop();
        // restore branch to parent
        var parent = last.parents[0];
        Object.keys(state.branches).forEach(function(bn){
          if (state.branches[bn] === last.id) state.branches[bn] = parent;
        });
        logPush('↶ تراجع عن ' + last.id);
      }
    };

    btns.forEach(function(b){
      b.addEventListener('click', function(){
        var key = b.getAttribute('data-gits-cmd');
        if (cmds[key]) { cmds[key](); render(); }
      });
    });
    resetBtn.addEventListener('click', reset);
    reset();
  }

  /* ─── 4) Interview Sim ─── */
  var IV_QUESTIONS = [
    { track:'any', level:'easy', type:'conceptual',
      q:'ما الفرق بين <code>let</code> و <code>const</code> و <code>var</code>؟',
      keys:['scope','block','let','const','redeclare','hoist','var','function-scope']
    },
    { track:'any', level:'easy', type:'conceptual',
      q:'وضّح ما يحدث عند كتابة <code>===</code> مقابل <code>==</code>.',
      keys:['type','coercion','strict','نوع','تحويل']
    },
    { track:'fe', level:'easy', type:'conceptual',
      q:'متى تستخدم <code>display: flex</code> ومتى <code>display: grid</code>؟',
      keys:['flex','grid','axis','بُعد','صفوف','أعمدة','محور']
    },
    { track:'be', level:'easy', type:'conceptual',
      q:'لماذا لا نُخزّن كلمات السرّ بشكل نصّي صريح في قاعدة البيانات؟',
      keys:['hash','bcrypt','salt','تشفير','اختراق','rainbow']
    },
    { track:'any', level:'med', type:'conceptual',
      q:'اشرح closure مع مثال عملي تستخدمه فعلاً.',
      keys:['scope','تتذكّر','closure','factory','counter','encapsulate','private']
    },
    { track:'any', level:'med', type:'code',
      q:'اكتب دالة <code>debounce(fn, ms)</code>.',
      keys:['setTimeout','clearTimeout','timer','args','this','closure','return']
    },
    { track:'fe', level:'med', type:'conceptual',
      q:'ما هي إعادة العرض (re-render) في React ومتى تحدث؟',
      keys:['state','props','context','virtual','reconcile','useState','setState','useEffect']
    },
    { track:'be', level:'med', type:'conceptual',
      q:'فرق بين JWT و sessions — متى تختار أيهما؟',
      keys:['stateless','server','cookie','token','expire','revoke','signature','scale']
    },
    { track:'any', level:'med', type:'code',
      q:'اكتب دالة تتحقّق ما إذا كانت سلسلة <em>palindrome</em>.',
      keys:['split','reverse','join','toLowerCase','reduce','two-pointer']
    },
    { track:'any', level:'hard', type:'conceptual',
      q:'وضّح event loop في JavaScript مع microtasks vs tasks.',
      keys:['stack','queue','microtask','macrotask','promise','setTimeout','event loop','render']
    },
    { track:'fe', level:'hard', type:'conceptual',
      q:'كيف تُحسّن أداء قائمة من 5000 عنصر في React؟',
      keys:['virtualize','window','memo','useMemo','key','pagination','useCallback','windowing']
    },
    { track:'be', level:'hard', type:'conceptual',
      q:'تصميم rate limiter بسيط — ما الخوارزميات الممكنة؟',
      keys:['token bucket','leaky','fixed window','sliding','redis','counter','header']
    },
    { track:'any', level:'hard', type:'code',
      q:'اكتب دالة تُجمّع كائنات حسب مفتاح: <code>groupBy(arr, key)</code>.',
      keys:['reduce','accumulator','key','push','return','object']
    },
    { track:'any', level:'hard', type:'conceptual',
      q:'ماذا يعني SOLID؟ اشرح S و D باختصار.',
      keys:['single','responsibility','dependency','inversion','abstraction','interface','open','liskov']
    },
    { track:'any', level:'med', type:'conceptual',
      q:'اشرح الفرق بين Stack و Heap في إدارة الذاكرة.',
      keys:['primitive','reference','heap','stack','garbage','allocation','frame']
    }
  ];

  function setupInterview(root){
    var panel = root.querySelector('[data-iv-track]');
    if (!panel) return;
    var trackSel = root.querySelector('[data-iv-track]');
    var levelSel = root.querySelector('[data-iv-level]');
    var stemEl   = root.querySelector('[data-iv-stem]');
    var tagsEl   = root.querySelector('[data-iv-tags]');
    var numEl    = root.querySelector('[data-iv-num]');
    var ansEl    = root.querySelector('[data-iv-answer]');
    var fbEl     = root.querySelector('[data-iv-feedback]');
    var rptEl    = root.querySelector('[data-iv-report]');
    var sumEl    = root.querySelector('[data-iv-summary]');
    var gradeBtn = root.querySelector('[data-iv-grade]');
    var nextBtn  = root.querySelector('[data-iv-next]');
    var resetBtn = root.querySelector('[data-iv-reset]');

    var pool = [], idx = 0;
    var scores = { knowledge:0, comm:0, solve:0, quality:0 };
    var attempts = 0;

    function buildPool(){
      var t = trackSel.value, l = levelSel.value;
      pool = IV_QUESTIONS.filter(function(q){
        if (t !== 'any' && q.track !== 'any' && q.track !== t) return false;
        if (l !== 'any' && q.level !== l) return false;
        return true;
      });
      // shuffle
      for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
      }
      pool = pool.slice(0, Math.min(15, pool.length));
    }

    function show(){
      if (!pool.length || idx >= pool.length) {
        renderReport();
        return;
      }
      var q = pool[idx];
      stemEl.innerHTML = q.q;
      tagsEl.textContent = q.type + ' · ' + q.level;
      numEl.textContent = (idx + 1) + ' / ' + pool.length;
      ansEl.value = '';
      fbEl.hidden = true;
      rptEl.hidden = true;
    }

    function grade(){
      if (idx >= pool.length) return;
      var q = pool[idx];
      var ans = (ansEl.value || '').toLowerCase();
      if (ans.length < 5) {
        fbEl.hidden = false;
        fbEl.innerHTML = '<b>إجابة قصيرة جداً</b> — اكتب على الأقل جملة. الكلمات المفتاحية المتوقعة: ' + q.keys.slice(0,4).join(', ');
        return;
      }
      var hits = 0, missed = [];
      q.keys.forEach(function(k){
        if (ans.indexOf(k.toLowerCase()) >= 0) hits++;
        else missed.push(k);
      });
      var ratio = hits / q.keys.length;
      // axes scoring
      scores.knowledge += Math.min(1, ratio + (ans.length > 80 ? 0.1 : 0));
      scores.comm      += Math.min(1, (ans.length > 60 ? 0.6 : 0.3) + (/مثال|example/i.test(ans) ? 0.4 : 0));
      scores.solve     += Math.min(1, (q.type === 'code' && /function|=>|return|const|let/.test(ans) ? 0.8 : 0.4) + (ratio * 0.4));
      scores.quality   += Math.min(1, (/\(|\)|;|return/.test(ans) ? 0.5 : 0.2) + (ratio * 0.5));
      attempts++;

      fbEl.hidden = false;
      var fbParts = [];
      fbParts.push('<b>التقييم:</b> أصبت ' + hits + ' من ' + q.keys.length + ' من الكلمات المفتاحية.');
      if (missed.length) fbParts.push('<span class="miss"><b>كان يمكن ذكر:</b></span> ' + missed.slice(0,4).join(' · '));
      if (q.type === 'code' && !/function|=>/i.test(ans)) fbParts.push('<b>تلميح:</b> الأسئلة من نوع code تحتاج كتابة دالة كاملة.');
      fbEl.innerHTML = fbParts.join('<br>');
    }

    function renderReport(){
      rptEl.hidden = false;
      stemEl.textContent = '— انتهت الجلسة —';
      tagsEl.textContent = '';
      ansEl.value = '';
      fbEl.hidden = true;

      var n = Math.max(1, attempts);
      ['knowledge','comm','solve','quality'].forEach(function(k){
        var pct = Math.round((scores[k] / n) * 100);
        var bar = root.querySelector('[data-iv-ax="' + k + '"]');
        if (bar) bar.style.width = Math.min(100, pct) + '%';
      });
      var avg = Math.round(((scores.knowledge + scores.comm + scores.solve + scores.quality) / 4 / n) * 100);
      var verdict = avg >= 75 ? 'ممتاز — جاهز لمقابلات junior في معظم الشركات.'
                   : avg >= 55 ? 'جيد — استمر في التدريب على code-walkthroughs.'
                   : 'بداية — راجع الأساسيات وأعد المحاولة بعد ٣ أيام.';
      sumEl.innerHTML = '<b>المتوسّط: ' + avg + '%</b> · ' + verdict;

      try {
        var saved = JSON.parse(localStorage.getItem('upg_interview_attempts') || '[]');
        saved.unshift({ ts:Date.now(), avg:avg, scores:scores, n:attempts });
        localStorage.setItem('upg_interview_attempts', JSON.stringify(saved.slice(0, 10)));
      } catch(_){}
    }

    function fullReset(){
      idx = 0; attempts = 0;
      scores = { knowledge:0, comm:0, solve:0, quality:0 };
      buildPool(); show();
    }

    gradeBtn.addEventListener('click', grade);
    nextBtn.addEventListener('click', function(){
      idx++; show();
    });
    resetBtn.addEventListener('click', fullReset);
    trackSel.addEventListener('change', fullReset);
    levelSel.addEventListener('change', fullReset);

    fullReset();
  }

  /* ─── 5) Portfolio Generator ─── */
  var PORT_DB = {
    fe: [
      { title:'Bookmark Manager (PWA)',
        spec:'تطبيق ويب يحفظ الروابط حسب فولدر + tags + بحث فوري + يعمل offline.',
        stack:['React','TypeScript','IndexedDB','Workbox'],
        ms:['Setup Vite + TS','UI: list + form','TODO: tags filter','IndexedDB layer','Service Worker offline','Deploy + share'],
        stretch:'استيراد/تصدير JSON، مزامنة عبر Supabase.'
      },
      { title:'Pomodoro + Habit Tracker',
        spec:'مؤقت 25/5 مع لوحة عادات يومية + تصور تقدّم بـ Calendar Heatmap.',
        stack:['React','Zustand','date-fns'],
        ms:['Timer logic','Settings','Daily streaks','Heatmap chart','Sound + notifications','PWA manifest'],
        stretch:'إحصاءات أسبوعية + سلوك Push notifications.'
      },
      { title:'Recipe Finder',
        spec:'بحث عن وصفات بالاعتماد على Spoonacular API + حفظ المفضّلة محلياً.',
        stack:['React','React Router','Tailwind','Spoonacular'],
        ms:['Setup routes','Search UI','Recipe detail','Favorites localStorage','Skeleton loaders','Deploy'],
        stretch:'تحويل المقادير عربي/إمبريالي + قائمة تسوّق.'
      }
    ],
    be: [
      { title:'URL Shortener API',
        spec:'API ينشئ روابط قصيرة + يتتبّع clicks + rate limit.',
        stack:['Node','Express','PostgreSQL','Redis','Docker'],
        ms:['Schema design','POST /shorten + base62','GET /:slug + metrics','Rate limiter','Tests + Docker','Deploy on Render'],
        stretch:'QR code، dashboard analytics بسيط.'
      },
      { title:'Jobs Queue Service',
        spec:'API تستقبل jobs (email, image-resize) وتنفّذها async مع status.',
        stack:['Node','Express','BullMQ','Redis','Prisma'],
        ms:['Producer endpoint','Worker process','Status endpoint','Retry + DLQ','Auth + tests','Docker compose'],
        stretch:'لوحة إدارة بسيطة + webhooks.'
      },
      { title:'Mini E-commerce API',
        spec:'منتجات + سلة + checkout (موك)، JWT auth، tests، Stripe sandbox.',
        stack:['Node','Express','PostgreSQL','Prisma','Stripe-test'],
        ms:['Auth flow','Products CRUD','Cart logic','Checkout + webhook','Tests ≥70%','Deploy + README'],
        stretch:'العراق: VAT 0% + IQD pricing + Iraqi phone OTP.'
      }
    ],
    full: [
      { title:'Real-time Q&A (Slido-clone)',
        spec:'مستخدمون يطرحون أسئلة على فعالية، يصوّتون، الـ admin يجيب — كل شيء realtime.',
        stack:['Next.js','Supabase Realtime','Tailwind','Tailwind UI'],
        ms:['Supabase schema','Auth + rooms','Question UI','Realtime subscription','Vote sorting','Admin view'],
        stretch:'Moderation + spam filter + export PDF.'
      },
      { title:'Habit Coach Lite',
        spec:'iOS-style PWA لتتبّع العادات + reminders + dashboard أسبوعي.',
        stack:['Next.js','Prisma','PostgreSQL','Cron'],
        ms:['Auth','Habits CRUD','Daily check-in','Streak logic','Email reminders','Charts'],
        stretch:'AI: تذكير ذكي حسب نمط المستخدم.'
      },
      { title:'Iraqi Currency Tracker',
        spec:'يعرض سعر IQD/USD اليومي + رسوم تاريخية + alerts بنسبة تغيير.',
        stack:['Next.js','PostgreSQL','Cron scrapers'],
        ms:['Scraper API','Schedule cron','Public dashboard','Alerts subscription','Telegram bot','Cache layer'],
        stretch:'تحويل بطاقات/أسواق + dashboard للتجار.'
      }
    ]
  };

  function setupPortfolio(root){
    var btn = root.querySelector('[data-port-go]');
    if (!btn) return;
    var trackSel = root.querySelector('[data-port-track]');
    var levelSel = root.querySelector('[data-port-level]');
    var hoursSel = root.querySelector('[data-port-hours]');
    var resEl    = root.querySelector('[data-port-results]');

    function timeFor(level, hours){
      var weeks = level === 'beg' ? 4 : level === 'mid' ? 6 : 8;
      if (hours === 'lt10')  weeks = Math.round(weeks * 1.6);
      if (hours === 'gt20')  weeks = Math.round(weeks * 0.7);
      return weeks;
    }

    function go(){
      var track = trackSel.value;
      var level = levelSel.value;
      var hours = hoursSel.value;
      var weeks = timeFor(level, hours);
      var ideas = (PORT_DB[track] || PORT_DB.fe).slice();

      resEl.innerHTML = '';
      ideas.forEach(function(it){
        var el = document.createElement('article');
        el.className = 'prog-port-card';
        el.innerHTML = '' +
          '<h4>' + it.title + '</h4>' +
          '<p>' + it.spec + '</p>' +
          '<div class="meta">' +
            it.stack.map(function(s){ return '<span>' + s + '</span>'; }).join('') +
            '<span>~' + weeks + ' أسبوع</span>' +
          '</div>' +
          '<ol class="ms">' +
            it.ms.map(function(m){ return '<li>' + m + '</li>'; }).join('') +
          '</ol>' +
          '<div class="stretch"><b>Stretch:</b> ' + it.stretch + '</div>';
        resEl.appendChild(el);
      });

      try {
        localStorage.setItem('upg_portfolio_drafts', JSON.stringify({
          track:track, level:level, hours:hours, ts:Date.now()
        }));
      } catch(_){}
    }

    btn.addEventListener('click', go);

    // restore last
    try {
      var saved = JSON.parse(localStorage.getItem('upg_portfolio_drafts'));
      if (saved) {
        trackSel.value = saved.track || 'fe';
        levelSel.value = saved.level || 'beg';
        hoursSel.value = saved.hours || '10-20';
        go();
      }
    } catch(_){}
  }

  ready(function(){
    var root = document.getElementById('page-programming');
    if (!root) return;
    try { setupLabTabs(root); }   catch(e){ console.warn('W05 lab tabs', e); }
    try { setupTrace(root); }     catch(e){ console.warn('W05 trace', e); }
    try { setupBigO(root); }      catch(e){ console.warn('W05 bigo', e); }
    try { setupGits(root); }      catch(e){ console.warn('W05 gits', e); }
    try { setupInterview(root); } catch(e){ console.warn('W05 iv', e); }
    try { setupPortfolio(root); } catch(e){ console.warn('W05 port', e); }
  });
})();
