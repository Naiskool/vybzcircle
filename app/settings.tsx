import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Globe,
  Moon,
  Shield,
  HelpCircle,
  FileText,
  Mail,
  Trash2,
  ChevronRight,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { Card } from '@/components';

interface SettingItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  destructive?: boolean;
}

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleEditProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Edit profile');
    // TODO: Navigate to edit profile screen
  };

  const handleChangePassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Change password');
    // TODO: Navigate to change password screen
  };

  const handlePrivacy = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Privacy settings');
    // TODO: Navigate to privacy settings
  };

  const handleLanguage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Language settings');
    // TODO: Show language picker
  };

  const handleHelp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Help center');
    // TODO: Navigate to help center
  };

  const handleTerms = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Terms & Conditions');
    // TODO: Navigate to terms
  };

  const handleSupport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Contact support');
    // TODO: Navigate to support
  };

  const handleDeleteAccount = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            console.log('Account deleted');
            // TODO: Implement account deletion
          },
        },
      ]
    );
  };

  const handlePushNotificationsToggle = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPushNotifications(value);
  };

  const handleEmailNotificationsToggle = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEmailNotifications(value);
  };

  const handleDarkModeToggle = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDarkMode(value);
    // TODO: Implement dark mode toggle
  };

  const handleLocationToggle = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLocationServices(value);
  };

  const accountSettings: SettingItem[] = [
    {
      id: 'profile',
      label: 'Edit Profile',
      icon: <User size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'navigation',
      onPress: handleEditProfile,
    },
    {
      id: 'password',
      label: 'Change Password',
      icon: <Lock size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'navigation',
      onPress: handleChangePassword,
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: <Shield size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'navigation',
      onPress: handlePrivacy,
    },
  ];

  const notificationSettings: SettingItem[] = [
    {
      id: 'push',
      label: 'Push Notifications',
      icon: <Bell size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'toggle',
      value: pushNotifications,
      onToggle: handlePushNotificationsToggle,
    },
    {
      id: 'email',
      label: 'Email Notifications',
      icon: <Mail size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'toggle',
      value: emailNotifications,
      onToggle: handleEmailNotificationsToggle,
    },
  ];

  const appSettings: SettingItem[] = [
    {
      id: 'dark',
      label: 'Dark Mode',
      icon: <Moon size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'toggle',
      value: darkMode,
      onToggle: handleDarkModeToggle,
    },
    {
      id: 'location',
      label: 'Location Services',
      icon: <Globe size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'toggle',
      value: locationServices,
      onToggle: handleLocationToggle,
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      id: 'help',
      label: 'Help Center',
      icon: <HelpCircle size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'navigation',
      onPress: handleHelp,
    },
    {
      id: 'terms',
      label: 'Terms & Conditions',
      icon: <FileText size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'navigation',
      onPress: handleTerms,
    },
    {
      id: 'support',
      label: 'Contact Support',
      icon: <Mail size={22} color={Colors.ui.text.primary} strokeWidth={2} />,
      type: 'navigation',
      onPress: handleSupport,
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    if (item.type === 'toggle') {
      return (
        <View key={item.id} style={styles.settingItem}>
          <View style={styles.settingItemLeft}>
            {item.icon}
            <Text style={styles.settingLabel}>{item.label}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{
              false: Colors.ui.background.tertiary,
              true: Colors.primary[400],
            }}
            thumbColor={Colors.neutral[100]}
            ios_backgroundColor={Colors.ui.background.tertiary}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        activeOpacity={0.7}>
        <View style={styles.settingItemLeft}>
          {item.icon}
          <Text
            style={[
              styles.settingLabel,
              item.destructive && styles.settingLabelDanger,
            ]}>
            {item.label}
          </Text>
        </View>
        <ChevronRight size={20} color={Colors.ui.text.tertiary} strokeWidth={2} />
      </TouchableOpacity>
    );
  };

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

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Card variant="elevated" padding="none">
            {accountSettings.map((item, index) => (
              <View key={item.id}>
                {renderSettingItem(item)}
                {index < accountSettings.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </Card>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Card variant="elevated" padding="none">
            {notificationSettings.map((item, index) => (
              <View key={item.id}>
                {renderSettingItem(item)}
                {index < notificationSettings.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </Card>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <Card variant="elevated" padding="none">
            {appSettings.map((item, index) => (
              <View key={item.id}>
                {renderSettingItem(item)}
                {index < appSettings.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </Card>
        </View>

        {/* Support Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Card variant="elevated" padding="none">
            {supportSettings.map((item, index) => (
              <View key={item.id}>
                {renderSettingItem(item)}
                {index < supportSettings.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </Card>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <Card variant="elevated" padding="none">
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleDeleteAccount}
              activeOpacity={0.7}>
              <View style={styles.settingItemLeft}>
                <Trash2 size={22} color={Colors.semantic.error} strokeWidth={2} />
                <Text style={styles.settingLabelDanger}>Delete Account</Text>
              </View>
              <ChevronRight
                size={20}
                color={Colors.ui.text.tertiary}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </Card>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>VYBZ CIRCLE</Text>
          <Text style={styles.versionNumber}>Version 1.0.0</Text>
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
  headerTitle: {
    ...Typography.Heading.h3,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing[5],
    paddingBottom: Spacing[10],
  },
  section: {
    marginBottom: Spacing[6],
  },
  sectionTitle: {
    ...Typography.Label.large,
    color: Colors.ui.text.tertiary,
    marginBottom: Spacing[3],
    paddingHorizontal: Spacing[1],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing[4],
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    flex: 1,
  },
  settingLabel: {
    ...Typography.Body.base,
    color: Colors.ui.text.primary,
  },
  settingLabelDanger: {
    color: Colors.semantic.error,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.ui.border.subtle,
    marginLeft: Spacing[4] + 22 + Spacing[3],
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: Spacing[8],
    gap: Spacing[1],
  },
  versionText: {
    ...Typography.Label.small,
    color: Colors.ui.text.tertiary,
    fontWeight: '800',
    letterSpacing: 2,
  },
  versionNumber: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
  },
});
