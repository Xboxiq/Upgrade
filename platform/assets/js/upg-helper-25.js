/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-25.js
   Extracted from app.js lines 8132-8349
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var DATA = {
    ig: {
      name:'Instagram', emoji:'📸', color:'#E4405F',
      summary:'محرّك Meta يعتمد على "الإشارات الاجتماعية" — كم شخصاً أرسل المنشور لصديق، حفظه، أو شاهده مرتين.',
      signals:[
        ['Send to friend',   '× 4.0'],
        ['Save',             '× 3.5'],
        ['Comment > 4 words','× 2.8'],
        ['Watch time (Reels)', '× 2.5'],
        ['Like',             '× 1.0'],
      ],
      penalties:[
        ['Watermark TikTok',         '−40% reach'],
        ['Reposted content',         '−25% reach'],
        ['Hashtags > 10 (spammy)',   '−15% reach'],
        ['اختفاء فجأة + رجوع (gap)', '−20% trust'],
      ],
      ideal:[
        ['Reels',         '7-15 ثانية, hook في الإطار 1'],
        ['Carousel',      '8-10 شرائح, سؤال في الشريحة 1'],
        ['Caption',       '125 حرف قبل "more", value في السطر 2'],
        ['Cover',         'وجه واضح + نص ضخم 4-7 كلمات'],
      ]
    },
    tt: {
      name:'TikTok', emoji:'🎵', color:'#FE2C55',
      summary:'Watch-time و completion-rate هما المَلِكان. الـ For You Page تختبر كل فيديو على 200-500 شخص أولاً.',
      signals:[
        ['Completion rate %',  '× 5.0'],
        ['Re-watch / replay',  '× 4.0'],
        ['Share + save',       '× 3.0'],
        ['Comment',            '× 2.0'],
        ['Like',               '× 1.0'],
      ],
      penalties:[
        ['روابط في bio فقط (لا في caption)', 'محايد'],
        ['موسيقى محذوفة (copyright)',         '−60%'],
        ['watermark منصة أخرى',               '−35%'],
        ['Hook ضعيف → pass في &lt;1.5s',        'موت طبيعي'],
      ],
      ideal:[
        ['الطول',     '9-21 ثانية للـ viral, 30-60s للـ tutorial'],
        ['Hook',      'الذروة في الثانية الأولى, نص على الشاشة'],
        ['Caption',   '60-100 حرف + 3 hashtags هدفية'],
        ['Format',    'Vertical 9:16, مضاءة جيداً'],
      ]
    },
    x: {
      name:'X / Twitter', emoji:'𝕏', color:'#1DA1F2',
      summary:'Replies و dwell time أهم من Likes. خوارزمية Musk تُكافئ الـ controversy والـ thread الطويل.',
      signals:[
        ['Replies',         '× 3.5'],
        ['Dwell time',      '× 3.0'],
        ['Retweet + quote', '× 2.5'],
        ['Bookmarks',       '× 2.0'],
        ['Like',            '× 1.0'],
      ],
      penalties:[
        ['روابط خارجية فوراً',  '−40%'],
        ['Bot-like behaviour',   '−70% (shadow ban)'],
        ['Negative keywords',    '−30% (للمعلنين)'],
      ],
      ideal:[
        ['Tweet مفرد',  '&lt; 12 كلمة, hot take أو سؤال صادم'],
        ['Thread',      '5-9 tweets, التمهيد بـ "كنت أعتقد X لكن..."'],
        ['الصورة',      'Meme, مخطط واضح, أو لقطة شاشة'],
        ['الزمن',       'Reply بعد 5-15 دقيقة من النشر'],
      ]
    },
    li: {
      name:'LinkedIn', emoji:'💼', color:'#0A91CC',
      summary:'Algorithm 2024 يُعطي وزناً ضخماً للـ comments والـ dwell time. القصص الشخصية تتفوق على المحتوى الترويجي.',
      signals:[
        ['Comments + replies', '× 4.0'],
        ['Dwell time',         '× 3.5'],
        ['Saves',              '× 3.0'],
        ['Shares',             '× 2.0'],
        ['Reactions',          '× 1.0'],
      ],
      penalties:[
        ['روابط في النص الأصلي',  '−50% (انقلها للتعليق الأول)'],
        ['Hashtags > 5',          '−10%'],
        ['نشر متكرر < 18h',       '−15% للمنشور التالي'],
      ],
      ideal:[
        ['الطول',    '1200-1500 حرف · سطور قصيرة'],
        ['Hook',     'سطر شخصي في البداية: "في 2019 خسرت..."'],
        ['Format',   'سطر فراغ بين كل جملتين = mobile-readable'],
        ['CTA',      'سؤال مفتوح في النهاية = comments'],
      ]
    },
    yt: {
      name:'YouTube', emoji:'▶️', color:'#FF0000',
      summary:'CTR (thumbnail) + AVD (Average View Duration) + session time. الـ algorithm يكره من يأخذ المشاهد ويتركه.',
      signals:[
        ['CTR thumbnail',       '× 5.0'],
        ['AVD %',               '× 4.5'],
        ['Session time',        '× 3.5'],
        ['Comments',            '× 2.5'],
        ['Likes / Dislikes',    '× 1.5'],
      ],
      penalties:[
        ['Clickbait مخالف للمحتوى',  '−40% + dislikes'],
        ['Reused content',           '−demonetization'],
        ['Tag stuffing',             'محايد لكن غير مفيد'],
      ],
      ideal:[
        ['Long-form',  '8-15 دقيقة, intro 30s قوية'],
        ['Shorts',     '&lt; 60 ثانية, hook في 2s'],
        ['Thumbnail',  '3 عناصر بصرية كحد أقصى, نص &lt; 6 كلمات'],
        ['Title',      'سؤال أو رقم: "لماذا..." / "5 طرق..."'],
      ]
    },
    sc: {
      name:'Snapchat', emoji:'👻', color:'#FFFC00',
      summary:'Replies و screenshots و completion rate. جمهور Gen-Z أقل من 25 سنة في الخليج.',
      signals:[
        ['Replies + DMs',    '× 4.0'],
        ['Screenshots',      '× 3.5'],
        ['Completion %',     '× 3.0'],
        ['Story re-views',   '× 2.0'],
      ],
      penalties:[
        ['Static images بلا حركة',     '−reach'],
        ['Story طويلة بدون تنويع',     'drop-off عالي'],
      ],
      ideal:[
        ['Snap واحدة',  '5-10 ثوان, متحركة, نص ديناميكي'],
        ['Story',       '5-8 snaps, متنوعة (نص+فيديو+تصويت)'],
        ['الوقت',       '8-11 PM للـ Gen-Z في الخليج'],
        ['Filter/AR',   'تجريبي = رفع الـ engagement +60%'],
      ]
    },
    th: {
      name:'Threads', emoji:'🧵', color:'#666666',
      summary:'Threads (Meta) — algorithm جديد لكن يُكافئ الـ replies بشدة + يدفع المحتوى الـ conversational.',
      signals:[
        ['Replies',     '× 4.0'],
        ['Reposts',     '× 3.0'],
        ['Likes',       '× 1.5'],
      ],
      penalties:[
        ['روابط خارجية',     '−25%'],
        ['Cross-post من IG',  'محايد لكن لا boost'],
      ],
      ideal:[
        ['Post',        '100-300 حرف conversational'],
        ['أسلوب',       'سؤال صريح أو رأي قابل للنقاش'],
        ['Frequency',   '2-5 posts/day مقبول (لا spam)'],
        ['Format',      'صور أحياناً, لا فيديوهات طويلة'],
      ]
    }
  };

  function row(label, value, bad){
    var cls = bad ? 'w6-pp-row bad' : 'w6-pp-row';
    return '<div class="'+cls+'"><span>'+label+'</span><b>'+value+'</b></div>';
  }

  function card(title, rows, bad){
    var html = '<div class="w6-pp-card"><h4>'+title+'</h4>';
    for (var i=0; i<rows.length; i++){
      html += row(rows[i][0], rows[i][1], bad);
    }
    html += '</div>';
    return html;
  }

  function renderPlatform(key){
    var d = DATA[key]; if (!d) return;
    var panel = document.getElementById('w6PlatformPanel');
    if (!panel) return;
    var head = ''+
      '<div class="ql-glass" style="padding:16px 18px; border-radius:12px; margin-bottom:14px; border-color:'+d.color+'40; background:'+d.color+'08;">'+
        '<div style="display:flex; align-items:center; gap:12px; margin-bottom:6px;">'+
          '<span style="font-size:24px;">'+d.emoji+'</span>'+
          '<h3 style="margin:0; font-size:16px; font-weight:800; color:var(--text);">'+d.name+'</h3>'+
        '</div>'+
        '<div style="font-size:12.5px; color:var(--text-muted); line-height:1.7;">'+d.summary+'</div>'+
      '</div>';
    var body = '<div class="w6-pp-grid">'+
      card('🚀 إشارات الترتيب', d.signals, false)+
      card('⚠️ العقوبات', d.penalties, true)+
      card('🎯 المحتوى المثالي', d.ideal, false)+
    '</div>';
    panel.innerHTML = head + body;
  }

  // Expose globally for inline onclick
  window.w6SelectPlatform = function(key, btn){
    try {
      var tabs = document.querySelectorAll('#w6PlatformTabs .w6-pbtn');
      for (var i=0; i<tabs.length; i++) tabs[i].classList.remove('active');
      if (btn) btn.classList.add('active');
      renderPlatform(key);
    } catch(e){ console.warn('w6SelectPlatform', e); }
  };

  // Init when page-social ever rendered
  function init(){
    var panel = document.getElementById('w6PlatformPanel');
    if (panel && !panel.dataset.w6Init){
      panel.dataset.w6Init = '1';
      renderPlatform('ig');
    }
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
  // Also re-init on navigation (page may not be in DOM at first load timing)
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="social"]');
    if (t) setTimeout(init, 50);
  });
})();
