import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'palette.dart';

/// ════════════════════════════════════════════════════════════════════════
/// AppTheme — builds the dark & light ThemeData from the AppPalette tokens.
/// Cairo carries Arabic + Latin with a clean, modern voice; JetBrains Mono
/// is reserved for measured values (KPIs, units, ranges).
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
      primary: p.accentAction,
      onPrimary: p.isDark ? const Color(0xFF1A0E07) : Colors.white,
      secondary: p.accentProgress,
      onSecondary: const Color(0xFF04121A),
      error: const Color(0xFFFF5470),
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
      splashFactory: InkSparkle.splashFactory,
      highlightColor: Colors.transparent,
      extensions: <ThemeExtension<dynamic>>[p],
    );
  }

  static TextTheme _textTheme(Color ink, Color muted) {
    final TextTheme base = GoogleFonts.cairoTextTheme();
    return base.copyWith(
      displayLarge: GoogleFonts.cairo(
        fontSize: 40,
        fontWeight: FontWeight.w800,
        height: 1.08,
        letterSpacing: -0.5,
        color: ink,
      ),
      displayMedium: GoogleFonts.cairo(
        fontSize: 32,
        fontWeight: FontWeight.w800,
        height: 1.1,
        letterSpacing: -0.4,
        color: ink,
      ),
      headlineMedium: GoogleFonts.cairo(
        fontSize: 25,
        fontWeight: FontWeight.w700,
        height: 1.2,
        letterSpacing: -0.3,
        color: ink,
      ),
      titleLarge: GoogleFonts.cairo(
        fontSize: 19,
        fontWeight: FontWeight.w700,
        height: 1.3,
        color: ink,
      ),
      titleMedium: GoogleFonts.cairo(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        height: 1.35,
        color: ink,
      ),
      bodyLarge: GoogleFonts.cairo(
        fontSize: 15.5,
        fontWeight: FontWeight.w400,
        height: 1.7,
        color: muted,
      ),
      bodyMedium: GoogleFonts.cairo(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        height: 1.65,
        color: muted,
      ),
      labelLarge: GoogleFonts.cairo(
        fontSize: 13.5,
        fontWeight: FontWeight.w600,
        height: 1.2,
        color: ink,
      ),
      labelMedium: GoogleFonts.cairo(
        fontSize: 12.5,
        fontWeight: FontWeight.w600,
        height: 1.2,
        color: muted,
      ),
      labelSmall: GoogleFonts.cairo(
        fontSize: 11.5,
        fontWeight: FontWeight.w600,
        height: 1.2,
        letterSpacing: 0.2,
        color: muted,
      ),
    );
  }
}
