/**
 * VYBZ CIRCLE - Premium Loading Skeleton Component
 *
 * Animated skeleton loaders for better perceived performance
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Colors, Layout, Spacing } from '@/constants';

// ============================================
// TYPES
// ============================================

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string;
  style?: ViewStyle;
}

interface SkeletonCircleProps {
  size?: number;
  style?: ViewStyle;
}

// ============================================
// BASE SKELETON
// ============================================

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = Layout.radius.md,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

// ============================================
// SKELETON TEXT
// ============================================

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lastLineWidth = '60%',
  style,
}) => {
  return (
    <View style={[styles.textContainer, style]}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          height={16}
          style={{ marginBottom: Spacing[2] }}
        />
      ))}
    </View>
  );
};

// ============================================
// SKELETON CIRCLE
// ============================================

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({
  size = 48,
  style,
}) => {
  return (
    <Skeleton
      width={size}
      height={size}
      borderRadius={size / 2}
      style={style}
    />
  );
};

// ============================================
// SKELETON CARD
// ============================================

export const SkeletonCard: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return (
    <View style={[styles.card, style]}>
      <Skeleton width="100%" height={200} borderRadius={Layout.radius.xl} />
      <View style={styles.cardContent}>
        <Skeleton width="80%" height={24} style={{ marginBottom: Spacing[2] }} />
        <SkeletonText lines={2} lastLineWidth="90%" />
        <View style={styles.cardFooter}>
          <SkeletonCircle size={32} />
          <Skeleton width={100} height={12} />
        </View>
      </View>
    </View>
  );
};

// ============================================
// SKELETON LIST
// ============================================

export const SkeletonList: React.FC<{ items?: number; style?: ViewStyle }> = ({
  items = 5,
  style,
}) => {
  return (
    <View style={style}>
      {Array.from({ length: items }).map((_, index) => (
        <View key={index} style={styles.listItem}>
          <SkeletonCircle size={48} />
          <View style={styles.listItemContent}>
            <Skeleton width="70%" height={16} style={{ marginBottom: Spacing[2] }} />
            <Skeleton width="50%" height={12} />
          </View>
        </View>
      ))}
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.neutral[30],
  },
  textContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: Colors.ui.background.secondary,
    borderRadius: Layout.radius['2xl'],
    overflow: 'hidden',
    marginBottom: Spacing[4],
  },
  cardContent: {
    padding: Spacing[5],
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    marginTop: Spacing[4],
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    marginBottom: Spacing[4],
    paddingHorizontal: Spacing[5],
  },
  listItemContent: {
    flex: 1,
  },
});

export default Skeleton;
