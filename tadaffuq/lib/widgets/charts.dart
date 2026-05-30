import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../theme/palette.dart';
import '../theme/tokens.dart';

/// ════════════════════════════════════════════════════════════════════════
/// Signature data visuals, hand-painted to match Cosmic Flow — never a generic
/// charting package. Each animates in once (grow from zero) and honours
/// reduced-motion. Depth is rim/tonal; colour is the azure→violet flow.
/// ════════════════════════════════════════════════════════════════════════

/// A weekly activity histogram — flowing bars that grow from the baseline,
/// today highlighted. [values] are 0..1, one per [labels] entry.
class ActivityBars extends StatelessWidget {
  const ActivityBars({
    super.key,
    required this.values,
    required this.labels,
    this.highlight = -1,
    this.height = 120,
  });

  final List<double> values;
  final List<String> labels;
  final int highlight;
  final double height;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final bool reduce = MediaQuery.maybeOf(context)?.disableAnimations ?? false;

    return Column(
      children: <Widget>[
        SizedBox(
          height: height,
          width: double.infinity,
          child: TweenAnimationBuilder<double>(
            tween: Tween<double>(begin: reduce ? 1 : 0, end: 1),
            duration: reduce ? Duration.zero : Motion.morph,
            curve: Motion.emphasized,
            builder: (BuildContext context, double t, _) => CustomPaint(
              painter: _BarsPainter(
                values: values,
                t: t,
                highlight: highlight,
                flow: p.tideGradient,
                idle: p.brand.withValues(alpha: 0.30),
                baseline: p.line,
              ),
            ),
          ),
        ),
        const SizedBox(height: Space.x2),
        Row(
          children: <Widget>[
            for (int i = 0; i < labels.length; i++)
              Expanded(
                child: Text(
                  labels[i],
                  textAlign: TextAlign.center,
                  style: tt.labelSmall?.copyWith(
                    color: i == highlight ? p.brand : p.inkFaint,
                    fontSize: 10.5,
                    fontWeight: i == highlight ? FontWeight.w700 : FontWeight.w500,
                  ),
                ),
              ),
          ],
        ),
      ],
    );
  }
}

class _BarsPainter extends CustomPainter {
  _BarsPainter({
    required this.values,
    required this.t,
    required this.highlight,
    required this.flow,
    required this.idle,
    required this.baseline,
  });

  final List<double> values;
  final double t;
  final int highlight;
  final List<Color> flow;
  final Color idle;
  final Color baseline;

  @override
  void paint(Canvas canvas, Size size) {
    final int n = values.length;
    if (n == 0) return;
    final double slot = size.width / n;
    final double barW = slot * 0.46;
    final double base = size.height - 0.5;

    canvas.drawLine(
      Offset(0, base),
      Offset(size.width, base),
      Paint()
        ..color = baseline
        ..strokeWidth = 0.5,
    );

    for (int i = 0; i < n; i++) {
      final double cx = slot * i + slot / 2;
      final double h = (size.height - 6) * values[i].clamp(0, 1) * t;
      final Rect r = Rect.fromLTWH(cx - barW / 2, base - h, barW, h);
      final RRect rr = RRect.fromRectAndCorners(
        r,
        topLeft: Radius.circular(barW / 2),
        topRight: Radius.circular(barW / 2),
      );
      final bool hot = i == highlight;
      final Paint paint = Paint()
        ..shader = hot
            ? LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: flow,
              ).createShader(Rect.fromLTWH(r.left, 0, r.width, size.height))
            : null
        ..color = hot ? Colors.white : idle;
      canvas.drawRRect(rr, paint);
    }
  }

  @override
  bool shouldRepaint(_BarsPainter old) => old.t != t || old.highlight != highlight;
}

/// A skills radar (spider) chart. [data] entries carry a label and 0..1 value.
class RadarEntry {
  const RadarEntry(this.label, this.value);
  final String label;
  final double value;
}

class RadarChart extends StatelessWidget {
  const RadarChart({super.key, required this.data, this.size = 240});

  final List<RadarEntry> data;
  final double size;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool reduce = MediaQuery.maybeOf(context)?.disableAnimations ?? false;

