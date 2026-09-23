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
---

# 2. Charge Density Cutoff Convergence

## Charge Density Cutoff (`ecutrho`)

In addition to the wave-function cutoff (`ecutwfc`), Quantum ESPRESSO requires a cutoff parameter for representing the electronic charge density.

The charge density contains information about the distribution of electrons in the material and requires a higher energy cutoff because it is constructed from the product of wave functions.

The parameter is defined in the `SYSTEM` section:

```text
&SYSTEM

ecutwfc = 50
ecutrho = 400

/
```

where:

- `ecutwfc` controls the plane-wave basis for wave functions.
- `ecutrho` controls the plane-wave basis for charge density.

---

## Relationship Between `ecutwfc` and `ecutrho`

The required value of `ecutrho` depends on the type of pseudopotential used in the calculation.

Typical recommendations are:

| Pseudopotential Type | Recommended `ecutrho` |
|---|---|
| Norm-conserving | 4 × `ecutwfc` |
| Ultrasoft | 8–12 × `ecutwfc` |
| PAW | Usually 4–8 × `ecutwfc` |

For example, if:

```text
ecutwfc = 50 Ry
```

then typical values are:

```text
Norm-conserving:

ecutrho = 200 Ry
```

or:

```text
Ultrasoft:

ecutrho = 400–600 Ry
```

The final value should always follow the recommendation provided by the selected pseudopotential file.

---

## Effect of `ecutrho` on Calculation Accuracy

The charge density cutoff affects the accuracy of:

- Total energy
- Forces
- Stress calculations
- Structural optimization results

A low `ecutrho` may produce inaccurate charge density representation and affect calculated properties.

However, excessively high values increase:

- Memory consumption
- CPU time
- Disk usage

Therefore, convergence testing is required to determine a suitable value.

---

## `ecutrho` Convergence Test

A typical convergence procedure increases `ecutrho` while keeping other parameters constant.

Example:

| Test | `ecutwfc` | `ecutrho` |
|---|---|---|
| 1 | 50 Ry | 200 Ry |
| 2 | 50 Ry | 300 Ry |
| 3 | 50 Ry | 400 Ry |
| 4 | 50 Ry | 500 Ry |

The total energy difference is monitored between calculations.

The converged value is selected when increasing `ecutrho` produces only small changes in the calculated properties.

---

## Example Quantum ESPRESSO Input

Example SCF input:

```text
&CONTROL
calculation = 'scf'
/

&SYSTEM

ecutwfc = 50
ecutrho = 400

/

&ELECTRONS

conv_thr = 1.0d-8

/
```

In this example:

| Parameter | Value |
|---|---|
| Wave-function cutoff | 50 Ry |
| Charge density cutoff | 400 Ry |
| Electronic convergence threshold | 1.0 × 10⁻⁸ |

---

## Practical Considerations on HPC

The `ecutrho` convergence test can be performed together with `ecutwfc` testing.

A common workflow is:

```text
Select pseudopotential
        |
        ↓
Test ecutwfc
        |
        ↓
Fix converged ecutwfc
        |
        ↓
Test ecutrho
        |
        ↓
Select final parameters
```

This approach avoids unnecessary computational cost because `ecutrho` testing is performed after establishing an appropriate wave-function cutoff.

---

## Key Points

- `ecutrho` controls the representation of electronic charge density.
- The required value depends on the pseudopotential type.
- Higher `ecutrho` improves accuracy but increases computational cost.
- Convergence testing ensures reliable results with efficient HPC usage.

---
---

# 3. k-point Convergence

## Brillouin Zone Sampling and k-points

In periodic materials, electronic states are calculated in reciprocal space using k-point sampling.

The reciprocal space region associated with a crystal lattice is called the **Brillouin zone**. Quantum ESPRESSO uses a set of k-points to sample this region and calculate electronic properties.

The density of k-points strongly affects the accuracy of:

- Total energy
- Electronic structure
- Band structure
- Density of states
- Fermi surface calculations

