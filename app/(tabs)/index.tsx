import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Flame } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants';
import { EventCard, SearchBar, FilterChips, Avatar, Badge, Event, FilterOption } from '@/components';

const MOCK_EVENTS: Event[] = [
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

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'tonight', label: 'Tonight' },
  { id: 'weekend', label: 'This Weekend' },
  { id: 'free', label: 'Free Entry' },
  { id: 'nearby', label: 'Near Me' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['tonight']);

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilters([filterId]);
  };

  const handleEventPress = (event: Event) => {
    console.log('Event pressed:', event.name);
    // TODO: Navigate to event details
  };

  const handleScout = (event: Event) => {
    console.log('Scout event:', event.name);
    // TODO: Implement scout functionality
  };

  const handleGetTickets = (event: Event) => {
    console.log('Get tickets:', event.name);
    // TODO: Navigate to ticket purchase
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        {/* User Info */}
        <View style={styles.headerTop}>
          <View style={styles.userInfo}>
            <Avatar name="James Kamau" fallback="J" size="lg" />
            <View style={styles.userDetails}>
              <Text style={styles.greeting}>Hey James!</Text>
              <Badge variant="primary" size="sm">
                <Flame size={10} color={Colors.primary[400]} strokeWidth={2} />
                {'  '}Level 6 Scout
              </Badge>
            </View>
          </View>

          {/* Notification Button */}
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={Colors.ui.text.primary} strokeWidth={2} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search events, venues, or vibes..."
        />

        {/* Filter Chips */}
        <FilterChips
          options={FILTER_OPTIONS}
          selected={selectedFilters}
          onSelect={handleFilterSelect}
          multiSelect={false}
          style={styles.filters}
        />
      </View>

      {/* Events List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Trending Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
          {MOCK_EVENTS.filter((e) => e.trending).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="default"
              onPress={handleEventPress}
              onScout={handleScout}
              onGetTickets={handleGetTickets}
            />
          ))}
        </View>

        {/* Your Vibes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Vibes</Text>
          {MOCK_EVENTS.filter((e) => !e.trending).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="default"
              onPress={handleEventPress}
              onScout={handleScout}
              onGetTickets={handleGetTickets}
            />
          ))}
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
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[2],
    paddingBottom: Spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border.subtle,
    gap: Spacing[4],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  userDetails: {
    gap: Spacing[1],
  },
  greeting: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.ui.background.secondary,
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
    backgroundColor: Colors.primary[400],
  },
  filters: {
    marginHorizontal: -Spacing[5],
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: Spacing[6],
    paddingBottom: Spacing[10],
  },
  section: {
    marginBottom: Spacing[8],
  },
  sectionTitle: {
    ...Typography.Heading.h3,
    marginBottom: Spacing[5],
    paddingHorizontal: Spacing[5],
  },
});
