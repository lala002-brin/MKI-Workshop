import {compareTerminations} from './termination-verification.mjs';
import {createSlabViewer} from './slab-viewer.mjs';
import {generateValidatedPWInput} from '../src/qe-validated.mjs';
import {diagnoseSlab} from './surface-diagnostics.mjs';
import {createStructure} from '../src/structure-core.mjs';
import {terminationCandidates} from './slab-core.mjs';
import {identifyAtomicLayers,applyFrozenBottomLayers,qeGeometryWithConstraints} from './layer-constraints.mjs';
const $=id=>document.getElementById(id);let bulk=null,out=null,candidates=[],baseCandidate=null,comparisonReport=null,lastPW=null,activeGrouping=null;
const viewer=createSlabViewer($('view3d'),$('viewer-note'),picked=>{
 if(!picked||!out){$('selected-atom').textContent='Belum ada atom dipilih.';return;}
 const a=picked.atom, hkl=$('hkl').value, tol=Number($('layer-tolerance').value);
 let layerNumber='tidak diketahui';
 try{const groups=identifyAtomicLayers(out.structure,{toleranceAngstrom:tol});const group=groups.find(l=>l.atomIds.includes(a.id));if(group)layerNumber=group.index;}catch(e){layerNumber='gagal: '+e.message;}
 const f=a.fractional, cart=out.structure.lattice[0].map((_,i)=>f.reduce((t,x,j)=>t+x*out.structure.lattice[j][i],0));
 const frozen=a.fixedAxes?.every(Boolean)||a.selectiveDynamics?.every(v=>v===false);
 $('selected-atom').textContent=`Atom: ${a.id} | unsur: ${a.element} | layer: ${layerNumber} | ${frozen?'FROZEN':'FREE'}\nFraksional: ${f.map(n=>n.toFixed(6)).join(', ')}\nKartesian (Å): ${cart.map(n=>n.toFixed(6)).join(', ')}\nOrientasi: (${hkl})`;
});
$('vreset').onclick=()=>viewer.reset();$('highlight-layer').onchange=e=>{if(!out)return;try{const layers=identifyAtomicLayers(out.structure,{toleranceAngstrom:Number($('layer-tolerance').value)});const l=layers.find(x=>String(x.index)===e.target.value);viewer.highlightLayer(l?.atomIds||[])}catch(err){$('selected-atom').textContent=err.message}};$('vlabels').onchange=e=>viewer.setLabels(e.target.checked);
function message(s){$('status').textContent=s}function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
const fcc=[[0,0,0],[0,.5,.5],[.5,0,.5],[.5,.5,0]];
function demo(){const atoms=[...fcc.map((f,i)=>({id:`Na-${i+1}`,element:'Na',fractional:f})),...fcc.map((f,i)=>({id:`Cl-${i+1}`,element:'Cl',fractional:f.map(x=>(x+.5)%1)}))];bulk=createStructure({lattice:[[5.64,0,0],[0,5.64,0],[0,0,5.64]],atoms,metadata:{source:'synthetic NaCl conventional cell for demonstration'}});$('source').textContent='NaCl · 8 atom · a=5.64 Å (ilustratif)';message('Bulk dimuat. Pilih jumlah lapisan dan vakum.');candidates=[];showComparison();out=null;viewer.setStructure(null);candidates=[];$('termination').replaceChildren();$('diagnostics').textContent='Belum ada slab untuk diperiksa.';toggle(false);invalidateQE('Belum ada slab aktif. Bangun dan pilih kandidat, lalu periksa konfigurasi QE.')}
function toggle(x){$('save').disabled=!x;$('qe').disabled=!x;$('freeze').disabled=!x;$('qe-check').disabled=!x;$('qe-full').disabled=!x}
function invalidateQE(reason){lastPW=null;$('qe-report').textContent=reason;}
function render(s){viewer.setStructure(s);$('selected-atom').textContent='Klik atom pada viewer untuk melihat detail.';const svg=$('view');svg.replaceChildren();const ns='http://www.w3.org/2000/svg';let background=document.createElementNS(ns,'rect');Object.entries({x:30,y:20,width:540,height:260,fill:'none',stroke:'#8bb6dd','stroke-width':2}).forEach(([k,v])=>background.setAttribute(k,v));svg.append(background);const coords=s.atoms.map(a=>({x:30+540*((a.fractional[0]%1+1)%1),y:280-260*a.fractional[2],element:a.element}));for(const p of coords){const c=document.createElementNS(ns,'circle');Object.entries({cx:p.x,cy:p.y,r:4.5,fill:p.element==='Na'?'#57a9ff':'#86d1a8',opacity:.78}).forEach(([k,v])=>c.setAttribute(k,v));svg.append(c)}}
// KITCAT_TERMINATION_GROUPS_V093: descriptive fingerprint, not symmetry equivalence.
function candidateFingerprint(candidate){
 const atoms=candidate.structure.atoms;
 if(!atoms.length)throw Error('Kandidat kosong');
 const z0=Math.min(...atoms.map(a=>a.fractional[2]));
 return atoms.map(a=>`${a.element}:${a.fractional[0].toFixed(6)}:${a.fractional[1].toFixed(6)}:${(a.fractional[2]-z0).toFixed(6)}`).sort().join('|');
}
function candidateGrouping(list){
 const indices=new Map();const groups=[];const assignments=[];
 list.forEach((candidate,i)=>{
  const key=candidateFingerprint(candidate);
  if(!indices.has(key)){indices.set(key,groups.length);groups.push({group:groups.length+1,indices:[]})}
  const g=groups[indices.get(key)];g.indices.push(i+1);assignments.push(g.group);
 });
 return {method:'fractional xy + bottom-relative fractional z + element, 6 decimals',notSymmetryProof:true,groups,assignments};
}
function updateRepresentativeButton(){
 const button=$('choose-representative');
 if(!activeGrouping||!baseCandidate){button.disabled=true;return;}
 const index=candidates.indexOf(baseCandidate);
 const group=activeGrouping.groups.find(g=>g.indices.includes(index+1));
 button.disabled=!group||group.indices[0]===index+1;
 button.textContent=group?`Pilih wakil grup ${group.group}: kandidat ${group.indices[0]}`:'Pilih representatif grup kandidat aktif';
}
function updateGroupSummary(){
 const el=$('group-summary');
 if(!activeGrouping){el.textContent='Belum ada kandidat; jalankan pencarian terminasi.';return;}
 const n=candidates.length,k=activeGrouping.groups.length;
 el.textContent=`${n} bidang potong diperiksa · ${k} grup fingerprint geometri · ${n-k} kandidat berada di luar wakil grup. ${activeGrouping.groups.map(g=>`Grup ${g.group}: ${g.indices.join(', ')}`).join(' | ')}. Ini bukan klasifikasi simetri kristalografi.`;
}
function filterComparisonRows(){
 const only=$('representatives-only').checked;
 document.querySelectorAll('#termination-comparison tbody tr[data-candidate-index]').forEach(tr=>{
  const i=Number(tr.dataset.candidateIndex);
  const group=activeGrouping?.groups.find(g=>g.indices.includes(i+1));
  tr.hidden=Boolean(only&&group&&group.indices[0]!==i+1);
 });
}
$('representatives-only').onchange=filterComparisonRows;
$('choose-representative').onclick=()=>{
 if(!activeGrouping||!baseCandidate)return;
 const index=candidates.indexOf(baseCandidate), group=activeGrouping.groups.find(g=>g.indices.includes(index+1));
 if(!group)return;
 const representative=group.indices[0]-1;
 $('termination').value=String(representative);
 chooseCandidate(representative);
};
function showComparison(){
 const tbody=$('termination-comparison').querySelector('tbody');tbody.replaceChildren();comparisonReport=null;activeGrouping=null;$('download-comparison').disabled=true;$('choose-representative').disabled=true;updateGroupSummary();
 if(!candidates.length){const tr=tbody.insertRow();tr.insertCell().colSpan=7;tr.cells[0].textContent='Belum ada kandidat.';$('comparison-report').textContent='Belum ada kandidat yang diaudit.';return;}
 try{
  comparisonReport=compareTerminations(candidates,bulk);
  const grouping=candidateGrouping(candidates);
  activeGrouping=grouping;updateGroupSummary();
  comparisonReport.candidateGrouping=grouping;
  for(const row of comparisonReport.candidates){
   const tr=tbody.insertRow();tr.dataset.active=String(candidates.indexOf(baseCandidate)===row.index);tr.dataset.candidateIndex=String(row.index);tr.tabIndex=0;
   const group=grouping.assignments[row.index];tr.title='Fingerprint group '+group+' — bukan bukti ekuivalensi simetri';
   for(const value of [row.id,row.cutPercent.toFixed(2),row.atomCount,JSON.stringify(row.top),JSON.stringify(row.bottom),row.emptyAngstrom.toFixed(3),row.issues.length?row.issues.join('; '):'STATIC PASS'])tr.insertCell().textContent=String(value);
   tr.cells[0].textContent+=' · grup '+group;
   const choose=()=>{$('termination').value=String(row.index);chooseCandidate(row.index)};
   tr.onclick=choose;tr.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose()}};
  }
  $('candidate-count').textContent+=` · ${grouping.groups.length} fingerprint geometri berbeda dari ${candidates.length} kandidat (bukan ekuivalensi simetri).`;
  $('download-comparison').disabled=false;filterComparisonRows();updateRepresentativeButton();
  $('comparison-report').textContent=JSON.stringify({status:comparisonReport.status,summary:comparisonReport.summary,candidateGrouping:grouping,notVerified:[...comparisonReport.notVerified,'Fingerprint tidak menguji rotasi/translasi kisi lateral, rekontruksi atau ekuivalensi simetri penuh']},null,2);
 }catch(err){$('comparison-report').textContent='Audit tidak dapat dijalankan: '+err.message}
}
$('download-comparison').onclick=()=>{if(comparisonReport)download(JSON.stringify(comparisonReport,null,2),'kitcat-termination-comparison-DRAFT.json','application/json')};
$('demo').onclick=demo;
$('upload').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;const data=JSON.parse(await file.text());bulk=createStructure(data.structure||data);$('source').textContent=`${file.name} · ${bulk.atoms.length} atom`;out=null;viewer.setStructure(null);candidates=[];showComparison();$('termination').replaceChildren();$('diagnostics').textContent='Belum ada slab untuk diperiksa.';toggle(false);invalidateQE('Belum ada slab aktif. Bangun dan pilih kandidat, lalu periksa konfigurasi QE.');message('JSON diimpor; bentuk bulk dan lattice harus diperiksa sebelum membangun slab.')}catch(err){message('Gagal impor: '+err.message)}};
function showDiagnostics(){if(!out)return;try{const d=diagnoseSlab(out.structure,{bulkInput:bulk,layerToleranceAngstrom:Number($('layer-tolerance').value),minimumVacuumAngstrom:Number($('vac-threshold').value)});$('diagnostics').textContent=JSON.stringify(d,null,2)}catch(e){$('diagnostics').textContent='Diagnostics unavailable: '+e.message}}
$('vac-threshold').onchange=showDiagnostics;
$('layer-tolerance').onchange=()=>{if(out){showLayers(out.structure);showDiagnostics()}};
function showLayers(structure){
 const tol=Number($('layer-tolerance').value);
 try {const layerList=identifyAtomicLayers(structure,{toleranceAngstrom:tol});
   $('layer-count').textContent=`${layerList.length} lapisan atom terdeteksi (toleransi ${tol} Å).`;
   $('layer-details').textContent=layerList.map(l=>`Layer ${l.index}: z=${l.heightAngstrom.toFixed(4)} Å; ${l.atomCount} atom; ${JSON.stringify(l.composition)}`).join('\n');
   $('freeze-count').max=String(layerList.length);
   const selector=$('highlight-layer'),previous=selector.value;selector.replaceChildren();
   const all=document.createElement('option');all.value='';all.textContent='Semua lapisan';selector.append(all);
   for(const layer of layerList){const o=document.createElement('option');o.value=String(layer.index);o.textContent=`Layer ${layer.index} · ${layer.atomCount} atom · z=${layer.heightAngstrom.toFixed(2)} Å`;selector.append(o)}
   if([...selector.options].some(o=>o.value===previous))selector.value=previous;
   viewer.highlightLayer(layerList.find(l=>String(l.index)===selector.value)?.atomIds||[]);
 } catch(err){$('layer-count').textContent='Gagal identifikasi lapisan: '+err.message;$('layer-details').textContent='';}
}
$('freeze').onclick=()=>{try{
 if(!baseCandidate)throw Error('Buat dan pilih kandidat slab dahulu');
 const res=applyFrozenBottomLayers(baseCandidate.structure,{count:Number($('freeze-count').value),toleranceAngstrom:Number($('layer-tolerance').value)});
 out={structure:res.structure,diagnostics:{...baseCandidate.diagnostics,atomicLayers:res.layers.length,frozenBottomLayers:Number($('freeze-count').value),frozenAtoms:res.frozenAtomCount,freeAtoms:res.freeAtomCount,layerToleranceAngstrom:Number($('layer-tolerance').value),constraintStatus:'FULLY-FROZEN/FREE ONLY — DRAFT'}};
 $('metrics').textContent=JSON.stringify(out.diagnostics,null,2);render(out.structure);showLayers(out.structure);showDiagnostics();invalidateQE('Constraints lapisan berubah. Periksa kembali konfigurasi QE sebelum ekspor.');
 message(`Constraints diterapkan: ${res.frozenAtomCount} atom beku, ${res.freeAtomCount} atom bebas. Geometri tetap DRAFT.`);
}catch(err){message('Gagal mengatur constraints: '+err.message)}};
function chooseCandidate(index){
 const selected=candidates[index];if(!selected)return;
 baseCandidate=selected; out={structure:selected.structure,diagnostics:selected.diagnostics};invalidateQE('Kandidat slab aktif berubah. Jalankan pemeriksaan konfigurasi QE untuk kandidat ini.');
 showLayers(out.structure);showDiagnostics(); 
 message(`Kandidat terminasi geometris ${selected.id} dibuat sebagai DRAFT. Atas: ${JSON.stringify(selected.diagnostics.topLayer)}; bawah: ${JSON.stringify(selected.diagnostics.bottomLayer)}. Polaritas dan stabilitas BELUM diketahui.`);
 $('metrics').textContent=JSON.stringify(out.diagnostics,null,2);render(out.structure);toggle(true);
 document.querySelectorAll('#termination-comparison tbody tr[data-candidate-index]').forEach(tr=>tr.dataset.active=String(Number(tr.dataset.candidateIndex)===index));updateRepresentativeButton();
}
$('termination').onchange=e=>chooseCandidate(Number(e.target.value));
$('build').onclick=()=>{try{
 if(!bulk)throw Error('Muat struktur bulk dahulu');
 candidates=terminationCandidates(bulk,{hkl:$('hkl').value,layers:Number($('layers').value),vacuum:Number($('vac').value)});
 $('termination').replaceChildren();
 for(const [i,c] of candidates.entries()){
   const option=document.createElement('option');option.value=String(i);option.textContent=`Kandidat ${c.id} · potong ${(c.cutFraction*100).toFixed(2)}% · atas ${JSON.stringify(c.diagnostics.topLayer)} / bawah ${JSON.stringify(c.diagnostics.bottomLayer)}`;$('termination').append(option);
 }
 $('candidate-count').textContent=`${candidates.length} kandidat bidang potong ditemukan. Pilih kandidat untuk melihat lapisan terluar.`;
 chooseCandidate(0);showComparison();
}catch(err){out=null;viewer.setStructure(null);candidates=[];showComparison();$('termination').replaceChildren();$('diagnostics').textContent='Belum ada slab untuk diperiksa.';toggle(false);invalidateQE('Belum ada slab aktif. Bangun dan pilih kandidat, lalu periksa konfigurasi QE.');message('Tidak dapat membuat kandidat terminasi: '+err.message)}};
$('save').onclick=()=>{if(out)download(JSON.stringify(out.structure,null,2),'kitcat-slab-'+$('hkl').value+'-draft.json','application/json')};
$('qe').onclick=()=>{if(out)try{download(qeGeometryWithConstraints(out.structure),'kitcat-slab-'+$('hkl').value+'-geometry-constraints-only.in','text/plain')}catch(err){message('Ekspor QE ditolak: '+err.message)}};
demo();

