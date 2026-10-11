#!/bin/bash
#SBATCH --job-name=siesta_test
#SBATCH --nodes=1
#SBATCH --ntasks=8
#SBATCH --time=04:00:00
#SBATCH --output=slurm-%j.log
set -euo pipefail
# module load SIESTA_MODULE  # replace with your cluster module
command -v siesta
srun siesta < run.fdf > run.out
