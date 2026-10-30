import test from 'node:test';
import assert from 'node:assert/strict';
import { Commerce } from '../src/commerce.mjs';
import { defaultTheme,theme } from '../src/contracts.mjs';
import { starterJavaScript,renderJavaScript } from '../src/theme-renderer.mjs';
import { newLayout,changeLayout } from '../public/layout-model.mjs';
const config=()=>({...defaultTheme,renderer:'javascript',files:starterJavaScript,layout:newLayout()});
test('visual edits preserve input drafts and support order, hide, add and remove',()=>{
 const initial=newLayout();let layout=changeLayout(initial,'add',null,'announcement');const id=layout.order.at(-1);
 layout=changeLayout(layout,'up',id);layout=changeLayout(layout,'toggle','hero');assert.equal(layout.sections.hero.disabled,true);assert.equal(initial.sections.hero.disabled,undefined);
 layout=changeLayout(layout,'remove','collection');assert.equal(layout.sections.collection,undefined);
 assert.throws(()=>changeLayout(layout,'add',null,'unknown'));
});
test('layout settings persist, publish independently, and rollback restores exact layout',t=>{
 const c=new Commerce();t.after(()=>c.close());const owner=c.user({name:'Owner',email:'layouts@example.test',password:'layout-test-password-123'});
 const store=c.newStore(owner,{name:'Layout shop',slug:'layout-shop'},'demo');
 let draft=config();draft.layout.sections.hero.settings.title='First layout';
 c.saveTheme(owner,store.id,draft);assert.equal(c.themeState(owner,store.id).draft.layout.sections.hero.settings.title,'First layout');assert.equal(c.publicStore(store.slug).theme.layout,undefined);
 c.publishTheme(owner,store.id,{revision:1});draft.layout.sections.hero.settings.title='Second layout';c.saveTheme(owner,store.id,draft);c.publishTheme(owner,store.id,{revision:2});
 c.publishTheme(owner,store.id,{revision:3,rollback:2});
 assert.equal(c.publicStore(store.slug).theme.layout.sections.hero.settings.title,'First layout');assert.equal(c.themeState(owner,store.id).revision,4);
});
test('server rejects malformed JSON layouts before saving',()=>{
 assert.throws(()=>theme({...config(),layout:{version:1,sections:{},order:['missing']}}),e=>e.status===400);
 assert.throws(()=>theme({...config(),renderer:'builtin'}),e=>e.status===400);
});
test('real isolated renderer uses layout settings, order and disabled sections',async()=>{
 const draft=config();draft.layout.sections.hero.settings.title='<Owned content>';draft.layout.sections.collection.disabled=true;
 const output=await renderJavaScript({name:'Shop',slug:'shop',products:[]},draft);
 assert.match(output,/&lt;Owned content&gt;/);assert.ok(!output.includes('theme-collection'));
});
