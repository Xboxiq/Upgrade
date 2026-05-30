import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../theme/app_icons.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../ui/groups.dart';
import '../../ui/large_title_scaffold.dart';
import '../../widgets/surface_card.dart';
import '../../widgets/ui_bits.dart';

/// Profile + settings. Theme switching lives here (and on Home).
class MoreScreen extends StatelessWidget {
  const MoreScreen({
    super.key,
    required this.isDark,
    required this.onToggleTheme,
    this.controller,
  });

  final bool isDark;
  final VoidCallback onToggleTheme;
  final ScrollController? controller;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final double bottomInset = MediaQuery.of(context).padding.bottom;

    return LargeTitleScaffold(
      title: 'المزيد',
      controller: controller,
      slivers: <Widget>[
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(Space.x4, Space.x2, Space.x4, 0),
          sliver: SliverList(
            delegate: SliverChildListDelegate(
              <Widget>[
                _profile(context),
                const SizedBox(height: Space.x6),
                InsetGroup(
                  header: 'الحساب',
                  children: <Widget>[
                    AppListRow(
                      leading: IconBadge(isDark ? AppIcons.moon : AppIcons.sun, tint: p.brand),
                      title: 'المظهر',
                      subtitle: isDark ? 'الوضع الداكن — فضاء عميق' : 'الوضع الفاتح — ضوء النجوم',
                      showChevron: false,
                      trailing: ThemeToggleButton(isDark: isDark, onTap: onToggleTheme),
                    ),
                    AppListRow(
                      leading: IconBadge(AppIcons.command, tint: p.brand),
                      title: 'اللغة',
                      subtitle: 'العربية (RTL)',
                      onTap: () {},
                    ),
                  ],
                ),
                const SizedBox(height: Space.x6),
                InsetGroup(
                  header: 'المنصّة',
                  footer: 'تَدَفُّق · الإصدار ١٫٠٫٠ · نظام التصميم Cosmic Flow',
                  children: <Widget>[
                    AppListRow(
                      leading: IconBadge(AppIcons.waveform, tint: p.brand),
                      title: 'عن تَدَفُّق',
                      subtitle: 'منصّة تدريب ذاتي متعدّدة العوالم',
                      onTap: () {},
                    ),
                    AppListRow(
                      leading: IconBadge(AppIcons.star, tint: p.brand),
                      title: 'نظام التصميم',
                      subtitle: 'Cosmic Flow — تيار خلال الفضاء',
                      onTap: () {},
                    ),
                  ],
                ),
                const SizedBox(height: Space.x6),
                _aboutCard(context),
                SizedBox(height: 110 + bottomInset),
              ].animate(interval: 70.ms).fadeIn(duration: Motion.emerge).moveY(begin: 16, end: 0, curve: Motion.emphasized),
            ),
          ),
        ),
      ],
    );
  }

  Widget _profile(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return Row(
      children: <Widget>[
        Container(
          width: 64,
          height: 64,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            gradient: LinearGradient(colors: p.tideGradient),
            shape: BoxShape.circle,
          ),
          child: Text('ت', style: tt.displaySmall?.copyWith(color: Colors.white, fontWeight: FontWeight.w700)),
        ),
        const SizedBox(width: Space.x4),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text('متدرّب تَدَفُّق', style: tt.headlineMedium),
              const SizedBox(height: 2),
              Text('في رحلة الإتقان منذ ٧ أيام', style: tt.bodyMedium?.copyWith(color: p.inkMuted)),
            ],
          ),
        ),
      ],
    );
  }

  Widget _aboutCard(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      interactive: false,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Icon(AppIcons.waveform, size: 16, color: p.brand),
              const SizedBox(width: Space.x2),
              Text('تَدَفُّق', style: tt.titleMedium),
            ],
          ),
          const SizedBox(height: Space.x3),
          Text(
            'منصّة تدريب ذاتي تبني الإتقان كتيّار يرتفع مع كل جلسة. كل عالم مهارة مستقل، '
            'بمحتوى عربيّ أصيل وتفاعل مصمّم بعناية — لا حشو، كل عنصر له معنى.',
            style: tt.bodyMedium?.copyWith(color: p.ink, height: 1.6),
          ),
        ],
      ),
    );
  }
}
