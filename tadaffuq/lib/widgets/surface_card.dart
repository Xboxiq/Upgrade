import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';
import 'depth.dart';
import 'press_scale.dart';

/// A grouped surface defined by MATERIAL, not effects: a clean tonal step from
/// the canvas + a whisper of matte grain. No glowing/lighter rim, no drop
/// shadow, no halo — those read as AI. On hover it warms one tonal step and
/// lifts a touch; on press it sinks. Accent cards take a faint brand wash.
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

    Color base = lifted ? p.surface2 : p.surface1;
    if (widget.accent) {
      base = Color.alphaBlend(p.brand.withValues(alpha: p.isDark ? 0.12 : 0.06), base);
    }

    final Widget card = AnimatedContainer(
      duration: Motion.quick,
      curve: Motion.standard,
      transform: lifted ? Matrix4.translationValues(0, -2, 0) : Matrix4.identity(),
      transformAlignment: Alignment.center,
      decoration: BoxDecoration(
        color: base,
        borderRadius: BorderRadius.circular(widget.radius),
      ),
      child: Stack(
        children: <Widget>[
          // Matte material grain — the realism layer (no rim, no glow).
          SurfaceGrain(radius: widget.radius, dark: p.isDark),
          Padding(padding: widget.padding, child: widget.child),
        ],
      ),
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
