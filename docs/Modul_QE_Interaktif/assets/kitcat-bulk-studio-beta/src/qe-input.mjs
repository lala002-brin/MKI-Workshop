/** KITCAT v0.7 pw.x input generator, deliberately scoped to scf and relax.
 * Does not guarantee physical convergence or that local UPF files exist.
 */
import {createStructure,StructureError} from './structure-core.mjs';
const fail=(c,m)=>{throw new StructureError(c,m)};
const finitePositive=(n,label)=>{if(typeof n!=='number'||!Number.isFinite(n)||n<=0)fail('INVALID_PARAMETER',`${label} must be finite and > 0`);return n};
const integer=(n,label,min=1)=>{if(!Number.isSafeInteger(n)||n<min)fail('INVALID_PARAMETER',`${label} must be integer >= ${min}`);return n};
const qeStr=(v,label)=>{if(typeof v!=='string'||!v||!(/^[A-Za-z0-9_.-]+$/).test(v))fail('INVALID_STRING',`${label} must use A-Z, a-z, 0-9, underscore, dot or dash`);return `'${v.replaceAll("'","''")}'`};
const fmt=n=>Number(n).toPrecision(14).replace(/\.?0+$/,'');
const elementFromLabel=label=>{const m=/^([A-Z][a-z]?)/.exec(label);return m?.[1]};
export function generatePWInput(structure,config={}){
 const s=createStructure(structure);
 const calculation=config.calculation??'scf';if(!['scf','relax'].includes(calculation))fail('UNSUPPORTED_CALCULATION','Only scf/relax supported in v0.7');
 const type=config.modelType??'bulk';if(!['bulk','slab','molecule','cluster'].includes(type))fail('UNSUPPORTED_MODEL','Use supported model type');
 const pseudos=config.pseudos;if(!pseudos||typeof pseudos!=='object')fail('PSEUDO_REQUIRED','Provide explicit species-to-UPF metadata');
 const species=[...new Set(s.atoms.map(a=>a.speciesLabel||a.element))];
 const specLines=species.map(label=>{const p=pseudos[label];if(!/^[A-Z][a-z]?[A-Za-z0-9_]*$/.test(label)||elementFromLabel(label)!==s.atoms.find(a=>(a.speciesLabel||a.element)===label).element)fail('SPECIES_MISMATCH',`Invalid QE species ${label}`);if(!p||typeof p!=='object')fail('PSEUDO_REQUIRED',`Missing metadata for ${label}`);finitePositive(p.mass,`mass of ${label}`);return `${label} ${fmt(p.mass)} ${qeStr(p.file,`UPF filename ${label}`).slice(1,-1)}`});
 const cutoff=finitePositive(config.ecutwfc,'ecutwfc');const rho=finitePositive(config.ecutrho,'ecutrho');if(rho<cutoff)fail('CUTOFF_RATIO','ecutrho must be >= ecutwfc');
 const conv=finitePositive(config.conv_thr??1e-8,'conv_thr');
 const nspin=config.nspin??1;if(![1,2].includes(nspin))fail('UNSUPPORTED_SPIN','v0.7 supports only nspin=1 or 2');
 const mags=config.starting_magnetization??{};
 if(nspin===1&&Object.keys(mags).length)fail('SPIN_CONFLICT','starting_magnetization requires nspin=2');
 if(nspin===2){if(species.some(l=>!Object.hasOwn(mags,l)))fail('SPIN_REQUIRED','Provide explicit starting_magnetization per species');for(const l of species){const x=mags[l];if(typeof x!=='number'||!Number.isFinite(x)||x < -1||x > 1)fail('INVALID_MAGNETIZATION',`${l} must be in [-1,1] (QE fraction convention)`)} }
 const k=config.kpoints;if(!Array.isArray(k)||k.length!==3)fail('KPOINTS_REQUIRED','Provide three Monkhorst-Pack grid integers');k.forEach((x,i)=>integer(x,`kpoint ${i}`));
 const shift=config.kshift??[0,0,0];if(!Array.isArray(shift)||shift.length!==3||shift.some(x=>x!==0&&x!==1))fail('INVALID_KSHIFT','K-point shifts must be three 0/1 integers');
 const occupations=config.occupations??'fixed';if(!['fixed','smearing'].includes(occupations))fail('UNSUPPORTED_OCCUPATIONS','Only fixed/smearing occupations supported');
 const linesSystem=[`  ibrav = 0,`,`  nat = ${s.atoms.length},`,`  ntyp = ${species.length},`,`  ecutwfc = ${fmt(cutoff)},`,`  ecutrho = ${fmt(rho)},`,`  nspin = ${nspin},`,`  occupations = '${occupations}',`];
 if(occupations==='smearing'){const smearing=config.smearing??'mv';if(!['gaussian','mp','mv','fd'].includes(smearing))fail('UNSUPPORTED_SMEARING','Unknown smearing');linesSystem.push(`  smearing = '${smearing}',`,`  degauss = ${fmt(finitePositive(config.degauss,'degauss'))},`)}
 if(nspin===2)species.forEach((label,i)=>linesSystem.push(`  starting_magnetization(${i+1}) = ${fmt(mags[label])},`));
 const atoms=s.atoms.map(a=>{const f=a.fixedAxes??[false,false,false];if(f.some(Boolean)&&calculation==='scf')fail('CONSTRAINT_UNUSED','Constraints supplied for SCF; explicitly remove constraints or choose relax');if(f.some(Boolean)&&f.some(x=>!x))fail('CONSTRAINT_MAPPING_REQUIRED','Partial constraints require axis-aware mapping; v0.7 supports fully fixed or fully mobile atoms only');const flags=calculation==='relax'&&f.some(Boolean)?' 0 0 0':calculation==='relax'?' 1 1 1':'';return `${a.speciesLabel||a.element} ${a.fractional.map(fmt).join(' ')}${flags}`});
 const prefix=qeStr(config.prefix??'kitcat','prefix'),outdir=qeStr(config.outdir??'tmp','outdir'),pseudoDir=qeStr(config.pseudo_dir??'pseudo','pseudo_dir');
 const text=[`! KITCAT v0.7 — REVIEW MODEL, PSEUDOS, CUTOFFS, K-POINT CONVERGENCE BEFORE RUNNING`,'&CONTROL',`  calculation = '${calculation}',`,`  prefix = ${prefix},`,`  outdir = ${outdir},`,`  pseudo_dir = ${pseudoDir},`,'/','&SYSTEM',...linesSystem,'/','&ELECTRONS',`  conv_thr = ${fmt(conv)},`,'/',...(calculation==='relax'?['&IONS',`  ion_dynamics = 'bfgs',`,'/']:[]),'ATOMIC_SPECIES',...specLines,'','CELL_PARAMETERS angstrom',...s.lattice.map(r=>r.map(fmt).join(' ')),'','ATOMIC_POSITIONS crystal',...atoms,'','K_POINTS automatic',`${k.join(' ')} ${shift.join(' ')}`,''].join('\n');
 return {text,manifest:{version:'0.7.0',calculation,modelType:type,nat:s.atoms.length,ntyp:species.length,species,validation:'configuration checked; no QE executable or physical convergence validation',warnings:[...(type!=='bulk'?['Non-bulk system modeled with a 3D periodic cell; verify image interactions and electrostatics.']:[]),'UPF files/functional compatibility and pseudopotential cutoff recommendations not verified.','Cutoff and k-point convergence must be tested independently.']}};
}
