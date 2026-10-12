import {asePython} from './ase-export.mjs';
import {exportConfigurationManifest} from './configuration-explorer.mjs';
import {createZip} from './batch-zip.mjs';
export function makeBatchFiles(exploration,{representativesOnly=false,pbc=[true,true,false]}={}){
 if(!exploration?.candidates?.length)throw Error('Generate configuration candidates first');
 const candidates=exploration.candidates.filter(c=>c.result && (!representativesOnly||c.representative));
 if(!candidates.length)throw Error('No valid candidates to export');
 const files=[{name:'manifest.json',content:JSON.stringify({...exportConfigurationManifest(exploration,null),batchSelection:{representativesOnly,exportedIndices:candidates.map(c=>c.index),pbc}},null,2)}];
 const directories=[];
 for(const c of candidates){
  const dir=`candidate_${String(c.index+1).padStart(3,'0')}`;directories.push(dir);
  files.push({name:`${dir}/structure.json`,content:JSON.stringify(c.result.structure,null,2)});
  files.push({name:`${dir}/run_ase.py`,content:asePython(c.result.structure,{pbc})});
 }
 const queue=directories.map(s=>`  ${s}`).join('\n');
 files.push({name:'run_ase_array.slurm',content:`#!/bin/bash
#SBATCH --job-name=kitcat-ase
#SBATCH --array=0-${directories.length-1}
#SBATCH --cpus-per-task=1
#SBATCH --time=00:10:00
#SBATCH --output=ase_%A_%a.out
#SBATCH --error=ase_%A_%a.err
set -euo pipefail
cd "$(dirname "$0")"
# Adapt environment to YOUR cluster (example only):
# module load python/3.11
# source /path/to/ase-environment/bin/activate
CANDIDATES=(
${queue}
)
DIR="\${CANDIDATES[\${SLURM_ARRAY_TASK_ID}]}"
python3 "$DIR/run_ase.py"
# NO pw.x runs here. Inspect generated extxyz and prepare QE independently.
`});
 files.push({name:'README.txt',content:`KITCAT Adsorption Studio 0.8 — Batch ASE handoff (GEOMETRY DRAFT)\n\nThis ZIP contains ${candidates.length} valid candidate folders; all attempted candidates (including failures) are recorded in manifest.json.\n\n1. Install ASE in an appropriate Python environment on HPC.\n2. Adapt run_ase_array.slurm to the cluster's Python environment and policies.\n3. Submit with: sbatch run_ase_array.slurm (or execute run_ase.py individually).\n4. Each run writes kitcat_adsorption_ase.extxyz alongside its run_ase.py.\n5. No Quantum ESPRESSO input calculation or relaxation is run by this template.\n\nCAUTION: This is a collection of initial geometry guesses, not an energy ranking. Check atom overlap, cell, PBC, vacuum, pseudopotentials and surface chemistry before DFT.\n`});
 return {files,count:candidates.length};
}
export function makeBatchZip(exploration,options){return createZip(makeBatchFiles(exploration,options).files);}
