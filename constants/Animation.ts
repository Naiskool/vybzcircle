/**
 * VYBZ CIRCLE - Premium Animation & Motion System
 *
 * Creates satisfying, polished interactions through:
 * - Consistent timing and easing
 * - Purposeful motion that guides attention
 * - Delightful micro-interactions
 * - Reduced motion support for accessibility
 */

import { Easing } from 'react-native';

// ============================================
// TIMING - Duration in milliseconds
// ============================================

export const Duration = {
  // Instant - No perceivable delay
  instant: 0,

  // Fast - Quick feedback (100-200ms)
  fast: 150,
  faster: 100,
  fastest: 75,

  // Normal - Standard transitions (200-400ms)
  normal: 300,
  base: 250,

  // Slow - Emphasized transitions (400-600ms)
  slow: 500,
  slower: 600,
  slowest: 800,

  // Page transitions
  pageEnter: 400,
  pageExit: 300,

  // Component animations
  fadeIn: 200,
  fadeOut: 150,
  slideIn: 300,
  slideOut: 250,
  scaleIn: 200,
  scaleOut: 150,

  // Micro-interactions
  ripple: 400,
  tooltip: 200,
  toast: 300,

  // Loading states
  skeleton: 1200,
  spinner: 1000,
} as const;

// ============================================
// EASING FUNCTIONS - Motion curves
// ============================================

export const EasingFunctions = {
  // Standard easing
  linear: Easing.linear,
  ease: Easing.ease,
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),

  // Cubic bezier (most commonly used)
  cubic: Easing.bezier(0.4, 0.0, 0.2, 1),          // Material standard
  cubicIn: Easing.bezier(0.4, 0.0, 1, 1),          // Accelerate
  cubicOut: Easing.bezier(0.0, 0.0, 0.2, 1),       // Decelerate
  cubicInOut: Easing.bezier(0.4, 0.0, 0.2, 1),     // Smooth

  // Elastic (playful, bouncy)
  elastic: Easing.elastic(1),
  elasticIn: Easing.in(Easing.elastic(1)),
  elasticOut: Easing.out(Easing.elastic(1)),

  // Bounce (fun, energetic)
  bounce: Easing.bounce,
  bounceIn: Easing.in(Easing.bounce),
  bounceOut: Easing.out(Easing.bounce),

  // Back (slight overshoot, premium feel)
  back: Easing.back(1.5),
  backIn: Easing.in(Easing.back(1.5)),
  backOut: Easing.out(Easing.back(1.5)),

  // Expo (dramatic, attention-grabbing)
  expo: Easing.exp,
  expoIn: Easing.in(Easing.exp),
  expoOut: Easing.out(Easing.exp),

  // Quad (subtle, natural)
  quad: Easing.quad,
  quadIn: Easing.in(Easing.quad),
  quadOut: Easing.out(Easing.quad),
} as const;

// ============================================
// SPRING CONFIGURATIONS
// ============================================

export const Spring = {
  // Gentle springs (subtle movement)
  gentle: {
    damping: 20,
    stiffness: 150,
    mass: 1,
  },

  // Standard spring (default choice)
  standard: {
    damping: 15,
    stiffness: 200,
    mass: 1,
  },

  // Snappy spring (quick, responsive)
  snappy: {
    damping: 12,
    stiffness: 300,
    mass: 0.8,
  },

  // Bouncy spring (playful)
  bouncy: {
    damping: 8,
    stiffness: 250,
    mass: 1,
  },

  // Wobbly spring (fun, attention-grabbing)
  wobbly: {
    damping: 5,
    stiffness: 200,
    mass: 1,
  },

  // Stiff spring (minimal bounce)
  stiff: {
    damping: 25,
    stiffness: 400,
    mass: 1,
  },
} as const;

// ============================================
// ANIMATION PRESETS - Common patterns
// ============================================

export const AnimationPreset = {
  // Fade animations
  fadeIn: {
    duration: Duration.fadeIn,
    easing: EasingFunctions.easeOut,
    useNativeDriver: true,
  },

  fadeOut: {
    duration: Duration.fadeOut,
    easing: EasingFunctions.easeIn,
    useNativeDriver: true,
  },

  // Slide animations
  slideIn: {
    duration: Duration.slideIn,
    easing: EasingFunctions.cubicOut,
    useNativeDriver: true,
  },

  slideOut: {
    duration: Duration.slideOut,
    easing: EasingFunctions.cubicIn,
    useNativeDriver: true,
  },

  // Scale animations
  scaleIn: {
    duration: Duration.scaleIn,
    easing: EasingFunctions.backOut,
    useNativeDriver: true,
  },

  scaleOut: {
    duration: Duration.scaleOut,
    easing: EasingFunctions.backIn,
    useNativeDriver: true,
  },

  // Button press (satisfying feedback)
  buttonPress: {
    duration: Duration.faster,
    easing: EasingFunctions.cubicOut,
    useNativeDriver: true,
  },

  // Modal entrance (dramatic)
  modalEnter: {
    duration: Duration.pageEnter,
    easing: EasingFunctions.cubicOut,
    useNativeDriver: true,
  },

  modalExit: {
    duration: Duration.pageExit,
    easing: EasingFunctions.cubicIn,
    useNativeDriver: true,
  },

  // Toast notification
  toastEnter: {
    duration: Duration.toast,
    easing: EasingFunctions.backOut,
    useNativeDriver: true,
  },

  toastExit: {
    duration: Duration.toast,
    easing: EasingFunctions.cubicIn,
    useNativeDriver: true,
  },

  // Loading skeleton
  skeleton: {
    duration: Duration.skeleton,
    easing: EasingFunctions.easeInOut,
    useNativeDriver: true,
  },
} as const;

