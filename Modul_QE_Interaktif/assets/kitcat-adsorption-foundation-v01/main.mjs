import {updateGeometryPanel} from './geometry-panel.mjs';
import {summarizeValidation} from './validation-dashboard.mjs';
import {inspectContacts} from './geometry-validation.mjs';
import {measureDihedral,adjustAdsorbateDihedral} from './dihedral-editor.mjs';
import {measureAngle,adjustAdsorbateAngle} from './angle-editor.mjs';
import {adjustAdsorbateBond,inspectAllPairDistances} from './atomic-editor.mjs';
import {transformAdsorbate,minimumSlabAdsDistance} from './positioning.mjs';
import {makeViewer} from './adsorption-viewer.mjs';
import {makeQEBatchZip,buildQEBatchFiles} from './qe-batch.mjs';
import {makeBatchZip,makeBatchFiles} from './batch-export.mjs';
import {exploreConfigurations,exportConfigurationManifest} from './configuration-explorer.mjs';
import {buildMultiAdsorbate} from './multi-adsorbate.mjs';
import {exploreOrientations,exportOrientationManifest} from './orientation-explorer.mjs';
import {placeMolecule} from './molecules.mjs';
import {placePeriodicAdsorbate} from './periodic-sites.mjs';
import {asePython} from './ase-export.mjs';
import {checkSlab,placeAdsorbate,topAtoms,cart,geometryQE} from './adsorption-core.mjs';
const $=id=>document.getElementById(id);let slab=null,out=null,orientationCandidates=[];
const viewer3d=makeViewer($('viewer3d'),$('viewer3d-info'));window.__kitcatViewer3d=viewer3d;$('viewer3d-reset').onclick=()=>viewer3d.reset();$('viewer3d-labels').onchange=e=>viewer3d.setLabels(e.target.checked);

const download=(content,name,type)=>{const u=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)};
function fill(){orientationCandidates=[];$('orientation-results').replaceChildren();$('orientation-export').disabled=true;out=null;$('json').disabled=true;$('qe').disabled=true;$('ase').disabled=true;$('anchor').replaceChildren();if(!slab)return;const top=topAtoms(slab,Number($('tol').value));top.forEach((t,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`${i+1}: ${t.a.element} ${t.a.id??t.i} (z=${t.p[2].toFixed(2)} Å)`;$('anchor').append(o)});$('source').textContent=`${slab.atoms.length} atom · ${top.length} kandidat atom permukaan (toleransi ${$('tol').value} Å)`;$('place').disabled=false;$('multi-build').disabled=false;draw(slab);$('status').textContent='Slab termuat. Pilih unsur, situs, dan atom acuan.'}
$('upload').onchange=async e=>{try{const f=e.target.files[0];if(!f)return;slab=checkSlab(JSON.parse(await f.text()));fill()}catch(err){slab=null;fill();$('status').textContent='Gagal impor: '+err.message}};
$('demo').onclick=()=>{const lat=[[5.64,0,0],[0,5.64,0],[0,0,25]];const atoms=[];for(let z=0;z<2;z++)for(let i=0;i<4;i++){const x=[0,.5,0,.5][i],y=[0,0,.5,.5][i];atoms.push({id:`Na-${z}-${i}`,element:'Na',fractional:[x,y,(4+z*2.8)/25]},{id:`Cl-${z}-${i}`,element:'Cl',fractional:[(x+.25)%1,(y+.25)%1,(4+z*2.8)/25]})}slab={lattice:lat,atoms,metadata:{source:'synthetic geometric UI demo; not a crystallographic NaCl reference'}};fill()};
$('tol').onchange=()=>{if(slab)fill()};$('place').onclick=()=>{try{const opts={site:$('site').value,height:Number($('height').value),anchor:Number($('anchor').value),topTolerance:Number($('tol').value),range:Number($('range').value)};out=$('kind').value==='molecule'?placeMolecule(slab,{...opts,molecule:$('molecule').value,rotation:['rot-x','rot-y','rot-z'].map(id=>Number($(id).value))}):placePeriodicAdsorbate(slab,{...opts,element:$('element').value});$('json').disabled=false;$('qe').disabled=false;$('ase').disabled=false;draw(out.structure);$('report').textContent=JSON.stringify({status:'GEOMETRY_DRAFT',adsorbate:out.structure.metadata.adsorptionDraft,positionAngstrom:out.positionAngstrom,minimumDistanceAngstrom:out.minDistanceAngstrom,periodicSite:out.siteInfo,caveats:['Periodic XY search limited to finite image range','No surface site symmetry classification','No DFT relaxation or energetics']},null,2);$('status').textContent=`Adsorbat ditempatkan: ${out.warning}`;}catch(e){$('status').textContent='Gagal membuat model: '+e.message}};
$('json').onclick=()=>{if(out)download(JSON.stringify(out.structure,null,2),'kitcat-adsorption-geometry-DRAFT.json','application/json')};$('qe').onclick=()=>{if(out)download(geometryQE(out.structure),'kitcat-adsorption-geometry-DRAFT.txt','text/plain')};
function draw(s){if(typeof resetDashboard==='function')resetDashboard();viewer3d.setStructure(s,slab?.atoms.length||0);updateGeometryPanel(s);const svg=$('view');svg.replaceChildren();const ns='http://www.w3.org/2000/svg';const all=s.atoms.map(a=>({element:a.element,p:cart(a.fractional,s.lattice),id:a.id}));const adsCount=out?.structure===s?s.atoms.length-slab.atoms.length:0;const adsFrom=s.atoms.length-adsCount;function panel(axis1,axis2,left,right,label){const pts=all.map((a,i)=>({...a,i}));const v1=pts.map(a=>a.p[axis1]),v2=pts.map(a=>a.p[axis2]);const mn1=Math.min(...v1),mx1=Math.max(...v1),mn2=Math.min(...v2),mx2=Math.max(...v2);const w=right-left-32,h=310;const scale=Math.min(w/Math.max(mx1-mn1,2),h/Math.max(mx2-mn2,3));const group=document.createElementNS(ns,'g');svg.append(group);const text=document.createElementNS(ns,'text');text.setAttribute('x',left+12);text.setAttribute('y',32);text.setAttribute('fill','#dfedff');text.textContent=label;group.append(text);pts.forEach(a=>{const c=document.createElementNS(ns,'circle');c.setAttribute('cx',left+16+(a.p[axis1]-mn1)*scale);c.setAttribute('cy',365-((a.p[axis2]-mn2)*scale));c.setAttribute('r',a.i>=adsFrom&&adsCount?9:5);c.setAttribute('fill',a.i>=adsFrom&&adsCount?'#ffbd58':({Na:'#5eacff',Cl:'#7edbad',H:'#fff',C:'#7b8898',N:'#96aaff',O:'#ff7777',S:'#ffe06b'}[a.element]||'#ccc'));c.setAttribute('stroke',a.i>=adsFrom&&adsCount?'#fff':'none');const title=document.createElementNS(ns,'title');title.textContent=`${a.element} ${a.id??a.i}: ${a.p.map(v=>v.toFixed(2)).join(', ')} Å`;c.append(title);group.append(c)})}panel(0,1,12,318,'XY · top view');panel(0,2,344,648,'XZ · side view')}

