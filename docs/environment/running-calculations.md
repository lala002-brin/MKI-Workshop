# Running Calculations

<div class="environment-hero environment-hero-compact">

<div class="environment-eyebrow">
HPC JOB MANAGEMENT
</div>

<h1>
Run Your Calculation
</h1>

<p class="environment-description">
A practical workflow for taking a prepared computational model,
submitting it to the HPC scheduler, monitoring the job, and
verifying the resulting calculation.
</p>

<div class="environment-tags">
<span>PREPARE</span>
<span>EDIT</span>
<span>SUBMIT</span>
<span>MONITOR</span>
<span>VERIFY</span>
</div>

</div>

---

## From Input to Result

<p class="section-description">
The same basic workflow applies across the computational tools used
in this workshop. Prepare the input, customize the job configuration,
submit the calculation, monitor its progress, and verify the result.
</p>

<div class="execution-pipeline">

<div>
<span>01</span>
<p>Prepare</p>
</div>

<div>→</div>

<div>
<span>02</span>
<p>Edit</p>
</div>

<div>→</div>

<div>
<span>03</span>
<p>Submit</p>
</div>

<div>→</div>

<div>
<span>04</span>
<p>Monitor</p>
</div>

<div>→</div>

<div>
<span>05</span>
<p>Verify</p>
</div>

</div>

---

# 01 · Quick Start

<p class="section-description">
Already have an input file and a SLURM script?
Use these commands to move directly from your project to the HPC queue.
</p>

<div class="quickstart">

<div class="quickstart-step">

<span>01</span>

<div>
<strong>Enter the project</strong>

<code>cd project/</code>
</div>

</div>

<div class="quickstart-step">

<span>02</span>

<div>
<strong>Check the files</strong>

<code>ls -lh</code>
</div>

</div>

<div class="quickstart-step">

<span>03</span>

<div>
<strong>Submit the job</strong>

<code>sbatch scripts/run.slurm</code>
</div>

</div>

<div class="quickstart-step">

<span>04</span>

<div>
<strong>Check the queue</strong>

<code>squeue -u $USER</code>
</div>

</div>

<div class="quickstart-step">

<span>05</span>

<div>
<strong>Monitor output</strong>

<code>tail -f output/calculation.out</code>
</div>

</div>

<div class="quickstart-step">

<span>06</span>

<div>
<strong>Verify the result</strong>

<code>grep -i "error" output/calculation.out</code>
</div>

</div>

</div>

> **Already have a job script?** Start with `sbatch` and keep the
> returned JOB ID for monitoring.

---

# 02 · Prepare Your Job

<p class="section-description">
Keep the calculation organized before submitting it to the scheduler.
Separate inputs, scripts, outputs, and analysis files.
</p>

```text
project/
├── input/
│   └── calculation.in
│
├── scripts/
│   └── run.slurm
│
├── output/
│
└── analysis/
```

Check the project:

```bash
pwd
```

```bash
ls -lh
```

Check the input files:

```bash
ls -lh input/
```

Check the job scripts:

```bash
ls -lh scripts/
```

Check the output directory:

```bash
ls -ld output/
```

Before submission:

<div class="checklist">

<div>● Input file exists</div>

<div>● Job script exists</div>

<div>● Output directory exists</div>

<div>● Required software is available</div>

<div>● Resource request matches the calculation</div>

</div>

---

# 03 · Edit the Job Script

<p class="section-description">
The SLURM script controls how the calculation enters the HPC system.
Edit the example directly in the browser. Your changes remain local
to the current browser session and do not modify the original page.
</p>

<div class="hpc-editor"
     data-filename="run.slurm"
     data-language="SLURM / Bash">

<textarea>
#!/bin/bash

#SBATCH --job-name=calculation
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load software

application \
    -in input/calculation.in \
    > output/calculation.out
</textarea>

</div>

## What Usually Changes?

For a new calculation, users commonly review:

```text
Job name
Partition
Number of nodes
Number of tasks
Wall time
Input filename
Output filename
```

For example:

```text
#SBATCH --job-name=graphene_scf
#SBATCH --ntasks=16
#SBATCH --time=01:00:00
```

Do not change resource or partition settings without considering
the requirements and policies of the target HPC system.

---

# 04 · Edit the Simulation Input

<p class="section-description">
The simulation input defines the scientific parameters of the
calculation. Edit the example directly when adapting it to a new
calculation.
</p>

## Quantum ESPRESSO

<div class="hpc-editor"
     data-filename="graphene_scf.in"
     data-language="Quantum ESPRESSO">

<textarea>
&CONTROL
    calculation = 'scf'
    prefix = 'graphene'
    pseudo_dir = './pseudo/'
    outdir = './tmp/'
/

&SYSTEM
    ibrav = 4
    celldm(1) = 4.65
    nat = 2
    ntyp = 1
    ecutwfc = 40
    ecutrho = 320
/

&ELECTRONS
    conv_thr = 1.0d-8
    mixing_beta = 0.7
/

ATOMIC_SPECIES
C 12.011 C.pbe-n-kjpaw_psl.1.0.0.UPF

ATOMIC_POSITIONS crystal
C 0.000000 0.000000 0.000000
C 0.333333 0.666667 0.000000

K_POINTS automatic
12 12 1 0 0 0
</textarea>

</div>

## LAMMPS

<div class="hpc-editor"
     data-filename="in.lammps"
     data-language="LAMMPS">

<textarea>
# Graphene molecular dynamics example

