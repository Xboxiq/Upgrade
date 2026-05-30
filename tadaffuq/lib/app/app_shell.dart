import 'package:flutter/material.dart';

import '../theme/app_icons.dart';
import '../theme/palette.dart';
import '../ui/floating_dock.dart';
import '../widgets/aurora_background.dart';
import '../features/home/home_screen.dart';
import '../features/more/more_screen.dart';
import '../features/progress/progress_screen.dart';
import '../features/worlds/worlds_screen.dart';

/// The platform shell: a shared deep-space backdrop, the four top-level
/// sections in an [IndexedStack] (state preserved across tabs), and the
/// floating dock as the navigator. Detail screens (e.g. a world) are pushed
/// over the shell as full routes.
class AppShell extends StatefulWidget {
  const AppShell({super.key, required this.isDark, required this.onToggleTheme});

  final bool isDark;
  final VoidCallback onToggleTheme;

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _tab = 0;
  late final List<ScrollController> _controllers =
      List<ScrollController>.generate(4, (_) => ScrollController());

  @override
  void dispose() {
    for (final ScrollController c in _controllers) {
      c.dispose();
    }
    super.dispose();
  }

  void _go(int i) {
    if (i == _tab) {
      // Re-tapping the active tab scrolls it back to top.
      final ScrollController c = _controllers[i];
      if (c.hasClients) {
        c.animateTo(0, duration: const Duration(milliseconds: 420), curve: Curves.easeOutCubic);
      }
      return;
    }
    setState(() => _tab = i);
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;

    return Scaffold(
      backgroundColor: p.canvas,
      body: Stack(
        children: <Widget>[
          const Positioned.fill(child: AuroraBackground()),
          IndexedStack(
            index: _tab,
            children: <Widget>[
              HomeScreen(
                isDark: widget.isDark,
                onToggleTheme: widget.onToggleTheme,
                onSeeAllWorlds: () => setState(() => _tab = 1),
                controller: _controllers[0],
              ),
              WorldsScreen(controller: _controllers[1]),
              ProgressScreen(controller: _controllers[2]),
              MoreScreen(
                isDark: widget.isDark,
                onToggleTheme: widget.onToggleTheme,
                controller: _controllers[3],
              ),
            ],
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: FloatingDock(
              currentIndex: _tab,
              onSelected: _go,
              items: const <DockItem>[
                DockItem(icon: AppIcons.house, label: 'الرئيسية'),
                DockItem(icon: AppIcons.flask, label: 'التدريب'),
                DockItem(icon: AppIcons.chartLineUp, label: 'التقدّم'),
                DockItem(icon: AppIcons.dotsThreeOutline, label: 'المزيد'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
