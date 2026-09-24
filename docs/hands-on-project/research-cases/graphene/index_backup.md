# 🧪 Electronic Structure of Graphene


![Graphene Structure](../../../assets/images/research-cases/graphene.jpeg)



<div class="grid cards" markdown>


-   ⚛ **Material**

    ---

    Graphene


-   💻 **Method**

    ---

    Density Functional Theory (DFT)


-   🧮 **Software**

    ---

    Quantum ESPRESSO


-   📊 **Analysis**

    ---

    DOS and Band Structure


</div>


---


## Case Navigation


Follow the workflow:


```text
01  System Preparation

        ↓

02  SCF Calculation

        ↓

03  NSCF Calculation

        ↓

04  DOS Analysis

        ↓

05  Band Structure

        ↓

06  Visualization

        ↓

07  Results Interpretation
```


---


## Introduction


Graphene is a two-dimensional material composed of a
single layer of carbon atoms arranged in a hexagonal
lattice structure.


This research case demonstrates the workflow of
first-principles electronic structure calculations using
Quantum ESPRESSO.


Graphene is selected as a benchmark material because of
its simple crystal structure and well-known electronic
properties. Through this case study, participants will
learn how computational methods are applied to
investigate the electronic behavior of materials.



---


## Research Objective


The objective of this case study is to investigate the
electronic properties of graphene using Density
Functional Theory (DFT).


Participants will perform a complete electronic
structure workflow, including:


- Self-Consistent Field (SCF) calculation to obtain
  converged electronic density


- Non-Self-Consistent Field (NSCF) calculation to obtain
  electronic states


- Density of States (DOS) calculation to analyze the
  distribution of electronic states


- Band structure calculation to investigate electronic
  dispersion along high-symmetry k-points



---


## Computational Workflow


The graphene electronic structure workflow:


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


## System Preparation


Before performing electronic structure calculations,
the simulation environment and required input files
must be prepared.


This section describes the graphene system,
calculation software, and file organization used
throughout this case study.


---
## Material System


The material investigated in this case is a single-layer
graphene system.


| Parameter | Description |
|---|---|
| Material | Graphene |
| Element | Carbon (C) |
| Structure | Hexagonal lattice |
| Dimensionality | Two-dimensional material |
| Method | Density Functional Theory (DFT) |
| Software | Quantum ESPRESSO |



---


## Computational Method


The electronic properties of graphene are calculated
using Density Functional Theory (DFT).


The Kohn-Sham equations are solved within the
framework of DFT to obtain the electronic density
and eigenvalues of the system.


The calculation workflow uses:


```text
Quantum ESPRESSO

        ↓

Plane-Wave Basis Set

        ↓

Pseudopotential Approximation

        ↓

Electronic Structure Calculation
```



---


## Required Files


The graphene calculation requires several input files
for different calculation stages.


The recommended project structure:


```text
graphene/

├── input/

│   ├── graphene_scf.in

│   ├── graphene_nscf.in

│   ├── graphene_dos.in

│   ├── graphene_bands.in

│   └── graphene_bands_pp.in


├── pseudo/

│   └── C.UPF


├── output/

│   ├── graphene_scf.out

│   ├── graphene_nscf.out

│   └── graphene_bands.out


└── analysis/

    ├── graphene_analysis.ipynb
    └── graphene_analysis.py
```



---


## Software Requirement


The following software packages are required:


| Software | Function |
|---|---|
| Quantum ESPRESSO | First-principles calculation |
| pw.x | SCF, NSCF, and band calculation |
| dos.x | Density of States calculation |
| bands.x | Band structure post-processing |
| Python | Data analysis and visualization |



---


## Simulation Files


To reproduce this calculation,
participants can download the required
Quantum ESPRESSO input files.


### Input Files


<div class="grid cards" markdown>


-   📥 **SCF Input File**

    ---

    Prepare initial electronic density calculation.

    [Download graphene_scf.in](../../../assets/files/graphene/graphene_scf.in)


-   📥 **NSCF Input File**

    ---

    Calculate electronic states using dense k-points.

    [Download graphene_nscf.in](../../../assets/files/graphene/graphene_nscf.in)


-   📥 **DOS Input File**

    ---

    Generate density of states.

    [Download graphene_dos.in](../../../assets/files/graphene/graphene_dos.in)


-   📥 **Band Structure Input File**

    ---

    Calculate electronic bands.

    [Download graphene_bands.in](../../../assets/files/graphene/graphene_bands.in)


</div>


---
## SCF Calculation


### Overview


The Self-Consistent Field (SCF) calculation is the
first computational step in the graphene electronic
structure workflow.


The purpose of SCF calculation is to obtain a
self-consistent charge density and converged
Kohn-Sham electronic states.


The resulting charge density will be used as the
initial condition for further calculations, including
NSCF, DOS, and band structure calculations.



---


### SCF Input File


The SCF calculation is controlled by the input file:


```text
graphene_scf.in
```


The input file contains several important sections:


