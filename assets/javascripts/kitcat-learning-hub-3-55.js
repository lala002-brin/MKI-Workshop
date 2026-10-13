(function(){'use strict';
const PATHS={
 foundation:{name:'Foundation first',description:'Bangun pemahaman sebelum menjalankan perhitungan.',items:[['Konsep DFT','../quantum-simulation/theory/dft-overview/'],['Akses Linux & HPC','../environment/access-linux/'],['Command Line','../environment/command-line/'],['Workflow SCF','../quantum-simulation/hands-on/scf/']]},
 simulation:{name:'Simulation workflow',description:'Mulai dari lingkungan komputasi lalu jalankan dan tinjau simulasi.',items:[['Software Environment','../environment/software-environment/'],['Running Calculations','../environment/running-calculations/'],['Quantum ESPRESSO Workspace','../Modul_QE_Interaktif/'],['SIESTA Research Gateway','../Modul_SIESTA_Interaktif/']]},
 analysis:{name:'Analysis & visualization',description:'Baca hasil simulasi dan olah data sebelum membuat figure ilmiah.',items:[['QE Core Inspector','../Modul_QE_Interaktif/qe-core-inspector/'],['DOS / PDOS / Band Structure','../Modul_QE_Interaktif/electronic-structure-studio/'],['Charge Density Studio','../Modul_QE_Interaktif/charge-density-studio/'],['Research Cases','../hands-on-project/']]}
};
const KEY='kitcat-learning-hub-355';
function init(){const root=document.getElementById('kc-learning-hub');if(!root||root.dataset.initialized)return;root.dataset.initialized='1';
let state={};try{state=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){};
let active='foundation';const list=root.querySelector('#kc-learning-steps'),progress=root.querySelector('#kc-path-progress'),bar=root.querySelector('#kc-path-bar');
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}};
function render(){const p=PATHS[active];root.querySelector('#kc-path-name').textContent=p.name;root.querySelector('#kc-path-description').textContent=p.description;
root.querySelectorAll('[data-path]').forEach(btn=>{const selected=btn.dataset.path===active;btn.classList.toggle('is-active',selected);btn.setAttribute('aria-pressed',String(selected))});list.replaceChildren();const checked=state[active]||[];
p.items.forEach(([label,url],index)=>{const li=document.createElement('li'),input=document.createElement('input');input.type='checkbox';input.checked=checked.includes(index);input.setAttribute('aria-label','Tandai selesai: '+label);const a=document.createElement('a');a.href=url;a.textContent=label+' →';input.addEventListener('change',()=>{const s=new Set(state[active]||[]);input.checked?s.add(index):s.delete(index);state[active]=[...s];save();renderProgress()});li.append(input,a);list.append(li)});renderProgress()}
function renderProgress(){const done=list.querySelectorAll('input:checked').length;progress.textContent=done+' / '+PATHS[active].items.length+' selesai';bar.style.width=(done/PATHS[active].items.length*100)+'%';list.querySelectorAll('li').forEach(li=>li.classList.toggle('is-done',li.querySelector('input').checked))}
root.querySelectorAll('[data-path]').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.path;render()}));root.querySelector('#kc-reset-progress').addEventListener('click',()=>{state[active]=[];save();render()});render();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
if(typeof document$!=='undefined')document$.subscribe(init);
})();
