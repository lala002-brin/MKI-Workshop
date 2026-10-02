# Script Library

<div class="environment-hero environment-hero-compact">

<div class="environment-eyebrow">
HPC SCRIPT LIBRARY
</div>

<h1>
Script Library
</h1>

<p class="environment-description">
Kumpulan template script untuk menjalankan berbagai workload
komputasi pada HPC. Gunakan template sebagai titik awal,
sesuaikan parameter yang diperlukan, lalu salin script untuk digunakan.
</p>

<div class="environment-tags">
<span>SLURM</span>
<span>DFT</span>
<span>MD</span>
<span>PYTHON</span>
</div>

</div>

---

## Script Collection

<p class="section-description">
Template berikut mencakup workflow HPC yang umum digunakan.
Pilih template berdasarkan aplikasi atau jenis workload.
</p>

<div class="script-library-grid">

<div class="script-library-card">

<span class="script-library-label">
SLURM
</span>

<h3>
Basic CPU Job
</h3>

<p>
Template dasar untuk menjalankan workload CPU menggunakan SLURM.
</p>

<div class="script-library-meta">
CPU · SLURM
</div>

<a href="#basic-cpu-job">
View Template →
</a>

</div>


<div class="script-library-card">

<span class="script-library-label">
QUANTUM ESPRESSO
</span>

<h3>
SCF Calculation
</h3>

<p>
Template untuk menjalankan perhitungan self-consistent field.
</p>

<div class="script-library-meta">
DFT · CPU · SLURM
</div>

<a href="#quantum-espresso-scf">
View Template →
</a>

</div>


<div class="script-library-card">

<span class="script-library-label">
QUANTUM ESPRESSO
</span>

<h3>
NSCF Calculation
</h3>

<p>
Template untuk melanjutkan workflow Quantum ESPRESSO
ke perhitungan non-self-consistent field.
</p>

<div class="script-library-meta">
DFT · CPU · SLURM
</div>

<a href="#quantum-espresso-nscf">
View Template →
</a>

</div>


<div class="script-library-card">

<span class="script-library-label">
LAMMPS
</span>

<h3>
Molecular Dynamics
</h3>

<p>
Template dasar untuk menjalankan simulasi molecular dynamics.
</p>

<div class="script-library-meta">
MD · CPU · SLURM
</div>

<a href="#lammps-md">
View Template →
</a>

</div>


<div class="script-library-card">

<span class="script-library-label">
PYTHON
</span>

<h3>
Python CPU Job
</h3>

<p>
Template untuk menjalankan program Python pada compute node.
</p>

<div class="script-library-meta">
PYTHON · CPU · SLURM
</div>

<a href="#python-cpu">
View Template →
</a>

</div>


<div class="script-library-card">

<span class="script-library-label">
GPU
</span>

<h3>
GPU Job
</h3>

<p>
Template dasar untuk workload yang membutuhkan GPU.
</p>

<div class="script-library-meta">
GPU · SLURM
</div>

<a href="#gpu-job">
View Template →
</a>

</div>

</div>

---

## How the Library Works

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Action</th>
<th>Function</th>
</tr>
</thead>

<tbody>

<tr>
<td>Select</td>
<td>Pilih template sesuai dengan workload</td>
</tr>

<tr>
<td>Review</td>
<td>Periksa resource, software, input, dan output</td>
</tr>

<tr>
<td>Edit</td>
<td>Sesuaikan script secara lokal di browser</td>
</tr>

<tr>
<td>Copy</td>
<td>Salin script yang sudah disesuaikan</td>
</tr>

<tr>
<td>Reset</td>
<td>Kembalikan script ke template asli</td>
</tr>

<tr>
<td>Run</td>
<td>Gunakan script pada workflow HPC</td>
</tr>

</tbody>

</table>

</div>

---

## 01 · Basic CPU Job

<div class="script-library-section" id="basic-cpu-job">

<div class="script-library-header">

<div>

<span class="script-library-label">
SLURM
</span>

<h3>
Basic CPU Job
</h3>

<p>
Template minimal untuk menjalankan workload CPU menggunakan SLURM.
</p>

</div>

<div class="script-library-meta">
CPU · 1 NODE · 16 TASKS
</div>

</div>

<div class="script-info-grid">

<div>
<strong>Scheduler</strong>
<span>SLURM</span>
</div>

<div>
<strong>Resource</strong>
<span>CPU</span>
</div>

