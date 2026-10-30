import { parentPort,workerData } from 'node:worker_threads';
import { Liquid } from 'liquidjs';
import sanitizeHtml from 'sanitize-html';
try {
  // A map-only FS prevents template includes from reading host files.
  const templates=workerData.files;
  const fs={
    resolve:(_root,name,ext)=>{const key=name.endsWith('.liquid')?name:name+ext;if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,60}\.liquid$/.test(key))throw new Error('Invalid partial name');return key;},
    contains:async(_root,name)=>Object.hasOwn(templates,name),containsSync:(_root,name)=>Object.hasOwn(templates,name),sep:'/',
    exists:async name=>Object.hasOwn(templates,name),existsSync:name=>Object.hasOwn(templates,name),
    readFile:async name=>{if(!Object.hasOwn(templates,name))throw new Error('Unknown theme partial');return templates[name];},
    readFileSync:name=>{if(!Object.hasOwn(templates,name))throw new Error('Unknown theme partial');return templates[name];},
    dirname:()=>'.'
  };
  const engine=new Liquid({fs,root:'.',partials:'.',layouts:'.',extname:'.liquid',ownPropertyOnly:true,outputEscape:'escape',strictFilters:true,strictVariables:false,dynamicPartials:false,relativeReference:false,parseLimit:100000,renderLimit:250,memoryLimit:1000000});
  engine.registerFilter('money',value=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(value)/100));
  const output=await engine.parseAndRender(templates['index.liquid'],workerData.context);if(output.length>262144)throw new Error('Theme output exceeds 256 KB');
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
} catch(error){parentPort.postMessage({error:String(error.message||'Invalid Liquid theme').slice(0,300)});}
