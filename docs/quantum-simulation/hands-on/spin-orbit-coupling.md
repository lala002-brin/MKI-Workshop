# Spin-Orbit Coupling Calculation

## Overview

Spin-Orbit Coupling (SOC) is a relativistic effect that describes the interaction between the electron spin and its orbital motion around the nucleus.

SOC becomes important for materials containing heavy elements because relativistic effects become stronger with increasing atomic number.

SOC calculations are commonly required for:

- Heavy elements
- Magnetic materials
- Topological materials
- Materials with strong spin-dependent properties

The general workflow is:

```text
Optimized Structure

        ↓

SCF Calculation

        ↓

SOC Calculation

        ↓

Electronic Structure Analysis
```

---

# Understanding Spin-Orbit Coupling

Electrons have two important properties:

- Orbital angular momentum
- Spin angular momentum

SOC describes the interaction between these two components.

The SOC effect can influence:

- Band splitting
- Magnetic anisotropy
- Electronic band gap
- Topological electronic states

---

# When SOC is Required

SOC effects are usually significant for materials containing heavy atoms.

Examples:

| Material | Important Elements |
|---|---|
| Topological insulators | Bi, Sb, Te |
| Magnetic materials | Fe, Co, Ni |
| Heavy metal compounds | W, Pt, Au |
| Rare-earth materials | Lanthanides |

For light elements, SOC effects may be negligible.

---

# SOC Calculation in Quantum ESPRESSO

SOC calculations require:

- Fully relativistic pseudopotentials
- Spin polarization settings
- Non-collinear magnetism option

The main parameters are defined in the `SYSTEM` section.

Example:

```text
&SYSTEM

noncolin = .true.

lspinorb = .true.

/

```

where:

| Parameter | Function |
|---|---|
| `noncolin` | Enables non-collinear magnetism |
| `lspinorb` | Activates spin-orbit coupling |

---

# Fully Relativistic Pseudopotential

SOC requires pseudopotentials that include relativistic effects.

The pseudopotential should be generated with:

```text
relativistic = fully-relativistic
```

Example:

```text
W.pbe-spn-kjpaw_psl.1.0.0.UPF
```

Using scalar-relativistic pseudopotentials will not correctly describe SOC effects.

---

# Example Quantum ESPRESSO Input

Example SOC SCF calculation:

```text
&CONTROL

calculation = 'scf'

prefix = 'material'

/

&SYSTEM

ecutwfc = 60

ecutrho = 480

noncolin = .true.

lspinorb = .true.

/

&ELECTRONS

conv_thr = 1.0d-8

/
```

---

# SOC Band Structure Workflow

SOC band calculations usually follow:

```text
Relaxed Structure

        ↓

Non-SOC SCF

        ↓

SOC SCF

        ↓

SOC NSCF

        ↓

Band Structure Analysis
```

The results are compared between:

- Without SOC
- With SOC

to identify SOC-induced changes.

---

# HPC Workflow

SOC calculations require higher computational resources because:

- More electronic states are calculated.
- Spin degrees of freedom are included.
- Memory requirements increase.

Example SLURM script:

```bash
#!/bin/bash

#SBATCH --job-name=soc

#SBATCH --nodes=1

#SBATCH --ntasks=32

#SBATCH --time=04:00:00


module load quantum-espresso

pw.x < soc.in > soc.out
```

Submit:

```bash
sbatch soc.slurm
```

---

# Result Analysis

SOC calculations are commonly analyzed using:

## Band Structure

SOC may cause:

- Band splitting
- Band gap modification
- Removal of degeneracy

## Magnetic Properties

SOC affects:

- Magnetic anisotropy
- Spin orientation
- Magnetic energy differences

---

# Hands-on Exercise

Perform SOC calculation for a heavy-element material.

Tasks:

1. Prepare a fully relativistic pseudopotential.
2. Perform SCF calculation without SOC.
3. Perform SOC calculation.
4. Compare band structures.
5. Analyze SOC effects.

Expected output:

- SOC band structure
- Band splitting comparison
- Electronic property analysis

---

# Summary

Spin-Orbit Coupling is an important relativistic effect for materials containing heavy elements.

Quantum ESPRESSO enables SOC calculations using:

- Fully relativistic pseudopotentials
- Non-collinear magnetism
- Spin-orbit interaction parameters

SOC analysis provides deeper understanding of electronic, magnetic, and topological properties of materials.
