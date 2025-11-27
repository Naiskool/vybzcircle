/**
 * VYBZ CIRCLE - Component Library Export
 *
 * Central export for all design system components
 */

// ============================================
// CORE DESIGN SYSTEM COMPONENTS
// ============================================

// Core Components
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
export { Avatar } from './Avatar';
export { Badge } from './Badge';

// Layout & Feedback
export { EmptyState } from './EmptyState';
export { BottomSheet } from './BottomSheet';
export { Toast } from './Toast';

// Loading States
export {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonCard,
  SkeletonList,
} from './LoadingSkeleton';

// ============================================
// APP-SPECIFIC COMPONENTS
// ============================================

// Event Components
export { EventCard } from './EventCard';
export type { Event } from './EventCard';

// Ticket Components
export { TicketCard } from './TicketCard';
export type { Ticket } from './TicketCard';

// Gamification Components
export { ChallengeCard } from './ChallengeCard';
export type { Challenge } from './ChallengeCard';

// Navigation & Search
export { SearchBar } from './SearchBar';
export { FilterChips } from './FilterChips';
export type { FilterOption } from './FilterChips';
export { Header } from './Header';

// User Components
export { UserStats } from './UserStats';
export type { Stat } from './UserStats';

// ============================================
// DEFAULT EXPORTS
// ============================================

// Re-export default components
export { default as ButtonDefault } from './Button';
export { default as InputDefault } from './Input';
export { default as CardDefault } from './Card';
export { default as AvatarDefault } from './Avatar';
export { default as BadgeDefault } from './Badge';
export { default as EmptyStateDefault } from './EmptyState';
export { default as BottomSheetDefault } from './BottomSheet';
export { default as ToastDefault } from './Toast';
export { default as SkeletonDefault } from './LoadingSkeleton';
export { default as EventCardDefault } from './EventCard';
export { default as TicketCardDefault } from './TicketCard';
export { default as ChallengeCardDefault } from './ChallengeCard';
export { default as SearchBarDefault } from './SearchBar';
export { default as FilterChipsDefault } from './FilterChips';
export { default as HeaderDefault } from './Header';
export { default as UserStatsDefault } from './UserStats';
