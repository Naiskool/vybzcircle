import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Trophy, Flame, Star, Gift, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { ChallengeCard, Card, Badge } from '@/components';

const { width } = Dimensions.get('window');

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  progress: number;
  total: number;
  expiresIn?: string;
  completed?: boolean;
  icon: string;
}

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'First Scout',
    description: 'Scout your first event to earn points',
    reward: 50,
    type: 'daily',
    progress: 0,
    total: 1,
    expiresIn: '18h',
    icon: 'flame',
  },
  {
    id: '2',
    title: 'Social Butterfly',
    description: 'Attend 3 events this week',
    reward: 200,
    type: 'weekly',
    progress: 1,
    total: 3,
    expiresIn: '4d',
    icon: 'users',
  },
  {
    id: '3',
    title: 'Scout Master',
    description: 'Get 10 scouts with 80%+ accuracy',
    reward: 500,
    type: 'monthly',
    progress: 7,
    total: 10,
    expiresIn: '15d',
    icon: 'target',
  },
  {
    id: '4',
    title: 'Early Bird',
    description: 'Book tickets 7 days in advance',
    reward: 100,
    type: 'daily',
    progress: 1,
    total: 1,
    completed: true,
    icon: 'ticket',
  },
  {
    id: '5',
    title: 'Weekend Warrior',
    description: 'Attend both Friday and Saturday events',
    reward: 300,
    type: 'special',
    progress: 0,
    total: 2,
    expiresIn: '2d',
    icon: 'star',
  },
];

