# Computational Materials Sciences Workshop

## Ionic Liquid Battery Simulation: From First-Principles Calculation to AI-Accelerated Molecular Dynamics

<p align="center">
  <img src="https://img.shields.io/badge/Topic-Computational%20Materials%20Science-blue">
  <img src="https://img.shields.io/badge/Method-DFT%20%7C%20MD%20%7C%20AI-green">
  <img src="https://img.shields.io/badge/Application-Ionic%20Liquid%20Battery-orange">
</p>


## Workshop Overview

This repository contains the hands-on materials for the **Computational Materials Sciences Workshop** focusing on the simulation of **ionic liquid battery electrolytes** using a multiscale computational approach.

The workshop introduces a complete computational workflow starting from **first-principles quantum calculations**, followed by **atomistic molecular dynamics simulation**, and accelerated using **machine learning potential approaches**.

The main objective is to understand how lithium ions interact, migrate, and transport inside ionic liquid electrolytes through computational modeling.


The complete workflow integrates:

- Density Functional Theory (DFT)
- Quantum ESPRESSO
- DC-DFTB Molecular Dynamics
- Molecular Dynamics Analysis
- Machine Learning Potential (MACE)
- High Performance Computing (HPC)


---

# Scientific Case Study

## Lithium Ion Transport in Ionic Liquid Electrolyte


The workshop uses an ionic liquid battery electrolyte system as a representative case study:

```
Lithium Salt

+

Ionic Liquid Electrolyte

↓

Ion Interaction

↓

Ion Dynamics

↓

Battery Electrolyte Performance
```


Example system:

```
LiTFSI

+

EMIM-TFSI Ionic Liquid
```


The main scientific question:


> How do lithium ions interact with and move through ionic liquid electrolytes at the atomic scale?


---

# Computational Workflow


The workshop follows a multiscale simulation approach:


```
Molecular Structure Design

          ↓

First-Principles Calculation

(Quantum ESPRESSO)

          ↓

Electronic Interaction Analysis

(Binding Energy, DOS, PDOS)

          ↓

Atomistic Molecular Dynamics

(DC-DFTB-MD)

          ↓

Ion Transport Analysis

(MSD, RDF, Diffusion Coefficient)

          ↓

AI Acceleration

(MACE Machine Learning Potential)

          ↓

Large Scale Battery Simulation
```


---

# Workshop Learning Pathway


## Module 01
# System Design and Preparation


Participants learn:

- Ionic liquid electrolyte concepts
- Lithium salt preparation
- Molecular structure generation
- Atomic structure validation


Output:

```
Initial molecular structure
```


---

## Module 02
# First-Principles Calculation


Software:

```
Quantum ESPRESSO
```


Participants perform:

- Geometry optimization
- Self Consistent Field (SCF) calculation
- Interaction energy calculation
- Density of States (DOS)
- Projected Density of States (PDOS)


Output:

```
Optimized structure

+

Electronic properties

+

Interaction energy
```


---

## Module 03
# Atomistic Molecular Dynamics


Software:

```
DC-DFTB-MD
```


Participants learn:

- Ionic liquid simulation box preparation
- Molecular dynamics setup
- Atomic trajectory calculation
- Lithium ion movement analysis


Output:

```
Atomic trajectory

+

Ion dynamics information
```


---

## Module 04
# Ion Transport Analysis


Participants analyze:


### Mean Square Displacement (MSD)

To determine lithium ion mobility.


### Diffusion Coefficient

To quantify ion transport capability.


### Radial Distribution Function (RDF)

To understand ion solvation and interaction structure.


Output:

```
MSD curve

Diffusion coefficient

RDF profile
```


---

## Module 05
# AI Accelerated Simulation


Software:

```
MACE Machine Learning Potential
```


Participants learn:

- Dataset preparation
- Machine learning potential concept
- Model training
- Large-scale molecular dynamics acceleration


Output:

```
AI accelerated atomistic simulation
```


---

# Software Stack


| Component | Software | Purpose |
|---|---|---|
| Quantum Calculation | Quantum ESPRESSO | First-principles calculation |
| Molecular Dynamics | DC-DFTB-MD | Large-scale atomistic simulation |
| AI Simulation | MACE | Machine learning potential |
| Structure Handling | ASE | Atomic structure manipulation |
| Visualization | OVITO / VESTA | Structure and trajectory analysis |
| Computing | HPC Cluster | Large-scale simulation |


---

# Repository Structure


```
MKI-Ionic-Liquid-Battery-Workshop/

│
├── 00_START_HERE/
│
├── 01_FOUNDATION/
│
├── 02_SYSTEM_DESIGN/
│
├── 03_QUANTUM_SIMULATION/
│
├── 04_ATOMISTIC_SIMULATION/
│
├── 05_AI_ACCELERATION/
│
├── 06_HPC_ENVIRONMENT/
│
├── 07_FINAL_PROJECT/
│
├── SOFTWARE_SETUP/
│
├── RESULTS_DATABASE/
│
├── INSTRUCTOR_GUIDE/
│
├── PARTICIPANT_GUIDE/
│
└── REFERENCES/
```


---

# Expected Skills After Workshop


After completing this workshop, participants will be able to:


✓ Prepare ionic liquid battery molecular systems

✓ Perform first-principles calculations using Quantum ESPRESSO

✓ Analyze electronic properties of electrolyte systems

✓ Perform DC-DFTB molecular dynamics simulations

✓ Analyze lithium ion transport behavior

✓ Apply machine learning potential for accelerated simulation

✓ Execute computational workflows on HPC environments


---

# Target Participants


This workshop is designed for:

- Graduate students
- Researchers in materials science
- Computational chemistry researchers
- Battery technology researchers
- Scientists interested in AI-driven materials discovery


---

# Citation and Acknowledgement


If you use materials from this repository, please cite:


```
MKI Computational Materials Sciences Workshop

Ionic Liquid Battery Simulation:
From First-Principles Calculation to AI-Accelerated Molecular Dynamics
```


---

# Organized By

**Masyarakat Komputasi Indonesia (MKI)**


Collaboration:

**Institut Teknologi Bandung (ITB)**

**Badan Riset dan Inovasi Nasional (BRIN)**


---

# License

This repository is intended for educational and research purposes.
