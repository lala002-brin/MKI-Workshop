<div class="mahameru-page">

<div class="mahameru-tabs">

<a class="mahameru-tab" href="../getting-started.md">
Getting Started
</a>

<a class="mahameru-tab" href="./working-on-mahameru.md">
Working on Mahameru
</a>

<a class="mahameru-tab active" href="./slurm-computing.md">
SLURM & Computing
</a>

<a class="mahameru-tab" href="./workshop-workflow.md">
Workshop Workflow
</a>

</div>


<p class="mahameru-intro">
Gunakan <strong>SLURM</strong> untuk mengirim dan mengelola pekerjaan
komputasi pada Mahameru. Halaman ini menjelaskan alur dari penyiapan
script, pemilihan resource, submission, sampai pemeriksaan hasil.
</p>


<div class="mahameru-hero">

<div class="mahameru-hero-content">

<span class="mahameru-label">
SLURM & COMPUTING
</span>

<h2>
From script to compute
</h2>

<p>
Siapkan kebutuhan pekerjaan, kirim job ke SLURM, pantau statusnya,
kemudian periksa output yang dihasilkan.
</p>

</div>

<div class="mahameru-hero-status">

<span class="mahameru-label">
CORE FLOW
</span>

<strong>
Prepare · Submit · Monitor · Inspect
</strong>

</div>

</div>


<hr>


<h2 id="slurm-overview" class="mahameru-section-title">
What is SLURM?
</h2>

<p class="mahameru-section-intro">
SLURM digunakan untuk mengelola pekerjaan komputasi pada cluster.
Anda tidak perlu menjalankan seluruh pekerjaan langsung pada login node.
Siapkan pekerjaan, lalu serahkan pengelolaannya kepada scheduler.
</p>


<div class="mahameru-info-grid">

<div class="mahameru-info-card">

<span class="mahameru-info-icon">
01
</span>

<strong>
Prepare
</strong>

<p>
Siapkan input, script, software, dan kebutuhan resource.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
02
</span>

<strong>
Submit
</strong>

<p>
Kirim script menggunakan command SLURM.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
03
</span>

<strong>
Monitor
</strong>

<p>
Periksa status pekerjaan pada queue.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
04
</span>

<strong>
Inspect
</strong>

<p>
Periksa output setelah pekerjaan selesai.
</p>

</div>

</div>


<hr>


<h2 id="compute-resources" class="mahameru-section-title">
Compute Resources
</h2>

<p class="mahameru-section-intro">
Sebelum membuat job, pahami resource yang diperlukan oleh pekerjaan.
Resource yang diminta harus sesuai dengan kebutuhan simulasi.
</p>


<div class="mahameru-grid mahameru-grid-2">

<div class="mahameru-card">

<h3>
CPU
</h3>

<p>
Jumlah core CPU yang dibutuhkan oleh pekerjaan.
</p>

</div>


<div class="mahameru-card">

<h3>
Node
</h3>

<p>
Jumlah compute node yang dibutuhkan oleh pekerjaan.
</p>

</div>


<div class="mahameru-card">

<h3>
Time
</h3>

<p>
Batas waktu yang dialokasikan untuk pekerjaan.
</p>

</div>


<div class="mahameru-card">

<h3>
Partition
</h3>

<p>
Kelompok resource tempat job akan dijalankan.
</p>

</div>

</div>


<div class="mahameru-tip">

<strong>
Request according to your workload
</strong>

<p>
Gunakan resource sesuai kebutuhan pekerjaan. Jangan menentukan
resource hanya berdasarkan perkiraan tanpa memahami kebutuhan
simulasi.
</p>

</div>


<hr>


<h2 id="partition" class="mahameru-section-title">
Partition
</h2>

<p class="mahameru-section-intro">
Partition merupakan kelompok resource dengan karakteristik tertentu.
Materi Mahameru yang digunakan dalam workshop mencantumkan beberapa
partition CPU berikut.
</p>


<div class="mahameru-partition-grid">

<div class="mahameru-partition-card">

<strong>
short
</strong>

<span>
32 cores · 1 node
</span>

<small>
Maximum 1 day
</small>

</div>


<div class="mahameru-partition-card">

<strong>
medium-small
</strong>

<span>
32 cores · 1 node
</span>

<small>
Maximum 3 days
</small>

</div>


<div class="mahameru-partition-card">

<strong>
medium-large
</strong>

<span>
64 cores · 4 nodes
</span>