$('ase').onclick=()=>{if(!out)return;try{const pbc=[$('pbcx').checked,$('pbcy').checked,$('pbcz').checked];download(asePython(out.structure,{pbc}),'kitcat_adsorption_ase.py','text/x-python');$('status').textContent='Skrip ASE berhasil disiapkan. Jalankan nanti pada lingkungan Python dengan ASE terpasang.';}catch(err){$('status').textContent='Gagal ekspor ASE: '+err.message;}};

$('kind').onchange=()=>{const molecular=$('kind').value==='molecule';$('atomic-settings').hidden=molecular;$('molecular-settings').hidden=!molecular;out=null;['json','qe','ase'].forEach(id=>$(id).disabled=true);if(slab)draw(slab);$('status').textContent='Jenis adsorbat diubah. Bangun ulang model untuk ekspor.'};

// Molecular orientation explorer. This never changes the slab or molecular settings until user selects a candidate.
function renderOrientationCandidates(){
 const container=$('orientation-results');container.replaceChildren();
 for(const c of orientationCandidates){
  const tr=document.createElement('tr');
  const cells=[String(c.index+1),c.label,c.minDistanceAngstrom.toFixed(3)+' Å',c.possibleOverlap?'REVIEW: overlap <0.8 Å':'Geometry draft'];
  cells.forEach(t=>{const td=document.createElement('td');td.textContent=t;tr.append(td)});
  const td=document.createElement('td'),btn=document.createElement('button');btn.textContent='Pilih';
  btn.onclick=()=>selectOrientationCandidate(c.index);td.append(btn);tr.append(td);container.append(tr);
 }
}
function selectOrientationCandidate(index){
 const c=orientationCandidates[index];if(!c)return;
 out=c.result;['rot-x','rot-y','rot-z'].forEach((id,i)=>$(id).value=c.rotation[i]);
 $('kind').value='molecule';$('atomic-settings').hidden=true;$('molecular-settings').hidden=false;
 ['json','qe','ase'].forEach(id=>$(id).disabled=false);
 draw(out.structure);
 $('report').textContent=JSON.stringify({status:'GEOMETRY_DRAFT',orientation:c.label,rotationDegrees:c.rotation,
   adsorption:out.structure.metadata.adsorptionDraft,
   minimumDistanceAngstrom:out.minDistanceAngstrom,
   caveats:['Distance screening only. Not an energy-based orientation ranking.','Review atom overlap and cell vacuum before HPC.']},null,2);
 $('status').textContent='Orientasi aktif: '+c.label+'. '+out.warning;
}
$('orientation-generate').onclick=()=>{try{
 if($('kind').value!=='molecule')throw Error('Pilih jenis adsorbat Molekul terlebih dahulu');
 const settings={molecule:$('molecule').value,site:$('site').value,height:Number($('height').value),
 anchor:Number($('anchor').value),topTolerance:Number($('tol').value),range:Number($('range').value)};
 orientationCandidates=exploreOrientations(slab,settings);
 $('orientation-export').disabled=false;renderOrientationCandidates();
 $('status').textContent=orientationCandidates.length+' kandidat orientasi dibuat; klik Pilih untuk mengaktifkan struktur dan ekspor ASE. Urutan bukan ranking energi.';
 }catch(err){$('status').textContent='Gagal memindai orientasi: '+err.message;}
};
$('orientation-export').onclick=()=>{
 if(!orientationCandidates.length)return;
 const active=orientationCandidates.find(c=>c.result===out)?.index??null;
 download(JSON.stringify(exportOrientationManifest(orientationCandidates,active),null,2),'kitcat-orientation-candidates-DRAFT.json','application/json');
};
// Parameter changes invalidate the orientation candidate list. Existing model is re-evaluated only after Build.
for(const id of ['molecule','site','height','anchor','range','rot-x','rot-y','rot-z']){
 $(id).addEventListener('change',()=>{if(orientationCandidates.length){orientationCandidates=[];$('orientation-results').replaceChildren();$('orientation-export').disabled=true;}});
}

