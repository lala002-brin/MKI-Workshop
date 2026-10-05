# Command Line

<div class="command-reference">

<div class="command-hero">

<div class="command-kicker">
COMPUTATIONAL ENVIRONMENT · 02
</div>

<h1>
Command Line
</h1>

<p>
Command line merupakan cara utama untuk berinteraksi dengan sistem Linux
pada HPC. Melalui terminal, peserta dapat berpindah direktori, membuat dan
mengelola file, membaca output, mencari informasi, memeriksa proses, serta
berinteraksi dengan scheduler SLURM.
</p>

<p>
Halaman ini menggunakan contoh yang menyerupai sesi terminal Mahameru HPC BRIN.
Contoh akun menggunakan <strong>lala002</strong> dan hostname
<strong>trembesi02</strong> seperti yang terlihat pada sesi terminal.
Sesuaikan username, hostname, path, partition, dan JOBID dengan akun serta
sistem yang sedang Anda gunakan.
</p>

</div>


<div class="command-purpose">

<div>

<span>TUJUAN</span>

<h2>
Bukan sekadar menghafal command
</h2>

<p>
Peserta tidak perlu menghafalkan semua perintah. Yang lebih penting adalah
memahami kapan sebuah command digunakan, apa yang diperiksa, dan apa risiko
jika command digunakan pada lokasi yang salah.
</p>

<p>
Gunakan pola sederhana:
<strong>Periksa lokasi → pahami target → jalankan command → periksa hasil.</strong>
</p>

</div>

<div class="command-purpose-grid">

<div>
<strong>01</strong>
<span>Navigate</span>
<small>Berpindah lokasi</small>
</div>

<div>
<strong>02</strong>
<span>Manage</span>
<small>Kelola file</small>
</div>

<div>
<strong>03</strong>
<span>Inspect</span>
<small>Periksa data</small>
</div>

<div>
<strong>04</strong>
<span>Search</span>
<small>Cari informasi</small>
</div>

<div>
<strong>05</strong>
<span>Process</span>
<small>Pantau proses</small>
</div>

<div>
<strong>06</strong>
<span>SLURM</span>
<small>Kelola job</small>
</div>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>01 · ORIENTASI</span>

<h2>
Memahami terminal HPC
</h2>

<p>
Ketika Anda login ke HPC, Anda tidak sedang bekerja pada komputer lokal.
Perintah yang Anda ketik dijalankan pada sistem remote. Karena itu, biasakan
memeriksa identitas sesi sebelum melakukan pekerjaan.
</p>

</div>

<div class="command-terminal-example">

<div class="command-terminal-label">
CONTOH SESI MAHAMERU
</div>

<pre><code>(base) [lala002@trembesi02 ~]$ pwd
/mgpfs/home/lala002</code></pre>

</div>

<p>
Pada contoh tersebut, <code>lala002</code> merupakan username, sedangkan
<code>trembesi02</code> merupakan hostname yang muncul pada prompt.
Simbol <code>~</code> menunjukkan lokasi home directory pengguna.
</p>

<div class="command-info-grid">

<div>
<strong>Username</strong>
<p><code>lala002</code></p>
</div>

<div>
<strong>Hostname</strong>
<p><code>trembesi02</code></p>
</div>

<div>
<strong>Home</strong>
<p><code>/mgpfs/home/lala002</code></p>
</div>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>02 · NAVIGASI</span>

<h2>
Mengetahui dan berpindah lokasi
</h2>

<p>
Navigasi merupakan kemampuan dasar yang harus dikuasai sebelum mengelola file
atau menjalankan calculation. Kesalahan lokasi dapat menyebabkan file dibuat,
dipindahkan, atau dihapus pada direktori yang tidak dimaksudkan.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 01</span>
<h3>pwd</h3>
</div>

<p>
Menampilkan path direktori kerja saat ini.
</p>

<pre><code>pwd</code></pre>

<h4>Contoh pada HPC</h4>

