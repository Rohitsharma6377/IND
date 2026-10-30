export const e = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const money = value => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:value%100?2:0}).format(value/100);
export const date = value => new Date(value).toLocaleDateString('en-IN',{day:'numeric',month:'short'});
export const label = value => String(value).replaceAll('_',' ').replace(/^\w/,c=>c.toUpperCase());
const paths={
  home:'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  orders:'M6 6h15l-2 9H8L5 3H2M9 21h.01M18 21h.01',
  products:'m12 3 9 5v9l-9 5-9-5V8Zm0 0v9m-9-4 9 4 9-4m-9 4v10',
  customers:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m18 0v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8m8-7.87a4 4 0 0 1 0 7.75',
  inventory:'M3 3h18v5H3Zm2 5v13h14V8m-11 5h8',
  themes:'M3 3h18v18H3Zm0 6h18M9 9v12',
  apps:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',
  automation:'m13 2-10 12h8l-1 8 11-12h-8Z',
  developer:'m8 5-6 7 6 7m8-14 6 7-6 7m-3-17-2 20',
  support:'M3 14v-3a9 9 0 0 1 18 0v3M3 11h4v8H3Zm14 0h4v8h-4Zm0 8c0 3-5 3-5 3',
  settings:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8m-9 4 3-2-1-3 2-2 3 1 2-3 2 3 3-1 2 2-1 3 3 2-3 2 1 3-2 2-3-1-2 3-2-3-3 1-2-2 1-3Z',
  chart:'M3 3v18h18M8 16V9m5 7V5m5 11v-5',
  partner:'M3 21V8l9-5 9 5v13M8 21v-8h8v8M7 9h.01M17 9h.01',
  arrow:'M5 12h14m-6-6 6 6-6 6',
  external:'M14 3h7v7m0-7L10 14M10 3H3v18h18v-7',
  plus:'M12 5v14M5 12h14', search:'m21 21-4-4m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  check:'m5 12 4 4L19 6', close:'m6 6 12 12M6 18 18 6', down:'m6 9 6 6 6-6',
  shield:'m12 3 9 4v6c0 5-9 9-9 9s-9-4-9-9V7Zm-5 9 3 3 7-7',
  logout:'M9 3H3v18h6m5-14 5 5-5 5m-7-5h12', menu:'M3 6h18M3 12h18M3 18h18',
  globe:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3c5 6 5 12 0 18-5-6-5-12 0-18',
  clock:'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0'
};
export const icon=(name,size=19)=>'<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(paths[name]||paths.products)+'"/></svg>';
export const badge=(text,type='neutral')=>'<span class="badge '+e(type)+'">'+e(text)+'</span>';
export const btn=(action,text,cls='',attrs='')=>'<button type="button" class="button '+cls+'" data-action="'+e(action)+'" '+attrs+'>'+text+'</button>';
export function art(product,large=false) {
  const category=product.category||'',name=product.name.toLowerCase();
  let shape;
  if(name.includes('tote')||name.includes('basket')) shape='<path d="M66 78q0-36 30-36t30 36" fill="none" stroke="#675841" stroke-width="8"/><path d="m48 76 9 92q40 15 78 0l9-92Z" fill="currentColor"/><path d="m65 91 7 66m56-66-7 66" stroke="#ffffff" opacity=".3" stroke-width="3"/>';
  else if(name.includes('bottle')) shape='<rect x="79" y="27" width="36" height="22" rx="5" fill="#3d4b43"/><path d="M80 47h33v20q18 12 18 30v69q-34 18-68 0V97q0-18 17-30Z" fill="currentColor"/><path d="M77 95v61" stroke="#fff" opacity=".2" stroke-width="8"/>';
  else if(name.includes('cup')) shape='<path d="M125 80h16q28 29-14 40" fill="none" stroke="currentColor" stroke-width="12"/><path d="M54 65h78l-6 81q-33 16-66 0Z" fill="currentColor"/><ellipse cx="93" cy="65" rx="39" ry="9" fill="#443329"/><ellipse cx="93" cy="68" rx="30" ry="5" fill="#694b39"/>';
  else if(name.includes('planter')) shape='<path d="M92 79q-56-17-36-47 37 0 36 47m1-2q-9-52 20-61 27 31-20 61m4 0q24-39 47-19-3 26-47 19" fill="#4d7850"/><path d="m62 82 12 77q22 12 47 0l12-77Z" fill="currentColor"/><rect x="55" y="78" width="84" height="16" rx="3" fill="currentColor"/>';
  else if(name.includes('notebook')) shape='<path d="m58 39 78 9v123l-78-9Z" fill="currentColor"/><path d="m59 40-9 8v119l9-5m0-122v122" stroke="#4a5058" fill="#dce1dd" stroke-width="4"/><path d="m77 77 42 5m-42 9 31 3" stroke="#fff" opacity=".6" stroke-width="2"/>';
  else if(name.includes('cushion')||name.includes('towel')) shape='<path d="M46 55q50 8 102 0-12 56 0 109-51-10-102 0 10-54 0-109Z" fill="currentColor"/><path d="M58 68h78v83H58Z" stroke="#fff" opacity=".25" stroke-width="2" fill="none"/>';
  else shape='<path d="m43 91 80-33 38 32-80 36Z" fill="currentColor"/><path d="M43 91v51l38 23v-39m0 39 80-35V90" fill="currentColor"/><path d="m43 91 38 35 80-36M81 126v39" fill="none" stroke="#533e2c" opacity=".3" stroke-width="3"/>';
  return '<div class="product-art '+(large?'large':'')+'" style="--product:'+e(product.colour)+'"><svg viewBox="0 0 200 200" role="img" aria-label="'+e(product.name)+'"><ellipse cx="99" cy="178" rx="60" ry="8" fill="#2b352b" opacity=".08"/><g style="color:var(--product)">'+shape+'</g></svg></div>';
}