// Multi-placement intentionally derives each site from original slab and retains per-atom constraints.
$('multi-build').onclick=()=>{try{
 if(!slab)throw Error('Muat slab terlebih dahulu');
 const options={count:Number($('multi-count').value),minSeparation:Number($('multi-min').value),kind:$('kind').value,molecule:$('molecule').value,element:$('element').value,site:$('site').value,height:Number($('height').value),anchor:Number($('anchor').value),topTolerance:Number($('tol').value),range:Number($('range').value),rotation:['rot-x','rot-y','rot-z'].map(id=>Number($(id).value))};
 const multi=buildMultiAdsorbate(slab,options);out=multi;
 orientationCandidates=[];$('orientation-results').replaceChildren();$('orientation-export').disabled=true;
 ['json','qe','ase'].forEach(id=>$(id).disabled=false);
 draw(out.structure);
 const info={status:'GEOMETRY_DRAFT',adsorbateGroups:multi.items.length,nominalCoverageRatio:multi.nominalCoverageRatio,minAdsorbateDistanceAngstrom:multi.minAdsorbateDistanceAngstrom,warning:multi.warning,items:multi.items};
 $('multi-report').textContent=JSON.stringify(info,null,2);$('report').textContent=JSON.stringify({...info,metadata:out.structure.metadata.adsorptionDraft},null,2);
 $('status').textContent=`${multi.items.length} grup ditempatkan. Coverage nominal ${(100*multi.nominalCoverageRatio).toFixed(1)}%. ${multi.warning}`;
 }catch(err){$('status').textContent='Gagal multi-adsorbate: '+err.message;}
};

// Configuration Explorer 0.7: inspect and choose initial geometry; no energy ranking.
let configExploration=null;
function clearConfigurations(){configExploration=null;$('config-results').replaceChildren();$('config-export').disabled=true;$('config-summary').textContent='Belum ada konfigurasi.';}
function chooseConfiguration(index){
 const c=configExploration?.candidates[index];if(!c?.result)return;
 out=c.result;['json','qe','ase'].forEach(id=>$(id).disabled=false);
 $('kind').value=$('config-kind').value;$('atomic-settings').hidden=$('kind').value==='molecule';$('molecular-settings').hidden=$('kind').value!=='molecule';
 draw(out.structure);
 $('report').textContent=JSON.stringify({status:'GEOMETRY_DRAFT',candidateIndex:index,group:c.group,site:c.site,anchor:c.anchor,rotationDegrees:c.rotation,minimumSlabDistanceAngstrom:c.minimumDistanceAngstrom,warning:'Geometric fingerprint does not establish symmetry or energetic equivalence.'},null,2);
 $('status').textContent=`Kandidat ${index+1} aktif · grup ${c.group}. Ekspor JSON/ASE berlaku untuk kandidat ini.`;
}
function drawConfigurations(){
 const rows=$('config-results');rows.replaceChildren();
 const filter=$('config-unique').checked;
 for(const c of configExploration.candidates){if(filter&&c.result&&!c.representative)continue;
  const tr=document.createElement('tr');const fields=[String(c.index+1),c.group===null?'—':String(c.group),c.site,`#${c.anchor+1}`,c.rotation.join(' / '),c.error?`TIDAK TERSEDIA: ${c.error}`:c.possibleOverlap?'PERIKSA jarak':'DRAFT'];
  for(const v of fields){const td=document.createElement('td');td.textContent=v;tr.append(td)}
  const td=document.createElement('td');const btn=document.createElement('button');btn.textContent='Aktifkan';btn.disabled=!c.result;btn.onclick=()=>chooseConfiguration(c.index);td.append(btn);tr.append(td);rows.append(tr);
 }
}
$('config-generate').onclick=()=>{try{
 if(!slab)throw Error('Muat slab terlebih dahulu');
 const kind=$('kind').value;
 const sites=['top','bridge','hollow'].filter(x=>$('config-'+x).checked);
 configExploration=exploreConfigurations(slab,{kind,molecule:$('molecule').value,element:$('element').value,sites,anchors:Number($('config-anchors').value),height:Number($('height').value),topTolerance:Number($('tol').value),range:Number($('range').value),threshold:Number($('multi-min').value)});
 const e=configExploration;$('config-summary').textContent=`${e.candidates.length} percobaan · ${e.validCount} kandidat valid · ${e.groupCount} fingerprint berbeda · ${e.failedCount} tidak tersedia. Tidak ada ranking energi.`;
 $('config-export').disabled=false;drawConfigurations();$('status').textContent='Configuration Explorer selesai. Klik Aktifkan untuk memilih struktur hasil ekspor.';
 }catch(err){$('status').textContent='Configuration Explorer: '+err.message;}
};
$('config-unique').onchange=()=>{if(configExploration)drawConfigurations()};
$('config-export').onclick=()=>{if(!configExploration)return;const selected=configExploration.candidates.find(c=>c.result===out)?.index??null;
 download(JSON.stringify(exportConfigurationManifest(configExploration,selected),null,2),'kitcat-adsorption-configurations-DRAFT.json','application/json');};
