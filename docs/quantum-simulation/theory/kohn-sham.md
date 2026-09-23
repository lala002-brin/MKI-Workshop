# Kohn-Sham Equations

## Overview

Density Functional Theory (DFT) provides a framework to describe the ground-state properties of many-electron systems using electron density instead of many-electron wave functions.

However, the exact treatment of interacting electrons remains computationally difficult because electrons interact with each other through complex many-body effects.

Kohn and Sham introduced an approach that transforms the interacting electron system into an equivalent non-interacting reference system with the same electron density. This approach is known as Kohn-Sham Density Functional Theory (KS-DFT).

The Kohn-Sham formulation is the foundation of most practical DFT calculations used in computational materials science. :contentReference[oaicite:1]{index=1}

---

# Kohn-Sham Energy Functional

In Kohn-Sham DFT, the total energy is expressed as a functional of electron density:

\[
E[\rho] = T_s[\rho] + E_{ext}[\rho] + E_H[\rho] + E_{xc}[\rho]
\]

where:

- \(T_s[\rho]\) is the kinetic energy of the non-interacting electrons.
- \(E_{ext}[\rho]\) represents electron-ion interaction.
- \(E_H[\rho]\) represents classical electron-electron Coulomb interaction.
- \(E_{xc}[\rho]\) represents exchange-correlation energy.

The exchange-correlation term contains the complex many-body effects and must be approximated using different exchange-correlation functionals. :contentReference[oaicite:2]{index=2}

---

# Kohn-Sham Equations

The Kohn-Sham equations transform the many-electron problem into a set of single-electron equations:

\[
\left[
-\frac{\hbar^2}{2m}\nabla^2
+
V_{eff}(r)
\right]
\psi_i(r)
=
\epsilon_i\psi_i(r)
\]

where:

- \(\psi_i(r)\) represents the Kohn-Sham orbital.
- \(\epsilon_i\) represents the orbital energy.
- \(V_{eff}(r)\) represents the effective Kohn-Sham potential.

The effective potential consists of:

\[
V_{eff}(r)
=
V_{ext}(r)
+
V_H(r)
+
V_{xc}(r)
\]

where:

- \(V_{ext}\) is the external potential from nuclei.
- \(V_H\) is the Hartree potential.
- \(V_{xc}\) is the exchange-correlation potential.

:contentReference[oaicite:3]{index=3}

---

# Electron Density Calculation

The electron density is obtained from the occupied Kohn-Sham orbitals:

\[
\rho(r)
=
\sum_i f_i |\psi_i(r)|^2
\]

where:

- \(f_i\) is the occupation number.
- \(\psi_i(r)\) is the Kohn-Sham orbital.

The calculated electron density is then used to update the effective potential.

---

# Self-Consistent Field (SCF) Cycle

Because the electron density determines the effective potential, and the effective potential determines the electron density, the Kohn-Sham equations must be solved iteratively.

The SCF workflow is:

1. Generate an initial electron density.
2. Construct the effective potential.
3. Solve the Kohn-Sham equations.
4. Calculate a new electron density.
5. Compare with the previous density.
6. Repeat until convergence is achieved.

This iterative process is the basis of SCF calculations in Quantum ESPRESSO.

---

# Exchange-Correlation Functionals

The exchange-correlation functional is the only unknown component in the Kohn-Sham energy expression.

Common approximations include:

## Local Density Approximation (LDA)

LDA assumes that the electron density varies slowly and locally resembles a uniform electron gas.

## Generalized Gradient Approximation (GGA)

GGA includes information about the density gradient and generally provides improved accuracy for many materials.

Examples:

- PBE
- PW91

## Hybrid Functionals

Hybrid functionals combine DFT exchange with a portion of exact Hartree-Fock exchange.

Examples:

- PBE0
- HSE

---

# Importance in Computational Materials Science

The Kohn-Sham formulation makes DFT calculations practical for studying:

- Crystal structures
- Electronic properties
- Band structures
- Surface reactions
- Catalytic materials
- Battery materials

Quantum ESPRESSO solves Kohn-Sham equations using numerical methods based on plane waves, pseudopotentials, and self-consistent field algorithms.

---

# Relation to Quantum ESPRESSO Workflow

In Quantum ESPRESSO, the Kohn-Sham equations are solved through calculations such as:

- SCF calculation
- Geometry optimization
- Band structure calculation
- Density of states calculation

Understanding Kohn-Sham equations helps users understand the physical meaning behind each computational parameter used in DFT simulations.
