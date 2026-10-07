-- Profile data collected on sign-up. One row per auth user, created by a trigger.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  address1 text,
  city text,
  state text check (char_length(state) = 2),
  postal_code text,
  date_of_birth date,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Rows are only ever inserted by the trigger below, so no insert/delete grants.
grant select, update on public.profiles to authenticated;

create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Trigger function lives in a non-exposed schema so it is not callable through the Data API.
create schema if not exists private;

create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();