// Never reuse an old configuration list after modifying slab source.
const originalFill=fill;
// Existing fill() is a function declaration; clear whenever source changes through existing upload/demo handlers.
$('demo').addEventListener('click',clearConfigurations);
$('upload').addEventListener('change',clearConfigurations);

// Batch ASE/HPC 0.8: download offline ZIP of valid configuration candidates.
function refreshBatchButton(){if($('batch-export'))$('batch-export').disabled=!configExploration?.validCount;}
$('config-generate').addEventListener('click',refreshBatchButton);
$('demo').addEventListener('click',()=>{$('batch-export').disabled=true});
$('upload').addEventListener('change',()=>{$('batch-export').disabled=true});
$('batch-export').onclick=()=>{try{
 const opts={representativesOnly:$('batch-representatives').checked,pbc:[$('pbcx').checked,$('pbcy').checked,$('pbcz').checked]};
 const batch=makeBatchFiles(configExploration,opts);
 const blob=makeBatchZip(configExploration,opts);
 const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='kitcat-adsorption-ase-batch-DRAFT.zip';link.click();setTimeout(()=>URL.revokeObjectURL(url),5000);
 $('batch-report').textContent=`${batch.count} kandidat diekspor · ZIP berisi struktur JSON, skrip Python ASE, manifest, dan template SLURM. Tidak menjalankan DFT.`;
}catch(err){$('batch-report').textContent='Ekspor batch gagal: '+err.message;}}

// QE Batch Export 0.9: only candidate data and draft files, no browser-side DFT.
function qeSettings(){
 let upf;try{upf=JSON.parse($('qe-upf').value)}catch{throw Error('Format JSON UPF tidak valid')}
 return {calculation:$('qe-calculation').value,ecutwfc:Number($('qe-ecutwfc').value),ecutrho:Number($('qe-ecutrho').value),
 kpoints:['qe-kx','qe-ky','qe-kz'].map(id=>Number($(id).value)),upf,prefix:'kitcat_ads'};
}
function qeButton(){ $('qe-batch-export').disabled=!configExploration?.validCount; }
$('config-generate').addEventListener('click',qeButton);
$('demo').addEventListener('click',()=>{$('qe-batch-export').disabled=true});
$('upload').addEventListener('change',()=>{$('qe-batch-export').disabled=true});
$('qe-batch-export').onclick=()=>{try{
 const options={representativesOnly:$('qe-batch-representatives').checked};
 const settings=qeSettings();const batch=buildQEBatchFiles(configExploration,settings,options);
 const blob=makeQEBatchZip(configExploration,settings,options);
 const u=URL.createObjectURL(blob),link=document.createElement('a');link.href=u;link.download='kitcat-adsorption-qe-batch-DRAFT.zip';link.click();setTimeout(()=>URL.revokeObjectURL(u),5000);
 $('qe-batch-report').textContent=`${batch.count} kandidat siap sebagai INPUT DRAFT. ZIP tidak memuat pseudopotensial. Periksa UPF, XC, PBC, cutoff dan konvergensi nanti di HPC.`;
 }catch(e){$('qe-batch-report').textContent='Ekspor QE ditolak: '+e.message;}
};