<small>
Maximum 3 days
</small>

</div>


<div class="mahameru-partition-card">

<strong>
long
</strong>

<span>
32 cores · 1 node
</span>

<small>
Maximum 7 days
</small>

</div>


<div class="mahameru-partition-card">

<strong>
very-long
</strong>

<span>
32 cores · 1 node
</span>

<small>
Maximum 30 days
</small>

</div>


<div class="mahameru-partition-card">

<strong>
interactive
</strong>

<span>
1–8 cores · 2 nodes
</span>

<small>
Maximum 4 hours
</small>

</div>

</div>


<div class="mahameru-note">

<strong>
Partition information</strong>

<p>
Daftar di atas mengikuti materi Mahameru yang menjadi dasar workshop.
Konfigurasi cluster dapat berubah. Periksa partition yang tersedia
pada sistem sebelum menjalankan pekerjaan.
</p>

</div>


<h3>
Check available partitions
</h3>

```bash
sinfo
```


<hr>


<h2 id="slurm-script" class="mahameru-section-title">
Create a SLURM Script
</h2>

<p class="mahameru-section-intro">
SLURM script berisi instruksi pekerjaan dan resource yang diperlukan.
Script biasanya dimulai dengan shell interpreter kemudian diikuti
oleh directive <code>#SBATCH</code>.
</p>


<div class="mahameru-card">

<h3>
Minimal structure
</h3>

```bash
#!/bin/bash

#SBATCH --job-name=my_job
#SBATCH --partition=short
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=00:30:00
#SBATCH --output=job-%j.out

module load <software>

cd $SLURM_SUBMIT_DIR

# command untuk menjalankan pekerjaan
```

</div>


<details>

<summary>
<strong>Memahami setiap bagian</strong>
</summary>

<p>
Directive <code>#SBATCH</code> digunakan untuk menentukan kebutuhan
job sebelum pekerjaan dijalankan.
</p>

<div class="mahameru-command-list">

<div class="mahameru-command-row">

<code>--job-name</code>

<span>
Nama pekerjaan.
</span>

</div>

<div class="mahameru-command-row">

<code>--partition</code>

<span>
Partition yang digunakan.
</span>

</div>

<div class="mahameru-command-row">

<code>--nodes</code>

<span>
Jumlah node yang diminta.
</span>

</div>

<div class="mahameru-command-row">

<code>--ntasks</code>

<span>
Jumlah task yang diminta.
</span>

</div>

<div class="mahameru-command-row">

<code>--time</code>

<span>
Batas waktu pekerjaan.
</span>

</div>

<div class="mahameru-command-row">

<code>--output</code>

<span>
Nama file output SLURM.
</span>

</div>

</div>

</details>


<hr>


<h2 id="workshop-example" class="mahameru-section-title">
Workshop Example
</h2>

<p class="mahameru-section-intro">
Berikut contoh pola script yang digunakan dalam research workflow
Quantum ESPRESSO pada workshop.
</p>


```bash
#!/bin/bash

#SBATCH --job-name=QE-test
#SBATCH --partition=short
#SBATCH --nodes=1
#SBATCH --ntasks=16
#SBATCH --time=00:30:00
#SBATCH --output=qe-%j.out

module load materials/qe/7.2-openmpi

cd $SLURM_SUBMIT_DIR

mkdir -p tmp

mpirun --mca btl ^openib -np 16 pw.x -in si.scf.in > si.scf.out
```


<div class="mahameru-tip">

<strong>
Do not copy blindly
</strong>

<p>
Contoh ini menunjukkan struktur job untuk research case tertentu.
Sesuaikan software, input, resource, dan command eksekusi dengan
pekerjaan yang sedang Anda jalankan.
</p>

</div>


<hr>


<h2 id="before-submit" class="mahameru-section-title">
Before You Submit
</h2>

<p class="mahameru-section-intro">
Lakukan pemeriksaan singkat sebelum mengirim job.
</p>


<div class="mahameru-checklist">

<div>

<span>
01
</span>

<strong>
Input Ready
</strong>

<p>
File input sudah tersedia.
</p>

</div>


<div>

<span>
02
</span>

<strong>
Software Ready
</strong>

<p>
Module yang diperlukan sudah diketahui.
</p>

</div>


<div>

<span>
03
</span>

<strong>
Resource Ready
</strong>

<p>
Partition, node, task, dan time sudah ditentukan.
</p>

</div>


<div>

