// Static geometry-only audit. Never infers formal charge, dipole, or stability.
const comp=atoms=>{const v={};for(const a of atoms)v[a.element]=(v[a.element]||0)+1;return v};
const ratio=(a,b)=>{const keys=[...new Set([...Object.keys(a),...Object.keys(b)])];const v=keys.map(k=>b[k]?a[k]/b[k]:NaN);return v.length>0&&v.every(x=>Number.isFinite(x)&&Math.abs(x-v[0])<1e-8)};
const same=(a,b)=>{const keys=[...new Set([...Object.keys(a),...Object.keys(b)])];return keys.every(k=>(a[k]||0)===(b[k]||0))};
export function compareTerminations(candidates,bulk){
 if(!Array.isArray(candidates)||!candidates.length)throw Error('Tidak ada kandidat');
 const base=comp(bulk.atoms);const referenceCount=candidates[0].structure.atoms.length;
 const rows=candidates.map((c,index)=>{
  const atoms=c.structure.atoms,top=c.diagnostics.topLayer,bottom=c.diagnostics.bottomLayer,total=comp(atoms),issues=[];
  const empty=c.diagnostics.emptyCellIntervalAngstrom;
  if(!Number.isFinite(empty)||empty<0)issues.push('INVALID_EMPTY_INTERVAL');
  if(atoms.length!==referenceCount)issues.push('ATOM_COUNT_DIFFERS');
  if(!ratio(total,base))issues.push('BULK_STOICHIOMETRY_DIFFERS');
  if(!same(total,comp(candidates[0].structure.atoms)))issues.push('CANDIDATE_COMPOSITION_DIFFERS');
  const ids=new Set(atoms.map(a=>a.id));if(ids.size!==atoms.length)issues.push('DUPLICATE_ATOM_ID');
  if(atoms.some(a=>a.fractional.some(x=>!Number.isFinite(x))))issues.push('NONFINITE_COORDINATE');
  return {index,id:c.id,cutPercent:c.cutFraction*100,atomCount:atoms.length,total,top,bottom,sameSurfaceComposition:same(top,bottom),emptyAngstrom:empty,issues};
 });
 return {schema:'kitcat.termination-audit.v0.9',status:rows.some(r=>r.issues.length)?'REVIEW_REQUIRED':'STATIC_CHECKS_PASS',modelStatus:'GEOMETRY_DRAFT',summary:{candidates:rows.length,staticIssues:rows.reduce((n,r)=>n+r.issues.length,0),candidatesWithDifferentTopBottomComposition:rows.filter(r=>!r.sameSurfaceComposition).length},notVerified:['Surface polarity and dipole','Surface reconstruction and thermodynamic stability','Vacuum and slab-thickness convergence','Quantum ESPRESSO runtime and total energy'],candidates:rows};
}
