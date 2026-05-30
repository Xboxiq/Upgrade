import 'package:flutter/material.dart';

import '../theme/app_icons.dart';
import '../theme/palette.dart';
import '../theme/tokens.dart';

/// An iOS "inset grouped" container: a rounded surface holding rows separated
/// by inset hairlines, with an optional gray header and footer caption.
/// The canonical grouping primitive reused across every section.
class InsetGroup extends StatelessWidget {
  const InsetGroup({
    super.key,
    required this.children,
    this.header,
    this.footer,
    this.separatorInset = Space.x4,
  });

  final List<Widget> children;
  final String? header;
  final String? footer;
  final double separatorInset;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;

    final List<Widget> rows = <Widget>[];
    for (int i = 0; i < children.length; i++) {
      rows.add(children[i]);
      if (i != children.length - 1) {
        rows.add(Padding(
          padding: EdgeInsetsDirectional.only(start: separatorInset),
          child: Divider(height: 0.5, thickness: 0.5, color: p.line),
        ));
      }
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        if (header != null)
          Padding(
            padding: const EdgeInsetsDirectional.fromSTEB(Space.x4, 0, Space.x4, Space.x2),
            child: Text(
              header!.toUpperCase(),
              style: tt.labelSmall?.copyWith(color: p.inkFaint, letterSpacing: 0.6),
            ),
          ),
        DecoratedBox(
          decoration: BoxDecoration(
            color: p.surface1,
            borderRadius: BorderRadius.circular(Radii.group),
            border: Border.all(color: p.line, width: 0.5),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(Radii.group),
            child: Column(children: rows),
          ),
        ),
        if (footer != null)
          Padding(
            padding: const EdgeInsetsDirectional.fromSTEB(Space.x4, Space.x2, Space.x4, 0),
            child: Text(footer!, style: tt.labelMedium?.copyWith(color: p.inkFaint)),
          ),
      ],
    );
  }
}

/// A tappable iOS list row: leading, title (+subtitle), trailing or chevron.
class AppListRow extends StatefulWidget {
  const AppListRow({
    super.key,
    this.leading,
    required this.title,
    this.subtitle,
    this.trailing,
    this.onTap,
    this.showChevron = true,
  });

  final Widget? leading;
  final String title;
  final String? subtitle;
  final Widget? trailing;
  final VoidCallback? onTap;
  final bool showChevron;

  @override
  State<AppListRow> createState() => _AppListRowState();
}

class _AppListRowState extends State<AppListRow> {
  bool _down = false;

  @override
  Widget build(BuildContext context) {
    final AppPalette p = context.palette;
    final TextTheme tt = Theme.of(context).textTheme;
    final bool tappable = widget.onTap != null;

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTapDown: tappable ? (_) => setState(() => _down = true) : null,
      onTapCancel: tappable ? () => setState(() => _down = false) : null,
      onTapUp: tappable ? (_) => setState(() => _down = false) : null,
      onTap: widget.onTap,
      child: AnimatedContainer(
        duration: Motion.instant,
        color: _down ? p.fill : Colors.transparent,
        padding: const EdgeInsets.symmetric(horizontal: Space.x4, vertical: Space.x3 + 2),
        child: Row(
          children: <Widget>[
            if (widget.leading != null) ...<Widget>[
              widget.leading!,
              const SizedBox(width: Space.x3),
            ],
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(widget.title, style: tt.titleMedium),
                  if (widget.subtitle != null) ...<Widget>[
                    const SizedBox(height: 2),
                    Text(widget.subtitle!, style: tt.labelMedium),
                  ],
                ],
              ),
            ),
            if (widget.trailing != null) ...<Widget>[
              const SizedBox(width: Space.x3),
              widget.trailing!,
            ],
            if (tappable && widget.showChevron) ...<Widget>[
              const SizedBox(width: Space.x2),
              Icon(AppIcons.chevronLeft, size: 18, color: p.inkFaint), // RTL: points toward start
            ],
          ],
        ),
      ),
    );
  }
}
