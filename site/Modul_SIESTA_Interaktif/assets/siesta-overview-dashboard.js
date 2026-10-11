(function(){
  'use strict';
  function init(){
    const root=document.getElementById('siesta-hub');
    if(!root||root.dataset.hubReady==='1')return;
    root.dataset.hubReady='1';
    const input=root.querySelector('#shub-search');
    const buttons=Array.from(root.querySelectorAll('.shub-filters [data-filter]'));
    const tools=Array.from(root.querySelectorAll('.shub-tool[data-category]'));
    const counter=root.querySelector('#shub-visible-count');
    const empty=root.querySelector('#shub-no-results');
    let filter='all';
    const normalize=s=>(s||'').toLocaleLowerCase('id').trim();
    function update(){
      const q=normalize(input.value);
      let visible=0;
      tools.forEach(tool=>{
        const okCategory=filter==='all'||tool.dataset.category===filter;
        const okText=normalize(tool.textContent).includes(q);
        const show=okCategory&&okText;
        tool.hidden=!show;
        if(show)visible++;
      });
      counter.textContent=visible+' / '+tools.length+' tools';
      empty.hidden=visible!==0;
    }
    input.addEventListener('input',update);
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      filter=btn.dataset.filter;
      buttons.forEach(b=>{
        const active=b===btn;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));
      });
      update();
    }));
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  document.addEventListener('DOMContentLoaded',init);
})();
