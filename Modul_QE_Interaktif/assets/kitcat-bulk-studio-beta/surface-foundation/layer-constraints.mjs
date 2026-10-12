import {createStructure} from '../src/structure-core.mjs';
const norm = v => Math.hypot(...v);
export function identifyAtomicLayers(input,{toleranceAngstrom=0.15}={}) {
  const s=createStructure(input);
  if(!Number.isFinite(toleranceAngstrom)||toleranceAngstrom<=0||toleranceAngstrom>1)throw Error('Toleransi layer harus di atas 0 sampai 1 Å.');
  const A=s.lattice, len=norm(A[2]);
  const dot=(u,v)=>u.reduce((sum,x,i)=>sum+x*v[i],0);
  if(Math.abs(dot(A[0],A[2]))>1e-7*norm(A[0])*len||Math.abs(dot(A[1],A[2]))>1e-7*norm(A[1])*len)throw Error('Layer manager hanya mendukung vektor c tegak lurus a dan b.');
  const sorted=s.atoms.map((atom,index)=>({id:atom.id,index,height:atom.fractional[2]*len,element:atom.element})).sort((x,y)=>x.height-y.height);
  const layers=[];
  for(const entry of sorted){let last=layers.at(-1);
    if(!last||entry.height-last.maxHeight>toleranceAngstrom){last={index:layers.length+1,minHeight:entry.height,maxHeight:entry.height,atomIds:[],composition:{}};layers.push(last)}
    last.maxHeight=entry.height;last.atomIds.push(entry.id);last.composition[entry.element]=(last.composition[entry.element]||0)+1;
  }
  return layers.map(l=>({...l,heightAngstrom:(l.minHeight+l.maxHeight)/2,atomCount:l.atomIds.length}));
}
export function applyFrozenBottomLayers(input,{count=0,toleranceAngstrom=0.15}={}) {
  const s=createStructure(input);const layers=identifyAtomicLayers(s,{toleranceAngstrom});
  if(!Number.isInteger(count)||count<0||count>layers.length)throw Error(`Lapisan beku harus integer 0–${layers.length}.`);
  const frozen=new Set(layers.slice(0,count).flatMap(l=>l.atomIds));
  const atoms=s.atoms.map(a=>({...a,fixedAxes:frozen.has(a.id)?[true,true,true]:[false,false,false],selectiveDynamics:frozen.has(a.id)?[false,false,false]:[true,true,true]}));
  const out=createStructure({lattice:s.lattice,atoms,metadata:{...s.metadata,layerConstraintPolicy:'freeze-bottom-n-layers',frozenBottomLayers:count,layerToleranceAngstrom:toleranceAngstrom,scientificStatus:'GEOMETRY DRAFT; QE constraint flags only'}});
  out.periodicAxes=[true,true,false];
  return {structure:out,layers,frozenAtomCount:atoms.filter(a=>frozen.has(a.id)).length,freeAtomCount:atoms.filter(a=>!frozen.has(a.id)).length};
}
export function qeGeometryWithConstraints(input){
 const s=createStructure(input);
 const fracToCart=f=>[0,1,2].map(i=>f.reduce((sum,fi,k)=>sum+fi*s.lattice[k][i],0));
 const lines=['! KITCAT GEOMETRY ONLY — add validated CONTROL/SYSTEM/ELECTRONS/IONS and UPFs for pw.x','! if_pos: 0=fixed, 1=free; suitable for Cartesian components when fully frozen/free','CELL_PARAMETERS angstrom',...s.lattice.map(v=>v.map(x=>x.toFixed(10)).join(' ')),'ATOMIC_POSITIONS angstrom'];
 for(const a of s.atoms){const f=a.fixedAxes||[false,false,false];if(f.some(x=>x!==f[0]))throw Error('Partial-axis constraints not supported for safe conversion');const flags=f.map(x=>x?0:1);
  lines.push(`${a.speciesLabel||a.element} ${fracToCart(a.fractional).map(x=>x.toFixed(10)).join(' ')} ${flags.join(' ')}`);
 }
 return lines.join('\n')+'\n';
}
