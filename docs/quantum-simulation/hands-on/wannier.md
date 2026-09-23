# Wannier Function Calculation

## Overview

Wannier function is a method used to transform delocalized electronic states from Bloch wave functions into localized orbitals in real space.

Wannier functions are widely used for advanced electronic structure analysis, including:

- Electronic band interpolation
- Transport calculations
- Tight-binding model construction
- Analysis of localized electronic states

The general workflow is:

```text
SCF Calculation

        ↓

NSCF Calculation

        ↓

Wannierization

        ↓

Localized Orbitals

        ↓

Electronic Property Analysis
```

---

# Bloch Function and Wannier Function

Electronic structure calculations in periodic systems usually produce Bloch wave functions.

Bloch states are extended throughout the crystal:

```text
Bloch Wave Function

delocalized electronic states
```

Wannier transformation converts these states into localized orbitals:

```text
Bloch States

        ↓

Fourier Transformation

        ↓

Wannier Functions

        ↓

Localized Orbitals
```

Localized Wannier functions provide a real-space representation of electronic states.

---

# Why Wannier Functions are Important

Wannier functions are useful for systems requiring accurate electronic interpolation.

Applications include:

| Application | Purpose |
|---|---|
| Band interpolation | Generate dense band structures efficiently |
| Transport calculation | Electron transport modeling |
| Tight-binding model | Construct effective Hamiltonian |
| Topological analysis | Study electronic topology |

---

# Wannier Workflow with Quantum ESPRESSO

A typical workflow combines Quantum ESPRESSO with Wannier90.

```text
Geometry Optimization

        ↓

SCF Calculation

        ↓

NSCF Calculation

        ↓

pw2wannier90.x

        ↓

wannier90.x

        ↓

Wannier Functions
```

---

# Step 1: SCF Calculation

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

# Step 2: NSCF Calculation

Wannier calculations require accurate electronic states.

Example:

```text
calculation = 'nscf'
```

A dense k-point mesh is commonly used:

```text
K_POINTS automatic

8 8 8 0 0 0
```

---

# Step 3: Generate Wannier Input

Quantum ESPRESSO communicates with Wannier90 using:

```text
pw2wannier90.x
```

Example:

```text
&INPUTPP

prefix = 'material'

seedname = 'material'

/

```

Run:

```bash
pw2wannier90.x < pw2wan.in > pw2wan.out
```

---

# Step 4: Wannierization

Wannier90 generates localized orbitals.

Example input:

```text
num_wann = 8

num_iter = 100
```

Important parameters:

| Parameter | Function |
|---|---|
| `num_wann` | Number of Wannier functions |
| `num_iter` | Maximum optimization iterations |
| `dis_win` | Outer energy window |
| `dis_froz` | Frozen energy window |

Run:

```bash
wannier90.x -pp material

wannier90.x material
```

---

# HPC Workflow

Wannier calculations are suitable for HPC environments, especially for large systems.

Example workflow:

```text
NSCF Calculation

        ↓

Generate Projection Files

        ↓

Run Wannier90

        ↓

Analyze Localized Orbitals
```

Example SLURM script:

```bash
#!/bin/bash

#SBATCH --job-name=wannier

#SBATCH --nodes=1

#SBATCH --ntasks=16

#SBATCH --time=02:00:00


module load quantum-espresso
module load wannier90

wannier90.x material
```

Submit:

```bash
sbatch wannier.slurm
```

---

# Result Analysis

Wannier functions can be analyzed through:

## Band Interpolation

Wannier functions can reproduce electronic bands with high accuracy using fewer computational points.

## Localization

The spread value indicates the localization quality of Wannier orbitals.

Smaller spread:

- Better localization
- More accurate tight-binding representation

---

# Hands-on Exercise

Perform Wannier function calculation for a simple material.

Tasks:

1. Perform SCF calculation.
2. Generate NSCF states.
3. Prepare Wannier90 input.
4. Perform Wannierization.
5. Compare interpolated bands with DFT bands.

Expected output:

- Wannier orbitals
- Interpolated band structure
- Localization analysis

---

# Summary

Wannier functions provide a localized representation of electronic states.

The workflow combines:

- Quantum ESPRESSO
- `pw2wannier90.x`
- Wannier90

Wannier analysis enables advanced electronic structure studies including transport, tight-binding modeling, and high-resolution band interpolation.
