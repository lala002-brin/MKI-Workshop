<div class="running-page">

<!-- =========================================================
     HERO
     ========================================================= -->

<div class="running-hero">

<div class="running-kicker">
HPC JOB WORKFLOW
</div>

<h1>Running Calculations</h1>

<p>
Menjalankan calculation pada HPC bukan hanya tentang mengetik
satu perintah pada terminal. Anda perlu memastikan bahwa project,
input, software, resource, job script, scheduler, dan output
sudah saling terhubung dengan benar.
</p>

<p>
Halaman ini memandu Anda mengikuti satu workflow lengkap.
Anda akan belajar bagaimana menyiapkan calculation, memeriksa
kesiapan project, memahami resource HPC, memilih partition
yang sesuai untuk workshop, membuat job script, mengirim job
ke SLURM, memantau proses, membaca output, dan memverifikasi
hasil sebelum melanjutkan ke tahap analisis.
</p>

</div>


<!-- =========================================================
     WORKFLOW OVERVIEW
     ========================================================= -->

<div class="running-flow">

<div class="running-flow-item active">
<span>01</span>
<strong>Understand</strong>
<small>Pahami calculation</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>02</span>
<strong>Prepare</strong>
<small>Siapkan project</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>03</span>
<strong>Check</strong>
<small>Input & software</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>04</span>
<strong>Configure</strong>
<small>Resource & partition</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>05</span>
<strong>Submit</strong>
<small>Kirim job</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>06</span>
<strong>Monitor</strong>
<small>Pantau proses</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>07</span>
<strong>Verify</strong>
<small>Periksa hasil</small>
</div>

</div>


<!-- =========================================================
     CORE IDEA
     ========================================================= -->

<div class="running-introduction">

<div class="running-introduction-main">

<span class="running-label">
CORE CONCEPT
</span>

<h2>
HPC calculation adalah sebuah workflow, bukan satu command
</h2>

<p>
Pada komputer biasa, Anda mungkin menjalankan program secara
langsung dan menunggu hasilnya. Pada HPC, calculation biasanya
melewati scheduler. Karena itu, Anda perlu menyiapkan instruksi
yang jelas agar scheduler dapat menjalankan pekerjaan sesuai
kebutuhan Anda.
</p>

<p>
Job script menjadi penghubung antara project Anda dan scheduler.
Script tersebut menjelaskan nama job, partition, batas waktu,
resource yang dibutuhkan, environment software, dan command
calculation yang harus dijalankan.
</p>

<p>
Kesalahan pada salah satu bagian dapat menyebabkan job tertunda,
gagal, atau menghasilkan output yang tidak sesuai. Karena itu,
selalu periksa workflow sebelum melakukan submission.
</p>

</div>


<div class="running-introduction-side">

<span>MAIN PRINCIPLE</span>

<strong>
Prepare first. Submit second. Verify last.
</strong>

<p>
Jangan mengirim job sebelum memahami apa yang akan dijalankan,
resource yang dibutuhkan, dan output yang harus diperoleh.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 01
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>01</span>

<div>

<small>UNDERSTAND</small>

<h2>
Pahami Calculation yang Akan Dijalankan
</h2>

</div>

</div>

<p>
Sebelum menyentuh scheduler, pahami terlebih dahulu tujuan
calculation, software yang digunakan, input yang diperlukan,
dan jenis output yang ingin diperoleh.
</p>

</div>


<div class="running-explanation">

<strong>
Pertanyaan yang harus dapat Anda jawab sebelum submit
</strong>

<p>
Apa yang sedang dihitung? Software apa yang digunakan?
File input apa yang diperlukan? Berapa lama calculation
diperkirakan berjalan? Berapa CPU atau resource yang dibutuhkan?
File output apa yang harus muncul jika calculation berhasil?
</p>

</div>


<div class="running-preparation-grid">

<div class="running-preparation-card">

<span>01</span>

<h3>Tujuan</h3>

<p>
Tentukan pertanyaan komputasi yang ingin dijawab.
Jangan menjalankan calculation tanpa memahami tujuannya.
</p>

</div>


<div class="running-preparation-card">

<span>02</span>

<h3>Software</h3>

<p>
Identifikasi aplikasi yang akan digunakan, misalnya
Quantum ESPRESSO, LAMMPS, atau software lain.
</p>

</div>


<div class="running-preparation-card">

<span>03</span>

<h3>Input</h3>

<p>
Pastikan semua parameter, struktur, coordinate, dan file
pendukung yang dibutuhkan sudah tersedia.
</p>

</div>


