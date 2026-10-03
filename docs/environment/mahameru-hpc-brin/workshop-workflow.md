<div class="mahameru-page">

<div class="mahameru-tabs">

<a class="mahameru-tab" href="../getting-started.md">
Getting Started
</a>

<a class="mahameru-tab" href="./working-on-mahameru.md">
Working on Mahameru
</a>

<a class="mahameru-tab" href="./slurm-computing.md">
SLURM & Computing
</a>

<a class="mahameru-tab active" href="./workshop-workflow.md">
Workshop Workflow
</a>

</div>


<p class="mahameru-intro">
Halaman ini menghubungkan workflow simulasi workshop dengan lingkungan
komputasi Mahameru HPC BRIN. Ikuti alur dari persiapan model sampai
analisis hasil secara bertahap.
</p>


<div class="mahameru-hero">

<div class="mahameru-hero-content">

<span class="mahameru-label">
WORKSHOP WORKFLOW
</span>

<h2>
From model to analysis
</h2>

<p>
Siapkan sistem, jalankan simulasi, gunakan compute resources,
kemudian periksa dan analisis hasilnya.
</p>

</div>

<div class="mahameru-hero-status">

<span class="mahameru-label">
CORE FLOW
</span>

<strong>
Prepare · Simulate · Analyze
</strong>

</div>

</div>


<hr>


<h2 id="workflow-overview" class="mahameru-section-title">
Workflow Overview
</h2>

<p class="mahameru-section-intro">
Workshop menggunakan alur bertahap. Setiap tahap menghasilkan file
atau informasi yang digunakan pada tahap berikutnya.
</p>


<div class="mahameru-workflow">

<div class="mahameru-workflow-step">

<span>
01
</span>

<strong>
Model Preparation
</strong>

<p>
Siapkan struktur dan sistem.
</p>

</div>


<div class="mahameru-workflow-arrow">
→
</div>


<div class="mahameru-workflow-step">

<span>
02
</span>

<strong>
Simulation Setup
</strong>

<p>
Siapkan input dan parameter.
</p>

</div>


<div class="mahameru-workflow-arrow">
→
</div>


<div class="mahameru-workflow-step">

<span>
03
</span>

<strong>
HPC Execution
</strong>

<p>
Jalankan pekerjaan di Mahameru.
</p>

</div>


<div class="mahameru-workflow-arrow">
→
</div>


<div class="mahameru-workflow-step">

<span>
04
</span>

<strong>
Analysis
</strong>

<p>
Periksa dan analisis hasil.
</p>

</div>

</div>


<div class="mahameru-tip">

<strong>
Think in files</strong>

<p>
Setiap tahap sebaiknya menghasilkan output yang jelas. Pastikan
input, script, output, dan hasil analisis tersimpan pada lokasi
yang mudah ditemukan.
</p>

</div>


<hr>


<h2 id="model-preparation" class="mahameru-section-title">
01 · Model Preparation
</h2>

<p class="mahameru-section-intro">
Tahap pertama menyiapkan model yang akan digunakan dalam simulasi.
</p>


<div class="mahameru-info-grid">

<div class="mahameru-info-card">

<span class="mahameru-info-icon">
01
</span>

<strong>
Build the model
</strong>

<p>
Siapkan struktur sistem sesuai kasus workshop.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
02
</span>

<strong>
Check structure
</strong>

<p>
Pastikan struktur dan komponen sistem sudah sesuai.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
03
</span>

<strong>
Prepare input
</strong>

<p>
Siapkan file input yang diperlukan oleh software simulasi.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
04
</span>

<strong>
Organize files
</strong>

<p>
Simpan file pada workspace yang terstruktur.
</p>

</div>

</div>


<details open>

<summary>
<strong>Graphene + Ionic Liquid Interface</strong>
</summary>

<p>
Pada research case workshop, model sistem terdiri dari permukaan
graphene dan ionic liquid interface.
</p>

<p>
Tahap persiapan menghasilkan struktur yang kemudian digunakan
sebagai input untuk tahap simulasi.
</p>

</details>


<hr>


<h2 id="simulation-setup" class="mahameru-section-title">
02 · Simulation Setup
</h2>

<p class="mahameru-section-intro">
Setelah model siap, tentukan software, input file, parameter,
dan environment yang diperlukan.
</p>


<div class="mahameru-grid mahameru-grid-2">

<div class="mahameru-card">

<span class="mahameru-card-number">
INPUT
</span>

<h3>
Input Files
</h3>

<p>
Siapkan file struktur, parameter, dan konfigurasi yang dibutuhkan
oleh software.
</p>

</div>


<div class="mahameru-card">

<span class="mahameru-card-number">
SOFTWARE
</span>

<h3>
Software Environment
</h3>

<p>
Periksa module dan aktifkan environment yang sesuai sebelum
menjalankan simulasi.
</p>

</div>

</div>


<details>

<summary>
<strong>Preparation checklist</strong>
</summary>

<ul>

<li>Model sudah tersedia.</li>

<li>Input file sudah diperiksa.</li>

<li>Software yang diperlukan tersedia.</li>

<li>Environment sudah disiapkan.</li>

<li>Workspace sudah ditentukan.</li>

</ul>

</details>


<hr>


<h2 id="hpc-execution" class="mahameru-section-title">
03 · HPC Execution
</h2>

<p class="mahameru-section-intro">
Pekerjaan komputasi dijalankan pada resource HPC melalui scheduler
sesuai kebutuhan simulasi.
</p>


