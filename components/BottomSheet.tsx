/**
 * VYBZ CIRCLE - Premium Bottom Sheet Component
 *
 * Smooth, gesture-driven bottom sheet for modals and overlays
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing, Layout, Shadows } from '@/constants';
import * as Haptics from 'expo-haptics';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// ============================================
// TYPES
// ============================================

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
  snapPoints?: number[];
  style?: ViewStyle;
  enablePanDownToClose?: boolean;
  backdropOpacity?: number;
}

// ============================================
// COMPONENT
// ============================================

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  height = SCREEN_HEIGHT * 0.6,
  snapPoints,
  style,
  enablePanDownToClose = true,
  backdropOpacity = 0.5,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 25,
          stiffness: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enablePanDownToClose,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return enablePanDownToClose && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > height * 0.3 || gestureState.vy > 0.5) {
          closeSheet();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            damping: 20,
            stiffness: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const closeSheet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const translateY = Animated.add(slideAnim, panY);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
      statusBarTranslucent>
      <View style={styles.container}>
        {/* Backdrop */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={closeSheet}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: backdropAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, backdropOpacity],
                }),
              },
            ]}
          />
        </TouchableOpacity>

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            { height, transform: [{ translateY }] },
            style,
          ]}
          {...panResponder.panHandlers}>
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.neutral.black,
  },
  sheet: {
    backgroundColor: Colors.ui.background.secondary,
    borderTopLeftRadius: Layout.radius['3xl'],
    borderTopRightRadius: Layout.radius['3xl'],
    ...Shadows['2xl'],
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: Spacing[3],
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.neutral[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[6],
  },
});

export default BottomSheet;
