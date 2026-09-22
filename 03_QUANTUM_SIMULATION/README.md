# Quantum Simulation


## First-Principles Calculation Using Quantum ESPRESSO


## Overview

This module introduces first-principles computational methods for investigating ionic liquid battery systems.

After completing the system design stage, the prepared atomic structures are investigated using quantum mechanical calculations.

The main software used in this workshop is:


```
Quantum ESPRESSO
```


Quantum ESPRESSO is an open-source package for electronic structure calculations based on Density Functional Theory (DFT).


The main objective of this module is:


```
Understanding how electronic structure determines
atomic interaction and material behavior.
```


---

# Scientific Workflow


The quantum simulation workflow follows:


```
System Preparation

↓

Atomic Structure

↓

DFT Calculation

↓

Electronic Structure Analysis

↓

Material Property Understanding
```


The input system can include:


## Bulk Electrolyte


Example:

```
LiTFSI + EMIM-TFSI
```


Purpose:

- Study molecular interaction
- Analyze lithium coordination


---

## Electrode-Electrolyte Interface


Example:

```
Graphite (001)

+

LiTFSI / EMIM-TFSI
```


Purpose:

- Study surface interaction
- Analyze adsorption behavior
- Investigate interface stability


---

# Learning Objectives


After completing this module, participants will understand:


- Basic principles of Density Functional Theory
- Quantum ESPRESSO workflow
- Preparation of DFT input files
- SCF calculation
- Structural relaxation
- Electronic property analysis
- Running quantum calculations on HPC


---

# Density Functional Theory Workflow


The general DFT workflow:


```
Initial Atomic Structure

↓

Input Preparation

↓

SCF Calculation

↓

Structural Relaxation

↓

Electronic Analysis
```


---

# Quantum ESPRESSO Workflow


The calculation process:


```
Structure File

(.xyz / .cif)

↓

QE Input File

(.in)

↓

SCF Calculation

↓

Relaxation

↓

Post Processing
```


---

# Calculation Types


## 1. Self Consistent Field (SCF)


Purpose:

Determine the electronic ground state.


Output:

- Total energy
- Charge density
- Electronic convergence


Example:


```
scf.in
```


---

## 2. Structural Relaxation


Purpose:

Find the most stable atomic configuration.


Optimization:

- Atomic positions
- Molecular geometry
- Surface structure


Example:


```
relax.in
```


---

## 3. Electronic Properties


Analysis includes:


### Density of States (DOS)

Provides:

- Electronic state distribution
- Energy level information


### Projected Density of States (PDOS)

Provides:

- Contribution from specific atoms
- Orbital interaction analysis


---

# Interface Calculation


For graphite-electrolyte systems, quantum simulation focuses on:


## Surface Interaction


Example:


```
Graphite

+

LiTFSI

+

EMIM-TFSI
```


Analysis:

- Adsorption energy
- Charge redistribution
- Interface stability


---

# Required Input Files


Quantum simulation requires:


## Atomic Structure


Example:

```
graphite_LiTFSI_EMIM_TFSI.xyz
```


## Pseudopotential


Required for:

- Carbon
- Lithium
- Nitrogen
- Oxygen
- Sulfur
- Fluorine
- Hydrogen


## QE Input File


Example:

```
scf.in

relax.in
```


---

# HPC Workflow


Large quantum calculations require high-performance computing resources.


General workflow:


```
Prepare Input

↓

Submit Job

↓

Monitor Calculation

↓

Analyze Output
```


Typical HPC process:


```
Input File

↓

Job Script

↓

Scheduler

↓

Quantum ESPRESSO Calculation

↓

Output File
```


---

# Module Organization


This section contains:


```
Quantum_ESPRESSO/

↓

Software and calculation workflow


Analysis/

↓

Scientific interpretation of results
```


---

# Connection to Previous Module


The input of this module comes from:


```
02_SYSTEM_DESIGN

↓

Graphite-Electrolyte Interface

↓

03_QUANTUM_SIMULATION
```


The quality of the quantum calculation depends strongly on the quality of the prepared atomic structure.


---

# Connection to Next Module


The output from quantum simulation becomes the foundation for:


```
04_ATOMISTIC_SIMULATION
```


where atomic movement and lithium transport are investigated using molecular dynamics.


---

# Expected Outcomes


After completing this module, participants will obtain:


- Optimized atomic structures
- Electronic information
- Interaction energy
- Quantum reference data


These results support the development of advanced atomistic and AI-based simulations.
