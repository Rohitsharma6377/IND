import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Commerce } from './commerce.mjs';
import { seedDemo } from './seed.mjs';
import { fail, Fault, PLANS, PLUGINS, APP_SCOPES } from './contracts.mjs';
import { draftWithOllama } from './assistant.mjs';

const assets = new Map([
  ['/', ['text/html; charset=utf-8', new URL('../public/index.html', import.meta.url)]],
  ['/app.mjs', ['text/javascript; charset=utf-8', new URL('../public/app.mjs', import.meta.url)]],
  ['/shared.mjs', ['text/javascript; charset=utf-8', new URL('../public/shared.mjs', import.meta.url)]],
  ['/styles.css', ['text/css; charset=utf-8', new URL('../public/styles.css', import.meta.url)]],
]);
function json(res, status, value) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
}
async function body(req) {
  fail((req.headers['content-type'] || '').split(';')[0] === 'application/json', 415, 'Send application/json');
  const chunks=[]; let size=0;
  for await (const chunk of req) { size+=chunk.length; fail(size<=65536, 413, 'Request body exceeds 64 KB'); chunks.push(chunk); }
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
function setSession(res, session) {
  res.setHeader('Set-Cookie', 'ind_session=' + session.token + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800');
}
export function createCommerceServer({ commerce, demo = false, aiModel = null } = {}) {
  const c=commerce ?? new Commerce(resolve('data/commerce.db'));
  if(demo) seedDemo(c);
  const rates=new Map(); let nextSweep=Date.now()+60000;
  const server=createServer(async (req,res) => {
    res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Referrer-Policy','same-origin');
    res.setHeader('X-Frame-Options','DENY');
    res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; form-action 'self'");
    try {
      const localPort=server.address()?.port;
      fail(req.headers.host === '127.0.0.1:' + localPort || req.headers.host === 'localhost:' + localPort, 403, 'Use the printed local server URL');
      const url=new URL(req.url,'http://' + req.headers.host);
      const path=decodeURIComponent(url.pathname), method=req.method;
      const unsafe=!['GET','HEAD'].includes(method);
      if(unsafe) fail(req.headers.origin === url.origin,403,'A same-origin request is required');
      if(path.startsWith('/api/')) {
        const current=Date.now();
        if(current>nextSweep) { for(const [k,v] of rates) if(v.until<current) rates.delete(k); nextSweep=current+60000; }
        const category=path === '/api/login' ? 'login' : path.startsWith('/api/public/') && unsafe ? 'checkout' : 'api';
        const key=req.socket.remoteAddress + ':' + category;
        const record=rates.get(key) ?? {n:0,until:current+60000};
        if(record.until<current) { record.n=0;record.until=current+60000; }
        record.n++; rates.set(key,record);
        const max=category==='login'?10:category==='checkout'?30:600;
        if(record.n>max) { res.setHeader('Retry-After','60'); throw new Fault(429,'Too many requests. Try again in a minute.'); }
      }
      if(path==='/api/config' && method==='GET') return json(res,200,{demo,ai: Boolean(aiModel),plans:PLANS,plugins:PLUGINS,app_scopes:APP_SCOPES,local_only:true});
      if(path==='/api/health' && method==='GET') return json(res,200,{ok:true,mode:demo?'demo':'local-pilot'});
      if(path==='/api/login' && method==='POST') {
        const session=c.authenticate(await body(req)); setSession(res,session);
        return json(res,200,{user:session.user,csrf:session.csrf});
      }
      if(path==='/api/demo-session' && method==='POST') {
        fail(demo,404,'Not found');
        const input=await body(req);
        fail(['merchant','partner','support','client'].includes(input.profile),400,'Unknown demo profile');
        const user=c.get('SELECT * FROM users WHERE email=?', input.profile+'@demo.ind.local');
        fail(user,404,'Demo profile not found. Use a dedicated empty demo database.');
        const session=c.session(user); setSession(res,session);
        return json(res,200,{user:session.user,csrf:session.csrf});
      }
      const publicMatch=path.match(/^\/api\/public\/([a-z0-9-]+)(?:\/(checkout))?$/);
      if(publicMatch) {
        if(method==='GET' && !publicMatch[2]) return json(res,200,c.publicStore(publicMatch[1]));
        if(method==='POST' && publicMatch[2]) return json(res,201,c.checkout(publicMatch[1],await body(req),req.headers['idempotency-key']));
        throw new Fault(405,'Method not allowed');
      }
      const appMatch=path.match(/^\/api\/app\/(products|orders)$/);
      if(appMatch && method==='GET') return json(res,200,{data:c.appData(req.headers.authorization?.replace(/^Bearer /,''),appMatch[1])});
      if(path.startsWith('/api/')) {
        const token=cookie(req), actor=c.actor(token);
        fail(actor,401,'Sign in to continue');
        if(unsafe) fail(req.headers['x-csrf-token'] === actor.csrf,403,'Refresh the page and try again');
        if(path==='/api/session' && method==='GET') return json(res,200,{user:{id:actor.id,name:actor.name,email:actor.email,kind:actor.kind},csrf:actor.csrf,stores:c.stores(actor)});
        if(path==='/api/logout' && method==='POST') {
          c.logout(token);res.setHeader('Set-Cookie','ind_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
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
          if(resource==='products') {
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
            if(method==='GET') return json(res,200,c.themeState(actor,storeId));
            if(method==='PUT' && !item) return json(res,200,c.saveTheme(actor,storeId,await body(req)));
            if(method==='POST' && item==='publish') return json(res,200,c.publishTheme(actor,storeId,await body(req)));
          }
          if(resource==='preview' && method==='GET') {
            const s=c.access(actor,storeId,'themes');
            return json(res,200,{id:s.id,name:s.name,slug:s.slug,mode:s.mode,theme:JSON.parse(s.draft),products:c.products(actor,storeId).filter(p=>p.active),preview:true});
          }
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
      const asset=assets.get(path) ?? (/^\/s\/[a-z0-9-]+$/.test(path) || path==='/admin' ? assets.get('/') : null);
      fail(asset,404,'Page not found');
      res.writeHead(200,{'Content-Type':asset[0]});
      res.end(method==='HEAD'?undefined:readFileSync(asset[1]));
    } catch(error) {
      if(!res.headersSent) json(res,error.status || 500,{error:error.status ? error.message : 'Unexpected server error'});
      else res.end();
      if(!error.status) console.error('[IND Commerce] Request failed:',error.code || error.name);
    }
  });
  server.headersTimeout=10000; server.requestTimeout=15000; server.maxHeadersCount=50;
  return {server,commerce:c};
}

if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const demo=process.argv.includes('--demo');
  const port=Number(process.env.PORT || 4310);
  fail(Number.isInteger(port) && port>0 && port<65536,400,'Invalid PORT');
  const filename=resolve(process.env.COMMERCE_DB || (demo?'data/demo.db':'data/commerce.db'));
  const {server}=createCommerceServer({commerce:new Commerce(filename),demo,aiModel:process.env.COMMERCE_AI_MODEL});
  server.on('error',error=>{ console.error('Could not start IND Commerce: '+error.code);process.exitCode=1; });
  server.listen(port,'127.0.0.1',()=>console.log('IND Commerce: http://127.0.0.1:'+port+'\nLocal '+(demo?'fictional demo':'pilot')+' only. No live payments, courier bookings or billing charges.'));
  for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.close(()=>process.exit(0)));
}
