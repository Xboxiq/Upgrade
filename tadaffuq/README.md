# تَدَفُّق — Flutter (Call Center vertical slice)

A ground-up **Flutter** rebuild of the Upgrade / TADAFFUQ self-training
platform, aimed at a genuine UI/UX leap: a bespoke design system, glassmorphism
2.0 surfaces, a floating dock (no classic sidebar), animated bento, custom
hand-painted progress rings with glow, a Zen / Focus mode, and high-quality
motion throughout. RTL Arabic, dark + light themes.

This slice implements the **Call Center / خدمة العملاء** domain end-to-end.

## Run it

```bash
# from this directory (tadaffuq/)
flutter pub get

# Web (any desktop browser)
flutter run -d chrome
# …or build a static bundle:
flutter build web   # output in build/web

# Mobile
flutter run          # with an Android/iOS device or emulator attached
```

Requires Flutter 3.44+ (Dart 3.12+).

## What's inside

| Area | Highlights |
|------|-----------|
| Design system | `lib/theme/` — color palette as a `ThemeExtension` (deep-space dark + oatmeal light, neon-cyan progress, electric-orange action), typography (Cairo + JetBrains Mono), motion + spacing tokens |
| Widgets | `lib/widgets/` — `ProgressRing` (CustomPainter, gradient sweep + glow + maturing stroke + breathing), `GlassSurface` (BackdropFilter), `SurfaceCard` (hover-lift / press), `FloatingDock`, `PressScale`, reveal route transition |
| Icons | `lib/theme/app_icons.dart` — Lucide family via a bundled font as plain `const IconData` (monochrome, zero emoji) |
| Feature | `lib/features/callcenter/` — hero mastery ring, 6 technique cards (→ detail + Zen focus), 5-dimension Voice Profile, bilingual Empathy Loop, difficult-caller archetypes, wrong-vs-professional contrast, and a live **APIndex** calculator bottom sheet |

## Verified

`flutter analyze` → **No issues found** · `flutter build web` → **success** · `flutter test` → **passing**.