// 1.0 RC Unified Workspace: navigation and presentation state only. No geometry changes.
(function initUnifiedWorkspace(){
 const modes={standard:'mode-standard',compact:'mode-compact',focus:'mode-focus'};
 function setMode(mode){
  document.body.classList.toggle('workspace-compact',mode==='compact');
  document.body.classList.toggle('workspace-focus',mode==='focus');
  Object.entries(modes).forEach(([key,id])=>document.getElementById(id).setAttribute('aria-pressed',String(key===mode)));
  if(mode==='focus')document.getElementById('step-viewer').scrollIntoView({block:'start'});
 }
 Object.entries(modes).forEach(([key,id])=>document.getElementById(id).addEventListener('click',()=>setMode(key)));
 const indicator=document.getElementById('workspace-indicator');
 const source=document.getElementById('source');
 const summary=document.getElementById('config-summary');
 const watcher=new MutationObserver(()=>{
  const loaded=!!document.getElementById('place')&&!document.getElementById('place').disabled;
  indicator.textContent=(loaded?'Slab tersedia':'Slab belum dimuat')+' · '+(summary.textContent||'Kandidat belum dibuat').slice(0,115);
 });
 watcher.observe(source,{childList:true,characterData:true,subtree:true});
 watcher.observe(summary,{childList:true,characterData:true,subtree:true});
 indicator.textContent='Slab belum dimuat · kandidat belum dibuat';
})();

// Interactive manipulation 2: adsorbate-only transform; restores prior structures via undo.
let positionHistory=[];
const positionInputs=['position-x','position-y','position-z','position-rx','position-ry','position-rz'];
function updateAnchorOptions(){const sel=$('position-anchor');const prior=sel.value;sel.replaceChildren();const center=document.createElement('option');center.value='centroid';center.textContent='Pusat geometris adsorbat';sel.append(center);if(out?.structure&&slab){out.structure.atoms.slice(slab.atoms.length).forEach((a,i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=`${i+1} · ${a.element} (${a.id??'adsorbat'})`;sel.append(option)})}sel.value=[...sel.options].some(x=>x.value===prior)?prior:'centroid'}
function updateClearance(){if(!out?.structure||!slab||out.structure.atoms.length<=slab.atoms.length){$('position-clearance').textContent='Bangun adsorbat untuk memeriksa jarak.';return null}try{const result=minimumSlabAdsDistance(out.structure,slab.atoms.length,{imageRange:Number($('range').value)||1});const threshold=Number($('position-threshold').value);const warning=result.distanceAngstrom<threshold?'PERINGATAN: jarak di bawah ambang':'Tidak ada jarak di bawah ambang yang dipilih';$('position-clearance').textContent=`Jarak minimum slab–adsorbat ${result.distanceAngstrom.toFixed(3)} Å · ${warning}. Citra XY ±${result.imageRange}; belum mengecek jarak adsorbat–adsorbat atau energi.`;return result}catch(e){$('position-clearance').textContent='Pemeriksaan jarak gagal: '+e.message;return null}}
function positionRefresh(){const active=Boolean(out?.structure&&slab&&out.structure.atoms.length>slab.atoms.length);$('position-apply').disabled=!active;$('position-undo').disabled=!active||!positionHistory.length;if(!active){positionHistory=[];$('position-undo').disabled=true;$('position-note').textContent='Bangun atau pilih struktur adsorpsi terlebih dahulu.'}updateAnchorOptions();updateClearance()}
function positionApply(t,rot=[0,0,0]){try{if(!out?.structure||!slab)throw Error('Belum ada adsorbat aktif');const before=out.structure;const anchor=$('position-anchor').value;const next=transformAdsorbate(before,slab.atoms.length,{translate:t,rotate:rot,anchor});positionHistory.push(before);out={...out,structure:next,warning:'Geometri manual DRAFT; perlu verifikasi fisik',minDistanceAngstrom:null};draw(next);['json','qe','ase'].forEach(id=>$(id).disabled=false);const clearance=updateClearance();$('position-note').textContent=`Δ(${t.join(', ')}) Å · rotasi XYZ (${rot.join(', ')})° · jangkar ${anchor}`;$('status').textContent='Geometri adsorbat diubah. Fingerprint kandidat terdahulu tidak berlaku untuk model aktif.';$('report').textContent=JSON.stringify({status:'GEOMETRY_DRAFT',manualPositioning:true,translationAngstrom:t,rotationXYZDegrees:rot,anchor,minimumSlabAdsDistance:clearance,warning:'No relaxation, energies, geometry uniqueness, or other adsorbate contact checks'},null,2);positionRefresh()}catch(e){$('position-note').textContent='Gagal: '+e.message}}
$('position-apply').onclick=()=>{const vals=positionInputs.map(id=>Number($(id).value));positionApply(vals.slice(0,3),vals.slice(3))};
$('position-undo').onclick=()=>{if(!positionHistory.length||!out)return;out={...out,structure:positionHistory.pop()};draw(out.structure);$('position-note').textContent='Transformasi terakhir dibatalkan.';positionRefresh()};
$('position-drag').onchange=e=>viewer3d.setDragAdsorbate(e.target.checked);
viewer3d.onTranslate(delta=>positionApply(delta,[0,0,0]));
$('position-threshold').onchange=updateClearance;
['place','multi-build','orientation-generate','config-generate','demo'].forEach(id=>$(id)?.addEventListener('click',()=>{positionHistory=[];queueMicrotask(positionRefresh)}));
$('upload').addEventListener('change',()=>{positionHistory=[];queueMicrotask(positionRefresh)});
$('orientation-results').addEventListener('click',()=>{positionHistory=[];queueMicrotask(positionRefresh)});
$('config-results').addEventListener('click',()=>{positionHistory=[];queueMicrotask(positionRefresh)});
positionRefresh();

