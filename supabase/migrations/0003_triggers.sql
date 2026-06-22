-- ============================================================================
-- FREEZE — Triggers
-- ============================================================================

-- Trigger : maj automatique des compteurs profile quand offer_use insérée
create function update_user_savings() returns trigger as $$
begin
  update profiles
  set
    total_savings_eur = total_savings_eur + NEW.declared_saving_eur,
    offers_used_count = offers_used_count + 1,
    updated_at = now()
  where id = NEW.user_id;
  return NEW;
end; $$ language plpgsql;

create trigger trg_offer_use_insert
  after insert on offer_uses
  for each row execute function update_user_savings();

-- Trigger : repassage en pending_review quand offre modifiée
create function offer_modified_to_review() returns trigger as $$
begin
  if NEW.description <> OLD.description OR NEW.estimated_saving_eur is distinct from OLD.estimated_saving_eur then
    NEW.pending_review = true;
  end if;
  return NEW;
end; $$ language plpgsql;

create trigger trg_offer_modified
  before update on offers
  for each row execute function offer_modified_to_review();

-- Trigger : maj du solde affilié quand vente passe à 'validated'
create function update_affiliate_balance() returns trigger as $$
begin
  if NEW.commission_status = 'validated' and OLD.commission_status = 'pending' then
    update profiles
    set
      affiliate_balance_eur = affiliate_balance_eur + NEW.commission_eur,
      affiliate_earned_total_eur = affiliate_earned_total_eur + NEW.commission_eur,
      affiliate_earned_year_eur = affiliate_earned_year_eur + NEW.commission_eur
    where id = NEW.affiliate_id;
  end if;
  return NEW;
end; $$ language plpgsql;

create trigger trg_affiliate_sale_validated
  after update on affiliate_sales
  for each row execute function update_affiliate_balance();
