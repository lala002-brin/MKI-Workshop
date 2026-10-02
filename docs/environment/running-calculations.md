<div class="running-page">

<div class="running-hero">

<div class="running-kicker">
HPC JOB WORKFLOW
</div>

<h1>Running Calculations</h1>

<p>
Jalankan calculation dari input siap pakai hingga hasil terverifikasi.
</p>

</div>


<div class="running-flow">

<div class="running-flow-item active">
<span>01</span>
<strong>Prepare</strong>
<small>Check files</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>02</span>
<strong>Submit</strong>
<small>Send job</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>03</span>
<strong>Monitor</strong>
<small>Track job</small>
</div>

<div class="running-flow-arrow">→</div>

<div class="running-flow-item">
<span>04</span>
<strong>Verify</strong>
<small>Check result</small>
</div>

</div>


<div class="running-grid">


<div class="running-panel">

<div class="running-panel-head">

<div>
<span>01</span>
<h2>Before You Submit</h2>
</div>

<span class="running-badge">
CHECK
</span>

</div>

<p class="running-muted">
Pastikan komponen utama calculation sudah siap sebelum submission.
</p>

<div class="running-checks">

<div>
<span>✓</span>
<strong>Input</strong>
<small>File input tersedia</small>
</div>

<div>
<span>✓</span>
<strong>Script</strong>
<small>Job script tersedia</small>
</div>

<div>
<span>✓</span>
<strong>Software</strong>
<small>Environment tersedia</small>
</div>

<div>
<span>✓</span>
<strong>Resource</strong>
<small>CPU, GPU, time sesuai</small>
</div>

</div>

<div class="running-command">

<span>CHECK PROJECT</span>

<pre><code>cd project/
ls -lh
ls -lh input/
ls -lh scripts/</code></pre>

</div>

<a class="running-link" href="../script-library/">
Need a Script? Open Script Library →
</a>

</div>


<div class="running-panel">

<div class="running-panel-head">

<div>
<span>02</span>
<h2>Submit & Monitor</h2>
</div>

<span class="running-badge">
SLURM
</span>

</div>

<p class="running-muted">
Kirim job ke scheduler dan gunakan JOB ID untuk memantau proses.
</p>

<div class="running-command">

<span>SUBMIT</span>

<pre><code>sbatch scripts/run.slurm</code></pre>

</div>

<div class="running-command">

<span>QUEUE</span>

<pre><code>squeue -u $USER</code></pre>

</div>

<div class="running-command">

<span>DETAIL</span>

<pre><code>scontrol show job JOBID</code></pre>

</div>

<div class="running-command">

<span>HISTORY</span>

<pre><code>sacct -j JOBID</code></pre>

</div>

</div>


</div>


<div class="running-status">

<div class="running-status-title">
JOB STATUS
</div>

<div class="running-status-list">

<div>
<strong>PD</strong>
<span>Pending</span>
<small>Menunggu resource</small>
</div>

<div>
<strong>R</strong>
<span>Running</span>
<small>Job sedang berjalan</small>
</div>

<div>
<strong>CG</strong>
<span>Completing</span>
<small>Proses akhir</small>
</div>

<div>
<strong>CD</strong>
<span>Completed</span>
<small>Job selesai</small>
</div>

<div>
<strong>F</strong>
<span>Failed</span>
<small>Job gagal</small>
</div>

<div>
<strong>CA</strong>
<span>Cancelled</span>
<small>Job dibatalkan</small>
</div>

</div>

</div>


<div class="running-grid">


<div class="running-panel">

<div class="running-panel-head">

<div>
<span>03</span>
<h2>Read & Verify</h2>
</div>

<span class="running-badge">
OUTPUT
</span>

</div>

<p class="running-muted">
Periksa output aplikasi sebelum melanjutkan ke analisis.
</p>

<div class="running-command">

<span>LIST OUTPUT</span>

<pre><code>ls -lh output/</code></pre>

</div>

<div class="running-command">

<span>LAST OUTPUT</span>

<pre><code>tail -n 50 output/calculation.out</code></pre>

</div>

<div class="running-command">

<span>LIVE OUTPUT</span>

<pre><code>tail -f output/calculation.out</code></pre>

</div>

<div class="running-command">

<span>FIND ERROR</span>

<pre><code>grep -i "error" output/calculation.out</code></pre>

</div>

<div class="running-verify">

<div>
<span>✓</span>
Output tersedia
</div>

<div>
<span>✓</span>
Tidak ada error kritis
</div>

<div>
<span>✓</span>
Pesan penyelesaian tersedia
</div>

<div>
<span>✓</span>
Hasil sesuai kebutuhan
</div>

</div>

</div>


<div class="running-panel">

<div class="running-panel-head">

<div>
<span>04</span>
<h2>Troubleshooting</h2>
</div>

<span class="running-badge">
DIAGNOSE
</span>

</div>

<div class="running-problems">

<div>
<strong>Job Pending</strong>
<p>
Periksa partition, resource request, dan antrean scheduler.
</p>
</div>

<div>
<strong>Job Failed</strong>
<p>
Periksa status job, output, input, path, dan software.
</p>
</div>

<div>
<strong>Resource Problem</strong>
<p>
Periksa CPU, GPU, memory, node, dan wall time.
</p>
</div>

</div>

<div class="running-command">

<span>DIAGNOSTIC</span>

<pre><code>squeue -u $USER
scontrol show job JOBID
sacct -j JOBID
tail -n 50 output/calculation.out
grep -i "error" output/calculation.out</code></pre>

</div>

<div class="running-cancel">

<strong>Cancel a job</strong>

<code>scancel JOBID</code>

</div>

</div>


</div>


<div class="running-quick">

<div class="running-quick-head">

<div>
<span>QUICK REFERENCE</span>
<h2>Essential Commands</h2>
</div>

<p>
Perintah utama untuk workflow harian.
</p>

</div>

<div class="running-command-table">

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
<code>tail -n 50 output/calculation.out</code>
</div>

<div>
<span>ERROR</span>
<code>grep -i "error" output/calculation.out</code>
</div>

</div>

</div>


<div class="running-complete">

<div>

<span>CALCULATION COMPLETE?</span>

<h2>Verify first. Analyze next.</h2>

<p>
Setelah output terverifikasi, lanjutkan ke research case
yang sesuai dengan calculation Anda.
</p>

</div>

<div class="running-actions">

<a href="../script-library/">
Script Library
</a>

<a href="../../hands-on-project/">
Research Cases
</a>

</div>

</div>

</div>