<div class="running-preparation-card">

<span>04</span>

<h3>Output</h3>

<p>
Tentukan file atau informasi apa yang harus diperiksa
untuk memastikan calculation berhasil.
</p>

</div>

</div>


<div class="running-note">

<strong>
Prinsip penting
</strong>

<p>
Scheduler hanya menjalankan instruksi yang Anda berikan.
Scheduler tidak dapat menentukan apakah calculation Anda
secara ilmiah sudah benar. Validasi input dan interpretasi
hasil tetap menjadi tanggung jawab peneliti.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 02
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>02</span>

<div>

<small>PROJECT PREPARATION</small>

<h2>
Siapkan Struktur Project
</h2>

</div>

</div>

<p>
Struktur project yang konsisten membantu memisahkan input,
script, output, dan file analisis.
</p>

</div>


<div class="running-explanation">

<strong>
Gunakan struktur project yang sederhana
</strong>

<p>
Untuk workshop, gunakan struktur directory yang mudah dipahami.
Pisahkan file input dari job script dan hasil calculation.
Dengan struktur ini, Anda dapat mengetahui dengan cepat file
mana yang harus diedit dan file mana yang dihasilkan oleh job.
</p>

</div>


<div class="running-command">

<span>PROJECT STRUCTURE</span>

<pre><code>project/
├── input/
├── scripts/
├── output/
└── analysis/</code></pre>

</div>


<div class="running-command">

<span>ENTER PROJECT</span>

<pre><code>cd project/
pwd
ls -lh</code></pre>

</div>


<div class="running-explanation">

<strong>
Fungsi setiap directory
</strong>

<p>
<strong>input/</strong> menyimpan file input calculation.
<strong>scripts/</strong> menyimpan job script.
<strong>output/</strong> menyimpan hasil calculation.
<strong>analysis/</strong> dapat digunakan untuk post-processing
dan analisis hasil.
</p>

</div>


<div class="running-command">

<span>CHECK PROJECT CONTENT</span>

<pre><code>ls -lh input/
ls -lh scripts/
ls -lh output/</code></pre>

</div>


<div class="running-note">

<strong>
Jaga pemisahan input dan output
</strong>

<p>
Hindari mencampurkan terlalu banyak file pada satu directory.
Struktur yang jelas membuat workflow lebih mudah diperiksa,
diulang, dan dibagikan kepada anggota tim.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 03
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>03</span>

<div>

<small>INPUT VALIDATION</small>

<h2>
Periksa Input Sebelum Calculation
</h2>

</div>

</div>

<p>
Job dapat berjalan tanpa error scheduler tetapi tetap menghasilkan
hasil yang salah jika file input memiliki masalah.
</p>

</div>


<div class="running-explanation">

<strong>
Scheduler tidak memvalidasi isi scientific input
</strong>

<p>
SLURM hanya mengelola pekerjaan berdasarkan instruksi scheduler.
Jika file input Quantum ESPRESSO, LAMMPS, atau aplikasi lain
mengandung parameter yang salah, job tetap dapat diterima oleh
scheduler lalu gagal ketika aplikasi mulai berjalan.
</p>

</div>


<div class="running-command-grid">

<div class="running-command-card">

<span>CHECK FILE</span>

<p>
Pastikan file input benar-benar tersedia.
</p>

<pre><code>ls -lh input/</code></pre>

</div>


<div class="running-command-card">

<span>CHECK SCRIPT</span>

<p>
Pastikan job script berada pada directory yang benar.
</p>

<pre><code>ls -lh scripts/</code></pre>

</div>


<div class="running-command-card">

<span>CHECK PATH</span>

<p>
Pastikan path yang digunakan script sesuai dengan struktur project.
</p>

<pre><code>pwd</code></pre>

</div>


<div class="running-command-card">

<span>READ INPUT</span>

<p>
Periksa isi input sebelum submission.
</p>

<pre><code>cat input/scf.in</code></pre>

</div>

</div>


<div class="running-note">

<strong>
Jangan langsung submit karena file sudah ada
</strong>

<p>
File yang tersedia belum tentu benar. Periksa nama file, lokasi,
parameter utama, struktur sistem, dan konfigurasi calculation
sesuai tujuan simulasi Anda.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 04
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>04</span>

<div>

<small>SOFTWARE CHECK</small>

<h2>
Pastikan Software dan Environment Siap
</h2>

</div>

</div>

<p>
Calculation membutuhkan software yang tersedia pada environment
HPC dan dapat dipanggil dari job script.
</p>

</div>


<div class="running-explanation">

