import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../theme/app_icons.dart';
import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../ui/controls.dart';
import '../../ui/groups.dart';
import '../../ui/large_title_scaffold.dart';
import '../../ui/tab_bar.dart';
import '../../util/numerals.dart';
import '../../widgets/press_scale.dart';
import '../../widgets/progress_ring.dart';
import '../../widgets/surface_card.dart';
import '../../widgets/transitions.dart';
import '../../widgets/ui_bits.dart';
import 'callcenter_data.dart';
import 'widgets/apindex_sheet.dart';
import 'widgets/archetype_sheet.dart';
import 'widgets/technique_detail.dart';

class CallCenterScreen extends StatefulWidget {
  const CallCenterScreen({super.key, required this.isDark, required this.onToggleTheme});
  final bool isDark;
  final VoidCallback onToggleTheme;

  @override
  State<CallCenterScreen> createState() => _CallCenterScreenState();
}

class _CallCenterScreenState extends State<CallCenterScreen> {
  final ScrollController _scroll = ScrollController();
  int _tab = 1; // "التدريب"

  @override
  void dispose() {
    _scroll.dispose();
    super.dispose();
  }

  void _openTechnique(Technique t) =>
      Navigator.of(context).push(revealRoute(TechniqueDetail(technique: t)));

  Widget _gap(double h) => SliverToBoxAdapter(child: SizedBox(height: h));

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final double bottomInset = MediaQuery.of(context).padding.bottom;

