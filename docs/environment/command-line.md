# Command Line

<div class="environment-hero environment-hero-compact">

<div class="environment-eyebrow">
HPC COMMAND REFERENCE
</div>

<h1>
Command Line
</h1>

<p class="environment-description">
Perintah penting untuk bekerja di HPC, mulai dari memeriksa project,
menyiapkan environment, menjalankan job, hingga memeriksa hasil.
</p>

<div class="environment-tags">
<span>NAVIGATE</span>
<span>PREPARE</span>
<span>RUN</span>
<span>MONITOR</span>
<span>VERIFY</span>
</div>

</div>

---

## Quick Reference

<p class="section-description">
Gunakan tabel ini sebagai referensi utama. Cari kebutuhan Anda,
lalu gunakan contoh perintahnya di terminal.
</p>

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Tahap</th>
<th>Kebutuhan</th>
<th>Perintah</th>
<th>Contoh</th>
</tr>
</thead>

<tbody>

<tr>
<td>Mulai</td>
<td>Periksa lokasi</td>
<td><code>pwd</code></td>
<td><code>pwd</code></td>
</tr>

<tr>
<td>Mulai</td>
<td>Lihat file</td>
<td><code>ls</code></td>
<td><code>ls -lh</code></td>
</tr>

<tr>
<td>Navigasi</td>
<td>Masuk folder</td>
<td><code>cd</code></td>
<td><code>cd project/</code></td>
</tr>

<tr>
<td>Project</td>
<td>Buat folder</td>
<td><code>mkdir</code></td>
<td><code>mkdir -p input/</code></td>
</tr>

<tr>
<td>Project</td>
<td>Salin file</td>
<td><code>cp</code></td>
<td><code>cp file.in backup/</code></td>
</tr>

<tr>
<td>Project</td>
<td>Pindahkan file</td>
<td><code>mv</code></td>
<td><code>mv file.in input/</code></td>
</tr>

<tr>
<td>Periksa</td>
<td>Lihat module aktif</td>
<td><code>module list</code></td>
<td><code>module list</code></td>
</tr>

<tr>
<td>Periksa</td>
<td>Cari software</td>
<td><code>module avail</code></td>
<td><code>module avail</code></td>
</tr>

<tr>
<td>Periksa</td>
<td>Cek executable</td>
<td><code>which</code></td>
<td><code>which pw.x</code></td>
</tr>

<tr>
<td>Jalankan</td>
<td>Submit job</td>
<td><code>sbatch</code></td>
<td><code>sbatch scripts/run.slurm</code></td>
</tr>

<tr>
<td>Pantau</td>
<td>Cek antrean</td>
<td><code>squeue</code></td>
<td><code>squeue -u $USER</code></td>
</tr>

<tr>
<td>Pantau</td>
<td>Lihat output langsung</td>
<td><code>tail -f</code></td>
<td><code>tail -f output/calculation.out</code></td>
</tr>

<tr>
<td>Verifikasi</td>
<td>Lihat status job</td>
<td><code>sacct</code></td>
<td><code>sacct -j JOBID</code></td>
</tr>

<tr>
<td>Verifikasi</td>
<td>Cari error</td>
<td><code>grep</code></td>
<td><code>grep -i "error" output/calculation.out</code></td>
</tr>

<tr>
<td>Verifikasi</td>
<td>Periksa output akhir</td>
<td><code>tail</code></td>
<td><code>tail -n 50 output/calculation.out</code></td>
</tr>

<tr>
<td>Kontrol</td>
<td>Batalkan job</td>
<td><code>scancel</code></td>
<td><code>scancel JOBID</code></td>
</tr>

</tbody>

</table>

</div>

---

## 01 · Mulai di Terminal

<p class="section-description">
Pastikan Anda mengetahui lokasi kerja sebelum melakukan perubahan
atau menjalankan perhitungan.
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
<td><code>pwd</code></td>
<td>Menampilkan direktori saat ini</td>
<td><code>pwd</code></td>
</tr>

<tr>
<td><code>ls -lh</code></td>
<td>Menampilkan file dan ukuran</td>
<td><code>ls -lh</code></td>
</tr>

<tr>
<td><code>cd project/</code></td>
<td>Masuk ke direktori project</td>
<td><code>cd project/</code></td>
</tr>

<tr>
<td><code>cd ..</code></td>
<td>Kembali satu tingkat</td>
<td><code>cd ..</code></td>
</tr>

</tbody>

</table>

</div>

---

## 02 · Kelola Project

<p class="section-description">
Gunakan struktur folder yang jelas untuk memisahkan input,
script, output, dan analisis.
</p>

```text
project/
├── input/
├── scripts/
├── output/
└── analysis/
```

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
<td><code>mkdir -p</code></td>
<td>Membuat folder</td>
<td><code>mkdir -p project/input</code></td>
</tr>

<tr>
<td><code>cp</code></td>
<td>Menyalin file</td>
<td><code>cp input.in backup/</code></td>
</tr>

<tr>
<td><code>mv</code></td>
<td>Memindahkan atau mengganti nama file</td>
<td><code>mv old.in new.in</code></td>
</tr>

<tr>
<td><code>find</code></td>
<td>Mencari file</td>
<td><code>find . -name "*.in"</code></td>
</tr>

</tbody>

</table>

</div>

---

## 03 · Siapkan & Periksa

<p class="section-description">
Sebelum menjalankan job, pastikan software yang dibutuhkan
tersedia dan executable dapat ditemukan.
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
<td><code>module load</code></td>
<td>Memuat software</td>
<td><code>module load quantum-espresso</code></td>
</tr>

<tr>
<td><code>module list</code></td>
<td>Melihat module aktif</td>
<td><code>module list</code></td>
</tr>

