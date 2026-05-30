import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../theme/app_theme.dart';
import '../theme/palette.dart';
import '../theme/tokens.dart';
import '../util/numerals.dart';

/// ════════════════════════════════════════════════════════════════════════
/// MasteryPlanet — the signature, interactive mastery object of تَدَفُّق.
///
/// A deep-space planet whose interior fills with the luminous cosmic tide to a
/// level equal to your mastery, encircled by Saturn-style rings (the rear half
/// passes *behind* the planet for real depth) with a moon orbiting the ring.
/// It fuses the product's "flow" soul with an elegant celestial form.
///
/// Interactions (meaning, not decoration):
///   • DRAG horizontally to spin the system — the moon orbits, the highlight
///     shifts; it feels like a real object you can turn.
///   • TAP for a springy pulse + haptic.
///   • LONG-PRESS surfaces [onLongPress] (e.g. the tier breakdown).
///
/// The planet is deliberately a dark celestial body in *both* themes — a real
/// object in space — so the centre reading stays legible over the tide.
/// Honours `MediaQuery.disableAnimations`: the orbit/wave freeze, the level
/// resolves instantly.
/// ════════════════════════════════════════════════════════════════════════
class MasteryPlanet extends StatefulWidget {
  const MasteryPlanet({
    super.key,
    required this.value, // 0–100
    this.size = 120,
    this.breathing = false,
    this.showPercent = true,
    this.label,
    this.onLongPress,
  });

  final double value;
  final double size;
  final bool breathing;
  final bool showPercent;
  final Widget? label;
  final VoidCallback? onLongPress;

  @override
  State<MasteryPlanet> createState() => _MasteryPlanetState();
}

class _MasteryPlanetState extends State<MasteryPlanet> with TickerProviderStateMixin {
  late final AnimationController _orbit = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 22),
  );
  late final AnimationController _breath = AnimationController(
    vsync: this,
    duration: Motion.breathe,
  );
  late final AnimationController _pulse = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 460),
  );

  double _drag = 0; // manual spin contributed by the user

  @override
  void initState() {
    super.initState();
    if (widget.breathing) _breath.repeat(reverse: true);
  }

  @override
  void didUpdateWidget(covariant MasteryPlanet old) {
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
    _orbit.dispose();
    _breath.dispose();
    _pulse.dispose();
    super.dispose();
  }

  void _tap() {
    HapticFeedback.lightImpact();
    _pulse.forward(from: 0);
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool reduce = MediaQuery.maybeOf(context)?.disableAnimations ?? false;
    final double target = widget.value.clamp(0, 100) / 100.0;

    if (!reduce && !_orbit.isAnimating) _orbit.repeat();

    return GestureDetector(
      onTap: _tap,
      onLongPress: widget.onLongPress == null
          ? null
          : () {
              HapticFeedback.mediumImpact();
              widget.onLongPress!.call();
            },
      onHorizontalDragUpdate: (DragUpdateDetails d) {
        setState(() => _drag += (d.primaryDelta ?? 0) * 0.012);
      },
      child: SizedBox(
        width: widget.size,
        height: widget.size,
        child: TweenAnimationBuilder<double>(
          tween: Tween<double>(begin: reduce ? target : 0, end: target),
          duration: reduce ? Duration.zero : Motion.morph,
          curve: Motion.emphasized,
          builder: (BuildContext context, double level, _) {
            return AnimatedBuilder(
              animation: Listenable.merge(<Listenable>[_orbit, _breath, _pulse]),
              builder: (BuildContext context, _) {
                final double pulse = _pulse.isAnimating
                    ? 1 + 0.06 * math.sin(_pulse.value * math.pi)
                    : 1.0;
                final double spin = (reduce ? 0 : _orbit.value * 2 * math.pi) + _drag;
                final double breath = widget.breathing ? _breath.value : 0;

                return Transform.scale(
                  scale: pulse,
                  child: CustomPaint(
                    painter: _PlanetPainter(
                      level: level,
                      spin: spin,
                      breath: breath,
                      animate: !reduce,
                      tide: p.tideGradient,
                      ring: p.brand,
                    ),
                    child: Center(
                      child: widget.label ??
                          (widget.showPercent
                              ? Text(
                                  Arabic.pct(widget.value),
                                  style: AppTheme.mono(
                                    size: widget.size * 0.17,
                                    weight: FontWeight.w700,
                                    color: const Color(0xFFF1F4FF),
                                  ),
                                )
                              : const SizedBox.shrink()),
                    ),
                  ),
                );
              },
            );
          },
        ),
      ),
    );
  }
}

class _PlanetPainter extends CustomPainter {
  _PlanetPainter({
    required this.level,
    required this.spin,
    required this.breath,
    required this.animate,
    required this.tide,
    required this.ring,
  });

  final double level; // 0–1 fill
  final double spin; // radians
  final double breath; // 0–1
  final bool animate;
  final List<Color> tide;
  final Color ring;

  // The planet is a real celestial body — dark in any UI theme.
  static const Color _coreTop = Color(0xFF20294F);
  static const Color _coreBottom = Color(0xFF070B18);

  static const double _tilt = -0.42; // ring plane tilt

