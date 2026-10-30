import { parentPort, workerData } from 'node:worker_threads';
import { readFileSync } from 'node:fs';
import { getQuickJS } from 'quickjs-emscripten';
import sanitizeHtml from 'sanitize-html';

let runtime, context;
try {
  // Merchant source runs in a separate WASM JavaScript engine, never Node eval/vm.
  const QuickJS = await getQuickJS();
  runtime = QuickJS.newRuntime();
  runtime.setMemoryLimit(8 * 1024 * 1024);
  runtime.setMaxStackSize(256 * 1024);
  const deadline = Date.now() + 250;
  runtime.setInterruptHandler(() => Date.now() > deadline);
  const files = workerData.files;
  const sdk = readFileSync(new URL('./theme-sdk.mjs', import.meta.url), 'utf8');
  runtime.setModuleLoader(name => {
    if (name === 'ind:theme') return sdk;
    if (Object.hasOwn(files, name)) return files[name];
    throw new Error('Unknown theme component');
  }, (_base, requested) => {
    if (requested === 'ind:theme') return requested;
    if (!requested.startsWith('./')) throw new Error('Import ind:theme or a package-local ./component.js');
    const name = requested.slice(2);
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,60}\.(?:js|mjs)$/.test(name) || !Object.hasOwn(files, name)) {
      throw new Error('Unknown or invalid package-local import');
    }
    return name;
  });
  context = runtime.newContext();
  function unwrap(result) {
    if (result.error) {
      let detail = 'Check syntax, imports, return value and resource limits.';
      // Only read a bounded guest string; never dump guest objects or toJSON hooks.
      try {
        const message = context.getProp(result.error, 'message');
        try { if (context.typeof(message) === 'string') detail = context.getString(message).slice(0,240); }
        finally { message.dispose(); }
      } catch {} finally { result.error.dispose(); }
      throw new Error('JavaScript theme failed: ' + detail);
    }
    return result.value;
  }
  const input = JSON.stringify(JSON.stringify(workerData.context));
  // Freeze the copied public input before any merchant module executes.
  unwrap(context.evalCode('{' +
    'const data = JSON.parse(' + input + ');' +
    'function freeze(value) { if(value && typeof value==="object") { Object.values(value).forEach(freeze); Object.freeze(value); } return value; }' +
    'Object.defineProperty(globalThis,"__ind_context",{value:freeze(data),writable:false,configurable:false});' +
    '}', '__ind_context__.js', {type:'global'})).dispose();
  const entry = 'import render from "./index.js";\n' +
    'import { renderToString } from "ind:theme";\n' +
    'if(typeof render !== "function") throw new TypeError("index.js needs a default render function");\n' +
    'globalThis.__ind_output = renderToString(render(globalThis.__ind_context));\n';
  // Async themes and top-level await have no job pump and cannot produce a frame.
  const evaluated = unwrap(context.evalCode(entry, '__ind_entry__.mjs', {type:'module'}));
  try {
    const state = context.getPromiseState(evaluated);
    if (!state.notAPromise) {
      if (state.type === 'fulfilled') state.value.dispose();
      if (state.type === 'rejected') state.error.dispose();
      throw new Error('Async themes and top-level await are not supported');
    }
  } finally { evaluated.dispose(); }
  const value = context.getProp(context.global, '__ind_output');
  let output;
  try {
    if (context.typeof(value) !== 'string') throw new Error('Themes must render synchronously');
    output = context.getString(value);
  } finally { value.dispose(); }
  if (Buffer.byteLength(output, 'utf8') > 262144) throw new Error('Theme output exceeds 256 KB');
  const html=sanitizeHtml(output,{allowedTags:['div','section','article','header','footer','nav','main','h1','h2','h3','h4','p','span','strong','em','small','ul','ol','li','a','button','img','br','hr'],
    allowedAttributes:{'*':['class','style','id','title','aria-label'],a:['href'],button:['data-ind-add','type','disabled'],img:['src','alt','width','height','loading']},
    allowedSchemes:['data'],allowedSchemesByTag:{img:['data']},allowProtocolRelative:false,
    allowedStyles:{'*':{color:[/^#[a-f0-9]{3,8}$/i],background:[/^#[a-f0-9]{3,8}$/i],'background-color':[/^#[a-f0-9]{3,8}$/i],
      'text-align':[/^(left|center|right)$/],'font-size':[/^[0-9.]{1,5}(px|rem|em|%)$/],
      padding:[/^[0-9. pxrem%]{1,40}$/],margin:[/^[0-9. pxrem%auto-]{1,40}$/],
      'border-radius':[/^[0-9. pxrem%]{1,40}$/],'max-width':[/^[0-9.]{1,6}(px|rem|em|%)$/],
      display:[/^(block|flex|grid|inline-block|none)$/],gap:[/^[0-9.]{1,5}(px|rem|em)$/]}},
    transformTags:{
      a:(_tag,attrs)=>({tagName:'a',attribs:{...attrs,href:attrs.href?.startsWith('#')?attrs.href:'#'}}),
      button:(_tag,attrs)=>({tagName:'button',attribs:{...attrs,type:'button'}}),
      img:(_tag,attrs)=>({tagName:'img',attribs:{...attrs,src:/^data:image\/(png|jpeg|gif|webp|svg\+xml);base64,[a-zA-Z0-9+/=]+$/.test(attrs.src||'')?attrs.src:'',loading:'lazy'}})
    },enforceHtmlBoundary:true});
  parentPort.postMessage({html});
} catch (error) {
  parentPort.postMessage({error:String(error.message || 'Invalid JavaScript theme').slice(0,300)});
} finally {
  try { context?.dispose(); } finally { runtime?.dispose(); }
}
