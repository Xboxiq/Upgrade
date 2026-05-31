import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../theme/app_icons.dart';
import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../util/numerals.dart';
import '../../widgets/aurora_background.dart';
import '../../widgets/depth.dart';
import '../../widgets/press_scale.dart';
import '../../widgets/transitions.dart';
import '../../widgets/ui_bits.dart';
import '../callcenter/callcenter_data.dart';
import '../callcenter/widgets/technique_detail.dart';
import '../worlds/worlds_data.dart';

/// ════════════════════════════════════════════════════════════════════════
/// WorldJourneyScreen — a SPATIAL TIMELINE of a world's curriculum.
///
/// Nodes float asymmetrically in Z-space (absolute `Positioned` over a `Stack`,
/// not a column/grid), woven together by hand-painted **bezier connectors**
/// that trace the journey. Frosted-glass nodes (frost + dark seam + matte
/// grain — no lighter rim / glow / drop shadow), spring scroll (Bouncing
/// physics), haptics on every meaningful tap, and `RepaintBoundary`-isolated
/// paint for a locked frame rate.
/// ════════════════════════════════════════════════════════════════════════
class WorldJourneyScreen extends StatefulWidget {
  const WorldJourneyScreen({super.key, required this.world});
  final TrainingWorld world;

  @override
  State<WorldJourneyScreen> createState() => _WorldJourneyScreenState();
}

class _JourneyStop {
  const _JourneyStop({required this.title, required this.subtitle, this.technique});
  final String title;
  final String subtitle;
  final Technique? technique;
}

class _WorldJourneyScreenState extends State<WorldJourneyScreen> {
  final ScrollController _scroll = ScrollController();

  late final List<_JourneyStop> _stops = _buildStops();
  late final int _done = _doneCount();

  List<_JourneyStop> _buildStops() {
    if (widget.world.id == 'callcenter') {
      return <_JourneyStop>[
        for (final Technique t in CallCenterData.techniques)
          _JourneyStop(title: t.title, subtitle: t.quality, technique: t),
      ];
    }
    return List<_JourneyStop>.generate(
      6,
      (int i) => _JourneyStop(title: 'الوحدة ${Arabic.n(i + 1)}', subtitle: 'محتوى قيد الإعداد'),
    );
  }

  int _doneCount() {
    if (widget.world.id == 'callcenter') {
      return CallCenterData.techniques.where((Technique t) => t.progress >= 100).length;
    }
    return 0;
  }

  // Deterministic, organic spatial layout — nodes weave left/right down a path.
  List<Offset> _centers(double width, double topStart, double spacing) {
    return <Offset>[
      for (int i = 0; i < _stops.length; i++)
        Offset(
          width * (i.isEven ? 0.40 : 0.60) + 10 * math.sin(i * 1.3),
          topStart + i * spacing,
        ),
    ];
  }

  void _openStop(_JourneyStop s, _NodeState state) {
    if (state == _NodeState.locked) {
      HapticFeedback.lightImpact();
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(SnackBar(
          behavior: SnackBarBehavior.floating,
          backgroundColor: context.palette.surface2,
          content: Text('أكمِل ما قبلها لفتح هذه المحطّة',
              style: TextStyle(color: context.palette.ink)),
        ));
      return;
    }
    HapticFeedback.mediumImpact();
    if (s.technique != null) {
      Navigator.of(context).push(revealRoute(TechniqueDetail(technique: s.technique!)));
    }
  }

