import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Flame, Calendar, Award, Users, Settings, LogOut } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { Avatar, Badge, Card, UserStats, Stat } from '@/components';

export default function ProfileScreen() {
  const router = useRouter();
  const stats: Stat[] = [
    {
      id: 'events',
      label: 'Events',
      value: 23,
      icon: <Calendar size={24} color={Colors.primary[400]} strokeWidth={2} />,
    },
    {
      id: 'scouts',
      label: 'Scouts',
      value: 45,
      icon: <Flame size={24} color={Colors.primary[400]} strokeWidth={2} />,
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: '67%',
      icon: <Award size={24} color={Colors.primary[400]} strokeWidth={2} />,
    },
  ];

  const handleSettingsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/settings');
  };

  const handleSignOut = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          console.log('Signed out');
          // TODO: Implement sign out logic
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Avatar name="James Kamau" fallback="JK" size="3xl" />

          <Text style={styles.name}>James Kamau</Text>

          <Badge variant="primary" size="md">
            <Flame size={14} color={Colors.primary[400]} strokeWidth={2} />
            {'  '}Level 6 Scout
          </Badge>

          <Text style={styles.repPoints}>1,240 Rep Points</Text>
        </View>

        {/* Stats */}
        <UserStats stats={stats} variant="default" />

        {/* My Crew Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Crew</Text>

          <Card variant="elevated" padding="lg" interactive>
            <View style={styles.crewContent}>
              <View style={styles.crewShield}>
                <Users size={32} color={Colors.primary[400]} strokeWidth={2} />
              </View>
              <View style={styles.crewInfo}>
                <Text style={styles.crewName}>Kile-Gang</Text>
                <Text style={styles.crewMembers}>42 members · #2 in Nairobi</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <Card variant="elevated" padding="none">
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSettingsPress}
              activeOpacity={0.7}>
              <Settings size={22} color={Colors.ui.text.primary} strokeWidth={2} />
              <Text style={styles.menuText}>Account Settings</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSignOut}
              activeOpacity={0.7}>
              <LogOut size={22} color={Colors.primary[400]} strokeWidth={2} />
              <Text style={[styles.menuText, styles.menuTextDanger]}>Sign Out</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing[10],
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing[10],
    paddingHorizontal: Spacing[5],
    gap: Spacing[2],
  },
  name: {
    ...Typography.Heading.h2,
    marginTop: Spacing[4],
  },
  repPoints: {
    ...Typography.Body.base,
    color: Colors.ui.text.tertiary,
    marginTop: Spacing[2],
  },
  section: {
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[6],
  },
  sectionTitle: {
    ...Typography.Heading.h4,
    marginBottom: Spacing[4],
  },
  crewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
  },
  crewShield: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.semantic.errorBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary[400],
  },
  crewInfo: {
    flex: 1,
    gap: Spacing[1],
  },
  crewName: {
    ...Typography.Heading.h5,
  },
  crewMembers: {
    ...Typography.Body.small,
    color: Colors.ui.text.tertiary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[5],
  },
  menuText: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  menuTextDanger: {
    color: Colors.primary[400],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.ui.border.subtle,
    marginHorizontal: Spacing[5],
  },
});
