import 'package:flutter/material.dart';

/// Holds the active [ThemeMode] and notifies listeners on change.
/// MaterialApp animates the palette swap via its internal AnimatedTheme,
/// so toggling here yields a smooth cross-fade between dark and light.
class ThemeController extends ValueNotifier<ThemeMode> {
  ThemeController([super.mode = ThemeMode.dark]);

  bool get isDark => value == ThemeMode.dark;

  void toggle() =>
      value = value == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
}
