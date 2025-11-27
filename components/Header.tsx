/**
 * VYBZ CIRCLE - Header Component
 *
 * Reusable screen header with title, actions, and back button
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Layout } from '@/constants';

// ============================================
// TYPES
// ============================================

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  variant?: 'default' | 'large' | 'minimal';
  style?: ViewStyle;
}

// ============================================
// COMPONENT
// ============================================

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  leftAction,
  rightAction,
  variant = 'default',
  style,
}) => {
  const router = useRouter();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  if (variant === 'minimal') {
    return (
      <View style={[styles.minimalContainer, style]}>
        {(showBack || leftAction) && (
          <View style={styles.leftSection}>
            {showBack ? (
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <ChevronLeft
                  size={24}
                  color={Colors.ui.text.primary}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            ) : (
              leftAction
            )}
          </View>
        )}

        {title && (
          <View style={styles.minimalCenter}>
            <Text style={styles.minimalTitle} numberOfLines={1}>
              {title}
            </Text>
          </View>
        )}

        {rightAction && <View style={styles.rightSection}>{rightAction}</View>}
      </View>
    );
  }

  if (variant === 'large') {
    return (
      <View style={[styles.largeContainer, style]}>
        {(showBack || leftAction || rightAction) && (
          <View style={styles.largeTop}>
            {(showBack || leftAction) && (
              <View style={styles.leftSection}>
                {showBack ? (
                  <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <ChevronLeft
                      size={24}
                      color={Colors.ui.text.primary}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                ) : (
                  leftAction
                )}
              </View>
            )}

            {rightAction && <View style={styles.rightSection}>{rightAction}</View>}
          </View>
        )}

        {title && (
          <Text style={styles.largeTitle} numberOfLines={2}>
            {title}
          </Text>
        )}

        {subtitle && <Text style={styles.largeSubtitle}>{subtitle}</Text>}
      </View>
    );
  }

  // Default variant
  return (
    <View style={[styles.container, style]}>
      {(showBack || leftAction) && (
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ChevronLeft size={24} color={Colors.ui.text.primary} strokeWidth={2} />
            </TouchableOpacity>
          ) : (
            leftAction
          )}
        </View>
      )}

      {title && (
        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      {rightAction && <View style={styles.rightSection}>{rightAction}</View>}
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  // Default Variant
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
    minHeight: 64,
  },

  leftSection: {
    minWidth: 44,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[3],
  },

  rightSection: {
    minWidth: 44,
    alignItems: 'flex-end',
  },

  title: {
    ...Typography.Heading.h5,
    textAlign: 'center',
  },

  subtitle: {
    ...Typography.Caption.medium,
    color: Colors.ui.text.tertiary,
    textAlign: 'center',
    marginTop: Spacing[1],
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: Colors.ui.background.secondary,
  },

  // Minimal Variant
  minimalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[3],
    minHeight: 56,
  },

  minimalCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing[3],
  },

  minimalTitle: {
    ...Typography.Label.large,
  },

  // Large Variant
  largeContainer: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[6],
  },

  largeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[4],
  },

  largeTitle: {
    ...Typography.Display.small,
    marginBottom: Spacing[2],
  },

  largeSubtitle: {
    ...Typography.Body.large,
    color: Colors.ui.text.secondary,
  },
});

export default Header;
