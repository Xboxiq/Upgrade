#!/usr/bin/env python3
# ════════════════════════════════════════════════════════════════
# RESONANCE v2 — Worker 17 / Phase 5 — Cross-References & Bridges
# ════════════════════════════════════════════════════════════════
# Idempotent injector:
#   1. AUGMENT 62 anchor blocks with data-related + data-prereq
#   2. INSERT block-prereq-chip BEFORE each anchor block
#   3. INSERT block-bridge nav AFTER each block-practice section
#   4. INSERT 8 block-bridge--cross-page heroes before page closing
#
# Re-run produces 0 changes.
# Sacred preserved: 14 pages, 391 qcalc, 23 Upg.* APIs, 503 data-block-id,
#                   26 block-tldr, 28 block-pitfalls, 62 block-practice
# ════════════════════════════════════════════════════════════════

import re
import sys
from pathlib import Path

HERE  = Path(__file__).resolve().parent.parent
HTML  = HERE / "platform" / "index.html"
CSS   = HERE / "platform" / "assets" / "style.css"

# ─── Content map: 62 anchor blocks ─────────────────────────────────
# Each entry: {title, prereq[], related[], bridge[]}
#   prereq: 1-2 ids (each must be lower difficulty, same/foundational page)
#   related: 3-5 ids (mix in-page + cross-page)
#   bridge: 2-3 dicts {target, relation, label, page_tag(optional), meta(optional)}
# Relations: extends | applies-in | contrasts | prereq-for | cheat | case | practice
# ───────────────────────────────────────────────────────────────────

