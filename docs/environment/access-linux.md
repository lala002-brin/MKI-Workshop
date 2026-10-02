# Access & Linux

<div class="environment-hero environment-hero-compact">

<div class="environment-eyebrow">
HPC ACCESS & LINUX
</div>

<h1>
Access & Linux
</h1>

<p class="environment-description">
Panduan singkat untuk terhubung ke HPC, memahami ruang kerja,
dan mengenali struktur dasar Linux sebelum menjalankan perhitungan.
</p>

<div class="environment-tags">
<span>CONNECT</span>
<span>WORKSPACE</span>
<span>FILES</span>
<span>TERMINAL</span>
</div>

</div>

---

## From Login to Your Project

<p class="section-description">
Workflow dasar dimulai dari koneksi ke cluster, masuk ke ruang kerja,
lalu berpindah ke direktori project yang akan digunakan.
</p>

<div class="execution-pipeline">

<div>
<span>01</span>
<p>Connect</p>
</div>

<div>→</div>

<div>
<span>02</span>
<p>Locate</p>
</div>

<div>→</div>

<div>
<span>03</span>
<p>Navigate</p>
</div>

<div>→</div>

<div>
<span>04</span>
<p>Work</p>
</div>

</div>

---

## 01 · Connect to HPC

<p class="section-description">
HPC umumnya menyediakan akses melalui SSH. Gunakan terminal
untuk membuat koneksi ke login node yang diberikan oleh administrator cluster.
</p>

### Connect

```bash
ssh username@hpc.example.edu
```

Ganti:

```text
username
```

dengan username HPC Anda.

Contoh:

```bash
ssh alice@hpc.example.edu
```

> Hostname, username, dan metode autentikasi mengikuti konfigurasi
> cluster yang digunakan.

### Setelah Login

Periksa identitas akun:

```bash
whoami
```

Periksa lokasi saat ini:

```bash
pwd
```

---

## 02 · Kenali Ruang Kerja

<p class="section-description">
Sistem HPC biasanya menyediakan beberapa lokasi penyimpanan
dengan fungsi yang berbeda. Nama dan kebijakan setiap lokasi
bergantung pada cluster.
</p>

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Lokasi</th>
<th>Fungsi Umum</th>
<th>Contoh Isi</th>
</tr>
</thead>

<tbody>

<tr>
<td>Home</td>
<td>Menyimpan file konfigurasi dan file pribadi</td>
<td><code>~/</code></td>
</tr>

<tr>
<td>Project</td>
<td>Menyimpan file penelitian dan project</td>
<td><code>/project/...</code></td>
</tr>

<tr>
<td>Scratch</td>
<td>Ruang kerja sementara untuk perhitungan</td>
<td><code>/scratch/...</code></td>
</tr>

</tbody>

</table>

</div>

> **Penting:** Tidak semua cluster menggunakan struktur storage
> yang sama. Ikuti dokumentasi dan kebijakan cluster Anda.

### Home Directory

Masuk ke home:

```bash
cd ~
```

Periksa isinya:

```bash
ls -lh
```

---

## 03 · Pahami Direktori dan Path

<p class="section-description">
Linux menggunakan struktur direktori bertingkat. Path menunjukkan
lokasi sebuah file atau direktori di dalam filesystem.
</p>

### Absolute Path

Absolute path dimulai dari root filesystem:

```text
/home/alice/project/input/calculation.in
```

### Relative Path

Relative path menggunakan lokasi saat ini sebagai titik awal:

```text
input/calculation.in
```

Misalnya posisi Anda berada di:

```text
/home/alice/project/
```

Maka:

```text
input/calculation.in
```

merujuk ke:

```text
/home/alice/project/input/calculation.in
```

---

## 04 · Navigasi Dasar

<p class="section-description">
Gunakan beberapa perintah dasar berikut untuk berpindah
dan memeriksa lokasi kerja.
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
<td>Menampilkan lokasi saat ini</td>
<td><code>pwd</code></td>
</tr>

<tr>
<td><code>ls</code></td>
<td>Menampilkan isi direktori</td>
<td><code>ls</code></td>
</tr>

<tr>
<td><code>ls -lh</code></td>
<td>Menampilkan file dan ukuran</td>
<td><code>ls -lh</code></td>
</tr>

<tr>
<td><code>cd project/</code></td>
<td>Masuk ke direktori</td>
<td><code>cd project/</code></td>
</tr>

<tr>
<td><code>cd ..</code></td>
<td>Kembali satu tingkat</td>
<td><code>cd ..</code></td>
</tr>

<tr>
<td><code>cd ~</code></td>
<td>Kembali ke home directory</td>
<td><code>cd ~</code></td>
</tr>

</tbody>

</table>

</div>

### Contoh

```bash
pwd
ls -lh
cd project/
ls -lh
```

Setelah berada di project:

```bash
cd input/
ls -lh
```

---

## 05 · Memahami Struktur Project

<p class="section-description">
Project komputasi sebaiknya memiliki struktur yang jelas agar
input, script, output, dan analisis mudah ditemukan.
</p>

```text
project/
├── input/
│   ├── calculation.in
│   └── structure.xyz
│
├── scripts/
│   └── run.slurm
│
├── output/
│
└── analysis/
```

Periksa struktur dasar:

```bash
ls -lh
```

Periksa input:

```bash
ls -lh input/
```

Periksa script:

```bash
ls -lh scripts/
```

---

## 06 · File dan Direktori

<p class="section-description">
Sebelum menjalankan kalkulasi, pastikan Anda dapat membedakan
file input, script, output, dan direktori kerja.
</p>

<div class="command-reference-table">

<table>

<thead>
<tr>
<th>Item</th>
<th>Contoh</th>
<th>Peran</th>
</tr>
</thead>

<tbody>

<tr>
<td>Input</td>
<td><code>calculation.in</code></td>
<td>Parameter dan konfigurasi perhitungan</td>
</tr>

<tr>
<td>Structure</td>
<td><code>structure.xyz</code></td>
<td>Data struktur atom</td>
</tr>

<tr>
<td>Script</td>
<td><code>run.slurm</code></td>
<td>Instruksi untuk scheduler</td>
</tr>

<tr>
<td>Output</td>
<td><code>calculation.out</code></td>
<td>Hasil dan log perhitungan</td>
</tr>

<tr>
<td>Analysis</td>
<td><code>analysis/</code></td>
<td>File untuk analisis hasil</td>
</tr>

</tbody>

</table>

</div>

---

## 07 · First Login Checklist

<div class="checklist">

<div>Koneksi SSH berhasil</div>

<div>Username sudah terverifikasi</div>

<div>Home directory sudah ditemukan</div>

<div>Project directory sudah ditemukan</div>

<div>Struktur project sudah dipahami</div>

<div>Input file sudah ditemukan</div>

<div>Script directory sudah ditemukan</div>

</div>

---

## What Comes Next?

<p class="section-description">
Setelah memahami akses, filesystem, dan navigasi dasar,
gunakan Command Line sebagai referensi perintah sehari-hari.
</p>

<div class="environment-banner">

<h2>
Ready for the Terminal
</h2>

<p>
Anda sudah siap berpindah dari dasar akses Linux
ke command yang digunakan dalam workflow HPC.
</p>

<a href="../command-line/">
Command Line →
</a>

</div>
