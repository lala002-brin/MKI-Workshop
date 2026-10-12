const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const norm=v=>Math.hypot(...v);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const cart=(f,L)=>[0,1,2].map(k=>f.reduce((s,x,i)=>s+x*L[i][k],0));
const det=L=>L[0][0]*(L[1][1]*L[2][2]-L[1][2]*L[2][1])-L[0][1]*(L[1][0]*L[2][2]-L[1][2]*L[2][0])+L[0][2]*(L[1][0]*L[2][1]-L[1][1]*L[2][0]);
function frac(p,L){const d=det(L);if(!Number.isFinite(d)||Math.abs(d)<1e-10)throw Error('Sel singular');return [0,1,2].map(i=>{const M=L.map(r=>r.slice());for(let j=0;j<3;j++)M[i][j]=p[j];return det(M)/d})}
export function measureAngle(structure,baseCount,{first=0,vertex=1,third=2}={}){
 const atoms=structure?.atoms,L=structure?.lattice;
 if(!Array.isArray(atoms)||!Array.isArray(L)||!Number.isInteger(baseCount)||baseCount<1||baseCount>=atoms.length)throw Error('Struktur invalid');
 const n=atoms.length-baseCount, ids=[first,vertex,third];
 if(ids.some(i=>!Number.isInteger(i)||i<0||i>=n)||new Set(ids).size!==3)throw Error('Tiga indeks atom adsorbat harus berbeda');
 const [p,q,r]=ids.map(i=>cart(atoms[baseCount+i].fractional,L));
 const u=p.map((v,i)=>v-q[i]),v=r.map((x,i)=>x-q[i]);const a=norm(u),b=norm(v);
 if(a<1e-9||b<1e-9)throw Error('Vektor ikatan nol');
 return {angleDegrees:Math.acos(Math.max(-1,Math.min(1,dot(u,v)/(a*b))))*180/Math.PI,firstLengthAngstrom:a,thirdLengthAngstrom:b};
}
export function adjustAdsorbateAngle(structure,baseCount,{first=0,vertex=1,third=2,angleDegrees}={}){
 if(!Number.isFinite(angleDegrees)||angleDegrees<=0.1||angleDegrees>=179.9)throw Error('Sudut target harus antara 0.1° dan 179.9° (eksklusif)');
 const old=measureAngle(structure,baseCount,{first,vertex,third});
 const L=structure.lattice, atoms=structure.atoms;
 const [p,q,r]=[first,vertex,third].map(i=>cart(atoms[baseCount+i].fractional,L));
 const v=p.map((x,i)=>x-q[i]),w=r.map((x,i)=>x-q[i]);const u=v.map(x=>x/norm(v));
 let perp=w.map((x,i)=>x-u[i]*dot(w,u));let magnitude=norm(perp);
 if(magnitude<1e-9){const seed=Math.abs(u[0])<0.8?[1,0,0]:[0,1,0];perp=cross(u,seed);magnitude=norm(perp)}
 const e=perp.map(x=>x/magnitude),a=angleDegrees*Math.PI/180,dist=norm(w);
 const moved=q.map((x,i)=>x+dist*(Math.cos(a)*u[i]+Math.sin(a)*e[i]));
 const updated=atoms.map((atom,i)=>i===baseCount+third?{...atom,fractional:frac(moved,L)}:atom);
 return {...structure,atoms:updated,metadata:{...structure.metadata,angleEditing:{status:'GEOMETRY_DRAFT',first,vertex,third,previousDegrees:old.angleDegrees,targetDegrees:angleDegrees,warning:'Only one selected adsorbate atom is moved; no force relaxation or global molecular geometry optimization.'}}};
}
