import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Share2,
  MapPin,
  Calendar,
  Clock,
  Ticket,
  Users,
  Flame,
  ChevronRight,
  Info,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { Button, Avatar, Badge, Card } from '@/components';

const { width, height } = Dimensions.get('window');

interface EventDetails {
  id: string;
  name: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  endTime: string;
  description: string;
  image: string;
  interested: number;
  going: number;
  trending: boolean;
  category: string;
  ticketTypes: {
    name: string;
    price: string;
    available: boolean;
  }[];
  friends: {
    name: string;
    avatar?: string;
  }[];
  organizer: {
    name: string;
    verified: boolean;
  };
}

// Mock data - would come from API
const MOCK_EVENT: EventDetails = {
  id: '1',
  name: 'Amapiano Sundays',
  venue: 'The Alchemist',
  address: 'Westlands, Nairobi',
  date: 'Sunday, December 1, 2024',
  time: '2:00 PM',
  endTime: '10:00 PM',
  category: 'Amapiano',
  description:
    'Join us for the hottest Amapiano session in Nairobi! Experience the best local and international DJs, amazing vibes, and unforgettable moments. This is THE Sunday event you cannot miss.\n\nDress Code: Smart Casual\nAge Limit: 18+\n\nFeaturing:\n• DJ Maphorisa\n• DJ Cleo Ice\n• DJ Shimza\n\nFull bar service available with signature cocktails and premium drinks.',
  image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  interested: 847,
  going: 234,
  trending: true,
  ticketTypes: [
    { name: 'Early Bird', price: '1,000', available: false },
    { name: 'General Admission', price: '1,500', available: true },
    { name: 'VIP Pass', price: '2,500', available: true },
  ],
  friends: [
    { name: 'Sarah M' },
    { name: 'John K' },
    { name: 'Mike T' },
    { name: 'Lisa W' },
    { name: 'David N' },
  ],
  organizer: {
    name: 'The Alchemist Events',
    verified: true,
  },
};

