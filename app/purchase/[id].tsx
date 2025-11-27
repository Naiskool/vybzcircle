import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  Check,
  Plus,
  Minus,
  ChevronRight,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '@/constants';
import { Button, Card } from '@/components';

interface TicketType {
  id: string;
  name: string;
  price: number;
  available: boolean;
  description?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
}

const MOCK_TICKETS: TicketType[] = [
  {
    id: '1',
    name: 'General Admission',
    price: 1500,
    available: true,
    description: 'Standard entry to the event',
  },
  {
    id: '2',
    name: 'VIP Pass',
    price: 2500,
    available: true,
    description: 'VIP section access, complimentary drinks',
  },
  {
    id: '3',
    name: 'Early Bird',
    price: 1000,
    available: false,
    description: 'Discounted early entry (Sold Out)',
  },
];

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    icon: Smartphone,
    description: 'Pay with M-Pesa',
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard',
  },
  {
    id: 'wallet',
    name: 'VYBZ Wallet',
    icon: Wallet,
    description: 'Balance: KES 0',
  },
];

type Step = 'tickets' | 'payment' | 'confirm';

export default function PurchaseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [currentStep, setCurrentStep] = useState<Step>('tickets');
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [selectedPayment, setSelectedPayment] = useState<string>('mpesa');

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep === 'tickets') {
      router.back();
    } else if (currentStep === 'payment') {
      setCurrentStep('tickets');
    } else {
      setCurrentStep('payment');
    }
  };

  const handleIncrement = (ticketId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: (prev[ticketId] || 0) + 1,
    }));
  };

  const handleDecrement = (ticketId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if ((selectedTickets[ticketId] || 0) > 0) {
      setSelectedTickets((prev) => ({
        ...prev,
        [ticketId]: prev[ticketId] - 1,
      }));
    }
  };

  const handlePaymentSelect = (methodId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPayment(methodId);
  };

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (currentStep === 'tickets') {
      const hasTickets = Object.values(selectedTickets).some((qty) => qty > 0);
      if (!hasTickets) {
        Alert.alert('No Tickets Selected', 'Please select at least one ticket');
        return;
      }
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('confirm');
    } else {
      handleConfirmPurchase();
    }
  };

  const handleConfirmPurchase = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      'Purchase Successful! 🎉',
      'Your tickets have been sent to your email and are available in the Tickets tab.',
      [
        {
          text: 'View Tickets',
          onPress: () => router.replace('/(tabs)/tickets'),
        },
      ]
    );
  };

  const totalQuantity = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const totalAmount = MOCK_TICKETS.reduce((sum, ticket) => {
    const quantity = selectedTickets[ticket.id] || 0;
    return sum + ticket.price * quantity;
  }, 0);

  const serviceFee = totalAmount > 0 ? 100 : 0;
  const grandTotal = totalAmount + serviceFee;

  const stepProgress = currentStep === 'tickets' ? 33 : currentStep === 'payment' ? 66 : 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}>
          <ArrowLeft size={24} color={Colors.ui.text.primary} strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            {currentStep === 'tickets'
              ? 'Select Tickets'
              : currentStep === 'payment'
                ? 'Payment'
                : 'Confirm Purchase'}
          </Text>
          <View style={styles.stepIndicator}>
            <View style={styles.stepProgress}>
              <View style={[styles.stepProgressFill, { width: `${stepProgress}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {currentStep === 'tickets' && (
          <>
            <Text style={styles.sectionTitle}>Available Tickets</Text>
            {MOCK_TICKETS.map((ticket) => (
              <Card
                key={ticket.id}
                variant="elevated"
                padding="md"
                style={[styles.ticketCard, !ticket.available && styles.ticketCardDisabled]}>
                <View style={styles.ticketContent}>
                  <View style={styles.ticketInfo}>
                    <Text style={styles.ticketName}>{ticket.name}</Text>
                    <Text style={styles.ticketDescription}>{ticket.description}</Text>
                    <Text style={styles.ticketPrice}>KES {ticket.price.toLocaleString()}</Text>
                  </View>

                  {ticket.available ? (
                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleDecrement(ticket.id)}
                        disabled={(selectedTickets[ticket.id] || 0) === 0}
                        activeOpacity={0.7}>
                        <Minus
                          size={18}
                          color={
                            (selectedTickets[ticket.id] || 0) === 0
                              ? Colors.ui.text.disabled
                              : Colors.ui.text.primary
                          }
                          strokeWidth={2}
                        />
                      </TouchableOpacity>

                      <Text style={styles.quantity}>{selectedTickets[ticket.id] || 0}</Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleIncrement(ticket.id)}
                        activeOpacity={0.7}>
                        <Plus size={18} color={Colors.ui.text.primary} strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text style={styles.soldOutText}>Sold Out</Text>
                  )}
                </View>
              </Card>
            ))}
          </>
        )}

        {currentStep === 'payment' && (
          <>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedPayment === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => handlePaymentSelect(method.id)}
                  activeOpacity={0.9}>
                  <Card
                    variant={isSelected ? 'elevated' : 'outlined'}
                    padding="md"
                    style={[
                      styles.paymentCard,
                      isSelected && styles.paymentCardSelected,
                    ]}>
                    <View style={styles.paymentContent}>
                      <View style={styles.paymentIcon}>
                        <Icon size={24} color={Colors.primary[400]} strokeWidth={2} />
                      </View>
                      <View style={styles.paymentInfo}>
                        <Text style={styles.paymentName}>{method.name}</Text>
                        <Text style={styles.paymentDescription}>
                          {method.description}
                        </Text>
                      </View>
                      {isSelected && (
                        <View style={styles.checkIcon}>
                          <Check size={20} color={Colors.primary[400]} strokeWidth={3} />
                        </View>
                      )}
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </>
        )}

        {currentStep === 'confirm' && (
          <>
            <Text style={styles.sectionTitle}>Order Summary</Text>

            <Card variant="elevated" padding="lg">
              <View style={styles.summarySection}>
                <Text style={styles.summaryTitle}>Event</Text>
                <Text style={styles.summaryValue}>Amapiano Sundays</Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summarySection}>
                <Text style={styles.summaryTitle}>Tickets</Text>
                {MOCK_TICKETS.filter((t) => (selectedTickets[t.id] || 0) > 0).map(
                  (ticket) => (
                    <View key={ticket.id} style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>
                        {selectedTickets[ticket.id]}x {ticket.name}
                      </Text>
                      <Text style={styles.summaryAmount}>
                        KES {(ticket.price * (selectedTickets[ticket.id] || 0)).toLocaleString()}
                      </Text>
                    </View>
                  )
                )}
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryAmount}>KES {totalAmount.toLocaleString()}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service Fee</Text>
                <Text style={styles.summaryAmount}>KES {serviceFee.toLocaleString()}</Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>KES {grandTotal.toLocaleString()}</Text>
              </View>
            </Card>

            <Card variant="outlined" padding="md" style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodRow}>
                <Text style={styles.paymentMethodLabel}>Payment Method</Text>
                <View style={styles.paymentMethodValue}>
                  {selectedPayment === 'mpesa' && <Smartphone size={16} color={Colors.ui.text.primary} strokeWidth={2} />}
                  {selectedPayment === 'card' && <CreditCard size={16} color={Colors.ui.text.primary} strokeWidth={2} />}
                  {selectedPayment === 'wallet' && <Wallet size={16} color={Colors.ui.text.primary} strokeWidth={2} />}
                  <Text style={styles.paymentMethodText}>
                    {PAYMENT_METHODS.find((m) => m.id === selectedPayment)?.name}
                  </Text>
                </View>
              </View>
            </Card>
          </>
        )}
      </ScrollView>

      {/* Bottom Bar */}
      <SafeAreaView style={styles.bottomBar} edges={['bottom']}>
        <View style={styles.bottomContent}>
          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>KES {grandTotal.toLocaleString()}</Text>
          </View>

          <Button
            variant="primary"
            size="lg"
            onPress={handleContinue}
            disabled={currentStep === 'tickets' && totalQuantity === 0}
            style={styles.continueButton}>
            {currentStep === 'confirm' ? 'Confirm & Pay' : 'Continue'}
          </Button>
        </View>
      </SafeAreaView>
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
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border.subtle,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.ui.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    marginLeft: Spacing[4],
    gap: Spacing[2],
  },
  headerTitle: {
    ...Typography.Heading.h3,
  },
  stepIndicator: {
    width: '100%',
  },
  stepProgress: {
    height: 3,
    backgroundColor: Colors.ui.background.tertiary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  stepProgressFill: {
    height: '100%',
    backgroundColor: Colors.primary[400],
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing[5],
    paddingBottom: Spacing[32],
    gap: Spacing[4],
  },
  sectionTitle: {
    ...Typography.Heading.h4,
    marginTop: Spacing[2],
    marginBottom: Spacing[2],
  },
  ticketCard: {
    marginBottom: Spacing[3],
  },
  ticketCardDisabled: {
    opacity: 0.5,
  },
  ticketContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing[4],
  },
  ticketInfo: {
    flex: 1,
    gap: Spacing[1],
  },
  ticketName: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  ticketDescription: {
    ...Typography.Body.small,
    color: Colors.ui.text.tertiary,
  },
  ticketPrice: {
    ...Typography.Label.large,
    color: Colors.primary[400],
    marginTop: Spacing[1],
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.ui.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    ...Typography.Label.large,
    minWidth: 20,
    textAlign: 'center',
  },
  soldOutText: {
    ...Typography.Label.base,
    color: Colors.semantic.error,
  },
  paymentCard: {
    marginBottom: Spacing[3],
  },
  paymentCardSelected: {
    borderColor: Colors.primary[400],
    borderWidth: 2,
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.ui.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentInfo: {
    flex: 1,
    gap: Spacing[1],
  },
  paymentName: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  paymentDescription: {
    ...Typography.Body.small,
    color: Colors.ui.text.tertiary,
  },
  checkIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.semantic.successBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summarySection: {
    gap: Spacing[2],
  },
  summaryTitle: {
    ...Typography.Label.small,
    color: Colors.ui.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryValue: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing[2],
  },
  summaryLabel: {
    ...Typography.Body.base,
    color: Colors.ui.text.secondary,
  },
  summaryAmount: {
    ...Typography.Label.base,
    color: Colors.ui.text.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.ui.border.subtle,
    marginVertical: Spacing[3],
  },
  totalLabel: {
    ...Typography.Heading.h4,
  },
  totalAmount: {
    ...Typography.Heading.h4,
    color: Colors.primary[400],
  },
  paymentMethodCard: {
    marginTop: Spacing[4],
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodLabel: {
    ...Typography.Body.base,
    color: Colors.ui.text.tertiary,
  },
  paymentMethodValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  paymentMethodText: {
    ...Typography.Label.base,
    color: Colors.ui.text.primary,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border.subtle,
    backgroundColor: Colors.ui.background.primary,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
  },
  totalSection: {
    flex: 1,
    gap: Spacing[1],
  },
  totalText: {
    ...Typography.Caption.base,
    color: Colors.ui.text.tertiary,
  },
  totalPrice: {
    ...Typography.Heading.h4,
    color: Colors.ui.text.primary,
  },
  continueButton: {
    flex: 1.5,
  },
});