<pre><code>[lala002@trembesi02 ~]$ pwd
/mgpfs/home/lala002</code></pre>

<p>
Gunakan <code>pwd</code> ketika Anda tidak yakin sedang berada di direktori
mana. Ini menjadi pemeriksaan penting sebelum menjalankan command yang
mengubah file.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 02</span>
<h3>ls</h3>
</div>

<p>
Menampilkan isi direktori.
</p>

<pre><code>ls</code></pre>

<h4>Contoh penggunaan</h4>

<pre><code>ls</code></pre>

<p>
Gunakan command ini untuk melihat folder dan file yang tersedia pada lokasi
saat ini.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 03</span>
<h3>ls -lh</h3>
</div>

<p>
Menampilkan daftar file dengan informasi ukuran yang lebih mudah dibaca.
</p>

<pre><code>ls -lh</code></pre>

<h4>Contoh</h4>

<pre><code>ls -lh ~/workshop/</code></pre>

<p>
Path setelah command membuat pemeriksaan lebih spesifik. Anda tidak perlu
berpindah direktori hanya untuk melihat isi folder tertentu.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 04</span>
<h3>cd</h3>
</div>

<p>
Berpindah dari satu direktori ke direktori lain.
</p>

<pre><code>cd ~/workshop</code></pre>

<h4>Contoh alur</h4>

<pre><code>cd ~/workshop
pwd</code></pre>

<p>
Setelah berpindah, gunakan <code>pwd</code> untuk memastikan lokasi sudah
sesuai.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 05</span>
<h3>cd ..</h3>
</div>

<p>
Kembali satu tingkat ke direktori induk.
</p>

<pre><code>cd ..</code></pre>

<h4>Contoh</h4>

<pre><code>cd ~/workshop/graphene-interface
cd ..
pwd</code></pre>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 06</span>
<h3>cd ~</h3>
</div>

<p>
Kembali ke home directory pengguna.
</p>

<pre><code>cd ~
pwd</code></pre>

<p>
Pada contoh akun <code>lala002</code>, home directory ditampilkan sebagai
<code>/mgpfs/home/lala002</code>.
</p>

</div>


<div class="command-warning">

<strong>
Kebiasaan aman
</strong>

<p>
Jika Anda akan melakukan perubahan file dan merasa ragu dengan lokasinya,
jalankan <code>pwd</code> terlebih dahulu. Jangan menjalankan command hanya
karena melihat contoh di dokumentasi.
</p>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>03 · MEMBUAT FILE DAN DIREKTORI</span>

<h2>
Menyiapkan workspace
</h2>

<p>
Workspace membantu memisahkan file penelitian berdasarkan project. Gunakan
struktur yang sederhana dan konsisten agar file input, script, output,
dan analisis tidak tercampur.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 07</span>
<h3>mkdir</h3>
</div>

<p>
Membuat direktori baru.
</p>

<pre><code>mkdir graphene-interface</code></pre>

<h4>Contoh workflow</h4>

<pre><code>cd ~/workshop
mkdir graphene-interface
cd graphene-interface
pwd</code></pre>

<p>
Periksa hasil dengan <code>pwd</code> dan <code>ls</code>.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 08</span>
<h3>mkdir -p</h3>
</div>

<p>
Membuat struktur direktori bertingkat.
</p>

<pre><code>mkdir -p ~/workshop/graphene-interface/input</code></pre>

<h4>Contoh beberapa folder</h4>

<pre><code>mkdir -p ~/workshop/graphene-interface/input
mkdir -p ~/workshop/graphene-interface/scripts
mkdir -p ~/workshop/graphene-interface/output</code></pre>

<p>
Gunakan command ini ketika parent directory belum tersedia.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 09</span>
<h3>touch</h3>
</div>

<p>
Membuat file kosong atau memperbarui timestamp file.
</p>

<pre><code>touch notes.txt</code></pre>

<h4>Contoh</h4>

<pre><code>cd ~/workshop/graphene-interface
touch notes.txt
ls -lh</code></pre>

