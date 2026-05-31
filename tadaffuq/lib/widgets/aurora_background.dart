import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../theme/palette.dart';

/// ════════════════════════════════════════════════════════════════════════
/// AuroraBackground — the living deep-space canvas of تَدَفُّق.
///
/// Deliberately NOT the generic "soft colored orb" look. Instead the depth is
/// built from craft:
///   • a deep-space vertical gradient base,
///   • a fine, faintly twinkling STARFIELD (dark mode),
///   • three thin AURORA FILAMENTS — flowing sine ribbons that fade at their
///     ends, the literal "current" of تَدَفُّق drifting across the void.
///
/// It reacts to scroll with subtle multi-layer PARALLAX (stars and each
/// filament move at their own depth), which reads as real space rather than a
/// flat wash — and crucially leaves no coloured halo behind text.
///
/// Performance & accessibility:
///   • isolated in a `RepaintBoundary` so repaints never dirty content,
///   • honours `MediaQuery.disableAnimations` — motion freezes to a clean
///     static frame (no twinkle, no drift).
/// ════════════════════════════════════════════════════════════════════════
class AuroraBackground extends StatefulWidget {
  const AuroraBackground({super.key, this.intensity = 1.0, this.scrollable});

  /// Scales filament/star opacity (e.g. dial down behind dense content).
  final double intensity;

  /// Optional scroll source for parallax depth.
  final ScrollController? scrollable;

  @override
  State<AuroraBackground> createState() => _AuroraBackgroundState();
}

class _AuroraBackgroundState extends State<AuroraBackground>
    with SingleTickerProviderStateMixin {
  late final AnimationController _drift = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 40),
  );

  late final List<_Star> _stars;
  late final List<_Speck> _grain;
  bool _started = false;

  @override
  void initState() {
    super.initState();
    // Deterministic field so the sky is stable across rebuilds.
    final math.Random rnd = math.Random(7);
    _stars = List<_Star>.generate(96, (_) {
      return _Star(
        x: rnd.nextDouble(),
        y: rnd.nextDouble(),
        r: 0.4 + rnd.nextDouble() * 1.1,
        phase: rnd.nextDouble() * math.pi * 2,
        alpha: 0.18 + rnd.nextDouble() * 0.5,
        depth: 0.3 + rnd.nextDouble() * 0.7, // parallax factor
      );
    });
    // Static fine-grain field — adds real texture, killing the flat AI gradient.
    final math.Random g = math.Random(19);
    _grain = List<_Speck>.generate(
      260,
      (_) => _Speck(g.nextDouble(), g.nextDouble(), 0.012 + g.nextDouble() * 0.03),
    );
  }

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

    final Listenable repaint = widget.scrollable == null
        ? _drift
        : Listenable.merge(<Listenable>[_drift, widget.scrollable!]);

    return RepaintBoundary(
      child: AnimatedBuilder(
        animation: repaint,
        builder: (BuildContext context, _) {
          final double scroll =
              (widget.scrollable?.hasClients ?? false) ? widget.scrollable!.offset : 0;
          return CustomPaint(
            painter: _SpacePainter(
              t: reduceMotion ? 0.0 : _drift.value,
              isDark: p.isDark,
              baseTop: Color.alphaBlend(
                  p.brand.withValues(alpha: p.isDark ? 0.06 : 0.04), p.canvas),
              baseBottom: p.canvasSink,
              flow: p.tideGradient,
              stars: _stars,
              grain: _grain,
              scroll: scroll,
              intensity: widget.intensity,
              animate: !reduceMotion,
            ),
            isComplex: true,
            willChange: !reduceMotion,
          );
        },
      ),
    );
  }
}

class _Star {
  const _Star({
    required this.x,
    required this.y,
    required this.r,
    required this.phase,
    required this.alpha,
    required this.depth,
  });
  final double x;
  final double y;
  final double r;
  final double phase;
  final double alpha;
  final double depth;
}

class _SpacePainter extends CustomPainter {
  _SpacePainter({
    required this.t,
    required this.isDark,
    required this.baseTop,
    required this.baseBottom,
    required this.flow,
    required this.stars,
    required this.grain,
    required this.scroll,
    required this.intensity,
    required this.animate,
  });

  final double t; // 0–1 drift phase
  final bool isDark;
  final Color baseTop;
  final Color baseBottom;
  final List<Color> flow;
  final List<_Star> stars;
  final List<_Speck> grain;
  final double scroll;
  final double intensity;
  final bool animate;

  @override
  void paint(Canvas canvas, Size size) {
    final Rect rect = Offset.zero & size;
    final double tau = t * 2 * math.pi;

    // 1) Deep-space base gradient — the dark-blue foundation.
    canvas.drawRect(
      rect,
      Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: <Color>[baseTop, baseBottom],
        ).createShader(rect),
    );