ANCHORS = {
    # ━━━ CALLCENTER (6) ━━━
    "cc-001": {
        "title": "مؤشر APIndex المركّب",
        "prereq": [],  # foundational entry calc
        "related": ["cc-012", "cc-015", "cc-042", "cu-001", "cc-069"],
        "bridge": [
            {"target": "cc-012", "rel": "extends",    "label": "Vocal Mirroring — صوتك يتطابق ثم يقود"},
            {"target": "cu-001", "rel": "applies-in", "label": "خدمة الزبون — KPIs على مستوى الرحلة الكاملة", "page_tag": "خدمة الزبون"},
            {"target": "cc-069", "rel": "cheat",      "label": "ورقة الخلاصة — كول سنتر",                    "meta": "~3 دقائق"},
        ],
    },
    "cc-012": {
        "title": "Vocal Mirroring — المرآة الصوتية",
        "prereq": ["cc-001"],
        "related": ["cc-015", "cc-018", "cu-005", "ps-005", "eq-005"],
        "bridge": [
            {"target": "cc-015", "rel": "extends",    "label": "Cognitive Load — تخفيف العبء أثناء المكالمة"},
            {"target": "eq-005", "rel": "applies-in", "label": "الذكاء العاطفي — وعي ذاتي يسبق المرايا", "page_tag": "EQ"},
            {"target": "cu-005", "rel": "applies-in", "label": "خدمة الزبون — المرايا في القنوات الكتابية", "page_tag": "خدمة الزبون"},
        ],
    },
    "cc-015": {
        "title": "Cognitive Load — العبء المعرفي",
        "prereq": ["cc-001", "cc-012"],
        "related": ["cc-042", "cc-062", "ps-005", "ng-005"],
        "bridge": [
            {"target": "cc-042", "rel": "extends",    "label": "تشريح المكالمة — 7 مراحل تكتيكية"},
            {"target": "ps-005", "rel": "contrasts",  "label": "علم النفس — System 1 vs System 2",          "page_tag": "علم النفس"},
        ],
    },
    "cc-042": {
        "title": "تشريح المكالمة — 7 مراحل",
        "prereq": ["cc-001", "cc-012"],
        "related": ["cc-015", "cc-062", "cc-069", "cu-008"],
        "bridge": [
            {"target": "cc-062", "rel": "extends",    "label": "Voice Studio — تدرّب وقس صوتك حقيقياً"},
            {"target": "cu-008", "rel": "applies-in", "label": "خدمة الزبون — تشريح رحلة الشكوى",            "page_tag": "خدمة الزبون"},
        ],
    },
    "cc-062": {
        "title": "Voice Studio — تقييم صوتي ذاتي",
        "prereq": ["cc-012", "cc-042"],
        "related": ["cc-015", "cc-042", "cc-069", "eq-010"],
        "bridge": [
            {"target": "cc-069", "rel": "cheat",      "label": "ورقة الخلاصة — كول سنتر",                   "meta": "~3 دقائق"},
            {"target": "eq-010", "rel": "applies-in", "label": "EQ — التنظيم الذاتي قبل الكلام",              "page_tag": "EQ"},
        ],
    },
    "cc-069": {
        "title": "ورقة الخلاصة — Callcenter",
        "prereq": ["cc-001", "cc-012", "cc-042"],
        "related": ["cc-001", "cc-012", "cc-015", "cc-042", "cc-062"],
        "bridge": [
            {"target": "cu-001", "rel": "applies-in", "label": "خدمة الزبون — الخطوة التالية على مستوى الرحلة", "page_tag": "خدمة الزبون"},
            {"target": "eq-005", "rel": "extends",    "label": "EQ — جذور المهارات الصوتية", "page_tag": "EQ"},
        ],
    },

    # ━━━ FIELDSALES (5) ━━━
    "fs-001": {
        "title": "حاسبة العمولة — Sales Commission",
        "prereq": [],
        "related": ["fs-005", "fs-010", "am-001", "ac-002"],
        "bridge": [
            {"target": "fs-005", "rel": "extends",    "label": "البيع الميداني — مراحل دورة المبيعات"},
            {"target": "ac-002", "rel": "applies-in", "label": "المحاسبة — قسيمة الراتب وضرائب العمولة", "page_tag": "المحاسبة"},
            {"target": "am-001", "rel": "contrasts",  "label": "الـ KAM — صياد أم مزارع؟",                "page_tag": "KAM"},
        ],
    },
    "fs-005": {
        "title": "أطر البيع — 4 مدارس",
        "prereq": ["fs-001"],
        "related": ["fs-010", "fs-020", "fs-030", "am-003", "so-005"],
        "bridge": [
            {"target": "fs-010", "rel": "extends",    "label": "Discovery Library — أسئلة الكشف"},
            {"target": "so-005", "rel": "applies-in", "label": "Social — أطر الـ Hooks في المحتوى",         "page_tag": "Social"},
        ],
    },
    "fs-010": {
        "title": "Discovery Library — مكتبة الأسئلة",
        "prereq": ["fs-001", "fs-005"],
        "related": ["fs-020", "fs-030", "ng-005", "cc-012"],
        "bridge": [
            {"target": "fs-020", "rel": "extends",    "label": "اعتراضات عراقية — كيف تردّ"},
            {"target": "ng-005", "rel": "applies-in", "label": "التفاوض — Voss وأسئلة كاليبراتيد",            "page_tag": "تفاوض"},
        ],
    },
    "fs-020": {
        "title": "اعتراضات السوق العراقي",
        "prereq": ["fs-005", "fs-010"],
        "related": ["fs-010", "fs-030", "ng-008", "cu-008"],
        "bridge": [
            {"target": "fs-030", "rel": "extends",    "label": "مختبرات تفاعلية — 3 سيناريوهات"},
            {"target": "ng-008", "rel": "applies-in", "label": "تفاوض — التعامل مع رفض السعر",               "page_tag": "تفاوض"},
        ],
    },
    "fs-030": {
        "title": "مختبرات البيع التفاعلية",
        "prereq": ["fs-005", "fs-010", "fs-020"],
        "related": ["fs-001", "fs-005", "am-005", "lb-001"],
        "bridge": [
            {"target": "am-005", "rel": "applies-in", "label": "KAM — لقاء جلسة المراجعة الربعية",          "page_tag": "KAM"},
            {"target": "lb-001", "rel": "contrasts",  "label": "Lab — تجربة قبل تنفيذ ميداني",                "page_tag": "Lab"},
        ],
    },

    # ━━━ ACCOUNTMGR (4) ━━━
    "am-001": {
        "title": "صياد أم مزارع؟ — Hunter vs Farmer",
        "prereq": [],
        "related": ["am-003", "am-005", "fs-005", "ac-001"],
        "bridge": [
            {"target": "am-003", "rel": "extends",    "label": "تخطيط الحساب — Account Planning"},
            {"target": "fs-005", "rel": "contrasts",  "label": "Field Sales — مدرسة قريبة لكن مختلفة",       "page_tag": "مبيعات"},
        ],
    },
    "am-003": {
        "title": "Account Planning — تخطيط الحساب",
        "prereq": ["am-001"],
        "related": ["am-005", "am-007", "fs-010", "ac-001"],
        "bridge": [
            {"target": "am-005", "rel": "extends",    "label": "QBR — جلسة المراجعة الربعية"},
            {"target": "ac-001", "rel": "applies-in", "label": "المحاسبة — قراءة بيانات حسابك المالية",       "page_tag": "محاسبة"},
        ],
    },
    "am-005": {
        "title": "QBR — Quarterly Business Review",
        "prereq": ["am-001", "am-003"],
        "related": ["am-007", "ac-001", "ac-002", "fs-020"],
        "bridge": [
            {"target": "am-007", "rel": "extends",    "label": "سلّم المهنة — KAM Career Ladder"},
            {"target": "ac-001", "rel": "applies-in", "label": "المحاسبة — أدوات تجهيز QBR ماليّاً",          "page_tag": "محاسبة"},
        ],
    },
    "am-007": {
        "title": "Career Ladder — سلّم المهنة",
        "prereq": ["am-001", "am-005"],
        "related": ["am-001", "am-003", "hr-035", "hr-038"],
        "bridge": [
            {"target": "hr-035", "rel": "applies-in", "label": "HR Mastery — مقابلة لـ KAM Senior",          "page_tag": "HR"},
            {"target": "hr-038", "rel": "applies-in", "label": "HR — تفاوض الراتب لـ KAM",                  "page_tag": "HR"},
        ],
    },

    # ━━━ SOCIAL (3) ━━━
    "so-002": {
        "title": "تشريح الأزمة — Crisis Stages",
        "prereq": [],
        "related": ["so-005", "so-010", "cu-008", "ps-010"],
        "bridge": [
            {"target": "so-005", "rel": "extends",    "label": "Hook Frameworks — 15 إطار جاذب"},
            {"target": "cu-008", "rel": "applies-in", "label": "خدمة الزبون — أزمة على مستوى الزبون", "page_tag": "خدمة الزبون"},
        ],
    },
    "so-005": {
        "title": "Hook Frameworks — 15 إطار",
        "prereq": ["so-002"],
        "related": ["so-010", "fs-005", "lb-001", "lb-003"],
        "bridge": [
            {"target": "so-010", "rel": "extends",    "label": "تقويم 30 يوم — Calendar Builder"},
            {"target": "lb-003", "rel": "applies-in", "label": "Lab — اختبار الـ Hook قبل النشر",              "page_tag": "Lab"},
        ],
    },
    "so-010": {
        "title": "Calendar Builder — تقويم 30 يوم",
        "prereq": ["so-002", "so-005"],
        "related": ["so-005", "fs-010", "lb-001", "cu-001"],
        "bridge": [
            {"target": "lb-001", "rel": "applies-in", "label": "Lab — اختبر مفاهيمك قبل التطبيق",            "page_tag": "Lab"},
        ],
    },

    # ━━━ LAB (2) ━━━
    "lb-001": {
        "title": "Lab — تجربة المفاهيم",
        "prereq": [],
        "related": ["lb-003", "so-005", "fs-030", "pg-010"],
        "bridge": [
            {"target": "lb-003", "rel": "extends",    "label": "Lab — التجربة الثانية، إعادة محاولة"},
            {"target": "so-005", "rel": "applies-in", "label": "Social — استخدم نتائج التجارب في المحتوى",   "page_tag": "Social"},
        ],
    },
    "lb-003": {
        "title": "Lab — Iteration",
        "prereq": ["lb-001"],
        "related": ["lb-001", "so-005", "so-010", "pg-010"],
        "bridge": [
            {"target": "so-005", "rel": "applies-in", "label": "Social — حوّل التجربة لمحتوى جاهز",          "page_tag": "Social"},
        ],
    },

    # ━━━ PSYCH (5) ━━━
    "ps-001": {
        "title": "OCEAN — السمات الخمس الكبرى",
        "prereq": [],
        "related": ["ps-005", "ps-010", "eq-005", "eq-010"],
        "bridge": [
            {"target": "ps-005", "rel": "extends",    "label": "علم النفس — 12 انحياز معرفي"},
            {"target": "eq-005", "rel": "applies-in", "label": "EQ — السمات تتحوّل لمهارات",                  "page_tag": "EQ"},
        ],
    },
    "ps-005": {
        "title": "12 Cognitive Biases — انحيازات معرفية",
        "prereq": ["ps-001"],
        "related": ["ps-010", "ps-020", "ng-005", "cc-015"],
        "bridge": [
            {"target": "ps-010", "rel": "extends",    "label": "علم النفس — الدوافع السبعة"},
            {"target": "ng-005", "rel": "applies-in", "label": "تفاوض — كشف انحياز الطرف الآخر",              "page_tag": "تفاوض"},
        ],
    },
    "ps-010": {
        "title": "7 Drives — الدوافع البشرية",
        "prereq": ["ps-001", "ps-005"],
        "related": ["ps-020", "ps-030", "eq-005", "so-002"],
        "bridge": [
            {"target": "ps-020", "rel": "extends",    "label": "اختبارات تشخيصية — 6 سلالم"},
            {"target": "eq-010", "rel": "applies-in", "label": "EQ — تنظيم الدوافع لا قمعها",                  "page_tag": "EQ"},
        ],
    },
    "ps-020": {
        "title": "Self-Diagnostic — 6 اختبارات",
        "prereq": ["ps-001", "ps-005", "ps-010"],
        "related": ["ps-030", "eq-015", "ng-005"],
        "bridge": [
            {"target": "ps-030", "rel": "extends",    "label": "علم النفس — جسر للمعالج"},
            {"target": "eq-015", "rel": "applies-in", "label": "EQ — Mood Meter كأداة يومية",                "page_tag": "EQ"},
        ],
    },
    "ps-030": {
        "title": "Therapist Bridge — متى تستشير",
        "prereq": ["ps-001", "ps-020"],
        "related": ["ps-001", "ps-020", "eq-020"],
        "bridge": [
            {"target": "eq-020", "rel": "applies-in", "label": "EQ — التحوّل من معرفة لممارسة يومية",        "page_tag": "EQ"},
        ],
    },

    # ━━━ EQ (4) ━━━
    "eq-005": {
        "title": "Self-Awareness — الوعي الذاتي",
        "prereq": [],
        "related": ["eq-010", "eq-015", "ps-001", "ng-001"],
        "bridge": [
            {"target": "eq-010", "rel": "extends",    "label": "EQ — التنظيم الذاتي"},
            {"target": "ng-001", "rel": "applies-in", "label": "تفاوض — الوعي قبل الـ BATNA",                  "page_tag": "تفاوض"},
        ],
    },
    "eq-010": {
        "title": "Self-Regulation — التنظيم الذاتي",
        "prereq": ["eq-005"],
        "related": ["eq-015", "eq-020", "cc-012", "ng-005"],
        "bridge": [
            {"target": "eq-015", "rel": "extends",    "label": "EQ — Mood Meter Interactive"},
            {"target": "ng-005", "rel": "applies-in", "label": "تفاوض — تنظيم الذات تحت ضغط",                  "page_tag": "تفاوض"},
        ],
    },
    "eq-015": {
        "title": "Mood Meter — الميزان العاطفي",
        "prereq": ["eq-005", "eq-010"],
        "related": ["eq-020", "ps-020", "cc-012"],
        "bridge": [
            {"target": "eq-020", "rel": "extends",    "label": "EQ — RULER في الممارسة"},
            {"target": "ps-020", "rel": "applies-in", "label": "علم النفس — اختبارات تشخيصية مكمّلة",            "page_tag": "علم النفس"},
        ],
    },
    "eq-020": {
        "title": "RULER Framework — Goleman",
        "prereq": ["eq-005", "eq-010", "eq-015"],
        "related": ["eq-005", "eq-015", "ng-005", "hr-035"],
        "bridge": [
            {"target": "ng-005", "rel": "applies-in", "label": "تفاوض — RULER في حوار صعب",                  "page_tag": "تفاوض"},
            {"target": "hr-035", "rel": "applies-in", "label": "HR — RULER في المقابلة",                       "page_tag": "HR"},
        ],
    },

    # ━━━ NEGOTIATION (7) ━━━
    "ng-001": {
        "title": "BATNA Calculator — البديل الأفضل",
        "prereq": [],
        "related": ["ng-003", "ng-005", "ng-008", "hr-038"],
        "bridge": [
            {"target": "ng-003", "rel": "extends",    "label": "ZOPA — منطقة الاتفاق الممكن"},
            {"target": "hr-038", "rel": "applies-in", "label": "HR — تطبيق BATNA على راتبك",                   "page_tag": "HR"},
        ],
    },
    "ng-003": {
        "title": "ZOPA — منطقة التفاوض",
        "prereq": ["ng-001"],
        "related": ["ng-005", "ng-008", "ng-010", "fs-020"],
        "bridge": [
            {"target": "ng-005", "rel": "extends",    "label": "Voss — أسئلة كاليبراتيد"},
            {"target": "fs-020", "rel": "applies-in", "label": "مبيعات — رفض السعر تطبيقاً للـ ZOPA",         "page_tag": "مبيعات"},
        ],
    },
    "ng-005": {
        "title": "Voss Calibrated Questions",
        "prereq": ["ng-001", "ng-003"],
        "related": ["ng-008", "ng-010", "ng-015", "cc-012"],
        "bridge": [
            {"target": "ng-008", "rel": "extends",    "label": "تفاوض — تكتيكات تحت الضغط"},
            {"target": "cc-012", "rel": "applies-in", "label": "كول سنتر — الأسئلة الصوتية في الخدمة",         "page_tag": "كول سنتر"},
        ],
    },
    "ng-008": {
        "title": "تكتيكات التفاوض تحت الضغط",
        "prereq": ["ng-001", "ng-003", "ng-005"],
        "related": ["ng-010", "ng-015", "fs-020", "hr-040"],
        "bridge": [
            {"target": "ng-010", "rel": "extends",    "label": "تفاوض — استراتيجيات Win-Win"},
            {"target": "hr-040", "rel": "applies-in", "label": "HR — تكتيكات تحت ضغط مقابلة",                "page_tag": "HR"},
        ],
    },
    "ng-010": {
        "title": "Win-Win — استراتيجيات تكاملية",
        "prereq": ["ng-001", "ng-005", "ng-008"],
        "related": ["ng-015", "ng-020", "am-005", "hr-038"],
        "bridge": [
            {"target": "ng-015", "rel": "extends",    "label": "تفاوض — منطق سلطة الكلمات"},
            {"target": "am-005", "rel": "applies-in", "label": "KAM — Win-Win في QBR",                       "page_tag": "KAM"},
        ],
    },
    "ng-015": {
        "title": "Anchoring Power — قوة المرساة",
        "prereq": ["ng-005", "ng-010"],
        "related": ["ng-020", "ng-008", "ps-005"],
        "bridge": [
            {"target": "ng-020", "rel": "extends",    "label": "تفاوض — التراجع التكتيكي"},
            {"target": "ps-005", "rel": "contrasts",  "label": "علم النفس — Anchoring Bias كثغرة",            "page_tag": "علم النفس"},
        ],
    },
    "ng-020": {
        "title": "Tactical Retreat — التراجع التكتيكي",
        "prereq": ["ng-001", "ng-008", "ng-015"],
        "related": ["ng-001", "ng-010", "hr-040"],
        "bridge": [
            {"target": "hr-040", "rel": "applies-in", "label": "HR — التراجع في عرض راتب أدنى",                "page_tag": "HR"},
        ],
    },

    # ━━━ CUSTOMERCARE (4) ━━━
    "cu-001": {
        "title": "Customer Journey — الرحلة الشاملة",
        "prereq": [],
        "related": ["cu-005", "cu-008", "cu-012", "cc-001"],
        "bridge": [
            {"target": "cu-005", "rel": "extends",    "label": "خدمة الزبون — قنوات متعددة"},
            {"target": "cc-001", "rel": "applies-in", "label": "كول سنتر — KPIs على مستوى المكالمة",          "page_tag": "كول سنتر"},
        ],
    },
    "cu-005": {
        "title": "Multi-Channel Service",
        "prereq": ["cu-001"],
        "related": ["cu-008", "cu-012", "cc-012", "so-005"],
        "bridge": [
            {"target": "cu-008", "rel": "extends",    "label": "خدمة — تشريح رحلة الشكوى"},
            {"target": "so-005", "rel": "applies-in", "label": "Social — قنوات الشكوى الاجتماعية",              "page_tag": "Social"},
        ],
    },
    "cu-008": {
        "title": "Complaint Anatomy — تشريح الشكوى",
        "prereq": ["cu-001", "cu-005"],
        "related": ["cu-012", "cc-042", "so-002", "ps-010"],
        "bridge": [
            {"target": "cu-012", "rel": "extends",    "label": "خدمة — استرداد الزبون المفقود"},
            {"target": "cc-042", "rel": "applies-in", "label": "كول سنتر — تشريح المكالمة الموازي",            "page_tag": "كول سنتر"},
        ],
    },
    "cu-012": {
        "title": "Service Recovery — استرداد الزبون",
        "prereq": ["cu-001", "cu-008"],
        "related": ["cu-005", "cu-008", "ng-010", "eq-020"],
        "bridge": [
            {"target": "ng-010", "rel": "applies-in", "label": "تفاوض — Win-Win لاستعادة الثقة",              "page_tag": "تفاوض"},
        ],
    },

    # ━━━ PROGRAMMING (6) ━━━
    "pg-001": {
        "title": "Big-O — تكلفة الخوارزمية",
        "prereq": [],
        "related": ["pg-010", "pg-020", "pg-030", "pr-041"],
        "bridge": [
            {"target": "pg-010", "rel": "extends",    "label": "البرمجة — Clean Code Pillars"},
            {"target": "pr-041", "rel": "applies-in", "label": "إصلاح الهاتف — تشخيص الأعطال البرمجية",         "page_tag": "صيانة"},
        ],
    },
    "pg-010": {
        "title": "Clean Code Pillars — أعمدة الكود النظيف",
        "prereq": ["pg-001"],
        "related": ["pg-020", "pg-030", "pg-050"],
        "bridge": [
            {"target": "pg-020", "rel": "extends",    "label": "البرمجة — Code Review Etiquette"},
        ],
    },
    "pg-020": {
        "title": "Code Review — أخلاقيات المراجعة",
        "prereq": ["pg-001", "pg-010"],
        "related": ["pg-030", "pg-050", "hr-035"],
        "bridge": [
            {"target": "pg-030", "rel": "extends",    "label": "البرمجة — مهارات ناعمة"},
            {"target": "hr-035", "rel": "applies-in", "label": "HR — تقديم نفسك في مقابلة برمجة",              "page_tag": "HR"},
        ],
    },
    "pg-030": {
        "title": "Soft Skills — مهارات ناعمة للبرمجة",
        "prereq": ["pg-010"],
        "related": ["pg-050", "pg-060", "hr-035", "eq-005"],
        "bridge": [
            {"target": "pg-050", "rel": "extends",    "label": "البرمجة — مختبرات تفاعلية"},
            {"target": "eq-005", "rel": "applies-in", "label": "EQ — الوعي الذاتي مع زملاء التطوير",            "page_tag": "EQ"},
        ],
    },
    "pg-050": {
        "title": "Interactive Programming Labs",
        "prereq": ["pg-001", "pg-010", "pg-020"],
        "related": ["pg-001", "pg-020", "pg-060", "lb-001"],
        "bridge": [
            {"target": "pg-060", "rel": "extends",    "label": "البرمجة — Iraq Salary + Companies"},
            {"target": "lb-001", "rel": "applies-in", "label": "Lab — التجربة كمنهج للمبرمج",                 "page_tag": "Lab"},
        ],
    },
    "pg-060": {
        "title": "Iraq Tech Salary + Companies",
        "prereq": ["pg-001", "pg-010"],
        "related": ["pg-050", "hr-038", "ac-002"],
        "bridge": [
            {"target": "hr-038", "rel": "applies-in", "label": "HR — تفاوض الراتب التقني",                    "page_tag": "HR"},
        ],
    },

    # ━━━ ACCOUNTING (8) ━━━
    "ac-001": {
        "title": "ضريبة العراق — Tax Calculator",
        "prereq": [],
        "related": ["ac-002", "ac-005", "ac-008", "fs-001"],
        "bridge": [
            {"target": "ac-002", "rel": "extends",    "label": "محاسبة — قسيمة الراتب"},
            {"target": "fs-001", "rel": "applies-in", "label": "مبيعات — حساب صافي العمولة بعد الضريبة",       "page_tag": "مبيعات"},
        ],
    },
    "ac-002": {
        "title": "Salary Slip — قسيمة الراتب",
        "prereq": ["ac-001"],
        "related": ["ac-001", "ac-005", "fs-001", "hr-038"],
        "bridge": [
            {"target": "ac-005", "rel": "extends",    "label": "محاسبة — المعادلة الأساسية"},
            {"target": "hr-038", "rel": "applies-in", "label": "HR — قراءة قسيمة في عرض العمل",                "page_tag": "HR"},
        ],
    },
    "ac-005": {
        "title": "المعادلة المحاسبية الأساسية",
        "prereq": ["ac-001", "ac-002"],
        "related": ["ac-008", "ac-010", "ac-015", "ac-020"],
        "bridge": [
            {"target": "ac-008", "rel": "extends",    "label": "محاسبة — حساب T-Account"},
        ],
    },
    "ac-008": {
        "title": "T-Account — حساب التي",
        "prereq": ["ac-001", "ac-005"],
        "related": ["ac-005", "ac-010", "ac-015"],
        "bridge": [
            {"target": "ac-010", "rel": "extends",    "label": "محاسبة — دورة 9 خطوات"},
        ],
    },
    "ac-010": {
        "title": "9-Step Accounting Cycle",
        "prereq": ["ac-005", "ac-008"],
        "related": ["ac-008", "ac-015", "ac-020", "ac-025"],
        "bridge": [
            {"target": "ac-015", "rel": "extends",    "label": "محاسبة — مخطط COA العراقي"},
        ],
    },
    "ac-015": {
        "title": "Iraqi COA — مخطط الحسابات",
        "prereq": ["ac-005", "ac-010"],
        "related": ["ac-010", "ac-020", "ac-025", "am-005"],
        "bridge": [
            {"target": "ac-020", "rel": "extends",    "label": "محاسبة — IFRS مقابل المحلي"},
            {"target": "am-005", "rel": "applies-in", "label": "KAM — استخدام COA في QBR",                    "page_tag": "KAM"},
        ],
    },
    "ac-020": {
        "title": "IFRS vs Local — مقارنة",
        "prereq": ["ac-005", "ac-010", "ac-015"],
        "related": ["ac-015", "ac-025"],
        "bridge": [
            {"target": "ac-025", "rel": "extends",    "label": "محاسبة — 10 نسب مالية"},
        ],
    },
    "ac-025": {
        "title": "10 Financial Ratios",
        "prereq": ["ac-005", "ac-015", "ac-020"],
        "related": ["ac-015", "ac-020", "am-005"],
        "bridge": [
            {"target": "am-005", "rel": "applies-in", "label": "KAM — النسب في تحليل عميل",                  "page_tag": "KAM"},
        ],
    },

    # ━━━ PHONEREPAIR (3) ━━━
    "pr-041": {
        "title": "Micro-Solder — أساسيات اللحام",
        "prereq": ["pr-001"],
        "related": ["pr-045", "pr-053", "pg-001"],
        "bridge": [
            {"target": "pr-045", "rel": "extends",    "label": "إصلاح — لحام متقدم تحت البصر المكبّر"},
            {"target": "pg-001", "rel": "contrasts",  "label": "البرمجة — وجه آخر للتقنية",                    "page_tag": "البرمجة"},
        ],
    },
    "pr-045": {
        "title": "Advanced Micro-Solder",
        "prereq": ["pr-001", "pr-041"],
        "related": ["pr-041", "pr-053"],
        "bridge": [
            {"target": "pr-053", "rel": "extends",    "label": "إصلاح — أخلاقيات الورشة"},
        ],
    },
    "pr-053": {
        "title": "Repair Ethics — أخلاقيات الورشة",
        "prereq": ["pr-001"],
        "related": ["pr-041", "pr-045", "cu-008"],
        "bridge": [
            {"target": "cu-008", "rel": "applies-in", "label": "خدمة — التعامل مع شكوى ضرر تصنّعي",           "page_tag": "خدمة الزبون"},
        ],
    },

    # ━━━ HRMASTERY (5) ━━━
    "hr-035": {
        "title": "STAR Framework — مقابلة سلوكية",
        "prereq": ["hr-001"],
        "related": ["hr-038", "hr-040", "ng-005", "eq-005"],
        "bridge": [
            {"target": "hr-038", "rel": "extends",    "label": "HR — تفاوض الراتب"},
            {"target": "eq-005", "rel": "applies-in", "label": "EQ — الوعي الذاتي قبل المقابلة",                "page_tag": "EQ"},
        ],
    },
    "hr-038": {
        "title": "Salary Negotiation Calculator",
        "prereq": ["hr-001", "hr-035"],
        "related": ["hr-040", "hr-050", "ng-001", "ac-002"],
        "bridge": [
            {"target": "hr-040", "rel": "extends",    "label": "HR — 30 سؤال فخّ"},
            {"target": "ng-001", "rel": "applies-in", "label": "تفاوض — BATNA على راتبك",                       "page_tag": "تفاوض"},
        ],
    },
    "hr-040": {
        "title": "30 Trap Questions — أسئلة فخّ",
        "prereq": ["hr-001", "hr-035", "hr-038"],
        "related": ["hr-038", "hr-050", "hr-060", "ng-008"],
        "bridge": [
            {"target": "hr-050", "rel": "extends",    "label": "HR — 15 سيناريو محاكاة"},
            {"target": "ng-008", "rel": "applies-in", "label": "تفاوض — تكتيكات تحت ضغط",                      "page_tag": "تفاوض"},
        ],
    },
    "hr-050": {
        "title": "15 Scenarios Player",
        "prereq": ["hr-035", "hr-040"],
        "related": ["hr-040", "hr-060", "ng-008"],
        "bridge": [
            {"target": "hr-060", "rel": "extends",    "label": "HR — قانون العمل العراقي"},
        ],
    },
    "hr-060": {
        "title": "Iraq Labor Law — قانون العمل",
        "prereq": ["hr-001", "hr-038"],
        "related": ["hr-038", "hr-050", "ac-001", "ac-002"],
        "bridge": [
            {"target": "ac-001", "rel": "applies-in", "label": "محاسبة — ضريبة الدخل تطبيقاً للقانون",          "page_tag": "محاسبة"},
        ],
    },
}

