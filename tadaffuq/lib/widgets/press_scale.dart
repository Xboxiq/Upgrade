import 'package:flutter/material.dart';

import '../theme/tokens.dart';

/// Wraps any tappable surface with a tactile press: a quick sink on press-down
/// and a springy rebound on release. The depth is proportional to the control
/// size (a large card sinks a touch more than a small chip), echoing the
/// physical "mass" of the element.
class PressScale extends StatefulWidget {
  const PressScale({
    super.key,
    required this.child,
    this.onTap,
    this.pressedScale = 0.97,
    this.borderRadius,
    this.enableHaptic = true,
  });

  final Widget child;
  final VoidCallback? onTap;
  final double pressedScale;
  final BorderRadius? borderRadius;
  final bool enableHaptic;

  @override
  State<PressScale> createState() => _PressScaleState();
}

class _PressScaleState extends State<PressScale> {
  bool _down = false;

  void _set(bool v) {
    if (_down != v) setState(() => _down = v);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTapDown: widget.onTap == null ? null : (_) => _set(true),
      onTapCancel: () => _set(false),
      onTapUp: (_) => _set(false),
      onTap: widget.onTap,
      child: AnimatedScale(
        scale: _down ? widget.pressedScale : 1.0,
        duration: _down ? Motion.instant : Motion.emerge,
        curve: _down ? Motion.snapCurve : Motion.spring,
        child: widget.child,
      ),
    );
  }
}
