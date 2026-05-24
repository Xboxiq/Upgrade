/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — JS Entry Point (Worker 23 / Phase 5)
   Pack v3 DECONSTRUCTION: 19K-line IIFE monolith → ESM modules.

   Worker 23 / Phase 5 — ESM Discipline:
     1. New units after Phase 5 must be ESM modules in platform/assets/js/.
     2. Do not write IIFEs in app.js anymore.
     3. Backward-compat: window.Upg.* preserved by side-effect modules.
     4. <script type="module"> defaults to defer + strict.
     5. Service Worker pre-caches every module.
     6. No bundler. Vanilla ESM only.
   ════════════════════════════════════════════════════════════════════════ */

// Phase 5/A: install legacy top-level functions (togglePsychAcc, etc.)
import './js/_legacy-globals.js';

// Phase 5/B: run each IIFE module in original source order
import './js/upg-helper-01.js';
import './js/upg-helper-02.js';
import './js/upg-helper-03.js';
import './js/upg-helper-04.js';
import './js/upg-helper-05.js';
import './js/upg-helper-06.js';
import './js/upg-helper-07.js';
import './js/upg-helper-08.js';
import './js/upg-helper-09.js';
import './js/upg-helper-10.js';
import './js/upg-helper-11.js';
import './js/upg-helper-12.js';
import './js/upg-helper-13.js';
import './js/upg-helper-14.js';
import './js/upg-helper-15.js';
import './js/upg-helper-16.js';
import './js/upg-helper-17.js';
import './js/upg-helper-18.js';
import './js/upg-helper-19.js';
import './js/upg-helper-20.js';
import './js/upg-helper-21.js';
import './js/upg-helper-22.js';
import './js/upg-helper-23.js';
import './js/upg-helper-24.js';
import './js/upg-helper-25.js';
import './js/upg-helper-26.js';
import './js/upg-helper-27.js';
import './js/upg-helper-28.js';
import './js/upg-helper-29.js';
import './js/upg-helper-30.js';
import './js/upg-helper-31.js';
import './js/upg-helper-32.js';
import './js/upg-helper-33.js';
import './js/upg-helper-34.js';
import './js/upg-helper-35.js';
import './js/upg-helper-36.js';
import './js/upg-helper-37.js';
import './js/upg-theme-1.js';
import './js/upg-icons-1.js';
import './js/upg-gateway-1.js';
import './js/upg-calc-1.js';
import './js/upg-helper-38.js';
import './js/upg-cmdk-1.js';
import './js/upg-state-1.js';
import './js/upg-helper-39.js';
import './js/upg-production-1.js';
import './js/upg-type-1.js';
import './js/upg-scroll-1.js';
import './js/upg-nav-1.js';
import './js/upg-helper-40.js';
import './js/upg-identity-1.js';
import './js/upg-greet-1.js';
import './js/upg-countup-1.js';
import './js/upg-motion-1.js';
import './js/upg-helper-41.js';
import './js/upg-helper-42.js';
import './js/upg-helper-43.js';
import './js/upg-material-1.js';
import './js/upg-chrome-1.js';
import './js/upg-choreo-1.js';
import './js/upg-transition-1.js';
import './js/upg-focustrap-1.js';
import './js/upg-focustrap-2.js';
import './js/upg-helper-44.js';
import './js/upg-helper-45.js';
import './js/upg-type2-1.js';
import './js/upg-life-1.js';
import './js/upg-life-2.js';
import './js/upg-transition-2.js';
import './js/upg-life-3.js';
import './js/upg-sound-1.js';
import './js/upg-aura-1.js';
import './js/upg-practice-1.js';
import './js/upg-pace-1.js';
import './js/upg-font-1.js';
import './js/upg-font-2.js';
import './js/upg-font-3.js';
import './js/upg-chroma-1.js';
import './js/upg-chroma-2.js';
import './js/upg-helper-46.js';
import './js/upg-ritual-1.js';
import './js/upg-helper-47.js';
import './js/upg-helper-48.js';
import './js/upg-helper-49.js';
import './js/upg-aura-2.js';
import './js/upg-layer-1.js';
import './js/upg-layer-2.js';
import './js/upg-shards-1.js';
import './js/upg-nav-2.js';
// Worker 24 / Phase 3 — Swipe Gestures (PointerEvents-based, mobile-only)
import './js/upg-touch-1.js';

// Phase 5/C: verify backward-compat shim (window.Upg.* checklist)
import './js/_compat.js';


// ÊLAN v4 — β3: format helpers (kashida-thousands in Dhahab world)
import './js/elan/format.js';

// ÊLAN v4 — γ1: world controller (mirrors active page → body[data-world])
import './js/elan/world.js';

// ÊLAN v4 — γ2: Hibr world — ink-drying CTA beacon
import './js/elan/world-hibr.js';

// ÊLAN v4 — γ3: Naar world — spark hover beacon
import './js/elan/world-naar.js';
import './js/elan/world-nada.js';
import './js/elan/world-hadeed.js';
import './js/elan/world-dhahab.js';
import './js/elan/world-tayyar.js';
// ÊLAN v4 — γ8: Warsha world (workshop bench beacon + long-press utility)
import './js/elan/world-warsha.js';
// ÊLAN v4 — γ9: Saloon world (meta-mirror — closes Pillar γ)
import './js/elan/world-saloon.js';