  @override
  void paint(Canvas canvas, Size size) {
    final Offset c = size.center(Offset.zero);
    final double r = size.shortestSide / 2;
    final double planetR = r * 0.46;
    final double rx = r * 0.96;
    final double ry = r * 0.30;

    // Moon position (parametric on the tilted ellipse). sin<0 ⇒ behind planet.
    Offset moonAt(double phase) {
      final double lx = rx * math.cos(phase);
      final double ly = ry * math.sin(phase);
      return c +
          Offset(
            lx * math.cos(_tilt) - ly * math.sin(_tilt),
            lx * math.sin(_tilt) + ly * math.cos(_tilt),
          );
    }

    final bool moonBehind = math.sin(spin) < 0;

    // 1) Ring — rear half (drawn before the planet so it passes behind it).
    _ringHalf(canvas, c, rx, ry, back: true);
    if (moonBehind) _moon(canvas, moonAt(spin), planetR * 0.16, dim: true);

    // 2) The planet sphere.
    canvas.save();
    canvas.clipPath(Path()..addOval(Rect.fromCircle(center: c, radius: planetR)));

    final Rect coreRect = Rect.fromCircle(center: c, radius: planetR);
    canvas.drawRect(
      coreRect,
      Paint()
        ..shader = RadialGradient(
          center: const Alignment(-0.4, -0.5),
          radius: 1.1,
          colors: const <Color>[_coreTop, _coreBottom],
        ).createShader(coreRect),
    );

    // The cosmic tide filling the planet to [level].
    if (level > 0.001) {
      final double bottom = c.dy + planetR;
      final double top = c.dy - planetR;
      final double waterY = bottom - (bottom - top) * level;
      final double settle = math.sin(level.clamp(0, 1) * math.pi);
      final double amp = animate ? planetR * 0.06 * settle : 0;

      final Path wave = Path()..moveTo(c.dx - planetR, bottom);
      const int steps = 24;
      for (int i = 0; i <= steps; i++) {
        final double x = c.dx - planetR + (2 * planetR) * (i / steps);
        final double t = i / steps;
        final double y = waterY +
            amp * math.sin(t * 2 * math.pi * 2 + spin) +
            amp * 0.5 * math.sin(t * 2 * math.pi * 3 - spin * 1.3);
        wave.lineTo(x, y);
      }
      wave
        ..lineTo(c.dx + planetR, bottom)
        ..close();
      canvas.drawPath(
        wave,
        Paint()
          ..shader = LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: <Color>[tide.first.withValues(alpha: 0.95), tide.last.withValues(alpha: 0.62)],
          ).createShader(coreRect),
      );
    }

    // Spherical shading: lit top-left, shadowed bottom-right.
    canvas.drawRect(
      coreRect,
      Paint()
        ..shader = RadialGradient(
          center: const Alignment(-0.45, -0.55),
          radius: 1.25,
          colors: <Color>[
            Colors.white.withValues(alpha: 0.20 + 0.10 * breath),
            Colors.white.withValues(alpha: 0),
            Colors.black.withValues(alpha: 0.28),
          ],
          stops: const <double>[0.0, 0.55, 1.0],
        ).createShader(coreRect),
    );
    canvas.restore();

    // Planet rim — a crisp top-lit hairline (rim light, no glow blob).
    canvas.drawArc(
      Rect.fromCircle(center: c, radius: planetR),
      math.pi,
      math.pi,
      false,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.2
        ..color = Colors.white.withValues(alpha: 0.22),
    );

    // 3) Ring — front half (over the planet).
    _ringHalf(canvas, c, rx, ry, back: false);
    if (!moonBehind) _moon(canvas, moonAt(spin), planetR * 0.16, dim: false);
  }

  /// Draws one half of the Saturn ring as two faint, gradient-tinted bands
  /// (with a thin Cassini-like gap). [back] = the upper (far) half.
  void _ringHalf(Canvas canvas, Offset c, double rx, double ry, {required bool back}) {
    canvas.save();
    canvas.translate(c.dx, c.dy);
    canvas.rotate(_tilt);

    final double startA = back ? math.pi : 0;
    const double sweep = math.pi;

    void band(double scale, double width, double alpha) {
      final Rect rect = Rect.fromCenter(center: Offset.zero, width: 2 * rx * scale, height: 2 * ry * scale);
      final Paint paint = Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = width
        ..shader = LinearGradient(
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
          colors: <Color>[
            ring.withValues(alpha: 0),
            ring.withValues(alpha: alpha),
            tide.last.withValues(alpha: alpha),
            ring.withValues(alpha: 0),
          ],
          stops: const <double>[0.0, 0.28, 0.72, 1.0],
        ).createShader(rect);
      canvas.drawArc(rect, startA, sweep, false, paint);
    }

    final double w = ry * 0.34;
    band(1.0, w, back ? 0.34 : 0.6);
    band(0.78, w * 0.7, back ? 0.24 : 0.42);
    canvas.restore();
  }

  void _moon(Canvas canvas, Offset at, double radius, {required bool dim}) {
    final double a = dim ? 0.5 : 1.0;
    canvas.drawCircle(
      at,
      radius * 2.0,
      Paint()
        ..color = tide.first.withValues(alpha: 0.18 * a)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4),
    );
    canvas.drawCircle(
      at,
      radius,
      Paint()..color = Color.lerp(tide.first, Colors.white, 0.3)!.withValues(alpha: a),
    );
  }

  @override
  bool shouldRepaint(_PlanetPainter old) =>
      old.level != level || old.spin != spin || old.breath != breath;
}
