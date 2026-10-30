import test from 'node:test';
import assert from 'node:assert/strict';
import { renderLiquid,frameDocument,starterLiquid } from '../src/theme-renderer.mjs';
import { validateLiquidPackage,defaultTheme } from '../src/contracts.mjs';
const store={name:'Demo <script>alert(1)</script>',slug:'demo',products:[{id:'prod_test',name:'Cup <img src=x onerror=alert(1)>',category:'Home',description:'Public description',price:11800,stock:2,colour:'#b87c5a',private_field:'never expose'}]};
test('Liquid variables, conditions, money and package-local partials render public products',async()=>{
  const html=await renderLiquid(store,{...defaultTheme,renderer:'liquid',files:starterLiquid});
  assert.match(html,/data-ind-add="prod_test"/);assert.match(html,/118/);
  assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img src=x'));
  assert.match(html,/Demo &lt;script&gt;/);assert.ok(!html.includes('never expose'));
});
test('custom markup is sanitised and external links/active content are removed',async()=>{
  const html=await renderLiquid(store,{...defaultTheme,files:{'index.liquid':'<script>alert(1)</script><form><input name="password"></form><iframe src="https://attacker.example"></iframe><a href="https://attacker.example">Link</a><button onclick="alert(1)" data-ind-add="prod_test">Add</button>'}});
  assert.ok(!/<script|<form|<input|<iframe|onclick=/.test(html));assert.ok(!html.includes('https://attacker.example'));assert.match(html,/data-ind-add/);
});
test('templates cannot traverse paths or read server globals',async()=>{
  assert.throws(()=>validateLiquidPackage({'../secret.liquid':'secret','index.liquid':'hello'}));
  await assert.rejects(renderLiquid(store,{...defaultTheme,files:{'index.liquid':'{% render "../../.env" %}'}}));
  const html=await renderLiquid(store,{...defaultTheme,files:{'index.liquid':'{{ process.env }}{{ shop.__proto__ }}{{ products.first.private_field }}'}});
  assert.equal(html.trim(),'');
});
test('expensive Liquid work stops within bounded renderer limits',async()=>{
  await assert.rejects(renderLiquid(store,{...defaultTheme,files:{'index.liquid':'{% for i in (1..100000000) %}{{ i }}{% endfor %}'}}),error=>error.status===400);
});
test('frame HTML has a nonce-bound bridge and no form/network permission',()=>{
  const html=frameDocument('<h1>Sanitised preview</h1>');
  assert.match(html,/script nonce="[A-Za-z0-9_-]+"/);assert.match(html,/connect-src &#39;none&#39;/);
  assert.match(html,/parent.postMessage/);assert.ok(!html.includes('allow-same-origin'));
});
