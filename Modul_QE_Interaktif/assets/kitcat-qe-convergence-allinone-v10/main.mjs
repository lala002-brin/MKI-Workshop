import {previewPairs} from './pair-preview.mjs';
import {parseQEInput,matchInputsOutputs} from './qe-input-parser.mjs';
import {auditSeries} from './quality-audit.mjs';
import {calculate as calcK,csv as csvK} from './kcore.mjs';
import {calculate as calcC,csv as csvC} from './ccore.mjs';
import {parseQEOutput} from './qe-parser.mjs';
const $=id=>document.getElementById(id);let mode='k',rows=[],result=null,lastAudit=null;let inputFiles=[];
const safe=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function addRow(r={}){rows.push({filename:r.filename||'Manual',mesh:r.mesh||'',wfc:r.wfc??'',rho:r.rho??'',energy:r.energy??'',qe:r.qe||null});renderRows();}
function renderRows(){ $('rows').innerHTML=rows.map((r,i)=>`<tr><td title="${safe(r.filename)}">${safe(r.filename)}${r.qe?`<div class="status ${r.qe.jobDone&&r.qe.convergence?'good':'bad'}">${r.qe.jobDone&&r.qe.convergence?'SCF converged · JOB DONE':'REVIEW · output belum terverifikasi'}</div>`:''}</td>${['mesh','wfc','rho','energy'].map(k=>`<td><input data-i="${i}" data-key="${k}" value="${safe(r[k])}" aria-label="${k} baris ${i+1}"></td>`).join('')}<td class="status">${r.qe?safe(r.qe.warnings.slice(0,2).join(' | ')||'OK'):'Manual'}</td><td><button class="subtle" data-del="${i}" aria-label="Hapus">×</button></td></tr>`).join('');update();}
$('rows').addEventListener('input',e=>{const k=e.target.dataset.key,i=Number(e.target.dataset.i);if(k&&rows[i]){rows[i][k]=e.target.value;update();}});
$('rows').addEventListener('click',e=>{const i=e.target.dataset.del;if(i!==undefined){rows.splice(Number(i),1);renderRows();}});
const svgNS='http://www.w3.org/2000/svg';
const defaults={plotColor:'#245ab5',markerColor:'#245ab5',tolColor:'#c15a38',gridColor:'#dde4ec',bgColor:'#ffffff',markerShape:'circle',markerSize:'5',lineWidth:'2.5',plotFontSize:'14',plotTitle:'',figureLayout:'wide',titleFont:'22',showGrid:'yes'};
function figureSize(){const layout=$('figureLayout').value;return layout==='column'?[900,750]:layout==='square'?[900,900]:[1200,650];}
function styleOptions(){return Object.fromEntries(Object.keys(defaults).map(k=>[k,$(k).value]));}
function niceStep(rough) {
 if (!(rough>0) || !Number.isFinite(rough)) return 1;
 const order=Math.pow(10,Math.floor(Math.log10(rough)));
 const fraction=rough/order;
 return (fraction<=1?1:fraction<=2?2:fraction<=2.5?2.5:fraction<=5?5:10)*order;
}
function plotAxis(values,tolerance=null,delta=false){
 if(!values.length||values.some(v=>!Number.isFinite(v)))throw Error('Data grafik tidak valid.');
 const mn=Math.min(...values),mx=Math.max(...values);
 if(delta){
  const maximum=Math.max(0,mx,Number.isFinite(tolerance)?tolerance:0);
  const step=niceStep(Math.max(maximum/5,1e-10));
  return {lo:0,hi:Math.max(step,Math.ceil(maximum/step)*step),step};
 }
 let range=mx-mn;
 if(range<1e-11)range=Math.max(Math.abs(mx)*1e-5,1e-5);
 const step=niceStep(range/4);
 let lo=Math.floor((mn-range*.05)/step)*step;
 let hi=Math.ceil((mx+range*.05)/step)*step;
 if(hi<=lo)hi=lo+step;
 return {lo,hi,step};
}
function chart(id,data,key,labels,tol){
 const svg=$(id);svg.replaceChildren();svg.setAttribute('xmlns',svgNS);
 const [W,H]=figureSize(),LEFT=W<1000?132:145,RIGHT=46,TOP=112,BOTTOM=130,plotW=W-LEFT-RIGHT,plotH=H-TOP-BOTTOM;
 svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('role','img');
 if(data.length<2)return;
 const o=styleOptions(),values=data.map(d=>Number(d[key]));if(values.some(v=>!Number.isFinite(v)))return;
 const delta=id==='delta',axis=plotAxis(values,tol,delta);
 const size=Math.max(12,Math.min(28,Number(o.plotFontSize)||14));
 const x=i=>LEFT+i*plotW/Math.max(1,data.length-1);
 const y=v=>TOP+(axis.hi-v)/(axis.hi-axis.lo)*plotH;
 const add=(tag,attrs,content,parent=svg)=>{const el=document.createElementNS(svgNS,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));if(content!==undefined)el.textContent=content;parent.appendChild(el);return el;};
 const formatTick=v=>{
  if(delta)return Number(v.toFixed(axis.step<1?Math.min(4,Math.max(1,-Math.floor(Math.log10(axis.step)))):0)).toString();
  const digits=axis.step>=1?0:Math.min(7,Math.max(1,-Math.floor(Math.log10(axis.step))+1));
  return v.toFixed(digits);
 };
 add('rect',{x:0,y:0,width:W,height:H,fill:o.bgColor});
 const axisLabel=delta?'Energy difference to reference (meV/atom)':'Total energy per atom (eV/atom)';
 const title=(o.plotTitle.trim()?`${o.plotTitle.trim()} — `:'')+(delta?'Convergence difference':'Energy convergence');
 add('text',{x:W/2,y:50,'text-anchor':'middle','font-family':'Arial, sans-serif','font-weight':700,'font-size':Math.max(12,Math.min(40,Number(o.titleFont)||22)),fill:'#162c43'},title);
 // Tick count and step derive from data, not an arbitrary interpolation that introduces negative delta ticks.
 const nticks=Math.max(1,Math.min(10,Math.round((axis.hi-axis.lo)/axis.step)));
 for(let j=0;j<=nticks;j++){
  const v=j===nticks?axis.hi:axis.lo+j*axis.step,yy=y(v);
  if(o.showGrid==='yes')add('line',{x1:LEFT,y1:yy,x2:W-RIGHT,y2:yy,stroke:o.gridColor,'stroke-width':1});
  add('text',{x:LEFT-18,y:yy+5,'text-anchor':'end','font-family':'Arial, sans-serif','font-size':size,fill:'#43576a'},formatTick(v));
 }
 add('line',{x1:LEFT,y1:TOP,x2:LEFT,y2:TOP+plotH,stroke:'#35465a','stroke-width':1.4});
 add('line',{x1:LEFT,y1:TOP+plotH,x2:W-RIGHT,y2:TOP+plotH,stroke:'#35465a','stroke-width':1.4});
 if(delta&&tol!==null&&Number.isFinite(tol)&&tol>=0&&tol<=axis.hi){
  const yy=y(tol);
  add('line',{x1:LEFT,x2:W-RIGHT,y1:yy,y2:yy,stroke:o.tolColor,'stroke-width':2.3,'stroke-dasharray':'10 7'});
  add('text',{x:W-RIGHT-10,y:Math.max(TOP+size+7,yy-12),'text-anchor':'end','font-size':size,'font-family':'Arial, sans-serif',fill:o.tolColor},`Tolerance = ${tol} meV/atom`);
 }
 add('polyline',{points:data.map((d,i)=>`${x(i)},${y(d[key])}`).join(' '),fill:'none',stroke:o.plotColor,'stroke-width':Math.max(1,Number(o.lineWidth)||2.5),'stroke-linejoin':'round','stroke-linecap':'round'});
 const radius=Math.max(2,Math.min(18,Number(o.markerSize)||5));
 data.forEach((d,i)=>{
  const px=x(i),py=y(d[key]);
  if(o.markerShape==='circle')add('circle',{cx:px,cy:py,r:radius,fill:o.markerColor,stroke:o.bgColor,'stroke-width':1.2});
  if(o.markerShape==='square')add('rect',{x:px-radius,y:py-radius,width:radius*2,height:radius*2,fill:o.markerColor});
  if(o.markerShape==='diamond')add('polygon',{points:`${px},${py-radius*1.35} ${px+radius*1.35},${py} ${px},${py+radius*1.35} ${px-radius*1.35},${py}`,fill:o.markerColor});
  add('text',{x:px,y:TOP+plotH+31,'text-anchor':'middle','font-family':'Arial, sans-serif','font-size':size,fill:'#34495e'},String(labels[i]).slice(0,17));
 });
 add('text',{x:W/2,y:H-40,'text-anchor':'middle','font-family':'Arial, sans-serif','font-size':size+2,'font-weight':600,fill:'#293f54'},mode==='k'?'K-point mesh':mode==='wfc'?'Wavefunction cutoff ecutwfc (Ry)':'Charge-density cutoff ecutrho (Ry)');
 add('text',{transform:`translate(38,${TOP+plotH/2}) rotate(-90)`,'text-anchor':'middle','font-family':'Arial, sans-serif','font-size':size+2,'font-weight':600,fill:'#293f54'},axisLabel);
}
function renderAudit(){lastAudit=auditSeries(rows,mode,Number($('atoms').value));$('qualitySummary').textContent=`${lastAudit.status} · ${lastAudit.outputs} output QE · ${lastAudit.points} baris`; $('qualitySummary').className='quality-summary '+(lastAudit.status==='BLOCKED'?'quality-blocked':''); $('qualityIssues').innerHTML=lastAudit.issues.length?lastAudit.issues.map(i=>`<p><b>${safe(i.code)}</b> · ${safe(i.message)}</p>`).join(''):'<p>Tidak ada masalah metadata yang terdeteksi. Verifikasi parameter dan konvergensi fisik tetap diperlukan.</p>'; }
function update(){renderAudit();const unit=$('unit').value,atoms=Number($('atoms').value),tol=Number($('tol').value);const entries=rows.filter(r=>String(r.energy).trim()!==''),warn=[];result=null;
if(entries.length<2){$('errors').textContent='Masukkan minimal dua output/data energi.';clearResults();return;}
try {const normalized=entries.map(r=>({...r,energy:Number(r.energy)*(r.qe&&unit==='eV'?13.605693122994:1)})); // Uploaded energies are always Ry. If UI set eV, convert their numeric values to eV.
const arg={unit,atoms,toleranceMeV:tol};result=mode==='k'?calcK(normalized.map(r=>({mesh:r.mesh,energy:r.energy})),arg):calcC(normalized.map(r=>({wfc:r.wfc,rho:r.rho,energy:r.energy})),{...arg,mode});
const qe=entries.filter(r=>r.qe);if(qe.length){if(qe.some(r=>!r.qe.jobDone||!r.qe.convergence))warn.push('Sebagian output tidak memiliki bukti JOB DONE + SCF convergence; jangan pakai sebagai keputusan final.');const counts=new Set(qe.map(r=>r.qe.atoms).filter(Boolean));if(counts.size>1)warn.push('Jumlah atom berbeda antar-output! Energi tidak boleh dibandingkan langsung.');if(qe.some(r=>r.qe.atoms&&r.qe.atoms!==atoms))warn.push('Jumlah atom pengaturan berbeda dari metadata output.');if(qe.some(r=>!r.qe.mesh)&&mode==='k')warn.push('Output QE tidak selalu mencetak K_POINTS automatic; pastikan mesh diisi manual dengan benar.');const fixed=mode==='k'?['wfc','rho']:mode==='rho'?['wfc']:[];for(const p of fixed){const set=new Set(qe.map(r=>r.qe[p]).filter(v=>v!==null));if(set.size>1)warn.push(`${p} berubah antar-file; parameter selain yang diuji sebaiknya tetap.`);}const volumeSet=new Set(qe.map(r=>r.qe.volume).filter(Boolean).map(v=>v.toFixed(4)));if(volumeSet.size>1)warn.push('Volume sel berbeda antar-output.');}
$('errors').textContent='';const d=result.data;let rec=result.recommended;const unsafe=warn.length>0||lastAudit.status!=='STATIC_CHECKS_ONLY';$('reference').textContent=mode==='k'?result.referenceMesh:`${result.referenceCutoff} Ry`;$('recommend').textContent=unsafe?'Perlu review data':rec?(mode==='k'?rec.mesh:`${rec.x} Ry`):'Belum cukup bukti';$('last').textContent=d.length>1?`${d.at(-1).deltaPreviousMeVPerAtom.toFixed(4)} meV/atom`:'—';$('notice').textContent=[...result.warnings,...warn,rec?'Indikasi statistik: perlu verifikasi dengan titik lebih rapat dan sifat target.':'Butuh ≥4 titik terurut dan sedikitnya dua titik lebih rapat setelah kandidat.'].join(' • ');chart('energy',d,'energyEVPerAtom',d.map(p=>mode==='k'?p.mesh:p.x),null);chart('delta',d,'deltaReferenceMeVPerAtom',d.map(p=>mode==='k'?p.mesh:p.x),tol);
}catch(e){result=null;clearResults();$('errors').textContent=e.message;}}
function clearResults(){['reference','recommend','last'].forEach(id=>$(id).textContent='—');['energy','delta'].forEach(id=>$(id).replaceChildren());$('notice').textContent='';}
function setMode(m){mode=m;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===m));$('modehelp').textContent=m==='k'?'Ubah hanya K_POINTS; ecutwfc dan ecutrho harus tetap. Output QE kadang tidak mencetak mesh; isi manual bila kosong.':m==='wfc'?'Ubah ecutwfc dan jaga rasio ecutrho/ecutwfc tetap. K-point, struktur, UPF harus sama.':'Ubah ecutrho saja; ecutwfc harus tetap. K-point, struktur, UPF harus sama.';update();}
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));['atoms','tol','unit'].forEach(id=>$(id).addEventListener('input',update));$('add').onclick=()=>addRow();$('clear').onclick=()=>{rows=[];inputFiles=[];renderRows();$('uploadInfo').textContent='';$('inputInfo').textContent='Input belum diunggah.';renderPairPreview();};$('sort').onclick=()=>{rows.sort((a,b)=>(mode==='k'?String(a.mesh).split(/[×x ]/).map(Number).reduce((p,v)=>p*v||0,1):Number(a[mode]))-(mode==='k'?String(b.mesh).split(/[×x ]/).map(Number).reduce((p,v)=>p*v||0,1):Number(b[mode])));renderRows();};
$('demo').onclick=()=>{rows=[];const nums=[30,40,50,60,70];for(let i=0;i<5;i++)addRow({filename:'CONTOH '+(i+1),mesh:`${i+2}x${i+2}x1`,wfc:nums[i],rho:nums[i]*8,energy:[-1250.12,-1250.43,-1250.485,-1250.492,-1250.493][i]});$('atoms').value='24';$('unit').value='Ry';renderRows();};
function renderPairPreview(){
 const preview=previewPairs(inputFiles,rows.filter(r=>r.qe));
 const table=$('pairRows');
 table.innerHTML=preview.rows.length?preview.rows.map(r=>`<tr><td>${safe(r.filename)}</td><td>${r.input?safe(r.input):'—'}</td><td>${safe(r.mesh??'—')}</td><td>${safe(r.wfc??'—')}</td><td>${safe(r.rho??'—')}</td><td>${safe(r.atoms??'—')}</td><td><span class="pair-status ${r.status==='BLOCKED'?'block':r.status==='REVIEW_REQUIRED'?'review':'ok'}">${safe(r.status)}</span>${r.issues.length?`<div class="hint">${safe(r.issues.join(' · '))}</div>`:''}</td></tr>`).join(''):'<tr><td colspan="7">Upload output untuk melihat hasil pencocokan.</td></tr>';
 $('pairSummary').textContent=`${preview.paired}/${preview.rows.length} output dipasangkan · ${preview.rows.filter(r=>r.status==='BLOCKED').length} BLOCKED · Status pemeriksaan hanya berbasis metadata, bukan verifikasi run fisik.`;
}
function applyInputPairs(){
 const out=rows.filter(r=>r.qe);for(const o of out)o.inputMeta=null;const paired=matchInputsOutputs(inputFiles,out);const notes=[...paired.warnings];
 for(const {output,input} of paired.matches){
  output.inputMeta=input;
  if(input.mesh){if(output.mesh&&output.mesh!==input.mesh)notes.push(`${output.filename}: mesh output berbeda dari input (${output.mesh} vs ${input.mesh}).`);else output.mesh=input.mesh;}
  for(const [rk,ik] of [['wfc','wfc'],['rho','rho']])if(Number.isFinite(input[ik])){
   if(Number.isFinite(output.qe[rk])&&Math.abs(output.qe[rk]-input[ik])>1e-4)notes.push(`${output.filename}: ${rk} output ${output.qe[rk]} berbeda dari input ${input[ik]}.`);
   else output[rk]=input[ik];
  }
  if(Number.isInteger(input.atoms)&&Number.isInteger(output.qe.atoms)&&input.atoms!==output.qe.atoms)notes.push(`${output.filename}: nat input dan output berbeda.`);
  if(input.calculation&&input.calculation!=='scf')notes.push(`${output.filename}: calculation=${input.calculation}; energi terakhir mungkin dari geometri berbeda.`);
 }
 $('inputInfo').textContent=`${inputFiles.length} input dibaca, ${paired.matches.length} dipasangkan. ${notes.join(' | ')}`;
 renderRows();renderPairPreview();
}
$('inputs').addEventListener('change',async e=>{
 const notes=[];
 for(const f of [...e.target.files]){try{if(f.size>10*1024*1024)throw Error('input lebih dari 10 MB');
 const metadata=parseQEInput(await f.text(),f.name);
 inputFiles=inputFiles.filter(x=>x.filename!==f.name);inputFiles.push(metadata);
 }catch(err){notes.push(`${f.name}: ${err.message}`);}}
 applyInputPairs();if(notes.length)$('inputInfo').textContent+=' | '+notes.join(' | ');e.target.value='';
});
$('files').addEventListener('change',async e=>{const f=[...e.target.files];const messages=[];for(const file of f){try{if(file.size>30*1024*1024)throw Error('File lebih dari 30 MB.');const p=parseQEOutput(await file.text(),file.name);rows.push({filename:file.name,mesh:p.mesh||'',wfc:p.wfc??'',rho:p.rho??'',energy:p.energyRy,qe:p});messages.push(`${file.name}: energi ${p.energyRy} Ry · ${p.jobDone&&p.convergence?'SCF selesai':'REVIEW'}`);if(p.atoms&&!rows.slice(0,-1).some(r=>r.qe?.atoms))$('atoms').value=String(p.atoms);}catch(err){messages.push(`${file.name}: ERROR ${err.message}`);}}$('unit').value='Ry';$('uploadInfo').textContent=messages.join(' | ');applyInputPairs();e.target.value='';});
function download(filename,text,type){const u=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=u;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(u),3000);}
$('csv').onclick=()=>{if(result)download('kitcat_qe_convergence.csv',mode==='k'?csvK(result):csvC(result),'text/csv');};$('json').onclick=()=>{if(result)download('kitcat_qe_convergence.json',JSON.stringify({mode,report:result,inputs:rows},null,2),'application/json');};setMode('k');

