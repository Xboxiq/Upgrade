import 'package:flutter/material.dart';

/// Element-wise lerp for multi-stop gradients (dark & light share stop counts).
List<Color> _lerpGradient(List<Color> a, List<Color> b, double t) {
  final int n = a.length < b.length ? a.length : b.length;
  return <Color>[for (int i = 0; i < n; i++) Color.lerp(a[i], b[i], t)!];
}

/// ════════════════════════════════════════════════════════════════════════
/// AppPalette — the "Midnight Indigo" colour system (ThemeExtension).
///
/// Deep midnight blue + a deep blue-violet, used with restraint. The "AI look"
/// is NOT the hue — it is the *execution*: glowing/lighter-coloured borders,
/// halos and soft shadows around boxes & icons. Those are banned here. Depth is
/// material & real: tonal surfaces + fine grain, no glow, no lighter rim.
///
/// Two accent poles, used sparingly:
///   • FLOW — azure-indigo → progress, mastery, active, identity.
///   • SPARK — blue-violet → calls-to-action, energy.
/// Neutral ink carries most of the UI; accents are seasoning, not paint.
/// ════════════════════════════════════════════════════════════════════════
@immutable
class AppPalette extends ThemeExtension<AppPalette> {
  const AppPalette({
    required this.canvas,
    required this.canvasSink,
    required this.surface1,
    required this.surface2,
    required this.fill,
    required this.materialTint,
    required this.glassTint,
    required this.ink,
    required this.inkMuted,
    required this.inkFaint,
    required this.line,
    required this.lineStrong,
    required this.seam,
    required this.brand,
    required this.brandDeep,
    required this.tide,
    required this.tideGradient,
    required this.spark,
    required this.sparkDeep,
    required this.sparkGradient,
    required this.success,
    required this.warning,
    required this.isDark,
  });

  final Color canvas;
  final Color canvasSink;
  final Color surface1;
  final Color surface2;
  final Color fill;
  final Color materialTint;
  final Color glassTint;
  final Color ink;
  final Color inkMuted;
  final Color inkFaint;
  final Color line;
  final Color lineStrong;

  /// A DARKER hairline (a real seam/groove between materials) — never a
  /// lighter, glowing rim. Used only where separation truly needs an edge.
  final Color seam;

  final Color brand;
  final Color brandDeep;
  final Color tide;
  final List<Color> tideGradient;
  final Color spark;
  final Color sparkDeep;
  final List<Color> sparkGradient;
  final Color success;
  final Color warning;
  final bool isDark;

  // Back-compat aliases.
  Color get gold => tide;
  List<Color> get goldGradient => tideGradient;
  Color get accentProgress => tide;
  List<Color> get progressGradient => tideGradient;
  Color get accentAction => spark;

  Color get onSpark => Colors.white;
  Color get onTide => Colors.white;

  /// Deep midnight indigo. The primary, dark-first identity.
  static const AppPalette dark = AppPalette(
    canvas: Color(0xFF0B0E1A), // deep midnight blue
    canvasSink: Color(0xFF06080E),
    surface1: Color(0xFF141826),
    surface2: Color(0xFF1E2335),
    fill: Color(0x0DFFFFFF), // white ~0.05
    materialTint: Color(0xCC0E1220),
    glassTint: Color(0xB8141826),
    ink: Color(0xFFE8EBF4),
    inkMuted: Color(0xFF969CB2),
    inkFaint: Color(0xFF5C627A),
    line: Color(0x12FFFFFF),
    lineStrong: Color(0x22FFFFFF),
    seam: Color(0x66000000), // dark groove
    brand: Color(0xFF6E8BFF), // azure-indigo
    brandDeep: Color(0xFF4F6BE8),
    tide: Color(0xFF6E8BFF),
    tideGradient: <Color>[Color(0xFF86A2FF), Color(0xFF6E8BFF), Color(0xFF5774EE)],
    spark: Color(0xFF9B8CFF), // blue-violet
    sparkDeep: Color(0xFF7B6BF0),
    sparkGradient: <Color>[Color(0xFFB3A8FF), Color(0xFF7B6BF0)],
    success: Color(0xFF34C98A),
    warning: Color(0xFFEBB54A),
    isDark: true,
  );

