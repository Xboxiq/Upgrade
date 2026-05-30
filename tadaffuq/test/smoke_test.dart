import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tadaffuq/features/worlds/system_map.dart';
import 'package:tadaffuq/main.dart';
import 'package:tadaffuq/ui/floating_dock.dart';

void main() {
  setUpAll(() {
    // Avoid network font fetches during tests.
    GoogleFonts.config.allowRuntimeFetching = false;
  });

  // Pump the first frame, then advance past the staggered entrance animations
  // (flutter_animate one-shot timers). No pumpAndSettle — the ambient orrery /
  // aurora tickers loop forever.
  Future<void> boot(WidgetTester tester) async {
    await tester.pumpWidget(const TadaffuqApp());
    await tester.pump();
    await tester.pump(const Duration(seconds: 2));
  }

  testWidgets('Home boots as a solar system + floating dock', (WidgetTester tester) async {
    await boot(tester);

    expect(find.byType(FloatingDock), findsOneWidget);
    expect(find.text('الرئيسية'), findsWidgets);
    // The home hero is the interactive worlds orrery.
    expect(find.byType(SystemMap), findsOneWidget);
  });

  testWidgets('Selected world panel shows the live world + enter CTA', (WidgetTester tester) async {
    await boot(tester);

    // Default selection is the live Call Center world.
    expect(find.text('الكول سنتر'), findsWidgets);
    expect(find.text('ادخل العالم'), findsOneWidget);
  });
}
