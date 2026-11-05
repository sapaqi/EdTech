const cards=[...document.querySelectorAll('.listing-products .product')],grid=document.querySelector('.listing-products');
const params=new URLSearchParams(location.search);
const form=document.querySelector('#catalog-filter-form'), search=document.querySelector('#product-search'),sort=document.querySelector('#product-sort');
const checks=[...form.querySelectorAll('input[type=checkbox]')];
const groups=['category','needs','education'];
const initialGroup=params.get('group') || (params.has('q')?'All':'Software');
checks.forEach(c=>{c.checked=c.name==='category' && c.value===initialGroup});
search.value=params.get('q')||'';
let applied=[],query='';
function apply(){
 applied=checks.filter(c=>c.checked);
 query=search.value.trim().toLowerCase();
 update();
}
function matches(card,check){
 const d=card.dataset;
 if(check.name==='category'){
  const [group,subcategory]=check.value.split(':');
  return d.group===group && (!subcategory || d.categories.split('|').includes(subcategory));
 }
 return (d[check.name]||'').split('|').includes(check.value);
}
function update(){
 const categories=applied.filter(c=>c.name==='category');
 document.querySelector('#collection-title').textContent=categories.length===1 && ['Software','Hardware'].includes(categories[0].value)?categories[0].value:'All products';
 const sorted=[...cards].sort((a,b)=>sort.value==='name'?a.dataset.name.localeCompare(b.dataset.name):sort.value==='low'?((+a.dataset.price||Infinity)-(+b.dataset.price||Infinity)):sort.value==='high'?+b.dataset.price-+a.dataset.price:+a.dataset.rank-+b.dataset.rank);
 let count=0;
 sorted.forEach(card=>{
  const withinGroups=groups.every(group=>{const selected=applied.filter(c=>c.name===group && !(group==='category' && applied.some(child=>child.name==='category' && child.value.startsWith(c.value+':'))));return !selected.length||selected.some(c=>matches(card,c))});
  card.hidden=!(withinGroups&&(!query||(card.dataset.name+' '+card.dataset.categories+' '+card.dataset.description).toLowerCase().includes(query)));
  if(!card.hidden)count++;
  grid.append(card);
 });
 document.querySelector('#result-count').textContent=count+' product'+(count===1?'':'s');document.querySelector('.no-results').hidden=count!==0;document.querySelector('.collection-end').hidden=count===0;
 const active=document.querySelector('#active-filters');active.replaceChildren();
 applied.forEach(c=>{const label=c.nextElementSibling.textContent;const b=document.createElement('button');b.type='button';b.textContent=label+' ×';b.setAttribute('aria-label','Remove '+label+' filter');b.onclick=()=>{c.checked=false;applied=applied.filter(item=>item!==c);update()};active.append(b)});
}
form.addEventListener('submit',e=>{e.preventDefault();apply();if(filterToggle.getAttribute('aria-expanded')==='true'){setFiltersOpen(false);filterToggle.focus()}});
sort.addEventListener('change',update);
document.querySelectorAll('.clear-filters').forEach(b=>b.onclick=()=>{search.value='';checks.forEach(c=>c.checked=false);apply()});
const filterToggle=document.querySelector('.filter-toggle');
function setFiltersOpen(open){filterToggle.setAttribute('aria-expanded',String(open));form.closest('.filters').classList.toggle('is-open',open)}
filterToggle.onclick=()=>{const open=filterToggle.getAttribute('aria-expanded')!=='true';setFiltersOpen(open);if(open)search.focus()};
const detail=document.querySelector('#product-dialog');let selectedCard;
document.querySelectorAll('.product-peek').forEach(b=>b.onclick=()=>{selectedCard=b.closest('.product');const img=selectedCard.querySelector('img');document.querySelector('#detail-image').src=img.src;document.querySelector('#detail-image').alt=img.alt;document.querySelector('#product-dialog-title').textContent=selectedCard.dataset.name;document.querySelector('#detail-category').textContent=selectedCard.dataset.category;document.querySelector('#detail-description').textContent=selectedCard.dataset.description;document.querySelector('#detail-price').textContent=selectedCard.querySelector('.price').textContent;detail.showModal()});
document.querySelector('.product-dialog-close').onclick=()=>detail.close();document.querySelector('#detail-quote').onclick=()=>{detail.close();selectedCard.querySelector('.quote-add').click()};detail.addEventListener('click',e=>{if(e.target===detail){const r=detail.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)detail.close()}});apply();
