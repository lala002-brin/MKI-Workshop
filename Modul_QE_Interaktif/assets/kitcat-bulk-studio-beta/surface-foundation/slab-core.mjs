import {createStructure, fractionalToCartesian, volume} from '../src/structure-core.mjs';
export function makeSlab001(input,{layers=3,vacuum=15,center=true,maxAtoms=12000}={}){
  const s=createStructure(input);const A=s.lattice;
  const norm=v=>Math.hypot(...v);const dot=(u,v)=>u.reduce((r,x,i)=>r+x*v[i],0);
  if(Math.abs(dot(A[0],A[2]))>1e-8*norm(A[0])*norm(A[2]) || Math.abs(dot(A[1],A[2]))>1e-8*norm(A[1])*norm(A[2]))throw Error('Basis c harus tegak lurus bidang a-b. Untuk orientasi miring gunakan engine slab lanjutan.');
  if(!Number.isInteger(layers)||layers<1||layers>40)throw Error('Jumlah pengulangan harus integer 1–40');
  if(!Number.isFinite(vacuum)||vacuum<5||vacuum>100)throw Error('Vakum harus 5–100 Å');
  if(layers*s.atoms.length>maxAtoms)throw Error('Jumlah atom melebihi batas prototipe');
  const cLen=norm(A[2]),height=layers*cLen+vacuum,scale=height/cLen,shift=center?vacuum/(2*height):0;
  const atoms=[];
  for(let k=0;k<layers;k++)for(const a of s.atoms){
    const z=a.fractional[2]-Math.floor(a.fractional[2]);
    atoms.push({...a,id:`${a.id}#${k}`,fractional:[a.fractional[0],a.fractional[1],shift+(z+k)/scale]});
  }
  const out=createStructure({lattice:[A[0],A[1],A[2].map(x=>x*scale)],atoms,metadata:{...s.metadata,modelType:'slab-001',parentVolume:volume(A),repeatAlongC:layers,vacuumAngstrom:vacuum,construction:'Full-cell (001) repeat; no termination search',physicalPeriodicAxes:[true,true,false]}});
  out.periodicAxes=[true,true,false];
  const zvals=atoms.map(a=>a.fractional[2]*height);
  const actualSpan=Math.max(...zvals)-Math.min(...zvals);
  return {structure:out,diagnostics:{atoms:atoms.length,cellHeightAngstrom:height,coordinateSpanAngstrom:actualSpan,emptyCellIntervalAngstrom:height-actualSpan,requestedVacuumAngstrom:vacuum,warning:'Nominal vacuum adalah tambahan panjang c; jarak kosong terhadap citra periodik bergantung geometri terminasi. Ini bukan verifikasi konvergensi slab atau polaritas.'}};
}
export function geometryQE(s){return ['! KITCAT geometry only — NOT a complete pw.x input','CELL_PARAMETERS angstrom',...s.lattice.map(r=>r.map(x=>x.toFixed(9)).join(' ')),'ATOMIC_POSITIONS angstrom',...s.atoms.map(a=>`${a.speciesLabel||a.element} ${fractionalToCartesian(a.fractional,s.lattice).map(x=>x.toFixed(9)).join(' ')}`)].join('\n')+'\n'};


