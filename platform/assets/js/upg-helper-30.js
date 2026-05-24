/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-30.js
   Extracted from app.js lines 8942-9079
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var IC_DATA = {
    cpu: {
      title: 'SoC / CPU (Application Processor)',
      what: 'القلب الرئيسي للجهاز — يدير كل شيء (Apple A-Series / Snapdragon / Exynos).',
      symptoms: 'No Boot · Boot Loop · Heating شديد · Black Screen تماماً.',
      fix: 'CPU underfill repair (لو فقد contact مع البورد بسبب الصدمة) — Reflow بحرارة عالية أو Reball. خبرة عالية جداً مطلوبة.'
    },
    pmic: {
      title: 'PMIC — Power Management IC',
      what: 'يولّد كل rails الجهد (1.8V, 1.2V, 3.3V…) من البطارية لباقي ICs.',
      symptoms: 'No Boot · لا حرارة على الـ board · DC PSU يقرأ 0mA حتى مع 4V.',
      fix: 'استبدال PMIC = micro-soldering متقدم. الإجراء: Hot Air 380°C، رفع، تنظيف الـ pads، reball، لصق جديد. أحياناً يكفي reflow.'
    },
    tristar: {
      title: 'Tristar / Charging IC',
      what: 'يدير الشحن + USB negotiation + Lightning communication (iPhone).',
      symptoms: 'لا يشحن · يسحب 0.5A+ على الفور · Apple logo ثم يطفي على الشاحن.',
      fix: 'استبدال Tristar (BGA صغير 36-pin). أحد أكثر الأعطال شيوعاً في iPhone 6/7. سعر القطعة بالعراق: 5k IQD.'
    },
    audio: {
      title: 'Audio IC (Cirrus Logic / NXP)',
      what: 'يعالج كل الصوت — السماعة، الميكروفون، Speakerphone.',
      symptoms: 'iPhone 7: "loop disease" — الصوت يختفي في المكالمات · Recovery loop. الجهاز يقلع لكن مايعطي صوت.',
      fix: 'iPhone 7: jumper wire على trace U3101_RQ_C18 (الحل المعروف) أو إعادة لحام الـ IC.'
    },
    display: {
      title: 'Display IC (Display Driver)',
      what: 'يولّد الجهد العالي (~12V) للـ OLED + يدير touch sensing.',
      symptoms: 'شاشة سوداء بالكامل (مع backlight يعمل) · بقع أفقية · لا touch.',
      fix: 'تغيير الـ chip بدقة عالية — أو استبدال الشاشة كاملة لو ما عندك خبرة.'
    },
    rf: {
      title: 'RF Transceiver (Wi-Fi/BT/Cellular)',
      what: 'يعالج كل الإشارات اللاسلكية.',
      symptoms: 'No Service · Wi-Fi grayed out · ضعف إشارة دائم · "Searching..." مستمر.',
      fix: 'iPhone 7: مشكلة Wi-Fi شائعة — IC على corner اللوحة. حل دائم = استبدال IC + تنظيف pads.'
    },
    nand: {
      title: 'NAND Flash Storage',
      what: 'الذاكرة الدائمة — كل بيانات المستخدم + iOS/Android.',
      symptoms: 'Boot Loop دائم · Error 9/14 على iTunes · فجأة الجهاز ما يقلع.',
      fix: 'NAND replacement = micro-soldering متقدم جداً + Programmer (Pro3000s). يمكن upgrade من 32GB لـ 256GB!'
    },
    batt: {
      title: 'Battery Connector + Fuel Gauge',
      what: 'موصل البطارية + IC يقرأ نسبة الشحن.',
      symptoms: 'البطارية لا تتعرّف · % خاطئ · يطفي فجأة.',
      fix: 'تنظيف الـ connector pins · استبدال الـ FPC لو fault · Reset الـ Fuel Gauge عبر تركيب البطارية بترتيب معين.'
    },
    cam: {
      title: 'Camera Connectors',
      what: 'موصلات flex الكاميرا (Front, Back, Telephoto, Wide).',
      symptoms: 'كاميرا واحدة لا تعمل · شاشة سوداء عند الفتح · "Camera Error".',
      fix: 'فك الـ flex، تنظيف الـ contacts بـ IPA، إعادة تركيب. لو الـ pad lifted = jumper wire.'
    },
    ant: {
      title: 'Antenna Pads',
      what: 'نقاط تلامس مع antenna feeds (للإشارة + Wi-Fi + GPS).',
      symptoms: 'ضعف إشارة بعد تغيير شاشة أو بطارية (نسيت توصيل antenna spring).',
      fix: 'تأكد من spring contacts أنها على الـ pads. لو الـ pad سقط = lift جديد بـ jumper.'
    },
    charge: {
      title: 'Charging IC (Samsung MAX77705 / etc.)',
      what: 'مكافئ Tristar في Samsung — يدير USB-C PD + Wireless Charging.',
      symptoms: 'لا يشحن · شحن بطيء جداً · Wireless Charging لا يعمل.',
      fix: 'استبدال IC على daughter board (أسهل من iPhone Tristar). متوفر في السوق العراقي بسعر 8-15k IQD.'
    }
  };

  function $id(id){ return document.getElementById(id); }

  function bindMainboardTabs(){
    var tabs = document.querySelectorAll('#page-phonerepair .pr-mb-tab');
    tabs.forEach(function(tab){
      if (tab.__pr_bound) return; tab.__pr_bound = true;
      tab.addEventListener('click', function(){
        var which = tab.getAttribute('data-pr-mb');
        tabs.forEach(function(t){ t.classList.toggle('is-active', t === tab); });
        var ip = $id('pr-mb-iphone');
        var sm = $id('pr-mb-samsung');
        if (ip) ip.hidden = (which !== 'iphone');
        if (sm) sm.hidden = (which !== 'samsung');
        clearMbInfo();
      });
    });
  }

  function clearMbInfo(){
    var info = $id('pr-mb-info');
    if (!info) return;
    info.innerHTML = '<p class="pr-mb-info-empty">👆 اضغط على أي IC في الرسم لمعرفة وظيفته + أعراض تلفه + إجراء الإصلاح.</p>';
    document.querySelectorAll('#page-phonerepair .pr-mb-ic.is-selected').forEach(function(g){
      g.classList.remove('is-selected');
    });
  }

  function bindIcClicks(){
    var ics = document.querySelectorAll('#page-phonerepair .pr-mb-ic');
    ics.forEach(function(g){
      if (g.__pr_bound) return; g.__pr_bound = true;
      g.addEventListener('click', function(){
        var key = g.getAttribute('data-pr-ic');
        var info = $id('pr-mb-info');
        var data = IC_DATA[key];
        if (!info || !data) return;

        document.querySelectorAll('#page-phonerepair .pr-mb-ic.is-selected').forEach(function(x){
          x.classList.remove('is-selected');
        });
        g.classList.add('is-selected');

        info.innerHTML =
          '<h4>' + data.title + '</h4>' +
          '<p><b>الوظيفة:</b> ' + data.what + '</p>' +
          '<p class="pr-mb-symptoms"><b>أعراض التلف:</b> ' + data.symptoms + '</p>' +
          '<p><b>الإصلاح:</b> ' + data.fix + '</p>';
      });
    });
  }

  function init(){
    if (!document.getElementById('page-phonerepair')) return;
    bindMainboardTabs();
    bindIcClicks();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="phonerepair"]');
    if (t) setTimeout(init, 80);
  });
})();
