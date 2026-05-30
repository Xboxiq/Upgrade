import 'package:flutter/animation.dart';

/// ════════════════════════════════════════════════════════════════════════
/// TADAFFUQ — Design Tokens
/// The single source of truth for spacing, radii and motion. No widget
/// invents its own magic numbers; everything traces back here.
/// ════════════════════════════════════════════════════════════════════════

/// 4-pt based spacing scale.
abstract class Space {
  static const double x1 = 4;
  static const double x2 = 8;
  static const double x3 = 12;
  static const double x4 = 16;
  static const double x5 = 20;
  static const double x6 = 24;
  static const double x8 = 32;
  static const double x10 = 40;
  static const double x12 = 48;
  static const double x16 = 64;
  static const double x20 = 80;
}

/// Corner radii — generous, premium rounding (16–28).
abstract class Radii {
  static const double xs = 8;
  static const double sm = 12;
  static const double md = 16;
  static const double lg = 20;
  static const double xl = 28;
  static const double pill = 999;
}

/// Motion — the canonical durations + signature curves. Snappy on entrance,
/// patient on return; a single controlled overshoot on tactile presses.
abstract class Motion {
  static const Duration instant = Duration(milliseconds: 90);
  static const Duration snap = Duration(milliseconds: 180);
  static const Duration quick = Duration(milliseconds: 240);
  static const Duration emerge = Duration(milliseconds: 320);
  static const Duration panel = Duration(milliseconds: 420);
  static const Duration morph = Duration(milliseconds: 520);
  static const Duration zen = Duration(milliseconds: 680);
  static const Duration breathe = Duration(milliseconds: 2400);

  /// Confident decelerate — the iOS sliding-panel feel.
  static const Cubic standard = Cubic(0.32, 0.72, 0, 1);

  /// Emphasized decelerate for large surface morphs.
  static const Cubic emphasized = Cubic(0.2, 0, 0, 1);

  /// Symmetric ease for quick state flips.
  static const Cubic snapCurve = Cubic(0.4, 0, 0.2, 1);

  /// Single controlled overshoot — used on press release & ring bloom.
  static const Curve spring = Curves.easeOutBack;
}
