# 🧪 Electronic Structure of Graphene


<img src="../../../assets/images/research-cases/graphene.jpg" width="450">


Graphene is a two-dimensional carbon material used as a
benchmark system for electronic structure simulation.

This hands-on case demonstrates Density Functional Theory (DFT)
calculation using Quantum ESPRESSO on HPC.


<div class="grid cards" markdown>


- ⚛️ **Material**

    Graphene


- 🧮 **Method**

    DFT


- 💻 **Software**

    Quantum ESPRESSO


- 📊 **Analysis**

    DOS & Band Structure


</div>


---

# 🚀 Calculation Workflow


The graphene electronic structure calculation follows a
complete first-principles workflow:


```mermaid
flowchart TD

A[Graphene Structure]
--> B[SCF Calculation]

B --> C[NSCF Calculation]

C --> D[DOS Analysis]

C --> E[Band Structure Analysis]

D --> F[Python Visualization]

E --> F
```

---


# ⚙️ Calculation Steps


## 1. SCF Calculation


The SCF calculation is performed to obtain the
converged electronic density of graphene.


**Input file**

```text
graphene_scf.in
```


**Run calculation**

```bash
bash scripts/submit_qe.sh graphene_scf
```


**Output**

```text
output/graphene_scf.out
```


Check calculation completion:


```bash
grep "JOB DONE" output/graphene_scf.out
```


---


## 2. NSCF Calculation


The NSCF calculation generates electronic states
using denser k-point sampling.


**Input file**

```text
graphene_nscf.in
```


**Run calculation**

```bash
bash scripts/submit_qe.sh graphene_nscf
```


**Output**

```text
output/graphene_nscf.out
```


---


## 3. DOS Analysis


The Density of States (DOS) calculation analyzes
the distribution of electronic states.


**Run calculation**

```bash
bash scripts/submit_post.sh graphene_dos dos.x
```


**Output**

```text
output/graphene_dos.dat
```


---


## 4. Band Structure Analysis


The electronic band structure is calculated along
the high-symmetry path:


```text
Γ → K → M → Γ
```


**Run calculation**

```bash
bash scripts/submit_qe.sh graphene_bands
```


**Post-processing**

```bash
bash scripts/submit_post.sh graphene_bands_pp bands.x
```


**Output**

```text
output/graphene_bands.dat.gnu
```


---


# 📓 Python Analysis


The simulation results are visualized using Python
to analyze Density of States (DOS) and band structure.


Open the analysis notebook:


[📓 Graphene Analysis Notebook](analysis/graphene_analysis.ipynb)


---
# 📂 Simulation Files


Download the input files required for the graphene calculation workflow.


| File | Type | Purpose | Download |
|---|---|---|---|
| `graphene_scf.in` | SCF Input | Electronic density calculation | [:material-download: Download](input/graphene_scf.in) |
| `graphene_nscf.in` | NSCF Input | Electronic states calculation | [:material-download: Download](input/graphene_nscf.in) |
| `graphene_dos.in` | DOS Input | Density of states calculation | [:material-download: Download](input/graphene_dos.in) |
| `graphene_bands.in` | Band Input | Band structure calculation | [:material-download: Download](input/graphene_bands.in) |
| `graphene_bands_pp.in` | Post Processing | Band visualization preparation | [:material-download: Download](input/graphene_bands_pp.in) |
| `graphene_analysis.ipynb` | Notebook | Python visualization and analysis | [:material-download: Download](analysis/graphene_analysis.ipynb) |

---

## Next Step

Continue with Python analysis:

[📓 Open Graphene Analysis Notebook](analysis/graphene_analysis.ipynb)
