/**
 * VYBZ CIRCLE - EventCard Component
 *
 * Feature-rich event card with images, metadata, and actions
 * The hero component used throughout the app
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Calendar, DollarSign, Flame, Users } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Layout, Shadows } from '@/constants';
import { Badge } from './Badge';
import { Avatar } from './Avatar';

// ============================================
// TYPES
// ============================================

export interface Event {
  id: string;
  name: string;
  venue: string;
  distance?: string;
  date: string;
  time: string;
  price: string;
  interested?: number;
  image: string | ImageSourcePropType;
  trending?: boolean;
  friends?: number;
  friendAvatars?: ImageSourcePropType[];
  category?: string;
}

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact' | 'featured';
  onPress?: (event: Event) => void;
  onScout?: (event: Event) => void;
  onGetTickets?: (event: Event) => void;
  showActions?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export const EventCard: React.FC<EventCardProps> = ({
  event,
  variant = 'default',
  onPress,
  onScout,
  onGetTickets,
  showActions = true,
}) => {
  const handleCardPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(event);
  };

  const handleScout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onScout?.(event);
  };

  const handleGetTickets = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onGetTickets?.(event);
  };

  if (variant === 'compact') {
    return <CompactEventCard event={event} onPress={handleCardPress} />;
  }

  if (variant === 'featured') {
    return (
      <FeaturedEventCard
        event={event}
        onPress={handleCardPress}
        onScout={handleScout}
        onGetTickets={handleGetTickets}
      />
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={handleCardPress}>
      {/* Event Image */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof event.image === 'string' ? { uri: event.image } : event.image}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={Colors.gradients.overlay}
          style={styles.imageGradient}
        />

        {/* Trending Badge */}
        {event.trending && event.interested && (
          <View style={styles.trendingBadge}>
            <Flame size={14} color={Colors.ui.text.primary} strokeWidth={2} />
            <Text style={styles.trendingText}>
              {event.interested >= 1000
                ? `${(event.interested / 1000).toFixed(1)}k`
                : event.interested}{' '}
              interested
            </Text>
          </View>
        )}

        {/* Category Badge */}
        {event.category && (
          <View style={styles.categoryBadge}>
            <Badge variant="neutral" size="sm">
              {event.category}
            </Badge>
          </View>
        )}
      </View>

      {/* Event Content */}
      <View style={styles.content}>
        {/* Event Name */}
        <Text style={styles.eventName} numberOfLines={2}>
          {event.name}
        </Text>

        {/* Event Metadata */}
        <View style={styles.metadata}>
          {/* Location */}
          <View style={styles.metaRow}>
            <MapPin size={14} color={Colors.primary[400]} strokeWidth={2} />
            <Text style={styles.metaText} numberOfLines={1}>
              {event.venue}
              {event.distance && ` · ${event.distance}`}
            </Text>
          </View>

          {/* Date & Time */}
          <View style={styles.metaRow}>
            <Calendar size={14} color={Colors.primary[400]} strokeWidth={2} />
            <Text style={styles.metaText}>
              {event.date} · {event.time}
            </Text>
          </View>

          {/* Price */}
          <View style={styles.metaRow}>
            <DollarSign size={14} color={Colors.primary[400]} strokeWidth={2} />
            <Text style={styles.metaText}>KES {event.price}</Text>
          </View>
        </View>

        {/* Friends Going */}
        {event.friends && event.friends > 0 && (
          <View style={styles.friendsSection}>
            <View style={styles.friendsAvatars}>
              {event.friendAvatars && event.friendAvatars.length > 0 ? (
                event.friendAvatars.slice(0, 3).map((avatar, index) => (
                  <View
                    key={index}
                    style={[styles.friendAvatar, index > 0 && styles.friendAvatarOverlap]}>
                    <Avatar source={avatar} size="xs" />
                  </View>
                ))
              ) : (
                <>
                  <View style={styles.friendAvatarPlaceholder} />
                  <View style={[styles.friendAvatarPlaceholder, styles.friendAvatarOverlap]} />
                  <View style={[styles.friendAvatarPlaceholder, styles.friendAvatarOverlap]} />
                </>
              )}
            </View>
            <Text style={styles.friendsText}>
              {event.friends} friend{event.friends > 1 ? 's' : ''} going
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        {showActions && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.scoutButton}
              onPress={handleScout}
              activeOpacity={0.7}>
              <Flame size={18} color={Colors.primary[400]} strokeWidth={2} />
              <Text style={styles.scoutButtonText}>Scout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ticketsButton}
              onPress={handleGetTickets}
              activeOpacity={0.8}>
              <LinearGradient
                colors={Colors.gradients.primary}
                style={styles.ticketsButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.ticketsButtonText}>Get Tickets</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// COMPACT VARIANT
// ============================================

const CompactEventCard: React.FC<{ event: Event; onPress: () => void }> = ({
  event,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.9}>
      <Image
        source={typeof event.image === 'string' ? { uri: event.image } : event.image}
        style={styles.compactImage}
        resizeMode="cover"
      />

      <View style={styles.compactContent}>
        <Text style={styles.compactName} numberOfLines={1}>
          {event.name}
        </Text>
        <Text style={styles.compactMeta} numberOfLines={1}>
          {event.venue} · {event.date}
        </Text>
        <Text style={styles.compactPrice}>KES {event.price}</Text>
      </View>

      {event.trending && (
        <View style={styles.compactBadge}>
          <Flame size={16} color={Colors.primary[400]} strokeWidth={2} />
        </View>
      )}
    </TouchableOpacity>
  );
};

