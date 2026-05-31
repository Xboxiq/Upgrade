import 'dart:ui';

import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';

/// A translucent, blurred surface. Depth comes from the frost + a tonal tint —
/// no glowing rim, no drop shadow. An optional DARK seam (a real groove) is the
/// only edge it ever draws.
class GlassSurface extends StatelessWidget {
  const GlassSurface({
    super.key,
    required this.child,
    this.radius = Radii.lg,
    this.blur = 18,
    this.padding = const EdgeInsets.all(Space.x5),
    this.tintOpacity = 1,
    this.seam = true,
  });

  final Widget child;
  final double radius;
  final double blur;
  final EdgeInsetsGeometry padding;
  final double tintOpacity;
  final bool seam;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    return ClipRRect(
      borderRadius: BorderRadius.circular(radius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: p.glassTint.withValues(
              alpha: (p.glassTint.a * tintOpacity).clamp(0.0, 1.0),
            ),
            borderRadius: BorderRadius.circular(radius),
            border: seam ? Border.all(color: p.seam, width: 0.5) : null,
          ),
          child: child,
        ),
      ),
    );
  }
}
