import 'dart:ui';

import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';
import '../widgets/depth.dart';
import '../widgets/press_scale.dart';

class DockItem {
  const DockItem({required this.icon, required this.label});
  final IconData icon;
  final String label;
}

/// ════════════════════════════════════════════════════════════════════════
/// FloatingDock — navigation that *floats on the tide*.
///
/// Instead of an edge-to-edge tab bar, a centred glass pill hovers above the
/// canvas with margin on every side. The active item becomes a neutral raised
/// key that reveals its label; idle items are quiet icons. Frosted vibrancy +
/// a rim-light edge (no drop shadow) give it crisp, distinctive depth.
/// ════════════════════════════════════════════════════════════════════════
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
    final AppPalette p = context.palette;
    final double bottomInset = MediaQuery.of(context).padding.bottom;

    return Padding(
      padding: EdgeInsets.only(
        left: Space.x5,
        right: Space.x5,
        bottom: (bottomInset > 0 ? bottomInset : Space.x4) + Space.x1,
      ),
      child: Center(
        // Depth from a rim light (no drop shadow): the gradient wrapper is a
        // 1px lit/contact edge; the frosted blur separates it from content.
        child: Container(
          decoration: BoxDecoration(
            gradient: Depth.rim(p, strong: true),
            borderRadius: BorderRadius.circular(Radii.pill),
          ),
          padding: const EdgeInsets.all(Depth.rimWidth),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(Radii.pill),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 28, sigmaY: 28),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: Space.x2, vertical: Space.x2),
                decoration: BoxDecoration(
                  color: p.materialTint,
                  borderRadius: BorderRadius.circular(Radii.pill),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    for (int i = 0; i < items.length; i++)
                      PressScale(
                        onTap: () => onSelected(i),
                        pressedScale: 0.88,
                        child: _DockButton(item: items[i], active: i == currentIndex),
                      ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _DockButton extends StatelessWidget {
  const _DockButton({required this.item, required this.active});
  final DockItem item;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final Color c = active ? p.brand : p.inkFaint;

    return AnimatedContainer(
      duration: Motion.quick,
      curve: Motion.standard,
      margin: const EdgeInsets.symmetric(horizontal: 2),
      padding: EdgeInsets.symmetric(horizontal: active ? Space.x4 : Space.x3, vertical: 10),
      decoration: BoxDecoration(
        color: active
            ? (p.isDark ? Colors.white.withValues(alpha: 0.08) : Colors.black.withValues(alpha: 0.05))
            : Colors.transparent,
        borderRadius: BorderRadius.circular(Radii.pill),
        border: active ? Border.all(color: p.line, width: 0.5) : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Icon(item.icon, size: 22, color: c),
          // The active item earns its label; idle items stay quiet icons.
          AnimatedSize(
            duration: Motion.quick,
            curve: Motion.standard,
            child: active
                ? Padding(
                    padding: const EdgeInsetsDirectional.only(start: Space.x2),
                    child: Text(
                      item.label,
                      style: tt.labelSmall?.copyWith(
                        color: c,
                        fontWeight: FontWeight.w700,
                        fontSize: 12.5,
                      ),
                    ),
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
