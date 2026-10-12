// KITCAT geometry contact screening — GEOMETRY_DRAFT, not bond inference.
const cart=(f,L)=>[0,1,2].map(k=>f.reduce((s,x,i)=>s+x*L[i][k],0));
const finite3=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
export function inspectContacts(structure,baseCount,{imageRange=1,thresholdAngstrom=0.8,maxAtoms=400,maxReported=40}={}){
 if(!structure||!Array.isArray(structure.atoms)||!Array.isArray(structure.lattice)||structure.lattice.length!==3||!structure.lattice.every(finite3))throw Error('Struktur atau kisi tidak valid');
 const n=structure.atoms.length;
 if(!Number.isInteger(baseCount)||baseCount<1||baseCount>=n)throw Error('Batas slab/adsorbat tidak valid');
 if(!Number.isInteger(imageRange)||imageRange<0||imageRange>4)throw Error('Rentang citra harus 0–4');
 if(!Number.isFinite(thresholdAngstrom)||thresholdAngstrom<=0||thresholdAngstrom>5)throw Error('Ambang jarak harus >0 dan ≤5 Å');
 if(n>maxAtoms)throw Error(`Audit dibatasi ${maxAtoms} atom; model ini tidak diaudit`);
 if(!structure.atoms.every(a=>finite3(a.fractional)))throw Error('Koordinat atom tidak valid');
 const L=structure.lattice,rows=[],groups={slabAdsorbate:{count:0,min:null},adsorbateAdsorbate:{count:0,min:null},slabSlab:{count:0,min:null}};
 const positions=structure.atoms.map(a=>cart(a.fractional,L));
 let totalContacts=0;
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
  let min=Infinity,shift=[0,0];
  for(let u=-imageRange;u<=imageRange;u++)for(let v=-imageRange;v<=imageRange;v++){
   const delta=[0,1,2].map(k=>positions[j][k]-positions[i][k]+u*L[0][k]+v*L[1][k]);
   const d=Math.hypot(...delta);if(d<min){min=d;shift=[u,v]}
  }
  const type=i<baseCount?(j<baseCount?'slabSlab':'slabAdsorbate'):'adsorbateAdsorbate';
  const g=groups[type];if(g.min===null||min<g.min.distanceAngstrom)g.min={distanceAngstrom:min,pair:[i,j],imageXY:shift};
  if(min<thresholdAngstrom){g.count++;totalContacts++;rows.push({type,pair:[i,j],elements:[structure.atoms[i].element,structure.atoms[j].element],distanceAngstrom:min,imageXY:shift})}
 }
 rows.sort((a,b)=>a.distanceAngstrom-b.distanceAngstrom);
 return {status:'GEOMETRY_DRAFT',screening:totalContacts?'REVIEW_REQUIRED':'NO_CONTACTS_BELOW_THRESHOLD',atomCount:n,slabCount:baseCount,adsorbateCount:n-baseCount,thresholdAngstrom,imageRange,totalContacts,groups,contacts:rows.slice(0,maxReported),truncated:Math.max(0,rows.length-maxReported),caveats:['Threshold is an absolute user screening distance, not element-specific bonding or a physical minimum.','Finite XY images only (±n); Z images are not considered.','Zero close contacts does not establish a valid or stable geometry.','No DFT, ASE runtime, energetics or convergence checked.']};
}
