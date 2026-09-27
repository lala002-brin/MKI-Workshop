<span class="section-label">COMPUTATIONAL MATERIALS CASE STUDY</span>

# 🔋 Graphene/Ionic Liquid Interface Simulation


<div class="hero-description">

Atomic-scale simulation of an electrode-electrolyte interface
using graphene as a model electrode surface and ionic liquid
as the battery electrolyte environment.

</div>

<span class="section-label">CASE OVERVIEW</span>

!!! abstract "Case Overview"

    This hands-on case extends graphene electronic structure
    simulation into a battery electrode-electrolyte interface model.

    Graphene is used as a conductive electrode surface, while
    ionic liquid represents the electrolyte environment.

    The workflow combines Quantum ESPRESSO, PACKMOL, LAMMPS,
    and Python-based analysis.

<div class="hero-image">

<img src="images/interface_overview.png" width="900">

<p align="center">
<em>
Atomic-scale representation of graphene electrode and ionic liquid
electrolyte interface used in molecular simulation.
</em>
</p>

</div>

<div class="grid cards" markdown>


- **🧱 Material System**

    **Graphene Electrode**

    Model conductive surface
    for battery electrode interface.

    **Electrolyte**

    Ionic liquid environment
    surrounding the electrode.


- **🧮 Computational Method**

    **DFT**

    Quantum ESPRESSO is used
    for graphene structure optimization.

    **MD**

    LAMMPS is used to study
    interface evolution.


- **💻 Simulation Tools**

    **Quantum ESPRESSO**

    Electronic structure calculation

    **PACKMOL**

    Interface construction

    **LAMMPS**

    Molecular dynamics


- **📈 Analysis**

    **Structural**

    RDF and density profile

    **Dynamic**

    Ion distribution and diffusion


</div>
<span class="section-label">SCIENTIFIC MOTIVATION</span>

## 🔬 Research Question


This simulation investigates how ionic liquid species organize and
interact near a graphene electrode surface.


The main questions explored are:


- How are ions distributed near the graphene surface?
- How do electrolyte molecules interact with the electrode?
- How does the interface structure evolve during molecular dynamics?

<span class="section-label">LEARNING GOALS</span>

## 🎯 Learning Objectives


After completing this case, participants will understand the complete
workflow of graphene-based electrode-electrolyte interface simulation.


The participants will learn how to:


| Objective | Description |
|---|---|
| Model | Understand graphene as an electrode surface model |
| Construct | Build graphene and ionic liquid interface structures |
| Simulate | Perform molecular dynamics simulation of the interface |
| Analyze | Extract structural properties from simulation results |

<span class="section-label">MODEL DESCRIPTION</span>

## 🧩 System Overview

The simulated system represents an electrode-electrolyte interface,
where ionic liquid molecules interact with a graphene electrode surface.


The model consists of three main regions:


```mermaid
flowchart TB

A["Ionic Liquid Electrolyte<br><br>Li+ ions<br>Cations<br>Anions"]

B["Electrode-Electrolyte Interface<br><br>Ion organization<br>Surface interaction"]

C["Graphene Electrode<br><br>Carbon atomic layers"]

D["Vacuum Region<br><br>Surface boundary condition"]


A --> B
B --> C
C --> D


classDef electrolyte fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;
classDef interface fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
classDef electrode fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
classDef vacuum fill:#eeeeee,stroke:#616161,stroke-width:2px;


class A electrolyte;
class B interface;
class C electrode;
class D vacuum;

```

| Region | Role in Simulation |
|---|---|
| Ionic Liquid Layer | Represents electrolyte environment containing mobile ionic species |
| Interface Region | Captures ion arrangement and electrode-electrolyte interactions |
| Graphene Electrode | Represents conductive battery electrode surface |
| Vacuum Region | Provides surface boundary condition for atomic simulation |

The graphene structure from the previous electronic structure case
is reused as the electrode foundation before introducing the ionic
liquid electrolyte.

