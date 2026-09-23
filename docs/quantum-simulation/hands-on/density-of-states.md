# Density of States Calculation

## Overview

Density of States (DOS) analysis describes the number of available electronic states at each energy level.

DOS provides detailed information about the electronic structure of materials, including:

- Contribution of atomic orbitals
- Position of valence and conduction bands
- Band gap characteristics
- Metallic or insulating behavior

In Quantum ESPRESSO, DOS calculation is performed after obtaining a converged and optimized structure.

The general workflow is:

```text
SCF Calculation

        ↓

NSCF Calculation

        ↓

DOS Calculation

        ↓

DOS Visualization
```

---

# Understanding Density of States

The density of states represents the number of electronic states available within a specific energy range.

Mathematically:

\[
DOS(E)=\frac{dN}{dE}
\]

where:

- `DOS(E)` represents the number of states at energy `E`.
- `N` represents the number of electronic states.

The Fermi energy determines the occupation of electronic states.

---

# Importance of DOS Analysis

DOS analysis helps identify:

| Property | Information |
|---|---|
| Band gap | Energy separation between occupied and unoccupied states |
| Metallic behavior | States crossing the Fermi level |
| Orbital contribution | Contribution from atomic orbitals |
| Chemical bonding | Interaction between elements |

DOS is commonly combined with band structure analysis to understand electronic properties.

---

# DOS Calculation Workflow in Quantum ESPRESSO

## Step 1: SCF Calculation

The SCF calculation generates the ground-state electron density.

Example:

```text
calculation = 'scf'
```

Output:

- Charge density
- Wave functions
- Total energy

---

## Step 2: NSCF Calculation

The NSCF calculation uses a denser k-point mesh to obtain accurate electronic states.

Example:

```text
calculation = 'nscf'
```

For DOS calculations, a dense uniform k-point grid is recommended.

Example:

```text
K_POINTS automatic

12 12 12 0 0 0
```

---

## Step 3: DOS Calculation

Quantum ESPRESSO uses `dos.x` to calculate the density of states.

Example input:

```text
&DOS

prefix = 'material'

fildos = 'material.dos'

/

```

Run:

```bash
dos.x < dos.in > dos.out
```

---

# Projected Density of States (PDOS)

Projected Density of States separates the contribution of specific atoms or orbitals.

PDOS can identify:

- Which atoms contribute to electronic states
- Orbital hybridization
- Chemical bonding characteristics

Quantum ESPRESSO uses `projwfc.x` for PDOS calculation.

Example:

```text
&PROJWFC

prefix = 'material'

filpdos = 'material'

/

```

Run:

```bash
projwfc.x < proj.in > proj.out
```

---

# DOS Calculation Parameters

Important parameters:

| Parameter | Function |
|---|---|
| `prefix` | Name of calculation system |
| `fildos` | Output DOS file |
| `filpdos` | Output projected DOS file |
| k-point density | Controls DOS accuracy |

A denser k-point mesh generally produces smoother DOS curves.

---

# DOS Calculation on HPC

DOS calculations can require significant computational resources, especially for complex materials.

Example workflow:

```text
Optimized Structure

        ↓

SCF Calculation

        ↓

Dense NSCF Calculation

        ↓

DOS / PDOS Calculation

        ↓

Electronic Analysis
```

Example SLURM script:

```bash
#!/bin/bash

#SBATCH --job-name=dos

#SBATCH --nodes=1

#SBATCH --ntasks=16

#SBATCH --time=01:00:00


module load quantum-espresso

dos.x < dos.in > dos.out
```

Submit:

```bash
sbatch dos.slurm
```

---

# DOS Visualization

The DOS output can be visualized using:

- Python matplotlib
- Grace
- Origin
- Quantum ESPRESSO plotting tools

A typical DOS plot contains:

- Energy axis
- DOS intensity
- Fermi energy reference

Example interpretation:

| DOS Feature | Meaning |
|---|---|
| DOS at Fermi level | Metallic behavior |
| Zero DOS region | Band gap |
| Sharp peaks | Localized electronic states |

---

# Hands-on Exercise

Calculate DOS for a silicon crystal.

## Tasks

1. Use the optimized structure from geometry optimization.
2. Perform SCF calculation.
3. Run dense NSCF calculation.
4. Calculate DOS.
5. Visualize the DOS curve.

Expected output:

- Total DOS plot
- Band gap estimation
- Electronic structure interpretation

---

# Summary

Density of States analysis provides insight into the electronic properties of materials.

The DOS workflow requires:

- Converged calculation parameters
- Optimized crystal structure
- Dense k-point sampling

Combined with band structure analysis, DOS provides a complete understanding of electronic behavior.
