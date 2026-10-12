/** KITCAT Structure Core v0.2 — pure JavaScript, no DOM, no dependencies.
 * Conventions: lattice rows are a,b,c in Å; fractional f is a row vector;
 * Cartesian x=f*A. Only fully periodic bulk models in this release.
 */
export const VERSION='0.4.0';
export class StructureError extends Error {constructor(code,message){super(message);this.name='StructureError';this.code=code;}}
const fail=(code,message)=>{throw new StructureError(code,message)};
const finite=x=>typeof x==='number'&&Number.isFinite(x);
const vec=(v,name)=>{if(!Array.isArray(v)||v.length!==3||!v.every(finite))fail('INVALID_VECTOR',`${name}: expected 3 finite numbers`);return [...v]};
const mat=(m,name)=>{if(!Array.isArray(m)||m.length!==3)fail('INVALID_MATRIX',`${name}: expected 3x3`);return m.map((r,i)=>vec(r,`${name}[${i}]`))};
export const ELEMENTS=Object.freeze(('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og').split(' '));
export const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
export const mulRow=(v,A)=>[0,1,2].map(j=>v.reduce((s,x,i)=>s+x*A[i][j],0));
export const determinant=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
export function inverse(A){A=mat(A,'matrix');const d=determinant(A);const max=Math.max(...A.flat().map(Math.abs));if(max===0||Math.abs(d)/(max**3)<1e-12)fail('SINGULAR_CELL','Singular or near-singular matrix');const [[a,b,c],[e,f,g],[h,i,j]]=A;return [[f*j-g*i,c*i-b*j,b*g-c*f],[g*h-e*j,a*j-c*h,c*e-a*g],[e*i-f*h,b*h-a*i,a*f-b*e]].map(r=>r.map(x=>x/d));}
export function volume(A){return Math.abs(determinant(mat(A,'lattice')))}
export function fractionalToCartesian(f,A){return mulRow(vec(f,'fractional'),mat(A,'lattice'))}
export function cartesianToFractional(x,A){return mulRow(vec(x,'cartesian'),inverse(A))}
export const wrapFractional=f=>vec(f,'fractional').map(x=>{let y=x-Math.floor(x);return y>=1-1e-12?0:y});
export function createStructure({lattice,atoms,metadata={}}){
 lattice=mat(lattice,'lattice');inverse(lattice);
 if(determinant(lattice)<=0)fail('LEFT_HANDED_CELL','Lattice must have positive orientation');
 if(!Array.isArray(atoms)||atoms.length===0)fail('EMPTY_ATOMS','At least one atom required');
 const ids=new Set();const clean=atoms.map((a,i)=>{if(!a||typeof a!=='object')fail('INVALID_ATOM',`Atom ${i}`);const id=String(a.id??`atom-${i+1}`);if(ids.has(id))fail('DUPLICATE_ID',id);ids.add(id);if(!ELEMENTS.includes(a.element))fail('INVALID_ELEMENT',`Atom ${id}: invalid element symbol`);const fractional=vec(a.fractional,`atom ${id} fractional`);const fixedAxes=a.fixedAxes===undefined?undefined:a.fixedAxes;
 if(fixedAxes!==undefined&&(!Array.isArray(fixedAxes)||fixedAxes.length!==3||!fixedAxes.every(x=>typeof x==='boolean')))fail('INVALID_CONSTRAINTS',`Atom ${id}: fixedAxes must be three booleans`);
 const selectiveDynamics=a.selectiveDynamics===undefined?undefined:a.selectiveDynamics;
 if(selectiveDynamics!==undefined&&(!Array.isArray(selectiveDynamics)||selectiveDynamics.length!==3||!selectiveDynamics.every(x=>typeof x==='boolean')))fail('INVALID_CONSTRAINTS',`Atom ${id}: selectiveDynamics must be three booleans`);
 if(fixedAxes!==undefined&&selectiveDynamics!==undefined&&fixedAxes.some((v,j)=>v===selectiveDynamics[j]))fail('CONSTRAINT_CONFLICT',`Atom ${id}: fixedAxes conflicts with selectiveDynamics`);
 const constraints=fixedAxes===undefined&&selectiveDynamics===undefined?{}:{fixedAxes:fixedAxes?[...fixedAxes]:selectiveDynamics.map(x=>!x),selectiveDynamics:selectiveDynamics?[...selectiveDynamics]:fixedAxes.map(x=>!x)};
 return {id,element:a.element,fractional,...(a.speciesLabel?{speciesLabel:String(a.speciesLabel)}:{}),...constraints};});
 return {schemaVersion:'0.4',units:'angstrom',periodicAxes:[true,true,true],lattice,atoms:clean,metadata:structuredClone(metadata)};
}
export function latticeMetrics(s){const a=s.lattice.map(v=>Math.hypot(...v));const angle=(u,v)=>Math.acos(Math.max(-1,Math.min(1,dot(u,v)/(Math.hypot(...u)*Math.hypot(...v)))))*180/Math.PI;return {lengths:a,angles:[angle(s.lattice[1],s.lattice[2]),angle(s.lattice[0],s.lattice[2]),angle(s.lattice[0],s.lattice[1])],volume:volume(s.lattice)}};
/** Exact closest periodic image by certified finite search in 3D. No fixed 3x3x3 shell.
 * A bound from the inverse lattice guarantees a solution inside the enumerated box.
 * Throws SEARCH_LIMIT rather than return a potentially incorrect answer.
 */
