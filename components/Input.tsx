/**
 * VYBZ CIRCLE - Premium Input Component
 *
 * Text input with multiple states, variants, and validation
 * Includes labels, errors, icons, and character count
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Animated,
} from 'react-native';
import { Colors, Spacing, Typography, Layout } from '@/constants';

// ============================================
// TYPES
// ============================================

type InputVariant = 'default' | 'filled' | 'outline';
type InputSize = 'sm' | 'md' | 'lg';

interface InputComponentProps extends TextInputProps {
  // Labels & Helper Text
  label?: string;
  helperText?: string;
  errorText?: string;

  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Appearance
  variant?: InputVariant;
  size?: InputSize;

  // State
  error?: boolean;
  disabled?: boolean;
  required?: boolean;

  // Features
  showCharacterCount?: boolean;
  maxLength?: number;

  // Styling
  containerStyle?: ViewStyle;
}

// ============================================
// COMPONENT
// ============================================

export const Input: React.FC<InputComponentProps> = ({
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  error = false,
  disabled = false,
  required = false,
  showCharacterCount = false,
  maxLength,
  containerStyle,
  value,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedBorder] = useState(new Animated.Value(0));

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(animatedBorder, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    Animated.timing(animatedBorder, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onBlur?.(e);
  };

  const borderColor = animatedBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.ui.border.default, Colors.primary[400]],
  });

  const variantStyles = getVariantStyles(variant, error, disabled);
  const sizeStyles = getSizeStyles(size);

  const showError = error && errorText;
  const showHelper = !showError && helperText;
  const currentLength = value?.toString().length || 0;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      {/* Input Container */}
      <Animated.View
        style={[
          styles.inputContainer,
          sizeStyles.container,
          variantStyles.container,
          isFocused && styles.focused,
          error && styles.error,
          disabled && styles.disabled,
          { borderColor: isFocused ? borderColor : variantStyles.container.borderColor },
        ]}>
        {/* Left Icon */}
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        {/* Text Input */}
        <TextInput
          {...textInputProps}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          maxLength={maxLength}
          style={[
            styles.input,
            sizeStyles.input,
            variantStyles.text,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
          ]}
          placeholderTextColor={Colors.ui.text.disabled}
        />

        {/* Right Icon */}
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </Animated.View>

      {/* Helper/Error Text & Character Count */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          {showError && (
            <Text style={[styles.helperText, styles.errorText]}>{errorText}</Text>
          )}
          {showHelper && <Text style={styles.helperText}>{helperText}</Text>}
        </View>

        {showCharacterCount && maxLength && (
          <Text style={styles.characterCount}>
            {currentLength}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    marginBottom: Spacing[2],
  },
  label: {
    ...Typography.Label.small,
    color: Colors.ui.text.primary,
  },
  required: {
    color: Colors.semantic.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.lg,
    borderWidth: Layout.borderWidth.medium,
    backgroundColor: Colors.ui.background.secondary,
  },
  focused: {
    borderColor: Colors.primary[400],
  },
  error: {
    borderColor: Colors.semantic.error,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: Colors.neutral[20],
  },
  input: {
    flex: 1,
    ...Typography.Body.base,
    color: Colors.ui.text.primary,
  },
  inputWithLeftIcon: {
    marginLeft: Spacing[2],
  },
  inputWithRightIcon: {
    marginRight: Spacing[2],
  },
  leftIconContainer: {
    marginLeft: Spacing[4],
  },
  rightIconContainer: {
    marginRight: Spacing[4],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing[2],
    minHeight: 20,
  },
  footerLeft: {
    flex: 1,
  },
  helperText: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
  },
  errorText: {
    color: Colors.semantic.error,
  },
  characterCount: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
    marginLeft: Spacing[2],
  },
});

// ============================================
// VARIANT STYLES
// ============================================

const getVariantStyles = (
  variant: InputVariant,
  error: boolean,
  disabled: boolean
) => {
  const variants = {
    default: {
      container: {
        backgroundColor: Colors.ui.background.secondary,
        borderColor: error
          ? Colors.semantic.error
          : disabled
          ? Colors.ui.border.subtle
          : Colors.ui.border.default,
      } as ViewStyle,
      text: {
        color: Colors.ui.text.primary,
      },
    },

    filled: {
      container: {
        backgroundColor: Colors.neutral[20],
        borderColor: 'transparent',
      } as ViewStyle,
      text: {
        color: Colors.ui.text.primary,
      },
    },

    outline: {
      container: {
        backgroundColor: 'transparent',
        borderColor: error
          ? Colors.semantic.error
          : disabled
          ? Colors.ui.border.subtle
          : Colors.ui.border.strong,
      } as ViewStyle,
      text: {
        color: Colors.ui.text.primary,
      },
    },
  };

  return variants[variant];
};

// ============================================
// SIZE STYLES
// ============================================

const getSizeStyles = (size: InputSize) => {
  const sizes = {
    sm: {
      container: {
        height: Layout.sizes.inputSm,
        paddingHorizontal: Spacing[3],
      } as ViewStyle,
      input: {
        fontSize: Typography.FontSize.sm,
        paddingVertical: Spacing[2],
      },
    },

    md: {
      container: {
        height: Layout.sizes.inputMd,
        paddingHorizontal: Spacing[4],
      } as ViewStyle,
      input: {
        fontSize: Typography.FontSize.base,
        paddingVertical: Spacing[3],
      },
    },

    lg: {
      container: {
        height: Layout.sizes.inputLg,
        paddingHorizontal: Spacing[5],
      } as ViewStyle,
      input: {
        fontSize: Typography.FontSize.md,
        paddingVertical: Spacing[4],
      },
    },
  };

  return sizes[size];
};

export default Input;
