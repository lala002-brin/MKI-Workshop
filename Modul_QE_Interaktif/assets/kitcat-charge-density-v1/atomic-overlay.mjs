// Distance-based geometric guides only; NOT chemical bonding assignments.
const BOHR_ANG=0.529177210903;
export const elementSymbol=z=>({1:'H',2:'He',3:'Li',4:'Be',5:'B',6:'C',7:'N',8:'O',9:'F',10:'Ne',11:'Na',12:'Mg',13:'Al',14:'Si',15:'P',16:'S',17:'Cl',18:'Ar',26:'Fe',27:'Co',28:'Ni',29:'Cu',30:'Zn',35:'Br',53:'I'})[z]||`Z${z}`;
const radius=z=>({1:.31,2:.28,3:1.28,4:.96,5:.84,6:.76,7:.71,8:.66,9:.57,11:1.66,12:1.41,13:1.21,14:1.11,15:1.07,16:1.05,17:1.02,26:1.32,27:1.26,28:1.24,29:1.32,30:1.22,35:1.20,53:1.39})[z]||1.1;
export function inferBonds(atoms,{units='bohr',factor=1.1,maxBonds=5000}={}){
 if(!Array.isArray(atoms)||!['bohr','angstrom'].includes(units)||!(factor>=.7&&factor<=1.6))throw Error('Invalid geometry/bond settings');
 const unit=units==='bohr'?BOHR_ANG:1,out=[];
 for(let i=0;i<atoms.length;i++)for(let j=i+1;j<atoms.length;j++){
  const a=atoms[i],b=atoms[j];if(!a.atomicNumber||!b.atomicNumber||!Array.isArray(a.position)||!Array.isArray(b.position))continue;
  const d=Math.hypot(...a.position.map((v,k)=>(v-b.position[k])*unit));const cutoff=factor*(radius(a.atomicNumber)+radius(b.atomicNumber));
  if(d>.1&&d<=cutoff){out.push([i,j]);if(out.length>=maxBonds)return out}
 }return out;
}
export function elementLegend(atoms){const counts=new Map();for(const a of atoms)if(a.atomicNumber>0)counts.set(a.atomicNumber,(counts.get(a.atomicNumber)||0)+1);return [...counts.entries()].sort((a,b)=>a[0]-b[0])}
