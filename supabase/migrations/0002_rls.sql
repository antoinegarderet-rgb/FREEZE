-- ============================================================================
-- FREEZE — Row Level Security
-- ============================================================================

-- profiles : un user lit/modifie son propre profil uniquement
alter table profiles enable row level security;
create policy "users_read_own" on profiles for select using (auth.uid() = id);
create policy "users_update_own" on profiles for update using (auth.uid() = id);
create policy "users_insert_own" on profiles for insert with check (auth.uid() = id);

-- partners : tout le monde lit les validés, le propriétaire CRUD le sien
alter table partners enable row level security;
create policy "public_read_validated" on partners for select using (status = 'validated');
create policy "owner_read_own" on partners for select using (auth.uid() = owner_id);
create policy "owner_update_own" on partners for update using (auth.uid() = owner_id);
create policy "owner_insert_own" on partners for insert with check (auth.uid() = owner_id);

-- offers : visibles si partenaire validé et offre active
alter table offers enable row level security;
create policy "public_read_active" on offers for select using (
  is_active = true AND
  exists (select 1 from partners where partners.id = offers.partner_id and partners.status = 'validated')
);
create policy "owner_crud_own" on offers for all using (
  exists (select 1 from partners where partners.id = offers.partner_id and partners.owner_id = auth.uid())
);

-- scans : un user voit ses scans, un partenaire voit les siens
alter table scans enable row level security;
create policy "user_read_own_scans" on scans for select using (auth.uid() = user_id);
create policy "partner_read_own_scans" on scans for select using (
  exists (select 1 from partners where partners.id = scans.partner_id and partners.owner_id = auth.uid())
);
create policy "user_insert_own_scans" on scans for insert with check (auth.uid() = user_id);

-- offer_uses : idem scans
alter table offer_uses enable row level security;
create policy "user_read_own_uses" on offer_uses for select using (auth.uid() = user_id);
create policy "user_insert_own_uses" on offer_uses for insert with check (auth.uid() = user_id);

-- partner_reports : un user crée et lit les siens, le partenaire ne voit RIEN
alter table partner_reports enable row level security;
create policy "user_crud_own_reports" on partner_reports for all using (auth.uid() = user_id);

-- affiliate_sales : un affilié voit ses propres ventes (commissions)
alter table affiliate_sales enable row level security;
create policy "affiliate_read_own_sales" on affiliate_sales for select using (auth.uid() = affiliate_id);

-- affiliate_payouts : un affilié voit ses propres virements
alter table affiliate_payouts enable row level security;
create policy "affiliate_read_own_payouts" on affiliate_payouts for select using (auth.uid() = affiliate_id);

-- favorites : un user gère ses propres favoris
alter table favorites enable row level security;
create policy "user_crud_own_favorites" on favorites for all using (auth.uid() = user_id);

-- L'admin web FREEZE utilise la service_role_key qui bypass RLS (hors scope de ce build).
