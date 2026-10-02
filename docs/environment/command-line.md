<div class="command-reference">

<div class="command-hero">

<div class="command-kicker">
TERMINAL REFERENCE
</div>

<h1>Command Line</h1>

<p>
Referensi singkat command Linux dan SLURM yang paling sering
digunakan dalam workflow HPC.
</p>

</div>


<div class="command-categories">

<div>
<span>01</span>
<strong>Navigate</strong>
<small>Filesystem</small>
</div>

<div>
<span>02</span>
<strong>Manage</strong>
<small>Files</small>
</div>

<div>
<span>03</span>
<strong>Inspect</strong>
<small>Output</small>
</div>

<div>
<span>04</span>
<strong>Search</strong>
<small>Files & logs</small>
</div>

<div>
<span>05</span>
<strong>SLURM</strong>
<small>Jobs</small>
</div>

</div>


<div class="command-section">

<div class="command-section-head">

<div>

<span>01</span>

<div>
<small>NAVIGATION</small>
<h2>Navigate the Filesystem</h2>
</div>

</div>

<p>
Gunakan command ini untuk mengetahui posisi dan berpindah
di antara directory.
</p>

</div>


<div class="command-table">

<div class="command-row command-header">
<span>COMMAND</span>
<span>FUNCTION</span>
<span>EXAMPLE</span>
</div>

<div class="command-row">
<code>pwd</code>
<span>Melihat lokasi saat ini</span>
<code>pwd</code>
</div>

<div class="command-row">
<code>ls</code>
<span>Melihat isi directory</span>
<code>ls</code>
</div>

<div class="command-row">
<code>ls -lh</code>
<span>Melihat file dan ukuran</span>
<code>ls -lh</code>
</div>

<div class="command-row">
<code>ls -lah</code>
<span>Termasuk file tersembunyi</span>
<code>ls -lah</code>
</div>

<div class="command-row">
<code>cd project/</code>
<span>Masuk ke directory</span>
<code>cd project/</code>
</div>

<div class="command-row">
<code>cd ..</code>
<span>Kembali satu tingkat</span>
<code>cd ..</code>
</div>

<div class="command-row">
<code>cd ~</code>
<span>Kembali ke home directory</span>
<code>cd ~</code>
</div>

<div class="command-row">
<code>cd -</code>
<span>Kembali ke directory sebelumnya</span>
<code>cd -</code>
</div>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<div>

<span>02</span>

<div>
<small>FILES & DIRECTORIES</small>
<h2>Manage Files</h2>
</div>

</div>

<p>
Command dasar untuk membuat, menyalin, memindahkan,
dan menghapus file.
</p>

</div>


<div class="command-table">

<div class="command-row command-header">
<span>COMMAND</span>
<span>FUNCTION</span>
<span>EXAMPLE</span>
</div>

<div class="command-row">
<code>mkdir output</code>
<span>Membuat directory</span>
<code>mkdir output</code>
</div>

<div class="command-row">
<code>mkdir -p input output</code>
<span>Membuat beberapa directory</span>
<code>mkdir -p input output</code>
</div>

<div class="command-row">
<code>cp a.in b.in</code>
<span>Menyalin file</span>
<code>cp a.in b.in</code>
</div>

<div class="command-row">
<code>cp -r dir1 dir2</code>
<span>Menyalin directory</span>
<code>cp -r input backup</code>
</div>

<div class="command-row">
<code>mv old.in new.in</code>
<span>Memindahkan atau rename</span>
<code>mv old.in new.in</code>
</div>

<div class="command-row">
<code>rm file.out</code>
<span>Menghapus file</span>
<code>rm file.out</code>
</div>

</div>


<div class="command-warning">
<strong>Perhatian</strong>
<span>
Periksa lokasi dengan <code>pwd</code> dan isi directory dengan
<code>ls</code> sebelum menggunakan <code>rm</code>.
</span>
</div>

</div>


<div class="command-section">

<div class="command-section-head">

<div>

<span>03</span>

<div>
<small>OUTPUT</small>
<h2>Read Calculation Output</h2>
</div>

</div>

<p>
Baca bagian tertentu dari output tanpa membuka seluruh file.
</p>

</div>


<div class="command-table">

<div class="command-row command-header">
<span>COMMAND</span>
<span>FUNCTION</span>
<span>EXAMPLE</span>
</div>

