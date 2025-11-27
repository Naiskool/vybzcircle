/**
 * VYBZ CIRCLE - UserStats Component
 *
 * User statistics display with icons and values
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Layout } from '@/constants';

// ============================================
// TYPES
// ============================================

export interface Stat {
  id: string;
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  onPress?: () => void;
}

interface UserStatsProps {
  stats: Stat[];
  variant?: 'default' | 'compact' | 'inline';
  style?: ViewStyle;
}

// ============================================
// COMPONENT
// ============================================

export const UserStats: React.FC<UserStatsProps> = ({
  stats,
  variant = 'default',
  style,
}) => {
  const handleStatPress = (stat: Stat) => {
    if (stat.onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      stat.onPress();
    }
  };

  if (variant === 'inline') {
    return (
      <View style={[styles.inlineContainer, style]}>
        {stats.map((stat, index) => (
          <React.Fragment key={stat.id}>
            {index > 0 && <View style={styles.inlineDivider} />}
            <View style={styles.inlineStat}>
              <Text style={styles.inlineValue}>{stat.value}</Text>
              <Text style={styles.inlineLabel}>{stat.label}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    );
  }

  if (variant === 'compact') {
    return (
      <View style={[styles.compactContainer, style]}>
        {stats.map((stat, index) => (
          <React.Fragment key={stat.id}>
            {index > 0 && <View style={styles.compactDivider} />}
            <TouchableOpacity
              style={styles.compactStat}
              onPress={() => handleStatPress(stat)}
              disabled={!stat.onPress}
              activeOpacity={stat.onPress ? 0.7 : 1}>
              {stat.icon && <View style={styles.compactIcon}>{stat.icon}</View>}
              <Text style={styles.compactValue}>{stat.value}</Text>
              <Text style={styles.compactLabel}>{stat.label}</Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    );
  }

  // Default variant
  return (
    <View style={[styles.container, style]}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.id}>
          {index > 0 && <View style={styles.divider} />}
          <TouchableOpacity
            style={styles.stat}
            onPress={() => handleStatPress(stat)}
            disabled={!stat.onPress}
            activeOpacity={stat.onPress ? 0.7 : 1}>
            {stat.icon && <View style={styles.icon}>{stat.icon}</View>}
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
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
    paddingVertical: Spacing[8],
    paddingHorizontal: Spacing[5],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.ui.border.subtle,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing[1],
  },

  icon: {
    marginBottom: Spacing[2],
  },

  value: {
    ...Typography.Heading.h3,
    marginBottom: Spacing[1],
  },

  label: {
    ...Typography.Caption.medium,
    color: Colors.ui.text.tertiary,
  },

  divider: {
    width: 1,
    backgroundColor: Colors.ui.border.default,
    marginHorizontal: Spacing[2],
  },

  // Compact Variant
  compactContainer: {
    flexDirection: 'row',
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[5],
  },

  compactStat: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing[1],
  },

  compactIcon: {
    marginBottom: Spacing[1],
  },

  compactValue: {
    ...Typography.Heading.h4,
  },

  compactLabel: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
  },

  compactDivider: {
    width: 1,
    backgroundColor: Colors.ui.border.default,
    marginHorizontal: Spacing[2],
  },

  // Inline Variant
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
  },

  inlineStat: {
    alignItems: 'center',
  },

  inlineValue: {
    ...Typography.Label.large,
    fontWeight: '700',
  },

  inlineLabel: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
  },

  inlineDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.ui.text.tertiary,
  },
});

export default UserStats;
