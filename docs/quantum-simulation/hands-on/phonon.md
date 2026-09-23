# Phonon Calculation

## Overview

Phonon calculation is used to study the vibrational properties of materials.

Phonons describe the collective vibrations of atoms in a crystal lattice. These vibrations determine important material properties such as:

- Dynamical stability
- Vibrational modes
- Infrared and Raman activity
- Thermal properties

In Quantum ESPRESSO, phonon calculations are performed using Density Functional Perturbation Theory (DFPT).

The general workflow is:

```text
Optimized Structure

        ↓

SCF Calculation

        ↓

Phonon Calculation (DFPT)

        ↓

Dynamical Matrix

        ↓

Phonon Dispersion
```

---

# Density Functional Perturbation Theory (DFPT)

DFPT calculates the response of a system to small atomic displacements.

Compared with finite displacement methods, DFPT provides an efficient approach because phonon frequencies are obtained directly from the response of the electronic system.

Phonon calculations provide information about:

- Vibrational frequencies
- Atomic displacement patterns
- Force constants
- Dynamical stability

---

# Phonon Calculation Workflow

Before performing phonon calculations, the system should have:

- Optimized crystal structure
- Converged computational parameters
- Stable SCF calculation

The workflow is:

```text
Geometry Optimization

        ↓

SCF Calculation

        ↓

ph.x Calculation

        ↓

q2r.x Processing

        ↓

matdyn.x Calculation

        ↓

Phonon Dispersion Plot
```

---

# Step 1: SCF Calculation

The SCF calculation provides the ground-state electron density.

Example:

```text
calculation = 'scf'
```

The resulting charge density is used for phonon calculations.

---

# Step 2: Phonon Calculation Using ph.x

Quantum ESPRESSO uses `ph.x` to calculate phonon modes.

Example input:

```text
&INPUTPH

prefix = 'material'

outdir = './tmp'

ldisp = .true.

nq1 = 4

nq2 = 4

nq3 = 4

/

```

Important parameters:

| Parameter | Function |
|---|---|
| `prefix` | Calculation name |
| `ldisp` | Enables phonon dispersion calculation |
| `nq1,nq2,nq3` | q-point mesh |

Run:

```bash
ph.x < ph.in > ph.out
```

---

# Step 3: Convert Dynamical Matrix

The dynamical matrix is converted using `q2r.x`.

Input:

```text
&INPUT

fildyn = 'material.dyn'

flfrc = 'material.fc'

/

```

Run:

```bash
q2r.x < q2r.in > q2r.out
```

---

# Step 4: Phonon Dispersion

The phonon dispersion is calculated using `matdyn.x`.

Example:

```text
&INPUT

flfrc = 'material.fc'

asr = 'crystal'

/

```

Run:

```bash
matdyn.x < matdyn.in > matdyn.out
```

---

# Understanding Phonon Results

## Phonon Frequency

The calculated frequencies describe atomic vibrations.

The unit commonly used is:

```text
cm-1
```

---

## Dynamical Stability

A stable structure should have no significant imaginary phonon frequencies.

Example:

| Frequency | Interpretation |
|---|---|
| Positive frequency | Stable vibration |
| Imaginary frequency | Possible structural instability |

---

# Phonon Calculation on HPC

Phonon calculations can be computationally demanding because multiple q-points must be evaluated.

Example workflow:

```text
q-point 1

    ↓

Phonon calculation


q-point 2

    ↓

Phonon calculation


q-point 3

    ↓

Phonon calculation
```

Each q-point calculation can be parallelized on HPC systems.

Example SLURM:

```bash
#!/bin/bash

#SBATCH --job-name=phonon

#SBATCH --nodes=1

#SBATCH --ntasks=32

#SBATCH --time=04:00:00


module load quantum-espresso

ph.x < ph.in > ph.out
```

Submit:

```bash
sbatch phonon.slurm
```

---

# Hands-on Exercise

Calculate phonon properties of a silicon crystal.

Tasks:

1. Use the optimized structure.
2. Perform SCF calculation.
3. Run DFPT phonon calculation.
4. Generate phonon dispersion.
5. Identify possible imaginary modes.

Expected output:

- Phonon frequencies
- Phonon dispersion curve
- Structural stability analysis

---

# Summary

Phonon calculation provides information about atomic vibrations and lattice stability.

Quantum ESPRESSO uses DFPT through:

- `ph.x`
- `q2r.x`
- `matdyn.x`

Phonon analysis is important for understanding:

- Structural stability
- Vibrational properties
- Thermal behavior
- Material design
