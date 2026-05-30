import 'dart:ui';

import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';

/// Glassmorphism 2.0 — a translucent surface with an ultra-thin inner border
/// and soft, multi-layered shadows. Blur is kept moderate (12) and is opt-in,
/// so it never becomes a GPU-killer applied everywhere.
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

    return DecoratedBox(
      decoration: BoxDecoration(
        borderRadius: br,
        boxShadow: elevated
            ? <BoxShadow>[
                BoxShadow(
                  color: Colors.black.withValues(alpha: p.isDark ? 0.45 : 0.10),
                  blurRadius: 24,
                  offset: const Offset(0, 12),
                  spreadRadius: -8,
                ),
                BoxShadow(
                  color: Colors.black.withValues(alpha: p.isDark ? 0.30 : 0.06),
                  blurRadius: 6,
                  offset: const Offset(0, 2),
                  spreadRadius: -2,
                ),
              ]
            : null,
      ),
      child: ClipRRect(
        borderRadius: br,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
          child: Container(
            padding: padding,
            decoration: BoxDecoration(
              color: p.glassTint.withValues(
                alpha: (p.glassTint.a * tintOpacity).clamp(0.0, 1.0),
              ),
              borderRadius: br,
              border: Border.all(
                color: borderColor ?? p.line,
                width: 1,
              ),
            ),
            child: child,
          ),
        ),
      ),
    );
  }
}