# ─── 8 Cross-page bridges (sacred number) ────────────────────────
CROSS_BRIDGES = [
    {
        "from_page": "page-psych", "to_page": "page-eq",
        "title": "ما بعد علم النفس",
        "desc": "علم النفس يُفسّر الدوافع والانحيازات. الذكاء العاطفي يحوّلها لمهارة عملية يومية.",
        "cta_text": "تابع لـ صفحة الذكاء العاطفي",
    },
    {
        "from_page": "page-callcenter", "to_page": "page-customercare",
        "title": "ما بعد الكول سنتر",
        "desc": "ما تعلّمته للمكالمات الفردية يتحوّل لخدمة زبون شاملة عبر كل قناة.",
        "cta_text": "تابع لـ صفحة خدمة الزبون",
    },
    {
        "from_page": "page-accounting", "to_page": "page-accountmgr",
        "title": "ما بعد المحاسبة",
        "desc": "المحاسبة هي اللغة. إدارة الحسابات الكبيرة تستعملها لقراءة عميل، تخطيط حساب، وقيادة QBR.",
        "cta_text": "تابع لـ صفحة إدارة الحسابات",
    },
    {
        "from_page": "page-hrmastery", "to_page": "page-negotiation",
        "title": "ما بعد إتقان HR",
        "desc": "كل مقابلة هي تفاوض مقنّع. الراتب، الترقية، حتى الإجازة — التفاوض يبدأ حيث ينتهي السؤال.",
        "cta_text": "تابع لـ صفحة التفاوض",
    },
    {
        "from_page": "page-social", "to_page": "page-fieldsales",
        "title": "ما بعد التسويق الاجتماعي",
        "desc": "Hooks في المحتوى = Discovery في الميدان. مدارس البيع والـ Funnels تُتمّ ما بدأه الـ Hook.",
        "cta_text": "تابع لـ صفحة المبيعات الميدانية",
    },
    {
        "from_page": "page-programming", "to_page": "page-phonerepair",
        "title": "ما بعد البرمجة",
        "desc": "البرمجيات والصيانة وجهان لتقنية واحدة — التشخيص الكوْدي والتشخيص الفيزيائي يلتقيان في المنطق.",
        "cta_text": "تابع لـ صفحة صيانة الهاتف",
    },
    {
        "from_page": "page-lab", "to_page": "page-social",
        "title": "ما بعد المختبر",
        "desc": "كل تجربة في الـ Lab تنتج مادة جاهزة للنشر. حوّل ما تعلّمته لمحتوى يُلهم متابعيك.",
        "cta_text": "تابع لـ صفحة Social",
    },
    {
        "from_page": "page-eq", "to_page": "page-negotiation",
        "title": "ما بعد الذكاء العاطفي",
        "desc": "EQ هو سرّ التفاوض الناجح. الوعي بالذات والتنظيم العاطفي يحوّلانك من ضحية لذكاء طاولة المفاوضات.",
        "cta_text": "تابع لـ صفحة التفاوض",
    },
]

