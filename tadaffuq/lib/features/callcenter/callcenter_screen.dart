import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../theme/app_icons.dart';

import '../../theme/app_theme.dart';
import '../../theme/palette.dart';
import '../../theme/tokens.dart';
import '../../util/numerals.dart';
import '../../widgets/floating_dock.dart';
import '../../widgets/press_scale.dart';
import '../../widgets/progress_ring.dart';
import '../../widgets/surface_card.dart';
import '../../widgets/transitions.dart';
import '../../widgets/ui_bits.dart';
import 'callcenter_data.dart';
import 'widgets/apindex_sheet.dart';
import 'widgets/technique_detail.dart';

class CallCenterScreen extends StatefulWidget {
  const CallCenterScreen({super.key, required this.isDark, required this.onToggleTheme});
  final bool isDark;
  final VoidCallback onToggleTheme;

  @override
  State<CallCenterScreen> createState() => _CallCenterScreenState();
}

class _CallCenterScreenState extends State<CallCenterScreen> {
  int _dockIndex = 1; // "lab"

  static const double _maxContentWidth = 1080;

  void _openTechnique(Technique t) {
    Navigator.of(context).push(revealRoute(TechniqueDetail(technique: t)));
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;

    return Scaffold(
      backgroundColor: p.canvas,
      body: Stack(
        children: <Widget>[
          _AmbientBackdrop(),
          Scrollbar(
            child: SingleChildScrollView(
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: _maxContentWidth),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(Space.x5, Space.x5, Space.x5, 140),
                    child: LayoutBuilder(
                      builder: (BuildContext context, BoxConstraints c) {
                        final double w = c.maxWidth;
                        return Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            _topBar(p),
                            const SizedBox(height: Space.x6),
                            _hero(p, w),
                            const SizedBox(height: Space.x10),
                            _techniquesSection(w),
                            const SizedBox(height: Space.x12),
                            _voiceSection(w),
                            const SizedBox(height: Space.x12),
                            _empathySection(w),
                            const SizedBox(height: Space.x12),
                            _archetypeSection(w),
                            const SizedBox(height: Space.x12),
                            _compareSection(),
                          ],
                        );
                      },
                    ),
                  ),
                ),
              ),
            ),
          ),
          _dock(p),
        ],
      ),
    );
  }

  // ── Top bar: brand + theme toggle ──
  Widget _topBar(AppPalette p) {
    return Row(
      children: <Widget>[
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            gradient: LinearGradient(colors: <Color>[p.accentProgress, p.accentAction]),
            borderRadius: BorderRadius.circular(Radii.sm),
          ),
          child: const Icon(AppIcons.waveform, size: 20, color: Colors.white),
        ),
        const SizedBox(width: Space.x3),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text('تَدَفُّق', style: Theme.of(context).textTheme.titleMedium),
            Text('وحدة الكول سنتر', style: Theme.of(context).textTheme.labelSmall),
          ],
        ),
        const Spacer(),
        _ThemeToggle(isDark: widget.isDark, onTap: widget.onToggleTheme),
      ],
    );
  }

  // ── Hero header with mastery ring ──
  Widget _hero(AppPalette p, double w) {
    final bool wide = w > 640;
    final Widget ring = Column(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        const ProgressRing(value: 38, size: 132),
        const SizedBox(height: Space.x3),
        Text('${Arabic.n(26)} / ${Arabic.n(69)} وحدة', style: Theme.of(context).textTheme.labelLarge),
        Text('تقدّم الإتقان', style: Theme.of(context).textTheme.labelSmall),
      ],
    );

    final Widget lead = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Row(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Icon(AppIcons.phoneCall, size: 15, color: p.accentAction),
            const SizedBox(width: Space.x2),
            Text('وحدة تخصصية', style: Theme.of(context).textTheme.labelSmall?.copyWith(color: p.accentAction, letterSpacing: 0.6)),
          ],
        ),
        const SizedBox(height: Space.x3),
        Text('وحدة الكول سنتر', style: Theme.of(context).textTheme.displayLarge),
        const SizedBox(height: Space.x3),
        Text(
          'تدريب متكامل على مهارات التواصل الهاتفي وخدمة العملاء — بالأساليب التي تنجح فعلاً على أرض الواقع. صوتك بصمة عصبية، وكل مكالمة فرصة.',
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        const SizedBox(height: Space.x5),
        Wrap(
          spacing: Space.x3,
          runSpacing: Space.x3,
          children: <Widget>[
            _tier(p, p.accentProgress, '٢٠ / ٤٢', 'التأسيس'),
            _tier(p, p.accentAction, '٦ / ٢٧', 'الممارس'),
            _tier(p, p.inkFaint, '٠ / ٦', 'الخبير'),
          ],
        ),
      ],
    );

    return SurfaceCard(
      accent: true,
      interactive: false,
      padding: const EdgeInsets.all(Space.x6),
      child: wide
          ? Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Expanded(child: lead),
                const SizedBox(width: Space.x8),
                ring,
              ],
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[lead, const SizedBox(height: Space.x6), Center(child: ring)],
            ),
    ).animate().fadeIn(duration: Motion.panel).moveY(begin: 16, end: 0, curve: Motion.standard);
  }

  Widget _tier(AppPalette p, Color dot, String count, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Space.x4, vertical: Space.x2),
      decoration: BoxDecoration(
        color: p.isDark ? Colors.white.withValues(alpha: 0.04) : Colors.black.withValues(alpha: 0.03),
        borderRadius: BorderRadius.circular(Radii.pill),
        border: Border.all(color: p.line),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Container(width: 8, height: 8, decoration: BoxDecoration(color: dot, shape: BoxShape.circle)),
          const SizedBox(width: Space.x2),
          Text(count, style: AppTheme.mono(size: 12.5, color: p.ink)),
          const SizedBox(width: Space.x2),
          Text(label, style: Theme.of(context).textTheme.labelSmall),
        ],
      ),
    );
  }

  // ── helper: responsive column count + grid ──
  int _cols(double w) => w > 880 ? 3 : (w > 560 ? 2 : 1);

  Widget _grid(double w, List<Widget> children, {int? cols}) {
    final int n = cols ?? _cols(w);
    const double gap = Space.x4;
    final double itemW = (w - gap * (n - 1)) / n;
    return Wrap(
      spacing: gap,
      runSpacing: gap,
      children: <Widget>[
        for (int i = 0; i < children.length; i++)
          SizedBox(
            width: itemW,
            child: children[i]
                .animate(delay: (40 * i).ms)
                .fadeIn(duration: Motion.emerge)
                .moveY(begin: 14, end: 0, curve: Motion.standard),
          ),
      ],
    );
  }

  // ── Techniques ──
  Widget _techniquesSection(double w) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SectionHeader(
          eyebrow: 'المهارات الأساسية',
          eyebrowIcon: AppIcons.headset,
          title: 'ستّ مهارات تصنع المكالمة الاحترافية',
          lede: 'اضغط أي بطاقة لتفتح السكريبت ومؤشر الجودة وتدخل وضع التركيز.',
          tag: '٦ مهارات',
        ),
        const SizedBox(height: Space.x6),
        _grid(w, <Widget>[
          for (final Technique t in CallCenterData.techniques) _techniqueCard(t),
        ]),
      ],
    );
  }

  Widget _techniqueCard(Technique t) {
    final AppPalette p = context.palette;
    return SurfaceCard(
      onTap: () => _openTechnique(t),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              IconBadge(t.icon, tint: p.accentAction),
              const Spacer(),
              ProgressRing(value: t.progress, size: 44),
            ],
          ),
          const SizedBox(height: Space.x4),
          Text(t.title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: Space.x2),
          Text(t.blurb, maxLines: 3, overflow: TextOverflow.ellipsis, style: Theme.of(context).textTheme.bodyMedium),
          const SizedBox(height: Space.x4),
          Row(
            children: <Widget>[
              Text('افتح المهارة', style: Theme.of(context).textTheme.labelMedium?.copyWith(color: p.accentAction)),
              const SizedBox(width: Space.x1),
              Icon(AppIcons.arrowLeft, size: 14, color: p.accentAction),
            ],
          ),
        ],
      ),
    );
  }

  // ── Voice Profile ──
  Widget _voiceSection(double w) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SectionHeader(
          eyebrow: 'Voice Psychology',
          eyebrowIcon: AppIcons.microphone,
          title: 'بصمة الصوت — ٥ أبعاد قابلة للقياس',
          lede: 'لكل بُعد نطاق مرجعي، خطأ شائع، وتمرين تصحيحي من ٥ دقائق.',
          tag: '٥ أبعاد',
        ),
        const SizedBox(height: Space.x6),
        _grid(w, <Widget>[for (final VoiceDim v in CallCenterData.voice) _voiceCard(v)]),
      ],
    );
  }

  Widget _voiceCard(VoiceDim v) {
    final AppPalette p = context.palette;
    return SurfaceCard(
      interactive: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              IconBadge(v.icon, tint: p.accentProgress),
              const SizedBox(width: Space.x3),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(v.name, style: Theme.of(context).textTheme.titleMedium),
                    Text(v.unit, style: AppTheme.mono(size: 11, color: p.inkFaint)),
                  ],
                ),
              ),
              ProgressRing(value: v.progress, size: 40),
            ],
          ),
          const SizedBox(height: Space.x4),
          Container(
            padding: const EdgeInsets.all(Space.x3),
            decoration: BoxDecoration(color: p.surface2, borderRadius: BorderRadius.circular(Radii.sm)),
            child: Row(
              children: <Widget>[
                Text('النطاق المثالي', style: Theme.of(context).textTheme.labelSmall),
                const Spacer(),
                Text(v.target, style: AppTheme.mono(size: 16, weight: FontWeight.w700, color: p.accentProgress)),
              ],
            ),
          ),
          const SizedBox(height: Space.x3),
          Text(v.science, style: Theme.of(context).textTheme.bodyMedium),
          const SizedBox(height: Space.x3),
          NoteCard(text: v.mistake, icon: AppIcons.warning, kind: NoteKind.warning),
          const SizedBox(height: Space.x2),
          NoteCard(text: v.drill, icon: v.icon, kind: NoteKind.neutral),
        ],
      ),
    );
  }

  // ── Empathy Loop ──
  Widget _empathySection(double w) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SectionHeader(
          eyebrow: 'Empathy Loop',
          eyebrowIcon: AppIcons.heart,
          title: 'دائرة التعاطف — ٤ خطوات بصياغتين',
          lede: 'كل خطوة بالعربية الفصيحة وبالعراقي المحكي — اختر الأنسب.',
          tag: '٤ خطوات',
        ),
        const SizedBox(height: Space.x6),
        _grid(w, <Widget>[for (final EmpathyStep e in CallCenterData.empathy) _empathyCard(e)], cols: w > 880 ? 2 : 1),
      ],
    );
  }

  Widget _empathyCard(EmpathyStep e) {
    final AppPalette p = context.palette;
    return SurfaceCard(
      interactive: true,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            width: 40,
            height: 40,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: p.accentAction.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(Radii.pill),
            ),
            child: Text(e.index, style: Theme.of(context).textTheme.titleLarge?.copyWith(color: p.accentAction)),
          ),
          const SizedBox(width: Space.x4),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Icon(e.icon, size: 16, color: p.accentAction),
                    const SizedBox(width: Space.x2),
                    Flexible(child: Text(e.title, style: Theme.of(context).textTheme.titleMedium)),
                  ],
                ),
                const SizedBox(height: Space.x2),
                Text(e.sub, style: Theme.of(context).textTheme.bodyMedium),
                const SizedBox(height: Space.x3),
                _langLine(p, 'فصيح', e.fusha, false),
                const SizedBox(height: Space.x2),
                _langLine(p, 'عراقي', e.iraqi, true),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _langLine(AppPalette p, String tag, String text, bool iraqi) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(Space.x3),
      decoration: BoxDecoration(
        color: p.surface2,
        borderRadius: BorderRadius.circular(Radii.sm),
        border: Border(right: BorderSide(color: iraqi ? p.accentProgress : Colors.transparent, width: 2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(tag, style: Theme.of(context).textTheme.labelSmall?.copyWith(color: p.inkFaint)),
          const SizedBox(height: 2),
          Text(text, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: p.ink)),
        ],
      ),
    );
  }

  // ── Archetypes ──
  Widget _archetypeSection(double w) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SectionHeader(
          eyebrow: 'Library',
          eyebrowIcon: AppIcons.usersThree,
          title: 'أنماط المتّصلين الصعبين',
          lede: 'لكل نمط جذر نفسي، استراتيجية، وحوار عراقي مختصر.',
          tag: '٤ أنماط',
        ),
        const SizedBox(height: Space.x6),
        _grid(w, <Widget>[for (final Archetype a in CallCenterData.archetypes) _archetypeCard(a)], cols: w > 880 ? 2 : 1),
      ],
    );
  }

  Widget _archetypeCard(Archetype a) {
    final AppPalette p = context.palette;
    return SurfaceCard(
      interactive: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              IconBadge(a.icon, tint: p.accentAction),
              const SizedBox(width: Space.x3),
              Expanded(child: Text(a.title, style: Theme.of(context).textTheme.titleLarge)),
              InfoPill(a.strategy, color: p.accentProgress, mono: true),
            ],
          ),
          const SizedBox(height: Space.x3),
          _kv(p, 'الجذر', a.root),
          const SizedBox(height: Space.x2),
          _kv(p, 'الاستراتيجية', a.tactic),
          const SizedBox(height: Space.x3),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(Space.x3),
            decoration: BoxDecoration(color: p.surface2, borderRadius: BorderRadius.circular(Radii.sm)),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Icon(AppIcons.chatCircleDots, size: 16, color: p.inkFaint),
                const SizedBox(width: Space.x2),
                Expanded(child: Text(a.dialogue, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: p.ink))),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _kv(AppPalette p, String k, String v) {
    return RichText(
      text: TextSpan(
        children: <InlineSpan>[
          TextSpan(text: '$k: ', style: Theme.of(context).textTheme.labelMedium?.copyWith(color: p.ink)),
          TextSpan(text: v, style: Theme.of(context).textTheme.bodyMedium),
        ],
      ),
    );
  }

  // ── Compare ──
  Widget _compareSection() {
    final AppPalette p = context.palette;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SectionHeader(
          eyebrow: 'Contrast',
          eyebrowIcon: AppIcons.scales,
          title: 'ردود خاطئة مقابل ردود احترافية',
          lede: 'مواقف حقيقية — الفرق بين الردّ العادي والردّ الذي يُغيّر التجربة.',
        ),
        const SizedBox(height: Space.x6),
        SurfaceCard(
          interactive: false,
          padding: const EdgeInsets.all(Space.x2),
          child: Column(
            children: <Widget>[
              for (final CompareRow r in CallCenterData.compare) _compareRow(p, r),
            ],
          ),
        ),
      ],
    );
  }

  Widget _compareRow(AppPalette p, CompareRow r) {
    return Padding(
      padding: const EdgeInsets.all(Space.x3),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(r.situation, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: Space.x3),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Expanded(child: _compareCell(p, r.wrong, false)),
              const SizedBox(width: Space.x3),
              Expanded(child: _compareCell(p, r.right, true)),
            ],
          ),
          const SizedBox(height: Space.x2),
        ],
      ),
    );
  }

  Widget _compareCell(AppPalette p, String text, bool good) {
    final Color c = good ? p.accentProgress : p.accentAction;
    return Container(
      padding: const EdgeInsets.all(Space.x3),
      decoration: BoxDecoration(
        color: c.withValues(alpha: 0.07),
        borderRadius: BorderRadius.circular(Radii.sm),
        border: Border(right: BorderSide(color: c, width: 2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Icon(good ? AppIcons.checkCircle : AppIcons.xCircle, size: 16, color: c),
          const SizedBox(height: Space.x2),
          Text(text, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: p.ink)),
        ],
      ),
    );
  }

  // ── Floating dock ──
  Widget _dock(AppPalette p) {
    return Positioned(
      left: 0,
      right: 0,
      bottom: Space.x5,
      child: Center(
        child: FloatingDock(
          currentIndex: _dockIndex,
          items: const <DockItem>[
            DockItem(icon: AppIcons.house, label: 'الرئيسية'),
            DockItem(icon: AppIcons.flask, label: 'التدريب'),
            DockItem(icon: AppIcons.gauge, label: 'الحاسبة', isAction: true),
            DockItem(icon: AppIcons.chartLineUp, label: 'التقدّم'),
            DockItem(icon: AppIcons.dotsThreeOutline, label: 'المزيد'),
          ],
          onSelected: (int i) {
            if (i == 2) {
              showApIndexSheet(context);
              return;
            }
            setState(() => _dockIndex = i);
            if (i == 1) _openTechnique(CallCenterData.techniques[1]);
          },
        ),
      ),
    );
  }
}

