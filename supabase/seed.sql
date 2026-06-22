-- ============================================================================
-- FREEZE — Données de démo
-- À exécuter d'un coup après les migrations.
-- ============================================================================

-- ========== USERS (auth.users + profiles) ==========
-- Note : auth.users nécessite un mot de passe haché ; en local Supabase, on
-- peut insérer directement via la fonction `auth.users` avec un hash bcrypt
-- générique ("password123" pour tous les comptes de démo).

insert into auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, aud, role)
values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'premium.demo@carte-freeze.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'free.demo@carte-freeze.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'affilie.demo@carte-freeze.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated')
on conflict (id) do nothing;

insert into public.profiles (id, role, first_name, last_name, phone, birth_date, certified_under_30, is_premium, premium_plan, premium_since, premium_expires_at, affiliate_code, affiliate_balance_eur, affiliate_earned_total_eur, affiliate_earned_year_eur, total_savings_eur, offers_used_count)
values
  ('11111111-1111-1111-1111-111111111111', 'user', 'Antoine', 'Dupont', '0612345678', '2002-03-14', true, true, 'annual', now() - interval '2 months', now() + interval '10 months', 'PREM01', 0, 0, 0, 38.5, 6),
  ('22222222-2222-2222-2222-222222222222', 'user', 'Léa', 'Martin', '0698765432', '2003-07-21', true, false, null, null, null, 'FREE02', 0, 0, 0, 0, 0),
  ('33333333-3333-3333-3333-333333333333', 'user', 'Yanis', 'Bernard', '0611223344', '2001-11-02', true, true, 'monthly', now() - interval '5 months', now() + interval '1 month', 'AFFIL3', 12, 32, 32, 14, 3)
on conflict (id) do nothing;

-- ========== PARTENAIRES ==========
insert into public.partners (id, owner_id, status, name, category, logo_url, address, city, postal_code, latitude, longitude, contact_email, contact_phone, legal_info_collected, validated_at)
values
  ('a0000000-0000-0000-0000-000000000001', null, 'validated', 'McDonald''s Châtelet', 'resto', null, '5 Rue de la Ferronnerie', 'Paris', '75001', 48.8606, 2.3477, 'contact@mcdo-chatelet.fr', '0140000001', true, now()),
  ('a0000000-0000-0000-0000-000000000002', null, 'validated', 'Yoze', 'resto', null, '12 Rue Montorgueil', 'Paris', '75002', 48.8649, 2.3477, 'contact@yoze.fr', '0140000002', true, now()),
  ('a0000000-0000-0000-0000-000000000003', null, 'validated', 'Falstaff', 'bars', null, '42 Rue de la Bastille', 'Paris', '75012', 48.8530, 2.3690, 'contact@falstaff.fr', '0140000003', true, now()),
  ('a0000000-0000-0000-0000-000000000004', null, 'validated', 'Matsuri', 'resto', null, '36 Rue de Richelieu', 'Paris', '75001', 48.8654, 2.3376, 'contact@matsuri.fr', '0140000004', true, now()),
  ('a0000000-0000-0000-0000-000000000005', null, 'validated', 'Food Tea', 'resto', null, '8 Rue Oberkampf', 'Paris', '75011', 48.8650, 2.3750, 'contact@foodtea.fr', '0140000005', true, now()),
  ('a0000000-0000-0000-0000-000000000006', null, 'validated', 'Subway Bastille', 'resto', null, '15 Boulevard Beaumarchais', 'Paris', '75004', 48.8550, 2.3680, 'contact@subway-bastille.fr', '0140000006', true, now()),
  ('a0000000-0000-0000-0000-000000000007', null, 'validated', 'O''Tacos République', 'resto', null, '22 Boulevard du Temple', 'Paris', '75011', 48.8670, 2.3650, 'contact@otacos-rep.fr', '0140000007', true, now()),
  ('a0000000-0000-0000-0000-000000000008', null, 'validated', 'FitClub Marais', 'sport', null, '18 Rue des Archives', 'Paris', '75004', 48.8600, 2.3580, 'contact@fitclub-marais.fr', '0140000008', true, now()),
  ('a0000000-0000-0000-0000-000000000009', null, 'validated', 'BeautyBar Pigalle', 'beauty', null, '9 Rue Houdon', 'Paris', '75018', 48.8830, 2.3380, 'contact@beautybar-pigalle.fr', '0140000009', true, now()),
  ('a0000000-0000-0000-0000-000000000010', null, 'validated', 'Le Petit Ciné', 'loisirs', null, '3 Rue Champollion', 'Paris', '75005', 48.8500, 2.3440, 'contact@petitcine.fr', '0140000010', true, now()),
  ('a0000000-0000-0000-0000-000000000011', null, 'validated', 'Bowling Montparnasse', 'loisirs', null, '27 Rue de l''Arrivée', 'Paris', '75015', 48.8420, 2.3220, 'contact@bowling-mtp.fr', '0140000011', true, now()),
  ('a0000000-0000-0000-0000-000000000012', null, 'validated', 'StreetWear Co.', 'shopping', null, '40 Rue de Rivoli', 'Paris', '75004', 48.8560, 2.3560, 'contact@streetwearco.fr', '0140000012', true, now()),
  ('a0000000-0000-0000-0000-000000000013', null, 'validated', 'BioBeauty Shop', 'shopping', null, '6 Rue des Rosiers', 'Paris', '75004', 48.8580, 2.3610, 'contact@biobeauty.fr', '0140000013', true, now()),
  ('a0000000-0000-0000-0000-000000000014', null, 'validated', 'YogaLoft', 'sport', null, '11 Rue de Charonne', 'Paris', '75011', 48.8530, 2.3760, 'contact@yogaloft.fr', '0140000014', true, now()),
  ('a0000000-0000-0000-0000-000000000015', null, 'validated', 'PrintShop Online', 'online', null, '0 Internet', 'Paris', '75000', 48.8566, 2.3522, 'contact@printshop.fr', '0140000015', true, now())
