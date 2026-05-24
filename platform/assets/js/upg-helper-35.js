/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-35.js
   Extracted from app.js lines 10754-11184
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var STORAGE = 'upg_psych_results';

  function load(){ try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); } catch(e){ return {}; } }
  function save(o){ try { localStorage.setItem(STORAGE, JSON.stringify(o)); } catch(e){} }

  // ── Big Five (BFI-2-S inspired, shortened to 20 items, 5 traits × 4) ──
  var BFI = {
    id: 'bfi', label: 'Big Five (OCEAN — 20 سؤال)',
    intro: 'Soto &amp; John (BFI-2). الأبعاد: Openness · Conscientiousness · Extraversion · Agreeableness · Neuroticism.',
    likert: ['أعارض بشدة','أعارض','محايد','أوافق','أوافق بشدة'],
    items: [
      {t:'O', q:'أحبّ التفكير في الأفكار النظرية والمجرّدة', r:false},
      {t:'O', q:'أرى الجمال في الفن والشعر', r:false},
      {t:'O', q:'أبحث عن تجارب جديدة بانتظام', r:false},
      {t:'O', q:'أُفضّل المألوف على المغامرة', r:true},
      {t:'C', q:'أُتمّ ما أبدأه دون تأجيل', r:false},
      {t:'C', q:'أحافظ على ترتيب أغراضي وملفاتي', r:false},
      {t:'C', q:'أُخطّط بدقة قبل التنفيذ', r:false},
      {t:'C', q:'أتأخر عن المواعيد كثيراً', r:true},
      {t:'E', q:'أبادر بالحديث في الاجتماعات', r:false},
      {t:'E', q:'أستمد طاقتي من التواجد مع الناس', r:false},
      {t:'E', q:'أبقى صامتاً في المجموعات الكبيرة', r:true},
      {t:'E', q:'أُحب أن أكون مركز الانتباه أحياناً', r:false},
      {t:'A', q:'أُسامح بسرعة', r:false},
      {t:'A', q:'أهتم برفاه الآخرين قبل نفسي أحياناً', r:false},
      {t:'A', q:'أنتقد الآخرين كثيراً', r:true},
      {t:'A', q:'أتعاطف مع مشاعر زملائي', r:false},
      {t:'N', q:'أقلق بشأن أشياء كثيرة', r:false},
      {t:'N', q:'أنفعل بسرعة عند الضغط', r:false},
      {t:'N', q:'أشعر بالأمان والهدوء عموماً', r:true},
      {t:'N', q:'تنتابني تقلبات مزاجية مفاجئة', r:false}
    ],
    score: function(answers){
      var s = {O:0,C:0,E:0,A:0,N:0}, n = {O:0,C:0,E:0,A:0,N:0};
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        var val = it.r ? (6 - v) : v; // reverse if needed (1..5)
        s[it.t] += val; n[it.t] += 1;
      });
      var labels = {O:'الانفتاح',C:'الضمير',E:'الانبساط',A:'القبول',N:'العصابية'};
      return {
        bars: Object.keys(s).map(function(k){
          var pct = n[k] ? Math.round((s[k] / (n[k]*5))*100) : 0;
          return { key: labels[k], pct: pct };
        }),
        recos: function(){
          var pcts = {}; Object.keys(s).forEach(function(k){ pcts[k] = n[k]?Math.round((s[k]/(n[k]*5))*100):0; });
          var top = Object.keys(pcts).sort(function(a,b){return pcts[b]-pcts[a];})[0];
          var map = {
            O:'انفتاحك العالي يلائم أدواراً إبداعية واستكشافية (تسويق، تصميم، استراتيجية).',
            C:'ضميرك العالي يلائم أدواراً تحتاج دقة (محاسبة، QA، إدارة مشاريع).',
            E:'انبساطك العالي يلائم أدوار العملاء (مبيعات، أكونت منجر، ريادة).',
            A:'قبولك العالي يلائم أدوار الفريق والوساطة (HR، خدمة عملاء، تيسير).',
            N:'عصابيتك العالية مؤشّر للحاجة لتقنيات تنظيم (Box Breathing, Reappraisal).'
          };
          return '<b>أعلى بُعد:</b> ' + labels[top] + ' (' + pcts[top] + '%) — ' + map[top];
        }()
      };
    }
  };

  // ── DISC (12 forced-choice items, MOST/LEAST style simplified to MOST only) ──
  var DISC = {
    id: 'disc', label: 'DISC Behavioral (12 سؤال)',
    intro: 'Marston (1928). الأبعاد: <b>D</b>ominance · <b>I</b>nfluence · <b>S</b>teadiness · <b>C</b>onscientiousness.',
    forced: true,
    items: [
      [['D','أتولّى القيادة بسرعة'],['I','أُحرّك الناس بحماستي'],['S','أُحافظ على الاستقرار'],['C','أُحلّل قبل القرار']],
      [['D','أحب المنافسة'],['I','أحب التعارف'],['S','أحب الروتين'],['C','أحب الدقة']],
      [['D','مباشر وصريح'],['I','اجتماعي ومرح'],['S','صبور ومستمع'],['C','منهجي ودقيق']],
      [['D','أتحمّل المخاطر'],['I','أُلهم'],['S','أدعم'],['C','أُحقّق']],
      [['D','أطلب نتائج'],['I','أطلب تأثيراً'],['S','أطلب وفاقاً'],['C','أطلب صحّة']],
      [['D','نفاد صبر مع البطء'],['I','أتشتّت بالتفاصيل'],['S','أكره التغيير المفاجئ'],['C','أُفرط في التحليل']],
      [['D','أسرع لاتخاذ القرار'],['I','أتأقلم بسرعة'],['S','أبني علاقات طويلة'],['C','أطلب البيانات']],
      [['D','مُحرِّك المهام'],['I','مُحرِّك الناس'],['S','مُحافظ على السلام'],['C','حارس الجودة']],
      [['D','أُفضّل الاستقلالية'],['I','أُفضّل العمل الجماعي'],['S','أُفضّل بيئة هادئة'],['C','أُفضّل القواعد الواضحة']],
      [['D','أتحدّى الوضع القائم'],['I','أتحدّث بصوت عالٍ'],['S','أتجنّب الصراع'],['C','أتحقّق من الحقائق']],
      [['D','جريء في القرارات'],['I','مقنع في الكلام'],['S','ودود في التواصل'],['C','حذِر في الالتزامات']],
      [['D','أحبّ التحدي'],['I','أحبّ التشجيع'],['S','أحبّ التقدير الهادئ'],['C','أحبّ الصواب']]
    ],
    score: function(answers){
      var s = {D:0,I:0,S:0,C:0};
      answers.forEach(function(v){ if (v) s[v] += 1; });
      var total = s.D+s.I+s.S+s.C || 1;
      var labels = {D:'D · المسيطر',I:'I · المُعبِّر',S:'S · المستقر',C:'C · الدقيق'};
      var bars = Object.keys(s).map(function(k){
        return { key: labels[k], pct: Math.round((s[k]/total)*100) };
      });
      var top = Object.keys(s).sort(function(a,b){return s[b]-s[a];})[0];
      var tips = {
        D:'تواصل: مباشر، نتائج، ملخص أولاً. تجنّب: المقدمات الطويلة.',
        I:'تواصل: حماسي، قصصي، علاقات. تجنّب: تجاهل العاطفة.',
        S:'تواصل: هادئ، تدريجي، آمن. تجنّب: الضغط المفاجئ.',
        C:'تواصل: بيانات، تفاصيل، أدلة. تجنّب: العاطفة بدون أرقام.'
      };
      return { bars: bars, recos: '<b>نمطك السائد:</b> ' + labels[top] + '. ' + tips[top] };
    }
  };

  // ── EQ Quotient (16 items, 4 axes) ──
  var EQ = {
    id: 'eq', label: 'EQ Quotient (16 سؤال)',
    intro: 'مستوحى من Bar-On EQ-i. المحاور: Self-awareness · Self-management · Social-awareness · Relationships.',
    likert: ['نادراً','أحياناً','بانتظام','غالباً','دائماً'],
    items: [
      {t:'SA', q:'أُلاحظ مشاعري لحظياً وأُسمّيها بدقة'},
      {t:'SA', q:'أعرف ما يستفزّني قبل أن ينفجر'},
      {t:'SA', q:'أُدرك تأثير مزاجي على الآخرين'},
      {t:'SA', q:'أعترف بأخطائي بصدق'},
      {t:'SM', q:'أتنفّس قبل الردّ على ما يستفزّني'},
      {t:'SM', q:'أُدير غضبي دون كبت أو انفجار'},
      {t:'SM', q:'أبقى مُنتجاً تحت الضغط'},
      {t:'SM', q:'أُغيّر تفسيري للموقف لأُحسّن مزاجي'},
      {t:'SOA', q:'أقرأ مشاعر الآخرين من تعابيرهم'},
      {t:'SOA', q:'أُلاحظ ديناميكية المجموعة وغير المعلَن'},
      {t:'SOA', q:'أتعاطف مع وجهة نظر مَن أختلف معه'},
      {t:'SOA', q:'أنتبه لتغيّر نبرة الزملاء وأسأل عنها'},
      {t:'REL', q:'أبني ثقة بسرعة مع الجدد'},
      {t:'REL', q:'أُحلّ الصراعات دون كسر العلاقة'},
      {t:'REL', q:'أُلهم الآخرين دون أوامر'},
      {t:'REL', q:'أُعطي ملاحظات صعبة بطريقة محترمة'}
    ],
    score: function(answers){
      var s = {SA:0,SM:0,SOA:0,REL:0}, n = {SA:0,SM:0,SOA:0,REL:0};
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        s[it.t] += v; n[it.t] += 1;
      });
      var labels = {SA:'الوعي الذاتي', SM:'إدارة الذات', SOA:'الوعي الاجتماعي', REL:'إدارة العلاقات'};
      var bars = Object.keys(s).map(function(k){
        var pct = n[k] ? Math.round((s[k]/(n[k]*5))*100) : 0;
        return { key: labels[k], pct: pct };
      });
      var weakest = bars.slice().sort(function(a,b){return a.pct-b.pct;})[0];
      return { bars: bars, recos: '<b>منطقة النموّ:</b> ' + weakest.key + ' (' + weakest.pct + '%). جرّب تمارين STOP و RULER في صفحة EQ.' };
    }
  };

  // ── Career Anchors (Schein, 16 items, 8 anchors) ──
  var ANCHORS = {
    id: 'anch', label: 'Career Anchors (16 سؤال)',
    intro: 'Edgar Schein (1990). ٨ مرابط: تقني/إداري/استقلال/أمان/ريادة/خدمة/تحدٍّ/أسلوب حياة.',
    likert: ['غير مهم','قليل الأهمية','محايد','مهم','حاسم'],
    items: [
      {t:'TF', q:'أن أكون مرجعاً تقنياً في تخصصي'},
      {t:'TF', q:'حلّ مشاكل تقنية يستمتع بها قليلون'},
      {t:'GM', q:'قيادة فريق كبير وتنسيق جهود متعددة'},
      {t:'GM', q:'الترقي إلى منصب إداري عالٍ'},
      {t:'AU', q:'أن أعمل بحريّة دون رقابة لصيقة'},
      {t:'AU', q:'أن أُحدّد أوقات عملي وطرائقي'},
      {t:'SE', q:'أمان وظيفي طويل مع راتب ثابت'},
      {t:'SE', q:'بيئة عمل مستقرة وقابلة للتنبؤ'},
      {t:'EN', q:'بناء شيء من الصفر يحمل اسمي'},
      {t:'EN', q:'تحمّل مخاطرة عالية لعائد كبير'},
      {t:'SV', q:'إحداث أثر إيجابي في المجتمع'},
      {t:'SV', q:'قِيَم العمل تُعنيني أكثر من الراتب'},
      {t:'CH', q:'مواجهة تحديات صعبة باستمرار'},
      {t:'CH', q:'الفوز على منافسين أقوياء'},
      {t:'LS', q:'توازن واضح بين العمل والحياة'},
      {t:'LS', q:'مرونة لخدمة عائلتي وصحتي'}
    ],
    score: function(answers){
      var labels = {
        TF:'تقني/وظيفي', GM:'إداري', AU:'استقلالية', SE:'أمان',
        EN:'ريادة', SV:'خدمة', CH:'تحدٍّ', LS:'أسلوب حياة'
      };
      var s = {}; Object.keys(labels).forEach(function(k){ s[k]=0; });
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        s[it.t] += v;
      });
      var arr = Object.keys(s).map(function(k){
        return { key: labels[k], pct: Math.round((s[k]/(2*5))*100), code:k };
      }).sort(function(a,b){return b.pct-a.pct;});
      var top2 = arr.slice(0,2).map(function(a){return a.key;}).join(' + ');
      var jobMap = {
        TF:'مهندس Senior · أخصائي تقني',
        GM:'مدير منتج · مدير عمليات',
        AU:'فريلانسر · استشاري',
        SE:'موظف حكومي · شركات كبرى مستقرة',
        EN:'مؤسس · شريك مؤسس',
        SV:'منظمة غير ربحية · تعليم · صحة',
        CH:'مبيعات صعبة · تقنية ناشئة',
        LS:'دور Hybrid · شركات Family-friendly'
      };
      var topCodes = arr.slice(0,2).map(function(a){return a.code;});
      return {
        bars: arr,
        recos: '<b>أعلى مرابطك:</b> ' + top2 + '. <br><b>وظائف ملائمة:</b> ' + topCodes.map(function(c){return jobMap[c];}).join(' / ')
      };
    }
  };

  // ── Stress Response Style (12 items, 4 patterns) ──
  var STRESS = {
    id: 'stress', label: 'Stress Style (12 سؤال)',
    intro: 'Cannon (1932) Fight/Flight + extensions. الأنماط: Fight · Flight · Freeze · Fawn.',
    likert: ['أبداً','نادراً','أحياناً','كثيراً','دائماً'],
    items: [
      {t:'FT', q:'تحت الضغط أُواجه وأرفع صوتي'},
      {t:'FT', q:'أتحدّى المسؤول إن شعرت بالظلم'},
      {t:'FT', q:'أحياناً أنفجر ثم أندم'},
      {t:'FL', q:'أتجنّب الصراعات بالانسحاب'},
      {t:'FL', q:'أُغلق هاتفي عند الضغط الشديد'},
      {t:'FL', q:'أبدأ بحثاً عن وظيفة أخرى عند أول مشكلة'},
      {t:'FZ', q:'أتجمّد ولا أعرف ماذا أفعل'},
      {t:'FZ', q:'أُؤجّل قرارات صعبة لفترات طويلة'},
      {t:'FZ', q:'أصمت تحت الضغط ولا أُعبّر'},
      {t:'FW', q:'أُوافق لأتجنّب إغضاب الآخرين'},
      {t:'FW', q:'أُهمل احتياجاتي لإرضاء فريقي'},
      {t:'FW', q:'أعتذر حتى لو لم أُخطئ'}
    ],
    score: function(answers){
      var s = {FT:0,FL:0,FZ:0,FW:0};
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        s[it.t] += v;
      });
      var labels = {FT:'Fight (مواجهة)', FL:'Flight (هروب)', FZ:'Freeze (تجمّد)', FW:'Fawn (إرضاء)'};
      var arr = Object.keys(s).map(function(k){
        return { key: labels[k], pct: Math.round((s[k]/(3*5))*100), code: k };
      }).sort(function(a,b){return b.pct-a.pct;});
      var top = arr[0].code;
      var coping = {
        FT:'تنفّس قبل الردّ. اسأل "هل هذا يستحق علاقة؟". اكتب قبل الإرسال.',
        FL:'لا تُغادر فوراً. حدد مهلة قبل القرار. ناقش مع شخص محايد.',
        FZ:'حرّك جسدك. اكتب الخيارات. اطلب وقتاً للرد لاحقاً.',
        FW:'تدرّب على "لا" بسيطة. ميّز بين الكرم والخوف.'
      };
      return { bars: arr, recos: '<b>نمطك السائد:</b> ' + labels[top] + '. <b>أداة coping:</b> ' + coping[top] };
    }
  };

  // ── Strengths Quick-Scan (12 items → top 3 of 12 themes) ──
  var STRENGTHS = {
    id: 'str', label: 'Strengths Quick-Scan (12 سؤال)',
    intro: 'مستوحى من Clifton/StrengthsFinder. كل سؤال يكشف نقطة قوة محتملة.',
    likert: ['لا تشبهني','قليلاً','محايد','كثيراً','تشبهني تماماً'],
    items: [
      {t:'ANALYZER',  q:'أُحلّل البيانات قبل أن أُقرّر'},
      {t:'ACHIEVER',  q:'أشعر بحاجة دائمة لإنهاء قائمة المهام'},
      {t:'STRATEGIC', q:'أرى أنماطاً وبدائل لا يراها الآخرون'},
      {t:'EMPATHY',   q:'أشعر بمشاعر الآخرين كأنها ملكي'},
      {t:'COMMUNICATOR', q:'أُحوّل الأفكار المعقدة إلى قصص مفهومة'},
      {t:'LEARNER',   q:'أستمتع باكتساب مهارات جديدة باستمرار'},
      {t:'POSITIVITY',q:'أُلهم الآخرين بحماستي وتفاؤلي'},
      {t:'RESPONSIBILITY', q:'أتحمّل ما أعد به حرفياً'},
      {t:'INCLUDER',  q:'أحرص على إشراك المُستبعَدين في فريقي'},
      {t:'COMMAND',   q:'أتولّى زمام المبادرة بسرعة'},
      {t:'HARMONY',   q:'أبحث عن نقاط الاتفاق وأُجنّب الصراع'},
      {t:'IDEATION',  q:'أُولّد أفكاراً جديدة باستمرار'}
    ],
    score: function(answers){
      var labels = {
        ANALYZER:'Analyzer · مُحلِّل',
        ACHIEVER:'Achiever · مُنجِز',
        STRATEGIC:'Strategic · استراتيجي',
        EMPATHY:'Empathy · مُتعاطف',
        COMMUNICATOR:'Communicator · مُتواصِل',
        LEARNER:'Learner · مُتعلِّم',
        POSITIVITY:'Positivity · إيجابي',
        RESPONSIBILITY:'Responsibility · مُلتزم',
        INCLUDER:'Includer · جامع',
        COMMAND:'Command · قائد',
        HARMONY:'Harmony · مُنسجم',
        IDEATION:'Ideation · مُبدع'
      };
      var s = {};
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        s[it.t] = v;
      });
      var arr = Object.keys(s).map(function(k){
        return { key: labels[k], pct: Math.round((s[k]/5)*100), code: k };
      }).sort(function(a,b){return b.pct-a.pct;});
      var top3 = arr.slice(0,3).map(function(a){return a.key;});
      return { bars: arr.slice(0,5), recos: '<b>أعلى ٣ نقاط قوة:</b> ' + top3.join(' · ') + '. <br><b>كيف تستخدمها:</b> اربط مهامك اليومية بنقطتك الأقوى.' };
    }
  };

  var TESTS = { bfi: BFI, disc: DISC, eq: EQ, anch: ANCHORS, stress: STRESS, str: STRENGTHS };

  function renderTest(t){
    var host = document.getElementById('w09tHost');
    if (!host) return;
    host.dataset.testActive = t.id;
    var likertHTML = function(idx){
      return '<div class="w09t-likert">' + t.likert.map(function(lab,j){
        return '<label><input type="radio" name="w09t_'+t.id+'_'+idx+'" value="'+(j+1)+'"> '+lab+'</label>';
      }).join('') + '</div>';
    };
    var fcHTML = function(opts, idx){
      return '<div class="w09t-fc">' + opts.map(function(o){
        return '<label class="w09t-fc-opt"><input type="radio" name="w09t_'+t.id+'_'+idx+'" value="'+o[0]+'"> '+o[1]+'</label>';
      }).join('') + '</div>';
    };
    var qHTML = (t.forced ? t.items : t.items).map(function(it, i){
      var qText = t.forced ? 'اختر الخيار الأقرب لك:' : it.q;
      var body = t.forced ? fcHTML(it, i) : likertHTML(i);
      return '<div class="w09t-q">'
        + '<div class="w09t-q-text"><small>'+(i+1)+'.</small>'+qText+'</div>'
        + body
        + '</div>';
    }).join('');

    host.innerHTML = ''
      + '<div class="w09t-intro">'
      +   '<h3>'+t.label+'</h3>'
      +   '<p>'+t.intro+'</p>'
      +   '<div class="w09t-meta"><span><b>عدد الأسئلة:</b>'+t.items.length+'</span><span><b>الزمن المتوقع:</b>~'+(Math.round(t.items.length*0.5))+' دقيقة</span></div>'
      + '</div>'
      + '<form id="w09tForm">'
      +   qHTML
      +   '<div class="w09t-progress"><div id="w09tBar"></div></div>'
      +   '<button type="submit" class="w09t-submit" id="w09tSubmit" disabled>احسب النتيجة</button>'
      + '</form>'
      + '<div id="w09tOut"></div>';

    var form = host.querySelector('#w09tForm');
    var bar  = host.querySelector('#w09tBar');
    var btn  = host.querySelector('#w09tSubmit');
    var out  = host.querySelector('#w09tOut');

    form.addEventListener('change', function(){
      var fd = new FormData(form);
      var n = 0;
      for (var k of fd.keys()){
        if (k.indexOf('w09t_'+t.id+'_') === 0){
          // count distinct names
        }
      }
      // proper counting:
      var answered = new Set();
      Array.from(fd.entries()).forEach(function(e){ answered.add(e[0]); });
      var total = t.items.length;
      var pct = Math.round((answered.size / total) * 100);
      bar.style.width = pct + '%';
      btn.disabled = answered.size < total;
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var fd = new FormData(form);
      var answers = [];
      for (var i=0;i<t.items.length;i++){
        var v = fd.get('w09t_'+t.id+'_'+i);
        answers[i] = v == null ? null : (t.forced ? v : parseInt(v,10));
      }
      var res = t.score(answers);
      var bars = res.bars.map(function(b){
        return '<div class="w09t-bar-row">'
          + '<label>'+b.key+'</label>'
          + '<div class="w09t-bar"><div style="width:'+Math.max(2,b.pct)+'%;"></div></div>'
          + '<b>'+b.pct+'%</b>'
          + '</div>';
      }).join('');
      out.innerHTML = ''
        + '<div class="w09t-result">'
        +   '<h4>📊 نتيجة '+t.label+'</h4>'
        +   '<div class="w09t-bars">'+bars+'</div>'
        +   '<div class="w09t-recos">'+res.recos+'</div>'
        + '</div>';

      var all = load();
      all[t.id] = { ts: Date.now(), label: t.label, bars: res.bars, recos: res.recos };
      save(all);
      out.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }

  function init(){
    var tabs = document.getElementById('w09tTabs');
    if (!tabs) return;
    if (tabs.dataset.w09Inited === '1') return;
    tabs.dataset.w09Inited = '1';

    renderTest(TESTS.bfi);

    tabs.addEventListener('click', function(e){
      var t = e.target.closest('.w09t-tab'); if (!t) return;
      tabs.querySelectorAll('.w09t-tab').forEach(function(x){ x.classList.remove('active'); });
      t.classList.add('active');
      var id = t.getAttribute('data-test');
      if (TESTS[id]) renderTest(TESTS[id]);
    });

    var resetBtn = document.getElementById('w09tReset');
    var exportBtn = document.getElementById('w09tExport');
    var sumBox = document.getElementById('w09tSummary');
    var sumBody = document.getElementById('w09tSummaryBody');

    resetBtn.addEventListener('click', function(){
      if (!confirm('مسح جميع نتائج الاختبارات النفسية محلياً؟')) return;
      try { localStorage.removeItem(STORAGE); } catch(e){}
      sumBox.hidden = true;
      alert('تم المسح.');
    });

    exportBtn.addEventListener('click', function(){
      var all = load();
      if (!Object.keys(all).length){ alert('لا توجد نتائج محفوظة بعد.'); return; }
      var lines = ['📋 ملخص نتائج Self-Diagnostic Suite — ' + new Date().toLocaleString('ar')];
      Object.keys(all).forEach(function(k){
        var r = all[k];
        lines.push('');
        lines.push('· ' + r.label);
        r.bars.forEach(function(b){ lines.push('  - ' + b.key + ': ' + b.pct + '%'); });
      });
      var txt = lines.join('\n');
      sumBody.textContent = txt;
      sumBox.hidden = false;
      try {
        navigator.clipboard.writeText(txt).then(function(){
          exportBtn.textContent = '✅ نُسخ للحافظة';
          setTimeout(function(){ exportBtn.textContent = '📋 نسخ ملخص النتائج'; }, 1600);
        });
      } catch(e){}
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="psych"]');
    if (t) setTimeout(init, 80);
  });
})();
