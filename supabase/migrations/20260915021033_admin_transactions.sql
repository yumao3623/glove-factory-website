-- Administrative writes remain atomic and callable only by the app server.
create function public.admin_save_variant(p_variant jsonb, p_inventory jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare v public.product_variants; v_id uuid := nullif(p_variant->>'id','')::uuid;
begin
  if p_variant->>'currency' not in ('USD','GBP','EUR','CNY') then
    raise exception 'Unsupported currency' using errcode='22023';
  end if;
  if coalesce(p_variant->>'sku','') !~ '^[A-Za-z0-9._-]{2,80}$' then
    raise exception 'Invalid SKU' using errcode='22023';
  end if;
  if v_id is null then
    insert into public.product_variants (product_id,sku,color,size,retail_price_minor,wholesale_price_minor,currency,active)
    values ((p_variant->>'product_id')::uuid,p_variant->>'sku',p_variant->>'color',p_variant->>'size',
      (p_variant->>'retail_price_minor')::integer,(p_variant->>'wholesale_price_minor')::integer,
      p_variant->>'currency',coalesce((p_variant->>'active')::boolean,true)) returning * into v;
  else
    update public.product_variants set sku=p_variant->>'sku',color=p_variant->>'color',size=p_variant->>'size',
      retail_price_minor=(p_variant->>'retail_price_minor')::integer,
      wholesale_price_minor=(p_variant->>'wholesale_price_minor')::integer,currency=p_variant->>'currency',
      active=coalesce((p_variant->>'active')::boolean,true)
      where id=v_id and product_id=(p_variant->>'product_id')::uuid returning * into v;
    if not found then raise exception 'Variant not found' using errcode='22023'; end if;
  end if;
  if p_inventory is not null then
    insert into public.inventory (variant_id,quantity,reserved)
      values(v.id,coalesce((p_inventory->>'quantity')::integer,0),coalesce((p_inventory->>'reserved')::integer,0))
      on conflict (variant_id) do update set quantity=excluded.quantity,reserved=excluded.reserved;
  else
    insert into public.inventory (variant_id,quantity,reserved) values(v.id,0,0) on conflict (variant_id) do nothing;
  end if;
  return to_jsonb(v);
end;
$$;
revoke execute on function public.admin_save_variant(jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.admin_save_variant(jsonb,jsonb) to service_role;

create table public.product_publications (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  reviewer_id uuid not null references auth.users(id),
  reviewed_at timestamptz not null default now()
);
alter table public.product_publications enable row level security;
revoke all on public.product_publications from anon,authenticated;
grant all on public.product_publications to service_role;
create policy "publication audit is server managed" on public.product_publications for all to anon,authenticated using(false) with check(false);
create index product_publications_product_idx on public.product_publications(product_id);
create index product_publications_reviewer_idx on public.product_publications(reviewer_id);

create function public.admin_publish_product(p_product_id uuid,p_reviewer_id uuid)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare p public.products;
begin
  select * into p from public.products where id=p_product_id for update;
  if not found then raise exception 'Product not found' using errcode='22023'; end if;
  if coalesce(array_length(p.image_urls,1),0)=0 or coalesce(length(trim(p.name)),0)<2
    or coalesce(length(trim(p.description)),0)=0 then
    raise exception 'Review product name, description and images before publishing' using errcode='22023';
  end if;
  if exists(select 1 from unnest(p.image_urls) u where not exists
    (select 1 from storage.objects o where o.bucket_id='product-media' and o.name=u)) then
    raise exception 'A product image is missing from storage' using errcode='22023';
  end if;
  update public.products set status='active' where id=p.id returning * into p;
  insert into public.product_publications(product_id,reviewer_id) values(p.id,p_reviewer_id);
  return to_jsonb(p);
end;
$$;
revoke execute on function public.admin_publish_product(uuid,uuid) from public,anon,authenticated;
grant execute on function public.admin_publish_product(uuid,uuid) to service_role;
