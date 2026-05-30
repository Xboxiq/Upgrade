import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';
import 'press_scale.dart';

/// The workhorse elevated surface — Glass 2.0 aesthetic without per-card blur:
/// a solid surface, a hairline top edge that brightens to neon-cyan on
/// hover/focus, and soft multi-layered shadows. Lifts slightly on hover (web/
/// desktop) and sinks on press.
class SurfaceCard extends StatefulWidget {
  const SurfaceCard({
    super.key,
    required this.child,
    this.onTap,
    this.padding = const EdgeInsets.all(Space.x5),
    this.radius = Radii.lg,
    this.accent = false,
    this.interactive = true,
  });

  final Widget child;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry padding;
  final double radius;

  /// When true the top edge uses the action accent (e.g. the active module).
  final bool accent;
  final bool interactive;

  @override
  State<SurfaceCard> createState() => _SurfaceCardState();
}

class _SurfaceCardState extends State<SurfaceCard> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool lifted = _hover && widget.interactive;

    final Color topEdge = widget.accent
        ? p.accentAction
        : (lifted ? p.accentProgress : p.line);

    final Widget card = AnimatedContainer(
      duration: Motion.quick,
      curve: Motion.standard,
      transform: lifted ? Matrix4.translationValues(0, -3, 0) : Matrix4.identity(),
      transformAlignment: Alignment.center,
      padding: widget.padding,
      decoration: BoxDecoration(
        color: lifted ? p.surface2 : p.surface1,
        borderRadius: BorderRadius.circular(widget.radius),
        border: Border(top: BorderSide(color: topEdge, width: 1.4)),
        boxShadow: <BoxShadow>[
          BoxShadow(
            color: Colors.black.withValues(alpha: p.isDark ? 0.40 : 0.08),
            blurRadius: lifted ? 30 : 18,
            offset: Offset(0, lifted ? 16 : 10),
            spreadRadius: -10,
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: p.isDark ? 0.24 : 0.05),
            blurRadius: 4,
            offset: const Offset(0, 2),
            spreadRadius: -2,
          ),
        ],
      ),
      child: widget.child,
    );

    final Widget interactive = widget.onTap == null
        ? card
        : PressScale(onTap: widget.onTap, pressedScale: 0.985, child: card);

    if (!widget.interactive) return interactive;

    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: interactive,
    );
  }
}
