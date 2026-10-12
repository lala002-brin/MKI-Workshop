const sub=(a,b)=>a.map((x,i)=>x-b[i]);
const add=(a,b)=>a.map((x,i)=>x+b[i]);
const scale=(a,t)=>a.map(x=>x*t);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const norm=a=>Math.hypot(...a);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const cart=(f,L)=>[0,1,2].map(k=>f.reduce((s,v,i)=>s+v*L[i][k],0));
const det=L=>L[0][0]*(L[1][1]*L[2][2]-L[1][2]*L[2][1])-L[0][1]*(L[1][0]*L[2][2]-L[1][2]*L[2][0])+L[0][2]*(L[1][0]*L[2][1]-L[1][1]*L[2][0]);
function frac(p,L){const d=det(L);if(Math.abs(d)<1e-10)throw Error('Sel singular');return [0,1,2].map(i=>{const M=L.map(r=>r.slice());for(let j=0;j<3;j++)M[i][j]=p[j];return det(M)/d})}
function positions(structure,baseCount,indices){
 const atoms=structure?.atoms,L=structure?.lattice;
 if(!Array.isArray(atoms)||!Array.isArray(L)||!Number.isInteger(baseCount)||baseCount<1||baseCount>=atoms.length)throw Error('Struktur tidak valid');
 const n=atoms.length-baseCount;
 if(indices.some(i=>!Number.isInteger(i)||i<0||i>=n)||new Set(indices).size!==4)throw Error('Empat atom adsorbat harus berbeda');
 return indices.map(i=>cart(atoms[baseCount+i].fractional,L));
}
function angleFromPoints([a,b,c,d]){
 const axis=sub(c,b),length=norm(axis);if(length<1e-9)throw Error('Panjang ikatan B-C nol');
 const u=scale(axis,1/length);const v=sub(a,b),w=sub(d,c);
 const pv=sub(v,scale(u,dot(v,u))),pw=sub(w,scale(u,dot(w,u)));
 if(norm(pv)<1e-9||norm(pw)<1e-9)throw Error('Dihedral tidak terdefinisi: atom segaris pada sumbu B-C');
 return Math.atan2(dot(u,cross(pv,pw)),dot(pv,pw))*180/Math.PI;
}
export function measureDihedral(structure,baseCount,{first=0,second=1,third=2,fourth=3}={}){return {angleDegrees:angleFromPoints(positions(structure,baseCount,[first,second,third,fourth])),indices:[first,second,third,fourth]}}
function rotateAround(p,origin,axis,degree){const r=degree*Math.PI/180,v=sub(p,origin),c=Math.cos(r),s=Math.sin(r);return add(origin,add(add(scale(v,c),scale(cross(axis,v),s)),scale(axis,dot(axis,v)*(1-c))))}
const wrap=x=>((x+180)%360+360)%360-180;
export function adjustAdsorbateDihedral(structure,baseCount,{first=0,second=1,third=2,fourth=3,angleDegrees}={}){
 if(!Number.isFinite(angleDegrees)||angleDegrees< -180||angleDegrees>180)throw Error('Sudut target -180° sampai 180°');
 const ids=[first,second,third,fourth],points=positions(structure,baseCount,ids),old=angleFromPoints(points),axis=sub(points[2],points[1]),u=scale(axis,1/norm(axis));
 // Only atom D moves; A,B,C remain fixed. Use a measured test to verify the sign of the angular convention.
 const delta=wrap(angleDegrees-old),candidate=rotateAround(points[3],points[2],u,delta);
 const measured=angleFromPoints([points[0],points[1],points[2],candidate]);
 const corrected=Math.abs(wrap(angleDegrees-measured))<1e-5?candidate:rotateAround(points[3],points[2],u,-delta);
 const check=angleFromPoints([points[0],points[1],points[2],corrected]);
 if(Math.abs(wrap(angleDegrees-check))>1e-4)throw Error('Gagal menentukan rotasi dihedral');
 const atoms=structure.atoms.map((a,i)=>i===baseCount+fourth?{...a,fractional:frac(corrected,structure.lattice)}:a);
 return {...structure,atoms,metadata:{...structure.metadata,dihedralEditing:{status:'GEOMETRY_DRAFT',indices:ids,previousDegrees:old,targetDegrees:angleDegrees,warning:'Only terminal atom D rotated around B-C; other molecular geometry and physical stability not optimized.'}}};
}
