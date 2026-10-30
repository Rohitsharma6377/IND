import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Commerce } from '../src/commerce.mjs';
import { seedDemo } from '../src/seed.mjs';
import { signEvent, verifyEvent, defaultTheme } from '../src/contracts.mjs';

function fixture(t) {
  const c=new Commerce();
  t.after(()=>c.close());
  const owner=c.user({name:'Owner',email:'owner@example.test',password:'test-password-12345'});
  const other=c.user({name:'Other',email:'other@example.test',password:'test-password-23456'});
  const partner=c.user({name:'Agency',email:'agency@example.test',password:'test-password-34567',kind:'partner'});
  const store=c.newStore(owner,{name:'Test shop',slug:'test-shop'},'demo');
  const second=c.newStore(other,{name:'Other shop',slug:'other-shop'},'demo');
  const product=c.createProduct(owner,store.id,{name:'Test cup',sku:'CUP-1',price:11800,stock:5,tax_bps:1800});
  const cart={customer:'Test Customer',email:'customer@example.test',phone:'9999900000',address:'Test address, Bengaluru 560001',items:[{product_id:product.id,quantity:1}]};
  return {c,owner,other,partner,store,second,product,cart};
}
const status = expected => error => error.status===expected;

test('tenant IDs do not grant access to another merchant',t=>{
  const {c,owner,other,store,second,product}=fixture(t);
  assert.throws(()=>c.dashboard(other,store.id),status(404));
  assert.throws(()=>c.adjustStock(owner,second.id,product.id,{delta:1,reason:'test'}),status(404));
  assert.throws(()=>c.createProduct(other,store.id,{name:'Injected'}),status(404));
});
test('collaborator permissions are scoped and revoke immediately',t=>{
  const {c,owner,partner,store}=fixture(t);
  c.grant(owner,store.id,{email:partner.email,role:'collaborator'});
  assert.equal(c.products(partner,store.id).length,1);
  assert.throws(()=>c.orders(partner,store.id),status(403));
  assert.throws(()=>c.apps(partner,store.id),status(403));
  assert.equal(c.dashboard(partner,store.id).orders.length,0);
  c.revoke(owner,store.id,partner.id);
  assert.throws(()=>c.products(partner,store.id),status(404));
  assert.throws(()=>c.revoke(owner,store.id,owner.id),status(409));
});
test('checkout calculates authoritative prices and snapshots inclusive tax',t=>{
  const {c,owner,store,product,cart}=fixture(t);
  const result=c.checkout(store.slug,{...cart,total:1,items:[{product_id:product.id,quantity:2,price:1}]},'checkout-price-key-123');
  assert.equal(result.total,23600);assert.equal(result.tax,3600);
  assert.equal(c.products(owner,store.id)[0].stock,3);
  c.editProduct(owner,store.id,product.id,{price:15000});
  const order=c.orders(owner,store.id)[0];
  assert.equal(order.items[0].unit_price,11800);
  assert.equal(order.total,23600);
});
test('duplicate checkout replays once and conflicts on a different payload',t=>{
  const {c,owner,store,cart}=fixture(t);
  const a=c.checkout(store.slug,cart,'checkout-repeat-key-123');
  const b=c.checkout(store.slug,cart,'checkout-repeat-key-123');
  assert.equal(a.id,b.id);assert.equal(b.replayed,true);
  assert.equal(c.orders(owner,store.id).length,1);
  assert.equal(c.products(owner,store.id)[0].stock,4);
  assert.throws(()=>c.checkout(store.slug,{...cart,customer:'Different'},'checkout-repeat-key-123'),status(409));
});
test('aggregated duplicate cart lines cannot oversell',t=>{
  const {c,owner,store,product,cart}=fixture(t);
  assert.throws(()=>c.checkout(store.slug,{...cart,items:[{product_id:product.id,quantity:3},{product_id:product.id,quantity:3}]},'checkout-oversell-key-123'),status(409));
  assert.equal(c.products(owner,store.id)[0].stock,5);
  assert.equal(c.orders(owner,store.id).length,0);
});
test('failed multi-product checkout rolls back all stock changes',t=>{
  const {c,owner,store,product,cart}=fixture(t);
  const second=c.createProduct(owner,store.id,{name:'Empty bowl',sku:'EMPTY',price:5000,stock:0});
  assert.throws(()=>c.checkout(store.slug,{...cart,items:[{product_id:product.id,quantity:2},{product_id:second.id,quantity:1}]},'checkout-atomic-key-123'),status(409));
  assert.equal(c.get('SELECT stock FROM products WHERE id=?',product.id).stock,5);
  assert.equal(c.orders(owner,store.id).length,0);
  assert.equal(c.get("SELECT COUNT(*) AS n FROM ledger WHERE reason='order.placed'").n,0);
});
test('a checkout cannot reference another tenant product',t=>{
  const {c,other,second,store,cart}=fixture(t);
  const hidden=c.createProduct(other,second.id,{name:'Other product',sku:'OTHER',price:1000,stock:10});
  assert.throws(()=>c.checkout(store.slug,{...cart,items:[{product_id:hidden.id,quantity:1}]},'checkout-cross-key-123'),status(409));
  assert.equal(c.products(other,second.id)[0].stock,10);
});
test('order transitions prevent premature collection and double cancellation',t=>{
  const {c,owner,store,cart,product}=fixture(t);
  const order=c.checkout(store.slug,cart,'checkout-cancel-key-123');
  assert.throws(()=>c.orderAction(owner,store.id,order.id,'collect'),status(409));
  c.orderAction(owner,store.id,order.id,'cancel');
  assert.equal(c.get('SELECT stock FROM products WHERE id=?',product.id).stock,5);
  assert.throws(()=>c.orderAction(owner,store.id,order.id,'cancel'),status(409));
  assert.throws(()=>c.orderAction(owner,store.id,order.id,'ship'),status(409));
  assert.equal(c.get('SELECT stock FROM products WHERE id=?',product.id).stock,5);
});
test('COD requires shipping then delivery before a single collection record',t=>{
  const {c,owner,store,cart}=fixture(t);
  const order=c.checkout(store.slug,cart,'checkout-collect-key-123');
  c.orderAction(owner,store.id,order.id,'ship');
  assert.throws(()=>c.orderAction(owner,store.id,order.id,'cancel'),status(409));
  c.orderAction(owner,store.id,order.id,'deliver');
  c.orderAction(owner,store.id,order.id,'collect');
  assert.equal(c.orders(owner,store.id)[0].payment,'paid');
  assert.throws(()=>c.orderAction(owner,store.id,order.id,'collect'),status(409));
});
test('inventory rejects negative availability and records adjustments',t=>{
  const {c,owner,store,product}=fixture(t);
  assert.throws(()=>c.adjustStock(owner,store.id,product.id,{delta:-6,reason:'Shrink'}),status(409));
  c.adjustStock(owner,store.id,product.id,{delta:3,reason:'Supplier delivery'});
  assert.equal(c.get('SELECT stock FROM products WHERE id=?',product.id).stock,8);
  assert.equal(c.get("SELECT delta FROM ledger WHERE reason='Supplier delivery'").delta,3);
});
test('theme drafts stay private until publish and rollback creates history',t=>{
  const {c,owner,store}=fixture(t);
  c.saveTheme(owner,store.id,{...defaultTheme,title:'New headline',template:'atelier'});
  assert.notEqual(c.publicStore(store.slug).theme.title,'New headline');
  c.publishTheme(owner,store.id,{revision:1});
  assert.equal(c.publicStore(store.slug).theme.title,'New headline');
  assert.throws(()=>c.publishTheme(owner,store.id,{revision:1}),status(409));
  c.publishTheme(owner,store.id,{revision:2,rollback:1});
  assert.equal(c.publicStore(store.slug).theme.title,defaultTheme.title);
  assert.equal(c.themeState(owner,store.id).revision,3);
  assert.throws(()=>c.saveTheme(owner,store.id,{...defaultTheme,accent:'red; background:url(test)'}),status(400));
});
test('private app scopes, tenant binding and revocation are enforced',t=>{
  const {c,owner,other,store,second}=fixture(t);
  c.createProduct(other,second.id,{name:'Other private product',sku:'OTHER',price:5000,stock:8});
  const app=c.createApp(owner,store.id,{name:'Catalog app',scopes:['catalog:read']});
  assert.equal(c.appData(app.token,'products').length,1);
  assert.throws(()=>c.appData(app.token,'orders'),status(403));
  assert.throws(()=>c.createApp(owner,store.id,{name:'Bad app',scopes:['database:*']}),status(400));
  assert.equal(c.apps(owner,store.id)[0].token,undefined);
  c.revokeApp(owner,store.id,app.id);
  assert.throws(()=>c.appData(app.token,'products'),status(401));
});
test('handover gives ownership to the merchant and revokes agency and apps',t=>{
  const {c,owner,partner}=fixture(t);
  const dev=c.createPartnerStore(partner,{name:'Client shop',slug:'client-shop'});
  const app=c.createApp(partner,dev.id,{name:'Agency app',scopes:['catalog:read']});
  c.handover(partner,dev.id,{email:owner.email});
  assert.equal(c.access(owner,dev.id).role,'owner');
  assert.throws(()=>c.access(partner,dev.id),status(404));
  assert.throws(()=>c.appData(app.token,'products'),status(401));
  assert.equal(c.partnerOverview(partner).find(s=>s.id===dev.id).transferred,1);
  assert.throws(()=>c.publicStore(dev.slug),status(404));
});
test('plugin install and removal alter checkout rules on the server',t=>{
  const {c,owner,store,product,cart}=fixture(t);
  c.editProduct(owner,store.id,product.id,{price:1100000});
  c.plugin(owner,store.id,'cod-guard',true);
  assert.throws(()=>c.checkout(store.slug,cart,'checkout-plugin-key-123'),status(409));
  c.plugin(owner,store.id,'cod-guard',false);
  assert.equal(c.checkout(store.slug,cart,'checkout-plugin-key-123').total,1100000);
});
test('first-party automations create review tasks without external actions',t=>{
  const {c,owner,store,cart}=fixture(t);
  c.plugin(owner,store.id,'stock-watch',true);c.plugin(owner,store.id,'packing-note',true);
  c.checkout(store.slug,cart,'checkout-workflow-key-123');
  assert.equal(c.dashboard(owner,store.id).tasks.length,2);
  assert.equal(c.all('SELECT * FROM events WHERE store_id=?',store.id).length,1);
});
test('support account has ticket access without implicit store access',t=>{
  const {c,owner,store}=fixture(t);
  const support=c.user({name:'Support',email:'support@example.test',password:'support-password-12345',kind:'support'});
  const ticket=c.createTicket(owner,store.id,{subject:'Help needed',body:'A local test issue',priority:'urgent'});
  assert.equal(c.tickets(support).length,1);
  assert.throws(()=>c.dashboard(support,store.id),status(404));
  c.respondTicket(support,ticket.id,{response:'Investigating',status:'in_progress'});
  assert.equal(c.tickets(owner,store.id)[0].response,'Investigating');
  assert.throws(()=>c.respondTicket(owner,ticket.id,{response:'Test',status:'resolved'}),status(403));
});
test('session credentials are hashed and logout invalidates the session',t=>{
  const {c,owner}=fixture(t);
  assert.throws(()=>c.authenticate({email:owner.email,password:'wrong'}),status(401));
  const s=c.authenticate({email:owner.email,password:'test-password-12345'});
  assert.equal(c.actor(s.token).id,owner.id);
  assert.notEqual(c.get('SELECT token_hash FROM sessions').token_hash,s.token);
  c.logout(s.token);assert.equal(c.actor(s.token),null);
});
test('event signatures reject tampering',()=>{
  const key='test-only-signing-secret-32-characters-long',payload='{"order_id":"test"}';
  const signed=signEvent(payload,key);
  assert.equal(verifyEvent(payload,signed,key),true);
  assert.equal(verifyEvent(payload+' ',signed,key),false);
  assert.equal(verifyEvent(payload,'not-a-signature',key),false);
});
test('demo seed is repeatable and creates fictional, isolated workspaces',t=>{
  const c=new Commerce();t.after(()=>c.close());
  seedDemo(c);seedDemo(c);
  assert.equal(c.get('SELECT COUNT(*) AS n FROM stores').n,3);
  assert.equal(c.get('SELECT COUNT(*) AS n FROM orders').n,14);
  assert.equal(c.publicStore('banyan').products.length,8);
  assert.throws(()=>c.publicStore('marigold-living'),status(404));
});
test('records survive a database close and reopen',()=>{
  const dir=mkdtempSync(join(tmpdir(),'ind-commerce-'));
  try {
    const filename=join(dir,'test.db');let c=new Commerce(filename);
    const owner=c.user({name:'Persistent Owner',email:'persist@example.test',password:'persistent-password-12345'});
    c.newStore(owner,{name:'Persistent shop',slug:'persistent-shop'});c.close();
    c=new Commerce(filename);assert.equal(c.stores(owner)[0].slug,'persistent-shop');c.close();
  } finally {rmSync(dir,{recursive:true,force:true});}
});
