/**
 * VYBZ CIRCLE - Premium Typography System
 *
 * Designed for:
 * - Clear visual hierarchy
 * - Optimal readability on mobile
 * - Emotional impact through scale and weight
 * - Consistent spacing and rhythm
 */

import { TextStyle } from 'react-native';
import { Colors } from './Colors';

// ============================================
// FONT FAMILY
// ============================================
export const FontFamily = {
  // iOS default (SF Pro)
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
  black: 'System',

  // Alternative: Inter, SF Pro, or custom fonts
  // After adding custom fonts via expo-font:
  // regular: 'Inter-Regular',
  // medium: 'Inter-Medium',
  // semibold: 'Inter-SemiBold',
  // bold: 'Inter-Bold',
  // black: 'Inter-Black',
} as const;

// ============================================
// FONT WEIGHTS
// ============================================
export const FontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
  black: '900' as TextStyle['fontWeight'],
} as const;

// ============================================
// FONT SIZES - Modular Scale (1.25 ratio)
// ============================================
export const FontSize = {
  xs: 11,      // Fine print, micro labels
  sm: 13,      // Captions, small labels
  base: 15,    // Body text, default size
  md: 16,      // Emphasized body text
  lg: 18,      // Subheadings, large body
  xl: 20,      // Small headings
  '2xl': 24,   // Medium headings
  '3xl': 28,   // Large headings
  '4xl': 32,   // Extra large headings
  '5xl': 36,   // Hero text
  '6xl': 42,   // Display text
  '7xl': 56,   // Large display
  '8xl': 64,   // Splash/Hero
} as const;

// ============================================
// LINE HEIGHTS - Optimal Reading Rhythm
// ============================================
export const LineHeight = {
  tight: 1.2,    // Headings, compact text
  snug: 1.35,    // Subheadings
  normal: 1.5,   // Body text (optimal readability)
  relaxed: 1.625,// Comfortable reading
  loose: 1.75,   // Spacious, editorial
} as const;

// ============================================
// LETTER SPACING - Fine-tuned Kerning
// ============================================
export const LetterSpacing = {
  tighter: -2,   // Large display text
  tight: -1,     // Headings
  normal: 0,     // Body text
  wide: 0.3,     // Small caps, labels
  wider: 0.5,    // Buttons, badges
  widest: 1,     // All caps headings
  super: 4,      // Brand name, logo text
} as const;

// ============================================
// TEXT STYLES - Complete Typography System
// ============================================

// Display Styles - Hero sections, splash screens
export const Display = {
  large: {
    fontSize: FontSize['8xl'],
    fontWeight: FontWeight.black,
    lineHeight: FontSize['8xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tighter,
    color: Colors.ui.text.primary,
  } as TextStyle,

  medium: {
    fontSize: FontSize['7xl'],
    fontWeight: FontWeight.extrabold,
    lineHeight: FontSize['7xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tighter,
    color: Colors.ui.text.primary,
  } as TextStyle,

  small: {
    fontSize: FontSize['6xl'],
    fontWeight: FontWeight.extrabold,
    lineHeight: FontSize['6xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
    color: Colors.ui.text.primary,
  } as TextStyle,
};

// Heading Styles - Section headers, page titles
export const Heading = {
  h1: {
    fontSize: FontSize['5xl'],
    fontWeight: FontWeight.extrabold,
    lineHeight: FontSize['5xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
    color: Colors.ui.text.primary,
  } as TextStyle,

  h2: {
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.extrabold,
    lineHeight: FontSize['4xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
    color: Colors.ui.text.primary,
  } as TextStyle,

  h3: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extrabold,
    lineHeight: FontSize['3xl'] * LineHeight.snug,
    letterSpacing: LetterSpacing.tight,
    color: Colors.ui.text.primary,
  } as TextStyle,

  h4: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['2xl'] * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.primary,
  } as TextStyle,

  h5: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    lineHeight: FontSize.xl * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.primary,
  } as TextStyle,

  h6: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    lineHeight: FontSize.lg * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.primary,
  } as TextStyle,
};

// Body Text Styles - Main content
export const Body = {
  large: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.lg * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.secondary,
  } as TextStyle,

  medium: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.secondary,
  } as TextStyle,

  base: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.base * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.secondary,
  } as TextStyle,

  small: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.secondary,
  } as TextStyle,
};

// Label Styles - Form labels, captions
export const Label = {
  large: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.md * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
    color: Colors.ui.text.primary,
  } as TextStyle,

  medium: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.base * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
    color: Colors.ui.text.primary,
  } as TextStyle,

  small: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.sm * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
    color: Colors.ui.text.primary,
  } as TextStyle,

  tiny: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.xs * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
    color: Colors.ui.text.tertiary,
  } as TextStyle,
};

// Caption Styles - Supporting text, metadata
export const Caption = {
  large: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.base * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.tertiary,
  } as TextStyle,

  medium: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.tertiary,
  } as TextStyle,

  small: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.xs * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    color: Colors.ui.text.tertiary,
  } as TextStyle,
};

// Button Text Styles
export const ButtonText = {
  large: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.wider,
    color: Colors.ui.text.primary,
  } as TextStyle,

  medium: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.wider,
    color: Colors.ui.text.primary,
  } as TextStyle,

  small: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.wider,
    color: Colors.ui.text.primary,
  } as TextStyle,

  tiny: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.wide,
    color: Colors.ui.text.primary,
  } as TextStyle,
};

// ============================================
// COMPLETE TYPOGRAPHY EXPORT
// ============================================
export const Typography = {
  Display,
  Heading,
  Body,
  Label,
  Caption,
  ButtonText,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  FontFamily,
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================
export const getTextStyle = (
  variant: keyof typeof Typography,
  size: string
): TextStyle => {
  const variantStyles = Typography[variant] as any;
  return variantStyles[size] || variantStyles.medium || {};
};

// ============================================
// PSYCHOLOGY & UX NOTES
// ============================================
/**
 * TYPOGRAPHY PSYCHOLOGY:
 *
 * 1. FONT WEIGHT HIERARCHY
 *    - Heavy weights (800-900) for headings = Authority and importance
 *    - Medium weights (500-600) for labels = Clarity without fatigue
 *    - Regular weight (400) for body = Easy reading, low cognitive load
 *
 * 2. LETTER SPACING
 *    - Tight spacing on large text = Modern, premium feel
 *    - Wide spacing on buttons/labels = Easier tapping, clear CTAs
 *    - Normal spacing on body = Optimal reading speed
 *
 * 3. LINE HEIGHT
 *    - 1.5x for body text = Proven optimal readability
 *    - 1.2x for headings = Compact, impactful
 *    - 1.625x for long form = Comfortable extended reading
 *
 * 4. SIZE SCALE (1.25 ratio)
 *    - Creates harmonious, predictable rhythm
 *    - Each step feels intentionally different
 *    - Prevents arbitrary sizing decisions
 *
 * 5. COLOR CONTRAST
 *    - White on dark = 15.8:1 ratio (exceeds WCAG AAA)
 *    - Reduces eye strain in low light
 *    - Creates premium, focused experience
 */
