import { e,btn } from './shared.mjs';
let gallery;
function ensure(ctx){if(!gallery||ctx.state.storeId!==gallery.storeId)throw new Error('Open the gallery again for the current store');}
async function show(ctx,productId){
  const product=ctx.state.data.products.find(p=>p.id===productId);if(!product)throw new Error('Product not found');
  gallery={storeId:ctx.state.storeId,productId,assets:await ctx.api(ctx.storePath('/media')),ids:(product.media||[]).map(x=>x.id)};
  draw(ctx,product.name);
}
function draw(ctx,title='Product images'){
  const base='/api/stores/'+gallery.storeId+'/media/';
  ctx.modal(title+' · image gallery','<form data-form="media-upload"><label class="field">Upload PNG, JPEG or WebP<input name="image" type="file" accept="image/png,image/jpeg,image/webp" required></label><label class="field spaced">Alternative text<input name="alt" maxlength="300" placeholder="Describe the product for someone who cannot see it"></label><p class="tiny muted spaced">Up to 2 MB and 12 million pixels. Static raster images only. Originals stay private; public images are re-encoded without metadata.</p>'+ctx.actions('Upload image')+'</form><h3 class="spaced">Gallery order</h3><p class="tiny muted">Choose up to eight images. The first becomes the product cover.</p><div class="spaced">'+gallery.ids.map((id,i)=>{const a=gallery.assets.find(x=>x.id===id);return '<div class="quick"><img width="64" height="64" src="'+base+e(id)+'/preview" alt="'+e(a?.alt||'')+'"><div><strong>'+e(a?.name||id)+'</strong><p>'+e(a?.alt||'No alternative text')+'</p></div>'+btn('media-up','Move up','','data-id="'+e(id)+'"'+(i===0?' disabled':''))+btn('media-down','Move down','','data-id="'+e(id)+'"'+(i===gallery.ids.length-1?' disabled':''))+btn('media-unselect','Remove','','data-id="'+e(id)+'"')+'</div>';}).join('')+'</div><div class="form-actions spaced">'+btn('media-save','Save gallery','primary')+'</div><h3 class="spaced">Image library</h3><div class="spaced">'+gallery.assets.map(a=>'<div class="quick"><img width="64" height="64" src="'+base+e(a.id)+'/preview" alt="'+e(a.alt)+'" loading="lazy"><div><strong>'+e(a.name)+'</strong><p>'+a.width+' × '+a.height+'</p></div>'+btn('media-select',gallery.ids.includes(a.id)?'Selected':'Add to gallery','','data-id="'+e(a.id)+'"'+(gallery.ids.includes(a.id)?' disabled':''))+btn('media-alt','Edit alt text','','data-id="'+e(a.id)+'"')+btn('media-delete','Delete','danger','data-id="'+e(a.id)+'"')+'</div>').join('')+'</div><div class="error" role="alert"></div>');
}
export async function mediaAction(action,button,ctx){
  if(action==='product-media'){await show(ctx,button.dataset.id);return true;}
  if(!action.startsWith('media-'))return false;ensure(ctx);
  const id=button.dataset.id,i=gallery.ids.indexOf(id);
  if(action==='media-select'){if(gallery.ids.length>=8)throw new Error('A gallery supports at most eight images');if(!gallery.ids.includes(id))gallery.ids.push(id);}
  else if(action==='media-unselect')gallery.ids=gallery.ids.filter(x=>x!==id);
  else if(action==='media-up'||action==='media-down'){const j=i+(action==='media-up'?-1:1);if(i>=0&&j>=0&&j<gallery.ids.length)[gallery.ids[i],gallery.ids[j]]=[gallery.ids[j],gallery.ids[i]];}
  else if(action==='media-save'){await ctx.api('/api/stores/'+gallery.storeId+'/products/'+gallery.productId+'/media','PUT',{ids:gallery.ids});ctx.closeModal();await ctx.refresh();ctx.toast('Product gallery saved.');return true;}
  else if(action==='media-delete'){if(!confirm('Permanently delete this unused library image? This cannot be undone.'))return true;await ctx.api('/api/stores/'+gallery.storeId+'/media/'+id,'DELETE');gallery.assets=gallery.assets.filter(x=>x.id!==id);gallery.ids=gallery.ids.filter(x=>x!==id);}
  else if(action==='media-alt'){const asset=gallery.assets.find(x=>x.id===id);ctx.modal('Edit alternative text','<form data-form="media-alt" data-id="'+e(id)+'"><label class="field">Alternative text<input name="alt" value="'+e(asset?.alt||'')+'" maxlength="300"></label>'+ctx.actions('Save alternative text')+'</form>');return true;}
  draw(ctx);return true;
}
export async function mediaForm(kind,form,data,ctx){
  if(!['media-upload','media-alt'].includes(kind))return false;ensure(ctx);
  if(kind==='media-alt'){await ctx.api('/api/stores/'+gallery.storeId+'/media/'+form.dataset.id,'PATCH',{alt:data.alt});gallery.assets=await ctx.api('/api/stores/'+gallery.storeId+'/media');draw(ctx);return true;}
  const file=data.image;if(!file||!file.size||file.size>2*1024*1024)throw new Error('Choose an image up to 2 MB');
  const bytes=new Uint8Array(await file.arrayBuffer());let binary='';
  for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));
  const image=await ctx.api('/api/stores/'+gallery.storeId+'/media','POST',{name:file.name.slice(0,120),mime:file.type,alt:data.alt,base64:btoa(binary)});
  gallery.assets=await ctx.api('/api/stores/'+gallery.storeId+'/media');
  if(!gallery.ids.includes(image.id)&&gallery.ids.length<8)gallery.ids.push(image.id);
  draw(ctx);ctx.toast('Image uploaded. Save the gallery to publish its order.');return true;
}
