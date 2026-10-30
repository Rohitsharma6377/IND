import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { Commerce } from '../src/commerce.mjs';
import { Payments,Razorpay,masterKey,encryptSecret,decryptSecret,verifyProviderSignature } from '../src/payments.mjs';
const key='12'.repeat(32),apiSecret='provider-secret-24-chars',webhookSecret='test-webhook-secret-at-least-32-characters';
const sign=(payload,secret)=>createHmac('sha256',secret).update(payload).digest('hex');
const status=expected=>error=>error.status===expected;
function fixture(t,options={}) {
  const c=new Commerce();t.after(()=>c.close());
  const owner=c.user({name:'Owner',email:'payment-owner@example.test',password:'test-owner-password-123'});
  const other=c.user({name:'Other',email:'payment-other@example.test',password:'test-other-password-123'});
  const store=c.newStore(owner,{name:'Pay shop',slug:'pay-shop'},'demo');
  const product=c.createProduct(owner,store.id,{name:'Test cup',sku:'PAY-1',stock:20,price:11800});
  const mock={calls:0,next:0,payment:null,createError:null,configs:[]};
  const payments=new Payments(c,{key,...options,providerFactory:config=>{mock.configs.push(config);return {
    createOrder:async input=>{mock.calls++;if(mock.createError)throw mock.createError;return {id:'order_Test'+(++mock.next),amount:input.amount,currency:input.currency};},
    fetchPayment:async()=>mock.payment
  };}});
  payments.save(owner,store.id,{key_id:'rzp_test_First',key_secret:apiSecret,webhook_secret:webhookSecret});
  const input={customer:'Test Customer',email:'buyer@example.test',phone:'9999900000',address:'Test address in Bengaluru 560001',items:[{product_id:product.id,quantity:1}]};
  const payment=intent=>({id:'pay_Test'+intent.provider_order_id.slice(6),order_id:intent.provider_order_id,amount:intent.amount,currency:'INR',status:'captured',captured:true});
  return {c,owner,other,store,product,payments,mock,input,payment};
}
test('gateway credentials use authenticated encryption bound to the store',()=>{
  const k=masterKey(key),encrypted=encryptSecret('sensitive-test-value',k,'store:api');
  assert.ok(!encrypted.includes('sensitive-test-value'));
  assert.equal(decryptSecret(encrypted,k,'store:api'),'sensitive-test-value');
  assert.throws(()=>decryptSecret(encrypted,k,'other-store:api'));
  assert.throws(()=>decryptSecret(encrypted,masterKey('34'.repeat(32)),'store:api'));
  const payload='order_Test|pay_Test';
  assert.equal(verifyProviderSignature(payload,sign(payload,apiSecret),apiSecret),true);
  assert.equal(verifyProviderSignature(payload,'bad',apiSecret),false);
});
test('only owners configure payments and live keys are disabled by default',t=>{
  const {c,owner,other,store,payments}=fixture(t);
  assert.throws(()=>payments.status(other,store.id),status(404));
  assert.throws(()=>payments.save(owner,store.id,{key_id:'rzp_live_Test',key_secret:apiSecret,webhook_secret:webhookSecret}),status(409));
  const config=payments.status(owner,store.id);
  assert.equal(config.enabled,true);assert.equal(config.key_secret,undefined);assert.equal(config.webhook_secret,undefined);
  const record=c.get('SELECT * FROM gateway_versions');
  assert.ok(!record.key_secret.includes(apiSecret));assert.ok(!record.webhook_secret.includes(webhookSecret));
});
test('online intent uses authoritative totals and a duplicate checkout does not create another provider order',async t=>{
  const {c,owner,store,product,payments,mock,input}=fixture(t);
  const intent=await payments.begin(store.slug,{...input,total:1},'online-checkout-key-123');
  assert.equal(intent.amount,11800);
  const again=await payments.begin(store.slug,{...input,receipt_token:intent.receipt_token},'online-checkout-key-123');
  assert.equal(again.intent_id,intent.intent_id);assert.equal(mock.calls,1);
  assert.equal(c.products(owner,store.id)[0].stock,19);
  assert.throws(()=>c.orderAction(owner,store.id,intent.order_id,'ship'),status(409));
  assert.throws(()=>c.checkout(store.slug,{...input,method:'razorpay'},'direct-online-key-123'),status(400));
  await assert.rejects(payments.begin(store.slug,input,'online-checkout-key-123'),status(409));
});
test('forged browser callbacks and mismatched provider payments never mark an order paid',async t=>{
  const {c,owner,store,payments,mock,input,payment}=fixture(t);
  const intent=await payments.begin(store.slug,input,'online-verify-key-123'),remote=payment(intent);
  const callback={intent_id:intent.intent_id,receipt_token:intent.receipt_token,razorpay_order_id:intent.provider_order_id,razorpay_payment_id:remote.id,razorpay_signature:'0'.repeat(64)};
  mock.payment=remote;await assert.rejects(payments.confirm(store.slug,callback),status(400));
  callback.razorpay_signature=sign(intent.provider_order_id+'|'+remote.id,apiSecret);
  mock.payment={...remote,amount:1};await assert.rejects(payments.confirm(store.slug,callback),status(409));
  mock.payment={...remote,status:'authorized',captured:false};
  assert.equal((await payments.confirm(store.slug,callback)).status,'ready');
  assert.equal(c.orders(owner,store.id)[0].payment,'unpaid');
  mock.payment=remote;assert.equal((await payments.confirm(store.slug,callback)).status,'paid');
  assert.equal(c.orders(owner,store.id)[0].payment,'paid');
});
test('raw signed webhooks deduplicate captures and ignore later authorised/failed notifications',async t=>{
  const {c,owner,store,payments,input,payment}=fixture(t);
  const intent=await payments.begin(store.slug,input,'online-webhook-key-123'),remote=payment(intent);
  const raw=Buffer.from(JSON.stringify({event:'payment.captured',payload:{payment:{entity:remote}}}));
  assert.throws(()=>payments.webhook(store.id,raw,'0'.repeat(64),'evt-first'),status(400));
  payments.webhook(store.id,raw,sign(raw,webhookSecret),'evt-first');
  assert.equal(payments.webhook(store.id,raw,sign(raw,webhookSecret),'evt-first').duplicate,true);
  const failed=Buffer.from(JSON.stringify({event:'payment.failed',payload:{payment:{entity:{...remote,status:'failed',captured:false}}}}));
  payments.webhook(store.id,failed,sign(failed,webhookSecret),'evt-failed');
  assert.equal(c.orders(owner,store.id)[0].payment,'paid');
  assert.equal(c.get("SELECT COUNT(*) AS n FROM events WHERE topic='payment.paid'").n,1);
  assert.throws(()=>payments.webhook(store.id,failed,sign(failed,webhookSecret),'evt-first'),status(409));
});
test('old payment attempts remain verifiable after key rotation and disabling new checkout',async t=>{
  const {store,owner,payments,input,payment}=fixture(t);
  const intent=await payments.begin(store.slug,input,'online-rotation-key-123');
  payments.save(owner,store.id,{key_id:'rzp_test_Second',key_secret:'another-provider-secret',webhook_secret:'second-webhook-secret-at-least-32-characters'});
  const again=await payments.begin(store.slug,{...input,receipt_token:intent.receipt_token},'online-rotation-key-123');
  assert.equal(again.key_id,'rzp_test_First');
  payments.disable(owner,store.id);
  await assert.rejects(payments.begin(store.slug,input,'new-disabled-key-123'),status(503));
  const raw=Buffer.from(JSON.stringify({event:'payment.captured',payload:{payment:{entity:payment(intent)}}}));
  payments.webhook(store.id,raw,sign(raw,webhookSecret),'evt-old-configuration');
  assert.equal(payments.receipt(store.slug,intent.intent_id,intent.receipt_token).status,'paid');
});
test('late capture after cancellation is flagged for refund review without fulfilment',async t=>{
  const {c,owner,store,product,payments,input,payment}=fixture(t);
  const intent=await payments.begin(store.slug,input,'online-late-capture-123');
  c.orderAction(owner,store.id,intent.order_id,'cancel');
  const raw=Buffer.from(JSON.stringify({event:'payment.captured',payload:{payment:{entity:payment(intent)}}}));
  payments.webhook(store.id,raw,sign(raw,webhookSecret),'evt-late');
  assert.equal(payments.receipt(store.slug,intent.intent_id,intent.receipt_token).status,'review');
  assert.equal(c.get('SELECT stock FROM products WHERE id=?',product.id).stock,20);
  assert.equal(c.orders(owner,store.id)[0].fulfilment,'cancelled');
  assert.throws(()=>c.orderAction(owner,store.id,intent.order_id,'ship'),status(409));
  assert.ok(c.dashboard(owner,store.id).tasks.some(t=>t.title.includes('late capture')));
});
test('uncertain provider creation is not retried automatically and stock is reserved once',async t=>{
  const {c,owner,store,payments,mock,input}=fixture(t);
  mock.createError=new Error('Synthetic timeout');let receipt;
  await assert.rejects(payments.begin(store.slug,input,'online-uncertain-key-123'),error=>{receipt=error.receipt;return error.status===502;});
  assert.ok(receipt.receipt_token);
  await assert.rejects(payments.begin(store.slug,{...input,receipt_token:receipt.receipt_token},'online-uncertain-key-123'),status(409));
  assert.equal(mock.calls,1);assert.equal(c.products(owner,store.id)[0].stock,19);
  assert.equal(payments.list(owner,store.id)[0].status,'uncertain');
});
test('receipts cannot be read by guessing an intent ID or another store slug',async t=>{
  const {store,payments,input}=fixture(t);
  const intent=await payments.begin(store.slug,input,'online-receipt-key-123');
  assert.throws(()=>payments.receipt(store.slug,intent.intent_id,'wrong-token'),status(404));
  assert.throws(()=>payments.receipt('other-shop',intent.intent_id,intent.receipt_token),status(404));
  assert.equal(payments.receipt(store.slug,intent.intent_id,intent.receipt_token).email,undefined);
});

