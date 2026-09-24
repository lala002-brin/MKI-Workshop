# 🧪 Graphene Electronic Structure Workflow


## Overview


This guide provides the step-by-step workflow to
calculate the electronic properties of graphene using
Quantum ESPRESSO.


The workflow includes:


```text
Graphene Structure

        ↓

SCF Calculation

        ↓

NSCF Calculation

        ↓

DOS Calculation

        ↓

Band Structure Calculation

        ↓

Electronic Analysis
```


---


# 1. Prepare Environment


Before starting the calculation, make sure that
Quantum ESPRESSO is installed and the required
pseudopotential file is available.


Required pseudopotential:


```text
C.pbe-n-kjpaw_psl.1.0.0.UPF
```


Place the pseudopotential inside:


```text
pseudo/
```

---

# 2. Run SCF Calculation


The first step is obtaining the converged charge
density.


Input file:


```text
graphene_scf.in
```


Run:


```bash
pw.x -in graphene_scf.in > graphene_scf.out
```


Check completion:


```bash
grep "JOB DONE" graphene_scf.out
```


Expected:


```text
JOB DONE.
```


---

# 3. Run NSCF Calculation


After SCF convergence, calculate electronic states
using a denser k-point grid.


Input file:


```text
graphene_nscf.in
```


Run:


```bash
pw.x -in graphene_nscf.in > graphene_nscf.out
```


Check:


```bash
grep "JOB DONE" graphene_nscf.out
```


---

# 4. Calculate DOS


The Density of States calculation uses the electronic
states generated from NSCF.


Input file:


```text
graphene_dos.in
```


Run:


```bash
dos.x -in graphene_dos.in > graphene_dos.out
```


Output:


```text
graphene_dos.dat
```


---

# 5. Calculate Band Structure


The band calculation follows the high-symmetry path:


```text
Γ → K → M → Γ
```


Input file:


```text
graphene_bands.in
```


Run:


```bash
pw.x -in graphene_bands.in > graphene_bands.out
```


---

# 6. Band Post Processing


Convert calculated bands into a plot-ready format.


Input file:


```text
graphene_bands_pp.in
```


Run:


```bash
bands.x -in graphene_bands_pp.in > graphene_bands_pp.out
```


Output:


```text
graphene_bands.dat
```


---

# 7. Data Visualization


The calculated data can be visualized using Python.


Required packages:


```bash
pip install numpy matplotlib jupyter
```


Start notebook:


```bash
jupyter notebook
```


Recommended notebook:


```text
graphene.ipynb
```


---

# Expected Outputs


After completing the workflow, participants will obtain:


| Output | Description |
|---|---|
| Charge density | SCF electronic density |
| DOS curve | Distribution of electronic states |
| Band structure | Energy dispersion along k-path |



---

# Troubleshooting


## SCF does not converge


Check:


```bash
tail -50 graphene_scf.out
```


Possible solutions:

- Adjust mixing parameters
- Increase convergence threshold
- Check pseudopotential compatibility



## Missing output files


Check:


```bash
grep "JOB DONE" calculation.out
```


Make sure the previous calculation completed
successfully before continuing.

---

# 8. Analysis Notebook


The calculated electronic properties can be analyzed
using the provided Jupyter Notebook.


Open notebook:


[📓 Graphene Analysis Notebook](analysis/graphene_analysis.ipynb)


The notebook includes:


- Density of States (DOS) visualization

- Band structure visualization

- Electronic structure interpretation

---

---

# 9. HPC Workflow


The calculation workflow is executed on the HPC cluster
using Slurm job submission.


## Load Quantum ESPRESSO Environment


Before running the calculation, load the required
software environment:


```bash
module purge

module load gcc/12.2.0

module load openmpi4/4.1.4

module load materials/qe/7.2-openmpi
