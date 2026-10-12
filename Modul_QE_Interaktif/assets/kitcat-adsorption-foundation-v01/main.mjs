import {buildMultiAdsorbate} from './multi-adsorbate.mjs';
import {exploreOrientations,exportOrientationManifest} from './orientation-explorer.mjs';
import {placeMolecule} from './molecules.mjs';
import {placePeriodicAdsorbate} from './periodic-sites.mjs';
import {asePython} from './ase-export.mjs';
import {checkSlab,placeAdsorbate,topAtoms,cart,geometryQE} from './adsorption-core.mjs';
const $=id=>document.getElementById(id);let slab=null,out=null,orientationCandidates=[];
const download=(content,name,type)=>{const u=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)};
function fill(){orientationCandidates=[];$('orientation-results').replaceChildren();$('orientation-export').disabled=true;out=null;$('json').disabled=true;$('qe').disabled=true;$('ase').disabled=true;$('anchor').replaceChildren();if(!slab)return;const top=topAtoms(slab,Number($('tol').value));top.forEach((t,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`${i+1}: ${t.a.element} ${t.a.id??t.i} (z=${t.p[2].toFixed(2)} Å)`;$('anchor').append(o)});$('source').textContent=`${slab.atoms.length} atom · ${top.length} kandidat atom permukaan (toleransi ${$('tol').value} Å)`;$('place').disabled=false;$('multi-build').disabled=false;draw(slab);$('status').textContent='Slab termuat. Pilih unsur, situs, dan atom acuan.'}
$('upload').onchange=async e=>{try{const f=e.target.files[0];if(!f)return;slab=checkSlab(JSON.parse(await f.text()));fill()}catch(err){slab=null;fill();$('status').textContent='Gagal impor: '+err.message}};
$('demo').onclick=()=>{const lat=[[5.64,0,0],[0,5.64,0],[0,0,25]];const atoms=[];for(let z=0;z<2;z++)for(let i=0;i<4;i++){const x=[0,.5,0,.5][i],y=[0,0,.5,.5][i];atoms.push({id:`Na-${z}-${i}`,element:'Na',fractional:[x,y,(4+z*2.8)/25]},{id:`Cl-${z}-${i}`,element:'Cl',fractional:[(x+.25)%1,(y+.25)%1,(4+z*2.8)/25]})}slab={lattice:lat,atoms,metadata:{source:'synthetic geometric UI demo; not a crystallographic NaCl reference'}};fill()};
$('tol').onchange=()=>{if(slab)fill()};$('place').onclick=()=>{try{const opts={site:$('site').value,height:Number($('height').value),anchor:Number($('anchor').value),topTolerance:Number($('tol').value),range:Number($('range').value)};out=$('kind').value==='molecule'?placeMolecule(slab,{...opts,molecule:$('molecule').value,rotation:['rot-x','rot-y','rot-z'].map(id=>Number($(id).value))}):placePeriodicAdsorbate(slab,{...opts,element:$('element').value});$('json').disabled=false;$('qe').disabled=false;$('ase').disabled=false;draw(out.structure);$('report').textContent=JSON.stringify({status:'GEOMETRY_DRAFT',adsorbate:out.structure.metadata.adsorptionDraft,positionAngstrom:out.positionAngstrom,minimumDistanceAngstrom:out.minDistanceAngstrom,periodicSite:out.siteInfo,caveats:['Periodic XY search limited to finite image range','No surface site symmetry classification','No DFT relaxation or energetics']},null,2);$('status').textContent=`Adsorbat ditempatkan: ${out.warning}`;}catch(e){$('status').textContent='Gagal membuat model: '+e.message}};
$('json').onclick=()=>{if(out)download(JSON.stringify(out.structure,null,2),'kitcat-adsorption-geometry-DRAFT.json','application/json')};$('qe').onclick=()=>{if(out)download(geometryQE(out.structure),'kitcat-adsorption-geometry-DRAFT.txt','text/plain')};
function draw(s){const svg=$('view');svg.replaceChildren();const ns='http://www.w3.org/2000/svg';const all=s.atoms.map(a=>({element:a.element,p:cart(a.fractional,s.lattice),id:a.id}));const adsCount=out?.structure===s?s.atoms.length-slab.atoms.length:0;const adsFrom=s.atoms.length-adsCount;function panel(axis1,axis2,left,right,label){const pts=all.map((a,i)=>({...a,i}));const v1=pts.map(a=>a.p[axis1]),v2=pts.map(a=>a.p[axis2]);const mn1=Math.min(...v1),mx1=Math.max(...v1),mn2=Math.min(...v2),mx2=Math.max(...v2);const w=right-left-32,h=310;const scale=Math.min(w/Math.max(mx1-mn1,2),h/Math.max(mx2-mn2,3));const group=document.createElementNS(ns,'g');svg.append(group);const text=document.createElementNS(ns,'text');text.setAttribute('x',left+12);text.setAttribute('y',32);text.setAttribute('fill','#dfedff');text.textContent=label;group.append(text);pts.forEach(a=>{const c=document.createElementNS(ns,'circle');c.setAttribute('cx',left+16+(a.p[axis1]-mn1)*scale);c.setAttribute('cy',365-((a.p[axis2]-mn2)*scale));c.setAttribute('r',a.i>=adsFrom&&adsCount?9:5);c.setAttribute('fill',a.i>=adsFrom&&adsCount?'#ffbd58':({Na:'#5eacff',Cl:'#7edbad',H:'#fff',C:'#7b8898',N:'#96aaff',O:'#ff7777',S:'#ffe06b'}[a.element]||'#ccc'));c.setAttribute('stroke',a.i>=adsFrom&&adsCount?'#fff':'none');const title=document.createElementNS(ns,'title');title.textContent=`${a.element} ${a.id??a.i}: ${a.p.map(v=>v.toFixed(2)).join(', ')} Å`;c.append(title);group.append(c)})}panel(0,1,12,318,'XY · top view');panel(0,2,344,648,'XZ · side view')}

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
