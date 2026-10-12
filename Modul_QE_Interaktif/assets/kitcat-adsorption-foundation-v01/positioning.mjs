// Geometric draft rigid-body manipulations. Cartesian coordinates in Angstrom.
const xyz=(f,L)=>[0,1,2].map(k=>f.reduce((s,v,i)=>s+v*L[i][k],0));
const det=L=>L[0][0]*(L[1][1]*L[2][2]-L[1][2]*L[2][1])-L[0][1]*(L[1][0]*L[2][2]-L[1][2]*L[2][0])+L[0][2]*(L[1][0]*L[2][1]-L[1][1]*L[2][0]);
function frac(p,L){const d=det(L);if(!Number.isFinite(d)||Math.abs(d)<1e-10)throw Error('Sel singular');return [0,1,2].map(i=>{const M=L.map(r=>r.slice());for(let j=0;j<3;j++)M[i][j]=p[j];return det(M)/d})}
function rotateVector(p,angles){let [x,y,z]=p;const [a,b,c]=angles.map(v=>v*Math.PI/180);let t=y*Math.cos(a)-z*Math.sin(a);z=y*Math.sin(a)+z*Math.cos(a);y=t;t=x*Math.cos(b)+z*Math.sin(b);z=-x*Math.sin(b)+z*Math.cos(b);x=t;t=x*Math.cos(c)-y*Math.sin(c);y=x*Math.sin(c)+y*Math.cos(c);x=t;return [x,y,z]}
export function transformAdsorbate(structure,baseCount,{translate=[0,0,0],rotate=[0,0,0],rotateZ,anchor='centroid'}={}){
 if(!structure?.atoms||!Array.isArray(structure.lattice)||structure.lattice.length!==3)throw Error('Struktur tidak valid');
 if(!Number.isInteger(baseCount)||baseCount<1||baseCount>=structure.atoms.length)throw Error('Adsorbat belum aktif');
 if(rotateZ!==undefined)rotate=[rotate[0]||0,rotate[1]||0,rotateZ];
 if(translate.length!==3||rotate.length!==3||![...translate,...rotate].every(Number.isFinite))throw Error('Transformasi harus angka finite');
 if(translate.some(v=>Math.abs(v)>20)||rotate.some(v=>Math.abs(v)>360))throw Error('Transformasi di luar batas per langkah');
 const ads=structure.atoms.slice(baseCount);const ps=ads.map(a=>xyz(a.fractional,structure.lattice));
 const center=anchor==='centroid'?[0,1,2].map(k=>ps.reduce((sum,p)=>sum+p[k],0)/ps.length):ps[Number(anchor)];
 if(!center||!center.every(Number.isFinite)||!(anchor==='centroid'||Number.isInteger(Number(anchor))&&Number(anchor)>=0&&Number(anchor)<ads.length))throw Error('Atom jangkar tidak valid');
 const atoms=structure.atoms.map((a,i)=>{if(i<baseCount)return {...a};const p=ps[i-baseCount];const shifted=rotateVector(p.map((v,k)=>v-center[k]),rotate).map((v,k)=>v+center[k]+translate[k]);return {...a,fractional:frac(shifted,structure.lattice)}});
 return {...structure,atoms,metadata:{...structure.metadata,interactivePositioning:{status:'GEOMETRY_DRAFT',lastTranslateAngstrom:translate,lastRotateDegreesXYZ:rotate,anchor,warning:'Manual geometric transform; no relaxation or energetic validation'}}};
}
export function minimumSlabAdsDistance(structure,baseCount,{imageRange=1}={}){
 if(!structure?.atoms||!Array.isArray(structure.lattice)||!Number.isInteger(baseCount)||baseCount<1||baseCount>=structure.atoms.length)throw Error('Struktur tidak valid');
 if(!Number.isInteger(imageRange)||imageRange<0||imageRange>4)throw Error('imageRange tidak valid');
 const L=structure.lattice;let best=Infinity;let pair=null;
 for(let i=0;i<baseCount;i++)for(let j=baseCount;j<structure.atoms.length;j++){
  const f=structure.atoms[i].fractional,g=structure.atoms[j].fractional;
  for(let a=-imageRange;a<=imageRange;a++)for(let b=-imageRange;b<=imageRange;b++){
   const d=xyz([g[0]-f[0]+a,g[1]-f[1]+b,g[2]-f[2]],L);
   const r=Math.hypot(...d);if(r<best){best=r;pair={slabIndex:i,adsorbateIndex:j,cellImage:[a,b]}}
  }
 }
 return {distanceAngstrom:best,pair,imageRange,warning:'Geometric slab-adsorbate minimum over finite XY images; no bond/energy assessment'};
}