    return SizedBox(
      width: size,
      height: size,
      child: TweenAnimationBuilder<double>(
        tween: Tween<double>(begin: reduce ? 1 : 0, end: 1),
        duration: reduce ? Duration.zero : Motion.morph,
        curve: Motion.emphasized,
        builder: (BuildContext context, double t, _) => CustomPaint(
          painter: _RadarPainter(
            data: data,
            t: t,
            grid: p.line,
            gridStrong: p.lineStrong,
            fill: p.tideGradient,
            ink: p.inkMuted,
            textStyle: AppTheme.mono(size: 10, color: p.inkMuted),
          ),
        ),
      ),
    );
  }
}

class _RadarPainter extends CustomPainter {
  _RadarPainter({
    required this.data,
    required this.t,
    required this.grid,
    required this.gridStrong,
    required this.fill,
    required this.ink,
    required this.textStyle,
  });

  final List<RadarEntry> data;
  final double t;
  final Color grid;
  final Color gridStrong;
  final List<Color> fill;
  final Color ink;
  final TextStyle textStyle;

  @override
  void paint(Canvas canvas, Size size) {
    final int n = data.length;
    if (n < 3) return;
    final Offset c = size.center(Offset.zero);
    final double radius = size.shortestSide / 2 - 26;
    const double start = -math.pi / 2;

    Offset vertex(int i, double r) {
      final double a = start + i * 2 * math.pi / n;
      return Offset(c.dx + r * math.cos(a), c.dy + r * math.sin(a));
    }

    // Concentric grid rings.
    for (int ring = 1; ring <= 4; ring++) {
      final double rr = radius * ring / 4;
      final Path path = Path();
      for (int i = 0; i <= n; i++) {
        final Offset v = vertex(i % n, rr);
        if (i == 0) {
          path.moveTo(v.dx, v.dy);
        } else {
          path.lineTo(v.dx, v.dy);
        }
      }
      canvas.drawPath(
        path,
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = ring == 4 ? 1 : 0.5
          ..color = ring == 4 ? gridStrong : grid,
      );
    }

    // Axes.
    for (int i = 0; i < n; i++) {
      canvas.drawLine(c, vertex(i, radius), Paint()
        ..strokeWidth = 0.5
        ..color = grid);
    }

    // Data polygon.
    final Path data2 = Path();
    for (int i = 0; i < n; i++) {
      final Offset v = vertex(i, radius * data[i].value.clamp(0, 1) * t);
      if (i == 0) {
        data2.moveTo(v.dx, v.dy);
      } else {
        data2.lineTo(v.dx, v.dy);
      }
    }
    data2.close();

    final Rect b = Rect.fromCircle(center: c, radius: radius);
    canvas.drawPath(
      data2,
      Paint()
        ..style = PaintingStyle.fill
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: <Color>[
            fill.first.withValues(alpha: 0.38),
            fill.last.withValues(alpha: 0.16),
          ],
        ).createShader(b),
    );
    canvas.drawPath(
      data2,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..shader = LinearGradient(colors: fill).createShader(b),
    );

    // Vertices + labels.
    for (int i = 0; i < n; i++) {
      final Offset v = vertex(i, radius * data[i].value.clamp(0, 1) * t);
      canvas.drawCircle(v, 3, Paint()..color = fill.first);

      final Offset lp = vertex(i, radius + 16);
      final TextPainter tp = TextPainter(
        text: TextSpan(text: data[i].label, style: textStyle),
        textDirection: TextDirection.rtl,
        textAlign: TextAlign.center,
      )..layout(maxWidth: 80);
      tp.paint(canvas, Offset(lp.dx - tp.width / 2, lp.dy - tp.height / 2));
    }
  }

  @override
  bool shouldRepaint(_RadarPainter old) => old.t != t || old.data != data;
}

/// A thin labelled progress meter (rim-light friendly) for per-world mastery.
class FlowMeter extends StatelessWidget {
  const FlowMeter({super.key, required this.value, this.height = 8});
  final double value; // 0..1
  final double height;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool reduce = MediaQuery.maybeOf(context)?.disableAnimations ?? false;
    return ClipRRect(
      borderRadius: BorderRadius.circular(height),
      child: SizedBox(
        height: height,
        width: double.infinity,
        child: Stack(
          children: <Widget>[
            Positioned.fill(child: ColoredBox(color: p.fill)),
            TweenAnimationBuilder<double>(
              tween: Tween<double>(begin: reduce ? value : 0, end: value),
              duration: reduce ? Duration.zero : Motion.morph,
              curve: Motion.emphasized,
              builder: (BuildContext context, double v, _) => FractionallySizedBox(
                widthFactor: v.clamp(0, 1),
                alignment: AlignmentDirectional.centerStart,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: p.tideGradient),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
