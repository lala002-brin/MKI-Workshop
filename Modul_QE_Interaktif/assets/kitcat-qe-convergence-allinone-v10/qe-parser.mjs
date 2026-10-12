export function parseQEOutput(text, filename='output.out'){
  const data=String(text); const warnings=[];
  const energies=[...data.matchAll(/!\s*total energy\s*=\s*([+-]?\d+(?:\.\d*)?(?:[EeDd][+-]?\d+)?)\s*Ry/gi)];
  if(!energies.length)throw Error(`${filename}: baris ! total energy tidak ditemukan; output mungkin belum mencapai SCF.`);
  const num=x=>Number(String(x).replace(/[dD]/g,'E'));
  const matches=(re)=>{const m=[...data.matchAll(re)];return m.length?m.at(-1)[1]:null};
  const energy=num(energies.at(-1)[1]);
  const atomsRaw=matches(/number of atoms\/cell\s*=\s*(\d+)/gi);
  const wfcRaw=matches(/kinetic-energy cutoff\s*=\s*([0-9.]+)\s*Ry/gi)??matches(/\becutwfc\s*=\s*([0-9.]+)/gi);
  const rhoRaw=matches(/charge density cutoff\s*=\s*([0-9.]+)\s*Ry/gi)??matches(/\becutrho\s*=\s*([0-9.]+)/gi);
  const meshLine=matches(/number of k points\s*=\s*(\d+)/gi);
  const automatic=matches(/\bK_POINTS\s+automatic\s*\n\s*(\d+\s+\d+\s+\d+(?:\s+[01]\s+[01]\s+[01])?)/gi);
  let mesh=automatic?automatic.trim().split(/\s+/).slice(0,3).join('x'):null;
  const grid=matches(/(?:Monkhorst-Pack|MP)\s*(?:grid|mesh)\s*[:=]\s*(\d+\s*[x× ]\s*\d+\s*[x× ]\s*\d+)/gi);
  if(!mesh&&grid)mesh=grid.replace(/\s*[x× ]\s*/g,'x');
  const original=matches(/\b(?:nk1|nk2|nk3)\b\s*=/gi); void original;
  // QE stdout commonly prints counts and k-point coordinates but NOT the input automatic mesh.
  if(!mesh)warnings.push('Mesh K_POINTS tidak tercetak eksplisit dalam output ini. Isi mesh manual atau unggah input .in sebagai metadata di versi berikutnya. Jumlah k-points saja bukan mesh.');
  const jobDone=/\bJOB DONE\./i.test(data);
  const convergence=/convergence has been achieved/i.test(data);
  if(!jobDone)warnings.push('JOB DONE tidak ditemukan: output mungkin belum selesai.');
  if(!convergence)warnings.push('Konfirmasi convergence has been achieved tidak ditemukan.');
  if(!atomsRaw)warnings.push('Jumlah atom tidak ditemukan.');
  if(!wfcRaw||!rhoRaw)warnings.push('Salah satu cutoff tidak ditemukan.');
  if(!Number.isFinite(energy))throw Error(`${filename}: energi tidak valid.`);
  const alat=matches(/lattice parameter \(alat\)\s*=\s*([0-9.]+)/gi);
  const celldm=matches(/unit-cell volume\s*=\s*([0-9.]+)/gi);
  return {filename,energyRy:energy,atoms:atomsRaw?Number(atomsRaw):null,wfc:wfcRaw?num(wfcRaw):null,rho:rhoRaw?num(rhoRaw):null,mesh,kpointsCount:meshLine?Number(meshLine):null,jobDone,convergence,energyOccurrences:energies.length,alat:alat?num(alat):null,volume:celldm?num(celldm):null,warnings};
}
