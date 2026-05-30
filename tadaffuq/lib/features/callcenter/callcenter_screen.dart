import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../theme/app_icons.dart';
import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../ui/controls.dart';
import '../../ui/floating_dock.dart';
import '../../ui/groups.dart';
import '../../ui/large_title_scaffold.dart';
import '../../util/numerals.dart';
import '../../widgets/aurora_background.dart';
import '../../widgets/press_scale.dart';
import '../../widgets/progress_ring.dart';
import '../../widgets/surface_card.dart';
import '../../widgets/tide_ring.dart';
import '../../widgets/transitions.dart';
import '../../widgets/ui_bits.dart';
import '../../widgets/voice_wave.dart';
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
  int _register = 1; // empathy register: 0 = فصيح, 1 = عراقي

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
          // The living deep-space canvas — starfield + drifting aurora
          // filaments, with subtle parallax driven by the page scroll.
          Positioned.fill(child: AuroraBackground(scrollable: _scroll)),

          LargeTitleScaffold(
            title: 'وحدة الكول سنتر',
            controller: _scroll,
            trailing: _ThemeToggle(isDark: widget.isDark, onTap: widget.onToggleTheme),
            slivers: <Widget>[
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(Space.x4, Space.x2, Space.x4, 0),
                sliver: SliverList(
                  delegate: SliverChildListDelegate(<Widget>[
                    const _MasteryHero(),
                    const SizedBox(height: Space.x4),
                    _featured(p),
                    const SizedBox(height: Space.x8),
                    _techniquesGroup(),
                    const SizedBox(height: Space.x8),
                    _voiceHeader(p),
                    const SizedBox(height: Space.x4),
                  ].animate(interval: 65.ms).fadeIn(duration: Motion.emerge).moveY(begin: 18, end: 0, curve: Motion.emphasized).scaleXY(begin: 0.985, end: 1, curve: Motion.emphasized)),
                ),
              ),
              _voiceShelf(p),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(Space.x4, Space.x8, Space.x4, 0),
                sliver: SliverList(
                  delegate: SliverChildListDelegate(<Widget>[
                    _empathyHeader(p),
                    const SizedBox(height: Space.x4),
                    for (final EmpathyStep e in CallCenterData.empathy) ...<Widget>[
                      _EmpathyCard(step: e, register: _register),
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
              _gap(132 + bottomInset),
            ],
          ),

          // Floating dock — navigation that hovers on the tide.
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: FloatingDock(
              currentIndex: _tab,
              items: const <DockItem>[
                DockItem(icon: AppIcons.house, label: 'الرئيسية'),
                DockItem(icon: AppIcons.flask, label: 'التدريب'),
                DockItem(icon: AppIcons.gauge, label: 'الحاسبة'),
                DockItem(icon: AppIcons.chartLineUp, label: 'التقدّم'),
                DockItem(icon: AppIcons.dotsThreeOutline, label: 'المزيد'),
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
              IconBadge(AppIcons.target, tint: p.spark, size: 38),
              const SizedBox(width: Space.x3),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text('جلسة اليوم', style: tt.labelSmall?.copyWith(color: p.spark, letterSpacing: 0.8)),
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

  // ── Voice section header: a LIVE waveform + title ──
  Widget _voiceHeader(AppPalette p) {
    final TextTheme tt = Theme.of(context).textTheme;
    return SurfaceCard(
      interactive: false,
      padding: const EdgeInsets.fromLTRB(Space.x5, Space.x4, Space.x5, Space.x4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Icon(AppIcons.microphone, size: 14, color: p.brand),
              const SizedBox(width: Space.x2),
              Text('AUDIO', style: tt.labelSmall?.copyWith(color: p.brand, letterSpacing: 0.8)),
              const Spacer(),
              InfoPill('٥ أبعاد', color: p.brand),
            ],
          ),
          const SizedBox(height: Space.x2),
          Text('بصمة الصوت', style: tt.headlineMedium),
          const SizedBox(height: Space.x3),
          // The voice, made visible — a calm, living waveform.
          const VoiceWave(height: 46),
          const SizedBox(height: Space.x2),
          Text('صوتك هو ٣٨٪ من رسالتك. اضغط أيّ بُعد لتقلبه وتكشف تمرين الخمس دقائق.',
              style: tt.bodyMedium?.copyWith(fontSize: 13.5)),
        ],
      ),
    );
  }

  // ── Voice profile horizontal shelf ──
  Widget _voiceShelf(AppPalette p) {
    return SliverToBoxAdapter(
      child: SizedBox(
        height: 244,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: Space.x4),
          itemCount: CallCenterData.voice.length,
          separatorBuilder: (_, _) => const SizedBox(width: Space.x3),
          itemBuilder: (BuildContext context, int i) =>
              _VoiceFlipCard(dim: CallCenterData.voice[i]),
        ),
      ),
    );
  }

  // ── Empathy section header with a register cross-fade toggle ──
  Widget _empathyHeader(AppPalette p) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        _sectionHeader('دائرة التعاطف', 'EMPATHY', AppIcons.heart, '٤ خطوات'),
        const SizedBox(height: Space.x4),
        AppSegmented(
          labels: const <String>['فصيح', 'عراقي'],
          value: _register,
          onChanged: (int v) => setState(() => _register = v),
        ),
      ],
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
                trailing: InfoPill(a.strategy, color: p.spark, mono: true),
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

  // ── Section headers ──
  Widget _sectionHeader(String title, String eyebrow, IconData icon, String? tag) =>
      SectionHeader(eyebrow: eyebrow, eyebrowIcon: icon, title: title, tag: tag);
}