<strong>
Hubungan dengan Software Environment
</strong>

<p>
Halaman Software Environment menjelaskan cara melihat module,
memuat software, dan memeriksa executable. Pada halaman ini,
fokusnya adalah memastikan environment tersebut benar-benar
terhubung dengan job yang akan dijalankan.
</p>

</div>


<div class="running-command">

<span>CHECK LOADED MODULE</span>

<pre><code>module list</code></pre>

</div>


<div class="running-command">

<span>CHECK EXECUTABLE</span>

<pre><code>which pw.x</code></pre>

</div>


<div class="running-command">

<span>CHECK VERSION</span>

<pre><code>pw.x --version</code></pre>

</div>


<div class="running-explanation">

<strong>
Contoh untuk Quantum ESPRESSO
</strong>

<p>
Jika calculation menggunakan Quantum ESPRESSO, pastikan
executable seperti <code>pw.x</code> dapat ditemukan sebelum
job dikirim. Nama module dan lokasi executable dapat berbeda
antarcluster.
</p>

</div>


<div class="running-note">

<strong>
Jangan menganggap environment login sama dengan environment job
</strong>

<p>
Job script sebaiknya memuat environment yang diperlukan secara
eksplisit. Dengan cara tersebut, calculation tidak terlalu
bergantung pada kondisi terminal interaktif pengguna.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 05
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>05</span>

<div>

<small>RESOURCE PLANNING</small>

<h2>
Tentukan Resource yang Dibutuhkan
</h2>

</div>

</div>

<p>
Resource menentukan bagaimana scheduler menjalankan calculation.
Permintaan resource harus realistis dan sesuai kebutuhan.
</p>

</div>


<div class="running-explanation">

<strong>
Resource bukan sekadar angka pada job script
</strong>

<p>
CPU, memory, GPU, dan wall time berhubungan dengan karakteristik
calculation. Meminta terlalu sedikit resource dapat menyebabkan
job gagal atau berjalan tidak optimal. Meminta terlalu banyak
resource dapat membuat job menunggu lebih lama dan menggunakan
resource secara tidak efisien.
</p>

</div>


<div class="running-resource-grid">

<div>

<strong>CPU</strong>

<p>
Jumlah core atau task yang digunakan oleh calculation.
</p>

</div>


<div>

<strong>Memory</strong>

<p>
RAM yang diperlukan oleh calculation dan aplikasi.
</p>

</div>


<div>

<strong>Wall Time</strong>

<p>
Batas waktu maksimum yang diberikan kepada job.
</p>

</div>


<div>

<strong>GPU</strong>

<p>
Digunakan hanya jika aplikasi dan cluster mendukung GPU.
</p>

</div>

</div>


<div class="running-note">

<strong>
Untuk workshop
</strong>

<p>
Gunakan resource yang diberikan dalam instruksi hands-on.
Jangan menambahkan CPU, memory, GPU, atau waktu secara acak
hanya karena resource tersebut tersedia pada cluster.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 06
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>06</span>

<div>

<small>PARTITION</small>

<h2>
Pahami Partition HPC
</h2>

</div>

</div>

<p>
Setelah memahami calculation dan kebutuhan resource, Anda perlu
memahami antrean atau partition tempat job akan dikirim.
</p>

</div>


<div class="running-explanation">

<strong>
Apa itu partition?
</strong>

<p>
Partition adalah kelompok resource yang dikelola oleh scheduler
SLURM. Setiap partition dapat memiliki batas waktu, node,
resource, dan aturan penggunaan yang berbeda.
</p>

<p>
Partition menentukan lingkungan scheduler tempat job Anda
menunggu dan memperoleh resource. Partition tidak sama dengan
nama node.
</p>

</div>


<div class="running-command">

<span>VIEW PARTITIONS</span>

<pre><code>sinfo</code></pre>

</div>


<div class="running-example">

<span>CONTOH OUTPUT HPC WORKSHOP</span>

<pre><code>PARTITION      AVAIL  TIMELIMIT     NODES  STATE  NODELIST
short*         up     1-00:00:00       48  mix    trembesi[03-50]
medium-small   up     3-00:00:00       22  mix    trembesi[51-72]
medium-large   up     3-00:00:00        2  plnd   trembesi[75-76]
medium-large   up     3-00:00:00       10  mix    trembesi[73-74,77-84]
long           up     7-00:00:00        3  mix    trembesi[85-87]
very-long      up    30-00:00:00        3  mix    trembesi[88-90]
interactive    up     2:00:00            2  alloc  trembesi[91-92]
benchmark      up     infinite           2  plnd   trembesi[75-76]
benchmark      up     infinite          86  mix    trembesi[03-74,77-90]
benchmark      up     infinite           2  alloc  trembesi[91-92]
workshop       up     4:00:00            1  idle   ulin01</code></pre>

