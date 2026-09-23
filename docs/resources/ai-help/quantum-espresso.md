# ⚛ Quantum ESPRESSO Assistant


## First-Principles Calculation Guide


Quantum ESPRESSO is an open-source package
used for first-principles calculations based on
Density Functional Theory (DFT).


This guide provides basic support for preparing,
running, and checking Quantum ESPRESSO calculations.



---


## Computational Workflow


A typical Quantum ESPRESSO workflow:


```text
Structure Preparation

        ↓

Input File Preparation

        ↓

SCF Calculation

        ↓

NSCF Calculation

        ↓

Post Processing

        ↓

Data Analysis
```



---


## Required Files


Before running a calculation,
prepare:


```text
project/

├── input/

│   └── scf.in


├── pseudo/

│   └── potential.UPF


└── output/

    └── scf.out
```



---


## Main Calculation Types


| Calculation | Purpose |
|---|---|
| SCF | Obtain self-consistent charge density |
| NSCF | Calculate electronic states |
| DOS | Analyze density of states |
| Bands | Calculate electronic band structure |
---


## SCF Calculation


The Self-Consistent Field (SCF) calculation
is the first step to obtain the converged
electronic density of a system.



---


### Run SCF Calculation


The SCF calculation is performed using
the `pw.x` program.


Command:


```bash
pw.x -in scf.in > scf.out
```



Input file:


```text
scf.in
```


Output file:


```text
scf.out
```



---


### Check SCF Result


After calculation finishes,
check the total energy:


```bash
grep "!" scf.out
```


Example output:


```text
!    total energy              =   -114.523 Ry
```



---


## NSCF Calculation


The Non-Self-Consistent Field (NSCF)
calculation is used to obtain additional
electronic states.


It usually follows an SCF calculation.



---


### Run NSCF Calculation


Command:


```bash
pw.x -in nscf.in > nscf.out
```



Input file:


```text
nscf.in
```


Output file:


```text
nscf.out
```



---


## Calculation Monitoring


During a running calculation,
monitor the output file:


```bash
tail -50 scf.out
```


Look for:

```text
convergence has been achieved
```


This indicates that the SCF calculation
has reached convergence.
---


## Density of States (DOS)


Density of States (DOS) analysis describes
the number of available electronic states
at different energy levels.


DOS calculations are useful for understanding
electronic properties of materials.



---


### DOS Calculation Workflow


The general workflow:


```text
SCF Calculation

        ↓

NSCF Calculation

        ↓

DOS Calculation

        ↓

Data Visualization
```



---


### Run DOS Calculation


The DOS calculation uses the `dos.x`
post-processing tool.


Command:


```bash
dos.x -in dos.in > dos.out
```



Input file:


```text
dos.in
```


Output file:


```text
dos.out
```



---


## Band Structure Calculation


Band structure calculations show
the relationship between electronic energy
and crystal momentum.


They are commonly used to identify:

- Band gap
- Metallic behavior
- Electronic dispersion



---


### Band Structure Workflow


```text
SCF Calculation

        ↓

NSCF Calculation

        ↓

Band Calculation

        ↓

Band Post Processing

        ↓

Plot Result
```



---


### Run Band Calculation


Calculate bands:


```bash
pw.x -in bands.in > bands.out
```



Post-processing:


```bash
bands.x -in bands_pp.in > bands_pp.out
```



---


## Result Analysis


Common outputs:


| Analysis | Output |
|---|---|
| DOS | Density of electronic states |
| Band Structure | Energy dispersion |
| SCF | Total energy and charge density |
| NSCF | Electronic states |
---


## Common Problems


Understanding common errors helps
participants troubleshoot calculations
more effectively.



---

## Problem: Missing Pseudopotential File


Error example:


```text
cannot find pseudopotential file
```


Possible causes:

- Incorrect pseudopotential filename
- Wrong `pseudo_dir` path
- Missing UPF file


Check:

```text
pseudo_dir='./pseudo/'
```


Verify the pseudopotential folder:


```bash
ls pseudo/
```



---


## Problem: Calculation Does Not Converge


Error example:


```text
convergence NOT achieved
```


Possible causes:

- Insufficient number of iterations
- Incorrect convergence threshold
- Poor initial structure


Check the output:


```bash
tail -50 scf.out
```



Possible solutions:

- Adjust convergence parameters
- Increase iteration limit
- Check input settings



---


## Problem: Wrong Input File


Before running calculations,
check:


```text
✓ Material structure is correct

✓ Atomic positions are valid

✓ Pseudopotential is available

✓ Cutoff energy is appropriate

✓ K-point settings are prepared
```



---


## Quantum ESPRESSO Workflow Checklist


Before calculation:


```text
Structure

        ↓

Input File

        ↓

Pseudopotential

        ↓

SCF Calculation

        ↓

NSCF Calculation

        ↓

Post Processing

        ↓

Analysis
```



---


## AI Troubleshooting Template


When asking AI about a Quantum ESPRESSO problem,
provide:


```text
Software:

Quantum ESPRESSO version:

Calculation type:

Input file:

Command executed:

Error message:

Output file:

Expected result:
```


Complete information helps identify
calculation problems faster.
