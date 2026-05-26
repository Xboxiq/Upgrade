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

// ÊLAN v4 — δ1: Magnetic Sidebar (Pillar δ KINETIC SHELL — Stage 1 of 6)
import './js/elan/sidebar-magnetic.js';

// ÊLAN v4 — δ2: Bento Temporal (data-priority hours → focal cell emphasis)
import './js/elan/bento-temporal.js';

// ÊLAN v4 — δ3: Living Topbar (Reading Tide — INTERACTION beacon)
import './js/elan/topbar-living.js';

// ÊLAN v4 — δ4: Mobile Bottom Nav (Plinth Mode + Maqamat Haptics — STRUCTURAL beacon)
import './js/elan/bottom-nav.js';


// ÊLAN v4 — δ6: Motion Sanctuary (closes Pillar δ; META beacon — three-state
// preference graph + «ساكن» chrome confession; CSS owns the per-world
// static-signature transposition in _motion-sanctuary.css)
import './js/elan/delta6-motion.js';

// ─── Pillar ε: CONTENT REVIVAL ─────────────────────────────────────────
import './js/elan/epsilon1-dashboard.js';

// ÊLAN v4 — ε3: Fieldsales Content Revival (Hadeed / INTERACTION beacon —
// hand-drawn route canvas, 8 Baghdad pins, no Google Maps, no external API.
// Reflective surface registers under Upg.elan.fieldsalesRoute.)
import './js/elan/epsilon3-fieldsales.js';


// ÊLAN v4 — ε4: Social Content Revival (Pillar ε — Stage 4 of 12)
// VISUAL_BEACON — VHS scrub-bar engagement timeline (retrowave scan-lines +
// 60ms glitch on snapshot crossfade). Inspired-by: Wild Card #15 Synthwave + Khat.
// Registers Upg.elan.social (NOT a 15th top-level Upg.* — namespaced under Upg.elan).
import './js/elan/epsilon4-social.js';

// ÊLAN v4 — ε5: Lab Content Revival (Pillar ε — Stage 5 of 12)
// TYPOGRAPHIC_BEACON — Brutalist blueprint notebook with 4 type-keyed voices
// (thinking→Markazi serif / action→Bukra display / numeric→Almarai tabular /
// negotiation→Vazirmatn UI). Inspired-by: Wild Card #1 Brutalist Iraqi
// Modernism (Chadirji concrete coffer ceiling as dotted background).
// Registers Upg.elan.lab — frozen surface SCENARIOS (10) + audit + getByType.
import './js/elan/epsilon5-lab.js';

// ÊLAN v4 — ε6: Psych/EQ/Negotiation Content Revival (Nada + Hadeed worlds)
// Registers Upg.elan.breath — breath-pause (Nada) + stamp-mark (Hadeed).
import './js/elan/epsilon6-psych.js';

// ÊLAN v4 — ε7: Customer Care Content Revival (Warsha world)
// CHROMATIC_BEACON — sentiment-tinted bench textarea. Keyword-lemma Iraqi-
// Arabic scoring drives 3-state surface tint (warm-olive / neutral-terra /
// harsh-brick). The bench IS the meter. Inspired-by: Wild Card #13 Iraqi
// Marsh Architecture — mudhif reed walls signal state through ambient
// material shift, not signage. Registers Upg.elan.customercare (frozen).
import './js/elan/epsilon7-customercare.js';

// ÊLAN v4 — ε8: Programming Content Revival (Naar world)
// STRUCTURAL_BEACON — Brutalist skill tree as ember line work over a
// Chadirji concrete-coffer drafting grid. SVG is built programmatically
// via createElementNS — no inline <svg viewBox> markup in HTML. Hover
// or keyboard-focus on a branch dims unrelated leaves to 0.3. Inspired-
// by: Wild Card #1 Brutalist Iraqi Modernism (Makiya/Chadirji structural
// diagrams). Registers Upg.elan.programming (frozen).
import './js/elan/epsilon8-programming.js';

// ÊLAN v4 — ε9: Accounting Content Revival (Dhahab world)
// DATA_BEACON — Memphis tax IQ ladder. 5 gold-leaf asymmetric ovals
// stacked column-reverse, slider drives --bracket-fill + --bracket-width
// per bracket via progressive computation. Tax amount displayed with β3
// kashida thousands separator. Inspired-by: Mughal accounting books
// (visual ledgers as weight scales) + Memphis Group asymmetric ovals.
// Registers Upg.elan.accounting (frozen, exposes compute + brackets).
import './js/elan/epsilon9-accounting.js';

// ÊLAN v4 — ε10: Phonerepair Content Revival (Warsha world)
// 🤚 INTERACTION_BEACON — Drag-to-Diagnose Workbench. Trainee picks a
// symptom card from the rack, drops it on the affected component of a
// phone outline. Three input modalities (HTML5 dnd / pointer events /
// keyboard pick-and-drop). On drop: zone glows ember, Upg.haptic
// 'takk' fires (δ4), and a tilted paper-tape "shop receipt" rolls out
// listing root-cause hypotheses (typewritten, one row per cause).
// Reuses Warsha --warsha-tape token from γ8 / ε7 for chromatic continuity.
// Registers Upg.elan.phonerepair (diagnose / causes / reset / symptoms / zones).
import './js/elan/epsilon10-phonerepair.js';


// ÊLAN v4 — ε11: HRMastery Content Revival (Saloon world)
// 🪞 META_BEACON — The Salon Mirror that Listens. MediaRecorder + a
// hand-drawn canvas waveform in saloon-brass. After stop, three stats
// (WPM / silence% / duration) appear instantly (no count-from-zero —
// Forbidden #11 avoided), then the page speaks back a *prose verdict*
// in voice-accent (Lateef italic) computed from the stats. The interface
// does not toast "Recording saved" — it listens, then answers the user
// in their own tongue. Inspired-by: Wild Card #11 — Mid-century Beirut
// salon recording rituals (the recording IS the lesson, not the byproduct).
// Registers Upg.elan.hrmastery (start / stop / reset / verdict).
import './js/elan/epsilon11-hrmastery.js';
