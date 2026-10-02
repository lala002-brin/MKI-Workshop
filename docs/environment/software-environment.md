# Software Environment

<div class="environment-hero environment-hero-compact">

<div class="environment-eyebrow">
SOFTWARE & COMPUTING ENVIRONMENT
</div>

<h1>
Prepare Your Software Environment
</h1>

<p class="environment-description">
Before running a calculation, make sure the required compiler,
libraries, scientific software, and runtime environment are
available on the HPC system.
</p>

<div class="environment-tags">
<span>MODULES</span>
<span>COMPILERS</span>
<span>MPI</span>
<span>CUDA</span>
<span>VERIFY</span>
</div>

</div>

---

## Why the Environment Matters

<p class="section-description">
Scientific applications depend on specific software versions,
libraries, compilers, and hardware resources. A calculation may
fail even when the input file is correct if the required software
environment is not available.
</p>

<div class="execution-pipeline">

<div>
<span>01</span>
<p>Identify</p>
</div>

<div>→</div>

<div>
<span>02</span>
<p>Load</p>
</div>

<div>→</div>

<div>
<span>03</span>
<p>Check</p>
</div>

<div>→</div>

<div>
<span>04</span>
<p>Run</p>
</div>

</div>

---

# 01 · Quick Start

<p class="section-description">
Start by checking which software is available on the cluster.
The exact module names depend on the HPC environment.
</p>

<div class="quickstart">

<div class="quickstart-step">

<span>01</span>

<div>
<strong>List available modules</strong>

<code>module avail</code>
</div>

</div>

<div class="quickstart-step">

<span>02</span>

<div>
<strong>Search for software</strong>

<code>module spider quantum-espresso</code>
</div>

</div>

<div class="quickstart-step">

<span>03</span>

<div>
<strong>Load the software</strong>

<code>module load quantum-espresso</code>
</div>

</div>

<div class="quickstart-step">

<span>04</span>

<div>
<strong>Check the executable</strong>

<code>which pw.x</code>
</div>

</div>

<div class="quickstart-step">

<span>05</span>

<div>
<strong>Check the version</strong>

<code>pw.x -h</code>
</div>

</div>

<div class="quickstart-step">

<span>06</span>

<div>
<strong>Inspect loaded modules</strong>

<code>module list</code>
</div>

</div>

</div>

> **Important:** module names and available versions depend on the
> configuration of your HPC system.

---

# 02 · Understanding Environment Modules

<p class="section-description">
HPC systems commonly use environment modules to provide different
versions of scientific software without permanently changing the
user environment.
</p>

## List Available Software

```bash
module avail
```

This displays modules that are currently available.

Search for a particular application:

```bash
module spider lammps
```

or:

```bash
module avail lammps
```

The exact command depends on the module system installed on the
cluster.

## Load a Module

For example:

```bash
module load quantum-espresso
```

Then inspect the environment:

```bash
module list
```

## Remove a Module

```bash
module unload quantum-espresso
```

To clear loaded modules when supported:

```bash
module purge
```

---

# 03 · Check the Software Environment

<p class="section-description">
Always verify the environment before submitting a production job.
This helps distinguish software configuration problems from input
or scientific problems.
</p>

## Check the Executable

For Quantum ESPRESSO:

```bash
which pw.x
```

For LAMMPS:

```bash
which lmp
```

For Python:

```bash
which python
```

## Check the Version

Python:

```bash
python --version
```

LAMMPS:

```bash
lmp -h
```

Quantum ESPRESSO:

```bash
pw.x -h
```

Some applications use different commands for reporting their
version. Check the software documentation when necessary.

## Inspect the Environment

```bash
module list
```

Check the compiler:

```bash
which gcc
```

Check MPI:

```bash
which mpirun
```

Check the environment path:

```bash
echo $PATH
```

---

# 04 · Compilers

<p class="section-description">
Compilers convert source code into executable programs. Scientific
applications may depend on a particular compiler family or version.
</p>

Common compiler commands include:

```bash
gcc --version
```

```bash
g++ --version
```

```bash
gfortran --version
```

Check which compiler is currently active:

```bash
which gcc
```

```bash
which gfortran
```

A module system may provide several compiler versions:

```bash
module avail gcc
```

For example:

```bash
module load gcc
```

The exact version and module name depend on the cluster.

---

# 05 · MPI

<p class="section-description">
MPI enables parallel execution across multiple processes. Many
HPC applications use MPI to distribute computational work across
CPU cores or nodes.
</p>

Check whether MPI is available:

```bash
which mpirun
```

Check the MPI version:

```bash
mpirun --version
```

List MPI-related modules:

```bash
module avail mpi
```

A typical environment may require:

```bash
module load mpi
```

Then verify:

```bash
module list
```

> **Do not assume that every application uses the same MPI
> implementation.** Use the software environment recommended for
> the application and HPC system.

---

# 06 · GPU Environment

<p class="section-description">
GPU-enabled applications require compatible GPU hardware,
drivers, libraries, and application builds.
</p>

Check whether the system provides NVIDIA GPU information:

```bash
nvidia-smi
```

Check CUDA modules:

```bash
module avail cuda
```

