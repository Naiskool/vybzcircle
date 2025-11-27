/**
 * VYBZ CIRCLE - Premium Empty State Component
 *
 * Friendly, engaging empty states with illustrations and CTAs
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants';
import { Button } from './Button';

// ============================================
// TYPES
// ============================================

interface EmptyStateProps {
  // Content
  icon?: React.ReactNode;
  title: string;
  description?: string;

  // Action
  actionLabel?: string;
  onAction?: () => void;

  // Styling
  style?: ViewStyle;
}

// ============================================
// COMPONENT
// ============================================

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <Text style={styles.title}>{title}</Text>

      {description && <Text style={styles.description}>{description}</Text>}

      {actionLabel && onAction && (
        <View style={styles.actionContainer}>
          <Button onPress={onAction} variant="outline" size="md">
            {actionLabel}
          </Button>
        </View>
      )}
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[8],
    paddingVertical: Spacing[12],
  },
  iconContainer: {
    marginBottom: Spacing[6],
    opacity: 0.6,
  },
  title: {
    ...Typography.Heading.h4,
    textAlign: 'center',
    marginBottom: Spacing[3],
  },
  description: {
    ...Typography.Body.base,
    color: Colors.ui.text.tertiary,
    textAlign: 'center',
    marginBottom: Spacing[6],
    lineHeight: 24,
  },
  actionContainer: {
    marginTop: Spacing[4],
  },
});

export default EmptyState;
