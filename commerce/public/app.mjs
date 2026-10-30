import { e, money, date, label, icon, badge, btn, art } from './shared.mjs';
import { connectionsPage,leadsPage,connectionAction,connectionForm } from './connections.mjs';
import { liquidEditor,themeConfiguration,renderThemePreview,themeAction,themeFileForm,importTheme } from './theme-editor.mjs';
import { onlineCheckout,paymentAction,paymentStatusModal } from './payment-checkout.mjs';
const app=document.getElementById('app'), dialog=document.getElementById('dialog');
const state={config:null,session:null,storeId:null,data:null,page:'overview',extra:null,range:30,cart:[],shop:null,checkoutKey:null};
const pageTitles={connections:'Domains & payments',leads:'Pilot requests',overview:'Overview',orders:'Orders',products:'Products',inventory:'Inventory',customers:'Customers',reports:'Analytics',themes:'Online store',apps:'Apps & plugins',automation:'Automations & AI',developer:'Developer console',settings:'Settings',support:'Help & support',audit:'Activity log',partner:'Partner workspace'};
const permitted={connections:'settings',orders:'orders',products:'catalog',inventory:'catalog',customers:'orders',reports:'orders',themes:'themes',apps:'apps',automation:'catalog',developer:'apps',settings:'settings',support:'support',audit:'access'};
let navigation=0;
function toast(message,bad=false) {
  const el=document.createElement('div');el.className='toast'+(bad?' bad':'');el.textContent=message;
  document.getElementById('toasts').append(el);setTimeout(()=>el.remove(),5000);
}
async function api(path,method='GET',input,extra={}) {
  const response=await fetch(path,{method,credentials:'same-origin',headers:{'Content-Type':'application/json',...(state.session?.csrf?{'X-CSRF-Token':state.session.csrf}:{}),...extra},...(input===undefined?{}:{body:JSON.stringify(input)})});
  const result=await response.json();
  if(!response.ok) throw Object.assign(new Error(result.error || 'Request failed'),{status:response.status,receipt:result.receipt});
  return result;
}
const storePath=(suffix='')=>'/api/stores/'+state.storeId+suffix;
const brand=()=>'<div class="brand"><span class="brand-mark">in</span><div>IND<small>COMMERCE</small></div></div>';
const empty=(title,message,button='')=>'<div class="empty">'+icon('products',30)+'<h2>'+e(title)+'</h2><p>'+e(message)+'</p>'+button+'</div>';
function modal(title,html) {
  dialog.innerHTML='<div class="modal-head"><h2>'+e(title)+'</h2>'+btn('close',icon('close'),'icon-only','aria-label="Close dialog"')+'</div><div class="modal-body">'+html+'<div class="error" role="alert"></div></div>';
  if(!dialog.open) dialog.showModal();
}
function closeModal() { dialog.close();dialog.innerHTML=''; }
const field=(name,title,value='',type='text',attrs='')=>'<label class="field">'+e(title)+'<input name="'+e(name)+'" type="'+type+'" value="'+e(value)+'" '+attrs+'></label>';
const area=(name,title,value='',attrs='')=>'<label class="field">'+e(title)+'<textarea name="'+e(name)+'" '+attrs+'>'+e(value)+'</textarea></label>';
const actions=(title='Save changes')=>'<div class="form-actions">'+btn('close','Cancel')+'<button class="button primary" type="submit">'+e(title)+'</button></div>';
const select=(name,title,options,value)=>'<label class="field">'+e(title)+'<select name="'+e(name)+'">'+options.map(([v,t])=>'<option value="'+e(v)+'"'+(v===value?' selected':'')+'>'+e(t)+'</option>').join('')+'</select></label>';
const filteredOrders=()=>state.data.orders.filter(o=>o.fulfilment!=='cancelled' && Date.now()-new Date(o.created_at)<state.range*86400000);
function chart(orders) {
  const days=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return {key:d.toLocaleDateString('en-CA'),title:d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}),amount:0};});
  for(const o of orders) { const d=days.find(d=>new Date(o.created_at).toLocaleDateString('en-CA')===d.key);if(d) d.amount+=o.total; }
  const max=Math.max(1,...days.map(d=>d.amount));
  return '<div class="chart" role="img" aria-label="'+e('Order value in the last seven days. '+days.map(d=>d.title+': '+money(d.amount)).join('; '))+'">'+days.map(d=>'<div class="chart-col" title="'+e(d.title+': '+money(d.amount))+'"><div class="chart-bar" style="height:'+Math.max(1,d.amount/max*94)+'%"></div><span class="chart-label">'+e(d.title)+'</span></div>').join('')+'</div><p class="chart-legend"><i></i> Order value · includes uncollected COD · last 7 days</p>';
}
function orderTable(orders,compact=false) {
  if(!orders.length) return empty('No orders yet','Open your storefront and place a sample COD order.',btn('visit-store','Open storefront'));
  return '<div class="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Payment</th><th>Fulfilment</th><th>Total</th>'+(compact?'':'<th></th>')+'</tr></thead><tbody>'+orders.map(o=>'<tr data-search="'+e(o.number+' '+o.customer+' '+o.email)+'"><td><button class="button quiet" data-action="order" data-id="'+e(o.id)+'">'+e(o.number)+'</button><p class="muted tiny">'+date(o.created_at)+'</p></td><td><strong>'+e(o.customer)+'</strong></td><td>'+badge(o.payment==='paid'?(o.method==='cod'?'COD collected':'Paid online'):(o.method==='cod'?'COD unpaid':'Awaiting capture'),o.payment==='paid'?'good':'warm')+'</td><td>'+badge(label(o.fulfilment),o.fulfilment==='delivered'?'good':'neutral')+'</td><td><strong>'+money(o.total)+'</strong></td>'+(compact?'':'<td>'+btn('order',icon('arrow'),'icon-only','data-id="'+e(o.id)+'" aria-label="Open order '+e(o.number)+'"')+'</td>')+'</tr>').join('')+'</tbody></table></div>';
}
function overview() {
  const d=state.data; if(!d.permissions.orders) return '<section class="panel panel-pad stack"><h2>Your scoped store workspace</h2><p class="muted small">Your '+e(d.store.role)+' role controls which store tools and records you can use.</p><div class="row wrap">'+(d.permissions.catalog?btn('nav','Manage products','primary','data-page="products"'):'')+(d.permissions.themes?btn('nav','Edit store theme','','data-page="themes"'):'')+(d.permissions.support?btn('nav','Get support','','data-page="support"'):'')+'</div><p class="tiny muted">Order, customer and collection figures are available only to roles with order access.</p></section>'; const orders=filteredOrders(),paid=orders.filter(o=>o.payment==='paid'),sum=rows=>rows.reduce((n,o)=>n+o.total,0),low=d.products.filter(p=>p.stock<=5),tasks=d.tasks.filter(t=>!t.done);
  const metric=(title,value,foot,ic)=>'<div class="metric"><div class="metric-label">'+e(title)+icon(ic,15)+'</div><div class="metric-value">'+value+'</div><div class="metric-foot">'+foot+'</div></div>';
  return '<div class="metrics">'+metric('Collected sales',money(sum(paid)),'Verified captures and recorded COD','chart')+metric('Orders',orders.length,'Excludes cancelled orders','orders')+metric('Average order value',money(orders.length?Math.round(sum(orders)/orders.length):0),'Based on placed order value','products')+metric('Low-stock products',low.length,'Five units or fewer · current stock','inventory')+'</div>'+
    '<div class="grid-main"><div class="stack"><section class="panel"><div class="panel-head"><div><h2>Your store, at a glance</h2><p>Last 7 days · Indian rupees</p></div>'+badge('Order value','outline')+'</div><div class="panel-body"><div class="chart-value">'+money(sum(d.orders.filter(o=>o.fulfilment!=='cancelled'&&Date.now()-new Date(o.created_at)<7*86400000)))+'</div>'+chart(d.orders.filter(o=>o.fulfilment!=='cancelled'))+'</div></section><section class="panel"><div class="panel-head"><div><h2>Recent orders</h2><p>Keep every delivery moving.</p></div>'+btn('nav','View all '+icon('arrow',14),'quiet','data-page="orders"')+'</div>'+orderTable(d.orders.slice(0,5),true)+'</section><section class="panel panel-pad"><div class="between"><h2>Needs your attention</h2>'+badge(tasks.length+' tasks','warm')+'</div>'+(tasks.length?tasks.slice(0,4).map(t=>'<div class="todo">'+btn('complete-task',icon('check',12),'circle','data-id="'+e(t.id)+'" aria-label="Complete '+e(t.title)+'"')+'<div><strong>'+e(t.title)+'</strong><p>'+e(t.detail)+'</p></div></div>').join(''):'<div class="empty small">You’re all caught up.</div>')+'</section></div>'+
    '<aside class="stack"><section class="panel panel-pad"><h2>Quick actions</h2>'+[['product-new','Add a product','Grow your catalog','products'],['visit-store','View your store','See the customer experience','globe'],['nav','Customize your theme','Make it feel like your brand','themes'],['export','Export store data','Keep a portable copy','shield']].filter(([action])=>action!=='export'||d.permissions.export).map(([action,title,sub,ic])=>'<div class="quick"><div class="quick-icon">'+icon(ic,17)+'</div><div><strong>'+title+'</strong><p>'+sub+'</p></div>'+btn(action,icon('arrow',14),'quiet','aria-label="'+title+'"'+(action==='nav'?' data-page="themes"':''))+'</div>').join('')+'</section>'+
    '<section class="callout"><p class="kicker">YOUR STORE. YOUR WAY.</p><h2>A little less busywork.<br>A lot more possibility.</h2><p>Let small automations handle the repetitive parts. Keep every important decision in your hands.</p>'+btn('nav','Explore automations '+icon('arrow',14),'','data-page="automation"')+'<div class="orb"></div></section><section class="panel panel-pad"><div class="row">'+icon('shield',20)+'<h2>Built around ownership</h2></div><p class="muted small spaced">Scoped partner access, revocable app tokens, theme history and portable store data.</p>'+btn('nav','Review store access '+icon('arrow',14),'quiet spaced','data-page="settings"')+'</section></aside></div>';
}
function productsPage(inventory=false) {
  const rows=state.data.products;
  return '<section class="panel"><div class="panel-head"><div><h2>'+ (inventory?'Stock on hand':'Your catalog')+'</h2><p>'+rows.length+' products · prices include the configured tax</p></div>'+btn(inventory?'ledger':'product-new',inventory?'View stock ledger':icon('plus',14)+' Add product')+'</div>'+
    (rows.length?'<div class="table-wrap"><table><thead><tr><th>Product</th><th>SKU</th><th>'+(inventory?'Stock':'Price')+'</th><th>'+(inventory?'Status':'Inventory')+'</th><th></th></tr></thead><tbody>'+rows.map(p=>'<tr data-search="'+e(p.name+' '+p.sku+' '+p.category)+'"><td><div class="table-name"><div class="mini-art">'+art(p)+'</div><div><strong>'+e(p.name)+'</strong><p class="tiny muted">'+e(p.category)+' · '+(p.active?'Visible':'Hidden')+'</p></div></div></td><td class="mono">'+e(p.sku)+'</td><td><strong>'+(inventory?p.stock+' units':money(p.price))+'</strong></td><td>'+badge(inventory?(p.stock===0?'Out of stock':p.stock<=5?'Low stock':'In stock'):p.stock+' available',p.stock<=5?'warm':'good')+'</td><td>'+btn(inventory?'stock':'product-edit',inventory?'Adjust stock':'Edit','','data-id="'+e(p.id)+'"')+'</td></tr>').join('')+'</tbody></table></div>':empty('A fresh start for your catalog','Add your first product to start building your store.',btn('product-new','Add your first product','primary')))+'</section>';
}
function customersPage() {
  const groups=new Map();
  for(const o of state.data.orders) { const c=groups.get(o.email)||{name:o.customer,email:o.email,orders:0,total:0};c.orders++;if(o.fulfilment!=='cancelled')c.total+=o.total;groups.set(o.email,c); }
  return '<section class="panel"><div class="panel-head"><h2>Customers from your orders</h2>'+badge(groups.size+' customers')+'</div>'+(groups.size?'<div class="table-wrap"><table><thead><tr><th>Customer</th><th>Email</th><th>Orders</th><th>Order value</th></tr></thead><tbody>'+[...groups.values()].map(c=>'<tr data-search="'+e(c.name+' '+c.email)+'"><td><strong>'+e(c.name)+'</strong></td><td>'+e(c.email)+'</td><td>'+c.orders+'</td><td>'+money(c.total)+'</td></tr>').join('')+'</tbody></table></div>':empty('No customers yet','Customers appear after they place an order.'))+'</section><div class="notice spaced">Contact information is collected for order fulfilment. Marketing consent and customer messaging integrations are not enabled in this pilot.</div>';
}
function reportsPage() {
  const rows=filteredOrders(),total=rows.reduce((n,o)=>n+o.total,0),paid=rows.filter(o=>o.payment==='paid').reduce((n,o)=>n+o.total,0);
  return '<div class="grid-main"><section class="panel panel-pad"><div class="between"><h2>Order value</h2>'+badge('Last 7 days')+'</div>'+chart(state.data.orders.filter(o=>o.fulfilment!=='cancelled'))+'</section><section class="panel panel-pad stack"><h2>Collection reconciliation</h2><div class="between small"><span class="muted">Placed order value</span><strong>'+money(total)+'</strong></div><div class="between small"><span class="muted">Payments confirmed</span><strong>'+money(paid)+'</strong></div><div class="between small"><span class="muted">Still to collect</span><strong>'+money(total-paid)+'</strong></div><p class="tiny muted">Selected period. COD collection is merchant-entered. Online payment is confirmed through the configured gateway; bank settlement reconciliation is not connected.</p></section></div><section class="panel spaced"><div class="panel-head"><h2>Orders in the selected period</h2>'+btn('export','Export store data')+'</div>'+orderTable(rows)+'</section>';
}
function shopMarkup(s,mini=false) {
  const theme=s.theme,products=s.products;
  return '<div class="shop '+e(theme.template)+(mini?' mini-shop':'')+'" style="--accent:'+e(theme.accent)+'">'+(theme.announcement?'<div class="shop-announcement">'+e(theme.announcement)+'</div>':'')+
    '<div class="shop-nav"><span class="shop-brand">'+e(s.name)+'</span><div class="shop-links"><a href="#collection">Shop all</a><a href="#collection">Everyday essentials</a></div>'+(mini?icon('orders',17):btn('cart','Bag ('+state.cart.reduce((n,l)=>n+l.quantity,0)+') '+icon('orders',16)))+'</div>'+
    '<section class="shop-hero"><div><p class="kicker">CONSIDERED GOODS. EVERYDAY JOY.</p><h1>'+e(theme.title)+'</h1><p>'+e(theme.subtitle)+'</p>'+(mini?'<span class="button">Explore the collection '+icon('arrow',14)+'</span>':'<a class="button" href="#collection">Explore the collection '+icon('arrow',14)+'</a>')+'</div><div class="hero-art">'+products.slice(0,2).map(p=>art(p)).join('')+'</div></section>'+
    '<section class="shop-collection" id="collection"><div class="between"><h2>Good things for everyday living.</h2><p>Simple. Useful. Made to stay.</p></div><div class="shop-grid">'+products.slice(0,mini?3:500).map(p=>'<article class="shop-card">'+art(p)+'<h3>'+e(p.name)+'</h3><p>'+money(p.price)+' · tax included</p>'+(mini?'':btn('add-cart',p.stock?'Add to bag '+icon('plus',13):'Sold out','','data-id="'+e(p.id)+'"'+(!p.stock?' disabled':'')))+'</article>').join('')+'</div>'+(!products.length?empty('Our next chapter is coming soon','New products will appear here when the merchant publishes them.'):'')+'</section>'+
    (!mini?'<footer class="shop-footer"><span>© '+new Date().getFullYear()+' '+e(s.name)+'</span><span>Powered by IND Commerce · Pilot storefront</span></footer>':'')+'</div>';
}
function themesPage() {
  const t=state.extra;if(!t)return '<div class="loading">Loading theme editor…</div>';
  return '<div class="theme-workbench"><section class="panel theme-form"><h2>Make it yours</h2><p class="muted tiny spaced">Edit a draft, render a preview, then publish.</p><form id="theme-settings" data-form="theme">'+select('renderer','Renderer',[['builtin','Built-in theme'],['liquid','Custom Liquid code']],t.draft.renderer||'builtin')+select('template','Visual direction',[['market','Market · retail'],['atelier','Atelier · editorial'],['circuit','Circuit · modern']],t.draft.template)+field('accent','Brand colour',t.draft.accent,'color')+field('title','Headline',t.draft.title,'text','required maxlength="100"')+area('subtitle','Subheading',t.draft.subtitle,'maxlength="200"')+field('announcement','Announcement',t.draft.announcement,'text','maxlength="160"')+'<div class="form-actions"><button class="button" type="submit">Save draft</button>'+btn('theme-preview','Preview')+btn('theme-publish','Publish','primary')+'</div></form></section><section class="theme-preview"><div class="preview-bar"><i></i><i></i><i></i><span>Draft preview · revision '+t.revision+' published</span></div><div id="theme-live">'+(t.draft.renderer==='liquid'?'<p class="notice">Rendering isolated preview…</p>':shopMarkup({name:state.data.store.name,products:state.data.products.filter(p=>p.active),theme:t.draft},true))+'</div></section></div>'+liquidEditor(state)+'<section class="panel spaced"><div class="panel-head"><h2>Version history</h2>'+badge('Publish & rollback','good')+'</div><div class="table-wrap"><table><thead><tr><th>Revision</th><th>Renderer</th><th>Published</th><th></th></tr></thead><tbody>'+t.versions.map(v=>'<tr><td><strong>Revision '+v.revision+'</strong></td><td>'+e(v.config.renderer||'builtin')+' · '+e(v.config.template)+'</td><td>'+date(v.created_at)+'</td><td>'+(v.revision===t.revision?badge('Current','good'):btn('theme-rollback','Restore','','data-revision="'+v.revision+'"'))+'</td></tr>').join('')+'</tbody></table></div></section>';
}