# Relation labels (Arabic, fixed)
REL_LABEL = {
    "extends":    "يُعمّق",
    "applies-in": "يُطبَّق في",
    "contrasts":  "يقابل",
    "prereq-for": "يُمهّد لـ",
    "cheat":      "ورقة الخلاصة",
    "case":       "حالة تطبيقية",
    "practice":   "تمرين متعلق",
}


def update_attr(line: str, attr: str, value: str) -> str:
    """Update or insert an HTML attribute on a single tag line. Idempotent re-write."""
    pattern = re.compile(rf'\s{re.escape(attr)}="[^"]*"')
    if pattern.search(line):
        return pattern.sub(f' {attr}="{value}"', line, count=1)
    # Insert before the tag's closing >
    return re.sub(r'(>)', f' {attr}="{value}"\\1', line, count=1)


def has_attr(line: str, attr: str) -> bool:
    return re.search(rf'\s{re.escape(attr)}="[^"]*"', line) is not None


def has_attr_value(line: str, attr: str, value: str) -> bool:
    m = re.search(rf'\s{re.escape(attr)}="([^"]*)"', line)
    return m is not None and m.group(1) == value


def find_block_line(lines: list[str], block_id: str) -> int:
    """Find the line index of the opening tag with data-block-id="X"."""
    needle = f'data-block-id="{block_id}"'
    for i, line in enumerate(lines):
        if needle in line:
            return i
    return -1


