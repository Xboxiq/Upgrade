import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tadaffuq/main.dart';
import 'package:tadaffuq/ui/floating_dock.dart';
import 'package:tadaffuq/widgets/tide_ring.dart';

void main() {
  setUpAll(() {
    // Avoid network font fetches during tests.
    GoogleFonts.config.allowRuntimeFetching = false;
  });

  testWidgets('App boots and renders the Call Center unit', (WidgetTester tester) async {
    await tester.pumpWidget(const TadaffuqApp());
    await tester.pump(const Duration(milliseconds: 400));

    expect(find.text('وحدة الكول سنتر'), findsWidgets);
    expect(find.text('المهارات الأساسية'), findsOneWidget);
  });

  testWidgets('Aurora Tide chrome renders — floating dock + mastery tide ring', (WidgetTester tester) async {
    await tester.pumpWidget(const TadaffuqApp());
    await tester.pump(const Duration(milliseconds: 400));

    // The floating dock replaces the edge-to-edge tab bar.
    expect(find.byType(FloatingDock), findsOneWidget);
    // The active dock item reveals its label.
    expect(find.text('التدريب'), findsOneWidget);
    // The signature mastery vessel is painted in the hero.
    expect(find.byType(TideRing), findsWidgets);
  });
}
