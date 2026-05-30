import 'package:flutter/widgets.dart';

import '../../theme/app_icons.dart';

/// A training "world" — one self-contained domain of mastery on the platform.
/// Call Center is fully built; the others are seeded and unlock progressively.
class TrainingWorld {
  const TrainingWorld({
    required this.id,
    required this.title,
    required this.tagline,
    required this.icon,
    required this.unitsDone,
    required this.unitsTotal,
    required this.available,
  });

  final String id;
  final String title;
  final String tagline;
  final IconData icon;
  final int unitsDone;
  final int unitsTotal;
  final bool available;

  double get progress => unitsTotal == 0 ? 0 : unitsDone / unitsTotal;
}

abstract class Worlds {
  static const List<TrainingWorld> all = <TrainingWorld>[
    TrainingWorld(
      id: 'callcenter',
      title: 'الكول سنتر',
      tagline: 'الاستقبال، النبرة، تهدئة الغاضب، التعاطف',
      icon: AppIcons.headset,
      unitsDone: 26,
      unitsTotal: 69,
      available: true,
    ),
    TrainingWorld(
      id: 'fieldsales',
      title: 'المبيعات الميدانية',
      tagline: 'بناء الثقة، معالجة الاعتراضات، الإغلاق',
      icon: AppIcons.target,
      unitsDone: 0,
      unitsTotal: 54,
      available: false,
    ),
    TrainingWorld(
      id: 'negotiation',
      title: 'التفاوض وعلم النفس',
      tagline: 'التأثير، الإنصات التكتيكي، لغة الجسد',
      icon: AppIcons.scales,
      unitsDone: 0,
      unitsTotal: 41,
      available: false,
    ),
    TrainingWorld(
      id: 'customercare',
      title: 'خدمة العملاء',
      tagline: 'الرضا، الاحتفاظ، تحويل الشكوى لولاء',
      icon: AppIcons.heart,
      unitsDone: 0,
      unitsTotal: 38,
      available: false,
    ),
    TrainingWorld(
      id: 'programming',
      title: 'البرمجة',
      tagline: 'منطق، حلّ المشكلات، التفكير الحاسوبي',
      icon: AppIcons.command,
      unitsDone: 0,
      unitsTotal: 60,
      available: false,
    ),
  ];

  static TrainingWorld get callCenter => all[0];

  /// Platform-wide mastery (units completed across all worlds).
  static double get overallProgress {
    int done = 0;
    int total = 0;
    for (final TrainingWorld w in all) {
      done += w.unitsDone;
      total += w.unitsTotal;
    }
    return total == 0 ? 0 : done / total;
  }

  static int get unitsDone =>
      all.fold(0, (int s, TrainingWorld w) => s + w.unitsDone);
  static int get unitsTotal =>
      all.fold(0, (int s, TrainingWorld w) => s + w.unitsTotal);
}