| Section | Function |
|---|---|
| CONTROL | Defines calculation settings and output directory |
| SYSTEM | Defines graphene atomic structure and calculation parameters |
| ELECTRONS | Controls electronic convergence parameters |
| ATOMIC_SPECIES | Defines carbon atomic information |
| ATOMIC_POSITIONS | Defines atomic coordinates |
| K_POINTS | Defines sampling points in reciprocal space |



---


### Running SCF Calculation


The calculation is performed using the `pw.x`
program from Quantum ESPRESSO.


Run:


```bash
pw.x -in graphene_scf.in > graphene_scf.out
```


The calculation output is stored in:


```text
graphene_scf.out
```



---


### Monitoring Calculation


During the calculation, the output file can be
monitored using:


```bash
tail -50 graphene_scf.out
```


This command displays the latest lines of the output
file and helps monitor the convergence process.



---


### Checking Convergence


A successful SCF calculation should reach
electronic convergence.


Check convergence status:


```bash
grep "convergence" graphene_scf.out
```


Expected output:


```text
convergence has been achieved
```



---


### Checking Total Energy


The final total energy can be extracted using:


```bash
grep "!" graphene_scf.out
```


Example output:


```text
!    total energy              =   -114.523 Ry
```



---


### SCF Result


After successful completion, the SCF calculation
provides:


✓ Converged charge density


✓ Total energy of the system


✓ Kohn-Sham orbitals


✓ Electronic information for NSCF calculation



---
## NSCF Calculation


### Overview


The Non-Self-Consistent Field (NSCF) calculation is
performed after the SCF calculation has reached
convergence.


Unlike SCF calculation, the NSCF calculation does not
update the charge density. Instead, it uses the
converged charge density from SCF to calculate
electronic states on a denser k-point grid.



---


### Purpose of NSCF Calculation


The main objectives of NSCF calculation are:


- Obtain electronic eigenvalues at additional
  k-points


- Prepare electronic information required for
  Density of States (DOS) calculation


- Provide accurate electronic states for further
  band analysis



---


### NSCF Input File


The NSCF calculation uses:


```text
graphene_nscf.in
```


Compared with SCF calculation, the main difference
is usually the k-point sampling.


A denser k-point grid is used to obtain better
resolution of electronic states.



---


### Running NSCF Calculation


The calculation is performed using `pw.x`:


```bash
pw.x -in graphene_nscf.in > graphene_nscf.out
```


The output file:


```text
graphene_nscf.out
```



---


### Monitoring NSCF Calculation


Monitor the calculation progress:


```bash
tail -50 graphene_nscf.out
```


Check the calculation status:


```bash
grep "JOB DONE" graphene_nscf.out
```


Expected output:


```text
JOB DONE.
```



---


### NSCF Result


After successful completion, the NSCF calculation
provides:


✓ Electronic eigenvalues


✓ Wavefunction information


✓ Dense k-point electronic states


✓ Data required for DOS and band structure analysis



---


## Density of States (DOS) Calculation


### Overview


Density of States (DOS) describes the number of
available electronic states at different energy
levels.


DOS analysis provides information about the electronic
structure of a material, including the distribution
of occupied and unoccupied states around the Fermi
level.


In graphene, DOS analysis helps understand the
characteristic electronic behavior originating from
its carbon-based hexagonal lattice.



---


### Purpose of DOS Calculation


The DOS calculation is performed to:


- Analyze the distribution of electronic states


- Identify electronic states near the Fermi level


- Understand the relationship between energy levels
  and available states


- Support interpretation of graphene electronic
  properties



---


### DOS Workflow


The DOS calculation uses the electronic information
obtained from the NSCF calculation.


```text
SCF Calculation

        ↓

NSCF Calculation

        ↓

DOS Calculation

        ↓

DOS Visualization
```



---


### DOS Input File


The DOS calculation uses:


```text
graphene_dos.in
```


The input file defines parameters for generating
the density of states from previously calculated
electronic states.



---


### Running DOS Calculation


The DOS calculation is performed using the
`dos.x` post-processing tool.


Run:


```bash
dos.x -in graphene_dos.in > graphene_dos.out
```


The output file:


```text
graphene_dos.out
```



---


### DOS Output


After successful calculation, DOS data are generated:


```text
graphene_dos.dat
```


The generated data contain:


| Data | Description |
|---|---|
| Energy | Electronic energy level |
| DOS | Density of electronic states |



---


### Visualizing DOS


The DOS data can be visualized using Python,
Gnuplot, or other scientific visualization tools.


Example workflow:


```text
DOS Data

        ↓

Read Data

        ↓

Plot DOS Curve

        ↓

Analyze Electronic States
```



---


### Expected Result


The DOS plot provides information about:


✓ Distribution of electronic states


✓ Electronic states near the Fermi level


✓ General electronic characteristics of graphene


The DOS result will be combined with the band
structure calculation to obtain a complete picture
of graphene electronic properties.



---
## Band Structure Calculation


### Overview


Band structure calculation describes the relationship
between electron energy and crystal momentum along
specific paths in the Brillouin zone.


For graphene, the band structure is particularly
important because it reveals the characteristic
electronic dispersion around the Dirac point.


The calculation is performed along high-symmetry
k-points in the Brillouin zone.



---


### High-Symmetry k-Path


