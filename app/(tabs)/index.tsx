import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Flame } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { EventCard, SearchBar, FilterChips, Avatar, Badge, Event, FilterOption, SkeletonCard } from '@/components';

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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['tonight']);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch
    const loadInitialData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setLoading(false);
    };
    loadInitialData();
  }, []);

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilters([filterId]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Fetch fresh event data

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setRefreshing(false);
  };

  const handleEventPress = (event: Event) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/event/${event.id}`);
  };

  const handleScout = (event: Event) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    console.log('Scout event:', event.name);
    // TODO: Implement scout functionality
  };

  const handleGetTickets = (event: Event) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Get tickets:', event.name);
    // TODO: Navigate to ticket purchase
  };

  const handleNotificationPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/notifications');
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
          <TouchableOpacity style={styles.iconButton} onPress={handleNotificationPress} activeOpacity={0.7}>
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
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary[400]}
            colors={[Colors.primary[400]]}
            progressBackgroundColor={Colors.ui.background.secondary}
          />
        }>
        {loading ? (
          <>
            {/* Loading Skeletons */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Events ✨</Text>
              <View style={styles.skeletonContainer}>
                <SkeletonCard height={420} style={styles.skeletonCard} />
                <SkeletonCard height={420} style={styles.skeletonCard} />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Vibes</Text>
              <View style={styles.skeletonContainer}>
                <SkeletonCard height={380} style={styles.skeletonCard} />
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Featured Events Carousel */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Events ✨</Text>
              <FlatList
                horizontal
                data={MOCK_EVENTS.filter((e) => e.trending)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.carouselItem}>
                    <EventCard
                      event={item}
                      variant="featured"
                      onPress={handleEventPress}
                      onScout={handleScout}
                      onGetTickets={handleGetTickets}
                    />
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
                snapToInterval={340}
                decelerationRate="fast"
                onScrollBeginDrag={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              />
            </View>

            {/* All Events Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>All Events</Text>
              {MOCK_EVENTS.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="compact"
                  onPress={handleEventPress}
                  onScout={handleScout}
                  onGetTickets={handleGetTickets}
                />
              ))}
            </View>
          </>
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
  skeletonContainer: {
    gap: Spacing[4],
    paddingHorizontal: Spacing[5],
  },
  skeletonCard: {
    marginBottom: Spacing[4],
  },
  carouselContent: {
    paddingHorizontal: Spacing[5],
    gap: Spacing[4],
  },
  carouselItem: {
    width: 320,
  },
});
