const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:0.08});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));}
const toggle=document.querySelector('.menu-toggle');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',open);toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.querySelector('.nav-row').classList.toggle('open',open);document.querySelector('.header-top').classList.toggle('open',open)});
const dialog=document.querySelector('#quote-dialog');let quote=[];try{quote=JSON.parse(localStorage.getItem('edtech-concept-quote')||'[]');if(!Array.isArray(quote))quote=[]}catch{}
const allowed=[...document.querySelectorAll('[data-product]')].map(e=>e.dataset.product);quote=quote.filter(x=>allowed.includes(x));let toastTimer;
function toast(message){const box=document.querySelector('.toast');box.textContent=message;box.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('show'),2800)}
function renderQuote(){document.querySelector('#quote-count').textContent=quote.length;const list=document.querySelector('#quote-items');list.replaceChildren();if(!quote.length){const li=document.createElement('li');li.textContent='Your list is empty. Add a featured product to get started.';list.append(li)}quote.forEach(name=>{const li=document.createElement('li');li.className='quote-item';const text=document.createElement('span');text.textContent=name;const button=document.createElement('button');button.className='remove-quote';button.textContent='Remove';button.setAttribute('aria-label','Remove '+name);button.onclick=()=>{quote=quote.filter(x=>x!==name);renderQuote()};li.append(text,button);list.append(li)});const link=document.querySelector('#request-quote');link.hidden=!quote.length;link.style.display=quote.length?'':'none';link.href='https://www.edtech.ie/contact-us/';document.querySelector('#copy-quote').style.display=quote.length?'':'none';document.querySelectorAll('[data-product]').forEach(b=>{b.innerHTML=quote.includes(b.dataset.product)?'✓ Added to quote':'+ Add to quote';b.setAttribute('aria-pressed',quote.includes(b.dataset.product))});try{localStorage.setItem('edtech-concept-quote',JSON.stringify(quote))}catch{}}
document.querySelectorAll('[data-product]').forEach(b=>b.onclick=()=>{if(!quote.includes(b.dataset.product)){quote.push(b.dataset.product);toast(b.dataset.product+' added to your quote list');renderQuote()}else dialog.showModal()});
document.querySelector('.quote-open').onclick=()=>dialog.showModal();document.querySelector('.close-dialog').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});renderQuote();

document.querySelector('#copy-quote').onclick=async()=>{try{await navigator.clipboard.writeText('Please send me a quote for:\n'+quote.join('\n'));toast('Product list copied. Paste it into your enquiry.')}catch{toast('Please select and copy the product names above.')}};

// Animate the separator geometry without moving the section or its contents.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const waveShapes=[
'M0 31 C120 -12 240 74 360 31 C480 -12 600 74 720 31 C840 -12 960 74 1080 31 C1200 -12 1320 74 1440 31 V66 H0 Z',
'M0 31 C120 13 240 48 360 31 C480 13 600 48 720 31 C840 13 960 48 1080 31 C1200 13 1320 48 1440 31 V66 H0 Z',
'M0 31 C120 62 240 0 360 31 C480 62 600 0 720 31 C840 62 960 0 1080 31 C1200 62 1320 0 1440 31 V66 H0 Z'
];
function setWaveMotion(){document.querySelectorAll('.wave path').forEach((path,i)=>{path.querySelectorAll('animate').forEach(a=>a.remove());path.setAttribute('d',waveShapes[0]);if(motionPreference.matches)return;const a=document.createElementNS('http://www.w3.org/2000/svg','animate');a.setAttribute('attributeName','d');a.setAttribute('values',[waveShapes[0],waveShapes[1],waveShapes[2],waveShapes[1],waveShapes[0]].join(';'));a.setAttribute('dur',(12+i%3*2)+'s');a.setAttribute('repeatCount','indefinite');a.setAttribute('calcMode','spline');a.setAttribute('keyTimes','0;0.25;0.5;0.75;1');a.setAttribute('keySplines','0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1');path.append(a);a.beginElement()})}
setWaveMotion();motionPreference.addEventListener('change',setWaveMotion);
const shopNav=document.querySelector('.shop-nav'),megaButton=document.querySelector('.mega-toggle'),megaPanel=document.querySelector('.mega-panel');let menuTimer;
function setMega(open){clearTimeout(menuTimer);megaPanel.hidden=!open;megaButton.setAttribute('aria-expanded',String(open));shopNav.classList.toggle('is-open',open)}
megaButton.addEventListener('click',()=>setMega(megaPanel.hidden));
shopNav.addEventListener('pointerenter',()=>{if(matchMedia('(hover:hover) and (min-width:561px)').matches)setMega(true)});
shopNav.addEventListener('pointerleave',()=>{if(matchMedia('(hover:hover) and (min-width:561px)').matches)menuTimer=setTimeout(()=>{if(!shopNav.contains(document.activeElement))setMega(false)},180)});
shopNav.addEventListener('focusout',e=>{if(!shopNav.contains(e.relatedTarget))setMega(false)});
shopNav.addEventListener('keydown',e=>{if(e.key==='Escape'&&!megaPanel.hidden){e.preventDefault();setMega(false);megaButton.focus()}if(e.key==='ArrowDown'&&e.target.closest('.shop-trigger')){e.preventDefault();setMega(true);megaPanel.querySelector('a').focus()}});
document.addEventListener('click',e=>{if(!shopNav.contains(e.target))setMega(false)});
toggle.addEventListener('click',()=>{if(toggle.getAttribute('aria-expanded')==='false')setMega(false)});

// Search suggestions are illustrative popular searches, not live analytics.
const searchForm=document.querySelector('.search'),searchInput=document.querySelector('#search'),suggestions=document.querySelector('#popular-searches');
function setSuggestions(open){suggestions.hidden=!open;searchInput.setAttribute('aria-expanded',String(open))}
searchInput.addEventListener('focus',()=>setSuggestions(true));
searchInput.addEventListener('input',()=>setSuggestions(true));
searchForm.addEventListener('focusout',e=>{if(!searchForm.contains(e.relatedTarget))setSuggestions(false)});
document.addEventListener('click',e=>{if(!searchForm.contains(e.target))setSuggestions(false)});
searchForm.addEventListener('keydown',e=>{if(e.key==='Escape'){setSuggestions(false);searchInput.focus()}if(e.key==='ArrowDown'&&e.target===searchInput){e.preventDefault();setSuggestions(true);suggestions.querySelector('a').focus()}});
document.querySelectorAll('[data-catalog]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-catalog]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-expanded',String(selected));document.querySelector('#catalog-'+b.dataset.catalog).hidden=!selected})}));
