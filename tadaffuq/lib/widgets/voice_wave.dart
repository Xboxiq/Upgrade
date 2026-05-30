import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../theme/palette.dart';

/// ════════════════════════════════════════════════════════════════════════
/// VoiceWave — a live, breathing waveform that *represents the voice* heading
/// the voice-profile section. Bars rise and fall continuously like a calm
/// audio meter, tinted with the cyan tide.
///
/// This is a representational animation (a ticker-driven equalizer), not a
/// microphone capture — its job is to make "voice" feel alive on screen.
/// Honours `MediaQuery.disableAnimations`: bars settle into a static profile.
/// ════════════════════════════════════════════════════════════════════════
class VoiceWave extends StatefulWidget {
  const VoiceWave({
    super.key,
    this.bars = 34,
    this.height = 44,
    this.color,
  });

  final int bars;
  final double height;
  final Color? color;

  @override
  State<VoiceWave> createState() => _VoiceWaveState();
}

class _VoiceWaveState extends State<VoiceWave>
    with SingleTickerProviderStateMixin {
  late final AnimationController _t = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 4),
  );

  bool _started = false;

  @override
  void dispose() {
    _t.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool reduceMotion = MediaQuery.maybeOf(context)?.disableAnimations ?? false;

    if (!reduceMotion && !_started) {
      _started = true;
      _t.repeat();
    }

    return SizedBox(
      height: widget.height,
      width: double.infinity,
      child: RepaintBoundary(
        child: AnimatedBuilder(
          animation: _t,
          builder: (BuildContext context, _) {
            return CustomPaint(
              painter: _WavePainter(
                phase: reduceMotion ? 0.0 : _t.value,
                bars: widget.bars,
                colors: <Color>[
                  (widget.color ?? p.brand).withValues(alpha: 0.55),
                  widget.color ?? p.brand,
                ],
                live: !reduceMotion,
              ),
            );
          },
        ),
      ),
    );
  }
}

class _WavePainter extends CustomPainter {
  _WavePainter({
    required this.phase,
    required this.bars,
    required this.colors,
    required this.live,
  });

  final double phase;
  final int bars;
  final List<Color> colors;
  final bool live;

  @override
  void paint(Canvas canvas, Size size) {
    final double gap = size.width / bars;
    final double barW = gap * 0.5;
    final double midY = size.height / 2;
    final double k = phase * 2 * math.pi;

    for (int i = 0; i < bars; i++) {
      final double x = gap * i + gap / 2;
      final double n = i / bars;

      // A blend of travelling sine waves gives an organic, non-repetitive feel.
      final double env = live
          ? 0.35 +
              0.65 *
                  (0.5 +
                      0.5 *
                          math.sin(n * math.pi * 6 + k) *
                          math.cos(n * math.pi * 2 - k * 0.7))
          // Static profile: a gentle centre-weighted envelope.
          : 0.3 + 0.7 * math.sin(n * math.pi);

      final double h = (size.height * 0.9) * env.clamp(0.08, 1.0);

      final Rect r = Rect.fromCenter(center: Offset(x, midY), width: barW, height: h);
      final Paint paint = Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: colors,
        ).createShader(r);
      canvas.drawRRect(RRect.fromRectAndRadius(r, Radius.circular(barW)), paint);
    }
  }

  @override
  bool shouldRepaint(_WavePainter old) => old.phase != phase || old.live != live;
}
