import {cart,checkSlab} from './adsorption-core.mjs';
import {createZip} from './batch-zip.mjs';
import {exportConfigurationManifest} from './configuration-explorer.mjs';
const allowed=/^[A-Za-z0-9][A-Za-z0-9_.+-]*\.upf$/i;
const finitePositive=(v,label)=>{const n=Number(v);if(!Number.isFinite(n)||n<=0)throw Error(label+' harus angka positif');return n;};
const symbolPattern=/^[A-Z][a-z]?$/;
const prefixPattern=/^[A-Za-z][A-Za-z0-9_-]{0,35}$/;
const masses={H:1.00794,C:12.011,N:14.0067,O:15.999,Na:22.98976928,Cl:35.45,S:32.06,Fe:55.845,Si:28.085,Ti:47.867,Ag:107.8682,Au:196.96657,Pt:195.084,Cu:63.546,Ni:58.6934,Zn:65.38,Al:26.9815385,Mg:24.305,P:30.973762,K:39.0983,Ca:40.078,F:18.998403};
const fixedMask=a=>{
 if(Array.isArray(a.fixedAxes)&&a.fixedAxes.length===3)return a.fixedAxes.map(x=>x?0:1);
 if(Array.isArray(a.selectiveDynamics)&&a.selectiveDynamics.length===3)return a.selectiveDynamics.map(x=>x?1:0);
 return [1,1,1];
};
export function inspectQEOptions(s,settings){
 checkSlab(s);const calculation=settings?.calculation;
 if(!['scf','relax'].includes(calculation))throw Error('calculation harus scf atau relax');
 const ecutwfc=finitePositive(settings.ecutwfc,'ecutwfc'),ecutrho=finitePositive(settings.ecutrho,'ecutrho');
 if(ecutrho<ecutwfc)throw Error('ecutrho tidak boleh lebih kecil dari ecutwfc');
 const k=settings.kpoints;
 if(!Array.isArray(k)||k.length!==3||!k.every(n=>Number.isInteger(Number(n))&&Number(n)>=1&&Number(n)<=60))throw Error('K-point harus tiga bilangan bulat 1–60');
 if(!prefixPattern.test(settings.prefix||''))throw Error('Prefix harus dimulai huruf dan menggunakan huruf, angka, _ atau -');
 const species=[...new Set(s.atoms.map(x=>x.element))];
 for(const el of species){
  if(!symbolPattern.test(el)||!(el in masses))throw Error('Unsur '+el+' belum memiliki massa yang tervalidasi di generator; jangan gunakan massa tebakan');
  const file=settings.upf?.[el];if(typeof file!=='string'||!allowed.test(file)||file.includes('..'))throw Error('UPF '+el+' wajib berupa nama file .upf saja (bukan path)');
 }
 if(s.atoms.length>3000)throw Error('Draft QE dibatasi maksimal 3000 atom untuk mencegah ekspor terlalu besar');
 const fixed=s.atoms.filter(a=>fixedMask(a).some(x=>x===0)).length;
 if(calculation==='scf'&&fixed)throw Error('SCF dengan constraints aktif ditolak sesuai kebijakan Studio; gunakan relax atau lepas constraints');
 const warnings=['Pseudopotensial UPF belum dimuat/diverifikasi, hanya nama filenya diperiksa.','Cutoff, k-point, smearing, spin, muatan, vakum, dan adsorpsi belum diuji konvergensinya.','QE pw.x belum dijalankan; input ini DRAFT untuk pemeriksaan HPC.'];
 if(Number(k[2])>1)warnings.push('Untuk banyak slab, mesh k_z=1 lazim dipakai; periksa pilihan Anda.');
 return {species,ecutwfc,ecutrho,k:k.map(Number),fixed,warnings};
}
export function generateQEInput(s,settings){
 const p=inspectQEOptions(s,settings),calculation=settings.calculation;
 const prefix=settings.prefix;
 const lines=[`! KITCAT Adsorption Studio 0.9 QE INPUT DRAFT — inspect on HPC before any execution`,
 `&CONTROL`, `  calculation = '${calculation}'`, `  prefix = '${prefix}'`, `  pseudo_dir = '../pseudo'`, `  outdir = './tmp'`, `  tstress = .true.`, `  tprnfor = .true.`, `/`,
 `&SYSTEM`, `  ibrav = 0`, `  nat = ${s.atoms.length}`, `  ntyp = ${p.species.length}`, `  ecutwfc = ${p.ecutwfc}`, `  ecutrho = ${p.ecutrho}`, `  occupations = 'smearing'`, `  smearing = 'gaussian'`, `  degauss = 0.02`, `/`,
 `&ELECTRONS`, `  conv_thr = 1.0d-8`, `  mixing_beta = 0.3`, `/`];
 if(calculation==='relax')lines.push('&IONS',`  ion_dynamics = 'bfgs'`,'/');
 lines.push('ATOMIC_SPECIES');for(const el of p.species)lines.push(`  ${el} ${masses[el].toFixed(6)} ${settings.upf[el]}`);
 lines.push('CELL_PARAMETERS angstrom',...s.lattice.map(r=>'  '+r.map(x=>Number(x).toFixed(10)).join(' ')),'ATOMIC_POSITIONS angstrom');
 for(const a of s.atoms){const xyz=cart(a.fractional,s.lattice).map(x=>Number(x).toFixed(10));const mask=fixedMask(a);lines.push(`  ${a.element} ${xyz.join(' ')}${calculation==='relax'?' '+mask.join(' '):''}`);}
 lines.push('K_POINTS automatic',`  ${p.k.join(' ')} 0 0 0`,'');
 return {text:lines.join('\n'),warnings:p.warnings,species:p.species,atomCount:s.atoms.length,calculation};
}
export function buildQEBatchFiles(exploration,settings,{representativesOnly=false}={}){
 if(!exploration?.candidates?.length)throw Error('Jalankan Configuration Explorer terlebih dahulu');
 const selected=exploration.candidates.filter(c=>c.result&&(!representativesOnly||c.representative));
 if(!selected.length)throw Error('Tidak ada kandidat valid untuk batch QE');
 if(selected.length>200)throw Error('Batasi ekspor batch hingga 200 kandidat');
 const list=selected.map((c,i)=>{
  const prefix=`kitcat_${String(c.index+1).padStart(3,'0')}`;
  const generated=generateQEInput(c.result.structure,{...settings,prefix});
  return {c,dir:`candidate_${String(i+1).padStart(3,'0')}`,prefix,generated};
 });
 const files=[{name:'manifest.json',content:JSON.stringify({...exportConfigurationManifest(exploration,null),qeBatch:{status:'DRAFT_NOT_EXECUTED',calculation:settings.calculation,representativesOnly,generated:list.map(({c,dir,generated})=>({candidateIndex:c.index,dir,nat:generated.atomCount,species:generated.species,warnings:generated.warnings}))}},null,2)}];
 for(const {c,dir,generated} of list){files.push({name:`${dir}/structure.json`,content:JSON.stringify(c.result.structure,null,2)});files.push({name:`${dir}/pw.in`,content:generated.text});}
 const names=list.map(x=>`  ${x.dir}`).join('\n');
 files.push({name:'run_qe_array.slurm',content:`#!/bin/bash
#SBATCH --job-name=kitcat-qe-draft
#SBATCH --array=0-${list.length-1}
#SBATCH --cpus-per-task=1
#SBATCH --time=02:00:00
#SBATCH --output=qe_%A_%a.out
#SBATCH --error=qe_%A_%a.err
set -euo pipefail
cd "$(dirname "$0")"
# REVIEW before sbatch: cluster modules, scheduler resources, parallel execution, UPF functional, cutoffs.
# module load quantum-espresso
CANDIDATES=(
${names}
)
DIR="\${CANDIDATES[\${SLURM_ARRAY_TASK_ID}]}"
test -d pseudo || { echo 'ERROR: supply verified UPFs in pseudo/ first'; exit 2; }
command -v pw.x >/dev/null || { echo 'ERROR: pw.x not available'; exit 2; }
mkdir -p "$DIR/tmp"
cd "$DIR"
# Verify all referenced UPF names and input BEFORE running on your HPC.
pw.x -in pw.in > pw.out 2> pw.err
# JOB DONE is not evidence of electronic/ionic convergence.
`});
 files.push({name:'README.txt',content:`KITCAT QE BATCH 0.9 (DRAFT)

${list.length} initial adsorption geometries; no energy ranking. All attempted candidates (including failures) appear in manifest.json.

1. Supply original matching pseudopotentials in pseudo/ at the ZIP root. This ZIP DOES NOT contain UPFs.
2. Inspect candidate_###/pw.in: XC functional, pseudopotential family, ecutwfc, ecutrho, spin, occupations, vacuum, k-points, cell, atom flags and overlaps.
3. Modify run_qe_array.slurm for your HPC before sbatch. This template WILL execute pw.x if submitted; it was not executed by KITCAT.
4. Each pw.in uses pseudo_dir='../pseudo' relative to the candidate directory.
5. Review SCF and ionic convergence separately, not only exit code or JOB DONE.

Scientific limitation: geometry-only starting models, not DFT-optimized structures or adsorption energies.
`});
 return {files,count:list.length,warnings:list.flatMap(x=>x.generated.warnings)};
}
export function makeQEBatchZip(exploration,settings,options){return createZip(buildQEBatchFiles(exploration,settings,options).files);}
