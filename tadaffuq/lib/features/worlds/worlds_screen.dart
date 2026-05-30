import 'package:flutter/material.dart';

import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../ui/large_title_scaffold.dart';
import '../../util/numerals.dart';
import '../../widgets/charts.dart';
import '../../widgets/motion_x.dart';
import '../../widgets/surface_card.dart';
import '../../widgets/transitions.dart';
import '../../widgets/ui_bits.dart';
import '../callcenter/callcenter_screen.dart';
import 'system_map.dart';
import 'worlds_data.dart';

/// The catalogue of training worlds. Call Center is live; the rest are seeded
/// and surface a "coming soon" affordance.
class WorldsScreen extends StatelessWidget {
  const WorldsScreen({super.key, this.controller});
  final ScrollController? controller;

  void _open(BuildContext context, TrainingWorld w) {
    if (w.available) {
      Navigator.of(context).push(revealRoute(const CallCenterScreen()));
    } else {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(
          SnackBar(
            behavior: SnackBarBehavior.floating,
            backgroundColor: context.palette.surface2,
            content: Text('عالم «${w.title}» قيد البناء — قريباً بإذن الله',
                style: TextStyle(color: context.palette.ink)),
          ),
        );
    }
  }

  Widget _systemCard(BuildContext context) {
    final TextTheme tt = Theme.of(context).textTheme;
    final AppPalette p = context.palette;
    return SurfaceCard(
      interactive: false,
      padding: const EdgeInsets.fromLTRB(Space.x4, Space.x4, Space.x4, Space.x3),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(child: Text('نظام عوالمك', style: tt.titleMedium)),
              InfoPill('${Arabic.n(Worlds.all.length)} عوالم', color: p.brand),
            ],
          ),
          SystemMap(onOpen: (TrainingWorld w) => _open(context, w), height: 286),
          Text(
            'اضغط كوكباً لتدخل عالمه',
            textAlign: TextAlign.center,
            style: tt.labelSmall?.copyWith(color: p.inkFaint, fontSize: 11),
          ),
          const SizedBox(height: Space.x1),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final double bottomInset = MediaQuery.of(context).padding.bottom;
    return LargeTitleScaffold(
      title: 'عوالم التدريب',
      controller: controller,
      slivers: <Widget>[
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(Space.x4, Space.x2, Space.x4, 0),
          sliver: SliverList(
            delegate: SliverChildListDelegate(
              <Widget>[
                _systemCard(context),
                const SizedBox(height: Space.x6),
                for (final TrainingWorld w in Worlds.all) ...<Widget>[
                  _WorldCard(world: w, onTap: () => _open(context, w)),
                  const SizedBox(height: Space.x3),
                ],
                SizedBox(height: 110 + bottomInset),
              ].staggerIn(context),
            ),
          ),
        ),
      ],
    );
  }
}

class _WorldCard extends StatelessWidget {
  const _WorldCard({required this.world, required this.onTap});
  final TrainingWorld world;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final bool open = world.available;
    final Color tint = open ? p.brand : p.inkFaint;

    return SurfaceCard(
      onTap: onTap,
      accent: open,
      padding: const EdgeInsets.all(Space.x5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              IconBadge(world.icon, tint: tint, size: 48, iconSize: 24),
              const SizedBox(width: Space.x4),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        Flexible(child: Text(world.title, style: tt.titleLarge)),
                        const SizedBox(width: Space.x2),
                        if (open) InfoPill('مُتاح', color: p.success) else InfoPill('قريباً'),
                      ],
                    ),
                    const SizedBox(height: 3),
                    Text(world.tagline, style: tt.bodyMedium?.copyWith(fontSize: 13)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: Space.x4),
          Row(
            children: <Widget>[
              Expanded(child: FlowMeter(value: world.progress)),
              const SizedBox(width: Space.x3),
              Text('${Arabic.n(world.unitsDone)}/${Arabic.n(world.unitsTotal)}',
                  style: AppTheme.mono(size: 12, color: open ? p.brand : p.inkFaint)),
            ],
          ),
        ],
      ),
    );
  }
}
