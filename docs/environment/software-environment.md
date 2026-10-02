# Software Environment

<div class="environment-hero environment-hero-compact">

<div class="environment-eyebrow">
HPC SOFTWARE ENVIRONMENT
</div>

<h1>
Software Environment
</h1>

<p class="environment-description">
Siapkan dan periksa software yang diperlukan sebelum menjalankan
perhitungan pada sistem HPC.
</p>

<div class="environment-tags">
<span>CHECK</span>
<span>LOAD</span>
<span>VERIFY</span>
<span>RUN</span>
</div>

</div>

---

## Alur Singkat

<p class="section-description">
Sebelum mengirim job, pastikan software yang diperlukan tersedia,
environment sudah dimuat, dan executable dapat ditemukan.
</p>

<div class="execution-pipeline">

<div>
<span>01</span>
<p>Cek</p>
</div>

<div>→</div>

<div>
<span>02</span>
<p>Load</p>
</div>

<div>→</div>

<div>
<span>03</span>
<p>Verifikasi</p>
</div>

<div>→</div>

<div>
<span>04</span>
<p>Run</p>
</div>

</div>

---

## 01 · Cek Software

<p class="section-description">
HPC biasanya menyediakan berbagai aplikasi melalui module system.
Mulai dengan melihat software yang tersedia pada cluster.
</p>

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Perintah</th>
<th>Fungsi</th>
<th>Contoh</th>
</tr>
</thead>

<tbody>

<tr>
<td><code>module avail</code></td>
<td>Melihat software yang tersedia</td>
<td><code>module avail</code></td>
</tr>

<tr>
<td><code>module avail quantum-espresso</code></td>
<td>Mencari module Quantum ESPRESSO</td>
<td><code>module avail quantum-espresso</code></td>
</tr>

<tr>
<td><code>module list</code></td>
<td>Melihat module yang sedang aktif</td>
<td><code>module list</code></td>
</tr>

<tr>
<td><code>which pw.x</code></td>
<td>Memeriksa lokasi executable</td>
<td><code>which pw.x</code></td>
</tr>

</tbody>

</table>

</div>

---

## 02 · Load Environment

<p class="section-description">
Setelah menemukan software yang diperlukan, muat module tersebut
ke dalam environment terminal.
</p>

### Quantum ESPRESSO

```bash
module load quantum-espresso
```

Periksa module yang aktif:

```bash
module list
```

Periksa executable:

```bash
which pw.x
```

### LAMMPS

```bash
module load lammps
```

Periksa executable:

```bash
which lmp
```

> Nama module dan executable mengikuti konfigurasi HPC yang digunakan.

---

## 03 · Verifikasi

<p class="section-description">
Environment yang berhasil dimuat belum cukup. Pastikan executable
dapat dijalankan sebelum mengirim job.
</p>

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Pemeriksaan</th>
<th>Perintah</th>
<th>Tujuan</th>
</tr>
</thead>

<tbody>

<tr>
<td>Module aktif</td>
<td><code>module list</code></td>
<td>Memastikan module sudah dimuat</td>
</tr>

<tr>
<td>Executable</td>
<td><code>which pw.x</code></td>
<td>Memastikan program tersedia</td>
</tr>

<tr>
<td>Executable LAMMPS</td>
<td><code>which lmp</code></td>
<td>Memastikan LAMMPS tersedia</td>
</tr>

<tr>
<td>Compiler</td>
<td><code>which gcc</code></td>
<td>Melihat compiler yang digunakan</td>
</tr>

<tr>
<td>MPI</td>
<td><code>which mpirun</code></td>
<td>Memeriksa MPI yang tersedia</td>
</tr>

</tbody>

</table>

</div>

---

## 04 · Contoh Quantum ESPRESSO

<p class="section-description">
Untuk workflow Quantum ESPRESSO, environment perlu siap sebelum
menjalankan tahap SCF, NSCF, DOS, atau Band Structure.
</p>

### Siapkan Environment

```bash
module load quantum-espresso
```

### Verifikasi

```bash
module list
```

```bash
which pw.x
```

### Periksa Input

```bash
ls -lh input/
```

Contoh struktur:

```text
graphene/
├── input/
│   └── graphene_scf.in
│
├── scripts/
│   └── run_scf.slurm
│
├── output/
│
└── analysis/
```

### Jalankan melalui SLURM

```bash
sbatch scripts/run_scf.slurm
```

Setelah job dikirim, lanjutkan ke:

```bash
squeue -u $USER
```

---

## 05 · Contoh LAMMPS

<p class="section-description">
Workflow LAMMPS mengikuti prinsip yang sama. Siapkan module,
periksa executable, lalu gunakan script SLURM untuk menjalankan simulasi.
</p>

### Siapkan Environment

```bash
module load lammps
```

### Verifikasi

```bash
module list
```

```bash
which lmp
```

### Periksa Input

```bash
ls -lh input/
```

### Jalankan Job

```bash
sbatch scripts/run.slurm
```

Pantau:

```bash
squeue -u $USER
```

---

## 06 · Jika Software Tidak Ditemukan

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Masalah</th>
<th>Pemeriksaan</th>
<th>Perintah</th>
</tr>
</thead>

<tbody>

<tr>
<td>Module tidak ditemukan</td>
<td>Cari software yang tersedia</td>
<td><code>module avail</code></td>
</tr>

<tr>
<td>Executable tidak ditemukan</td>
<td>Periksa module aktif</td>
<td><code>module list</code></td>
</tr>

<tr>
<td><code>pw.x</code> tidak ditemukan</td>
<td>Periksa environment QE</td>
<td><code>which pw.x</code></td>
</tr>

<tr>
<td><code>lmp</code> tidak ditemukan</td>
<td>Periksa environment LAMMPS</td>
<td><code>which lmp</code></td>
</tr>

</tbody>

</table>

</div>

Gunakan urutan sederhana:

```text
module avail
      ↓
module load SOFTWARE
      ↓
module list
      ↓
which EXECUTABLE
```

Jika executable sudah ditemukan, environment siap digunakan.

---

## Environment Checklist

<div class="checklist">

<div>Software yang diperlukan sudah tersedia</div>

<div>Module yang benar sudah dimuat</div>

<div>Environment sudah diperiksa</div>

<div>Executable sudah ditemukan</div>

<div>Input file sudah tersedia</div>

<div>Script SLURM sudah tersedia</div>

<div>Job siap dikirim</div>

</div>

---

<div class="environment-banner">

<h2>
Environment Ready
</h2>

<p>
Setelah software dan executable terverifikasi, lanjutkan ke
Running Calculations untuk menyiapkan dan menjalankan job HPC.
</p>

<a href="../running-calculations/">
Running Calculations →
</a>

</div>