</div>


<div class="running-command-grid">

<div class="running-command-card">

<span>PARTITION</span>

<p>
Nama kelompok resource atau antrean scheduler.
</p>

</div>


<div class="running-command-card">

<span>AVAIL</span>

<p>
Menunjukkan ketersediaan partition. Nilai
<code>up</code> menunjukkan partition aktif.
</p>

</div>


<div class="running-command-card">

<span>TIMELIMIT</span>

<p>
Batas waktu maksimum yang dapat digunakan job.
</p>

</div>


<div class="running-command-card">

<span>NODES</span>

<p>
Jumlah node yang ditampilkan pada baris tersebut.
</p>

</div>


<div class="running-command-card">

<span>STATE</span>

<p>
Kondisi node seperti <code>idle</code>,
<code>mix</code>, atau <code>alloc</code>.
</p>

</div>


<div class="running-command-card">

<span>NODELIST</span>

<p>
Nama node yang terkait dengan baris tersebut.
</p>

</div>

</div>


<div class="running-access-rule">

<div class="running-access-rule-head">

<span>WORKSHOP ACCESS</span>

<h2>
Peserta workshop menggunakan partition
<code>workshop</code>
</h2>

</div>


<div class="running-access-rule-body">

<div>

<strong>Partition</strong>

<code>workshop</code>

<p>
Peserta workshop menggunakan partition
<code>workshop</code> untuk menjalankan job.
</p>

</div>


<div>

<strong>Time Limit</strong>

<code>4:00:00</code>

<p>
Berdasarkan informasi cluster yang diberikan,
partition workshop memiliki batas waktu maksimum
4 jam.
</p>

</div>


<div>

<strong>Node pada output</strong>

<code>ulin01</code>

<p>
Pada output yang diberikan, partition workshop
terhubung dengan node <code>ulin01</code>.
</p>

</div>


<div class="running-access-note">

<strong>
Jangan memilih partition lain hanya karena muncul pada sinfo
</strong>

<p>
Output <code>sinfo</code> menampilkan konfigurasi cluster secara
keseluruhan. Munculnya partition <code>short</code>,
<code>long</code>, atau <code>very-long</code> tidak berarti
akun peserta memiliki izin untuk menggunakannya. Dalam workshop
ini, peserta diarahkan menggunakan partition
<code>workshop</code>.
</p>

</div>

</div>

</div>


<div class="running-note">

<strong>
Jangan memilih node secara manual
</strong>

<p>
Peserta tidak perlu menambahkan <code>--nodelist=ulin01</code>
ke job script. Tentukan partition <code>workshop</code> dan
biarkan SLURM mengatur alokasi node sesuai konfigurasi scheduler.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 07
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>07</span>

<div>

<small>JOB SCRIPT</small>

<h2>
Buat Job Script
</h2>

</div>

</div>

<p>
Job script menjadi instruksi yang dibaca SLURM untuk menjalankan
calculation Anda.
</p>

</div>


<div class="running-explanation">

<strong>
Apa isi job script?
</strong>

<p>
Job script biasanya berisi informasi scheduler dan command
yang akan dijalankan. Informasi scheduler diawali dengan
<code>#SBATCH</code>. Setelah itu, script menjalankan aplikasi
dan mengarahkan output ke file yang sesuai.
</p>

</div>


<div class="running-script-layout">

<div class="running-script-card">

<span>CONTOH JOB SCRIPT WORKSHOP</span>

<pre><code>#!/bin/bash

#SBATCH --job-name=lala002_test
#SBATCH --partition=workshop
#SBATCH --time=00:30:00

echo "================================"
echo "HPC WORKSHOP TEST"
echo "================================"

echo "User     : $USER"
echo "Hostname : $(hostname)"
echo "Start    : $(date)"

sleep 60

echo "Finished : $(date)"</code></pre>

</div>


<div class="running-script-explanation">

<div>

<strong>#!/bin/bash</strong>

<p>
Menentukan shell yang digunakan untuk menjalankan script.
</p>

</div>


<div>

<strong>--job-name</strong>

<p>
Memberikan nama job agar mudah dikenali pada scheduler.
</p>

</div>


<div>

<strong>--partition</strong>

<p>
Menentukan partition. Gunakan
<code>workshop</code> untuk kegiatan workshop.
</p>

</div>


<div>

