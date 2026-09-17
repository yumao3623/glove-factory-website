-- Keep auth.users inaccessible to service_role generally. This narrow RPC alone resolves a verified buyer.
alter function public.admin_create_quote(jsonb,jsonb,uuid) security definer;
revoke execute on function public.admin_create_quote(jsonb,jsonb,uuid) from public, anon, authenticated;
grant execute on function public.admin_create_quote(jsonb,jsonb,uuid) to service_role;

-- Explicit deny policies document the service-only tables.
create policy request_limits_no_client_access on public.request_limits for all to anon, authenticated using (false) with check (false);
create policy payment_events_no_client_access on public.payment_events for all to anon, authenticated using (false) with check (false);
