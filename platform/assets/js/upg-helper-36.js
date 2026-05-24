/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-36.js
   Extracted from app.js lines 11192-11330
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var INSETS = {
    'page-fieldsales': [
      { name:'Reciprocity', src:'Cialdini · Influence (1984)',
        apply:'يطبّق هنا في: <b>عرض عينة مجانية أو نصيحة قبل الطلب</b>.',
        warn:'لا تحوّله manipulation — العطاء بشرط = ابتزاز ناعم.' },
      { name:'Anchoring', src:'Tversky &amp; Kahneman (1974)',
        apply:'يطبّق هنا في: <b>عرض السعر الأعلى أولاً ثم النزول</b>.',
        warn:'لا تستخدم أرقاماً وهمية — يكشف العميل ويفقد الثقة دائماً.' },
      { name:'Loss Aversion', src:'Kahneman · Thinking Fast and Slow',
        apply:'يطبّق هنا في: <b>تأطير الفرصة كخسارة لو لم يقرر</b>.',
        warn:'الإفراط في "إذا لم تشترِ ستخسر" يخلق scarcity سامّ.' }
    ],
    'page-callcenter': [
      { name:'Active Listening', src:'Carl Rogers · Client-Centered Therapy',
        apply:'يطبّق هنا في: <b>إعادة الصياغة قبل الردّ — Mirror &amp; Label</b>.',
        warn:'تكرار حرفي يصبح مزعجاً — أعد صياغة بكلماتك.' },
      { name:'Mirror Neurons', src:'Rizzolatti (1996)',
        apply:'يطبّق هنا في: <b>نبرتك الهادئة تُعدي العميل الغاضب</b>.',
        warn:'إذا تشاركت غضبه — تُضاعفه.' },
      { name:'Empathy Loop', src:'Brené Brown · Atlas of the Heart',
        apply:'يطبّق هنا في: <b>أُسمّي شعوره قبل أن أحلّ مشكلته</b>.',
        warn:'حلّ بدون تعاطف = إهانة في نظر العميل.' }
    ],
    'page-hrmastery': [
      { name:'BATNA', src:'Fisher &amp; Ury · Getting to Yes',
        apply:'يطبّق هنا في: <b>أعرف بديلي قبل دخول المفاوضة — قوّة صامتة</b>.',
        warn:'لا تكشف BATNA إلا في اللحظة الحرجة.' },
      { name:'Anchoring (Salary)', src:'Galinsky · First Offer Effect',
        apply:'يطبّق هنا في: <b>اطرح رقمك أولاً عند تساوي المعلومات</b>.',
        warn:'كن مستعداً بالتبرير — رقم بلا سرد ضعيف.' },
      { name:'Strategic Silence', src:'Voss · Never Split the Difference',
        apply:'يطبّق هنا في: <b>اصمت بعد عرضك — يملأ المُحاوِر الفراغ بقربك أنت</b>.',
        warn:'الصمت > 8 ثوانٍ يُصبح غير مريح — استخدم 4-6 ثوانٍ.' }
    ],
    'page-programming': [
      { name:'Imposter Syndrome', src:'Clance &amp; Imes (1978)',
        apply:'يطبّق هنا في: <b>"سيكتشفون أني لا أستحق" — اكتب ٣ إنجازات حقيقية</b>.',
        warn:'الاعتقاد بأنه شخصي — ٧٠٪+ من المهنيين يعيشونه.' },
      { name:'Flow State', src:'Csikszentmihalyi · Flow (1990)',
        apply:'يطبّق هنا في: <b>كتلة وقت 90 دقيقة بلا إشعارات = إنتاجية ٣x</b>.',
        warn:'الانقطاع المتكرر يكسر flow — يحتاج 23 دقيقة لعودته.' },
      { name:'Cognitive Load', src:'Sweller (1988)',
        apply:'يطبّق هنا في: <b>قسّم المهمة لخطوات ≤ 7 — حدّ الذاكرة العاملة</b>.',
        warn:'لا تخلط بين تعلّم مفهوم جديد وكتابة كود إنتاجي.' }
    ],
    'page-accounting': [
      { name:'Cognitive Load', src:'Sweller (1988)',
        apply:'يطبّق هنا في: <b>افصل بين تسجيل القيد والتحقق من الميزان</b>.',
        warn:'الخلط بين المهمتين يضاعف الأخطاء البسيطة.' },
      { name:'Attention Residue', src:'Leroy (2009)',
        apply:'يطبّق هنا في: <b>أنهِ تقرير قبل بدء آخر — تركيز كامل</b>.',
        warn:'التنقل بين 3 ملفات Excel = خطأ يومي على الأقل.' },
      { name:'Anchoring', src:'Kahneman &amp; Tversky',
        apply:'يطبّق هنا في: <b>أرقام السنة الماضية تُلوّن توقعات السنة الحالية</b>.',
        warn:'استخدم zero-based budgeting كل سنتين لكسر المرساة.' }
    ],
    'page-phonerepair': [
      { name:'Customer Anger', src:'McKee · The Story Brand',
        apply:'يطبّق هنا في: <b>الزبون لا يكره الإصلاح — يكره الفقد</b>.',
        warn:'لا تشرح تقنياً قبل تعاطف — يزيد الغضب.' },
      { name:'Trust by Transparency', src:'Mayer · Trust Model',
        apply:'يطبّق هنا في: <b>أوضح قطعة الغيار + سعرها قبل البدء</b>.',
        warn:'الشفافية الناقصة = شك دائم حتى بعد الإصلاح الجيد.' },
      { name:'Reactance', src:'Brehm (1966)',
        apply:'يطبّق هنا في: <b>لا تُجبر الزبون — قدّم خيارين</b>.',
        warn:'كل أمر مباشر يُولّد مقاومة — حتى لو كان الأفضل له.' }
    ],
    'page-social': [
      { name:'Variable Reward', src:'Skinner · Operant Conditioning',
        apply:'يطبّق هنا في: <b>التطبيقات تُكافئ بشكل عشوائي — يُدمن الفحص</b>.',
        warn:'عند صنع المحتوى — استخدمها بأخلاق، لا تستغل ضعف الناس.' },
      { name:'Information Gap', src:'Loewenstein (1994)',
        apply:'يطبّق هنا في: <b>عناوين تخلق فجوة معرفية = نقرات</b>.',
        warn:'إذا لم تسدّ الفجوة في المحتوى = clickbait يُفقد ثقة.' },
      { name:'Negativity Bias', src:'Baumeister · Bad is Stronger Than Good',
        apply:'يطبّق هنا في: <b>محتوى سلبي ينتشر أسرع — مسؤولية أخلاقية</b>.',
        warn:'إساءة استخدامه = مساهمة في تسميم الفضاء العام.' }
    ]
  };

  function buildCard(inset){
    var d = document.createElement('div');
    d.className = 'w09i-card';
    d.innerHTML = ''
      + '<div class="w09i-card-head">PSYCH INSET</div>'
      + '<h5>' + inset.name + '</h5>'
      + '<div class="w09i-card-src">' + inset.src + '</div>'
      + '<div class="w09i-card-apply">' + inset.apply + '</div>'
      + '<div class="w09i-card-warn">⚠️ ' + inset.warn + '</div>'
      + '<a href="#" class="w09i-card-link" data-w09i-link>اقرأ المزيد في صفحة Psychology</a>';
    return d;
  }

  function injectInto(pageId){
    var page = document.getElementById(pageId);
    if (!page) return;
    if (page.dataset.w09Insets === '1') return;
    var list = INSETS[pageId];
    if (!list || !list.length) return;

    var header = page.querySelector('.page-header');
    var mount = document.createElement('div');
    mount.className = 'w09i-mount';
    mount.setAttribute('data-w09-inset-mount', pageId);
    list.forEach(function(it){ mount.appendChild(buildCard(it)); });

    if (header && header.nextSibling){
      header.parentNode.insertBefore(mount, header.nextSibling);
    } else {
      page.insertBefore(mount, page.firstChild);
    }
    page.dataset.w09Insets = '1';
  }

  function injectAll(){
    Object.keys(INSETS).forEach(injectInto);
  }

  // Cross-link: clicking inset opens psych page
  document.addEventListener('click', function(e){
    var lnk = e.target.closest && e.target.closest('[data-w09i-link]');
    if (lnk){
      e.preventDefault();
      if (typeof window.navigateTo === 'function'){
        window.navigateTo('psych');
      } else {
        var p = document.getElementById('page-psych');
        if (p) p.scrollIntoView({behavior:'smooth'});
      }
    }
  });

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectAll);
  } else { injectAll(); }
})();
