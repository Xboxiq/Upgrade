import 'package:flutter/material.dart';

import '../../../theme/app_icons.dart';
import '../../../theme/palette.dart';
import '../../../theme/tokens.dart';
import '../../../widgets/ui_bits.dart';
import '../callcenter_data.dart';

/// A detail bottom sheet for a difficult-caller archetype.
Future<void> showArchetypeSheet(BuildContext context, Archetype a) {
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    barrierColor: Colors.black.withValues(alpha: 0.5),
    builder: (BuildContext context) => _ArchetypeSheet(a: a),
  );
}

class _ArchetypeSheet extends StatelessWidget {
  const _ArchetypeSheet({required this.a});
  final Archetype a;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return Container(
      decoration: BoxDecoration(
        color: p.canvas,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(Radii.sheet)),
      ),
      padding: EdgeInsets.fromLTRB(
        Space.x5, Space.x3, Space.x5, Space.x6 + MediaQuery.of(context).padding.bottom),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Center(
            child: Container(
              width: 40, height: 5, margin: const EdgeInsets.only(bottom: Space.x5),
              decoration: BoxDecoration(color: p.lineStrong, borderRadius: BorderRadius.circular(Radii.pill)),
            ),
          ),
          Row(
            children: <Widget>[
              IconBadge(a.icon, tint: p.brand, size: 48, iconSize: 24),
              const SizedBox(width: Space.x3),
              Expanded(child: Text(a.title, style: tt.headlineMedium)),
              InfoPill(a.strategy, color: p.spark, mono: true),
            ],
          ),
          const SizedBox(height: Space.x5),
          _block(context, p, AppIcons.compass, 'الجذر النفسي', a.root),
          const SizedBox(height: Space.x4),
          _block(context, p, AppIcons.target, 'الاستراتيجية', a.tactic),
          const SizedBox(height: Space.x4),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(Space.x4),
            decoration: BoxDecoration(
              color: p.fill,
              borderRadius: BorderRadius.circular(Radii.md),
              border: Border.all(color: p.line, width: 0.5),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text('حوار عراقي', style: tt.labelSmall?.copyWith(color: p.inkFaint)),
                const SizedBox(height: Space.x1),
                Text(a.dialogue, style: tt.bodyLarge?.copyWith(color: p.ink, fontSize: 15.5)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _block(BuildContext context, AppPalette p, IconData icon, String title, String body) {
    final TextTheme tt = Theme.of(context).textTheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Row(
          children: <Widget>[
            Icon(icon, size: 16, color: p.inkMuted),
            const SizedBox(width: Space.x2),
            Text(title, style: tt.labelMedium?.copyWith(color: p.inkMuted)),
          ],
        ),
        const SizedBox(height: Space.x2),
        Text(body, style: tt.bodyLarge?.copyWith(color: p.ink, fontSize: 15)),
      ],
    );
  }
}
