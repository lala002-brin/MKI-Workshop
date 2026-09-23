# Convergence Testing

## Overview

In first-principles calculations, the accuracy of the simulation depends strongly on the computational parameters used during the calculation.

Quantum ESPRESSO uses several numerical parameters that control the accuracy and computational cost, including:

- Plane-wave kinetic energy cutoff (`ecutwfc`)
- Charge density cutoff (`ecutrho`)
- k-point sampling
- Smearing parameters for metallic systems

A convergence test is performed to determine suitable parameters that provide reliable results while maintaining reasonable computational cost.

The main objective of convergence testing is to ensure that calculated properties are independent of numerical parameters within an acceptable accuracy range.

---

# Why Convergence Testing is Important

DFT calculations use numerical approximations to solve the Kohn-Sham equations. If computational parameters are too small, the calculation may produce inaccurate results.

Examples of possible errors:

- Incorrect total energy
- Unstable atomic structures
- Poor electronic properties
- Unreliable comparison between materials

On the other hand, excessively large parameters increase computational cost without significant improvement in accuracy.

Therefore, convergence testing provides a balance between:

- Accuracy
- Computational efficiency
- HPC resource usage

---

# 1. Plane-Wave Cutoff Energy Convergence

## Kinetic Energy Cutoff (`ecutwfc`)

Quantum ESPRESSO represents electronic wave functions using plane waves.

The number of plane waves depends on the kinetic energy cutoff:

\[
N_{PW} \propto E_{cut}^{3/2}
\]

Higher cutoff energy provides a more complete basis set but requires more computational resources.

In Quantum ESPRESSO, this parameter is defined as:

```text
ecutwfc = value
Typical convergence workflow:| Calculation | ecutwfc |
| ----------- | ------- |
| Test 1      | 30 Ry   |
| Test 2      | 40 Ry   |
| Test 3      | 50 Ry   |
| Test 4      | 60 Ry   |
The total energy is compared until the change becomes sufficiently small.
2. Charge Density Cutoff (ecutrho)

The charge density requires a higher cutoff compared with wave functions.

In Quantum ESPRESSO:
ecutrho = value
The relationship between ecutrho and ecutwfc depends on the pseudopotential type.

Typical values:

Norm-conserving pseudopotential:
ecutrho ≈ 4 × ecutwfc
Ultrasoft pseudopotential:
ecutrho ≈ 8–12 × ecutwfc

The appropriate value should follow the recommendation of the selected pseudopotential.

3. k-point Convergence

Periodic systems require sampling of the Brillouin zone using k-points.

The density of k-points affects:

Total energy
Electronic structure
Band properties

A denser k-point mesh increases accuracy but also increases computational cost.

Example:

Low density:

4 × 4 × 4

Medium density:

6 × 6 × 6

High density:

8 × 8 × 8

The optimal mesh is selected when increasing k-points no longer significantly changes the calculated properties.

4. Convergence Criteria

A calculation is considered converged when the change in the target property becomes smaller than a predefined tolerance.

Common convergence parameters:

Energy convergence

The difference in total energy between calculations:

$$ \Delta E = E_{n} - E_{n-1} $$

should approach zero.

Force convergence

For structural optimization:

$$ |F| < F_{threshold} $$

is required.

Stress convergence

Important for lattice optimization calculations.

Practical Workflow

A typical convergence testing workflow:

Step 1: Select initial parameters

Choose reasonable starting values:

ecutwfc = 40 Ry

k-point = 4 × 4 × 4
Step 2: Perform calculations

Increase parameters systematically:

40 Ry → 50 Ry → 60 Ry

and:

4 × 4 × 4 → 6 × 6 × 6 → 8 × 8 × 8
Step 3: Analyze results

Compare:

Total energy
Energy difference
Computational time

Select parameters where the result becomes stable.

Quantum ESPRESSO Example

Example SCF input:

&SYSTEM

ecutwfc = 50

ecutrho = 400

/

K_POINTS automatic

6 6 6 0 0 0

This calculation uses:

50 Ry wave-function cutoff
400 Ry charge density cutoff
6×6×6 k-point mesh
Convergence Testing on HPC

Convergence calculations are highly suitable for HPC environments because multiple parameter tests can be performed independently.

Parallel workflow:

ecutwfc = 30 Ry
        |
        ├── SCF calculation

ecutwfc = 40 Ry
        |
        ├── SCF calculation

ecutwfc = 50 Ry
        |
        └── SCF calculation

Each calculation can be submitted as a separate HPC job.

Hands-on Exercise

Perform convergence testing for a silicon crystal:

Tasks:

Test different ecutwfc values.
Test different k-point meshes.
Plot total energy versus computational parameters.
Determine the optimal parameters.

Expected output:

Converged cutoff energy
Converged k-point mesh
Recommended parameters for future calculations
Summary

Convergence testing is an essential step before performing accurate DFT calculations.

The main parameters that require testing are:

Parameter	Purpose
ecutwfc	Controls wave-function basis size
ecutrho	Controls charge density representation
k-points	Controls Brillouin zone sampling
Convergence threshold	Controls calculation accuracy
