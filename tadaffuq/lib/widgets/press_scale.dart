import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../theme/tokens.dart';

/// Wraps any tappable surface with a tactile press: a quick sink on press-down
/// with a real haptic tick, and a springy rebound on release. The depth is
/// proportional to the control size (a large card sinks a touch more than a
/// small chip), echoing the physical "mass" of the element.
///
/// Haptics fire on press-DOWN (not on the action) so the feedback is felt the
/// instant the finger lands — the iOS "this is pressable" sensation. On
/// platforms without a haptic engine (e.g. web) the call is a silent no-op.
class PressScale extends StatefulWidget {
  const PressScale({
    super.key,
    required this.child,
    this.onTap,
    this.onLongPress,
    this.pressedScale = 0.97,
    this.borderRadius,
    this.enableHaptic = true,
  });

  final Widget child;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;
  final double pressedScale;
  final BorderRadius? borderRadius;
  final bool enableHaptic;

  @override
  State<PressScale> createState() => _PressScaleState();
}

class _PressScaleState extends State<PressScale> {
  bool _down = false;

  bool get _interactive => widget.onTap != null || widget.onLongPress != null;

  void _set(bool v) {
    if (_down != v) setState(() => _down = v);
  }

  void _pressDown() {
    _set(true);
    if (widget.enableHaptic) HapticFeedback.lightImpact();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTapDown: _interactive ? (_) => _pressDown() : null,
      onTapCancel: () => _set(false),
      onTapUp: (_) => _set(false),
      onTap: widget.onTap,
      onLongPress: widget.onLongPress == null
          ? null
          : () {
              HapticFeedback.mediumImpact();
              widget.onLongPress!.call();
            },
      child: AnimatedScale(
        scale: _down ? widget.pressedScale : 1.0,
        duration: _down ? Motion.instant : Motion.emerge,
        curve: _down ? Motion.snapCurve : Motion.spring,
        child: widget.child,
      ),
    );
  }
}