// Plot style controls and local image export. Exports use the exact rendered SVG.
const presets={journal:{plotColor:'#245ab5',markerColor:'#245ab5',tolColor:'#c15a38',gridColor:'#dde4ec',bgColor:'#ffffff'},mono:{plotColor:'#222222',markerColor:'#222222',tolColor:'#777777',gridColor:'#dedede',bgColor:'#ffffff'},teal:{plotColor:'#00887a',markerColor:'#00887a',tolColor:'#b04d30',gridColor:'#dcebe8',bgColor:'#ffffff'},warm:{plotColor:'#b04432',markerColor:'#b04432',tolColor:'#265aa8',gridColor:'#e9ddd7',bgColor:'#ffffff'}};
function exportSvgText(id){const source=$(id);if(!source.querySelector('polyline'))throw Error('Grafik belum tersedia; masukkan minimal dua data valid.');const copy=source.cloneNode(true);copy.setAttribute('xmlns',svgNS);const [w,h]=figureSize();copy.setAttribute('width',String(w));copy.setAttribute('height',String(h));return new XMLSerializer().serializeToString(copy);}
async function exportPlot(id,format){const markup=exportSvgText(id);const basename=`kitcat_${mode}_${id}_plot`;if(format==='svg'){download(`${basename}.svg`,markup,'image/svg+xml;charset=utf-8');return;}const scale=Number($('exportScale').value)||3,cv=document.createElement('canvas');const [w,h]=figureSize();cv.width=w*scale;cv.height=h*scale;const ctx=cv.getContext('2d');if(!ctx)throw Error('Canvas 2D tidak tersedia.');ctx.fillStyle=$('bgColor').value;ctx.fillRect(0,0,cv.width,cv.height);const url=URL.createObjectURL(new Blob([markup],{type:'image/svg+xml;charset=utf-8'}));try{const img=new Image();await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(Error('Gagal mengubah SVG menjadi gambar.'));img.src=url;});ctx.drawImage(img,0,0,cv.width,cv.height);}finally{URL.revokeObjectURL(url);}const mime=format==='jpg'?'image/jpeg':'image/png';const blob=await new Promise(resolve=>cv.toBlob(resolve,mime,.95));if(!blob)throw Error('Gagal mengekspor grafik.');const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=`${basename}.${format}`;a.click();setTimeout(()=>URL.revokeObjectURL(u),3000);}
document.querySelectorAll('[data-plot]').forEach(b=>b.addEventListener('click',async()=>{try{await exportPlot(b.dataset.plot,b.dataset.format);}catch(e){$('errors').textContent=e.message;}}));
for(const id of Object.keys(defaults)){$(id).addEventListener('input',update);}
$('plotPreset').addEventListener('change',()=>{for(const [k,v] of Object.entries(presets[$('plotPreset').value]))$(k).value=v;update();});
$('resetStyle').onclick=()=>{for(const [k,v] of Object.entries(defaults))$(k).value=v;$('plotPreset').value='journal';update();};
$('exportBoth').onclick=async()=>{try{await exportPlot('energy','png');await exportPlot('delta','png');}catch(e){$('errors').textContent=e.message;}};

