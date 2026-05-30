import 'package:flutter/material.dart';

import '../../../theme/app_icons.dart';
import '../../../theme/app_theme.dart';
import '../../../theme/palette.dart';
import '../../../theme/tokens.dart';
import '../../../util/numerals.dart';
import '../../../widgets/progress_ring.dart';
import '../../../widgets/ui_bits.dart';
import '../callcenter_data.dart';

/// Opens the APIndex calculator as an iOS bottom sheet with live sliders.
Future<void> showApIndexSheet(BuildContext context) {
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    barrierColor: Colors.black.withValues(alpha: 0.5),
    builder: (BuildContext context) => const _ApIndexSheet(),
  );
}

class _ApIndexSheet extends StatefulWidget {
  const _ApIndexSheet();
  @override
  State<_ApIndexSheet> createState() => _ApIndexSheetState();
}

class _ApIndexSheetState extends State<_ApIndexSheet> {
  late final Map<String, double> _v = <String, double>{
    for (final KpiDef k in CallCenterData.kpis) k.code: k.value,
  };

  double _sub(KpiDef k, double v) {
    if (!k.higherBetter) {
      final double over = (v - 6).clamp(0, 100);
      final double under = (4 - v).clamp(0, 100);
      return (100 - over * 20 - under * 20).clamp(0, 100);
    }
    return (v / k.target * 100).clamp(0, 100);
  }

  double get _score {
    const Map<String, double> w = <String, double>{'CSAT': .25, 'FCR': .25, 'QA': .20, 'AHT': .15, 'ADH': .15};
    double s = 0;
    for (final KpiDef k in CallCenterData.kpis) {
      s += _sub(k, _v[k.code]!) * (w[k.code] ?? 0);
    }
    return s.clamp(0, 100);
  }

  String _band(double s) => s >= 90
      ? 'متفوّق · فوق المعيار'
      : s >= 80
          ? 'ضمن المعيار'
          : s >= 70
              ? 'قرب المعيار'
              : 'تحت المعيار — يحتاج تحسين';

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final double score = _score;

    return DraggableScrollableSheet(
      initialChildSize: 0.88,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      expand: false,
      builder: (BuildContext context, ScrollController controller) {
        return Container(
          decoration: BoxDecoration(
            color: p.canvas,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(Radii.sheet)),
          ),
          child: ListView(
            controller: controller,
            padding: const EdgeInsets.fromLTRB(Space.x5, Space.x3, Space.x5, Space.x10),
            children: <Widget>[
              Center(
                child: Container(
                  width: 40, height: 5, margin: const EdgeInsets.only(bottom: Space.x5),
                  decoration: BoxDecoration(color: p.lineStrong, borderRadius: BorderRadius.circular(Radii.pill)),
                ),
              ),
              Row(
                children: <Widget>[
                  IconBadge(AppIcons.gauge, tint: p.gold, size: 48, iconSize: 24),
                  const SizedBox(width: Space.x3),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text('مؤشر الأداء — APIndex', style: tt.titleLarge),
                        Text('مرجعية COPC CX 6.2', style: tt.labelMedium),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: Space.x5),
              Container(
                padding: const EdgeInsets.all(Space.x5),
                decoration: BoxDecoration(
                  color: p.surface1,
                  borderRadius: BorderRadius.circular(Radii.lg),
                  border: Border.all(color: p.line, width: 0.5),
                ),
                child: Row(
                  children: <Widget>[
                    ProgressRing(value: score, size: 92),
                    const SizedBox(width: Space.x5),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(_band(score), style: tt.titleMedium),
                          const SizedBox(height: 2),
                          Text('المؤشر المركّب مقابل المعيار', style: tt.bodyMedium?.copyWith(fontSize: 13.5)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: Space.x6),
              for (final KpiDef k in CallCenterData.kpis) _slider(p, tt, k),
            ],
          ),
        );
      },
    );
  }

  Widget _slider(AppPalette p, TextTheme tt, KpiDef k) {
    final double v = _v[k.code]!;
    final String shown = k.higherBetter ? Arabic.pct(v) : '${Arabic.n(v.toStringAsFixed(1))} د';
    return Padding(
      padding: const EdgeInsets.only(bottom: Space.x4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Text(k.code, style: AppTheme.mono(size: 13, color: p.brand)),
              const SizedBox(width: Space.x2),
              Expanded(child: Text(k.label, style: tt.labelMedium)),
              InfoPill(k.ref),
              const SizedBox(width: Space.x2),
              Text(shown, style: AppTheme.mono(size: 14, color: p.ink)),
            ],
          ),
          Slider(
            value: v,
            min: k.min,
            max: k.max,
            onChanged: (double nv) => setState(() => _v[k.code] = nv),
          ),
        ],
      ),
    );
  }
}
