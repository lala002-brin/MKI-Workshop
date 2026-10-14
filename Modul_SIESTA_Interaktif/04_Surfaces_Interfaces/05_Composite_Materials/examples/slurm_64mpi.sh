#SBATCH --ntasks=64
mpirun -np 64 siesta < input.fdf > output.out
