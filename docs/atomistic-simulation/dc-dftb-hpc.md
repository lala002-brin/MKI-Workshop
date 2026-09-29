# HPC Execution for DC-DFTB-MD


## Overview

High Performance Computing (HPC) is required to perform large-scale molecular dynamics simulations efficiently.

DC-DFTB-MD calculations involve repeated force calculations and atomic updates, which require significant computational resources.

HPC allows simulations to run using parallel computing resources such as multiple CPU cores and computing nodes.


## Role of HPC in Molecular Dynamics

The HPC stage connects prepared input files with the actual simulation execution.

The general workflow is:

```mermaid
flowchart LR

A[Prepared Input Files]
-->B[HPC Environment]

B
-->C[Job Submission]

C
-->D[Parallel Simulation]

D
-->E[Trajectory Output]
```
## HPC Workflow

The main stages of HPC execution include:


### 1. Environment Preparation

Before running the simulation, the computational environment must be prepared.

Required components:

- Simulation software
- Computational libraries
- Input files
- Resource configuration


### 2. Resource Allocation

HPC resources determine how efficiently the simulation runs.

Important parameters include:

- Number of CPU cores
- Memory allocation
- Number of nodes
- Simulation time limit


### 3. Job Submission

Most HPC systems use a job scheduler to manage computational tasks.

Common scheduler:

- SLURM


A job submission script defines:

- Executable command
- Computational resources
- Output files
- Error files


### 4. Simulation Monitoring

During execution, simulation progress should be monitored.

Important checks:

- Job status
- Computational efficiency
- Error messages
- Simulation output

## Connection to Trajectory Analysis

After successful execution, DC-DFTB-MD generates trajectory files.

The trajectory data can be used for:

- Structural analysis
- Diffusion coefficient calculation
- Radial Distribution Function (RDF)
- Mean Square Displacement (MSD)

