import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import 'materials.dart';

/// An iOS-style screen: a Large Title that smoothly collapses into a pinned,
/// frosted compact navigation bar as the content scrolls. Reusable by every
/// section of the platform — pass a [title], optional [trailing] action, and
/// the body [slivers].
class LargeTitleScaffold extends StatelessWidget {
  const LargeTitleScaffold({
    super.key,
    required this.title,
    required this.slivers,
    this.trailing,
    this.leading,
    this.controller,
  });

  final String title;
  final List<Widget> slivers;
  final Widget? trailing;
  final Widget? leading;
  final ScrollController? controller;

  @override
  Widget build(BuildContext context) {
    final double topPad = MediaQuery.of(context).padding.top;
    return CustomScrollView(
      controller: controller,
      physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
      slivers: <Widget>[
        SliverPersistentHeader(
          pinned: true,
          delegate: _LargeTitleHeader(
            title: title,
            trailing: trailing,
            leading: leading,
            topPad: topPad,
          ),
        ),
        ...slivers,
      ],
    );
  }
}

class _LargeTitleHeader extends SliverPersistentHeaderDelegate {
  _LargeTitleHeader({required this.title, required this.trailing, required this.leading, required this.topPad});

  final String title;
  final Widget? trailing;
  final Widget? leading;
  final double topPad;

  static const double _barH = 50;
  static const double _largeH = 58;

  @override
  double get minExtent => topPad + _barH;
  @override
  double get maxExtent => topPad + _barH + _largeH;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    final TextTheme tt = Theme.of(context).textTheme;
    final double range = maxExtent - minExtent;
    final double t = range <= 0 ? 1 : (shrinkOffset / range).clamp(0.0, 1.0);
    // ease the frost in
    final double frost = Curves.easeOut.transform(t);

    return SizedBox.expand(
      child: Stack(
        children: <Widget>[
          // Frosted background — fades in as the title collapses.
          Positioned.fill(
            child: IgnorePointer(
              child: Opacity(
                opacity: frost,
                child: FrostedBar(bottomHairline: t > 0.5, child: const SizedBox.expand()),
              ),
            ),
          ),

          // Compact (collapsed) centred title.
          Positioned(
            top: topPad,
            left: 0,
            right: 0,
            height: _barH,
            child: Center(
              child: Opacity(
                opacity: Curves.easeIn.transform(t),
                child: Text(title, style: tt.titleMedium),
              ),
            ),
          ),

          // Trailing action — always present, pinned to the inline-end.
          if (trailing != null)
            PositionedDirectional(
              end: Space.x5,
              top: topPad,
              height: _barH,
              child: Center(child: trailing!),
            ),

          // Leading action (e.g. back) — pinned to the inline-start.
          if (leading != null)
            PositionedDirectional(
              start: Space.x5,
              top: topPad,
              height: _barH,
              child: Center(child: leading!),
            ),

          // Large title — anchored to the bottom-start, fades/slides away.
          PositionedDirectional(
            start: Space.x5,
            end: Space.x5,
            bottom: Space.x3,
            child: Opacity(
              opacity: (1 - t * 1.4).clamp(0.0, 1.0),
              child: Transform.translate(
                offset: Offset(0, 8 * t),
                child: Text(
                  title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: tt.displayLarge,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  bool shouldRebuild(_LargeTitleHeader old) =>
      old.title != title || old.topPad != topPad || old.trailing != trailing || old.leading != leading;
}