  @override
  void dispose() {
    _scroll.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final double width = MediaQuery.of(context).size.width;
    final double topPad = MediaQuery.of(context).padding.top;
    final bool reduce = MediaQuery.maybeOf(context)?.disableAnimations ?? false;

    final double topStart = topPad + 150;
    const double spacing = 158;
    final double cardW = (width * 0.6).clamp(208.0, 300.0);
    const double cardH = 104;
    final double contentHeight = topStart + _stops.length * spacing + 80;

    final List<Offset> centers = _centers(width, topStart, spacing);

    return Scaffold(
      backgroundColor: p.canvas,
      body: Stack(
        children: <Widget>[
          Positioned.fill(child: AuroraBackground(scrollable: _scroll)),

          // The spatial journey — absolute layout in a spring-scrolled space.
          Positioned.fill(
            child: SingleChildScrollView(
              controller: _scroll,
              physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
              child: SizedBox(
                height: contentHeight,
                width: width,
                child: Stack(
                  children: <Widget>[
                    // 1px bezier connectors tracing the path (behind the nodes).
                    Positioned.fill(
                      child: RepaintBoundary(
                        child: CustomPaint(
                          painter: _ConnectorPainter(
                            centers: centers,
                            doneCount: _done,
                            flow: p.tideGradient,
                            brand: p.brand,
                            faint: p.lineStrong,
                            dotBg: p.canvas,
                          ),
                        ),
                      ),
                    ),

                    // Intro block at the top of the journey.
                    Positioned(
                      top: topPad + 64,
                      right: Space.x5,
                      left: Space.x5,
                      child: _intro(p),
                    ),

                    // Floating glass nodes.
                    for (int i = 0; i < _stops.length; i++)
                      _positionNode(i, centers[i], cardW, cardH, reduce),
                  ],
                ),
              ),
            ),
          ),

          // Floating frosted header (back + title + progress).
          Positioned(top: 0, left: 0, right: 0, child: _header(p, topPad)),
        ],
      ),
    );
  }

  _NodeState _stateFor(int i) {
    if (!widget.world.available) return _NodeState.locked;
    if (i < _done) return _NodeState.done;
    if (i == _done) return _NodeState.current;
    return _NodeState.locked;
  }

  Widget _positionNode(int i, Offset c, double cardW, double cardH, bool reduce) {
    final _NodeState state = _stateFor(i);
    Widget node = _JourneyNode(
      index: i,
      stop: _stops[i],
      state: state,
      width: cardW,
      height: cardH,
      onTap: () => _openStop(_stops[i], state),
    );
    if (!reduce) {
      node = TweenAnimationBuilder<double>(
        tween: Tween<double>(begin: 0, end: 1),
        duration: Motion.morph + Duration(milliseconds: i * 70),
        curve: Motion.spring,
        builder: (BuildContext context, double v, Widget? child) => Opacity(
          opacity: v.clamp(0, 1),
          child: Transform.scale(scale: 0.9 + 0.1 * v, child: child),
        ),
        child: node,
      );
    }
    return Positioned(
      left: c.dx - cardW / 2,
      top: c.dy - cardH / 2,
      width: cardW,
      child: node,
    );
  }

  Widget _intro(AppPalette p) {
    final TextTheme tt = Theme.of(context).textTheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text('رحلة الإتقان', style: tt.labelMedium?.copyWith(color: p.brand, letterSpacing: 1)),
        const SizedBox(height: Space.x1),
        Text(widget.world.title, style: tt.displaySmall),
        const SizedBox(height: Space.x2),
        Text('تتبّع مسارك محطّةً محطّة — كل عقدة تفتح ما بعدها.',
            style: tt.bodyMedium?.copyWith(color: p.inkMuted)),
      ],
    );
  }

  Widget _header(AppPalette p, double topPad) {
    final TextTheme tt = Theme.of(context).textTheme;
    final double pct = widget.world.progress;
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 22, sigmaY: 22),
        child: Container(
          padding: EdgeInsets.fromLTRB(Space.x4, topPad + Space.x2, Space.x4, Space.x3),
          decoration: BoxDecoration(
            color: p.materialTint,
            border: Border(bottom: BorderSide(color: p.seam, width: 0.5)),
          ),
          child: Row(
            children: <Widget>[
              NavCircleButton(
                icon: AppIcons.arrowLeft,
                onTap: () => Navigator.of(context).maybePop(),
              ),
              const SizedBox(width: Space.x3),
              Expanded(child: Text(widget.world.title, style: tt.titleMedium, maxLines: 1, overflow: TextOverflow.ellipsis)),
              Text('${Arabic.n(_done)}/${Arabic.n(_stops.length)}',
                  style: AppTheme.mono(size: 13, weight: FontWeight.w700, color: p.brand)),
              const SizedBox(width: Space.x2),
              Text(Arabic.pct(pct), style: AppTheme.mono(size: 12, color: p.inkFaint)),
            ],
          ),
        ),
      ),
    );
  }
}

enum _NodeState { done, current, locked }

class _JourneyNode extends StatelessWidget {
  const _JourneyNode({
    required this.index,
    required this.stop,
    required this.state,
    required this.width,
    required this.height,
    required this.onTap,
  });

  final int index;
  final _JourneyStop stop;
  final _NodeState state;
  final double width;
  final double height;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;

