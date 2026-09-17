-- V2 extends the product row with the reviewed catalogue facts that the
-- local approved records already carry. These fields are deliberately typed
-- so future admin edits do not require a schema rewrite for every facet.
alter table public.products
  add column if not exists sub_style text[] not null default '{}',
  add column if not exists occasion text[] not null default '{}',
  add column if not exists decoration text[] not null default '{}',
  add column if not exists age_group text,
  add column if not exists customizable_fields text[] not null default '{}',
  add column if not exists specifications jsonb not null default '{}',
  add column if not exists featured boolean not null default false,
  add column if not exists sort_order integer not null default 9999;

alter table public.products
  drop constraint if exists products_age_group_check;

alter table public.products
  add constraint products_age_group_check
  check (age_group is null or age_group in ('adult', 'kids', 'mixed'));

create index if not exists products_active_sort_idx
  on public.products (status, featured desc, sort_order, updated_at desc);
