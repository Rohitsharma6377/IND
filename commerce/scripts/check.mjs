import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const root=resolve(import.meta.dirname,'..');
let failed=false,count=0;
for(const folder of ['src','public','tests','scripts']) {
  for(const filename of readdirSync(join(root,folder)).filter(f=>f.endsWith('.mjs'))) {
    count++;
    const result=spawnSync(process.execPath,['--check',join(root,folder,filename)],{encoding:'utf8'});
    if(result.status!==0){console.error(result.stderr);failed=true;}
  }
}
const html=readFileSync(join(root,'public/index.html'),'utf8');
if(/<script(?![^>]*src=)/i.test(html)) {console.error('Inline scripts are not allowed.');failed=true;}
JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
console.log('Checked '+count+' JavaScript modules.');
if(failed)process.exitCode=1;
