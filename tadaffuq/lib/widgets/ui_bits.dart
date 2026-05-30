import 'package:flutter/material.dart';

import '../theme/app_icons.dart';
import '../theme/app_theme.dart';
import '../theme/palette.dart';
import '../theme/tokens.dart';
import 'press_scale.dart';

/// A rounded squircle holding a single monochrome icon. The colour lives in
/// the glyph; the container is a crisp neutral chip with a hairline edge — no
/// coloured halo behind the icon.
class IconBadge extends StatelessWidget {
  const IconBadge(this.icon, {super.key, this.tint, this.size = 40, this.iconSize = 21});
  final IconData icon;
  final Color? tint;
  final double size;
  final double iconSize;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final Color c = tint ?? p.inkMuted;
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: p.fill,
        borderRadius: BorderRadius.circular(size * 0.3),
        border: Border.all(color: p.line, width: 0.5),
      ),
      child: Icon(icon, size: iconSize, color: c),
    );
  }
}

/// A compact label pill (optionally with a leading icon). Neutral chip,
/// coloured text/icon — crisp, no tinted glow.
class InfoPill extends StatelessWidget {
  const InfoPill(this.label, {super.key, this.icon, this.color, this.mono = false});
  final String label;
  final IconData? icon;
  final Color? color;
  final bool mono;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final Color c = color ?? p.inkMuted;
    final TextStyle? style = mono
        ? AppTheme.mono(size: 11.5, weight: FontWeight.w600, color: c)
        : Theme.of(context).textTheme.labelSmall?.copyWith(color: c);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Space.x3, vertical: 5),
      decoration: BoxDecoration(
        color: p.fill,
        borderRadius: BorderRadius.circular(Radii.pill),
        border: Border.all(color: p.line, width: 0.5),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          if (icon != null) ...<Widget>[
            Icon(icon, size: 13, color: c),
            const SizedBox(width: 5),
          ],
          Text(label, style: style),
        ],
      ),
    );
  }
}

/// A content section heading: title, optional lede, optional tag, and an
/// OPTIONAL eyebrow. Eyebrows are used sparingly (max ~1 per 3 sections) — an
/// eyebrow above every heading is a top AI-slop tell, so it is opt-in here.
class SectionHeader extends StatelessWidget {
  const SectionHeader({
    super.key,
    required this.title,
    this.eyebrow,
    this.eyebrowIcon,
    this.lede,
    this.tag,
  });

  final String title;
  final String? eyebrow;
  final IconData? eyebrowIcon;
  final String? lede;
  final String? tag;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme t = Theme.of(context).textTheme;
    final bool hasEyebrow = eyebrow != null && eyebrowIcon != null;
    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: <Widget>[
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              if (hasEyebrow) ...<Widget>[
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Icon(eyebrowIcon, size: 14, color: p.brand),
                    const SizedBox(width: Space.x2),
                    Text(
                      eyebrow!.toUpperCase(),
                      style: t.labelSmall?.copyWith(color: p.brand, letterSpacing: 0.8),
                    ),
                  ],
                ),
                const SizedBox(height: Space.x2),
              ],
              Text(title, style: t.headlineMedium),
              if (lede != null) ...<Widget>[
                const SizedBox(height: Space.x2),
                Text(lede!, style: t.bodyMedium),
              ],
            ],
          ),
        ),
        if (tag != null) ...<Widget>[
          const SizedBox(width: Space.x4),
          Padding(padding: const EdgeInsets.only(bottom: 3), child: InfoPill(tag!)),
        ],
      ],
    );
  }
}

enum NoteKind { success, warning, neutral }

/// A soft note block with a leading rail + icon (quality indicators, etc.).
class NoteCard extends StatelessWidget {
  const NoteCard({super.key, required this.text, required this.icon, this.kind = NoteKind.neutral});
  final String text;
  final IconData icon;
  final NoteKind kind;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final Color c = switch (kind) {
      NoteKind.success => p.success,
      NoteKind.warning => p.warning,
      NoteKind.neutral => p.inkFaint,
    };
    return Container(
      padding: const EdgeInsets.all(Space.x3 + 2),
      decoration: BoxDecoration(
        color: c.withValues(alpha: p.isDark ? 0.10 : 0.08),
        borderRadius: BorderRadius.circular(Radii.sm),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Icon(icon, size: 17, color: c),
          const SizedBox(width: Space.x3),
          Expanded(
            child: Text(
              text,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: p.ink, height: 1.55),
            ),
          ),
        ],
      ),
    );
  }
}


/// A circular nav-bar action button (back / calculator / theme). Neutral chip
/// with a hairline edge and a coloured glyph — consistent with the no-halo
/// icon language and the rim-light depth system.
class NavCircleButton extends StatelessWidget {
  const NavCircleButton({super.key, required this.icon, this.onTap, this.tint});
  final IconData icon;
  final VoidCallback? onTap;
  final Color? tint;

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
          shape: BoxShape.circle,
          border: Border.all(color: p.line, width: 0.5),
        ),
        child: Icon(icon, size: 19, color: tint ?? p.ink),
      ),
    );
  }
}


/// A circular theme-toggle that cross-rotates between sun and moon.
class ThemeToggleButton extends StatelessWidget {
  const ThemeToggleButton({super.key, required this.isDark, required this.onTap});
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
          shape: BoxShape.circle,
          border: Border.all(color: p.line, width: 0.5),
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