<div class="command-row">
<code>head output.out</code>
<span>Melihat bagian awal file</span>
<code>head output.out</code>
</div>

<div class="command-row">
<code>head -n 30 output.out</code>
<span>Melihat 30 baris pertama</span>
<code>head -n 30 output.out</code>
</div>

<div class="command-row">
<code>tail output.out</code>
<span>Melihat bagian akhir file</span>
<code>tail output.out</code>
</div>

<div class="command-row">
<code>tail -n 50 output.out</code>
<span>Melihat 50 baris terakhir</span>
<code>tail -n 50 output.out</code>
</div>

<div class="command-row">
<code>tail -f output.out</code>
<span>Memantau output yang terus bertambah</span>
<code>tail -f output.out</code>
</div>

<div class="command-row">
<code>wc -l output.out</code>
<span>Menghitung jumlah baris</span>
<code>wc -l output.out</code>
</div>

</div>

</div>


<div class="command-section">

<div class="command-section-head">

<div>

<span>04</span>

<div>
<small>SEARCH & DIAGNOSTICS</small>
<h2>Find Information</h2>
</div>

</div>

<p>
Cari file, pesan error, dan informasi tertentu dari output.
</p>

</div>


<div class="command-table">

<div class="command-row command-header">
<span>COMMAND</span>
<span>FUNCTION</span>
<span>EXAMPLE</span>
</div>

<div class="command-row">
<code>find . -name "*.in"</code>
<span>Mencari file input</span>
<code>find . -name "*.in"</code>
</div>

<div class="command-row">
<code>grep -i "error" output.out</code>
<span>Mencari pesan error</span>
<code>grep -i "error" output.out</code>
</div>

<div class="command-row">
<code>grep "JOB DONE" output.out</code>
<span>Mencari pesan penyelesaian</span>
<code>grep "JOB DONE" output.out</code>
</div>

<div class="command-row">
<code>du -sh output/</code>
<span>Melihat ukuran directory</span>
<code>du -sh output/</code>
</div>

<div class="command-row">
<code>df -h</code>
<span>Melihat kapasitas filesystem</span>
<code>df -h</code>
</div>

</div>

</div>


<div class="command-section command-slurm">

<div class="command-section-head">

<div>

<span>05</span>

<div>
<small>JOB SCHEDULER</small>
<h2>Manage SLURM Jobs</h2>
</div>

</div>

<p>
Command utama untuk mengirim, memantau, memeriksa,
dan membatalkan job.
</p>

</div>


<div class="command-table">

<div class="command-row command-header">
<span>COMMAND</span>
<span>FUNCTION</span>
<span>EXAMPLE</span>
</div>

<div class="command-row">
<code>sbatch run.slurm</code>
<span>Mengirim job</span>
<code>sbatch scripts/run.slurm</code>
</div>

<div class="command-row">
<code>squeue -u $USER</code>
<span>Melihat job dalam antrean</span>
<code>squeue -u $USER</code>
</div>

<div class="command-row">
<code>scontrol show job JOBID</code>
<span>Melihat detail job</span>
<code>scontrol show job JOBID</code>
</div>

<div class="command-row">
<code>sacct -j JOBID</code>
<span>Melihat riwayat job</span>
<code>sacct -j JOBID</code>
</div>

<div class="command-row">
<code>scancel JOBID</code>
<span>Membatalkan job</span>
<code>scancel JOBID</code>
</div>

</div>

</div>


<div class="command-workflow">

<div>

<span>COMMON WORKFLOW</span>

<h2>
Check → Submit → Monitor → Verify
</h2>

<p>
Gunakan command sesuai tahap pekerjaan. Hindari menjalankan
job sebelum input, software, dan resource sudah diperiksa.
</p>

</div>

<div class="command-workflow-code">

<code>pwd</code>
<code>ls -lh</code>
<code>sbatch run.slurm</code>
<code>squeue -u $USER</code>
<code>tail -f output.out</code>

</div>

</div>


<div class="command-next">

<div>

<span>NEXT STEP</span>

<h2>
Need the software environment?
</h2>

<p>
Setelah memahami command dasar, siapkan compiler, library,
dan aplikasi yang diperlukan untuk calculation.
</p>

</div>

<div class="command-actions">

<a href="../software-environment/">
Software Environment →
</a>

<a href="../running-calculations/">
Running Calculations →
</a>

</div>

</div>

</div>
