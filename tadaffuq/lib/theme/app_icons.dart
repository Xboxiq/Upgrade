import 'package:flutter/widgets.dart';

/// ════════════════════════════════════════════════════════════════════════
/// AppIcons — the Lucide icon set, exposed as plain `const IconData` backed by
/// the bundled `assets/fonts/lucide.ttf`. Defining our own const IconData
/// (rather than depending on a package that *subclasses* the now-final
/// IconData) keeps us compatible with current Flutter while still using the
/// premium Lucide family. Member names mirror the icon's role in the UI.
/// ════════════════════════════════════════════════════════════════════════
abstract class AppIcons {
  // Brand / chrome
  static const IconData waveform = IconData(0xf474, fontFamily: 'Lucide'); // radio-tower
  static const IconData house = IconData(0xf35e, fontFamily: 'Lucide');
  static const IconData flask = IconData(0xf2ec, fontFamily: 'Lucide');
  static const IconData command = IconData(0xf248, fontFamily: 'Lucide');
  static const IconData chartLineUp = IconData(0xf54c, fontFamily: 'Lucide');
  static const IconData dotsThreeOutline = IconData(0xf3ed, fontFamily: 'Lucide');
  static const IconData sun = IconData(0xf50f, fontFamily: 'Lucide');
  static const IconData moon = IconData(0xf3eb, fontFamily: 'Lucide');
  static const IconData x = IconData(0xf59e, fontFamily: 'Lucide');
  static const IconData arrowLeft = IconData(0xf14f, fontFamily: 'Lucide');
  static const IconData chevronLeft = IconData(0xf1f9, fontFamily: 'Lucide');
  static const IconData target = IconData(0xf528, fontFamily: 'Lucide');

  // Call center
  static const IconData phone = IconData(0xf440, fontFamily: 'Lucide');
  static const IconData phoneCall = IconData(0xf441, fontFamily: 'Lucide');
  static const IconData phoneX = IconData(0xf445, fontFamily: 'Lucide'); // phone-off
  static const IconData phoneTransfer = IconData(0xf442, fontFamily: 'Lucide'); // phone-forwarded
  static const IconData headset = IconData(0xf353, fontFamily: 'Lucide'); // headphones
  static const IconData user = IconData(0xf564, fontFamily: 'Lucide');
  static const IconData usersThree = IconData(0xf574, fontFamily: 'Lucide'); // users
  static const IconData ear = IconData(0xf28e, fontFamily: 'Lucide');
  static const IconData microphone = IconData(0xf3d2, fontFamily: 'Lucide'); // mic
  static const IconData fire = IconData(0xf2e9, fontFamily: 'Lucide'); // flame
  static const IconData gauge = IconData(0xf328, fontFamily: 'Lucide');
  static const IconData chatCircleDots = IconData(0xf3cd, fontFamily: 'Lucide'); // message-circle
  static const IconData scales = IconData(0xf49f, fontFamily: 'Lucide'); // scale

  // Voice profile
  static const IconData timer = IconData(0xf53a, fontFamily: 'Lucide');
  static const IconData slidersHorizontal = IconData(0xf4dc, fontFamily: 'Lucide');
  static const IconData speakerHigh = IconData(0xf585, fontFamily: 'Lucide'); // volume-2
  static const IconData thermometer = IconData(0xf534, fontFamily: 'Lucide');
  static const IconData pause = IconData(0xf438, fontFamily: 'Lucide');

  // Empathy / states
  static const IconData heart = IconData(0xf354, fontFamily: 'Lucide');
  static const IconData compass = IconData(0xf249, fontFamily: 'Lucide');
  static const IconData lightning = IconData(0xf5a3, fontFamily: 'Lucide'); // zap
  static const IconData checkCircle = IconData(0xf1f0, fontFamily: 'Lucide');
  static const IconData warning = IconData(0xf10d, fontFamily: 'Lucide'); // alert-triangle
  static const IconData xCircle = IconData(0xf59f, fontFamily: 'Lucide');
  static const IconData star = IconData(0xf500, fontFamily: 'Lucide');
  static const IconData award = IconData(0xf172, fontFamily: 'Lucide');
}