// ============================================
// FEATURED VARIANT
// ============================================

const FeaturedEventCard: React.FC<{
  event: Event;
  onPress: () => void;
  onScout: () => void;
  onGetTickets: () => void;
}> = ({ event, onPress, onScout, onGetTickets }) => {
  return (
    <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.95}>
      <Image
        source={typeof event.image === 'string' ? { uri: event.image } : event.image}
        style={styles.featuredImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
        style={styles.featuredGradient}
      />

      {event.trending && (
        <View style={styles.featuredTrendingBadge}>
          <Flame size={20} color={Colors.ui.text.primary} strokeWidth={2} />
          <Text style={styles.featuredTrendingText}>TRENDING</Text>
        </View>
      )}

      <View style={styles.featuredContent}>
        <Text style={styles.featuredName}>{event.name}</Text>
        <Text style={styles.featuredVenue}>
          {event.venue} · {event.date}
        </Text>

        <View style={styles.featuredActions}>
          <TouchableOpacity style={styles.featuredScoutButton} onPress={onScout}>
            <Flame size={20} color={Colors.ui.text.primary} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.featuredTicketsButton} onPress={onGetTickets}>
            <Text style={styles.featuredTicketsText}>Get Tickets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  // Default Card
  card: {
    backgroundColor: Colors.ui.background.secondary,
    borderRadius: Layout.radius['2xl'],
    overflow: 'hidden',
    marginBottom: Spacing[6],
    ...Shadows.lg,
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 240,
  },

  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.neutral[30],
  },

  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  trendingBadge: {
    position: 'absolute',
    top: Spacing[4],
    right: Spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
    backgroundColor: Colors.primary[400],
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderRadius: Layout.radius.full,
    ...Shadows.glowPrimary,
  },

  trendingText: {
    ...Typography.Label.tiny,
    color: Colors.ui.text.primary,
    fontWeight: '700',
  },

  categoryBadge: {
    position: 'absolute',
    top: Spacing[4],
    left: Spacing[4],
  },

  content: {
    padding: Spacing[5],
  },

  eventName: {
    ...Typography.Heading.h4,
    marginBottom: Spacing[3],
  },

  metadata: {
    gap: Spacing[2],
    marginBottom: Spacing[4],
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },

  metaText: {
    ...Typography.Body.small,
    color: Colors.ui.text.secondary,
    flex: 1,
  },

  friendsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingTop: Spacing[3],
    marginBottom: Spacing[4],
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border.default,
  },

  friendsAvatars: {
    flexDirection: 'row',
  },

  friendAvatar: {},

  friendAvatarOverlap: {
    marginLeft: -Spacing[2],
  },

  friendAvatarPlaceholder: {
    width: Layout.sizes.avatarXs,
    height: Layout.sizes.avatarXs,
    borderRadius: Layout.sizes.avatarXs / 2,
    backgroundColor: Colors.primary[400],
    borderWidth: 2,
    borderColor: Colors.ui.background.secondary,
  },

  friendsText: {
    ...Typography.Caption.medium,
    color: Colors.ui.text.tertiary,
    fontWeight: '600',
  },

  actions: {
    flexDirection: 'row',
    gap: Spacing[3],
  },

  scoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    height: Layout.sizes.buttonMd,
    borderRadius: Layout.radius.lg,
    backgroundColor: Colors.semantic.errorBg,
    borderWidth: 1,
    borderColor: Colors.primary[400],
  },

  scoutButtonText: {
    ...Typography.ButtonText.small,
    color: Colors.primary[400],
  },

  ticketsButton: {
    flex: 2,
    height: Layout.sizes.buttonMd,
    borderRadius: Layout.radius.lg,
    overflow: 'hidden',
    ...Shadows.glowPrimary,
  },

  ticketsButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ticketsButtonText: {
    ...Typography.ButtonText.small,
    color: Colors.ui.text.primary,
  },

  // Compact Card
  compactCard: {
    flexDirection: 'row',
    backgroundColor: Colors.ui.background.secondary,
    borderRadius: Layout.radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing[3],
    ...Shadows.md,
  },

  compactImage: {
    width: 100,
    height: 100,
    backgroundColor: Colors.neutral[30],
  },

  compactContent: {
    flex: 1,
    padding: Spacing[3],
    justifyContent: 'center',
  },

  compactName: {
    ...Typography.Label.medium,
    color: Colors.ui.text.primary,
    marginBottom: Spacing[1],
  },

  compactMeta: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
    marginBottom: Spacing[1],
  },

  compactPrice: {
    ...Typography.Label.small,
    color: Colors.primary[400],
  },

  compactBadge: {
    position: 'absolute',
    top: Spacing[2],
    right: Spacing[2],
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.semantic.errorBg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Featured Card
  featuredCard: {
    height: 400,
    borderRadius: Layout.radius['2xl'],
    overflow: 'hidden',
    marginBottom: Spacing[6],
    ...Shadows.xl,
  },

  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  featuredGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },

  featuredTrendingBadge: {
    position: 'absolute',
    top: Spacing[5],
    right: Spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    backgroundColor: Colors.primary[400],
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderRadius: Layout.radius.full,
    ...Shadows.glowPrimaryStrong,
  },

  featuredTrendingText: {
    ...Typography.Label.small,
    color: Colors.ui.text.primary,
    fontWeight: '800',
    letterSpacing: 1,
  },

  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing[6],
  },

  featuredName: {
    ...Typography.Heading.h2,
    marginBottom: Spacing[2],
  },

  featuredVenue: {
    ...Typography.Body.large,
    color: Colors.ui.text.secondary,
    marginBottom: Spacing[5],
  },

  featuredActions: {
    flexDirection: 'row',
    gap: Spacing[3],
    alignItems: 'center',
  },

  featuredScoutButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.semantic.errorBg,
    borderWidth: 2,
    borderColor: Colors.primary[400],
    alignItems: 'center',
    justifyContent: 'center',
  },

  featuredTicketsButton: {
    flex: 1,
    height: 56,
    borderRadius: Layout.radius.xl,
    backgroundColor: Colors.primary[400],
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.glowPrimaryStrong,
  },

  featuredTicketsText: {
    ...Typography.ButtonText.medium,
    color: Colors.ui.text.primary,
  },
});

export default EventCard;
