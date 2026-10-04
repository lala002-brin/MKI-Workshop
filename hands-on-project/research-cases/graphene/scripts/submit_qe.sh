#!/bin/bash


PREFIX=$1


if [ -z "$PREFIX" ]; then

    echo "Usage: bash submit_qe.sh <input_prefix>"

    echo "Example: bash submit_qe.sh graphene_scf"

    exit 1

fi



cat <<END > ${PREFIX}.job

#!/bin/bash

#SBATCH --partition=short
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=64
#SBATCH --mem=64GB
#SBATCH --job-name=${PREFIX}
#SBATCH --output=${PREFIX}.out
#SBATCH --error=${PREFIX}.err


# --------------------------------------------------
# Environment
# --------------------------------------------------

ulimit -s unlimited


module purge

module load gcc/12.2.0

module load openmpi4/4.1.4

module load materials/qe/7.2-openmpi



# --------------------------------------------------
# Run Quantum ESPRESSO
# --------------------------------------------------


INPUT_FILE="../input/${PREFIX}.in"

OUTPUT_FILE="../output/${PREFIX}.out"


mpirun -np \${SLURM_NTASKS} \

pw.x -input \${INPUT_FILE} > \${OUTPUT_FILE}


END



sbatch ${PREFIX}.job


rm ${PREFIX}.job
