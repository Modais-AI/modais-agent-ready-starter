create extension if not exists pgcrypto;

create table if not exists public.starter_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

alter table public.starter_projects enable row level security;

create policy "starter projects are publicly readable"
  on public.starter_projects
  for select
  using (true);
