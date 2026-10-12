import {createStructure} from '../../src/structure-core.mjs';
import {makeSlabCubic,terminationCandidates} from '../slab-core.mjs';
import {identifyAtomicLayers,applyFrozenBottomLayers,qeGeometryWithConstraints} from '../layer-constraints.mjs';
import {diagnoseSlab} from '../surface-diagnostics.mjs';
import {compareTerminations} from '../termination-verification.mjs';
const $=id=>document.getElementById(id);
const fcc=[[0,0,0],[0,.5,.5],[.5,0,.5],[.5,.5,0]];
const atoms=[...fcc.map((fractional,i)=>({id:`Na-${i}`,element:'Na',fractional})),...fcc.map((fractional,i)=>({id:`Cl-${i}`,element:'Cl',fractional:fractional.map(x=>(x+.5)%1)}))];
const bulk=createStructure({lattice:[[5.64,0,0],[0,5.64,0],[0,0,5.64]],atoms});
const tests=[];const add=(name,fn)=>tests.push({name,fn});
const check=(p,msg)=>{if(!p)throw Error(msg||'Assertion failed')};
for(const [hkl,count] of [['001',24],['110',48],['111',144]]){
 add(`NaCl (${hkl}): jumlah atom dan orientasi`,()=>{const x=makeSlabCubic(bulk,{hkl,layers:3,vacuum:15});check(x.structure.atoms.length===count,`actual=${x.structure.atoms.length}, expected=${count}`);check(x.diagnostics.hkl===hkl)});
 add(`NaCl (${hkl}): kandidat terminasi & stoikiometri`,()=>{const a=terminationCandidates(bulk,{hkl,layers:3,vacuum:15});check(a.length>0,'tidak ada kandidat');for(const c of a){check(c.structure.atoms.length===count,'jumlah atom berubah');check(c.diagnostics.totalComposition.Na===count/2,'Na berbeda');check(c.diagnostics.totalComposition.Cl===count/2,'Cl berbeda');check(c.diagnostics.emptyCellIntervalAngstrom>=15-1e-8,'vakum tidak sesuai');}});
}
add('NaCl (111): pilihan potong berbeda',()=>{const a=terminationCandidates(bulk,{hkl:'111',layers:3,vacuum:15});check(a.length>=2,'kandidat kurang dari 2');check(a[0].cutFraction!==a[1].cutFraction,'potongan sama')});
add('Kandidat: status geometry draft',()=>{const a=terminationCandidates(bulk,{hkl:'111',layers:3,vacuum:15});const r=compareTerminations(a,bulk);check(r.modelStatus==='GEOMETRY_DRAFT');check(r.candidates.length===a.length);check(r.notVerified.some(s=>s.includes('polarity')))});
add('Kandidat: ID atom unik',()=>{const a=terminationCandidates(bulk,{hkl:'111',layers:3,vacuum:15});for(const c of a)check(new Set(c.structure.atoms.map(x=>x.id)).size===c.structure.atoms.length,'ID ganda')});
add('Layer grouping dan freeze satu lapisan bawah',()=>{const x=makeSlabCubic(bulk,{hkl:'001',layers:3,vacuum:15}).structure;const n=identifyAtomicLayers(x).length;check(n>1,'lapisan tidak ditemukan');const frozen=applyFrozenBottomLayers(x,{count:1});check(frozen.frozenAtomCount>0 && frozen.frozenAtomCount<x.atoms.length,'freeze salah');check(frozen.structure.atoms.filter(a=>a.fixedAxes?.every(Boolean)).length===frozen.frozenAtomCount,'flag tak konsisten')});
add('QE constraints: fixed/free flags',()=>{const x=makeSlabCubic(bulk,{hkl:'001',layers:3,vacuum:15}).structure;const f=applyFrozenBottomLayers(x,{count:1});const txt=qeGeometryWithConstraints(f.structure);check(/0 0 0/.test(txt)&&/1 1 1/.test(txt),'flag QE tidak lengkap');check(/GEOMETRY ONLY/.test(txt),'status ekspor tidak jelas')});
add('Surface diagnostics: tidak mengklaim polaritas',()=>{const s=makeSlabCubic(bulk,{hkl:'111',layers:3,vacuum:15}).structure;const d=diagnoseSlab(s,{bulkInput:bulk});check(d.issues.some(x=>x.code==='POLARITY_UNVERIFIED'),'tidak ada peringatan polaritas')});
add('Reject sel nonkubik',()=>{let rejected=false;try{makeSlabCubic({...bulk,lattice:[[5,0,0],[0,6,0],[0,0,7]]},{hkl:'111'})}catch{rejected=true}check(rejected,'sel nonkubik diterima')});
let latest=null;
$('run').addEventListener('click',()=>{const results=tests.map(({name,fn})=>{try{fn();return {name,status:'PASS'}}catch(e){return {name,status:'FAIL',error:String(e.message||e)}}});latest={schema:'kitcat.surface.browser-audit.v0.9',date:new Date().toISOString(),modelStatus:'GEOMETRY_DRAFT',browser:navigator.userAgent,summary:{total:results.length,passed:results.filter(x=>x.status==='PASS').length,failed:results.filter(x=>x.status==='FAIL').length},notVerified:['Independent crystal reference comparison','QE pw.x execution and convergence','Polar surface formal charge and electrostatics','Browser UI interaction / full workflow'],results};$('summary').textContent=`${latest.summary.passed}/${latest.summary.total} PASS · ${latest.summary.failed} FAIL`;$('results').innerHTML='';for(const r of results){const tr=document.createElement('tr');for(const t of [r.name,r.status,r.error||'—']){const td=document.createElement('td');td.textContent=t;tr.appendChild(td)}tr.className=r.status==='PASS'?'pass':'fail';$('results').appendChild(tr)}$('download').disabled=false;});
$('download').addEventListener('click',()=>{if(!latest)return;const blob=new Blob([JSON.stringify(latest,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='kitcat-surface-audit-v09.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)});
