import sharp from 'sharp';
import { fail, id, hash, now, text } from './contracts.mjs';
const MAX_BYTES=2*1024*1024,MAX_STORE_BYTES=64*1024*1024;
let processing=0;
function mimeOf(buffer) {
  if(buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return 'image/png';
  if(buffer[0]===255&&buffer[1]===216&&buffer[2]===255)return 'image/jpeg';
  if(buffer.toString('ascii',0,4)==='RIFF'&&buffer.toString('ascii',8,12)==='WEBP')return 'image/webp';
  return '';
}
const metadata='id,name,alt,mime,width,height,bytes,created_at';
export class Media {
  constructor(c){this.c=c;}
  list(actor,storeId){this.c.access(actor,storeId,'catalog');return this.c.all('SELECT '+metadata+' FROM media_assets WHERE store_id=? ORDER BY created_at DESC,id',storeId);}
  async upload(actor,storeId,input) {
    const c=this.c;c.access(actor,storeId,'catalog');
    fail(typeof input.base64==='string'&&input.base64.length<=Math.ceil(MAX_BYTES/3)*4&&/^[A-Za-z0-9+/]+={0,2}$/.test(input.base64),400,'Send a PNG, JPEG or WebP image up to 2 MB');
    const buffer=Buffer.from(input.base64,'base64');
    fail(buffer.length>0&&buffer.length<=MAX_BYTES&&buffer.toString('base64')===input.base64,400,'Invalid image encoding');
    const mime=mimeOf(buffer);fail(mime&&mime===input.mime,415,'Image content must match its PNG, JPEG or WebP type');
    const name=text(input.name,'Image name',120),alt=text(input.alt??'','Alternative text',300,0);
    const digest=hash(buffer);
    const previous=c.get('SELECT '+metadata+' FROM media_assets WHERE store_id=? AND hash=?',storeId,digest);
    if(previous)return {...previous,reused:true};
    fail(processing<2,429,'Image processing is busy. Try again shortly');processing++;
    let variants;
    try{
      const options={failOn:'warning',limitInputPixels:12000000,limitInputChannels:4};
      const meta=await sharp(buffer,options).metadata();
      fail(['png','jpeg','webp'].includes(meta.format)&&(!meta.pages||meta.pages===1),415,'Use a static PNG, JPEG or WebP image');
      fail(meta.width>0&&meta.height>0&&meta.width*meta.height<=12000000&&meta.width<=12000&&meta.height<=12000,400,'Images may contain up to 12 million pixels');
      variants=[];
      for(const size of [320,960]){
        const result=await sharp(buffer,options).rotate().resize({width:size,withoutEnlargement:true}).webp({quality:78}).toBuffer({resolveWithObject:true});
        fail(result.data.length<=(size===320?128:512)*1024,400,'Processed image is too large');
        variants.push({size,...result});
      }
    }catch(error){if(error.status)throw error;fail(false,400,'Image could not be decoded safely');}
    finally{processing--;}
    c.access(actor,storeId,'catalog');
    return c.tx(()=>{
      const found=c.get('SELECT '+metadata+' FROM media_assets WHERE store_id=? AND hash=?',storeId,digest);
      if(found)return {...found,reused:true};
      const usage=c.get('SELECT COUNT(*) AS n,COALESCE(SUM(bytes),0) AS bytes FROM media_assets WHERE store_id=?',storeId);
      const total=buffer.length+variants.reduce((n,v)=>n+v.data.length,0);
      fail(usage.n<100&&usage.bytes+total<=MAX_STORE_BYTES,409,'Pilot media capacity reached (100 images / 64 MB per store)');
      const asset=id('img'),large=variants[variants.length-1].info;
      c.run('INSERT INTO media_assets VALUES(?,?,?,?,?,?,?,?,?,?,?)',asset,storeId,name,alt,mime,buffer,digest,large.width,large.height,total,now());
      for(const variant of variants)c.run('INSERT INTO media_variants VALUES(?,?,?,?,?,?)',storeId,asset,variant.size,variant.info.width,variant.info.height,variant.data);
      c.audit(storeId,actor.id,'media.uploaded',asset);
      return c.get('SELECT '+metadata+' FROM media_assets WHERE store_id=? AND id=?',storeId,asset);
    });
  }
  update(actor,storeId,assetId,input){
    this.c.access(actor,storeId,'catalog');
    fail(this.c.run('UPDATE media_assets SET alt=? WHERE store_id=? AND id=?',text(input.alt,'Alternative text',300,0),storeId,assetId).changes===1,404,'Image not found');
    this.c.audit(storeId,actor.id,'media.alt_updated',assetId);return {updated:true};
  }
  attach(actor,storeId,productId,input){
    const c=this.c;c.access(actor,storeId,'catalog');
    fail(Array.isArray(input.ids)&&input.ids.length<=8&&new Set(input.ids).size===input.ids.length&&input.ids.every(x=>typeof x==='string'),400,'Choose up to eight different images');
    return c.tx(()=>{
      fail(c.get('SELECT id FROM products WHERE store_id=? AND id=?',storeId,productId),404,'Product not found');
      for(const asset of input.ids)fail(c.get('SELECT id FROM media_assets WHERE store_id=? AND id=?',storeId,asset),404,'Image not found in this store');
      c.run('DELETE FROM product_media WHERE store_id=? AND product_id=?',storeId,productId);
      input.ids.forEach((asset,i)=>c.run('INSERT INTO product_media VALUES(?,?,?,?)',storeId,productId,asset,i));
      c.audit(storeId,actor.id,'product.gallery_updated',productId);
      return c.gallery(storeId,productId);
    });
  }
  remove(actor,storeId,assetId){
    const c=this.c;c.access(actor,storeId,'catalog');
    return c.tx(()=>{
      fail(!c.get('SELECT 1 FROM product_media WHERE store_id=? AND asset_id=?',storeId,assetId),409,'Remove this image from product galleries before deleting it');
      fail(c.run('DELETE FROM media_assets WHERE store_id=? AND id=?',storeId,assetId).changes===1,404,'Image not found');
      c.audit(storeId,actor.id,'media.deleted',assetId);return {removed:true};
    });
  }
  derivative(slug,assetId,size){
    fail([320,960].includes(size),404,'Image size not found');
    const c=this.c;
    const row=c.get("SELECT v.data FROM media_variants v JOIN stores s ON s.id=v.store_id WHERE s.slug=? AND s.mode IN ('demo','active') AND v.asset_id=? AND v.size=? AND EXISTS(SELECT 1 FROM product_media pm JOIN products p ON p.id=pm.product_id AND p.store_id=pm.store_id WHERE pm.store_id=v.store_id AND pm.asset_id=v.asset_id AND p.active=1)",slug,assetId,size);
    fail(row,404,'Image not found');return row.data;
  }
  preview(actor,storeId,assetId,size=320){
    fail([320,960].includes(size),404,'Image size not found');
    this.c.access(actor,storeId,'catalog');
    const row=this.c.get('SELECT data FROM media_variants WHERE store_id=? AND asset_id=? AND size=?',storeId,assetId,size);
    fail(row,404,'Image not found');return row.data;
  }
}
