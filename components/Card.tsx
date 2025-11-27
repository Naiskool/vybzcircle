/**
 * VYBZ CIRCLE - Premium Card Component
 *
 * Versatile container with elevation, variants, and interactive states
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing, Shadows, Layout } from '@/constants';
import * as Haptics from 'expo-haptics';

// ============================================
// TYPES
// ============================================

type CardVariant = 'elevated' | 'outlined' | 'filled' | 'glass';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  hapticFeedback?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  interactive = false,
  onPress,
  style,
  hapticFeedback = true,
}) => {
  const variantStyles = getVariantStyles(variant);
  const paddingStyle = getPaddingStyles(padding);

  const handlePress = () => {
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.();
  };

  const content = (
    <View style={[styles.base, variantStyles, paddingStyle, style]}>
      {children}
    </View>
  );

  if (interactive || onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={styles.touchable}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  base: {
    borderRadius: Layout.radius['2xl'],
    overflow: 'hidden',
  },
  touchable: {
    borderRadius: Layout.radius['2xl'],
  },
});

// ============================================
// VARIANT STYLES
// ============================================

const getVariantStyles = (variant: CardVariant): ViewStyle => {
  const variants = {
    elevated: {
      backgroundColor: Colors.ui.background.secondary,
      ...Shadows.lg,
    },

    outlined: {
      backgroundColor: Colors.ui.background.secondary,
      borderWidth: Layout.borderWidth.thin,
      borderColor: Colors.ui.border.default,
    },

    filled: {
      backgroundColor: Colors.neutral[25],
    },

    glass: {
      backgroundColor: Colors.ui.background.blur,
      borderWidth: Layout.borderWidth.hairline,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      ...Shadows.md,
    },
  };

  return variants[variant];
};

// ============================================
// PADDING STYLES
// ============================================

const getPaddingStyles = (padding: CardPadding): ViewStyle => {
  const paddings = {
    none: { padding: 0 },
    sm: { padding: Spacing[3] },
    md: { padding: Spacing[5] },
    lg: { padding: Spacing[6] },
    xl: { padding: Spacing[8] },
  };

  return paddings[padding];
};

export default Card;
