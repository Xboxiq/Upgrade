import 'dart:ui';

import 'package:flutter/material.dart';

import '../theme/palette.dart';

/// A frosted "material" surface — the iOS vibrancy effect used by nav bars,
/// tab bars and sheets. Blurs what's behind it and lays a translucent tint
/// on top, with an optional hairline edge.
class FrostedBar extends StatelessWidget {
  const FrostedBar({
    super.key,
    required this.child,
    this.blur = 24,
    this.topHairline = false,
    this.bottomHairline = false,
    this.tint,
  });

  final Widget child;
  final double blur;
  final bool topHairline;
  final bool bottomHairline;
  final Color? tint;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: tint ?? p.materialTint,
            border: Border(
              top: topHairline ? BorderSide(color: p.line, width: 0.5) : BorderSide.none,
              bottom: bottomHairline ? BorderSide(color: p.line, width: 0.5) : BorderSide.none,
            ),
          ),
          child: child,
        ),
      ),
    );
  }
}
