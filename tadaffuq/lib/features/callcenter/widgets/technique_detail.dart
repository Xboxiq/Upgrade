import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../theme/app_icons.dart';

import '../../../theme/palette.dart';
import '../../../theme/tokens.dart';
import '../../../widgets/press_scale.dart';
import '../../../widgets/progress_ring.dart';
import '../../../widgets/ui_bits.dart';
import '../callcenter_data.dart';

/// A technique's detail surface, opened via a reveal transition. Hosts the
/// script dialogue, the quality indicator, and — the centrepiece — a Zen /
/// Focus mode that recedes the world by subtraction: the chrome dissolves, a
/// veil drains the field, and only the breathing ring + objective remain.
class TechniqueDetail extends StatefulWidget {
  const TechniqueDetail({super.key, required this.technique});
  final Technique technique;

  @override
  State<TechniqueDetail> createState() => _TechniqueDetailState();
}

class _TechniqueDetailState extends State<TechniqueDetail>
    with SingleTickerProviderStateMixin {
  late final AnimationController _focus = AnimationController(
    vsync: this,
    duration: Motion.zen,
  );
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
    setState(() => _ring = 100); // the ring blooms to mastery in place
    await Future<void>.delayed(Motion.panel);
    await _exitFocus();
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final Technique tch = widget.technique;

    return Scaffold(
      backgroundColor: p.canvas,
      body: Stack(
        children: <Widget>[
          // ── Base content ──
          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(Space.x5, Space.x4, Space.x5, Space.x16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  _TopBar(
                    onClose: () => Navigator.of(context).maybePop(),
                    label: 'مهارة تدريبية',
                  ),
                  const SizedBox(height: Space.x6),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            IconBadge(tch.icon, tint: p.accentAction, size: 52, iconSize: 26),
                            const SizedBox(height: Space.x4),
                            Text(tch.title, style: Theme.of(context).textTheme.displayMedium),
                            const SizedBox(height: Space.x3),
                            Text(tch.blurb, style: Theme.of(context).textTheme.bodyLarge),
                          ],
                        ),
                      ),
                      const SizedBox(width: Space.x4),
                      ProgressRing(value: _ring, size: 92),
                    ],
                  ),
                  const SizedBox(height: Space.x8),
                  Text('السكريبت الاحترافي', style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: Space.x4),
                  for (final ScriptLine line in tch.script) ...<Widget>[
                    _ScriptBubble(line: line),
                    const SizedBox(height: Space.x3),
                  ],
                  const SizedBox(height: Space.x4),
                  NoteCard(
                    text: 'مؤشر الجودة: ${tch.quality}',
                    icon: AppIcons.checkCircle,
                    kind: NoteKind.success,
                  ),
                  const SizedBox(height: Space.x8),
                  _FocusCta(onTap: _enterFocus),
                ].animate(interval: 60.ms).fadeIn(duration: Motion.emerge).moveY(begin: 12, end: 0, curve: Motion.standard),
              ),
            ),
          ),

          // ── Zen veil (drains + dims the field) ──
          AnimatedBuilder(
            animation: _focus,
            builder: (BuildContext context, _) {
              final double t = _focus.value;
              if (t == 0) return const SizedBox.shrink();
              return Positioned.fill(
                child: IgnorePointer(
                  ignoring: t < 0.5,
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 9 * t, sigmaY: 9 * t),
                    child: ColoredBox(
                      color: p.canvasSink.withValues(alpha: 0.9 * t),
                    ),
                  ),
                ),
              );
            },
          ),

          // ── The clearing — only the scoped task remains ──
          if (_focusOn)
            _FocusClearing(
              animation: _focus,
              title: tch.title,
              ring: _ring,
              onFinish: _finish,
              onExit: _exitFocus,
            ),
        ],
      ),
    );
  }
}

class _TopBar extends StatelessWidget {
  const _TopBar({required this.onClose, required this.label});
  final VoidCallback onClose;
  final String label;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    return Row(
      children: <Widget>[
        InfoPill(label, color: p.accentProgress),
        const Spacer(),
        PressScale(
          onTap: onClose,
          pressedScale: 0.9,
          child: Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: p.surface1,
              borderRadius: BorderRadius.circular(Radii.pill),
              border: Border.all(color: p.line),
            ),
            child: Icon(AppIcons.x, size: 20, color: p.inkMuted),
          ),
        ),
      ],
    );
  }
}

