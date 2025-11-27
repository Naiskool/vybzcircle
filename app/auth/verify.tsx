import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Colors, Spacing, Typography } from '@/constants';
import { Button } from '@/components';

export default function VerifyScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { verifyOTP } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    setLoading(true);
    try {
      await verifyOTP(phone, code);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid verification code');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <ShieldCheck size={40} color="#FF3B30" strokeWidth={2} />
          </View>
          <Text style={styles.title}>Enter Code</Text>
          <Text style={styles.subtitle}>
            We sent a code to {'\n'}
            {phone}
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <Button
          variant="ghost"
          size="lg"
          fullWidth
          disabled={loading}
          onPress={() => {
            // TODO: Implement resend OTP
            Alert.alert('Resend OTP', 'Code resent successfully');
          }}>
          Didn't receive code? Resend
        </Button>

        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Verifying...</Text>
          </View>
        )}
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing[3],
    marginBottom: Spacing[8],
  },
  otpInput: {
    width: 50,
    height: 60,
    backgroundColor: Colors.ui.background.secondary,
    borderRadius: Spacing[3],
    borderWidth: 2,
    borderColor: Colors.ui.border.default,
    ...Typography.Heading.h3,
    color: Colors.ui.text.primary,
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: Colors.primary[400],
    backgroundColor: Colors.semantic.errorBg,
  },
  loadingContainer: {
    marginTop: Spacing[6],
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.Body.base,
    color: Colors.ui.text.tertiary,
  },
});
