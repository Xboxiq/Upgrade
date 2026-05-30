import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';
import 'glass_surface.dart';
import 'press_scale.dart';

class DockItem {
  const DockItem({required this.icon, required this.label, this.isAction = false});
  final IconData icon;
  final String label;
  final bool isAction;
}

/// A floating glass dock that replaces the classic sidebar. The active item
/// expands to reveal its label with the action accent; the centre "action"
/// item is always a filled accent pill. Presses are tactile (PressScale).
class FloatingDock extends StatelessWidget {
  const FloatingDock({
    super.key,
    required this.items,
    required this.currentIndex,
    required this.onSelected,
  });

  final List<DockItem> items;
  final int currentIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    return GlassSurface(
      radius: Radii.pill,
      blur: 24,
      tintOpacity: 1,
      padding: const EdgeInsets.symmetric(horizontal: Space.x2, vertical: Space.x2),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          for (int i = 0; i < items.length; i++)
            _DockButton(
              item: items[i],
              active: i == currentIndex,
              onTap: () => onSelected(i),
            ),
        ],
      ),
    );
  }
}

class _DockButton extends StatelessWidget {
  const _DockButton({required this.item, required this.active, required this.onTap});

  final DockItem item;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;

    final Color fg = item.isAction
        ? Colors.white
        : (active ? p.accentAction : p.inkMuted);

    final Color? bg = item.isAction
        ? p.accentAction
        : (active ? p.accentAction.withValues(alpha: 0.12) : null);

    return PressScale(
      onTap: onTap,
      pressedScale: 0.9,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: Space.x1),
        child: AnimatedContainer(
          duration: Motion.quick,
          curve: Motion.standard,
          padding: EdgeInsets.symmetric(
            horizontal: active && !item.isAction ? Space.x4 : Space.x3,
            vertical: Space.x3,
          ),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(Radii.pill),
            boxShadow: item.isAction
                ? <BoxShadow>[
                    BoxShadow(
                      color: p.accentAction.withValues(alpha: 0.45),
                      blurRadius: 18,
                      offset: const Offset(0, 6),
                      spreadRadius: -4,
                    ),
                  ]
                : null,
          ),
          child: AnimatedSize(
            duration: Motion.quick,
            curve: Motion.standard,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Icon(item.icon, color: fg, size: 23),
                if (active && !item.isAction) ...<Widget>[
                  const SizedBox(width: Space.x2),
                  Text(
                    item.label,
                    style: Theme.of(context)
                        .textTheme
                        .labelLarge
                        ?.copyWith(color: p.accentAction),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