test('partner handover disables inherited payment settings and resets domain proof',t=>{
  const {c,owner,payments}=fixture(t);
  const partner=c.user({name:'Partner',email:'pay-partner@example.test',password:'test-partner-password-123',kind:'partner'});
  const dev=c.createPartnerStore(partner,{name:'Client shop',slug:'pay-client'});
  payments.save(partner,dev.id,{key_id:'rzp_test_Agency',key_secret:apiSecret,webhook_secret:webhookSecret});
  c.run("INSERT INTO store_domains(id,store_id,hostname,challenge,status,created_at) VALUES(?,?,?,?,?,?)",'domain_test',dev.id,'client.example.com','old-challenge','active',new Date().toISOString());
  c.handover(partner,dev.id,{email:owner.email});
  assert.equal(payments.status(owner,dev.id).enabled,false);
  assert.throws(()=>payments.status(partner,dev.id),status(404));
  const domain=c.get('SELECT * FROM store_domains WHERE store_id=?',dev.id);
  assert.equal(domain.status,'pending');assert.notEqual(domain.challenge,'old-challenge');
});

test('the provider adapter sends server totals and distinguishes rejected from uncertain creation',async()=>{
  let request;
  const adapter=new Razorpay({keyId:'rzp_test_Adapter',keySecret:apiSecret,fetcher:async(url,options)=>{request={url,options};return new Response(JSON.stringify({id:'order_Adapter',amount:11800,currency:'INR'}));}});
  const result=await adapter.createOrder({amount:11800,currency:'INR',receipt:'ord_test'});
  assert.equal(result.id,'order_Adapter');assert.equal(request.url,'https://api.razorpay.com/v1/orders');
  assert.equal(request.options.method,'POST');assert.equal(JSON.parse(request.options.body).amount,11800);
  assert.equal(request.options.headers.Authorization,'Basic '+Buffer.from('rzp_test_Adapter:'+apiSecret).toString('base64'));
  const rejected=new Razorpay({keyId:'test',keySecret:apiSecret,fetcher:async()=>new Response('{}',{status:401})});
  await assert.rejects(rejected.createOrder({amount:11800}),error=>error.status===502&&error.definitive===true);
  const uncertain=new Razorpay({keyId:'test',keySecret:apiSecret,fetcher:async()=>{throw new Error('Synthetic network timeout');}});
  await assert.rejects(uncertain.createOrder({amount:11800}),error=>error.status===502&&error.definitive===false);
});