// v0.2: deliberately restricted to conventional cubic input and three orientations.
const ORIENTATIONS={
  '001':[[1,0,0],[0,1,0],[0,0,1]],
  '110':[[-1,1,0],[0,0,1],[1,1,0]],
  '111':[[1,-1,0],[1,1,-2],[1,1,1]]
};
const dot3=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
const norm3=a=>Math.hypot(...a);
const cross3=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const det3=m=>dot3(m[0],cross3(m[1],m[2]));
const wrap=x=>((x%1)+1)%1;
const wrapPoint=p=>p.map(x=>{const z=wrap(x);return Math.abs(z-1)<1e-8||z<1e-8?0:z});
const periodicEqual=(p,q,tol=1e-7)=>p.every((v,i)=>{const d=Math.abs(v-q[i]);return Math.min(d,1-d)<tol});
function cubicLength(s){const A=s.lattice;const lens=A.map(norm3);const avg=lens.reduce((a,b)=>a+b)/3;
 if(!lens.every(x=>Math.abs(x-avg)<1e-6*Math.max(1,avg))||Math.abs(dot3(A[0],A[1]))>1e-7*avg*avg||Math.abs(dot3(A[0],A[2]))>1e-7*avg*avg||Math.abs(dot3(A[1],A[2]))>1e-7*avg*avg)throw Error('v0.2 menerima hanya sel kubik konvensional dengan sudut 90°.');
 // Restrict to axes aligned with input cubic cell to avoid misleading Miller transformations.
 if(A.some((r,i)=>r.some((v,j)=>Math.abs(v-(i===j?avg:0))>1e-6*Math.max(1,avg))))throw Error('v0.2 mengharuskan vektor kisi kubik sejajar sumbu x,y,z positif.');
 return avg;
}
export function makeSlabCubic(input,{hkl='001',layers=3,vacuum=15,maxAtoms=12000}={}){
 const s=createStructure(input);const a=cubicLength(s),basis=ORIENTATIONS[hkl];
 if(!basis)throw Error('Orientasi belum didukung: pilih (001), (110), atau (111).');
 if(!Number.isInteger(layers)||layers<1||layers>20)throw Error('Jumlah pengulangan normal harus 1–20.');
 if(!Number.isFinite(vacuum)||vacuum<5||vacuum>100)throw Error('Vakum harus 5–100 Å.');
 const determinant=Math.abs(Math.round(det3(basis)));const num=determinant*s.atoms.length*layers;
 if(num>maxAtoms)throw Error('Atom melebihi batas aman prototipe');
 const u=basis[0],v=basis[1],w=basis[2],crossVW=cross3(v,w),crossWU=cross3(w,u),crossUV=cross3(u,v),det=det3(basis);
 const convert=r=>[dot3(r,crossVW)/det,dot3(r,crossWU)/det,dot3(r,crossUV)/det];
 const oriented=[];const lim=Math.max(4,...basis.flat().map(Math.abs))+2;
 // Enumerate atoms from neighboring integer cells and keep unique sites in the new oriented cell.
 for(const atom of s.atoms){const found=[];
  for(let i=-lim;i<=lim;i++)for(let j=-lim;j<=lim;j++)for(let k=-lim;k<=lim;k++){
   const q=convert([atom.fractional[0]+i,atom.fractional[1]+j,atom.fractional[2]+k]);
   if(q.some(x=>x<-1e-7||x>=1-1e-7))continue;
   const f=wrapPoint(q);
   if(!found.some(x=>periodicEqual(x,f)))found.push(f);
  }
  if(found.length!==determinant)throw Error(`Ekspansi orientasi gagal untuk ${atom.id}: ${found.length} != ${determinant}`);
  found.forEach((f,index)=>oriented.push({...atom,id:`${atom.id}@${hkl}-${index}`,fractional:f}));
 }
 const normalLen=a*norm3(w),cellLen=normalLen*layers+vacuum,scale=cellLen/normalLen,offset=vacuum/(2*cellLen);
 const atoms=[];
 for(let k=0;k<layers;k++)for(const atom of oriented){atoms.push({...atom,id:`${atom.id}#${k}`,fractional:[atom.fractional[0],atom.fractional[1],offset+(atom.fractional[2]+k)/scale]});}
 const lattice=[u.map(x=>x*a),v.map(x=>x*a),w.map(x=>x*a*scale)];
 const structure=createStructure({lattice,atoms,metadata:{...s.metadata,modelType:'slab-cubic-orientation-draft',orientation:hkl,cubicLatticeConstant:a,repeatNormal:layers,requestedVacuumAngstrom:vacuum,orientationDeterminant:determinant,termination:'NOT ANALYZED',physicalPeriodicAxes:[true,true,false]}});
 structure.periodicAxes=[true,true,false];
 const z=atoms.map(x=>x.fractional[2]*cellLen);const span=Math.max(...z)-Math.min(...z);
 return {structure,diagnostics:{hkl,atoms:atoms.length,orientedUnitCellAtoms:oriented.length,orientedCellVolumeFactor:determinant,normalCellVectorAngstrom:normalLen,cellHeightAngstrom:cellLen,coordinateSpanAngstrom:span,emptyCellIntervalAngstrom:cellLen-span,requestedVacuumAngstrom:vacuum,warning:'Model kandidat (hkl) berbasis sel kubik konvensional. Belum memilih/menguji terminasi, polaritas, dipol, ketebalan slab atau konvergensi DFT. Jumlah pengulangan sel BUKAN jumlah lapisan atom.'}};
}


