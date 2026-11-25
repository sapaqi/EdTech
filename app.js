const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:0.08});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));}
const toggle=document.querySelector('.menu-toggle');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',open);toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.querySelector('.nav-row').classList.toggle('open',open);document.querySelector('.header-top').classList.toggle('open',open)});
const dialog=document.querySelector('#quote-dialog');let quote=[];try{quote=JSON.parse(localStorage.getItem('edtech-concept-quote')||'[]');if(!Array.isArray(quote))quote=[]}catch{}
quote=quote.filter(x=>typeof x==='string');let toastTimer;
function toast(message){const box=document.querySelector('.toast');box.textContent=message;box.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('show'),2800)}
function renderQuote(){document.querySelector('#quote-count').textContent=quote.length || '€0';const list=document.querySelector('#quote-items');list.replaceChildren();if(!quote.length){const li=document.createElement('li');li.textContent='Your list is empty. Add a product to get started.';list.append(li)}quote.forEach(name=>{const li=document.createElement('li');li.className='quote-item';const text=document.createElement('span');text.textContent=name;const button=document.createElement('button');button.className='remove-quote';button.textContent='Remove';button.setAttribute('aria-label','Remove '+name);button.onclick=()=>{quote=quote.filter(x=>x!==name);renderQuote()};li.append(text,button);list.append(li)});const link=document.querySelector('#request-quote');link.hidden=!quote.length;link.style.display=quote.length?'':'none';link.href='https://www.edtech.ie/contact-us/';document.querySelector('#copy-quote').style.display=quote.length?'':'none';document.querySelectorAll('[data-product]').forEach(b=>{b.innerHTML=quote.includes(b.dataset.product)?'<svg class="ui-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg> Added to quote':(b.dataset.quoteLabel || '<svg class="ui-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7v14"/></svg> Add to quote');b.setAttribute('aria-pressed',quote.includes(b.dataset.product))});try{localStorage.setItem('edtech-concept-quote',JSON.stringify(quote))}catch{}}
document.querySelectorAll('[data-product]').forEach(b=>b.onclick=()=>{if(!quote.includes(b.dataset.product)){quote.push(b.dataset.product);toast(b.dataset.product+' added to your quote list');renderQuote()}else dialog.showModal()});
const quoteTrigger=document.querySelector('[data-open-quote]');
quoteTrigger.addEventListener('click',e=>{e.preventDefault();dialog.showModal()});
quoteTrigger.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();quoteTrigger.click()}});document.querySelector('.close-dialog').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});renderQuote();

document.querySelector('#copy-quote').onclick=async()=>{try{await navigator.clipboard.writeText('Please send me a quote for:\n'+quote.join('\n'));toast('Product list copied. Paste it into your enquiry.')}catch{toast('Please select and copy the product names above.')}};

// Animate the separator geometry without moving the section or its contents.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
// Smooth continuous shape motion, evaluated every frame without easing holds.
let waveFrame;
function setWaveMotion(){
 cancelAnimationFrame(waveFrame);
 const paths=[...document.querySelectorAll('.wave path')];
 paths.forEach(path=>{path.querySelectorAll('animate,animateTransform').forEach(a=>a.remove());path.removeAttribute('transform')});
 function draw(time){
  const phase=time*(1-0.33)/8000*Math.PI*2;
  paths.forEach((path,index)=>{
   // Four stationary sine periods; only their height changes over time.
   // Matching endpoint slopes keep every join smooth.
   const width=1440, wavelength=360, step=22.5;
   const localPhase=phase+index*Math.PI*(3-Math.sqrt(5));
   const amplitude=14+6*Math.sin(localPhase);
   const baseline=31+2*Math.cos(localPhase);
   const frequency=2*Math.PI/wavelength;
   const y=x=>baseline+amplitude*Math.sin(frequency*x);
   const slope=x=>amplitude*frequency*Math.cos(frequency*x);
   let d='M0 '+y(0).toFixed(3);
   for(let x=0;x<width;x+=step){
    const end=x+step;
    d+=' C'+(x+step/3)+' '+(y(x)+slope(x)*step/3).toFixed(3)
      +' '+(end-step/3)+' '+(y(end)-slope(end)*step/3).toFixed(3)
      +' '+end+' '+y(end).toFixed(3);
   }
   path.setAttribute('d',d+' V66 H0 Z');
  });
  if(!motionPreference.matches)waveFrame=requestAnimationFrame(draw);
 }
 draw(motionPreference.matches?0:performance.now());
}
setWaveMotion();motionPreference.addEventListener('change',setWaveMotion);
// Shared Products / Specific Needs megamenu behaviour.
const menuControls=[];
document.querySelectorAll('.shop-nav').forEach(nav=>{
 const button=nav.querySelector('.mega-toggle'),panel=nav.querySelector('.mega-panel');let timer;
 function setOpen(open){clearTimeout(timer);if(open)menuControls.forEach(m=>{if(m.nav!==nav)m.close()});panel.hidden=!open;button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)}
 menuControls.push({nav,close:()=>setOpen(false)});
 button.addEventListener('click',()=>setOpen(panel.hidden));
 nav.addEventListener('pointerenter',()=>{if(matchMedia('(hover:hover) and (width > 39rem)').matches)setOpen(true)});
 nav.addEventListener('pointerleave',()=>{if(matchMedia('(hover:hover) and (width > 39rem)').matches)timer=setTimeout(()=>{if(!nav.contains(document.activeElement))setOpen(false)},180)});
 nav.addEventListener('focusout',e=>{if(!nav.contains(e.relatedTarget))setOpen(false)});
 nav.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();setOpen(false);button.focus()}if(e.key==='ArrowDown'&&e.target.closest('.shop-trigger')){e.preventDefault();setOpen(true);panel.querySelector('button,a').focus()}});
 panel.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
 document.addEventListener('click',e=>{if(!nav.contains(e.target))setOpen(false)});
 toggle.addEventListener('click',()=>{if(toggle.getAttribute('aria-expanded')==='false')setOpen(false)});
});
const stickyHeader=document.querySelector('header');
function updateHeaderOffset(){document.documentElement.style.setProperty('--header-height',stickyHeader.getBoundingClientRect().height+'px')}
updateHeaderOffset();new ResizeObserver(updateHeaderOffset).observe(stickyHeader);

// Search suggestions are illustrative popular searches, not live analytics.
const searchForm=document.querySelector('.search'),searchInput=document.querySelector('#search'),suggestions=document.querySelector('#popular-searches');
function setSuggestions(open){suggestions.hidden=!open;searchInput.setAttribute('aria-expanded',String(open))}
searchInput.addEventListener('focus',()=>setSuggestions(true));
searchInput.addEventListener('input',()=>setSuggestions(true));
searchForm.addEventListener('focusout',e=>{if(!searchForm.contains(e.relatedTarget))setSuggestions(false)});
document.addEventListener('click',e=>{if(!searchForm.contains(e.target))setSuggestions(false)});
searchForm.addEventListener('keydown',e=>{if(e.key==='Escape'){setSuggestions(false);searchInput.focus()}if(e.key==='ArrowDown'&&e.target===searchInput){e.preventDefault();setSuggestions(true);suggestions.querySelector('a').focus()}});
document.querySelectorAll('[data-catalog]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-catalog]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-expanded',String(selected));document.querySelector('#catalog-'+b.dataset.catalog).hidden=!selected})}));