<strong>--time</strong>

<p>
Menentukan batas waktu job. Contoh
<code>00:30:00</code> berarti 30 menit.
</p>

</div>

</div>

</div>


<div class="running-example">

<span>CONTOH SCRIPT UNTUK CALCULATION</span>

<p>
Setelah peserta memahami test job, bagian calculation dapat
menggantikan <code>sleep 60</code> dengan command aplikasi.
Contohnya untuk Quantum ESPRESSO:
</p>

<pre><code>pw.x < input/scf.in > output/scf.out</code></pre>

</div>


<div class="running-note">

<strong>
Test job dan scientific job memiliki tujuan berbeda
</strong>

<p>
Test job membantu memastikan scheduler dan environment bekerja.
Scientific job menjalankan calculation sebenarnya. Pisahkan
keduanya agar Anda dapat membedakan masalah scheduler dari
masalah input atau aplikasi.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 08
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>08</span>

<div>

<small>SUBMISSION</small>

<h2>
Submit Job ke SLURM
</h2>

</div>

</div>

<p>
Setelah script siap dan diperiksa, kirim job ke scheduler dengan
perintah <code>sbatch</code>.
</p>

</div>


<div class="running-command">

<span>SUBMIT</span>

<pre><code>sbatch scripts/run.slurm</code></pre>

</div>


<div class="running-example">

<span>CONTOH TERMINAL LALA002</span>

<pre><code>[lala002@trembesi02 project]$ sbatch scripts/run.slurm

Submitted batch job 554425</code></pre>

</div>


<div class="running-explanation">

<strong>
Apa arti JOB ID?
</strong>

<p>
SLURM memberikan nomor unik kepada job yang diterima.
Dalam contoh ini, JOB ID adalah <code>554425</code>.
Gunakan nomor tersebut ketika ingin melihat detail atau
riwayat job.
</p>

</div>


<div class="running-important">

<strong>
Submission berhasil bukan berarti calculation berhasil
</strong>

<p>
Pesan <code>Submitted batch job</code> hanya menunjukkan bahwa
scheduler menerima job. Job masih dapat berada dalam status
pending, running, completing, completed, atau failed.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 09
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>09</span>

<div>

<small>MONITOR</small>

<h2>
Pantau Job Setelah Submission
</h2>

</div>

</div>

<p>
Gunakan JOB ID atau username untuk mengetahui posisi job
dalam scheduler.
</p>

</div>


<div class="running-command">

<span>MONITOR YOUR JOBS</span>

<pre><code>squeue -u $USER</code></pre>

</div>


<div class="running-example">

<span>CONTOH OUTPUT</span>

<pre><code>[lala002@trembesi02 project]$ squeue -u $USER

JOBID     PARTITION   NAME          USER      ST   TIME
554425    workshop    lala002_test  lala002   R    00:04:21</code></pre>

</div>


<div class="running-explanation">

<strong>
Apa yang sedang terjadi?
</strong>

<p>
Pada contoh tersebut, job <code>554425</code> menggunakan
partition <code>workshop</code>. Nilai <code>R</code> pada kolom
status menunjukkan bahwa job sedang berjalan.
</p>

</div>


<div class="running-status">

<div class="running-status-title">
COMMON SLURM STATUS
</div>

<p class="running-status-description">
Berikut beberapa status yang perlu dikenali peserta workshop.
</p>


<div class="running-status-list">

<div>

<strong>PD</strong>

<span>Pending</span>

<small>
Job menunggu resource atau kondisi scheduler.
</small>

</div>


<div>

<strong>R</strong>

<span>Running</span>

<small>
Job sedang menjalankan calculation.
</small>

</div>


<div>

<strong>CG</strong>

<span>Completing</span>

<small>
Job sedang menyelesaikan proses akhir.
</small>

</div>


<div>

<strong>CD</strong>

<span>Completed</span>

<small>
Job telah selesai.
</small>

</div>


<div>

<strong>F</strong>

<span>Failed</span>

<small>
Job mengalami kegagalan.
</small>

</div>


<div>

<strong>CA</strong>

<span>Cancelled</span>

<small>
Job dibatalkan.
</small>

</div>

</div>

</div>

</div>


<!-- =========================================================
     SECTION 10
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>10</span>

<div>

<small>JOB DIAGNOSTICS</small>

<h2>
Periksa Detail Job
</h2>

</div>

</div>

<p>
Jika status job tidak sesuai harapan, gunakan informasi detail
untuk memahami apa yang terjadi.
</p>

</div>


<div class="running-command">

<span>SHOW JOB DETAIL</span>

