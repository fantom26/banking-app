-- Transfers between users made through Dwolla. Plaid transactions are not stored here.
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  amount numeric(12, 2) not null check (amount > 0),
  channel text not null default 'online',
  category text not null default 'Transfer',
  email text not null,
  sender_id uuid not null references public.users (id) on delete cascade,
  sender_bank_id uuid not null references public.banks (id) on delete cascade,
  receiver_id uuid not null references public.users (id) on delete cascade,
  receiver_bank_id uuid not null references public.banks (id) on delete cascade,
  transfer_url text, -- Dwolla transfer location
  created_at timestamptz not null default now()
);

create index transactions_sender_bank_id_idx on public.transactions (sender_bank_id);
create index transactions_receiver_bank_id_idx on public.transactions (receiver_bank_id);

alter table public.transactions enable row level security;

-- Rows are only ever inserted by the server, so no insert/update/delete grants.
revoke all on public.transactions from anon, authenticated;
grant select on public.transactions to authenticated;

grant all on public.transactions to service_role;

create policy "Users can view their own transfers"
  on public.transactions for select
  to authenticated
  using ((select auth.uid()) in (sender_id, receiver_id));
