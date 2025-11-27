import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flame, Calendar, Award, Users, Settings, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <Text style={styles.name}>James Kamau</Text>
          <View style={styles.levelBadge}>
            <Flame size={16} color="#FF3B30" />
            <Text style={styles.levelText}>Level 6 Scout</Text>
          </View>
          <Text style={styles.repPoints}>1,240 Rep Points</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Calendar size={24} color="#FF3B30" />
            <Text style={styles.statValue}>23</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Flame size={24} color="#FF3B30" />
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Scouts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Award size={24} color="#FF3B30" />
            <Text style={styles.statValue}>67%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Crew</Text>
          <View style={styles.crewCard}>
            <View style={styles.crewShield}>
              <Users size={32} color="#FF3B30" />
            </View>
            <View style={styles.crewInfo}>
              <Text style={styles.crewName}>Kile-Gang</Text>
              <Text style={styles.crewMembers}>42 members · #2 in Nairobi</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={22} color="#FFFFFF" />
            <Text style={styles.menuText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <LogOut size={22} color="#FF3B30" />
            <Text style={[styles.menuText, { color: '#FF3B30' }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF3B30',
  },
  repPoints: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  stats: {
    flexDirection: 'row',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  crewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
  },
  crewShield: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  crewInfo: {
    flex: 1,
  },
  crewName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  crewMembers: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
