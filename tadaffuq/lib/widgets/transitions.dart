import 'package:flutter/material.dart';

import '../theme/tokens.dart';

/// A premium reveal route: fade + gentle upward slide + subtle scale, on the
/// signature decelerate curve. Used for opening a module's detail in place.
Route<T> revealRoute<T>(Widget page) {
  return PageRouteBuilder<T>(
    transitionDuration: Motion.panel,
    reverseTransitionDuration: Motion.emerge,
    pageBuilder: (_, _, _) => page,
    transitionsBuilder: (_, Animation<double> anim, _, Widget child) {
      final CurvedAnimation curved = CurvedAnimation(
        parent: anim,
        curve: Motion.standard,
        reverseCurve: Motion.snapCurve,
      );
      return FadeTransition(
        opacity: curved,
        child: SlideTransition(
          position: Tween<Offset>(begin: const Offset(0, 0.05), end: Offset.zero)
              .animate(curved),
          child: ScaleTransition(
            scale: Tween<double>(begin: 0.97, end: 1).animate(curved),
            child: child,
          ),
        ),
      );
    },
  );
}
