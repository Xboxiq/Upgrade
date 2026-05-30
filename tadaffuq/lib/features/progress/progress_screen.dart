import 'package:flutter/material.dart';

import '../../theme/app_icons.dart';
import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../ui/large_title_scaffold.dart';
import '../../util/numerals.dart';
import '../../widgets/charts.dart';
import '../../widgets/motion_x.dart';
import '../../widgets/surface_card.dart';
import '../worlds/worlds_data.dart';

/// Your progress at a glance: headline stats, a skills radar, weekly activity,
/// and per-world mastery — all hand-painted to match Cosmic Flow.
class ProgressScreen extends StatelessWidget {
  const ProgressScreen({super.key, this.controller});
  final ScrollController? controller;

  // Voice competencies (mirrors the Call Center voice profile) as a radar.
  static const List<RadarEntry> _skills = <RadarEntry>[
    RadarEntry('الإيقاع', 0.9),
    RadarEntry('الطبقة', 0.55),
    RadarEntry('المستوى', 0.7),
    RadarEntry('النبرة', 0.45),
    RadarEntry('الوقفات', 0.3),
  ];

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final double bottomInset = MediaQuery.of(context).padding.bottom;
    final TextTheme tt = Theme.of(context).textTheme;

    return LargeTitleScaffold(
      title: 'تقدّمك',
      controller: controller,
      slivers: <Widget>[
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(Space.x4, Space.x2, Space.x4, 0),
          sliver: SliverList(
            delegate: SliverChildListDelegate(
              <Widget>[
                // Headline stats row.
                Row(
                  children: <Widget>[
                    Expanded(child: _StatCard(icon: AppIcons.fire, value: Arabic.n(7), label: 'يوم تتابع', tint: p.spark)),
                    const SizedBox(width: Space.x3),
                    Expanded(child: _StatCard(icon: AppIcons.timer, value: Arabic.n(126), label: 'دقيقة', tint: p.brand)),
                    const SizedBox(width: Space.x3),
                    Expanded(child: _StatCard(icon: AppIcons.award, value: Arabic.n(26), label: 'وحدة', tint: p.success)),
                  ],
                ),
                const SizedBox(height: Space.x4),

                // Skills radar.
                SurfaceCard(
                  interactive: false,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Icon(AppIcons.microphone, size: 14, color: p.brand),
                          const SizedBox(width: Space.x2),
                          Text('بصمة المهارات', style: tt.titleMedium),
                        ],
                      ),
                      const SizedBox(height: Space.x2),
                      const Center(child: RadarChart(data: _skills, size: 250)),
                    ],
                  ),
                ),
                const SizedBox(height: Space.x4),

                // Weekly activity.
                SurfaceCard(
                  interactive: false,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text('نشاطك هذا الأسبوع', style: tt.titleMedium),
                      const SizedBox(height: Space.x4),
                      const ActivityBars(
                        values: <double>[0.4, 0.7, 0.55, 0.9, 0.3, 0.75, 0.5],
                        labels: <String>['سبت', 'أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع'],
                        highlight: 6,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: Space.x4),

                // Per-world mastery.
                SurfaceCard(
                  interactive: false,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text('الإتقان حسب العالم', style: tt.titleMedium),
                      const SizedBox(height: Space.x4),
                      for (int i = 0; i < Worlds.all.length; i++) ...<Widget>[
                        _WorldMeterRow(world: Worlds.all[i]),
                        if (i != Worlds.all.length - 1) const SizedBox(height: Space.x4),
                      ],
                    ],
                  ),
                ),
                SizedBox(height: 110 + bottomInset),
              ].staggerIn(context),
            ),
          ),
        ),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.icon, required this.value, required this.label, required this.tint});
  final IconData icon;
  final String value;
  final String label;
  final Color tint;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      interactive: false,
      padding: const EdgeInsets.symmetric(horizontal: Space.x2, vertical: Space.x4),
      child: Column(
        children: <Widget>[
          Icon(icon, size: 18, color: tint),
          const SizedBox(height: Space.x2),
          Text(value, style: AppTheme.mono(size: 20, weight: FontWeight.w700, color: p.ink)),
          const SizedBox(height: 2),
          Text(label, style: tt.labelSmall?.copyWith(color: p.inkFaint, fontSize: 10.5)),
        ],
      ),
    );
  }
}

class _WorldMeterRow extends StatelessWidget {
  const _WorldMeterRow({required this.world});
  final TrainingWorld world;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return Row(
      children: <Widget>[
        Icon(world.icon, size: 16, color: world.available ? p.brand : p.inkFaint),
        const SizedBox(width: Space.x3),
        SizedBox(
          width: 96,
          child: Text(world.title, style: tt.bodyMedium?.copyWith(fontSize: 13), maxLines: 1, overflow: TextOverflow.ellipsis),
        ),
        const SizedBox(width: Space.x3),
        Expanded(child: FlowMeter(value: world.progress)),
        const SizedBox(width: Space.x3),
        Text(Arabic.pct(world.progress * 100), style: AppTheme.mono(size: 11, color: p.inkMuted)),
      ],
    );
  }
}