<span class="section-label">SIMULATION DESIGN</span>

## 🚀 Simulation Workflow


The simulation workflow connects material preparation,

interface construction, molecular dynamics simulation,

and data analysis into a complete computational pipeline.


```mermaid
flowchart LR

A["01<br>GRAPHENE<br>Surface Preparation"]

B["02<br>QUANTUM ESPRESSO<br>Geometry Optimization"]

C["03<br>PACKMOL<br>Interface Construction"]

D["04<br>LAMMPS<br>Molecular Dynamics"]

E["05<br>PYTHON<br>Interface Analysis"]


A --> B
B --> C
C --> D
D --> E


classDef graphene fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;

classDef qe fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;

classDef md fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;

classDef analysis fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;


class A graphene;
class B qe;
class C qe;
class D md;
class E analysis;

```

| Stage | Main Activity | Output |
|---|---|---|
| 01 | Prepare graphene electrode structure | Graphene model |
| 02 | Optimize graphene geometry using QE | Stable surface structure |
| 03 | Add ionic liquid electrolyte using PACKMOL | Interface configuration |
| 04 | Simulate atomic evolution using LAMMPS | MD trajectory |
| 05 | Analyze interface properties | Structural information |

<span class="section-label">COMPUTATIONAL METHOD</span>

## ⚙️ Simulation Procedure


The complete simulation workflow consists of four computational
stages, starting from electrode preparation to interface property
analysis.


---

### 🔹 Stage 01 — Graphene Electrode Preparation


<span class="section-label">OBJECTIVE</span>

Prepare a stable graphene surface model as the electrode foundation.


<span class="section-label">INPUT</span>

```text
Graphene atomic structure
Quantum ESPRESSO parameters
Pseudopotential file
```


<span class="section-label">PROCESS</span>

```text
Initial graphene structure

        ↓

Quantum ESPRESSO relaxation

        ↓

Optimized graphene surface
```


<span class="section-label">OUTPUT</span>

```text
optimized_graphene structure
```


---

### 🔹 Stage 02 — Ionic Liquid Interface Construction


<span class="section-label">OBJECTIVE</span>

Generate an initial electrode-electrolyte interface configuration.


<span class="section-label">INPUT</span>

```text
Optimized graphene surface

+

Ionic liquid molecules
```


<span class="section-label">PROCESS</span>

```text
Graphene surface

        +

Ionic liquid molecules

        ↓

PACKMOL structure generation

        ↓

Interface configuration
```


<span class="section-label">OUTPUT</span>

```text
interface.xyz
```


---

### 🔹 Stage 03 — Molecular Dynamics Simulation


<span class="section-label">OBJECTIVE</span>

Observe atomic movement and structural evolution
of the graphene-electrolyte interface.


<span class="section-label">INPUT</span>

```text
Interface structure

LAMMPS parameter files
```


<span class="section-label">PROCESS</span>

```text
Energy minimization

        ↓

Equilibration

        ↓

Production molecular dynamics
```


<span class="section-label">OUTPUT</span>

```text
trajectory.lammpstrj
```


---

### 🔹 Stage 04 — Interface Analysis


<span class="section-label">OBJECTIVE</span>

Extract structural and dynamic properties
from molecular dynamics results.


<span class="section-label">ANALYSIS</span>

| Property | Method |
|---|---|
| Ion distribution | Density profile |
| Molecular interaction | RDF |
| Local coordination | Coordination number |
| Ion mobility | MSD / Diffusion coefficient |


<span class="section-label">OUTPUT</span>

```text
Interface structural properties
```

---

<span class="section-label">EXPECTED RESULTS</span>

## 📊 Simulation Outputs


The simulation produces structural, dynamic, and interfacial
properties to understand the behavior of the graphene-electrolyte
interface at the atomic scale.


<div class="grid cards" markdown>