// Advanced Atomic Editor: edits active geometry, keeping slab and export functions intact.
function updateBondEditor(){
 const active=Boolean(out?.structure&&slab&&out.structure.atoms.length>slab.atoms.length);
 const ads=active?out.structure.atoms.slice(slab.atoms.length):[];
 for(const id of ['bond-first','bond-second']){const el=$(id),prior=el.value;el.replaceChildren();ads.forEach((a,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=`${i+1}: ${a.element}`;el.append(opt)});el.value=ads.some((_,i)=>String(i)===prior)?prior:(id==='bond-second'&&ads.length>1?'1':'0')}
 $('bond-apply').disabled=!active||ads.length!==2;
 $('pair-check').disabled=!active;
 if(!active)$('bond-note').textContent='Bangun atau pilih adsorbat terlebih dahulu.';
 else if(ads.length!==2)$('bond-note').textContent='Edit ikatan tersedia untuk satu molekul dua atom; pemeriksaan jarak tetap tersedia.';
 else $('bond-note').textContent='Pilih atom jangkar dan atom kedua, lalu ubah panjang ikatan.';
}
$('bond-apply').onclick=()=>{try{
 if(!out?.structure||!slab)throw Error('Belum ada struktur aktif');
 const old=out.structure;
 const next=adjustAdsorbateBond(old,slab.atoms.length,{first:Number($('bond-first').value),second:Number($('bond-second').value),distanceAngstrom:Number($('bond-distance').value)});
 positionHistory.push(old);out={...out,structure:next,minDistanceAngstrom:null,warning:'Manual bond geometry DRAFT'};
 draw(next);$('bond-note').textContent=`Panjang ikatan diubah ke ${$('bond-distance').value} Å. Lakukan audit jarak sebelum ekspor.`;
 $('status').textContent='Geometri aktif diedit; fingerprint kandidat sebelumnya tidak berlaku.';
 ['json','qe','ase'].forEach(id=>$(id).disabled=false);updateClearance();positionRefresh();
 $('report').textContent=JSON.stringify({status:'GEOMETRY_DRAFT',atomicEditing:next.metadata.atomicEditing,warning:'No force relaxation or energy evaluation'},null,2);
 }catch(e){$('bond-note').textContent='Gagal mengedit ikatan: '+e.message}
};
$('pair-check').onclick=()=>{try{
 const audit=inspectAllPairDistances(out.structure,slab.atoms.length,{imageRange:Number($('range').value)});
 const threshold=Number($('pair-threshold').value);
 $('pair-report').textContent=JSON.stringify({...audit,thresholdAngstrom:threshold,contactsBelowThreshold:['slabAdsorbate','adsorbateAdsorbate','slabSlab'].filter(k=>audit[k].distanceAngstrom<threshold)},null,2);
 }catch(e){$('pair-report').textContent='Pemeriksaan gagal: '+e.message}
};
['place','multi-build','orientation-generate','config-generate','demo','position-apply','position-undo','bond-apply'].forEach(id=>$(id)?.addEventListener('click',()=>queueMicrotask(updateBondEditor)));
$('upload').addEventListener('change',()=>queueMicrotask(updateBondEditor));
$('orientation-results').addEventListener('click',()=>queueMicrotask(updateBondEditor));
$('config-results').addEventListener('click',()=>queueMicrotask(updateBondEditor));
updateBondEditor();