export default function CircuitScreen() {
  const [filter, setFilter] = useState<'active' | 'completed'>('active');

  const handleFilterChange = (newFilter: typeof filter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFilter(newFilter);
  };

  const handleChallengePress = (challenge: Challenge) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Challenge pressed:', challenge.title);
    // TODO: Navigate to challenge details
  };

  const handleClaim = (challenge: Challenge) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log('Claim reward:', challenge.title);
    // TODO: Implement claim functionality
  };

  const filteredChallenges = MOCK_CHALLENGES.filter((challenge) => {
    if (filter === 'completed') return challenge.completed;
    return !challenge.completed;
  });

  const activeChallenges = MOCK_CHALLENGES.filter((c) => !c.completed).length;
  const completedChallenges = MOCK_CHALLENGES.filter((c) => c.completed).length;
  const totalPoints = 1240; // This would come from user stats
  const nextLevelPoints = 1500;
  const levelProgress = (totalPoints / nextLevelPoints) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>The Circuit</Text>
          <Text style={styles.headerSubtitle}>Complete challenges, earn rewards</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Zap size={18} color={Colors.accent.gold[400]} strokeWidth={2} fill={Colors.accent.gold[400]} />
          <Text style={styles.pointsText}>{totalPoints.toLocaleString()}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Level Progress */}
        <Card variant="elevated" padding="lg" style={styles.levelCard}>
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[400]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.levelGradient}>
            <View style={styles.levelHeader}>
              <View style={styles.levelInfo}>
                <Text style={styles.levelTitle}>Level 6 Scout</Text>
                <Text style={styles.levelSubtitle}>
                  {nextLevelPoints - totalPoints} points to Level 7
                </Text>
              </View>
              <View style={styles.levelIcon}>
                <Flame size={32} color={Colors.neutral[100]} strokeWidth={2} />
              </View>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${levelProgress}%` }]} />
              </View>
            </View>

            <View style={styles.levelStats}>
              <View style={styles.levelStat}>
                <Trophy size={16} color={Colors.neutral[100]} strokeWidth={2} />
                <Text style={styles.levelStatText}>{completedChallenges} Completed</Text>
              </View>
              <View style={styles.levelStat}>
                <TrendingUp size={16} color={Colors.neutral[100]} strokeWidth={2} />
                <Text style={styles.levelStatText}>{Math.round(levelProgress)}% Progress</Text>
              </View>
            </View>
          </LinearGradient>
        </Card>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'active' && styles.filterButtonActive]}
            onPress={() => handleFilterChange('active')}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.filterButtonText,
                filter === 'active' && styles.filterButtonTextActive,
              ]}>
              Active
            </Text>
            {activeChallenges > 0 && (
              <Badge variant="primary" size="sm" dot={false}>
                {activeChallenges}
              </Badge>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'completed' && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterChange('completed')}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.filterButtonText,
                filter === 'completed' && styles.filterButtonTextActive,
              ]}>
              Completed
            </Text>
            {completedChallenges > 0 && (
              <Badge variant="success" size="sm" dot={false}>
                {completedChallenges}
              </Badge>
            )}
          </TouchableOpacity>
        </View>

        {/* Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {filter === 'active' ? 'Active Challenges' : 'Completed Challenges'}
          </Text>

          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              description={challenge.description}
              reward={challenge.reward}
              type={challenge.type}
              progress={challenge.progress}
              total={challenge.total}
              expiresIn={challenge.expiresIn}
              completed={challenge.completed}
              onPress={() => handleChallengePress(challenge)}
              onClaim={challenge.completed ? () => handleClaim(challenge) : undefined}
            />
          ))}
        </View>

        {/* Rewards Info */}
        <Card variant="outlined" padding="lg" style={styles.rewardsCard}>
          <View style={styles.rewardsHeader}>
            <Gift size={24} color={Colors.accent.purple[400]} strokeWidth={2} />
            <Text style={styles.rewardsTitle}>Earn More Points</Text>
          </View>
          <Text style={styles.rewardsText}>
            Complete challenges to earn points and level up. Higher levels unlock exclusive
            perks, early ticket access, and special event invites.
          </Text>

          <View style={styles.rewardsList}>
            <View style={styles.rewardItem}>
              <Star
                size={16}
                color={Colors.accent.gold[400]}
                fill={Colors.accent.gold[400]}
                strokeWidth={2}
              />
              <Text style={styles.rewardItemText}>Exclusive event access</Text>
            </View>
            <View style={styles.rewardItem}>
              <Star
                size={16}
                color={Colors.accent.gold[400]}
                fill={Colors.accent.gold[400]}
                strokeWidth={2}
              />
              <Text style={styles.rewardItemText}>Early ticket sales</Text>
            </View>
            <View style={styles.rewardItem}>
              <Star
                size={16}
                color={Colors.accent.gold[400]}
                fill={Colors.accent.gold[400]}
                strokeWidth={2}
              />
              <Text style={styles.rewardItemText}>VIP upgrades & discounts</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border.subtle,
  },
  headerTitle: {
    ...Typography.Heading.h2,
  },
  headerSubtitle: {
    ...Typography.Body.small,
    color: Colors.ui.text.tertiary,
    marginTop: Spacing[1],
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[4],
    borderRadius: Spacing[5],
    backgroundColor: Colors.ui.background.secondary,
    borderWidth: 1,
    borderColor: Colors.accent.gold[400],
  },
  pointsText: {
    ...Typography.Label.large,
    color: Colors.accent.gold[400],
    fontWeight: '800',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing[5],
    paddingBottom: Spacing[10],
  },
  levelCard: {
    marginBottom: Spacing[6],
    overflow: 'hidden',
    padding: 0,
  },
  levelGradient: {
    padding: Spacing[5],
    gap: Spacing[4],
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelInfo: {
    flex: 1,
    gap: Spacing[1],
  },
  levelTitle: {
    ...Typography.Heading.h3,
    color: Colors.neutral[100],
  },
  levelSubtitle: {
    ...Typography.Body.small,
    color: Colors.neutral[200],
  },
  levelIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    marginTop: Spacing[2],
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.neutral[100],
    borderRadius: 4,
  },
  levelStats: {
    flexDirection: 'row',
    gap: Spacing[6],
  },
  levelStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  levelStatText: {
    ...Typography.Label.base,
    color: Colors.neutral[100],
  },
  filters: {
    flexDirection: 'row',
    gap: Spacing[3],
    marginBottom: Spacing[6],
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[4],
    borderRadius: Spacing[5],
    backgroundColor: Colors.ui.background.secondary,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary[400],
  },
  filterButtonText: {
    ...Typography.Label.base,
    color: Colors.ui.text.secondary,
  },
  filterButtonTextActive: {
    color: Colors.neutral[100],
  },
  section: {
    gap: Spacing[4],
  },
  sectionTitle: {
    ...Typography.Heading.h3,
    marginBottom: Spacing[2],
  },
  rewardsCard: {
    marginTop: Spacing[8],
    gap: Spacing[4],
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  rewardsTitle: {
    ...Typography.Heading.h4,
  },
  rewardsText: {
    ...Typography.Body.base,
    color: Colors.ui.text.secondary,
    lineHeight: 22,
  },
  rewardsList: {
    gap: Spacing[3],
    marginTop: Spacing[2],
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  rewardItemText: {
    ...Typography.Body.base,
    color: Colors.ui.text.primary,
  },
});
