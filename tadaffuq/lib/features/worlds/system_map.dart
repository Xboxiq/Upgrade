import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../theme/palette.dart';
import 'worlds_data.dart';

/// ════════════════════════════════════════════════════════════════════════
/// SystemMap — the platform's worlds rendered as a precise orrery.
///
/// A luminous core (the platform) sits at the centre; each training world is a
/// planet on its own concentric orbit, sized by the domain's scope and tide-
/// filled by your progress. Outer orbits drift slower (a calm Keplerian feel).
/// The live world wears a Saturn ring so it reads instantly; tapping any planet
/// opens that world. The arrangement is deterministic (golden-angle spacing) —
/// celestial, but ordered, never chaotic.
///
/// Honours `MediaQuery.disableAnimations`: the system freezes to a clean static
/// frame, and taps still resolve against the resting positions.
/// ════════════════════════════════════════════════════════════════════════
class SystemMap extends StatefulWidget {
  const SystemMap({super.key, required this.onOpen, this.height = 300});

  final void Function(TrainingWorld world) onOpen;
  final double height;

  @override
  State<SystemMap> createState() => _SystemMapState();
}

class _SystemMapState extends State<SystemMap> with SingleTickerProviderStateMixin {
  late final AnimationController _orbit = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 120),
  );
  bool _started = false;

  @override
  void dispose() {
    _orbit.dispose();
    super.dispose();
  }

  // Deterministic layout shared by the painter and the tap handler.
  List<_Body> _layout(Size size, double t) {
    final List<TrainingWorld> worlds = Worlds.all;
    final int n = worlds.length;
    final double cx = size.width / 2;
    final double cy = size.height / 2;
    const double ratio = 0.6; // vertical squash → viewed slightly from above
    const double margin = 30;
    const double coreR = 22;
    final double maxRx = math.min(size.width / 2 - margin, (size.height / 2 - margin) / ratio);

    int maxUnits = 1;
    for (final TrainingWorld w in worlds) {
      if (w.unitsTotal > maxUnits) maxUnits = w.unitsTotal;
    }

    final List<_Body> bodies = <_Body>[];
    for (int i = 0; i < n; i++) {
      final TrainingWorld w = worlds[i];
      final double orbitRx = coreR + (maxRx - coreR) * (i + 1) / n;
      final double orbitRy = orbitRx * ratio;
      final double speed = 0.6 / (i + 1); // outer planets slower
      final double base = -math.pi / 2 + i * 2.39996; // golden-angle spacing
      final double a = base + t * 2 * math.pi * speed;
      final Offset c = Offset(cx + orbitRx * math.cos(a), cy + orbitRy * math.sin(a));
      final double pr = 7 + 9 * (w.unitsTotal / maxUnits);
      bodies.add(_Body(world: w, center: c, radius: pr, orbitRx: orbitRx, orbitRy: orbitRy));
    }
    return bodies;
  }

  void _handleTap(TapUpDetails d) {
    final RenderObject? ro = context.findRenderObject();
    if (ro is! RenderBox) return;
    final bool reduce = MediaQuery.maybeOf(context)?.disableAnimations ?? false;
    final List<_Body> bodies = _layout(ro.size, reduce ? 0 : _orbit.value);
    _Body? hit;
    double best = double.infinity;
    for (final _Body b in bodies) {
      final double dist = (b.center - d.localPosition).distance;
      if (dist < b.radius + 14 && dist < best) {
        best = dist;
        hit = b;
      }
    }
    if (hit != null) widget.onOpen(hit.world);
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool reduce = MediaQuery.maybeOf(context)?.disableAnimations ?? false;
    if (!reduce && !_started) {
      _started = true;
      _orbit.repeat();
    }

    return GestureDetector(
      onTapUp: _handleTap,
      behavior: HitTestBehavior.opaque,
      child: SizedBox(
        height: widget.height,
        width: double.infinity,
        child: RepaintBoundary(
          child: AnimatedBuilder(
            animation: _orbit,
            builder: (BuildContext context, _) => CustomPaint(
              painter: _SystemPainter(
                layout: (Size s) => _layout(s, reduce ? 0 : _orbit.value),
                tide: p.tideGradient,
                ring: p.brand,
                orbitLine: p.line,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _Body {
  _Body({
    required this.world,
    required this.center,
    required this.radius,
    required this.orbitRx,
    required this.orbitRy,
  });
  final TrainingWorld world;
  final Offset center;
  final double radius;
  final double orbitRx;
  final double orbitRy;
}

class _SystemPainter extends CustomPainter {
  _SystemPainter({
    required this.layout,
    required this.tide,
    required this.ring,
    required this.orbitLine,
  });

  final List<_Body> Function(Size) layout;
  final List<Color> tide;
  final Color ring;
  final Color orbitLine;

  static const Color _coreTop = Color(0xFF24305C);
  static const Color _coreBottom = Color(0xFF070B18);

  @override
  void paint(Canvas canvas, Size size) {
    final Offset c = size.center(Offset.zero);
    final List<_Body> list = layout(size);

    // 1) Orbits — faint concentric ellipses (precise, evenly stepped).
    for (final _Body b in list) {
      canvas.drawOval(
        Rect.fromCenter(center: c, width: b.orbitRx * 2, height: b.orbitRy * 2),
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 0.6
          ..color = orbitLine,
      );
    }

    // 2) Core — the platform's luminous heart.
    _core(canvas, c, 22);

    // 3) Planets — far ones first so nearer ones overlap correctly.
    final List<_Body> sorted = List<_Body>.of(list)..sort((a, b) => a.center.dy.compareTo(b.center.dy));
    for (final _Body b in sorted) {
      _planet(canvas, b);
    }
  }

  void _core(Canvas canvas, Offset c, double r) {
    final Rect rect = Rect.fromCircle(center: c, radius: r);
    canvas.drawCircle(
      c,
      r,
      Paint()
        ..shader = RadialGradient(
          colors: <Color>[
            Color.lerp(tide.first, Colors.white, 0.4)!,
            tide.last,
            _coreBottom,
          ],
          stops: const <double>[0.0, 0.55, 1.0],
        ).createShader(rect),
    );
    canvas.drawArc(
      rect,
      math.pi,
      math.pi,
      false,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.2
        ..color = Colors.white.withValues(alpha: 0.3),
    );
  }

  void _planet(Canvas canvas, _Body b) {
    final Offset c = b.center;
    final double r = b.radius;
    final bool active = b.world.available;
    final double dim = active ? 1.0 : 0.55;
    final Rect rect = Rect.fromCircle(center: c, radius: r);

    // Sphere base.
    canvas.drawCircle(
      c,
      r,
      Paint()
        ..shader = RadialGradient(
          center: const Alignment(-0.4, -0.5),
          radius: 1.1,
          colors: <Color>[
            Color.lerp(_coreTop, tide.first, 0.2 + 0.6 * b.world.progress)!.withValues(alpha: dim),
            _coreBottom.withValues(alpha: dim),
          ],
        ).createShader(rect),
    );

    // Progress tide fill (lower portion), clipped to the sphere.
    if (b.world.progress > 0.01) {
      canvas.save();
      canvas.clipPath(Path()..addOval(rect));
      final double waterY = c.dy + r - (2 * r) * b.world.progress;
      canvas.drawRect(
        Rect.fromLTRB(c.dx - r, waterY, c.dx + r, c.dy + r),
        Paint()
          ..shader = LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: <Color>[tide.first.withValues(alpha: 0.95), tide.last.withValues(alpha: 0.6)],
          ).createShader(rect),
      );
      canvas.restore();
    }

    // Spherical shading.
    canvas.drawCircle(
      c,
      r,
      Paint()
        ..shader = RadialGradient(
          center: const Alignment(-0.45, -0.55),
          radius: 1.25,
          colors: <Color>[
            Colors.white.withValues(alpha: 0.22 * dim),
            Colors.white.withValues(alpha: 0),
            Colors.black.withValues(alpha: 0.30),
          ],
          stops: const <double>[0.0, 0.55, 1.0],
        ).createShader(rect),
    );

    // The live world wears a thin Saturn ring so it's instantly identifiable.
    if (active) {
      canvas.save();
      canvas.translate(c.dx, c.dy);
      canvas.rotate(-0.42);
      final Rect rr = Rect.fromCenter(center: Offset.zero, width: r * 3.4, height: r * 1.15);
      canvas.drawOval(
        rr,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2
          ..shader = LinearGradient(
            colors: <Color>[ring.withValues(alpha: 0), ring, tide.last, ring.withValues(alpha: 0)],
            stops: const <double>[0.0, 0.3, 0.7, 1.0],
          ).createShader(rr),
      );
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(_SystemPainter old) => true;
}