<p>
Jangan menganggap <code>touch</code> sebagai command untuk mengedit isi file.
Untuk mengedit file, gunakan editor seperti <code>nano</code>, <code>vim</code>,
atau editor lain yang tersedia.
</p>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>04 · MENYALIN DAN MEMINDAHKAN</span>

<h2>
Mengelola file tanpa kehilangan data
</h2>

<p>
File calculation sering memiliki versi input yang berbeda. Gunakan command
copy dan move secara sadar agar versi kerja tetap dapat dilacak.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 10</span>
<h3>cp</h3>
</div>

<p>
Menyalin file dari satu lokasi ke lokasi lain.
</p>

<pre><code>cp input.in input_backup.in</code></pre>

<h4>Contoh nyata</h4>

<pre><code>cp scf.in scf_backup.in
ls -lh</code></pre>

<p>
Gunakan pola penamaan yang jelas untuk membedakan file asli dan salinan.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 11</span>
<h3>cp -r</h3>
</div>

<p>
Menyalin sebuah direktori beserta isinya.
</p>

<pre><code>cp -r input input_backup</code></pre>

<p>
Pastikan sumber dan tujuan sudah benar sebelum menyalin direktori berukuran
besar.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 12</span>
<h3>mv</h3>
</div>

<p>
Memindahkan file atau mengubah nama file.
</p>

<pre><code>mv scf.in input/scf.in</code></pre>

<h4>Contoh rename</h4>

<pre><code>mv old_input.in final_input.in</code></pre>

<p>
Perhatikan bahwa <code>mv</code> juga dapat mengganti nama file. Selalu
periksa tujuan sebelum menjalankannya.
</p>

</div>


<div class="command-warning">

<strong>
Periksa sebelum mengubah
</strong>

<p>
Gunakan <code>pwd</code> untuk lokasi dan <code>ls -lh</code> untuk isi
direktori sebelum menggunakan <code>mv</code> atau <code>cp</code>.
Pastikan nama file dan tujuan sudah benar.
</p>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>05 · MEMBACA FILE</span>

<h2>
Membaca input dan output calculation
</h2>

<p>
File output simulasi dapat berisi ribuan hingga jutaan baris. Anda tidak
selalu perlu membuka seluruh file. Gunakan command yang sesuai untuk melihat
bagian yang diperlukan.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 13</span>
<h3>cat</h3>
</div>

<p>
Menampilkan seluruh isi file ke terminal.
</p>

<pre><code>cat input.in</code></pre>

<p>
Cocok untuk file kecil. Hindari menggunakan <code>cat</code> pada output yang
sangat besar karena seluruh isi dapat memenuhi terminal.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 14</span>
<h3>less</h3>
</div>

<p>
Membaca file secara interaktif tanpa mencetak seluruh isi sekaligus.
</p>

<pre><code>less output.out</code></pre>

<p>
Gunakan tombol panah atau Page Up dan Page Down untuk berpindah. Tekan
<code>q</code> untuk keluar.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 15</span>
<h3>head</h3>
</div>

<p>
Melihat bagian awal file.
</p>

<pre><code>head output.out</code></pre>

<h4>Melihat 30 baris pertama</h4>

<pre><code>head -n 30 output.out</code></pre>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 16</span>
<h3>tail</h3>
</div>

<p>
Melihat bagian akhir file.
</p>

<pre><code>tail output.out</code></pre>

<h4>Melihat 50 baris terakhir</h4>

<pre><code>tail -n 50 output.out</code></pre>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 17</span>
<h3>tail -f</h3>
</div>

<p>
Memantau file yang terus bertambah ketika sebuah proses sedang menulis
output.
</p>

<pre><code>tail -f output.out</code></pre>

<p>
Gunakan <code>Ctrl+C</code> untuk menghentikan pemantauan dan kembali ke
prompt.
</p>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>06 · MENCARI INFORMASI</span>