function appsPage() {
  return '<div class="notice">First-party plugins run inside the commerce core. Review the declared permissions before installing. Unrestricted third-party code execution is not enabled.</div><div class="cards spaced">'+(state.extra||[]).map(p=>'<article class="card"><div class="between"><div class="app-icon">'+icon(p.id==='stock-watch'?'inventory':p.id==='cod-guard'?'shield':'orders',23)+'</div>'+badge(p.installed?'Installed':'First party',p.installed?'good':'neutral')+'</div><h2>'+e(p.name)+'</h2><p>'+e(p.description)+'</p><div class="scopes">'+p.scopes.map(s=>badge(s,'outline')).join('')+'</div><div class="card-bottom"><span class="tiny muted">v'+e(p.version)+' · '+e(p.category)+'</span>'+btn(p.installed?'plugin-remove':'plugin-review',p.installed?'Uninstall':'Review & install',p.installed?'':'primary','data-id="'+e(p.id)+'"')+'</div></article>').join('')+'</div>';
}
function automationPage() {
  const low=state.data.products.filter(p=>p.stock<=5),tasks=state.data.tasks.filter(t=>!t.done);
  return '<div class="grid-main"><div class="stack"><section class="panel panel-pad"><div class="between"><div><p class="kicker">YOUR OPERATIONS ASSISTANT</p><h2 class="spaced">Less repetition. More control.</h2></div>'+icon('automation',27)+'</div><p class="muted small spaced">Stock watch and packing notes create review tasks when orders arrive. Nothing sends messages, spends money or changes prices automatically.</p><div class="row spaced">'+btn('nav','Manage automation plugins '+icon('arrow',14),'primary','data-page="apps"')+'</div></section><section class="panel panel-pad"><div class="between"><h2>AI draft studio</h2>'+badge(state.config.ai?'Local model configured':'Not connected',state.config.ai?'good':'neutral')+'</div><p class="small muted spaced">Ask for product copy or stock-planning suggestions. Only product names, categories and stock counts are shared with the configured local Ollama model. Drafts never apply changes.</p>'+(state.config.ai?'<form data-form="assistant" class="spaced">'+area('prompt','What would you like to draft?','','required maxlength="1000" placeholder="Draft a short collection introduction for our everyday essentials."')+'<div class="form-actions"><button type="submit" class="button primary">Generate draft</button></div></form><div id="ai-result" aria-live="polite"></div>':'<div class="notice spaced">To enable real AI drafts, run Ollama locally and set COMMERCE_AI_MODEL to an installed model before starting the server. No AI-generated results are shown while disconnected.</div>')+'</section></div><aside class="stack"><section class="panel panel-pad"><h2>Current signals</h2><div class="quick"><div class="quick-icon">'+icon('inventory',17)+'</div><div><strong>'+low.length+' low-stock products</strong><p>Five units or fewer</p></div></div><div class="quick"><div class="quick-icon">'+icon('check',17)+'</div><div><strong>'+tasks.length+' open tasks</strong><p>Waiting for your review</p></div></div></section><section class="notice">These counts come directly from your store records. No growth estimates or automated business decisions are generated.</section></aside></div>';
}
function developerPage() {
  const data=state.extra||{apps:[],events:[]};
  return '<div class="notice">Private app tokens belong to one store and can only read the scopes you approve. Tokens are shown once and stored as hashes. Customer contact fields are excluded from the app order API.</div><section class="panel spaced"><div class="panel-head"><div><h2>Private apps</h2><p>Your integrations. Your permissions.</p></div>'+btn('app-new',icon('plus',14)+' Create private app','primary')+'</div>'+(data.apps.length?'<div class="table-wrap"><table><thead><tr><th>App</th><th>Scopes</th><th>Created</th><th></th></tr></thead><tbody>'+data.apps.map(a=>'<tr><td><strong>'+e(a.name)+'</strong></td><td>'+a.scopes.map(s=>badge(s,'outline')).join(' ')+'</td><td>'+date(a.created_at)+'</td><td>'+(a.revoked?badge('Revoked'):btn('app-revoke','Revoke access','danger','data-id="'+e(a.id)+'"'))+'</td></tr>').join('')+'</tbody></table></div>':empty('Build your first integration','Create a scoped token for catalog or order data.'))+'</section><div class="form-grid spaced"><section class="panel panel-pad stack"><h2>API quick start</h2><p class="small muted">Send a bearer token from a server-side integration. The token determines the store; a caller cannot switch tenants with a query parameter.</p><code class="token">GET /api/app/products<br>Authorization: Bearer YOUR_TOKEN<br><br>GET /api/app/orders<br>Authorization: Bearer YOUR_TOKEN</code><p class="tiny muted">Read-only pilot API. No arbitrary app code or external webhook deliveries run here.</p></section><section class="panel panel-pad"><h2>Recorded order events</h2><p class="muted tiny spaced">A durable local outbox. External delivery and retries are a later integration.</p>'+(data.events.length?data.events.slice(0,6).map(ev=>'<div class="activity"><div class="quick-icon">'+icon('automation',15)+'</div><div><strong>'+e(ev.topic)+'</strong><p class="mono">'+e(ev.payload.order_id)+'</p><time>'+date(ev.created_at)+'</time></div></div>').join(''):empty('No events yet','Order-created events appear after checkout.'))+'</section></div>';
}
function supportPage(global=false) {
  const tickets=global?(state.extra||[]):state.data.tickets;
  return '<div class="grid-main"><section class="panel"><div class="panel-head"><div><h2>'+ (global?'Support inbox':'Your support requests')+'</h2><p>Clear ownership. A visible response history.</p></div>'+(!global?btn('ticket-new',icon('plus',14)+' New request','primary'):'')+'</div>'+(tickets.length?tickets.map(t=>'<div class="panel-pad" style="border-top:1px solid var(--line)"><div class="between"><div><h3>'+e(t.subject)+'</h3><p class="tiny muted">'+e(global?t.store_name:'Created '+date(t.created_at))+'</p></div><div class="row">'+badge(label(t.priority),t.priority==='urgent'?'warm':'neutral')+badge(label(t.status),t.status==='resolved'?'good':'neutral')+'</div></div><p class="small muted spaced">'+e(t.body)+'</p>'+(t.response?'<div class="notice spaced"><strong>Support response</strong><p class="small">'+e(t.response)+'</p></div>':'')+(global?btn('ticket-respond','Reply & update status','','data-id="'+e(t.id)+'"'):'')+'</div>').join(''):empty('No support requests','Create a ticket when you need a hand.'))+'</section><aside class="stack"><section class="panel panel-pad stack"><div class="app-icon">'+icon('support',23)+'</div><h2>Help that stays connected.</h2><p class="small muted">Keep the issue, response and resolution together. Support staff can read tickets; store data access requires an explicit merchant grant.</p><div class="notice warning">Local pilot: no live support team or response-time guarantee is connected.</div></section></aside></div>';
}
function auditPage() {
  return '<section class="panel"><div class="panel-head"><h2>Store activity</h2>'+badge('Latest 100 records')+'</div><div class="panel-body">'+state.data.audit.map(a=>'<div class="activity"><div class="quick-icon">'+icon('shield',15)+'</div><div><strong>'+e(a.action)+'</strong><p>'+e(a.detail)+'</p><time>'+e(a.created_at.replace('T',' ').slice(0,19))+' · '+e(a.actor)+'</time></div></div>').join('')+'</div></section>';
}
function settingsPage() {
  const d=state.data,s=d.store;
  return '<div class="form-grid"><section class="panel panel-pad"><h2>Store details</h2><form data-form="settings" class="stack spaced">'+field('name','Store name',s.name,'text','required maxlength="100"')+field('slug','Store address',s.slug,'text','disabled')+select('mode','Store availability',[['development','Development · storefront closed'],['demo','Demo · fictional data'],['active','Open storefront · COD only']],s.mode)+select('plan','Draft subscription plan',state.config.plans.map(p=>[p.id,p.name+' · ₹'+p.price.toLocaleString('en-IN')+'/month (proposal)']),s.plan)+'<p class="tiny muted">No billing subscription or charge is created. This is a pricing configuration preview.</p><button class="button primary" type="submit">Save details</button></form></section><section class="panel panel-pad"><div class="between"><h2>Store access</h2>'+btn('member-new','Grant access')+'</div><p class="tiny muted spaced">Existing accounts only. Collaborators can edit products and themes; they cannot read orders or customer contacts.</p><div class="spaced">'+(state.extra||[]).map(m=>'<div class="quick"><div class="avatar">'+e(m.name.slice(0,2).toUpperCase())+'</div><div><strong>'+e(m.name)+'</strong><p>'+e(m.email)+'</p></div><div style="margin-left:auto">'+(m.role==='owner'?badge('Owner','good'):btn('member-revoke','Revoke '+e(m.role),'quiet danger','data-id="'+e(m.id)+'"'))+'</div></div>').join('')+'</div></section></div><div class="between spaced"><h2>Proposed plans</h2>'+badge('Pricing hypotheses · not live billing','warm')+'</div><div class="cards spaced">'+state.config.plans.map(p=>'<section class="card '+(p.id===s.plan?'selected':'')+'"><span class="kicker">'+e(p.name)+'</span><div class="card-price">₹'+p.price.toLocaleString('en-IN')+'<span class="tiny muted"> /month</span></div><p>Proposed subscription · no platform GMV fee</p><ul><li>'+p.products.toLocaleString('en-IN')+' product capacity</li><li>'+p.staff+' staff · '+p.locations+' locations (planned)</li><li>Core security and data export</li></ul><p class="tiny">Gateway, courier, messaging, tax and other usage charges would be separate. Billing, multi-location and staff-count metering are not implemented.</p></section>').join('')+'</div>';
}
function partnerPage() {
  const stores=state.extra||[],own=stores.filter(s=>!s.transferred),handed=stores.filter(s=>s.transferred);
  return '<div class="metrics">'+[['Development stores',own.length],['Handed over',handed.length],['Client stores accessible',state.session.stores.filter(s=>s.role!=='owner').length],['Payouts','Not connected']].map(([title,value])=>'<div class="metric"><div class="metric-label">'+title+'</div><div class="metric-value">'+value+'</div><div class="metric-foot">Your partner organization</div></div>').join('')+'</div><section class="panel"><div class="panel-head"><div><h2>Build the next great store</h2><p>Start in development. Hand ownership to the merchant.</p></div>'+btn('partner-new',icon('plus',14)+' Create development store','primary')+'</div>'+(stores.length?'<div class="table-wrap"><table><thead><tr><th>Store</th><th>Address</th><th>Status</th><th>Access</th><th></th></tr></thead><tbody>'+stores.map(s=>'<tr data-search="'+e(s.name+' '+s.slug)+'"><td><strong>'+e(s.name)+'</strong><p class="tiny muted">Created '+date(s.created_at)+'</p></td><td>'+e(s.slug)+'</td><td>'+badge(s.transferred?'Handed over':'Development',s.transferred?'good':'warm')+'</td><td>'+e(s.role?label(s.role):'Revoked after transfer')+'</td><td><div class="row">'+(s.role?btn('store-open','Open','','data-id="'+e(s.id)+'"'):'')+(!s.transferred?btn('handover','Hand over','','data-id="'+e(s.id)+'"'):'')+'</div></td></tr>').join('')+'</tbody></table></div>':empty('Your next project starts here','Create a development store for your client.'))+'</section><div class="form-grid spaced"><section class="callout"><p class="kicker">PARTNERS, WITH PURPOSE</p><h2>Build together.<br>Keep ownership clear.</h2><p>Handover revokes agency access and all existing private app tokens. The merchant decides who gets access next.</p></section><section class="panel panel-pad stack"><h2>Partner program preview</h2><p class="small muted">The research proposes 20% of collected net SaaS subscription for the first 12 paid months. Referral attribution, tax documents, billing and payouts are not implemented.</p><div class="notice">No commission balance or earnings are fabricated in this workspace. Commercial terms still need validation.</div></section></div>';
}
function shell(content) {
  const s=state.data?.store,user=state.session.user,perms=state.data?.permissions||{};
  const nav=(page,title,ic,count='')=>'<a href="#'+page+'" class="nav-item '+(state.page===page?'active':'')+'">'+icon(ic)+'<span>'+title+'</span>'+(count?'<span class="count">'+count+'</span>':'')+'</a>';
  const allowed=(page)=>!permitted[page]||perms[permitted[page]];
  let navigationHtml='';
  if(user.kind==='partner') navigationHtml+=nav('partner','Partner workspace','partner')+'<div class="nav-section">CLIENT STORE</div>';
  if(user.kind==='support') navigationHtml+=nav('support','Support inbox','support')+nav('leads','Pilot requests','customers');
  else if(s) navigationHtml+=[['overview','Overview','home'],['orders','Orders','orders',state.data.orders.filter(o=>o.fulfilment==='unfulfilled').length],['products','Products','products'],['inventory','Inventory','inventory'],['customers','Customers','customers'],['reports','Analytics','chart']].filter(([p])=>allowed(p)).map(a=>nav(...a)).join('')+'<div class="nav-section">GROW YOUR STORE</div>'+[['themes','Online store','themes'],['apps','Apps & plugins','apps'],['automation','Automations & AI','automation'],['developer','Developer console','developer'],['connections','Domains & payments','globe']].filter(([p])=>allowed(p)).map(a=>nav(...a)).join('');
  return '<aside class="sidebar">'+brand()+(user.kind!=='support'?'<div class="store-switch"><div class="initial">'+icon('globe',17)+'</div><select id="store-select" aria-label="Select store"><option value="">'+(user.kind==='partner'?'Partner workspace':'Choose a store')+'</option>'+state.session.stores.map(x=>'<option value="'+e(x.id)+'"'+(s?.id===x.id&&state.page!=='partner'?' selected':'')+'>'+e(x.name)+'</option>').join('')+'</select></div>':'')+'<nav>'+navigationHtml+'</nav><div class="sidebar-foot">'+(s&&allowed('settings')?nav('settings','Settings','settings'):'')+(s&&allowed('audit')?nav('audit','Activity log','shield'):'')+(user.kind!=='support'&&s&&allowed('support')?nav('support','Help & support','support'):'')+'<div class="pilot-note"><strong class="tiny">'+icon('shield',12)+' Local pilot</strong><p>Independent technology.<br>Built for what comes next.</p></div></div></aside><div class="main-wrap"><header class="topbar"><div class="row">'+btn('menu',icon('menu'),'mobile-menu icon-only','aria-label="Toggle navigation"')+'<div class="breadcrumb">Workspace <span>/</span><strong>'+e(pageTitles[state.page])+'</strong></div></div><div class="top-actions"><label class="search">'+icon('search',15)+'<input id="global-search" placeholder="Find a product or order…" aria-label="Filter this page"></label>'+badge(state.config.demo?'Demo workspace':'Local pilot','outline')+'<div class="row top-user"><div class="avatar">'+e(user.name.split(' ').map(n=>n[0]).slice(0,2).join(''))+'</div><span class="tiny">'+e(user.name)+'</span></div>'+btn('logout',icon('logout',16),'icon-only','aria-label="Sign out"')+'</div></header><main id="main" class="content"><div class="page-head between"><div><p class="kicker">'+e(state.page==='partner'?'BUILD WITH IND':user.kind==='support'?'IND SUPPORT':s?.name||'YOUR WORKSPACE')+'</p><h1 style="margin-top:9px">'+e(state.page==='overview'?'Good to see you, '+user.name.split(' ')[0]+'.':pageTitles[state.page])+'</h1><p>'+e(state.page==='overview'?'Here’s what’s happening with your store.':'Everything you need, in one considered workspace.')+'</p></div><div class="row">'+(['overview','orders','reports'].includes(state.page)?'<select id="range" class="button" aria-label="Date range">'+[7,30,90].map(n=>'<option value="'+n+'"'+(state.range===n?' selected':'')+'>Last '+n+' days</option>').join('')+'</select>':'')+(s&&state.page!=='partner'?btn('visit-store','View store '+icon('external',13)): '')+'</div></div>'+(state.config.demo?'<div class="pilot-banner">'+icon('clock',15)+' Fictional demo data · COD orders are local records · no live charges or shipments.'+(user.kind==='partner'?'':btn('demo-switch','Switch demo role','quiet'))+'</div>':'')+content+'</main></div>';
}
function render() {
  if(!state.session) return renderLogin();
  if(state.page==='partner') app.innerHTML=shell(partnerPage());
  else if(state.session.user.kind==='support') app.innerHTML=shell(state.page==='leads'?leadsPage(state.extra||[]):supportPage(true));
  else if(!state.data) app.innerHTML=shell(empty('Welcome to your workspace','A store will appear here after setup or an agency handover.',state.config.demo?btn('demo-switch','Switch demo role'):''));
  else {
    const pages={overview,orders:()=>'<section class="panel"><div class="panel-head"><div><h2>All orders</h2><p>Payment and fulfilment are tracked independently.</p></div>'+badge(state.data.orders.length+' orders')+'</div>'+orderTable(state.data.orders)+'</section>',products:()=>productsPage(),inventory:()=>productsPage(true),customers:customersPage,reports:reportsPage,themes:themesPage,apps:appsPage,automation:automationPage,developer:developerPage,settings:settingsPage,connections:()=>connectionsPage({...state.extra,storeId:state.storeId},state.config),support:()=>supportPage(),audit:auditPage};
    app.innerHTML=shell((pages[state.page]||overview)());
  }
  document.title=pageTitles[state.page]+' · IND Commerce';
  if(state.page==='themes'&&state.extra?.draft.renderer==='liquid')renderThemePreview(extensionContext()).catch(error=>toast(error.message,true));
}
function renderLogin(error='') {
  const sample=[{name:'Everyday canvas tote',category:'Carry',colour:'#c8ae7f'},{name:'Stoneware coffee cup',category:'Home',colour:'#b47758'}];
  app.innerHTML='<main id="main" class="login"><section class="login-story">'+brand()+'<div><p class="kicker">INDEPENDENT COMMERCE. BUILT IN INDIA.</p><h1>A home for your<br>next big thing.</h1><p>Your store, your partners, your possibilities. Bring every part of your business together.</p><div class="art-grid">'+sample.map(p=>art(p)).join('')+'</div></div><p class="tiny">IND Commerce · First release · Local pilot</p></section><section class="login-main"><div class="login-box"><h2>Your business starts here.</h2><p>Sign in to your commerce workspace.</p><form data-form="login">'+field('email','Email address','','email','required autocomplete="username"')+field('password','Password','','password','required autocomplete="current-password" maxlength="256"')+'<button type="submit" class="button primary">Sign in '+icon('arrow',14)+'</button><div class="error" role="alert">'+(error?'<div class="form-error">'+e(error)+'</div>':'')+'</div></form>'+(state.config?.demo?'<div class="divider">EXPLORE A FICTIONAL WORKSPACE</div><div class="demo-buttons">'+[['merchant','Merchant dashboard'],['partner','Partner workspace'],['support','Support inbox'],['client','Receiving merchant']].map(([profile,title])=>btn('demo-login',title,'','data-profile="'+profile+'"')).join('')+'</div><p class="tiny">Demo entry is available only with the explicit --demo server flag. Never enter real customer or payment data.</p>':'<p class="tiny">First time here? Create an account with the setup command in the project README.</p>')+'</div></section></main>';
}
async function refreshSession() { state.session=await api('/api/session'); }
async function loadPage(page=state.page) {
  if(page==='partner'&&state.session.user.kind!=='partner')page='overview';
  if(page==='leads'&&state.session.user.kind!=='support')page='overview';
  const seq=++navigation;state.page=page;state.extra=null;
  if(state.session.user.kind==='support') {
    state.page=page==='leads'?'leads':'support';state.extra=await api(state.page==='leads'?'/api/pilot-requests':'/api/support');if(seq===navigation)render();return;
  }
  if(page==='partner' && state.session.user.kind==='partner') {
    state.extra=await api('/api/partner/stores');if(seq===navigation)render();return;
  }
  if(state.storeId) {
    const data=await api(storePath());if(seq!==navigation)return;state.data=data;
    if(permitted[page]&&!data.permissions[permitted[page]]) state.page='overview';
    const current=state.page;
    if(current==='themes') state.extra=await api(storePath('/theme'));
    else if(current==='apps') state.extra=await api(storePath('/plugins'));
    else if(current==='developer') { const [apps,events]=await Promise.all([api(storePath('/apps')),api(storePath('/events'))]);state.extra={apps,events}; }
    else if(current==='settings') state.extra=await api(storePath('/members'));
    else if(current==='connections'){const [gateway,domains,attempts]=await Promise.all([api(storePath('/gateway')),api(storePath('/domains')),api(storePath('/payments'))]);state.extra={gateway,domains,attempts};}
  }
  if(seq===navigation)render();
}
async function entered() {
  await refreshSession();
  state.storeId=state.session.stores[0]?.id||null;state.data=null;
  state.page=state.session.user.kind==='partner'?'partner':state.session.user.kind==='support'?'support':'overview';
  await loadPage();
}
async function navigate(page) {
  if(!Object.hasOwn(pageTitles,page))return;
  await loadPage(page);window.scrollTo({top:0,behavior:'instant'});
}
async function refresh() {
  await refreshSession();
  if(state.storeId&&!state.session.stores.some(s=>s.id===state.storeId)) {state.storeId=state.session.stores[0]?.id||null;state.data=null;state.page=state.session.user.kind==='partner'?'partner':'overview';}
  await loadPage();
}
function productModal(product) {
  modal(product?'Edit product':'Add a product','<form data-form="'+(product?'product-edit':'product-new')+'" data-id="'+e(product?.id||'')+'"><div class="form-grid">'+field('name','Product name',product?.name||'','text','required maxlength="150"')+field('price','Price in rupees',product?product.price/100:'','number','required min="0.01" max="1000000" step="0.01"')+(product?select('active','Storefront visibility',[['1','Visible'],['0','Hidden']],String(product.active)):field('sku','SKU','','text','required maxlength="60"')+field('category','Category','Essentials','text','required maxlength="60"')+field('stock','Opening stock',0,'number','required min="0" max="1000000" step="1"')+field('tax','Included tax rate (%)',18,'number','required min="0" max="40" step="0.01"')+field('colour','Product illustration colour','#d6e2d5','color')+'<div class="wide">'+area('description','Description','','maxlength="2000"')+'</div>')+'</div>'+actions(product?'Save product':'Add product')+'</form>');
}
function orderModal(orderId) {
  const o=state.data.orders.find(o=>o.id===orderId);if(!o)return;
  const next=(o.method!=='cod'&&o.payment!=='paid')?null:o.fulfilment==='unfulfilled'?'ship':o.fulfilment==='shipped'?'deliver':o.fulfilment==='delivered'&&o.payment==='unpaid'&&o.method==='cod'?'collect':null;
  modal(o.number,'<div class="row">'+badge(label(o.fulfilment),o.fulfilment==='delivered'?'good':'neutral')+badge(o.payment==='paid'?(o.method==='cod'?'COD collected':'Paid online'):(o.method==='cod'?'COD unpaid':'Awaiting capture'),o.payment==='paid'?'good':'warm')+'</div><dl class="details spaced"><div><dt>Customer</dt><dd>'+e(o.customer)+'<br>'+e(o.email)+'<br>'+e(o.phone)+'</dd></div><div><dt>Delivery address</dt><dd>'+e(o.address)+'</dd></div></dl><div class="table-wrap spaced"><table><thead><tr><th>Product</th><th>Qty</th><th>Total</th></tr></thead><tbody>'+o.items.map(l=>'<tr><td><strong>'+e(l.name)+'</strong><p class="tiny">'+e(l.sku)+'</p></td><td>'+l.quantity+'</td><td>'+money(l.total)+'</td></tr>').join('')+'</tbody></table></div><div class="between spaced small"><span>Included configured tax</span><span>'+money(o.tax)+'</span></div><div class="between spaced"><strong>Total</strong><strong>'+money(o.total)+'</strong></div><div class="notice spaced">Local order summary. This is not a certified GST tax invoice. Marking COD collected records a manual confirmation; it does not move funds.</div><div class="form-actions">'+(o.fulfilment==='unfulfilled'&&o.payment==='unpaid'?btn('order-confirm-cancel','Cancel & restock','danger','data-id="'+e(o.id)+'"'):'')+(next?btn('order-action',next==='ship'?'Mark shipped':next==='deliver'?'Mark delivered':'Record COD collected','primary','data-id="'+e(o.id)+'" data-order-action="'+next+'"'):'')+'</div>');
}
function cartModal() {
  if(!state.cart.length)return modal('Your bag',empty('Your bag is waiting','Add something you love from the collection.'));
  const total=state.cart.reduce((n,l)=>n+l.price*l.quantity,0);
  modal('Your bag',state.cart.map(l=>'<div class="cart-line">'+art(l)+'<div><h3>'+e(l.name)+'</h3><p>'+money(l.price)+'</p></div><div class="cart-qty">'+btn('cart-less','−','icon-only','data-id="'+e(l.id)+'" aria-label="Reduce '+e(l.name)+' quantity"')+'<span class="small">'+l.quantity+'</span>'+btn('cart-more','+','icon-only','data-id="'+e(l.id)+'" aria-label="Increase '+e(l.name)+' quantity"')+'</div></div>').join('')+'<div class="between spaced"><strong>Total</strong><strong>'+money(total)+'</strong></div><p class="tiny muted spaced">Tax included. No delivery charge in this local pilot.</p><div class="form-actions">'+btn('checkout-form','Continue to checkout '+icon('arrow',14),'primary')+'</div>');
}
function checkoutModal() {
  if(state.shop.preview)return toast('Checkout is unavailable in a theme preview.',true);
  if(!state.cart.length)return cartModal();
  state.checkoutKey ||= crypto.randomUUID();
  const online=state.shop.payments?.enabled;
  modal('Checkout','<form data-form="checkout"><div class="form-grid">'+field('customer','Full name','','text','required maxlength="120" autocomplete="name"')+field('email','Email address','','email','required maxlength="254" autocomplete="email"')+field('phone','Phone number','','tel','required minlength="10" maxlength="20" autocomplete="tel"')+'<div class="wide">'+area('address','Delivery address','','required minlength="10" maxlength="500" autocomplete="street-address"')+'</div><div class="wide">'+select('method','Payment method',[['cod','Cash on delivery'],...(online?[['razorpay','Online · Razorpay '+state.shop.payments.mode+' mode']]:[])],'cod')+'</div></div><div class="notice spaced"><p class="small">Choose cash on delivery or the merchant’s online checkout, when enabled. '+(state.config.demo?'Use fictional customer data and test payment credentials.':'No courier booking is made by this pilot.')+'</p></div><div class="form-actions"><button type="submit" class="button primary">Continue · '+money(state.cart.reduce((n,l)=>n+l.price*l.quantity,0))+'</button></div></form>');
}

