/**
 * VYBZ CIRCLE - TicketCard Component
 *
 * Digital ticket card with QR code, event details, and actions
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  QrCode,
  Calendar,
  MapPin,
  Clock,
  Share2,
  Download,
  MoreVertical,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Layout, Shadows } from '@/constants';
import { Badge } from './Badge';

// ============================================
// TYPES
// ============================================

export interface Ticket {
  id: string;
  eventName: string;
  eventImage: string | ImageSourcePropType;
  venue: string;
  date: string;
  time: string;
  ticketType: string;
  quantity: number;
  qrCode?: string | ImageSourcePropType;
  status: 'upcoming' | 'used' | 'cancelled' | 'expired';
  transferable?: boolean;
  orderNumber?: string;
}

interface TicketCardProps {
  ticket: Ticket;
  variant?: 'default' | 'compact';
  onPress?: (ticket: Ticket) => void;
  onShare?: (ticket: Ticket) => void;
  onDownload?: (ticket: Ticket) => void;
  showActions?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  variant = 'default',
  onPress,
  onShare,
  onDownload,
  showActions = true,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (variant === 'default') {
      setExpanded(!expanded);
    }
    onPress?.(ticket);
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onShare?.(ticket);
  };

  const handleDownload = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onDownload?.(ticket);
  };

  const statusBadgeVariant = getStatusBadgeVariant(ticket.status);
  const isActive = ticket.status === 'upcoming';

  if (variant === 'compact') {
    return <CompactTicketCard ticket={ticket} onPress={handlePress} />;
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        !isActive && styles.cardInactive,
      ]}
      activeOpacity={0.95}
      onPress={handlePress}>
      {/* Card Border Glow */}
      <LinearGradient
        colors={
          isActive
            ? [Colors.primary[400], Colors.secondary[400]]
            : [Colors.neutral[30], Colors.neutral[40]]
        }
        style={styles.cardBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.cardInner}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={
                typeof ticket.eventImage === 'string'
                  ? { uri: ticket.eventImage }
                  : ticket.eventImage
              }
              style={styles.eventImage}
              resizeMode="cover"
            />

            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <Badge variant={statusBadgeVariant} size="sm">
                  {ticket.status.toUpperCase()}
                </Badge>
                {showActions && (
                  <TouchableOpacity style={styles.moreButton}>
                    <MoreVertical size={20} color={Colors.ui.text.tertiary} />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.eventName} numberOfLines={2}>
                {ticket.eventName}
              </Text>

              <View style={styles.ticketInfo}>
                <Text style={styles.ticketType}>{ticket.ticketType}</Text>
                {ticket.quantity > 1 && (
                  <Text style={styles.quantity}>×{ticket.quantity}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Event Details */}
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Calendar size={16} color={Colors.primary[400]} strokeWidth={2} />
              <Text style={styles.detailText}>{ticket.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Clock size={16} color={Colors.primary[400]} strokeWidth={2} />
              <Text style={styles.detailText}>{ticket.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <MapPin size={16} color={Colors.primary[400]} strokeWidth={2} />
              <Text style={styles.detailText} numberOfLines={1}>
                {ticket.venue}
              </Text>
            </View>
          </View>

          {/* QR Code Section (Expandable) */}
          {expanded && isActive && (
            <View style={styles.qrSection}>
              <View style={styles.qrContainer}>
                {ticket.qrCode ? (
                  <Image
                    source={
                      typeof ticket.qrCode === 'string'
                        ? { uri: ticket.qrCode }
                        : ticket.qrCode
                    }
                    style={styles.qrCode}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.qrPlaceholder}>
                    <QrCode size={120} color={Colors.neutral[10]} strokeWidth={1.5} />
                  </View>
                )}
              </View>

              {ticket.orderNumber && (
                <Text style={styles.orderNumber}>#{ticket.orderNumber}</Text>
              )}

              <Text style={styles.qrInstruction}>
                Show this QR code at the entrance
              </Text>
            </View>
          )}

          {/* Perforated Divider */}
          {isActive && <View style={styles.perforation} />}

          {/* Actions */}
          {showActions && isActive && (
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
                activeOpacity={0.7}>
                <Share2 size={20} color={Colors.ui.text.primary} strokeWidth={2} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>

              <View style={styles.actionDivider} />

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDownload}
                activeOpacity={0.7}>
                <Download size={20} color={Colors.ui.text.primary} strokeWidth={2} />
                <Text style={styles.actionText}>Download</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// ============================================
// COMPACT VARIANT
// ============================================

const CompactTicketCard: React.FC<{ ticket: Ticket; onPress: () => void }> = ({
  ticket,
  onPress,
}) => {
  const statusBadgeVariant = getStatusBadgeVariant(ticket.status);

  return (
    <TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.9}>
      <Image
        source={
          typeof ticket.eventImage === 'string'
            ? { uri: ticket.eventImage }
            : ticket.eventImage
        }
        style={styles.compactImage}
        resizeMode="cover"
      />

      <View style={styles.compactContent}>
        <Badge variant={statusBadgeVariant} size="sm">
          {ticket.status}
        </Badge>

        <Text style={styles.compactName} numberOfLines={1}>
          {ticket.eventName}
        </Text>
        <Text style={styles.compactDate}>{ticket.date}</Text>
      </View>

      <View style={styles.compactIcon}>
        <QrCode size={24} color={Colors.ui.text.tertiary} strokeWidth={1.5} />
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// HELPERS
// ============================================

const getStatusBadgeVariant = (status: Ticket['status']) => {
  switch (status) {
    case 'upcoming':
      return 'success';
    case 'used':
      return 'neutral';
    case 'cancelled':
      return 'error';
    case 'expired':
      return 'warning';
    default:
      return 'neutral';
  }
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  // Default Card
  card: {
    marginBottom: Spacing[5],
    borderRadius: Layout.radius['2xl'],
    ...Shadows.lg,
  },

  cardInactive: {
    opacity: 0.6,
  },

  cardBorder: {
    padding: 2,
    borderRadius: Layout.radius['2xl'],
  },

  cardInner: {
    backgroundColor: Colors.ui.background.secondary,
    borderRadius: Layout.radius['2xl'] - 2,
    overflow: 'hidden',
  },

  // Header
  header: {
    flexDirection: 'row',
    padding: Spacing[4],
    gap: Spacing[3],
  },

  eventImage: {
    width: 80,
    height: 80,
    borderRadius: Layout.radius.lg,
    backgroundColor: Colors.neutral[30],
  },

  headerContent: {
    flex: 1,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[2],
  },

  moreButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  eventName: {
    ...Typography.Heading.h5,
    marginBottom: Spacing[2],
  },

  ticketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },

  ticketType: {
    ...Typography.Label.small,
    color: Colors.primary[400],
  },

  quantity: {
    ...Typography.Label.small,
    color: Colors.ui.text.tertiary,
  },

  // Details
  details: {
    paddingHorizontal: Spacing[4],
    paddingBottom: Spacing[4],
    gap: Spacing[2],
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },

  detailText: {
    ...Typography.Body.small,
    color: Colors.ui.text.secondary,
    flex: 1,
  },

  // QR Code
  qrSection: {
    alignItems: 'center',
    paddingVertical: Spacing[6],
    paddingHorizontal: Spacing[4],
    backgroundColor: Colors.neutral[15],
  },

  qrContainer: {
    width: 180,
    height: 180,
    backgroundColor: Colors.ui.text.primary,
    borderRadius: Layout.radius.lg,
    padding: Spacing[3],
    marginBottom: Spacing[3],
  },

  qrCode: {
    width: '100%',
    height: '100%',
  },

  qrPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral[90],
  },

  orderNumber: {
    ...Typography.Label.medium,
    color: Colors.ui.text.tertiary,
    marginBottom: Spacing[2],
  },

  qrInstruction: {
    ...Typography.Caption.medium,
    color: Colors.ui.text.tertiary,
    textAlign: 'center',
  },

  // Perforation
  perforation: {
    height: 1,
    marginHorizontal: Spacing[4],
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.ui.border.default,
  },

  // Actions
  actions: {
    flexDirection: 'row',
    paddingVertical: Spacing[4],
  },

  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[2],
  },

  actionText: {
    ...Typography.Label.medium,
    color: Colors.ui.text.primary,
  },

  actionDivider: {
    width: 1,
    backgroundColor: Colors.ui.border.default,
  },

  // Compact Card
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.ui.background.secondary,
    borderRadius: Layout.radius.xl,
    padding: Spacing[3],
    marginBottom: Spacing[3],
    ...Shadows.sm,
  },

  compactImage: {
    width: 60,
    height: 60,
    borderRadius: Layout.radius.md,
    backgroundColor: Colors.neutral[30],
  },

  compactContent: {
    flex: 1,
    marginLeft: Spacing[3],
    gap: Spacing[1],
  },

  compactName: {
    ...Typography.Label.medium,
    color: Colors.ui.text.primary,
  },

  compactDate: {
    ...Typography.Caption.small,
    color: Colors.ui.text.tertiary,
  },

  compactIcon: {
    marginLeft: Spacing[2],
  },
});

export default TicketCard;
