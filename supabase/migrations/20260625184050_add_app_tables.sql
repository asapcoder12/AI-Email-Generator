-- App data for the AI Email Generator MVP.
-- Supabase Auth remains the source of truth for users; public tables store
-- profile display data and generated email history.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'business')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.generated_emails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  tone text not null check (tone in ('professional', 'friendly', 'persuasive', 'concise')),
  length text not null check (length in ('short', 'medium', 'long')),
  subject text not null,
  body text not null,
  provider text not null default 'mock' check (provider in ('mock')),
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists profiles_email_idx
  on public.profiles (lower(email));

create index if not exists generated_emails_user_created_idx
  on public.generated_emails (user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.generated_emails enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can read their own generated emails" on public.generated_emails;
create policy "Users can read their own generated emails"
on public.generated_emails
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their own generated emails" on public.generated_emails;
create policy "Users can create their own generated emails"
on public.generated_emails
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own generated emails" on public.generated_emails;
create policy "Users can delete their own generated emails"
on public.generated_emails
for delete
to authenticated
using (auth.uid() = user_id);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, delete on public.generated_emails to authenticated;
