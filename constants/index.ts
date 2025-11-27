/**
 * VYBZ CIRCLE - Design System Export
 *
 * Central export for all design system constants
 */

export { Colors, getOpacityColor, getRGBA } from './Colors';
export { Typography, FontSize, FontWeight, LineHeight, LetterSpacing, getTextStyle } from './Typography';
export { Spacing, Layout, Gap, Inset, Stack, Grid, ZIndex, getResponsivePadding, createInset, createStack } from './Spacing';
export { Shadows, Elevation, BorderGlow, getInteractiveShadow, createColoredGlow } from './Shadows';
export { Duration, EasingFunctions, Spring, AnimationPreset, Gesture, Scroll, Haptic, createTiming, createSpring, createStagger, LayoutAnimationPreset } from './Animation';

// Re-export everything as a theme object
export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  layout: Layout,
  shadows: Shadows,
  animation: AnimationPreset,
} as const;