A denser k-point mesh provides more accurate results but increases computational cost.

---

## k-point Mesh in Quantum ESPRESSO

The k-point mesh is defined in the input file using the `K_POINTS` keyword.

Example automatic k-point generation:

```text
K_POINTS automatic

6 6 6 0 0 0
```

The format is:

```text
kx ky kz offset_x offset_y offset_z
```

where:

- `kx`, `ky`, and `kz` define the number of divisions along reciprocal lattice directions.
- Offset values determine the position of the mesh.

---

## Effect of k-point Density

A coarse k-point mesh may not accurately represent the electronic structure.

Example:

| Test | k-point Mesh | Accuracy |
|---|---|---|
| 1 | 2 × 2 × 2 | Low |
| 2 | 4 × 4 × 4 | Moderate |
| 3 | 6 × 6 × 6 | Good |
| 4 | 8 × 8 × 8 | High |

As the number of k-points increases:

- Calculation accuracy improves.
- Total energy becomes more stable.
- Computational cost increases.

---

## k-point Convergence Test

The convergence test is performed by gradually increasing the k-point density while keeping other parameters constant.

Example:

Initial calculation:

```text
ecutwfc = 50 Ry

ecutrho = 400 Ry

k-point = 4 × 4 × 4
```

Then increase:

```text
4 × 4 × 4

↓

6 × 6 × 6

↓

8 × 8 × 8

↓

10 × 10 × 10
```

For each calculation, compare:

- Total energy
- Energy difference
- Calculation time

---

## Example Convergence Data

Example results:

| k-point Mesh | Total Energy (Ry) |
|---|---|
| 4 × 4 × 4 | -15.241 |
| 6 × 6 × 6 | -15.249 |
| 8 × 8 × 8 | -15.251 |
| 10 × 10 × 10 | -15.251 |

The calculation is considered converged when increasing the k-point density produces negligible changes in total energy.

---

## Choosing k-point Density

The required k-point density depends on the material system.

### Insulators and Semiconductors

Insulators and semiconductors usually require moderate k-point sampling.

Example:

```text
6 × 6 × 6
```

may provide sufficient accuracy for many systems.

---

### Metals

Metallic systems require denser k-point sampling because electronic states near the Fermi level change rapidly.

Example:

```text
12 × 12 × 12
```

or higher may be required.

Smearing methods are commonly applied for metallic calculations.

Example:

```text
occupations = 'smearing'

smearing = 'gaussian'

degauss = 0.02
```

---

## Practical Workflow on HPC

A typical k-point convergence workflow:

```text
Fix converged cutoff parameters

            |

            ↓

Generate several k-point meshes

            |

            ↓

Run independent SCF calculations

            |

            ↓

Compare total energy

            |

            ↓

Select optimal k-point mesh
```

Multiple k-point calculations can be submitted simultaneously on HPC systems.

Example:

```bash
sbatch scf_k4.slurm

sbatch scf_k6.slurm

sbatch scf_k8.slurm
```

---

## Key Points

- k-points determine how accurately the Brillouin zone is sampled.
- Higher k-point density improves accuracy but increases computational cost.
- Metals generally require denser k-point meshes than insulators.
- k-point convergence should be tested before production calculations.

---
---

# 4. Smearing Parameters for Metallic Systems

## Overview of Smearing

In Density Functional Theory (DFT) calculations, electronic occupations describe how electrons populate available energy states.

For insulating and semiconducting materials, the occupation of electronic states is usually well-defined because there is an energy gap between occupied and unoccupied states.

However, metallic systems have partially occupied states near the Fermi level. This condition can create numerical instability during self-consistent field (SCF) calculations.

To improve convergence, Quantum ESPRESSO applies smearing methods that introduce a small broadening around the Fermi energy.

---

## Why Smearing is Needed

Metallic systems often experience slow SCF convergence because many electronic states are close in energy.

Without smearing, calculations may encounter:

