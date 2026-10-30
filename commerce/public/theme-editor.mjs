import { e,btn } from './shared.mjs';

export function themeConfiguration(form) {
  const values=Object.fromEntries(new FormData(form)),files=Object.create(null);
  for(const [name,value]of Object.entries(values))if(name.startsWith('file:')){files[name.slice(5)]=value;delete values[name];}
  return {...values,...(Object.keys(files).length?{files}:{})};
}
export function readThemePackage(input) {
  if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Import a JavaScript theme package.');
  if(input.schema_version!==undefined&&input.schema_version!==2)throw new Error('Use an IND JavaScript theme package with schema_version 2.');
  if(input.language!==undefined&&input.language!=='javascript')throw new Error('The theme language must be javascript.');
  if(input.entry!==undefined&&input.entry!=='index.js')throw new Error('The theme entry must be index.js.');
  if(input.sdk_version!==undefined&&input.sdk_version!==1)throw new Error('This editor supports theme SDK version 1.');
  const files=input.files||input,entries=Object.entries(files);
  if(typeof files!=='object'||Array.isArray(files)||entries.length<1||entries.length>10||!Object.hasOwn(files,'index.js'))throw new Error('Use 1–10 files including index.js.');
  let total=0;
  for(const [name,source]of entries){
    if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,60}\.(?:js|mjs)$/.test(name)||typeof source!=='string'||!source.trim()||source.length>50000||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(source))throw new Error('Each file needs a simple .js or .mjs name and 1–50 KB of source.');
    total+=source.length;
  }
  if(total>100000)throw new Error('Combined JavaScript source exceeds 100 KB.');
  return {files:{...files},settings:input.settings||{}};
}
export function javascriptEditor(state) {
  const t=state.extra,files=t.draft.files||t.starter;
  const retired=t.draft.renderer&&!['builtin','javascript'].includes(t.draft.renderer);
  return '<section class="panel spaced"><div class="panel-head"><div><h2>JavaScript theme source</h2><p>Export a render function from index.js. Import components with ./component.js and helpers from ind:theme.</p></div><div class="row wrap">'+btn('theme-file-new','Add component')+btn('theme-starter','Use JS starter')+btn('theme-export','Export package')+btn('theme-render','Render preview','primary')+'</div></div><div class="panel-body">'+(retired?'<p class="notice">This draft uses a retired renderer. Its original source is retained. Export it for reference, then use the JavaScript starter or import a new package.</p>':'')+'<label class="field">Import a JSON theme package<input type="file" accept=".json,application/json" data-theme-import></label><div class="notice spaced">JavaScript runs with public catalog data and bounded resources. Use html&#96;…&#96; for escaped values, money(paise) for prices, and arrays of components for lists. Cart and payments remain platform-controlled. Choose JavaScript, save a draft, then publish.</div>'+Object.entries(files).map(([name,source],i)=>'<details class="source-file spaced"'+(i===0?' open':'')+'><summary>'+e(name)+'</summary><label class="field spaced">JavaScript module<textarea form="theme-settings" class="source-code" name="file:'+e(name)+'" spellcheck="false" maxlength="50000">'+e(source)+'</textarea></label>'+(name!=='index.js'?btn('theme-file-remove','Remove component','danger','data-filename="'+e(name)+'"'):'')+'</details>').join('')+'</div></section>';
}
let request=0;
export async function renderThemePreview(ctx) {
  const form=document.getElementById('theme-settings');if(!form)return;
  const config=themeConfiguration(form);if(config.renderer!=='javascript'){ctx.toast('Choose JavaScript as the renderer to preview source code.',true);return;}
  const n=++request,target=document.getElementById('theme-live');target.innerHTML='<p class="notice">Rendering JavaScript theme…</p>';
  const result=await ctx.api(ctx.storePath('/theme/render'),'POST',{config});
  if(n!==request||!target.isConnected)return;
  const iframe=document.createElement('iframe');iframe.id='theme-preview-frame';iframe.className='javascript-frame';iframe.title='Isolated JavaScript theme preview';iframe.setAttribute('sandbox','allow-scripts');iframe.src=result.frame_url;target.replaceChildren(iframe);
}
export async function themeAction(action,button,ctx) {
  if(action==='theme-render'){await renderThemePreview(ctx);return true;}
  if(action==='theme-starter'){
    const config=themeConfiguration(document.getElementById('theme-settings'));
    ctx.state.extra.draft={...config,renderer:'javascript',files:{...ctx.state.extra.starter}};
    ctx.render();ctx.toast('JavaScript starter loaded into the unsaved draft.');return true;
  }
  if(action==='theme-file-remove'){
    const config=themeConfiguration(document.getElementById('theme-settings')),name=button.dataset.filename;
    if(name==='index.js')throw new Error('The entry module is required.');
    delete config.files?.[name];ctx.state.extra.draft=config;ctx.render();ctx.toast('Component removed from the unsaved draft.');return true;
  }
  if(action==='theme-file-new') {
    ctx.modal('Add a JavaScript component','<form data-form="theme-file">'+ctx.field('filename','Component filename','','text','required maxlength="65" pattern="[a-zA-Z0-9][a-zA-Z0-9_-]*[.](js|mjs)" placeholder="collection.js"')+'<p class="tiny muted spaced">Import with ./collection.js. Only package-local modules and ind:theme are available.</p>'+ctx.actions('Add component to draft')+'</form>');return true;
  }
  if(action==='theme-export') {
    const config=themeConfiguration(document.getElementById('theme-settings'));
    const supported=Object.hasOwn(config.files||{},'index.js');
    const output={schema_version:supported?2:1,...(supported?{language:'javascript',entry:'index.js',sdk_version:1}:{}),settings:{template:config.template,accent:config.accent,title:config.title,subtitle:config.subtitle,announcement:config.announcement},files:config.files};
    const url=URL.createObjectURL(new Blob([JSON.stringify(output,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download=supported?'ind-javascript-theme.json':'ind-theme-original-source.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return true;
  }
  return false;
}
export function themeFileForm(form,data,ctx) {
  const config=themeConfiguration(document.getElementById('theme-settings'));
  if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,60}\.(?:js|mjs)$/.test(data.filename))throw new Error('Use a simple .js or .mjs filename.');
  if(Object.hasOwn(config.files||{},data.filename))throw new Error('That file already exists.');
  if(Object.keys(config.files||{}).length>=10)throw new Error('A package supports at most ten files.');
  config.files={...config.files,[data.filename]:"import { html } from 'ind:theme';\n\nexport default function component() {\n  return html" + String.fromCharCode(96) + "<section>New component</section>" + String.fromCharCode(96) + ";\n}\n"};
  ctx.state.extra.draft=config;ctx.closeModal();ctx.render();ctx.toast('Component added to the unsaved draft.');
}
export async function importTheme(event,ctx) {
  const file=event.target.files?.[0];if(!file)return;
  if(file.size>262144)throw new Error('Theme package exceeds 256 KB.');
  const {files,settings}=readThemePackage(JSON.parse(await file.text()));
  const config=themeConfiguration(document.getElementById('theme-settings'));
  ctx.state.extra.draft={...config,...Object.fromEntries(['template','accent','title','subtitle','announcement'].filter(k=>typeof settings[k]==='string').map(k=>[k,settings[k]])),renderer:'javascript',files};
  ctx.render();ctx.toast('JavaScript package imported into an unsaved draft. Render and save before publishing.');
}
