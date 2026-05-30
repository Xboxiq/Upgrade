import 'package:flutter/material.dart';

import '../theme/palette.dart';
import '../theme/tokens.dart';

/// A rounded, tinted squircle holding a single monochrome icon.
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
        color: c.withValues(alpha: p.isDark ? 0.18 : 0.12),
        borderRadius: BorderRadius.circular(size * 0.3),
      ),
      child: Icon(icon, size: iconSize, color: c),
    );
  }
}

/// A compact label pill (optionally with a leading icon).
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
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: Space.x3, vertical: 5),
      decoration: BoxDecoration(
        color: c.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(Radii.pill),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          if (icon != null) ...<Widget>[
            Icon(icon, size: 13, color: c),
            const SizedBox(width: 5),
          ],
          Text(label, style: Theme.of(context).textTheme.labelSmall?.copyWith(color: c)),
        ],
      ),
    );
  }
}

/// A content section heading: brand eyebrow, title, lede, optional tag.
class SectionHeader extends StatelessWidget {
  const SectionHeader({
    super.key,
    required this.eyebrow,
    required this.eyebrowIcon,
    required this.title,
    this.lede,
    this.tag,
  });

  final String eyebrow;
  final IconData eyebrowIcon;
  final String title;
  final String? lede;
  final String? tag;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme t = Theme.of(context).textTheme;
    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: <Widget>[
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Row(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Icon(eyebrowIcon, size: 14, color: p.brand),
                  const SizedBox(width: Space.x2),
                  Text(
                    eyebrow.toUpperCase(),
                    style: t.labelSmall?.copyWith(color: p.brand, letterSpacing: 0.8),
                  ),
                ],
              ),
              const SizedBox(height: Space.x2),
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