- Oscillating charge density
- Slow convergence
- Unstable total energy
- Difficulty reaching the self-consistent solution

Smearing improves numerical stability by allowing fractional occupation of electronic states.

---

# Smearing Parameters in Quantum ESPRESSO

Smearing is controlled using parameters in the `SYSTEM` section:

```text
&SYSTEM

occupations = 'smearing'

smearing = 'gaussian'

degauss = 0.02

/
```

The main parameters are:

| Parameter | Function |
|---|---|
| `occupations` | Defines electron occupation method |
| `smearing` | Selects smearing scheme |
| `degauss` | Controls smearing width |

---

# Types of Smearing Methods

Quantum ESPRESSO provides several smearing schemes.

## Gaussian Smearing

Gaussian smearing is one of the simplest approaches.

Input:

```text
smearing = 'gaussian'
```

Advantages:

- Simple implementation
- Stable SCF convergence
- Suitable for many metallic systems

---

## Methfessel-Paxton Smearing

Methfessel-Paxton smearing improves convergence for metallic calculations.

Input:

```text
smearing = 'mp'
```

Advantages:

- Faster convergence for metals
- Commonly used for structural optimization

---

## Marzari-Vanderbilt Smearing

Also known as cold smearing.

Input:

```text
smearing = 'mv'
```

Advantages:

- Better energy convergence
- Reduces numerical errors caused by smearing

---

# Choosing Smearing Width (`degauss`)

The smearing width determines the range of electronic states affected by smearing.

Common values:

| Material Type | Typical `degauss` |
|---|---|
| Simple metals | 0.01–0.03 Ry |
| Complex metals | 0.02–0.05 Ry |
| Very dense k-point calculations | Lower values |

Example:

```text
degauss = 0.02
```

A very large smearing value may introduce artificial effects, while a very small value may reduce convergence stability.

---

# Smearing Convergence Test

Smearing parameters should be tested together with k-point density.

Example:

| Test | Smearing | `degauss` |
|---|---|---|
| 1 | Gaussian | 0.01 Ry |
| 2 | Gaussian | 0.02 Ry |
| 3 | Gaussian | 0.03 Ry |
| 4 | Gaussian | 0.04 Ry |

The selected value should provide:

- Stable SCF convergence
- Accurate total energy
- Minimal dependence on smearing width

---

# Example Quantum ESPRESSO Input

Example metallic SCF calculation:

```text
&CONTROL

calculation = 'scf'

/

&SYSTEM

ecutwfc = 50

ecutrho = 400

occupations = 'smearing'

smearing = 'mv'

degauss = 0.02

/

&ELECTRONS

conv_thr = 1.0d-8

/
```

---

# Smearing Workflow on HPC

A typical workflow:

```text
Select converged cutoff parameters

            |

            ↓

Select appropriate k-point mesh

            |

            ↓

Test smearing parameters

            |

            ↓

Compare energy and convergence behavior

            |

            ↓

Select optimal smearing value
```

---

# Key Points

- Smearing improves SCF convergence for metallic systems.
- The method introduces fractional electron occupations near the Fermi level.
- The `degauss` value should be carefully selected.
- Smearing parameters should be tested together with k-point convergence.

---
---

# 5. Convergence Criteria

## Overview

After selecting computational parameters such as `ecutwfc`, `ecutrho`, k-point mesh, and smearing parameters, the next step is to evaluate whether the calculation has reached convergence.

A calculation is considered converged when increasing computational parameters produces only insignificant changes in the calculated properties.

The convergence criteria depend on the target calculation, including:

- Total energy
- Electronic density
- Atomic forces
- Stress tensor
- Structural parameters

---

# Energy Convergence

## Total Energy Stability

The total energy is one of the most commonly used parameters to evaluate convergence.

During convergence testing, the total energy from different calculations is compared:

\[
\Delta E = E_n - E_{n-1}
\]

where:

- \(E_n\) is the total energy from the current calculation.
- \(E_{n-1}\) is the total energy from the previous calculation.