// Style preset persistence: only non-sensitive plot appearance preferences.
const styleStorageKey='kitcat-qe-convergence-plot-style-v22';
$('saveStyle').onclick=()=>{try{localStorage.setItem(styleStorageKey,JSON.stringify(styleOptions()));$('styleMessage').textContent='Preset gaya tersimpan di browser ini.';}catch(e){$('styleMessage').textContent='Browser tidak mengizinkan penyimpanan lokal.';}};
$('loadStyle').onclick=()=>{try{const raw=localStorage.getItem(styleStorageKey);if(!raw)throw Error('Belum ada preset tersimpan.');const saved=JSON.parse(raw);for(const id of Object.keys(defaults)){const v=saved[id];if(typeof v==='string'&&$(id).options?.length){if([...$(id).options].some(op=>op.value===v))$(id).value=v;}else if(typeof v==='string'&&v.length<=120)$(id).value=v;}update();$('styleMessage').textContent='Preset gaya dimuat.';}catch(e){$('styleMessage').textContent=e.message;}};

$('auditJson').onclick=()=>{renderAudit();download('kitcat_qe_data_quality_audit.json',JSON.stringify({mode,audit:lastAudit,files:rows.map(r=>({filename:r.filename,mesh:r.mesh,wfc:r.wfc,rho:r.rho,energy:r.energy,metadata:r.qe,input:r.inputMeta||null}))},null,2),'application/json');};
