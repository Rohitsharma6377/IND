import { Media } from './media.mjs';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Commerce } from './commerce.mjs';
import { seedDemo } from './seed.mjs';
import { fail, Fault, PLANS, PLUGINS, APP_SCOPES,theme,secret } from './contracts.mjs';
import { draftWithOllama } from './assistant.mjs';
import { Payments } from './payments.mjs';
import { Domains } from './domains.mjs';
import { marketingPage,marketingPaths } from './marketing.mjs';
import { renderJavaScript,frameDocument,starterJavaScript } from './theme-renderer.mjs';

const assets = new Map([
  ['/media-editor.mjs', ['text/javascript; charset=utf-8', new URL('../public/media-editor.mjs', import.meta.url)]],
  ['/layout-model.mjs', ['text/javascript; charset=utf-8', new URL('../public/layout-model.mjs', import.meta.url)]],
  ['/', ['text/html; charset=utf-8', new URL('../public/index.html', import.meta.url)]],
  ['/app.mjs', ['text/javascript; charset=utf-8', new URL('../public/app.mjs', import.meta.url)]],
  ['/shared.mjs', ['text/javascript; charset=utf-8', new URL('../public/shared.mjs', import.meta.url)]],
  ['/styles.css', ['text/css; charset=utf-8', new URL('../public/styles.css', import.meta.url)]],
  ['/marketing.css', ['text/css; charset=utf-8', new URL('../public/marketing.css', import.meta.url)]],
  ['/marketing.mjs', ['text/javascript; charset=utf-8', new URL('../public/marketing.mjs', import.meta.url)]],
  ['/connections.mjs', ['text/javascript; charset=utf-8', new URL('../public/connections.mjs', import.meta.url)]],
  ['/payment-checkout.mjs', ['text/javascript; charset=utf-8', new URL('../public/payment-checkout.mjs', import.meta.url)]],
  ['/theme-editor.mjs', ['text/javascript; charset=utf-8', new URL('../public/theme-editor.mjs', import.meta.url)]],
]);
function json(res, status, value) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
}
async function body(req,limit=65536) {
  fail((req.headers['content-type'] || '').split(';')[0] === 'application/json', 415, 'Send application/json');
  const chunks=[]; let size=0;
  for await (const chunk of req) { size+=chunk.length; fail(size<=limit, 413, 'Request body exceeds its size limit'); chunks.push(chunk); }
  try {
    const value=JSON.parse(Buffer.concat(chunks).toString('utf8'));
    fail(value && typeof value==='object' && !Array.isArray(value),400,'Send a JSON object');
    return value;
  } catch(error) { if(error.status) throw error; throw new Fault(400,'Invalid JSON'); }
}
function cookie(req) {
  const match=(req.headers.cookie || '').match(/(?:^|;\s*)ind_session=([A-Za-z0-9_-]{20,200})(?:;|$)/);
  return match?.[1];
}
function setSession(res, session,secure=false) {
  res.setHeader('Set-Cookie', 'ind_session=' + session.token + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800'+(secure?'; Secure':''));
}
export function createCommerceServer({ commerce, demo = false, aiModel = null,paymentOptions={},domainOptions={},publicOrigin='',allowSignup=true } = {}) {
  const c=commerce ?? new Commerce(resolve('data/commerce.db'));
  fail(!(demo&&paymentOptions.allowLive),500,'Live payment mode is forbidden in the fictional demo');
  if(demo) seedDemo(c);
  if(publicOrigin){const u=new URL(publicOrigin);fail(u.protocol==='https:'&&!u.username&&!u.password&&u.pathname==='/'&&!u.search&&!u.hash,500,'COMMERCE_PUBLIC_ORIGIN must be an HTTPS origin');publicOrigin=u.origin;}
  fail(!paymentOptions.allowLive||Boolean(publicOrigin),500,'Live payments need a configured HTTPS public origin');
  const payments=new Payments(c,paymentOptions),domains=new Domains(c,{...domainOptions,platformHost:publicOrigin?new URL(publicOrigin).hostname:''});
  const media=new Media(c);
  const previews=new Map(),mediaPreviews=new Map();
  const sendFrame=(res,document,imageOrigin='')=>{
    const nonce=document.match(/<script nonce="([A-Za-z0-9_-]+)"/)?.[1];fail(nonce,500,'Frame nonce missing');
    res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Referrer-Policy','no-referrer');
    res.setHeader('Content-Security-Policy',"sandbox allow-scripts; default-src 'none'; img-src data: "+imageOrigin+"; style-src 'unsafe-inline'; script-src 'nonce-"+nonce+"'; connect-src 'none'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'");
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(document);
  };
  const rates=new Map(); let nextSweep=Date.now()+60000;
  const server=createServer(async (req,res) => {
    res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Referrer-Policy','same-origin');
    res.setHeader('X-Frame-Options','DENY');
    res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.razorpay.com; connect-src 'self' https://*.razorpay.com; frame-src 'self' https://*.razorpay.com; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; form-action 'self'");
    try {
      const localPort=server.address()?.port;
      const local=req.headers.host==='127.0.0.1:'+localPort||req.headers.host==='localhost:'+localPort;
      fail(typeof req.headers.host==='string'&&typeof req.url==='string'&&req.url.startsWith('/')&&!req.url.startsWith('//'),400,'Invalid request target');
      let parsedHost;try{parsedHost=new URL('http://'+req.headers.host);}catch{throw new Fault(400,'Invalid hostname');}
      fail(!parsedHost.username&&!parsedHost.password&&parsedHost.pathname==='/'&&!parsedHost.search&&!parsedHost.hash,400,'Invalid hostname');
      const platform=!local&&publicOrigin&&parsedHost.hostname===new URL(publicOrigin).hostname&&['','443'].includes(parsedHost.port);
      const mapped=!local&&!platform?domains.resolveHost(parsedHost.hostname):null;
      fail(local||platform||mapped,403,'Hostname is not configured for this platform');
      const origin=local?'http://'+req.headers.host:platform?publicOrigin:'https://'+parsedHost.hostname;
      const url=new URL(req.url,origin);
      let path;try{path=decodeURIComponent(url.pathname);}catch{throw new Fault(400,'Invalid URL encoding');}
      const method=req.method;
      if(mapped&&path==='/.well-known/ind-commerce'){res.writeHead(200,{'Content-Type':'text/plain'});res.end(mapped.challenge);return;}
      if(mapped)fail(mapped.status==='active'&&['demo','active'].includes(mapped.mode),503,'DNS is verified; HTTPS activation or store opening is pending');
      const unsafe=!['GET','HEAD'].includes(method);
      const webhook=path.match(/^\/api\/webhooks\/razorpay\/(store_[a-f0-9]+)$/);
      if(unsafe&&!webhook)fail(req.headers.origin===origin,403,'A same-origin request is required');
      if(path.startsWith('/api/')) {
        const current=Date.now();
        if(current>nextSweep) { for(const [k,v] of rates) if(v.until<current) rates.delete(k); nextSweep=current+60000; }
        const category=['/api/login','/api/signup','/api/pilot-requests'].includes(path) ? 'login' : path.startsWith('/api/public/') && unsafe ? 'checkout' : 'api';
        const key=req.socket.remoteAddress + ':' + category;
        const record=rates.get(key) ?? {n:0,until:current+60000};
        if(record.until<current) { record.n=0;record.until=current+60000; }
        record.n++; rates.set(key,record);
        const max=category==='login'?10:category==='checkout'?30:600;
        if(record.n>max) { res.setHeader('Retry-After','60'); throw new Fault(429,'Too many requests. Try again in a minute.'); }
      }
      if(path==='/api/config' && method==='GET') return json(res,200,{demo,ai: Boolean(aiModel),plans:PLANS,plugins:PLUGINS,app_scopes:APP_SCOPES,local_only:!publicOrigin,public_origin:publicOrigin||null,signup:allowSignup&&!mapped,store_slug:mapped?.slug||null});
      if(path==='/api/health' && method==='GET') return json(res,200,{ok:true,mode:demo?'demo':'local-pilot'});
      if(webhook&&method==='POST') {
        fail(!mapped,403,'Use the platform webhook hostname');
        const chunks=[];let bytes=0;for await(const chunk of req){bytes+=chunk.length;fail(bytes<=262144,413,'Webhook is too large');chunks.push(chunk);}
        return json(res,200,payments.webhook(webhook[1],Buffer.concat(chunks),req.headers['x-razorpay-signature'],req.headers['x-razorpay-event-id']));
      }
      if(path==='/api/signup'&&method==='POST') {
        fail(!mapped&&allowSignup,404,'Signup is not available');
        const session=c.signup(await body(req));setSession(res,session,!local);return json(res,201,{created:true});
      }
      if(path==='/api/pilot-requests'&&method==='POST'){fail(!mapped,404,'Not found');return json(res,201,c.pilotRequest(await body(req)));}
      if(path==='/api/login' && method==='POST') {
        fail(!mapped,404,'Sign in at the platform hostname');
        const session=c.authenticate(await body(req)); setSession(res,session,!local);
        return json(res,200,{user:session.user,csrf:session.csrf});
      }
      if(path==='/api/demo-session' && method==='POST') {
        fail(demo&&!mapped,404,'Not found');
        const input=await body(req);
        fail(['merchant','partner','support','client'].includes(input.profile),400,'Unknown demo profile');
        const user=c.get('SELECT * FROM users WHERE email=?', input.profile+'@demo.ind.local');
        fail(user,404,'Demo profile not found. Use a dedicated empty demo database.');
        const session=c.session(user); setSession(res,session,!local);
        return json(res,200,{user:session.user,csrf:session.csrf});
      }
      const publicImage=path.match(/^\/media\/([a-z0-9-]+)\/(img_[a-f0-9]+)\/(320|960)[.]webp$/);
            if(publicImage&&['GET','HEAD'].includes(method)){if(mapped)fail(publicImage[1]===mapped.slug,404,'Image not found');let data;const previewKey=url.searchParams.get('preview');if(previewKey){fail(!mapped,404,'Image not found');const entry=mediaPreviews.get(previewKey);fail(entry&&entry.expires>Date.now()&&entry.slug===publicImage[1],404,'Image preview expired');const previewActor=c.actor(entry.token);c.access(previewActor,entry.store,'themes');data=media.preview(previewActor,entry.store,publicImage[2],Number(publicImage[3]));}else data=media.derivative(publicImage[1],publicImage[2],Number(publicImage[3]));res.writeHead(200,{'Content-Type':'image/webp','Content-Length':data.length});res.end(method==='HEAD'?undefined:Buffer.from(data));return;}
            const publicMatch=path.match(/^\/api\/public\/([a-z0-9-]+)(?:\/(checkout|theme-frame|payments|confirm|receipt))?$/);
      if(publicMatch) {
        if(mapped)fail(publicMatch[1]===mapped.slug,404,'Store not found');
        if(method==='GET'&&!publicMatch[2]){const s=c.publicStore(publicMatch[1]);const {files,...publicTheme}=s.theme;return json(res,200,{...s,theme:publicTheme,payments:payments.publicStatus(s.id)});}
        if(method==='GET'&&publicMatch[2]==='theme-frame'){const s=c.publicStore(publicMatch[1]);fail(s.theme.renderer==='javascript',404,'No custom theme');return sendFrame(res,frameDocument(await renderJavaScript(s,s.theme,{imageOrigin:origin}),{imageOrigin:origin}),origin);}
        if(method==='POST'&&publicMatch[2]==='payments')return json(res,201,await payments.begin(publicMatch[1],await body(req),req.headers['idempotency-key']));
        if(method==='POST'&&publicMatch[2]==='confirm')return json(res,200,await payments.confirm(publicMatch[1],await body(req)));
        if(method==='POST'&&publicMatch[2]==='receipt'){const input=await body(req);return json(res,200,payments.receipt(publicMatch[1],input.intent_id,input.receipt_token));}
        if(method==='POST' && publicMatch[2]) return json(res,201,c.checkout(publicMatch[1],await body(req),req.headers['idempotency-key']));
        throw new Fault(405,'Method not allowed');
      }
      const appMatch=path.match(/^\/api\/app\/(products|orders)$/);
      if(appMatch && method==='GET') return json(res,200,{data:c.appData(req.headers.authorization?.replace(/^Bearer /,''),appMatch[1])});
      if(path.startsWith('/api/')) {
        fail(!mapped,404,'Management is available only at the platform hostname');
        const token=cookie(req), actor=c.actor(token);
        fail(actor,401,'Sign in to continue');
        if(unsafe) fail(req.headers['x-csrf-token'] === actor.csrf,403,'Refresh the page and try again');
        const preview=path.match(/^\/api\/theme-preview\/([A-Za-z0-9_-]+)$/);
        if(preview&&method==='GET'){
          const entry=previews.get(preview[1]);fail(entry&&entry.expires>Date.now()&&entry.actor===actor.id,404,'Preview expired');
          c.access(actor,entry.store,'themes');return sendFrame(res,entry.document,origin);
        }
        if(path==='/api/pilot-requests'&&method==='GET')return json(res,200,c.pilotRequests(actor));
        if(path==='/api/session' && method==='GET') return json(res,200,{user:{id:actor.id,name:actor.name,email:actor.email,kind:actor.kind},csrf:actor.csrf,stores:c.stores(actor)});
        if(path==='/api/logout' && method==='POST') {
          c.logout(token);res.setHeader('Set-Cookie','ind_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'+(local?'':'; Secure'));
          return json(res,200,{ok:true});
        }
        if(path==='/api/partner/stores') {
          if(method==='GET') return json(res,200,c.partnerOverview(actor));
          if(method==='POST') { const s=c.createPartnerStore(actor,await body(req));return json(res,201,{id:s.id,name:s.name,slug:s.slug}); }
        }
        if(path==='/api/support' && method==='GET') return json(res,200,c.tickets(actor));
        const support=path.match(/^\/api\/support\/([^/]+)\/respond$/);
        if(support && method==='POST') return json(res,200,c.respondTicket(actor,support[1],await body(req)));
        const route=path.match(/^\/api\/stores\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?(?:\/([^/]+))?$/);
        if(route) {
          const [,storeId,resource,item,action]=route;
          c.access(actor,storeId);
          if(!resource && method==='GET') return json(res,200,c.dashboard(actor,storeId));
          if(resource==='media'){
            if(method==='GET'&&!item)return json(res,200,media.list(actor,storeId));
            if(method==='POST'&&!item)return json(res,201,await media.upload(actor,storeId,await body(req,3000000)));
            if(method==='PATCH'&&item&&!action)return json(res,200,media.update(actor,storeId,item,await body(req)));
            if(method==='DELETE'&&item&&!action)return json(res,200,media.remove(actor,storeId,item));
            if(method==='GET'&&item&&action==='preview'){const data=media.preview(actor,storeId,item);res.writeHead(200,{'Content-Type':'image/webp'});res.end(Buffer.from(data));return;}
          }
          if(resource==='products') {
            if(method==='PUT'&&item&&action==='media')return json(res,200,media.attach(actor,storeId,item,await body(req)));
            if(method==='GET' && !item) return json(res,200,c.products(actor,storeId));
            if(method==='POST' && !item) return json(res,201,c.createProduct(actor,storeId,await body(req)));
            if(method==='PATCH' && item && !action) return json(res,200,c.editProduct(actor,storeId,item,await body(req)));
            if(method==='POST' && action==='stock') return json(res,200,c.adjustStock(actor,storeId,item,await body(req)));
          }
          if(resource==='orders') {
            if(method==='GET' && !item) return json(res,200,c.orders(actor,storeId));
            if(method==='POST' && item && !action) return json(res,200,c.orderAction(actor,storeId,item,(await body(req)).action));
          }
          if(resource==='tasks' && method==='POST' && item) return json(res,200,c.completeTask(actor,storeId,item));
          if(resource==='theme') {
            if(method==='GET')return json(res,200,{...c.themeState(actor,storeId),starter:starterJavaScript});
            const renderStore=()=>{const s=c.access(actor,storeId,'themes');for(const [key,entry]of mediaPreviews)if(entry.expires<Date.now())mediaPreviews.delete(key);while(mediaPreviews.size>=64)mediaPreviews.delete(mediaPreviews.keys().next().value);const key=secret();mediaPreviews.set(key,{store:storeId,slug:s.slug,token,expires:Date.now()+120000});const products=c.products(actor,storeId).map(p=>({...p,media:(p.media||[]).map(image=>({...image,url:image.url+'?preview='+key,thumbnail:image.thumbnail+'?preview='+key}))}));return {name:s.name,slug:s.slug,products};};
            if(method==='POST'&&item==='render'){
              const input=await body(req,262144),config=theme(input.config);fail(config.renderer==='javascript',400,'Select the JavaScript renderer');
              const document=frameDocument(await renderJavaScript(renderStore(),config,{imageOrigin:origin}),{imageOrigin:origin});c.access(c.actor(token),storeId,'themes');
              for(const [k,v]of previews)if(v.expires<Date.now())previews.delete(k);
              while(previews.size>=64)previews.delete(previews.keys().next().value);
              const key=secret();previews.set(key,{document,store:storeId,actor:actor.id,expires:Date.now()+120000});
              return json(res,200,{frame_url:'/api/theme-preview/'+key});
            }
            if(method==='PUT'&&!item){
              const config=theme(await body(req,262144));if(config.renderer==='javascript')await renderJavaScript(renderStore(),config,{imageOrigin:origin});
              return json(res,200,c.saveTheme(c.actor(token),storeId,config));
            }
            if(method==='POST'&&item==='publish'){
              const input=await body(req),s=c.access(actor,storeId,'themes');
              const source=input.rollback?JSON.parse(c.get('SELECT config FROM theme_versions WHERE store_id=? AND revision=?',storeId,input.rollback)?.config||'null'):JSON.parse(s.draft);
              fail(source,404,'Theme version not found');const config=theme(source);
              if(config.renderer==='javascript')await renderJavaScript(renderStore(),config);
              return json(res,200,c.publishTheme(c.actor(token),storeId,{...input,expected_config:input.rollback?null:s.draft}));
            }
          }
          if(resource==='preview' && method==='GET') {
            const s=c.access(actor,storeId,'themes');
            return json(res,200,{id:s.id,name:s.name,slug:s.slug,mode:s.mode,theme:JSON.parse(s.draft),products:c.products(actor,storeId).filter(p=>p.active),preview:true});
          }
          if(resource==='domains'){
            if(method==='GET')return json(res,200,domains.list(actor,storeId));
            if(method==='POST'&&!item)return json(res,201,domains.add(actor,storeId,await body(req)));
            if(method==='POST'&&item&&['verify','tls'].includes(action))return json(res,200,await domains.verify(actor,storeId,item,action==='tls'));
            if(method==='DELETE'&&item)return json(res,200,domains.remove(actor,storeId,item));
          }
          if(resource==='gateway'){
            if(method==='GET')return json(res,200,payments.status(actor,storeId));
            if(method==='PUT')return json(res,200,payments.save(actor,storeId,await body(req)));
            if(method==='DELETE')return json(res,200,payments.disable(actor,storeId));
          }
          if(resource==='payments'&&method==='GET')return json(res,200,payments.list(actor,storeId));
          if(resource==='plugins') {
            if(method==='GET') return json(res,200,c.pluginState(actor,storeId));
            if(method==='POST' && item) return json(res,200,c.plugin(actor,storeId,item,true));
            if(method==='DELETE' && item) return json(res,200,c.plugin(actor,storeId,item,false));
          }
          if(resource==='apps') {
            if(method==='GET') return json(res,200,c.apps(actor,storeId));
            if(method==='POST' && !item) return json(res,201,c.createApp(actor,storeId,await body(req)));
            if(method==='DELETE' && item) return json(res,200,c.revokeApp(actor,storeId,item));
          }
          if(resource==='members') {
            if(method==='GET') return json(res,200,c.members(actor,storeId));
            if(method==='POST') return json(res,200,c.grant(actor,storeId,await body(req)));
            if(method==='DELETE' && item) return json(res,200,c.revoke(actor,storeId,item));
          }
          if(resource==='handover' && method==='POST') return json(res,200,c.handover(actor,storeId,await body(req)));
          if(resource==='settings' && method==='PATCH') return json(res,200,c.settings(actor,storeId,await body(req)));
          if(resource==='tickets') {
            if(method==='GET') return json(res,200,c.tickets(actor,storeId));
            if(method==='POST') return json(res,201,c.createTicket(actor,storeId,await body(req)));
          }
          if(resource==='ledger' && method==='GET') {
            c.access(actor,storeId,'catalog');
            return json(res,200,c.all('SELECT l.*,p.name FROM ledger l JOIN products p ON p.id=l.product_id WHERE l.store_id=? ORDER BY l.created_at DESC,l.rowid DESC LIMIT 200',storeId));
          }
          if(resource==='events' && method==='GET') {
            c.access(actor,storeId,'apps');
            return json(res,200,c.all('SELECT * FROM events WHERE store_id=? ORDER BY created_at DESC LIMIT 50',storeId).map(e=>({...e,payload:JSON.parse(e.payload)})));
          }
          if(resource==='export' && method==='GET') {
            res.setHeader('Content-Disposition','attachment; filename="ind-store-export.json"');
            return json(res,200,c.exportStore(actor,storeId));
          }
          if(resource==='assistant' && method==='POST') {
            c.access(actor,storeId,'catalog');
            const input=await body(req), products=c.products(actor,storeId);
            const context={store:c.access(actor,storeId).name,products:products.slice(0,20).map(p=>({name:p.name,category:p.category,stock:p.stock})),low_stock:products.filter(p=>p.stock<=5).length};
            const result=await draftWithOllama(input,context,aiModel);
            // Re-check revocation after awaiting a model response.
            c.access(c.actor(token),storeId,'catalog');
            return json(res,200,result);
          }
        }
        throw new Fault(404,'API route not found');
      }
      fail(method==='GET' || method==='HEAD',405,'Method not allowed');
      if(!mapped&&path==='/robots.txt'){res.writeHead(200,{'Content-Type':'text/plain'});res.end('User-agent: *\nDisallow: /admin\nDisallow: /api/\n'+(publicOrigin?'Sitemap: '+publicOrigin+'/sitemap.xml\n':''));return;}
      if(!mapped&&path==='/sitemap.xml'){res.writeHead(200,{'Content-Type':'application/xml'});res.end('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+(publicOrigin?[...marketingPaths].filter(p=>!['/signup','/privacy','/terms'].includes(p)).map(p=>'<url><loc>'+publicOrigin+p+'</loc></url>').join(''):'')+'</urlset>');return;}
      if(!mapped&&path==='/signup'&&!allowSignup){res.writeHead(302,{Location:'/contact'});res.end();return;}
      if(!mapped&&marketingPaths.has(path)){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(method==='HEAD'?undefined:marketingPage(path,{origin:publicOrigin,demo}));return;}
      if(mapped)fail(path==='/'||['/app.mjs','/media-editor.mjs','/layout-model.mjs','/shared.mjs','/styles.css','/connections.mjs','/theme-editor.mjs','/payment-checkout.mjs'].includes(path),404,'Page not found');
      const asset=assets.get(path) ?? (/^\/s\/[a-z0-9-]+$/.test(path) || path==='/admin' ? assets.get('/') : null);
      fail(asset,404,'Page not found');
      res.writeHead(200,{'Content-Type':asset[0]});
      res.end(method==='HEAD'?undefined:readFileSync(asset[1]));
    } catch(error) {
      const conflict=error.code?.startsWith('SQLITE_CONSTRAINT')||(error.code==='ERR_SQLITE_ERROR'&&/UNIQUE constraint failed/.test(error.message||''));
      if(!res.headersSent)json(res,error.status||(conflict?409:500),{error:error.status?error.message:conflict?'Account, store address or reference already exists':'Unexpected server error',...(error.receipt?{receipt:error.receipt}:{})});
      else res.end();
      if(!error.status) console.error('[IND Commerce] Request failed:',error.code || error.name);
    }
  });
  server.headersTimeout=10000; server.requestTimeout=15000; server.maxHeadersCount=50;
  return {server,commerce:c,payments,domains};
}

if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const demo=process.argv.includes('--demo');
  const port=Number(process.env.PORT || 4310);
  fail(Number.isInteger(port) && port>0 && port<65536,400,'Invalid PORT');
  const filename=resolve(process.env.COMMERCE_DB || (demo?'data/demo.db':'data/commerce.db'));
  const {server}=createCommerceServer({commerce:new Commerce(filename),demo,aiModel:process.env.COMMERCE_AI_MODEL,publicOrigin:process.env.COMMERCE_PUBLIC_ORIGIN||'',allowSignup:process.env.COMMERCE_ALLOW_SIGNUP!=='0',paymentOptions:{key:process.env.COMMERCE_MASTER_KEY,allowLive:process.env.COMMERCE_ALLOW_LIVE_PAYMENTS==='1'},domainOptions:{target:process.env.COMMERCE_DOMAIN_TARGET||'commerce.netcuriontechnology.com',ipv4:(process.env.COMMERCE_DOMAIN_IPV4||'').split(',').filter(Boolean)}});
  server.on('error',error=>{ console.error('Could not start IND Commerce: '+error.code);process.exitCode=1; });
  const bind=process.env.COMMERCE_BIND||'127.0.0.1';
  fail(bind==='127.0.0.1'||(!demo&&Boolean(process.env.COMMERCE_PUBLIC_ORIGIN)),500,'A non-local bind needs an HTTPS public origin and demo mode disabled');
  server.listen(port,bind,()=>console.log('IND Commerce: http://127.0.0.1:'+port+'\nPilot software. No courier bookings or billing subscriptions.'));
  for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.close(()=>process.exit(0)));
}