<h2>
Mencari file dan pesan tertentu
</h2>

<p>
Ketika project mulai memiliki banyak file dan output, pencarian menjadi
lebih efisien daripada membuka file satu per satu.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 18</span>
<h3>find</h3>
</div>

<p>
Mencari file berdasarkan nama atau pola tertentu.
</p>

<pre><code>find . -name "*.in"</code></pre>

<p>
Contoh tersebut mencari file dengan ekstensi <code>.in</code> mulai dari
direktori saat ini.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 19</span>
<h3>grep</h3>
</div>

<p>
Mencari teks tertentu di dalam file.
</p>

<pre><code>grep -i "error" output.out</code></pre>

<p>
Opsi <code>-i</code> membuat pencarian tidak membedakan huruf besar dan kecil.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 20</span>
<h3>grep untuk pemeriksaan output</h3>
</div>

<p>
Gunakan kata kunci yang memang muncul pada software yang Anda gunakan.
Jangan menganggap semua software menghasilkan pesan penyelesaian yang sama.
</p>

<pre><code>grep -i "error" output.out
grep -i "warning" output.out</code></pre>

<p>
Perintah di atas membantu pemeriksaan awal. Tidak menemukan kata
<code>error</code> tidak otomatis berarti calculation benar. Tetap periksa
indikator hasil yang sesuai dengan software dan metode yang digunakan.
</p>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>07 · UKURAN DAN STORAGE</span>

<h2>
Memeriksa penggunaan ruang
</h2>

<p>
Simulation dapat menghasilkan file berukuran besar. Pemeriksaan ukuran
membantu Anda mengetahui apakah sebuah folder berkembang terlalu besar.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 21</span>
<h3>du -sh</h3>
</div>

<p>
Menampilkan ukuran total sebuah direktori dengan format yang mudah dibaca.
</p>

<pre><code>du -sh output/</code></pre>

<h4>Contoh</h4>

<pre><code>du -sh ~/workshop/graphene-interface/</code></pre>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 22</span>
<h3>df -h</h3>
</div>

<p>
Menampilkan informasi kapasitas filesystem yang tersedia pada sistem.
</p>

<pre><code>df -h</code></pre>

<p>
Gunakan command ini ketika ingin mengetahui kondisi filesystem sebelum
melakukan pekerjaan yang membutuhkan banyak ruang.
</p>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>08 · PERMISSION</span>

<h2>
Memahami izin akses file
</h2>

<p>
Linux mengatur akses file melalui permission. Pada tahap awal, fokus pada
kemampuan membaca informasi permission dan memahami bahwa tidak semua file
dapat diubah oleh setiap pengguna.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 23</span>
<h3>ls -l</h3>
</div>

<p>
Menampilkan informasi permission dan kepemilikan file.
</p>

<pre><code>ls -l</code></pre>

<p>
Gunakan command ini sebelum mengubah permission agar Anda memahami kondisi
file terlebih dahulu.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 24</span>
<h3>chmod</h3>
</div>

<p>
Mengubah permission file sesuai kebutuhan dan kebijakan sistem.
</p>

<pre><code>chmod u+x run.sh</code></pre>

<p>
Contoh tersebut memberikan permission execute kepada pemilik file.
Gunakan <code>chmod</code> secara spesifik. Hindari perubahan permission
secara luas tanpa memahami konsekuensinya.
</p>

</div>


<div class="command-warning">

<strong>
Jangan mengubah permission secara sembarangan
</strong>

<p>
Pada HPC bersama, permission berkaitan dengan keamanan dan kolaborasi.
Ubah hanya file yang memang Anda miliki atau yang memang diizinkan untuk
diubah.
</p>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>09 · PROCESS</span>

<h2>
Melihat proses yang sedang berjalan
</h2>

<p>
Command process membantu Anda membedakan pekerjaan interaktif pada shell
dengan proses yang sedang berjalan. Gunakan sesuai kebijakan HPC.
Untuk calculation yang dikelola scheduler, gunakan informasi SLURM sebagai
referensi utama status job.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 25</span>
<h3>ps</h3>
</div>

