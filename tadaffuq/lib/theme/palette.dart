import 'package:flutter/material.dart';

/// Element-wise lerp for multi-stop gradients (dark & light variants always
/// share the same number of stops).
List<Color> _lerpGradient(List<Color> a, List<Color> b, double t) {
  final int n = a.length < b.length ? a.length : b.length;
  return <Color>[for (int i = 0; i < n; i++) Color.lerp(a[i], b[i], t)!];
}

/// ════════════════════════════════════════════════════════════════════════
/// AppPalette — the "Tidal Aurora" colour system (ThemeExtension).
///
/// A deliberate break from the purple→blue gradient that the design skills flag
/// as the #1 AI-slop tell. Instead, a warm, premium, unmistakably-real duotone:
///   • FLOW — aqua→teal current → progress, mastery, active, identity. Cool,
///     alive, organic (the streaming tide of mastery).
///   • SPARK — amber-gold → calls-to-action, energy, "do this now". Warm,
///     premium (golden starlight), high-affordance.
/// Over a WARM deep-charcoal space (not cold navy) so the UI never feels cold
/// or pale with repeated use. Teal + gold is a classic, harmonious pairing;
/// reserved semantics (success / warning / error) stay clear of both poles.
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

  /// COOL pole — aqua/teal identity / active / interactive, + a deeper companion.
  final Color brand;
  final Color brandDeep;

  /// COOL pole — the progress "tide": a single value + its multi-stop fill.
  final Color tide;
  final List<Color> tideGradient;

  /// WARM pole — the action "spark": amber-gold CTA colour + deeper + gradient.
  final Color spark;
  final Color sparkDeep;
  final List<Color> sparkGradient;

  final Color success;
  final Color warning;

  final bool isDark;

  // ── Back-compat aliases used by older widgets ──
  Color get gold => tide;
  List<Color> get goldGradient => tideGradient;
  Color get accentProgress => tide;
  List<Color> get progressGradient => tideGradient;
  Color get accentAction => spark;

  /// Ink that reads on top of a [spark] (gold) fill — gold needs dark ink.
  Color get onSpark => const Color(0xFF231803);

  /// Ink that reads on top of a bright [tide]/[brand] fill.
  Color get onTide => isDark ? const Color(0xFF042420) : Colors.white;

  /// Warm deep-charcoal space. The primary, dark-first identity.
  static const AppPalette dark = AppPalette(
    canvas: Color(0xFF0D1112), // warm charcoal-black (not navy)
    canvasSink: Color(0xFF070A0A),
    surface1: Color(0xFF171B1C),
    surface2: Color(0xFF202627),
    fill: Color(0x0DFFFFFF), // white ~0.05
    materialTint: Color(0xCC101516), // ~0.80 — frosted bars / dock
    glassTint: Color(0xB8171B1C),
    ink: Color(0xFFECEFEA), // warm off-white
    inkMuted: Color(0xFF99A39D),
    inkFaint: Color(0xFF5E6863),
    line: Color(0x12FFFFFF), // white ~0.07
    lineStrong: Color(0x24FFFFFF), // white ~0.14
    brand: Color(0xFF2DD4BF), // teal — flow / identity / active
    brandDeep: Color(0xFF0D9488),
    tide: Color(0xFF2DD4BF),
    tideGradient: <Color>[Color(0xFF5EEAD4), Color(0xFF2DD4BF), Color(0xFF14B8A6)],
    spark: Color(0xFFFBBF24), // amber-gold — action / energy
    sparkDeep: Color(0xFFF59E0B),
    sparkGradient: <Color>[Color(0xFFFDE08A), Color(0xFFF59E0B)],
    success: Color(0xFF34D399),
    warning: Color(0xFFFB923C),
    isDark: true,
  );

  /// Warm parchment daylight. Accents deepen to hold WCAG AA on a warm canvas.
  static const AppPalette light = AppPalette(
    canvas: Color(0xFFF6F4EF), // warm paper (not cold ice)
    canvasSink: Color(0xFFECE8DF),
    surface1: Color(0xFFFFFFFF),
    surface2: Color(0xFFFBFAF5),
    fill: Color(0x0D000000), // black ~0.05
    materialTint: Color(0xE6FBFAF6),
    glassTint: Color(0xE6FFFFFF),
    ink: Color(0xFF191C1A),
    inkMuted: Color(0xFF5C615C),
    inkFaint: Color(0xFF979B95),
    line: Color(0x14000000), // black ~0.08
    lineStrong: Color(0x29000000),
    brand: Color(0xFF0D9488), // deep teal for AA on light
    brandDeep: Color(0xFF0F766E),
    tide: Color(0xFF0D9488),
    tideGradient: <Color>[Color(0xFF14B8A6), Color(0xFF0D9488), Color(0xFF0F766E)],
    spark: Color(0xFFB7791F), // deep amber for AA on light
    sparkDeep: Color(0xFF946115),
    sparkGradient: <Color>[Color(0xFFF59E0B), Color(0xFFB7791F)],
    success: Color(0xFF15803D),
    warning: Color(0xFFC2410C),
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

/// Ergonomic access: `context.palette.brand`.
extension PaletteX on BuildContext {
  AppPalette get palette =>
      Theme.of(this).extension<AppPalette>() ?? AppPalette.dark;
}
