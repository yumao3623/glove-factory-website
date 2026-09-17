-- Server-managed abuse limits persist across serverless instances. No PII is stored.
create table public.request_limits (
  key_hash text primary key,
  attempts integer not null,
  expires_at timestamptz not null
);
alter table public.request_limits enable row level security;
revoke all on public.request_limits from public, anon, authenticated;
grant all on public.request_limits to service_role;
create function public.consume_request_limit(p_key text, p_limit integer, p_seconds integer)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare attempts_now integer;
begin
  if p_limit < 1 or p_seconds < 1 or p_seconds > 86400 then raise exception 'Invalid limit'; end if;
  delete from public.request_limits where expires_at < now() - interval '1 day';
  insert into public.request_limits(key_hash, attempts, expires_at)
  values(p_key, 1, now() + make_interval(secs => p_seconds))
  on conflict (key_hash) do update set
    attempts = case when request_limits.expires_at <= now() then 1 else request_limits.attempts + 1 end,
    expires_at = case when request_limits.expires_at <= now() then now() + make_interval(secs => p_seconds) else request_limits.expires_at end
  returning attempts into attempts_now;
  return attempts_now <= p_limit;
end;
$$;
revoke execute on function public.consume_request_limit(text,integer,integer) from public,anon,authenticated;
grant execute on function public.consume_request_limit(text,integer,integer) to service_role;

alter table public.orders
  add column buyer_email text,
  add column rfq_id uuid references public.rfq_requests(id),
  add column quote_status text not null default 'draft' check (quote_status in ('draft','approved','cancelled')),
  add column quote_expires_at timestamptz,
  add column quote_terms text,
  add column quote_access_hash text,
  add column approved_by uuid references auth.users(id),
  add column approved_at timestamptz,
  add column paypal_order_id text unique,
  add column paypal_capture_id text unique;
create index orders_rfq_idx on public.orders(rfq_id);
create index orders_approved_by_idx on public.orders(approved_by);
-- A public buyer must never receive the access hash through their own-order select.
revoke select on public.orders from authenticated;
grant select (id,customer_id,payment_provider,payment_reference,currency,subtotal_minor,tax_minor,shipping_minor,total_minor,payment_status,fulfillment_status,shipping_address,created_at,updated_at,quote_status,quote_expires_at,quote_terms) on public.orders to authenticated;

create table public.payment_events (
  provider_event_id text primary key,
  order_id uuid not null references public.orders(id),
  event_type text not null,
  created_at timestamptz not null default now()
);
create index payment_events_order_idx on public.payment_events(order_id);
alter table public.payment_events enable row level security;
revoke all on public.payment_events from public,anon,authenticated;
grant all on public.payment_events to service_role;

create function public.admin_create_quote(p_quote jsonb, p_items jsonb, p_actor uuid)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare q public.orders; item jsonb; subtotal bigint := 0; tax bigint; shipping bigint; buyer uuid;
begin
  if jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items) > 50 then raise exception 'Add 1 to 50 quote lines'; end if;
  if length(trim(p_quote->>'quote_terms')) < 20 or p_quote->>'currency' not in ('USD','EUR','GBP','AUD','CAD') then raise exception 'Confirm quote terms and currency'; end if;
  if (p_quote->>'quote_expires_at')::timestamptz <= now() then raise exception 'Quote is expired'; end if;
  for item in select value from jsonb_array_elements(p_items) loop
    if (item->>'quantity')::integer < 1 or (item->>'unit_price_minor')::integer < 1 or length(trim(item->>'name')) < 2 then raise exception 'Invalid quote line'; end if;
    subtotal := subtotal + (item->>'quantity')::integer::bigint * (item->>'unit_price_minor')::integer;
  end loop;
  tax := (p_quote->>'tax_minor')::integer; shipping := (p_quote->>'shipping_minor')::integer;
  if tax < 0 or shipping < 0 or subtotal + tax + shipping > 100000000 then raise exception 'Invalid total'; end if;
  select id into buyer from auth.users where lower(email) = lower(p_quote->>'buyer_email') and email_confirmed_at is not null limit 1;
  insert into public.orders(buyer_email,customer_id,rfq_id,currency,subtotal_minor,tax_minor,shipping_minor,total_minor,quote_status,quote_expires_at,quote_terms,quote_access_hash,approved_by,approved_at)
  values(lower(p_quote->>'buyer_email'),buyer,nullif(p_quote->>'rfq_id','')::uuid,p_quote->>'currency',subtotal,tax,shipping,subtotal+tax+shipping,'approved',(p_quote->>'quote_expires_at')::timestamptz,p_quote->>'quote_terms',p_quote->>'quote_access_hash',p_actor,now()) returning * into q;
  for item in select value from jsonb_array_elements(p_items) loop
    insert into public.order_items(order_id,sku,name,quantity,unit_price_minor) values(q.id,coalesce(nullif(item->>'sku',''),'QUOTE'),item->>'name',(item->>'quantity')::integer,(item->>'unit_price_minor')::integer);
  end loop;
  if q.rfq_id is not null then perform public.admin_update_rfq_status(q.rfq_id,'quoted',p_actor); end if;
  return q.id;
end;
$$;
revoke execute on function public.admin_create_quote(jsonb,jsonb,uuid) from public,anon,authenticated;
grant execute on function public.admin_create_quote(jsonb,jsonb,uuid) to service_role;

create function public.apply_paypal_capture(p_order_id uuid,p_paypal_order text,p_capture text,p_event text,p_amount integer,p_currency text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare q public.orders;
begin
  select * into q from public.orders where id=p_order_id for update;
  if not found or q.paypal_order_id is distinct from p_paypal_order or q.total_minor <> p_amount or q.currency <> p_currency then raise exception 'Payment does not match the order'; end if;
  if q.payment_status = 'refunded' then return false; end if;
  if q.paypal_capture_id is not null and q.paypal_capture_id <> p_capture then raise exception 'Order already captured'; end if;
  insert into public.payment_events(provider_event_id,order_id,event_type) values(p_event,p_order_id,'PAYMENT.CAPTURE.COMPLETED') on conflict do nothing;
  update public.orders set payment_provider='paypal',payment_reference=p_capture,paypal_capture_id=p_capture,payment_status='paid' where id=p_order_id;
  return true;
end;
$$;
revoke execute on function public.apply_paypal_capture(uuid,text,text,text,integer,text) from public,anon,authenticated;
grant execute on function public.apply_paypal_capture(uuid,text,text,text,integer,text) to service_role;
