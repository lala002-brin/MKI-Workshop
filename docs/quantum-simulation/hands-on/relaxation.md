# Geometry Optimization

## Overview

Geometry optimization is a process to find the most stable atomic structure by minimizing the total energy of a system.

In Density Functional Theory (DFT), atomic positions are optimized by reducing atomic forces until the system reaches equilibrium.

Quantum ESPRESSO provides several optimization methods:

- `relax` for optimizing atomic positions
- `vc-relax` for optimizing atomic positions and lattice parameters

The goal of geometry optimization is to obtain:

- Stable atomic positions
- Minimum total energy
- Reduced atomic forces
- Optimized crystal structure

---

# Relaxation Concept

During optimization, atoms move according to calculated forces.

The calculation follows:

```text
Initial Structure

        ↓

SCF Calculation

        ↓

Calculate Forces

        ↓

Move Atoms

        ↓

Repeat Until Convergence

        ↓

Optimized Structure
```

The optimization stops when forces become smaller than the convergence threshold.

---

# Geometry Optimization in Quantum ESPRESSO

## Relax Calculation

For optimizing atomic positions:

```text
calculation = 'relax'
```

Example:

```text
&CONTROL

calculation = 'relax'

prefix = 'material'

/

&SYSTEM

ecutwfc = 60

ecutrho = 480

/

&ELECTRONS

conv_thr = 1.0d-8

/

&IONS

ion_dynamics = 'bfgs'

/
```

The BFGS algorithm is commonly used because it provides efficient structural optimization.

---

# Variable Cell Relaxation

For optimizing both atomic positions and lattice parameters:

```text
calculation = 'vc-relax'
```

Example:

```text
&CONTROL

calculation = 'vc-relax'

/

&CELL

cell_dynamics = 'bfgs'

/
```

This method is useful for:

- Crystal structure optimization
- Lattice parameter calculation
- Pressure-dependent studies

---

# Important Parameters

| Parameter | Function |
|---|---|
| `calculation` | Defines optimization type |
| `ion_dynamics` | Controls atomic movement |
| `cell_dynamics` | Controls lattice optimization |
| `forc_conv_thr` | Force convergence threshold |
| `press_conv_thr` | Pressure convergence threshold |

Example:

```text
&CONTROL

forc_conv_thr = 1.0d-4

/
```

---

# Geometry Optimization Workflow on HPC

A typical workflow:

```text
Initial Structure

        ↓

SCF Calculation

        ↓

Relax Calculation

        ↓

Check Forces and Energy

        ↓

Final Optimized Structure
```

Example HPC submission:

```bash
sbatch relax.slurm
```

SLURM script:

```bash
#!/bin/bash

#SBATCH --job-name=relax

#SBATCH --nodes=1

#SBATCH --ntasks=16

#SBATCH --time=02:00:00


module load quantum-espresso

pw.x < relax.in > relax.out
```

---

# Result Analysis

After optimization, check:

## Total Energy

The final energy should decrease compared with the initial structure.

Example:

| Structure | Energy |
|---|---|
| Initial | -15.230 Ry |
| Optimized | -15.251 Ry |

---

## Atomic Forces

The final forces should satisfy:

\[
|F| < F_{threshold}
\]

Example:

```text
Final force = 0.0008 Ry/Bohr
```

---

## Optimized Structure

The optimized structure can be used for further calculations:

- Band structure
- Density of states
- Phonon calculation
- Molecular dynamics

---

# Hands-on Exercise

Perform geometry optimization for a silicon crystal.

Tasks:

1. Prepare the initial structure.
2. Perform SCF calculation.
3. Run `relax` calculation.
4. Analyze total energy and forces.
5. Save the optimized structure.

Expected output:

- Relaxed atomic positions
- Converged forces
- Optimized crystal structure

---

# Summary

Geometry optimization is an essential step before calculating material properties.

Quantum ESPRESSO uses relaxation methods to minimize atomic forces and obtain stable structures.

The optimized structure can be used as the starting point for advanced calculations such as electronic, vibrational, and magnetic property analysis.