A calculation is considered converged when:

\[
|\Delta E| < E_{threshold}
\]

The acceptable threshold depends on the accuracy requirements of the research.

Example:

| Parameter | Total Energy |
|---|---|
| 40 Ry | -15.240 Ry |
| 50 Ry | -15.248 Ry |
| 60 Ry | -15.249 Ry |
| 70 Ry | -15.249 Ry |

The energy becomes stable after 60 Ry, indicating that the cutoff is sufficient.

---

# Electronic Convergence

## SCF Convergence Threshold (`conv_thr`)

The self-consistent field (SCF) cycle iteratively updates the electron density until the difference between iterations reaches a specified tolerance.

In Quantum ESPRESSO:

```text
&ELECTRONS

conv_thr = 1.0d-8

/
```

The parameter controls the accuracy of the electronic self-consistency process.

A smaller value provides higher accuracy but requires more computational effort.

Typical values:

| Calculation Type | `conv_thr` |
|---|---|
| Initial test | `1.0d-6` |
| Standard calculation | `1.0d-8` |
| High accuracy | `1.0d-10` |

---

# Force Convergence

## Structural Optimization Criteria

For geometry optimization calculations, convergence is also determined by atomic forces.

The force condition can be expressed as:

\[
|F| < F_{threshold}
\]

where the atomic forces must become smaller than the defined threshold.

Quantum ESPRESSO uses:

```text
forc_conv_thr = value
```

Example:

```text
&CONTROL

forc_conv_thr = 1.0d-4

/
```

Force convergence ensures that atoms reach stable positions.

---

# Stress Convergence

## Lattice Parameter Optimization

When optimizing crystal structures, stress convergence is required to obtain accurate lattice parameters.

Stress describes the response of the crystal lattice to atomic interactions and external forces.

Important calculations involving stress:

- Variable-cell relaxation (`vc-relax`)
- Equation of state calculations
- Pressure-dependent simulations

Example:

```text
calculation = 'vc-relax'
```

A converged stress value indicates that the optimized lattice structure is stable.

---

# Convergence Testing Strategy

A reliable convergence workflow follows a systematic approach.

```text
Choose initial parameters

        ↓

Perform SCF calculation

        ↓

Increase computational parameters

        ↓

Monitor energy, force, and stress

        ↓

Determine convergence point

        ↓

Use final parameters for production calculation
```

---

# Example Convergence Decision

Example:

| Parameter | Test Range | Selected Value |
|---|---|---|
| `ecutwfc` | 30–70 Ry | 60 Ry |
| `ecutrho` | 200–600 Ry | 400 Ry |
| k-point | 4×4×4–10×10×10 | 8×8×8 |
| `conv_thr` | 10⁻⁶–10⁻¹⁰ | 10⁻⁸ |

The selected parameters should provide reliable accuracy with reasonable computational cost.

---

# Practical Considerations on HPC

On HPC systems, convergence testing should consider both accuracy and computational efficiency.

Increasing parameters affects:

- CPU time
- Memory requirement
- Number of required nodes
- Storage usage

Therefore, the goal is not to use the largest possible parameters, but to identify the smallest parameters that provide converged results.

---

# Key Points

- Convergence determines whether computational parameters are sufficient.
- Total energy is commonly used for convergence evaluation.
- SCF convergence controls electronic accuracy.
- Force and stress convergence are important for structural calculations.
- Proper convergence testing improves reliability and reduces unnecessary HPC cost.

---
---

# 6. Complete Convergence Testing Workflow on HPC

## Overview

Convergence testing on HPC systems requires a systematic workflow to evaluate computational parameters efficiently.

Instead of performing calculations randomly, each parameter is tested step-by-step to identify the optimal balance between accuracy and computational cost.

A typical workflow consists of:

1. Preparing the initial calculation.
2. Testing computational parameters.
3. Running multiple SCF calculations.
4. Comparing calculation results.
5. Selecting final parameters for production calculations.

---

# Step 1: Prepare Initial Calculation