<tr>
<td><code>which</code></td>
<td>Menemukan executable</td>
<td><code>which pw.x</code></td>
</tr>

</tbody>

</table>

</div>

---

## 04 · Jalankan Job

<p class="section-description">
Setelah input, script, software, dan resource siap,
kirim job ke scheduler.
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
<td><code>sbatch</code></td>
<td>Mengirim job ke SLURM</td>
<td><code>sbatch scripts/run.slurm</code></td>
</tr>

</tbody>

</table>

</div>

Contoh respons:

```text
Submitted batch job 38142
```

Catat:

```text
38142
```

sebagai **JOB ID**.

---

## 05 · Pantau Job

<p class="section-description">
Gunakan JOB ID dan output file untuk mengetahui perkembangan
perhitungan.
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
<td><code>squeue</code></td>
<td>Melihat job dalam antrean</td>
<td><code>squeue -u $USER</code></td>
</tr>

<tr>
<td><code>scontrol</code></td>
<td>Melihat detail job</td>
<td><code>scontrol show job JOBID</code></td>
</tr>

<tr>
<td><code>tail -f</code></td>
<td>Memantau output secara langsung</td>
<td><code>tail -f output/calculation.out</code></td>
</tr>

</tbody>

</table>

</div>

Status umum:

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Status</th>
<th>Arti</th>
</tr>
</thead>

<tbody>

<tr>
<td><code>PD</code></td>
<td>Job masih menunggu</td>
</tr>

<tr>
<td><code>R</code></td>
<td>Job sedang berjalan</td>
</tr>

<tr>
<td><code>CG</code></td>
<td>Job sedang menyelesaikan proses</td>
</tr>

<tr>
<td><code>CD</code></td>
<td>Job selesai</td>
</tr>

</tbody>

</table>

</div>

Untuk menghentikan pemantauan output:

```text
Ctrl + C
```

---

## 06 · Periksa Hasil

<p class="section-description">
Job selesai tidak selalu berarti perhitungan berhasil.
Periksa status dan output sebelum melakukan analisis.
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
<td><code>sacct</code></td>
<td>Memeriksa riwayat job</td>
<td><code>sacct -j JOBID</code></td>
</tr>

<tr>
<td><code>tail</code></td>
<td>Memeriksa bagian akhir output</td>
<td><code>tail -n 50 output/calculation.out</code></td>
</tr>

<tr>
<td><code>grep</code></td>
<td>Mencari error</td>
<td><code>grep -i "error" output/calculation.out</code></td>
</tr>

<tr>
<td><code>grep</code></td>
<td>Mencari warning</td>
<td><code>grep -i "warning" output/calculation.out</code></td>
</tr>

</tbody>

</table>

</div>

### Pemeriksaan Minimum

```bash
sacct -j JOBID

tail -n 50 output/calculation.out

grep -i "error" output/calculation.out
```

Untuk Quantum ESPRESSO:

```bash
grep "JOB DONE" output/graphene_scf.out
```

---

## 07 · Jika Bermasalah

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Masalah</th>
<th>Pemeriksaan Pertama</th>
<th>Perintah</th>
</tr>
</thead>

<tbody>

<tr>
<td>Job tidak muncul</td>
<td>Periksa antrean</td>
<td><code>squeue -u $USER</code></td>
</tr>

<tr>
<td>Job pending</td>
<td>Periksa detail job</td>
<td><code>scontrol show job JOBID</code></td>
</tr>

<tr>
<td>Command tidak ditemukan</td>
<td>Periksa executable</td>
<td><code>which COMMAND</code></td>
</tr>

<tr>
<td>Software tidak tersedia</td>
<td>Periksa module</td>
<td><code>module avail</code></td>
</tr>

<tr>
<td>Job gagal</td>
<td>Periksa status</td>
<td><code>sacct -j JOBID</code></td>
</tr>

<tr>
<td>Output bermasalah</td>
<td>Periksa output terakhir</td>
<td><code>tail -n 50 output.out</code></td>
</tr>

<tr>
<td>Error aplikasi</td>
<td>Cari pesan error</td>
<td><code>grep -i "error" output.out</code></td>
</tr>

</tbody>

</table>

</div>

---

## Alur Singkat

<div class="execution-pipeline">

<div>
<span>01</span>
<p>Siapkan</p>
</div>

<div>→</div>

<div>
<span>02</span>
<p>Periksa</p>
</div>

<div>→</div>

<div>
<span>03</span>
<p>Submit</p>
</div>

<div>→</div>

<div>
<span>04</span>
<p>Pantau</p>
</div>

<div>→</div>

<div>
<span>05</span>
<p>Verifikasi</p>
</div>

</div>

```text
cd project/
        ↓
ls -lh
        ↓
module list
        ↓
sbatch scripts/run.slurm
        ↓
squeue -u $USER
        ↓
tail -f output/calculation.out
        ↓
sacct -j JOBID
        ↓
grep -i "error" output/calculation.out
```

---

## Command Line Checklist

<div class="checklist">

<div>Lokasi project sudah diperiksa</div>

<div>File input sudah tersedia</div>

<div>Script job sudah tersedia</div>

<div>Software environment sudah diperiksa</div>

<div>Job berhasil dikirim</div>

<div>JOB ID sudah dicatat</div>

<div>Status job sudah dipantau</div>

<div>Output sudah diperiksa</div>

<div>Error sudah diperiksa</div>

<div>Hasil siap dianalisis</div>

</div>

---

<div class="environment-banner">

<h2>
Command Line Ready
</h2>

<p>
Gunakan halaman ini sebagai referensi cepat selama bekerja
di lingkungan HPC.
</p>

<a href="../software-environment/">
Software Environment →
</a>

<a href="../running-calculations/">
Running Calculations →
</a>

</div>
