# VYBZ CIRCLE - Design System Documentation

> **Premium, Psychology-Driven Design System**
> Built for minimal friction, maximum visual impact, and satisfying user experiences.

---

## 🎨 Philosophy

The VYBZ CIRCLE design system is built on three core principles:

1. **Visual Stunning** - Premium aesthetics that command attention
2. **Psychological Simplicity** - Reduce cognitive load, ease friction
3. **Satisfying Interactions** - Delightful micro-interactions and feedback

---

## 📦 What's Included

### Constants (`/constants`)

- **Colors.ts** - Premium color palette with semantic variants
- **Typography.ts** - Type scale with perfect hierarchy
- **Spacing.ts** - 4px grid system + layout constants
- **Shadows.ts** - Elevation system with colored glows
- **Animation.ts** - Motion system with timing and easing

### Components (`/components`)

- **Button** - Multiple variants (primary, outline, ghost, danger)
- **Input** - Text inputs with validation states
- **Card** - Containers with variants (elevated, outlined, glass)
- **Avatar** - User avatars with status indicators
- **Badge** - Labels and status badges
- **EmptyState** - Friendly empty state placeholders
- **BottomSheet** - Gesture-driven modal sheets
- **Toast** - Notification system with haptics
- **LoadingSkeleton** - Animated content placeholders

---

## 🚀 Quick Start

### Import the Design System

```typescript
import { Colors, Typography, Spacing, Shadows, Layout } from '@/constants';
import { Button, Input, Card, Avatar, Badge } from '@/components';
```

### Use Constants in Styles

```typescript
import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Layout, Shadows } from '@/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ui.background.primary,
    padding: Spacing[5],
    borderRadius: Layout.radius.xl,
    ...Shadows.lg,
  },
  title: {
    ...Typography.Heading.h2,
    color: Colors.ui.text.primary,
    marginBottom: Spacing[4],
  },
});
```

### Use Components

```tsx
import { Button, Input, Card, Badge } from '@/components';
import { Flame } from 'lucide-react-native';

// Button with icon
<Button
  variant="primary"
  size="lg"
  leftIcon={<Flame size={20} color="#FFF" />}
  onPress={() => console.log('Pressed')}
>
  Get Tickets
</Button>

// Input with validation
<Input
  label="Phone Number"
  placeholder="712 345 678"
  error={hasError}
  errorText="Invalid phone number"
  leftIcon={<Phone size={20} />}
/>

// Card with content
<Card variant="elevated" padding="lg">
  <Text>Card content here</Text>
</Card>

// Badge
<Badge variant="success">Live</Badge>
```

---

## 🎨 Color System

### Primary Brand Colors

```typescript
Colors.primary[400]  // #FF3B30 - Main brand red
Colors.primary[500]  // Darker variant
Colors.primary[300]  // Lighter variant
```

### Semantic Colors

```typescript
Colors.semantic.success     // Green - Success states
Colors.semantic.error       // Red - Error states
Colors.semantic.warning     // Orange - Warning states
Colors.semantic.info        // Blue - Info states
```

### UI Colors

```typescript
Colors.ui.background.primary    // #0A0A0A - Main background
Colors.ui.background.secondary  // #1A1A1A - Cards, surfaces
Colors.ui.text.primary          // #FFFFFF - Headings
Colors.ui.text.secondary        // #CCCCCC - Body text
Colors.ui.text.tertiary         // #999999 - Labels
Colors.ui.border.default        // #2A2A2A - Borders
```

### Gradients

```typescript
Colors.gradients.primary          // Red gradient
Colors.gradients.warmGlow         // Warm multi-stop
Colors.gradients.dark             // Dark background
```

---

## ✍️ Typography

### Usage

```typescript
import { Typography } from '@/constants';

const styles = StyleSheet.create({
  heading: Typography.Heading.h1,
  body: Typography.Body.base,
  label: Typography.Label.medium,
  button: Typography.ButtonText.medium,
});
```

### Type Scale

- **Display** - Large (64px), Medium (56px), Small (42px)
- **Heading** - h1 (36px), h2 (32px), h3 (28px), h4 (24px), h5 (20px), h6 (18px)
- **Body** - Large (18px), Medium (16px), Base (15px), Small (13px)
- **Label** - Large (16px), Medium (15px), Small (13px), Tiny (11px)
- **Caption** - Large (15px), Medium (13px), Small (11px)

---

## 📏 Spacing

### 4px Grid System

