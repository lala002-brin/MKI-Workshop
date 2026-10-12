export function readCube(text){
 const lines=text.replace(/\r/g,'').split('\n'); if(lines.length<7)throw Error('File cube terlalu pendek');
 const nums=s=>s.trim().split(/\s+/).map(v=>Number(v.replace(/[dD]/g,'E')));
 let a=nums(lines[2]);const nat=a[0];if(!Number.isInteger(nat)||nat<0)throw Error('Cube dengan multi-dataset/orbital (nat negatif) belum didukung');
 if(a.length<4||a.slice(1,4).some(v=>!Number.isFinite(v)))throw Error('Origin cube tidak valid');
 const origin=a.slice(1,4), dims=[],vectors=[],signs=[];
 for(let i=0;i<3;i++){a=nums(lines[3+i]);if(a.length<4||!Number.isInteger(a[0])||a[0]===0||a.slice(1,4).some(v=>!Number.isFinite(v)))throw Error('Grid cube tidak valid');dims.push(Math.abs(a[0]));signs.push(Math.sign(a[0]));vectors.push(a.slice(1,4));}
 if(signs.some(x=>x!==signs[0]))throw Error('Unit cube campuran tidak didukung');
 const atoms=[];
 for(let j=0;j<nat;j++){
  const row=nums(lines[6+j]);
  if(row.length<5||!Number.isInteger(row[0])||row[0]<1||row[0]>118||row.slice(1,5).some(v=>!Number.isFinite(v)))throw Error('Invalid Gaussian cube atom header at atom '+(j+1));
  atoms.push({atomicNumber:row[0],nuclearCharge:row[1],position:row.slice(2,5)});
 }
 const offset=6+nat;if(lines.length<=offset)throw Error('Nilai grid tidak ditemukan');
 const count=dims.reduce((a,b)=>a*b,1);if(count>2000000)throw Error('Grid terlalu besar untuk browser (maks. 2 juta voxel)');
 const tokens=lines.slice(offset).join(' ').trim().split(/\s+/);if(tokens.length!==count)throw Error(`Jumlah voxel ${tokens.length}, semestinya ${count}; kemungkinan format orbital/multi-dataset`);
 const values=Float64Array.from(tokens,v=>Number(v.replace(/[dD]/g,'E')));if(values.some(v=>!Number.isFinite(v)))throw Error('Nilai grid bukan angka');
 return {kind:'cube',dims,vectors,origin,atoms,units:signs[0]<0?'angstrom':'bohr',values,source:'Gaussian cube',note:'Unit densitas ditentukan oleh sumber data; tidak diasumsikan otomatis.'};
}
export function readXYZ(text){
 const rows=[];for(const l of text.replace(/\r/g,'').split('\n')){let s=l.trim();if(!s||s.startsWith('#')||s.startsWith('!'))continue;let p=s.split(/[\s,;]+/);if(p.length<3||p.slice(0,3).some(v=>!Number.isFinite(Number(v.replace(/[dD]/g,'E'))))) {if(!rows.length&&/[a-z]/i.test(s))continue;throw Error('Format CSV/XYZ: x y nilai; baris tidak valid: '+s.slice(0,70));}rows.push(p.slice(0,3).map(v=>Number(v.replace(/[dD]/g,'E'))));}
 if(rows.length<4)throw Error('Perlu minimal empat titik');const xs=[...new Set(rows.map(r=>r[0]))].sort((a,b)=>a-b),ys=[...new Set(rows.map(r=>r[1]))].sort((a,b)=>a-b);if(xs.length*ys.length!==rows.length||xs.length<2||ys.length<2)throw Error('Data harus grid 2D lengkap dan persegi panjang');
 const map=new Map();for(const [x,y,v] of rows){const key=x+'|'+y;if(map.has(key))throw Error('Koordinat grid duplikat');map.set(key,v)}
 return {kind:'xy',xs,ys,nx:xs.length,ny:ys.length,values:Float64Array.from(ys.flatMap(y=>xs.map(x=>map.get(x+'|'+y)))),units:'as supplied',source:'x y value table',note:'Koordinat dan unit mengikuti berkas sumber.'};
}
export function sliceCube(c,axis='z',index=0){const [nx,ny,nz]=c.dims;const len={x:nx,y:ny,z:nz}[axis];if(!len||!Number.isInteger(index)||index<0||index>=len)throw Error('Indeks slice di luar grid');
 const size=axis==='z'?[nx,ny]:axis==='y'?[nx,nz]:[ny,nz];const [w,h]=size;let values=new Float64Array(w*h);
 for(let j=0;j<h;j++)for(let i=0;i<w;i++){let x=axis==='x'?index:i,y=axis==='x'?i:axis==='y'?index:j,z=axis==='z'?index:j;values[j*w+i]=c.values[(x*ny+y)*nz+z]}
 return {nx:w,ny:h,values,axis,index,extent:`${axis.toUpperCase()} index ${index}/${len-1}`,description:`Grid ${nx}×${ny}×${nz}; slice ${axis}=${index}`,units:c.units};
}
export function viewData(d,axis,index){return d.kind==='cube'?sliceCube(d,axis,index):{nx:d.nx,ny:d.ny,values:d.values,axis:'xy',index:0,extent:'Grid XY',description:`${d.nx} × ${d.ny} points`,units:d.units}}
export function range(values){let min=Infinity,max=-Infinity;for(const v of values){if(v<min)min=v;if(v>max)max=v}return {min,max}}

