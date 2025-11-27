/*
  # Initial Database Schema for Vybz Circle

  1. New Tables
    - `profiles`
      - User profile information
      - Rep points, level, verification status
      - Links to auth.users
    
    - `events`
      - Event listings with all details
      - Status tracking (live, pending, completed, etc.)
      - Organizer information
    
    - `venues`
      - Venue information
      - Location data for geofencing
    
    - `tickets`
      - Ticket purchases and RSVPs
      - QR codes for check-in
      - Payment tracking
    
    - `scouts`
      - Firestarter predictions
      - Accuracy tracking
    
    - `crews`
      - Team/squad information
      - Leaderboard rankings
    
    - `crew_members`
      - Crew membership tracking
    
    - `check_ins`
      - Event attendance tracking
      - Geofence validation

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Restrict sensitive data access
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  rep_points integer DEFAULT 0,
  level integer DEFAULT 1,
  verification_status text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Venues table
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text,
  city text DEFAULT 'Nairobi',
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  phone text,
  email text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view venues"
  ON venues FOR SELECT
  TO authenticated
  USING (true);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  venue_id uuid REFERENCES venues(id),
  organizer_id uuid REFERENCES profiles(id),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  image_url text,
  price_min integer DEFAULT 0,
  price_max integer,
  category text,
  status text DEFAULT 'live',
  capacity integer,
  tickets_sold integer DEFAULT 0,
  interested_count integer DEFAULT 0,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view live events"
  ON events FOR SELECT
  TO authenticated
  USING (status = 'live' OR organizer_id = auth.uid());

CREATE POLICY "Organizers can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (organizer_id = auth.uid());

CREATE POLICY "Organizers can update own events"
  ON events FOR UPDATE
  TO authenticated
  USING (organizer_id = auth.uid())
  WITH CHECK (organizer_id = auth.uid());

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  tier_name text NOT NULL,
  price integer NOT NULL,
  quantity integer DEFAULT 1,
  qr_code text UNIQUE NOT NULL,
  status text DEFAULT 'valid',
  payment_ref text,
  payment_status text DEFAULT 'pending',
  purchased_at timestamptz DEFAULT now(),
  used_at timestamptz
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tickets"
  ON tickets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create tickets"
  ON tickets FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Scouts table (Firestarter predictions)
CREATE TABLE IF NOT EXISTS scouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  predicted_at timestamptz DEFAULT now(),
  rsvp_count_at_prediction integer DEFAULT 0,
  threshold_met boolean DEFAULT false,
  points_awarded integer DEFAULT 0,
  UNIQUE(event_id, user_id)
);

ALTER TABLE scouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all scouts"
  ON scouts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own scouts"
  ON scouts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Crews table
CREATE TABLE IF NOT EXISTS crews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  avatar_url text,
  description text,
  founder_id uuid REFERENCES profiles(id) NOT NULL,
  total_points integer DEFAULT 0,
  member_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view crews"
  ON crews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Founders can create crews"
  ON crews FOR INSERT
  TO authenticated
  WITH CHECK (founder_id = auth.uid());

CREATE POLICY "Founders can update own crews"
  ON crews FOR UPDATE
  TO authenticated
  USING (founder_id = auth.uid())
  WITH CHECK (founder_id = auth.uid());

-- Crew members table
CREATE TABLE IF NOT EXISTS crew_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  crew_id uuid REFERENCES crews(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at timestamptz DEFAULT now(),
  points_contributed integer DEFAULT 0,
  UNIQUE(crew_id, user_id)
);

ALTER TABLE crew_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view crew members"
  ON crew_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join crews"
  ON crew_members FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave crews"
  ON crew_members FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Check-ins table
CREATE TABLE IF NOT EXISTS check_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  checked_in_at timestamptz DEFAULT now(),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  points_earned integer DEFAULT 10,
  UNIQUE(event_id, user_id)
);

ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own check-ins"
  ON check_ins FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create check-ins"
  ON check_ins FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_event ON tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_scouts_user ON scouts(user_id);
CREATE INDEX IF NOT EXISTS idx_scouts_event ON scouts(event_id);
CREATE INDEX IF NOT EXISTS idx_crew_members_crew ON crew_members(crew_id);
CREATE INDEX IF NOT EXISTS idx_crew_members_user ON crew_members(user_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_event ON check_ins(event_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_user ON check_ins(user_id);
