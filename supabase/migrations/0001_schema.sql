-- ============================================================================
-- FREEZE — Schéma initial
-- ============================================================================

create extension if not exists pgcrypto;

-- ========== PROFILS UTILISATEURS ==========
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('user','partner')) default 'user',

  -- Identité
  first_name text not null,
  last_name text not null,
  phone text,
  birth_date date not null,
  certified_under_30 boolean not null default false,
  avatar_url text,

  -- Abonnement (synchronisé depuis Stripe via webhook)
  is_premium boolean default false,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  premium_plan text check (premium_plan in ('monthly','annual')),
  premium_since timestamptz,
  premium_expires_at timestamptz,
  premium_cancel_at timestamptz,

  -- Affiliation
  affiliate_code text unique default upper(substring(md5(random()::text), 1, 6)),
  referred_by_code text,
  iban text,
  bic text,
  iban_holder text,

  -- Compteurs (mis à jour par triggers)
  total_savings_eur numeric default 0,
  offers_used_count int default 0,
  affiliate_balance_eur numeric default 0,
  affiliate_earned_total_eur numeric default 0,
  affiliate_earned_year_eur numeric default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ========== PARTENAIRES (COMMERÇANTS) ==========
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,

  status text not null check (status in ('pending','validated','refused','suspended','pending_review')) default 'pending',

  name text not null,
  category text not null check (category in ('resto','bars','sport','beauty','loisirs','shopping','online')),
  logo_url text,
  cover_url text,
  website text,
  instagram text,
  tiktok text,

  address text not null,
  city text default 'Paris',
  postal_code text,
  latitude numeric,
  longitude numeric,

  contact_email text not null,
  contact_phone text not null,

  legal_info_collected boolean default false,

  created_at timestamptz default now(),
  validated_at timestamptz,
  updated_at timestamptz default now()
);

-- ========== OFFRES ==========
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,

  kind text not null check (kind in ('permanent','discovery')),
  description text not null,
  mode text not null check (mode in ('comptoir','borne','online')),
  online_promo_code text,
  online_unique_codes boolean default false,
  estimated_saving_eur numeric,
  validity_text text,

  is_active boolean default true,
  is_featured boolean default false,
  is_new_spot boolean default false,
  display_order int default 0,

  pending_review boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index unique_offer_per_kind on offers(partner_id, kind) where is_active = true;

-- ========== SCANS (tracking de passage) ==========
create table public.scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  partner_id uuid not null references partners(id) on delete cascade,
  offer_id uuid not null references offers(id) on delete cascade,
  offer_kind text not null check (offer_kind in ('permanent','discovery')),
  scanned_at timestamptz default now()
);

create index on scans(user_id, scanned_at desc);
create index on scans(partner_id, scanned_at desc);
create index on scans(user_id, partner_id, offer_kind);

-- ========== UTILISATIONS D'OFFRES (économies déclarées) ==========
create table public.offer_uses (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid references scans(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  partner_id uuid not null references partners(id) on delete cascade,
  offer_id uuid not null references offers(id) on delete cascade,
  declared_saving_eur numeric not null,
  used_at timestamptz default now()
);

-- ========== SIGNALEMENTS ==========
create table public.partner_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete set null,
  partner_id uuid not null references partners(id) on delete cascade,
  reason text not null check (reason in ('not_applied','refused','closed','behavior','other')),
  description text,
  occurred_at date,
  status text check (status in ('open','investigating','resolved','dismissed')) default 'open',
  resolved_by uuid references auth.users(id),
  resolved_at timestamptz,
  admin_note text,
  created_at timestamptz default now()
);

-- ========== AFFILIATION : VIREMENTS (créée avant affiliate_sales pour la FK) ==========
create table public.affiliate_payouts (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references auth.users(id) on delete cascade,
  amount_eur numeric not null,
  iban text not null,
  bic text not null,
  iban_holder text not null,
  status text check (status in ('pending','processing','sent','failed')) default 'pending',
  sales_count int not null,
  scheduled_for date not null,
  sent_at timestamptz,
  notes text,
  created_at timestamptz default now()
);

-- ========== AFFILIATION : VENTES GÉNÉRÉES ==========
create table public.affiliate_sales (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references auth.users(id) on delete cascade,
  referred_user_id uuid not null references auth.users(id) on delete cascade,

  subscription_plan text not null check (subscription_plan in ('monthly','annual')),
  subscription_amount_eur numeric not null,
  stripe_invoice_id text,

  commission_eur numeric not null default 4.00,
  commission_status text not null check (commission_status in ('pending','validated','cancelled','paid','blocked')) default 'pending',

  filleul_signup_at timestamptz not null,
  filleul_paid_at timestamptz not null,
  validated_at timestamptz,
  paid_at timestamptz,
  cancelled_at timestamptz,
  cancellation_reason text,

  payout_id uuid references affiliate_payouts(id),

  created_at timestamptz default now()
);

create index on affiliate_sales(affiliate_id, commission_status);
create unique index unique_referred_user on affiliate_sales(referred_user_id);

-- ========== FAVORIS ==========
create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  partner_id uuid not null references partners(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, partner_id)
);
