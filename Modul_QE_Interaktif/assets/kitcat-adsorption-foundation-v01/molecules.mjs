import {periodicSite} from './periodic-sites.mjs';
import {cart,frac,checkSlab} from './adsorption-core.mjs';
// Approximate free-molecule geometries (Å); centered at their first anchoring atom.
export const MOLECULES=Object.freeze({
 CO:{atoms:[['C',[0,0,0]],['O',[0,0,1.128]]],anchor:'C'},
 O2:{atoms:[['O',[0,0,0]],['O',[0,0,1.208]]],anchor:'O'},
 H2O:{atoms:[['O',[0,0,0]],['H',[0.7586,0,0.5043]],['H',[-0.7586,0,0.5043]]],anchor:'O'},
 NH3:{atoms:[['N',[0,0,0]],['H',[0.9377,0,-0.3816]],['H',[-0.4689,0.8122,-0.3816]],['H',[-0.4689,-0.8122,-0.3816]]],anchor:'N'}
});
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const shift=(p,a,b,u,v)=>add(add(p,a.map(x=>x*u)),b.map(x=>x*v));
export function rotateXYZ(p,angles){
 const [x,y,z]=angles.map(a=>a*Math.PI/180);let [X,Y,Z]=p;
 [Y,Z]=[Y*Math.cos(x)-Z*Math.sin(x),Y*Math.sin(x)+Z*Math.cos(x)];
 [X,Z]=[X*Math.cos(y)+Z*Math.sin(y),-X*Math.sin(y)+Z*Math.cos(y)];
 [X,Y]=[X*Math.cos(z)-Y*Math.sin(z),X*Math.sin(z)+Y*Math.cos(z)];return [X,Y,Z];
}
export function placeMolecule(s,{molecule='CO',site='top',height=2.5,anchor=0,topTolerance=1.5,range=2,rotation=[0,0,0]}={}){
 checkSlab(s);if(!Object.hasOwn(MOLECULES,molecule))throw Error('Molekul belum didukung');
 if(!Number.isFinite(height)||height<0.5||height>8)throw Error('Tinggi adsorbat harus 0.5–8 Å');
 if(!Array.isArray(rotation)||rotation.length!==3||rotation.some(v=>!Number.isFinite(v)||Math.abs(v)>360))throw Error('Rotasi X/Y/Z harus -360 hingga 360 derajat');
 const info=periodicSite(s,{site,anchor,topTolerance,range});
 const z=Math.max(...info.top.map(t=>t.p[2]))+height;const origin=[...info.xy,z];
 const newAtoms=MOLECULES[molecule].atoms.map(([element,offset],i)=>({element,id:`Ads-${molecule}-${i+1}`,position:add(origin,rotateXYZ(offset,rotation))}));
 const ids=new Set(s.atoms.map(x=>String(x.id)));
 for(const atom of newAtoms){let base=atom.id,n=1;while(ids.has(atom.id))atom.id=base+'-'+(++n);ids.add(atom.id)}
 let minDistance=Infinity;const [a,b]=s.lattice;
 for(const atom of newAtoms){for(const base of s.atoms){const q=cart(base.fractional,s.lattice);for(let u=-range;u<=range;u++)for(let v=-range;v<=range;v++)minDistance=Math.min(minDistance,Math.hypot(...atom.position.map((value,i)=>value-shift(q,a,b,u,v)[i])));}}
 const atoms=[...s.atoms.map(x=>({...x})),...newAtoms.map(({id,element,position})=>({id,element,fractional:frac(position,s.lattice)}))];
 const metadata={...(s.metadata||{}),adsorptionDraft:{kind:'molecule',molecule,site,heightAngstrom:height,rotationDegrees:[...rotation],anchorAtomId:info.anchorAtomId,neighborImages:info.neighborImages,minDistanceAngstrom:minDistance,method:'periodic_xy_geometric_guess',warning:'Free molecule approximate coordinates; not relaxed or symmetry-classified; inspect geometry and run DFT on HPC.'}};
 return {structure:{...s,atoms,metadata},positionAngstrom:origin,minDistanceAngstrom:minDistance,siteInfo:info,warning:minDistance<0.8?'POTENTIAL OVERLAP: slab–adsorbate distance <0.8 Å':'Molecular geometry draft; check orientation, vacuum and relaxation.'};
}
