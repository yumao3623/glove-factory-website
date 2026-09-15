-- JS Meilai commerce foundation. Apply with Supabase CLI after linking a project.
-- Every exposed table has RLS enabled. Prices and stock are server-owned.
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
  family text not null, material text, length_cm numeric, finger_style text, colors text[] not null default '{}',
  description text, image_urls text[] not null default '{}', status text not null default 'draft' check (status in ('draft','active','archived')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete cascade,
  sku text unique not null, color text, size text, wholesale_price_minor integer check (wholesale_price_minor >= 0), retail_price_minor integer check (retail_price_minor >= 0),
  currency text not null default 'USD', active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.inventory (
  variant_id uuid primary key references public.product_variants(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0), reserved integer not null default 0 check (reserved >= 0 and reserved <= quantity),
  updated_at timestamptz not null default now()
);
create table if not exists public.customers (
  id uuid primary key references auth.users(id) on delete cascade, company_name text, country text, phone text,
  wholesale_status text not null default 'pending' check (wholesale_status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(), customer_id uuid references auth.users(id) on delete set null,
  session_token text unique, currency text not null default 'USD', status text not null default 'open' check (status in ('open','converted','abandoned')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(), cart_id uuid not null references public.carts(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id), quantity integer not null check (quantity > 0),
  unit_price_minor integer, options jsonb not null default '{}', unique(cart_id, variant_id, options)
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(), customer_id uuid references auth.users(id) on delete set null,
  payment_provider text, payment_reference text unique, currency text not null, subtotal_minor integer not null default 0,
  tax_minor integer not null default 0, shipping_minor integer not null default 0, total_minor integer not null default 0,
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  fulfillment_status text not null default 'unfulfilled' check (fulfillment_status in ('unfulfilled','processing','shipped','complete','cancelled')),
  shipping_address jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete set null, sku text not null, name text not null,
  quantity integer not null check (quantity > 0), unit_price_minor integer not null, options jsonb not null default '{}'
);
create table if not exists public.rfq_requests (
  id uuid primary key default gen_random_uuid(), customer_id uuid references auth.users(id) on delete set null,
  product_id uuid references public.products(id) on delete set null, email text not null, company_name text,
  country text, contact_name text, whatsapp text, product_family text, quantity integer check (quantity > 0), quantity_description text, consent_at timestamptz, message text, status text not null default 'new' check (status in ('new','reviewing','quoted','won','closed')),
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.inventory enable row level security;
alter table public.customers enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.rfq_requests enable row level security;

create policy "active products are public" on public.products for select to anon, authenticated using (status = 'active');
create policy "active variants are public" on public.product_variants for select to anon, authenticated using (active = true and exists (select 1 from public.products p where p.id = product_id and p.status = 'active'));
create policy "customers read own profile" on public.customers for select to authenticated using ((select auth.uid()) = id);
create policy "customers create own profile" on public.customers for insert to authenticated with check ((select auth.uid()) = id and wholesale_status = 'pending');
create policy "customers update own contact information" on public.customers for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "customers own carts" on public.carts for all to authenticated using ((select auth.uid()) = customer_id) with check ((select auth.uid()) = customer_id);
create policy "customers own cart items" on public.cart_items for all to authenticated using (exists (select 1 from public.carts c where c.id = cart_id and c.customer_id = (select auth.uid()))) with check (exists (select 1 from public.carts c where c.id = cart_id and c.customer_id = (select auth.uid())));
create policy "customers own orders" on public.orders for select to authenticated using ((select auth.uid()) = customer_id);
create policy "customers own order items" on public.order_items for select to authenticated using (exists (select 1 from public.orders o where o.id = order_id and o.customer_id = (select auth.uid())));
create policy "customers read own rfq" on public.rfq_requests for select to authenticated using ((select auth.uid()) = customer_id);

-- Permissions are explicit because automatic table exposure is disabled in this project.
-- RLS alone cannot stop a user from changing a privileged field on their own row.
revoke all on public.products, public.product_variants, public.inventory, public.customers,
  public.carts, public.cart_items, public.orders, public.order_items, public.rfq_requests from anon, authenticated;
grant usage on schema public to anon, authenticated, service_role;
grant all on public.products, public.product_variants, public.inventory, public.customers,
  public.carts, public.cart_items, public.orders, public.order_items, public.rfq_requests to service_role;
grant select on public.products to anon, authenticated;
grant select (id, product_id, sku, color, size, retail_price_minor, currency, active, created_at)
  on public.product_variants to anon, authenticated;
grant select on public.customers, public.carts, public.cart_items, public.orders, public.order_items, public.rfq_requests to authenticated;
grant insert (id, company_name, country, phone) on public.customers to authenticated;
grant update (company_name, country, phone) on public.customers to authenticated;
grant insert (customer_id, currency) on public.carts to authenticated;
grant update (currency) on public.carts to authenticated;
grant insert (cart_id, variant_id, quantity, options) on public.cart_items to authenticated;
grant update (quantity, options) on public.cart_items to authenticated;
grant delete on public.cart_items to authenticated;

create index products_active_family_idx on public.products (family) where status = 'active';
create index variants_product_idx on public.product_variants (product_id);
create index carts_customer_idx on public.carts (customer_id);
create index cart_items_variant_idx on public.cart_items (variant_id);
create index orders_customer_created_idx on public.orders (customer_id, created_at desc);
create index order_items_order_idx on public.order_items (order_id);
create index order_items_variant_idx on public.order_items (variant_id);
create index rfq_customer_created_idx on public.rfq_requests (customer_id, created_at desc);
create index rfq_product_idx on public.rfq_requests (product_id);

create function public.set_commerce_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
revoke all on function public.set_commerce_updated_at() from public;
create trigger products_updated before update on public.products for each row execute function public.set_commerce_updated_at();
create trigger inventory_updated before update on public.inventory for each row execute function public.set_commerce_updated_at();
create trigger customers_updated before update on public.customers for each row execute function public.set_commerce_updated_at();
create trigger carts_updated before update on public.carts for each row execute function public.set_commerce_updated_at();
create trigger orders_updated before update on public.orders for each row execute function public.set_commerce_updated_at();

-- Draft uploads remain private. Application server signs media links for admins.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-media', 'product-media', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
-- No browser-side write policy; only the authenticated admin server uses service_role.
