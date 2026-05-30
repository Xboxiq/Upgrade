import 'package:flutter/material.dart';
import '../../../theme/app_icons.dart';

import '../../../theme/app_theme.dart';
import '../../../theme/palette.dart';
import '../../../theme/tokens.dart';
import '../../../util/numerals.dart';
import '../../../widgets/progress_ring.dart';
import '../../../widgets/ui_bits.dart';
import '../callcenter_data.dart';

/// Opens the APIndex calculator as a rounded, draggable bottom sheet.
Future<void> showApIndexSheet(BuildContext context) {
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    barrierColor: Colors.black.withValues(alpha: 0.55),
    builder: (BuildContext context) => const _ApIndexSheet(),
  );
}

class _ApIndexSheet extends StatefulWidget {
  const _ApIndexSheet();

  @override
  State<_ApIndexSheet> createState() => _ApIndexSheetState();
}

class _ApIndexSheetState extends State<_ApIndexSheet> {
  late final Map<String, double> _values = <String, double>{
    for (final KpiDef k in CallCenterData.kpis) k.code: k.value,
  };

  double _subScore(KpiDef k, double v) {
    if (!k.higherBetter) {
      // AHT: ideal band 4–6; penalise distance from the [4,6] window.
      final double over = (v - 6).clamp(0, 100);
      final double under = (4 - v).clamp(0, 100);
      return (100 - over * 20 - under * 20).clamp(0, 100);
    }
    return (v / k.target * 100).clamp(0, 100);
  }

  double get _composite {
    const Map<String, double> w = <String, double>{
      'CSAT': 0.25, 'FCR': 0.25, 'QA': 0.20, 'AHT': 0.15, 'ADH': 0.15,
    };
    double sum = 0;
    for (final KpiDef k in CallCenterData.kpis) {
      sum += _subScore(k, _values[k.code]!) * (w[k.code] ?? 0);
    }
    return sum.clamp(0, 100);
  }

  String _band(double s) {
    if (s >= 90) return 'متفوّق · فوق المعيار';
    if (s >= 80) return 'ضمن المعيار';
    if (s >= 70) return 'قرب المعيار';
    return 'تحت المعيار — يحتاج تحسين';
  }

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final double score = _composite;

    return DraggableScrollableSheet(
      initialChildSize: 0.86,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      expand: false,
      builder: (BuildContext context, ScrollController controller) {
        return Container(
          decoration: BoxDecoration(
            color: p.surface1,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(Radii.xl)),
            border: Border(top: BorderSide(color: p.lineStrong)),
          ),
          child: ListView(
            controller: controller,
            padding: const EdgeInsets.fromLTRB(Space.x5, Space.x3, Space.x5, Space.x8),
            children: <Widget>[
              Center(
                child: Container(
                  width: 44,
                  height: 5,
                  margin: const EdgeInsets.only(bottom: Space.x5),
                  decoration: BoxDecoration(
                    color: p.lineStrong,
                    borderRadius: BorderRadius.circular(Radii.pill),
                  ),
                ),
              ),
              Row(
                children: <Widget>[
                  IconBadge(AppIcons.gauge, tint: p.accentProgress, size: 48, iconSize: 24),
                  const SizedBox(width: Space.x3),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text('حاسبة مؤشر الأداء — APIndex', style: Theme.of(context).textTheme.titleLarge),
                        Text('مرجعية COPC CX 6.2 · كل القيم على جهازك', style: Theme.of(context).textTheme.labelSmall),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: Space.x6),
              // Result
              Container(
                padding: const EdgeInsets.all(Space.x5),
                decoration: BoxDecoration(
                  color: p.surface2,
                  borderRadius: BorderRadius.circular(Radii.lg),
                  border: Border.all(color: p.line),
                ),
                child: Row(
                  children: <Widget>[
                    ProgressRing(value: score, size: 96),
                    const SizedBox(width: Space.x5),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(_band(score), style: Theme.of(context).textTheme.titleLarge),
                          const SizedBox(height: Space.x1),
                          Text('المؤشر المركّب مقابل المعيار', style: Theme.of(context).textTheme.bodyMedium),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: Space.x6),
              for (final KpiDef k in CallCenterData.kpis) _kpiSlider(p, k),
            ],
          ),
        );
      },
    );
  }

  Widget _kpiSlider(AppPalette p, KpiDef k) {
    final double v = _values[k.code]!;
    final String shown = k.higherBetter ? Arabic.pct(v) : '${Arabic.n(v.toStringAsFixed(1))} د';
    return Padding(
      padding: const EdgeInsets.only(bottom: Space.x4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Text(k.code, style: AppTheme.mono(size: 13, color: p.accentProgress)),
              const SizedBox(width: Space.x2),
              Expanded(child: Text(k.label, style: Theme.of(context).textTheme.labelMedium)),
              InfoPill(k.ref),
              const SizedBox(width: Space.x2),
              Text(shown, style: AppTheme.mono(size: 14, color: p.ink)),
            ],
          ),
          SliderTheme(
            data: SliderThemeData(
              trackHeight: 5,
              activeTrackColor: p.accentProgress,
              inactiveTrackColor: p.lineStrong,
              thumbColor: p.accentProgress,
              overlayColor: p.accentProgress.withValues(alpha: 0.15),
              thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 9),
            ),
            child: Slider(
              value: v,
              min: k.min,
              max: k.max,
              onChanged: (double nv) => setState(() => _values[k.code] = nv),
            ),
          ),
        ],
      ),
    );
  }
}