/// A soft ambient glow behind the canvas — two faint accent blooms that give
/// the deep-space background depth without distracting from content.
class _AmbientBackdrop extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    if (!p.isDark) return const SizedBox.shrink();
    return Positioned.fill(
      child: IgnorePointer(
        child: Stack(
          children: <Widget>[
            Positioned(
              top: -120,
              right: -80,
              child: _blob(p.accentProgress.withValues(alpha: 0.10)),
            ),
            Positioned(
              bottom: 40,
              left: -100,
              child: _blob(p.accentAction.withValues(alpha: 0.08)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _blob(Color c) {
    return Container(
      width: 320,
      height: 320,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        boxShadow: <BoxShadow>[BoxShadow(color: c, blurRadius: 160, spreadRadius: 80)],
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
        width: 46,
        height: 46,
        decoration: BoxDecoration(
          color: p.surface1,
          borderRadius: BorderRadius.circular(Radii.pill),
          border: Border.all(color: p.line),
        ),
        child: AnimatedSwitcher(
          duration: Motion.quick,
          transitionBuilder: (Widget child, Animation<double> a) =>
              RotationTransition(turns: Tween<double>(begin: 0.6, end: 1).animate(a), child: FadeTransition(opacity: a, child: child)),
          child: Icon(
            isDark ? AppIcons.moon : AppIcons.sun,
            key: ValueKey<bool>(isDark),
            size: 22,
            color: p.accentProgress,
          ),
        ),
      ),
    );
  }
}