- **🧱 Structural Information**

    Atomic configuration of graphene
    and ionic liquid interface.

    **Generated from**

    - PACKMOL
    - LAMMPS trajectory
    - OVITO visualization


- **🌊 Ion Distribution**

    Spatial arrangement of ions
    near graphene surface.

    **Analysis**

    - Density profile
    - Concentration distribution


- **🔗 Molecular Interaction**

    Interaction between graphene
    and electrolyte species.

    **Analysis**

    - Radial Distribution Function (RDF)
    - Coordination Number


- **⚡ Ion Transport**

    Dynamic behavior of ionic species
    during molecular dynamics.

    **Analysis**

    - Mean Square Displacement (MSD)
    - Diffusion coefficient


</div>


<span class="section-label">SOFTWARE ENVIRONMENT</span>

## 🖥️ Computational Tools


The workflow combines electronic structure calculation,
interface construction, molecular dynamics simulation,
and post-processing analysis using several computational tools.


```mermaid
flowchart LR

A["Quantum ESPRESSO<br><br>DFT Calculation"]

B["PACKMOL<br><br>Interface Construction"]

C["LAMMPS<br><br>Molecular Dynamics"]

D["OVITO<br><br>Atomic Visualization"]

E["Python<br><br>Data Analysis"]


A --> B
B --> C
C --> D
C --> E


classDef dft fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
classDef structure fill:#fffde7,stroke:#f9a825,stroke-width:2px;
classDef md fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
classDef analysis fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;


class A dft;
class B structure;
class C md;
class D analysis;
class E analysis;

```


| Software | Function in Workflow |
|---|---|
| Quantum ESPRESSO | Optimizes graphene structure and calculates electronic properties |
| PACKMOL | Generates initial graphene-electrolyte interface configuration |
| LAMMPS | Performs molecular dynamics simulation of interface evolution |
| OVITO | Visualizes atomic structures and simulation trajectories |
| Python | Calculates RDF, density profile, and transport properties |

<div class="grid cards" markdown>

- **Quantum ESPRESSO**

    Graphene optimization  
    and electronic structure input

    <a class="md-button md-button--primary" href="qe/scf.in">
    Download QE
    </a>


- **LAMMPS**

    Molecular dynamics  
    interface simulation input

    <a class="md-button md-button--primary" href="lammps/in.lammps">
    Download LAMMPS
    </a>


- **Python Analysis**

    Interface analysis  
    and visualization notebook

    <a class="md-button md-button--primary" href="analysis/interface_analysis.ipynb">
    Download Notebook
    </a>

</div>
<span class="section-label">EXPECTED OUTCOMES</span>

## 📈 Expected Results


After completing the workflow, participants will obtain
simulation data describing the structural and dynamic behavior
of the graphene-electrolyte interface.


```mermaid
flowchart LR

A["Optimized Graphene<br><br>QE"]

B["Interface Configuration<br><br>PACKMOL"]

C["MD Trajectory<br><br>LAMMPS"]

D["Structural Analysis<br><br>Python"]

E["Interface Properties<br><br>Scientific Interpretation"]


A --> B
B --> C
C --> D
D --> E


classDef qe fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
classDef structure fill:#fffde7,stroke:#f9a825,stroke-width:2px;
classDef md fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
classDef analysis fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;


class A qe;
class B structure;
class C md;
class D analysis;
class E analysis;

```


The main simulation outputs include:


| Output | Description | Analysis Method |
|---|---|---|
| Optimized graphene structure | Stable electrode surface configuration | Quantum ESPRESSO |
| Interface configuration | Initial graphene and ionic liquid arrangement | PACKMOL |
| MD trajectory | Atomic movement during simulation | LAMMPS |
| Density profile | Spatial distribution of ions near surface | Python |
| RDF curve | Interaction between atomic species | Python |
| Diffusion behavior | Ion mobility information | MSD analysis |

## 📓 Analysis Notebook


The simulation trajectory and interface properties are analyzed
using Python.


