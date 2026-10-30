import { createCipheriv,createDecipheriv,randomBytes,createHmac,timingSafeEqual } from 'node:crypto';
import { fail,id,now,secret,hash,text } from './contracts.mjs';

export function masterKey(value) {
  if(!value)return null;
  const key=/^[a-f0-9]{64}$/i.test(value)?Buffer.from(value,'hex'):Buffer.from(value,'base64');
  fail(key.length===32,500,'COMMERCE_MASTER_KEY must encode 32 random bytes');return key;
}
export function encryptSecret(value,key,context) {
  fail(key,503,'Configure the server encryption key before saving payment credentials');
  const nonce=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key,nonce);cipher.setAAD(Buffer.from(context));
  const data=Buffer.concat([cipher.update(value,'utf8'),cipher.final()]);
  return [nonce,cipher.getAuthTag(),data].map(v=>v.toString('base64url')).join('.');
}
export function decryptSecret(value,key,context) {
  const [nonce,tag,data]=value.split('.').map(v=>Buffer.from(v,'base64url'));
  const cipher=createDecipheriv('aes-256-gcm',key,nonce);cipher.setAAD(Buffer.from(context));cipher.setAuthTag(tag);
  return Buffer.concat([cipher.update(data),cipher.final()]).toString('utf8');
}
export function verifyProviderSignature(payload,signature,key) {
  if(typeof signature!=='string'||!/^[a-f0-9]{64}$/.test(signature)||typeof key!=='string'||!key.length)return false;
  return timingSafeEqual(Buffer.from(signature,'hex'),createHmac('sha256',key).update(payload).digest());
}
export class Razorpay {
  constructor({keyId,keySecret,fetcher=fetch}){this.keyId=keyId;this.keySecret=keySecret;this.fetcher=fetcher;}
  async request(method,path,input) {
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try {
      const response=await this.fetcher('https://api.razorpay.com/v1/'+path,{method,signal:controller.signal,headers:{
        Authorization:'Basic '+Buffer.from(this.keyId+':'+this.keySecret).toString('base64'),'Content-Type':'application/json'
      },...(input?{body:JSON.stringify(input)}:{})});
      if(!response.ok)throw Object.assign(new Error('Payment provider rejected the request'),{status:502,definitive:response.status>=400&&response.status<500});
      return await response.json();
    } catch(error){if(error.status)throw error;throw Object.assign(new Error('The provider response is uncertain. Review this payment attempt before retrying.'),{status:502,definitive:false});}
    finally{clearTimeout(timer);}
  }
  createOrder(input){return this.request('POST','orders',input);}
  fetchPayment(paymentId){fail(/^pay_[A-Za-z0-9]+$/.test(paymentId),400,'Invalid payment reference');return this.request('GET','payments/'+paymentId);}
}
export class Payments {
  constructor(c,{key=null,allowLive=false,providerFactory=config=>new Razorpay(config)}={}){this.c=c;this.key=masterKey(key);this.allowLive=allowLive;this.providerFactory=providerFactory;}
  version(storeId,versionId) {
    const row=this.c.get('SELECT * FROM gateway_versions WHERE id=? AND store_id=?',versionId,storeId);fail(row&&this.key,503,'Payment configuration is unavailable');
    try{return {version:row.id,keyId:row.key_id,keySecret:decryptSecret(row.key_secret,this.key,storeId+':api'),webhookSecret:decryptSecret(row.webhook_secret,this.key,storeId+':webhook'),mode:row.mode};}catch{fail(false,503,'Payment credentials cannot be decrypted. Restore the encryption key or update the configuration.');}
  }
  config(storeId) {
    const current=this.c.get('SELECT * FROM gateway_accounts WHERE store_id=? AND enabled=1',storeId);
    return current&&this.key?this.version(storeId,current.version_id):null;
  }
  status(actor,storeId) {
    this.c.access(actor,storeId,'settings');
    const row=this.c.get('SELECT a.enabled,a.updated_at,v.key_id,v.mode FROM gateway_accounts a JOIN gateway_versions v ON v.id=a.version_id WHERE a.store_id=?',storeId);
    let usable=false;if(row?.enabled&&this.key){try{usable=Boolean(this.config(storeId));}catch{}}
    return {configured:Boolean(row),enabled:usable,key_id:row?.key_id||'',mode:row?.mode||'test',updated_at:row?.updated_at||null,encryption_ready:Boolean(this.key),live_allowed:this.allowLive};
  }
  save(actor,storeId,input) {
    this.c.access(actor,storeId,'settings');
    const keyId=text(input.key_id,'Razorpay key ID',100),apiSecret=text(input.key_secret,'API secret',256,12),webhookSecret=text(input.webhook_secret,'Webhook secret',256,32);
    fail(/^rzp_(test|live)_[A-Za-z0-9]+$/.test(keyId),400,'Use a Razorpay test or live key ID');
    const mode=keyId.startsWith('rzp_live_')?'live':'test';
    fail(mode!=='live'||this.allowLive,409,'Live payments are disabled. Use test keys until go-live review is complete.');
    return this.c.tx(()=>{
      const versionId=id('gateway');
      this.c.run('INSERT INTO gateway_versions VALUES(?,?,?,?,?,?,?)',versionId,storeId,keyId,encryptSecret(apiSecret,this.key,storeId+':api'),encryptSecret(webhookSecret,this.key,storeId+':webhook'),mode,now());
      this.c.run('INSERT INTO gateway_accounts VALUES(?,?,1,?) ON CONFLICT(store_id) DO UPDATE SET version_id=excluded.version_id,enabled=1,updated_at=excluded.updated_at',storeId,versionId,now());
      this.c.audit(storeId,actor.id,'payments.configured','Razorpay '+mode+' configuration saved; encrypted credentials versioned');
      return this.status(actor,storeId);
    });
  }
  disable(actor,storeId) {
    this.c.access(actor,storeId,'settings');this.c.run('UPDATE gateway_accounts SET enabled=0 WHERE store_id=?',storeId);
    this.c.audit(storeId,actor.id,'payments.disabled','New online checkout disabled; historical credentials retained for reconciliation');return this.status(actor,storeId);
  }
  publicStatus(storeId) {
    const row=this.c.get('SELECT a.enabled,v.mode FROM gateway_accounts a JOIN gateway_versions v ON v.id=a.version_id WHERE a.store_id=?',storeId);
    let usable=false;if(row?.enabled&&this.key){try{usable=Boolean(this.config(storeId));}catch{}}
    return {provider:'razorpay',enabled:usable,mode:row?.mode||'test'};
  }
  async begin(slug,input,key) {
    const store=this.c.get("SELECT id FROM stores WHERE slug=? AND mode IN ('active','demo')",slug);fail(store,404,'Storefront not found');
    const current=this.config(store.id);fail(current,503,'Online payments are not enabled for this store');
    const token=secret();let order,attempt,created=false;
    this.c.tx(()=>{
      order=this.c.checkout(slug,{...input,method:'razorpay'},key,{online:true});
      attempt=this.c.get('SELECT * FROM payment_intents WHERE order_id=?',order.id);
      if(attempt) {
        fail(typeof input.receipt_token==='string'&&hash(input.receipt_token)===attempt.token_hash,409,'Continue from the original payment window for this checkout');
        fail(['ready','paid','review'].includes(attempt.status),409,'This payment attempt needs review before retrying');
      } else {
        created=true;const intentId=id('intent');
        this.c.run("INSERT INTO payment_intents(id,store_id,order_id,gateway_version,token_hash,status,amount,created_at,updated_at) VALUES(?,?,?,?,?,'creating',?,?,?)",intentId,store.id,order.id,current.version,hash(token),order.total,now(),now());
        attempt=this.c.get('SELECT * FROM payment_intents WHERE id=?',intentId);
      }
    });
    const config=this.version(store.id,attempt.gateway_version);
    if(created) {
      try {
        const remote=await this.providerFactory(config).createOrder({amount:order.total,currency:'INR',receipt:order.id,notes:{ind_order_id:order.id,ind_store_id:store.id}});
        fail(/^order_[A-Za-z0-9]+$/.test(remote.id)&&remote.amount===order.total&&remote.currency==='INR',502,'Provider order details do not match');
        this.c.run("UPDATE payment_intents SET provider_order_id=?,status='ready',updated_at=? WHERE id=?",remote.id,now(),attempt.id);
        attempt=this.c.get('SELECT * FROM payment_intents WHERE id=?',attempt.id);
      } catch(error) {
        this.c.run('UPDATE payment_intents SET status=?,last_error=?,updated_at=? WHERE id=?',error.definitive?'failed':'uncertain',error.definitive?'Provider rejected creation':'Creation outcome is uncertain',now(),attempt.id);
        this.c.audit(store.id,'gateway','payment.creation_review',attempt.id+'; stock remains reserved');
        throw Object.assign(new Error(error.message||'Payment creation failed'),{status:error.status||502,receipt:{intent_id:attempt.id,receipt_token:token,order_id:order.id}});
      }
    }
    return {intent_id:attempt.id,order_id:order.id,number:order.number,amount:attempt.amount,currency:attempt.currency,provider_order_id:attempt.provider_order_id,key_id:config.keyId,mode:config.mode,receipt_token:created?token:input.receipt_token,status:attempt.status};
  }
  receipt(slug,intentId,token) {
    const row=this.c.get('SELECT p.*,o.number,o.fulfilment FROM payment_intents p JOIN orders o ON o.id=p.order_id JOIN stores s ON s.id=p.store_id WHERE p.id=? AND s.slug=?',intentId,slug);
    fail(row&&typeof token==='string'&&hash(token)===row.token_hash,404,'Payment receipt not found');
    return {intent_id:row.id,number:row.number,status:row.status,amount:row.amount,currency:row.currency,fulfilment:row.fulfilment};
  }
  capture(attempt,payment) {
    fail(payment.order_id===attempt.provider_order_id&&payment.amount===attempt.amount&&payment.currency===attempt.currency,409,'Payment amount, currency or order does not match');
    fail(payment.status==='captured'&&payment.captured===true&&/^pay_[A-Za-z0-9]+$/.test(payment.id),409,'Payment has not been captured');
    return this.c.tx(()=>{
      const current=this.c.get('SELECT * FROM payment_intents WHERE id=?',attempt.id);
      if(['paid','review'].includes(current.status)){fail(current.provider_payment_id===payment.id,409,'A different payment was already recorded');return current.status;}
      const order=this.c.get('SELECT * FROM orders WHERE id=? AND store_id=?',attempt.order_id,attempt.store_id);
      const status=order.fulfilment==='cancelled'?'review':'paid';
      this.c.run('UPDATE payment_intents SET provider_payment_id=?,status=?,last_error=?,updated_at=? WHERE id=?',payment.id,status,status==='review'?'Captured after cancellation: refund review required':'',now(),attempt.id);
      this.c.run("UPDATE orders SET payment='paid' WHERE id=?",order.id);
      this.c.audit(attempt.store_id,'razorpay',status==='review'?'payment.refund_review':'payment.captured',order.number+' · '+payment.id);
      this.c.run('INSERT INTO events VALUES(?,?,?,?,?)',id('evt'),attempt.store_id,'payment.'+status,JSON.stringify({order_id:order.id,amount:attempt.amount,currency:attempt.currency}),now());
      if(status==='review')this.c.task(attempt.store_id,'Review late capture for '+order.number,'A capture arrived after cancellation. Review a refund with the provider; do not fulfil automatically.');
      return status;
    });
  }
  async confirm(slug,input) {
    this.receipt(slug,text(input.intent_id,'Payment attempt',100),input.receipt_token);
    const attempt=this.c.get('SELECT * FROM payment_intents WHERE id=?',input.intent_id),config=this.version(attempt.store_id,attempt.gateway_version);
    fail(input.razorpay_order_id===attempt.provider_order_id,409,'Payment order reference does not match');
    fail(verifyProviderSignature(attempt.provider_order_id+'|'+input.razorpay_payment_id,input.razorpay_signature,config.keySecret),400,'Invalid payment signature');
    const payment=await this.providerFactory(config).fetchPayment(input.razorpay_payment_id);
    fail(payment.id===input.razorpay_payment_id&&payment.order_id===attempt.provider_order_id&&payment.amount===attempt.amount&&payment.currency===attempt.currency,409,'Provider payment does not match this checkout');
    if(payment.status==='captured'&&payment.captured===true)this.capture(attempt,payment);
    return this.receipt(slug,attempt.id,input.receipt_token);
  }
  webhook(storeId,raw,signature,eventId) {
    fail(this.key,503,'Payment encryption key is unavailable');text(eventId,'Webhook event ID',160);
    const versions=this.c.all('SELECT * FROM gateway_versions WHERE store_id=?',storeId);
    fail(versions.some(v=>verifyProviderSignature(raw,signature,decryptSecret(v.webhook_secret,this.key,storeId+':webhook'))),400,'Invalid webhook signature');
    let event;try{event=JSON.parse(raw.toString('utf8'));}catch{fail(false,400,'Invalid webhook JSON');}
    fail(typeof event.event==='string',400,'Missing webhook topic');
    return this.c.tx(()=>{
      const previous=this.c.get('SELECT digest FROM webhook_receipts WHERE store_id=? AND event_id=?',storeId,eventId),digest=hash(raw);
      if(previous){fail(previous.digest===digest,409,'Webhook event ID reused with another payload');return {duplicate:true};}
      if(event.event==='payment.captured') {
        const payment=event.payload?.payment?.entity;fail(payment&&typeof payment.order_id==='string',400,'Missing payment entity');
        const attempt=this.c.get('SELECT * FROM payment_intents WHERE provider_order_id=? AND store_id=?',payment.order_id,storeId);
        fail(attempt,409,'Provider order not linked yet; retry this event');
        fail(verifyProviderSignature(raw,signature,this.version(storeId,attempt.gateway_version).webhookSecret),400,'Signature does not match this payment configuration');
        this.capture(attempt,payment);
      }
      this.c.run('INSERT INTO webhook_receipts VALUES(?,?,?,?,?)',storeId,eventId,digest,event.event,now());return {received:true};
    });
  }
  list(actor,storeId) {
    this.c.access(actor,storeId,'orders');
    return this.c.all('SELECT p.id,p.order_id,p.provider_order_id,p.provider_payment_id,p.status,p.amount,p.currency,p.last_error,p.created_at,o.number,o.fulfilment FROM payment_intents p JOIN orders o ON o.id=p.order_id WHERE p.store_id=? ORDER BY p.created_at DESC',storeId);
  }
}
