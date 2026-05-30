import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';
import '../widgets/press_scale.dart';
import 'materials.dart';

class TabItem {
  const TabItem({required this.icon, required this.label});
  final IconData icon;
  final String label;
}

/// A frosted iOS bottom tab bar — vibrancy material, hairline top edge,
/// brand-tinted active item with a soft selection pill behind the icon.
class AppTabBar extends StatelessWidget {
  const AppTabBar({
    super.key,
    required this.items,
    required this.currentIndex,
    required this.onSelected,
  });

  final List<TabItem> items;
  final int currentIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;

    return FrostedBar(
      topHairline: true,
      child: SafeArea(
        top: false,
        child: SizedBox(
          height: 56,
          child: Row(
            children: <Widget>[
              for (int i = 0; i < items.length; i++)
                Expanded(
                  child: PressScale(
                    onTap: () => onSelected(i),
                    pressedScale: 0.9,
                    child: _Tab(item: items[i], active: i == currentIndex, palette: p, tt: tt),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Tab extends StatelessWidget {
  const _Tab({required this.item, required this.active, required this.palette, required this.tt});
  final TabItem item;
  final bool active;
  final AppPalette palette;
  final TextTheme tt;

  @override
  Widget build(BuildContext context) {
    final Color c = active ? palette.brand : palette.inkFaint;
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        AnimatedContainer(
          duration: Motion.quick,
          curve: Motion.standard,
          padding: const EdgeInsets.symmetric(horizontal: Space.x4, vertical: Space.x1),
          decoration: BoxDecoration(
            color: active ? palette.brand.withValues(alpha: 0.14) : Colors.transparent,
            borderRadius: BorderRadius.circular(Radii.pill),
          ),
          child: Icon(item.icon, size: 23, color: c),
        ),
        const SizedBox(height: 3),
        Text(item.label, style: tt.labelSmall?.copyWith(color: c, fontSize: 10.5)),
      ],
    );
  }
}
