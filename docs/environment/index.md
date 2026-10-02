# Computational Environment

<div class="environment-hero">

<div class="environment-eyebrow">
MKI × BRIN COMPUTATIONAL MATERIALS LAB
</div>

<h1>
Run Scientific Computing<br>
on High Performance Computing
</h1>

<p class="environment-description">
A practical guide to connecting, preparing, configuring,
submitting, monitoring, and managing computational
materials science calculations on HPC systems.
</p>

<div class="environment-tags">

<span>HPC</span>
<span>LINUX</span>
<span>SLURM</span>
<span>MPI</span>
<span>SCIENTIFIC SOFTWARE</span>

</div>

</div>


---

## The Computational Environment

<p class="section-description">
Computational materials simulations require more than a scientific
method and an input file. This section provides the operational
workflow required to move a calculation from your local computer
to an HPC system and retrieve the resulting data.
</p>


<div class="environment-flow">

<div class="environment-flow-item">

<div class="environment-flow-number">
01
</div>

<h3>
Connect
</h3>

<p>
Access the HPC system using SSH and understand
the basic structure of the computing environment.
</p>

</div>


<div class="environment-flow-arrow">
→
</div>


<div class="environment-flow-item">

<div class="environment-flow-number">
02
</div>

<h3>
Prepare
</h3>

<p>
Organize input files, directories, structures,
scripts, and calculation data.
</p>

</div>


<div class="environment-flow-arrow">
→
</div>


<div class="environment-flow-item">

<div class="environment-flow-number">
03
</div>

<h3>
Configure
</h3>

<p>
Load scientific software, compilers, libraries,
Python environments, and computational tools.
</p>

</div>


<div class="environment-flow-arrow">
→
</div>


<div class="environment-flow-item">

<div class="environment-flow-number">
04
</div>

<h3>
Submit
</h3>

<p>
Create a job script and submit the calculation
to the HPC scheduler.
</p>

</div>


<div class="environment-flow-arrow">
→
</div>


<div class="environment-flow-item">

<div class="environment-flow-number">
05
</div>

<h3>
Monitor
</h3>

<p>
Track the job, inspect the queue, monitor output,
and identify calculation problems.
</p>

</div>

</div>


---

## HPC Operations

<div class="environment-cards">


<div class="environment-card">

<div class="environment-card-number">
01
</div>

<div class="environment-card-label">
ACCESS
</div>

<h2>
Access & Linux
</h2>

<p>
Learn how to connect to the HPC system, navigate
directories, manage files, and work safely from
the command line.
</p>

<a href="linux.md">
Explore Access →
</a>

</div>


<div class="environment-card">

<div class="environment-card-number">
02
</div>

<div class="environment-card-label">
COMMAND LINE
</div>

<h2>
Command Line
</h2>

<p>
Use shell commands to search files, inspect outputs,
process data, and control computational workflows.
</p>

<a href="command-line.md">
Explore Commands →
</a>

</div>


<div class="environment-card">

<div class="environment-card-number">
03
</div>

<div class="environment-card-label">
SOFTWARE
</div>

<h2>
Software Environment
</h2>

<p>
Configure compilers, MPI, modules, Python environments,
and scientific software required by computational codes.
</p>

<a href="software-environment.md">
Configure Software →
</a>

</div>


<div class="environment-card">

<div class="environment-card-number">
04
</div>

<div class="environment-card-label">
HPC JOBS
</div>

<h2>
Running Calculations
</h2>

<p>
Prepare SLURM scripts, submit jobs, monitor queues,
manage resources, and inspect calculation outputs.
</p>

<a href="running-calculations.md">
Run a Calculation →
</a>

</div>

</div>


---

## HPC Quick Start

<p class="section-description">
The essential workflow for submitting a computational calculation
to an HPC cluster.
</p>


<div class="quickstart">

<div class="quickstart-step">

<span>01</span>

<div>
<strong>Connect</strong>

<code>
ssh username@hpc-address
</code>
</div>

</div>


<div class="quickstart-step">

<span>02</span>

<div>
<strong>Enter your project</strong>