class _ScriptBubble extends StatelessWidget {
  const _ScriptBubble({required this.line});
  final ScriptLine line;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final Color tint = line.agent ? p.accentProgress : p.inkMuted;
    return Container(
      padding: const EdgeInsets.all(Space.x4),
      decoration: BoxDecoration(
        color: p.surface1,
        borderRadius: BorderRadius.circular(Radii.md),
        border: Border.all(color: p.line),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Icon(line.agent ? AppIcons.headset : AppIcons.user, size: 15, color: tint),
              const SizedBox(width: Space.x2),
              Text(
                line.agent ? 'أنت' : 'العميل',
                style: Theme.of(context).textTheme.labelSmall?.copyWith(color: tint),
              ),
            ],
          ),
          const SizedBox(height: Space.x2),
          Text(line.text, style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: p.ink)),
        ],
      ),
    );
  }
}

class _FocusCta extends StatelessWidget {
  const _FocusCta({required this.onTap});
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    return PressScale(
      onTap: onTap,
      pressedScale: 0.98,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: Space.x4),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: <Color>[p.accentAction, Color.lerp(p.accentAction, p.accentProgress, 0.4)!],
          ),
          borderRadius: BorderRadius.circular(Radii.md),
          boxShadow: <BoxShadow>[
            BoxShadow(
              color: p.accentAction.withValues(alpha: 0.4),
              blurRadius: 22,
              offset: const Offset(0, 10),
              spreadRadius: -6,
            ),
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Icon(AppIcons.target, size: 20, color: Colors.white),
            const SizedBox(width: Space.x2),
            Text(
              'ادخل وضع التركيز',
              style: Theme.of(context).textTheme.labelLarge?.copyWith(color: Colors.white),
            ),
          ],
        ),
      ),
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
    final CurvedAnimation curved =
        CurvedAnimation(parent: animation, curve: Motion.standard);
    return Positioned.fill(
      child: SafeArea(
        child: FadeTransition(
          opacity: curved,
          child: ScaleTransition(
            scale: Tween<double>(begin: 0.9, end: 1).animate(curved),
            child: Column(
              children: <Widget>[
                Align(
                  alignment: Alignment.topLeft,
                  child: Padding(
                    padding: const EdgeInsets.all(Space.x4),
                    child: PressScale(
                      onTap: onExit,
                      pressedScale: 0.9,
                      child: Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: p.surface1,
                          borderRadius: BorderRadius.circular(Radii.pill),
                          border: Border.all(color: p.line),
                        ),
                        child: Icon(AppIcons.x, size: 20, color: p.inkMuted),
                      ),
                    ),
                  ),
                ),
                const Spacer(),
                Text('وضع التركيز', style: Theme.of(context).textTheme.labelMedium?.copyWith(color: p.accentProgress, letterSpacing: 1)),
                const SizedBox(height: Space.x6),
                ProgressRing(value: ring, size: 200, breathing: ring < 100),
                const SizedBox(height: Space.x8),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: Space.x10),
                  child: Text(
                    title,
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                ),
                const SizedBox(height: Space.x4),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: Space.x10),
                  child: Text(
                    'تنفّس. ركّز على هدف واحد. كرّر السكريبت بصوت هادئ حتى يصبح طبيعياً.',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ),
                const Spacer(),
                Padding(
                  padding: const EdgeInsets.all(Space.x6),
                  child: PressScale(
                    onTap: onFinish,
                    pressedScale: 0.97,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: Space.x8, vertical: Space.x4),
                      decoration: BoxDecoration(
                        color: p.surface1,
                        borderRadius: BorderRadius.circular(Radii.pill),
                        border: Border.all(color: p.accentProgress.withValues(alpha: 0.5)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          Icon(AppIcons.checkCircle, size: 20, color: p.accentProgress),
                          const SizedBox(width: Space.x2),
                          Text('أنهِ الجلسة', style: Theme.of(context).textTheme.labelLarge),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
