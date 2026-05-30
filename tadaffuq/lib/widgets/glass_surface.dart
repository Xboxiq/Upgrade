import 'dart:ui';

import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';
import 'depth.dart';

/// Glassmorphism 2.0 — a translucent, blurred surface whose depth comes from a
/// **rim light** (bright top edge → dark contact line), not a drop shadow.
/// Blur is kept moderate and opt-in, so it never becomes a GPU-killer.
class GlassSurface extends StatelessWidget {
  const GlassSurface({
    super.key,
    required this.child,
    this.radius = Radii.lg,
    this.blur = 18,
    this.padding = const EdgeInsets.all(Space.x5),
    this.tintOpacity = 1,
    this.borderColor,
    this.elevated = true,
  });

  final Widget child;
  final double radius;
  final double blur;
  final EdgeInsetsGeometry padding;
  final double tintOpacity;
  final Color? borderColor;
  final bool elevated;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final BorderRadius br = BorderRadius.circular(radius);

    final Widget glass = ClipRRect(
      borderRadius: BorderRadius.circular(radius - (elevated ? Depth.rimWidth : 0)),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: p.glassTint.withValues(
              alpha: (p.glassTint.a * tintOpacity).clamp(0.0, 1.0),
            ),
            // When elevated the rim wrapper draws the edge; otherwise a hairline.
            border: elevated ? null : Border.all(color: borderColor ?? p.line, width: 1),
          ),
          child: child,
        ),
      ),
    );

    if (!elevated) {
      return ClipRRect(borderRadius: br, child: glass);
    }

    // Rim-light wrapper: a 1px lit/contact edge around the glass.
    return Container(
      decoration: BoxDecoration(
        gradient: Depth.rim(p, strong: true),
        borderRadius: br,
      ),
      padding: const EdgeInsets.all(Depth.rimWidth),
      child: glass,
    );
  }
}
