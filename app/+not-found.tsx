import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { MapPinOff } from 'lucide-react-native';
import { Colors } from '@/constants';
import { EmptyState } from '@/components';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <EmptyState
          icon={<MapPinOff size={64} color={Colors.ui.text.tertiary} strokeWidth={1.5} />}
          title="Page Not Found"
          description="This screen doesn't exist. Let's get you back on track."
          actionLabel="Go to Home"
          onAction={() => router.replace('/(tabs)')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background.primary,
  },
});
