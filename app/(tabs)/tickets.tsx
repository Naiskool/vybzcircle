import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ticket as TicketIcon, Clock, CheckCircle, XCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { TicketCard, EmptyState } from '@/components';

interface Ticket {
  id: string;
  eventName: string;
  venue: string;
  date: string;
  time: string;
  ticketType: string;
  qrCode: string;
  status: 'upcoming' | 'used' | 'cancelled' | 'expired';
  seatInfo?: string;
  orderNumber: string;
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    eventName: 'Amapiano Sundays',
    venue: 'The Alchemist',
    date: 'Sun, Dec 1',
    time: '2PM',
    ticketType: 'VIP Pass',
    qrCode: 'TKT-AMP-2024-001',
    status: 'upcoming',
    seatInfo: 'Section A, Table 5',
    orderNumber: 'ORD-2024-11-001',
  },
  {
    id: '2',
    eventName: 'Jazz Night at Sarabi',
    venue: 'Sarabi Rooftop',
    date: 'Fri, Nov 29',
    time: '7PM',
    ticketType: 'General Admission',
    qrCode: 'TKT-JZZ-2024-002',
    status: 'upcoming',
    orderNumber: 'ORD-2024-11-002',
  },
  {
    id: '3',
    eventName: 'Blankets & Wine',
    venue: 'Uhuru Gardens',
    date: 'Sun, Nov 24',
    time: '12PM',
    ticketType: 'Early Bird',
    qrCode: 'TKT-BNW-2024-003',
    status: 'used',
    orderNumber: 'ORD-2024-11-003',
  },
];

export default function TicketsScreen() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  const handleFilterChange = (newFilter: typeof filter) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFilter(newFilter);
  };

  const handleTicketPress = (ticket: Ticket) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Ticket pressed:', ticket.eventName);
    // TODO: Navigate to ticket details
  };

  const handleShare = (ticket: Ticket) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Share ticket:', ticket.eventName);
    // TODO: Implement share functionality
  };

  const handleDownload = (ticket: Ticket) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Download ticket:', ticket.eventName);
    // TODO: Implement download functionality
  };

  const filteredTickets = MOCK_TICKETS.filter((ticket) => {
    if (filter === 'upcoming') return ticket.status === 'upcoming';
    if (filter === 'past')
      return ['used', 'cancelled', 'expired'].includes(ticket.status);
    return true;
  });

  const upcomingCount = MOCK_TICKETS.filter((t) => t.status === 'upcoming').length;
  const pastCount = MOCK_TICKETS.filter((t) =>
    ['used', 'cancelled', 'expired'].includes(t.status)
  ).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <View style={styles.ticketCount}>
          <TicketIcon size={18} color={Colors.primary[400]} strokeWidth={2} />
          <Text style={styles.ticketCountText}>{MOCK_TICKETS.length} Total</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'upcoming' && styles.filterButtonActive]}
          onPress={() => handleFilterChange('upcoming')}
          activeOpacity={0.7}>
          <Clock
            size={16}
            color={
              filter === 'upcoming' ? Colors.neutral[100] : Colors.ui.text.secondary
            }
            strokeWidth={2}
          />
          <Text
            style={[
              styles.filterButtonText,
              filter === 'upcoming' && styles.filterButtonTextActive,
            ]}>
            Upcoming
          </Text>
          {upcomingCount > 0 && (
            <View
              style={[
                styles.filterBadge,
                filter === 'upcoming' && styles.filterBadgeActive,
              ]}>
              <Text
                style={[
                  styles.filterBadgeText,
                  filter === 'upcoming' && styles.filterBadgeTextActive,
                ]}>
                {upcomingCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'past' && styles.filterButtonActive]}
          onPress={() => handleFilterChange('past')}
          activeOpacity={0.7}>
          <CheckCircle
            size={16}
            color={filter === 'past' ? Colors.neutral[100] : Colors.ui.text.secondary}
            strokeWidth={2}
          />
          <Text
            style={[
              styles.filterButtonText,
              filter === 'past' && styles.filterButtonTextActive,
            ]}>
            Past
          </Text>
          {pastCount > 0 && (
            <View
              style={[
                styles.filterBadge,
                filter === 'past' && styles.filterBadgeActive,
              ]}>
              <Text
                style={[
                  styles.filterBadgeText,
                  filter === 'past' && styles.filterBadgeTextActive,
                ]}>
                {pastCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => handleFilterChange('all')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.filterButtonText,
              filter === 'all' && styles.filterButtonTextActive,
            ]}>
            All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {filteredTickets.length === 0 ? (
          <EmptyState
            icon={
              <TicketIcon size={64} color={Colors.ui.text.tertiary} strokeWidth={1.5} />
            }
            title={filter === 'upcoming' ? 'No Upcoming Tickets' : 'No Past Tickets'}
            description={
              filter === 'upcoming'
                ? "You don't have any upcoming events. Explore and book your next vybe!"
                : "You haven't attended any events yet."
            }
            actionLabel={filter === 'upcoming' ? 'Explore Events' : undefined}
            onAction={
              filter === 'upcoming'
                ? () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    console.log('Navigate to explore');
                    // TODO: Navigate to explore tab
                  }
                : undefined
            }
          />
        ) : (
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              eventName={ticket.eventName}
              venue={ticket.venue}
              date={ticket.date}
              time={ticket.time}
              ticketType={ticket.ticketType}
              qrCode={ticket.qrCode}
              status={ticket.status}
              seatInfo={ticket.seatInfo}
              orderNumber={ticket.orderNumber}
              onPress={() => handleTicketPress(ticket)}
              onShare={() => handleShare(ticket)}
              onDownload={() => handleDownload(ticket)}
            />
          ))
        )}

        {/* Help Section */}
        {filteredTickets.length > 0 && (
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              Contact support if you have issues with your tickets or need assistance.
            </Text>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                console.log('Contact support');
                // TODO: Navigate to support
              }}
              activeOpacity={0.7}>
              <Text style={styles.helpButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
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
  headerTitle: {
    ...Typography.Heading.h2,
  },
  ticketCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderRadius: Spacing[4],
    backgroundColor: Colors.semantic.errorBg,
  },
  ticketCountText: {
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
    paddingVertical: Spacing[0.5],
    paddingHorizontal: Spacing[2],
    borderRadius: Spacing[3],
    backgroundColor: Colors.ui.background.tertiary,
  },
  filterBadgeActive: {
    backgroundColor: Colors.neutral[100],
  },
  filterBadgeText: {
    ...Typography.Caption.small,
    color: Colors.ui.text.secondary,
    fontWeight: '700',
  },
  filterBadgeTextActive: {
    color: Colors.primary[400],
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing[5],
    paddingBottom: Spacing[10],
    gap: Spacing[4],
  },
  helpSection: {
    marginTop: Spacing[8],
    padding: Spacing[5],
    borderRadius: Spacing[4],
    backgroundColor: Colors.ui.background.secondary,
    borderWidth: 1,
    borderColor: Colors.ui.border.subtle,
    gap: Spacing[3],
  },
  helpTitle: {
    ...Typography.Heading.h4,
  },
  helpText: {
    ...Typography.Body.base,
    color: Colors.ui.text.secondary,
    lineHeight: 22,
  },
  helpButton: {
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    borderRadius: Spacing[3],
    backgroundColor: Colors.ui.background.primary,
    borderWidth: 1,
    borderColor: Colors.ui.border.default,
    alignItems: 'center',
    marginTop: Spacing[2],
  },
  helpButtonText: {
    ...Typography.Label.base,
    color: Colors.primary[400],
  },
});
