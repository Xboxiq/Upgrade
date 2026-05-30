import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'palette.dart';

/// ════════════════════════════════════════════════════════════════════════
/// AppTheme — builds dark & light ThemeData from AppPalette, on an iOS type
/// ramp (Large Title → Caption). Cairo carries Arabic + Latin with a clean,
/// SF-adjacent voice; JetBrains Mono is reserved for measured values.
/// ════════════════════════════════════════════════════════════════════════
abstract class AppTheme {
  static ThemeData dark() => _build(AppPalette.dark, Brightness.dark);
  static ThemeData light() => _build(AppPalette.light, Brightness.light);

  /// A monospace style for metric values; callers tint it as needed.
  static TextStyle mono({
    double size = 13,
    FontWeight weight = FontWeight.w600,
    Color? color,
    double? letterSpacing,
  }) =>
      GoogleFonts.jetBrainsMono(
        fontSize: size,
        fontWeight: weight,
        color: color,
        letterSpacing: letterSpacing,
      );

  static ThemeData _build(AppPalette p, Brightness brightness) {
    final TextTheme text = _textTheme(p.ink, p.inkMuted);

    final ColorScheme scheme = ColorScheme(
      brightness: brightness,
      primary: p.brand,
      onPrimary: Colors.white,
      secondary: p.gold,
      onSecondary: const Color(0xFF1A1206),
      tertiary: p.success,
      onTertiary: Colors.white,
      error: const Color(0xFFFF453A),
      onError: Colors.white,
      surface: p.surface1,
      onSurface: p.ink,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: scheme,
      scaffoldBackgroundColor: p.canvas,
      canvasColor: p.canvas,
      textTheme: text,
      splashFactory: NoSplash.splashFactory, // iOS has no ripple
      highlightColor: Colors.transparent,
      sliderTheme: SliderThemeData(
        trackHeight: 4,
        activeTrackColor: p.brand,
        inactiveTrackColor: p.fill,
        thumbColor: Colors.white,
        overlayColor: p.brand.withValues(alpha: 0.12),
        thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 11, elevation: 2),
      ),
      extensions: <ThemeExtension<dynamic>>[p],
    );
  }

  static TextTheme _textTheme(Color ink, Color muted) {
    final TextTheme base = GoogleFonts.cairoTextTheme();
    TextStyle c(double size, FontWeight w, {double h = 1.25, double ls = 0, Color? col}) =>
        GoogleFonts.cairo(fontSize: size, fontWeight: w, height: h, letterSpacing: ls, color: col ?? ink);

    return base.copyWith(
      displayLarge: c(34, FontWeight.w800, h: 1.1, ls: -0.6), // Large Title
      displayMedium: c(28, FontWeight.w800, h: 1.12, ls: -0.5), // Title 1
      headlineMedium: c(22, FontWeight.w700, h: 1.18, ls: -0.4), // Title 2
      titleLarge: c(20, FontWeight.w700, h: 1.2, ls: -0.3), // Title 3
      titleMedium: c(17, FontWeight.w700, h: 1.3), // Headline
      bodyLarge: c(17, FontWeight.w400, h: 1.5, col: muted), // Body
      bodyMedium: c(15.5, FontWeight.w400, h: 1.5, col: muted), // Callout
      labelLarge: c(16, FontWeight.w600, h: 1.2), // Button
      labelMedium: c(13.5, FontWeight.w500, h: 1.25, col: muted), // Footnote
      labelSmall: c(12, FontWeight.w600, h: 1.2, ls: 0.1, col: muted), // Caption
    );
  }
}
