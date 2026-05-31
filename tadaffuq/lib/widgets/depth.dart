import 'dart:math' as math;

import 'package:flutter/material.dart';

/// ════════════════════════════════════════════════════════════════════════
/// SurfaceGrain — a whisper-fine, static matte grain painted over a surface.
///
/// This is the anti-AI move that replaces glowing rims / lighter borders /
/// drop shadows: depth comes from *material*, not effects. A real panel has a
/// faint tooth to it; a flat digital fill does not. Deterministic + cheap.
/// ════════════════════════════════════════════════════════════════════════
class SurfaceGrain extends StatelessWidget {
  const SurfaceGrain({
    super.key,
    required this.radius,
    this.dark = true,
    this.density = 0.0016,
  });

  /// Corner radius to clip the grain to the surface shape.
  final double radius;

  /// Light grain (white specks) on dark surfaces; dark specks on light ones.
  final bool dark;

  /// Specks per logical pixel² (kept very low — texture, not noise).
  final double density;

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: IgnorePointer(
        child: ClipRRect(
          borderRadius: BorderRadius.circular(radius),
          child: CustomPaint(painter: _GrainPainter(dark: dark, density: density)),
        ),
      ),
    );
  }
}

class _GrainPainter extends CustomPainter {
  _GrainPainter({required this.dark, required this.density});
  final bool dark;
  final double density;

  @override
  void paint(Canvas canvas, Size size) {
    final int count = (size.width * size.height * density).clamp(24, 220).round();
    // Seed from size so the grain is stable for a given panel, varied across panels.
    final math.Random rnd = math.Random((size.width * 7 + size.height * 13).round());
    final Color base = dark ? Colors.white : Colors.black;
    final Paint p = Paint();
    for (int i = 0; i < count; i++) {
      p.color = base.withValues(alpha: 0.012 + rnd.nextDouble() * 0.022);
      canvas.drawCircle(
        Offset(rnd.nextDouble() * size.width, rnd.nextDouble() * size.height),
        0.6,
        p,
      );
    }
  }

  @override
  bool shouldRepaint(_GrainPainter old) => false;
}