<div>
<strong>Nodes</strong>
<span>1</span>
</div>

<div>
<strong>Tasks</strong>
<span>16</span>
</div>

</div>

<div class="script-code">

<pre><code class="language-bash">#!/bin/bash

#SBATCH --job-name=calculation
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load software

application \
    -in input/calculation.in \
    > output/calculation.out</code></pre>

</div>

<textarea class="script-editor" spellcheck="false">#!/bin/bash

#SBATCH --job-name=calculation
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load software

application \
    -in input/calculation.in \
    > output/calculation.out</textarea>

<div class="script-actions">

<button type="button" class="script-edit">
Edit
</button>

<button type="button" class="script-copy">
Copy
</button>

<button type="button" class="script-reset">
Reset
</button>

<button type="button" class="script-done">
Done Editing
</button>

</div>

<div class="script-local-change" hidden>
Edited locally
</div>

<div class="script-note">
Sesuaikan partition, jumlah task, wall time, module,
nama executable, input, dan output dengan cluster yang digunakan.
</div>

</div>

---

## 02 · Quantum ESPRESSO SCF

<div class="script-library-section" id="quantum-espresso-scf">

<div class="script-library-header">

<div>

<span class="script-library-label">
QUANTUM ESPRESSO
</span>

<h3>
SCF Calculation
</h3>

<p>
Template untuk menjalankan perhitungan self-consistent field.
</p>

</div>

<div class="script-library-meta">
DFT · CPU · SLURM
</div>

</div>

<div class="script-info-grid">

<div>
<strong>Application</strong>
<span>Quantum ESPRESSO</span>
</div>

<div>
<strong>Executable</strong>
<span>pw.x</span>
</div>

<div>
<strong>Method</strong>
<span>SCF</span>
</div>

<div>
<strong>Scheduler</strong>
<span>SLURM</span>
</div>

</div>

<div class="script-code">

<pre><code class="language-bash">#!/bin/bash

#SBATCH --job-name=graphene_scf
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load quantum-espresso

pw.x \
    -in input/graphene_scf.in \
    > output/graphene_scf.out</code></pre>

</div>

<textarea class="script-editor" spellcheck="false">#!/bin/bash

#SBATCH --job-name=graphene_scf
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load quantum-espresso

pw.x \
    -in input/graphene_scf.in \
    > output/graphene_scf.out</textarea>

<div class="script-actions">

<button type="button" class="script-edit">
Edit
</button>

<button type="button" class="script-copy">
Copy
</button>

<button type="button" class="script-reset">
Reset
</button>

<button type="button" class="script-done">
Done Editing
</button>

</div>

<div class="script-local-change" hidden>
Edited locally
</div>

<div class="script-note">
SCF biasanya menjadi tahap awal untuk menghasilkan
konfigurasi elektronik yang dibutuhkan tahap berikutnya.
</div>

</div>

---

## 03 · Quantum ESPRESSO NSCF

<div class="script-library-section" id="quantum-espresso-nscf">

<div class="script-library-header">

<div>

<span class="script-library-label">
QUANTUM ESPRESSO
</span>

<h3>
NSCF Calculation
</h3>

<p>
Template untuk menjalankan perhitungan non-self-consistent field.
</p>

</div>

<div class="script-library-meta">
DFT · CPU · SLURM
</div>

</div>

<div class="script-info-grid">

<div>
<strong>Application</strong>
<span>Quantum ESPRESSO</span>
</div>

<div>
<strong>Executable</strong>
<span>pw.x</span>
</div>

<div>
<strong>Method</strong>
<span>NSCF</span>
</div>

<div>
<strong>Scheduler</strong>
<span>SLURM</span>
</div>

</div>

<div class="script-code">

<pre><code class="language-bash">#!/bin/bash

#SBATCH --job-name=graphene_nscf
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load quantum-espresso

pw.x \
    -in input/graphene_nscf.in \
    > output/graphene_nscf.out</code></pre>

</div>

<textarea class="script-editor" spellcheck="false">#!/bin/bash

#SBATCH --job-name=graphene_nscf
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load quantum-espresso

pw.x \
    -in input/graphene_nscf.in \
    > output/graphene_nscf.out</textarea>

<div class="script-actions">

<button type="button" class="script-edit">
Edit
</button>

<button type="button" class="script-copy">
Copy
</button>

<button type="button" class="script-reset">
Reset
</button>

<button type="button" class="script-done">
Done Editing
</button>

