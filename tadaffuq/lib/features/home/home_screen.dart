import 'package:flutter/material.dart';

import '../../theme/app_icons.dart';
import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../ui/controls.dart';
import '../../ui/large_title_scaffold.dart';
import '../../util/numerals.dart';
import '../../widgets/charts.dart';
import '../../widgets/motion_x.dart';
import '../../widgets/surface_card.dart';
import '../../widgets/transitions.dart';
import '../../widgets/ui_bits.dart';
import '../callcenter/callcenter_screen.dart';
import '../worlds/system_map.dart';
import '../worlds/worlds_data.dart';

/// The platform home — a living solar system. Every training world is a planet
/// in one precise orrery (overall mastery at the core); select a planet to see
/// its detail panel and enter it. Time-aware greeting + a slim momentum row.
class HomeScreen extends StatefulWidget {
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

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  TrainingWorld _selected = Worlds.callCenter;

  String _greeting() {
    final int h = DateTime.now().hour;
    if (h < 5) return 'سهرة موفّقة';
    if (h < 12) return 'صباح التدفّق';
    if (h < 17) return 'نهارك مثمر';
    return 'مساء التدفّق';
  }

  void _enter(TrainingWorld w) {
    if (w.available) {
      Navigator.of(context).push(revealRoute(const CallCenterScreen()));
    }
  }

  @override
  Widget build(BuildContext context) {
    final double bottomInset = MediaQuery.of(context).padding.bottom;

    return LargeTitleScaffold(
      title: 'تَدَفُّق',
      controller: widget.controller,
      trailing: ThemeToggleButton(isDark: widget.isDark, onTap: widget.onToggleTheme),
      slivers: <Widget>[
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(Space.x4, Space.x2, Space.x4, 0),
          sliver: SliverList(
            delegate: SliverChildListDelegate(
              <Widget>[
                _greetingLine(context),
                const SizedBox(height: Space.x4),
                _systemHero(context),
                const SizedBox(height: Space.x4),
                _worldPanel(context),
                const SizedBox(height: Space.x6),
                _statsRow(context),
                const SizedBox(height: Space.x5),
                _activityCard(context),
                SizedBox(height: 110 + bottomInset),
              ].staggerIn(context),
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

  // The solar system — all worlds, one precise orrery.
  Widget _systemHero(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      interactive: false,
      padding: const EdgeInsets.fromLTRB(Space.x4, Space.x4, Space.x4, Space.x3),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(child: Text('نظام عوالمك', style: tt.titleMedium)),
              GestureDetector(
                onTap: widget.onSeeAllWorlds,
                behavior: HitTestBehavior.opaque,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Text('القائمة', style: tt.labelLarge?.copyWith(color: p.brand)),
                    Icon(AppIcons.chevronLeft, size: 16, color: p.brand),
                  ],
                ),
              ),
            ],
          ),
          SystemMap(
            selectedId: _selected.id,
            onSelect: (TrainingWorld w) => setState(() => _selected = w),
            height: 326,
          ),
          Text(
            'اسحب لتدوير النظام · اضغط كوكباً لاختياره',
            textAlign: TextAlign.center,
            style: tt.labelSmall?.copyWith(color: p.inkFaint, fontSize: 11),
          ),
          const SizedBox(height: Space.x1),
        ],
      ),
    );
  }

  // Live detail for the selected planet, with an enter CTA.
  Widget _worldPanel(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final TrainingWorld w = _selected;
    final bool open = w.available;

    return AnimatedSwitcher(
      duration: Motion.quick,
      switchInCurve: Motion.standard,
      transitionBuilder: (Widget child, Animation<double> a) =>
          FadeTransition(opacity: a, child: child),
      child: SurfaceCard(
        key: ValueKey<String>(w.id),
        accent: open,
        padding: const EdgeInsets.all(Space.x5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: <Widget>[
                IconBadge(w.icon, tint: open ? p.brand : p.inkFaint, size: 46, iconSize: 24),
                const SizedBox(width: Space.x4),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Flexible(child: Text(w.title, style: tt.titleLarge)),
                          const SizedBox(width: Space.x2),
                          if (open) InfoPill('مُتاح', color: p.success) else InfoPill('قريباً'),
                        ],
                      ),
                      const SizedBox(height: 3),
                      Text(w.tagline, style: tt.bodyMedium?.copyWith(fontSize: 13, color: p.inkMuted)),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: Space.x4),
            Row(
              children: <Widget>[
                Expanded(child: FlowMeter(value: w.progress)),
                const SizedBox(width: Space.x3),
                Text('${Arabic.n(w.unitsDone)}/${Arabic.n(w.unitsTotal)}',
                    style: AppTheme.mono(size: 12, color: open ? p.brand : p.inkFaint)),
              ],
            ),
            const SizedBox(height: Space.x4),
            if (open)
              FilledCta(label: 'ادخل العالم', icon: AppIcons.flask, onTap: () => _enter(w))
            else
              _lockedCta(context),
          ],
        ),
      ),
    );
  }

  Widget _lockedCta(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return Container(
      height: 52,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: p.fill,
        borderRadius: BorderRadius.circular(Radii.md),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Icon(AppIcons.timer, size: 16, color: p.inkFaint),
          const SizedBox(width: Space.x2),
          Text('قيد البناء — قريباً بإذن الله',
              style: tt.labelLarge?.copyWith(color: p.inkMuted)),
        ],
      ),
    );
  }

  Widget _statsRow(BuildContext context) {
    final AppPalette p = context.palette;
    return Row(
      children: <Widget>[
        _StatChip(icon: AppIcons.fire, value: '${Arabic.n(7)} أيام', label: 'تتابع', tint: p.spark),
        const SizedBox(width: Space.x2),
        _StatChip(icon: AppIcons.timer, value: '${Arabic.n(18)} د', label: 'اليوم', tint: p.brand),
        const SizedBox(width: Space.x2),
        _StatChip(icon: AppIcons.award, value: Arabic.n(Worlds.unitsDone), label: 'وحدة', tint: p.success),
      ],
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
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: Space.x3, vertical: Space.x3),
        decoration: BoxDecoration(
          color: p.fill,
          borderRadius: BorderRadius.circular(Radii.sm),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Icon(icon, size: 15, color: tint),
            const SizedBox(height: 6),
            Text(value, style: AppTheme.mono(size: 13, weight: FontWeight.w700, color: p.ink)),
            Text(label, style: tt.labelSmall?.copyWith(color: p.inkFaint, fontSize: 10)),
          ],
        ),
      ),
    );
  }
}
