import test from 'node:test';
import assert from 'node:assert/strict';
import { Commerce } from '../src/commerce.mjs';
import { createCommerceServer } from '../src/server.mjs';
async function httpFixture(t,{demo=false}={}) {
  const c=new Commerce();
  let owner,store,product;
  if(!demo) {
    owner=c.user({name:'Owner',email:'owner@example.test',password:'http-test-password-12345'});
    store=c.newStore(owner,{name:'HTTP shop',slug:'http-shop'},'demo');
    product=c.createProduct(owner,store.id,{name:'Last cup',sku:'LAST',price:11800,stock:1});
  }
  const {server}=createCommerceServer({commerce:c,demo});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(async()=>{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));c.close();});
  const origin='http://127.0.0.1:'+server.address().port;
  let cookie='',csrf='';
  async function req(path,{method='GET',body,headers={},auth=true}={}) {
    const response=await fetch(origin+path,{method,headers:{Origin:origin,'Content-Type':'application/json',...(auth&&cookie?{Cookie:cookie,'X-CSRF-Token':csrf}:{}),...headers},...(body===undefined?{}:{body:typeof body==='string'?body:JSON.stringify(body)})});
    const payload=await response.json();
    return {status:response.status,body:payload,headers:response.headers};
  }
  async function login() {
    const result=await req('/api/login',{method:'POST',body:{email:owner.email,password:'http-test-password-12345'}});
    cookie=result.headers.get('set-cookie').split(';')[0];csrf=result.body.csrf;return result;
  }
  return {c,origin,req,login,store,product};
}
test('HTTP authentication, CSRF, same-origin and private response headers',async t=>{
  const {req,login,store}=await httpFixture(t);
  assert.equal((await req('/api/stores/'+store.id)).status,401);
  const signed=await login();
  assert.equal(signed.status,200);
  assert.match(signed.headers.get('set-cookie'),/HttpOnly/);
  assert.match(signed.headers.get('set-cookie'),/SameSite=Strict/);
  const dashboard=await req('/api/stores/'+store.id);
  assert.equal(dashboard.status,200);assert.equal(dashboard.headers.get('cache-control'),'no-store');
  assert.equal((await req('/api/stores/'+store.id+'/products',{method:'POST',headers:{'X-CSRF-Token':''},body:{}})).status,403);
  assert.equal((await req('/api/stores/'+store.id+'/products',{method:'POST',headers:{Origin:'https://attacker.example'},body:{}})).status,403);
  assert.equal((await req('/api/demo-session',{method:'POST',body:{profile:'merchant'}})).status,404);
});
test('parallel HTTP checkouts do not oversell the last unit',async t=>{
  const {c,req,store,product}=await httpFixture(t);
  const body={customer:'Test Customer',email:'test@example.test',phone:'9999900000',address:'A test address in Bengaluru 560001',items:[{product_id:product.id,quantity:1}]};
  const results=await Promise.all([1,2].map(n=>req('/api/public/http-shop/checkout',{method:'POST',auth:false,headers:{'Idempotency-Key':'parallel-http-checkout-'+n},body})));
  assert.deepEqual(results.map(r=>r.status).sort(),[201,409]);
  assert.equal(c.get('SELECT stock FROM products WHERE id=?',product.id).stock,0);
  assert.equal(c.get('SELECT COUNT(*) AS n FROM orders WHERE store_id=?',store.id).n,1);
});
test('static assets are served without exposing source, data or traversal paths',async t=>{
  const {origin,req}=await httpFixture(t);
  const response=await fetch(origin+'/');
  assert.equal(response.status,200);
  assert.match(response.headers.get('content-security-policy'),/script-src 'self'/);
  assert.match(await response.text(),/src="\/marketing.mjs"/);
  const admin=await fetch(origin+'/admin');assert.match(await admin.text(),/src="\/app.mjs"/);
  for(const path of ['/src/commerce.mjs','/data/demo.db','/..%2fpackage.json'])assert.equal((await req(path)).status,404);
  assert.equal((await req('/api/login',{method:'POST',body:'{bad json'})).status,400);
});
test('demo login requires explicit demo mode and support cannot browse store data',async t=>{
  const {req}=await httpFixture(t,{demo:true});
  const signed=await req('/api/demo-session',{method:'POST',body:{profile:'support'}});
  assert.equal(signed.status,200);
  const cookie=signed.headers.get('set-cookie').split(';')[0];
  const session=await req('/api/session',{headers:{Cookie:cookie}});
  assert.equal(session.body.stores.length,0);
  const tickets=await req('/api/support',{headers:{Cookie:cookie}});
  assert.equal(tickets.status,200);assert.ok(tickets.body.length>0);
  const storeId=tickets.body[0].store_id;
  assert.equal((await req('/api/stores/'+storeId,{headers:{Cookie:cookie}})).status,404);
});
test('read-only app API ignores caller-supplied tenant IDs and honours revocation',async t=>{
  const {c,req,login,store}=await httpFixture(t);
  await login();
  const app=await req('/api/stores/'+store.id+'/apps',{method:'POST',body:{name:'HTTP catalog',scopes:['catalog:read']}});
  assert.equal(app.status,201);
  const data=await req('/api/app/products?store_id=another-store',{headers:{Authorization:'Bearer '+app.body.token},auth:false});
  assert.equal(data.status,200);assert.equal(data.body.data.length,1);assert.equal(data.body.data[0].name,'Last cup');
  assert.equal((await req('/api/app/orders',{headers:{Authorization:'Bearer '+app.body.token},auth:false})).status,403);
  c.run('UPDATE apps SET revoked=1 WHERE id=?',app.body.id);
  assert.equal((await req('/api/app/products',{headers:{Authorization:'Bearer '+app.body.token},auth:false})).status,401);
});