Before performing convergence tests, prepare a basic Quantum ESPRESSO input file.

The initial calculation requires:

- Crystal structure
- Pseudopotential files
- Exchange-correlation functional
- Initial cutoff energy
- Initial k-point mesh

Example:

```text
&CONTROL

calculation = 'scf'

prefix = 'Si'

pseudo_dir = './pseudo'

/

&SYSTEM

ibrav = 2

nat = 2

ntyp = 1

ecutwfc = 40

ecutrho = 320

/

&ELECTRONS

conv_thr = 1.0d-8

/
```

This input serves as the starting point for parameter optimization.

---

# Step 2: Define Convergence Test Parameters

The parameters are increased systematically.

Example convergence plan:

| Parameter | Test Values |
|---|---|
| `ecutwfc` | 30, 40, 50, 60 Ry |
| `ecutrho` | 200, 300, 400, 500 Ry |
| k-point | 4×4×4, 6×6×6, 8×8×8 |
| `degauss` | 0.01, 0.02, 0.03 Ry |

Each calculation uses only one changed parameter while other parameters remain fixed.

This approach allows the effect of each parameter to be evaluated independently.

---

# Step 3: Create Multiple HPC Jobs

Since each convergence calculation is independent, multiple jobs can be submitted simultaneously.

Example directory structure:

```text
convergence-test/

├── ecutwfc-30/

├── ecutwfc-40/

├── ecutwfc-50/

└── ecutwfc-60/
```

Each directory contains:

```text
input file

pseudopotential

SLURM script

calculation output
```

---

# Step 4: Submit Calculations Using SLURM

Example SLURM script:

```bash
#!/bin/bash

#SBATCH --job-name=scf-test
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=01:00:00

module load quantum-espresso

pw.x < scf.in > scf.out
```

Submit the calculation:

```bash
sbatch run_scf.slurm
```

Check job status:

```bash
squeue -u username
```

---

# Step 5: Analyze Calculation Results

After calculations finish, extract important information from output files.

The main values analyzed are:

- Total energy
- Number of iterations
- Calculation time
- Final convergence status

Example output:

```text
! total energy = -15.251234 Ry
```

The total energy values are compared between different parameter settings.

---

# Step 6: Determine Optimal Parameters

The optimal parameters are selected when increasing computational parameters produces minimal changes.

Example:

| `ecutwfc` | Total Energy (Ry) |
|---|---|
| 40 Ry | -15.248 |
| 50 Ry | -15.251 |
| 60 Ry | -15.252 |
| 70 Ry | -15.252 |

The selected value:

```text
ecutwfc = 60 Ry
```

because increasing the cutoff further does not significantly change the result.

---

# Automated Convergence Workflow

For large-scale HPC calculations, convergence tests can be automated.

Example workflow:

```text
Generate parameter combinations

            ↓

Submit multiple HPC jobs

            ↓

Collect calculation results

            ↓

Analyze energy differences

            ↓

Select optimal parameters
```

Automation reduces manual work and improves reproducibility.

---

# Example Python Analysis

A simple script can collect total energy values:

```python
import matplotlib.pyplot as plt

ecut = [30, 40, 50, 60]

energy = [
    -15.240,
    -15.248,
    -15.251,
    -15.252
]

plt.plot(ecut, energy, marker='o')

plt.xlabel("ecutwfc (Ry)")
plt.ylabel("Total Energy (Ry)")

plt.show()
```

The resulting plot helps identify the convergence point.

---

# Best Practices for HPC Convergence Testing

Recommended practices:

- Test one parameter at a time.
- Use consistent pseudopotentials.
- Keep calculation conditions identical.
- Record computational time.
- Document final selected parameters.
- Store input and output files for reproducibility.

---

# Key Points

- HPC enables parallel execution of multiple convergence calculations.
- Systematic testing provides reliable computational parameters.
- Automation improves efficiency and reproducibility.
- Final parameters should balance accuracy and computational cost.

---
