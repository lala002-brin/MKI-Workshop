# Band Structure Calculation

## Overview

Band structure calculation is used to analyze the electronic properties of materials by showing the relationship between electron energy levels and crystal momentum.

The band structure provides important information about:

- Metallic or insulating behavior
- Band gap
- Valence band and conduction band characteristics
- Electronic dispersion

In Quantum ESPRESSO, band structure calculations are performed after obtaining a converged and optimized crystal structure.

The general workflow is:

```text
SCF Calculation

        ↓

NSCF Calculation

        ↓

Band Calculation

        ↓

Band Structure Plot
```

---

# From Relaxed Structure to Band Calculation

Before calculating the band structure, the system should have:

- Optimized atomic positions
- Converged computational parameters
- Suitable k-point sampling

The recommended workflow is:

```text
Initial Structure

        ↓

Geometry Optimization

        ↓

SCF Calculation

        ↓

NSCF Calculation

        ↓

Band Structure Calculation
```

The optimized structure from the relaxation step is used as the input for electronic structure analysis.

---

# Electronic Band Concept

In crystalline materials, electrons occupy energy states that form electronic bands.

The two important regions are:

| Feature | Description |
|---|---|
| Valence Band | Highest occupied electronic states |
| Conduction Band | Lowest unoccupied electronic states |
| Band Gap | Energy difference between valence and conduction bands |
| Fermi Level | Energy level separating occupied and unoccupied states |

Based on the band structure, materials can be classified as:

| Material Type | Characteristic |
|---|---|
| Metal | Bands cross the Fermi level |
| Semiconductor | Small band gap exists |
| Insulator | Large band gap exists |

---

# k-point Path in Brillouin Zone

Band structure calculations require a special k-point path connecting high-symmetry points in the Brillouin zone.

Example path:

```text
Γ → X → W → K → Γ
```

Unlike SCF calculations that use uniform k-point meshes, band calculations use specific paths.

Example:

```text
K_POINTS crystal_b

5

0.000 0.000 0.000 20 ! Gamma

0.500 0.000 0.500 20 ! X

0.500 0.250 0.750 20 ! W

0.375 0.375 0.750 20 ! K

0.000 0.000 0.000 20 ! Gamma
```

---

# Quantum ESPRESSO Band Workflow

## Step 1: SCF Calculation

The SCF calculation determines the ground-state electron density.

Example:

```text
calculation = 'scf'
```

Output:

```text
charge density
wave functions
total energy
```

---

## Step 2: NSCF Calculation

The NSCF calculation calculates electronic states along the required k-point path.

Example:

```text
calculation = 'nscf'
```

The NSCF calculation uses:

- Optimized structure
- Converged cutoff parameters
- Dense k-point path

---

## Step 3: Band Calculation

The band calculation extracts eigenvalues along the k-point path.

Example:

```text
calculation = 'bands'
```

---

# Example Quantum ESPRESSO Input

## NSCF Input

```text
&CONTROL

calculation = 'nscf'

prefix = 'material'

/

&SYSTEM

ecutwfc = 60

ecutrho = 480

nbnd = 20

/

&ELECTRONS

conv_thr = 1.0d-8

/
```

---

## Band Input

```text
&CONTROL

calculation = 'bands'

prefix = 'material'

/

&SYSTEM

nbnd = 20

/
```

---

# Band Structure Calculation on HPC

Band calculations are suitable for HPC because electronic states can require significant computational resources.

Example SLURM submission:

```bash
#!/bin/bash

#SBATCH --job-name=band

#SBATCH --nodes=1

#SBATCH --ntasks=32

#SBATCH --time=02:00:00


module load quantum-espresso

pw.x < bands.in > bands.out
```

Submit:

```bash
sbatch band.slurm
```

---

# Band Structure Visualization

The output from Quantum ESPRESSO must be processed before visualization.

Common tools:

- `bands.x`
- `plotband.x`
- Python visualization tools
- XCrySDen

The final plot shows:

- Energy axis
- High-symmetry k-points
- Band dispersion

---

# Hands-on Exercise

Calculate the electronic band structure of a silicon crystal.

## Tasks

1. Use the optimized structure from geometry optimization.
2. Perform SCF calculation.
3. Generate NSCF calculation along high-symmetry paths.
4. Run band calculation.
5. Visualize the band structure.

Expected output:

- Band structure plot
- Identification of band gap
- Electronic behavior classification

---

# Summary

Band structure calculation provides insight into the electronic properties of materials.

The workflow requires:

- Converged computational parameters
- Optimized crystal structure
- Appropriate k-point path

The calculated band structure can be used to analyze electronic properties before further studies such as density of states, transport, and optical calculations.