// Δρ subtraction is only defined on exactly coincident coordinate grids. No interpolation.
export function compareCubeGrids(a,b,tol=1e-7){
 if(a.kind!=='cube'||b.kind!=='cube')return {ok:false,reason:'Only Gaussian cube data can be subtracted'};
 if(a.units!==b.units)return {ok:false,reason:'Different cube coordinate units'};
 if(a.dims.some((n,i)=>n!==b.dims[i]))return {ok:false,reason:'Different voxel dimensions'};
 const same=(x,y)=>Math.abs(x-y)<=tol*Math.max(1,Math.abs(x),Math.abs(y));
 if(a.origin.some((x,i)=>!same(x,b.origin[i])))return {ok:false,reason:'Different grid origins'};
 for(let k=0;k<3;k++)if(a.vectors[k].some((x,i)=>!same(x,b.vectors[k][i])))return {ok:false,reason:'Different voxel basis vectors'};
 return {ok:true,reason:'Coincident grid geometry within numeric tolerance (not proof of physically consistent fragments)'};
}
export function subtractCubes(total,a,b){
 for(const [name,c] of [['fragment A',a],['fragment B',b]]){const match=compareCubeGrids(total,c);if(!match.ok)throw Error(`${name}: ${match.reason}. Recalculate cubes on identical grids; no interpolation performed.`)}
 const values=new Float64Array(total.values.length);let sum=0,min=Infinity,max=-Infinity;
 for(let i=0;i<values.length;i++){const v=total.values[i]-a.values[i]-b.values[i];if(!Number.isFinite(v))throw Error('Nonfinite density difference');values[i]=v;sum+=v;min=Math.min(min,v);max=Math.max(max,v)}
 return {...total,values,source:'Calculated Δρ (3 Gaussian cubes)',note:'Δρ = total − fragment A − fragment B. No resampling; verify matching geometry, nuclear coordinates, pseudopotentials, and physical density units.',deltaStats:{min,max,sum,mean:sum/values.length}};
}

