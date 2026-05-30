import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../theme/palette.dart';

/// ════════════════════════════════════════════════════════════════════════
/// AuroraBackground — the living canvas of تَدَفُّق.
///
/// Two soft cyan/indigo blooms drift *very* slowly behind the content,
/// suggesting an ambient tide rather than a static fill. It is deliberately
/// restrained (low alpha, slow) — never a light show — so it adds depth and
/// soul without competing with the UI.
///
/// Performance & accessibility:
///   • isolated in a `RepaintBoundary` so its repaints never dirty content
///   • honours `MediaQuery.disableAnimations` — the controller never starts
///     and a single static frame is painted instead
/// ════════════════════════════════════════════════════════════════════════
class AuroraBackground extends StatefulWidget {
  const AuroraBackground({super.key, this.intensity = 1.0});

  /// Scales the bloom opacity (e.g. dial down behind dense content).
  final double intensity;

  @override
  State<AuroraBackground> createState() => _AuroraBackgroundState();
}

class _AuroraBackgroundState extends State<AuroraBackground>
    with SingleTickerProviderStateMixin {
  late final AnimationController _drift = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 26),
  );

  bool _started = false;

  @override
  void dispose() {
    _drift.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool reduceMotion = MediaQuery.maybeOf(context)?.disableAnimations ?? false;

    if (!reduceMotion && !_started) {
      _started = true;
      _drift.repeat();
    }

    return RepaintBoundary(
      child: AnimatedBuilder(
        animation: _drift,
        builder: (BuildContext context, _) {
          return CustomPaint(
            painter: _AuroraPainter(
              t: reduceMotion ? 0.12 : _drift.value,
              cool: p.brand,
              warm: p.spark,
              isDark: p.isDark,
              intensity: widget.intensity,
            ),
            isComplex: true,
            willChange: !reduceMotion,
          );
        },
      ),
    );
  }
}

class _AuroraPainter extends CustomPainter {
  _AuroraPainter({
    required this.t,
    required this.cool,
    required this.warm,
    required this.isDark,
    required this.intensity,
  });

  final double t; // 0–1 drift phase
  final Color cool;
  final Color warm;
  final bool isDark;
  final double intensity;

  @override
  void paint(Canvas canvas, Size size) {
    final double a = (isDark ? 0.16 : 0.10) * intensity;
    final double tau = t * 2 * math.pi;

    // Cool bloom — drifts a slow lissajous near the top-start.
    final Offset c1 = Offset(
      size.width * (0.22 + 0.10 * math.sin(tau)),
      size.height * (0.16 + 0.06 * math.cos(tau * 0.8)),
    );
    _bloom(canvas, c1, size.shortestSide * 0.85, cool.withValues(alpha: a));

    // Warm bloom — a fainter spark of energy, lower and opposite-phase.
    final Offset c2 = Offset(
      size.width * (0.82 - 0.08 * math.cos(tau * 0.9)),
      size.height * (0.40 + 0.07 * math.sin(tau * 1.1)),
    );
    _bloom(canvas, c2, size.shortestSide * 0.7, warm.withValues(alpha: a * 0.6));
  }

  void _bloom(Canvas canvas, Offset center, double radius, Color color) {
    final Paint paint = Paint()
      ..shader = RadialGradient(
        colors: <Color>[color, color.withValues(alpha: 0)],
      ).createShader(Rect.fromCircle(center: center, radius: radius));
    canvas.drawCircle(center, radius, paint);
  }

  @override
  bool shouldRepaint(_AuroraPainter old) =>
      old.t != t || old.intensity != intensity || old.isDark != isDark;
}