<p>
Menampilkan informasi proses.
</p>

<pre><code>ps</code></pre>

<h4>Contoh untuk proses pengguna</h4>

<pre><code>ps -u $USER</code></pre>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 26</span>
<h3>top</h3>
</div>

<p>
Menampilkan proses dan penggunaan resource secara interaktif.
</p>

<pre><code>top</code></pre>

<p>
Gunakan hanya sesuai kebijakan login node. Jangan menjalankan pekerjaan
komputasi berat secara interaktif pada login node jika sistem melarangnya.
</p>

</div>

</div>


<div class="command-section command-slurm">

<div class="command-section-head">

<span>10 · SLURM</span>

<h2>
Mengelola job pada HPC
</h2>

<p>
SLURM merupakan scheduler yang digunakan untuk mengatur pekerjaan komputasi
pada cluster. Pada tahap ini Anda mempelajari command untuk mengirim,
melihat, memeriksa, dan membatalkan job.
</p>

<p>
Jangan menjalankan calculation berat langsung pada login node jika kebijakan
HPC mengharuskan pekerjaan dikirim melalui scheduler.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 27</span>
<h3>sbatch</h3>
</div>

<p>
Mengirim script job ke scheduler untuk dijalankan sesuai resource dan
partition yang diminta oleh script.
</p>

<pre><code>sbatch run.slurm</code></pre>

<h4>Contoh</h4>

<pre><code>sbatch scripts/run.slurm</code></pre>

<p>
Jika berhasil, SLURM biasanya mengembalikan JOBID. Simpan JOBID tersebut
karena Anda akan menggunakannya untuk pemeriksaan berikutnya.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 28</span>
<h3>squeue</h3>
</div>

<p>
Melihat job yang sedang berada dalam antrean atau sedang berjalan.
</p>

<pre><code>squeue -u $USER</code></pre>

<h4>Contoh konteks akun lala002</h4>

<pre><code>squeue -u lala002</code></pre>

<p>
Pada sesi terminal contoh, akun <code>lala002</code> memiliki beberapa
active SLURM jobs. Informasi yang ditampilkan dapat mencakup JOBID,
PARTITION, NAME, USER, STATUS, TIME, NODE, dan alasan antrean.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 29</span>
<h3>sinfo</h3>
</div>

<p>
Melihat informasi umum mengenai partition dan node yang tersedia pada cluster.
</p>

<pre><code>sinfo</code></pre>

<p>
Gunakan informasi ini untuk memahami kondisi cluster. Detail partition,
state, dan node dapat berbeda sesuai konfigurasi HPC.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 30</span>
<h3>scontrol show job</h3>
</div>

<p>
Melihat informasi lebih detail mengenai sebuah job.
</p>

<pre><code>scontrol show job JOBID</code></pre>

<h4>Contoh</h4>

<pre><code>scontrol show job 554425</code></pre>

<p>
Ganti <code>554425</code> dengan JOBID milik Anda. Jangan menggunakan JOBID
contoh sebagai JOBID pekerjaan Anda.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 31</span>
<h3>sacct</h3>
</div>

<p>
Melihat informasi historis mengenai job yang telah diproses scheduler.
</p>

<pre><code>sacct -j JOBID</code></pre>

<h4>Contoh</h4>

<pre><code>sacct -j 554425</code></pre>

<p>
Gunakan JOBID milik Anda untuk memeriksa status akhir dan informasi pekerjaan.
</p>

</div>


<div class="command-card">

<div class="command-card-head">
<span>COMMAND 32</span>
<h3>scancel</h3>
</div>

<p>
Membatalkan job yang dimiliki pengguna.
</p>

<pre><code>scancel JOBID</code></pre>

<h4>Contoh</h4>

<pre><code>scancel 554425</code></pre>

<div class="command-warning">

<strong>
Perhatian
</strong>

