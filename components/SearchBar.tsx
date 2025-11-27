/**
 * VYBZ CIRCLE - SearchBar Component
 *
 * Reusable search bar with voice, filters, and clear functionality
 */

import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInputProps,
} from 'react-native';
import { Search, X, Mic, SlidersHorizontal } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Layout } from '@/constants';

// ============================================
// TYPES
// ============================================

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  onVoiceSearch?: () => void;
  onFilterPress?: () => void;
  showVoice?: boolean;
  showFilter?: boolean;
  variant?: 'default' | 'minimal';
}

// ============================================
// COMPONENT
// ============================================

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  onVoiceSearch,
  onFilterPress,
  showVoice = false,
  showFilter = false,
  variant = 'default',
  placeholder = 'Search events, venues, or vibes...',
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClear?.();
    onChangeText('');
  };

  const handleVoice = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onVoiceSearch?.();
  };

  const handleFilter = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onFilterPress?.();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.ui.border.default, Colors.primary[400]],
  });

  if (variant === 'minimal') {
    return (
      <View style={styles.minimalContainer}>
        <Search size={20} color={Colors.ui.text.tertiary} strokeWidth={2} />
        <TextInput
          {...textInputProps}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.ui.text.disabled}
          style={styles.minimalInput}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.iconButton}>
            <X size={20} color={Colors.ui.text.tertiary} strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { borderColor },
        isFocused && styles.containerFocused,
      ]}>
      {/* Search Icon */}
      <View style={styles.searchIcon}>
        <Search
          size={20}
          color={isFocused ? Colors.primary[400] : Colors.ui.text.tertiary}
          strokeWidth={2}
        />
      </View>

      {/* Input */}
      <TextInput
        {...textInputProps}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={Colors.ui.text.disabled}
        style={styles.input}
      />

      {/* Actions */}
      <View style={styles.actions}>
        {value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.iconButton}
            activeOpacity={0.7}>
            <X size={20} color={Colors.ui.text.tertiary} strokeWidth={2} />
          </TouchableOpacity>
        )}

        {showVoice && (
          <TouchableOpacity
            onPress={handleVoice}
            style={styles.iconButton}
            activeOpacity={0.7}>
            <Mic size={20} color={Colors.ui.text.tertiary} strokeWidth={2} />
          </TouchableOpacity>
        )}

        {showFilter && (
          <TouchableOpacity
            onPress={handleFilter}
            style={[styles.iconButton, styles.filterButton]}
            activeOpacity={0.7}>
            <SlidersHorizontal
              size={20}
              color={Colors.ui.text.primary}
              strokeWidth={2}
            />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.ui.background.secondary,
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    borderColor: Colors.ui.border.default,
    paddingHorizontal: Spacing[4],
    height: 52,
  },

  containerFocused: {
    backgroundColor: Colors.neutral[15],
  },

  searchIcon: {
    marginRight: Spacing[2],
  },

  input: {
    flex: 1,
    ...Typography.Body.base,
    color: Colors.ui.text.primary,
    paddingVertical: 0,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
    marginLeft: Spacing[2],
  },

  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },

  filterButton: {
    backgroundColor: Colors.primary[400],
  },

  // Minimal Variant
  minimalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border.subtle,
    paddingVertical: Spacing[2],
    gap: Spacing[2],
  },

  minimalInput: {
    flex: 1,
    ...Typography.Body.base,
    color: Colors.ui.text.primary,
    paddingVertical: 0,
  },
});

export default SearchBar;
