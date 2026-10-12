import {checkSlab,topAtoms,cart} from './adsorption-core.mjs';
import {placeMolecule} from './molecules.mjs';
import {placePeriodicAdsorbate} from './periodic-sites.mjs';
const add=(p,a,b,u,v)=>p.map((x,i)=>x+u*a[i]+v*b[i]);
const dist=(p,q)=>Math.hypot(...p.map((v,i)=>v-q[i]));
// Independent geometric guesses relative to ORIGINAL slab, never reinterpret earlier adsorbates as the surface.
export function buildMultiAdsorbate(s,{count=2,kind='molecule',molecule='CO',element='H',site='top',height=2.5,anchor=0,topTolerance=1.5,range=2,rotation=[0,0,0],minSeparation=0.8}={}){
 checkSlab(s);if(!Number.isInteger(count)||count<1||count>12)throw Error('Jumlah adsorbat harus 1–12');
 if(!Number.isFinite(minSeparation)||minSeparation<0.4||minSeparation>5)throw Error('Ambang jarak harus 0.4–5 Å');
 const top=topAtoms(s,topTolerance);if(!top.length)throw Error('Permukaan kosong');
 if(!Number.isInteger(anchor)||anchor<0||anchor>=top.length)throw Error('Atom acuan tidak valid');
 if(count>top.length)throw Error('Jumlah adsorbat melebihi jumlah atom acuan permukaan; kurangi jumlah atau sesuaikan toleransi');
 const positions=[],atoms=s.atoms.map(a=>({...a})),items=[];const [a,b]=s.lattice;let minimumAdsDistance=Infinity;
 for(let k=0;k<count;k++){
  const localAnchor=(anchor+k)%top.length;
  const options={site,height,anchor:localAnchor,topTolerance,range,rotation,molecule,element};
  const result=kind==='molecule'?placeMolecule(s,options):kind==='atom'?placePeriodicAdsorbate(s,options):null;
  if(!result)throw Error('Jenis adsorbat tidak didukung');
  const group=result.structure.atoms.slice(s.atoms.length).map((atom,j)=>({...atom,id:`Ads${k+1}-${atom.element}-${j+1}`}));
  for(const atom of group){const p=cart(atom.fractional,s.lattice);for(const previous of positions){for(let u=-range;u<=range;u++)for(let v=-range;v<=range;v++)minimumAdsDistance=Math.min(minimumAdsDistance,dist(p,add(previous,a,b,u,v)))}positions.push(p)}
  atoms.push(...group);items.push({index:k+1,anchorIndex:localAnchor,anchorAtomId:top[localAnchor].a.id??top[localAnchor].i,adsorbateAtomCount:group.length,site,positionAngstrom:result.positionAngstrom,minSlabDistanceAngstrom:result.minDistanceAngstrom});
 }
 const finiteDistance=Number.isFinite(minimumAdsDistance)?minimumAdsDistance:null;
 const overlap=finiteDistance!==null&&finiteDistance<minSeparation;
 const nominalCoverage=count/top.length;
 const metadata={...(s.metadata??{}),adsorptionDraft:{kind:'multi',adsorbateKind:kind,molecule:kind==='molecule'?molecule:null,element:kind==='atom'?element:null,count,site,heightAngstrom:height,rotationDegrees:kind==='molecule'?[...rotation]:null,nominalCoverageRatio:nominalCoverage,coverageBasis:'adsorbate groups / top-layer atom references (not physical monolayer coverage)',minAdsorbateDistanceAngstrom:finiteDistance,overlapWarning:overlap,items,method:'sequential_original_slab_periodic_xy_geometric_guesses',warning:'Initial geometries only; no site uniqueness, symmetry classification, chemistry or energy ranking.'}};
 return {structure:{...s,atoms,metadata},items,minAdsorbateDistanceAngstrom:finiteDistance,nominalCoverageRatio:nominalCoverage,warning:overlap?'REVIEW: adsorbate–adsorbate periodic distance below selected threshold':'Geometry draft only; inspect collisions and vacuum'};
}
