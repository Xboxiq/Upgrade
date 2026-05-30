import 'package:flutter/material.dart';

import '../theme/palette.dart';

/// ════════════════════════════════════════════════════════════════════════
/// Depth — WITHOUT drop shadows.
///
/// A deliberate break from the iOS soft-shadow cliché. Elevation is expressed
/// as a **rim light**: a bright hairline catching light along the top edge that
/// fades to a darker contact line at the bottom — as if each panel were a sheet
/// of glass lit from above in deep space. Combined with tonal surfaces, this
/// gives crisp, distinctive depth that belongs to تَدَفُّق, not to Cupertino.
///
/// Usage: paint [rim] as the fill of a 1px-padded wrapper sitting *behind* a
/// surface (the 1px reveal around the inner fill becomes the lit/contact edge).
/// ════════════════════════════════════════════════════════════════════════
abstract class Depth {
  /// Thickness of the rim edge.
  static const double rimWidth = 1.0;

  /// The rim-light gradient. [strong] is used for floating elements (dock,
  /// sheets) and hover, where the edge should read more pronounced.
  static LinearGradient rim(AppPalette p, {bool strong = false}) {
    final bool d = p.isDark;
    return LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: <Color>[
        // Top: a catch of light.
        d
            ? Colors.white.withValues(alpha: strong ? 0.28 : 0.16)
            : Colors.white.withValues(alpha: strong ? 0.95 : 0.75),
        // Middle: nearly nothing, so the side edges stay quiet.
        d
            ? Colors.white.withValues(alpha: 0.03)
            : Colors.black.withValues(alpha: 0.05),
        // Bottom: a crisp contact line that lifts the surface off the canvas.
        d
            ? Colors.black.withValues(alpha: strong ? 0.52 : 0.36)
            : Colors.black.withValues(alpha: strong ? 0.16 : 0.11),
      ],
      stops: const <double>[0.0, 0.5, 1.0],
    );
  }
}
