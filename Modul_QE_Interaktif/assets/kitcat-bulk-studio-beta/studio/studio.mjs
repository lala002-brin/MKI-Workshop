import {periodicAngle,periodicDihedral} from '../src/periodic-geometry.mjs';
import {createStructure,supercell,validateBulk,latticeMetrics,fractionalToCartesian,minImageDistance} from '../src/structure-core.mjs';
import {importStructure} from '../src/universal-import.mjs';
import {writePOSCAR,writeXYZ,exportJSON} from '../src/structure-io.mjs';
const $=id=>document.getElementById(id),canvas=$('scene'),ctx=canvas.getContext('2d');let structure, yaw=-0.55,pitch=0.45,scale=1,drag=null;let projectedAtoms=[];let selected=[];let undoStack=[],redoStack=[];let atomPage=0;
const demo=()=>createStructure({lattice:[[0,2.715,2.715],[2.715,0,2.715],[2.715,2.715,0]],atoms:[{id:'Si-1',element:'Si',fractional:[0,0,0]},{id:'Si-2',element:'Si',fractional:[.25,.25,.25]}],metadata:{sourceFormat:'KITCAT demo',description:'Silicon diamond primitive cell, lattice constant 5.43 Å (illustrative)'}});
const f=x=>Number(x).toFixed(5);function snapshot(){return JSON.stringify(structure)}
function syncHistory(){ $('undo').disabled=!undoStack.length; $('redo').disabled=!redoStack.length }
function assign(s,{record=true}={}){const next=createStructure(s);if(record&&structure){undoStack.push(snapshot());if(undoStack.length>50)undoStack.shift();redoStack=[]}structure=next;selected=[];syncHistory();update()}
function selectAtom(i,add=false){if(!Number.isInteger(i)||i<0||i>=structure.atoms.length)return;selected=add?[...selected.filter(x=>x!==i),i].slice(-4):[i];renderSelected();draw()}
function cartesianToFractionalLocal(r,lattice){
  const [a,b,c]=lattice;
  const cross=(u,v)=>[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
  const dot=(u,v)=>u.reduce((n,x,i)=>n+x*v[i],0);
  const bc=cross(b,c),ca=cross(c,a),ab=cross(a,b),det=dot(a,bc);
  if(!Number.isFinite(det)||Math.abs(det)<1e-10)throw Error('Lattice is singular');
  return [dot(r,bc)/det,dot(r,ca)/det,dot(r,ab)/det];
}
const xyzOf=i=>fractionalToCartesian(structure.atoms[i].fractional,structure.lattice);
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const dot=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
const norm=a=>Math.hypot(...a);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
function angle3(i,j,k){const u=sub(xyzOf(i),xyzOf(j)),v=sub(xyzOf(k),xyzOf(j)),den=norm(u)*norm(v);if(den<1e-12)throw Error('Undefined angle: zero-length segment');return Math.acos(Math.max(-1,Math.min(1,dot(u,v)/den)))*180/Math.PI}
function torsion(i,j,k,l){const p0=xyzOf(i),p1=xyzOf(j),p2=xyzOf(k),p3=xyzOf(l);const axis=sub(p2,p1),axislen=norm(axis);if(axislen<1e-12)throw Error('Undefined dihedral: middle bond length is zero');const b=axis.map(x=>x/axislen),a=sub(p0,p1),c=sub(p3,p2),v=sub(a,b.map(x=>x*dot(a,b))),w=sub(c,b.map(x=>x*dot(c,b)));if(norm(v)*norm(w)<1e-12)throw Error('Undefined dihedral: collinear atoms');return Math.atan2(dot(cross(b,v),w),dot(v,w))*180/Math.PI}
function renderSelected(){
 const a=selected.length===1?structure.atoms[selected[0]]:null;
 $('selectedLabel').textContent=a?`${a.id} · ${a.element}`:selected.length?`Selected (${selected.length}): ${selected.map(i=>structure.atoms[i].id).join(' → ')}`:'Belum ada atom dipilih';
 const mode=$('coordMode').value,coords=a?(mode==='cartesian'?xyzOf(selected[0]):a.fractional):null;
 for(const [j,id] of ['fx','fy','fz'].entries()){$(id).value=coords?String(Number(coords[j].toPrecision(12))):'';$(id).disabled=!a;document.querySelector(`label[for="${id}"]`)?.setAttribute('title',mode)}
 $('moveAtom').disabled=!a;
 document.querySelectorAll('#atoms tr').forEach(tr=>tr.classList.toggle('selected',selected.includes(Number(tr.dataset.index))));
}
function update(){const m=latticeMetrics(structure);$('lattice').innerHTML=structure.lattice.map((v,i)=>`<div class="lattice-row">${v.map((x,j)=>`<input type="number" step="any" data-i="${i}" data-j="${j}" value="${x}">`).join('')}</div>`).join('');const filter=$('elementFilter'),old=filter.value,els=[...new Set(structure.atoms.map(a=>a.element))].sort();filter.replaceChildren(new Option('All elements','all'),...els.map(x=>new Option(x,x)));filter.value=els.includes(old)?old:'all';atomPage=0;renderAtomTable();renderSelected();$('count').textContent=`${structure.atoms.length} atoms`;$('metrics').innerHTML=`<strong>Cell volume:</strong> ${f(m.volume)} Å³<br><strong>Lengths:</strong> ${m.lengths.map(f).join(' / ')} Å<br><strong>Angles:</strong> ${m.angles.map(f).join(' / ')}°`;$('caption').textContent=`${structure.atoms.length} atoms · ${[...new Set(structure.atoms.map(a=>a.element))].join(', ')} · volume ${f(m.volume)} Å³`;$('provenance').textContent=JSON.stringify(structure.metadata,null,2);check();draw()}
function renderAtomTable(){
 const filter=$('elementFilter').value, q=$('atomSearch').value.trim().toLowerCase();
 const matches=[];structure.atoms.forEach((a,i)=>{if((filter==='all'||a.element===filter)&&(!q||`${a.id} ${a.element} ${a.speciesLabel||''}`.toLowerCase().includes(q)))matches.push(i)});
 const pageSize=Number($('pageSize').value),pages=Math.max(1,Math.ceil(matches.length/pageSize));atomPage=Math.max(0,Math.min(atomPage,pages-1));
 const visible=matches.slice(atomPage*pageSize,(atomPage+1)*pageSize);$('atoms').replaceChildren();
 for(const i of visible){const a=structure.atoms[i],tr=document.createElement('tr');for(const value of [a.id,a.speciesLabel||a.element,...a.fractional.map(f),a.selectiveDynamics?.map(v=>v?'T':'F').join(' ')??'—']){const td=document.createElement('td');td.textContent=value;tr.append(td)}tr.dataset.index=String(i);tr.classList.toggle('selected',selected.includes(i));tr.addEventListener('click',e=>selectAtom(i,e.shiftKey));$('atoms').append(tr)}
 $('pageInfo').textContent=`${matches.length} cocok · halaman ${atomPage+1}/${pages}`;$('prevPage').disabled=atomPage===0;$('nextPage').disabled=atomPage>=pages-1;
}
function applyElementFilter(){atomPage=0;renderAtomTable()}
function check(){const report=validateBulk(structure,{maxPairs:60000});$('status').className=`status ${report.status}`;$('status').textContent=`${report.status.toUpperCase()} — ${report.errors.length} error · ${report.warnings.length} warning`;$('issues').replaceChildren();for(const issue of [...report.errors,...report.warnings].slice(0,30)){const d=document.createElement('div');d.className='issue';d.textContent=`${issue.code}: ${issue.message||issue.atoms?.join(', ')||''}`;$('issues').append(d)}if(report.warnings.some(w=>w.code==='PAIR_LIMIT')){$('issues').insertAdjacentHTML('beforeend','<div class="issue">Distance checking incomplete on large structure.</div>')}}
function project(p,w,h,r){const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);const x=cy*p[0]-sy*p[1],y=sy*p[0]+cy*p[1];return [w/2+x*r*scale,h/2-(cp*p[2]-sp*y)*r*scale,sp*p[2]+cp*y]}
function draw(){
  if(!structure)return;
  const dpr=window.devicePixelRatio||1,rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
  canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const w=rect.width,h=rect.height;ctx.clearRect(0,0,w,h);
  const all=structure.atoms.map(a=>fractionalToCartesian(a.fractional,structure.lattice));
  const ends=structure.lattice;
  const vec=(...idx)=>[0,1,2].map(k=>idx.reduce((sum,i)=>sum+ends[i][k],0));
  const corners=[vec(),vec(0),vec(1),vec(2),vec(0,1),vec(0,2),vec(1,2),vec(0,1,2)];
  const pts=[...all,...corners];
  const center=[0,1,2].map(i=>(Math.min(...pts.map(p=>p[i]))+Math.max(...pts.map(p=>p[i])))/2);
  const rotated=pts.map(p=>project(p.map((v,i)=>v-center[i]),0,0,1));
  const minX=Math.min(...rotated.map(p=>p[0])), maxX=Math.max(...rotated.map(p=>p[0]));
  const minY=Math.min(...rotated.map(p=>p[1])), maxY=Math.max(...rotated.map(p=>p[1]));
  const pad=42,r=Math.min((w-2*pad)/Math.max(.00001,maxX-minX),(h-2*pad)/Math.max(.00001,maxY-minY));
  const xOffset=-(minX+maxX)/2*r*scale,yOffset=-(minY+maxY)/2*r*scale;
  const cp=p=>{const q=project(p.map((v,i)=>v-center[i]),w,h,r);return [q[0]+xOffset,q[1]+yOffset,q[2]]};
  const lines=[[0,1],[0,2],[0,3],[1,4],[2,4],[1,5],[3,5],[2,6],[3,6],[4,7],[5,7],[6,7]];
  ctx.strokeStyle='#709cc0';ctx.lineWidth=1.2;
  for(const [i,j] of lines){const a=cp(corners[i]),b=cp(corners[j]);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
  const palette={Si:'#7ac0ff',Fe:'#d49b75',O:'#ff7272',C:'#8eacbf',H:'#f3f6ff',Cu:'#efba77',Al:'#b8b8cb',Na:'#bc80e8',Cl:'#79cc87'};
  const projected=all.map((p,i)=>{const q=cp(p);return{x:q[0],y:q[1],z:q[2],index:i,element:structure.atoms[i].element}}).sort((a,b)=>a.z-b.z);$('viewerLimit').textContent=projected.length>700?`PERINGATAN: ${projected.length} atom pada struktur; viewer menggambar maksimal 700 atom. Tabel, model, dan ekspor tetap mencakup semua ${structure.atoms.length} atom. Nonaktifkan periodic images/repeat atau gunakan filter tabel.`:'';
  projectedAtoms=projected;
  // Bonds are approximate visual hints, not validated chemical bonds. For clarity show only within-image pairs.
  if($('bonds').checked && all.length<=350){
    const rads={H:.31,C:.76,N:.71,O:.66,Si:1.11,Fe:1.24,Al:1.21,Cu:1.32,Na:1.66,Cl:1.02};
    const byIndex=new Map(projected.map(p=>[p.index,p]));let drawn=0;
    for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){
      const a=all[i],b=all[j],d=Math.hypot(...a.map((v,k)=>v-b[k]));
      const threshold=1.25*((rads[structure.atoms[i].element]||.95)+(rads[structure.atoms[j].element]||.95));
      if(d>.25&&d<=threshold&&drawn++<1800){const p=byIndex.get(i),q=byIndex.get(j);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='#b8cfe49e';ctx.lineWidth=2.4;ctx.stroke()}
    }
  }
  if($('images').checked && all.length<=120){
    const ghostOpacity=Number($('imageOpacity').value)/100;
    for(const axis of [0,1,2])for(const sign of [-1,1]){
      for(const atom of all){const p=cp(atom.map((v,k)=>v+sign*ends[axis][k]));if(p[0]<0||p[0]>w||p[1]<0||p[1]>h)continue;ctx.beginPath();ctx.arc(p[0],p[1],Math.max(2,Number($('atomSize').value)*.44),0,Math.PI*2);ctx.fillStyle=`rgba(169,213,245,${ghostOpacity})`;ctx.fill()}
    }
  }
  // Display-only translations: do NOT modify structure, atoms, export, or selection.
  const copies=Number($('repeatView').value);
  if(copies>1 && all.length*copies**3<=1200){
   ctx.save();ctx.globalAlpha=.28;let rendered=0;
   for(let i=0;i<copies;i++)for(let j=0;j<copies;j++)for(let k=0;k<copies;k++){
    if(i===0&&j===0&&k===0)continue;
    const shift=[0,1,2].map(q=>i*ends[0][q]+j*ends[1][q]+k*ends[2][q]);
    for(const atom of all){const p=cp(atom.map((v,q)=>v+shift[q]));if(p[0]<0||p[0]>w||p[1]<0||p[1]>h)continue;
     ctx.beginPath();ctx.arc(p[0],p[1],Math.max(2,Number($('atomSize').value)*.55),0,Math.PI*2);ctx.fillStyle='#7cbfff';ctx.fill();rendered++;
    }
   }
   ctx.restore();
  }
  for(const a of projected.slice(0,700)){ctx.beginPath();const radius=Math.max(3,Math.min(30,Number($('atomSize').value)*Math.sqrt(Math.max(.4,scale))));const grad=ctx.createRadialGradient(a.x-radius*.3,a.y-radius*.35,1,a.x,a.y,radius);grad.addColorStop(0,'#f3fbff');grad.addColorStop(.27,palette[a.element]||'#5fdbbd');grad.addColorStop(1,'#254467');ctx.arc(a.x,a.y,radius,0,Math.PI*2);ctx.fillStyle=grad;ctx.fill();ctx.strokeStyle=selected.includes(a.index)?'#ffe36b':'#d9f0ff';ctx.lineWidth=selected.includes(a.index)?3.5:.8;ctx.stroke()}
  if($('labels').checked && projected.length<=150){ctx.font='11px system-ui';ctx.fillStyle='#f5faff';for(const a of projected){ctx.fillText(structure.atoms[a.index].id,a.x+14,a.y-12)}}
  ctx.fillStyle='#b9d2e6';ctx.font='12px system-ui';ctx.fillText(projected.length>700?'Showing first 700 atoms':`${projected.length} atoms · repeat ${$('repeatView').value}× (visual only)`,14,h-15);
}
canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!drag)return;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>5)drag.moved=true;yaw+=(e.clientX-drag.x)*.008;pitch=Math.max(-1.5,Math.min(1.5,pitch+(e.clientY-drag.y)*.008));drag={...drag,x:e.clientX,y:e.clientY};draw()});canvas.addEventListener('pointerup',e=>{if(drag&&!drag.moved){const rect=canvas.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;const hits=projectedAtoms.filter(a=>Math.hypot(x-a.x,y-a.y)<=Math.max(10,Number($('atomSize').value)*Math.sqrt(Math.max(.4,scale))+4));if(hits.length)selectAtom(hits[hits.length-1].index,e.shiftKey)}drag=null});canvas.addEventListener('pointercancel',()=>drag=null);canvas.addEventListener('wheel',e=>{e.preventDefault();scale=Math.max(.2,Math.min(5,scale*(e.deltaY>0?.9:1.1)));draw()},{passive:false});window.addEventListener('resize',draw);
$('repeatView').onchange=draw;$('labels').onchange=draw;$('bonds').onchange=draw;$('images').onchange=draw;$('atomSize').oninput=draw;$('imageOpacity').oninput=draw;const viewer=document.querySelector('.viewer');
$('maximize').onclick=async()=>{try{if(document.fullscreenElement===viewer){await document.exitFullscreen()}else if(viewer.requestFullscreen){await viewer.requestFullscreen()}else{throw Error('Fullscreen API unavailable')}}catch(err){viewer.classList.toggle('expanded');$('maximize').textContent=viewer.classList.contains('expanded')?'Close expanded view':'Fullscreen studio';requestAnimationFrame(draw)}};
document.addEventListener('fullscreenchange',()=>{$('maximize').textContent=document.fullscreenElement===viewer?'Exit fullscreen':'Fullscreen studio';requestAnimationFrame(draw)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&viewer.classList.contains('expanded')){viewer.classList.remove('expanded');$('maximize').textContent='Fullscreen studio';requestAnimationFrame(draw)}});$('undo').onclick=()=>{if(!undoStack.length)return;redoStack.push(snapshot());assign(JSON.parse(undoStack.pop()),{record:false});syncHistory()};$('redo').onclick=()=>{if(!redoStack.length)return;undoStack.push(snapshot());assign(JSON.parse(redoStack.pop()),{record:false});syncHistory()};$('clearSelection').onclick=()=>{selected=[];renderSelected();draw()};$('moveAtom').onclick=()=>safe(()=>{if(selected.length!==1)throw Error('Choose exactly one atom');let pos=['fx','fy','fz'].map(k=>Number($(k).value));if(!pos.every(Number.isFinite)||['fx','fy','fz'].some(k=>$(k).value.trim()===''))throw Error('All coordinates must be finite numbers');const atoms=structure.atoms.map(a=>({...a,fractional:[...a.fractional]}));if($('coordMode').value==='cartesian')pos=cartesianToFractionalLocal(pos,structure.lattice);atoms[selected[0]].fractional=pos;assign({...structure,atoms,metadata:{...structure.metadata,atomicEdit:true}})});$('distance').onclick=()=>safe(()=>{if(selected.length!==2)throw Error('Select two atoms: click first then Shift+click second');const d=minImageDistance(structure,selected[0],selected[1]);$('measureResult').textContent=`Periodic minimum distance: ${d.toFixed(6)} Å`});$('angle').onclick=()=>safe(()=>{if(selected.length!==3)throw Error('Select 3 atoms in order using Shift+click');const x=periodicAngle(structure,...selected);$('measureResult').textContent=`Periodic angle: ${x.degrees.toFixed(5)}°${x.ambiguous?' · WARNING: equally short periodic images; angle is ambiguous':''}`});$('dihedral').onclick=()=>safe(()=>{if(selected.length!==4)throw Error('Select 4 atoms in order using Shift+click');const x=periodicDihedral(structure,...selected);$('measureResult').textContent=`Periodic dihedral: ${x.degrees.toFixed(5)}°${x.ambiguous?' · WARNING: equally short periodic images; dihedral is ambiguous':''}`});$('coordMode').onchange=renderSelected;$('elementFilter').onchange=applyElementFilter;$('atomSearch').oninput=()=>{atomPage=0;renderAtomTable()};$('pageSize').onchange=()=>{atomPage=0;renderAtomTable()};$('prevPage').onclick=()=>{atomPage--;renderAtomTable()};$('nextPage').onclick=()=>{atomPage++;renderAtomTable()};$('reset').onclick=()=>assign(demo());$('viewreset').onclick=()=>{yaw=-.55;pitch=.45;scale=1;draw()};$('apply').onclick=()=>safe(()=>{const next=structure.lattice.map(r=>[...r]);for(const x of document.querySelectorAll('#lattice input'))next[+x.dataset.i][+x.dataset.j]=Number(x.value);assign(createStructure({lattice:next,atoms:structure.atoms,metadata:{...structure.metadata,editedLattice:true}}))});$('super').onclick=()=>safe(()=>{const n=['sa','sb','sc'].map(x=>Number($(x).value));if(n.some(v=>!Number.isSafeInteger(v)||v<1||v>8))throw Error('Supercell factors must be integers from 1 to 8');assign(supercell(structure,[[n[0],0,0],[0,n[1],0],[0,0,n[2]]],{maxAtoms:20000}))});$('validate').onclick=check;
$('file').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{const text=await file.text();assign(importStructure(text,{filename:file.name,xyz:{vacuum:Number($('vacuum').value)}}))}catch(err){alert(`Import rejected: ${err.code||''} ${err.message}`)}e.target.value=''});function safe(fn){try{fn()}catch(e){alert(`${e.code||'Error'}: ${e.message}`)}}
function download(name,content){const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}$('json').onclick=()=>safe(()=>download('kitcat-structure.json',exportJSON(structure)));$('poscar').onclick=()=>safe(()=>download('POSCAR',writePOSCAR(structure)));$('extxyz').onclick=()=>safe(()=>{if(structure.atoms.some(a=>a.selectiveDynamics))throw Error('Extended XYZ writer cannot preserve selective dynamics. Export JSON or POSCAR.');download('structure.xyz',writeXYZ(structure))});assign(demo());
