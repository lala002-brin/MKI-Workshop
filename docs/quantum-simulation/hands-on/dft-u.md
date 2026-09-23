# DFT+U Calculation

## Overview

Density Functional Theory (DFT) provides accurate predictions for many materials. However, standard DFT using local or semi-local exchange-correlation functionals may underestimate the electronic properties of systems containing localized electrons.

This limitation commonly appears in materials containing:

- Transition metals
- Rare-earth elements
- Strongly correlated electrons

The DFT+U method introduces an additional Hubbard correction term to improve the description of localized electrons.

The general workflow is:

```text
SCF Calculation

        ↓

Geometry Optimization

        ↓

DFT+U Calculation

        ↓

Electronic Property Analysis
```

---

# Why DFT+U is Needed

Standard DFT often suffers from self-interaction errors that cause:

- Incorrect band gap prediction
- Delocalization of localized electrons
- Incorrect magnetic properties

DFT+U improves the treatment of localized orbitals by adding an on-site correction.

Common systems requiring DFT+U:

| Material | Localized Orbitals |
|---|---|
| Transition metal oxide | d orbitals |
| Rare-earth compounds | f orbitals |
| Magnetic materials | d and f electrons |

---

# Hubbard Correction in Quantum ESPRESSO

In Quantum ESPRESSO, the Hubbard parameter is defined in the `SYSTEM` section.

Example:

```text
&SYSTEM

lda_plus_u = .true.

Hubbard_U(1) = 4.0

/
```

The value of `Hubbard_U` depends on:

- Material system
- Atomic species
- Research objective

---

# Choosing Hubbard U Value

The Hubbard U parameter strongly affects calculated properties.

Example test:

| Test | Hubbard U |
|---|---|
| 1 | 2 eV |
| 2 | 4 eV |
| 3 | 6 eV |
| 4 | 8 eV |

The selected value should reproduce experimental or reference computational results.

Properties commonly evaluated:

- Band gap
- Magnetic moment
- Structural parameters
- Formation energy

---

# Example Quantum ESPRESSO Input

Example calculation for transition metal oxide:

```text
&CONTROL

calculation = 'scf'

prefix = 'material'

/

&SYSTEM

ecutwfc = 60

ecutrho = 480

lda_plus_u = .true.

Hubbard_U(1) = 4.0

/

&ELECTRONS

conv_thr = 1.0d-8

/
```

---

# DFT+U Workflow on HPC

A typical workflow:

```text
Optimized Structure

        ↓

Standard DFT Calculation

        ↓

Select Hubbard U Value

        ↓

DFT+U Calculation

        ↓

Compare Electronic Properties
```

Multiple Hubbard U values can be calculated independently on HPC.

Example:

```text
U = 2 eV
    |
    └── SCF calculation

U = 4 eV
    |
    └── SCF calculation

U = 6 eV
    |
    └── SCF calculation
```

---

# Result Analysis

DFT+U results are commonly analyzed using:

## Band Structure

To evaluate:

- Band gap correction
- Electronic state changes

## Density of States

To evaluate:

- Orbital contribution
- Localization of electronic states

## Magnetic Properties

To evaluate:

- Magnetic moments
- Spin polarization

---

# Hands-on Exercise

Perform DFT+U calculation for a transition metal oxide.

Tasks:

1. Perform standard DFT calculation.
2. Select several Hubbard U values.
3. Run DFT+U calculations.
4. Compare band structure and DOS results.
5. Determine the effect of Hubbard correction.

Expected output:

- Optimized Hubbard U value
- Modified electronic structure
- Comparison between DFT and DFT+U results

---

# Summary

DFT+U improves the description of materials containing localized electrons.

The method adds a Hubbard correction to standard DFT calculations and is commonly used for:

- Transition metal compounds
- Magnetic materials
- Strongly correlated systems

The selected Hubbard U value should be carefully tested to obtain reliable computational results.
