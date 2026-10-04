#!/bin/bash


PREFIX=$1
PROGRAM=$2


if [ -z "$PREFIX" ] || [ -z "$PROGRAM" ]; then

    echo "Usage:"
    echo "bash submit_post.sh <prefix> <program>"

    echo ""
    echo "Example:"
    echo "bash submit_post.sh graphene_dos dos.x"

    exit 1

fi



cat <<END > ${PREFIX}.job

#!/bin/bash

#SBATCH --partition=short
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=32
#SBATCH --mem=32GB
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
# Run Post Processing
# --------------------------------------------------


INPUT_FILE="../input/${PREFIX}.in"

OUTPUT_FILE="../output/${PREFIX}.out"


mpirun -np \${SLURM_NTASKS} \

\${PROGRAM} -input \${INPUT_FILE} > \${OUTPUT_FILE}


END



sbatch ${PREFIX}.job


rm ${PREFIX}.job