def find_practice_section_end(lines: list[str], block_id: str) -> int:
    """Find the line index of the </section> closing the block-practice."""
    open_marker = f'<section class="block-practice" data-practice-for="{block_id}"'
    open_idx = -1
    for i, line in enumerate(lines):
        if open_marker in line:
            open_idx = i
            break
    if open_idx < 0:
        return -1
    # Walk forward, track open <section ... > and closing </section> at any indent
    depth = 0
    for i in range(open_idx, len(lines)):
        line = lines[i]
        # Count opens (might be more than one on one line; rare)
        for m in re.finditer(r'<section\b', line):
            depth += 1
        for m in re.finditer(r'</section>', line):
            depth -= 1
            if depth == 0:
                return i
    return -1


def find_page_close(lines: list[str], page_id: str) -> int:
    """Find the </section> that closes <section class="page" id="page-X">."""
    needle = f'/{page_id}'
    for i, line in enumerate(lines):
        if '</section>' in line and needle in line:
            return i
    # Fallback: page-myprogress closes plain </section> at line near end
    for i, line in enumerate(lines):
        if f'id="{page_id}"' in line:
            depth = 0
            for j in range(i, len(lines)):
                ln = lines[j]
                for _ in re.finditer(r'<section\b', ln):
                    depth += 1
                for _ in re.finditer(r'</section>', ln):
                    depth -= 1
                    if depth == 0:
                        return j
            break
    return -1