<pre><code>scontrol show job 554425</code></pre>

</div>


<div class="running-explanation">

<strong>
Kapan menggunakan scontrol?
</strong>

<p>
Gunakan <code>scontrol show job JOBID</code> ketika Anda ingin
melihat informasi lebih detail tentang job, termasuk konfigurasi
dan resource yang diterima scheduler.
</p>

</div>


<div class="running-command">

<span>CHECK JOB HISTORY</span>

<pre><code>sacct -j 554425</code></pre>

</div>


<div class="running-explanation">

<strong>
Mengapa job tidak terlihat pada squeue?
</strong>

<p>
Job yang sudah selesai biasanya tidak lagi muncul sebagai pekerjaan
aktif pada <code>squeue</code>. Gunakan <code>sacct</code> untuk
memeriksa riwayat dan status akhir job.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 11
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>11</span>

<div>

<small>OUTPUT MONITORING</small>

<h2>
Pantau Output Calculation
</h2>

</div>

<p>
</p>

</div>

<p>
Output membantu Anda mengetahui apakah aplikasi berjalan,
mengalami error, atau telah mencapai tahap penyelesaian.
</p>

</div>


<div class="running-command">

<span>CHECK OUTPUT FILE</span>

<pre><code>ls -lh output/</code></pre>

</div>


<div class="running-command">

<span>READ LAST 50 LINES</span>

<pre><code>tail -n 50 output/scf.out</code></pre>

</div>


<div class="running-command">

<span>FOLLOW OUTPUT</span>

<pre><code>tail -f output/scf.out</code></pre>

</div>


<div class="running-command">

<span>SEARCH ERROR</span>

<pre><code>grep -i "error" output/scf.out</code></pre>

</div>


<div class="running-explanation">

<strong>
Mengapa output perlu diperiksa?
</strong>

<p>
Status scheduler dan status aplikasi merupakan dua hal berbeda.
Job dapat memperoleh status completed pada scheduler tetapi
Anda tetap perlu memeriksa output untuk memastikan calculation
menghasilkan informasi yang diharapkan.
</p>

</div>


<div class="running-verify">

<div>
<span>✓</span>
<strong>File output tersedia</strong>
</div>

<div>
<span>✓</span>
<strong>Calculation mencapai akhir</strong>
</div>

<div>
<span>✓</span>
<strong>Error kritis tidak ditemukan</strong>
</div>

<div>
<span>✓</span>
<strong>Hasil sesuai tujuan</strong>
</div>

</div>

</div>


<!-- =========================================================
     SECTION 12
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>12</span>

<div>

<small>TROUBLESHOOTING</small>

<h2>
Memahami Masalah yang Umum Terjadi
</h2>

</div>

</div>

<p>
Jangan langsung mengulang job. Identifikasi dahulu tahap
workflow yang mengalami masalah.
</p>

</div>


<div class="running-problems">


<div>

<span>01</span>

<strong>Job Pending</strong>

<p>
Job belum mendapatkan resource yang diperlukan.
</p>

<div class="running-command">

<span>CHECK</span>

<pre><code>squeue -u $USER
scontrol show job JOBID</code></pre>

</div>

</div>


<div>

<span>02</span>

<strong>Job Failed</strong>

<p>
Aplikasi gagal menjalankan calculation atau menemukan masalah
pada input maupun environment.
</p>

<div class="running-command">

<span>CHECK</span>

<pre><code>sacct -j JOBID
tail -n 50 output/scf.out
grep -i "error" output/scf.out</code></pre>

</div>

</div>


<div>

<span>03</span>

<strong>File Tidak Ditemukan</strong>

<p>
Path pada job script tidak sesuai dengan struktur project.
</p>

<div class="running-command">

<span>CHECK</span>

<pre><code>pwd
ls -lh
ls -lh input/
ls -lh output/</code></pre>

</div>

</div>


<div>

<span>04</span>

<strong>Software Tidak Ditemukan</strong>

<p>
Executable tidak tersedia pada environment job.
</p>

<div class="running-command">

<span>CHECK</span>

<pre><code>module list
which pw.x</code></pre>

</div>

</div>


<div>

<span>05</span>

<strong>Calculation Terlalu Lama</strong>

<p>
Waktu yang diminta mungkin tidak sesuai dengan kebutuhan
calculation.
</p>

<div class="running-command">

<span>CHECK</span>

<pre><code>scontrol show job JOBID
sacct -j JOBID</code></pre>

</div>

</div>


<div>

<span>06</span>

<strong>Output Tidak Sesuai</strong>

