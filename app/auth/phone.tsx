import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Colors, Spacing, Typography } from '@/constants';
import { Input, Button } from '@/components';

export default function PhoneAuthScreen() {
  const router = useRouter();
  const { signInWithPhone } = useAuth();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (!phone || phone.length < 9) {
      setError('Please enter a valid phone number');
      return;
    }

    const formattedPhone = phone.startsWith('+254') ? phone : `+254${phone.replace(/^0/, '')}`;

    setLoading(true);
    setError('');
    try {
      await signInWithPhone(formattedPhone);
      router.push({
        pathname: '/auth/verify',
        params: { phone: formattedPhone },
      });
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
      Alert.alert('Error', err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Phone size={40} color={Colors.primary[400]} strokeWidth={2} />
          </View>
          <Text style={styles.title}>Enter Your Number</Text>
          <Text style={styles.subtitle}>We'll send you a verification code</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Phone Number"
            placeholder="712 345 678"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            error={!!error}
            errorText={error}
            maxLength={12}
            autoFocus
            leftIcon={
              <Text style={styles.prefix}>+254</Text>
            }
          />

          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
            onPress={handleContinue}>
            {loading ? 'Sending...' : 'Continue'}
          </Button>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing[8],
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing[12],
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.semantic.errorBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[6],
    borderWidth: 2,
    borderColor: Colors.primary[400],
  },
  title: {
    ...Typography.Heading.h2,
    marginBottom: Spacing[3],
  },
  subtitle: {
    ...Typography.Body.base,
    color: Colors.ui.text.tertiary,
    textAlign: 'center',
  },
  form: {
    gap: Spacing[5],
  },
  prefix: {
    ...Typography.Label.large,
    color: Colors.ui.text.primary,
    fontWeight: '700',
  },
  terms: {
    ...Typography.Caption.medium,
    color: Colors.ui.text.tertiary,
    textAlign: 'center',
    marginTop: Spacing[8],
    lineHeight: 20,
  },
});