</div>

<div class="script-local-change" hidden>
Edited locally
</div>

<div class="script-note">
Sesuaikan input NSCF dengan workflow ilmiah yang digunakan.
</div>

</div>

---

## 04 · LAMMPS Molecular Dynamics

<div class="script-library-section" id="lammps-md">

<div class="script-library-header">

<div>

<span class="script-library-label">
LAMMPS
</span>

<h3>
Molecular Dynamics
</h3>

<p>
Template dasar untuk menjalankan simulasi molecular dynamics.
</p>

</div>

<div class="script-library-meta">
MD · CPU · SLURM
</div>

</div>

<div class="script-info-grid">

<div>
<strong>Application</strong>
<span>LAMMPS</span>
</div>

<div>
<strong>Executable</strong>
<span>lmp</span>
</div>

<div>
<strong>Workload</strong>
<span>Molecular Dynamics</span>
</div>

<div>
<strong>Scheduler</strong>
<span>SLURM</span>
</div>

</div>

<div class="script-code">

<pre><code class="language-bash">#!/bin/bash

#SBATCH --job-name=md
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=02:00:00

cd "$SLURM_SUBMIT_DIR"

module load lammps

lmp \
    -in input/in.lammps \
    > output/lammps.out</code></pre>

</div>

<textarea class="script-editor" spellcheck="false">#!/bin/bash

#SBATCH --job-name=md
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=02:00:00

cd "$SLURM_SUBMIT_DIR"

module load lammps

lmp \
    -in input/in.lammps \
    > output/lammps.out</textarea>

<div class="script-actions">

<button type="button" class="script-edit">
Edit
</button>

<button type="button" class="script-copy">
Copy
</button>

<button type="button" class="script-reset">
Reset
</button>

<button type="button" class="script-done">
Done Editing
</button>

</div>

<div class="script-local-change" hidden>
Edited locally
</div>

<div class="script-note">
Pastikan input LAMMPS, data file, force field, dan kebutuhan
resource sudah sesuai sebelum submission.
</div>

</div>

---

## 05 · Python CPU Job

<div class="script-library-section" id="python-cpu">

<div class="script-library-header">

<div>

<span class="script-library-label">
PYTHON
</span>

<h3>
Python CPU Job
</h3>

<p>
Template untuk menjalankan program Python pada compute node.
</p>

</div>

<div class="script-library-meta">
PYTHON · CPU · SLURM
</div>

</div>

<div class="script-info-grid">

<div>
<strong>Language</strong>
<span>Python</span>
</div>

<div>
<strong>Resource</strong>
<span>CPU</span>
</div>

<div>
<strong>Tasks</strong>
<span>1</span>
</div>

<div>
<strong>Scheduler</strong>
<span>SLURM</span>
</div>

</div>

<div class="script-code">

<pre><code class="language-bash">#!/bin/bash

#SBATCH --job-name=python
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load python

python script.py</code></pre>

</div>

<textarea class="script-editor" spellcheck="false">#!/bin/bash

#SBATCH --job-name=python
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load python

python script.py</textarea>

<div class="script-actions">

<button type="button" class="script-edit">
Edit
</button>

<button type="button" class="script-copy">
Copy
</button>

<button type="button" class="script-reset">
Reset
</button>

<button type="button" class="script-done">
Done Editing
</button>

</div>

<div class="script-local-change" hidden>
Edited locally
</div>

<div class="script-note">
Jika workflow membutuhkan environment Python tertentu,
sesuaikan module atau environment sebelum menjalankan script.
</div>

</div>

---

## 06 · GPU Job

<div class="script-library-section" id="gpu-job">

<div class="script-library-header">

<div>

<span class="script-library-label">
SLURM
</span>

<h3>
GPU Job
</h3>

<p>
Template dasar untuk workload yang membutuhkan GPU.
</p>

</div>

<div class="script-library-meta">
GPU · SLURM
</div>

</div>

<div class="script-info-grid">

<div>
<strong>Resource</strong>
<span>GPU</span>
</div>

<div>
<strong>Nodes</strong>
<span>1</span>
</div>

<div>
<strong>CPU Tasks</strong>
<span>4</span>
</div>

<div>
<strong>Scheduler</strong>
<span>SLURM</span>
</div>

</div>

<div class="script-code">

<pre><code class="language-bash">#!/bin/bash