<p>
Job dapat selesai tetapi hasil belum tentu sesuai tujuan
scientific calculation.
</p>

<div class="running-command">

<span>CHECK</span>

<pre><code>tail -n 50 output/scf.out
grep -i "error" output/scf.out</code></pre>

</div>

</div>

</div>


<div class="running-note">

<strong>
Gunakan pendekatan diagnosis
</strong>

<p>
Tentukan dahulu apakah masalah berasal dari scheduler,
resource, path, software, input, atau calculation. Setelah
penyebab ditemukan, perbaiki script atau input sebelum
mengirim job kembali.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 13
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>13</span>

<div>

<small>CANCEL</small>

<h2>
Membatalkan Job
</h2>

</div>

</div>

<p>
Batalkan job hanya jika Anda yakin job tersebut perlu dihentikan.
</p>

</div>


<div class="running-command">

<span>CANCEL JOB</span>

<pre><code>scancel JOBID</code></pre>

</div>


<div class="running-example">

<span>CONTOH</span>

<pre><code>[lala002@trembesi02 project]$ squeue -u $USER

JOBID     PARTITION   NAME          USER      ST   TIME
554425    workshop    lala002_test  lala002   R    00:04:21


[lala002@trembesi02 project]$ scancel 554425</code></pre>

</div>


<div class="running-explanation">

<strong>
Kapan job perlu dibatalkan?
</strong>

<p>
Misalnya Anda menemukan bahwa input salah, parameter calculation
keliru, resource tidak sesuai, atau job tidak lagi diperlukan.
Membatalkan job dapat mencegah penggunaan resource yang tidak perlu.
</p>

</div>


<div class="running-important">

<strong>
Periksa JOB ID sebelum menggunakan scancel
</strong>

<p>
Jangan menggunakan <code>scancel</code> berdasarkan perkiraan.
Periksa kembali job dengan <code>squeue -u $USER</code> dan
pastikan JOB ID yang digunakan memang milik Anda.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 14
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>14</span>

<div>

<small>VERIFICATION</small>

<h2>
Kapan Calculation Dianggap Selesai?
</h2>

</div>

</div>

<p>
Calculation dianggap siap untuk analisis setelah status scheduler,
output aplikasi, dan hasil scientific diperiksa.
</p>

</div>


<div class="running-summary-grid">


<div>

<span>01</span>

<strong>Scheduler selesai</strong>

<p>
Job tidak lagi berjalan dan memiliki status akhir yang sesuai.
</p>

</div>


<div>

<span>02</span>

<strong>Output tersedia</strong>

<p>
File output yang diperlukan telah dibuat.
</p>

</div>


<div>

<span>03</span>

<strong>Output terbaca</strong>

<p>
Bagian penting dari output dapat ditemukan dan dibaca.
</p>

</div>


<div>

<span>04</span>

<strong>Error diperiksa</strong>

<p>
Tidak terdapat error kritis yang belum ditangani.
</p>

</div>


<div>

<span>05</span>

<strong>Hasil masuk akal</strong>

<p>
Hasil awal sesuai dengan tujuan dan konfigurasi calculation.
</p>

</div>


<div>

<span>06</span>

<strong>Data siap dianalisis</strong>

<p>
File hasil dapat diteruskan ke tahap post-processing.
</p>

</div>

</div>


<div class="running-explanation">

<strong>
Completed bukan berarti scientifically correct
</strong>

<p>
Status <code>COMPLETED</code> menunjukkan job telah menyelesaikan
pekerjaan scheduler sesuai status yang dilaporkan. Status tersebut
tidak otomatis membuktikan bahwa hasil scientific calculation
benar. Peneliti tetap harus memeriksa output dan memvalidasi hasil.
</p>

</div>

</div>


<!-- =========================================================
     SECTION 15
     ========================================================= -->

<div class="running-section">

<div class="running-section-head">

<div>

<span>15</span>

<div>

<small>COMPLETE WORKFLOW</small>

<h2>
Contoh Workflow Lengkap untuk lala002
</h2>

</div>

</div>

<p>
Gunakan contoh berikut sebagai gambaran bagaimana satu calculation
bergerak dari terminal hingga output.
</p>

</div>


<div class="running-command">

<span>STEP 01 · MASUK KE PROJECT</span>

<pre><code>[lala002@trembesi02 ~]$ cd project/

[lala002@trembesi02 project]$ pwd
/home/lala002/project</code></pre>

</div>


<div class="running-command">

<span>STEP 02 · PERIKSA STRUKTUR</span>

<pre><code>[lala002@trembesi02 project]$ ls -lh