export function minImageDistance(s,idx1,idx2,{maxCandidates=500000}={}){
 if(!Number.isInteger(idx1)||!Number.isInteger(idx2)||idx1<0||idx2<0||idx1>=s.atoms.length||idx2>=s.atoms.length)fail('INVALID_INDEX','Atom index out of range');
 if(!Number.isSafeInteger(maxCandidates)||maxCandidates<1)fail('INVALID_LIMIT','maxCandidates must be a positive safe integer');
 const A=mat(s.lattice,'lattice'),invA=inverse(A);
 const f=s.atoms[idx1].fractional.map((x,i)=>x-s.atoms[idx2].fractional[i]);
 // Get an initial valid upper bound by component-wise nearest integer shift.
 const initial=f.map(x=>-Math.round(x));
 let best=Math.hypot(...mulRow(f.map((x,i)=>x+initial[i]),A));
 const bounds=[0,1,2].map(j=>{
   const norm=Math.hypot(invA[0][j],invA[1][j],invA[2][j]);
   const extent=best*norm + 1e-10;
   return [Math.ceil(-f[j]-extent),Math.floor(-f[j]+extent)];
 });
 const sizes=bounds.map(([lo,hi])=>Math.max(0,hi-lo+1));
 if(sizes.some(x=>x===0))return best;
 if(sizes.reduce((p,x)=>p*x,1)>maxCandidates)fail('SEARCH_LIMIT','Periodic distance needs more candidates; increase maxCandidates deliberately');
 for(let i=bounds[0][0];i<=bounds[0][1];i++)for(let j=bounds[1][0];j<=bounds[1][1];j++)for(let k=bounds[2][0];k<=bounds[2][1];k++){
  const v=mulRow([f[0]+i,f[1]+j,f[2]+k],A);
  best=Math.min(best,Math.hypot(...v));
 }
 return best;
}
/** Nearest nonzero lattice translation; flags periodic collisions in tiny cells. */
export function shortestLatticeTranslation(s,{maxCandidates=500000}={}){
 const A=mat(s.lattice,'lattice'),invA=inverse(A);
 let best=Math.min(...A.map(r=>Math.hypot(...r)));
 const extent=[0,1,2].map(j=>Math.floor(best*Math.hypot(invA[0][j],invA[1][j],invA[2][j])+1e-10));
 const count=extent.reduce((p,n)=>p*(2*n+1),1);
 if(count>maxCandidates)fail('SEARCH_LIMIT','Short lattice vector search exceeds limit');
 for(let i=-extent[0];i<=extent[0];i++)for(let j=-extent[1];j<=extent[1];j++)for(let k=-extent[2];k<=extent[2];k++){
  if(i===0&&j===0&&k===0)continue;
  best=Math.min(best,Math.hypot(...mulRow([i,j,k],A)));
 }
 return best;
}
export function validateBulk(s,{distanceWarning=0.6,maxAtoms=50000,maxPairs=2000000}={}){
 const errors=[],warnings=[];
 try{createStructure(s)}catch(e){errors.push({code:e.code||'STRUCTURE_INVALID',message:e.message});return {status:'error',errors,warnings}}
 if(s.atoms.length>maxAtoms)warnings.push({code:'LARGE_STRUCTURE',message:`${s.atoms.length} atoms`});
 const pairs=s.atoms.length*(s.atoms.length-1)/2;
 if(pairs>maxPairs){warnings.push({code:'PAIR_LIMIT',message:`Skipped pair-distance validation of ${pairs} pairs`});return {status:'warning',errors,warnings,metrics:latticeMetrics(s)}}
 try {
 const selfDistance=shortestLatticeTranslation(s);
 if(selfDistance<distanceWarning)warnings.push({code:'SHORT_PERIODIC_TRANSLATION',distance:selfDistance});
 for(let i=0;i<s.atoms.length;i++)for(let j=i+1;j<s.atoms.length;j++){
 const d=minImageDistance(s,i,j);
 if(d<1e-6)errors.push({code:'COINCIDENT_ATOMS',atoms:[s.atoms[i].id,s.atoms[j].id],distance:d});
 else if(d<distanceWarning)warnings.push({code:'SHORT_DISTANCE',atoms:[s.atoms[i].id,s.atoms[j].id],distance:d});
 }
 }catch(e){warnings.push({code:'VALIDATION_INCOMPLETE',message:e.message});}
 return {status:errors.length?'error':warnings.length?'warning':'pass',errors,warnings,metrics:latticeMetrics(s)};
}
export function supercell(s,M,{maxAtoms=30000}={}){
 M=mat(M,'supercell matrix');if(!M.flat().every(Number.isInteger))fail('NONINTEGER_SUPERCELL','Supercell matrix must contain integers');const det=determinant(M);if(det<=0||!Number.isSafeInteger(det))fail('INVALID_SUPERCELL_DET','Supercell determinant must be a positive safe integer');if(det*s.atoms.length>maxAtoms)fail('TOO_MANY_ATOMS','Supercell exceeds maxAtoms');const invM=inverse(M);const newLattice=M.map(r=>mulRow(r,s.lattice));
 const corners=[];for(let i=0;i<=1;i++)for(let j=0;j<=1;j++)for(let k=0;k<=1;k++)corners.push(mulRow([i,j,k],M));const lo=[0,1,2].map(t=>Math.floor(Math.min(...corners.map(x=>x[t])))-1),hi=[0,1,2].map(t=>Math.ceil(Math.max(...corners.map(x=>x[t])))+1);
 const spans=hi.map((h,i)=>h-lo[i]+1);if(spans.reduce((a,b)=>a*b,1)*s.atoms.length>2000000)fail('ENUMERATION_LIMIT','Supercell candidate box too large');
 const atoms=[];const eps=1e-9;
 for(const a of s.atoms){let count=0;for(let i=lo[0];i<=hi[0];i++)for(let j=lo[1];j<=hi[1];j++)for(let k=lo[2];k<=hi[2];k++){const p=mulRow([a.fractional[0]+i,a.fractional[1]+j,a.fractional[2]+k],invM);if(p.every(x=>x>=-eps&&x<1-eps)){atoms.push({...a,id:`${a.id}@${i},${j},${k}`,fractional:wrapFractional(p)});count++}}if(count!==det)fail('ENUMERATION_FAILED',`Expected ${det} images for ${a.id}, got ${count}`)}
 return createStructure({lattice:newLattice,atoms,metadata:{...s.metadata,parentStructure:'supercell',transformationMatrix:M}});
}
