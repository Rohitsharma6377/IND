import {e,icon,btn} from './shared.mjs';
export function themeConfiguration(form) {
  const values=Object.fromEntries(new FormData(form)),files=Object.create(null);
  for(const [name,value]of Object.entries(values))if(name.startsWith('file:')){files[name.slice(5)]=value;delete values[name];}
  return {...values,...(Object.keys(files).length?{files}:{})};
}
export function liquidEditor(state) {
  const t=state.extra,files=t.draft.files||t.starter;
  return '<section class="panel spaced"><div class="panel-head"><div><h2>Liquid source code</h2><p>Package-local variables, conditions, loops and partials. Custom JavaScript is disabled.</p></div><div class="row wrap">'+btn('theme-file-new','Add file')+btn('theme-export','Export package')+btn('theme-render','Render preview','primary')+'</div></div><div class="panel-body"><label class="field">Import a JSON theme package<input type="file" accept=".json,application/json" data-theme-import></label><div class="notice spaced">The code renderer receives only public catalog fields. The cart and payment UI stay outside the isolated template. Choose Liquid in the renderer field, save a draft, then publish.</div>'+Object.entries(files).map(([name,source],i)=>'<details class="source-file spaced"'+(i===0?' open':'')+'><summary>'+e(name)+'</summary><label class="field spaced">Template source<textarea form="theme-settings" class="source-code" name="file:'+e(name)+'" spellcheck="false" maxlength="50000">'+e(source)+'</textarea></label></details>').join('')+'</div></section>';
}
let request=0;
export async function renderThemePreview(ctx) {
  const form=document.getElementById('theme-settings');if(!form)return;
  const config=themeConfiguration(form);if(config.renderer!=='liquid'){ctx.toast('Choose Liquid as the renderer to preview source code.',true);return;}
  const n=++request,target=document.getElementById('theme-live');target.innerHTML='<p class="notice">Rendering isolated template…</p>';
  const result=await ctx.api(ctx.storePath('/theme/render'),'POST',{config});
  if(n!==request||!target.isConnected)return;
  const iframe=document.createElement('iframe');iframe.id='theme-preview-frame';iframe.className='liquid-frame';iframe.title='Isolated Liquid theme preview';iframe.setAttribute('sandbox','allow-scripts');iframe.src=result.frame_url;target.replaceChildren(iframe);
}
export async function themeAction(action,button,ctx) {
  if(action==='theme-render'){await renderThemePreview(ctx);return true;}
  if(action==='theme-file-new') {
    ctx.modal('Add a theme partial','<form data-form="theme-file">'+ctx.field('filename','Liquid filename','','text','required maxlength="68" pattern="[a-zA-Z0-9][a-zA-Z0-9_-]*[.]liquid" placeholder="collection.liquid"')+'<p class="tiny muted spaced">Use simple filenames. Filesystem paths and URLs are not supported.</p>'+ctx.actions('Add file to draft')+'</form>');return true;
  }
  if(action==='theme-export') {
    const config=themeConfiguration(document.getElementById('theme-settings'));
    const url=URL.createObjectURL(new Blob([JSON.stringify({schema_version:1,settings:{template:config.template,accent:config.accent,title:config.title,subtitle:config.subtitle,announcement:config.announcement},files:config.files},null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='ind-theme.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return true;
  }
  return false;
}
export function themeFileForm(form,data,ctx) {
  const config=themeConfiguration(document.getElementById('theme-settings'));
  if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,60}\.liquid$/.test(data.filename))throw new Error('Use a simple .liquid filename.');
  if(Object.hasOwn(config.files||{},data.filename))throw new Error('That file already exists.');
  if(Object.keys(config.files||{}).length>=10)throw new Error('A package supports at most ten files.');
  config.files={...config.files,[data.filename]:'{% comment %} New theme partial {% endcomment %}'};
  ctx.state.extra.draft=config;ctx.closeModal();ctx.render();ctx.toast('File added to the unsaved draft.');
}
export async function importTheme(event,ctx) {
  const file=event.target.files?.[0];if(!file)return;
  if(file.size>262144)throw new Error('Theme package exceeds 256 KB.');
  const input=JSON.parse(await file.text()),files=input.files||input;
  if(!files||typeof files!=='object'||!Object.hasOwn(files,'index.liquid'))throw new Error('The package needs index.liquid.');
  if(!files||typeof files!=='object'||Array.isArray(files)||Object.keys(files).length>10)throw new Error('Use a map of 1–10 Liquid files.');
  let total=0;
  for(const [name,source]of Object.entries(files)){if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,60}\.liquid$/.test(name)||typeof source!=='string'||source.length>50000)throw new Error('Each file needs a simple .liquid name and at most 50 KB of source.');total+=source.length;}
  if(total>100000)throw new Error('Combined Liquid source exceeds 100 KB.');
  const settings=input.settings||{};
  const config=themeConfiguration(document.getElementById('theme-settings'));
  ctx.state.extra.draft={...config,...Object.fromEntries(['template','accent','title','subtitle','announcement'].filter(k=>typeof settings[k]==='string').map(k=>[k,settings[k]])),renderer:'liquid',files};
  ctx.render();ctx.toast('Theme package imported into an unsaved draft. Render and save before publishing.');
}
