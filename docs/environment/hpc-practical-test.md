# HPC Practical Test

<div class="hpc-practical">

<style>
.hpc-practical {
  max-width: 100%;
  margin: 0 auto;
  color: #24344d;
}

.hpc-practical * {
  box-sizing: border-box;
}

.hpc-hero {
  position: relative;
  overflow: hidden;
  margin: 0 0 32px;
  padding: 48px 52px;
  border: 1px solid #dbe5f1;
  border-radius: 24px;
  background:
    radial-gradient(circle at 90% 10%, rgba(59,130,246,.12), transparent 28%),
    linear-gradient(135deg, #f8fbff 0%, #eef5ff 100%);
}

.hpc-hero::after {
  content: "";
  position: absolute;
  width: 180px;
  height: 180px;
  right: -70px;
  bottom: -90px;
  border-radius: 50%;
  background: rgba(59,130,246,.08);
}

.hpc-kicker {
  display: inline-flex;
  align-items: center;
  padding: 7px 13px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: #e8f1ff;
  color: #2563eb;
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .12em;
}

.hpc-hero h1 {
  margin: 0 0 16px;
  color: #162b52;
  font-size: clamp(2rem, 4vw, 3.1rem);
  line-height: 1.08;
  font-weight: 800;
}

.hpc-hero p {
  max-width: 850px;
  margin: 0;
  color: #536985;
  font-size: 1.05rem;
  line-height: 1.8;
}

.hpc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.hpc-tags span {
  padding: 7px 12px;
  border: 1px solid #cbdcf3;
  border-radius: 999px;
  background: #fff;
  color: #48617f;
  font-size: .76rem;
  font-weight: 700;
}

.hpc-intro {
  display: grid;
  grid-template-columns: 1.35fr .65fr;
  gap: 20px;
  margin-bottom: 32px;
}

.hpc-card {
  padding: 28px;
  border: 1px solid #dce6f2;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(30, 65, 110, .06);
}

.hpc-card h2,
.hpc-card h3 {
  margin-top: 0;
  color: #1d355d;
}

.hpc-card p {
  color: #5c708b;
  line-height: 1.75;
}

.hpc-label {
  display: block;
  margin-bottom: 10px;
  color: #2563eb;
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.hpc-objective-list {
  display: grid;
  gap: 10px;
  margin: 18px 0 0;
}

.hpc-objective {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 13px 15px;
  border-radius: 12px;
  background: #f7faff;
}

.hpc-objective b {
  color: #2563eb;
}

.hpc-objective span {
  color: #536985;
  line-height: 1.5;
}

.hpc-access {
  display: grid;
  grid-template-columns: 1fr .8fr;
  gap: 24px;
  margin-bottom: 38px;
  padding: 28px;
  border: 1px solid #cfe0f5;
  border-radius: 20px;
  background: linear-gradient(135deg, #edf6ff, #f8fbff);
}

.hpc-access h2 {
  margin: 0 0 12px;
  color: #183761;
}

.hpc-access p {
  color: #526a86;
  line-height: 1.75;
}

.hpc-access-highlight {
  align-self: center;
  padding: 22px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #d5e2f2;
}

.hpc-access-highlight strong {
  display: block;
  margin-bottom: 8px;
  color: #2563eb;
  font-size: .78rem;
  letter-spacing: .08em;
}

.hpc-access-highlight code {
  display: block;
  padding: 13px 15px;
  border-radius: 10px;
  background: #17263c;
  color: #eaf3ff;
  font-size: .92rem;
}

.hpc-step {
  margin: 42px 0;
}

.hpc-step-head {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.hpc-step-number {
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #eaf2ff;
  color: #2563eb;
  font-weight: 800;
}

.hpc-step-title h2 {
  margin: 0 0 6px;
  color: #1d355d;
}

.hpc-step-title p {
  margin: 0;
  color: #637790;
  line-height: 1.65;
}

.hpc-command-card {
  margin: 18px 0;
  overflow: hidden;
  border: 1px solid #d8e3ef;
  border-radius: 16px;
  background: #fff;
}

.hpc-command-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 11px 16px;
  border-bottom: 1px solid #dce6f0;
  background: #f5f8fc;
}

.hpc-command-head span:first-child {
  color: #536b88;
  font-size: .73rem;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.hpc-command-head span:last-child {
  color: #8192a8;
  font-size: .72rem;
}

.hpc-command-card pre {
  margin: 0 !important;
  border-radius: 0 !important;
  background: #17263c !important;
}

.hpc-command-card pre code {
  color: #edf5ff !important;
}

.hpc-example {
  margin: 18px 0;
  padding: 20px;
  border-left: 4px solid #4b8df8;
  border-radius: 0 14px 14px 0;
  background: #f5f9ff;
}

.hpc-example-title {
  margin-bottom: 10px;
  color: #31557f;
  font-size: .78rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.hpc-example pre {
  margin: 0 !important;
}

.hpc-check {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 14px 0;
  padding: 15px 17px;
  border: 1px solid #d9e9e0;
  border-radius: 13px;
  background: #f5fbf7;
}

.hpc-check-icon {
  display: grid;
  place-items: center;
  flex: 0 0 25px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #dff5e7;
  color: #16834a;
  font-weight: 800;
}

.hpc-check strong {
  color: #27573e;
}

.hpc-check p {
  margin: 4px 0 0;
  color: #597366;
}

.hpc-note {
  margin: 20px 0;
  padding: 18px 20px;
  border: 1px solid #f0dfb8;
  border-radius: 14px;
  background: #fffaf0;
}

.hpc-note strong {
  color: #956a16;
}

.hpc-note p {
  margin: 7px 0 0;
  color: #75633e;
  line-height: 1.65;
}

.hpc-file-tree {
  margin: 18px 0;
  padding: 22px;
  border-radius: 15px;
  background: #f6f9fc;
  border: 1px solid #dce6ef;
}

.hpc-file-tree code {
  color: #385577;
}

.hpc-assessment {
  margin-top: 45px;
  padding: 30px;
  border: 1px solid #d4e1ef;
  border-radius: 20px;
  background: #f8fbff;
}

.hpc-assessment h2 {
  margin-top: 0;
  color: #1d355d;
}

.hpc-assessment-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.hpc-assessment-item {
  display: flex;
  gap: 11px;
  align-items: center;
  padding: 13px 15px;
  border: 1px solid #dce6f0;
  border-radius: 11px;
  background: #fff;
  color: #506780;
}

.hpc-assessment-item b {
  color: #2563eb;
}

.hpc-final {
  margin-top: 40px;
  padding: 38px;
  border-radius: 22px;
  background: linear-gradient(135deg, #eaf3ff, #f8fbff);
  border: 1px solid #cfe0f4;
  text-align: center;
}

.hpc-final h2 {
  margin: 8px 0 12px;
  color: #19365f;
}

.hpc-final p {
  max-width: 720px;
  margin: 0 auto;
  color: #5b708a;
  line-height: 1.75;
}

.hpc-final-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.hpc-final-actions a {
  display: inline-flex;
  padding: 10px 16px;
  border-radius: 10px;
  background: #2563eb;
  color: #fff !important;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 900px) {
  .hpc-intro,
  .hpc-access {
    grid-template-columns: 1fr;
  }

  .hpc-assessment-grid {
    grid-template-columns: 1fr;
  }

  .hpc-hero {
    padding: 34px 26px;
  }
}

@media (max-width: 600px) {
  .hpc-hero {
    padding: 28px 20px;
    border-radius: 18px;
  }

  .hpc-card,
  .hpc-access,
  .hpc-assessment,
  .hpc-final {
    padding: 21px;
  }

  .hpc-step-head {
    gap: 10px;
  }

  .hpc-step-number {
    flex-basis: 36px;
    width: 36px;
    height: 36px;
  }

  .hpc-command-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }
}
</style>


<div class="hpc-hero">

<div class="hpc-kicker">
WORKSHOP PRACTICAL LAB
</div>

<h1>
HPC Practical Test
</h1>

<p>
Pada sesi ini peserta akan bekerja langsung di lingkungan HPC.
Peserta akan melakukan pemeriksaan akun, membuat project,
menyiapkan input, membuat SLURM job, mengirim job ke scheduler,
memantau proses, dan memverifikasi hasil. Latihan ini menjadi
jembatan dari materi Computational Environment menuju research case.
</p>

<div class="hpc-tags">
<span>HPC</span>
<span>LINUX</span>
<span>SLURM</span>
<span>HANDS-ON</span>
<span>ASSESSMENT</span>
</div>

</div>


<div class="hpc-intro">

<div class="hpc-card">

<span class="hpc-label">
TUJUAN PRAKTIK
</span>

<h2>
Bukan sekadar menjalankan command
</h2>

<p>
Tujuan latihan bukan membuat peserta menghafalkan banyak command.
Peserta harus memahami hubungan antara lokasi kerja, file input,
script, resource, scheduler, job ID, dan output. Setiap command
dijalankan dengan tujuan yang jelas dan hasilnya harus diperiksa.
</p>

<div class="hpc-objective-list">

<div class="hpc-objective">
<b>01</b>
<span>Memahami posisi dan lingkungan kerja pada HPC.</span>
</div>

<div class="hpc-objective">
<b>02</b>
<span>Membuat struktur project sederhana.</span>
</div>

<div class="hpc-objective">
<b>03</b>
<span>Membuat dan membaca file input.</span>
</div>

<div class="hpc-objective">
<b>04</b>
<span>Membuat SLURM job sederhana.</span>
</div>

<div class="hpc-objective">
<b>05</b>
<span>Submit, monitor, dan verify job.</span>
</div>

</div>

</div>


<div class="hpc-card">

<span class="hpc-label">
TARGET AKHIR
</span>

<h3>
Peserta berhasil menjalankan satu job
</h3>

<p>
Pada akhir latihan, peserta harus memiliki satu job yang berhasil
diproses scheduler dan menghasilkan file output yang dapat diperiksa.
</p>

<div class="hpc-check">
<div class="hpc-check-icon">✓</div>
<div>
<strong>Job</strong>
<p>Status akhir dapat diperiksa.</p>
</div>
</div>

<div class="hpc-check">
<div class="hpc-check-icon">✓</div>
<div>
<strong>Output</strong>
<p>File output tersedia dan dapat dibaca.</p>
</div>
</div>

</div>

</div>


<div class="hpc-access">

<div>

<span class="hpc-label">
ATURAN WORKSHOP
</span>

<h2>
Gunakan partition <code>workshop</code>
</h2>

<p>
Peserta workshop menggunakan partition khusus <code>workshop</code>.
Jangan mengganti partition menjadi <code>short</code>,
<code>medium-small</code>, <code>medium-large</code>,
<code>long</code>, atau partition lainnya tanpa instruksi
dari instruktur atau administrator HPC.
</p>

<p>
Nama partition, batas waktu, jumlah node, resource, dan aturan
akses dapat berbeda antarcluster. Karena itu, peserta harus
mengikuti konfigurasi yang diberikan untuk workshop ini.
</p>

</div>

<div class="hpc-access-highlight">

<strong>SLURM PARTITION</strong>

<code>#SBATCH --partition=workshop</code>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">01</div>

<div class="hpc-step-title">

<h2>Pastikan Anda Sudah Terhubung ke HPC</h2>

<p>
Jangan langsung membuat file setelah login. Periksa identitas,
hostname, dan lokasi kerja terlebih dahulu.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>IDENTITY CHECK</span>
<span>Jalankan di terminal HPC</span>
</div>

<pre><code>whoami
hostname
pwd</code></pre>

</div>

<div class="hpc-example">

<div class="hpc-example-title">
Contoh
</div>

<pre><code>(base) [ws0XX@login2 ~]$ whoami
ws0XX

(base) [ws0XX@login2 ~]$ hostname
login2.hpc.brin.go.id

(base) [ws0XX@login2 ~]$ pwd
/mgpfs/home/ws0XX</code></pre>

</div>

<div class="hpc-check">

<div class="hpc-check-icon">✓</div>

<div>
<strong>Checkpoint</strong>
<p>
Username harus menunjukkan akun peserta, misalnya
<code>ws001</code>, <code>ws002</code>, atau akun workshop
yang diberikan kepada Anda.
</p>
</div>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">02</div>

<div class="hpc-step-title">

<h2>Periksa Home Directory</h2>

<p>
Periksa isi home directory sebelum membuat project.
Gunakan command hanya untuk membaca kondisi sistem.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>INSPECT HOME</span>
<span>Tidak mengubah file</span>
</div>

<pre><code>ls
ls -lah</code></pre>

</div>

<div class="hpc-example">

<div class="hpc-example-title">
Contoh
</div>

<pre><code>(base) [ws0XX@login2 ~]$ ls -lah

total 40K
drwx------  7 ws0XX users 4.0K Oct  5 13:20 .
drwxr-xr-x  5 root  root  4.0K Oct  5 10:00 ..
drwx------  2 ws0XX users 4.0K Oct  5 12:10 .ssh
drwx------  3 ws0XX users 4.0K Oct  5 12:30 project</code></pre>

</div>

<div class="hpc-note">

<strong>Perhatikan</strong>

<p>
Jangan menghapus file atau directory yang belum Anda pahami.
Pada latihan ini kita akan membuat directory khusus sehingga
file latihan tidak bercampur dengan file lain.
</p>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">03</div>

<div class="hpc-step-title">

<h2>Buat Project Workshop</h2>

<p>
Buat satu workspace khusus untuk menyimpan input, script,
dan output latihan.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>CREATE PROJECT</span>
<span>Workspace latihan</span>
</div>

<pre><code>mkdir -p ~/workshop-hpc-test
cd ~/workshop-hpc-test
pwd
mkdir -p input output scripts
ls -lah</code></pre>

</div>

<div class="hpc-file-tree">

<pre><code>workshop-hpc-test/
├── input/
├── output/
└── scripts/</code></pre>

</div>

<div class="hpc-check">

<div class="hpc-check-icon">✓</div>

<div>
<strong>Checkpoint</strong>
<p>
Pastikan directory <code>input</code>, <code>output</code>,
dan <code>scripts</code> sudah tersedia.
</p>
</div>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">04</div>

<div class="hpc-step-title">

<h2>Buat File Input Sederhana</h2>

<p>
File input digunakan untuk memberikan informasi yang nantinya
akan dibaca oleh job.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>CREATE INPUT</span>
<span>input/test-input.txt</span>
</div>

<pre><code>cat &gt; input/test-input.txt &lt;&lt; 'EOF'
HPC Workshop Test
Participant: ws0XX
Purpose: SLURM practical test
EOF</code></pre>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>VERIFY INPUT</span>
<span>Baca file</span>
</div>

<pre><code>ls -lh input/
cat input/test-input.txt</code></pre>

</div>

<div class="hpc-example">

<div class="hpc-example-title">
Output yang diharapkan
</div>

<pre><code>HPC Workshop Test
Participant: ws0XX
Purpose: SLURM practical test</code></pre>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">05</div>

<div class="hpc-step-title">

<h2>Periksa Software Environment</h2>

<p>
Sebelum membuat job yang lebih kompleks, peserta perlu mengetahui
bahwa software pada HPC dikelola melalui environment yang disediakan
cluster.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>MODULE CHECK</span>
<span>Lihat software tersedia</span>
</div>

<pre><code>module avail</code></pre>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>SEARCH</span>
<span>Contoh pencarian</span>
</div>

<pre><code>module avail 2&gt;&amp;1 | grep -i python</code></pre>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>ACTIVE MODULE</span>
<span>Periksa environment</span>
</div>

<pre><code>module list</code></pre>

</div>

<div class="hpc-note">

<strong>Catatan</strong>

<p>
Daftar module dapat berbeda antarcluster. Jangan menyalin nama
module dari contoh atau cluster lain tanpa memeriksa availability
pada HPC yang sedang digunakan.
</p>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">06</div>

<div class="hpc-step-title">

<h2>Buat SLURM Job Script</h2>

<p>
Sekarang kita membuat job sederhana yang hanya menampilkan informasi
peserta, node, waktu, partition, lokasi kerja, dan isi file input.
Job ini tidak menjalankan calculation ilmiah sehingga aman digunakan
sebagai latihan scheduler.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>CREATE SCRIPT</span>
<span>scripts/workshop-test.slurm</span>
</div>

<pre><code>nano scripts/workshop-test.slurm</code></pre>

</div>

Masukkan script berikut:

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>SLURM SCRIPT</span>
<span>Workshop configuration</span>
</div>

<pre><code>#!/bin/bash

#SBATCH --job-name=ws0XX-test
#SBATCH --partition=workshop
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --time=00:05:00
#SBATCH --output=../output/workshop-%j.out

echo "========================================"
echo "HPC WORKSHOP TEST"
echo "========================================"

echo "User      : $(whoami)"
echo "Hostname  : $(hostname)"
echo "Date      : $(date)"
echo "Job ID    : $SLURM_JOB_ID"
echo "Partition : $SLURM_JOB_PARTITION"

echo ""
echo "Working directory:"
pwd

echo ""
echo "Input file:"
cat ../input/test-input.txt

echo ""
echo "Job started successfully."

sleep 10

echo ""
echo "Job completed successfully."

echo "========================================"</code></pre>

</div>

<div class="hpc-note">

<strong>Penting</strong>

<p>
Ganti <code>ws0XX</code> dengan akun workshop Anda.
Contohnya <code>ws001</code>, <code>ws002</code>, atau username
yang diberikan instruktur.
</p>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">07</div>

<div class="hpc-step-title">

<h2>Periksa Script Sebelum Submission</h2>

<p>
Jangan langsung mengirim job. Baca kembali script dan pastikan
partition, path input, output, dan resource sudah sesuai.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>PRE-SUBMISSION CHECK</span>
<span>Periksa sebelum sbatch</span>
</div>

<pre><code>pwd
ls -lh
ls -lh input/
ls -lh scripts/
cat scripts/workshop-test.slurm</code></pre>

</div>

<div class="hpc-check">

<div class="hpc-check-icon">✓</div>

<div>
<strong>Pastikan</strong>

<p>
Script menggunakan <code>--partition=workshop</code>,
input tersedia, output diarahkan ke directory yang benar,
dan waktu job sesuai kebutuhan latihan.
</p>

</div>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">08</div>

<div class="hpc-step-title">

<h2>Submit Job</h2>

<p>
Setelah script terverifikasi, kirim job kepada SLURM scheduler.
Scheduler akan menentukan kapan dan pada node mana job dijalankan.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>SUBMIT</span>
<span>SLURM scheduler</span>
</div>

<pre><code>sbatch scripts/workshop-test.slurm</code></pre>

</div>

<div class="hpc-example">

<div class="hpc-example-title">
Contoh response
</div>

<pre><code>Submitted batch job 554500</code></pre>

</div>

<p>
Nomor <code>554500</code> merupakan contoh JOB ID.
JOB ID aktual akan diberikan oleh scheduler dan dapat berbeda
untuk setiap submission.
</p>

<div class="hpc-check">

<div class="hpc-check-icon">✓</div>

<div>
<strong>Catat JOB ID Anda</strong>

<p>
Contoh: <code>JOB ID = 554500</code>
</p>

</div>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">09</div>

<div class="hpc-step-title">

<h2>Monitor Job</h2>

<p>
Gunakan JOB ID untuk mengetahui apakah job masih menunggu,
sedang berjalan, atau sudah tidak berada dalam queue.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>QUEUE</span>
<span>Monitor job sendiri</span>
</div>

<pre><code>squeue -u $USER</code></pre>

</div>

<div class="hpc-example">

<div class="hpc-example-title">
Contoh
</div>

<pre><code>JOBID   PARTITION   NAME        USER   ST  TIME  NODES
554500  workshop    ws0XX-test  ws0XX  R   0:03  1</code></pre>

</div>

<div class="hpc-card">

<h3>Status yang perlu dipahami</h3>

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
<td>Job menunggu resource atau kondisi scheduler.</td>
</tr>
<tr>
<td><code>R</code></td>
<td>Job sedang berjalan.</td>
</tr>
<tr>
<td><code>CG</code></td>
<td>Job sedang menyelesaikan proses akhir.</td>
</tr>
</tbody>
</table>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">10</div>

<div class="hpc-step-title">

<h2>Periksa Detail Job</h2>

<p>
Gunakan <code>scontrol</code> untuk melihat detail job yang sedang
atau sudah diproses scheduler.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>JOB DETAIL</span>
<span>Gunakan JOB ID Anda</span>
</div>

<pre><code>scontrol show job JOBID</code></pre>

</div>

<div class="hpc-example">

<div class="hpc-example-title">
Contoh
</div>

<pre><code>scontrol show job 554500</code></pre>

</div>

<p>
Perhatikan informasi seperti <code>JobId</code>,
<code>JobName</code>, <code>Partition</code>,
<code>JobState</code>, <code>NodeList</code>,
<code>NumNodes</code>, dan <code>TimeLimit</code>.
</p>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">11</div>

<div class="hpc-step-title">

<h2>Periksa Riwayat Job</h2>

<p>
Setelah job selesai, gunakan <code>sacct</code> untuk memeriksa
status akhir dan informasi penggunaan job.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>JOB HISTORY</span>
<span>Setelah job selesai</span>
</div>

<pre><code>sacct -j JOBID</code></pre>

</div>

<div class="hpc-example">

<div class="hpc-example-title">
Contoh
</div>

<pre><code>sacct -j 554500</code></pre>

</div>

<p>
Perhatikan kolom <code>State</code>, <code>Elapsed</code>,
dan <code>ExitCode</code>. Untuk latihan ini, status yang
diharapkan adalah <code>COMPLETED</code>.
</p>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">12</div>

<div class="hpc-step-title">

<h2>Periksa Output</h2>

<p>
Job yang selesai belum cukup untuk menyatakan latihan berhasil.
Baca output dan pastikan informasi yang dihasilkan sesuai dengan
yang diminta oleh script.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>LIST OUTPUT</span>
<span>Cari file hasil</span>
</div>

<pre><code>ls -lh output/</code></pre>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>READ OUTPUT</span>
<span>Gunakan JOB ID aktual</span>
</div>

<pre><code>cat output/workshop-JOBID.out</code></pre>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>READ LAST LINES</span>
<span>Alternatif untuk output panjang</span>
</div>

<pre><code>tail -n 50 output/workshop-JOBID.out</code></pre>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">13</div>

<div class="hpc-step-title">

<h2>Verifikasi Hasil</h2>

<p>
Lakukan pemeriksaan sederhana untuk memastikan output tidak hanya
tersedia, tetapi juga mengandung informasi yang diharapkan.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>CHECK ERROR</span>
<span>Cari pesan error</span>
</div>

<pre><code>grep -i "error" output/workshop-JOBID.out</code></pre>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>CHECK COMPLETION</span>
<span>Cari pesan keberhasilan</span>
</div>

<pre><code>grep -i "completed successfully" output/workshop-JOBID.out</code></pre>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>CHECK PARTITION</span>
<span>Pastikan job menggunakan workshop</span>
</div>

<pre><code>grep -i "Partition" output/workshop-JOBID.out</code></pre>

</div>

<div class="hpc-check">

<div class="hpc-check-icon">✓</div>

<div>
<strong>Hasil yang diharapkan</strong>

<p>
Output menunjukkan username peserta, hostname compute node,
JOB ID, partition <code>workshop</code>, isi input, serta pesan
bahwa job selesai.
</p>

</div>

</div>

</div>


<div class="hpc-step">

<div class="hpc-step-head">

<div class="hpc-step-number">14</div>

<div class="hpc-step-title">

<h2>Periksa Struktur Akhir Project</h2>

<p>
Pastikan project memiliki pemisahan yang jelas antara input,
script, dan output.
</p>

</div>

</div>

<div class="hpc-command-card">

<div class="hpc-command-head">
<span>FINAL PROJECT CHECK</span>
<span>Periksa dari root project</span>
</div>

<pre><code>cd ~/workshop-hpc-test
find . -maxdepth 2 -type f</code></pre>

</div>

<div class="hpc-file-tree">

<pre><code>workshop-hpc-test/
├── input/
│   └── test-input.txt
├── output/
│   └── workshop-JOBID.out
└── scripts/
    └── workshop-test.slurm</code></pre>

</div>

</div>


<div class="hpc-assessment">

<span class="hpc-label">
FINAL ASSESSMENT
</span>

<h2>
Checklist Penyelesaian
</h2>

<p>
Peserta dapat menggunakan checklist berikut sebelum menyatakan
latihan selesai.
</p>

<div class="hpc-assessment-grid">

<div class="hpc-assessment-item">
<b>01</b>
Berhasil login ke HPC
</div>

<div class="hpc-assessment-item">
<b>02</b>
Mengetahui username dan hostname
</div>

<div class="hpc-assessment-item">
<b>03</b>
Memahami fungsi <code>pwd</code>
</div>

<div class="hpc-assessment-item">
<b>04</b>
Memahami fungsi <code>ls</code>
</div>

<div class="hpc-assessment-item">
<b>05</b>
Membuat project directory
</div>

<div class="hpc-assessment-item">
<b>06</b>
Membuat file input
</div>

<div class="hpc-assessment-item">
<b>07</b>
Membuat SLURM script
</div>

<div class="hpc-assessment-item">
<b>08</b>
Menggunakan partition <code>workshop</code>
</div>

<div class="hpc-assessment-item">
<b>09</b>
Melakukan <code>sbatch</code>
</div>

<div class="hpc-assessment-item">
<b>10</b>
Mendapatkan JOB ID
</div>

<div class="hpc-assessment-item">
<b>11</b>
Memantau job dengan <code>squeue</code>
</div>

<div class="hpc-assessment-item">
<b>12</b>
Memeriksa detail dengan <code>scontrol</code>
</div>

<div class="hpc-assessment-item">
<b>13</b>
Memeriksa riwayat dengan <code>sacct</code>
</div>

<div class="hpc-assessment-item">
<b>14</b>
Membaca output
</div>

<div class="hpc-assessment-item">
<b>15</b>
Memeriksa error
</div>

<div class="hpc-assessment-item">
<b>16</b>
Memverifikasi hasil akhir
</div>

</div>

</div>


<div class="hpc-note">

<strong>Catatan keamanan</strong>

<p>
Jangan membagikan password, private key, token, atau credential HPC.
Jangan menjalankan command yang belum dipahami. Selalu periksa
lokasi dengan <code>pwd</code>, target dengan <code>ls</code>,
dan script dengan <code>cat</code> sebelum melakukan operasi yang
mengubah file atau mengirim job.
</p>

</div>


<div class="hpc-final">

<span class="hpc-label">
PRACTICAL COMPLETE
</span>

<h2>
Dari terminal menuju research workflow
</h2>

<p>
Jika seluruh checkpoint berhasil, peserta sudah memiliki pengalaman
dasar untuk bekerja pada HPC. Selanjutnya peserta dapat menggunakan
pola yang sama pada research case dengan input, software, resource,
dan calculation yang lebih nyata.
</p>

<div class="hpc-final-actions">

<a href="../running-calculations/">
Running Calculations
</a>

<a href="../../hands-on-project/">
Hands-on Project
</a>

</div>

</div>

</div>
