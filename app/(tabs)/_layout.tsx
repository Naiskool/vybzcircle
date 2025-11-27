import { Tabs } from 'expo-router';
import { Home, Map, Ticket, Grid3x3, User } from 'lucide-react-native';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Shadows } from '@/constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.ui.background.secondary,
          borderTopWidth: 1,
          borderTopColor: Colors.ui.border.subtle,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
          ...Shadows.elevation.lg,
        },
        tabBarActiveTintColor: Colors.primary[400],
        tabBarInactiveTintColor: Colors.ui.text.tertiary,
        tabBarLabelStyle: {
          ...Typography.Caption.small,
          fontWeight: '700',
          marginTop: 4,
          letterSpacing: 0.5,
        },
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            activeOpacity={0.7}
            onPress={(e) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              props.onPress?.(e);
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ size, color }) => <Map size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ size, color }) => <Ticket size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="circuit"
        options={{
          title: 'Circuit',
          tabBarIcon: ({ size, color }) => <Grid3x3 size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <User size={size} color={color} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}
