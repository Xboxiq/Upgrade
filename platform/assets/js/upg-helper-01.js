/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-01.js
   Extracted from app.js lines 28-201
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function () {

    // Page metadata
    const PAGES = {
      dashboard: {
        title: 'لوحة التحكم',
        breadcrumb: 'الرئيسية / لوحة التحكم',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>`
      },
      callcenter: {
        title: 'وحدة الكول سنتر',
        breadcrumb: 'الرئيسية / وحدات التدريب / كول سنتر',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>`
      },
      fieldsales: {
        title: 'وحدة المبيعات',
        breadcrumb: 'الرئيسية / وحدات التدريب / المبيعات',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
        </svg>`
      },
      social: {
        title: 'وحدة السوشيال ميديا',
        breadcrumb: 'الرئيسية / وحدات التدريب / سوشيال ميديا',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>`
      },
      lab: {
        title: 'مختبر السيناريوهات',
        breadcrumb: 'الرئيسية / وحدات التدريب / مختبر',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
        </svg>`
      },
      psych: {
        title: 'الدوافع النفسية الخفية',
        breadcrumb: 'الرئيسية / وحدات التدريب / الدوافع النفسية',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.84A2.5 2.5 0 0 1 9.5 2"/>
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.84A2.5 2.5 0 0 0 14.5 2"/>
        </svg>`
      },
      eq: {
        title: 'الذكاء العاطفي — EQ',
        breadcrumb: 'الرئيسية / وحدات التدريب / الذكاء العاطفي',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>`
      },
      negotiation: {
        title: 'المفاوضات والإقناع',
        breadcrumb: 'الرئيسية / وحدات التدريب / المفاوضات',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 11l-4 4-2-2"/>
        </svg>`
      },
      customercare: {
        title: 'خدمة العملاء المتميزة',
        breadcrumb: 'الرئيسية / وحدات التدريب / خدمة العملاء',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>`
      },
      programming: {
        title: 'البرمجة والهندسة البرمجية',
        breadcrumb: 'الرئيسية / وحدات التدريب / البرمجة',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>`
      },
      accounting: {
        title: 'المحاسبة والكاشير',
        breadcrumb: 'الرئيسية / وحدات التدريب / المحاسبة والكاشير',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="10" y1="3" x2="10" y2="21"/>
        </svg>`
      },
      accountmgr: {
        title: 'إدارة الحسابات الكبيرة (KAM)',
        breadcrumb: 'الرئيسية / وحدات التدريب / إدارة الحسابات',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 11l-3 3-2-2"/>
        </svg>`
      },
      phonerepair: {
        title: 'صيانة الهواتف الذكية',
        breadcrumb: 'الرئيسية / وحدات التدريب / صيانة الهواتف',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="2" width="12" height="20" rx="2"/>
          <line x1="11" y1="18" x2="13" y2="18"/>
          <path d="M9 6h6"/>
        </svg>`
      },
      hrmastery: {
        title: 'إتقان HR والتفاوض على الراتب',
        breadcrumb: 'الرئيسية / وحدات التدريب / مقابلات HR',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>`
      },
      myprogress: {
        title: 'تقدمي',
        breadcrumb: 'الرئيسية / تقدمي',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="20" x2="12" y2="10"/>
          <line x1="18" y1="20" x2="18" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="16"/>
        </svg>`
      }
    };

    const navItems   = document.querySelectorAll('.nav-item[data-page]');
    const pages      = document.querySelectorAll('.page');
    const topTitle   = document.getElementById('topbar-title');
    const topBread   = document.getElementById('topbar-breadcrumb');
    const topIcon    = document.getElementById('topbar-icon');

    function navigateTo(pageId) {
      if (!PAGES[pageId]) return;

      // Update nav items
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageId);
      });

      // Update pages
      pages.forEach(page => {
        page.classList.toggle('active', page.id === 'page-' + pageId);
      });

      // Update topbar
      const meta = PAGES[pageId];
      topTitle.textContent  = meta.title;
      topBread.textContent  = meta.breadcrumb;
      topIcon.innerHTML     = meta.icon;

      // Scroll main back to top
      document.getElementById('main').scrollTop = 0;
    }

    // Attach click events
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        const pageId = this.dataset.page;
        if (pageId && pageId !== 'none') {
          navigateTo(pageId);
        }
      });
    });

    // Module card shortcuts on dashboard
    document.querySelectorAll('.module-card').forEach((card, idx) => {
      const pageMap = ['callcenter', 'fieldsales', 'social', 'lab'];
      card.addEventListener('click', () => navigateTo(pageMap[idx]));
    });

    // Initialize
    navigateTo('dashboard');

  })();