// ════════════════════════════════════════════════════════════════════════
// Mastery hero (bento) — the tide ring + a long-press tier breakdown.
// ════════════════════════════════════════════════════════════════════════
class _MasteryHero extends StatefulWidget {
  const _MasteryHero();

  @override
  State<_MasteryHero> createState() => _MasteryHeroState();
}

class _MasteryHeroState extends State<_MasteryHero> {
  bool _tiersOpen = false;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;

    return SurfaceCard(
      interactive: false,
      padding: const EdgeInsets.all(Space.x5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text('إتقانك', style: tt.labelMedium?.copyWith(color: p.brand)),
                    const SizedBox(height: 2),
                    Text('${Arabic.n(26)} من ${Arabic.n(69)} وحدة', style: tt.titleLarge),
                    const SizedBox(height: Space.x4),
                    // Bento mini-tiles — momentum at a glance.
                    Row(
                      children: <Widget>[
                        _StatTile(icon: AppIcons.fire, value: '${Arabic.n(7)} أيام', label: 'تتابع', tint: p.spark),
                        const SizedBox(width: Space.x2),
                        _StatTile(icon: AppIcons.chartLineUp, value: '+${Arabic.n(4)}', label: 'هذا الأسبوع', tint: p.brand),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(width: Space.x4),
              Column(
                children: <Widget>[
                  PressScale(
                    onLongPress: () => setState(() => _tiersOpen = !_tiersOpen),
                    pressedScale: 0.96,
                    child: const TideRing(value: 38, size: 108),
                  ),
                  const SizedBox(height: Space.x2),
                  Text('مطوّل: المستويات', style: tt.labelSmall?.copyWith(color: p.inkFaint, fontSize: 10.5)),
                ],
              ),
            ],
          ),
          // Progressive disclosure: tiers revealed on long-press.
          AnimatedSize(
            duration: Motion.panel,
            curve: Motion.standard,
            child: _tiersOpen
                ? Column(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: Space.x4),
                        child: Divider(height: 0.5, thickness: 0.5, color: p.line),
                      ),
                      Wrap(
                        spacing: Space.x2,
                        runSpacing: Space.x2,
                        children: <Widget>[
                          _tier(p, p.success, 'التأسيس', '٢٠/٤٢'),
                          _tier(p, p.brand, 'الممارس', '٦/٢٧'),
                          _tier(p, p.inkFaint, 'الخبير', '٠/٦'),
                        ],
                      ),
                    ],
                  ).animate().fadeIn(duration: Motion.quick)
                : const SizedBox(width: double.infinity),
          ),
        ],
      ),
    );
  }

  Widget _tier(AppPalette p, Color dot, String label, String count) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Space.x3, vertical: 6),
      decoration: BoxDecoration(color: p.fill, borderRadius: BorderRadius.circular(Radii.pill)),
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
}

class _StatTile extends StatelessWidget {
  const _StatTile({required this.icon, required this.value, required this.label, required this.tint});
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
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Icon(icon, size: 15, color: tint),
          const SizedBox(height: 5),
          Text(value, style: AppTheme.mono(size: 13, weight: FontWeight.w700, color: p.ink)),
          Text(label, style: tt.labelSmall?.copyWith(color: p.inkFaint, fontSize: 10)),
        ],
      ),
    );
  }
}

