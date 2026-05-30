import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../theme/app_icons.dart';
import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../ui/large_title_scaffold.dart';
import '../../util/numerals.dart';
import '../../widgets/charts.dart';
import '../../widgets/press_scale.dart';
import '../../widgets/mastery_planet.dart';
import '../../widgets/surface_card.dart';
import '../../widgets/transitions.dart';
import '../../widgets/ui_bits.dart';
import '../callcenter/callcenter_screen.dart';
import '../worlds/worlds_data.dart';

/// The platform home — a bento dashboard: a time-aware greeting, overall
/// mastery as a tide ring, today's continue card, your worlds, and a weekly
/// activity chart. Everything in the Cosmic Flow + rim-light language.
class HomeScreen extends StatelessWidget {
  const HomeScreen({
    super.key,
    required this.isDark,
    required this.onToggleTheme,
    required this.onSeeAllWorlds,
    this.controller,
  });

  final bool isDark;
  final VoidCallback onToggleTheme;
  final VoidCallback onSeeAllWorlds;
  final ScrollController? controller;

  String _greeting() {
    final int h = DateTime.now().hour;
    if (h < 5) return 'سهرة موفّقة';
    if (h < 12) return 'صباح التدفّق';
    if (h < 17) return 'نهارك مثمر';
    return 'مساء التدفّق';
  }

  @override
  Widget build(BuildContext context) {
    final double bottomInset = MediaQuery.of(context).padding.bottom;

    return LargeTitleScaffold(
      title: 'تَدَفُّق',
      controller: controller,
      trailing: ThemeToggleButton(isDark: isDark, onTap: onToggleTheme),
      slivers: <Widget>[
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(Space.x4, Space.x2, Space.x4, 0),
          sliver: SliverList(
            delegate: SliverChildListDelegate(
              <Widget>[
                _greetingLine(context),
                const SizedBox(height: Space.x4),
                _masteryBento(context),
                const SizedBox(height: Space.x4),
                _continueCard(context),
                const SizedBox(height: Space.x8),
                _SectionLine(title: 'عوالمك', action: 'الكل', onAction: onSeeAllWorlds),
                const SizedBox(height: Space.x4),
                for (final TrainingWorld w in Worlds.all.take(3)) ...<Widget>[
                  _WorldMiniRow(world: w),
                  const SizedBox(height: Space.x3),
                ],
                const SizedBox(height: Space.x5),
                _activityCard(context),
                SizedBox(height: 110 + bottomInset),
              ]
                  .animate(interval: 60.ms)
                  .fadeIn(duration: Motion.emerge)
                  .moveY(begin: 18, end: 0, curve: Motion.emphasized)
                  .scaleXY(begin: 0.985, end: 1, curve: Motion.emphasized),
            ),
          ),
        ),
      ],
    );
  }

  Widget _greetingLine(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return Row(
      children: <Widget>[
        Icon(AppIcons.waveform, size: 16, color: p.brand),
        const SizedBox(width: Space.x2),
        Text(_greeting(), style: tt.titleMedium?.copyWith(color: p.inkMuted)),
      ],
    );
  }

  Widget _masteryBento(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      interactive: false,
      padding: const EdgeInsets.all(Space.x5),
      child: Row(
        children: <Widget>[
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text('إتقان المنصّة', style: tt.labelMedium?.copyWith(color: p.brand)),
                const SizedBox(height: 2),
                Text('${Arabic.n(Worlds.unitsDone)} من ${Arabic.n(Worlds.unitsTotal)} وحدة',
                    style: tt.titleLarge),
                const SizedBox(height: Space.x4),
                Row(
                  children: <Widget>[
                    _StatChip(icon: AppIcons.fire, value: '${Arabic.n(7)} أيام', label: 'تتابع', tint: p.spark),
                    const SizedBox(width: Space.x2),
                    _StatChip(icon: AppIcons.timer, value: '${Arabic.n(18)} د', label: 'اليوم', tint: p.brand),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(width: Space.x4),
          MasteryPlanet(value: Worlds.overallProgress * 100, size: 112),
        ],
      ),
    );
  }

  Widget _continueCard(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      accent: true,
      onTap: () => Navigator.of(context).push(revealRoute(const CallCenterScreen())),
      padding: const EdgeInsets.all(Space.x5),
      child: Row(
        children: <Widget>[
          IconBadge(AppIcons.headset, tint: p.brand, size: 46, iconSize: 24),
          const SizedBox(width: Space.x4),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text('تابِع من حيث وقفت', style: tt.labelSmall?.copyWith(color: p.brand, letterSpacing: 0.6)),
                const SizedBox(height: 3),
                Text('الكول سنتر — العميل الغاضب (HEAT)', style: tt.titleMedium),
                const SizedBox(height: Space.x2),
                const FlowMeter(value: 0.6),
              ],
            ),
          ),
          const SizedBox(width: Space.x3),
          Icon(AppIcons.chevronLeft, size: 18, color: p.inkFaint),
        ],
      ),
    );
  }

  Widget _activityCard(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      interactive: false,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Text('نشاطك هذا الأسبوع', style: tt.titleMedium),
              const Spacer(),
              InfoPill('${Arabic.n(126)} د', color: p.brand, mono: true),
            ],
          ),
          const SizedBox(height: Space.x4),
          const ActivityBars(
            values: <double>[0.4, 0.7, 0.55, 0.9, 0.3, 0.75, 0.5],
            labels: <String>['سبت', 'أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع'],
            highlight: 6,
          ),
        ],
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({required this.icon, required this.value, required this.label, required this.tint});
  final IconData icon;
  final String value;
  final String label;
  final Color tint;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Space.x3, vertical: Space.x2 + 2),
      decoration: BoxDecoration(
        color: p.fill,
        borderRadius: BorderRadius.circular(Radii.sm),
        border: Border.all(color: p.line, width: 0.5),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Icon(icon, size: 15, color: tint),
          const SizedBox(width: Space.x2),
          Text(value, style: AppTheme.mono(size: 13, weight: FontWeight.w700, color: p.ink)),
          const SizedBox(width: 4),
          Text(label, style: tt.labelSmall?.copyWith(color: p.inkFaint, fontSize: 10)),
        ],
      ),
    );
  }
}

