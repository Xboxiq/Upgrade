/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-26.js
   Extracted from app.js lines 8356-8595
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ──────── 1. Pillar Calculator ──────── */
  var INDUSTRY_MIX = {
    default:    { edu:40, ent:25, ins:15, prom:15, bts:5,  hint:'مزيج متوازن للعلامات العامة. غيّر الصناعة لتعديل دقيق.' },
    b2b:        { edu:55, ent:10, ins:15, prom:15, bts:5,  hint:'B2B / SaaS: التعليم والـ thought leadership أولوية. الترفيه أقل، Behind-the-scenes للـ humanization.' },
    ecom:       { edu:25, ent:25, ins:10, prom:30, bts:10, hint:'تجارة إلكترونية: الـ promotional يصل 30% (UGC + demos + offers). الترفيه يدفع الـ shares.' },
    restaurant: { edu:15, ent:30, ins:10, prom:25, bts:20, hint:'مطاعم: BTS عالي (المطبخ، الطاهي) + ترفيه + عروض. الناس تشتري التجربة قبل الطعام.' },
    education:  { edu:60, ent:10, ins:15, prom:10, bts:5,  hint:'تعليم/كورسات: 60% تعليمي = إثبات الـ authority. ترويجي محدود لكي لا يبدو spammy.' },
    fashion:    { edu:15, ent:20, ins:25, prom:25, bts:15, hint:'أزياء: الإلهام (lookbooks) والترويجي متساويان. BTS من الـ shoots = حقيقية.' },
    tech:       { edu:50, ent:15, ins:10, prom:20, bts:5,  hint:'تكنولوجيا: tutorials + product updates. الترفيه عبر memes تقنية.' },
    health:     { edu:50, ent:10, ins:25, prom:10, bts:5,  hint:'صحة: تعليم وإلهام يبنيان الثقة. الترويج محدود (regulations).' }
  };

  function w6UpdatePillars(key){
    var mix = INDUSTRY_MIX[key] || INDUSTRY_MIX.default;
    Object.keys(mix).forEach(function(k){
      if (k==='hint') return;
      var el = document.querySelector('[data-pillar-pct="'+k+'"]');
      if (el) el.textContent = mix[k] + '%';
    });
    var hint = document.getElementById('w6IndustryHint');
    if (hint) hint.textContent = mix.hint;
  }
  window.w6UpdatePillars = w6UpdatePillars;

  /* ──────── 2. 15 Frameworks Data ──────── */
  var FRAMEWORKS = [
    { id:1,  name:'AIDA', sub:'Attention · Interest · Desire · Action', def:'إطار كلاسيكي من 1898 — جذب الانتباه ثم بناء الاهتمام، تحويله لرغبة، ثم دفعة للفعل.', ex:'هل تخسر 4 ساعات يومياً في reports؟ (A) — معظم المحاسبين كذلك (I) — هذا قالب Excel يختصرها لـ 30 دقيقة (D) — حمّله مجاناً من البايو (A).', when:'منشورات تعليمية + B2B + LinkedIn', fail:'لا يصلح للـ Reels القصيرة — يحتاج مساحة أكبر من 7 ثوان.', color:'#06B6D4' },
    { id:2,  name:'PAS',  sub:'Problem · Agitate · Solution', def:'حدّد مشكلة محددة، ثم ضخّم ألمها، ثم قدّم الحل.', ex:'تابع ما يكتب — لكن ما يبيع. ولا حملة ترفع المبيعات. شهر بعد شهر، نفس الأرقام. الحل: 5 مكونات في كل caption — لا تتجاوز كلمة "نحن".', when:'بيع منتج/خدمة + Direct response', fail:'إذا بالغت في "Agitate" يبدو مزعجاً ويفقد الثقة.', color:'#EF4444' },
    { id:3,  name:'4Ps', sub:'Promise · Picture · Proof · Push', def:'وعد كبير → تخيّل النتيجة → دليل/إثبات → دعوة فعل.', ex:'ضاعِف متابعينك في 60 يوماً (Promise). تخيّل 10 آلاف يقرأون كل منشور (Picture). 47 عميل سبقك حقق هذا (Proof). سجل في الورشة الأحد (Push).', when:'بيع كورس / خدمة عالية القيمة', fail:'لو الـ Proof ضعيف أو مفبرك، تنهار الثقة سريعاً.', color:'#F59E0B' },
    { id:4,  name:'Open Loop', sub:'الفجوة المعرفية', def:'افتح سؤالاً قوياً واترك إجابته للنهاية — يجبر الدماغ على المتابعة.', ex:'في 2021 خسرت 12 ألف دولار بسبب خطأ واحد… سأخبركم بنهاية المنشور ✨ (ثم 3 نصائح ثم الخطأ).', when:'Reels + LinkedIn stories + threads', fail:'لو الإجابة مخيبة بعد كل هذا التشويق، تخسر المتابع للأبد.', color:'#8B5CF6' },
    { id:5,  name:'Listicle Hook', sub:'3 طرق لـ X', def:'القوائم تُنظّم المعرفة + تُسهّل الحفظ + تُعطي توقع واضح.', ex:'7 أخطاء قاتلة يرتكبها المسوّق المبتدئ (الخامس يصدمك).', when:'Carousels + threads + Shorts تعليمية', fail:'لو القائمة سطحية وكلها معروفة = unfollow.', color:'#22C55E' },
    { id:6,  name:'Contrarian', sub:'الرأي الجريء ضد التيار', def:'اضرب رأياً سائداً — يولد نقاش = comments = reach.', ex:'"التسويق بالمحتوى مات" — قلت هذا قبل سنتين والآن أتراجع. هذا ما تغيّر…', when:'X + LinkedIn + خبراء معروفون', fail:'لو رأيك ضد التيار بدون دليل = troll. ولو متطرف = blocks.', color:'#EC4899' },
    { id:7,  name:'Vulnerability', sub:'الاعتراف الصادق', def:'اعترف بضعف/فشل/خوف — يبني تعاطف وثقة عميقة.', ex:'في أول كلاينت لي، طلبت 200$. خاف، تردد، وغادر. علمتني هذه اللحظة 3 دروس…', when:'Personal brand + Founders + LinkedIn', fail:'لو يبدو "performative" أو مُفتعل لجذب التعاطف.', color:'#F97316' },
    { id:8,  name:'Stat Shock', sub:'إحصاء صادم', def:'ابدأ برقم لا يُصدّق + مصدر موثوق = جذب فوري.', ex:'87% من Reels يتركها الناس قبل 3 ثوان (TikTok 2023). إليك ما يفعل الـ 13% المتبقون…', when:'Educational posts + B2B + reports', fail:'إذا الإحصاء قديم/غير موثوق → ينقلب ضدك.', color:'#0EA5E9' },
    { id:9,  name:'POV', sub:'وجهة نظر داخلية', def:'"POV: أنت X" — يضع المتابع داخل القصة بشكل سينمائي.', ex:'POV: أنت مدير حساب جديد، الكلاينت يطلب 5 deliverables بنفس اليوم. هذا ما تفعله…', when:'TikTok + Reels + قصص قصيرة', fail:'تكراره يومياً يفقد التأثير ويصبح memes فقط.', color:'#A855F7' },
    { id:10, name:'Mistake Confession', sub:'اعتراف بخطأ مهني', def:'"كنت أفعل X لـ 3 سنوات حتى اكتشفت Y" — يستغل Negativity Bias.', ex:'كنت أنشر 3 مرات يومياً ظناً أن "أكثر = أفضل". خسرت 30% من متابعيّ. هذا ما تعلمته…', when:'Authority building + tutorials', fail:'لو الخطأ تافه أو مصطنع، يُكشف.', color:'#DC2626' },
    { id:11, name:'Before/After', sub:'التحوّل', def:'حالة قبل + حالة بعد + الجسر بينهما = أقوى format لمحتوى الـ transformation.', ex:'حسابي: قبل 6 أشهر — 800 متابع، 2% engagement. بعد — 24K متابع، 11% engagement. التغيير في 4 خطوات…', when:'تجارة, تجميل, تعليم, لياقة', fail:'بدون "الجسر" (الخطوات الفعلية) = clickbait فارغ.', color:'#10B981' },
    { id:12, name:'Question Hook', sub:'السؤال المفتوح', def:'سؤال مباشر يستحضر تجربة المتابع الشخصية.', ex:'متى آخر مرة فتحت Instagram وأغلقته بعد دقيقة شعورياً بالفراغ؟', when:'Carousels تعليمية + community building', fail:'سؤال generic مثل "هل تعرف؟" = صفر engagement.', color:'#3B82F6' },
    { id:13, name:'Comparison', sub:'X vs Y', def:'مقارنة مباشرة بين خيارين/أداتين/منهجين = clarity + قيمة فورية.', ex:'Meta Ads vs TikTok Ads في 2025: لمن، بأي ميزانية، ومتى لكل منصة. (carousel 8 شرائح)', when:'B2B + reviews + buying guides', fail:'لو غير عادل/مدفوع، يخسر المصداقية.', color:'#14B8A6' },
    { id:14, name:'Cliffhanger', sub:'النهاية المعلّقة', def:'انهِ المنشور بسؤال/تشويق يدفع للجزء التالي.', ex:'…وفي الجزء الـ 2 نتكلم عن الخطأ الأكبر الذي يُدمّر 90% من الحملات. تابعوا.', when:'Threads + series + reels جزء 1 و 2', fail:'لا تكرّره لو لم تُكمل الجزء التالي خلال 48h = خسارة ثقة.', color:'#FBBF24' },
    { id:15, name:'Call-out', sub:'التوجيه المباشر', def:'استهدف فئة محددة من المتابعين بنداء واضح.', ex:'إلى كل freelancer يرفض رفع أسعاره خوفاً من خسارة العملاء — اقرأ هذا حتى النهاية.', when:'Niche audiences + segmentation + community', fail:'لو الـ niche واسع جداً = الكلام الفارغ.', color:'#F472B6' }
  ];

  function renderFrameworks(){
    var grid = document.getElementById('w6FwGrid');
    if (!grid || grid.dataset.w6Init === '1') return;
    grid.dataset.w6Init = '1';
    var html = '';
    FRAMEWORKS.forEach(function(f){
      html += ''+
      '<div class="ql-glass w6-fw-card" style="padding:14px 16px; border-radius:12px; border-color:'+f.color+'40;">'+
        '<div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">'+
          '<div style="width:30px;height:30px;border-radius:8px;background:'+f.color+'18;color:'+f.color+';display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;">'+f.id+'</div>'+
          '<div>'+
            '<div style="font-size:13px; font-weight:800; color:var(--text);">'+f.name+'</div>'+
            '<div style="font-size:10.5px; color:var(--text-faint);">'+f.sub+'</div>'+
          '</div>'+
        '</div>'+
        '<div style="font-size:12px; color:var(--text-muted); line-height:1.65; margin-bottom:8px;">'+f.def+'</div>'+
        '<div style="background:'+f.color+'08; border-right:3px solid '+f.color+'; padding:9px 11px; border-radius:6px; font-size:11.5px; color:var(--text); line-height:1.7; margin-bottom:8px;">'+
          '<b style="color:'+f.color+'; font-size:10px; letter-spacing:0.8px;">مثال عربي:</b><br>'+f.ex+
        '</div>'+
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:10.5px;">'+
          '<div style="background:rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.18); border-radius:6px; padding:7px 9px; color:#22C55E;"><b>✅ يصلح:</b> '+f.when+'</div>'+
          '<div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.18); border-radius:6px; padding:7px 9px; color:#EF4444;"><b>❌ يفشل:</b> '+f.fail+'</div>'+
        '</div>'+
      '</div>';
    });
    grid.innerHTML = html;
  }

  /* ──────── 3. Calendar Builder ──────── */
  var PILL_INFO = {
    edu:  { label:'🎓 تعليمي', color:'#66FCF1', bg:'rgba(102,252,241,0.18)', border:'rgba(102,252,241,0.45)' },
    ent:  { label:'😄 ترفيهي', color:'#F59E0B', bg:'rgba(245,158,11,0.18)',  border:'rgba(245,158,11,0.45)' },
    ins:  { label:'💡 ملهم',  color:'#8B5CF6', bg:'rgba(139,92,246,0.18)',  border:'rgba(139,92,246,0.45)' },
    prom: { label:'💰 ترويجي', color:'#22C55E', bg:'rgba(34,197,94,0.18)',   border:'rgba(34,197,94,0.45)' },
    bts:  { label:'🎬 كواليس', color:'#EC4899', bg:'rgba(236,72,153,0.18)',  border:'rgba(236,72,153,0.45)' }
  };

  var STORAGE_KEY = 'upg_calendar_drafts';

  function loadCal(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Array(30).fill('');
      var arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length === 30) return arr;
    } catch(e){}
    return Array(30).fill('');
  }
  function saveCal(arr){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch(e){}
  }

  function dayCellHtml(idx, val){
    var info = PILL_INFO[val];
    var bg     = info ? info.bg     : 'rgba(255,255,255,0.02)';
    var border = info ? info.border : 'var(--border)';
    var color  = info ? info.color  : 'var(--text-faint)';
    var label  = info ? info.label  : '<span style="opacity:0.5;">+</span>';
    return ''+
      '<div class="w6-cal-day" data-day="'+idx+'" '+
           'style="min-height:62px; background:'+bg+'; border:1px solid '+border+'; border-radius:8px; padding:6px 8px; cursor:pointer; '+
                  'display:flex; flex-direction:column; justify-content:space-between; transition:transform .15s ease;">'+
        '<div style="font-size:10px; font-weight:800; color:var(--text-faint);">يوم '+(idx+1)+'</div>'+
        '<div style="font-size:11.5px; font-weight:700; color:'+color+';">'+label+'</div>'+
      '</div>';
  }

  function renderCalendar(){
    var grid = document.getElementById('w6CalGrid');
    if (!grid) return;
    var data = loadCal();
    var html = '';
    for (var i=0; i<30; i++) html += dayCellHtml(i, data[i]);
    grid.innerHTML = html;
    // attach listeners
    var cells = grid.querySelectorAll('.w6-cal-day');
    cells.forEach(function(c){
      c.addEventListener('dragover', function(e){ e.preventDefault(); c.style.transform='scale(1.05)'; });
      c.addEventListener('dragleave', function(){ c.style.transform='scale(1)'; });
      c.addEventListener('drop', function(e){
        e.preventDefault();
        c.style.transform='scale(1)';
        var pill = e.dataTransfer.getData('w6/pill');
        if (!pill) return;
        var idx = parseInt(c.dataset.day, 10);
        var arr = loadCal();
        arr[idx] = (pill === 'clear') ? '' : pill;
        saveCal(arr);
        renderCalendar();
        renderStats();
      });
      // click cycles through pillars (mobile-friendly fallback)
      c.addEventListener('click', function(){
        var idx = parseInt(c.dataset.day, 10);
        var arr = loadCal();
        var order = ['', 'edu', 'ent', 'ins', 'prom', 'bts'];
        var cur = order.indexOf(arr[idx] || '');
        arr[idx] = order[(cur+1) % order.length];
        saveCal(arr);
        renderCalendar();
        renderStats();
      });
    });
    renderStats();
  }

  function renderStats(){
    var statsEl = document.getElementById('w6CalStats');
    if (!statsEl) return;
    var arr = loadCal();
    var counts = {edu:0, ent:0, ins:0, prom:0, bts:0, empty:0};
    arr.forEach(function(v){ if (v) counts[v]++; else counts.empty++; });
    var filled = 30 - counts.empty;
    var line = function(k){
      var c = counts[k];
      var pct = filled ? Math.round(c/filled*100) : 0;
      return '<div><b style="color:'+PILL_INFO[k].color+';">'+PILL_INFO[k].label+'</b> · '+c+' ('+pct+'%)</div>';
    };
    statsEl.innerHTML =
      line('edu')+line('ent')+line('ins')+line('prom')+line('bts')+
      '<div style="margin-top:6px; font-size:10.5px; color:var(--text-faint);">📋 مملوء: '+filled+'/30</div>';
  }

  function setupPillsDrag(){
    var pills = document.querySelectorAll('#page-social .w6-cal-pill');
    pills.forEach(function(p){
      if (p.dataset.w6Drag === '1') return;
      p.dataset.w6Drag = '1';
      p.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('w6/pill', p.dataset.pill);
        e.dataTransfer.effectAllowed = 'copy';
        p.style.opacity = '0.6';
      });
      p.addEventListener('dragend', function(){ p.style.opacity = '1'; });
    });
  }

  window.w6CalAuto = function(){
    var pillars = ['edu','ent','ins','prom','bts'];
    // weighted distribution: 12 edu, 8 ent, 5 ins, 4 prom, 1 bts
    var pool = [].concat(
      Array(12).fill('edu'),
      Array(8).fill('ent'),
      Array(5).fill('ins'),
      Array(4).fill('prom'),
      Array(1).fill('bts')
    );
    // shuffle
    for (var i=pool.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp=pool[i]; pool[i]=pool[j]; pool[j]=tmp;
    }
    saveCal(pool);
    renderCalendar();
  };

  window.w6CalReset = function(){
    if (!confirm('هل أنت متأكد من تصفير الجدول؟')) return;
    saveCal(Array(30).fill(''));
    renderCalendar();
  };

  window.w6CalExport = function(){
    var arr = loadCal();
    var data = {
      generated_at: new Date().toISOString(),
      total_days: 30,
      schedule: arr.map(function(v, i){
        return { day: i+1, pillar: v || null, label: v ? PILL_INFO[v].label : null };
      })
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'content-calendar-'+Date.now()+'.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function init(){
    if (!document.getElementById('w6FwGrid')) return;
    renderFrameworks();
    setupPillsDrag();
    renderCalendar();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="social"]');
    if (t) setTimeout(init, 60);
  });
})();
