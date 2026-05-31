import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../theme/palette.dart';
import '../theme/tokens.dart';
import '../util/numerals.dart';

/// ════════════════════════════════════════════════════════════════════════
/// TideRing — the signature visual of تَدَفُّق.
///
/// A circular *vessel* whose interior fills with a luminous cyan tide to a
/// level equal to your mastery, while a thin progress arc traces the rim. The
/// waterline is a living wave that drifts; on completion it stills. This is the
/// literal embodiment of the product's name (*flow*): mastery is a rising tide.
///
///   • the fill level animates whenever [value] changes — never a static jump
///   • the surface wave drifts continuously (paused under reduced-motion)
///   • [breathing] gently swells the glow (used inside Focus mode)
///   • honours `MediaQuery.disableAnimations` — the wave freezes flat & the
///     level resolves instantly, so comprehension never depends on motion
/// ════════════════════════════════════════════════════════════════════════
class TideRing extends StatefulWidget {
  const TideRing({
    super.key,
    required this.value, // 0–100
    this.size = 120,
    this.label,
    this.showPercent = true,
    this.breathing = false,
  });

  final double value;
  final double size;
  final Widget? label;
  final bool showPercent;
  final bool breathing;

  @override
  State<TideRing> createState() => _TideRingState();
}

class _TideRingState extends State<TideRing> with TickerProviderStateMixin {
  // Continuous wave drift — one slow cycle keeps motion calm and cheap.
  late final AnimationController _wave = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 5),
  )..repeat();

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
  void didUpdateWidget(covariant TideRing old) {
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
    _wave.dispose();
    _breath.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool reduceMotion = MediaQuery.maybeOf(context)?.disableAnimations ?? false;
    final double target = widget.value.clamp(0, 100) / 100.0;

    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: TweenAnimationBuilder<double>(
        tween: Tween<double>(begin: reduceMotion ? target : 0, end: target),
        duration: reduceMotion ? Duration.zero : Motion.morph,
        curve: Motion.emphasized,
        builder: (BuildContext context, double level, _) {
          return AnimatedBuilder(
            animation: Listenable.merge(<Listenable>[_wave, _breath]),
            builder: (BuildContext context, _) {
              final double glow = widget.breathing ? 0.35 + 0.55 * _breath.value : 0.4;
              return CustomPaint(
                painter: _TidePainter(
                  level: level,
                  phase: reduceMotion ? 0 : _wave.value,
                  animateWave: !reduceMotion,
                  fill: p.tideGradient,
                  rim: p.brand,
                  track: p.isDark ? p.lineStrong : p.fill,
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

class _TidePainter extends CustomPainter {
  _TidePainter({
    required this.level,
    required this.phase,
    required this.animateWave,
    required this.fill,
    required this.rim,
    required this.track,
    required this.glow,
  });

  final double level; // 0–1 fill height
  final double phase; // 0–1 wave drift
  final bool animateWave;
  final List<Color> fill;
  final Color rim;
  final Color track;
  final double glow;

  @override
  void paint(Canvas canvas, Size size) {
    final Offset center = size.center(Offset.zero);
    final double rimStroke = size.shortestSide * 0.055;
    final double radius = size.shortestSide / 2 - rimStroke / 2 - 1;

    // 1) The vessel interior — clip to a circle just inside the rim.
    final double innerR = radius - rimStroke * 0.85;
    final Rect innerRect = Rect.fromCircle(center: center, radius: innerR);
    canvas.save();
    canvas.clipPath(Path()..addOval(innerRect));

    if (level > 0.001) {
      // Waterline rises from the bottom of the vessel as level grows.
      final double bottom = center.dy + innerR;
      final double top = center.dy - innerR;
      final double waterY = bottom - (bottom - top) * level;

      // Amplitude eases out near empty/full so the surface settles flat.
      final double settle = math.sin(level.clamp(0, 1) * math.pi);
      final double amp = animateWave ? innerR * 0.07 * settle : 0;
      final double k = phase * 2 * math.pi;

      final Path wave = Path()..moveTo(center.dx - innerR, bottom);
      const int steps = 28;
      for (int i = 0; i <= steps; i++) {
        final double x = center.dx - innerR + (2 * innerR) * (i / steps);
        final double t = i / steps;
        final double y = waterY +
            amp * math.sin(t * 2 * math.pi * 2 + k) +
            amp * 0.5 * math.sin(t * 2 * math.pi * 3 - k * 1.3);
        wave.lineTo(x, y);
      }
      wave
        ..lineTo(center.dx + innerR, bottom)
        ..close();

      final Paint fillPaint = Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: <Color>[
            fill.first.withValues(alpha: 0.95),
            fill.last.withValues(alpha: 0.6),
          ],
        ).createShader(innerRect);
      canvas.drawPath(wave, fillPaint);

      // Bright crest line along the waterline for a liquid sheen.
      final Path crest = Path();
      for (int i = 0; i <= steps; i++) {
        final double x = center.dx - innerR + (2 * innerR) * (i / steps);
        final double t = i / steps;
        final double y = waterY +
            amp * math.sin(t * 2 * math.pi * 2 + k) +
            amp * 0.5 * math.sin(t * 2 * math.pi * 3 - k * 1.3);
        if (i == 0) {
          crest.moveTo(x, y);
        } else {
          crest.lineTo(x, y);
        }
      }
      canvas.drawPath(
        crest,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.5
          ..color = fill.first.withValues(alpha: 0.9),
      );
    }
    canvas.restore();

    // 2) The rim — a faint full track + a bright progress arc with round caps.
    final Paint trackPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = rimStroke
      ..color = track;
    canvas.drawCircle(center, radius, trackPaint);

    if (level > 0) {
      const double start = -math.pi / 2;
      final double sweep = 2 * math.pi * level;
      final Rect rimRect = Rect.fromCircle(center: center, radius: radius);

      canvas.drawArc(
        rimRect,
        start,
        sweep,
        false,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = rimStroke
          ..strokeCap = StrokeCap.round
          ..shader = SweepGradient(
            startAngle: start,
            endAngle: start + 2 * math.pi,
            colors: fill,
            transform: const GradientRotation(-math.pi / 2),
          ).createShader(rimRect),
      );
    }
  }

  @override
  bool shouldRepaint(_TidePainter old) =>
      old.level != level ||
      old.phase != phase ||
      old.glow != glow ||
      old.track != track;
}
