/**
 * VYBZ CIRCLE - Premium Spacing System
 *
 * Based on 4px grid system for:
 * - Visual consistency across all screens
 * - Predictable, harmonious layouts
 * - Easy mental model (multiply by 4)
 * - Reduced decision fatigue
 */

// ============================================
// SPACING SCALE (4px base unit)
// ============================================
export const Spacing = {
  0: 0,       // None
  1: 4,       // 0.25rem - Micro spacing
  2: 8,       // 0.5rem - Tight spacing
  3: 12,      // 0.75rem - Compact spacing
  4: 16,      // 1rem - Default spacing
  5: 20,      // 1.25rem - Comfortable spacing
  6: 24,      // 1.5rem - Medium spacing
  7: 28,      // 1.75rem - Medium-large spacing
  8: 32,      // 2rem - Large spacing
  10: 40,     // 2.5rem - Extra large spacing
  12: 48,     // 3rem - Section spacing
  16: 64,     // 4rem - Hero spacing
  20: 80,     // 5rem - Major section spacing
  24: 96,     // 6rem - Screen padding
  32: 128,    // 8rem - Extra large spacing
} as const;

// ============================================
// LAYOUT CONSTANTS
// ============================================
export const Layout = {
  // Screen padding - Horizontal margins
  screenPadding: {
    xs: Spacing[4],   // 16px - Compact screens
    sm: Spacing[5],   // 20px - Default mobile
    md: Spacing[6],   // 24px - Comfortable
    lg: Spacing[8],   // 32px - Tablets
    xl: Spacing[10],  // 40px - Large screens
  },

  // Container widths
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },

  // Common component sizes
  sizes: {
    // Touch targets (minimum 44x44 for accessibility)
    touchTarget: 44,
    touchTargetLarge: 56,

    // Icons
    iconXs: 16,
    iconSm: 20,
    iconMd: 24,
    iconLg: 32,
    iconXl: 40,
    icon2xl: 48,
    icon3xl: 64,

    // Avatars
    avatarXs: 24,
    avatarSm: 32,
    avatarMd: 40,
    avatarLg: 48,
    avatarXl: 64,
    avatar2xl: 80,
    avatar3xl: 100,
    avatar4xl: 120,

    // Buttons
    buttonSm: 36,
    buttonMd: 44,
    buttonLg: 52,
    buttonXl: 60,

    // Input heights
    inputSm: 40,
    inputMd: 48,
    inputLg: 56,
    inputXl: 64,

    // Tab bar
    tabBarHeight: 85,
    tabBarHeightCompact: 65,

    // Bottom sheet heights
    bottomSheetMin: 200,
    bottomSheetMid: 400,
    bottomSheetMax: 600,
  },

  // Border radius - Consistent rounding
  radius: {
    none: 0,
    xs: 4,       // Subtle rounding
    sm: 8,       // Small components
    md: 12,      // Default rounding
    lg: 16,      // Cards, buttons
    xl: 20,      // Large cards
    '2xl': 24,   // Hero cards
    '3xl': 32,   // Modal corners
    full: 9999,  // Pills, circular
  },

  // Border widths
  borderWidth: {
    hairline: 0.5,
    thin: 1,
    medium: 2,
    thick: 3,
    heavy: 4,
  },

  // Aspect ratios
  aspectRatio: {
    square: 1,
    video: 16 / 9,
    photo: 4 / 3,
    portrait: 3 / 4,
    wide: 21 / 9,
    card: 3 / 2,
  },
} as const;

// ============================================
// GAP SYSTEM - For Flexbox/Grid
// ============================================
export const Gap = {
  xs: Spacing[2],   // 8px
  sm: Spacing[3],   // 12px
  md: Spacing[4],   // 16px
  lg: Spacing[6],   // 24px
  xl: Spacing[8],   // 32px
  '2xl': Spacing[10], // 40px
} as const;

// ============================================
// INSET PATTERNS - Common padding combos
// ============================================
export const Inset = {
  // Symmetric padding
  xs: Spacing[2],    // 8px all sides
  sm: Spacing[3],    // 12px all sides
  md: Spacing[4],    // 16px all sides
  lg: Spacing[6],    // 24px all sides
  xl: Spacing[8],    // 32px all sides

  // Asymmetric patterns (use in style objects)
  squish: {
    vertical: Spacing[2],     // 8px top/bottom
    horizontal: Spacing[4],   // 16px left/right
  },
  stretch: {
    vertical: Spacing[4],     // 16px top/bottom
    horizontal: Spacing[2],   // 8px left/right
  },
} as const;

// ============================================
// STACK SPACING - Vertical rhythm
// ============================================
export const Stack = {
  xs: Spacing[2],    // 8px - Tight vertical spacing
  sm: Spacing[3],    // 12px - Compact vertical spacing
  md: Spacing[4],    // 16px - Default vertical spacing
  lg: Spacing[6],    // 24px - Comfortable vertical spacing
  xl: Spacing[8],    // 32px - Section vertical spacing
  '2xl': Spacing[12], // 48px - Major section spacing
} as const;

// ============================================
// GRID SYSTEM
// ============================================
export const Grid = {
  columns: 12,
  gutter: Spacing[4],  // 16px between columns
  margin: Spacing[5],  // 20px screen margin
} as const;

// ============================================
// Z-INDEX LAYERS - Stacking context
// ============================================
export const ZIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  toast: 700,
  tooltip: 800,
  maximum: 999,
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get responsive padding based on screen width
 */
export const getResponsivePadding = (screenWidth: number): number => {
  if (screenWidth < 375) return Layout.screenPadding.xs;
  if (screenWidth < 768) return Layout.screenPadding.sm;
  if (screenWidth < 1024) return Layout.screenPadding.md;
  return Layout.screenPadding.lg;
};

/**
 * Create consistent inset padding
 */
export const createInset = (
  size: keyof typeof Inset
): { padding: number } | { paddingVertical: number; paddingHorizontal: number } => {
  const value = Inset[size];
  if (typeof value === 'number') {
    return { padding: value };
  }
  return {
    paddingVertical: value.vertical,
    paddingHorizontal: value.horizontal,
  };
};

/**
 * Create vertical stack spacing
 */
export const createStack = (size: keyof typeof Stack) => ({
  gap: Stack[size],
});

// ============================================
// PSYCHOLOGY & UX NOTES
// ============================================
/**
 * SPACING PSYCHOLOGY:
 *
 * 1. 4PX GRID SYSTEM
 *    - Creates subconscious visual harmony
 *    - Aligns with pixel densities (@2x, @3x)
 *    - Reduces arbitrary spacing decisions
 *    - Makes designs feel "right" even if user can't explain why
 *
 * 2. GENEROUS PADDING (20-32px)
 *    - Creates premium, uncluttered feel
 *    - Reduces cognitive load
 *    - Easier to parse information
 *    - Feels more expensive than tight layouts
 *
 * 3. CONSISTENT TOUCH TARGETS (44-56px)
 *    - Reduces errors and frustration
 *    - Feels more forgiving and friendly
 *    - Critical for one-handed use
 *    - Increases perceived app quality
 *
 * 4. BORDER RADIUS (12-24px)
 *    - Rounded corners feel friendlier, more approachable
 *    - Sharp corners feel more serious/corporate
 *    - Larger radius = more playful/modern
 *    - Creates visual flow and guides eye movement
 *
 * 5. WHITE SPACE
 *    - More space = more premium feel
 *    - Helps create visual hierarchy
 *    - Reduces overwhelm
 *    - Focuses attention on what matters
 */
