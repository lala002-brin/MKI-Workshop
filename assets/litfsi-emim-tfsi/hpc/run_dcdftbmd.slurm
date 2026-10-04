#!/bin/bash
#SBATCH --job-name=dcdftbmd
#SBATCH --nodes=1
#SBATCH --ntasks=32
#SBATCH --time=24:00:00


echo "Starting DC-DFTB-MD simulation"


module load dcdftbmd


dcdftbmd ../dcdftbmd/input.in


echo "Simulation completed"
