import { defaultTheme } from '../src/contracts.mjs';
import { starterJavaScript } from '../src/theme-renderer.mjs';
import { newLayout } from '../public/layout-model.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { Commerce } from '../src/commerce.mjs';
import { Media } from '../src/media.mjs';
import { createCommerceServer } from '../src/server.mjs';
function fixture(t){
 const c=new Commerce();t.after(()=>c.close());
 const owner=c.user({name:'Image owner',email:'images@example.test',password:'image-test-password-123'});
 const other=c.user({name:'Other',email:'other-images@example.test',password:'image-test-password-123'});
 const store=c.newStore(owner,{name:'Images',slug:'image-shop'},'demo'),second=c.newStore(other,{name:'Other',slug:'other-images'},'demo');
 const product=c.createProduct(owner,store.id,{name:'Cup',sku:'CUP',price:10000,stock:4});
 return {c,owner,other,store,second,product,media:new Media(c)};
}
async function uploadInput(colour='#ab1234',width=1200,height=600){
 const data=await sharp({create:{width,height,channels:3,background:colour}}).png().toBuffer();
 return {name:'sample.png',mime:'image/png',alt:'A red ceramic cup',base64:data.toString('base64')};
}
test('raster upload generates metadata-free WebP variants and deduplicates per store',async t=>{
 const {c,owner,store,media}=fixture(t),input=await uploadInput(),a=await media.upload(owner,store.id,input);
 assert.equal(a.width,960);assert.equal(a.height,480);assert.equal(a.original,undefined);
 const rows=c.all('SELECT size,data FROM media_variants WHERE asset_id=? ORDER BY size',a.id);
 assert.deepEqual(rows.map(x=>x.size),[320,960]);
 for(const row of rows){const m=await sharp(Buffer.from(row.data)).metadata();assert.equal(m.format,'webp');assert.equal(m.width,row.size);assert.equal(m.exif,undefined);}
 assert.equal((await media.upload(owner,store.id,{...input,alt:'Do not overwrite'})).id,a.id);
 assert.equal(media.list(owner,store.id)[0].alt,input.alt);
});
test('small images are not upscaled',async t=>{
 const {owner,store,media}=fixture(t),a=await media.upload(owner,store.id,await uploadInput('#123456',80,40));assert.equal(a.width,80);assert.equal(a.height,40);
});
test('active content, MIME mismatch, corrupt files, oversized bytes and pixels fail',async t=>{
 const {owner,store,media}=fixture(t),input=await uploadInput();
 for(const value of [
 {...input,mime:'image/jpeg'},
 {...input,base64:Buffer.from('<svg onload="alert(1)"></svg>').toString('base64')},
 {...input,base64:Buffer.from([137,80,78,71,13,10,26,10,1,2,3]).toString('base64')},
 {...input,base64:'A'.repeat(3000000)},
 await uploadInput('#123456',4000,4000)
 ])await assert.rejects(media.upload(owner,store.id,value),e=>[400,415].includes(e.status));
});
test('gallery order, alt text and same-store links are enforced transactionally',async t=>{
 const {c,owner,other,store,second,product,media}=fixture(t),a=await media.upload(owner,store.id,await uploadInput()),b=await media.upload(owner,store.id,await uploadInput('#123456'));
 assert.deepEqual(media.attach(owner,store.id,product.id,{ids:[b.id,a.id]}).map(x=>x.id),[b.id,a.id]);
 media.update(owner,store.id,a.id,{alt:'Updated alt text'});assert.equal(c.gallery(store.id,product.id)[1].alt,'Updated alt text');
 assert.throws(()=>media.attach(other,second.id,product.id,{ids:[a.id]}),e=>e.status===404);
 assert.throws(()=>media.attach(owner,store.id,product.id,{ids:[a.id,a.id]}),e=>e.status===400);
 assert.throws(()=>media.attach(owner,store.id,product.id,{ids:[a.id,'img_missing']}),e=>e.status===404);
 assert.deepEqual(c.gallery(store.id,product.id).map(x=>x.id),[b.id,a.id]);
 assert.throws(()=>media.remove(owner,store.id,a.id),e=>e.status===409);
 media.attach(owner,store.id,product.id,{ids:[b.id]});media.remove(owner,store.id,a.id);
 assert.equal(c.get('SELECT COUNT(*) AS n FROM media_variants WHERE asset_id=?',a.id).n,0);
});
test('only attached active products in open stores expose derivatives',async t=>{
 const {c,owner,store,product,media}=fixture(t),a=await media.upload(owner,store.id,await uploadInput());
 assert.throws(()=>media.derivative(store.slug,a.id,320),e=>e.status===404);
 media.attach(owner,store.id,product.id,{ids:[a.id]});assert.ok(media.derivative(store.slug,a.id,320).length);
 assert.throws(()=>media.derivative('other-images',a.id,320),e=>e.status===404);
 c.editProduct(owner,store.id,product.id,{active:0});assert.throws(()=>media.derivative(store.slug,a.id,320),e=>e.status===404);
 c.editProduct(owner,store.id,product.id,{active:1});c.settings(owner,store.id,{name:store.name,plan:'launch',mode:'development'});
 assert.throws(()=>media.derivative(store.slug,a.id,320),e=>e.status===404);
 assert.ok(media.preview(owner,store.id,a.id).length);
});
test('media capacity is checked before committing new assets',async t=>{
 const {c,owner,store,media}=fixture(t),a=await media.upload(owner,store.id,await uploadInput());
 c.run('UPDATE media_assets SET bytes=? WHERE id=?',64*1024*1024,a.id);
 await assert.rejects(media.upload(owner,store.id,await uploadInput('#123456')),e=>e.status===409);
 assert.equal(media.list(owner,store.id).length,1);
});
test('HTTP upload and preview require session, role, origin and CSRF; originals are never served',async t=>{
 const c=new Commerce(),owner=c.user({name:'Owner',email:'http-images@example.test',password:'image-test-password-123'}),store=c.newStore(owner,{name:'Images',slug:'http-images'},'demo');
 const {server}=createCommerceServer({commerce:c});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 t.after(async()=>{server.closeAllConnections();await new Promise(r=>server.close(r));c.close();});
 const origin='http://127.0.0.1:'+server.address().port,session=c.session(owner),path='/api/stores/'+store.id+'/media';
 const request=(p,method='GET',body,headers={})=>fetch(origin+p,{method,headers:{Origin:origin,'Content-Type':'application/json',Cookie:'ind_session='+session.token,'X-CSRF-Token':session.csrf,...headers},...(body?{body:JSON.stringify(body)}:{})});
 const input=await uploadInput();
 assert.equal((await request(path,'POST',input,{Cookie:''})).status,401);
 assert.equal((await request(path,'POST',input,{'X-CSRF-Token':''})).status,403);
 const response=await request(path,'POST',input);assert.equal(response.status,201);const a=await response.json();
 assert.equal((await request(path+'/'+a.id+'/preview')).headers.get('content-type'),'image/webp');
 assert.equal((await request(path+'/'+a.id+'/original')).status,404);
 assert.equal((await request(path+'/'+a.id+'/preview','GET',undefined,{Cookie:''})).status,401);
 const product=c.createProduct(owner,store.id,{name:'Private cup',sku:'PRIVATE',price:10000,stock:2});
 await request('/api/stores/'+store.id+'/products/'+product.id+'/media','PUT',{ids:[a.id]});
 c.settings(owner,store.id,{name:store.name,plan:'launch',mode:'development'});
 const frame=await request('/api/stores/'+store.id+'/theme/render','POST',{config:{...defaultTheme,renderer:'javascript',files:starterJavaScript,layout:newLayout()}});
 assert.equal(frame.status,200);const frameUrl=(await frame.json()).frame_url;
 const frameResponse=await request(frameUrl);const markup=await frameResponse.text();
 const preview=markup.match(/http:\/\/127[.]0[.]0[.]1:[0-9]+\/media\/http-images\/img_[a-f0-9]+\/960[.]webp[?]preview=[A-Za-z0-9_-]+/);
 assert.ok(preview,'Closed-store preview receives a short-lived image capability');
 assert.equal((await fetch(preview[0])).status,200);assert.equal((await fetch(preview[0].split('?')[0])).status,404);
 c.logout(session.token);assert.equal((await fetch(preview[0])).status,401);
});
