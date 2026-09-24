# 🚀 HPC Environment Setup


Before running the graphene calculation, prepare the
Quantum ESPRESSO environment on the HPC cluster.


## Load Quantum ESPRESSO Environment


```bash
module purge

module load gcc/12.2.0

module load openmpi4/4.1.4

module load materials/qe/7.2-openmpi
```


## Check Environment


Verify that Quantum ESPRESSO is available:


```bash
pw.x -version
```


Expected output:

```text
Quantum ESPRESSO version 7.2
```


## Calculation Workflow


After the environment is ready, continue with:


```text
HPC Setup

      ↓

SCF Calculation

      ↓

NSCF Calculation

      ↓

DOS Calculation

      ↓

Band Structure
```


## Next Step


Continue to:

➡️ SCF Calculation