// ============================================
// GESTURE THRESHOLDS
// ============================================

export const Gesture = {
  // Swipe thresholds
  swipeVelocity: 500,         // Minimum velocity for swipe
  swipeDistance: 50,          // Minimum distance for swipe

  // Pan thresholds
  panActivationDistance: 10,  // Distance to activate pan
  panTerminationVelocity: 0.1,// Velocity to end pan

  // Long press
  longPressDuration: 500,     // Time to trigger long press

  // Double tap
  doubleTapDelay: 300,        // Max time between taps
} as const;

// ============================================
// SCROLL BEHAVIOR
// ============================================

export const Scroll = {
  // Deceleration rates
  decelerationRate: {
    normal: 0.998,    // Standard scroll
    fast: 0.99,       // Quick stop
  },

  // Snap behavior
  snapToInterval: 100,        // Snap points interval
  snapToAlignment: 'center',  // Snap alignment

  // Bounce
  bounces: true,
  bouncesZoom: false,

  // Momentum scroll
  momentumScrollDelay: 0,
  disableIntervalMomentum: false,
} as const;

// ============================================
// HAPTIC FEEDBACK PATTERNS
// ============================================

export const Haptic = {
  // Impact feedback
  impact: {
    light: 'light',
    medium: 'medium',
    heavy: 'heavy',
  },

  // Notification feedback
  notification: {
    success: 'success',
    warning: 'warning',
    error: 'error',
  },

  // Selection feedback
  selection: 'selection',
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create a timing animation config
 */
export const createTiming = (
  duration: number = Duration.normal,
  easing: any = EasingFunctions.cubic
) => ({
  duration,
  easing,
  useNativeDriver: true,
});

/**
 * Create a spring animation config
 */
export const createSpring = (
  config: keyof typeof Spring = 'standard'
) => ({
  ...Spring[config],
  useNativeDriver: true,
});

/**
 * Stagger animation delay
 */
export const createStagger = (
  index: number,
  baseDelay: number = 50
): number => {
  return index * baseDelay;
};

/**
 * Sequential animation with delays
 */
export const createSequence = (
  animations: any[],
  staggerDelay: number = 100
) => {
  return animations.map((anim, index) => ({
    ...anim,
    delay: index * staggerDelay,
  }));
};

// ============================================
// LAYOUT ANIMATION PRESETS
// ============================================

/**
 * For use with LayoutAnimation.configureNext()
 */
export const LayoutAnimationPreset = {
  spring: {
    duration: Duration.normal,
    create: {
      type: 'spring',
      property: 'opacity',
      springDamping: 0.7,
    },
    update: {
      type: 'spring',
      springDamping: 0.7,
    },
    delete: {
      type: 'spring',
      property: 'opacity',
      springDamping: 0.7,
    },
  },

  easeInOut: {
    duration: Duration.normal,
    create: {
      type: 'easeInEaseOut',
      property: 'opacity',
    },
    update: {
      type: 'easeInEaseOut',
    },
    delete: {
      type: 'easeInEaseOut',
      property: 'opacity',
    },
  },

  linear: {
    duration: Duration.fast,
    create: {
      type: 'linear',
      property: 'opacity',
    },
    update: {
      type: 'linear',
    },
    delete: {
      type: 'linear',
      property: 'opacity',
    },
  },
};

// ============================================
// PSYCHOLOGY & UX NOTES
// ============================================
/**
 * ANIMATION PSYCHOLOGY:
 *
 * 1. DURATION SWEET SPOT
 *    - < 100ms: Feels instant, no animation perceived
 *    - 100-300ms: Ideal for most UI transitions
 *    - 300-500ms: Good for page transitions
 *    - > 500ms: Feels slow, creates impatience
 *
 * 2. EASING = PERSONALITY
 *    - Linear: Robotic, unnatural (avoid for UI)
 *    - Ease-out: Natural, deceleration (most common)
 *    - Ease-in: Acceleration, attention (use sparingly)
 *    - Bounce/Elastic: Playful, fun (brand personality)
 *    - Back (overshoot): Premium, polished feel
 *
 * 3. MOTION GUIDES ATTENTION
 *    - Movement draws eye naturally
 *    - Directional slides indicate relationships
 *    - Scaling suggests importance changes
 *    - Fading suggests appearance/disappearance
 *
 * 4. CONSISTENCY = QUALITY
 *    - Same elements should always animate the same way
 *    - Similar actions should use similar animations
 *    - Inconsistent motion feels buggy
 *
 * 5. HAPTIC FEEDBACK
 *    - Combines with animation for tactile feel
 *    - Success haptic + animation = strong confirmation
 *    - Error haptic + shake = clear rejection
 *    - Light haptic on scroll end = physical boundary
 *
 * 6. PERFORMANCE
 *    - Always use useNativeDriver: true when possible
 *    - Animate opacity and transform (GPU accelerated)
 *    - Avoid animating layout properties
 *    - Stagger list animations to prevent jank
 *
 * 7. ACCESSIBILITY
 *    - Respect prefers-reduced-motion
 *    - Provide instant alternatives for long animations
 *    - Never rely solely on animation to convey information
 */