def render_prereq_chip(block_id: str, prereqs: list[str], indent: str) -> list[str]:
    if not prereqs:
        return []
    items = []
    for p in prereqs:
        items.append(f'{indent}    <li class="block-prereq-chip-item"><a href="#{p}" data-prereq-target="{p}">{p}</a></li>')
    return [
        f'{indent}<div class="block-prereq-chip" data-prereq-for="{block_id}" aria-label="متطلبات معرفية">',
        f'{indent}  <span class="block-prereq-chip-icon" aria-hidden="true">↑</span>',
        f'{indent}  <span class="block-prereq-chip-label type-eyebrow">يحتاج فهم:</span>',
        f'{indent}  <ol class="block-prereq-chip-list">',
        *items,
        f'{indent}  </ol>',
        f'{indent}</div>',
    ]


def render_bridge(block_id: str, bridge_items: list[dict], indent: str) -> list[str]:
    if not bridge_items:
        return []
    out = [
        f'{indent}<nav class="block-bridge" data-bridge-for="{block_id}" aria-label="تابع التعلم">',
        f'{indent}  <header class="block-bridge-h">',
        f'{indent}    <span class="block-bridge-eyebrow type-eyebrow">تابع التعلم</span>',
        f'{indent}    <h4 class="block-bridge-title type-display-h">المسار التالي</h4>',
        f'{indent}  </header>',
        f'{indent}  <ul class="block-bridge-list">',
    ]
    for item in bridge_items:
        target   = item["target"]
        rel      = item["rel"]
        label    = item["label"]
        page_tag = item.get("page_tag")
        meta     = item.get("meta")
        is_cross = page_tag is not None
        is_cheat = rel == "cheat"
        cls_mod  = "--cheat" if is_cheat else ("--crosspage" if is_cross else "--inpage")
        meta_html_parts = []
        if page_tag:
            meta_html_parts.append(f'<span class="block-bridge-page-tag">{page_tag}</span>')
        if meta:
            meta_html_parts.append(f'<span>{meta}</span>')
        meta_html = ' · '.join(meta_html_parts) if meta_html_parts else ''
        out.extend([
            f'{indent}    <li class="block-bridge-item block-bridge-item{cls_mod}">',
            f'{indent}      <a class="block-bridge-link" href="#{target}" data-bridge-target="{target}" data-bridge-relation="{rel}">',
            f'{indent}        <span class="block-bridge-relation type-eyebrow">{REL_LABEL[rel]}</span>',
            f'{indent}        <span class="block-bridge-target-title type-body-lead">{label}</span>',
            f'{indent}        <span class="block-bridge-meta type-num">{meta_html}</span>',
            f'{indent}      </a>',
            f'{indent}    </li>',
        ])
    out.extend([
        f'{indent}  </ul>',
        f'{indent}</nav>',
    ])
    return out


