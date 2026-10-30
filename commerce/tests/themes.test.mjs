import test from 'node:test';
import assert from 'node:assert/strict';
import { renderJavaScript,frameDocument,starterJavaScript } from '../src/theme-renderer.mjs';
import { validateJavaScriptPackage,defaultTheme } from '../src/contracts.mjs';
const store={name:'Demo <script>alert(1)</script>',slug:'demo',products:[{id:'prod_test',name:'Cup <img src=x onerror=alert(1)>',category:'Home',description:'Public description',price:11800,stock:2,colour:'#b87c5a',private_field:'never expose'}]};
const render=source=>renderJavaScript(store,{...defaultTheme,renderer:'javascript',files:{'index.js':source}});
test('JavaScript functions, arrays, conditions, money and local components render public products',async()=>{
  const html=await renderJavaScript(store,{...defaultTheme,renderer:'javascript',files:starterJavaScript});
  assert.match(html,/data-ind-add="prod_test"/);assert.match(html,/118\.00/);
  assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img src=x'));
  assert.match(html,/Demo &lt;script&gt;/);assert.ok(!html.includes('never expose'));
});
test('custom markup is sanitised and external links/active content are removed',async()=>{
  const markup='<script>alert(1)</script><form><input name="password"></form><iframe src="https://attacker.example"></iframe><a href="https://attacker.example">Link</a><button onclick="alert(1)" data-ind-add="prod_test">Add</button>';
  const html=await render('export default () => '+JSON.stringify(markup));
  assert.ok(!/<script|<form|<input|<iframe|onclick=/.test(html));assert.ok(!html.includes('https://attacker.example'));assert.match(html,/data-ind-add/);
});
test('theme packages reject paths, URLs, empty sources and excessive sizes',()=>{
  for(const name of ['../secret.js','/index.js','nested/card.js','node:fs','https://host/x.js','retired.template']){
    assert.throws(()=>validateJavaScriptPackage({'index.js':'export default () => ""',[name]:'secret'}));
  }
  assert.throws(()=>validateJavaScriptPackage({'index.js':' '}));
  assert.throws(()=>validateJavaScriptPackage({'index.js':'x'.repeat(50001)}));
  assert.throws(()=>validateJavaScriptPackage({'index.js':'x'.repeat(50000),'a.js':'x'.repeat(50000),'b.js':'x'}));
  assert.throws(()=>validateJavaScriptPackage({'card.js':'export default () => ""'}));
  assert.ok(validateJavaScriptPackage({'index.js':'export default () => ""','card.mjs':'export default 1'}));
});
test('runtime imports cannot access Node, remote URLs or files outside the package',async()=>{
  for(const name of ['node:fs','node:process','https://attacker.example/a.js','../../.env','./missing.js','./card.js?query']){
    await assert.rejects(render('import thing from '+JSON.stringify(name)+'; export default () => String(thing)'),error=>error.status===400);
  }
});
test('no Node, browser or network APIs are exposed even through Function constructors',async()=>{
  const html=await render('export default ({products}) => [typeof process, typeof require, typeof Buffer, typeof fetch, typeof document, Function("return typeof process")(), typeof products[0].private_field].join("|")');
  assert.equal(html,'undefined|undefined|undefined|undefined|undefined|undefined|undefined');
});
test('each render has a fresh JavaScript realm and immutable public input',async()=>{
  assert.equal(await render('globalThis.leak="sample"; export default () => "first"'),'first');
  assert.equal(await render('export default () => typeof globalThis.leak'),'undefined');
  await assert.rejects(render('export default ({shop}) => { shop.name="Changed"; return shop.name; }'),error=>error.status===400);
});
test('syntax errors and invalid default return values are rejected',async()=>{
  for(const source of ['export default ( => ""','export const title="no render"','export default () => ({html:"raw"})']){
    await assert.rejects(render(source),error=>error.status===400);
  }
});
test('async render functions and top-level await are rejected',async()=>{
  await assert.rejects(render('export default async () => "<h1>Async</h1>"'),error=>error.status===400);
  await assert.rejects(render('globalThis.__ind_output="spoof"; await Promise.resolve(); export default () => "late"'),error=>error.status===400);
});
test('CPU exhaustion stops and later renders remain available',async()=>{
  await assert.rejects(render('export default () => { while(true) {} }'),error=>error.status===400);
  assert.equal(await render('export default () => "<p>Recovered</p>"'),'<p>Recovered</p>');
});
test('memory and output exhaustion are rejected',async()=>{
  await assert.rejects(render('export default () => "x".repeat(64 * 1024 * 1024)'),error=>error.status===400);
  await assert.rejects(render('export default () => "x".repeat(262145)'),error=>error.status===400);
});
test('frame HTML has a nonce-bound bridge and no form/network permission',()=>{
  const html=frameDocument('<h1>Sanitised preview</h1>');
  assert.match(html,/script nonce="[A-Za-z0-9_-]+"/);assert.match(html,/connect-src &#39;none&#39;/);
  assert.match(html,/parent.postMessage/);assert.ok(!html.includes('allow-same-origin'));
});
