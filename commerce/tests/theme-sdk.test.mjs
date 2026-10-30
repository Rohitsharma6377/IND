import test from 'node:test';
import assert from 'node:assert/strict';
import { html,money,renderToString } from '../src/theme-sdk.mjs';
import { readThemePackage } from '../public/theme-editor.mjs';
import { readFileSync } from 'node:fs';
import { starterJavaScript } from '../src/theme-renderer.mjs';

test('html escapes text and quoted attribute values',()=>{
  const value='<img src=x onerror="alert(1)"> &';
  assert.equal(renderToString(html`<p title="${value}">${value}</p>`),'<p title="&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp;">&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp;</p>');
});
test('component arrays retain branded markup and escape plain strings',()=>{
  const card=value=>html`<b>${value}</b>`;
  assert.equal(renderToString(html`<section>${[card('<A>'),false,null,['<script>',card('B')],0]}</section>`),'<section><b>&lt;A&gt;</b>&lt;script&gt;<b>B</b>0</section>');
});
test('markup branding cannot be supplied by an ordinary object',()=>{
  assert.throws(()=>renderToString({toString:()=>'<script>bad</script>'}),/render function/);
  assert.equal(renderToString(html`${'<strong>text</strong>'}`),'&lt;strong&gt;text&lt;/strong&gt;');
  assert.throws(()=>html(['not a template']),/tagged template/);
});
test('money formats integer paise using Indian grouping',()=>{
  assert.equal(money(0),'₹0.00');assert.equal(money(11800),'₹118.00');assert.equal(money(12345678),'₹1,23,456.78');
  for(const value of [-1,1.5,NaN,Infinity,'11800',100000001])assert.throws(()=>money(value));
});
test('render output must be synchronous and bounded',()=>{
  assert.equal(renderToString(''),'');
  assert.throws(()=>renderToString(Promise.resolve('later')),/synchronously/);
  assert.throws(()=>renderToString('x'.repeat(262145)),/256 KB/);
  assert.throws(()=>html`${'x'.repeat(262145)}`,/256 KB/);
});
test('JavaScript package import validates schema, entry, language and source',()=>{
  const valid={schema_version:2,language:'javascript',entry:'index.js',sdk_version:1,files:{'index.js':'export default () => "hello"'}};
  assert.equal(readThemePackage(valid).files['index.js'],valid.files['index.js']);
  for(const input of [{...valid,schema_version:1},{...valid,language:'other'},{...valid,entry:'main.js'},{...valid,sdk_version:2},{files:{'../index.js':'x','index.js':'x'}},{files:{'index.js':[]}},[]]){
    assert.throws(()=>readThemePackage(input));
  }
  assert.equal(readThemePackage(valid.files).files['index.js'],valid.files['index.js']);
});
test('downloadable starter matches the editor starter and package metadata',()=>{
  const input=JSON.parse(readFileSync(new URL('../examples/starter-theme/ind-theme.json',import.meta.url),'utf8'));
  assert.deepEqual(readThemePackage(input).files,starterJavaScript);
  for(const [name,source]of Object.entries(starterJavaScript)){
    assert.equal(readFileSync(new URL('../examples/starter-theme/'+name,import.meta.url),'utf8').trim(),source.trim());
  }
});