input/
output/
scripts/</code></pre>

</div>


<div class="running-command">

<span>STEP 03 · PERIKSA PARTITION WORKSHOP</span>

<pre><code>[lala002@trembesi02 project]$ sinfo

PARTITION   AVAIL   TIMELIMIT   NODES   STATE   NODELIST
workshop    up      4:00:00       1    idle    ulin01</code></pre>

</div>


<div class="running-command">

<span>STEP 04 · PERIKSA SCRIPT</span>

<pre><code>[lala002@trembesi02 project]$ ls -lh scripts/

run.slurm</code></pre>

</div>


<div class="running-command">

<span>STEP 05 · SUBMIT</span>

<pre><code>[lala002@trembesi02 project]$ sbatch scripts/run.slurm

Submitted batch job 554425</code></pre>

</div>


<div class="running-command">

<span>STEP 06 · MONITOR</span>

<pre><code>[lala002@trembesi02 project]$ squeue -u $USER

JOBID     PARTITION   NAME          USER      ST   TIME
554425    workshop    lala002_test  lala002   R    00:04:21</code></pre>

</div>


<div class="running-command">

<span>STEP 07 · PERIKSA OUTPUT</span>

<pre><code>[lala002@trembesi02 project]$ ls -lh output/

scf.out</code></pre>

</div>


<div class="running-command">

<span>STEP 08 · BACA OUTPUT</span>

<pre><code>[lala002@trembesi02 project]$ tail -n 50 output/scf.out</code></pre>

</div>


<div class="running-command">

<span>STEP 09 · CARI ERROR</span>

<pre><code>[lala002@trembesi02 project]$ grep -i "error" output/scf.out</code></pre>

</div>


<div class="running-command">

<span>STEP 10 · PERIKSA RIWAYAT</span>

<pre><code>[lala002@trembesi02 project]$ sacct -j 554425</code></pre>

</div>


<div class="running-explanation">

<strong>
Inilah satu siklus HPC calculation
</strong>

<p>
Anda menyiapkan project, memeriksa input dan software,
memahami resource, menggunakan partition workshop, membuat
job script, melakukan submission, memantau job, membaca output,
dan memverifikasi hasil. Setelah seluruh tahap tersebut selesai,
hasil dapat diteruskan ke tahap analisis.
</p>

</div>

</div>


<!-- =========================================================
     QUICK REFERENCE
     ========================================================= -->

<div class="running-quick">

<div class="running-quick-head">

<div>

<span>QUICK REFERENCE</span>

<h2>
Command Utama dalam Workflow
</h2>

</div>

<p>
Gunakan bagian ini sebagai pengingat cepat setelah memahami
workflow lengkap.
</p>

</div>


<div class="running-command-table">

<div>
<span>PROJECT</span>
<code>pwd</code>
</div>

<div>
<span>FILES</span>
<code>ls -lh</code>
</div>

<div>
<span>PARTITION</span>
<code>sinfo</code>
</div>

<div>
<span>SUBMIT</span>
<code>sbatch scripts/run.slurm</code>
</div>

<div>
<span>QUEUE</span>
<code>squeue -u $USER</code>
</div>

<div>
<span>DETAIL</span>
<code>scontrol show job JOBID</code>
</div>

<div>
<span>HISTORY</span>
<code>sacct -j JOBID</code>
</div>

<div>
<span>OUTPUT</span>
<code>tail -n 50 output/scf.out</code>
</div>

<div>
<span>ERROR</span>
<code>grep -i "error" output/scf.out</code>
</div>

<div>
<span>CANCEL</span>
<code>scancel JOBID</code>
</div>

</div>

</div>


<!-- =========================================================
     FINAL CHECKLIST
     ========================================================= -->

<div class="running-complete">

<div>

<span>BEFORE YOU MOVE TO ANALYSIS</span>

<h2>
Pastikan calculation benar-benar siap dianalisis.
</h2>

<p>
Apakah input sudah benar? Apakah software sesuai?
Apakah job menggunakan partition <code>workshop</code>?
Apakah scheduler sudah menyelesaikan job? Apakah output tersedia?
Apakah error sudah diperiksa? Apakah hasil sesuai dengan tujuan
calculation?
</p>

<p>
Jika seluruh pertanyaan tersebut sudah terjawab, Anda dapat
melanjutkan ke tahap analisis dan research case.
</p>

</div>


<div class="running-actions">

<a href="../script-library/">
Script Library →
</a>

<a href="../../hands-on-project/">
Research Cases →
</a>

</div>

</div>


</div>