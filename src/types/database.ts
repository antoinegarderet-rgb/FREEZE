export type UserRole = 'user' | 'partner';
export type PremiumPlan = 'monthly' | 'annual';
export type PartnerCategory =
  | 'resto'
  | 'bars'
  | 'sport'
  | 'beauty'
  | 'loisirs'
  | 'shopping'
  | 'online';
export type PartnerStatus =
  | 'pending'
  | 'validated'
  | 'refused'
  | 'suspended'
  | 'pending_review';
export type OfferKind = 'permanent' | 'discovery';
export type OfferMode = 'comptoir' | 'borne' | 'online';
export type ReportReason = 'not_applied' | 'refused' | 'closed' | 'behavior' | 'other';
export type ReportStatus = 'open' | 'investigating' | 'resolved' | 'dismissed';
export type CommissionStatus = 'pending' | 'validated' | 'cancelled' | 'paid' | 'blocked';
export type PayoutStatus = 'pending' | 'processing' | 'sent' | 'failed';

export interface Profile {
  id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone: string | null;
  birth_date: string;
  certified_under_30: boolean;
  avatar_url: string | null;
  is_premium: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  premium_plan: PremiumPlan | null;
  premium_since: string | null;
  premium_expires_at: string | null;
  premium_cancel_at: string | null;
  affiliate_code: string;
  referred_by_code: string | null;
  iban: string | null;
  bic: string | null;
  iban_holder: string | null;
  total_savings_eur: number;
  offers_used_count: number;
  affiliate_balance_eur: number;
  affiliate_earned_total_eur: number;
  affiliate_earned_year_eur: number;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  owner_id: string | null;
  status: PartnerStatus;
  name: string;
  category: PartnerCategory;
  logo_url: string | null;
  cover_url: string | null;
  website: string | null;
  instagram: string | null;
  tiktok: string | null;
  address: string;
  city: string;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  contact_email: string;
  contact_phone: string;
  legal_info_collected: boolean;
  created_at: string;
  validated_at: string | null;
  updated_at: string;
}

export interface Offer {
  id: string;
  partner_id: string;
  kind: OfferKind;
  description: string;
  mode: OfferMode;
  online_promo_code: string | null;
  online_unique_codes: boolean;
  estimated_saving_eur: number | null;
  validity_text: string | null;
  is_active: boolean;
  is_featured: boolean;
  is_new_spot: boolean;
  display_order: number;
  pending_review: boolean;
  created_at: string;
  updated_at: string;
}

export interface Scan {
  id: string;
  user_id: string;
  partner_id: string;
  offer_id: string;
  offer_kind: OfferKind;
  scanned_at: string;
}

export interface OfferUse {
  id: string;
  scan_id: string | null;
  user_id: string;
  partner_id: string;
  offer_id: string;
  declared_saving_eur: number;
  used_at: string;
}

export interface PartnerReport {
  id: string;
  user_id: string;
  partner_id: string;
  reason: ReportReason;
  description: string | null;
  occurred_at: string | null;
  status: ReportStatus;
  resolved_by: string | null;
  resolved_at: string | null;
  admin_note: string | null;
  created_at: string;
}

export interface AffiliateSale {
  id: string;
  affiliate_id: string;
  referred_user_id: string;
  subscription_plan: PremiumPlan;
  subscription_amount_eur: number;
  stripe_invoice_id: string | null;
  commission_eur: number;
  commission_status: CommissionStatus;
  filleul_signup_at: string;
  filleul_paid_at: string;
  validated_at: string | null;
  paid_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  payout_id: string | null;
  created_at: string;
}

export interface AffiliatePayout {
  id: string;
  affiliate_id: string;
  amount_eur: number;
  iban: string;
  bic: string;
  iban_holder: string;
  status: PayoutStatus;
  sales_count: number;
  scheduled_for: string;
  sent_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface Favorite {
  user_id: string;
  partner_id: string;
  created_at: string;
}