export default function EventDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [scouted, setScouted] = useState(false);

  // In real app, fetch event by ID
  const event = MOCK_EVENT;

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Share event');
    // TODO: Implement share functionality
  };

  const handleScout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setScouted(!scouted);
    console.log('Scout toggled:', !scouted);
  };

  const handleGetTickets = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/purchase/${event.id}`);
  };

  const handleVenuePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Venue pressed');
    // TODO: Navigate to venue details
  };

  const handleFriendsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Friends going pressed');
    // TODO: Show friends going modal
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: event.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(10, 10, 10, 0.8)', Colors.ui.background.primary]}
            style={styles.heroGradient}
          />

          {/* Header Controls */}
          <SafeAreaView style={styles.headerControls} edges={['top']}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleBack}
              activeOpacity={0.7}>
              <ArrowLeft size={24} color={Colors.neutral[100]} strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleShare}
              activeOpacity={0.7}>
              <Share2 size={22} color={Colors.neutral[100]} strokeWidth={2} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            {event.trending && (
              <Badge variant="warning" size="md">
                🔥 Trending
              </Badge>
            )}
            <Badge variant="primary" size="md">
              {event.category}
            </Badge>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.eventTitle}>{event.name}</Text>
            <Text style={styles.organizer}>
              by {event.organizer.name} {event.organizer.verified && '✓'}
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Flame size={18} color={Colors.primary[400]} strokeWidth={2} />
              <Text style={styles.statText}>{event.interested} interested</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Users size={18} color={Colors.accent.cyan[400]} strokeWidth={2} />
              <Text style={styles.statText}>{event.going} going</Text>
            </View>
          </View>

          {/* Details Cards */}
          <View style={styles.detailsSection}>
            {/* Venue */}
            <TouchableOpacity onPress={handleVenuePress} activeOpacity={0.9}>
              <Card variant="elevated" padding="md" interactive>
                <View style={styles.detailCard}>
                  <View style={styles.detailIcon}>
                    <MapPin size={20} color={Colors.primary[400]} strokeWidth={2} />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Venue</Text>
                    <Text style={styles.detailValue}>{event.venue}</Text>
                    <Text style={styles.detailSubtext}>{event.address}</Text>
                  </View>
                  <ChevronRight size={20} color={Colors.ui.text.tertiary} strokeWidth={2} />
                </View>
              </Card>
            </TouchableOpacity>

            {/* Date & Time */}
            <Card variant="elevated" padding="md">
              <View style={styles.detailCard}>
                <View style={styles.detailIcon}>
                  <Calendar size={20} color={Colors.accent.purple[400]} strokeWidth={2} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Date & Time</Text>
                  <Text style={styles.detailValue}>{event.date}</Text>
                  <Text style={styles.detailSubtext}>
                    {event.time} - {event.endTime}
                  </Text>
                </View>
              </View>
            </Card>
          </View>

          {/* Friends Going */}
          {event.friends.length > 0 && (
            <TouchableOpacity onPress={handleFriendsPress} activeOpacity={0.9}>
              <Card variant="outlined" padding="md" interactive>
                <View style={styles.friendsCard}>
                  <View style={styles.friendsAvatars}>
                    {event.friends.slice(0, 4).map((friend, index) => (
                      <View
                        key={index}
                        style={[
                          styles.friendAvatar,
                          index > 0 && { marginLeft: -Spacing[3] },
                        ]}>
                        <Avatar name={friend.name} size="sm" />
                      </View>
                    ))}
                  </View>
                  <View style={styles.friendsText}>
                    <Text style={styles.friendsLabel}>
                      {event.friends[0].name}
                      {event.friends.length > 1 &&
                        ` and ${event.friends.length - 1} other friend${event.friends.length > 2 ? 's' : ''} going`}
                    </Text>
                  </View>
                  <ChevronRight size={18} color={Colors.ui.text.tertiary} strokeWidth={2} />
                </View>
              </Card>
            </TouchableOpacity>
          )}

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {/* Ticket Types */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tickets</Text>
            {event.ticketTypes.map((ticket, index) => (
              <View key={index} style={styles.ticketRow}>
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketName}>{ticket.name}</Text>
                  {!ticket.available && (
                    <Text style={styles.soldOut}>Sold Out</Text>
                  )}
                </View>
                <Text style={styles.ticketPrice}>KES {ticket.price}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <SafeAreaView style={styles.bottomActions} edges={['bottom']}>
        <LinearGradient
          colors={[Colors.ui.background.primary, Colors.ui.background.primary]}
          style={styles.actionsGradient}>
          <View style={styles.actionsContent}>
            <Button
              variant={scouted ? 'outline' : 'ghost'}
              size="lg"
              onPress={handleScout}
              style={styles.scoutButton}>
              <Flame
                size={20}
                color={scouted ? Colors.primary[400] : Colors.ui.text.secondary}
                fill={scouted ? Colors.primary[400] : 'transparent'}
                strokeWidth={2}
              />
              {'  '}
              {scouted ? 'Scouted' : 'Scout'}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onPress={handleGetTickets}
              style={styles.ticketsButton}>
              <Ticket size={20} color={Colors.neutral[100]} strokeWidth={2} />
              {'  '}Get Tickets
            </Button>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroContainer: {
    height: height * 0.5,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  headerControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[2],
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(10, 10, 10, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgesContainer: {
    position: 'absolute',
    bottom: Spacing[6],
    left: Spacing[5],
    flexDirection: 'row',
    gap: Spacing[2],
  },
  content: {
    padding: Spacing[5],
    gap: Spacing[6],
    marginTop: -Spacing[4],
  },
  titleSection: {
    gap: Spacing[2],
  },
  eventTitle: {
    ...Typography.Display.small,
    color: Colors.ui.text.primary,
  },
  organizer: {
    ...Typography.Body.base,
    color: Colors.ui.text.tertiary,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  statText: {
    ...Typography.Label.base,
    color: Colors.ui.text.secondary,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.ui.border.subtle,
  },
  detailsSection: {
    gap: Spacing[3],
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.ui.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
    gap: Spacing[1],
  },
  detailLabel: {
    ...Typography.Caption.base,
    color: Colors.ui.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailValue: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  detailSubtext: {
    ...Typography.Body.small,
    color: Colors.ui.text.secondary,
  },
  friendsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  friendsAvatars: {
    flexDirection: 'row',
  },
  friendAvatar: {
    borderWidth: 2,
    borderColor: Colors.ui.background.primary,
    borderRadius: 20,
  },
  friendsText: {
    flex: 1,
  },
  friendsLabel: {
    ...Typography.Body.base,
    color: Colors.ui.text.primary,
  },
  section: {
    gap: Spacing[4],
  },
  sectionTitle: {
    ...Typography.Heading.h3,
  },
  description: {
    ...Typography.Body.base,
    color: Colors.ui.text.secondary,
    lineHeight: 24,
  },
  ticketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border.subtle,
  },
  ticketInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  ticketName: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  soldOut: {
    ...Typography.Caption.small,
    color: Colors.semantic.error,
  },
  ticketPrice: {
    ...Typography.Label.large,
    color: Colors.primary[400],
    fontWeight: '700',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border.subtle,
  },
  actionsGradient: {
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
  },
  actionsContent: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  scoutButton: {
    flex: 1,
  },
  ticketsButton: {
    flex: 2,
  },
});