def render_cross_bridge(b: dict, indent: str) -> list[str]:
    return [
        f'{indent}<aside class="block-bridge block-bridge--cross-page" data-cross-bridge-from="{b["from_page"]}" data-cross-bridge-to="{b["to_page"]}" aria-label="جسر بين الصفحتين">',
        f'{indent}  <header class="block-bridge-h">',
        f'{indent}    <span class="block-bridge-eyebrow type-eyebrow">جسر تعلّمي</span>',
        f'{indent}    <h3 class="block-bridge-title type-display">{b["title"]}</h3>',
        f'{indent}  </header>',
        f'{indent}  <p class="block-bridge-desc type-body-lead">{b["desc"]}</p>',
        f'{indent}  <a class="block-bridge-cta type-button" href="#{b["to_page"]}" data-cross-bridge-cta="{b["to_page"].replace("page-","")}">',
        f'{indent}    {b["cta_text"]} <span aria-hidden="true">←</span>',
        f'{indent}  </a>',
        f'{indent}</aside>',
    ]


def get_indent(line: str) -> str:
    return re.match(r'^(\s*)', line).group(1)


def existing_chip_line(lines: list[str], block_id: str) -> bool:
    needle = f'data-prereq-for="{block_id}"'
    return any(needle in ln for ln in lines)


