/**
 * VYBZ CIRCLE - Premium Toast Notification System
 *
 * Elegant, animated toast notifications for feedback
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Colors, Spacing, Typography, Layout, Shadows } from '@/constants';
import * as Haptics from 'expo-haptics';

// ============================================
// TYPES
// ============================================

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  visible: boolean;
  type?: ToastType;
  message: string;
  duration?: number;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

// ============================================
// COMPONENT
// ============================================

export const Toast: React.FC<ToastProps> = ({
  visible,
  type = 'info',
  message,
  duration = 3000,
  onDismiss,
  icon,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Haptic feedback
      const hapticType = getHapticType(type);
      if (hapticType) {
        Haptics.notificationAsync(hapticType as any);
      }

      // Show animation
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 15,
          stiffness: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss
      const timer = setTimeout(() => {
        dismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  if (!visible) return null;

  const typeStyles = getTypeStyles(type);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={dismiss}
        style={[styles.toast, typeStyles.background]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.message, typeStyles.text]} numberOfLines={2}>
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============================================
// TOAST MANAGER (Context/Hook)
// ============================================

/**
 * Usage:
 *
 * const toast = useToast();
 * toast.success('Event saved!');
 * toast.error('Something went wrong');
 */

// This would typically be a context provider
// For now, export as component

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: Spacing[5],
    right: Spacing[5],
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[5],
    borderRadius: Layout.radius.xl,
    ...Shadows.glowPrimaryStrong,
  },
  iconContainer: {
    marginRight: Spacing[3],
  },
  message: {
    ...Typography.Body.base,
    flex: 1,
    fontWeight: '600',
  },
});

// ============================================
// TYPE STYLES
// ============================================

const getTypeStyles = (type: ToastType) => {
  const styles = {
    success: {
      background: {
        backgroundColor: Colors.semantic.success,
      },
      text: {
        color: Colors.ui.text.primary,
      },
    },

    error: {
      background: {
        backgroundColor: Colors.semantic.error,
      },
      text: {
        color: Colors.ui.text.primary,
      },
    },

    warning: {
      background: {
        backgroundColor: Colors.semantic.warning,
      },
      text: {
        color: Colors.ui.text.primary,
      },
    },

    info: {
      background: {
        backgroundColor: Colors.semantic.info,
      },
      text: {
        color: Colors.ui.text.primary,
      },
    },
  };

  return styles[type];
};

// ============================================
// HAPTIC HELPERS
// ============================================

const getHapticType = (type: ToastType) => {
  const haptics = {
    success: Haptics.NotificationFeedbackType.Success,
    error: Haptics.NotificationFeedbackType.Error,
    warning: Haptics.NotificationFeedbackType.Warning,
    info: null,
  };

  return haptics[type];
};

export default Toast;
