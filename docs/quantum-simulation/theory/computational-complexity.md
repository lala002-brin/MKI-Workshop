# Computational Complexity

## Overview

Density Functional Theory (DFT) is a powerful first-principles method widely used to study the electronic structure and properties of materials. However, the computational cost of DFT calculations increases rapidly with increasing system size and calculation accuracy requirements.

In practical simulations, the computational workload is mainly influenced by:

- Number of atoms in the system
- Number of k-points for Brillouin zone sampling
- Number of plane waves used as basis functions
- Number of electronic bands
- Diagonalization method

Understanding computational complexity helps researchers select appropriate calculation parameters and HPC resources before performing large-scale Quantum ESPRESSO simulations.

---

# Computational Scaling in DFT Calculations

## 1. Scaling with Number of Atoms

The number of atoms is one of the main factors controlling the computational cost of DFT calculations.

For conventional plane-wave DFT calculations, the computational time approximately follows:

\[
O(N^3)
\]

where **N** represents the number of atoms in the system.

The cubic scaling originates from solving the Kohn-Sham equations, particularly during matrix construction and diagonalization procedures. As the number of atoms increases, the number of electrons and electronic states also increases, leading to larger Hamiltonian matrices.

Examples of systems with increasing computational requirements:

- Small molecules: tens of atoms
- Bulk materials: tens to hundreds of atoms
- Surface, interface, and defect systems: hundreds to thousands of atoms

Large systems require HPC resources to reduce computational time.

---

## 2. Scaling with Number of k-points

Periodic materials require sampling of the Brillouin zone using k-points.

The computational cost increases approximately linearly with the number of inequivalent k-points:

\[
O(N_k)
\]

where \(N_k\) represents the number of k-points.

Increasing the k-point density improves the accuracy of electronic structure calculations, including:

- Total energy
- Density of states
- Band structure
- Metallic system calculations

However, each k-point requires an independent electronic structure calculation, resulting in increased computational demand.

Example:

Low k-point density:
4 × 4 × 4


High k-point density:
12 × 12 × 12


A higher k-point mesh provides better accuracy but requires more computational resources.

---

## 3. Scaling with Number of Plane Waves

Quantum ESPRESSO uses plane waves as basis functions to represent electronic wave functions.

The number of plane waves depends on the kinetic energy cutoff:

\[
N_{PW} \propto E_{cut}^{3/2}
\]

where:

- \(N_{PW}\) is the number of plane waves.
- \(E_{cut}\) is the kinetic energy cutoff.

A higher cutoff energy improves the accuracy of calculations because more basis functions are included. However, it also increases:

- Memory requirements
- FFT operations
- Computational time

The FFT calculation scales approximately as:

\[
O(N \log N)
\]

where N represents the number of plane waves.

In Quantum ESPRESSO, this parameter is controlled by:
ecutwfc

Increasing `ecutwfc` requires more computational resources.

---

## 4. Scaling with Number of Electronic Bands

The number of electronic bands determines the size of the electronic state space that must be calculated.

The computational cost associated with subspace diagonalization scales approximately as:

\[
O(N^3)
\]

where N represents the number of electronic bands.

The required number of bands increases for:

- Larger atomic systems
- Systems containing more electrons
- Metallic materials
- Calculations requiring unoccupied states

Calculations such as:

- Band structure
- Density of states
- Optical properties
- Excited-state calculations

usually require more electronic bands compared with standard SCF calculations.

---

## 5. Subspace Diagonalization

Subspace diagonalization is one of the most computationally intensive steps in DFT calculations.

The diagonalization process involves solving eigenvalue problems of the Kohn-Sham Hamiltonian.

The computational scaling is approximately:

\[
O(N^3)
\]

with respect to the number of electronic states.

Different diagonalization algorithms provide different balances between speed and stability.

Faster algorithms can reduce computational time but may require more careful convergence testing. More robust algorithms may provide better numerical stability but require additional computational resources.

---

# Parallelization in HPC

Because DFT calculations involve many independent operations, Quantum ESPRESSO can distribute computational tasks across multiple processors.

Parallelization can be performed over:

- k-points
- Plane waves
- Electronic bands
- FFT calculations

The efficiency of parallelization depends on the size and complexity of the system.

Small calculations may not benefit significantly from using many processors because communication overhead becomes dominant.

Large-scale calculations can achieve significant acceleration using HPC clusters.

---

# Computational Scaling Summary

| Parameter | Computational Effect | Scaling |
|---|---|---|
| Number of atoms | Increases Hamiltonian size and electronic states | O(N³) |
| Number of k-points | Increases Brillouin zone sampling workload | O(Nk) |
| Number of plane waves | Increases basis size and FFT workload | O(N log N) |
| Number of electronic bands | Increases diagonalization workload | O(N³) |

---

# Why HPC is Required for DFT Calculations

The computational complexity of DFT explains why high-performance computing systems are essential for modern materials simulations.

Large-scale calculations involving:

- Defect materials
- Surface reactions
- Catalytic systems
- Battery materials
- Complex molecular systems

require substantial computational resources.

HPC provides:

- Large numbers of CPU cores
- High memory capacity
- Parallel computing capability
- High-performance storage

Efficient selection of computational parameters is important to balance accuracy and computational cost.

Quantum ESPRESSO combined with HPC resources enables researchers to perform simulations of complex materials systems that are difficult to solve using conventional computers.

