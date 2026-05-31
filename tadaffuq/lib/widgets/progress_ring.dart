import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../theme/palette.dart';
import '../theme/tokens.dart';
import '../util/numerals.dart';

/// A hand-painted progress ring with an Apple-Fitness-grade finish:
///  • a warm gold sweep gradient with rounded caps
///  • the stroke scales with the ring's size and matures subtly toward 100%
///  • a soft, restrained outer glow (no neon)
///  • the value animates (sweeps) whenever it changes — never a static jump
///  • [breathing] mode gently pulses the glow (used inside Focus mode)
class ProgressRing extends StatefulWidget {
  const ProgressRing({
    super.key,
    required this.value,
    this.size = 64,
    this.label,
    this.showPercent = true,
    this.breathing = false,
  });

  final double value; // 0–100
  final double size;
  final Widget? label;
  final bool showPercent;
  final bool breathing;

  @override
  State<ProgressRing> createState() => _ProgressRingState();
}

class _ProgressRingState extends State<ProgressRing>
    with SingleTickerProviderStateMixin {
  late final AnimationController _breath = AnimationController(
    vsync: this,
    duration: Motion.breathe,
  );

  @override
  void initState() {
    super.initState();
    if (widget.breathing) _breath.repeat(reverse: true);
  }

  @override
  void didUpdateWidget(covariant ProgressRing old) {
    super.didUpdateWidget(old);
    if (widget.breathing && !_breath.isAnimating) {
      _breath.repeat(reverse: true);
    } else if (!widget.breathing && _breath.isAnimating) {
      _breath
        ..stop()
        ..value = 0;
    }
  }

  @override
  void dispose() {
    _breath.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final double v = widget.value.clamp(0, 100) / 100.0;

    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: TweenAnimationBuilder<double>(
        tween: Tween<double>(begin: 0, end: v),
        duration: Motion.morph,
        curve: Motion.emphasized,
        builder: (BuildContext context, double t, _) {
          return AnimatedBuilder(
            animation: _breath,
            builder: (BuildContext context, _) {
              final double glow = widget.breathing ? 0.3 + 0.6 * _breath.value : 0.35;
              return CustomPaint(
                painter: _RingPainter(
                  progress: t,
                  colors: p.goldGradient,
                  track: p.isDark ? p.lineStrong : p.fill,
                  glow: glow,
                ),
                child: Center(
                  child: widget.label ??
                      (widget.showPercent
                          ? Text(
                              Arabic.pct(widget.value),
                              style: AppTheme.mono(
                                size: widget.size * 0.21,
                                weight: FontWeight.w700,
                                color: p.ink,
                              ),
                            )
                          : const SizedBox.shrink()),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class _RingPainter extends CustomPainter {
  _RingPainter({
    required this.progress,
    required this.colors,
    required this.track,
    required this.glow,
  });

  final double progress;
  final List<Color> colors;
  final Color track;
  final double glow;

  @override
  void paint(Canvas canvas, Size size) {
    final Offset center = size.center(Offset.zero);
    // Stroke scales with the ring and matures slightly toward completion.
    final double stroke = size.shortestSide * 0.085 * (0.82 + 0.18 * progress);
    final double radius = size.shortestSide / 2 - stroke / 2 - 2;

    final Paint trackPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..color = track;
    canvas.drawCircle(center, radius, trackPaint);

    if (progress <= 0) return;

    const double start = -math.pi / 2;
    final double sweep = 2 * math.pi * progress;
    final Rect rect = Rect.fromCircle(center: center, radius: radius);

    final Shader shader = SweepGradient(
      startAngle: start,
      endAngle: start + 2 * math.pi,
      colors: colors,
      transform: const GradientRotation(-math.pi / 2),
    ).createShader(rect);

    final Paint arcPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..shader = shader;
    canvas.drawArc(rect, start, sweep, false, arcPaint);
  }

  @override
  bool shouldRepaint(_RingPainter old) =>
      old.progress != progress || old.glow != glow || old.track != track;
}
