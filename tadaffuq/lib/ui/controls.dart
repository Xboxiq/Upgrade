import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';
import '../widgets/press_scale.dart';

/// iOS sliding segmented control (authentic), themed to the palette.
class AppSegmented extends StatelessWidget {
  const AppSegmented({
    super.key,
    required this.labels,
    required this.value,
    required this.onChanged,
  });

  final List<String> labels;
  final int value;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    return SizedBox(
      width: double.infinity,
      child: CupertinoSlidingSegmentedControl<int>(
        groupValue: value,
        backgroundColor: p.fill,
        thumbColor: p.isDark ? p.surface2 : Colors.white,
        padding: const EdgeInsets.all(3),
        children: <int, Widget>{
          for (int i = 0; i < labels.length; i++)
            i: Padding(
              padding: const EdgeInsets.symmetric(vertical: Space.x2),
              child: Text(
                labels[i],
                style: tt.labelMedium?.copyWith(
                  color: i == value ? p.ink : p.inkMuted,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        },
        onValueChanged: (int? v) {
          if (v != null) onChanged(v);
        },
      ),
    );
  }
}

/// A filled call-to-action button (iOS-prominent), with a tactile press. By
/// default it wears the warm **spark** gradient — the "do this now" pole. Pass
/// [tone] `CtaTone.cool` for a secondary, on-track action in the cyan tide.
enum CtaTone { spark, cool }

class FilledCta extends StatelessWidget {
  const FilledCta({
    super.key,
    required this.label,
    this.icon,
    this.onTap,
    this.tone = CtaTone.spark,
  });
  final String label;
  final IconData? icon;
  final VoidCallback? onTap;
  final CtaTone tone;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final bool warm = tone == CtaTone.spark;
    final List<Color> grad = warm ? p.sparkGradient : p.tideGradient;
    final Color onColor = warm
        ? Colors.white
        : (p.isDark ? const Color(0xFF04141A) : Colors.white);

    return PressScale(
      onTap: onTap,
      pressedScale: 0.97,
      child: Container(
        height: 52,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: grad,
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
          borderRadius: BorderRadius.circular(Radii.md),
          // Depth from the gradient + a hairline top highlight (lit-from-above);
          // no drop shadow — consistent with the rim-light depth language.
          border: Border(
            top: BorderSide(color: Colors.white.withValues(alpha: 0.22), width: 0.6),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            if (icon != null) ...<Widget>[
              Icon(icon, size: 19, color: onColor),
              const SizedBox(width: Space.x2),
            ],
            Text(label, style: Theme.of(context).textTheme.labelLarge?.copyWith(color: onColor)),
          ],
        ),
      ),
    );
  }
}

/// A tinted (low-emphasis) button — brand text on a brand-wash fill.
class TintedButton extends StatelessWidget {
  const TintedButton({super.key, required this.label, this.icon, this.onTap, this.color});
  final String label;
  final IconData? icon;
  final VoidCallback? onTap;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final Color c = color ?? p.brand;
    return PressScale(
      onTap: onTap,
      pressedScale: 0.97,
      child: Container(
        height: 48,
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(horizontal: Space.x5),
        decoration: BoxDecoration(
          color: c.withValues(alpha: p.isDark ? 0.18 : 0.12),
          borderRadius: BorderRadius.circular(Radii.md),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            if (icon != null) ...<Widget>[
              Icon(icon, size: 18, color: c),
              const SizedBox(width: Space.x2),
            ],
            Text(label, style: Theme.of(context).textTheme.labelLarge?.copyWith(color: c)),
          ],
        ),
      ),
    );
  }
}
