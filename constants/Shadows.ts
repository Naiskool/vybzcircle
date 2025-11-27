/**
 * VYBZ CIRCLE - Premium Shadow & Elevation System
 *
 * Creates depth and hierarchy through:
 * - Subtle elevation for interactive elements
 * - Dramatic shadows for important CTAs
 * - Glowing effects for brand elements
 * - Consistent depth perception
 */

import { ViewStyle } from 'react-native';
import { Colors } from './Colors';

// ============================================
// ELEVATION LEVELS
// ============================================

/**
 * Shadow system based on Material Design elevation
 * Adapted for dark theme with colored glows
 */
export const Shadows = {
  // No shadow - Flat on surface
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,

  // Level 1 - Subtle depth (cards at rest)
  sm: {
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,

  // Level 2 - Raised elements (buttons, inputs)
  md: {
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  } as ViewStyle,

  // Level 3 - Floating elements (FAB, active cards)
  lg: {
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  } as ViewStyle,

  // Level 4 - Prominent elements (modals, sheets)
  xl: {
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  } as ViewStyle,

  // Level 5 - Maximum elevation (overlays, popovers)
  '2xl': {
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 16,
  } as ViewStyle,

  // ============================================
  // COLORED GLOWS - Brand personality
  // ============================================

  // Primary glow - Red/brand color
  glowPrimary: {
    shadowColor: Colors.primary[400],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,

  glowPrimaryStrong: {
    shadowColor: Colors.primary[400],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  } as ViewStyle,

  // Success glow - Green
  glowSuccess: {
    shadowColor: Colors.semantic.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,

  // Warning glow - Orange/Amber
  glowWarning: {
    shadowColor: Colors.semantic.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,

  // Gold glow - Premium features
  glowGold: {
    shadowColor: Colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  } as ViewStyle,

  // Purple glow - Exclusive features
  glowPurple: {
    shadowColor: Colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,

  // ============================================
  // INNER SHADOWS (using borderWidth hack for RN)
  // ============================================

  // Note: React Native doesn't support inset shadows
  // Use these as border alternatives for inner glow effect
  innerGlow: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  } as ViewStyle,

  innerGlowStrong: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  } as ViewStyle,
} as const;

// ============================================
// DEPTH LAYERS - Semantic elevation
// ============================================

export const Elevation = {
  // Surface levels
  surface: Shadows.none,          // Base surface, no elevation
  raised: Shadows.sm,             // Slightly above surface
  floating: Shadows.md,           // Clear separation from surface
  overlay: Shadows.lg,            // Above main content
  modal: Shadows.xl,              // Distinct layer
  popover: Shadows['2xl'],        // Highest standard layer

  // Interactive states
  button: {
    rest: Shadows.md,
    hover: Shadows.lg,
    active: Shadows.sm,
  },

  card: {
    rest: Shadows.sm,
    hover: Shadows.md,
    active: Shadows.lg,
  },

  // Special effects
  cta: Shadows.glowPrimaryStrong,  // Primary call-to-action
  premium: Shadows.glowGold,        // Premium/paid features
  achievement: Shadows.glowPurple,  // Achievements/rewards
} as const;

// ============================================
// BORDER GLOW EFFECTS
// ============================================

/**
 * Creates a glowing border effect
 * Use with borderWidth and borderColor
 */
export const BorderGlow = {
  primary: {
    borderWidth: 2,
    borderColor: Colors.primary[400],
    ...Shadows.glowPrimary,
  } as ViewStyle,

  success: {
    borderWidth: 2,
    borderColor: Colors.semantic.success,
    ...Shadows.glowSuccess,
  } as ViewStyle,

  warning: {
    borderWidth: 2,
    borderColor: Colors.semantic.warning,
    ...Shadows.glowWarning,
  } as ViewStyle,

  gold: {
    borderWidth: 2,
    borderColor: Colors.accent.gold,
    ...Shadows.glowGold,
  } as ViewStyle,

  purple: {
    borderWidth: 2,
    borderColor: Colors.accent.purple,
    ...Shadows.glowPurple,
  } as ViewStyle,
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get shadow for interactive element based on state
 */
export const getInteractiveShadow = (
  type: 'button' | 'card',
  state: 'rest' | 'hover' | 'active' = 'rest'
): ViewStyle => {
  return Elevation[type][state];
};

/**
 * Create custom colored glow
 */
export const createColoredGlow = (
  color: string,
  intensity: 'subtle' | 'medium' | 'strong' = 'medium'
): ViewStyle => {
  const config = {
    subtle: { opacity: 0.3, radius: 8, offset: 2, elevation: 4 },
    medium: { opacity: 0.4, radius: 12, offset: 4, elevation: 6 },
    strong: { opacity: 0.5, radius: 20, offset: 8, elevation: 10 },
  };

  const { opacity, radius, offset, elevation } = config[intensity];

  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: offset },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  };
};

/**
 * Combine multiple shadow styles
 * Note: React Native only supports one shadow, this returns the strongest
 */
export const combineShadows = (...shadows: ViewStyle[]): ViewStyle => {
  // In React Native, only one shadow is supported
  // Return the one with highest elevation
  return shadows.reduce((acc, shadow) => {
    const currentElevation = (shadow.elevation as number) || 0;
    const accElevation = (acc.elevation as number) || 0;
    return currentElevation > accElevation ? shadow : acc;
  }, shadows[0]);
};

// ============================================
// PSYCHOLOGY & UX NOTES
// ============================================
/**
 * SHADOW PSYCHOLOGY:
 *
 * 1. ELEVATION CREATES HIERARCHY
 *    - Higher elevation = more important
 *    - Users naturally focus on elevated elements
 *    - Creates clear visual layers
 *
 * 2. COLORED GLOWS = EMOTIONAL SIGNALS
 *    - Red glow: Excitement, urgency, action
 *    - Gold glow: Premium, exclusive, valuable
 *    - Green glow: Success, confirmation, safe
 *    - Purple glow: Special, rare, achievement
 *
 * 3. SUBTLE VS DRAMATIC
 *    - Subtle shadows (2-4px): Professional, clean
 *    - Medium shadows (8-12px): Floating, interactive
 *    - Strong shadows (16-24px): Dramatic, important
 *
 * 4. DARK THEME CONSIDERATIONS
 *    - Shadows less visible on dark backgrounds
 *    - Colored glows more effective than black shadows
 *    - Border glows enhance depth perception
 *
 * 5. INTERACTIVE FEEDBACK
 *    - Shadow changes on press = tactile feeling
 *    - Reduced shadow on press = "pushed down"
 *    - Increased shadow on hover = "lifted up"
 *    - Creates satisfying interaction feel
 */
