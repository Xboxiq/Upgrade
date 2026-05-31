import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../util/numerals.dart';
import 'worlds_data.dart';

/// ════════════════════════════════════════════════════════════════════════
/// SystemMap — the platform's worlds rendered as a precise, interactive orrery.
///
/// A luminous core (overall mastery) sits at the centre; each training world is
/// a planet on its own concentric orbit, sized by domain scope and tide-filled
/// by progress. Outer orbits drift slower (a calm Keplerian feel); the live
/// world wears a Saturn ring. Layout is deterministic (golden-angle spacing) —
/// celestial, but ordered.
///
/// Interaction (precise touches):
///   • TAP a planet to SELECT it (haptic) — it lifts and gains a halo ring; the
///     parent shows its detail panel.
///   • DRAG horizontally to rotate the whole system.
///   • Honours reduced-motion: drift freezes, taps still resolve.
/// ════════════════════════════════════════════════════════════════════════
class SystemMap extends StatefulWidget {
  const SystemMap({
    super.key,
    required this.onSelect,
    this.selectedId,
    this.height = 340,
  });

  final void Function(TrainingWorld world) onSelect;
  final String? selectedId;
  final double height;

  @override
  State<SystemMap> createState() => _SystemMapState();
}

class _SystemMapState extends State<SystemMap> with SingleTickerProviderStateMixin {
  late final AnimationController _orbit = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 140),
  );
  double _drag = 0;
  bool _started = false;

  @override
  void dispose() {
    _orbit.dispose();
    super.dispose();
  }

  List<_Body> _layout(Size size, double t) {
    final List<TrainingWorld> worlds = Worlds.all;
    final int n = worlds.length;
    final double cx = size.width / 2;
    final double cy = size.height / 2;
    const double ratio = 0.58;
    const double margin = 34;
    const double coreR = 26;
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
      final double speed = 0.6 / (i + 1);
      final double base = -math.pi / 2 + i * 2.39996;
      final double a = base + t * 2 * math.pi * speed + _drag;
      final Offset c = Offset(cx + orbitRx * math.cos(a), cy + orbitRy * math.sin(a));
      final double pr = 8 + 9 * (w.unitsTotal / maxUnits);
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
      if (dist < b.radius + 16 && dist < best) {
        best = dist;
        hit = b;
      }
    }
    if (hit != null) {
      HapticFeedback.selectionClick();
      widget.onSelect(hit.world);
    }
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
      behavior: HitTestBehavior.opaque,
      onTapUp: _handleTap,
      onHorizontalDragUpdate: (DragUpdateDetails d) =>
          setState(() => _drag += (d.primaryDelta ?? 0) * 0.01),
      child: SizedBox(
        height: widget.height,
        width: double.infinity,
        child: Stack(
          children: <Widget>[
            Positioned.fill(
              child: RepaintBoundary(
                child: AnimatedBuilder(
                  animation: _orbit,
                  builder: (BuildContext context, _) => CustomPaint(
                    painter: _SystemPainter(
                      layout: (Size s) => _layout(s, reduce ? 0 : _orbit.value),
                      pulse: reduce ? 0 : _orbit.value,
                      selectedId: widget.selectedId,
                      tide: p.tideGradient,
                      ring: p.brand,
                      orbitLine: p.line,
                      overall: Worlds.overallProgress,
                    ),
                  ),
                ),
              ),
            ),
            // Core readout — overall platform mastery, crisp text on the core.
            Center(
              child: IgnorePointer(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Text(
                      Arabic.pct(Worlds.overallProgress * 100),
                      style: AppTheme.mono(size: 15, weight: FontWeight.w700, color: const Color(0xFFF1F4FF)),
                    ),
                    Text('إتقان عام',
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: const Color(0xFFAEB8D6), fontSize: 9)),
                  ],
                ),
              ),
            ),
          ],
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
    required this.pulse,
    required this.selectedId,
    required this.tide,
    required this.ring,
    required this.orbitLine,
    required this.overall,
  });

  final List<_Body> Function(Size) layout;
  final double pulse;
  final String? selectedId;
  final List<Color> tide;
  final Color ring;
  final Color orbitLine;
  final double overall;

  static const Color _coreTop = Color(0xFF223032);
  static const Color _coreBottom = Color(0xFF070A0A);

  @override
  void paint(Canvas canvas, Size size) {
    final Offset c = size.center(Offset.zero);
    final List<_Body> list = layout(size);

    for (final _Body b in list) {
      final bool sel = b.world.id == selectedId;
      canvas.drawOval(
        Rect.fromCenter(center: c, width: b.orbitRx * 2, height: b.orbitRy * 2),
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = sel ? 1.0 : 0.6
          ..color = sel ? ring.withValues(alpha: 0.35) : orbitLine,
      );
    }

    _core(canvas, c, 26);

    final List<_Body> sorted = List<_Body>.of(list)..sort((a, b) => a.center.dy.compareTo(b.center.dy));
    for (final _Body b in sorted) {
      _planet(canvas, b, b.world.id == selectedId);
    }
  }

  void _core(Canvas canvas, Offset c, double r) {
    final Rect rect = Rect.fromCircle(center: c, radius: r);
    canvas.drawCircle(
      c,
      r,
      Paint()
        ..shader = RadialGradient(
          colors: <Color>[Color.lerp(tide.first, Colors.white, 0.4)!, tide.last, _coreBottom],
          stops: const <double>[0.0, 0.5, 1.0],
        ).createShader(rect),
    );
    canvas.drawArc(
      Rect.fromCircle(center: c, radius: r + 3),
      -math.pi / 2,
      2 * math.pi * overall.clamp(0, 1),
      false,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..strokeCap = StrokeCap.round
        ..shader = LinearGradient(colors: tide).createShader(rect),
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

  void _planet(Canvas canvas, _Body b, bool selected) {
    final Offset c = b.center;
    final double r = b.radius * (selected ? 1.16 : 1.0);
    final bool active = b.world.available;
    final double dim = active ? 1.0 : 0.5;
    final Rect rect = Rect.fromCircle(center: c, radius: r);

    if (selected) {
      final double halo = 6 + 2 * math.sin(pulse * 2 * math.pi);
      canvas.drawCircle(
        c,
        r + halo,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.5
          ..color = ring.withValues(alpha: 0.6),
      );
    }

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
