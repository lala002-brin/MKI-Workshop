# Molecular Dynamics Simulation

## Overview

Molecular Dynamics (MD) simulation is a computational method used to study the time-dependent behavior of atoms and molecules.

In first-principles molecular dynamics (FPMD), atomic movements are calculated directly from electronic structure calculations using Density Functional Theory (DFT).

Molecular dynamics simulations are used to study:

- Atomic motion
- Thermal behavior
- Structural changes
- Diffusion processes
- Temperature effects

The general workflow is:

```text
Initial Structure

        ↓

SCF Calculation

        ↓

Molecular Dynamics Simulation

        ↓

Trajectory Analysis

        ↓

Material Property Analysis
```

---

# Basic Concept of Molecular Dynamics

Molecular dynamics simulations describe atomic motion based on Newton's equation of motion:

\[
F = ma
\]

where:

- `F` is atomic force
- `m` is atomic mass
- `a` is acceleration

In each simulation step:

```text
Calculate Forces

        ↓

Update Atomic Positions

        ↓

Update Atomic Velocities

        ↓

Repeat for Next Time Step
```

---

# First-Principles Molecular Dynamics

First-principles molecular dynamics combines:

- Density Functional Theory
- Classical equations of motion

The electronic structure calculation provides atomic forces, which are used to update atomic positions.

Advantages:

- Accurate atomic interactions
- No empirical potential required
- Suitable for complex materials

Limitations:

- High computational cost
- Limited simulation time
- Requires HPC resources

---

# Molecular Dynamics in Quantum ESPRESSO

Quantum ESPRESSO performs molecular dynamics using:

```text
calculation = 'md'
```

or:

```text
calculation = 'vc-md'
```

for variable cell molecular dynamics.

---

# Important MD Parameters

Main parameters are defined in the `CONTROL` and `IONS` sections.

| Parameter | Function |
|---|---|
| `calculation` | Defines MD calculation type |
| `dt` | Time step |
| `nstep` | Number of MD steps |
| `ion_temperature` | Temperature control method |
| `tempw` | Target temperature |

---

# Example Quantum ESPRESSO Input

Example molecular dynamics calculation:

```text
&CONTROL

calculation = 'md'

prefix = 'material'

nstep = 500

/

&SYSTEM

ecutwfc = 60

ecutrho = 480

/

&ELECTRONS

conv_thr = 1.0d-8

/

&IONS

ion_dynamics = 'verlet'

ion_temperature = 'rescaling'

tempw = 300

/
```

This example performs MD simulation at approximately:

```text
Temperature = 300 K
```

---

# Ensemble in Molecular Dynamics

Different ensembles can be used depending on simulation objectives.

| Ensemble | Condition | Application |
|---|---|---|
| NVE | Constant energy | Energy conservation |
| NVT | Constant temperature | Thermal properties |
| NPT | Constant pressure and temperature | Structural studies |

Commonly used for materials simulation:

```text
NVT ensemble
```

because temperature can be controlled during simulation.

---

# MD Workflow on HPC

Molecular dynamics requires many sequential calculations, making HPC resources important.

Typical workflow:

```text
Prepare Structure

        ↓

Initial SCF Calculation

        ↓

Run MD Simulation

        ↓

Save Atomic Trajectory

        ↓

Analyze Structure Evolution
```

Example SLURM script:

```bash
#!/bin/bash

#SBATCH --job-name=md

#SBATCH --nodes=1

#SBATCH --ntasks=64

#SBATCH --time=12:00:00


module load quantum-espresso

pw.x < md.in > md.out
```

Submit:

```bash
sbatch md.slurm
```

---

# Trajectory Analysis

MD simulations generate atomic trajectories containing atomic positions at every time step.

The trajectory can be analyzed to obtain:

## Mean Square Displacement (MSD)

Used to study diffusion behavior.

## Radial Distribution Function (RDF)

Used to analyze atomic arrangement.

## Structural Evolution

Used to observe:

- Bond changes
- Phase transitions
- Atomic rearrangement

---

# Hands-on Exercise

Perform molecular dynamics simulation for a simple material system.

Tasks:

1. Prepare optimized structure.
2. Perform initial SCF calculation.
3. Run NVT molecular dynamics simulation.
4. Analyze atomic trajectory.
5. Calculate structural properties.

Expected output:

- Atomic trajectory file
- Temperature evolution
- Structural analysis results

---

# Summary

Molecular Dynamics simulation provides insight into the time-dependent behavior of materials.

First-principles MD combines DFT calculations with atomic motion simulation to study:

- Thermal properties
- Structural changes
- Atomic diffusion
- Dynamic behavior of materials

Due to its computational cost, HPC resources are essential for performing large-scale molecular dynamics simulations.
