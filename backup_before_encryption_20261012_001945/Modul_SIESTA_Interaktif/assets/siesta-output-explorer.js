/* MKI Workshop SIESTA Output Explorer Core — 2026 */
(()=>{'use strict';
function mount(){
const root=document.getElementById('sx-app');if(!root||root.dataset.ready==='1')return;root.dataset.ready='1';
const $=id=>root.querySelector('#'+id), BOHR=0.529177210903, elems={1:'H',2:'He',3:'Li',4:'Be',5:'B',6:'C',7:'N',8:'O',9:'F',11:'Na',12:'Mg',13:'Al',14:'Si',15:'P',16:'S',17:'Cl',19:'K',20:'Ca',22:'Ti',24:'Cr',25:'Mn',26:'Fe',27:'Co',28:'Ni',29:'Cu',30:'Zn',35:'Br',53:'I'},colors={Cu:'#2854b8',O:'#ff2929',Fe:'#d68a28',Co:'#9451b6',C:'#555555',H:'#ffffff',N:'#3163e9'};
let out=null, xv=null, hist=[], viewer=null, structureModel=null, lastXYZ='',lastFiles=[];
function status(s,error=false){$('sx-status').textContent=s;$('sx-status').classList.toggle('error',error)}
function num(v){return Number.isFinite(v)}
function parseOut(text){const lines=text.split(/\r?\n/), result={label:null,energy:null,scfStatus:'Tidak diketahui',energies:[],warnings:[]};
 const label=text.match(/^\s*SystemLabel\s+([^\s#]+)/im);if(label)result.label=label[1];
 for(const [idx,line] of lines.entries()){
  const energy=line.match(/\bE_KS\(eV\)\s*=\s*([-+\d.EeDd]+)/);if(energy){const n=Number(energy[1].replace(/[dD]/g,'E'));if(num(n))result.energy=n}
  if(/SCF cycle converged|SCF convergence achieved|SCF converged/i.test(line))result.scfStatus='Konvergen (indikator log)';
  if(/SCF.*not converged|SCF NOT converged|SCF convergence failed/i.test(line))result.scfStatus='Tidak konvergen (indikator log)';
  // SIESTA iteration summaries often begin scf: <iteration> ... <E_KS(eV)> ...
  const mat=line.match(/^\s*scf:\s*(\d+)\s+(.+)$/i);if(mat){const values=mat[2].trim().split(/\s+/).map(v=>Number(v.replace(/[dD]/g,'E')));const candidates=values.filter(num);if(candidates.length>=3){ // Only record when energy column is identified in an scf header
   let head=lines.slice(Math.max(0,idx-12),idx).findLast(x=>/^\s*iscf\s|^\s*scf:\s*iscf\b/i.test(x));
   if(head){const names=head.replace(/^\s*(?:scf:)?\s*/i,'').trim().split(/\s+/),eidx=names.findIndex(x=>/^E_KS\b/i.test(x)||/^E\(eV\)$/i.test(x));if(eidx>=0&&eidx<values.length&&num(values[eidx]))result.energies.push({iteration:Number(mat[1]),energy:values[eidx],source:'scf:'});}
  }}
 }
 if(!result.energies.length)result.warnings.push('Tabel iterasi SCF tidak dikenali pada log ini; parser tidak akan menebak kolom energi.');
 if(result.energy==null)result.warnings.push('Pola E_KS(eV) tidak ditemukan; energi total belum dapat diekstrak.');
 return result;
}
function parseXV(text){const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));if(lines.length<5)throw Error('XV terlalu pendek.');
 const nums=s=>s.split(/\s+/).map(v=>Number(v.replace(/[dD]/g,'E')));
 const cell=lines.slice(0,3).map((s,i)=>{const a=nums(s);if(a.length<3||!a.slice(0,3).every(num))throw Error('Vektor kisi ke-'+(i+1)+' tidak valid');return a.slice(0,3).map(v=>v*BOHR)});
 const count=Number(lines[3].split(/\s+/)[0]);if(!Number.isInteger(count)||count<=0||count>50000)throw Error('Jumlah atom pada XV tidak valid.');if(lines.length<4+count)throw Error('Jumlah baris atom kurang dari '+count);
 const atoms=[];for(let i=0;i<count;i++){const a=nums(lines[4+i]);if(a.length<5||!a.slice(0,5).every(num))throw Error('Baris atom XV ke-'+(i+1)+' tidak valid');const z=Math.round(a[1]);atoms.push({elem:elems[z]||('Z'+z),x:a[2]*BOHR,y:a[3]*BOHR,z:a[4]*BOHR,atomicNumber:z})}
 return {cell,atoms,count};
}
function vectors(p){return p.cell.map(v=>Math.hypot(...v));}
function xyz(p,repeat=1){const atoms=[];for(let i=0;i<repeat;i++)for(let j=0;j<repeat;j++)for(let k=0;k<repeat;k++){const d=[0,1,2].map(m=>i*p.cell[0][m]+j*p.cell[1][m]+k*p.cell[2][m]);p.atoms.forEach(a=>atoms.push({...a,x:a.x+d[0],y:a.y+d[1],z:a.z+d[2]}));}return atoms.length+'\nSIESTA XV converted to Cartesian angstrom; periodic cell not saved\n'+atoms.map(a=>[a.elem,a.x.toFixed(7),a.y.toFixed(7),a.z.toFixed(7)].join(' ')).join('\n')+'\n';}
function drawCell(v,reps){if(!$('sx-cell').checked)return;const A=v.cell.map(a=>a.map(q=>q*reps)),origin=[0,0,0];function sum(a,b){return a.map((x,i)=>x+b[i]);}const p=[origin,A[0],A[1],A[2],sum(A[0],A[1]),sum(A[0],A[2]),sum(A[1],A[2]),sum(sum(A[0],A[1]),A[2])];const edges=[[0,1],[0,2],[0,3],[1,4],[1,5],[2,4],[2,6],[3,5],[3,6],[4,7],[5,7],[6,7]];const col=$('sx-bg').value==='dark'?'#e7eaf0':'#263448';for(const [i,j] of edges)viewer.addLine({start:{x:p[i][0],y:p[i][1],z:p[i][2]},end:{x:p[j][0],y:p[j][1],z:p[j][2]},color:col,linewidth:2});}
function draw(){if(!xv){$('sx-canvas-message').style.display='flex';return;}if(!window.$3Dmol){$('sx-canvas-message').textContent='3Dmol.js belum tersedia. Periksa internet atau Console Chrome.';return;}if(!viewer){viewer=window.$3Dmol.createViewer($('sx-canvas'),{backgroundColor:'#ffffff',antialias:true});}
 viewer.removeAllModels();viewer.removeAllShapes();let repeat=Number($('sx-repeat').value);const total=xv.count*repeat**3;if(total>4500){status('Supercell terlalu besar: '+total+' atom. Batasi hingga 4.500 atom.',true);return}
 lastXYZ=xyz(xv,repeat);structureModel=viewer.addModel(lastXYZ,'xyz');const mode=$('sx-mode').value, bg={white:'#ffffff',ice:'#edf5ff',dark:'#101828'}[$('sx-bg').value];viewer.setBackgroundColor(bg);const bonds=$('sx-bonds').checked;let all=mode==='sphere'?{sphere:{scale:.9}}:mode==='line'?{line:{linewidth:1.5}}:mode==='stick'?{stick:{radius:.15}}:{sphere:{scale:.35},...(bonds?{stick:{radius:.12}}:{})};if(!bonds&&mode==='stick')all={sphere:{scale:.18}};if(!bonds&&mode==='line')all={sphere:{scale:.22}};
 viewer.setStyle({},all);for(const [elem,color] of Object.entries(colors)){const st=JSON.parse(JSON.stringify(all));for(const key of Object.keys(st))st[key].color=color;viewer.setStyle({elem},st);}drawCell(xv,repeat);$('sx-canvas-message').style.display='none';viewer.zoomTo();viewer.render();
 const len=vectors(xv).map(x=>x.toFixed(3));$('sx-lattice').textContent=`Unit cell: a=${len[0]} Å; b=${len[1]} Å; c=${len[2]} Å · Replika ${repeat}×${repeat}×${repeat} · ${total} atom tampilan.`;
}
function ensure3D(){if(window.$3Dmol){draw();return;}if(document.getElementById('sx-3dmol'))return;const script=document.createElement('script');script.id='sx-3dmol';script.src='https://3Dmol.org/build/3Dmol-min.js';script.onload=draw;script.onerror=()=>status('Gagal memuat 3Dmol.js dari CDN; periksa koneksi internet.',true);document.head.appendChild(script)}
function chart(){const node=$('sx-chart');if(hist.length<2){node.innerHTML='<p style="padding:18px;color:#65758a">Riwayat SCF belum tersedia atau format iterasinya tidak dikenali.</p>';return;}const W=860,H=300,l=73,r=27,t=20,b=54,min=Math.min(...hist.map(x=>x.energy)),max=Math.max(...hist.map(x=>x.energy)),span=max-min||1, ymin=min-span*.1,ymax=max+span*.1;const x=i=>l+(i/(hist.length-1))*(W-l-r),y=e=>t+(ymax-e)/(ymax-ymin)*(H-t-b);let d=hist.map((v,i)=>(i?'L':'M')+x(i).toFixed(1)+' '+y(v.energy).toFixed(1)).join(' ');let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="white"/>`;for(let i=0;i<=4;i++){let e=ymin+(ymax-ymin)*i/4,yy=y(e);svg+=`<line x1="${l}" x2="${W-r}" y1="${yy}" y2="${yy}" stroke="#e6ebf2"/><text x="${l-9}" y="${yy+4}" text-anchor="end" font-size="13" fill="#3a4a60">${e.toFixed(3)}</text>`;}svg+=`<path d="${d}" fill="none" stroke="#2865bd" stroke-width="2.8"/><text x="${W/2}" y="${H-13}" text-anchor="middle" font-size="14">Iterasi SCF</text><text transform="translate(17 ${H/2}) rotate(-90)" text-anchor="middle" font-size="14">Energi (eV)</text></svg>`;node.innerHTML=svg;}
function update(){const data=out||{};$('sx-system').textContent=data.label||'—';$('sx-energy').textContent=num(data.energy)?data.energy.toFixed(6):'—';$('sx-scf').textContent=data.scfStatus||'—';$('sx-natoms').textContent=xv?xv.count:'—';hist=data.energies||[];chart();$('sx-scf-rows').innerHTML=hist.slice(-250).map(x=>`<tr><td>${x.iteration}</td><td>${x.energy.toFixed(8)}</td><td>scf:</td></tr>`).join('')||'<tr><td colspan="3">Tidak ada data SCF yang teridentifikasi.</td></tr>';$('sx-raw').textContent=data.raw?data.raw.slice(0,50000):'—';$('sx-diagnostics').textContent=[...(data.warnings||[]),...(xv?[`Kisi XV terbaca, ${xv.count} atom.`]:['File .XV belum tersedia.'])].join(' ')||'Data telah dikenali.';if(xv)ensure3D();else{$('sx-lattice').textContent='Kisi belum tersedia.';if(viewer){viewer.removeAllModels();viewer.removeAllShapes();viewer.render();}}$('sx-files-list').innerHTML=lastFiles.map(n=>`<span class="sx-file"></span>`).join('');[...$('sx-files-list').children].forEach((n,i)=>n.textContent=lastFiles[i]);}
async function files(list){const selected=[...list].filter(f=>!f.name.startsWith('.'));if(!selected.length)return;let o=null,v=null,names=[];for(const f of selected){if(f.size>30*1024*1024){status(f.name+' lebih besar dari 30 MB; dilewati.',true);continue;}const name=f.name.toLowerCase(),content=await f.text();try{if(name.endsWith('.xv')){v=parseXV(content);names.push(f.name)}else if(name.endsWith('.out')){o=parseOut(content);o.raw=content;names.push(f.name)}}catch(err){status('Gagal membaca '+f.name+': '+err.message,true);return;}}
 if(!names.length){status('Tidak ada file .out atau .XV yang dikenali.',true);return;}out=o;xv=v;lastFiles=names;update();status('Berhasil membaca '+names.length+' berkas. Periksa diagnostik untuk keterbatasan format.');}
function dl(name,s,mime){const url=URL.createObjectURL(new Blob([s],{type:mime})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('sx-files').addEventListener('change',e=>{files(e.target.files);e.target.value=''});$('sx-folder').addEventListener('change',e=>{files(e.target.files);e.target.value=''});
$('sx-demo').addEventListener('click',()=>{out=parseOut(DEMO_OUT);out.raw=DEMO_OUT;xv=parseXV(DEMO_XV);lastFiles=['DEMO_Cu2O.out','DEMO_Cu2O.XV'];update();status('DATA SINTETIS untuk uji antarmuka, bukan hasil SIESTA asli.')});
$('sx-clear').addEventListener('click',()=>{out=null;xv=null;hist=[];lastFiles=[];update();status('Data direset.')});
for(const id of ['sx-mode','sx-bg','sx-repeat','sx-cell','sx-bonds'])$(id).addEventListener('change',draw);$('sx-zoom').addEventListener('click',()=>{if(viewer){viewer.zoomTo();viewer.render()}});
$('sx-scf-csv').addEventListener('click',()=>dl('siesta_scf.csv','iteration,energy_eV,source\n'+hist.map(x=>`${x.iteration},${x.energy},scf`).join('\n'),'text/csv'));
$('sx-summary-csv').addEventListener('click',()=>dl('siesta_summary.csv','field,value\nSystemLabel,'+(out?.label||'')+'\nE_KS_eV,'+(out?.energy??'')+'\nSCF_status,'+(out?.scfStatus||'')+'\nAtoms,'+(xv?.count??'')+'\n','text/csv'));
$('sx-xyz').addEventListener('click',()=>{if(lastXYZ)dl('structure_XV_export.xyz',lastXYZ,'text/plain');else status('Muat file XV terlebih dahulu.',true)});
$('sx-png').addEventListener('click',()=>{if(!viewer)return status('Muat struktur 3D terlebih dahulu.',true);try{const a=document.createElement('a');a.download='siesta_structure.png';a.href=viewer.pngURI();a.click()}catch(e){status('Gagal mengekspor PNG: '+e.message,true)}});
const DEMO_XV=`8.068708 0.000000 0.000000\n0.000000 8.068708 0.000000\n0.000000 0.000000 8.068708\n6\n1 8 0.000000 0.000000 0.000000 0.0 0.0 0.0\n1 8 4.034354 4.034354 4.034354 0.0 0.0 0.0\n2 29 2.017177 2.017177 2.017177 0.0 0.0 0.0\n2 29 2.017177 6.051531 6.051531 0.0 0.0 0.0\n2 29 6.051531 2.017177 6.051531 0.0 0.0 0.0\n2 29 6.051531 6.051531 2.017177 0.0 0.0 0.0`;
const DEMO_OUT=`# SYNTHETIC DEMO - NOT SIESTA CALCULATION\nSystemLabel Cu2O_demo\nsiesta: E_KS(eV) = -1250.678900\nSCF cycle converged\n`;
update();
}
if(typeof document$ !== 'undefined' && document$.subscribe) document$.subscribe(mount);
else if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount);
else mount();
})();