async function shopBoot(slug) {
  state.shop=await api('/api/public/'+slug);
  if(new URLSearchParams(location.search).has('preview')) {
    try { await refreshSession();const s=state.session.stores.find(s=>s.slug===slug);if(s)state.shop=await api('/api/stores/'+s.id+'/preview'); } catch{toast('Sign in to preview a saved theme draft.',true);}
  }
  renderShop();
}
function renderShop() {
  const s=state.shop,preview=s.preview?'<div class="pilot-banner" style="margin:0;border-radius:0">Saved theme draft · checkout disabled · <a href="/admin#themes">Return to editor</a></div>':'';
  if(s.theme.renderer==='liquid') {
    app.innerHTML=preview+'<main id="main"><div class="shop-nav"><span class="shop-brand">'+e(s.name)+'</span>'+btn('cart','Bag ('+state.cart.reduce((n,l)=>n+l.quantity,0)+') '+icon('orders',16))+'</div><iframe id="store-theme-frame" class="liquid-frame" title="Isolated storefront theme" sandbox="allow-scripts"></iframe><footer class="shop-footer">Checkout powered by IND Commerce</footer></main>';
    const frame=document.getElementById('store-theme-frame');
    if(s.preview)api('/api/stores/'+s.id+'/theme/render','POST',{config:s.theme}).then(result=>{if(frame.isConnected)frame.src=result.frame_url;}).catch(error=>toast(error.message,true));
    else frame.src='/api/public/'+s.slug+'/theme-frame';
  } else app.innerHTML=preview+'<main id="main">'+shopMarkup(s)+'</main>';
  document.title=s.name+' · IND Commerce';
}
function extensionContext(){return {state,api,storePath,modal,field,area,select,actions,closeModal,refresh,toast,btn,render,renderShop};}
function addProductToCart(identifier) {
  if(state.shop.preview)return toast('Checkout is disabled in a theme preview.',true);
  const p=state.shop.products.find(p=>p.id===identifier),line=state.cart.find(l=>l.id===identifier);
  if(!p||p.stock<1)return toast('This product is out of stock.',true);
  if(line&&line.quantity>=Math.min(99,p.stock))return toast('You have reached the available quantity.',true);
  if(line)line.quantity++;else state.cart.push({...p,quantity:1});
  state.checkoutKey=null;renderShop();toast('Added to your bag.');
}
window.addEventListener('message',event=>{
  const storeFrame=document.getElementById('store-theme-frame'),previewFrame=document.getElementById('theme-preview-frame');
  const frame=[storeFrame,previewFrame].find(frame=>frame&&event.source===frame.contentWindow);if(!frame||!event.data||typeof event.data!=='object')return;
  if(event.data.type==='ind:height'&&Number.isFinite(event.data.height))frame.style.height=Math.max(350,Math.min(5000,event.data.height))+'px';
  if(frame===storeFrame&&event.data.type==='ind:add'&&typeof event.data.product_id==='string')addProductToCart(event.data.product_id);
});


