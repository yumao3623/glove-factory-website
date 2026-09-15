alter table public.rfq_requests
  add column idempotency_key uuid unique,
  add column product_context jsonb not null default '[]'::jsonb,
  add column notification_status text not null default 'pending' check (notification_status in ('pending','accepted','failed')),
  add column notification_id text,
  add column notification_error text;

create table public.rfq_status_events (
  id uuid primary key default gen_random_uuid(),
  rfq_id uuid not null references public.rfq_requests(id) on delete cascade,
  actor_id uuid not null references auth.users(id),
  previous_status text not null,
  next_status text not null,
  created_at timestamptz not null default now()
);
create index rfq_status_events_rfq_idx on public.rfq_status_events(rfq_id);
create index rfq_status_events_actor_idx on public.rfq_status_events(actor_id);
alter table public.rfq_status_events enable row level security;
revoke all on public.rfq_status_events from anon,authenticated;
grant all on public.rfq_status_events to service_role;
create policy "RFQ history is server managed" on public.rfq_status_events for all to anon,authenticated using(false) with check(false);

create function public.admin_update_rfq_status(p_id uuid,p_status text,p_actor uuid)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare r public.rfq_requests;
begin
  if p_status not in ('new','reviewing','quoted','won','closed') then raise exception 'Invalid RFQ status'; end if;
  select * into r from public.rfq_requests where id=p_id for update;
  if not found then raise exception 'RFQ not found'; end if;
  if r.status is distinct from p_status then
    insert into public.rfq_status_events(rfq_id,actor_id,previous_status,next_status) values(p_id,p_actor,r.status,p_status);
    update public.rfq_requests set status=p_status where id=p_id returning * into r;
  end if;
  return to_jsonb(r);
end;
$$;
revoke execute on function public.admin_update_rfq_status(uuid,text,uuid) from public,anon,authenticated;
grant execute on function public.admin_update_rfq_status(uuid,text,uuid) to service_role;