```typescript
Spacing[1]   // 4px
Spacing[2]   // 8px
Spacing[3]   // 12px
Spacing[4]   // 16px (most common)
Spacing[5]   // 20px
Spacing[6]   // 24px
Spacing[8]   // 32px
Spacing[12]  // 48px (section spacing)
```

### Layout Constants

```typescript
Layout.radius.lg         // 16px - Buttons, cards
Layout.radius.xl         // 20px - Large cards
Layout.radius['2xl']     // 24px - Hero elements
Layout.radius.full       // Circular

Layout.sizes.buttonMd    // 44px - Button height
Layout.sizes.inputMd     // 48px - Input height
Layout.sizes.avatarMd    // 40px - Avatar size
```

---

## 🌟 Shadows & Elevation

### Standard Shadows

```typescript
Shadows.sm    // Subtle depth
Shadows.md    // Standard elevation
Shadows.lg    // Floating elements
Shadows.xl    // Modals, sheets
Shadows['2xl'] // Maximum elevation
```

### Colored Glows

```typescript
Shadows.glowPrimary       // Red glow (CTAs)
Shadows.glowGold          // Gold glow (premium)
Shadows.glowSuccess       // Green glow (success)
```

### Border Glows

```typescript
BorderGlow.primary   // Red border + glow
BorderGlow.gold      // Gold border + glow
```

---

## ⚡ Animation

### Duration

```typescript
Duration.fast     // 150ms - Quick feedback
Duration.normal   // 300ms - Standard transitions
Duration.slow     // 500ms - Emphasized transitions
```

### Easing Functions

```typescript
EasingFunctions.cubic      // Standard (most common)
EasingFunctions.cubicOut   // Deceleration (natural)
EasingFunctions.backOut    // Overshoot (premium feel)
EasingFunctions.bounce     // Playful
```

### Presets

```typescript
import { createTiming, createSpring } from '@/constants';

Animated.timing(value, createTiming(Duration.normal, EasingFunctions.cubicOut));
Animated.spring(value, createSpring('snappy'));
```

---

## 🧩 Component API

### Button

```tsx
<Button
  variant="primary" | "secondary" | "outline" | "ghost" | "danger"
  size="sm" | "md" | "lg" | "xl"
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  loading={boolean}
  disabled={boolean}
  fullWidth={boolean}
  hapticFeedback={boolean}
  onPress={() => {}}
/>
```

### Input

```tsx
<Input
  variant="default" | "filled" | "outline"
  size="sm" | "md" | "lg"
  label="Label"
  helperText="Helper text"
  errorText="Error message"
  error={boolean}
  disabled={boolean}
  required={boolean}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  showCharacterCount={boolean}
  maxLength={number}
  {...TextInputProps}
/>
```

### Card

```tsx
<Card
  variant="elevated" | "outlined" | "filled" | "glass"
  padding="none" | "sm" | "md" | "lg" | "xl"
  interactive={boolean}
  onPress={() => {}}
  hapticFeedback={boolean}
>
  {children}
</Card>
```

### Avatar

```tsx
<Avatar
  source={require('./image.png')}
  name="John Doe"
  fallback="JD"
  size="xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  variant="circle" | "rounded"
  showStatus={boolean}
  status="online" | "offline" | "busy" | "away"
  onPress={() => {}}
/>
```

### Badge

```tsx
<Badge
  variant="primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral"
  size="sm" | "md" | "lg"
  dot={boolean}
>
  Label
</Badge>
```

### EmptyState

```tsx
<EmptyState
  icon={<Icon size={64} />}
  title="No events yet"
  description="Start by browsing events"
  actionLabel="Browse Events"
  onAction={() => {}}
/>
```

### BottomSheet

```tsx
<BottomSheet
  visible={boolean}
  onClose={() => {}}
  height={400}
  enablePanDownToClose={boolean}
  backdropOpacity={0.5}
>
  {children}
</BottomSheet>
```

### Toast

```tsx
<Toast
  visible={boolean}
  type="success" | "error" | "warning" | "info"
  message="Event saved!"
  duration={3000}
  onDismiss={() => {}}
  icon={<Icon />}
/>
```

### Loading Skeleton

```tsx
// Basic skeleton
<Skeleton width={200} height={20} />

// Text skeleton
<SkeletonText lines={3} lastLineWidth="60%" />

// Circle skeleton
<SkeletonCircle size={48} />

// Card skeleton
<SkeletonCard />

// List skeleton
<SkeletonList items={5} />
```

---

## 🎯 Best Practices

### 1. **Always Use Design System Values**

❌ Don't:
```typescript
{ backgroundColor: '#FF3B30', padding: 16 }
```

