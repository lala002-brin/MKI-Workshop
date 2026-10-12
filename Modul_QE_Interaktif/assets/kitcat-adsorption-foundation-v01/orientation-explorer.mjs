import {placeMolecule} from './molecules.mjs';
export const ORIENTATIONS=Object.freeze([
 {id:'upright',label:'Upright · 0°, 0°, 0°',rotation:[0,0,0]},
 {id:'tilt-x-45',label:'Tilt X · 45°',rotation:[45,0,0]},
 {id:'tilt-y-45',label:'Tilt Y · 45°',rotation:[0,45,0]},
 {id:'flat-x',label:'Flat X · 90°',rotation:[90,0,0]},
 {id:'flat-y',label:'Flat Y · 90°',rotation:[0,90,0]},
 {id:'azimuth-90',label:'Azimuth Z · 90°',rotation:[0,0,90]},
]);
export function exploreOrientations(s,settings){
 if(!s)throw Error('Muat slab lebih dahulu');
 const candidates=ORIENTATIONS.map((entry,index)=>{
  const result=placeMolecule(s,{...settings,rotation:entry.rotation});
  return {index,id:entry.id,label:entry.label,rotation:[...entry.rotation],result,
   minDistanceAngstrom:result.minDistanceAngstrom,
   possibleOverlap:result.minDistanceAngstrom<0.8};
 });
 // Geometric clearance metric only; not adsorption energy, binding preference, or a physical ranking.
 return candidates;
}
export function exportOrientationManifest(candidates,selectedIndex){
 if(!Array.isArray(candidates)||!candidates.length)throw Error('Belum ada kandidat orientasi');
 return {schema:'kitcat.orientation-explorer.v0.5',status:'GEOMETRY_DRAFT',
   selectedCandidateIndex:selectedIndex,
   candidates:candidates.map(c=>({id:c.id,label:c.label,rotationDegrees:c.rotation,
     minimumSlabDistanceAngstrom:c.minDistanceAngstrom,possibleOverlap:c.possibleOverlap,
     structure:c.result.structure})),
   caveats:['Candidate order is not an energy ranking.','Approximate isolated-molecule geometry; no optimization.','Limited XY periodic image range; not symmetry-equivalent site classification.']};
}