on conflict (id) do nothing;

-- ========== OFFRES (1 permanente par partenaire) ==========
insert into public.offers (partner_id, kind, description, mode, estimated_saving_eur, validity_text, is_featured, is_new_spot)
select id, 'permanent', '-20% sur l''addition', 'comptoir', 4, 'Valable tous les jours', false, false
from public.partners;

-- 5 partenaires ont en plus une offre découverte (cadeau de bienvenue)
insert into public.offers (partner_id, kind, description, mode, estimated_saving_eur, validity_text, is_new_spot)
select id, 'discovery', 'Un dessert offert pour ta première visite', 'comptoir', 5, 'Valable 1 seule fois', true
from public.partners
limit 5;

-- ========== SCANS DE DÉMO (réparti sur 6 mois) ==========
insert into public.scans (user_id, partner_id, offer_id, offer_kind, scanned_at)
select
  '11111111-1111-1111-1111-111111111111',
  o.partner_id,
  o.id,
  o.kind,
  now() - (interval '1 day' * (random() * 180)::int)
from public.offers o
where o.kind = 'permanent'
limit 20;

-- ========== UTILISATIONS D'OFFRES (économies déclarées) ==========
insert into public.offer_uses (scan_id, user_id, partner_id, offer_id, declared_saving_eur, used_at)
select s.id, s.user_id, s.partner_id, s.offer_id, (random() * 5 + 2)::numeric(10,2), s.scanned_at + interval '1 hour'
from public.scans s
limit 12;

-- ========== AFFILIATION : 8 ventes validées pour l'affilié de démo ==========
-- (les filleuls ont besoin d'exister dans auth.users pour respecter la FK)
insert into auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, aud, role)
select
  ('b0000000-0000-0000-0000-00000000000' || n)::uuid,
  '00000000-0000-0000-0000-000000000000',
  'filleul' || n || '.demo@carte-freeze.com',
  crypt('password123', gen_salt('bf')),
  now(), now(), now(), 'authenticated', 'authenticated'
from generate_series(1, 8) as n
on conflict (id) do nothing;

insert into public.profiles (id, role, first_name, last_name, birth_date, certified_under_30, affiliate_code)
select
  ('b0000000-0000-0000-0000-00000000000' || n)::uuid,
  'user', 'Filleul', n::text, '2002-01-01', true, 'FIL' || n || '00'
from generate_series(1, 8) as n
on conflict (id) do nothing;

insert into public.affiliate_sales (affiliate_id, referred_user_id, subscription_plan, subscription_amount_eur, commission_eur, commission_status, filleul_signup_at, filleul_paid_at, validated_at)
select
  '33333333-3333-3333-3333-333333333333',
  ('b0000000-0000-0000-0000-00000000000' || n)::uuid,
  case when n % 2 = 0 then 'monthly' else 'annual' end,
  case when n % 2 = 0 then 2.5 else 25 end,
  4.00,
  'validated',
  now() - interval '1 day' * (40 + n * 5),
  now() - interval '1 day' * (40 + n * 5) + interval '1 hour',
  now() - interval '1 day' * (26 + n * 5)
from generate_series(1, 8) as n;
