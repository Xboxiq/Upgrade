import 'package:flutter/material.dart';

/// Element-wise lerp for multi-stop gradients (dark & light variants always
/// share the same number of stops).
List<Color> _lerpGradient(List<Color> a, List<Color> b, double t) {
  final int n = a.length < b.length ? a.length : b.length;
  return <Color>[for (int i = 0; i < n; i++) Color.lerp(a[i], b[i], t)!];
}

/// ════════════════════════════════════════════════════════════════════════
/// AppPalette — the "Cosmic Flow" colour system, delivered as a ThemeExtension
/// so any widget reads `context.palette` and stays correct in both modes.
///
/// DOCTRINE (see DESIGN.md): تَدَفُّق means *flow*. Mastery is a luminous current
/// streaming through deep space. Grounded in the ui-ux-pro-max skill's cosmic
/// palettes (night-indigo + dream-violet, space-tech navy). Exactly TWO accent
/// poles, each with one job — colour is never decorative:
///   • FLOW — azure→indigo→violet aurora → progress, mastery, active, identity.
///   • SPARK — fuchsia nebula → calls-to-action, "do this now", energy.
/// Over a deep-space navy canvas (dark) / cool starlight (light), plus reserved
/// semantics (success / warning) that never collide with the accent hues.
/// Read instantly: the blue current = where you stand, the nebula = act now.
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

  /// Deep-space navy, indigo current. The primary, dark-first identity.
  static const AppPalette dark = AppPalette(
    canvas: Color(0xFF0A0E1F), // deep space navy-indigo
    canvasSink: Color(0xFF05070F),
    surface1: Color(0xFF121830), // indigo-tinted panel
    surface2: Color(0xFF1B2240),
    fill: Color(0x0FFFFFFF), // white ~0.06
    materialTint: Color(0xCC0C1226), // ~0.80 — frosted bars / dock
    glassTint: Color(0xB8121830), // ~0.72
    ink: Color(0xFFEAEEFC),
    inkMuted: Color(0xFF9AA6C8),
    inkFaint: Color(0xFF5C6690),
    line: Color(0x14FFFFFF), // white ~0.08 hairline
    lineStrong: Color(0x29FFFFFF), // white ~0.16
    brand: Color(0xFF6C8DFF), // azure-indigo — flow / identity / active
    brandDeep: Color(0xFF4A6BF0),
    tide: Color(0xFF6C8DFF),
    // The flowing aurora: azure → blue → indigo-violet.
    tideGradient: <Color>[Color(0xFF74B6FF), Color(0xFF6C8DFF), Color(0xFF9A7CFF)],
    spark: Color(0xFFEC4DBE), // fuchsia nebula — action
    sparkDeep: Color(0xFFD2329F),
    sparkGradient: <Color>[Color(0xFFFF7BD9), Color(0xFFE040B0)],
    success: Color(0xFF2FD8A4), // aurora teal-green
    warning: Color(0xFFFBB845), // star amber
    isDark: true,
  );

  /// Cool starlight daylight. Accents deepen to hold WCAG AA on a light canvas.
  static const AppPalette light = AppPalette(
    canvas: Color(0xFFF3F5FC), // cool ice-white
    canvasSink: Color(0xFFE5E9F6),
    surface1: Color(0xFFFFFFFF),
    surface2: Color(0xFFFAFBFE),
    fill: Color(0x0D000000), // black ~0.05
    materialTint: Color(0xE6F6F8FE), // ~0.90 — frosted bars / dock
    glassTint: Color(0xE6FFFFFF),
    ink: Color(0xFF141828),
    inkMuted: Color(0xFF565E78),
    inkFaint: Color(0xFF9298B0),
    line: Color(0x17000000), // black ~0.09 hairline
    lineStrong: Color(0x29000000), // black ~0.16
    brand: Color(0xFF3D5DE0), // deep azure-indigo for AA on light
    brandDeep: Color(0xFF2A45C8),
    tide: Color(0xFF3D5DE0),
    tideGradient: <Color>[Color(0xFF4F86F7), Color(0xFF5B6EF0), Color(0xFF7C5CE8)],
    spark: Color(0xFFC42E9E), // deep fuchsia for AA on light
    sparkDeep: Color(0xFFA81F86),
    sparkGradient: <Color>[Color(0xFFEC4DBE), Color(0xFFC42E9E)],
    success: Color(0xFF0E9F6E),
    warning: Color(0xFFB8791A),
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
