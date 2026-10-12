/** QE runtime evidence parser. Does not infer convergence merely from JOB DONE. */
export function parsePWRuntime(log) {
 if (typeof log !== 'string') throw new TypeError('pw.x output must be text');
 const done=/^\s*JOB DONE\./mi.test(log);
 const energyMatches=[...log.matchAll(/^\s*!\s+total energy\s*=\s*([-+\d.]+(?:[EeDd][-+]?\d+)?)\s+Ry\b/gmi)];
 const last=energyMatches.at(-1);
 const energyRy=last?Number(last[1].replace(/[dD]/g,'E')):null;
 const scfConverged=/^\s*convergence has been achieved\b/mi.test(log);
 const scfNotConverged=/^\s*convergence NOT achieved\b/mi.test(log);
 const errorBlock=/^\s*Error in routine\b/mi.test(log)||/^\s*%%%%%%%%%/m.test(log);
 const cpuTime=/^\s*PWSCF\s*:\s*.*?CPU.*?WALL/i.test(log);
 const electronicStatus=scfNotConverged?'not_converged':scfConverged?'converged':'not_verified';
 return {jobDone:done,energyRy:Number.isFinite(energyRy)?energyRy:null,energyEV:Number.isFinite(energyRy)?energyRy*13.605693122994:null,electronicStatus,errorDetected:errorBlock,summary:!done?'not_complete':errorBlock?'error':electronicStatus==='not_verified'?'requires_review':electronicStatus==='not_converged'?'failed_scf':'completed_with_scf_convergence',hasTiming:cpuTime};
}
