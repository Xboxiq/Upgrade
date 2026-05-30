import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tadaffuq/main.dart';

void main() {
  testWidgets('App boots and renders the Call Center unit', (WidgetTester tester) async {
    // Avoid network font fetches during tests.
    GoogleFonts.config.allowRuntimeFetching = false;

    await tester.pumpWidget(const TadaffuqApp());
    await tester.pump(const Duration(milliseconds: 400));

    expect(find.text('وحدة الكول سنتر'), findsWidgets);
    expect(find.text('المهارات الأساسية'), findsOneWidget);
  });
}
