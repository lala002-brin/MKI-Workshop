import {createStructure} from '../../src/structure-core.mjs';
import {terminationCandidates} from '../slab-core.mjs';
import {identifyAtomicLayers,applyFrozenBottomLayers,qeGeometryWithConstraints} from '../layer-constraints.mjs';
import {generateValidatedPWInput} from '../../src/qe-validated.mjs';
const $=id=>document.getElementById(id);let report=null;
const fcc=[[0,0,0],[0,.5,.5],[.5,0,.5],[.5,.5,0]];
const bulk=createStructure({lattice:[[5.64,0,0],[0,5.64,0],[0,0,5.64]],atoms:[...fcc.map((f,i)=>({id:`Na-${i}`,element:'Na',fractional:f})),...fcc.map((f,i)=>({id:`Cl-${i}`,element:'Cl',fractional:f.map(x=>(x+.5)%1)}))],metadata:{source:'synthetic NaCl audit only'}});
const cfg=(calculation='relax')=>({calculation,modelType:'slab',prefix:'kitcat_surface_audit',outdir:'tmp',pseudo_dir:'pseudo',pseudos:{Na:{file:'Na.audit.UPF',mass:22.989769},Cl:{file:'Cl.audit.UPF',mass:35.45}},ecutwfc:60,ecutrho:480,conv_thr:1e-8,kpoints:[3,3,1],kshift:[0,0,0],nspin:1,occupations:'fixed'});
function atomicLines(text){const line=text.split('\n');const i=line.findIndex(x=>x.trim()==='ATOMIC_POSITIONS crystal');if(i<0)return [];const end=line.findIndex((x,j)=>j>i&&x.trim()==='K_POINTS automatic');return line.slice(i+1,end<0?undefined:end).map(x=>x.trim()).filter(Boolean)}
const tests=[];function check(name,fn){try{const data=fn();if(data===false)throw Error('Condition false');tests.push({name,status:'PASS',detail:typeof data==='string'?data:'OK'});}catch(e){tests.push({name,status:'FAIL',detail:e.message})}}
function run(){tests.length=0;let slab,unfrozen,frozen,relax,scf;
check('NaCl demo: 8 atom',()=>bulk.atoms.length===8);
check('Konstruksi kandidat NaCl(001)',()=>{const c=terminationCandidates(bulk,{hkl:'001',layers:3,vacuum:15});if(c.length!==6)throw Error(`Kandidat ${c.length}, diharapkan 6`);slab=c[0].structure;return `6 candidate; ${slab.atoms.length} atom`});
check('Lapisan geometris',()=>identifyAtomicLayers(slab,{toleranceAngstrom:.15}).length===6);
check('Pembekuan 1 lapisan bawah',()=>{frozen=applyFrozenBottomLayers(slab,{count:1,toleranceAngstrom:.15});return frozen.frozenAtomCount>0&&frozen.freeAtomCount>0?`${frozen.frozenAtomCount} fixed, ${frozen.freeAtomCount} mobile`:false});
check('Semua atom memiliki constraint fully fixed/free',()=>frozen.structure.atoms.every(a=>a.fixedAxes.every(v=>v===a.fixedAxes[0])));
check('Geometri QE memuat 0 0 0 untuk atom beku',()=>qeGeometryWithConstraints(frozen.structure).split('\n').some(x=>/\s0 0 0$/.test(x)));
check('Geometri QE memuat 1 1 1 untuk atom mobile',()=>qeGeometryWithConstraints(frozen.structure).split('\n').some(x=>/\s1 1 1$/.test(x)));
check('RELAX generator & statis preflight',()=>{relax=generateValidatedPWInput(frozen.structure,cfg('relax'));return `Status ${relax.preflight.status}; ${relax.manifest.nat} atom`});
check('RELAX mengandung &IONS dan ion_dynamics',()=>relax.text.includes('&IONS')&&relax.text.includes('ion_dynamics'));
check('RELAX: flag 0 0 0 dan 1 1 1 konsisten',()=>{const lines=atomicLines(relax.text);const counts={fixed:lines.filter(x=>/\s0 0 0$/.test(x)).length,mobile:lines.filter(x=>/\s1 1 1$/.test(x)).length};if(counts.fixed!==frozen.frozenAtomCount||counts.mobile!==frozen.freeAtomCount)throw Error(JSON.stringify(counts));return JSON.stringify(counts)});
check('SCF ditolak ketika constraints aktif',()=>{try{generateValidatedPWInput(frozen.structure,cfg('scf'));throw Error('SCF tidak ditolak')}catch(e){if(e.message==='SCF tidak ditolak')throw e;return 'Ditolak sesuai desain'}});
check('SCF valid pada slab tanpa atom beku',()=>{unfrozen=applyFrozenBottomLayers(slab,{count:0});scf=generateValidatedPWInput(unfrozen.structure,cfg('scf'));return scf.text.includes("calculation = 'scf'")&&!scf.text.includes('&IONS')});
check('SCF tanpa flag relax',()=>atomicLines(scf.text).every(x=>!/(?:\s[01]){3}$/.test(x)));
check('Cutoff tidak valid ditolak',()=>{try{generateValidatedPWInput(unfrozen.structure,{...cfg('scf'),ecutrho:20});throw Error('CUTOFF TIDAK DITOLAK')}catch(e){if(e.message==='CUTOFF TIDAK DITOLAK')throw e;return 'Ditolak sesuai desain'}});
check('K-point invalid ditolak',()=>{try{generateValidatedPWInput(unfrozen.structure,{...cfg('scf'),kpoints:[3,3,0]});throw Error('KPOINT TIDAK DITOLAK')}catch(e){if(e.message==='KPOINT TIDAK DITOLAK')throw e;return 'Ditolak sesuai desain'}});
report={version:'surface-stabilization-2',date:new Date().toISOString(),summary:{pass:tests.filter(x=>x.status==='PASS').length,fail:tests.filter(x=>x.status==='FAIL').length,total:tests.length},tests:[...tests],limitations:['No pw.x execution','No real UPF file contents supplied; preflight warnings expected','No independent slab validation or convergence','Synthetic NaCl geometry only']};$('result').textContent=`${report.summary.pass}/${report.summary.total} PASS · ${report.summary.fail} FAIL`;$('items').replaceChildren();tests.forEach(t=>{const row=$('items').insertRow();[t.name,t.status,t.detail].forEach((value,i)=>{const cell=row.insertCell();cell.textContent=value;if(i===1)cell.className=t.status==='PASS'?'pass':'fail'})});$('notes').textContent=JSON.stringify({limitations:report.limitations,summary:report.summary},null,2);$('download').disabled=false;
}
$('run').onclick=run;$('download').onclick=()=>{if(!report)return;const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='kitcat-surface-qe-export-audit.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)};