<span>
04
</span>

<strong>
Output Ready
</strong>

<p>
Lokasi dan nama output sudah jelas.
</p>

</div>

</div>


<hr>


<h2 id="submit" class="mahameru-section-title">
Submit a Job
</h2>

<p class="mahameru-section-intro">
Setelah script siap, kirim pekerjaan ke SLURM menggunakan
<code>sbatch</code>.
</p>


<div class="mahameru-command-highlight">

<span>
SUBMIT
</span>

<code>
sbatch your_script.sh
</code>

</div>


<p>
Jika submission berhasil, SLURM akan memberikan Job ID.
Simpan Job ID tersebut karena dapat digunakan untuk mengenali
pekerjaan Anda pada queue.
</p>


<div class="mahameru-mini-flow">

<span>
Script
</span>

→

<span>
sbatch
</span>

→

<span>
Job ID
</span>

→

<span>
Queue
</span>

→

<span>
Running
</span>

</div>


<hr>


<h2 id="monitor" class="mahameru-section-title">
Monitor Your Job
</h2>

<p class="mahameru-section-intro">
Gunakan <code>squeue</code> untuk melihat pekerjaan yang berada
dalam sistem SLURM.
</p>


<div class="mahameru-command-highlight">

<span>
MONITOR
</span>

<code>
squeue -u $USER
</code>

</div>


<details open>

<summary>
<strong>Informasi yang perlu diperhatikan</strong>
</summary>

<div class="mahameru-job-grid">

<div class="mahameru-job-card">

<strong>
JOBID
</strong>

<p>
ID pekerjaan.
</p>

</div>


<div class="mahameru-job-card">

<strong>
PARTITION
</strong>

<p>
Partition yang digunakan.
</p>

</div>


<div class="mahameru-job-card">

<strong>
NAME
</strong>

<p>
Nama pekerjaan.
</p>

</div>


<div class="mahameru-job-card">

<strong>
USER
</strong>

<p>
Pemilik pekerjaan.
</p>

</div>


<div class="mahameru-job-card">

<strong>
ST
</strong>

<p>
Status pekerjaan.
</p>

</div>


<div class="mahameru-job-card">

<strong>
TIME
</strong>

<p>
Waktu yang sudah digunakan.
</p>

</div>

</div>

</details>


<hr>


<h2 id="job-status" class="mahameru-section-title">
Understand Job Status
</h2>


<div class="mahameru-status-grid">

<div class="mahameru-status-card">

<strong>
R
</strong>

<span>
Running
</span>

<p>
Job sedang berjalan.
</p>

</div>


<div class="mahameru-status-card">

<strong>
PD
</strong>

<span>
Pending
</span>

<p>
Job masih menunggu.
</p>

</div>


<div class="mahameru-status-card">

<strong>
CG
</strong>

<span>
Completing
</span>

<p>
Job sedang menyelesaikan proses.
</p>

</div>


<div class="mahameru-status-card">

<strong>
CD
</strong>

<span>
Completed
</span>

<p>
Job telah selesai.
</p>

</div>

</div>


<div class="mahameru-tip">

<strong>
Job belum running?</strong>

<p>
Status pending tidak otomatis berarti script bermasalah.
Periksa kondisi queue dan resource yang diminta sebelum
mengubah script.
</p>

</div>


<hr>


<h2 id="interactive-job" class="mahameru-section-title">
Interactive Job
</h2>

<p class="mahameru-section-intro">
Selain batch job, Mahameru juga menyediakan interactive job.
Mode ini berguna ketika Anda membutuhkan sesi interaktif pada
resource yang dialokasikan.
</p>


<div class="mahameru-command-highlight">

<span>
INTERACTIVE
</span>

<code>
srun --partition=interactive --pty /bin/bash
</code>

</div>


<details>

<summary>
<strong>Batch vs Interactive</strong>
</summary>

<div class="mahameru-grid mahameru-grid-2">

<div class="mahameru-card">

<h3>
Batch Job
</h3>

<p>
Pekerjaan dijalankan berdasarkan script yang dikirim ke scheduler.
</p>

<code>
sbatch your_script.sh
</code>

</div>


<div class="mahameru-card">

<h3>
Interactive Job
</h3>

<p>
Anda memperoleh sesi interaktif setelah SLURM mengalokasikan
resource yang diminta.
</p>

<code>
srun --partition=interactive --pty /bin/bash
</code>

</div>

</div>

</details>