units           metal
dimension       3
boundary        p p p
atom_style      atomic

read_data       input/graphene.data

pair_style      airebo 3.0
pair_coeff      * * CH.airebo C

neighbor        2.0 bin
neigh_modify    delay 0 every 1 check yes

timestep        0.001

thermo          100
thermo_style    custom step temp pe ke etotal

velocity        all create 300.0 12345 mom yes rot no

fix             1 all nvt temp 300.0 300.0 0.1

dump            1 all atom 1000 output/graphene.lammpstrj

run             10000
</textarea>

</div>

> **Editing principle:** change only the parameters required for your
> calculation. Keep the original example available so that you can
> restore it when necessary.

---

# 05 · Submit & Monitor

<p class="section-description">
After checking the input and job script, submit the calculation
to SLURM and monitor the returned JOB ID.
</p>

## Submit the Job

```bash
sbatch scripts/run.slurm
```

A successful submission may return:

```text
Submitted batch job 38142
```

Record:

```text
38142
```

as the JOB ID.

## Check the Queue

```bash
squeue -u $USER
```

Common job states include:

```text
PD
```

Pending.

```text
R
```

Running.

```text
CG
```

Completing.

```text
CD
```

Completed.

## Inspect a Specific Job

Replace `JOBID` with the ID returned by `sbatch`:

```bash
scontrol show job JOBID
```

## Monitor the Output

Follow the application output:

```bash
tail -f output/calculation.out
```

Show the latest lines:

```bash
tail -n 30 output/calculation.out
```

Stop live monitoring with:

```text
Ctrl + C
```

---

# 06 · Verify the Result

<p class="section-description">
A completed scheduler state does not automatically guarantee
a successful scientific calculation. Inspect the application
output before beginning analysis.
</p>

## Inspect Output Files

List the generated files:

```bash
ls -lh output/
```

Inspect the final output:

```bash
tail -n 50 output/calculation.out
```

Search for errors:

```bash
grep -i "error" output/calculation.out
```

Search for warnings:

```bash
grep -i "warning" output/calculation.out
```

## Quantum ESPRESSO

Quantum ESPRESSO calculations commonly report successful completion
with:

```bash
grep "JOB DONE" output/graphene_scf.out
```

If the expected completion message does not appear, inspect the
output file for the cause.

## Verify Before Analysis

Use this sequence:

```text
JOB
 ↓
SCHEDULER COMPLETED
 ↓
OUTPUT EXISTS
 ↓
EXPECTED COMPLETION MESSAGE
 ↓
NO CRITICAL ERROR
 ↓
READY FOR ANALYSIS
```

---

# 07 · Troubleshooting

<div class="troubleshooting-grid">

<div>

<h3>
Job stays pending
</h3>

<p>
Check the job state, requested resources, partition,
and current queue conditions.
</p>

</div>

<div>

<h3>
Command not found
</h3>

<p>
Check the software environment and verify that the
required executable is available.
</p>

</div>

<div>

<h3>
Job fails immediately
</h3>

<p>
Inspect the SLURM output, application output,
input path, and software configuration.
</p>

</div>

<div>

<h3>
Calculation stops unexpectedly
</h3>

<p>
Check wall time, memory, resource allocation,
and application error messages.
</p>

</div>

</div>

## Useful Commands

Check your jobs:

```bash
squeue -u $USER
```

Inspect a job:

```bash
scontrol show job JOBID
```

Inspect output:

```bash
tail -n 50 output/calculation.out
```

Search for errors:

```bash
grep -i "error" output/calculation.out
```

Cancel a job:

```bash
scancel JOBID
```

---

# Application Recipes

<p class="section-description">
The application changes from one research workflow to another,
but the HPC lifecycle remains consistent.
</p>

<div class="environment-cards">

<div class="environment-card">

<div class="environment-card-label">
DFT
</div>

<h2>
Quantum ESPRESSO
</h2>

<p>
Edit the input, configure the SLURM script, submit the calculation,
and verify the electronic structure output.
</p>

<a href="../../hands-on-project/research-cases/graphene/">
Graphene Research Case →
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
Edit the molecular dynamics input, submit the workload,
and inspect the resulting trajectory.
</p>

<a href="../../hands-on-project/research-cases/graphene-ionic-liquid-interface/">
Interface Research Case →
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
Prepare the input and job configuration, run the simulation,
and generate trajectory data for analysis.
</p>

<a href="../../hands-on-project/research-cases/litfsi-emim-tfsi-electrolyte-transport/">
Electrolyte Research Case →
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
Prepare the Python workflow, configure the computational resources,
and run the machine learning workflow on the HPC system.
</p>

<a href="../../hands-on-project/">
Explore Computational Workflows →
</a>

</div>

</div>

---

# HPC Job Checklist

<div class="checklist">

<div>● Input prepared</div>

<div>● Input reviewed</div>

<div>● SLURM script customized</div>

<div>● Software environment verified</div>

<div>● Resources reviewed</div>

<div>● Job submitted</div>

<div>● JOB ID recorded</div>

<div>● Queue monitored</div>

<div>● Output inspected</div>

<div>● Calculation verified</div>

</div>

---

<div class="environment-banner">

<h2>
Ready for Analysis
</h2>

<p>
Once the calculation has completed successfully, move to the
appropriate research case and follow its analysis workflow.
</p>

<a href="../../hands-on-project/">
Explore Research Cases →
</a>

</div>
```