// Internal coordinate editor: selected A/B stay fixed; atom C moves at fixed B–C length.
function refreshAngleEditor(){
 const active=Boolean(out?.structure&&slab&&out.structure.atoms.length-slab.atoms.length>=3);
 const ads=active?out.structure.atoms.slice(slab.atoms.length):[];
 for(const [id,preferred] of [['angle-first',1],['angle-vertex',0],['angle-third',2]]){
  const el=$(id),prior=el.value;el.replaceChildren();
  ads.forEach((a,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=`${i+1}: ${a.element}`;el.append(opt)});
  el.value=ads.some((_,i)=>String(i)===prior)?prior:String(Math.min(preferred,Math.max(ads.length-1,0)));
 }
 $('angle-measure').disabled=!active;$('angle-apply').disabled=!active;
 if(!active)$('angle-note').textContent='Memerlukan paling sedikit tiga atom adsorbat.';
}
function angleParams(){return {first:Number($('angle-first').value),vertex:Number($('angle-vertex').value),third:Number($('angle-third').value)}}
$('angle-measure').onclick=()=>{try{const r=measureAngle(out.structure,slab.atoms.length,angleParams());$('angle-note').textContent=`Sudut saat ini ${r.angleDegrees.toFixed(3)}° · B–C ${r.thirdLengthAngstrom.toFixed(3)} Å.`}catch(e){$('angle-note').textContent='Gagal mengukur: '+e.message}};
$('angle-apply').onclick=()=>{try{
 const prior=out.structure,params={...angleParams(),angleDegrees:Number($('angle-target').value)};
 const updated=adjustAdsorbateAngle(prior,slab.atoms.length,params);
 positionHistory.push(prior);out={...out,structure:updated,minDistanceAngstrom:null,warning:'Internal coordinate geometry DRAFT'};
 draw(updated);['json','qe','ase'].forEach(id=>$(id).disabled=false);
 positionRefresh();updateBondEditor();refreshAngleEditor();
 const r=measureAngle(updated,slab.atoms.length,params);
 $('angle-note').textContent=`Sudut sekarang ${r.angleDegrees.toFixed(3)}°; panjang B–C ${r.thirdLengthAngstrom.toFixed(3)} Å. Periksa kontak atom sebelum ekspor.`;
 $('status').textContent='Sudut internal diedit; fingerprint/batch terdahulu tidak berlaku.';
 $('report').textContent=JSON.stringify({status:'GEOMETRY_DRAFT',angleEditing:updated.metadata.angleEditing,warning:'No DFT relaxation, chemical validity, or steric optimization'},null,2);
 }catch(e){$('angle-note').textContent='Gagal mengubah sudut: '+e.message}
};
['place','multi-build','orientation-generate','config-generate','demo','position-apply','position-undo','bond-apply','angle-apply'].forEach(id=>$(id)?.addEventListener('click',()=>queueMicrotask(refreshAngleEditor)));
$('upload').addEventListener('change',()=>queueMicrotask(refreshAngleEditor));
$('orientation-results').addEventListener('click',()=>queueMicrotask(refreshAngleEditor));
$('config-results').addEventListener('click',()=>queueMicrotask(refreshAngleEditor));
refreshAngleEditor();

// Dihedral editor: measured signed A-B-C-D torsion, moving terminal D only.
function refreshDihedralEditor(){
 const active=Boolean(out?.structure&&slab&&out.structure.atoms.length-slab.atoms.length>=4);
 const ads=active?out.structure.atoms.slice(slab.atoms.length):[];
 for(const [id,preferred] of [['dih-a',0],['dih-b',1],['dih-c',2],['dih-d',3]]){
  const el=$(id),prior=el.value;el.replaceChildren();
  ads.forEach((a,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=`${i+1}: ${a.element}`;el.append(opt)});
  el.value=ads.some((_,i)=>String(i)===prior)?prior:String(Math.min(preferred,Math.max(ads.length-1,0)));
 }
 $('dih-measure').disabled=!active;$('dih-apply').disabled=!active;
 if(!active)$('dih-note').textContent='Memerlukan sekurangnya empat atom adsorbat pada struktur aktif.';
}
function dihedralParams(){return {first:Number($('dih-a').value),second:Number($('dih-b').value),third:Number($('dih-c').value),fourth:Number($('dih-d').value)}}
$('dih-measure').onclick=()=>{try{const r=measureDihedral(out.structure,slab.atoms.length,dihedralParams());$('dih-note').textContent=`Dihedral terukur ${r.angleDegrees.toFixed(3)}°. Nilai bergantung urutan A–B–C–D.`}catch(e){$('dih-note').textContent='Pengukuran gagal: '+e.message}};
$('dih-apply').onclick=()=>{try{
 const previous=out.structure,params={...dihedralParams(),angleDegrees:Number($('dih-target').value)};
 const next=adjustAdsorbateDihedral(previous,slab.atoms.length,params);
 positionHistory.push(previous);out={...out,structure:next,minDistanceAngstrom:null,warning:'Dihedral geometry DRAFT'};
 draw(next);['json','qe','ase'].forEach(id=>$(id).disabled=false);
 positionRefresh();updateBondEditor();refreshAngleEditor();refreshDihedralEditor();
 const measured=measureDihedral(next,slab.atoms.length,params);
 $('dih-note').textContent=`Dihedral sekarang ${measured.angleDegrees.toFixed(3)}°. Periksa audit kontak atom sebelum ekspor.`;
 $('status').textContent='Dihedral diedit; fingerprint dan kandidat batch lama tidak berlaku untuk struktur aktif.';
 $('report').textContent=JSON.stringify({status:'GEOMETRY_DRAFT',dihedralEditing:next.metadata.dihedralEditing,warning:'No DFT relaxation, steric optimization, or symmetry equivalence'},null,2);
 }catch(e){$('dih-note').textContent='Edit dihedral gagal: '+e.message}
};
['place','multi-build','orientation-generate','config-generate','demo','position-apply','position-undo','bond-apply','angle-apply','dih-apply'].forEach(id=>$(id)?.addEventListener('click',()=>queueMicrotask(refreshDihedralEditor)));
$('upload').addEventListener('change',()=>queueMicrotask(refreshDihedralEditor));
$('orientation-results').addEventListener('click',()=>queueMicrotask(refreshDihedralEditor));
$('config-results').addEventListener('click',()=>queueMicrotask(refreshDihedralEditor));
refreshDihedralEditor();