<hr>


<h2 id="output" class="mahameru-section-title">
Output & Logs
</h2>

<p class="mahameru-section-intro">
Job yang selesai perlu diperiksa hasilnya. Jangan hanya melihat
status job. Periksa file output dan log yang dihasilkan.
</p>


<div class="mahameru-grid mahameru-grid-2">

<div class="mahameru-card">

<h3>
SLURM Output
</h3>

<p>
Nama output dapat ditentukan melalui directive:
</p>

<code>
#SBATCH --output=qe-%j.out
</code>

</div>


<div class="mahameru-card">

<h3>
Application Output
</h3>

<p>
Software juga dapat menghasilkan file output sendiri.
Contoh workflow QE:
</p>

<code>
si.scf.out
</code>

</div>

</div>


<details>

<summary>
<strong>Example output workflow</strong>
</summary>

```text
qe_test/
├── si.scf.in
├── run_qe.sh
├── qe-12345.out
├── si.scf.out
└── tmp/
```

<p>
Nama dan isi file mengikuti script serta software yang digunakan.
</p>

</details>


<div class="mahameru-tip">

<strong>
Check the result</strong>

<p>
Pastikan output tersedia dan berisi hasil yang diharapkan sebelum
melanjutkan ke tahap analisis.
</p>

</div>


<hr>


<h2 id="troubleshooting" class="mahameru-section-title">
Quick Troubleshooting
</h2>


<details>

<summary>
<strong>Job masih Pending</strong>
</summary>

<p>
Periksa status job dengan:
</p>

```bash
squeue -u $USER
```

<p>
Kemudian perhatikan partition, status, dan resource yang diminta.
</p>

</details>


<details>

<summary>
<strong>Module tidak ditemukan</strong>
</summary>

<p>
Periksa module yang tersedia:
</p>

```bash
module avail
```

<p>
Kemudian gunakan nama module yang tersedia pada sistem.
</p>

</details>


<details>

<summary>
<strong>File output tidak ditemukan</strong>
</summary>

<p>
Periksa lokasi kerja:
</p>

```bash
pwd
```

<p>
Kemudian lihat file:
</p>

```bash
ls
```

</details>


<details>

<summary>
<strong>Job sudah selesai tetapi hasil belum sesuai</strong>
</summary>

<p>
Periksa kembali:

</p>

<ul>

<li>file input</li>

<li>software module</li>

<li>parameter simulasi</li>

<li>resource yang diminta</li>

<li>file output dan log</li>

</ul>

</details>


<hr>


<h2 id="quick-reference" class="mahameru-section-title">
Quick Reference
</h2>


<div class="mahameru-command-grid">

<div>

<strong>
Partitions
</strong>

<code>
sinfo
</code>

</div>


<div>

<strong>
Submit
</strong>

<code>
sbatch your_script.sh
</code>

</div>


<div>

<strong>
Monitor
</strong>

<code>
squeue -u $USER
</code>

</div>


<div>

<strong>
Interactive
</strong>

<code>
srun --partition=interactive --pty /bin/bash
</code>

</div>


<div>

<strong>
Modules
</strong>

<code>
module avail
</code>

</div>


<div>

<strong>
Load Software
</strong>

<code>
module load &lt;software&gt;
</code>

</div>

</div>


<hr>


<h2 id="practice" class="mahameru-section-title">
Mini Practice
</h2>

<p class="mahameru-section-intro">
Gunakan alur berikut untuk memahami siklus sederhana sebuah job.
</p>


<div class="mahameru-practice">

<div>

<span>
01
</span>

<strong>
Check partition
</strong>

```bash
sinfo
```

</div>


<div>

<span>
02
</span>

<strong>
Prepare script
</strong>

```text
run.sh
```

</div>


<div>

<span>
03
</span>

<strong>
Submit
</strong>

```bash
sbatch run.sh
```

</div>


<div>

<span>
04
</span>

<strong>
Monitor
</strong>

```bash
squeue -u $USER
```

</div>


<div>

<span>
05
</span>

<strong>
Inspect
</strong>

```bash
ls
```

</div>

</div>


<div class="mahameru-next">

<strong>
Next · Workshop Workflow
</strong>

<p>
SLURM sudah siap digunakan. Selanjutnya hubungkan workflow job
dengan research case, mulai dari model preparation sampai analysis.
</p>

<a href="./workshop-workflow.md">
Workshop Workflow →
</a>

</div>

</div>
