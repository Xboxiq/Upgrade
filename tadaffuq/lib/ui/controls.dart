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

/// A filled brand call-to-action button (iOS-prominent), with a tactile press.
class FilledCta extends StatelessWidget {
  const FilledCta({super.key, required this.label, this.icon, this.onTap, this.gradient = true});
  final String label;
  final IconData? icon;
  final VoidCallback? onTap;
  final bool gradient;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    return PressScale(
      onTap: onTap,
      pressedScale: 0.97,
      child: Container(
        height: 52,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          gradient: gradient
              ? LinearGradient(colors: <Color>[p.brandDeep, p.brand], begin: Alignment.topCenter, end: Alignment.bottomCenter)
              : null,
          color: gradient ? null : p.brand,
          borderRadius: BorderRadius.circular(Radii.md),
          boxShadow: <BoxShadow>[
            BoxShadow(
              color: p.brand.withValues(alpha: 0.32),
              blurRadius: 18,
              offset: const Offset(0, 8),
              spreadRadius: -6,
            ),
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            if (icon != null) ...<Widget>[
              Icon(icon, size: 19, color: Colors.white),
              const SizedBox(width: Space.x2),
            ],
            Text(label, style: Theme.of(context).textTheme.labelLarge?.copyWith(color: Colors.white)),
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
