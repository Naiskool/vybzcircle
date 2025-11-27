/**
 * VYBZ CIRCLE - Premium Badge Component
 *
 * Small labels for status, counts, categories
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, Typography, Layout } from '@/constants';

// ============================================
// TYPES
// ============================================

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  style?: ViewStyle;
}

// ============================================
// COMPONENT
// ============================================

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  style,
}) => {
  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);

  if (dot) {
    return (
      <View style={[styles.dot, variantStyles.background, sizeStyles.dot, style]} />
    );
  }

  return (
    <View style={[styles.container, variantStyles.background, sizeStyles.container, style]}>
      <Text style={[styles.text, variantStyles.text, sizeStyles.text]}>{children}</Text>
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: Layout.radius.full,
    paddingHorizontal: Spacing[2],
    paddingVertical: Spacing[1],
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Typography.Label.tiny,
    fontWeight: '700',
  },
  dot: {
    borderRadius: Layout.radius.full,
  },
});

// ============================================
// VARIANT STYLES
// ============================================

const getVariantStyles = (variant: BadgeVariant) => {
  const variants = {
    primary: {
      background: { backgroundColor: Colors.semantic.errorBg },
      text: { color: Colors.primary[400] },
    },

    secondary: {
      background: { backgroundColor: 'rgba(255, 179, 71, 0.15)' },
      text: { color: Colors.secondary[400] },
    },

    success: {
      background: { backgroundColor: Colors.semantic.successBg },
      text: { color: Colors.semantic.success },
    },

    warning: {
      background: { backgroundColor: Colors.semantic.warningBg },
      text: { color: Colors.semantic.warning },
    },

    error: {
      background: { backgroundColor: Colors.semantic.errorBg },
      text: { color: Colors.semantic.error },
    },

    info: {
      background: { backgroundColor: Colors.semantic.infoBg },
      text: { color: Colors.semantic.info },
    },

    neutral: {
      background: { backgroundColor: Colors.neutral[30] },
      text: { color: Colors.ui.text.secondary },
    },
  };

  return variants[variant];
};

// ============================================
// SIZE STYLES
// ============================================

const getSizeStyles = (size: BadgeSize) => {
  const sizes = {
    sm: {
      container: {
        paddingHorizontal: Spacing[2],
        paddingVertical: 2,
      },
      text: {
        fontSize: 10,
        letterSpacing: 0.3,
      },
      dot: {
        width: 6,
        height: 6,
      },
    },

    md: {
      container: {
        paddingHorizontal: Spacing[2],
        paddingVertical: Spacing[1],
      },
      text: {
        fontSize: 11,
        letterSpacing: 0.3,
      },
      dot: {
        width: 8,
        height: 8,
      },
    },

    lg: {
      container: {
        paddingHorizontal: Spacing[3],
        paddingVertical: Spacing[1],
      },
      text: {
        fontSize: 12,
        letterSpacing: 0.4,
      },
      dot: {
        width: 10,
        height: 10,
      },
    },
  };

  return sizes[size];
};

export default Badge;
