export type Profile = {
  id: string;
  phone: string;
  display_name: string | null;
  avatar_url: string | null;
  rep_points: number;
  level: number;
  verification_status: string;
  created_at: string;
  updated_at: string;
};

export type Venue = {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  verified: boolean;
  created_at: string;
};

export type Event = {
  id: string;
  name: string;
  description: string | null;
  venue_id: string | null;
  organizer_id: string | null;
  start_date: string;
  end_date: string;
  image_url: string | null;
  price_min: number;
  price_max: number | null;
  category: string | null;
  status: string;
  capacity: number | null;
  tickets_sold: number;
  interested_count: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
};

export type Ticket = {
  id: string;
  event_id: string;
  user_id: string;
  tier_name: string;
  price: number;
  quantity: number;
  qr_code: string;
  status: string;
  payment_ref: string | null;
  payment_status: string;
  purchased_at: string;
  used_at: string | null;
};

export type Scout = {
  id: string;
  event_id: string;
  user_id: string;
  predicted_at: string;
  rsvp_count_at_prediction: number;
  threshold_met: boolean;
  points_awarded: number;
};

export type Crew = {
  id: string;
  name: string;
  avatar_url: string | null;
  description: string | null;
  founder_id: string;
  total_points: number;
  member_count: number;
  created_at: string;
};

export type CrewMember = {
  id: string;
  crew_id: string;
  user_id: string;
  joined_at: string;
  points_contributed: number;
};

export type CheckIn = {
  id: string;
  event_id: string;
  user_id: string;
  checked_in_at: string;
  latitude: number | null;
  longitude: number | null;
  points_earned: number;
};