✅ Do:
```typescript
{ backgroundColor: Colors.primary[400], padding: Spacing[4] }
```

### 2. **Use Semantic Colors**

❌ Don't:
```typescript
{ color: '#34C759' }
```

✅ Do:
```typescript
{ color: Colors.semantic.success }
```

### 3. **Leverage Typography Scale**

❌ Don't:
```typescript
{ fontSize: 24, fontWeight: '800', color: '#FFF' }
```

✅ Do:
```typescript
Typography.Heading.h4
```

### 4. **Consistent Spacing**

❌ Don't:
```typescript
{ marginBottom: 15, gap: 13 }
```

✅ Do:
```typescript
{ marginBottom: Spacing[4], gap: Spacing[3] }
```

### 5. **Use Components Over Custom Styles**

❌ Don't:
```typescript
<TouchableOpacity style={customButtonStyle}>
  <Text>Press Me</Text>
</TouchableOpacity>
```

✅ Do:
```typescript
<Button variant="primary" onPress={handlePress}>
  Press Me
</Button>
```

---

## 🧠 Psychology Notes

### Color Psychology
- **Red (#FF3B30)**: Creates urgency, excitement, draws attention to CTAs
- **Dark backgrounds**: Reduces eye strain, creates premium feel
- **High contrast**: Improves readability, reduces cognitive load

### Spacing Psychology
- **4px grid**: Creates subconscious harmony
- **Generous padding**: Premium, uncluttered feel
- **44px touch targets**: Reduces errors, feels forgiving

### Typography Psychology
- **Font weight hierarchy**: Authority (800-900) → Clarity (500-600) → Easy reading (400)
- **1.5x line height**: Proven optimal readability
- **Tight letter spacing on headings**: Modern, premium feel

### Animation Psychology
- **100-300ms**: Ideal transition duration
- **Ease-out**: Natural deceleration (most common)
- **Back overshoot**: Premium, polished feel
- **Haptic feedback**: Tactile confirmation

---

## 📱 Usage Examples

### Event Card

```tsx
import { Card, Badge, Avatar } from '@/components';
import { Colors, Spacing, Typography } from '@/constants';

<Card variant="elevated" padding="lg" onPress={handlePress} interactive>
  <Image source={eventImage} style={styles.image} />

  <Badge variant="primary">Trending</Badge>

  <Text style={Typography.Heading.h4}>Amapiano Sundays</Text>
  <Text style={Typography.Body.base}>The Alchemist • 2.3km</Text>

  <View style={styles.footer}>
    <Avatar source={friendImage} size="sm" />
    <Text style={Typography.Caption.medium}>12 friends going</Text>
  </View>
</Card>
```

### Form with Validation

```tsx
import { Input, Button } from '@/components';
import { Spacing } from '@/constants';

<View style={{ gap: Spacing[4] }}>
  <Input
    label="Phone Number"
    placeholder="712 345 678"
    error={!!errors.phone}
    errorText={errors.phone}
    leftIcon={<Phone size={20} color="#666" />}
    value={phone}
    onChangeText={setPhone}
  />

  <Button
    variant="primary"
    size="lg"
    fullWidth
    loading={loading}
    onPress={handleSubmit}
  >
    Continue
  </Button>
</View>
```

---

## 🔄 Migration Guide

### From Old to New

**Old approach:**
```typescript
<TouchableOpacity
  style={{
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
  }}
>
  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
    Get Tickets
  </Text>
</TouchableOpacity>
```

**New approach:**
```typescript
<Button variant="primary" size="md">
  Get Tickets
</Button>
```

**Benefits:**
- 90% less code
- Consistent styling
- Built-in accessibility
- Haptic feedback
- Loading states
- Proper touch feedback

---

## 🎓 Learning Resources

### Key Concepts
1. **4px Grid System** - All spacing multiples of 4
2. **Type Scale** - Modular 1.25 ratio for harmony
3. **Semantic Naming** - Colors describe purpose, not appearance
4. **Component Composition** - Build complex UIs from simple pieces

### Common Patterns
- **Card List**: `<SkeletonList>` → `<Card>` with data
- **Form**: `<Input>` + `<Button>` with validation
- **Modal**: `<BottomSheet>` with content
- **Feedback**: `<Toast>` for success/error messages

---

## 🚀 Next Steps

1. **Explore the codebase** - See components in action
2. **Build with the system** - Use constants and components
3. **Extend thoughtfully** - Add new variants, not new patterns
4. **Stay consistent** - Design system is only powerful when used consistently

---

**Built with ❤️ for VYBZ CIRCLE**
Premium experiences, zero friction, maximum vybz.
