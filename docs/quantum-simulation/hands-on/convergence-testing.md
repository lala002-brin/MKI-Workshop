# Convergence Testing

## Overview

In first-principles calculations, the accuracy and reliability of the simulation depend strongly on the computational parameters used during the calculation.

Quantum ESPRESSO uses several numerical parameters that control the accuracy and computational cost of a calculation. These parameters determine how accurately the electronic structure of a material is represented.

The main parameters that require convergence testing include:

- Plane-wave kinetic energy cutoff (`ecutwfc`)
- Charge density cutoff (`ecutrho`)
- k-point sampling
- Smearing parameters for metallic systems

Convergence testing is performed to identify suitable parameters that provide reliable results while maintaining efficient computational resources.

The objective of this process is to ensure that calculated properties remain stable when computational parameters are increased.

---

## Why Convergence Testing is Important

Density Functional Theory (DFT) calculations rely on numerical approximations to solve the Kohn-Sham equations.

The accuracy of the calculation depends on the selected computational parameters. Insufficient parameters may lead to inaccurate results, while excessively large parameters increase computational cost.

Common problems caused by insufficient convergence include:

- Incorrect total energy
- Unstable structural optimization
- Inaccurate electronic properties
- Poor reproducibility of computational results

Therefore, convergence testing provides a balance between:

- Accuracy of scientific results
- Computational efficiency
- Effective utilization of HPC resources

---

## Convergence Parameters in Quantum ESPRESSO

The main convergence parameters in Quantum ESPRESSO are summarized below.

| Parameter | Description |
|---|---|
| `ecutwfc` | Controls the kinetic energy cutoff for wave functions |
| `ecutrho` | Controls the kinetic energy cutoff for charge density |
| k-point mesh | Controls Brillouin zone sampling density |
| Smearing | Controls electron occupation for metallic systems |

---

## General Convergence Workflow

A typical convergence workflow follows these steps:

```text
Select initial parameters
            |
            ↓
Perform SCF calculation
            |
            ↓
Increase computational parameters
            |
            ↓
Compare total energy and properties
            |
            ↓
Select converged parameters
---

# 1. Plane-Wave Cutoff Energy Convergence

## Kinetic Energy Cutoff (`ecutwfc`)

Quantum ESPRESSO represents electronic wave functions using a plane-wave basis set.

The accuracy of this representation depends on the kinetic energy cutoff value (`ecutwfc`). This parameter determines the maximum kinetic energy of plane waves included in the basis set.

In Quantum ESPRESSO, the parameter is defined in the `SYSTEM` section of the input file:

```text
&SYSTEM

ecutwfc = value

/
```

A higher cutoff energy provides a more complete basis set and generally improves calculation accuracy. However, increasing the cutoff also increases the number of plane waves and computational cost.

The relationship between the number of plane waves and cutoff energy can be expressed as:

\[
N_{PW} \propto E_{cut}^{3/2}
\]

where:

- `Npw` represents the number of plane waves
- `Ecut` represents the kinetic energy cutoff

---

## Effect of `ecutwfc` on Calculation Accuracy

The convergence of `ecutwfc` is evaluated by increasing the cutoff value gradually and monitoring changes in calculated properties.

The most common property used for testing is the total energy.

Example:

| Test | `ecutwfc` | Total Energy |
|---|---|---|
| 1 | 30 Ry | -15.234 Ry |
| 2 | 40 Ry | -15.248 Ry |
| 3 | 50 Ry | -15.251 Ry |
| 4 | 60 Ry | -15.252 Ry |

When the difference between consecutive calculations becomes sufficiently small, the cutoff energy can be considered converged.

---

## Recommended Workflow

The typical workflow for `ecutwfc` convergence testing is:

### Step 1: Choose Initial Cutoff

Select an initial cutoff value based on the pseudopotential recommendation.

Example:

```text
ecutwfc = 30 Ry
```

---

### Step 2: Increase Cutoff Systematically

Perform calculations with increasing values:

```text
30 Ry → 40 Ry → 50 Ry → 60 Ry
```

For each calculation, record:

- Total energy
- Energy difference
- Computational time

---

### Step 3: Determine Converged Value

Plot the relationship between cutoff energy and total energy.

Example:

```text
Energy

 |
 |
 |                 ________
 |             ___/
 |         ___/
 |____ ___/
 |
 +----------------------------
      30  40  50  60

          ecutwfc (Ry)
```

The converged cutoff is selected when increasing `ecutwfc` produces negligible changes in energy.

---

## Example Quantum ESPRESSO Input

Example SCF calculation using a converged cutoff:

```text
&CONTROL
calculation = 'scf'
/

&SYSTEM
ecutwfc = 50
/

&ELECTRONS
conv_thr = 1.0d-8
/
```

In this example:

- `ecutwfc = 50 Ry` defines the wave-function cutoff
- `conv_thr` controls the electronic convergence threshold

---

## Practical Considerations on HPC

Cutoff convergence calculations are computationally independent and can be executed efficiently on HPC systems.

Example workflow:

```text
ecutwfc = 30 Ry
        |
        └── SCF calculation


ecutwfc = 40 Ry
        |
        └── SCF calculation


ecutwfc = 50 Ry
        |
        └── SCF calculation
```

Each calculation can be submitted as a separate HPC job, allowing parallel evaluation of different cutoff values.

---

## Key Points

- `ecutwfc` controls the completeness of the plane-wave basis.
- Higher cutoff values improve accuracy but increase computational cost.
- Convergence is achieved when calculated properties become stable.
- The optimal cutoff value depends on the material and pseudopotential used.

---
