import { request as httpRequest } from 'node:http';
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { Commerce } from '../src/commerce.mjs';
import { createCommerceServer } from '../src/server.mjs';
import { defaultTheme } from '../src/contracts.mjs';
const encryption='12'.repeat(32),apiSecret='test-provider-api-secret',webhookSecret='test-webhook-secret-at-least-32-characters';
async function fixture(t) {
  const c=new Commerce(),owner=c.user({name:'Owner',email:'web-owner@example.test',password:'web-owner-password-123'});
  const store=c.newStore(owner,{name:'Web shop',slug:'web-shop'},'demo');
  const product=c.createProduct(owner,store.id,{name:'Web cup',sku:'WEB-1',price:11800,stock:10});
  const {server,payments}=createCommerceServer({commerce:c,publicOrigin:'https://commerce.netcuriontechnology.com',paymentOptions:{key:encryption,providerFactory:()=>({createOrder:async input=>({id:'order_WebTest',amount:input.amount,currency:'INR'}),fetchPayment:async()=>({})})}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(async()=>{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));c.close();});
  const origin='http://127.0.0.1:'+server.address().port,signed=c.session(owner);
  async function req(path,{method='GET',body,auth=false,headers={},noOrigin=false}={}) {
    const options={method,headers:{...(noOrigin?{}:{Origin:origin}),'Content-Type':'application/json',...(auth?{Cookie:'ind_session='+signed.token,'X-CSRF-Token':signed.csrf}:{}),...headers},...(body===undefined?{}:{body:Buffer.isBuffer(body)?body:JSON.stringify(body)})};
    // Fetch implementations can rewrite Host. Use the HTTP transport for virtual-host tests.
    if(headers.Host){return await new Promise((resolve,reject)=>{const req=httpRequest(origin+path,{method,headers:options.headers},res=>{const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('end',()=>{const raw=Buffer.concat(chunks).toString('utf8');resolve({status:res.statusCode,body:(res.headers['content-type']||'').includes('application/json')?JSON.parse(raw):raw});});});req.on('error',reject);req.end(options.body);});}
    const response=await fetch(origin+path,options);
    const type=response.headers.get('content-type')||'';
    return {status:response.status,headers:response.headers,body:type.includes('application/json')?await response.json():await response.text()};
  }
  return {c,owner,store,product,payments,req,origin};
}
test('marketing pages render metadata, real navigation and a separate admin entry',async t=>{
  const {req}=await fixture(t);
  for(const path of ['/','/pricing','/themes','/partners','/developers','/signup','/contact','/privacy','/terms']){
    const result=await req(path);assert.equal(result.status,200,path);assert.match(result.body,/<meta name="description"/);assert.match(result.body,/src="\/marketing.mjs"/);assert.match(result.body,/id="main"/);
  }
  assert.match((await req('/admin')).body,/src="\/app.mjs"/);
  assert.match((await req('/robots.txt')).body,/Disallow: \/api\//);
  assert.match((await req('/sitemap.xml')).body,/https:\/\/commerce.netcuriontechnology.com/);
});
test('public signup is transactional, consent based and creates a closed merchant store',async t=>{
  const {c,req}=await fixture(t),input={name:'New Owner',email:'new-owner@example.test',password:'new-owner-password-123',kind:'merchant',store_name:'New shop',slug:'new-web-shop',consent:true};
  assert.equal((await req('/api/signup',{method:'POST',body:{...input,consent:false}})).status,400);
  const created=await req('/api/signup',{method:'POST',body:input});assert.equal(created.status,201);assert.match(created.headers.get('set-cookie'),/HttpOnly/);
  assert.equal(c.get('SELECT mode FROM stores WHERE slug=?',input.slug).mode,'development');
  assert.equal((await req('/api/signup',{method:'POST',body:input})).status,409);
  assert.equal((await req('/api/signup',{method:'POST',body:{...input,email:'not-support@example.test',kind:'support'}})).status,400);
  assert.equal(c.get('SELECT COUNT(*) AS n FROM users WHERE email=?',input.email).n,1);
});
test('pilot enquiries are consent based and readable only by support',async t=>{
  const {c,req}=await fixture(t),input={name:'Demo Prospect',email:'prospect@example.test',company:'Sample brand',interest:'merchant',message:'Please review this fictional pilot request.',consent:true};
  assert.equal((await req('/api/pilot-requests',{method:'POST',body:{...input,consent:false}})).status,400);
  assert.equal((await req('/api/pilot-requests',{method:'POST',body:input})).status,201);
  assert.equal((await req('/api/pilot-requests',{auth:true})).status,403);
  const support=c.user({name:'Support',email:'web-support@example.test',password:'web-support-password-123',kind:'support'}),session=c.session(support);
  const result=await req('/api/pilot-requests',{headers:{Cookie:'ind_session='+session.token}});
  assert.equal(result.status,200);assert.equal(result.body[0].email,input.email);assert.ok(result.body[0].consent_at);
});
test('Razorpay webhooks bypass browser CSRF only when the raw signature verifies',async t=>{
  const {owner,store,product,payments,req,c}=await fixture(t);
  payments.save(owner,store.id,{key_id:'rzp_test_Web',key_secret:apiSecret,webhook_secret:webhookSecret});
  const intent=await req('/api/public/'+store.slug+'/payments',{method:'POST',headers:{'Idempotency-Key':'web-payment-key-12345'},body:{customer:'Test Buyer',email:'buyer@example.test',phone:'9999900000',address:'A test address in Bengaluru 560001',items:[{product_id:product.id,quantity:1}]}});
  assert.equal(intent.status,201);
  const raw=Buffer.from(JSON.stringify({event:'payment.captured',payload:{payment:{entity:{id:'pay_WebTest',order_id:intent.body.provider_order_id,amount:11800,currency:'INR',status:'captured',captured:true}}}}));
  const path='/api/webhooks/razorpay/'+store.id;
  assert.equal((await req(path,{method:'POST',body:raw,noOrigin:true,headers:{'x-razorpay-signature':'0'.repeat(64),'x-razorpay-event-id':'evt-web'}})).status,400);
  const signed=createHmac('sha256',webhookSecret).update(raw).digest('hex');
  assert.equal((await req(path,{method:'POST',body:raw,noOrigin:true,headers:{'x-razorpay-signature':signed,'x-razorpay-event-id':'evt-web'}})).status,200);
  assert.equal(c.orders(owner,store.id)[0].payment,'paid');
});
test('custom theme source stays private and preview frames carry their own sandbox CSP',async t=>{
  const {c,owner,store,req}=await fixture(t),config={...defaultTheme,renderer:'javascript',files:{'index.js':'import {html} from "ind:theme"; export default ({shop}) => html`<h1>${shop.name}</h1><p>Public design</p>`'}};
  const saved=await req('/api/stores/'+store.id+'/theme',{method:'PUT',auth:true,body:config});assert.equal(saved.status,200);
  const rendered=await req('/api/stores/'+store.id+'/theme/render',{method:'POST',auth:true,body:{config}});
  assert.equal(rendered.status,200);
  const frame=await req(rendered.body.frame_url,{auth:true});assert.equal(frame.status,200);assert.match(frame.headers.get('content-security-policy'),/^sandbox allow-scripts;/);assert.equal(frame.headers.get('x-frame-options'),'SAMEORIGIN');
  c.publishTheme(owner,store.id,{revision:1});
  const publicData=await req('/api/public/'+store.slug);assert.equal(publicData.body.theme.files,undefined);
  const publishedFrame=await req('/api/public/'+store.slug+'/theme-frame');assert.equal(publishedFrame.status,200);assert.match(publishedFrame.body,/Web shop/);
  c.run('DELETE FROM memberships WHERE user_id=? AND store_id=?',owner.id,store.id);
  assert.equal((await req(rendered.body.frame_url,{auth:true})).status,404);
});
test('custom hostnames cannot reach management or another store API',async t=>{
  const {c,store,req}=await fixture(t);
  c.run("INSERT INTO store_domains(id,store_id,hostname,challenge,status,created_at) VALUES(?,?,?,?,?,?)",'domain_web',store.id,'shop.example.com','test-proof','active',new Date().toISOString());
  const headers={Host:'shop.example.com',Origin:'https://shop.example.com'};
  const config=await req('/api/config',{headers});assert.equal(config.body.store_slug,store.slug);
  assert.equal((await req('/api/session',{auth:true,headers})).status,404);
  assert.equal((await req('/api/public/another-store',{headers})).status,404);
  assert.equal((await req('/.well-known/ind-commerce',{headers})).body,'test-proof');
  c.run("UPDATE stores SET mode='development' WHERE id=?",store.id);
  assert.equal((await req('/',{headers})).status,503);
});
test('collaborators cannot access merchant payment credentials or domains',async t=>{
  const {c,owner,store,req}=await fixture(t);
  const user=c.user({name:'Collaborator',email:'web-collab@example.test',password:'web-collab-password-123',kind:'partner'});
  c.grant(owner,store.id,{email:user.email,role:'collaborator'});const signed=c.session(user),headers={Cookie:'ind_session='+signed.token};
  assert.equal((await req('/api/stores/'+store.id+'/gateway',{headers})).status,403);
  assert.equal((await req('/api/stores/'+store.id+'/domains',{headers})).status,403);
});

test('retired theme source is preserved while new drafts and rollback require a supported renderer',async t=>{
  const {c,owner,store,req}=await fixture(t);
  const original=JSON.stringify({...defaultTheme,renderer:'retired',files:{'original.template':'original source'}});
  c.run('UPDATE stores SET draft=? WHERE id=?',original,store.id);
  const publish=await req('/api/stores/'+store.id+'/theme/publish',{method:'POST',auth:true,body:{revision:1}});
  assert.equal(publish.status,400);assert.equal(c.get('SELECT draft FROM stores WHERE id=?',store.id).draft,original);
  c.run('UPDATE theme_versions SET config=? WHERE store_id=? AND revision=1',original,store.id);
  assert.throws(()=>c.publishTheme(owner,store.id,{revision:1,rollback:1}),/rendering/);
  const config={...defaultTheme,renderer:'javascript',files:{'index.js':'export default () => "<h1>JavaScript</h1>"'}};
  assert.equal((await req('/api/stores/'+store.id+'/theme',{method:'PUT',auth:true,body:config})).status,200);
  assert.equal((await req('/api/stores/'+store.id+'/theme/publish',{method:'POST',auth:true,body:{revision:1}})).status,200);
  assert.equal((await req('/api/stores/'+store.id+'/theme/publish',{method:'POST',auth:true,body:{revision:2,rollback:1}})).status,400);
  assert.equal(JSON.parse(c.get('SELECT config FROM theme_versions WHERE store_id=? AND revision=1',store.id).config).files['original.template'],'original source');
});