// Geometry Validation 6: explicit inspection; never silently approves exports.
function contactAudit(){
 try{
  if(!out?.structure||!slab)throw Error('Bangun struktur adsorpsi terlebih dahulu');
  const result=inspectContacts(out.structure,slab.atoms.length,{imageRange:Number($('range').value),thresholdAngstrom:Number($('gv-threshold').value),maxAtoms:400});
  $('gv-report').textContent=JSON.stringify(result,null,2);
  $('gv-status').textContent=`${result.screening} · ${result.totalContacts} pasangan di bawah ${result.thresholdAngstrom} Å · ${result.atomCount} atom`;
  $('gv-status').dataset.state=result.screening;
  return result;
 }catch(e){$('gv-status').textContent='Tidak dapat diaudit: '+e.message;$('gv-report').textContent='Belum ada laporan yang valid.';return null}
}
$('gv-check').onclick=contactAudit;
$('gv-export').onclick=()=>{const result=contactAudit();if(result)download(JSON.stringify(result,null,2),'kitcat-geometry-contact-audit-DRAFT.json','application/json')};
function invalidateGeometryAudit(){ $('gv-status').textContent='Geometri mungkin berubah — jalankan ulang audit sebelum ekspor ke HPC.';$('gv-status').dataset.state='STALE';$('gv-report').textContent='Laporan sebelumnya tidak berlaku untuk geometri baru.'; }
// Event listeners fire after existing editor handlers; defer until model updates complete.
for(const id of ['place','multi-build','demo','position-apply','position-undo','bond-apply','angle-apply','dih-apply','orientation-generate','config-generate']) $(id)?.addEventListener('click',()=>queueMicrotask(invalidateGeometryAudit));
$('upload').addEventListener('change',()=>queueMicrotask(invalidateGeometryAudit));
$('orientation-results').addEventListener('click',()=>queueMicrotask(invalidateGeometryAudit));
$('config-results').addEventListener('click',()=>queueMicrotask(invalidateGeometryAudit));

// Dashboard report is invalidated on ANY geometry, source or audit setting change.
let validatedDashboard=null;
function resetDashboard(){validatedDashboard=null;$('vd-status').textContent='PERLU AUDIT';$('vd-contacts').textContent='—';$('vd-details').textContent='Laporan lama tidak berlaku. Jalankan ulang validasi.';$('vd-message').textContent='Struktur atau parameter mungkin berubah; pemeriksaan ulang diperlukan.';$('vd-export').disabled=true;}
function renderDashboard(){
 $('vd-atoms').textContent=out?.structure?.atoms?.length??'—';
 $('vd-ads').textContent=out?.structure&&slab?out.structure.atoms.length-slab.atoms.length:'—';
}
$('vd-run').onclick=()=>{
 try{
  if(!out?.structure||!slab)throw Error('Bangun atau pilih adsorbat terlebih dahulu');
  const contacts=contactAudit();if(!contacts)throw Error('Collision Inspector gagal memeriksa model');
  const result=summarizeValidation(out.structure,slab.atoms.length,contacts,{pbc:[$('pbcx').checked,$('pbcy').checked,$('pbcz').checked],hasConfigurations:Boolean(configExploration?.validCount)});
  validatedDashboard=result;renderDashboard();
  $('vd-contacts').textContent=String(result.contactAudit.totalContacts);
  $('vd-status').textContent=result.screening;
  $('vd-details').textContent=JSON.stringify({geometryFieldsComplete:result.geometryFieldsComplete,issues:result.issues,exportReadiness:result.exportReadiness,periodicity:result.periodicity,caveats:result.caveats},null,2);
  $('vd-message').textContent='Pemeriksaan statis selesai. Tinjau hasil dan laporan sebelum memakai file untuk HPC.';
  $('vd-export').disabled=false;
 }catch(e){resetDashboard();$('vd-message').textContent='Tidak dapat memvalidasi: '+e.message;renderDashboard()}
};
$('vd-export').onclick=()=>{if(validatedDashboard)download(JSON.stringify(validatedDashboard,null,2),'kitcat-adsorption-validation-dashboard-DRAFT.json','application/json')};
const dashboardEvents=['place','multi-build','demo','position-apply','position-undo','bond-apply','angle-apply','dih-apply','orientation-generate','config-generate'];
for(const id of dashboardEvents) $(id)?.addEventListener('click',()=>queueMicrotask(()=>{resetDashboard();renderDashboard()}));
for(const id of ['upload','kind','range','gv-threshold','pbcx','pbcy','pbcz'])$(id)?.addEventListener('change',()=>queueMicrotask(()=>{resetDashboard();renderDashboard()}));
for(const id of ['orientation-results','config-results'])$(id)?.addEventListener('click',()=>queueMicrotask(()=>{resetDashboard();renderDashboard()}));
renderDashboard();

// KITCAT-LIVE-LATTICE-INFO
