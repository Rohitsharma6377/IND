import test from 'node:test';
import assert from 'node:assert/strict';
import { e, money, label, art } from '../public/shared.mjs';
test('HTML helper escapes unsafe product names in storefront illustrations',()=>{
  assert.equal(e('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;');
  const html=art({name:'<img src=x onerror=alert(1)>',category:'Home',colour:'#ffffff'});
  assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;img'));
});
test('currency helper converts integer paise without losing fractional rupees',()=>{
  assert.match(money(11800),/118/);assert.match(money(11801),/118\.01/);
  assert.equal(label('in_progress'),'In progress');
});
test('all sample product illustration variants produce valid SVG boundaries',()=>{
  for(const name of ['Canvas tote','Stoneware cup','Insulated bottle','Terracotta planter','Notebook','Cushion','Desk organiser']) {
    const html=art({name,category:'Home',colour:'#d6e2d5'});
    assert.equal((html.match(/<svg /g)||[]).length,1);
    assert.equal((html.match(/<\/svg>/g)||[]).length,1);
  }
});
