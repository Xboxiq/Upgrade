/// Arabic-Indic numeral helpers. The UI renders ٠١٢٣ rather than 0123 to stay
/// native to the Arabic reading experience.
abstract class Arabic {
  static const List<String> _digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  /// Convert any latin-digit string/number into Arabic-Indic digits.
  static String n(Object value) {
    final String s = value.toString();
    final StringBuffer out = StringBuffer();
    for (final int code in s.runes) {
      if (code >= 0x30 && code <= 0x39) {
        out.write(_digits[code - 0x30]);
      } else {
        out.writeCharCode(code);
      }
    }
    return out.toString();
  }

  /// Percentage with the Arabic percent sign (٪).
  static String pct(num value) => '${n(value.round())}٪';
}
