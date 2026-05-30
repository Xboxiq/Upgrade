import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../../theme/app_icons.dart';
import '../../../theme/palette.dart';
import '../../../theme/tokens.dart';
import '../../../ui/controls.dart';
import '../../../widgets/press_scale.dart';
import '../../../widgets/progress_ring.dart';
import '../../../widgets/surface_card.dart';
import '../../../widgets/ui_bits.dart';
import '../callcenter_data.dart';

/// A technique's detail surface, opened via a reveal transition. Hosts the
/// script dialogue and quality indicator, and a Zen / Focus mode that recedes
/// the world by subtraction — leaving only the breathing ring + the objective.
class TechniqueDetail extends StatefulWidget {
  const TechniqueDetail({super.key, required this.technique});
  final Technique technique;

  @override
  State<TechniqueDetail> createState() => _TechniqueDetailState();
}

class _TechniqueDetailState extends State<TechniqueDetail>
    with SingleTickerProviderStateMixin {
  late final AnimationController _focus = AnimationController(vsync: this, duration: Motion.zen);
  late double _ring = widget.technique.progress;
  bool _focusOn = false;

  @override
  void dispose() {
    _focus.dispose();
    super.dispose();
  }

  void _enterFocus() {
    setState(() => _focusOn = true);
    _focus.forward();
  }

  Future<void> _exitFocus() async {
    await _focus.reverse();
    if (mounted) setState(() => _focusOn = false);
  }

  Future<void> _finish() async {
    setState(() => _ring = 100);
    await Future<void>.delayed(Motion.panel);
    await _exitFocus();
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final Technique t = widget.technique;

    return Scaffold(
      backgroundColor: p.canvas,
      body: Stack(
        children: <Widget>[
          SafeArea(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              padding: const EdgeInsets.fromLTRB(Space.x4, Space.x3, Space.x4, Space.x12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      InfoPill('مهارة تدريبية', color: p.brand),
                      const Spacer(),
                      _circleBtn(p, AppIcons.x, () => Navigator.of(context).maybePop()),
                    ],
                  ),
                  const SizedBox(height: Space.x5),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            IconBadge(t.icon, tint: p.brand, size: 52, iconSize: 26),
                            const SizedBox(height: Space.x4),
                            Text(t.title, style: tt.displayMedium),
                            const SizedBox(height: Space.x3),
                            Text(t.blurb, style: tt.bodyLarge),
                          ],
                        ),
                      ),
                      const SizedBox(width: Space.x4),
                      ProgressRing(value: _ring, size: 88),
                    ],
                  ),
                  const SizedBox(height: Space.x6),
                  Text('السكريبت الاحترافي', style: tt.titleLarge),
                  const SizedBox(height: Space.x3),
                  SurfaceCard(
                    interactive: false,
                    padding: const EdgeInsets.all(Space.x4),
                    child: Column(
                      children: <Widget>[
                        for (int i = 0; i < t.script.length; i++) ...<Widget>[
                          _scriptLine(p, t.script[i]),
                          if (i != t.script.length - 1) const SizedBox(height: Space.x3),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(height: Space.x4),
                  NoteCard(
                    text: 'مؤشر الجودة: ${t.quality}',
                    icon: AppIcons.checkCircle,
                    kind: NoteKind.success,
                  ),
                  const SizedBox(height: Space.x6),
                  FilledCta(label: 'ادخل وضع التركيز', icon: AppIcons.target, onTap: _enterFocus),
                ].animate(interval: 55.ms).fadeIn(duration: Motion.emerge).moveY(begin: 12, end: 0, curve: Motion.standard),
              ),
            ),
          ),

          // Zen veil
          AnimatedBuilder(
            animation: _focus,
            builder: (BuildContext context, _) {
              final double v = _focus.value;
              if (v == 0) return const SizedBox.shrink();
              return Positioned.fill(
                child: IgnorePointer(
                  ignoring: v < 0.5,
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 10 * v, sigmaY: 10 * v),
                    child: ColoredBox(color: p.canvasSink.withValues(alpha: 0.92 * v)),
                  ),
                ),
              );
            },
          ),

          if (_focusOn)
            _FocusClearing(animation: _focus, title: t.title, ring: _ring, onFinish: _finish, onExit: _exitFocus),
        ],
      ),
    );
  }

  Widget _circleBtn(AppPalette p, IconData icon, VoidCallback onTap) {
    return PressScale(
      onTap: onTap,
      pressedScale: 0.9,
      child: Container(
        width: 38,
        height: 38,
        decoration: BoxDecoration(color: p.fill, borderRadius: BorderRadius.circular(Radii.pill)),
        child: Icon(icon, size: 19, color: p.inkMuted),
      ),
    );
  }

  Widget _scriptLine(AppPalette p, ScriptLine line) {
    final TextTheme tt = Theme.of(context).textTheme;
    final Color tint = line.agent ? p.brand : p.inkMuted;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Row(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Icon(line.agent ? AppIcons.headset : AppIcons.user, size: 14, color: tint),
            const SizedBox(width: Space.x2),
            Text(line.agent ? 'أنت' : 'العميل', style: tt.labelSmall?.copyWith(color: tint)),
          ],
        ),
        const SizedBox(height: Space.x2),
        Text(line.text, style: tt.bodyLarge?.copyWith(color: p.ink, fontSize: 15.5)),
      ],
    );
  }
}

class _FocusClearing extends StatelessWidget {
  const _FocusClearing({
    required this.animation,
    required this.title,
    required this.ring,
    required this.onFinish,
    required this.onExit,
  });

  final Animation<double> animation;
  final String title;
  final double ring;
  final VoidCallback onFinish;
  final VoidCallback onExit;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final CurvedAnimation curved = CurvedAnimation(parent: animation, curve: Motion.standard);
    return Positioned.fill(
      child: SafeArea(
        child: FadeTransition(
          opacity: curved,
          child: ScaleTransition(
            scale: Tween<double>(begin: 0.92, end: 1).animate(curved),
            child: Column(
              children: <Widget>[
                Align(
                  alignment: AlignmentDirectional.topStart,
                  child: Padding(
                    padding: const EdgeInsets.all(Space.x4),
                    child: PressScale(
                      onTap: onExit,
                      pressedScale: 0.9,
                      child: Container(
                        width: 38,
                        height: 38,
                        decoration: BoxDecoration(color: p.fill, borderRadius: BorderRadius.circular(Radii.pill)),
                        child: Icon(AppIcons.x, size: 19, color: p.inkMuted),
                      ),
                    ),
                  ),
                ),
                const Spacer(),
                Text('وضع التركيز', style: tt.labelMedium?.copyWith(color: p.gold, letterSpacing: 1.5)),
                const SizedBox(height: Space.x6),
                ProgressRing(value: ring, size: 200, breathing: ring < 100),
                const SizedBox(height: Space.x8),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: Space.x8),
                  child: Text(title, textAlign: TextAlign.center, style: tt.headlineMedium),
                ),
                const SizedBox(height: Space.x3),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: Space.x10),
                  child: Text(
                    'تنفّس. ركّز على هدف واحد. كرّر السكريبت بصوت هادئ حتى يصبح طبيعياً.',
                    textAlign: TextAlign.center,
                    style: tt.bodyMedium,
                  ),
                ),
                const Spacer(),
                Padding(
                  padding: const EdgeInsets.all(Space.x6),
                  child: TintedButton(label: 'أنهِ الجلسة', icon: AppIcons.checkCircle, color: p.gold, onTap: onFinish),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
