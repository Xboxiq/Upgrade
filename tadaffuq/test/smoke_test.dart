import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tadaffuq/main.dart';
import 'package:tadaffuq/ui/floating_dock.dart';
import 'package:tadaffuq/widgets/mastery_planet.dart';

void main() {
  setUpAll(() {
    // Avoid network font fetches during tests.
    GoogleFonts.config.allowRuntimeFetching = false;
  });

  // Pump the first frame, then advance past the staggered entrance animations
  // (flutter_animate uses one-shot timers). We avoid pumpAndSettle because the
  // ambient aurora / tide-ring tickers loop forever.
  Future<void> boot(WidgetTester tester) async {
    await tester.pumpWidget(const TadaffuqApp());
    await tester.pump();
    await tester.pump(const Duration(seconds: 2));
  }

  testWidgets('Platform shell boots — floating dock + home mastery ring', (WidgetTester tester) async {
    await boot(tester);

    expect(find.byType(FloatingDock), findsOneWidget);
    expect(find.text('الرئيسية'), findsWidgets);
    expect(find.byType(MasteryPlanet), findsWidgets);
  });

  testWidgets('Worlds catalogue is part of the shell', (WidgetTester tester) async {
    await boot(tester);

    expect(find.text('المبيعات الميدانية'), findsWidgets);
  });
}