<p>
Pastikan JOBID benar sebelum menjalankan <code>scancel</code>. Jangan
membatalkan job orang lain dan jangan menggunakan JOBID contoh pada
pekerjaan yang sedang berjalan.
</p>

</div>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>11 · WORKFLOW NYATA</span>

<h2>
Contoh workflow dari terminal HPC
</h2>

<p>
Bagian ini menggabungkan command dasar menjadi alur kerja sederhana.
Contoh tidak menjalankan calculation tertentu. Tujuannya adalah menunjukkan
bagaimana command digunakan secara berurutan.
</p>

</div>


<div class="command-workflow-step">

<div class="command-workflow-number">
01
</div>

<div>

<h3>
Pastikan lokasi kerja
</h3>

<pre><code>whoami
hostname
pwd
ls -lh</code></pre>

<p>
Langkah ini memastikan identitas pengguna, hostname, lokasi kerja,
dan isi direktori sebelum pekerjaan dimulai.
</p>

</div>

</div>


<div class="command-workflow-step">

<div class="command-workflow-number">
02
</div>

<div>

<h3>
Masuk ke workspace
</h3>

<pre><code>cd ~/workshop/graphene-interface
pwd
ls -lh</code></pre>

<p>
Setelah masuk ke workspace, periksa kembali lokasi dan file yang tersedia.
</p>

</div>

</div>


<div class="command-workflow-step">

<div class="command-workflow-number">
03
</div>

<div>

<h3>
Periksa input
</h3>

<pre><code>ls -lh input/
head -n 30 input/scf.in</code></pre>

<p>
Gunakan command pembacaan yang sesuai dengan ukuran file. Jangan langsung
mengirim job sebelum input diperiksa.
</p>

</div>

</div>


<div class="command-workflow-step">

<div class="command-workflow-number">
04
</div>

<div>

<h3>
Kirim job melalui SLURM
</h3>

<pre><code>sbatch scripts/run.slurm</code></pre>

<p>
Setelah scheduler menerima job, catat JOBID yang diberikan.
</p>

</div>

</div>


<div class="command-workflow-step">

<div class="command-workflow-number">
05
</div>

<div>

<h3>
Pantau status job
</h3>

<pre><code>squeue -u $USER</code></pre>

<p>
Gunakan JOBID dan informasi status untuk mengetahui apakah job masih
berjalan, menunggu antrean, atau sudah selesai.
</p>

</div>

</div>


<div class="command-workflow-step">

<div class="command-workflow-number">
06
</div>

<div>

<h3>
Periksa output setelah job selesai
</h3>

<pre><code>ls -lh output/
tail -n 50 output/output.out</code></pre>

<p>
Periksa file yang dihasilkan dan bagian akhir output. Langkah ini merupakan
pemeriksaan awal, bukan pengganti analisis ilmiah.
</p>

</div>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<span>12 · TROUBLESHOOTING</span>

<h2>
Jika command tidak memberikan hasil yang diharapkan
</h2>

<p>
Kesalahan command sering terjadi karena lokasi kerja, nama file, permission,
atau konfigurasi environment. Jangan langsung mengubah banyak hal sekaligus.
Periksa masalah secara bertahap.
</p>

</div>


<div class="command-troubleshooting">

<div>

<h3>
Command not found
</h3>

<p>
Sistem tidak menemukan program atau command tersebut.
Periksa penulisan command dan environment yang aktif.
</p>

<pre><code>which nama_program</code></pre>

</div>


<div>

<h3>
No such file or directory
</h3>

<p>
Path atau nama file tidak ditemukan. Periksa lokasi dan nama file.
</p>

<pre><code>pwd
ls -lh</code></pre>

</div>


<div>

<h3>
Permission denied
</h3>

<p>
Anda tidak memiliki permission yang diperlukan atau file berada pada
lokasi yang dibatasi.
</p>

<pre><code>ls -l nama_file</code></pre>

</div>


<div>