<div class="mahameru-workflow">

<div class="mahameru-workflow-step">

<span>
01
</span>

<strong>
Prepare Script
</strong>

<p>
Siapkan script pekerjaan.
</p>

</div>


<div class="mahameru-workflow-arrow">
→
</div>


<div class="mahameru-workflow-step">

<span>
02
</span>

<strong>
Submit</strong>

<p>
Kirim job ke SLURM.
</p>

</div>


<div class="mahameru-workflow-arrow">
→
</div>


<div class="mahameru-workflow-step">

<span>
03
</span>

<strong>
Monitor
</strong>

<p>
Periksa status job.
</p>

</div>


<div class="mahameru-workflow-arrow">
→
</div>


<div class="mahameru-workflow-step">

<span>
04
</span>

<strong>
Collect</strong>

<p>
Periksa output.
</p>

</div>

</div>


<details>

<summary>
<strong>Basic execution flow</strong>
</summary>

<p>
Siapkan script SLURM dan kirim pekerjaan menggunakan:
</p>

```bash
sbatch your_script.sh
```

<p>
Kemudian periksa status pekerjaan:
</p>

```bash
squeue
```

<p>
Setelah pekerjaan selesai, periksa file output pada workspace.
</p>

</details>


<div class="mahameru-tip">

<strong>
Do not skip the output check</strong>

<p>
Job yang selesai belum tentu menghasilkan output yang sesuai.
Periksa file output dan log sebelum melanjutkan ke analisis.
</p>

</div>


<hr>


<h2 id="simulation" class="mahameru-section-title">
04 · Simulation
</h2>

<p class="mahameru-section-intro">
Tahap simulasi menghasilkan data yang akan digunakan pada analisis.
Jenis simulasi mengikuti research case yang sedang dikerjakan.
</p>


<div class="mahameru-grid mahameru-grid-2">

<div class="mahameru-card">

<span class="mahameru-card-number">
MD
</span>

<h3>
Molecular Dynamics
</h3>

<p>
Gunakan workflow MD sesuai konfigurasi kasus dan software yang
digunakan pada workshop.
</p>

</div>


<div class="mahameru-card">

<span class="mahameru-card-number">
DFT
</span>

<h3>
First-Principles Calculation
</h3>

<p>
Gunakan workflow perhitungan first-principles sesuai kebutuhan
research case.
</p>

</div>

</div>


<div class="mahameru-note">

<strong>
Choose the workflow from the research case</strong>

<p>
Tidak semua kasus menggunakan tahap simulasi yang sama.
Ikuti input, software, dan parameter yang ditentukan pada case
yang sedang dikerjakan.
</p>

</div>


<hr>


<h2 id="analysis" class="mahameru-section-title">
05 · Analysis
</h2>

<p class="mahameru-section-intro">
Setelah simulasi selesai, periksa hasil sebelum melakukan analisis
lebih lanjut.
</p>


<div class="mahameru-info-grid">

<div class="mahameru-info-card">

<span class="mahameru-info-icon">
01
</span>

<strong>
Check Output
</strong>

<p>
Pastikan file hasil simulasi tersedia.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
02
</span>

<strong>
Validate
</strong>

<p>
Periksa apakah hasil sesuai dengan konfigurasi pekerjaan.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
03
</span>

<strong>
Analyze
</strong>

<p>
Gunakan tools analisis yang sesuai dengan research case.
</p>

</div>


<div class="mahameru-info-card">

<span class="mahameru-info-icon">
04
</span>

<strong>
Record
</strong>

<p>
Simpan hasil dan catatan analisis secara terstruktur.
</p>

</div>

</div>


<hr>


<h2 id="file-organization" class="mahameru-section-title">
Organize Your Workspace
</h2>

<p class="mahameru-section-intro">
Struktur folder yang rapi membantu Anda membedakan input,
script, output, dan hasil analisis.
</p>


<div class="mahameru-folder-tree">

```text
project/
├── input/
│   ├── structure.xyz
│   └── input.in
│
├── scripts/
│   └── run.sh
│
├── output/
│   └── simulation.out
│
└── analysis/
    └── results/
```

</div>


<div class="mahameru-tip">

<strong>
Keep raw outputs</strong>

<p>
Jangan langsung menghapus output mentah. Simpan hasil asli sebelum
melakukan pemrosesan atau analisis lanjutan.
</p>

</div>


<hr>


<h2 id="workflow-check" class="mahameru-section-title">
Workflow Check
</h2>

<div class="mahameru-checklist">

<div>

<span>
01
</span>

<strong>
Model Ready
</strong>

<p>
Struktur sudah siap.
</p>

</div>


<div>

<span>
02
</span>

<strong>
Input Ready
</strong>

<p>
Input dan parameter sudah diperiksa.
</p>

</div>


<div>

<span>
03
</span>

<strong>
Job Ready
</strong>

<p>
Script dan resource sudah disiapkan.
</p>

</div>


<div>

<span>
04
</span>

<strong>
Result Ready
</strong>

<p>
Output sudah diperiksa.
</p>

</div>

</div>


<div class="mahameru-next">

<strong>
Workshop Workflow Complete</strong>

<p>
Anda sudah memiliki alur dari model preparation sampai analysis.
Selanjutnya gunakan research case untuk menerapkan workflow ini
pada pekerjaan nyata.
</p>

<a href="../../hands-on-project/research-cases/graphene-ionic-liquid-interface/">
Open Research Case →
</a>

</div>

</div>
