# HPC Environment


## Running Quantum ESPRESSO on High Performance Computing


First-principles calculations often require significant computational resources, especially for large molecular systems, complex materials, and high-accuracy simulations.


High Performance Computing (HPC) provides the computational infrastructure needed to perform large-scale electronic structure calculations efficiently.


This section introduces the basic workflow for running Quantum ESPRESSO calculations on HPC systems.



---

## What is HPC?


High Performance Computing is a computational system that combines multiple processors, memory resources, and high-speed interconnections to solve complex scientific problems.


In materials science, HPC is commonly used for:


- Large-scale Density Functional Theory calculations
- Molecular dynamics simulations
- Electronic structure analysis
- High-throughput materials screening



---

## HPC Workflow


A typical Quantum ESPRESSO workflow on an HPC system follows:


    Local Computer

          ↓

    Input File Preparation

          ↓

    Transfer Files to HPC Cluster

          ↓

    Job Submission

          ↓

    Quantum ESPRESSO Calculation

          ↓

    Result Download and Analysis



---

## Connecting to HPC


Users commonly access HPC systems through Secure Shell (SSH).


Basic connection command:


    ssh username@hpc-address


After successful authentication, users can access the HPC computing environment.



---

## Linux Environment


Most HPC systems use Linux-based operating systems.


Common Linux commands used during calculations:


    pwd

    ls

    cd

    mkdir

    cp

    rm


These commands are used for navigating directories, managing files, and preparing simulation workflows.



---

## Software Environment Management


HPC systems usually provide scientific software through a module system.


Available software can be checked using:


    module avail


Quantum ESPRESSO can be loaded using:


    module load quantum-espresso


The module system ensures that the required compiler, libraries, and dependencies are available.



---

## Job Scheduling System


HPC clusters use job schedulers to manage computational resources.


One of the commonly used schedulers is SLURM.


A calculation is submitted through a job script containing:


- Job name
- Number of processors
- Memory requirements
- Execution command



Example SLURM workflow:


    Create job script

          ↓

    Submit job

          ↓

    Monitor calculation

          ↓

    Collect results



---

## Running Quantum ESPRESSO Calculation


A parallel Quantum ESPRESSO calculation is executed using MPI.


Example command:


    mpirun -np 16 pw.x < input.in > output.out


Explanation:


- mpirun: executes parallel calculation
- -np 16: uses 16 processors
- pw.x: Quantum ESPRESSO main calculation program
- input.in: input file
- output.out: calculation output file



---

## Monitoring Jobs


Users can monitor running calculations using:


    squeue


To cancel a running job:


    scancel JOB_ID



---

## Data Management


After calculation completion, important files should be stored and organized properly.


Typical calculation files include:


    input.in

    output.out

    charge-density.dat

    wavefunction files


Proper file management helps researchers reproduce and analyze simulation results.



---

## Best Practices for HPC Calculation


Recommended practices:


- Test calculations on small systems before large simulations
- Optimize processor usage
- Monitor computational resources
- Keep input and output files organized
- Record calculation parameters



---

## Next Step


Continue to:


**Pseudopotential**


to learn how atomic potentials are prepared for first-principles calculations.