def existing_bridge_line(lines: list[str], block_id: str) -> bool:
    needle = f'data-bridge-for="{block_id}"'
    return any(needle in ln for ln in lines)


def existing_cross_bridge(lines: list[str], from_page: str) -> bool:
    needle = f'data-cross-bridge-from="{from_page}"'
    return any(needle in ln for ln in lines)


# ─── MAIN ────────────────────────────────────────────────────────
def main():
    text  = HTML.read_text(encoding="utf-8")
    lines = text.split("\n")

    stats = {"prereq_chips": 0, "bridges": 0, "augmented_related": 0,
             "augmented_prereq": 0, "cross_bridges": 0, "skipped_idempotent": 0}

    # Order: process anchors by their line position in REVERSE so later inserts don't shift
    anchor_lines = []
    for block_id in ANCHORS.keys():
        idx = find_block_line(lines, block_id)
        if idx < 0:
            print(f"  ⚠️  {block_id}: block opening tag not found")
            continue
        anchor_lines.append((idx, block_id))
    # Sort by line index descending → process later blocks first to keep earlier indices stable
    anchor_lines.sort(key=lambda x: x[0], reverse=True)

    for idx, block_id in anchor_lines:
        spec = ANCHORS[block_id]
        block_line = lines[idx]
        block_indent = get_indent(block_line)

        # ─── Step A: AUGMENT data-related (idempotent: only if missing) ───
        if spec["related"] and not has_attr(block_line, "data-related"):
            new_line = update_attr(block_line, "data-related", ",".join(spec["related"]))
            lines[idx] = new_line
            block_line = new_line
            stats["augmented_related"] += 1

        # ─── Step B: AUGMENT data-prereq (overwrite only if it's empty/missing OR  ───
        # ───         current value is a single-id legacy from P1 like "pr-001"; expand it) ───
        if spec["prereq"]:
            if not has_attr(block_line, "data-prereq"):
                new_line = update_attr(block_line, "data-prereq", ",".join(spec["prereq"]))
                lines[idx] = new_line
                block_line = new_line
                stats["augmented_prereq"] += 1
            else:
                # If existing value doesn't include all our prereqs, MERGE (keep idempotent)
                m = re.search(r'\sdata-prereq="([^"]*)"', block_line)
                existing = [s.strip() for s in m.group(1).split(",") if s.strip()]
                merged = list(dict.fromkeys(existing + spec["prereq"]))[:3]  # dedupe, cap 3
                if merged != existing:
                    new_line = update_attr(block_line, "data-prereq", ",".join(merged))
                    lines[idx] = new_line
                    block_line = new_line
                    stats["augmented_prereq"] += 1

        # ─── Step C: INSERT block-prereq-chip BEFORE the block ───
        # Resolve effective prereqs (post-merge)
        m_pr = re.search(r'\sdata-prereq="([^"]*)"', lines[idx])
        eff_prereqs = [s.strip() for s in m_pr.group(1).split(",") if s.strip()] if m_pr else []
        if eff_prereqs and not existing_chip_line(lines, block_id):
            chip_lines = render_prereq_chip(block_id, eff_prereqs, block_indent)
            # Insert immediately before this block's line
            lines[idx:idx] = chip_lines
            stats["prereq_chips"] += 1

        # ─── Step D: INSERT block-bridge AFTER the corresponding block-practice ───
        if spec["bridge"] and not existing_bridge_line(lines, block_id):
            end_idx = find_practice_section_end(lines, block_id)
            if end_idx > 0:
                # Use the indent of the practice opening tag, not the block's
                # (block-practice may be nested deeper). Find practice opening.
                practice_open = -1
                for k in range(end_idx, -1, -1):
                    if f'<section class="block-practice" data-practice-for="{block_id}"' in lines[k]:
                        practice_open = k
                        break
                pr_indent = get_indent(lines[practice_open]) if practice_open >= 0 else block_indent
                bridge_lines = render_bridge(block_id, spec["bridge"], pr_indent)
                lines[end_idx + 1:end_idx + 1] = bridge_lines
                stats["bridges"] += 1
            else:
                print(f"  ⚠️  {block_id}: practice section not found, skipping bridge")
        elif existing_bridge_line(lines, block_id):
            stats["skipped_idempotent"] += 1

    # ─── Step E: 8 Cross-page bridges (insert before page closing) ───
    # Process in reverse page order
    for b in reversed(CROSS_BRIDGES):
        if existing_cross_bridge(lines, b["from_page"]):
            continue
        close_idx = find_page_close(lines, b["from_page"])
        if close_idx < 0:
            print(f"  ⚠️  {b['from_page']}: closing </section> not found")
            continue
        page_close_indent = get_indent(lines[close_idx])
        # Inner indent for content = page_close_indent + 2 spaces
        inner_indent = page_close_indent + "  "
        block_lines = render_cross_bridge(b, inner_indent)
        # Add a blank line before the bridge for breathing room
        lines[close_idx:close_idx] = ["", *block_lines, ""]
        stats["cross_bridges"] += 1

    HTML.write_text("\n".join(lines), encoding="utf-8")

    print("─" * 60)
    print("Worker 17 Phase 5 — Cross-References & Bridges")
    print("─" * 60)
    for k, v in stats.items():
        print(f"  {k:25s}: {v}")
    print("─" * 60)


if __name__ == "__main__":
    main()
