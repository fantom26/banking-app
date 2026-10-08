-- Rename profiles to users, keeping constraint and policy names consistent.
alter table public.profiles rename to users;
alter table public.users rename constraint profiles_pkey to users_pkey;
alter table public.users rename constraint profiles_id_fkey to users_id_fkey;
alter table public.users rename constraint profiles_state_check to users_state_check;

alter policy "Users can view their own profile" on public.users
  rename to "Users can view their own user row";
alter policy "Users can update their own profile" on public.users
  rename to "Users can update their own user row";

-- The trigger body references the table by name, so it must point at the new one.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (
    id,
    first_name,
    last_name,
    address1,
    city,
    state,
    postal_code,
    date_of_birth
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    nullif(new.raw_user_meta_data ->> 'address1', ''),
    nullif(new.raw_user_meta_data ->> 'city', ''),
    nullif(new.raw_user_meta_data ->> 'state', ''),
    nullif(new.raw_user_meta_data ->> 'postal_code', ''),
    nullif(new.raw_user_meta_data ->> 'date_of_birth', '')::date
  );

  return new;
end;
$$;

revoke execute on function private.handle_new_user() from public, anon, authenticated;

-- Dwolla customer created on sign-up. Written only by the server (secret key).
alter table public.users
  add column dwolla_customer_id text unique,
  add column dwolla_customer_url text;

-- Users may edit their own details, but not the Dwolla columns.
revoke update on public.users from authenticated;
grant update (first_name, last_name, address1, city, state, postal_code, date_of_birth)
  on public.users to authenticated;

grant select, update on public.users to service_role;

-- Bank accounts linked through Plaid. Many banks belong to one user.
create table public.banks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  bank_id text not null, -- Plaid item_id
  account_id text not null, -- Plaid account_id
  access_token text not null, -- Plaid access token, server-only
  funding_source_url text not null, -- Dwolla funding source
  sharable_id text not null unique, -- public per-bank handle used for transfers
  created_at timestamptz not null default now(),
  unique (user_id, account_id)
);

create index banks_user_id_idx on public.banks (user_id);

alter table public.banks enable row level security;

-- Rows are only ever inserted by the server, so no insert/update/delete grants.
-- access_token is deliberately left out of the column grant.
revoke all on public.banks from anon, authenticated;
grant select (id, user_id, bank_id, account_id, funding_source_url, sharable_id, created_at)
  on public.banks to authenticated;

grant all on public.banks to service_role;

create policy "Users can view their own banks"
  on public.banks for select
  to authenticated
  using ((select auth.uid()) = user_id);
