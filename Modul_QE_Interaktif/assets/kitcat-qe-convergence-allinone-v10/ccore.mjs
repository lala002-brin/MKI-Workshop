export const RY_TO_EV=13.605693122994;
export function calculate(rows,{mode='wfc',unit='Ry',atoms=1,toleranceMeV=5}={}){
 const n=Number(atoms),tol=Number(toleranceMeV);
 if(!Number.isInteger(n)||n<1)throw Error('Jumlah atom harus bilangan bulat positif.');
 if(!(Number.isFinite(tol)&&tol>0))throw Error('Toleransi meV/atom harus positif.');
 if(!['wfc','rho'].includes(mode))throw Error('Mode tidak valid.');
 if(!['Ry','eV'].includes(unit))throw Error('Satuan tidak valid.');
 const used=rows.filter(r=>['wfc','rho','energy'].some(k=>String(r[k]??'').trim()!==''));
 if(used.length<2)throw Error('Isi sedikitnya dua baris lengkap.');
 const points=used.map((r,i)=>{
  const vals=['wfc','rho','energy'].map(k=>String(r[k]??'').trim()===''?NaN:Number(r[k]));
  const [wfc,rho,energy]=vals;
  if(!vals.every(Number.isFinite)||wfc<=0||rho<=0)throw Error(`Baris ${i+1}: cutoff harus positif dan energi valid.`);
  if(rho<wfc)throw Error(`Baris ${i+1}: ecutrho harus ≥ ecutwfc.`);
  return {wfc,rho,energyInput:energy,energyEV:energy*(unit==='Ry'?RY_TO_EV:1),x:mode==='wfc'?wfc:rho,ratio:rho/wfc};
 });
 if(new Set(points.map(p=>p.x)).size!==points.length)throw Error('Nilai cutoff yang diuji tidak boleh duplikat.');
 const warnings=[];
 if(points.some((p,i)=>i&&p.x<=points[i-1].x))warnings.push('Urutkan cutoff dari kecil ke besar.');
 if(mode==='rho'&&points.some(p=>Math.abs(p.wfc-points[0].wfc)>1e-6))warnings.push('Untuk uji ecutrho, ecutwfc harus tetap di semua baris.');
 if(mode==='wfc'&&points.some(p=>Math.abs(p.ratio-points[0].ratio)>1e-3))warnings.push('Untuk uji ecutwfc, rasio ecutrho/ecutwfc sebaiknya sama di semua baris.');
 const ref=points.at(-1).energyEV;
 const data=points.map((p,i)=>({...p,deltaPreviousMeVPerAtom:i?Math.abs(p.energyEV-points[i-1].energyEV)*1000/n:null,deltaReferenceMeVPerAtom:Math.abs(p.energyEV-ref)*1000/n,energyEVPerAtom:p.energyEV/n}));
 let recommended=null;
 if(!warnings.length&&data.length>=4){for(let i=0;i<=data.length-3;i++){if(data.slice(i).every(p=>p.deltaReferenceMeVPerAtom<=tol+1e-9)){recommended=data[i];break;}}}
 return {mode,unit,atoms:n,toleranceMeV:tol,warnings,data,recommended,referenceCutoff:data.at(-1).x,referenceEnergyEV:ref};
}
export function csv(result){return ['ecutwfc_Ry,ecutrho_Ry,total_energy_eV,energy_eV_per_atom,delta_previous_meV_per_atom,delta_reference_meV_per_atom',...result.data.map(p=>[p.wfc,p.rho,p.energyEV,p.energyEVPerAtom,p.deltaPreviousMeVPerAtom??'',p.deltaReferenceMeVPerAtom].join(','))].join('\n')+'\n';}
