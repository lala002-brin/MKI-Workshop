# Running Calculations

<div class="environment-hero environment-hero-compact">

<div class="environment-eyebrow">
HPC JOB WORKFLOW
</div>

<h1>
Running Calculations
</h1>

<p class="environment-description">
Panduan praktis untuk mengubah input yang sudah siap menjadi
perhitungan HPC yang berjalan, terpantau, dan terverifikasi.
</p>

<div class="environment-tags">
<span>PREPARE</span>
<span>SUBMIT</span>
<span>MONITOR</span>
<span>VERIFY</span>
</div>

</div>

---

## Job Lifecycle

<p class="section-description">
Setiap perhitungan HPC mengikuti siklus dasar yang sama.
Detail aplikasi dapat berbeda, tetapi proses pengelolaan job tetap serupa.
</p>

<div class="execution-pipeline">

<div>
<span>01</span>
<p>Prepare</p>
</div>

<div>→</div>

<div>
<span>02</span>
<p>Submit</p>
</div>

<div>→</div>

<div>
<span>03</span>
<p>Monitor</p>
</div>

<div>→</div>

<div>
<span>04</span>
<p>Verify</p>
</div>

</div>

---

## 01 · Prepare

<p class="section-description">
Pastikan input dan script SLURM sudah siap sebelum mengirim job.
</p>

### Project Structure

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

Struktur ini memisahkan file input, script, output,
dan hasil analisis sehingga project lebih mudah dikelola.

### Before Submission

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Periksa</th>
<th>Yang Harus Dipastikan</th>
</tr>
</thead>

<tbody>

<tr>
<td>Input</td>
<td>File input tersedia dan berada pada lokasi yang benar</td>
</tr>

<tr>
<td>Script</td>
<td>SLURM script menggunakan input dan output yang benar</td>
</tr>

<tr>
<td>Software</td>
<td>Environment sudah disiapkan</td>
</tr>

<tr>
<td>Resource</td>
<td>CPU, memory, GPU, dan wall time sesuai kebutuhan</td>
</tr>

<tr>
<td>Output</td>
<td>Lokasi output sudah ditentukan</td>
</tr>

</tbody>

</table>

</div>

---

## 02 · Submit

<p class="section-description">
Setelah project siap, kirim script SLURM ke scheduler.
</p>

### Submit the Job

```bash
sbatch scripts/run.slurm
```

Contoh respons:

```text
Submitted batch job 38142
```

Nomor:

```text
38142
```

merupakan **JOB ID**.

Simpan JOB ID tersebut. Anda akan menggunakannya
untuk memantau dan memeriksa job.

### Submission Flow

```text
Input
  ↓
SLURM Script
  ↓
sbatch
  ↓
JOB ID
  ↓
Scheduler
```

---

## 03 · Monitor

<p class="section-description">
Setelah job dikirim, periksa statusnya dan pantau output
selama perhitungan berlangsung.
</p>

### Check Job Status

```bash
squeue -u $USER
```

Status yang umum:

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
<td>Job masih menunggu resource</td>
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
<td>Job telah selesai</td>
</tr>

<tr>
<td><code>F</code></td>
<td>Job gagal</td>
</tr>

<tr>
<td><code>CA</code></td>
<td>Job dibatalkan</td>
</tr>

</tbody>

</table>

</div>

### Inspect Job

Jika membutuhkan informasi lebih detail:

```bash
scontrol show job JOBID
```

Perintah ini membantu memeriksa informasi seperti
partition, node, resource, dan status job.

### Monitor Output

Jika aplikasi menghasilkan output secara bertahap:

```bash
tail -f output/calculation.out
```

Hentikan tampilan live dengan:

```text
Ctrl + C
```

---

## 04 · Verify

<p class="section-description">
Jangan langsung melakukan analisis setelah job mencapai status selesai.
Periksa status dan output untuk memastikan perhitungan menghasilkan
hasil yang diharapkan.
</p>

### Check Job History

```bash
sacct -j JOBID
```

### Check Final Output

```bash
tail -n 50 output/calculation.out
```

### Check Errors

```bash
grep -i "error" output/calculation.out
```

### Check Warnings

```bash
grep -i "warning" output/calculation.out
```

Gunakan urutan berikut:

```text
JOB COMPLETED
      ↓
OUTPUT EXISTS
      ↓
OUTPUT COMPLETE
      ↓
NO CRITICAL ERROR
      ↓
EXPECTED RESULT
      ↓
READY FOR ANALYSIS
```

> Status `COMPLETED` dari scheduler menunjukkan status job,
> tetapi pemeriksaan output tetap diperlukan untuk memastikan
> aplikasi menghasilkan hasil yang diharapkan.

---

## 05 · Troubleshooting

<p class="section-description">
Jika perhitungan tidak berjalan sesuai harapan, mulai dari status job,
kemudian periksa output dan konfigurasi yang digunakan.
</p>

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Kondisi</th>
<th>Pemeriksaan</th>
<th>Langkah Awal</th>
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
<td>Job gagal</td>
<td>Periksa status dan output</td>
<td><code>sacct -j JOBID</code></td>
</tr>

<tr>
<td>Output tidak muncul</td>
<td>Periksa lokasi output</td>
<td><code>ls -lh output/</code></td>
</tr>

<tr>
<td>Error aplikasi</td>
<td>Cari pesan error</td>
<td><code>grep -i "error" output.out</code></td>
</tr>

<tr>
<td>Software bermasalah</td>
<td>Periksa environment</td>
<td><code>module list</code></td>
</tr>

<tr>
<td>Executable tidak ditemukan</td>
<td>Periksa executable</td>
<td><code>which COMMAND</code></td>
</tr>

</tbody>

</table>

</div>

---

## Common Job States

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>State</th>
<th>Makna</th>
<th>Tindakan</th>
</tr>
</thead>

<tbody>

<tr>
<td><code>PENDING</code></td>
<td>Job belum mendapatkan resource</td>
<td>Periksa status dan alasan pending</td>
</tr>

<tr>
<td><code>RUNNING</code></td>
<td>Job sedang berjalan</td>
<td>Pantau output</td>
</tr>

<tr>
<td><code>COMPLETED</code></td>
<td>Job selesai menurut scheduler</td>
<td>Verifikasi output</td>
</tr>

<tr>
<td><code>FAILED</code></td>
<td>Job berakhir dengan kegagalan</td>
<td>Periksa output dan konfigurasi</td>
</tr>

<tr>
<td><code>CANCELLED</code></td>
<td>Job dibatalkan</td>
<td>Periksa alasan pembatalan</td>
</tr>

</tbody>

</table>

</div>

---

## Minimal Workflow

<p class="section-description">
Jika input dan script sudah siap, workflow dasar hanya membutuhkan
beberapa langkah.
</p>

```bash
sbatch scripts/run.slurm
```

```bash
squeue -u $USER
```

```bash
tail -f output/calculation.out
```

Setelah selesai:

```bash
sacct -j JOBID
```

Kemudian:

```bash
tail -n 50 output/calculation.out
```

Dan periksa error:

```bash
grep -i "error" output/calculation.out
```

---

## Job Checklist

<div class="checklist">

<div>Input sudah siap</div>

<div>SLURM script sudah diperiksa</div>

<div>Software environment sudah siap</div>

<div>Resource request sudah sesuai</div>

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
Calculation Complete
</h2>

<p>
Setelah job selesai dan output terverifikasi, lanjutkan ke
research case untuk melihat workflow aplikasi dan analisis ilmiah.
</p>

<a href="../../hands-on-project/">
Explore Research Cases →
</a>

</div>
