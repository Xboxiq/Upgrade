/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε7 — Customer Care (Warsha world) JS
   ────────────────────────────────────────────────────────────────────────
   🌈 CHROMATIC_BEACON — The Bench is the Meter

   The trainee writes a response to a customer complaint. As they type,
   the textarea's surface tints in real-time:

     warm    → calm olive cloth on the bench (good emotional posture)
     neutral → sanded raw wood (the default starting state)
     harsh   → flushed brick (the bench is hot — re-read your words)

   Scoring is keyword-lemma-aware Iraqi-Arabic. Fully offline. No ML, no
   network. The CSS in worlds/_warsha.css owns all surface rendering.
   This module owns:

     1. The Iraqi-Arabic lexicons (warm + harsh keyword lists, hand-tuned
        with idiomatic phrases that come up on actual support floors).
     2. Lemma-tolerant matching (strips diacritics, normalizes alef/yaa,
        treats ـ as a word continuation).
     3. A debounced input handler (120ms) that re-scores and writes the
        sentiment back to the textarea + the meter label + the hint.
     4. Idempotent binding via [data-elan-sentiment-input], with a
        MutationObserver to pick up textareas added after page mount.
     5. Re-binding on upg:nav:change → 'customercare' so the bench is
        always alive when the user navigates back.

   What it does NOT do:
     - infer mood across whole conversations (this is a single-turn drill)
     - call any external NLP service (offline guarantee)
     - mutate any existing customer-care lesson markup
     - claim to be a real sentiment classifier (it is a coaching mirror)

   Public API: window.Upg.elan.customercare (frozen)
     - score(text)    classify a string → 'warm' | 'neutral' | 'harsh'
     - bind(root)     bind any [data-elan-sentiment-input] under root
     - rebindAll()    rebind across the whole document

   Storage: none.
   ──────────────────────────────────────────────────────────────────── */

const SELECTOR = 'textarea[data-elan-sentiment-input]';
const DEBOUNCE_MS = 120;

const LABELS = Object.freeze({
  warm:    'نَفَس دافئ',
  neutral: 'محايد',
  harsh:   'حادّ — راجع',
});

const HINTS = Object.freeze({
  warm:    'الورشة هادئة. الكلمات تُطمئن.',
  neutral: 'السطح يَتغيَّر مع كل كلمة دافئة أو حادَّة.',
  harsh:   'السطح أصبح ساخناً. أعد صياغة كلمة أو اثنتين.',
});

/* ── Iraqi-Arabic warm lexicon (good service language) ─────────────── */
const WARM_TERMS = [
  'شكرا','شكراً','يسعدني','بسيط','لا تشيل','لا تشيل هم','اعتذر','نعتذر','نقدّر',
  'نقدر','حضرتك','يا أستاذ','يا أستاذة','يا حبيب','يا حبيبتي','يا صديق','يا أخ',
  'يا أخت','يا أخوي','تطمين','ابشر','تدلل','حاضر','أنا معاك','أنا معك',
  'سأتابع','بأقرب وقت','الحين','اطمئن','اطمئني','إن شاء الله','بإذن الله',
  'كرماً','من جد','والله','أكيد','أكيدة','بكل سرور','بسرور','خلِّ بالك',
  'ثق فيا','ثقي فيا','ثقي بنا','ثق بنا','ما يصير عندك','ما يهون','اصبر شوي',
  'افهم انزعاجك','افهم غضبك','معك حق','من حقك','الخطأ خطأنا','نحن المسؤولون',
  'بشرفي','نهتم فيك','نهتم بك','نسعد بخدمتك','تأمر','تأمري','أمرك','عيني',
  'اعتذاري','اعتذاراتي','بصراحة','بصدق','وعد','أعدك','أعدكم',
];

/* ── Iraqi-Arabic harsh lexicon (defensive / dismissive language) ──── */
const HARSH_TERMS = [
  'غير ممكن','مو ممكن','ما يصير','ما اقدر','لا أستطيع','صعب','مستحيل',
  'هذي مشكلتك','هذه مشكلتك','مشكلتك أنت','غلط','غلطك','خطأ منك','خطأك',
  'فهمت غلط','اقرأ','اقرأي','ارجع اقرأ','مكتوب','واضح','شرحناها سابقاً',
  'كل مرة','دائماً تتصل','ليش تتصل','ليش تتصلي','ما عندي وقت','مشغول',
  'مشغولة','لاحقاً','بعدين','شوف غيري','اتصل غيرنا','هذا قانون',
  'هذي السياسة','السياسة وما عندي','ما بإيدي','ما بايدي','ما بيدي',
  'خلاص','بس','اقفل','أقفل','لا تتصل','لا تكلمني','لا تكلميني',
  'أنت ما فاهم','انت ما فاهم','مو فاهم','ما تفهم','ما تفهمين',
  'هذا أنت','تطلبني','مجاناً','ببلاش','ما يستاهل','ما يستحق',
  'لو سمحت بس','بس بس','تعقّد','معقّد','عسر','مشكلتك مش مشكلتي',
];