// QE slab draft exporter: reuse the shared Structure Core generator and preflight.
const recheck=()=>invalidateQE('Parameter QE berubah. Jalankan pemeriksaan ulang sebelum mengunduh.');
for(const id of ['calculation','qe-prefix','upf-na-name','upf-cl-name','mass-na','mass-cl','ecutwfc','ecutrho','kx','ky','kz','nspin','mag-na','mag-cl','upf-na-file','upf-cl-file'])$(id).addEventListener('change',recheck);
function readConfig(){
 const names=[...new Set(out.structure.atoms.map(a=>a.speciesLabel||a.element))];
 const supported=new Set(['Na','Cl']);
 if(names.some(name=>!supported.has(name)))throw Error('Panel Beta mendukung Na dan Cl saja. Model lain: gunakan ekspor geometri sampai pemetaan UPF dinamis tersedia.');
 const pseudos=Object.fromEntries(names.map(name=>[name,{file:$(name==='Na'?'upf-na-name':'upf-cl-name').value.trim(),mass:Number($(name==='Na'?'mass-na':'mass-cl').value)}]));
 const nspin=Number($('nspin').value);
 return {calculation:$('calculation').value,modelType:'slab',prefix:$('qe-prefix').value.trim(),outdir:'tmp',pseudo_dir:'pseudo',pseudos,ecutwfc:Number($('ecutwfc').value),ecutrho:Number($('ecutrho').value),conv_thr:1e-8,kpoints:['kx','ky','kz'].map(id=>Number($(id).value)),kshift:[0,0,0],nspin,occupations:'fixed',...(nspin===2?{starting_magnetization:Object.fromEntries(names.map(name=>[name,Number($(name==='Na'?'mag-na':'mag-cl').value)]))}:{})};
}
async function makePW(){
 if(!out)throw Error('Belum ada slab aktif.');
 const config=readConfig(), upfFiles={};
 for(const element of ['Na','Cl']){
  if(!Object.hasOwn(config.pseudos,element))continue;
  const file=$('upf-'+element.toLowerCase()+'-file').files[0];
  if(file){if(file.size>20_000_000)throw Error('UPF lebih dari 20 MB');upfFiles[element]={file:file.name,text:await file.text()};}
 }
 const result=generateValidatedPWInput(out.structure,config,upfFiles);
 const diagnostics=diagnoseSlab(out.structure,{bulkInput:bulk,layerToleranceAngstrom:Number($('layer-tolerance').value),minimumVacuumAngstrom:Number($('vac-threshold').value)});
 const review=['Slab geometri draft: terminations, polaritas, dan ketebalan belum terverifikasi secara ilmiah.','Cutoff, kpoints, vakum, dan parameter spin belum dibuktikan konvergen.','Pastikan file UPF dan direktori pseudo_dir tersedia di komputer/HPC saat dijalankan.'];
 return {...result,review,diagnostics};
}
$('qe-check').onclick=async()=>{try{const r=await makePW();lastPW=r;$('qe-report').textContent=JSON.stringify({status:r.preflight.status,issues:r.preflight.issues,review:r.review,manifest:r.manifest},null,2);message('QE static preflight selesai: '+r.preflight.status+'. Hasil tetap DRAFT, bukan verified DFT input.');}catch(e){lastPW=null;$('qe-report').textContent='EKSPOR DIBLOKIR: '+e.message;message('QE setup tidak valid.')}};
$('qe-full').onclick=async()=>{try{const r=await makePW();lastPW=r;const header='! KITCAT Surface Foundation 0.9 / DRAFT, NOT SCIENTIFICALLY VERIFIED\n! Review slab termination, UPF, cutoff, kmesh and relaxation before research use\n';download(header+r.text,'kitcat-slab-'+$('hkl').value+'-'+$('calculation').value+'-DRAFT.in','text/plain');$('qe-report').textContent=JSON.stringify({status:r.preflight.status,issues:r.preflight.issues,review:r.review},null,2);message('Input draft diekspor: static check '+r.preflight.status+'.');}catch(e){$('qe-report').textContent='EKSPOR DIBLOKIR: '+e.message;message('Ekspor QE ditolak: '+e.message)}};


