import 'package:flutter/material.dart';

/// ════════════════════════════════════════════════════════════════════════
/// AppPalette — the full colour token set, delivered as a ThemeExtension so
/// any widget can read `context.palette` and stay theme-correct in both modes.
///
/// Dark  : deep space blue/grey  (#0B0F19 canvas · #1A2035 surface)
/// Light : premium oatmeal       (#F7F5F1 canvas · #FFFFFF surface)
/// Accent: neon cyan (#00E5FF) for progress · electric orange (#FF6B35) action
/// ════════════════════════════════════════════════════════════════════════
@immutable
class AppPalette extends ThemeExtension<AppPalette> {
  const AppPalette({
    required this.canvas,
    required this.canvasSink,
    required this.surface1,
    required this.surface2,
    required this.glassTint,
    required this.ink,
    required this.inkMuted,
    required this.inkFaint,
    required this.line,
    required this.lineStrong,
    required this.accentProgress,
    required this.accentAction,
    required this.success,
    required this.warning,
    required this.isDark,
  });

  /// The edge-to-edge background.
  final Color canvas;

  /// A slightly deeper well used behind elevated surfaces / zen veil.
  final Color canvasSink;

  /// Primary card / panel surface.
  final Color surface1;

  /// Elevated / hovered surface.
  final Color surface2;

  /// Translucent fill for glassmorphic chrome (dock, sheets).
  final Color glassTint;

  final Color ink;
  final Color inkMuted;
  final Color inkFaint;

  /// Hairline border (Glass 2.0 — ultra-thin inner border).
  final Color line;
  final Color lineStrong;

  /// The screen's single progress accent (rings / success).
  final Color accentProgress;

  /// The decisive action accent (CTAs, active module).
  final Color accentAction;

  final Color success;
  final Color warning;

  final bool isDark;

  /// Neon cyan gradient for progress rings.
  List<Color> get progressGradient => [
        accentProgress,
        Color.lerp(accentProgress, accentAction, 0.35)!,
      ];

  static const AppPalette dark = AppPalette(
    canvas: Color(0xFF0B0F19),
    canvasSink: Color(0xFF070A12),
    surface1: Color(0xFF161B2B),
    surface2: Color(0xFF1F2740),
    glassTint: Color(0x14FFFFFF),
    ink: Color(0xFFF4F7FF),
    inkMuted: Color(0xFF9AA4BF),
    inkFaint: Color(0xFF5C6680),
    line: Color(0x14FFFFFF), // white @ 0.08
    lineStrong: Color(0x24FFFFFF), // white @ 0.14
    accentProgress: Color(0xFF00E5FF),
    accentAction: Color(0xFFFF6B35),
    success: Color(0xFF34E6B0),
    warning: Color(0xFFFFB02E),
    isDark: true,
  );

  static const AppPalette light = AppPalette(
    canvas: Color(0xFFF7F5F1),
    canvasSink: Color(0xFFEDEAE3),
    surface1: Color(0xFFFFFFFF),
    surface2: Color(0xFFFBF9F5),
    glassTint: Color(0xCCFFFFFF),
    ink: Color(0xFF12161F),
    inkMuted: Color(0xFF5A6373),
    inkFaint: Color(0xFF98A0AD),
    line: Color(0x12000000), // black @ ~0.07
    lineStrong: Color(0x1F000000), // black @ ~0.12
    accentProgress: Color(0xFF00B8D4), // slightly deeper cyan for AA on white
    accentAction: Color(0xFFF2541B),
    success: Color(0xFF12A074),
    warning: Color(0xFFB7791F),
    isDark: false,
  );

  @override
  AppPalette copyWith({
    Color? canvas,
    Color? canvasSink,
    Color? surface1,
    Color? surface2,
    Color? glassTint,
    Color? ink,
    Color? inkMuted,
    Color? inkFaint,
    Color? line,
    Color? lineStrong,
    Color? accentProgress,
    Color? accentAction,
    Color? success,
    Color? warning,
    bool? isDark,
  }) {
    return AppPalette(
      canvas: canvas ?? this.canvas,
      canvasSink: canvasSink ?? this.canvasSink,
      surface1: surface1 ?? this.surface1,
      surface2: surface2 ?? this.surface2,
      glassTint: glassTint ?? this.glassTint,
      ink: ink ?? this.ink,
      inkMuted: inkMuted ?? this.inkMuted,
      inkFaint: inkFaint ?? this.inkFaint,
      line: line ?? this.line,
      lineStrong: lineStrong ?? this.lineStrong,
      accentProgress: accentProgress ?? this.accentProgress,
      accentAction: accentAction ?? this.accentAction,
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
      glassTint: Color.lerp(glassTint, other.glassTint, t)!,
      ink: Color.lerp(ink, other.ink, t)!,
      inkMuted: Color.lerp(inkMuted, other.inkMuted, t)!,
      inkFaint: Color.lerp(inkFaint, other.inkFaint, t)!,
      line: Color.lerp(line, other.line, t)!,
      lineStrong: Color.lerp(lineStrong, other.lineStrong, t)!,
      accentProgress: Color.lerp(accentProgress, other.accentProgress, t)!,
      accentAction: Color.lerp(accentAction, other.accentAction, t)!,
      success: Color.lerp(success, other.success, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
      isDark: t < 0.5 ? isDark : other.isDark,
    );
  }
}

/// Ergonomic access: `context.palette.accentProgress`.
extension PaletteX on BuildContext {
  AppPalette get palette =>
      Theme.of(this).extension<AppPalette>() ?? AppPalette.dark;
}