    return Scaffold(
      backgroundColor: p.canvas,
      body: Stack(
        children: <Widget>[
          LargeTitleScaffold(
            title: 'وحدة الكول سنتر',
            controller: _scroll,
            trailing: _ThemeToggle(isDark: widget.isDark, onTap: widget.onToggleTheme),
            slivers: <Widget>[
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(Space.x4, Space.x2, Space.x4, 0),
                sliver: SliverList(
                  delegate: SliverChildListDelegate(<Widget>[
                    _hero(p),
                    const SizedBox(height: Space.x4),
                    _featured(p),
                    const SizedBox(height: Space.x8),
                    _techniquesGroup(),
                    const SizedBox(height: Space.x8),
                    _shelfHeader('بصمة الصوت', 'AUDIO', AppIcons.microphone, '٥ أبعاد'),
                    const SizedBox(height: Space.x4),
                  ].animate(interval: 70.ms).fadeIn(duration: Motion.emerge).moveY(begin: 14, end: 0, curve: Motion.standard)),
                ),
              ),
              _voiceShelf(p),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(Space.x4, Space.x8, Space.x4, 0),
                sliver: SliverList(
                  delegate: SliverChildListDelegate(<Widget>[
                    _sectionHeader('دائرة التعاطف', 'EMPATHY', AppIcons.heart, '٤ خطوات'),
                    const SizedBox(height: Space.x4),
                    for (final EmpathyStep e in CallCenterData.empathy) ...<Widget>[
                      _empathyCard(p, e),
                      const SizedBox(height: Space.x3),
                    ],
                    const SizedBox(height: Space.x5),
                    _archetypesGroup(),
                    const SizedBox(height: Space.x8),
                    _sectionHeader('ردود خاطئة مقابل احترافية', 'CONTRAST', AppIcons.scales, null),
                    const SizedBox(height: Space.x4),
                    for (final CompareRow r in CallCenterData.compare) ...<Widget>[
                      _compareCard(p, r),
                      const SizedBox(height: Space.x3),
                    ],
                  ]),
                ),
              ),
              _gap(120 + bottomInset),
            ],
          ),

          // Frosted iOS tab bar
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: AppTabBar(
              currentIndex: _tab,
              items: const <TabItem>[
                TabItem(icon: AppIcons.house, label: 'الرئيسية'),
                TabItem(icon: AppIcons.flask, label: 'التدريب'),
                TabItem(icon: AppIcons.gauge, label: 'الحاسبة'),
                TabItem(icon: AppIcons.chartLineUp, label: 'التقدّم'),
                TabItem(icon: AppIcons.dotsThreeOutline, label: 'المزيد'),
              ],
              onSelected: (int i) {
                if (i == 2) {
                  showApIndexSheet(context);
                  return;
                }
                setState(() => _tab = i);
              },
            ),
          ),
        ],
      ),
    );
  }

  // ── Hero: mastery ring + tiers ──
  Widget _hero(AppPalette p) {
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
                Text('إتقانك', style: tt.labelMedium?.copyWith(color: p.gold)),
                const SizedBox(height: 2),
                Text('${Arabic.n(26)} من ${Arabic.n(69)} وحدة', style: tt.titleLarge),
                const SizedBox(height: Space.x4),
                Wrap(
                  spacing: Space.x2,
                  runSpacing: Space.x2,
                  children: <Widget>[
                    _tier(p, p.gold, 'التأسيس', '٢٠/٤٢'),
                    _tier(p, p.brand, 'الممارس', '٦/٢٧'),
                    _tier(p, p.inkFaint, 'الخبير', '٠/٦'),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(width: Space.x4),
          const ProgressRing(value: 38, size: 104),
        ],
      ),
    );
  }

  Widget _tier(AppPalette p, Color dot, String label, String count) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Space.x3, vertical: 6),
      decoration: BoxDecoration(
        color: p.fill,
        borderRadius: BorderRadius.circular(Radii.pill),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Container(width: 7, height: 7, decoration: BoxDecoration(color: dot, shape: BoxShape.circle)),
          const SizedBox(width: 6),
          Text('$label ', style: Theme.of(context).textTheme.labelSmall?.copyWith(color: p.inkMuted)),
          Text(count, style: AppTheme.mono(size: 11, color: p.ink)),
        ],
      ),
    );
  }

  // ── Featured "session of the day" ──
  Widget _featured(AppPalette p) {
    final Technique heat = CallCenterData.techniques[1];
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      accent: true,
      onTap: () => _openTechnique(heat),
      padding: const EdgeInsets.all(Space.x5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              IconBadge(AppIcons.target, tint: p.brand, size: 38),
              const SizedBox(width: Space.x3),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text('جلسة اليوم', style: tt.labelSmall?.copyWith(color: p.brand, letterSpacing: 0.8)),
                    const SizedBox(height: 2),
                    Text('شكوى مُتكرِّرة — التهدئة في ٩٠ ثانية', style: tt.titleMedium),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: Space.x3),
          Text(
            'عميل غاضب يتصل للمرة الثالثة. هدفك: تحويل الموقف من حادّ إلى مُتحكَّم به عبر تقنية HEAT.',
            style: tt.bodyMedium,
          ),
          const SizedBox(height: Space.x4),
          FilledCta(label: 'ابدأ التدريب', icon: AppIcons.target, onTap: () => _openTechnique(heat)),
        ],
      ),
    );
  }

  // ── Techniques as an iOS grouped list ──
  Widget _techniquesGroup() {
    final AppPalette p = context.palette;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        _sectionHeader('المهارات الأساسية', 'SKILLS', AppIcons.headset, '٦'),
        const SizedBox(height: Space.x4),
        InsetGroup(
          separatorInset: 68,
          children: <Widget>[
            for (final Technique t in CallCenterData.techniques)
              AppListRow(
                leading: IconBadge(t.icon, tint: p.brand),
                title: t.title,
                subtitle: '${Arabic.pct(t.progress)} مُتقَن',
                trailing: ProgressRing(value: t.progress, size: 34, showPercent: false),
                onTap: () => _openTechnique(t),
              ),
          ],
        ),
      ],
    );
  }

  // ── Voice profile horizontal shelf ──
  Widget _voiceShelf(AppPalette p) {
    return SliverToBoxAdapter(
      child: SizedBox(
        height: 232,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: Space.x4),
          itemCount: CallCenterData.voice.length,
          separatorBuilder: (_, _) => const SizedBox(width: Space.x3),
          itemBuilder: (BuildContext context, int i) => _voiceCard(p, CallCenterData.voice[i]),
        ),
      ),
    );
  }

  Widget _voiceCard(AppPalette p, VoiceDim v) {
    final TextTheme tt = Theme.of(context).textTheme;
    return SizedBox(
      width: 272,
      child: SurfaceCard(
        interactive: true,
        padding: const EdgeInsets.all(Space.x4 + 2),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: <Widget>[
                IconBadge(v.icon, tint: p.gold),
                const Spacer(),
                ProgressRing(value: v.progress, size: 38, showPercent: false),
              ],
            ),
            const SizedBox(height: Space.x3),
            Text(v.name, style: tt.titleMedium, maxLines: 1, overflow: TextOverflow.ellipsis),
            Text(v.unit, style: AppTheme.mono(size: 11, color: p.inkFaint)),
            const SizedBox(height: Space.x2),
            Row(
              crossAxisAlignment: CrossAxisAlignment.baseline,
              textBaseline: TextBaseline.alphabetic,
              children: <Widget>[
                Text('المثالي ', style: tt.labelSmall),
                Text(v.target, style: AppTheme.mono(size: 17, weight: FontWeight.w700, color: p.gold)),
              ],
            ),
            const SizedBox(height: Space.x2),
            Expanded(
              child: Text(
                v.science,
                style: tt.bodyMedium?.copyWith(fontSize: 13, height: 1.45),
                maxLines: 4,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ── Empathy step card ──
  Widget _empathyCard(AppPalette p, EmpathyStep e) {
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      interactive: false,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            width: 38,
            height: 38,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: p.brand.withValues(alpha: 0.14),
              borderRadius: BorderRadius.circular(Radii.pill),
            ),
            child: Text(e.index, style: tt.titleMedium?.copyWith(color: p.brand)),
          ),
          const SizedBox(width: Space.x4),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Icon(e.icon, size: 16, color: p.brand),
                    const SizedBox(width: Space.x2),
                    Flexible(child: Text(e.title, style: tt.titleMedium)),
                  ],
                ),
                const SizedBox(height: Space.x1),
                Text(e.sub, style: tt.bodyMedium?.copyWith(fontSize: 13.5)),
                const SizedBox(height: Space.x3),
                _lang(p, 'فصيح', e.fusha, false),
                const SizedBox(height: Space.x2),
                _lang(p, 'عراقي', e.iraqi, true),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _lang(AppPalette p, String tag, String text, bool iraqi) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(Space.x3),
      decoration: BoxDecoration(
        color: p.fill,
        borderRadius: BorderRadius.circular(Radii.sm),
        border: Border(right: BorderSide(color: iraqi ? p.gold : Colors.transparent, width: 2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(tag, style: Theme.of(context).textTheme.labelSmall?.copyWith(color: p.inkFaint)),
          const SizedBox(height: 2),
          Text(text, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: p.ink, fontSize: 14)),
        ],
      ),
    );
  }

  // ── Archetypes grouped list → detail sheet ──
  Widget _archetypesGroup() {
    final AppPalette p = context.palette;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        _sectionHeader('أنماط المتّصلين الصعبين', 'LIBRARY', AppIcons.usersThree, '٤'),
        const SizedBox(height: Space.x4),
        InsetGroup(
          separatorInset: 68,
          children: <Widget>[
            for (final Archetype a in CallCenterData.archetypes)
              AppListRow(
                leading: IconBadge(a.icon, tint: p.brand),
                title: a.title,
                subtitle: a.blurb,
                trailing: InfoPill(a.strategy, color: p.gold, mono: true),
                onTap: () => showArchetypeSheet(context, a),
              ),
          ],
        ),
      ],
    );
  }

  // ── Compare card ──
  Widget _compareCard(AppPalette p, CompareRow r) {
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      interactive: false,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(r.situation, style: tt.titleMedium),
          const SizedBox(height: Space.x3),
          _compareCell(p, r.wrong, false),
          const SizedBox(height: Space.x2),
          _compareCell(p, r.right, true),
        ],
      ),
    );
  }

  Widget _compareCell(AppPalette p, String text, bool good) {
    final Color c = good ? p.success : p.warning;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(Space.x3),
      decoration: BoxDecoration(
        color: c.withValues(alpha: p.isDark ? 0.10 : 0.08),
        borderRadius: BorderRadius.circular(Radii.sm),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Icon(good ? AppIcons.checkCircle : AppIcons.xCircle, size: 17, color: c),
          const SizedBox(width: Space.x3),
          Expanded(child: Text(text, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: p.ink, fontSize: 14))),
        ],
      ),
    );
  }

  // ── Section / shelf headers ──
  Widget _sectionHeader(String title, String eyebrow, IconData icon, String? tag) =>
      SectionHeader(eyebrow: eyebrow, eyebrowIcon: icon, title: title, tag: tag);

  Widget _shelfHeader(String title, String eyebrow, IconData icon, String? tag) =>
      SectionHeader(eyebrow: eyebrow, eyebrowIcon: icon, title: title, tag: tag);
}

class _ThemeToggle extends StatelessWidget {
  const _ThemeToggle({required this.isDark, required this.onTap});
  final bool isDark;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    return PressScale(
      onTap: onTap,
      pressedScale: 0.9,
      child: Container(
        width: 38,
        height: 38,
        decoration: BoxDecoration(
          color: p.fill,
          borderRadius: BorderRadius.circular(Radii.pill),
        ),
        child: AnimatedSwitcher(
          duration: Motion.quick,
          transitionBuilder: (Widget child, Animation<double> a) => RotationTransition(
            turns: Tween<double>(begin: 0.7, end: 1).animate(a),
            child: FadeTransition(opacity: a, child: child),
          ),
          child: Icon(
            isDark ? AppIcons.moon : AppIcons.sun,
            key: ValueKey<bool>(isDark),
            size: 20,
            color: p.brand,
          ),
        ),
      ),
    );
  }
}
