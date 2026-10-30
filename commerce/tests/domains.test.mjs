import test from 'node:test';
import assert from 'node:assert/strict';
import { Commerce } from '../src/commerce.mjs';
import { Domains,hostname,publicIPv4 } from '../src/domains.mjs';
const status=n=>error=>error.status===n;
function fixture(t) {
  const c=new Commerce();t.after(()=>c.close());
  const owner=c.user({name:'Owner',email:'domain-owner@example.test',password:'domain-test-password-123'});
  const other=c.user({name:'Other',email:'domain-other@example.test',password:'domain-other-password-123'});
  const store=c.newStore(owner,{name:'Shop',slug:'domain-shop'}),second=c.newStore(other,{name:'Other',slug:'domain-other'});
  const records={txt:[],addresses:['66.116.248.221'],alias:['commerce.netcuriontechnology.com']};
  const lookup={resolveTxt:async()=>records.txt,resolveCname:async()=>records.alias,resolve4:async name=>name==='commerce.netcuriontechnology.com'?['66.116.248.221']:records.addresses};
  let tlsFails=false;
  const domains=new Domains(c,{target:'commerce.netcuriontechnology.com',platformHost:'commerce.netcuriontechnology.com',lookup,tlsProbe:async(name,ip)=>{assert.equal(ip,'66.116.248.221');if(tlsFails)throw new Error('Certificate or route not ready');return true;}});
  return {c,owner,other,store,second,domains,records,failTls:()=>{tlsFails=true;}};
}
test('hostnames reject paths, ports, IPs, wildcards and local-only names',()=>{
  assert.equal(hostname('SHOP.Example.com.'),'shop.example.com');
  for(const name of ['https://shop.example.com','shop.example.com/path','127.0.0.1','*.example.com','shop.local','host:443'])assert.throws(()=>hostname(name));
  for(const ip of ['127.0.0.1','10.1.2.3','172.16.1.1','192.168.1.1','169.254.1.1','100.64.1.1','203.0.113.1','::1'])assert.equal(publicIPv4(ip),false);
  assert.equal(publicIPv4('66.116.248.221'),true);
});
test('ownership proof and ingress pointing are required before HTTPS activation',async t=>{
  const {owner,store,domains,records}=fixture(t),d=domains.add(owner,store.id,{hostname:'shop.example.com'});
  await assert.rejects(domains.verify(owner,store.id,d.id),status(409));
  records.txt=[[d.challenge]];
  const verified=await domains.verify(owner,store.id,d.id);
  assert.equal(verified.status,'dns_verified');
  const active=await domains.verify(owner,store.id,d.id,true);
  assert.equal(active.status,'active');assert.equal(domains.resolveHost('shop.example.com').store_id,store.id);
});
test('a private or unrelated A record cannot pass verification',async t=>{
  const {owner,store,domains,records}=fixture(t),d=domains.add(owner,store.id,{hostname:'shop.example.com'});
  records.txt=[[d.challenge]];records.addresses=['127.0.0.1'];
  await assert.rejects(domains.verify(owner,store.id,d.id),status(409));
  assert.equal(domains.resolveHost(d.hostname),undefined);
});
test('failed TLS checks do not claim the domain is active',async t=>{
  const {owner,store,domains,records,failTls}=fixture(t),d=domains.add(owner,store.id,{hostname:'shop.example.com'});
  records.txt=[[d.challenge]];await domains.verify(owner,store.id,d.id);failTls();
  await assert.rejects(domains.verify(owner,store.id,d.id,true),status(409));
  assert.equal(domains.list(owner,store.id)[0].status,'dns_verified');
});
test('a second store can reclaim a stale domain only with a new ownership TXT proof',async t=>{
  const {owner,other,store,second,domains,records}=fixture(t);
  const first=domains.add(owner,store.id,{hostname:'shop.example.com'});records.txt=[[first.challenge]];await domains.verify(owner,store.id,first.id);
  const next=domains.add(other,second.id,{hostname:first.hostname});
  await assert.rejects(domains.verify(other,second.id,next.id),status(409));
  records.txt=[[next.challenge]];await domains.verify(other,second.id,next.id);
  assert.equal(domains.list(owner,store.id)[0].status,'replaced');
  assert.equal(domains.resolveHost(first.hostname).store_id,second.id);
});
test('domain access is tenant scoped and platform hostnames are reserved',t=>{
  const {owner,other,store,domains}=fixture(t);
  assert.throws(()=>domains.list(other,store.id),status(404));
  assert.throws(()=>domains.add(owner,store.id,{hostname:'commerce.netcuriontechnology.com'}),status(400));
  assert.throws(()=>domains.add(owner,store.id,{hostname:'netcuriontechnology.com'}),status(400));
});
