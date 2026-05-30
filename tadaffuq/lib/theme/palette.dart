import 'package:flutter/material.dart';

/// ════════════════════════════════════════════════════════════════════════
/// AppPalette — the "Aurora Tide" colour system, delivered as a ThemeExtension
/// so any widget reads `context.palette` and stays correct in both modes.
///
/// DOCTRINE (see DESIGN.md): تَدَفُّق means *flow*. Mastery is a rising tide.
/// Exactly TWO accent poles, each with one job — colour is never decorative:
///   • COOL — cyan "tide"  → progress, mastery, active, identity ("you").
///   • WARM — orange "spark" → calls-to-action, "do this now", energy.
/// Plus neutral ink over deep space (dark) / oatmeal (light), and reserved
/// semantics (success / warning). Two poles, used with discipline, read
/// instantly: cool = where you stand, warm = what to do next.
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

  /// Grouped background — edge-to-edge canvas (deep space / oatmeal).
  final Color canvas;

  /// A deeper well behind elevated surfaces / the focus veil.
  final Color canvasSink;

  /// Primary card / grouped surface.
  final Color surface1;

  /// Elevated surface (hovered / raised).
  final Color surface2;

  /// Subtle chip / segmented / track fill.
  final Color fill;

  /// Vibrancy tint for frosted bars / the floating dock (BackdropFilter).
  final Color materialTint;

  /// Translucent tint for glass panels / sheets.
  final Color glassTint;

  final Color ink;
  final Color inkMuted;
  final Color inkFaint;

  /// Hairline separator + a stronger variant.
  final Color line;
  final Color lineStrong;

  /// COOL pole — cyan identity / active / interactive, + a deeper companion.
  final Color brand;
  final Color brandDeep;

  /// COOL pole — the progress "tide": a single value + its fill gradient.
  final Color tide;
  final List<Color> tideGradient;

  /// WARM pole — the action "spark": CTA colour, a deeper companion, gradient.
  final Color spark;
  final Color sparkDeep;
  final List<Color> sparkGradient;

  final Color success;
  final Color warning;

  final bool isDark;

  // ── Back-compat aliases (older widgets referenced these names) ──
  // The cyan tide now plays the role formerly held by "gold/progress".
  Color get gold => tide;
  List<Color> get goldGradient => tideGradient;
  Color get accentProgress => tide;
  List<Color> get progressGradient => tideGradient;
  Color get accentAction => spark;

  /// Deep-space, neon-tide. The primary, dark-first identity.
  static const AppPalette dark = AppPalette(
    canvas: Color(0xFF0B0F19), // deep space
    canvasSink: Color(0xFF060911),
    surface1: Color(0xFF141A27),
    surface2: Color(0xFF1C2436),
    fill: Color(0x14FFFFFF), // white ~0.08
    materialTint: Color(0xCC0C111C), // ~0.80 — frosted bars / dock
    glassTint: Color(0xB3141A27), // ~0.70
    ink: Color(0xFFEAF1FF),
    inkMuted: Color(0xFF93A0B8),
    inkFaint: Color(0xFF5A6680),
    line: Color(0x14FFFFFF), // white ~0.08 hairline
    lineStrong: Color(0x29FFFFFF), // white ~0.16
    brand: Color(0xFF00E5FF), // neon cyan — identity / active
    brandDeep: Color(0xFF00B8D4),
    tide: Color(0xFF00E5FF),
    tideGradient: <Color>[Color(0xFF67F2FF), Color(0xFF00B8D4)],
    spark: Color(0xFFFF6B35), // electric orange — action
    sparkDeep: Color(0xFFFF4D12),
    sparkGradient: <Color>[Color(0xFFFF8A5B), Color(0xFFFF5117)],
    success: Color(0xFF30D158),
    warning: Color(0xFFFFB020),
    isDark: true,
  );

  /// Oatmeal daylight. Accents deepen to hold WCAG AA on a warm light canvas.
  static const AppPalette light = AppPalette(
    canvas: Color(0xFFF7F5F1), // oatmeal
    canvasSink: Color(0xFFECE7DF),
    surface1: Color(0xFFFFFFFF),
    surface2: Color(0xFFFCFBF8),
    fill: Color(0x0D000000), // black ~0.05
    materialTint: Color(0xE6FBFAF7), // ~0.90 — frosted bars / dock
    glassTint: Color(0xE6FFFFFF),
    ink: Color(0xFF16181D),
    inkMuted: Color(0xFF5E6470),
    inkFaint: Color(0xFF9AA0AC),
    line: Color(0x17000000), // black ~0.09 hairline
    lineStrong: Color(0x29000000), // black ~0.16
    brand: Color(0xFF017E91), // deep teal-cyan for AA on oatmeal
    brandDeep: Color(0xFF015F6E),
    tide: Color(0xFF008CA6),
    tideGradient: <Color>[Color(0xFF19C6E6), Color(0xFF0098B5)],
    spark: Color(0xFFD8551E), // deeper orange for AA on oatmeal
    sparkDeep: Color(0xFFB8410F),
    sparkGradient: <Color>[Color(0xFFFF7A45), Color(0xFFE0561F)],
    success: Color(0xFF1FA855),
    warning: Color(0xFFC9821A),
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
      brand: Color.lerp(brand, other.brand, t)!,
      brandDeep: Color.lerp(brandDeep, other.brandDeep, t)!,
      tide: Color.lerp(tide, other.tide, t)!,
      tideGradient: <Color>[
        Color.lerp(tideGradient.first, other.tideGradient.first, t)!,
        Color.lerp(tideGradient.last, other.tideGradient.last, t)!,
      ],
      spark: Color.lerp(spark, other.spark, t)!,
      sparkDeep: Color.lerp(sparkDeep, other.sparkDeep, t)!,
      sparkGradient: <Color>[
        Color.lerp(sparkGradient.first, other.sparkGradient.first, t)!,
        Color.lerp(sparkGradient.last, other.sparkGradient.last, t)!,
      ],
      success: Color.lerp(success, other.success, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
      isDark: t < 0.5 ? isDark : other.isDark,
    );
  }
}

/// Ergonomic access: `context.palette.brand`.
extension PaletteX on BuildContext {
  AppPalette get palette =>
      Theme.of(this).extension<AppPalette>() ?? AppPalette.dark;
}