// KITCAT_SURFACE_WORKFLOW_UI_V1 — navigation and status only; no model or QE mutation.
function refreshWorkflowState(){
 const total=out?.structure?.atoms?.length ?? 0;
 const bulkInfo=bulk?`${bulk.atoms.length} atom`:'belum dimuat';
 const slabInfo=total?`(${ $('hkl').value }) ${total} atom · kandidat ${baseCandidate?.id??'?'}`:'belum dibuat';
 const qeInfo=lastPW?'pemeriksaan tersedia':'perlu diperiksa';
 $('workflow-state').textContent=`Bulk: ${bulkInfo} · Slab: ${slabInfo} · QE: ${qeInfo} (DRAFT)`;
}
document.querySelectorAll('.workflow-nav [data-jump]').forEach(btn=>btn.addEventListener('click',()=>{
 const target=$(btn.dataset.jump);if(!target)return;
 target.scrollIntoView({behavior:'smooth',block:'center'});
 if(target.matches('button,select,input'))target.focus({preventScroll:true});
}));
const workflowObserver=new MutationObserver(refreshWorkflowState);
workflowObserver.observe($('status'),{childList:true,characterData:true,subtree:true});
workflowObserver.observe($('qe-report'),{childList:true,characterData:true,subtree:true});
const _workflowBuild=$('build');_workflowBuild.addEventListener('click',()=>queueMicrotask(refreshWorkflowState));
$('termination').addEventListener('change',()=>queueMicrotask(refreshWorkflowState));
$('freeze').addEventListener('click',()=>queueMicrotask(refreshWorkflowState));
$('demo').addEventListener('click',()=>queueMicrotask(refreshWorkflowState));
$('upload').addEventListener('change',()=>setTimeout(refreshWorkflowState,100));
refreshWorkflowState();