Load CUDA when required:

```bash
module load cuda
```

Verify:

```bash
nvcc --version
```

A GPU application may also require a specific CUDA version or
additional libraries.

> **GPU availability depends on the selected partition or node.
> Loading CUDA alone does not guarantee that a GPU is allocated
> to the job.**

---

# 07 · Python Environment

<p class="section-description">
Python workflows often require packages that are not part of the
system installation. Use the environment recommended by the HPC
administrator or project documentation.
</p>

Check Python:

```bash
python --version
```

Check its location:

```bash
which python
```

Check installed packages:

```bash
python -m pip list
```

Check a specific package:

```bash
python -m pip show numpy
```

For a virtual environment:

```bash
python -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Then verify:

```bash
which python
```

Deactivate when finished:

```bash
deactivate
```

> **Cluster policy matters.** Some HPC systems provide Conda,
> virtual environments, containers, or centrally managed Python
> environments instead of allowing arbitrary installations.

---

# 08 · Build a Reproducible Environment

<p class="section-description">
Record the software environment used for a calculation so that
the workflow can be reproduced later.
</p>

Check loaded modules:

```bash
module list
```

Save the module list when supported:

```bash
module list 2>&1 | tee environment.txt
```

Record compiler information:

```bash
gcc --version | tee -a environment.txt
```

Record Python information:

```bash
python --version | tee -a environment.txt
```

Record the current location:

```bash
pwd | tee -a environment.txt
```

The resulting file can help document the computational environment
used for the calculation.

---

# 09 · Test Before Production

<p class="section-description">
Do not begin with a large production calculation. First confirm
that the software environment works with a small test.
</p>

Use this workflow:

```text
LOAD SOFTWARE
      ↓
CHECK EXECUTABLE
      ↓
CHECK VERSION
      ↓
RUN SMALL TEST
      ↓
INSPECT OUTPUT
      ↓
SUBMIT PRODUCTION JOB
```

A small test can reveal:

```text
Missing executable
Missing library
Incorrect module
Incompatible version
Incorrect input path
Insufficient resources
GPU configuration problem
MPI configuration problem
```

---

# 10 · Example Environment Check

<p class="section-description">
The following example shows a simple pre-submission environment
check. Adapt the module names and commands to your HPC system.
</p>

<div class="hpc-editor"
     data-filename="check_environment.sh"
     data-language="Bash">

<textarea>
#!/bin/bash

echo "=== HPC Environment Check ==="

echo ""
echo "Current directory:"
pwd

echo ""
echo "Loaded modules:"
module list 2>&1

echo ""
echo "Quantum ESPRESSO:"
which pw.x

echo ""
echo "Compiler:"
which gcc
gcc --version | head -n 1

echo ""
echo "MPI:"
which mpirun
mpirun --version | head -n 1

echo ""
echo "Python:"
which python
python --version

echo ""
echo "=== Environment Check Complete ==="
</textarea>

</div>

You can modify this script for the software used in your own
calculation.

---

# Application Environment Examples

<div class="environment-cards">

<div class="environment-card">

<div class="environment-card-label">
DFT
</div>

<h2>
Quantum ESPRESSO
</h2>

<p>
Check the Quantum ESPRESSO module, executable, compiler,
MPI environment, and input requirements before submission.
</p>

<a href="../../hands-on-project/research-cases/graphene/">
Open Graphene Workflow →
</a>

</div>

<div class="environment-card">

<div class="environment-card-label">
MOLECULAR DYNAMICS
</div>

<h2>
LAMMPS
</h2>

<p>
Verify the LAMMPS executable, required packages,
parallel environment, and simulation input.
</p>

<a href="../../hands-on-project/research-cases/graphene-ionic-liquid-interface/">
Open Interface Workflow →
</a>

</div>

<div class="environment-card">

<div class="environment-card-label">
ATOMISTIC SIMULATION
</div>

<h2>
DC-DFTB-MD
</h2>

<p>
Check the DFTB-related environment, input configuration,
and execution requirements before running molecular dynamics.
</p>

<a href="../../hands-on-project/research-cases/litfsi-emim-tfsi-electrolyte-transport/">
Open Electrolyte Workflow →
</a>

</div>

<div class="environment-card">

<div class="environment-card-label">
MACHINE LEARNING
</div>

<h2>
MACE
</h2>

<p>
Verify the Python environment, required packages,
accelerator availability, and execution configuration.
</p>

<a href="../../hands-on-project/">
Open Computational Workflows →
</a>

</div>

</div>

---

# Environment Checklist

<div class="checklist">

<div>● Required software identified</div>

<div>● Correct module loaded</div>

<div>● Executable available</div>

<div>● Software version checked</div>

<div>● Compiler verified</div>

<div>● MPI environment verified</div>

<div>● GPU environment checked when required</div>

<div>● Python environment verified when required</div>

<div>● Small test completed</div>

<div>● Environment documented</div>

</div>

---

<div class="environment-banner">

<h2>
Environment Ready
</h2>

<p>
Once the required software environment has been verified,
continue to Running Calculations and prepare the SLURM job.
</p>

<a href="../running-calculations/">
Run a Calculation →
</a>

</div>

