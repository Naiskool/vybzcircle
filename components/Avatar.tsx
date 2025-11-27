/**
 * VYBZ CIRCLE - Premium Avatar Component
 *
 * User avatars with images, initials, status indicators
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Colors, Typography, Layout, Shadows } from '@/constants';

// ============================================
// TYPES
// ============================================

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

interface AvatarProps {
  // Content
  source?: ImageSourcePropType;
  name?: string;
  fallback?: string;

  // Appearance
  size?: AvatarSize;
  variant?: 'circle' | 'rounded';

  // Status
  showStatus?: boolean;
  status?: AvatarStatus;

  // Interaction
  onPress?: () => void;

  // Styling
  style?: ViewStyle;
}

// ============================================
// COMPONENT
// ============================================

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  fallback,
  size = 'md',
  variant = 'circle',
  showStatus = false,
  status = 'offline',
  onPress,
  style,
}) => {
  const sizeStyle = getSizeStyles(size);
  const borderRadius = variant === 'circle' ? sizeStyle.size / 2 : Layout.radius.lg;

  // Get initials from name
  const getInitials = () => {
    if (fallback) return fallback;
    if (!name) return '?';

    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const content = (
    <View style={[styles.container, sizeStyle.container, { borderRadius }, style]}>
      {source ? (
        <Image
          source={source}
          style={[styles.image, { borderRadius, width: sizeStyle.size, height: sizeStyle.size }]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.fallback, { borderRadius, width: sizeStyle.size, height: sizeStyle.size }]}>
          <Text style={[styles.initials, sizeStyle.text]}>{getInitials()}</Text>
        </View>
      )}

      {showStatus && (
        <View style={[styles.statusContainer, sizeStyle.statusContainer]}>
          <View style={[styles.status, sizeStyle.status, getStatusColor(status)]} />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
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
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: Colors.neutral[30],
  },
  fallback: {
    backgroundColor: Colors.primary[400],
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  initials: {
    ...Typography.Label.medium,
    color: Colors.ui.text.primary,
    fontWeight: '700',
  },
  statusContainer: {
    position: 'absolute',
    backgroundColor: Colors.neutral[10],
    borderRadius: 100,
    padding: 2,
  },
  status: {
    borderRadius: 100,
  },
});

// ============================================
// SIZE STYLES
// ============================================

const getSizeStyles = (size: AvatarSize) => {
  const sizes = {
    xs: {
      container: {},
      size: Layout.sizes.avatarXs,
      text: { fontSize: 10 },
      statusContainer: { bottom: 0, right: 0 },
      status: { width: 6, height: 6 },
    },
    sm: {
      container: {},
      size: Layout.sizes.avatarSm,
      text: { fontSize: 12 },
      statusContainer: { bottom: 0, right: 0 },
      status: { width: 8, height: 8 },
    },
    md: {
      container: {},
      size: Layout.sizes.avatarMd,
      text: { fontSize: 14 },
      statusContainer: { bottom: 0, right: 0 },
      status: { width: 10, height: 10 },
    },
    lg: {
      container: {},
      size: Layout.sizes.avatarLg,
      text: { fontSize: 16 },
      statusContainer: { bottom: 2, right: 2 },
      status: { width: 12, height: 12 },
    },
    xl: {
      container: {},
      size: Layout.sizes.avatarXl,
      text: { fontSize: 20 },
      statusContainer: { bottom: 2, right: 2 },
      status: { width: 14, height: 14 },
    },
    '2xl': {
      container: {},
      size: Layout.sizes.avatar2xl,
      text: { fontSize: 24 },
      statusContainer: { bottom: 4, right: 4 },
      status: { width: 16, height: 16 },
    },
    '3xl': {
      container: {},
      size: Layout.sizes.avatar3xl,
      text: { fontSize: 32 },
      statusContainer: { bottom: 4, right: 4 },
      status: { width: 18, height: 18 },
    },
    '4xl': {
      container: {},
      size: Layout.sizes.avatar4xl,
      text: { fontSize: 40 },
      statusContainer: { bottom: 6, right: 6 },
      status: { width: 20, height: 20 },
    },
  };

  return sizes[size];
};

// ============================================
// STATUS COLORS
// ============================================

const getStatusColor = (status: AvatarStatus): ViewStyle => {
  const colors = {
    online: { backgroundColor: Colors.semantic.success },
    offline: { backgroundColor: Colors.neutral[60] },
    busy: { backgroundColor: Colors.semantic.error },
    away: { backgroundColor: Colors.semantic.warning },
  };

  return colors[status];
};

export default Avatar;