<h3>
Job tidak terlihat di squeue
</h3>

<p>
Periksa kembali JOBID, username, dan status historis job.
</p>

<pre><code>squeue -u $USER
sacct -j JOBID</code></pre>

</div>

</div>

</div>


<div class="command-safety">

<div>

<span>KEBIASAAN KERJA AMAN</span>

<h2>
Periksa sebelum menjalankan command yang mengubah sistem
</h2>

<p>
Command line memberikan kontrol yang sangat besar terhadap file dan proses.
Karena itu, jangan menjalankan command secara membabi buta. Pahami target,
lokasi, dan konsekuensi command terlebih dahulu.
</p>

</div>

<div class="command-safety-list">

<div>
<strong>01</strong>
<span>Periksa lokasi dengan <code>pwd</code>.</span>
</div>

<div>
<strong>02</strong>
<span>Periksa isi dengan <code>ls</code>.</span>
</div>

<div>
<strong>03</strong>
<span>Pastikan nama file dan path sudah benar.</span>
</div>

<div>
<strong>04</strong>
<span>Gunakan JOBID yang benar untuk operasi SLURM.</span>
</div>

<div>
<strong>05</strong>
<span>Jangan menjalankan calculation berat di login node jika kebijakan HPC melarangnya.</span>
</div>

<div>
<strong>06</strong>
<span>Jangan membagikan credential atau private key.</span>
</div>

</div>

</div>


<div class="command-cheatsheet">

<div>

<span>CHEAT SHEET</span>

<h2>
Command yang paling sering digunakan
</h2>

<p>
Gunakan daftar ini sebagai pengingat cepat. Untuk penjelasan lengkap,
gunakan bagian di atas.
</p>

</div>

<div class="command-cheatsheet-grid">

<div><code>pwd</code><span>cek lokasi</span></div>
<div><code>ls -lh</code><span>lihat isi</span></div>
<div><code>cd</code><span>pindah lokasi</span></div>
<div><code>mkdir</code><span>buat folder</span></div>
<div><code>cp</code><span>salin file</span></div>
<div><code>mv</code><span>pindah atau rename</span></div>
<div><code>less</code><span>baca file</span></div>
<div><code>head</code><span>lihat awal file</span></div>
<div><code>tail</code><span>lihat akhir file</span></div>
<div><code>grep</code><span>cari teks</span></div>
<div><code>find</code><span>cari file</span></div>
<div><code>du -sh</code><span>cek ukuran</span></div>
<div><code>sbatch</code><span>kirim job</span></div>
<div><code>squeue</code><span>pantau job</span></div>
<div><code>sacct</code><span>cek riwayat</span></div>
<div><code>scancel</code><span>batalkan job</span></div>

</div>

</div>


<div class="command-check">

<div>

<span>CHECKPOINT</span>

<h2>
Coba sendiri di terminal HPC
</h2>

<p>
Sebelum melanjutkan, coba jalankan command berikut pada sesi Anda.
Jangan hanya menyalin output contoh. Perhatikan hasil yang benar-benar
muncul pada akun Anda.
</p>

</div>

<pre><code>whoami
hostname
pwd
ls -lh
cd ~
pwd
cd ~/workshop
pwd</code></pre>

<p>
Jika salah satu path tidak tersedia pada akun Anda, jangan membuat kesimpulan
bahwa sistem rusak. Periksa struktur direktori yang tersedia dan sesuaikan
path dengan lingkungan Anda.
</p>

</div>


<div class="command-next">

<div>

<span>LANGKAH BERIKUTNYA</span>

<h2>
Software Environment
</h2>

<p>
Setelah memahami command line, langkah berikutnya adalah memahami bagaimana
software, compiler, library, dan environment disiapkan sebelum calculation.
</p>

</div>

<div class="command-actions">

<a href="../software-environment/">
Pelajari Software Environment →
</a>

<a href="../running-calculations/">
Lanjut ke Running Calculations →
</a>

</div>

</div>

</div>
