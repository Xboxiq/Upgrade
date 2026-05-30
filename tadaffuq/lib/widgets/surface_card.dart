import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';
import 'press_scale.dart';

/// A clean iOS-grade card: a grouped surface with a hairline edge and soft,
/// restrained depth. Lifts gently on hover (web/desktop) and sinks on press.
/// No neon, no loud borders — the content carries the screen.
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

  /// When true the card carries a faint brand wash + brand-tinted hairline.
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
    final bool lifted = _hover && widget.interactive && widget.onTap != null;

    final Color border = widget.accent
        ? p.brand.withValues(alpha: 0.45)
        : (lifted ? p.lineStrong : p.line);

    final Widget card = AnimatedContainer(
      duration: Motion.quick,
      curve: Motion.standard,
      transform: lifted ? Matrix4.translationValues(0, -2, 0) : Matrix4.identity(),
      transformAlignment: Alignment.center,
      padding: widget.padding,
      decoration: BoxDecoration(
        color: widget.accent
            ? Color.alphaBlend(p.brand.withValues(alpha: p.isDark ? 0.10 : 0.05), p.surface1)
            : p.surface1,
        borderRadius: BorderRadius.circular(widget.radius),
        border: Border.all(color: border, width: 0.5),
        boxShadow: <BoxShadow>[
          BoxShadow(
            color: Colors.black.withValues(alpha: p.isDark ? 0.32 : 0.05),
            blurRadius: lifted ? 28 : 16,
            offset: Offset(0, lifted ? 14 : 8),
            spreadRadius: -12,
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
