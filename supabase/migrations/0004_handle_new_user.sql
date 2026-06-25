-- ============================================================================
-- FREEZE — Création automatique du profil à l'inscription
-- ============================================================================
-- Le insert direct côté client (supabase.from('profiles').insert(...)) échoue
-- tant que l'email n'est pas confirmé : signUp() ne renvoie pas de session,
-- donc auth.uid() est null côté client et la policy RLS "users_insert_own"
-- bloque l'insert. On déplace la création du profil dans un trigger
-- security definer sur auth.users, qui s'exécute hors RLS et lit les
-- métadonnées passées à signUp({ options: { data: {...} } }).

create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, role, first_name, last_name, phone, birth_date, certified_under_30, referred_by_code)
  values (
    NEW.id,
    'user',
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'phone',
    (NEW.raw_user_meta_data->>'birth_date')::date,
    coalesce((NEW.raw_user_meta_data->>'certified_under_30')::boolean, false),
    NEW.raw_user_meta_data->>'referred_by_code'
  )
  on conflict (id) do nothing;
  return NEW;
end; $$ language plpgsql security definer set search_path = public;

create trigger trg_handle_new_user
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Le insert direct côté client n'est plus utilisé pour la création (le
-- trigger s'en charge), mais la policy reste utile si on veut un jour
-- permettre un upsert manuel depuis l'app.
