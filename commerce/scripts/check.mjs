import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const root=resolve(import.meta.dirname,'..');
let failed=false,count=0;
function checkFolder(folder) {
  for(const entry of readdirSync(folder,{withFileTypes:true})) {
    const filename=join(folder,entry.name);
    if(entry.isDirectory()){checkFolder(filename);continue;}
    if(!entry.isFile()||!/\.(mjs|js)$/.test(entry.name))continue;
    count++;
    const result=spawnSync(process.execPath,['--check',filename],{encoding:'utf8'});
    if(result.status!==0){console.error(result.stderr||result.error);failed=true;}
  }
}
for(const folder of ['src','public','tests','scripts','examples'])checkFolder(join(root,folder));
const html=readFileSync(join(root,'public/index.html'),'utf8');
if(/<script(?![^>]*src=)/i.test(html)) {console.error('Inline scripts are not allowed.');failed=true;}
const pkg=JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
for(const [name,version]of Object.entries(pkg.dependencies||{})){
  if(!/^\d+\.\d+\.\d+$/.test(version)){console.error('Dependency must be pinned: '+name);failed=true;}
}
console.log('Checked '+count+' JavaScript modules.');
if(failed)process.exitCode=1;