The notebook includes:


- Trajectory visualization
- Density profile calculation
- Radial Distribution Function (RDF)
- Interface structure analysis


Download:

[Interface Analysis Notebook](analysis/interface_analysis.ipynb)

<span class="section-label">RESOURCES</span>

## 📂 Simulation Files


The repository contains all input files required to reproduce
the graphene/ionic liquid interface simulation workflow.


```text
graphene-ionic-liquid-interface/

├── qe/
│   ├── graphene_surface.in
│   │   Graphene geometry optimization input
│   │
│   ├── scf.in
│   │   Electronic structure calculation
│   │
│   └── pseudo/
│       Quantum ESPRESSO pseudopotential files
│
├── packmol/
│   ├── packmol.inp
│   │   Interface construction parameters
│   │
│   └── interface.xyz
│       Initial graphene-electrolyte structure
│
├── lammps/
│   ├── data.interface
│   │   Atomic configuration for MD
│   │
│   └── in.lammps
│       Molecular dynamics input
│
├── scripts/
│   ├── submit_qe.sh
│   │   HPC submission script for QE
│   │
│   └── submit_lammps.sh
│       HPC submission script for LAMMPS
│
└── analysis/
    └── interface_analysis.ipynb
        Python-based interface analysis
```


### Download Resources


<span class="section-label">RESOURCE ACCESS</span>

## 📥 Quick Access


The following resources provide the essential files required
to reproduce the graphene/ionic liquid interface workflow.


<div class="grid cards" markdown>


- **⚛️ Quantum ESPRESSO**

    Graphene surface optimization
    and electronic structure calculation.

    Files:

    - `graphene_surface.in`
    - `scf.in`

    <br>

    <a class="md-button md-button--primary" href="qe/graphene_surface.in">
    Download QE Input
    </a>


- **🧩 PACKMOL**

    Initial electrode-electrolyte
    interface construction.

    Files:

    - `packmol.inp`
    - `interface.xyz`

    <br>

    <a class="md-button md-button--primary" href="packmol/packmol.inp">
    Download PACKMOL
    </a>


- **🌊 LAMMPS**

    Molecular dynamics simulation
    of interface evolution.

    Files:

    - `data.interface`
    - `in.lammps`

    <br>

    <a class="md-button md-button--primary" href="lammps/in.lammps">
    Download LAMMPS
    </a>


- **📊 Analysis Notebook**

    Python workflow for analysing
    interface properties.

    Includes:

    - RDF
    - Density profile
    - Ion distribution

    <br>

    <a class="md-button md-button--primary" href="analysis/interface_analysis.ipynb">
    Download Notebook
    </a>


</div>

<span class="section-label">PREVIOUS CASE CONNECTION</span>

## 🔗 Connection with Graphene Electronic Structure Case


This case extends the previous graphene electronic structure
simulation by transforming an isolated graphene model into a
realistic electrode-electrolyte interface system.


The computational progression follows:


```mermaid
flowchart TD

A["Previous Case<br><br>Graphene Electronic Structure"]

B["Quantum ESPRESSO<br><br>Electronic Properties"]

C["Graphene Electrode Model<br><br>Surface Structure"]

D["Graphene + Ionic Liquid<br><br>Interface Construction"]

E["Battery Interface Simulation<br><br>MD and Analysis"]


A --> B
B --> C
C --> D
D --> E


classDef previous fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;
classDef qe fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
classDef interface fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
classDef final fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;


class A previous;
class B qe;
class C previous;
class D interface;
class E final;

```


The relationship between both cases can be summarized as:


| Previous Graphene Case | Graphene/Ionic Liquid Interface Case |
|---|---|
| Study graphene electronic properties | Study electrode-electrolyte interactions |
| Single material system | Multicomponent interface system |
| Quantum ESPRESSO calculation | QE + PACKMOL + LAMMPS workflow |
| Atomic structure analysis | Interface dynamics and ion behavior |
