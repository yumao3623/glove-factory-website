-- The platform-created event trigger is not an application RPC.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
create policy "inventory is server managed" on public.inventory for all to anon, authenticated using (false) with check (false);
