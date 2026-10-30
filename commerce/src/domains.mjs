import { domainToASCII } from 'node:url';
import { isIP } from 'node:net';
import { Resolver } from 'node:dns/promises';
import https from 'node:https';
import { fail,id,now,secret,text } from './contracts.mjs';
export function hostname(value) {
  const raw=text(value,'Domain',253).toLowerCase().replace(/\.$/,'');
  fail(!/[\\/\\\\:@?#%\s]/.test(raw),400,'Enter a hostname without URL syntax');
  const name=domainToASCII(raw);
  fail(name&&name.includes('.')&&!isIP(name)&&name.split('.').every(label=>/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))&&!/\.(local|internal|test|invalid|localhost|example)$/.test(name),400,'Enter a public hostname without a protocol, path, port or wildcard');
  return name;
}
export function publicIPv4(ip) {
  if(isIP(ip)!==4)return false;
  const [a,b,c]=ip.split('.').map(Number);
  return !(a===0||a===10||a===127||a>=224||(a===169&&b===254)||(a===172&&b>=16&&b<=31)||(a===192&&(b===0||b===168))||(a===100&&b>=64&&b<=127)||(a===198&&[18,19].includes(b))||(a===198&&b===51&&c===100)||(a===203&&b===0&&c===113));
}
export async function resolveDomain(name,target,expectedIPs,challenge,lookup) {
  const resolver=lookup||new Resolver({timeout:2500,tries:1});
  const txt=await resolver.resolveTxt('_ind-commerce.'+name).catch(()=>[]);
  fail(txt.some(parts=>parts.join('')===challenge),409,'Ownership TXT record has not propagated yet');
  const [aliases,addresses,targetIPs]=await Promise.all([resolver.resolveCname(name).catch(()=>[]),resolver.resolve4(name).catch(()=>[]),target?resolver.resolve4(target).catch(()=>[]):[]]);
  const allowed=[...new Set([...expectedIPs,...targetIPs])].filter(publicIPv4);
  fail(allowed.length>0,503,'Configure a platform ingress with a public IPv4 address');
  fail(addresses.length>0&&addresses.every(ip=>allowed.includes(ip))&&(aliases.some(alias=>alias.replace(/\.$/,'').toLowerCase()===target)||expectedIPs.length>0),409,'The domain must point only to the configured platform ingress');
  return {addresses};
}
export async function verifyTlsRoute(name,ip,challenge) {
  fail(publicIPv4(ip),400,'Only a verified public ingress address can be probed');
  return new Promise((resolve,reject)=>{
    const req=https.get({hostname:name,servername:name,path:'/.well-known/ind-commerce',port:443,agent:false,rejectUnauthorized:true,timeout:5000,
      lookup:(_name,options,done)=>options.all?done(null,[{address:ip,family:4}]):done(null,ip,4),
      headers:{Accept:'text/plain'}},res=>{
      let content='';res.on('data',chunk=>{content+=chunk;if(content.length>1024)req.destroy(new Error('Routing response too large'));});
      res.on('end',()=>res.statusCode===200&&content.trim()===challenge?resolve(true):reject(new Error('HTTPS is not routed to this store')));
    });
    req.on('timeout',()=>req.destroy(new Error('HTTPS routing verification timed out')));req.on('error',reject);
  });
}
export class Domains {
  constructor(c,{target='',ipv4=[],platformHost='',lookup=null,tlsProbe=verifyTlsRoute}={}){this.c=c;this.target=target?hostname(target):'';this.ipv4=ipv4.filter(publicIPv4);this.platformHost=platformHost;this.lookup=lookup;this.tlsProbe=tlsProbe;}
  view(row){return {...row,txt_name:'_ind-commerce.'+row.hostname,txt_value:row.challenge,cname_target:this.target||null,a_values:this.ipv4,ingress_configured:Boolean(this.target||this.ipv4.length)};}
  list(actor,storeId){this.c.access(actor,storeId,'settings');return this.c.all('SELECT * FROM store_domains WHERE store_id=? ORDER BY created_at DESC',storeId).map(row=>this.view(row));}
  add(actor,storeId,input) {
    this.c.access(actor,storeId,'settings');const name=hostname(input.hostname);
    fail(name!==this.target&&name!==this.platformHost&&!this.platformHost.endsWith('.'+name)&&!this.target.endsWith('.'+name),400,'This hostname is reserved for the platform');
    const old=this.c.get('SELECT * FROM store_domains WHERE store_id=? AND hostname=?',storeId,name);if(old)return this.view(old);
    fail(this.c.get('SELECT COUNT(*) AS n FROM store_domains WHERE store_id=?',storeId).n<10,409,'This pilot allows ten domains per store');
    const domainId=id('domain');
    this.c.run('INSERT INTO store_domains(id,store_id,hostname,challenge,created_at) VALUES(?,?,?,?,?)',domainId,storeId,name,'ind-commerce='+secret(),now());
    this.c.audit(storeId,actor.id,'domain.added',name);return this.view(this.c.get('SELECT * FROM store_domains WHERE id=?',domainId));
  }
  async verify(actor,storeId,domainId,tls=false) {
    this.c.access(actor,storeId,'settings');
    const row=this.c.get('SELECT * FROM store_domains WHERE id=? AND store_id=?',domainId,storeId);fail(row,404,'Domain not found');
    if(tls)fail(['dns_verified','active'].includes(row.status),409,'Verify DNS ownership and pointing before checking HTTPS');
    let dnsPassed=false;
    try {
      const result=await resolveDomain(row.hostname,this.target,this.ipv4,row.challenge,this.lookup);dnsPassed=true;
      if(tls)await this.tlsProbe(row.hostname,result.addresses[0],row.challenge);
      this.c.access(actor,storeId,'settings');
      this.c.tx(()=>{
        const others=this.c.all("SELECT id,store_id FROM store_domains WHERE hostname=? AND id<>? AND status IN ('dns_verified','active')",row.hostname,row.id);
        for(const old of others){this.c.run("UPDATE store_domains SET status='replaced',last_error='A different store proved DNS ownership' WHERE id=?",old.id);this.c.audit(old.store_id,'dns','domain.reclaimed',row.hostname);}
        this.c.run('UPDATE store_domains SET status=?,last_error=?,verified_at=? WHERE id=?',tls?'active':'dns_verified','',now(),row.id);
        this.c.audit(storeId,actor.id,tls?'domain.https_verified':'domain.dns_verified',row.hostname);
      });
    } catch(error) {
      this.c.run('UPDATE store_domains SET status=?,last_error=? WHERE id=?',dnsPassed?'dns_verified':'pending',String(error.message||'Verification failed').slice(0,300),row.id);
      throw Object.assign(new Error(error.message||'Domain verification failed'),{status:error.status||409});
    }
    return this.view(this.c.get('SELECT * FROM store_domains WHERE id=?',row.id));
  }
  remove(actor,storeId,domainId) {
    this.c.access(actor,storeId,'settings');const row=this.c.get('SELECT hostname FROM store_domains WHERE id=? AND store_id=?',domainId,storeId);fail(row,404,'Domain not found');
    this.c.run('DELETE FROM store_domains WHERE id=? AND store_id=?',domainId,storeId);this.c.audit(storeId,actor.id,'domain.removed',row.hostname);return {removed:true};
  }
  resolveHost(host){return this.c.get("SELECT d.*,s.slug,s.mode FROM store_domains d JOIN stores s ON s.id=d.store_id WHERE d.hostname=? AND d.status IN ('dns_verified','active')",host);}
}
