const options=document.querySelector('.detail-options');
const license=document.querySelector('#license-type');
function updateLicense(){
 const selected=license.selectedOptions[0], active=Boolean(license.value);
 document.querySelector('#dragon-price').textContent=selected.dataset.price||'€695.00 – €794.00';
 document.querySelector('#dragon-sku').textContent=selected.dataset.sku||'N-DNS16';
 options.querySelector('.detail-clear').hidden=!active;

}
license.addEventListener('change',updateLicense);
options.addEventListener('reset',()=>requestAnimationFrame(updateLicense));
updateLicense();

const quoteAction=options.querySelector('[data-product]');
quoteAction.addEventListener('click',event=>{
 if(!license.reportValidity()){event.preventDefault();event.stopImmediatePropagation()}
},true);
const gallery=document.querySelector('.detail-gallery');
const stage=gallery.querySelector('.detail-image');
const views=[...gallery.querySelectorAll('.detail-thumbnails button')];
views.forEach(button=>button.addEventListener('click',()=>{
 stage.dataset.view=button.dataset.view;
 views.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