The graphene band structure is calculated along the
following high-symmetry path:


```text
Γ  →  K  →  M  →  Γ
```


These points represent important locations in the
reciprocal space of the graphene crystal lattice.



---


### Band Calculation Workflow


The band structure calculation consists of two steps:


```text
NSCF Electronic States

        ↓

Band Calculation

        ↓

Band Post Processing

        ↓

Band Visualization
```



---


### Band Input File


The first calculation uses:


```text
graphene_bands.in
```


This input file defines the k-point path required
for calculating electronic bands along high-symmetry
directions.



---


### Running Band Calculation


The band calculation is performed using `pw.x`:


```bash
pw.x -in graphene_bands.in > graphene_bands.out
```


The output file:


```text
graphene_bands.out
```



---


### Band Post Processing


After the band calculation, the electronic bands
must be collected and prepared for visualization.


The post-processing step uses:


```text
graphene_bands_pp.in
```


Run:


```bash
bands.x -in graphene_bands_pp.in > graphene_bands_pp.out
```



---


### Generated Band Data


The post-processing step produces band data that
can be used for plotting.


Typical output:


```text
graphene_bands.dat.gnu
```


The data contain:


| Parameter | Description |
|---|---|
| k-point | Position along reciprocal space path |
| Energy | Electronic eigenvalue |



---


## Visualization and Data Analysis
---

## HPC Execution Workflow


The electronic structure calculation is performed on an
HPC cluster using Slurm job submission.


Before running the calculation, load the Quantum
ESPRESSO environment:


```bash
module purge

module load gcc/12.2.0

module load openmpi4/4.1.4

module load materials/qe/7.2-openmpi


### Overview


The output files generated from Quantum ESPRESSO
contain numerical information about the electronic
structure of graphene.


To interpret the simulation results, the calculated
data are processed and visualized using Python.


The visualization step converts numerical output into
scientific plots, including DOS and band structure
graphs.



---


### Python Environment


The analysis can be performed using a Python
environment with the following packages:


| Package | Function |
|---|---|
| NumPy | Numerical data processing |
| Matplotlib | Scientific visualization |
| Jupyter Notebook | Interactive analysis environment |



Install required packages:


```bash
pip install numpy matplotlib jupyter
```



---


### Band Structure Visualization Workflow


The plotting process follows:


```text
Read Band Data

        ↓

Extract k-points

        ↓

Reshape Band Energies

        ↓

Define High-Symmetry Points

        ↓

Generate Band Plot
```



---


### Python Example: Band Structure Plot


Create a notebook:


```text
graphene_analysis.ipynb
```


Import required libraries:


```python
import numpy as np
import matplotlib.pyplot as plt
```


Load band structure data:


```python
data = np.loadtxt(
    '../output/graphene_bands.dat.gnu'
)
```


Extract k-point and energy information:


```python
k = np.unique(data[:,0])

bands = np.reshape(
    data[:,1],
    (-1,len(k))
)
```


Plot electronic bands:


```python
for band in range(len(bands)):

    plt.plot(
        k,
        bands[band,:],
        linewidth=1
    )
```



---


### High-Symmetry Point Labels


The graphene band structure is plotted along:


```text
Γ → K → M → Γ
```


Example:


```python
plt.xticks(
    ticks=[0,0.6667,1,1.5774],
    labels=[
        'Γ',
        'K',
        'M',
        'Γ'
    ]
)
```



---


## Results and Discussion


### Electronic Structure Analysis


The final stage of this case study is to interpret
the electronic structure results obtained from
Quantum ESPRESSO calculations.


The DOS and band structure plots provide information
about the electronic states and energy dispersion
of graphene.



---


### Density of States Analysis


The DOS plot represents the number of available
electronic states at different energy levels.


Important aspects to analyze:


- Distribution of electronic states around the
  Fermi level


- Difference between occupied and unoccupied states


- Contribution of electronic states near the
  energy region of interest



For graphene, the DOS behavior reflects the
characteristic electronic structure originating from
the carbon hexagonal lattice.



---


### Band Structure Analysis


The band structure plot shows the relationship
between electron energy and crystal momentum.


The main features to observe are:


| Feature | Description |
|---|---|
| Valence Band | Electronic states below the Fermi level |
| Conduction Band | Electronic states above the Fermi level |
| Band Crossing | Interaction between valence and conduction bands |
| High Symmetry Points | Important locations in reciprocal space |



---


### Dirac Point in Graphene


One of the most important characteristics of
graphene is the presence of the Dirac point.


The Dirac point occurs at the K point in the
Brillouin zone, where the valence band and conduction
band meet.


This behavior results in the unique electronic
properties of graphene.


```text
Conduction Band

        \

         \

          ●  Dirac Point

         /

        /

Valence Band
```



---


### Summary


Through this case study, participants have completed
a complete first-principles workflow for graphene:


✓ Prepared graphene simulation system


✓ Performed SCF calculation


✓ Performed NSCF calculation


✓ Generated DOS data


✓ Calculated band structure


✓ Visualized and interpreted electronic properties



This workflow represents a typical computational
materials science approach for investigating
electronic properties of two-dimensional materials.


---

