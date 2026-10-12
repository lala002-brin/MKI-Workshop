const colors={Na:'#5eacff',Cl:'#7edbad',H:'#f5f7fb',C:'#a7b2c3',N:'#849afa',O:'#fa626e',S:'#f5d45c'};
const radii={H:.31,C:.76,N:.71,O:.66,S:1.05,Na:1.66,Cl:1.02};
export function cartesian(atom,lattice){return [0,1,2].map(k=>atom.fractional.reduce((v,f,i)=>v+f*lattice[i][k],0))}
export function buildScene(structure,baseCount,{showBonds=true,showCell=true}={}){
 const atoms=structure.atoms.slice(0,1600).map((a,i)=>({i,p:cartesian(a,structure.lattice),element:a.element,color:colors[a.element]||'#cbd5e1',ads:i>=baseCount}));const lines=[],bonds=[];
 // Distance-derived *visual guides*, not quantum-chemical bond orders.
 // In particular Na-Cl slab connectors depict near-neighbour coordination,
 // not covalent bonds. Distinguish slab/adsorbate to avoid false chemisorption.
 if(showBonds){
   const maxPairs=atoms.length>550?2500:6000;let count=0;
   for(let i=0;i<atoms.length;i++)for(let j=i+1;j<atoms.length;j++){
     const a=atoms[i],b=atoms[j];
     if(a.ads!==b.ads)continue; // Never infer adsorption bonding without chemistry analysis.
     if(a.p.some(v=>!Number.isFinite(v))||b.p.some(v=>!Number.isFinite(v)))continue;
     const d=Math.hypot(...a.p.map((n,k)=>n-b.p[k]));
     const sum=(radii[a.element]||.75)+(radii[b.element]||.75);
     const cutoff=a.ads?Math.min(2.2,1.30*sum):Math.min(3.5,1.24*sum);
     if(d>.34&&d<cutoff){bonds.push([a.p,b.p]);count++;if(count>=maxPairs)break}
   }
 }
 if(showCell&&structure.lattice?.length===3){const L=structure.lattice;const corners=[];for(let a=0;a<=1;a++)for(let b=0;b<=1;b++)for(let c=0;c<=1;c++)corners.push([0,1,2].map(k=>a*L[0][k]+b*L[1][k]+c*L[2][k]));for(let i=0;i<8;i++)for(let j=i+1;j<8;j++){const a=i.toString(2).padStart(3,'0'),b=j.toString(2).padStart(3,'0');if([...a].filter((v,k)=>v!==b[k]).length===1)lines.push([corners[i],corners[j]])}}
 return {atoms,lines,bonds};
}
export function projectScene(scene,{az=.55,el=.35,zoom=1,width=700,height=450}={}){
 const positions=[...scene.atoms.map(a=>a.p),...scene.lines.flat(),...(scene.bonds||[]).flat()];const center=[0,1,2].map(k=>positions.reduce((n,p)=>n+p[k],0)/Math.max(1,positions.length));
 const rotated=p=>{const x=p[0]-center[0],y=p[1]-center[1],z=p[2]-center[2];const xx=x*Math.cos(az)-y*Math.sin(az),yy=x*Math.sin(az)+y*Math.cos(az);return [xx,z*Math.cos(el)-yy*Math.sin(el),z*Math.sin(el)+yy*Math.cos(el)]};
 const coords=positions.map(rotated);const span=Math.max(4,...coords.map(a=>Math.max(Math.abs(a[0]),Math.abs(a[1]))))*2;const scale=Math.min(width,height)*.77/span*zoom;
 const proj=p=>{const r=rotated(p),factor=Math.max(.55,1+r[2]/(span*2.8));const px=width/2+r[0]*scale/factor,py=height/2-r[1]*scale/factor;return [px,py,Math.max(-.98,Math.min(.98,r[2]/(span*2)))]};
 const points=scene.atoms.map(a=>{const [px,py,depth]=proj(a.p);return {...a,px,py,depth,clipx:px/width*2-1,clipy:1-py/height*2,clipz:depth}});
 const lines=scene.lines.map(line=>line.map(p=>{const [x,y,z]=proj(p);return [x/width*2-1,1-y/height*2,z]}));const bonds=(scene.bonds||[]).map(line=>line.map(p=>{const [x,y,z]=proj(p);return [x/width*2-1,1-y/height*2,z]}));return {points,lines,bonds};
}
export function findNearestAtom(points,p,maxDistance=19){const near=points.map(a=>({i:a.i,d:Math.hypot(a.px-p.x,a.py-p.y)})).filter(a=>a.d<maxDistance).sort((a,b)=>a.d-b.d);return near.length?near[0].i:-1}