// v0.3: Enumerate geometric cut positions. No formal charge or dipole assignment.
const circularDist=(a,b)=>{const d=Math.abs(a-b);return Math.min(d,1-d)};
const fraction=x=>((x%1)+1)%1;
function layerGroups(values,tol=1e-6){
 const unique=[];
 for(const z of [...values].sort((a,b)=>a-b))if(!unique.some(v=>circularDist(v,z)<tol))unique.push(z);
 return unique;
}
export function terminationCandidates(input,{hkl='001',layers=3,vacuum=15,maxCandidates=32}={}){
 const baseline=makeSlabCubic(input,{hkl,layers,vacuum});
 const {structure,diagnostics}=baseline;
 const repeatHeight=diagnostics.normalCellVectorAngstrom*layers;
 const cellHeight=diagnostics.cellHeightAngstrom;
 const offset=vacuum/2;
 // Remove nominal vacuum and recover periodic crystal coordinates.
 const phase=structure.atoms.map(a=>fraction((a.fractional[2]*cellHeight-offset)/repeatHeight));
 const groups=layerGroups(phase);
 const gaps=groups.map((v,i)=>{const next=i===groups.length-1?groups[0]+1:groups[i+1];return {cut:fraction((v+next)/2),width:(next-v)*repeatHeight}});
 if(gaps.length>maxCandidates)throw Error('Terlalu banyak lapisan unik untuk explorer awal. Pilih sel atau supercell lebih kecil.');
 return gaps.map((gap,i)=>{
  const atoms=structure.atoms.map((atom,j)=>({...atom,fractional:[...atom.fractional.slice(0,2),(offset+fraction(phase[j]-gap.cut)*repeatHeight)/cellHeight]}));
  const s=createStructure({lattice:structure.lattice,atoms,metadata:{...structure.metadata,terminationCutFraction:gap.cut,terminationCandidate:i+1,termination:'GEOMETRIC CUT ONLY',physicalPeriodicAxes:[true,true,false]}});
  s.periodicAxes=[true,true,false];
  const height=atoms.map(a=>a.fractional[2]*cellHeight);const low=Math.min(...height),high=Math.max(...height);
  const tolerance=Math.max(1e-4,repeatHeight*1e-6);
  const composition=arr=>Object.fromEntries([...new Set(arr.map(a=>a.element))].sort().map(el=>[el,arr.filter(a=>a.element===el).length]));
  const top=atoms.filter((a,j)=>Math.abs(height[j]-high)<tolerance),bottom=atoms.filter((a,j)=>Math.abs(height[j]-low)<tolerance);
  return {id:i+1,cutFraction:gap.cut,gapAngstrom:gap.width,structure:s,diagnostics:{...diagnostics,candidate:i+1,topLayer:composition(top),bottomLayer:composition(bottom),totalComposition:composition(atoms),topAtoms:top.length,bottomAtoms:bottom.length,coordinateSpanAngstrom:high-low,emptyCellIntervalAngstrom:cellHeight-(high-low),warning:'Terminasi adalah lapisan terluar geometris untuk pilihan bidang potong. Identifikasi polaritas, energi, rekonstruksi, dan stabilitas memerlukan pemeriksaan terpisah.'}};
 });
}
