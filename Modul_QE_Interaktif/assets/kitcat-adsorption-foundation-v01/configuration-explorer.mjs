import {checkSlab,topAtoms} from './adsorption-core.mjs';
import {placeMolecule} from './molecules.mjs';
import {placePeriodicAdsorbate} from './periodic-sites.mjs';
// Fingerprint compares wrapped adsorbate fractional coordinates by species.
// This detects exact duplicates up to XY translation by integer cell vectors, NOT crystallographic symmetry.
export function configurationFingerprint(structure,slabCount,precision=5){
 const quant=n=>Math.round(n*10**precision)/10**precision;
 const wrap=n=>{let w=((n%1)+1)%1;return w>1-10**(-precision)/2?0:w};
 return structure.atoms.slice(slabCount).map(a=>[a.element,quant(wrap(a.fractional[0])),quant(wrap(a.fractional[1])),quant(a.fractional[2])]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))).map(v=>JSON.stringify(v)).join('|');
}
export function exploreConfigurations(s,{kind='molecule',molecule='CO',element='H',sites=['top','bridge','hollow'],anchors=2,orientations=[[0,0,0],[90,0,0],[0,90,0]],height=2.5,topTolerance=1.5,range=2,threshold=0.8}={}){
 checkSlab(s);if(!['atom','molecule'].includes(kind))throw Error('Jenis adsorbat tidak valid');
 if(!Array.isArray(sites)||!sites.length||sites.some(x=>!['top','bridge','hollow'].includes(x)))throw Error('Situs tidak valid');
 if(!Number.isInteger(anchors)||anchors<1||anchors>4)throw Error('Jumlah atom acuan harus 1–4');
 if(!Array.isArray(orientations)||!orientations.length||orientations.length>6||orientations.some(r=>!Array.isArray(r)||r.length!==3||r.some(v=>!Number.isFinite(v))))throw Error('Orientasi tidak valid');
 if(!Number.isFinite(threshold)||threshold<0.4||threshold>5)throw Error('Ambang harus 0.4–5 Å');
 const top=topAtoms(s,topTolerance); const count=Math.min(anchors,top.length); const rows=[];const groups=new Map();
 for(let anchor=0;anchor<count;anchor++)for(const site of sites)for(const rotation of (kind==='molecule'?orientations:[[0,0,0]])){
  const opts={molecule,element,site,anchor,rotation,height,topTolerance,range};
  try{
   const result=kind==='molecule'?placeMolecule(s,opts):placePeriodicAdsorbate(s,opts);
   const fingerprint=configurationFingerprint(result.structure,s.atoms.length);
   let group=groups.get(fingerprint);if(!group){group=groups.size+1;groups.set(fingerprint,group)}
   const row={index:rows.length,group,representative:rows.every(r=>r.group!==group),site,anchor,rotation:[...rotation],minimumDistanceAngstrom:result.minDistanceAngstrom,possibleOverlap:result.minDistanceAngstrom<threshold,result};rows.push(row);
  }catch(err){ // A site can be unavailable for a particular geometry. Retain it in diagnostics.
   rows.push({index:rows.length,group:null,representative:false,site,anchor,rotation:[...rotation],error:String(err.message||err),result:null});
  }
 }
 return {status:'GEOMETRY_DRAFT',candidates:rows,groupCount:groups.size,validCount:rows.filter(r=>r.result).length,failedCount:rows.filter(r=>!r.result).length};
}
export function exportConfigurationManifest(exploration,selectedIndex=null){
 if(!exploration||!Array.isArray(exploration.candidates))throw Error('Eksplorasi belum tersedia');
 return {schema:'kitcat.adsorption.configuration-explorer.v0.7',status:'GEOMETRY_DRAFT',selectedIndex,groupCount:exploration.groupCount,
 candidates:exploration.candidates.map(c=>({index:c.index,group:c.group,representative:c.representative,site:c.site,anchor:c.anchor,rotationDegrees:c.rotation,minimumDistanceAngstrom:c.minimumDistanceAngstrom??null,possibleOverlap:c.possibleOverlap??null,error:c.error??null,structure:c.result?.structure??null})),
 caveats:['Fingerprint is coordinate-based and not crystallographic symmetry equivalence','Candidate order is not energy ranking','Periodic XY screening is finite range','Structures require review and DFT relaxation on HPC']};
}
