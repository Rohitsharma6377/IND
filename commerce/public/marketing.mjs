const tabs=[...document.querySelectorAll('[data-feature]')];
function selectTab(id) {
  for(const tab of tabs){const active=tab.dataset.feature===id;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;}
  for(const panel of document.querySelectorAll('[data-panel]'))panel.hidden=panel.dataset.panel!==id;
}
for(const tab of tabs)tab.addEventListener('click',()=>selectTab(tab.dataset.feature));
document.querySelector('[role=tablist]')?.addEventListener('keydown',event=>{
  if(!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();let n=tabs.indexOf(document.activeElement);
  n=event.key==='Home'?0:event.key==='End'?tabs.length-1:(n+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+tabs.length)%tabs.length;
  selectTab(tabs[n].dataset.feature);tabs[n].focus();
});
if(tabs.length)selectTab(tabs[0].dataset.feature);
document.querySelector('[data-menu]')?.addEventListener('click',event=>{
  const button=event.currentTarget,open=button.getAttribute('aria-expanded')!=='true';
  button.setAttribute('aria-expanded',String(open));document.querySelector('.marketing-header').classList.toggle('menu-open',open);
});
const kind=document.querySelector('[name=kind]');
function fields(){if(kind)for(const input of document.querySelectorAll('[data-merchant-field]')){input.disabled=kind.value==='partner';input.required=kind.value!=='partner';input.closest('label').hidden=kind.value==='partner';}}
if(kind&&new URLSearchParams(location.search).get('kind')==='partner')kind.value='partner';
kind?.addEventListener('change',fields);fields();
for(const form of document.querySelectorAll('[data-public-form]'))form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const fd=new FormData(form),input=Object.fromEntries(fd);input.consent=fd.has('consent');
  const submit=form.querySelector('[type=submit]'),error=form.querySelector('.public-error'),title=submit.textContent;
  submit.disabled=true;submit.textContent='Saving…';error.textContent='';
  try {
    const signup=form.dataset.publicForm==='signup';
    const response=await fetch(signup?'/api/signup':'/api/pilot-requests',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)});
    const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not save this request.');
    if(signup){location.href='/admin';return;}
    form.reset();const message=document.createElement('div');message.className='notice';message.setAttribute('role','status');message.textContent='Your pilot request was saved for review. No email or marketing subscription was created.';form.replaceWith(message);
  } catch(error){form.querySelector('.public-error').textContent=error.message;}
  finally {submit.disabled=false;submit.textContent=title;}
});
