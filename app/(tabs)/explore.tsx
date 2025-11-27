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
import { MapPin, Grid3x3, List, Star, Users, Music, Coffee, Wine } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { SearchBar, Card, Badge } from '@/components';

const { width } = Dimensions.get('window');

interface Venue {
  id: string;
  name: string;
  type: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
  popular: boolean;
  vibes: string[];
}

const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'The Alchemist',
    type: 'Bar & Lounge',
    distance: '2.3km',
    rating: 4.8,
    reviews: 342,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    popular: true,
    vibes: ['Amapiano', 'Rooftop', 'Cocktails'],
  },
  {
    id: '2',
    name: 'Sarabi Rooftop',
    type: 'Restaurant & Bar',
    distance: '4.1km',
    rating: 4.6,
    reviews: 218,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    popular: true,
    vibes: ['Jazz', 'Fine Dining', 'Sunset'],
  },
  {
    id: '3',
    name: 'Brew Bistro',
    type: 'Coffee Shop',
    distance: '1.2km',
    rating: 4.9,
    reviews: 567,
    image: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg',
    popular: false,
    vibes: ['Coffee', 'Brunch', 'Work-Friendly'],
  },
  {
    id: '4',
    name: 'K1 Klubhouse',
    type: 'Nightclub',
    distance: '3.7km',
    rating: 4.5,
    reviews: 891,
    image: 'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg',
    popular: true,
    vibes: ['EDM', 'Late Night', 'Dancing'],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Grid3x3 },
  { id: 'bars', label: 'Bars', icon: Wine },
  { id: 'restaurants', label: 'Restaurants', icon: Coffee },
  { id: 'clubs', label: 'Clubs', icon: Music },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleViewModeToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setViewMode((prev) => (prev === 'list' ? 'map' : 'list'));
  };

  const handleCategorySelect = (categoryId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(categoryId);
  };

  const handleVenuePress = (venue: Venue) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Venue pressed:', venue.name);
    // TODO: Navigate to venue details
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>

        {/* View Mode Toggle */}
        <TouchableOpacity
          style={styles.viewModeButton}
          onPress={handleViewModeToggle}
          activeOpacity={0.7}>
          {viewMode === 'list' ? (
            <MapPin size={22} color={Colors.ui.text.primary} strokeWidth={2} />
          ) : (
            <List size={22} color={Colors.ui.text.primary} strokeWidth={2} />
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search venues, vibes, or areas..."
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContent}
        style={styles.categories}>
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
              onPress={() => handleCategorySelect(category.id)}
              activeOpacity={0.7}>
              <Icon
                size={18}
                color={isSelected ? Colors.neutral[100] : Colors.ui.text.secondary}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.categoryLabel,
                  isSelected && styles.categoryLabelActive,
                ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Content */}
      {viewMode === 'map' ? (
        <View style={styles.mapPlaceholder}>
          <MapPin size={64} color={Colors.ui.text.tertiary} strokeWidth={1.5} />
          <Text style={styles.mapTitle}>Map View</Text>
          <Text style={styles.mapSubtitle}>Interactive map coming soon</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          {/* Popular Venues */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Near You</Text>

            {MOCK_VENUES.filter((v) => v.popular).map((venue) => (
              <TouchableOpacity
                key={venue.id}
                onPress={() => handleVenuePress(venue)}
                activeOpacity={0.9}>
                <Card variant="elevated" padding="none" style={styles.venueCard}>
                  <View style={styles.venueContent}>
                    <View style={styles.venueInfo}>
                      <View style={styles.venueHeader}>
                        <Text style={styles.venueName}>{venue.name}</Text>
                        {venue.popular && (
                          <Badge variant="warning" size="sm">
                            Popular
                          </Badge>
                        )}
                      </View>

                      <View style={styles.venueMetadata}>
                        <Text style={styles.venueType}>{venue.type}</Text>
                        <View style={styles.venueDivider} />
                        <MapPin
                          size={12}
                          color={Colors.ui.text.tertiary}
                          strokeWidth={2}
                        />
                        <Text style={styles.venueDistance}>{venue.distance}</Text>
                      </View>

                      <View style={styles.venueRating}>
                        <Star
                          size={14}
                          color={Colors.accent.gold[400]}
                          fill={Colors.accent.gold[400]}
                          strokeWidth={2}
                        />
                        <Text style={styles.ratingText}>{venue.rating}</Text>
                        <Text style={styles.reviewsText}>({venue.reviews} reviews)</Text>
                      </View>

                      <View style={styles.vibesContainer}>
                        {venue.vibes.map((vibe, index) => (
                          <View key={index} style={styles.vibeTag}>
                            <Text style={styles.vibeText}>{vibe}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          {/* All Venues */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Venues</Text>

            {MOCK_VENUES.map((venue) => (
              <TouchableOpacity
                key={venue.id}
                onPress={() => handleVenuePress(venue)}
                activeOpacity={0.9}>
                <Card variant="outlined" padding="md" style={styles.venueCardCompact}>
                  <View style={styles.venueCompactContent}>
                    <View style={styles.venueCompactInfo}>
                      <Text style={styles.venueCompactName}>{venue.name}</Text>
                      <View style={styles.venueCompactMeta}>
                        <Star
                          size={12}
                          color={Colors.accent.gold[400]}
                          fill={Colors.accent.gold[400]}
                          strokeWidth={2}
                        />
                        <Text style={styles.venueCompactRating}>{venue.rating}</Text>
                        <View style={styles.venueDivider} />
                        <MapPin
                          size={12}
                          color={Colors.ui.text.tertiary}
                          strokeWidth={2}
                        />
                        <Text style={styles.venueCompactDistance}>
                          {venue.distance}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
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
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.ui.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
  },
  categories: {
    marginBottom: Spacing[4],
  },
  categoriesContent: {
    paddingHorizontal: Spacing[5],
    gap: Spacing[3],
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[4],
    borderRadius: Spacing[5],
    backgroundColor: Colors.ui.background.secondary,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary[400],
  },
  categoryLabel: {
    ...Typography.Label.base,
    color: Colors.ui.text.secondary,
  },
  categoryLabelActive: {
    color: Colors.neutral[100],
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing[5],
    paddingBottom: Spacing[10],
  },
  section: {
    marginBottom: Spacing[8],
  },
  sectionTitle: {
    ...Typography.Heading.h3,
    marginBottom: Spacing[5],
  },
  venueCard: {
    marginBottom: Spacing[4],
  },
  venueContent: {
    padding: Spacing[4],
  },
  venueInfo: {
    gap: Spacing[3],
  },
  venueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  venueName: {
    ...Typography.Heading.h4,
    flex: 1,
  },
  venueMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  venueType: {
    ...Typography.Body.small,
    color: Colors.ui.text.secondary,
  },
  venueDivider: {
    width: 1,
    height: 12,
    backgroundColor: Colors.ui.border.subtle,
  },
  venueDistance: {
    ...Typography.Body.small,
    color: Colors.ui.text.tertiary,
  },
  venueRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  ratingText: {
    ...Typography.Label.base,
    color: Colors.ui.text.primary,
  },
  reviewsText: {
    ...Typography.Body.small,
    color: Colors.ui.text.tertiary,
  },
  vibesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
  vibeTag: {
    paddingVertical: Spacing[1],
    paddingHorizontal: Spacing[3],
    borderRadius: Spacing[4],
    backgroundColor: Colors.ui.background.tertiary,
  },
  vibeText: {
    ...Typography.Caption.base,
    color: Colors.ui.text.secondary,
  },
  venueCardCompact: {
    marginBottom: Spacing[3],
  },
  venueCompactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  venueCompactInfo: {
    flex: 1,
    gap: Spacing[1],
  },
  venueCompactName: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  venueCompactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  venueCompactRating: {
    ...Typography.Body.small,
    color: Colors.ui.text.secondary,
  },
  venueCompactDistance: {
    ...Typography.Body.small,
    color: Colors.ui.text.tertiary,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[10],
    gap: Spacing[4],
  },
  mapTitle: {
    ...Typography.Heading.h3,
    color: Colors.ui.text.primary,
  },
  mapSubtitle: {
    ...Typography.Body.base,
    color: Colors.ui.text.tertiary,
    textAlign: 'center',
  },
});