#SBATCH --job-name=gpu-job
#SBATCH --partition=gpu
#SBATCH --nodes=1
#SBATCH --ntasks=4
#SBATCH --gres=gpu:1
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load software

application \
    --input input/calculation.in \
    > output/calculation.out</code></pre>

</div>

<textarea class="script-editor" spellcheck="false">#!/bin/bash

#SBATCH --job-name=gpu-job
#SBATCH --partition=gpu
#SBATCH --nodes=1
#SBATCH --ntasks=4
#SBATCH --gres=gpu:1
#SBATCH --time=01:00:00

cd "$SLURM_SUBMIT_DIR"

module load software

application \
    --input input/calculation.in \
    > output/calculation.out</textarea>

<div class="script-actions">

<button type="button" class="script-edit">
Edit
</button>

<button type="button" class="script-copy">
Copy
</button>

<button type="button" class="script-reset">
Reset
</button>

<button type="button" class="script-done">
Done Editing
</button>

</div>

<div class="script-local-change" hidden>
Edited locally
</div>

<div class="script-note">
Sintaks GPU, nama partition, dan resource GPU dapat berbeda
antarcluster. Gunakan konfigurasi yang disediakan administrator.
</div>

</div>

---

## SLURM Parameters

<p class="section-description">
Parameter berikut merupakan bagian yang paling sering disesuaikan
ketika menggunakan template SLURM.
</p>

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Parameter</th>
<th>Fungsi</th>
<th>Contoh</th>
</tr>
</thead>

<tbody>

<tr>
<td><code>--job-name</code></td>
<td>Memberikan nama pada job</td>
<td><code>--job-name=graphene</code></td>
</tr>

<tr>
<td><code>--partition</code></td>
<td>Menentukan partition</td>
<td><code>--partition=compute</code></td>
</tr>

<tr>
<td><code>--nodes</code></td>
<td>Menentukan jumlah node</td>
<td><code>--nodes=1</code></td>
</tr>

<tr>
<td><code>--ntasks</code></td>
<td>Menentukan jumlah task</td>
<td><code>--ntasks=16</code></td>
</tr>

<tr>
<td><code>--time</code></td>
<td>Menentukan batas waktu</td>
<td><code>--time=01:00:00</code></td>
</tr>

<tr>
<td><code>--gres</code></td>
<td>Meminta resource khusus seperti GPU</td>
<td><code>--gres=gpu:1</code></td>
</tr>

</tbody>

</table>

</div>

---

## Before You Run

<div class="checklist">

<div>Template sesuai dengan jenis workload</div>

<div>Partition sesuai dengan cluster</div>

<div>CPU atau GPU sesuai kebutuhan</div>

<div>Jumlah node dan task sudah diperiksa</div>

<div>Wall time sudah diperiksa</div>

<div>Module software sudah benar</div>

<div>Executable sudah tersedia</div>

<div>Input path sudah benar</div>

<div>Output path sudah benar</div>

<div>Resource request sudah masuk akal</div>

</div>

---

## Local Editing

<p class="section-description">
Editor digunakan untuk menyesuaikan template tanpa mengubah
versi asli yang tersedia bagi pengguna lain.
</p>

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Action</th>
<th>Result</th>
</tr>

</thead>

<tbody>

<tr>
<td>Edit</td>
<td>Membuka script dalam editor</td>
</tr>

<tr>
<td>Copy</td>
<td>Menyalin versi script yang sedang digunakan</td>
</tr>

<tr>
<td>Reset</td>
<td>Menghapus perubahan lokal dan mengembalikan template asli</td>
</tr>

<tr>
<td>Done Editing</td>
<td>Menyimpan perubahan lokal pada browser</td>
</tr>

</tbody>

</table>

</div>

<div class="script-local-note">
Perubahan editor bersifat lokal pada browser. Template asli tidak
berubah dan perubahan pengguna tidak memengaruhi pengguna lain.
</div>

---

## Template Workflow

```text
SELECT TEMPLATE
      ↓
REVIEW RESOURCE
      ↓
EDIT PARAMETERS
      ↓
COPY SCRIPT
      ↓
SUBMIT TO HPC
      ↓
MONITOR JOB
      ↓
VERIFY OUTPUT
```

---

<div class="environment-banner">

<h2>
Build From a Template
</h2>

<p>
Gunakan template sebagai titik awal. Selalu sesuaikan resource,
software environment, input, output, dan aturan cluster sebelum
menjalankan job.
</p>

</div>
