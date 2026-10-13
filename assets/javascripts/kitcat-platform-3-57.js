/* KITCAT LAB 3.57: reading progress only, compatible with Material instant navigation. */
(function(){
  'use strict';
  function mount(){
    var id='kitcat-read-progress',el=document.getElementById(id);
    if(!el){el=document.createElement('div');el.id=id;el.setAttribute('aria-hidden','true');document.body.appendChild(el)}
    function draw(){
      var doc=document.documentElement;
      var total=Math.max(0,doc.scrollHeight-innerHeight);
      el.style.width=(total?Math.min(100,Math.max(0,scrollY/total*100)):0).toFixed(1)+'%';
    }
    if(window.__kitcatReadProgressDetach)window.__kitcatReadProgressDetach();
    window.addEventListener('scroll',draw,{passive:true});
    window.addEventListener('resize',draw,{passive:true});
    window.__kitcatReadProgressDetach=function(){window.removeEventListener('scroll',draw);window.removeEventListener('resize',draw)};
    draw();
  }
  if(typeof document$!=='undefined'&&document$&&typeof document$.subscribe==='function')document$.subscribe(mount);
  else if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