// ════════════════════════════════════════════════════════════════════════
// Empathy card — register cross-fades between فصيح ⇄ عراقي.
// ════════════════════════════════════════════════════════════════════════
class _EmpathyCard extends StatelessWidget {
  const _EmpathyCard({required this.step, required this.register});
  final EmpathyStep step;
  final int register; // 0 = فصيح, 1 = عراقي

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final bool iraqi = register == 1;
    final String text = iraqi ? step.iraqi : step.fusha;

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
              color: p.fill,
              borderRadius: BorderRadius.circular(Radii.pill),
              border: Border.all(color: p.line, width: 0.5),
            ),
            child: Text(step.index, style: tt.titleMedium?.copyWith(color: p.brand)),
          ),
          const SizedBox(width: Space.x4),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Icon(step.icon, size: 16, color: p.brand),
                    const SizedBox(width: Space.x2),
                    Flexible(child: Text(step.title, style: tt.titleMedium)),
                  ],
                ),
                const SizedBox(height: Space.x1),
                Text(step.sub, style: tt.bodyMedium?.copyWith(fontSize: 13.5)),
                const SizedBox(height: Space.x3),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(Space.x3),
                  decoration: BoxDecoration(
                    color: p.fill,
                    borderRadius: BorderRadius.circular(Radii.sm),
                    border: Border(right: BorderSide(color: iraqi ? p.spark : p.brand, width: 2)),
                  ),
                  child: AnimatedSwitcher(
                    duration: Motion.quick,
                    switchInCurve: Motion.standard,
                    transitionBuilder: (Widget child, Animation<double> a) =>
                        FadeTransition(opacity: a, child: child),
                    child: Text(
                      text,
                      key: ValueKey<int>(register),
                      style: tt.bodyMedium?.copyWith(color: p.ink, fontSize: 14),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ════════════════════════════════════════════════════════════════════════
// Voice dimension card — taps flip in 3D to reveal its 5-minute drill.
// ════════════════════════════════════════════════════════════════════════
class _VoiceFlipCard extends StatefulWidget {
  const _VoiceFlipCard({required this.dim});
  final VoiceDim dim;

  @override
  State<_VoiceFlipCard> createState() => _VoiceFlipCardState();
}

class _VoiceFlipCardState extends State<_VoiceFlipCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(vsync: this, duration: Motion.morph);

  void _flip() {
    if (_c.isAnimating) return;
    if (_c.value == 0) {
      _c.forward();
    } else {
      _c.reverse();
    }
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 272,
      child: PressScale(
        onTap: _flip,
        pressedScale: 0.98,
        child: AnimatedBuilder(
          animation: _c,
          builder: (BuildContext context, _) {
            final double angle = Curves.easeInOut.transform(_c.value) * math.pi;
            final bool showFront = angle <= math.pi / 2;
            return Transform(
              alignment: Alignment.center,
              transform: Matrix4.identity()
                ..setEntry(3, 2, 0.0012)
                ..rotateY(angle),
              child: showFront
                  ? _front(context)
                  : Transform(
                      alignment: Alignment.center,
                      transform: Matrix4.identity()..rotateY(math.pi),
                      child: _back(context),
                    ),
            );
          },
        ),
      ),
    );
  }

  Widget _front(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final VoiceDim v = widget.dim;
    return SurfaceCard(
      interactive: false,
      padding: const EdgeInsets.all(Space.x4 + 2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              IconBadge(v.icon, tint: p.brand),
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
              Text(v.target, style: AppTheme.mono(size: 17, weight: FontWeight.w700, color: p.brand)),
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
          Row(
            children: <Widget>[
              Icon(AppIcons.timer, size: 12, color: p.inkFaint),
              const SizedBox(width: 4),
              Text('اقلبني · تمرين ٥ دقائق', style: tt.labelSmall?.copyWith(color: p.inkFaint, fontSize: 10.5)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _back(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final VoiceDim v = widget.dim;
    return SurfaceCard(
      interactive: false,
      accent: true,
      padding: const EdgeInsets.all(Space.x4 + 2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Icon(AppIcons.target, size: 16, color: p.brand),
              const SizedBox(width: Space.x2),
              Text('تمرين ٥ دقائق', style: tt.labelSmall?.copyWith(color: p.brand, letterSpacing: 0.6)),
            ],
          ),
          const SizedBox(height: Space.x3),
          Text(v.drill, style: tt.bodyLarge?.copyWith(color: p.ink, fontSize: 14.5, height: 1.5)),
          const Spacer(),
          Container(
            padding: const EdgeInsets.all(Space.x3),
            decoration: BoxDecoration(
              color: p.warning.withValues(alpha: p.isDark ? 0.10 : 0.08),
              borderRadius: BorderRadius.circular(Radii.sm),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Icon(AppIcons.warning, size: 15, color: p.warning),
                const SizedBox(width: Space.x2),
                Expanded(
                  child: Text(v.mistake,
                      style: tt.bodyMedium?.copyWith(color: p.ink, fontSize: 12.5, height: 1.4),
                      maxLines: 3, overflow: TextOverflow.ellipsis),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
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