    // 2) Starfield (dark mode only — stars on a light canvas read as noise).
    if (isDark) {
      final Paint starPaint = Paint();
      for (final _Star s in stars) {
        // Parallax: deeper stars drift up faster as the page scrolls.
        final double yPx = (s.y * size.height - scroll * 0.12 * s.depth) % size.height;
        final double y = yPx < 0 ? yPx + size.height : yPx;
        final double twinkle =
            animate ? 0.55 + 0.45 * math.sin(tau * 0.6 + s.phase) : 0.85;
        starPaint.color = Colors.white.withValues(alpha: s.alpha * twinkle * intensity);
        canvas.drawCircle(Offset(s.x * size.width, y), s.r, starPaint);
      }
    }

    // 3) Aurora filaments — thin flowing ribbons that fade at their ends.
    // Each sits at its own height/depth and drifts at its own speed, giving a
    // sense of a real current moving through space.
    final double baseAlpha = (isDark ? 0.16 : 0.10) * intensity;
    _filament(canvas, size, yFrac: 0.30, amp: 0.030, waves: 2.2, speed: 1.0, phase: 0.0, alpha: baseAlpha, depth: 0.5, tau: tau);
    _filament(canvas, size, yFrac: 0.54, amp: 0.045, waves: 1.7, speed: -0.7, phase: 1.6, alpha: baseAlpha * 0.85, depth: 0.85, tau: tau);
    _filament(canvas, size, yFrac: 0.76, amp: 0.038, waves: 2.6, speed: 0.55, phase: 3.1, alpha: baseAlpha * 0.7, depth: 1.2, tau: tau);

    // Fine grain — static texture that kills the flat "digital gradient" look.
    final Paint gp = Paint();
    final Color grainColor = isDark ? Colors.white : Colors.black;
    for (final _Speck s in grain) {
      gp.color = grainColor.withValues(alpha: s.a * intensity);
      canvas.drawCircle(Offset(s.x * size.width, s.y * size.height), 0.7, gp);
    }

    // Vignette — cinematic depth that draws the eye inward.
    canvas.drawRect(
      rect,
      Paint()
        ..shader = RadialGradient(
          radius: 0.95,
          colors: <Color>[
            const Color(0x00000000),
            baseBottom.withValues(alpha: isDark ? 0.55 : 0.16),
          ],
          stops: const <double>[0.6, 1.0],
        ).createShader(rect),
    );
  }

  void _filament(
    Canvas canvas,
    Size size, {
    required double yFrac,
    required double amp,
    required double waves,
    required double speed,
    required double phase,
    required double alpha,
    required double depth,
    required double tau,
  }) {
    final double baseY = size.height * yFrac - scroll * 0.05 * depth;
    final double a = size.height * amp;
    final double k = tau * speed + phase;

    final Path path = Path();
    const int steps = 48;
    for (int i = 0; i <= steps; i++) {
      final double fx = i / steps;
      final double x = fx * size.width;
      final double y = baseY +
          a * math.sin(fx * math.pi * 2 * waves + k) +
          a * 0.4 * math.sin(fx * math.pi * 2 * (waves * 1.7) - k * 0.6);
      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }

    // Horizontal gradient that fades in/out at the screen edges (ribbon ends),
    // tinted along the flow colours — no radial halo, no blur.
    final Shader shader = LinearGradient(
      begin: Alignment.centerLeft,
      end: Alignment.centerRight,
      colors: <Color>[
        flow.first.withValues(alpha: 0),
        flow.first.withValues(alpha: alpha),
        flow.length > 2 ? flow[1].withValues(alpha: alpha) : flow.last.withValues(alpha: alpha),
        flow.last.withValues(alpha: alpha),
        flow.last.withValues(alpha: 0),
      ],
      stops: const <double>[0.0, 0.2, 0.5, 0.8, 1.0],
    ).createShader(Offset.zero & size);

    // A single crisp ribbon — thin and gradient-faded at the ends. No blur,
    // no radial halo: it reads as a filament of light, not an AI glow blob.
    canvas.drawPath(
      path,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.4
        ..strokeCap = StrokeCap.round
        ..shader = shader,
    );
  }

  @override
  bool shouldRepaint(_SpacePainter old) =>
      old.t != t ||
      old.scroll != scroll ||
      old.isDark != isDark ||
      old.intensity != intensity ||
      old.baseTop != baseTop;
}

/// A static grain speck (normalised position + alpha) for background texture.
class _Speck {
  const _Speck(this.x, this.y, this.a);
  final double x;
  final double y;
  final double a;
}
