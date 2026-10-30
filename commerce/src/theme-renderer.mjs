import { Worker } from 'node:worker_threads';
import { randomBytes } from 'node:crypto';
import { fail,validateJavaScriptPackage } from './contracts.mjs';
import { art } from '../public/shared.mjs';
export const starterJavaScript={
  "index.js": "import { html } from 'ind:theme';\nimport productCard from './product-card.js';\n\nexport default function render({ shop, settings, products }) {\n  return html`\n    <header class=\"theme-nav\">\n      <strong>${shop.name}</strong><a href=\"#products\">Shop the collection</a>\n    </header>\n    <section class=\"theme-hero\">\n      <small>INDEPENDENT GOODS. EVERYDAY JOY.</small>\n      <h1>${settings.title}</h1><p>${settings.subtitle}</p>\n    </section>\n    <section id=\"products\" class=\"theme-collection\">\n      <h2>Thoughtfully chosen essentials</h2>\n      <div class=\"theme-grid\">${products.slice(0, 24).map(productCard)}</div>\n    </section>\n    <footer>${settings.announcement} · ${shop.name}</footer>\n  `;\n}",
  "product-card.js": "import { html, money } from 'ind:theme';\n\nexport default function productCard(product) {\n  return html`\n    <article class=\"theme-product\">\n      <img src=\"${product.image_url}\" alt=\"${product.name}\">\n      <small>${product.category}</small><h3>${product.name}</h3>\n      <p>${money(product.price)}</p>\n      ${product.available\n        ? html`<button data-ind-add=\"${product.id}\">Add to bag</button>`\n        : html`<span>Sold out</span>`}\n    </article>\n  `;\n}"
};
function publicContext(store,config) {
  return {shop:{name:store.name,slug:store.slug,currency:'INR'},settings:{title:config.title,subtitle:config.subtitle,announcement:config.announcement,accent:config.accent},
    products:store.products.filter(p=>p.active!==0).slice(0,100).map(p=>{
      const svg=(art(p).match(/<svg[\s\S]*<\/svg>/)?.[0]||'').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replaceAll('var(--product)',/^#[a-f0-9]{6}$/i.test(p.colour)?p.colour:'#a2b2a0');
      return {id:p.id,name:p.name,category:p.category,description:p.description,price:p.price,available:p.stock>0,image_url:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64')};
    })};
}
let active=0;
export async function renderJavaScript(store,config,{timeoutMs=5000}={}) {
  const files=validateJavaScriptPackage(config.files||starterJavaScript);fail(active<4,429,'Theme rendering is busy; try again');active++;
  try {
    return await new Promise((resolve,reject)=>{
      const worker=new Worker(new URL('./theme-worker.mjs',import.meta.url),{workerData:{files,context:publicContext(store,config)},resourceLimits:{maxOldGenerationSizeMb:64,maxYoungGenerationSizeMb:16,stackSizeMb:2}});
      let settled=false;
      const finish=async(error,html)=>{if(settled)return;settled=true;clearTimeout(timer);await worker.terminate().catch(()=>{});error?reject(Object.assign(new Error(error),{status:400})):resolve(html);};
      const timer=setTimeout(()=>finish('Theme render exceeded its time limit'),timeoutMs);
      worker.once('message',result=>finish(result.error,result.html));
      worker.once('error',()=>finish('Theme rendering failed within its resource limits'));
      worker.once('exit',code=>{if(code!==0)finish('Theme renderer stopped before completion');});
    });
  } finally {active--;}
}
const frameCSS='*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;background:#fcfaf4;color:#243d2b}a{color:inherit}button{font:inherit;background:#23583d;color:white;border:0;padding:12px 18px;border-radius:5px;cursor:pointer}a:focus-visible,button:focus-visible{outline:3px solid #d5a34f;outline-offset:4px}.theme-nav{padding:26px 5%;display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #e1e5d9}.theme-nav strong{font:26px Georgia,serif}.theme-nav a{font-size:12px}.theme-hero{padding:65px 7%;background:#edf0e4}.theme-hero small{font-size:10px;letter-spacing:2px}.theme-hero h1{font:clamp(34px,6vw,68px)/1.06 Georgia,serif;max-width:700px;margin:25px 0}.theme-hero p{color:#7b886d;max-width:420px;line-height:1.7}.theme-collection{padding:40px 5%}.theme-collection h2{font:27px Georgia,serif;margin:0 0 25px}.theme-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}.theme-product img{width:100%;height:240px;object-fit:contain;background:#edf0e5}.theme-product h3{font-size:14px;margin:10px 0}.theme-product small{font-size:11px;color:#899679;display:block;margin-top:15px}.theme-product p{font-size:13px}.theme-product button{font-size:11px}footer{border-top:1px solid #e1e5d9;padding:28px 5%;font-size:11px;color:#879477}@media(max-width:650px){.theme-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.theme-product img{height:170px}.theme-hero{padding:35px 6%}.theme-nav strong{font-size:21px}}';
export function frameDocument(html) {
  const nonce=randomBytes(18).toString('base64url');
  const bridge="const size=()=>parent.postMessage({type:'ind:height',height:document.documentElement.scrollHeight},'*');new ResizeObserver(size).observe(document.documentElement);document.addEventListener('click',event=>{const button=event.target.closest('[data-ind-add]');if(button){event.preventDefault();parent.postMessage({type:'ind:add',product_id:button.dataset.indAdd},'*');}});size();";
  return '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; img-src data:; style-src &#39;unsafe-inline&#39;; script-src &#39;nonce-'+nonce+'&#39;; connect-src &#39;none&#39;; form-action &#39;none&#39;; base-uri &#39;none&#39;"><style>'+frameCSS+'</style><body>'+html+'<script nonce="'+nonce+'">'+bridge+'</script></body></html>';
}