/* ── Normalization (strip diacritics, alef/yaa variants) ─────────── */
const DIACRITICS = /[\u064B-\u0652\u0670\u0640]/g;
const ALEF_VARIANTS = /[\u0622\u0623\u0625]/g; // أ إ آ → ا
const YAA_VARIANTS = /[\u0649]/g;              // ى → ي
const TAA_VARIANTS = /[\u0629]/g;              // ة → ه (lighter match)

function normalize(s) {
  if (typeof s !== 'string' || s.length === 0) return '';
  return s
    .replace(DIACRITICS, '')
    .replace(ALEF_VARIANTS, '\u0627')
    .replace(YAA_VARIANTS, '\u064A')
    .replace(TAA_VARIANTS, '\u0647')
    .toLowerCase();
}

const WARM_NORM  = WARM_TERMS.map(normalize);
const HARSH_NORM = HARSH_TERMS.map(normalize);

/* ── Score ────────────────────────────────────────────────────────── */
function score(text) {
  const norm = normalize(text);
  if (norm.length === 0) return 'neutral';

  let warm = 0;
  for (let i = 0; i < WARM_NORM.length; i++) {
    if (norm.indexOf(WARM_NORM[i]) !== -1) warm++;
  }

  let harsh = 0;
  for (let i = 0; i < HARSH_NORM.length; i++) {
    if (norm.indexOf(HARSH_NORM[i]) !== -1) harsh++;
  }

  // Hysteresis: a single warm term is enough; harsh needs to actually
  // outweigh warmth, so an apologetic-but-firm answer reads as "warm",
  // not "harsh". This matches the workshop coaching philosophy.
  if (harsh > warm) return 'harsh';
  if (warm > 0)     return 'warm';
  return 'neutral';
}

/* ── Apply state to the textarea + its meter ──────────────────────── */
function applyState(ta, state) {
  if (!ta) return;
  ta.dataset.sentiment = state;

  // The meter lives outside the textarea — find it by aria-describedby.
  const meterId = ta.getAttribute('aria-describedby');
  let meter = null;
  if (meterId) {
    try { meter = document.getElementById(meterId); } catch (_) {}
  }
  if (!meter) {
    const area = ta.closest('.response-area');
    if (area) meter = area.querySelector('[data-elan-sentiment-label]')?.closest('.sentiment-meter') || null;
  }
  if (!meter) return;

  meter.dataset.sentimentState = state;
  const label = meter.querySelector('[data-elan-sentiment-label]');
  if (label) label.textContent = LABELS[state] || LABELS.neutral;
  const hint  = meter.querySelector('[data-elan-sentiment-hint]');
  if (hint)  hint.textContent  = HINTS[state]  || HINTS.neutral;
}

/* ── Debounce helper (per-textarea timer bag) ─────────────────────── */
const timers = new WeakMap();

function scheduleScore(ta) {
  const prev = timers.get(ta);
  if (prev) clearTimeout(prev);
  const t = setTimeout(() => {
    timers.delete(ta);
    try { applyState(ta, score(ta.value || '')); } catch (_) {}
  }, DEBOUNCE_MS);
  timers.set(ta, t);
}

/* ── Bind ─────────────────────────────────────────────────────────── */
function bind(root) {
  const scope = root || document;
  const list  = scope.querySelectorAll(SELECTOR);
  for (let i = 0; i < list.length; i++) {
    const ta = list[i];
    if (ta.__elanSentimentBound) continue;
    ta.__elanSentimentBound = true;

    // Initial score (in case the field already has placeholder text or
    // a restored value).
    try { applyState(ta, score(ta.value || '')); } catch (_) {}

    ta.addEventListener('input', () => scheduleScore(ta));
    // Also score on paste — paste does not always fire input synchronously
    // in every engine, so a fallback explicit re-schedule is cheap.
    ta.addEventListener('paste', () => scheduleScore(ta));
  }
}

function rebindAll() { bind(document); }

/* ── MutationObserver: pick up dynamically inserted textareas ────── */
let observer = null;
function startObserver() {
  if (observer || typeof MutationObserver === 'undefined') return;
  observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      const m = mutations[i];
      for (let j = 0; j < m.addedNodes.length; j++) {
        const n = m.addedNodes[j];
        if (n && n.nodeType === 1) {
          if (n.matches && n.matches(SELECTOR)) bind(n.parentElement || document);
          else if (n.querySelector && n.querySelector(SELECTOR)) bind(n);
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ── Lifecycle ────────────────────────────────────────────────────── */
function init() {
  bind(document);
  startObserver();

  window.addEventListener('upg:nav:change', (e) => {
    const id = (e && e.detail && e.detail.pageId) || '';
    if (id === 'customercare') bind(document);
  });
}

/* ── Public surface — nested under Upg.elan ───────────────────────── */
window.Upg = window.Upg || {};
window.Upg.elan = window.Upg.elan || {};
window.Upg.elan.customercare = Object.freeze({
  score,
  bind,
  rebindAll,
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