    final Color accent = switch (state) {
      _NodeState.done => p.success,
      _NodeState.current => p.brand,
      _NodeState.locked => p.inkFaint,
    };
    final IconData lead = switch (state) {
      _NodeState.done => AppIcons.checkCircle,
      _NodeState.current => AppIcons.target,
      _NodeState.locked => AppIcons.timer,
    };

    return PressScale(
      onTap: onTap,
      pressedScale: 0.97,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(Radii.lg),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
          child: Container(
            height: height,
            padding: const EdgeInsets.all(Space.x4),
            decoration: BoxDecoration(
              color: state == _NodeState.current
                  ? Color.alphaBlend(p.brand.withValues(alpha: p.isDark ? 0.14 : 0.08), p.glassTint)
                  : p.glassTint,
              borderRadius: BorderRadius.circular(Radii.lg),
              border: Border.all(color: p.seam, width: 0.5),
            ),
            child: Stack(
              children: <Widget>[
                SurfaceGrain(radius: Radii.lg, dark: p.isDark),
                Row(
                  children: <Widget>[
                    _NodeMarker(state: state, accent: accent, icon: lead),
                    const SizedBox(width: Space.x3),
                    Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Row(
                            children: <Widget>[
                              Text('المحطّة ${Arabic.n(index + 1)}',
                                  style: tt.labelSmall?.copyWith(color: accent, fontSize: 10.5)),
                              if (state == _NodeState.current) ...<Widget>[
                                const SizedBox(width: Space.x2),
                                Text('الآن', style: tt.labelSmall?.copyWith(color: p.brand, fontSize: 10.5)),
                              ],
                            ],
                          ),
                          const SizedBox(height: 3),
                          Text(stop.title,
                              style: tt.titleMedium?.copyWith(fontSize: 15),
                              maxLines: 2, overflow: TextOverflow.ellipsis),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _NodeMarker extends StatelessWidget {
  const _NodeMarker({required this.state, required this.accent, required this.icon});
  final _NodeState state;
  final Color accent;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    return Container(
      width: 40,
      height: 40,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: state == _NodeState.locked ? p.fill : accent.withValues(alpha: p.isDark ? 0.16 : 0.12),
        shape: BoxShape.circle,
      ),
      child: Icon(icon, size: 20, color: accent),
    );
  }
}

/// Hand-painted bezier path threading the floating nodes — the fluid journey.
class _ConnectorPainter extends CustomPainter {
  _ConnectorPainter({
    required this.centers,
    required this.doneCount,
    required this.flow,
    required this.brand,
    required this.faint,
    required this.dotBg,
  });

  final List<Offset> centers;
  final int doneCount;
  final List<Color> flow;
  final Color brand;
  final Color faint;
  final Color dotBg;

  @override
  void paint(Canvas canvas, Size size) {
    for (int i = 0; i < centers.length - 1; i++) {
      final Offset a = centers[i];
      final Offset b = centers[i + 1];
      final double midY = (a.dy + b.dy) / 2;
      final Path path = Path()
        ..moveTo(a.dx, a.dy)
        ..cubicTo(a.dx, midY, b.dx, midY, b.dx, b.dy);

      final bool lit = (i + 1) <= doneCount;
      final Paint stroke = Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = lit ? 2.4 : 1.2
        ..strokeCap = StrokeCap.round;
      if (lit) {
        stroke.shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: flow,
        ).createShader(Rect.fromPoints(a, b));
      } else {
        stroke.color = faint;
      }
      canvas.drawPath(path, stroke);
    }

    // Node dots — crisp, no glow. Punched out of the path with a bg ring.
    for (int i = 0; i < centers.length; i++) {
      final bool lit = i < doneCount;
      final bool current = i == doneCount;
      canvas.drawCircle(centers[i], 6, Paint()..color = dotBg);
      canvas.drawCircle(
        centers[i],
        current ? 5.5 : 4,
        Paint()..color = (lit || current) ? brand : faint,
      );
      if (current) {
        canvas.drawCircle(
          centers[i],
          9,
          Paint()
            ..style = PaintingStyle.stroke
            ..strokeWidth = 1.4
            ..color = brand.withValues(alpha: 0.6),
        );
      }
    }
  }

  @override
  bool shouldRepaint(_ConnectorPainter old) =>
      old.centers != centers || old.doneCount != doneCount || old.brand != brand;
}