<code>
cd project/
</code>
</div>

</div>


<div class="quickstart-step">

<span>03</span>

<div>
<strong>Load the software</strong>

<code>
module load software
</code>
</div>

</div>


<div class="quickstart-step">

<span>04</span>

<div>
<strong>Submit the job</strong>

<code>
sbatch job.slurm
</code>
</div>

</div>


<div class="quickstart-step">

<span>05</span>

<div>
<strong>Check the queue</strong>

<code>
squeue -u $USER
</code>
</div>

</div>


<div class="quickstart-step">

<span>06</span>

<div>
<strong>Inspect the output</strong>

<code>
tail -f calculation.out
</code>
</div>

</div>

</div>


---

## Understand the HPC Architecture

<div class="architecture">

<div class="architecture-local">

<div class="architecture-label">
LOCAL COMPUTER
</div>

<h3>
Your Workstation
</h3>

<p>
Prepare inputs, scripts, structures,
and analysis files.
</p>

</div>


<div class="architecture-arrow">
→
</div>


<div class="architecture-login">

<div class="architecture-label">
LOGIN NODE
</div>

<h3>
Access & Preparation
</h3>

<p>
Transfer files, configure environments,
and submit jobs.
</p>

</div>


<div class="architecture-arrow">
→
</div>


<div class="architecture-compute">

<div class="architecture-label">
COMPUTE NODE
</div>

<h3>
Scientific Calculation
</h3>

<p>
Run Quantum ESPRESSO, LAMMPS,
DFTB-MD, MACE, and other workloads.
</p>

</div>

</div>


<div class="architecture-note">

<strong>Important:</strong>
Use the login node for lightweight preparation and job
submission. Computationally intensive calculations should
run on allocated compute resources according to the HPC policy.

</div>


---

## From Input to Result

<div class="execution-pipeline">

<div>
<span>INPUT</span>
<p>
Structures and parameters
</p>
</div>

<div>→</div>

<div>
<span>ENVIRONMENT</span>
<p>
Software and dependencies
</p>
</div>

<div>→</div>

<div>
<span>SLURM</span>
<p>
Resource allocation
</p>
</div>

<div>→</div>

<div>
<span>COMPUTE</span>
<p>
Scientific calculation
</p>
</div>

<div>→</div>

<div>
<span>OUTPUT</span>
<p>
Results and logs
</p>
</div>

</div>


---

## Software Covered

<div class="software-strip">

<span>Quantum ESPRESSO</span>
<span>LAMMPS</span>
<span>DC-DFTB-MD</span>
<span>MACE</span>
<span>Python</span>
<span>MPI</span>
<span>SLURM</span>

</div>


---

## Before You Run a Calculation

<div class="checklist">

<div>
✓
Confirm your HPC account
</div>

<div>
✓
Connect using SSH
</div>

<div>
✓
Prepare the calculation directory
</div>

<div>
✓
Verify input files
</div>

<div>
✓
Load the correct software environment
</div>

<div>
✓
Check available computational resources
</div>

<div>
✓
Prepare the SLURM job script
</div>

<div>
✓
Submit and monitor the job
</div>

</div>


---

## Troubleshooting

<div class="troubleshooting-grid">

<div>

<h3>
Job does not start
</h3>

<p>
Check the queue status, requested resources,
partition, and scheduler messages.
</p>

</div>


<div>

<h3>
Software command not found
</h3>

<p>
Check the available modules and verify that
the required software environment is loaded.
</p>

</div>


<div>

<h3>
Calculation stops unexpectedly
</h3>

<p>
Inspect the scheduler output, application output,
resource usage, and calculation parameters.
</p>

</div>


<div>

<h3>
Output looks incomplete
</h3>

<p>
Check whether the job finished normally and inspect
the final section of the application output.
</p>

</div>

</div>


---

<div class="environment-banner">

<h2>
Ready to Run Your Calculation?
</h2>

<p>
Start with HPC access, configure your software,
then submit your first scientific workload.
</p>

<a href="running-calculations.md">
Open HPC Job Guide →
</a>

</div>
