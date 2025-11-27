# Vybz Circle

A premium iOS and Android app for discovering events in Kenya. Built with Expo, React Native, and Supabase.

## Features

### 🎯 Core Features
- **Splash Screen**: Premium animated splash with brand identity
- **Onboarding**: Three engaging screens introducing the app's value proposition
- **Event Discovery**: Beautiful feed with trending events and personalized recommendations
- **Tab Navigation**: Intuitive 5-tab layout (Home, Explore, Tickets, Circuit, Profile)
- **Authentication**: Phone number + OTP verification flow
- **Database**: Full Supabase backend with RLS policies

### 🎨 Design Highlights
- Dark theme with vibrant accent colors (#FF3B30 primary)
- Premium animations and transitions
- Smooth haptic feedback
- Professional typography and spacing
- Glassmorphic cards and gradients
- Consistent 8px spacing system

### 📱 Screens Implemented
1. **Splash Screen** - Animated brand intro
2. **Onboarding** - 3 swipeable slides with animations
3. **Home Feed** - Event cards with filtering and search
4. **Explore** - Map view (placeholder)
5. **Tickets** - User tickets (placeholder)
6. **Circuit** - Gamification challenges (placeholder)
7. **Profile** - User stats and settings
8. **Phone Auth** - Phone number input
9. **OTP Verify** - 6-digit code verification

## Database Schema

### Tables
- **profiles** - User accounts with rep points and levels
- **venues** - Event locations with geofencing data
- **events** - Event listings with status tracking
- **tickets** - Purchases with QR codes
- **scouts** - Firestarter predictions
- **crews** - Team squads for Turf Wars
- **crew_members** - Membership tracking
- **check_ins** - Event attendance validation

## Tech Stack

- **Framework**: Expo SDK 54
- **Navigation**: Expo Router (file-based)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: StyleSheet with LinearGradient
- **Icons**: Lucide React Native
- **Language**: TypeScript

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure Supabase:
   - Update `.env` with your Supabase credentials (already configured)

3. Run development server:
```bash
npm run dev
```

4. Build for web:
```bash
npm run build:web
```

## Project Structure

```
app/
├── (tabs)/          # Tab navigation screens
│   ├── index.tsx    # Home feed
│   ├── explore.tsx  # Map view
│   ├── tickets.tsx  # My tickets
│   ├── circuit.tsx  # Gamification
│   └── profile.tsx  # User profile
├── auth/            # Authentication screens
│   ├── phone.tsx    # Phone input
│   └── verify.tsx   # OTP verification
├── index.tsx        # Splash screen
├── onboarding.tsx   # Onboarding slides
└── _layout.tsx      # Root layout

contexts/
└── AuthContext.tsx  # Authentication state

lib/
└── supabase.ts      # Supabase client

types/
├── database.ts      # Database types
└── env.d.ts         # Environment variables
```

## Key Design Decisions

1. **Dark Theme**: Modern, premium feel suitable for nightlife events
2. **Tab Navigation**: Primary pattern per requirements (not drawer/stack)
3. **Supabase RLS**: All tables secured with Row Level Security
4. **Phone Auth**: Kenya-focused with M-Pesa integration ready
5. **Premium Aesthetics**: Attention to detail, smooth animations, thoughtful micro-interactions

## Next Steps

To continue development:
1. Implement map view with venue pins
2. Add ticket purchasing with M-Pesa integration
3. Build The Circuit gamification board
4. Add event detail screens
5. Implement crew creation and Turf Wars
6. Add push notifications
7. Implement search and filtering
8. Add user reviews and ratings

## Environment Variables

Required in `.env`:
- `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

## Notes

- App targets web platform primarily (some native features unavailable)
- Authentication requires Supabase phone auth configuration
- Sample data provided for venues
- All screens use consistent design system
- Build verified and working
