/* MKI Crystal Viewer VESTA-style v3: CIF, POSCAR/CONTCAR, XYZ */
(()=>{'use strict';
const root=document.getElementById('mki-crystal');if(!root||root.dataset.ready==='yes')return;root.dataset.ready='yes';
const $=id=>root.querySelector('#'+id), V=(x,y,z)=>({x,y,z}), add=(a,b)=>V(a.x+b.x,a.y+b.y,a.z+b.z),mul=(a,t)=>V(a.x*t,a.y*t,a.z*t),norm=a=>Math.hypot(a.x,a.y,a.z),distance=(a,b)=>norm(V(a.x-b.x,a.y-b.y,a.z-b.z));
const colors={Cu:'#3059bb',O:'#ed3038',Fe:'#dd9938',Co:'#9655ba',C:'#50545c',N:'#3a65e7',H:'#f4f6fa',Zn:'#75a8bc',S:'#e2c130',Si:'#d5a180',P:'#df9d2d',Al:'#9aaebc',Ti:'#8a99ab',Ni:'#58a96d'};
const radii={H:.31,C:.76,N:.71,O:.66,Cu:1.32,Fe:1.24,Co:1.18,Zn:1.22,Si:1.11,S:1.05,P:1.07,Al:1.21,Ti:1.36,Ni:1.24};
const color=el=>colors[el]||'#74879a',radius=el=>radii[el]||1.08;
const cif=`data_Cu2O_cuprite_ideal
_cell_length_a 4.2696
_cell_length_b 4.2696
_cell_length_c 4.2696
_cell_angle_alpha 90
_cell_angle_beta 90
_cell_angle_gamma 90
_space_group_name_H-M_alt 'P 1'
loop_
_atom_site_label
_atom_site_type_symbol
_atom_site_fract_x
_atom_site_fract_y
_atom_site_fract_z
O1 O 0 0 0
O2 O 0.5 0.5 0.5
Cu1 Cu 0.25 0.25 0.25
Cu2 Cu 0.25 0.75 0.75
Cu3 Cu 0.75 0.25 0.75
Cu4 Cu 0.75 0.75 0.25
`;
const water=`3\nH2O molecule - angstrom\nO 0 0 0\nH 0.758602 0 0.504284\nH -0.758602 0 0.504284\n`;
const poscar=`Cu2O ideal educational conventional cell\n1.0\n4.2696 0 0\n0 4.2696 0\n0 0 4.2696\nCu O\n4 2\nDirect\n0.25 0.25 0.25\n0.25 0.75 0.75\n0.75 0.25 0.75\n0.75 0.75 0.25\n0 0 0\n0.5 0.5 0.5\n`;
let viewer=null, model=null, base=null, shown=[], selections=[], measureShape=null, loadedName='';
const status=(s,error=false)=>{const e=$('cv-status');e.textContent=s;e.classList.toggle('cv-error',error)};
function normElem(s){let m=String(s||'').match(/[A-Za-z]{1,2}/);let t=m?m[0]:'X';return t[0].toUpperCase()+t.slice(1).toLowerCase()}
function numeric(s){let v=parseFloat(String(s).replace(/\([^)]*\)/g,''));if(!Number.isFinite(v))throw Error('Angka koordinat/kisi tidak valid: '+s);return v}
function cellFromLengths(a,b,c,alpha,beta,gamma){const r=Math.PI/180,ca=Math.cos(alpha*r),cb=Math.cos(beta*r),cg=Math.cos(gamma*r),sg=Math.sin(gamma*r);if(Math.abs(sg)<1e-8)throw Error('Sudut gamma tidak valid');const A=V(a,0,0),B=V(b*cg,b*sg,0),Cx=c*cb,Cy=c*(ca-cb*cg)/sg,Cz2=c*c-Cx*Cx-Cy*Cy;if(Cz2<=0)throw Error('Volume kisi tidak valid');return [A,B,V(Cx,Cy,Math.sqrt(Cz2))]}
const cart=(f,lat)=>add(add(mul(lat[0],f[0]),mul(lat[1],f[1])),mul(lat[2],f[2]));
function xyzParse(t){const lines=t.trim().split(/\r?\n/),n=Number(lines[0].trim());if(!Number.isInteger(n)||n<1||n>6000||lines.length<n+2)throw Error('XYZ memerlukan jumlah atom, judul, dan N baris koordinat');let atoms=[];for(let i=2;i<n+2;i++){const p=lines[i].trim().split(/\s+/);if(p.length<4)throw Error('Baris atom XYZ tidak valid: '+(i+1));atoms.push({...V(numeric(p[1]),numeric(p[2]),numeric(p[3])),elem:normElem(p[0])})}return {atoms,lat:null,name:'XYZ'} }
function poscarParse(t){let l=t.trim().split(/\r?\n/).map(x=>x.trim()).filter(x=>x),scale=numeric(l[1]);if(l.length<8||scale===0)throw Error('POSCAR/CONTCAR tidak lengkap');let raw=[2,3,4].map(i=>l[i].split(/\s+/).slice(0,3).map(numeric));let factor=scale;if(scale<0){let ax=V(...raw[0]),by=V(...raw[1]),cz=V(...raw[2]);let vol=Math.abs(ax.x*(by.y*cz.z-by.z*cz.y)-ax.y*(by.x*cz.z-by.z*cz.x)+ax.z*(by.x*cz.y-by.y*cz.x));factor=Math.cbrt(-scale/vol)}let lat=raw.map(v=>V(v[0]*factor,v[1]*factor,v[2]*factor));let j=5;const isCounts=s=>s.trim().split(/\s+/).every(v=>/^\d+$/.test(v));let species;if(isCounts(l[j]))throw Error('POSCAR VASP 4 tanpa simbol unsur tidak dapat diwarnai dengan benar. Gunakan POSCAR VASP 5 yang memuat baris unsur.');species=l[j++].split(/\s+/).map(normElem);let counts=l[j++].split(/\s+/).map(Number);if(species.length!==counts.length||!counts.every(n=>Number.isInteger(n)&&n>=0))throw Error('Baris jenis/jumlah atom POSCAR tidak cocok');if(/^s/i.test(l[j]))j++;const direct=/^[dD]/.test(l[j]),cartesian=/^[cCkK]/.test(l[j]);if(!direct&&!cartesian)throw Error('Mode posisi POSCAR harus Direct atau Cartesian');j++;const atomCount=counts.reduce((a,b)=>a+b,0);if(atomCount>6000||l.length<j+atomCount)throw Error('Atom POSCAR terlalu banyak atau koordinat tidak lengkap');let atoms=[];for(let k=0;k<species.length;k++)for(let m=0;m<counts[k];m++){let p=l[j++].split(/\s+/).slice(0,3).map(numeric);let v=direct?cart(p,lat):V(...p.map(x=>x*factor));atoms.push({...v,elem:species[k]})}return {atoms,lat,name:l[0]||'POSCAR'} }
function parseCif(t){let get=key=>{let m=t.match(new RegExp('^\\s*'+key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s+([^\\s#]+)','mi'));if(!m)throw Error('CIF tidak memuat '+key);return numeric(m[1])};const lat=cellFromLengths(get('_cell_length_a'),get('_cell_length_b'),get('_cell_length_c'),get('_cell_angle_alpha'),get('_cell_angle_beta'),get('_cell_angle_gamma'));
// Delegasikan perluasan symmetry-equivalent ke parser CIF 3Dmol.
const temp=viewer.addModel(t,'cif');let atoms=temp.selectedAtoms({}).map(a=>({x:a.x,y:a.y,z:a.z,elem:normElem(a.elem)}));viewer.removeModel(temp);
if(!atoms.length)throw Error('Parser CIF tidak menemukan atom. Periksa atom_site dan space group');return {atoms,lat,name:'CIF'} }
function inferFormat(name){const n=name.toLowerCase();if(n.endsWith('.cif'))return 'cif';if(n.endsWith('.xyz'))return 'xyz';if(n.endsWith('.vasp')||n.endsWith('.poscar')||n.endsWith('.contcar')||/(^|\.)poscar$|(^|\.)contcar$/.test(n))return 'vasp';throw Error('Format belum didukung. Gunakan .cif, .xyz, .vasp, POSCAR, atau CONTCAR')}
function latticeLine(a,b,col,thick){viewer.addLine({start:a,end:b,color:col,linewidth:thick||2.1})}
function unitCell(lat,dims){const O=V(0,0,0),a=mul(lat[0],dims[0]),b=mul(lat[1],dims[1]),c=mul(lat[2],dims[2]);let pts=[O,a,b,add(a,b),c,add(a,c),add(b,c),add(add(a,b),c)];let edges=[[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]];for(const [i,j] of edges)latticeLine(pts[i],pts[j],bg()==='#0f182c'?'#e8efff':'#334155',3.0)}
function bg(){return {white:'#fff',dark:'#0f182c',blue:'#e8f3ff'}[$('cv-bg').value]||'#fff'}
function imageStyle(){let s=Number($('cv-scale').value)/100,mode=$('cv-style').value;return {mode,s}}
function redraw(){if(!viewer||!base)return;let sx=Number($('cv-nx').value),sy=Number($('cv-ny').value),sz=Number($('cv-nz').value);let periodic=!!base.lat;if(!periodic){sx=sy=sz=1;for(let id of ['cv-nx','cv-ny','cv-nz'])$(id).disabled=true;$('cv-cell').disabled=true}else{for(let id of ['cv-nx','cv-ny','cv-nz','cv-cell'])$(id).disabled=false}let total=base.atoms.length*sx*sy*sz;if(total>900){status('Maksimum 900 atom ditampilkan agar browser tidak berat. Kurangi supercell.',true);return}
viewer.removeAllModels();viewer.removeAllShapes();viewer.removeAllLabels();selections=[];measureShape=null;shown=[];const lat=base.lat;
for(let i=0;i<sx;i++)for(let j=0;j<sy;j++)for(let k=0;k<sz;k++){let offset=periodic?cart([i,j,k],lat):V(0,0,0);for(const a of base.atoms)shown.push({...add(a,offset),elem:a.elem})}
// Use an XYZ model for picking, but explicitly disable automatic bond graph.
let xyz=shown.length+'\nMKI transformed view\n'+shown.map(a=>`${a.elem} ${a.x.toFixed(8)} ${a.y.toFixed(8)} ${a.z.toFixed(8)}`).join('\n')+'\n';model=viewer.addModel(xyz,'xyz');let atoms=model.selectedAtoms({});for(const a of atoms){a.bonds=[];a.bondOrder=[]}
viewer.setBackgroundColor(bg());let {mode,s}=imageStyle();$('cv-scale-val').textContent=Math.round(s*100)+'%';const style=el=>{let col=color(el);if(mode==='sphere')return {sphere:{color:col,scale:s*.94}};if(mode==='stick')return {sphere:{color:col,scale:Math.max(.17,s*.23)}};if(mode==='line')return {sphere:{color:col,scale:Math.max(.11,s*.19)}};return {sphere:{color:col,scale:s*.48}}};model.setStyle({}, {sphere:{color:'#8090a0',scale:s*.48}});for(const e of new Set(shown.map(a=>a.elem)))model.setStyle({elem:e},style(e));
if(mode!=='sphere'&&$('cv-bonds').checked){const min=0.42,max=1.20;for(let i=0;i<shown.length;i++)for(let j=i+1;j<shown.length;j++){let a=shown[i],b=shown[j],r=distance(a,b),cut=(radius(a.elem)+radius(b.elem))*Number($('cv-bond-factor').value)/100;if(r<min||r>Math.min(3.3,cut))continue;let mid=mul(add(a,b),.5),w=mode==='line'?.018:mode==='stick'?.10:.075;viewer.addCylinder({start:a,end:mid,radius:w,color:color(a.elem),fromCap:1,toCap:1});viewer.addCylinder({start:mid,end:b,radius:w,color:color(b.elem),fromCap:1,toCap:1})}}
if(periodic&&$('cv-cell').checked)unitCell(lat,[sx,sy,sz]);
if($('cv-label').checked){if(shown.length<=160)for(const a of shown)viewer.addLabel(a.elem,{position:a,fontSize:12,fontColor:bg()==='#0f182c'?'white':'#192536',backgroundColor:bg(),backgroundOpacity:.7});else status('Label unsur dibatasi pada ≤160 atom agar tidak bertumpuk.')}
model.setClickable({},true,(atom)=>{let q={x:atom.x,y:atom.y,z:atom.z,elem:atom.elem};if(selections.length===2){selections=[];if(measureShape)viewer.removeShape(measureShape);measureShape=null}selections.push(q);if(selections.length===1){$('cv-distance').textContent='Atom pertama '+q.elem+' dipilih. Klik atom kedua.'}else{let a=selections[0],b=selections[1],d=distance(a,b);measureShape=viewer.addLine({start:a,end:b,color:'#ffae39',dashed:true,radius:.07});$('cv-distance').textContent=`${a.elem}–${b.elem} = ${d.toFixed(3)} Å (jarak pada gambar, belum minimum-image)`;viewer.render()}});
viewer.zoomTo();viewer.render();let counts={};shown.forEach(a=>counts[a.elem]=(counts[a.elem]||0)+1);$('cv-name').textContent=loadedName||base.name;$('cv-summary').textContent=`${shown.length} atom · ${Object.entries(counts).map(([e,n])=>e+': '+n).join(' · ')}`;$('cv-elements').textContent=periodic?`Sel periodik · ${sx}×${sy}×${sz} · ${base.atoms.length} atom per sel input · ${shown.length} atom ditampilkan`:'XYZ molekul · tidak memiliki parameter kisi';$('cv-distance').textContent='Klik dua atom untuk mengukur jarak.';status('Struktur siap. Kotak hitam/putih menunjukkan batas supercell bila informasi kisi tersedia. Ikatan adalah perkiraan jarak, bukan hasil analisis kimia.')}
function load(text,format,name){if(!viewer)return;let p=format==='cif'?parseCif(text):format==='vasp'?poscarParse(text):xyzParse(text);base=p;loadedName=name;for(let id of ['cv-nx','cv-ny','cv-nz'])$(id).value='1';redraw()}
function download(name,body,type){let u=URL.createObjectURL(new Blob([body],{type})),a=document.createElement('a');a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500)}
function exportXYZ(){if(!shown.length)return;download('MKI_crystal_view.xyz',shown.length+'\nCartesian coordinates, Å; unit cell not included\n'+shown.map(a=>`${a.elem} ${a.x.toFixed(7)} ${a.y.toFixed(7)} ${a.z.toFixed(7)}`).join('\n')+'\n','text/plain;charset=utf-8')}
function attach(){let cssIds=['cv-style','cv-bg','cv-scale','cv-label','cv-nx','cv-ny','cv-nz','cv-cell','cv-bonds','cv-bond-factor'];for(let id of cssIds)$(id).addEventListener(id==='cv-scale'||id==='cv-bond-factor'?'input':'change',redraw);$('cv-cu').onclick=()=>{try{load(cif,'cif','Cu₂O · cuprite ideal')}catch(e){status(e.message,true)}};$('cv-water').onclick=()=>{try{load(water,'xyz','H₂O molekul')}catch(e){status(e.message,true)}};$('cv-poscar').onclick=()=>{try{load(poscar,'vasp','Cu₂O · VASP POSCAR ideal')}catch(e){status(e.message,true)}};
$('cv-upload').addEventListener('change',async e=>{let file=e.target.files?.[0];if(!file)return;try{if(file.size>10*1024*1024)throw Error('Maksimum file 10 MB');load(await file.text(),inferFormat(file.name),file.name)}catch(err){status(err.message,true)}e.target.value=''});$('cv-reset').onclick=()=>{viewer?.zoomTo();viewer?.render()};$('cv-spin').onclick=()=>viewer?.spin('y',1);$('cv-stop').onclick=()=>viewer?.spin(false);$('cv-download-xyz').onclick=exportXYZ;$('cv-png').onclick=()=>{try{let a=document.createElement('a');a.href=viewer.pngURI();a.download='MKI-crystal.png';document.body.append(a);a.click();a.remove()}catch(e){status('PNG gagal: '+e.message,true)}}}
function load3Dmol(){return new Promise((resolve,reject)=>{if(window.$3Dmol)return resolve();let old=document.querySelector('script[data-cv-3dmol]');if(old){let n=0;let t=setInterval(()=>{if(window.$3Dmol){clearInterval(t);resolve()}else if(++n>120){clearInterval(t);reject(Error('Timeout pemuatan 3Dmol.js'))}},100);return}let s=document.createElement('script');s.dataset.cv3dmol='true';s.src='https://3Dmol.org/build/3Dmol-min.js';s.onload=()=>window.$3Dmol?resolve():reject(Error('3Dmol.js tidak tersedia'));s.onerror=()=>reject(Error('Gagal memuat 3Dmol.js; periksa internet'));document.head.appendChild(s)})}
async function init(){try{await load3Dmol();viewer=window.$3Dmol.createViewer($('cv-canvas'),{backgroundColor:'#fff',antialias:true});$('cv-loading').classList.add('cv-hidden');attach();load(cif,'cif','Cu₂O · cuprite ideal');if(window.ResizeObserver)new ResizeObserver(()=>viewer.resize()).observe($('cv-canvas'));}catch(e){$('cv-loading').textContent='Viewer gagal: '+e.message;status(e.message,true)}}init();
})();
