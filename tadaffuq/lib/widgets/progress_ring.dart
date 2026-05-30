import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../theme/palette.dart';
import '../theme/tokens.dart';
import '../util/numerals.dart';

/// A premium SVG-quality progress ring, hand-painted:
///  • the arc fills with a neon-cyan sweep gradient and a rounded cap
///  • the stroke MATURES — it thickens from 3→7px as progress approaches 100%
///  • a soft outer glow lifts the arc off the surface
///  • the value animates (sweeps) whenever it changes — never a static jump
///  • in [breathing] mode the glow pulses slowly (used inside Focus/Zen)
class ProgressRing extends StatefulWidget {
  const ProgressRing({
    super.key,
    required this.value,
    this.size = 64,
    this.label,
    this.showPercent = true,
    this.breathing = false,
  });

  /// 0–100.
  final double value;
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
              final double glow = widget.breathing
                  ? 0.4 + 0.6 * _breath.value
                  : 0.5;
              return CustomPaint(
                painter: _RingPainter(
                  progress: t,
                  colors: p.progressGradient,
                  track: p.lineStrong,
                  glow: glow,
                ),
                child: Center(
                  child: widget.label ??
                      (widget.showPercent
                          ? Text(
                              Arabic.pct(widget.value),
                              style: AppTheme.mono(
                                size: widget.size * 0.2,
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
    final double stroke = 3 + 4 * progress; // matures 3 → 7
    final double radius = size.shortestSide / 2 - stroke / 2 - 3;

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

    // Outer glow — the arc lifts off the surface.
    final Paint glowPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..color = colors.first.withValues(alpha: 0.55 * glow)
      ..maskFilter = MaskFilter.blur(BlurStyle.normal, 4 + 6 * glow);
    canvas.drawArc(rect, start, sweep, false, glowPaint);

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