class _SectionLine extends StatelessWidget {
  const _SectionLine({required this.title, this.action, this.onAction});
  final String title;
  final String? action;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return Row(
      children: <Widget>[
        Text(title, style: tt.headlineMedium),
        const Spacer(),
        if (action != null)
          PressScale(
            onTap: onAction,
            pressedScale: 0.94,
            child: Text(action!, style: tt.labelLarge?.copyWith(color: p.brand)),
          ),
      ],
    );
  }
}

class _WorldMiniRow extends StatelessWidget {
  const _WorldMiniRow({required this.world});
  final TrainingWorld world;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final bool open = world.available;
    return SurfaceCard(
      onTap: open ? () => Navigator.of(context).push(revealRoute(const CallCenterScreen())) : null,
      interactive: open,
      padding: const EdgeInsets.all(Space.x4),
      child: Row(
        children: <Widget>[
          IconBadge(world.icon, tint: open ? p.brand : p.inkFaint, size: 42),
          const SizedBox(width: Space.x3),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Flexible(child: Text(world.title, style: tt.titleMedium)),
                    if (!open) ...<Widget>[
                      const SizedBox(width: Space.x2),
                      InfoPill('قريباً'),
                    ],
                  ],
                ),
                const SizedBox(height: Space.x2),
                FlowMeter(value: world.progress),
              ],
            ),
          ),
          const SizedBox(width: Space.x3),
          Text('${Arabic.n(world.unitsDone)}/${Arabic.n(world.unitsTotal)}',
              style: AppTheme.mono(size: 12, color: p.inkFaint)),
        ],
      ),
    );
  }
}
