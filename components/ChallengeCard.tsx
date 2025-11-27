/**
 * VYBZ CIRCLE - ChallengeCard Component
 *
 * Gamification challenge card with progress, rewards, and timers
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Flame, Clock, Award, ChevronRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Layout, Shadows } from '@/constants';
import { Badge } from './Badge';

// ============================================
// TYPES
// ============================================

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  reward: number;
  rewardType: 'rep' | 'gold' | 'exclusive';
  progress: number;
  total: number;
  expiresIn?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  icon?: React.ReactNode;
}

interface ChallengeCardProps {
  challenge: Challenge;
  variant?: 'default' | 'compact';
  onPress?: (challenge: Challenge) => void;
  onClaim?: (challenge: Challenge) => void;
}

// ============================================
// COMPONENT
// ============================================

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  variant = 'default',
  onPress,
  onClaim,
}) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(challenge);
  };

  const handleClaim = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onClaim?.(challenge);
  };

  const progressPercent = (challenge.progress / challenge.total) * 100;
  const isCompleted = challenge.completed || challenge.progress >= challenge.total;

  const typeConfig = getTypeConfig(challenge.type);
  const rewardConfig = getRewardConfig(challenge.rewardType);
  const difficultyConfig = getDifficultyConfig(challenge.difficulty);

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        onPress={handlePress}
        activeOpacity={0.9}>
        <View style={[styles.compactIndicator, { backgroundColor: typeConfig.color }]} />

        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {challenge.title}
          </Text>
          <View style={styles.compactMeta}>
            <Text style={styles.compactProgress}>
              {challenge.progress}/{challenge.total}
            </Text>
            <Text style={styles.compactReward}>
              +{challenge.reward} {challenge.rewardType}
            </Text>
          </View>
        </View>

        <ChevronRight size={20} color={Colors.ui.text.tertiary} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, isCompleted && styles.cardCompleted]}
      activeOpacity={0.95}
      onPress={handlePress}>
      <LinearGradient
        colors={isCompleted ? rewardConfig.gradient : typeConfig.gradient}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, { backgroundColor: typeConfig.iconBg }]}>
              {challenge.icon || typeConfig.icon}
            </View>

            <View style={styles.headerText}>
              <View style={styles.badges}>
                <Badge variant={typeConfig.badge} size="sm">
                  {challenge.type.toUpperCase()}
                </Badge>
                {challenge.difficulty && (
                  <Badge variant={difficultyConfig.badge} size="sm">
                    {challenge.difficulty.toUpperCase()}
                  </Badge>
                )}
              </View>
              <Text style={styles.title} numberOfLines={2}>
                {challenge.title}
              </Text>
            </View>
          </View>

          {isCompleted && (
            <View style={styles.completedBadge}>
              <Award size={24} color={Colors.accent.gold} strokeWidth={2} />
            </View>
          )}
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {challenge.description}
        </Text>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              {challenge.progress} / {challenge.total}
            </Text>
            {challenge.expiresIn && !isCompleted && (
              <View style={styles.timer}>
                <Clock size={12} color={Colors.semantic.warning} strokeWidth={2} />
                <Text style={styles.timerText}>{challenge.expiresIn}</Text>
              </View>
            )}
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progressPercent, 100)}%`,
                  backgroundColor: isCompleted
                    ? Colors.accent.gold
                    : typeConfig.color,
                },
              ]}
            />
          </View>
        </View>

        {/* Reward */}
        <View style={styles.footer}>
          <View style={styles.reward}>
            {rewardConfig.icon}
            <Text style={[styles.rewardText, { color: rewardConfig.color }]}>
              +{challenge.reward} {challenge.rewardType.toUpperCase()}
            </Text>
          </View>

          {isCompleted && onClaim && (
            <TouchableOpacity
              style={styles.claimButton}
              onPress={handleClaim}
              activeOpacity={0.8}>
              <LinearGradient
                colors={[Colors.accent.gold, Colors.accent.goldDark]}
                style={styles.claimButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.claimButtonText}>Claim</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// ============================================
// HELPERS
// ============================================

const getTypeConfig = (type: Challenge['type']) => {
  const configs = {
    daily: {
      color: Colors.primary[400],
      gradient: [Colors.neutral[20], Colors.neutral[25]],
      iconBg: Colors.semantic.errorBg,
      icon: <Flame size={20} color={Colors.primary[400]} strokeWidth={2} />,
      badge: 'primary' as const,
    },
    weekly: {
      color: Colors.secondary[400],
      gradient: [Colors.neutral[20], Colors.neutral[25]],
      iconBg: 'rgba(255, 179, 71, 0.15)',
      icon: <Trophy size={20} color={Colors.secondary[400]} strokeWidth={2} />,
      badge: 'secondary' as const,
    },
    monthly: {
      color: Colors.accent.purple,
      gradient: [Colors.neutral[20], Colors.neutral[25]],
      iconBg: 'rgba(155, 81, 224, 0.15)',
      icon: <Award size={20} color={Colors.accent.purple} strokeWidth={2} />,
      badge: 'info' as const,
    },
    special: {
      color: Colors.accent.gold,
      gradient: ['rgba(255, 215, 0, 0.1)', 'rgba(255, 215, 0, 0.05)'],
      iconBg: 'rgba(255, 215, 0, 0.15)',
      icon: <Award size={20} color={Colors.accent.gold} strokeWidth={2} />,
      badge: 'warning' as const,
    },
  };

  return configs[type];
};

const getRewardConfig = (rewardType: Challenge['rewardType']) => {
  const configs = {
    rep: {
      color: Colors.primary[400],
      gradient: [Colors.primary[400], Colors.primary[600]],
      icon: <Flame size={16} color={Colors.primary[400]} strokeWidth={2} />,
    },
    gold: {
      color: Colors.accent.gold,
      gradient: [Colors.accent.gold, Colors.accent.goldDark],
      icon: <Trophy size={16} color={Colors.accent.gold} strokeWidth={2} />,
    },
    exclusive: {
      color: Colors.accent.purple,
      gradient: [Colors.accent.purple, Colors.accent.purpleDark],
      icon: <Award size={16} color={Colors.accent.purple} strokeWidth={2} />,
    },
  };

  return configs[rewardType];
};

const getDifficultyConfig = (difficulty?: Challenge['difficulty']) => {
  if (!difficulty) return { badge: 'neutral' as const };

  const configs = {
    easy: { badge: 'success' as const },
    medium: { badge: 'warning' as const },
    hard: { badge: 'error' as const },
  };

  return configs[difficulty];
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  // Default Card
  card: {
    borderRadius: Layout.radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing[4],
    ...Shadows.md,
  },

  cardCompleted: {
    ...Shadows.glowGold,
  },

  cardGradient: {
    padding: Spacing[5],
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing[3],
  },

  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing[3],
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    flex: 1,
  },

  badges: {
    flexDirection: 'row',
    gap: Spacing[2],
    marginBottom: Spacing[2],
  },

  title: {
    ...Typography.Heading.h5,
  },

  completedBadge: {
    marginLeft: Spacing[2],
  },

  // Description
  description: {
    ...Typography.Body.small,
    color: Colors.ui.text.secondary,
    marginBottom: Spacing[4],
  },

  // Progress
  progressSection: {
    marginBottom: Spacing[4],
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[2],
  },

  progressText: {
    ...Typography.Label.small,
    color: Colors.ui.text.primary,
  },

  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
    paddingHorizontal: Spacing[2],
    paddingVertical: Spacing[1],
    backgroundColor: Colors.semantic.warningBg,
    borderRadius: Layout.radius.sm,
  },

  timerText: {
    ...Typography.Caption.small,
    color: Colors.semantic.warning,
    fontWeight: '600',
  },

  progressBar: {
    height: 8,
    backgroundColor: Colors.neutral[30],
    borderRadius: Layout.radius.sm,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: Layout.radius.sm,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },

  rewardText: {
    ...Typography.Label.medium,
    fontWeight: '700',
  },

  claimButton: {
    borderRadius: Layout.radius.md,
    overflow: 'hidden',
    ...Shadows.glowGold,
  },

  claimButtonGradient: {
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[2],
  },

  claimButtonText: {
    ...Typography.ButtonText.small,
    color: Colors.neutral[10],
  },

  // Compact Card
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.ui.background.secondary,
    borderRadius: Layout.radius.lg,
    padding: Spacing[3],
    marginBottom: Spacing[3],
    ...Shadows.sm,
  },

  compactIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: Spacing[3],
  },

  compactContent: {
    flex: 1,
  },

  compactTitle: {
    ...Typography.Label.medium,
    color: Colors.ui.text.primary,
    marginBottom: Spacing[1],
  },

  compactMeta: {
    flexDirection: 'row',
    gap: Spacing[3],
  },

  compactProgress: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
  },

  compactReward: {
    ...Typography.Caption.small,
    color: Colors.primary[400],
    fontWeight: '600',
  },
});

export default ChallengeCard;