document.addEventListener('click',async event=>{
  const navLink=event.target.closest('.sidebar a[href^="#"]');
  if(navLink) { event.preventDefault(); const page=navLink.getAttribute('href').slice(1); if(Object.hasOwn(pageTitles,page)) { history.replaceState(null,'','#'+page); navigate(page).catch(error=>toast(error.message,true)); } return; }
  const button=event.target.closest('[data-action]');if(!button)return;
  const action=button.dataset.action,identifier=button.dataset.id;
  try {
    if(await connectionAction(action,button,extensionContext())||await themeAction(action,button,extensionContext())||await paymentAction(action,button,extensionContext()))return;
    if(action==='close')return closeModal();
    if(action==='menu')return document.querySelector('.sidebar')?.classList.toggle('open');
    if(action==='nav')return navigate(button.dataset.page);
    if(action==='logout') {
      await api('/api/logout','POST',{});state.session=null;state.data=null;state.storeId=null;closeModal();renderLogin();return;
    }
    if(action==='demo-login') {
      await api('/api/demo-session','POST',{profile:button.dataset.profile});closeModal();await entered();return;
    }
    if(action==='demo-switch')return modal('Explore a workspace','<div class="stack">'+[['merchant','Merchant dashboard'],['partner','Partner workspace'],['support','Support inbox'],['client','Receiving merchant']].map(([p,t])=>btn('demo-login',t,'','data-profile="'+p+'"')).join('')+'</div>');
    if(action==='product-new')return productModal();
    if(action==='product-edit')return productModal(state.data.products.find(p=>p.id===identifier));
    if(action==='stock') {
      const p=state.data.products.find(p=>p.id===identifier);
      return modal('Adjust stock','<p>'+e(p.name)+' · '+p.stock+' units on hand</p><form data-form="stock" data-id="'+e(p.id)+'" class="spaced"><div class="form-grid">'+field('delta','Change in units','','number','required step="1" min="-1000000" max="1000000" placeholder="e.g. 10 or -2"')+field('reason','Adjustment reason','','text','required maxlength="200"')+'</div>'+actions('Record adjustment')+'</form>');
    }
    if(action==='ledger') {
      const rows=await api(storePath('/ledger'));
      return modal('Stock ledger',rows.length?'<div class="table-wrap"><table><thead><tr><th>Product</th><th>Change</th><th>Reason</th><th>Date</th></tr></thead><tbody>'+rows.map(l=>'<tr><td>'+e(l.name)+'</td><td><strong>'+(l.delta>0?'+':'')+l.delta+'</strong></td><td>'+e(l.reason)+'</td><td>'+date(l.created_at)+'</td></tr>').join('')+'</tbody></table></div>':empty('No stock movements','Opening balances and order deductions will appear here.'));
    }
    if(action==='order')return orderModal(identifier);
    if(action==='order-action') {
      await api(storePath('/orders/'+identifier),'POST',{action:button.dataset.orderAction});
      closeModal();await refresh();toast('Order updated.');return;
    }
    if(action==='order-confirm-cancel')return modal('Cancel this order?','<p>Cancellation will restore this order’s stock once. This is available only before shipment and collection.</p><div class="form-actions">'+btn('close','Keep order')+btn('order-action','Cancel & restock','danger','data-id="'+e(identifier)+'" data-order-action="cancel"')+'</div>');
    if(action==='complete-task') {await api(storePath('/tasks/'+identifier),'POST',{});await refresh();toast('Task completed.');return;}
    if(action==='visit-store') {
      if(state.data.store.mode==='development')return toast('This is a closed development store. Use the theme editor to preview it.',true);
      location.href='/s/'+state.data.store.slug;return;
    }
    if(action==='theme-preview') {
      const form=document.querySelector('[data-form="theme"]');
      if(!form.reportValidity())return;
      await api(storePath('/theme'),'PUT',themeConfiguration(form));
      location.href='/s/'+state.data.store.slug+'?preview=1';return;
    }
    if(action==='theme-publish') {
      const form=document.querySelector('[data-form="theme"]');if(!form.reportValidity())return;
      await api(storePath('/theme'),'PUT',themeConfiguration(form));
      await api(storePath('/theme/publish'),'POST',{revision:state.extra.revision});
      await refresh();toast('Theme published. The previous version is available in history.');return;
    }
    if(action==='theme-rollback') {
      await api(storePath('/theme/publish'),'POST',{revision:state.extra.revision,rollback:Number(button.dataset.revision)});
      await refresh();toast('Theme version restored and published.');return;
    }
    if(action==='plugin-review') {
      const p=state.extra.find(p=>p.id===identifier);
      return modal('Install '+p.name+'?','<p>'+e(p.description)+'</p><h3 class="spaced">Requested permissions</h3><div class="row wrap spaced">'+p.scopes.map(s=>badge(s,'outline')).join('')+'</div><div class="notice spaced">First-party plugin v'+e(p.version)+'. No network calls or external message sending. You can uninstall it at any time.</div><div class="form-actions">'+btn('close','Cancel')+btn('plugin-install','Approve & install','primary','data-id="'+e(p.id)+'"')+'</div>');
    }
    if(action==='plugin-install'||action==='plugin-remove') {
      await api(storePath('/plugins/'+identifier),action==='plugin-install'?'POST':'DELETE',{});
      closeModal();await refresh();toast(action==='plugin-install'?'Plugin installed.':'Plugin uninstalled. Existing review tasks were preserved.');return;
    }
    if(action==='app-new')return modal('Create a private app','<form data-form="app-new">'+field('name','App name','','text','required maxlength="100"')+'<h3 class="spaced">Approve read permissions</h3><div class="stack spaced">'+state.config.app_scopes.map(s=>'<label class="field"><span><input type="checkbox" name="scopes" value="'+e(s)+'"> '+e(s)+'</span></label>').join('')+'</div><p class="tiny muted spaced">Order access excludes contact and address fields. The token will only be shown once.</p>'+actions('Create scoped token')+'</form>');
    if(action==='app-revoke') {await api(storePath('/apps/'+identifier),'DELETE',{});await refresh();toast('App token revoked immediately.');return;}
    if(action==='ticket-new')return modal('How can we help?','<form data-form="ticket-new"><div class="form-grid">'+field('subject','Subject','','text','required maxlength="150"')+select('priority','Priority',[['normal','Normal'],['urgent','Urgent · store operations blocked']],'normal')+'<div class="wide">'+area('body','What happened?','','required maxlength="4000" placeholder="Describe the problem without passwords or payment details."')+'</div></div>'+actions('Create support request')+'</form>');
    if(action==='ticket-respond') {
      const t=state.extra.find(t=>t.id===identifier);
      return modal('Reply to '+t.subject,'<form data-form="ticket-respond" data-id="'+e(t.id)+'" class="stack">'+area('response','Response',t.response,'required maxlength="4000"')+select('status','Ticket status',[['open','Open'],['in_progress','In progress'],['resolved','Resolved']],t.status)+actions('Save response')+'</form>');
    }
    if(action==='member-new')return modal('Grant store access','<form data-form="member-new" class="stack">'+field('email','Existing account email','','email','required maxlength="254"')+select('role','Role',[['collaborator','Collaborator · products, themes, support'],['staff','Staff · products, orders, support'],['admin','Admin · core operations and apps'],['viewer','Viewer · store identity only']],'collaborator')+'<div class="notice">Access is checked on every request. Ownership cannot be granted through this form.</div>'+actions('Grant access')+'</form>');
    if(action==='member-revoke') {await api(storePath('/members/'+identifier),'DELETE',{});await refresh();toast('Store access revoked.');return;}
    if(action==='partner-new')return modal('Create a development store','<form data-form="partner-new" class="stack">'+field('name','Store name','','text','required maxlength="100"')+field('slug','Unique store address','','text','required minlength="3" maxlength="50" pattern="[a-z0-9]+(-[a-z0-9]+)*" placeholder="your-client-store"')+'<div class="notice">The storefront starts closed. Build the catalog and theme before handing ownership to an existing merchant account.</div>'+actions('Create store')+'</form>');
    if(action==='store-open') {state.storeId=identifier;await loadPage('overview');return;}
    if(action==='handover')return modal('Hand over store ownership','<form data-form="handover" data-id="'+e(identifier)+'" class="stack">'+field('email','Receiving merchant account','','email','required placeholder="client@demo.ind.local"')+'<div class="notice warning">This transfers ownership to an existing merchant account, revokes all current memberships and private app tokens, and removes your store access. The receiving merchant can grant you access again.</div>'+field('confirmation','Type TRANSFER to continue','','text','required pattern="TRANSFER"')+actions('Transfer ownership')+'</form>');
    if(action==='export') {
      const a=document.createElement('a');a.href=storePath('/export');a.download='ind-store-export.json';a.click();toast('Preparing your store export.');return;
    }
    if(action==='add-cart')return addProductToCart(identifier);
    if(action==='cart')return cartModal();
    if(action==='cart-less'||action==='cart-more') {
      const line=state.cart.find(l=>l.id===identifier);if(!line)return;
      if(action==='cart-more'&&line.quantity>=Math.min(99,line.stock))return toast('You have reached the available quantity.',true);
      line.quantity+=action==='cart-more'?1:-1;state.cart=state.cart.filter(l=>l.quantity>0);state.checkoutKey=null;renderShop();cartModal();return;
    }
    if(action==='checkout-form')return checkoutModal();
  } catch(error) {toast(error.message,true);}
});
document.addEventListener('submit',async event=>{
  const form=event.target.closest('form[data-form]');if(!form)return;
  event.preventDefault();const kind=form.dataset.form,fd=new FormData(form),data=Object.fromEntries(fd),submit=form.querySelector('[type=submit]');
  const existingText=submit?.textContent;if(submit){submit.disabled=true;submit.textContent=kind==='assistant'?'Drafting…':'Saving…';}
  const errorBox=(dialog.open?dialog:form).querySelector('.error');if(errorBox)errorBox.innerHTML='';
  try {
    if(await connectionForm(kind,form,data,extensionContext()))return;
    if(kind==='theme-file'){themeFileForm(form,data,extensionContext());return;}
    if(kind==='login') {await api('/api/login','POST',data);await entered();return;}
    if(kind==='product-new') {
      await api(storePath('/products'),'POST',{...data,price:Math.round(Number(data.price)*100),stock:Number(data.stock),tax_bps:Math.round(Number(data.tax)*100)});
      closeModal();await refresh();toast('Product added.');return;
    }
    if(kind==='product-edit') {
      await api(storePath('/products/'+form.dataset.id),'PATCH',{name:data.name,price:Math.round(Number(data.price)*100),active:Number(data.active)});
      closeModal();await refresh();toast('Product updated.');return;
    }
    if(kind==='stock') {
      await api(storePath('/products/'+form.dataset.id+'/stock'),'POST',{delta:Number(data.delta),reason:data.reason});
      closeModal();await refresh();toast('Stock adjustment recorded.');return;
    }
    if(kind==='theme') {await api(storePath('/theme'),'PUT',themeConfiguration(form));await refresh();toast('Theme draft saved.');return;}
    if(kind==='app-new') {
      const result=await api(storePath('/apps'),'POST',{name:data.name,scopes:fd.getAll('scopes')});
      await refresh();
      modal('Save your app token','<div class="notice warning">Shown once. Keep this token on your integration server. Never put it into storefront code or a public repository.</div><label class="field spaced">Private app token<input readonly value="'+e(result.token)+'" aria-label="Private app token"></label><p class="tiny muted spaced">Approved scopes: '+e(result.scopes.join(', '))+'</p><div class="form-actions">'+btn('close','I saved the token','primary')+'</div>');return;
    }
    if(kind==='ticket-new') {await api(storePath('/tickets'),'POST',data);closeModal();await refresh();toast('Support request created.');return;}
    if(kind==='ticket-respond') {await api('/api/support/'+form.dataset.id+'/respond','POST',data);closeModal();await refresh();toast('Response saved.');return;}
    if(kind==='member-new') {await api(storePath('/members'),'POST',data);closeModal();await refresh();toast('Store access granted.');return;}
    if(kind==='settings') {await api(storePath('/settings'),'PATCH',data);await refresh();toast('Store details saved. No billing charge was created.');return;}
    if(kind==='partner-new') {await api('/api/partner/stores','POST',data);closeModal();await refresh();toast('Development store created.');return;}
    if(kind==='handover') {
      if(data.confirmation!=='TRANSFER')throw new Error('Type TRANSFER to continue.');
      await api('/api/stores/'+form.dataset.id+'/handover','POST',{email:data.email});
      closeModal();state.storeId=null;state.data=null;state.page='partner';await refresh();toast('Ownership transferred. Your previous access was revoked.');return;
    }
    if(kind==='assistant') {
      const result=await api(storePath('/assistant'),'POST',data);
      const box=document.getElementById('ai-result');if(box){box.className='draft';box.textContent=result.draft;}
      toast('Draft generated. No store changes were applied.');return;
    }
    if(kind==='checkout') {
      if(data.method==='razorpay'){
        const intent=await api('/api/public/'+state.shop.slug+'/payments','POST',{...data,receipt_token:state.paymentIntent?.checkout_key===state.checkoutKey?state.paymentIntent.receipt_token:undefined,items:state.cart.map(l=>({product_id:l.id,quantity:l.quantity}))},{'Idempotency-Key':state.checkoutKey});
        state.paymentIntent={...intent,checkout_key:state.checkoutKey};state.paymentCustomer=data;
        await onlineCheckout(extensionContext(),state.paymentIntent,data);return;
      }
      const result=await api('/api/public/'+state.shop.slug+'/checkout','POST',{...data,method:'cod',items:state.cart.map(l=>({product_id:l.id,quantity:l.quantity}))},{'Idempotency-Key':state.checkoutKey});
      state.cart=[];state.checkoutKey=null;state.shop=await api('/api/public/'+state.shop.slug);renderShop();
      modal('Thank you for your order','<div class="stack"><div class="app-icon">'+icon('check',25)+'</div><h2>'+e(result.number)+'</h2><p>Your '+(state.config.demo?'fictional demo ':'')+'COD order was saved. '+money(result.total)+' is due on delivery. No payment was taken and no courier booking was made.</p><div class="notice">This local pilot does not send confirmation emails or book deliveries.</div><div class="form-actions">'+btn('close','Continue shopping','primary')+'</div></div>');return;
    }
  } catch(error) {
    if(kind==='checkout'&&error.receipt){
      state.paymentIntent={...error.receipt,checkout_key:state.checkoutKey,status:'uncertain'};
      paymentStatusModal(extensionContext(),state.paymentIntent,{status:'uncertain'});
    }
    if(errorBox&&errorBox.isConnected)errorBox.innerHTML='<div class="form-error">'+e(error.message)+'</div>';else toast(error.message,true);
  } finally {if(submit?.isConnected){submit.disabled=false;submit.textContent=existingText;}}
});
document.addEventListener('change',async event=>{
  try {
    if(event.target.matches('[data-theme-import]')){await importTheme(event,extensionContext());return;}
    if(event.target.id==='store-select') {
      if(!event.target.value&&state.session.user.kind==='partner')return navigate('partner');
      if(!event.target.value)return;
      state.storeId=event.target.value;await loadPage('overview');
    }
    if(event.target.id==='range') {state.range=Number(event.target.value);render();}
  } catch(error){toast(error.message,true);}
});
document.addEventListener('input',event=>{
  if(event.target.id==='global-search') {
    const query=event.target.value.toLowerCase();
    for(const row of document.querySelectorAll('[data-search]'))row.hidden=!row.dataset.search.toLowerCase().includes(query);
  }
  if(event.target.closest('[data-form="theme"]')||event.target.getAttribute('form')==='theme-settings') {
    const form=document.getElementById('theme-settings'),config=themeConfiguration(form);
    const preview=document.getElementById('theme-live');
    if(config.renderer==='liquid'){if(preview)preview.innerHTML='<p class="notice">Source changed. Choose Render preview to check the unsaved template.</p>';return;}
    if(preview)preview.innerHTML=shopMarkup({name:state.data.store.name,products:state.data.products.filter(p=>p.active),theme:config},true);
  }
});
dialog.addEventListener('close',()=>{dialog.innerHTML='';});
window.addEventListener('hashchange',()=>{if(!state.shop&&state.session)navigate(location.hash.slice(1)).catch(error=>toast(error.message,true));});
async function boot() {
  state.config=await api('/api/config');
  if(state.config.store_slug){await shopBoot(state.config.store_slug);return;}
  const shop=location.pathname.match(/^\/s\/([a-z0-9-]+)$/);
  if(shop) {
    if(new URLSearchParams(location.search).has('preview')) {
      await refreshSession();const s=state.session.stores.find(s=>s.slug===shop[1]);
      if(!s)throw new Error('Sign in with theme access to this store to preview its draft.');
      state.shop=await api('/api/stores/'+s.id+'/preview');renderShop();return;
    }
    await shopBoot(shop[1]);return;
  }
  try {await entered();const requested=location.hash.slice(1);if(Object.hasOwn(pageTitles,requested))await loadPage(requested);}
  catch(error) {if(error.status===401){state.session=null;renderLogin();}else throw error;}
}
boot().catch(error=>{app.innerHTML='<main id="main" class="empty"><h1>We couldn’t open this workspace.</h1><p class="spaced">'+e(error.message)+'</p><a class="button primary spaced" href="/admin">Return to sign in</a></main>';});
