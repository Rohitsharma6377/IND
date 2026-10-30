import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fail, id, now, hash, secret, text, integer, email, passwordHash, verifyPassword, theme, defaultTheme, PLANS, PLUGINS, APP_SCOPES, can } from './contracts.mjs';

export class Commerce {
  constructor(filename = ':memory:') {
    if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true });
    this.db = new DatabaseSync(filename);
    this.depth = 0;
    this.db.exec(readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'));
    this.db.exec(readFileSync(new URL('./expansion.sql', import.meta.url), 'utf8'));
    this.db.exec(readFileSync(new URL('./media.sql', import.meta.url), 'utf8'));
  }
  close() { this.db.close(); }
  get(sql, ...args) { return this.db.prepare(sql).get(...args); }
  all(sql, ...args) { return this.db.prepare(sql).all(...args); }
  run(sql, ...args) { return this.db.prepare(sql).run(...args); }
  tx(fn) {
    if (this.depth) return fn();
    this.db.exec('BEGIN IMMEDIATE'); this.depth++;
    try { const value = fn(); this.db.exec('COMMIT'); return value; }
    catch (error) { this.db.exec('ROLLBACK'); throw error; }
    finally { this.depth--; }
  }
  audit(store, actor, action, detail) {
    this.run('INSERT INTO audit VALUES(?,?,?,?,?,?)', id('audit'), store, actor, action, detail, now());
  }
  user(input) {
    const u = { id: id('usr'), email: email(input.email), name: text(input.name, 'Name', 100), kind: input.kind ?? 'merchant' };
    fail(['merchant', 'partner', 'support'].includes(u.kind), 400, 'Invalid user type');
    this.run('INSERT INTO users VALUES(?,?,?,?,?)', u.id, u.email, u.name, passwordHash(input.password), u.kind);
    return u;
  }
  authenticate(input) {
    const u = this.get('SELECT * FROM users WHERE email=?', email(input.email));
    fail(verifyPassword(input.password, u?.password_hash), 401, 'Email or password is incorrect');
    return this.session(u);
  }
  session(user) {
    const token = secret(), csrf = secret(), expires = Date.now() + 8 * 60 * 60 * 1000;
    this.run('DELETE FROM sessions WHERE expires < ?', Date.now());
    this.run('INSERT INTO sessions VALUES(?,?,?,?)', hash(token), user.id, csrf, expires);
    return { token, csrf, user: { id: user.id, name: user.name, email: user.email, kind: user.kind } };
  }
  actor(token) {
    if (typeof token !== 'string' || token.length > 200) return null;
    return this.get('SELECT u.id,u.name,u.email,u.kind,s.csrf FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires>?', hash(token), Date.now()) ?? null;
  }
  logout(token) { this.run('DELETE FROM sessions WHERE token_hash=?', hash(token)); }
  access(actor, storeId, permission) {
    fail(actor, 401, 'Sign in to continue');
    const store = this.get('SELECT s.*,m.role FROM stores s JOIN memberships m ON m.store_id=s.id WHERE s.id=? AND m.user_id=?', storeId, actor.id);
    fail(store, 404, 'Store not found or access was revoked');
    if (permission) fail(can(store.role, permission), 403, 'Your role does not allow this action');
    return store;
  }
  stores(actor) {
    return this.all('SELECT s.id,s.name,s.slug,s.mode,s.plan,m.role FROM stores s JOIN memberships m ON m.store_id=s.id WHERE m.user_id=? ORDER BY s.created_at', actor.id);
  }
  newStore(owner, input, mode = 'development', creator = null) {
    const slug = text(input.slug, 'Store address', 50, 3);
    fail(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), 400, 'Use lowercase letters, numbers and hyphens in the store address');
    const store = { id: id('store'), name: text(input.name, 'Store name', 100), slug };
    return this.tx(() => {
      const config = JSON.stringify(defaultTheme);
      this.run('INSERT INTO stores(id,slug,name,owner_id,mode,created_by,created_at,draft,published) VALUES(?,?,?,?,?,?,?,?,?)', store.id, slug, store.name, owner.id, mode, creator, now(), config, config);
      this.run('INSERT INTO memberships VALUES(?,?,?)', store.id, owner.id, 'owner');
      this.run('INSERT INTO theme_versions VALUES(?,?,?,?,?)', id('theme'), store.id, 1, config, now());
      this.audit(store.id, owner.id, 'store.created', 'Created ' + mode + ' store');
      return this.access(owner, store.id);
    });
  }
  createPartnerStore(actor, input) {
    fail(actor.kind === 'partner', 403, 'Only a partner can create development stores here');
    const count = this.get("SELECT COUNT(*) AS n FROM stores WHERE created_by=? AND mode='development'", actor.id).n;
    fail(count < 25, 409, 'This pilot allows 25 development stores per partner');
    return this.newStore(actor, input, 'development', actor.id);
  }
  partnerOverview(actor) {
    fail(actor.kind === 'partner', 403, 'Partner account required');
    // After handover, only store identity and transfer state remain visible here.
    return this.all('SELECT s.id,s.name,s.slug,s.mode,s.created_at,CASE WHEN s.owner_id=? THEN 0 ELSE 1 END AS transferred,m.role FROM stores s LEFT JOIN memberships m ON m.store_id=s.id AND m.user_id=? WHERE s.created_by=? ORDER BY s.created_at DESC', actor.id, actor.id, actor.id);
  }
  handover(actor, storeId, input) {
    const store = this.access(actor, storeId, 'access');
    fail(actor.kind === 'partner' && store.created_by === actor.id && store.owner_id === actor.id && store.mode === 'development', 409, 'Only your development stores can be handed over');
    const target = this.get("SELECT id FROM users WHERE email=? AND kind='merchant'", email(input.email));
    fail(target && target.id !== actor.id, 400, 'Create the receiving merchant account with the setup command first');
    return this.tx(() => {
      this.run('DELETE FROM memberships WHERE store_id=?', storeId);
      this.run('INSERT INTO memberships VALUES(?,?,?)', storeId, target.id, 'owner');
      this.run('UPDATE stores SET owner_id=? WHERE id=?', target.id, storeId);
      this.run('UPDATE apps SET revoked=1 WHERE store_id=?', storeId);
      this.run('UPDATE gateway_accounts SET enabled=0 WHERE store_id=?',storeId);
      for(const domain of this.all('SELECT id FROM store_domains WHERE store_id=?',storeId))this.run("UPDATE store_domains SET status='pending',challenge=?,verified_at=NULL,last_error='Ownership transferred: verify this domain again' WHERE id=?",'ind-commerce='+secret(),domain.id);
      this.audit(storeId, actor.id, 'store.handover', 'Ownership transferred; partner access and existing app tokens revoked');
      return { transferred: true };
    });
  }
  members(actor, storeId) {
    this.access(actor, storeId, 'access');
    return this.all('SELECT u.id,u.name,u.email,m.role FROM memberships m JOIN users u ON u.id=m.user_id WHERE m.store_id=? ORDER BY m.role,u.name', storeId);
  }
  grant(actor, storeId, input) {
    const store = this.access(actor, storeId, 'access');
    fail(['admin','staff','collaborator','viewer'].includes(input.role), 400, 'Choose admin, staff, collaborator or viewer');
    const u = this.get('SELECT id FROM users WHERE email=?', email(input.email));
    fail(u && u.id !== store.owner_id, 400, 'Choose an existing account other than the owner');
    return this.tx(() => {
      this.run('INSERT INTO memberships VALUES(?,?,?) ON CONFLICT(store_id,user_id) DO UPDATE SET role=excluded.role', storeId, u.id, input.role);
      this.audit(storeId, actor.id, 'access.granted', u.id + ' → ' + input.role);
      return this.members(actor, storeId);
    });
  }
  revoke(actor, storeId, userId) {
    const store = this.access(actor, storeId, 'access');
    fail(userId !== store.owner_id, 409, 'The store must keep its owner');
    return this.tx(() => {
      this.run('DELETE FROM memberships WHERE store_id=? AND user_id=?', storeId, userId);
      this.audit(storeId, actor.id, 'access.revoked', userId);
      return { revoked: true };
    });
  }
  gallery(storeId,productId){
    const store=this.get('SELECT slug FROM stores WHERE id=?',storeId);
    return this.all('SELECT a.id,a.alt,a.width,a.height,pm.position FROM product_media pm JOIN media_assets a ON a.id=pm.asset_id AND a.store_id=pm.store_id WHERE pm.store_id=? AND pm.product_id=? ORDER BY pm.position',storeId,productId).map(asset=>({...asset,url:'/media/'+store.slug+'/'+asset.id+'/960.webp',thumbnail:'/media/'+store.slug+'/'+asset.id+'/320.webp'}));
  }
  products(actor, storeId) {
    this.access(actor, storeId, 'catalog');
    return this.all('SELECT * FROM products WHERE store_id=? ORDER BY created_at DESC,id', storeId).map(p=>({...p,media:this.gallery(storeId,p.id).map(image=>({...image,preview:'/api/stores/'+storeId+'/media/'+image.id+'/preview'}))}));
  }
  createProduct(actor, storeId, input) {
    const store = this.access(actor, storeId, 'catalog');
    const plan = PLANS.find(p => p.id === store.plan);
    fail(this.get('SELECT COUNT(*) AS n FROM products WHERE store_id=?', storeId).n < plan.products, 409, 'Product capacity reached for this draft plan');
    const p = {
      id: id('prod'), name: text(input.name, 'Product name', 150), sku: text(input.sku, 'SKU', 60),
      category: text(input.category ?? 'Essentials', 'Category', 60), description: text(input.description ?? '', 'Description', 2000, 0),
      price: integer(input.price, 'Price in paise', 100000000, 1), stock: integer(input.stock, 'Stock', 1000000),
      tax: integer(input.tax_bps ?? 1800, 'Tax in basis points', 4000), colour: input.colour ?? '#d6e2d5'
    };
    fail(/^#[\da-f]{6}$/i.test(p.colour), 400, 'Invalid product colour');
    return this.tx(() => {
      this.run('INSERT INTO products(id,store_id,name,sku,category,description,price,tax_bps,stock,colour,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)', p.id, storeId, p.name, p.sku, p.category, p.description, p.price, p.tax, p.stock, p.colour, now());
      this.run('INSERT INTO ledger VALUES(?,?,?,?,?,?,?)', id('stock'), storeId, p.id, p.stock, 'opening', p.id, now());
      this.audit(storeId, actor.id, 'product.created', p.id);
      return this.get('SELECT * FROM products WHERE id=?', p.id);
    });
  }
  editProduct(actor, storeId, productId, input) {
    this.access(actor, storeId, 'catalog');
    const p = this.get('SELECT * FROM products WHERE id=? AND store_id=?', productId, storeId);
    fail(p, 404, 'Product not found');
    const name = text(input.name ?? p.name, 'Name', 150), price = integer(input.price ?? p.price, 'Price in paise', 100000000, 1);
    const active = input.active === undefined ? p.active : integer(input.active, 'Visibility', 1);
    return this.tx(() => {
      this.run('UPDATE products SET name=?,price=?,active=? WHERE id=? AND store_id=?', name, price, active, productId, storeId);
      this.audit(storeId, actor.id, 'product.updated', productId);
      return this.get('SELECT * FROM products WHERE id=?', productId);
    });
  }
  adjustStock(actor, storeId, productId, input) {
    this.access(actor, storeId, 'catalog');
    const delta = integer(input.delta, 'Stock adjustment', 1000000, -1000000), reason = text(input.reason, 'Reason', 200);
    fail(delta !== 0, 400, 'Stock adjustment cannot be zero');
    return this.tx(() => {
      const result = this.run('UPDATE products SET stock=stock+? WHERE id=? AND store_id=? AND stock+? BETWEEN 0 AND 1000000', delta, productId, storeId, delta);
      fail(result.changes === 1, 409, 'Product not found or adjustment would exceed stock limits');
      this.run('INSERT INTO ledger VALUES(?,?,?,?,?,?,?)', id('stock'), storeId, productId, delta, reason, actor.id, now());
      this.audit(storeId, actor.id, 'inventory.adjusted', productId + ': ' + delta);
      return this.get('SELECT id,stock FROM products WHERE id=?', productId);
    });
  }
  publicStore(slug) {
    const s = this.get("SELECT id,name,slug,mode,published,theme_revision FROM stores WHERE slug=? AND mode IN ('demo','active')", slug);
    fail(s, 404, 'This storefront is not open');
    return { ...s, theme: JSON.parse(s.published), published: undefined,
      products: this.all('SELECT id,name,category,description,price,tax_bps,stock,colour FROM products WHERE store_id=? AND active=1 ORDER BY created_at,id', s.id).map(p=>({...p,media:this.gallery(s.id,p.id)})) };
  }
  checkout(slug, input, key, {online=false} = {}) {
    const store = this.get("SELECT id FROM stores WHERE slug=? AND mode IN ('demo','active')", slug);
    fail(store, 404, 'This storefront is not open');
    text(key, 'Checkout idempotency key', 100, 16);
    fail(Array.isArray(input.items) && input.items.length > 0 && input.items.length <= 50, 400, 'Choose 1–50 products');
    const cart = new Map();
    for (const line of input.items) {
      const productId = text(line.product_id, 'Product ID', 100), qty = integer(line.quantity, 'Quantity', 99, 1);
      cart.set(productId, (cart.get(productId) ?? 0) + qty);
      fail(cart.get(productId) <= 99, 400, 'Maximum 99 units per product');
    }
    const customer = text(input.customer, 'Customer name', 120), contact = email(input.email);
    const phone = text(input.phone, 'Phone', 20, 10), address = text(input.address, 'Delivery address', 500, 10);
    fail(/^\+?[0-9 ()-]{10,20}$/.test(phone) && phone.replace(/\D/g, '').length >= 10 && phone.replace(/\D/g, '').length <= 15, 400, 'Enter a valid phone number');
    const method=input.method||'cod';fail(method==='cod'||(online&&method==='razorpay'),400,'This payment method is not enabled');
    const normalized = { customer, email: contact, phone, address, method, items: [...cart].sort((a,b) => a[0].localeCompare(b[0])) };
    const fingerprint = hash(JSON.stringify(normalized));
    return this.tx(() => {
      const old = this.get('SELECT * FROM orders WHERE store_id=? AND idempotency_key=?', store.id, key);
      if (old) {
        fail(old.request_hash === fingerprint, 409, 'This checkout key was already used with different order details');
        return { id: old.id, number: old.number, total: old.total, tax: old.tax, currency: 'INR', replayed: true };
      }
      const items = [], orderId = id('ord'); let total = 0, tax = 0;
      for (const [productId, quantity] of normalized.items) {
        const p = this.get('SELECT * FROM products WHERE id=? AND store_id=? AND active=1', productId, store.id);
        fail(p && p.stock >= quantity, 409, 'An item is unavailable or has insufficient stock');
        const lineTotal = p.price * quantity, lineTax = Math.round(lineTotal * p.tax_bps / (10000 + p.tax_bps));
        total += lineTotal; tax += lineTax;
        items.push({ product_id: p.id, name: p.name, sku: p.sku, quantity, unit_price: p.price, tax_bps: p.tax_bps, total: lineTotal, tax: lineTax });
      }
      fail(total <= 100000000, 400, 'Order value exceeds the local pilot limit');
      const guard = this.get("SELECT 1 AS enabled FROM installations WHERE store_id=? AND plugin_id='cod-guard'", store.id);
      fail(method!=='cod' || !guard || total <= 1000000, 409, 'Cash on delivery is limited to ₹10,000 for this store');
      for (const line of items) {
        const update = this.run('UPDATE products SET stock=stock-? WHERE id=? AND store_id=? AND stock>=?', line.quantity, line.product_id, store.id, line.quantity);
        fail(update.changes === 1, 409, 'Stock changed. Please try checkout again');
        this.run('INSERT INTO ledger VALUES(?,?,?,?,?,?,?)', id('stock'), store.id, line.product_id, -line.quantity, 'order.placed', orderId, now());
      }
      const sequence = this.get('SELECT COUNT(*) AS n FROM orders WHERE store_id=?', store.id).n + 1001;
      const number = 'IND-' + sequence;
      this.run('INSERT INTO orders(id,number,store_id,customer,email,phone,address,items,total,tax,method,idempotency_key,request_hash,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', orderId, number, store.id, customer, contact, phone, address, JSON.stringify(items), total, tax, method, key, fingerprint, now());
      this.run('INSERT INTO events VALUES(?,?,?,?,?)', id('evt'), store.id, 'order.created', JSON.stringify({ order_id: orderId, total, currency: 'INR' }), now());
      const plugins = this.all('SELECT plugin_id FROM installations WHERE store_id=?', store.id).map(p => p.plugin_id);
      if (plugins.includes('packing-note')) this.task(store.id, 'Pack ' + number + ' with care', 'Check every item and include a thank-you note. No customer message was sent.');
      if (plugins.includes('stock-watch')) {
        for (const line of items) {
          const p = this.get('SELECT stock FROM products WHERE id=?', line.product_id);
          if (p.stock <= 5) this.task(store.id, 'Restock ' + line.name, p.stock + ' units remain after ' + number);
        }
      }
      this.audit(store.id, 'checkout', 'order.created', number);
      return { id: orderId, number, total, tax, currency: 'INR', replayed: false };
    });
  }
  orders(actor, storeId) {
    this.access(actor, storeId, 'orders');
    return this.all('SELECT * FROM orders WHERE store_id=? ORDER BY created_at DESC,id DESC', storeId).map(o => ({ ...o, items: JSON.parse(o.items), request_hash: undefined, idempotency_key: undefined }));
  }
  orderAction(actor, storeId, orderId, action) {
    this.access(actor, storeId, 'orders');
    return this.tx(() => {
      const order = this.get('SELECT * FROM orders WHERE id=? AND store_id=?', orderId, storeId);
      fail(order, 404, 'Order not found');
      if (action === 'ship') {
        fail(order.method==='cod'||order.payment==='paid',409,'Online payment must be captured before shipping');
        fail(order.fulfilment === 'unfulfilled', 409, 'Only an unfulfilled order can be marked shipped');
        this.run("UPDATE orders SET fulfilment='shipped' WHERE id=?", orderId);
      } else if (action === 'deliver') {
        fail(order.fulfilment === 'shipped', 409, 'Only a shipped order can be marked delivered');
        this.run("UPDATE orders SET fulfilment='delivered' WHERE id=?", orderId);
      } else if (action === 'collect') {
        fail(order.method==='cod',409,'Online payment is confirmed only by the gateway');
        fail(order.fulfilment === 'delivered' && order.payment === 'unpaid', 409, 'Record COD collection once, after delivery');
        this.run("UPDATE orders SET payment='paid' WHERE id=?", orderId);
      } else if (action === 'cancel') {
        fail(order.fulfilment === 'unfulfilled' && order.payment === 'unpaid', 409, 'Only an unpaid, unfulfilled order can be cancelled here');
        for (const line of JSON.parse(order.items)) {
          this.run('UPDATE products SET stock=stock+? WHERE id=? AND store_id=?', line.quantity, line.product_id, storeId);
          this.run('INSERT INTO ledger VALUES(?,?,?,?,?,?,?)', id('stock'), storeId, line.product_id, line.quantity, 'order.cancelled', orderId, now());
        }
        this.run("UPDATE orders SET fulfilment='cancelled' WHERE id=?", orderId);
      } else fail(false, 400, 'Unknown order action');
      this.audit(storeId, actor.id, 'order.' + action, order.number);
      return { updated: true };
    });
  }
  task(storeId, title, detail) {
    this.run('INSERT INTO tasks VALUES(?,?,?,?,0,?)', id('task'), storeId, title, detail, now());
  }
  completeTask(actor, storeId, taskId) {
    this.access(actor, storeId, 'orders');
    fail(this.run('UPDATE tasks SET done=1 WHERE id=? AND store_id=?', taskId, storeId).changes === 1, 404, 'Task not found');
    return { done: true };
  }
  themeState(actor, storeId) {
    const s = this.access(actor, storeId, 'themes');
    return { draft: JSON.parse(s.draft), published: JSON.parse(s.published), revision: s.theme_revision,
      versions: this.all('SELECT revision,config,created_at FROM theme_versions WHERE store_id=? ORDER BY revision DESC LIMIT 20', storeId).map(v => ({ ...v, config: JSON.parse(v.config) })) };
  }
  saveTheme(actor, storeId, input) {
    this.access(actor, storeId, 'themes');
    const config = theme(input);
    this.run('UPDATE stores SET draft=? WHERE id=?', JSON.stringify(config), storeId);
    return { draft: config };
  }
  publishTheme(actor, storeId, input) {
    const store = this.access(actor, storeId, 'themes');
    return this.tx(() => {
      fail(input.revision === store.theme_revision, 409, 'Theme changed in another session. Reload before publishing');
      if(input.expected_config)fail(store.draft===input.expected_config,409,'Theme draft changed during validation; reload before publishing');
      let config = store.draft;
      if (input.rollback !== undefined) {
        integer(input.rollback, 'Revision', 1000000, 1);
        const old = this.get('SELECT config FROM theme_versions WHERE store_id=? AND revision=?', storeId, input.rollback);
        fail(old, 404, 'Theme version not found'); config = old.config;
      }
      config = JSON.stringify(theme(JSON.parse(config)));
      const revision = store.theme_revision + 1;
      this.run('UPDATE stores SET published=?,draft=?,theme_revision=? WHERE id=?', config, config, revision, storeId);
      this.run('INSERT INTO theme_versions VALUES(?,?,?,?,?)', id('theme'), storeId, revision, config, now());
      this.audit(storeId, actor.id, 'theme.published', 'Revision ' + revision + (input.rollback ? ' restored from ' + input.rollback : ''));
      return this.themeState(actor, storeId);
    });
  }
  pluginState(actor, storeId) {
    this.access(actor, storeId, 'apps');
    const enabled = this.all('SELECT plugin_id FROM installations WHERE store_id=?', storeId).map(r => r.plugin_id);
    return PLUGINS.map(p => ({ ...p, installed: enabled.includes(p.id) }));
  }
  plugin(actor, storeId, pluginId, install) {
    this.access(actor, storeId, 'apps');
    fail(PLUGINS.some(p => p.id === pluginId), 404, 'Unknown plugin');
    return this.tx(() => {
      if (install) this.run('INSERT OR IGNORE INTO installations VALUES(?,?,?)', storeId, pluginId, now());
      else this.run('DELETE FROM installations WHERE store_id=? AND plugin_id=?', storeId, pluginId);
      this.audit(storeId, actor.id, install ? 'plugin.installed' : 'plugin.removed', pluginId);
      return this.pluginState(actor, storeId);
    });
  }
  apps(actor, storeId) {
    this.access(actor, storeId, 'apps');
    return this.all('SELECT id,name,scopes,created_at,revoked FROM apps WHERE store_id=? ORDER BY created_at DESC', storeId).map(a => ({ ...a, scopes: JSON.parse(a.scopes) }));
  }
  createApp(actor, storeId, input) {
    this.access(actor, storeId, 'apps');
    const name = text(input.name, 'App name', 100);
    fail(Array.isArray(input.scopes) && input.scopes.length >= 1 && input.scopes.length <= APP_SCOPES.length && input.scopes.every(s => APP_SCOPES.includes(s)), 400, 'Choose supported app scopes');
    const appId = id('app'), token = secret(), scopes = [...new Set(input.scopes)];
    return this.tx(() => {
      this.run('INSERT INTO apps(id,store_id,name,scopes,token_hash,created_at) VALUES(?,?,?,?,?,?)', appId, storeId, name, JSON.stringify(scopes), hash(token), now());
      this.audit(storeId, actor.id, 'app.created', appId + ': ' + scopes.join(', '));
      return { id: appId, token, scopes };
    });
  }
  revokeApp(actor, storeId, appId) {
    this.access(actor, storeId, 'apps');
    fail(this.run('UPDATE apps SET revoked=1 WHERE id=? AND store_id=?', appId, storeId).changes === 1, 404, 'App not found');
    this.audit(storeId, actor.id, 'app.revoked', appId);
    return { revoked: true };
  }
  appData(token, resource) {
    fail(typeof token === 'string' && token.length <= 200, 401, 'App token required');
    const app = this.get('SELECT * FROM apps WHERE token_hash=? AND revoked=0', hash(token));
    fail(app, 401, 'App token is invalid or revoked');
    const scope = resource === 'products' ? 'catalog:read' : resource === 'orders' ? 'orders:read' : null;
    fail(scope && JSON.parse(app.scopes).includes(scope), 403, 'This app does not have the required scope');
    // No store ID from the caller: the token defines the tenant.
    if (resource === 'products') return this.all('SELECT id,name,sku,price,stock,active FROM products WHERE store_id=?', app.store_id);
    return this.all('SELECT id,number,total,currency,payment,fulfilment,created_at FROM orders WHERE store_id=?', app.store_id);
  }
  createTicket(actor, storeId, input) {
    this.access(actor, storeId, 'support');
    const subject = text(input.subject, 'Subject', 150), body = text(input.body, 'Description', 4000);
    fail(['normal','urgent'].includes(input.priority), 400, 'Choose a valid priority');
    const ticketId = id('ticket');
    this.run('INSERT INTO tickets(id,store_id,subject,body,priority,created_at,updated_at) VALUES(?,?,?,?,?,?,?)', ticketId, storeId, subject, body, input.priority, now(), now());
    return { id: ticketId };
  }
  tickets(actor, storeId) {
    if (storeId) this.access(actor, storeId, 'support');
    else fail(actor.kind === 'support', 403, 'Support account required');
    return storeId ? this.all('SELECT * FROM tickets WHERE store_id=? ORDER BY created_at DESC', storeId) :
      this.all('SELECT t.*,s.name AS store_name FROM tickets t JOIN stores s ON s.id=t.store_id ORDER BY CASE t.priority WHEN \'urgent\' THEN 0 ELSE 1 END,t.created_at');
  }
  respondTicket(actor, ticketId, input) {
    fail(actor.kind === 'support', 403, 'Support account required');
    const response = text(input.response, 'Response', 4000);
    fail(['open','in_progress','resolved'].includes(input.status), 400, 'Invalid ticket status');
    const t = this.get('SELECT store_id FROM tickets WHERE id=?', ticketId); fail(t, 404, 'Ticket not found');
    this.run('UPDATE tickets SET response=?,status=?,updated_at=? WHERE id=?', response, input.status, now(), ticketId);
    this.audit(t.store_id, actor.id, 'ticket.responded', ticketId);
    return { updated: true };
  }
  settings(actor, storeId, input) {
    this.access(actor, storeId, 'settings');
    const name = text(input.name, 'Store name', 100);
    fail(PLANS.some(p => p.id === input.plan), 400, 'Choose a draft plan');
    fail(['active','development','demo'].includes(input.mode), 400, 'Invalid store mode');
    const count = this.get('SELECT COUNT(*) AS n FROM products WHERE store_id=?', storeId).n;
    fail(count <= PLANS.find(p => p.id === input.plan).products, 409, 'The catalog exceeds the selected plan capacity');
    return this.tx(() => {
      this.run('UPDATE stores SET name=?,plan=?,mode=? WHERE id=?', name, input.plan, input.mode, storeId);
      this.audit(storeId, actor.id, 'settings.updated', 'Store details and draft plan updated; no billing charge');
      return { updated: true };
    });
  }
  dashboard(actor, storeId) {
    const s = this.access(actor, storeId);
    const orders = can(s.role, 'orders') ? this.orders(actor, storeId) : [];
    const products = can(s.role, 'catalog') ? this.products(actor, storeId) : [];
    return { store: { id: s.id, name: s.name, slug: s.slug, mode: s.mode, plan: s.plan, role: s.role, theme_revision: s.theme_revision },
      products, orders, permissions: Object.fromEntries(['catalog','orders','themes','apps','support','settings','access','export'].map(p => [p,can(s.role,p)])),
      tasks: can(s.role, 'orders') ? this.all('SELECT * FROM tasks WHERE store_id=? ORDER BY done,created_at DESC LIMIT 100', storeId) : [],
      tickets: can(s.role, 'support') ? this.tickets(actor, storeId) : [],
      audit: can(s.role, 'access') ? this.all('SELECT * FROM audit WHERE store_id=? ORDER BY created_at DESC,rowid DESC LIMIT 100', storeId) : [] };
  }
  exportStore(actor, storeId) {
    const s = this.access(actor, storeId, 'export');
    return { schema_version: 1, exported_at: now(), store: { name: s.name, slug: s.slug, plan: s.plan, theme: JSON.parse(s.published) },
      products: this.all('SELECT * FROM products WHERE store_id=?', storeId),
      orders: this.orders(actor, storeId), ledger: this.all('SELECT * FROM ledger WHERE store_id=?', storeId) };
  }
  signup(input) {
    fail(input.consent===true,400,'Accept the pilot terms and privacy notice');
    const kind=input.kind||'merchant';fail(['merchant','partner'].includes(kind),400,'Choose merchant or partner');
    return this.tx(()=>{
      const account=this.user({name:input.name,email:input.email,password:input.password,kind});
      if(kind==='merchant')this.newStore(account,{name:input.store_name,slug:input.slug});
      return this.session(account);
    });
  }
  pilotRequest(input) {
    fail(input.consent===true,400,'Consent to a reply is required');
    const interest=text(input.interest,'Interest',40);fail(['merchant','partner','developer'].includes(interest),400,'Choose a valid interest');
    this.run('INSERT INTO pilot_requests(id,name,email,company,interest,message,consent_at) VALUES(?,?,?,?,?,?,?)',id('lead'),text(input.name,'Name',100),email(input.email),text(input.company||'','Company',150,0),interest,text(input.message,'Message',3000),now());
    return {saved:true};
  }
  pilotRequests(actor) {fail(actor.kind==='support',403,'Support account required');return this.all('SELECT * FROM pilot_requests ORDER BY consent_at DESC LIMIT 200');}

}
