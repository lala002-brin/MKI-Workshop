import { minimumSlabAdsDistance } from './positioning.mjs';
const cart=(f,L)=>[0,1,2].map(k=>f.reduce((s,x,i)=>s+x*L[i][k],0));
const det=L=>L[0][0]*(L[1][1]*L[2][2]-L[1][2]*L[2][1])-L[0][1]*(L[1][0]*L[2][2]-L[1][2]*L[2][0])+L[0][2]*(L[1][0]*L[2][1]-L[1][1]*L[2][0]);
function frac(p,L){let d=det(L);if(!Number.isFinite(d)||Math.abs(d)<1e-10)throw Error('Sel singular');return [0,1,2].map(i=>{let M=L.map(row=>row.slice());for(let j=0;j<3;j++)M[i][j]=p[j];return det(M)/d})}
export function adjustAdsorbateBond(structure,baseCount,{first=0,second=1,distanceAngstrom}={}){
 if(!structure?.atoms||!Array.isArray(structure.lattice)||!Number.isInteger(baseCount)||baseCount<1)throw Error('Struktur tidak valid');
 const n=structure.atoms.length-baseCount;
 if(n!==2)throw Error('Panjang ikatan versi ini hanya untuk satu molekul dua atom (misalnya CO atau O2)');
 if(!Number.isInteger(first)||!Number.isInteger(second)||first===second||first<0||second<0||first>=n||second>=n)throw Error('Indeks atom ikatan tidak valid');
 if(!Number.isFinite(distanceAngstrom)||distanceAngstrom<0.3||distanceAngstrom>5)throw Error('Panjang ikatan harus 0.3–5 Å');
 const L=structure.lattice;const p=cart(structure.atoms[baseCount+first].fractional,L);const q=cart(structure.atoms[baseCount+second].fractional,L);const v=q.map((x,k)=>x-p[k]);const r=Math.hypot(...v);if(r<1e-9)throw Error('Dua atom menempati posisi sama; arah ikatan tidak terdefinisi');
 const newQ=p.map((x,k)=>x+distanceAngstrom*v[k]/r);const atoms=structure.atoms.map((a,i)=>i===baseCount+second?{...a,fractional:frac(newQ,L)}:{...a});
 return {...structure,atoms,metadata:{...structure.metadata,atomicEditing:{status:'GEOMETRY_DRAFT',bondAnchor:first,movedAtom:second,previousAngstrom:r,newAngstrom:distanceAngstrom,warning:'Geometric change, not relaxed geometry'}}};
}
export function inspectAllPairDistances(structure,baseCount,{imageRange=1,maxAtoms=400}={}){
 if(!structure?.atoms||!Array.isArray(structure.lattice)||!Number.isInteger(baseCount)||baseCount<1||baseCount>=structure.atoms.length)throw Error('Struktur tidak valid');
 if(!Number.isInteger(imageRange)||imageRange<0||imageRange>4)throw Error('Rentang citra tidak valid');
 if(structure.atoms.length>maxAtoms)throw Error(`Pemeriksaan seluruh pasangan dibatasi ${maxAtoms} atom`);
 const L=structure.lattice,atoms=structure.atoms;let sa={distanceAngstrom:Infinity},aa={distanceAngstrom:Infinity},ss={distanceAngstrom:Infinity};
 for(let i=0;i<atoms.length;i++)for(let j=i+1;j<atoms.length;j++){
  const f=atoms[i].fractional,g=atoms[j].fractional;let best=Infinity,bestImage=[0,0];
  for(let a=-imageRange;a<=imageRange;a++)for(let b=-imageRange;b<=imageRange;b++){
   const v=cart([g[0]-f[0]+a,g[1]-f[1]+b,g[2]-f[2]],L);let d=Math.hypot(...v);if(d<best){best=d;bestImage=[a,b]}
  }
  const result={distanceAngstrom:best,atomIndices:[i,j],xyImage:bestImage};let target=i<baseCount?(j<baseCount?ss:sa):aa;if(best<target.distanceAngstrom)Object.assign(target,result);
 }
 return {slabAdsorbate:sa,adsorbateAdsorbate:aa,slabSlab:ss,range:imageRange,status:'GEOMETRY_DRAFT',warning:'Pair distances use finite XY images only; no bonding, chemical validity, energy or relaxations assessed.'};
}
