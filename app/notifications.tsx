import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Users,
  Ticket,
  Flame,
  Trophy,
  MapPin,
  Clock,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { Avatar, Badge } from '@/components';

interface Notification {
  id: string;
  type: 'event' | 'social' | 'scout' | 'achievement' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  userName?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'social',
    title: 'New Friend Going',
    message: 'Sarah and 3 others are going to Amapiano Sundays',
    time: '5m ago',
    read: false,
    userName: 'Sarah M',
  },
  {
    id: '2',
    type: 'scout',
    title: 'Scout Success! 🎯',
    message: 'Your scout for Jazz Night was accurate! +50 points',
    time: '1h ago',
    read: false,
  },
  {
    id: '3',
    type: 'event',
    title: 'Event Starting Soon',
    message: 'Koroga Festival starts in 2 hours. Get ready!',
    time: '2h ago',
    read: false,
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Level Up! 🎉',
    message: "You've reached Level 7 Scout. New perks unlocked!",
    time: '3h ago',
    read: true,
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Ticket Reminder',
    message: "Don't forget to get your tickets for Blankets & Wine",
    time: '1d ago',
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'social':
      return <Users size={20} color={Colors.accent.purple[400]} strokeWidth={2} />;
    case 'scout':
      return <Flame size={20} color={Colors.primary[400]} strokeWidth={2} />;
    case 'event':
      return <MapPin size={20} color={Colors.accent.cyan[400]} strokeWidth={2} />;
    case 'achievement':
      return <Trophy size={20} color={Colors.accent.gold[400]} strokeWidth={2} />;
    case 'reminder':
      return <Clock size={20} color={Colors.ui.text.tertiary} strokeWidth={2} />;
    default:
      return <Bell size={20} color={Colors.ui.text.tertiary} strokeWidth={2} />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'social':
      return Colors.accent.purple[400];
    case 'scout':
      return Colors.primary[400];
    case 'event':
      return Colors.accent.cyan[400];
    case 'achievement':
      return Colors.accent.gold[400];
    case 'reminder':
      return Colors.ui.text.tertiary;
    default:
      return Colors.ui.text.tertiary;
  }
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleNotificationPress = (notification: Notification) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );

    // TODO: Navigate to relevant screen based on notification type
    console.log('Notification pressed:', notification.title);
  };

  const handleMarkAllRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}>
          <ArrowLeft size={24} color={Colors.ui.text.primary} strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Badge variant="error" size="sm" dot={false}>
              {unreadCount}
            </Badge>
          )}
        </View>

        <TouchableOpacity
          style={styles.markAllButton}
          onPress={handleMarkAllRead}
          activeOpacity={0.7}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setFilter('all');
          }}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.filterButtonText,
              filter === 'all' && styles.filterButtonTextActive,
            ]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'unread' && styles.filterButtonActive,
          ]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setFilter('unread');
          }}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.filterButtonText,
              filter === 'unread' && styles.filterButtonTextActive,
            ]}>
            Unread
          </Text>
          {unreadCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={64} color={Colors.ui.text.tertiary} strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyMessage}>
              {filter === 'unread'
                ? "You're all caught up!"
                : "You'll see notifications here when you have them"}
            </Text>
          </View>
        ) : (
          filteredNotifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.notificationCardUnread,
              ]}
              onPress={() => handleNotificationPress(notification)}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${getNotificationColor(notification.type)}15` },
                ]}>
                {getNotificationIcon(notification.type)}
              </View>

              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                {notification.userName && (
                  <View style={styles.userInfo}>
                    <Avatar name={notification.userName} size="xs" />
                    <Text style={styles.userName}>{notification.userName}</Text>
                  </View>
                )}
              </View>

              {!notification.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))
        )}
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.ui.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  headerTitle: {
    ...Typography.Heading.h3,
  },
  markAllButton: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
  },
  markAllText: {
    ...Typography.Label.small,
    color: Colors.primary[400],
  },
  filters: {
    flexDirection: 'row',
    gap: Spacing[3],
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
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
  filterBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primary[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    ...Typography.Caption.small,
    color: Colors.neutral[100],
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing[5],
    gap: Spacing[3],
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[3],
    padding: Spacing[4],
    borderRadius: Spacing[3],
    backgroundColor: Colors.ui.background.secondary,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
  },
  notificationCardUnread: {
    borderColor: Colors.primary[400],
    backgroundColor: `${Colors.primary[400]}08`,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
    gap: Spacing[1],
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  notificationTime: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
  },
  notificationMessage: {
    ...Typography.Body.small,
    color: Colors.ui.text.secondary,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    marginTop: Spacing[2],
  },
  userName: {
    ...Typography.Label.small,
    color: Colors.ui.text.secondary,
  },
  unreadDot: {
    position: 'absolute',
    top: Spacing[4],
    right: Spacing[4],
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[400],
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing[10],
    gap: Spacing[4],
  },
  emptyTitle: {
    ...Typography.Heading.h3,
    color: Colors.ui.text.primary,
  },
  emptyMessage: {
    ...Typography.Body.base,
    color: Colors.ui.text.tertiary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
