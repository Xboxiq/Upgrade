import 'package:flutter/material.dart';

/// ════════════════════════════════════════════════════════════════════════
/// AppPalette — the design-system colour tokens, delivered as a ThemeExtension
/// so any widget reads `context.palette` and stays correct in both modes.
///
/// Identity (Apple/iOS-grade, deliberately distinct from the old neon look):
///   • Neutrals  : true-iOS graphite (dark) / porcelain (light) — not navy.
///   • Brand     : a calm indigo→violet (focus, interaction, active state).
///   • Mastery   : a warm amber→gold (progress rings, achievement) — soulful,
///                 reminiscent of Apple Fitness "Move" warmth.
///   • Semantics : iOS system green / orange for success / warning.
///   • Materials : vibrancy tints for frosted nav/tab/sheets (BackdropFilter).
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
    required this.gold,
    required this.goldGradient,
    required this.success,
    required this.warning,
    required this.isDark,
  });

  /// Grouped background — edge-to-edge canvas.
  final Color canvas;

  /// A deeper well behind elevated surfaces / focus veil.
  final Color canvasSink;

  /// Primary card / grouped surface.
  final Color surface1;

  /// Elevated surface (hovered / raised).
  final Color surface2;

  /// iOS "fill" — subtle chip / segmented / track fill.
  final Color fill;

  /// Vibrancy tint for frosted bars (used with BackdropFilter).
  final Color materialTint;

  /// Translucent tint for glass panels / sheets.
  final Color glassTint;

  final Color ink;
  final Color inkMuted;
  final Color inkFaint;

  /// Hairline separator + a stronger variant.
  final Color line;
  final Color lineStrong;

  /// Brand / interactive accent (violet) + a deeper variant for gradients.
  final Color brand;
  final Color brandDeep;

  /// Mastery / progress accent (gold).
  final Color gold;
  final List<Color> goldGradient;

  final Color success;
  final Color warning;

  final bool isDark;

  // ── Back-compat aliases (older widgets referenced these names) ──
  Color get accentAction => brand;
  Color get accentProgress => gold;
  List<Color> get progressGradient => goldGradient;

  static const AppPalette dark = AppPalette(
    canvas: Color(0xFF0A0A0C),
    canvasSink: Color(0xFF000000),
    surface1: Color(0xFF1C1C1E),
    surface2: Color(0xFF2C2C2E),
    fill: Color(0x1FFFFFFF), // white ~0.12
    materialTint: Color(0xD91A1A1C), // ~0.85 — frosted bars
    glassTint: Color(0xCC1C1C1E),
    ink: Color(0xFFF5F5F7),
    inkMuted: Color(0xFF9E9EA7),
    inkFaint: Color(0xFF636366),
    line: Color(0x1FFFFFFF), // white ~0.12 hairline
    lineStrong: Color(0x33FFFFFF), // white ~0.20
    brand: Color(0xFF6E63F2), // indigo→violet, bright for dark
    brandDeep: Color(0xFF8B7BFF),
    gold: Color(0xFFFFC65C),
    goldGradient: <Color>[Color(0xFFFFD66B), Color(0xFFFF9F45)],
    success: Color(0xFF30D158),
    warning: Color(0xFFFF9F0A),
    isDark: true,
  );

  static const AppPalette light = AppPalette(
    canvas: Color(0xFFF2F2F7), // iOS systemGroupedBackground
    canvasSink: Color(0xFFE5E5EA),
    surface1: Color(0xFFFFFFFF),
    surface2: Color(0xFFFBFBFD),
    fill: Color(0x14000000), // black ~0.08
    materialTint: Color(0xF2FFFFFF), // ~0.95 — frosted bars
    glassTint: Color(0xF2FFFFFF),
    ink: Color(0xFF1D1D1F),
    inkMuted: Color(0xFF6E6E73),
    inkFaint: Color(0xFFAEAEB2),
    line: Color(0x1A000000), // black ~0.10 hairline
    lineStrong: Color(0x29000000), // black ~0.16
    brand: Color(0xFF5B4BE0), // deeper violet for AA on white
    brandDeep: Color(0xFF4A3CCB),
    gold: Color(0xFFD99413), // deeper gold for contrast on white
    goldGradient: <Color>[Color(0xFFF5A623), Color(0xFFE0820B)],
    success: Color(0xFF34C759),
    warning: Color(0xFFFF9500),
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
    Color? gold,
    List<Color>? goldGradient,
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
      gold: gold ?? this.gold,
      goldGradient: goldGradient ?? this.goldGradient,
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
      gold: Color.lerp(gold, other.gold, t)!,
      goldGradient: <Color>[
        Color.lerp(goldGradient.first, other.goldGradient.first, t)!,
        Color.lerp(goldGradient.last, other.goldGradient.last, t)!,
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
