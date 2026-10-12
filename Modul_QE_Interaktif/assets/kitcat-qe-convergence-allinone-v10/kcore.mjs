export const RY_TO_EV = 13.605693122994;
export function parseMesh(mesh) {
  const m = String(mesh).trim().match(/^(\d+)\s*[x×,\s]\s*(\d+)\s*[x×,\s]\s*(\d+)$/i);
  if (!m) throw new Error('Mesh harus berbentuk 4x4x1 atau 4 4 1.');
  const v=m.slice(1).map(Number);
  if(v.some(n=>n<1||n>999)) throw new Error('Angka mesh di luar rentang 1–999.');
  return v;
}
export function calculate(rows,{unit='Ry',atoms=1,toleranceMeV=5}={}) {
  if(!Number.isInteger(Number(atoms))||Number(atoms)<1) throw new Error('Jumlah atom harus bilangan bulat positif.');
  if(!Number.isFinite(Number(toleranceMeV))||Number(toleranceMeV)<=0) throw new Error('Toleransi harus lebih besar dari nol.');
  const used=rows.filter(r=>String(r.mesh||'').trim()!==''||String(r.energy||'').trim()!=='');
  if(used.length<2) throw new Error('Masukkan sedikitnya dua pasangan mesh dan energi.');
  const points=used.map((r,i)=>{
    const mesh=parseMesh(r.mesh), raw=Number(r.energy);
    if(String(r.energy).trim()===''||!Number.isFinite(raw))throw new Error(`Energi baris ${i+1} tidak valid.`);
    return {mesh:mesh.join('×'),meshVec:mesh,density:mesh.reduce((p,v)=>p*v,1),energyEV:raw*(unit==='Ry'?RY_TO_EV:1),energyInput:raw};
  });
  if(new Set(points.map(p=>p.mesh)).size!==points.length)throw new Error('Mesh duplikat terdeteksi.');
  const warnings=[];
  if(points.some((p,i)=>i>0&&p.density<=points[i-1].density))warnings.push('Urutan mesh tidak semakin rapat. Urutkan dari mesh kasar ke rapat sebelum menentukan konvergensi.');
  const ref=points.at(-1).energyEV;
  const data=points.map((p,i)=>({...p,deltaPreviousMeVPerAtom:i?Math.abs(p.energyEV-points[i-1].energyEV)*1000/atoms:null,deltaReferenceMeVPerAtom:Math.abs(p.energyEV-ref)*1000/atoms,energyEVPerAtom:p.energyEV/atoms}));
  const tol=Number(toleranceMeV);
  let recommended=null;
  if(!warnings.length&&data.length>=4){
    for(let i=0;i<=data.length-3;i++){
      if(data.slice(i).every(p=>p.deltaReferenceMeVPerAtom<=tol+1e-10)) {recommended=data[i];break;}
    }
  }
  return {data,warnings,recommended,toleranceMeV:tol,atoms:Number(atoms),unit,referenceMesh:data.at(-1).mesh,referenceEnergyEV:ref};
}
export function csv(result){return ['mesh,total_energy_eV,energy_eV_per_atom,delta_previous_meV_per_atom,delta_reference_meV_per_atom',...result.data.map(p=>[p.mesh,p.energyEV,p.energyEVPerAtom,p.deltaPreviousMeVPerAtom??'',p.deltaReferenceMeVPerAtom].join(','))].join('\n')+'\n';}
