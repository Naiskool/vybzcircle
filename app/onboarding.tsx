import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ViewToken,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame, Users } from 'lucide-react-native';
import { Colors, Spacing, Typography, Shadows, Layout } from '@/constants';
import { Button } from '@/components';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  gradient: string[];
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Every event.\nEvery vibe.\nOne app.',
    subtitle: 'Discover the hottest events happening in Nairobi and beyond',
    icon: Flame,
    gradient: Colors.gradients.primary,
  },
  {
    id: '2',
    title: 'Be first to know.\nScout events.\nEarn rewards.',
    subtitle: 'Predict trending events, build your rep, and unlock exclusive perks',
    icon: Flame,
    gradient: Colors.gradients.secondary,
  },
  {
    id: '3',
    title: 'Your crew.\nYour turf.\nYour city.',
    subtitle: 'Compete with your squad, claim territories, and own the nightlife',
    icon: Users,
    gradient: Colors.gradients.warmGlow,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => {
    const Icon = item.icon;

    return (
      <View style={styles.slide}>
        <LinearGradient
          colors={item.gradient}
          style={styles.slideGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Icon size={80} color={Colors.ui.text.primary} strokeWidth={2} />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {/* Footer */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Next/Let's Go Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleNext}
          style={styles.nextButton}>
          {currentIndex === slides.length - 1 ? "Let's Go" : 'Next'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background.primary,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: Spacing[6],
    zIndex: 10,
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[2],
  },
  skipText: {
    ...Typography.Label.medium,
    color: Colors.ui.text.primary,
    opacity: Colors.opacity[70],
  },
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  slideGradient: {
    flex: 1,
    paddingHorizontal: Spacing[10],
    paddingTop: 120,
    paddingBottom: 180,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.xl,
  },
  textContainer: {
    flex: 0.8,
    justifyContent: 'flex-start',
    paddingTop: Spacing[10],
  },
  title: {
    ...Typography.Display.small,
    lineHeight: 50,
    marginBottom: Spacing[5],
  },
  subtitle: {
    ...Typography.Body.large,
    color: Colors.ui.text.primary,
    opacity: Colors.opacity[90],
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing[10],
    paddingBottom: 60,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: Spacing[10],
    gap: Spacing[2],
  },
  dot: {
    height: 8,
    borderRadius: Layout.radius.sm,
    backgroundColor: Colors.ui.text.primary,
  },
  nextButton: {
    width: '100%',
  },
});