  /// Cool daylight. Accents deepen to hold WCAG AA.
  static const AppPalette light = AppPalette(
    canvas: Color(0xFFEEF0F6),
    canvasSink: Color(0xFFE0E3EE),
    surface1: Color(0xFFFFFFFF),
    surface2: Color(0xFFF7F8FC),
    fill: Color(0x0D000000),
    materialTint: Color(0xE6F4F6FB),
    glassTint: Color(0xE6FFFFFF),
    ink: Color(0xFF14161F),
    inkMuted: Color(0xFF585E72),
    inkFaint: Color(0xFF9197A8),
    line: Color(0x14000000),
    lineStrong: Color(0x24000000),
    seam: Color(0x1A000000),
    brand: Color(0xFF4257C8),
    brandDeep: Color(0xFF33429E),
    tide: Color(0xFF4257C8),
    tideGradient: <Color>[Color(0xFF5B72E6), Color(0xFF4257C8), Color(0xFF3A4FB8)],
    spark: Color(0xFF6D4FD8),
    sparkDeep: Color(0xFF563CB0),
    sparkGradient: <Color>[Color(0xFF7C5BE8), Color(0xFF563CB0)],
    success: Color(0xFF1E9E63),
    warning: Color(0xFFB5781A),
    isDark: false,
  );

  @override
  AppPalette copyWith({
    Color? canvas,
    Color? canvasSink,
    Color? surface1,
    Color? surface2,
    Color? fill,
    Color? materialTint,
    Color? glassTint,
    Color? ink,
    Color? inkMuted,
    Color? inkFaint,
    Color? line,
    Color? lineStrong,
    Color? seam,
    Color? brand,
    Color? brandDeep,
    Color? tide,
    List<Color>? tideGradient,
    Color? spark,
    Color? sparkDeep,
    List<Color>? sparkGradient,
    Color? success,
    Color? warning,
    bool? isDark,
  }) {
    return AppPalette(
      canvas: canvas ?? this.canvas,
      canvasSink: canvasSink ?? this.canvasSink,
      surface1: surface1 ?? this.surface1,
      surface2: surface2 ?? this.surface2,
      fill: fill ?? this.fill,
      materialTint: materialTint ?? this.materialTint,
      glassTint: glassTint ?? this.glassTint,
      ink: ink ?? this.ink,
      inkMuted: inkMuted ?? this.inkMuted,
      inkFaint: inkFaint ?? this.inkFaint,
      line: line ?? this.line,
      lineStrong: lineStrong ?? this.lineStrong,
      seam: seam ?? this.seam,
      brand: brand ?? this.brand,
      brandDeep: brandDeep ?? this.brandDeep,
      tide: tide ?? this.tide,
      tideGradient: tideGradient ?? this.tideGradient,
      spark: spark ?? this.spark,
      sparkDeep: sparkDeep ?? this.sparkDeep,
      sparkGradient: sparkGradient ?? this.sparkGradient,
      success: success ?? this.success,
      warning: warning ?? this.warning,
      isDark: isDark ?? this.isDark,
    );
  }

  @override
  AppPalette lerp(ThemeExtension<AppPalette>? other, double t) {
    if (other is! AppPalette) return this;
    return AppPalette(
      canvas: Color.lerp(canvas, other.canvas, t)!,
      canvasSink: Color.lerp(canvasSink, other.canvasSink, t)!,
      surface1: Color.lerp(surface1, other.surface1, t)!,
      surface2: Color.lerp(surface2, other.surface2, t)!,
      fill: Color.lerp(fill, other.fill, t)!,
      materialTint: Color.lerp(materialTint, other.materialTint, t)!,
      glassTint: Color.lerp(glassTint, other.glassTint, t)!,
      ink: Color.lerp(ink, other.ink, t)!,
      inkMuted: Color.lerp(inkMuted, other.inkMuted, t)!,
      inkFaint: Color.lerp(inkFaint, other.inkFaint, t)!,
      line: Color.lerp(line, other.line, t)!,
      lineStrong: Color.lerp(lineStrong, other.lineStrong, t)!,
      seam: Color.lerp(seam, other.seam, t)!,
      brand: Color.lerp(brand, other.brand, t)!,
      brandDeep: Color.lerp(brandDeep, other.brandDeep, t)!,
      tide: Color.lerp(tide, other.tide, t)!,
      tideGradient: _lerpGradient(tideGradient, other.tideGradient, t),
      spark: Color.lerp(spark, other.spark, t)!,
      sparkDeep: Color.lerp(sparkDeep, other.sparkDeep, t)!,
      sparkGradient: _lerpGradient(sparkGradient, other.sparkGradient, t),
      success: Color.lerp(success, other.success, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
      isDark: t < 0.5 ? isDark : other.isDark,
    );
  }
}

extension PaletteX on BuildContext {
  AppPalette get palette =>
      Theme.of(this).extension<AppPalette>() ?? AppPalette.dark;
}
