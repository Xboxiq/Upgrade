import 'package:flutter/widgets.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../theme/tokens.dart';

/// Motion helpers that bake in the non-negotiable rule from the design-engineering
/// guidance: **every entrance must honour `prefers-reduced-motion`.**
///
/// `flutter_animate` does not consult `MediaQuery.disableAnimations` on its own,
/// so a raw `.animate()` would keep playing for motion-sensitive users. This
/// extension collapses the staggered entrance to a static list when reduced
/// motion is requested, and otherwise plays a calm fade + rise + settle on a
/// strong emphasized curve (no bounce).
extension StaggerEntrance on List<Widget> {
  List<Widget> staggerIn(
    BuildContext context, {
    Duration interval = const Duration(milliseconds: 60),
  }) {
    final bool reduce = MediaQuery.maybeOf(context)?.disableAnimations ?? false;
    if (reduce) return this;
    return animate(interval: interval)
        .fadeIn(duration: Motion.emerge)
        .moveY(begin: 18, end: 0, curve: Motion.emphasized)
        .scaleXY(begin: 0.985, end: 1, curve: Motion.emphasized);
  }
}
