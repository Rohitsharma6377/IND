import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Page from "C:\\Users\\ASUS\\Desktop\\project\\IND\\framework\\packages\\indjs\\pages\\docs\\testing.jsx";

class ErrorBoundary extends React.Component{constructor(o){super(o);this.state={error:null}}static getDerivedStateFromError(e){return {error:e}}componentDidCatch(e,info){try{console.error('[INDJS] Hydration error:',e);window.__IND_LAST_ERROR__=e;}catch{}}render(){if(this.state.error){return React.createElement('div',{style:{padding:'12px',border:'1px solid #fecaca',background:'#fef2f2',color:'#991b1b',borderRadius:'8px',fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',margin:'10px'}},React.createElement('strong',null,'Hydration failed'),React.createElement('div',{style:{opacity:.9,marginTop:'6px'}},String(this.state.error&&this.state.error.message||'Unknown error')));}return this.props.children;}}
function __ind_boot(){
  const el = document.getElementById('__ind');
  const props = window.__IND_PROPS__ || {};
  let node = React.createElement(Page, props);
  
  node = React.createElement(ErrorBoundary, null, node);
  if (el) {
    try { hydrateRoot(el, node); }
    catch (e) { const r = createRoot(el); r.render(node); }
  }
}
// expose and run immediately
try { window.__IND_BOOT__ = __ind_boot; } catch {}
__ind_boot();
