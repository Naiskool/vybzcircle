/**
 * VYBZ CIRCLE - FilterChips Component
 *
 * Horizontal scrollable filter chips with selection state
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Layout } from '@/constants';

// ============================================
// TYPES
// ============================================

export interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface FilterChipsProps {
  options: FilterOption[];
  selected: string[];
  onSelect: (id: string) => void;
  multiSelect?: boolean;
  style?: ViewStyle;
  showCount?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export const FilterChips: React.FC<FilterChipsProps> = ({
  options,
  selected,
  onSelect,
  multiSelect = false,
  style,
  showCount = false,
}) => {
  const handleSelect = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect(id);
  };

  const isSelected = (id: string) => selected.includes(id);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}>
      {options.map((option) => {
        const active = isSelected(option.id);

        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleSelect(option.id)}
            activeOpacity={0.7}
            style={[styles.chip, active && styles.chipActive]}>
            {option.icon && <View style={styles.icon}>{option.icon}</View>}

            <Text style={[styles.label, active && styles.labelActive]}>
              {option.label}
            </Text>

            {showCount && option.count !== undefined && (
              <View style={[styles.countBadge, active && styles.countBadgeActive]}>
                <Text style={[styles.countText, active && styles.countTextActive]}>
                  {option.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },

  contentContainer: {
    paddingHorizontal: Spacing[5],
    gap: Spacing[2],
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.ui.background.secondary,
    borderWidth: 1,
    borderColor: Colors.ui.border.default,
    gap: Spacing[2],
  },

  chipActive: {
    backgroundColor: Colors.primary[400],
    borderColor: Colors.primary[400],
  },

  icon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    ...Typography.Label.small,
    color: Colors.ui.text.secondary,
  },

  labelActive: {
    color: Colors.ui.text.primary,
  },

  countBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.neutral[30],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[1],
  },

  countBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  countText: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
    fontWeight: '600',
    fontSize: 10,
  },

  countTextActive: {
    color: Colors.ui.text.primary,
  },
});

export default FilterChips;
