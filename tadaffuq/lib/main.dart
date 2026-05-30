import 'package:flutter/material.dart';

import 'features/callcenter/callcenter_screen.dart';
import 'theme/app_theme.dart';
import 'theme/theme_controller.dart';

void main() => runApp(const TadaffuqApp());

class TadaffuqApp extends StatefulWidget {
  const TadaffuqApp({super.key});

  @override
  State<TadaffuqApp> createState() => _TadaffuqAppState();
}

class _TadaffuqAppState extends State<TadaffuqApp> {
  final ThemeController _theme = ThemeController();

  @override
  void dispose() {
    _theme.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _theme,
      builder: (BuildContext context, _) {
        return MaterialApp(
          title: 'تَدَفُّق — الكول سنتر',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.light(),
          darkTheme: AppTheme.dark(),
          themeMode: _theme.value,
          // Force RTL for the Arabic-first experience.
          builder: (BuildContext context, Widget? child) => Directionality(
            textDirection: TextDirection.rtl,
            child: child ?? const SizedBox.shrink(),
          ),
          home: CallCenterScreen(
            isDark: _theme.isDark,
            onToggleTheme: _theme.toggle,
          ),
        );
      },
    );
  }
}
