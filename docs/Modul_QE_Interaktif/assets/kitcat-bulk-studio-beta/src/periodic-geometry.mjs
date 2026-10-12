import {inverse, mulRow} from './structure-core.mjs';
const norm=v=>Math.hypot(...v);
const dot=(a,b)=>a.reduce((z,v,i)=>z+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const minus=(a,b)=>a.map((v,i)=>v-b[i]);
export function minimumImageVector(structure,from,to,{maxCandidates=500000}={}){
 const A=structure.lattice, inv=inverse(A), atoms=structure.atoms;
 if(!Number.isInteger(from)||!Number.isInteger(to)||from<0||to<0||from>=atoms.length||to>=atoms.length||from===to)throw Error('Choose two distinct atoms');
 const df=minus(atoms[to].fractional,atoms[from].fractional);
 let shift=df.map(v=>-Math.round(v));
 let best=mulRow(df.map((v,i)=>v+shift[i]),A),bestLen=norm(best),ties=0;
 const bound=bestLen+1e-10;
 const ranges=df.map((v,j)=>{const extent=bound*norm([inv[0][j],inv[1][j],inv[2][j]])+1e-9;return [Math.ceil(-v-extent),Math.floor(-v+extent)]});
 const candidates=ranges.reduce((p,[l,h])=>p*Math.max(0,h-l+1),1);
 if(candidates>maxCandidates)throw Error('Periodic image search exceeds safety limit; reduce cell skew or use specialized geometry software');
 for(let x=ranges[0][0];x<=ranges[0][1];x++)for(let y=ranges[1][0];y<=ranges[1][1];y++)for(let z=ranges[2][0];z<=ranges[2][1];z++){
  const s=[x,y,z],v=mulRow(df.map((a,i)=>a+s[i]),A),len=norm(v);
  if(len<bestLen-1e-9){bestLen=len;best=v;shift=s;ties=1}
  else if(Math.abs(len-bestLen)<=1e-9){ties++}
 }
 if(bestLen<1e-11)throw Error('Selected atoms overlap under periodic boundaries');
 return {vector:best,distance:bestLen,shift,ambiguous:ties>1};
}
function angle(u,v){const d=norm(u)*norm(v);if(d<1e-11)throw Error('Undefined angle: zero-length segment');return Math.acos(Math.max(-1,Math.min(1,dot(u,v)/d)))*180/Math.PI}
export function periodicAngle(s,i,j,k){const left=minimumImageVector(s,j,i),right=minimumImageVector(s,j,k);return {degrees:angle(left.vector,right.vector),ambiguous:left.ambiguous||right.ambiguous,shifts:[left.shift,right.shift]}}
export function periodicDihedral(s,i,j,k,l){
 const p=minimumImageVector(s,i,j),q=minimumImageVector(s,j,k),r=minimumImageVector(s,k,l);
 const b=q.vector,n=norm(b),e=b.map(x=>x/n),a=p.vector.map(x=>-x),c=r.vector;
 const v=a.map((x,t)=>x-dot(a,e)*e[t]),w=c.map((x,t)=>x-dot(c,e)*e[t]);
 if(norm(v)*norm(w)<1e-11)throw Error('Undefined dihedral: nearly collinear atoms');
 return {degrees:Math.atan2(dot(cross(e,v),w),dot(v,w))*180/Math.PI,ambiguous:p.ambiguous||q.ambiguous||r.ambiguous,shifts:[p.shift,q.shift,r.shift]};
}
