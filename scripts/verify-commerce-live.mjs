/** Opt-in integration test. Creates and removes only its own marked fixtures. */
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const app = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3005';
const expected = process.env.EXPECTED_SUPABASE_PROJECT_REF;
assert.equal(process.env.RUN_LIVE_COMMERCE_TESTS, 'true', 'Explicit live-test opt-in is required');
assert.ok(expected && base === `https://${expected}.supabase.co`, 'Explicit project reference must match');
assert.ok(anon && service, 'Supabase keys are required');
assert.ok(/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(app), 'Test only against a local app');

const marker = `integration-${randomUUID()}`;
const ids = { user: null, product: null, orders: [], image: null };
const results = [];
async function check(label, fn) { await fn(); results.push(label); console.log(`PASS ${label}`); }
async function request(path, { key = service, token = key, method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${base}${path}`, { method, headers: { apikey: key, Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}), ...headers }, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => null);
  return { status: res.status, ok: res.ok, data };
}
function ok(result, label) { assert.ok(result.ok, `${label}: HTTP ${result.status}, ${result.data?.code || result.data?.error_code || 'provider request failed'}`); return result.data; }
async function insert(table, body) { return ok(await request(`/rest/v1/${table}`, { method: 'POST', body, headers: { Prefer: 'return=representation' } }), `insert ${table}`)[0]; }
let failure;
try {
  const password = `Fixture-${randomUUID()}-A7!`;
  const email = `${marker}@example.invalid`;
  const user = ok(await request('/auth/v1/admin/users', { method: 'POST', body: { email, password, email_confirm: true, app_metadata: { integration_fixture: marker } } }), 'create test identity');
  ids.user = user.id;
  const session = ok(await request('/auth/v1/token?grant_type=password', { key: anon, method: 'POST', body: { email, password } }), 'password login');
  const customer = { key: anon, token: session.access_token };
  await check('Real password authentication and local session endpoint', async () => {
    const r = await fetch(`${app}/api/auth/session/`, { headers: { Cookie: `sm_access_token=${session.access_token}` } });
    assert.equal(r.status, 200); assert.equal((await r.json()).user.id, user.id);
  });
  await check('Ordinary customer cannot use admin endpoints', async () => {
    const r = await fetch(`${app}/api/admin/products/`, { headers: { Cookie: `sm_access_token=${session.access_token}` } });
    assert.equal(r.status, 401);
  });
  await check('Expired access cookie can recover using only the refresh cookie', async () => {
    const r = await fetch(`${app}/api/auth/session/`, { headers: { Cookie: `sm_refresh_token=${session.refresh_token}` } });
    assert.equal(r.status, 200); const data = await r.json(); assert.equal(data.user.id, user.id); assert.equal(data.refreshed, true); assert.equal(data.isAdmin, false); assert.ok(r.headers.get('set-cookie')?.includes('sm_access_token='));
  });
  const imagePath = `products/${marker}.png`;
  const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a+XkAAAAASUVORK5CYII=', 'base64');
  const uploaded = await fetch(`${base}/storage/v1/object/product-media/${imagePath}`, { method: 'POST', headers: { apikey: service, Authorization: `Bearer ${service}`, 'Content-Type': 'image/png', 'x-upsert': 'false' }, body: bytes });
  assert.ok(uploaded.ok, `Upload: HTTP ${uploaded.status}`); ids.image = imagePath;
  const product = await insert('products', { slug: marker, name: 'Temporary integration fixture glove', family: 'kids-dress-gloves', material: 'Satin', colors: ['Ivory'], finger_style: 'full-finger', length_cm: 22, description: 'Automated integration fixture. Removed when the verification completes.', image_urls: [imagePath], status: 'draft' });
  ids.product = product.id;
  await check('Draft product and private media cannot be read publicly', async () => {
    const rows = ok(await request(`/rest/v1/products?id=eq.${product.id}&select=id`, { key: anon }), 'read draft');
    assert.equal(rows.length, 0);
    const r = await fetch(`${app}/api/media/${imagePath}`, { redirect: 'manual' }); assert.equal(r.status, 404);
  });
  const variant = { product_id: product.id, sku: marker, color: 'Ivory', size: 'M', retail_price_minor: 1000, wholesale_price_minor: 900, currency: 'USD', active: true };
  await check('Invalid stock rolls back the entire variant transaction', async () => {
    const bad = await request('/rest/v1/rpc/admin_save_variant', { method: 'POST', body: { p_variant: variant, p_inventory: { quantity: 1, reserved: 2 } } });
    assert.equal(bad.ok, false);
    const rows = ok(await request(`/rest/v1/product_variants?product_id=eq.${product.id}&select=id`), 'read rolled-back variant'); assert.equal(rows.length, 0);
  });
  let saved;
  await check('Variant and inventory are saved atomically', async () => {
    saved = ok(await request('/rest/v1/rpc/admin_save_variant', { method: 'POST', body: { p_variant: variant, p_inventory: { quantity: 10, reserved: 2 } } }), 'save variant');
    const rows = ok(await request(`/rest/v1/inventory?variant_id=eq.${saved.id}&select=quantity,reserved`), 'inventory'); assert.deepEqual(rows, [{ quantity: 10, reserved: 2 }]);
  });
  await check('Publication validates stored media and records the test reviewer', async () => {
    const published = ok(await request('/rest/v1/rpc/admin_publish_product', { method: 'POST', body: { p_product_id: product.id, p_reviewer_id: user.id } }), 'publish fixture'); assert.equal(published.status, 'active');
    const audit = ok(await request(`/rest/v1/product_publications?product_id=eq.${product.id}&select=reviewer_id`), 'publication audit'); assert.deepEqual(audit, [{ reviewer_id: user.id }]);
  });
  await check('Published product reaches catalogue, family page and dynamic PDP', async () => {
    const rows = ok(await request(`/rest/v1/products?id=eq.${product.id}&select=id`, { key: anon }), 'public published row'); assert.equal(rows.length, 1);
    for (const path of ['/products/', '/kids-dress-gloves/', `/products/${marker}/`]) {
      const response = await fetch(`${app}${path}`); assert.equal(response.status, 200, path); assert.ok((await response.text()).includes(product.name), `${path} contains the published name`);
    }
  });
  await check('Published private media resolves to an actual image', async () => {
    const r = await fetch(`${app}/api/media/${imagePath}`); assert.equal(r.status, 200); assert.ok(r.headers.get('content-type')?.startsWith('image/')); assert.ok((await r.arrayBuffer()).byteLength > 0);
  });
  const own = await insert('orders', { customer_id: user.id, currency: 'USD', total_minor: 1000, payment_reference: `${marker}-own` }); ids.orders.push(own.id);
  const other = await insert('orders', { customer_id: null, currency: 'USD', total_minor: 2000, payment_reference: `${marker}-other` }); ids.orders.push(other.id);
  await insert('order_items', { order_id: own.id, variant_id: saved.id, sku: marker, name: product.name, quantity: 1, unit_price_minor: 1000 });
  await check('Order RLS and account API expose only the customer own order', async () => {
    const rows = ok(await request(`/rest/v1/orders?select=id&id=in.(${own.id},${other.id})`, customer), 'customer orders'); assert.deepEqual(rows.map(x => x.id), [own.id]);
    const response = await fetch(`${app}/api/account/orders/`, { headers: { Cookie: `sm_access_token=${session.access_token}` } }); assert.equal(response.status, 200);
    const { data } = await response.json(); assert.deepEqual(data.map(x => x.id), [own.id]); assert.equal(data[0].order_items[0].name, product.name);
  });
  await check('Browser credentials cannot write prices, stock or approval', async () => {
    const stock = await request(`/rest/v1/inventory?variant_id=eq.${saved.id}`, { ...customer, method: 'PATCH', body: { quantity: 999 } }); assert.equal(stock.ok, false);
    const price = await request(`/rest/v1/product_variants?id=eq.${saved.id}`, { ...customer, method: 'PATCH', body: { retail_price_minor: 1 } }); assert.equal(price.ok, false);
    const profile = await request('/rest/v1/customers', { ...customer, method: 'POST', body: { id: user.id, wholesale_status: 'approved' } }); assert.equal(profile.ok, false);
    const publish = await request('/rest/v1/rpc/admin_publish_product', { ...customer, method: 'POST', body: { p_product_id: product.id, p_reviewer_id: user.id } }); assert.equal(publish.ok, false);
  });
} catch (error) { failure = error; console.error(`FAIL ${error.message}`); }
finally {
  const cleanupErrors = [];
  for (const id of ids.orders) { const r = await request(`/rest/v1/orders?id=eq.${id}`, { method: 'DELETE' }); if (!r.ok) cleanupErrors.push(`order ${id}`); }
  if (ids.product) { const r = await request(`/rest/v1/products?id=eq.${ids.product}`, { method: 'DELETE' }); if (!r.ok) cleanupErrors.push(`product ${ids.product}`); }
  if (ids.image) { const r = await request('/storage/v1/object/product-media', { method: 'DELETE', body: { prefixes: [ids.image] } }); if (!r.ok) cleanupErrors.push(`image ${ids.image}`); }
  if (ids.user) { const r = await request(`/auth/v1/admin/users/${ids.user}`, { method: 'DELETE' }); if (!r.ok) cleanupErrors.push(`test identity ${ids.user}`); }
  if (cleanupErrors.length) { console.error(`CLEANUP REQUIRED: ${cleanupErrors.join(', ')}`); process.exitCode = 1; }
  else console.log('PASS All fixtures created by this run removed');
  if (failure) process.exitCode = 1;
  console.log(JSON.stringify({ passed: results.length, failed: Boolean(failure), cleanupComplete: cleanupErrors.length === 0 }));
}
