/**
 * VYBZ CIRCLE - Premium Button Component
 *
 * Versatile button with multiple variants, sizes, and states
 * Includes haptic feedback and smooth animations
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Shadows, Typography, Layout } from '@/constants';

// ============================================
// TYPES
// ============================================

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  // Content
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Appearance
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;

  // State
  loading?: boolean;
  disabled?: boolean;

  // Interaction
  onPress?: () => void;
  onLongPress?: () => void;
  hapticFeedback?: boolean;

  // Styling
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// ============================================
// COMPONENT
// ============================================

export const Button: React.FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onPress,
  onLongPress,
  hapticFeedback = true,
  style,
  textStyle,
}) => {
  // Handle press with haptic feedback
  const handlePress = () => {
    if (disabled || loading) return;

    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    onPress?.();
  };

  const handleLongPress = () => {
    if (disabled || loading) return;

    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    onLongPress?.();
  };

  // Get variant styles
  const variantStyles = getVariantStyles(variant, disabled);
  const sizeStyles = getSizeStyles(size);

  // Determine if using gradient
  const useGradient = variant === 'primary' && !disabled;

  // Button content
  const buttonContent = (
    <View style={[styles.content, sizeStyles.content]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles.loaderColor}
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[sizeStyles.text, variantStyles.text, textStyle]}>
            {children}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      onLongPress={handleLongPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        sizeStyles.container,
        variantStyles.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}>
      {useGradient ? (
        <LinearGradient
          colors={Colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}>
          {buttonContent}
        </LinearGradient>
      ) : (
        buttonContent
      )}
    </TouchableOpacity>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  base: {
    borderRadius: Layout.radius.lg,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: Spacing[2],
  },
  rightIcon: {
    marginLeft: Spacing[2],
  },
});

// ============================================
// VARIANT STYLES
// ============================================

const getVariantStyles = (variant: ButtonVariant, disabled: boolean) => {
  const variants = {
    primary: {
      container: {
        backgroundColor: disabled ? Colors.neutral[50] : 'transparent',
        ...(!disabled && Shadows.glowPrimary),
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.medium,
        color: Colors.ui.text.primary,
      } as TextStyle,
      loaderColor: Colors.ui.text.primary,
    },

    secondary: {
      container: {
        backgroundColor: Colors.secondary[400],
        ...Shadows.md,
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.medium,
        color: Colors.ui.text.primary,
      } as TextStyle,
      loaderColor: Colors.ui.text.primary,
    },

    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: Layout.borderWidth.medium,
        borderColor: Colors.primary[400],
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.medium,
        color: Colors.primary[400],
      } as TextStyle,
      loaderColor: Colors.primary[400],
    },

    ghost: {
      container: {
        backgroundColor: Colors.semantic.errorBg,
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.medium,
        color: Colors.primary[400],
      } as TextStyle,
      loaderColor: Colors.primary[400],
    },

    danger: {
      container: {
        backgroundColor: Colors.semantic.error,
        ...Shadows.md,
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.medium,
        color: Colors.ui.text.primary,
      } as TextStyle,
      loaderColor: Colors.ui.text.primary,
    },
  };

  return variants[variant];
};

// ============================================
// SIZE STYLES
// ============================================

const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    sm: {
      container: {
        height: Layout.sizes.buttonSm,
        paddingHorizontal: Spacing[4],
      } as ViewStyle,
      content: {
        gap: Spacing[1],
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.tiny,
      } as TextStyle,
    },

    md: {
      container: {
        height: Layout.sizes.buttonMd,
        paddingHorizontal: Spacing[5],
      } as ViewStyle,
      content: {
        gap: Spacing[2],
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.small,
      } as TextStyle,
    },

    lg: {
      container: {
        height: Layout.sizes.buttonLg,
        paddingHorizontal: Spacing[6],
      } as ViewStyle,
      content: {
        gap: Spacing[2],
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.medium,
      } as TextStyle,
    },

    xl: {
      container: {
        height: Layout.sizes.buttonXl,
        paddingHorizontal: Spacing[8],
      } as ViewStyle,
      content: {
        gap: Spacing[3],
      } as ViewStyle,
      text: {
        ...Typography.ButtonText.large,
      } as TextStyle,
    },
  };

  return sizes[size];
};

export default Button;
