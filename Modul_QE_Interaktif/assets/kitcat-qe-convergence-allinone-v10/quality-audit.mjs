const near=(a,b)=>Math.abs(a-b)<=Math.max(1e-6,1e-5*Math.max(Math.abs(a),Math.abs(b)));
export function auditSeries(rows, mode, atomCount){
 const issues=[],qc=rows.filter(r=>r.qe).map(r=>r.qe);
 const warn=(code,message,level='warning')=>issues.push({code,message,level});
 if(rows.length<4)warn('FEW_POINTS','Minimal empat titik diperlukan sebelum rekomendasi mesh/cutoff.');
 const valid=rows.filter(r=>String(r.energy??'').trim()!==''&&Number.isFinite(Number(r.energy)));
 if(valid.length<rows.length)warn('MISSING_ENERGY','Ada baris tanpa energi valid.');
 if(qc.length){
  if(qc.length!==rows.length)warn('MIXED_SOURCES','Data manual dan output QE tercampur; periksa kesetaraan metode dan satuan.');
  if(qc.some(q=>!q.jobDone))warn('UNFINISHED','Ada output tanpa JOB DONE.', 'blocking');
  if(qc.some(q=>!q.convergence))warn('SCF_UNKNOWN','Ada output tanpa bukti SCF convergence.', 'blocking');
  if(qc.some(q=>q.energyOccurrences>1))warn('MULTI_ENERGY','Sebagian output memiliki beberapa energi SCF/ionic; dipakai energi terakhir. Pastikan geometri tidak berubah antar-run.');
  const counts=qc.map(q=>q.atoms).filter(Number.isInteger);
  if(counts.length!==qc.length)warn('NATOM_UNKNOWN','Jumlah atom tidak tercetak di seluruh output.');
  if(new Set(counts).size>1)warn('NATOM_MISMATCH','Jumlah atom berbeda di antara output.','blocking');
  if(counts.some(n=>n!==atomCount))warn('NATOM_FORM','Jumlah atom di form berbeda dengan output.','blocking');
  const volumes=qc.map(q=>q.volume).filter(Number.isFinite);
  if(volumes.length>1&&!volumes.every(v=>near(v,volumes[0])))warn('VOLUME_MISMATCH','Volume sel berbeda; kemungkinan struktur tidak konsisten.','blocking');
  const alat=qc.map(q=>q.alat).filter(Number.isFinite);
  if(alat.length>1&&!alat.every(v=>near(v,alat[0])))warn('ALAT_MISMATCH','Parameter kisi alat berbeda.','blocking');
  if(mode==='k'){
   for(const field of ['wfc','rho']){
    const vv=qc.map(q=>q[field]).filter(Number.isFinite);
    if(vv.length!==qc.length)warn(field.toUpperCase()+'_UNKNOWN',`Tidak semua output memuat ${field}.`);
    if(vv.length>1&&!vv.every(v=>near(v,vv[0])))warn(field.toUpperCase()+'_MISMATCH',`${field} berubah selama uji k-point.`,'blocking');
   }
   if(rows.some(r=>!/^\d+\s*[x× ]\s*\d+\s*[x× ]\s*\d+$/.test(String(r.mesh).trim())))warn('MESH_UNKNOWN','Salah satu mesh tidak valid/masih kosong.','blocking');
  } else if(mode==='rho'){
   const vv=qc.map(q=>q.wfc).filter(Number.isFinite);
   if(vv.length!==qc.length)warn('WFC_UNKNOWN','ecutwfc tidak tercetak di semua output.');
   if(vv.length>1&&!vv.every(v=>near(v,vv[0])))warn('WFC_MISMATCH','ecutwfc berubah selama uji ecutrho.','blocking');
  }else if(mode==='wfc'){
   const ratios=qc.map(q=>Number.isFinite(q.wfc)&&Number.isFinite(q.rho)&&q.wfc>0?q.rho/q.wfc:null);
   if(ratios.some(x=>x===null))warn('RATIO_UNKNOWN','Rasio ecutrho/ecutwfc tidak dapat dipastikan.');
   const rr=ratios.filter(Number.isFinite);
   if(rr.length>1&&!rr.every(v=>near(v,rr[0])))warn('RATIO_MISMATCH','Rasio ecutrho/ecutwfc berubah.','blocking');
  }
  // Cross-check paired input metadata. Pairing by file stem is a convenience, not runtime proof.
  const linked=rows.filter(r=>r.qe&&r.inputMeta);
  if(linked.length&&linked.length!==qc.length)warn('PARTIAL_INPUT_PAIRING','Sebagian output belum memiliki pasangan input yang unik.');
  if(linked.length){
   for(const r of linked){const inp=r.inputMeta,out=r.qe;
    for(const k of ['wfc','rho'])if(Number.isFinite(inp[k])&&Number.isFinite(out[k])&&!near(inp[k],out[k]))warn('INPUT_OUTPUT_'+k.toUpperCase(),`${r.filename}: ${k} pada .in berbeda dari .out.`,'blocking');
    if(Number.isInteger(inp.atoms)&&Number.isInteger(out.atoms)&&inp.atoms!==out.atoms)warn('INPUT_OUTPUT_NAT',`${r.filename}: nat pada .in berbeda dari .out.`,'blocking');
    if(inp.mesh&&out.mesh&&inp.mesh!==out.mesh)warn('INPUT_OUTPUT_MESH',`${r.filename}: K_POINTS pada .in berbeda dari mesh yang tercetak di .out.`,'blocking');
   }
   const stable=['nspin','occupations','smearing','degauss','input_dft'];
   for(const field of stable){const vals=linked.map(r=>r.inputMeta[field]).filter(v=>v!==null&&v!==undefined);if(vals.length===linked.length&&new Set(vals.map(String)).size>1)warn('INPUT_'+field.toUpperCase()+'_MISMATCH',`${field} pada file input tidak konsisten.`,'blocking');}
   const upf=linked.map(r=>JSON.stringify(r.inputMeta.pseudos?.slice().sort((a,b)=>a.element.localeCompare(b.element))||[]));
   if(upf.some(x=>x==='[]'))warn('UPF_NOT_PARSED','Nama UPF tidak ditemukan di sebagian input.');
   else if(new Set(upf).size>1)warn('UPF_MISMATCH','Pemetaan pseudopotensial berbeda antar input.','blocking');
  }
  // Filename/method alone never proves structure, UPF, occupations, or functional are equal.
  warn('UNVERIFIED_SETTINGS','Kesamaan UPF, XC functional, occupations, spin, dan geometri belum dapat dibuktikan dari metadata terbatas.');
 }
 return {status:issues.some(x=>x.level==='blocking')?'BLOCKED':issues.length?'REVIEW_REQUIRED':'STATIC_CHECKS_ONLY',issues,outputs:qc.length,points:rows.length};
}