// A periodic plane average is over integer voxel planes, not arbitrary Cartesian z.
// Integrals are meaningful in electron units only when density units are supplied correctly.
export const BOHR_ANG=0.529177210903;
export function planarProfile(c,axis='z',densityUnit='e/bohr3'){
 if(c.kind!=='cube')throw Error('Planar profile requires a 3D Gaussian cube');
 if(!['x','y','z'].includes(axis))throw Error('Invalid profile direction');
 if(!['e/bohr3','e/angstrom3'].includes(densityUnit))throw Error('Select supported electron-density units');
 const dim={x:0,y:1,z:2}[axis], [nx,ny,nz]=c.dims, n=c.dims[dim];
 const v=c.vectors[dim],norm=Math.hypot(...v);
 if(!(norm>0))throw Error('Zero-length voxel vector');
 const factor=c.units==='bohr'?BOHR_ANG:1,stepAng=norm*factor;
 const v0=c.vectors[0],v1=c.vectors[1],v2=c.vectors[2];
 const det=v0[0]*(v1[1]*v2[2]-v1[2]*v2[1])-v0[1]*(v1[0]*v2[2]-v1[2]*v2[0])+v0[2]*(v1[0]*v2[1]-v1[1]*v2[0]);
 const voxelVolumeAng3=Math.abs(det)*factor**3;
 if(!(voxelVolumeAng3>0))throw Error('Singular voxel cell');
 const volumeUnit=densityUnit==='e/bohr3'?(voxelVolumeAng3/BOHR_ANG**3):voxelVolumeAng3;
 let sums=new Float64Array(n),counts=new Uint32Array(n);
 for(let x=0;x<nx;x++)for(let y=0;y<ny;y++)for(let z=0;z<nz;z++){
   const k=dim===0?x:dim===1?y:z,val=c.values[(x*ny+y)*nz+z];
   sums[k]+=val;counts[k]++;
 }
 const mean=Float64Array.from(sums,(v,i)=>v/counts[i]);
 const cumulative=new Float64Array(n+1);let min=Infinity,max=-Infinity;
 for(let k=0;k<n;k++){
   const planeCharge=sums[k]*volumeUnit;
   cumulative[k+1]=cumulative[k]+planeCharge;
   min=Math.min(min,mean[k]);max=Math.max(max,mean[k]);
 }
 const axisVector=c.vectors[dim].map(v=>v*factor),originAng=c.origin.map(v=>v*factor);
 const points=Array.from({length:n},(_,i)=>({index:i,distanceAng:(i+.5)*stepAng,mean:mean[i],planeCharge:(cumulative[i+1]-cumulative[i]),cumulativeElectrons:cumulative[i+1]}));
 return {points,axis,stepAng,axisVector,originAng,voxelVolumeAng3,densityUnit,totalElectrons:cumulative[n],min,max,nonOrthogonal:'Coordinate is distance along voxel lattice vector, not Cartesian z or surface-normal unless verified.',note:'Cumulative integral is with respect to the beginning of the chosen grid axis; periodic-boundary charge partition requires a physically justified integration region.'};
}
export function chargeBetween(profile,start,end){
 if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end>profile.points.length||start>=end)throw Error('Integration range must satisfy 0 ≤ start < end ≤ number of planes');
 const p=profile.points;return {chargeElectrons:p[end-1].cumulativeElectrons-(start?p[start-1].cumulativeElectrons:0),start,end};
}

// Region-resolved moment of electron-number-density difference, not an automatically validated physical dipole.
export const ELECTRON_ANGSTROM_TO_DEBYE=4.80320471257;
export function interfaceMoments(profile,start,end,referenceAng=null){
 if(!profile?.points?.length)throw Error('Planar profile is required');
 if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end>profile.points.length||start>=end)throw Error('Invalid region boundaries');
 const points=profile.points,step=profile.stepAng;
 const ref=referenceAng===null?start*step:Number(referenceAng);
 if(!Number.isFinite(ref))throw Error('Reference position must be finite');
 let positive=0,negative=0,moment=0,absoluteMoment=0;
 for(let i=start;i<end;i++){
   const q=points[i].planeCharge;
   if(!Number.isFinite(q))throw Error('Nonfinite density');
   if(q>=0)positive+=q;else negative+=q;
   moment+=q*(points[i].distanceAng-ref);
   absoluteMoment+=Math.abs(q)*(points[i].distanceAng-ref);
 }
 const net=positive+negative;
 return {start,end,referenceAng:ref,positiveElectrons:positive,negativeElectrons:negative,netElectrons:net,firstMomentElectronAng:moment,electronicDipoleElectronAng:-moment,electronicDipoleDebye:-moment*ELECTRON_ANGSTROM_TO_DEBYE,absoluteDensityFirstMoment: absoluteMoment,warning:'First moment along a voxel lattice-vector distance; sign of physical electric dipole uses negative electron charge. For nonneutral region it depends on coordinate origin; for periodic systems it is not an unambiguous total physical dipole or adsorbate charge transfer.'};
}
