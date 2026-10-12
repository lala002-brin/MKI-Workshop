import {matchInputsOutputs} from './qe-input-parser.mjs';
export function previewPairs(inputs,outputs){
 const matched=matchInputsOutputs(inputs,outputs); const rows=[];
 for(const out of outputs){
  const match=matched.matches.find(m=>m.output===out); const inp=match?.input||null;
  const candidates=inputs.filter(x=>x.filename.toLowerCase().replace(/\.(in|pwi|txt)$/,'')===out.filename.toLowerCase().replace(/\.(out|log|txt)$/,''));
  const issues=[];
  if(!inp) issues.push(candidates.length>1?'Ambigu: beberapa input cocok':'Input belum dipasangkan');
  if(inp){
   if(inp.mesh && out.qe?.mesh && inp.mesh!==out.qe.mesh)issues.push('Mesh berbeda');
   for(const k of ['wfc','rho'])if(Number.isFinite(inp[k])&&Number.isFinite(out.qe?.[k])&&Math.abs(inp[k]-out.qe[k])>1e-4)issues.push(k+' berbeda');
   if(Number.isInteger(inp.atoms)&&Number.isInteger(out.qe?.atoms)&&inp.atoms!==out.qe.atoms)issues.push('nat berbeda');
   if(inp.calculation&&inp.calculation!=='scf')issues.push('Bukan SCF tunggal');
  }
  if(!out.qe?.jobDone||!out.qe?.convergence)issues.push('SCF / JOB DONE belum terbukti');
  const blocked=issues.some(i=>i.includes('berbeda')||i.startsWith('Ambigu'));
  rows.push({filename:out.filename,input:inp?.filename??null,mesh:inp?.mesh??out.mesh??null,wfc:inp?.wfc??out.wfc??null,rho:inp?.rho??out.rho??null,atoms:inp?.atoms??out.qe?.atoms??null,status:blocked?'BLOCKED':issues.length?'REVIEW_REQUIRED':'PAIRED_CHECKS_PASS',issues});
 }
 return {rows,paired:matched.matches.length,warnings:matched.warnings};
}
