import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, Flame, MapPin, Calendar, DollarSign, Users } from 'lucide-react-native';

const MOCK_EVENTS = [
  {
    id: '1',
    name: 'Amapiano Sundays',
    venue: 'The Alchemist',
    distance: '2.3km',
    date: 'Sun, Dec 1',
    time: '2PM - 10PM',
    price: '1,000 - 2,500',
    interested: 847,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    trending: true,
    friends: 12,
  },
  {
    id: '2',
    name: 'Jazz Night at Sarabi',
    venue: 'Sarabi Rooftop',
    distance: '4.1km',
    date: 'Fri, Nov 29',
    time: '7PM - 11PM',
    price: '1,500',
    interested: 423,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    trending: false,
    friends: 5,
  },
  {
    id: '3',
    name: 'Koroga Festival',
    venue: 'Ngong Racecourse',
    distance: '8.7km',
    date: 'Sat, Nov 30',
    time: '12PM - 10PM',
    price: '2,000 - 5,000',
    interested: 4521,
    image: 'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg',
    trending: true,
    friends: 34,
  },
];

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tonight');

  const filters = ['Tonight', 'This Weekend', 'Free Entry', 'Near Me'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>J</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Hey James!</Text>
              <View style={styles.levelBadge}>
                <Flame size={12} color="#FF3B30" />
                <Text style={styles.levelText}>Level 6 Scout</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#FFFFFF" strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, venues, or vibes..."
            placeholderTextColor="#666666"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
          {MOCK_EVENTS.filter((e) => e.trending).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Vibes</Text>
          {MOCK_EVENTS.filter((e) => !e.trending).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EventCard({ event }: { event: typeof MOCK_EVENTS[0] }) {
  return (
    <TouchableOpacity style={styles.eventCard} activeOpacity={0.9}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.eventGradient}
      />

      {event.trending && (
        <View style={styles.trendingBadge}>
          <Flame size={14} color="#FFFFFF" />
          <Text style={styles.trendingText}>{event.interested} interested</Text>
        </View>
      )}

      <View style={styles.eventContent}>
        <Text style={styles.eventName}>{event.name}</Text>

        <View style={styles.eventMeta}>
          <View style={styles.metaRow}>
            <MapPin size={14} color="#FF3B30" />
            <Text style={styles.metaText}>
              {event.venue} · {event.distance}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Calendar size={14} color="#FF3B30" />
            <Text style={styles.metaText}>
              {event.date} · {event.time}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <DollarSign size={14} color="#FF3B30" />
            <Text style={styles.metaText}>KES {event.price}</Text>
          </View>
        </View>

        {event.friends > 0 && (
          <View style={styles.friendsRow}>
            <View style={styles.friendsAvatars}>
              <View style={styles.friendAvatar} />
              <View style={[styles.friendAvatar, { marginLeft: -8 }]} />
              <View style={[styles.friendAvatar, { marginLeft: -8 }]} />
            </View>
            <Text style={styles.friendsText}>{event.friends} friends going</Text>
          </View>
        )}

        <View style={styles.eventActions}>
          <TouchableOpacity style={styles.scoutButton}>
            <Flame size={18} color="#FF3B30" />
            <Text style={styles.scoutButtonText}>Scout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ticketsButton}>
            <Text style={styles.ticketsButtonText}>Get Tickets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  filtersContainer: {
    marginHorizontal: -20,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  filterChipActive: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 20,
    letterSpacing: -0.5,
  },
  eventCard: {
    marginBottom: 24,
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  eventImage: {
    width: '100%',
    height: 240,
  },
  eventGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 240,
  },
  trendingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  trendingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  eventContent: {
    padding: 20,
  },
  eventName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  eventMeta: {
    gap: 8,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#CCCCCC',
  },
  friendsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  friendsAvatars: {
    flexDirection: 'row',
  },
  friendAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  friendsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999999',
  },
  eventActions: {
    flexDirection: 'row',
    gap: 12,
  },
  scoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  scoutButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF3B30',
  },
  ticketsButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  ticketsButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
